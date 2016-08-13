import Profile from '../models/profileModel';


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

  Profile.create({ name, location, userId })
  .then((profile) => {
    res.send(`Profile created: ${profile}`);
  })
  .catch(err => res.send(`Error in creating profile: ${err}`));
};


const updateProfile = (req, res) => {
  let userId = req.body.userId;
  let name = req.body.name;
  let location = req.body.location;
  console.log('updating');

  Profile.update(
    { name, location },
    { where: { userId } } 
  )
  .then(() => {
    res.send('successfull updated profile');
  })
  .catch(err => { 
    res.send('error updating profie:', err);
  });
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

