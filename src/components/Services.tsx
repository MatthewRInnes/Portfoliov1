/**
 * Services Component
 * A showcase of professional services offered with dynamic image loading and animations.
 * Features a responsive grid layout with interactive cards and loading states.
 */

import React, { useState, useEffect } from 'react';
import { Code2, Database, Layout, Server, Smartphone, Globe, Shield, Zap } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const Services = () => {
  // State management for images and loading status
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Intersection observers for animation triggers
  const titleRef = useIntersectionObserver({ direction: 'bottom', threshold: 0.1 });
  const descriptionRef = useIntersectionObserver({ direction: 'bottom', threshold: 0.1 });
  
  // Individual service card animation references
  const service1Ref = useIntersectionObserver({ direction: 'left', threshold: 0.1 });
  const service2Ref = useIntersectionObserver({ direction: 'right', threshold: 0.1 });
  const service3Ref = useIntersectionObserver({ direction: 'left', threshold: 0.1 });
  const service4Ref = useIntersectionObserver({ direction: 'right', threshold: 0.1 });
  const service5Ref = useIntersectionObserver({ direction: 'left', threshold: 0.1 });
  const service6Ref = useIntersectionObserver({ direction: 'right', threshold: 0.1 });
  const service7Ref = useIntersectionObserver({ direction: 'left', threshold: 0.1 });
  const service8Ref = useIntersectionObserver({ direction: 'right', threshold: 0.1 });
  
  // Map of service references for animation control
  const serviceRefs = {
    0: service1Ref,
    1: service2Ref,
    2: service3Ref,
    3: service4Ref,
    4: service5Ref,
    5: service6Ref,
    6: service7Ref,
    7: service8Ref,
  };

  // Array of available services with their details
  const services = [
    {
      title: "Web Development",
      description: "Creating responsive and modern web applications using the latest technologies.",
      icon: <Code2 className="w-6 h-6" />,
      query: "web development code"
    },
    {
      title: "Database Design",
      description: "Designing efficient and scalable database solutions for your applications.",
      icon: <Database className="w-6 h-6" />,
      query: "database server"
    },
    {
      title: "UI/UX Design",
      description: "Crafting intuitive and engaging user interfaces with modern design principles.",
      icon: <Layout className="w-6 h-6" />,
      query: "ui design interface"
    },
    {
      title: "Backend Development",
      description: "Building robust and scalable server-side applications and APIs.",
      icon: <Server className="w-6 h-6" />,
      query: "backend server code"
    },
    {
      title: "Mobile Development",
      description: "Developing cross-platform mobile applications for iOS and Android.",
      icon: <Smartphone className="w-6 h-6" />,
      query: "mobile app development"
    },
    {
      title: "Cloud Solutions",
      description: "Implementing cloud-based solutions for scalability and reliability.",
      icon: <Globe className="w-6 h-6" />,
      query: "cloud computing server"
    },
    {
      title: "Security",
      description: "Implementing robust security measures to protect your applications.",
      icon: <Shield className="w-6 h-6" />,
      query: "cybersecurity protection"
    },
    {
      title: "Performance Optimisation",
      description: "Optimising applications for maximum speed and efficiency.",
      icon: <Zap className="w-6 h-6" />,
      query: "performance optimisation speed"
    }
  ];

  // Effect hook for fetching service-related images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagePromises = services.map(service => {
          const query = encodeURIComponent(service.query);
          // Fetch 5 images and pick one at random for more variety
          return fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=5`, {
            headers: {
              'Authorization': import.meta.env.VITE_PEXELS_API_KEY
            }
          })
          .then(response => response.json())
          .then(data => {
            if (data.photos && data.photos.length > 0) {
              const randomIndex = Math.floor(Math.random() * data.photos.length);
              return data.photos[randomIndex].src.large;
            }
            return null;
          })
          .catch(() => null);
        });

        const results = await Promise.all(imagePromises);
        setImages(results);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Fallback images for when API calls fail
  const defaultImages = [
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1598128558393-70ff21433be0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ];

  return (
    // Main services section container
    <section id="services" className="py-24 bg-background dark:bg-navy">
      <div className="container mx-auto px-6">
        {/* Section header with decorative line */}
        <div className="flex items-center mb-12">
          <h2 
            ref={titleRef.ref}
            className={`text-2xl md:text-3xl font-bold text-foreground dark:text-lightestSlate mr-4 transition-all duration-700 ${titleRef.className}`}
          >
            <span className="text-teal">03.</span> Services
          </h2>
          <div className="flex-grow h-px bg-border dark:bg-slate/30"></div>
        </div>

        {/* Section description */}
        <p 
          ref={descriptionRef.ref}
          className={`text-lg text-foreground/70 dark:text-lightSlate mb-12 max-w-3xl transition-all duration-700 ${descriptionRef.className}`}
        >
          I offer a comprehensive range of services to help bring your digital projects to life. From web development to cloud solutions, I'm here to help you achieve your goals.
        </p>

        {/* Services grid layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const cardRef = serviceRefs[index];
            const imageUrl = images[index] || defaultImages[index];
            
            return (
              // Individual service card with animation
              <div 
                key={index}
                ref={cardRef.ref}
                className={`bg-white dark:bg-navy/80 rounded-lg overflow-hidden shadow-lg border border-border dark:border-slate/20 transition-all duration-700 ${cardRef.className}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Card image container with loading state */}
                <div className="relative h-48">
                  {loading ? (
                    <div className="w-full h-full bg-secondary dark:bg-navy/60 animate-pulse"></div>
                  ) : (
                    <img 
                      src={imageUrl} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    {service.icon}
                  </div>
                </div>
                
                {/* Card content container */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground dark:text-lightestSlate mb-2">
					{service.title}
                  </h3>
                  <p className="text-foreground/70 dark:text-lightSlate">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Image attribution footer */}
        <div className="mt-12 text-center text-sm text-foreground/50 dark:text-slate/50">
          Images powered by <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">Pexels</a>
        </div>
      </div>
    </section>
  );
};

export default Services;
