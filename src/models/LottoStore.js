import { Random } from '@woowacourse/mission-utils';
import { LOTTO_INFO } from '../constants/config.js';
import Lotto from './Lotto.js';

class LottoStore {
  buyLottos(purchaseAmount) {
    const lottoCount = purchaseAmount.calculateLottoCount();

    const lottos = this.#generateLottos(lottoCount);
    return lottos;
  }

  #generateLottos(lottoCount) {
    const lottos = [];

    for (let _ = 0; _ < lottoCount; _++) {
      const numbers = Random.pickUniqueNumbersInRange(
        LOTTO_INFO.RANGE_START,
        LOTTO_INFO.RANGE_END,
        LOTTO_INFO.TOTAL_LENGTH
      );
      lottos.push(new Lotto(numbers));
    }
    return lottos;
  }
}

export default LottoStore;
