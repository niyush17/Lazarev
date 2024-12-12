function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
locomotiveAnimation()



function navAnimation(){
    var nav = document.querySelector('nav')

nav.addEventListener('mouseenter',()=>{
    let tl = gsap.timeline()
    tl.to("#nav-bottom",{
        height:"20vh"
    })
    tl.to("nav h5",{
        display:"block"
    })
    tl.to(".nav-part2 h5 span",{
        y:0,
        stagger:{
            amount:0.6
        }
    })
})
nav.addEventListener('mouseleave',()=>{
    let tl = gsap.timeline()
    tl.to(".nav-part2 h5 span",{
        y:25,
        stagger:{
            amount:0.2
        }
    })
    tl.to("nav h5",{
        display:"none"
    })
    tl.to("#nav-bottom",{
        height:0,
        duration:0.1
    })
})
}
navAnimation()


function loadAnimations(){
    var tl = gsap.timeline()

tl.from("#page1,#page2",{
    opacity:0,
    duration:0.2,
    delay:-0.2,
})

tl.from("#page1,#page2",{
    transform:"scaleX(0.7) scaleY(1) translateY(100%)",
    borderRadius:"150px",
    duration:1,
    ease:"expo.out"
})

tl.from("nav",{
    opacity:0,
})
tl.from("#page1 h1, #page1 p,#page1 div,#page2 p,#page2 h5,#page2 .right-elem",{
    opacity:0,
    duration:0.5,
    stagger:0.2,
})
}
loadAnimations()

function page2Animation(){
    var rightElems = document.querySelectorAll(".right-elem")

rightElems.forEach((elem)=>{
    elem.addEventListener("mouseenter",()=>{
        gsap.to(elem.childNodes[3],{
            opacity:1,
            scale:1,
        })
    })
    elem.addEventListener("mouseleave",()=>{
        gsap.to(elem.childNodes[3],{
            opacity:0,
            scale:0
        }) 
    })

    elem.addEventListener("mousemove",(dets)=>{
        gsap.to(elem.childNodes[3],{
            x:dets.x - elem.getBoundingClientRect().x -50,
            y:dets.y - elem.getBoundingClientRect().y- 215
        })
    })
})
}
page2Animation()


function page3VideoAnimation(){
    var page3Center = document.querySelector("#page3-center")
var video = document.querySelector("#page3 video")

page3Center.addEventListener("click",()=>{
    video.play()
    gsap.to(video,{
        transform:"scaleX(1) scaleY(1)",
        opacity:1,
        borderRadius:0,
        ease:"power3"
    })
})

video.addEventListener("click",()=>{
    video.pause()
    gsap.to(video,{
        transform:"scaleX(0.7) scaleY(0)",
        opacity:0,
        borderRadius:"30px",
        ease:"power3"
    })
})

var sections = document.querySelectorAll(".sec-right")
sections.forEach((elem)=>{
    elem.addEventListener("mouseenter",()=>{
        elem.childNodes[3].style.opacity = 1
        elem.childNodes[3].play()
    })
    elem.addEventListener("mouseleave",()=>{
        elem.childNodes[3].style.opacity = 0
        elem.childNodes[3].load()
    })
})
}

page3VideoAnimation()

function page6Animations(){
    gsap.from("#btm6-part2 h4",{
        x:0,
        duration:1,
        scrollTrigger:{
            trigger:"#page6-bottom",
            scroller:"#main",
            start:"top 80%",
            end:"top 0%",
            scrub:2,
        }
    })
    gsap.from("#btm6-part3 h4",{
        x:0,
        duration:1,
        scrollTrigger:{
            trigger:"#btm6-part2",
            scroller:"#main",
            start:"top 80%",
            end:"top 0%",
            scrub:2,
        }
    })
    gsap.from("#btm6-part4 h4",{
        x:0,
        duration:1,
        scrollTrigger:{
            trigger:"#btm6-part2",
            scroller:"#main",
            start:"top 80%",
            end:"top 0%",
            scrub:2,
        }
    })
}
page6Animations()




