import { Col, Row, Table } from 'antd';
import InputSearch from './InputSearch';
import { useEffect, useState } from 'react';
import { getListBooksWithPaginate } from '../../../services/api';
import moment from 'moment';
import { FOR_DATE_DISPLAY } from '../../../utils/constant';

const BookTable = () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false)

    const [listBook, setListBook] = useState([]);

    useEffect(() => {
        fetchListBooks();
    }, [current, pageSize])

    const fetchListBooks = async () => {
        let totalQuery = `current=${current}&pageSize=${pageSize}`;
        setIsLoading(true);
        const res = await getListBooksWithPaginate(totalQuery);
        if (res && res.data && res.data.result.length > 0) {
            setListBook(res.data.result);
            setTotal(res.data.meta.total)
        }
        setIsLoading(false);
        // console.log('>>> check res: ', res);
    }

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
            render: (value, record, index) => {
                return (
                    <>
                        <span>
                            {moment(value).format(FOR_DATE_DISPLAY)}
                        </span>
                    </>
                )
            }
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

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
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
                        title={() => 'Table List Books'}
                        columns={columns}
                        dataSource={listBook}
                        rowKey={'_id'}
                        onChange={onChange}
                        loading={isLoading}
                        pagination={
                            {
                                current: current,
                                pageSize: pageSize,
                                total: total,
                                showSizeChanger: true,
                                pageSizeOptions: [3, 10, 20, 50, 100]
                            }
                        }
                    />
                </Col>
            </Row>
        </>
    )
}

export default BookTable;