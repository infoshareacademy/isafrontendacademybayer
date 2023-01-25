import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress'
import { Wrapper } from './Wrapper'
import { Game } from './game/Game';
import { Users } from './users/Users';
import { UserDetails } from './users/UserDetails';
import { Sign } from './sign/Sign';


export const Content = () => (
    <Wrapper>
        <Suspense fallback={<CircularProgress />}>
            <Routes>
                <Route path="/" element={<h1>Welcome to our site!</h1>} />
                <Route path="/game" element={<Game name="Catan" />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/sign" element={<Sign />} />
            </Routes>
        </Suspense>
    </Wrapper>
)