// Linear Data Structures
// Stacks and Queues

// Stacks principle is LIFO (Last In First Out)
// Queues principle is FIFO (First In Firs Out)

// Stacks should be created with array. Because we add(push) an item end of the array and remove(pop) an item end of the array. These operations are so fast. --> BIG O(1). But can be implemented with singly linked list:)

// Queues should be created with signly linked list.

// Implement Stack Using Singly Linked List
class Node {
  value;
  next;
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  top;
  bottom;
  length;
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }

  peek() {
    return this.top;
  }

  push(value) {
    const newItem = new Node(value);
    if (this.length) {
      newItem.next = this.top;
      this.top = newItem;
    } else {
      this.top = newItem;
      this.bottom = newItem;
    }
    this.length++;
    return this.length;
  }

  pop() {
    if (!this.length) return null;

    const popped = this.top;
    this.top = this.top.next;
    this.length--;

    if (!this.length) this.bottom = null;

    return popped;
  }

  isEmpty() {
    return this.length ? false : true;
  }
}

/*
const myStack = new Stack();
myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.push(4);

myStack.pop();
myStack.pop();
myStack.pop();
myStack.pop();

console.log(myStack.peek());
console.log(myStack);
console.log(myStack.isEmpty());
*/

// Implement Stack Using Array
class Stack2 {
  data;
  constructor() {
    this.data = [];
  }

  peek() {
    return this.data[this.data.length - 1] ?? null;
  }

  push(value) {
    this.data.push(value);
    return this.data.length;
  }

  pop() {
    if (this.data.length) {
      const popped = this.data[this.data.length - 1];
      this.data.pop();
      return popped;
    }
    return null;
  }

  isEmpty() {
    return this.data.length ? false : true;
  }
}

// Implement Queue Using Singly Linked List
class Queue {
  first;
  last;
  length;
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  peek() {
    return this.first;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (this.length) {
      this.last.next = newNode;
      this.last = newNode;
    } else {
      this.first = newNode;
      this.last = newNode;
    }
    this.length++;
    return this.length;
  }

  dequeue() {
    let removed = null;

    if (!this.length) {
      return removed;
    } else {
      removed = this.first;
      this.first = this.first.next;
    }
    this.length--;

    if (!this.length) {
      this.last = null;
    }

    return removed;
  }

  isEmpty() {
    return this.length ? false : true;
  }
}

// Implement Queue Using Stack(Array)
class Queue2 {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  enqueue(value) {
    this.inStack.push(value);
  }

  dequeue() {
    if (!this.outStack.length) {
      while (this.inStack.length) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack.pop() ?? null;
  }

  peek() {
    if (!this.outStack.length) {
      while (this.inStack.length) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack[this.outStack.length - 1] ?? null;
  }

  isEmpty() {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }
}

const myQueue = new Queue2();

myQueue.enqueue(1);
myQueue.enqueue(2);
myQueue.enqueue(3);
myQueue.enqueue(4);
myQueue.enqueue(5);
myQueue.enqueue(6);

//console.log(myQueue.peek());

console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());

console.log(myQueue.isEmpty());

console.log(myQueue);
