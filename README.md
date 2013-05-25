# Astral Pass

Pass system for [Astral](https://github.com/btford/astral-pass).

## Pass Types

There are two kinds of passes: `info`, and `transform`.

### Info
Info passes operate on a copy of the AST,
but are allowed to modify the `info` object passed into the function as a parameter.

```javascript
myPass.
  info(function (chunk, info) {
    info.foo = 'bar'; // persists

    chunk.foo = 'bar'; // does not persist
  });
```

### Transform
Transforms, on the other hand, allow you to modify the structure of the part of the AST that the pass matches,
but prevents you from making changes to the `info` parameter.

```javascript
myPass.
  info(function (chunk, info) {
    info.foo = 'bar'; // does not persist

    chunk.foo = 'bar'; // persists
  });
```

## Example

Below is a simple example.

```javascript
var myPass = require('astral-pass')();

myPass.name = 'myPass';
myPass.prereqs = [ /* other pass names here */ ];

myPass.
  when({
    // ... AST chunk
  }).
  when(function (chunk, info) {
    // return true or false
  }).
  transform(function (chunk, info) {

  });
```

## More Complicated Passes

You can introduce more complicated behavior by composing passes.
This is done by modifying a pass's `prereques` property.

```javascript
var astralPass = require('astral-pass');

// p1 needs some info to do its transformations

var p1 = astralPass();
p1.name = 'myPass';
p1.prereqs = [ 'p2' ];

p1.
  when( ... ).
  transform( ... );

// p2 gathers the info for p1

var p2 = astralPass();
p2.name = 'myPass';

p2.
  when( ... ).
  info( ... );

```

I recommend namespacing passes with `:`.

## License
MIT
