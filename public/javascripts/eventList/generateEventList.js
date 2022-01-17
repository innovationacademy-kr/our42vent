import axios from 'axios';

async function getEventList() {
  try {
    const res = await axios.get('/event/list');
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

getEventList();
