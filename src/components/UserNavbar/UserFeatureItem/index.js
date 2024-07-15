import classNames from "classnames/bind";
import styles from './UserFeatureItem.module.scss';
import Popover from "../../Popover";

const cx = classNames.bind(styles);

const funcDefault = () => {}

function UserFeatureItem({featureIcon, featurePovers = {},
                          isFill, isHavePopover = false,
                          onChangeFontIcon = funcDefault,  onOpenPopover = funcDefault,
                          prop}) {
    
    return (
        <div className={cx({['wrapper-popover']: isHavePopover})}>
            <div className={cx('wrapper',{['active']: isFill})} onClick={() => {
                onChangeFontIcon();
                onOpenPopover();
            }} {...prop}>
                {isFill ? featureIcon.fillIcon : featureIcon.normalIcon}
            </div>
            {isHavePopover === true ? <Popover data={featurePovers}></Popover> : ""}
        </div>
    );
}

export default UserFeatureItem;