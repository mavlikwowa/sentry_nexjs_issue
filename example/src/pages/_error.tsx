import { ErrorProps } from '~/interfaces/Error.interface';

const Error = ({ statusCode, errorMessage }: ErrorProps): JSX.Element => {
  return (
    <div>
      <p>Ошибка {statusCode}</p>
      {errorMessage && !process.env.IS_PROD && <p>{errorMessage}</p>}
    </div>
  );
};

export default Error;
