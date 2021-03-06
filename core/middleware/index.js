/*
 * NodeJS module, included automatically from SourceJS app.js
 * ExpressJS middleware http://expressjs.com
 * */

var deepExtend = require('deep-extend');
var slm = require('slm');
var path = require('path');

// Module configuration
var globalConfig = global.opts.plugins && global.opts.plugins.pluginName ? global.opts.plugins.pluginName : {};
var config = {
    enabled: true,

    // Public object is exposed to Front-end via options API.
    public: {}
};

// Overwriting base options
deepExtend(config, globalConfig);

/*
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - The callback function
 * */
var processRequest = function (req, res, next) {
    if (!config.enabled) {
        next();
        return;
    }

    // Check if request is targeting Spec
    if (req.specData && req.specData.renderedHtml) {
        // Process req data
       if (req.specData.isSlm) {
            var html = req.specData.renderedHtml;

            /* render slim markup */
            html = slm.render(html, {
                filename: path.join(global.app.get('user'), req.path)
            });

            req.specData.renderedHtml = html;
        }
    }
    next();
};

exports.process = processRequest;
