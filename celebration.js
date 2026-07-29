/* ==========================================================
   CELEBRATION.JS
   PART 3A.1
   CONTROLLER
========================================================== */

"use strict";


/* ==========================================================
   DOM
========================================================== */

const celebrationOverlay =
document.getElementById("celebrationOverlay");

const screens = {

    birthday:
    document.getElementById("screenBirthday"),

    panda:
    document.getElementById("screenPanda"),

    balloons:
    document.getElementById("screenBalloons"),

    bouquet:
    document.getElementById("screenBouquet"),

    cake:
    document.getElementById("screenCake")

};


const confettiContainer =
document.getElementById("confettiContainer");

const fireworksContainer =
document.getElementById("fireworksContainer");

const heartsContainer =
document.getElementById("floatingHearts");


/* ==========================================================
   SETTINGS
========================================================== */

const Celebration = {

    active:false,

    current:null,

    timers:[],

    particles:[],

    balloonIndex:0

};


/* ==========================================================
   HELPERS
========================================================== */

function wait(ms){

    return new Promise(resolve=>{

        const timer = setTimeout(resolve,ms);

        Celebration.timers.push(timer);

    });

}


function hideAllScreens(){

    Object.values(screens).forEach(screen=>{

        if(!screen) return;

        screen.classList.remove("active");

    });

}


function showScreen(name){

    hideAllScreens();

    Celebration.current=name;

    screens[name].classList.add("active");

}


/* ==========================================================
   RESET
========================================================== */

function clearCelebration(){

    Celebration.timers.forEach(clearTimeout);

    Celebration.timers=[];

    Celebration.balloonIndex=0;

}


/* ==========================================================
   START
========================================================== */

async function startCelebration(){

    if(Celebration.active) return;

    Celebration.active=true;

    celebrationOverlay.classList.remove("hidden");

    await playBirthdayScene();

}


/* ==========================================================
   FINISH
========================================================== */

function endCelebration(){

    clearCelebration();

    celebrationOverlay.classList.add("hidden");

}


/* ==========================================================
   PLACEHOLDERS
   (Implemented Later)
========================================================== */

async function playBirthdayScene(){}

async function playPandaScene(){}

async function playBalloonScene(){}

async function playBouquetScene(){}

async function playCakeScene(){}

async function playGuardianScene(){}


/* ==========================================================
   CELEBRATION.JS
   PART 3A.2
   EFFECT ENGINES
========================================================== */


/* ==========================================================
   RANDOM
========================================================== */

function random(min,max){

    return Math.random()*(max-min)+min;

}


/* ==========================================================
   CONFETTI
========================================================== */

const confettiColors=[

    "#ff4fa3",
    "#ffd54f",
    "#58bfff",
    "#9b5cff",
    "#ffffff"

];


function launchConfetti(count=220){

    if(!confettiContainer) return;

    for(let i=0;i<count;i++){

        const piece=document.createElement("div");

        piece.className="confetti";

        piece.style.left=random(0,100)+"vw";

        piece.style.top="-40px";

        piece.style.background=

            confettiColors[
                Math.floor(
                    Math.random()*confettiColors.length
                )
            ];

        piece.style.animationDuration=

            random(3,6)+"s";

        piece.style.animationDelay=

            random(0,.8)+"s";

        piece.style.transform=

            `rotate(${random(0,360)}deg)`;

        confettiContainer.appendChild(piece);

        setTimeout(()=>{

            piece.remove();

        },7000);

    }

}


/* ==========================================================
   HEARTS
========================================================== */

function startFloatingHearts(){

    if(!heartsContainer) return;

    fireworkInterval=setInterval(()=>{

        const heart=document.createElement("div");

        heart.className="heart";

        heart.innerHTML="❤";

        heart.style.left=random(0,100)+"vw";

        heart.style.fontSize=

            random(18,40)+"px";

        heart.style.animationDuration=

            random(5,9)+"s";

        heartsContainer.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },9000);

    },350);

    Celebration.timers.push(fireworkInterval);

}


/* ==========================================================
   FIREWORK
========================================================== */

function createFirework(x,y){

    if(!fireworksContainer) return;

    for(let i=0;i<28;i++){

        const p=document.createElement("div");

        p.className="firework";

        const angle=(360/28)*i;

        const distance=random(70,160);

        const dx=Math.cos(angle*Math.PI/180)*distance;

        const dy=Math.sin(angle*Math.PI/180)*distance;

        p.style.left=x+"px";

        p.style.top=y+"px";

        p.style.background=

            confettiColors[
                Math.floor(
                    Math.random()*confettiColors.length
                )
            ];

        p.style.setProperty(

            "--dx",

            dx+"px"

        );

        p.style.setProperty(

            "--dy",

            dy+"px"

        );

        fireworksContainer.appendChild(p);

        setTimeout(()=>{

            p.remove();

        },1400);

    }

}


/* ==========================================================
   AUTO FIREWORKS
========================================================== */

function startFireworks(){

    const timer=setInterval(()=>{

        createFirework(

            random(

                window.innerWidth*.15,

                window.innerWidth*.85

            ),

            random(

                window.innerHeight*.10,

                window.innerHeight*.45

            )

        );

    },900);

    Celebration.timers.push(timer);

}


/* ==========================================================
   STOP EFFECTS
========================================================== */

function stopEffects(){

    Celebration.timers.forEach(id=>{

        clearInterval(id);

        clearTimeout(id);

    });

    Celebration.timers=[];

}

/* ==========================================================
   CELEBRATION.JS
   PART 3B
   BIRTHDAY SCENE
========================================================== */


/* ==========================================================
   PLAY BIRTHDAY SCENE
========================================================== */

async function playBirthdayScene(){

    showScreen("birthday");

    launchConfetti(300);

    startFloatingHearts();

    startFireworks();

    animateBirthdayText();

    await wait(6500);

    stopFireworks();

    await fadeCurrentScreen();

    await playPandaScene();

}


/* ==========================================================
   BIRTHDAY TITLE
========================================================== */

function animateBirthdayText(){

    const wrapper=document.querySelector(".birthday-wrapper");

    if(!wrapper) return;

    wrapper.classList.remove("zoom-in");

    void wrapper.offsetWidth;

    wrapper.classList.add("zoom-in");

}


/* ==========================================================
   FIREWORK CONTROL
========================================================== */

let fireworkInterval=null;

function stopFireworks(){

    if(fireworkInterval){

        clearInterval(fireworkInterval);

        fireworkInterval=null;

    }

}


/* ==========================================================
   SCREEN FADE
========================================================== */

async function fadeCurrentScreen(){

    const screen=screens[Celebration.current];

    if(!screen) return;

    screen.classList.remove("active");

    screen.classList.add("fade-out");

    await wait(900);

    screen.classList.remove("fade-out");

}


/* ==========================================================
   RESTART SUPPORT
========================================================== */

function resetBirthdayScene(){

    const wrapper=document.querySelector(".birthday-wrapper");

    if(wrapper){

        wrapper.classList.remove("zoom-in");

    }

}
















