import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useAsync } from "react-use";
import { action, tabs } from "webextension-polyfill";

const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();

  const updateCount = (count: number) => {
    setCount(count);
    void action.setBadgeText({ text: count.toString() });
  };

  useAsync(async () => {
    const activeTabs = await tabs.query({ active: true, currentWindow: true });
    const activeTab = activeTabs[0];
    setCurrentURL(activeTab.url);
  }, []);

  const changeBackground = async () => {
    const activeTabs = await tabs.query({ active: true, currentWindow: true });
    const activeTab = activeTabs[0];
    if (activeTab.id !== undefined) {
      const res = (await tabs.sendMessage(activeTab.id, {
        color: "#555555",
      })) as Promise<string>;
      console.log("result message:", res);
    }
  };

  return (
    <>
      <ul style={{ minWidth: "700px" }}>
        <li>Current URL: {currentURL}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
      </ul>
      <button
        onClick={() => updateCount(count + 1)}
        style={{ marginRight: "5px" }}
      >
        count up
      </button>
      <button onClick={changeBackground}>change background</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
