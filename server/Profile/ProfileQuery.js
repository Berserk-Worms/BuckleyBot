import db from '../db/db-config';
import User from '../Users/ProfileModel';

let findProfile = (req, res) => {
  Profile.findOne({
    where: {
      //logic to find key value 
    }
  })
  .then(profile => {
    res.send(profile);
  })
  .catch(err => {
    console.log('Error: ', err)
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
      bio_name:
      bio_location:
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

export.module = {
  findProfile: findProfile,
  addProfile: addProfile,
  deleteProfile: deleteProfile
}

