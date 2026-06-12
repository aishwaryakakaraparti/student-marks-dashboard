let students = [];

// Load Data
window.onload = function () {

    let data = localStorage.getItem("students");

    if (data) {
        students = JSON.parse(data);

        if (document.getElementById("tableBody")) {
            displayStudents();
        }
    }
};

// Add Student
function addStudent() {

    let name =
        document.getElementById("name").value;

    let marks =
        Number(document.getElementById("marks").value);

    if (name === "" || isNaN(marks)) {
        alert("Enter Valid Details");
        return;
    }

    students.push({
        name,
        marks
    });

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    document.getElementById("name").value = "";
    document.getElementById("marks").value = "";

    alert("Student Added!");
}

// Navigation
function goToDashboard() {
    window.location.href = "dashboard.html";
}

function goBack() {
    window.location.href = "index.html";
}

// Display
function displayStudents(arr = students) {

    let body =
        document.getElementById("tableBody");

    body.innerHTML = "";

    arr.forEach(student => {

        body.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.marks}</td>
        </tr>
        `;
    });
}

// Clear Data
function clearData() {

    localStorage.removeItem("students");

    students = [];

    displayStudents();

    document.getElementById("time").innerHTML = "";
    document.getElementById("result").innerHTML = "";
}

// Bubble Sort
function bubbleSort(arr, key) {

    let a = [...arr];

    for (let i = 0; i < a.length; i++) {

        for (let j = 0; j < a.length - i - 1; j++) {

            if (a[j][key] > a[j + 1][key]) {

                [a[j], a[j + 1]] =
                [a[j + 1], a[j]];
            }
        }
    }

    return a;
}

// Merge Sort
function mergeSort(arr, key) {

    if (arr.length <= 1) {
        return arr;
    }

    let mid = Math.floor(arr.length / 2);

    let left =
        mergeSort(arr.slice(0, mid), key);

    let right =
        mergeSort(arr.slice(mid), key);

    return merge(left, right, key);
}

function merge(left, right, key) {

    let result = [];

    while (left.length && right.length) {

        if (left[0][key] < right[0][key]) {
            result.push(left.shift());
        }
        else {
            result.push(right.shift());
        }
    }

    return [...result, ...left, ...right];
}

// Sort Marks
function sortMarks() {

    let start = performance.now();

    bubbleSort(students, "marks");

    let bubbleTime =
        performance.now() - start;

    start = performance.now();

    let merge =
        mergeSort(students, "marks");

    let mergeTime =
        performance.now() - start;

    merge.reverse();

    displayStudents(merge);

    document.getElementById("time").innerHTML =
        `Bubble Sort: ${bubbleTime.toFixed(3)} ms <br>
         Merge Sort: ${mergeTime.toFixed(3)} ms`;
}

// Sort Names
function sortNames() {

    let start = performance.now();

    bubbleSort(students, "name");

    let bubbleTime =
        performance.now() - start;

    start = performance.now();

    let merge =
        mergeSort(students, "name");

    let mergeTime =
        performance.now() - start;

    displayStudents(merge);

    document.getElementById("time").innerHTML =
        `Bubble Sort: ${bubbleTime.toFixed(3)} ms <br>
         Merge Sort: ${mergeTime.toFixed(3)} ms`;
}

// Linear Search
function linearSearch() {

    let key =
        document.getElementById("searchName")
        .value
        .toLowerCase();

    let found =
        students.find(
            s => s.name.toLowerCase() === key
        );

    if (found) {

        document.getElementById("result").innerHTML =
            `Found: ${found.name} - ${found.marks}`;
    }
    else {

        document.getElementById("result").innerHTML =
            "Student Not Found";
    }
}

// Binary Search
function binarySearchStudent() {

    let key =
        document.getElementById("searchName")
        .value
        .toLowerCase();

    let sorted =
        [...students].sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );

    let low = 0;
    let high = sorted.length - 1;

    while (low <= high) {

        let mid =
            Math.floor((low + high) / 2);

        let current =
            sorted[mid].name.toLowerCase();

        if (current === key) {

            document.getElementById("result").innerHTML =
                `Found: ${sorted[mid].name} - ${sorted[mid].marks}`;

            return;
        }

        else if (current < key) {
            low = mid + 1;
        }

        else {
            high = mid - 1;
        }
    }

    document.getElementById("result").innerHTML =
        "Student Not Found";
}

// DFS
function runDFS() {

    const graph = {
        A: ["B", "C"],
        B: ["D", "E"],
        C: ["F", "G"],
        D: [],
        E: [],
        F: [],
        G: []
    };

    let visited = [];

    function dfs(node) {

        visited.push(node);

        graph[node].forEach(
            neighbour => dfs(neighbour)
        );
    }

    dfs("A");

    document.getElementById("result").innerHTML =
        "DFS Traversal : " +
        visited.join(" ➜ ");
}

// BFS
function runBFS() {

    const graph = {
        A: ["B", "C"],
        B: ["D", "E"],
        C: ["F", "G"],
        D: [],
        E: [],
        F: [],
        G: []
    };

    let queue = ["A"];

    let visited = [];

    while (queue.length > 0) {

        let node = queue.shift();

        visited.push(node);

        graph[node].forEach(
            neighbour => queue.push(neighbour)
        );
    }

    document.getElementById("result").innerHTML =
        "BFS Traversal : " +
        visited.join(" ➜ ");
}
