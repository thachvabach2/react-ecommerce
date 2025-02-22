import { Col, Form, Input, message, Modal, notification, Radio, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { doPlaceOrderAction } from '../../redux/order/orderSlice';
import { useEffect, useState } from 'react';
import { MdLocationPin } from "react-icons/md";
import './place.order.scss'
import { postPlaceOrder } from '../../services/api';

const Payment = (props) => {
    const dispatch = useDispatch();
    const carts = useSelector(state => state.order.carts);
    const user = useSelector(state => state.account.user)

    const [form] = Form.useForm();

    const [totalPrice, setTotalPrice] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [infoShipping, setInfoShipping] = useState({
        fullName: user?.fullName,
        phone: user?.phone,
        address: 'Số 123, Nguyễn Văn Cừ, Phường 10, Quận 1, TP. Hồ Chí Minh',
    })
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if (carts && carts.length > 0) {
            let sum = 0
            carts?.forEach(item => {
                sum += item.quantity * item.detail.price;
            })
            setTotalPrice(sum);
        } else {
            setTotalPrice(0);
        }
    }, [carts])

    const onFinish = (values) => {
        console.log('Success:', values);
        setInfoShipping({
            fullName: values.fullName,
            phone: values.phone,
            address: values.address,
        })
        form.resetFields();
    };

    const handlePlaceOrder = async () => {
        setIsSubmit(true);
        const detailOrder = carts.map(item => {
            return {
                bookName: item.detail.mainText,
                quantity: item.quantity,
                _id: item._id
            }
        })
        const data = {
            name: infoShipping.fullName,
            address: infoShipping.address,
            phone: infoShipping.phone,
            totalPrice: totalPrice,
            detail: detailOrder
        }

        const res = await postPlaceOrder(data);
        if (res && res.data) {
            message.success('Đặt hàng thành công !');
            dispatch(doPlaceOrderAction());
            props.setCurrentStep(2);
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message
            })
        }
        setIsSubmit(false);
    }

    return (
        <>
            <div className='payment-container'>
                <div className='line'></div>
                <section className='order-info'>
                    <div className='header-info'>
                        <MdLocationPin className='icon-location' />
                        <span className='text'>
                            Địa chỉ nhận hàng
                        </span>
                    </div>
                    <div className='main-info'>
                        <div className='name'>
                            {infoShipping.fullName}
                        </div>
                        <div className='phone'>
                            (+84) {infoShipping.phone}
                        </div>
                        <div className='address'>
                            {infoShipping.address}
                        </div>
                        <div className='change' onClick={() => setIsModalOpen(true)}>
                            Thay đổi
                        </div>
                    </div>
                    <div className='change-mobile'>
                        Thay đổi
                    </div>
                </section>
                <main className='order-body'>
                    <div className='header'>
                        <div className='product left-header'>
                            <div className='text'>
                                Sản phẩm
                            </div>
                        </div>

                        <div className='right-header'>
                            <div className='start'>
                                <div className='blank'>

                                </div>
                            </div>
                            <div className='end'>
                                <div className='price'>
                                    Đơn giá
                                </div>
                                <div className='quantity'>
                                    Số lượng
                                </div>
                                <div className='total'>
                                    Thành tiền
                                </div>
                            </div>
                        </div>
                    </div>

                    {carts?.map((book, index) => {
                        const detail = book?.detail;
                        return (
                            <section className='content' key={`book-${index}`}>
                                <div className='kEMRam'>
                                    <div className='order-detail'>
                                        <div className='thumbnail'>
                                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${detail?.thumbnail}`} />
                                        </div>
                                        <div className='right-content'>
                                            <div className='right-content-start'>
                                                <div className='title'>
                                                    {detail?.mainText}
                                                </div>
                                            </div>
                                            <div className='right-content-end'>
                                                <div className='price'>
                                                    <span>
                                                        ₫{new Intl.NumberFormat('vi-VN').format(detail?.price ?? 0)}
                                                    </span>
                                                </div>
                                                <div className='quantity'>
                                                    <span className='quantity-main'>
                                                        <span className='add-x' style={{ display: 'none' }}>x</span>
                                                        {book.quantity}
                                                    </span>
                                                </div>
                                                <div className='total'>
                                                    <span>
                                                        ₫{new Intl.NumberFormat('vi-VN').format((+detail?.price ?? 0) * +book?.quantity)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </section>
                        )
                    })}
                </main>
                <section className='order-footer'>
                    <div className='left-footer'>
                        <div className='top-side'>
                            Phương thức thanh toán
                        </div>
                        <div className='bot-side'>
                            <div className='select-all-checkbox'>
                                <Radio checked />
                            </div>
                            <div className='select-all-text'>
                                Thanh toán khi nhận hàng
                            </div>
                        </div>
                    </div>
                    <div className='right-footer'>
                        <div className='total'>
                            <div className='total-text'>
                                Tổng số tiền:
                            </div>
                            <div className='total-price'>
                                ₫{new Intl.NumberFormat('vi-VN').format(totalPrice)}
                            </div>
                        </div>
                        <button
                            className='buy-product btn'
                            onClick={() => handlePlaceOrder()}
                            disabled={isSubmit}
                        >
                            {isSubmit && <span><LoadingOutlined /> &nbsp;</span>}
                            Đặt hàng ({carts?.length ?? 0})
                        </button>
                    </div>
                </section>
            </div>

            <Modal
                title={<div style={{ fontSize: 20, fontWeight: 400 }}>Địa chỉ mới</div>}
                open={isModalOpen}
                onOk={() => {
                    form.submit();
                    setIsModalOpen(false);
                }}
                onCancel={() => setIsModalOpen(false)}
                okText={'Hoàn Thành'}
                cancelText={'Trở Lại'}
                maskClosable={false}
            // width={'50vw'}
            >
                <Form
                    form={form}
                    name="basic"
                    layout='vertical'
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row gutter={[20, 0]}>
                        <Col lg={12} md={24} sm={24} xs={24}>
                            <Form.Item
                                labelCol={12}
                                label="Họ và tên"
                                name="fullName"
                                rules={[{ required: true, message: "Hãy nhập Họ và tên!" }]}
                            >
                                <Input placeholder='Họ và tên' />
                            </Form.Item>
                        </Col>
                        <Col lg={12} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[{ required: true, message: "Hãy nhập Số điện thoại!" }]}
                            >
                                <Input placeholder='Số điện thoại' />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label='Địa chỉ'
                                name="address"
                                rules={[{ required: true, message: "Hãy nhập Địa chỉ!" }]}
                            >
                                <Input placeholder='Tỉnh/ Thành phố, Quận/ Huyện, Phường/ Xã' />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default Payment;