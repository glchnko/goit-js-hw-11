import { Notify } from 'notiflix/build/notiflix-notify-aio';

function emptyInputMessage(){
    Notify.info('You have not written anything, please write what you want to find')

}

function errorMessage(){
    Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}

function foundMessage(totalHits){
    Notify.success('Hooray! We found ${totalHits} images.')
}

function endCollectionMessage(){
    Notify.info('We are sorry, but you have reached the end of search results')
}

export {emptyInputMessage, errorMessage, foundMessage, endCollectionMessage}