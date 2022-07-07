import { runtime } from "webextension-polyfill";

runtime.onMessage.addListener(async (msg, sender) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const color = msg.color as string | undefined;

  if (color !== undefined) {
    console.log(`Receive color = ${color}`);
    document.body.style.backgroundColor = color;

    return `Change color to ${color}`;
  } else {
    return `"Color message is none."`;
  }
});
