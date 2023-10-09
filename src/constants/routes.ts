export const RootRoute = '/';
export const DashboardRoute = '/dashboard';

// Auth
export const LoginRoute = '/login';
export const LogoutRoute = '/logout';
export const ForgotPassword = '/forgot-password';
export const VerifyEmailRoute = '/onboarding/broker/verify-email';
export const PasswordResetRoute = '/password/reset';

// Onboarding
export const OnboardingSelectUser = '/onboarding/user-type';
export const OnboardingBrokerCreateAccount = '/onboarding/broker/create-account';
export const OnboardingBuyerInterestAreas = '/onboarding/buyer/areas-of-interest';

// Set Package
export const SetNewPackageParam = 'new';
const SetPackageBaseRoute = 'set-package';

const createSetPackageUrl = function (packageId: string, page: string) {
  return `/${SetPackageBaseRoute}/${packageId}/${page}`;
};

export const SetPackagePatent = function (packageId: string) {
  return createSetPackageUrl(packageId, 'patents');
};

export const SetNewPackageUrl = SetPackagePatent(SetNewPackageParam);

export const SetPackagePackageDetails = function (packageId: string) {
  return createSetPackageUrl(packageId, 'package-details');
};

export const SetPackageDocuments = function (packageId: string) {
  return createSetPackageUrl(packageId, 'documents');
};

// View Package
export const PackagePageUrl = function (packageId: string) {
  return `/package/${packageId}`;
};
