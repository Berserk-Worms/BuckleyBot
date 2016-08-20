import Tag from '../models/tagModel';

// Triggered from '/api/tags'
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

export default { addTag }
