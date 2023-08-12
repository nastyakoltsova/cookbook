const React = require('react');

module.exports = function MiniCard({
  id,
  title,
  extendedIngredients,
  image,
  readyInMinutes,
  user,
  added,
}) {
  return (
    <div
      className="card my-1 px-1 md:w-1/2 lg:my-8 lg:mx-3 lg:px-4 lg:w-96 "
      id={id}
    >
      <article className="overflow-hidden rounded-lg shadow-lg shadow-green-500/50 h-106 border-2 border-secondary-300">
        <div className="relative">
          {user && (
            <>
              <span
                className={`fav-btn cursor-pointer ${added ? 'hidden' : ''
                  } material-icons md-36 absolute right-4 top-4 hover:border-none border-secondary-600 border rounded-full hover:bg-secondary-600 text-center hover:text-primary-50 text-secondary-600 bg-primary-50 `}
                id={id}
                style={{ fontSize: '2rem' }}
              >
                favorite_border
              </span>
              <span
                className={`fav-delete-btn cursor-pointer ${added ? '' : 'hidden'
                  } material-icons md-36 absolute right-4 top-4 hover:border-none border-secondary-600 border rounded-full hover:bg-secondary-600 text-center hover:text-primary-50 text-secondary-600 bg-primary-50 `}
                id={id}
                style={{ fontSize: '2rem' }}
              >
                favorite
              </span>
            </>
          )}
          <img alt="food_image" className="block w-full" src={image} />
        </div>

        <header className="flex items-start leading-tight p-2 md:p-4 justify-center h-28 my-5">
          <h1 className="text-2xl">
            <a
              className="no-underline hover:underline text-black hover:text-secondary-700"
              href={`/recipe/${id}`}
            >
              <p className="text-center font-display">
                {title.length > 50 ? `${title.slice(0, 51)}...` : title}
              </p>
            </a>
          </h1>
        </header>
        <footer className="flex justify-around">
          <div className="flex justify-between">
            <span className="material-symbols-outlined text-secondary-600">kitchen</span>
            <p className="text-center">
              {extendedIngredients.length} ingredients
            </p>
          </div>
          <div className="flex justify-between">
            <span className="material-symbols-outlined text-secondary-600">timer</span>
            <p className="text-center">{readyInMinutes} min</p>
          </div>
        </footer>
      </article>
    </div>
  );
};
