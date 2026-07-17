/*=========================================================
        HAPPY BIRTHDAY PAWAN ❤️
               JavaScript
=========================================================*/


/*=========================================================
                    GLOBAL VARIABLES
=========================================================*/

const PASSWORD = "04012026";

const TARGET_DATE = new Date(Date.now() + 5 * 1000);

const loadingScreen = document.getElementById("loading-screen");
const welcomeScreen = document.getElementById("welcomeScreen");
const mainWebsite = document.getElementById("mainWebsite");

// =========================
// Guardian Intro Elements
// =========================

const guardianIntro = document.getElementById("guardianIntro");
const guardianImage = document.getElementById("guardianImage");
const guardianText = document.getElementById("guardianText");
const lightningFlash = document.getElementById("lightningFlash");

const guardianSpeech = new Audio("Music/guardian-voice.mp3");
const thunderSound = new Audio("Music/thunder.mp3");

/*=========================================================
                    BACKGROUND MUSIC
=========================================================*/

const backgroundMusic = document.getElementById("backgroundMusic");


/*=========================================================
                    STATE FLAGS
=========================================================*/

let websiteUnlocked = false;
let guardianFinished = false;
let musicStarted = false;

/*=========================================================
                WAIT FOR PAGE LOAD
=========================================================*/

window.addEventListener("load", () => {

    startCountdown();

    revealOnScroll();

    createFloatingHearts();

});



/*=========================================================
                REVEAL ON SCROLL
=========================================================*/

function revealOnScroll(){

    const observer = new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("show");

                }

            });

        },

        {

            threshold:0.15

        }

    );

    document.querySelectorAll(".fade-up").forEach(section=>{

        observer.observe(section);

    });

}



/*=========================================================
                SMOOTH SCROLL
=========================================================*/

document.querySelectorAll('a[href^="#"]').forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/*=========================================================
                LIVE COUNTDOWN
=========================================================*/

function startCountdown() {

    let timer;

    function updateCountdown() {

        const now = Date.now();

        const distance = TARGET_DATE.getTime() - now;

        if (distance <= 0) {

            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";

            loadingScreen.style.display = "none";
            welcomeScreen.style.display = "flex";

            if (timer) {
    clearInterval(timer);
}

            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60)) /
            1000
        );

        document.getElementById("days").textContent = String(days).padStart(2,"0");
        document.getElementById("hours").textContent = String(hours).padStart(2,"0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2,"0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2,"0");

    }

  
updateCountdown();

timer = setInterval(updateCountdown, 1000);

}

/*=========================================================
OPEN ENVELOPE
=========================================================*/

function openEnvelope(){

    const envelope = document.querySelector(".envelope");

    envelope.classList.add("open");

}


/*=========================================================
                PASSWORD CHECK
=========================================================*/

async function checkPassword() {

    const enteredPassword =
    document.getElementById("password").value.trim();

const errorMessage =
    document.getElementById("error");

    if (enteredPassword === PASSWORD) {

        openEnvelope();

errorMessage.style.color = "#00E676";
errorMessage.textContent = "💖 Welcome...";

setTimeout(async () => {

    welcomeScreen.style.opacity = "0";

    setTimeout(async () => {

        welcomeScreen.style.display = "none";

        console.log("Guardian Intro Started");

await playGuardianIntro();
console.log("1. playGuardianIntro entered");

console.log("Guardian Intro Finished");

        mainWebsite.style.display = "block";

        const music = document.getElementById("bgMusic");

        if (music) {

            music.play().catch(() => {});

        }

    }, 900);

}, 700);

    }else{

        errorMessage.style.color="#ff5252";
        errorMessage.textContent="Incorrect Password";

    }

}
const unlockBtn = document.getElementById("unlockBtn");

if (unlockBtn) {
    unlockBtn.addEventListener("click", checkPassword);
}


/*=========================================================
                ENTER KEY SUPPORT
=========================================================*/

const passwordInput = document.getElementById("password");

