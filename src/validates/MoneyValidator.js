import { ERROR_MESSAGE } from '../constants/messages.js';

export default {
  isValidUnit(money) {
    if (Number(money) % 1000 !== 0) {
      throw new Error(ERROR_MESSAGE.MONEY.INVALID_UNIT);
    }
  },

  tooLarge(money) {
    if (BigInt(money) > BigInt(Number.MAX_SAFE_INTEGER)) {
      throw new Error(ERROR_MESSAGE.MONEY.TOO_LARGE);
    }
  },
};
