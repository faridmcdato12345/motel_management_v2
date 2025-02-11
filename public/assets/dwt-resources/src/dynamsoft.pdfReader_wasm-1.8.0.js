/*!
 * Dynamsoft JavaScript Library
 * @product Dynamsoft PDF Reader Worker JS
 * @website http://www.dynamsoft.com
 * @copyright Copyright 2022, Dynamsoft Corporation
 * @author Dynamsoft
 * @version 1.8.0 (2022-11-09T09:07:50.211Z)
 * @fileoverview Dynamsoft JavaScript Library for PDF Reader WASM Worker
 *
 */

var ImageIOModule = (function () {
    var _scriptDir =
        typeof document !== "undefined" && document.currentScript
            ? document.currentScript.src
            : undefined;
    if (typeof __filename !== "undefined")
        _scriptDir = _scriptDir || __filename;
    return function (ImageIOModule) {
        ImageIOModule = ImageIOModule || {};

        var Module = typeof ImageIOModule !== "undefined" ? ImageIOModule : {};
        var moduleOverrides = {};
        var key;
        for (key in Module) {
            if (Module.hasOwnProperty(key)) {
                moduleOverrides[key] = Module[key];
            }
        }
        var arguments_ = [];
        var thisProgram = "./this.program";
        var quit_ = function (status, toThrow) {
            throw toThrow;
        };
        var ENVIRONMENT_IS_WEB = false;
        var ENVIRONMENT_IS_WORKER = false;
        var ENVIRONMENT_IS_NODE = false;
        var ENVIRONMENT_IS_SHELL = false;
        ENVIRONMENT_IS_WEB = typeof window === "object";
        ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
        ENVIRONMENT_IS_NODE =
            typeof process === "object" &&
            typeof process.versions === "object" &&
            typeof process.versions.node === "string";
        ENVIRONMENT_IS_SHELL =
            !ENVIRONMENT_IS_WEB &&
            !ENVIRONMENT_IS_NODE &&
            !ENVIRONMENT_IS_WORKER;
        var scriptDirectory = "";
        function locateFile(path) {
            if (Module["locateFile"]) {
                return Module["locateFile"](path, scriptDirectory);
            }
            return scriptDirectory + path;
        }
        var read_, readAsync, readBinary, setWindowTitle;
        var nodeFS;
        var nodePath;
        if (ENVIRONMENT_IS_NODE) {
            if (ENVIRONMENT_IS_WORKER) {
                scriptDirectory =
                    require("path").dirname(scriptDirectory) + "/";
            } else {
                scriptDirectory = __dirname + "/";
            }
            read_ = function shell_read(filename, binary) {
                if (!nodeFS) nodeFS = require("fs");
                if (!nodePath) nodePath = require("path");
                filename = nodePath["normalize"](filename);
                return nodeFS["readFileSync"](filename, binary ? null : "utf8");
            };
            readBinary = function readBinary(filename) {
                var ret = read_(filename, true);
                if (!ret.buffer) {
                    ret = new Uint8Array(ret);
                }
                assert(ret.buffer);
                return ret;
            };
            if (process["argv"].length > 1) {
                thisProgram = process["argv"][1].replace(/\\/g, "/");
            }
            arguments_ = process["argv"].slice(2);
            process["on"]("uncaughtException", function (ex) {
                if (!(ex instanceof ExitStatus)) {
                    throw ex;
                }
            });
            process["on"]("unhandledRejection", abort);
            quit_ = function (status) {
                process["exit"](status);
            };
            Module["inspect"] = function () {
                return "[Emscripten Module object]";
            };
        } else if (ENVIRONMENT_IS_SHELL) {
            if (typeof read != "undefined") {
                read_ = function shell_read(f) {
                    return read(f);
                };
            }
            readBinary = function readBinary(f) {
                var data;
                if (typeof readbuffer === "function") {
                    return new Uint8Array(readbuffer(f));
                }
                data = read(f, "binary");
                assert(typeof data === "object");
                return data;
            };
            if (typeof scriptArgs != "undefined") {
                arguments_ = scriptArgs;
            } else if (typeof arguments != "undefined") {
                arguments_ = arguments;
            }
            if (typeof quit === "function") {
                quit_ = function (status) {
                    quit(status);
                };
            }
            if (typeof print !== "undefined") {
                if (typeof console === "undefined") console = {};
                console.log = print;
                console.warn = console.error =
                    typeof printErr !== "undefined" ? printErr : print;
            }
        } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
            if (ENVIRONMENT_IS_WORKER) {
                scriptDirectory = self.location.href;
            } else if (document.currentScript) {
                scriptDirectory = document.currentScript.src;
            }
            if (_scriptDir) {
                scriptDirectory = _scriptDir;
            }
            if (scriptDirectory.indexOf("blob:") !== 0) {
                scriptDirectory = scriptDirectory.substr(
                    0,
                    scriptDirectory.lastIndexOf("/") + 1
                );
            } else {
                scriptDirectory = "";
            }
            {
                read_ = function shell_read(url) {
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url, false);
                    xhr.send(null);
                    return xhr.responseText;
                };
                if (ENVIRONMENT_IS_WORKER) {
                    readBinary = function readBinary(url) {
                        var xhr = new XMLHttpRequest();
                        xhr.open("GET", url, false);
                        xhr.responseType = "arraybuffer";
                        xhr.send(null);
                        return new Uint8Array(xhr.response);
                    };
                }
                readAsync = function readAsync(url, onload, onerror) {
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url, true);
                    xhr.responseType = "arraybuffer";
                    xhr.onload = function xhr_onload() {
                        if (
                            xhr.status == 200 ||
                            (xhr.status == 0 && xhr.response)
                        ) {
                            onload(xhr.response);
                            return;
                        }
                        onerror();
                    };
                    xhr.onerror = onerror;
                    xhr.send(null);
                };
            }
            setWindowTitle = function (title) {
                document.title = title;
            };
        } else {
        }
        var out = Module["print"] || console.log.bind(console);
        var err = Module["printErr"] || console.warn.bind(console);
        for (key in moduleOverrides) {
            if (moduleOverrides.hasOwnProperty(key)) {
                Module[key] = moduleOverrides[key];
            }
        }
        moduleOverrides = null;
        if (Module["arguments"]) arguments_ = Module["arguments"];
        if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
        if (Module["quit"]) quit_ = Module["quit"];
        var STACK_ALIGN = 16;
        function dynamicAlloc(size) {
            var ret = HEAP32[DYNAMICTOP_PTR >> 2];
            var end = (ret + size + 15) & -16;
            HEAP32[DYNAMICTOP_PTR >> 2] = end;
            return ret;
        }
        function getNativeTypeSize(type) {
            switch (type) {
                case "i1":
                case "i8":
                    return 1;
                case "i16":
                    return 2;
                case "i32":
                    return 4;
                case "i64":
                    return 8;
                case "float":
                    return 4;
                case "double":
                    return 8;
                default: {
                    if (type[type.length - 1] === "*") {
                        return 4;
                    } else if (type[0] === "i") {
                        var bits = Number(type.substr(1));
                        assert(
                            bits % 8 === 0,
                            "getNativeTypeSize invalid bits " +
                                bits +
                                ", type " +
                                type
                        );
                        return bits / 8;
                    } else {
                        return 0;
                    }
                }
            }
        }
        function warnOnce(text) {
            if (!warnOnce.shown) warnOnce.shown = {};
            if (!warnOnce.shown[text]) {
                warnOnce.shown[text] = 1;
                err(text);
            }
        }
        var asm2wasmImports = {
            "f64-rem": function (x, y) {
                return x % y;
            },
            debugger: function () {},
        };
        var jsCallStartIndex = 1;
        var functionPointers = new Array(0);
        function convertJsFunctionToWasm(func, sig) {
            if (typeof WebAssembly.Function === "function") {
                var typeNames = { i: "i32", j: "i64", f: "f32", d: "f64" };
                var type = {
                    parameters: [],
                    results: sig[0] == "v" ? [] : [typeNames[sig[0]]],
                };
                for (var i = 1; i < sig.length; ++i) {
                    type.parameters.push(typeNames[sig[i]]);
                }
                return new WebAssembly.Function(type, func);
            }
            var typeSection = [1, 0, 1, 96];
            var sigRet = sig.slice(0, 1);
            var sigParam = sig.slice(1);
            var typeCodes = { i: 127, j: 126, f: 125, d: 124 };
            typeSection.push(sigParam.length);
            for (var i = 0; i < sigParam.length; ++i) {
                typeSection.push(typeCodes[sigParam[i]]);
            }
            if (sigRet == "v") {
                typeSection.push(0);
            } else {
                typeSection = typeSection.concat([1, typeCodes[sigRet]]);
            }
            typeSection[1] = typeSection.length - 2;
            var bytes = new Uint8Array(
                [0, 97, 115, 109, 1, 0, 0, 0].concat(
                    typeSection,
                    [2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0]
                )
            );
            var module = new WebAssembly.Module(bytes);
            var instance = new WebAssembly.Instance(module, { e: { f: func } });
            var wrappedFunc = instance.exports["f"];
            return wrappedFunc;
        }
        var freeTableIndexes = [];
        var functionsInTableMap;
        var funcWrappers = {};
        function dynCall(sig, ptr, args) {
            if (args && args.length) {
                return Module["dynCall_" + sig].apply(null, [ptr].concat(args));
            } else {
                return Module["dynCall_" + sig].call(null, ptr);
            }
        }
        var tempRet0 = 0;
        var setTempRet0 = function (value) {
            tempRet0 = value;
        };
        var getTempRet0 = function () {
            return tempRet0;
        };
        var wasmBinary;
        if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
        var noExitRuntime;
        if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
        if (typeof WebAssembly !== "object") {
            err("no native wasm support detected");
        }
        function setValue(ptr, value, type, noSafe) {
            type = type || "i8";
            if (type.charAt(type.length - 1) === "*") type = "i32";
            switch (type) {
                case "i1":
                    HEAP8[ptr >> 0] = value;
                    break;
                case "i8":
                    HEAP8[ptr >> 0] = value;
                    break;
                case "i16":
                    HEAP16[ptr >> 1] = value;
                    break;
                case "i32":
                    HEAP32[ptr >> 2] = value;
                    break;
                case "i64":
                    (tempI64 = [
                        value >>> 0,
                        ((tempDouble = value),
                        +Math_abs(tempDouble) >= 1
                            ? tempDouble > 0
                                ? (Math_min(
                                      +Math_floor(tempDouble / 4294967296),
                                      4294967295
                                  ) |
                                      0) >>>
                                  0
                                : ~~+Math_ceil(
                                      (tempDouble - +(~~tempDouble >>> 0)) /
                                          4294967296
                                  ) >>> 0
                            : 0),
                    ]),
                        (HEAP32[ptr >> 2] = tempI64[0]),
                        (HEAP32[(ptr + 4) >> 2] = tempI64[1]);
                    break;
                case "float":
                    HEAPF32[ptr >> 2] = value;
                    break;
                case "double":
                    HEAPF64[ptr >> 3] = value;
                    break;
                default:
                    abort("invalid type for setValue: " + type);
            }
        }
        var wasmMemory;
        var wasmTable = new WebAssembly.Table({
            initial: 4612,
            maximum: 4612,
            element: "anyfunc",
        });
        var ABORT = false;
        var EXITSTATUS = 0;
        function assert(condition, text) {
            if (!condition) {
                abort("Assertion failed: " + text);
            }
        }
        function getCFunc(ident) {
            var func = Module["_" + ident];
            assert(
                func,
                "Cannot call unknown function " +
                    ident +
                    ", make sure it is exported"
            );
            return func;
        }
        function ccall(ident, returnType, argTypes, args, opts) {
            var toC = {
                string: function (str) {
                    var ret = 0;
                    if (str !== null && str !== undefined && str !== 0) {
                        var len = (str.length << 2) + 1;
                        ret = stackAlloc(len);
                        stringToUTF8(str, ret, len);
                    }
                    return ret;
                },
                array: function (arr) {
                    var ret = stackAlloc(arr.length);
                    writeArrayToMemory(arr, ret);
                    return ret;
                },
            };
            function convertReturnValue(ret) {
                if (returnType === "string") return UTF8ToString(ret);
                if (returnType === "boolean") return Boolean(ret);
                return ret;
            }
            var func = getCFunc(ident);
            var cArgs = [];
            var stack = 0;
            if (args) {
                for (var i = 0; i < args.length; i++) {
                    var converter = toC[argTypes[i]];
                    if (converter) {
                        if (stack === 0) stack = stackSave();
                        cArgs[i] = converter(args[i]);
                    } else {
                        cArgs[i] = args[i];
                    }
                }
            }
            var ret = func.apply(null, cArgs);
            ret = convertReturnValue(ret);
            if (stack !== 0) stackRestore(stack);
            return ret;
        }
        var ALLOC_NONE = 3;
        function getMemory(size) {
            if (!runtimeInitialized) return dynamicAlloc(size);
            return _malloc(size);
        }
        var UTF8Decoder =
            typeof TextDecoder !== "undefined"
                ? new TextDecoder("utf8")
                : undefined;
        function UTF8ArrayToString(heap, idx, maxBytesToRead) {
            var endIdx = idx + maxBytesToRead;
            var endPtr = idx;
            while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;
            if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
                return UTF8Decoder.decode(heap.subarray(idx, endPtr));
            } else {
                var str = "";
                while (idx < endPtr) {
                    var u0 = heap[idx++];
                    if (!(u0 & 128)) {
                        str += String.fromCharCode(u0);
                        continue;
                    }
                    var u1 = heap[idx++] & 63;
                    if ((u0 & 224) == 192) {
                        str += String.fromCharCode(((u0 & 31) << 6) | u1);
                        continue;
                    }
                    var u2 = heap[idx++] & 63;
                    if ((u0 & 240) == 224) {
                        u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
                    } else {
                        u0 =
                            ((u0 & 7) << 18) |
                            (u1 << 12) |
                            (u2 << 6) |
                            (heap[idx++] & 63);
                    }
                    if (u0 < 65536) {
                        str += String.fromCharCode(u0);
                    } else {
                        var ch = u0 - 65536;
                        str += String.fromCharCode(
                            55296 | (ch >> 10),
                            56320 | (ch & 1023)
                        );
                    }
                }
            }
            return str;
        }
        function UTF8ToString(ptr, maxBytesToRead) {
            return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
        }
        function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
            if (!(maxBytesToWrite > 0)) return 0;
            var startIdx = outIdx;
            var endIdx = outIdx + maxBytesToWrite - 1;
            for (var i = 0; i < str.length; ++i) {
                var u = str.charCodeAt(i);
                if (u >= 55296 && u <= 57343) {
                    var u1 = str.charCodeAt(++i);
                    u = (65536 + ((u & 1023) << 10)) | (u1 & 1023);
                }
                if (u <= 127) {
                    if (outIdx >= endIdx) break;
                    heap[outIdx++] = u;
                } else if (u <= 2047) {
                    if (outIdx + 1 >= endIdx) break;
                    heap[outIdx++] = 192 | (u >> 6);
                    heap[outIdx++] = 128 | (u & 63);
                } else if (u <= 65535) {
                    if (outIdx + 2 >= endIdx) break;
                    heap[outIdx++] = 224 | (u >> 12);
                    heap[outIdx++] = 128 | ((u >> 6) & 63);
                    heap[outIdx++] = 128 | (u & 63);
                } else {
                    if (outIdx + 3 >= endIdx) break;
                    heap[outIdx++] = 240 | (u >> 18);
                    heap[outIdx++] = 128 | ((u >> 12) & 63);
                    heap[outIdx++] = 128 | ((u >> 6) & 63);
                    heap[outIdx++] = 128 | (u & 63);
                }
            }
            heap[outIdx] = 0;
            return outIdx - startIdx;
        }
        function stringToUTF8(str, outPtr, maxBytesToWrite) {
            return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
        }
        function lengthBytesUTF8(str) {
            var len = 0;
            for (var i = 0; i < str.length; ++i) {
                var u = str.charCodeAt(i);
                if (u >= 55296 && u <= 57343)
                    u =
                        (65536 + ((u & 1023) << 10)) |
                        (str.charCodeAt(++i) & 1023);
                if (u <= 127) ++len;
                else if (u <= 2047) len += 2;
                else if (u <= 65535) len += 3;
                else len += 4;
            }
            return len;
        }
        var UTF16Decoder =
            typeof TextDecoder !== "undefined"
                ? new TextDecoder("utf-16le")
                : undefined;
        function UTF16ToString(ptr) {
            var endPtr = ptr;
            var idx = endPtr >> 1;
            while (HEAP16[idx]) ++idx;
            endPtr = idx << 1;
            if (endPtr - ptr > 32 && UTF16Decoder) {
                return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
            } else {
                var i = 0;
                var str = "";
                while (1) {
                    var codeUnit = HEAP16[(ptr + i * 2) >> 1];
                    if (codeUnit == 0) return str;
                    ++i;
                    str += String.fromCharCode(codeUnit);
                }
            }
        }
        function stringToUTF16(str, outPtr, maxBytesToWrite) {
            if (maxBytesToWrite === undefined) {
                maxBytesToWrite = 2147483647;
            }
            if (maxBytesToWrite < 2) return 0;
            maxBytesToWrite -= 2;
            var startPtr = outPtr;
            var numCharsToWrite =
                maxBytesToWrite < str.length * 2
                    ? maxBytesToWrite / 2
                    : str.length;
            for (var i = 0; i < numCharsToWrite; ++i) {
                var codeUnit = str.charCodeAt(i);
                HEAP16[outPtr >> 1] = codeUnit;
                outPtr += 2;
            }
            HEAP16[outPtr >> 1] = 0;
            return outPtr - startPtr;
        }
        function lengthBytesUTF16(str) {
            return str.length * 2;
        }
        function UTF32ToString(ptr) {
            var i = 0;
            var str = "";
            while (1) {
                var utf32 = HEAP32[(ptr + i * 4) >> 2];
                if (utf32 == 0) return str;
                ++i;
                if (utf32 >= 65536) {
                    var ch = utf32 - 65536;
                    str += String.fromCharCode(
                        55296 | (ch >> 10),
                        56320 | (ch & 1023)
                    );
                } else {
                    str += String.fromCharCode(utf32);
                }
            }
        }
        function stringToUTF32(str, outPtr, maxBytesToWrite) {
            if (maxBytesToWrite === undefined) {
                maxBytesToWrite = 2147483647;
            }
            if (maxBytesToWrite < 4) return 0;
            var startPtr = outPtr;
            var endPtr = startPtr + maxBytesToWrite - 4;
            for (var i = 0; i < str.length; ++i) {
                var codeUnit = str.charCodeAt(i);
                if (codeUnit >= 55296 && codeUnit <= 57343) {
                    var trailSurrogate = str.charCodeAt(++i);
                    codeUnit =
                        (65536 + ((codeUnit & 1023) << 10)) |
                        (trailSurrogate & 1023);
                }
                HEAP32[outPtr >> 2] = codeUnit;
                outPtr += 4;
                if (outPtr + 4 > endPtr) break;
            }
            HEAP32[outPtr >> 2] = 0;
            return outPtr - startPtr;
        }
        function lengthBytesUTF32(str) {
            var len = 0;
            for (var i = 0; i < str.length; ++i) {
                var codeUnit = str.charCodeAt(i);
                if (codeUnit >= 55296 && codeUnit <= 57343) ++i;
                len += 4;
            }
            return len;
        }
        function allocateUTF8(str) {
            var size = lengthBytesUTF8(str) + 1;
            var ret = _malloc(size);
            if (ret) stringToUTF8Array(str, HEAP8, ret, size);
            return ret;
        }
        function writeArrayToMemory(array, buffer) {
            HEAP8.set(array, buffer);
        }
        function writeAsciiToMemory(str, buffer, dontAddNull) {
            for (var i = 0; i < str.length; ++i) {
                HEAP8[buffer++ >> 0] = str.charCodeAt(i);
            }
            if (!dontAddNull) HEAP8[buffer >> 0] = 0;
        }
        var WASM_PAGE_SIZE = 65536;
        function alignUp(x, multiple) {
            if (x % multiple > 0) {
                x += multiple - (x % multiple);
            }
            return x;
        }
        var buffer,
            HEAP8,
            HEAPU8,
            HEAP16,
            HEAPU16,
            HEAP32,
            HEAPU32,
            HEAPF32,
            HEAPF64;
        function updateGlobalBufferAndViews(buf) {
            buffer = buf;
            Module["HEAP8"] = HEAP8 = new Int8Array(buf);
            Module["HEAP16"] = HEAP16 = new Int16Array(buf);
            Module["HEAP32"] = HEAP32 = new Int32Array(buf);
            Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
            Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
            Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
            Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
            Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
        }
        var STACK_BASE = 1990096,
            DYNAMIC_BASE = 7232976,
            DYNAMICTOP_PTR = 1989904;
        var INITIAL_INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;
        if (Module["wasmMemory"]) {
            wasmMemory = Module["wasmMemory"];
        } else {
            wasmMemory = new WebAssembly.Memory({
                initial: INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE,
                maximum: 2147483648 / WASM_PAGE_SIZE,
            });
        }
        if (wasmMemory) {
            buffer = wasmMemory.buffer;
        }
        INITIAL_INITIAL_MEMORY = buffer.byteLength;
        updateGlobalBufferAndViews(buffer);
        HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;
        function callRuntimeCallbacks(callbacks) {
            while (callbacks.length > 0) {
                var callback = callbacks.shift();
                if (typeof callback == "function") {
                    callback(Module);
                    continue;
                }
                var func = callback.func;
                if (typeof func === "number") {
                    if (callback.arg === undefined) {
                        Module["dynCall_v"](func);
                    } else {
                        Module["dynCall_vi"](func, callback.arg);
                    }
                } else {
                    func(callback.arg === undefined ? null : callback.arg);
                }
            }
        }
        var __ATPRERUN__ = [];
        var __ATINIT__ = [];
        var __ATMAIN__ = [];
        var __ATEXIT__ = [];
        var __ATPOSTRUN__ = [];
        var runtimeInitialized = false;
        var runtimeExited = false;
        function preRun() {
            if (Module["preRun"]) {
                if (typeof Module["preRun"] == "function")
                    Module["preRun"] = [Module["preRun"]];
                while (Module["preRun"].length) {
                    addOnPreRun(Module["preRun"].shift());
                }
            }
            callRuntimeCallbacks(__ATPRERUN__);
        }
        function initRuntime() {
            runtimeInitialized = true;
            if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
            TTY.init();
            callRuntimeCallbacks(__ATINIT__);
        }
        function preMain() {
            FS.ignorePermissions = false;
            callRuntimeCallbacks(__ATMAIN__);
        }
        function exitRuntime() {
            runtimeExited = true;
        }
        function postRun() {
            if (Module["postRun"]) {
                if (typeof Module["postRun"] == "function")
                    Module["postRun"] = [Module["postRun"]];
                while (Module["postRun"].length) {
                    addOnPostRun(Module["postRun"].shift());
                }
            }
            callRuntimeCallbacks(__ATPOSTRUN__);
        }
        function addOnPreRun(cb) {
            __ATPRERUN__.unshift(cb);
        }
        function addOnPostRun(cb) {
            __ATPOSTRUN__.unshift(cb);
        }
        var Math_abs = Math.abs;
        var Math_ceil = Math.ceil;
        var Math_floor = Math.floor;
        var Math_min = Math.min;
        var runDependencies = 0;
        var runDependencyWatcher = null;
        var dependenciesFulfilled = null;
        function getUniqueRunDependency(id) {
            return id;
        }
        function addRunDependency(id) {
            runDependencies++;
            if (Module["monitorRunDependencies"]) {
                Module["monitorRunDependencies"](runDependencies);
            }
        }
        function removeRunDependency(id) {
            runDependencies--;
            if (Module["monitorRunDependencies"]) {
                Module["monitorRunDependencies"](runDependencies);
            }
            if (runDependencies == 0) {
                if (runDependencyWatcher !== null) {
                    clearInterval(runDependencyWatcher);
                    runDependencyWatcher = null;
                }
                if (dependenciesFulfilled) {
                    var callback = dependenciesFulfilled;
                    dependenciesFulfilled = null;
                    callback();
                }
            }
        }
        Module["preloadedImages"] = {};
        Module["preloadedAudios"] = {};
        function abort(what) {
            if (Module["onAbort"]) {
                Module["onAbort"](what);
            }
            what += "";
            out(what);
            err(what);
            ABORT = true;
            EXITSTATUS = 1;
            what =
                "abort(" +
                what +
                "). Build with -s ASSERTIONS=1 for more info.";
            throw new WebAssembly.RuntimeError(what);
        }
        function hasPrefix(str, prefix) {
            return String.prototype.startsWith
                ? str.startsWith(prefix)
                : str.indexOf(prefix) === 0;
        }
        var dataURIPrefix = "data:application/octet-stream;base64,";
        function isDataURI(filename) {
            return hasPrefix(filename, dataURIPrefix);
        }
        var fileURIPrefix = "file://";
        function isFileURI(filename) {
            return hasPrefix(filename, fileURIPrefix);
        }
        var wasmBinaryFile = "dynamsoft.pdfReader.wasm";
        if (!isDataURI(wasmBinaryFile)) {
            wasmBinaryFile = locateFile(wasmBinaryFile);
        }
        function getBinary() {
            try {
                if (wasmBinary) {
                    return new Uint8Array(wasmBinary);
                }
                if (readBinary) {
                    return readBinary(wasmBinaryFile);
                } else {
                    throw "both async and sync fetching of the wasm failed";
                }
            } catch (err) {
                abort(err);
            }
        }
        function getBinaryPromise() {
            if (
                !wasmBinary &&
                (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) &&
                typeof fetch === "function" &&
                !isFileURI(wasmBinaryFile)
            ) {
                return fetch(wasmBinaryFile, { credentials: "same-origin" })
                    .then(function (response) {
                        if (!response["ok"]) {
                            throw (
                                "failed to load wasm binary file at '" +
                                wasmBinaryFile +
                                "'"
                            );
                        }
                        return response["arrayBuffer"]();
                    })
                    .catch(function () {
                        return getBinary();
                    });
            }
            return new Promise(function (resolve, reject) {
                resolve(getBinary());
            });
        }
        function createWasm() {
            var info = {
                env: asmLibraryArg,
                wasi_snapshot_preview1: asmLibraryArg,
                global: { NaN: NaN, Infinity: Infinity },
                "global.Math": Math,
                asm2wasm: asm2wasmImports,
            };
            function receiveInstance(instance, module) {
                var exports = instance.exports;
                Module["asm"] = exports;
                removeRunDependency("wasm-instantiate");
            }
            addRunDependency("wasm-instantiate");
            function receiveInstantiatedSource(output) {
                receiveInstance(output["instance"]);
            }
            function instantiateArrayBuffer(receiver) {
                return getBinaryPromise()
                    .then(function (binary) {
                        return WebAssembly.instantiate(binary, info);
                    })
                    .then(receiver, function (reason) {
                        err("failed to asynchronously prepare wasm: " + reason);
                        abort(reason);
                    });
            }
            function instantiateAsync() {
                if (
                    !wasmBinary &&
                    typeof WebAssembly.instantiateStreaming === "function" &&
                    !isDataURI(wasmBinaryFile) &&
                    !isFileURI(wasmBinaryFile) &&
                    typeof fetch === "function"
                ) {
                    fetch(wasmBinaryFile, { credentials: "same-origin" }).then(
                        function (response) {
                            var result = WebAssembly.instantiateStreaming(
                                response,
                                info
                            );
                            return result.then(
                                receiveInstantiatedSource,
                                function (reason) {
                                    err(
                                        "wasm streaming compile failed: " +
                                            reason
                                    );
                                    err(
                                        "falling back to ArrayBuffer instantiation"
                                    );
                                    instantiateArrayBuffer(
                                        receiveInstantiatedSource
                                    );
                                }
                            );
                        }
                    );
                } else {
                    return instantiateArrayBuffer(receiveInstantiatedSource);
                }
            }
            if (Module["instantiateWasm"]) {
                try {
                    var exports = Module["instantiateWasm"](
                        info,
                        receiveInstance
                    );
                    return exports;
                } catch (e) {
                    err(
                        "Module.instantiateWasm callback failed with error: " +
                            e
                    );
                    return false;
                }
            }
            instantiateAsync();
            return {};
        }
        Module["asm"] = createWasm;
        var tempDouble;
        var tempI64;
        __ATINIT__.push({
            func: function () {
                globalCtors();
            },
        });
        var tempDoublePtr = 1990080;
        function demangle(func) {
            return func;
        }
        function demangleAll(text) {
            var regex = /\b__Z[\w\d_]+/g;
            return text.replace(regex, function (x) {
                var y = demangle(x);
                return x === y ? x : y + " [" + x + "]";
            });
        }
        function jsStackTrace() {
            var err = new Error();
            if (!err.stack) {
                try {
                    throw new Error();
                } catch (e) {
                    err = e;
                }
                if (!err.stack) {
                    return "(no stack trace available)";
                }
            }
            return err.stack.toString();
        }
        function stackTrace() {
            var js = jsStackTrace();
            if (Module["extraStackTrace"])
                js += "\n" + Module["extraStackTrace"]();
            return demangleAll(js);
        }
        function ___assert_fail(condition, filename, line, func) {
            abort(
                "Assertion failed: " +
                    UTF8ToString(condition) +
                    ", at: " +
                    [
                        filename ? UTF8ToString(filename) : "unknown filename",
                        line,
                        func ? UTF8ToString(func) : "unknown function",
                    ]
            );
        }
        var ENV = {};
        function __getExecutableName() {
            return thisProgram || "./this.program";
        }
        function ___buildEnvironment(environ) {
            var MAX_ENV_VALUES = 64;
            var TOTAL_ENV_SIZE = 1024;
            var poolPtr;
            var envPtr;
            if (!___buildEnvironment.called) {
                ___buildEnvironment.called = true;
                ENV["USER"] = "web_user";
                ENV["LOGNAME"] = "web_user";
                ENV["PATH"] = "/";
                ENV["PWD"] = "/";
                ENV["HOME"] = "/home/web_user";
                ENV["LANG"] =
                    (
                        (typeof navigator === "object" &&
                            navigator.languages &&
                            navigator.languages[0]) ||
                        "C"
                    ).replace("-", "_") + ".UTF-8";
                ENV["_"] = __getExecutableName();
                poolPtr = getMemory(TOTAL_ENV_SIZE);
                envPtr = getMemory(MAX_ENV_VALUES * 4);
                HEAP32[envPtr >> 2] = poolPtr;
                HEAP32[environ >> 2] = envPtr;
            } else {
                envPtr = HEAP32[environ >> 2];
                poolPtr = HEAP32[envPtr >> 2];
            }
            var strings = [];
            var totalSize = 0;
            for (var key in ENV) {
                if (typeof ENV[key] === "string") {
                    var line = key + "=" + ENV[key];
                    strings.push(line);
                    totalSize += line.length;
                }
            }
            if (totalSize > TOTAL_ENV_SIZE) {
                throw new Error("Environment size exceeded TOTAL_ENV_SIZE!");
            }
            var ptrSize = 4;
            for (var i = 0; i < strings.length; i++) {
                var line = strings[i];
                writeAsciiToMemory(line, poolPtr);
                HEAP32[(envPtr + i * ptrSize) >> 2] = poolPtr;
                poolPtr += line.length + 1;
            }
            HEAP32[(envPtr + strings.length * ptrSize) >> 2] = 0;
        }
        function ___cxa_allocate_exception(size) {
            return _malloc(size);
        }
        var ___exception_infos = {};
        var ___exception_caught = [];
        function ___exception_addRef(ptr) {
            if (!ptr) return;
            var info = ___exception_infos[ptr];
            info.refcount++;
        }
        function ___exception_deAdjust(adjusted) {
            if (!adjusted || ___exception_infos[adjusted]) return adjusted;
            for (var key in ___exception_infos) {
                var ptr = +key;
                var adj = ___exception_infos[ptr].adjusted;
                var len = adj.length;
                for (var i = 0; i < len; i++) {
                    if (adj[i] === adjusted) {
                        return ptr;
                    }
                }
            }
            return adjusted;
        }
        function ___cxa_begin_catch(ptr) {
            var info = ___exception_infos[ptr];
            if (info && !info.caught) {
                info.caught = true;
                __ZSt18uncaught_exceptionv.uncaught_exceptions--;
            }
            if (info) info.rethrown = false;
            ___exception_caught.push(ptr);
            ___exception_addRef(___exception_deAdjust(ptr));
            return ptr;
        }
        var ___exception_last = 0;
        function ___cxa_throw(ptr, type, destructor) {
            ___exception_infos[ptr] = {
                ptr: ptr,
                adjusted: [ptr],
                type: type,
                destructor: destructor,
                refcount: 0,
                caught: false,
                rethrown: false,
            };
            ___exception_last = ptr;
            if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
                __ZSt18uncaught_exceptionv.uncaught_exceptions = 1;
            } else {
                __ZSt18uncaught_exceptionv.uncaught_exceptions++;
            }
            throw ptr;
        }
        function ___gxx_personality_v0() {}
        function setErrNo(value) {
            HEAP32[___errno_location() >> 2] = value;
            return value;
        }
        function ___map_file(pathname, size) {
            setErrNo(63);
            return -1;
        }
        var PATH = {
            splitPath: function (filename) {
                var splitPathRe =
                    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
                return splitPathRe.exec(filename).slice(1);
            },
            normalizeArray: function (parts, allowAboveRoot) {
                var up = 0;
                for (var i = parts.length - 1; i >= 0; i--) {
                    var last = parts[i];
                    if (last === ".") {
                        parts.splice(i, 1);
                    } else if (last === "..") {
                        parts.splice(i, 1);
                        up++;
                    } else if (up) {
                        parts.splice(i, 1);
                        up--;
                    }
                }
                if (allowAboveRoot) {
                    for (; up; up--) {
                        parts.unshift("..");
                    }
                }
                return parts;
            },
            normalize: function (path) {
                var isAbsolute = path.charAt(0) === "/",
                    trailingSlash = path.substr(-1) === "/";
                path = PATH.normalizeArray(
                    path.split("/").filter(function (p) {
                        return !!p;
                    }),
                    !isAbsolute
                ).join("/");
                if (!path && !isAbsolute) {
                    path = ".";
                }
                if (path && trailingSlash) {
                    path += "/";
                }
                return (isAbsolute ? "/" : "") + path;
            },
            dirname: function (path) {
                var result = PATH.splitPath(path),
                    root = result[0],
                    dir = result[1];
                if (!root && !dir) {
                    return ".";
                }
                if (dir) {
                    dir = dir.substr(0, dir.length - 1);
                }
                return root + dir;
            },
            basename: function (path) {
                if (path === "/") return "/";
                var lastSlash = path.lastIndexOf("/");
                if (lastSlash === -1) return path;
                return path.substr(lastSlash + 1);
            },
            extname: function (path) {
                return PATH.splitPath(path)[3];
            },
            join: function () {
                var paths = Array.prototype.slice.call(arguments, 0);
                return PATH.normalize(paths.join("/"));
            },
            join2: function (l, r) {
                return PATH.normalize(l + "/" + r);
            },
        };
        var PATH_FS = {
            resolve: function () {
                var resolvedPath = "",
                    resolvedAbsolute = false;
                for (
                    var i = arguments.length - 1;
                    i >= -1 && !resolvedAbsolute;
                    i--
                ) {
                    var path = i >= 0 ? arguments[i] : FS.cwd();
                    if (typeof path !== "string") {
                        throw new TypeError(
                            "Arguments to path.resolve must be strings"
                        );
                    } else if (!path) {
                        return "";
                    }
                    resolvedPath = path + "/" + resolvedPath;
                    resolvedAbsolute = path.charAt(0) === "/";
                }
                resolvedPath = PATH.normalizeArray(
                    resolvedPath.split("/").filter(function (p) {
                        return !!p;
                    }),
                    !resolvedAbsolute
                ).join("/");
                return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
            },
            relative: function (from, to) {
                from = PATH_FS.resolve(from).substr(1);
                to = PATH_FS.resolve(to).substr(1);
                function trim(arr) {
                    var start = 0;
                    for (; start < arr.length; start++) {
                        if (arr[start] !== "") break;
                    }
                    var end = arr.length - 1;
                    for (; end >= 0; end--) {
                        if (arr[end] !== "") break;
                    }
                    if (start > end) return [];
                    return arr.slice(start, end - start + 1);
                }
                var fromParts = trim(from.split("/"));
                var toParts = trim(to.split("/"));
                var length = Math.min(fromParts.length, toParts.length);
                var samePartsLength = length;
                for (var i = 0; i < length; i++) {
                    if (fromParts[i] !== toParts[i]) {
                        samePartsLength = i;
                        break;
                    }
                }
                var outputParts = [];
                for (var i = samePartsLength; i < fromParts.length; i++) {
                    outputParts.push("..");
                }
                outputParts = outputParts.concat(
                    toParts.slice(samePartsLength)
                );
                return outputParts.join("/");
            },
        };
        var TTY = {
            ttys: [],
            init: function () {},
            shutdown: function () {},
            register: function (dev, ops) {
                TTY.ttys[dev] = { input: [], output: [], ops: ops };
                FS.registerDevice(dev, TTY.stream_ops);
            },
            stream_ops: {
                open: function (stream) {
                    var tty = TTY.ttys[stream.node.rdev];
                    if (!tty) {
                        throw new FS.ErrnoError(43);
                    }
                    stream.tty = tty;
                    stream.seekable = false;
                },
                close: function (stream) {
                    stream.tty.ops.flush(stream.tty);
                },
                flush: function (stream) {
                    stream.tty.ops.flush(stream.tty);
                },
                read: function (stream, buffer, offset, length, pos) {
                    if (!stream.tty || !stream.tty.ops.get_char) {
                        throw new FS.ErrnoError(60);
                    }
                    var bytesRead = 0;
                    for (var i = 0; i < length; i++) {
                        var result;
                        try {
                            result = stream.tty.ops.get_char(stream.tty);
                        } catch (e) {
                            throw new FS.ErrnoError(29);
                        }
                        if (result === undefined && bytesRead === 0) {
                            throw new FS.ErrnoError(6);
                        }
                        if (result === null || result === undefined) break;
                        bytesRead++;
                        buffer[offset + i] = result;
                    }
                    if (bytesRead) {
                        stream.node.timestamp = Date.now();
                    }
                    return bytesRead;
                },
                write: function (stream, buffer, offset, length, pos) {
                    if (!stream.tty || !stream.tty.ops.put_char) {
                        throw new FS.ErrnoError(60);
                    }
                    try {
                        for (var i = 0; i < length; i++) {
                            stream.tty.ops.put_char(
                                stream.tty,
                                buffer[offset + i]
                            );
                        }
                    } catch (e) {
                        throw new FS.ErrnoError(29);
                    }
                    if (length) {
                        stream.node.timestamp = Date.now();
                    }
                    return i;
                },
            },
            default_tty_ops: {
                get_char: function (tty) {
                    if (!tty.input.length) {
                        var result = null;
                        if (ENVIRONMENT_IS_NODE) {
                            var BUFSIZE = 256;
                            var buf = Buffer.alloc
                                ? Buffer.alloc(BUFSIZE)
                                : new Buffer(BUFSIZE);
                            var bytesRead = 0;
                            try {
                                bytesRead = nodeFS.readSync(
                                    process.stdin.fd,
                                    buf,
                                    0,
                                    BUFSIZE,
                                    null
                                );
                            } catch (e) {
                                if (e.toString().indexOf("EOF") != -1)
                                    bytesRead = 0;
                                else throw e;
                            }
                            if (bytesRead > 0) {
                                result = buf
                                    .slice(0, bytesRead)
                                    .toString("utf-8");
                            } else {
                                result = null;
                            }
                        } else if (
                            typeof window != "undefined" &&
                            typeof window.prompt == "function"
                        ) {
                            result = window.prompt("Input: ");
                            if (result !== null) {
                                result += "\n";
                            }
                        } else if (typeof readline == "function") {
                            result = readline();
                            if (result !== null) {
                                result += "\n";
                            }
                        }
                        if (!result) {
                            return null;
                        }
                        tty.input = intArrayFromString(result, true);
                    }
                    return tty.input.shift();
                },
                put_char: function (tty, val) {
                    if (val === null || val === 10) {
                        out(UTF8ArrayToString(tty.output, 0));
                        tty.output = [];
                    } else {
                        if (val != 0) tty.output.push(val);
                    }
                },
                flush: function (tty) {
                    if (tty.output && tty.output.length > 0) {
                        out(UTF8ArrayToString(tty.output, 0));
                        tty.output = [];
                    }
                },
            },
            default_tty1_ops: {
                put_char: function (tty, val) {
                    if (val === null || val === 10) {
                        err(UTF8ArrayToString(tty.output, 0));
                        tty.output = [];
                    } else {
                        if (val != 0) tty.output.push(val);
                    }
                },
                flush: function (tty) {
                    if (tty.output && tty.output.length > 0) {
                        err(UTF8ArrayToString(tty.output, 0));
                        tty.output = [];
                    }
                },
            },
        };
        var MEMFS = {
            ops_table: null,
            mount: function (mount) {
                return MEMFS.createNode(null, "/", 16384 | 511, 0);
            },
            createNode: function (parent, name, mode, dev) {
                if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
                    throw new FS.ErrnoError(63);
                }
                if (!MEMFS.ops_table) {
                    MEMFS.ops_table = {
                        dir: {
                            node: {
                                getattr: MEMFS.node_ops.getattr,
                                setattr: MEMFS.node_ops.setattr,
                                lookup: MEMFS.node_ops.lookup,
                                mknod: MEMFS.node_ops.mknod,
                                rename: MEMFS.node_ops.rename,
                                unlink: MEMFS.node_ops.unlink,
                                rmdir: MEMFS.node_ops.rmdir,
                                readdir: MEMFS.node_ops.readdir,
                                symlink: MEMFS.node_ops.symlink,
                            },
                            stream: { llseek: MEMFS.stream_ops.llseek },
                        },
                        file: {
                            node: {
                                getattr: MEMFS.node_ops.getattr,
                                setattr: MEMFS.node_ops.setattr,
                            },
                            stream: {
                                llseek: MEMFS.stream_ops.llseek,
                                read: MEMFS.stream_ops.read,
                                write: MEMFS.stream_ops.write,
                                allocate: MEMFS.stream_ops.allocate,
                                mmap: MEMFS.stream_ops.mmap,
                                msync: MEMFS.stream_ops.msync,
                            },
                        },
                        link: {
                            node: {
                                getattr: MEMFS.node_ops.getattr,
                                setattr: MEMFS.node_ops.setattr,
                                readlink: MEMFS.node_ops.readlink,
                            },
                            stream: {},
                        },
                        chrdev: {
                            node: {
                                getattr: MEMFS.node_ops.getattr,
                                setattr: MEMFS.node_ops.setattr,
                            },
                            stream: FS.chrdev_stream_ops,
                        },
                    };
                }
                var node = FS.createNode(parent, name, mode, dev);
                if (FS.isDir(node.mode)) {
                    node.node_ops = MEMFS.ops_table.dir.node;
                    node.stream_ops = MEMFS.ops_table.dir.stream;
                    node.contents = {};
                } else if (FS.isFile(node.mode)) {
                    node.node_ops = MEMFS.ops_table.file.node;
                    node.stream_ops = MEMFS.ops_table.file.stream;
                    node.usedBytes = 0;
                    node.contents = null;
                } else if (FS.isLink(node.mode)) {
                    node.node_ops = MEMFS.ops_table.link.node;
                    node.stream_ops = MEMFS.ops_table.link.stream;
                } else if (FS.isChrdev(node.mode)) {
                    node.node_ops = MEMFS.ops_table.chrdev.node;
                    node.stream_ops = MEMFS.ops_table.chrdev.stream;
                }
                node.timestamp = Date.now();
                if (parent) {
                    parent.contents[name] = node;
                }
                return node;
            },
            getFileDataAsRegularArray: function (node) {
                if (node.contents && node.contents.subarray) {
                    var arr = [];
                    for (var i = 0; i < node.usedBytes; ++i)
                        arr.push(node.contents[i]);
                    return arr;
                }
                return node.contents;
            },
            getFileDataAsTypedArray: function (node) {
                if (!node.contents) return new Uint8Array(0);
                if (node.contents.subarray)
                    return node.contents.subarray(0, node.usedBytes);
                return new Uint8Array(node.contents);
            },
            expandFileStorage: function (node, newCapacity) {
                var prevCapacity = node.contents ? node.contents.length : 0;
                if (prevCapacity >= newCapacity) return;
                var CAPACITY_DOUBLING_MAX = 1024 * 1024;
                newCapacity = Math.max(
                    newCapacity,
                    (prevCapacity *
                        (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) >>>
                        0
                );
                if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
                var oldContents = node.contents;
                node.contents = new Uint8Array(newCapacity);
                if (node.usedBytes > 0)
                    node.contents.set(
                        oldContents.subarray(0, node.usedBytes),
                        0
                    );
                return;
            },
            resizeFileStorage: function (node, newSize) {
                if (node.usedBytes == newSize) return;
                if (newSize == 0) {
                    node.contents = null;
                    node.usedBytes = 0;
                    return;
                }
                if (!node.contents || node.contents.subarray) {
                    var oldContents = node.contents;
                    node.contents = new Uint8Array(newSize);
                    if (oldContents) {
                        node.contents.set(
                            oldContents.subarray(
                                0,
                                Math.min(newSize, node.usedBytes)
                            )
                        );
                    }
                    node.usedBytes = newSize;
                    return;
                }
                if (!node.contents) node.contents = [];
                if (node.contents.length > newSize)
                    node.contents.length = newSize;
                else
                    while (node.contents.length < newSize)
                        node.contents.push(0);
                node.usedBytes = newSize;
            },
            node_ops: {
                getattr: function (node) {
                    var attr = {};
                    attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
                    attr.ino = node.id;
                    attr.mode = node.mode;
                    attr.nlink = 1;
                    attr.uid = 0;
                    attr.gid = 0;
                    attr.rdev = node.rdev;
                    if (FS.isDir(node.mode)) {
                        attr.size = 4096;
                    } else if (FS.isFile(node.mode)) {
                        attr.size = node.usedBytes;
                    } else if (FS.isLink(node.mode)) {
                        attr.size = node.link.length;
                    } else {
                        attr.size = 0;
                    }
                    attr.atime = new Date(node.timestamp);
                    attr.mtime = new Date(node.timestamp);
                    attr.ctime = new Date(node.timestamp);
                    attr.blksize = 4096;
                    attr.blocks = Math.ceil(attr.size / attr.blksize);
                    return attr;
                },
                setattr: function (node, attr) {
                    if (attr.mode !== undefined) {
                        node.mode = attr.mode;
                    }
                    if (attr.timestamp !== undefined) {
                        node.timestamp = attr.timestamp;
                    }
                    if (attr.size !== undefined) {
                        MEMFS.resizeFileStorage(node, attr.size);
                    }
                },
                lookup: function (parent, name) {
                    throw FS.genericErrors[44];
                },
                mknod: function (parent, name, mode, dev) {
                    return MEMFS.createNode(parent, name, mode, dev);
                },
                rename: function (old_node, new_dir, new_name) {
                    if (FS.isDir(old_node.mode)) {
                        var new_node;
                        try {
                            new_node = FS.lookupNode(new_dir, new_name);
                        } catch (e) {}
                        if (new_node) {
                            for (var i in new_node.contents) {
                                throw new FS.ErrnoError(55);
                            }
                        }
                    }
                    delete old_node.parent.contents[old_node.name];
                    old_node.name = new_name;
                    new_dir.contents[new_name] = old_node;
                    old_node.parent = new_dir;
                },
                unlink: function (parent, name) {
                    delete parent.contents[name];
                },
                rmdir: function (parent, name) {
                    var node = FS.lookupNode(parent, name);
                    for (var i in node.contents) {
                        throw new FS.ErrnoError(55);
                    }
                    delete parent.contents[name];
                },
                readdir: function (node) {
                    var entries = [".", ".."];
                    for (var key in node.contents) {
                        if (!node.contents.hasOwnProperty(key)) {
                            continue;
                        }
                        entries.push(key);
                    }
                    return entries;
                },
                symlink: function (parent, newname, oldpath) {
                    var node = MEMFS.createNode(
                        parent,
                        newname,
                        511 | 40960,
                        0
                    );
                    node.link = oldpath;
                    return node;
                },
                readlink: function (node) {
                    if (!FS.isLink(node.mode)) {
                        throw new FS.ErrnoError(28);
                    }
                    return node.link;
                },
            },
            stream_ops: {
                read: function (stream, buffer, offset, length, position) {
                    var contents = stream.node.contents;
                    if (position >= stream.node.usedBytes) return 0;
                    var size = Math.min(
                        stream.node.usedBytes - position,
                        length
                    );
                    if (size > 8 && contents.subarray) {
                        buffer.set(
                            contents.subarray(position, position + size),
                            offset
                        );
                    } else {
                        for (var i = 0; i < size; i++)
                            buffer[offset + i] = contents[position + i];
                    }
                    return size;
                },
                write: function (
                    stream,
                    buffer,
                    offset,
                    length,
                    position,
                    canOwn
                ) {
                    if (buffer.buffer === HEAP8.buffer) {
                        canOwn = false;
                    }
                    if (!length) return 0;
                    var node = stream.node;
                    node.timestamp = Date.now();
                    if (
                        buffer.subarray &&
                        (!node.contents || node.contents.subarray)
                    ) {
                        if (canOwn) {
                            node.contents = buffer.subarray(
                                offset,
                                offset + length
                            );
                            node.usedBytes = length;
                            return length;
                        } else if (node.usedBytes === 0 && position === 0) {
                            node.contents = buffer.slice(
                                offset,
                                offset + length
                            );
                            node.usedBytes = length;
                            return length;
                        } else if (position + length <= node.usedBytes) {
                            node.contents.set(
                                buffer.subarray(offset, offset + length),
                                position
                            );
                            return length;
                        }
                    }
                    MEMFS.expandFileStorage(node, position + length);
                    if (node.contents.subarray && buffer.subarray)
                        node.contents.set(
                            buffer.subarray(offset, offset + length),
                            position
                        );
                    else {
                        for (var i = 0; i < length; i++) {
                            node.contents[position + i] = buffer[offset + i];
                        }
                    }
                    node.usedBytes = Math.max(
                        node.usedBytes,
                        position + length
                    );
                    return length;
                },
                llseek: function (stream, offset, whence) {
                    var position = offset;
                    if (whence === 1) {
                        position += stream.position;
                    } else if (whence === 2) {
                        if (FS.isFile(stream.node.mode)) {
                            position += stream.node.usedBytes;
                        }
                    }
                    if (position < 0) {
                        throw new FS.ErrnoError(28);
                    }
                    return position;
                },
                allocate: function (stream, offset, length) {
                    MEMFS.expandFileStorage(stream.node, offset + length);
                    stream.node.usedBytes = Math.max(
                        stream.node.usedBytes,
                        offset + length
                    );
                },
                mmap: function (
                    stream,
                    buffer,
                    offset,
                    length,
                    position,
                    prot,
                    flags
                ) {
                    if (!FS.isFile(stream.node.mode)) {
                        throw new FS.ErrnoError(43);
                    }
                    var ptr;
                    var allocated;
                    var contents = stream.node.contents;
                    if (!(flags & 2) && contents.buffer === buffer.buffer) {
                        allocated = false;
                        ptr = contents.byteOffset;
                    } else {
                        if (
                            position > 0 ||
                            position + length < contents.length
                        ) {
                            if (contents.subarray) {
                                contents = contents.subarray(
                                    position,
                                    position + length
                                );
                            } else {
                                contents = Array.prototype.slice.call(
                                    contents,
                                    position,
                                    position + length
                                );
                            }
                        }
                        allocated = true;
                        var fromHeap = buffer.buffer == HEAP8.buffer;
                        ptr = _malloc(length);
                        if (!ptr) {
                            throw new FS.ErrnoError(48);
                        }
                        (fromHeap ? HEAP8 : buffer).set(contents, ptr);
                    }
                    return { ptr: ptr, allocated: allocated };
                },
                msync: function (stream, buffer, offset, length, mmapFlags) {
                    if (!FS.isFile(stream.node.mode)) {
                        throw new FS.ErrnoError(43);
                    }
                    if (mmapFlags & 2) {
                        return 0;
                    }
                    var bytesWritten = MEMFS.stream_ops.write(
                        stream,
                        buffer,
                        0,
                        length,
                        offset,
                        false
                    );
                    return 0;
                },
            },
        };
        var FS = {
            root: null,
            mounts: [],
            devices: {},
            streams: [],
            nextInode: 1,
            nameTable: null,
            currentPath: "/",
            initialized: false,
            ignorePermissions: true,
            trackingDelegate: {},
            tracking: { openFlags: { READ: 1, WRITE: 2 } },
            ErrnoError: null,
            genericErrors: {},
            filesystems: null,
            syncFSRequests: 0,
            handleFSError: function (e) {
                if (!(e instanceof FS.ErrnoError))
                    throw e + " : " + stackTrace();
                return setErrNo(e.errno);
            },
            lookupPath: function (path, opts) {
                path = PATH_FS.resolve(FS.cwd(), path);
                opts = opts || {};
                if (!path) return { path: "", node: null };
                var defaults = { follow_mount: true, recurse_count: 0 };
                for (var key in defaults) {
                    if (opts[key] === undefined) {
                        opts[key] = defaults[key];
                    }
                }
                if (opts.recurse_count > 8) {
                    throw new FS.ErrnoError(32);
                }
                var parts = PATH.normalizeArray(
                    path.split("/").filter(function (p) {
                        return !!p;
                    }),
                    false
                );
                var current = FS.root;
                var current_path = "/";
                for (var i = 0; i < parts.length; i++) {
                    var islast = i === parts.length - 1;
                    if (islast && opts.parent) {
                        break;
                    }
                    current = FS.lookupNode(current, parts[i]);
                    current_path = PATH.join2(current_path, parts[i]);
                    if (FS.isMountpoint(current)) {
                        if (!islast || (islast && opts.follow_mount)) {
                            current = current.mounted.root;
                        }
                    }
                    if (!islast || opts.follow) {
                        var count = 0;
                        while (FS.isLink(current.mode)) {
                            var link = FS.readlink(current_path);
                            current_path = PATH_FS.resolve(
                                PATH.dirname(current_path),
                                link
                            );
                            var lookup = FS.lookupPath(current_path, {
                                recurse_count: opts.recurse_count,
                            });
                            current = lookup.node;
                            if (count++ > 40) {
                                throw new FS.ErrnoError(32);
                            }
                        }
                    }
                }
                return { path: current_path, node: current };
            },
            getPath: function (node) {
                var path;
                while (true) {
                    if (FS.isRoot(node)) {
                        var mount = node.mount.mountpoint;
                        if (!path) return mount;
                        return mount[mount.length - 1] !== "/"
                            ? mount + "/" + path
                            : mount + path;
                    }
                    path = path ? node.name + "/" + path : node.name;
                    node = node.parent;
                }
            },
            hashName: function (parentid, name) {
                var hash = 0;
                for (var i = 0; i < name.length; i++) {
                    hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
                }
                return ((parentid + hash) >>> 0) % FS.nameTable.length;
            },
            hashAddNode: function (node) {
                var hash = FS.hashName(node.parent.id, node.name);
                node.name_next = FS.nameTable[hash];
                FS.nameTable[hash] = node;
            },
            hashRemoveNode: function (node) {
                var hash = FS.hashName(node.parent.id, node.name);
                if (FS.nameTable[hash] === node) {
                    FS.nameTable[hash] = node.name_next;
                } else {
                    var current = FS.nameTable[hash];
                    while (current) {
                        if (current.name_next === node) {
                            current.name_next = node.name_next;
                            break;
                        }
                        current = current.name_next;
                    }
                }
            },
            lookupNode: function (parent, name) {
                var errCode = FS.mayLookup(parent);
                if (errCode) {
                    throw new FS.ErrnoError(errCode, parent);
                }
                var hash = FS.hashName(parent.id, name);
                for (
                    var node = FS.nameTable[hash];
                    node;
                    node = node.name_next
                ) {
                    var nodeName = node.name;
                    if (node.parent.id === parent.id && nodeName === name) {
                        return node;
                    }
                }
                return FS.lookup(parent, name);
            },
            createNode: function (parent, name, mode, rdev) {
                var node = new FS.FSNode(parent, name, mode, rdev);
                FS.hashAddNode(node);
                return node;
            },
            destroyNode: function (node) {
                FS.hashRemoveNode(node);
            },
            isRoot: function (node) {
                return node === node.parent;
            },
            isMountpoint: function (node) {
                return !!node.mounted;
            },
            isFile: function (mode) {
                return (mode & 61440) === 32768;
            },
            isDir: function (mode) {
                return (mode & 61440) === 16384;
            },
            isLink: function (mode) {
                return (mode & 61440) === 40960;
            },
            isChrdev: function (mode) {
                return (mode & 61440) === 8192;
            },
            isBlkdev: function (mode) {
                return (mode & 61440) === 24576;
            },
            isFIFO: function (mode) {
                return (mode & 61440) === 4096;
            },
            isSocket: function (mode) {
                return (mode & 49152) === 49152;
            },
            flagModes: {
                r: 0,
                rs: 1052672,
                "r+": 2,
                w: 577,
                wx: 705,
                xw: 705,
                "w+": 578,
                "wx+": 706,
                "xw+": 706,
                a: 1089,
                ax: 1217,
                xa: 1217,
                "a+": 1090,
                "ax+": 1218,
                "xa+": 1218,
            },
            modeStringToFlags: function (str) {
                var flags = FS.flagModes[str];
                if (typeof flags === "undefined") {
                    throw new Error("Unknown file open mode: " + str);
                }
                return flags;
            },
            flagsToPermissionString: function (flag) {
                var perms = ["r", "w", "rw"][flag & 3];
                if (flag & 512) {
                    perms += "w";
                }
                return perms;
            },
            nodePermissions: function (node, perms) {
                if (FS.ignorePermissions) {
                    return 0;
                }
                if (perms.indexOf("r") !== -1 && !(node.mode & 292)) {
                    return 2;
                } else if (perms.indexOf("w") !== -1 && !(node.mode & 146)) {
                    return 2;
                } else if (perms.indexOf("x") !== -1 && !(node.mode & 73)) {
                    return 2;
                }
                return 0;
            },
            mayLookup: function (dir) {
                var errCode = FS.nodePermissions(dir, "x");
                if (errCode) return errCode;
                if (!dir.node_ops.lookup) return 2;
                return 0;
            },
            mayCreate: function (dir, name) {
                try {
                    var node = FS.lookupNode(dir, name);
                    return 20;
                } catch (e) {}
                return FS.nodePermissions(dir, "wx");
            },
            mayDelete: function (dir, name, isdir) {
                var node;
                try {
                    node = FS.lookupNode(dir, name);
                } catch (e) {
                    return e.errno;
                }
                var errCode = FS.nodePermissions(dir, "wx");
                if (errCode) {
                    return errCode;
                }
                if (isdir) {
                    if (!FS.isDir(node.mode)) {
                        return 54;
                    }
                    if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
                        return 10;
                    }
                } else {
                    if (FS.isDir(node.mode)) {
                        return 31;
                    }
                }
                return 0;
            },
            mayOpen: function (node, flags) {
                if (!node) {
                    return 44;
                }
                if (FS.isLink(node.mode)) {
                    return 32;
                } else if (FS.isDir(node.mode)) {
                    if (
                        FS.flagsToPermissionString(flags) !== "r" ||
                        flags & 512
                    ) {
                        return 31;
                    }
                }
                return FS.nodePermissions(
                    node,
                    FS.flagsToPermissionString(flags)
                );
            },
            MAX_OPEN_FDS: 4096,
            nextfd: function (fd_start, fd_end) {
                fd_start = fd_start || 0;
                fd_end = fd_end || FS.MAX_OPEN_FDS;
                for (var fd = fd_start; fd <= fd_end; fd++) {
                    if (!FS.streams[fd]) {
                        return fd;
                    }
                }
                throw new FS.ErrnoError(33);
            },
            getStream: function (fd) {
                return FS.streams[fd];
            },
            createStream: function (stream, fd_start, fd_end) {
                if (!FS.FSStream) {
                    FS.FSStream = function () {};
                    FS.FSStream.prototype = {
                        object: {
                            get: function () {
                                return this.node;
                            },
                            set: function (val) {
                                this.node = val;
                            },
                        },
                        isRead: {
                            get: function () {
                                return (this.flags & 2097155) !== 1;
                            },
                        },
                        isWrite: {
                            get: function () {
                                return (this.flags & 2097155) !== 0;
                            },
                        },
                        isAppend: {
                            get: function () {
                                return this.flags & 1024;
                            },
                        },
                    };
                }
                var newStream = new FS.FSStream();
                for (var p in stream) {
                    newStream[p] = stream[p];
                }
                stream = newStream;
                var fd = FS.nextfd(fd_start, fd_end);
                stream.fd = fd;
                FS.streams[fd] = stream;
                return stream;
            },
            closeStream: function (fd) {
                FS.streams[fd] = null;
            },
            chrdev_stream_ops: {
                open: function (stream) {
                    var device = FS.getDevice(stream.node.rdev);
                    stream.stream_ops = device.stream_ops;
                    if (stream.stream_ops.open) {
                        stream.stream_ops.open(stream);
                    }
                },
                llseek: function () {
                    throw new FS.ErrnoError(70);
                },
            },
            major: function (dev) {
                return dev >> 8;
            },
            minor: function (dev) {
                return dev & 255;
            },
            makedev: function (ma, mi) {
                return (ma << 8) | mi;
            },
            registerDevice: function (dev, ops) {
                FS.devices[dev] = { stream_ops: ops };
            },
            getDevice: function (dev) {
                return FS.devices[dev];
            },
            getMounts: function (mount) {
                var mounts = [];
                var check = [mount];
                while (check.length) {
                    var m = check.pop();
                    mounts.push(m);
                    check.push.apply(check, m.mounts);
                }
                return mounts;
            },
            syncfs: function (populate, callback) {
                if (typeof populate === "function") {
                    callback = populate;
                    populate = false;
                }
                FS.syncFSRequests++;
                if (FS.syncFSRequests > 1) {
                    err(
                        "warning: " +
                            FS.syncFSRequests +
                            " FS.syncfs operations in flight at once, probably just doing extra work"
                    );
                }
                var mounts = FS.getMounts(FS.root.mount);
                var completed = 0;
                function doCallback(errCode) {
                    FS.syncFSRequests--;
                    return callback(errCode);
                }
                function done(errCode) {
                    if (errCode) {
                        if (!done.errored) {
                            done.errored = true;
                            return doCallback(errCode);
                        }
                        return;
                    }
                    if (++completed >= mounts.length) {
                        doCallback(null);
                    }
                }
                mounts.forEach(function (mount) {
                    if (!mount.type.syncfs) {
                        return done(null);
                    }
                    mount.type.syncfs(mount, populate, done);
                });
            },
            mount: function (type, opts, mountpoint) {
                var root = mountpoint === "/";
                var pseudo = !mountpoint;
                var node;
                if (root && FS.root) {
                    throw new FS.ErrnoError(10);
                } else if (!root && !pseudo) {
                    var lookup = FS.lookupPath(mountpoint, {
                        follow_mount: false,
                    });
                    mountpoint = lookup.path;
                    node = lookup.node;
                    if (FS.isMountpoint(node)) {
                        throw new FS.ErrnoError(10);
                    }
                    if (!FS.isDir(node.mode)) {
                        throw new FS.ErrnoError(54);
                    }
                }
                var mount = {
                    type: type,
                    opts: opts,
                    mountpoint: mountpoint,
                    mounts: [],
                };
                var mountRoot = type.mount(mount);
                mountRoot.mount = mount;
                mount.root = mountRoot;
                if (root) {
                    FS.root = mountRoot;
                } else if (node) {
                    node.mounted = mount;
                    if (node.mount) {
                        node.mount.mounts.push(mount);
                    }
                }
                return mountRoot;
            },
            unmount: function (mountpoint) {
                var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
                if (!FS.isMountpoint(lookup.node)) {
                    throw new FS.ErrnoError(28);
                }
                var node = lookup.node;
                var mount = node.mounted;
                var mounts = FS.getMounts(mount);
                Object.keys(FS.nameTable).forEach(function (hash) {
                    var current = FS.nameTable[hash];
                    while (current) {
                        var next = current.name_next;
                        if (mounts.indexOf(current.mount) !== -1) {
                            FS.destroyNode(current);
                        }
                        current = next;
                    }
                });
                node.mounted = null;
                var idx = node.mount.mounts.indexOf(mount);
                node.mount.mounts.splice(idx, 1);
            },
            lookup: function (parent, name) {
                return parent.node_ops.lookup(parent, name);
            },
            mknod: function (path, mode, dev) {
                var lookup = FS.lookupPath(path, { parent: true });
                var parent = lookup.node;
                var name = PATH.basename(path);
                if (!name || name === "." || name === "..") {
                    throw new FS.ErrnoError(28);
                }
                var errCode = FS.mayCreate(parent, name);
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
                if (!parent.node_ops.mknod) {
                    throw new FS.ErrnoError(63);
                }
                return parent.node_ops.mknod(parent, name, mode, dev);
            },
            create: function (path, mode) {
                mode = mode !== undefined ? mode : 438;
                mode &= 4095;
                mode |= 32768;
                return FS.mknod(path, mode, 0);
            },
            mkdir: function (path, mode) {
                mode = mode !== undefined ? mode : 511;
                mode &= 511 | 512;
                mode |= 16384;
                return FS.mknod(path, mode, 0);
            },
            mkdirTree: function (path, mode) {
                var dirs = path.split("/");
                var d = "";
                for (var i = 0; i < dirs.length; ++i) {
                    if (!dirs[i]) continue;
                    d += "/" + dirs[i];
                    try {
                        FS.mkdir(d, mode);
                    } catch (e) {
                        if (e.errno != 20) throw e;
                    }
                }
            },
            mkdev: function (path, mode, dev) {
                if (typeof dev === "undefined") {
                    dev = mode;
                    mode = 438;
                }
                mode |= 8192;
                return FS.mknod(path, mode, dev);
            },
            symlink: function (oldpath, newpath) {
                if (!PATH_FS.resolve(oldpath)) {
                    throw new FS.ErrnoError(44);
                }
                var lookup = FS.lookupPath(newpath, { parent: true });
                var parent = lookup.node;
                if (!parent) {
                    throw new FS.ErrnoError(44);
                }
                var newname = PATH.basename(newpath);
                var errCode = FS.mayCreate(parent, newname);
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
                if (!parent.node_ops.symlink) {
                    throw new FS.ErrnoError(63);
                }
                return parent.node_ops.symlink(parent, newname, oldpath);
            },
            rename: function (old_path, new_path) {
                var old_dirname = PATH.dirname(old_path);
                var new_dirname = PATH.dirname(new_path);
                var old_name = PATH.basename(old_path);
                var new_name = PATH.basename(new_path);
                var lookup, old_dir, new_dir;
                try {
                    lookup = FS.lookupPath(old_path, { parent: true });
                    old_dir = lookup.node;
                    lookup = FS.lookupPath(new_path, { parent: true });
                    new_dir = lookup.node;
                } catch (e) {
                    throw new FS.ErrnoError(10);
                }
                if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
                if (old_dir.mount !== new_dir.mount) {
                    throw new FS.ErrnoError(75);
                }
                var old_node = FS.lookupNode(old_dir, old_name);
                var relative = PATH_FS.relative(old_path, new_dirname);
                if (relative.charAt(0) !== ".") {
                    throw new FS.ErrnoError(28);
                }
                relative = PATH_FS.relative(new_path, old_dirname);
                if (relative.charAt(0) !== ".") {
                    throw new FS.ErrnoError(55);
                }
                var new_node;
                try {
                    new_node = FS.lookupNode(new_dir, new_name);
                } catch (e) {}
                if (old_node === new_node) {
                    return;
                }
                var isdir = FS.isDir(old_node.mode);
                var errCode = FS.mayDelete(old_dir, old_name, isdir);
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
                errCode = new_node
                    ? FS.mayDelete(new_dir, new_name, isdir)
                    : FS.mayCreate(new_dir, new_name);
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
                if (!old_dir.node_ops.rename) {
                    throw new FS.ErrnoError(63);
                }
                if (
                    FS.isMountpoint(old_node) ||
                    (new_node && FS.isMountpoint(new_node))
                ) {
                    throw new FS.ErrnoError(10);
                }
                if (new_dir !== old_dir) {
                    errCode = FS.nodePermissions(old_dir, "w");
                    if (errCode) {
                        throw new FS.ErrnoError(errCode);
                    }
                }
                try {
                    if (FS.trackingDelegate["willMovePath"]) {
                        FS.trackingDelegate["willMovePath"](old_path, new_path);
                    }
                } catch (e) {
                    err(
                        "FS.trackingDelegate['willMovePath']('" +
                            old_path +
                            "', '" +
                            new_path +
                            "') threw an exception: " +
                            e.message
                    );
                }
                FS.hashRemoveNode(old_node);
                try {
                    old_dir.node_ops.rename(old_node, new_dir, new_name);
                } catch (e) {
                    throw e;
                } finally {
                    FS.hashAddNode(old_node);
                }
                try {
                    if (FS.trackingDelegate["onMovePath"])
                        FS.trackingDelegate["onMovePath"](old_path, new_path);
                } catch (e) {
                    err(
                        "FS.trackingDelegate['onMovePath']('" +
                            old_path +
                            "', '" +
                            new_path +
                            "') threw an exception: " +
                            e.message
                    );
                }
            },
            rmdir: function (path) {
                var lookup = FS.lookupPath(path, { parent: true });
                var parent = lookup.node;
                var name = PATH.basename(path);
                var node = FS.lookupNode(parent, name);
                var errCode = FS.mayDelete(parent, name, true);
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
                if (!parent.node_ops.rmdir) {
                    throw new FS.ErrnoError(63);
                }
                if (FS.isMountpoint(node)) {
                    throw new FS.ErrnoError(10);
                }
                try {
                    if (FS.trackingDelegate["willDeletePath"]) {
                        FS.trackingDelegate["willDeletePath"](path);
                    }
                } catch (e) {
                    err(
                        "FS.trackingDelegate['willDeletePath']('" +
                            path +
                            "') threw an exception: " +
                            e.message
                    );
                }
                parent.node_ops.rmdir(parent, name);
                FS.destroyNode(node);
                try {
                    if (FS.trackingDelegate["onDeletePath"])
                        FS.trackingDelegate["onDeletePath"](path);
                } catch (e) {
                    err(
                        "FS.trackingDelegate['onDeletePath']('" +
                            path +
                            "') threw an exception: " +
                            e.message
                    );
                }
            },
            readdir: function (path) {
                var lookup = FS.lookupPath(path, { follow: true });
                var node = lookup.node;
                if (!node.node_ops.readdir) {
                    throw new FS.ErrnoError(54);
                }
                return node.node_ops.readdir(node);
            },
            unlink: function (path) {
                var lookup = FS.lookupPath(path, { parent: true });
                var parent = lookup.node;
                var name = PATH.basename(path);
                var node = FS.lookupNode(parent, name);
                var errCode = FS.mayDelete(parent, name, false);
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
                if (!parent.node_ops.unlink) {
                    throw new FS.ErrnoError(63);
                }
                if (FS.isMountpoint(node)) {
                    throw new FS.ErrnoError(10);
                }
                try {
                    if (FS.trackingDelegate["willDeletePath"]) {
                        FS.trackingDelegate["willDeletePath"](path);
                    }
                } catch (e) {
                    err(
                        "FS.trackingDelegate['willDeletePath']('" +
                            path +
                            "') threw an exception: " +
                            e.message
                    );
                }
                parent.node_ops.unlink(parent, name);
                FS.destroyNode(node);
                try {
                    if (FS.trackingDelegate["onDeletePath"])
                        FS.trackingDelegate["onDeletePath"](path);
                } catch (e) {
                    err(
                        "FS.trackingDelegate['onDeletePath']('" +
                            path +
                            "') threw an exception: " +
                            e.message
                    );
                }
            },
            readlink: function (path) {
                var lookup = FS.lookupPath(path);
                var link = lookup.node;
                if (!link) {
                    throw new FS.ErrnoError(44);
                }
                if (!link.node_ops.readlink) {
                    throw new FS.ErrnoError(28);
                }
                return PATH_FS.resolve(
                    FS.getPath(link.parent),
                    link.node_ops.readlink(link)
                );
            },
            stat: function (path, dontFollow) {
                var lookup = FS.lookupPath(path, { follow: !dontFollow });
                var node = lookup.node;
                if (!node) {
                    throw new FS.ErrnoError(44);
                }
                if (!node.node_ops.getattr) {
                    throw new FS.ErrnoError(63);
                }
                return node.node_ops.getattr(node);
            },
            lstat: function (path) {
                return FS.stat(path, true);
            },
            chmod: function (path, mode, dontFollow) {
                var node;
                if (typeof path === "string") {
                    var lookup = FS.lookupPath(path, { follow: !dontFollow });
                    node = lookup.node;
                } else {
                    node = path;
                }
                if (!node.node_ops.setattr) {
                    throw new FS.ErrnoError(63);
                }
                node.node_ops.setattr(node, {
                    mode: (mode & 4095) | (node.mode & ~4095),
                    timestamp: Date.now(),
                });
            },
            lchmod: function (path, mode) {
                FS.chmod(path, mode, true);
            },
            fchmod: function (fd, mode) {
                var stream = FS.getStream(fd);
                if (!stream) {
                    throw new FS.ErrnoError(8);
                }
                FS.chmod(stream.node, mode);
            },
            chown: function (path, uid, gid, dontFollow) {
                var node;
                if (typeof path === "string") {
                    var lookup = FS.lookupPath(path, { follow: !dontFollow });
                    node = lookup.node;
                } else {
                    node = path;
                }
                if (!node.node_ops.setattr) {
                    throw new FS.ErrnoError(63);
                }
                node.node_ops.setattr(node, { timestamp: Date.now() });
            },
            lchown: function (path, uid, gid) {
                FS.chown(path, uid, gid, true);
            },
            fchown: function (fd, uid, gid) {
                var stream = FS.getStream(fd);
                if (!stream) {
                    throw new FS.ErrnoError(8);
                }
                FS.chown(stream.node, uid, gid);
            },
            truncate: function (path, len) {
                if (len < 0) {
                    throw new FS.ErrnoError(28);
                }
                var node;
                if (typeof path === "string") {
                    var lookup = FS.lookupPath(path, { follow: true });
                    node = lookup.node;
                } else {
                    node = path;
                }
                if (!node.node_ops.setattr) {
                    throw new FS.ErrnoError(63);
                }
                if (FS.isDir(node.mode)) {
                    throw new FS.ErrnoError(31);
                }
                if (!FS.isFile(node.mode)) {
                    throw new FS.ErrnoError(28);
                }
                var errCode = FS.nodePermissions(node, "w");
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
                node.node_ops.setattr(node, {
                    size: len,
                    timestamp: Date.now(),
                });
            },
            ftruncate: function (fd, len) {
                var stream = FS.getStream(fd);
                if (!stream) {
                    throw new FS.ErrnoError(8);
                }
                if ((stream.flags & 2097155) === 0) {
                    throw new FS.ErrnoError(28);
                }
                FS.truncate(stream.node, len);
            },
            utime: function (path, atime, mtime) {
                var lookup = FS.lookupPath(path, { follow: true });
                var node = lookup.node;
                node.node_ops.setattr(node, {
                    timestamp: Math.max(atime, mtime),
                });
            },
            open: function (path, flags, mode, fd_start, fd_end) {
                if (path === "") {
                    throw new FS.ErrnoError(44);
                }
                flags =
                    typeof flags === "string"
                        ? FS.modeStringToFlags(flags)
                        : flags;
                mode = typeof mode === "undefined" ? 438 : mode;
                if (flags & 64) {
                    mode = (mode & 4095) | 32768;
                } else {
                    mode = 0;
                }
                var node;
                if (typeof path === "object") {
                    node = path;
                } else {
                    path = PATH.normalize(path);
                    try {
                        var lookup = FS.lookupPath(path, {
                            follow: !(flags & 131072),
                        });
                        node = lookup.node;
                    } catch (e) {}
                }
                var created = false;
                if (flags & 64) {
                    if (node) {
                        if (flags & 128) {
                            throw new FS.ErrnoError(20);
                        }
                    } else {
                        node = FS.mknod(path, mode, 0);
                        created = true;
                    }
                }
                if (!node) {
                    throw new FS.ErrnoError(44);
                }
                if (FS.isChrdev(node.mode)) {
                    flags &= ~512;
                }
                if (flags & 65536 && !FS.isDir(node.mode)) {
                    throw new FS.ErrnoError(54);
                }
                if (!created) {
                    var errCode = FS.mayOpen(node, flags);
                    if (errCode) {
                        throw new FS.ErrnoError(errCode);
                    }
                }
                if (flags & 512) {
                    FS.truncate(node, 0);
                }
                flags &= ~(128 | 512 | 131072);
                var stream = FS.createStream(
                    {
                        node: node,
                        path: FS.getPath(node),
                        flags: flags,
                        seekable: true,
                        position: 0,
                        stream_ops: node.stream_ops,
                        ungotten: [],
                        error: false,
                    },
                    fd_start,
                    fd_end
                );
                if (stream.stream_ops.open) {
                    stream.stream_ops.open(stream);
                }
                if (Module["logReadFiles"] && !(flags & 1)) {
                    if (!FS.readFiles) FS.readFiles = {};
                    if (!(path in FS.readFiles)) {
                        FS.readFiles[path] = 1;
                        err("FS.trackingDelegate error on read file: " + path);
                    }
                }
                try {
                    if (FS.trackingDelegate["onOpenFile"]) {
                        var trackingFlags = 0;
                        if ((flags & 2097155) !== 1) {
                            trackingFlags |= FS.tracking.openFlags.READ;
                        }
                        if ((flags & 2097155) !== 0) {
                            trackingFlags |= FS.tracking.openFlags.WRITE;
                        }
                        FS.trackingDelegate["onOpenFile"](path, trackingFlags);
                    }
                } catch (e) {
                    err(
                        "FS.trackingDelegate['onOpenFile']('" +
                            path +
                            "', flags) threw an exception: " +
                            e.message
                    );
                }
                return stream;
            },
            close: function (stream) {
                if (FS.isClosed(stream)) {
                    throw new FS.ErrnoError(8);
                }
                if (stream.getdents) stream.getdents = null;
                try {
                    if (stream.stream_ops.close) {
                        stream.stream_ops.close(stream);
                    }
                } catch (e) {
                    throw e;
                } finally {
                    FS.closeStream(stream.fd);
                }
                stream.fd = null;
            },
            isClosed: function (stream) {
                return stream.fd === null;
            },
            llseek: function (stream, offset, whence) {
                if (FS.isClosed(stream)) {
                    throw new FS.ErrnoError(8);
                }
                if (!stream.seekable || !stream.stream_ops.llseek) {
                    throw new FS.ErrnoError(70);
                }
                if (whence != 0 && whence != 1 && whence != 2) {
                    throw new FS.ErrnoError(28);
                }
                stream.position = stream.stream_ops.llseek(
                    stream,
                    offset,
                    whence
                );
                stream.ungotten = [];
                return stream.position;
            },
            read: function (stream, buffer, offset, length, position) {
                if (length < 0 || position < 0) {
                    throw new FS.ErrnoError(28);
                }
                if (FS.isClosed(stream)) {
                    throw new FS.ErrnoError(8);
                }
                if ((stream.flags & 2097155) === 1) {
                    throw new FS.ErrnoError(8);
                }
                if (FS.isDir(stream.node.mode)) {
                    throw new FS.ErrnoError(31);
                }
                if (!stream.stream_ops.read) {
                    throw new FS.ErrnoError(28);
                }
                var seeking = typeof position !== "undefined";
                if (!seeking) {
                    position = stream.position;
                } else if (!stream.seekable) {
                    throw new FS.ErrnoError(70);
                }
                var bytesRead = stream.stream_ops.read(
                    stream,
                    buffer,
                    offset,
                    length,
                    position
                );
                if (!seeking) stream.position += bytesRead;
                return bytesRead;
            },
            write: function (stream, buffer, offset, length, position, canOwn) {
                if (length < 0 || position < 0) {
                    throw new FS.ErrnoError(28);
                }
                if (FS.isClosed(stream)) {
                    throw new FS.ErrnoError(8);
                }
                if ((stream.flags & 2097155) === 0) {
                    throw new FS.ErrnoError(8);
                }
                if (FS.isDir(stream.node.mode)) {
                    throw new FS.ErrnoError(31);
                }
                if (!stream.stream_ops.write) {
                    throw new FS.ErrnoError(28);
                }
                if (stream.seekable && stream.flags & 1024) {
                    FS.llseek(stream, 0, 2);
                }
                var seeking = typeof position !== "undefined";
                if (!seeking) {
                    position = stream.position;
                } else if (!stream.seekable) {
                    throw new FS.ErrnoError(70);
                }
                var bytesWritten = stream.stream_ops.write(
                    stream,
                    buffer,
                    offset,
                    length,
                    position,
                    canOwn
                );
                if (!seeking) stream.position += bytesWritten;
                try {
                    if (stream.path && FS.trackingDelegate["onWriteToFile"])
                        FS.trackingDelegate["onWriteToFile"](stream.path);
                } catch (e) {
                    err(
                        "FS.trackingDelegate['onWriteToFile']('" +
                            stream.path +
                            "') threw an exception: " +
                            e.message
                    );
                }
                return bytesWritten;
            },
            allocate: function (stream, offset, length) {
                if (FS.isClosed(stream)) {
                    throw new FS.ErrnoError(8);
                }
                if (offset < 0 || length <= 0) {
                    throw new FS.ErrnoError(28);
                }
                if ((stream.flags & 2097155) === 0) {
                    throw new FS.ErrnoError(8);
                }
                if (
                    !FS.isFile(stream.node.mode) &&
                    !FS.isDir(stream.node.mode)
                ) {
                    throw new FS.ErrnoError(43);
                }
                if (!stream.stream_ops.allocate) {
                    throw new FS.ErrnoError(138);
                }
                stream.stream_ops.allocate(stream, offset, length);
            },
            mmap: function (
                stream,
                buffer,
                offset,
                length,
                position,
                prot,
                flags
            ) {
                if (
                    (prot & 2) !== 0 &&
                    (flags & 2) === 0 &&
                    (stream.flags & 2097155) !== 2
                ) {
                    throw new FS.ErrnoError(2);
                }
                if ((stream.flags & 2097155) === 1) {
                    throw new FS.ErrnoError(2);
                }
                if (!stream.stream_ops.mmap) {
                    throw new FS.ErrnoError(43);
                }
                return stream.stream_ops.mmap(
                    stream,
                    buffer,
                    offset,
                    length,
                    position,
                    prot,
                    flags
                );
            },
            msync: function (stream, buffer, offset, length, mmapFlags) {
                if (!stream || !stream.stream_ops.msync) {
                    return 0;
                }
                return stream.stream_ops.msync(
                    stream,
                    buffer,
                    offset,
                    length,
                    mmapFlags
                );
            },
            munmap: function (stream) {
                return 0;
            },
            ioctl: function (stream, cmd, arg) {
                if (!stream.stream_ops.ioctl) {
                    throw new FS.ErrnoError(59);
                }
                return stream.stream_ops.ioctl(stream, cmd, arg);
            },
            readFile: function (path, opts) {
                opts = opts || {};
                opts.flags = opts.flags || "r";
                opts.encoding = opts.encoding || "binary";
                if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
                    throw new Error(
                        'Invalid encoding type "' + opts.encoding + '"'
                    );
                }
                var ret;
                var stream = FS.open(path, opts.flags);
                var stat = FS.stat(path);
                var length = stat.size;
                var buf = new Uint8Array(length);
                FS.read(stream, buf, 0, length, 0);
                if (opts.encoding === "utf8") {
                    ret = UTF8ArrayToString(buf, 0);
                } else if (opts.encoding === "binary") {
                    ret = buf;
                }
                FS.close(stream);
                return ret;
            },
            writeFile: function (path, data, opts) {
                opts = opts || {};
                opts.flags = opts.flags || "w";
                var stream = FS.open(path, opts.flags, opts.mode);
                if (typeof data === "string") {
                    var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
                    var actualNumBytes = stringToUTF8Array(
                        data,
                        buf,
                        0,
                        buf.length
                    );
                    FS.write(
                        stream,
                        buf,
                        0,
                        actualNumBytes,
                        undefined,
                        opts.canOwn
                    );
                } else if (ArrayBuffer.isView(data)) {
                    FS.write(
                        stream,
                        data,
                        0,
                        data.byteLength,
                        undefined,
                        opts.canOwn
                    );
                } else {
                    throw new Error("Unsupported data type");
                }
                FS.close(stream);
            },
            cwd: function () {
                return FS.currentPath;
            },
            chdir: function (path) {
                var lookup = FS.lookupPath(path, { follow: true });
                if (lookup.node === null) {
                    throw new FS.ErrnoError(44);
                }
                if (!FS.isDir(lookup.node.mode)) {
                    throw new FS.ErrnoError(54);
                }
                var errCode = FS.nodePermissions(lookup.node, "x");
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
                FS.currentPath = lookup.path;
            },
            createDefaultDirectories: function () {
                FS.mkdir("/tmp");
                FS.mkdir("/home");
                FS.mkdir("/home/web_user");
            },
            createDefaultDevices: function () {
                FS.mkdir("/dev");
                FS.registerDevice(FS.makedev(1, 3), {
                    read: function () {
                        return 0;
                    },
                    write: function (stream, buffer, offset, length, pos) {
                        return length;
                    },
                });
                FS.mkdev("/dev/null", FS.makedev(1, 3));
                TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
                TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
                FS.mkdev("/dev/tty", FS.makedev(5, 0));
                FS.mkdev("/dev/tty1", FS.makedev(6, 0));
                var random_device;
                if (
                    typeof crypto === "object" &&
                    typeof crypto["getRandomValues"] === "function"
                ) {
                    var randomBuffer = new Uint8Array(1);
                    random_device = function () {
                        crypto.getRandomValues(randomBuffer);
                        return randomBuffer[0];
                    };
                } else if (ENVIRONMENT_IS_NODE) {
                    try {
                        var crypto_module = require("crypto");
                        random_device = function () {
                            return crypto_module["randomBytes"](1)[0];
                        };
                    } catch (e) {}
                } else {
                }
                if (!random_device) {
                    random_device = function () {
                        abort("random_device");
                    };
                }
                FS.createDevice("/dev", "random", random_device);
                FS.createDevice("/dev", "urandom", random_device);
                FS.mkdir("/dev/shm");
                FS.mkdir("/dev/shm/tmp");
            },
            createSpecialDirectories: function () {
                FS.mkdir("/proc");
                FS.mkdir("/proc/self");
                FS.mkdir("/proc/self/fd");
                FS.mount(
                    {
                        mount: function () {
                            var node = FS.createNode(
                                "/proc/self",
                                "fd",
                                16384 | 511,
                                73
                            );
                            node.node_ops = {
                                lookup: function (parent, name) {
                                    var fd = +name;
                                    var stream = FS.getStream(fd);
                                    if (!stream) throw new FS.ErrnoError(8);
                                    var ret = {
                                        parent: null,
                                        mount: { mountpoint: "fake" },
                                        node_ops: {
                                            readlink: function () {
                                                return stream.path;
                                            },
                                        },
                                    };
                                    ret.parent = ret;
                                    return ret;
                                },
                            };
                            return node;
                        },
                    },
                    {},
                    "/proc/self/fd"
                );
            },
            createStandardStreams: function () {
                if (Module["stdin"]) {
                    FS.createDevice("/dev", "stdin", Module["stdin"]);
                } else {
                    FS.symlink("/dev/tty", "/dev/stdin");
                }
                if (Module["stdout"]) {
                    FS.createDevice("/dev", "stdout", null, Module["stdout"]);
                } else {
                    FS.symlink("/dev/tty", "/dev/stdout");
                }
                if (Module["stderr"]) {
                    FS.createDevice("/dev", "stderr", null, Module["stderr"]);
                } else {
                    FS.symlink("/dev/tty1", "/dev/stderr");
                }
                var stdin = FS.open("/dev/stdin", "r");
                var stdout = FS.open("/dev/stdout", "w");
                var stderr = FS.open("/dev/stderr", "w");
            },
            ensureErrnoError: function () {
                if (FS.ErrnoError) return;
                FS.ErrnoError = function ErrnoError(errno, node) {
                    this.node = node;
                    this.setErrno = function (errno) {
                        this.errno = errno;
                    };
                    this.setErrno(errno);
                    this.message = "FS error";
                };
                FS.ErrnoError.prototype = new Error();
                FS.ErrnoError.prototype.constructor = FS.ErrnoError;
                [44].forEach(function (code) {
                    FS.genericErrors[code] = new FS.ErrnoError(code);
                    FS.genericErrors[code].stack = "<generic error, no stack>";
                });
            },
            staticInit: function () {
                FS.ensureErrnoError();
                FS.nameTable = new Array(4096);
                FS.mount(MEMFS, {}, "/");
                FS.createDefaultDirectories();
                FS.createDefaultDevices();
                FS.createSpecialDirectories();
                FS.filesystems = { MEMFS: MEMFS };
            },
            init: function (input, output, error) {
                FS.init.initialized = true;
                FS.ensureErrnoError();
                Module["stdin"] = input || Module["stdin"];
                Module["stdout"] = output || Module["stdout"];
                Module["stderr"] = error || Module["stderr"];
                FS.createStandardStreams();
            },
            quit: function () {
                FS.init.initialized = false;
                var fflush = Module["_fflush"];
                if (fflush) fflush(0);
                for (var i = 0; i < FS.streams.length; i++) {
                    var stream = FS.streams[i];
                    if (!stream) {
                        continue;
                    }
                    FS.close(stream);
                }
            },
            getMode: function (canRead, canWrite) {
                var mode = 0;
                if (canRead) mode |= 292 | 73;
                if (canWrite) mode |= 146;
                return mode;
            },
            joinPath: function (parts, forceRelative) {
                var path = PATH.join.apply(null, parts);
                if (forceRelative && path[0] == "/") path = path.substr(1);
                return path;
            },
            absolutePath: function (relative, base) {
                return PATH_FS.resolve(base, relative);
            },
            standardizePath: function (path) {
                return PATH.normalize(path);
            },
            findObject: function (path, dontResolveLastLink) {
                var ret = FS.analyzePath(path, dontResolveLastLink);
                if (ret.exists) {
                    return ret.object;
                } else {
                    setErrNo(ret.error);
                    return null;
                }
            },
            analyzePath: function (path, dontResolveLastLink) {
                try {
                    var lookup = FS.lookupPath(path, {
                        follow: !dontResolveLastLink,
                    });
                    path = lookup.path;
                } catch (e) {}
                var ret = {
                    isRoot: false,
                    exists: false,
                    error: 0,
                    name: null,
                    path: null,
                    object: null,
                    parentExists: false,
                    parentPath: null,
                    parentObject: null,
                };
                try {
                    var lookup = FS.lookupPath(path, { parent: true });
                    ret.parentExists = true;
                    ret.parentPath = lookup.path;
                    ret.parentObject = lookup.node;
                    ret.name = PATH.basename(path);
                    lookup = FS.lookupPath(path, {
                        follow: !dontResolveLastLink,
                    });
                    ret.exists = true;
                    ret.path = lookup.path;
                    ret.object = lookup.node;
                    ret.name = lookup.node.name;
                    ret.isRoot = lookup.path === "/";
                } catch (e) {
                    ret.error = e.errno;
                }
                return ret;
            },
            createFolder: function (parent, name, canRead, canWrite) {
                var path = PATH.join2(
                    typeof parent === "string" ? parent : FS.getPath(parent),
                    name
                );
                var mode = FS.getMode(canRead, canWrite);
                return FS.mkdir(path, mode);
            },
            createPath: function (parent, path, canRead, canWrite) {
                parent =
                    typeof parent === "string" ? parent : FS.getPath(parent);
                var parts = path.split("/").reverse();
                while (parts.length) {
                    var part = parts.pop();
                    if (!part) continue;
                    var current = PATH.join2(parent, part);
                    try {
                        FS.mkdir(current);
                    } catch (e) {}
                    parent = current;
                }
                return current;
            },
            createFile: function (parent, name, properties, canRead, canWrite) {
                var path = PATH.join2(
                    typeof parent === "string" ? parent : FS.getPath(parent),
                    name
                );
                var mode = FS.getMode(canRead, canWrite);
                return FS.create(path, mode);
            },
            createDataFile: function (
                parent,
                name,
                data,
                canRead,
                canWrite,
                canOwn
            ) {
                var path = name
                    ? PATH.join2(
                          typeof parent === "string"
                              ? parent
                              : FS.getPath(parent),
                          name
                      )
                    : parent;
                var mode = FS.getMode(canRead, canWrite);
                var node = FS.create(path, mode);
                if (data) {
                    if (typeof data === "string") {
                        var arr = new Array(data.length);
                        for (var i = 0, len = data.length; i < len; ++i)
                            arr[i] = data.charCodeAt(i);
                        data = arr;
                    }
                    FS.chmod(node, mode | 146);
                    var stream = FS.open(node, "w");
                    FS.write(stream, data, 0, data.length, 0, canOwn);
                    FS.close(stream);
                    FS.chmod(node, mode);
                }
                return node;
            },
            createDevice: function (parent, name, input, output) {
                var path = PATH.join2(
                    typeof parent === "string" ? parent : FS.getPath(parent),
                    name
                );
                var mode = FS.getMode(!!input, !!output);
                if (!FS.createDevice.major) FS.createDevice.major = 64;
                var dev = FS.makedev(FS.createDevice.major++, 0);
                FS.registerDevice(dev, {
                    open: function (stream) {
                        stream.seekable = false;
                    },
                    close: function (stream) {
                        if (output && output.buffer && output.buffer.length) {
                            output(10);
                        }
                    },
                    read: function (stream, buffer, offset, length, pos) {
                        var bytesRead = 0;
                        for (var i = 0; i < length; i++) {
                            var result;
                            try {
                                result = input();
                            } catch (e) {
                                throw new FS.ErrnoError(29);
                            }
                            if (result === undefined && bytesRead === 0) {
                                throw new FS.ErrnoError(6);
                            }
                            if (result === null || result === undefined) break;
                            bytesRead++;
                            buffer[offset + i] = result;
                        }
                        if (bytesRead) {
                            stream.node.timestamp = Date.now();
                        }
                        return bytesRead;
                    },
                    write: function (stream, buffer, offset, length, pos) {
                        for (var i = 0; i < length; i++) {
                            try {
                                output(buffer[offset + i]);
                            } catch (e) {
                                throw new FS.ErrnoError(29);
                            }
                        }
                        if (length) {
                            stream.node.timestamp = Date.now();
                        }
                        return i;
                    },
                });
                return FS.mkdev(path, mode, dev);
            },
            createLink: function (parent, name, target, canRead, canWrite) {
                var path = PATH.join2(
                    typeof parent === "string" ? parent : FS.getPath(parent),
                    name
                );
                return FS.symlink(target, path);
            },
            forceLoadFile: function (obj) {
                if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
                    return true;
                var success = true;
                if (typeof XMLHttpRequest !== "undefined") {
                    throw new Error(
                        "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
                    );
                } else if (read_) {
                    try {
                        obj.contents = intArrayFromString(read_(obj.url), true);
                        obj.usedBytes = obj.contents.length;
                    } catch (e) {
                        success = false;
                    }
                } else {
                    throw new Error(
                        "Cannot load without read() or XMLHttpRequest."
                    );
                }
                if (!success) setErrNo(29);
                return success;
            },
            createLazyFile: function (parent, name, url, canRead, canWrite) {
                function LazyUint8Array() {
                    this.lengthKnown = false;
                    this.chunks = [];
                }
                LazyUint8Array.prototype.get = function LazyUint8Array_get(
                    idx
                ) {
                    if (idx > this.length - 1 || idx < 0) {
                        return undefined;
                    }
                    var chunkOffset = idx % this.chunkSize;
                    var chunkNum = (idx / this.chunkSize) | 0;
                    return this.getter(chunkNum)[chunkOffset];
                };
                LazyUint8Array.prototype.setDataGetter =
                    function LazyUint8Array_setDataGetter(getter) {
                        this.getter = getter;
                    };
                LazyUint8Array.prototype.cacheLength =
                    function LazyUint8Array_cacheLength() {
                        var xhr = new XMLHttpRequest();
                        xhr.open("HEAD", url, false);
                        xhr.send(null);
                        if (
                            !(
                                (xhr.status >= 200 && xhr.status < 300) ||
                                xhr.status === 304
                            )
                        )
                            throw new Error(
                                "Couldn't load " +
                                    url +
                                    ". Status: " +
                                    xhr.status
                            );
                        var datalength = Number(
                            xhr.getResponseHeader("Content-length")
                        );
                        var header;
                        var hasByteServing =
                            (header = xhr.getResponseHeader("Accept-Ranges")) &&
                            header === "bytes";
                        var usesGzip =
                            (header =
                                xhr.getResponseHeader("Content-Encoding")) &&
                            header === "gzip";
                        var chunkSize = 1024 * 1024;
                        if (!hasByteServing) chunkSize = datalength;
                        var doXHR = function (from, to) {
                            if (from > to)
                                throw new Error(
                                    "invalid range (" +
                                        from +
                                        ", " +
                                        to +
                                        ") or no bytes requested!"
                                );
                            if (to > datalength - 1)
                                throw new Error(
                                    "only " +
                                        datalength +
                                        " bytes available! programmer error!"
                                );
                            var xhr = new XMLHttpRequest();
                            xhr.open("GET", url, false);
                            if (datalength !== chunkSize)
                                xhr.setRequestHeader(
                                    "Range",
                                    "bytes=" + from + "-" + to
                                );
                            if (typeof Uint8Array != "undefined")
                                xhr.responseType = "arraybuffer";
                            if (xhr.overrideMimeType) {
                                xhr.overrideMimeType(
                                    "text/plain; charset=x-user-defined"
                                );
                            }
                            xhr.send(null);
                            if (
                                !(
                                    (xhr.status >= 200 && xhr.status < 300) ||
                                    xhr.status === 304
                                )
                            )
                                throw new Error(
                                    "Couldn't load " +
                                        url +
                                        ". Status: " +
                                        xhr.status
                                );
                            if (xhr.response !== undefined) {
                                return new Uint8Array(xhr.response || []);
                            } else {
                                return intArrayFromString(
                                    xhr.responseText || "",
                                    true
                                );
                            }
                        };
                        var lazyArray = this;
                        lazyArray.setDataGetter(function (chunkNum) {
                            var start = chunkNum * chunkSize;
                            var end = (chunkNum + 1) * chunkSize - 1;
                            end = Math.min(end, datalength - 1);
                            if (
                                typeof lazyArray.chunks[chunkNum] ===
                                "undefined"
                            ) {
                                lazyArray.chunks[chunkNum] = doXHR(start, end);
                            }
                            if (
                                typeof lazyArray.chunks[chunkNum] ===
                                "undefined"
                            )
                                throw new Error("doXHR failed!");
                            return lazyArray.chunks[chunkNum];
                        });
                        if (usesGzip || !datalength) {
                            chunkSize = datalength = 1;
                            datalength = this.getter(0).length;
                            chunkSize = datalength;
                            out(
                                "LazyFiles on gzip forces download of the whole file when length is accessed"
                            );
                        }
                        this._length = datalength;
                        this._chunkSize = chunkSize;
                        this.lengthKnown = true;
                    };
                if (typeof XMLHttpRequest !== "undefined") {
                    if (!ENVIRONMENT_IS_WORKER)
                        throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                    var lazyArray = new LazyUint8Array();
                    Object.defineProperties(lazyArray, {
                        length: {
                            get: function () {
                                if (!this.lengthKnown) {
                                    this.cacheLength();
                                }
                                return this._length;
                            },
                        },
                        chunkSize: {
                            get: function () {
                                if (!this.lengthKnown) {
                                    this.cacheLength();
                                }
                                return this._chunkSize;
                            },
                        },
                    });
                    var properties = { isDevice: false, contents: lazyArray };
                } else {
                    var properties = { isDevice: false, url: url };
                }
                var node = FS.createFile(
                    parent,
                    name,
                    properties,
                    canRead,
                    canWrite
                );
                if (properties.contents) {
                    node.contents = properties.contents;
                } else if (properties.url) {
                    node.contents = null;
                    node.url = properties.url;
                }
                Object.defineProperties(node, {
                    usedBytes: {
                        get: function () {
                            return this.contents.length;
                        },
                    },
                });
                var stream_ops = {};
                var keys = Object.keys(node.stream_ops);
                keys.forEach(function (key) {
                    var fn = node.stream_ops[key];
                    stream_ops[key] = function forceLoadLazyFile() {
                        if (!FS.forceLoadFile(node)) {
                            throw new FS.ErrnoError(29);
                        }
                        return fn.apply(null, arguments);
                    };
                });
                stream_ops.read = function stream_ops_read(
                    stream,
                    buffer,
                    offset,
                    length,
                    position
                ) {
                    if (!FS.forceLoadFile(node)) {
                        throw new FS.ErrnoError(29);
                    }
                    var contents = stream.node.contents;
                    if (position >= contents.length) return 0;
                    var size = Math.min(contents.length - position, length);
                    if (contents.slice) {
                        for (var i = 0; i < size; i++) {
                            buffer[offset + i] = contents[position + i];
                        }
                    } else {
                        for (var i = 0; i < size; i++) {
                            buffer[offset + i] = contents.get(position + i);
                        }
                    }
                    return size;
                };
                node.stream_ops = stream_ops;
                return node;
            },
            createPreloadedFile: function (
                parent,
                name,
                url,
                canRead,
                canWrite,
                onload,
                onerror,
                dontCreateFile,
                canOwn,
                preFinish
            ) {
                Browser.init();
                var fullname = name
                    ? PATH_FS.resolve(PATH.join2(parent, name))
                    : parent;
                var dep = getUniqueRunDependency("cp " + fullname);
                function processData(byteArray) {
                    function finish(byteArray) {
                        if (preFinish) preFinish();
                        if (!dontCreateFile) {
                            FS.createDataFile(
                                parent,
                                name,
                                byteArray,
                                canRead,
                                canWrite,
                                canOwn
                            );
                        }
                        if (onload) onload();
                        removeRunDependency(dep);
                    }
                    var handled = false;
                    Module["preloadPlugins"].forEach(function (plugin) {
                        if (handled) return;
                        if (plugin["canHandle"](fullname)) {
                            plugin["handle"](
                                byteArray,
                                fullname,
                                finish,
                                function () {
                                    if (onerror) onerror();
                                    removeRunDependency(dep);
                                }
                            );
                            handled = true;
                        }
                    });
                    if (!handled) finish(byteArray);
                }
                addRunDependency(dep);
                if (typeof url == "string") {
                    Browser.asyncLoad(
                        url,
                        function (byteArray) {
                            processData(byteArray);
                        },
                        onerror
                    );
                } else {
                    processData(url);
                }
            },
            indexedDB: function () {
                return (
                    window.indexedDB ||
                    window.mozIndexedDB ||
                    window.webkitIndexedDB ||
                    window.msIndexedDB
                );
            },
            DB_NAME: function () {
                return "EM_FS_" + window.location.pathname;
            },
            DB_VERSION: 20,
            DB_STORE_NAME: "FILE_DATA",
        };
        Module["FS"] = FS;
        var SYSCALLS = {
            mappings: {},
            DEFAULT_POLLMASK: 5,
            umask: 511,
            calculateAt: function (dirfd, path) {
                if (path[0] !== "/") {
                    var dir;
                    if (dirfd === -100) {
                        dir = FS.cwd();
                    } else {
                        var dirstream = FS.getStream(dirfd);
                        if (!dirstream) throw new FS.ErrnoError(8);
                        dir = dirstream.path;
                    }
                    path = PATH.join2(dir, path);
                }
                return path;
            },
            doStat: function (func, path, buf) {
                try {
                    var stat = func(path);
                } catch (e) {
                    if (
                        e &&
                        e.node &&
                        PATH.normalize(path) !==
                            PATH.normalize(FS.getPath(e.node))
                    ) {
                        return -54;
                    }
                    throw e;
                }
                HEAP32[buf >> 2] = stat.dev;
                HEAP32[(buf + 4) >> 2] = 0;
                HEAP32[(buf + 8) >> 2] = stat.ino;
                HEAP32[(buf + 12) >> 2] = stat.mode;
                HEAP32[(buf + 16) >> 2] = stat.nlink;
                HEAP32[(buf + 20) >> 2] = stat.uid;
                HEAP32[(buf + 24) >> 2] = stat.gid;
                HEAP32[(buf + 28) >> 2] = stat.rdev;
                HEAP32[(buf + 32) >> 2] = 0;
                (tempI64 = [
                    stat.size >>> 0,
                    ((tempDouble = stat.size),
                    +Math_abs(tempDouble) >= 1
                        ? tempDouble > 0
                            ? (Math_min(
                                  +Math_floor(tempDouble / 4294967296),
                                  4294967295
                              ) |
                                  0) >>>
                              0
                            : ~~+Math_ceil(
                                  (tempDouble - +(~~tempDouble >>> 0)) /
                                      4294967296
                              ) >>> 0
                        : 0),
                ]),
                    (HEAP32[(buf + 40) >> 2] = tempI64[0]),
                    (HEAP32[(buf + 44) >> 2] = tempI64[1]);
                HEAP32[(buf + 48) >> 2] = 4096;
                HEAP32[(buf + 52) >> 2] = stat.blocks;
                HEAP32[(buf + 56) >> 2] = (stat.atime.getTime() / 1e3) | 0;
                HEAP32[(buf + 60) >> 2] = 0;
                HEAP32[(buf + 64) >> 2] = (stat.mtime.getTime() / 1e3) | 0;
                HEAP32[(buf + 68) >> 2] = 0;
                HEAP32[(buf + 72) >> 2] = (stat.ctime.getTime() / 1e3) | 0;
                HEAP32[(buf + 76) >> 2] = 0;
                (tempI64 = [
                    stat.ino >>> 0,
                    ((tempDouble = stat.ino),
                    +Math_abs(tempDouble) >= 1
                        ? tempDouble > 0
                            ? (Math_min(
                                  +Math_floor(tempDouble / 4294967296),
                                  4294967295
                              ) |
                                  0) >>>
                              0
                            : ~~+Math_ceil(
                                  (tempDouble - +(~~tempDouble >>> 0)) /
                                      4294967296
                              ) >>> 0
                        : 0),
                ]),
                    (HEAP32[(buf + 80) >> 2] = tempI64[0]),
                    (HEAP32[(buf + 84) >> 2] = tempI64[1]);
                return 0;
            },
            doMsync: function (addr, stream, len, flags, offset) {
                var buffer = HEAPU8.slice(addr, addr + len);
                FS.msync(stream, buffer, offset, len, flags);
            },
            doMkdir: function (path, mode) {
                path = PATH.normalize(path);
                if (path[path.length - 1] === "/")
                    path = path.substr(0, path.length - 1);
                FS.mkdir(path, mode, 0);
                return 0;
            },
            doMknod: function (path, mode, dev) {
                switch (mode & 61440) {
                    case 32768:
                    case 8192:
                    case 24576:
                    case 4096:
                    case 49152:
                        break;
                    default:
                        return -28;
                }
                FS.mknod(path, mode, dev);
                return 0;
            },
            doReadlink: function (path, buf, bufsize) {
                if (bufsize <= 0) return -28;
                var ret = FS.readlink(path);
                var len = Math.min(bufsize, lengthBytesUTF8(ret));
                var endChar = HEAP8[buf + len];
                stringToUTF8(ret, buf, bufsize + 1);
                HEAP8[buf + len] = endChar;
                return len;
            },
            doAccess: function (path, amode) {
                if (amode & ~7) {
                    return -28;
                }
                var node;
                var lookup = FS.lookupPath(path, { follow: true });
                node = lookup.node;
                if (!node) {
                    return -44;
                }
                var perms = "";
                if (amode & 4) perms += "r";
                if (amode & 2) perms += "w";
                if (amode & 1) perms += "x";
                if (perms && FS.nodePermissions(node, perms)) {
                    return -2;
                }
                return 0;
            },
            doDup: function (path, flags, suggestFD) {
                var suggest = FS.getStream(suggestFD);
                if (suggest) FS.close(suggest);
                return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
            },
            doReadv: function (stream, iov, iovcnt, offset) {
                var ret = 0;
                for (var i = 0; i < iovcnt; i++) {
                    var ptr = HEAP32[(iov + i * 8) >> 2];
                    var len = HEAP32[(iov + (i * 8 + 4)) >> 2];
                    var curr = FS.read(stream, HEAP8, ptr, len, offset);
                    if (curr < 0) return -1;
                    ret += curr;
                    if (curr < len) break;
                }
                return ret;
            },
            doWritev: function (stream, iov, iovcnt, offset) {
                var ret = 0;
                for (var i = 0; i < iovcnt; i++) {
                    var ptr = HEAP32[(iov + i * 8) >> 2];
                    var len = HEAP32[(iov + (i * 8 + 4)) >> 2];
                    var curr = FS.write(stream, HEAP8, ptr, len, offset);
                    if (curr < 0) return -1;
                    ret += curr;
                }
                return ret;
            },
            varargs: undefined,
            get: function () {
                SYSCALLS.varargs += 4;
                var ret = HEAP32[(SYSCALLS.varargs - 4) >> 2];
                return ret;
            },
            getStr: function (ptr) {
                var ret = UTF8ToString(ptr);
                return ret;
            },
            getStreamFromFD: function (fd) {
                var stream = FS.getStream(fd);
                if (!stream) throw new FS.ErrnoError(8);
                return stream;
            },
            get64: function (low, high) {
                return low;
            },
        };
        function ___sys_unlink(path) {
            try {
                path = SYSCALLS.getStr(path);
                FS.unlink(path);
                return 0;
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return -e.errno;
            }
        }
        function ___syscall10(a0) {
            return ___sys_unlink(a0);
        }
        function ___sys_mprotect(addr, len, size) {
            return 0;
        }
        function ___syscall125(a0, a1, a2) {
            return ___sys_mprotect(a0, a1, a2);
        }
        function syscallMmap2(addr, len, prot, flags, fd, off) {
            off <<= 12;
            var ptr;
            var allocated = false;
            if ((flags & 16) !== 0 && addr % 16384 !== 0) {
                return -28;
            }
            if ((flags & 32) !== 0) {
                ptr = _memalign(16384, len);
                if (!ptr) return -48;
                _memset(ptr, 0, len);
                allocated = true;
            } else {
                var info = FS.getStream(fd);
                if (!info) return -8;
                var res = FS.mmap(info, HEAPU8, addr, len, off, prot, flags);
                ptr = res.ptr;
                allocated = res.allocated;
            }
            SYSCALLS.mappings[ptr] = {
                malloc: ptr,
                len: len,
                allocated: allocated,
                fd: fd,
                prot: prot,
                flags: flags,
                offset: off,
            };
            return ptr;
        }
        function ___sys_mmap2(addr, len, prot, flags, fd, off) {
            try {
                return syscallMmap2(addr, len, prot, flags, fd, off);
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return -e.errno;
            }
        }
        function ___syscall192(a0, a1, a2, a3, a4, a5) {
            return ___sys_mmap2(a0, a1, a2, a3, a4, a5);
        }
        function ___sys_ftruncate64(fd, zero, low, high) {
            try {
                var length = SYSCALLS.get64(low, high);
                FS.ftruncate(fd, length);
                return 0;
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return -e.errno;
            }
        }
        function ___syscall194(a0, a1, a2, a3) {
            return ___sys_ftruncate64(a0, a1, a2, a3);
        }
        function ___sys_stat64(path, buf) {
            try {
                path = SYSCALLS.getStr(path);
                return SYSCALLS.doStat(FS.stat, path, buf);
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return -e.errno;
            }
        }
        function ___syscall195(a0, a1) {
            return ___sys_stat64(a0, a1);
        }
        function ___sys_fstat64(fd, buf) {
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                return SYSCALLS.doStat(FS.stat, stream.path, buf);
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return -e.errno;
            }
        }
        function ___syscall197(a0, a1) {
            return ___sys_fstat64(a0, a1);
        }
        function ___sys_getegid32() {
            return 0;
        }
        function ___sys_getuid32() {
            return ___sys_getegid32();
        }
        function ___syscall199() {
            return ___sys_getuid32();
        }
        function ___sys_getpid() {
            return 42;
        }
        function ___syscall20() {
            return ___sys_getpid();
        }
        function ___sys_getgid32() {
            return ___sys_getegid32();
        }
        function ___syscall200() {
            return ___sys_getgid32();
        }
        function ___sys_geteuid32() {
            return ___sys_getegid32();
        }
        function ___syscall201() {
            return ___sys_geteuid32();
        }
        function ___syscall202() {
            return ___sys_getegid32();
        }
        function ___sys_madvise1(addr, length, advice) {
            return 0;
        }
        function ___syscall219(a0, a1, a2) {
            return ___sys_madvise1(a0, a1, a2);
        }
        function ___sys_getdents64(fd, dirp, count) {
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                if (!stream.getdents) {
                    stream.getdents = FS.readdir(stream.path);
                }
                var struct_size = 280;
                var pos = 0;
                var off = FS.llseek(stream, 0, 1);
                var idx = Math.floor(off / struct_size);
                while (
                    idx < stream.getdents.length &&
                    pos + struct_size <= count
                ) {
                    var id;
                    var type;
                    var name = stream.getdents[idx];
                    if (name[0] === ".") {
                        id = 1;
                        type = 4;
                    } else {
                        var child = FS.lookupNode(stream.node, name);
                        id = child.id;
                        type = FS.isChrdev(child.mode)
                            ? 2
                            : FS.isDir(child.mode)
                            ? 4
                            : FS.isLink(child.mode)
                            ? 10
                            : 8;
                    }
                    (tempI64 = [
                        id >>> 0,
                        ((tempDouble = id),
                        +Math_abs(tempDouble) >= 1
                            ? tempDouble > 0
                                ? (Math_min(
                                      +Math_floor(tempDouble / 4294967296),
                                      4294967295
                                  ) |
                                      0) >>>
                                  0
                                : ~~+Math_ceil(
                                      (tempDouble - +(~~tempDouble >>> 0)) /
                                          4294967296
                                  ) >>> 0
                            : 0),
                    ]),
                        (HEAP32[(dirp + pos) >> 2] = tempI64[0]),
                        (HEAP32[(dirp + pos + 4) >> 2] = tempI64[1]);
                    (tempI64 = [
                        ((idx + 1) * struct_size) >>> 0,
                        ((tempDouble = (idx + 1) * struct_size),
                        +Math_abs(tempDouble) >= 1
                            ? tempDouble > 0
                                ? (Math_min(
                                      +Math_floor(tempDouble / 4294967296),
                                      4294967295
                                  ) |
                                      0) >>>
                                  0
                                : ~~+Math_ceil(
                                      (tempDouble - +(~~tempDouble >>> 0)) /
                                          4294967296
                                  ) >>> 0
                            : 0),
                    ]),
                        (HEAP32[(dirp + pos + 8) >> 2] = tempI64[0]),
                        (HEAP32[(dirp + pos + 12) >> 2] = tempI64[1]);
                    HEAP16[(dirp + pos + 16) >> 1] = 280;
                    HEAP8[(dirp + pos + 18) >> 0] = type;
                    stringToUTF8(name, dirp + pos + 19, 256);
                    pos += struct_size;
                    idx += 1;
                }
                FS.llseek(stream, idx * struct_size, 0);
                return pos;
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return -e.errno;
            }
        }
        function ___syscall220(a0, a1, a2) {
            return ___sys_getdents64(a0, a1, a2);
        }
        function ___sys_fcntl64(fd, cmd, varargs) {
            SYSCALLS.varargs = varargs;
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                switch (cmd) {
                    case 0: {
                        var arg = SYSCALLS.get();
                        if (arg < 0) {
                            return -28;
                        }
                        var newStream;
                        newStream = FS.open(stream.path, stream.flags, 0, arg);
                        return newStream.fd;
                    }
                    case 1:
                    case 2:
                        return 0;
                    case 3:
                        return stream.flags;
                    case 4: {
                        var arg = SYSCALLS.get();
                        stream.flags |= arg;
                        return 0;
                    }
                    case 12: {
                        var arg = SYSCALLS.get();
                        var offset = 0;
                        HEAP16[(arg + offset) >> 1] = 2;
                        return 0;
                    }
                    case 13:
                    case 14:
                        return 0;
                    case 16:
                    case 8:
                        return -28;
                    case 9:
                        setErrNo(28);
                        return -1;
                    default: {
                        return -28;
                    }
                }
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return -e.errno;
            }
        }
        function ___syscall221(a0, a1, a2) {
            return ___sys_fcntl64(a0, a1, a2);
        }
        function ___sys_read(fd, buf, count) {
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                return FS.read(stream, HEAP8, buf, count);
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return -e.errno;
            }
        }
        function ___syscall3(a0, a1, a2) {
            return ___sys_read(a0, a1, a2);
        }
        function ___sys_rmdir(path) {
            try {
                path = SYSCALLS.getStr(path);
                FS.rmdir(path);
                return 0;
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return -e.errno;
            }
        }
        function ___syscall40(a0) {
            return ___sys_rmdir(a0);
        }
        function ___sys_open(path, flags, varargs) {
            SYSCALLS.varargs = varargs;
            try {
                var pathname = SYSCALLS.getStr(path);
                var mode = SYSCALLS.get();
                var stream = FS.open(pathname, flags, mode);
                return stream.fd;
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return -e.errno;
            }
        }
        function ___syscall5(a0, a1, a2) {
            return ___sys_open(a0, a1, a2);
        }
        function ___sys_ioctl(fd, op, varargs) {
            SYSCALLS.varargs = varargs;
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                switch (op) {
                    case 21509:
                    case 21505: {
                        if (!stream.tty) return -59;
                        return 0;
                    }
                    case 21510:
                    case 21511:
                    case 21512:
                    case 21506:
                    case 21507:
                    case 21508: {
                        if (!stream.tty) return -59;
                        return 0;
                    }
                    case 21519: {
                        if (!stream.tty) return -59;
                        var argp = SYSCALLS.get();
                        HEAP32[argp >> 2] = 0;
                        return 0;
                    }
                    case 21520: {
                        if (!stream.tty) return -59;
                        return -28;
                    }
                    case 21531: {
                        var argp = SYSCALLS.get();
                        return FS.ioctl(stream, op, argp);
                    }
                    case 21523: {
                        if (!stream.tty) return -59;
                        return 0;
                    }
                    case 21524: {
                        if (!stream.tty) return -59;
                        return 0;
                    }
                    default:
                        abort("bad ioctl syscall " + op);
                }
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return -e.errno;
            }
        }
        function ___syscall54(a0, a1, a2) {
            return ___sys_ioctl(a0, a1, a2);
        }
        function syscallMunmap(addr, len) {
            if ((addr | 0) === -1 || len === 0) {
                return -28;
            }
            var info = SYSCALLS.mappings[addr];
            if (!info) return 0;
            if (len === info.len) {
                var stream = FS.getStream(info.fd);
                if (info.prot & 2) {
                    SYSCALLS.doMsync(
                        addr,
                        stream,
                        len,
                        info.flags,
                        info.offset
                    );
                }
                FS.munmap(stream);
                SYSCALLS.mappings[addr] = null;
                if (info.allocated) {
                    _free(info.malloc);
                }
            }
            return 0;
        }
        function ___sys_munmap(addr, len) {
            try {
                return syscallMunmap(addr, len);
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return -e.errno;
            }
        }
        function ___syscall91(a0, a1) {
            return ___sys_munmap(a0, a1);
        }
        function _fd_close(fd) {
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                FS.close(stream);
                return 0;
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return e.errno;
            }
        }
        function ___wasi_fd_close(a0) {
            return _fd_close(a0);
        }
        function _fd_fdstat_get(fd, pbuf) {
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                var type = stream.tty
                    ? 2
                    : FS.isDir(stream.mode)
                    ? 3
                    : FS.isLink(stream.mode)
                    ? 7
                    : 4;
                HEAP8[pbuf >> 0] = type;
                return 0;
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return e.errno;
            }
        }
        function ___wasi_fd_fdstat_get(a0, a1) {
            return _fd_fdstat_get(a0, a1);
        }
        function _fd_read(fd, iov, iovcnt, pnum) {
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                var num = SYSCALLS.doReadv(stream, iov, iovcnt);
                HEAP32[pnum >> 2] = num;
                return 0;
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return e.errno;
            }
        }
        function ___wasi_fd_read(a0, a1, a2, a3) {
            return _fd_read(a0, a1, a2, a3);
        }
        function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                var HIGH_OFFSET = 4294967296;
                var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
                var DOUBLE_LIMIT = 9007199254740992;
                if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
                    return -61;
                }
                FS.llseek(stream, offset, whence);
                (tempI64 = [
                    stream.position >>> 0,
                    ((tempDouble = stream.position),
                    +Math_abs(tempDouble) >= 1
                        ? tempDouble > 0
                            ? (Math_min(
                                  +Math_floor(tempDouble / 4294967296),
                                  4294967295
                              ) |
                                  0) >>>
                              0
                            : ~~+Math_ceil(
                                  (tempDouble - +(~~tempDouble >>> 0)) /
                                      4294967296
                              ) >>> 0
                        : 0),
                ]),
                    (HEAP32[newOffset >> 2] = tempI64[0]),
                    (HEAP32[(newOffset + 4) >> 2] = tempI64[1]);
                if (stream.getdents && offset === 0 && whence === 0)
                    stream.getdents = null;
                return 0;
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return e.errno;
            }
        }
        function ___wasi_fd_seek(a0, a1, a2, a3, a4) {
            return _fd_seek(a0, a1, a2, a3, a4);
        }
        function _fd_sync(fd) {
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                if (stream.stream_ops && stream.stream_ops.fsync) {
                    return -stream.stream_ops.fsync(stream);
                }
                return 0;
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return e.errno;
            }
        }
        function ___wasi_fd_sync(a0) {
            return _fd_sync(a0);
        }
        function _fd_write(fd, iov, iovcnt, pnum) {
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                var num = SYSCALLS.doWritev(stream, iov, iovcnt);
                HEAP32[pnum >> 2] = num;
                return 0;
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return e.errno;
            }
        }
        function ___wasi_fd_write(a0, a1, a2, a3) {
            return _fd_write(a0, a1, a2, a3);
        }
        function getShiftFromSize(size) {
            switch (size) {
                case 1:
                    return 0;
                case 2:
                    return 1;
                case 4:
                    return 2;
                case 8:
                    return 3;
                default:
                    throw new TypeError("Unknown type size: " + size);
            }
        }
        function embind_init_charCodes() {
            var codes = new Array(256);
            for (var i = 0; i < 256; ++i) {
                codes[i] = String.fromCharCode(i);
            }
            embind_charCodes = codes;
        }
        var embind_charCodes = undefined;
        function readLatin1String(ptr) {
            var ret = "";
            var c = ptr;
            while (HEAPU8[c]) {
                ret += embind_charCodes[HEAPU8[c++]];
            }
            return ret;
        }
        var awaitingDependencies = {};
        var registeredTypes = {};
        var typeDependencies = {};
        var char_0 = 48;
        var char_9 = 57;
        function makeLegalFunctionName(name) {
            if (undefined === name) {
                return "_unknown";
            }
            name = name.replace(/[^a-zA-Z0-9_]/g, "$");
            var f = name.charCodeAt(0);
            if (f >= char_0 && f <= char_9) {
                return "_" + name;
            } else {
                return name;
            }
        }
        function createNamedFunction(name, body) {
            name = makeLegalFunctionName(name);
            return new Function(
                "body",
                "return function " +
                    name +
                    "() {\n" +
                    '    "use strict";' +
                    "    return body.apply(this, arguments);\n" +
                    "};\n"
            )(body);
        }
        function extendError(baseErrorType, errorName) {
            var errorClass = createNamedFunction(errorName, function (message) {
                this.name = errorName;
                this.message = message;
                var stack = new Error(message).stack;
                if (stack !== undefined) {
                    this.stack =
                        this.toString() +
                        "\n" +
                        stack.replace(/^Error(:[^\n]*)?\n/, "");
                }
            });
            errorClass.prototype = Object.create(baseErrorType.prototype);
            errorClass.prototype.constructor = errorClass;
            errorClass.prototype.toString = function () {
                if (this.message === undefined) {
                    return this.name;
                } else {
                    return this.name + ": " + this.message;
                }
            };
            return errorClass;
        }
        var BindingError = undefined;
        function throwBindingError(message) {
            throw new BindingError(message);
        }
        var InternalError = undefined;
        function throwInternalError(message) {
            throw new InternalError(message);
        }
        function whenDependentTypesAreResolved(
            myTypes,
            dependentTypes,
            getTypeConverters
        ) {
            myTypes.forEach(function (type) {
                typeDependencies[type] = dependentTypes;
            });
            function onComplete(typeConverters) {
                var myTypeConverters = getTypeConverters(typeConverters);
                if (myTypeConverters.length !== myTypes.length) {
                    throwInternalError("Mismatched type converter count");
                }
                for (var i = 0; i < myTypes.length; ++i) {
                    registerType(myTypes[i], myTypeConverters[i]);
                }
            }
            var typeConverters = new Array(dependentTypes.length);
            var unregisteredTypes = [];
            var registered = 0;
            dependentTypes.forEach(function (dt, i) {
                if (registeredTypes.hasOwnProperty(dt)) {
                    typeConverters[i] = registeredTypes[dt];
                } else {
                    unregisteredTypes.push(dt);
                    if (!awaitingDependencies.hasOwnProperty(dt)) {
                        awaitingDependencies[dt] = [];
                    }
                    awaitingDependencies[dt].push(function () {
                        typeConverters[i] = registeredTypes[dt];
                        ++registered;
                        if (registered === unregisteredTypes.length) {
                            onComplete(typeConverters);
                        }
                    });
                }
            });
            if (0 === unregisteredTypes.length) {
                onComplete(typeConverters);
            }
        }
        function registerType(rawType, registeredInstance, options) {
            options = options || {};
            if (!("argPackAdvance" in registeredInstance)) {
                throw new TypeError(
                    "registerType registeredInstance requires argPackAdvance"
                );
            }
            var name = registeredInstance.name;
            if (!rawType) {
                throwBindingError(
                    'type "' +
                        name +
                        '" must have a positive integer typeid pointer'
                );
            }
            if (registeredTypes.hasOwnProperty(rawType)) {
                if (options.ignoreDuplicateRegistrations) {
                    return;
                } else {
                    throwBindingError(
                        "Cannot register type '" + name + "' twice"
                    );
                }
            }
            registeredTypes[rawType] = registeredInstance;
            delete typeDependencies[rawType];
            if (awaitingDependencies.hasOwnProperty(rawType)) {
                var callbacks = awaitingDependencies[rawType];
                delete awaitingDependencies[rawType];
                callbacks.forEach(function (cb) {
                    cb();
                });
            }
        }
        function __embind_register_bool(
            rawType,
            name,
            size,
            trueValue,
            falseValue
        ) {
            var shift = getShiftFromSize(size);
            name = readLatin1String(name);
            registerType(rawType, {
                name: name,
                fromWireType: function (wt) {
                    return !!wt;
                },
                toWireType: function (destructors, o) {
                    return o ? trueValue : falseValue;
                },
                argPackAdvance: 8,
                readValueFromPointer: function (pointer) {
                    var heap;
                    if (size === 1) {
                        heap = HEAP8;
                    } else if (size === 2) {
                        heap = HEAP16;
                    } else if (size === 4) {
                        heap = HEAP32;
                    } else {
                        throw new TypeError(
                            "Unknown boolean type size: " + name
                        );
                    }
                    return this["fromWireType"](heap[pointer >> shift]);
                },
                destructorFunction: null,
            });
        }
        function ClassHandle_isAliasOf(other) {
            if (!(this instanceof ClassHandle)) {
                return false;
            }
            if (!(other instanceof ClassHandle)) {
                return false;
            }
            var leftClass = this.$$.ptrType.registeredClass;
            var left = this.$$.ptr;
            var rightClass = other.$$.ptrType.registeredClass;
            var right = other.$$.ptr;
            while (leftClass.baseClass) {
                left = leftClass.upcast(left);
                leftClass = leftClass.baseClass;
            }
            while (rightClass.baseClass) {
                right = rightClass.upcast(right);
                rightClass = rightClass.baseClass;
            }
            return leftClass === rightClass && left === right;
        }
        function shallowCopyInternalPointer(o) {
            return {
                count: o.count,
                deleteScheduled: o.deleteScheduled,
                preservePointerOnDelete: o.preservePointerOnDelete,
                ptr: o.ptr,
                ptrType: o.ptrType,
                smartPtr: o.smartPtr,
                smartPtrType: o.smartPtrType,
            };
        }
        function throwInstanceAlreadyDeleted(obj) {
            function getInstanceTypeName(handle) {
                return handle.$$.ptrType.registeredClass.name;
            }
            throwBindingError(
                getInstanceTypeName(obj) + " instance already deleted"
            );
        }
        var finalizationGroup = false;
        function detachFinalizer(handle) {}
        function runDestructor($$) {
            if ($$.smartPtr) {
                $$.smartPtrType.rawDestructor($$.smartPtr);
            } else {
                $$.ptrType.registeredClass.rawDestructor($$.ptr);
            }
        }
        function releaseClassHandle($$) {
            $$.count.value -= 1;
            var toDelete = 0 === $$.count.value;
            if (toDelete) {
                runDestructor($$);
            }
        }
        function attachFinalizer(handle) {
            if ("undefined" === typeof FinalizationGroup) {
                attachFinalizer = function (handle) {
                    return handle;
                };
                return handle;
            }
            finalizationGroup = new FinalizationGroup(function (iter) {
                for (
                    var result = iter.next();
                    !result.done;
                    result = iter.next()
                ) {
                    var $$ = result.value;
                    if (!$$.ptr) {
                        console.warn("object already deleted: " + $$.ptr);
                    } else {
                        releaseClassHandle($$);
                    }
                }
            });
            attachFinalizer = function (handle) {
                finalizationGroup.register(handle, handle.$$, handle.$$);
                return handle;
            };
            detachFinalizer = function (handle) {
                finalizationGroup.unregister(handle.$$);
            };
            return attachFinalizer(handle);
        }
        function ClassHandle_clone() {
            if (!this.$$.ptr) {
                throwInstanceAlreadyDeleted(this);
            }
            if (this.$$.preservePointerOnDelete) {
                this.$$.count.value += 1;
                return this;
            } else {
                var clone = attachFinalizer(
                    Object.create(Object.getPrototypeOf(this), {
                        $$: { value: shallowCopyInternalPointer(this.$$) },
                    })
                );
                clone.$$.count.value += 1;
                clone.$$.deleteScheduled = false;
                return clone;
            }
        }
        function ClassHandle_delete() {
            if (!this.$$.ptr) {
                throwInstanceAlreadyDeleted(this);
            }
            if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
                throwBindingError("Object already scheduled for deletion");
            }
            detachFinalizer(this);
            releaseClassHandle(this.$$);
            if (!this.$$.preservePointerOnDelete) {
                this.$$.smartPtr = undefined;
                this.$$.ptr = undefined;
            }
        }
        function ClassHandle_isDeleted() {
            return !this.$$.ptr;
        }
        var delayFunction = undefined;
        var deletionQueue = [];
        function flushPendingDeletes() {
            while (deletionQueue.length) {
                var obj = deletionQueue.pop();
                obj.$$.deleteScheduled = false;
                obj["delete"]();
            }
        }
        function ClassHandle_deleteLater() {
            if (!this.$$.ptr) {
                throwInstanceAlreadyDeleted(this);
            }
            if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
                throwBindingError("Object already scheduled for deletion");
            }
            deletionQueue.push(this);
            if (deletionQueue.length === 1 && delayFunction) {
                delayFunction(flushPendingDeletes);
            }
            this.$$.deleteScheduled = true;
            return this;
        }
        function init_ClassHandle() {
            ClassHandle.prototype["isAliasOf"] = ClassHandle_isAliasOf;
            ClassHandle.prototype["clone"] = ClassHandle_clone;
            ClassHandle.prototype["delete"] = ClassHandle_delete;
            ClassHandle.prototype["isDeleted"] = ClassHandle_isDeleted;
            ClassHandle.prototype["deleteLater"] = ClassHandle_deleteLater;
        }
        function ClassHandle() {}
        var registeredPointers = {};
        function ensureOverloadTable(proto, methodName, humanName) {
            if (undefined === proto[methodName].overloadTable) {
                var prevFunc = proto[methodName];
                proto[methodName] = function () {
                    if (
                        !proto[methodName].overloadTable.hasOwnProperty(
                            arguments.length
                        )
                    ) {
                        throwBindingError(
                            "Function '" +
                                humanName +
                                "' called with an invalid number of arguments (" +
                                arguments.length +
                                ") - expects one of (" +
                                proto[methodName].overloadTable +
                                ")!"
                        );
                    }
                    return proto[methodName].overloadTable[
                        arguments.length
                    ].apply(this, arguments);
                };
                proto[methodName].overloadTable = [];
                proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
            }
        }
        function exposePublicSymbol(name, value, numArguments) {
            if (Module.hasOwnProperty(name)) {
                if (
                    undefined === numArguments ||
                    (undefined !== Module[name].overloadTable &&
                        undefined !== Module[name].overloadTable[numArguments])
                ) {
                    throwBindingError(
                        "Cannot register public name '" + name + "' twice"
                    );
                }
                ensureOverloadTable(Module, name, name);
                if (Module.hasOwnProperty(numArguments)) {
                    throwBindingError(
                        "Cannot register multiple overloads of a function with the same number of arguments (" +
                            numArguments +
                            ")!"
                    );
                }
                Module[name].overloadTable[numArguments] = value;
            } else {
                Module[name] = value;
                if (undefined !== numArguments) {
                    Module[name].numArguments = numArguments;
                }
            }
        }
        function RegisteredClass(
            name,
            constructor,
            instancePrototype,
            rawDestructor,
            baseClass,
            getActualType,
            upcast,
            downcast
        ) {
            this.name = name;
            this.constructor = constructor;
            this.instancePrototype = instancePrototype;
            this.rawDestructor = rawDestructor;
            this.baseClass = baseClass;
            this.getActualType = getActualType;
            this.upcast = upcast;
            this.downcast = downcast;
            this.pureVirtualFunctions = [];
        }
        function upcastPointer(ptr, ptrClass, desiredClass) {
            while (ptrClass !== desiredClass) {
                if (!ptrClass.upcast) {
                    throwBindingError(
                        "Expected null or instance of " +
                            desiredClass.name +
                            ", got an instance of " +
                            ptrClass.name
                    );
                }
                ptr = ptrClass.upcast(ptr);
                ptrClass = ptrClass.baseClass;
            }
            return ptr;
        }
        function constNoSmartPtrRawPointerToWireType(destructors, handle) {
            if (handle === null) {
                if (this.isReference) {
                    throwBindingError("null is not a valid " + this.name);
                }
                return 0;
            }
            if (!handle.$$) {
                throwBindingError(
                    'Cannot pass "' +
                        _embind_repr(handle) +
                        '" as a ' +
                        this.name
                );
            }
            if (!handle.$$.ptr) {
                throwBindingError(
                    "Cannot pass deleted object as a pointer of type " +
                        this.name
                );
            }
            var handleClass = handle.$$.ptrType.registeredClass;
            var ptr = upcastPointer(
                handle.$$.ptr,
                handleClass,
                this.registeredClass
            );
            return ptr;
        }
        function genericPointerToWireType(destructors, handle) {
            var ptr;
            if (handle === null) {
                if (this.isReference) {
                    throwBindingError("null is not a valid " + this.name);
                }
                if (this.isSmartPointer) {
                    ptr = this.rawConstructor();
                    if (destructors !== null) {
                        destructors.push(this.rawDestructor, ptr);
                    }
                    return ptr;
                } else {
                    return 0;
                }
            }
            if (!handle.$$) {
                throwBindingError(
                    'Cannot pass "' +
                        _embind_repr(handle) +
                        '" as a ' +
                        this.name
                );
            }
            if (!handle.$$.ptr) {
                throwBindingError(
                    "Cannot pass deleted object as a pointer of type " +
                        this.name
                );
            }
            if (!this.isConst && handle.$$.ptrType.isConst) {
                throwBindingError(
                    "Cannot convert argument of type " +
                        (handle.$$.smartPtrType
                            ? handle.$$.smartPtrType.name
                            : handle.$$.ptrType.name) +
                        " to parameter type " +
                        this.name
                );
            }
            var handleClass = handle.$$.ptrType.registeredClass;
            ptr = upcastPointer(
                handle.$$.ptr,
                handleClass,
                this.registeredClass
            );
            if (this.isSmartPointer) {
                if (undefined === handle.$$.smartPtr) {
                    throwBindingError(
                        "Passing raw pointer to smart pointer is illegal"
                    );
                }
                switch (this.sharingPolicy) {
                    case 0:
                        if (handle.$$.smartPtrType === this) {
                            ptr = handle.$$.smartPtr;
                        } else {
                            throwBindingError(
                                "Cannot convert argument of type " +
                                    (handle.$$.smartPtrType
                                        ? handle.$$.smartPtrType.name
                                        : handle.$$.ptrType.name) +
                                    " to parameter type " +
                                    this.name
                            );
                        }
                        break;
                    case 1:
                        ptr = handle.$$.smartPtr;
                        break;
                    case 2:
                        if (handle.$$.smartPtrType === this) {
                            ptr = handle.$$.smartPtr;
                        } else {
                            var clonedHandle = handle["clone"]();
                            ptr = this.rawShare(
                                ptr,
                                __emval_register(function () {
                                    clonedHandle["delete"]();
                                })
                            );
                            if (destructors !== null) {
                                destructors.push(this.rawDestructor, ptr);
                            }
                        }
                        break;
                    default:
                        throwBindingError("Unsupporting sharing policy");
                }
            }
            return ptr;
        }
        function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
            if (handle === null) {
                if (this.isReference) {
                    throwBindingError("null is not a valid " + this.name);
                }
                return 0;
            }
            if (!handle.$$) {
                throwBindingError(
                    'Cannot pass "' +
                        _embind_repr(handle) +
                        '" as a ' +
                        this.name
                );
            }
            if (!handle.$$.ptr) {
                throwBindingError(
                    "Cannot pass deleted object as a pointer of type " +
                        this.name
                );
            }
            if (handle.$$.ptrType.isConst) {
                throwBindingError(
                    "Cannot convert argument of type " +
                        handle.$$.ptrType.name +
                        " to parameter type " +
                        this.name
                );
            }
            var handleClass = handle.$$.ptrType.registeredClass;
            var ptr = upcastPointer(
                handle.$$.ptr,
                handleClass,
                this.registeredClass
            );
            return ptr;
        }
        function simpleReadValueFromPointer(pointer) {
            return this["fromWireType"](HEAPU32[pointer >> 2]);
        }
        function RegisteredPointer_getPointee(ptr) {
            if (this.rawGetPointee) {
                ptr = this.rawGetPointee(ptr);
            }
            return ptr;
        }
        function RegisteredPointer_destructor(ptr) {
            if (this.rawDestructor) {
                this.rawDestructor(ptr);
            }
        }
        function RegisteredPointer_deleteObject(handle) {
            if (handle !== null) {
                handle["delete"]();
            }
        }
        function downcastPointer(ptr, ptrClass, desiredClass) {
            if (ptrClass === desiredClass) {
                return ptr;
            }
            if (undefined === desiredClass.baseClass) {
                return null;
            }
            var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
            if (rv === null) {
                return null;
            }
            return desiredClass.downcast(rv);
        }
        function getInheritedInstanceCount() {
            return Object.keys(registeredInstances).length;
        }
        function getLiveInheritedInstances() {
            var rv = [];
            for (var k in registeredInstances) {
                if (registeredInstances.hasOwnProperty(k)) {
                    rv.push(registeredInstances[k]);
                }
            }
            return rv;
        }
        function setDelayFunction(fn) {
            delayFunction = fn;
            if (deletionQueue.length && delayFunction) {
                delayFunction(flushPendingDeletes);
            }
        }
        function init_embind() {
            Module["getInheritedInstanceCount"] = getInheritedInstanceCount;
            Module["getLiveInheritedInstances"] = getLiveInheritedInstances;
            Module["flushPendingDeletes"] = flushPendingDeletes;
            Module["setDelayFunction"] = setDelayFunction;
        }
        var registeredInstances = {};
        function getBasestPointer(class_, ptr) {
            if (ptr === undefined) {
                throwBindingError("ptr should not be undefined");
            }
            while (class_.baseClass) {
                ptr = class_.upcast(ptr);
                class_ = class_.baseClass;
            }
            return ptr;
        }
        function getInheritedInstance(class_, ptr) {
            ptr = getBasestPointer(class_, ptr);
            return registeredInstances[ptr];
        }
        function makeClassHandle(prototype, record) {
            if (!record.ptrType || !record.ptr) {
                throwInternalError("makeClassHandle requires ptr and ptrType");
            }
            var hasSmartPtrType = !!record.smartPtrType;
            var hasSmartPtr = !!record.smartPtr;
            if (hasSmartPtrType !== hasSmartPtr) {
                throwInternalError(
                    "Both smartPtrType and smartPtr must be specified"
                );
            }
            record.count = { value: 1 };
            return attachFinalizer(
                Object.create(prototype, { $$: { value: record } })
            );
        }
        function RegisteredPointer_fromWireType(ptr) {
            var rawPointer = this.getPointee(ptr);
            if (!rawPointer) {
                this.destructor(ptr);
                return null;
            }
            var registeredInstance = getInheritedInstance(
                this.registeredClass,
                rawPointer
            );
            if (undefined !== registeredInstance) {
                if (0 === registeredInstance.$$.count.value) {
                    registeredInstance.$$.ptr = rawPointer;
                    registeredInstance.$$.smartPtr = ptr;
                    return registeredInstance["clone"]();
                } else {
                    var rv = registeredInstance["clone"]();
                    this.destructor(ptr);
                    return rv;
                }
            }
            function makeDefaultHandle() {
                if (this.isSmartPointer) {
                    return makeClassHandle(
                        this.registeredClass.instancePrototype,
                        {
                            ptrType: this.pointeeType,
                            ptr: rawPointer,
                            smartPtrType: this,
                            smartPtr: ptr,
                        }
                    );
                } else {
                    return makeClassHandle(
                        this.registeredClass.instancePrototype,
                        { ptrType: this, ptr: ptr }
                    );
                }
            }
            var actualType = this.registeredClass.getActualType(rawPointer);
            var registeredPointerRecord = registeredPointers[actualType];
            if (!registeredPointerRecord) {
                return makeDefaultHandle.call(this);
            }
            var toType;
            if (this.isConst) {
                toType = registeredPointerRecord.constPointerType;
            } else {
                toType = registeredPointerRecord.pointerType;
            }
            var dp = downcastPointer(
                rawPointer,
                this.registeredClass,
                toType.registeredClass
            );
            if (dp === null) {
                return makeDefaultHandle.call(this);
            }
            if (this.isSmartPointer) {
                return makeClassHandle(
                    toType.registeredClass.instancePrototype,
                    {
                        ptrType: toType,
                        ptr: dp,
                        smartPtrType: this,
                        smartPtr: ptr,
                    }
                );
            } else {
                return makeClassHandle(
                    toType.registeredClass.instancePrototype,
                    { ptrType: toType, ptr: dp }
                );
            }
        }
        function init_RegisteredPointer() {
            RegisteredPointer.prototype.getPointee =
                RegisteredPointer_getPointee;
            RegisteredPointer.prototype.destructor =
                RegisteredPointer_destructor;
            RegisteredPointer.prototype["argPackAdvance"] = 8;
            RegisteredPointer.prototype["readValueFromPointer"] =
                simpleReadValueFromPointer;
            RegisteredPointer.prototype["deleteObject"] =
                RegisteredPointer_deleteObject;
            RegisteredPointer.prototype["fromWireType"] =
                RegisteredPointer_fromWireType;
        }
        function RegisteredPointer(
            name,
            registeredClass,
            isReference,
            isConst,
            isSmartPointer,
            pointeeType,
            sharingPolicy,
            rawGetPointee,
            rawConstructor,
            rawShare,
            rawDestructor
        ) {
            this.name = name;
            this.registeredClass = registeredClass;
            this.isReference = isReference;
            this.isConst = isConst;
            this.isSmartPointer = isSmartPointer;
            this.pointeeType = pointeeType;
            this.sharingPolicy = sharingPolicy;
            this.rawGetPointee = rawGetPointee;
            this.rawConstructor = rawConstructor;
            this.rawShare = rawShare;
            this.rawDestructor = rawDestructor;
            if (!isSmartPointer && registeredClass.baseClass === undefined) {
                if (isConst) {
                    this["toWireType"] = constNoSmartPtrRawPointerToWireType;
                    this.destructorFunction = null;
                } else {
                    this["toWireType"] = nonConstNoSmartPtrRawPointerToWireType;
                    this.destructorFunction = null;
                }
            } else {
                this["toWireType"] = genericPointerToWireType;
            }
        }
        function replacePublicSymbol(name, value, numArguments) {
            if (!Module.hasOwnProperty(name)) {
                throwInternalError("Replacing nonexistant public symbol");
            }
            if (
                undefined !== Module[name].overloadTable &&
                undefined !== numArguments
            ) {
                Module[name].overloadTable[numArguments] = value;
            } else {
                Module[name] = value;
                Module[name].argCount = numArguments;
            }
        }
        function embind__requireFunction(signature, rawFunction) {
            signature = readLatin1String(signature);
            function makeDynCaller(dynCall) {
                var args = [];
                for (var i = 1; i < signature.length; ++i) {
                    args.push("a" + i);
                }
                var name = "dynCall_" + signature + "_" + rawFunction;
                var body =
                    "return function " + name + "(" + args.join(", ") + ") {\n";
                body +=
                    "    return dynCall(rawFunction" +
                    (args.length ? ", " : "") +
                    args.join(", ") +
                    ");\n";
                body += "};\n";
                return new Function("dynCall", "rawFunction", body)(
                    dynCall,
                    rawFunction
                );
            }
            var dc = Module["dynCall_" + signature];
            var fp = makeDynCaller(dc);
            if (typeof fp !== "function") {
                throwBindingError(
                    "unknown function pointer with signature " +
                        signature +
                        ": " +
                        rawFunction
                );
            }
            return fp;
        }
        var UnboundTypeError = undefined;
        function getTypeName(type) {
            var ptr = ___getTypeName(type);
            var rv = readLatin1String(ptr);
            _free(ptr);
            return rv;
        }
        function throwUnboundTypeError(message, types) {
            var unboundTypes = [];
            var seen = {};
            function visit(type) {
                if (seen[type]) {
                    return;
                }
                if (registeredTypes[type]) {
                    return;
                }
                if (typeDependencies[type]) {
                    typeDependencies[type].forEach(visit);
                    return;
                }
                unboundTypes.push(type);
                seen[type] = true;
            }
            types.forEach(visit);
            throw new UnboundTypeError(
                message + ": " + unboundTypes.map(getTypeName).join([", "])
            );
        }
        function __embind_register_class(
            rawType,
            rawPointerType,
            rawConstPointerType,
            baseClassRawType,
            getActualTypeSignature,
            getActualType,
            upcastSignature,
            upcast,
            downcastSignature,
            downcast,
            name,
            destructorSignature,
            rawDestructor
        ) {
            name = readLatin1String(name);
            getActualType = embind__requireFunction(
                getActualTypeSignature,
                getActualType
            );
            if (upcast) {
                upcast = embind__requireFunction(upcastSignature, upcast);
            }
            if (downcast) {
                downcast = embind__requireFunction(downcastSignature, downcast);
            }
            rawDestructor = embind__requireFunction(
                destructorSignature,
                rawDestructor
            );
            var legalFunctionName = makeLegalFunctionName(name);
            exposePublicSymbol(legalFunctionName, function () {
                throwUnboundTypeError(
                    "Cannot construct " + name + " due to unbound types",
                    [baseClassRawType]
                );
            });
            whenDependentTypesAreResolved(
                [rawType, rawPointerType, rawConstPointerType],
                baseClassRawType ? [baseClassRawType] : [],
                function (base) {
                    base = base[0];
                    var baseClass;
                    var basePrototype;
                    if (baseClassRawType) {
                        baseClass = base.registeredClass;
                        basePrototype = baseClass.instancePrototype;
                    } else {
                        basePrototype = ClassHandle.prototype;
                    }
                    var constructor = createNamedFunction(
                        legalFunctionName,
                        function () {
                            if (
                                Object.getPrototypeOf(this) !==
                                instancePrototype
                            ) {
                                throw new BindingError(
                                    "Use 'new' to construct " + name
                                );
                            }
                            if (
                                undefined === registeredClass.constructor_body
                            ) {
                                throw new BindingError(
                                    name + " has no accessible constructor"
                                );
                            }
                            var body =
                                registeredClass.constructor_body[
                                    arguments.length
                                ];
                            if (undefined === body) {
                                throw new BindingError(
                                    "Tried to invoke ctor of " +
                                        name +
                                        " with invalid number of parameters (" +
                                        arguments.length +
                                        ") - expected (" +
                                        Object.keys(
                                            registeredClass.constructor_body
                                        ).toString() +
                                        ") parameters instead!"
                                );
                            }
                            return body.apply(this, arguments);
                        }
                    );
                    var instancePrototype = Object.create(basePrototype, {
                        constructor: { value: constructor },
                    });
                    constructor.prototype = instancePrototype;
                    var registeredClass = new RegisteredClass(
                        name,
                        constructor,
                        instancePrototype,
                        rawDestructor,
                        baseClass,
                        getActualType,
                        upcast,
                        downcast
                    );
                    var referenceConverter = new RegisteredPointer(
                        name,
                        registeredClass,
                        true,
                        false,
                        false
                    );
                    var pointerConverter = new RegisteredPointer(
                        name + "*",
                        registeredClass,
                        false,
                        false,
                        false
                    );
                    var constPointerConverter = new RegisteredPointer(
                        name + " const*",
                        registeredClass,
                        false,
                        true,
                        false
                    );
                    registeredPointers[rawType] = {
                        pointerType: pointerConverter,
                        constPointerType: constPointerConverter,
                    };
                    replacePublicSymbol(legalFunctionName, constructor);
                    return [
                        referenceConverter,
                        pointerConverter,
                        constPointerConverter,
                    ];
                }
            );
        }
        function heap32VectorToArray(count, firstElement) {
            var array = [];
            for (var i = 0; i < count; i++) {
                array.push(HEAP32[(firstElement >> 2) + i]);
            }
            return array;
        }
        function runDestructors(destructors) {
            while (destructors.length) {
                var ptr = destructors.pop();
                var del = destructors.pop();
                del(ptr);
            }
        }
        function __embind_register_class_constructor(
            rawClassType,
            argCount,
            rawArgTypesAddr,
            invokerSignature,
            invoker,
            rawConstructor
        ) {
            assert(argCount > 0);
            var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
            invoker = embind__requireFunction(invokerSignature, invoker);
            var args = [rawConstructor];
            var destructors = [];
            whenDependentTypesAreResolved(
                [],
                [rawClassType],
                function (classType) {
                    classType = classType[0];
                    var humanName = "constructor " + classType.name;
                    if (
                        undefined === classType.registeredClass.constructor_body
                    ) {
                        classType.registeredClass.constructor_body = [];
                    }
                    if (
                        undefined !==
                        classType.registeredClass.constructor_body[argCount - 1]
                    ) {
                        throw new BindingError(
                            "Cannot register multiple constructors with identical number of parameters (" +
                                (argCount - 1) +
                                ") for class '" +
                                classType.name +
                                "'! Overload resolution is currently only performed using the parameter count, not actual type info!"
                        );
                    }
                    classType.registeredClass.constructor_body[argCount - 1] =
                        function unboundTypeHandler() {
                            throwUnboundTypeError(
                                "Cannot construct " +
                                    classType.name +
                                    " due to unbound types",
                                rawArgTypes
                            );
                        };
                    whenDependentTypesAreResolved(
                        [],
                        rawArgTypes,
                        function (argTypes) {
                            classType.registeredClass.constructor_body[
                                argCount - 1
                            ] = function constructor_body() {
                                if (arguments.length !== argCount - 1) {
                                    throwBindingError(
                                        humanName +
                                            " called with " +
                                            arguments.length +
                                            " arguments, expected " +
                                            (argCount - 1)
                                    );
                                }
                                destructors.length = 0;
                                args.length = argCount;
                                for (var i = 1; i < argCount; ++i) {
                                    args[i] = argTypes[i]["toWireType"](
                                        destructors,
                                        arguments[i - 1]
                                    );
                                }
                                var ptr = invoker.apply(null, args);
                                runDestructors(destructors);
                                return argTypes[0]["fromWireType"](ptr);
                            };
                            return [];
                        }
                    );
                    return [];
                }
            );
        }
        function new_(constructor, argumentList) {
            if (!(constructor instanceof Function)) {
                throw new TypeError(
                    "new_ called with constructor type " +
                        typeof constructor +
                        " which is not a function"
                );
            }
            var dummy = createNamedFunction(
                constructor.name || "unknownFunctionName",
                function () {}
            );
            dummy.prototype = constructor.prototype;
            var obj = new dummy();
            var r = constructor.apply(obj, argumentList);
            return r instanceof Object ? r : obj;
        }
        function craftInvokerFunction(
            humanName,
            argTypes,
            classType,
            cppInvokerFunc,
            cppTargetFunc
        ) {
            var argCount = argTypes.length;
            if (argCount < 2) {
                throwBindingError(
                    "argTypes array size mismatch! Must at least get return value and 'this' types!"
                );
            }
            var isClassMethodFunc = argTypes[1] !== null && classType !== null;
            var needsDestructorStack = false;
            for (var i = 1; i < argTypes.length; ++i) {
                if (
                    argTypes[i] !== null &&
                    argTypes[i].destructorFunction === undefined
                ) {
                    needsDestructorStack = true;
                    break;
                }
            }
            var returns = argTypes[0].name !== "void";
            var argsList = "";
            var argsListWired = "";
            for (var i = 0; i < argCount - 2; ++i) {
                argsList += (i !== 0 ? ", " : "") + "arg" + i;
                argsListWired += (i !== 0 ? ", " : "") + "arg" + i + "Wired";
            }
            var invokerFnBody =
                "return function " +
                makeLegalFunctionName(humanName) +
                "(" +
                argsList +
                ") {\n" +
                "if (arguments.length !== " +
                (argCount - 2) +
                ") {\n" +
                "throwBindingError('function " +
                humanName +
                " called with ' + arguments.length + ' arguments, expected " +
                (argCount - 2) +
                " args!');\n" +
                "}\n";
            if (needsDestructorStack) {
                invokerFnBody += "var destructors = [];\n";
            }
            var dtorStack = needsDestructorStack ? "destructors" : "null";
            var args1 = [
                "throwBindingError",
                "invoker",
                "fn",
                "runDestructors",
                "retType",
                "classParam",
            ];
            var args2 = [
                throwBindingError,
                cppInvokerFunc,
                cppTargetFunc,
                runDestructors,
                argTypes[0],
                argTypes[1],
            ];
            if (isClassMethodFunc) {
                invokerFnBody +=
                    "var thisWired = classParam.toWireType(" +
                    dtorStack +
                    ", this);\n";
            }
            for (var i = 0; i < argCount - 2; ++i) {
                invokerFnBody +=
                    "var arg" +
                    i +
                    "Wired = argType" +
                    i +
                    ".toWireType(" +
                    dtorStack +
                    ", arg" +
                    i +
                    "); // " +
                    argTypes[i + 2].name +
                    "\n";
                args1.push("argType" + i);
                args2.push(argTypes[i + 2]);
            }
            if (isClassMethodFunc) {
                argsListWired =
                    "thisWired" +
                    (argsListWired.length > 0 ? ", " : "") +
                    argsListWired;
            }
            invokerFnBody +=
                (returns ? "var rv = " : "") +
                "invoker(fn" +
                (argsListWired.length > 0 ? ", " : "") +
                argsListWired +
                ");\n";
            if (needsDestructorStack) {
                invokerFnBody += "runDestructors(destructors);\n";
            } else {
                for (
                    var i = isClassMethodFunc ? 1 : 2;
                    i < argTypes.length;
                    ++i
                ) {
                    var paramName =
                        i === 1 ? "thisWired" : "arg" + (i - 2) + "Wired";
                    if (argTypes[i].destructorFunction !== null) {
                        invokerFnBody +=
                            paramName +
                            "_dtor(" +
                            paramName +
                            "); // " +
                            argTypes[i].name +
                            "\n";
                        args1.push(paramName + "_dtor");
                        args2.push(argTypes[i].destructorFunction);
                    }
                }
            }
            if (returns) {
                invokerFnBody +=
                    "var ret = retType.fromWireType(rv);\n" + "return ret;\n";
            } else {
            }
            invokerFnBody += "}\n";
            args1.push(invokerFnBody);
            var invokerFunction = new_(Function, args1).apply(null, args2);
            return invokerFunction;
        }
        function __embind_register_class_function(
            rawClassType,
            methodName,
            argCount,
            rawArgTypesAddr,
            invokerSignature,
            rawInvoker,
            context,
            isPureVirtual
        ) {
            var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
            methodName = readLatin1String(methodName);
            rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
            whenDependentTypesAreResolved(
                [],
                [rawClassType],
                function (classType) {
                    classType = classType[0];
                    var humanName = classType.name + "." + methodName;
                    if (isPureVirtual) {
                        classType.registeredClass.pureVirtualFunctions.push(
                            methodName
                        );
                    }
                    function unboundTypesHandler() {
                        throwUnboundTypeError(
                            "Cannot call " +
                                humanName +
                                " due to unbound types",
                            rawArgTypes
                        );
                    }
                    var proto = classType.registeredClass.instancePrototype;
                    var method = proto[methodName];
                    if (
                        undefined === method ||
                        (undefined === method.overloadTable &&
                            method.className !== classType.name &&
                            method.argCount === argCount - 2)
                    ) {
                        unboundTypesHandler.argCount = argCount - 2;
                        unboundTypesHandler.className = classType.name;
                        proto[methodName] = unboundTypesHandler;
                    } else {
                        ensureOverloadTable(proto, methodName, humanName);
                        proto[methodName].overloadTable[argCount - 2] =
                            unboundTypesHandler;
                    }
                    whenDependentTypesAreResolved(
                        [],
                        rawArgTypes,
                        function (argTypes) {
                            var memberFunction = craftInvokerFunction(
                                humanName,
                                argTypes,
                                classType,
                                rawInvoker,
                                context
                            );
                            if (undefined === proto[methodName].overloadTable) {
                                memberFunction.argCount = argCount - 2;
                                proto[methodName] = memberFunction;
                            } else {
                                proto[methodName].overloadTable[argCount - 2] =
                                    memberFunction;
                            }
                            return [];
                        }
                    );
                    return [];
                }
            );
        }
        var emval_free_list = [];
        var emval_handle_array = [
            {},
            { value: undefined },
            { value: null },
            { value: true },
            { value: false },
        ];
        function __emval_decref(handle) {
            if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
                emval_handle_array[handle] = undefined;
                emval_free_list.push(handle);
            }
        }
        function count_emval_handles() {
            var count = 0;
            for (var i = 5; i < emval_handle_array.length; ++i) {
                if (emval_handle_array[i] !== undefined) {
                    ++count;
                }
            }
            return count;
        }
        function get_first_emval() {
            for (var i = 5; i < emval_handle_array.length; ++i) {
                if (emval_handle_array[i] !== undefined) {
                    return emval_handle_array[i];
                }
            }
            return null;
        }
        function init_emval() {
            Module["count_emval_handles"] = count_emval_handles;
            Module["get_first_emval"] = get_first_emval;
        }
        function __emval_register(value) {
            switch (value) {
                case undefined: {
                    return 1;
                }
                case null: {
                    return 2;
                }
                case true: {
                    return 3;
                }
                case false: {
                    return 4;
                }
                default: {
                    var handle = emval_free_list.length
                        ? emval_free_list.pop()
                        : emval_handle_array.length;
                    emval_handle_array[handle] = { refcount: 1, value: value };
                    return handle;
                }
            }
        }
        function __embind_register_emval(rawType, name) {
            name = readLatin1String(name);
            registerType(rawType, {
                name: name,
                fromWireType: function (handle) {
                    var rv = emval_handle_array[handle].value;
                    __emval_decref(handle);
                    return rv;
                },
                toWireType: function (destructors, value) {
                    return __emval_register(value);
                },
                argPackAdvance: 8,
                readValueFromPointer: simpleReadValueFromPointer,
                destructorFunction: null,
            });
        }
        function _embind_repr(v) {
            if (v === null) {
                return "null";
            }
            var t = typeof v;
            if (t === "object" || t === "array" || t === "function") {
                return v.toString();
            } else {
                return "" + v;
            }
        }
        function floatReadValueFromPointer(name, shift) {
            switch (shift) {
                case 2:
                    return function (pointer) {
                        return this["fromWireType"](HEAPF32[pointer >> 2]);
                    };
                case 3:
                    return function (pointer) {
                        return this["fromWireType"](HEAPF64[pointer >> 3]);
                    };
                default:
                    throw new TypeError("Unknown float type: " + name);
            }
        }
        function __embind_register_float(rawType, name, size) {
            var shift = getShiftFromSize(size);
            name = readLatin1String(name);
            registerType(rawType, {
                name: name,
                fromWireType: function (value) {
                    return value;
                },
                toWireType: function (destructors, value) {
                    if (
                        typeof value !== "number" &&
                        typeof value !== "boolean"
                    ) {
                        throw new TypeError(
                            'Cannot convert "' +
                                _embind_repr(value) +
                                '" to ' +
                                this.name
                        );
                    }
                    return value;
                },
                argPackAdvance: 8,
                readValueFromPointer: floatReadValueFromPointer(name, shift),
                destructorFunction: null,
            });
        }
        function integerReadValueFromPointer(name, shift, signed) {
            switch (shift) {
                case 0:
                    return signed
                        ? function readS8FromPointer(pointer) {
                              return HEAP8[pointer];
                          }
                        : function readU8FromPointer(pointer) {
                              return HEAPU8[pointer];
                          };
                case 1:
                    return signed
                        ? function readS16FromPointer(pointer) {
                              return HEAP16[pointer >> 1];
                          }
                        : function readU16FromPointer(pointer) {
                              return HEAPU16[pointer >> 1];
                          };
                case 2:
                    return signed
                        ? function readS32FromPointer(pointer) {
                              return HEAP32[pointer >> 2];
                          }
                        : function readU32FromPointer(pointer) {
                              return HEAPU32[pointer >> 2];
                          };
                default:
                    throw new TypeError("Unknown integer type: " + name);
            }
        }
        function __embind_register_integer(
            primitiveType,
            name,
            size,
            minRange,
            maxRange
        ) {
            name = readLatin1String(name);
            if (maxRange === -1) {
                maxRange = 4294967295;
            }
            var shift = getShiftFromSize(size);
            var fromWireType = function (value) {
                return value;
            };
            if (minRange === 0) {
                var bitshift = 32 - 8 * size;
                fromWireType = function (value) {
                    return (value << bitshift) >>> bitshift;
                };
            }
            var isUnsignedType = name.indexOf("unsigned") != -1;
            registerType(primitiveType, {
                name: name,
                fromWireType: fromWireType,
                toWireType: function (destructors, value) {
                    if (
                        typeof value !== "number" &&
                        typeof value !== "boolean"
                    ) {
                        throw new TypeError(
                            'Cannot convert "' +
                                _embind_repr(value) +
                                '" to ' +
                                this.name
                        );
                    }
                    if (value < minRange || value > maxRange) {
                        throw new TypeError(
                            'Passing a number "' +
                                _embind_repr(value) +
                                '" from JS side to C/C++ side to an argument of type "' +
                                name +
                                '", which is outside the valid range [' +
                                minRange +
                                ", " +
                                maxRange +
                                "]!"
                        );
                    }
                    return isUnsignedType ? value >>> 0 : value | 0;
                },
                argPackAdvance: 8,
                readValueFromPointer: integerReadValueFromPointer(
                    name,
                    shift,
                    minRange !== 0
                ),
                destructorFunction: null,
            });
        }
        function __embind_register_memory_view(rawType, dataTypeIndex, name) {
            var typeMapping = [
                Int8Array,
                Uint8Array,
                Int16Array,
                Uint16Array,
                Int32Array,
                Uint32Array,
                Float32Array,
                Float64Array,
            ];
            var TA = typeMapping[dataTypeIndex];
            function decodeMemoryView(handle) {
                handle = handle >> 2;
                var heap = HEAPU32;
                var size = heap[handle];
                var data = heap[handle + 1];
                return new TA(buffer, data, size);
            }
            name = readLatin1String(name);
            registerType(
                rawType,
                {
                    name: name,
                    fromWireType: decodeMemoryView,
                    argPackAdvance: 8,
                    readValueFromPointer: decodeMemoryView,
                },
                { ignoreDuplicateRegistrations: true }
            );
        }
        function __embind_register_std_string(rawType, name) {
            name = readLatin1String(name);
            var stdStringIsUTF8 = name === "std::string";
            registerType(rawType, {
                name: name,
                fromWireType: function (value) {
                    var length = HEAPU32[value >> 2];
                    var str;
                    if (stdStringIsUTF8) {
                        var endChar = HEAPU8[value + 4 + length];
                        var endCharSwap = 0;
                        if (endChar != 0) {
                            endCharSwap = endChar;
                            HEAPU8[value + 4 + length] = 0;
                        }
                        var decodeStartPtr = value + 4;
                        for (var i = 0; i <= length; ++i) {
                            var currentBytePtr = value + 4 + i;
                            if (HEAPU8[currentBytePtr] == 0) {
                                var stringSegment =
                                    UTF8ToString(decodeStartPtr);
                                if (str === undefined) {
                                    str = stringSegment;
                                } else {
                                    str += String.fromCharCode(0);
                                    str += stringSegment;
                                }
                                decodeStartPtr = currentBytePtr + 1;
                            }
                        }
                        if (endCharSwap != 0) {
                            HEAPU8[value + 4 + length] = endCharSwap;
                        }
                    } else {
                        var a = new Array(length);
                        for (var i = 0; i < length; ++i) {
                            a[i] = String.fromCharCode(HEAPU8[value + 4 + i]);
                        }
                        str = a.join("");
                    }
                    _free(value);
                    return str;
                },
                toWireType: function (destructors, value) {
                    if (value instanceof ArrayBuffer) {
                        value = new Uint8Array(value);
                    }
                    var getLength;
                    var valueIsOfTypeString = typeof value === "string";
                    if (
                        !(
                            valueIsOfTypeString ||
                            value instanceof Uint8Array ||
                            value instanceof Uint8ClampedArray ||
                            value instanceof Int8Array
                        )
                    ) {
                        throwBindingError(
                            "Cannot pass non-string to std::string"
                        );
                    }
                    if (stdStringIsUTF8 && valueIsOfTypeString) {
                        getLength = function () {
                            return lengthBytesUTF8(value);
                        };
                    } else {
                        getLength = function () {
                            return value.length;
                        };
                    }
                    var length = getLength();
                    var ptr = _malloc(4 + length + 1);
                    HEAPU32[ptr >> 2] = length;
                    if (stdStringIsUTF8 && valueIsOfTypeString) {
                        stringToUTF8(value, ptr + 4, length + 1);
                    } else {
                        if (valueIsOfTypeString) {
                            for (var i = 0; i < length; ++i) {
                                var charCode = value.charCodeAt(i);
                                if (charCode > 255) {
                                    _free(ptr);
                                    throwBindingError(
                                        "String has UTF-16 code units that do not fit in 8 bits"
                                    );
                                }
                                HEAPU8[ptr + 4 + i] = charCode;
                            }
                        } else {
                            for (var i = 0; i < length; ++i) {
                                HEAPU8[ptr + 4 + i] = value[i];
                            }
                        }
                    }
                    if (destructors !== null) {
                        destructors.push(_free, ptr);
                    }
                    return ptr;
                },
                argPackAdvance: 8,
                readValueFromPointer: simpleReadValueFromPointer,
                destructorFunction: function (ptr) {
                    _free(ptr);
                },
            });
        }
        function __embind_register_std_wstring(rawType, charSize, name) {
            name = readLatin1String(name);
            var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
            if (charSize === 2) {
                decodeString = UTF16ToString;
                encodeString = stringToUTF16;
                lengthBytesUTF = lengthBytesUTF16;
                getHeap = function () {
                    return HEAPU16;
                };
                shift = 1;
            } else if (charSize === 4) {
                decodeString = UTF32ToString;
                encodeString = stringToUTF32;
                lengthBytesUTF = lengthBytesUTF32;
                getHeap = function () {
                    return HEAPU32;
                };
                shift = 2;
            }
            registerType(rawType, {
                name: name,
                fromWireType: function (value) {
                    var length = HEAPU32[value >> 2];
                    var HEAP = getHeap();
                    var str;
                    var endChar =
                        HEAP[(value + 4 + length * charSize) >> shift];
                    var endCharSwap = 0;
                    if (endChar != 0) {
                        endCharSwap = endChar;
                        HEAP[(value + 4 + length * charSize) >> shift] = 0;
                    }
                    var decodeStartPtr = value + 4;
                    for (var i = 0; i <= length; ++i) {
                        var currentBytePtr = value + 4 + i * charSize;
                        if (HEAP[currentBytePtr >> shift] == 0) {
                            var stringSegment = decodeString(decodeStartPtr);
                            if (str === undefined) {
                                str = stringSegment;
                            } else {
                                str += String.fromCharCode(0);
                                str += stringSegment;
                            }
                            decodeStartPtr = currentBytePtr + charSize;
                        }
                    }
                    if (endCharSwap != 0) {
                        HEAP[(value + 4 + length * charSize) >> shift] =
                            endCharSwap;
                    }
                    _free(value);
                    return str;
                },
                toWireType: function (destructors, value) {
                    if (!(typeof value === "string")) {
                        throwBindingError(
                            "Cannot pass non-string to C++ string type " + name
                        );
                    }
                    var length = lengthBytesUTF(value);
                    var ptr = _malloc(4 + length + charSize);
                    HEAPU32[ptr >> 2] = length >> shift;
                    encodeString(value, ptr + 4, length + charSize);
                    if (destructors !== null) {
                        destructors.push(_free, ptr);
                    }
                    return ptr;
                },
                argPackAdvance: 8,
                readValueFromPointer: simpleReadValueFromPointer,
                destructorFunction: function (ptr) {
                    _free(ptr);
                },
            });
        }
        function __embind_register_void(rawType, name) {
            name = readLatin1String(name);
            registerType(rawType, {
                isVoid: true,
                name: name,
                argPackAdvance: 0,
                fromWireType: function () {
                    return undefined;
                },
                toWireType: function (destructors, o) {
                    return undefined;
                },
            });
        }
        function requireHandle(handle) {
            if (!handle) {
                throwBindingError("Cannot use deleted val. handle = " + handle);
            }
            return emval_handle_array[handle].value;
        }
        function requireRegisteredType(rawType, humanName) {
            var impl = registeredTypes[rawType];
            if (undefined === impl) {
                throwBindingError(
                    humanName + " has unknown type " + getTypeName(rawType)
                );
            }
            return impl;
        }
        function __emval_as(handle, returnType, destructorsRef) {
            handle = requireHandle(handle);
            returnType = requireRegisteredType(returnType, "emval::as");
            var destructors = [];
            var rd = __emval_register(destructors);
            HEAP32[destructorsRef >> 2] = rd;
            return returnType["toWireType"](destructors, handle);
        }
        function __emval_incref(handle) {
            if (handle > 4) {
                emval_handle_array[handle].refcount += 1;
            }
        }
        function __emval_is_number(handle) {
            handle = requireHandle(handle);
            return typeof handle === "number";
        }
        function __emval_run_destructors(handle) {
            var destructors = emval_handle_array[handle].value;
            runDestructors(destructors);
            __emval_decref(handle);
        }
        function __emval_take_value(type, argv) {
            type = requireRegisteredType(type, "_emval_take_value");
            var v = type["readValueFromPointer"](argv);
            return __emval_register(v);
        }
        function _abort() {
            abort();
        }
        function _atexit(func, arg) {
            __ATEXIT__.unshift({ func: func, arg: arg });
        }
        var _emscripten_get_now;
        if (ENVIRONMENT_IS_NODE) {
            _emscripten_get_now = function () {
                var t = process["hrtime"]();
                return t[0] * 1e3 + t[1] / 1e6;
            };
        } else if (typeof dateNow !== "undefined") {
            _emscripten_get_now = dateNow;
        } else
            _emscripten_get_now = function () {
                return performance.now();
            };
        var _emscripten_get_now_is_monotonic = true;
        function _clock_gettime(clk_id, tp) {
            var now;
            if (clk_id === 0) {
                now = Date.now();
            } else if (
                (clk_id === 1 || clk_id === 4) &&
                _emscripten_get_now_is_monotonic
            ) {
                now = _emscripten_get_now();
            } else {
                setErrNo(28);
                return -1;
            }
            HEAP32[tp >> 2] = (now / 1e3) | 0;
            HEAP32[(tp + 4) >> 2] = ((now % 1e3) * 1e3 * 1e3) | 0;
            return 0;
        }
        function _emscripten_get_heap_size() {
            return HEAPU8.length;
        }
        function _longjmp(env, value) {
            _setThrew(env, value || 1);
            throw "longjmp";
        }
        function _emscripten_longjmp(env, value) {
            _longjmp(env, value);
        }
        function emscripten_realloc_buffer(size) {
            try {
                wasmMemory.grow((size - buffer.byteLength + 65535) >>> 16);
                updateGlobalBufferAndViews(wasmMemory.buffer);
                return 1;
            } catch (e) {}
        }
        function _emscripten_resize_heap(requestedSize) {
            requestedSize = requestedSize >>> 0;
            var oldSize = _emscripten_get_heap_size();
            var PAGE_MULTIPLE = 65536;
            var maxHeapSize = 2147483648;
            if (requestedSize > maxHeapSize) {
                return false;
            }
            var minHeapSize = 16777216;
            for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
                var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
                overGrownHeapSize = Math.min(
                    overGrownHeapSize,
                    requestedSize + 100663296
                );
                var newSize = Math.min(
                    maxHeapSize,
                    alignUp(
                        Math.max(minHeapSize, requestedSize, overGrownHeapSize),
                        PAGE_MULTIPLE
                    )
                );
                var replacement = emscripten_realloc_buffer(newSize);
                if (replacement) {
                    return true;
                }
            }
            return false;
        }
        function _emscripten_run_script_string(ptr) {
            var s = eval(UTF8ToString(ptr));
            if (s == null) {
                return 0;
            }
            s += "";
            var me = _emscripten_run_script_string;
            var len = lengthBytesUTF8(s);
            if (!me.bufferSize || me.bufferSize < len + 1) {
                if (me.bufferSize) _free(me.buffer);
                me.bufferSize = len + 1;
                me.buffer = _malloc(me.bufferSize);
            }
            stringToUTF8(s, me.buffer, me.bufferSize);
            return me.buffer;
        }
        function _exit(status) {
            exit(status);
        }
        function _getenv(name) {
            if (name === 0) return 0;
            name = UTF8ToString(name);
            if (!ENV.hasOwnProperty(name)) return 0;
            if (_getenv.ret) _free(_getenv.ret);
            _getenv.ret = allocateUTF8(ENV[name]);
            return _getenv.ret;
        }
        function _gettimeofday(ptr) {
            var now = Date.now();
            HEAP32[ptr >> 2] = (now / 1e3) | 0;
            HEAP32[(ptr + 4) >> 2] = ((now % 1e3) * 1e3) | 0;
            return 0;
        }
        var ___tm_current = 1989936;
        var ___tm_timezone = (stringToUTF8("GMT", 1989984, 4), 1989984);
        function _gmtime_r(time, tmPtr) {
            var date = new Date(HEAP32[time >> 2] * 1e3);
            HEAP32[tmPtr >> 2] = date.getUTCSeconds();
            HEAP32[(tmPtr + 4) >> 2] = date.getUTCMinutes();
            HEAP32[(tmPtr + 8) >> 2] = date.getUTCHours();
            HEAP32[(tmPtr + 12) >> 2] = date.getUTCDate();
            HEAP32[(tmPtr + 16) >> 2] = date.getUTCMonth();
            HEAP32[(tmPtr + 20) >> 2] = date.getUTCFullYear() - 1900;
            HEAP32[(tmPtr + 24) >> 2] = date.getUTCDay();
            HEAP32[(tmPtr + 36) >> 2] = 0;
            HEAP32[(tmPtr + 32) >> 2] = 0;
            var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
            var yday = ((date.getTime() - start) / (1e3 * 60 * 60 * 24)) | 0;
            HEAP32[(tmPtr + 28) >> 2] = yday;
            HEAP32[(tmPtr + 40) >> 2] = ___tm_timezone;
            return tmPtr;
        }
        function _gmtime(time) {
            return _gmtime_r(time, ___tm_current);
        }
        function _llvm_log10_f32(x) {
            return Math.log(x) / Math.LN10;
        }
        function _llvm_log10_f64(a0) {
            return _llvm_log10_f32(a0);
        }
        function _llvm_stackrestore(p) {
            var self = _llvm_stacksave;
            var ret = self.LLVM_SAVEDSTACKS[p];
            self.LLVM_SAVEDSTACKS.splice(p, 1);
            stackRestore(ret);
        }
        function _llvm_stacksave() {
            var self = _llvm_stacksave;
            if (!self.LLVM_SAVEDSTACKS) {
                self.LLVM_SAVEDSTACKS = [];
            }
            self.LLVM_SAVEDSTACKS.push(stackSave());
            return self.LLVM_SAVEDSTACKS.length - 1;
        }
        function _llvm_trap() {
            abort("trap!");
        }
        function _tzset() {
            if (_tzset.called) return;
            _tzset.called = true;
            HEAP32[__get_timezone() >> 2] = new Date().getTimezoneOffset() * 60;
            var currentYear = new Date().getFullYear();
            var winter = new Date(currentYear, 0, 1);
            var summer = new Date(currentYear, 6, 1);
            HEAP32[__get_daylight() >> 2] = Number(
                winter.getTimezoneOffset() != summer.getTimezoneOffset()
            );
            function extractZone(date) {
                var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
                return match ? match[1] : "GMT";
            }
            var winterName = extractZone(winter);
            var summerName = extractZone(summer);
            var winterNamePtr = allocateUTF8(winterName);
            var summerNamePtr = allocateUTF8(summerName);
            if (summer.getTimezoneOffset() < winter.getTimezoneOffset()) {
                HEAP32[__get_tzname() >> 2] = winterNamePtr;
                HEAP32[(__get_tzname() + 4) >> 2] = summerNamePtr;
            } else {
                HEAP32[__get_tzname() >> 2] = summerNamePtr;
                HEAP32[(__get_tzname() + 4) >> 2] = winterNamePtr;
            }
        }
        function _localtime_r(time, tmPtr) {
            _tzset();
            var date = new Date(HEAP32[time >> 2] * 1e3);
            HEAP32[tmPtr >> 2] = date.getSeconds();
            HEAP32[(tmPtr + 4) >> 2] = date.getMinutes();
            HEAP32[(tmPtr + 8) >> 2] = date.getHours();
            HEAP32[(tmPtr + 12) >> 2] = date.getDate();
            HEAP32[(tmPtr + 16) >> 2] = date.getMonth();
            HEAP32[(tmPtr + 20) >> 2] = date.getFullYear() - 1900;
            HEAP32[(tmPtr + 24) >> 2] = date.getDay();
            var start = new Date(date.getFullYear(), 0, 1);
            var yday =
                ((date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) | 0;
            HEAP32[(tmPtr + 28) >> 2] = yday;
            HEAP32[(tmPtr + 36) >> 2] = -(date.getTimezoneOffset() * 60);
            var summerOffset = new Date(
                date.getFullYear(),
                6,
                1
            ).getTimezoneOffset();
            var winterOffset = start.getTimezoneOffset();
            var dst =
                (summerOffset != winterOffset &&
                    date.getTimezoneOffset() ==
                        Math.min(winterOffset, summerOffset)) | 0;
            HEAP32[(tmPtr + 32) >> 2] = dst;
            var zonePtr = HEAP32[(__get_tzname() + (dst ? 4 : 0)) >> 2];
            HEAP32[(tmPtr + 40) >> 2] = zonePtr;
            return tmPtr;
        }
        function _localtime(time) {
            return _localtime_r(time, ___tm_current);
        }
        function _emscripten_memcpy_big(dest, src, num) {
            HEAPU8.copyWithin(dest, src, src + num);
        }
        function __isLeapYear(year) {
            return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        }
        function __arraySum(array, index) {
            var sum = 0;
            for (var i = 0; i <= index; sum += array[i++]) {}
            return sum;
        }
        var __MONTH_DAYS_LEAP = [
            31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
        ];
        var __MONTH_DAYS_REGULAR = [
            31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
        ];
        function __addDays(date, days) {
            var newDate = new Date(date.getTime());
            while (days > 0) {
                var leap = __isLeapYear(newDate.getFullYear());
                var currentMonth = newDate.getMonth();
                var daysInCurrentMonth = (
                    leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR
                )[currentMonth];
                if (days > daysInCurrentMonth - newDate.getDate()) {
                    days -= daysInCurrentMonth - newDate.getDate() + 1;
                    newDate.setDate(1);
                    if (currentMonth < 11) {
                        newDate.setMonth(currentMonth + 1);
                    } else {
                        newDate.setMonth(0);
                        newDate.setFullYear(newDate.getFullYear() + 1);
                    }
                } else {
                    newDate.setDate(newDate.getDate() + days);
                    return newDate;
                }
            }
            return newDate;
        }
        function _strftime(s, maxsize, format, tm) {
            var tm_zone = HEAP32[(tm + 40) >> 2];
            var date = {
                tm_sec: HEAP32[tm >> 2],
                tm_min: HEAP32[(tm + 4) >> 2],
                tm_hour: HEAP32[(tm + 8) >> 2],
                tm_mday: HEAP32[(tm + 12) >> 2],
                tm_mon: HEAP32[(tm + 16) >> 2],
                tm_year: HEAP32[(tm + 20) >> 2],
                tm_wday: HEAP32[(tm + 24) >> 2],
                tm_yday: HEAP32[(tm + 28) >> 2],
                tm_isdst: HEAP32[(tm + 32) >> 2],
                tm_gmtoff: HEAP32[(tm + 36) >> 2],
                tm_zone: tm_zone ? UTF8ToString(tm_zone) : "",
            };
            var pattern = UTF8ToString(format);
            var EXPANSION_RULES_1 = {
                "%c": "%a %b %d %H:%M:%S %Y",
                "%D": "%m/%d/%y",
                "%F": "%Y-%m-%d",
                "%h": "%b",
                "%r": "%I:%M:%S %p",
                "%R": "%H:%M",
                "%T": "%H:%M:%S",
                "%x": "%m/%d/%y",
                "%X": "%H:%M:%S",
                "%Ec": "%c",
                "%EC": "%C",
                "%Ex": "%m/%d/%y",
                "%EX": "%H:%M:%S",
                "%Ey": "%y",
                "%EY": "%Y",
                "%Od": "%d",
                "%Oe": "%e",
                "%OH": "%H",
                "%OI": "%I",
                "%Om": "%m",
                "%OM": "%M",
                "%OS": "%S",
                "%Ou": "%u",
                "%OU": "%U",
                "%OV": "%V",
                "%Ow": "%w",
                "%OW": "%W",
                "%Oy": "%y",
            };
            for (var rule in EXPANSION_RULES_1) {
                pattern = pattern.replace(
                    new RegExp(rule, "g"),
                    EXPANSION_RULES_1[rule]
                );
            }
            var WEEKDAYS = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];
            var MONTHS = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            function leadingSomething(value, digits, character) {
                var str =
                    typeof value === "number" ? value.toString() : value || "";
                while (str.length < digits) {
                    str = character[0] + str;
                }
                return str;
            }
            function leadingNulls(value, digits) {
                return leadingSomething(value, digits, "0");
            }
            function compareByDay(date1, date2) {
                function sgn(value) {
                    return value < 0 ? -1 : value > 0 ? 1 : 0;
                }
                var compare;
                if (
                    (compare = sgn(
                        date1.getFullYear() - date2.getFullYear()
                    )) === 0
                ) {
                    if (
                        (compare = sgn(date1.getMonth() - date2.getMonth())) ===
                        0
                    ) {
                        compare = sgn(date1.getDate() - date2.getDate());
                    }
                }
                return compare;
            }
            function getFirstWeekStartDate(janFourth) {
                switch (janFourth.getDay()) {
                    case 0:
                        return new Date(janFourth.getFullYear() - 1, 11, 29);
                    case 1:
                        return janFourth;
                    case 2:
                        return new Date(janFourth.getFullYear(), 0, 3);
                    case 3:
                        return new Date(janFourth.getFullYear(), 0, 2);
                    case 4:
                        return new Date(janFourth.getFullYear(), 0, 1);
                    case 5:
                        return new Date(janFourth.getFullYear() - 1, 11, 31);
                    case 6:
                        return new Date(janFourth.getFullYear() - 1, 11, 30);
                }
            }
            function getWeekBasedYear(date) {
                var thisDate = __addDays(
                    new Date(date.tm_year + 1900, 0, 1),
                    date.tm_yday
                );
                var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
                var janFourthNextYear = new Date(
                    thisDate.getFullYear() + 1,
                    0,
                    4
                );
                var firstWeekStartThisYear =
                    getFirstWeekStartDate(janFourthThisYear);
                var firstWeekStartNextYear =
                    getFirstWeekStartDate(janFourthNextYear);
                if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
                    if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
                        return thisDate.getFullYear() + 1;
                    } else {
                        return thisDate.getFullYear();
                    }
                } else {
                    return thisDate.getFullYear() - 1;
                }
            }
            var EXPANSION_RULES_2 = {
                "%a": function (date) {
                    return WEEKDAYS[date.tm_wday].substring(0, 3);
                },
                "%A": function (date) {
                    return WEEKDAYS[date.tm_wday];
                },
                "%b": function (date) {
                    return MONTHS[date.tm_mon].substring(0, 3);
                },
                "%B": function (date) {
                    return MONTHS[date.tm_mon];
                },
                "%C": function (date) {
                    var year = date.tm_year + 1900;
                    return leadingNulls((year / 100) | 0, 2);
                },
                "%d": function (date) {
                    return leadingNulls(date.tm_mday, 2);
                },
                "%e": function (date) {
                    return leadingSomething(date.tm_mday, 2, " ");
                },
                "%g": function (date) {
                    return getWeekBasedYear(date).toString().substring(2);
                },
                "%G": function (date) {
                    return getWeekBasedYear(date);
                },
                "%H": function (date) {
                    return leadingNulls(date.tm_hour, 2);
                },
                "%I": function (date) {
                    var twelveHour = date.tm_hour;
                    if (twelveHour == 0) twelveHour = 12;
                    else if (twelveHour > 12) twelveHour -= 12;
                    return leadingNulls(twelveHour, 2);
                },
                "%j": function (date) {
                    return leadingNulls(
                        date.tm_mday +
                            __arraySum(
                                __isLeapYear(date.tm_year + 1900)
                                    ? __MONTH_DAYS_LEAP
                                    : __MONTH_DAYS_REGULAR,
                                date.tm_mon - 1
                            ),
                        3
                    );
                },
                "%m": function (date) {
                    return leadingNulls(date.tm_mon + 1, 2);
                },
                "%M": function (date) {
                    return leadingNulls(date.tm_min, 2);
                },
                "%n": function () {
                    return "\n";
                },
                "%p": function (date) {
                    if (date.tm_hour >= 0 && date.tm_hour < 12) {
                        return "AM";
                    } else {
                        return "PM";
                    }
                },
                "%S": function (date) {
                    return leadingNulls(date.tm_sec, 2);
                },
                "%t": function () {
                    return "\t";
                },
                "%u": function (date) {
                    return date.tm_wday || 7;
                },
                "%U": function (date) {
                    var janFirst = new Date(date.tm_year + 1900, 0, 1);
                    var firstSunday =
                        janFirst.getDay() === 0
                            ? janFirst
                            : __addDays(janFirst, 7 - janFirst.getDay());
                    var endDate = new Date(
                        date.tm_year + 1900,
                        date.tm_mon,
                        date.tm_mday
                    );
                    if (compareByDay(firstSunday, endDate) < 0) {
                        var februaryFirstUntilEndMonth =
                            __arraySum(
                                __isLeapYear(endDate.getFullYear())
                                    ? __MONTH_DAYS_LEAP
                                    : __MONTH_DAYS_REGULAR,
                                endDate.getMonth() - 1
                            ) - 31;
                        var firstSundayUntilEndJanuary =
                            31 - firstSunday.getDate();
                        var days =
                            firstSundayUntilEndJanuary +
                            februaryFirstUntilEndMonth +
                            endDate.getDate();
                        return leadingNulls(Math.ceil(days / 7), 2);
                    }
                    return compareByDay(firstSunday, janFirst) === 0
                        ? "01"
                        : "00";
                },
                "%V": function (date) {
                    var janFourthThisYear = new Date(date.tm_year + 1900, 0, 4);
                    var janFourthNextYear = new Date(date.tm_year + 1901, 0, 4);
                    var firstWeekStartThisYear =
                        getFirstWeekStartDate(janFourthThisYear);
                    var firstWeekStartNextYear =
                        getFirstWeekStartDate(janFourthNextYear);
                    var endDate = __addDays(
                        new Date(date.tm_year + 1900, 0, 1),
                        date.tm_yday
                    );
                    if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
                        return "53";
                    }
                    if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
                        return "01";
                    }
                    var daysDifference;
                    if (
                        firstWeekStartThisYear.getFullYear() <
                        date.tm_year + 1900
                    ) {
                        daysDifference =
                            date.tm_yday +
                            32 -
                            firstWeekStartThisYear.getDate();
                    } else {
                        daysDifference =
                            date.tm_yday + 1 - firstWeekStartThisYear.getDate();
                    }
                    return leadingNulls(Math.ceil(daysDifference / 7), 2);
                },
                "%w": function (date) {
                    return date.tm_wday;
                },
                "%W": function (date) {
                    var janFirst = new Date(date.tm_year, 0, 1);
                    var firstMonday =
                        janFirst.getDay() === 1
                            ? janFirst
                            : __addDays(
                                  janFirst,
                                  janFirst.getDay() === 0
                                      ? 1
                                      : 7 - janFirst.getDay() + 1
                              );
                    var endDate = new Date(
                        date.tm_year + 1900,
                        date.tm_mon,
                        date.tm_mday
                    );
                    if (compareByDay(firstMonday, endDate) < 0) {
                        var februaryFirstUntilEndMonth =
                            __arraySum(
                                __isLeapYear(endDate.getFullYear())
                                    ? __MONTH_DAYS_LEAP
                                    : __MONTH_DAYS_REGULAR,
                                endDate.getMonth() - 1
                            ) - 31;
                        var firstMondayUntilEndJanuary =
                            31 - firstMonday.getDate();
                        var days =
                            firstMondayUntilEndJanuary +
                            februaryFirstUntilEndMonth +
                            endDate.getDate();
                        return leadingNulls(Math.ceil(days / 7), 2);
                    }
                    return compareByDay(firstMonday, janFirst) === 0
                        ? "01"
                        : "00";
                },
                "%y": function (date) {
                    return (date.tm_year + 1900).toString().substring(2);
                },
                "%Y": function (date) {
                    return date.tm_year + 1900;
                },
                "%z": function (date) {
                    var off = date.tm_gmtoff;
                    var ahead = off >= 0;
                    off = Math.abs(off) / 60;
                    off = (off / 60) * 100 + (off % 60);
                    return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
                },
                "%Z": function (date) {
                    return date.tm_zone;
                },
                "%%": function () {
                    return "%";
                },
            };
            for (var rule in EXPANSION_RULES_2) {
                if (pattern.indexOf(rule) >= 0) {
                    pattern = pattern.replace(
                        new RegExp(rule, "g"),
                        EXPANSION_RULES_2[rule](date)
                    );
                }
            }
            var bytes = intArrayFromString(pattern, false);
            if (bytes.length > maxsize) {
                return 0;
            }
            writeArrayToMemory(bytes, s);
            return bytes.length - 1;
        }
        function _strftime_l(s, maxsize, format, tm) {
            return _strftime(s, maxsize, format, tm);
        }
        function _time(ptr) {
            var ret = (Date.now() / 1e3) | 0;
            if (ptr) {
                HEAP32[ptr >> 2] = ret;
            }
            return ret;
        }
        var FSNode = function (parent, name, mode, rdev) {
            if (!parent) {
                parent = this;
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.mounted = null;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
        };
        var readMode = 292 | 73;
        var writeMode = 146;
        Object.defineProperties(FSNode.prototype, {
            read: {
                get: function () {
                    return (this.mode & readMode) === readMode;
                },
                set: function (val) {
                    val ? (this.mode |= readMode) : (this.mode &= ~readMode);
                },
            },
            write: {
                get: function () {
                    return (this.mode & writeMode) === writeMode;
                },
                set: function (val) {
                    val ? (this.mode |= writeMode) : (this.mode &= ~writeMode);
                },
            },
            isFolder: {
                get: function () {
                    return FS.isDir(this.mode);
                },
            },
            isDevice: {
                get: function () {
                    return FS.isChrdev(this.mode);
                },
            },
        });
        FS.FSNode = FSNode;
        FS.staticInit();
        embind_init_charCodes();
        BindingError = Module["BindingError"] = extendError(
            Error,
            "BindingError"
        );
        InternalError = Module["InternalError"] = extendError(
            Error,
            "InternalError"
        );
        init_ClassHandle();
        init_RegisteredPointer();
        init_embind();
        UnboundTypeError = Module["UnboundTypeError"] = extendError(
            Error,
            "UnboundTypeError"
        );
        init_emval();
        var ASSERTIONS = false;
        function intArrayFromString(stringy, dontAddNull, length) {
            var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
            var u8array = new Array(len);
            var numBytesWritten = stringToUTF8Array(
                stringy,
                u8array,
                0,
                u8array.length
            );
            if (dontAddNull) u8array.length = numBytesWritten;
            return u8array;
        }
        function invoke_ii(index, a1) {
            var sp = stackSave();
            try {
                return dynCall_ii(index, a1);
            } catch (e) {
                stackRestore(sp);
                if (e !== e + 0 && e !== "longjmp") throw e;
                _setThrew(1, 0);
            }
        }
        function invoke_iii(index, a1, a2) {
            var sp = stackSave();
            try {
                return dynCall_iii(index, a1, a2);
            } catch (e) {
                stackRestore(sp);
                if (e !== e + 0 && e !== "longjmp") throw e;
                _setThrew(1, 0);
            }
        }
        function invoke_iiii(index, a1, a2, a3) {
            var sp = stackSave();
            try {
                return dynCall_iiii(index, a1, a2, a3);
            } catch (e) {
                stackRestore(sp);
                if (e !== e + 0 && e !== "longjmp") throw e;
                _setThrew(1, 0);
            }
        }
        function invoke_iiiii(index, a1, a2, a3, a4) {
            var sp = stackSave();
            try {
                return dynCall_iiiii(index, a1, a2, a3, a4);
            } catch (e) {
                stackRestore(sp);
                if (e !== e + 0 && e !== "longjmp") throw e;
                _setThrew(1, 0);
            }
        }
        function invoke_vi(index, a1) {
            var sp = stackSave();
            try {
                dynCall_vi(index, a1);
            } catch (e) {
                stackRestore(sp);
                if (e !== e + 0 && e !== "longjmp") throw e;
                _setThrew(1, 0);
            }
        }
        function invoke_vii(index, a1, a2) {
            var sp = stackSave();
            try {
                dynCall_vii(index, a1, a2);
            } catch (e) {
                stackRestore(sp);
                if (e !== e + 0 && e !== "longjmp") throw e;
                _setThrew(1, 0);
            }
        }
        function invoke_viid(index, a1, a2, a3) {
            var sp = stackSave();
            try {
                dynCall_viid(index, a1, a2, a3);
            } catch (e) {
                stackRestore(sp);
                if (e !== e + 0 && e !== "longjmp") throw e;
                _setThrew(1, 0);
            }
        }
        function invoke_viii(index, a1, a2, a3) {
            var sp = stackSave();
            try {
                dynCall_viii(index, a1, a2, a3);
            } catch (e) {
                stackRestore(sp);
                if (e !== e + 0 && e !== "longjmp") throw e;
                _setThrew(1, 0);
            }
        }
        function invoke_viiii(index, a1, a2, a3, a4) {
            var sp = stackSave();
            try {
                dynCall_viiii(index, a1, a2, a3, a4);
            } catch (e) {
                stackRestore(sp);
                if (e !== e + 0 && e !== "longjmp") throw e;
                _setThrew(1, 0);
            }
        }
        function invoke_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
            var sp = stackSave();
            try {
                dynCall_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9);
            } catch (e) {
                stackRestore(sp);
                if (e !== e + 0 && e !== "longjmp") throw e;
                _setThrew(1, 0);
            }
        }
        var asmGlobalArg = {};
        var asmLibraryArg = {
            ___assert_fail: ___assert_fail,
            ___buildEnvironment: ___buildEnvironment,
            ___cxa_allocate_exception: ___cxa_allocate_exception,
            ___cxa_begin_catch: ___cxa_begin_catch,
            ___cxa_throw: ___cxa_throw,
            ___exception_addRef: ___exception_addRef,
            ___exception_deAdjust: ___exception_deAdjust,
            ___gxx_personality_v0: ___gxx_personality_v0,
            ___map_file: ___map_file,
            ___sys_fcntl64: ___sys_fcntl64,
            ___sys_fstat64: ___sys_fstat64,
            ___sys_ftruncate64: ___sys_ftruncate64,
            ___sys_getdents64: ___sys_getdents64,
            ___sys_getegid32: ___sys_getegid32,
            ___sys_geteuid32: ___sys_geteuid32,
            ___sys_getgid32: ___sys_getgid32,
            ___sys_getpid: ___sys_getpid,
            ___sys_getuid32: ___sys_getuid32,
            ___sys_ioctl: ___sys_ioctl,
            ___sys_madvise1: ___sys_madvise1,
            ___sys_mmap2: ___sys_mmap2,
            ___sys_mprotect: ___sys_mprotect,
            ___sys_munmap: ___sys_munmap,
            ___sys_open: ___sys_open,
            ___sys_read: ___sys_read,
            ___sys_rmdir: ___sys_rmdir,
            ___sys_stat64: ___sys_stat64,
            ___sys_unlink: ___sys_unlink,
            ___syscall10: ___syscall10,
            ___syscall125: ___syscall125,
            ___syscall192: ___syscall192,
            ___syscall194: ___syscall194,
            ___syscall195: ___syscall195,
            ___syscall197: ___syscall197,
            ___syscall199: ___syscall199,
            ___syscall20: ___syscall20,
            ___syscall200: ___syscall200,
            ___syscall201: ___syscall201,
            ___syscall202: ___syscall202,
            ___syscall219: ___syscall219,
            ___syscall220: ___syscall220,
            ___syscall221: ___syscall221,
            ___syscall3: ___syscall3,
            ___syscall40: ___syscall40,
            ___syscall5: ___syscall5,
            ___syscall54: ___syscall54,
            ___syscall91: ___syscall91,
            ___wasi_fd_close: ___wasi_fd_close,
            ___wasi_fd_fdstat_get: ___wasi_fd_fdstat_get,
            ___wasi_fd_read: ___wasi_fd_read,
            ___wasi_fd_seek: ___wasi_fd_seek,
            ___wasi_fd_sync: ___wasi_fd_sync,
            ___wasi_fd_write: ___wasi_fd_write,
            __addDays: __addDays,
            __arraySum: __arraySum,
            __embind_register_bool: __embind_register_bool,
            __embind_register_class: __embind_register_class,
            __embind_register_class_constructor:
                __embind_register_class_constructor,
            __embind_register_class_function: __embind_register_class_function,
            __embind_register_emval: __embind_register_emval,
            __embind_register_float: __embind_register_float,
            __embind_register_integer: __embind_register_integer,
            __embind_register_memory_view: __embind_register_memory_view,
            __embind_register_std_string: __embind_register_std_string,
            __embind_register_std_wstring: __embind_register_std_wstring,
            __embind_register_void: __embind_register_void,
            __emval_as: __emval_as,
            __emval_decref: __emval_decref,
            __emval_incref: __emval_incref,
            __emval_is_number: __emval_is_number,
            __emval_register: __emval_register,
            __emval_run_destructors: __emval_run_destructors,
            __emval_take_value: __emval_take_value,
            __getExecutableName: __getExecutableName,
            __isLeapYear: __isLeapYear,
            __memory_base: 1024,
            __table_base: 0,
            _abort: _abort,
            _atexit: _atexit,
            _clock_gettime: _clock_gettime,
            _embind_repr: _embind_repr,
            _emscripten_get_heap_size: _emscripten_get_heap_size,
            _emscripten_get_now: _emscripten_get_now,
            _emscripten_longjmp: _emscripten_longjmp,
            _emscripten_memcpy_big: _emscripten_memcpy_big,
            _emscripten_resize_heap: _emscripten_resize_heap,
            _emscripten_run_script_string: _emscripten_run_script_string,
            _exit: _exit,
            _fd_close: _fd_close,
            _fd_fdstat_get: _fd_fdstat_get,
            _fd_read: _fd_read,
            _fd_seek: _fd_seek,
            _fd_sync: _fd_sync,
            _fd_write: _fd_write,
            _getenv: _getenv,
            _gettimeofday: _gettimeofday,
            _gmtime: _gmtime,
            _gmtime_r: _gmtime_r,
            _llvm_log10_f32: _llvm_log10_f32,
            _llvm_log10_f64: _llvm_log10_f64,
            _llvm_stackrestore: _llvm_stackrestore,
            _llvm_stacksave: _llvm_stacksave,
            _llvm_trap: _llvm_trap,
            _localtime: _localtime,
            _localtime_r: _localtime_r,
            _longjmp: _longjmp,
            _strftime: _strftime,
            _strftime_l: _strftime_l,
            _time: _time,
            _tzset: _tzset,
            abort: abort,
            getTempRet0: getTempRet0,
            invoke_ii: invoke_ii,
            invoke_iii: invoke_iii,
            invoke_iiii: invoke_iiii,
            invoke_iiiii: invoke_iiiii,
            invoke_vi: invoke_vi,
            invoke_vii: invoke_vii,
            invoke_viid: invoke_viid,
            invoke_viii: invoke_viii,
            invoke_viiii: invoke_viiii,
            invoke_viiiiiiiii: invoke_viiiiiiiii,
            memory: wasmMemory,
            setTempRet0: setTempRet0,
            table: wasmTable,
            tempDoublePtr: tempDoublePtr,
        };
        var asm = Module["asm"](asmGlobalArg, asmLibraryArg, buffer);
        Module["asm"] = asm;
        var _DestroyPdfReader = (Module["_DestroyPdfReader"] = function () {
            return Module["asm"]["_DestroyPdfReader"].apply(null, arguments);
        });
        var _GetDynamicPdfRWasmVersion = (Module["_GetDynamicPdfRWasmVersion"] =
            function () {
                return Module["asm"]["_GetDynamicPdfRWasmVersion"].apply(
                    null,
                    arguments
                );
            });
        var _InitPdfReader = (Module["_InitPdfReader"] = function () {
            return Module["asm"]["_InitPdfReader"].apply(null, arguments);
        });
        var _PdfReaderChangePagesOrder = (Module["_PdfReaderChangePagesOrder"] =
            function () {
                return Module["asm"]["_PdfReaderChangePagesOrder"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderCreateDcument = (Module["_PdfReaderCreateDcument"] =
            function () {
                return Module["asm"]["_PdfReaderCreateDcument"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderDeletePdfPage = (Module["_PdfReaderDeletePdfPage"] =
            function () {
                return Module["asm"]["_PdfReaderDeletePdfPage"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderExtractPdfPageAllImages = (Module[
            "_PdfReaderExtractPdfPageAllImages"
        ] = function () {
            return Module["asm"]["_PdfReaderExtractPdfPageAllImages"].apply(
                null,
                arguments
            );
        });
        var _PdfReaderFindText = (Module["_PdfReaderFindText"] = function () {
            return Module["asm"]["_PdfReaderFindText"].apply(null, arguments);
        });
        var _PdfReaderFreeLoadedFont = (Module["_PdfReaderFreeLoadedFont"] =
            function () {
                return Module["asm"]["_PdfReaderFreeLoadedFont"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderGetAttachment = (Module["_PdfReaderGetAttachment"] =
            function () {
                return Module["asm"]["_PdfReaderGetAttachment"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderGetAttachmentCount = (Module[
            "_PdfReaderGetAttachmentCount"
        ] = function () {
            return Module["asm"]["_PdfReaderGetAttachmentCount"].apply(
                null,
                arguments
            );
        });
        var _PdfReaderGetModifiedPdf = (Module["_PdfReaderGetModifiedPdf"] =
            function () {
                return Module["asm"]["_PdfReaderGetModifiedPdf"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderGetPageAnnot = (Module["_PdfReaderGetPageAnnot"] =
            function () {
                return Module["asm"]["_PdfReaderGetPageAnnot"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderGetPageContentType = (Module[
            "_PdfReaderGetPageContentType"
        ] = function () {
            return Module["asm"]["_PdfReaderGetPageContentType"].apply(
                null,
                arguments
            );
        });
        var _PdfReaderGetPageCount = (Module["_PdfReaderGetPageCount"] =
            function () {
                return Module["asm"]["_PdfReaderGetPageCount"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderGetPageFontInfo = (Module["_PdfReaderGetPageFontInfo"] =
            function () {
                return Module["asm"]["_PdfReaderGetPageFontInfo"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderGetPageInfo = (Module["_PdfReaderGetPageInfo"] =
            function () {
                return Module["asm"]["_PdfReaderGetPageInfo"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderGetPdfInfo = (Module["_PdfReaderGetPdfInfo"] =
            function () {
                return Module["asm"]["_PdfReaderGetPdfInfo"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderGetPermission = (Module["_PdfReaderGetPermission"] =
            function () {
                return Module["asm"]["_PdfReaderGetPermission"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderGetSpecPageAnnot = (Module["_PdfReaderGetSpecPageAnnot"] =
            function () {
                return Module["asm"]["_PdfReaderGetSpecPageAnnot"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderInsertBlankPdfPage = (Module[
            "_PdfReaderInsertBlankPdfPage"
        ] = function () {
            return Module["asm"]["_PdfReaderInsertBlankPdfPage"].apply(
                null,
                arguments
            );
        });
        var _PdfReaderLoadFont = (Module["_PdfReaderLoadFont"] = function () {
            return Module["asm"]["_PdfReaderLoadFont"].apply(null, arguments);
        });
        var _PdfReaderLoadPdfDocument = (Module["_PdfReaderLoadPdfDocument"] =
            function () {
                return Module["asm"]["_PdfReaderLoadPdfDocument"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderMergePdfPage = (Module["_PdfReaderMergePdfPage"] =
            function () {
                return Module["asm"]["_PdfReaderMergePdfPage"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderPageAddAnnot = (Module["_PdfReaderPageAddAnnot"] =
            function () {
                return Module["asm"]["_PdfReaderPageAddAnnot"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderPageAddImage = (Module["_PdfReaderPageAddImage"] =
            function () {
                return Module["asm"]["_PdfReaderPageAddImage"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderPageAddPath = (Module["_PdfReaderPageAddPath"] =
            function () {
                return Module["asm"]["_PdfReaderPageAddPath"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderPageAddText = (Module["_PdfReaderPageAddText"] =
            function () {
                return Module["asm"]["_PdfReaderPageAddText"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderPageAddTextWatermark = (Module[
            "_PdfReaderPageAddTextWatermark"
        ] = function () {
            return Module["asm"]["_PdfReaderPageAddTextWatermark"].apply(
                null,
                arguments
            );
        });
        var _PdfReaderPageDeleteAnnot = (Module["_PdfReaderPageDeleteAnnot"] =
            function () {
                return Module["asm"]["_PdfReaderPageDeleteAnnot"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderPageRotateLeft = (Module["_PdfReaderPageRotateLeft"] =
            function () {
                return Module["asm"]["_PdfReaderPageRotateLeft"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderPageRotateRight = (Module["_PdfReaderPageRotateRight"] =
            function () {
                return Module["asm"]["_PdfReaderPageRotateRight"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderPageSetCropBox = (Module["_PdfReaderPageSetCropBox"] =
            function () {
                return Module["asm"]["_PdfReaderPageSetCropBox"].apply(
                    null,
                    arguments
                );
            });
        var _PdfReaderReadPdfPageToImage = (Module[
            "_PdfReaderReadPdfPageToImage"
        ] = function () {
            return Module["asm"]["_PdfReaderReadPdfPageToImage"].apply(
                null,
                arguments
            );
        });
        var _PdfReaderSetRenderLimitImageSize = (Module[
            "_PdfReaderSetRenderLimitImageSize"
        ] = function () {
            return Module["asm"]["_PdfReaderSetRenderLimitImageSize"].apply(
                null,
                arguments
            );
        });
        var _PdfReaderSplitPdfPage = (Module["_PdfReaderSplitPdfPage"] =
            function () {
                return Module["asm"]["_PdfReaderSplitPdfPage"].apply(
                    null,
                    arguments
                );
            });
        var __ZSt18uncaught_exceptionv = (Module["__ZSt18uncaught_exceptionv"] =
            function () {
                return Module["asm"]["__ZSt18uncaught_exceptionv"].apply(
                    null,
                    arguments
                );
            });
        var ___embind_register_native_and_builtin_types = (Module[
            "___embind_register_native_and_builtin_types"
        ] = function () {
            return Module["asm"][
                "___embind_register_native_and_builtin_types"
            ].apply(null, arguments);
        });
        var ___errno_location = (Module["___errno_location"] = function () {
            return Module["asm"]["___errno_location"].apply(null, arguments);
        });
        var ___getTypeName = (Module["___getTypeName"] = function () {
            return Module["asm"]["___getTypeName"].apply(null, arguments);
        });
        var __get_daylight = (Module["__get_daylight"] = function () {
            return Module["asm"]["__get_daylight"].apply(null, arguments);
        });
        var __get_environ = (Module["__get_environ"] = function () {
            return Module["asm"]["__get_environ"].apply(null, arguments);
        });
        var __get_timezone = (Module["__get_timezone"] = function () {
            return Module["asm"]["__get_timezone"].apply(null, arguments);
        });
        var __get_tzname = (Module["__get_tzname"] = function () {
            return Module["asm"]["__get_tzname"].apply(null, arguments);
        });
        var _aes_gcm_decrypt = (Module["_aes_gcm_decrypt"] = function () {
            return Module["asm"]["_aes_gcm_decrypt"].apply(null, arguments);
        });
        var _aes_gcm_encrypt = (Module["_aes_gcm_encrypt"] = function () {
            return Module["asm"]["_aes_gcm_encrypt"].apply(null, arguments);
        });
        var _emscripten_get_sbrk_ptr = (Module["_emscripten_get_sbrk_ptr"] =
            function () {
                return Module["asm"]["_emscripten_get_sbrk_ptr"].apply(
                    null,
                    arguments
                );
            });
        var _emscripten_replace_memory = (Module["_emscripten_replace_memory"] =
            function () {
                return Module["asm"]["_emscripten_replace_memory"].apply(
                    null,
                    arguments
                );
            });
        var _free = (Module["_free"] = function () {
            return Module["asm"]["_free"].apply(null, arguments);
        });
        var _htonl = (Module["_htonl"] = function () {
            return Module["asm"]["_htonl"].apply(null, arguments);
        });
        var _htons = (Module["_htons"] = function () {
            return Module["asm"]["_htons"].apply(null, arguments);
        });
        var _llvm_bswap_i16 = (Module["_llvm_bswap_i16"] = function () {
            return Module["asm"]["_llvm_bswap_i16"].apply(null, arguments);
        });
        var _llvm_bswap_i32 = (Module["_llvm_bswap_i32"] = function () {
            return Module["asm"]["_llvm_bswap_i32"].apply(null, arguments);
        });
        var _llvm_round_f32 = (Module["_llvm_round_f32"] = function () {
            return Module["asm"]["_llvm_round_f32"].apply(null, arguments);
        });
        var _malloc = (Module["_malloc"] = function () {
            return Module["asm"]["_malloc"].apply(null, arguments);
        });
        var _memalign = (Module["_memalign"] = function () {
            return Module["asm"]["_memalign"].apply(null, arguments);
        });
        var _memcpy = (Module["_memcpy"] = function () {
            return Module["asm"]["_memcpy"].apply(null, arguments);
        });
        var _memmove = (Module["_memmove"] = function () {
            return Module["asm"]["_memmove"].apply(null, arguments);
        });
        var _memset = (Module["_memset"] = function () {
            return Module["asm"]["_memset"].apply(null, arguments);
        });
        var _ntohs = (Module["_ntohs"] = function () {
            return Module["asm"]["_ntohs"].apply(null, arguments);
        });
        var _realloc = (Module["_realloc"] = function () {
            return Module["asm"]["_realloc"].apply(null, arguments);
        });
        var _rintf = (Module["_rintf"] = function () {
            return Module["asm"]["_rintf"].apply(null, arguments);
        });
        var _saveSetjmp = (Module["_saveSetjmp"] = function () {
            return Module["asm"]["_saveSetjmp"].apply(null, arguments);
        });
        var _setThrew = (Module["_setThrew"] = function () {
            return Module["asm"]["_setThrew"].apply(null, arguments);
        });
        var _testSetjmp = (Module["_testSetjmp"] = function () {
            return Module["asm"]["_testSetjmp"].apply(null, arguments);
        });
        var globalCtors = (Module["globalCtors"] = function () {
            return Module["asm"]["globalCtors"].apply(null, arguments);
        });
        var stackAlloc = (Module["stackAlloc"] = function () {
            return Module["asm"]["stackAlloc"].apply(null, arguments);
        });
        var stackRestore = (Module["stackRestore"] = function () {
            return Module["asm"]["stackRestore"].apply(null, arguments);
        });
        var stackSave = (Module["stackSave"] = function () {
            return Module["asm"]["stackSave"].apply(null, arguments);
        });
        var dynCall_diid = (Module["dynCall_diid"] = function () {
            return Module["asm"]["dynCall_diid"].apply(null, arguments);
        });
        var dynCall_fi = (Module["dynCall_fi"] = function () {
            return Module["asm"]["dynCall_fi"].apply(null, arguments);
        });
        var dynCall_i = (Module["dynCall_i"] = function () {
            return Module["asm"]["dynCall_i"].apply(null, arguments);
        });
        var dynCall_idi = (Module["dynCall_idi"] = function () {
            return Module["asm"]["dynCall_idi"].apply(null, arguments);
        });
        var dynCall_ii = (Module["dynCall_ii"] = function () {
            return Module["asm"]["dynCall_ii"].apply(null, arguments);
        });
        var dynCall_iiddddi = (Module["dynCall_iiddddi"] = function () {
            return Module["asm"]["dynCall_iiddddi"].apply(null, arguments);
        });
        var dynCall_iidiiii = (Module["dynCall_iidiiii"] = function () {
            return Module["asm"]["dynCall_iidiiii"].apply(null, arguments);
        });
        var dynCall_iii = (Module["dynCall_iii"] = function () {
            return Module["asm"]["dynCall_iii"].apply(null, arguments);
        });
        var dynCall_iiid = (Module["dynCall_iiid"] = function () {
            return Module["asm"]["dynCall_iiid"].apply(null, arguments);
        });
        var dynCall_iiii = (Module["dynCall_iiii"] = function () {
            return Module["asm"]["dynCall_iiii"].apply(null, arguments);
        });
        var dynCall_iiiii = (Module["dynCall_iiiii"] = function () {
            return Module["asm"]["dynCall_iiiii"].apply(null, arguments);
        });
        var dynCall_iiiiid = (Module["dynCall_iiiiid"] = function () {
            return Module["asm"]["dynCall_iiiiid"].apply(null, arguments);
        });
        var dynCall_iiiiii = (Module["dynCall_iiiiii"] = function () {
            return Module["asm"]["dynCall_iiiiii"].apply(null, arguments);
        });
        var dynCall_iiiiiid = (Module["dynCall_iiiiiid"] = function () {
            return Module["asm"]["dynCall_iiiiiid"].apply(null, arguments);
        });
        var dynCall_iiiiiifi = (Module["dynCall_iiiiiifi"] = function () {
            return Module["asm"]["dynCall_iiiiiifi"].apply(null, arguments);
        });
        var dynCall_iiiiiii = (Module["dynCall_iiiiiii"] = function () {
            return Module["asm"]["dynCall_iiiiiii"].apply(null, arguments);
        });
        var dynCall_iiiiiiii = (Module["dynCall_iiiiiiii"] = function () {
            return Module["asm"]["dynCall_iiiiiiii"].apply(null, arguments);
        });
        var dynCall_iiiiiiiii = (Module["dynCall_iiiiiiiii"] = function () {
            return Module["asm"]["dynCall_iiiiiiiii"].apply(null, arguments);
        });
        var dynCall_iiiiiiiiii = (Module["dynCall_iiiiiiiiii"] = function () {
            return Module["asm"]["dynCall_iiiiiiiiii"].apply(null, arguments);
        });
        var dynCall_iiiiiiiiiii = (Module["dynCall_iiiiiiiiiii"] = function () {
            return Module["asm"]["dynCall_iiiiiiiiiii"].apply(null, arguments);
        });
        var dynCall_iiiiiiiiiiii = (Module["dynCall_iiiiiiiiiiii"] =
            function () {
                return Module["asm"]["dynCall_iiiiiiiiiiii"].apply(
                    null,
                    arguments
                );
            });
        var dynCall_iiiiij = (Module["dynCall_iiiiij"] = function () {
            return Module["asm"]["dynCall_iiiiij"].apply(null, arguments);
        });
        var dynCall_iiiij = (Module["dynCall_iiiij"] = function () {
            return Module["asm"]["dynCall_iiiij"].apply(null, arguments);
        });
        var dynCall_iiiji = (Module["dynCall_iiiji"] = function () {
            return Module["asm"]["dynCall_iiiji"].apply(null, arguments);
        });
        var dynCall_iij = (Module["dynCall_iij"] = function () {
            return Module["asm"]["dynCall_iij"].apply(null, arguments);
        });
        var dynCall_iiji = (Module["dynCall_iiji"] = function () {
            return Module["asm"]["dynCall_iiji"].apply(null, arguments);
        });
        var dynCall_iijii = (Module["dynCall_iijii"] = function () {
            return Module["asm"]["dynCall_iijii"].apply(null, arguments);
        });
        var dynCall_iijj = (Module["dynCall_iijj"] = function () {
            return Module["asm"]["dynCall_iijj"].apply(null, arguments);
        });
        var dynCall_iijjj = (Module["dynCall_iijjj"] = function () {
            return Module["asm"]["dynCall_iijjj"].apply(null, arguments);
        });
        var dynCall_iji = (Module["dynCall_iji"] = function () {
            return Module["asm"]["dynCall_iji"].apply(null, arguments);
        });
        var dynCall_ji = (Module["dynCall_ji"] = function () {
            return Module["asm"]["dynCall_ji"].apply(null, arguments);
        });
        var dynCall_jii = (Module["dynCall_jii"] = function () {
            return Module["asm"]["dynCall_jii"].apply(null, arguments);
        });
        var dynCall_jij = (Module["dynCall_jij"] = function () {
            return Module["asm"]["dynCall_jij"].apply(null, arguments);
        });
        var dynCall_jiji = (Module["dynCall_jiji"] = function () {
            return Module["asm"]["dynCall_jiji"].apply(null, arguments);
        });
        var dynCall_jji = (Module["dynCall_jji"] = function () {
            return Module["asm"]["dynCall_jji"].apply(null, arguments);
        });
        var dynCall_v = (Module["dynCall_v"] = function () {
            return Module["asm"]["dynCall_v"].apply(null, arguments);
        });
        var dynCall_vi = (Module["dynCall_vi"] = function () {
            return Module["asm"]["dynCall_vi"].apply(null, arguments);
        });
        var dynCall_vif = (Module["dynCall_vif"] = function () {
            return Module["asm"]["dynCall_vif"].apply(null, arguments);
        });
        var dynCall_vii = (Module["dynCall_vii"] = function () {
            return Module["asm"]["dynCall_vii"].apply(null, arguments);
        });
        var dynCall_viid = (Module["dynCall_viid"] = function () {
            return Module["asm"]["dynCall_viid"].apply(null, arguments);
        });
        var dynCall_viidddd = (Module["dynCall_viidddd"] = function () {
            return Module["asm"]["dynCall_viidddd"].apply(null, arguments);
        });
        var dynCall_viiffii = (Module["dynCall_viiffii"] = function () {
            return Module["asm"]["dynCall_viiffii"].apply(null, arguments);
        });
        var dynCall_viii = (Module["dynCall_viii"] = function () {
            return Module["asm"]["dynCall_viii"].apply(null, arguments);
        });
        var dynCall_viiii = (Module["dynCall_viiii"] = function () {
            return Module["asm"]["dynCall_viiii"].apply(null, arguments);
        });
        var dynCall_viiiii = (Module["dynCall_viiiii"] = function () {
            return Module["asm"]["dynCall_viiiii"].apply(null, arguments);
        });
        var dynCall_viiiiii = (Module["dynCall_viiiiii"] = function () {
            return Module["asm"]["dynCall_viiiiii"].apply(null, arguments);
        });
        var dynCall_viiiiiii = (Module["dynCall_viiiiiii"] = function () {
            return Module["asm"]["dynCall_viiiiiii"].apply(null, arguments);
        });
        var dynCall_viiiiiiii = (Module["dynCall_viiiiiiii"] = function () {
            return Module["asm"]["dynCall_viiiiiiii"].apply(null, arguments);
        });
        var dynCall_viiiiiiiii = (Module["dynCall_viiiiiiiii"] = function () {
            return Module["asm"]["dynCall_viiiiiiiii"].apply(null, arguments);
        });
        var dynCall_viiiiiiiiii = (Module["dynCall_viiiiiiiiii"] = function () {
            return Module["asm"]["dynCall_viiiiiiiiii"].apply(null, arguments);
        });
        var dynCall_viiiiiiiiiiiii = (Module["dynCall_viiiiiiiiiiiii"] =
            function () {
                return Module["asm"]["dynCall_viiiiiiiiiiiii"].apply(
                    null,
                    arguments
                );
            });
        var dynCall_viijii = (Module["dynCall_viijii"] = function () {
            return Module["asm"]["dynCall_viijii"].apply(null, arguments);
        });
        var dynCall_viji = (Module["dynCall_viji"] = function () {
            return Module["asm"]["dynCall_viji"].apply(null, arguments);
        });
        Module["__ZZNK8CFX_Font17LoadGlyphPathImplEjjE9ft_matrix"] = 1797840;
        Module[
            "__ZZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwPKvE5__fmt"
        ] = 1958823;
        Module[
            "__ZZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwmE5__fmt"
        ] = 1958834;
        Module["asm"] = asm;
        var calledRun;
        Module["then"] = function (func) {
            if (calledRun) {
                func(Module);
            } else {
                var old = Module["onRuntimeInitialized"];
                Module["onRuntimeInitialized"] = function () {
                    if (old) old();
                    func(Module);
                };
            }
            return Module;
        };
        function ExitStatus(status) {
            this.name = "ExitStatus";
            this.message = "Program terminated with exit(" + status + ")";
            this.status = status;
        }
        dependenciesFulfilled = function runCaller() {
            if (!calledRun) run();
            if (!calledRun) dependenciesFulfilled = runCaller;
        };
        function run(args) {
            args = args || arguments_;
            if (runDependencies > 0) {
                return;
            }
            preRun();
            if (runDependencies > 0) return;
            function doRun() {
                if (calledRun) return;
                calledRun = true;
                Module["calledRun"] = true;
                if (ABORT) return;
                initRuntime();
                preMain();
                if (Module["onRuntimeInitialized"])
                    Module["onRuntimeInitialized"]();
                postRun();
            }
            if (Module["setStatus"]) {
                Module["setStatus"]("Running...");
                setTimeout(function () {
                    setTimeout(function () {
                        Module["setStatus"]("");
                    }, 1);
                    doRun();
                }, 1);
            } else {
                doRun();
            }
        }
        Module["run"] = run;
        function exit(status, implicit) {
            if (implicit && noExitRuntime && status === 0) {
                return;
            }
            if (noExitRuntime) {
            } else {
                ABORT = true;
                EXITSTATUS = status;
                exitRuntime();
                if (Module["onExit"]) Module["onExit"](status);
            }
            quit_(status, new ExitStatus(status));
        }
        if (Module["preInit"]) {
            if (typeof Module["preInit"] == "function")
                Module["preInit"] = [Module["preInit"]];
            while (Module["preInit"].length > 0) {
                Module["preInit"].pop()();
            }
        }
        noExitRuntime = true;
        run();

        return ImageIOModule;
    };
})();
if (typeof exports === "object" && typeof module === "object")
    module.exports = ImageIOModule;
else if (typeof define === "function" && define["amd"])
    define([], function () {
        return ImageIOModule;
    });
else if (typeof exports === "object") exports["ImageIOModule"] = ImageIOModule;

!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = t())
        : "function" == typeof define && define.amd
        ? define(t)
        : (((e =
              "undefined" != typeof globalThis
                  ? globalThis
                  : e || self).Dynamsoft = e.Dynamsoft || {}),
          (e.Dynamsoft.PDF = t()));
})(this, function () {
    "use strict";
    function e(e, t, a, s) {
        return new (a || (a = Promise))(function (r, n) {
            function i(e) {
                try {
                    l(s.next(e));
                } catch (e) {
                    n(e);
                }
            }
            function o(e) {
                try {
                    l(s.throw(e));
                } catch (e) {
                    n(e);
                }
            }
            function l(e) {
                var t;
                e.done
                    ? r(e.value)
                    : ((t = e.value),
                      t instanceof a
                          ? t
                          : new a(function (e) {
                                e(t);
                            })).then(i, o);
            }
            l((s = s.apply(e, t || [])).next());
        });
    }
    function t(e, t, a, s) {
        if ("a" === a && !s)
            throw new TypeError(
                "Private accessor was defined without a getter"
            );
        if ("function" == typeof t ? e !== t || !s : !t.has(e))
            throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
            );
        return "m" === a ? s : "a" === a ? s.call(e) : s ? s.value : t.get(e);
    }
    function a(e, t, a, s, r) {
        if ("m" === s) throw new TypeError("Private method is not writable");
        if ("a" === s && !r)
            throw new TypeError(
                "Private accessor was defined without a setter"
            );
        if ("function" == typeof t ? e !== t || !r : !t.has(e))
            throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
            );
        return "a" === s ? r.call(e, a) : r ? (r.value = a) : t.set(e, a), a;
    }
    var s,
        r,
        n,
        i,
        o,
        l,
        m,
        c,
        u,
        f,
        d,
        p,
        g,
        y,
        h,
        w,
        b,
        P,
        M,
        A,
        D,
        T,
        I,
        k,
        S,
        R,
        E,
        v,
        _,
        j;
    !(function (e) {
        (e.logInfo = "logInfo"),
            (e.logDebug = "logDebug"),
            (e.logAll = "logAll"),
            (e.imgIO = "imgIO"),
            (e.core = "imgCore"),
            (e.imgProc = "imgProc"),
            (e.pdfR = "pdfReader"),
            (e.pdfW = "pdfWriter"),
            (e.crypto = "crypto"),
            (e.binaryBlobType = "application/octet-stream"),
            (e.wasmExtension = ".wasm");
    })(s || (s = {})),
        (function (e) {
            (e.pending = "pending"),
                (e.ready = "ready"),
                (e.failed = "failed"),
                (e.destroyed = "destroyed"),
                (e.init = "init");
        })(r || (r = {})),
        (function (e) {
            (e.PARAMETER_TYPE_ERROR = "Parameter Type not Supported = "),
                (e.TIMEOUT = "Timeout no Response = "),
                (e.FILE_STREAM_ERROR = "File Stream Error = "),
                (e.WASM_EXCEPTION_ERROR = "An WASM exception occurred.");
        })(n || (n = {})),
        (function (e) {
            (e[(e.LONG_KEY = 0)] = "LONG_KEY"),
                (e[(e.DLS_KEY = 1)] = "DLS_KEY");
        })(i || (i = {})),
        (function (e) {
            (e[(e.wasmBase = -4e3)] = "wasmBase"),
                (e[(e.wasmException = -4001)] = "wasmException"),
                (e[(e.wasmNoModule = -4002)] = "wasmNoModule"),
                (e[(e.wasmJsBase = -4100)] = "wasmJsBase"),
                (e[(e.wasmJsObjectNotInit = -4101)] = "wasmJsObjectNotInit"),
                (e[(e.wasmJsObjectTerminated = -4102)] =
                    "wasmJsObjectTerminated"),
                (e[(e.wasmJsObjectInitFailed = -4103)] =
                    "wasmJsObjectInitFailed"),
                (e[(e.wasmJsNotLoaded = -4104)] = "wasmJsNotLoaded"),
                (e[(e.wasmJsInvalidJson = -4105)] = "wasmJsInvalidJson"),
                (e[(e.wasmJsWorkerRunException = -4106)] =
                    "wasmJsWorkerRunException"),
                (e[(e.wasmJsWorkerRunFailed = -4107)] =
                    "wasmJsWorkerRunFailed"),
                (e[(e.wasmJsReadFileFailed = -4108)] = "wasmJsReadFileFailed"),
                (e[(e.wasmJsCoreTaskException = -4109)] =
                    "wasmJsCoreTaskException"),
                (e[(e.wasmJsProcTaskException = -4110)] =
                    "wasmJsProcTaskException"),
                (e[(e.wasmJsSavePdfFailed = -4111)] = "wasmJsSavePdfFailed"),
                (e[(e.wasmJsSaveTiffFailed = -4112)] = "wasmJsSaveTiffFailed");
        })(o || (o = {})),
        (function (e) {
            (e[(e.IT_DIB = -1)] = "IT_DIB"),
                (e[(e.IT_RGBA = -2)] = "IT_RGBA"),
                (e[(e.IT_BGRA = -3)] = "IT_BGRA"),
                (e[(e.IT_BMP = 0)] = "IT_BMP"),
                (e[(e.IT_JPG = 1)] = "IT_JPG"),
                (e[(e.IT_PNG = 3)] = "IT_PNG"),
                (e[(e.IT_ALL = 5)] = "IT_ALL");
        })(l || (l = {})),
        (function (e) {
            (e[(e.RT_AUTO = -1)] = "RT_AUTO"),
                (e[(e.RT_BINARY = 1)] = "RT_BINARY"),
                (e[(e.RT_BASE64 = 2)] = "RT_BASE64");
        })(m || (m = {})),
        (function (e) {
            (e[(e.SF_DEF = 0)] = "SF_DEF"),
                (e[(e.SF_ENABLE = 1)] = "SF_ENABLE"),
                (e[(e.SF_DISABLE = 2)] = "SF_DISABLE");
        })(c || (c = {}));
    class B {
        static register(e) {
            t(this, u, "f", f).push(e);
        }
        static process(e) {
            t(this, u, "f", f).forEach((t) => {
                e.data.params.moduleName !== t.Name || t.process(e);
            });
        }
    }
    (u = B), (f = { value: new Array() });
    class O {
        constructor(e) {
            (this._instances = Object.create(null)),
                d.set(this, ""),
                a(this, d, e, "f"),
                B.register(this);
        }
        get Name() {
            return t(this, d, "f");
        }
        _destroy(e) {
            let t = this._instances[e.data.params.insId];
            t &&
                (delete this._instances[e.data.params.insId],
                t.wasmObject.delete(),
                e.context.logDebug(
                    e.data,
                    "Delete Instance " + e.data.params.insId
                ));
        }
        process(e) {}
    }
    d = new WeakMap();
    class C extends O {
        constructor() {
            super(s.pdfR), p.set(this, Object.create(null));
        }
        process(e) {
            let a = e.data,
                s = { errorCode: 0, errorMessage: "Successful." },
                r = this._instances[a.params.insId],
                n = null == r ? void 0 : r.wasmObject,
                i = e.entryModule,
                c = t(this, p, "f");
            switch (a.func) {
                case "init":
                    void 0 === this._instances[a.params.insId] &&
                        ((this._instances[a.params.insId] = {
                            wasmObject: new i.DynamicPdfR(
                                a.params.key,
                                a.params.licMode,
                                a.params.uuid
                            ),
                        }),
                        e.context.logDebug(
                            a,
                            "Create PdfReader Instance " + a.params.insId
                        ));
                    break;
                case "destroy":
                    r.wasmMemoryPtr &&
                        ((e.wasmMemoryPtr = r.wasmMemoryPtr),
                        (r.wasmMemoryPtr = null)),
                        this._destroy(e);
                    break;
                case "terminate":
                    return (
                        this._destroy(e),
                        e.context.logDebug(a, "Terminate worker"),
                        void self.close()
                    );
                case "LoadPdf":
                    e.wasmMemoryPtr &&
                        ((r.wasmMemoryPtr = e.wasmMemoryPtr),
                        (e.wasmMemoryPtr = null)),
                        (s = n.LoadPdf.apply(n, a.params.input));
                    break;
                case "ReadPdfPage":
                    !(function () {
                        let e,
                            t = n.ReadPdfPage.apply(n, a.params.input),
                            r = JSON.parse(t),
                            i = [];
                        if (
                            0 === r.errorCode &&
                            "Successful." === r.errorMessage
                        )
                            if (
                                (r.imageInfos[0].imageType === l.IT_BMP
                                    ? (e = "bmp")
                                    : r.imageInfos[0].imageType === l.IT_JPG
                                    ? (e = "jpeg")
                                    : r.imageInfos[0].imageType === l.IT_PNG
                                    ? (e = "png")
                                    : r.imageInfos[0].imageType === l.IT_RGBA &&
                                      (e = "rgba"),
                                (r.imageData = []),
                                (r.MD5 = []),
                                a.params.returnType === m.RT_BASE64)
                            )
                                for (let e = 0; e < r.imageCount; e++)
                                    (i[e] = n.GetCurrentDataBase64(e)),
                                        (r.imageData[e] = i[e]),
                                        (r.MD5[e] = n.GetCurrentDataMD5(e));
                            else {
                                for (let e = 0; e < r.imageCount; e++)
                                    i[e] = n.GetCurrentData(e);
                                "rgba" != e && (r.blobType = "image/" + e);
                                for (let e = 0; e < r.imageCount; e++)
                                    r.imageData[e] = new Uint8ClampedArray(
                                        i[e]
                                    );
                            }
                        a.params.returnType != m.RT_BASE64 &&
                            1 === r.imageCount &&
                            (r.imageData = r.imageData[0]),
                            (s = r);
                        for (let e = 0; e < r.imageCount; e++)
                            n.FreeReservedData(e);
                    })();
                    break;
                case "GetCurrentData":
                    s = n.GetCurrentData();
                    break;
                case "ReadPdfAnnot":
                    s = n.ReadPdfAnnot.apply(n, a.params.input);
                    break;
                case "UnloadPdf":
                    r.wasmMemoryPtr &&
                        ((e.wasmMemoryPtr = r.wasmMemoryPtr),
                        delete r.wasmMemoryPtr),
                        n.UnloadPdf();
                    break;
                case "GetWasmVersion":
                    s = n.GetWasmVersion();
                    break;
                case "SetRenderLimitImageSize":
                    s = n.SetRenderLimitImageSize.apply(n, a.params.input);
                    break;
                case "FindText":
                    s = n.FindText.apply(n, a.params.input);
                    break;
                case "AddSystemFont":
                    !(function () {
                        let e = a.params.input[0];
                        if (void 0 === c[e]) {
                            let t;
                            (t =
                                ".ttf" === e.slice(-4)
                                    ? "usr/share/fonts/truetype"
                                    : ".otf" === e.slice(-4)
                                    ? "usr/share/fonts/opentype"
                                    : "usr/share/fonts"),
                                i.FS.createPath("", t, !0, !0),
                                i.FS.writeFile(
                                    t + "/" + e,
                                    new Uint8Array(a.params.input[1]),
                                    { flags: "w+" }
                                ),
                                (c[e] = !0);
                        }
                    })();
                    break;
                case "PageAddImage":
                    s = n.PageAddImage.apply(n, a.params.input);
                    break;
                case "PageAddText":
                    s = n.PageAddText.apply(n, a.params.input);
                    break;
                case "PageAddPath":
                    s = n.PageAddPath.apply(n, a.params.input);
                    break;
                case "PageAddAnnot":
                    s = n.PageAddAnnot.apply(n, a.params.input);
                    break;
                case "PageDeleteAnnot":
                    s = n.PageDeleteAnnot.apply(n, a.params.input);
                    break;
                case "DeletePdfPage":
                    s = n.DeletePdfPage.apply(n, a.params.input);
                    break;
                case "ChangePagesOrder":
                    s = n.ChangePagesOrder.apply(n, a.params.input);
                    break;
                case "PageRotateLeft":
                    s = n.PageRotateLeft.apply(n, a.params.input);
                    break;
                case "PageRotateRight":
                    s = n.PageRotateRight.apply(n, a.params.input);
                    break;
                case "InsertBlankPdfPage":
                    s = n.InsertBlankPdfPage.apply(n, a.params.input);
                    break;
                case "MergePdfPage":
                    !(function () {
                        let e = a.params.input[0],
                            t = a.params.input[1];
                        (a.params.input[0] = a.params.input[2]),
                            (a.params.input[1] = e),
                            (a.params.input[2] = t),
                            (s = n.MergePdfPage.apply(n, a.params.input));
                    })();
                    break;
                case "PageSetCropBox":
                    s = n.PageSetCropBox.apply(n, a.params.input);
                    break;
                case "GetModifiedPdf":
                    !(function () {
                        let e = n.GetModifiedPdf(),
                            t = {};
                        e
                            ? ((t.blobType = "application/pdf"),
                              (t.pdfData = new Uint8ClampedArray(e)))
                            : (t = {
                                  errorCode: o.wasmJsSavePdfFailed,
                                  errorMessage: "no pdf content return",
                              }),
                            (s = t);
                    })();
                    break;
                case "GetPdfPageInfo":
                    s = n.GetPdfPageInfo.apply(n, a.params.input);
            }
            e.context.logDebug(a, a.func + " end, send back begin");
            let u,
                f = {
                    id: a.id,
                    func: a.func,
                    result: s,
                    memSize: i.HEAPU8.length,
                };
            if (a.params.srcBuffer) {
                "string" == typeof f.result &&
                    (f.result = JSON.parse(f.result)),
                    (f.result.srcBuffer = a.params.srcBuffer);
                let e = Object.prototype.toString.call(f.result.srcBuffer);
                ("[object ArrayBuffer]" !== e &&
                    "[object Uint8ClampedArray]" !== e) ||
                    (u = [
                        null != f.result.srcBuffer.buffer
                            ? f.result.srcBuffer.buffer
                            : f.result.srcBuffer,
                    ]);
            }
            if (null != s.imageData)
                if (((u = []), 1 === s.imageCount)) {
                    let e = Object.prototype.toString.call(s.imageData);
                    ("[object ArrayBuffer]" !== e &&
                        "[object Uint8ClampedArray]" !== e &&
                        "[object Uint8Array]" != e) ||
                        (u = [
                            null != f.result.imageData.buffer
                                ? f.result.imageData.buffer
                                : f.result.imageData,
                        ]);
                } else
                    for (let e = 0; e < s.imageCount; e++) {
                        let t = Object.prototype.toString.call(s.imageData[e]);
                        ("[object ArrayBuffer]" !== t &&
                            "[object Uint8ClampedArray]" !== t &&
                            "[object Uint8Array]" != t) ||
                            (u[e] =
                                null != f.result.imageData[e].buffer
                                    ? f.result.imageData[e].buffer
                                    : f.result.imageData[e]);
                    }
            let d = self;
            null != u ? d.postMessage(f, u) : d.postMessage(f),
                e.context.logDebug(a, a.func + " end, send back end");
        }
    }
    (p = new WeakMap()), new C();
    class J {
        static fetchRetry(e, t, a, s) {
            let r = t.retries,
                n = t.retryDelay;
            return new Promise(function (i, o) {
                const l = function (m) {
                    return fetch(e, t)
                        .then(function (e) {
                            i(e);
                        })
                        .catch(function (e) {
                            m < r
                                ? (function (e, t, r) {
                                      a && a(t, s);
                                      setTimeout(function () {
                                          l(++e);
                                      }, n);
                                  })(m, e)
                                : o(e);
                        });
                };
                return l(0);
            });
        }
    }
    class W {
        static buildWasmFileName(e, t, a, s) {
            return e + (s ? "sn-" : "") + t + a;
        }
        static base64DecToArr(e, a) {
            let s = e.replace(/[^A-Za-z0-9\+\/]/g, ""),
                r = s.length,
                n = a
                    ? Math.ceil(((3 * r + 1) >>> 2) / a) * a
                    : (3 * r + 1) >>> 2,
                i = new Uint8Array(n);
            for (let e, a, o = 0, l = 0, m = 0; m < r; m++)
                if (
                    ((a = 3 & m),
                    (o |=
                        t(this, g, "m", y).call(this, s.charCodeAt(m)) <<
                        (18 - 6 * a)),
                    3 === a || r - m == 1)
                ) {
                    for (e = 0; e < 3 && l < n; e++, l++)
                        i[l] = (o >>> ((16 >>> e) & 24)) & 255;
                    o = 0;
                }
            return i;
        }
        static isWasmSupport() {
            try {
                if (
                    "object" == typeof WebAssembly &&
                    "function" == typeof WebAssembly.instantiate
                ) {
                    let e = new WebAssembly.Module(
                        Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0)
                    );
                    if (e instanceof WebAssembly.Module)
                        return (
                            new WebAssembly.Instance(e) instanceof
                            WebAssembly.Instance
                        );
                }
            } catch (e) {}
            return !1;
        }
        static random() {
            return (
                (Date.now() % 10086).toString(36).slice(2) +
                Math.random().toString(36).slice(2)
            );
        }
    }
    (g = W),
        (y = function (e) {
            return e > 64 && e < 91
                ? e - 65
                : e > 96 && e < 123
                ? e - 71
                : e > 47 && e < 58
                ? e + 4
                : 43 === e
                ? 62
                : 47 === e
                ? 63
                : 0;
        });
    var x = {};
    (w = new WeakMap()),
        (b = new WeakMap()),
        (P = new WeakMap()),
        (M = new WeakMap()),
        (A = new WeakMap()),
        (D = new WeakMap()),
        (T = new WeakMap()),
        (I = new WeakMap()),
        (h = new WeakSet()),
        (k = function () {
            a(this, w, null, "f");
        }),
        (S = function (e, a) {
            t(this, D, "f").postMessage({ id: e.id, func: "status", log: a }),
                e.params &&
                    "function" == typeof e.params.callback &&
                    e.params.callback(a);
        }),
        (R = function (e, a) {
            t(this, D, "f").postMessage({ id: e.id, func: "log", log: a }),
                e.params &&
                    "function" == typeof e.params.callback &&
                    e.params.callback(a);
        }),
        (E = function (e) {
            let t = {
                name: "",
                promise: void 0,
                resolve: void 0,
                reject: void 0,
                wasmModule: null,
            };
            return (
                (t.name = e),
                (t.promise = new Promise(function (e, a) {
                    (t.resolve = e), (t.reject = a);
                })),
                (t.wasmModule = null),
                t
            );
        }),
        (v = function (r, n) {
            var i;
            let o = this,
                l = Date.now();
            a(
                this,
                M,
                W.buildWasmFileName(r.prefixName, r.ver, s.wasmExtension, !1),
                "f"
            ),
                t(this, h, "m", S).call(
                    this,
                    n,
                    "loading " + t(this, M, "f") + "..."
                );
            let m = t(this, h, "m", E).call(this, r.name);
            m.wasmModule = r.wasmModule;
            let c = {
                print: function (e) {
                    (e += ""), t(o, h, "m", R).call(o, n, e);
                },
                printErr: function (e) {
                    (e += ""), m.reject({ name: m.name, error: e });
                },
                INITIAL_MEMORY:
                    1024 *
                    (null !== (i = n.params.initMemory) && void 0 !== i
                        ? i
                        : 32) *
                    1024,
                instantiateWasm: function (a, s) {
                    if (m.wasmModule)
                        return WebAssembly.instantiate(m.wasmModule, a)
                            .then(
                                function (e) {
                                    t(o, h, "m", R).call(
                                        o,
                                        n,
                                        "instantiate with wasm module"
                                    ),
                                        s(e, m.wasmModule);
                                },
                                function (e) {
                                    (e += ""),
                                        t(o, h, "m", R).call(
                                            o,
                                            n,
                                            "wasm instantiate 2 failed: " + e
                                        ),
                                        m.reject({ name: m.name, error: e });
                                }
                            )
                            .catch(function (e) {
                                t(o, h, "m", R).call(o, n, JSON.stringify(e));
                                let a = e.message + "";
                                m.reject({ name: m.name, error: a });
                            });
                    {
                        const r = t(o, P, "f").retries,
                            i = t(o, P, "f").retryDelay;
                        let l = function (i) {
                            return e(this, void 0, void 0, function* () {
                                try {
                                    const e = J.fetchRetry(
                                            t(o, b, "f") + t(o, M, "f"),
                                            t(o, P, "f"),
                                            function (e, a) {
                                                return (
                                                    t(o, h, "m", R).call(
                                                        o,
                                                        n,
                                                        e
                                                    ),
                                                    !0
                                                );
                                            },
                                            n
                                        ),
                                        l = yield e;
                                    if (l.ok) {
                                        const e = yield l.arrayBuffer(),
                                            t = yield WebAssembly.instantiate(
                                                e,
                                                a
                                            );
                                        return (
                                            (m.wasmModule = t.module),
                                            s(t.instance, t.module),
                                            t
                                        );
                                    }
                                    if (i < r) c(i);
                                    else {
                                        let e =
                                            "failed to load wasm binary file, please check.";
                                        m.reject({ name: m.name, error: e });
                                    }
                                } catch (e) {
                                    if (
                                        (t(o, h, "m", R).call(
                                            o,
                                            n,
                                            "wasm instantiate 1 failed: "
                                        ),
                                        t(o, h, "m", R).call(
                                            o,
                                            n,
                                            JSON.stringify(e)
                                        ),
                                        t(o, h, "m", R).call(
                                            o,
                                            n,
                                            "attempt " + i + ", retries: " + r
                                        ),
                                        i < r)
                                    )
                                        c(i);
                                    else {
                                        let t = e.message + "";
                                        m.reject({ name: m.name, error: t });
                                    }
                                }
                            });
                        };
                        function c(e) {
                            setTimeout(function () {
                                l(++e);
                            }, i);
                        }
                        l(0);
                    }
                    return {};
                },
                onRuntimeInitialized: function () {
                    return e(this, void 0, void 0, function* () {
                        t(o, h, "m", S).call(
                            o,
                            n,
                            r.name +
                                " wasm initialized, cost " +
                                (Date.now() - l) +
                                " ms"
                        ),
                            m.resolve();
                    });
                },
            };
            return (
                t(this, A, "f")
                    .call(this, c)
                    .then((e) => {
                        a(this, w, e, "f"), (t(this, T, "f")[r.name] = !0);
                    }),
                m
            );
        }),
        (_ = function (a, r) {
            var n;
            let i = this,
                o = t(this, h, "m", E).call(this, a.name),
                l =
                    t(this, b, "f") +
                    W.buildWasmFileName(
                        a.prefixName,
                        a.ver,
                        s.wasmExtension,
                        null !== (n = a.useSimd) && void 0 !== n && n
                    ),
                m = Date.now();
            t(this, h, "m", S).call(this, r, "loading " + l + "...");
            let c = {
                loadAsync: !0,
                global: !0,
                nodelete: !0,
                wasmModule: a.wasmModule,
                log: function (e) {
                    t(i, h, "m", R).call(i, r, e);
                },
                fetchOptions: t(this, P, "f"),
                fetchRetry: function (e, a) {
                    return J.fetchRetry(
                        e,
                        a,
                        function (e, a) {
                            return t(i, h, "m", R).call(i, r, e), !0;
                        },
                        r
                    );
                },
            };
            const u = t(this, P, "f").retries,
                f = t(this, P, "f").retryDelay;
            let d = function (s) {
                return e(this, void 0, void 0, function* () {
                    t(i, w, "f")
                        .loadDynamicLibrary(l, c)
                        .then(
                            function (e) {
                                t(i, h, "m", S).call(
                                    i,
                                    r,
                                    l +
                                        " initialized, cost " +
                                        (Date.now() - m) +
                                        " ms"
                                ),
                                    null === c.wasmModule
                                        ? (null !=
                                          t(i, w, "f").LDSO.loadedLibsByName
                                              ? delete t(i, w, "f").LDSO
                                                    .loadedLibsByName[l]
                                              : null !=
                                                    t(i, w, "f").LDSO
                                                        .loadedLibNames &&
                                                delete t(i, w, "f").LDSO
                                                    .loadedLibNames[l],
                                          t(i, h, "m", R).call(
                                              i,
                                              r,
                                              "wasm is null, attempt " +
                                                  s +
                                                  ", retries: " +
                                                  u
                                          ),
                                          s < u
                                              ? p(s)
                                              : o.reject({
                                                    name: o.name,
                                                    error:
                                                        "string" == typeof e
                                                            ? e
                                                            : e.toString(),
                                                }))
                                        : ((o.wasmModule = c.wasmModule),
                                          (c = null),
                                          (t(i, T, "f")[a.name] = !0),
                                          o.resolve());
                            },
                            function (e) {
                                (e += ""),
                                    t(i, h, "m", S).call(i, r, l + " failed"),
                                    t(i, h, "m", S).call(i, r, e),
                                    t(i, h, "m", R).call(
                                        i,
                                        r,
                                        "attempt " + s + ", retries: " + u
                                    ),
                                    s < u
                                        ? p(s)
                                        : o.reject({
                                              name: o.name,
                                              error:
                                                  "string" == typeof e
                                                      ? e
                                                      : e.toString(),
                                          });
                            }
                        );
                });
            };
            function p(e) {
                setTimeout(function () {
                    d(++e);
                }, f);
            }
            return d(0), o;
        }),
        (j = function (e) {
            try {
                t(this, D, "f").postMessage(e);
            } catch (a) {
                for (const t of e.result.modules) t.wasmModule = null;
                t(this, D, "f").postMessage(e);
            }
        });
    var N = new (class {
        constructor(e) {
            h.add(this),
                w.set(this, null),
                b.set(this, ""),
                P.set(this, { mode: "cors", credentials: "same-origin" }),
                M.set(this, ""),
                A.set(this, null),
                D.set(this, self),
                T.set(this, []),
                I.set(this, void 0),
                t(this, h, "m", k).call(this),
                a(this, A, e, "f");
        }
        logDebug(e, a) {
            if (e && e.params) {
                let r = "";
                e.params.logLevel === s.logDebug &&
                    ((r = "[wm][" + Date.now() / 1e3 + "] " + a),
                    t(this, h, "m", R).call(this, e, r));
            }
        }
        get Module() {
            return t(this, w, "f");
        }
        loadWasm(s) {
            return e(this, void 0, void 0, function* () {
                null != s.params.resourceDir &&
                    a(this, b, s.params.resourceDir, "f"),
                    null != s.params.fetchOptions &&
                        a(this, P, s.params.fetchOptions, "f");
                let e = Object.create(null);
                e.promise = new Promise(function (t, a) {
                    (e.resolve = t), (e.reject = a);
                });
                try {
                    let e = { modules: [] };
                    if (s.params.module) {
                        let a = s.params.module.modulesInfo;
                        for (const r of a)
                            if (
                                !t(this, T, "f")[r.name] &&
                                (null === r.dependencyModules ||
                                    0 === r.dependencyModules.length)
                            ) {
                                let a = t(this, h, "m", v).call(this, r, s);
                                yield a.promise,
                                    e.modules.push({
                                        name: r.name,
                                        wasmModule: a.wasmModule,
                                    });
                            }
                        for (const r of a)
                            if (
                                !t(this, T, "f")[r.name] &&
                                r.dependencyModules &&
                                0 != r.dependencyModules.length
                            ) {
                                let a = t(this, h, "m", _).call(this, r, s);
                                yield a.promise,
                                    e.modules.push({
                                        name: r.name,
                                        wasmModule: a.wasmModule,
                                    });
                            }
                        t(this, h, "m", j).call(this, {
                            id: s.id,
                            func: s.func,
                            result: e,
                            memSize: t(this, w, "f").HEAPU8.length,
                        });
                    }
                } catch (a) {
                    let r = {
                        errorCode: o.wasmException,
                        errorMessage: JSON.stringify(a),
                        stack: JSON.stringify(a.stack),
                    };
                    if ("object" == typeof a && s.params.module) {
                        let e = s.params.module.modulesInfo;
                        (r.modules = []),
                            void 0 !== a.error
                                ? (r.errorMessage = a.error)
                                : (r.errorMessage =
                                      void 0 !== a.message
                                          ? a.message
                                          : "unknown error"),
                            delete r.stack,
                            r.modules.push({ name: a.name, wasmModule: null });
                        for (const t of e)
                            r.modules.push({ name: t.name, wasmModule: null });
                    }
                    t(this, D, "f").postMessage({
                        id: s.id,
                        func: s.func,
                        result: r,
                    }),
                        e.reject(r);
                }
                return e.promise;
            });
        }
        handleMessage(e) {
            if ("string" == typeof e) return;
            if (null == e.func) return;
            let s = null;
            e.params &&
                ((s = e.params.val), this.logDebug(e, "received " + e.func)),
                null != s && (x = s),
                a(this, I, x, "f");
            let r = e;
            if (
                "object" == typeof r &&
                "object" == typeof r.result &&
                r.result.errorCode === o.wasmException
            )
                return;
            let n = this.Module,
                i = this,
                l = {
                    data: e,
                    entryModule: n,
                    context: this,
                    wasmMemoryPtr: null,
                };
            try {
                let a = null;
                if ("loadWasm" === e.func)
                    return void this.loadWasm(e).catch(function (a) {
                        let s =
                            (void 0 !== a.message ? a.message : "") +
                            "" +
                            (void 0 !== a.errorMessage ? a.errorMessage : "");
                        t(i, D, "f").postMessage({
                            id: e.id,
                            func: e.func,
                            result: {
                                errorCode: o.wasmException,
                                errorMessage: s,
                                stack: a.stack,
                            },
                        });
                    });
                if ((e.func, n)) {
                    this.logDebug(e, "try to init buffer start");
                    let t = Object.prototype.toString.call(e.params.input);
                    if (
                        "[object Array]" ===
                        Object.prototype.toString.call(e.params.input)
                    ) {
                        if (
                            ((t = Object.prototype.toString.call(
                                e.params.input[0]
                            )),
                            "[object ArrayBuffer]" === t ||
                                "[object Uint8ClampedArray]" === t ||
                                "[object Uint8Array]" == t)
                        ) {
                            let s = e.params.input[0].byteLength;
                            (a = n._malloc(s)),
                                "[object ArrayBuffer]" === t
                                    ? n.HEAPU8.set(
                                          new Uint8Array(e.params.input[0]),
                                          a
                                      )
                                    : n.HEAPU8.set(
                                          new Uint8Array(
                                              e.params.input[0].buffer
                                          ),
                                          a
                                      ),
                                (e.params.srcBuffer = e.params.input[0]),
                                (e.params.input[0] = a),
                                e.params.input.splice(1, 0, s);
                        }
                    } else if (
                        "[object ArrayBuffer]" === t ||
                        "[object Uint8ClampedArray]" === t ||
                        "[object Uint8Array]" == t
                    ) {
                        let s = e.params.input.byteLength;
                        (a = n._malloc(s)),
                            "[object ArrayBuffer]" === t
                                ? n.HEAPU8.set(
                                      new Uint8Array(e.params.input),
                                      a
                                  )
                                : n.HEAPU8.set(
                                      new Uint8Array(e.params.input.buffer),
                                      a
                                  ),
                            (e.params.srcBuffer = e.params.input),
                            (e.params.input = [a, s]);
                    }
                    this.logDebug(e, "try to init buffer end");
                }
                this.logDebug(e, e.func + " start"),
                    (l.wasmMemoryPtr = a),
                    B.process(l),
                    l.wasmMemoryPtr && n && n._free(l.wasmMemoryPtr);
            } catch (a) {
                l.wasmMemoryPtr && n && n._free(l.wasmMemoryPtr),
                    "object" != typeof a && (a = { message: a, stack: "" }),
                    t(i, D, "f").postMessage({
                        id: e.id,
                        func: e.func,
                        result: {
                            errorCode: o.wasmException,
                            errorMessage: a.message,
                            stack: a.stack,
                        },
                        memSize: n.HEAPU8.length,
                    });
            }
        }
    })(ImageIOModule);
    (onmessage = function (e) {
        N.handleMessage(e.data);
    }),
        self.postMessage("ready");
    class F {}
    return (F.PdfReaderGlue = C), F;
});
