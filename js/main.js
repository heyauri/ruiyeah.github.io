/**
 * Created by Administrator on 2016/8/7.
 */
$(function() {

    // 鼠标滑轮滚动后执行的函数
    // delta > 0 = 向上滚动
    // delta < 0 = 向下滚动
    var time = 0;
    setInterval(function() {
        time++;
    }, 100);

    function mousewheelEvent(e, delta) {
        var direct = 0;
        e = e || window.event;
        if (e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件
            if (e.wheelDelta > 0) { //当滑轮向上滚动时
                // alert("滑轮向上滚动");
                direct = 1;
            }
            if (e.wheelDelta < 0) { //当滑轮向下滚动时
                // alert("滑轮向下滚动");
                direct = -1;
            }
        } else if (e.detail) { //Firefox滑轮事件
            if (e.detail < 0) { //当滑轮向上滚动时
                // alert("滑轮向上滚动");
                direct = 1;
            }
            if (e.detail > 0) { //当滑轮向下滚动时
                // alert("滑轮向下滚动");
                direct = -1;
            }
        }
        if (time > 3) {
            scrollMouse(direct);
        }
    }

    if (document.addEventListener) {
        document.addEventListener("DOMMouseScroll", function(e) {
            mousewheelEvent(e, e.detail * -40);
        }, false);
    }

    window.onmousewheel = mousewheelEvent;



    function scrollMouse(direct) {

        var that = $(".present");
        var index = 1 + $(".present").index();
        var length = $(".screen").length;
        if (direct < 0) {
            if (index < length) {
                $(".present").addClass("past").removeClass("present");
                that.next().removeClass("future").addClass("present");

            }
        } else {
            if (index > 1) {

                that.prev().removeClass("past").addClass("present");
                that.removeClass("present").addClass("future");

            }
        }
        time = 0;
    }


    $("#container").swipe({
        //Generic swipe handler for all directions
        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
            if(direction=="left"||direction=="up")
            {
                scrollMouse(-1);
            }
            else if(direction=="right"||direction=="down"){
                scrollMouse(1);
            }
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold: 0
    });
});