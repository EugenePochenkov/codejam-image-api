import {
  data, canvas, context, currentColorEl, prevColorEl,
} from './initialState';

const tools = [...document.querySelectorAll('.tool')];

tools.forEach((tool) => {
  tool.addEventListener('click', function f(e) {
    tools.forEach((item) => {
      item.classList.remove('active');
    });

    const { target } = e;
    if (target.classList.contains('tool') || target.parentNode.classList.contains('tool')) {
      this.classList.add('active');
      data.tool = this.dataset.tool;
      localStorage.setItem('tool', data.tool);
    }
  });
});

canvas.addEventListener('click', (e) => {
  if (data.tool === 'fillbucket') {
    context.fillStyle = data.currentColor;
    context.fillRect(0, 0, 512, 512);

    data.canvas = canvas.toDataURL();
    data.imageWidth = 512;
    data.imageHeight = 512;
    data.isImageSet = false;

    localStorage.setItem('canvas', data.canvas);
    localStorage.setItem('imageWidth', data.imageWidth);
    localStorage.setItem('imageHeight', data.imageHeight);
    localStorage.setItem('isImageSet', data.isImageSet);
  }

  if (data.tool === 'colorpicker') {
    const x = e.offsetX;
    const y = e.offsetY;

    const ctx = canvas.getContext('2d');

    const imageData = ctx.getImageData(x, y, 1, 1).data;
    const rgbaColor = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;

    if (rgbaColor !== currentColorEl.style.backgroundColor) {
      data.prevColor = data.currentColor;
      data.currentColor = rgbaColor;

      prevColorEl.style.backgroundColor = data.prevColor;
      currentColorEl.style.backgroundColor = data.currentColor;

      localStorage.setItem('currentColor', data.currentColor);
      localStorage.setItem('prevColor', data.prevColor);
    }
  }
});

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e) {
  if (!isDrawing) return;

  context.lineWidth = 512 / 32;
  context.lineHeight = context.lineWidth;
  context.strokeStyle = data.currentColor;
  context.lineJoin = 'round';
  context.lineCap = 'round';
  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mousedown', (e) => {
  if (data.tool === 'pencil') {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

canvas.addEventListener('mouseout', () => {
  isDrawing = false;

  data.canvas = canvas.toDataURL();
  data.imageWidth = 512;
  data.imageHeight = 512;

  localStorage.setItem('canvas', data.canvas);
  localStorage.setItem('imageWidth', data.imageWidth);
  localStorage.setItem('imageHeight', data.imageHeight);
});

export default tools;
