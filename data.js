/* ==========================================================================
   SITE CONTENT: EDIT THIS FILE TO CHANGE ANYTHING ON THE WEBSITE
   --------------------------------------------------------------------------
   Everything you see on the site (name, photo, links, bio, skills, projects,
   achievements) is read from this one object. You never need to touch the
   HTML or CSS to update your content.

   Tips
   - Keep the quotes "like this" and the commas at the end of each line.
   - To remove an item, delete its whole { ... }, block.
   - To add an item, copy an existing { ... }, block and change the text.
   ========================================================================== */

window.SITE = {

  /* ---------- Basic info ---------- */
  name: "Ahmed Rabea",
  title: "AI Enthusiast | Technology & Software Development",
  photo: "assets/images/profile.jpg",          // replace the file, or point to another path
  photoAlt: "Portrait of Ahmed Rabea",
  intro:
    "Egyptian young technology enthusiast interested in Artificial Intelligence, software development, and entrepreneurship.",

  /* ---------- Contact and social links ---------- */
  links: {
    linkedin: "https://www.linkedin.com/in/ahmed-rabea-61365b44a",
    facebook: "https://www.facebook.com/share/1A5Lb2jEHd/",
    whatsappNumber: "+201015180949",           // shown on the page
    whatsapp: "https://wa.me/201015180949",    // used by the button
    email: "rabea0279@gmail.com",
    cv: ""                                     // optional: e.g. "assets/Ahmed-Rabea-CV.pdf". Leave "" to hide the button
  },

  /* ---------- About ---------- */
  about: {
    heading: "About me",
    paragraphs: [
      "My name is Ahmed Rabea. I am an Egyptian young technology enthusiast interested in Artificial Intelligence, software development, and entrepreneurship.",
      "I am passionate about learning modern technologies, building digital products, attending technology and entrepreneurship events, and connecting with people in the technology ecosystem.",
      "I am particularly interested in Artificial Intelligence, software development, Flutter and Dart, and exploring how technology can be used to build useful products and solve real-world problems."
    ],
    interests: [
      "Artificial Intelligence",
      "Technology",
      "Software development",
      "Entrepreneurship"
    ]
  },

  /* ---------- Skills (add or remove freely) ---------- */
  skills: [
    "Artificial Intelligence",
    "Software Development",
    "Flutter",
    "Dart",
    "Programming",
    "Technology & Innovation",
    "Entrepreneurship"
  ],

  /* ---------- Projects ----------
     While this list is empty the site shows placeholder cards.
     To add a project, copy this template into the list below:

     {
       name: "Project name",
       description: "One or two sentences about what it does.",
       tech: ["Flutter", "Dart"],
       image: "assets/images/projects/my-project.jpg",   // optional
       link: "https://example.com",                       // optional
       linkLabel: "View project"                          // optional
     },
  */
  projects: [
  ],

  /* ---------- Achievements, events, certificates, experience ----------
     While this list is empty the site shows a placeholder.
     To add an entry, copy this template into the list below:

     {
       type: "Event",                  // Event, Competition, Certificate, Experience, ...
       title: "Title of the entry",
       organization: "Organizer or issuer",
       date: "2026",
       description: "One line about it.",   // optional
       link: "https://example.com"          // optional, e.g. certificate link
     },
  */
  achievements: [
  ],

  /* ---------- Section settings ---------- */
  settings: {
    // true  = show placeholder cards in Projects / Achievements while they are empty
    // false = hide those sections (and their menu links) until you add content
    showPlaceholders: true,
    defaultTheme: "system"      // "system", "light" or "dark"
  },

  /* ---------- Text labels (navigation and buttons) ---------- */
  labels: {
    nav: { about: "About", skills: "Skills", projects: "Projects", achievements: "Achievements", contact: "Contact" },
    skillsHeading: "Skills",
    projectsHeading: "Projects",
    achievementsHeading: "Achievements and experience",
    contactHeading: "Let's connect",
    contactText: "Open to conversations about technology, AI, software projects and entrepreneurship."
  }
};
