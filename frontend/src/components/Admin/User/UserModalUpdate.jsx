import { Divider, Form, Input, message, Modal, notification } from 'antd';
import { putUpdateAUser } from '../../../services/api';
import { useEffect, useState } from 'react';

const UserModalUpdate = (props) => {
    const { isOpenModalUpdate, setIsOpenModalUpdate, dataUserUpdate, setDataUserUpdate } = props;

    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        form.setFieldsValue(dataUserUpdate)
    }, [dataUserUpdate])

    const onFinish = async (values) => {
        const { _id, fullName, phone } = values;
        setIsSubmit(true);
        const res = await putUpdateAUser(_id, fullName, phone);
        if (res && res.data) {
            message.success('Cập nhật user thành công');
            setIsOpenModalUpdate(false);
            // setDataUserUpdate({})
            // form.resetFields();
            await props.fetchUsersWithPaginate();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message,
            })
        }
        setIsSubmit(false);
    };

    return (
        <>
            <Modal
                title="Cập nhật người dùng"
                open={isOpenModalUpdate}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    setIsOpenModalUpdate(false);
                    setDataUserUpdate({})
                    form.resetFields();
                }}
                okText={'Cập nhật'}
                cancelText={'Hủy'}
                confirmLoading={isSubmit}
                forceRender // hide warning
            >
                <Divider />

                <Form
                    form={form}
                    name="basic"
                    layout='vertical'
                    onFinish={onFinish}
                    autoComplete="off"
                // initialValues={dataUserUpdate} -> bug -> sử dụng useEffect() để set value cho form
                >
                    <Form.Item
                        label="Id"
                        name="_id"
                        rules={[{ required: true, message: "Vui lòng nhập tên hiển thị!" }]}
                        hidden
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Tên hiển thị"
                        name="fullName"
                        rules={[{ required: true, message: "Vui lòng nhập tên hiển thị!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default UserModalUpdate;