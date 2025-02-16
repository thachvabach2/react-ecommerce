import { Col, Image, Modal, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ImageGallery from "react-image-gallery";
import './book.scss'

const ModalGallery = (props) => {
    const { isOpenModalGallery, setIsOpenModalGallery, currentIndex, items, title } = props;

    // https://stackoverflow.com/questions/73607171/react-image-gallery-custom-play-function
    const galleryRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (isOpenModalGallery) {
            setActiveIndex(currentIndex);
        }
    }, [currentIndex, isOpenModalGallery])

    const handleGoToGallery = (index) => {
        galleryRef.current.slideToIndex(index);
    }


    return (
        <>
            <Modal
                width={'60vw'}
                open={isOpenModalGallery}
                onCancel={() => setIsOpenModalGallery(false)}
                footer={null}
                closable={false}
                className='modal-gallery'
            >
                <Row gutter={[20, 20]}>
                    <Col span={16}>
                        <ImageGallery
                            ref={galleryRef}
                            items={items}
                            showPlayButton={false} // hide play button
                            showFullscreenButton={false} // hide fullscreen button
                            startIndex={activeIndex}
                            showThumbnails={false} //hide thumbnail
                            onSlide={(i) => setActiveIndex(i)} // to set red border
                            slideDuration={0} // duration between slides change
                        />
                    </Col>
                    <Col span={8}>
                        <div>{title}</div>
                        <div>
                            <Row gutter={[20, 20]}>
                                {items?.map((item, index) => {
                                    return (
                                        <Col key={`image-${index}`}>
                                            <Image
                                                wrapperClassName={"img-normal"}
                                                width={80}
                                                height={80}
                                                src={item.original}
                                                preview={false}
                                                onClick={() => handleGoToGallery(index)} />
                                            <div className={activeIndex === index ? "active" : ""}></div>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default ModalGallery;