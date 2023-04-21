import type { V2_MetaFunction } from "@remix-run/react";
import { Button } from '@rapid-web/ui';

export const meta: V2_MetaFunction = () => {
  return [{ title: "RAPID -- The intersection between developer experience and scalability" }];
};

export default function Index() {
  return (
    <div>
      <Button>Hello world</Button>
    </div>
  );
}
