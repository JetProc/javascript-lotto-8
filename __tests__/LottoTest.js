import Lotto from '../src/models/Lotto.js';
import { ERROR_MESSAGE } from '../src/constants/messages.js';

describe('Lotto 클래스 단위 테스트', () => {
  describe('Lotto 번호 예외 검사', () => {
    // cases
    const INVALID_COUNT_CASE = [[[1, 2, 3, 4, 5, 6, 7]], [[1, 2, 3, 4, 5]]];

    const LOTTO_NUMBER_OUT_OF_RANGE = [[[1, 2, 3, 4, 5, 0]], [[1, 2, 3, 4, 5, 46]]];

    const INPUT_NOT_AN_POSITIVE_INTEGER_CASE = [
      ['숫자가 아닌 값', ['1', '2', '3', '4', '5', 'a']],
      ['공백 문자', ['1', '2', '3', '4', '5', ' ']],
      ['소수', [1, 2, 3, 4, 5, 1.5]],
    ];

    // INVALID_COUNT_CASE
    test.each(INVALID_COUNT_CASE)('로또 번호의 개수가 6개가 아니면 예외가 발생한다', (numbers) => {
      expect(() => {
        new Lotto(numbers);
      }).toThrow(ERROR_MESSAGE.WINNING_NUMBERS.INVALID_COUNT);
    });

    // LOTTO_NUMBER_OUT_OF_RANGE
    test.each(LOTTO_NUMBER_OUT_OF_RANGE)('로또 번호가 범위 안의 숫자가 아니면 예외가 발생한다.', (numbers) => {
      expect(() => {
        new Lotto(numbers);
      }).toThrow(ERROR_MESSAGE.WINNING_NUMBERS.LOTTO_NUMBER_OUT_OF_RANGE);
    });

    // INPUT_NOT_AN_POSITIVE_INTEGER_CASE
    test.each(INPUT_NOT_AN_POSITIVE_INTEGER_CASE)('%s: %p 입력 시 예외가 발생한다.', (title, numbers) => {
      expect(() => {
        new Lotto(numbers);
      }).toThrow(ERROR_MESSAGE.COMMON.INPUT_NOT_AN_POSITIVE_INTEGER);
    });

    // LOTTO_NUMBER_DUPLICATED_CASE
    test('로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, 5]);
      }).toThrow(ERROR_MESSAGE.COMMON.LOTTO_NUMBER_DUPLICATED);
    });
  });

  describe('Lotto 클래스 기능 검사', () => {
    test('로또 번호가 오름차순으로 정렬되어 저장된다.', () => {
      const numbers = [6, 5, 4, 3, 2, 1];
      const lotto = new Lotto(numbers);
      expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('문자열 숫자를 입력해도 숫자로 변환되어 저장된다.', () => {
      const numbers = ['6', '5', '4', '3', '2', '1'];
      const lotto = new Lotto(numbers);
      expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
