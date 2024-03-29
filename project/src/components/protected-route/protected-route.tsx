import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../constants/api';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { getAuthorizationStatus } from '../../store/user-process/user-selectors';

type ProtectedRouteProps = {
  children: JSX.Element
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return authorizationStatus !== AuthorizationStatus.Auth ? <Navigate to='/login' /> : children;
};
