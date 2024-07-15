import React from "react";
import { getDocument } from "../firebase/services";
import useFirestore from "../hooks/useFireStore";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext();

function AppProvider({ children }) {
    
    console.log("app")

    const { user } = React.useContext(AuthContext);

    const [selectFriendRoomId,setSelectFriendRoomId] = React.useState("");

    const friendRoomsCondition = React.useMemo(() => {
        return [
            {
                fieldName: 'members',
                operator: 'array-contains',
                compareValue: user.uid
            }
        ]
    },[user]);

    const friendRooms = useFirestore('friendRooms',friendRoomsCondition);
    
    const selectedFriendRoom = React.useMemo(() => {
        return friendRooms.find(room => room.id == selectFriendRoomId) || {}
    },[selectFriendRoomId]);

    const [isAddFriend,setIsAddFriend] = React.useState(false);

    const [loggedUser,setLoggedUser] = React.useState({});

    React.useEffect(() => {
        console.log(user.uid)
        const logged = getDocument("users",user.uid);
        console.log(logged)
        logged.then(res => {
            console.log(res)
            setLoggedUser(res);
        })
    },[user])

    return ( 
        <AppContext.Provider value={{ isAddFriend, setIsAddFriend, 
                                      loggedUser,
                                      selectFriendRoomId, setSelectFriendRoomId,
                                      selectedFriendRoom,
                                      friendRooms
                                    }}>
            {children}
        </AppContext.Provider>
     );
}

export default AppProvider;