'use client'
import DayComponent from '@/app/components/dayComponent/page'
const page = () => {
  // Sample data for demonstration
  const place = 'Jaipur';

  const images = [
    '/images/jaipur1.jpeg',
    '/images/jaipur2.jpeg',
    '/images/jaipur3.jpeg',
  ];

  const description =
    "Jaipur, the capital city of the Indian state of Rajasthan, is renowned for its rich history, vibrant culture, and distinctive architectural marvels. Often referred to as the Pink City due to the terracotta-colored buildings that dominate its historic center, Jaipur is a captivating blend of tradition and modernity.";

  const pointsOfInterest = [
    'Hawa Mahal',
    'Amber Fort',
    'City Palace',
    'Jantar Mantar',
  ];

  const keyFeatures = [
    'Historic Architecture: The city is home to numerous palaces, forts, and monuments that showcase the grandeur of Rajasthans royal past. Amber Fort, Hawa Mahal, and City Palace are among the iconic landmarks that attract visitors from around the world.',
    'Cultural Heritage: Jaipur is a hub of traditional Rajasthani culture, featuring folk music, dance, and art. Visitors can experience the vibrant colors and intricate designs of Rajasthani handicrafts and textiles in local markets.',
    'Cuisine: The local cuisine of Jaipur offers a delectable array of flavors. From spicy Rajasthani curries to sweet treats like Ghewar and Dal Baati Churma, food enthusiasts can explore a diverse range of culinary delights.',
    'Heritage Sites: Jantar Mantar, an astronomical observatory built in the 18th century, is a UNESCO World Heritage Site and a testament to Jaipurs scientific advancements during the time of its construction.',
    'Shopping: Jaipur is famous for its bustling bazaars where one can shop for colorful textiles, gemstones, jewelry, and traditional handicrafts. Johari Bazaar and Bapu Bazaar are popular destinations for shoppers.'
  ];

  return (
    <div>
      <h1 className="mainhead">{place}</h1>

      <div className="carousel">
        {images.map((image, index) => (
          <img
            key={index}
            className={index === 0 ? 'active' : ''}
            src={image}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <div>
        <h2 className="deschead">Description</h2>
        <p className="description">{description}</p>
      </div>

      <div>
        <h2 className="deschead">Key Features</h2>
        <ul className="description">
          {keyFeatures.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="deschead">Points of Interest</h2>
        <ul className="description">
          {pointsOfInterest.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <div>
        <DayComponent/>
      </div>

      <style jsx>{`
        .carousel {
          display: flex;
          overflow: hidden;
        }

        .mainhead {
          font-size: 60px;
          text-align: center;
          font-weight: bold;
          margin: 30px;
        }

        img {
          width: 100%;
          transition: transform 0.5s ease-in-out;
        }

        .deschead {
          font-size: 30px;
          margin: 20px;
        }

        img.active {
          transform: scale(1.2);
        }

        .description {
          margin: 20px;
          font-size: 18px;
        }

        .description li {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default page;
