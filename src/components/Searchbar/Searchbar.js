import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import { Wrapper, Form, Button, Label, Input } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInput = event => {
    setSearchQuery(
    event.currentTarget.value.toLowerCase().trim(),
    );
  };

  const handleSubmit = event => {
      event.preventDefault();
      
    if (searchQuery.trim() === '') {
          toast.warn('Please enter search query');  
          return;    
    }
      onSubmit(searchQuery);
  };

    return (
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Button type="submit">
            <ImSearch />
            <Label>Search</Label>
          </Button>
          <Input
            type="text"
            value={searchQuery}
            onChange={handleInput}
            placeholder="Search images"
          />
        </Form>
      </Wrapper>
    );
  }


export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
