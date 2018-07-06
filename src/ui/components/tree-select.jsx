import React, { Component, Fragment } from 'react';
import '../../../dist/components/treeSelect.css';

class TreeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNodes: [],
      openNodes: [],
    };
  }

  getPath(members, id, path = []) {
    for (const item of members) {
      path.push(item);
      if (item.label === id) {
        return path;
      } else if (item.members) {
        const result = this.getPath(item.members, id, path);
        if (result) {
          return result;
        }
      }
      path.pop();
    }
  }

  _handleNodeClick(node, e) {
    if (node.members) {
      this.toggleNode(node);
    } else {
      const path = this.getPath(this.props.data, node.label);
      this.setState({ activeNodes: path.map(d => d.label) });
      this.setState({ selectedNode: node });
      this.toggleTreeSelect();
      this.props.onSelect(node);
    }
  }

  toggleNode(node) {
    const openNodes = this.state.openNodes;
    if (openNodes.includes(node.label)) {
      openNodes.splice(openNodes.indexOf(node.label));
    } else {
      openNodes.push(node.label);
    }
    this.setState({ openNodes });
  }

  buildTree(data, open) {
    return (
      <ul className={open ? 'open' : ''}>
        {data.map(node => (
          <li key={node.label} className={node.members ? 'branch' : ''}>
            <span
              onClick={e => this._handleNodeClick(node, e)}
              className={this.state.activeNodes.includes(node.label) ? 'active' : ''}
            >
              {node.label}
            </span>
            {node.members &&
              this.buildTree(node.members, this.state.openNodes.includes(node.label))}
          </li>
        ))}
      </ul>
    );
  }

  toggleTreeSelect() {
    if (this.state.showMenu) {
      this.setState({ showMenu: false });
    } else {
      this.setState({ showMenu: true });
    }
  }

  render() {
    return (
      <Fragment>
        <a className="button dropdown" onClick={e => this.toggleTreeSelect()}>
          {this.state.selectedNode ? this.state.selectedNode.label : 'Select'}
        </a>
        <div
          className={this.state.showMenu ? 'tree-select-menu tree-select-open' : 'tree-select-menu'}
        >
          {this.buildTree(this.props.data)}
        </div>
      </Fragment>
    );
  }
}

TreeSelect.defaultProps = {
  data: [],
};

export default TreeSelect;