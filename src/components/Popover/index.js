import classNames from "classnames/bind";
import styles from './Popover.module.scss'
import Wrapper from "../Wrapper";
import PopoverItem from "./PopoverItem";

const cx = classNames.bind(styles);

function Popover ({data}) {
    
    return(
        <Wrapper classnames={cx('wrapper')}>
            {data.map((value) => {
                    return <PopoverItem key={value.title} data={value}></PopoverItem>
                }
            )}
        </Wrapper>
    );
}

export default Popover;