# javascript-lotto-precourse

# 🔆 프로젝트 큰 흐름

1. `InputView`를 통해 로또 구입 금액 문자열을 입력 받는다.
   1. `PurchaseAmount` 모델을 생성하며 `PurchaseAmountValidator`를 통해 유효성 검사를 실행한다.
   2. 유효성 검사에 실패하면 `[ERROR]` 메시지를 출력하고 해당 지점부터 다시 입력을 받는다.
2. `LottoStore` 모델을 통해 `PurchaseAmount`만큼 로또(`Lotto` 인스턴스)를 구매한다.
   1. `Random.pickUniqueNumbersInRange`를 사용해 로또 번호를 생성한다.
3. `OutputView`를 통해 구매한 로또 개수와 번호 목록을 출력한다.
4. `InputView`를 통해 당첨 번호 문자열을 입력 받는다.
   1. `WinningLottoValidator`로 문자열 포맷(쉼표, 공백 등)을 검사한다.
   2. `Lotto` 모델을 생성하며 `LottoValidator`로 6개의 번호에 대한 유효성(개수, 중복, 범위)을 검사한다.
   3. 유효성 검사에 실패하면 `[ERROR]` 메시지를 출력하고 다시 입력을 받는다.
5. `InputView`를 통해 보너스 번호 문자열을 입력 받는다.
   1. `WinningLotto` 모델을 생성하며 `WinningLottoValidator`로 보너스 번호의 유효성(범위, 당첨 번호와 중복 여부)을 검사한다.
   2. 유효성 검사에 실패하면 `[ERROR]` 메시지를 출력하고 다시 입력을 받는다.
6. `LottoResult` 모델을 생성자에 구매한 로또 배열과 `WinningLotto`를 전달하여 생성한다.
   1. `LottoResult`는 내부적으로 모든 로또를 `WinningLotto`와 비교하여 당첨 통계를 계산한다.
   2. 당첨 통계를 바탕으로 총 수익률을 계산한다.
7. `OutputView`를 통해 당첨 통계 헤더 문구를 출력한다.
8. `OutputView`를 통해 등수별 당첨 개수와 수익률을 포맷에 맞게 출력한다.

# 📁 프로젝트 구조

```src
├── App.js                  # 애플리케이션 실행 로직 (run)
├── index.js                # App 인스턴스 생성 및 실행
│
├── controllers/
│ └── LottoGameController.js  # Controller (메인 로직, 입출력 흐름 제어)
│
├── constants/              # Constants (상수 관리)
│ ├── config.js             ## 로또 가격, 번호 범위, 당첨 랭킹 등
│ └── messages.js           ## 입출력 및 에러 메시지
│
├── domain/                 # Model (핵심 로직 및 데이터 관리)
│ ├── PurchaseAmount.js     ## 구입 금액 (1000원 단위 검증, 로또 개수 계산)
│ ├── Lotto.js              ## 로또 1장 (번호 6개, 유효성 검증)
│ ├── WinningLotto.js       ## 당첨 번호 (메인 6 + 보너스 1, 보너스 번호 검증)
│ ├── LottoStore.js         ## 로또 생성 및 발급 (랜덤 번호 생성)
│ └── LottoResult.js        ## 당첨 통계 및 수익률 계산
│
├── utils/                  # Utilities (보조 도구)
│ └── Utils.js              ## 문자열 분리, 숫자 포매팅
│
├── validate/               # Validator (유효성 검증 로직)
│ ├── Validator.js          ## 공통 검증 (빈 값, 양의 정수, 숫자 범위, 중복)
│ ├── MoneyValidator.js     ## 금액 관련 검증 (1000원 단위, 최대 크기)
│ ├── PurchaseAmountValidator.js ## 구입 금액 검증 조합
│ ├── LottoValidator.js     ## 로또 번호 6개 배열 검증 (개수, 중복, 범위)
│ └── WinningLottoValidator.js ## 당첨/보너스 번호 검증 (문자열 포맷, 중복)
│
├── view/                   # View (입출력 담당)
│ ├── InputView.js          ## 사용자 입력 (readLineAsync)
│ └── OuputView.js          ## 결과 출력 (print)
│
__tests__/                  # Test
  ├── ApplicationTest.js    ## 기능 테스트 (통합)
  ├── LottoTest.js          ## Lotto 클래스 단위 테스트
  ├── PurchaseAmountTest.js ## PurchaseAmount 클래스 단위 테스트
  ├── WinningLottoTest.js   ## WinningLotto 클래스 단위 테스트
```

# ✅ 구현할 기능 목록

### [공통]

- [x] `App.js`의 `run()` 메서드를 구현하여 프로그램 전체 흐름 제어
- [x] `LottoGameController.js`의 `play()` 메서드에서 메인 로직 흐름 관리
- [x] `constants` 폴더에 모든 입력/출력/에러 메시지와 설정을 정의
- [x] 유효성 검사 실패 시 `[ERROR]`가 포함된 메시지를 출력하고 해당 입력부터 다시 받도록 구현

