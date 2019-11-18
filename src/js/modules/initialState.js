import checkLocalStorage from './checkLocalStorage';

const initialData = {
  tool: 'pencil',
  currentColor: '#008000',
  prevColor: '#e8f741',
  canvas: '',
  canvasSize: 128,
  imageWidth: 512,
  imageHeight: 512,
  isImageSet: false,
  city: '',
};

const data = checkLocalStorage(initialData);

const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

const city = document.querySelector('.load-img__input');

if (data.city) {
  city.value = data.city;
}

if (data.canvas) {
  canvas.width = data.canvasSize;
  canvas.height = data.canvasSize;

  const image = new Image();
  image.src = data.canvas;
  image.crossOrigin = 'Anonymous';

  const { imageWidth } = data;
  const { imageHeight } = data;
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
}

const currentTool = document.querySelector(`.${data.tool}`);
currentTool.classList.add('active');

const currentColorEl = document.querySelector('.current .toolbar__color');
currentColorEl.style.backgroundColor = data.currentColor;

const prevColorEl = document.querySelector('.prev .toolbar__color');
prevColorEl.style.backgroundColor = data.prevColor;

export {
  data, canvas, context, currentColorEl, prevColorEl, city,
};
