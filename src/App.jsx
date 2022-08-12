/** @jsxImportSource ./createElementWithFlags */
import { isEnabled } from './flagging';

// https://github.com/facebook/react/blob/cae635054e17a6f107a39d328649137b83f25972/packages/react/src/jsx/ReactJSX.js
// https://github.com/facebook/react/blob/cae635054e17a6f107a39d328649137b83f25972/packages/react/jsx-runtime.js
// https://babeljs.io/docs/en/babel-plugin-transform-react-jsx
// https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html

const JexsterExample = () => (
  <div>
    <input data-feat="!new-input" placeholder="Existing Input" />
    <input data-feat="new-input" placeholder="New Input" />
  </div>
);

const ExistingExample = () => (
  <div>
    {isEnabled('new-input') ? (
      <input placeholder="New Input" />
    ) : (
      <input placeholder="Existing Input" />
    )}
  </div>
);

export default function App() {
  return (
    <div className="App" data-cy="a">
      <h3>Jexster Example</h3>
      <JexsterExample />
      <h3>Existing Example</h3>
      <ExistingExample />
    </div>
  );
}
