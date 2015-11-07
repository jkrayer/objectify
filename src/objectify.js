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
function objectify ($form, exclusions, sanitize) {
  var formData = $form.serializeArray();
  var obj = {};
  var key;
  var name;

  exclusions = exclusions || [];
  sanitize = sanitize || false;

  for (key in formData) {
    name = formData[key].name;
    if (exclusions.indexOf(name) > -1) {
      continue;
    }
    if (sanitize && sanitize.hasOwnProperty(name)) {
      obj[name] = sanitize[name](formData[key].value);
      continue;
    }
    obj[name] = formData[key].value;
  }
  return obj;
}
