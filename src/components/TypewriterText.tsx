'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTagHighlight } from './TagHighlightContext';

interface TypewriterTextProps {
  text?: string;
  roles?: string[];
  className?: string;
  tagRoleMap?: Record<string, string>; // Map tag names to specific roles
  roleTagMap?: Record<string, string[]>; // Map roles to tag names that should be highlighted
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text,
  roles = [], 
  className = '',
  tagRoleMap = {},
  roleTagMap = {}
}) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { 
    highlightedTags, 
    setHighlightedTags, 
    disableAutoCollapse, 
    enableAutoCollapse 
  } = useTagHighlight();

  // If text prop is provided, just type it once without deleting
  useEffect(() => {
    if (text) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      // Type the text one character at a time
      const typeSpeed = 70; // ms per character when typing
      
      const handleTyping = () => {
        if (currentText.length < text.length) {
          setCurrentText(text.slice(0, currentText.length + 1));
        }
      };
      
      // Only set a timeout if we're still typing
      if (currentText.length < text.length) {
        timeoutRef.current = setTimeout(handleTyping, typeSpeed);
      }
      
      // Cleanup function
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }
  }, [text, currentText]);

  // Only run the role-based typing effect if roles are provided and text is not
  useEffect(() => {
    if (text || roles.length === 0) return;
    
    // Disable auto-collapse when component mounts
    disableAutoCollapse();
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    const currentRole = roles[currentRoleIndex];
    
    // Define typing speeds
    const deleteSpeed = 30; // ms per character when deleting
    const typeSpeed = 70;   // ms per character when typing
    const pauseDuration = 3000; // pause for 3 seconds when fully typed
    
    const handleTyping = () => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
      } 
      else if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Move to next role
          setIsDeleting(false);
          const nextIndex = (currentRoleIndex + 1) % roles.length;
          setCurrentRoleIndex(nextIndex);
          
          // Clear highlighted tags during role transition
          setHighlightedTags([]);
        }
      }
      else {
        if (currentText.length < currentRole.length) {
          setCurrentText(currentRole.slice(0, currentText.length + 1));
        } else {
          // Pause before deleting
          setIsPaused(true);
        }
      }
    };
    
    // Set the appropriate timeout based on the current state
    const delay = isPaused ? pauseDuration : isDeleting ? deleteSpeed : typeSpeed;
    timeoutRef.current = setTimeout(handleTyping, delay);
    
    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      enableAutoCollapse();
    };
  }, [currentText, currentRoleIndex, isDeleting, isPaused, roles, setHighlightedTags, disableAutoCollapse, enableAutoCollapse, text]);

  // When role changes or completes typing, highlight the corresponding tags
  useEffect(() => {
    if (text || roles.length === 0) return;
    
    const currentRole = roles[currentRoleIndex];
    
    // If we have a mapping for this role, highlight those tags
    // Only highlight when the role is fully typed and not deleting
    if (roleTagMap[currentRole] && currentText === currentRole && !isDeleting) {
      setHighlightedTags(roleTagMap[currentRole]);
    }
  }, [currentRoleIndex, currentText, isDeleting, roleTagMap, roles, setHighlightedTags, text]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypewriterText; 