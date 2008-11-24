if ("a".replace(/a/, function() {return "b"}) != "b") (function(){
  var default_replace = String.prototype.replace;
  String.prototype.replace = function(search,replace){
	if(typeof replace != "function"){
		return default_replace.apply(this,arguments)
	}
	var str = "" + this;
	var callback = replace;
	if(!(search instanceof RegExp)){
		var idx = str.indexOf(search);
		return (
			idx == -1 ? str :
			default_replace.apply(str,[search,callback(search, idx, str)])
		)
	}
	var reg = search;
	var result = [];
	var lastidx = reg.lastIndex;
	var re;
	while((re = reg.exec(str)) != null){
		var idx  = re.index;
		var args = re.concat(idx, str);
		result.push(
			str.slice(lastidx,idx),
			callback.apply(null,args).toString()
		);
		if(!reg.global){
			lastidx += RegExp.lastMatch.length;
			break
		}else{
			lastidx = reg.lastIndex;
		}
	}
	result.push(str.slice(lastidx));
	return result.join("")
  }
})();

var CodeHighlighter = { styleSets : new Array };

CodeHighlighter.addStyle = function(name, rules) {
	if ([].push) this.styleSets.push({
		name : name, 
		rules : rules,
		ignoreCase : arguments[2] || false
	})
	
	function setEvent() { 
		return window.addEvent('domready', CodeHighlighter.init.bind(CodeHighlighter));
	}
	
	if (this.styleSets.length==1) setEvent();
}

CodeHighlighter.init = function() {
	if (!document.getElementsByTagName) return; 
	if ("a".replace(/a/, function() {return "b"}) != "b") return; 
	var codeEls = document.getElementsByTagName("CODE");
	codeEls.filter = function(f) {
		var a =  new Array;
		for (var i = 0; i < this.length; i++) if (f(this[i])) a[a.length] = this[i];
		return a;
	} 
	var rules = new Array;
	rules.toString = function() {
		var exps = new Array;
		for (var i = 0; i < this.length; i++) exps.push(this[i].exp);
		return exps.join("|");
	}
	function addRule(className, rule) {
		var exp = (typeof rule.exp != "string")?String(rule.exp).substr(1, String(rule.exp).length-2):rule.exp;
		rules.push({
			className : className,
			exp : "(" + exp + ")",
			length : (exp.match(/(^|[^\\])\([^?]/g) || "").length + 1,
			replacement : rule.replacement || null 
		});
	}
	function parse(text, ignoreCase) {
		return text.replace(new RegExp(rules, (ignoreCase)?"gi":"g"), function() {
			var i = 0, j = 1, rule;
			while (rule = rules[i++]) {
				if (arguments[j]) {
					if (!rule.replacement) return "<span class=\"" + rule.className + "\">" + arguments[0] + "</span>";
					else {
						var str = rule.replacement.replace("$0", rule.className);
						for (var k = 1; k <= rule.length - 1; k++) str = str.replace("$" + k, arguments[j + k]);
						return str;
					}
				} else j+= rule.length;
			}
		});
	}
	function highlightCode(styleSet) {
		var parsed, clsRx = new RegExp("(\\s|^)" + styleSet.name + "(\\s|$)");
		rules.length = 0;
		var stylableEls = codeEls.filter(function(item) { return clsRx.test(item.className) });
		for (var className in styleSet.rules) addRule(className, styleSet.rules[className]);
		for (var i = 0; i < stylableEls.length; i++) {
			if (/MSIE/.test(navigator.appVersion) && stylableEls[i].parentNode.nodeName == 'PRE') {
				stylableEls[i] = stylableEls[i].parentNode;
				
				parsed = stylableEls[i].innerHTML.replace(/(<code[^>]*>)([^<]*)<\/code>/i, function() {
					return arguments[1] + parse(arguments[2], styleSet.ignoreCase) + "</code>"
				});
				parsed = parsed.replace(/\n( *)/g, function() { 
					var spaces = "";
					for (var i = 0; i < arguments[1].length; i++) spaces+= "&nbsp;";
					return "\n" + spaces;  
				});
				parsed = parsed.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
				parsed = parsed.replace(/\n(<\/\w+>)?/g, "<br />$1").replace(/<br \/>[\n\r\s]*<br \/>/g, "<p><br></p>");
				
			} else parsed = parse(stylableEls[i].innerHTML, styleSet.ignoreCase);
			
			stylableEls[i].innerHTML = parsed;
		}
	}
	for (var i=0; i < this.styleSets.length; i++) {
		highlightCode(this.styleSets[i]);  
	}
}