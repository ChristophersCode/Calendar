const calendarDates = document.getElementById('calendar-dates');
const monthYear = document.getElementById('month-year');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const noteSection = document.getElementById('note-section');
const noteInput = document.getElementById('note-input');
const saveNoteButton = document.getElementById('save-note');
const noteDisplay = document.getElementById('note-display');

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const letters = ["M", "P", "C", "A"];
let currentDate = new Date();
let selectedDateDiv = null;
let notes = {};

function renderCalendar() {
    calendarDates.innerHTML = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    monthYear.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarDates.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateDiv = document.createElement('div');
        const letterIndex = (day - 1) % letters.length;
        const presetValue = letters[letterIndex] + ' ' + letters[(letterIndex + 1) % letters.length];

        const dateSpan = document.createElement('span');
        dateSpan.className = 'date';
        dateSpan.textContent = day.toString().padStart(2, '0') + '.'; // Add period after numbers

        const presetSpan = document.createElement('span');
        presetSpan.className = 'preset-value';
        presetSpan.textContent = presetValue;

        dateDiv.appendChild(dateSpan);
        dateDiv.appendChild(presetSpan);
        calendarDates.appendChild(dateDiv);

        const dateKey = `${year}-${month}-${day}`;
        if (notes[dateKey]) {
            dateDiv.classList.add('note');
        }

        dateDiv.addEventListener('click', () => {
            if (selectedDateDiv) {
                selectedDateDiv.classList.remove('marked');
            }
            selectedDateDiv = dateDiv;
            selectedDateDiv.classList.add('marked');
            noteSection.style.display = 'block';
            noteDisplay.style.display = 'block';

            noteDisplay.innerHTML = notes[dateKey] ? notes[dateKey].map(note => `<p>${note}</p>`).join('') : '';
        });
    }
}

prevButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
    noteSection.style.display = 'none';
    noteDisplay.style.display = 'none';
});

nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
    noteSection.style.display = 'none';
    noteDisplay.style.display = 'none';
});

saveNoteButton.addEventListener('click', () => {
    const note = noteInput.value;
    if (selectedDateDiv && note.trim() !== '') {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const day = parseInt(selectedDateDiv.querySelector('.date').textContent.trim(), 10);
        const dateKey = `${year}-${month}-${day}`;

        if (!notes[dateKey]) {
            notes[dateKey] = [];
        }
        notes[dateKey].push(note);

        noteDisplay.innerHTML = notes[dateKey].map(note => `<p>${note}</p>`).join('');
        selectedDateDiv.classList.add('note');
        selectedDateDiv.classList.remove('marked'); // Ensure it's removed if it was marked
    }
    noteSection.style.display = 'none';
    noteInput.value = '';
});

renderCalendar();