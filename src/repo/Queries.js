import * as db from './__db__/SampleData';

// ==================================================
//  Internal CRUD Operations
// ==================================================

export function __init(key) {
    const value = db[key];
    return localStorage[key] = JSON.stringify(value);
}

export function __get(key) {
    let value = localStorage[key] || __init(key);
    return JSON.parse(value);
}