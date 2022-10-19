import axios from 'axios';

export function getArticles(url, limit, offset, token, tag, author) {
  return axios.get(
    url,
    {
      // eslint-disable-next-line object-curly-newline
      params: { limit, offset, tag, author },
      headers: {
        Authentication: `Bearer: ${token}`,
      },
    },
  );
}

export function getProfile() {

}
