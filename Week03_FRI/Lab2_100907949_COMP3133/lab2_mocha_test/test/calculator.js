const assert = require("assert");
const calculator = require("../app/calculator")

describe("Calculator", function () {
    it("Adding 5 + 2 returns 7", function () {
        const result1 = calculator.add(5, 2);
        assert.equal(result1, 7);
    })
    it("Adding 5 + 2 expected return is 8", function () {
        const result2 = calculator.add(5, 2);
        assert.equal(result2, 8,
            `add(5,2) Expected 8, but got ${result2} - Test Fail`);
    })

    it("Subtract 5 - 2 returns 3 ", function () {
        const result1 = calculator.sub(5, 2);
        assert.equal(result1, 3);
    })
    it("Subtract 5 - 2 expected return is 5 ", function () {
        const result2 = calculator.sub(5, 2);
        assert.equal(result2, 5,
            `sub(5,2) Expected 5, but got ${result2} - Test Fail`);
    })

    it("Multiply 5 * 2 returns 10", function () {
        const result1 = calculator.mul(5, 2);
        assert.equal(result1, 10);
    })
    it("Multiply 5 * 2 expected return is 12 ", function () {
        const result2 = calculator.mul(5, 2);
        assert.equal(result2, 12,
            `mul(5,2) Expected 12, but got ${result2} - Test Fail`);
    })

    it("Divide 10 / 2 returns 5", function () {
        const result1 = calculator.div(10, 2);
        assert.equal(result1, 5);
    })
    it("Divide 10 /2 expected return is 2 ", function () {
        const result2 = calculator.div(10, 2);
        assert.equal(result2, 2,
            `div(10,2) Expected 2, but got ${result2} - Test Fail`);
    })
})
