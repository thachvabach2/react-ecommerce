import { Checkbox, Empty, notification } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { doDeleteItemCartAction, doUpdateCartAction } from '../../redux/order/orderSlice';
import { useEffect, useState } from 'react';
import './order.scss'

const ViewOrder = (props) => {
    const dispatch = useDispatch();
    const carts = useSelector(state => state.order.carts);

    const [totalPrice, setTotalPrice] = useState(0)

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

    const handleChangeInput = (value, index) => {
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value)) {
            let realValue = value;
            if (value === '' || value === '0') {
                realValue = 1;
            }
            else {
                if (+value <= carts[index]?.detail?.quantity) {
                    realValue = +value;
                } else {
                    realValue = carts[index]?.detail?.quantity;
                }
            }
            dispatch(doUpdateCartAction({
                index: index,
                value: realValue,
            }));
        }
    }

    const handleChangeButton = (type, index) => {
        let value = 0;
        if (type === 'MINUS') {
            if (carts[index].quantity - 1 <= 0) return;
            value = carts[index].quantity - 1;
        }
        if (type === 'PLUS') {
            if (carts[index].quantity === +carts[index]?.detail.quantity) return;
            value = carts[index].quantity + 1;
        }
        dispatch(doUpdateCartAction({
            index, value
        }));
    }

    const handleDeleteOrder = (bookId) => {
        dispatch(doDeleteItemCartAction({ bookId }));
    }

    const handleCheckout = () => {
        if (carts.length === 0) {
            notification.error({
                message: 'Chưa có đơn hàng trong giỏ'
            })
            return;
        }
        props.setCurrentStep(1)
    }

    return (
        <div className='order-container'>
            <main className='order-body'>
                <div className='header'>
                    <div className='product left-header'>
                        <div className='header-checkbox'>
                            <Checkbox checked />
                        </div>
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
                                Số tiền
                            </div>
                            <div className='action'>
                                Thao tác
                            </div>
                        </div>

                    </div>
                </div>

                {carts && carts.length > 0
                    ?
                    carts?.map((book, index) => {
                        const detail = book?.detail;
                        return (
                            <section className='content' key={`book-${index}`}>
                                <div className='_9G37m'>
                                    <div className='kEMRam'>
                                        <div className='order-detail'>
                                            <div className='checkbox'>
                                                <Checkbox checked />
                                            </div>
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
                                                            <button onClick={() => handleChangeButton('MINUS', index)}>
                                                                <MinusOutlined className='custom-minus-plus' />
                                                            </button>
                                                            <input
                                                                value={book.quantity}
                                                                onChange={(e) => handleChangeInput(e.target.value, index)}
                                                            />
                                                            <button onClick={() => handleChangeButton('PLUS', index)}>
                                                                <PlusOutlined className='custom-minus-plus' />
                                                            </button>
                                                        </span>
                                                    </div>
                                                    <div className='total'>
                                                        <span>
                                                            ₫{new Intl.NumberFormat('vi-VN').format((+detail?.price ?? 0) * +book?.quantity)}
                                                        </span>
                                                    </div>
                                                    <div className='delete'>
                                                        <button
                                                            className='delete-button'
                                                            onClick={() => handleDeleteOrder(book._id)}
                                                        >
                                                            <span>Xóa</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )
                    })
                    :
                    <Empty description={'Không có sản phẩm trang giỏ hàng'} />
                }
            </main>
            <section className='order-footer'>
                <div className='left-footer'>
                    <div className='select-all-checkbox'>
                        <Checkbox checked />
                    </div>
                    <div className='select-all-text'>
                        Chọn tất cả
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
                        onClick={() => handleCheckout()}
                    >
                        Mua hàng ({carts?.length ?? 0})
                    </button>
                </div>
            </section>
        </div>
    )
}

export default ViewOrder;