// Tree Data Structure
// Linked list is a type of Tree

// Binary Tree: Each node can have zero, one or two children and a node can be have only one parent.

/* 
Perfect Binary Tree 
  Calculating Node Count 
    Level 0: 2^0 = 1;
    Level 1: 2^1 = 2;
    Level n: 2^n = 1 + 2^0 + 2^1 + ... + 2^(n - 1)
    Total Node Count = 2^n + 2^n - 1 
                     = 2 x 2^n - 1
                     = 2^(n + 1) - 1 
    Total Operation Count to Decide = ((log 2^n + 1) - 1) ~ n + 1
    
    Total Node Count(Other) = 2^h - 1 // h: height of the tree
    Total Operation Count to Decide = ((log 2^h) - 1) ~ h
    
    Another Term = log nodes = height(steps) 
    BIG O(log n) --> n: Amount of the node of the tree
*/

// Most Common Tree Data Structure
// Binary Search Tree (Subset of Binary Tree)

// Binary Tree has a problem. If the tree became unbalanced which means all or some node(section) goes to right or left(it becomes linked list), BIG O performance goes from logN to N.
// So, Balanced Binary Tree   --> BIG O(log n) - Average
//     Unbalanced Binary Tree --> BIG O(n)     - Worst

// Implement Binary Search Tree Data Structure

class Node {
  value;
  left;
  right;
  frequency;

  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.frequency = 1;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let currentNode = this.root;

