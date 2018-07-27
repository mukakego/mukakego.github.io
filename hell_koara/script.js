$(function(){
    let koaraimg = [];
    let koaradata = [];
    let onload = function (p) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        canvas.width = 188;
        canvas.height = 188;
        ctx.drawImage(koaraimg[p], 0, 0, canvas.width, canvas.height);
        koaradata[p] = canvas.toDataURL("image/png");
    }

    let rotatekoara = function(){
        $("body").css("background-image", 'url("' + koaradata[frameCount%4] + '")');
    }

    let waitkoara = function(){
        if (0 in koaradata)
            if (1 in koaradata)
                if (2 in koaradata)
                    if (3 in koaradata)
                        draw = rotatekoara;
    }

    let loadkoara = function () {
        for (let i = 0; i < 4; i++) {
            koaraimg[i] = new Image();
            koaraimg[i].onload = () => onload(i);
            koaraimg[i].src = "" + i + ".png";
        }
        draw = waitkoara;
    }

    draw = loadkoara;
})

setup = function(){}