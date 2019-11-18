import '@babel/polyfill';
import {
  canvas, context, data, city,
} from './initialState';

const loadImage = document.querySelector('.load-img__btn');

async function getImage() {
  const inputValue = city.value;
  const url = `https://api.unsplash.com/photos/random?query=city ${inputValue}&client_id=bb0ac353df702e751276e942113d83a46d0cb0393dcbed8e344d160336416865`;

  try {
    const response = await fetch(url);
    const responseData = await response.json();

    const image = new Image();

    image.src = responseData.urls.small;
    image.crossOrigin = 'Anonymous';

    const imageWidth = responseData.width;
    const imageHeight = responseData.height;
    let coef;
    let imageX;
    let imageY;

    if (imageWidth > imageHeight) {
      coef = canvas.width / imageWidth;
      imageX = 0;
      imageY = (canvas.width - imageHeight * coef) / 2;
    } else {
      coef = canvas.width / imageHeight;
      imageY = 0;
      imageX = (canvas.width - imageWidth * coef) / 2;
    }

    const width = imageWidth * coef;
    const height = imageHeight * coef;

    image.onload = function f() {
      context.clearRect(0, 0, 512, 512);
      context.drawImage(image, imageX, imageY, width, height);
    };

    data.canvas = image.src;
    data.imageWidth = imageWidth;
    data.imageHeight = imageHeight;
    data.isImageSet = true;

    localStorage.setItem('canvas', data.canvas);
    localStorage.setItem('imageWidth', data.imageWidth);
    localStorage.setItem('imageHeight', data.imageHeight);
    localStorage.setItem('isImageSet', data.isImageSet);
  } catch (error) {
    console.log(error.message);
  }
}

loadImage.addEventListener('click', getImage);
