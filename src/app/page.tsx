import Container from '@mui/material/Container';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Footer />
    </Container>
  );
}
