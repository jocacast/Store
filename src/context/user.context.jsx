import {createContext, useState, useEffect} from 'react' 
import {onAuthStateChangedListener, createUserDocumentFromAuth} from '../utils/firebase/firebase.utils'

// Actual value oyou want to access
export const UserContext = createContext({
    currentUser : null, 
    setCurrentUser : () => null,
});

//Provider is the actual component
export const UserProvider = (({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};
    useEffect(()=>{
        const unsuscribe = onAuthStateChangedListener((user)=>{
            console.log(user);
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsuscribe;
    },[])
    return <UserContext.Provider value = {value}>{children}</UserContext.Provider>
});
