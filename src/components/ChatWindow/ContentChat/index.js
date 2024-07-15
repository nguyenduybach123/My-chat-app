import { useContext, useState, useMemo, useRef, useCallback } from "react";
import classNames from "classnames/bind";
import styles from "./ContentChat.module.scss";
import { AppContext } from "../../../context/AppProvider";
import { AuthContext } from "../../../context/AuthProvider";
import Button from "../../Button";
import MessageBox from '../../MessageBox';
import addDocument from "../../../firebase/services";
import useFirestore from "../../../hooks/useFireStore";

const cx = classNames.bind(styles);

function ContentChat () {

    const { user } =  useContext(AuthContext);
    
    const { selectFriendRoomId } =  useContext(AppContext); 

    const [inputChatContent,setInputChatContent] = useState("");

    const chatInputRef = useRef();

    const messageCondition = useMemo(() => {
        return [{
            fieldName: 'roomid',
            operator: '==',
            compareValue: selectFriendRoomId
        }]
    },[selectFriendRoomId])

    const messageList = useFirestore('friendMessages',messageCondition);

    /*__Method__*/
    const handleChatInput = (val) => {
        setInputChatContent(val);
    }

    const handleSendChat = useCallback(() => {
        if(inputChatContent === "")
            return;

        addDocument('friendMessages',{
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: inputChatContent,
            roomid: selectFriendRoomId
        });
        chatInputRef.current.value = "";
        setInputChatContent("");
        chatInputRef.current.focus();
    },[user,selectFriendRoomId,inputChatContent])

    const handlePressEnterToChat = (e) => {
        if(inputChatContent === "")
            return;

        if(e.key === 'Enter') {
            addDocument('friendMessages',{
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                content: inputChatContent,
                roomid: selectFriendRoomId
            });
            chatInputRef.current.value = "";
            setInputChatContent("");
            chatInputRef.current.focus();
        }
    }

    return (
        <div>
            <div className={cx('chat-content')}>
                {
                    messageList.map(message => {
                        if(message.uid === user.uid){
                            return <MessageBox key={message.id} text={message.content} src={message.photoURL} time={message.createdAt} unknow primaryContent classname={"user_message"}></MessageBox>
                        }
                        else{
                            return <MessageBox key={message.id} text={message.content} src={message.photoURL} time={message.createdAt} classname={"friend_message"}></MessageBox>
                        }
                    })
                }
            </div>
            <div className={cx('chat-input')}>
                <div>
                    <input type="text" value={inputChatContent} placeholder="Viết gì đó ...." 
                            ref={chatInputRef}
                            onChange={ (e) => handleChatInput(e.target.value)}
                            onKeyDown={(e) => handlePressEnterToChat(e)}       
                    >
                    </input>
                    <Button classnames={cx('btn-submit')} onClick={handleSendChat}>Gửi</Button>
                </div>
            </div>
        </div>
    );
}

export default ContentChat;