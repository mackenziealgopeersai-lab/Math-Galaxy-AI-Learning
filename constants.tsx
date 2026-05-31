
import React from 'react';

export const REVISION_TOPICS = [
  {
    id: 'algebra',
    title: 'Algebra',
    description: 'Learn how to solve for "x" and work with variables.',
    icon: '📐',
    // Fix: Using backticks to handle the apostrophe in "don't" which was causing a syntax error in the object literal
    content: `Algebra is like a puzzle where we find missing numbers. We use letters like "x" or "y" to stand for numbers we don't know yet.`
  },
  {
    id: 'fractions',
    title: 'Fractions',
    description: 'Master parts of a whole and basic ratios.',
    icon: '🍕',
    content: 'A fraction tells us how many parts of a whole we have. The top number is the numerator, and the bottom is the denominator.'
  },
  {
    id: 'trigonometry',
    title: 'Trigonometry',
    description: 'Understanding triangles and angles (SOH CAH TOA).',
    icon: '🔺',
    content: 'Trigonometry helps us find the lengths and angles of triangles. Use SOH CAH TOA to remember Sine, Cosine, and Tangent!'
  },
  {
    id: 'placevalue',
    title: 'Place Value Chart',
    description: 'Visualizing thousands, hundreds, tens, and units.',
    icon: '🔢',
    content: 'Every digit in a number has a value based on its place. From Right to Left: Units, Tens, Hundreds, Thousands!'
  }
];

export const PERSONALITIES = {
  'Captain Logic': {
    avatar: '👨‍🚀',
    description: 'Serious and focused on facts and steps.',
    style: 'Step-by-step and logical.'
  },
  'Professor Planet': {
    avatar: '🪐',
    description: 'Wise and loves to use space examples.',
    style: 'Academic but encouraging.'
  },
  'Star Kid': {
    avatar: '⭐',
    description: 'Fun, energetic, and uses simple words.',
    style: 'Exciting and very friendly.'
  }
};