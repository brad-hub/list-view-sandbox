import React from "react";
import _ from "lodash";
import { Icon } from "@blueprintjs/core";

class ListView extends React.Component {
  static get defaultProps() {
    return {
      itemRender: props => <ListItem {...props} />,
      primaryRender: (item, primaryClickHandler, className) => (
        <LI_PrimaryInfo
          className={className}
          primaryClickHandler={primaryClickHandler}
          item={item}
        />
      ),
      secondaryRender: (item, className) => (
        <LI_SecondaryInfo className={className} item={item} />
      ),
      actionsRender: (item, className) => (
        <LI_Actions className={className} item={item} />
      )
    };
  }

  render() {
    const {
      data,
      primaryRender,
      primaryClickHandler,
      secondaryRender,
      actionsRender,
      itemRender
    } = this.props;

    return (
      <table className="list-view">
        <tbody>
          {data.map(item =>
            itemRender({
              primaryRender,
              primaryClickHandler,
              secondaryRender,
              actionsRender,
              item
            })
          )}
        </tbody>
      </table>
    );
  }
}

function ListItem({
  item,
  primaryRender,
  primaryClickHandler,
  secondaryRender,
  actionsRender
}) {
  return (
    <tr className="list-item" key={item._id}>
      {primaryRender && primaryRender(item, primaryClickHandler, "left-cap")}
      {secondaryRender && secondaryRender(item)}
      {actionsRender && actionsRender(item, "right-cap")}
    </tr>
  );
}

/**
 * LI_PrimaryInfo includes common functionality using the item's fields:
 *  name, status, shared, owner
 */
function LI_PrimaryInfo({ item, className, primaryClickHandler = _.identity }) {
  const classNames = className + " list-item-info";
  const statusClassName = item.status === "OK" ? "status--ok" : "status--error";
  const primaryClicker = () => primaryClickHandler(item);

  return (
    <td className={classNames}>
      {item.status && (
        <div className={"status " + statusClassName}>{item.status}</div>
      )}
      <div className="name" onClick={primaryClicker}>
        {item.name}
      </div>
      <div className="shared">{item.shared}</div>
      <div className="owner">{item.owner}</div>
    </td>
  );
}

/**
 * LI_SecondaryInfo is an example component and will likely be overridden in practice.
 */
function LI_SecondaryInfo({ item, className }) {
  const classNames = className + " list-item-addl-info";
  return (
    <td className={classNames}>
      <div className="created">{item.created}</div>
      <div className="tags">{item.tags}</div>
    </td>
  );
}

function LI_Actions({ item, className }) {
  const classNames = className + " list-item-actions";
  return (
    <td className={classNames}>
      <div className="download">⇓</div>
      <div className="separator">|</div>
      <div className="menu">…</div>
    </td>
  );
}

export default ListView;
