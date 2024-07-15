import classNames from "classnames/bind";
import styles from './PopoverItem.module.scss';
import Button from "../../Button";

const cx = classNames.bind(styles);

function PopoverItem({data,isButton = true,borderTop,borderBottom}){


    return (
        <div className={cx('wrapper')}>
            {
            isButton == true ? <Button classnames={cx('font-text')} styleText={data.style} 
                                       onClick={data.event_list._onClick}
                                       text>
                                    {data.title}
                                </Button> 
            : 
            <div></div>
        }
        </div>
    );
}

export default PopoverItem;