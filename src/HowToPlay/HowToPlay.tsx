import { motion } from 'framer-motion';
import styles from './HowToPlay.module.css';

const HowToPlay = () => {
    return (
        <div className={styles.wrapper}>
            <motion.button className={styles.button} whileTap={{ scale: 0.95 }}>
                How to Play?
            </motion.button>
        </div>
    )
}

export default HowToPlay;