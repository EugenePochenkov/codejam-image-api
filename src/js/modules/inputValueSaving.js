import { data, city } from './initialState';

city.addEventListener('change', () => {
  data.city = city.value;
  localStorage.setItem('city', data.city);
});
