$(function(){
    let $targettext = $("#targettext");
    let btn = ".btn";
    let url = "#url";

    let cannotUseInFileName = ["\¥", "\/", "\:", "\*", "\"", "\<", "\>", "\|"];
    let availableInFileName = ["￥", "／", "：", "＊", "”", "＜", "＞", "｜"];
    
    let toFileName = function(url,ext){
        let fileName = url
        .trim()
        .replace(/^http(s)?:\/\//, "")
        .replace(/^mobile\.twitter\.com/, "twitter.com")
        .replace(/\/photo\/[0-9]?$/,"");
        for(let i = 0; i < 8;i++){
            let c = cannotUseInFileName[i];
            let a = availableInFileName[i];

            let regexp = new RegExp("\\"+c,'g');
            fileName = fileName.replace(regexp,a);
        }
        fileName = "・" + fileName + "#." + ext;
        return fileName;
    }

    let toUrl = function(fileName){
        let url = fileName
        .trim()
        .replace(/^・*/, "");
        for(let i = 0; i < 8;i++){
            let c = cannotUseInFileName[i];
            let a = availableInFileName[i];

            let regexp = new RegExp(a,'g');
            url = url.replace(regexp,c);
        }
        return url;
    }

    new ClipboardJS(btn, {
        text: function(trigger) {
            let url = $targettext.val();
            let ext = $(trigger).attr("id");
            return toFileName(url,ext);
        }
    });

    new ClipboardJS(url, {
        text: function() {
            let fileName = $targettext.val();
            return toUrl(fileName);
        }
    });

    let noTextNoCopy = function(){
        let text = $targettext.val();
        text = text === "" ? false : true;
        $(btn).prop("disabled",!text);
        $(url).prop("disabled",!text);
    }
    noTextNoCopy();
    $targettext.on('input keyup blur',noTextNoCopy);
});