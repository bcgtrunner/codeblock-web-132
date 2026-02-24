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
        const text = this.input.value;
        if (text === 'run') {}
        this.output.innerHTML += `<div>> ${text}</div>`;
        this.output.innerHTML += `<div> Text entered: "${text}"</div>`;
        this.input.value = '';
    }
}
export {Console}