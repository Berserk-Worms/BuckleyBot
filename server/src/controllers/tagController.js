import Tag from '../models/tagModel';
import request from 'request';

//Add Tags
const addTag = (req, res) => {
  let tagData = req.body.tagData;
  let jobData = null;

  //check to see if we have valid data
  if (typeof tagData === 'string') {
    Tag.findOrCreate({ 
      where: { name: tagData }
    })
    .spread((tag, created) => {
      created ? res.status(201).send(tag) : res.status(200).send(tag);
    })
    .catch((err) => {
      console.log('Error creating tag:', err);
    });

  } else {
    res.status(500).send('Tag data is incorrect');
  }
  //Loop through array of tags
}

export default { addTag }
