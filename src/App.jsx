import RouterComponent from './router.jsx'
import { Provider } from 'react-redux';
import { store } from './store'; 

function App() {
  return (
  <Provider store={store}>

     <RouterComponent />
    </Provider>
    );
}
export default  App

  
