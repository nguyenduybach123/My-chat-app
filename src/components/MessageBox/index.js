import classNames from "classnames/bind";
import { formatRelative } from "date-fns";

import styles from "./MessageBox.module.scss";
import Avatar from "../Avatar";
import Wrapper from "../Wrapper";

const cx = classNames.bind(styles);

function formatDate(seconds) {
    let formattedDate = '';
    if(seconds) {
        formattedDate = formatRelative(new Date(seconds * 1000),new Date());
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
}

function MessageBox({
    src,text,time,
    unknow = false,
    primaryContent = false,
    classname
}) {

    const classes = cx('wrapper', {[classname]: true})

    return ( 
        <div className={classes}>
            {unknow ? "" : <Avatar size="medium" src={src}></Avatar>}
            <div className={cx('content')}>
                <Wrapper classnames={cx({'primary-content': primaryContent})}>
                    {
                        <div>
                            <p>{text}</p>
                            <span>{formatDate(time?.seconds)}</span>
                        </div>
                    }
                </Wrapper>
            </div>
        </div>
     );
}

export default MessageBox;