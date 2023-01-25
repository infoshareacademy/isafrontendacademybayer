import { createContext, useState, useContext, useEffect } from 'react';
/* FIREBASE YOU CAN OMIT THIS PART */
import { getAuth, onAuthStateChanged } from 'firebase/auth';
/* END */

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        /* FIREBASE YOU CAN OMIT THIS PART */
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        /* END */
            setUser(user)
        })

    }, []);

    return <UserContext.Provider value={user}>
        {children}
    </UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext);