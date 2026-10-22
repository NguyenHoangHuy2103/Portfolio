import { useScrollSpy } from '@/hooks/useScrollSpy';
import { ProgressBar } from '@/components/ProgressBar';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
// import { Accomplishments } from '@/components/Accomplishments'; // Bỏ comment khi muốn bật lại
import { Contact } from '@/components/Contact';

export function App() {
  const activeSection = useScrollSpy([
    'about',
    'projects',
    'skills',
    /* 'accomplishments', */
    'contact',
  ]);

  return (
    <div className="min-h-screen bg-[#F7FAFD] dark:bg-[#06101D] text-navy dark:text-slate-100 font-sans transition-colors duration-300">
      <ProgressBar />
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        {/* <Accomplishments /> */}
        <Contact />
      </main>
    </div>
  );
}

export default App;
