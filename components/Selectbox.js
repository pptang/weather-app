// @flow
import * as React from 'react';

type Props = {
  onSelect: Function,
};

function Selectbox(props: Props) {
  return (
    <select
      className="selectbox"
      onChange={event => {
        props.onSelect(event.target.value);
      }}
    >
      <option value="tokyo">Tokyo</option>
      <option value="new york">New York</option>
      <option value="taipei">Taipei</option>
      <option value="sydney">Sydney</option>
      <option value="seoul">Seoul</option>
      <option value="shanghai">Shanghai</option>
      <style jsx>
        {`
          .selectbox {
            height: 30px;
            margin-left: 10px;
            background-color: #ffffff;
          }
        `}
      </style>
    </select>
  );
}

export default Selectbox;
