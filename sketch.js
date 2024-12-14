function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(240);

  // 줄기 그리기
  stroke(50, 200, 50);
  strokeWeight(6);
  line(width / 6, height, width / 6, height - 300);

  // 꽃봉우리 그리기
  noStroke();
  fill(255, 100, 150);
  ellipse(width / 6, height - 300, 50, 50);
}
