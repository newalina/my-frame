import { Context, Env } from "frog";
import type { Input } from "hono";
import { FrameResponseFn } from "../../node_modules/frog/types/frame";
import type { BaseErrorResponseFn } from "../../node_modules/frog/types/response.js";

export type ExtendedFrameContext<
  env extends Env = Env,
  path extends string = string,
  input extends Input = {},
  _state = env["State"]
> = Context<env, path, input, _state> & {
  cycle: "main" | "image";
  deriveState: <
    deriveFn extends (previousState: _state) => void | Promise<void>
  >(
    fn?: deriveFn
  ) => ReturnType<deriveFn> extends Promise<void> ? Promise<_state> : _state;
  error: BaseErrorResponseFn;
  res: FrameResponseFn;
};
