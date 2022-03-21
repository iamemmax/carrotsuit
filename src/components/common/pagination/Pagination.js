import React, { Component } from 'react';
import classnames from "classnames";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
    this.changePage = this.changePage.bind(this);
  }
  changePage(page) {
    this.props.changePage(page);
    this.setState({
      currentPage: page
    });
  }
  renderPageNumbers(pages) {
    let currentPage = this.state.currentPage;
    const pageNumbers = [];
    for (let pageNumber = 1; pageNumber <= pages; pageNumber += 1) {
      pageNumbers.push(pageNumber);
    }
    if (pages > 1)
      return (
        <ul className="pagination justify-content-end pagination-sm">
          <li
            className={ classnames('page-item', {'disabled': this.state.currentPage === 1})}
          >
            <a
              className="page-link"
              aria-label="Previous"
              onClick={() => this.changePage(this.state.currentPage - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pageNumbers.map( number => (
            <li
              key={number}
              className={ classnames('page-item', {'active': currentPage === number})}
            >
              <a
                onClick={() => this.changePage(number)}
                className="page-link" >{number}</a>
            </li>
          ))}

          <li
            className={ classnames('page-item', {'disabled': currentPage === pages})}
          >
            <a
              className="page-link"
              aria-label="Next"
              onClick={() => this.changePage(currentPage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      );
  }
  render() {
    const { pages } = this.props;
    return (
      <nav aria-label="Page navigation example">{this.renderPageNumbers(pages)}</nav>
    );
  }
}
export default Pagination;
