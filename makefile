REPORTER = spec

test:
	@NODE_ENV=test \
	./node_modules/.bin/mocha \
	--recursive \
	--reporter $(REPORTER) \

test-w:
	@NODE_ENV=test \
	./node_modules/.bin/mocha \
	--recursive \
	--reporter $(REPORTER) \
	--watch \

coverage:
	npm test --coverage


.PHONY: test test-w coverage