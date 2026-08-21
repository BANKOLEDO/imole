export const lottie = {
  lightbulb: '/lottie/lightbulb.json',
  confetti: '/lottie/confetti.json',
  goal: '/lottie/goal.json',
} as const

export type LottieKey = keyof typeof lottie
