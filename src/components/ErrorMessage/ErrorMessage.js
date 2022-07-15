import PropTypes from 'prop-types';
import { Text } from './ErrorMessage.styled';

const ErrorMessage = ({ message }) => (
  <Text>Whoops, something went wrong: {message}</Text>
);

ErrorMessage.propTypes =
    { message: PropTypes.string.isRequired };

export default ErrorMessage;