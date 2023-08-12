const React = require('react');
const Layout = require('./Layout');

module.exports = function ShowRecipe({ user, clearRecipe, isFavourite }) {
  return (
    <Layout user={user}>
      <script defer src="/js/favouriteRecipes.js" />
      <div className="showRecipeWrapper">
        <div className="showRecipeContainer bg-primary-50 shadow-secondary-400 shadow-2xl border-2 border-secondary-200 rounded-xl">

          <div className="showRecipeHeader">

            <div className="showRecipeHeaderLeftSide">
              <div className="showRecipeFoto m-2" style={{ backgroundImage: `url(${clearRecipe.image})` }} />

              <footer className="flex justify-around">
                <div className="flex justify-between">
                  <span className="material-symbols-outlined text-secondary-600">kitchen</span>
                  <p className="text-center">
                    {clearRecipe.extendedIngredients.length} ingredients
                  </p>
                </div>
                <div className="flex justify-between">
                  <span className="material-symbols-outlined text-secondary-600">timer</span>
                  <p className="text-center">{clearRecipe.readyInMinutes} min</p>
                </div>
              </footer>

              {
                isFavourite ? (
                  <div id={clearRecipe.id} className="showRecipeFavourite">
                    <button name="deleteBtn" type="button" className="text-white hover:text-secondary-700 border bg-green-700 hover:bg-white hover:border-secondary-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-1">Remove from favourites</button>
                  </div>
                ) : (
                  <div id={clearRecipe.id} className="showRecipeFavourite">
                    <button name="inviteBtn" type="button" className="text-secondary-700 hover:text-white border border-secondary-700 hover:bg-secondary-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-1">Add to favourites</button>
                  </div>
                )
              }
            </div>

            <div className="showRecipeHeaderRightSide mx-3 mt-3">
              <div className="showRecipeTitle">
                <h1 className="text-center text-xl text-secondary-700 font-display font-black">{clearRecipe.title}</h1>
              </div>
              <div className="showRecipeIngredients ml-5 mt-2">
                <ul className="list-disc">
                  <strong className=''>Ingredients:</strong>
                  {clearRecipe.extendedIngredients.map((el) => (
                    <li key={el.id}>{el.original}</li>))}
                </ul>
              </div>
            </div>

          </div>

          <div className="showRecipeBody p-3">
            {clearRecipe.instructions}
          </div>
        </div>

      </div>
    </Layout>
  );
};
