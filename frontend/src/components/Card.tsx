import { useState } from "react";

function Card({image, title, description}: {image: string, title: string, description: string}) {
    const [expanded, setExpanded] = useState(false);
    const shortDescription = description.slice(0, 100);
    const handleClick = () => {
      setExpanded(!expanded);
    }
  
    return (
  
        <div className="m-4 w-[75%] lg:w-[40%] rounded-lg flex justify-center flex-wrap bg-white shadow-md d-flex">
          <img className="object-contain p-4" src={image} alt={title} />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
            <p className="mb-3 text-sm font-normal text-justify">
              {expanded ? description : shortDescription}
              {description.length > 100 && !expanded && (
                <span>...<button className="bg-transparent ml-1" onClick={handleClick}>Read more</button></span>
              )}
              {expanded && (
                <button className="bg-transparent ml-1" onClick={handleClick}>Read less</button>
              )}
            </p>
          </div>
        </div>
  
    );
  }

  export default Card;