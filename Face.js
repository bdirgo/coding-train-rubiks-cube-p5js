class Face {
  constructor(normal, color) {
    this.normal = createVector(...normal);
    this.color = color;
  }

  turnZ(angle) {
      const vec = createVector();
      vec.x = round(this.normal.x * cos(angle) - this.normal.y * sin(angle));
      vec.y = round(this.normal.x * sin(angle) + this.normal.y * cos(angle));
      vec.z = round(this.normal.z);
      this.normal = vec;
  }

  turnY(angle) {
    const vec = createVector();
    vec.x = round(this.normal.x * cos(angle) - this.normal.z * sin(angle));
    vec.z = round(this.normal.x * sin(angle) + this.normal.z * cos(angle));
    vec.y = round(this.normal.y);
    this.normal = vec;
  }

  turnX(angle) {
    const vec = createVector();
    vec.y = round(this.normal.y * cos(angle) - this.normal.z * sin(angle));
    vec.z = round(this.normal.y * sin(angle) + this.normal.z * cos(angle));
    vec.x = round(this.normal.x);
    this.normal = vec;
}

  show() {
    push()
    fill(this.color);
    noStroke()
    rectMode(CENTER);
    translate(
        this.normal.x * 0.5,
        this.normal.y* 0.5,
        this.normal.z* 0.5
    )
    if (Math.abs(this.normal.x) > 0) {
        rotateY(HALF_PI)
    } else if (Math.abs(this.normal.y) > 0) {
        rotateX(HALF_PI)
    }
    square(0,0,1);
    pop()
  }
}