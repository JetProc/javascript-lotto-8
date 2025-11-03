import { LOTTO_INFO } from '../constants/config.js';
import { ERROR_MESSAGE } from '../constants/messages.js';
import Validator from './Validator.js';

export default {
  validateSingleNumber(number) {
    const numStr = String(number);
    Validator.isInputEmpty(numStr);
    Validator.isPositiveInteger(numStr);
    Validator.isNumberInRange(number);
  },

  validateLottolength(length) {
    if (length !== LOTTO_INFO.TOTAL_LENGTH) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.INVALID_COUNT);
    }
  },

  validateLottoNumbers(numbers) {
    numbers.forEach((number) => {
      this.validateSingleNumber(number);
    });

    Validator.duplicatesNumber(numbers);

    this.validateLottolength(numbers.length);
  },
};
