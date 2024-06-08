import {
  ProductItemCard,
  ItemList,
  CartItemsModal,
  Spinner,
  Dropdown,
  Header,
} from '@/components/index';
import { CATEGORY, SORT } from '@/constants/index';
import {
  Container,
  Title,
  DropBoxContainer,
  ContentWrapper,
} from './ProductPage.style';
import { useIntersectionObserver, useInfiniteProducts } from '@/hooks/index';

function ProductPage() {
  const {
    products,
    fetchNextPage,
    loading,
    changeCategory,
    changeSorting,
    error,
  } = useProducts();
  const { lastProductElementRef } = useInfinityScroll(fetchNextPage);
  const { cartItemIds, isInCart } = useCartItems();

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

        {cartItemIds !== null && (
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
        )}
        {loading && (
          <p style={{ height: '30px', fontSize: '3rem' }}>Loading...</p>
        )}

        {!loading && !error && (
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
