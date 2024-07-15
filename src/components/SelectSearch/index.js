import React from "react";
import classNames from "classnames/bind";
import { onSnapshot, query, collection } from "firebase/firestore";

import styles from "./SelectSearch.module.scss";
import SearchBox from "../Search";
import Wrapper from "../Wrapper";
import AddFriendBox from "./AddFriendBox";
import Button from "../Button";
import { CloseX } from "../Icons";
import { SpinAround } from "../Spin";
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import useDebounce from "../../hooks/useDebounce";
import { db } from "../../firebase/config";
import Tabs, { TabPane } from "../Tabs";
import useFirestore from "../../hooks/useFireStore";
import RequestAddFriend from "./RequestAddFriend";



const cx = classNames.bind(styles);

function SelectSearch() {

    const { user } = React.useContext(AuthContext);

    const { setIsAddFriend, loggedUser } = React.useContext(AppContext);
    console.log(loggedUser);
    const [searchValue,setSearchValue] = React.useState('');

    const [searchResult,setSearchResult] = React.useState([]);

    const [isLoading,setIsLoading] = React.useState(false);

    const requestCodition = React.useMemo(() => {
        return {
            fieldName: 'rid',
            operator: '==',
            compareValue: user.uid
        };
    },[user]);

    const requestAddFriends = useFirestore("friendRequests",[requestCodition]);

    console.log(requestAddFriends);

    const handleSearchValueChange = (value) => {
        setSearchValue(value);
    }

    const debounced = useDebounce(searchValue,500);

    React.useEffect(() => {

        if(!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        
        setIsLoading(true);

        try {
                const q = query(collection(db, "users"));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const result = [];
                    querySnapshot.forEach((doc) => {
                        result.push(doc.data());
                    });
                        
                    
                    setSearchResult(result.filter((account) => {
                        let checkFriendList = loggedUser.friendlist.some(val => val === account.uid);
                        return account.displayName.toLowerCase().startsWith(debounced.toLowerCase()) === true && account.uid !== user.uid && !checkFriendList;
                    }))
                });

                setIsLoading(false);
        }
        catch {
            setIsLoading(false);
        }
            

    },[debounced])

    

    return ( 
        <Wrapper fullScreen >
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <Button icon onClick={() => setIsAddFriend(false)}>
                        <CloseX width="2.2rem" height="2.2rem"></CloseX>
                    </Button>
                </div>
                <Tabs tabItems={['Kết Bạn','Tìm Bạn']} initActive={'Kết Bạn'} lineColor={'red'} lineHeight={2}>
                    <TabPane aKey={'Kết Bạn'}>
                        <h3>Lời mời kết bạn</h3>
                        <div className={cx('content')}>
                        {
                            requestAddFriends.map((item,idx) => (
                                <RequestAddFriend key={idx} requestUser={item} receiveUser={loggedUser} ></RequestAddFriend>
                            ))
                        }
                        </div>
                    </TabPane>
                    <TabPane aKey={'Tìm Bạn'}>
                        <SearchBox onTextChange={handleSearchValueChange} ></SearchBox>
                        <div className={cx('content')}>
                        {
                            isLoading ? 
                            <div>
                                <SpinAround></SpinAround>
                            </div> :
                            searchResult.map((item) => (
                                <AddFriendBox key={item.uid} displayName={item.displayName} photoURL={item.photoURL} doc={item} invited={loggedUser.following.some((val) => val === item.uid)} sender={loggedUser} ></AddFriendBox>
                            ))
                            
                        }
                        </div>
                    </TabPane>
                </Tabs>
                
                
            </div>
        </Wrapper>
     );
}

export default SelectSearch;