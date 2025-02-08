import { Button, Col, Form, Input, Row, Space, theme } from 'antd';

const InputSearch = () => {
    const [form] = Form.useForm();
    const { token } = theme.useToken();

    const formStyle = {
        maxWidth: "none",
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    const onFinish = (values) => {
        console.log("Success:", values);
    };

    return (
        <>
            <Form
                form={form}
                name="basic"
                layout='vertical'
                style={formStyle}
                onFinish={onFinish}
            >
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            label="Tên sách"
                            name="name"
                        >
                            <Input placeholder="placeholder" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Tác giả"
                            name="author"
                        >
                            <Input placeholder="placeholder" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Thể loại"
                            name="category"
                        >
                            <Input placeholder="placeholder" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Search
                            </Button>
                            <Button
                                onClick={() => {
                                    form.resetFields();
                                }}
                            >
                                Clear
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default InputSearch;