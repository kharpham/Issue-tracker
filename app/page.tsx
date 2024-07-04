import Pagination from "./components/Pagination";

export default function Home() {
  return <Pagination currentPage={2} pageSize={10} itemCount={20} />;
}
