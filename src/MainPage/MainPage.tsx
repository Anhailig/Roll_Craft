import {useEffect, useState} from "react";

import RollsBar from "../RollsBar/RollsBar";
import Board from "../Board/Board";
import RollButton from "../RollButton/RollButton";

import styles from './MainPage.module.css';
import Header from "../Header/Header";
import AddDice from "../AddDice/AddDice";
import HowToPlay from "../HowToPlay/HowToPlay";

const MAX_ROLLS = 10;
const INTERVAL_MINUTES = 30;
const INTERVAL_MS = INTERVAL_MINUTES * 60 * 1000;
const BOARD_LENGTH = 20;


export const MainPage = () => {
    const [rolling, setRolling] = useState<boolean>(false);
    const [position, setPosition] = useState<number>(0);
    const [highlightCell, setHighlightCell] = useState<number | null>(null);
    const [finalReached, setFinalReached] = useState<boolean>(false);

    const [availableRolls, setAvailableRolls] = useState<number>(7);
    const [nextRollTime, setNextRollTime] = useState<number>(Date.now() + INTERVAL_MS);
    const [remainingTime, setRemainingTime] = useState<number>(INTERVAL_MS);

    const disabledRoll = rolling || !availableRolls;

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const diff = nextRollTime - now;

            if (availableRolls >= MAX_ROLLS) {
                clearInterval(interval);
                return;
            }

            if (diff <= 0) {
                setAvailableRolls((prev) => Math.min(prev + 1, MAX_ROLLS));
                setNextRollTime(Date.now() + INTERVAL_MS);
                setRemainingTime(INTERVAL_MS);
            } else {
                setRemainingTime(diff);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [nextRollTime, availableRolls]);

    const decreaseRolls = () => setAvailableRolls((prev) => prev - 1);

    const moveTokenStepByStep = (start: number, steps: number, callback: () => void) => {
        let currentStep = 0;
        let currentPos = start;

        const interval = setInterval(() => {
            currentPos = (currentPos + 1) % BOARD_LENGTH;
            setPosition(currentPos);
            currentStep++;

            if (currentStep >= steps) {
                clearInterval(interval);
                setTimeout(() => setFinalReached(true), 300);
                callback();
            }
        }, 300);
    };

    const handleRollStart = () => {
        if (disabledRoll) return;
        setFinalReached(false);
        setRolling(true);
        decreaseRolls();
        setHighlightCell(null);
    };

    const handleRollEnd = (value: number) => {
        moveTokenStepByStep(position, value, () => {
            setRolling(false);
            setHighlightCell((position + value) % BOARD_LENGTH);
        });
    };

    return (
        <div className={styles.pageWrapper}>
            <Header />
            <div >
                <RollsBar
                    availableRolls={availableRolls}
                    maxRolls={MAX_ROLLS}
                    remainingTime={remainingTime}
                />
                <Board
                    rolling={rolling}
                    onRollStart={handleRollStart}
                    onRollEnd={handleRollEnd}
                    playerPosition={position}
                    highlightCell={highlightCell}
                    finalReached={finalReached}
                />
                <AddDice />
                <RollButton onClick={handleRollStart} disabled={disabledRoll}/>
                <HowToPlay />
            </div>
        </div>

    )
}