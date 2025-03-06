import React, { useEffect, useState } from 'react';
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import ContactPage from './pages/contact';
import BookPage from './pages/book';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import RegisterPage from './pages/register';
import { fetchAccount } from './services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doGetAccountAction } from './redux/account/accountSlice';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import AdminPage from './pages/admin';
import ProtectedRoute from './components/ProtectedRoute';
import LayoutAdmin from './components/Admin/LayoutAdmin';
import ManageUser from './pages/admin/user';
import BookTable from './components/Admin/Book/BookTable';
import OrderPage from './pages/order';
import './styles/reset.scss'
import './styles/global.scss'
import HistoryPage from './pages/history';
import OrderTable from './components/Admin/Order/OrderTable';

const Layout = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className='layout-app'>
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Outlet context={[searchTerm, setSearchTerm]} />
            <Footer />
        </div>
    )
}

export default function App() {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.account.isLoading);

    const getAccount = async () => {
        if (window.location.pathname === '/login'
            || window.location.pathname === '/register'
        ) {
            return;
        }
        const res = await fetchAccount();
        if (res && res.data) {
            dispatch(doGetAccountAction(res.data.user));
        }
    }

    useEffect(() => {
        getAccount();
    }, [])

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <NotFound />,

            children: [
                { index: true, element: <Home /> },
                {
                    path: "contact",
                    element: <ContactPage />
                },
                {
                    path: "book/:slug",
                    element: <BookPage />
                },
                {
                    path: "order",
                    element:
                        <ProtectedRoute>
                            <OrderPage />
                        </ProtectedRoute>
                },
                {
                    path: 'history',
                    element:
                        <ProtectedRoute>
                            <HistoryPage />
                        </ProtectedRoute>
                }
            ],
        },
        {
            path: "/admin",
            element: <LayoutAdmin />,
            errorElement: <NotFound />,

            children: [
                {
                    index: true, element:
                        <ProtectedRoute>
                            <AdminPage />
                        </ProtectedRoute>
                },
                {
                    path: "user",
                    element:
                        <ProtectedRoute>
                            <ManageUser />
                        </ProtectedRoute>
                },
                {
                    path: "book",
                    element:
                        <ProtectedRoute>
                            <BookTable />
                        </ProtectedRoute>
                },
                {
                    path: "order",
                    element:
                        <ProtectedRoute>
                            <OrderTable />
                        </ProtectedRoute>
                },
            ],
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/register",
            element: <RegisterPage />,
        },
    ]);

    return (
        <>
            {
                isLoading === false
                    || window.location.pathname === '/login'
                    || window.location.pathname === '/register'
                    || window.location.pathname === '/'
                    ?
                    <RouterProvider router={router} />
                    :
                    <Loading />
            }
        </>
    )
}