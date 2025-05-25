/**
 * Experience Component
 * A comprehensive professional experience and education showcase.
 * Features animated skill progress bars, interactive cards, and responsive design.
 * Includes professional work history and educational achievements with detailed skill breakdowns.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Briefcase, School } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

// Professional work experience data
const experiences = [
  {
    title: "Web Developer",
    company: "RIVERBANK CONSTRUCTION LTD",
    type: "Self-employed",
    period: "Apr 2024 - May 2025 · 1 yr 2 mos",
    location: "United Kingdom · Remote",
    description: "Responsible for website maintenance, Cyber Security updates, and ongoing improvements to ensure smooth performance and user experience. Manage Facebook promotion and advertising campaigns to boost online presence and engagement. Also create custom graphics for marketing materials, social media and website content to support branding and customer outreach.",
    skills: ["Customer Service", "Business Analysis", "Social Media", "Facebook", "Adobe Creative Suite", "Figma", "Canva", "Graphic Design", "Problem Solving", "Content Management Systems (CMS)", "Cybersecurity"]
  }
];

// Educational history data with detailed skill progressions
const education = [
  {
    degree: "HND, Web Development & Digital Design",
    institution: "New College Lanarkshire",
    period: "Aug 2024 - Jun 2025",
    grade: "TBA",
    description: "At New College Lanarkshire, I am currently studying towards an HND in Web Development & Digital Design (Aug 2024 – June 2025). Throughout this course, I have developed advanced technical and creative skills in front-end and back-end development, and digital project management. I have worked extensively with HTML5, CSS, JavaScript, jQuery, PHP, and frameworks like Bootstrap, alongside tools such as GitHub, Figma, Canva, VS Code, Word and Monday.com\n\nMy experience includes building interactive games, developing e-commerce platforms, creating user-centred designs, and applying SEO strategies. I have also deepened my knowledge in areas such as Cybersecurity and Content Management Systems like WordPress, UX research, analytical skills, while leading and collaborating on multiple digital projects, as well as doing my college projects, I also have experience building Apps in .Net MAUI, Dart & Flutter Code, Go Daddy and AWS Cloud platforms.",
    skills: ["UX Research", "Oracle Database", "Express.js", "Social Media", "Canva", "Product Development", "Front-End Development", "Search Engine Optimisation (SEO)", "User-centred Design", "Adobe Creative Suite", "Video Production", "Content Management Systems (CMS)", "JavaScript", "Php My Admin", "Leadership", "User Interface Design", "jQuery", "Cascading Style Sheets (CSS)", "Databases", "Flutter", "E-Commerce", "PHP", "Information Technology", "User Experience (UX)", "Off-Page SEO", "Time Management", "Web Design", "Motion Design", "Word Press Design", "UI design", "Research Skills", "Figma (Software)", "Brand Development", "User Experience Design (UED)", "Music Production", "Organisational Development", "Web Development", "Teamwork", "Information Architecture", "Microsoft Office", "Web Services", "Usability Testing", "Facebook", "DJing", "HTML5", "Internet Security", "PHP Applications", "HTML", "Tailwind CSS", "W.A.M.P Stack", "Python (Programming Language)", "Logo Design", "J.A.M stack", "Graphic Design", "Network Security", "Linux", "GitHub", "Adobe Photoshop", "Online Advertising", "Strategic Planning", "Full-Stack Development", "Microsoft Word", "React.js", "Problem Solving", "Git", "Bootstrap", "Software Development"],
    progressSkills: [
      { name: "HTML/CSS", value: 90 },
      { name: "JavaScript", value: 85 },
      { name: "React", value: 80 },
      { name: "PHP", value: 75 },
      { name: "UI/UX Design", value: 85 }
    ]
  },
  {
    degree: "HNC, Web Development & Digital Design",
    institution: "New College Lanarkshire",
    period: "Aug 2023 - Jun 2024",
    grade: "A",
    activities: "Full-stack development, UI/UX design, and digital marketing",
    description: "Comprehensive skill set in Web Development and Digital Design, emphasising proficiency in full-stack development, content management, and graphic design. Specialised in creating responsive, user-friendly websites and digital solutions.",
    skills: [
      "WordPress",
      "phpMyAdmin",
      "After Effects",
      "UI Design",
      "J.A.M Stack",
      "Search Engine Optimisation",
      "Digital Marketing",
      "Content Management",
      "Graphic Design",
      "Web Development",
      "Database Management",
      "Responsive Design",
      "User Experience",
      "Project Management",
      "Version Control"
    ],
    progressSkills: [
      { name: "HTML/CSS", value: 90 },
      { name: "JavaScript", value: 85 },
      { name: "UI Design", value: 80 },
      { name: "WordPress", value: 85 },
      { name: "Digital Marketing", value: 75 }
    ]
  },
  {
    degree: "Digital Media",
    institution: "New College Lanarkshire",
    period: "2022 - 2023",
    grade: "level 4",
    activities: "HTML, CSS, JavaScript, WordPress. Video and Sound editing & Image Editing",
    description: "In my first year at New College Lanarkshire, I gained practical experience in web development and multimedia editing through a series of projects that allowed me to apply a range of technical skills:\n\nWeb Development: Developed and designed websites using HTML, CSS, and JavaScript, with a focus on creating clean, responsive layouts. Enhanced functionality and interactivity through JavaScript, providing a dynamic user experience.\n\nContent Management Systems: Built and customised websites on WordPress, learning how to integrate themes, plugins, and custom code to meet specific requirements.\n\nMultimedia Editing: Gained proficiency in video and sound editing, creating and refining multimedia content to enhance the visual and auditory elements of projects.\n\nImage Editing: Utilised tools like Adobe Photoshop and Canva for image editing, applying skills in photo manipulation, graphic design, and optimisation for web use.",
    skills: ["Video Production", "JavaScript", "Cybercrime Investigation", "Apache", "WordPress Design", "HTML5", "Python (Programming Language)", "Cybersecurity", "Graphic Design", "GitHub", "Full-Stack Development", "CSS Flexbox", "phpMyAdmin"],
    progressSkills: [
      { name: "HTML/CSS", value: 60 },
      { name: "JavaScript", value: 50 },
      { name: "WordPress", value: 65 },
      { name: "Video Editing", value: 75 },
      { name: "Photo Editing", value: 70 }
    ]
  }
];

// Custom hook for managing element visibility and animation states
const useElementOnScreen = (options) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      // Update visibility state whenever the intersection changes
      setIsVisible(entry.isIntersecting);
    }, options);

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return { ref: containerRef, isVisible };
};

// Component for rendering animated skill progress bars
const SkillProgress = ({ skill, isVisible, delay }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeout;
    // Reset progress when not visible to enable re-animation when scrolling back up
    if (!isVisible) {
      setProgress(0);
      return;
    }
    
    // Animate when visible
    if (isVisible) {
      timeout = setTimeout(() => {
        // Slower animation by incrementally updating the progress
        const incrementProgress = () => {
          setProgress(prev => {
            const nextValue = prev + 1;
            if (nextValue >= skill.value) {
              return skill.value;
            }
            setTimeout(incrementProgress, 30); // Slower increment speed
            return nextValue;
          });
        };
        incrementProgress();
      }, delay);
    }
    
    return () => clearTimeout(timeout);
  }, [isVisible, skill.value, delay]);

  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-semibold text-foreground dark:text-white">{skill.name}</span>
        <span className="text-sm font-semibold text-accent dark:text-teal">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

// Main Experience component
const Experience = () => {
  // State management for progress animations
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Intersection observer hooks for various sections
  const { ref: progressSectionRef, className: progressClassName } = useIntersectionObserver({
    direction: 'bottom',
    threshold: 0.1
  });

  // Effect for managing progress animation visibility
  useEffect(() => {
    if (progressSectionRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );

      observer.observe(progressSectionRef.current);
      return () => observer.disconnect();
    }
  }, [progressSectionRef]);

  // Effect for animating progress bars
  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      return;
    }

    if (progress < 100) {
      const incrementProgress = () => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress > 100) return 100;
          return newProgress;
        });
      };

      setTimeout(incrementProgress, 30);
    }
  }, [isVisible, progress]);

  // Refs for animation sections
  const expTitleSection = useElementOnScreen({ threshold: 0.1 });
  const expItemsSection = useElementOnScreen({ threshold: 0.1 });
  const eduTitleSection = useElementOnScreen({ threshold: 0.1 });
  
  // Individual refs for education cards
  const hndCardRef = useElementOnScreen({ threshold: 0.1 });
  const hncCardRef = useElementOnScreen({ threshold: 0.1 });
  const digitalMediaCardRef = useElementOnScreen({ threshold: 0.1 });
  
  // Individual refs for skills sections
  const hndSkillsRef = useElementOnScreen({ threshold: 0.1 });
  const hncSkillsRef = useElementOnScreen({ threshold: 0.1 });
  const digitalMediaSkillsRef = useElementOnScreen({ threshold: 0.1 });

  // Additional intersection observers for various sections
  const experienceRef = useIntersectionObserver({ direction: 'bottom', threshold: 0.1 });
  const educationRef = useIntersectionObserver({ direction: 'bottom', threshold: 0.1 });
  const skillsRef = useIntersectionObserver({ direction: 'bottom', threshold: 0.1 });

  const hndRef = useIntersectionObserver({ direction: 'bottom', threshold: 0.1 });
  const hncRef = useIntersectionObserver({ direction: 'bottom', threshold: 0.1 });
  const digitalMediaRef = useIntersectionObserver({ direction: 'bottom', threshold: 0.1 });

  const frontendRef = useIntersectionObserver({ direction: 'bottom', threshold: 0.1 });
  const backendRef = useIntersectionObserver({ direction: 'bottom', threshold: 0.1 });
  const toolsRef = useIntersectionObserver({ direction: 'bottom', threshold: 0.1 });

  return (
    // Main experience section container
    <section id="experience" className="py-24 bg-background dark:bg-navy text-foreground dark:text-lightSlate">
      <div className="container mx-auto px-6">
        {/* Section header with decorative line */}
        <div className="flex items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-white mr-4">
            <span className="text-black dark:text-teal">03.</span> Experience
          </h2>
          <div className="flex-grow h-px bg-border dark:bg-slate/30"></div>
        </div>
        
        {/* Professional Experience section */}
        <h3 
          ref={expTitleSection.ref} 
          className={`text-xl md:text-2xl font-bold mb-8 text-foreground dark:text-white flex items-center transition-all duration-700 ${
            expTitleSection.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <Briefcase className="mr-2 text-black dark:text-teal" size={24} /> 
          Professional Experience
        </h3>
        
        {/* Experience cards container */}
        <div 
          ref={expItemsSection.ref} 
          className="space-y-12 mb-16"
        >
          {/* Map through experiences to create individual cards */}
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`bg-card dark:bg-navy/50 p-6 rounded-lg border border-border dark:border-slate/10 hover:border-accent dark:hover:border-teal/30 transition-all duration-700 hover:shadow-lg hover:shadow-accent/5 dark:hover:shadow-teal/5 ${
                expItemsSection.isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-1">
                  <div className="flex items-center text-black dark:text-teal mb-2">
                    <Briefcase size={18} className="mr-2 text-black dark:text-teal" />
                    <h3 className="font-bold text-xl text-foreground dark:text-white">{exp.title}</h3>
                  </div>
                  <div className="text-foreground dark:text-lightSlate font-medium mb-1">
                    {exp.company} · {exp.type}
                  </div>
                  <div className="text-black dark:text-slate flex items-center text-sm mb-1 font-medium">
                    <Calendar size={14} className="mr-1 text-black dark:text-slate" /> 
                    {exp.period}
                  </div>
                  <div className="text-black dark:text-slate text-sm font-medium">
                    {exp.location}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <p className="text-foreground dark:text-lightSlate mb-4 font-medium">{exp.description}</p>
                  <div className="mb-2 text-sm font-semibold text-accent dark:text-teal">Skills:</div>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex} 
                        className="px-2 py-1 bg-accent/10 dark:bg-navy border border-accent/30 dark:border-teal/30 text-foreground dark:text-teal text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Education section header */}
        <h3 
          ref={eduTitleSection.ref}
          className={`text-xl md:text-2xl font-bold mb-8 text-foreground dark:text-white flex items-center transition-all duration-700 ${
            eduTitleSection.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <School className="mr-2 text-black dark:text-teal" size={24} /> 
          Education
        </h3>
        
        {/* Education cards container */}
        <div className="space-y-12">
          {/* Map through education data to create individual cards */}
          {education.map((edu, index) => {
            let cardRef;
            let skillsRef;
            
            // Assign the appropriate refs based on the education level
            if (edu.degree.includes('HND')) {
              cardRef = hndCardRef;
              skillsRef = hndSkillsRef;
            } else if (edu.degree.includes('HNC')) {
              cardRef = hncCardRef;
              skillsRef = hncSkillsRef;
            } else {
              cardRef = digitalMediaCardRef;
              skillsRef = digitalMediaSkillsRef;
            }
            
            return (
              <div 
                key={index}
                ref={cardRef.ref}
                className={`bg-card dark:bg-navy/50 p-6 rounded-lg border border-border dark:border-slate/10 hover:border-accent dark:hover:border-teal/30 transition-all duration-700 hover:shadow-lg hover:shadow-accent/5 dark:hover:shadow-teal/5 ${
                  cardRef.isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-20"
                }`}
              >
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center text-black dark:text-teal mb-2">
                        <School size={18} className="mr-2 text-black dark:text-teal" />
                        <h3 className="font-bold text-xl text-foreground dark:text-white">{edu.degree}</h3>
                      </div>
                      <div className="text-foreground dark:text-lightSlate font-medium mb-1">
                        {edu.institution}
                      </div>
                      <div className="text-black dark:text-slate flex items-center text-sm mb-1 font-medium">
                        <Calendar size={14} className="mr-1 text-black dark:text-slate" /> 
                        {edu.period}
                      </div>
                      <div className="text-black dark:text-teal text-sm font-semibold mb-1">
                        Grade: {edu.grade}
                      </div>
                      {edu.activities && (
                        <div className="text-foreground/80 dark:text-slate text-sm font-medium">
                          <strong className="text-foreground dark:text-lightSlate">Activities:</strong> {edu.activities}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-foreground dark:text-lightSlate whitespace-pre-line font-medium">{edu.description}</p>
                    
                    {/* Skills label with improved contrast */}
                    <div className="mb-2 text-sm font-semibold text-black dark:text-teal">Skills:</div>
                    <div className="flex flex-wrap gap-2">
                      {/* For the HND, HNC, and Digital Media cards, show all skills, not just a subset, as this is a portfolio website */}
                      {(edu.degree.includes('HND') || edu.degree.includes('HNC') || edu.degree.includes('Digital Media')
                        ? edu.skills
                        : edu.skills.slice(0, 12)
                      ).map((skill, skillIndex) => (
                        <span 
                          key={skillIndex} 
                          className = {`px-2 py-1 bg-accent/10 dark:bg-navy border border-black dark:border-teal text-foreground dark:text-teal text-xs font-medium rounded-full transition-all duration-500 ${
                            cardRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                          }`}
                          style={{ transitionDelay: `${skillIndex * 50 + 300}ms` }}
                        >
                          {skill}
                        </span>
                      ))}
                      {/* Only show '+X more' badge for cards that are not HND, HNC, or Digital Media */}
                      {(!edu.degree.includes('HND') && !edu.degree.includes('HNC') && !edu.degree.includes('Digital Media') && edu.skills.length > 12) && (
                        <span className="px-2 py-1 bg-accent/10 dark:bg-navy border border-black dark:border-teal text-foreground dark:text-teal text-xs font-medium rounded-full">
                          +{edu.skills.length - 12} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div ref={skillsRef.ref} className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground dark:text-white mb-4">
                        Key Skills Proficiency
                      </h4>
                      <div className="space-y-4">
                        {edu.progressSkills.map((skill, idx) => (
                          <SkillProgress 
                            key={idx} 
                            skill={skill} 
                            isVisible={skillsRef.isVisible} 
                            delay={idx * 150} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
