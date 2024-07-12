var s;
$(document).ready(function () {
    $(".indicator .active").width($("header .navbar .nav-link:first-child").width());
});

$("header .navbar .nav-link").each(function (index, element) {
    $(element).click(function (e) {
        $(".indicator .active").width($(this).width()).css("left", $(this).position().left + "px");
    });

    $(element).mouseenter(function () { 
        $(".indicator .hover").width($(this).width()).css({"left": $(this).position().left + "px", "opacity": "1"});
    });
});
$("header .navbar").mouseleave(function () { 
    clearTimeout(s);
    s = setTimeout(() => {
        $(".indicator .hover").width(0).css("opacity", "0");
    }, 100);
});