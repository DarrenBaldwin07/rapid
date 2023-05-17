import type { V2_MetaFunction } from '@remix-run/react';
import { SignUp } from '@clerk/remix';

export const meta: V2_MetaFunction = () => {
	return [{ title: 'RAPID -- Signup' }];
};

export default function SignUpPage() {
	return (
		<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
			<SignUp path='/sign-up' routing='path' signInUrl='/sign-in' />
		</div>
	);
}
