import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import NotFound from '../NotFound';

const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);

    return (
        <>
            {isAuthenticated === true ?
                <>{props.children}</>
                :
                <Navigate to='/login' replace></Navigate>

            }
        </>
    )
}

export default ProtectedRoute;