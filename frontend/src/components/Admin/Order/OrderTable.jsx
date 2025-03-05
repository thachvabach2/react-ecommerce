import { Button, Col, message, notification, Row, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { deleteABook, getListOrder } from '../../../services/api';
import moment from 'moment';
import { FOR_DATE_DISPLAY } from '../../../utils/constant';
import { ReloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const OrderTable = () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false)

    const [listOrder, setListOrder] = useState([]);

    const [filterQuery, setFilterQuery] = useState('');
    const [sortQuery, setSortQuery] = useState('&sort=-updatedAt');

    useEffect(() => {
        fetchListOrders();
    }, [current, pageSize, filterQuery, sortQuery])

    const fetchListOrders = async () => {
        let totalQuery = `current=${current}&pageSize=${pageSize}`;
        setIsLoading(true);

        if (filterQuery) {
            totalQuery += filterQuery;
        }

        if (sortQuery) {
            totalQuery += sortQuery;
        }

        const res = await getListOrder(totalQuery);
        if (res && res.data) {
            setListOrder(res.data.result);
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
            title: "Price",
            dataIndex: "totalPrice",
            sorter: true,
            render: (value, record, index) => {
                return (
                    <>
                        <span>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
                        </span>
                    </>
                )
            }
        },
        {
            title: "Name",
            dataIndex: "name",
            sorter: true,
        },
        {
            title: "Address",
            dataIndex: "address",
            sorter: true,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            sorter: true,
            render: (value, record, index) => {
                return (
                    <>
                        {value}
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
    }

    const renderHeader = () => {
        return (
            <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>
                        Table List Orders
                    </span>
                    <span>
                        <Space size={'middle'}>
                            <Button
                                type='ghost'
                                onClick={() => {
                                    setFilterQuery('');
                                    setSortQuery('&sort=-updatedAt');
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

    const handleDeleteBook = async (id) => {
        const res = await deleteABook(id);
        if (res && res.data) {
            message.success('Xóa book thành công');
            await fetchListBooks();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra!',
                description: res.message,
            })
        }
    }

    const handleExportData = () => {
        if (listOrder.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listOrder);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportBook.csv");
        }
    }

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                </Col>
                <Col span={24}>
                    <Table
                        title={() => renderHeader()}
                        columns={columns}
                        dataSource={listOrder}
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
        </>
    )
}

export default OrderTable;