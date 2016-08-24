import UserTag from '../models/userTagModel';

const getUserTags = (req, res) => {
  let slackUserId = req.params.slackUserId;

  console.log('slackUserId in getusertag, ', slackUserId)

  UserTag.findAll({
    where: { slackUserId }
  })
  .then(userTag => res.send(userTag))
  .catch(err => res.send(err));
};

const addUserTags = (req, res) => {
  console.log('addUserTAg: ', req.body.slackUserId, req.body.tagId);

  UserTag.findOrCreate({
    where: {
      slackUserId: req.body.slackUserId,
      tagId: req.body.tagId
    }
  })
  .then(userTags => res.send(userTags))
  .catch(err => res.send(err));
};

const deleteUserTags = (req, res) => {
  UserTag.find({
    where: {
      slackUserId: req.params.slackUserId,
      tagId: req.params.tagId
    }
  })
  .then(userTag => {
    console.log('Destroyed,', userTag.dataValues.slackUserId, userTag.dataValues.tagId)
    userTag.destroy();
  })
  .catch(err => console.log('Error destrying user tag: ', err));
};

export default { getUserTags, addUserTags, deleteUserTags };