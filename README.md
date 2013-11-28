An in-memory inverted index for experimenting with information retrieval techniques.

## Usage

Install:

    $ npm install waldo-imii

Create:

    var imii = require('waldo-imii');
    var myIndex = imii();

## API

### `imii(options)`

Keys:

  * `compareDocument`: function that compares 2 documents and returns -VE/0/+VE values.

### `index.postDocument(doc, terms, cb)`

### `index.postDocumentUnsorted(doc, terms, cb)`

Use this method when you're unable to present documents to the index in sorted order. Much slower.

### `index.postTerm(doc, terms, cb)`

### `index.postTermUnsorted(doc, terms, cb)`

Use this method when you're unable to present documents to the index in sorted order. Much slower.

### `index.documentFrequencyOfTerm(term, cb)`

### `index.postingsForTerm(term, cb)`