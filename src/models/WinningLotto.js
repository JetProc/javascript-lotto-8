import WinningLottoValidator from '../validates/WinningLottoValidator.js';

class WinningLotto {
  #mainNumbers;
  #bonusNumber;

  constructor(mainNumbers, bonusNumber) {
    this.#validate(mainNumbers, bonusNumber);
    this.#mainNumbers = mainNumbers;
    this.#bonusNumber = Number(bonusNumber);
  }

  compare(lottoNumbers) {
    const winningNumbers = this.#mainNumbers;
    const matchCount = winningNumbers.filter((number) => lottoNumbers.includes(number)).length;
    const hasBonus = lottoNumbers.includes(this.#bonusNumber);

    return {
      matchCount,
      hasBonus,
    };
  }

  #validate(mainNumbers, bonusNumber) {
    WinningLottoValidator.validateBonusNumber(mainNumbers, bonusNumber);
  }
}

export default WinningLotto;
