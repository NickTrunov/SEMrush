function importAll(resolve) {
    resolve.keys().forEach(resolve);
}

importAll(require.context('../src/', true, /\.js$|\.scss$/));

var W = 0;
var A = 0;
var n = 0;
var I = 0;
var C = 0;
var P = 0;
var L = 0;
var D = 0;

$("input").keyup(function () {
    W = $(".W").val();
    A = $(".A").val();
    I = $(".I").val();
    n = $(".n").val();
    C = W-A;
    P = C * ((I / 1200) + ((I / 1200) / ((1 + (I / 1200)) ** (n * 12) - 1)));
    L = P * n * 12 - C;
    D = 5 * P / 3;

    if (C > 0) $(".C").text(C + " ₽");
    else $(".C").text("0 ₽")
    if (P > 0) $(".P").text(Math.round(P) + " ₽");
    else $(".P").text("0 ₽")
    if (L > 0) $(".L").text(Math.round(L) + " ₽");
    else $(".L").text("0 ₽")
    if (D > 0) $(".D").text(Math.round(D) + " ₽");
    else $(".D").text("0 ₽")
}).keyup();
