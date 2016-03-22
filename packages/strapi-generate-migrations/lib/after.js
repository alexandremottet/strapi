'use strict';

/**
 * Module dependencies
 */

// Node.js core.
const fs = require('fs');
const path = require('path');

// Public node modules.
const beautify = require('js-beautify').js_beautify;

/**
 * Runs after this generator has finished
 *
 * @param {Object} scope
 * @param {Function} cb
 */

module.exports = function afterGenerate(scope, cb) {
  const migrationFile = path.resolve(scope.rootPath, 'data', 'migrations', scope.connection, scope.filename);

  // Read the migration file.
  fs.readFile(migrationFile, 'utf8', function (err, data) {
    if (err) {
      return cb.invalid(err);
    }

    // And rewrite it with the beautify node module.
    fs.writeFile(migrationFile, beautify(data, {
      indent_size: 2,
      keep_function_indentation: true,
      space_before_conditional: true,
      end_with_newline: true
    }), 'utf8', function (err) {
      if (err) {
        return cb.invalid(err);
      } else {
        return cb.success();
      }
    });
  });
};