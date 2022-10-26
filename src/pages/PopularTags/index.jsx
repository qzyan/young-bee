/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TagsList from '../../components/TagsList';

export default function PopularTags(props) {
  const { setFeedsType } = props;
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    async function getTags() {
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      const url = `${BASE_URL}/tags`;
      const res = await axios.get(url);
      const { data: { tags } } = res;
      setTagList(tags);
    }

    getTags();
  }, []);
  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>
        <TagsList tagList={tagList} isOutline={false} setFeedsType={setFeedsType} />
      </div>
    </div>
  );
}
