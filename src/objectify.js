/**
 * Form data into javascript object
 * @author Jim Krayer <jameskrayer@yahoo.com>
 * @version 0.1.0
 * @param  {object} $form      jQuery form object
 * @param  {array}  exclusions a list of field to exclude in the return, must
 *                             match field name attribute
 * @param  {object} sanitize   object of sanitize functions to run, must match
 *                             field name attribute
 * @return {object}            object of form data
 */
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
    name = formInputs[key].name;
    value = formInputs[key].value;
    obj[name] = (sanitize && sanitize.hasOwnProperty(name)) ? sanitize[name](value) : value;
  }

  return obj;
}
