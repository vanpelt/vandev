---
layout: post
title: JSAwesome
---

Here is a sample call to JSAwesome:

{% highlight javascript %}
   new JSAwesome('an_id',[
      ['text_field', 'default value'],
      ['#text_area', ''],
      ['_hidden_input','i_am_invisible'],
      ['*radios', ['so|nice', 'many', 'radio|boxes', 'yeah']],
      [['^checkbox', true], '^not'],
      ['^choices', ['Choice 1|one', 'Choice 2|two', ['Choice 3|three', true]]],
      ['single_select', ['boo', '~yah']],
      ['nested_select', 
	 {'rad': ['cool', 'neat'], 
	  'awesome':
	    {'crazy': ['Indeed|~shit', 'man'],
	     'way': ['oh', 'yeah']}
	 }]]).to_html()
{% endhighlight %}

This generates this form (_choose `awesome`, than `crazy`, than `Indeed` from the set of select boxes at the bottom of the form to have your mind blown_)

<div id="an_id"></div><br/>
<script src="/js/jsawesome.js" type="text/javascript" charset="utf-8"></script>

<script type="text/javascript">
/* <![CDATA[ */
  new JSAwesome('an_id',[
      ['text_field', 'default value'],
      ['#text_area', ''],
      ['_hidden_input','i_am_invisible'],
      ['*radios', ['so|nice', 'many', 'radio|boxes', 'yeah']],
      [['^checkbox', true], '^not'],
      ['^choices', ['Choice 1|one', 'Choice 2|two', ['Choice 3|three', true]]],
      ['single_select', ['boo', '~yah']],
      ['nested_select', 
	 {'rad': ['cool', 'neat'], 
	  'awesome':
	    {'crazy': ['Indeed|~shit', 'man'],
	     'way': ['oh', 'yeah']}
	 }]]).to_html()
/* ]]> */
</script>

With this markup:

{% highlight html %}
<div id="an_id">
  <div class="error text_field">
    <label for="an_id_text_field">Text field</label> <input id="an_id_text_field" class="text_field" type="text" name="an_id[text_field]" />
  </div>
  <div class="error text_area">
    <label for="an_id_text_area">Text area</label> <textarea id="an_id_text_area" class="text_area" name="an_id[text_area]"></textarea>
  </div>
  <div class="error hidden_input">
    <input id="an_id_hidden_input" class="hidden_input" type="hidden" name="an_id[hidden_input]" value="i_am_invisible" />
  </div>
  <div class="error radios">
    <fieldset>
      <legend>Radios</legend> 
      <label for="an_id_radios">
          <input id="" class="radios" type="radio" name="an_id[radios]" value="nice"> So</label> 
       <label for="an_id_radios">
          <input id="" class="radios" type="radio" name="an_id[radios]" value="many"> Many</label> 
       <label for="an_id_radios">
          <input id="" class="radios" type="radio" name="an_id[radios]" value="boxes"> Radio</label> 
       <label for="an_id_radios">
          <input id="" class="radios" type="radio" name="an_id[radios]" value="yeah"> Yeah</label>
    </fieldset>
  </div>
   <div class="error row_5">
      <div style="float: left; margin-right: 5px;">
        <label for="an_id_checkbox">
           <span>
              <input id="an_id_real_cool" class="real_cool" type="checkbox" name="an_id[checkbox]" value="true"> 
              <input id="an_id_real_cool" class="real_cool" type="hidden" name="an_id[checkbox]" value="false">
           </span> Checkbox</label>
      </div>
      <div style="float: left; margin-right: 5px;">
        <label for="an_id_not">
            <span>
                <input id="an_id_not" class="not" type="checkbox" name="an_id[not]" value="true"> 
                <input id="an_id_not" class="not" type="hidden" name="an_id[not]" value="false">
             </span> Not</label>
      </div><br style="clear: left;">
    </div>
    <div class="error choices">
      <fieldset>
        <legend>Choices</legend> 
            <label for="an_id_one">
               <span>
                  <input id="an_id_one" class="one" type="checkbox" name="an_id[one]" value="true"> 
                  <input id="an_id_one" class="one" type="hidden" name="an_id[one]" value="false">
               </span> Choice 1</label> 
             <label for="an_id_two">
               <span>
                  <input id="an_id_two" class="two" type="checkbox" name="an_id[two]" value="true"> 
                  <input id="an_id_two" class="two" type="hidden" name="an_id[two]" value="false">
               </span> Choice 2</label> 
            <label for="an_id_three">
                <span>
                    <input id="an_id_three" class="three" type="checkbox" name="an_id[three]" value="true">
                    <input id="an_id_three" class="three" type="hidden" name="an_id[three]" value="false">
                </span> Choice 3</label>
      </fieldset>
    </div>
   <div class="error single_select">
      <label for="an_id_single_select">Single select</label>
          <select id="an_id_single_select" class="single_select" name="an_id[single_select]">
              <option value="">Choose Category</option>
              <option value="boo">boo</option>
              <option value="yah">yah</option>
           </select>
    </div>
  <div class="error nested_select">
    <label for="an_id_nested_select">Sub cats</label> <select id="an_id_nested_select" class="nested_select" name="an_id[nested_select]">
      <option value="">
        Choose Category
      </option>
      <option value="rad">
        rad
      </option>
      <option value="awesome">
        awesome
      </option>
    </select> <select id="an_id_nested_select_1" class="nested_select_1" name="an_id[nested_select_1]">
      <option value="">
        Choose Subcategory
      </option>
    </select>
  </div>
