const __DOM = {
    title: $('#title')
};

var __INDEX = Math.floor(Math.random() * 100);

const __COUNTRY = [];
$.ajax({
    url: "https://countriesnow.space/api/v0.1/countries/capital",
    method: "GET",
    timeout: 0,
    success: function (result) {
        for(let i = 0; i < result.data.length; i++){
            __COUNTRY.push(result.data[i].name);
        }
    },
    error: function (error) { 
        console.log(error);
    }
});

class __DIALOG{
    
    static __DOM(title, messages, trueText, falseText){
        let alertPanel = document.createElement("div");
        let alertContent = document.createElement("div");
        let alertTitle = document.createElement("div");
        let alertTitleSpan = document.createElement("span");
        // let alertTitleIcon = document.createElement("ion-icon");
        let alertMessages = document.createElement("div");
        let alertMessagesSpan = document.createElement("span");
        let alertControl = document.createElement("div");
        // let alertControlFalse = document.createElement("div");
        let alertControlTrue = document.createElement("div");

        alertPanel.id = "alertPanel";
        alertContent.className = "alert-content";
        alertTitle.className = "title";
        alertTitleSpan.textContent = title || "Alert";
        // alertTitleIcon.setAttribute("name", "close");
        alertMessages.className = "messages";
        alertMessagesSpan.textContent = messages || "Server says: ";
        alertControl.className = "control";
        // alertControlFalse.className = "alert-false";
        // alertControlFalse.textContent = falseText || "Close";
        alertControlTrue.className = "alert-true";
        alertControlTrue.textContent = trueText || "OK";

        $(alertTitle).append(alertTitleSpan);
        // $(alertTitle).append(alertTitleIcon);
        $(alertMessages).append(alertMessagesSpan);
        // $(alertControl).append(alertControlFalse);
        $(alertControl).append(alertControlTrue);

        $(alertContent).append(alertTitle);
        $(alertContent).append(alertMessages);
        $(alertContent).append(alertControl);
        
        $(alertPanel).append(alertContent);

        return alertPanel;
    }

    static show(content,callback){
        if(typeof content !== "object" || content.length < 2 || content.length > 2){
            console.log("Kesalahan sintaksis parameter! " + content);
            return 0;
        }

        $(".container").append(__DIALOG.__DOM(content[0],content[1]));
        
        $("#alertPanel ion-icon[name='close']").click(function (e) { 
            e.preventDefault();
            $("#alertPanel").remove();
        });

        $("#alertPanel .alert-false").click(function (e) { 
            e.preventDefault();
            callback(false);
            $("#alertPanel").remove();
        });
        $("#alertPanel .alert-true").click(function (e) { 
            e.preventDefault();
            if(callback(true)){
                __INDEX = Math.floor(Math.random() * 100);
                $(".quest .text span:nth-child(2)").text(__COUNTRY[__INDEX] + "?");
            }
            $("#alertPanel").remove();

            $(".quest input").val("");
        });
    }
}

class Animate{

    static suffle(string){
        $(__DOM.title).find("div").hide(100);
        setTimeout(() => {
            __DOM.title.text("");
        let __OBJECT = {
            string: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
            number: [0,1,2,3,4,5,6,7,8,9]
        }

        for(let i = 0; i < string.length; i++){
            let div = document.createElement("div");
            $(div).hide();
            let span = document.createElement("span");
            $(span).text();
            div.append(span);
            __DOM.title.append(div);
        }

        let x = 0;
        let y = 0;
        let z = setInterval(()=>{
            if(string[y] !== " "){
                $(__DOM.title).find("div").eq(y).show(250);
            } else{
                $(__DOM.title).find("div").eq(y).css('opacity', '0');
                $(__DOM.title).find("div").eq(y).show(250);
            }
            $(__DOM.title).find("span").eq(y).text(__OBJECT.string[x++]);
            if(x === 26){
                x = 0;
                $(__DOM.title).find("span").eq(y).text(string[y++]);
            };
            if(y > string.length - 1){
                clearInterval(z);
            };
        }, 10);
        }, 101);
    }
}

$(document).ready(function () {
    Animate.suffle("TUGAS AKHIR");
    setTimeout(() => {
        Animate.suffle("Javascript jQuery");
        setTimeout(() =>{
            Animate.suffle("PERMAINAN KATA");
        }, 7000);
    }, 6000);
});

$(window).keydown(function (e) {
    if(e.key == 'CapsLock'){
        $("#panel .keyboards a").each(function (index, element) {
            if(e.originalEvent.getModifierState('CapsLock')){
                $(this).text($(this).text().toUpperCase());
            } else {
                $(this).text($(this).text().toLowerCase());
            }
        });
    }
    if(e.key === 'Enter'){
        var settings = {
            "url": "https://countriesnow.space/api/v0.1/countries/capital",
            "method": "POST",
            "timeout": 0,
            "data": {
                country: __COUNTRY[__INDEX]
            },
        };
        
        $.ajax(settings).done(function (response) {
            if(response.data.capital.toLowerCase() === $('.quest input').val().toLowerCase()){    
                __DIALOG.show(["Hasil","Jawaban kamu benar!"],function(){
                    return true;
                });
            } else{
                __DIALOG.show(["Hasil","Jawaban kamu salah!"],function(){
                    return false;
                });
            }
        });
    }
    $('#panel .keyboards a[data-key="'+ e.key.toUpperCase() + '"]').addClass("true");
});
$(window).keyup(function(e){
    setTimeout(() =>{
        $('#panel .keyboards a[data-key="'+ e.key.toUpperCase() + '"]').removeClass("true");
    }, 100)
});

$('#panel .keyboards a').click(function (e) { 
    e.preventDefault();
    let value = "";
    value += $(".quest input").val();
    value += $(this).text();
    $(".quest input").val(value);
});

// 

$(document).ready(function () {
    $(".quest .text span:nth-child(2)").text(__COUNTRY[__INDEX] + "?");

    $(".quest .answer ion-icon").click(function (e) { 
        e.preventDefault();
        __INDEX = Math.floor(Math.random() * 100);
        $(".quest .text span:nth-child(2)").text(__COUNTRY[__INDEX] + "?");

        $(".quest input").val("");
    });
});