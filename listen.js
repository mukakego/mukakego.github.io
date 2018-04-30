$(function(){
    let recognition = new webkitSpeechRecognition();
    recognition.lang = "ja";
    $('#start-btn').on('click', function() {
        recognition.start();
    });
    recognition.addEventListener('result', function(e) {
        let text = e.results[0][0].transcript;
        $("#result").append("<br>"+text)
    })
    recognition.onend = function(){
        recognition.start();
    }
})