import { __set, __clear, __clearAll } from '../Commands';
import { __get, __init } from '../Queries';

describe('Commands Repository', () =>
{
    afterEach(() => localStorage.clear());

    describe(__set.name, () =>
    {
        it('Should update information within the local storage.', () =>
        {
            // Arrange
            const key = 'StatusTypes';
            const newValue = 'UPDATED';
            const expected = __get(key);
            expected.push(newValue);

            // Act
            __set(key, expected);

            // Assert
            const actual = __get(key);
            expect(actual).toEqual(expected);
        });
    });

    describe(__clear.name, () =>
    {
        it('Should clear the specified key within local storage.', () =>
        {
            // Arrange
            const key = 'StatusTypes';
            __init(key);

            // Act
            __clear(key);

            // Assert
            const actual = localStorage[key];
            expect(actual).toBeUndefined();
        });

        it('Should only clear the specified key within local storage, and leave others intact.', () =>
        {
            // Arrange
            const key = 'StatusTypes';
            let expectedPriorities = __get('PriorityTypes');
            __init(key);

            // Act
            __clear(key);

            // Assert
            const actual = localStorage[key];
            expect(actual).toBeUndefined();
            const actualPriorities = __get('PriorityTypes');
            expect(actualPriorities).toEqual(expectedPriorities);
        });
    });

    describe(__clearAll.name, () =>
    {
        it('Should clear all keys within the local storage.', () =>
        {
            // Arrange
            __init('StatusTypes');
            __init('PriorityTypes');

            // Act
            __clearAll();

            // Assert
            expect(localStorage['StatusTypes']).toBeUndefined();
            expect(localStorage['PriorityTypes']).toBeUndefined();
            expect(localStorage.length).toBe(0);
        });
    });
});