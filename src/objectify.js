(function objectify(window) {

  function Objectify(form, exclusions, sanitize) {
    this.form = form;
    this.exclusions = exclusions;
    this.sanitize = sanitize;
    this.obj = {};
    this.currentElement;
    return this.getValues();
  }

  Objectify.prototype.getValues = function getValues() {
    var elements = this.form.elements;
    var count = elements.length;
    var i = 0;
    for (i; i < count; i++) {
      this.currentElement = elements[i];
      if (this.exclusions.indexOf(this.currentElement.name) > -1 ) {
        continue;
      }
      switch(this.currentElement.tagName) {
        case 'BUTTON':
        case 'FIELDSET':
          continue;
        case 'INPUT':
          switch(this.currentElement.type) {
            case 'button':
            case 'submit':
            case 'reset':
              continue;
            case 'checkbox':
            case 'radio':
              this.setCheckValues();
              break;
            default:
              this.setValue();
              break;
          }
          break;
        case 'SELECT':
          switch (this.currentElement.type) {
            case 'select-multiple':
              this.setMultipleValues();
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
    if (!this.hasKey()) {
      this.obj[this.currentElement.name] = this.getSanitizedValue();
    }
  };

  Objectify.prototype.setCheckValues = function setCheckValues() {
    if (this.currentElement.checked) {
      if (this.obj.hasOwnProperty(this.currentElement.name)) {
        return this.obj[this.currentElement.name].push(this.getSanitizedValue());
      }
      this.obj[this.currentElement.name] = this.currentElement.type === 'radio' ? this.getSanitizedValue()
                                                                                : [this.getSanitizedValue()];
    }
  };

  Objectify.prototype.setMultipleValues = function setMultipleValues() {
    var select = this.currentElement;
    var count = this.currentElement.options.length;
    var name = '';
    var i = 0
    if (!this.hasKey()) {
      name = this.currentElement.name;
      this.obj[name] = [];
      for(i; i < count; i++) {
        this.currentElement = select.options[i];
        if (this.currentElement.selected) {
          this.obj[name].push(this.getSanitizedValue());
        }
      }
    }
  };

  Objectify.prototype.getSanitizedValue = function getSanitizedValue() {
    var name = this.currentElement.name;
    if (typeof this.sanitize[name] === 'function') {
      return this.sanitize[name](this.currentElement.value);
    }
    return this.currentElement.value;
  };

  Objectify.prototype.hasKey = function hasKey() {
    if (this.obj.hasOwnProperty(this.currentElement.name)) {
      console.warn('Duplicate name attribute (' + this.currentElement.name + ') found in form. Value not saved.');
      return true;
    }
    return false;
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
