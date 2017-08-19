var Transform = require('readable-stream/transform');
var fs = require('fs');
var transformHtml = require('transform-html');

module.exports = function (cssx) {
	cssx = fs.readFileSync(cssx, { encoding: 'utf8' });
	return new Transform({
		objectMode: true,
		transform: function (file, encoding, callback) {
			file.contents = new Buffer(transformHtml(cssx)(file.contents.toString()));
			callback(null, file);
		}
	});
};
