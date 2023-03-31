import { __get, __init } from '../Queries';

describe('Queries Repository', () =>
{
    afterEach(() => localStorage.clear());

    describe(__init.name, () =>
    {
        const initCases = [
            ['Low', 'PriorityTypes', 0],
            ['Archived', 'StatusTypes', 3]
        ];

        test.each(initCases)
            ('Should return default data, when no data is present.', (expected, key, index) =>
            {
                // Arrange
                const value = __init(key);

                // Act
                const actual = JSON.parse(value);

                // Assert
                expect(actual).toBeInstanceOf(Array);
                expect(actual[index]).toBe(expected);
            });

        test.each(initCases)
            ('Should set the local storage, when initialising a value.', (expected, key, index) =>
            {
                // Arrange
                __init(key);

                // Act
                const actual = JSON.parse(localStorage.getItem(key));

                // Assert
                expect(actual).toBeInstanceOf(Array);
                expect(actual[index]).toBe(expected);
            });
    });

    describe(__get.name, () =>
    {
        const getCases = [
            ['Low', 'PriorityTypes', 0],
            ['Archived', 'StatusTypes', 3]
        ];

        test.each(getCases)
            ('Should return default data, when no data is present.', (expected, key, index) =>
            {
                // Act
                const actual = __get(key);

                // Assert
                expect(actual).toBeInstanceOf(Array);
                expect(actual[index]).toBe(expected);
            });
    });
});