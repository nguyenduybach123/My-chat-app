import React from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SpinDot from "../components/Spin";


export const AuthContext = React.createContext();

function AuthProvider({ children }) {

    console.log("auth")

    const [user,setUser] = React.useState({});

    const [isLoading,setIsLoading] = React.useState(true);
    
    const navigate = useNavigate();

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                console.log(user);
                const { displayName, email, uid, photoURL } = user;
                setUser({ displayName, email, uid, photoURL });
                setIsLoading(false);
                navigate('/');
                alert('Login Successfully');
            }
            else {

                setIsLoading(false);
                navigate('/login');
                alert('Login Error');
            }
        });

        //clean function
        return () => {
            unsubscribe();
        }
    },[navigate])
    
    return ( 
        <AuthContext.Provider value={ { user } }>
            { isLoading ? <SpinDot></SpinDot> : children }
        </AuthContext.Provider>
     );
}

export default AuthProvider;