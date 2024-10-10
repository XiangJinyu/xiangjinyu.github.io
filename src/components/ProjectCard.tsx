import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2 text-morand-text">{title}</h3>
      <p className="text-morand-accent mb-4">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-morand-highlight hover:text-morand-accent transition-colors"
      >
        View Project <ExternalLink size={16} className="ml-1" />
      </a>
    </div>
  );
};

export default ProjectCard;