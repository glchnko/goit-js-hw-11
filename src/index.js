import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { cardMarkup } from './js/card-create';
import {emptyInputMessage, errorMessage, foundMessage, endCollectionMessage} from './js/notifications';


const axios = require('axios').default;