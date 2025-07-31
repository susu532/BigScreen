// SurveyQuestions.ts
// Contains the list of 20 survey questions and their metadata

/**
 * Type of question: 'A' = single choice, 'B' = text input, 'C' = numeric (1-5)
 */
export type QuestionType = 'A' | 'B' | 'C';

/**
 * Survey question definition
 */
export interface SurveyQuestion {
  /** Question number (1-based) */
  number: number;
  /** Question title/body */
  text: string;
  /** Type of question */
  type: QuestionType;
  /** List of choices (for type A), or null */
  choices?: string[];
}

/**
 * List of all survey questions
 */
export const surveyQuestions: SurveyQuestion[] = [
  { number: 1, text: 'Your email address', type: 'B' },
  { number: 2, text: 'Your age', type: 'B' },
  { number: 3, text: 'Your gender', type: 'A', choices: ['Male', 'Female', 'Prefer not to say'] },
  { number: 4, text: 'Number of people in your household (adults & children)', type: 'C' },
  { number: 5, text: 'Your profession', type: 'B' },
  { number: 6, text: 'Which VR headset do you use?', type: 'A', choices: ['Oculus Quest', 'Oculus Rift/s', 'HTC Vive', 'Windows Mixed Reality', 'Valve Index'] },
  { number: 7, text: 'Which app store do you buy VR content from?', type: 'A', choices: ['SteamVR', 'Oculus Store', 'Viveport', 'Windows Store'] },
  { number: 8, text: 'Which headset do you plan to buy soon?', type: 'A', choices: ['Oculus Quest', 'Oculus Go', 'HTC Vive Pro', 'PSVR', 'Other', 'None'] },
  { number: 9, text: 'In your household, how many people use your VR headset to watch Bigscreen?', type: 'C' },
  { number: 10, text: 'You mainly use Bigscreen for:', type: 'A', choices: ['Watch live TV', 'Watch movies', 'Work', 'Play solo', 'Play in team'] },
  { number: 11, text: 'How many points do you give for image quality on Bigscreen?', type: 'C' },
  { number: 12, text: 'How many points for interface comfort on Bigscreen?', type: 'C' },
  { number: 13, text: 'How many points for network connection on Bigscreen?', type: 'C' },
  { number: 14, text: 'How many points for 3D graphics quality in Bigscreen?', type: 'C' },
  { number: 15, text: 'How many points for audio quality in Bigscreen?', type: 'C' },
  { number: 16, text: 'Would you like more precise notifications during your Bigscreen sessions?', type: 'A', choices: ['Yes', 'No'] },
  { number: 17, text: 'Would you like to invite a friend to join your session via their smartphone?', type: 'A', choices: ['Yes', 'No'] },
  { number: 18, text: 'Would you like to record TV shows to watch later?', type: 'A', choices: ['Yes', 'No'] },
  { number: 19, text: 'Would you like to play exclusive games on your Bigscreen?', type: 'A', choices: ['Yes', 'No'] },
  { number: 20, text: 'What new feature should exist on Bigscreen?', type: 'B' },
];
