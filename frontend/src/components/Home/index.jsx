import { Button, Checkbox, Col, Divider, Empty, Form, InputNumber, notification, Pagination, Rate, Row, Spin, Tabs, Tag } from 'antd';
import { FilterTwoTone, ReloadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getBookCategories, getListBooksWithPaginate } from '../../services/api';
import './home.scss'
import { MAX_PRICE } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [listCategory, setListCategory] = useState([]);

    const [listBook, setListBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [filterQuery, setFilterQuery] = useState('');
    const [sortQuery, setSortQuery] = useState('&sort=-sold');

    const items = [
        {
            label: `Phổ biến`,
            key: '&sort=-sold',
            children: <></>,
        },
        {
            label: `Hàng mới`,
            key: '&sort=-updatedAt',
            children: <></>,
        },
        {
            label: `Giá thấp đến cao`,
            key: '&sort=price',
            children: <></>,
        },
        {
            label: `Giá cao đến thấp`,
            key: '&sort=-price',
            children: <></>,
        },
    ]

    useEffect(() => {
        const fetchListCategory = async () => {
            const res = await getBookCategories();
            if (res && res.data) {
                let categoryFormatted = res.data.map(item => {
                    return {
                        value: item,
                        label: item,
                    }
                })
                setListCategory(categoryFormatted);
            }
        }

        fetchListCategory();
    }, [])

    useEffect(() => {
        fetchListBooks();
    }, [current, pageSize, sortQuery, filterQuery])

    const fetchListBooks = async () => {
        let totalQuery = `current=${current}&pageSize=${pageSize}`;
        setIsLoading(true);

        if (filterQuery) {
            totalQuery += filterQuery;
        }

        if (sortQuery) {
            totalQuery += sortQuery;
        }

        const res = await getListBooksWithPaginate(totalQuery);
        if (res && res.data) {
            setListBook(res.data.result);
            setTotal(res.data.meta.total)
        }
        setIsLoading(false);
        console.log('>>> check total query: ', totalQuery);
    }

    const handleChangeFilter = (changedValues, values) => {
        // only fire if change category
        if (changedValues.category) {
            const cate = changedValues.category;
            if (cate && cate.length > 0) {
                let stringCategory = changedValues.category.join(',');
                setFilterQuery(`&category=${stringCategory}`);
                setCurrent(1);
            }
            else {
                setFilterQuery('');
            }
        }
    }

    const onFinish = (values) => {
        console.log('check values: ', values)
        if (!values?.range?.from && !values?.range?.to) {
            notification.error({
                message: 'Vui lòng nhập khoảng giá phù hợp',
            })
            return;
        }

        if (values?.range?.from >= 0 || values?.range?.to >= 0) {
            let query = `&price>=${values?.range?.from ?? 0}&price<=${values?.range?.to ?? MAX_PRICE}`;
            if (values?.category?.length > 0) {
                const cate = values.category.join(',');
                query += `&category=${cate}`
            }
            console.log('check querry in finish: ', query)
            setFilterQuery(query);
        } else {
            notification.error({
                message: 'Vui lòng nhập khoảng giá phù hợp',
            })
        }
    }

    const onChangeTab = (key) => {
        setSortQuery(key);
        setCurrent(1);
        console.log(key);
    };

    const onChangePagination = (pagination) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
        console.log('>>> check pagination: ', pagination)
    }

    const nonAccentVietnamese = (str) => {
        str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }

    const convertSlug = (str) => {
        str = nonAccentVietnamese(str);
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
        const to = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    }

    const handleRedirectBook = (book) => {
        const slug = convertSlug(book.mainText);
        navigate(`/book/${slug}?id=${book._id}`);
    }

    // console.log('>>> check book: ', listBook)

    return (
        <div className='homepage-container'>
            <Row style={{ marginLeft: 0, marginRight: 0 }}>
                <Col xs={0} sm={0} md={4} lg={4} xl={4}>
                    <div style={{ marginRight: '5px' }}>
                        <div
                            className='search-filter-status'
                            style={{
                                display: 'flex', justifyContent: "space-between", textAlign: 'center',
                                height: '2.8rem', lineHeight: '2.8rem'
                            }}
                        >
                            <span style={{ display: 'flex' }}>
                                <FilterTwoTone style={{ margin: 'auto 0.5rem auto 0' }} />
                                <h2 style={{
                                    fontSize: '1rem', textTransform: 'uppercase',
                                    fontWeight: 500,
                                    lineHeight: 1.2,
                                    margin: 'auto',
                                }}
                                >
                                    Bộ lọc tìm kiếm
                                </h2>
                            </span>
                            <ReloadOutlined
                                title="Reset"
                                onClick={() => {
                                    form.resetFields();
                                    setFilterQuery('');
                                    // setSortQuery('&sort=-sold')
                                    setCurrent(1)
                                }}
                                style={{ margin: 'auto 0' }} />
                        </div>
                        <Divider style={{ margin: '0 0 18px 0' }} />
                        <Form
                            form={form}
                            name="basic"
                            onValuesChange={(changedValues, values) => handleChangeFilter(changedValues, values)}
                            onFinish={onFinish}
                            layout='vertical'
                        >
                            <Form.Item
                                label="Danh mục sản phẩm"
                                name="category"
                            >
                                <Checkbox.Group style={{ flexDirection: 'column', gap: '0.875rem' }}>
                                    {listCategory?.map((category, index) => {
                                        return (
                                            <Row key={`${category}-${index}`}>
                                                <Checkbox value={category.value}>
                                                    {category.label}
                                                </Checkbox>
                                            </Row>
                                        )
                                    })}
                                </Checkbox.Group>
                            </Form.Item>
                            <Divider />

                            <Form.Item
                                label='Khoảng giá'
                            >
                                <Row gutter={[10, 10]}>
                                    <Col lg={11} md={24}>
                                        <Form.Item
                                            name={["range", 'from']}
                                        >
                                            <InputNumber
                                                name='from'
                                                min={0}
                                                placeholder='đ Từ'
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                style={{ width: '100%' }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col lg={2} md={0}>
                                        <div>-</div>
                                    </Col>
                                    <Col lg={11} md={24}>
                                        <Form.Item
                                            name={["range", 'to']}
                                        >
                                            <InputNumber
                                                name='to'
                                                min={0}
                                                placeholder='đ Đến'
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                style={{ width: '100%' }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <div>
                                    <Button onClick={() => form.submit()}
                                        style={{ width: "100%" }} type='primary'>Áp dụng</Button>
                                </div>
                            </Form.Item>
                            <Divider />

                            <Form.Item
                                label="Đánh giá"
                                labelCol={{ span: 24 }}
                            >
                                <div>
                                    <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    <span className="ant-rate-text"></span>
                                </div>
                                <div>
                                    <Rate value={4} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    <span className="ant-rate-text">trở lên</span>
                                </div>
                                <div>
                                    <Rate value={3} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    <span className="ant-rate-text">trở lên</span>
                                </div>
                                <div>
                                    <Rate value={2} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    <span className="ant-rate-text">trở lên</span>
                                </div>
                                <div>
                                    <Rate value={1} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    <span className="ant-rate-text">trở lên</span>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                    <Spin spinning={isLoading} tip="Loading...">
                        <Row>
                            <Tabs
                                defaultActiveKey="&sort=-sold"
                                onChange={onChangeTab}
                                items={items}
                                style={{ overflowX: "auto" }}
                            />
                        </Row>

                        {listBook && listBook.length > 0
                            ?
                            <Row className='custom-row'>
                                {listBook.map(book => {
                                    return (
                                        <div className='column'
                                            key={book._id}
                                            onClick={() => handleRedirectBook(book)}
                                        >
                                            <div className='wrapper' >
                                                <div className='thumbnail'>
                                                    <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book.thumbnail}`} alt="thumbnail book" />
                                                </div>
                                                <div className='details'>
                                                    <div className='text top-detail'>
                                                        <Tag className='tag-mall'>Mall</Tag>
                                                        {book.mainText}
                                                    </div>
                                                    <div className='bottom-detail'> {/* handle detail place at bottom */}
                                                        <div className='price'>
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.price ?? 0)}
                                                        </div>
                                                        <div className='rating'>
                                                            <Rate disabled defaultValue={5} style={{ fontSize: 8, paddingRight: 10 }} />
                                                            <span>Đã bán {book.sold}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </Row>
                            :
                            < Empty />
                        }

                        <Divider />
                        <Row>
                            <Pagination
                                current={current}
                                pageSize={pageSize}
                                total={total}
                                // responsive
                                showSizeChanger={true}
                                onChange={(p, s) => onChangePagination({ current: p, pageSize: s })}
                                style={{ margin: '0 auto 2rem auto' }}
                            />
                        </Row>
                    </Spin>
                </Col>
            </Row>
        </div >
    )
}

export default Home;