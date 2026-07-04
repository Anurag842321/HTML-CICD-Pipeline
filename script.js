// ===============================
// Animated Counter
// ===============================

function counter(id, target, speed) {

    let count = 0;

    let obj = document.getElementById(id);

    let interval = setInterval(() => {

        count++;

        obj.innerHTML = count + "+";

        if (count >= target) {

            clearInterval(interval);

            if (id === "uptime") {
                obj.innerHTML = "99.9%";
            }

        }

    }, speed);

}

window.onload = function () {

    counter("deploy", 500, 5);
    counter("project", 120, 20);
    counter("uptime", 100, 20);
    counter("clients", 75, 30);

};

// ===============================
// Sticky Navbar Shadow
// ===============================

window.addEventListener("scroll", function () {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";

    } else {

        header.style.boxShadow = "none";

    }

});

// ===============================
// Active Navigation
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.onclick = () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};
// ==========================
// Loader
// ==========================

window.addEventListener("load",function(){

    setTimeout(function(){

        document.getElementById("loader").style.display="none";

    },1500);

});
// ==========================
// Dark Mode
// ==========================

const themeBtn=document.getElementById("themeBtn");

themeBtn.onclick=function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeBtn.innerHTML="☀";

    }

    else{

        themeBtn.innerHTML="🌙";

    }

}
// ==========================
// Mobile Menu
// ==========================

const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav-links");

menu.addEventListener("click", () => {

    nav.classList.toggle("show");

});
// ==========================
// Scroll Reveal
// ==========================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll("section").forEach(sec=>{

    sec.classList.add("hidden");

    observer.observe(sec);

});
// ==========================
// Typing Effect
// ==========================

const words=[

"CI/CD Automation",

"Docker Containers",

"Kubernetes Deployment",

"Cloud Native Apps"

];

let i=0;

setInterval(()=>{

    document.getElementById("typing").innerHTML=words[i];

    i++;

    if(i==words.length){

        i=0;

    }

},2000);
// ==========================
// Deployment Animation
// ==========================

const steps=[

"📂 Cloning GitHub Repository...",

"⚙ Jenkins Pipeline Started...",

"🐳 Building Docker Image...",

"☁ Pushing Image to Docker Hub...",

"☸ Deploying to Kubernetes...",

"✅ Deployment Successful"

];

document.getElementById("deployBtn").onclick=function(){

    let i=0;

    let status=document.getElementById("status");

    status.innerHTML="";

    let interval=setInterval(()=>{

        status.innerHTML=steps[i];

        i++;

        if(i==steps.length){

            clearInterval(interval);

        }

    },1800);

}
