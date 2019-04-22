//屏幕自适应适配方式  1.动态获取屏幕宽度
(function (win) {
    var cDoc = document;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    // console.log(window);
    var cWid = null;
    function loadShow() {
        cWid = cDoc.documentElement.clientWidth || cDoc.body.clientWidth; //获取页面宽度

        /*获取设备像素比
            console.log(window.devicePixelRatio);
            获取屏幕宽度
            console.log(cWid);
        */

        var nHtml = cDoc.getElementsByTagName("html")[0];
        if (cWid <= 720) {
            // console.log(cWid);
            nHtml.style.fontSize = 100 * (cWid / 750/5) + "px";
            // console.log(nHtml.style.fontSize);
        }
    }
    loadShow();
    cDoc.addEventListener("DOMContentLoaded", loadShow, false);
    win.addEventListener(resizeEvt, loadShow, false);
})(window);
