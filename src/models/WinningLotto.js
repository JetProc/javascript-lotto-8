import { Validator, WinningLottoValidator } from '../validates/Validator.js';

class WinningLotto {
  #winningNumbers;

  constructor(mainNumbers, bonusNumber) {
    this.#validate(mainNumbers, bonusNumber);
    this.#winningNumbers = [...mainNumbers, bonusNumber];
  }

  #validate(mainNumbers, bonusNumber) {
    Validator.isInputEmpty(bonusNumber);
    Validator.isPositiveInteger(bonusNumber);
    Validator.isNumberInRange(bonusNumber);
    Validator.duplicatesNumber([...mainNumbers, bonusNumber]);
  }
}

export default WinningLotto;
