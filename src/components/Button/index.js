import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,href,
    text = false, success = false, circle = false, icon = false,
    fontDanger = false,
    src,alt,
    classnames,styleText,
    children,
    ...props
}) {

    const classes = cx('wrapper',{[classnames]: classnames,text,success,circle,icon,fontDanger});

    let Comp = 'button';

    if(to){
        props.to = to
        Comp = Link;
    }
    else if (href){
        props.href = href
        Comp = 'a';
    }

    console.log(styleText)

    return ( 
        <Comp className={classes} {...props}>
            {src && <img className={cx('image')} src={src} alt={alt}></img>}
            <span style={styleText}>{children}</span>
        </Comp> 
    );
}

export default Button;