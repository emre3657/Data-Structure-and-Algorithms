// This file is about Time  Complexity - Speed of Code - Run Time

// BIG O firstly care about the worst case. --> Rule 1

const nemo = ["nemo"];
const everyone = [
  "dory",
  "bruce",
  "marlin",
  "gill",
  "bloat",
  "nigel",
  "squirt",
  "darla",
  "hank",
  "nemo",
];

const large = new Array(100).fill("nemo");

function findNemo(array) {
  for (let i = 0; i < array.length; i++) {
    console.log("running");
    if (array[i] === "nemo") {
      console.log("Found NEMO!");
      break;
    }
  }
}

// findNemo(everyone); // O(n) --> Linear Time

const boxes = new Array(10).fill("box", 0, 5);
function compressFirstBox(boxes) {
  console.log(boxes[0]);
}

// compressFirstBox(boxes); // O(1) --> Constant Time - Flat Time

// BIG O Exercise - 1
function funChallenge(input) {
  let a = 10; // O(1)
  a = 50 + 3; // O(1)

  for (let i = 0; i < input.length; i++) {
    // O(n)
    anotherFunction(); // O(n)
    let stranger = true; // O(n)
    a++; // O(n)
  }
  return a; // O(1)
}

// 3*O(1) + 4*O(n) = 3 + 4n --> O(n) --> Rule 2 - Remove constants
// funChallenge(new Array(10).fill(1));

function anotherFunction() {
  return;
}

// BIG O Exercise - 2
function anotherFunChallenge(input) {
  let a = 5; // O(1)
  let b = 10; // O(1)
  let c = 50; // O(1)
  for (let i = 0; i < input; i++) {
    // O(n)
    let x = i + 1; // O(n)
    let y = i + 2; // O(n)
    let z = i + 3; // O(n)
  }
  for (let j = 0; j < input; j++) {
    // O(n)
    let p = j * 1; // O(n)
    let q = j * 2; // O(n)
  }
  let whoIAm = "I do not know"; // O(1)
}

// 4*O(1) + 7*O(n) = 4 + 7n --> O(n)
// anotherFunChallenge(50);

// There is a trick in this function. Rule 3
function fun(boxes1, boxes2) {
  boxes1.forEach((box) => console.log("box"));
  boxes2.forEach((box) => console.log("box"));
}
// BIG O --> O(n) --> False. Because n is not enough for definition of the 2 different inputs.
// BIG O --> O(a + b) --> True. Because 2 inputs are independent of each other. This representation makes more sense.

// Log all pairs of array
const matris = ["a", "b", "c", "d", "f"];

function logMatris(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      console.log(array[i], array[j]);
    }
  }
}

logMatris(matris); // BIG O(n * n) = O(n^2)

function printNumbersAndPairSums(numbers) {
  console.log("these are numbers:");
  numbers.forEach((number) => console.log(number));

  console.log("and these are their sums");
  numbers.forEach((firstNumber) => {
    numbers.forEach((secondNumber) => {
      console.log(firstNumber + secondNumber);
    });
  });
}

// O(n + n^2) --> O(n^2) --> Keep dominant term
// printNumbersAndPairSums([1, 2, 3, 4, 5]);

// O(n!) --> Adds a nested loop for each element in the array.
