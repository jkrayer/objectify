/**
 * Form data into javascript object
 * @author Jim Krayer <jameskrayer@yahoo.com>
 * @version 0.1.1
 * @param  {object} $form      jQuery form object
 * @param  {array}  exclusions a list of field to exclude in the return, must
 *                             match field name attribute
 * @param  {object} sanitize   object of sanitize functions to run, must match
 *                             field name attribute
 * @return {object}            object of form data
function objectify (form, exclusions, sanitize) {
  var formInputs= [];
  var inputTags = /^(?:input|select|textarea|keygen)/i;
  var obj = {};
  var key;
  var name;
  var value;

  if (typeof form !== 'object' && form.nodeName === undefined && form.nodeName !== 'FORM') {
    console.error('A form element was not passed as the first argument of objectify.');
    return false;
  }

  exclusions = exclusions || [];
  sanitize = sanitize || false;

  (function getAllInputs (object) {
    var key;
    for (key in object) {
      if (!object.hasOwnProperty(key)) { continue; }
      if (object[key].nodeType !== 1) { continue; } //skip non-element nodes
      if (inputTags.test(object[key].nodeName)) {
        formInputs.push(object[key]);
        continue;
      }
      if (object[key].childNodes && !!object[key].childNodes.length) {
        getAllInputs(object[key].childNodes);
      }
    }
  })(form.childNodes);

  //exclude
  formInputs = formInputs.filter(function(input) {
    var type = input.type;
    var name = input.name;
    return name
      && !input.disabled
      && inputTags.test(input.nodeName)
      && !/^(?:submit|button|image|reset|file)$/i.test(type)
      && (input.checked || !/^(?:checkbox|radio)$/i.test(type))
      && exclusions.indexOf(name) === -1
  });

  //sanitize
  for (key in formInputs) {
    if (!object.hasOwnProperty(key)) { continue; }
    name = formInputs[key].name;
    value = formInputs[key].value;
    obj[name] = (sanitize && sanitize.hasOwnProperty(name)) ? sanitize[name](value) : value;
  }

  return obj;
}

if (typeof module === 'object' && typeof exports === 'object') {
  module.exports = objectify;
}
*/




/**
 * Turn form into javascript object
 * @param  {object} form dom element
 * @return {object}      javascript object
 */










(function objectify(window) {

  function Objectify(form, exclusions, sanitize) {
    this.form = form;
    this.exclusions = exclusions;
    this.sanitize = sanitize;
    this.obj = {};
    this.currentElement;

    return this.getValues();
  }

  // Needed to handle below types that are not currently addressed
  //Objectify.prototype.multiSelects = ['checkbox', 'radio', 'select-multiple'];

  Objectify.prototype.getValues = function getValues() {
    var elements = this.form.elements;

    for (var i = 0; i < elements.length; i++) {
      this.currentElement = elements[i];

      if (this.exclusions.indexOf(this.currentElement.name) === -1 ) {
        continue;
      }

      switch(this.currentElement.tagName) {
        case 'BUTTON':
          continue;
          break;
        case 'INPUT':
          switch(this.currentElement.type) {
            case 'button':
            case 'submit':
            case 'reset':
              continue;
              break;
            case 'checkbox':
            case 'radio':
              this.setCheckValues();
              break;
            default:
              this.setValue();
              break;
          }
          break;
        default:
          this.setValue();
          break;
      }
    }
    return this.obj;
  };

  Objectify.prototype.setValue = function setValue() {
    if (!this.obj.hasOwnProperty(this.currentElement.name)) {
      this.obj[this.currentElement.name] = this.getSanitizedValue();
    }
    console.warn('Duplicate name attribute (' + this.currentElement.name + ') found in form. Value not saved.');
  };

  Objectify.prototype.setCheckValues = function setCheckValues() {
    if (this.currentElement.checked) {
      if (this.obj.hasOwnProperty(this.currentElement.name)) {
        this.obj[this.currentElement.name].push(this.getSanitizedValue());
      }
      this.obj[this.currentElement.name] = this.currentElement.type === 'radio' ? this.getSanitizedValue()
                                                                                : [this.getSanitizedValue()];
    }
  };

  Objectify.prototype.getSanitizedValue = function getSanitizedValue() {
    var name = this.currentElement.name;
    if (typeof this.sanitize[name] === 'function') {
      return this.sanitize[name](this.currentElement.value);
    }
    return this.currentElement.value;
  };

  function objectify(form, exclusions, sanitize) {
    if (typeof form !== 'object' && form.nodeName === undefined && form.nodeName !== 'FORM') {
      console.error('A form element was not passed as the first argument of objectify.');
      return false;
    }

    exclusions = exclusions || [];
    sanitize = sanitize || {};

    return new Objectify(form, exclusions, sanitize);
  }

  return window.objectify = objectify;

}(window));
