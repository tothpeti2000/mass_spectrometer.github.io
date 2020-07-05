import { Particle } from "./Particle.js";
import { Capacitor } from "./Capacitor.js";
import { Plate } from "./Plate.js";
import { Vector } from "./Vector.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let plate_1 = new Plate(200, 200, 500, 10);
let plate_2 = new Plate(200, 300, 500, 10);

let capacitor = new Capacitor(10, plate_1, plate_2);
let b = 5;

capacitor.draw();

let particle = new Particle(10, 50, 5, 2.001, 0, 0, 0, 20, 10);

function clear_canvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function animation() {
  requestAnimationFrame(animation);

  for (let i = 0; i < particles.length; i++) {
    if (
      particles[i].x >= plate_1.x &&
      particles[i].x <= plate_1.x + plate_1.w &&
      particles[i].c_m == false
    ) {
      let fl = particles[i].q * particles[i].v.x * b;
      let fe = capacitor.e * particles[i].q;
      let sum_f = fl - fe;
      particles[i].a.y = sum_f / particles[i].m;
    }

    if (
      (particles[i].y >= plate_2.y &&
        particles[i].x >= plate_1.x &&
        particles[i].x <= plate_1.x + plate_1.w) ||
      (particles[i].y <= plate_1.y + plate_1.h &&
        particles[i].x >= plate_1.x &&
        particles[i].x <= plate_1.x + plate_1.w) ||
      (particles[i].x >= plate_1.x &&
        particles[i].x <= plate_1.x + plate_1.w &&
        particles[i].c_m == true)
    ) {
      particles.splice(i, 1);
    } else if (particles[i].x > plate_1.x + plate_1.w) {
      particles[i].x = plate_1.x + plate_1.w + 1;
      if (particles[i].c_set == false) {
        if (particles[i].q > 0) {
          particles[i].c = new Vector(
            plate_1.x + plate_1.w + 1,
            particles[i].y +
              Math.abs(
                (particles[i].m * particles[i].v.x) / (0.1 * particles[i].q)
              )
          );
        }

        if (particles[i].q < 0) {
          particles[i].c = new Vector(
            plate_1.x + plate_1.w + 1,
            particles[i].y -
              Math.abs(
                (particles[i].m * particles[i].v.x) / (0.1 * particles[i].q)
              )
          );
        }

        console.log(
          Math.abs((particles[i].m * particles[i].v.x) / (b * particles[i].q))
        );
        particles[i].c_set = true;
        particles[i].c_m = true;
      }
      if (
        particles[i].x >= plate_1.x &&
        particles[i].x <= plate_1.x + plate_1.w
      ) {
        particles.splice(i, 1);
      } else {
        particles[i].circular_motion(0.1);
      }
      //console.log(particles[i].x, particles[i].y);
    } else {
      particles[i].update_position();
    }

    clear_canvas();

    for (let i = 0; i < particles.length; i++) {
      particles[i].draw();
    }

    capacitor.draw();
  }
}

function random_sign() {
  let sign = Math.floor(Math.random() * 3) - 1;

  while (sign == 0) {
    sign = random_sign();
  }

  return sign;
}

let particles = [];

document.addEventListener("keypress", (key) => {
  if ((key.keycode = "Space")) {
    particles.push(
      new Particle(
        10,
        250,
        Math.floor(Math.random() * 10) + 1,
        2 + Math.random() * 0.01,
        0,
        0,
        0,
        random_sign() * 2
      )
    );

    //console.log(particles);
  }
});

requestAnimationFrame(animation);
