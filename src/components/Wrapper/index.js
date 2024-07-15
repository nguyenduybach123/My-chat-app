import classNames from "classnames/bind";
import styles from "./Wrapper.module.scss";

const cx = classNames.bind(styles);



function Wrapper({children, fullScreen = false, classnames }) {

    const classes = cx('wrapper',{[classnames]:classnames,fullScreen})

    return ( 
        <div className={classes}>{children}</div>
     );
}

export default Wrapper;