if(passwordInput){

    passwordInput.addEventListener("keypress",function(e){

        if(e.key==="Enter"){

            checkPassword();

        }

    });

}



/*=========================================================
                FLOATING HEARTS
=========================================================*/

function createFloatingHearts(){

    const heartsContainer = document.querySelector(".hearts");

    if(!heartsContainer) return;

    setInterval(()=>{

        const heart=document.createElement("div");

        heart.className="heart";

        heart.innerHTML=Math.random()>0.5 ? "❤️" : "💖";

        heart.style.left=Math.random()*100+"%";

        heart.style.fontSize=(18+Math.random()*24)+"px";

        heart.style.animationDuration=(6+Math.random()*5)+"s";

        heartsContainer.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },11000);

    },700);

}



/*=========================================================
                BACKGROUND MUSIC
=========================================================*/

const bgMusic=document.getElementById("bgMusic");
const musicBtn=document.getElementById("musicBtn");

if(bgMusic && musicBtn){

    musicBtn.addEventListener("click",()=>{

        if(bgMusic.paused){

            bgMusic.play();

            musicBtn.innerHTML="🔊 Music";

        }

        else{

            bgMusic.pause();

            musicBtn.innerHTML="🔈 Music";

        }

    });

}



/*=========================================================
            RELATIONSHIP TIMER
=========================================================*/

/*
Replace the date below
with the day your relationship started.
*/

const relationshipDate=new Date("2026-01-04 00:00:00");

function updateRelationshipTimer(){

    const now=new Date();

    const diff=now-relationshipDate;

    const years=Math.floor(diff/(1000*60*60*24*365));

    const months=Math.floor((diff%(1000*60*60*24*365))/(1000*60*60*24*30));

    const days=Math.floor((diff%(1000*60*60*24*30))/(1000*60*60*24));

    const hours=Math.floor((diff%(1000*60*60*24))/(1000*60*60));

    const yearBox=document.getElementById("years");
    const monthBox=document.getElementById("months");
    const dayBox=document.getElementById("daysTogether");
    const hourBox=document.getElementById("hoursTogether");

    if(yearBox){

        yearBox.textContent=years;
        monthBox.textContent=months;
        dayBox.textContent=days;
        hourBox.textContent=hours;

    }

}

setInterval(updateRelationshipTimer,1000);

updateRelationshipTimer();



/*=========================================================
                OPEN WHEN LETTERS
=========================================================*/

const letters=[

`<h2>💙 Open When You Miss Me</h2>

<p>

Missing me already? then let me steal one more smile from you. ❤️

If you ever miss me,

close your eyes for a moment.

Remember that somewhere,

someone is smiling simply because you exist.

Distance can never reduce the love.

❤️

</p>`,



`<h2>🌧️ Open When Life Gets Hard</h2>

<p>

You've already survived battles

that many people never knew about and I'm so proud of you. ❤️

If life feels heavy, remember—

the strongest person I know

is YOU.

And Take a deep breath... I'm holding your hand through these words and imagine I'm giving you the biggest hug. 

Everything will be okay. 🫂❤️. 🤍

</p>`,



`<h2>😂 Open When You Need A Smile</h2>

<p>

Warning : Reading this letter may cause unexpected giggles and a very cute smile. 😄 <br> 
    
Go look in the mirror.

Scratch your head the way you always do.

Think about Lady Fingers.

Then tell me you didn't smile.

Because your smile is one of my favourite things.

😄❤️

</p>`,



`<h2>🌟 Open When You Doubt Yourself</h2>

<p>

I wish you could see yourself

through my eyes.

You'd see someone

kind,

strong,

caring,

and deeply loved.

</p>`,



`<h2>🎮 Open After Playing PS5</h2>

<p>

Congratulations!

You probably saved another kingdom.

Now...

drink some water,

stretch a little,

and don't forget me.

😄❤️

</p>`,



`<h2>🎂 Happy Birthday</h2>

<p>

Today is all about you... and this little letter has been waiting for this moment. 🎉💖

May this year bring you

good health,

endless happiness,

and a lifetime of love.

Happy Birthday Honey❤️

</p>`

];



