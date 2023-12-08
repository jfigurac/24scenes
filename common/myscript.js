var isFirstClick = true;

function startVideo() {
    if (isFirstClick) {
        // Add logic here to start your video
        playNextVideo();

        // Hide the button
        var startButtonContainer = document.getElementById('startButtonContainer');
        startButtonContainer.style.display = 'none';

        // Update the flag to indicate that the button has been clicked
        isFirstClick = false;
    }
}

var videoPlayer = document.getElementById('videoPlayer');
var videoContainer = document.getElementById('videoContainer');

var originalVideoData = [
    { title: "backyard_garden", source: "assets/backyard_garden.mp4", duration: 10.28, size: 38.6, date: "2023-11-14T10:37:00" },
    { title: "blinking_lights", source: "assets/blinking_lights.mp4", duration: 6.18, size: 23.1, date: "2023-11-14T16:43:00" },
    { title: "bouncing_ball", source: "assets/bouncing_ball.mp4", duration: 12.77, size: 44.5, date: "2023-11-23T12:41:00" },
    { title: "cctv_laundromat", source: "assets/cctv_laundromat.mp4", duration: 9.27, size: 35, date: "2023-11-19T20:42:00" },
    { title: "cutting_garlic", source: "assets/cutting_garlic.mp4", duration: 2.36, size: 9, date: "2023-11-24T11:39:00" },
    { title: "dinner_spread", source: "assets/dinner_spread.mp4", duration: 10.24, size: 38.4, date: "2023-11-24T20:17:00" },
    { title: "disturbed_water", source: "assets/disturbed_water.mp4", duration: 8.36, size: 31.3, date: "2023-11-23T13:50:00" },
    { title: "door_closing", source: "assets/door_closing.mp4", duration: 4.60, size: 17.1, date: "2023-11-24T11:49:00" },
    { title: "here_sign", source: "assets/here_sign.mp4", duration: 5.48, size: 20.4, date: "2023-11-23T14:34:00" },
    { title: "office_woman", source: "assets/office_woman.mp4", duration: 8.44, size: 31.6, date: "2023-14-23T16:53:00" },
    { title: "parking_lot", source: "assets/parking_lot.mp4", duration: 8.66, size: 32.5, date: "2023-11-23T14:41:00" },
    { title: "pen_clicking", source: "assets/pen_clicking.mp4", duration: 5.65, size: 21.1, date: "2023-11-23T13:04:00" },
    { title: "pizza_slice", source: "assets/pizza_slice.mp4", duration: 7.78, size: 29.3, date: "2023-11-14T14:46:00" },
    { title: "printing_paper", source: "assets/printing_paper.mp4", duration: 21.52, size: 81.4, date: "2023-11-25T14:42:00" },
    { title: "right_arrows", source: "assets/right_arrows.mp4", duration: 7.23, size: 27.5, date: "2023-11-23T13:45:00" },
    { title: "running_water", source: "assets/running_water.mp4", duration: 4.52, size: 17.2, date: "2023-11-14T13:55:00" },
    { title: "seeknok_river", source: "assets/seeknok_river.mp4", duration: 18.36, size: 69.1, date: "2023-11-14T12:11:02" },
    { title: "soccer_goal", source: "assets/soccer_goal.mp4", duration: 4.48, size: 16.9, date: "2023-11-23T14:03:00" },
    { title: "stop_light", source: "assets/stop_light.mp4", duration: 7.79, size: 30, date: "2023-11-14T16:58:00" },
    { title: "stop_sign", source: "assets/stop_sign.mp4", duration: 7.65, size: 28.8, date: "2023-11-23T16:46:00" },
    { title: "under_highway", source: "assets/under_highway.mp4", duration: 8.49, size: 31.8, date: "2023-11-23T14:11:00" },
    { title: "washing_machine", source: "assets/washing_machine.mp4", duration: 10.41, size: 39.1, date: "2023-11-193T20:06:00" },
    { title: "wearing_sweater", source: "assets/wearing_sweater.mp4", duration: 13.69, size: 51.6, date: "2023-11-23T13:25:00" },
    { title: "word_is", source: "assets/word_is.mp4", duration: 16.02, size: 60.5, date: "2023-11-23T15:23:00" },
];
var videoData = [...originalVideoData];
var currentVideoIndex = 0;

