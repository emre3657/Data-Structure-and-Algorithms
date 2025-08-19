// Dynamic Programming just means optimization technique.
// If you have something than you can cash, well, then you can use dynamic programming.

// Caching: Store some data. Then use it when it be needed to speed programs up.

// Memoization: Is a specific form of caching.
// There is a problem. Then break into subproblems. Then solve these subproblems. Then store(caching) the solutions. Then use it when it be needed.

function addTo80(n) {
  return n + 80;
}
// console.log(addTo80(5));

const cache = {};

// Return value of this function based on its parameters.
// Means if the function is called second time with the same parameter, then it was already memoized. Value return instantly without any calculations.
function memoizedAddTo80(n) {
  if (n in cache) {
    console.log("Instant reply");
    return cache[n];
  }
  console.log("In process, takes long time.");
  cache[n] = addTo80(n);
  return cache[n];
}

console.log(memoizedAddTo80(5));
console.log(memoizedAddTo80(5));

// So remember, this memorization is simply a way to remember a solution to a subproblem.

function addTo50(n) {
  return n + 50;
}
// But in this example, cache is global object which it is ideally not good. Let's fix it: Just take it into the function.
function memoizedAddTo50() {
  const cache = {};
  return (n) => {
    if (n in cache) {
      console.log("Instant reply");
      return cache[n];
    }
    console.log("In process, takes long time.");
    cache[n] = addTo50(n);
    return cache[n];
  };
}

const memoized = memoizedAddTo50();
console.log(memoized(5));
console.log(memoized(5));

console.log("\n\nFIBONACCI");
// Fibonacci without memoization
// 0 1 1 2 3 5 8 13 21 34 55 89 144...

function fibonacci(n) {
  if (n < 0) console.warn("Invalid parameter!");
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log("without memoizaton", fibonacci(10));

// Fibonacci with memoization
function fibonacciMemoization() {
  const cache = {};
  const fib = (n) => {
    if (n < 0) console.warn("Invalid parameter!");
    if (n < 2) return n;
    if (n in cache) return cache[n];
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
  return fib;
}
const fibonacciMemo = fibonacciMemoization();

console.log("with memoization", fibonacciMemo(10));

// Dynamic Programming: Combining 'Divide & Conquer + Memoization'
// These are the steps that I like to follow to see if a problem can use dynamic programming to optimize it:
// 1) Can the problem be divided into subproblems?
// 2) Can the problem be solved with recursion technique
// 3) Are the subproblems repetitive?
// 4) Memoize subproblems

console.log("\n\nHOUSE ROBBER");
// House Robber
function houseRobber(nums) {
  let cache = {};
  const rob = (n) => {
    if (n in cache) return cache[n];

    // base cases
    if (n < 0) return 0;
    if (n === 0) return nums[0];

    // recursive case
    cache[n] = Math.max(rob(n - 1), nums[n] + rob(n - 2));
    return cache[n];
  };

  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  return rob(nums.length - 1);
}

console.log("Stolen money:", houseRobber([1, 2, 3, 1]));
console.log("Stolen money:", houseRobber([2, 7, 9, 3, 1]));

// There is 2 types approach in dynamic programming
// 1) Bottom to Up --> Space Complexity: O(n or 1), Time Complexity: O(n)
// 2) Top to Down --> Space Complexity(Memoization): O(n), Time Complexity: O(n)

function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (let price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }

  return maxProfit;
}

console.log("\nPROFIT");
console.log("Max profit:", maxProfit([7, 1, 4, 6, 2]));

function climbingStairs() {
  let cache = {};
  function ways(n) {
    if (n in cache) return cache[n];
    if (n <= 2) return n;

    cache[n] = ways(n - 1) + ways(n - 2);
    return cache[n];
  }
  return ways;
}
console.log("\nCLIMBING STAIRS");
const way = climbingStairs();
console.log("option:", way(10));
// Time Complexity: O(n), Space Comlexity: O(n)

function ways(n) {
  if (n <= 2) return n;

  let oneStepBefore = 2;
  let twoStepBefore = 1;
  let allWays = 0;

  for (let i = 3; i <= n; i++) {
    allWays = oneStepBefore + twoStepBefore;
    twoStepBefore = oneStepBefore;
    oneStepBefore = allWays;
  }

  return allWays;
}
console.log("option:", ways(10)); // Time Complexity: O(n), Space Comlexity: O(1)

function ways2(n) {
  const arr = Array(n).fill(0);
  arr[0] = 1;
  arr[1] = 2;

  for (let i = 2; i < n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }

  return arr[n - 1];
}
console.log("option:", ways2(10)); // Time Complexity: O(n), Space Comlexity: O(n)
