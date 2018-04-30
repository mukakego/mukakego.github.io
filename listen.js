$(function(){
    let recognition = new webkitSpeechRecognition();
    recognition.lang = "ja";
    let recording = false;
    $('#start-btn').on('click', function() {
        recording = true;
        recognition.start();
    });
    $('#stop-btn').on('click', function() {
        recording = false;
        recognition.stop();
    });
    recognition.addEventListener('result', function(e) {
        let text = e.results[0][0].transcript;
        $("#result").append("<br>"+text)
    })
    recognition.onaudioend = function(){
        recording && recognition.start();
    }
})