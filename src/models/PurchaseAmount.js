import PurchaseAmountValidator from '../validates/PurchaseAmountValidator.js';

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
    PurchaseAmountValidator.validatePurchaseAmount(money);
  }
}

export default PurchaseAmount;
