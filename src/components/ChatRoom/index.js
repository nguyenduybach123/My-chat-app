import classNames from "classnames/bind";
import styles from "./ChatRoom.module.scss";
import Avatar from "../Avatar";

const cx = classNames.bind(styles);

function ChatRoom({ displayName , photoURL , ...props }) {
    return ( 
        <div className={cx('wrapper')} {...props}> 
            <div className={cx('avatar')}>
                <Avatar size="medium" alt='userimg' src={photoURL}></Avatar>  
            </div>
            <div className={cx('content')}>
                <div className={cx('info')}>
                    <h3 className={cx('name')}>{displayName}</h3>
                    <span className={cx('time')}>8 giờ</span>  
                </div>
                <div className={cx('text')}>
                    <p>Hello World</p>
                </div>
            </div>
                   
        </div>
     );
}

export default ChatRoom;