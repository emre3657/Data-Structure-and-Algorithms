// This file is about Space Complexity - Usage of Memory

function boooo(n) {
  for (let i = 0; i < n.length; i++) {
    console.log("boooo!");
  }
}

// Time Complexity: We do not care about size of input.
// We care about assignments(variables, function call, etc) in the function.
boooo([1, 2, 3, 4, 5]); // O(1) --> let i

const result = function arrayOfHiNTimes(n) {
  let hiArray = [];
  for (let i = 0; i < n; i++) {
    hiArray[i] = "hi";
  }
  return hiArray;
};

result(5); // O(n)

// Some examples about interview question.
const arr1 = ["z", 1];
const arr2 = ["d", "g", "h", "a"];
const arr3 = ["a", "b", "c", "d"];

function compareArrs(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        return true;
      }
    }
  }
  return false;
}
// Time Complexity: O(a * b)
// Space Complexity: O(1)
console.log("compareArrs:", compareArrs(arr1, arr2));

function compareArrs2(arr1, arr2) {
  let map = {};
  // fill the map object up with first array as a property.
  for (let i = 0; i < arr1.length; i++) {
    if (!map[arr1[i]]) {
      const item = arr1[i];
      map[item] = true;
    }
  }
  // loop through second array to find the matching item.
  for (let j = 0; j < arr2.length; j++) {
    if (map[arr2[j]]) {
      return true;
    }
  }
  return false;
}
// Time Complexity: O(a + b)
// Space Complexity: O(a) --> Size of first array
console.log("compareArrs2:", compareArrs2(arr1, arr2));

function compareArrs3(arr1, arr2) {
  return arr1.some((item) => arr2.includes(item));
}
// Time Complexity: O(a * b)
// Space Complexity: O(1)
console.log("compareArrs3:", compareArrs3(arr1, arr2));

//Naive
function hasPairWith(arr, sum) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === sum) {
        return true;
      }
    }
  }
  return false;
}

// Time Complexity: O(n^2)
// Space Complexity: O(1)
console.log("hasPairWith: ", hasPairWith([3, 5, 6, 4, 8, 1], 9));

// Better
function hasPairWith2(arr, sum) {
  const mySet = new Set();
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    if (mySet.has(arr[i])) {
      return true;
    }
    mySet.add(sum - arr[i]);
  }
  return false;
}

// Time Complexity: O(n)
// Space Complexity: O(n)
console.log("hasPairWith2: ", hasPairWith2([3, 5, 6, 4, 8, 1], 9));

/*
const bool1 = arr1.every((item) => {
  return arr3.includes(item);
});

const bool1 = arr1.filter((item) => Number.isInteger(item));

console.log(bool1);
console.log(bool2);
*/
