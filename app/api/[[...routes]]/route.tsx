/** @jsxImportSource frog/jsx */

import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import {
  incrementYes,
  incrementNo,
  getState,
  hasVoted,
  addVote,
} from "../../utils/state";
import { v4 as uuidv4 } from "uuid";
import cookie from "cookie";
import { ExtendedFrameContext } from "@/app/types/types";

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  title: "My Kramer Frame",
});

app.use("/*", serveStatic({ root: "./public" }));

app.frame("/", (c) => {
  return c.res({
    action: "/submit",
    image: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundImage: "url(https://i.imgur.com/LvNp8MM.png)",
          backgroundSize: "100% 200%",
          backgroundPosition: "0 -50%",
          filter: "brightness(50%)",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            textAlign: "center",
            filter: "brightness(100%)",
          }}
        >
          There will be over a 10,000 Kramer predictions before 8/29 midnight
        </div>
      </div>
    ),
    intents: [<Button value="yes">Yes</Button>, <Button value="no">No</Button>],
  });
});

app.frame("/submit", (c) => {
  const uid = c.frameData?.fid || -1;

  if (hasVoted(uid)) {
    return c.res({
      image: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundImage: "url(https://i.imgur.com/CJz0Myq.jpeg)",
            backgroundSize: "100% 200%",
            backgroundPosition: "0 -50%",
            filter: "brightness(75%)",
            flexDirection: "column",
            flexWrap: "nowrap",
            height: "100%",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "white",
              fontSize: 60,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              lineHeight: 1.4,
              padding: "0 120px",
              whiteSpace: "pre-wrap",
              textAlign: "center",
              filter: "brightness(100%)",
            }}
          >
            You already voted
          </div>
        </div>
      ),
      intents: [
        <Button.Link href="https://www.newalina.com/">Follow</Button.Link>,
        <Button action="/view">View</Button>,
      ],
    });
  } else {
    addVote(uid);

    const { buttonValue } = c;

    if (buttonValue === "yes") incrementYes();
    if (buttonValue === "no") incrementNo();

    // userId = uuidv4();
    // // Set cookie in response headers
    // c.res().data?.headers?.set(
    //   "Set-Cookie",
    //   cookie.serialize("userId", userId, {
    //     httpOnly: true,
    //     maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    //   })
    // );

    return c.res({
      image: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundImage: "url(https://i.imgur.com/CJz0Myq.jpeg)",
            backgroundSize: "100% 200%",
            backgroundPosition: "0 -50%",
            filter: "brightness(75%)",
            flexDirection: "column",
            flexWrap: "nowrap",
            height: "100%",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "white",
              fontSize: 60,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              lineHeight: 1.4,
              padding: "0 120px",
              whiteSpace: "pre-wrap",
              textAlign: "center",
              filter: "brightness(100%)",
            }}
          >
            {buttonValue === "yes"
              ? "In Kramer we trust"
              : "You really don't think so?"}
          </div>
        </div>
      ),
      intents: [
        <Button.Link href="https://www.newalina.com/">Follow</Button.Link>,
        <Button action="/view">View</Button>,
      ],
    });
  }
});

app.frame("/view", (c) => {
  const state = getState();

  return c.res({
    image: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundImage: "url(https://i.imgur.com/dOtrEhw.jpeg)",
          backgroundSize: "100% 200%",
          backgroundPosition: "0 -50%",
          filter: "brightness(75%)",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: 40,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            textAlign: "center",
            filter: "brightness(100%)",
          }}
        >
          <span style={{ margin: "0 250px 0 10px" }}>
            Yes: {state.yesCount.toString()}
          </span>
          <span>No: {state.noCount.toString()}</span>
        </div>
      </div>
    ),
    intents: [
      <Button.Link href="https://www.newalina.com/">Follow</Button.Link>,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
