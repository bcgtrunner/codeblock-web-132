import { clearEditorBlocks, runEditorBlocks } from "./script.mjs";
// help run clear debbug
class Console
{
    constructor() {
        this.output = document.querySelector(".console_output");
        this.input = document.querySelector(".console_input");
        this.input.addEventListener("keydown", (e) => {
            if(e.key === "Enter")
            {
                this.execute();
            }
        });
    }

    print(text) {
        this.output.innerHTML += `<div> ${text}</div>`;
    }
    
    execute() {
        const command = this.input.value;
        this.input.value = "";
        this.output.innerHTML += `<div>> ${command}</div>`;
        if (command === 'help') {
            this.output.innerHTML += `<div> Available commands: <br>run<br>clear<br>debbug<br>help</div>`;
        }
        else if (command === 'run') {
            runEditorBlocks();
            this.output.innerHTML += `<div> Command: '${command}' executed</div>`;
        }
        else if (command === 'clear') {
            clearEditorBlocks();
            this.output.innerHTML += `<div> Command: '${command}' executed<div>`;
        }
        else if (command === 'debbug') {
        }
        else {
            this.output.innerHTML += `<div> Command: '${command}' is unrecognised. See 'help'.</div>`;
        }
    }
}
export { Console }