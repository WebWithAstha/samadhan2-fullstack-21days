function findHighestMarks(marks) {
  let highest = marks[0]; // assume first element is highest
  
  for (let i = 1; i < marks.length; i++) {
    if (marks[i] > highest) {
      highest = marks[i];
    }
  }
  
  return highest;
}

let marksArray = [85, 92, 78, 96, 88];
console.log("Highest Marks:", findHighestMarks(marksArray));
