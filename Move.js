class Move {
    constructor(x = 0, y = 0, z = 0, dir) {
        this.angle = 0;
        this.x = x;
        this.y = y;
        this.z = z;
        this.dir = dir;
        this.isAnimating = false;
        this.isFinished = false;
    }
    start() {
        this.isAnimating = true;
        this.isFinished = false;
        this.angle = 0;
    }
    update() {
        if (this.isAnimating) {
            this.angle += this.dir * speed;
            if(abs(this.angle) > HALF_PI) {
                this.angle = 0
                this.isAnimating = false;
                if (abs(this.z) > 0) {
                    turnZ(this.z, this.dir);
                } else if (abs(this.x) > 0) {
                    turnX(this.x, this.dir);
                } else if (abs(this.y) > 0) {
                    turnY(this.y, this.dir);
                }
                this.isFinished = true;
            }
        }
    }
    finished() {
        return this.isFinished;
    }
    copy() {
        return new Move(this.x, this.y, this.z, this.dir);
    }
    reverse() {
        this.dir *= -1;
    }
}