    while (true) {
      if (newNode.value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          break;
        }
        currentNode = currentNode.left;
      } else if (newNode.value > currentNode.value) {
        if (!currentNode.right) {
          currentNode.right = newNode;
          break;
        }
        currentNode = currentNode.right;
      } else {
        currentNode.frequency++;
        break;
      }
    }

    return this;
  }

  lookup(value) {
    if (!this.root) {
      console.warn("The tree is empty!");
      return null;
    }

    if (typeof value !== "number") {
      console.warn("Invalid parameter! Must be integer");
      return false;
    }

    return this.#find(this.root, value);
  }

  /*
  // Loop(while) through the tree
  #find(value) {
    let currentNode = this.root;
    while (currentNode) {
      if (value === currentNode.value) {
        return currentNode;
      }
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    console.warn("Value was not found in the tree!");
    return null;
  }
  */

  // Recursive searching in the tree
  #find(node, value) {
    if (value === node.value) return node;
    if (value < node.value)
      return node.left ? this.#find(node.left, value) : null;
    else return node.right ? this.#find(node.right, value) : null;
  }

  path(value) {
    if (!this.root) {
      console.warn("The tree is empty!");
      return null;
    }

    if (typeof value !== "number") {
      console.warn("Invalid parameter type! Must be integer");
      return false;
    }

    let path = `Root(${this.root.value})`;

    let currentNode = this.root;
    while (currentNode) {
      if (value === currentNode.value) {
        return path;
      }
      if (value < currentNode.value) {
        currentNode = currentNode.left;
        if (currentNode) path += ` --> ${currentNode.value}`;
      } else {
        currentNode = currentNode.right;
        if (currentNode) path += ` --> ${currentNode.value}`;
      }
    }
    console.warn("Node not found!");
    return null;
  }

  // Remove a node from the tree
  remove(value) {
    if (!this.root) {
      console.warn("The tree is empty!");
      return false;
    }

    if (typeof value !== "number") {
      console.warn("Invalid parameter type! Must be integer");
      return false;
    }

    let currentNode = this.root;
    let parent = null;
    let isRightChild = true;
    let found = false;

    // Find the node, take parent and left or right child info.
    while (currentNode) {
      if (value === currentNode.value) {
        found = true;
        break;
      }
      // Go to left subtree
      else if (value < currentNode.value) {
        parent = currentNode;
        isRightChild = false;
        currentNode = currentNode.left;
      }
      // Go to right subtree
      else {
        parent = currentNode;
        isRightChild = true;
        currentNode = currentNode.right;
      }
    }

    // Node not found
    if (!found) {
      console.warn("Node not found!");
      return null;
    }

    // Decrease the frequency
    if (currentNode.frequency > 1) {
      currentNode.frequency--;
      console.log(
        `Frequency of the node updated! New frequency: ${currentNode.frequency}`
      );
      return currentNode;
    }

    // If the node is a leaf node
    if (!currentNode.left && !currentNode.right) {
      // If there is a parent
      if (parent) {
        if (isRightChild) {
          parent.right = null;
        } else {
          parent.left = null;
        }

        return currentNode;
      }
      // If there is no parent. This tree just have a root node.
      this.root = null;
      return currentNode;
    }

    // Finding correct the node to replace with removed one.
    if (currentNode.right) {
      const { successor, parentOfSuccessor } =
        this.#getInOrderSuccessor(currentNode);

      // Adjust the links
      if (successor !== currentNode.right) {
        // Connect right child of the successor node to left of parent of the successor node.
        parentOfSuccessor.left = successor.right;

        // Move successor node to location of removed node.
        successor.right = currentNode.right;
        successor.left = currentNode.left;
      }

      // successor === currentNode.right
      else {
        successor.left = currentNode.left;
      }

      this.#replaceNodeInParent(parent, isRightChild, successor);
      return currentNode;
    }

    // The section: Node must have left child
    const successor = currentNode.left;
    this.#replaceNodeInParent(parent, isRightChild, successor);
    return currentNode;
  }

  #getInOrderSuccessor(node) {
    let successor = node.right;
    let parentOfSuccessor = null;

    while (successor.left) {
      parentOfSuccessor = successor;
      successor = successor.left;
    }

    const result = { successor, parentOfSuccessor };
    return result;
  }

  #replaceNodeInParent(parent, isRightChild, successor) {
    // Adjust parent links
    if (parent) {
      if (isRightChild) {
        parent.right = successor;
      } else {
        parent.left = successor;
      }
    }
    // If removed node is the root node which has no parent.
    else {
      this.root = successor;
    }
  }

  // Depth of the Node: Steps from the Root Node to Wanted Node.
  depthOf(value) {
    if (!this.root) {
      console.warn("The tree is empty!");
      return null;
    }

    if (typeof value !== "number") {
      console.warn("Invalid parameter type! Must be integer");
      return false;
    }

    let depth = 0;
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.value === value) return depth;
      if (value < currentNode.value) {
        currentNode = currentNode.left;
        depth++;
      } else {
        currentNode = currentNode.right;
        depth++;
      }
    }

    console.warn("Node not found!");
    return null;
  }

  height(value) {
    if (!this.root) {
      console.warn("The tree is empty!");
      return null;
    }

    if (typeof value !== "number") {
      console.warn("Invalid parameter type! Must be integer");
      return false;
    }

    const node = this.#find(this.root, value);
    if (!node) {
      console.warn("Node not found");
      return null;
    }

    return this.#getHeight(node);
  }

  #getHeight(node) {
    if (node === null) return -1;

    const leftHeight = this.#getHeight(node.left);
    const rightHeight = this.#getHeight(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  heightLoop(value) {
    if (!this.root) {
      console.warn("The tree is empty!");
      return null;
    }

    if (typeof value !== "number") {
      console.warn("Invalid parameter type! Must be integer");
      return false;
    }

    const node = this.#find(this.root, value);
    if (!node) {
      console.warn("Node not found");
      return null;
    }

    let maxDepth = 0;
    const stack = [[node, 0]];

    while (stack.length) {
      const [currentNode, currentDepth] = stack.pop();
      maxDepth = Math.max(maxDepth, currentDepth);

      if (currentNode) {
        if (currentNode.left) stack.push([currentNode.left, currentDepth + 1]);
        if (currentNode.right)
          stack.push([currentNode.right, currentDepth + 1]);
      }
    }

    return maxDepth;
  }

  breadthFirstSearch() {
    const outStack = [this.root];
    const inStack = [];
    const result = [];
    while (outStack.length) {
      const out = outStack.pop();
      result.push(out.value);
      if (out.left) inStack.push(out.left);
      if (out.right) inStack.push(out.right);
      if (!outStack.length) {
        while (inStack.length) outStack.push(inStack.pop());
      }
    }
    return result;
  }

  breadthFirstSearchRecursive(queue, list) {
    if (!queue.length) return list;
    const node = queue.shift();
    list.push(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
    return this.breadthFirstSearchRecursive(queue, list);
  }

  // Validate BST(Binary Search Tree) Using BFS(Breadth First Search)
  validateBST_BFS() {
    const queue = [{ node: this.root, min: -Infinity, max: Infinity }];
    while (queue.length) {
      const { node, min, max } = queue.shift();
      if (!node) continue;
      if (node.value <= min || node.value >= max) return false;
      queue.push({ node: node.left, min, max: node.value });
      queue.push({ node: node.right, min: node.value, max });
    }
    return true;
  }

  // Validate BST(Binary Search Tree) Using DFS(Depth First Search)
  validateBST_DFS(node = this.root, prev = { val: -Infinity }) {
    if (!node) return true;
    if (!this.validateBST_DFS(node.left, prev)) return false;
    if (node.value <= prev.val) return false;
    prev.val = node.value;
    return this.validateBST_DFS(node.right, prev);
  }
}

/*
         10
      5     15 
    3   6        20
   2 4        18     25
                      30
              

*/

const myTree = new BinarySearchTree();

myTree.insert(10);
myTree.insert(5);
myTree.insert(15);
myTree.insert(6);
myTree.insert(3);
myTree.insert(2);
myTree.insert(4);
myTree.insert(20);
myTree.insert(18);
myTree.insert(25);
myTree.insert(30);

console.log(myTree);

console.log("Recursive: ", myTree.height(5));
console.log("While loop: ", myTree.heightLoop(5));

