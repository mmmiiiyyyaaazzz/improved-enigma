console.log('Hello from script.js!');

const currentMonthYearSpan = document.getElementById('currentMonthYear');
  const prevMonthButton = document.getElementById('prevMonth');
  const nextMonthButton = document.getElementById('nextMonth');
  const calendarBody = document.getElementById('calendarBody');
  const selectedDateDiv = document.getElementById('selectedDate');

  let currentDate = new Date(2025, 3);
  let selectedDate = null;

  function generateCalendar(year, month) {
    calendarBody.innerHTML = '';
    currentMonthYearSpan.textContent = `${year}年 ${month + 1}月`;

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)

    const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
    daysOfWeek.forEach(day => {
      const dayLabel = document.createElement('span');
      dayLabel.textContent = day;
      calendarBody.appendChild(dayLabel);
    });

    for (let i = 0; i < startingDay; i++) {
      const emptyCell = document.createElement('div');
      calendarBody.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayButton = document.createElement('button');
      dayButton.textContent = day;
      if (selectedDate && selectedDate.getFullYear() === year && selectedDate.getMonth() === month && selectedDate.getDate() === day) {
        dayButton.classList.add('selected');
      }
      dayButton.addEventListener('click', () => {
        selectedDate = new Date(year, month, day);
        selectedDateDiv.textContent = `選択された日付: ${selectedDate.getFullYear()}年 ${selectedDate.getMonth() + 1}月 ${selectedDate.getDate()}日`;
        generateCalendar(year, month); // 再描画して選択状態を更新
        // ここで選択された年月日をさらに処理する (フォームへの入力など)
      });
      calendarBody.appendChild(dayButton);
    }
  }

  function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
  }

  function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
  }

  prevMonthButton.addEventListener('click', prevMonth);
  nextMonthButton.addEventListener('click', nextMonth);

  // 初期カレンダーの生成
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth());