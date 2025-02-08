import { Button, Col, Form, Input, Row, Space, theme } from 'antd';

const InputSearch = (props) => {
    const { setFilterQuery, setCurrent } = props;

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
        let filterQuery = '';
        if (values.mainText) {
            filterQuery += `&mainText=/${values.mainText}/i`;
        }
        if (values.author) {
            filterQuery += `&author=/${values.author}/i`;
        }
        if (values.category) {
            filterQuery += `&category=/${values.category}/i`;
        }
        setFilterQuery(filterQuery);
        setCurrent(1);
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
                            name="mainText"
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