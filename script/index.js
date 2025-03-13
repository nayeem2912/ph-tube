function removeActiveClass(){
  const activeButton= document.getElementsByClassName('active');
  for(let btn of activeButton){
    btn.classList.remove('active')
  }
}

const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("video-container").classList.add("hidden");
};
const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("video-container").classList.remove("hidden");
};



function loadCategories(){
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
}

function loadVideos(searchText = ""){
  showLoader()
  
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
    removeActiveClass();
     document.getElementById('btn-all').classList.add('active');
      displayVideos(data.videos)
    })
}

const loadCategoriesVideos = (id) =>{
    showLoader()
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `
    fetch(url)
    .then((res) => res.json())
    .then((data) => {

      removeActiveClass();
        const clickedButton = document.getElementById(`btn-${id}`)

        clickedButton.classList.add('active')
        console.log(clickedButton)
        
        displayVideos(data.category)
    })
}

const loadVideosDetails = (videoId)=>{
   const url =`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
   fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video))
}

// const displayVideosDetails = (video) => {
//   console.log(video)
//       document.getElementById('video_details').showModal();
//       const detailsContainer = document.getElementById('details_container')

//       detailsContainer.innerHTML = `<h2>${video.title}</h2>`

// };

const displayVideoDetails = (video) => {
  console.log(video);
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");

  detailsContainer.innerHTML = `
   <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      
    </div>
  </div>
</div>
  `;
};



function displayCategories(categories){
    const categoryContainer = document.getElementById('category-container')

    for(let cat of categories){
        // console.log(cat)

        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick=" loadCategoriesVideos(${cat.category_id}) " class="btn btn-sm hover:bg-[#FF1F3D]  hover:text-white">${cat.category} </button>
        `

        categoryContainer.appendChild(categoryDiv)
    }
}

const displayVideos = (videos) =>{
  const videoContainer = document.getElementById("video-container");

  videoContainer.innerHTML="";

  if (videos.length == 0) {
    videoContainer.innerHTML=`
     <div class="col-span-full flex flex-col text-center justify-center items-center py-20">
            <img class="w-[120px]" src="assets/Icon.png" alt="">
            <h2 class="font-bold text-[32px] ">Oops!! Sorry, There is no <br> content here</h2>
          </div>`
    hideLoader()
    return;
  }

  videos.forEach(video => {
    const videoCard = document.createElement("div")
    videoCard.innerHTML = `
    <div class="card bg-base-100 ">
            <figure class="relative ">
              <img class="w-full h-[150px] object-cover"
                src="${video.thumbnail}"
                alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-white bg-[#171717] px-1 py-0.5 text-sm rounded text-center">3hrs 56 min ago</span>
            </figure>
            <div class=" flex gap-3 px-0 py-5">
              <div class="profile">
                <div class="avatar">
                    <div class="w-10 rounded-full">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
              </div>
              <div class="intro space-y-2">
                <h2 class="text-sm font-semibold">${video.title}</h2>
                <p class="text-[#17171770] flex gap-3 text-[14px]">
                ${video.authors[0].profile_name}
                ${video.authors[0].verified == true ? `<img src="assets/Group 3.png" alt="">`: ``}
                </p>
                <p class="text-[#17171770] text-[14px]">
                ${video.others.views} views
                </p>
              </div>
            </div>

            <button onclick="loadVideosDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
          </div>
    `
    videoContainer.appendChild(videoCard)
  });
  hideLoader()
}

document.getElementById('search-input').addEventListener("keyup", (e)=>{
  const input = e.target.value;
  loadVideos(input)
})


loadCategories()
