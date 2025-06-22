import Button from "../Button/Button";
import Logo from '../assets/white-green-logo.svg';
import styles from './Header.module.css'
import Dots from "../assets/Dots.svg";

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.nav}>
                <Button>
                    Close
                </Button>
                <img src={Logo} alt="Logo" />
                <Button direction='down'>
                    <img src={Dots} alt="dots"/>
                </Button>
            </div>
            <div className={styles.titleSection}>
                <span className={styles.divider}></span>
                <p className={styles.title}>Roll Craft</p>
                <span className={styles.divider}></span>
            </div>
        </div>
    )
}

export default Header;