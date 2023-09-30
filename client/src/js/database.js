import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// This method collects the on screen data and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const db = await openDB('jate', 1); //this open a jate database with a ver 1
  const tx = db.transaction('jate', 'readwrite'); //this is how we write the info to the index
  const store = tx.objectStore('jate');//this access the store in the 'jate' object we made
  const request = store.put({ id: 1, value: content });// this create a request, and stuffs the specified content in the object with an id of 1.
  const result = await request; //waits for that to complete
  console.log('Data saved', result); // And then logs a save message, ideally, with the result.
};


export const getDb = async () => {
  console.log('GET from the database');
  const db = await openDB('jate', 1); //This *opens* the database with the version 1
  const tx = db.transaction('jate', 'readonly'); // This starts a Readonly transaction on out 'jate' object
  const store = tx.objectStore('jate');// access the 'jate' object from before
  const request = store.get(1);// as above, create a request to get data with id 1 from the objects 'store'
  const result = await request; //wait for the GET
  result //if data is found, log the retreival message. otherwise through a 'not found' log
    ? console.log('Data retrieved from the database', result.value)
    : console.log('Data not found in the database');
  return result?.value; //return the data
};

initdb();
