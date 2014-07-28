/**
 * @project ircbouncer
 * IRC Bouncer
 * @file bouncer.js
 * Primary application driver
 * @author curtis zimmerman
 * @contact software@curtisz.com
 * @license GPLv2
 * @version 0.0.1a
 */

/**
 * @cite http://http://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-nodejs
 */
module.exports = exports = __bouncer = (function() {
	/**
	 * @cite http://www.nczonline.net/blog/2012/03/13/its-time-to-start-using-javascript-strict-mode/
	 */
	"use strict";

	var fs = require('fs');
	var http = require('http');
	var net = require('net');
	var url = require('url');

	var __data = {
		server: {
			ports: {
				http: {
					listen: 4488
				},
				irc: {
					listen: 6667,
					connect: 0
				}
			},
			state: {
				debug: false,
				environments: ['dev','prod']
			},
			stats: {
				messages: {
					received: 0,
					sent: 0
				},
				timestamps: {
					last: 0,
					up: 0
				}
			}
		}
	};
})();