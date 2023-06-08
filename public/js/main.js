
$('.nav li').has('ul').addClass('dropdown');
$('.nav li').has('ul').append('<span className="drop-button"></span>');
$('.drop-button').click(function () {
    $(this).parent().children('ul').slideToggle();
    $(this).parent().siblings('li').children('ul').slideUp();
    $(this).toggleClass('active')
})

$('#toggle').click(function () {
    $('.nav').slideToggle();
    $(this).toggleClass('on');
})

$(window).scroll(function () {
    var sticky = $('.header'),
        scroll = $(window).scrollTop();
    if (scroll >= 200) sticky.addClass('fixed');
    else sticky.removeClass('fixed');
});

$(window).scroll(function () {
    var upDown = $('.scroll-up'),
        scroll = $(window).scrollTop();
    if (scroll >= 200) upDown.addClass('active');
    else upDown.removeClass('active');


});

$('.scroll-up').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    return false;
});

// $('.testimonial-items').slick({
//     arrows: true,
//     dots: false,
//     autoplay: true,
//     autoplaySpeed: 2000,
// });


$('[data-showElement]').click(function () {
    let getId = $(this).attr('data-showElement');
    $(getId).fadeIn();
})
$('.model-close').click(function () {
    $('.model-popup').fadeOut();
})


