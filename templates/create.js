(function(){function create(it
) {
var out='<!doctype html><html lang="en"> <head> <meta name="viewport" content="width=device-width"> <link rel="stylesheet" href="/app.css"> </head> <body> <h1 class="heading">Create Santa\'s List!</h1> <p>Welcome!</p> <p>Enter your names below and we\'ll create a url (it\'s going to be messy , sorry) that you can share with your people! The gift exchange will update each year automatically on January 1st. So you can use the same URL for years and years to come.</p> <p>Merry Christmas!</p> <div class="pair pair--heading"> <div class="pair__giver"> Name </div> </div> <form> <label>Year started: <input type="text" id="yearStarted" name="yearStarted" /></label> <div id="people"></div> <button id="add" type="button">Add Name</button> <button type="submit">Save Gift Exchange</button> </form> <script src="/app.js" defer></script> </body></html>';return out;
}var itself=create, _encodeHTML=(function(doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {window.render=window.render||{};window.render['create']=itself;}}());