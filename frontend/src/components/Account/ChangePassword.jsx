import { Button, Form, Input, message, notification } from 'antd';
import { useSelector } from 'react-redux';
import { postChangePassword } from '../../services/api';
import { useState } from 'react';

const ChangePassword = () => {
    const [form] = Form.useForm();

    const user = useSelector(state => state.account.user);

    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish = async (values) => {
        console.log('Success: ', values);

        const { email, currentPassword, newPassword } = values;

        setIsSubmit(true);
        const res = await postChangePassword(email, currentPassword, newPassword);
        if (res && res.data) {
            message.success('Thay đổi mật khẩu thành công');
            form.setFieldValue("currentPassword", "");
            form.setFieldValue("newPassword", "");
            form.setFieldValue("confirmPassword", "");
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
                name="change-password"
                autoComplete="off"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item label="Email" name="email" rules={[{ required: true }]} wrapperCol={{ lg: 12, md: 24 }} initialValue={user?.email}>
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Mật khẩu hiện tại" name="currentPassword" rules={[{ required: true }]} wrapperCol={{ lg: 12, md: 24 }}>
                    <Input.Password />
                </Form.Item>

                <Form.Item label="Mật khẩu mới" name="newPassword" rules={[{ required: true }]} wrapperCol={{ lg: 12, md: 24 }}>
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{ lg: 12, md: 24 }}
                    label="Nhập lại mật khẩu mới"
                    name="confirmPassword"
                    dependencies={["newPassword"]}
                    rules={[
                        {
                            required: true,
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("newPassword") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("The new password that you entered do not match!")
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" loading={isSubmit}>
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form >
        </>
    )
}

export default ChangePassword;