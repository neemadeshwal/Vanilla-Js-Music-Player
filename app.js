import songsData from './musicDB.js'
import loopPlayiconArray from './songloopsvg.js'


//*****select the main music player content */
const musicTitle=document.querySelector('.music-title')
const ArtistName=document.querySelector('.artist-name')
const musicImage=document.querySelector('.music-image')
const audio=document.querySelector('audio')


//*****button selector */
const prevTrackBtn=document.querySelector('.prev-btn')
const nextTrackBtn=document.querySelector('.next-btn')
const playPauseBtn=document.querySelector('.playpause-btn')
const repeatSameSong=document.getElementById('repeat-loop-icon')
const musicContentContainer=document.querySelector('.music-content-container')


//****   declaring all the major constants */
let index=0
let isPlaying=false;
let repeatEntireTrack=true;
let repeatCurrent=false;
let ShuffleTrack=false;
let noRepeat=true;
let favSongList=[]
let  favoriteSongIds=[]
let updateTimer;
const currentTime=document.querySelector('.current-time')
const totalDuration=document.querySelector('.total-duration')

const inputRange=document.querySelector('.slider')

const playSvg=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
<path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/></svg>`;
const pauseSvg=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
<path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/>
</svg></button>`;
const deleteSvg=` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg>`


window.addEventListener('DOMContentLoaded',showFavSongList)
const load_Music=(index)=>{
    clearInterval(updateTimer)
resetValues()

if (index >= 0 && index < songsData.length) {
  musicContentContainer.setAttribute('id',songsData[index].id)
  audio.src=songsData[index].song
  musicImage.src=songsData[index].image
  ArtistName.textContent=songsData[index].artist
  musicTitle.textContent=songsData[index].title}

 updateFavoriteStatus()
  updateTimer= setInterval(updateSlider,1000)


}

load_Music(index)


//**** play next song when current one ended */

audio.addEventListener('ended',()=>{
    if(noRepeat){
     noRepeatMusicList(index)
    }

    if(repeatEntireTrack){
      repeatEntireMusicList(index)
    }
    if(repeatCurrent){
     repeatCurrentTrack(index)
    }
   if(ShuffleTrack){
    ShuffleMusicList()
   }

})

//**** shuffling songs functions */

function ShuffleMusicList(){
    let index=Math.round(Math.random()*songsData.length)


    load_Music(index)
    audio.play()
}
function repeatCurrentTrack(index){
    load_Music(index)
    audio.play()
}
function repeatEntireMusicList(index){
    if(index<songsData.length-1){
        index=index+1;
       }
        else{
            index=0
        }

        load_Music(index);
        audio.play();
}

function noRepeatMusicList(index){
    if(index<songsData.length-1)
    {
        index=index+1;
        load_Music(index);
        audio.play()
    }
    else{
        audio.pause()
    }
}





function changeToPauseBtn(){
    playPauseBtn.innerHTML=pauseSvg
    playPauseBtn.classList.add('animate')
}
nextTrackBtn.addEventListener('click',()=>{

changeToPauseBtn()

    if(index<songsData.length-1)
    {
        index=index+1;
        load_Music(index);
        audio.play()
    }
    else{
        audio.pause()
    }
    if(ShuffleTrack===true){
        ShuffleMusicList()
       }


})
prevTrackBtn.addEventListener('click',()=>{

    changeToPauseBtn()
    if(index>0){
        index=index-1
        console.log(index)
        load_Music(index)
        audio.play()
    }
    else{
        audio.pause()
    }
    if(ShuffleTrack===true){
       ShuffleMusicList()
       }



})
const play=()=>{

    isPlaying=true;
    audio.play();
    playPauseBtn.innerHTML=pauseSvg
    playPauseBtn.classList.add('animate')
}
const pause=()=>{
    isPlaying=false;
    audio.pause();
    playPauseBtn.innerHTML=playSvg;
    playPauseBtn.classList.remove('animate')
}


