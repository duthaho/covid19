import React from "react";

function Map({ lat, lng }) {
  return (
    <div className="container-border">
      <div className="gray-container">
        <iframe
          title="address"
          width="100%"
          height="350"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={`http://maps.google.com/maps?z=20&t=m&q=loc:${lat}+${lng}&output=embed`}
        ></iframe>
        <br />
      </div>
    </div>
  );
}

export default React.memo(Map);
