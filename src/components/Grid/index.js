import classNames from "classnames/bind";
import styles from "./Grid.module.scss";

const cx = classNames.bind(styles);

function Grid({container = true , spacing = 'sm' ,children}) {


    const classes = cx({container},`spacing_${spacing}`)

    return ( 
        <div className={classes} >{children}</div>
     );
}

export default Grid;