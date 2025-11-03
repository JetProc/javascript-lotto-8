import { INPUT_MESSAGE } from '../constants/messages.js';
import { LOTTO_NUMBER_SEPARATOR, LOTTO_RANK } from '../constants/config.js';

import { splitBySeparator } from '../utils/Utils.js';

import InputView from '../views/InputView.js';
import OutputView from '../views/OuputView.js';

import PurchaseAmount from '../models/PurchaseAmount.js';
import Lotto from '../models/Lotto.js';
import LottoStore from '../models/LottoStore.js';
import WinningLotto from '../models/WinningLotto.js';
import LottoResult from '../models/LottoResult.js';

import WinningLottoValidator from '../validates/WinningLottoValidator.js';

class LottoGameController {
  #lottos;
  #winningLotto;

  constructor() {
    this.#lottos = [];
  }

  async play() {
    const purchaseAmount = await this.#getValidPurchaseAmount();
    this.#buyLottos(purchaseAmount);
    this.#winningLotto = await this.#getValidWinningLotto();
    this.#showResults();
  }

  async #readInputWithValidation(readMsg, validateFunc) {
    while (true) {
      try {
        const input = await InputView.readStringWithMsg(readMsg);
        return validateFunc(input.trim());
      } catch (error) {
        OutputView.printMessage(error.message);
      }
    }
  }

  async #getValidPurchaseAmount() {
    return this.#readInputWithValidation(INPUT_MESSAGE.MONEY, (input) => new PurchaseAmount(input));
  }

  #buyLottos(purchaseAmount) {
    const lottoStore = new LottoStore();
    this.#lottos = lottoStore.buyLottos(purchaseAmount);

    const lottoNumberArrays = this.#lottos.map((lotto) => lotto.getNumbers());
    OutputView.printPurchasedLottos(lottoNumberArrays);
  }

  async #getValidWinningLotto() {
    const mainNumbers = await this.#getValidWinningMainNumbers();

    const winningLotto = await this.#readInputWithValidation(
      INPUT_MESSAGE.BONUS_NUMBER,
      (bonusInput) => new WinningLotto(mainNumbers.getNumbers(), bonusInput.trim())
    );
    return winningLotto;
  }

  async #getValidWinningMainNumbers() {
    return this.#readInputWithValidation(INPUT_MESSAGE.WINNING_NUMBER_STRING, (input) => {
      WinningLottoValidator.validateWinningNumberString(input);

      const numbers = splitBySeparator(input, LOTTO_NUMBER_SEPARATOR);
      return new Lotto(numbers);
    });
  }

  #showResults() {
    const lottoNumberArrays = this.#lottos.map((lotto) => lotto.getNumbers());
    const lottoResult = new LottoResult(lottoNumberArrays, this.#winningLotto);

    const matchCnt = lottoResult.getMatchCntInfo();
    const profitRate = lottoResult.getProfitRate();
    const resultData = this.#prepareResultData(matchCnt);

    OutputView.printResult(resultData, profitRate);
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
}

export default LottoGameController;
