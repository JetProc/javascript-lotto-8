import { LOTTO_COST, LOTTO_RANK } from '../constants/config.js';

class LottoResult {
  #matchCntInfo;
  #profitRate;

  constructor(lottos, winningLotto) {
    this.#matchCntInfo = this.#initMatchCntInfo();
    this.#calculateResult(lottos, winningLotto);
    this.#profitRate = this.#calculateProfit(lottos.length);
  }

  #initMatchCntInfo() {
    return Object.keys(LOTTO_RANK).reduce((matchCnt, rankKey) => {
      matchCnt[rankKey] = 0;
      return matchCnt;
    }, {});
  }

  #calculateResult(lottos, winningLotto) {
    lottos.forEach((lotto) => {
      const { matchCount, hasBonus } = winningLotto.compare(lotto);
      const rankKey = this.#getRankKey(matchCount, hasBonus);

      if (rankKey) this.#matchCntInfo[rankKey] += 1;
    });
  }

  #getRankKey(matchCount, hasBonus) {
    if (matchCount === 6) return '1st';
    if (matchCount === 5 && hasBonus) return '2nd';
    if (matchCount === 5 && !hasBonus) return '3rd';
    if (matchCount === 4) return '4th';
    if (matchCount === 3) return '5th';
    return null;
  }

  #calculateProfit(totalLottoCount) {
    let totalPrize = 0;
    Object.entries(this.#matchCntInfo).forEach(([rankKey, count]) => {
      totalPrize += LOTTO_RANK[rankKey].money * count;
    });

    const totalCost = totalLottoCount * LOTTO_COST;

    if (totalCost === 0) return 0;

    const profitRate = (totalPrize / totalCost) * 100;
    return profitRate;
  }

  getMatchCntInfo() {
    return this.#matchCntInfo;
  }

  getProfitRate() {
    return this.#profitRate;
  }
}

export default LottoResult;
