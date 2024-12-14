class Particle {
    constructor(position) {
        this.pos = position.copy();
        this.vel = createVector(random(-1, 1), random(-1, 1));
        this.acc = createVector(0, 0);
        this.size = random(20, 40); // 입자 크기
        this.angle = random(TWO_PI); // 입자의 회전 각도
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
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle); // 입자 회전
        this.drawPetal(this.size); // 꽃잎 도형 그리기
        pop();
    }

    drawPetal(size) {
        // 꽃잎 도형 그리기
        beginShape();
        fill(255, 100, 150, 200); // 꽃잎 색상
        noStroke();
        vertex(0, -size / 2); // 위쪽 점
        vertex(size / 4, 0); // 오른쪽 곡선
        vertex(0, size / 2); // 아래쪽 점
        vertex(-size / 4, 0); // 왼쪽 곡선
        endShape(CLOSE);
    }
}


