$(function () {
    let ss = window.speechSynthesis;
    let msg = new SpeechSynthesisUtterance();
    msg.lang = "ja-JP";
    
    ss.onvoiceschanged = function(){
        ss.onvoiceschanged = null;
        let voices = ss.getVoices();
        $.each(voices,function(index,value){
            if(value.voiceURI==="Google 日本語"){
                msg.voice = value;
            }
        })
    }

    if (annyang) {
        annyang.setLanguage('ja');
        annyang.addCallback('result', function(userSaid) {
            let text = userSaid[0];
            $('#result').append('<br>'+text);
            msg.text = text;
            ss.speak(msg);
            //userSaidはStringの配列となっている
            //複数の候補が可能性の高い順に格納されている
            //lengthは一定ではなく1の時もある
        });

        $('#start-btn').on('click', function () {
            annyang.start();
            $('#sound').text("録音中")
        });
        $('#stop-btn').on('click', function () {
            annyang.pause();
            $('#sound').text("停止中")
        });
    }
})