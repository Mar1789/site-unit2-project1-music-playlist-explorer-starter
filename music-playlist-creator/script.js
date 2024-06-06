var modal = document.getElementById("festivalModal");
var span = document.getElementsByClassName("close")[0];

function openModal(festival) {
   document.getElementById('festivalName').innerText = festival.name;
   document.getElementById('festivalImage').src = festival.imageUrl;
   document.getElementById('festivalDates').innerText = `Dates: ${festival.dates}`;
   document.getElementById('festivalLocation').innerText = `Location: ${festival.location}`;
   document.getElementById('artistLineup').innerHTML = `<strong>Lineup:</strong> ${festival.lineup.join(', ')}`;
   modal.style.display = "block";
}
let changeImage = (image) => {
    heart = image.src;
    heart = heart.substring(heart.length - 10)
    if (heart === "heart1.png"){ // Add like
        image.src = "./heart2.png";
        console.log(image.src);
    } else{                      // Remove like 
        image.src = "./heart1.png";
        console.log(image.src);
    }
    // debugger;
    console.log(image);
}
let cardtemplate = (playlist) => {
    let parent = document.querySelector(".grid-container");    
    card = document.createElement('div');
    card.className = ("playlist-cards");
    image = document.createElement('img');
    image.src = playlist.playlist_art;
    Title = document.createElement('h3');
    Title.innerHTML = playlist.playlist_name;
    creatorName = document.createElement('p');
    creatorName.innerHTML = playlist.playlist_creator;
    like = document.createElement('div');
    like.className = "like-div";
    likeimage = document.createElement('img');
    likeimage.className = "like"
    likeimage.src = './heart2.png';
    likeimage.onclick = function() {changeImage(likeimage)};
    likeNumber = document.createElement('p');
    likeNumber.innerHTML = playlist.likeCount;
    card.appendChild(image);
    card.appendChild(Title);
    card.appendChild(creatorName);
    card.appendChild(like);
    like.appendChild(likeimage);
    like.appendChild(likeNumber);
    parent.appendChild(card);
}
let playlist = () => {
    data.playlists.forEach(playlist => cardtemplate(playlist));
}
// span.onclick = function() {
//    modal.style.display = "none";
// }
// window.onclick = function(event) {
//    if (event.target == modal) {
//       modal.style.display = "none";
//    }
// }
playlist(); 