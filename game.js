// 初始化游戏
const canvas = wx.createCanvas();
const context = canvas.getContext('2d');

// 加载背景音乐
const bgm = wx.createInnerAudioContext();
bgm.src = 'audio/bgm.mp3';
bgm.loop = true; // 循环播放

// 加载图片资源
const mainBg = wx.createImage();
mainBg.src = 'images/mainBg.png';

const enterBt = wx.createImage();
enterBt.src = 'images/enterBt.png';

const enterBtCli = wx.createImage();
enterBtCli.src = 'images/enterBt_cli.png';

const cataBg = wx.createImage();
cataBg.src = 'images/cataBg.png';

const menuBt = wx.createImage();
menuBt.src = 'images/menuBt.png';

const menuBtCli = wx.createImage();
menuBtCli.src = 'images/menuBt_cli.png';

const menuWin = wx.createImage();
menuWin.src = 'images/menuWin.png';

const cross = wx.createImage();
cross.src = 'images/cross.png';

const crossCli = wx.createImage();
crossCli.src = 'images/cross_cli.png';

const homeBt = wx.createImage();
homeBt.src = 'images/home.png';

const homeBtCli = wx.createImage();
homeBtCli.src = 'images/home_cli.png';

const musicBt = wx.createImage();
musicBt.src = 'images/music.png';

const musicBtMute = wx.createImage();
musicBtMute.src = 'images/music_mute.png';

const levelBt = wx.createImage();
levelBt.src = 'images/level.png';

const levelBtCli = wx.createImage();
levelBtCli.src = 'images/level_cli.png';

const levelBg = wx.createImage();
levelBg.src = 'images/levelBg.png';

let isMenuOpen = false;
let isCataOpen = false;
let isMainOpen = true;
let isMusicMuted = false;
let isLevelOpen = false;

// 监听按钮点击事件
function addButtonListeners() {
  canvas.addEventListener('touchstart', onTouchStart);
  canvas.addEventListener('touchend', onTouchEnd);
}

function removeButtonListeners() {
  canvas.removeEventListener('touchstart', onTouchStart);
  canvas.removeEventListener('touchend', onTouchEnd);
}

function onTouchStart(e) {
  const touch = e.touches[0];
  const x = touch.clientX;
  const y = touch.clientY;
  // click on Start Button
  if (isMainOpen && !isMenuOpen && x > canvas.width / 2 - enterBt.width / 2 && x < canvas.width / 2 + enterBt.width / 2 &&
      y > canvas.height * 2 / 3 - enterBt.height / 2 && y < canvas.height * 2 / 3 + enterBt.height / 2) {
    context.drawImage(enterBtCli, canvas.width / 2 - enterBtCli.width / 2, canvas.height * 2 / 3 - enterBtCli.height / 2);
    context.fillStyle = 'purple';
    context.fillText('Start', canvas.width / 2, canvas.height * 2 / 3 + 10);
  }
  if (x > 10 && x < 10 + menuBt.width && y > canvas.height - 10 - menuBt.height && y < canvas.height - 10) {
    context.drawImage(menuBtCli, 10, canvas.height - 10 - menuBt.height);
  }
  if (isMenuOpen && x > canvas.width / 2 + menuWin.width / 2 - cross.width && x < canvas.width / 2 + menuWin.width / 2 &&
      y > canvas.height / 2 - menuWin.height / 2 && y < canvas.height / 2 - menuWin.height / 2 + cross.height) {
    context.drawImage(crossCli, canvas.width / 2 + menuWin.width / 2 - cross.width, canvas.height / 2 - menuWin.height / 2);
  }
  if (isMenuOpen && x > canvas.width / 3 - homeBt.width / 2 && x < canvas.width / 3 + homeBt.width / 2 &&
      y > canvas.height / 2 - menuWin.height / 2 && y < canvas.height / 2 - menuWin.height / 2 + homeBt.height) {
    context.drawImage(homeBtCli, canvas.width / 3 - homeBtCli.width / 2, canvas.height / 2 - menuWin.height / 2);
  }
  if (isMenuOpen && x > canvas.width * 2 / 3 - musicBt.width / 2 && x < canvas.width * 2 / 3 + musicBt.width / 2 &&
      y > canvas.height / 2 - menuWin.height / 2 && y < canvas.height / 2 - menuWin.height / 2 + musicBt.height) {
    context.drawImage(isMusicMuted ? musicBtMute : musicBt, canvas.width * 2 / 3 - musicBt.width / 2, canvas.height / 2 - menuWin.height / 2);
  }
  if (isCataOpen && x > canvas.width / 2 - levelBt.width / 2 && x < canvas.width / 2 + levelBt.width / 2 &&
      y > canvas.height / 3 - levelBt.height / 2 && y < canvas.height / 3 + levelBt.height / 2) {
    context.drawImage(levelBtCli, canvas.width / 2 - levelBtCli.width / 2, canvas.height / 3 - levelBtCli.height / 2);
  }
}

