function InvertedIndex(options) {

    options = options || {};

    this._terms = {};
    this._dcmp = options.compareDocument || function(l,r) { return l - r; };

}

InvertedIndex.prototype._pushTerm = function(doc, stats) {
    if (this._dcmp(doc, stats.postings[stats.postings.length-1]) !== 0) {
        stats.documentFrequency++;
        stats.postings.push(doc);
    }
}

InvertedIndex.prototype._spliceTerm = function(doc, stats) {
    // TODO: optimise binary search
    // if you're hitting this method you prboably aren't too concerned with
    // performance anyway...
    var ps = stats.postings,
        l  = ps.length;
    for (var i = 0; i < l; ++i) {
        var d = this._dcmp(doc, ps[i]);
        if (d === 0) {
            return;
        } else if (d < 0) {
            stats.documentFrequency++;
            ps.splice(i, 0, doc);
            return;
        }
    }
    stats.documentFrequency++;
    ps.push(doc);
}

InvertedIndex.prototype._newTerm = function(term, doc) {
    this._terms[t] = {
        documentFrequency   : 1,
        postings            : [doc]
    };
}

InvertedIndex.prototype.postDocument = function(doc, terms, cb) {

    for (var i = 0, l = terms.length; i < l; ++i) {
        
        var t           = terms[i],
            termStats   = this._terms[t];

        if (termStats) {
            this._pushTerm(doc, termStats);
        } else {
            this._newTerm(t, doc);
        }

    }

    process.nextTick(cb);

}

InvertedIndex.prototype.postDocumentUnsorted = function(doc, terms, cb) {

    for (var i = 0, l = terms.length; i < l; ++i) {
        
        var t           = terms[i],
            termStats   = this._terms[t];

        if (termStats) {
            this._spliceTerm(doc, termStats);
        } else {
            this._newTerm(t, doc);
        }

    }

    process.nextTick(cb);

}

InvertedIndex.prototype.postTerm = function(doc, term, cb) {
    return this.postDocument(doc, [term], cb);
}

InvertedIndex.prototype.postTermUnsorted = function(doc, term, cb) {
    return this.postDocumentUnsorted(doc, [term], cb);
}

InvertedIndex.prototype.containsTerm = function(term, cb) {
    var result = term in this._terms
    process.nextTick(function() { cb(result); });
}

InvertedIndex.prototype.documentFrequencyOfTerm = function(term, cb) {
    var result = this.containsTerm(term)
                    ? this._terms[term].documentFrequency
                    : 0;
    process.nextTick(function() { cb(result); });
}

InvertedIndex.prototype.postingsForTerm = function(term, cb) {
    var result = this.containsTerm(term)
                    ? this._terms[term].postings
                    : [];
    process.nextTick(function() { cb(result); });
}

module.exports = function() {
    return new InvertedIndex();
}