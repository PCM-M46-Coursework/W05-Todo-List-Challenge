/**
 * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
 *
 * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
 *
 * Dispatches a storage event on Window objects holding an equivalent Storage object.
 */
Storage.prototype.storeObject = function(key, objValue)
{
    return this.setItem(key, JSON.stringify(objValue));
};

/** Returns the current value associated with the given key, or null if the given key does not exist. */
Storage.prototype.getObject = function(key, defaultValue)
{
    const value = this.getItem(key);
    if (!key) return defaultValue;
    return JSON.parse(value);
}