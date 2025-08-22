import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader,hideLoadMoreButton, showLoadMoreButton} from './js/render-functions.js';

const form = document.querySelector('form');
const galleryHolder = form.textContent;
const submitBtn = form.querySelector('button[type="submit"]');
const moreBtn = document.querySelector('#moreBtn');

 
let message = '';
let currentPage = 1;

 

form.addEventListener('submit', async (e) => {
  e.preventDefault();

   message = new FormData(e.target).get('searchText').trim();

  if (!message) {
    iziToast.error({
      position: 'topRight',
      title: 'Помилка',
      message: 'Ви нічого не ввели!',
    });
    return;
  }

  const oldText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Searching…';

  clearGallery();
    showLoader();

    

  try {
    const result = await getImagesByQuery(message, currentPage);

    const images = result.data.hits;
    const totalImg = result.data.total;
     console.log(`total Img in data: ${totalImg}`);
     

       if (images.length === 0) {
        iziToast.warning({
          position: 'topRight',
          title: 'Немає результатів',
          message: 'Нічого не знайдено.',
        });
        hideLoadMoreButton()
        return; 
      }

      createGallery(images);
      page++;
      if (totalImg > ImgPerPage) {
          showLoadMoreButton();
        } else {
          hideLoadMoreButton();
        }

    
  } catch (err) {
    console.log(err);
    iziToast.error({
      position: 'topRight',
      title: err?.message || 'Помилка запиту',
      message: 'Спробуйте ще раз пізніше.',
    });
  } finally {
    hideLoader();
    submitBtn.disabled = false;
    submitBtn.textContent = oldText; 
    e.target.reset();
    }
    
});

moreBtn.addEventListener('click', async () => {
  showLoader();
  try {
    const result = await getImagesByQuery(message, page);
      createGallery(result.data.hits);
 
      page=+20;
      
    if (page * ImgPerPage >= result.totalHits) {
      hideLoadMoreButton();
    }
  } finally {
    hideLoader();
    
  }
});


