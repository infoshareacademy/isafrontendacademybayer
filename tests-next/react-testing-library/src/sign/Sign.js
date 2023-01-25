import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 15px 0;
`;

export const Sign = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return <Form onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="Email" type="email"/>
        <TextField id="filled-basic" label="Password" type="password" />
        <Button type="submit">Submit</Button>
    </Form>
}