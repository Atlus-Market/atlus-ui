const onboardingEmailKey = 'onboarding-email';

export const saveOnboardingEmail = (email: string) => localStorage.setItem(onboardingEmailKey, email);
export const getOnboardingEmail = () => localStorage.getItem(onboardingEmailKey);
