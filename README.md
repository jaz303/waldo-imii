An in-memory inverted index for experimenting with information retrieval techniques.

## Usage

Install:

    $ npm install waldo-imii

Create:

    var imii = require('waldo-imii');
    var myIndex = imii();

## API

#### `var index = imii(options)`

Keys:

  * `compareDocument`: function that compares 2 documents and returns -VE/0/+VE values. Defaults to a numeric comparison.

#### `index.postDocument(doc, terms, cb)`

Add document `doc` containing array of `terms` to the index, calling `cb` when the operation is complete.

#### `index.postDocumentUnsorted(doc, terms, cb)`

Same as above, but use this method when you're unable to present documents to the index in sorted order. Much slower.

#### `index.postTerm(doc, term, cb)`

Add a single `term` of document `doc` to the index, calling `cb` when the operation is complete.

#### `index.postTermUnsorted(doc, term, cb)`

Same as above, but use this method when you're unable to present documents to the index in sorted order. Much slower.

#### `index.documentFrequencyOfTerm(term, cb)`

Calculate the document fequency of `term` and send it asynchronously to `cb`.

#### `index.postingsForTerm(term, cb)`

Retrieving the postings of `term` and send them asynchronously to `cb`.