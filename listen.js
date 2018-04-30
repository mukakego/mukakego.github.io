$(function () {
    if (annyang) {
        annyang.setLanguage('ja');
        annyang.addCallback('result', function(userSaid) {
            $('#result').append('<br>'+userSaid);
        });

        $('#start-btn').on('click', function () {
            annyang.start();
        });
        $('#stop-btn').on('click', function () {
            annyang.pause();
        });
    }
})