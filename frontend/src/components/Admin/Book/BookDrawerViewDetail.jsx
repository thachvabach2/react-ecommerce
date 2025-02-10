import { Badge, Descriptions, Divider, Drawer, Modal, Upload } from 'antd';
import moment from 'moment';
import { FOR_DATE_DISPLAY } from '../../../utils/constant';
import { useEffect, useState } from 'react';

const BookDrawerViewDetail = (props) => {
    const { isOpenDrawerViewDetail, setIsOpenDrawerViewDetail, dataViewDetail, setDataViewDetail } = props;

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (dataViewDetail) {
            let imageThumbnail = {}, imageSlider = [];
            if (dataViewDetail.thumbnail) {
                imageThumbnail = {
                    name: dataViewDetail?.thumbnail,
                    status: "done",
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataViewDetail.thumbnail}`,
                }
            }
            if (dataViewDetail.slider && dataViewDetail.slider.length > 0) {
                dataViewDetail.slider.forEach(item => {
                    imageSlider.push({
                        name: item,
                        status: "done",
                        url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                    })
                })
            }
            setFileList([imageThumbnail, ...imageSlider]);
        }
    }, [dataViewDetail])

    const handleClose = () => {
        setIsOpenDrawerViewDetail(false);
        setDataViewDetail(null);
    }

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        setPreviewImage(file.url);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    }

    return (
        <>
            <Drawer
                title="Chức năng xem chi tiết"
                width={'50vw'}
                onClose={() => handleClose()}
                open={isOpenDrawerViewDetail}
            >
                <Descriptions
                    title="Thông tin Sách"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{dataViewDetail?._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên sách">{dataViewDetail?.mainText}</Descriptions.Item>
                    <Descriptions.Item label="Tác giả">{dataViewDetail?.author}</Descriptions.Item>
                    <Descriptions.Item label="Giá tiền">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataViewDetail?.price ?? 0)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số lượng">{dataViewDetail?.quantity}</Descriptions.Item>
                    <Descriptions.Item label="Đã bán">{dataViewDetail?.sold}</Descriptions.Item>

                    <Descriptions.Item label="Thể loại" span={2}>
                        <Badge status="processing" text={dataViewDetail?.category} />
                    </Descriptions.Item>

                    <Descriptions.Item label="Created At">
                        {moment(dataViewDetail?.createdAt).format(FOR_DATE_DISPLAY)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(dataViewDetail?.updatedAt).format(FOR_DATE_DISPLAY)}
                    </Descriptions.Item>
                </Descriptions>

                <Divider orientation='left'>Ảnh Sách</Divider>

                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange} //no use
                    showUploadList={{ showRemoveIcon: false }}
                ></Upload>
                <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <img alt="example" style={{ width: "100%" }} src={previewImage} />
                </Modal>
            </Drawer>
        </>
    )
}

export default BookDrawerViewDetail;