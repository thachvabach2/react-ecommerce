import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {
    AuditOutlined,
    DollarOutlined,
    FileTextOutlined,
    FormOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Avatar, Button, Dropdown, Layout, Menu, message, Space } from 'antd';
import './layout.scss'
import { postLogout } from '../../services/api';
import { doLogoutAction } from '../../redux/account/accountSlice';

const { Sider, Content } = Layout;

const LayoutAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.account.user);
    const location = useLocation();

    const [collapsed, setCollapsed] = useState(false);

    const items = [
        {
            label: <Link to="/admin" >Dashboard</Link>,
            key: '/admin',
            icon: <MdOutlineDashboard />,
        },
        {
            label: 'Manage Users',
            key: 'user',
            icon: <FaRegUser />,
            children: [
                {
                    label: <Link to="/admin/user" replace={true}>CRUD</Link>,
                    key: '/admin/user',
                    icon: <FormOutlined />,
                },
            ]
        },
        {
            label: <Link to="/admin/book" replace={true}>Manage Books</Link>,
            key: '/admin/book',
            icon: <AuditOutlined />,
        },
        {
            label: <Link to="/admin/order" replace={true}>Manage Orders</Link>,
            key: '/admin/order',
            icon: <DollarOutlined />,
        },
    ]

    const itemsDropdown = [
        {
            label: <label style={{ cursor: 'pointer' }}>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <Link to='/'>Trang chủ</Link>,
            key: 'home',
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

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;

    const siderStyle = {
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        // scrollbarWidth: 'thin',
        // scrollbarGutter: 'stable',
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
                style={siderStyle}
            >
                <div className='side-bar__header'
                    style={{ height: 32, margin: 16, textAlign: 'center' }}>
                    Admin
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={items}
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
                    <Dropdown menu={{ items: itemsDropdown }} placement="bottomRight" trigger={['hover']} >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <Avatar
                                    src={urlAvatar}
                                    alt={'avatar'}
                                />
                                {user?.fullName}
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                {/* style={{ padding: '10px' }} to fit with Manage User -> CRUD */}
                <Content style={{ padding: '15px' }}>
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