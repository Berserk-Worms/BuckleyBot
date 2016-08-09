import db from '../db/db-config';
import User from '../Users/ProfileModel';

let findProfile = (req, res) => {
  Profile.findOne({
    where: {
      //logic to find key value 
    }
  })
  .then(profile => {
    res.json(profile);
  })
  .catch(err => {
    console.log('Error: ', err)
    done(err);
  });
};

let addProfile = (req, res) => {
  Profile.count({
    where: {
      //logic to find key value 
    }
  })
  .then(count => {
    if (count !== 0) {
      console.log('Profile already exists.');
      res.end();
    }
    //else create profile
    Profile.create({
      bio_name: req.body.bio_name,
      bio_location: req.body_bio_location
    })
    .then(profile => {
      console.log('Created new profile!');
      res.end();
    })
  })
};

let deleteProfile = (req, res) => {
  User.destroy({
    where: {
      //logic to find key value 
    }
  })
  .then(profile => {
    console.log('deleted profile: ', profile);
    res.end();
  })
  .catch(err => {
    console.log('Error: ', err);
    done(err);
  })
};

export default {
  findProfile: findProfile,
  addProfile: addProfile,
  deleteProfile: deleteProfile
};

