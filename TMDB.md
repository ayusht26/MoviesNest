Getting Started 

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.themoviedb.org/llms.txt
> Use this file to discover all available pages before exploring further.

# Getting Started

Get started with the basics of the TMDB API.

Welcome to version 3 of The Movie Database (TMDB) API. This is where you will find the definitive list of currently available methods for our movie, tv, actor and image API. If you need help or support, please head over to our <Anchor label="API support forum" target="_blank" href="https://www.themoviedb.org/talk/category/5047958519c29526b50017d6">API support forum</Anchor>.

To register for an API key, click the <Anchor label="API link" target="_blank" href="https://www.themoviedb.org/settings/api">API link</Anchor> from within your account settings page.

Please note that the API registration process *is not* optimized for mobile devices so you should access these pages on a desktop computer and browser.

Before being issued an API key you will have to agree to our terms of use. You can read that <Anchor label="here" target="_blank" href="https://www.themoviedb.org/documentation/api/terms-of-use">here</Anchor>.

### A few useful tips...

* The [configuration](https://developer.themoviedb.org/reference/configuration-details) methods are useful to get the static lists of data we use throughout the database.
  * You can find things like the languages, countries, timezones and translations that we use. The configuration method also holds useful image information.
* Understanding the basics of our authentication is useful. You can read about this [here](https://developer.themoviedb.org/docs/authentication-application).
* We enforce some amount of rate limiting on the API. You can read about that [here](https://developer.themoviedb.org/docs/rate-limiting).

------------------



> ## Documentation Index
> Fetch the complete documentation index at: https://developer.themoviedb.org/llms.txt
> Use this file to discover all available pages before exploring further.

# Getting Started

Get started with the basics of the TMDB API.

Welcome to version 3 of The Movie Database (TMDB) API. This is where you will find the definitive list of currently available methods for our movie, tv, actor and image API. If you need help or support, please head over to our <Anchor label="API support forum" target="_blank" href="https://www.themoviedb.org/talk/category/5047958519c29526b50017d6">API support forum</Anchor>.

To register for an API key, click the <Anchor label="API link" target="_blank" href="https://www.themoviedb.org/settings/api">API link</Anchor> from within your account settings page.

Please note that the API registration process *is not* optimized for mobile devices so you should access these pages on a desktop computer and browser.

Before being issued an API key you will have to agree to our terms of use. You can read that <Anchor label="here" target="_blank" href="https://www.themoviedb.org/documentation/api/terms-of-use">here</Anchor>.

### A few useful tips...

* The [configuration](https://developer.themoviedb.org/reference/configuration-details) methods are useful to get the static lists of data we use throughout the database.
  * You can find things like the languages, countries, timezones and translations that we use. The configuration method also holds useful image information.
* Understanding the basics of our authentication is useful. You can read about this [here](https://developer.themoviedb.org/docs/authentication-application).
* We enforce some amount of rate limiting on the API. You can read about that [here](https://developer.themoviedb.org/docs/rate-limiting).

-----------


- FAQ
What is TMDB's API?
The API service is for those of you interested in using our movie, TV show or actor images and/or data in your application. Our API is a system we provide for you and your team to programmatically fetch and use our data and/or images.

How do I apply for an API key?
You can apply for an API key by clicking the "API" link from the left hand sidebar within your account settings page.

Is there an SLA?
We do not currently provide an SLA. However, we do make every reasonable attempt to keep our service online and accessible. You can view our status page here.

Are there any API wrappers or libraries I can use?
There sure is! Check them out here.

What about SSL?
It's currently available API wide. This includes both the API endpoints and assets served via our CDN. We strongly recommend you use SSL.

Is there a commercial service?
Yes. You can contact our sales team by emailing sales@themoviedb.org. Please include the country you're from to help us expedite your request.

You can also visit our API sales page for more information.

What is the difference between a commercial API and a developer API?
A commercial API is for commercial projects and a developer API is for developers. Your project is considered commercial if the primary purpose is to create revenue for the benefit of the owner.

Does the API key cost anything?
Our API is free to use for non-commercial purposes as long as you attribute TMDB as the source of the data and/or images. If you are interested in obtaining a license to use our API and/or our data/images for commercial purposes, please contact sales@themoviedb.org. Please include the country you're from to help us expedite your request.

Does the API ever change? How can learn about new features?
Yes, it can from time to time. We try our best to post these relevant updates to the official documentation. You can also keep tabs on our Trello board.

What are the attribution requirements?
You shall use the TMDB logo to identify your use of the TMDB APIs. You shall place the following notice prominently on your application: "This product uses the TMDB API but is not endorsed or certified by TMDB."

Any use of the TMDB logo in your application shall be less prominent than the logo or mark that primarily describes the application and your use of the TMDB logo shall not imply any endorsement by TMDB. When attributing TMDB, the attribution must be within your application's "About" or "Credits" type section.

When using a TMDB logo, we require you to use one of our approved logos.

Can I make changes to the API?
No, you cannot. Our API is closed source.

Are there branding requirements?
Our logo should not be modified in color, aspect ratio, flipped or rotated except where otherwise noted.

Our logo can be white, black or any of the approved colors used throughout our branding. For a list of official logos, see our logos & attribution page.

When referring to TMDB, you should use either the acronym "TMDB" or the full name "The Movie Database". Any other name is not acceptable. When linking back to our website, please point your link to:

https://www.themoviedb.org

If you are putting our company name or logo on any merchandise or product packaging please consult us beforehand for approval.

API legal notice
We do not claim ownership of any of the images or data in the API. We comply with the Digital Millennium Copyright Act (DMCA) and expeditiously remove infringing content when properly notified. Any data and/or images you upload you expressly grant us a license to use. You are prohibited from using the images and/or data in connection with libelous, defamatory, obscene, pornographic, abusive or otherwise offensive content.

------------

Popularity & Trending
Popularity
Popularity is a fairly important metric here on TMDB. It helps us boost search results, adds an incredibly useful sort value for discover, and is also just kind of fun to see items chart up and down. You can think of popularity as being a "lifetime" popularity score that is impacted by the attributes below. It's calculated quite differently than trending.

Each model builds their popularity value slightly differently. Here are some of the attributes we use for each media type.

Movies
Number of votes for the day
Number of views for the day
Number of users who marked it as a "favourite" for the day
Number of users who added it to their "watchlist" for the day
Release date
Number of total votes
Previous days score
TV Shows
Number of votes for the day
Number of views for the day
Number of users who marked it as a "favourite" for the day
Number of users who added it to their "watchlist" for the day
Next/last episode to air date
Number of total votes
Previous days score
People
Number of views for the day
Previous days score
There is no API to explore this data right now but it is something that would be a lot fun to dig into. The daily file exports do however, contain the popularity data so there is a record of the values starting on April 28, 2017.

Trending
Trending is another type of "popularity" score on TMDB but unlike popularity (discussed above), trending's time windows are much shorter (daily, weekly). This helps us surface the relevant content of today (the new stuff) much easier.

Just like popularity, we track trending scores for movies, TV shows and people.



-----------

Wrappers & Libraries
Here's a list of community contributed libraries for many popular languages in the world.

ActionScript
TheMovieDatabaseAS3 by swagger
C
libtmdb by fwttnnn
C++
QT-TMDBLib by supersliser
C#
TMDbLib by LordMike
The Movie Database .NET Client by Miguel Hasse
TheMovieDbWrapper by nCubed
WatTMDb by watway
TMDbWrapper by asnoek
TmdbEasy by tonykaralis
Clojure
Moov by runexec
ColdFusion / Lucee
CFTMDB by Jordan Clark
Dart
tmdb by Josep Sayol
tmdb_api by Ratakondala Arun
Delphi
JD-TMDB by Jerry Dodge
Go
go-tmdb by Ryan Brady
golang-tmdb by Cyro
Haskell
themoviedb by Peter Jones
iOS
Cine Ko! by Jovito Royeca
JLTMDbClient by Javi Lorbada
ILTMDb by Gustavo
Java
api-themoviedb by Omertron
themoviedbapi by c-eg / holgerbrandl
JavaScript
node-tmdb by raqqa
moviedb-promise by grantholle
themoviedb-javascript-library by cavestri
tmdb-js by david98hall
moviedb by danzajdband
TMDB by BlackTiger007
Julia
TheMovieDB.jl by NeroBlackstone
MCP
MCP-TMDB by Leonardo Gil Rodríguez
mSL
tmdb-api-msl by ProIcons
Perl
TMDB by mithun
WWW::TMDB::API by MariaB
PHP
php-tmdb-api by Michael Roterman
WtfzTmdbBundle Symfony2 bundle by Michael Roterman
tmdb_v3-PHP-API by pixelead0
TMDB4PHP by kriboogh
Python
tmdbsimple by celiao
tmdb3 by Toilal
pytmdb3 by wagner
Ruby
themoviedb-api by 18Months
themoviedb by ahmetabdi
Enceladus by osiro
ruby-tmdb by iriomk
Rust
tmdb-client-rs by bcourtine
Swift
TMDBSwifty by Brett Ohland
TMDb by adamayoung
TheMovieDatabaseSwiftWrapper by George Kye
Typescript
tmdb by lorenzopant
tmdb-ts by blakejoy
tmdb by leandrowkz
--


> ## Documentation Index
> Fetch the complete documentation index at: https://developer.themoviedb.org/llms.txt
> Use this file to discover all available pages before exploring further.

# Wrappers & Libraries

Here's a list of community contributed libraries for many popular languages in the world.

### ActionScript

* <Anchor label="TheMovieDatabaseAS3" target="_blank" href="https://github.com/swagnag/TheMovieDatabaseAS3">TheMovieDatabaseAS3</Anchor> by swagger

### C

* <Anchor label="libtmdb" target="_blank" href="https://github.com/fwttnnn/libtmdb">libtmdb</Anchor> by fwttnnn

### C++

* <Anchor label="QT-TMDBLib" target="_blank" href="https://github.com/supersliser/QT-TMDBLib">QT-TMDBLib</Anchor> by supersliser

### C\#

* <Anchor label="TMDbLib" target="_blank" href="https://github.com/LordMike/TMDbLib/">TMDbLib</Anchor> by LordMike
* <Anchor label="The Movie Database" target="_blank" href="http://www.nuget.org/packages/Hasseware.TheMovieDB/">The Movie Database</Anchor> .NET Client by Miguel Hasse
* <Anchor label="TheMovieDbWrapper" target="_blank" href="https://github.com/nCubed/TheMovieDbWrapper/">TheMovieDbWrapper</Anchor> by nCubed
* <Anchor label="WatTMDb" target="_blank" href="https://github.com/watway/WatTMDB">WatTMDb</Anchor> by watway
* <Anchor label="TMDbWrapper" target="_blank" href="https://github.com/Fishes/TMDbWrapper/">TMDbWrapper</Anchor> by asnoek
* <Anchor label="TmdbEasy" target="_blank" href="https://github.com/tonykaralis/TmdbEasy">TmdbEasy</Anchor> by tonykaralis

### Clojure

* <Anchor label="Moov" target="_blank" href="https://github.com/runexec/Moov/">Moov</Anchor> by runexec

### ColdFusion / Lucee

* <Anchor label="CFTMDB" target="_blank" href="https://www.forgebox.io/view/cftmdb">CFTMDB</Anchor>  by Jordan Clark

### Dart

* <Anchor label="tmdb" target="_blank" href="https://pub.dartlang.org/packages/tmdb">tmdb</Anchor> by Josep Sayol
* <Anchor label="tmdb_api" target="_blank" href="https://pub.dev/packages/tmdb_api">tmdb\_api</Anchor> by Ratakondala Arun

### Delphi

* <Anchor label="JD-TMDB" target="_blank" href="https://github.com/djjd47130/JD-TMDB">JD-TMDB</Anchor> by Jerry Dodge

### Go

* <Anchor label="go-tmdb" target="_blank" href="https://github.com/ryanbradynd05/go-tmdb/">go-tmdb</Anchor> by Ryan Brady
* <Anchor label="golang-tmdb" target="_blank" href="https://github.com/cyruzin/golang-tmdb">golang-tmdb</Anchor> by Cyro

### Haskell

* <Anchor label="themoviedb" target="_blank" href="http://hackage.haskell.org/package/themoviedb/">themoviedb</Anchor> by Peter Jones

### iOS

* <Anchor label="Cine Ko!" target="_blank" href="https://github.com/jovito-royeca/Cineko/">Cine Ko!</Anchor> by Jovito Royeca
* <Anchor label="JLTMDbClient" target="_blank" href="https://github.com/JaviLorbada/JLTMDbClient/">JLTMDbClient</Anchor> by Javi Lorbada
* <Anchor label="ILTMDb" target="_blank" href="https://github.com/WatchApp/ILTMDb/">ILTMDb</Anchor> by Gustavo

### Java

* <Anchor label="api-themoviedb" target="_blank" href="https://github.com/Omertron/api-themoviedb/">api-themoviedb</Anchor> by Omertron
* <Anchor label="themoviedbapi" target="_blank" href="https://github.com/c-eg/themoviedbapi">themoviedbapi</Anchor> by c-eg / holgerbrandl

### JavaScript

* <Anchor label="node-tmdb" target="_blank" href="https://github.com/raqqa/node-tmdb">node-tmdb</Anchor> by raqqa
* <Anchor label="moviedb-promise" target="_blank" href="https://github.com/grantholle/moviedb-promise">moviedb-promise</Anchor> by grantholle
* <Anchor label="themoviedb-javascript-library" target="_blank" href="https://github.com/cavestri/themoviedb-javascript-library">themoviedb-javascript-library</Anchor> by cavestri
* [tmdb-js](https://github.com/david98hall/tmdb-js) by david98hall
* <Anchor label="moviedb" target="_blank" href="https://github.com/impronunciable/moviedb">moviedb</Anchor> by danzajdband
* <Anchor label="TMDB" target="_blank" href="https://github.com/BlackTiger007/TMDB">TMDB</Anchor> by BlackTiger007

### Julia

* [TheMovieDB.jl](https://github.com/NeroBlackstone/TheMovieDB.jl) by NeroBlackstone

### MCP

* <Anchor label="MCP-TMDB" target="_blank" href="https://github.com/leonardogilrodriguez/mcp-tmdb">MCP-TMDB</Anchor>  by Leonardo Gil Rodríguez

### mSL

* <Anchor label="tmdb-api-msl" target="_blank" href="https://github.com/ProIcons/tmdb-api-msl/">tmdb-api-msl</Anchor> by ProIcons

### Perl

* <Anchor label="TMDB" target="_blank" href="https://metacpan.org/release/TMDB/">TMDB</Anchor> by mithun
* <Anchor label="WWW::TMDB::API" target="_blank" href="http://search.cpan.org/~mariab/">WWW::TMDB::API</Anchor> by MariaB

### PHP

* <Anchor label="php-tmdb-api" target="_blank" href="https://github.com/wtfzdotnet/php-tmdb-api/">php-tmdb-api</Anchor> by Michael Roterman
* <Anchor label="WtfzTmdbBundle" target="_blank" href="https://github.com/wtfzdotnet/WtfzTmdbBundle/">WtfzTmdbBundle</Anchor> Symfony2 bundle by Michael Roterman
* <Anchor label="tmdb_v3-PHP-API" target="_blank" href="https://github.com/pixelead0/tmdb_v3-PHP-API-/">tmdb\_v3-PHP-API</Anchor> by pixelead0
* <Anchor label="TMDB4PHP" target="_blank" href="https://github.com/kriboogh/TMDB4PHP/">TMDB4PHP</Anchor> by kriboogh

### Python

* <Anchor label="tmdbsimple" target="_blank" href="https://github.com/celiao/tmdbsimple/">tmdbsimple</Anchor> by celiao
* <Anchor label="tmdb3" target="_blank" href="https://pypi.python.org/pypi/tmdb3/">tmdb3</Anchor> by Toilal
* <Anchor label="pytmdb3" target="_blank" href="https://github.com/wagnerrp/pytmdb3/">pytmdb3</Anchor> by wagner

### Ruby

* <Anchor label="themoviedb-api" target="_blank" href="https://github.com/18Months/themoviedb-api/">themoviedb-api</Anchor> by 18Months
* <Anchor label="themoviedb" target="_blank" href="https://github.com/ahmetabdi/themoviedb/">themoviedb</Anchor> by ahmetabdi
* <Anchor label="Enceladus" target="_blank" href="https://github.com/osiro/enceladus/">Enceladus</Anchor> by osiro
* <Anchor label="ruby-tmdb" target="_blank" href="https://github.com/Irio/ruby-tmdb/">ruby-tmdb</Anchor> by iriomk

### Rust

* <Anchor label="tmdb-client-rs" target="_blank" href="https://github.com/bcourtine/tmdb-client-rs">tmdb-client-rs</Anchor> by bcourtine

### Swift

* <Anchor label="TMDBSwifty" target="_blank" href="https://github.com/brettohland/swift-tmdb">TMDBSwifty</Anchor> by Brett Ohland
* <Anchor label="TMDb" target="_blank" href="https://github.com/adamayoung/TMDb">TMDb</Anchor> by adamayoung
* <Anchor label="TheMovieDatabaseSwiftWrapper" target="_blank" href="https://github.com/gkye/TheMovieDatabaseSwiftWrapper/">TheMovieDatabaseSwiftWrapper</Anchor> by George Kye

### Typescript

* <Anchor label="tmdb" target="_blank" href="https://github.com/lorenzopant/tmdb">tmdb</Anchor> by lorenzopant
* <Anchor label="tmdb-ts" target="_blank" href="https://github.com/blakejoy/tmdb-ts">tmdb-ts</Anchor>  by blakejoy
* <Anchor label="tmdb" target="_blank" href="https://github.com/leandrowkz/tmdb">tmdb</Anchor> by leandrowkz


------------

Authentication - application


> ## Documentation Index
> Fetch the complete documentation index at: https://developer.themoviedb.org/llms.txt
> Use this file to discover all available pages before exploring further.

# Application

The default way to authenticate.

Application level authentication would generally be considered the default way of authenticating yourself on the API. Version 3 is controlled by either a single query parameter, `api_key`, or by using your access token as a `Bearer` token. You can request an API key by logging in to your account on TMDB and clicking [here](https://www.themoviedb.org/settings/api).

#### Bearer Token

The default method to authenticate is with your access token. If you head into your account page, under the API settings section, you will see a new token listed called *API Read Access Token*. This token is expected to be sent along as an `Authorization` header. A simple cURL example using this method looks like the following:

```curl cURL Example
curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/11' \
     --header 'Authorization: Bearer <<access_token>>'
```

Using the Bearer token has the added benefit of being a single authentication process that you can use across both the v3 and v4 methods. Both authentication methods provide the same level of access, and which one you choose is completely up to you.

---
use r- 

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.themoviedb.org/llms.txt
> Use this file to discover all available pages before exploring further.

# User

Need to make a user based call?

### User Authentication

You can authenticate TMDB users within your application to extend the TMDB experience within your application. This will let your users (nay—our users) do things like rate movies, maintain their favourite and watch lists as well as do things like create and edit custom lists—all while staying in sync with their account on TMDB.

User authentication is controlled with a `session_id` query parameter. You can generate a `session_id `by following the steps outlined [here](https://developer.themoviedb.org/reference/authentication-how-do-i-generate-a-session-id).


guest session


> ## Documentation Index
> Fetch the complete documentation index at: https://developer.themoviedb.org/llms.txt
> Use this file to discover all available pages before exploring further.

# User

Need to make a user based call?

### User Authentication

You can authenticate TMDB users within your application to extend the TMDB experience within your application. This will let your users (nay—our users) do things like rate movies, maintain their favourite and watch lists as well as do things like create and edit custom lists—all while staying in sync with their account on TMDB.

User authentication is controlled with a `session_id` query parameter. You can generate a `session_id `by following the steps outlined [here](https://developer.themoviedb.org/reference/authentication-how-do-i-generate-a-session-id).

---------

USING the api



> ## Documentation Index
> Fetch the complete documentation index at: https://developer.themoviedb.org/llms.txt
> Use this file to discover all available pages before exploring further.

# Append To Response

`append_to_response` is an easy and efficient way to append extra requests to any top level namespace. The movie, TV show, TV season, TV episode and person detail methods all support a query parameter called `append_to_response`. This makes it possible to make sub requests within the same namespace in a single HTTP request. Each request will get appended to the response as a new JSON object.

Here's a quick example, let's assume you want the movie details and the videos for a movie. Usually you would think you have to issue two requests:

```shell Examples
curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/11' \
     --header 'Authorization: Bearer <<access_token>>'

curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/11/videos' \
     --header 'Authorization: Bearer <<access_token>>'
```

But with `append_to_response` you can issue a single request:

```shell Example
curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/11?append_to_response=videos' \
     --header 'Authorization: Bearer <<access_token>>'
```

Even more powerful, you can issue multiple requests, just comma separate the values:

```shell Example
curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/11?append_to_response=videos,images' \
     --header 'Authorization: Bearer <<access_token>>'
```

> 📘 Note
>
> Each method will still respond to whatever query parameters are supported by each individual request. This is worth pointing out specifically for images since your language parameter will filter images. This is where the `include_image_language` parameter can be useful as outlined in the [image language](https://developer.themoviedb.org/docs/image-languages) page.

---

---



> ## Documentation Index
> Fetch the complete documentation index at: https://developer.themoviedb.org/llms.txt
> Use this file to discover all available pages before exploring further.

# Daily ID Exports

Download a list of valid IDs from TMDB.

We currently publish a set of daily ID file exports. These are not, nor intended to be full data exports. Instead, they contain a list of the valid IDs you can find on TMDB and some higher level attributes that are helpful for filtering items like the adult, video and popularity values.

### Data Structure

These files themselves are not a valid JSON object. Instead, each line is. Most systems, tools and languages have easy ways of scanning lines in files (skipping and buffering) without having to load the entire file into memory. The assumption here is that you can read every line easily, and you can expect each line to contain a valid JSON object.

### Availability

All of the exported files are available for download from `https://files.tmdb.org`. The export job runs every day starting at around 7:00 AM UTC, and all files are available by 8:00 AM UTC.

There is currently no authentication on these files since they are not very useful unless you're a user of our service. Please note that this could change at some point in the future so if you start having problems accessing these files, check this document for updates.

> 📘 Note
>
> These files are only made available for 3 months after which they are automatically deleted.

| Media Type           | Path       | Name                                        |
| :------------------- | :--------- | :------------------------------------------ |
| Movies               | /p/exports | `movie_ids_MM_DD_YYYY.json.gz`              |
| TV Series            | /p/exports | `tv_series_ids_MM_DD_YYYY.json.gz`          |
| People               | /p/exports | `person_ids_MM_DD_YYYY.json.gz`             |
| Collections          | /p/exports | `collection_ids_MM_DD_YYYY.json.gz`         |
| TV Networks          | /p/exports | `tv_network_ids_MM_DD_YYYY.json.gz`         |
| Keywords             | /p/exports | `keyword_ids_MM_DD_YYYY.json.gz`            |
| Production Companies | /p/exports | `production_company_ids_MM_DD_YYYY.json.gz` |

### Example

If you were looking for a list of valid movie ids, the full download URL for the file published on May 15, 2024 is located here:

<Anchor label="`https://files.tmdb.org/p/exports/movie_ids_10_25_2025.json.gz`" target="_blank" href="https://files.tmdb.org/p/exports/movie_ids_10_25_2025.json.gz">`https://files.tmdb.org/p/exports/movie_ids_10_25_2025.json.gz`</Anchor>

### Adult ID's

Starting July 5, 2023, we are now also publishing the adult data set. You can find the paths for movies, TV shows and people below.

| Media Type | Path       | Name                                     |
| :--------- | :--------- | :--------------------------------------- |
| Movies     | /p/exports | `adult_movie_ids_MM_DD_YYYY.json.gz`     |
| TV Series  | /p/exports | `adult_tv_series_ids_MM_DD_YYYY.json.gz` |
| People     | /p/exports | `adult_person_ids_MM_DD_YYYY.json.gz`    |

### Example

[`http://files.tmdb.org/p/exports/adult_movie_ids_05_15_2024.json.gz`](http://files.tmdb.org/p/exports/adult_movie_ids_05_15_2024.json.gz)


=====



> ## Documentation Index
> Fetch the complete documentation index at: https://developer.themoviedb.org/llms.txt
> Use this file to discover all available pages before exploring further.

# Errors

A list of errors you might come across while using TMDB.

| Code | HTTP Status | Message                                                                               |
| :--- | :---------- | :------------------------------------------------------------------------------------ |
| 1    | 200         | Success.                                                                              |
| 2    | 501         | Invalid service: this service does not exist.                                         |
| 3    | 401         | Authentication failed: You do not have permissions to access the service.             |
| 4    | 405         | Invalid format: This service doesn't exist in that format.                            |
| 5    | 422         | Invalid parameters: Your request parameters are incorrect.                            |
| 6    | 404         | Invalid id: The pre-requisite id is invalid or not found.                             |
| 7    | 401         | Invalid API key: You must be granted a valid key.                                     |
| 8    | 403         | Duplicate entry: The data you tried to submit already exists.                         |
| 9    | 503         | Service offline: This service is temporarily offline, try again later.                |
| 10   | 401         | Suspended API key: Access to your account has been suspended, contact TMDB.           |
| 11   | 500         | Internal error: Something went wrong, contact TMDB.                                   |
| 12   | 201         | The item/record was updated successfully.                                             |
| 13   | 200         | The item/record was deleted successfully.                                             |
| 14   | 401         | Authentication failed.                                                                |
| 15   | 500         | Failed.                                                                               |
| 16   | 401         | Device denied.                                                                        |
| 17   | 401         | Session denied.                                                                       |
| 18   | 400         | Validation failed.                                                                    |
| 19   | 406         | Invalid accept header.                                                                |
| 20   | 422         | Invalid date range: Should be a range no longer than 14 days.                         |
| 21   | 200         | Entry not found: The item you are trying to edit cannot be found.                     |
| 22   | 400         | Invalid page: Pages start at 1 and max at 500. They are expected to be an integer.    |
| 23   | 400         | Invalid date: Format needs to be YYYY-MM-DD.                                          |
| 24   | 504         | Your request to the backend server timed out. Try again.                              |
| 25   | 429         | Your request count (#) is over the allowed limit of (40).                             |
| 26   | 400         | You must provide a username and password.                                             |
| 27   | 400         | Too many append to response objects: The maximum number of remote calls is 20.        |
| 28   | 400         | Invalid timezone: Please consult the documentation for a valid timezone.              |
| 29   | 400         | You must confirm this action: Please provide a confirm=true parameter.                |
| 30   | 401         | Invalid username and/or password: You did not provide a valid login.                  |
| 31   | 401         | Account disabled: Your account is no longer active. Contact TMDB if this is an error. |
| 32   | 401         | Email not verified: Your email address has not been verified.                         |
| 33   | 401         | Invalid request token: The request token is either expired or invalid.                |
| 34   | 404         | The resource you requested could not be found.                                        |
| 35   | 401         | Invalid token.                                                                        |
| 36   | 401         | This token hasn't been granted write permission by the user.                          |
| 37   | 404         | The requested session could not be found.                                             |
| 38   | 401         | You don't have permission to edit this resource.                                      |
| 39   | 401         | This resource is private.                                                             |
| 40   | 200         | Nothing to update.                                                                    |
| 41   | 422         | This request token hasn't been approved by the user.                                  |
| 42   | 405         | This request method is not supported for this resource.                               |
| 43   | 502         | Couldn't connect to the backend server.                                               |
| 44   | 500         | The ID is invalid.                                                                    |
| 45   | 403         | This user has been suspended.                                                         |
| 46   | 503         | The API is undergoing maintenance. Try again later.                                   |
| 47   | 400         | The input is not valid.                                                               |

===



> ## Documentation Index
> Fetch the complete documentation index at: https://developer.themoviedb.org/llms.txt
> Use this file to discover all available pages before exploring further.

# Finding Data

How do you find data on TMDB?

There are 3 ways to search for and find movies, TV shows and people on TMDB. They're outlined below.

* [`/search`](https://developer.themoviedb.org/reference/search-movie) - Text based search is the most common way. You provide a query string and we provide the closest match. Searching by text takes into account all original, translated, alternative names and titles.
* [`/discover`](https://developer.themoviedb.org/reference/discover-movie) - Sometimes it useful to search for movies and TV shows based on filters or definable values like ratings, certifications or release dates. The discover method make this easy.
* [`/find`](https://developer.themoviedb.org/reference/find-by-id) - The last but still very useful way to find data is with existing external IDs. For example, if you know the IMDB ID of a movie, TV show or person, you can plug that value into this method and we'll return anything that matches. This can be very useful when you have an existing tool and are adding our service to the mix.

Take a look at the [search & query for details](https://developer.themoviedb.org/docs/search-and-query-for-details) page for some basic workflows you might use to search and query data.

====



> ## Documentation Index
> Fetch the complete documentation index at: https://developer.themoviedb.org/llms.txt
> Use this file to discover all available pages before exploring further.

# JSON & JSONP

The only response format we support is JSON.

If you are using a JavaScript library and need to make requests from another public domain, you can use the `callback` parameter which will encapsulate the JSON response in a JavaScript function for you.

```curl Example JSONP Request
curl --request GET \
     --url 'https://api.themoviedb.org/3/search/movie?query=Batman&callback=test' \
     --header 'Authorization: Bearer <<access_token>>' \
     --header 'accept: application/json'
```

=======================



> ## Documentation Index
> Fetch the complete documentation index at: https://developer.themoviedb.org/llms.txt
> Use this file to discover all available pages before exploring further.

# Rate Limiting

> 📘 Legacy Rate Limits
>
> As of December 16, 2019, we have disabled the original API rate limiting (40 requests every 10 seconds.) If you have any questions about this, please head over to our [API support forum](https://www.themoviedb.org/talk/category/5047958519c29526b50017d6).

While our legacy rate limits have been disabled for some time, we do still have some upper limits to help mitigate needlessly high bulk scraping. They sit somewhere in the 40 requests per second range. This limit could change at any time so be respectful of the service we have built and respect the `429` if you receive one.

============



> ## Documentation Index
> Fetch the complete documentation index at: https://developer.themoviedb.org/llms.txt
> Use this file to discover all available pages before exploring further.

# Regions

How does region support work on TMDB?

There's two aspects to regions on TMDB that should be explained. The first is the new `region` parameter.

The region paramater will act as a filter to search for and display matching release date information. This parameter is expected to be an [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-2) code.

For example, if you were searching for the movie Whiplash and wanted to show the German release date (to go with the German translation) you can make a query like so:

```curl Example German Request
curl --request GET \
     --url 'https://api.themoviedb.org/3/search/movie?query=Whiplash&language=de-DE&region=DE' \
     --header 'Authorization: Bearer <<access_token>>' \
     --header 'accept: application/json'
```

In this case, `region` is simply acting as a presentation filter. In the event that we don't have a release date entered for the country you are searching for, we simply default back to the primary release date like always. This is the same as entering no region parameter.

Where this can get pretty amazing is with the `with_release_type` filter that can work in tandum with the `region`. Let's say you were looking for movies that are in the theatres in Germany this week. That's easy, we can now build this query:

```curl Example German Theatrical Request
curl --request GET \
     --url 'https://api.themoviedb.org/3/discover/movie?language=de-DE&region=DE&release_date.gte=2016-11-16&release_date.lte=2016-12-02&with_release_type=2|3' \
     --header 'Authorization: Bearer <<access_token>>' \
     --header 'accept: application/json'
```

You can of course specify any release type as found in [our documentation](https://developer.themoviedb.org/reference/movie-release-dates). If you do not specify `with_release_type` while using the `region` param on discover, `region` simply acts as a filter looking for any movies that match your filter criteria that has at a minimum, one matching release date for the country specified.

### Release Types

| Type | Release              |
| :--- | :------------------- |
| 1    | Premiere             |
| 2    | Theatrical (limited) |
| 3    | Theatrical           |
| 4    | Digital              |
| 5    | Physical             |
| 6    | TV                   |


=====



# Search & Query For Details

Learn how to search and query for a movie.

A common workflow here on TMDB is to search for a movie (or TV show, or person) and then query for the details. Here's a quick overview of what that flow looks like.

## Search

First, you are going to issue a query to one of the movie, TV show or person search methods. We'll use Jack Reacher and the movie method for this example:

```curl Example Search Request
curl --request GET \
     --url 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher' \
     --header 'Authorization: Bearer <<access_token>>'
```

This will return a few fields, the one you want to look at is the `results` field. This is an array and will contain our standard movie list objects. Here's an example of the first item:

```json Example Results Object
{  
  "poster_path": "/IfB9hy4JH1eH6HEfIgIGORXi5h.jpg",  
  "adult": false,  
  "overview": "Jack Reacher must uncover the truth behind a major government conspiracy in order to clear his name. On the run as a fugitive from the law, Reacher uncovers a potential secret from his past that could change his life forever.",  
  "release_date": "2016-10-19",  
  "genre_ids": [  
    53,  
    28,  
    80,  
    18,  
    9648  
  ],  
  "id": 343611,  
  "original_title": "Jack Reacher: Never Go Back",  
  "original_language": "en",  
  "title": "Jack Reacher: Never Go Back",  
  "backdrop_path": "/4ynQYtSEuU5hyipcGkfD6ncwtwz.jpg",  
  "popularity": 26.818468,  
  "vote_count": 201,  
  "video": false,  
  "vote_average": 4.19  
}
```

## Query For Details

With the item above in hand, you can see the id of the movie is `343611`. You can use that id to query the movie details method:

```curl Example Details Query
curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/343611' \
     --header 'Authorization: Bearer <<access_token>>'
```

This will return all of the main movie details as outlined in the movie details documentation. I would also suggest taking a read through the append to response document as it outlines how you can make multiple sub requests in one. For example, with videos:

```curl Example Append Request
curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/11?append_to_response=videos' \
     --header 'Authorization: Bearer <<access_token>>'
```



=============




> ## Documentation Index
> Fetch the complete documentation index at: https://developer.themoviedb.org/llms.txt
> Use this file to discover all available pages before exploring further.

# Tracking Changes

If you're interested in keeping track of the changes as they happen on TMDB, we have designed the "change" system to help with this. There are two aspects to this: first, tracking which ID's were changed and then second, calling those individual changes.

### By Media Type

There are three main endpoints you can call to get a list of changed IDs. The [movie](https://developer.themoviedb.org/reference/changes-movie-list), [person](https://developer.themoviedb.org/reference/changes-people-list) and [TV](https://developer.themoviedb.org/reference/changes-tv-list) change lists. These endpoints will return a list of items that have been changed in the past 24 hours (by default but can be extended to 14 days). With an ID in hand, you can then call the individual item's change history.

### By Media ID

If you have an ID in hand, you can call any of the media ID change endpoints ([here's movies](https://developer.themoviedb.org/reference/movie-changes) for example.) This call will then return the actual field level data that was changed, just like our public change logs you can find on the website. You can either consume these changes in their entirety, or selective grab the data that is important to you.

It's generally a good idea to stay in sync with our changes so you can display the most up to date and accurate information.

=======



> ## Documentation Index
> Fetch the complete documentation index at: https://developer.themoviedb.org/llms.txt
> Use this file to discover all available pages before exploring further.

# Basics

How to build an image URL.

You'll notice that movie, TV and person objects contain references to different file paths. In order to generate a fully working image URL, you'll need 3 pieces of data. Those pieces are a `base_url`, a `file_size` and a `file_path`.

The first two pieces can be retrieved by calling the [/configuration](https://developer.themoviedb.org/reference/configuration-details) API and the third is the file path you're wishing to grab on a particular media object. Here's what a full image URL looks like if the poster\_path of `/1E5baAaEse26fej7uHcjOgEE2t2.jpg` was returned for a movie, and you were looking for the w500 size:

```Text Example
https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
```

Company and network logos are available in two formats, SVG and PNG. All of the `logo_path` fields will return a .png. This is to maintain backwards compatibility since SVG support was added after the fact.

When looking at the image methods there is a new field called `file_type` that will show you the original version of the asset that was uploaded. For SVG's, you should call the original image size since we don't resize them. If you prefer to grab PNG's, you can call any size you wish just like normal.

Take for instance Netflix's logo (`wwemzKWzjKYJFfCeiB57q3r4Bcm.svg`), you can call any of the following:

```Text Example
https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg
https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
```


===========



> ## Documentation Index
> Fetch the complete documentation index at: https://developer.themoviedb.org/llms.txt
> Use this file to discover all available pages before exploring further.

# Basics

How to build an image URL.

You'll notice that movie, TV and person objects contain references to different file paths. In order to generate a fully working image URL, you'll need 3 pieces of data. Those pieces are a `base_url`, a `file_size` and a `file_path`.

The first two pieces can be retrieved by calling the [/configuration](https://developer.themoviedb.org/reference/configuration-details) API and the third is the file path you're wishing to grab on a particular media object. Here's what a full image URL looks like if the poster\_path of `/1E5baAaEse26fej7uHcjOgEE2t2.jpg` was returned for a movie, and you were looking for the w500 size:

```Text Example
https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
```

Company and network logos are available in two formats, SVG and PNG. All of the `logo_path` fields will return a .png. This is to maintain backwards compatibility since SVG support was added after the fact.

When looking at the image methods there is a new field called `file_type` that will show you the original version of the asset that was uploaded. For SVG's, you should call the original image size since we don't resize them. If you prefer to grab PNG's, you can call any size you wish just like normal.

Take for instance Netflix's logo (`wwemzKWzjKYJFfCeiB57q3r4Bcm.svg`), you can call any of the following:

```Text Example
https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg
https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
```

====