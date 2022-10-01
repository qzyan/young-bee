import { useState, useRef } from 'react';
import axios from 'axios';

function withFavorite(WrappedComponent) {

  return function (props) {
    const { article, currUser } = props;

    if (article) {
      var { _id: articleId, favorited } = article;
    }
    const [isFavorited, setIsFavorited] = useState(favorited);

    const favCountEl = useRef(null);

    async function handleToggleFavorite(e) {
      e.currentTarget.blur()
      // require to be logged in
      if (!currUser) {
        return
      }

      try {
        // send ajax request to toggle favoite
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const url = `${BASE_URL}/articles/${articleId}/favorite`;
        await axios.post(url, {}, {
          headers: {
            'Authentication': `Bearer: ${currUser.token}`
          }
        });
        console.log(isFavorited)

        // toggle the ui
        if (isFavorited) {
          favCountEl.current.innerText = parseInt(favCountEl.current.innerText) - 1;
          setIsFavorited(false)
          return;
        }

        setIsFavorited(true)
        favCountEl.current.innerText = parseInt(favCountEl.current.innerText) + 1
      }
      catch (err) {
        console.log(err)
      }

    };

    return (
      <WrappedComponent handleToggleFavorite={handleToggleFavorite} favCountEl={favCountEl} isFavorited={isFavorited} {...props} />
    )
  }
}

export default withFavorite