import { Col, Divider, Rate, Row } from 'antd';
import { useState } from 'react';
import ImageGallery from "react-image-gallery";
import ModalGallery from './ModalGallery';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { BsCartPlus } from "react-icons/bs";
import BookLoader from './BookLoader';
import './book.scss'

const ViewDetail = (props) => {
    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
    ];

    return (
        <div className='view-detail-book'>
            <Row gutter={[10, 10]}
                style={{ border: '1px solid black' }}
                className='card-detail'>
                {isLoading === false ?
                    <>
                        <Col md={10} sm={0} xs={0}
                            className='left-content'
                            style={{ border: '1px solid red' }}
                        >
                            <ImageGallery
                                items={images}
                                showPlayButton={false}
                                showFullscreenButton={false}
                                showNav={false}
                                slideOnThumbnailOver={true}
                                onSlide={(curr) => setCurrentIndex(curr)} //need
                                onClick={() => setIsOpenModalGallery(true)}
                                slideDuration={200}
                            // nếu rãnh add onThumbnailClick để mở modal cho giống shoppe
                            />
                        </Col>
                        <Col md={14} sm={24}
                            style={{ border: '1px solid green' }}
                            className='right-content'>
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
                                    <div className='author'>Tác giả: <a>Jung book</a></div>
                                    <div className='title'>How Psychology Works - Hiểu Hết Về Tâm Lý Học</div>
                                    <div className='rating'>
                                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 12 }} />
                                        <span>
                                            <Divider type='vertical' />
                                            <span className='sold'>Đã bán 27</span>
                                        </span>
                                    </div>
                                    <div className='price'>
                                        <span className='currency'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(111111111)}
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
                                            <button><MinusOutlined /></button>
                                            <input defaultValue={1} />
                                            <button><PlusOutlined /></button>
                                        </span>
                                    </div>
                                    <div className='buy'>
                                        <button className='cart btn btn-tinted'>
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
                title={'hardcode'}
            />
        </div>
    )
}

export default ViewDetail;