import './sass/main.scss';
import Notiflix from 'notiflix';
import { fetchPixabay } from './scripts/fetchPixabay';

const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector(".load-more");

let value = ""
let page = 1;

loadMore.classList.add("visually-hidden")

form.addEventListener("submit", onSearchClick) 
loadMore.addEventListener("click", onMoreButtonClick)


function renderGallery (value) {
    const markUp = value.hits.map((event) => 
    `<div class="photo-card">
        <img width="345" height="230" src="${event.webformatURL}" alt="${event.tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes: ${event.likes}</b>
            </p>
            <p class="info-item">
                <b>Views: ${event.views}</b>
            </p>
            <p class="info-item">
                <b>Comments: ${event.comments}</b>
            </p>
            <p class="info-item">
                <b>Downloads: ${event.downloads}</b>
            </p>
        </div>
    </div>`).join("")
    gallery.insertAdjacentHTML("beforeend", markUp)
}

function onSearchClick (e) {
    e.preventDefault();
    value = form.searchQuery.value.trim()
    gallery.innerHTML=""
    if(!value) {
        Notiflix.Notify.failure("To start, enter something")
        loadMore.classList.add("visually-hidden")
        return
    }
    fetchPixabay(value).then(({data}) => {
        if(data.totalHits === 0) {
            return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        } else {
            renderGallery(data)
            loadMore.classList.remove("visually-hidden")
        }
    })
}

function onMoreButtonClick (e) {
    page = page + 1
    value = form.searchQuery.value.trim()
    fetchPixabay(value, page).then(({data}) => {
        renderGallery(data)
        loadMore.classList.remove("visually-hidden")
    });
}