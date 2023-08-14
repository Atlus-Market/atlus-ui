export const RootRoute = '/';
export const DashboardRoute = '/dashboard';


// Auth
export const LoginRoute = '/login';
export const ForgotPassword = '/forgot-password';
export const VerifyEmailRoute = '/onboarding/broker/verify-email';
export const PasswordResetRoute = '/password/reset';

// Onboarding
export const OnboardingSelectUser = '/onboarding/user-type';
export const OnboardingBrokerCreateAccount = '/onboarding/broker/create-account';
export const OnboardingBuyerInterestAreas = '/onboarding/buyer/areas-of-interest';


// Set Package
const SetPackageBaseRoute = 'set-package';
export const SetPackagePatent = `/${SetPackageBaseRoute}/patents`;
export const SetPackagePackageDetails = `/${SetPackageBaseRoute}/package-details`;
export const SetPackageDocuments = `/${SetPackageBaseRoute}/documents`;
