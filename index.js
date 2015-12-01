'use strict';
var url = require('url');
var cheerio = require('cheerio');
var hl = require('highlight.js');
var loaderUtils = require('loader-utils');

module.exports = function(input) {
    var query = loaderUtils.parseQuery(this.query);
    this && this.cacheable && this.cacheable();
    
    // if lang is specified as a parameter in the loader i.e. !highlightjs?lang=html, just highlight it and skip parsing
    // this could be good for performance reasons or if you need attributes in html to be stacked (I found that cheerio parser affects whitespace)
    if (query.lang && hl.getLanguage(query.lang)) {
        return hl.highlight(query.lang, input).value;
    }

    // if language is provided within <code class='html'> tag then parse the content and get the lang from the class
    // if no class provided, attempt to auto detect one
    var $ = cheerio.load(input, {decodeEntities: false});
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
