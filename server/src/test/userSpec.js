// import { expect } from 'chai';
// import db from '../db/db-config';
// import Team from '../models/teamModel';
// // import User from '../models/userModel';


// const server = 'http://localhost:8080';

// describe('userController', () => {

//   before((done) => {
//     Team.create({
//       slackTeamToken: 'testtest',
//       slackTeamName: 'Worms',
//       slackTeamId: 'TEAMID',
//       slackBotId: 'BOTID',
//       slackBotToken: 'testtest' 
//     });

//     done();
//   })

//   after((done) => {
//     db.sync({force: true})
//     .then(() => {
//       done();
//     })
//     .catch(function(err) {
//       done(err);
//     });
//   });

//   describe('User Creation', () => {


//     it('expect 1 to equal 1', () => expect(1).to.equal(1))

//     it('expects 201 on successful job creation', () => {
//       let userData = {
//         users: [
//           {
//             name: 'Tester',
//             email: 'tester@test.com',
//             photo: 'http://placehold.it/150x150',
//             slackUserId: 'USERID',
//             slackTeamId: 'TEAMID'
//           },
//           {
//             name: 'Tester2',
//             email: 'tester2@test.com',
//             photo: 'http://placehold.it/150x150',
//             slackUserId: 'USERID2',
//             slackTeamId: 'TEAMID'
//           }
//         ]
//       };

      
//       // request(server)
//       //   .post('/slack/users')
//       //   .send(userData)
//       //   .expect(201)
//       //   .end(function(err, res) {
//       //     err ? done(err) : done();
//       //   });

//     })

//    })



// })
