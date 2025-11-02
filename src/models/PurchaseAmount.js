import { Validator, MoneyValidator } from '../validates/Validator.js';

class PurchaseAmount {
  #money;

  constructor(moneyInput) {
    this.#validate(moneyInput);
    this.#money = moneyInput;
  }

  calculateLottoCount() {
    const money = Number(this.#money);
    return money / 1000;
  }

  #validate(money) {
    Validator.isInputEmpty(money);
    Validator.isPositiveInteger(money);
    MoneyValidator.isValidUnit(money);
    MoneyValidator.tooLarge(money);
  }
}

export default PurchaseAmount;
