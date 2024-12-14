let particleSystem;
let repeller, attractor;
let currentColor; // 현재 색상 (꽃잎, 봉우리)
let draggingRepeller = false; // Repeller 드래그 여부
let draggingAttractor = false; // Attractor 드래그 여부

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

    // Repeller와 Attractor가 서로 상호작용
    interactRepellerAndAttractor();

    particleSystem.run();

    // 모든 입자가 바닥에 가라앉으면 새로운 꽃잎 생성
    if (particleSystem.allParticlesSettled()) {
        particleSystem.resetParticles();
    }

    // Repeller와 Attractor 표시
    repeller.show();
    attractor.show();
}

// 두 원의 상호작용 구현
function interactRepellerAndAttractor() {
    let distance = dist(repeller.pos.x, repeller.pos.y, attractor.pos.x, attractor.pos.y);

    // 상호작용 로직 (거리 기반으로 힘 조정)
    if (distance < 200) {
        let force = map(distance, 0, 200, 50, 0); // 가까울수록 힘 증가
        let dir = repeller.pos.copy().sub(attractor.pos).normalize().mult(force);
        repeller.pos.add(dir);
        attractor.pos.sub(dir);
    }
}

// 마우스 클릭한 원 판별
function mousePressed() {
    if (dist(mouseX, mouseY, repeller.pos.x, repeller.pos.y) < repeller.size / 2) {
        draggingRepeller = true;
    } else if (dist(mouseX, mouseY, attractor.pos.x, attractor.pos.y) < attractor.size / 2) {
        draggingAttractor = true;
    }
}

// 마우스 드래그로 원 이동
function mouseDragged() {
    if (draggingRepeller) {
        repeller.pos.set(mouseX, mouseY);
    } else if (draggingAttractor) {
        attractor.pos.set(mouseX, mouseY);
    }
}

// 마우스 놓으면 드래그 상태 해제
function mouseReleased() {
    draggingRepeller = false;
    draggingAttractor = false;
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

