import User from './UserModel';
// import bcryt from 'bcryt-nodejs';

//some logic to query slack for slack_id and team_id
//need to register app to receive client id and client secret
let generateInfo = (token) => {

}

//we have a database of users based on slack bot interaction
//we should be able to find, addUser, deleteUser
const findUser = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
      slack_id: req.body.slack_id
    }
  })
  .then(user => {
    res.json(user);
  })
  .catch(err => {
    console.log('Error: ', err);
    done(err);
  });
};

//Adduser if not created, otherwise will return user info
const addUser = (req, res) => {
  User.count({
    where: {
      username: req.body.username
    }
  })
  //find if user is currently in database, 
  .then(count => {
    //if in database, throw err
    if (count !== 0) {
      console.log('User already exists');
      res.end()
    } else {
      User.create({
        username: req.body.username,
        access_token: req.body.token,
        slack_id: '1111', /*some slack_id queried using slack token*/
        team_id: '2222' /*some team_id queried using slack token*/
      })
      .then(user => {
        console.log('Created new user!');
        res.end();
      })
      .catch(err => {
        console.log('Error creating user...');
        done(err)
      }) 
    }   
    //else create user
    //when a new user is added, need to generate a hash
  })
  .catch(err => {
    console.log('Error: ', err);
    done(err);
  })
    //else create the user
}

const deleteUser = (req, res) => {
  User.destroy({
    where: {
      username: req.body.username,
      slack_id: req.body.slack_id
    }
  })
  .then(user => {
    console.log('deleted user: ', user);
    res.end()
  })
  .catch(err => {
    console.log('Error: ', err);
    done(err);
  })
}


export default {
  findUser: findUser,
  addUser: addUser,
  deleteUser: deleteUser
};
