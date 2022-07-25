export default function Button({ loadMore }) {
  return (
    <button className="button" type="button" onClick={loadMore}>
      Load more
    </button>
  );
}
