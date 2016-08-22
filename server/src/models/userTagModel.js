import db from '../db/db-config';
import Sequelize from 'sequelize';
import User from './userModel';
import Tag from './tagModel';

let UserTag = db.define('user_tag', {});

User.belongsToMany(Tag, { through: UserTag });
Tag.belongsToMany(User, { through: UserTag });

export default UserTag
