const Apps = "ZEINZH"
var currentPage = "main";
var currentContent = "";
var isDetecting = false;
var isQuaggaInit = false;
var checkoutsData = {
    item: [],
    unit: [],
    harga: [],
    total: []
};

if(localStorage.length < 1){
    localStorage.setItem('kode','[]');
    localStorage.setItem('nama','[]');
    localStorage.setItem('harga','[]');
}
// localStorage.clear();
// console.log(3 <= 3);


function addProduct(data) {
    if(Array.isArray(data) && data.length <= 3){
        let kode = JSON.parse(localStorage.getItem('kode')) || [];
        kode.push(data[0]);
        let nama = JSON.parse(localStorage.getItem('nama')) || [];
        nama.push(data[1]);
        let harga = JSON.parse(localStorage.getItem('harga')) || [];
        harga.push(data[2]);

        localStorage.setItem('kode',JSON.stringify(kode));
        localStorage.setItem('nama',JSON.stringify(nama));
        localStorage.setItem('harga',JSON.stringify(harga));
    }
}

function quaggaInit() {
    $(".data-panel").css('display', "flex");
    Quagga.init({
        inputStream : {
            name : "Live",
            type : "LiveStream",
            target: document.querySelector('#camera')    // Or '#yourElement' (optional)
        },
        decoder : {
            readers : ["ean_reader"]
        },
        locator: {
            patchSize: "medium",
            halfSample: true
        },
        locator: true,
        frequency: 5,
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        $("#camera").css('display', "flex");
        Quagga.start();
    });

    Quagga.onDetected(function (data) {
        $("input[name='code']").val(data.codeResult.code);
        
        Quagga.stop();
        Quagga.offDetected();

        
        $("#camera").hide();
        $("#panel").css("display", "flex");
    });
}

function navEvents() {
    $(".nav-items .icon ion-icon").click(function (e) { 
        e.preventDefault();
        let content = $(this).closest(".nav-items");
        let cname = $(this).closest(".nav-items").find(".name").text();
        switchContent(content, cname);
    });
    $(".nav-items .name").click(function (e) { 
        e.preventDefault();
        let content = $(this).parent();
        let cname = $(this).text();
        switchContent(content, cname);
    });
}

function loadNavigator(cnav){
    switch (cnav) {
        case "project-barcode":
            $.ajax({
                url: "src/nav-barcode.html",
                type: "get",
                dataType: "html",
                success: function (response) {
                    $(".header .navigation").html(response);
                    navEvents();
                },
                error: function (xhr, status, error){
                    console.log(xhr + "::" + status +"::" + error);
                }
            });
            break;
    
        default:
            $.ajax({
                url: "src/nav-default.html",
                type: "get",
                dataType: "html",
                success: function (response) {
                    $(".header .navigation").html(response);
                    navEvents();
                },
                error: function (xhr, status, error){
                    console.log(xhr + "::" + status +"::" + error);
                }
            });
            break;
    }
}

