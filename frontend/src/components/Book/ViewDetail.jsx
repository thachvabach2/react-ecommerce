import { Col, Divider, Rate, Row } from 'antd';
import { useState } from 'react';
import ImageGallery from "react-image-gallery";
import ModalGallery from './ModalGallery';
import './book.scss'

const ViewDetail = (props) => {

    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

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
                    <Col md={0} sm={24}>
                        <ImageGallery
                            items={images}
                            showFullscreenButton={false}
                            showPlayButton={false}
                            showNav={false}
                            showThumbnails={false}
                        />
                    </Col>
                    <Col span={24}>
                        <div className='author'>tác giả: Jung book</div>
                        <div className='title'>How Psychology Works - Hiểu Hết Về Tâm Lý Học</div>
                        <div className='rating'>
                            <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 12 }} />
                            <Divider type='vertical' />
                            <span className='sold'>Đã bán 27</span>
                        </div>
                        <div className='price'>
                            <span>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(111111111)}
                            </span>
                        </div>
                        <div className='delivery'>
                            <div>
                                <span> Vận chuyển</span>
                                <span>Miễn phí vận chuyển</span>
                            </div>
                        </div>
                        <div className='quantiry'>
                            <div>
                                <span>Số lượng</span>
                                <span>
                                    <button>-</button>
                                    <input />
                                    <button>+</button>
                                </span>
                            </div>
                        </div>
                        <div>
                            <button>Thêm vào giỏ hàng</button>
                            <button>Mua ngay</button>
                        </div>
                    </Col>
                </Col>
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