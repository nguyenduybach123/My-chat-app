import { auth } from "../../firebase/config";
import { FacebookAuthProvider, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, getAdditionalUserInfo } from "firebase/auth";
import React from "react";
import classNames from "classnames/bind";

import styles from "./Login.module.scss";
import Button from "../../components/Button";
import images from "../../assets/images";
import Wrapper from "../../components/Wrapper";
import addDocument from "../../firebase/services";

const cx = classNames.bind(styles);

function Login() {
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const fbProvider = new FacebookAuthProvider();

    const handleSignInEmailLogin = () => {
        createUserWithEmailAndPassword(auth, email, password)
    }

    const handleEmailLogin = async () => {
        try{

            const result = await signInWithEmailAndPassword(auth,email,password);
            const user = result.user;
            const additionalUserInfo = getAdditionalUserInfo(result);
            
            if(additionalUserInfo?.isNewUser) {
                console.log('new user')
               addDocument('users',{
                    displayName: user.displayName == null ? user.email : user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                    uid: user.uid,
                    providerId: additionalUserInfo.providerId,
                    friendlist: [],
                    following: []
                });
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    const handleFbLogin = async () => {
        try {
            const result = await signInWithPopup(auth,fbProvider);
            const user = result.user;
            const additionalUserInfo = getAdditionalUserInfo(result);
    
            if(additionalUserInfo?.isNewUser) {
                console.log("new user");
               addDocument('users',{
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                    uid: user.uid,
                    providerId: additionalUserInfo.providerId,
                    friendlist: [],
                    following: []
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }



    return (
        <div className={cx('wrapper')}>
            <Wrapper>
                <div className={cx('login-wrapper')}>
                    <p className={cx('title')}>Chat For Fun</p>
                    <input placeholder="Số điện thoại hoặc email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input type={'password'} placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                    <Button success classnames={cx('btn-login')} onClick={handleEmailLogin} >Login</Button>
                    <Button success classnames={cx('btn-login')} onClick={handleSignInEmailLogin} >Sign In</Button>
                    <div className={cx('separate')}>
                        <div className={cx('separate-line')}></div>
                        <div className={cx('separate-text')}>Hoặc</div>
                        <div className={cx('separate-line')}></div>
                    </div>
                    <Button classnames={cx('facebook-login')} src={images.facebookLogo} text onClick={handleFbLogin} >Đăng nhập bằng facebook</Button>
                    <Button href='#' text>Bạn quên mật khẩu ?</Button>
                </div>
            </Wrapper>

        </div>

    );
}

export default Login;