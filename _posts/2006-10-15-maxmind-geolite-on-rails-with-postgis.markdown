---
layout: post
title: MaxMind GeoLite on Rails with PostGIS
---

Ughhhh, many hours of frustration have been spent trying to push the MaxMind GeoLite City CSV [files](http://www.maxmind.com/app/geolitecity) into a database configured with [PostGIS](http://postgis.refractions.net/).  Anyway, I figured I would document the process that I went through incase someone else wants some free IP based geocoding in there Rails app.

MaxMind gives you two CSV files for the city database.  One has an assload (2,783,434) of IP blocks that map to the id of a row in the other table containing location data.  The location data is pretty rich.  It contains a postal code, area code, dma code, country, region (state in US), and a latitude and longitude.  Because I wanted to be cool and more efficient, I decided to store the lat / lon as a point in PostGIS format.  Using PostGIS along with Guilhem Vellut's Spatial Adaptor [plugin](http://thepochisuperstarmegashow.com/projects/) for Rails, makes doing geo-spatial operations sexier and easier than ever.  You can use the Spatial Adaptor with MySQL, but you'll never be as cool as the guy using it with PostgreSQL.

First off I had to create my tables.

{% highlight ruby %}
create_table "geo_ip_locations" do |t|
  t.column "country", :string, :limit => 2
  t.column "region", :string, :limit => 2
  t.column "city", :string
  t.column "postal_code", :string, :limit => 7
  t.column "dma_code", :integer, :limit => 3
  t.column "area_code", :integer, :limit => 3
  t.column "geom", :point, :null => false, :srid => 4269, :with_z => false
end

add_index :geo_ip_locations, :geom, :spatial => true

create_table "geo_ips" do |t|
  t.column "start_ip", :integer, :limit => 10
  t.column "end_ip", :integer, :limit => 10
  t.column "geo_ip_location_id", :integer
end

add_index :gep_ips, :start_ip
add_index :geo_ips, :end_ip
add_index :geo_ips, :geo_ip_location_id

{% endhighlight %}

A few things to note:

* The geom column has the srid set to 4269, this threw me for a loop for way too long.  Make sure you have the `spatial_ref_sys` table populated.  I'm also assuming that the MaxMind data is mapped to the WGS 84 standard.
* The limit's on the start and end ip's are set to 10.  This creates bigint columns in my DB.  I'm not sure what version of Rails started doing this (I'm on Edge), but the columns have to be bigints for the IP block information to be imported.
* Remember to create a couple models for the tables
* You may want to add an index on postal_code or anything else you'll be using in a SQL WHERE clause

Now because the CSV file with the blocks of IP addresses in it is so large I went with an importing tool to get it into the table.  I was going to use PostgreSQL's COPY command, but it doesn't seem to support CSV's with double quotes.  I went with [Navicat](http://pgsql.navicat.com/download.html) and took advantage of my 30 day trial.  The CSV with the locations in it is another story.  We need to convert the lat / lon pairs into points for PostGIS.  Not only that, but if we want to be really cool we need to convert the city names into UTF-8.  The file that MaxMind gives us has ISO-8859-1 encoding.  [Iconv](http://www.gnu.org/software/libiconv/documentation/libiconv/iconv.1.html) comes to the rescue.  You can either convert the entire file from the command line, or just use the ruby library to do it in the import script below.

{% highlight ruby %}
require "#{File.dirname(__FILE__)}/../../config/environment"
require 'fastercsv'
require 'iconv'
ICONV = Iconv.new( 'UTF-8', 'ISO-8859-1' )

FasterCSV::HeaderConverters[:underscore] = lambda { |h| h.underscore }

FasterCSV.foreach('geo_ip_locations.csv', {:headers => :first_row, :col_sep => ",", :header_converters => :underscore}) do |row|
  begin
    row['id'] = row.delete('loc_id')[1]
    row['geom'] = Point.from_x_y(row.delete('longitude')[1].to_f, row.delete('latitude')[1].to_f, 4326)
    row['city'] = ICONV.iconv(row['city'])
    cool = GeoIpLocation.new(row.to_hash)
    cool.id = row['id']
    cool.save!
    $stdout.print '.'
  rescue
    puts $!.message
    $stdout.print 'f'
  end
  $stdout.flush
end
{% endhighlight %}

Things to note:

* You need FasterCSV for this to work `gem install fastercsv`
* You need to delete the first line (_with the copyright info in it_) in the CSV for this script to work.
* If you converted the file from the command line, comment out the three lines referencing iconv to improve performance.
* I created a directory called `transform` in my `db` directory, renamed and moved the location CSV there, and created a file with the above code in it.
* Always remember to put the srid in the `Point.from_x_y` call, otherwise you'll be very very frustrated.
* You'll need to specify `encoding: unicode` _Postgres_, `encoding: utf8` _MySQL_ in database.yml to use UTF-8 with the DB.  See the Rails [wiki](http://wiki.rubyonrails.org/rails/pages/HowToUseUnicodeStrings)
* The id is set this way to preserve it.

That's it!  There you have it, the possibilities are now endless.  As I said before, I set this up on PostgreSQL, but this should work the same on MySQL.  The one main difference will be the srid's.  MySQL doesn't support them, so you don't need to specify them.  Goodluck!
