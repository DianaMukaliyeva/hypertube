import React from 'react';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [message, setMessage] = React.useState('');
  const [items, setItems] = React.useState([1, 2]);

  const getMessage = async (url = '') => {
    const res = await axios.get(baseURL + url);
    setMessage(res.data);
  };

  const addItem = async (e) => {
    e.preventDefault();
    await axios.post(baseURL + '/items', { name: e.target.name.value });
    e.target.name.value = '';
    getItems();
  };

  const getItems = async () => {
    const res = await axios.get(baseURL + '/items');
    setItems(res.data.items);
  };

  React.useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <p>Hypertube is here!!!</p>
      {message ? (
        message
      ) : (
        <button
          onClick={() => {
            getMessage();
          }}>
          Get some message from backend
        </button>
      )}
      <form style={{ padding: '20px 0' }} onSubmit={addItem}>
        <label>name:</label>
        <input name="name"></input>
        <button type="submit">Save</button>
      </form>
      <h3>List of all items:</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
