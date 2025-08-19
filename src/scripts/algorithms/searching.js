// Searching Algorithms
// Linear Search: We look for an item in a list or an array. We loop each item and check to find the wanted item.
const beasts = ["Centaur", "Godzilla", "Mosura", "Minotaur", "Hydra", "Nessie"];
console.log(beasts.indexOf("Godzilla"));
console.log(beasts.findIndex((item) => item === "Godzilla"));
console.log(beasts.find((item) => item === "Godzilla"));
console.log(beasts.includes("Godzilla"));
// Worst case: Time Complexity -> BIG O(n)

// Binary Search - Binary Search Tree - O(logn)
function binarySearch(arr, value) {
  while (arr.length > 0) {
    const middleIndex = Math.floor(arr.length / 2);
    if (value < arr[middleIndex]) arr = arr.slice(0, middleIndex);
    else if (value > arr[middleIndex]) arr = arr.slice(middleIndex + 1);
    else return value;
  }
  return null;
}
const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(binarySearch(arr1, 5));
console.log("arr1:", arr1);

function binarySearchRecursive(arr, value) {
  if (!arr.length) return null;
  const middleIndex = Math.floor(arr.length / 2);
  if (value < arr[middleIndex])
    return binarySearchRecursive(arr.slice(0, middleIndex), value);
  else if (value > arr[middleIndex])
    return binarySearchRecursive(arr.slice(middleIndex + 1), value);
  else return value;
}
const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(binarySearchRecursive(arr2, 5));
console.log("arr2:", arr2);

// Graph
// BFS: Use to find closest nodes. Parent to Child(parent) to Child
// DFS: Use to find a path exists or not between 2 nodes.
// Special Case: Shortest Path Algorithms uses'weighted edge'.
// Bellman-Ford and Dijkstra

// Bellman Ford algorithm is a very effective at solving the shortest path over Dijkstra's algorithm because it can accommodate negative weights.

// So if a weighted graph has negative weights or negative number, Bellman Ford algorithm is going to be able to solve the shortest path problem while Dijkstra won't be able to.

// The worst case for Bellman Ford algorithm is usually a time complexity of zero of an squared. O(n^2)

// Dijkstra's algorithm, on the other hand, is a little bit faster than that and a little bit more efficien with the downside that it can accommodate for negative weights between nodes.