let preloaded = false;
var nextVideo;
function preloadNextVideo() {
    var nextVideoIndex = currentVideoIndex + 1;
    if (nextVideoIndex < videoData.length) {
        nextVideo = document.createElement('video');
        nextVideo.classList.add('alecsVideo');
        nextVideo.id = 'videoPlayer';
        nextVideo.src = videoData[nextVideoIndex].source;
        nextVideo.preload = 'auto';
        preloaded = true;
    }
}

let initialize = true;
function playNextVideo() {
    initialize = false;
    updatePlayPauseButton("PAUSE");
    var currentVideo = videoData[currentVideoIndex];

    if (currentVideo) {
        if (preloaded) {
            videoContainer.appendChild(nextVideo);
            videoPlayer.remove();
            videoPlayer = nextVideo;
            preloaded = false;
        } else {
            videoPlayer.src = currentVideo.source;
            videoPlayer.load();
        }
        videoPlayer.play();
        preloadNextVideo();
        videoPlayer.addEventListener('ended', function () {
            currentVideoIndex++;
            playNextVideo();
        });        
    } else {
        console.log("All videos played");
        updatePlayPauseButton("PLAY");
        initialize = true;
        currentVideoIndex = 0;
    }
}


var clickPlayButton = document.getElementById('clickPlay');
clickPlayButton.addEventListener('click', function () {
    var video = document.getElementById('videoPlayer');
    if (video.paused) {
        if (initialize) {
            playNextVideo();
        } else {
            video.play();
        }
        clickPlayButton.innerHTML = 'PAUSE';
    } else {
        video.pause();
        clickPlayButton.innerHTML = 'PLAY';
    }
});

function toggleSoundMute() {
    videoPlayer.muted = !videoPlayer.muted;
    updateClickSound();
}

function updateClickSound() {
    var buttonText = videoPlayer.muted ? "SOUND" : "MUTE";
    clickSound.innerHTML = buttonText;
}

function updatePlayPauseButton(text) {
    var clickPlayButton = document.getElementById('clickPlay');
    clickPlayButton.innerHTML = text;
}

// Sorting functions

function titleAZ() {
    videoData = [...originalVideoData];
    videoData.sort(function (a, b) {
        return a.title.localeCompare(b.title);
    });
    currentVideoIndex = 0;
    initialize = true;
    playNextVideo();
}

function titleZA() {
    videoData = [...originalVideoData];
    videoData.sort(function (a, b) {
        return b.title.localeCompare(a.title);
    });
    currentVideoIndex = 0;
    initialize = true;
    playNextVideo();
}

function durationAsc() {
    videoData = [...originalVideoData];
    videoData.sort(function (a, b) {
        return a.duration - b.duration;
    });
    currentVideoIndex = 0;
    initialize = true;
    playNextVideo();
}

function durationDesc() {
    videoData = [...originalVideoData];
    videoData.sort(function (a, b) {
        return b.duration - a.duration;
    });
    currentVideoIndex = 0;
    initialize = true;
    playNextVideo();
}

function sizeAsc() {
    videoData = [...originalVideoData];
    videoData.sort(function (a, b) {
        return a.size - b.size;
    });
    currentVideoIndex = 0;
    initialize = true;
    playNextVideo();
}

function sizeDesc() {
    videoData = [...originalVideoData];
    videoData.sort(function (a, b) {
        return b.size - a.size;
    });
    currentVideoIndex = 0;
    initialize = true;
    playNextVideo();
}

function filmingDateAsc() {
    videoData = [...originalVideoData];
    videoData.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });
    currentVideoIndex = 0;
    initialize = true;
    playNextVideo();
}

function filmingDateDesc() {
    videoData = [...originalVideoData];
    videoData.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });
    currentVideoIndex = 0;
    initialize = true;
    playNextVideo();
}

function shuffleVideos() {
    videoData = [...originalVideoData];
    videoData.sort(function () {
        return Math.random() - 0.5;
    });
    currentVideoIndex = 0;
    initialize = true;
    playNextVideo();
}


// Initial video play
function openInfo() {
    let info = document.querySelector('.info');
    info.style.display = "block";
}
function closeInfo() {
    let info = document.querySelector('.info');
    info.style.display = "none";
}