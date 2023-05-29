import type { V2_MetaFunction } from "@remix-run/node";
import Layout from "~/components/Layout";
import { Heading, Text } from "@rapid-web/ui";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight, faClipboard, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
            <div className='flex items-center gap-2 px-2 py-1 rounded-full hover:cursor-pointer bg-[#18181C] w-max border-2 border-[#27272D] hover:-translate-y-1 transition ease-linear'>
              <Text styles='text-white'>Announcement blog post</Text>
              <FontAwesomeIcon icon={faCircleArrowRight} className='text-white' />
            </div>
            <Heading styles='text-white font-extrabold text-6xl max-w-[1000px] gradient-text leading-tight mt-12'>A new way to build web applications with React and Rust.</Heading>
            <div className='flex mt-12 border-2 border-white p-4 rounded-xl w-max gap-4'>
              <div className='flex items-center gap-2'>
                <FontAwesomeIcon icon={faChevronRight} size='sm' className='text-white' />
                <code className='text-white'>cargo install rapid-cli</code>
              </div>
              <FontAwesomeIcon icon={faClipboard} size='lg' className='text-white' />
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
