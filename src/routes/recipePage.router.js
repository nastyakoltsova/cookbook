const router = require('express').Router();

const ShowRecipe = require('../views/ShowRecipe');
const { Users, Recipes } = require('../../db/models');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipes.findOne({ where: { id } });
    const clearRecipe = recipe.get();
    const regExp = /<[^<>]+>/gm;

    clearRecipe.instructions = clearRecipe.instructions.replaceAll(regExp, '');

    const favourites = await Users.findOne({ where: { id: req.session.user.id } });
    const clearFavourites = favourites.get();
    const isFavourite = clearFavourites.favourite?.includes(Number(id));
    res.render(ShowRecipe, { clearRecipe, isFavourite });
  } catch (error) {
    console.log(error);
  }
});

router.delete('/favorite/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const selectUser = await Users.findOne({ where: { id: req.session.user.id } });
    const arrFavourite = selectUser.favourite;
    const filterFavourite = arrFavourite.filter((el) => el !== Number(id));

    await Users.update(
      { favourite: filterFavourite },
      { where: { id: req.session.user.id } },
    );

    res.json({ status: 200 });
  } catch (error) {
    console.log(error);
  }
});

router.put('/favorite/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const selectUser = await Users.findOne({ where: { id: req.session.user.id } });
    if (!selectUser.favourite) {
      selectUser.favourite = [];
    }
    const arrFavourite = selectUser.favourite;
    arrFavourite.push(Number(id));

    await Users.update(
      { favourite: arrFavourite },
      { where: { id: req.session.user.id } },
    );
    res.json({ status: 200 });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
