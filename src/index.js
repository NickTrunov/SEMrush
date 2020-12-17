function importAll(resolve) {
    resolve.keys().forEach(resolve);
}

importAll(require.context('../src/', true, /\.js$|\.scss$/));

var W = localStorage.getItem('W');
var A = localStorage.getItem('A');
var n = localStorage.getItem('n');
var I = localStorage.getItem('I');
var C = localStorage.getItem('C');
var P = localStorage.getItem('P');
var L = localStorage.getItem('L');
var D = localStorage.getItem('D');

if (W > 0) $('.W').val(W);
else $('.W').val('');
if (A > 0) $('.A').val(A);
else $('.A').val('');
if (n > 0) $('.n').val(n);
else $('.n').val('');
if (I > 0) $('.I').val(I);
else $('.I').val('');
if (C > 0) $('.C').text(C + ' ₽');
else $('.C').text('0 ₽')
if (P > 0) $('.P').text(Math.round(P) + ' ₽');
else $('.P').text('0 ₽')
if (L > 0) $('.L').text(Math.round(L) + ' ₽');
else $('.L').text('0 ₽')
if (D > 0) $('.D').text(Math.round(D) + ' ₽');
else $('.D').text('0 ₽')

$('.button--save').text(localStorage.getItem('buttonSave'));

$('input').keyup(function () {
    $('.button--save').text('Save');
    W = $('.W').val();
    A = $('.A').val();
    I = $('.I').val();
    n = $('.n').val();

    C = W-A;
    P = C * ((I / 1200) + ((I / 1200) / ((1 + (I / 1200)) ** (n * 12) - 1)));
    L = P * n * 12 - C;
    D = 5 * P / 3;

    if (C > 0) $('.C').text(C + ' ₽');
    else $('.C').text('0 ₽')
    if (P > 0) $('.P').text(Math.round(P) + ' ₽');
    else $('.P').text('0 ₽')
    if (L > 0) $('.L').text(Math.round(L) + ' ₽');
    else $('.L').text('0 ₽')
    if (D > 0) $('.D').text(Math.round(D) + ' ₽');
    else $('.D').text('0 ₽')

    if (W == localStorage.getItem('W') && A == localStorage.getItem('A') && I == localStorage.getItem('I') && n == localStorage.getItem('n')) $('.button--save').text('Saved');
});

$('.button--clear').on('click', function () {
    $('input').val('');
    $('.C').text('0 ₽')
    $('.P').text('0 ₽')
    $('.L').text('0 ₽')
    $('.D').text('0 ₽')
    W = '';
    A = '';
    n = '';
    I = '';
    C = '';
    P = '';
    L = '';
    D = '';
    localStorage.clear();
    localStorage.setItem('buttonSave', 'Save');
    $('.button--save').text(localStorage.getItem('buttonSave'));
});

$('.button--save').on('click', function () {
    localStorage.setItem('W', W);
    localStorage.setItem('A', A);
    localStorage.setItem('I', I);
    localStorage.setItem('n', n);
    localStorage.setItem('C', C);
    localStorage.setItem('P', P);
    localStorage.setItem('L', L);
    localStorage.setItem('D', D);
    localStorage.setItem('buttonSave', 'Saved');
    $('.button--save').text(localStorage.getItem('buttonSave'));
});