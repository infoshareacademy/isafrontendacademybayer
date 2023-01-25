import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../services/user-context';
import { PageWrapper } from '../page-wrapper';

export const Auth = ({ children }) => {
    const user = useUserContext();

    return user 
        ? children
        : <PageWrapper title="This page is rescricted to logged in user!">
            <Typography>Please <Link to="/sign-in">sign in</Link> to see the content!</Typography>
        </PageWrapper> 
}