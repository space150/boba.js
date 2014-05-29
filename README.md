# boba.js

## API

Create a new instance of Boba

```js
tracker = new Boba
```

### Constructor options

All options are optional.

#### siteName

Default: `'site'`

The name of the site. Can be accessed with `tracker.getSiteName`.

Example:

```js
tracker = new Boba({
  siteName: 'space150'
})
```

#### pageName

Default: `'page'`

The name of the page. Can be accessed with `tracker.getPageName`.

Example:

```js
tracker = new Boba({
  pageName: 'about'
})
```

#### defaultCategory, defaultAction, defaultLabel

Default: `null`

The defaults for the category, action, and label.

Example:

```js
tracker = new Boba({
  defaultCategory: "myCategory"
})
```

#### watch

Default: `[]`

An array of arguments to apply to the Boba's `watch` method on
initialization.

Example:

```js
tracker = new Boba({
  watch: [
    ['click', '.js-track-foo', trackFoo],
    ['click', '.js-track-bar', trackBar]
  ]
})
```

### Instance methods

#### watch

`tracker.watch(eventType, selector, callback)`

This is basically syntactic sugar for:

```js
$('body').on(eventType, selector, function(event) {
  tracker.push(callback(event))
}
```

Example:

```js
tracker.watch('select', '.js-track-select', trackSelect)
```

The callback is passed a jQuery event object and should return an object like
the following:

```js
{
  category: "category",
  action: "action",
  label: "label"
}
```

Any values not supplied will use defaults from the options (e.g.
tracker.options.defaultCategory). These default to null.

#### trackLinks

`tracker.trackLinks`

This is syntactic sugar doing something like this:

```js
tracker.watch('click', '.js-track', function (event) {
  return $(event.target).data();
})
```

TODO: write about data attributes.

#### push

`tracker.push`

This can be used to push data manually.

#### setPageName

`tracker.setPageName`

#### getPageName

`tracker.getPageName`

#### setSiteName

`tracker.setSiteName`

#### getSiteName

`tracker.getSiteName`


### Class methods

#### cleanValue

`Boba.cleanValue`

#### getGA

`Boba.getGA`


## Contributing

See [the contributing guide](CONTRIBUTING.md).
