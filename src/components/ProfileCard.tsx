import React from 'react';
import { Code, Rocket, Heart } from 'lucide-react';

const ProfileCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center">
      <img
        src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        alt="Profile"
        className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-8"
      />
      <div>
        <h1 className="text-3xl font-bold text-morand-text mb-2">Your Name</h1>
        <p className="text-lg text-morand-accent mb-4">Full-stack Developer & AI Enthusiast</p>
        <p className="mb-4">
          Passionate about creating elegant solutions to complex problems. 
          I love working with cutting-edge technologies and building 
          products that make a difference.
        </p>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <Code className="text-morand-accent mr-2" />
            <span>Clean Code</span>
          </div>
          <div className="flex items-center">
            <Rocket className="text-morand-accent mr-2" />
            <span>Innovation</span>
          </div>
          <div className="flex items-center">
            <Heart className="text-morand-accent mr-2" />
            <span>User-Centric</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;