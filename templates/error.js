(function (){
    function error (it
        /* ``*/) {
        const out = `<!doctype html><html lang="en"> <head> </head> <body> <h1>${ it.message }</h1> <h2>${ it.explanation }</h2> </body></html>`;

        return out;
    }const itself = error, _encodeHTML = (function (doNotSkipEncoded) {
        const encodeHTMLRules = { '&': '&#38;', '<': '&#60;', '>': '&#62;', '"': '&#34;', '\'': '&#39;', '/': '&#47;' }
            , matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;

        return function (code) {
            return code ? code.toString().replace(matchHTML, (m) => {
                return encodeHTMLRules[m] || m;
            }) : '';
        };
    })();

    if(typeof module !== 'undefined' && module.exports) {
        module.exports = itself;
    }else if(typeof define === 'function'){
        define(() => {
            return itself;
        });
    }else {
        window.render = window.render || {};window.render.error = itself;
    }
})();