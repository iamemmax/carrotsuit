import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';

 const SearchInput = ({onSearch, placeholder}) => {
  return (
    <Form inline className="cr-search-form" onSubmit={e => e.preventDefault()}>
      <MdSearch
        size="20"
        color="#fc5c7d"
        className="cr-search-form__icon-search text-secondary"
      />
      <Input
        type="search"
        onChange={e => onSearch(e.target.value)}
        className="cr-search-form__input"
        placeholder={placeholder? placeholder: "Search..."} 
      />
    </Form>
  );
};

export default SearchInput;