class Attractor {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.size = 30;
        this.strength = 50;
    }

    attract(particle) {
        let dir = this.pos.copy().sub(particle.pos);
        let distance = constrain(dir.mag(), 5, 100);
        dir.normalize();
        let force = this.strength / (distance * distance);
        dir.mult(force);
        return dir;
    }

    show() {
        noStroke();
        fill('#FFFACD'); // 파스텔 톤 노랑색
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}

