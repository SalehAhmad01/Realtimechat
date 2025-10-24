import * as SecureStore from 'expo-secure-store';

async function set(key, object) {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(object));
  } catch (error) {
    console.log('secure.set:', error);
  }
}

async function get(key) {
  try {
    const data = await SecureStore.getItemAsync(key);
    if (data !== null) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.log('secure.get:', error);
  }
}

async function remove(key) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log('secure.remove:', error);
  }
}

async function wipe() {
  try {
    // Expo SecureStore doesn’t have a clear() method
    // so we manually remove known keys
    console.log('secure.wipe: you must manually clear each key');
  } catch (error) {
    console.log('secure.wipe:', error);
  }
}

export default { set, get, remove, wipe };
