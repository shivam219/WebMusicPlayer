// add photo to profile
var playlist1 = document.getElementById("playlistOfLatestSong");
var playlist2 = document.getElementById("playlistOfPopularSong");
var playlist3 = document.getElementById("playlistOfOldSong");
var songList;
var icon = document.getElementById("play");
var curSong = document.getElementById("mySong"); var curSongLi; var preTrackNo = -1; var prePlaylist;
var trackNo, songUrl, imgSrc, articts, songName; var isReplay = false, isCycle = false, isPlayList = false;
function profile(trackNo, songUrl, imgSrc, articts, songName, isPlayList, listNo) {
    this.trackNo = trackNo, this.songUrl = songUrl, this.imgSrc = imgSrc, this.articts = articts, this.songName = songName;
    console.log(isPlayList);
    curSong.src = String(songUrl);
    curSong.play();
    document.getElementById('songImgsScr').src = imgSrc;
    document.getElementById('songNameSrc').innerText = songName;
    document.getElementById('singerNameScr').innerText = articts; this.isPlayList = isPlayList;
    icon.style.backgroundImage = "url('img/pause.png')";
    document.getElementById('showSongName').innerText = songName;
    document.getElementById('showSinger').innerText = articts;
    document.getElementById('showSongImg').src = imgSrc;
    /*link songlist with playlist by no */
    if (isPlayList) {
        if (listNo == 1) { songList = playlist1.getElementsByTagName("li"); }
        if (listNo == 2) { songList = playlist2.getElementsByTagName("li"); }
        if (listNo == 3) { songList = playlist3.getElementsByTagName("li"); }
    }
    if (isPlayList) {
        isCycle = true;
    }
    if (!isPlayList) {
        document.getElementById('replay').src = "img/replaytrue.png";
        document.getElementById('cycle').src = "img/cycleOne.png";
    } else {
        document.getElementById('cycle').src = "img/cycleTrue.png";
    }
    if (isPlayList) {
        if (preTrackNo != -1) {
            prePlaylist[preTrackNo].style.border = "2px solid rgb(196, 195, 195)";
        }
        songList[Number(trackNo)].style.border = "2px solid rgb(242, 0, 242)";
        preTrackNo = Number(trackNo); prePlaylist = songList;
    }
    else {
        if (preTrackNo != -1) {
            prePlaylist[preTrackNo].style.border = "2px solid rgb(196, 195, 195)";
        }
    }

}
/*audio ended event handle*/
curSong.addEventListener("ended", function () {
    if (isPlayList) {
        if (isReplay) { songList[trackNo].click(); }
        else if (isCycle) {
            if ((songList.length - 1) != Number(trackNo)) { songList[++trackNo].click(); }
            else if ((songList.length - 1) == Number(trackNo)) { songList[0].click(); }
        }
    }
    else if (isCycle || isReplay) { curSong.play(); }
});
/*onplay(function()*/
function btnplay() {
    if (curSong.paused) {
        curSong.play();
        icon.style.backgroundImage = "url('img/pause.png')";
    }
    else {
        curSong.pause();
        icon.style.backgroundImage = "url('img/play.png')";
    }
}
/*onleftClick(function()*/
function btnleft() {
    if (isPlayList) {
        if (isReplay) { songList[trackNo].click(); }
        else if (isCycle) {
            if (0 != Number(trackNo)) { songList[--trackNo].click(); }
        }
    }
    else if (isCycle || isReplay) { curSong.play(); }
}
/*onleftClick(function()*/
function btnright() {
    if (isPlayList) {
        if (isReplay) { songList[trackNo].click(); }
        else if (isCycle) {
            if ((songList.length - 1) != Number(trackNo)) { songList[++trackNo].click(); }
            else if ((songList.length - 1) == Number(trackNo)) { songList[0].click(); }
        }
    }
    else if (isCycle || isReplay) { curSong.play(); }
}
/* Replay button*/
function btnreplay() {
    if (isPlayList) {/*check is song clicked by list or search is search isplaylis = false then not execute this code*/
        if (isReplay) {
            isReplay = false;
            document.getElementById('replay').src = "img/replay.png";
        }
        else {
            isReplay = true;
            document.getElementById('replay').src = "img/replaytrue.png";
        }
    }
}

/* Cycle button*/
function btncycle() {
    if (isPlayList) {/*check is song clicked by list or search is search isplaylis = false then not execute this code*/
        if (isCycle) {
            isCycle = false;
            document.getElementById('cycle').src = "img/cycle.png";
        } else {
            isCycle = true;
            document.getElementById('cycle').src = "img/cycleTrue.png";
        }
    }
}
function pausebyclient() { icon.style.backgroundImage = "url('img/play.png')"; }
function playbyclient() { icon.style.backgroundImage = "url('img/pause.png')"; }
/*-----------------profiles end------------------*/
/*show song profile and singer profile*/


/*------------------show profile song and user---------------*/
// <!-- loads the audio player type="audion/mpeg,mp3,ogg,wav"-->
///thisi call by canplay action lister we can do by onsrcchar listener also 
var volume = document.getElementById("volume");//volume slider 
var audio = document.getElementById("mySong");//audio volume id  
var audioTrack = document.getElementById("videoTrack");//volume slider 
var startofSong = document.getElementById("start");
var endofSong = document.getElementById("end");

/*change icon when volume is change */
var isMuted = false;/*for if - else of  muted*/
function changeVolume() { //audio functionality successfully
    if (!isMuted) {
        var volumeValue = document.getElementById('volume').value;
        audio.volume = ((volumeValue) / 10);
        if (volumeValue == 0) { document.getElementById("speaker").src = "img/mute.png"; }
        else if (volumeValue > 7) { document.getElementById("speaker").src = "img/speaker2.png"; }
        else if (volumeValue > 4) { document.getElementById("speaker").src = "img/speaker1.png"; }
        else { document.getElementById("speaker").src = "img/speaker0.png"; }
    }
}
/*End change icon when volume is change */
/*muted button click*/
$("#speaker").click(function () {
    if (!isMuted) {
        $("#mySong").prop('muted', true); //mute true 
        isMuted = true;
        document.getElementById('speaker').src = 'img/muted.png';
    }
    else {
        $("#mySong").prop('muted', false); //mute false
        isMuted = false;
        changeVolume();
    }
});
/* End muted button  click */
var flag = true;//setting 0.00 when load then function call it more but flag help element change 0.00
function setFirst_End_Max_time() {
    endofSong.innerHTML = time_convert(Math.floor(audio.duration));
    audioTrack.max = Math.floor(audio.duration);  /*so that will get total time  2:40 ->180000->by float 180 second*/
    if (flag) { startofSong.innerHTML = "0 : 00"; flag = false; }
} //set end time when user play stating first time

function timeUpdate() { audioTrack.value = Number(audio.currentTime); startofSong.innerHTML = time_convert(Math.floor(audio.currentTime)); } //set current time to track 

function time_convert(num) {
    var minute = Math.floor(num / 60);
    var second = num % 60;
    if (second < 10) { second = "0" + second; }
    return " " + minute + " : " + second;
}
audioTrack.oninput = function () { audio.currentTime = this.value; }/* set current seeking by user  to audio  */

