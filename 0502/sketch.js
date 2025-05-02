let capture;

function setup() {
  // 設定畫布為全螢幕大小
  createCanvas(windowWidth, windowHeight);
  background('#e7c6ff'); // 設定背景顏色為 e7c6ff

  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始的攝影機影像
}

function draw() {
  background('#e7c6ff'); // 確保背景顏色持續更新

  // 計算影像顯示的位置，使其置中
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;

  // 繪製攝影機影像在畫布上
  image(capture, x, y, capture.width, capture.height);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
}
