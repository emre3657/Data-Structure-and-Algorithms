// Recursive Functions
let counter = 0;
function inception() {
  // base case
  if (counter > 3) return "done";
  console.log(counter);
  counter++;

  // call the function again.
  return inception();
}

// inception();

// Usually have 2 return statements
// 1. Identify the base case --> First return
// 2. Identify the recursive case --> Second return

// Recursive Factorial
function factorial(value) {
  if (value < 0) return "Invalid parameter!";
  if (value === 1 || value === 0) return 1;
  return value * factorial(value - 1);
}
// console.log(factorial(100)); // Time Complexity: BIG O(n)

// While Loop Factorial
function factorialLoop(value) {
  if (value < 0) return "Invalid parameter!";
  if (value === 0) return 1;
  let result = 1;
  while (value !== 1) {
    result *= value;
    value--;
  }
  return result;
}
// console.log(factorialLoop(100)); // Time Complexity: BIG O(n)

// Recursive fibonacci
function fibonacci(numberTh) {
  if (numberTh < 0) return "Invalid parameter!";
  if (numberTh === 0) return 0;
  if (numberTh === 1) return 1;
  return fibonacci(numberTh - 1) + fibonacci(numberTh - 2);
}
// console.log(fibonacci(8)); // Time Complexity: BIG O(2^n) which is so bad. This happens because function calls itself 2 times inside itself.

// While loop fibonacci
function fibonacciLoop(numberTh) {
  if (numberTh < 0) return "Invalid parameter!";
  if (numberTh === 0) return 0;

  let first = 0;
  let second = 1;

  while (numberTh > 1) {
    const temp = second;
    second += first;
    first = temp;
    numberTh--;
  }

  return second;
}
// console.log(fibonacciLoop(8)); // Time Complexity: BIG O(n)

// Recursive Fibonacci improved with memoization which
const memo = {};
function fibonacciMemo(n) {
  if (n === 1) return 0;
  if (n === 2) return 1;
  if (memo[n]) return memo[n];
  memo[n] = fibonacciMemo(n - 1) + fibonacciMemo(n - 2);
  return memo[n];
}

// console.log(fibonacciMemo(1000));

// Reverse a string
// Recursive
function reverseWithRecursion(string, i = 0) {
  if (typeof string === "string") string = string.split("");
  if (i === Math.floor(string.length / 2)) return string.join("");
  const temp = string[i];
  string[i] = string[string.length - 1 - i];
  string[string.length - 1 - i] = temp;
  return reverseWithRecursion(string, ++i);
}
console.log(
  "Recursion Reversing\nEmre Ekinci:",
  reverseWithRecursion("Emre Ekinci")
);

// While Loop
function reverseWithLoop(string) {
  const stringArr = string.split("");
  for (let i = 0; i < Math.floor(stringArr.length / 2); i++) {
    const temp = stringArr[i];
    stringArr[i] = stringArr[stringArr.length - 1 - i];
    stringArr[stringArr.length - 1 - i] = temp;
  }
  return stringArr.join("");
}
console.log("\nLoop Reversing\nEmre Ekinci:", reverseWithLoop("Emre Ekinci"));
