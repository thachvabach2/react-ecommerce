import { Button, Col, message, notification, Popconfirm, Row, Space, Table } from 'antd';
import InputSearch from './InputSerch';
import { useEffect, useState } from 'react';
import { deleteAUser, getUsersWithPaginate } from '../../../services/api';
import UserDrawerViewDetail from './UserDrawerViewDetail';
import { DeleteTwoTone, EditTwoTone, ExportOutlined, ImportOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import UserModalCreate from './UserModalCreate';
import UserModalImport from './data/UserModalImport';
import moment from 'moment';
import { FOR_DATE_DISPLAY } from '../../../utils/constant';
import * as XLSX from 'xlsx';
import UserModalUpdate from './UserModalUpdate';

const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const [sortQuery, setSortQuery] = useState('');
    const [filter, setFilter] = useState('');

    const [isOpenDrawerViewDetail, setIsOpenDrawerViewDetail] = useState(false);
    const [dataUserViewDetail, setDataUserViewDetail] = useState(null);

    const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);

    const [isOpenModalImport, setIsOpenModalImport] = useState(false);

    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
    const [dataUserUpdate, setDataUserUpdate] = useState({});

    useEffect(() => {
        fetchUsersWithPaginate();
    }, [current, pageSize, sortQuery, filter])

    const columns = [
        {
            title: "Id",
            dataIndex: "_id",
            render: (value, record, index) => {
                return (
                    <>
                        <a onClick={() => {
                            setDataUserViewDetail(record);
                            setIsOpenDrawerViewDetail(true);
                        }}>{value}</a>
                    </>
                )
            }
        },
        {
            title: "Tên hiển thị",
            dataIndex: "fullName",
            sorter: true,
        },
        {
            title: "Email",
            dataIndex: "email",
            sorter: true,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            sorter: true,
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "updatedAt",
            sorter: true,
            render: (value, record, index) => {
                return (
                    <span>
                        {moment(record?.updatedAt).format(FOR_DATE_DISPLAY)}
                    </span>
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
                            onConfirm={() => handleDeleteUser(record._id)}
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
                                setDataUserUpdate(record);
                            }}
                        />
                    </Space>
                </>
            )
        },
    ];

    const fetchUsersWithPaginate = async () => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`;

        if (filter) {
            query += filter;
        }

        if (sortQuery) {
            query += sortQuery;
        }
        console.log('>>> check total query: ', query)

        const res = await getUsersWithPaginate(query);
        if (res && res.data) {
            setListUser(res.data.result)
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    }

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
                q = `&sort=-${sorter.field}`;
            }
            setSortQuery(q);
        }

        console.log("params", pagination, filters, sorter, extra);
    };

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List Users</span>
                <span>
                    <Space size="middle">
                        <Button
                            icon={<ExportOutlined />}
                            type="primary"
                            onClick={() => handleExportData()}
                        >Export</Button>

                        <Button
                            icon={<ImportOutlined />}
                            type="primary"
                            onClick={() => setIsOpenModalImport(true)}
                        >Import</Button>

                        <Button
                            icon={<PlusCircleOutlined />}
                            type="primary"
                            onClick={() => setIsOpenModalCreate(true)}
                        >Thêm mới</Button>

                        <Button
                            type='ghost'
                            onClick={() => {
                                setFilter('');
                                setSortQuery('');
                                setCurrent(1);
                            }}
                        >
                            <ReloadOutlined />
                        </Button>
                    </Space>
                </span>
            </div>
        )
    }

    const handleExportData = () => {
        if (listUser.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listUser);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportUser.csv");
        }
    }

    const handleDeleteUser = async (userId) => {
        const res = await deleteAUser(userId);
        if (res && res.data) {
            message.success('Xóa user thành công');
            await fetchUsersWithPaginate();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra!',
                description: res.message,
            })
        }
    }

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch
                        setFilter={setFilter}
                        setCurrent={setCurrent}
                    />
                </Col>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        className='def'
                        columns={columns}
                        dataSource={listUser}
                        onChange={onChange}
                        rowKey={'_id'}
                        loading={isLoading}
                        pagination={{
                            current: current,
                            pageSize: pageSize,
                            total: total,
                            showTotal: (total, range) => { return (<div>{range[0]} - {range[1]} of {total} items</div>) },
                            showSizeChanger: true,
                            pageSizeOptions: ['5', '10', '20', '50', '100']
                        }}
                    />
                </Col>
            </Row>
            <UserDrawerViewDetail
                isOpenDrawerViewDetail={isOpenDrawerViewDetail}
                setIsOpenDrawerViewDetail={setIsOpenDrawerViewDetail}
                dataUserViewDetail={dataUserViewDetail}
                setDataUserViewDetail={setDataUserViewDetail}
            />

            <UserModalCreate
                isOpenModalCreate={isOpenModalCreate}
                setIsOpenModalCreate={setIsOpenModalCreate}
                fetchUsersWithPaginate={fetchUsersWithPaginate}
            />

            <UserModalImport
                isOpenModalImport={isOpenModalImport}
                setIsOpenModalImport={setIsOpenModalImport}
                fetchUsersWithPaginate={fetchUsersWithPaginate}
            />

            <UserModalUpdate
                isOpenModalUpdate={isOpenModalUpdate}
                setIsOpenModalUpdate={setIsOpenModalUpdate}
                dataUserUpdate={dataUserUpdate}
                setDataUserUpdate={setDataUserUpdate}
                fetchUsersWithPaginate={fetchUsersWithPaginate}
            />
        </>
    )
}

export default UserTable;