</div>
{% endhighlight %}


Wow, lot's of HTML from a little JSON.  Let's do an overview of the parameters.

1. The first parameter to JSAwesome is an id of an element already in the DOM.  It also acts as a namespace for the names and id's of form elements to allow for multiple JSAwesome forms on a page.  Looking at the html you can see you have plenty of classes added as well to style your generated form to your hearts content.
2. The second parameter is an array of tuples specifying the form elements in order.  The tuples can create the following elements using these rules:
     * **textfield** - the first element is the name with no special character and the second element is a string with the default value
     * **textarea** - the first element is the name beginning with a `#` and the second element is a string with the default value
     * **hidden** - the first element is the name beginning with a `_` and the second element is the value
     * **radio** - the first element is the legend of a fieldset / name of the radio buttons beginning with a `*` and the second element is an array of names.  Optionally you can specify label / name pairs separated by the `|` character.
     * **checkbox** - the first element is the name and label of a checkbox beginning with a `^` character.  If a second element is present, the checkbox will be checked.  The example above also demonstrates the ability to group fields together on the same line.  If you use an array of tuples, _or in this case checkboxes can be specfied with a single string if the you don't want it checked_, those elements will be wrapped in div's with the style set to 'float:left'.  Optionally label / name pairs work the same as radio's.
     * **checkbox group** - the first element is the legend of a fieldset and the second is an array of checkboxes as described above
     * **single select** - the first element is the name of the select and the second is an array of options.  Optionally the options can specify name / value pairs separated by the `|` character.  You can also use the '~' character to specify a custom input.  When this option is selected a textfield will appear to allow the user to enter a custom value.
     * **nested select** - the first element is the name of the select.  The second element is a hash with the keys being the options and the values being hashes or arrays of the child selects.  Optionally name / value pairs and custom inputs work the same as single selects.

But there's more.  JSAwesome takes a third parameter which gives you custom labels and validations.  This use case might look like this:

{% highlight javascript %}
   var test = new JSAwesome('validated',[
      ['text_field', 'default value'],
      ['#text_area', ''],
      ['single_select', ['boo', '~yah']]
      ], 
      {'text_field': "JSAwesome",
       'text_area': {
          'required':true,
          'validation': ["\\d+", "Field must contain atleast one digit"],
          'label': "Input some text with atleast one digit"
       },
       'single_select': {
          'required':true
       },
       '~': 'Custom instructions',
       '{}': ['Select something']
   })
   test.to_html()
   test.addValidation()
{% endhighlight %}

Which generates this form:

<form id="form" action="#"><div id="validated"></div><br/><input type="submit" value="Test validation"/></form><br/>

<script type="text/javascript">
/* <![CDATA[ */
   var test = new JSAwesome('validated',[
      ['text_field', 'default value'],
      ['#text_area', ''],
      ['single_select', ['boo', '~yah']]
      ], {   'text_field': "JSAwesome",
       'text_area': {
          'required':true,
          'validation': ["\\d+", "Field must contain atleast one digit"],
          'label': "Input some text with atleast one digit"
       },
       'single_select': {
          'required':true
       },
       '~': 'Custom instructions',
       '{}': ['Select something']
   })
   test.to_html()
   test.addValidation()
   $('form').addEvent('submit', function(e) {
      e.stop()
      if(test.validate()) 
         alert('Passed validation')
    })
/* ]]> */
</script>

**Bam**, is your mind completely blown yet?  Here's an overview of the 3rd parameter:

* The keys to the hash are either names of elements in the form (_without the special characters_) or one of two special global names `~` or `{}`.
* The values of the hash are either a string or another hash.  If it's a string, it represents the label for the element specifed.  If it's a hash you can specify all or one of the following:
   * **required** - a boolean specifying whether the field is required. _if it is used for a radio or checkbox group it will require atleast one radio button to be clicked_.  It can also be used alongside of **validation** to make a text input field both required and validated
   * **validation** - a tuple with the first element being a javascript RegEx string.  The second is a message to be displayed on failure
   * **label** - the label, just as if you had given only a string, but can be used alongside required and validation
* If the key is `~` this specifies the value to be used in custom fields as opposed to the default 'Custom...' (_choose 'yah' from the select box above_)
* If the key is `{}` the value is a tuple with the first element being the default value for the root select element, and the optional second parameter being the default for any sub-selects.

So there you have it.  JSAwesome in a nutshell.  We use this library over at <a href="http://doloreslabs.com">Dolores Labs</a> for easily creating dynamic forms for all of our <a href="http://blog.doloreslabs.com">experiments</a>.  It beats the crap out of writing HTML forms manually and makes our tasks load a lot faster.  We also get validation for free.  It currently requires mootools 1.2b, which is packed with the <a href="http://github.com/vanpelt/jsawesome/tree/master">project</a>. Fork away!
