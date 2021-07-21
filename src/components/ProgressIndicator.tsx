import { MotionBox } from "../functions/utils";

export function ProgressIndicator({ controls, duration, constraintsRef }) {
  return (
    <MotionBox
      transition={{ type: "tween", ease: "linear", duration }}
      animate={controls}
      // pos="absolute"
      top="50%"
    >
      <MotionBox
        // drag="x"
        // drag={false}
        // dragConstraints={constraintsRef}
        // dragElastic={0}
        // dragMomentum={false}
        cursor="pointer"
        zIndex={10}
        h="20px"
        width={6}
        bgColor="whatsapp.300"
      />
    </MotionBox>
  );
}
