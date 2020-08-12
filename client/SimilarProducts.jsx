import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight as rightArrow, faChevronCircleLeft as leftArrow } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import ProductList from './ProductList';
import Toast from './Toast';

const axios = require('axios');

const MainContainer = styled.div`

`;

const SimilarProductsContainer = styled.div`
  display: flex;
  width: 90vw;
  height: 450px;
  // background-color: green;
  padding-right: 50px;
  padding-left: 15px;
`;

const EmptyDiv = styled.div`
  height: 450px;
  width: 18px;
`;

class SimilarProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productsInView: [],
      index: 0,
      showRightArrow: false,
      showLeftArrow: false,
      clickedName: '',
    };

    this.onClickRight = this.onClickRight.bind(this);
    this.onClickLeft = this.onClickLeft.bind(this);
    this.onLeave = this.onLeave.bind(this);
    this.onHover = this.onHover.bind(this);
    this.onLikeBagClick = this.onLikeBagClick.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3001/photos/2')
      .then((similarProducts) => {
        this.setState({
          products: similarProducts.data,
          productsInView: similarProducts.data.slice(0, 4),
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  onClickRight() {
    const { products, index } = this.state;
    const newIndex = index + 4;
    if (index <= 4) {
      this.setState({
        productsInView: products.slice(newIndex, newIndex + 4),
        index: newIndex,
      });
    }
  }

  onClickLeft() {
    const { products, index } = this.state;
    const newIndex = index - 4;
    if (index >= 4) {
      this.setState({
        productsInView: products.slice(newIndex, newIndex + 4),
        index: newIndex,
        showLeftArrow: true,
      });
    }
  }

  onHover() {
    const { index } = this.state;
    if (index === 0) {
      this.setState({
        showRightArrow: true,
        showLeftArrow: false,
      });
    } if (index === 4) {
      this.setState({
        showRightArrow: true,
        showLeftArrow: true,
      });
    } if (index === 8) {
      this.setState({
        showRightArrow: false,
        showLeftArrow: true,
      });
    }
  }

  onLeave() {
    this.setState({
      showLeftArrow: false,
      showRightArrow: false,
    });
  }

  onLikeBagClick(name) {
    this.setState({
      clickedName: name,
    });
  }

  render() {
    const {
      products, index, showLeftArrow, showRightArrow, clickedName,
    } = this.state;
    return (
      <MainContainer>
        <Toast name={clickedName} />
        <h1>Similar Products</h1>
        <SimilarProductsContainer onMouseEnter={this.onHover} onMouseLeave={this.onLeave}>
          {showLeftArrow
            ? (
              <FontAwesomeIcon
                icon={leftArrow}
                onClick={this.onClickLeft}
                style={{
                  position: 'relative',
                  top: '50%',
                  transform: 'scale(1.5)',
                  visibility: showLeftArrow ? 'visible' : 'hidden',
                }}
              />
            )
            : <EmptyDiv />}
          <ProductList
            index={index}
            products={products}
            onLikeBagClick={this.onLikeBagClick}
          />
          {showRightArrow
            ? (
              <FontAwesomeIcon
                icon={rightArrow}
                onClick={this.onClickRight}
                style={{
                  position: 'relative',
                  top: '50%',
                  transform: 'scale(1.5)',
                  visibility: showRightArrow ? 'visible' : 'hidden',
                }}
              />
            )
            : <EmptyDiv />}
        </SimilarProductsContainer>
        <div className="scrollbar">Scrollbar</div>
      </MainContainer>
    );
  }
}

export default SimilarProducts;
