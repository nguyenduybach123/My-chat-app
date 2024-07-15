import classNames from "classnames/bind";
import styles from "../Grid/Grid.module.scss";

const cx = classNames.bind(styles);

function Column({cols = 1,children}) {

    return ( 
        <div className={cx(`cols_${cols}`,'item')}>{children}</div>
     );
}

export default Column;