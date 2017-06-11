var Product = require('../models/product'); 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shoppingcart');

var products = [
    new Product({
        imagePath:'http://www.fightersgeneration.com/characters4/yamazaki-cv1-2.jpg',
        title:'Yamasacre',
        description:'Orochi blood',
        price:666
    }),
        new Product({
        imagePath:'http://www.fightersgeneration.com/np6/char/nw/bluemary-nw.jpg',
        title:'Blue Mary',
        description:'Police',
        price:328
    }),
    new Product({
        imagePath:'http://www.fightersgeneration.com/np6/char/billykanewild.png',
        title:'Billy Kane',
        description:'Gangster',
        price:422
    }),    
    new Product({
        imagePath:'http://www.fightersgeneration.com/characters2/mai-sexypose.jpg',
        title:'Mai Shiranui',
        description:'Hottie Fighter',
        price:123
    }),
    new Product({
        imagePath:'http://www.fightersgeneration.com/nx3/char/terrybogard-neogeo-20th.jpg',
        title:'Terry Bogard',
        description:'Fighter and want a revenge',
        price:772
    }),
    new Product({
        imagePath:'http://www.fightersgeneration.com/characters/bison-cfe.jpg',
        title:'M. Bison',
        description:'Dictador',
        price:666
    }),
new Product({
        imagePath:'http://www.fightersgeneration.com/nz7/game/kof14/portraits/iori-yagami-kof14-portrait.png',
        title:'Iori Iagami',
        description:'Fighter of fire',
        price:377
    })
    
];



// var p = new Promise(function(resolve,reject){

// });


var count = 0 ;


for(var i=0; i< products.length; i++){
    products[i].save();
}

//mongoose.disconnect();