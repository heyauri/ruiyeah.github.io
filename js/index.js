import CanvasImgSwitch from "./canvasImgSwitch.js"

let imgArr=["img/head1.png","img/guai.png","img/rui.png","img/beachside.png"];
let canvasImgSwitch=new CanvasImgSwitch({
    id:"imgContainer",
    weight:600,
    height:800,
    imgArr:imgArr
});

let currentIndex=0;
let count=4;

canvasImgSwitch.init().then(()=>{
    canvasImgSwitch.playIndex(0);
});

$(document).ready(function(){
    function playNext(){
        currentIndex++;
        currentIndex=currentIndex%count;
        canvasImgSwitch.playIndex(currentIndex);
        let past=$(".present").removeClass("present").addClass("past");
        $(".content").eq(currentIndex).removeClass("future").addClass("present");
        setTimeout(()=>{
            past.removeClass("past").addClass("future");
        },1200);
    }

    $(".float-btn").click(playNext);
});


