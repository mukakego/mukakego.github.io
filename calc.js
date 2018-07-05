$(function () {
    jQuery.fn.toInt = function () {
        return this.val() - 0;
    }

    let min = (a, b) => a < b ? a : b;
    let max = (a, b) => a < b ? b : a;

    let LV_EXP = { 1: 0, 2: 100, 3: 300, 4: 600, 5: 1000, 6: 1500, 7: 2100, 8: 2800, 9: 3600, 10: 4500, 11: 5500, 12: 6600, 13: 7800, 14: 9100, 15: 10500, 16: 12000, 17: 13600, 18: 15300, 19: 17100, 20: 19000, 21: 21000, 22: 23100, 23: 25400, 24: 27900, 25: 30600, 26: 33500, 27: 36600, 28: 39900, 29: 43400, 30: 47100, 31: 51000, 32: 55200, 33: 59700, 34: 64500, 35: 69600, 36: 75100, 37: 81000, 38: 87300, 39: 94000, 40: 101200, 41: 108900, 42: 117200, 43: 126100, 44: 135700, 45: 146000, 46: 157100, 47: 169000, 48: 181800, 49: 195500, 50: 210200, 51: 226000, 52: 243000, 53: 261200, 54: 280700, 55: 301600, 56: 324000, 57: 348000, 58: 373700, 59: 401200, 60: 430700, 61: 462300, 62: 496500, 63: 533500, 64: 573500, 65: 616700, 66: 663400, 67: 713900, 68: 768500, 69: 827500, 70: 891300, 71: 960300, 72: 1035600, 73: 1117700, 74: 1207200, 75: 1304800, 76: 1411200, 77: 1527200, 78: 1653700, 79: 1791600, 80: 1942000, 81: 2106000, 82: 2291400, 83: 2501000, 84: 2737900, 85: 3005600, 86: 3308200, 87: 3650200, 88: 4036700, 89: 4473500, 90: 4967100, 91: 5524900, 92: 6166400, 93: 6904200, 94: 7752700, 95: 8728500, 96: 9850700, 97: 11141300, 98: 12690100, 99: 14548700, 100: 16779100, 101: 16779100 };
    let MAT_EXP = {
        same: { small: 1200, medium: 3600, large: 6000, germ: 36000 },
        diff: { small: 1000, medium: 3000, large: 5000, germ: 30000 }
    }

    function correctInput($dom) {
        let value = $dom.val().replace(/\D/, "");
        $dom.val(
            min(100, max(1, value))
        );
    }

    function CGButton($dom) {
        let $level = $("#" + $dom.attr("class"));
        $level.val(
            min(100, max(1, $level.toInt() + $dom.toInt()))
        );
    }

    function autoNext() {
        let current = $current.toInt();
        let max = LV_EXP[current + 1] - LV_EXP[current];
        $next.val(max);
    }

    function correctNext() {
        let current = $current.toInt();
        let next = $next.toInt();
        let max = LV_EXP[current + 1] - LV_EXP[current];
        $next.val(
            min(max, next)
        );
    }

    function calcLv() {
        let current = $current.toInt();
        let goal = $("#goal").toInt();

        if (current > 100 || current < 0 || goal > 100 || goal < 0) return;

        let next = $next.toInt();
        let needexp = max(0, LV_EXP[goal] - LV_EXP[current + 1] + next);
        $("#need").val(needexp);

        for (attr in MAT_EXP) {
            for (size in MAT_EXP[attr]) {
                let oneexp = MAT_EXP[attr][size];
                $("#" + attr + "-" + size).val((needexp / oneexp).toFixed(1));
            }
        }
    }

    function button() {
        CGButton($(this));
        correctNext();
        calcLv();
    }

    function auto() {
        autoNext();
        calcLv();
    }

    function text() {
        correctInput($(this));
        correctNext();
        calcLv();
    }

    let $next = $("#tonext");
    let $current = $("#current");

    $("input[type='text']").on('input keyup blur', text);
    $("input[type='button']").on("click", button);
    $("#auto").on("click", auto);

    autoNext();
    calcLv();
})