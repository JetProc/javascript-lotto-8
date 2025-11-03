import InputView from '../views/InputView.js';
import OutputView from '../views/OuputView.js';
import { INPUT_MESSAGE } from '../constants/messages.js';
import { LOTTO_NUMBER_SEPARATOR, LOTTO_RANK } from '../constants/config.js';
import { splitBySeparator } from '../utils/Utils.js';
import PurchaseAmount from '../models/PurchaseAmount.js';
import Lotto from '../models/Lotto.js';
import LottoStore from '../models/LottoStore.js';
import LottoResult from '../models/LottoResult.js';
import WinningLotto from '../models/WinningLotto.js';

class LottoGameController {
  async play() {
    try {
      const purchaseAmount = await this.#getValidPurchaseAmount();

      const lottoStore = new LottoStore();

      const lottos = lottoStore.buyLottos(purchaseAmount);

      const lottoNumberArrays = lottos.map((lotto) => lotto.getNumbers());

      OutputView.printPurchasedLottos(lottoNumberArrays);

      const winningMainNumbers = await this.#getValidWinningMainNumbers();

      const winningBonusNumber = await this.#getValidWinningBonusNumber();

      const winningLotto = new WinningLotto(winningMainNumbers.getNumbers(), winningBonusNumber);

      const lottoResult = new LottoResult(lottoNumberArrays, winningLotto);

      const matchCnt = lottoResult.getMatchCntInfo();
      const profitRate = lottoResult.getProfitRate();

      const resultData = this.#prepareResultData(matchCnt);

      OutputView.printResult(resultData, profitRate);
    } catch (error) {
      throw error;
    }
  }

  #prepareResultData(matchCnt) {
    const rankKeys = Object.keys(LOTTO_RANK).reverse();

    return rankKeys.map((rankKey) => {
      const { matchCount, money, requireBonus } = LOTTO_RANK[rankKey];
      const count = matchCnt[rankKey];

      return {
        matchCount,
        money,
        requireBonus,
        count,
      };
    });
  }

  async #getValidPurchaseAmount() {
    const moneyInput = await InputView.readStringWithMsg(INPUT_MESSAGE.MONEY);
    return new PurchaseAmount(moneyInput.trim());
  }

  async #getValidWinningMainNumbers() {
    const winningMainNumbers = await InputView.readStringWithMsg(INPUT_MESSAGE.WINNING_NUMBER_STRING);

    const winningMainNumberArray = splitBySeparator(winningMainNumbers, LOTTO_NUMBER_SEPARATOR);

    return new Lotto(winningMainNumberArray);
  }

  async #getValidWinningBonusNumber() {
    const winningBonusNumber = await InputView.readStringWithMsg(INPUT_MESSAGE.BONUS_NUMBER);
    return winningBonusNumber;
  }
}

export default LottoGameController;
