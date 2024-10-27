export function randomFloat(options = {}) {
    const {
        minDifference = 0.001,  // Minimum difference between consecutive numbers
        entropyFactor = 1,      // Higher values (1-10) increase entropy
        maxAttempts = 1000      // Prevent infinite loops
    } = options;

    // Static state maintained between calls
    if (typeof randomFloat.state0 === 'undefined') {
        randomFloat.state0 = Date.now() >>> 0;
        randomFloat.state1 = (Date.now() * 7) >>> 0;
        randomFloat.previousNumbers = new Set();
    }

    // Enhanced xorshift+ with entropy factor
    function generateNumber() {
        let s1 = randomFloat.state0;
        const s0 = randomFloat.state1;

        // Apply entropy factor to shift operations
        s1 ^= s1 << (23 * entropyFactor);
        s1 ^= s1 >>> (17 * entropyFactor);
        s1 ^= s0;
        s1 ^= s0 >>> (26 * entropyFactor);

        randomFloat.state0 = s0;
        randomFloat.state1 = s1;

        // Generate base number between 0 and 1
        const result = (s0 + s1) >>> 0;
        return result / 4294967296;
    }

    let attempts = 0;
    let newNumber;

    // Keep generating until we get a unique number with minimum difference
    do {
        newNumber = generateNumber();
        attempts++;

        // Check if number is unique and maintains minimum difference
        const isUnique = ![...randomFloat.previousNumbers].some(
            prev => Math.abs(prev - newNumber) < minDifference
        );

        if (isUnique) {
            // Keep last 1000 numbers for difference checking
            randomFloat.previousNumbers.add(newNumber);
            if (randomFloat.previousNumbers.size > 1000) {
                randomFloat.previousNumbers.delete([...randomFloat.previousNumbers][0]);
            }
            return newNumber;
        }

    } while (attempts < maxAttempts);

    // If we couldn't find a unique number, clear some history and try one last time
    if (attempts >= maxAttempts) {
        randomFloat.previousNumbers.clear();
        return generateNumber();
    }
}

// Optional: Reset the generator's state
randomFloat.reset = function() {
    delete randomFloat.state0;
    delete randomFloat.state1;
    delete randomFloat.previousNumbers;
};



