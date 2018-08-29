import React from "react";
import { Icon } from "@blueprintjs/core";
import ListView, { makeItemAction } from "./list-view";

export default function StreamListView({ data, loading }) {
  function StreamsSecondaryInfo({ item, className }) {
    const classNames = className + " list-item-addl-info";
    return (
      <td className={classNames}>
        <div className="batches">
          <Icon icon="tick" /> {item.batches}
        </div>
        <div className="period">
          <Icon icon="calendar" /> {item.period}
        </div>
      </td>
    );
  }

  const itemActions = [
    makeItemAction({
      label: "Delete",
      icon: "delete",
      clickFn: item => {
        alert("Delete " + item.name + " clicked");
      }
    })
  ];

  return (
    <ListView
      primaryClickHandler={item => alert(item.name + " clicked")}
      SecondaryInfo={StreamsSecondaryInfo}
      itemActions={itemActions}
      data={data}
      loading={loading}
    />
  );
}
