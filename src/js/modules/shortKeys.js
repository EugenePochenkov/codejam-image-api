import { data } from './initialState';
import tools from './tools';

document.addEventListener('keydown', (e) => {
  if (e.code === 'KeyB') {
    tools.forEach((item) => {
      item.classList.remove('active');
    });

    data.tool = 'fillbucket';
    document.querySelector('.fillbucket').classList.add('active');
    localStorage.setItem('tool', data.tool);
  }

  if (e.code === 'KeyC') {
    tools.forEach((item) => {
      item.classList.remove('active');
    });

    data.tool = 'colorpicker';
    document.querySelector('.colorpicker').classList.add('active');
    localStorage.setItem('tool', data.tool);
  }

  if (e.code === 'KeyP') {
    tools.forEach((item) => {
      item.classList.remove('active');
    });

    data.tool = 'pencil';
    document.querySelector('.pencil').classList.add('active');
    localStorage.setItem('tool', data.tool);
  }
});
