import db from '../db/db-config';
import Sequelize from 'sequelize';
import User from './userModel';
import Tag from './tagModel';

let UserTag = db.define('user_tag', {
  slackUserId: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: 'slackUserId'
    }
  },
  tagId: {
    type: Sequelize.INTEGER,
    references: {
      model: Tag,
      key: 'id'
    }
  }
});

User.belongsToMany(Tag, { through: UserTag, foreignKey: 'slackUserId' });
Tag.belongsToMany(User, { through: UserTag });

export default UserTag
