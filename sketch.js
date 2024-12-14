let particleSystem;
let repeller, attractor;

function setup() {
    createCanvas(windowWidth, windowHeight);

    particleSystem = new ParticleSystem(createVector(width / 6, height - 300));
    repeller = new Repeller(width / 4, height / 4);
    attractor = new Attractor(3 * width / 4, 3 * height / 4);
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

    // Repeller와 Attractor
    repeller.show();
    attractor.show();

    // 입자 시스템
    particleSystem.run();
}

