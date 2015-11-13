var mocha = require('mocha');
var assert = require('assert');
var objectify = require('../src/objectify');

var html = [
  '<html>',
  '<body>',
  '  <form id="theform">',
  '    <input type="text" value="a dummy value" />',
  '    <input type="text" name="firstName" value="Jim" disabled />',
  '    <input type="text" name="lasttName" value="Krayer" />',
  '    <button type="submit" name="submit-button">Submit</button>',
  '  <form>',
  '</body>',
  '</html>'
].join('');

var testForm = require('./testdom')(html);
  //describe('Returns expected elements', function() {
  //var result = objectify(global.document.getElementById('theform'));
  //  it('Return an object with no properties', function() {
  //    assert.equal(, true);
  //  });
});
