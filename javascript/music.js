class Music {
    constructor(title, singer, img, file){
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName(){
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music ("Boşver", "Nilüfer", "https://picsum.photos/300/100", "1.mp3"),
    new Music ("Bu da geçer mi sevgilim", "yalın", "https://picsum.photos/300/100", "2.mp3"),
    new Music ("aramızda uçurumlar", "suat suna", "https://picsum.photos/300/100", "3.mp3")
];