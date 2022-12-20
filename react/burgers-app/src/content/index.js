import { Routes, Route } from 'react-router-dom';
import { Home } from './home';
import { Menu } from './menu';
import { Admin } from './admin';
import { Sign } from './sign';

export const Content = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/sign-in" element={<Sign />} />
        </Routes>
    )
}