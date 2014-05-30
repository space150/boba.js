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

The name of the site.

Example:

```js
tracker = new Boba({
  siteName: 'space150'
})
```

You can also get and set `tracker.siteName`.

#### pageName

Default: `'page'`

The name of the page.

Example:

```js
tracker = new Boba({
  pageName: 'about'
})
```

You can also get and set `tracker.siteName`.

#### defaultCategory, defaultAction, defaultLabel

Default: `null`

The defaults for the category, action, and label.

Example:

```js
tracker = new Boba({
  defaultCategory: "myCategory",
  defaultAction: "myAction",
  defaultLabel: "myLabel"
})
```

If you pass an object to boba#push that does not have a category, action, or label, these values will be used instead.

You can also change these at any time:

```js
tracker.defaultCategory = "Solo"
```

#### watch

Default: `[]`

An array of arguments to apply to Boba's `watch` method on
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

The callback is passed a jQuery event object and should return an object with `category`, `action`, and `label` properties:

```js
{
  category: "category",
  action: "action",
  label: "label"
}
```

Any values not supplied will use defaults from the options (e.g.
`tracker.options.defaultCategory`).

#### trackLinks

`tracker.trackLinks`

This is helper that basically does this:

```js
tracker.watch('click', '.js-track', function (event) {
  return $(event.currentTarget).data();
})
```

You can use these data attributes to set the category, action, and label when using this method:

- `data-ga-category`
- `data-ga-action`
- `data-ga-label`

#### push

`tracker.push`

This can be used to push data manually.

Example:

```js
tracker.push("category", "action", "label")
```

### Class methods

#### cleanValue

`Boba.cleanValue`

#### getGA

`Boba.getGA`


## Contributing

See [the contributing guide](CONTRIBUTING.md).
