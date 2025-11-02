import LottoGameController from './controllers/LottoGameController.js';

class App {
  async run() {
    const lottoGameController = new LottoGameController();
    lottoGameController.play();
  }
}

export default App;
