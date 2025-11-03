import { LOTTO_INFO } from '../constants/config.js';
import { ERROR_MESSAGE } from '../constants/messages.js';
import Validator from './Validator.js';

export default {
  validateLottoNumbers(numbers) {
    if (numbers.length !== LOTTO_INFO.TOTAL_LENGTH) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.INVALID_COUNT);
    }
    Validator.duplicatesNumber(numbers);

    for (const number of numbers) {
      const numStr = String(number);
      Validator.isInputEmpty(numStr);
      Validator.isPositiveInteger(numStr);
      Validator.isNumberInRange(number);
    }
  },
};
