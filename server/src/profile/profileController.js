import Profile from './profileModel';


const findProfile = (req, res) => {
  let userId = req.query.userId;

  Profile.findOne({
    where: { userId }
  })
  .then(profile => res.json(profile))
  .catch(err => res.send('Profile was not found'));
};


const addProfile = (req, res) => {  
  let userId = req.body.userId;
  let name = req.body.name;
  let location = req.body.location;

  Profile.findOrCreate({
    where: { name, location, userId }
  })
  .spread( (profile, created) => {
    created ? res.send('Profile created') : res.send('Profile already exists');
  })
  .catch(err => res.send(err));
};


const updateProfile = (req, res) => {
  let userId = req.body.userId;
  let name = req.body.name;
  let location = req.body.location;

  Profile.find({
    where: { userId }
  })
  .then(profile => {

    if(profile) {
      profile.updateAttributes({ name, location })
        .then(profile => res.send('Profile has been updated'))
        .catch(err => res.send('Error updating profile'));
    } else {
      res.send('Profile not found')
    }

  })
  .catch(err => res.send(err));

};


const deleteProfile = (req, res) => {
  let userId = req.body.userId;

  Profile.destroy({
    where: { userId }
  })
  .then(profile => res.send('Profile successfully deleted'))
  .catch(err => res.send('Profile deletion failed'));

};


export default { findProfile, addProfile, updateProfile, deleteProfile };

