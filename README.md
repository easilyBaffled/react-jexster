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

I don't have any intention of writing my own JSX function. I think what we get from React is plenty good. But would like to add a few things. So rather than come up with a new `jsx` I am trying to wrap it with additional functionality. I've written:

```js
import { jsx as _jsx } from 'react/jsx-runtime';

import { isEnabled } from '../flagging';

export const jsx = (el, props) => {
  if (isEnabled(props['data-feat'])) return _jsx(el, props);
  else return null;
};
```

Essentially I've written a Feature Flagging utility. I am intercepting the props and determining if the element should render. For example, in normal situations you would write:

```jsx
{
	isEnabled("new-input")
		? <input placeholder="New Input" />
		: <input placeholder="Existing Input" />
}
```

or

```jsx
<Toolbar>
  {isEnabled("sandbox") && <NavButton to="sandbox">Sandbox</NavButton>}
  <NavButton to="projects">Projects</NavButton>
  <NavButton to="profile">Profile</NavButton>
</Toolbar>
```

These are not bad by any means. But when you've got a lot of `isEnabled` thrown about, it can get noisy. By by moving the check into the `jsx` function, those two examples become:

```jsx
<input data-feat="!new-input" placeholder="Existing Input" />
<input data-feat="new-input" placeholder="New Input" />
```

and

```jsx
<Toolbar>
	<NavButton data-feat="sandbox" to="sandbox">Sandbox</NavButton>}
	<NavButton to="projects">Projects</NavButton>
	<NavButton to="profile">Profile</NavButton>
</Toolbar>
```

As I mentioned above, I'm not 100% behind this yet, because it goes against the common conventions for what will and will not render. But there's more you could do beyond feature flagging. There are so many other possibilities! For example:

- Intercept `children` and run translation on an element-by-element basis.
- Tag elements for analytic tracking
- ...
