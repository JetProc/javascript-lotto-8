import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE } from '../constants/messages.js';
import { LOTTO_NUMBER_SEPARATOR, LOTTO_RANK } from '../constants/config.js';
const OutputView = {
  printPurchasedLottos(lottoNumberArrays) {
    Console.print(OUTPUT_MESSAGE.PURCHASE_RESULT(lottoNumberArrays.length));

    lottoNumberArrays.forEach((numbers) => {
      Console.print(`[${numbers.join(`${LOTTO_NUMBER_SEPARATOR} `)}]`);
    });
  },

  // 3개 일치 (5,000원) - 1개
  // 4개 일치 (50,000원) - 0개
  // 5개 일치 (1,500,000원) - 0개
  // 5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
  // 6개 일치 (2,000,000,000원) - 0개

  printResult(winningCnt, purchaseMoney, prizeMoney) {
    Console.print(OUTPUT_MESSAGE.WINNING_STATISTICS_HEADER);

    LOTTO_RANK.toReversed().forEach((idx, rank) => {
      const { matchCount, money, requireBonus } = rank;
      Console.print(
        `${OUTPUT_MESSAGE.WINNING_MATCH_COUNT_INFO(matchCount)} ${OUTPUT_MESSAGE.WINNING_PRIZE_MONEY(money)} - ${
          winningCnt[idx]
        }개`
      );
    });
  },

  printError(meesage) {
    Console.print(meesage);
  },
};

export default OutputView;
