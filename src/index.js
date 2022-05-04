import Notiflix from 'notiflix';
import { fetchPixabay } from './scripts/fetchPixabay';
import './sass/main.scss';


const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector(".load-more");
const MAX_SIZE_PAGES = 40;

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
    </div>`
    ).join("")
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
    page = 1;
    getData(value, page, true);
}

async function getData (value, page, showMessage = false) {
    loadMore.classList.add("visually-hidden")
    const {data} = await fetchPixabay(value, page)
        const dataLength = data.hits.length;
        if (!dataLength) {
            return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
        if (dataLength === MAX_SIZE_PAGES && Math.floor(data.totalHits / MAX_SIZE_PAGES) >= page) {
            loadMore.classList.remove("visually-hidden")
        }
        if (showMessage) {
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
        }
        renderGallery(data)
}

function onMoreButtonClick (e) {
    page += 1
    value = form.searchQuery.value.trim()
    getData(value, page);
}
