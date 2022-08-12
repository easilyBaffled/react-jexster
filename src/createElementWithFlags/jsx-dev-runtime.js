import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';

import { isEnabled } from '../flagging';

// whatIf
export const jsx = (el, props) => {
  if (isEnabled(props['data-feat'])) return _jsx(el, props);
  else return null;
};

export const jsxs = (el, props) => {
  console.log(el, props);
  if (isEnabled(props['data-feat'])) return _jsxs(el, props);
  else return null;
};

export const jsxDEV = jsx;
