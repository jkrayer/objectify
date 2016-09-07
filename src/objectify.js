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
    if (!this.obj.hasOwnProperty(this.currentElement.name)) {
      return this.obj[this.currentElement.name] = this.getSanitizedValue();
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

  Objectify.prototype.setMultipleValues = function setMultipleValues() {
    var name = this.currentElement.name;
    if (!this.obj.hasOwnProperty(name)) {
      this.obj[name] = [];
      for(var i = 0; i < this.currentElement.options.length; i++) {
        if (this.currentElement.options[i].selected) {
          this.currentElement = this.currentElement.options[i];
          this.obj[name].push(this.getSanitizedValue());
        }
      }
      return;
    }
    console.warn('Duplicate name attribute (' + this.currentElement.name + ') found in form. Value not saved.');
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
