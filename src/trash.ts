export const trash = "";
// const form = useForm({defaultValues: { delay: 10}})
//   const form = useForm({ defaultValues: { bips: [] } });
//   const { fields, append, update, prepend, remove, swap, move, insert } =
//     useFieldArray({
//       control: form.control,
//       name: "bips",
//     });
//   console.log(form.getValues());
//   console.log(fields);
// const form = useForm({defaultValues: { delay: 10}})
//   const { setValue } = useFormContext();
{
  /* <FormProvider {...form}>
          {fields.map((item, index) => (
            <BipInput
              key={index}
              register={form.register}
              update={update}
              index={index}
            />
          ))}
        </FormProvider> */
}

//   activities: ["beeping"],
// {
//   activities: {
//     beeping: (ctx, event) => {
//       // Start the beeping activity
//       const interval = setInterval(() => ctx.elapsedTime, 100);

//       // Return a function that stops the beeping activity
//       return () => clearInterval(interval);
//     },
//   },
// }

// const BipTimeline = ({
//     percents,
//     controls,
//     duration,
//     onAnimationComplete,
//   }: {
//     percents: number[];
//     controls: AnimationControls;
//     duration: number;
//     onAnimationComplete: VisualElementLifecycles["onAnimationComplete"];
//   }) => {
//     const bgColor = useColorModeValue("orange", "yellow");
//     const onDragEnd = (result) => {
//       // dropped outside the list
//       if (!result.destination) {
//         return;
//       }

//       console.log(result);
//       // const items = reorder(
//       //   this.state.items,
//       //   result.source.index,
//       //   result.destination.index
//       // );

//       // this.setState({
//       //   items,
//       // });
//     };

//     return (
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="droppable" direction="horizontal">
//           {(provided, snapshot) => (
//             <Box
//               w={timelineWidth + "px"}
//               pos="relative"
//               ref={provided.innerRef}
//               {...provided.droppableProps}
//             >
//               <Box bgColor="twitter.100" h="2px" w="100%" />
//               {percents.map((percent, index) => (
//                 <BipTimelineStep
//                   key={percent + "-" + index}
//                   percent={percent}
//                   width={4}
//                   bgColor={bgColor}
//                 />
//               ))}
//               <BipTimelineProgressStep
//                 controls={controls}
//                 duration={duration}
//                 onAnimationComplete={onAnimationComplete}
//               />
//               {percents.map((item, index) => (
//                 <Draggable key={item} draggableId={item + ""} index={index}>
//                   {(provided, snapshot) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       //   style={getItemStyle(
//                       //     snapshot.isDragging,
//                       //     provided.draggableProps.style
//                       //   )}
//                     >
//                       <BipTimelineStep
//                         key={item + "-" + index}
//                         percent={item}
//                         width={4}
//                         bgColor={bgColor}
//                       />
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//             </Box>
//           )}
//         </Droppable>
//       </DragDropContext>
//     );
//   };

// const BipInput = ({ update }: { update: (nb: number) => void }) => {
//     return (
//       <TextInput
//         type="number"
//         render={() => (
//           <NumberInput
//             size="lg"
//             maxW={32}
//             defaultValue={defaultDelay}
//             min={0}
//             onChange={(value) => update(Number(value))}
//           >
//             <NumberInputField />
//             <NumberInputStepper>
//               <NumberIncrementStepper />
//               <NumberDecrementStepper />
//             </NumberInputStepper>
//           </NumberInput>
//         )}
//       />
//     );
//   };

// import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";

// import { sortBy as sortByFn } from "@pastable/utils";

// import { atom } from "jotai";

// export function useSelection<T = any, Id = string | number>({
//     getId,
//     max,
//     initial = [],
//     sortBy: sortByProp,
//     sortDirection = "asc",
//     sortFn: sortFnProp,
//     updateFromInitial,
//     onUpdate,
// }: UseSelectionProps<T, Id>): Selection<T> {
//     const selectedAtom = atom(initial);
//     // const actionsAtom = atom((get) => {
//     //     const state = get(selectedAtom);

//     // })
//     // const derivedAtom = atom((get) => get(selectedAtom))
//     const actionsAtom = atom((get) => get(selectedAtom), (get, set, payload) => {
//         const setter =
//             (value: SetStateAction<T[]>) => {
//                 const newValue =
//         typeof value === 'function'
//           ? (value)(get(selectedAtom))
//           : value

//           set(selectedAtom, newValue);
//                 onUpdate?.(value);
//             }

//             if (payload.type === "set") {
//                 setter(payload.items)
//             }

//     })

//     const add = useCallback(
//         (item: T | T[]) => {
//             let clone = Array.isArray(item) ? [...item] : { ...item };
//             if (max) {
//                 if (selected.length >= max) {
//                     return;
//                 }
//                 if (Array.isArray(item)) {
//                     clone = item.slice(0, max - selected.length);
//                 }
//             }

