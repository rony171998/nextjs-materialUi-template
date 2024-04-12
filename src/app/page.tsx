import Container from '@mui/material/Container';
import ProductsView from '@/components/products/view/products-view';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <ProductsView />
    </Container>
  );
}
