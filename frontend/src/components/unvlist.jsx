import React from 'react';
import slack from '../assets/slack.png';
import amazon from '../assets/amazon.png';
import woocommerce from '../assets/woocommerce.png';
import meundies from '../assets/meundies.png';
import sitepoint from '../assets/sitepoint.png';

const CompanyLogo = () => {
  // Logo array for easy management
  const logos = [amazon, amazon, woocommerce, meundies, sitepoint];

  return (
    <>
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .slide-animation {
          animation: slide 20s linear infinite;
        }
      `}</style>
      
      <section className="w-full bg-gray-50 py-20 overflow-hidden">
        <div className="container mx-auto flex items-center">
          
          {/* Left Side - Title */}
          <div className="shrink-0 px-8">
            <div className="bg-white py-4 px-6 border-l-4 border-green-600 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                <span className="text-green-900">Italian</span> <span className="text-red-900">University</span> <span className="text-red-900">Partners</span>
              </h3>
             
            </div>
          </div>

          {/* Right Side - Scrolling Logos */}
          <div className="flex-1 overflow-hidden relative">
            <div className="flex whitespace-nowrap slide-animation" style={{ width: '200%' }}>
              {/* Original logos */}
              {logos.map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt={`University Partner ${index + 1}`}
                  className="mx-12 h-12 w-48 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              ))}
              
              {/* Duplicate logos for seamless loop */}
              {logos.map((logo, index) => (
                <img
                  key={`duplicate-${index}`}
                  src={logo}
                  alt={`University Partner ${index + 1}`}
                  className="mx-12 h-12 w-48 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default CompanyLogo;