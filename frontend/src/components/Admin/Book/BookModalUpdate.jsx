import { Col, Divider, Form, Input, InputNumber, message, Modal, notification, Row, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { getBookCategories, postUploadImageBook, putUpdateABook } from '../../../services/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const BookModalUpdate = (props) => {
    const { isOpenModalUpdate, setIsOpenModalUpdate, dataUpdate, setDataUpdate } = props;

    const [form] = Form.useForm();

    const [listCategory, setListCategory] = useState([]);

    const [loadingThumbnail, setLoadingThumbnail] = useState(false);
    const [loadingSlider, setLoadingSlider] = useState(false);

    const [dataThumbnail, setDataThumbnail] = useState([]);
    const [dataSlider, setDataSlider] = useState([]);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    const [isSubmit, setIsSubmit] = useState(false);

    const [initForm, setInitForm] = useState(null);

    useEffect(() => {
        fetchBookCategories();
    }, [])

    useEffect(() => {
        if (dataUpdate?._id) {
            const arrThumbnail = [
                {
                    uid: uuidv4(),
                    name: dataUpdate.thumbnail,
                    status: "done",
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`,
                },
            ]

            const arrSlider = dataUpdate?.slider?.map(item => {
                return {
                    uid: uuidv4(),
                    name: item,
                    status: "done",
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                }
            })

            const init = {
                _id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                category: dataUpdate.category,
                quantity: dataUpdate.quantity,
                sold: dataUpdate.sold,
                thumbnail: { fileList: arrThumbnail },
                slider: { fileList: arrSlider },
            }
            setInitForm(init);
            setDataThumbnail(arrThumbnail);
            setDataSlider(arrSlider);
            form.setFieldsValue(init);
        }

        // when dataUpdate change -> always reset form
        // component this (BookModalUpdate) mount & unmount - reset form when open & close modal
        // when open modal: run this return() first -> run this effect() -> re-render
        // initialValue = {} -> open modal -> resetFields() (= reset initialValue) -> setFieldsValue(init) -> update fileList in Upload

        // when close modal: re-render (nhờ onCancel) -> run this return () -> run this effect()
        return () => {
            form.resetFields();
        }
    }, [dataUpdate])

    const fetchBookCategories = async () => {
        const res = await getBookCategories();
        if (res && res.data) {
            let categoryFormatted = res.data.map(item => {
                return {
                    value: item,
                    label: item,
                }
            })
            setListCategory(categoryFormatted);
        }
    }

    const onFinish = async (values) => {
        console.log('Success:', values);
        if (dataThumbnail.length === 0) {
            notification.error({
                message: 'Lỗi validate',
                description: 'Vui lòng upload ảnh thumbnail'
            })
            return;
        }

        //  prepare data & call api
        const { _id, mainText, author, price, sold, quantity, category } = values;
        const thumbnail = dataThumbnail[0].name;
        const slider = dataSlider.map(item => item.name)

        setIsSubmit(true);
        const res = await putUpdateABook(_id, thumbnail, slider, mainText, author, price, sold, quantity, category);
        if (res && res.data) {
            message.success('Thêm mới sách thành công');
            form.resetFields();
            setDataSlider([]);
            setDataThumbnail([]);
            setInitForm(null)
            setIsOpenModalUpdate(false);
            await props.fetchListBooks();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra!',
                description: res.message,
            })
        }
        setIsSubmit(false);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            return;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
            return;
        }
        return isJpgOrPng && isLt2M;
    }

    const handleChange = (info, type) => {
        console.log('>>> check change info: ', info);
        if (info.file.status === 'uploading') {
            if (type === 'thumbnail') setLoadingThumbnail(true);
            if (type === 'slider') setLoadingSlider(true);
        }
        if (info.file.status === 'done') {
            if (type === 'thumbnail') setLoadingThumbnail(false)
            if (type === 'slider') setLoadingSlider(false);
        }
        if (info.file.status === 'error') {
            if (type === 'thumbnail') setLoadingThumbnail(false)
            if (type === 'slider') setLoadingSlider(false);
        }
    }

    const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
        const res = await postUploadImageBook(file);
        if (res && res.data) {
            setDataThumbnail([
                {
                    name: res.data.fileUploaded,
                    uid: file.uid,
                }
            ]);
            onSuccess('ok'); // must - show done image - go to handleChange() - fire: status === 'done'
        } else {
            onError('Đẫ có lỗi khi Upload'); // must - show error image - go to handleChange() - fire: status === 'error'
        }
    }

    const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
        const res = await postUploadImageBook(file);
        if (res && res.data) {
            setDataSlider((preDataSlider) => [...preDataSlider, {
                name: res.data.fileUploaded,
                uid: file.uid,
            }
            ]);
            onSuccess('ok');
        } else {
            onError('Đẫ có lỗi khi Upload');
        }
    }

    const handleRemoveFile = (file, type) => {
        if (type === 'thumbnail') {
            setDataThumbnail([])
        }
        if (type === 'slider') {
            const newSlider = dataSlider.filter(item => item.uid !== file.uid);
            setDataSlider(newSlider);
        }
    }

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const handlePreview = async (file) => {
        if (file.url && !file.originFileObj) {
            setPreviewImage(file.url);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
            return;
        }

        getBase64(file.originFileObj, (url) => {
            setPreviewImage(url);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        });
    };

    return (
        <>
            <Modal
                title="Cập nhật Book"
                width={'50vw'}
                open={isOpenModalUpdate}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    form.resetFields();
                    setInitForm(null)
                    setDataUpdate(null)
                    setIsOpenModalUpdate(false);
                    setDataSlider([]);
                    setDataThumbnail([]);
                }}
                okText={'Cập nhật'}
                cancelText={'Hủy'}
                confirmLoading={isSubmit}
                maskClosable={false}
                forceRender //
            >

                <Divider />

                <Form
                    form={form}
                    name="basic"
                    layout='vertical'
                    onFinish={onFinish}
                    autoComplete="off"
                // initialValues={initForm}
                >
                    <Row gutter={15}>
                        <Col span={0} hidden>
                            <Form.Item
                                hidden
                                label="Tên sách"
                                name="_id"
                                rules={[{ required: true, message: "Vui lòng nhập tên sách!" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Tên sách"
                                name="mainText"
                                rules={[{ required: true, message: "Vui lòng nhập tên sách!" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Tác giả"
                                name="author"
                                rules={[{ required: true, message: "Vui lòng nhập tác giả!" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Giá tiền"
                                name="price"
                                rules={[{ required: true, message: "Vui lòng nhập giá tiền" }]}
                            >
                                <InputNumber
                                    min={0}
                                    style={{ width: "100%" }}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    addonAfter={"VND"}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Thể loại"
                                name="category"
                                rules={[{ required: true, message: "Vui lòng chọn thể loại!" }]}
                            >
                                <Select
                                    showSearch
                                    allowClear
                                    options={listCategory}
                                    placement='bottomRight'
                                >
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Số lượng"
                                name="quantity"
                                rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
                            >
                                <InputNumber min={1} style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Đã bán"
                                name="sold"
                                rules={[{ required: true, message: "Vui lòng nhập số lượng đã bán!" }]}
                            >
                                <InputNumber
                                    min={0}
                                    style={{ width: "100%" }}
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Ảnh Thumbnail"
                                name="thumbnail"
                                valuePropName='thumbnail' //fix warning (valuePropName must = name of <Upload >)
                                rules={[{ required: true, message: "Vui lòng chọn ảnh thumbnail!" }]}
                            >
                                <Upload
                                    name="thumbnail"
                                    listType="picture-card"
                                    className="avatar-uploader"

                                    maxCount={1}
                                    multiple={false}

                                    beforeUpload={beforeUpload}
                                    onChange={(info) => handleChange(info, 'thumbnail')}
                                    customRequest={handleUploadFileThumbnail}
                                    onRemove={(file) => handleRemoveFile(file, 'thumbnail')}

                                    onPreview={handlePreview}
                                    defaultFileList={initForm?.thumbnail?.fileList ?? []}
                                >
                                    <div>
                                        {loadingThumbnail ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Ảnh Slider"
                                name="slider"
                                valuePropName='slider'
                            >
                                <Upload
                                    name="slider"
                                    listType="picture-card"
                                    className="slider-uploader"

                                    multiple={true}

                                    beforeUpload={beforeUpload}
                                    onChange={(info) => handleChange(info, 'slider')}
                                    customRequest={handleUploadFileSlider}
                                    onRemove={(file) => handleRemoveFile(file, 'slider')}

                                    onPreview={handlePreview}
                                    defaultFileList={initForm?.slider?.fileList ?? []}
                                >
                                    <div>
                                        {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewOpen(false)}
            >
                <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
        </>
    )
}

export default BookModalUpdate;