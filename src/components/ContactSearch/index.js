import { useContext } from "react";
import classNames from "classnames/bind";
import styles from './ContactSearch.module.scss';
import { AppContext } from "../../context/AppProvider";
import SearchBox from "../Search";
import { UserPlus, GroupPlus } from "../Icons";
import Button from "../Button";

const cx = classNames.bind(styles);

function ContactSearch () {

    const { setIsAddFriend } = useContext(AppContext);

    return (
        <div className={cx('wrapper-feature-list')}>
            <div className={cx('btn-list')}>
                <SearchBox></SearchBox>
                <Button classnames={cx('feature-item')} icon onClick={() => setIsAddFriend(true)}>
                    <UserPlus></UserPlus>
                </Button>
                <Button classnames={cx('feature-item')} icon>
                    <GroupPlus></GroupPlus>
                </Button>
            </div>
        </div>
    );

}

export default ContactSearch;