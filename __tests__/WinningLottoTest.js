import WinningLotto from '../src/models/WinningLotto.js';
import { ERROR_MESSAGE } from '../src/constants/messages.js';

describe('WinningLotto 클래스 단위 테스트', () => {
  const MAIN_NUMBERS = [1, 2, 3, 4, 5, 6];
  const BONUS_NUMBER = '7';

  describe('보너스 번호 예외 검사', () => {
    const cases = [
      [ERROR_MESSAGE.COMMON.INPUT_EMPTY, '빈 값', ''],
      [ERROR_MESSAGE.COMMON.INPUT_NOT_AN_POSITIVE_INTEGER, '숫자가 아닌 값', 'a'],
      [ERROR_MESSAGE.COMMON.INPUT_NOT_AN_POSITIVE_INTEGER, '0', '0'],
      [ERROR_MESSAGE.COMMON.INPUT_NOT_AN_POSITIVE_INTEGER, '음수', '-10'],
      [ERROR_MESSAGE.COMMON.INPUT_NOT_AN_POSITIVE_INTEGER, '소수', '1.5'],
      [ERROR_MESSAGE.COMMON.LOTTO_NUMBER_OUT_OF_RANGE, '범위 밖의 값 (46)', '46'],
      [ERROR_MESSAGE.COMMON.LOTTO_NUMBER_DUPLICATED, '당첨 번호와 중복된 값', '6'],
    ];

    test.each(cases)('%s: "%s" 입력 시 예외 발생', (errorMsg, title, bonusNumber) => {
      expect(() => {
        new WinningLotto(MAIN_NUMBERS, bonusNumber);
      }).toThrow(errorMsg);
    });
  });

  describe('기능 검사', () => {
    test('정상 입력 시 WinningLotto 인스턴스가 생성된다', () => {
      expect(() => {
        new WinningLotto(MAIN_NUMBERS, BONUS_NUMBER);
      }).not.toThrow();
    });

    test('compare 메서드: 6개 일치', () => {
      const winningLotto = new WinningLotto(MAIN_NUMBERS, BONUS_NUMBER);
      const myLotto = [1, 2, 3, 4, 5, 6];
      expect(winningLotto.compare(myLotto)).toEqual({
        matchCount: 6,
        hasBonus: false,
      });
    });

    test('compare 메서드: 5개 + 보너스 일치 (2등)', () => {
      const winningLotto = new WinningLotto(MAIN_NUMBERS, BONUS_NUMBER);
      const myLotto = [1, 2, 3, 4, 5, 7];
      expect(winningLotto.compare(myLotto)).toEqual({
        matchCount: 5,
        hasBonus: true,
      });
    });

    test('compare 메서드: 5개 일치 (3등)', () => {
      const winningLotto = new WinningLotto(MAIN_NUMBERS, BONUS_NUMBER);
      const myLotto = [1, 2, 3, 4, 5, 8];
      expect(winningLotto.compare(myLotto)).toEqual({
        matchCount: 5,
        hasBonus: false,
      });
    });

    test('compare 메서드: 3개 일치 (5등)', () => {
      const winningLotto = new WinningLotto(MAIN_NUMBERS, BONUS_NUMBER);
      const myLotto = [1, 2, 3, 8, 9, 10];
      expect(winningLotto.compare(myLotto)).toEqual({
        matchCount: 3,
        hasBonus: false,
      });
    });
  });
});
