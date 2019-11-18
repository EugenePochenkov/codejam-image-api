import {
  data, currentColorEl, prevColorEl,
} from './initialState';

const colorTools = [...document.querySelectorAll('.color')];

colorTools.forEach((tool) => {
  tool.addEventListener('click', function f(e) {
    const { target } = e;
    if (target.classList.contains('color') || target.parentNode.classList.contains('color')) {
      const styles = getComputedStyle(this.firstElementChild);
      const color = styles.backgroundColor;

      if (color !== currentColorEl.style.backgroundColor) {
        data.prevColor = data.currentColor;
        data.currentColor = color;

        prevColorEl.style.backgroundColor = data.prevColor;
        currentColorEl.style.backgroundColor = data.currentColor;

        localStorage.setItem('currentColor', data.currentColor);
        localStorage.setItem('prevColor', data.prevColor);
      }
    }
  });
});
