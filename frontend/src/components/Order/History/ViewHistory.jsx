
import { Space, Table, Tag } from 'antd';
import './history.scss'
import { useEffect, useState } from 'react';
import { getOrderHistory } from '../../../services/api';
import ReactJson from 'react-json-view';
import moment from 'moment';
import { FOR_DATE_DISPLAY } from '../../../utils/constant';

const ViewHistory = () => {
    const [listOrderHistory, setListOrderHistory] = useState([]);

    useEffect(() => {
        fetchOrderHistory();
    }, [])

    const fetchOrderHistory = async () => {
        const res = await getOrderHistory();

        if (res && res.data) {
            setListOrderHistory(res.data);
        }
    }

    const columns = [
        {
            title: "STT",
            dataIndex: "index",
            render: (value, record, index) => <span>{index + 1}</span>,
        },
        {
            title: "Thời gian",
            dataIndex: "createdAt",
            render: (value, record, index) => (
                <>
                    {moment(value).format(FOR_DATE_DISPLAY)}
                </>
            ),
        },
        {
            title: "Tổng số tiền",
            dataIndex: "totalPrice",
            render: (value, record, index) => (
                <>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value ?? 0)}
                </>
            ),
        },
        {
            title: "Trạng thái",
            key: "tags",
            dataIndex: "tags",
            render: () => (
                <>
                    <Tag color="green">Thành công</Tag>
                </>
            ),
        },
        {
            title: "Chi tiết",
            key: "detail",
            render: (value, record, index) => (
                <>
                    <ReactJson
                        src={record?.detail}
                        name={'Chi tiết đơn mua'}
                        displayDataTypes={false}
                        collapsed={true}
                        displayObjectSize={false}
                        enableClipboard={false}
                    />
                </>
            ),
        },
    ];

    return (
        <>
            <Table
                className='history-container'
                columns={columns}
                dataSource={listOrderHistory}
                rowKey={'_id'}
                title={() => 'Lịch sử đặt hàng'}
            />
        </>
    )
}

export default ViewHistory;