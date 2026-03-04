import { clearEditorBlocks, getRootBlocks, runDebugMode, runEditorBlocks } from "./script.mjs";

class Console {
    constructor() {
        this.output = document.querySelector(".console_output");
        this.input = document.querySelector(".console_input");
        this.input.addEventListener("keydown", this.inputKeyPress);
    }

    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }

    log(text) {
        this.output.innerHTML += `<div> ${text}</div>`;
        this.scrollToBottom();
    }

    inputKeyPress = (e) => {
        if (e.key == "Enter") {
            void this.execute();
        }
    }

    error(message) {
        this.output.innerHTML += `<div> ${message}</div>`;
        this.scrollToBottom();
    }
    
    waitForDebugStep() {
        return new Promise(resolve => {
            const stepHandler = (e) => {
                if (e.key !== "Enter") return;
                e.preventDefault();
                this.input.removeEventListener("keydown", stepHandler);
                resolve();
            };
            this.input.addEventListener("keydown", stepHandler);
        });
    }

    async execute() {
        const inp = this.input.value;
        const command = inp.split(' ')[0];
        const flags = inp.split(' ').slice(1)
        this.input.value = "";
        console.log(command )
        if (command !== 'clear') {
            this.output.innerHTML += `<div class="console_input-wrapper"><span class="console_prefix">></span> ${inp}</div>`;
            this.scrollToBottom();
        }
        if (command === '') return;

        if (command === 'help') {
            this.log("Available commands: run, reset, clear, debug, help. Use [command] -help for details.");
        }
        else if (command === 'clear' && (flags[0] === '-h' || flags[0] === '-help')) {
            this.log("Usage: clear - clears the console screen.");
        }
        else if (command === 'clear') {
            this.clear();
        }
        else if (command === 'run' && (flags[0] === '-h' || flags[0] === '-help')) {
            this.log("Usage: run - executes all blocks currently in the editor.");
        }
        else if (command === 'run') {
            runEditorBlocks();
            this.log(`Command: '${command}' executed`);
        }
        else if (command === 'reset' && (flags[0] === '-h' || flags[0] === '-help')) {
            this.log("Usage: reset - removes all blocks from the editor.");
        }
        else if (command === 'reset') {
            clearEditorBlocks();
            this.log(`Command: '${command}' executed`);
        }
        else if (command === 'debug' && (flags[0] === '-h' || flags[0] === '-help')) {
            this.log("Usage: debug - starts step-by-step execution. Press Enter to move to the next step.");
        }
        else if (command === 'debug') {
            const roots = getRootBlocks();
            if (roots.length === 0) {
                this.log('<span class="console_msg--debug">No nodes to interpret</span>');
                return;
            }

            this.input.removeEventListener("keydown", this.inputKeyPress);
            try {
                for (const root of roots) {
                    this.log('<span class="console_msg--debug">Debug mode started...</span>');
                    await runDebugMode(
                        root.node,
                        () => this.waitForDebugStep()
                    );
                }
            } finally {
                this.input.addEventListener("keydown", this.inputKeyPress);
            }
        }
        else {
            this.log(`Command: '${command}' is unrecognised. See 'help'.`);
        }
    }

    async waitForInput() {
        const p = new Promise(resolve => {
            const stepHandler = (e) => {
                if(e.key === "Enter") {
                    this.input.removeEventListener("keydown", stepHandler);
                    resolve();
                }
            };
            this.input.addEventListener("keydown", stepHandler);
        })
        this.log('<span class="console_msg--debug">Waiting for input:</span>');
        this.input.removeEventListener("keydown", this.inputKeyPress);
        await p;        
        this.input.addEventListener("keydown", this.inputKeyPress);
        
        const value = this.input.value;
        this.input.value = "";
        this.log(value)
        return value;
    }

    clear() {
        this.output.innerHTML = "";
    }
}
export { Console };
