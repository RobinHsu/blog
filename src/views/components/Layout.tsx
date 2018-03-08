import * as React from 'react';
import Null from './Null';

export default (props) => {
  return (
    <Null>
      <div className="left-col">
        <header id="header">
          <div className="my-picture">
            <a href="/" aria-label="Home"></a>
          </div>
        </header>
      </div>
      <div className="mid-col">
        {props.children}
      </div>
    </Null>
  );
};
