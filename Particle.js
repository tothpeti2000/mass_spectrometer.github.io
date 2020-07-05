import { Vector } from "./Vector.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export class Particle {
  constructor(x, y, m, v_x, v_y, a_x, a_y, q) {
    this.x = x;
    this.y = y;
    this.m = m;
    this.v = new Vector(v_x, v_y);
    this.a = new Vector(a_x, a_y);
    this.q = q;
    this.r = 0.8 * this.m;
    this.c_set = false;
    this.c;
    this.theta = -Math.PI / 2;
    this.c_m = false;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    if (this.q > 0) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "blue";
    }
    ctx.fill();
  }

  update_position() {
    this.v.x += this.a.x;
    this.v.y += this.a.y;

    this.x += this.v.x;
    this.y += this.v.y;
  }

  circular_motion(b) {
    let r = Math.abs((this.m * this.v.x) / (b * this.q));

    //console.log(this.c);

    console.log(this.q);

    this.x = this.c.x + r * Math.cos(this.theta);

    if (this.q > 0) {
      this.y = this.c.y + r * Math.sin(this.theta);
    }

    if (this.q < 0) {
      this.y = this.c.y - r * Math.sin(this.theta);
    }

    this.theta += Math.PI / 180;
  }
}
