import React from "react";
import classNames from "classnames/bind";

import styles from "./SliderBar.module.scss"
import SelectSearch from "../SelectSearch";
import { AppContext } from "../../context/AppProvider";
import ContactSearch from "../ContactSearch";
import ContactChatRoom from "../ContactChatRoom";



const cx = classNames.bind(styles);


function SliderBar() {

    const { isAddFriend } = React.useContext(AppContext);

    /*__Method__*/


    /*__Render__*/
    return ( 
        <div className={cx('wrapper')}>
            <ContactSearch></ContactSearch>
            <ContactChatRoom></ContactChatRoom>
            {
                isAddFriend && 
                <SelectSearch></SelectSearch>
            }
        </div> 
    );
}

export default SliderBar;