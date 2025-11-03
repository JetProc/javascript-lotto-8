import { LOTTO_COST, LOTTO_INFO, LOTTO_NUMBER_SEPARATOR } from './config.js';

export const PREFIX = Object.freeze({
  ERROR: '[ERROR]',
});

export const INPUT_MESSAGE = Object.freeze({
  MONEY: `구입금액을 입력해 주세요.\n`,
  WINNING_NUMBER_STRING: `\n당첨 번호를 입력해 주세요.\n`,
  BONUS_NUMBER: `\n보너스 번호를 입력해 주세요.\n`,
});

export const OUTPUT_MESSAGE = Object.freeze({
  PURCHASE_RESULT: (purchaseCnt) => `\n${purchaseCnt}개를 구매했습니다.`,
  WINNING_STATISTICS_HEADER: `\n당첨 통계\n---`,
  WINNING_MATCH_COUNT_INFO: (matchCnt) => `${matchCnt}개 일치`,
  WINNING_PRIZE_MONEY: (prizeMoney) => `(${prizeMoney}원)`,
  WINNING_COUNT: (winningCnt) => `${winningCnt}개`,
  PROFIT_RATE: (rate) => `총 수익률은 ${rate}%입니다.`,
});

export const ERROR_MESSAGE = Object.freeze({
  COMMON: Object.freeze({
    INPUT_EMPTY: `${PREFIX.ERROR} 입력값은 비어있을 수 없습니다.`,
    INPUT_NOT_AN_POSITIVE_INTEGER: `${PREFIX.ERROR} 값은 정수만 입력되어야 합니다.`,
    LOTTO_NUMBER_OUT_OF_RANGE: `${PREFIX.ERROR} 로또 번호는 ${LOTTO_INFO.RANGE_START}부터 ${LOTTO_INFO.RANGE_END} 사이의 숫자여야 합니다.`,
    LOTTO_NUMBER_DUPLICATED: `${PREFIX.ERROR} 로또 번호는 중복될 수 없습니다.`,
  }),
  MONEY: Object.freeze({
    INVALID_UNIT: `${PREFIX.ERROR} 구입 금액은 ${LOTTO_COST}원 단위로 입력해야 합니다.`,
    TOO_LARGE: `${PREFIX.ERROR} 구입 금액이 너무 큽니다.`,
  }),
  WINNING_NUMBER_STRING: Object.freeze({
    NO_SEPARATOR: `${PREFIX.ERROR} 당첨 번호는 '${LOTTO_NUMBER_SEPARATOR}' 기준으로 구분해야 합니다.`,
    INVALID_FORMAT: `${PREFIX.ERROR} 잘못된 입력 형식입니다.`,
  }),
  WINNING_NUMBERS: Object.freeze({
    INVALID_COUNT: `${PREFIX.ERROR} 당첨 번호는 ${LOTTO_INFO.TOTAL_LENGTH}개여야 합니다.`,
  }),
});
