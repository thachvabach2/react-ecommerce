import { Col, Row, Table } from 'antd';
import InputSearch from './InputSerch';
import { useEffect, useState } from 'react';
import { getUsersWithPaginate } from '../../../services/api';

const columns = [
    {
        title: "Id",
        dataIndex: "_id",
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
        title: "Action",
        render: (value, record, index) => (
            <>
                <button
                    onClick={() => { console.log('>>> check delete id: ', record._id) }}>
                    Delete
                </button>
            </>
        )
    },
];

const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const [sortQuery, setSortQuery] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchUsersWithPaginate();
    }, [current, pageSize, sortQuery, filter])

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

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch
                        setFilter={setFilter}
                    />
                </Col>
                <Col span={24}>
                    <Table
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
                            showSizeChanger: true,
                            pageSizeOptions: ['5', '10', '20', '50', '100']
                        }}
                    />
                </Col>
            </Row>
        </>
    )
}

export default UserTable;