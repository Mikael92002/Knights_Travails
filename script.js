//edge list, add a third element to add weight to the edge/line, do only the ones
// that the knight can go on:
// EDGES ARE VALID KNIGHT MOVES BETWEEN VERTICES
// Vertices are all coordinates [x,y]
edgeList = [];

//This creates vertices:
// for(let i = 0;i<8;i++){
//     for(let j = 0;j<8;j++){
//         edgeList.push([i,j]);
//     }
// }

class Node {
  x;
  y;
  currentMoves;
  prevNode;

  constructor(x, y, currentMoves, prevNode) {
    this.x = x;
    this.y = y;
    this.currentMoves = currentMoves;
    this.prevNode = prevNode;
  }

  toString() {
    return `[${this.x},${this.y}]`;
  }
}

function createEdges(knight) {
  edgeList = [];
  //Right side:
  if (knight.x + 2 <= 7 && knight.y + 1 <= 7) {
    edgeList.push([knight.x + 2, knight.y + 1]);
  }
  if (knight.x + 2 <= 7 && knight.y - 1 >= 0) {
    edgeList.push([knight.x + 2, knight.y - 1]);
  }
  if (knight.x + 1 <= 7 && knight.y + 2 <= 7) {
    edgeList.push([knight.x + 1, knight.y + 2]);
  }
  if (knight.x + 1 <= 7 && knight.y - 2 >= 0) {
    edgeList.push([knight.x + 1, knight.y - 2]);
  }

  //Left side:
  if (knight.x - 2 >= 0 && knight.y + 1 <= 7) {
    edgeList.push([knight.x - 2, knight.y + 1]);
  }
  if (knight.x - 2 >= 0 && knight.y - 1 >= 0) {
    edgeList.push([knight.x - 2, knight.y - 1]);
  }
  if (knight.x - 1 >= 0 && knight.y + 2 <= 7) {
    edgeList.push([knight.x - 1, knight.y + 2]);
  }
  if (knight.x - 1 >= 0 && knight.y - 2 >= 0) {
    edgeList.push([knight.x - 1, knight.y - 2]);
  }
}

knightNode = new Node(3, 3, 0, null);

function knightMoves(from, to) {
    from = new Node(from[0], from[1], 0, null);
    q = [from];
    visitedPoints = [];
    solStack = [];

  while (q.length > 0) {
    currNode = q.shift();

    if (currNode.toString() === `[${to}]`) {
      console.log("we got em boss");
    //   console.log(currNode.toString());
    solStack.push(currNode)

      while (currNode.prevNode !== null) {
        currNode = currNode.prevNode;
        // console.log(currNode.toString());
        solStack.push(currNode);
      }
    }

    createEdges(currNode);

    for (let arr of edgeList) {
      if (compareArrPoints(arr, visitedPoints) !== false) {
        q.push(new Node(arr[0], arr[1], currNode.currentMoves + 1, currNode));
      }
      if (compareArrPoints(arr, visitedPoints) === true) {
        visitedPoints.push(arr);
      }
    }
  }

  console.log(`You did it in ${solStack[0].currentMoves} moves!`);
  for(let i = solStack.length-1;i>=0;i--){
    console.log(solStack[i].toString());
  }

  function compareArrPoints(edgeArrValue, visitedArr) {
    for (let values of visitedArr) {
      if (edgeArrValue[0] === values[0] && edgeArrValue[1] === values[1]) {
        //   console.log(
        //     `edgeArr values: ${edgeArrValue[0]}, ${edgeArrValue[1]}, visited values: ${values[0]}, ${values[1]}`
        //   );
        return false;
      }
    }
    return true;
  }
}

knightMoves([0,0], [7,7]);

// createEdges(knightNode);
// console.log(edgeList);
