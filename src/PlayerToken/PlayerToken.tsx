import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from './PlayerToken.module.css';
import {boardMap} from "../utils/BoardMap";

interface PlayerTokenProps {
    position: number;
    cellRefs: (HTMLDivElement | null)[];
}

export const PlayerToken: FC<PlayerTokenProps> = ({ position, cellRefs }) => {
    const [coords, setCoords] = useState<{ left: number; top: number }>({ left: 0, top: 0 });

    useEffect(() => {
        const targetIndex = boardMap.findIndex((cell) => cell === position);

        if (targetIndex !== -1) {
            const cell = cellRefs[targetIndex];
            if (cell) {
                const rect = cell.getBoundingClientRect();
                const parentRect = cell.parentElement?.getBoundingClientRect();
                if (parentRect) {
                    setCoords({
                        left: rect.left - parentRect.left,
                        top: rect.top - parentRect.top,
                    });
                }
            }
        }
    }, [position, cellRefs]);

    return (
        <motion.div
            className={styles.playerToken}
            animate={{ left: coords.left, top: coords.top }}
            transition={{ type: "tween", stiffness: 150, damping: 30 }}
        />
    );
};