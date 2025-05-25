import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TradingBotDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background dark:bg-navy py-12">
      <div className="container mx-auto px-6">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-foreground dark:text-lightSlate hover:text-teal dark:hover:text-teal mb-8 transition-colors duration-300"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Projects
        </button>

        {/* Project header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground dark:text-lightestSlate mb-4">
            Trading Bot Platform
          </h1>
          <p className="text-lg text-foreground/70 dark:text-lightSlate">
            An advanced trading bot that analyses historical price data, calculates technical indicators, and generates trading signals.
          </p>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column - Project details */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground dark:text-lightestSlate mb-6">
              Project Overview
            </h2>
            <div className="space-y-6 text-foreground/70 dark:text-lightSlate">
              <p>
                This trading bot platform provides sophisticated market analysis tools and automatic trading capabilities. Developed using up-to-date web technologies, it offers processing of live market data and technical analysis.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground dark:text-lightestSlate mt-8 mb-4">
                Key Features
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Live market data analysis</li>
                <li>RSI (Relative Strength Index) calculations</li>
                <li>Moving averages and trend analysis</li>
                <li>Automatic generation of trading signals</li>
                <li>Interactive charts and visualisations</li>
                <li>Historical data analysis</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground dark:text-lightestSlate mt-8 mb-4">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Chart.js", "Technical Analysis"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-secondary dark:bg-navy/60 text-foreground dark:text-lightSlate rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Media gallery */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground dark:text-lightestSlate mb-6">
              Project Gallery
            </h2>
            
            {/* Main image */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/assets/images/bot1.png"
                alt="Trading Bot Dashboard"
                className="w-full h-auto"
              />
            </div>

            {/* Video demo */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <video
                controls
                className="w-full"
                poster="/assets/images/bot1.png"
              >
                <source src="/assets/videos/botvideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Additional images */}
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/assets/images/bot2.png"
                alt="Technical Analysis"
                className="rounded-lg shadow-lg"
              />
              <img
                src="/assets/images/bot3.png"
                alt="Market Overview"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingBotDetails; 