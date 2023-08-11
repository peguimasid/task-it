import { Metadata } from 'next';

import { SignInPageContent } from './components/sign-in-page-content';

export const metadata: Metadata = {
  title: 'Task-it | SignIn'
};

export default function Page() {
  return <SignInPageContent />;
}
