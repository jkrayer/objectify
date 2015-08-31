# objectify

[![Code Climate](https://codeclimate.com/github/jkrayer/objectify/badges/gpa.svg)](https://codeclimate.com/github/jkrayer/objectify)

Form data to javascript object

Returns form data as a javascript object using the input's name attribute for the key and the value attribute for the value.

Optionally takes an array of exclusions. These are the name attributes of inputs to exclude from the returned object.

`var obj = $('#form-id').objectify();`

`var obj = $('#form-id').objectify(['fieldOneName', 'fieldTwoName']);`
