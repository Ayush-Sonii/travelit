import React from 'react';

const DayComponent = () => {
  return (
    <div className="day-container">
      {/* Day Heading */}
      <h1 className="day-heading">Day 1</h1>

      {/* Place and Description Section */}
      <div className="place-section">
        <div className="place-info">
          <h2 className="place-heading">Jantar Mantar</h2>
          <p className="place-description">
          18th-century park & heritage site with fixed instruments for making astronomical observations.
          </p>
        </div>
        <div className="image-container">
          <img
            src="/images/jantar_mantar.jpeg"
            alt="Sample Image"
            className="place-image"
          />
        </div>
      </div>
      <div className="place-section">
        <div className="place-info">
          <h2 className="place-heading">City Palace</h2>
          <p className="place-description">
          Opulent 18th-century palace of Maharaja Sawai Jai Singh II, now a museum & royal residence.
          </p>
        </div>
        <div className="image-container">
          <img
            src="/images/city_palace.jpeg"
            alt="Sample Image"
            className="place-image"
          />
        </div>
      </div>

      <h1 className="day-heading">Day 2</h1>

      {/* Place and Description Section */}
      <div className="place-section">
        <div className="place-info">
          <h2 className="place-heading">Jantar Mantar</h2>
          <p className="place-description">
          18th-century park & heritage site with fixed instruments for making astronomical observations.
          </p>
        </div>
        <div className="image-container">
          <img
            src="/images/centralpark.jpeg"
            alt="Sample Image"
            className="place-image"
          />
        </div>
      </div>
      <style jsx>{`
        .day-container {
          margin: 20px;
          padding: 20px;
          width:70%;
          border: 1px solid #ccc;
        }

        .day-heading {
          font-size: 30px;
          text-align: center;
          font-weight:bold;
        }

        .place-section {
          display: flex;
          margin-top: 20px;
          height:100px;
        }

        .place-info {
          flex: 1;
        }

        .place-heading {
          font-size: 28px;
          margin-bottom: 10px;
          color:red;
        }

        .place-description {
          font-size: 16px;
        }

        .image-container {
          flex: 1;
          margin-left: 20px;
          display:flex;
          justify-content:flex-end;
          margin-top:15px;
        }

        .place-image {
          width: 50%;
          height:130%;
          border-radius: 8px;
          display:flex;
          margin-top:-20px;
          justify-content:flex-end;
        }
      `}</style>
    </div>
  );
};

export default DayComponent;
