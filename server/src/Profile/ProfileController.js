import db from '../db/db-config';
import Profile from './ProfileModel';


const findProfile = (req, res) => {

  let userId = req.query.userId;

  Profile.findOne({
    where: { userId }
  })
  .then(profile => {
    res.json(profile);
  })
  .catch(err => {
    res.send('Profile was not found');
  });
};

const addProfile = (req, res) => {  

  let userId = req.body.userId;
  let name = req.body.name;
  let location = req.body.location;

  Profile.count({
    where: { userId }
  })
  .then(count => {

    if (count !== 0) { res.send('Profile already exists'); }

    Profile.create({ name, location })
    .then(profile => {
      res.send('New profile created')
    })
    .catch(err => {
      res.send('Profile creation failed')
    });

  })
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
      .catch(err => res.send('Error updating profile'))
    } else {
      res.send('Profile not found')
    }

  })
  .catch(err => console.log(err));

};

const deleteProfile = (req, res) => {
  let userId = req.body.userId;

  Profile.destroy({
    where: { userId }
  })
  .then(profile => {
    res.send('Profile successfully deleted');
  })
  .catch(err => {
    res.send('Profile deletion failed');
  })
};

export default {
  findProfile: findProfile,
  addProfile: addProfile,
  updateProfile: updateProfile,
  deleteProfile: deleteProfile
};

