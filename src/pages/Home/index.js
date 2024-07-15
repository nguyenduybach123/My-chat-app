import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import ChatWindow from "../../components/ChatWindow";
import SliderBar from "../../components/SliderBar";
import Grid from "../../components/Grid";
import Column from "../../components/Column";
import UserNavbar from "../../components/UserNavbar";

const cx = classNames.bind(styles);

function Home() {
    
    return ( 
        <div className={cx('wrapper')}>
            <Grid>
                <Column cols={3}>
                    <Grid>
                        <Column cols={2}>
                            <UserNavbar></UserNavbar>
                        </Column>
                        <Column cols={10}>
                            <SliderBar></SliderBar>
                        </Column>
                    </Grid>
                </Column>
                <Column cols={9}>
                    <ChatWindow></ChatWindow>
                </Column>
            </Grid>
        </div>
    );
}

export default Home;