let particleSystem;
let repeller, attractor;

function setup() {
    createCanvas(windowWidth, windowHeight);

    // 입자 시스템 초기화
    particleSystem = new ParticleSystem(createVector(width / 6, height - 300));
}

function draw() {
    background(240);

    // 줄기와 꽃봉우리
    stroke(50, 200, 50);
    strokeWeight(6);
    line(width / 6, height, width / 6, height - 300);

    noStroke();
    fill(255, 100, 150);
    ellipse(width / 6, height - 300, 50, 50);

    // 입자 시스템 실행
    particleSystem.run();
}
