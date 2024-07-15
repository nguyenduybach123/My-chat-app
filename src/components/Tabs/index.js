import classNames from "classnames/bind";
import React from "react";
import styles from "./Tabs.module.scss";

const cx = classNames.bind(styles);

function Tabs({ tabItems, initActive , sizeHeader , sizeContent , lineColor , lineHeight = 1 , paddingHeader = 8 , paddingContent = 8, children }) {

    const [isActive,setIsActive] = React.useState(initActive)
    
    const lineRef = React.useRef();

    const tabRef = React.useRef();


    const handleTabActive = (e,aKey) => {
        console.log(e.target.offsetLeft)
        lineRef.current.style.left = e.target.offsetLeft + paddingHeader + "px";
        lineRef.current.style.width = e.target.offsetWidth + paddingHeader + "px";
        setIsActive(aKey);
    }

    React.useEffect(() => {
        tabRef.current.childNodes.forEach((element,idx) => {
            if(idx !== tabRef.current.childNodes.length - 1 && element.innerText === isActive) {
                
                lineRef.current.style.left = element.offsetLeft + paddingHeader +"px";
                
                let size = element.clientWidth - ( paddingHeader * 2);
                lineRef.current.style.width =  size + "px";
                console.log(element.clientWidth - ( paddingHeader * 2))
            }
        });
    },[isActive])

    return (
        <div className={cx('wrapper')}>
            <div ref={tabRef} className={cx('tab-header')} style={{fontSize: sizeHeader}}>
                {
                    tabItems.map((item,idx) => (
                        <div style={{padding: paddingHeader + "px" }} key={idx} className={isActive === item ? cx('tab-item','active') : cx('tab-item')} onClick={(e) => handleTabActive(e,item)}>
                            {item}
                        </div>
                    ))
                }
                <div ref={lineRef} className={cx('line')} style={{backgroundColor: lineColor, height: lineHeight }}></div>
            </div>
            <div className={cx('tab-content')} style={{ fontSize: sizeContent, padding: paddingContent + "px"}}>
                {
                    React.Children.map(children,item => (
                        <div key={item.props.aKey} className={ isActive === item.props.aKey ? cx('tab-pane','active') : cx('tab-pane')}>
                            {item.props.children}
                        </div>
                    ))
                }
                
            </div>
        </div> 
     );
}


export function TabPane({aKey,children}) {
    return ( 
        <></>
     );
}


export default Tabs;