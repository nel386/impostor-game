import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa6';

export default function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <FaSpinner className="text-4xl text-yellow-500" />
    </motion.div>
  );
}
