import { Card, Col, Row, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { getDashboard } from '../../services/api';

const AdminPage = () => {
    const formatter = (value) => <CountUp end={value} separator="," />;

    const [dataDashboard, setDataDashboard] = useState({
        countOrder: 0,
        countUser: 0,
    })

    useEffect(() => {
        fetchDashboard();
    }, [])

    const fetchDashboard = async () => {
        const res = await getDashboard();

        if (res && res.data) {
            setDataDashboard(res.data);
        }
    }

    return (
        <>
            <Row gutter={[50, 50]}>
                <Col span={12}>
                    <Card variant="borderless">
                        <Statistic
                            title="Tổng Users"
                            value={dataDashboard.countUser}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card variant="borderless">
                        <Statistic
                            title="Tổng Đơn Hàng)"
                            value={dataDashboard.countOrder}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default AdminPage;