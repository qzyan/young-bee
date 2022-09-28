/*
create a function that
init currUser
update currUser
*/

// init state
const initState = null;
export default function currUserReducer(prevState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case 'login':
      return data;
    case 'logout':
      return data;
    default:
      return prevState;
  }
}