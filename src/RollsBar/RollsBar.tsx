import React from 'react';
import styles from './RollsBar.module.css';
import clsx from "clsx";

interface RollsBarProps {
    availableRolls: number;
    maxRolls: number;
    remainingTime: number;
}

const RollsBar: React.FC<RollsBarProps> = ({availableRolls, maxRolls, remainingTime}) => {

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>Available rolls</span>
                <span className={styles.counter}>{availableRolls}/{maxRolls}</span>
            </div>
            <div className={styles.bar}>
                {Array.from({ length: maxRolls }, (_, i) => (
                    <div
                        key={i}
                        className={clsx(styles.segment, i < availableRolls ? styles.segmentFilled : styles.segmentEmpty)}
                    />
                ))}
            </div>
            {availableRolls < maxRolls && (
                <div className={styles.timer}>{formatTime(remainingTime)}</div>
            )}
        </div>
    );
};

export default RollsBar;