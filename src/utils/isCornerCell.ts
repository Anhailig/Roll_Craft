export const cornerIndices = [0, 5, 10, 15];

export const isCornerCell = (index: number) => {
    return cornerIndices.includes(index);
};