function loadJS(){
    switch (currentPage) {
        case "project":
            $(document).ready(function () {
                $(".project-items a").click(function (e) { 
                    e.preventDefault();
                    let content = $(this).parent();
                    let cname = $(this).text();
                    switchContent(content, cname);
                });
            });
            break;
        case "project-barcode":
            switch (currentContent){
                case "barcode-list":
                    class _JSON{

                        static export(data){
                            let a = typeof data;
                            
                            // Memastikan Data adalah Object
                            if(a !== "object"){
                                console.log("ERROR: Masukan tidak dapat diproses.");
                                return 0;
                            }
                    
                            // Memastikan Data tidak kosong
                            if(data.length <= 0){
                                console.log("ERROR: Data yang dimasukan kosong!");
                                return 0;
                            }
                    
                            // Menyiapkan Data
                            let __JSON = JSON.stringify(data);
                            let __BLOB = new Blob([__JSON], {type: 'application/json'});
                            let __URL = URL.createObjectURL(__BLOB);
                    
                            // Membangun DOM untuk pengunduhan
                            let __DOM = document.createElement('a');
                            __DOM.href = __URL;
                            __DOM.download = "__DATA.json";
                            __DOM.innerHTML = 'Unduh file JSON';
                    
                            // Mulai mengunduh
                            document.body.appendChild(__DOM);
                            __DOM.click();
                            document.body.removeChild(__DOM);
                        }
                    }

                    function showData() {
                        let setTable = $(".data-table .tbody");
                        $(setTable).html("");
                        let getData = [
                            JSON.parse(localStorage.getItem('kode')),
                            JSON.parse(localStorage.getItem('nama')),
                            JSON.parse(localStorage.getItem('harga'))
                        ]
                        for(let i = 0; i < getData[0].length; i++){
                            let setRow = document.createElement("div");
                            setRow.className = "tr";
                            
                            for(let j = 0; j < getData.length; j++){
                                let setColumn = document.createElement("div");
                                setColumn.className = "td";
                                $(setColumn).text(getData[j][i]);
                                $(setRow).append(setColumn);
                            }
                            
                            $(setTable).append(setRow);
                        }
                    }

                    $("#export").click(function (e) { 
                        e.preventDefault();
                        _JSON.export(localStorage);
                    });

                    $("form button").click(function (e) { 
                        e.preventDefault();
                        let colCode = $("input[name='code']").val();
                        let colName = $("input[name='nama']").val();
                        let colPrice = $("input[name='harga']").val();
                        addProduct([colCode,colName,colPrice]);
                        showData();

                        $("input[name='code']").val("");
                        $("input[name='nama']").val("");
                        $("input[name='harga']").val("");

                        $("#panel").hide();
                        $(".data-panel").hide();
                    });

                    $("#panel ion-icon[name='close']").click(function (e) { 
                        e.preventDefault();

                        $("input[name='code']").val("");
                        $("input[name='nama']").val("");
                        $("input[name='harga']").val("");

                        $("#panel").hide();
                        $(".data-panel").hide();
                    });
                    
                    showData();
                break;
                case "barcode-scan":
                    Quagga.init({
                        inputStream : {
                            name : "Live",
                            type : "LiveStream",
                            target: document.querySelector('#camera')    // Or '#yourElement' (optional)
                        },
                        decoder : {
                            readers : ["ean_reader"]
                        },
                        locator: {
                            patchSize: "medium",
                            halfSample: true
                        },
                        locator: true,
                        frequency: 5,
                    }, function(err) {
                        if (err) {
                            console.log(err);
                            return
                        }
                        Quagga.start();
                        isQuaggaInit = true;
                        checkoutsData = {
                            item: [],
                            unit: [],
                            harga: [],
                            total: []
                        };
                    });

                    // Add to Cart
                    function addToList(getCode){
                        let getIndex = -1;
                        let setContent = $(".checkouts-list");
                        let getProduct = JSON.parse(localStorage.getItem("kode"));

                        for(let i = 0; i < getProduct.length; i++){
                            if(getProduct[i] === getCode){
                                getIndex = i;
                                break;
                            }
                        }

                        if(getIndex >= 0){
                            getProduct = JSON.parse(localStorage.getItem("nama"));
                            let items = document.createElement("div");
                            items.className = "list-item";
                            
                            let product = document.createElement("span");
                            let inputs = document.createElement('input');
                            inputs.type = 'text';
                            inputs.value = '0';
                            inputs.maxLength = 3;

                            $(product).text(getProduct[getIndex]);
                            items.append(product);
                            items.append(inputs);

                            setContent.append(items);
                            checkoutsData.item.push(getProduct[getIndex]);
                            getProduct = JSON.parse(localStorage.getItem("harga"));
                            checkoutsData.harga.push(Number.parseInt(getProduct[getIndex]));
                            return true;
                        } else {
                            return false;
                        }
                    }

                    // Scan Barcode
                    $(".button ion-icon[name='scan']").click(function(e){
                        e.preventDefault();
                        $(this).addClass("active");
                        isDetecting = true;
                        Quagga.onDetected(function(data){
                            let setCode = data.codeResult.code;

                            Quagga.offDetected();

                            if(!addToList(setCode)){
                                alert(setCode + " tidak terdaftar!");
                            }
                            $(".button ion-icon[name='scan']").removeClass("active");
                        });
                    })

                    // Checkouts
                    $(".button span").click(function (e) { 
                        e.preventDefault();
                        if(isQuaggaInit){
                            Quagga.stop();
                            isQuaggaInit = false;
                        }
                        if(isDetecting){
                            Quagga.offDetected();
                            isDetecting = false;
                        }

                        $(".checkouts-list input").each(function (index, element) {
                            let total = Number.parseInt($(this).val());
                            checkoutsData.unit.push(total);
                            checkoutsData.total.push(total * checkoutsData.harga[index]);
                        });

                        let content = $(this);
                        let cname = "Receipts";
                        switchContent(content, cname);
                    });
                break;
                case "barcode-receipt":
                    let checkoutsList = $("#nota .list-items");
                    let hargaTotal = 0;

                    for (let i = 0; i < checkoutsData.item.length; i++) {
                        let items = document.createElement("div");
                        items.className = "items";
                        console.log(hargaTotal += Number.parseInt(checkoutsData.total[i]));

                        for (let j = 0; j < checkoutsData.item[i].length; j++) {
                            let details = document.createElement("span");
                            switch (j) {
                                case 0:
                                    $(details).text(checkoutsData.item[i]);
                                    items.append(details);
                                    break;
                                case 1:
                                    $(details).text(checkoutsData.unit[i]);
                                    items.append(details);
                                    break;
                                case 2:
                                    $(details).text(checkoutsData.harga[i]);
                                    items.append(details);
                                    break;
                                case 3:
                                    $(details).text(checkoutsData.total[i]);
                                    items.append(details);
                                    break;
                                default:
                                    break;
                            }
                        }
                        checkoutsList.append(items);
                    }
                    $("#nota .nilai-total").text(hargaTotal);
                break;
                default: 
                
                break;
            }
            break;
        default:
            break;
    }
}

