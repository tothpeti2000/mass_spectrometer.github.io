const ctx = canvas.getContext("2d");

export class Plate {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
