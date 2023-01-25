import { PageWrapper } from "../../common/page-wrapper"
import { useUserContext } from '../../services/user-context';
import Typography from '@mui/material/Typography';

export const Home = () => {
    const user = useUserContext();

    return <PageWrapper title="Home">
        <Typography>Welcome {user ? user.email : 'stranger'}!</Typography>
    </PageWrapper>
}