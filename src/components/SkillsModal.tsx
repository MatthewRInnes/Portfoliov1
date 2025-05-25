// Import necessary dependencies
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

// Define the props interface for the SkillsModal component
interface SkillsModalProps {
  skills: string[];
  onClose: () => void;
}

// Main SkillsModal component that displays a list of skills in a modal window
const SkillsModal: React.FC<SkillsModalProps> = ({ skills, onClose }) => {
  // Set up an effect to handle the Escape key press to close the modal
	useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Add and remove event listener for the Escape key
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Handle clicks on the modal backdrop to close the modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // Modal backdrop with semi-transparent black background and blur effect
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      {/* Modal content container with background colour and rounded corners */}
      <div 
        className="bg-background dark:bg-navy rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Modal header with title and close button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-foreground dark:text-lightSlate">Skills</h2>
            <button
              onClick={onClose}
              className="text-foreground dark:text-lightSlate hover:text-accent dark:hover:text-teal transition-colors"
              aria-label="Close skills modal"
            >
              <X size={24} />
            </button>
          </div>
          {/* Container for the skills list with flex layout */}
          <div className="flex flex-wrap gap-2">
            {/* Map through skills array to create individual skill tags */}
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-accent/10 dark:bg-teal/10 text-accent dark:text-teal px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsModal; 