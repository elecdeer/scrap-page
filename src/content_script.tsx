chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const color = msg.color as string | undefined;

  if (color !== undefined) {
    console.log(`Receive color = ${color}`);
    document.body.style.backgroundColor = color;
    sendResponse(`Change color to ${color}`);
  } else {
    sendResponse("Color message is none.");
  }
});
