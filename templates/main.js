(function(){function main(it
) {
var out='<!doctype html><html lang="en"> <head> <meta name="viewport" content="width=device-width"> <link rel="stylesheet" href="/app.css"> </head> <body> <h1 class="heading">Santa\'s List!</h1> <div class="pair pair--heading"> <div class="pair__giver"> Giver </div> <div class="pair__reciver"> Receiver </div> </div> ';var arr1=it.family;if(arr1){var pair,index=-1,l1=arr1.length-1;while(index<l1){pair=arr1[index+=1];out+=' <div class="pair"> <div class="pair__giver"> '+(pair.giver)+' </div> <div class="pair__reciver"> '+(pair.receiver)+' </div> </div> ';} } out+=' </body></html>';return out;
}var itself=main, _encodeHTML=(function(doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {window.render=window.render||{};window.render['main']=itself;}}());