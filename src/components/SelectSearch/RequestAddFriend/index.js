import classNames from "classnames/bind";
import Grid from "../../Grid";
import Column from "../../Column";
import Avatar from "../../Avatar";


import styles from "./RequestAddFriend.module.scss";
import { updateDocument, getDocument , deleteDocument , addDocument } from "../../../firebase/services";
import Button from "../../Button";


const cx = classNames.bind(styles);

function RequestAddFriend({ requestUser, receiveUser }) {

    const handleRefuse = () => {

    }

    const handleAccept = () => {
        
        let sender = getDocument('users',requestUser.uid);
        sender.then(sendUser => {
            updateDocument('users',requestUser.rid,{ friendlist: [...receiveUser.friendlist,requestUser.uid] });
            updateDocument('users',sendUser.uid,{ friendlist: [...sendUser.friendlist,receiveUser.uid], following: sendUser.following.filter((val) => val !== receiveUser.uid) });
            deleteDocument("friendRequests",requestUser.id);
            addDocument('friendRooms',{
                members: [sendUser.uid,receiveUser.uid],
                displayName_1: sendUser.displayName,
                displayName_2: receiveUser.displayName,
                photoURL_1: sendUser.photoURL,
                photoURL_2: receiveUser.photoURL
            });
        })
    }


    return ( 
        <div className={cx('wrapper')}>
            <Grid>
                <Column cols={3}>
                    <div className={cx('avatar')}>
                        <Avatar src={requestUser.avatar} ></Avatar>
                    </div>
                </Column>
                <Column cols={9}>
                    <div className={cx('info')}>
                        <h4>{requestUser.name}</h4>
                        <div className={cx('btn-select')}>
                            <Button classnames={cx('btn')} onClick={handleAccept}>Chấp Nhận</Button>
                            <Button classnames={cx('btn')}>Từ Chối</Button>
                        </div>
                    </div>
                </Column>
            </Grid>
        </div>
     );
}

export default RequestAddFriend;