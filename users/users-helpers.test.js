const { validateUser } = require('./users-helpers')

// sent an empty object, we saw the result fail
// sent an object with a username less than two characters, we verified it failed
// sent an object with a valid username, no password

describe('users helpers', () => {
    describe('validateUser()', () => {
        it('should fail when missing username and password', () => {
            // Arrange: setup the world for the test
            const invalidUser = {}
            const expected = false;

            // Act: execute the system under test (SUT) => validateUser method
            const actual = validateUser(invalidUser)

            //Assert: we check the result
            expect(actual.isSuccessful).toBe(expected) //matchers
        })

        it('should fail if missing password', () => {
            expect(validateUser({ username: 'sombody' }).isSuccessful).toBe(false)
            expect(validateUser({ username: 'sombody' }).errors).toHaveLength(1)
            expect(validateUser({ username: 'sombody' }).errors[0]).toMatch(/include a password/i)
        })

        it('should success if called with a valid user', () => {
            expect(validateUser({ username: 'somebody', password: 'valid password' }).isSuccessful).toBe(true)
            expect(validateUser({ username: 'somebody', password: 'valid password' }).errors).toHaveLength(0)
        })

        it.todo('should fail if username is an object')
        it.todo('should fail if username is an array')
        it.todo('should fail if username is an NaN')
        it.todo('should fail if username is an null')
    })
})