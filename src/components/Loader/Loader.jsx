import { Circles } from 'react-loader-spinner';

export default function Loader() {
  return (
    <Circles
      height="180"
      width="180"
      radius="9"
      color="red"
      ariaLabel="three-dots-loading"
    />
  );
}
