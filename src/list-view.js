import React from "react";
import _ from "lodash";
import { Icon } from "@blueprintjs/core";

class ListView extends React.Component {
  static get defaultProps() {
    return {
      PrimaryInfo: LI_PrimaryInfo,
      SecondaryInfo: LI_SecondaryInfo,
      Actions: LI_Actions,
      ListItem: ListItem,
      loading: false,
      itemActions: [],
      itemMenuActions: []
    };
  }

  render() {
    const {
      data,
      PrimaryInfo,
      primaryClickHandler,
      SecondaryInfo,
      Actions,
      ListItem,
      itemActions = [],
      itemMenuActions = []
    } = this.props;
    const listItemProps = _.omit(this.props, ["data"]);

    return (
      <table className="list-view">
        <tbody>
          {data.map(item => <ListItem {...listItemProps} item={item} />)}
        </tbody>
      </table>
    );
  }
}

function ListItem({
  item,
  PrimaryInfo = null,
  SecondaryInfo = null,
  Actions = null,
  primaryClickHandler = null,
  itemActions = [],
  itemMenuActions = []
}) {
  return (
    <tr className="list-item" key={item._id}>
      {PrimaryInfo && (
        <PrimaryInfo
          item={item}
          className="left-cap"
          primaryClickHandler={primaryClickHandler}
        />
      )}
      {SecondaryInfo && <SecondaryInfo item={item} />}
      {Actions && (
        <Actions
          item={item}
          className="left-cap"
          itemActions={itemActions}
          itemMenuActions={itemMenuActions}
        />
      )}
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

function LI_Actions({
  item,
  className,
  itemActions = [],
  itemMenuActions = []
}) {
  const classNames = className + " list-item-actions";
  return (
    <td className={classNames}>
      {itemActions.map(itemAction => {
        if (itemAction.showFn(item)) {
          return itemAction.actionRender ? (
            itemAction.actionRender()
          ) : (
            <span title={itemAction.label} key={itemAction.label}>
              <Icon
                className="list-item-action"
                icon={itemAction.icon}
                title={itemAction.label}
                onClick={itemAction.clickFn}
              />
            </span>
          );
        } else {
          return "";
        }
      })}

      {itemMenuActions &&
        itemMenuActions.length > 0 && <div className="menu">…</div>}
    </td>
  );
}

const makeItemAction = ({
  label,
  icon = null,
  actionRender = null,
  showFn = () => true,
  clickFn = _.identity
}) => {
  return { label, icon, actionRender, showFn, clickFn };
};

export default ListView;
export { makeItemAction };
