import LottoValidator from '../validates/LottoValidator.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.map(Number).sort((a, b) => a - b);
  }
  #validate(numbers) {
    LottoValidator.validateLottoNumbers(numbers);
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
