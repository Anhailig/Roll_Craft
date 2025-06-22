import {useState} from "react";
import PlusIcon from '../assets/plus.svg';
import DiceIcon from '../assets/icons/dice.svg';
import styles from './AddDice.module.css';
import { motion } from "framer-motion";


const AddDice = () => {
    const [counter, setCounter] = useState(5);

    const handleAddDice = () => {
        setCounter(counter + 1);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <img className={styles.diceIcon} src={DiceIcon} alt="dice"/>
                <p className={styles.counter}>{counter}</p>
                <motion.img
                    src={PlusIcon}
                    className={styles.plusButton}
                    alt="Roll"
                    onClick={handleAddDice}
                    whileTap={{ scale: 0.95 }}
                />
            </div>
        </div>
    );
}

export default AddDice;