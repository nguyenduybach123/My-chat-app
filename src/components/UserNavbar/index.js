import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import classNames from "classnames/bind";
import styles from './UserNavbar.module.scss';
import { AuthContext } from "../../context/AuthProvider";
import Avatar from "../Avatar";
import UserFeatureItem from "./UserFeatureItem";
import { ChatDots,ChatDotsFill,Gear, GearFill } from "../Icons";

const cx = classNames.bind(styles);

const FEATURES_ICON = [
    {
        titleIcon: "Tin nhắn", 
        normalIcon: <ChatDots width="36px" height="36px"></ChatDots>,
        fillIcon: <ChatDotsFill width="36px" height="36px"></ChatDotsFill> 
    },
    {
        titleIcon: "Cài đặt",
        normalIcon: <Gear width="36px" height="36px"></Gear>,
        fillIcon: <GearFill width="36px" height="36px"></GearFill> 
    }
]



function UserNavbar() {

    const { user } = useContext(AuthContext);

    const [indexFillIcon, setIndexFillIcon] = useState(0);
    const [enablePopoverIndex , setEnablePopoverIndex] = useState(-1);

    const handleIndexFillIcon = (value) => {
        setIndexFillIcon(value);
        setEnablePopoverIndex(-1);
    }

    const handleindexOpenPopover = (idx) => {
        setEnablePopoverIndex(idx);
    }

    const handleUserLogOut = () => {
        signOut(auth);
    }

    const SETTING_FEATURES = [
        {
            title: "Ngôn Ngữ"
        },
        {
            title: "Dữ Liệu"
        },
        {
            title: "Đăng Xuất",
            event_list:{
                _onClick: handleUserLogOut
            },
            style: {
                color: 'red'
            }
        }
    ]

    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-img')}>
                <Avatar size="large" src={user.photoURL}></Avatar>
            </div>
            <div className={cx('featureList','top')}>
                <UserFeatureItem featureIcon={FEATURES_ICON[0]} isFill={indexFillIcon === 0} onChangeFontIcon={() => {handleIndexFillIcon(0)}}></UserFeatureItem>
            </div>
            <div className={cx('featureList','bottom')}>
                <UserFeatureItem featureIcon={FEATURES_ICON[1]} featurePovers={SETTING_FEATURES}
                                 isFill={indexFillIcon === 1}  isHavePopover={enablePopoverIndex === 1}
                                 onChangeFontIcon={() => {handleIndexFillIcon(1)}}
                                 onOpenPopover={() => {handleindexOpenPopover(1)}}
                > 
                </UserFeatureItem>
            </div>
        </div>
    );
}

export default UserNavbar;