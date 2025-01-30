import React, { useState } from 'react';
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import ContactPage from './pages/contact';
import BookPage from './pages/book';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/Home';
import RegisterPage from './pages/register';

const Layout = () => {
    return (
        <div className='layout-app'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <div>404 not found it zui ze</div>,

        children: [
            { index: true, element: <Home /> },
            {
                path: "contact",
                element: <ContactPage />
            },
            {
                path: "book",
                element: <BookPage />
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

export default function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}