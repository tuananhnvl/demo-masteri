document.addEventListener("DOMContentLoaded", function () {
    console.log('done')
    init()
    check()
    HoverText()
})


function init() {
    /* const target = document.querySelector('#SplitText');
    const results = Splitting({ target: target, by: 'words' }); */
    //  gsap.to(".btn-eff", { backgroundColor: "red", duration: 3 });
    /*    gsap.to(results[0].words, {
           y: -20,
           duration: 0.5,
           ease: "ease-in",
           stagger: 0.01
       }) */
    /*    ScrollTrigger.create({
           trigger: '.banner',
           start: 'top top',
           end: 'bottom bottom',
           pin: '.btn-eff'
       })
*/
    /*  const st = ScrollTrigger.create({
 
         trigger: '.part1-content',
         start: 'top top',
         end: 'bottom',
         pin: '#gox1',
         scrub: true,
         markers:true
     }) */
}
function openGrid() {
    var element = document.getElementById("gridgrid");
    element.classList.toggle("disable-grid");
}
function openFigma() {
    window.open(
        'https://www.figma.com/proto/SSuIxXZXAovQQFS7Tc0gkG/Untitled?node-id=2-4&scaling=scale-down-width&page-id=0%3A1',
        '_blank'
    );
}
function HoverText() {
    let hoverText = document.querySelector(".HoverText");
    const results = Splitting({ target: hoverText, by: 'chars' });
    console.log(results)
    let animation = gsap.to(results[0].chars, {
        paused: true,
        x: -6,
        stagger: 0.2
    });
    hoverText.addEventListener("mouseenter", () => {
        animation.play()
    });
    hoverText.addEventListener("mouseleave", () => {
        animation.reverse()
    });
}
var mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
var cursor = {
    el: $('#cursor'),
    x: window.innerWidth / 2, y: window.innerHeight / 2, w: 100, h: 100,
    update: function () {
        l = this.x - this.w / 2;
        t = this.y - this.h / 2;
        this.el.css({
            'transform': 'translate3d(' + l + 'px, ' + t + 'px, 0)'
        });
    }
}
$(window).mousemove(function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
})
setInterval(move, 1000 / 60)
function move() {
    //circle.x += (mouseX - circle.x) * 0.1; // old style
    //circle.y += (mouseY - circle.y) * 0.1; // old style
    /* cursor.x = lerp (cursor.x, mouseX, 0.1);
    cursor.y = lerp (cursor.y, mouseY, 0.1);
    cursor.update()  */
}
function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}