//             set(selected.concat(clone));
//         },
//         [selected, max]
//     );

//     const remove = useCallback(
//         (indexOrItem: number | T) => {
//             let index = indexOrItem;
//             if (typeof indexOrItem !== "number") {
//                 index = find(indexOrItem, true);
//             }

//             const clone = [...selected];
//             clone.splice(index as number, 1);
//             set([...clone]);
//         },
//         [selected]
//     );
//     const clear = useCallback(() => set([]), []);

//     const find = useCallback(
//         <ReturnIndex extends boolean = false>(
//             item: T,
//             returnIndex?: ReturnIndex
//         ): ReturnIndex extends true ? number : T =>
//             selected[returnIndex ? "findIndex" : "find"]((selectedItem) => getId(selectedItem) === getId(item)) as any,
//         [selected]
//     );
//     const findById = useCallback(
//         <ReturnIndex extends boolean = false>(
//             id: ReturnType<UseSelectionProps<T, Id>["getId"]>,
//             returnIndex?: ReturnIndex
//         ): ReturnIndex extends true ? number : T =>
//             selected[returnIndex ? "findIndex" : "find"]((selectedItem) => getId(selectedItem) === id) as any,
//         [selected]
//     );

//     const has = useCallback((item: T) => find(item) !== undefined, [selected]);
//     const update = (item: T) => {
//         set((items) => {
//             const index = find(item, true);
//             const clone = [...items];
//             clone[index] = item;
//             return clone;
//         });
//     };
//     const upsert = (item: T) => (has(item) ? update(item) : add(item));

//     const toggle = useCallback(
//         (item: T) => {
//             const hasItem = has(item);
//             if (hasItem) {
//                 remove(item);
//             } else {
//                 add(item);
//             }
//             return hasItem;
//         },
//         [selected]
//     );

//     const sortBy = useCallback((compareFn: (a: T, b: T) => number) => {
//         set((current) => [...current].sort(compareFn));
//     }, []);
//     const sorted = useMemo(() => {
//         if (sortByProp) {
//             return sortByFn(selected, sortByProp as keyof T & string, sortDirection);
//         } else if (sortFnProp) {
//             return [...selected].sort(sortFnProp);
//         } else {
//             return selected;
//         }
//     }, [selected, sortByProp, sortFnProp]);
//     const get = useCallback(() => sorted, [sorted]);

//     const initialSelection = useMemo(() => initial, [initial]);
//     const reset = useCallback(() => set(initial), [initial]);

//     // Update selection when initial or trigger changes
//     useUpdateEffect(() => {
//         if (updateFromInitial) {
//             set(initialSelection);
//         }
//     }, [initialSelection, updateFromInitial]);

//     return [
//         sorted,
//         { get, set, clear, reset, add, remove, find, findById, has, toggle, update, upsert, sortBy: sortBy },
//     ];
// }

// export type UseSelectionProps<T = any, Id = string | number> = {
//     /** Main (& required !) option, defines how to access a property that will be unique to each items */
//     getId: (item: T) => Id;
//     /** Initial selection values */
//     initial?: T[];
//     /** Sort function to apply automatically to selection */
//     sortFn?: (a: T, b: T) => number;
//     /** An item property from which the selection will be automatically sorted */
//     sortBy?: keyof T;
//     /** Sort direction, either asc or desc, defaults to asc */
//     sortDirection?: "asc" | "desc";
//     /** If true, the selection will mirror the initial property */
//     updateFromInitial?: boolean;
//     /** Callback invoked on any set action */
//     onUpdate?: (value: SetStateAction<T[]>) => void;
//     /** Defines a maximum selection length, if trying to add items when max is always reached, they will be ignored */
//     max?: number;
// };

// export type SelectionActions<T = any, Id = any> = {
//     get: () => T[];
//     set: Dispatch<SetStateAction<T[]>>;
//     clear: () => void;
//     reset: () => void;
//     add: (item: T | T[]) => void;
//     remove: (indexOrItem: number | T) => void;
//     find: <ReturnIndex extends boolean = false>(
//         item: T,
//         returnIndex?: ReturnIndex
//     ) => ReturnIndex extends true ? number : T;
//     findById: <ReturnIndex extends boolean = false>(
//         id: ReturnType<UseSelectionProps<T, Id>["getId"]>,
//         returnIndex?: ReturnIndex
//     ) => ReturnIndex extends true ? number : T;
//     has: (item: T) => boolean;
//     toggle: (item: T) => boolean;
//     update: (item: T) => void;
//     upsert: (item: T) => void;
//     sortBy: (compareFn: (a: T, b: T) => number) => void;
// };
// export type Selection<T = any, Id = any> = [T[], SelectionActions<T, Id>];

