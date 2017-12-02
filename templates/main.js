(function(){function main(it
/**/) {
var out='<!doctype html><html lang="en"> <head> <link rel="stylesheet" href="app.css"> </head> <body> <h1>Santa\'s List!</h1> <ol class="left"> ';var arr1=it.family;if(arr1){var person,index=-1,l1=arr1.length-1;while(index<l1){person=arr1[index+=1];out+=' <li>'+(person)+' =></li> ';} } out+=' </ol> <ol class="left"> ';var arr2=it.targets;if(arr2){var person,index=-1,l2=arr2.length-1;while(index<l2){person=arr2[index+=1];out+=' <li>'+(person)+'</li> ';} } out+=' </ol> </body></html>';return out;
}var itself=main, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {window.render=window.render||{};window.render['main']=itself;}}());