import User from 'UserModel';
import bcryt from 'bcryt-nodejs';

//some logic to query slack for slack_id and team_id
//need to register app to receive client id and client secret
let generateInfo = (token) => {

}

//we have a database of users based on slack bot interaction
//we should be able to find, addUser, deleteUser
let findUser = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
      slack_id: req.body.slack_id
    }
  })
  .then(user => {
    res.send(user);
  })
  .catch(err => {
    console.log('Error: ', err);
    done(err);
  });
};

//Adduser if not created, otherwise will return user info
let addUser = (req, res) => {
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
    }
    //else create user
    //when a new user is added, need to generate a hash
    User.create({
      username: req.body.username,
      access_token: SLACK_TOKEN,
      slack_id: /*some slack_id queried using slack token*/,
      team_id: /*some team_id queried using slack token*/
    })
    .then(user => {
      console.log('Created new user!');
      res.end();
    })
  })
  .catch(err => {
    console.log('Error: ', err);
    done(err);
  })
    //else create the user
}

let deleteUser = (req, res) => {
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


export.module = {
  findUser: findUser,
  addUser: addUser,
  deleteUser: deleteUser
}
