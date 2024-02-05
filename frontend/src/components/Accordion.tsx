import { useState } from 'react';

function Accordion({ header, content }: {header: string; content: string}) {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="container hover:bg-blue-200 transition duration-300 border-b py-4">
        <div className={`flex items-center justify-between px-4 py-2 cursor-pointer ${isOpen ? "open" : ""}`} onClick={toggleAccordion}>
          <h3 className="text-start font-semibold me-2">{header}</h3>
          <svg
            className={`w-5 h-5 transform ${isOpen ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div className={`px-4 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
          <p className="text-base font-normal text-start">{content}</p>
        </div>
      </div>
    );
  }
export default Accordion;