// return (
//     <MotionBox
//       ref={ref}
//       pos="absolute"
//       //   top="calc(50% - 20px)" // -10px from padding/2 & -10px from height/2
//       //   padding="10px 15px"
//       //   left={`calc(${percent}% - ${Number(width) / 2 + 15}px)`} // + 15 from padding
//       top="calc(50% - 20px)" // -10px from padding/2 & -10px from height/2
//       padding="10px"
//       //   left={`calc(${percent}%)`} // + 15 from padding
//       //   left={`calc(${percent}% - ${Number(width) / 2 + 10}px)`} // + 10 from padding
//       onPointerDown={startDrag}
//       border="1px solid red"
//       cursor={canDrag ? "pointer" : undefined}
//       style={{ boxSizing: "content-box", x }}
//     >
//       <MotionBox
//         // w="100%"
//         h="20px"
//         bgColor={bgColor}
//         // bgColor={isDragging ? "twitter.500" : bgColor}
//         // zIndex={isDragging ? 10 : undefined}
//         width={`${width}px`}
//         drag={canDrag ? "x" : false}
//         dragControls={dragControls}
//         dragConstraints={constraintsRef}
//         dragMomentum={false}
//         dragElastic={0}
//         dragTransition={{
//           bounceStiffness: 10,
//           timeConstant: 100,
//           //   timeConstant: 0,
//           modifyTarget: (target) => {
//             const section = trackWidth / 10;
//             const update = Math.round(target / section) * section;
//             console.log(target, update, trackWidth);
//             return update;
//           },
//         }}
//         //   onDrag={update as any}
//         // onDragStart={() => setDragging(true)}
//         onDragEnd={() => {
//           // setDragging(false)
//           const delay = Math.ceil(durationX.get() * 100) / 100;
//           if (!isNaN(delay)) {
//             const oui = { id, delay };
//             console.log(oui, x.get(), durationX.get());
//             // actions.update(oui);
//           }
//         }}
//         onDragTransitionEnd={() => console.log(x.get(), durationX.get())}
//         // backgroundColor: "blue",
//         whileDrag={{ scale: 1.6, zIndex: 10 }}
//         // style={{ boxSizing: "content-box", x }}
//       />
//     </MotionBox>
//   );
// };

//   useEffect(() => {
//     send({
//       type: "UPDATE",
//       key: "stepsInMilliseconds",
//       data: delays.map((second) => second * 1000),
//     });
//   }, [delays]);

//   useEffect(() => {
//     send({ type: "UPDATE", key: "duration", data: duration });
//   }, [duration]);

//   const [isDragging, setDragging] = useState(false);
// const trackWidth = trackRef.current.getBoundingClientRect().width;
// // const initialX = trackWidth * (percent / 100) - trackWidth;
// const initialX = trackWidth * (percent / 100);

// useEffect(() => {
//   x.set(initialX);
//   console.log({ percent, trackWidth, initialX }, items.length);
// }, [initialX]);

// console.log({ percent, trackWidth, initialX });
// const x = useMotionValue(initialX);
// //   console.log(trackRef.current, trackWidth, duration);
// const durationMap = trackRef.current
//   ? makeArrayOf(Math.ceil(duration) + 1).map((_, i) => i)
//   : [];
// const durationXMap = trackRef.current
//   ? makeArrayOf(Math.ceil(duration) + 1).map(
//       (_, i) => i * (trackWidth / (duration + 1)) - trackWidth
//     )
//   : [];
// //   console.log(trackWidth, durationMap, durationXMap);
// // console.log(durationXMap, durationMap);
// const durationX = useTransform(x, durationXMap, durationMap);
// //   durationX.get()
// useEffect(() => {
//   return x.onChange(() => {
//     //   console.log(x.get(), durationX.get());
//     //   console.log(trackWidth, durationMap, durationXMap);
//     const delay = Math.ceil(durationX.get() * 100) / 100;
//     if (!isNaN(delay)) {
//       const oui = { id, delay };
//       // console.log(oui, x.get(), durationX.get());
//       // actions.update(oui);
//     }
//   });
// }, []);

// //   const update = (e, info: PanInfo) => {
// //     console.log(ref, ref.current.getBoundingClientRect(), info);
// //     const trackRect = trackRef.current.getBoundingClientRect();
// //     const trackTotalWidth = trackRect.x + trackRect.width;
// //     const percent = info.point.x / trackTotalWidth;
// //     const updatedDuration = duration * percent;
// //     // actions.update({ id, delay: updatedDuration });
// //     console.log(updatedDuration);
// //     // console.log({ trackTotalWidth, percent, updatedDuration, info, trackRef });
// //   };
// const ref = useRef<HTMLDivElement>();
// const dragControls = useDragControls();
// const items = useAtomValue(selectionAtom);
// const prevItems = usePrevious(items);
// const lastItem = last(items);
// const canDrag = items.length > 1 && lastItem.id !== id;

