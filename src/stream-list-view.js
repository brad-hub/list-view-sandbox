import React from "react";
import { Icon } from "@blueprintjs/core";
import ListView from "./list-view";

export default function StreamListView({ data }) {
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

  return (
    <ListView
      primaryClickHandler={item => alert(item.name + " clicked")}
      secondaryRender={(item, className) => (
        <StreamsSecondaryInfo className={className} item={item} />
      )}
      data={data}
    />
  );
}
