let particleSystem;
let repeller, attractor;

function setup() {
    createCanvas(windowWidth, windowHeight);

    // 입자 시스템 초기화
    particleSystem = new ParticleSystem(createVector(width / 6, height - 300));
    repeller = new Repeller(width / 4, height / 4);
    attractor = new Attractor(3 * width / 4, 3 * height / 4);
}

function draw() {
    background(240);

    // 바람의 세기에 따라 줄기 색상 변화
    let windForce = abs(repeller.strength + attractor.strength);
    let stemColor = map(windForce, 0, 100, 50, 255);

    // 줄기 그리기
    stroke(50, stemColor, 50); // 줄기 색상 동적 변화
    strokeWeight(6);
    line(width / 6, height, width / 6, height - 300);

    // 꽃봉우리 그리기
    noStroke();
    fill(255, 100, 150);
    ellipse(width / 6, height - 300, 50, 50);

    // 입자 시스템 실행
    particleSystem.applyRepeller(repeller);
    particleSystem.applyAttractor(attractor);
    particleSystem.run();

    // Repeller와 Attractor 표시
    repeller.show();
    attractor.show();
}

function mouseDragged() {
    if (mouseX < width / 2) {
        repeller.pos.set(mouseX, mouseY);
    } else {
        attractor.pos.set(mouseX, mouseY);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

