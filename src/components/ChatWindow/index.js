import { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./ChatWindow.module.scss";
import { AppContext } from "../../context/AppProvider";
import HeaderChat from "./HeaderChat";
import ContentChat from "./ContentChat";


const cx = classNames.bind(styles);

function ChatWindow() {

    
    const { selectFriendRoomId} =  useContext(AppContext); 

    /*__Render__*/
    return ( 
        <div className={cx('chat-wrapper')}>
            {
                selectFriendRoomId === "" ?
                <div className={cx('default-content')}>
                    <h2>Chào Mừng Đến Với Chat App</h2>
                    
                </div>
                :
                <>
                    <HeaderChat></HeaderChat>
                    <ContentChat></ContentChat>
                </>
            }
        </div>
     );
}

export default ChatWindow;