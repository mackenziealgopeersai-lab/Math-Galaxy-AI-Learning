
export enum AppView {
  WELCOME = 'welcome',
  HOMEWORK = 'homework',
  QUIZ = 'quiz',
  REVISION = 'revision'
}

export type ChatbotPersonality = 'Captain Logic' | 'Professor Planet' | 'Star Kid';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface RevisionTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  content: string;
}
