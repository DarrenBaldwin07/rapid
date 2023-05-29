import type { V2_MetaFunction } from "@remix-run/node";
import Layout from "~/components/Layout";
import { Heading, Text } from "@rapid-web/ui";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';

export const meta: V2_MetaFunction = () => {
  return [
    { title: "RAPID" },
    { name: "description", content: "A new way to build web applications!" },
  ];
};

export default function Index() {
  return (
    <Layout isNavigation>
      <div>
        <motion.div
          animate={{ y: 0, visibility: 'visible', opacity: 1 }}
          initial={{ y: -70, visibility: 'hidden', opacity: 0 }}
          transition={{ duration: 1, delay: 0 }}
        >
          <div className='flex flex-col mt-56'>
            <div>
              <Text styles='text-white'>Announcement blog post</Text>
            </div>
            <Heading styles='text-white font-extrabold text-6xl max-w-[1000px] gradient-text leading-tight mt-12'>A new way to build web applications with React and Rust.</Heading>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
