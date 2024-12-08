let subjects = [];
let editMode = {
    active: false,
    index: -1
};

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

function getFormData() {
    return {
        subject: document.getElementById('subject').value,
        credits: parseFloat(document.getElementById('credits').value),
        grades: {
            oep: parseFloat(document.getElementById('oep').value),
            eep: parseFloat(document.getElementById('eep').value),
            oes: parseFloat(document.getElementById('oes').value),
            ees: parseFloat(document.getElementById('ees').value),
            oef: parseFloat(document.getElementById('oef').value),
            eef: parseFloat(document.getElementById('eef').value)
        }
    };
}

function addOrUpdateSubject(event) {
    event.preventDefault();
    const formData = getFormData();
    const finalGrade = calculateFinalGrade(formData.grades);

    if (editMode.active) {
        subjects[editMode.index] = { ...formData, finalGrade };
    } else {
        subjects.push({ ...formData, finalGrade });
    }

    updateTable();
    calculatePPS();
    saveSubjects();
    resetForm();
}

function updateTable() {
    const tbody = document.querySelector('#gradeTable tbody');
    tbody.innerHTML = '';
    subjects.forEach((subject, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = subject.subject;
        row.insertCell(1).textContent = subject.credits;
        row.insertCell(2).textContent = subject.finalGrade.toFixed(2);
        
        const actionsCell = row.insertCell(3);
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'edit-btn';
        editButton.onclick = () => startEdit(index);
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => removeSubject(index);
        actionsCell.appendChild(deleteButton);
    });
}

function startEdit(index) {
    const subject = subjects[index];
    document.getElementById('subject').value = subject.subject;
    document.getElementById('credits').value = subject.credits;
    document.getElementById('oep').value = subject.grades.oep;
    document.getElementById('eep').value = subject.grades.eep;
    document.getElementById('oes').value = subject.grades.oes;
    document.getElementById('ees').value = subject.grades.ees;
    document.getElementById('oef').value = subject.grades.oef;
    document.getElementById('eef').value = subject.grades.eef;

    editMode.active = true;
    editMode.index = index;
    document.querySelector('button[type="submit"]').textContent = 'Actualizar Asignatura';
    document.getElementById('cancelEdit').classList.remove('hidden');
}

function cancelEdit() {
    resetForm();
}

function resetForm() {
    document.getElementById('gradeForm').reset();
    editMode.active = false;
    editMode.index = -1;
    document.querySelector('button[type="submit"]').textContent = 'Agregar Asignatura';
    document.getElementById('cancelEdit').classList.add('hidden');
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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('gradeForm').addEventListener('submit', addOrUpdateSubject);
    document.getElementById('cancelEdit').addEventListener('click', cancelEdit);
    loadSubjects();
});

