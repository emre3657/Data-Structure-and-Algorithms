const obj1 = {
  a: true,
};

const obj2 = obj1;
obj1.a = false;

// delete operator removes connection of property of object.

// delete obj1 --> this not work nevertheless, this not throw a error.
delete obj1.a;
delete obj2.a;

// console.log(obj1);
// console.log(obj2);

class Node {
  value;
  next;
  constructor(value) {
    (this.value = value), (this.next = null);
  }
}

class LinkedList {
  head;
  tail;
  length;
  constructor(value) {
    this.head = new Node(value);
    this.tail = this.head;
    this.length = 1;
  }

  append(value) {
    const newNode = new Node(value);
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return this.length;
  }

  prepend(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
    return this.length;
  }

  printList() {
    const array = [];
    let currentNode = this.head;
    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return array;
  }

  insert(index, value) {
    // type control for index
    if (typeof index !== "number") {
      console.warn("Index parameter must be a integer!");
      return false;
    }

    // insert to tail
    if (index >= this.length) {
      return this.append(value);
    }

    // insert to head
    if (index <= 0) {
      return this.prepend(value);
    }

    const newNode = new Node(value); // new Node
    const preNode = this._traverseToIndex(index - 1); // previous Node of new Node
    const nextNode = preNode.next; // Node of Index will ne next Node
    preNode.next = newNode;
    newNode.next = nextNode;

    this.length++;
    return this.length;
  }

  remove(index) {
    // type control for index
    if (typeof index !== "number") {
      console.warn("Index parameter must be a integer!");
      return false;
    }

    // out of range of the list
    if (index < 0 || index > this.length - 1) {
      console.warn(
        `Index(${index}) is out of range([0, ${this.length - 1}]) of the list!`
      );
      return false;
    }

    // remove the head node
    if (index === 0) {
      this.head = this.head.next;
    }

    // remove nodes between  indexes [1, this.length - 1]
    else {
      const preNode = this._traverseToIndex(index - 1);
      const unwantedNode = preNode.next;
      preNode.next = unwantedNode.next;

      // the tail node control
      if (index === this.length - 1) {
        this.tail = preNode;
      }
    }

    this.length--;
    return this.length;
  }

  _traverseToIndex(index) {
    let currentNode = this.head;
    let counter = 0;
    while (index !== counter) {
      currentNode = currentNode.next;
      counter++;
    }
    return currentNode;
  }

  reverse() {
    let currentNode = this.head;
    let prev = null;

    // shortcut of 'currentNode !== null'
    while (currentNode) {
      const follower = currentNode.next;
      currentNode.next = prev;
      prev = currentNode;
      currentNode = follower;
    }
    this.tail = this.head;
    this.head = prev; // prev güncel head'i tutmaktadır.

    return this;
  }
}

console.log("Singly Linked List");
const myLinkedList = new LinkedList(1);

myLinkedList.append(2);
myLinkedList.append(3);
/*
myLinkedList.append(3);
myLinkedList.append(4);
myLinkedList.append(5);


console.log(myLinkedList.printList());
console.log(myLinkedList);
*/

myLinkedList.reverse();
myLinkedList.prepend(4);
myLinkedList.append(0);
console.log("\nReversed Singly Linked List");
console.log(myLinkedList.printList());
console.log(myLinkedList);

class DoublyNode {
  value;
  prev;
  next;
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  head;
  tail;
  length;

  constructor(value) {
    this.head = new DoublyNode(value);
    this.tail = this.head;
    this.length = 1;
  }

  append(value) {
    const newNode = new DoublyNode(value);
    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return this.length;
  }

  prepend(value) {
    const newNode = new DoublyNode(value);
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
    this.length++;
    return this.length;
  }

  insert(index, value) {
    // type control for index
    if (typeof index !== "number") {
      console.warn("Index parameter must be a integer!");
      return false;
    }

    // insert to head
    if (index <= 0) {
      return this.prepend(value);
    }

    // insert to tail
    if (index >= this.length) {
      return this.append(value);
    }

    // iterate from the head to index
    if (index < this.length / 2) {
      const newNode = new DoublyNode(value);
      const indexNode = this._traverseToIndexFromHead(index);
      this._updateInsertConnections(newNode, indexNode);
    }

    // iterate from the tail to index
    else {
      const newNode = new DoublyNode(value);
      const indexNode = this._traverseToIndexFromTail(index);
      this._updateInsertConnections(newNode, indexNode);
    }

    this.length++;
    return this.length;
  }

