import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { makeImageMarkup } from './js/card-create';
import { FetchImagesService } from './js/fetch';
import { LoadMoreBtn } from './js/load-more-btn';


const refs = {
    formSearch: document.querySelector('#search-form'),
    containerDiv: document.querySelector('.gallery'),
}


const fetchImagesService = new FetchImagesService();
const loadMoreBtn = new LoadMoreBtn({ selektor: '.load-more', hidden: true });
const lightbox = new SimpleLightbox('.gallery a', { captionDelay
    : 250,
});


function onSearch(e) {
    e.preventDefault();

    const currentWord = e.currentTarget.elements.searchQuery.value.trim();
    if (currentWord === '') {
        return Notify.info(`Enter a word to search for images.`);
    }
    fetchImagesService.searchQuery = currentWord;
    loadMoreBtn.show();
    fetchImagesService.resetPage();
    cleanContainer();
    fetchImages();
}

function cleanContainer() {
    refs.containerDiv.innerHTML = '';
}

function fetchImages() {
    loadMoreBtn.disabled();
    fetchImagesService.fetchImages().then(({data}) => {
        if (data.total === 0) {
            Notify.info(`Sorry, there are no images matching your search query: ${fetchImagesService.searchQuery}. Please try again.`);
            loadMoreBtn.hide();
            return;
        }
        appendImgMarkup(data);
        onPageScroll()
        lightbox.refresh();
        const { totalHits } = data;

        if (refs.containerDiv.children.length === totalHits ) {
            Notify.info(`We're sorry, but you've reached the end of search results.`);
            loadMoreBtn.hide();
        } else {
            loadMoreBtn.enable();
            Notify.success(`Hooray! We found ${totalHits} images.`);
        }
    }).catch(handleError);
}

function handleError() {
    console.log('Error!');
}

function appendImgMarkup(data) {
    refs.containerDiv.insertAdjacentHTML('beforeend', makeImageMarkup(data));
}

//  Плавная прокрутка страницы после запроса и отрисовки каждой следующей группы изображений
function onPageScroll(){ 
    const { height: cardHeight } = refs.containerDiv
        .firstElementChild.getBoundingClientRect();
        window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
        });
}

refs.formSearch.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);


