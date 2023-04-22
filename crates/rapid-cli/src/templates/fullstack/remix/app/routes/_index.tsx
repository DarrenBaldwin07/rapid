import type { V2_MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { Welcome } from "@rapid-web/react";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/remix";

export const meta: V2_MetaFunction = () => {
  return [{ title: "RAPID -- The intersection between developer experience and scalability" }];
};

export default function Index() {
  return (
    <div>
      <Welcome>
        <div className='flex items-center gap-2 mt-6'>
          <SignedOut>
            <SignupLink />
            <SignInLink />
          </SignedOut>
          <SignedIn>
            <SignOutButton />
          </SignedIn>
        </div>

      </Welcome>
    </div>
  );
}


const SignupLink = () => (
  <Link className='border-2 rounded-xl px-4 py-2' to='/sign-up'>
    <div className='hover:underline hover:decoration-1 flex gap-2 items-center'>
      <h3 className='font-bold'>Sign Up</h3>
    </div>
  </Link>
);

const SignInLink = () => (
  <Link className='border-2 rounded-xl px-4 py-2' to='/sign-in'>
    <div className='hover:underline hover:decoration-1 flex gap-2 items-center'>
      <h3 className='font-bold'>Sign In</h3>
    </div>
  </Link>
)
