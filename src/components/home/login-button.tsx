import { FunctionComponent } from 'react';

import Link from 'next/link';

export const LoginButton: FunctionComponent = () => {
  return (
    <Link className="rounded-lg border-2 border-secondary px-8 py-2 text-sm" href="/login?callbackUrl=/projects">
      Login
    </Link>
  );
};
