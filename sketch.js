let capture;
let graphics;

function setup() {
  // 設定畫布為全螢幕大小
  createCanvas(windowWidth, windowHeight);
  background('#e7c6ff'); // 設定背景顏色為 e7c6ff

  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始的攝影機影像

  // 建立與攝影機影像相同大小的圖形
  graphics = createGraphics(capture.width*0.8, capture.height*0.8);
  updateGraphics(); // 初始化 graphics 的內容
}

function draw() {
  background('#e7c6ff'); // 確保背景顏色持續更新

  // 計算影像顯示的位置，使其置中
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;

  // 顯示圖形在視訊畫面的上方
  image(graphics, x, y - capture.height); // 將圖形顯示在視訊畫面上方

  // 翻轉畫布以水平翻轉影像
  push();
  translate(width, 0); // 將畫布原點移到右上角
  scale(-1, 1); // 水平翻轉畫布
  image(capture, x, y, capture.width, capture.height);
  pop();

  // 動態更新 graphics 的內容
  updateGraphics();
}

function updateGraphics() {
  graphics.background(0); // 設定背景為黑色

  // 每隔 20 單位繪製一個圓
  for (let i = 0; i < graphics.width; i += 20) {
    for (let j = 0; j < graphics.height; j += 20) {
      // 從 capture 中取得相對應位置的顏色
      let col = capture.get(i, j);

      // 繪製圓形
      graphics.fill(col);
      graphics.noStroke();
      graphics.ellipse(i + 10, j + 10, 15, 15); // 圓的中心點偏移 10，大小為 15
    }
  }
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);

  // 重新調整圖形大小
  graphics = createGraphics(capture.width, capture.height);
  updateGraphics(); // 更新 graphics 的內容
}
