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

const data = [
    {
        key: "1",
        name: "A",
        chinese: 73,
        math: 60,
        english: 70,
    },
    {
        key: "2",
        name: "G",
        chinese: 98,
        math: 66,
        english: 89,
    },
    {
        key: "3",
        name: "B",
        chinese: 50,
        math: 90,
        english: 70,
    },
    {
        key: "4",
        name: "C",
        chinese: 12,
        math: 99,
        english: 89,
    },
];

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
                        onChange={onChange} />
                </Col>
            </Row>
        </>
    )
}

export default UserTable;