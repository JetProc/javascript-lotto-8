export const LOTTO_NUMBER_SEPARATOR = ',';

export const LOTTO_COST = 1000;

export const LOTTO_INFO = Object.freeze({
  RANGE_START: 1,
  RANGE_END: 45,
  TOTAL_LENGTH: 6,
});

export const LOTTO_RANK = Object.freeze({
  '1st': Object.freeze({
    matchCount: 6,
    money: 2000000000,
    requireBonus: false,
  }),
  '2nd': Object.freeze({
    matchCount: 5,
    money: 30000000,
    requireBonus: true,
  }),
  '3rd': Object.freeze({
    matchCount: 5,
    money: 1500000,
    requireBonus: false,
  }),
  '4th': Object.freeze({
    matchCount: 4,
    money: 50000,
    requireBonus: false,
  }),
  '5th': Object.freeze({
    matchCount: 3,
    money: 5000,
    requireBonus: false,
  }),
});
