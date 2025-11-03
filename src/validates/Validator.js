import { ERROR_MESSAGE } from '../constants/messages.js';
import { LOTTO_INFO } from '../constants/config.js';

const POSTIVIE_INTEGER_REGEX = /^[1-9]\d*$/;

export default {
  isInputEmpty(input) {
    if (input === '') {
      throw new Error(ERROR_MESSAGE.COMMON.INPUT_EMPTY);
    }
  },

  isPositiveInteger(input) {
    if (!POSTIVIE_INTEGER_REGEX.test(input)) {
      throw new Error(ERROR_MESSAGE.COMMON.INPUT_NOT_AN_POSITIVE_INTEGER);
    }
  },

  isNumberInRange(_number) {
    const number = Number(_number);
    if (number < LOTTO_INFO.RANGE_START || number > LOTTO_INFO.RANGE_END) {
      throw new Error(ERROR_MESSAGE.COMMON.LOTTO_NUMBER_OUT_OF_RANGE);
    }
  },

  duplicatesNumber(numbers) {
    const numberSet = new Set(numbers);
    if (numberSet.size !== numbers.length) {
      throw new Error(ERROR_MESSAGE.COMMON.LOTTO_NUMBER_DUPLICATED);
    }
  },
};
