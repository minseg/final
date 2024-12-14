let particleSystem;
let repeller, attractor;
let currentColor; // 현재 색상 (꽃잎, 봉우리)

function setup() {
    createCanvas(windowWidth, windowHeight);

    // 초기화
    particleSystem = new ParticleSystem(createVector(width / 6, height - 300));
    repeller = new Repeller(width / 4, height / 4);
    attractor = new Attractor(3 * width / 4, height / 2);
    currentColor = '#FFD1DC'; // 초기 색상 (파스텔 톤 빨강)
}

function draw() {
    background(240);

    // 줄기 그리기
    stroke(50, 200, 50);
    strokeWeight(6);
    line(width / 6, height, width / 6, height - 300);

    // 꽃봉우리 그리기
    noStroke();
    fill(currentColor); // 봉우리 색상은 꽃잎 색상과 동일
    ellipse(width / 6, height - 300, 50, 50);

    // 입자 시스템 실행
    particleSystem.applyRepeller(repeller);
    particleSystem.applyAttractor(attractor);
    particleSystem.run();

    // 모든 입자가 바닥에 가라앉으면 새로운 꽃잎 생성
    if (particleSystem.allParticlesSettled()) {
        particleSystem.resetParticles();
    }

    // Repeller와 Attractor 표시
    repeller.show();
    attractor.show();
}

// 키보드 입력으로 바람의 세기 조정
function keyPressed() {
    if (key === 'w') {
        attractor.strength += 10;
    } else if (key === 's') {
        attractor.strength -= 10;
    } else if (key === 'a') {
        repeller.strength += 10;
    } else if (key === 'd') {
        repeller.strength -= 10;
    }

    // 색상 변경: 파스텔 톤 빨강(#FFD1DC), 초록(#DFFFD6), 노랑(#FFFACD)
    let colors = ['#FFD1DC', '#DFFFD6', '#FFFACD'];
    currentColor = colors[int(random(colors.length))];
    console.log(`Repeller Strength: ${repeller.strength}, Attractor Strength: ${attractor.strength}, Color: ${currentColor}`);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
