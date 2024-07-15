import React from "react";
import classNames from "classnames/bind";


import styles from "./Search.module.scss";
import Button from "../Button";
import { Search } from "../Icons";


const cx = classNames.bind(styles);
const defaultTextChange = () => {}

function SearchBox({onTextChange = defaultTextChange}) {
    
    return ( 
        <div className={cx('wrapper')}>
            <input  className={cx('search-input')} type='text' placeholder="Tìm Kiếm" onChange={(e) => onTextChange(e.target.value)} ></input>
            <Button classnames={cx('btn-search')} icon >
                <Search width="1.2rem" height="1.2rem"></Search>
            </Button>
        </div>
     );
}

export default SearchBox;