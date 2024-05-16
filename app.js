var _sC = ["DangerousDuel", 0];
const _EventSchema = {
    DangerousDuel: [
        [10, 8],
        [10, 8],
        [10, 8],
        [12, 9],
        [12, 9],
        [12, 9],
        [14, 10],
        [15, 10],
        [16, 10],
        [19, 11],
        [20, 11],
        [21, 11],
        [23, 12],
        [23, 12],
        [24, 12],
        [26, 13],
        [26, 13],
        [26, 13],
        [28, 14],
        [30, 14],
        [34, 14],
        [39, 18],
        [44, 20],
        [48, 22],
        [56, 25],
        [63, 28],
        [70, 31],
        [78, 34]
    ],
    RuthlessPursuit: [
        [27, 12],
        [32, 14],
        [36, 16],
        [41, 18],
        [46, 20],
        [50, 22],
        [57, 25],
        [64, 28],
        [71, 31],
        [78, 34]
    ]
};

$(document).ready(function () {
    let _dd = _EventSchema.DangerousDuel.length;

    for(let i = 0; i < _dd; i++){
        let _option = document.createElement('option');
        _option.textContent = "Dangerous Duel " + (i+1).toString().padStart(2,0);
        _option.value = i;
        if(i == 0){
            _option.selected = true;
        }

        $('#challangesLevel').append(_option);
    }
});

$("#switchToDD").click(function (e) { 
    if($(this).hasClass("btn-secondary")){
        $('#challangesLevel').html("");
        $(this).removeClass("btn-secondary");
        $(this).addClass("btn-success");

        $("#switchToRP").removeClass("btn-success");
        $("#switchToRP").addClass("btn-secondary");

        let _dd = _EventSchema.DangerousDuel.length;

        for(let i = 0; i < _dd; i++){
            let _option = document.createElement('option');
            _option.textContent = "Dangerous Duel " + (i+1).toString().padStart(2,0);
            _option.value = i;
            if(i == 0){
                _option.selected = true;
            }
    
            $('#challangesLevel').append(_option);
        }

        _sC[0] = "DangerousDuel";
        _sC[1] = 0;
        $("#currentPoint").trigger("change");
    }
});
$("#switchToRP").click(function (e) { 
    if($(this).hasClass("btn-secondary")){
        $('#challangesLevel').html("");
        $(this).removeClass("btn-secondary");
        $(this).addClass("btn-success");

        $("#switchToDD").removeClass("btn-success");
        $("#switchToDD").addClass("btn-secondary");

        let _rp = _EventSchema.RuthlessPursuit.length;

        for(let i = 0; i < _rp; i++){
            let _option = document.createElement('option');
            _option.textContent = "Ruthless Pursuit " + (i+1).toString().padStart(2,0);
            _option.value = i;
    
            $('#challangesLevel').append(_option);
        }

        _sC[0] = "RuthlessPursuit";
        _sC[1] = 0;
        $("#currentPoint").trigger("change");
    }
});

$("#challangesLevel").change(function () { 
    _sC[1] = parseInt(this.value);

    $("#currentPoint").trigger("change");
});

$("#currentPoint").change(function () { 
    let _g = 12000;

    let _c = parseInt(this.value);
    let _mA = 0;
    if((_g - _c) % _EventSchema[_sC[0]][_sC[1]][0]){
        _mA = Math.floor((_g - _c) / _EventSchema[_sC[0]][_sC[1]][0]) + 1;
    } else {
        _mA = Math.floor((_g - _c) / _EventSchema[_sC[0]][_sC[1]][0]);
    }

    $("#manualStamina").text(_mA * _EventSchema[_sC[0]][_sC[1]][1]);
    $("#manualAct").text(_mA);

    let _mE = 0;
    if(_mA % 3){
        _mE = Math.floor(_mA / 3) + 1;
    } else{
        _mE = Math.floor(_mA / 3);
    }

    $("#instantStamina").text(_mE * (_EventSchema[_sC[0]][_sC[1]][1] * 3));
    $("#instantEnergy").text(_mE);
});