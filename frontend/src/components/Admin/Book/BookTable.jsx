import { Col, Row, Table } from 'antd';
import InputSearch from './InputSearch';

const BookTable = () => {

    const columns = [
        {
            title: "Id",
            dataIndex: "_id",
        },
        {
            title: "Tên sách",
            dataIndex: "mainText",
            sorter: true,
        },
        {
            title: "Thể loại",
            dataIndex: "category",
            sorter: true,
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            sorter: true,
        },
        {
            title: "Giá tiền",
            dataIndex: "price",
            sorter: true,
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "updatedAt",
            sorter: true,
        },
        {
            title: "Action",
            render: (value, record, index) => {
                return (
                    <>
                        <button>Delete</button>
                    </>
                )
            }
        },
    ];

    const data = [
        {
            key: "1",
            _id: 123,
            mainText: 'Một đời',
            category: 'Music',
            author: 'Soobin',
            price: 120000,
            updatedAt: '12:20:00'
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch />
                </Col>
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        onChange={onChange}
                        title={() => 'Table List Books'}
                        pagination={
                            {
                                current: 1,
                                pageSize: 5,
                                showSizeChanger: true,
                            }
                        }
                    />
                </Col>
            </Row>
        </>
    )
}

export default BookTable;