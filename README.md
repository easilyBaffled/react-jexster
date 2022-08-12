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
