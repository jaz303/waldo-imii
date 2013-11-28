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

// test('contains term', function(t) {

//     t.plan(0);

// });

// test('document frequency of term', function(t) {

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

