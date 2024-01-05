import fetchRequest from './fetchRequest.js';
import renderCards from './renderCards.js';
import preload from './preload.js';
import renderTitle from './renderTitle.js';

const news = document.querySelector('.news');
const newsContainer = news.querySelector('.container');

const main = document.querySelector('main');
const form = document.querySelector('form');
const input = document.querySelector('.custom-input input');

const wrapperCards = document.createElement('ul');
wrapperCards.className = 'news__list';

const initNews = () => {
  preload.show();
  return Promise.all([
    fetchRequest('https://newsapi.org/v2/top-headlines?country=ru&pageSize=12', {
      headers: {
        'X-Api-Key': '89644bef9fa640d08a93e398d350cfa3',
      },
      callback: renderCards,
    }),
  ]);
};

initNews().then(data => {
  preload.remove();
  const title = renderTitle('Свежие новости');
  news.insertAdjacentHTML('beforebegin', title);
  wrapperCards.append(...data);
  newsContainer.append(wrapperCards);
});

form.addEventListener('submit', evt => {
  evt.preventDefault();

  const searchValue = input.value;

  const initSearch = () => Promise.all([
    fetchRequest(`https://newsapi.org/v2/everything?q=${searchValue}&pageSize=8`, {
      headers: {
        'X-Api-Key': '89644bef9fa640d08a93e398d350cfa3',
      },
      callback: renderCards,
    }),
  ]);

  const init = () => Promise.all([
    fetchRequest('https://newsapi.org/v2/top-headlines?country=ru&pageSize=4', {
      headers: {
        'X-Api-Key': '89644bef9fa640d08a93e398d350cfa3',
      },
      callback: renderCards,
    }),
  ]);

  initSearch().then(data => {
    const arrNews = document.querySelectorAll('.news');
    const titles = document.querySelectorAll('.title-block');
    titles[0].remove();
    arrNews[0].remove();
    const result = document.createElement('section');
    newsContainer.innerHTML = '';

    const container = document.createElement('div');
    result.className = 'news';
    container.className = 'container';
    result.append(container);
    const wrapperCards2 = document.createElement('ul');
    wrapperCards2.className = 'news__list';

    wrapperCards2.append(...data);

    container.append(wrapperCards2);
    const cardLength = wrapperCards2.querySelectorAll('.news-card').length;
    main.prepend(result);
    // eslint-disable-next-line max-len
    const title = renderTitle(`По вашему запросу "${searchValue}" найдено ${cardLength} результатов`);
    result.insertAdjacentHTML('beforebegin', title);
    input.value = '';
  });

  init().then(data => {
    const result = document.createElement('section');
    const container = document.createElement('div');
    result.className = 'news';
    container.className = 'container';
    result.append(container);
    const wrapperCards = document.createElement('ul');
    wrapperCards.className = 'news__list';

    wrapperCards.append(...data);

    container.append(wrapperCards);
  });
});
