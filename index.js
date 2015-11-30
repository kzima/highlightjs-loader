'use strict';
var cheerio = require('cheerio');
var hl = require('highlight.js');
var he = require('he');

module.exports = function(input) {
    this && this.cacheable && this.cacheable();
    var $ = cheerio.load(input, {decodeEntities: false});
    $('code').each(function (index, code) {
        var lang = $(code).attr('class');
        console.log($(code).html())
        if (lang && hl.getLanguage(lang)) {
            $(code).html(hl.highlight(lang, $(code).html()).value);
        } else {
            $(code).html(hl.highlightAuto($(code).html()).value);
        }
    })
    return $.html();
};
