import { Metadata } from 'next';

import { SignInPageContent } from './components/SignInPageContent';

export const metadata: Metadata = {
  title: 'Task-it | SignIn'
};

export default function Page() {
  return <SignInPageContent />;
}
