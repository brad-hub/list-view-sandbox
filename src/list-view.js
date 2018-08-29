import React from "react";
import _ from "lodash";
import { Icon, Popover, Menu, MenuItem, Position } from "@blueprintjs/core";

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
          {data.map(item => (
            <ListItem {...listItemProps} item={item} key={item._id} />
          ))}
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
    <tr className="list-item">
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
          className="right-cap"
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
  itemMenuActions = [],
  Action = LI_Action
}) {
  const classNames = className + " list-item-actions";
  let actionClassNames = "list-item-action";

  if (
    itemActions &&
    itemActions.length === 1 &&
    (!itemMenuActions || itemMenuActions.length === 0)
  ) {
    actionClassNames += " list-item-action__no-separator";
  }

  return (
    <td className={classNames}>
      {itemActions.map(itemAction => {
        return (
          <Action
            item={item}
            itemAction={itemAction}
            disabled={!itemAction.actionEnabledFn(item)}
            className={actionClassNames}
            key={itemAction.label}
          />
        );
      })}

      {itemMenuActions &&
        itemMenuActions.length > 0 && (
          <div className="menu">
            <Popover
              content={
                <Menu>
                  {itemMenuActions.map(itemMenuAction => {
                    return (
                      <MenuItem
                        disabled={!itemMenuAction.actionEnabledFn(item)}
                        text={itemMenuAction.label}
                        icon={itemMenuAction.icon}
                        onClick={() => itemMenuAction.clickFn(item)}
                        key={itemMenuAction.label}
                      />
                    );
                  })}
                </Menu>
              }
              position={Position.RIGHT_TOP}
            >
              <Icon icon="more" />
            </Popover>
          </div>
        )}
    </td>
  );
}

function LI_Action({
  itemAction,
  item,
  disabled,
  className = "list-item-action"
}) {
  const classNames =
    className + (disabled ? " list-item-action__disabled" : "");

  return (
    <span title={itemAction.label}>
      <Icon
        className={classNames}
        icon={itemAction.icon}
        title={itemAction.label}
        onClick={!disabled ? () => itemAction.clickFn(item) : null}
      />
    </span>
  );
}
const makeItemAction = ({
  label,
  icon = null,
  Action = LI_Action,
  actionEnabledFn = () => true,
  clickFn = _.identity
}) => {
  return { label, icon, Action, actionEnabledFn, clickFn };
};

export default ListView;
export { makeItemAction };
