export default class Main {
  constructor() {
    console.log("游戏开始！");

    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext("2d");
    this.screenWidth = this.canvas.width;
    this.screenHeight = this.canvas.height;

    this.bgImage = wx.createImage();
    this.startButtonPic = wx.createImage();
    this.startClicked = false;

    this.isGameStarted = false;
    this.isLevelChosen = false;

    this.rendStarter();

    wx.onTouchStart(this.handleTouchStart.bind(this));
    wx.onTouchEnd(this.handleTouchEnd.bind(this));
  }

  rendStarter() {
    this.bgImage.src = "images/countryStreet.jpg";
    this.bgImage.onload = () => {
      this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
      this.ctx.drawImage(
        this.bgImage,
        0,
        0,
        this.screenWidth,
        this.screenHeight
      );

      this.ctx.font = "30px Arial";
      this.ctx.fillStyle = "#FFFFFF";
      this.ctx.textAlign = "center";
      this.ctx.fillText("SED GAME", this.canvas.width / 2, this.canvas.height / 4);

      this.startButton = {
        x: this.screenWidth / 2 - 75,
        y: this.screenHeight / 2,
        width: 150,
        height: 50,
      };

      this.drawButton();
    };
  }

  drawButton() {
    if (this.isGameStarted) return; 

    if (this.startClicked) this.startButtonPic.src = "images/startButtonClick.png";
    else this.startButtonPic.src = "images/startButtonPic.png";

    this.startButtonPic.onload = () => {
      this.ctx.drawImage(
        this.startButtonPic,
        this.screenWidth / 2 - 100,
        this.screenHeight / 2-10,
        200,
        50
      );

      this.ctx.font = "30px Arial";
      this.ctx.fillStyle = "#000000";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        "开始游戏",
        this.canvas.width / 2,
        this.canvas.height / 2 + 25
      );
    }

  }

  handleTouchStart(event) {
    if (this.isGameStarted) return;

    const touch = event.touches[0];
    if (this.isstartButtonClicked(touch.clientX, touch.clientY)) {
      this.startClicked = true;
      this.drawButton();
    }
  }

  handleTouchEnd(event) {
    if (this.isGameStarted) return;

    const touch = event.changedTouches[0];
    if (this.isstartButtonClicked(touch.clientX, touch.clientY)) {
      this.isGameStarted = true; 
      this.rendLevels(); 
    } 
  }

  rendLevels() {
    this.bgImage.src = "images/bg.jpg";
    this.bgImage.onload = () => {
      this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
      this.ctx.drawImage(
        this.bgImage,
        0,
        0,
        this.screenWidth,
        this.screenHeight
      );

      this.levels = [
        { x: 30, y: 150, width: 80, height: 80, targetBg: "images/levelBg1.jpg" },
        { x: 160, y: 150, width: 80, height: 80, targetBg: "images/levelBg2.jpg" },
        { x: 290, y: 150, width: 80, height: 80, targetBg: "images/levelBg3.jpeg" },
      ];

      this.levelImage = wx.createImage();
      this.levelImage.src = "images/levelPic.png";
      this.levelImage.onload = () => {
        this.levels.forEach((level) => {
          this.ctx.drawImage(
            this.levelImage,
            level.x,
            level.y,
            level.width,
            level.height
          );
        });
      };
    };

    if (this.isLevelChosen) return;
    wx.onTouchStart(this.handleLevelClick.bind(this));
  }

  handleLevelClick(event) {
    if (this.isLevelChosen) return;
    const touch = event.touches[0];
    const clickedLevel = this.levels.find(
      (level) =>
        touch.clientX >= level.x &&
        touch.clientX <= level.x + level.width &&
        touch.clientY >= level.y &&
        touch.clientY <= level.y + level.height
    );

    if (clickedLevel) {
      this.isLevelChosen = true;
      this.bgImage.src = clickedLevel.targetBg;
      this.bgImage.onload = () => {
        this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
        this.ctx.drawImage(
          this.bgImage,
          0,
          0,
          this.screenWidth,
          this.screenHeight
        );
      };
    }
  }

  isstartButtonClicked(x, y) {
    if (!this.startButton) return false; 
    return (
      x >= this.startButton.x &&
      x <= this.startButton.x + this.startButton.width &&
      y >= this.startButton.y &&
      y <= this.startButton.y + this.startButton.height
    );
  }
}
