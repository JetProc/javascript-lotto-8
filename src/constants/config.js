export const LOTTO_NUMBER_SEPARATOR = ',';

export const LOTTO_COST = 1000;

export const LOTTO_INFO = Object.freeze({
  RANGE_START: 1,
  RANGE_END: 45,
  TOTAL_LENGTH: 6,
});

export const LOTTO_RANK = Object.freeze([
  Object.freeze({
    rank: 1,
    matchCount: 6,
    money: '2,000,000,000',
    requireBonus: false,
  }),
  Object.freeze({
    rank: 2,
    matchCount: 5,
    money: '30,000,000',
    requireBonus: true,
  }),
  Object.freeze({
    rank: 3,
    matchCount: 5,
    money: '1,500,000',
    requireBonus: false,
  }),
  Object.freeze({
    rank: 4,
    matchCount: 4,
    money: '50,000',
    requireBonus: false,
  }),
  Object.freeze({
    rank: 5,
    matchCount: 3,
    money: '5,000',
    requireBonus: false,
  }),
]);
