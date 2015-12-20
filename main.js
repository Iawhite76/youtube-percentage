var EVT = new EventEmitter2();

(($,window) => {
    var CustomYoutubeFunctionsModule = (() => {
        function timeEvent(data) {
            console.log('data ' , data);
            // call WT function here
        }

        function youTubeIframeAPIReady(data) {
            console.log('youTubeIframeAPIReady');
            $('body').on(
                'click', 
                '[rel="js-youtube-play"]', 
                (e) => { 
                    var videoId = $(e.target).data('vid-id');
                    EVT.emit('createPlayer', videoId)
                }
            );       
        }

        function youtubePlayerReady() {
            console.log('youtubePlayerReady');
        }

        function YTPlayerStartPLAYING() {
            console.log('YTPlayerStartPLAYING');
        }

        function YTPlayerInit() {
            console.log('YTPlayerInit');
        }

        var publicAPI = {
            timeEvent,
            youtubePlayerReady,
            YTPlayerInit,
            YTPlayerStartPLAYING,
            youTubeIframeAPIReady
        }

        return publicAPI;
    })();

    if(typeof module !== 'undefined' && module.exports) {
        module.exports = CustomYoutubeFunctionsModule;
    } else {
        window.CustomYoutubeFunctionsModule = CustomYoutubeFunctionsModule;
    }
})(jQuery,window);

$(document).ready(() => {
    YoutubeModule.init();
    EVT.emit('init');
    EVT.on('timeEvent', CustomYoutubeFunctionsModule.timeEvent);
    EVT.on('youTubeIframeAPIReady', CustomYoutubeFunctionsModule.youTubeIframeAPIReady);
    EVT.on('youtubePlayerReady', CustomYoutubeFunctionsModule.youtubePlayerReady);
    EVT.on('YTPlayerStartPLAYING', CustomYoutubeFunctionsModule.YTPlayerStartPLAYING);
    EVT.on('YTPlayerInit', CustomYoutubeFunctionsModule.YTPlayerInit);
});