playPauseBtn.addEventListener('click',()=>{

if(isPlaying){
    pause()
}
else{
    play()
}

})


//*****Handling mute btn *****/
const muteBtn=document.querySelector('.mute-btn')
const soundBtn=document.querySelector('.sound-btn')
const soundmuteBtn=document.querySelector('.soundmute-btn')

soundmuteBtn.addEventListener('click',()=>{
    soundBtn.classList.toggle('show-btn')
    muteBtn.classList.toggle('show-btn')

    if(muteBtn.classList.contains('show-btn')){
        audio.muted=true
    }
    else{
        audio.muted=false
    }

})


// **** Repeat Song functionality****
let svgIndex=0;

repeatSameSong.addEventListener('click',()=>{
     if(svgIndex<loopPlayiconArray.length-1){
        svgIndex=svgIndex+1

     }
     else{
        svgIndex=0

     }
     repeatSameSong.innerHTML=loopPlayiconArray[svgIndex]
     repeatCurrent=false;
     repeatEntireTrack=false;
     noRepeat=false;
     ShuffleTrack=false;
     if(repeatSameSong.firstChild.classList.contains('repeat-multiple')){
        console.log("repeat the entire loop")
        repeatEntireTrack=true;
     }
     if(repeatSameSong.firstChild.classList.contains('shuffle-svg')){
        console.log("shuffle the playlist")
         ShuffleTrack=true;
     }
    if(repeatSameSong.firstChild.classList.contains('repeat-once')){
        console.log("repeat this song")
        repeatCurrent=true;
     }
     if(repeatSameSong.firstChild.classList.contains('no-repeat')){
        console.log("dont repeat the song")
        noRepeat=true;
     }
     })


// ***** Creating songList ******

const songListContainer=document.querySelector('.song-list-container')


songsData.forEach((song)=>{
    const songContainer=document.createElement('div');
songContainer.classList.add('single-song-container');
songContainer.setAttribute('id',song.id)



    songContainer.innerHTML=`
    <div class='song-info'>
    <h4>${song.title}</h4>
    <p>${song.artist}</p>
    </div>
    <div class='playpause-btn'>
    ${playSvg}
    </div>

    `
songListContainer.appendChild(songContainer)
  })



const singleSongContainer=document.querySelectorAll('.single-song-container')
singleSongContainer.forEach((songContainer)=>{
      songContainer.addEventListener('click',(event)=>{


        changeToPauseBtn()

         singleSongContainer.forEach((songs)=>{
            const btns=songs.querySelector('.playpause-btn')
            btns.classList.remove('animate')
            btns.innerHTML=playSvg;

        })
        const clickedID=event.currentTarget.id
        playTheClickedSong(clickedID)
        const btn=event.currentTarget.querySelector('.playpause-btn')


       if(btn.firstChild.classList.contains('bi-play-circle')){
        btn.classList.add('animate')
        btn.innerHTML=pauseSvg;
        play()

       }
       else{
        btn.classList.remove('animate')
        btn.innerHTML=playSvg
        pause()
       }})
})



const favouriteListBtn=document.querySelector(".favourite-list-btn")


const showMusicList=document.querySelector('.show-music-list')
showMusicList.addEventListener('click',()=>{
    if(songListContainer.classList.contains('active')){
    songListContainer.classList.remove('active')

    musicContentContainer.classList.add('active')
}
else{
    songListContainer.classList.add('active')
    musicContentContainer.classList.remove('active')
    favSongListContainer.classList.remove('active')}

})



const sidebarBtn=document.querySelector('.sidebar-btn')
const rightSlideBtn=document.querySelector('.right-slide-btn')


//****adding song to fav list */

favouriteListBtn.addEventListener('click',()=>{
        songListContainer.classList.remove('active')
        musicContentContainer.classList.remove('active')
        favSongListContainer.classList.add('active')

})
const chevronUp=document.querySelector('.bi-chevron-up')
const chevronRight=document.querySelector('.bi-chevron-right')



