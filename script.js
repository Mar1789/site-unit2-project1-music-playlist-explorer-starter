var modal = document.getElementById("modal");
var span = document.getElementsByClassName("close")[0];
let arr = [];
let $modalPlaylist = false;


let changeImage = (image, likecount) => {
    modal.style.display = "none";
    heart = image.src;
    heart = heart.substring(heart.length - 10)
    if (heart === "heart1.png"){ // Add like
        image.nextElementSibling.innerHTML = 1 + parseInt(image.nextElementSibling.innerHTML);
        image.src = "./heart2.png";
    } else{                      // Remove like 
        image.nextElementSibling.innerHTML = 1 - parseInt(image.nextElementSibling.innerHTML);
        image.src = "./heart1.png";
    }
    playlist.likeCount = likecount;    
}
let shuffleArray = (array) => { // Used stack overflow algorithm of randomizing arrays
    let currentIndex = array.length;
    while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
    array[randomIndex], array[currentIndex]];
  }
  return array

}
let addSongs = (arr) => {
    arr.forEach(song => { // Loop to apply songs to modal
        songParent = document.querySelector(".container");   
        songContainer = document.createElement('div');
        songContainer.className = 'song-container';

        songImage = document.createElement('img');
        songImage.className = 'song-image';
        songImage.src = song.cover_art;

        songTitle = document.createElement('h3');
        songTitle.className = 'song-title';
        songTitle.innerHTML = song.title;

        artistName = document.createElement('h3');
        artistName.className = 'artist-name';
        artistName.innerHTML = song.artist;

        albumName = document.createElement('h3');
        albumName.className = "album-name";
        albumName.innerHTML = song.album;

        time = document.createElement('p');
        time.innerHTML = song.duration;

        songContainer.appendChild(songImage);
        songContainer.appendChild(songTitle);
        songContainer.appendChild(artistName);
        songContainer.appendChild(albumName);
        songContainer.appendChild(time);
        songParent.appendChild(songContainer);
    })
}
let editModal = (e) => {
    parentNode = e.target.parentNode;

    children = parentNode.querySelectorAll("p, img.playlist, h3");

    playlistTitle = document.querySelector(".modal-title");
    playlistTitle.innerHTML = children[1].innerHTML;

    modalImage = document.querySelector(".img"); // Reassigning Image
    modalImage.src = children[0].src;

    creator = document.querySelector(".creator-name");
    creator.innerHTML = children[2].innerHTML;
}

let clearModal = () => { // Clearing Modal
    container = document.querySelector(".container");
    songParent = container.querySelectorAll(".song-container"); 
    songParent.forEach(songs => {
        container.removeChild(songs);
    })   
}

let shuffleModal = (e) => { // refreshes whole modal when shuffle
    let array = [];
    clearModal();
        editModal(e);
        data.playlists.forEach(playlist => {  // Access songs from JSON
            if (playlist.playlist_name === playlistTitle.innerHTML) {
              array = playlist.songs;
            }
        });
        addSongs(array);
}

let cardtemplate = (playlist) => {
    let parent = document.querySelector(".grid-container");   

    card = document.createElement('div');
    card.className = ("playlist-cards");

    image = document.createElement('img');
    image.className = "playlist"
    image.src = playlist.playlist_art;

    title = document.createElement('h3');
    title.innerHTML = playlist.playlist_name;

    creatorName = document.createElement('p');
    creatorName.className = "creatorName"
    creatorName.innerHTML = playlist.playlist_creator;

    like = document.createElement('div');
    like.className = "likediv";

    likeNumber = document.createElement('p');
    likeNumber.className = "likeNumber";
    likeNumber.innerHTML = playlist.likeCount;
    likeimage = document.createElement('img');
    likeimage.className = "like"
    likeimage.src = './heart1.png';
    likeimage.onclick = function(e) {changeImage(e.target, parseInt(likeNumber.innerHTML)), playlist};

    likeNumber.innerHTML = playlist.likeCount;

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(creatorName);
    card.appendChild(like);

    button = document.querySelector(".button");

    card.onclick = function(e){
        let arr = [];
        clearModal();
        if(e.target.className === "like"){
            modal.style.display = "none";
            return;
        } else {
            modal.style.display = "block";
        }
        editModal(e);
        data.playlists.forEach(playlist => {  // Access songs from JSON
            if (playlist.playlist_name === playlistTitle.innerHTML) {
              arr = playlist.songs;
              button.onclick = function() { // Event listener when the shuffle button is clicked
                console.log("Clicked!");
                playlist.songs = shuffleArray(playlist.songs);
                console.log(playlist.songs);
                shuffleModal(e);
                } 
            }
        });
        addSongs(arr);
    };
    like.appendChild(likeimage);
    like.appendChild(likeNumber);

    parent.appendChild(card);
}

let playlist = () => {
    data.playlists.forEach(playlist => 
        cardtemplate(playlist),

        
    );
}
if(span !== 'null'){
    
}
if(window.location.href === "./featured.html"){
    span.onclick = function() {
        modal.style.display = "none";
    
    }
}
if(document.querySelector('.feature') !== 'null'){
    console.log("TESTING");
    button = document.querySelector('.feature');
    button.onclick = function(event) {
        window.location.href = './featured.html';
    }
}
window.onclick = function(event) {
    if(event.target == modal) {
        modal.style.display = "none";
    }
}
var span = document.getElementsByClassName("close");
playlist(); 