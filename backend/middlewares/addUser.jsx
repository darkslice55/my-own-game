const { User, Game } = require('../db/models');

async function addUser(req, res, next) {
  res.locals.user = await User.findByPk(req.session.userId);

  if (res.locals.user) {
    const game = await Game.findOne({
      where: {
        user_id: Number(res.locals.user.id),
        isFinished: false,
      },
    });
    if (game) {
      res.locals.gameId = game.id;
    }
  }

  next();
}

module.exports = addUser;
