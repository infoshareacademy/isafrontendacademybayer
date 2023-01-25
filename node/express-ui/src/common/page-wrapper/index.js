import styled from 'styled-components';
import Typography from '@mui/material/Typography';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
`;

export const PageWrapper = ({ title, children }) => {
    return (
        <Container>
            <Typography variant="h5">{title}</Typography>
            {children}
        </Container>
    )
}