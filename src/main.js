
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery,showLoader, hideLoader} from './js/render-functions.js';

const form = document.querySelector('form');
const submitBtn = form.querySelector('button[type="submit"]');

 
form.addEventListener('submit', (e) => {
    e.preventDefault();


        const formData = new FormData(e.target);
        const message = formData.get('searchText').trim();
    
        if (!message) {
            iziToast.error({
                position: 'topRight',
                title: 'Ерор',
                message: 'Ви нічого не ввели!'
            });
            return;
    }
        clearGallery();
        showLoader();

        submitBtn.disabled = true;

        
        getImagesByQuery(message).then(result => {
   
            const images = result.data.hits;
        
            if (!images.length) {
                iziToast.error({
                    position: 'topRight',
                    title: 'Немає результатів',
                    message: 'Нічого не знайдено'
                });
                submitBtn.disabled = false;
               submitBtn.textContent = oldText;
                return;
            }

            createGallery(images)
                ;
        }).catch((err) => {console.log(err);
        
            iziToast.error({
                position: 'topRight',
                title: err,
                message: 'Помилка'
            })

        }).then(() => {
           hideLoader();
           submitBtn.disabled = false;
            e.target.reset();
        });

})