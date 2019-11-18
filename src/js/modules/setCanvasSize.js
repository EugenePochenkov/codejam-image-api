import {
  canvas, context, data,
} from './initialState';

const parent = document.querySelector('.size-switcher');

parent.addEventListener('click', (e) => {
  const { target } = e;

  if (target.classList.contains('size-switcher__btn')) {
    canvas.width = target.dataset.size;
    canvas.height = target.dataset.size;

    data.canvasSize = target.dataset.size;
    localStorage.setItem('canvasSize', data.canvasSize);

    const image = new Image();
    image.src = data.canvas;
    image.crossOrigin = 'anonymous';

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
});
