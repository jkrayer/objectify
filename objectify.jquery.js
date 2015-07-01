/**
 * Form data into javascript object
 * @author Jim Krayer <jameskrayer@yahoo.com>
 * @version 0.0.1
 * @internal review jQuery .serializeArray() and optimize
 */
;(function ($) {

  'use strict';

  $.fn.extend({
    objectify: function (exclusions) {
      var formData = $(this).serializeArray();
      var obj = {};
      var key;

      exclusions = exclusions || [];

      for (key in formData) {
        if (exclusions.indexOf(formData[key].name) > -1) { continue; }
        obj[formData[key].name] = formData[key].value;
      }

      return obj;
    }
  });
}(jQuery));
