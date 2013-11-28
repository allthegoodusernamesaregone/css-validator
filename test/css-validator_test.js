var fs = require('fs');
var expect = require('chai').expect;
var nock = require('nock');
var validateCss = require('../');

function runValidateCss() {
  before(function (done) {
    var that = this;
    validateCss(this.css, function (err, data) {
      that.err = err;
      that.data = data;
      done();
    });
  });
}
function wait(ms) {
  before(function (done) {
    setTimeout(done, ms);
  });
}

if (process.env.FIXTURE_HTTP) {
  before(function () {
    this._invalidXml = nock('http://jigsaw.w3.org')
                        .post('/css-validator/validator')
                        .reply(200, fs.readFileSync(__dirname + '/test-files/invalid.xml', 'utf8'));
  });
  after(function () {
    this._invalidXml.done();
  });
}

describe('A valid CSS file', function () {
  before(function () {
    this.css = fs.readFileSync(__dirname + '/test-files/valid.css', 'utf8');
  });

  describe('when validated', function () {
    runValidateCss();

    it('has no errors', function () {
      expect(this.data.validity).to.equal(true);
      expect(this.data.errors).to.deep.equal([]);
      expect(this.data.warnings).to.deep.equal([]);
    });
  });
});

describe('A invalid CSS file', function () {
  before(function () {
    this.css = fs.readFileSync(__dirname + '/test-files/invalid.css', 'utf8');
  });

  describe('when validated', function () {
    // Wait a seconds for the w3c rate limiting
    wait(1000);
    runValidateCss();

    it('was not valid errors', function () {
      expect(this.data.validity).to.equal(false);
    });

    it('has an expected error', function () {
      var errors = this.data.errors;
      expect(errors.length).to.equal(1);
      expect(errors[0].message).to.contain('background-color');
    });

    it('has an expected warning', function () {
      var warnings = this.data.warnings;
      expect(warnings.length).to.equal(1);
      expect(warnings[0].message).to.contain('-moz-box-sizing');
    });
  });
});
