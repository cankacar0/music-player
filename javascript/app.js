const container = document.querySelector(".container");
const image = document.querySelector("#music-img");
const title = document.querySelector(".music-details .title");
const singer = document.querySelector(".music-details .singer");
const previous = document.querySelector("#controls #previous");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");


const player = new MusicPlayer(musicList);


window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);    
})

function displayMusic(music) {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    // image.src = "img/" + music.img;
    image.src = music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () =>{

    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
    audio.play();
});

previous.addEventListener("click", ()  => {
    previousMusic();
});

next.addEventListener("click", ()  => {
    nextMusic();
});

function previousMusic(){
    player.previous();
    let music =player.getMusic();
    displayMusic(music);
    playMusic();
}

function nextMusic(){
    player.next();
    let music =player.getMusic();
    displayMusic(music);
    playMusic();
}

function pauseMusic(){
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play"
    audio.pause();
}

function playMusic(){
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause"
    audio.play();
}

const calculateTime = (seconds) => {
    const minute = Math.floor(seconds / 60);
    const second = Math.floor(seconds % 60);
    const updatedSecond = second < 10 ? `0${second}`: `${second}`
    const expression = `${minute}:${updatedSecond}`
}


audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
})  

audio.addEventListener("timeupdate", () =>{
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
})

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
})

let muteState = "muted" ;

volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if(value==0){
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
    } else {
        audio.muted = false;
        muteState = "unmute";
        volume.classList = "fa-solid fa-volume-high";
    }
})

volume.addEventListener("click", () => {
    if(muteState === "unmute"){
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    } else{
        audio.muted = false;
        muteState = "unmute";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
    }
})