function openLetter(index){

    document.getElementById("letterModal").style.display="flex";

    document.getElementById("letterContent").innerHTML=letters[index];

}



function closeLetter(){

    document.getElementById("letterModal").style.display="none";

}


window.addEventListener("click", function(event){

    const modal = document.getElementById("letterModal");

    if (!modal) return;

    if(event.target === modal){

        modal.style.display = "none";

    }

});

/*=========================================================
                    69 REASONS BOOK
=========================================================*/

/*
Each reason should be different.

Feel free to edit the wording anytime.
*/

const reasons = [

"1. Because your smile can brighten even the darkest day.",

"2. Because your heart is incredibly kind.",

"3. Because you always care for the people you love.",

"4. Because your strength inspires me every day.",

"5. Because you never give up.",

"6. Because you always put family first.",

"7. Because your hugs feel like home.",

"8. Because your laugh is contagious.",

"9. Because you're beautifully patient.",

"10. Because you understand people without judging them.",

"11. Because you're stronger than your past.",

"12. Because every challenge made you kinder.",

"13. Because your courage amazes me.",

"14. Because you're humble.",

"15. Because you're genuine.",

"16. Because you make ordinary days feel special.",

"17. Because you always check on others.",

"18. Because your happiness matters to me.",

"19. Because you're my safe place.",

"20. Because you're wonderfully goofy.",

"21. Because of your adorable shy pose.",

"22. Because you scratch your head when you're thinking.",

"23. Because Lady Fingers will always make me laugh.",

"24. Because PS5 can never replace me 😄.",

"25. Because food always makes you happy.",

"26. Because mutton is your weakness.",

"27. Because chicken never disappoints you.",

"28. Because fish completes every feast.",

"29. Because your dreams are beautiful.",

"30. Because your dream company deserves you.",

"31. Because you'll earn that Land Cruiser.",

"32. Because one day you'll own that Fortuner.",

"33. Because you deserve peace.",

"34. Because you deserve good health.",

"35. Because you value life deeply.",

"36. Because childhood made you strong.",

"37. Because you overcame so much.",

"38. Because you never let pain define you.",

"39. Because your parents are proud of you.",

"40. Because you love them with all your heart.",

"41. Because you dream of one happy family.",

"42. Because you'll be an amazing husband.",

"43. Because you'll be an incredible father someday.",

"44. Because you make people feel safe.",

"45. Because you always listen.",

"46. Because your silence speaks kindness.",

"47. Because your respect is rare.",

"48. Because your loyalty means everything.",

"49. Because you're thoughtful.",

"50. Because you notice little things.",

"51. Because you never stop improving.",

"52. Because you make me believe in love.",

"53. Because you're worth waiting for.",

"54. Because you inspire my dreams.",

"55. Because you're my favourite hello.",

"56. Because you're my hardest goodbye.",

"57. Because every memory with you matters.",

"58. Because I admire your determination.",

"59. Because your heart is beautiful.",

"60. Because your soul is even more beautiful.",

"61. Because you're wonderfully imperfect.",

"62. Because you always try your best.",

"63. Because you're my comfort.",

"64. Because you're my happiness.",

"65. Because you're my biggest blessing.",

"66. Because you're my greatest adventure.",

"67. Because you're one of a kind.",

"68. Because loving you feels effortless.",

"69. Because... you're YOU. And that's more than enough. ❤️"

];


/*=========================================================
                    BOOK CONTROLS
=========================================================*/

let currentReason = 0;

const loveReason = document.getElementById("loveReason");

const reasonCounter = document.getElementById("reasonCount");
function showReason(){

    if(!loveReason) return;

    loveReason.style.opacity = "0";

    loveReason.style.transform = "rotateY(90deg)";

    setTimeout(()=>{

        loveReason.innerHTML = reasons[currentReason];

        if(reasonCounter){

            reasonCounter.innerHTML =
            `${currentReason+1} / ${reasons.length}`;

        }

        loveReason.style.opacity="1";

        loveReason.style.transform="rotateY(0deg)";

    },250);

}



