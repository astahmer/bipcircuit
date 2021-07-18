import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

export function ProgressIndicator({ controls, duration }) {
  return (
    <motion.div
      transition={{ type: "tween", ease: "linear", duration }}
      animate={controls}
      // onAnimationComplete={onAnimationComplete}
    >
      <Box
        h="20px"
        width={6}
        bgColor="whatsapp.300"
        pos="absolute"
        top="50%"
        transform="translate3d(0%, -50%, 0)"
        pointerEvents="none"
      />
    </motion.div>
  );
}
