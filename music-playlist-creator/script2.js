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
        time.className = "containerp"
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

    modalImage = document.getElementById("20"); // Reassigning Image
    modalImage.src = children[0].src;
    console.log(document.getElementById("20"));
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
let playlist = () => {
    shuffleArray(data.playlists);
    playlistCover = document.querySelector(".imagecover");
    playlistCover.src = data.playlists[0].playlist_art;

    playlistTitle = document.querySelector("h3");
    playlistTitle.innerHTML = data.playlists[0].playlist_name;

    playlistArtist = document.getElementById("artistid");
    playlistArtist.innerHTML = data.playlists[0].playlist_creator;
    clearModal();
    addSongs(data.playlists[0].songs);

}
if(span !== 'null'){
    
}
if(window.location.href === "./featured.html"){
    span.onclick = function() {
        modal.style.display = "none";
    
    }
}
if(document.querySelector('.feature') !== 'null'){
    button = document.querySelector('.feature');
    button.onclick = function(event) {
        window.location.href = './featured.html';
    }
}
if(document.querySelector('.musicPlaylist') !== 'null'){
    button = document.querySelector('.musicPlaylist');
    button.onclick = function(event) {
        window.location.href = './index.html';
    }
}

var span = document.getElementsByClassName("close");
playlist();
