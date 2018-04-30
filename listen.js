$(function () {
    if (annyang) {
        annyang.setLanguage('ja');
        annyang.addCallback('result', function(userSaid) {
            $('#result').append('<br>'+userSaid[0]);
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