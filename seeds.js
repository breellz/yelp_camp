const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment')

const data = [
  {
    name: 'Electric Symphony',
    image: 'https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit
    Sed porro maiores incidunt fugit dolores minus cupiditate fuga rem cumque corporis culpa quam deserunt labore aliquid beatae,
    tempore officia nulla consequatur doloremque ipsa qui? Illum fuga voluptatum itaque animi modi obcaecati aut porro autem minus enim consequatur repellat et quos harum,
    eaque, sit odit ab? Perspiciatis magnam officia eveniet molestiae aspernatur facere ipsum minus laboriosam doloribus harum molestias similique veritatis corrupti facilis 
    tenetur, ducimus expedita minima distinctio itaque pariatur modi error nihil. 
    Iure quas harum beatae cum quam aliquam unde corrupti veniam quia reiciendis?
    Ab, animi expedita ullam quo quibusdam soluta.`
  }, {
    name: ' Psychidelic Enim',
    image: 'https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Sed porro maiores incidunt fugit dolores minus cupiditate fuga rem cumque corporis culpa quam deserunt labore aliquid beatae,
    tempore officia nulla consequatur doloremque ipsa qui? Illum fuga voluptatum itaque animi modi obcaecati aut porro autem minus enim consequatur repellat et quos harum,
    eaque, sit odit ab? Perspiciatis magnam officia eveniet molestiae aspernatur facere ipsum minus laboriosam doloribus harum molestias similique veritatis corrupti facilis 
    tenetur, ducimus expedita minima distinctio itaque pariatur modi error nihil. 
    Iure quas harum beatae cum quam aliquam unde corrupti veniam quia reiciendis?
     Ab, animi expedita ullam quo quibusdam soluta.`
  }, {
    name: 'Bilateral Cosmos',
    image: 'https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Sed porro maiores incidunt fugit dolores minus cupiditate fuga rem cumque corporis culpa quam deserunt labore aliquid beatae,
    tempore officia nulla consequatur doloremque ipsa qui? Illum fuga voluptatum itaque animi modi obcaecati aut porro autem minus enim consequatur repellat et quos harum,
    eaque, sit odit ab? Perspiciatis magnam officia eveniet molestiae aspernatur facere ipsum minus laboriosam doloribus harum molestias similique veritatis corrupti facilis 
    tenetur, ducimus expedita minima distinctio itaque pariatur modi error nihil. 
    Iure quas harum beatae cum quam aliquam unde corrupti veniam quia reiciendis?
     Ab, animi expedita ullam quo quibusdam soluta.`
  }
]

const seedDB = () => {
  //Remove all data
  Campground.remove({}, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Database clean')
      // add data
      data.forEach((seed) => {
        Campground.create(seed, (err, campground) => {
          if (err) {
            consolee.log(err)
          } else {
            // console.log('campground added')
            // console.log('=============')
            // console.log(campground)
            Comment.create({
              text: 'This place is great,I only wish there was water',
              author: 'Breellz'
            }, (err, comment) => {
              if (err) {
                console.log(err)
              } else {
                campground.comments.push(comment)
                campground.save()
                console.log('created a new comment')
              }
            })
          }
        })
      })
    }
  });
};

module.exports = seedDB