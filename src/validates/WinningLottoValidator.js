import { LOTTO_NUMBER_SEPARATOR } from '../constants/config.js';
import { ERROR_MESSAGE } from '../constants/messages.js';
import Validator from './Validator.js';

export default {
  isSeparatorExist(input) {
    if (!input.includes(LOTTO_NUMBER_SEPARATOR)) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBER_STRING.NO_SEPARATOR);
    }
  },

  correctFormat(input) {
    if (input.startsWith(LOTTO_NUMBER_SEPARATOR) || input.endsWith(LOTTO_NUMBER_SEPARATOR)) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBER_STRING.INVALID_FORMAT);
    }
  },

  validateBonusNumber(mainNumbers, bonusNumber) {
    Validator.isInputEmpty(bonusNumber);
    Validator.isPositiveInteger(bonusNumber);
    Validator.isNumberInRange(bonusNumber);

    if (mainNumbers.includes(Number(bonusNumber))) {
      throw new Error(ERROR_MESSAGE.COMMON.LOTTO_NUMBER_DUPLICATED);
    }
  },
};
