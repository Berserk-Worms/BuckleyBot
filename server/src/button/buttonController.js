import Profile from '../profile/profileModel';

const test = (req, res) => {
  console.log('this is a testttttt for the interactive button');

  Profile.find({
    where: { id: 1 }
  })
  .then(profile => {
    console.log(profile);
  })
}

export default { test };