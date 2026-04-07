
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <title>운동 기록</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
  <script src="ass.js"></script>
</head>
<body>
  <div class="app">

    <!-- 🏠 메인창 -->
    <div class="screen" id="home-screen">
      <div class="app-title">운동 기록</div>
      <div class="app-subtitle">헬스장에서 바로 기록하는 간단 웹</div>

      <div class="panel-wrapper">
        <!-- 운동루틴 패널 -->
        <div class="panel" id="routine-panel">
          <div class="panel-main">
            <div class="panel-title">운동루틴</div>
            <div class="panel-desc">내가 자주 하는 루틴을 미리 저장해두기</div>
          </div>
          <div class="panel-icon">📋</div>
        </div>

        <!-- 운동측정 패널 (아직 껍데기) -->
        <div class="panel" id="log-panel">
          <div class="panel-main">
            <div class="panel-title">운동측정</div>
            <div class="panel-desc">오늘 세트·무게·횟수 빠르게 기록하기</div>
          </div>
          <div class="panel-icon">✅</div>
        </div>
      </div>
    </div>

    <!-- 📝 운동루틴창 -->
    <div class="screen hidden" id="routine-screen">
      <div class="top-bar">
  <button class="back-button" id="back-from-routine">←</button>
  <div class="top-title">운동루틴</div>
  <button class="edit-button" id="edit-routine-btn">편집</button>
  <button class="add-button" id="go-add-routine">＋</button>
</div>
      <div class="routine-body card">
        <p class="routine-placeholder">
          자주 사용하는 루틴을 관리하는 화면입니다.<br />
          새로운 루틴을 추가하려면 오른쪽 위 ＋ 버튼을 눌러 주세요.
        </p>
      </div>

      <!-- 저장된 루틴 카드들이 쌓일 곳 -->
      <div id="routine-list"></div>
    </div>

    <!-- ➕ 루틴추가창 -->
    <div class="screen hidden" id="add-routine-screen">
      <div class="top-bar">
        <button class="back-button" id="back-from-add">←</button>
        <div class="top-title">루틴추가</div>
        <button class="reset-button" id="reset-routine-btn">⟲</button>
      </div>

      <!-- 루틴추가창: 바깥은 투명, 안의 각 패널이 카드 -->
      <div class="routine-body clear">
        <!-- 제목 패널 -->
        <div class="panel-box">
          <label class="panel-label">루틴 제목</label>
          <input
            type="text"
            id="routine-title-input"
            class="panel-input"
            placeholder="예: 빡센 루틴 / 일상 루틴"
          />
        </div>

        <!-- 속도 · 시간 패널 -->
        <div class="panel-box">
          <label class="panel-label">속도 · 시간(분)</label>
          <div class="unit-hint">속도는 km/h, 시간은 분 단위로 입력해 주세요.</div>

          <!-- 여러 속도·시간 행이 들어갈 컨테이너 -->
          <div id="speed-time-list">
            <!-- 기본 1행 -->
            <div class="speed-time-row">
              <input
                type="number"
                id="speed-input"
                class="panel-input center speed-input"
                placeholder="속도(km/h)"
              />
              <span class="divider">:</span>
              <input
                type="number"
                id="time-input"
                class="panel-input center time-input"
                placeholder="시간(분)"
              />
              <!-- 추가 버튼 (첫 행에만 존재) -->
              <button
                type="button"
                class="circle-btn add-segment-btn"
                id="add-speed-time-btn"
              >
                ＋
              </button>
            </div>
          </div>
        </div>

        <!-- 저장 버튼 -->
        <button class="save-btn" id="routine-save-btn">저장</button>

        <!-- 운동량 패널 -->
        <div class="panel-box" id="exercise-summary-box">
          <label class="panel-label">운동량</label>
          <div class="exercise-summary-row">
            <div class="exercise-summary-value" id="exercise-summary-value">
              운동량 계산되지 않음
            </div>
            <button class="circle-btn" id="check-summary-btn">✓</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 📄 루틴상세창 -->
    <div class="screen hidden" id="routine-detail-screen">
      <div class="top-bar">
        <button class="back-button" id="back-from-detail">←</button>
        <div class="top-title" id="detail-title">루틴 상세</div>
      </div>

      <div class="routine-body card">
        <p class="routine-placeholder">
          여기에는 나중에 이 루틴의 세부 정보(구간별 속도·시간 등)를 표시할 거야.<br />
          지금은 제목만 위에 보여주는 상태!
        </p>
      </div>
    </div>

  </div>

</body>
</html>
