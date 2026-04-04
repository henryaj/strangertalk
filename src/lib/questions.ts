import { QuestionDef } from './types';

// General survey: 5 questions, one per key construct (7-point Likert unless noted)
export const generalQuestions: QuestionDef[] = [
  {
    id: 'rejectionExpectation',
    text: "How many people do you think you'd need to approach to find someone willing to talk to you?",
    type: 'numeric',
    min: 1,
  },
  {
    id: 'hardToStart',
    text: 'It is hard to start a conversation with a stranger.',
    type: 'likert',
    scale: 7,
  },
  {
    id: 'nervous',
    text: 'I feel nervous talking to strangers.',
    type: 'likert',
    scale: 7,
  },
  {
    id: 'enjoyTalking',
    text: 'I enjoy talking to strangers.',
    type: 'likert',
    scale: 7,
  },
  {
    id: 'theyLikeMe',
    text: 'The strangers I talk to like me.',
    type: 'likert',
    scale: 7,
  },
];

// Daily pre-conversation: same 5 constructs, future tense, 5-point scale
export const dailyPreQuestions: QuestionDef[] = [
  {
    id: 'rejectionExpectation',
    text: "How many people do you think you'll need to approach today to find someone willing to talk?",
    type: 'numeric',
    min: 1,
  },
  {
    id: 'hardToStart',
    text: 'It will be hard to start a conversation.',
    type: 'likert',
    scale: 5,
  },
  {
    id: 'nervous',
    text: 'I will feel nervous.',
    type: 'likert',
    scale: 5,
  },
  {
    id: 'enjoyTalking',
    text: 'I will enjoy the conversation.',
    type: 'likert',
    scale: 5,
  },
  {
    id: 'theyLikeMe',
    text: 'The stranger will like me.',
    type: 'likert',
    scale: 5,
  },
];

// Daily post-conversation: same 5 constructs, past tense, 5-point scale
export const dailyPostQuestions: QuestionDef[] = [
  {
    id: 'rejectionExpectation',
    text: 'How many people did you approach before finding someone to talk to?',
    type: 'numeric',
    min: 1,
  },
  {
    id: 'hardToStart',
    text: 'It was hard to start the conversation.',
    type: 'likert',
    scale: 5,
  },
  {
    id: 'nervous',
    text: 'I felt nervous.',
    type: 'likert',
    scale: 5,
  },
  {
    id: 'enjoyTalking',
    text: 'I enjoyed the conversation.',
    type: 'likert',
    scale: 5,
  },
  {
    id: 'theyLikeMe',
    text: 'The stranger liked me.',
    type: 'likert',
    scale: 5,
  },
];
