import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../../common/page-wrapper'
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export const Details = () => {
    const [burger, setBurger] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://rest-api-b6410.firebaseio.com/burgers/${id}.json`)
            .then(r => r.json())
            .then(data => {
                setBurger(data)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [id]);

    if (isLoading) {
        return <PageWrapper>
            <CircularProgress />
        </PageWrapper>
    }

    if (!burger) {
        return <PageWrapper title="An error occurred!">
            <Typography>There is no such a burger!</Typography>
        </PageWrapper>;
    }

    return <PageWrapper title={burger.name}>
        <Avatar 
            src={burger.url || 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png'} 
            sx={{ width: '200px', height: '200px', margin: '20px 0' }} 
            alt="burger"
        />
        <Typography>{burger.ingredients}</Typography>
        <Typography>{burger.price}</Typography>
    </PageWrapper>
}