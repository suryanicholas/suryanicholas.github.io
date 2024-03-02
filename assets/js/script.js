$(document).ready(function () {

    function navItemsActive(obj){
        let w = $(obj).parent().width();
        let x = $(obj).parent().position().left + w;
        $(".navigation .pointer").css({
            "right": `calc(100vw - ${x}px)`,
            "width": `${w}px`
        });
    };

    navItemsActive(".nav-items.active a");

    $(".nav-items a").click(function (e) { 
        // e.preventDefault();
        
        navItemsActive(this);

        $(".nav-items").removeClass("active");
        $(this).parent().addClass("active");
    });
    
    $(window).resize(function () { 
        navItemsActive(".nav-items.active a");
    });

    $(".container").scroll(function () { 
        let y = $(this).scrollTop();
        $(".container .contents").each(function (index, element) {
            // element == this
            let x = $(element).position().top;
            if(x == 50){
                let pages = $(element).attr("id");
                $(".header .navigation .nav-items").removeClass("active");
                $(`.nav-items a[href='#${pages}']`).parent().addClass("active");
                window.location.href = "#" + pages;
                navItemsActive(".nav-items.active a");
            }
        });
    });
});