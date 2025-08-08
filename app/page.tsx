import Container from "./components/Container";
import EmptyState from "./components/EmptyState";

export default function Home() {
  const isEmpty = true;

  if (isEmpty) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-8">
        <div>My future listings</div>
      </div>
    </Container>
  );
}
