/* eslint-disable max-len */
const renderCards = (err, data) => {
  data = data.articles;

  if (err) {
    console.warn(err, data);
    return;
  }

  const template = document.createDocumentFragment();

  const cards = data.map(item => {
    const card = document.createElement('li');
    card.className = 'news-card';
    card.innerHTML = `
        <div class="news-card__img">
          ${item.urlToImage ? `<img src=${item.urlToImage} width="270" height="200" alt=${item.title}>` : '<img src="assets/image/img-cap.jpg" width="270" height="200" alt="новости"></img>'}
        </div>
        <div class="news-card__text-content">
          <a class="news-card__link" target="_blank" href="${item.url}">
            ${item.title}
            <svg width="24" height="24">
              <use xlink:href="assets/image/icons/sprite.svg#arrow-up-right"></use>
            </svg>
          </a>
          ${item.description ? `<p class="news-card__text">${item.description}</p>` : ''}

          <div class="news-card__footer">
            <timer datetime = "${item.publishedAt}" class="news-card__date">16/03/2022
              <span class="news-card__time">11:06</span>
            </timer>
            ${item.author ? `<p class="news-card__author">${item.author}</p>` : ''}
          </div>
        </div>
    `;
    return card;
  });

  template.append(...cards);

  return template;
};

export default renderCards;
