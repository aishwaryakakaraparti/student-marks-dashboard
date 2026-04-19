let students = [];

// Load data
window.onload = function () {
  let data = localStorage.getItem("students");
  if (data) {
    students = JSON.parse(data);
    if (document.getElementById("tableBody")) {
      displayStudents();
    }
  }
};

// Add student
function addStudent() {
  let name = document.getElementById("name").value;
  let marks = Number(document.getElementById("marks").value);

  if (name === "" || isNaN(marks)) {
    alert("Enter valid details");
    return;
  }

  students.push({ name, marks });
  localStorage.setItem("students", JSON.stringify(students));

  document.getElementById("name").value = "";
  document.getElementById("marks").value = "";

  alert("Student added!");
}

// Navigation
function goToDashboard() {
  window.location.href = "dashboard.html";
}

function goBack() {
  window.location.href = "index.html";
}

// Clear data
function clearData() {
  localStorage.removeItem("students");
  students = [];
  displayStudents();
  document.getElementById("time").innerHTML = "";
}

// Display
function displayStudents(arr = students) {
  let body = document.getElementById("tableBody");
  body.innerHTML = "";

  arr.forEach(s => {
    body.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.marks}</td>
      </tr>
    `;
  });
}

// Bubble Sort
function bubbleSort(arr, key) {
  let a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j][key] > a[j + 1][key]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return a;
}

// Merge Sort
function mergeSort(arr, key) {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid), key);
  let right = mergeSort(arr.slice(mid), key);

  return merge(left, right, key);
}

function merge(left, right, key) {
  let result = [];

  while (left.length && right.length) {
    if (left[0][key] < right[0][key]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  return [...result, ...left, ...right];
}

// Sort Marks (High → Low)
function sortMarks() {
  let start = performance.now();
  let bubble = bubbleSort(students, "marks");
  let bubbleTime = performance.now() - start;

  start = performance.now();
  let merge = mergeSort(students, "marks");
  let mergeTime = performance.now() - start;

  merge.reverse();

  displayStudents(merge);

  document.getElementById("time").innerHTML =
    `<b>Bubble Sort:</b> ${bubbleTime.toFixed(3)} ms 
     (Best: O(n), Avg/Worst: O(n²)) <br>
     <b>Merge Sort:</b> ${mergeTime.toFixed(3)} ms 
     (Best/Avg/Worst: O(n log n))`;
}

// Sort Names
function sortNames() {
  let start = performance.now();
  let bubble = bubbleSort(students, "name");
  let bubbleTime = performance.now() - start;

  start = performance.now();
  let merge = mergeSort(students, "name");
  let mergeTime = performance.now() - start;

  displayStudents(merge);

  document.getElementById("time").innerHTML =
    `<b>Bubble Sort:</b> ${bubbleTime.toFixed(3)} ms 
     (Best: O(n), Avg/Worst: O(n²)) <br>
     <b>Merge Sort:</b> ${mergeTime.toFixed(3)} ms 
     (Best/Avg/Worst: O(n log n))`;
}