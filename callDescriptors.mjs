const SPECIALIZED_CALL_DESCRIPTORS = [
    { operation: "+", label: "+", templateParts: ["", "+", ""] },
    { operation: "-", label: "-", templateParts: ["", "-", ""] },
    { operation: "*", label: "*", templateParts: ["", "*", ""] },
    { operation: "/", label: "/", templateParts: ["", "/", ""] },
    { operation: "//", label: "//", templateParts: ["", "//", ""] },
    { operation: "%", label: "%", templateParts: ["", "%", ""] },
    { operation: "**", label: "**", templateParts: ["", "**", ""] },

    { operation: "==", label: "==", templateParts: ["", "==", ""] },
    { operation: "!=", label: "!=", templateParts: ["", "!=", ""] },
    { operation: "<", label: "<", templateParts: ["", "<", ""] },
    { operation: ">", label: ">", templateParts: ["", ">", ""] },
    { operation: "<=", label: "<=", templateParts: ["", "<=", ""] },
    { operation: ">=", label: ">=", templateParts: ["", ">=", ""] },
    { operation: "and", label: "and", templateParts: ["", "and", ""] },
    { operation: "or", label: "or", templateParts: ["", "or", ""] },

    { operation: "at", label: "at", templateParts: ["", "at", ""] },
    { operation: "len", label: "len", templateParts: ["len", ""] },
    { operation: "push", label: "push", templateParts: ["", "push", ""] },
    { operation: "pop", label: "pop", templateParts: ["pop", ""] },
    { operation: "set_at", label: "set at", templateParts: ["", "set", "at", ""] },
    { operation: "insert_at", label: "insert at", templateParts: ["", "insert", "at", ""] },
    { operation: "erase_at", label: "remove at", templateParts: ["", "remove at", ""] },

    { operation: "not", label: "not", templateParts: ["not", ""] },
    { operation: "sqrt", label: "sqrt", templateParts: ["sqrt", ""] },
    { operation: "abs", label: "abs", templateParts: ["abs", ""] },
    { operation: "floor", label: "floor", templateParts: ["floor", ""] },
    { operation: "ceil", label: "ceil", templateParts: ["ceil", ""] },
    { operation: "round", label: "round", templateParts: ["round", ""] },
    { operation: "trunc", label: "trunc", templateParts: ["trunc", ""] },
    { operation: "sin", label: "sin", templateParts: ["sin", ""] },
    { operation: "cos", label: "cos", templateParts: ["cos", ""] },
    { operation: "tan", label: "tan", templateParts: ["tan", ""] },
    { operation: "log", label: "log", templateParts: ["log", ""] },
    { operation: "exp", label: "exp", templateParts: ["exp", ""] },
    { operation: "sign", label: "sign", templateParts: ["sign", ""] },
    { operation: "asin", label: "asin", templateParts: ["asin", ""] },
    { operation: "acos", label: "acos", templateParts: ["acos", ""] },
    { operation: "atan", label: "atan", templateParts: ["atan", ""] },
    { operation: "log10", label: "log10", templateParts: ["log10", ""] },
    { operation: "log2", label: "log2", templateParts: ["log2", ""] },
    { operation: "atan2", label: "atan2", templateParts: ["atan2", "", ""] },
    { operation: "min", label: "min", templateParts: ["min", "", ""] },
    { operation: "max", label: "max", templateParts: ["max", "", ""] },

    { operation: "strlen", label: "strlen", templateParts: ["strlen", ""] },
    { operation: "upper", label: "upper", templateParts: ["upper", ""] },
    { operation: "lower", label: "lower", templateParts: ["lower", ""] },
    { operation: "trim", label: "trim", templateParts: ["trim", ""] },
    { operation: "substring", label: "substring", templateParts: ["", "substring", "", ""] },
    { operation: "split", label: "split", templateParts: ["", "split", ""] },
    { operation: "join", label: "join", templateParts: ["", "join", ""] },
    { operation: "startsWith", label: "startsWith", templateParts: ["", "startsWith", ""] },
    { operation: "endsWith", label: "endsWith", templateParts: ["", "endsWith", ""] },
    { operation: "replace", label: "replace", templateParts: ["", "replace", "with", ""] },
    { operation: "charAt", label: "charAt", templateParts: ["", "charAt", ""] },
    { operation: "fromCharCode", label: "fromCharCode", templateParts: ["fromCharCode", ""] },

    { operation: "boolToNumber", label: "boolToNumber", templateParts: ["bool", "&rarr; number"] },
    { operation: "numberToBool", label: "numberToBool", templateParts: ["number", "&rarr; bool"] },
    { operation: "numberToString", label: "numberToString", templateParts: ["number", "&rarr; string"] },
    { operation: "boolToString", label: "boolToString", templateParts: ["bool", "&rarr; string"] },
    { operation: "stringToNumber", label: "stringToNumber", templateParts: ["string", "&rarr; number"] },
    { operation: "stringToBool", label: "stringToBool", templateParts: ["string", "&rarr; bool"] },
    { operation: "arrayToBool", label: "arrayToBool", templateParts: ["array", "&rarr; bool"] },
    { operation: "arrayToString", label: "arrayToString", templateParts: ["array", "&rarr; string"] },
    { operation: "typeof", label: "typeof", templateParts: ["any", "&rarr; type"] },

    { operation: "input", label: "input", templateParts: ["input"] },
    { operation: "print", label: "print", templateParts: ["print", ""] },
].map((descriptor) => Object.freeze({
    ...descriptor,
    fixedShape: true,
    arity: Math.max(descriptor.templateParts.length - 1, 0),
}));

const GENERIC_CALL_DESCRIPTOR = Object.freeze({
    operation: null,
    label: "call",
    templateParts: ["", "call", ""],
    fixedShape: false,
    arity: null,
});

const descriptorByOperation = new Map(
    SPECIALIZED_CALL_DESCRIPTORS.map((descriptor) => [descriptor.operation, descriptor])
);

const descriptorByLabel = new Map(
    SPECIALIZED_CALL_DESCRIPTORS.map((descriptor) => [descriptor.label, descriptor])
);

function getCallDescriptorByOperation(operation) {
    return descriptorByOperation.get(operation) ?? null;
}

function getCallDescriptorByLabel(label) {
    if (label === GENERIC_CALL_DESCRIPTOR.label) {
        return GENERIC_CALL_DESCRIPTOR;
    }
    return descriptorByLabel.get(label) ?? null;
}

function getCanonicalCallDescriptor(operation, argCount) {
    const descriptor = getCallDescriptorByOperation(operation);
    if (!descriptor || descriptor.arity !== argCount) {
        return null;
    }
    return descriptor;
}

function getGenericCallDescriptor() {
    return GENERIC_CALL_DESCRIPTOR;
}

export {
    SPECIALIZED_CALL_DESCRIPTORS,
    getCallDescriptorByOperation,
    getCallDescriptorByLabel,
    getCanonicalCallDescriptor,
    getGenericCallDescriptor,
};