function switchContent(content,title) {
    if(typeof content.data("url") !== "undefined"){
        let srcData = content.data("url");
        if(currentPage !== srcData){
            let html = "src/" + srcData + ".html";
            $.ajax({
                url: html,
                type: "get",
                dataType: "html",
                success: function (response) {
                    $(".contents").fadeOut(250, function(){
                        $(this).html(response);
                        $(".contents").removeClass(currentPage);
        
                        currentPage = srcData;
                        currentContent = "";
                        loadNavigator(currentPage);
                        $("title").text(Apps + " | " + title);
                        $(".contents").addClass(currentPage);
                        $(this).fadeIn(250, function(){
                            loadJS();
                        });
                    });
                },
                error: function (xhr, status, error){
                    console.log(xhr + "::" + status +"::" + error);
                }
            });
        }
    } else if(typeof content.data("content") !== "undefined"){
        let srcData = content.data("content");
        if(currentContent !== srcData){
            let html = "src/" + srcData + ".html";
            $.ajax({
                url: html,
                type: "get",
                dataType: "html",
                success: function (response) {
                    $(".content").fadeOut(250, function(){
                        $(this).html(response);
                        $(".content").removeClass(currentContent);
                        currentContent = srcData;
                        $(".content").addClass(currentContent);
                        $(this).fadeIn(250, function(){
                            loadJS();
                        });
                    });
                },
                error: function (xhr, status, error){
                    console.log(xhr + "::" + status +"::" + error);
                }
            });
        }
    }
    if(isQuaggaInit){
        Quagga.stop();
        isQuaggaInit = false;
    }
    if(isDetecting){
        Quagga.offDetected();
        isDetecting = false;
    }
}

$(document).ready(function () {
    $(".container").fadeIn(500);
    navEvents();
});