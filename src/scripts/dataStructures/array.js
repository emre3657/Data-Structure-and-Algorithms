const strings = ["a", "b", "c", "d"];
// 4 * 4 = 16 bytes of storage in RAM (32 bits system)

console.log(strings[2]);

// push: Adds an item end of the array.
// Amortize Time Complexity: 0(1)
// Worts Time Complexity: O(n) If array is full, then memory will be allocated. Memory is doubled. Finally, items are written to memory using a loop.
strings.push("e"); // O(1) - O(n)
console.log(strings); // ['a', 'b', 'c', 'd', 'e']

// pop: Remove the last item end of the array.
strings.pop();
strings.pop(); // O(1)
console.log(strings); // ['a', 'b', 'c']

// unshift: Adds an item start of the array
strings.unshift("x"); // O(n)
console.log(strings); // ['x', 'a', 'b', 'c']

// splice
strings.splice(2, 0, "alien"); // O(n)
console.log(strings); // ['x', 'a', 'alien', 'b', 'c']

function addToArray(value, index, array) {
  const temp = [];
  for (let i = array.length - 1; i >= index; i--) {
    temp.push(array[i]); // add temp to last item of the array
    array.pop(); // remove last item from the array
  }
  array.push(value);

  for (let j = temp.length - 1; j >= 0; j--) {
    array.push(temp[j]);
  }

  return array;
}

console.log(addToArray(5, 4, [1, 2, 3, 4, 6, 7, 8, 9, 10]));

function addToArrayInPlace(value, index, array) {
  array.push(array[array.length - 1]); // boşluk aç
  for (let i = array.length - 2; i > index; i--) {
    array[i] = array[i - 1]; // sağa kaydır
  }
  array[index] = value;
  return array;
}

console.log(addToArrayInPlace(5, 4, [1, 2, 3, 4, 6, 7, 8, 9, 10]));

/*
// push
[1, 2, 3, 4, 6, 7, 8, 9, 10, 10]

// loop
[1, 2, 3, 4, 6, 7, 8, 9, 9, 10] 
[1, 2, 3, 4, 6, 7, 8, 8, 9, 10]
[1, 2, 3, 4, 6, 7, 7, 8, 9, 10]
[1, 2, 3, 4, 6, 6, 7, 8, 9, 10]

// assignment
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
*/

// Create a Array Data Structure with Class

class MyArray {
  length = undefined;
  data = undefined;
  constructor() {
    this.length = 0;
    this.data = {};
  }
  get(index) {
    if (index >= 0 && index < this.length) {
      return this.data[index];
    } else {
      return undefined; // index dışında erişim
    }
  }
  push(item) {
    this.data[this.length] = item;
    this.length++;
    return this.length;
  }

  pop() {
    if (this.length === 0) return undefined; // Eğer dizi boşsa, `undefined` döndür.

    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1]; // Son elemanı sil
    this.length--;

    // Eğer array tamamen boşsa, data nesnesini temizleyebiliriz (isteğe bağlı)
    if (this.length === 0) {
      this.data = {};
    }

    return lastItem;
  }

  shift() {
    const deletedItem = this.data[0];
    for (let i = 1; i < this.length; i++) {
      this.data[i - 1] = this.data[i];
    }
    delete this.data[this.length - 1];
    this.length--;
    return deletedItem;
  }
  /*
  shift metot algorithm
  array: 1 2 3 4 5
  i=1 2 2 3 4 5  
  i=2 2 3 3 4 5
  i=3 2 3 4 4 5
  i=4 2 3 4 5 5
  deleting last item:
  2 3 4 5
  */

  unshift(item) {
    for (let i = this.length - 1; i >= 0; i--) {
      this.data[i + 1] = this.data[i];
    }
    this.data[0] = item;
    this.length++;
    return this.length;
  }

  /*
  unshift metot algorithm
  array: 1 2 3 4 5
  i=4 1 2 3 4 5 5
  i=3 1 2 3 4 4 5
  i=2 1 2 3 3 4 5
  i=1 1 2 2 3 4 5
  i=0 1 1 2 3 4 5
  overriding an item('x') at 0. index:
  'x' 1 2 3 4 5
  */

  removeAt(index) {
    const deletedItem = this.data[index];
    this.#shiftItems(index);
    return deletedItem;
  }

  insert(index, item) {
    this.#unshiftItems(index, item);
    return this.length;
  }

  #shiftItems(index) {
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length - 1];
    this.length--;
  }

  #unshiftItems(index, item) {
    if (index < this.length) {
      for (let i = this.length - 1; i >= index; i--) {
        this.data[i + 1] = this.data[i];
      }
      this.data[index] = item;
      this.length++;
    } else {
      this.data[this.length] = item;
      this.length++;
    }
  }

  reverse() {
    let temp;
    for (let i = 0; i < Math.floor(this.length / 2); i++) {
      temp = this.data[this.length - 1 - i];
      this.data[this.length - 1 - i] = this.data[i];
      this.data[i] = temp;
    }
    return this;
  }

  clear() {
    this.data = {};
    this.length = 0;
  }

  indexOf(value) {
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] === value) {
        return i;
      }
    }
    return -1;
  }

  includes(value) {
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] === value) return true;
    }
    return false;
  }

  isEmpty() {
    return !this.length && !Object.keys(this.data).length;
  }

  cloneShallow() {
    const clone = new MyArray();
    clone.length = this.length;
    clone.data = this.data;
    return clone;
  }

  cloneDeep() {
    const clone = new MyArray();
    for (let i = 0; i < this.length; i++) {
      clone.data[i] = this.data[i];
    }
    clone.length = this.length;
    return clone;
  }

  toArray() {
    const arr = [];
    for (let i = 0; i < this.length; i++) {
      arr.push(this.data[i]);
    }
    return arr;
  }

  static fromArray(array) {
    const myArray = new MyArray();
    for (let i = 0; i < array.length; i++) {
      myArray.push(array[i]);
    }
    return myArray;
  }

  slice(start, end) {
    if (
      typeof Math.floor(start) !== "number" ||
      typeof Math.floor(end) !== "number"
    ) {
      alert("Invalid input");
      return [];
    }
    const arr = new MyArray();
    for (let i = start; i < end; i++) {
      arr.push(this.data[i]);
    }
    return arr;
  }
}

