import { connection } from '../bot.js';
import Tag from '../models/tagModel';
import rp from 'request-promise';

const server = 'http://localhost:8080';

const helper =  {
  updateUser: (response) => {
    let slackUserId = response.user;
    let location = response.text;
    let usersData = { 
      url: `${server}/api/users/location`,
      method: 'PUT',
      json: { slackUserId, location } 
    }
    
    rp(usersData)
      .catch(err => console.log(err))

  },
  findTags: (message) => {
    //given a string of text, split the string by spaces
    //loop through the array and check if the tag exists
    //for now we will not consider new tags that the users 
    //want to add 

    //with splitting, how would be handle .js
    let words = message.text.split(/[\\.,\\ !;?:]/);
    let match;

    return rp({
      url: `${server}/api/tags`,
      json: true
    })
    .then(tags => {
      match = tags.filter((tag) => {
        return words.indexOf(tag.name) !== -1;
      });
      console.log('this is match, ', match);
      return match.length > 0 ? match : tags;
    })
    .catch(err => {
      console.log('Error: ', err);
    });

  }
};

export default helper;