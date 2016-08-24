import Tag from '../models/tagModel';
import Job from '../models/jobModel';

// Triggered from 'GET /api/tags'
const findAllTags = (req, res) => {

  //Return all tags
  //Include associated jobs that have been added in the last 24 hours
  Tag.findAll({ 
    include: [{
      model: Job,
      where: { 
        createdAt: {
          $gt: new Date(new Date() - 24 * 60 * 60 * 1000)
        }
      }
    }]
  })
  .then(tags => res.send(tags))
  .catch(err => res.send('No tags were found', err));

}

// Triggered from 'POST /api/tags'
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
      res.status(500).send('Error creating tag:', err);
    });

  } else {
    res.status(500).send('Tag data is incorrect');
  }
}

export default { findAllTags, addTag }
