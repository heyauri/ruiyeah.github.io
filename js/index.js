import CanvasImgSwitch from "./canvasImgSwitch.js"

let imgArr=["img/head1.png","img/unsw.png","img/rui.png","img/beachside.png"];
let canvasImgSwitch=new CanvasImgSwitch({
    id:"imgContainer",
    weight:600,
    height:800,
    imgArr:imgArr
});

let currentIndex=0;
let count=4;

canvasImgSwitch.playIndex(0);
canvasImgSwitch.init();

$(document).ready(function(){
    let playLock=0;
    function playNext(){
        if(playLock){
            return;
        }
        playLock=1;
        currentIndex++;
        currentIndex=currentIndex%count;
        canvasImgSwitch.playIndex(currentIndex);
        if(window.innerWidth<1024 && currentIndex===2){
            $("#imgContainer").css({
                "transform":"scale(0.7,0.5)"
            });
        }else{
            $("#imgContainer")[0].removeAttribute("style");
        }
        let past=$(".present").removeClass("present").addClass("past");
        $(".content").eq(currentIndex).removeClass("future").addClass("present");
        $(".bg").eq(currentIndex).removeClass("future").addClass("present");
        setTimeout(()=>{
            past.removeClass("past").addClass("future");
            playLock=0;
        },1200);
    }

    $("html,body").swipe({
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if(direction==="left"||direction==="up"){
                playNext();
            }
        }
    });

    $(".float-btn").click(playNext);
});


