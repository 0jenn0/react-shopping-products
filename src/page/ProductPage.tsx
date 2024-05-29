import { useEffect, useState } from 'react';
import { CartItems, fetchItems } from '../api';
import ItemCard from '../components/ItemCard/ItemCard';
import ItemList from '../components/ItemList/ItemList';
import Dropdown from '../components/common/Dropdown/Dropdown';
import Header from '../components/common/Header/Header';
import { CATEGORY, SORT } from '../constants';
import useInfinityScroll from '../hooks/useInfinityScroll';
import useProducts from '../hooks/useProducts';
import {
  Container,
  Title,
  DropBoxContainer,
  ContentWrapper,
} from './ProductPage.style';

function ProductPage() {
  const { products, fetchNextPage, loading, changeCategory, changeSorting } =
    useProducts();
  const { lastProductElementRef } = useInfinityScroll(fetchNextPage);
  const [cartItemIds, setCartItem] = useState<number[]>([]);

  useEffect(() => {
    const dd = async () => {
      try {
        const cartItems = await fetchItems();
        const newCartItemIds = cartItems.map((cartItem) => cartItem.product.id);
        setCartItem(newCartItemIds);
      } catch (error) {
        console.log('sdf');
      }
    };
    dd();
  }, []);

  const isInCart = (productId: number) => {
    return cartItemIds.includes(productId);
  };

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <Title>bpple 상품 목록</Title>
        <DropBoxContainer>
          <Dropdown
            onchange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              changeCategory(e.target.value);
            }}
            options={Object.entries(CATEGORY)}
          ></Dropdown>
          <Dropdown
            onchange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              changeSorting(e.target.value);
            }}
            options={Object.entries(SORT)}
          ></Dropdown>
        </DropBoxContainer>

        <ItemList>
          {products.map((product, index) => {
            return (
              <ItemCard
                key={`${product.id}${index}`}
                initIsInCart={isInCart(product.id)}
                {...product}
              />
            );
          })}
        </ItemList>
        {loading && (
          <p style={{ height: '30px', fontSize: '3rem' }}>Loading...</p>
        )}

        {!loading && (
          <div
            ref={lastProductElementRef}
            style={{ height: '30px', fontSize: '5rem' }}
          ></div>
        )}
      </ContentWrapper>
    </Container>
  );
}

export default ProductPage;
