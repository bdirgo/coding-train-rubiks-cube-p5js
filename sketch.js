// Rubiks Cube 1
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.1-rubiks-cube.html
// https://youtu.be/9PGfL4t-uqE

// Since PeasyCam is only for Java, this instead uses p5.EasyCam,
// which is based on PeasyCam but is made for p5.js.
// It can be found here: https://github.com/freshfork/p5.EasyCam

let cam;

const dim = 3;
const cube = new Array(dim*dim*dim);
const allMoves = [
  new Move(0,1,0,1),
  new Move(0,1,0,-1),
  new Move(0,-1,0,1),
  new Move(0,-1,0,-1),
  new Move(1,0,0,1),
  new Move(1,0,0,-1),
  new Move(-1,0,0,1),
  new Move(-1,0,0,-1),
  new Move(0,0,1,1),
  new Move(0,0,1,-1),
  new Move(0,0,-1,1),
  new Move(0,0,-1,-1),
]
const numMoves = 50;
const speed = 0.15;
let sequenceOfMoves = [];
let counter = 0;
let startMoving = false;
let currentMove;

function setup() {
  // Disable the context menu on the canvas so the camera can use the right mouse button
  createCanvas(600, 600, WEBGL).elt.oncontextmenu = () => false;
  glMatrix.glMatrix.setMatrixArrayType(Array)

  cam = createEasyCam({ distance: 400 });
  let index = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const matrix = mat4.create();
        mat4.translate(matrix, matrix, [x,y,z])
        cube[index] = new Cubie(matrix, x,y,z);
        index++;
      }
    }
  }
  for (let index = 0; index < numMoves; index++) {
    const r = int(random(allMoves.length));
    const m = allMoves[r]
    sequenceOfMoves.push(m);
  }
  currentMove = sequenceOfMoves[counter];
  for (let index = sequenceOfMoves.length - 1; index >= 0; index--) {
    const nextMove = sequenceOfMoves[index].copy();
    nextMove.reverse();
    sequenceOfMoves.push(nextMove);
  }
}

function flipDirection(char) {
  if (char === char.toUpperCase()) {
    return char.toLowerCase();
  }
  return char.toUpperCase();
}

function Mat2dStr(a) {
  return `
  ${a[0]}, ${a[1]}, 0
  ${a[2]}, ${a[3]}, 0
  ${a[4]}, ${a[5]}, 1
  `
}
function Mat3Str(a) {
  return `
  ${a[0]}, ${a[1]}, ${a[2]}
  ${a[3]}, ${a[4]}, ${a[5]}
  ${a[6]}, ${a[7]}, ${a[8]}
  `
}
function Mat4Str(a) {
  return `
  ${a[0]}, ${a[1]}, ${a[2]}, ${a[3]}
  ${a[4]}, ${a[5]}, ${a[6]}, ${a[7]}
  ${a[8]}, ${a[9]}, ${a[10]}, ${a[11]},
  `
}
function justShowMe(a) {
  // returns the "tx", and "ty" of a mat2d matrix array
  return `
  ${a[4]}, ${a[5]}
  `
}

function turnX(xIndex, dir) {
  for (let index = 0; index < cube.length; index++) {
    const cubie = cube[index];
    if (cubie.x == xIndex) {
      const matrix = mat2d.create();
      mat2d.rotate(matrix, matrix, dir * HALF_PI);
      mat2d.translate(matrix, matrix, [cubie.y, cubie.z]);
      // tx = a[4], ty = a[5]
      cubie.update(
        cubie.x,
        round(matrix[4]),
        round(matrix[5])
      );
      cubie.updateFacesX(dir);
    }
  }
}

function turnY(yIndex, dir) {
  for (let index = 0; index < cube.length; index++) {
    const cubie = cube[index];
    if (cubie.y == yIndex) {
      const matrix = mat2d.create();
      mat2d.rotate(matrix, matrix, dir * HALF_PI);
      mat2d.translate(matrix, matrix, [cubie.x, cubie.z]);
      // tx = a[4], ty = a[5]
      cubie.update(
        Math.round(matrix[4]),
        cubie.y,
        Math.round(matrix[5])
      );
      cubie.updateFacesY(dir);
    }
  }
}

function turnZ(zIndex, dir) {
  for (let index = 0; index < cube.length; index++) {
    const cubie = cube[index];
    if (cubie.z == zIndex) {
      // console.log("%i, %i", cubie.x, cubie.y);
      const matrix = mat2d.create();
      mat2d.rotate(matrix, matrix, dir * HALF_PI);
      mat2d.translate(matrix, matrix, [cubie.x, cubie.y]);
      // console.log(justShowMe(matrix.map(Math.round)))
      // tx = a[4], ty = a[5]
      cubie.update(
        Math.round(matrix[4]),
        Math.round(matrix[5]),
        cubie.z
      );
      cubie.updateFacesZ(dir);
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    currentMove.start()
  }
}

function applyMove(move) {
  switch (move) {
    case 'f':
      turnZ(-1, 1);
      break;
    case 'F':
      turnZ(-1, -1);
      break;
    case 'b':
      turnZ(1, 1);
      break;
    case 'B':
      turnZ(1, -1);
      break;  

    case 'u':
      turnY(1, 1);
      break;
    case 'U':
      turnY(1, -1);
      break; 
    case 'd':
      turnY(-1, 1);
      break;
    case 'D':
      turnY(-1, -1);
      break;   

    case 'l':
      turnX(-1, 1);
      break;
    case 'L':
      turnX(-1, -1);
      break; 
    case 'r':
      turnX(1, 1);
      break;
    case 'R':
      turnX(1, -1);
      break; 

    default:
      break;
  }
}

function draw() {
  background(51);
  rotateX(-0.5);
  rotateY(0.7);
  rotateZ(0.1);


  currentMove.update()
  if (currentMove.finished()) {
    if (counter < sequenceOfMoves.length - 1) {
      counter++
      currentMove = sequenceOfMoves[counter];
      currentMove.start()
    }
  }

  scale(50)
  for (let i = 0; i < cube.length; i++) {
    const cubie = cube[i];
    push()
    if (abs(cubie.z) > 0 && cubie.z == currentMove.z) {
      rotateZ(currentMove.angle);
    } else if (abs(cubie.x) > 0 && cubie.x == currentMove.x) {
      rotateX(currentMove.angle);
    } else if (abs(cubie.y) > 0 && cubie.y == currentMove.y) {
      rotateY(-currentMove.angle);
    }
    cubie.show();
    pop();
  }
}
