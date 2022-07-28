import {
  Header,
  Form,
  FormButton,
  FormLabel,
  FormInput,
} from './SearchbarStyled';

export default function Searchbar({ onSubmit }) {
  return (
    <Header>
      <Form onSubmit={onSubmit}>
        <FormButton type="submit">
          <FormLabel>Search</FormLabel>
        </FormButton>

        <FormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
}
