'use client';

import * as Si from 'react-icons/si';
import * as Tb from 'react-icons/tb';

/**
 * Validates that a tag has a valid icon
 * @param iconName The name of the icon to validate
 * @returns boolean indicating if the icon exists
 */
export function validateTagIcon(iconName: string): boolean {
  if (!iconName) return false;
  
  if (iconName.startsWith('Si')) {
    return !!Si[iconName as keyof typeof Si];
  } else if (iconName.startsWith('Tb')) {
    return !!Tb[iconName as keyof typeof Tb];
  }
  
  return false;
}

/**
 * Validates all tags in a portfolio data structure
 * @param portfolioData The portfolio data to validate
 * @returns An array of validation errors, empty if all valid
 */
export function validatePortfolioTags(portfolioData: any): string[] {
  const errors: string[] = [];
  
  // Check timeline items with tags
  if (portfolioData.timeline) {
    portfolioData.timeline.forEach((item: any, index: number) => {
      if (item.tags && Array.isArray(item.tags)) {
        item.tags.forEach((tag: any, tagIndex: number) => {
          if (!tag.icon) {
            errors.push(`Missing icon for tag "${tag.name}" in timeline item "${item.title}" (index ${index})`);
          } else if (!validateTagIcon(tag.icon)) {
            errors.push(`Invalid icon "${tag.icon}" for tag "${tag.name}" in timeline item "${item.title}" (index ${index})`);
          }
        });
      }
    });
  }
  
  // Check about section tags
  if (portfolioData.about && portfolioData.about.tags) {
    Object.entries(portfolioData.about.tags).forEach(([category, tags]: [string, any]) => {
      if (Array.isArray(tags)) {
        tags.forEach((tag: any, tagIndex: number) => {
          if (!tag.icon) {
            errors.push(`Missing icon for tag "${tag.name}" in about.tags.${category} (index ${tagIndex})`);
          } else if (!validateTagIcon(tag.icon)) {
            errors.push(`Invalid icon "${tag.icon}" for tag "${tag.name}" in about.tags.${category} (index ${tagIndex})`);
          }
        });
      }
    });
  }
  
  return errors;
}

/**
 * Throws an error if any tags in the portfolio data have invalid icons
 * @param portfolioData The portfolio data to validate
 */
export function validatePortfolioTagsOrThrow(portfolioData: any): void {
  const errors = validatePortfolioTags(portfolioData);
  
  if (errors.length > 0) {
    throw new Error(`Tag validation errors:\n${errors.join('\n')}`);
  }
} 