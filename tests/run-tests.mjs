const testModules = [
    "./testBuiltins.mjs",
    "./testControlFlow.mjs",
    "./testFunc.mjs",
    "./testError.mjs",
];

for (const mod of testModules) {
    try {
        console.log(`\n=== RUN ${mod} ===`);
        await import(mod);
    } catch (e) {
        console.error(`FAILED ${mod}: ${e.message}`);
        process.exitCode = 1;
    }
}
