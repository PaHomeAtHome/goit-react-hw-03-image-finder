import { Bars } from 'react-loader-spinner';
import { LoaderStyled } from './LoaderStyled';

export default function Loader() {
  return (
    <LoaderStyled>
      <Bars
        height="100"
        width="100"
        radius="9"
        color="red"
        ariaLabel="three-dots-loading"
      />
    </LoaderStyled>
  );
}
