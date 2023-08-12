const router = require('express').Router();

const { Users, Recipes, sequelize } = require('../../db/models');

const Main = require('../views/Main');

router.get('/', async (req, res) => {
  try {
    const { recipes } = await (
      await fetch('https://api.spoonacular.com/recipes/random?number=12', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.APIKEY,
        },
      })
    ).json();

    const noNullObj = recipes.filter((el) => el.image && el.instructions && el);

    const cardInfo = [];

    noNullObj.forEach((el) => {
      const info = {
        id: el.id,
        title: el.title,
        extendedIngredients: el.extendedIngredients,
        image: el.image,
        instructions: el.instructions,
        readyInMinutes: el.readyInMinutes,
      };

      Promise.resolve(
        Recipes.findOrCreate({
          where: { id: el.id },
          defaults: el,
        })
      );

      cardInfo.push(info);
    });

    // const cardInfo = (await Recipes.findAll({ limit: 12 })).map((el) =>
    //   el.get({
    //     plain: true,
    //   })
    // );

    if (req.session.user) {
      const { favourite } = await Users.findOne({
        where: { id: req.session.user.id },
      });

      const filtered = cardInfo.map((recipe) => {
        if (favourite?.includes(recipe.id)) {
          recipe.added = true;
        } else {
          recipe.added = false;
        }
        return recipe;
      });

      res.render(Main, { cardInfo: filtered });
    } else {
      res.render(Main, { cardInfo });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put('/recipe/:id', async (req, res) => {
  const { id } = req.params;

  const { addToFav } = req.body;

  try {
    if (addToFav) {
      await Users.update(
        {
          favourite: sequelize.fn(
            'array_append',
            sequelize.col('favourite'),
            id
          ),
        },
        { where: { id: req.session.user.id } }
      );

      await Users.findOne({
        where: { id: req.session.user.id },
      });

      res.json({ updated: true, msg: null });
    } else {
      const { favourite } = await Users.findOne({
        where: { id: req.session.user.id },
      });

      const fav1 = favourite.filter((el) => el !== Number(id));

      await Users.update(
        { favourite: fav1 },
        { where: { id: req.session.user.id } }
      );
      res.json({ updated: true, msg: null });
    }
  } catch (error) {
    res.json({ updated: false, msg: error.toString() });
  }
});

router.post('/recipe', async (req, res) => {
  const { ids, sortBy, sortIn } = req.body;

  if (sortBy === 'time' && req.session.user && sortIn === 'more') {
    try {
      const { favourite } = await Users.findOne({
        where: { id: req.session.user.id },
      });

      const toSort = await Promise.all(
        ids.map((el) => Recipes.findOne({ where: { id: el }, raw: true }))
      );

      const filtered = toSort.map((recipe) => {
        if (favourite.includes(recipe.id)) {
          recipe.added = true;
        } else {
          recipe.added = false;
        }
        return recipe;
      });

      const sort = filtered.sort((a, b) => a.readyInMinutes - b.readyInMinutes);

      res.json({ sorted: true, sort, msg: null });
    } catch (error) {
      res.json({ sorted: false, sort: null, msg: error.toString() });
    }
  } else if (sortBy === 'time' && !req.session.user && sortIn === 'more') {
    try {
      const toSort = await Promise.all(
        ids.map((el) => Recipes.findOne({ where: { id: el } }))
      );

      const sort = toSort
        .map((el) => el.get({ plain: true }))
        .sort((a, b) => a.readyInMinutes - b.readyInMinutes);

      res.json({ sorted: true, sort, msg: null });
    } catch (error) {
      res.json({ sorted: false, sort: null, msg: error.toString() });
    }
  } else if (sortBy === 'ingr' && req.session.user && sortIn === 'more') {
    try {
      const { favourite } = await Users.findOne({
        where: { id: req.session.user.id },
      });

      const toSort = await Promise.all(
        ids.map((el) => Recipes.findOne({ where: { id: el }, raw: true }))
      );

      const filtered = toSort.map((recipe) => {
        if (favourite.includes(recipe.id)) {
          recipe.added = true;
        } else {
          recipe.added = false;
        }
        return recipe;
      });

      const sort = filtered.sort(
        (a, b) => a.extendedIngredients.length - b.extendedIngredients.length
      );

      res.json({ sorted: true, sort, msg: null });
    } catch (error) {
      res.json({ sorted: false, sort: null, msg: error.toString() });
    }
  } else if (sortBy === 'ingr' && !req.session.user && sortIn === 'more') {
    try {
      const toSort = await Promise.all(
        ids.map((el) => Recipes.findOne({ where: { id: el } }))
      );

      const sort = toSort
        .map((el) => el.get({ plain: true }))
        .sort(
          (a, b) => a.extendedIngredients.length - b.extendedIngredients.length
        );

      res.json({ sorted: true, sort, msg: null });
    } catch (error) {
      res.json({ sorted: false, sort: null, msg: error.toString() });
    }
  } else if (sortBy === 'time' && req.session.user && sortIn === 'less') {
    try {
      const { favourite } = await Users.findOne({
        where: { id: req.session.user.id },
      });

      const toSort = await Promise.all(
        ids.map((el) => Recipes.findOne({ where: { id: el }, raw: true }))
      );

      const filtered = toSort.map((recipe) => {
        if (favourite.includes(recipe.id)) {
          recipe.added = true;
        } else {
          recipe.added = false;
        }
        return recipe;
      });

      const sort = filtered.sort((a, b) => b.readyInMinutes - a.readyInMinutes);

      res.json({ sorted: true, sort, msg: null });
    } catch (error) {
      res.json({ sorted: false, sort: null, msg: error.toString() });
    }
  } else if (sortBy === 'time' && !req.session.user && sortIn === 'less') {
    try {
      const toSort = await Promise.all(
        ids.map((el) => Recipes.findOne({ where: { id: el } }))
      );

      const sort = toSort
        .map((el) => el.get({ plain: true }))
        .sort((a, b) => b.readyInMinutes - a.readyInMinutes);

      res.json({ sorted: true, sort, msg: null });
    } catch (error) {
      res.json({ sorted: false, sort: null, msg: error.toString() });
    }
  } else if (sortBy === 'ingr' && req.session.user && sortIn === 'less') {
    try {
      const { favourite } = await Users.findOne({
        where: { id: req.session.user.id },
      });

      const toSort = await Promise.all(
        ids.map((el) => Recipes.findOne({ where: { id: el }, raw: true }))
      );

      const filtered = toSort.map((recipe) => {
        if (favourite.includes(recipe.id)) {
          recipe.added = true;
        } else {
          recipe.added = false;
        }
        return recipe;
      });

      const sort = filtered.sort(
        (a, b) => b.extendedIngredients.length - a.extendedIngredients.length
      );

      res.json({ sorted: true, sort, msg: null });
    } catch (error) {
      res.json({ sorted: false, sort: null, msg: error.toString() });
    }
  } else if (sortBy === 'ingr' && !req.session.user && sortIn === 'less') {
    try {
      const toSort = await Promise.all(
        ids.map((el) => Recipes.findOne({ where: { id: el } }))
      );

      const sort = toSort
        .map((el) => el.get({ plain: true }))
        .sort(
          (a, b) => b.extendedIngredients.length - a.extendedIngredients.length
        );

      res.json({ sorted: true, sort, msg: null });
    } catch (error) {
      res.json({ sorted: false, sort: null, msg: error.toString() });
    }
  }
});

module.exports = router;
