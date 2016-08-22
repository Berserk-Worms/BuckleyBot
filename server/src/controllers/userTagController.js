import UserTag from '../models/userTagModel';

const getUserTags = (req, res) => {
  let userId = req.params.userId;

  UserTag.findAll({
    where: { userId }
  })
  .then(userTag => res.send(userTag))
  .catch(err => res.send('No user tags found: ', err));
};

const addUserTags = (req, res) => {
  UserTag.findOrCreate({
    where: {
      userId: req.body.userId,
      tagId: req.body.tagId
    }
  })
  .then(userTags => res.send(userTags))
  .catch(err => res.send(err));
};

const updateUserTags = (req, res) => {
  
};

const deleteUserTags = (req, res) => {
  UserTag.find({
    where: {
      userId: req.params.userId,
      tagId: req.params.tagId
    }
  })
  .then(userTag => {
    console.log('Destroyed, ', userTag)
    userTag.destroy();
  })
  .catch(err => console.log('Error destrying user tag: ', err))
};

export default { getUserTags, addUserTags, updateUserTags, deleteUserTags };