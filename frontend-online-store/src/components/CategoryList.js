import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class CategoryList extends React.Component {
  constructor() {
    super();

    this.fetchCategories = this.fetchCategories.bind(this);

    this.state = {
      categoryList: [],
    };
  }

  componentDidMount() { this.fetchCategories(); }

  async fetchCategories() {
    const categoryList = await api.getCategories();
    this.setState({ categoryList });
  }

  render() {
    const { categoryList } = this.state;
    const { handleCategorySelect } = this.props;

    return (
      <aside>
        {
          categoryList.map(({ id, name }) => (
            <label key={ id } data-testid="category" htmlFor={ id }>
              <input
                id={ id }
                type="radio"
                name="category"
                onClick={ handleCategorySelect }
              />
              { name }
            </label>
          ))
        }
      </aside>
    );
  }
}

CategoryList.propTypes = ({
  handleCategorySelect: PropTypes.func.isRequired,
});

export default CategoryList;
