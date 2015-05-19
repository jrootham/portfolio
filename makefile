global: spiral-package.js lump-package.js chase-package.js

spiral-package.js: spiral.js
	browserify spiral.js -o spiral-package.js

lump-package.js: lump.js
	browserify lump.js -o lump-package.js

chase-package.js: build/chase.js
	browserify build/chase.js -o chase-package.js

build/chase.js: src/chase.js
	jsx src build

