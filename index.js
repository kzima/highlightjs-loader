'use strict';
var cheerio = require('cheerio');
var hl = require('highlight.js');

module.exports = function(input) {
    this && this.cacheable && this.cacheable();
    var $ = cheerio.load(input);
    $('code').each(function (index, code) {
        var lang = $(code).attr('class');
         if (lang && hl.getLanguage(lang)) {
            $(code).html(hl.highlight(lang, $(code).html()).value);
        } else {
            $(code).html(hl.highlightAuto($(code).html()).value);
        }
    })
    return $.html();
};
