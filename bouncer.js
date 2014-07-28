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
		cache: {
			settings: {
				cleanupInterval: 1
			}
		},
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

	var _log = (function() {
		var _con = function( data, type ) {
			var pre = ['[i] DEBUG: ','[!] ERROR: ','[+] '];
			console.log(pre[type]+data);
		};
		var _dbg = function( data ) {
			if (__data.state.debug) _con(data, 0);
		};
		var _err = function( data ) {
			_con(data, 1);
		};
		var _log = function( data ) {
			_con(data, 2);
		};
		return {
			dbg: _dbg,
			err: _err,
			log: _log
		}
	})();

	var _pubsub = (function() {
		var _cache = {};
		var _flush = function() {
			cache = {};
		};
		var _pub = function( topic, args, scope ) {
			if (cache[topic]) {
				var currentTopic = cache[topic],
					topicLength = currentTopic.length;
				for (var i=0; i<topicLength; i++) {
					currentTopic[i].apply(scope || this, args || []);
				}
			}
		};
		var _sub = function( topic, callback ) {
			if (!cache[topic]) {
				cache[topic] = [];
			}
			cache[topic].push(callback);
			return [topic, callback];
		};
		var _unsub = function( handle, total ) {
			var topic = handle[0],
				cacheLength = cache[topic].length;
			if (cache[topic]) {
				for (var i=0; i<cacheLength; i++) {
					if (cache[topic][i] === handle) {
						cache[topic].splice(cache[topic][i], 1);
						if (total) {
							delete cache[topic];
						}
					}
				}
			}
		};
		return {
			flush: _flush,
			pub: _pub,
			sub: _sub,
			unsub: _unsub
		}
	})();

	var init = (function() {
		_log.log('initializing bouncer...');
		// bootstrap the bouncer
		__data.server.stats.timestamps.up = Math.round(new Date().getTime()/1000);
		setTimeout(function() {

		}, __data.cache.settings.cleanupInterval*1000);
		_log.log('initialization complete!');
	})();

	var clientIRC = (function() {
		// handle outbound IRC connection (e.g. connection to freenode)
	})();

	var serverHTTP = (function() {
		// handle inbound HTTP stat requests
	})();

	var serverIRC = (function() {
		// handle inbound IRC connection
	})();
})();