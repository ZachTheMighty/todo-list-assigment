export function store(object) {
  if (storageAvailable()) {
    localStorage.setItem(object.id, JSON.stringify(object));
  } else return "Can't use localStorage";
}

export function remove(objectId) {
  if (storageAvailable()) {
    localStorage.removeItem(objectId);
  } else return "Can't use localStorage";
}

function storageAvailable() {
  let storage;
  try {
    storage = window["localStorage"];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
