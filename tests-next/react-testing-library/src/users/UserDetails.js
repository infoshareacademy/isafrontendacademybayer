import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography'
import CircularProgess from '@mui/material/CircularProgress'

export const UserDetails = () => {
    const params = useParams();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
            .then(r => r.json())
            .then(data => {
                setUser(data)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [params.id])

    if (isLoading) {
        return <CircularProgess />
    }

    if (!user || !user.name) {
        return <Typography variant="h5">Such user does not exist!</Typography>;
    }

    return <Typography variant="h5">Hello {user.name}!</Typography>
}