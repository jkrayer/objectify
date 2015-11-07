/**
 * Form data into javascript object
 * @author Jim Krayer <jameskrayer@yahoo.com>
 * @version 0.0.2
 */
;(function ($) {

  var pluginName = "objectify",
      defaults = {
        exclusions: [],
        sanitizations: false
      };

  $.fn.extend({
    objectify: function (exclusions, sanitize) {
      var formData = $(this).serializeArray();
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
  });
}(jQuery));