const arr = new MyArray();
arr.push("Salih");
arr.push("Tutya");
arr.push("Ali");
arr.push("Emre");
arr.push("Ezgi");

console.log("Shifting, remove first item of the array");
arr.shift();
console.log(arr.data);

console.log("Unshifting, add an item start of the array");
arr.unshift("Salih");
console.log(arr.data);

console.log("Reversing, reverse the items of the array");
arr.reverse();
console.log(arr.data);

console.log("Pushing, add an item end of the array");
arr.push("Miray");
console.log(arr.data);

console.log("Reversing, reverse the items of the array");
arr.reverse();
console.log(arr.data);

const arr2 = new MyArray();
for (let i = 0; i < 10; i++) {
  arr2.push(i);
}
console.log("\n\narr2:\n", arr2.data);
console.log("Reversing arr2:");
arr2.reverse();
console.log(arr2.data);

console.log("Is '5' in arr2?");
console.log(arr2.includes(5));

console.log("What index is '5' in the arr2?");
console.log(arr2.indexOf(5));

console.log("Clearing arr2...");
arr2.clear();
console.log(arr2);

console.log("\n\nCloning shallow...");
const cloneShallow = arr2.cloneShallow();
console.log("Pushing '99999' into shallow clone...");
cloneShallow.push(99999);
console.log(
  "orginal:",
  JSON.stringify(arr2),
  "\nShallow Clone:",
  JSON.stringify(cloneShallow)
);

console.log("\nClearing arr2...");
arr2.clear();
console.log("arr2 cleared!");

console.log("Is arr2 empty?", arr2.isEmpty());

console.log("\n\nCloning deep...");
const cloneDeep = arr2.cloneDeep();
console.log("Pushing '99999' into deep clone...");
cloneDeep.push(99999);
console.log("Orginal:", arr2, "\nDeep Clone:", cloneDeep);

const arr3 = new MyArray();
arr3.data = { 0: "A" };
console.log("\nIs arr3 empty?", arr3.isEmpty());

const arr4 = ["e", "m", "r", "e"];
console.log("arr4:", arr4);

console.log("Array to MyArray Object:", MyArray.fromArray(arr4));

// A common interview question is that reversing a string.

function reverse(str) {
  if (!str) {
    alert("Please enter a input");
    return "";
  }

  if (typeof str !== "string") {
    alert("Invalid type!");
    return "";
  }

  if (str.length === 1) {
    return str;
  }

  const trimmedStr = str.trim();
  const arrayOfStr = trimmedStr.split("");
  const reversedArrayOfStr = reverseArr(arrayOfStr);
  const reversedStr = reversedArrayOfStr.join("");
  return reversedStr;
}

function reverseArr(arr) {
  if (Array.isArray(arr)) {
    let temp;
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
      temp = arr[i];
      arr[i] = arr[arr.length - 1 - i];
      arr[arr.length - 1 - i] = temp;
    }
    return arr;
  }
  alert("Invalid input!");
  return [];
}

function reverseStr(str) {
  if (!str) {
    alert("Please enter a input");
    return "";
  }

  if (typeof str !== "string") {
    alert("Invalid type!");
    return "";
  }

  if (str.length === 1) {
    return str;
  }

  const backwards = [];
  const totalItems = str.length - 1;
  for (let i = totalItems; i >= 0; i--) {
    backwards.push(str[i]);
  }
  return backwards.join("");
}

console.log("\n\nReversing 'Emre Ekinci'");
console.log(reverse("Emre Ekinci"));
console.log(reverseStr("Emre Ekinci"));
// console.log("Emre Ekinci".split("").reverse().join(""));

// Merge 2 Arrays as a sorted

const mergeArrays = (arr1, arr2) => {
  if (!(Array.isArray(arr1) && Array.isArray(arr2))) {
    alert("Invalid input(s)!");
    return null;
  }
  const mergedArr = [...arr1, ...arr2];
  // const mergedArr2 = arr1.concat(arr2);
  return mergedArr.sort((a, b) => a - b);
};

console.log(
  "MergedSortedArray",
  mergeArrays([99, 4, 8, 32, 45], [99, 4, 8, 32, 45])
);
