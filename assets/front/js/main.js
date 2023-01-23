// SECTION 1
let title = document.getElementById("title");
let starsImage = document.getElementById("starsImage");
let moon = document.getElementById("moon");

$(".parallax-item").each(function () {
  $(this).parallax();
});

// let mountain1 = document.getElementById('mountain1');
// let mountain2 = document.getElementById('mountain2');
// let mountain3 = document.getElementById('mountain3');
// let mountain4 = document.getElementById('mountain4');
// let mountain5 = document.getElementById('mountain5');

// let cloudcenter = document.getElementById('cloudcenter');
// let cloudleft = document.getElementById('cloudleft');
// let cloudright = document.getElementById('cloudright');

window.addEventListener("scroll", function () {
  let value = window.scrollY;
  starsImage.style.top = value * 0.3 + "px";
  title.style.top = value * 0.2 + "px";
  moon.style.top = value * 0.5 + "px";

  if (value >= 606 && value <= 700) {
    setAnimationSaxx("saxx", "saxx heartBeat");
  }
  // mountain1.style.bottom = value * 0.10 - 100 + 'px';
  // mountain2.style.left = -value * 0.10 + 'px';
  // mountain3.style.left = -value * 0.15 + 'px';
  // mountain4.style.bottom = value * 0.10 + 'px';

  // cloudcenter.style.bottom = (-value * 0.20) - 550 + 'px';
  // cloudleft.style.left = -value * 0.10 + 'px';
  // cloudright.style.right = -value * 0.10 + 'px';
});

// SECTION PANEL
TweenLite.defaultEase = Linear.easeNone;
var controller = new ScrollMagic.Controller();
var tl = new TimelineMax();
tl.from("section.panel.section3", 1, { xPercent: 150 });
tl.from("section.panel.section4", 1, { xPercent: -150 });
// tl.from("section.panel.section5", 1, { yPercent: 150 });

new ScrollMagic.Scene({
  triggerElement: "#pinMaster",
  triggerHook: "onLeave",
  duration: "200%",
})
  .setPin("#pinMaster")
  .setTween(tl)
  /*.addIndicators({
        colorTrigger: "white",
        colorStart: "white",
        colorEnd: "white",
        indent: 40
    })*/
  .addTo(controller);

// SECTION 2
setSaxxMouseEffect("saxx", "saxx heartBeat", "black", "red");

// SECTION 3
const $cursor = document.querySelector(".cursor__circle");
const $hover = document.querySelectorAll(".text-hover-negative");
document
  .querySelector(".text-hover-negative")
  .addEventListener("mousemove", onMouseMove);
for (let i = 0; i < $hover.length; i++) {
  $hover[i].addEventListener("mouseenter", onMouseHover);
  $hover[i].addEventListener("mouseleave", onMouseHoverOut);
}
function onMouseMove(e) {
  TweenMax.to($cursor, 0, {
    x: e.pageX - $(document).scrollLeft() - 30,
    y: e.pageY - $(document).scrollTop() - 30,
  });
}
function onMouseHover() {
  $(".cursor").show();
  $(".cursor__circle").show();
  $(".text-hover-negative").addClass("hide-cursor");
  TweenMax.to($cursor, 0.4, {
    scale: 2,
  });
}
function onMouseHoverOut() {
  $(".text-hover-negative").removeClass("hide-cursor");
  TweenMax.to($cursor, 0.4, {
    scale: 0,
  });
}

// SECTION 4
const myTags = [
  "HTML",
  "CSS",
  "JavaScript",
  "jQuery",
  "MySQL",
  "PHP",
  "Laravel",
  "React JS",
  "React Native",
  "Java",
  "Android Java",
  "MsSQL",
  "Golang",
  "git",
  "Photoshop",
];
var tagCloud = TagCloud(".content-sphere", myTags, {
  // radius in px
  radius: 300,

  // animation speed
  // slow, normal, fast
  maxSpeed: "fast",
  initSpeed: "fast",

  // 0 = top
  // 90 = left
  // 135 = right-bottom
  direction: 135,

  // interact with cursor move on mouse out
  keep: true,
});
setSaxxMouseEffect("saxx2", "saxx heartBeat", "#2596be", "green");

setSaxxMouseEffect("saxx3", "saxx heartBeat", "white", "green");

// SECTION 5
// var images = [
//   "https://scrollmagic.io/assets/img/example_imagesequence_01.png",
//   "https://scrollmagic.io/assets/img/example_imagesequence_02.png",
//   "https://scrollmagic.io/assets/img/example_imagesequence_03.png",
//   "https://scrollmagic.io/assets/img/example_imagesequence_04.png",
//   "https://scrollmagic.io/assets/img/example_imagesequence_05.png",
//   "https://scrollmagic.io/assets/img/example_imagesequence_06.png",
//   "https://scrollmagic.io/assets/img/example_imagesequence_07.png",
// ];
// var obj = { curImg: 0 };
// var tween = TweenMax.to(obj, 0.7, {
//   curImg: images.length - 1,
//   roundProps: "curImg",
//   repeat: 3,
//   immediateRender: true,
//   ease: Linear.easeNone,
//   onUpdate: function () {
//     $("#myimg").attr("src", images[obj.curImg]);
//   },
// });
// var controller = new ScrollMagic.Controller();
// var scene = new ScrollMagic.Scene({ triggerElement: "#trigger", duration: 720 })
//   .setTween(tween)
//   .addTo(controller);
