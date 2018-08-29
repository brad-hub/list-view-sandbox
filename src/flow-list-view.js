import React from "react";
import ListView, { makeItemAction } from "./list-view";

export default function FlowListView({ data, loading }) {
  const itemActions = [
    makeItemAction({
      label: "Download as CSV",
      icon: "download",
      actionEnabledFn: item => {
        return item.name.length % 2 === 0;
      },
      clickFn: item => {
        alert("Download " + item.name + " clicked");
      }
    })
  ];

  const itemMenuActions = [
    makeItemAction({
      label: "Copy",
      icon: "duplicate",
      actionEnabledFn: item => {
        return true;
      },
      clickFn: item => {
        alert("Copy " + item.name + " clicked");
      }
    }),
    makeItemAction({
      label: "Delete",
      icon: "delete",
      actionEnabledFn: item => {
        return true;
      },
      clickFn: item => {
        alert("Delete " + item.name + " clicked");
      }
    })
  ];

  return (
    <ListView
      primaryClickHandler={item => alert(item.name + " clicked")}
      SecondaryInfo={null}
      itemActions={itemActions}
      itemMenuActions={itemMenuActions}
      data={data}
      loading={loading}
    />
  );
}
