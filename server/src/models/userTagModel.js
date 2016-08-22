import db from '../db/db-config';
import Sequelize from 'sequelize';
import User from './userModel';
import Tag from './tagModel';

let UserTag = db.define('user_tag', {
  userId: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: 'slackUserId'
    }
  },
  tagId: {
    type: Sequelize.STRING,
    references: {
      model: Tag,
      key: 'name'
    }
  }
});

export default UserTag
