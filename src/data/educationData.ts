export interface Education {
  id: number;
  institution: string;
  course: string;
  duration: string;
  grade: string;
  description: string;
  skills: string[];
}

export const educationData: Education[] = [
  {
    id: 1,
    institution: "New College Lanarkshire",
    course: "HND, Web Development & Digital Design",
    duration: "Aug 2024 - Jun 2025",
    grade: "TBA",
    description: "At New College Lanarkshire, I am currently studying towards an HND in Web Development & Digital Design. Throughout this course, I have developed advanced technical and creative skills in front-end and back-end development, and digital project management. I have gained extensive experience with various tools and platforms such as GitHub, Figma, Canva, Cursor AI, Word and Monday.com. My experience includes building interactive games, developing e-commerce platforms, creating user-centred designs, and applying SEO strategies. I have also deepened my understanding of web development through hands-on projects. I have also deepened my knowledge in areas such as Cybersecurity and Content Management Systems like WordPress, UX research, analytical skills, while leading and collaborating on multiple digital projects, as well as doing my college projects, I also have experience building Apps in .Net MAUI, Dart & Flutter Code, Go Daddy and AWS Cloud platforms.",
    skills: [
      "UX Research", "Oracle Database", "Express.js", "Social Media", "Canva", 
      "Product Development", "Front-End Development", "Search Engine Optimisation (SEO)", 
      "User-centred Design", "Adobe Creative Suite", "Video Production", 
      "Content Management Systems (CMS)", "JavaScript", "PhpMyAdmin", "Leadership", 
      "User Interface Design", "jQuery", "Cascading Style Sheets (CSS)", "Databases", 
      "Flutter", "E-Commerce", "PHP", "Information Technology", "User Experience (UX)", 
      "Off-Page SEO", "Time Management", "Web Design", "Motion Design", 
      "WordPress Design", "UI design", "Research Skills", "Figma (Software)", 
      "Brand Development", "User Experience Design (UED)", "Music Production", 
      "Organisational Development", "Web Development", "Teamwork", 
      "Information Architecture", "Microsoft Office", "Web Services", 
      "Usability Testing", "Facebook", "DJing", "HTML5", "Internet Security", 
      "PHP Applications", "HTML", "Tailwind CSS", "W.A.M.P Stack", 
      "Python (Programming Language)", "Digital Marketing", "Logo Design", 
      "J.A.M stack", "Graphic Design", "Network Security", "Linux", "GitHub", 
      "Adobe Photoshop", "Online Advertising", "Strategic Planning", 
      "Full-Stack Development", "Microsoft Word", "React.js", "Problem Solving", 
      "Git", "Bootstrap", "Software Development", "Cybersecurity"
    ]
  },
  {
    id: 2,
    institution: "New College Lanarkshire",
    course: "HNC, Web Development & Digital Design",
    duration: "Aug 2023 - Jun 2024",
    grade: "A",
    description: "Comprehensive skill set in Web Development and Digital Design, emphasising proficiency in full-stack development, content management, and graphic design. Specialised in creating responsive, user-friendly websites and digital solutions.",
    skills: [
      "WordPress",
      "phpMyAdmin",
      "After Effects",
      "UI Design",
      "J.A.M stack",
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
    id: 3,
    institution: "New College Lanarkshire",
    course: "Digital Media",
    duration: "2022 - 2023",
    grade: "Level 4",
    description: "In my first year at New College Lanarkshire, I gained practical experience in web development and multimedia editing through a series of projects that allowed me to apply a range of technical skills: Web Development: Developed and designed websites using HTML, CSS, and JavaScript, with a focus on creating clean, responsive layouts. Enhanced functionality and interactivity through JavaScript, providing a dynamic user experience. Content Management Systems: Built and customised websites on WordPress, learning how to integrate themes, plugins, and custom code to meet specific requirements. Multimedia Editing: Gained proficiency in video and sound editing, creating and refining multimedia content to enhance the visual and auditory elements of projects. Image Editing: Utilised tools like Adobe Photoshop and Canva for image editing, applying skills in photo manipulation, graphic design, and optimisation for web use.",
    skills: [
      "Video Production", "JavaScript", "Cybercrime Investigation", "Apache", 
      "WordPress Design", "HTML5", "Python (Programming Language)", "Cybersecurity", 
      "Graphic Design", "GitHub", "Full-Stack Development", "CSS Flexbox", 
      "Php myAdmin"
    ]
  }
]; 