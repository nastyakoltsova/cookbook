const router = require('express').Router();

const Main = require('../views/Main');

const { Users, Recipes } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const recipesAll = (await Recipes.findAll()).map((el) =>
      el.get({
        plain: true,
      })
    );
    const user = await Users.findOne({ where: { id: req.session.user.id } });
    const favourites = user.favourite.reverse();
    const cardInfo = [];
    favourites.forEach((id) => {
      for (let i = 0; i < recipesAll.length; i++) {
        if (recipesAll[i].id === id) {
          recipesAll[i].added = true;
          cardInfo.push(recipesAll[i]);
        }
      }
    });

    res.render(Main, { cardInfo });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
