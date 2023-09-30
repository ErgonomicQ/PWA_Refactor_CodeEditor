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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite'); //allows data to be added
  const store = tx.objectStore('jate');// where we'll be storing the data
  await store.add(content, 'content');// where we add the content to the 'jate' object.
  await tx.done;
  console.log('Content added:', content);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store =  tx.objectStore('jate');
  const content = await store.get(1);
  await tx.done;
  console.log('Content loaded:', content);
  return content;
}

initdb();
