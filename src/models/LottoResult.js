import { LOTTO_COST, LOTTO_RANK } from '../constants/config.js';

class LottoResult {
  #matchCntInfo;
  #profitRate;

  constructor(lottos, winningLotto) {
    this.#matchCntInfo = this.#initMatchCntInfo();
    this.#calculateStats(lottos, winningLotto);
    this.#profitRate = this.#calculateProfit(lottos.length);
  }

  #initMatchCntInfo() {
    return Object.keys(LOTTO_RANK).reduce((matchCnt, rankKey) => {
      matchCnt[rankKey] = 0;
      return matchCnt;
    }, {});
  }

  #calculateStats(lottos, winningLotto) {
    lottos.forEach((lotto) => {
      const { matchCount, hasBonus } = winningLotto.compare(lotto);
      const rankKey = this.#getRankKey(matchCount, hasBonus);

      if (rankKey) this.#matchCntInfo[rankKey] += 1;
    });
  }

  #getRankKey(matchCount, hasBonus) {
    const winLotto = Object.entries(LOTTO_RANK).find(([rankKey, rankInfo]) => {
      if (rankInfo.matchCount !== matchCount) return false;

      if (rankInfo.requireBonus !== hasBonus && matchCount !== 5) return false;

      if (matchCount === 5) return rankInfo.requireBonus === hasBonus;

      return true;
    });

    if (winLotto) return winLotto[0];

    return null;
  }

  #calculateProfit(totalLottoCount) {
    let totalPrize = 0;
    Object.entries(this.#matchCntInfo).forEach(([rankKey, count]) => {
      totalPrize += LOTTO_RANK[rankKey].money * count;
    });

    const totalInvestment = totalLottoCount * LOTTO_COST;

    if (totalInvestment === 0) return 0;

    const profitRate = (totalPrize / totalInvestment) * 100;
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
