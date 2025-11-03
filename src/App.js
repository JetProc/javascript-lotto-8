import LottoGameController from './controllers/LottoGameController.js';
import OutputView from './views/OuputView.js';
class App {
  async run() {
    try {
      const lottoGameController = new LottoGameController();
      await lottoGameController.play();
    } catch (error) {
      OutputView.printMessage(error.message);
      throw error;
    }
  }
}

export default App;
