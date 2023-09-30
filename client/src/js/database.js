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
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite'); //allows data to be added
  const store = tx.objectStore('jate');// where we'll be storing the data
  await store.add(content, 'content');// where we add the content to the 'jate' object.
  await tx.done;
  console.log('Content added:', content);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const content = await store.getAll();
    await tx.done;
    console.log('Content loaded:', content);

    if (content && content.length > 0) {
      // Assuming content is an array of strings
      const mergedContent = content.join('\n'); // Merge array elements into a single string
      return mergedContent;
    } else {
      return ''; // Return an empty string if there is no content in the database
    }
  } catch (error) {
    console.error('Error loading content:', error);
    throw error;
  }
};

initdb();
