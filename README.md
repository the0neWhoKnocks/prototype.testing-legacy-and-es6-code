# Testing with ES6 integration

A boilerplate example demonstrating loading & transpiling of ES6 files into
Karma for testing.

The structure of everything is setup in a legacy format to aid in testing a
more complex setup (ie - source files, tests, and vendor libs are in separate
directories).

---

## Installation

```sh
npm i
```

---

## Running Tests

```sh
# with npm
npm test [--] [args]

# raw karma (if it's not installed globally)
./node_modules/.bin/karma start ./karma.conf.js [args]
```

Custom flags were added to the `karma.conf` to make things a little easier. You
can view those extra options by running the below commands. Take note that `help`
is a reserved flag for Karma, so `halp` is used instead.

```sh
npm test -- --halp

# OR

./node_modules/.bin/karma start ./karma.conf.js --halp
```

If you want to run individual test files you can execute the below.

```sh
npm test -- -f Es6Class

# Or maybe you need to run multiple files

npm test -- -f es5/Es5Class,Es6Class

# The preceding directory isn't necessary unless the test files share the same name.
```

---

## Notes

- For Windows users, I'd suggest running with [ConEmu](https://conemu.github.io/).
If you use Cygwin, and start karma with the `watch` command, and then `CTRL+C` to
kill the process, you'll be left with a zombie `node` & `phantomjs` process, which
will lead to buggy behavior if you spin up a watch process again. ConEmu allows
for an interactive shell, and also kills all processes properly.
