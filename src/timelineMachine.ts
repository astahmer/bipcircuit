import { AnimationControls } from "framer-motion";
import { MutableRefObject } from "react";
import { assign, createMachine } from "xstate";
import { BipInfos } from "./functions/useBipInfos";

export const createTimelineMachine = ({
  controls,
  interval = 100,
  onUpdateTime,
  onReachStep,
  ref,
  loopTo = 0,
}: {
  controls: AnimationControls;
  interval?: number;
  loopTo?: number;
  onUpdateTime: (ctx: TimelineMachineContext) => void;
  onReachStep: () => void;
  ref: MutableRefObject<BipInfos>;
}) =>
  createMachine<TimelineMachineContext, TimelineMachineEvents>(
    {
      id: "timeline",
      initial: "stop",
      context: {
        settings: { interval, loopTo },
        controls,
        ref,
        current: { elapsedTime: 0, loopCount: 0 },
      },
      states: {
        stop: {
          on: {
            START: { target: "started.playing" },
          },
        },
        started: {
          states: {
            playing: {
              entry: "start",
              on: {
                INC: { actions: "incrementElapsedTime" },
                PAUSE: { target: "paused", actions: "pause" },
                END: {
                  target: "#timeline.end",
                  actions: [
                    onReachStep,
                    "incrementLoopCount",
                    // "setElapsedTimeToDuration",
                  ],
                },
              },
              invoke: {
                id: "endAfterDuration",
                src: (ctx, event) => (send, onReceive) => {
                  const id = setInterval(() => {
                    const duration = ctx.ref.current.duration;
                    // console.log(ctx.current.elapsedTime, duration);
                    if (ctx.current.elapsedTime >= duration * 1000) {
                      send("END");
                    }
                  }, interval);
                  return () => clearInterval(id);
                },
              },
              activities: ["incrementTime"],
            },
            paused: { on: { START: { target: "playing" } } },
          },
        },
        end: {
          always: {
            target: "started.playing",
            actions: ["resetElapsedTime", "reset"],
            cond: "shouldLoop",
          },
          on: {
            START: {
              target: "started.playing",
              actions: ["resetElapsedTime", "reset", "resetLoopCount"],
            },
          },
        },
      },
      on: {
        STOP: {
          target: "stop",
          actions: ["stop", "resetElapsedTime", "resetLoopCount"],
        },
        UPDATE: { actions: "update" },
      },
    },
    {
      actions: {
        resetElapsedTime: assign({
          current: (ctx) => ({ ...ctx.current, elapsedTime: 0 }),
        }),
        resetLoopCount: assign({
          current: (ctx) => ({ ...ctx.current, loopCount: 0 }),
        }),
        incrementLoopCount: (ctx) => ctx.current.loopCount++,
        // setElapsedTimeToDuration: (ctx) => {
        //   ctx.current.elapsedTime = ctx.ref.current.duration * 1000;
        //   onUpdateTime(ctx.current.elapsedTime);
        // },
        update: assign(
          (ctx, event) =>
            event.type === "UPDATE" && {
              ...ctx,
              [event.key]:
                typeof event.data === "function"
                  ? event.data(ctx[event.key])
                  : event.data,
            }
        ),
        start: (ctx) => {
          const duration = ctx.ref.current.duration;
          const remaining = duration - ctx.current.elapsedTime / 1000;

          ctx.controls.start({
            x: "100%",
            transition: {
              type: "tween",
              ease: "linear",
              duration: remaining,
            },
          });
        },
        pause: (ctx) => ctx.controls.stop(),
        reset: (ctx) => ctx.controls.set({ x: "0%" }),
        stop: (ctx) => {
          ctx.controls.stop();
          ctx.controls.set({ x: "0%" });
        },
      },
      guards: {
        shouldLoop: (ctx, event) =>
          ctx.current.loopCount + 1 < ctx.settings.loopTo,
      },
      activities: {
        incrementTime: (ctx, _event) => {
          const interval = setInterval(() => {
            ctx.current.elapsedTime =
              ctx.current.elapsedTime + ctx.settings.interval;
            onUpdateTime(ctx);

            const stepsInMilliseconds = ctx.ref.current.timePoints.map(
              (second) => second * 1000
            );
            // console.log(ctx.current.elapsedTime, stepsInMilliseconds, ctx);
            if (stepsInMilliseconds.includes(ctx.current.elapsedTime)) {
              onReachStep();
            }
          }, ctx.settings.interval);

          return () => clearInterval(interval);
        },
      },
    }
  );

interface TimelineMachineContext {
  settings: { interval: number; loopTo: number };
  controls: AnimationControls;
  ref: MutableRefObject<BipInfos>;
  current: {
    elapsedTime: number;
    loopCount: number;
  };
}

interface UpdateEvent<K extends keyof TimelineMachineContext> {
  type: "UPDATE";
  key: keyof TimelineMachineContext;
  data:
    | TimelineMachineContext[K]
    | ((data: TimelineMachineContext[K]) => TimelineMachineContext[K]);
}
type TimelineMachineEvents =
  | UpdateEvent<any>
  | { type: "START" }
  | { type: "STOP" }
  | { type: "INC" }
  | { type: "PAUSE" }
  | { type: "END" };
