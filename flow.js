var dbUrl = process.env.COUCH_URL || 'http://jackruss-149297.use1.nitrousbox.com:5984';

var EventEmitter = require('events').EventEmitter, ee;
ee = module.exports = (ee = global.ee) != null ? ee : new EventEmitter();

var pouchdb = require('pouchdb');
var stream = pouchdb(dbUrl + '/audits');

stream.changes({
  include_docs: true,
  since: 'now',
  live: true
}).on('change', function(change) {
  if (!change.doc.object) return; 
  if (!change.doc.object.type) return;
  var key = [change.doc.object.type, change.doc.verb].join(':'); 
  ee.emit(key, change.doc);

});

// always create new event on stream
ee.on('post', function(p) {
  stream.post(p);
});