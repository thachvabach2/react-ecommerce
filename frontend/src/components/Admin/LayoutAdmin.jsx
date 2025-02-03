import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {
    AuditOutlined,
    DollarOutlined,
    DownOutlined,
    FileTextOutlined,
    FormOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Button, Dropdown, Layout, Menu, message, Space } from 'antd';
import './layout.scss'
import { postLogout } from '../../services/api';
import { doLogoutAction } from '../../redux/account/accountSlice';

const { Sider, Content } = Layout;

const LayoutAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.account.user);

    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [collapsed, setCollapsed] = useState(false);

    const items = [
        {
            label: <Link to="/admin" >Dashboard</Link>,
            key: 'dashboard',
            icon: <MdOutlineDashboard />,
        },
        {
            label: 'Manage Users',
            key: 'user',
            icon: <FaRegUser />,
            children: [
                {
                    label: <Link to="/admin/user" replace={true}>CRUD</Link>,
                    key: 'crud',
                    icon: <FormOutlined />,
                },
                {
                    label: 'Files1',
                    key: 'file1',
                    icon: <FileTextOutlined />,
                }
            ]
        },
        {
            label: <Link to="/admin/book" replace={true}>Manage Books</Link>,
            key: 'book',
            icon: <AuditOutlined />,
        },
        {
            label: 'Manage Orders',
            key: 'order',
            icon: <DollarOutlined />,
        },
    ]

    const itemsDropdown = [
        {
            label: <label style={{ cursor: 'pointer' }}>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >
                Đăng xuất
            </label>,
            key: 'logout',
        },

    ];

    const handleLogout = async () => {
        const res = await postLogout();
        if (res && res.data) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công');
            navigate('/');
        }
    }

    return (
        <Layout
            style={{ minHeight: '100vh' }}
            className='layout-admin'
        >
            <Sider
                // trigger={null}
                theme='light' // default = dark
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className='side-bar__header'
                    style={{ height: 32, margin: 16, textAlign: 'center' }}>
                    Admin
                </div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[activeMenu,]}
                    items={items}
                    onClick={(event) => setActiveMenu(event.key)}
                />
            </Sider>

            <Layout >
                <div className='admin-header'>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Dropdown menu={{ items: itemsDropdown }} trigger={['hover']} >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Welcome {user?.fullName}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                <Content>
                    <Outlet />
                </Content>
                <div className='admin-footer'>
                    E-commerce &copy; by It Zui Zẻ
                </div>
            </Layout>
        </Layout>
    )
}

export default LayoutAdmin;