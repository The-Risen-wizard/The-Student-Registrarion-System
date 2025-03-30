function loadStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.forEach(addStudentToTable);
}

function addStudentToTable(student) {
    let infoTable = document.getElementById("studentBody");
    let addRow = document.createElement("tr");

    addRow.insertCell(0).innerText = student.name;
    addRow.insertCell(1).innerText = student.id;
    addRow.insertCell(2).innerText = student.studentClass;
    addRow.insertCell(3).innerText = student.roll;

    let deleteCell = addRow.insertCell(4);
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("bg-red-500", "text-white", "px-3", "py-1", "rounded-md", "hover:bg-red-700", "transition", "duration-300");

    deleteButton.addEventListener("click", function() {
        addRow.remove();
        removeStudent(student.id);
    });

    deleteCell.appendChild(deleteButton);
    infoTable.appendChild(addRow);
}

function removeStudent(studentId) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students = students.filter(student => student.id !== studentId);
    localStorage.setItem("students", JSON.stringify(students));
}

document.getElementById("Student").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let id = document.getElementById("id").value;
    let studentClass = document.getElementById("class").value;
    let roll = document.getElementById("roll").value;

    if (name === "" || id === "" || studentClass === "" || roll === "") {
        alert("Please do not leave any fields empty!!");
        return;
    }

    let newStudent = { name, id, studentClass, roll };


    addStudentToTable(newStudent);

    // Here, we are saving our student data in the local storage.
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(newStudent);
    localStorage.setItem("students", JSON.stringify(students));

    // Here, we are clearing the input fields.
    document.getElementById("name").value = "";
    document.getElementById("id").value = "";
    document.getElementById("class").value = "";
    document.getElementById("roll").value = "";
});

loadStudents();