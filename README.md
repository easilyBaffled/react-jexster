# React Jexster (name pending)

### A Cleaner JSX Experiment

---

⚠️ **Warning**: This documentation is very much under construction so it may be _a little_ hard to read at times.

This is an experiment to play with ways to cut down on some of the common clutter you may find in a production React App. You could turn something like

```jsx
{
	isEnabled("new-input")
      ? <input placeholder="New Input" />
      : <input placeholder="Existing Input" />
}
```

into

```jsx
<input data-feat="!new-input" placeholder="Existing Input" />
<input data-feat="new-input" placeholder="New Input" />
```

Before diving into how it works, I should note that I'm not 100% sold on my own idea. It makes the code less noisy, allowing the reader to focus on the bigger picture, but it also hides implementation details. I appreciate how explicit common React and hiding that for the sake of cleaner code is not always the best tradeoff.
That said, this is still a fun experiment with many potential applications past booleans.

---

## Inspiration

### "Just JavaScript"

Have you ever wondered why ~_they_~ keep saying React is "*Just JavaScript*™️"?
It really dawned on me while I was playing in the [Babel Sandbox](https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=DwUQHghgtgDgNgUwAQHsB2BhOBLAxgawF4BvACwjQBNEs98BfAPgCgkkAJBOOFJYgdxQAnOJXrNgAenDR4CRkA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=7.18.12&externalPlugins=&assumptions=%7B%7D). Because when you take something like:

```jsx
<Example onClick={handleClick}>
  Hello {world}
</Example>
```

It gets transformed into

```js
import { jsxs as _jsxs } from "react/jsx-runtime";

/*#__PURE__*/
_jsxs(Example, {
  onClick: handleClick,
  children: ["Hello ", world]
});
```

Everything you see in the `JSX` has a direct counterpart in the `JS`. If you wanted to you could write your whole app like:

```js
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

/*#__PURE__*/
_jsxs("form", {
  id: "form",
  onSubmit: console.log,
  children: [/*#__PURE__*/_jsxs("label", {
    children: ["Test field: ", /*#__PURE__*/_jsx("input", {
      name: "text"
    })]
  }), /*#__PURE__*/_jsx("button", {
    type: "submit",
    children: "Submit form"
  })]
});
```

...yeah, thank goodness for JSX.

## `jsx-runtime`

You may have noticed that Babel (or any transformer you use) adds `import { jsx as _jsx } from "react/jsx-runtime";` to the top of every file. React uses `jsx` to transform what we give it into actual DOM elements.

And this is where our fun begins because we can tell our transformer what to use as our JSX Runtime. By adding `/** @jsxImportSource ./myCustomerJSXRuntime */` to the top of _any_ Component file the transformer will pull the `jsx` function from `./myCustomerJSXRuntime/jsx-dev-runtime`.
