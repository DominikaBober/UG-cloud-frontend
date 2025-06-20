import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './style/index.scss';
import App from './ui/App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
