import type { V2_MetaFunction } from "@remix-run/node";
import Layout from "~/components/Layout";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "RAPID" },
    { name: "description", content: "A new way to build web applications!" },
  ];
};

export default function Index() {
  return (
    <Layout isNavigation>
      <h1 className='text-white'>Hello world!</h1>
    </Layout>
  );
}
