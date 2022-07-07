import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useAsync } from "react-use";
import { storage } from "webextension-polyfill";

const Options = () => {
  const [color, setColor] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [like, setLike] = useState<boolean>(false);

  useAsync(async () => {
    const value = (await storage.sync.get({
      favoriteColor: "red",
      likesColor: true,
    })) as {
      favoriteColor: string;
      likesColor: boolean;
    };

    setColor(value.favoriteColor);
    setLike(value.likesColor);
  }, []);

  const timerId = useRef<number>();
  const saveOptions = async () => {
    await storage.sync.set({
      favoriteColor: color,
      likesColor: like,
    });

    setStatus("Options saved.");

    if (timerId.current !== undefined) {
      window.clearTimeout(timerId.current);
    }
    timerId.current = window.setTimeout(() => {
      setStatus("");
    }, 3000);
  };

  return (
    <>
      <div>
        Favorite color:{" "}
        <select
          value={color}
          onChange={(event) => setColor(event.target.value)}
        >
          <option value="red">red</option>
          <option value="green">green</option>
          <option value="blue">blue</option>
          <option value="yellow">yellow</option>
        </select>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={like}
            onChange={(event) => setLike(event.target.checked)}
          />
          I like colors.
        </label>
      </div>
      <button onClick={saveOptions}>Save</button>
      <div>{status}</div>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
