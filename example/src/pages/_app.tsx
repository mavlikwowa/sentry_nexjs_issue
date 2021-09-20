import handler from '~/api/api';

export const App = () => {
  return (
    <>
      <p>Hei!</p>
    </>
  );
};

App.getInitialProps = async (appContext) => {
  await handler(0, 0);
};

export default App;
