import Header from '@/app/onboarding/header';

export default function OnboardingLayout({children}: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex justify-center">
        {children}
      </main>
    </>
  )
}
