import { CreateUserPayload } from '@/api/user/create-user';
import { IOnboardingContext } from '@/app/onboarding/context/onboarding-provider';
import { UserAccountForm } from '@/app/onboarding/components/create-user-account';

export const createCreateUserPayload = (
  onboardingContext: IOnboardingContext,
  formValues: UserAccountForm
): CreateUserPayload => {
  return {
    ...formValues,
    title: formValues?.title ?? '',
    broker: onboardingContext.userType === 'broker',
    cellPhone: '',
    description: '',
    interestCountryCodes: onboardingContext.countryCodesIds,
    dealTimeframePreference: onboardingContext.timeframe,
    dealSizePreference: onboardingContext.dealSize,
    interestAreas: [], // TODO: Use correct onboarding value
  };
};
