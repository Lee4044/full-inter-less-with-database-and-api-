import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const courses = [
    {
      id: 'word-basics',
      title: 'Word Microsoft Basics',
      description: 'Learn the fundamentals of Microsoft Word',
      image: '/word-icon.svg',
      duration: '4 hours',
      level: 'Beginner',
      lessons: [
        { id: 0, title: 'Creating a New Document', content: 'Learn how to create and save a new Word document.' },
        { id: 1, title: 'Working with Tables', content: 'Learn how to insert and format tables in Word.' },
        { id: 2, title: 'Text Formatting', content: 'Master fonts, colors, and paragraph styles.' },
        { id: 3, title: 'Working with Images', content: 'Insert and edit images within your document.' },
        { id: 4, title: 'Page Setup', content: 'Learn headers, footers, and page layout settings.' }
      ]
    },
    {
      id: 'excel-beginners',
      title: 'Excel for Beginners',
      description: 'Master the basics of Excel spreadsheets',
      image: '/excel-icon.svg',
      duration: '6 hours',
      level: 'Beginner',
      lessons: [
        { id: 0, title: 'Excel Interface', content: 'Introduction to Excel interface and navigation.' },
        { id: 1, title: 'Entering Data', content: 'Learn how to input and manage data in cells.' },
        { id: 2, title: 'Formulas & Functions', content: 'Basic formulas and functions in Excel.' },
        { id: 3, title: 'Charts', content: 'Create charts to visualize your data.' },
        { id: 4, title: 'Printing & Sharing', content: 'Learn how to print and share your Excel sheets.' }
      ]
    },
    {
      id: 'computer-basics',
      title: 'Computer Basics & Windows',
      description: 'Essential computer skills and Windows fundamentals',
      image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=400&h=250&fit=crop',
      duration: '3 hours',
      level: 'Beginner',
      lessons: [
        { id: 0, title: 'Computer Hardware', content: 'Introduction to computer components.' },
        { id: 1, title: 'Windows OS Basics', content: 'Learn to navigate Windows operating system.' },
        { id: 2, title: 'File Management', content: 'Create, save, and organize files and folders.' },
        { id: 3, title: 'Basic Settings', content: 'Adjust settings and personalize your PC.' }
      ]
    },
    {
      id: 'powerpoint-essentials',
      title: 'PowerPoint Essentials',
      description: 'Create professional presentations with PowerPoint',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
      duration: '3 hours',
      level: 'Beginner',
      lessons: [
        { id: 0, title: 'PowerPoint Interface', content: 'Learn the basics of the PowerPoint interface.' },
        { id: 1, title: 'Adding Slides & Content', content: 'Create slides and add text, images, and videos.' },
        { id: 2, title: 'Design & Themes', content: 'Apply designs, themes, and layouts.' },
        { id: 3, title: 'Animations & Transitions', content: 'Enhance presentations with animations and transitions.' }
      ]
    },
    {
      id: 'internet-email-basics',
      title: 'Internet & Email Basics',
      description: 'Navigate the internet and manage email effectively',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
      duration: '2 hours',
      level: 'Beginner',
      lessons: [
        { id: 0, title: 'Browsing the Web', content: 'Learn to use web browsers efficiently.' },
        { id: 1, title: 'Search Engines', content: 'Use search engines to find information quickly.' },
        { id: 2, title: 'Email Basics', content: 'Create and manage your email account.' },
        { id: 3, title: 'Sending & Receiving Emails', content: 'Learn to compose, send, and receive emails.' }
      ]
    }
  ];

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title" style={{color: '#FFFFFF'}}>Welcome to Smart Way - Tech</h1>
          <p className="hero-subtitle">Your gateway to free, high-quality education in technology and design</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Courses</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Free</span>
            </div>
          </div>
        </div>
      </div>

      <div className="courses-section">
        <div className="container">
          <h2 className="section-title">Featured Courses</h2>
          <div className="courses-grid">
            {courses.map(course => (
              <div key={course.id} className="course-card">
                <div className="course-image">
                  <img src={course.image} alt={course.title} />
                  <div className="course-price">{course.price}</div>
                </div>
                <div className="course-content">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  <Link to={`/course/${course.id}`} className="course-link">
                    Start Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* لا يوجد أي تغيير على الستايل */}
      <style>{`
        .home { min-height: 100vh; }
        .hero-section {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white; padding: 4rem 2rem; text-align: center;
        }
        .hero-content { max-width: 800px; margin: 0 auto; }
        .hero-title { font-size: 3rem !important; font-weight: bold; margin-bottom: 1rem; color: #FFFFFF !important; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        .hero-subtitle { font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9; }
        .hero-stats { display: flex; justify-content: center; gap: 3rem; margin-top: 2rem; }
        .stat { text-align: center; }
        .stat-number { display: block; font-size: 2rem; font-weight: bold; }
        .stat-label { font-size: 0.9rem; opacity: 0.8; }
        .courses-section { padding: 4rem 2rem; background: #f8f9fa; }
        .container { max-width: 1200px; margin: 0 auto; }
        .section-title { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333; }
        .courses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .course-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08); transition: all 0.3s ease; }
        .course-card:hover { transform: translateY(-8px); box-shadow: 0 8px 32px rgba(0,0,0,0.12); }
        .course-image { position: relative; height: 200px; overflow: hidden; }
        .course-image img { width: 100%; height: 100%; object-fit: cover; }
        .course-price { position: absolute; top: 1rem; right: 1rem; background: var(--accent-color); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-weight: bold; font-size: 0.9rem; }
        .course-content { padding: 1.5rem; }
        .course-title { font-size: 1.3rem; font-weight: bold; margin-bottom: 0.5rem; color: #333; }
        .course-description { color: #666; margin-bottom: 1.5rem; line-height: 1.5; }
        .course-link { display: inline-block; background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%); color: white; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 500; transition: all 0.3s ease; }
        .course-link:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3); }
        @media (max-width: 768px) { .hero-title { font-size: 2rem; } .hero-stats { gap: 2rem; } .courses-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
};

export default Home;
