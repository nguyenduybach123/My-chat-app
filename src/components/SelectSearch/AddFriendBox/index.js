import React from "react";
import classNames from "classnames/bind";

import styles from "./AddFriendBox.module.scss";
import Avatar from "../../Avatar";
import { UserPlusFill, UserXFill } from "../../Icons";
import { addDocument, deleteDocument, updateDocument } from "../../../firebase/services";




const cx = classNames.bind(styles);

function AddFriendBox({ doc, displayName, photoURL, invited = false, sender }) {

    const [idInvite,setIdInvite] = React.useState('');

    const [sendedAddFriend,setSendedAddFriend] = React.useState(invited);

    const handleSendAddFriend = () => {
        
        if(!sendedAddFriend) {
            const request = addDocument("friendRequests",{
                uid: sender.uid,
                name: sender.displayName,
                avatar: sender.photoURL,
                rid: doc.uid,
            });
            request.then((res)=> {
                setIdInvite(res.id);
            })
            sender.following.push(doc.uid);
            updateDocument("users",sender.uid,{ following: sender.following });
            setSendedAddFriend(true);
        }
        else {
            sender.following = sender.following.filter((item) => { return item !== doc.uid }); 
            updateDocument("users",sender.uid,{ following: sender.following });
            deleteDocument("friendRequests",idInvite);
            setSendedAddFriend(false);
        }
    }

    return ( 
        <div className={cx('wrapper')}> 
            <div className={cx('avatar')}>
                <Avatar size="small" alt='userimg' src={photoURL}></Avatar>  
            </div>
            <div className={cx('content')}>
                <div className={cx('info')}>
                    <h3 className={cx('name')}>{displayName}</h3> 
                </div>
            </div>
             <button className={cx('btn-addfriend','close')} onClick={handleSendAddFriend}>
                {
                    sendedAddFriend ? <UserXFill></UserXFill> : <UserPlusFill></UserPlusFill>
                }
             </button>
        </div>
     );
}

export default AddFriendBox;