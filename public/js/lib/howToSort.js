async function howToSort(event, sortByStr, sortInStr) {
  const ids = Array.from(document.querySelectorAll('.card')).map((el) => el.id);
  const { sorted, sort, msg } = await (
    await fetch('/recipe', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ ids, sortBy: sortByStr, sortIn: sortInStr }),
    })
  ).json();

  if (sorted) {
    const cardBox = document.querySelector('.card-box');
    cardBox.innerHTML = '';

    sort.forEach((el) => {
      cardBox.insertAdjacentHTML('beforeend', cardHTML(el));
    });

    if (sortInStr === 'more' && sortByStr === 'time') {
      document.querySelector('.ct-li').children[2].style.display = 'block';

      document.querySelector('.ct-li').children[1].style.display = 'none';
      setTimeout(() => {
        event.target.classList.remove('sort-time-btn');

        event.target.classList.add('sort-time-less-btn');
      }, 500);
    } else if (sortInStr === 'less' && sortByStr === 'time') {
      document.querySelector('.ct-li').children[2].style.display = 'none';

      document.querySelector('.ct-li').children[1].style.display = 'block';

      setTimeout(() => {
        event.target.classList.remove('sort-time-less-btn');

        event.target.classList.add('sort-time-btn');
      }, 500);
    } else if (sortInStr === 'more' && sortByStr === 'ingr') {
      document.querySelector('.ingr-li').children[2].style.display = 'block';

      document.querySelector('.ingr-li').children[1].style.display = 'none';

      setTimeout(() => {
        event.target.classList.remove('sort-ingr-btn');

        event.target.classList.add('sort-ingr-less-btn');
      }, 500);
    } else if (sortInStr === 'less' && sortByStr === 'ingr') {
      document.querySelector('.ingr-li').children[2].style.display = 'none';

      document.querySelector('.ingr-li').children[1].style.display = 'block';

      setTimeout(() => {
        event.target.classList.remove('sort-ingr-less-btn');

        event.target.classList.add('sort-ingr-btn');
      }, 500);
    }
  } else {
    console.log(msg);
  }
}
