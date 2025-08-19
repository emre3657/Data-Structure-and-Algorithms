// Graph (Diagram) Data Structure
/*
  Node or Vertex
  Edge: Is every path between linked 2 nodes.
  Trees are a type of Graph.
  
  - Graph Types -
  Directed: One way to go a node, then you can not come back.
  Undirected: Can be gone forward and came back. 
  Cyclic: Connections of Nodes create a circular structure.
  Acyclic: Not a circular structure.
  Weighted: Edges takes a value. Exp: Google maps uses to calculate the shortest road.
  Unweighted: Edges has no values.
*/

/*             edge
           2 -------- 0(node-vertex)
          / \  
         /   \
        1-----3

  3 ways to create a Graph data structure:

  1) Edge List(Kenar Listesi)
  const graph = [[0, 2], [2, 1], [2, 3], [1, 3]];

  2) Adjacent List(Bitişik(Vertex) Listesi)
  const graph = [[2], [2, 3], [0, 1, 3], [1, 2]];

  3) Adjacent Matrix(Bitişik Matrisi)
  cosnt graph = [
    [0, 0, 1, 0],
    [0, 0, 1, 1],
    [1, 1, 0, 1],
    [0, 1, 1, 0]
  ];
*/

// Implement Graph Data Structure
class Graph {
  numberOfNode;
  adjacentList;
  constructor() {
    this.numberOfNode = 0;
    this.adjacentList = {};
  }

  addVertex(node) {
    this.adjacentList[node] = [];
    this.numberOfNode++;
  }

  addEdges(node1, node2) {
    if (!this.adjacentList[node1] || !this.adjacentList[node2]) {
      console.warn(`${node1} or ${node2} not found!`);
      return null;
    }
    this.#connectNodes(node1, node2);

    return true;
  }

  #connectNodes(node1, node2) {
    const valueOfNode1 = this.adjacentList[node1];
    const valueOfNode2 = this.adjacentList[node2];

    const foundNode1 = valueOfNode1.includes(node2);
    const foundNode2 = valueOfNode2.includes(node1);

    if (!foundNode2) valueOfNode1.push(node2);
    if (!foundNode1) valueOfNode2.push(node1);

    console.log("Nodes was connected each other");
  }

  showConnections() {
    const allNodes = Object.keys(this.adjacentList);

    for (let node of allNodes) {
      const connections = this.adjacentList[node].join(", ");
      console.log(`${node} --> ${connections}`);
    }
  }
}

const myGraph = new Graph();
myGraph.addVertex(0);
myGraph.addVertex(1);
myGraph.addVertex(2);
myGraph.addVertex(3);
myGraph.addVertex(4);
myGraph.addVertex(5);
myGraph.addVertex(6);
myGraph.addEdges(1, 3);
myGraph.addEdges(1, 0);
myGraph.addEdges(1, 2);
myGraph.addEdges(3, 4);
myGraph.addEdges(0, 2);
myGraph.addEdges(4, 5);
myGraph.addEdges(2, 4);
myGraph.addEdges(5, 6);

myGraph.showConnections();
