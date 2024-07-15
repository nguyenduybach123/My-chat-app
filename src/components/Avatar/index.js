import classNames from "classnames/bind";
import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

function Avatar({src,size = 'small',classnames,...props}) {

    const classes = cx('wrapper',{[classnames]:classnames},size);

    return ( 
        <div className={classes} {...props}>
            <img src={src}></img>
        </div>
     );
}

export default Avatar;