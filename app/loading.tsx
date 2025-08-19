import ClientOnly from "./components/ClientOnly";
import Loader from "./components/Loader";

const Loading = () => {
  return (
    <ClientOnly>
      <Loader />
    </ClientOnly>
  );
};

export default Loading;
