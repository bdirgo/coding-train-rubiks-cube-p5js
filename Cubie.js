// Rubiks Cube 1
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.1-rubiks-cube.html
// https://youtu.be/9PGfL4t-uqE

class Cubie {
  constructor(matrix, x, y, z) {
    this.matrix = matrix;
    this.highlight = false;
    this.x = x;
    this.y = y;
    this.z = z;
    this.faces = new Array(6);

    this.faces[0] = new Face([0,0,-1], color(0,0,255));
    this.faces[1] = new Face([0,0,1], color(0,255,0));
    this.faces[2] = new Face([0,1,0], color(255));
    this.faces[3] = new Face([0,-1,0], color(255, 255, 0));
    this.faces[4] = new Face([1,0,0], color(255, 165, 0));
    this.faces[5] = new Face([-1,0,0], color(255, 0, 0));
  }
  show() {
    noFill();
    stroke(0);
    push();
    applyMatrix(this.matrix);
    box(1);
    for (const face of this.faces) {
      face.show();
    }
    pop();
  }
  update(x, y, z) {
    mat4.identity(this.matrix);
    mat4.translate(this.matrix, this.matrix, [x, y, z]);
    this.x = x;
    this.y = y;
    this.z = z;
  }
  updateFacesZ(dir) {
    for (const face of this.faces) {
      face.turnZ(dir * HALF_PI);
    }
  }
  updateFacesY(dir) {
    for (const face of this.faces) {
      face.turnY(dir * HALF_PI);
    }
  }
  updateFacesX(dir) {
    for (const face of this.faces) {
      face.turnX(dir * HALF_PI);
    }
  }
}

// translate(this.pos.x, this.pos.y, this.pos.z);
// const r = this.len / 2;

// // When this was ported, p5.js (version 1.0.0) had not yet
// // implemented support for beginShape(QUADS) in WEBGL mode.
// // See: https://github.com/processing/p5.js/issues/4401
// // So instead, we use separate shapes for each face of the cubie.

// // z-fixed
// beginShape();
// fill(colors[BCK]);
// vertex(-r, -r, -r);
// vertex(r, -r, -r);
// vertex(r, r, -r);
// vertex(-r, r, -r);
// endShape(CLOSE);

// beginShape();
// fill(colors[FRT]);
// vertex(-r, -r, r);
// vertex(r, -r, r);
// vertex(r, r, r);
// vertex(-r, r, r);
// endShape(CLOSE);

// // y-fixed
// beginShape();
// fill(colors[DWN]);
// vertex(-r, -r, -r);
// vertex(r, -r, -r);
// vertex(r, -r, r);
// vertex(-r, -r, r);
// endShape(CLOSE);

// beginShape();
// fill(colors[UPP]);
// vertex(-r, r, -r);
// vertex(r, r, -r);
// vertex(r, r, r);
// vertex(-r, r, r);
// endShape(CLOSE);

// // x-fixed
// beginShape();
// fill(colors[LFT]);
// vertex(-r, -r, -r);
// vertex(-r, r, -r);
// vertex(-r, r, r);
// vertex(-r, -r, r);
// endShape(CLOSE);

// beginShape();
// fill(colors[RGT]);
// vertex(r, -r, -r);
// vertex(r, r, -r);
// vertex(r, r, r);
// vertex(r, -r, r);
// endShape(CLOSE);

//box(this.len);