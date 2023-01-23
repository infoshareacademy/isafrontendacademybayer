import { createContext, useState, useContext, useEffect } from 'react';
import { http } from '../../common/http';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    function login(token, user) {
        localStorage.setItem('token', token);
        setUser(user);
    }

    function logout() {
        localStorage.removeItem('token');
        setUser(null);
    }

    // load user if access token exists
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            http.token = token;
            http.get('/auth/me').then(user => {
                setUser(user);
            }).catch((res) => {
                if(res.status === 401) {
                    logout();
                }
            }) 
        }

    }, []);

    return <UserContext.Provider value={{user, login, logout}}>
        {children}
    </UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext);