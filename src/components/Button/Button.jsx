import { ButtonStyled } from './ButtonStyled';

export default function Button({ loadMore }) {
  return (
    <ButtonStyled type="button" onClick={loadMore}>
      Load more
    </ButtonStyled>
  );
}
