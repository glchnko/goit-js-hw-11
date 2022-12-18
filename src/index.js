import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { cardMarkup } from './js/card-create';
import { FetchImagesService } from './js/fetch';



const refs = {
    formSearch: document.querySelector('#search-form'),
    galleryEl : document.querySelector('.gallery'),
    buttonEl : document.querySelector('.search-form__button'),
}

refs.formSearch.addEventListener('submit', onSearch);

const fetchImagesService = new FetchImagesService();
const lightbox = new SimpleLightbox('.gallery a', { captionDelay
    : 250,
});


function onSearch(e) {
    e.preventDefoult();

    const currentWord = e.currentTarget.elements.searchQuery.value.trim();
    if (currentWord === '') {
        return Notify.info(`Enter a word to search for images.`);
    }
    fetchImagesService.searchQuery = currentWord;
    fetchImagesService.resetPage();
    cleanImgContainer();
    fetchImages();

}

function cleanImgContainer () {
    refs.galleryEl.innerHTML = '';
}

function fetchImages() {
    fetchImagesService.fetchImages().then(({data}) => {
        if (data.total === 0) {
            Notify.info(`Sorry, there are no images matching your search query: ${fetchImagesService.searchQuery}. Please try again.`);
            return;
        }
        appendImgMarkup(data);
        lightbox.refresh();
        const { images } = data;

        if (refs.containerDiv.children.length === totalHits ) {
            Notify.info(`We're sorry, but you've reached the end of search results.`);
        } else {
            Notify.success(`Hooray! We found ${totalHits} images.`);
        }
    }).catch(handleError);
}

function handleError () {
    console.log ('Error');
}

function appendImgMarkup (data) {
    refs.galleryEl.insertAdjacentHTML('beforeend', cardMarkup(data));
}


