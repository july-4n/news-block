import fetchRequest from './fetchRequest.js';
import createCard from './createCard.js';
import preload from './preload.js';

const news = document.querySelector('.news');
const newsContainer = news.querySelector('.container');
const main = document.querySelector('main');
const form = document.querySelector('form');

const result = document.createElement('section');
const headlinesWrapper = document.createElement('div');

export const renderHeadlines = (country, count) => fetchRequest(`https://newsapi.org/v2/top-headlines?country=${country}`, {
  method: 'GET',
  headers: {
    'X-Api-Key': '89644bef9fa640d08a93e398d350cfa3',
  },
  callback(err, data) {
    if (err) {
      console.error(err);
      return;
    }

    const template = document.createDocumentFragment();
    preload.show();
    const newsList = document.createElement('ul');
    newsList.className = 'news__list';
    const title = document.createElement('h2');
    title.classList.add('title', 'title--h2');
    title.textContent = 'Свежие новости';
    const articles = data.articles.slice(0, count);
    const allHeadlines = articles.map((item) => createCard(item));
    preload.remove();
    newsList.append(...allHeadlines);
    template.append(title, newsList);
    return template;
  },
});

export const renderNews = (phrase, count) => fetchRequest(`https://newsapi.org/v2/everything?q=${phrase}`, {
  method: 'GET',
  headers: {
    'X-Api-Key': '89644bef9fa640d08a93e398d350cfa3',
  },
  callback(err, data) {
    if (err) {
      console.error(err);
      return;
    }

    const template = document.createDocumentFragment();
    const newsList = document.createElement('ul');
    newsList.className = 'news__list';
    const title = document.createElement('h2');
    title.classList.add('title', 'title--h2');
    title.textContent =
    `По вашему запросу "${phrase}" найдено ${count} результатов`;
    const articles = data.articles.slice(0, count);
    const allArticles = articles.map((item) => createCard(item));
    newsList.append(...allArticles);
    template.append(title, newsList);
    return template;
  },
});

renderHeadlines('ru', '12').then(articles => {
  const newsList = document.createElement('ul');
  newsList.className = 'news__list';
  newsContainer.append(articles);
});

form.addEventListener('submit', evt => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const keywords = Object.fromEntries(formData)['main-search'];
  const country = Object.fromEntries(formData).country;

  if (keywords === '') {
    return;
  }

  preload.show();
  Promise.all([renderNews(keywords, 8), renderHeadlines(country, 4)])
    .then(articles => {
      preload.remove();

      newsContainer.innerHTML = '';
      newsContainer.append(articles[0]);
      headlinesWrapper.innerHTML = '';
      const wrapperCards2 = document.createElement('ul');
      wrapperCards2.className = 'news__list';
      result.className = 'news';
      headlinesWrapper.className = 'container';
      result.append(headlinesWrapper);
      main.append(result);

      headlinesWrapper.append(articles[1]);
    });
});
