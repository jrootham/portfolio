global: spiral-package.js lump-package.js

spiral-package.js: spiral.js
	browserify spiral.js -o spiral-package.js

lump-package.js: lump.js
	browserify lump.js -o lump-package.js
