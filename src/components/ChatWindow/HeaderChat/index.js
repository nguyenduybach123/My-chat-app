import { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./HeaderChat.module.scss";
import { AppContext } from "../../../context/AppProvider";
import Avatar from "../../Avatar";
import { AuthContext } from "../../../context/AuthProvider";

const cx = classNames.bind(styles);

function HeaderChat () {

    const { user } = useContext(AuthContext);
    
    const {selectedFriendRoom } =  useContext(AppContext);

    return (
        <header className={cx('chat-info')}>
            <Avatar classnames={cx('avatar')} size="large" src={(selectedFriendRoom.members[0] === user.uid) ? selectedFriendRoom.photoURL_2 : selectedFriendRoom.photoURL_1}></Avatar>
            <div>
                <p className={cx('name')}>{(selectedFriendRoom.members[0] === user.uid) ? selectedFriendRoom.displayName_2 : selectedFriendRoom.displayName_1 }</p>
                <span className={cx('access-time')}>Truy cập 16 giờ trước</span>
            </div>
        </header>
    );
}

export default HeaderChat;