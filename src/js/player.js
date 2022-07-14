let player;
const playerContainer = $(".player");


let eventsInit = () => {

    $(".player__start").on("click", e => {
        e.preventDefault();

        if(playerContainer.hasClass("paused")) {
            player.pauseVideo();  
        } else {
            player.playVideo();
        }
    });

    $(".player__playback").click((e)=> {
        const bar = $(e.currentTarget);
        const clickedPosition = e.originalEvent.layerX;
        const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
        const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

        $(".player__playback-button").css({
            left: `${newButtonPositionPercent}%`
        })

        player.seekTo(newPlaybackPositionSec);
    }) 

    $(".player__splash").click(e => {
        player.playVideo();
    })

    $(".player__volume-bar").on("click", (e) => {
        const volumeBar = $(e.currentTarget);
        const clickedVolumePosition = e.originalEvent.layerX;
        const newSoundPositionPercent = (clickedVolumePosition/volumeBar.width()) * 100;
        const roundSoundPercent = Math.round(newSoundPositionPercent);

        $(".player__volume-button").css({
            left: `${newSoundPositionPercent}%`
        })
        
        player.setVolume(roundSoundPercent);

    })
} 

const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();

    if (typeof interval == 'undefined') {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;

        $(".player__playback-button").css({
            left: `${completedPercent}%`
        });

    }, 1000);
}

const onPlayerStateChange = event => {
    switch(event.data) {
        case 1:
            playerContainer.addClass('active');
            playerContainer.addClass('paused');
            break;
        
        case 2:
            playerContainer.removeClass('active');
            playerContainer.removeClass('paused');
            break;
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '100%',
        width: '100%',
        videoId: 'W7h-Yho8EB0',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 1,
            showinfo: 0,
            rel: 0,
            autoplay: 0,
            modestbranding: 0
        }
    });
}

eventsInit();