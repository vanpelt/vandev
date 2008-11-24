/*
Script: overcast.js
	A tag cloud generator that's sexy as piss.

Author:
	Chris Van Pelt, <http://vandev.com>

License:
	MIT-style license.
*/

/*
Class: Overcast
	Slick tag cloud creator
	
Options:
	id - id of the element containing the the tags; default - overcast
	min - the minimum number used as a tag weight (tags with weights =< than this will not be shown unless fuzz is set); default - 0
	fuzz - an integer describing the amount of hidden tags (because the min value is >= to its weight) to show.  If set to 1 all hidden tags will be shown with random sizes between 80 and 110%.  Values higher than 1 will decrease the amount of tags shown and increase the randomness of which tags are shown; default - no fuzzing
	overlay - string representing the location of a transparent image to overlay each tag; default - no overlay
	href - href of new tags added to the cloud (tag name will be appended); defulat - /tags

Example:
	(start code)
	<div id='overcast'>
	  <a href="/tags/cool" class="_3">cool</a>
	  <a href="/tags/neat" class="_1">neat</a>
	</div>
	over = new Overcast({overlay: "gloss.png"});
	over.update("neat", 2);
	over.update("wow", 4);
	(end)
	
Notes:
	This class requires Hash.js and Dom.js to be selected when building mootools.  Upon instantiation Overcast will look for all tags within the element with the id passed in.  The first class of these elements should be an underscore followed by the weight of the tag eg. class="_2".  Any point after instantiation, update can be called and an existing tag will be updated or a new tag created.
*/
var Overcast = new Class({
    initialize: function(options){
		this.options = Object.extend({
			id: 'overcast',
			min: 0,
			fuzz: null,
			overlay: null,
			href: "/tags"
		}, options || {});
		this.max = this.options.min;
		//Create the tag hash
		this.tags = $H();
		$$("a", this.options.id).each(function(e){
			size = e.className.split(" ")[0].substring(1).toInt();
			if(size - this.options.min > this.max) this.max = size - this.options.min;
			this.tags.set(e.innerHTML, [e, size - this.options.min]);
		}.bind(this));
		this.draw();
    },
	draw: function(){
		this.tags.getValues().each(function(e){
			//set min if we're gonna fuzz
			min = this.options.fuzz ? 110 : 80
			//Calculate size as percentage between min and 200
			size = e[1] <= 0 ? 0 : (200 - min) * Math.log(e[1]) / Math.log(this.max) + min
			//randomize to get a few more tags...
			if(this.options.fuzz && size == 0) 1 == $random(1,this.options.fuzz) ? size = $random(80,110) : 0;
			
			e[0].setStyles({'font-size': size+'%', 'position': 'relative'});
			//Glossify the tags...
			if(this.options.overlay) {
				if(e[0].childNodes[1]) e[0].childNodes[1].remove();
				new Element('img', {'src': this.options.overlay, styles: {border:0, position: 'absolute', top: '45%', left:0, width: e[0].offsetWidth, height: e[0].offsetHeight / 3}}).inject(e[0]);
			}
		}.bind(this));
	},
	//Update an existing tag or create one if it doesn't exist
	update: function(tag, value) {
		//Reset the max
		this.max = this.options.min;
		this.tags.each(function(k,v){if(v[1] > this.max) this.max = v[1]}.bind(this));
		//Create or use existing element
		if(this.tags.keyOf(tag)) value = [this.tags.get(tag)[0], value - this.options.min];
		else value = [new Element('a', {'href': this.options.href+"/"+tag, html: tag}).inject(this.options.id), value - this.options.min];
		this.tags.set(tag, value);
		this.draw();
	}
});