import React, { Component } from "react";

class Tabs extends Component {
  state = {
    selected: this.props.selected || 0
  };

  handleChange(index) {
    this.setState({ selected: index });
  }

  render() {
    return (
      <>
        <ul className="ul-tab">
          {this.props.children.map((elem, index) => {
            let style = index === this.state.selected ? "selected" : "";
            return (
              <li
              style={{padding:'10px'}}
                key={index}
                className={style}
                onClick={() => this.handleChange(index)}
              >
                {elem.props.title}
              </li>
            );
          })}
        </ul>
        <div className="tab">{this.props.children[this.state.selected]}</div>
      </>
    );
  }
}

export default Tabs;