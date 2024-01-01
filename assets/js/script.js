/*---------------Home--------------------*/

function Particle(x, y, radius) {
  this.init(x, y, radius);
}

Particle.prototype = {
  init: function (x, y, radius) {
    this.alive = true;

    this.radius = radius || 20;
    this.wander = 0.15;
    this.theta = random(TWO_PI);
    this.drag = 0.92;
    this.color = "#fff";

    this.x = x || 0.0;
    this.y = y || 0.0;

    this.vx = 0.0;
    this.vy = 0.0;
  },

  move: function () {
    this.x += this.vx;
    this.y += this.vy;

    this.vx *= this.drag;
    this.vy *= this.drag;

    this.theta += random(-0.5, 0.5) * this.wander;
    this.vx += sin(this.theta) * 0.1;
    this.vy += cos(this.theta) * 0.1;

    this.radius *= 0.95;
    this.alive = this.radius > 0.5;
  },

  draw: function (ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

var MAX_PARTICLES = 300;
var COLOURS = [
  "#8652E5",
  "#AB51E4",
  "#AB51E4",
  "#D151E4",
  "#E451D3",
  "#A47DEA",
  "#B492F0",
];

var particles = [];
var pool = [];

var demo = Sketch.create({
  container: document.getElementById("container"),
  retina: "auto",
});

demo.setup = function () {
  // Set off some initial particles.
  var i, x, y;

  for (i = 0; i < 20; i++) {
    x = demo.width * 0.5 + random(-100, 100);
    y = demo.height * 0.5 + random(-100, 100);
    demo.spawn(x, y);
  }
};

demo.spawn = function (x, y) {
  var particle, theta, force;

  if (particles.length >= MAX_PARTICLES) pool.push(particles.shift());

  particle = pool.length ? pool.pop() : new Particle();
  particle.init(x, y, random(5, 40));

  particle.wander = random(0.5, 2.0);
  particle.color = random(COLOURS);
  particle.drag = random(0.9, 0.99);

  theta = random(TWO_PI);
  force = random(2, 8);

  particle.vx = sin(theta) * force;
  particle.vy = cos(theta) * force;

  particles.push(particle);
};

demo.update = function () {
  var i, particle;

  for (i = particles.length - 1; i >= 0; i--) {
    particle = particles[i];

    if (particle.alive) particle.move();
    else pool.push(particles.splice(i, 1)[0]);
  }
};

demo.draw = function () {
  demo.globalCompositeOperation = "lighter";

  for (var i = particles.length - 1; i >= 0; i--) {
    particles[i].draw(demo);
  }
};

demo.mousemove = function () {
  var particle, theta, force, touch, max, i, j, n;

  for (i = 0, n = demo.touches.length; i < n; i++) {
    (touch = demo.touches[i]), (max = random(1, 4));
    for (j = 0; j < max; j++) {
      demo.spawn(touch.x, touch.y);
    }
  }
};

// Header text animation
const headText1 = document.querySelector(".headText1");
headText1.innerHTML = headText1.textContent.replace(/\S/g, "<span>$&</span>");

const headText2 = document.querySelector(".headText2");
headText2.innerHTML = headText2.textContent.replace(/\S/g, "<span>$&</span>");

const headText3 = document.querySelector(".headText3");
headText3.innerHTML = headText3.textContent.replace(/\S/g, "<span>$&</span>");

anime
  .timeline({
    loop: false,
  })

  .add({
    targets: ".headText1 span",
    scale: [50, 1],
    opacity: [0, 1],
    easing: "easeInOutExpo",
    duration: 1000,
    delay: anime.stagger(100),
    delay: 1000,
  })

  .add({
    targets: ".headText2 span",
    scale: [60, 1],
    opacity: [0, 1],
    easing: "easeInOutExpo",
    duration: 500,
    delay: anime.stagger(150),
  })

  .add({
    targets: ".headText3 span",
    scale: [60, 1],
    opacity: [0, 1],
    easing: "easeInOutExpo",
    duration: 500,
    delay: anime.stagger(150),
  });

//Button animation
anime
  .timeline({
    loop: false,
  })

  .add({
    targets: "#contactBtn",
    translateX: [-500, 0],
    opacity: [0, 1],
    zIndex: {
      value: [1000, 1000],
      round: true,
    },
    easing: "easeOutExpo",
    delay: 7500,
    duration: 1000,
  });

//Navbar animation

$(document).ready(function () {
  $(window).on("scroll", function () {
    var link = $("#navbar a.navLinks");
    var top = $(window).scrollTop();

    $(".sec").each(function () {
      var id = $(this).attr("id");
      var height = $(this).height();
      var offset = $(this).offset().top - 200;
      if (top >= offset && top < offset + height) {
        link.removeClass("active");
        $("#navbar")
          .find('[data-scroll="' + id + '"]')
          .addClass("active");
      }
    });
  });
});

//Scrollbar animation

let progress = document.getElementById("progressbar");
let totalHeight = document.body.scrollHeight - window.innerHeight;

window.onscroll = function () {
  let progressHeight = (window.pageYOffset / totalHeight) * 100;
  progress.style.height = progressHeight + "%";
};

//Button animation

const btn = document.querySelector(".btn");
btn.onmousemove = function (e) {
  const x = e.pageX - btn.offsetLeft;
  const y = e.pageY - btn.offsetTop;

  btn.style.setProperty("--x", x + "px");
  btn.style.setProperty("--y", y + "px");
};

// About Text animation

const text = document.querySelector(".aboutSubText");
text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");

const animation = anime.timeline({
  targets: ".aboutSubText span",
  easing: "easeInOutExpo",
  loop: false,
});

animation.add({
  rotate: function () {
    return anime.random(-360, 360);
  },
  translateY: function () {
    return anime.random(-200, 200);
  },
  delay: 0,
  duration: 0,
});

function ani() {
  animation.add({
    rotate: 0,
    translateX: 0,
    translateY: 0,
    delay: anime.stagger(20),
    duration: 4000,
  });
  ani = function () {};
}

$(document).ready(function () {
  $(window).on("scroll", function myScroll() {
    if (window.pageYOffset > 300) {
      ani();
    }
  });
});

// Skills animation

let frontEnd = document.getElementById("frontEnd");
let backEnd = document.getElementById("backEnd");

function frontEndAni() {
  frontEnd.style.width = "90%";
}

function backEndAni() {
  backEnd.style.width = "60%";
}

$(document).ready(function () {
  $(window).on("scroll", function skillScroll() {
    if (window.pageYOffset > 2450) {
      frontEndAni();
      backEndAni();
    }
  });
});

//Back to top button
let backTop = document.getElementById("backTop");

function backTopShow() {
  backTop.style.opacity = "1";
  backTop.style.right = "20px";
}

function backTopHide() {
  backTop.style.opacity = "0";
  backTop.style.right = "0px";
}

$(document).ready(function () {
  $(window).on("scroll", function skillScroll() {
    if (window.pageYOffset > 250) {
      backTopShow();
    }
    if (window.pageYOffset < 250) {
      backTopHide();
    }
  });
});
