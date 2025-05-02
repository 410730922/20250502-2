let capture;
let graphics;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#e7c6ff');
  
  // 初始化攝影機
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide(); // 隱藏原始攝影機畫面
  
  // 初始化 graphics
  graphics = createGraphics(windowWidth * 0.8, windowHeight * 0.8);
  graphics.background(255, 204, 204); // 設定 graphics 的背景顏色
}

function draw() {
  background('#e7c6ff'); // 確保背景顏色一致
  
  // 計算影像顯示位置
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;
  
  // 更新 graphics 內容
  graphics.background(0); // 黑色背景
  let step = 20;
  let boxSize = 18;
  let circleRadius = 5;
  graphics.noStroke();
  capture.loadPixels();
  for (let i = 0; i < graphics.width; i += step) {
    for (let j = 0; j < graphics.height; j += step) {
      // 計算對應到 capture 的像素位置
      let cx = Math.floor(i * capture.width / graphics.width);
      let cy = Math.floor(j * capture.height / graphics.height);
      let idx = 4 * (cx + cy * capture.width);
      let r = capture.pixels[idx] || 0;
      let g = capture.pixels[idx + 1] || 0;
      let b = capture.pixels[idx + 2] || 0;
      // 畫方框
      graphics.fill(r, g, b);
      graphics.noStroke();
      graphics.rect(i + (step - boxSize) / 2, j + (step - boxSize) / 2, boxSize, boxSize);
      // 在方框中央畫黑色圓
      graphics.fill(0);
      graphics.ellipse(i + step / 2, j + step / 2, circleRadius * 2, circleRadius * 2);
    }
  }
  
  // 翻轉畫布以左右顛倒影像
  push();
  translate(width, 0);
  scale(-1, 1);
  
  // 先繪製 graphics
  image(graphics, x, y, capture.width, capture.height);
  // 再繪製攝影機影像
  //image(capture, x, y, capture.width, capture.height);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  graphics = createGraphics(windowWidth * 0.8, windowHeight * 0.8);
  graphics.background(255, 204, 204); // 更新 graphics 的背景大小與顏色
}
