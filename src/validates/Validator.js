import { LOTTO_INFO, LOTTO_NUMBER_SEPARATOR } from '../constants/config.js';
import { ERROR_MESSAGE } from '../constants/messages.js';

const POSTIVIE_INTEGER_REGEX = /^[1-9]\d*$/;

export const Validator = {
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

export const MoneyValidator = {
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

export const LottoValidator = {
  isLottoCountValid(cnt) {
    if (cnt !== LOTTO_INFO.TOTAL_LENGTH) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.INVALID_COUNT);
    }
  },
};

export const WinningLottoValidator = {
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
};
