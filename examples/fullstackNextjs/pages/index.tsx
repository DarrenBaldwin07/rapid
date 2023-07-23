import { Welcome, createBoltClient } from '@rapid-web/react';
import { routes, Handlers } from './api/bindings';

interface Props {
  title: string;
}

export const bolt = createBoltClient<Handlers, typeof routes>(routes, {
	transport: 'http://localhost:8080',
});


export default function Home({ title }: Props) {
  return (
    <main>
      <Welcome>
        <p className='mt-4'>{title}</p>
      </Welcome>
    </main>
  )
}

export async function getServerSideProps() {

  const req = await bolt('hello').get(routes.hello);

  return {
    props: {
      title: req.data,
    }
  }
}
