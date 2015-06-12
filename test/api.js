'use strict';

var standard = require('../index.js');
var test = require('tape');

test('api usage', function t(assert) {
    standard.lintFiles([], {
        cwd: 'bin'
    }, function onFiles(err, result) {
        assert.error(err, 'no error while linting');
        assert.equal(typeof result, 'object', 'result is an object');
        assert.equal(result.errorCount, 166, 'error count 166');

        assert.end();
    });
});

test('no-try-catch', function t(assert) {
    standard.lintText(
        '\'use strict\';\n' +
        'try {\n' +
        '    var foo = 1 / 0;\n' +
        '    throw foo;\n' +
        '} catch (e) {\n' +
        '    throw e;\n' +
        '}\n',
        onLint
    );

    function onLint(err, results) {
        assert.ifError(err);

        assert.equal(results.errorCount, 1);
        var messages = results.results[0].messages;
        assert.equal(messages[0].ruleId, 'no-try-catch');

        assert.end();
    }
});

test('no-function-bind', function t(assert) {
    standard.lintText(
        '\'use strict\';\n' +
        'function foo() {}\n' +
        '\n' +
        'foo.bind({});\n',
        onLint
    );

    function onLint(err, results) {
        assert.ifError(err);

        assert.equal(results.errorCount, 1);
        var messages = results.results[0].messages;
        assert.equal(messages[0].ruleId, 'no-function-bind');

        assert.end();
    }
});
