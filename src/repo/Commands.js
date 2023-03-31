import * as queries from './Queries';

// ==================================================
//  Internal CRUD Operations
// ==================================================

export function __set(key, value) {
    return localStorage[key] = JSON.stringify(value);
}

export function __clear(key) {
    localStorage.removeItem(key);
}

export function __clearAll() {
    localStorage.clear();
}