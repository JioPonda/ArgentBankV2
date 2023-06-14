import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <main>
      <div className="containerTextErrorAndLink">
        <div className="containerTextError">
          <p className="textError">Error 404</p>
          <p className="textErrorContinuation">Assets not found</p>
        </div>
        <div className="containerLinkError">
          <Link to="/Home">
            <p className="textLinkError">Return to the home page</p>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Error;
