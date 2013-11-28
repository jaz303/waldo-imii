An in-memory inverted index for experimenting with information retrieval techniques.

## Usage

Install:

    $ npm install waldo-imii

Create:

    var imii = require('waldo-imii');
    var myIndex = imii();

## API

### `index.post(term, document)`

### `index.containsTerm(term)`

### `index.documentFrequencyOfTerm(term)`

### `index.postingsForTerm(term)`