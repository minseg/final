let particleSystem;
let repeller, attractor;
let currentColor; // 현재 색상 (꽃잎, 봉우리)
let draggingRepeller = false; // Repeller 드래그 여부
let draggingAttractor = false; // Attractor 드래그 여부

function setup() {
    createCanvas(800, 600); // 캔버스 크기 변경

    // 초기화
    particleSystem = new ParticleSystem(createVector(width / 6, height - 150));
    repeller = new Repeller(width / 4, height / 3);
    attractor = new Attractor(3 * width / 4, height / 2);
    currentColor = '#FFD1DC'; // 초기 색상 (파스텔 톤 빨강)
}

function draw() {
    drawBackground(); // 배경 그리기

    // 텍스트 출력
    drawTitle();

    // 줄기 그리기
    stroke(50, 200, 50);
    strokeWeight(6);
    line(width / 6, height, width / 6, height - 150);

    // 꽃봉우리 그리기
    noStroke();
    fill(currentColor); // 봉우리 색상은 꽃잎 색상과 동일
    ellipse(width / 6, height - 150, 50, 50);

    // 입자 시스템 실행
    particleSystem.applyRepeller(repeller); // Repeller 적용
    particleSystem.applyAttractor(attractor); // Attractor 적용
    particleSystem.run();

    // 모든 입자가 바닥에 가라앉으면 새로운 꽃잎 생성
    if (particleSystem.allParticlesSettled()) {
        particleSystem.resetParticles();
    }

    // Repeller와 Attractor 표시
    repeller.show();
    attractor.show();
}

// 배경 그리기 (푸른 하늘과 고정된 풀)
function drawBackground() {
    // 하늘 (그라디언트)
    for (let y = 0; y < height; y++) {
        let inter = map(y, 0, height, 0, 1);
        let c = lerpColor(color(135, 206, 250), color(173, 216, 230), inter); // 하늘색 그라디언트
        stroke(c);
        line(0, y, width, y);
    }

    // 풀 (고정된 상태)
    fill(60, 179, 113); // 초록 풀 색상
    rect(0, height - 100, width, 100); // 풀 영역
    stroke(34, 139, 34); // 풀의 진한 초록색
    for (let x = 0; x < width; x += 20) {
        line(x, height - 100, x, height - 90); // 고정된 풀
    }
}

// 텍스트 출력
function drawTitle() {
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(255, 250, 250); // 파스텔 톤 흰색
    textStyle(BOLD);
    text("우리는 삶의 바람 속에서 흔적을 남긴다.", width / 2, 40); // 핵심 문장
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

