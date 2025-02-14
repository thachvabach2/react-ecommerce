import { Button, Checkbox, Col, Divider, Form, InputNumber, Pagination, Rate, Row, Tabs, Tag } from 'antd';
import { FilterTwoTone, ReloadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getBookCategories, getListBooksWithPaginate } from '../../services/api';
import './home.scss'

const Home = () => {
    const [form] = Form.useForm()

    const [listCategory, setListCategory] = useState([])

    const [listBook, setListBook] = useState([])
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false)

    const [filterQuery, setFilterQuery] = useState('');
    const [sortQuery, setSortQuery] = useState('&sort=-sold');

    const items = [
        {
            label: `Phổ biến`,
            key: '1',
            children: <></>,
        },
        {
            label: `Hàng mới`,
            key: '2',
            children: <></>,
        },
        {
            label: `Giá thấp đến cao`,
            key: '3',
            children: <></>,
        },
        {
            label: `Giá cao đến thấp`,
            key: '4',
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
        console.log(">>> check handleChangeFilter", changedValues, values)
    }

    const onFinish = (values) => {

    }

    const onChangeTab = (key) => {
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
                            <ReloadOutlined title="Reset" onClick={() => form.resetFields()} style={{ margin: 'auto 0' }} />
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
                    <Row>
                        <Tabs
                            defaultActiveKey="1"
                            onChange={onChangeTab}
                            items={items}
                            style={{ overflowX: "auto" }}
                        />
                    </Row>
                    <Row className='custom-row'>
                        {listBook.map(book => {
                            return (
                                <div className='column' key={book._id}>
                                    <div className='wrapper'>
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
                </Col>
            </Row>
        </div >
    )
}

export default Home;