function onTouchEnd(e) {
  const touch = e.changedTouches[0];
  const x = touch.clientX;
  const y = touch.clientY;
  // click on Start Button
  if (isMainOpen && !isMenuOpen && x > canvas.width / 2 - enterBt.width / 2 && x < canvas.width / 2 + enterBt.width / 2 &&
      y > canvas.height * 2 / 3 - enterBt.height / 2 && y < canvas.height * 2 / 3 + enterBt.height / 2) {
    isMainOpen = false;
    isCataOpen = true;
    showCataPage();
  }
  if (x > 10 && x < 10 + menuBt.width && y > canvas.height - 10 - menuBt.height && y < canvas.height - 10) {
    isMenuOpen = true;
    showMenuWindow();
  }
  if (isMenuOpen && x > canvas.width / 2 + menuWin.width / 2 - cross.width && x < canvas.width / 2 + menuWin.width / 2 &&
      y > canvas.height / 2 - menuWin.height / 2 && y < canvas.height / 2 - menuWin.height / 2 + cross.height) {
    isMenuOpen = false;
    closeMenuWindow();
  }
  if (isMenuOpen && x > canvas.width / 3 - homeBt.width / 2 && x < canvas.width / 3 + homeBt.width / 2 &&
      y > canvas.height / 2 - menuWin.height / 2 && y < canvas.height / 2 - menuWin.height / 2 + homeBt.height) {
    isMenuOpen = false;
    isMainOpen = true;
    isCataOpen = false;
    showMainPage();
  }
  if (isMenuOpen && x > canvas.width * 2 / 3 - musicBt.width / 2 && x < canvas.width * 2 / 3 + musicBt.width / 2 &&
      y > canvas.height / 2 - menuWin.height / 2 && y < canvas.height / 2 - menuWin.height / 2 + musicBt.height) {
    isMusicMuted = !isMusicMuted;
    if (isMusicMuted) {
      bgm.pause();
    } else {
      bgm.play();
    }
    showMenuWindow();
  }
  if (isCataOpen && x > canvas.width / 2 - levelBt.width / 2 && x < canvas.width / 2 + levelBt.width / 2 &&
      y > canvas.height / 3 - levelBt.height / 2 && y < canvas.height / 3 + levelBt.height / 2) {
    isCataOpen = false;
    showLevelPage();
  }
}

// 显示主页面
function showMainPage() {
  context.drawImage(mainBg, 0, 0, canvas.width, canvas.height);
  context.fillStyle = 'blue';
  context.font = '30px Arial';
  context.textAlign = 'center';
  context.fillText('SED game', canvas.width / 2, canvas.height / 3);
  context.drawImage(enterBt, canvas.width / 2 - enterBt.width / 2, canvas.height * 2 / 3 - enterBt.height / 2);
  context.fillStyle = 'pink';
  context.fillText('Start', canvas.width / 2, canvas.height * 2 / 3 + 10);
  context.drawImage(menuBt, 10, canvas.height - 10 - menuBt.height);
  addButtonListeners();
}

// 显示目录页面
function showCataPage() {
  context.drawImage(cataBg, 0, 0, canvas.width, canvas.height);
  context.drawImage(menuBt, 10, canvas.height - 10 - menuBt.height);
  addButtonListeners(); // 添加按钮监听器
  if (isMenuOpen) {
    showMenuWindow(); // 如果菜单已打开，显示菜单窗口
  }
  context.drawImage(levelBt, canvas.width / 2 - levelBt.width / 2, canvas.height / 3 - levelBt.height / 2);
}

// 显示菜单窗口
function showMenuWindow() {
  context.drawImage(menuWin, canvas.width / 2 - menuWin.width / 2, canvas.height / 2 - menuWin.height / 2);
  context.drawImage(cross, canvas.width / 2 + menuWin.width / 2 - cross.width, canvas.height / 2 - menuWin.height / 2);
  context.drawImage(homeBt, canvas.width / 3 - homeBt.width / 2, canvas.height / 2 - menuWin.height / 2);
  context.drawImage(isMusicMuted ? musicBtMute : musicBt, canvas.width * 2 / 3 - musicBt.width / 2, canvas.height / 2 - menuWin.height / 2);
}

function closeMenuWindow() {
  isMenuOpen = false;
  if (isCataOpen) {
    showCataPage();
  } else {
    if (isMainOpen) {
      showMainPage();
    }
    else {
      showLevelPage();
    }
  }
}

function showLevelPage() {
  context.drawImage(levelBg, 0, 0, canvas.width, canvas.height);
  context.drawImage(menuBt, 10, canvas.height - 10 - menuBt.height);
  addButtonListeners(); // 添加按钮监听器
  if (isMenuOpen) {
    showMenuWindow(); // 如果菜单已打开，显示菜单窗口
  }
}

// 初始化显示主页面
mainBg.onload = () => {
  showMainPage();
  bgm.play(); // 播放背景音乐
};