  remove(index) {
    // type control for index
    if (typeof index !== "number") {
      console.warn("Index parameter must be a integer!");
      return false;
    }

    // range control
    if (!(index >= 0 && index < this.length)) {
      console.warn(`Valid indexes are [0, ${this.length - 1}]`);
      return false;
    }

    // remove the head node
    if (index === 0) {
      if (this.length === 1) {
        return this.clear();
      }
      this.head = this.head.next;
      this.head.prev = null;
    }

    // remove the tail node
    else if (index === this.length - 1) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    // remove the node except head and tail nodes
    else {
      // iterate from the head to index
      if (index < this.length / 2) {
        const indexNode = this._traverseToIndexFromHead(index);
        this._updateRemoveConnections(indexNode);
      }
      // iterate from the tail to index
      else {
        const indexNode = this._traverseToIndexFromTail(index);
        this._updateRemoveConnections(indexNode);
      }
    }

    this.length--;
    return this.length;
  }

  _updateInsertConnections(newNode, indexNode) {
    const prevNode = indexNode.prev;
    prevNode.next = newNode;
    newNode.prev = prevNode;
    newNode.next = indexNode;
    indexNode.prev = newNode;
  }

  _updateRemoveConnections(indexNode) {
    const prevNode = indexNode.prev;
    const nextNode = indexNode.next;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }

  _traverseToIndexFromHead(index) {
    let currentNode = this.head;
    let counter = 0;
    while (index !== counter) {
      currentNode = currentNode.next;
      counter++;
    }
    return currentNode;
  }

  _traverseToIndexFromTail(index) {
    let currentNode = this.tail;
    let counter = this.length - 1;
    while (index !== counter) {
      currentNode = currentNode.prev;
      counter--;
    }
    return currentNode;
  }

  /*
  0 1 2 3 4 5 6 7 8 9 
  a b c d e f g h i j
  index < length / 2

  0 1 2 3 4 5 6 7 8
  a b c d e f g h i
  index < length / 2
  */

  reverse() {
    let currentNode = this.head;
    let temp = null;

    // Swap next and prev for all nodes
    while (currentNode !== null) {
      temp = currentNode.prev;
      currentNode.prev = currentNode.next;
      currentNode.next = temp;
      currentNode = currentNode.prev; // çünkü prev ve next yer değiştirdi
    }

    // Swap head and tail
    temp = this.head;
    this.head = this.tail;
    this.tail = temp;

    return this;
  }

  clear() {
    let currentNode = this.head;
    while (currentNode) {
      const nextNode = currentNode.next;
      currentNode.prev = null;
      currentNode.next = null;
      currentNode = nextNode;
    }
    this.head = null;
    this.tail = null;
    this.length = 0;

    console.warn("List has been fully cleared.");
    return this;
  }

  printList() {
    const array = [];
    let currentNode = this.head;
    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return array;
  }
}

console.log("Doublly Linked List");
const myDoubllyLinkedList = new DoublyLinkedList(1);
myDoubllyLinkedList.append(2);
myDoubllyLinkedList.append(3);
myDoubllyLinkedList.append(4);
myDoubllyLinkedList.append(5);

console.log(myDoubllyLinkedList.printList());
// console.log(myDoubllyLinkedList);

myDoubllyLinkedList.reverse();
console.log(myDoubllyLinkedList.printList());
console.log(myDoubllyLinkedList);

/*
myDoubllyLinkedList.insert(4, 5);
myDoubllyLinkedList.prepend("headNode");
myDoubllyLinkedList.append("lastNode");
myDoubllyLinkedList.remove(4);
myDoubllyLinkedList.remove(4);
myDoubllyLinkedList.remove(2);
myDoubllyLinkedList.remove(1);
myDoubllyLinkedList.remove(2);
myDoubllyLinkedList.remove(1);
myDoubllyLinkedList.remove(1);
myDoubllyLinkedList.remove(0);


console.log(myDoubllyLinkedList.printList());
console.log(myDoubllyLinkedList);
*/
