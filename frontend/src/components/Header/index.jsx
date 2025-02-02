import { Divider, Dropdown, Space } from 'antd';
import { FaReact } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { Badge } from 'antd';
import { Drawer } from "antd";
import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import './header.scss'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);

    const [openDrawer, setOpenDrawer] = useState(false);

    const items = [
        {
            label: <label>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label >Đăng xuất</label>,
            key: 'logout',
        },
    ];

    return (
        <>
            <div className='header-container'>
                <header className='page-header'>
                    <div className='page-header__top'>
                        <div
                            className='page-header__toggle'
                            onClick={() => setOpenDrawer(true)}
                        >
                            ☰
                        </div>
                        <div className='page-header__logo'>
                            <span className='logo'>
                                <FaReact className='rotate icon-react' /> ITZuiZẻ
                                <IoIosSearch className='icon-search' />
                            </span>

                            <input
                                className='input-search' type={'text'}
                                placeholder='Bạn tìm gì hôm nay' />
                        </div>
                    </div>

                    <nav className='page-header__bottom'>
                        <ul id='navigation' className='navigation'>
                            <li className='navigation__item'>
                                <Badge size="small" count={5}>
                                    <FiShoppingCart className='icon-cart' />
                                </Badge>
                            </li>
                            <li className='navigation__item mobile'>
                                <Divider type='vertical' />
                            </li>
                            <li className='navigation__item mobile'>
                                {isAuthenticated === false ?
                                    <span onClick={() => navigate('/login')}>Đăng nhập</span>
                                    :
                                    <Dropdown menu={{ items }} trigger={['hover']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                Welcome {user?.fullName}
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                }
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>

            <Drawer
                title="Menu Chức năng"
                placement={"left"}
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
            >
                <p>Quản lý tài khoản</p>
                <Divider />

                <p>Đăng xuất</p>
                <Divider />
            </Drawer >
        </>
    )
}

export default Header;