/*=========================================================
                    NEXT PAGE
=========================================================*/

function nextReason(){

    if(currentReason < reasons.length-1){

        currentReason++;

        showReason();

    }

}



/*=========================================================
                PREVIOUS PAGE
=========================================================*/

function previousReason(){

    if(currentReason > 0){

        currentReason--;

        showReason();

    }

}



/*=========================================================
                INITIAL LOAD
=========================================================*/

showReason();
const nextBtn = document.getElementById("nextReason");
const prevBtn = document.getElementById("prevReason");

if (nextBtn) {
    nextBtn.addEventListener("click", nextReason);
}

if (prevBtn) {
    prevBtn.addEventListener("click", previousReason);
}


document.addEventListener("DOMContentLoaded", () => {

    const giftButton = document.getElementById("openGiftBtn");

    if (giftButton) {

        giftButton.addEventListener("click", openGiftAnimation);

    }

});

function openGiftAnimation() {

    const giftBox = document.getElementById("giftBox");
    const surprise = document.getElementById("giftSurprise");

    if (!giftBox || !surprise) return;

    giftBox.style.transform = "scale(1.15) rotate(10deg)";

    setTimeout(() => {

        giftBox.style.display = "none";

        surprise.classList.add("show");

    }, 800);

}

/*=========================================================
                RAGNARÖK BLESSING
=========================================================*/

function revealGuardian() {

    const guardian = document.getElementById("guardianMessage");

    if (!guardian) return;

    guardian.innerHTML = `
    <h2>⚔️ A Blessing from Ragnarök ⚔️</h2>

    <p>

    Like Kratos,
    you have carried pain.

    Like Atreus,
    you continue to grow.

    Your past made you stronger,
    but it will never define your future.

    Walk forward with courage,
    wisdom,
    and love.

    May every battle ahead become another victory.

    ❤️

    </p>
    `;

}

/*=========================================================
                TYPEWRITER EFFECT
=========================================================*/

function typeWriter(id, text, speed = 35) {

    const element = document.getElementById(id);

    if (!element) return;

    let index = 0;

    function type() {

        if (index < text.length) {

            element.innerHTML += text.charAt(index);

            index++;

            setTimeout(type, speed);

        }

    }

    element.innerHTML = "";

    type();

}

/*=========================================================
            START TYPEWRITER WHEN VISIBLE
=========================================================*/

const finalLetter = document.getElementById("typewriter");

if (finalLetter) {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                typeWriter(
                    "typewriter",

`Dear Pawan,

Every chapter of your life has shown me how strong,
kind and loving you truly are.

No matter what life brings,
I hope you always remember that you are deeply loved,
deeply appreciated,
and never alone.

Happy Birthday ❤️

With all my love,
Umra`
                );

                observer.disconnect();

            }

        });

    });

    observer.observe(finalLetter);

}

/*=========================================================
                SECRET MESSAGE
=========================================================*/

function revealSecret() {

    const box = document.getElementById("secretMessage");

    if (!box) return;

    box.innerHTML = `
        <h2>❤️ One Last Thing... ❤️</h2>

        <p>
            My favourite place will always be wherever you are.
        </p>

        <p>
            Thank you for making my world brighter,
            for every smile,
            every laugh,
            and every memory.
        </p>

        <h3>
            Happy Birthday, my favourite person.
        </h3>

        <p>
            I love you silly. ❤️
        </p>
    `;

    document.querySelector("footer").scrollIntoView({
        behavior: "smooth"
    });

}
/*=========================================================
                PARALLAX GLOW
=========================================================*/

document.addEventListener("mousemove", e => {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 20;

    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;

});

/*=========================================================
                BUTTON RIPPLE
=========================================================*/

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", function(e){

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = this.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);

        ripple.style.width = size + "px";
        ripple.style.height = size + "px";

        ripple.style.left =
            (e.clientX - rect.left - size / 2) + "px";

        ripple.style.top =
            (e.clientY - rect.top - size / 2) + "px";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

