import { Button, Checkbox, Col, Divider, Form, InputNumber, Pagination, Rate, Row, Tabs, Tag } from 'antd';
import { FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import './home.scss'

const Home = () => {

    const [form] = Form.useForm()

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

    const handleChangeFilter = (changedValues, values) => {
        console.log(">>> check handleChangeFilter", changedValues, values)
    }

    const onFinish = (values) => {

    }

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <div className='homepage-container'>
            <Row style={{ marginLeft: 0, marginRight: 0 }}>
                <Col
                    xs={0} sm={0} md={4} lg={4} xl={4}
                    style={{ border: '1px solid green' }}
                >
                    <div style={{ marginRight: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: "space-between" }}>
                            <span>
                                <FilterOutlined /> Bộ lọc tìm kiếm
                            </span>
                            <ReloadOutlined title="Reset" onClick={() => form.resetFields()} />
                        </div>
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
                            // rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Checkbox.Group style={{ flexDirection: 'column' }}>
                                    <Row><Checkbox value='Anh'>A</Checkbox></Row>
                                    <Row><Checkbox value='B'>B</Checkbox></Row>
                                    <Row><Checkbox value='C'>C</Checkbox></Row>
                                    <Row><Checkbox value='D'>D</Checkbox></Row>
                                    <Row><Checkbox value='E'>E</Checkbox></Row>
                                </Checkbox.Group>
                            </Form.Item>
                            <Divider />

                            <Form.Item
                                label='Khoảng giá'
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}   >
                                    <Form.Item
                                        name={["range", 'from']}
                                    >
                                        <InputNumber
                                            name='from'
                                            min={0}
                                            placeholder='đ Từ'
                                            style={{ width: '5.3rem' }}
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        />
                                    </Form.Item>
                                    <span>_</span>

                                    <Form.Item
                                        name={["range", 'to']}
                                    >
                                        <InputNumber
                                            name='to'
                                            min={0}
                                            placeholder='đ Từ'
                                            style={{ width: '5.3rem' }}
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        />
                                    </Form.Item>
                                </div>
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
                <Col
                    xs={24} sm={24} md={20} lg={20} xl={20}
                    style={{ border: '1px solid red' }}
                >
                    <Row>
                        <Tabs defaultActiveKey="1" onChange={onChange} items={items} />
                    </Row>
                    <Row>
                        <div className='custom-row'>
                            <div className='column'>
                                <div className='wrapper'>
                                    <div className='thumbnail'>
                                        <img src='http://localhost:8080/images/book/1-5e81d7f66dada42752efb220d7b2956c.jpg' />
                                    </div>
                                    <div className='details'>
                                        <div className='text'>
                                            <Tag className='tag-mall'
                                            >
                                                Mall
                                            </Tag>

                                            Sách - Sách Nói Điện Tử Song Ngữ Anh - Việt cho trẻ em từ 1-7 tuổi
                                        </div>
                                        <div className='price'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className='rating'>
                                            <Rate disabled defaultValue={5} style={{ fontSize: 10, paddingRight: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='column'>
                                <div className='wrapper'>
                                    <div className='thumbnail'>
                                        <img src='http://localhost:8080/images/book/1-5e81d7f66dada42752efb220d7b2956c.jpg' />
                                    </div>
                                    <div className='details'>
                                        <div className='text'>
                                            <Tag className='tag-mall'
                                            >
                                                Mall
                                            </Tag>

                                            Sách - Sách Nói Điện Tử Song Ngữ Anh - Việt cho trẻ em từ 1-7 tuổi
                                        </div>
                                        <div className='price'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className='rating'>
                                            <Rate disabled defaultValue={5} style={{ fontSize: 10, paddingRight: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='column'>
                                <div className='wrapper'>
                                    <div className='thumbnail'>
                                        <img src='http://localhost:8080/images/book/1-5e81d7f66dada42752efb220d7b2956c.jpg' />
                                    </div>
                                    <div className='details'>
                                        <div className='text'>
                                            <Tag className='tag-mall'
                                            >
                                                Mall
                                            </Tag>

                                            Sách - Sách Nói Điện Tử Song Ngữ Anh - Việt cho trẻ em từ 1-7 tuổi
                                        </div>
                                        <div className='price'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className='rating'>
                                            <Rate disabled defaultValue={5} style={{ fontSize: 10, paddingRight: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='column'>
                                <div className='wrapper'>
                                    <div className='thumbnail'>
                                        <img src='http://localhost:8080/images/book/1-5e81d7f66dada42752efb220d7b2956c.jpg' />
                                    </div>
                                    <div className='details'>
                                        <div className='text'>
                                            <Tag className='tag-mall'
                                            >
                                                Mall
                                            </Tag>

                                            Sách - Sách Nói Điện Tử Song Ngữ Anh - Việt cho trẻ em từ 1-7 tuổi
                                        </div>
                                        <div className='price'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className='rating'>
                                            <Rate disabled defaultValue={5} style={{ fontSize: 10, paddingRight: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='column'>
                                <div className='wrapper'>
                                    <div className='thumbnail'>
                                        <img src='http://localhost:8080/images/book/1-5e81d7f66dada42752efb220d7b2956c.jpg' />
                                    </div>
                                    <div className='details'>
                                        <div className='text'>
                                            <Tag className='tag-mall'
                                            >
                                                Mall
                                            </Tag>

                                            Sách - Sách Nói Điện Tử Song Ngữ Anh - Việt cho trẻ em từ 1-7 tuổi
                                        </div>
                                        <div className='price'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className='rating'>
                                            <Rate disabled defaultValue={5} style={{ fontSize: 10, paddingRight: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='column'>
                                <div className='wrapper'>
                                    <div className='thumbnail'>
                                        <img src='http://localhost:8080/images/book/1-5e81d7f66dada42752efb220d7b2956c.jpg' />
                                    </div>
                                    <div className='details'>
                                        <div className='text'>
                                            <Tag className='tag-mall'
                                            >
                                                Mall
                                            </Tag>

                                            Sách - Sách Nói Điện Tử Song Ngữ Anh - Việt cho trẻ em từ 1-7 tuổi
                                        </div>
                                        <div className='price'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className='rating'>
                                            <Rate disabled defaultValue={5} style={{ fontSize: 10, paddingRight: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='column'>
                                <div className='wrapper'>
                                    <div className='thumbnail'>
                                        <img src='http://localhost:8080/images/book/1-5e81d7f66dada42752efb220d7b2956c.jpg' />
                                    </div>
                                    <div className='details'>
                                        <div className='text'>
                                            <Tag className='tag-mall'
                                            >
                                                Mall
                                            </Tag>

                                            Sách - Sách Nói Điện Tử Song Ngữ Anh - Việt cho trẻ em từ 1-7 tuổi
                                        </div>
                                        <div className='price'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className='rating'>
                                            <Rate disabled defaultValue={5} style={{ fontSize: 10, paddingRight: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='column'>
                                <div className='wrapper'>
                                    <div className='thumbnail'>
                                        <img src='http://localhost:8080/images/book/1-5e81d7f66dada42752efb220d7b2956c.jpg' />
                                    </div>
                                    <div className='details'>
                                        <div className='text'>
                                            <Tag className='tag-mall'
                                            >
                                                Mall
                                            </Tag>

                                            Sách - Sách Nói Điện Tử Song Ngữ Anh - Việt cho trẻ em từ 1-7 tuổi
                                        </div>
                                        <div className='price'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className='rating'>
                                            <Rate disabled defaultValue={5} style={{ fontSize: 10, paddingRight: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='column'>
                                <div className='wrapper'>
                                    <div className='thumbnail'>
                                        <img src='http://localhost:8080/images/book/1-5e81d7f66dada42752efb220d7b2956c.jpg' />
                                    </div>
                                    <div className='details'>
                                        <div className='text'>
                                            <Tag className='tag-mall'
                                            >
                                                Mall
                                            </Tag>

                                            Sách - Sách Nói Điện Tử Song Ngữ Anh - Việt cho trẻ em từ 1-7 tuổi
                                        </div>
                                        <div className='price'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className='rating'>
                                            <Rate disabled defaultValue={5} style={{ fontSize: 10, paddingRight: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='column'>
                                <div className='wrapper'>
                                    <div className='thumbnail'>
                                        <img src='http://localhost:8080/images/book/1-5e81d7f66dada42752efb220d7b2956c.jpg' />
                                    </div>
                                    <div className='details'>
                                        <div className='text'>
                                            <Tag className='tag-mall'
                                            >
                                                Mall
                                            </Tag>

                                            Sách - Sách Nói Điện Tử Song Ngữ Anh - Việt cho trẻ em từ 1-7 tuổi
                                        </div>
                                        <div className='price'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className='rating'>
                                            <Rate disabled defaultValue={5} style={{ fontSize: 10, paddingRight: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='column'>
                                <div className='wrapper'>
                                    <div className='thumbnail'>
                                        <img src='http://localhost:8080/images/book/1-5e81d7f66dada42752efb220d7b2956c.jpg' />
                                    </div>
                                    <div className='details'>
                                        <div className='text'>
                                            <Tag className='tag-mall'
                                            >
                                                Mall
                                            </Tag>

                                            Sách - Sách Nói Điện Tử Song Ngữ Anh - Việt cho trẻ em từ 1-7 tuổi
                                        </div>
                                        <div className='price'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className='rating'>
                                            <Rate disabled defaultValue={5} style={{ fontSize: 10, paddingRight: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='column'>
                                <div className='wrapper'>
                                    <div className='thumbnail'>
                                        <img src='http://localhost:8080/images/book/1-5e81d7f66dada42752efb220d7b2956c.jpg' />
                                    </div>
                                    <div className='details'>
                                        <div className='text'>
                                            <Tag className='tag-mall'
                                            >
                                                Mall
                                            </Tag>

                                            Sách - Sách Nói Điện Tử Song Ngữ Anh - Việt cho trẻ em từ 1-7 tuổi
                                        </div>
                                        <div className='price'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className='rating'>
                                            <Rate disabled defaultValue={5} style={{ fontSize: 10, paddingRight: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='column'>
                                <div className='wrapper'>
                                    <div className='thumbnail'>
                                        <img src='http://localhost:8080/images/book/1-5e81d7f66dada42752efb220d7b2956c.jpg' />
                                    </div>
                                    <div className='details'>
                                        <div className='text'>
                                            <Tag className='tag-mall'
                                            >
                                                Mall
                                            </Tag>

                                            Sách - Sách Nói Điện Tử Song Ngữ Anh - Việt cho trẻ em từ 1-7 tuổi
                                        </div>
                                        <div className='price'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className='rating'>
                                            <Rate disabled defaultValue={5} style={{ fontSize: 10, paddingRight: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='column'>
                                <div className='wrapper'>
                                    <div className='thumbnail'>
                                        <img src='http://localhost:8080/images/book/1-5e81d7f66dada42752efb220d7b2956c.jpg' />
                                    </div>
                                    <div className='details'>
                                        <div className='text'>
                                            <Tag className='tag-mall'
                                            >
                                                Mall
                                            </Tag>

                                            Sách - Sách Nói Điện Tử Song Ngữ Anh - Việt cho trẻ em từ 1-7 tuổi
                                        </div>
                                        <div className='price'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className='rating'>
                                            <Rate disabled defaultValue={5} style={{ fontSize: 10, paddingRight: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Row>
                    <Divider />
                    <Row>
                        <Pagination
                            defaultCurrent={6}
                            total={500}
                            // responsive
                            style={{ margin: '0 auto 2rem auto' }} />
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Home;