### [View]

- [x] `InputView`: 구입 금액을 입력 받는 기능 구현
- [x] `InputView`: 당첨 번호를 입력 받는 기능 구현
- [x] `InputView`: 보너스 번호를 입력 받는 기능 구현
- [x] `OutputView`: 구매한 로또 개수와 번호 목록을 출력하는 기능 구현
- [x] `OutputView`: 당첨 통계 헤더("당첨 통계\n---")를 출력하는 기능 구현
- [x] `OutputView`: 각 등수별 당첨 결과를 포맷에 맞게 출력하는 기능 구현
- [x] `OutputView`: 총 수익률을 소수점 둘째 자리에서 반올림하여 출력하는 기능 구현

### [Validator]

- [x] `Validator`: 입력값이 비어있지 않은지 검증
- [x] `Validator`: 값이 양의 정수인지 검증
- [x] `Validator`: 값이 1~45 사이의 숫자인지 검증
- [x] `Validator`: 배열 내 중복된 숫자가 있는지 검증
- [x] `MoneyValidator`: 구입 금액이 1,000원 단위인지 검증
- [x] `MoneyValidator`: 구입 금액이 `Number.MAX_SAFE_INTEGER`를 넘지 않는지 검증
- [x] `WinningLottoValidator`: 당첨 번호 문자열에 구분자(`,`)가 포함되어 있는지 검증
- [x] `WinningLottoValidator`: 당첨 번호 문자열이 구분자(`,`)로 시작하거나 끝나지 않는지 검증
- [x] `LottoValidator`: 로또 번호가 6개인지 검증
- [x] `WinningLottoValidator`: 보너스 번호가 당첨 번호 6개와 중복되지 않는지 검증

### [Model]

- [x] **PurchaseAmount class**: 구입 금액을 관리
- [x] **Lotto class**: 로또 1장의 정보를 가짐 (번호 6개)
  - [x] `property`: `#numbers` (오름차순 정렬)
  - [x] `method`: `getNumbers()`
- [x] **WinningLotto class**: 당첨 번호와 보너스 번호를 가짐
  - [x] `method`: `compare(lottoNumbers)` (로또 1장과 비교하여 {일치 개수, 보너스 일치 여부} 반환)
- [x] **LottoStore class**: 로또를 발급
  - [x] `method`: `buyLottos(purchaseAmount)` (구입 금액만큼 로또 생성)
- [x] **LottoResult class**: 당첨 결과를 계산하고 통계를 가짐
  - [x] `method`: `#calculateStats(...)` (모든 로또의 당첨 등수 계산)
  - [x] `method`: `#calculateProfit(...)` (총 투자 대비 수익률 계산)
  - [x] `method`: `getMatchCntInfo()`, `getProfitRate()`

### [Utils]

- [x] `Utils.js`: `splitBySeparator` (문자열을 구분자로 나누어 배열 반환)
- [x] `Utils.js`: `formatNumber` (숫자를 1,000 단위 쉼표가 있는 문자열로 변환)
- [x] `@woowacourse/mission-utils`: `Random.pickUniqueNumbersInRange`를 사용해 랜덤 번호 생성
- [x] `@woowacourse/mission-utils`: `Console.readLineAsync`와 `Console.print`로 입출력 처리

# ‼️ 예외 처리 고려 사항

### 0. 공통

- 값이 비어있지 않은지 검증
  - [x] 값이 비어있다면 ERROR
- 값이 올바른 양의 정수 숫자 형식인지 검증
  - [x] 값이 양의 정수가 아니라면 ERROR
- 값이 올바른 로또 번호 형식인지 검증
  - [x] 값이 1부터 45 사이가 아니라면 ERROR
  - [x] 기존 로또 번호와 중복이라면 ERROR

### 1. 로또 구입 금액 (money)

- [x] [공통] 값이 비어있지 않은지 검증
- [x] [공통] 값이 올바른 양의 정수 숫자 형식인지 검증
- [x] 값이 1000으로 나눠떨어지지 않는다면 ERROR
- [x] 값이 너무 크다면 ERROR

### 2. 당첨 번호 문자열 (winningNumberString)

- [x] [공통] 값이 비어있지 않은지 검증
- [x] 문자열에 구분자가 없다면 ERROR
- [x] 문자열이 구분자로 시작하거나 구분자로 끝나면 ERROR

### 3. 당첨 번호 배열 (winningNumbers)

- 배열의 각 값에 대해서
  - [x] [공통] 값이 비어있지 않은지 검증
  - [x] [공통] 값이 올바른 양의 정수 숫자 형식인지 검증
  - [x] [공통] 값이 올바른 로또 번호 형식인지 검증
- [x] 배열의 길이가 6이 아니라면 ERROR

### 4. 보너스 번호 (bonusNumber)

- [x] [공통] 값이 비어있지 않은지 검증
- [x] [공통] 값이 올바른 양의 정수 숫자 형식인지 검증
- [x] [공통] 값이 올바른 로또 번호 형식인지 검증
