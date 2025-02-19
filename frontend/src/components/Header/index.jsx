import { Avatar, Divider, Dropdown, message, Popover, Space } from 'antd';
import { FaReact } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { Badge } from 'antd';
import { Drawer } from "antd";
import { useState } from 'react';
import './header.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { postLogout } from '../../services/api';
import { doLogoutAction } from '../../redux/account/accountSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const carts = useSelector(state => state.order.carts);

    const [openDrawer, setOpenDrawer] = useState(false);

    const handleLogout = async (e) => {
        const res = await postLogout();
        if (e.key === 'logout' && res && res.data) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công')
            navigate('/')
        }
    }

    let items = [
        {
            label: <label style={{ cursor: 'pointer' }}>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label style={{ cursor: 'pointer' }}>Đăng xuất</label>,
            key: 'logout',
        },
    ];

    if (user?.role === 'ADMIN') {
        items.unshift({
            label: <Link to='/admin'>Trang quản trị</Link>,
            key: 'admin',
        },)
    }

    const renderContentPopover = () => {
        return (
            <>
                <div className='pop-cart-content'>
                    {carts?.map((book, index) => {
                        return (
                            <div className='book' key={`book-${index}`}>
                                <div className='thumbnail'>
                                    <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.detail?.thumbnail}`} />
                                </div>
                                <div className='right-content'>
                                    <div className='title'>{book?.detail?.mainText}</div>
                                    <div className='price'>
                                        ₫{new Intl.NumberFormat('vi-VN').format(book?.detail?.price ?? 0)}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='pop-cart-footer'>
                    <span className='items-count'>{carts?.length ?? 0} thêm hàng vào giỏ</span>
                    <button className='btn-solid-primary'>Xem giỏ hàng</button>
                </div>
            </>
        )
    }

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;

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
                            <span className='logo' onClick={() => navigate('/')}>
                                <FaReact className='rotate icon-react' /> ITZuiZẻ
                                <IoIosSearch className='icon-search' />
                            </span>

                            <input
                                className='input-search' type={'text'}
                                placeholder='Bạn tìm gì hôm nay'
                                id='input-search' // fix issue
                            />
                        </div>
                    </div>

                    <nav className='page-header__bottom'>
                        <ul id='navigation' className='navigation'>
                            <li className='navigation__item'>
                                <Popover
                                    rootClassName='popover-carts'
                                    overlayClassName=''
                                    placement='bottomRight'
                                    title={<span className='pop-header'>Sản phẩm mới thêm</span>}
                                    content={() => renderContentPopover()}
                                    trigger="hover"
                                >
                                    <div style={{ height: 45 }}>
                                        <Badge
                                            size="small"
                                            count={carts?.length ?? 0}
                                            showZero
                                        >
                                            <FiShoppingCart className='icon-cart' />
                                        </Badge>
                                    </div>
                                </Popover>
                            </li>
                            <li className='navigation__item mobile'>
                                <Divider type='vertical' />
                            </li>
                            <li className='navigation__item mobile'>
                                {isAuthenticated === false ?
                                    <span onClick={() => navigate('/login')}>Đăng nhập</span>
                                    :
                                    <Dropdown menu={{ items, onClick: (e) => handleLogout(e) }} trigger={['click']}>
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