// ===== 화면 DOM =====
const homeScreen = document.getElementById("home-screen");
const routineScreen = document.getElementById("routine-screen");
const addRoutineScreen = document.getElementById("add-routine-screen");
const routineDetailScreen = document.getElementById("routine-detail-screen");

// ===== 버튼 DOM =====
const routinePanel = document.getElementById("routine-panel");
const logPanel = document.getElementById("log-panel");
const backFromRoutine = document.getElementById("back-from-routine");
const goAddRoutine = document.getElementById("go-add-routine");
const backFromAdd = document.getElementById("back-from-add");
const backFromDetail = document.getElementById("back-from-detail");

// ===== 루틴추가창 입력 DOM =====
const routineTitleInput = document.getElementById("routine-title-input");
const routineSaveBtn = document.getElementById("routine-save-btn");

// 기본 첫 행 입력
const speedInput = document.getElementById("speed-input");
const timeInput = document.getElementById("time-input");

// 속도·시간 관련 DOM
const speedTimeList = document.getElementById("speed-time-list");
const addSpeedTimeBtn = document.getElementById("add-speed-time-btn");

// 운동량 패널 DOM
const exerciseSummaryValue = document.getElementById("exercise-summary-value");
const checkSummaryBtn = document.getElementById("check-summary-btn");

// 루틴리스트 / 상세 DOM
const routineList = document.getElementById("routine-list");
const detailTitle = document.getElementById("detail-title");

// 초기화 버튼
const resetRoutineBtn = document.getElementById("reset-routine-btn");

// ===== 화면 전환 =====
// 메인창 → 운동루틴창
routinePanel.addEventListener("click", () => {
  homeScreen.classList.add("hidden");
  routineScreen.classList.remove("hidden");
});

// 운동루틴창 → 메인창
backFromRoutine.addEventListener("click", () => {
  routineScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");
});

// 운동루틴창 → 루틴추가창
goAddRoutine.addEventListener("click", () => {
  routineScreen.classList.add("hidden");
  addRoutineScreen.classList.remove("hidden");
});

// 루틴추가창 → 운동루틴창
backFromAdd.addEventListener("click", () => {
  addRoutineScreen.classList.add("hidden");
  routineScreen.classList.remove("hidden");
});

// 루틴상세창 → 운동루틴창
backFromDetail.addEventListener("click", () => {
  routineDetailScreen.classList.add("hidden");
  routineScreen.classList.remove("hidden");
});

// 운동측정은 일단 안내만
logPanel.addEventListener("click", () => {
  alert("여기는 나중에 '운동측정' 창으로 연결할 예정입니다!");
});

// ===== 속도·시간 행 동적 추가/삭제 =====
function createSpeedTimeRow() {
  const row = document.createElement("div");
  row.className = "speed-time-row";

  const speed = document.createElement("input");
  speed.type = "number";
  speed.className = "panel-input center speed-input";
  speed.placeholder = "속도(km/h)";

  const divider = document.createElement("span");
  divider.className = "divider";
  divider.textContent = ":";

  const time = document.createElement("input");
  time.type = "number";
  time.className = "panel-input center time-input";
  time.placeholder = "시간(분)";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "circle-btn remove-segment-btn";
  removeBtn.textContent = "×";

  removeBtn.addEventListener("click", () => {
    speedTimeList.removeChild(row);
  });

  row.appendChild(speed);
  row.appendChild(divider);
  row.appendChild(time);
  row.appendChild(removeBtn);

  return row;
}

// + 버튼 → 새 행 추가
addSpeedTimeBtn.addEventListener("click", () => {
  const newRow = createSpeedTimeRow();
  speedTimeList.appendChild(newRow);
});

// ===== 운동량 계산 함수 =====
// 속도: km/h, 시간: 분
function calculateExerciseSummary() {
  const rows = speedTimeList.querySelectorAll(".speed-time-row");

  let totalMinutes = 0;
  let totalDistanceKm = 0;

  rows.forEach((row) => {
    const speedEl = row.querySelector(".speed-input");
    const timeEl = row.querySelector(".time-input");

    const s = parseFloat(speedEl.value);
    const t = parseFloat(timeEl.value);

    if (!isNaN(s) && !isNaN(t) && s > 0 && t > 0) {
      totalMinutes += t;
      totalDistanceKm += s * (t / 60);
    }
  });

  if (totalMinutes === 0 || totalDistanceKm === 0) {
    exerciseSummaryValue.textContent = "⚠ 유효한 속도·시간 입력 없음";
    return { ok: false, minutes: 0, km: 0 };
  }

  const roundedMinutes = Math.round(totalMinutes);
  const roundedKm = Math.round(totalDistanceKm * 100) / 100;

  exerciseSummaryValue.textContent =
    `총 운동 시간: ${roundedMinutes}분 · 총 거리: ${roundedKm}km`;

  return { ok: true, minutes: roundedMinutes, km: roundedKm };
}

// 체크 버튼 → 운동량 계산
checkSummaryBtn.addEventListener("click", () => {
  calculateExerciseSummary();
});

// ===== 엔터로도 저장되게 =====
[routineTitleInput, speedInput, timeInput].forEach((el) => {
  el.addEventListener("keypress", (e) => {
    if (e.key === "Enter") routineSaveBtn.click();
  });
});

// ===== 저장 버튼 → 운동량 계산 + 운동루틴창 리스트 추가 =====
routineSaveBtn.addEventListener("click", () => {
  const title = routineTitleInput.value.trim();
  if (!title) {
    alert("루틴 제목을 입력해 주세요!");
    return;
  }

  // 저장 시에도 한번 계산 (체크 안 눌렀어도 계산됨)
  const result = calculateExerciseSummary();
  if (!result.ok) {
    alert("속도와 시간을 올바르게 입력해 주세요!");
    return;
  }

  // 운동루틴창에 들어갈 패널 생성
  const routineItem = document.createElement("div");
  routineItem.className = "routine-item";
  routineItem.innerHTML = `
    <div class="routine-item-title">${title}</div>
    <div class="routine-item-summary">${exerciseSummaryValue.textContent}</div>
  `;

  // 카드 클릭 → 상세창으로 이동 + 제목 표시
  routineItem.addEventListener("click", () => {
    detailTitle.textContent = title;
    routineScreen.classList.add("hidden");
    routineDetailScreen.classList.remove("hidden");
  });

  routineList.appendChild(routineItem);

  // 입력창 초기화 (기본 행만 남겨두고 값만 비움)
  routineTitleInput.value = "";
  const rows = speedTimeList.querySelectorAll(".speed-time-row");
  rows.forEach((row, index) => {
    if (index === 0) {
      row.querySelector(".speed-input").value = "";
      row.querySelector(".time-input").value = "";
    } else {
      row.remove();
    }
  });
  exerciseSummaryValue.textContent = "운동량 계산되지 않음";

  // 루틴추가창 → 운동루틴창 이동
  addRoutineScreen.classList.add("hidden");
  routineScreen.classList.remove("hidden");
});

// ===== 초기화 버튼 =====
resetRoutineBtn.addEventListener("click", () => {
  routineTitleInput.value = "";

  const rows = speedTimeList.querySelectorAll(".speed-time-row");
  rows.forEach((row, index) => {
    if (index === 0) {
      row.querySelector(".speed-input").value = "";
      row.querySelector(".time-input").value = "";
    } else {
      row.remove();
    }
  });

  exerciseSummaryValue.textContent = "운동량 계산되지 않음";
});
