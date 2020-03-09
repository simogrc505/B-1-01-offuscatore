const Product = require('../../../src/models/user-data')

exports.seed = function () {
  // Deletes ALL existing entries
  return Product.deleteMany()
    .then(function () {
      // Inserts seed entries
      return Product.create([
        {
          '_id': '1',
          'firstname': 'Simona',
          'lastname': 'Greco',
          'date_of_birth': '',
          'email': 'simo.greco@corley.it',
          'number': '+393401212112',
          'avatar_url': 'https://via.placeholder.com/150x150.png?text=SG',
        },
        {
          '_id': '2',
          'firstname': 'Giulia',
          'lastname': 'Basso',
          'date_of_birth': '',
          'email': 'giulia.basso@¢orley.it',
          'number': '+395322243112',
          'avatar_url': 'https://via.placeholder.com/150x150.png?text=GB',
        },
        {
          '_id': '3',
          'firstname': 'Gregorio',
          'lastname': 'Dotti',
          'date_of_birth': '',
          'email': 'gregorio.dotti@corley.it',
          'number': '+391234567889',
          'avatar_url': 'https://via.placeholder.com/150x150.png?text=GD',
        },
      ])
    })
}
