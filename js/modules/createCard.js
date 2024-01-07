/* eslint-disable max-len */
const createCard = (item) => {
  const date = new Date(`${item.publishedAt}`);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedTime = `${formattedHours}:${formattedMinutes}`;

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
            <timer datetime = "${item.publishedAt}" class="news-card__date">${formattedDate}
              <span class="news-card__time">${formattedTime}</span>
            </timer>
            ${item.author ? `<p class="news-card__author">${item.author}</p>` : ''}
          </div>
        </div>
    `;
  return card;
};

export default createCard;
