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
        // 바람의 세기에 따라 색상 변화
        let speed = this.vel.mag();
        let colorIntensity = map(speed, 0, 5, 150, 255);
        noStroke();
        fill(colorIntensity, 200, 255 - colorIntensity, 150); // 속도에 따른 색상 변화
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}

