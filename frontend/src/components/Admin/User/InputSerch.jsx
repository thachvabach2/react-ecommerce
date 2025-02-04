import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Space, theme } from "antd";

const InputSearch = (props) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();

    const formStyle = {
        maxWidth: "none",
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
        // margin: 15,
    };

    const onFinish = (values) => {
        // build query
        let query = ``;
        if (values.name) {
            query += `&fullName=/${values.name}/i`;
        }
        if (values.email) {
            query += `&email=/${values.email}/i`;
        }
        if (values.phone) {
            query += `&phone=/${values.phone}/i`
        }

        if (query) {
            props.handleSearch(query)
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            name="advanced_search"
            style={formStyle}
            onFinish={onFinish}

        >
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        // labelCol={{ span: 24 }} //whole column
                        name={'name'}
                        label={'Name'}
                        rules={[
                            {
                                required: false,
                                message: "Input something!",
                            },
                        ]}
                    >
                        <Input placeholder="placeholder" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        // labelCol={{ span: 24 }} //whole column
                        name={'email'}
                        label={'Email'}
                        rules={[
                            {
                                required: false,
                                message: "Input something!",
                            },
                        ]}
                    >
                        <Input placeholder="placeholder" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        // labelCol={{ span: 24 }} //whole column
                        name={'phone'}
                        label={'Số điện thoại'}
                        rules={[
                            {
                                required: false,
                                message: "Input something!",
                            },
                        ]}
                    >
                        <Input placeholder="placeholder" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                    <Space size="small">
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
    );
}

export default InputSearch;