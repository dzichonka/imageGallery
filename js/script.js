const accessKey = 'N1enlcYf2BdeVz4WDyU9PAX5nPTK2Zd3UC2Io_EmZ1Y';
const baseUrl = 'https://api.unsplash.com/search/photos';
const content = document.querySelector('.content');
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('.search-icon');
const clearButton = document.querySelector('#clear-btn');

window.addEventListener('load', () => {
  searchInput.focus();
  fetchImages('night');
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    fetchImages(searchInput.value);
  }
});

searchBtn.addEventListener('click', () => {
  fetchImages(searchInput.value);
});

clearButton.addEventListener('click', () => {
  searchInput.value = '';
  searchInput.focus();
});

async function fetchImages(query) {
  const url = `${baseUrl}?query=${query}&per_page=30&client_id=${accessKey}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  displayImages(data.results);
}

function displayImages(photos) {
  content.innerHTML = '';
  document.querySelector('#search-input').value = searchInput.value;
  document.querySelector('#search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      fetchImages(searchInput.value);
    }
  });
  document.querySelector('#clear-btn').addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
  });

  photos.forEach(photo => {
    const elem = document.createElement('div');
    elem.className = 'gallery-item';
    const img = document.createElement('img');
    img.src = photo.urls.small;
    img.alt = photo.alt_description;
    elem.appendChild(img);
    content.appendChild(elem);
  });
}