rightSlideBtn.addEventListener('click',()=>{
    if(chevronRight.classList.contains('show-btn')){
        favSongListContainer.classList.remove('active')
        musicContentContainer.classList.add('active')
        songListContainer.classList.remove('active')
    }
    chevronUp.classList.toggle('show-btn')
    chevronRight.classList.toggle('show-btn')
     

    sidebarBtn.classList.toggle('show-container-btn')
   

})
const favSongListContainer=document.querySelector('.fav-song-list-container')

// //////fav list and functionality

function addToFavList(clickedID){
    console.log(clickedID)
    const favSong=songsData.filter((song)=>song.id==clickedID)
     if(!favSongList.includes(favSong)){
        favSongList.push({...favSong,isFavourite:true})

     }
}



function showFavSongList(){

     const favSongListContainer = document.querySelector('.fav-song-list-container');
    favSongListContainer.innerHTML = '';
    favSongListContainer.innerHTML=`
     <h2  class='fav-list-heading'>
     Your Favourites list <span class='look-for-empty-list'></span>
     </h2>`
    if(favSongList.length>0){
    favSongList.forEach((favSong)=>{

                const favsongContainer=document.createElement('div')
                favsongContainer.classList.add('fav-song-container')
                favsongContainer.setAttribute('id',favSong[0].id)
                console.log(favSong.id)
                console.log(favSong[0].id)
                console.log(`favsongwithindex: ${favSong[0].title}`)
                favsongContainer.innerHTML=
                `<div  class="fav-song-info">
                <h4 >${favSong[0].title}</h4>
                <p>${favSong[0].artist}</p>
                </div>
                <div class='control-btns'>
                <div class='playpause-btn'>
            ${playSvg}
            </div>
            <div class='remove-song'>
           ${deleteSvg}
            </div>
            </div>

                `
        favSongListContainer.appendChild(favsongContainer)

const singlefavsongContainer=document.querySelectorAll('.fav-song-container')
singlefavsongContainer.forEach((songContainer)=>{
      songContainer.addEventListener('click',(event)=>{


        changeToPauseBtn()

         singlefavsongContainer.forEach((songs)=>{
            const btns=songs.querySelector('.playpause-btn')
            btns.classList.remove('animate')
            btns.innerHTML=playSvg;

        })
        const clickedID=event.currentTarget.id
        const selectedSong=songsData.filter((song)=>song.id==clickedID)
        console.log(selectedSong)
        const getIndexOf=songsData.indexOf(selectedSong[0])
        console.log(getIndexOf)
        load_Music(getIndexOf)
        const btn=event.currentTarget.querySelector('.playpause-btn')


    //    if(btn.firstChild.classList.contains('bi-play-circle')){
        btn.classList.add('animate')
        btn.innerHTML=pauseSvg;

        audio.play()})


        const lookForEmptyList=document.querySelector('.look-for-empty-list')
        if(favSongList.length===0){
            lookForEmptyList.textContent=`is empty`
            }
        const removeFavSongBtn=document.querySelectorAll('.remove-song')

        removeFavSongBtn.forEach((song)=>{
            song.addEventListener('click',(event)=>{
                const songContainer = event.target.closest('.fav-song-container');

                const clickedID = songContainer.id;

                songContainer.remove();
                console.log(clickedID)
                

                const newList=favSongList.filter((song)=>song[0].id!==parseInt(clickedID))
                 favoriteSongIds=favoriteSongIds.filter((item)=>item!==clickedID)
     
                               
               favSongList=[...newList]
           
            //    updateFavoriteStatusInMainList(clickedID,false)  
                
               console.log(favoriteSongIds)
                
                const lookForEmptyList=document.querySelector('.look-for-empty-list')
                if(favSongList.length===0){
                    lookForEmptyList.textContent=`is empty`
                      }

              })
         })
        })})}}

