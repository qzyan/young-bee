/* eslint-disable default-param-last */
const initState = false;
export default function dialogReducer(prevState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case 'closeSigninDialog':
      return data;
    case 'openSigninDialog':
      return data;
    default:
      return prevState;
  }
}
