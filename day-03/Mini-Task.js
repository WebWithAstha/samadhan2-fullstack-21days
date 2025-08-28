function calculateResult(student) {
  let marks = Object.values(student.marks); // [85, 90, 78]

  // total
  let total = marks.reduce((acc, curr) => acc + curr, 0);

  // average
  let avg = total / marks.length;

  // grade
  let grade;
  if (avg >= 90) grade = "A";
  else if (avg >= 75) grade = "B";
  else if (avg >= 50) grade = "C";
  else grade = "Fail";

  return {
    name: student.name,
    total,
    average: avg,
    grade,
  };
}

// Example
let student = {
  name: "Devraj",
  marks: {
    math: 85,
    science: 90,
    english: 78,
  },
};

console.log(calculateResult(student));
