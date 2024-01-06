const { isInvalidEmail, isEmptyPayload } = require('../validator')

test('valid email', function() {
    const testPayload = {
        name: "test name",
        email: "test.email@example.com",
        interests: "testing"
    }
    const result = isInvalidEmail(testPayload)
    expect(result).toBe(false)
})


test('invalid email', function() {
    const testPayload = {
        name: "test name",
        email: "test.email",
        interests: "testing"
    }
    const result = isInvalidEmail(testPayload)
    expect(result).toBe(true)
})

test('empty payload', function() {
        const testPayLoad = {}
        const result = isEmptyPayload(testPayLoad)
        expect(result).toBe(true)
})

test('non-empty payload', function() {
    const testPayLoad = {
        name: "test name",
        email: "test.email@exampl",
        interests: "testing"
    }
    const result = isEmptyPayload(testPayLoad)
    expect(result).toBe(false)
})
