import { Button, Divider, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss'
import { postLogin } from '../../services/api';
import { useState } from 'react';

const LoginPage = () => {
    const navigate = useNavigate();

    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish = async (values) => {
        setIsSubmit(true);
        const { username, password } = values;
        const res = await postLogin(username, password);
        setIsSubmit(false);
        if (res?.data) {
            message.success('Đăng nhập thành công!');
            localStorage.setItem('access_token', res.data.access_token)
            navigate('/')
        } else {
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5,
            });
        }
        // console.log('>>> check res: ', res)
        // console.log('Success:', values);
    };

    return (
        <div className='login-page'>
            <main className='main'>
                <div className='container'>
                    <section className='wrapper'>
                        <div className='heading'>
                            <h2 className='text text-large'>Đăng nhập</h2>
                            <Divider />
                        </div>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Email"
                                name="username"
                                rules={[{ required: true, message: 'Email không được để trống!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={isSubmit}>
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                            <Divider>Or</Divider>
                            <p className="text text-normal">Chưa có tài khoản ?
                                <span>
                                    <Link to='/register' > Đăng ký </Link>
                                </span>
                            </p>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default LoginPage;