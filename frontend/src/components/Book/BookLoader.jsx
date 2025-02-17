import { Col, Row, Skeleton } from 'antd';

const BookLoader = () => {

    return (
        <>
            <Col md={10} sm={0} xs={0}
                className='left-content'
                style={{ border: '1px solid red' }}
            >
                <Row gutter={[10, 10]}>
                    <Col span={24}>
                        <Skeleton.Input
                            active={true}
                            block={true}
                            style={{ width: '100%', height: '350px' }}
                        />
                    </Col>

                    <Col span={24}>
                        <Row gutter={[15, 15]} justify={'center'}>
                            <Col><Skeleton.Image active style={{ width: '90px', height: '90px' }} /></Col>
                            <Col><Skeleton.Image active style={{ width: '90px', height: '90px' }} /></Col>
                            <Col><Skeleton.Image active style={{ width: '90px', height: '90px' }} /></Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col md={14} sm={24} xs={24}
                style={{ border: '1px solid green' }}
                className='right-content'>
                <Row gutter={[20, 20]} style={{ fontSize: 16 }}>
                    {/* class col-no-plr style for  <= sm*/}
                    <Col md={0} sm={24} xs={24} className='col-no-plr'>
                        <Skeleton.Input
                            active={true}
                            block={true}
                            style={{ width: '100%', height: '350px' }}
                        />
                    </Col>
                    <Col md={24} sm={24} xs={24}>
                        <>
                            <Skeleton active paragraph={{ rows: 2, width: ['100%', '30%'] }} />
                            <Skeleton.Button active style={{ margin: '20px 0', width: '300px', height: '60px' }} />
                            <Skeleton active paragraph={{ rows: 2, width: ['100%', '100%'] }} title={false} style={{ paddingTop: 20 }} />
                            <div style={{ paddingTop: 25 }}>
                                <Skeleton.Button active style={{ marginRight: 15, width: 150, height: 48 }} />
                                <Skeleton.Button active style={{ width: 120, height: 48 }} />
                            </div>
                        </>

                    </Col>
                </Row>
            </Col>
        </>
    )
}

export default BookLoader;