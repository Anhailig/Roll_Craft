import {FC, useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import styles from './Dice.module.css';

import dice1 from '../assets/dice/Dice_1.svg';
import dice2 from '../assets/dice/Dice_2.svg';
import dice3 from '../assets/dice/Dice_3.svg';
import dice4 from '../assets/dice/Dice_4.svg';
import dice5 from '../assets/dice/Dice_5.svg';
import dice6 from '../assets/dice/Dice_6.svg';

import spin1 from '../assets/dice/Spin_1.svg';
import spin2 from '../assets/dice/Spin_2.svg';
import spin3 from '../assets/dice/Spin_3.svg';

import glow from '../assets/dice/light.png';

const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];
const spinFrames = [spin1, spin2, spin3];

interface DiceProps {
    rolling: boolean;
    onRollStart: () => void;
    onRollEnd: (value: number) => void;
}

const Dice: FC<DiceProps> = ({ rolling, onRollStart, onRollEnd }) => {
    const [frameIndex, setFrameIndex] = useState(0);
    const [finalValue, setFinalValue] = useState(1);
    const [phase, setPhase] = useState<'idle' | 'start' | 'spin' | 'end'>('idle');

    const handleRollStart = () => {
        setPhase('start');
        onRollStart();
    };

    useEffect(() => {
        if (rolling) {
            handleRollStart();

            setTimeout(() => {
                setPhase('spin');
                let frame = 0;
                const randomDuration = Math.random() * 500 + 500;
                const totalFrames = Math.floor(randomDuration / 60);

                const interval = setInterval(() => {
                    setFrameIndex((prev) => (prev + 1) % spinFrames.length);
                    frame++;
                    if (frame >= totalFrames) {
                        clearInterval(interval);
                        const result = Math.floor(Math.random() * 6) + 1;
                        setFinalValue(result);
                        setPhase('end');

                        setTimeout(() => {
                            setPhase('idle');
                            onRollEnd(result);
                        }, 1000);
                    }
                }, 60);
            }, 200);
        }
    }, [rolling]);

    const renderImage = () => {
        const src = phase === 'spin' ? spinFrames[frameIndex] : diceImages[finalValue - 1];
        const alt = phase === 'spin' ? 'Spinning' : `Dice ${finalValue}`;

        return (
            <motion.img
                key={src}
                src={src}
                alt={alt}
                className={styles.diceImage}
                initial={{ rotate: 0, filter: 'blur(0px)' }}
                animate={{ rotate: phase === 'spin' ? 360 : 0, filter: phase === 'spin' ? 'blur(2px)' : 'blur(0px)'}}
                transition={{ duration: phase === 'spin' ? 1 : 0.2 }}
            />
        );
    };

    const getScale = () => {
        switch (phase) {
            case 'start':
                return 1.2;
            case 'spin':
                return 2;
            case 'end':
                return 1.2;
            default:
                return 1;
        }
    };

    return (
        <motion.div
            className={`${styles.diceWrapper} ${styles.dice}`}
            animate={{ scale: getScale() }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
            <AnimatePresence mode="wait">{renderImage()}</AnimatePresence>

            {phase === 'end' && (
                <motion.img
                    src={glow}
                    alt="Glow"
                    className={styles.glow}
                    initial={{ scale: 1, opacity: 0.5, rotate: 0 }}
                    animate={{ scale: 2.5, opacity: 0, rotate: 180 }}
                    transition={{ duration: 2.5, ease: 'easeOut' }}
                />
            )}
        </motion.div>
    );
};

export default Dice;
