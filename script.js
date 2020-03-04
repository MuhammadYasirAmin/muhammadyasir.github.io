
// Page Loader
window.addEventListener("load",function(){
    document.querySelector(".preloader").classList.add("hidden");
})

//Navbar
const navTrigger=document.querySelector(".nav-trigger");
const nav=document.querySelector(".stretchy-nav");
navTrigger.addEventListener("click",function(){
    nav.classList.toggle("nav-is-visible");
})
const ahref=document.querySelector(".links").children;
const allSections=document.querySelector(".all-sections").children;


for(let i=0; i<ahref.length; i++){
    const a=ahref[i].querySelector("a");
    a.addEventListener("click",function(){
        section(this)
        // remove active classes from all links
        for(let j=0; j<ahref.length; j++){
            ahref[j].querySelector('a').classList.remove("active")
        }//add class active to clicked
        this.classList.add("active")
    })
}
// Home Button
const aboutBtn=document.querySelector(".aboutBtn");
const portfolioBtn=document.querySelector(".portfolioBtn");
aboutBtn.addEventListener("click",function(){
    section(this);
    updateNav(this);
})
portfolioBtn.addEventListener("click",function(){
    section(this);
    updateNav(this);
})
// update active nav 
function updateNav(element){
    for(let j=0; j<ahref.length; j++){
        ahref[j].querySelector('a').classList.remove("active")
        const target2=element.getAttribute("href").split("#")[1];
        if (target2==ahref[j].querySelector('a').getAttribute("href").split("#")[1]) {
            ahref[j].querySelector('a').classList.add("active")
        }
    }
}

// remove active class from all sections
function section(element){
    for (let j = 0; j < allSections.length; j++) {
        allSections[j].classList.remove("active");
    }
    
    const target=element.getAttribute("href").split("#")[1];
    document.querySelector("#"+target).classList.add("active");
}

//Portfolio Overlay
const portfolioContainer=document.querySelector(".portfolio");
const portfolioItems=document.querySelector(".portfolio-items").children;
const lightbox=document.querySelector(".lightbox");
const imageFormatContainer=lightbox.querySelector(".image-format");
const youtubeFormatContainer=lightbox.querySelector(".youtube-format");
const sliderFormatContainer=lightbox.querySelector(".slider-format");
const formatType=document.querySelector(".format-type");

const prevSlide=sliderFormatContainer.querySelector(".prev-slide");
const nextSlide=sliderFormatContainer.querySelector(".next-slide");
let currentItem;

for(let i=0; i<portfolioItems.length; i++){
    portfolioItems[i].addEventListener("click",function(){
        portfolioContainer.classList.add("lightbox-is-visible");
        lightbox.classList.add("lightbox-is-visible");
        currentItem=i;
        const format=portfolioItems[i].getAttribute("data-format");
        changeProjectInfo();
        if (format=="image-format") {
            imageFormat();
            formatType.innerHTML="Image Format";
        }
        if (format=="youtube-format") {
            youtubeFormat();
            formatType.innerHTML="Youtube Format";
        }
        if (format=="slider-format") {
            sliderFormat();
            formatType.innerHTML="Slider Format";
        }
    })
}

function imageFormat(){
    const imgContainer=portfolioItems[currentItem].querySelector(".img");
    const imgSrc=imgContainer.querySelector("img").getAttribute("src");

    imageFormatContainer.classList.remove("hidden");
    imageFormatContainer.querySelector("img").src=imgSrc;
}
function youtubeFormat(){
    const linkSrc=portfolioItems[currentItem].querySelector(".youtube-link").getAttribute("data-youtube-link");
    youtubeFormatContainer.querySelector("iframe").src=linkSrc;

    youtubeFormatContainer.classList.remove("hidden");
}
const sliderImage=sliderFormatContainer.querySelector(".slider-img");
let slides;
let slideIndex=0;
function sliderFormat(){
    slides=portfolioItems[currentItem].querySelector(".slide-images").children;
    sliderFormatContainer.classList.remove("hidden");
    lightboxSlider();
}

prevSlide.onclick=function(){
    if(slideIndex==0){
        slideIndex=slides.length-1;
    }
    else{
        slideIndex--;
    }
    console.log("slide:"+slideIndex);
    lightboxSlider();
}
nextSlide.onclick=function(){
    if(slideIndex==slides.length-1){
        slideIndex=0;
    }
    else{
        slideIndex++;
    }
    console.log("slide:"+slideIndex)
    lightboxSlider();
}
function lightboxSlider(){
    sliderImage.src=slides[slideIndex].src;
}

    
    const project=document.querySelector("#project");
    const client=document.querySelector("#client");
    const duration=document.querySelector("#duration");
    const technologies=document.querySelector("#technologies");
    const budget=document.querySelector("#budget");
    function changeProjectInfo(){
        const projectInfo=portfolioItems[currentItem].querySelector(".project-info");
        project.innerHTML=projectInfo.querySelector(".project").innerHTML;
        client.innerHTML=projectInfo.querySelector(".client").innerHTML;
        duration.innerHTML=projectInfo.querySelector(".duration").innerHTML;
        technologies.innerHTML=projectInfo.querySelector(".technologies").innerHTML;
        budget.innerHTML=projectInfo.querySelector(".budget").innerHTML;
        

    }

//close lightbox
const closeLightbox=document.querySelector(".close-lightbox");
const portfolioOverlay=document.querySelector('.portfolio-overlay');
const formats=document.querySelector(".formats").children;
window.onclick=function(event){
    if(lightbox.classList.contains("lightbox-is-visible")){
        if (event.target==portfolioOverlay || event.target==closeLightbox || event.target==closeLightbox.querySelector("span")){
            portfolioContainer.classList.remove("lightbox-is-visible");
            lightbox.classList.remove("lightbox-is-visible");
            setTimeout(function(){
                for (let j = 0; j < formats.length; j++) {
                    formats[j].classList.add("hidden");
                    
                }
            },500);
        }
    }
    if(event.target!=navTrigger && event.target!=navTrigger.querySelector("span")){
        nav.classList.remove("nav-is-visible");
        
    }
}
