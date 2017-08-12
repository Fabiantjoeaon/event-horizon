export const randomFloatInRange = (min, max) => Math.random()*(max-min+1)+min;
export const normalizeInRange = (val, max, min) => (val - min) / (max - min); 
export const normalizeOneZero = (val) => normalizeInRange(val, 1.0, 0.0);
