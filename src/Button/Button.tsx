import styles from './Button.module.css'
import {FC, ReactNode} from "react";
import ArrowLeft from '../assets/Arrow.svg';
import { motion } from 'framer-motion';

interface ButtonProps {
    children?: ReactNode;
    direction?: 'left' | 'down';
}

const Button: FC<ButtonProps> = ({children,  direction = 'left'}) => {
    return (
        <motion.button className={styles.button} whileTap={{ scale: 0.95 }}>
            <img src={ArrowLeft} alt="arrow" className={direction === 'down' ? styles.arrowRight : styles.arrowLeft}/>
            {children}
        </motion.button>
    )
};

export default Button;