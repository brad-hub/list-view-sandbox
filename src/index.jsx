import React from "react";
import ReactDOM from "react-dom";

import FlowListView from "./flow-list-view";
import StreamListView from "./stream-list-view";

import FlowListData from "./flowListData";
import StreamListData from "./streamListData";

import "./styles.scss";

function App() {
  return (
    <div className="App">
      <h1>💩 List View Test 💩</h1>

      <h3>Flows</h3>
      <FlowListView data={FlowListData.slice(0, 4)} />

      <br />
      <br />

      <h3>Streams</h3>
      <StreamListView data={StreamListData.slice(0, 4)} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
