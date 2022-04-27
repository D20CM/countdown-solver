# Countdown solver

After watching far too many episodes of Countdown lately (OK, it was 8 out of 10 cats does countdown 😜), I thought it would be fun to try and code something that takes all the work out of the letters game. This react app allows you to input the letters that come up on the show, and then suggests the longest words than can be built using only those letters. It's essentially an app for cheating at countdown! It was a fun little project to work on and posed a couple of interesting problems around repeated letters and how to verify/score words containing them. I hope someone can enjoy using it to fraudulently impress their family with their huge vocabulary and speed of mind!

## Caveats

The countdown TV show famously used the _Oxford English Dictionary_ as it's reference for allowable words until 2014, when it was replaced by _Oxford Dictionaries Online_. This countdown solver app uses a list of 466k English words provided in [this repo](https://github.com/dwyl/english-words) , which seems to be based on a smaller list originally published by infochimps [here](https://web.archive.org/web/20131118073324/http://www.infochimps.com/datasets/word-list-350000-simple-english-words-excel-readable) (archived). In my initial use, this word list seems a bit more _forgiving_ than Susie Dent in the Dictionary Corner - I've noticed at least one place name, and several words that seem to be from languages other than English. So please have fun, but take it with a pinch of salt and don't bet the farm on anything provided here!

![Countdown solver screenshot](./public/Screenshot.png "Countdown solver")
