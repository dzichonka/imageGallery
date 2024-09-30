'use strict';
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
    elem.classList.add('gallery-item');
    const img = document.createElement('img');
    img.src = photo.urls.regular;
    img.alt = photo.alt_description;
    img.classList.add('gallery-item_img');
    elem.appendChild(img);
    content.appendChild(elem);
  });
}
//modal
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal-img");
const closeModal = document.querySelector(".modal-close");
const images = document.querySelectorAll('.gallery-item');


content.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('gallery-item_img')) {
    modalImg.src = e.target.src;
    modal.classList.add('modal-open');
    modal.classList.remove('modal-close');
    document.body.style.overflow = "hidden";
  }
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modalImg.src = '';
    modal.classList.remove('modal-open');
    modal.classList.add('modal-close');
    document.body.style.overflow = "";
  }
});

