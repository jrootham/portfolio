global: spiral-package.js lump-package.js chase-package.js

spiral-package.js: spiral.js
	browserify spiral.js -o spiral-package.js

lump-package.js: lump.js
	browserify lump.js -o lump-package.js

chase-package.js: build/chase.js
	browserify build/chase.js -o chase-package.js

build/chase.js: src/chase.js
	jsx src build

install: global
	scp index.html jrootham@tjddev.net:docroot/portfolio
	scp basic.html basic.css jrootham@tjddev.net:docroot/portfolio
	scp spiral.html spiral.css spiral-package.js jrootham@tjddev.net:docroot/portfolio
	scp lump.html lump.css lump-package.js jrootham@tjddev.net:docroot/portfolio
	scp chase.html chase.css chase-package.js jrootham@tjddev.net:docroot/portfolio