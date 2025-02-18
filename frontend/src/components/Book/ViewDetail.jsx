import { Col, Divider, notification, Rate, Row } from 'antd';
import { useState } from 'react';
import ImageGallery from "react-image-gallery";
import ModalGallery from './ModalGallery';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { BsCartPlus } from "react-icons/bs";
import BookLoader from './BookLoader';
import './book.scss'
import { useDispatch } from 'react-redux';
import { doAddToCartAction } from '../../redux/order/orderSlice';

const ViewDetail = (props) => {
    const { dataBook } = props;
    const images = dataBook?.images ?? [];

    const dispatch = useDispatch();

    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [currentQuantity, setCurrentQuantity] = useState(1);

    const handleChangeInput = (value) => {
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value)) {
            if (+value <= dataBook?.quantity) {
                setCurrentQuantity(+value);
            } else {
                setCurrentQuantity(dataBook?.quantity);
            }
        }
    }

    const handleChangeButton = (type) => {
        if (type === 'MINUS') {
            if (currentQuantity - 1 <= 0) return
            setCurrentQuantity(currentQuantity - 1);

        }
        if (type === 'PLUS') {
            if (currentQuantity === +dataBook?.quantity) return;
            setCurrentQuantity(currentQuantity + 1);
        }
    }

    const handleAddToCart = () => {
        if (currentQuantity > 0) {
            dispatch(doAddToCartAction({
                quantity: currentQuantity,
                detail: dataBook,
                _id: dataBook._id,
            }));
        } else {
            notification.error({
                message: 'Số lượng phải lớn hơn 0!'
            })
        }
    }

    console.log('>>>> check dataBook: ', dataBook);

    return (
        <div className='view-detail-book'>
            <Row gutter={[10, 10]} className='card-detail'>
                {dataBook && dataBook._id ?
                    <>
                        <Col md={10} sm={0} xs={0} className='left-content' >
                            <ImageGallery
                                items={images}
                                showPlayButton={false}
                                showFullscreenButton={false}
                                showNav={false}
                                slideOnThumbnailOver={true}
                                onSlide={(curr) => setCurrentIndex(curr)} //need
                                onClick={() => setIsOpenModalGallery(true)}
                                slideDuration={350}
                            // nếu rãnh add onThumbnailClick để mở modal cho giống shoppe
                            />
                        </Col>
                        <Col md={14} sm={24} className='right-content'>
                            <Row gutter={[20, 20]} style={{ fontSize: 16 }}>
                                {/* fix bug image xs */}
                                <Col md={0} sm={24} xs={24} className='col-no-plr'>
                                    <ImageGallery
                                        items={images}
                                        showFullscreenButton={false}
                                        showPlayButton={false}
                                        showNav={false}
                                        showThumbnails={false}
                                    />
                                </Col>
                                <Col span={24}>
                                    <div className='author'>Tác giả: <a>{dataBook?.author}</a></div>
                                    <div className='title'>{dataBook?.mainText}</div>
                                    <div className='rating'>
                                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 12 }} />
                                        <span>
                                            <Divider type='vertical' />
                                            <span className='sold'>Đã bán {dataBook?.sold}</span>
                                        </span>
                                    </div>
                                    <div className='price'>
                                        <span className='currency'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataBook?.price ?? 0)}
                                        </span>
                                    </div>
                                    <div className='delivery'>
                                        <div>
                                            <span className='left-side'> Vận chuyển</span>
                                            <span className='right-side'>Miễn phí vận chuyển</span>
                                        </div>
                                    </div>
                                    <div className='quantity'>
                                        <span className='left-side'>Số lượng</span>
                                        <span className='right-side'>
                                            <button onClick={() => handleChangeButton('MINUS')}><MinusOutlined /></button>
                                            <input
                                                value={currentQuantity}
                                                onChange={(e) => handleChangeInput(e.target.value)}
                                            />
                                            <button onClick={() => handleChangeButton('PLUS')}><PlusOutlined /></button>
                                            <div className='available'>{dataBook?.quantity} sản phẩm có sẵn</div>
                                        </span>
                                    </div>
                                    <div className='buy'>
                                        <button
                                            className='cart btn btn-tinted'
                                            onClick={() => handleAddToCart()}
                                        >
                                            <BsCartPlus className='icon-cart' size={20} />
                                            <span>Thêm vào giỏ hàng</span>
                                        </button>
                                        <button className='now btn'>Mua ngay</button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </>
                    :
                    <BookLoader />
                }


            </Row>

            <ModalGallery
                isOpenModalGallery={isOpenModalGallery}
                setIsOpenModalGallery={setIsOpenModalGallery}
                currentIndex={currentIndex}
                items={images}
                title={dataBook?.mainText}
            />
        </div>
    )
}

export default ViewDetail;