import { useLocation } from 'react-router-dom';
import ViewDetail from '../../components/Book/ViewDetail';
import { getBookById } from '../../services/api';
import { useEffect, useState } from 'react';

const BookPage = () => {
    let location = useLocation();

    const [dataBook, setDataBook] = useState({});

    const params = new URLSearchParams(location.search);
    const bookId = params?.get('id');

    useEffect(() => {
        fetchBookById();
    }, [bookId])

    const fetchBookById = async () => {
        const res = await getBookById(bookId);
        if (res && res.data) {
            let raw = res.data;
            raw.images = getImages(raw);
            setDataBook(raw);
        }
    }

    const getImages = (raw) => {
        const sliders = raw?.slider?.map(item => {
            return {
                original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                originalClass: "original-image",
                thumbnailClass: "thumbnail-image"
            }
        })
        const thumbnail = {
            original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
            thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        }
        return [thumbnail, ...sliders];
    }

    return (
        <>
            <ViewDetail
                dataBook={dataBook}
            />
        </>
    )
}

export default BookPage;