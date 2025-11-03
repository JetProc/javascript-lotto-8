import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

const runException = async (invalidInput, precedingInputs = []) => {
  // given
  const logSpy = getLogSpy();
  const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5, 6];
  const INPUTS_TO_END = ['1000', '1,2,3,4,5,6', '7'];

  mockRandoms([RANDOM_NUMBERS_TO_END]);
  mockQuestions([...precedingInputs, invalidInput, ...INPUTS_TO_END]);

  // when
  const app = new App();
  await app.run();

  // then
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
};

describe('로또 애플리케이션 예외 검사', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('구입 금액 예외 검사', () => {
    const cases = [
      ['숫자가 아닌 경우', '1000j'],
      ['1000원 단위가 아닌 경우', '1500'],
      ['0원인 경우', '0'],
      ['음수인 경우', '-1000'],
      ['공백인 경우', ''],
      ['소수인 경우', '1000.5'],
    ];

    test.each(cases)('%s: "%s" 입력 시 [ERROR] 출력', async (title, input) => {
      await runException(input);
    });
  });

  describe('당첨 번호 예외 검사', () => {
    const precedingInput = ['1000'];
    const cases = [
      ['숫자가 아닌 경우', '1,2,3,4,5,a'],
      ['숫자 범위를 벗어난 경우 (46)', '1,2,3,4,5,46'],
      ['숫자 범위를 벗어난 경우 (0)', '1,2,3,4,5,0'],
      ['중복된 숫자가 있는 경우', '1,2,3,4,5,5'],
      ['개수가 6개가 아닌 경우 (5개)', '1,2,3,4,5'],
      ['개수가 6개가 아닌 경우 (7개)', '1,2,3,4,5,6,7'],
      ['공백이 포함된 경우', '1,2,3,4,5, '],
      ['쉼표로 시작하는 경우', ',1,2,3,4,5'],
      ['쉼표로 끝나는 경우', '1,2,3,4,5,'],
      ['쉼표가 없는 경우', '1 2 3 4 5 6'],
      ['공백만 입력한 경우', ''],
    ];

    test.each(cases)('%s: "%s" 입력 시 [ERROR] 출력', async (title, input) => {
      await runException(input, precedingInput);
    });
  });

  describe('보너스 번호 예외 검사', () => {
    const precedingInputs = ['1000', '1,2,3,4,5,6'];
    const cases = [
      ['숫자가 아닌 경우', 'a'],
      ['숫자 범위를 벗어난 경우 (46)', '46'],
      ['숫자 범위를 벗어난 경우 (0)', '0'],
      ['당첨 번호와 중복된 경우', '6'],
      ['공백인 경우', ''],
      ['소수인 경우', '7.5'],
    ];

    test.each(cases)('%s: "%s" 입력 시 [ERROR] 출력', async (title, input) => {
      await runException(input, precedingInputs);
    });
  });
});
