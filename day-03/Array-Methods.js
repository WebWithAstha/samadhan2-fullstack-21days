// Array of numbers
let numbers = [1, 2, 3, 4];
// Create a new array with squares of each number
let squares = numbers.map((num) => num * num);
console.log(squares); // [1, 4, 9, 16]

// Array of marks
let marks1 = [45, 76, 90, 32, 88];
// Filter marks greater than or equal to 50 (passed)
let passed = marks1.filter((m) => m >= 50);
console.log(passed); // [76, 90, 88]

// Another array of marks
let marks2 = [50, 70, 80];
// Calculate the total of marks using reduce
let total = marks2.reduce((acc, curr) => acc + curr, 0);
console.log(total); // 200

// Student object with nested marks object
let student = {
  name: "Devraj",
  age: 20,
  marks: {
    math: 85,
    science: 90,
    english: 78,
  },
};

// Accessing properties of the student object
console.log(student.name); // Devraj
console.log(student.marks.math); // 85
