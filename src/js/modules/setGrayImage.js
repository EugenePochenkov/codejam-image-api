import {
  canvas, context, data,
} from './initialState';

const btnToSetGrayColor = document.querySelector('.load-img__grayscale');

btnToSetGrayColor.addEventListener('click', (e) => {
  if (data.isImageSet) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const Uint8ClampedArray = imageData.data;

    for (let i = 0; i < Uint8ClampedArray.length; i += 4) {
      const avg = (Uint8ClampedArray[i] + Uint8ClampedArray[i + 1] + Uint8ClampedArray[i + 2]) / 3;
      Uint8ClampedArray[i] = avg;
      Uint8ClampedArray[i + 1] = avg;
      Uint8ClampedArray[i + 2] = avg;
    }

    context.putImageData(imageData, 0, 0);
  } else {
    const alertEl = document.querySelector('.alert');

    alertEl.style.display = 'flex';
    e.stopPropagation();
  }
});
