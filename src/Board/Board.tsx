import styles from './Board.module.css';
import Cell from "../Cell/Cell";
import Dice from "../Dice/Dice";
import {useCallback, useRef} from "react";
import {PlayerToken} from "../PlayerToken/PlayerToken";
import {boardMap} from "../utils/BoardMap";

interface BoardProps {
    rolling: boolean;
    onRollStart: () => void;
    onRollEnd: (value: number) => void;
    playerPosition: number;
    highlightCell: number | null;
    finalReached: boolean;
}

const Board = ({ rolling, onRollStart, onRollEnd, playerPosition, highlightCell, finalReached  }: BoardProps) => {
    const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
    const setCellRef = useCallback((el: HTMLDivElement | null, i: number) => {
        cellRefs.current[i] = el;
    }, []);
    return (
        <div className={styles.board}>
            {boardMap.map((cell, i) => (
                <div
                    key={i}
                    className={styles.cellWrapper}
                    ref={(el) => setCellRef(el, i)}
                     style={{ position: "relative" }}>
                    {cell !== -1 ? (
                        <Cell index={cell} isFinalPosition={cell === highlightCell && finalReached}/>
                    ) : (
                        <div className={styles.emptyCell}></div>
                    )}
                </div>
            ))}
            <Dice
                rolling={rolling}
                onRollStart={onRollStart}
                onRollEnd={onRollEnd}
            />
            <PlayerToken position={playerPosition} cellRefs={cellRefs.current} />
        </div>
    );
};

export default Board;