//****toggling heart icon */
const FavouriteIcon=document.querySelector('.is-favourite-icon')
const favBtn=document.querySelector('.fav-btn')
const notFavBtn=document.querySelector('.not-fav-btn')

FavouriteIcon.addEventListener('click',(event)=>{
    favBtn.classList.toggle('show-btn')
    notFavBtn.classList.toggle('show-btn')
    if(favBtn.classList.contains('show-btn')){

      const clickedID=event.target.parentElement.parentElement.id

      addToFavList(clickedID)
       showFavSongList()
    }
})

inputRange.addEventListener('change',()=>{
    audio.currentTime=audio.duration*(inputRange.value/100)

})
function timeFormat(val){
    if(val<10){
        return `0${val}`
    }
    else{
        return val
    }
}

//****slider to show the current position of the song */
function updateSlider(){
    let sliderPosition=0;

    if(!isNaN(audio.duration)){
       sliderPosition  =audio.currentTime*(100/audio.duration)
       inputRange.value=sliderPosition
    }

    const currentMinute=Math.floor((audio.currentTime/60))
    const currentSecond=Math.floor((audio.currentTime-currentMinute*60))
    const totalMinute=Math.floor((audio.duration/60))
    const totalSeconds=Math.floor((audio.duration-totalMinute*60))

    currentTime.textContent=timeFormat(currentMinute)+':'+timeFormat(currentSecond)
    totalDuration.textContent=timeFormat(totalMinute)+':'+timeFormat(totalSeconds)
}


function resetValues(){
    currentTime.textContent='00:00';
    totalDuration.textContent='00:00';
    inputRange.value=0;
}


function playTheClickedSong(clickedID){
    const selectedSong=songsData.filter((song)=>song.id==clickedID)
    const getIndexOf=songsData.indexOf(selectedSong[0])
    load_Music(getIndexOf)
    audio.play()

}

FavouriteIcon.addEventListener('click', (event) => {
 const containerId = event.target.parentElement.parentElement.id;
 const favsongContainer=document.querySelectorAll('.fav-song-container')

  favBtn.addEventListener('click',(e)=>{
     const targetId=e.target.parentElement.parentElement.parentElement.id
     console.log(targetId)
     const removeSong =favSongList.filter((item)=>item[0].id==targetId)
      favsongContainer.forEach((item)=>{
        const itemId=item.getAttribute('id')
        
        if(itemId==targetId){
            item.remove()
        }
      })
    
  })

    // Toggle the favorite status of the song
    if (!favoriteSongIds.includes(containerId)) {
        favoriteSongIds.push(containerId);
    } else {
        favoriteSongIds = favoriteSongIds.filter(id => id !== containerId);}
       

    // Update the UI to reflect the favorite status
    favBtn.classList.toggle('show-btn', favoriteSongIds.includes(containerId));
    notFavBtn.classList.toggle('show-btn', !favoriteSongIds.includes(containerId));
})
   //***toggling the favourite btns  */
const isFavouriteContainer=document.querySelectorAll('.is-favourite-icon')
isFavouriteContainer.forEach((favContainer) => {
    const containerId = favContainer.parentElement.id;
    const isFavorite = favoriteSongIds.includes(containerId);
    favBtn.classList.toggle('show-btn', isFavorite);
    notFavBtn.classList.toggle('show-btn', !isFavorite);
});



function updateFavoriteStatus() {
    const currentSongId = musicContentContainer.getAttribute('id');
    const isFavorite = favoriteSongIds.includes(currentSongId);

    const favBtn=document.querySelector('.fav-btn')
const notFavBtn=document.querySelector('.not-fav-btn')

    favBtn.classList.toggle('show-btn', isFavorite);
    notFavBtn.classList.toggle('show-btn', !isFavorite);

    
}








