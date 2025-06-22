import { motion } from 'framer-motion';
import { FC } from 'react';
import styles from './RollButton.module.css';

interface RollButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

const RollButton: FC<RollButtonProps> = ({ onClick, disabled }) => {
    return (
        <motion.button
            className={styles.button}
            onClick={onClick}
            disabled={disabled}
            initial={false}
            animate={{
                scale: disabled ? 0.95 : 1,
                opacity: disabled ? 0.6 : 1,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            Roll
        </motion.button>
    );
};

export default RollButton;