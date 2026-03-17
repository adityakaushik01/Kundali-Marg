import React, { useState, useEffect } from 'react';

const Stars = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate random stars with more variety
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 200; i++) { // More stars
        const starType = Math.random();
        newStars.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: Math.random() * 4 + 1, // Larger stars (1-5px)
          opacity: Math.random() * 0.9 + 0.3, // Higher opacity range
          // Different star types for variety
          type: starType < 0.7 ? 'twinkle' : starType < 0.9 ? 'glow' : 'shooting',
          delay: Math.random() * 8, // Random animation delay
          duration: 1 + Math.random() * 4 // Random animation duration
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced Stars */}
      {stars.map(star => {
        if (star.type === 'shooting') {
          return (
            <div
              key={star.id}
              className="absolute w-1 h-8 bg-gradient-to-b from-white to-transparent opacity-60 transform rotate-45"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animation: `shooting 4s linear infinite`,
                animationDelay: `${star.delay}s`,
                animationFillMode: 'both'
              }}
            />
          );
        }
        
        if (star.type === 'glow') {
          return (
            <div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animation: `glow ${star.duration}s ease-in-out infinite alternate ${star.delay}s`
              }}
            />
          );
        }
        
        // Default twinkling stars
        return (
          <div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out infinite ${star.delay}s`
            }}
          />
        );
      })}

      {/* Floating particles for extra effect */}
      {Array.from({ length: 30 }, (_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-blue-200 rounded-full opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`
          }}
        />
      ))}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes shooting {
          0% {
            transform: translateY(-150px) rotate(180deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(200px) rotate(180deg);
            opacity: 0;
          }
        }
        
        @keyframes glow {
          0% {
            box-shadow: 0 0 6px rgba(255, 255, 255, 0.6), 0 0 12px rgba(255, 255, 255, 0.3);
            transform: scale(1);
            opacity: 0.7;
          }
          100% {
            box-shadow: 0 0 12px rgba(255, 255, 255, 1), 0 0 24px rgba(255, 255, 255, 0.6);
            transform: scale(1.3);
            opacity: 1;
          }
        }
        
        @keyframes twinkle {
          0% {
            opacity: 0.4;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0.4;
            transform: scale(0.9);
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-15px) translateX(8px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-20px) translateX(12px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default Stars;