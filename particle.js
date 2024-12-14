class Particle {
    constructor(position) {
        this.pos = position.copy();
        this.vel = createVector(random(-1, 1), random(-1, 1));
        this.acc = createVector(0, 0);
        this.size = random(20, 40); // 입자 크기
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    show() {
        noStroke();
        fill(150, 100, 255, 100); // 궤적을 위한 투명도 설정
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}
