let subjects = [];

function loadSubjects() {
    const savedSubjects = localStorage.getItem('subjects');
    if (savedSubjects) {
        subjects = JSON.parse(savedSubjects);
        updateTable();
        calculatePPS();
    }
}

function saveSubjects() {
    localStorage.setItem('subjects', JSON.stringify(subjects));
}

function calculateFinalGrade(grades) {
    const weights = {
        oep: 0.135,
        eep: 0.165,
        oes: 0.135,
        ees: 0.165,
        oef: 0.14,
        eef: 0.26
    };

    return Object.keys(weights).reduce((sum, key) => {
        return sum + grades[key] * weights[key];
    }, 0);
}

function addSubject(event) {
    event.preventDefault();
    const subject = document.getElementById('subject').value;
    const credits = parseFloat(document.getElementById('credits').value);
    const grades = {
        oep: parseFloat(document.getElementById('oep').value),
        eep: parseFloat(document.getElementById('eep').value),
        oes: parseFloat(document.getElementById('oes').value),
        ees: parseFloat(document.getElementById('ees').value),
        oef: parseFloat(document.getElementById('oef').value),
        eef: parseFloat(document.getElementById('eef').value)
    };

    const finalGrade = calculateFinalGrade(grades);

    subjects.push({ subject, credits, finalGrade });
    updateTable();
    calculatePPS();
    saveSubjects();
    event.target.reset();
}

function updateTable() {
    const tbody = document.querySelector('#gradeTable tbody');
    tbody.innerHTML = '';
    subjects.forEach((subject, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = subject.subject;
        row.insertCell(1).textContent = subject.credits;
        row.insertCell(2).textContent = subject.finalGrade.toFixed(2);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => removeSubject(index);
        row.insertCell(3).appendChild(deleteButton);
    });
}

function removeSubject(index) {
    subjects.splice(index, 1);
    updateTable();
    calculatePPS();
    saveSubjects();
}

function calculatePPS() {
    const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
    const weightedSum = subjects.reduce((sum, subject) => sum + subject.finalGrade * subject.credits, 0);
    const pps = totalCredits > 0 ? weightedSum / totalCredits : 0;
    document.getElementById('pps').textContent = `Promedio Ponderado Semestral (PPS): ${pps.toFixed(2)}`;
}

document.getElementById('gradeForm').addEventListener('submit', addSubject);
loadSubjects();
