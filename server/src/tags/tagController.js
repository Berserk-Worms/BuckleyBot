import Tag from './tagModel';
import request from 'request';

//Add Tags
const addTags = (req, res) => {
  let job = req.body.job;
  let tagsData = req.body.tagsData;

  //Loop through array of tags
  tagsData.forEach((tag) => {
    Tag.findOrCreate({ 
      where: { name: tag }
    })
      .spread((tag, created) => {
        if (created) {
          console.log('created new tag', tag.dataValues.name);
          // tag.addJob(job)
          res.end();
        } else {
          res.end();
          console.log('we already have the tag:', tag.dataValues.name);
        }
      })
  })
}

export default { addTags }
