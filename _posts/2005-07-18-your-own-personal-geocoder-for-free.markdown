---
layout: post
title: Your own personal Geocoder... for FREE
---

After the release of the google maps <a href="http://www.google.com/apis/maps">api</a>, I began working on custom applications.  Because google doesn't allow address lookups in its api, you have to generate a latitude and longitude yourself for a given address.  The immediate problem was the need for geocoding, preferably geocoding within php.  This is where the <a href="http://www.census.gov">US Census</a> comes in.  The easiest solution is to download a mysql dump of all the zips with there corresponding lat/longs.  That mysql dump can be found <a href="http://civicspacelabs.org/home/developers/download">here</a>

Well, this is great, but it's not detailed enough.  I needed to geocode to the street level.  <a href="http://geocoder.us">geocoder.us</a> offers a free web service for doing this but you can only make one request every 15 seconds.  I have a database of 3500 addresses, so that wasn't going to work.  geocoder.us uses the US census's <a href="http://www2.census.gov/geo/tiger/tiger2004fe/">Tiger Data</a>, and the perl <a href="http://search.cpan.org/~sderle/Geo-Coder-US/US.pm">Geo::Coder::US</a> module.  The problem with this solution is the amount of time it would take compile.  You have to download every zip file from every state, and than compile it.  I'm not patient enough.  Thats when I found <a href="http://dan.egnor.name/google.html">Dan Egnor</a>.  Dan won the 2002 Google Programing contest with a program that does just what I needed it to.  Read on to do it yourself.

Ok, so the biggest issue is skipping out of the compile process.  <a href="http://dan.egnor.name/google.html">Dan</a> offers a free <a href="http://dan.egnor.name/all-map.bz2">download</a> of a bz2'ed version (~300mb) of the compiled address location data (by the way, the README on his site is good reading material).  Dans program does more than I needed it to, so I simplified his source code (Thanks Dan) to do simply what needs to be down.  It can be downloaded <a href="http://gpx.vanblog.net/geocoder.tar.bz2">here</a>.  Simply download my source, `bunzip2` the map data from Dans site (assuming Linux here), and tar -jxvf the source, run make on the source and issue a command like `./geo-coder (location of the map data ex. ../../all-map) '(the address you want to find)'`.  This returns either SUCCESS or FAILURE.  Some simple php code will execute and return the address within your web app:

<typo:code lang="php">
$progress = array();
exec("./geo-coder ../all-map '$address'", $progress);
if(substr($progress[0],0,7) == "SUCCESS"){
 //The below returns an array with, $ll[0] = longitude and $ll[1] = latitude from Dan's program
 $ll = explode(", ",trim(substr(strstr($progress[3], '@'),1)));
}else{
 //use a zipcode (from the query or DB table in my case) to find the lat/long in the mysql zip database
 $zips =& $db->query('SELECT latitude, longitude FROM zipcodes WHERE zip = '.$row['zip']);
}
</typo:code>

So there it is.  A geocoder in no time at all.  The geocoder is about 80% effective (according to Dan).  If enough interest is created with this post, I will create a torrent of the most up to date Tiger address information, which should improve the accuracy.  Don't hesitate to email me at vanpelt@gmail.com if you have questions or requests.
