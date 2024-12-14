class Repeller {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.size = 30;
        this.strength = -50;
    }

    repel(particle) {
        let dir = particle.pos.copy().sub(this.pos);
        let distance = constrain(dir.mag(), 5, 100);
        dir.normalize();
        let force = this.strength / (distance * distance);
        dir.mult(force);
        return dir;
    }

    show() {
        noStroke();
        fill(255, 0, 0, 150);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}
