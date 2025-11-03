import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE } from '../constants/messages.js';
import { LOTTO_NUMBER_SEPARATOR, LOTTO_RANK } from '../constants/config.js';
import { formatNumber } from '../utils/Utils.js';
const OutputView = {
  printPurchasedLottos(lottoNumberArrays) {
    Console.print(OUTPUT_MESSAGE.PURCHASE_RESULT(lottoNumberArrays.length));

    lottoNumberArrays.forEach((numbers) => {
      Console.print(`[${numbers.join(`${LOTTO_NUMBER_SEPARATOR} `)}]`);
    });
  },

  printResult(resultData, profitRate) {
    Console.print(OUTPUT_MESSAGE.WINNING_STATISTICS_HEADER);

    this.printWinningInfo(resultData);

    const formattedProfitRate = Number(formatNumber(profitRate)).toFixed(1);
    Console.print(OUTPUT_MESSAGE.PROFIT_RATE(formattedProfitRate));
  },

  printWinningInfo(resultData) {
    resultData.forEach((rank) => {
      const { matchCount, money, requireBonus, count } = rank;

      let matchMessage = OUTPUT_MESSAGE.WINNING_MATCH_COUNT_INFO(matchCount);
      if (requireBonus) matchMessage += ', 보너스 볼 일치';

      const formattedMoney = formatNumber(money);
      const prizeMessage = OUTPUT_MESSAGE.WINNING_PRIZE_MONEY(formattedMoney);

      Console.print(`${matchMessage} ${prizeMessage} - ${count}개`);
    });
  },
};

export default OutputView;
