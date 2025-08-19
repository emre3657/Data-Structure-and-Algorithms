const letter = ["a", "d", "c", "b", "z", "k"];
// console.log(letter.sort());

/*   COMPARISON SORT TYPES   */
// That means all elements must be compared to each other.
// Bubble Sort
function bubbleSort(arr) {
  let swapped;
  let len = arr.length;
  for (let i = 0; i < arr.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < len - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    len--;
    if (!swapped) break;
  }
  return arr;
}
console.log("Bubble Sort");
// Time complexity: O(n^2), Space complexity: O(1)
console.log(bubbleSort([6, 5, 3, 1, 8, 7, 2, 4]));

// Selection Sort
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let leastIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[leastIndex]) leastIndex = j;
    }
    const temp = arr[i];
    arr[i] = arr[leastIndex];
    arr[leastIndex] = temp;
  }
  return arr;
}
console.log("Selection Sort");
// Time complexity: O(n^2), Space complexity: O(1)
console.log(selectionSort([6, 5, 3, 1, 8, 7, 2, 4]));

// Insertion Sort - Good to use when the list almost sorted or data is small over the other sorting algorithms.
// Best Time Complexity BIG O(n)
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}
console.log("Insertion Sort");
console.log(insertionSort([6, 5, 3, 1, 8, 7, 2, 4]));

// Merge Sort: Merge: Birleştir.
function mergeSort(arr) {
  if (arr.length === 1) return arr;

  // Split Array into right and left
  const length = arr.length;
  const middle = Math.floor(length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  // Compare 2 array and merge them as sorted. Return mergered array.
  const arr = [];
  let l = 0;
  let r = 0;
  while (l !== left.length && r !== right.length) {
    if (left[l] < right[r]) {
      arr.push(left[l]);
      l++;
    } else {
      arr.push(right[r]);
      r++;
    }
  }
  return arr.concat(left.slice(l)).concat(right.slice(r));
}

/*
                   [6, 5, 3, 1, 8, 7, 2, 4]
                   /                      \
                  /                        \ 
            [6, 5, 3, 1]              [8, 7, 2, 4]
                /   \                    /    \ 
               /     \                  /      \
          [6, 5]     [3, 1]        [8, 7]      [2, 4]
            /\         /\            /\          / \
           /  \       /  \          /  \        /   \
         [6]  [5]   [3]  [1]      [8]  [7]    [2]   [4]


 [1, 3, 7, 9]   [2, 4, 5]
[1, 2, 3, 4, 5]
l: 2, r: 3
*/
console.log("Merge Sort");
console.log(mergeSort([6, 5, 3, 1, 8, 7, 2, 4]));

// Quick Sort - Good to use when we know how our list are. The key is choosing of pivot item. Because the sort using divide and conquer technique. If we do not choose good pivot item. Let's say we choose minimum or maximum item in the list for the pivot. Then sort can not divide the list. Thus, worst case happing. Time complexity goes O(n^2).

function medianIndex(arr, i1, i2, i3) {
  const a = arr[i1], b = arr[i2], c = arr[i3]; // prettier-ignore
  if ((a > b) !== (a > c)) return i1; // prettier-ignore
  if ((b  > a) !== (b > c)) return i2; // prettier-ignore
  return i3;
}

function quickSortInPlace(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSortInPlace(arr, low, pivotIndex - 1);
    quickSortInPlace(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const mid = Math.floor((low + high) / 2);
  const pivotIdx = medianIndex(arr, low, mid, high);

  // Pivotu sona al
  [arr[pivotIdx], arr[high]] = [arr[high], arr[pivotIdx]];
  const pivot = arr[high];

  let i = low;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }

  // Pivotu doğru yerine koy
  [arr[i], arr[high]] = [arr[high], arr[i]];
  return i;
}
console.log("Quick Sort");
console.log(quickSortInPlace([6, 5, 3, 1, 8, 7, 2, 4]));

// NON-COMPARISON SORT TYPES
// Radix and Counting Sort: Uses bits (0 and 1). When input is fixed range(0 - 1000) and as an integer.
