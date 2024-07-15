import classNames from "classnames/bind";
import styles from "./Spin.module.scss";

const cx = classNames.bind(styles);

export function SpinDot({ middle = true }) {

    const point = cx({ middle }); 

    return ( 
        <div className={point}>
            <div className={cx('wrapper')}>
                <div className={cx('dot','dot-one')} ></div>
                <div className={cx('dot','dot-two')} ></div>
                <div className={cx('dot','dot-three')} ></div>
            </div>
        </div>
     );
}


export function SpinAround({middle = true, width = "2.2rem", height = "2.2rem"}) {
    const point = cx("ring-wrapper",{ middle });

    return (
        <div className={cx("wrapper")}>
            <div style={{width,height}} className={point}>
                <div className={cx('ring','ring-one')}>
                    <div className={cx('ring','ring-two')}>
                        <div className={cx('ring','ring-three')}></div>
                    </div>
                </div>
                
                
            </div>
        </div>
    );
}

export default SpinDot;