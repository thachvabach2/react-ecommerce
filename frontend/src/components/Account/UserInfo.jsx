import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, message, notification, Row, Upload } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postUploadAvatar, putUpdateUserInfo } from '../../services/api';
import { doUpdateInfoAction } from '../../redux/account/accountSlice';

const UserInfo = (props) => {
    const { avatarPreview, setAvatarPreview } = props;

    const dispatch = useDispatch();
    const user = useSelector(state => state.account.user);

    const [form] = Form.useForm();

    const [dataAvatar, setDataAvatar] = useState();
    const [isSubmit, setIsSubmit] = useState(false);

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

    const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
        const res = await postUploadAvatar(file);
        if (res && res.data) {
            setAvatarPreview(`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${res.data.fileUploaded}`)
            setDataAvatar(res.data.fileUploaded);
            onSuccess('ok');
        } else {
            onError('Đẫ có lỗi khi Upload');
        }
    }

    const propsUpload = {
        name: 'avatar',
        showUploadList: false,
        maxCount: 1,
        multiple: false,
        beforeUpload: beforeUpload,
        customRequest: handleUploadAvatar,
        onChange(info) {
            if (info.file.status !== 'uploading') {
                // console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`Upload file thành công`);
            } else if (info.file.status === 'error') {
                message.error(`Upload file thất bại`);
            }
        },
    }

    const onFinish = async (values) => {
        console.log('Success:', values);
        const { fullName, phone, _id } = values;

        setIsSubmit(true);
        const res = await putUpdateUserInfo(_id, dataAvatar, fullName, phone);
        if (res && res.data) {
            dispatch(doUpdateInfoAction({ avatar: dataAvatar, fullName, phone }));
            message.success('Cập nhật thông tin thành công');

            //force renew access_token
            localStorage.removeItem('access_token');
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message,
            })
        }
        setIsSubmit(false);
    }

    return (
        <>
            <Form
                form={form}
                name="update-info"
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
                style={{ marginBottom: 50 }}
            >
                <Row gutter={[20, 20]}>
                    <Col sm={24} md={12}>
                        <Form.Item
                            name="avatar"
                            valuePropName='avatar'
                        >
                            <Row gutter={[30, 30]}>
                                <Col span={24}>
                                    <Avatar
                                        size={{ xs: 32, sm: 64, md: 80, lg: 128, xl: 160, xxl: 200 }}
                                        icon={<UserOutlined />}
                                        src={avatarPreview}
                                    />
                                </Col>
                                <Col span={24}>
                                    <Upload {...propsUpload}>
                                        <Button icon={<UploadOutlined />}>
                                            Upload Avatar
                                        </Button>
                                    </Upload>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col sm={24} md={12}>
                        <Col span={24}>
                            <Form.Item
                                label="ID"
                                name="_id"
                                rules={[{ required: true, message: "Please input your email!" }]}
                                initialValue={user?.id}
                                hidden
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: "Please input your email!" }]}
                                initialValue={user?.email}
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Tên hiển thị"
                                name="fullName"
                                rules={[{ required: true, message: "Please input your username!" }]}
                                initialValue={user?.fullName}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[{ required: true, message: "Please input your phone!" }]}
                                initialValue={user?.phone}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Button
                                type="primary"
                                onClick={() => form.submit()}
                                loading={isSubmit}
                            >
                                Cập nhật
                            </Button>
                        </Col>
                    </Col>
                </Row>
            </Form >
        </>
    )
}

export default UserInfo;