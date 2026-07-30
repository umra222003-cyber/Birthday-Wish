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

    Celebration.active = true;

    celebrationOverlay.classList.remove("hidden");

    // Play Birthday Song
    const birthdaySong = document.getElementById("birthdaySong");

    if (birthdaySong) {
        birthdaySong.currentTime = 0;
        birthdaySong.play().catch(() => {});
    }

    await playBirthdayScene();

}


/* ==========================================================
   FINISH
========================================================== */

function endCelebration(){

    clearCelebration();

    const birthdaySong = document.getElementById("birthdaySong");

    if (birthdaySong) {
        birthdaySong.pause();
        birthdaySong.currentTime = 0;
    }

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

/* ==========================================================
   CELEBRATION.JS
   PART 3C.1
   PANDA SCENE
========================================================== */


/* ==========================================================
   PLAY PANDA SCENE
========================================================== */

async function playPandaScene(){

    showScreen("panda");

    animatePanda();

startPandaFloat();

animatePandaMessage();

    await wait(6000);

    await fadeCurrentScreen();

    await playBalloonScene();

}


/* ==========================================================
   PANDA ANIMATION
========================================================== */

function animatePanda(){

    const panda=document.querySelector(".panda-wrapper");

    if(!panda) return;

    panda.classList.remove("zoom-in");

    void panda.offsetWidth;

    panda.classList.add("zoom-in");

}


/* ==========================================================
   PANDA FLOAT
========================================================== */

function startPandaFloat(){

    const pandaImage=document.querySelector(".panda-image");

    if(!pandaImage) return;

    pandaImage.animate(

        [

            {

                transform:"translateY(0px)"

            },

            {

                transform:"translateY(-14px)"

            },

            {

                transform:"translateY(0px)"

            }

        ],

        {

            duration:3000,

            iterations:Infinity,

            easing:"ease-in-out"

        }

    );

}


/* ==========================================================
   PANDA MESSAGE
========================================================== */

function animatePandaMessage(){

    const message=document.querySelector(".panda-message");

    if(!message) return;

    message.classList.remove("fade-in");

    void message.offsetWidth;

    message.classList.add("fade-in");

}

/* ==========================================================
   CELEBRATION.JS
   PART 3D.1
   BALLOON SCENE
========================================================== */

/* ==========================================================
   PLAY BALLOON SCENE
========================================================== */

async function playBalloonScene(){

    showScreen("balloons");

    Celebration.balloonIndex = 0;

    const balloons = document.querySelectorAll(".balloon");

    balloons.forEach((balloon,index)=>{

        balloon.classList.remove("show","float","sway","pop");

        balloon.style.pointerEvents="none";

        balloon.onclick=null;

        setTimeout(()=>{

            balloon.classList.add("show");
            balloon.classList.add("float");
            balloon.classList.add("sway");

            balloon.style.pointerEvents="auto";

        },index*600);

    });

    enableBalloonClicks();

}


/* ==========================================================
   ENABLE BALLOON POPPING
========================================================== */

function enableBalloonClicks(){

    const balloons=document.querySelectorAll(".balloon");

    balloons.forEach((balloon,index)=>{

        balloon.onclick=()=>{

            if(balloon.classList.contains("pop")) return;

            popBalloon(balloon,index);

        };

    });

}

/* ==========================================================
   CELEBRATION.JS
   PART 3D.2
   BALLOON POP SEQUENCE
========================================================== */


/* ==========================================================
   POP BALLOON
========================================================== */

function popBalloon(balloon,index){

    balloon.classList.add("pop");

    balloon.style.pointerEvents="none";

    createBalloonBurst(balloon);

    Celebration.balloonIndex++;

    setTimeout(()=>{

        balloon.style.visibility="hidden";

    },450);

    if(Celebration.balloonIndex>=4){

        setTimeout(async()=>{

            await showSpecialMessage();

        },800);

    }

}


/* ==========================================================
   BURST PARTICLES
========================================================== */

function createBalloonBurst(balloon){

    const rect=balloon.getBoundingClientRect();

    for(let i=0;i<24;i++){

        const particle=document.createElement("div");

        particle.className="balloon-burst";

        particle.style.left=

            rect.left+rect.width/2+"px";

        particle.style.top=

            rect.top+rect.height/2+"px";

        particle.style.background=

            confettiColors[
                Math.floor(
                    Math.random()*confettiColors.length
                )
            ];

        particle.style.setProperty(

            "--dx",

            random(-90,90)+"px"

        );

        particle.style.setProperty(

            "--dy",

            random(-90,90)+"px"

        );

        document.body.appendChild(particle);

        setTimeout(()=>{

            particle.remove();

        },800);

    }

}


/* ==========================================================
   SPECIAL MESSAGE
========================================================== */

async function showSpecialMessage(){

    const msg = document.getElementById("specialMessage");

    if(!msg) return;

    // Add the message
    msg.innerHTML = `
        <h2>❤️ You are so special ❤️</h2>
        <p>
            May every dream you have come true.<br>
            You deserve all the happiness, love and success in the world.
        </p>
    `;

    msg.classList.add("show");

    launchConfetti(180);

    createFirework(
        window.innerWidth / 2,
        window.innerHeight / 3
    );

    await wait(3500);

    await fadeCurrentScreen();

    await playBouquetScene();

}

/* ==========================================================
   CELEBRATION.JS
   PART 3E.1
   BOUQUET SCENE
========================================================== */


/* ==========================================================
   PLAY BOUQUET
========================================================== */

async function playBouquetScene(){

    showScreen("bouquet");

    animateBouquet();

    launchConfetti(120);

    createFirework(

        window.innerWidth * 0.35,
        window.innerHeight * 0.30

    );

    createFirework(

        window.innerWidth * 0.65,
        window.innerHeight * 0.30

    );

    await wait(5000);

    await fadeCurrentScreen();

    await playCakeScene();

}


/* ==========================================================
   BOUQUET ENTRY
========================================================== */

function animateBouquet(){

    const bouquet=document.querySelector(".bouquet-wrapper");

    if(!bouquet) return;

    bouquet.classList.remove("zoom-in");

    void bouquet.offsetWidth;

    bouquet.classList.add("zoom-in");

}


/* ==========================================================
   FLOAT EFFECT
========================================================== */

function startBouquetFloat(){

    const image=document.querySelector(".bouquet-image");

    if(!image) return;

    image.animate(

        [

            {

                transform:"translateY(0px)"

            },

            {

                transform:"translateY(-12px)"

            },

            {

                transform:"translateY(0px)"

            }

        ],

        {

            duration:2800,

            iterations:Infinity,

            easing:"ease-in-out"

        }

    );

}


/* ==========================================================
   MESSAGE
========================================================== */

function animateBouquetMessage(){

    const message=document.querySelector(".bouquet-message");

    if(!message) return;

    message.classList.remove("fade-in");

    void message.offsetWidth;

    message.classList.add("fade-in");

}

/* ==========================================================
   CELEBRATION.JS
   PART 3F.1
   CAKE SCENE
========================================================== */


/* ==========================================================
   PLAY CAKE SCENE
========================================================== */

async function playCakeScene(){

    showScreen("cake");

    animateCake();

    animateCakeMessage();

    startCakeFloat();

    lightCandle();

   initializeCakeInteraction();
   
    launchConfetti(150);

    createFirework(

        window.innerWidth*0.30,

        window.innerHeight*0.25

    );

    createFirework(

        window.innerWidth*0.70,

        window.innerHeight*0.25

    );

    await wait(3500);

    showBlowInstruction();

}


/* ==========================================================
   CAKE ENTRY
========================================================== */

function animateCake(){

    const cake=document.querySelector(".cake-wrapper");

    if(!cake) return;

    cake.classList.remove("zoom-in");

    void cake.offsetWidth;

    cake.classList.add("zoom-in");

}


/* ==========================================================
   CAKE MESSAGE
========================================================== */

function animateCakeMessage(){

    const message=document.querySelector(".cake-message");

    if(!message) return;

    message.classList.remove("fade-in");

    void message.offsetWidth;

    message.classList.add("fade-in");

}


/* ==========================================================
   FLOATING CAKE
========================================================== */

function startCakeFloat(){

    const cake=document.querySelector(".cake-image");

    if(!cake) return;

    cake.animate(

        [

            {

                transform:"translateY(0px)"

            },

            {

                transform:"translateY(-10px)"

            },

            {

                transform:"translateY(0px)"

            }

        ],

        {

            duration:2600,

            easing:"ease-in-out",

            iterations:Infinity

        }

    );

}


/* ==========================================================
   LIGHT CANDLE
========================================================== */

function lightCandle(){

    const flame=document.getElementById("cakeFlame");

    if(!flame) return;

    flame.classList.add("lit");

}


/* ==========================================================
   SHOW INSTRUCTION
========================================================== */

function showBlowInstruction(){

    const instruction=document.getElementById("blowInstruction");

    if(!instruction) return;

    instruction.classList.add("show");

}

/* ==========================================================
   CELEBRATION.JS
   PART 3F.2
   CANDLE BLOW + GUARDIAN
========================================================== */


/* ==========================================================
   INITIALIZE CAKE
========================================================== */

function initializeCakeInteraction(){

    const cake=document.querySelector(".cake-wrapper");

    if(!cake) return;

    cake.onclick=blowOutCandle;

}


/* ==========================================================
   BLOW OUT CANDLE
========================================================== */

async function blowOutCandle(){

    const flame=document.getElementById("cakeFlame");

    const instruction=document.getElementById("blowInstruction");

    if(flame){

        flame.classList.remove("lit");

        flame.classList.add("blown");

    }

    if(instruction){

        instruction.classList.remove("show");

    }

    createSmoke();

    launchConfetti(250);

    createFirework(

        window.innerWidth/2,

        window.innerHeight*0.30

    );

    await wait(2500);

    await fadeCurrentScreen();

    await playGuardianScene();

}


/* ==========================================================
   SMOKE
========================================================== */

function createSmoke(){

    const smokeContainer=document.getElementById("cakeSmoke");

    if(!smokeContainer) return;

    smokeContainer.innerHTML="";

    for(let i=0;i<12;i++){

        const smoke=document.createElement("div");

        smoke.className="smoke";

        smoke.style.left=(45+i*3)+"%";

        smoke.style.animationDelay=(i*0.12)+"s";

        smokeContainer.appendChild(smoke);

    }

}


/* ==========================================================
   GUARDIAN
========================================================== */

async function playGuardianScene(){

    endCelebration();

    if(typeof playGuardianIntro==="function"){

        await playGuardianIntro();

    }

    if(typeof mainWebsite !== "undefined" && mainWebsite){

        mainWebsite.style.display = "block";

    }

    const music = document.getElementById("bgMusic");

    if(music){

        music.play().catch(()=>{});

    }

}














