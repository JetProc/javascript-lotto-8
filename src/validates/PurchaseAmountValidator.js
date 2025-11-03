import Validator from './Validator.js';
import MoneyValidator from './MoneyValidator.js';

export default {
  validatePurchaseAmount(money) {
    Validator.isInputEmpty(money);
    Validator.isPositiveInteger(money);
    MoneyValidator.isValidUnit(money);
    MoneyValidator.tooLarge(money);
  },
};
