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

  function Plugin (element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var formData = $(this.element).serializeArray();
      var obj = {};
      var key;
      var name;

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
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };

}(jQuery));
