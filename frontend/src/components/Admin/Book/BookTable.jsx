import { Button, Col, Popconfirm, Row, Space, Table } from 'antd';
import InputSearch from './InputSearch';
import { useEffect, useState } from 'react';
import { getListBooksWithPaginate } from '../../../services/api';
import moment from 'moment';
import { FOR_DATE_DISPLAY } from '../../../utils/constant';
import BookDrawerViewDetail from './BookDrawerViewDetail';
import { DeleteTwoTone, EditTwoTone, ExportOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import BookModalCreate from './BookModalCreate';
import BookModalUpdate from './BookModalUpdate';

const BookTable = () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false)

    const [listBook, setListBook] = useState([]);

    const [filterQuery, setFilterQuery] = useState('');
    const [sortQuery, setSortQuery] = useState('&sort=-updatedAt');

    const [isOpenDrawerViewDetail, setIsOpenDrawerViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState({});

    const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);

    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});

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
            render: (value, record, index) => {
                return (
                    <>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.price)}
                    </>
                )
            }
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
            render: (value, record, index) => (
                <>
                    <Space size={'large'}>
                        <Popconfirm
                            placement="left"
                            title={'Xác nhận xóa user'}
                            description={"Bạn có chắc chắn muốn xóa user này ?"}
                            // onConfirm={() => handleDeleteUser(record._id)}
                            okText={'Xác nhận'}
                            cancelText={'Hủy'}
                        >
                            <DeleteTwoTone
                                twoToneColor={'#FF0000'}
                                style={{ cursor: 'pointer' }}
                            />
                        </Popconfirm>

                        <EditTwoTone
                            twoToneColor={'#FFA500'}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setIsOpenModalUpdate(true);
                                setDataUpdate(record);
                            }}
                        />
                    </Space>
                </>
            )
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
                                onClick={() => setIsOpenModalCreate(true)}
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
                                pageSizeOptions: [3, 10, 20, 50, 100],
                                showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} items</div>) }
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

            <BookModalCreate
                isOpenModalCreate={isOpenModalCreate}
                setIsOpenModalCreate={setIsOpenModalCreate}
                fetchListBooks={fetchListBooks}
            />

            <BookModalUpdate
                isOpenModalUpdate={isOpenModalUpdate}
                setIsOpenModalUpdate={setIsOpenModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchListBooks={fetchListBooks}
            />
        </>
    )
}

export default BookTable;