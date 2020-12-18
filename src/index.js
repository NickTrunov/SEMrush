function importAll(resolve) {
    resolve.keys().forEach(resolve);
}

importAll(require.context('../src/', true, /\.js$|\.scss$/));

var W = localStorage.getItem('W');
var A = localStorage.getItem('A');
var n = localStorage.getItem('n');
var I = localStorage.getItem('I');
var activeAnchor = localStorage.getItem('activeAnchor');
var isActive = localStorage.getItem('isActive');

if (localStorage.getItem('activeAnchor') > 0) {
    setActiveAnchor(localStorage.getItem('activeAnchor'));
}

if (W > 0) $('.W').val(W);
else $('.W').val('');
if (A > 0) $('.A').val(A);
else $('.A').val('');
if (n > 0) $('.n').val(n);
else $('.n').val('');
if (I > 0) $('.I').val(I);
else $('.I').val('');

calcCredit();

if (localStorage.getItem('buttonSave') != null) $('.button--save').text(localStorage.getItem('buttonSave'));



$('input').keyup(function () {
    W = $('.W').val();
    A = $('.A').val();
    I = $('.I').val();
    n = $('.n').val();
    if (activeAnchor > 0) {
        if ($(this).hasClass('W')) anchorAdjust(activeAnchor);
        if ($(this).hasClass('A')) anchorAdjustReverse(activeAnchor);
    }

    calcCredit();
    checkSaveButton();
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
    activeAnchor = '';
    localStorage.clear();
    $('.anchor--active').removeClass('anchor--active');
    $('.button--save').text('Save');
});

$('.button--save').on('click', function () {
    localStorage.setItem('W', W);
    localStorage.setItem('A', A);
    localStorage.setItem('I', I);
    localStorage.setItem('n', n);
    localStorage.setItem('buttonSave', 'Saved');
    localStorage.setItem('activeAnchor', activeAnchor);
    $('.button--save').text(localStorage.getItem('buttonSave'));
});

$('input').bind("change keyup input click", function () {
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '');
    }
    if (this.value.match(/[^0-9]|^0{1}/g)) {
        this.value = '';
    }
});

$('.anchor').on('mousedown', function () {
    if ($(this).hasClass('anchor--active')) activeAnchor = '';
    else {
        if ($(this).hasClass('anchor--10')) activeAnchor = '10';
        if ($(this).hasClass('anchor--15')) activeAnchor = '15';
        if ($(this).hasClass('anchor--20')) activeAnchor = '20';
        if ($(this).hasClass('anchor--25')) activeAnchor = '25';
        if ($(this).hasClass('anchor--30')) activeAnchor = '30';
        anchorAdjust(activeAnchor);
        calcCredit();
    }

    $(this).toggleClass('anchor--active');
    $(this).siblings('.anchor--active').toggleClass('anchor--active');

    checkSaveButton();
})

function calcCredit() {
    var C = W - A;
    var P = C * ((I / 1200) + ((I / 1200) / ((1 + (I / 1200)) ** (n * 12) - 1)));
    var L = P * n * 12 - C;
    var D = 5 * P / 3;

    if (n < 1) {
        P = '';
        D = '';
    }

    if (C > 0) $('.C').text(C.toLocaleString() + ' ₽');
    else $('.C').text('0 ₽');
    if (P > 0) $('.P').text(Math.round(P).toLocaleString() + ' ₽');
    else $('.P').text('0 ₽');
    if (L > 0) $('.L').text(Math.round(L).toLocaleString() + ' ₽');
    else $('.L').text('0 ₽');
    if (D > 0) $('.D').text(Math.round(D).toLocaleString() + ' ₽');
    else $('.D').text('0 ₽');
}

function setActiveAnchor(data) {
    $('.anchor--'+data).addClass('anchor--active');
}

function anchorAdjust(data) {
    if ($('.W').val() > 0) {
        $('.A').val(Math.round(W / 100 * data));
        A = $('.A').val();
    }
    else {
        $('.A').val('');
        A = '';
    }
}

function anchorAdjustReverse(data) {
    if ($('.A').val() > 0) {
        $('.W').val(Math.round(A / data * 100));
        W = $('.W').val();
    }
    else {
        $('.W').val('');
        W = '';
    }
}

function checkSaveButton() {
    if (W == localStorage.getItem('W') && A == localStorage.getItem('A') && I == localStorage.getItem('I') && n == localStorage.getItem('n') && activeAnchor == localStorage.getItem('activeAnchor')) $('.button--save').text('Saved');
    else $('.button--save').text('Save');
}