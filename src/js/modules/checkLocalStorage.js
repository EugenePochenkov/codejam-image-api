export default function checkLocalStorage(options) {
  const data = { ...options };
  const keys = Object.keys(data);

  keys.forEach((key) => {
    if (localStorage.getItem(key) !== 'undefined' && localStorage.getItem(key) !== null) {
      data[key] = localStorage.getItem(key);
    }
  });

  return data;
}
