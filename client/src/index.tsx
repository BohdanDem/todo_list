import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import {store} from "./redux/store";
import TodoForm from "./components/TodoForm/TodoForm";
import Todos from "./components/Todos/Todos";
import Pagination from "./components/Pagination/Pagination";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <>
            <TodoForm/>
            <Todos/>
            <Pagination/>
        </>
    </Provider>
);
