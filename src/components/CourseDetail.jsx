import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Scenario1 from './Scenario1';
import Scenario2 from './Scenario2';
import Scenario3 from './Scenario3';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set([0, 1, 2]));
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const staticCourseData = {
    'word-basics': {
      title: 'Word Microsoft Basics',
      description: 'Master the fundamentals of Microsoft Word with hands-on exercises and real-world examples.',
      instructor: 'Dr. Ahmed Hassan',
      duration: '4 hours',
      level: 'Beginner',
      lessons: [
        { id: 0, title: 'انشاء مستند جديد باستخدام Word', duration: '15 min', type: 'video', content: 'Welcome to Microsoft Word! In this lesson, we\'ll explore the interface and basic features.' },
        { id: 1, title: 'انشاء جدول باستخدام Word', duration: '20 min', type: 'interactive', content: 'Learn how to create, save, and format your first Word document.' },
        { id: 2, title: 'الكتابه داخل الجدول باستخدام Word', duration: '25 min', type: 'video', content: 'Master text formatting, fonts, colors, and paragraph styles.' },
        { id: 3, title: 'Working with Images and Tables', duration: '30 min', type: 'interactive', content: 'Insert and format images, create tables, and manage layouts.' },
        { id: 4, title: 'Headers, Footers, and Page Setup', duration: '20 min', type: 'video', content: 'Configure page settings, add headers and footers.' }
      ]
    }
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        // لو عندك API حطيها هنا، حالياً نستخدم البيانات الثابتة
        setCourseData(staticCourseData[courseId] || staticCourseData['word-basics']);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [courseId]);

  const course = courseData;
  const lessons = course?.lessons || [];
  const currentLessonData = lessons[currentLesson] || {};
  const progress = lessons.length > 0 ? Math.round((completedLessons.size / lessons.length) * 100) : 0;

  const markLessonComplete = (lessonId) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
    if (lessonId < lessons.length - 1) setCurrentLesson(lessonId + 1);
  };

  const renderSimulator = (lesson) => {
    switch (lesson.id) {
      case 0: return <WordVideoSimulator lesson={lesson} />;
      case 1: return <WordVideoSimulator lesson={lesson} />;
      case 2: return <WordVideoSimulator lesson={lesson} />;
      case 3: return <WordInterfaceExplorer lesson={lesson} />;
      default: return null;
    }
  };

  const WordVideoSimulator = ({ lesson }) => (
    <div className="simulator">
      <div className="simulator-header">
        <h4>📹 Lesson: {lesson.title}</h4>
        {lesson.id === 0 && <Scenario1 />}
        {lesson.id === 1 && <Scenario2 />}
        {lesson.id === 2 && <Scenario3 />}
      </div>
      <div className="simulator-controls">
        <button onClick={() => markLessonComplete(lesson.id)} className="complete-btn">Next Lesson →</button>
      </div>
    </div>
  );

  const WordInterfaceExplorer = ({ lesson }) => (
    <div className="simulator">
      <div className="simulator-header">
        <h4>🖥️ Interactive Lesson: {lesson.title}</h4>
      </div>
      <div className="interface-mockup">
        <div className="word-ribbon">
          <div className="ribbon-tab active">Home</div>
          <div className="ribbon-tab">Insert</div>
          <div className="ribbon-tab">Layout</div>
          <div className="ribbon-tab">References</div>
        </div>
        <div className="word-toolbar">
          <button className="tool-btn">📄</button>
          <button className="tool-btn">💾</button>
          <button className="tool-btn">✂️</button>
          <button className="tool-btn">📋</button>
          <button className="tool-btn">🔤</button>
        </div>
        <div className="document-area">
          <p>Click on the tools above to explore Word's interface!</p>
        </div>
      </div>
      <div className="simulator-controls">
        <button onClick={() => markLessonComplete(lesson.id)} className="complete-btn">Next Lesson →</button>
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading course...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
  if (!course) return <div className="min-h-screen flex items-center justify-center">Course not found</div>;

  return (
    <div className="course-detail">
      <div className="course-header">
        <div className="course-header-content">
          <div className="breadcrumb">
            <Link to="/courses">My Courses</Link> / {course.title}
          </div>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className="course-meta">
            <div className="meta-item">👨‍🏫 {course.instructor}</div>
            <div className="meta-item">⏱️ {course.duration}</div>
            <div className="meta-item">📊 {course.level}</div>
            <div className="meta-item">📈 {progress}% Complete</div>
          </div>
        </div>
      </div>

      <div className="course-content">
        <div className="lessons-sidebar">
          <h3>Course Content</h3>
          {lessons.map((lesson, index) => (
            <div key={lesson.id} className={`lesson-item ${currentLesson===index?'active':''} ${completedLessons.has(lesson.id)?'completed':''}`} onClick={()=>setCurrentLesson(index)}>
              <div className="lesson-status">{completedLessons.has(lesson.id)?'✅':lesson.type==='video'?'📹':'🖥️'}</div>
              <div className="lesson-info">
                <h4>{lesson.title}</h4>
                <span className="lesson-duration">{lesson.duration}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="lesson-content">
          <div className="lesson-header">
            <h2>{currentLessonData.title}</h2>
            <span className="lesson-type">{currentLessonData.type==='video'?'📹 Video':'🖥️ Interactive'}</span>
          </div>
          <div className="lesson-body">
            <p>{currentLessonData.content}</p>
            {currentLessonData.id!==undefined && renderSimulator(currentLessonData)}
          </div>
          <div className="lesson-navigation">
            <button onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))} disabled={currentLesson===0} className="nav-btn">← Previous</button>
            <button onClick={() => setCurrentLesson(Math.min(lessons.length - 1, currentLesson + 1))} disabled={currentLesson===lessons.length-1} className="nav-btn">Next →</button>
          </div>
        </div>
      </div>

      <style>{`
        .course-detail { min-height:100vh; background:#FFF8E8; }
        .course-header { background:white; padding:3rem 2rem; display:flex; justify-content:center; align-items:center; box-shadow:0 2px 8px rgba(0,0,0,0.05); }
        .course-header-content { text-align:center; max-width:800px; }
        .breadcrumb { color:#666; margin-bottom:1rem; }
        .breadcrumb a { color:#4f46e5; text-decoration:none; }
        .course-header h1 { font-size:2.5rem; color:#333; margin-bottom:1rem; }
        .course-header p { color:#666; font-size:1.1rem; margin-bottom:2rem; line-height:1.6; }
        .course-meta { display:flex; gap:2rem; flex-wrap:wrap; justify-content:center; }
        .meta-item { display:flex; align-items:center; gap:0.5rem; color:#666; }
        .course-content { display:grid; grid-template-columns:350px 1fr; gap:2rem; padding:2rem; max-width:1400px; margin:0 auto; }
        .lessons-sidebar { background:white; border-radius:16px; padding:2rem; box-shadow:0 4px 16px rgba(0,0,0,0.08); position:sticky; top:2rem; }
        .lessons-sidebar h3 { margin-bottom:1.5rem; color:#333; }
        .lesson-item { display:flex; align-items:center; gap:1rem; padding:1rem; border-radius:12px; cursor:pointer; transition:all 0.3s ease; }
        .lesson-item:hover { background:#f0f7ff; }
        .lesson-item.active { background:linear-gradient(135deg,#4f46e5,#a78bfa); color:white; }
        .lesson-item.completed { background:#e8f5e8; }
        .lesson-item.completed.active { background:linear-gradient(135deg,#059669,#8bc34a); }
        .lesson-status { font-size:1.2rem; }
        .lesson-info h4 { margin:0; font-size:0.9rem; font-weight:500; }
        .lesson-duration { font-size:0.8rem; opacity:0.8; }
        .lesson-content { background:white; border-radius:16px; padding:2rem; box-shadow:0 4px 16px rgba(0,0,0,0.08); }
        .lesson-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem; padding-bottom:1rem; border-bottom:2px solid #f0f0f0; }
        .lesson-header h2 { color:#333; margin:0; }
        .lesson-type { background:#f3e8ff; color:#4f46e5; padding:0.5rem 1rem; border-radius:20px; font-size:0.9rem; font-weight:500; }
        .lesson-body { margin-bottom:2rem; }
        .lesson-body p { color:#666; line-height:1.6; margin-bottom:2rem; }
        .simulator { background:#FFF8E8; border-radius:12px; padding:2rem; margin:2rem 0; }
        .simulator-header h4 { color:#333; margin-bottom:1rem; }
        .interface-mockup { border:2px solid #ddd; border-radius:8px; overflow:hidden; margin-bottom:1rem; }
        .word-ribbon { background:#f0f0f0; display:flex; border-bottom:1px solid #ddd; }
        .ribbon-tab { padding:0.5rem 1rem; cursor:pointer; border-right:1px solid #ddd; }
        .ribbon-tab.active { background:white; border-bottom:2px solid #4f46e5; }
        .word-toolbar { background:#fafafa; padding:0.5rem; display:flex; gap:0.5rem; border-bottom:1px solid #ddd; }
        .tool-btn { background:white; border:1px solid #ddd; padding:0.5rem; border-radius:4px; cursor:pointer; font-size:1rem; }
        .tool-btn:hover { background:#e3f2fd; }
        .document-area { background:white; padding:2rem; min-height:200px; color:#333; }
        .simulator-controls { text-align:center; }
        .complete-btn { background:#059669; color:white; border:none; padding:0.75rem 2rem; border-radius:8px; cursor:pointer; font-weight:500; transition:all 0.3s ease; }
        .complete-btn:hover { transform:translateY(-2px); }
        .lesson-navigation { display:flex; justify-content:space-between; gap:1rem; }
        .nav-btn { background:linear-gradient(135deg,#4f46e5,#a78bfa); color:white; border:none; padding:0.75rem 2rem; border-radius:8px; cursor:pointer; font-weight:500; transition:all 0.3s ease; }
        .nav-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 4px 12px rgba(79,70,229,0.3); }
        .nav-btn:disabled { background:#ccc; cursor:not-allowed; }
        @media (max-width:1024px){ .course-content{grid-template-columns:1fr;} .lessons-sidebar{position:static;} }
        @media (max-width:768px){ .course-header{padding:2rem 1rem;} .course-content{padding:1rem;} .lesson-content{padding:1rem;} .course-meta{justify-content:center;} }
      `}</style>
    </div>
  );
};

export default CourseDetail;
