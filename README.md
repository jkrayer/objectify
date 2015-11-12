# objectify

[![Code Climate](https://codeclimate.com/github/jkrayer/objectify/badges/gpa.svg)](https://codeclimate.com/github/jkrayer/objectify)

Returns form data as a javascript object using the input's name attribute for the key and the value attribute for the value.

## $.objectify

`.objectify(exclusions);` version added: 0.0.1

**exclusions**

Type: Array

An array of element name attributes to be excluded from the returned object.

`.objectify(exclusions, sanitize);` version added 0.1.1

**exclusions**

Type: Array

An array of element name attributes to be excluded from the returned object.

**sanitize**

Type: Object

An object of functions matching one or more element name attributes. Functions take the input value as an attribute and should return modified data. This will be the value for that field in the returned object.

## window.objectify

Objectify without the jQuery dependency.

`objectify (form, exclusions, sanitize);` version added 0.1.1

**form**

Type: Object

The form element from which fields should be retrieved.

**exclusions**

Type: Array

An array of element name attributes to be excluded from the returned object.

**sanitize**

Type: Object

An object of functions matching one or more element name attributes. Functions take the input value as an attribute and should return modified data. This will be the value for that field in the returned object.
