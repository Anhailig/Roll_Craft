import React from "react";
import { ReactComponent as GemIcon } from '../assets/icons/gem.svg';
import { ReactComponent as CashIcon } from '../assets/icons/cash.svg';
import { ReactComponent as VIPIcon } from '../assets/icons/vip.svg';
import { ReactComponent as BoxIcon } from '../assets/icons/box.svg';
import { ReactComponent as GoldIcon } from '../assets/icons/gold.svg';
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import { ReactComponent as PickaxeIcon } from '../assets/icons/pickaxe.svg';
import { ReactComponent as TruckIcon } from '../assets/icons/truck.svg';
import { ReactComponent as DiceIcon } from '../assets/icons/dice.svg';

export const cellDataByIndex: Record<number, { type: string; Icon: React.FC<any> }> = {
    0: { type: 'start', Icon: GemIcon },
    1: { type: 'box', Icon: BoxIcon },
    2: { type: 'cash', Icon: CashIcon },
    3: { type: 'vip', Icon: VIPIcon },
    4: { type: 'pickaxe', Icon: PickaxeIcon },
    5: { type: 'star', Icon: StarIcon },
    6: { type: 'truck', Icon: TruckIcon },
    7: { type: 'cash', Icon: CashIcon },
    8: { type: 'dice', Icon: DiceIcon },
    9: { type: 'gold', Icon: GoldIcon },
    10: { type: 'portal', Icon: GemIcon },
    11: { type: 'box', Icon: BoxIcon },
    12: { type: 'cash', Icon: CashIcon },
    13: { type: 'vip', Icon: VIPIcon },
    14: { type: 'pickaxe', Icon: PickaxeIcon },
    15: { type: 'star', Icon: StarIcon },
    16: { type: 'truck', Icon: TruckIcon },
    17: { type: 'cash', Icon: CashIcon },
    18: { type: 'dice', Icon: DiceIcon },
    19: { type: 'gold', Icon: GoldIcon },
};

export const boardMap = [
    0,  1,  2,  3,  4,  5,
    19, -1, -1, -1, -1,  6,
    18, -1, -1, -1, -1,  7,
    17, -1, -1, -1, -1,  8,
    16, -1, -1, -1, -1,  9,
    15, 14, 13, 12, 11, 10,
]

export const cellLabels: Record<number, string> = {
    0: 'Start',
};