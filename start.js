require ('babel-polyfill');
require('babel-register')({
    {
        "presets": ["env"]
      }
})



// Import the rest of our application.
module.exports = require("./server");
module.exports=require("./src/blockchain");