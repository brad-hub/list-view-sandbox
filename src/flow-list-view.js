import React from "react";
import ListView, { makeItemAction } from "./list-view";

export default function FlowListView({ data, loading }) {
  const itemActions = [
    makeItemAction({
      label: "Download as CSV",
      icon: "download",
      showFn: item => {
        return item.name.length % 2 === 0;
      },
      clickFn: item => {
        alert("Download " + item.name + " clicked");
      }
    })
  ];

  const itemMenuActions = [
    makeItemAction({
      label: "Download as CSV",
      icon: "download",
      showFn: item => {
        return item.name.length % 2 === 0;
      },
      clickFn: item => {
        alert("Download " + item.name + " clicked");
      }
    })
  ];

  return (
    <ListView
      primaryClickHandler={item => alert(item.name + " clicked")}
      SecondaryInfo={null}
      itemActions={itemActions}
      data={data}
      loading={loading}
    />
  );
}