/*=========================================================
                SECRET BUTTON
=========================================================*/

const secretBtn = document.getElementById("secretBtn");

if (secretBtn) {

    secretBtn.addEventListener("click", () => {

        revealSecret();

        document.querySelector("footer").scrollIntoView({
            behavior: "smooth"
        });

    });

}

/*=========================================================
                CONSOLE MESSAGE
=========================================================*/

console.log(`
❤️========================================❤️

      Happy Birthday Pawan 🎂

      Made with love by Umra ❤️

❤️========================================❤️
`);
function closeGiftPopup(){

    document.getElementById("giftPopup").style.display="none";

}
function createHeartBlast(){

    for(let i=0;i<40;i++){

        const heart=document.createElement("div");

        heart.innerHTML=Math.random()>0.5 ? "❤️" : "💖";

        heart.style.position="fixed";

        heart.style.left=Math.random()*100+"vw";

        heart.style.top="-20px";

        heart.style.fontSize=(18+Math.random()*18)+"px";

        heart.style.zIndex="10000";

        heart.style.transition="3s linear";

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.style.top="110vh";

            heart.style.transform=`translateX(${Math.random()*200-100}px) rotate(720deg)`;

            heart.style.opacity="0";

        },50);

        setTimeout(()=>{

            heart.remove();

        },3000);

    }

}

const guardianLines = [

"Who dares awaken the Hall of Memories?",

"...",

"I have watched countless warriors...",

"But today...",

"I welcome one whose journey deserves to be celebrated.",

"Welcome, Pawan."

];


function typeGuardianText(message, speed = 45) {

    guardianText.innerHTML = "";

    let i = 0;

    return new Promise(resolve => {

        function type() {

            if (i < message.length) {

                guardianText.innerHTML += message.charAt(i);

                i++;

                setTimeout(type, speed);

            } else {

                resolve();

            }

        }

        type();

    });

}
/*=========================================================
                    LIGHTNING EFFECT
=========================================================*/

function flashLightning() {

    if (!lightningFlash) return;

    lightningFlash.classList.add("flash");

    setTimeout(() => {
        lightningFlash.classList.remove("flash");
    }, 120);

    setTimeout(() => {
        lightningFlash.classList.add("flash");
    }, 250);

    setTimeout(() => {
        lightningFlash.classList.remove("flash");
    }, 380);

}

async function playGuardianIntro() {
    console.log("1. Entered playGuardianIntro()");

    // Show the guardian screen
    guardianIntro.classList.remove("guardian-hidden");
    guardianIntro.classList.add("show");
    console.log("2. Guardian screen shown");
    console.log("3. Guardian image shown");

console.log("2. Guardian should now be visible");

    guardianText.innerHTML = "";

    guardianImage.classList.remove("guardian-show");

    // Start thunder
thunderSound.currentTime = 0;
thunderSound.play().catch(() => {});

// Lightning flashes with thunder
flashLightning();

console.log("3. Thunder started");

    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Animate guardian
    guardianImage.classList.add("guardian-show");

    // Start narration
    guardianSpeech.currentTime = 0;
    guardianSpeech.play().catch(() => {});

    await new Promise(resolve => setTimeout(resolve, 500));

    // Type the subtitle
    await typeGuardianText(
        "Greetings... traveler.\n\nBeyond this gate lies a journey created with memories, patience and love.\n\nWelcome, Pawan.\n\nYour adventure begins now."
    );

    // Wait until the voice finishes
    await new Promise(resolve => {

        if (guardianSpeech.ended) {
            resolve();
        } else {
            guardianSpeech.onended = resolve;
        }

    });

    // Small pause
    await new Promise(resolve => setTimeout(resolve, 800));

    // Hide guardian

console.log("4. Guardian about to hide");

guardianImage.classList.remove("guardian-show");

console.log("4. Guardian closing");

guardianIntro.classList.remove("show");
guardianIntro.classList.add("guardian-hidden");

}