import React from 'react';
import { Github, Linkedin, Mail, FileText, Coffee } from 'lucide-react';
import ProfileCard from './components/ProfileCard';
import ProjectCard from './components/ProjectCard';

const projects = [
  {
    title: "AI Chatbot",
    description: "A smart conversational AI using natural language processing.",
    link: "https://github.com/yourusername/ai-chatbot"
  },
  {
    title: "Recipe Finder",
    description: "Web app to find recipes based on available ingredients.",
    link: "https://github.com/yourusername/recipe-finder"
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather information with beautiful visualizations.",
    link: "https://github.com/yourusername/weather-dashboard"
  }
];

function App() {
  return (
    <div className="min-h-screen bg-morand-bg text-morand-text p-8">
      <div className="max-w-4xl mx-auto">
        <ProfileCard />
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
        <footer className="mt-12 text-center">
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/yourusername" className="text-morand-accent hover:text-morand-highlight transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/yourusername" className="text-morand-accent hover:text-morand-highlight transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:your.email@example.com" className="text-morand-accent hover:text-morand-highlight transition-colors">
              <Mail size={24} />
            </a>
            <a href="/resume.pdf" className="text-morand-accent hover:text-morand-highlight transition-colors">
              <FileText size={24} />
            </a>
          </div>
          <p className="mt-4 text-sm">Made with <Coffee className="inline" size={16} /> and React</p>
        </footer>
      </div>
    </div>
  );
}

export default App;