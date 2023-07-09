console.log("Welcome to spotify clone");

let songlist = [{ songname: "Love Me Like You Do", filepath: "../songs/1.mp3", coverpath: "../songs_cover/1.png" },
{ songname: "Closer", filepath: "../songs/2.mp3", coverpath: "../songs_cover/2.png" },
{ songname: "Perfect", filepath: "../songs/3.mp3", coverpath: "../songs_cover/3.png" },
{ songname: "Despacito", filepath: "../songs/4.mp3", coverpath: "../songs_cover/4.png" }];

let audioelement = new Audio("../songs/1.mp3");

let masterplay = document.getElementById("play-button");

let progressbar = document.getElementById("progress-bar");

let gif = document.getElementById("gif");

progressbar.addEventListener('change', () => {      // audio time gets updated by progress bar click
    audioelement.currentTime = progressbar.value * audioelement.duration/100;
});

masterplay.addEventListener('click', () => {    // play and pause update
    if (audioelement.currentTime == 0 || audioelement.paused) {
        audioelement.play();
        masterplay.classList.remove("fa-circle-play");
        masterplay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }

    else {
        audioelement.pause();
        masterplay.classList.remove("fa-circle-pause");
        masterplay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
});

audioelement.addEventListener('timeupdate', () => {     // as audio time is updated,progress bar is updated 
    console.log('timeupdate');
    progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
    progressbar.value = progress;

    if(audioelement.currentTime==audioelement.duration){    // song end next song should play(works same as forward button)
        songindex = (songindex + 1) % 4;

        makeallplays();

        audioelement.src = songlist[songindex].filepath;

        audioelement.currentTime = 0;
        progressbar.value = 0;
        audioelement.play();

        
        masterplay.classList.remove("fa-circle-play");
        masterplay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        
        song_name_bottom.innerText = songlist[songindex].songname;  // updates name of song
        
        songitemplay[songindex].classList.remove("fa-circle-play");
        songitemplay[songindex].classList.add("fa-circle-pause");
    }

});


let songindex = 0;
let songitemplay = Array.from(document.getElementsByClassName("songitemplay"));

const makeallplays = () => {
    songitemplay.forEach((element, i) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

let song_name_bottom = document.getElementById('song-name');

let previous = document.getElementById("previous-button");
let forward = document.getElementById("next-button");

songitemplay.forEach((element, i) => {
    console.log(element, i);
    element.addEventListener('click', () => {   // if we want to play any random song from the list

        makeallplays();     // if initially any song is playing pause it in background so
        //  that song clicked can be played

        songindex = i;
        audioelement.src = songlist[i].filepath;

        audioelement.currentTime = 0;
        progressbar.value = 0;
        audioelement.play();

        element.classList.remove("fa-circle-play");
        element.classList.add("fa-circle-pause");

        masterplay.classList.remove("fa-circle-play");
        masterplay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;

        song_name_bottom.innerText = songlist[i].songname;
    });

});

forward.addEventListener('click', () => {   // clicking for the next track

    songindex = (songindex + 1) % 4;

    makeallplays();

    audioelement.src = songlist[songindex].filepath;

    audioelement.currentTime = 0;
    progressbar.value = 0;
    audioelement.play();

    
    masterplay.classList.remove("fa-circle-play");
    masterplay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    
    song_name_bottom.innerText = songlist[songindex].songname;  // updates name of song
    
    songitemplay[songindex].classList.remove("fa-circle-play");
    songitemplay[songindex].classList.add("fa-circle-pause");
});

previous.addEventListener('click', () => {  // clicking for the previous track

    if (songindex == 0) {
        songindex += 3;
    }
    else{

        songindex = (songindex - 1);
    }

    makeallplays();
    audioelement.src = songlist[songindex].filepath;

    audioelement.currentTime = 0;
    progressbar.value = 0;
    audioelement.play();

    
    masterplay.classList.remove("fa-circle-play");
    masterplay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    
    song_name_bottom.innerText = songlist[songindex].songname;
    
    songitemplay[songindex].classList.remove("fa-circle-play");
    songitemplay[songindex].classList.add("fa-circle-pause");
});



