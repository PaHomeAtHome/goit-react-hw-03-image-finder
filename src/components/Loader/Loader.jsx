import { Bars } from 'react-loader-spinner';
import { LoaderStyled } from './LoaderStyled';

export default function Loader() {
  return (
    <LoaderStyled>
      <Bars
        height="50"
        width="50"
        radius="9"
        color="red"
        ariaLabel="three-dots-loading"
      />
    </LoaderStyled>
  );
}
