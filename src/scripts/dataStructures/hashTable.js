// This file is about Hash Table of Data Structure
// Hash Table is simply an object in JavaScript. There is a key and value (key-value pair, age: 10). Key can be property or a method of the object. Value can be in any type. There is a hash function which takes the key as a parameter. Then, convert it into an ideally distributed address of memory. Finally, adds the value to the address.

// The Problem of Hash Tables
// Address Collision: Sometimes, Hash function creates an address more than one time then, multiple key-value pairs are stored at the same index due to hash collisions. Then, many values link each other in the same address memory. So,  time complexities of reading and writing process  goes to O(n).

let user = {
  age: 54,
  name: "Kylie",
  magic: true,
  scream() {
    console.log("ahhhhhhh!");
  },
};

let user2 = {
  age: 10,
};

// Assume all keys in different address in memory.
console.log(user2.age);

user.age; // O(1) --> Access - Lookup
user.spell = "abra kadabra"; // O(1) --> Insert
delete user.magic; // O(1) --> Delete

console.log(user);

// const a = new Map(): Familiar to object, there is a key - value pair. But key can be any type of data(string, array, function, object) instead of only string like in object. An additation, Items are insertion order in Map. Remember, there is no insertion order in object.

// const b = new Set(): Set includes only values like array in insertion order.

// WeakSet and WeakMap are like light version of Set-Map. WeakSet can be only had object value. WeakMap can be only had object key, value can be in any type.

const map = new Map();
map.set("name", "emre");
const arr = [1, 2, 3];
map.set(arr, { a: 1, b: 2, c: 3 });
console.log(map);
console.log(map.get(arr));

const set = new Set();
set.add(1);
set.add([1, 2, 3]);
set.add(2);
set.add([1, 2, 3]);
set.add(2);
console.log(set);
// set includes [1, 2, 3], because arrays work with references. Those 2 arrays' references are different.

// Let's create our own HashTable Class
class HashTable {
  data = undefined;
  constructor(size) {
    this.data = new Array(size);
  }

  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i)) % this.data.length;
    }
    return hash;
  }

  set(key, value) {
    // O(1) most time
    if (typeof key !== "string") {
      console.warn(`Invalid key type: ${typeof key}`);
      return false;
    }
    if (key === "") {
      console.warn("Key can not be empty!");
      return false;
    }

    const address = this._hash(key);

    // Linear probing
    let index = address;
    let attempts = 0;

    while (this.data[index] && this.data[index][0] !== key) {
      index = (address + ++attempts) % this.data.length;
      if (attempts >= this.data.length) {
        console.warn("Hash table is full!");
        return false;
      }
    }
    this.data[index] = [key, value];
  }

  get(key) {
    // O(1) most time
    if (typeof key !== "string") {
      console.warn(`Invalid key type: ${typeof key}`);
      return undefined;
    }
    if (key === "") {
      console.log("Key can not be empty!");
      return undefined;
    }
    const address = this._hash(key);

    // Linear probing
    let index = address;
    let attemps = 0;

    while (this.data[index]) {
      if (this.data[index][0] === key) {
        return this.data[index][1];
      }

      // Go to next index
      index = (index + ++attemps) % this.data.length;

      if (attemps >= this.data.length) break;
    }
    return undefined;
  }

  keys() {
    const keysArray = [];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i]) {
        keysArray.push(this.data[i][0]);
      }
    }
    return keysArray;
  }
}

// If memory space is not enough big then, Time complexity becomes O(n).
const myHashTable = new HashTable(50);

myHashTable.set("name", "emre");
myHashTable.set("surname", "ekinci");
myHashTable.set("age", 24);
myHashTable.set("gender", "male");

console.log(myHashTable.get("name"));
console.log(myHashTable.get("gender"));

console.log(myHashTable);

console.log(myHashTable.keys());

class HashTable2 {
  data;

  constructor(size) {
    this.data = new Array(size);
  }

  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i)) % this.data.length;
    }
    return hash;
  }

  set(key, value) {
    if (typeof key !== "string") {
      console.warn(`Invalid key type: ${typeof key}`);
      return undefined;
    }

    if (key === "") {
      console.log("Key can not be empty!");
      return undefined;
    }

    const address = this._hash(key);
    if (!this.data[address]) {
      this.data[address] = [];
    }
    this.data[address].push([key, value]);
  }

  get(key) {
    if (typeof key !== "string") {
      console.warn(`Invalid key type: ${typeof key}`);
      return undefined;
    }
    if (key === "") {
      console.log("Key can not be empty!");
      return undefined;
    }

    const address = this._hash(key);
    const currentBucket = this.data[address];

    if (currentBucket) {
      for (let i = 0; i < currentBucket.length; i++) {
        if (currentBucket[i][0] === key) {
          return currentBucket[i][1];
        }
      }
    }
    return undefined;
  }

  keys() {
    if (!this.data.length) {
      return undefined;
    }
    let keyArray = [];
    // loop through all the elements
    for (let i = 0; i < this.data.length; i++) {
      // if it's not an empty memory cell
      if (this.data[i] && this.data[i].length) {
        // but also loop through all the potential collisions
        if (this.data.length > 1) {
          for (let j = 0; j < this.data[i].length; j++) {
            keyArray.push(this.data[i][j][0]);
          }
        } else {
          keyArray.push(this.data[i][0]);
        }
      }
    }
    return keyArray;
  }
}

const myHashTable2 = new HashTable2(10);
myHashTable2.set("name", 1);
myHashTable2.set("mane", 2);
myHashTable2.set("mena", 3);
myHashTable2.set("mnae", 4);
myHashTable2.set("erik", 100);
myHashTable2.set("elma", 90);
myHashTable2.set("karpuz", 46);
myHashTable2.set("çilek", 85);
console.log(myHashTable2.data);

console.log(myHashTable2.get("erik"));

console.log(myHashTable2.keys());

// Google Question - First Recurring Character
// Given an array =  [2, 5, 1, 2, 3, 5, 1, 2, 4]
// It should return 2

// Given an array = [2, 1, 1, 2, 3, 5, 1, 2, 4]
// It should return 1

// Given an array = [2, 3, 4, 5]
// It should return undefined

// naive solution
function firstRecurringCharNaive(array) {
  let minIndex = array.length - 1;
  let result;
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        if (j < minIndex) {
          minIndex = j;
          result = array[j];
        }
        break;
      }
    }
  }
  return result;
}
console.log("Naive:", firstRecurringCharNaive([2, 5, 1, 5, 2, 4, 1, 2, 5])); // 2

function firstRecurringChar(array) {
  const obj = {};
  for (item of array) {
    if (obj[item]) return item;
    obj[item] = true;
  }
  return undefined;
}

function lastRecurringChar(array) {
  const obj = {};
  let lastChar = undefined;
  for (item of array) {
    if (obj[item]) lastChar = item;
    else obj[item] = true;
  }
  return lastChar;
}

console.log(
  "First Recurring Character:",
  firstRecurringChar([2, 1, 1, 2, 3, 5, 1, 2, 4]) // 1
);

console.log(
  "Last Recurring Character:",
  lastRecurringChar([1, 2, 1, 3, 4, 5, 3])
);