/**************************************************/
console.log("\nDEPTH FIRST SEARCH");
console.log("\n ", "Pre Order");
// Pre-Order Traverse: Means root is at the start.
// root -> left -> right
function traversePreOrder(node, arr = []) {
  arr.push(node.value);

  if (node.left) traversePreOrder(node.left, arr);

  if (node.right) traversePreOrder(node.right, arr);

  return arr;
}
console.log("\t", "Recursive");
console.log("\t", traversePreOrder(myTree.root));

// while loop
function loopPreOrder(node) {
  const stack = [node];
  const arr = [];

  while (stack.length) {
    const currentNode = stack.pop();
    arr.push(currentNode.value);

    if (currentNode.right) stack.push(currentNode.right);
    if (currentNode.left) stack.push(currentNode.left);
  }

  return arr;
}
console.log("\t", "While Loop");
console.log("\t", loopPreOrder(myTree.root));

/**************************************************/
console.log("\n ", "In Order");
// In-Order Traverse: Means root in in the middle.
// left -> root -> right
function traverseInOrder(node, arr = []) {
  if (node.left) traverseInOrder(node.left, arr);

  arr.push(node.value);

  if (node.right) traverseInOrder(node.right, arr);

  return arr;
}

console.log("\t", "Recursive");
console.log("\t", traverseInOrder(myTree.root));

// while loop
function loopInOrder(node) {
  const stack = [];
  const arr = [];
  let currentNode = node;

  while (stack.length || currentNode) {
    if (currentNode) {
      stack.push(currentNode);
      currentNode = currentNode.left;
    } else {
      const popped = stack.pop();
      arr.push(popped.value);
      currentNode = popped.right;
    }
  }

  return arr;
}

console.log("\t", "While Loop");
console.log("\t", loopInOrder(myTree.root));

/**************************************************/
console.log("\n ", "Post Order");
// Post-Order Traverse: Means root is at the end.
// left -> right -> root
function traversePostOrder(node, arr = []) {
  if (node.left) traversePostOrder(node.left, arr);

  if (node.right) traversePostOrder(node.right, arr);

  arr.push(node.value);

  return arr;
}
console.log("\t", "Recursive");
console.log("\t", traversePostOrder(myTree.root));

// while loop - 2 stack
function loopPostOrder(node) {
  const stack = [node];
  const arr = [];

  while (stack.length) {
    const currentNode = stack.pop();
    arr.push(currentNode.value);
    if (currentNode.left) stack.push(currentNode.left);
    if (currentNode.right) stack.push(currentNode.right);
  }

  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    const temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
  }

  return arr;
}
console.log("\t", "While Loop with 2 Stacks");
console.log("\t", loopPostOrder(myTree.root));

// while loop - 1 stack and previous variable
function loopPostOrderWithPre(node) {
  const stack = [];
  const arr = [];
  let previous = null;
  let currentNode = node;
  while (stack.length || currentNode) {
    if (currentNode) {
      stack.push(currentNode);
      currentNode = currentNode.left;
    } else {
      const node = stack[stack.length - 1];

      if (!node.right || node.right === previous) {
        arr.push(node.value);
        stack.pop();
        previous = node;
        currentNode = null;
      } else currentNode = node.right;
    }
  }
  return arr;
}
console.log("\t", "While Loop with 1 Stack and 1 Previous Variable");
console.log("\t", loopPostOrderWithPre(myTree.root));

/*
         10
      5     15 
    3   6        20
   2 4        18     25
                      30
              

*/

// Searching or Traversing a Tree or a Graph.

// Breadth First Search / Traversal
// Start with root node. Than go its children left to right for each level.
// [10, 5, 15, 3, 6, 20, 2, 4, 18, 25, 30]

// Depth First Search / Traversal
// The search follows one branch of the tree down as many levels as possible until the target node is found
// PreOrder: Root -> Left -> Right
// [10, 5, 3, 2, 4, 6, 15, 20, 18, 25, 30]
// InOrder: Left -> Root -> Right
// [2, 3, 4, 5, 6, 10, 15, 18, 20, 25, 30]
// PostOrder: Left -> Right -> Root
// [2, 4, 3, 6, 5, 18, 30, 25, 20, 15, 10]

// Let's do some exercises before coding for Breadth and Depth First Search
// Answer the questions. Choose Breadth or Depth to use.

// 1) If you know a solution is not far from the root of three: BFS

// 2) If the tree is very deep and solutions are rare: BFS (DFS will take long)

// 3) If tree is very wide: DFS (BFS will need too much memory)

// 4) If solutions are frequent but located deep in the tree: DFS

// 5) Determining whether a path exists between two nodes: DFS

// 6) Finding the shortest path: BFS

// BFS Metod Control
console.log("\nBREADTH FIRST SEARCH");
console.log("\t", "While Loop");
console.log("\t", myTree.breadthFirstSearch());
console.log("\t", "Recursive");
console.log("\t", myTree.breadthFirstSearchRecursive([myTree.root], []));

// Validate BST
console.log("\nVALIDATE BST WITH BREATH FIRST SEARCH");
console.log("\t", myTree.validateBST_BFS());

console.log("\nVALIDATE BST WITH DEPTH FIRST SEARCH");
console.log("\t", myTree.validateBST_DFS());
