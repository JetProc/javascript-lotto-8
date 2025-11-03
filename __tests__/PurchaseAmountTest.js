import PurchaseAmount from '../src/models/PurchaseAmount.js';
import { ERROR_MESSAGE } from '../src/constants/messages.js';

describe('PurchaseAmount 클래스 단위 테스트', () => {
  describe('구입 금액 예외 검사', () => {
    const cases = [
      [ERROR_MESSAGE.COMMON.INPUT_EMPTY, '빈 값', ''],
      [ERROR_MESSAGE.COMMON.INPUT_NOT_AN_POSITIVE_INTEGER, '숫자가 아닌 값', 'abc'],
      [ERROR_MESSAGE.COMMON.INPUT_NOT_AN_POSITIVE_INTEGER, '0', '0'],
      [ERROR_MESSAGE.COMMON.INPUT_NOT_AN_POSITIVE_INTEGER, '음수', '-1000'],
      [ERROR_MESSAGE.COMMON.INPUT_NOT_AN_POSITIVE_INTEGER, '소수', '1000.5'],
      [ERROR_MESSAGE.MONEY.INVALID_UNIT, '1000원 단위가 아닌 값', '1500'],
    ];

    test.each(cases)('%s: "%s" 입력 시 예외 발생', (errorMsg, title, input) => {
      expect(() => {
        new PurchaseAmount(input);
      }).toThrow(errorMsg);
    });
  });

  describe('기능 검사', () => {
    test('8000원 입력 시 로또 8개를 계산한다', () => {
      const purchaseAmount = new PurchaseAmount('8000');
      expect(purchaseAmount.calculateLottoCount()).toBe(8);
    });

    test('1000원 입력 시 로또 1개를 계산한다', () => {
      const purchaseAmount = new PurchaseAmount('1000');
      expect(purchaseAmount.calculateLottoCount()).toBe(1);
    });
  });
});
