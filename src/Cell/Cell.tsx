import {FC, useEffect, useState} from 'react';
import styles from './Cell.module.css';
import {cellDataByIndex, cellLabels} from "../utils/BoardMap";
import {AnimatePresence, motion} from 'framer-motion';
import glow from '../assets/dice/light.png';
import {isCornerCell} from "../utils/isCornerCell";
import cornerBg from '../assets/pattern.png';

interface CellProps {
    index: number | string;
    isFinalPosition?: boolean;
}

const Cell: FC<CellProps> = ({ index, isFinalPosition }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [autoTooltip, setAutoTooltip] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isFinalPosition) {
            setAutoTooltip(true);
            timer = setTimeout(() => {
                setAutoTooltip(false);
            }, 1000);
        } else {
            setAutoTooltip(false);
        }

        return () => clearTimeout(timer);
    }, [isFinalPosition]);

    const showTooltip = isHovered || autoTooltip;

    const cell = cellDataByIndex[index as number];

    if (!cell) return null;

    const { Icon, type } = cell;
    const isCorner = isCornerCell(index as number);

    return (
        <div
            className={styles.cellWrapper}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`
                    ${styles.cell} 
                    ${isFinalPosition ? styles.finalCell : ''} 
                    ${isCorner ? styles.cornerCell : ''}`}
            >
                {isCorner && (
                    <img
                        src={cornerBg}
                        alt="Corner background"
                        className={styles.cornerBackground}
                    />
                )}
                {isFinalPosition && (
                    <motion.img
                        src={glow}
                        alt="Glow effect"
                        className={styles.glowEffect}
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                    />
                )}

                {isCorner && cellLabels[index as number] && (
                    <span className={styles.cornerLabel}>
                        {cellLabels[index as number]}
                    </span>
                )}

                <Icon width={56} height={56} className={styles.icon} />
            </div>

            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        className={styles.tooltip}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: -10 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.3 }}
                    >
                        {type}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Cell;
