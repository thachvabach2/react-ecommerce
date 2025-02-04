import { Col, Row, Table, theme } from 'antd';
import InputSearch from './InputSerch';

const columns = [
    {
        title: "Name",
        dataIndex: "name",
        sorter: true,
    },
    {
        title: "Chinese Score",
        dataIndex: "chinese",
        sorter: true,
    },
    {
        title: "Math Score",
        dataIndex: "math",
        sorter: true,
    },
    {
        title: "English Score",
        dataIndex: "english",
        sorter: true,
    },
];

let data = [
    {
        key: '1',
        name: 'John Brown',
        chinese: 98,
        math: 60,
        english: 70,
    },
    {
        key: '2',
        name: 'Jim Green',
        chinese: 98,
        math: 66,
        english: 89,
    },
    {
        key: '3',
        name: 'Joe Black',
        chinese: 98,
        math: 90,
        english: 70,
    },
    {
        key: '4',
        name: 'Jim Red',
        chinese: 88,
        math: 99,
        english: 89,
    },
];

data = data.concat(data).concat(data).concat(data).concat(data);
data = data.concat(data);

const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
};

const UserTable = () => {

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch />
                </Col>
                <Col span={24}>
                    <Table
                        className='def'
                        columns={columns}
                        dataSource={data}
                        onChange={onChange}
                        loading={false}
                        pagination={{
                            current: 1,
                            pageSize: 2,
                            showSizeChanger: true,
                        }}
                    />
                </Col>
            </Row>
        </>
    )
}

export default UserTable;