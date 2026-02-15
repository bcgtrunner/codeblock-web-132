class Debugger {
    constructor(interpreter, options = {}) {
        this.interpreter = interpreter;

        this.enabled = options.enabled ?? true;
        this.stepMode = options.stepMode ?? false;
        this.breakpoints = this.watchList = new Set();
        this.onPause = options.onPause ?? null;
        this.indent = 0;
    }

    addBreakpoint(nodeId) {
        this.breakpoints.add(nodeId);
    }

    removeBreakpoint(nodeId) {
        this.breakpoints.delete(nodeId);
    }

    clearBreakpoints() {
        this.breakpoints.clear();
    }

    watch(varName) {
        this.watchList.add(varName);
    }

    unwatch(varName) {
        this.watchList.delete(varName);
    }

    async pauseIfNeeded(node) {
        if (!this.enabled) return;

        if (this.stepMode || this.breakpoints.has(node.id)) {

            if (this.onPause) {
                await this.onPause({
                    node,
                    stack: this.interpreter.stack.frames
                });
                return;
            }

            // await new Promise(resolve => {
            //     console.log("⏸ Debug pause. Click OK to continue.");
            //     setTimeout(() => {
            //         alert("Debugger paused. Press OK to continue.");
            //         resolve();
            //     }, 0);
            // });
            }
    }

    printStack() {
        const frames = this.interpreter.stack.frames;

        console.log("📚 Stack:");
        frames.forEach((frame, i) => {
            console.log(`  Frame ${i}:`);
            for (const key in frame) {
                const v = frame[key];
                console.log(`    ${key} = (${v.type}) ${v.value}`);
            }
        });
    }

    printWatch() {
        if (this.watchList.size === 0) return;

        console.log("👀 Watch:");
        for (let name of this.watchList) {
            const v = this.interpreter.stack.lookup(name);
            if (v) {
                console.log(`  ${name} = (${v.type}) ${v.value}`);
            } else {
                console.log(`  ${name} = <undefined>`);
            }
        }
    }

    async onNodeEnter(node) {
        if (!this.enabled) return;

        const pad = "  ".repeat(this.indent);

        console.log(`${pad}➡ Enter: ${node.token}${node.value !== null ? ` (${node.value})` : ""}`);

        await this.pauseIfNeeded(node);

        this.printWatch();

        this.indent++;
    }

    async onNodeExit(node, result) {
        if (!this.enabled) return;

        this.indent--;

        const pad = "  ".repeat(this.indent);

        console.log(`${pad}⬅ Exit: ${node.token} → (${result?.type ?? "void"}) ${result?.value ?? ""}`);
    }

    onError(error) {
        console.error("\n💥 Runtime Error:", error.message);
        console.error("Trace:");

        for (let node of error.path) {
            console.error(`  at ${node.token}${node.value ? ` (${node.value})` : ""}`);
        }

        console.log();
        this.printStack();
    }
}

export { Debugger }