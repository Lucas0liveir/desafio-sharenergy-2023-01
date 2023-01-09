import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../service/auth.service';

export function AuthenticatedRoutes() {

    if (authService.restoreSession()) {
        return <Outlet />;
    }

    return <Navigate to="/login" />;
}