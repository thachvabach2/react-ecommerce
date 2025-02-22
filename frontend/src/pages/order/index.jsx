import { Button, Result, Steps } from 'antd';
import ViewOrder from '../../components/Order/ViewOrder';
import './order.scss'
import { useState } from 'react';
import Payment from '../../components/Order/Payment';

const OrderPage = () => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <>
            <div className='order-steps'>
                <Steps
                    size="small"
                    current={currentStep}
                    status={"finish"}
                    items={[
                        {
                            title: 'Đơn hàng',
                        },
                        {
                            title: 'Đặt hàng',
                        },
                        {
                            title: 'Thanh toán',
                        },
                    ]}
                />
            </div>
            {currentStep === 0 &&
                <ViewOrder setCurrentStep={setCurrentStep} />
            }
            {currentStep === 1 &&
                <Payment setCurrentStep={setCurrentStep} />
            }
            {currentStep === 2 &&
                <Result
                    status="success"
                    title="Đơn hàng đã được đặt thành công!"
                    subTitle="Đơn hàng đã được đặt thành công!"
                    className='result-order'
                    extra={[
                        <Button type="primary" key="console">
                            Xem lịch sử
                        </Button>,
                    ]}
                />
            }
        </>
    )
}

export default OrderPage;