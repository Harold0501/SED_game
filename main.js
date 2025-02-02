export default class Main {
  constructor() {
      console.log("游戏开始！");

      this.canvas = wx.createCanvas();  // 创建 Canvas 画布
      this.ctx = this.canvas.getContext('2d');  // 获取 2D 上下文
      this.screenWidth = this.canvas.width;
      this.screenHeight = this.canvas.height;

      this.bgNum = 0;
      this.bgAssets = ['images/countryStreet.jpg', 'images/waterStreet.jpg', 'images/dogsPool.jpg', 'images/bg.jpg'];

      this.bgImage = wx.createImage();  // 创建初始界面图片对象
      wx.onTouchStart(this.handleTouchStart.bind(this));
      this.rendStarter();
  }

  rendStarter() {
    this.bgImage.src = this.bgAssets[this.bgNum];  // 设定图片路径
    this.bgImage.onload = () => {  // 确保图片加载后再绘制
      this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
      this.ctx.drawImage(this.bgImage, 0, 0, this.screenWidth, this.screenHeight); // 绘制背景

      this.ctx.font = '30px Arial';
      this.ctx.fillStyle = '#000000';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('自制小游戏', this.canvas.width / 2, this.canvas.height / 4); // 显示文字标题

      this.changeButton = {
        x: this.screenWidth - 100,  // 按钮左上角 X 坐标
        y: this.screenHeight - 100,  // 按钮左上角 Y 坐标
        width: 50,
        height: 50,
      };

      this.ctx.fillStyle = "red";
      this.ctx.fillRect(this.changeButton.x, this.changeButton.y, this.changeButton.width, this.changeButton.height);

      // this.start();
    }
  }

  start() {
      console.log("游戏初始化...");

      // 启动按钮监视
      wx.onTouchStart((event) => {
        const touch = event.touches[0]; // 获取触摸点
        const x = touch.clientX;
        const y = touch.clientY;
        
        // 检测是否点击了按钮
        if (this.isChangeButtonClicked(x, y)) {
          this.bgNum = (this.bgNum + 1) % 4;
          console.log(this.bgNum);
          this.rendStarter();
        }
      })
      // this.loop();
  }

  handleTouchStart(event) {
    const touch = event.touches[0];
    if (this.isChangeButtonClicked(touch.clientX, touch.clientY)) {
        this.bgNum = (this.bgNum + 1) % this.bgAssets.length;
        this.rendStarter();
    }
  }

  isChangeButtonClicked(x, y) {
    return (
        x >= this.changeButton.x &&
        x <= this.changeButton.x + this.changeButton.width &&
        y >= this.changeButton.y &&
        y <= this.changeButton.y + this.changeButton.height
    );
  }

}
