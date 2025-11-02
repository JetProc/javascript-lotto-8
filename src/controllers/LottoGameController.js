import InputView from '../views/InputView.js';
import LottoStore from '../models/LottoStore.js';
import { INPUT_MESSAGE } from '../constants/messages.js';
import OutputView from '../views/OuputView.js';
import PurchaseAmount from '../models/PurchaseAmount.js';
import WinningLotto from '../models/WinningLotto.js';
import { splitBySeparator } from '../utils/Utils.js';
import { LOTTO_NUMBER_SEPARATOR } from '../constants/config.js';
import Lotto from '../models/Lotto.js';

class LottoGameController {
  async play() {
    try {
      const purchaseAmount = await this.#getValidPurchaseAmount();

      const lottoStore = new LottoStore();

      const lottos = lottoStore.buyLottos(purchaseAmount);

      const lottoNumberArrays = lottos.map((lotto) => lotto.getNumbers());

      OutputView.printPurchasedLottos(lottoNumberArrays);

      //로또 메인 번호 입력 및 검증
      const winningMainNumbers = await this.#getValidWinningMainNumbers();

      const winningBonusNumber = await this.#getValidWinningBonusNumber();

      const winningLotto = new WinningLotto(winningMainNumbers.getNumbers(), winningBonusNumber);

      OutputView.printResult(4, 1000, 0);
    } catch (error) {
      OutputView.printError(error.message);
      throw error;
    }
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
