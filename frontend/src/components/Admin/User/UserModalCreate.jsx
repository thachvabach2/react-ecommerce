import { Divider, Form, Input, message, Modal, notification } from 'antd';
import { postCreateAUser } from '../../../services/api';
import { useState } from 'react';

const UserModalCreate = (props) => {
    const { isOpenModalCreate, setIsOpenModalCreate, fetchUsersWithPaginate } = props;

    const [form] = Form.useForm();

    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish = async (values) => {
        setIsSubmit(true);
        const { fullName, password, email, phone } = values;
        const res = await postCreateAUser(fullName, password, email, phone);
        if (res?.data) {
            message.success('Tạo mới user thành công');
            form.resetFields();
            setIsOpenModalCreate(false);
            await fetchUsersWithPaginate();
        }
        else {
            notification.error({
                message: 'Đã có lỗi xảy ra!',
                description: res?.message,
            });
        }
        setIsSubmit(false);
    };

    return (
        <>
            <Modal
                title="Thêm mới người dùng"
                open={isOpenModalCreate}
                onOk={() => { form.submit() }} // 1. go to onFinish(values) of form
                onCancel={() => {
                    setIsOpenModalCreate(false);
                    form.resetFields();
                }}
                okText={"Tạo mới"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Divider />

                <Form
                    form={form} // 2. need here to others component (ex: Modal) can access event handler of this Form (ex: onFinish)
                    name="create-new-user"
                    onFinish={onFinish}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Form.Item
                        name="fullName"
                        label="Tên hiển thị"
                        rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default UserModalCreate;