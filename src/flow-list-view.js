import React from "react";
import ListView from "./list-view";

export default function FlowListView({ data }) {
  return (
    <ListView
      primaryClickHandler={item => alert(item.name + " clicked")}
      secondaryRender={null}
      data={data}
    />
  );
}
