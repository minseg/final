function draw() {
  background(240);

  // Repeller와 Attractor의 힘에 따라 줄기의 색상 변경
  let windForce = repeller.strength + attractor.strength;
  let stemColor = map(abs(windForce), 0, 100, 50, 255);

  // 줄기 그리기
  stroke(50, stemColor, 50); // 바람에 따라 녹색 농도 변화
  strokeWeight(6);
  line(width / 6, height, width / 6, height - 300);

  // 꽃봉우리 그리기
  noStroke();
  fill(255, 100, 150);
  ellipse(width / 6, height - 300, 50, 50);

  // 입자 시스템 실행
  particleSystem.run();

  // Repeller와 Attractor 표시
  repeller.show();
  attractor.show();
}
