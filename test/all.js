var test = require('tape');
var imii = require('../');

var docs = [
    "the cat sat on the mat",
    "why does the cat not stay where i put it",
    "vroom vroom vroom vroom vroom"
];

function createIndex() {
    var ix = imii();
    load(ix);
    return ix;
}

function load(index) {
    docs.forEach(function(str, docId) {
        index.postDocument(docId, str.split(' '));
    });
}

test('contains term', function(t) {

    var index = createIndex();

    t.plan(4);

    index.containsTerm('cat', function(v) { t.ok(v); });
    index.containsTerm('why', function(v) { t.ok(v); });
    index.containsTerm('vroom', function(v) { t.ok(v); });
    index.containsTerm('buster', function(v) { t.notOk(v); });

});

test('document frequency of term', function(t) {

    var index = createIndex();

    t.plan(4);

    index.documentFrequencyOfTerm('the', function(v) { t.ok(v === 2); });
    index.documentFrequencyOfTerm('cat', function(v) { t.ok(v === 2); });
    index.documentFrequencyOfTerm('vroom', function(v) { t.ok(v === 1); });
    index.documentFrequencyOfTerm('javascript', function(v) { t.ok(v === 0); });

});

// test('', function(t) {

//     t.plan(0);

// });

test('postings for term', function(t) {

    var index = createIndex();

    t.plan(4);

    index.postingsForTerm('the', function(postings) {
        t.deepEquals([0,1], postings);
    });

    index.postingsForTerm('cat', function(postings) {
        t.deepEquals([0,1], postings);
    });

    index.postingsForTerm('stay', function(postings) {
        t.deepEquals([1], postings);
    });

    index.postingsForTerm('foobar', function(postings) {
        t.deepEquals([], postings);
    });

});