// // useEffect(() => {
// //   if (items.length !== prevItems?.length) {
// //     x.set(initialX);
// //     console.log(
// //       { percent, trackWidth, initialX },
// //       items.length,
// //       prevItems?.length
// //     );
// //   }
// // }, [items, prevItems]);
// const hoveredStep = useRef<HTMLDivElement>();

// //   const startDrag = (event) =>
// //     canDrag && dragControls.start(event, { snapToCursor: true });
// //   console.log(duration);
// //   console.log(constraintsRef, trackRef);
// //   TODO drag vers le bas pour delete le marker
// return (
//   <MotionBox
//     ref={ref}
//     pos="absolute"
//     //   top="calc(50% - 20px)" // -10px from padding/2 & -10px from height/2
//     //   padding="10px 15px"
//     //   left={`calc(${percent}% - ${Number(width) / 2 + 15}px)`} // + 15 from padding
//     top="calc(50% - 20px)" // -10px from padding/2 & -10px from height/2
//     padding="10px"
//     //   left={`calc(${percent}%)`} // + 15 from padding
//     //   left={`calc(${percent}% - ${Number(width) / 2 + 10}px)`} // + 10 from padding
//     //   onPointerDown={startDrag}
//     border="1px solid red"
//     cursor={canDrag ? "pointer" : undefined}
//     boxSizing="content-box"
//     style={{ x }}
//     drag={canDrag ? "x" : false}
//     dragControls={dragControls}
//     dragConstraints={constraintsRef}
//     dragMomentum={false}
//     dragElastic={0}
//     dragTransition={{
//       bounceStiffness: 10,
//       timeConstant: 100,
//       //   timeConstant: 0,
//       modifyTarget: (target) => {
//         // const section = trackWidth / 10;
//         // const update = Math.round(target / section) * section - 15;
//         // const sectionPercentage = 100 / (items.length + 1) / 100;
//         // const section = trackWidth * sectionPercentage;
//         const sectionPercentage = 100 / duration / 100;
//         const section = trackWidth * sectionPercentage;
//         console.log({
//           section,
//           sectionPercentage,
//         });
//         const update = Math.round(target / section) * section - section / 2;
//         console.log(target, update, trackWidth);
//         console.log("modifyTargetmodifyTargetmodifyTargetmodifyTarget");
//         return update;
//       },
//     }}
//     onDrag={
//       ((event, info) => {
//         const markerRect = ref.current.getBoundingClientRect();
//         const intersectingStepIndex = [
//           ...stepsWrapperRef.current.children,
//         ].findIndex((el) =>
//           areRectsIntersecting(el.getBoundingClientRect(), markerRect)
//         );
//         const intersectingStep = stepsWrapperRef.current.children.item(
//           intersectingStepIndex
//         ) as HTMLDivElement;
//         if (hoveredStep.current) {
//           hoveredStep.current.style.opacity = String(0.1);
//         }
//         hoveredStep.current = intersectingStep;
//         if (intersectingStep) {
//           intersectingStep.style.opacity = String(1);
//         }

//         // console.log(
//         //     stepsRects.some((rect) => areRectsIntersecting(rect, markerRect)),
//         //     // markerRect,
//         // //   stepsWrapperRef.current,
//         // //   stepsRects
//         // );
//         // stepsWrapperRef
//       }) as any
//     }
//     onDragStart={() => setDragging(true)}
//     onDragEnd={() => {
//       setDragging(false);
//       if (hoveredStep.current) {
//         hoveredStep.current.style.opacity = String(0.1);
//       }

//       // setDragging(false)
//       const delay = Math.ceil(durationX.get() * 100) / 100;
//       if (!isNaN(delay)) {
//         const oui = { id, delay };
//         console.log(oui, x.get(), durationX.get());
//         // actions.update(oui);
//       }
//     }}
//     onDragTransitionEnd={() => console.log(x.get(), durationX.get())}
//     // backgroundColor: "blue",
//     //   whileDrag={{ scale: 1.6, zIndex: 10 }}
//     whileDrag={{ scale: 1.6, zIndex: 10 }}
//   >
//     <Box
//       // w="100%"
//       h="20px"
//       bgColor={bgColor}
//       // bgColor={isDragging ? "twitter.500" : bgColor}
//       // zIndex={isDragging ? 10 : undefined}
//       width={`${width}px`}
//     />
//   </MotionBox>
// )

var getDestination = () => {
  var oui = [0, 100, 200, 300, 400, 500, 600, 700];
  var prevValue = 0;
  var searched = 682;
  oui.forEach((value) => {
    if (searched > prevValue && searched < value) {
      return value;
    }
    console.log({ value, prevValue });
    prevValue = value;
  });
};
