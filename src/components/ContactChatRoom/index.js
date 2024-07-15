import { useContext } from "react";
import classNames from "classnames/bind";
import styles from './ContactChatRoom.module.scss';
import { AppContext } from "../../context/AppProvider";
import ChatRoom from "../ChatRoom";
import { AuthContext } from "../../context/AuthProvider";
import Tabs, { TabPane } from "../Tabs";


const cx = classNames.bind(styles);

function ContactChatRoom () {

    const { setSelectFriendRoomId, friendRooms } = useContext(AppContext);

    const { user } = useContext(AuthContext);

    const handleOnClickFriendRoom = (id) => {
        setSelectFriendRoomId(id);
    }


    return (
        <div>
            <Tabs tabItems={['Tất Cả','Chưa Đọc']} initActive={'Kết Bạn'} lineColor={'#0068ff'} lineHeight={2}>
                <TabPane aKey={'Tất Cả'}>
                    <div className={cx('content')}>
                        {
                            friendRooms.map(item => (
                                <ChatRoom key={item.id} displayName={ (item.members[0] === user.uid) ? item.displayName_2 : item.displayName_1 } 
                                        photoURL={ (item.members[0] === user.uid) ? item.photoURL_2 : item.photoURL_1 }
                                        onClick={() => handleOnClickFriendRoom(item.id)}></ChatRoom>
                            ))
                        }
                    </div>
                </TabPane>
                <TabPane aKey={'Chưa Đọc'}>
                    <div className={cx('content')}>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default ContactChatRoom;
