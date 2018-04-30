$(function(){
    let newRecog = function(){
        let recog = new webkitSpeechRecognition();
        recog.lang = "ja";
        recog.addEventListener('result', function(e) {
            let text = e.results[0][0].transcript;
            $("#result").append("<br>"+text)
        })
        return recog;
    }
    let recognition = newRecog();
    $('#start-btn').on('click', function() {
        recognition.start();
    });
    $('#stop-btn').on('click', function() {
        recognition.stop();
    });
    recognition.onaudioend = function(){
        let recognition = newRecog();
        recognition.start();
    }
})