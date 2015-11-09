SRC_DIR=src
SRC_FILES=decree.js validators.js
DIST_DIR=dist
TESTS_DIR=tests
FUME=../node_modules/.bin/fume
MOCHA=./node_modules/.bin/mocha
_MOCHA=./node_modules/.bin/_mocha
ISTANBUL=./node_modules/.bin/istanbul
COVERALLS=./node_modules/coveralls/bin/coveralls.js

install:
	npm install

dist_cjs:
	cd src && $(FUME) $(SRC_FILES) -cjsify -o ../$(DIST_DIR)/cjs && cd ..

dist_amd:
	cd src && $(FUME) $(SRC_FILES) -amdify -o ../$(DIST_DIR)/amd && cd ..

rm_dist:
	rm -rf $(DIST_DIR)

dist: rm_dist dist_amd dist_cjs

test: dist
	$(MOCHA) --recursive --reporter spec $(TESTS_DIR)

coverage: dist
	$(ISTANBUL) cover $(_MOCHA) -- --recursive --reporter spec $(TESTS_DIR)

travis: install dist
	$(ISTANBUL) cover --report lcovonly $(_MOCHA) -- --recursive --reporter spec --bail $(TESTS_DIR) && cat ./coverage/lcov.info | $(COVERALLS)
