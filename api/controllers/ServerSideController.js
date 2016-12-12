/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// Get the HTML layout
var fs = require('fs')
var path = require('path')
// Define global Vue for server-side app.js
global.Vue = require('vue')

module.exports = {

  main: function(req, res) {

    var layout = fs.readFileSync('./views/main.html', 'utf8')
    // Create a renderer
    var renderer = require('vue-server-renderer').createRenderer()

    // Render our Vue app to a string
    renderer.renderToString(
      // Create an app instance
      require('../../assets/js/app')(),
      // Handle the rendered result
      function (error, html) {
        // If an error occurred while rendering...
        if (error) {
          // Log the error in the console
          console.error(error)
          // Tell the client something went wrong
          return res
            .status(500)
            .send('Server Error')
        }
        // Send the layout with the rendered app's HTML
        res.send(layout.replace('<div id="app"></div>', html))
      }
    )

  }

};
