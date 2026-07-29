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

