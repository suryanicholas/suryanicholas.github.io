var s;
$(document).ready(function () {
    $(".indicator .active").width($("header .hn.navbar .nav-link:first-child").width());
});

$("header .hn.navbar .nav-link").each(function (index, element) {
    $(element).click(function (e) {
        $(".indicator .active").width($(this).width()).css("left", $(this).position().left + "px");

        $(this).parents(".navbar").find(".nav-item").removeClass("active");
        $(this).closest(".nav-item").addClass("active");
    });

    $(element).mouseenter(function () { 
        if(!$(this).closest(".nav-item").hasClass("active")){
            $(".indicator .hover").width($(this).width()).css({"left": $(this).position().left + "px", "opacity": "1"});
        }
    });
});
$("header .hn.navbar").mouseleave(function () { 
    clearTimeout(s);
    s = setTimeout(() => {
        $(".indicator .hover").width(0).css("opacity", "0");
    }, 100);
});