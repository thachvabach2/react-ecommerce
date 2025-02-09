import { Button, Col, Row, Space, Table } from 'antd';
import InputSearch from './InputSearch';
import { useEffect, useState } from 'react';
import { getListBooksWithPaginate } from '../../../services/api';
import moment from 'moment';
import { FOR_DATE_DISPLAY } from '../../../utils/constant';
import BookDrawerViewDetail from './BookDrawerViewDetail';
import { ExportOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';

const BookTable = () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false)

    const [listBook, setListBook] = useState([]);

    const [filterQuery, setFilterQuery] = useState('');
    const [sortQuery, setSortQuery] = useState('');

    const [isOpenDrawerViewDetail, setIsOpenDrawerViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState({});

    useEffect(() => {
        fetchListBooks();
    }, [current, pageSize, filterQuery, sortQuery])

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

    const columns = [
        {
            title: "Id",
            dataIndex: "_id",
            render: (value, record, index) => {
                return (
                    <>
                        <a onClick={() => {
                            setIsOpenDrawerViewDetail(true);
                            setDataViewDetail(record);
                        }}>{value}</a >
                    </>
                )
            }
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
        if (sorter && sorter.field) {
            let q = ''
            if (sorter.order === 'ascend') {
                q = `&sort=${sorter.field}`
            } else if (sorter.order === 'descend') {
                q = `&sort=-${sorter.field}`
            }
            setSortQuery(q);
        }
        console.log("params", pagination, filters, sorter, extra);
    };

    const renderHeader = () => {
        return (
            <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>
                        Table List Books
                    </span>
                    <span>
                        <Space size={'middle'}>
                            <Button
                                type="primary"
                                icon={<ExportOutlined />}
                            >
                                Export
                            </Button>
                            <Button
                                type="primary"
                                icon={<PlusCircleOutlined />}
                            >
                                Thêm mới
                            </Button>
                            <Button
                                type='ghost'
                                onClick={() => {
                                    setFilterQuery('');
                                    setSortQuery('');
                                    setCurrent(1);
                                }}
                            >
                                <ReloadOutlined />
                            </Button>
                        </Space>
                    </span>
                </div>
            </>
        )
    }

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch
                        filterQuery={filterQuery}
                        setFilterQuery={setFilterQuery}
                        setCurrent={setCurrent}
                    />
                </Col>
                <Col span={24}>
                    <Table
                        title={() => renderHeader()}
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

            <BookDrawerViewDetail
                isOpenDrawerViewDetail={isOpenDrawerViewDetail}
                setIsOpenDrawerViewDetail={setIsOpenDrawerViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            />
        </>
    )
}

export default BookTable;