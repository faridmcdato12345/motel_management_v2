/*!
 * Dynamsoft JavaScript Library
 * @product Dynamsoft Image IO WASM Worker JS
 * @website http://www.dynamsoft.com
 * @copyright Copyright 2022, Dynamsoft Corporation
 * @author Dynamsoft
 * @version 1.8.0 (2022-11-09T09:07:50.211Z)
 * @fileoverview Dynamsoft JavaScript Library for Image IO WASM Worker
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
        var readyPromiseResolve, readyPromiseReject;
        Module["ready"] = new Promise(function (resolve, reject) {
            readyPromiseResolve = resolve;
            readyPromiseReject = reject;
        });
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
        var ENVIRONMENT_IS_WEB = typeof window === "object";
        var ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
        var ENVIRONMENT_IS_NODE =
            typeof process === "object" &&
            typeof process.versions === "object" &&
            typeof process.versions.node === "string";
        var scriptDirectory = "";
        function locateFile(path) {
            if (Module["locateFile"]) {
                return Module["locateFile"](path, scriptDirectory);
            }
            return scriptDirectory + path;
        }
        var read_, readAsync, readBinary, setWindowTitle;
        function logExceptionOnExit(e) {
            if (e instanceof ExitStatus) return;
            var toLog = e;
            err("exiting due to exception: " + toLog);
        }
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
            readAsync = function readAsync(filename, onload, onerror) {
                if (!nodeFS) nodeFS = require("fs");
                if (!nodePath) nodePath = require("path");
                filename = nodePath["normalize"](filename);
                nodeFS["readFile"](filename, function (err, data) {
                    if (err) onerror(err);
                    else onload(data.buffer);
                });
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
            process["on"]("unhandledRejection", function (reason) {
                throw reason;
            });
            quit_ = function (status, toThrow) {
                if (keepRuntimeAlive()) {
                    process["exitCode"] = status;
                    throw toThrow;
                }
                logExceptionOnExit(toThrow);
                process["exit"](status);
            };
            Module["inspect"] = function () {
                return "[Emscripten Module object]";
            };
        } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
            if (ENVIRONMENT_IS_WORKER) {
                scriptDirectory = self.location.href;
            } else if (
                typeof document !== "undefined" &&
                document.currentScript
            ) {
                scriptDirectory = document.currentScript.src;
            }
            if (_scriptDir) {
                scriptDirectory = _scriptDir;
            }
            if (scriptDirectory.indexOf("blob:") !== 0) {
                scriptDirectory = scriptDirectory.substr(
                    0,
                    scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1
                );
            } else {
                scriptDirectory = "";
            }
            {
                read_ = function (url) {
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url, false);
                    xhr.send(null);
                    return xhr.responseText;
                };
                if (ENVIRONMENT_IS_WORKER) {
                    readBinary = function (url) {
                        var xhr = new XMLHttpRequest();
                        xhr.open("GET", url, false);
                        xhr.responseType = "arraybuffer";
                        xhr.send(null);
                        return new Uint8Array(xhr.response);
                    };
                }
                readAsync = function (url, onload, onerror) {
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url, true);
                    xhr.responseType = "arraybuffer";
                    xhr.onload = function () {
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
        function getEmptyTableSlot() {
            if (freeTableIndexes.length) {
                return freeTableIndexes.pop();
            }
            try {
                wasmTable.grow(1);
            } catch (err) {
                if (!(err instanceof RangeError)) {
                    throw err;
                }
                throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
            }
            return wasmTable.length - 1;
        }
        function updateTableMap(offset, count) {
            for (var i = offset; i < offset + count; i++) {
                var item = getWasmTableEntry(i);
                if (item) {
                    functionsInTableMap.set(item, i);
                }
            }
        }
        function addFunction(func, sig) {
            if (!functionsInTableMap) {
                functionsInTableMap = new WeakMap();
                updateTableMap(0, wasmTable.length);
            }
            if (functionsInTableMap.has(func)) {
                return functionsInTableMap.get(func);
            }
            var ret = getEmptyTableSlot();
            try {
                setWasmTableEntry(ret, func);
            } catch (err) {
                if (!(err instanceof TypeError)) {
                    throw err;
                }
                var wrapped = convertJsFunctionToWasm(func, sig);
                setWasmTableEntry(ret, wrapped);
            }
            functionsInTableMap.set(func, ret);
            return ret;
        }
        var tempRet0 = 0;
        var setTempRet0 = function (value) {
            tempRet0 = value;
        };
        var getTempRet0 = function () {
            return tempRet0;
        };
        var dynamicLibraries = Module["dynamicLibraries"] || [];
        var wasmBinary;
        if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
        var noExitRuntime = Module["noExitRuntime"] || true;
        if (typeof WebAssembly !== "object") {
            abort("no native wasm support detected");
        }
        var wasmMemory;
        var ABORT = false;
        var EXITSTATUS;
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
            function onDone(ret) {
                if (stack !== 0) stackRestore(stack);
                return convertReturnValue(ret);
            }
            ret = onDone(ret);
            return ret;
        }
        var ALLOC_STACK = 1;
        function allocate(slab, allocator) {
            var ret;
            if (allocator == ALLOC_STACK) {
                ret = stackAlloc(slab.length);
            } else {
                ret = _malloc(slab.length);
            }
            if (slab.subarray || slab.slice) {
                HEAPU8.set(slab, ret);
            } else {
                HEAPU8.set(new Uint8Array(slab), ret);
            }
            return ret;
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
        function UTF16ToString(ptr, maxBytesToRead) {
            var endPtr = ptr;
            var idx = endPtr >> 1;
            var maxIdx = idx + maxBytesToRead / 2;
            while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
            endPtr = idx << 1;
            if (endPtr - ptr > 32 && UTF16Decoder) {
                return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
            } else {
                var str = "";
                for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
                    var codeUnit = HEAP16[(ptr + i * 2) >> 1];
                    if (codeUnit == 0) break;
                    str += String.fromCharCode(codeUnit);
                }
                return str;
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
        function UTF32ToString(ptr, maxBytesToRead) {
            var i = 0;
            var str = "";
            while (!(i >= maxBytesToRead / 4)) {
                var utf32 = HEAP32[(ptr + i * 4) >> 2];
                if (utf32 == 0) break;
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
            return str;
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
        function allocateUTF8OnStack(str) {
            var size = lengthBytesUTF8(str) + 1;
            var ret = stackAlloc(size);
            stringToUTF8Array(str, HEAP8, ret, size);
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
        var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 33554432;
        if (Module["wasmMemory"]) {
            wasmMemory = Module["wasmMemory"];
        } else {
            wasmMemory = new WebAssembly.Memory({
                initial: INITIAL_MEMORY / 65536,
                maximum: 2147483648 / 65536,
            });
        }
        if (wasmMemory) {
            buffer = wasmMemory.buffer;
        }
        INITIAL_MEMORY = buffer.byteLength;
        updateGlobalBufferAndViews(buffer);
        var wasmTable = new WebAssembly.Table({
            initial: 4096,
            element: "anyfunc",
        });
        var __ATPRERUN__ = [];
        var __ATINIT__ = [];
        var __ATMAIN__ = [];
        var __ATPOSTRUN__ = [];
        var runtimeInitialized = false;
        var runtimeExited = false;
        var runtimeKeepaliveCounter = 0;
        function keepRuntimeAlive() {
            return noExitRuntime || runtimeKeepaliveCounter > 0;
        }
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
            FS.ignorePermissions = false;
            TTY.init();
            callRuntimeCallbacks(__ATINIT__);
        }
        function preMain() {
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
        function addOnInit(cb) {
            __ATINIT__.unshift(cb);
        }
        function addOnPostRun(cb) {
            __ATPOSTRUN__.unshift(cb);
        }
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
        Module["preloadedWasm"] = {};
        function abort(what) {
            {
                if (Module["onAbort"]) {
                    Module["onAbort"](what);
                }
            }
            what = "Aborted(" + what + ")";
            err(what);
            ABORT = true;
            EXITSTATUS = 1;
            what += ". Build with -s ASSERTIONS=1 for more info.";
            var e = new WebAssembly.RuntimeError(what);
            readyPromiseReject(e);
            throw e;
        }
        var dataURIPrefix = "data:application/octet-stream;base64,";
        function isDataURI(filename) {
            return filename.startsWith(dataURIPrefix);
        }
        function isFileURI(filename) {
            return filename.startsWith("file://");
        }
        var wasmBinaryFile;
        wasmBinaryFile = "dynamsoft.imageio.wasm";
        if (!isDataURI(wasmBinaryFile)) {
            wasmBinaryFile = locateFile(wasmBinaryFile);
        }
        function getBinary(file) {
            try {
                if (file == wasmBinaryFile && wasmBinary) {
                    return new Uint8Array(wasmBinary);
                }
                if (readBinary) {
                    return readBinary(file);
                } else {
                    throw "both async and sync fetching of the wasm failed";
                }
            } catch (err) {
                abort(err);
            }
        }
        function getBinaryPromise() {
            if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
                if (typeof fetch === "function" && !isFileURI(wasmBinaryFile)) {
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
                            return getBinary(wasmBinaryFile);
                        });
                } else {
                    if (readAsync) {
                        return new Promise(function (resolve, reject) {
                            readAsync(
                                wasmBinaryFile,
                                function (response) {
                                    resolve(new Uint8Array(response));
                                },
                                reject
                            );
                        });
                    }
                }
            }
            return Promise.resolve().then(function () {
                return getBinary(wasmBinaryFile);
            });
        }
        function createWasm() {
            var info = {
                env: asmLibraryArg,
                wasi_snapshot_preview1: asmLibraryArg,
                "GOT.mem": new Proxy(asmLibraryArg, GOTHandler),
                "GOT.func": new Proxy(asmLibraryArg, GOTHandler),
            };
            function receiveInstance(instance, module) {
                var exports = instance.exports;
                exports = relocateExports(exports, 1024);
                Module["asm"] = exports;
                var metadata = getDylinkMetadata(module);
                mergeLibSymbols(exports, "main");
                addOnInit(Module["asm"]["__wasm_call_ctors"]);
                removeRunDependency("wasm-instantiate");
            }
            addRunDependency("wasm-instantiate");
            function receiveInstantiationResult(result) {
                receiveInstance(result["instance"], result["module"]);
            }
            function instantiateArrayBuffer(receiver) {
                return getBinaryPromise()
                    .then(function (binary) {
                        return WebAssembly.instantiate(binary, info);
                    })
                    .then(function (instance) {
                        return instance;
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
                    return fetch(wasmBinaryFile, {
                        credentials: "same-origin",
                    }).then(function (response) {
                        var result = WebAssembly.instantiateStreaming(
                            response,
                            info
                        );
                        return result.then(
                            receiveInstantiationResult,
                            function (reason) {
                                err("wasm streaming compile failed: " + reason);
                                err(
                                    "falling back to ArrayBuffer instantiation"
                                );
                                return instantiateArrayBuffer(
                                    receiveInstantiationResult
                                );
                            }
                        );
                    });
                } else {
                    return instantiateArrayBuffer(receiveInstantiationResult);
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
            instantiateAsync().catch(readyPromiseReject);
            return {};
        }
        var tempDouble;
        var tempI64;
        var GOT = {};
        Module["GOT"] = GOT;
        var GOTHandler = {
            get: function (obj, symName) {
                if (!GOT[symName]) {
                    GOT[symName] = new WebAssembly.Global({
                        value: "i32",
                        mutable: true,
                    });
                }
                return GOT[symName];
            },
        };
        Module["GOTHandler"] = GOTHandler;
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
                        getWasmTableEntry(func)();
                    } else {
                        getWasmTableEntry(func)(callback.arg);
                    }
                } else {
                    func(callback.arg === undefined ? null : callback.arg);
                }
            }
        }
        Module["callRuntimeCallbacks"] = callRuntimeCallbacks;
        function withStackSave(f) {
            var stack = stackSave();
            var ret = f();
            stackRestore(stack);
            return ret;
        }
        Module["withStackSave"] = withStackSave;
        function demangle(func) {
            return func;
        }
        Module["demangle"] = demangle;
        function demangleAll(text) {
            var regex = /\b_Z[\w\d_]+/g;
            return text.replace(regex, function (x) {
                var y = demangle(x);
                return x === y ? x : y + " [" + x + "]";
            });
        }
        Module["demangleAll"] = demangleAll;
        function getDylinkMetadata(binary) {
            var offset = 0;
            var end = 0;
            function getU8() {
                return binary[offset++];
            }
            function getLEB() {
                var ret = 0;
                var mul = 1;
                while (1) {
                    var byte = binary[offset++];
                    ret += (byte & 127) * mul;
                    mul *= 128;
                    if (!(byte & 128)) break;
                }
                return ret;
            }
            function getString() {
                var len = getLEB();
                offset += len;
                return UTF8ArrayToString(binary, offset - len, len);
            }
            var name = "dylink.0";
            if (binary instanceof WebAssembly.Module) {
                var dylinkSection = WebAssembly.Module.customSections(
                    binary,
                    name
                );
                if (dylinkSection.length === 0) {
                    name = "dylink";
                    dylinkSection = WebAssembly.Module.customSections(
                        binary,
                        name
                    );
                }
                assert(dylinkSection.length != 0, "need dylink section");
                binary = new Uint8Array(dylinkSection[0]);
                end = binary.length;
            } else {
                var int32View = new Uint32Array(
                    new Uint8Array(binary.subarray(0, 24)).buffer
                );
                assert(
                    int32View[0] == 1836278016,
                    "need to see wasm magic number"
                );
                assert(binary[8] === 0, "need the dylink section to be first");
                offset = 9;
                var section_size = getLEB();
                end = offset + section_size;
                name = getString();
            }
            var customSection = { neededDynlibs: [], tlsExports: {} };
            if (name == "dylink") {
                customSection.memorySize = getLEB();
                customSection.memoryAlign = getLEB();
                customSection.tableSize = getLEB();
                customSection.tableAlign = getLEB();
                var neededDynlibsCount = getLEB();
                for (var i = 0; i < neededDynlibsCount; ++i) {
                    var name = getString();
                    customSection.neededDynlibs.push(name);
                }
            } else {
                assert(name === "dylink.0");
                var WASM_DYLINK_MEM_INFO = 1;
                var WASM_DYLINK_NEEDED = 2;
                var WASM_DYLINK_EXPORT_INFO = 3;
                var WASM_SYMBOL_TLS = 256;
                while (offset < end) {
                    var subsectionType = getU8();
                    var subsectionSize = getLEB();
                    if (subsectionType === WASM_DYLINK_MEM_INFO) {
                        customSection.memorySize = getLEB();
                        customSection.memoryAlign = getLEB();
                        customSection.tableSize = getLEB();
                        customSection.tableAlign = getLEB();
                    } else if (subsectionType === WASM_DYLINK_NEEDED) {
                        var neededDynlibsCount = getLEB();
                        for (var i = 0; i < neededDynlibsCount; ++i) {
                            var name = getString();
                            customSection.neededDynlibs.push(name);
                        }
                    } else if (subsectionType === WASM_DYLINK_EXPORT_INFO) {
                        var count = getLEB();
                        while (count--) {
                            var name = getString();
                            var flags = getLEB();
                            if (flags & WASM_SYMBOL_TLS) {
                                customSection.tlsExports[name] = 1;
                            }
                        }
                    } else {
                        offset += subsectionSize;
                    }
                }
            }
            assert(offset == end);
            return customSection;
        }
        Module["getDylinkMetadata"] = getDylinkMetadata;
        var wasmTableMirror = [];
        Module["wasmTableMirror"] = wasmTableMirror;
        function getWasmTableEntry(funcPtr) {
            var func = wasmTableMirror[funcPtr];
            if (!func) {
                if (funcPtr >= wasmTableMirror.length)
                    wasmTableMirror.length = funcPtr + 1;
                wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
            }
            return func;
        }
        Module["getWasmTableEntry"] = getWasmTableEntry;
        function handleException(e) {
            if (e instanceof ExitStatus || e == "unwind") {
                return EXITSTATUS;
            }
            quit_(1, e);
        }
        Module["handleException"] = handleException;
        function jsStackTrace() {
            var error = new Error();
            if (!error.stack) {
                try {
                    throw new Error();
                } catch (e) {
                    error = e;
                }
                if (!error.stack) {
                    return "(no stack trace available)";
                }
            }
            return error.stack.toString();
        }
        Module["jsStackTrace"] = jsStackTrace;
        function asmjsMangle(x) {
            var unmangledSymbols = ["stackAlloc", "stackSave", "stackRestore"];
            return x.indexOf("dynCall_") == 0 || unmangledSymbols.includes(x)
                ? x
                : "_" + x;
        }
        Module["asmjsMangle"] = asmjsMangle;
        function mergeLibSymbols(exports, libName) {
            for (var sym in exports) {
                if (!exports.hasOwnProperty(sym)) {
                    continue;
                }
                if (!asmLibraryArg.hasOwnProperty(sym)) {
                    asmLibraryArg[sym] = exports[sym];
                }
                var module_sym = asmjsMangle(sym);
                if (!Module.hasOwnProperty(module_sym)) {
                    Module[module_sym] = exports[sym];
                }
            }
        }
        Module["mergeLibSymbols"] = mergeLibSymbols;
        var LDSO = { loadedLibsByName: {}, loadedLibsByHandle: {} };
        Module["LDSO"] = LDSO;
        function dynCallLegacy(sig, ptr, args) {
            var f = Module["dynCall_" + sig];
            return args && args.length
                ? f.apply(null, [ptr].concat(args))
                : f.call(null, ptr);
        }
        Module["dynCallLegacy"] = dynCallLegacy;
        function dynCall(sig, ptr, args) {
            if (sig.includes("j")) {
                return dynCallLegacy(sig, ptr, args);
            }
            return getWasmTableEntry(ptr).apply(null, args);
        }
        Module["dynCall"] = dynCall;
        function createInvokeFunction(sig) {
            return function () {
                var sp = stackSave();
                try {
                    return dynCall(
                        sig,
                        arguments[0],
                        Array.prototype.slice.call(arguments, 1)
                    );
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0 && e !== "longjmp") throw e;
                    _setThrew(1, 0);
                }
            };
        }
        Module["createInvokeFunction"] = createInvokeFunction;
        var ___heap_base = 5311408;
        Module["___heap_base"] = ___heap_base;
        function getMemory(size) {
            if (runtimeInitialized) return _malloc(size);
            var ret = ___heap_base;
            var end = (ret + size + 15) & -16;
            ___heap_base = end;
            GOT["__heap_base"].value = end;
            return ret;
        }
        Module["getMemory"] = getMemory;
        function isInternalSym(symName) {
            return [
                "__cpp_exception",
                "__c_longjmp",
                "__wasm_apply_data_relocs",
                "__dso_handle",
                "__tls_size",
                "__tls_align",
                "__set_stack_limits",
                "emscripten_tls_init",
                "__wasm_init_tls",
                "__wasm_call_ctors",
            ].includes(symName);
        }
        Module["isInternalSym"] = isInternalSym;
        function updateGOT(exports, replace) {
            for (var symName in exports) {
                if (isInternalSym(symName)) {
                    continue;
                }
                var value = exports[symName];
                if (symName.startsWith("orig$")) {
                    symName = symName.split("$")[1];
                    replace = true;
                }
                if (!GOT[symName]) {
                    GOT[symName] = new WebAssembly.Global({
                        value: "i32",
                        mutable: true,
                    });
                }
                if (replace || GOT[symName].value == 0) {
                    if (typeof value === "function") {
                        GOT[symName].value = addFunction(value);
                    } else if (typeof value === "number") {
                        GOT[symName].value = value;
                    } else if (typeof value === "bigint") {
                        GOT[symName].value = Number(value);
                    } else {
                        err(
                            "unhandled export type for `" +
                                symName +
                                "`: " +
                                typeof value
                        );
                    }
                }
            }
        }
        Module["updateGOT"] = updateGOT;
        function relocateExports(exports, memoryBase, replace) {
            var relocated = {};
            for (var e in exports) {
                var value = exports[e];
                if (typeof value === "object") {
                    value = value.value;
                }
                if (typeof value === "number") {
                    value += memoryBase;
                }
                relocated[e] = value;
            }
            updateGOT(relocated, replace);
            return relocated;
        }
        Module["relocateExports"] = relocateExports;
        function resolveGlobalSymbol(symName, direct) {
            var sym;
            if (direct) {
                sym = asmLibraryArg["orig$" + symName];
            }
            if (!sym) {
                sym = asmLibraryArg[symName];
            }
            if (!sym) {
                sym = Module[asmjsMangle(symName)];
            }
            if (!sym && symName.startsWith("invoke_")) {
                sym = createInvokeFunction(symName.split("_")[1]);
            }
            return sym;
        }
        Module["resolveGlobalSymbol"] = resolveGlobalSymbol;
        function alignMemory(size, alignment) {
            return Math.ceil(size / alignment) * alignment;
        }
        Module["alignMemory"] = alignMemory;
        function zeroMemory(address, size) {
            HEAPU8.fill(0, address, address + size);
        }
        Module["zeroMemory"] = zeroMemory;
        function loadWebAssemblyModule(binary, flags, handle) {
            var metadata = getDylinkMetadata(binary);
            function loadModule() {
                var needsAllocation = !handle || !HEAP8[(handle + 24) >> 0];
                if (needsAllocation) {
                    var memAlign = Math.pow(2, metadata.memoryAlign);
                    memAlign = Math.max(memAlign, STACK_ALIGN);
                    var memoryBase = metadata.memorySize
                        ? alignMemory(
                              getMemory(metadata.memorySize + memAlign),
                              memAlign
                          )
                        : 0;
                    var tableBase = metadata.tableSize ? wasmTable.length : 0;
                    if (handle) {
                        HEAP8[(handle + 24) >> 0] = 1;
                        HEAP32[(handle + 28) >> 2] = memoryBase;
                        HEAP32[(handle + 32) >> 2] = metadata.memorySize;
                        HEAP32[(handle + 36) >> 2] = tableBase;
                        HEAP32[(handle + 40) >> 2] = metadata.tableSize;
                    }
                } else {
                    memoryBase = HEAP32[(handle + 28) >> 2];
                    tableBase = HEAP32[(handle + 36) >> 2];
                }
                var tableGrowthNeeded =
                    tableBase + metadata.tableSize - wasmTable.length;
                if (tableGrowthNeeded > 0) {
                    wasmTable.grow(tableGrowthNeeded);
                }
                var moduleExports;
                function resolveSymbol(sym) {
                    var resolved = resolveGlobalSymbol(sym, false);
                    if (!resolved) {
                        resolved = moduleExports[sym];
                    }
                    return resolved;
                }
                var proxyHandler = {
                    get: function (stubs, prop) {
                        switch (prop) {
                            case "__memory_base":
                                return memoryBase;
                            case "__table_base":
                                return tableBase;
                        }
                        if (prop in asmLibraryArg) {
                            return asmLibraryArg[prop];
                        }
                        if (!(prop in stubs)) {
                            var resolved;
                            stubs[prop] = function () {
                                if (!resolved)
                                    resolved = resolveSymbol(prop, true);
                                return resolved.apply(null, arguments);
                            };
                        }
                        return stubs[prop];
                    },
                };
                var proxy = new Proxy({}, proxyHandler);
                var info = {
                    "GOT.mem": new Proxy({}, GOTHandler),
                    "GOT.func": new Proxy({}, GOTHandler),
                    env: proxy,
                    wasi_snapshot_preview1: proxy,
                };
                function postInstantiation(instance) {
                    updateTableMap(tableBase, metadata.tableSize);
                    moduleExports = relocateExports(
                        instance.exports,
                        memoryBase
                    );
                    if (!flags.allowUndefined) {
                        reportUndefinedSymbols();
                    }
                    var init = moduleExports["__wasm_call_ctors"];
                    if (init) {
                        if (runtimeInitialized) {
                            init();
                        } else {
                            __ATINIT__.push(init);
                        }
                    }
                    return moduleExports;
                }
                if (flags.loadAsync) {
                    if (
                        flags.wasmModule &&
                        flags.wasmModule instanceof WebAssembly.Module
                    ) {
                        if (flags.log)
                            flags.log("instantiate with wasm module.");
                        var instance = new WebAssembly.Instance(
                            flags.wasmModule,
                            info
                        );
                        return Promise.resolve(postInstantiation(instance));
                    } else {
                        return WebAssembly.instantiate(binary, info).then(
                            function (result) {
                                flags.wasmModule = result.module;
                                return postInstantiation(result.instance);
                            }
                        );
                    }
                }
                var module =
                    binary instanceof WebAssembly.Module
                        ? binary
                        : new WebAssembly.Module(binary);
                var instance = new WebAssembly.Instance(module, info);
                return postInstantiation(instance);
            }
            if (flags.loadAsync) {
                return metadata.neededDynlibs
                    .reduce(function (chain, dynNeeded) {
                        return chain.then(function () {
                            return loadDynamicLibrary(dynNeeded, flags);
                        });
                    }, Promise.resolve())
                    .then(function () {
                        return loadModule();
                    });
            }
            metadata.neededDynlibs.forEach(function (dynNeeded) {
                loadDynamicLibrary(dynNeeded, flags);
            });
            return loadModule();
        }
        Module["loadWebAssemblyModule"] = loadWebAssemblyModule;
        function loadDynamicLibrary(lib, flags, handle) {
            if (lib == "__main__" && !LDSO.loadedLibsByName[lib]) {
                LDSO.loadedLibsByName[lib] = {
                    refcount: Infinity,
                    name: "__main__",
                    module: Module["asm"],
                    global: true,
                };
            }
            flags = flags || { global: true, nodelete: true };
            var dso = LDSO.loadedLibsByName[lib];
            if (dso) {
                if (flags.global && !dso.global) {
                    dso.global = true;
                    if (dso.module !== "loading") {
                        mergeLibSymbols(dso.module, lib);
                    }
                }
                if (flags.nodelete && dso.refcount !== Infinity) {
                    dso.refcount = Infinity;
                }
                dso.refcount++;
                if (handle) {
                    LDSO.loadedLibsByHandle[handle] = dso;
                }
                return flags.loadAsync ? Promise.resolve(true) : true;
            }
            dso = {
                refcount: flags.nodelete ? Infinity : 1,
                name: lib,
                module: "loading",
                global: flags.global,
            };
            LDSO.loadedLibsByName[lib] = dso;
            if (handle) {
                LDSO.loadedLibsByHandle[handle] = dso;
            }
            function loadLibData(libFile) {
                if (flags.fs && flags.fs.findObject(libFile)) {
                    var libData = flags.fs.readFile(libFile, {
                        encoding: "binary",
                    });
                    if (!(libData instanceof Uint8Array)) {
                        libData = new Uint8Array(libData);
                    }
                    return flags.loadAsync ? Promise.resolve(libData) : libData;
                }
                if (flags.loadAsync) {
                    return flags
                        .fetchRetry(libFile, flags.fetchOptions)
                        .then(function (response) {
                            if (!response["ok"]) {
                                throw (
                                    "failed to load binary file at '" +
                                    libFile +
                                    "'"
                                );
                            }
                            return response["arrayBuffer"]();
                        })
                        .then(function (buffer) {
                            return new Uint8Array(buffer);
                        });
                }
                if (!readBinary) {
                    throw new Error(
                        libFile +
                            ": file not found, and synchronous loading of external files is not available"
                    );
                }
                return readBinary(libFile);
            }
            function getLibModule() {
                if (
                    Module["preloadedWasm"] !== undefined &&
                    Module["preloadedWasm"][lib] !== undefined
                ) {
                    var libModule = Module["preloadedWasm"][lib];
                    return flags.loadAsync
                        ? Promise.resolve(libModule)
                        : libModule;
                }
                if (flags.loadAsync) {
                    return loadLibData(lib).then(function (libData) {
                        return loadWebAssemblyModule(libData, flags, handle);
                    });
                }
                return loadWebAssemblyModule(loadLibData(lib), flags, handle);
            }
            function moduleLoaded(libModule) {
                if (dso.global) {
                    mergeLibSymbols(libModule, lib);
                }
                dso.module = libModule;
            }
            if (flags.loadAsync) {
                return getLibModule().then(function (libModule) {
                    moduleLoaded(libModule);
                    return true;
                });
            }
            moduleLoaded(getLibModule());
            return true;
        }
        Module["loadDynamicLibrary"] = loadDynamicLibrary;
        function reportUndefinedSymbols() {
            for (var symName in GOT) {
                if (GOT[symName].value == 0) {
                    var value = resolveGlobalSymbol(symName, true);
                    if (typeof value === "function") {
                        GOT[symName].value = addFunction(value, value.sig);
                    } else if (typeof value === "number") {
                        GOT[symName].value = value;
                    } else {
                        assert(
                            false,
                            "bad export type for `" +
                                symName +
                                "`: " +
                                typeof value
                        );
                    }
                }
            }
        }
        Module["reportUndefinedSymbols"] = reportUndefinedSymbols;
        function preloadDylibs() {
            if (!dynamicLibraries.length) {
                reportUndefinedSymbols();
                return;
            }
            addRunDependency("preloadDylibs");
            dynamicLibraries
                .reduce(function (chain, lib) {
                    return chain.then(function () {
                        return loadDynamicLibrary(lib, {
                            loadAsync: true,
                            global: true,
                            nodelete: true,
                            allowUndefined: true,
                        });
                    });
                }, Promise.resolve())
                .then(function () {
                    reportUndefinedSymbols();
                    removeRunDependency("preloadDylibs");
                });
        }
        Module["preloadDylibs"] = preloadDylibs;
        function setWasmTableEntry(idx, func) {
            wasmTable.set(idx, func);
            wasmTableMirror[idx] = func;
        }
        Module["setWasmTableEntry"] = setWasmTableEntry;
        function stackTrace() {
            var js = jsStackTrace();
            if (Module["extraStackTrace"])
                js += "\n" + Module["extraStackTrace"]();
            return demangleAll(js);
        }
        Module["stackTrace"] = stackTrace;
        function _AddAnnotationToPage() {
            return Module["_AddAnnotationToPage"].apply(null, arguments);
        }
        function _AddDIBToPage() {
            return Module["_AddDIBToPage"].apply(null, arguments);
        }
        function _AddImageToPage() {
            return Module["_AddImageToPage"].apply(null, arguments);
        }
        function _AddImageWatermarkToPage() {
            return Module["_AddImageWatermarkToPage"].apply(null, arguments);
        }
        function _AddPathToPage() {
            return Module["_AddPathToPage"].apply(null, arguments);
        }
        function _AddPdfPage() {
            return Module["_AddPdfPage"].apply(null, arguments);
        }
        function _AddTextToPage() {
            return Module["_AddTextToPage"].apply(null, arguments);
        }
        function _CreatePageFromImageDIB() {
            return Module["_CreatePageFromImageDIB"].apply(null, arguments);
        }
        function _CreatePageFromImageFileStream() {
            return Module["_CreatePageFromImageFileStream"].apply(
                null,
                arguments
            );
        }
        function _DIBChangeBitDepth() {
            return Module["_DIBChangeBitDepth"].apply(null, arguments);
        }
        function _DIBtoRGBA() {
            return Module["_DIBtoRGBA"].apply(null, arguments);
        }
        function _DestroyDynamImageProc() {
            return Module["_DestroyDynamImageProc"].apply(null, arguments);
        }
        function _DynamImageProcAutoBrightnessAndContrast() {
            return Module["_DynamImageProcAutoBrightnessAndContrast"].apply(
                null,
                arguments
            );
        }
        function _DynamImageProcChangeBrightnessAndContrast() {
            return Module["_DynamImageProcChangeBrightnessAndContrast"].apply(
                null,
                arguments
            );
        }
        function _DynamImageProcColorFilter() {
            return Module["_DynamImageProcColorFilter"].apply(null, arguments);
        }
        function _DynamImageProcConvert() {
            return Module["_DynamImageProcConvert"].apply(null, arguments);
        }
        function _DynamImageProcConvertToBWScale() {
            return Module["_DynamImageProcConvertToBWScale"].apply(
                null,
                arguments
            );
        }
        function _DynamImageProcConvertToGrayScale() {
            return Module["_DynamImageProcConvertToGrayScale"].apply(
                null,
                arguments
            );
        }
        function _DynamImageProcCrop() {
            return Module["_DynamImageProcCrop"].apply(null, arguments);
        }
        function _DynamImageProcDocumentDetect() {
            return Module["_DynamImageProcDocumentDetect"].apply(
                null,
                arguments
            );
        }
        function _DynamImageProcDrawQuadrangle() {
            return Module["_DynamImageProcDrawQuadrangle"].apply(
                null,
                arguments
            );
        }
        function _DynamImageProcEqualize() {
            return Module["_DynamImageProcEqualize"].apply(null, arguments);
        }
        function _DynamImageProcErase() {
            return Module["_DynamImageProcErase"].apply(null, arguments);
        }
        function _DynamImageProcGetBlurryScore() {
            return Module["_DynamImageProcGetBlurryScore"].apply(
                null,
                arguments
            );
        }
        function _DynamImageProcGetBrightnessScore() {
            return Module["_DynamImageProcGetBrightnessScore"].apply(
                null,
                arguments
            );
        }
        function _DynamImageProcGetDataPointer() {
            return Module["_DynamImageProcGetDataPointer"].apply(
                null,
                arguments
            );
        }
        function _DynamImageProcGetErrorString() {
            return Module["_DynamImageProcGetErrorString"].apply(
                null,
                arguments
            );
        }
        function _DynamImageProcGetHeight() {
            return Module["_DynamImageProcGetHeight"].apply(null, arguments);
        }
        function _DynamImageProcGetSkewAngle() {
            return Module["_DynamImageProcGetSkewAngle"].apply(null, arguments);
        }
        function _DynamImageProcGetWidth() {
            return Module["_DynamImageProcGetWidth"].apply(null, arguments);
        }
        function _DynamImageProcInvert() {
            return Module["_DynamImageProcInvert"].apply(null, arguments);
        }
        function _DynamImageProcNormalize() {
            return Module["_DynamImageProcNormalize"].apply(null, arguments);
        }
        function _DynamImageProcPerspective() {
            return Module["_DynamImageProcPerspective"].apply(null, arguments);
        }
        function _DynamImageProcResize() {
            return Module["_DynamImageProcResize"].apply(null, arguments);
        }
        function _DynamImageProcRotateEX() {
            return Module["_DynamImageProcRotateEX"].apply(null, arguments);
        }
        function _DynamImageProcRotateFlipType() {
            return Module["_DynamImageProcRotateFlipType"].apply(
                null,
                arguments
            );
        }
        function _DynamImageProcSave() {
            return Module["_DynamImageProcSave"].apply(null, arguments);
        }
        function _DynamImageProcSetDPI() {
            return Module["_DynamImageProcSetDPI"].apply(null, arguments);
        }
        function _DynamImageProcSetDebugMode() {
            return Module["_DynamImageProcSetDebugMode"].apply(null, arguments);
        }
        function _DynamImageProcSetImageHeight() {
            return Module["_DynamImageProcSetImageHeight"].apply(
                null,
                arguments
            );
        }
        function _DynamImageProcSetImageWidth() {
            return Module["_DynamImageProcSetImageWidth"].apply(
                null,
                arguments
            );
        }
        function _DynamImageProcShadowRemovel() {
            return Module["_DynamImageProcShadowRemovel"].apply(
                null,
                arguments
            );
        }
        function _EndWritePdfPage() {
            return Module["_EndWritePdfPage"].apply(null, arguments);
        }
        function _FreeWatermarkAndFormXObject() {
            return Module["_FreeWatermarkAndFormXObject"].apply(
                null,
                arguments
            );
        }
        function _GetDIBMetaData() {
            return Module["_GetDIBMetaData"].apply(null, arguments);
        }
        function _GetDynamImageProcWasmVersion() {
            return Module["_GetDynamImageProcWasmVersion"].apply(
                null,
                arguments
            );
        }
        function _GetDynamicImageCoreWasmVersion() {
            return Module["_GetDynamicImageCoreWasmVersion"].apply(
                null,
                arguments
            );
        }
        function _GetDynamicPdfWWasmVersion() {
            return Module["_GetDynamicPdfWWasmVersion"].apply(null, arguments);
        }
        function _GetImageMetaData() {
            return Module["_GetImageMetaData"].apply(null, arguments);
        }
        function _GetJPEGExifData() {
            return Module["_GetJPEGExifData"].apply(null, arguments);
        }
        function _GetJPEGMetaData() {
            return Module["_GetJPEGMetaData"].apply(null, arguments);
        }
        function _GetPdfStream() {
            return Module["_GetPdfStream"].apply(null, arguments);
        }
        function _InitDynamImageProc() {
            return Module["_InitDynamImageProc"].apply(null, arguments);
        }
        function _NewImageWatermark() {
            return Module["_NewImageWatermark"].apply(null, arguments);
        }
        function _NewWatermarkFormXObject() {
            return Module["_NewWatermarkFormXObject"].apply(null, arguments);
        }
        function _PDFInitFromJsonString() {
            return Module["_PDFInitFromJsonString"].apply(null, arguments);
        }
        function _RGBAtoDIB() {
            return Module["_RGBAtoDIB"].apply(null, arguments);
        }
        function _ReleasePdf() {
            return Module["_ReleasePdf"].apply(null, arguments);
        }
        function _RotateJPEGByExif() {
            return Module["_RotateJPEGByExif"].apply(null, arguments);
        }
        function _SaveDIBtoJPEG() {
            return Module["_SaveDIBtoJPEG"].apply(null, arguments);
        }
        function _SaveDIBtoPNG() {
            return Module["_SaveDIBtoPNG"].apply(null, arguments);
        }
        function _SaveRGBA_BGRAtoJPEG() {
            return Module["_SaveRGBA_BGRAtoJPEG"].apply(null, arguments);
        }
        function _SaveRGBA_BGRAtoPNG() {
            return Module["_SaveRGBA_BGRAtoPNG"].apply(null, arguments);
        }
        function _SetPdfPageRotate() {
            return Module["_SetPdfPageRotate"].apply(null, arguments);
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
        Module["___assert_fail"] = ___assert_fail;
        ___assert_fail.sig = "viiii";
        function ___cxa_allocate_exception(size) {
            return _malloc(size + 16) + 16;
        }
        Module["___cxa_allocate_exception"] = ___cxa_allocate_exception;
        ___cxa_allocate_exception.sig = "vi";
        function _atexit(func, arg) {}
        Module["_atexit"] = _atexit;
        _atexit.sig = "iii";
        function ___cxa_atexit(a0, a1) {
            return _atexit(a0, a1);
        }
        Module["___cxa_atexit"] = ___cxa_atexit;
        ___cxa_atexit.sig = "iii";
        function ExceptionInfo(excPtr) {
            this.excPtr = excPtr;
            this.ptr = excPtr - 16;
            this.set_type = function (type) {
                HEAP32[(this.ptr + 4) >> 2] = type;
            };
            this.get_type = function () {
                return HEAP32[(this.ptr + 4) >> 2];
            };
            this.set_destructor = function (destructor) {
                HEAP32[(this.ptr + 8) >> 2] = destructor;
            };
            this.get_destructor = function () {
                return HEAP32[(this.ptr + 8) >> 2];
            };
            this.set_refcount = function (refcount) {
                HEAP32[this.ptr >> 2] = refcount;
            };
            this.set_caught = function (caught) {
                caught = caught ? 1 : 0;
                HEAP8[(this.ptr + 12) >> 0] = caught;
            };
            this.get_caught = function () {
                return HEAP8[(this.ptr + 12) >> 0] != 0;
            };
            this.set_rethrown = function (rethrown) {
                rethrown = rethrown ? 1 : 0;
                HEAP8[(this.ptr + 13) >> 0] = rethrown;
            };
            this.get_rethrown = function () {
                return HEAP8[(this.ptr + 13) >> 0] != 0;
            };
            this.init = function (type, destructor) {
                this.set_type(type);
                this.set_destructor(destructor);
                this.set_refcount(0);
                this.set_caught(false);
                this.set_rethrown(false);
            };
            this.add_ref = function () {
                var value = HEAP32[this.ptr >> 2];
                HEAP32[this.ptr >> 2] = value + 1;
            };
            this.release_ref = function () {
                var prev = HEAP32[this.ptr >> 2];
                HEAP32[this.ptr >> 2] = prev - 1;
                return prev === 1;
            };
        }
        Module["ExceptionInfo"] = ExceptionInfo;
        var exceptionLast = 0;
        Module["exceptionLast"] = exceptionLast;
        var uncaughtExceptionCount = 0;
        Module["uncaughtExceptionCount"] = uncaughtExceptionCount;
        function ___cxa_throw(ptr, type, destructor) {
            var info = new ExceptionInfo(ptr);
            info.init(type, destructor);
            exceptionLast = ptr;
            uncaughtExceptionCount++;
            throw ptr;
        }
        Module["___cxa_throw"] = ___cxa_throw;
        ___cxa_throw.sig = "viii";
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
            if (!_gmtime_r.GMTString) _gmtime_r.GMTString = allocateUTF8("GMT");
            HEAP32[(tmPtr + 40) >> 2] = _gmtime_r.GMTString;
            return tmPtr;
        }
        Module["_gmtime_r"] = _gmtime_r;
        _gmtime_r.sig = "iii";
        function ___gmtime_r(a0, a1) {
            return _gmtime_r(a0, a1);
        }
        Module["___gmtime_r"] = ___gmtime_r;
        ___gmtime_r.sig = "iii";
        function _tzset_impl() {
            var currentYear = new Date().getFullYear();
            var winter = new Date(currentYear, 0, 1);
            var summer = new Date(currentYear, 6, 1);
            var winterOffset = winter.getTimezoneOffset();
            var summerOffset = summer.getTimezoneOffset();
            var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
            HEAP32[__get_timezone() >> 2] = stdTimezoneOffset * 60;
            HEAP32[__get_daylight() >> 2] = Number(
                winterOffset != summerOffset
            );
            function extractZone(date) {
                var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
                return match ? match[1] : "GMT";
            }
            var winterName = extractZone(winter);
            var summerName = extractZone(summer);
            var winterNamePtr = allocateUTF8(winterName);
            var summerNamePtr = allocateUTF8(summerName);
            if (summerOffset < winterOffset) {
                HEAP32[__get_tzname() >> 2] = winterNamePtr;
                HEAP32[(__get_tzname() + 4) >> 2] = summerNamePtr;
            } else {
                HEAP32[__get_tzname() >> 2] = summerNamePtr;
                HEAP32[(__get_tzname() + 4) >> 2] = winterNamePtr;
            }
        }
        Module["_tzset_impl"] = _tzset_impl;
        _tzset_impl.sig = "v";
        function _tzset() {
            if (_tzset.called) return;
            _tzset.called = true;
            _tzset_impl();
        }
        Module["_tzset"] = _tzset;
        _tzset.sig = "v";
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
        Module["_localtime_r"] = _localtime_r;
        _localtime_r.sig = "iii";
        function ___localtime_r(a0, a1) {
            return _localtime_r(a0, a1);
        }
        Module["___localtime_r"] = ___localtime_r;
        ___localtime_r.sig = "iii";
        var ___memory_base = new WebAssembly.Global(
            { value: "i32", mutable: false },
            1024
        );
        Module["___memory_base"] = ___memory_base;
        var ___stack_pointer = new WebAssembly.Global(
            { value: "i32", mutable: true },
            5311408
        );
        Module["___stack_pointer"] = ___stack_pointer;
        function setErrNo(value) {
            HEAP32[___errno_location() >> 2] = value;
            return value;
        }
        Module["setErrNo"] = setErrNo;
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
                path = PATH.normalize(path);
                path = path.replace(/\/$/, "");
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
        Module["PATH"] = PATH;
        function getRandomDevice() {
            if (
                typeof crypto === "object" &&
                typeof crypto["getRandomValues"] === "function"
            ) {
                var randomBuffer = new Uint8Array(1);
                return function () {
                    crypto.getRandomValues(randomBuffer);
                    return randomBuffer[0];
                };
            } else if (ENVIRONMENT_IS_NODE) {
                try {
                    var crypto_module = require("crypto");
                    return function () {
                        return crypto_module["randomBytes"](1)[0];
                    };
                } catch (e) {}
            }
            return function () {
                abort("randomDevice");
            };
        }
        Module["getRandomDevice"] = getRandomDevice;
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
        Module["PATH_FS"] = PATH_FS;
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
                            var buf = Buffer.alloc(BUFSIZE);
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
                                if (e.toString().includes("EOF")) bytesRead = 0;
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
        Module["TTY"] = TTY;
        function mmapAlloc(size) {
            size = alignMemory(size, 65536);
            var ptr = _memalign(65536, size);
            if (!ptr) return 0;
            zeroMemory(ptr, size);
            return ptr;
        }
        Module["mmapAlloc"] = mmapAlloc;
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
                    parent.timestamp = node.timestamp;
                }
                return node;
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
            },
            resizeFileStorage: function (node, newSize) {
                if (node.usedBytes == newSize) return;
                if (newSize == 0) {
                    node.contents = null;
                    node.usedBytes = 0;
                } else {
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
                }
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
                    old_node.parent.timestamp = Date.now();
                    old_node.name = new_name;
                    new_dir.contents[new_name] = old_node;
                    new_dir.timestamp = old_node.parent.timestamp;
                    old_node.parent = new_dir;
                },
                unlink: function (parent, name) {
                    delete parent.contents[name];
                    parent.timestamp = Date.now();
                },
                rmdir: function (parent, name) {
                    var node = FS.lookupNode(parent, name);
                    for (var i in node.contents) {
                        throw new FS.ErrnoError(55);
                    }
                    delete parent.contents[name];
                    parent.timestamp = Date.now();
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
                    if (node.contents.subarray && buffer.subarray) {
                        node.contents.set(
                            buffer.subarray(offset, offset + length),
                            position
                        );
                    } else {
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
                    address,
                    length,
                    position,
                    prot,
                    flags
                ) {
                    if (address !== 0) {
                        throw new FS.ErrnoError(28);
                    }
                    if (!FS.isFile(stream.node.mode)) {
                        throw new FS.ErrnoError(43);
                    }
                    var ptr;
                    var allocated;
                    var contents = stream.node.contents;
                    if (!(flags & 2) && contents.buffer === buffer) {
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
                        ptr = mmapAlloc(length);
                        if (!ptr) {
                            throw new FS.ErrnoError(48);
                        }
                        HEAP8.set(contents, ptr);
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
        Module["MEMFS"] = MEMFS;
        function asyncLoad(url, onload, onerror, noRunDep) {
            var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
            readAsync(
                url,
                function (arrayBuffer) {
                    assert(
                        arrayBuffer,
                        'Loading data file "' +
                            url +
                            '" failed (no arrayBuffer).'
                    );
                    onload(new Uint8Array(arrayBuffer));
                    if (dep) removeRunDependency(dep);
                },
                function (event) {
                    if (onerror) {
                        onerror();
                    } else {
                        throw 'Loading data file "' + url + '" failed.';
                    }
                }
            );
            if (dep) addRunDependency(dep);
        }
        Module["asyncLoad"] = asyncLoad;
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
            ErrnoError: null,
            genericErrors: {},
            filesystems: null,
            syncFSRequests: 0,
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
                "r+": 2,
                w: 577,
                "w+": 578,
                a: 1089,
                "a+": 1090,
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
                if (perms.includes("r") && !(node.mode & 292)) {
                    return 2;
                } else if (perms.includes("w") && !(node.mode & 146)) {
                    return 2;
                } else if (perms.includes("x") && !(node.mode & 73)) {
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
                        if (mounts.includes(current.mount)) {
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
                lookup = FS.lookupPath(old_path, { parent: true });
                old_dir = lookup.node;
                lookup = FS.lookupPath(new_path, { parent: true });
                new_dir = lookup.node;
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
                FS.hashRemoveNode(old_node);
                try {
                    old_dir.node_ops.rename(old_node, new_dir, new_name);
                } catch (e) {
                    throw e;
                } finally {
                    FS.hashAddNode(old_node);
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
                parent.node_ops.rmdir(parent, name);
                FS.destroyNode(node);
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
                parent.node_ops.unlink(parent, name);
                FS.destroyNode(node);
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
                        id: node.id,
                        flags: flags,
                        mode: node.mode,
                        seekable: true,
                        position: 0,
                        stream_ops: node.stream_ops,
                        node_ops: node.node_ops,
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
                    }
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
            mmap: function (stream, address, length, position, prot, flags) {
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
                    address,
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
                opts.flags = opts.flags || 0;
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
                opts.flags = opts.flags || 577;
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
                var random_device = getRandomDevice();
                FS.createDevice("/dev", "random", random_device);
                FS.createDevice("/dev", "urandom", random_device);
                FS.mkdir("/dev/shm");
                FS.mkdir("/dev/shm/tmp");
            },
            createSpecialDirectories: function () {
                FS.mkdir("/proc");
                var proc_self = FS.mkdir("/proc/self");
                FS.mkdir("/proc/self/fd");
                FS.mount(
                    {
                        mount: function () {
                            var node = FS.createNode(
                                proc_self,
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
                var stdin = FS.open("/dev/stdin", 0);
                var stdout = FS.open("/dev/stdout", 1);
                var stderr = FS.open("/dev/stderr", 1);
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
            findObject: function (path, dontResolveLastLink) {
                var ret = FS.analyzePath(path, dontResolveLastLink);
                if (ret.exists) {
                    return ret.object;
                } else {
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
                    var stream = FS.open(node, 577);
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
            forceLoadFile: function (obj) {
                if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
                    return true;
                if (typeof XMLHttpRequest !== "undefined") {
                    throw new Error(
                        "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
                    );
                } else if (read_) {
                    try {
                        obj.contents = intArrayFromString(read_(obj.url), true);
                        obj.usedBytes = obj.contents.length;
                    } catch (e) {
                        throw new FS.ErrnoError(29);
                    }
                } else {
                    throw new Error(
                        "Cannot load without read() or XMLHttpRequest."
                    );
                }
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
                        FS.forceLoadFile(node);
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
                    FS.forceLoadFile(node);
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
                    asyncLoad(
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
            calculateAt: function (dirfd, path, allowEmpty) {
                if (path[0] === "/") {
                    return path;
                }
                var dir;
                if (dirfd === -100) {
                    dir = FS.cwd();
                } else {
                    var dirstream = FS.getStream(dirfd);
                    if (!dirstream) throw new FS.ErrnoError(8);
                    dir = dirstream.path;
                }
                if (path.length == 0) {
                    if (!allowEmpty) {
                        throw new FS.ErrnoError(44);
                    }
                    return dir;
                }
                return PATH.join2(dir, path);
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
                    +Math.abs(tempDouble) >= 1
                        ? tempDouble > 0
                            ? (Math.min(
                                  +Math.floor(tempDouble / 4294967296),
                                  4294967295
                              ) |
                                  0) >>>
                              0
                            : ~~+Math.ceil(
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
                    +Math.abs(tempDouble) >= 1
                        ? tempDouble > 0
                            ? (Math.min(
                                  +Math.floor(tempDouble / 4294967296),
                                  4294967295
                              ) |
                                  0) >>>
                              0
                            : ~~+Math.ceil(
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
                var lookup = FS.lookupPath(path, { follow: true });
                var node = lookup.node;
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
        Module["SYSCALLS"] = SYSCALLS;
        function ___syscall_fcntl64(fd, cmd, varargs) {
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
                    case 5: {
                        var arg = SYSCALLS.get();
                        var offset = 0;
                        HEAP16[(arg + offset) >> 1] = 2;
                        return 0;
                    }
                    case 6:
                    case 7:
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
                    throw e;
                return -e.errno;
            }
        }
        Module["___syscall_fcntl64"] = ___syscall_fcntl64;
        function ___syscall_fstat64(fd, buf) {
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                return SYSCALLS.doStat(FS.stat, stream.path, buf);
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return -e.errno;
            }
        }
        Module["___syscall_fstat64"] = ___syscall_fstat64;
        function ___syscall_fstatat64(dirfd, path, buf, flags) {
            try {
                path = SYSCALLS.getStr(path);
                var nofollow = flags & 256;
                var allowEmpty = flags & 4096;
                flags = flags & ~4352;
                path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
                return SYSCALLS.doStat(
                    nofollow ? FS.lstat : FS.stat,
                    path,
                    buf
                );
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return -e.errno;
            }
        }
        Module["___syscall_fstatat64"] = ___syscall_fstatat64;
        function ___syscall_getdents64(fd, dirp, count) {
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
                    if (name === ".") {
                        id = stream.id;
                        type = 4;
                    } else if (name === "..") {
                        var lookup = FS.lookupPath(stream.path, {
                            parent: true,
                        });
                        id = lookup.node.id;
                        type = 4;
                    } else {
                        var child = FS.lookupNode(stream, name);
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
                        +Math.abs(tempDouble) >= 1
                            ? tempDouble > 0
                                ? (Math.min(
                                      +Math.floor(tempDouble / 4294967296),
                                      4294967295
                                  ) |
                                      0) >>>
                                  0
                                : ~~+Math.ceil(
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
                        +Math.abs(tempDouble) >= 1
                            ? tempDouble > 0
                                ? (Math.min(
                                      +Math.floor(tempDouble / 4294967296),
                                      4294967295
                                  ) |
                                      0) >>>
                                  0
                                : ~~+Math.ceil(
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
                    throw e;
                return -e.errno;
            }
        }
        Module["___syscall_getdents64"] = ___syscall_getdents64;
        function ___syscall_getegid32() {
            return 0;
        }
        Module["___syscall_getegid32"] = ___syscall_getegid32;
        ___syscall_getegid32.sig = "i";
        function ___syscall_geteuid32() {
            return ___syscall_getegid32();
        }
        Module["___syscall_geteuid32"] = ___syscall_geteuid32;
        ___syscall_geteuid32.sig = "i";
        function ___syscall_getgid32() {
            return ___syscall_getegid32();
        }
        Module["___syscall_getgid32"] = ___syscall_getgid32;
        ___syscall_getgid32.sig = "i";
        function ___syscall_getuid32() {
            return ___syscall_getegid32();
        }
        Module["___syscall_getuid32"] = ___syscall_getuid32;
        ___syscall_getuid32.sig = "i";
        function ___syscall_ioctl(fd, op, varargs) {
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
                    throw e;
                return -e.errno;
            }
        }
        Module["___syscall_ioctl"] = ___syscall_ioctl;
        function ___syscall_lstat64(path, buf) {
            try {
                path = SYSCALLS.getStr(path);
                return SYSCALLS.doStat(FS.lstat, path, buf);
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return -e.errno;
            }
        }
        Module["___syscall_lstat64"] = ___syscall_lstat64;
        function syscallMmap2(addr, len, prot, flags, fd, off) {
            off <<= 12;
            var ptr;
            var allocated = false;
            if ((flags & 16) !== 0 && addr % 65536 !== 0) {
                return -28;
            }
            if ((flags & 32) !== 0) {
                ptr = mmapAlloc(len);
                if (!ptr) return -48;
                allocated = true;
            } else {
                var info = FS.getStream(fd);
                if (!info) return -8;
                var res = FS.mmap(info, addr, len, off, prot, flags);
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
        Module["syscallMmap2"] = syscallMmap2;
        function ___syscall_mmap2(addr, len, prot, flags, fd, off) {
            try {
                return syscallMmap2(addr, len, prot, flags, fd, off);
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return -e.errno;
            }
        }
        Module["___syscall_mmap2"] = ___syscall_mmap2;
        function syscallMunmap(addr, len) {
            var info = SYSCALLS.mappings[addr];
            if (len === 0 || !info) {
                return -28;
            }
            if (len === info.len) {
                var stream = FS.getStream(info.fd);
                if (stream) {
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
                }
                SYSCALLS.mappings[addr] = null;
                if (info.allocated) {
                    _free(info.malloc);
                }
            }
            return 0;
        }
        Module["syscallMunmap"] = syscallMunmap;
        function ___syscall_munmap(addr, len) {
            try {
                return syscallMunmap(addr, len);
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return -e.errno;
            }
        }
        Module["___syscall_munmap"] = ___syscall_munmap;
        function ___syscall_open(path, flags, varargs) {
            SYSCALLS.varargs = varargs;
            try {
                var pathname = SYSCALLS.getStr(path);
                var mode = varargs ? SYSCALLS.get() : 0;
                var stream = FS.open(pathname, flags, mode);
                return stream.fd;
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return -e.errno;
            }
        }
        Module["___syscall_open"] = ___syscall_open;
        function ___syscall_stat64(path, buf) {
            try {
                path = SYSCALLS.getStr(path);
                return SYSCALLS.doStat(FS.stat, path, buf);
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return -e.errno;
            }
        }
        Module["___syscall_stat64"] = ___syscall_stat64;
        var ___table_base = new WebAssembly.Global(
            { value: "i32", mutable: false },
            1
        );
        Module["___table_base"] = ___table_base;
        function __embind_register_bigint(
            primitiveType,
            name,
            size,
            minRange,
            maxRange
        ) {}
        Module["__embind_register_bigint"] = __embind_register_bigint;
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
        Module["getShiftFromSize"] = getShiftFromSize;
        function embind_init_charCodes() {
            var codes = new Array(256);
            for (var i = 0; i < 256; ++i) {
                codes[i] = String.fromCharCode(i);
            }
            embind_charCodes = codes;
        }
        Module["embind_init_charCodes"] = embind_init_charCodes;
        var embind_charCodes = undefined;
        Module["embind_charCodes"] = embind_charCodes;
        function readLatin1String(ptr) {
            var ret = "";
            var c = ptr;
            while (HEAPU8[c]) {
                ret += embind_charCodes[HEAPU8[c++]];
            }
            return ret;
        }
        Module["readLatin1String"] = readLatin1String;
        var awaitingDependencies = {};
        Module["awaitingDependencies"] = awaitingDependencies;
        var registeredTypes = {};
        Module["registeredTypes"] = registeredTypes;
        var typeDependencies = {};
        Module["typeDependencies"] = typeDependencies;
        var char_0 = 48;
        Module["char_0"] = char_0;
        var char_9 = 57;
        Module["char_9"] = char_9;
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
        Module["makeLegalFunctionName"] = makeLegalFunctionName;
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
        Module["createNamedFunction"] = createNamedFunction;
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
        Module["extendError"] = extendError;
        var BindingError = undefined;
        Module["BindingError"] = BindingError;
        function throwBindingError(message) {
            throw new BindingError(message);
        }
        Module["throwBindingError"] = throwBindingError;
        var InternalError = undefined;
        Module["InternalError"] = InternalError;
        function throwInternalError(message) {
            throw new InternalError(message);
        }
        Module["throwInternalError"] = throwInternalError;
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
        Module["whenDependentTypesAreResolved"] = whenDependentTypesAreResolved;
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
        Module["registerType"] = registerType;
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
        Module["__embind_register_bool"] = __embind_register_bool;
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
        Module["ClassHandle_isAliasOf"] = ClassHandle_isAliasOf;
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
        Module["shallowCopyInternalPointer"] = shallowCopyInternalPointer;
        function throwInstanceAlreadyDeleted(obj) {
            function getInstanceTypeName(handle) {
                return handle.$$.ptrType.registeredClass.name;
            }
            throwBindingError(
                getInstanceTypeName(obj) + " instance already deleted"
            );
        }
        Module["throwInstanceAlreadyDeleted"] = throwInstanceAlreadyDeleted;
        var finalizationGroup = false;
        Module["finalizationGroup"] = finalizationGroup;
        function detachFinalizer(handle) {}
        Module["detachFinalizer"] = detachFinalizer;
        function runDestructor($$) {
            if ($$.smartPtr) {
                $$.smartPtrType.rawDestructor($$.smartPtr);
            } else {
                $$.ptrType.registeredClass.rawDestructor($$.ptr);
            }
        }
        Module["runDestructor"] = runDestructor;
        function releaseClassHandle($$) {
            $$.count.value -= 1;
            var toDelete = 0 === $$.count.value;
            if (toDelete) {
                runDestructor($$);
            }
        }
        Module["releaseClassHandle"] = releaseClassHandle;
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
        Module["attachFinalizer"] = attachFinalizer;
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
        Module["ClassHandle_clone"] = ClassHandle_clone;
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
        Module["ClassHandle_delete"] = ClassHandle_delete;
        function ClassHandle_isDeleted() {
            return !this.$$.ptr;
        }
        Module["ClassHandle_isDeleted"] = ClassHandle_isDeleted;
        var delayFunction = undefined;
        Module["delayFunction"] = delayFunction;
        var deletionQueue = [];
        Module["deletionQueue"] = deletionQueue;
        function flushPendingDeletes() {
            while (deletionQueue.length) {
                var obj = deletionQueue.pop();
                obj.$$.deleteScheduled = false;
                obj["delete"]();
            }
        }
        Module["flushPendingDeletes"] = flushPendingDeletes;
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
        Module["ClassHandle_deleteLater"] = ClassHandle_deleteLater;
        function init_ClassHandle() {
            ClassHandle.prototype["isAliasOf"] = ClassHandle_isAliasOf;
            ClassHandle.prototype["clone"] = ClassHandle_clone;
            ClassHandle.prototype["delete"] = ClassHandle_delete;
            ClassHandle.prototype["isDeleted"] = ClassHandle_isDeleted;
            ClassHandle.prototype["deleteLater"] = ClassHandle_deleteLater;
        }
        Module["init_ClassHandle"] = init_ClassHandle;
        function ClassHandle() {}
        Module["ClassHandle"] = ClassHandle;
        var registeredPointers = {};
        Module["registeredPointers"] = registeredPointers;
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
        Module["ensureOverloadTable"] = ensureOverloadTable;
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
        Module["exposePublicSymbol"] = exposePublicSymbol;
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
        Module["RegisteredClass"] = RegisteredClass;
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
        Module["upcastPointer"] = upcastPointer;
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
        Module["constNoSmartPtrRawPointerToWireType"] =
            constNoSmartPtrRawPointerToWireType;
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
                                Emval.toHandle(function () {
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
        Module["genericPointerToWireType"] = genericPointerToWireType;
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
        Module["nonConstNoSmartPtrRawPointerToWireType"] =
            nonConstNoSmartPtrRawPointerToWireType;
        function simpleReadValueFromPointer(pointer) {
            return this["fromWireType"](HEAPU32[pointer >> 2]);
        }
        Module["simpleReadValueFromPointer"] = simpleReadValueFromPointer;
        function RegisteredPointer_getPointee(ptr) {
            if (this.rawGetPointee) {
                ptr = this.rawGetPointee(ptr);
            }
            return ptr;
        }
        Module["RegisteredPointer_getPointee"] = RegisteredPointer_getPointee;
        function RegisteredPointer_destructor(ptr) {
            if (this.rawDestructor) {
                this.rawDestructor(ptr);
            }
        }
        Module["RegisteredPointer_destructor"] = RegisteredPointer_destructor;
        function RegisteredPointer_deleteObject(handle) {
            if (handle !== null) {
                handle["delete"]();
            }
        }
        Module["RegisteredPointer_deleteObject"] =
            RegisteredPointer_deleteObject;
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
        Module["downcastPointer"] = downcastPointer;
        function getInheritedInstanceCount() {
            return Object.keys(registeredInstances).length;
        }
        Module["getInheritedInstanceCount"] = getInheritedInstanceCount;
        function getLiveInheritedInstances() {
            var rv = [];
            for (var k in registeredInstances) {
                if (registeredInstances.hasOwnProperty(k)) {
                    rv.push(registeredInstances[k]);
                }
            }
            return rv;
        }
        Module["getLiveInheritedInstances"] = getLiveInheritedInstances;
        function setDelayFunction(fn) {
            delayFunction = fn;
            if (deletionQueue.length && delayFunction) {
                delayFunction(flushPendingDeletes);
            }
        }
        Module["setDelayFunction"] = setDelayFunction;
        function init_embind() {
            Module["getInheritedInstanceCount"] = getInheritedInstanceCount;
            Module["getLiveInheritedInstances"] = getLiveInheritedInstances;
            Module["flushPendingDeletes"] = flushPendingDeletes;
            Module["setDelayFunction"] = setDelayFunction;
        }
        Module["init_embind"] = init_embind;
        var registeredInstances = {};
        Module["registeredInstances"] = registeredInstances;
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
        Module["getBasestPointer"] = getBasestPointer;
        function getInheritedInstance(class_, ptr) {
            ptr = getBasestPointer(class_, ptr);
            return registeredInstances[ptr];
        }
        Module["getInheritedInstance"] = getInheritedInstance;
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
        Module["makeClassHandle"] = makeClassHandle;
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
        Module["RegisteredPointer_fromWireType"] =
            RegisteredPointer_fromWireType;
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
        Module["init_RegisteredPointer"] = init_RegisteredPointer;
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
        Module["RegisteredPointer"] = RegisteredPointer;
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
        Module["replacePublicSymbol"] = replacePublicSymbol;
        function getDynCaller(sig, ptr) {
            var argCache = [];
            return function () {
                argCache.length = arguments.length;
                for (var i = 0; i < arguments.length; i++) {
                    argCache[i] = arguments[i];
                }
                return dynCall(sig, ptr, argCache);
            };
        }
        Module["getDynCaller"] = getDynCaller;
        function embind__requireFunction(signature, rawFunction) {
            signature = readLatin1String(signature);
            function makeDynCaller() {
                if (signature.includes("j")) {
                    return getDynCaller(signature, rawFunction);
                }
                return getWasmTableEntry(rawFunction);
            }
            var fp = makeDynCaller();
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
        Module["embind__requireFunction"] = embind__requireFunction;
        var UnboundTypeError = undefined;
        Module["UnboundTypeError"] = UnboundTypeError;
        function getTypeName(type) {
            var ptr = ___getTypeName(type);
            var rv = readLatin1String(ptr);
            _free(ptr);
            return rv;
        }
        Module["getTypeName"] = getTypeName;
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
        Module["throwUnboundTypeError"] = throwUnboundTypeError;
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
        Module["__embind_register_class"] = __embind_register_class;
        function heap32VectorToArray(count, firstElement) {
            var array = [];
            for (var i = 0; i < count; i++) {
                array.push(HEAP32[(firstElement >> 2) + i]);
            }
            return array;
        }
        Module["heap32VectorToArray"] = heap32VectorToArray;
        function runDestructors(destructors) {
            while (destructors.length) {
                var ptr = destructors.pop();
                var del = destructors.pop();
                del(ptr);
            }
        }
        Module["runDestructors"] = runDestructors;
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
                            argTypes.splice(1, 0, null);
                            classType.registeredClass.constructor_body[
                                argCount - 1
                            ] = craftInvokerFunction(
                                humanName,
                                argTypes,
                                null,
                                invoker,
                                rawConstructor
                            );
                            return [];
                        }
                    );
                    return [];
                }
            );
        }
        Module["__embind_register_class_constructor"] =
            __embind_register_class_constructor;
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
        Module["new_"] = new_;
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
        Module["craftInvokerFunction"] = craftInvokerFunction;
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
                    if (methodName.startsWith("@@")) {
                        methodName = Symbol[methodName.substring(2)];
                    }
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
        Module["__embind_register_class_function"] =
            __embind_register_class_function;
        var emval_free_list = [];
        Module["emval_free_list"] = emval_free_list;
        var emval_handle_array = [
            {},
            { value: undefined },
            { value: null },
            { value: true },
            { value: false },
        ];
        Module["emval_handle_array"] = emval_handle_array;
        function __emval_decref(handle) {
            if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
                emval_handle_array[handle] = undefined;
                emval_free_list.push(handle);
            }
        }
        Module["__emval_decref"] = __emval_decref;
        __emval_decref.sig = "vi";
        function count_emval_handles() {
            var count = 0;
            for (var i = 5; i < emval_handle_array.length; ++i) {
                if (emval_handle_array[i] !== undefined) {
                    ++count;
                }
            }
            return count;
        }
        Module["count_emval_handles"] = count_emval_handles;
        function get_first_emval() {
            for (var i = 5; i < emval_handle_array.length; ++i) {
                if (emval_handle_array[i] !== undefined) {
                    return emval_handle_array[i];
                }
            }
            return null;
        }
        Module["get_first_emval"] = get_first_emval;
        function init_emval() {
            Module["count_emval_handles"] = count_emval_handles;
            Module["get_first_emval"] = get_first_emval;
        }
        Module["init_emval"] = init_emval;
        var Emval = {
            toValue: function (handle) {
                if (!handle) {
                    throwBindingError(
                        "Cannot use deleted val. handle = " + handle
                    );
                }
                return emval_handle_array[handle].value;
            },
            toHandle: function (value) {
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
                        emval_handle_array[handle] = {
                            refcount: 1,
                            value: value,
                        };
                        return handle;
                    }
                }
            },
        };
        Module["Emval"] = Emval;
        function __embind_register_emval(rawType, name) {
            name = readLatin1String(name);
            registerType(rawType, {
                name: name,
                fromWireType: function (handle) {
                    var rv = Emval.toValue(handle);
                    __emval_decref(handle);
                    return rv;
                },
                toWireType: function (destructors, value) {
                    return Emval.toHandle(value);
                },
                argPackAdvance: 8,
                readValueFromPointer: simpleReadValueFromPointer,
                destructorFunction: null,
            });
        }
        Module["__embind_register_emval"] = __embind_register_emval;
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
        Module["_embind_repr"] = _embind_repr;
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
        Module["floatReadValueFromPointer"] = floatReadValueFromPointer;
        function __embind_register_float(rawType, name, size) {
            var shift = getShiftFromSize(size);
            name = readLatin1String(name);
            registerType(rawType, {
                name: name,
                fromWireType: function (value) {
                    return value;
                },
                toWireType: function (destructors, value) {
                    return value;
                },
                argPackAdvance: 8,
                readValueFromPointer: floatReadValueFromPointer(name, shift),
                destructorFunction: null,
            });
        }
        Module["__embind_register_float"] = __embind_register_float;
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
        Module["integerReadValueFromPointer"] = integerReadValueFromPointer;
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
            var isUnsignedType = name.includes("unsigned");
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
        Module["__embind_register_integer"] = __embind_register_integer;
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
        Module["__embind_register_memory_view"] = __embind_register_memory_view;
        function __embind_register_std_string(rawType, name) {
            name = readLatin1String(name);
            var stdStringIsUTF8 = name === "std::string";
            registerType(rawType, {
                name: name,
                fromWireType: function (value) {
                    var length = HEAPU32[value >> 2];
                    var str;
                    if (stdStringIsUTF8) {
                        var decodeStartPtr = value + 4;
                        for (var i = 0; i <= length; ++i) {
                            var currentBytePtr = value + 4 + i;
                            if (i == length || HEAPU8[currentBytePtr] == 0) {
                                var maxRead = currentBytePtr - decodeStartPtr;
                                var stringSegment = UTF8ToString(
                                    decodeStartPtr,
                                    maxRead
                                );
                                if (str === undefined) {
                                    str = stringSegment;
                                } else {
                                    str += String.fromCharCode(0);
                                    str += stringSegment;
                                }
                                decodeStartPtr = currentBytePtr + 1;
                            }
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
        Module["__embind_register_std_string"] = __embind_register_std_string;
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
                    var decodeStartPtr = value + 4;
                    for (var i = 0; i <= length; ++i) {
                        var currentBytePtr = value + 4 + i * charSize;
                        if (i == length || HEAP[currentBytePtr >> shift] == 0) {
                            var maxReadBytes = currentBytePtr - decodeStartPtr;
                            var stringSegment = decodeString(
                                decodeStartPtr,
                                maxReadBytes
                            );
                            if (str === undefined) {
                                str = stringSegment;
                            } else {
                                str += String.fromCharCode(0);
                                str += stringSegment;
                            }
                            decodeStartPtr = currentBytePtr + charSize;
                        }
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
        Module["__embind_register_std_wstring"] = __embind_register_std_wstring;
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
        Module["__embind_register_void"] = __embind_register_void;
        function __emscripten_throw_longjmp() {
            throw "longjmp";
        }
        Module["__emscripten_throw_longjmp"] = __emscripten_throw_longjmp;
        __emscripten_throw_longjmp.sig = "v";
        function requireRegisteredType(rawType, humanName) {
            var impl = registeredTypes[rawType];
            if (undefined === impl) {
                throwBindingError(
                    humanName + " has unknown type " + getTypeName(rawType)
                );
            }
            return impl;
        }
        Module["requireRegisteredType"] = requireRegisteredType;
        function __emval_as(handle, returnType, destructorsRef) {
            handle = Emval.toValue(handle);
            returnType = requireRegisteredType(returnType, "emval::as");
            var destructors = [];
            var rd = Emval.toHandle(destructors);
            HEAP32[destructorsRef >> 2] = rd;
            return returnType["toWireType"](destructors, handle);
        }
        Module["__emval_as"] = __emval_as;
        __emval_as.sig = "iiii";
        function __emval_incref(handle) {
            if (handle > 4) {
                emval_handle_array[handle].refcount += 1;
            }
        }
        Module["__emval_incref"] = __emval_incref;
        __emval_incref.sig = "vi";
        function __emval_is_number(handle) {
            handle = Emval.toValue(handle);
            return typeof handle === "number";
        }
        Module["__emval_is_number"] = __emval_is_number;
        function __emval_run_destructors(handle) {
            var destructors = Emval.toValue(handle);
            runDestructors(destructors);
            __emval_decref(handle);
        }
        Module["__emval_run_destructors"] = __emval_run_destructors;
        __emval_run_destructors.sig = "vi";
        function __emval_take_value(type, argv) {
            type = requireRegisteredType(type, "_emval_take_value");
            var v = type["readValueFromPointer"](argv);
            return Emval.toHandle(v);
        }
        Module["__emval_take_value"] = __emval_take_value;
        __emval_take_value.sig = "iii";
        function _abort() {
            abort("");
        }
        Module["_abort"] = _abort;
        _abort.sig = "v";
        function _aes_gcm_decrypt() {
            return Module["_aes_gcm_decrypt"].apply(null, arguments);
        }
        function _aes_gcm_encrypt() {
            return Module["_aes_gcm_encrypt"].apply(null, arguments);
        }
        function _appendTiffPageWithTag() {
            return Module["_appendTiffPageWithTag"].apply(null, arguments);
        }
        function _clock() {
            if (_clock.start === undefined) _clock.start = Date.now();
            return ((Date.now() - _clock.start) * (1e6 / 1e3)) | 0;
        }
        Module["_clock"] = _clock;
        _clock.sig = "i";
        var _emscripten_get_now;
        if (ENVIRONMENT_IS_NODE) {
            _emscripten_get_now = function () {
                var t = process["hrtime"]();
                return t[0] * 1e3 + t[1] / 1e6;
            };
        } else
            _emscripten_get_now = function () {
                return performance.now();
            };
        Module["_emscripten_get_now"] = _emscripten_get_now;
        var _emscripten_get_now_is_monotonic = true;
        Module["_emscripten_get_now_is_monotonic"] =
            _emscripten_get_now_is_monotonic;
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
        Module["_clock_gettime"] = _clock_gettime;
        _clock_gettime.sig = "iii";
        function _closeTiff() {
            return Module["_closeTiff"].apply(null, arguments);
        }
        function _difftime(time1, time0) {
            return time1 - time0;
        }
        Module["_difftime"] = _difftime;
        _difftime.sig = "dii";
        function _ds_destroy_file() {
            return Module["_ds_destroy_file"].apply(null, arguments);
        }
        function _ds_get_file() {
            return Module["_ds_get_file"].apply(null, arguments);
        }
        function _dynamFindMemoryFormatStream() {
            return Module["_dynamFindMemoryFormatStream"].apply(
                null,
                arguments
            );
        }
        function _emscripten_get_heap_max() {
            return 2147483648;
        }
        Module["_emscripten_get_heap_max"] = _emscripten_get_heap_max;
        function _emscripten_memcpy_big(dest, src, num) {
            HEAPU8.copyWithin(dest, src, src + num);
        }
        Module["_emscripten_memcpy_big"] = _emscripten_memcpy_big;
        function emscripten_realloc_buffer(size) {
            try {
                wasmMemory.grow((size - buffer.byteLength + 65535) >>> 16);
                updateGlobalBufferAndViews(wasmMemory.buffer);
                return 1;
            } catch (e) {}
        }
        Module["emscripten_realloc_buffer"] = emscripten_realloc_buffer;
        function _emscripten_resize_heap(requestedSize) {
            var oldSize = HEAPU8.length;
            requestedSize = requestedSize >>> 0;
            var maxHeapSize = 2147483648;
            if (requestedSize > maxHeapSize) {
                return false;
            }
            for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
                var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
                overGrownHeapSize = Math.min(
                    overGrownHeapSize,
                    requestedSize + 100663296
                );
                var newSize = Math.min(
                    maxHeapSize,
                    alignUp(Math.max(requestedSize, overGrownHeapSize), 65536)
                );
                var replacement = emscripten_realloc_buffer(newSize);
                if (replacement) {
                    return true;
                }
            }
            return false;
        }
        Module["_emscripten_resize_heap"] = _emscripten_resize_heap;
        function _emscripten_run_script_string(ptr) {
            var s = eval(UTF8ToString(ptr));
            if (s == null) {
                return 0;
            }
            s += "";
            var me = _emscripten_run_script_string;
            var len = lengthBytesUTF8(s);
            if (!me.bufferSize || me.bufferSize < len + 1) {
                if (me.bufferSize) _emscripten_builtin_free(me.buffer);
                me.bufferSize = len + 1;
                me.buffer = _emscripten_builtin_malloc(me.bufferSize);
            }
            stringToUTF8(s, me.buffer, me.bufferSize);
            return me.buffer;
        }
        Module["_emscripten_run_script_string"] = _emscripten_run_script_string;
        _emscripten_run_script_string.sig = "ii";
        function _endTiffWriter() {
            return Module["_endTiffWriter"].apply(null, arguments);
        }
        var ENV = {};
        Module["ENV"] = ENV;
        function getExecutableName() {
            return thisProgram || "./this.program";
        }
        Module["getExecutableName"] = getExecutableName;
        function getEnvStrings() {
            if (!getEnvStrings.strings) {
                var lang =
                    (
                        (typeof navigator === "object" &&
                            navigator.languages &&
                            navigator.languages[0]) ||
                        "C"
                    ).replace("-", "_") + ".UTF-8";
                var env = {
                    USER: "web_user",
                    LOGNAME: "web_user",
                    PATH: "/",
                    PWD: "/",
                    HOME: "/home/web_user",
                    LANG: lang,
                    _: getExecutableName(),
                };
                for (var x in ENV) {
                    if (ENV[x] === undefined) delete env[x];
                    else env[x] = ENV[x];
                }
                var strings = [];
                for (var x in env) {
                    strings.push(x + "=" + env[x]);
                }
                getEnvStrings.strings = strings;
            }
            return getEnvStrings.strings;
        }
        Module["getEnvStrings"] = getEnvStrings;
        function _environ_get(__environ, environ_buf) {
            var bufSize = 0;
            getEnvStrings().forEach(function (string, i) {
                var ptr = environ_buf + bufSize;
                HEAP32[(__environ + i * 4) >> 2] = ptr;
                writeAsciiToMemory(string, ptr);
                bufSize += string.length + 1;
            });
            return 0;
        }
        Module["_environ_get"] = _environ_get;
        _environ_get.sig = "iii";
        function _environ_sizes_get(penviron_count, penviron_buf_size) {
            var strings = getEnvStrings();
            HEAP32[penviron_count >> 2] = strings.length;
            var bufSize = 0;
            strings.forEach(function (string) {
                bufSize += string.length + 1;
            });
            HEAP32[penviron_buf_size >> 2] = bufSize;
            return 0;
        }
        Module["_environ_sizes_get"] = _environ_sizes_get;
        _environ_sizes_get.sig = "iii";
        function _exit(status) {
            exit(status);
        }
        Module["_exit"] = _exit;
        _exit.sig = "vi";
        function _fd_close(fd) {
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                FS.close(stream);
                return 0;
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return e.errno;
            }
        }
        Module["_fd_close"] = _fd_close;
        _fd_close.sig = "ii";
        function _fd_read(fd, iov, iovcnt, pnum) {
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                var num = SYSCALLS.doReadv(stream, iov, iovcnt);
                HEAP32[pnum >> 2] = num;
                return 0;
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return e.errno;
            }
        }
        Module["_fd_read"] = _fd_read;
        _fd_read.sig = "iiiii";
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
                    +Math.abs(tempDouble) >= 1
                        ? tempDouble > 0
                            ? (Math.min(
                                  +Math.floor(tempDouble / 4294967296),
                                  4294967295
                              ) |
                                  0) >>>
                              0
                            : ~~+Math.ceil(
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
                    throw e;
                return e.errno;
            }
        }
        Module["_fd_seek"] = _fd_seek;
        function _fd_write(fd, iov, iovcnt, pnum) {
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                var num = SYSCALLS.doWritev(stream, iov, iovcnt);
                HEAP32[pnum >> 2] = num;
                return 0;
            } catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return e.errno;
            }
        }
        Module["_fd_write"] = _fd_write;
        _fd_write.sig = "iiiii";
        function _getTempRet0() {
            return getTempRet0();
        }
        Module["_getTempRet0"] = _getTempRet0;
        _getTempRet0.sig = "i";
        function _gettimeofday(ptr) {
            var now = Date.now();
            HEAP32[ptr >> 2] = (now / 1e3) | 0;
            HEAP32[(ptr + 4) >> 2] = ((now % 1e3) * 1e3) | 0;
            return 0;
        }
        Module["_gettimeofday"] = _gettimeofday;
        _gettimeofday.sig = "iii";
        function _loadOnepageImageFromMem() {
            return Module["_loadOnepageImageFromMem"].apply(null, arguments);
        }
        function _loadOnepageRGBAFromMem() {
            return Module["_loadOnepageRGBAFromMem"].apply(null, arguments);
        }
        function _loadTiffFromMem() {
            return Module["_loadTiffFromMem"].apply(null, arguments);
        }
        function _mktime(tmPtr) {
            _tzset();
            var date = new Date(
                HEAP32[(tmPtr + 20) >> 2] + 1900,
                HEAP32[(tmPtr + 16) >> 2],
                HEAP32[(tmPtr + 12) >> 2],
                HEAP32[(tmPtr + 8) >> 2],
                HEAP32[(tmPtr + 4) >> 2],
                HEAP32[tmPtr >> 2],
                0
            );
            var dst = HEAP32[(tmPtr + 32) >> 2];
            var guessedOffset = date.getTimezoneOffset();
            var start = new Date(date.getFullYear(), 0, 1);
            var summerOffset = new Date(
                date.getFullYear(),
                6,
                1
            ).getTimezoneOffset();
            var winterOffset = start.getTimezoneOffset();
            var dstOffset = Math.min(winterOffset, summerOffset);
            if (dst < 0) {
                HEAP32[(tmPtr + 32) >> 2] = Number(
                    summerOffset != winterOffset && dstOffset == guessedOffset
                );
            } else if (dst > 0 != (dstOffset == guessedOffset)) {
                var nonDstOffset = Math.max(winterOffset, summerOffset);
                var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
                date.setTime(
                    date.getTime() + (trueOffset - guessedOffset) * 6e4
                );
            }
            HEAP32[(tmPtr + 24) >> 2] = date.getDay();
            var yday =
                ((date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) | 0;
            HEAP32[(tmPtr + 28) >> 2] = yday;
            HEAP32[tmPtr >> 2] = date.getSeconds();
            HEAP32[(tmPtr + 4) >> 2] = date.getMinutes();
            HEAP32[(tmPtr + 8) >> 2] = date.getHours();
            HEAP32[(tmPtr + 12) >> 2] = date.getDate();
            HEAP32[(tmPtr + 16) >> 2] = date.getMonth();
            return (date.getTime() / 1e3) | 0;
        }
        Module["_mktime"] = _mktime;
        _mktime.sig = "ii";
        function _newTiffMem() {
            return Module["_newTiffMem"].apply(null, arguments);
        }
        function _readTiffMetaData() {
            return Module["_readTiffMetaData"].apply(null, arguments);
        }
        function _readTiffPage() {
            return Module["_readTiffPage"].apply(null, arguments);
        }
        function _saveDIBAsBMPV2() {
            return Module["_saveDIBAsBMPV2"].apply(null, arguments);
        }
        function _setTempRet0(val) {
            setTempRet0(val);
        }
        Module["_setTempRet0"] = _setTempRet0;
        _setTempRet0.sig = "vi";
        function __isLeapYear(year) {
            return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        }
        Module["__isLeapYear"] = __isLeapYear;
        function __arraySum(array, index) {
            var sum = 0;
            for (var i = 0; i <= index; sum += array[i++]) {}
            return sum;
        }
        Module["__arraySum"] = __arraySum;
        var __MONTH_DAYS_LEAP = [
            31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
        ];
        Module["__MONTH_DAYS_LEAP"] = __MONTH_DAYS_LEAP;
        var __MONTH_DAYS_REGULAR = [
            31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
        ];
        Module["__MONTH_DAYS_REGULAR"] = __MONTH_DAYS_REGULAR;
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
        Module["__addDays"] = __addDays;
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
                if (pattern.includes(rule)) {
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
        Module["_strftime"] = _strftime;
        _strftime.sig = "iiiii";
        function _strftime_l(s, maxsize, format, tm) {
            return _strftime(s, maxsize, format, tm);
        }
        Module["_strftime_l"] = _strftime_l;
        function _time(ptr) {
            var ret = (Date.now() / 1e3) | 0;
            if (ptr) {
                HEAP32[ptr >> 2] = ret;
            }
            return ret;
        }
        Module["_time"] = _time;
        _time.sig = "ii";
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
        var asmLibraryArg = {
            AddAnnotationToPage: _AddAnnotationToPage,
            AddDIBToPage: _AddDIBToPage,
            AddImageToPage: _AddImageToPage,
            AddImageWatermarkToPage: _AddImageWatermarkToPage,
            AddPathToPage: _AddPathToPage,
            AddPdfPage: _AddPdfPage,
            AddTextToPage: _AddTextToPage,
            CreatePageFromImageDIB: _CreatePageFromImageDIB,
            CreatePageFromImageFileStream: _CreatePageFromImageFileStream,
            DIBChangeBitDepth: _DIBChangeBitDepth,
            DIBtoRGBA: _DIBtoRGBA,
            DestroyDynamImageProc: _DestroyDynamImageProc,
            DynamImageProcAutoBrightnessAndContrast:
                _DynamImageProcAutoBrightnessAndContrast,
            DynamImageProcChangeBrightnessAndContrast:
                _DynamImageProcChangeBrightnessAndContrast,
            DynamImageProcColorFilter: _DynamImageProcColorFilter,
            DynamImageProcConvert: _DynamImageProcConvert,
            DynamImageProcConvertToBWScale: _DynamImageProcConvertToBWScale,
            DynamImageProcConvertToGrayScale: _DynamImageProcConvertToGrayScale,
            DynamImageProcCrop: _DynamImageProcCrop,
            DynamImageProcDocumentDetect: _DynamImageProcDocumentDetect,
            DynamImageProcDrawQuadrangle: _DynamImageProcDrawQuadrangle,
            DynamImageProcEqualize: _DynamImageProcEqualize,
            DynamImageProcErase: _DynamImageProcErase,
            DynamImageProcGetBlurryScore: _DynamImageProcGetBlurryScore,
            DynamImageProcGetBrightnessScore: _DynamImageProcGetBrightnessScore,
            DynamImageProcGetDataPointer: _DynamImageProcGetDataPointer,
            DynamImageProcGetErrorString: _DynamImageProcGetErrorString,
            DynamImageProcGetHeight: _DynamImageProcGetHeight,
            DynamImageProcGetSkewAngle: _DynamImageProcGetSkewAngle,
            DynamImageProcGetWidth: _DynamImageProcGetWidth,
            DynamImageProcInvert: _DynamImageProcInvert,
            DynamImageProcNormalize: _DynamImageProcNormalize,
            DynamImageProcPerspective: _DynamImageProcPerspective,
            DynamImageProcResize: _DynamImageProcResize,
            DynamImageProcRotateEX: _DynamImageProcRotateEX,
            DynamImageProcRotateFlipType: _DynamImageProcRotateFlipType,
            DynamImageProcSave: _DynamImageProcSave,
            DynamImageProcSetDPI: _DynamImageProcSetDPI,
            DynamImageProcSetDebugMode: _DynamImageProcSetDebugMode,
            DynamImageProcSetImageHeight: _DynamImageProcSetImageHeight,
            DynamImageProcSetImageWidth: _DynamImageProcSetImageWidth,
            DynamImageProcShadowRemovel: _DynamImageProcShadowRemovel,
            EndWritePdfPage: _EndWritePdfPage,
            FreeWatermarkAndFormXObject: _FreeWatermarkAndFormXObject,
            GetDIBMetaData: _GetDIBMetaData,
            GetDynamImageProcWasmVersion: _GetDynamImageProcWasmVersion,
            GetDynamicImageCoreWasmVersion: _GetDynamicImageCoreWasmVersion,
            GetDynamicPdfWWasmVersion: _GetDynamicPdfWWasmVersion,
            GetImageMetaData: _GetImageMetaData,
            GetJPEGExifData: _GetJPEGExifData,
            GetJPEGMetaData: _GetJPEGMetaData,
            GetPdfStream: _GetPdfStream,
            InitDynamImageProc: _InitDynamImageProc,
            NewImageWatermark: _NewImageWatermark,
            NewWatermarkFormXObject: _NewWatermarkFormXObject,
            PDFInitFromJsonString: _PDFInitFromJsonString,
            RGBAtoDIB: _RGBAtoDIB,
            ReleasePdf: _ReleasePdf,
            RotateJPEGByExif: _RotateJPEGByExif,
            SaveDIBtoJPEG: _SaveDIBtoJPEG,
            SaveDIBtoPNG: _SaveDIBtoPNG,
            SaveRGBA_BGRAtoJPEG: _SaveRGBA_BGRAtoJPEG,
            SaveRGBA_BGRAtoPNG: _SaveRGBA_BGRAtoPNG,
            SetPdfPageRotate: _SetPdfPageRotate,
            __cxa_allocate_exception: ___cxa_allocate_exception,
            __cxa_throw: ___cxa_throw,
            __gmtime_r: ___gmtime_r,
            __heap_base: ___heap_base,
            __indirect_function_table: wasmTable,
            __localtime_r: ___localtime_r,
            __memory_base: ___memory_base,
            __stack_pointer: ___stack_pointer,
            __syscall_fcntl64: ___syscall_fcntl64,
            __syscall_fstat64: ___syscall_fstat64,
            __syscall_fstatat64: ___syscall_fstatat64,
            __syscall_getdents64: ___syscall_getdents64,
            __syscall_getegid32: ___syscall_getegid32,
            __syscall_geteuid32: ___syscall_geteuid32,
            __syscall_getgid32: ___syscall_getgid32,
            __syscall_getuid32: ___syscall_getuid32,
            __syscall_ioctl: ___syscall_ioctl,
            __syscall_lstat64: ___syscall_lstat64,
            __syscall_mmap2: ___syscall_mmap2,
            __syscall_munmap: ___syscall_munmap,
            __syscall_open: ___syscall_open,
            __syscall_stat64: ___syscall_stat64,
            __table_base: ___table_base,
            _embind_register_bigint: __embind_register_bigint,
            _embind_register_bool: __embind_register_bool,
            _embind_register_class: __embind_register_class,
            _embind_register_class_constructor:
                __embind_register_class_constructor,
            _embind_register_class_function: __embind_register_class_function,
            _embind_register_emval: __embind_register_emval,
            _embind_register_float: __embind_register_float,
            _embind_register_integer: __embind_register_integer,
            _embind_register_memory_view: __embind_register_memory_view,
            _embind_register_std_string: __embind_register_std_string,
            _embind_register_std_wstring: __embind_register_std_wstring,
            _embind_register_void: __embind_register_void,
            _emscripten_throw_longjmp: __emscripten_throw_longjmp,
            _emval_as: __emval_as,
            _emval_decref: __emval_decref,
            _emval_incref: __emval_incref,
            _emval_is_number: __emval_is_number,
            _emval_run_destructors: __emval_run_destructors,
            _emval_take_value: __emval_take_value,
            abort: _abort,
            aes_gcm_decrypt: _aes_gcm_decrypt,
            aes_gcm_encrypt: _aes_gcm_encrypt,
            appendTiffPageWithTag: _appendTiffPageWithTag,
            closeTiff: _closeTiff,
            ds_destroy_file: _ds_destroy_file,
            ds_get_file: _ds_get_file,
            dynamFindMemoryFormatStream: _dynamFindMemoryFormatStream,
            emscripten_get_heap_max: _emscripten_get_heap_max,
            emscripten_memcpy_big: _emscripten_memcpy_big,
            emscripten_resize_heap: _emscripten_resize_heap,
            emscripten_run_script_string: _emscripten_run_script_string,
            endTiffWriter: _endTiffWriter,
            environ_get: _environ_get,
            environ_sizes_get: _environ_sizes_get,
            fd_close: _fd_close,
            fd_read: _fd_read,
            fd_seek: _fd_seek,
            fd_write: _fd_write,
            gettimeofday: _gettimeofday,
            loadOnepageImageFromMem: _loadOnepageImageFromMem,
            loadOnepageRGBAFromMem: _loadOnepageRGBAFromMem,
            loadTiffFromMem: _loadTiffFromMem,
            memory: wasmMemory,
            newTiffMem: _newTiffMem,
            readTiffMetaData: _readTiffMetaData,
            readTiffPage: _readTiffPage,
            saveDIBAsBMPV2: _saveDIBAsBMPV2,
            setTempRet0: _setTempRet0,
            strftime_l: _strftime_l,
            time: _time,
        };
        var asm = createWasm();
        var ___wasm_call_ctors = (Module["___wasm_call_ctors"] = function () {
            return (___wasm_call_ctors = Module["___wasm_call_ctors"] =
                Module["asm"]["__wasm_call_ctors"]).apply(null, arguments);
        });
        var __Znam = (Module["__Znam"] = function () {
            return (__Znam = Module["__Znam"] = Module["asm"]["_Znam"]).apply(
                null,
                arguments
            );
        });
        var __ZdaPv = (Module["__ZdaPv"] = function () {
            return (__ZdaPv = Module["__ZdaPv"] =
                Module["asm"]["_ZdaPv"]).apply(null, arguments);
        });
        var _toupper = (Module["_toupper"] = function () {
            return (_toupper = Module["_toupper"] =
                Module["asm"]["toupper"]).apply(null, arguments);
        });
        var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc =
            (Module[
                "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc"
            ] = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc =
                    Module[
                        "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc"
                    ] =
                        Module["asm"][
                            "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__2plIcNS_11char_traitsIcEENS_9allocatorIcEEEENS_12basic_stringIT_T0_T1_EEPKS6_RKS9_ =
            (Module[
                "__ZNSt3__2plIcNS_11char_traitsIcEENS_9allocatorIcEEEENS_12basic_stringIT_T0_T1_EEPKS6_RKS9_"
            ] = function () {
                return (__ZNSt3__2plIcNS_11char_traitsIcEENS_9allocatorIcEEEENS_12basic_stringIT_T0_T1_EEPKS6_RKS9_ =
                    Module[
                        "__ZNSt3__2plIcNS_11char_traitsIcEENS_9allocatorIcEEEENS_12basic_stringIT_T0_T1_EEPKS6_RKS9_"
                    ] =
                        Module["asm"][
                            "_ZNSt3__2plIcNS_11char_traitsIcEENS_9allocatorIcEEEENS_12basic_stringIT_T0_T1_EEPKS6_RKS9_"
                        ]).apply(null, arguments);
            });
        var _rand = (Module["_rand"] = function () {
            return (_rand = Module["_rand"] = Module["asm"]["rand"]).apply(
                null,
                arguments
            );
        });
        var __ZdlPv = (Module["__ZdlPv"] = function () {
            return (__ZdlPv = Module["__ZdlPv"] =
                Module["asm"]["_ZdlPv"]).apply(null, arguments);
        });
        var _memcmp = (Module["_memcmp"] = function () {
            return (_memcmp = Module["_memcmp"] =
                Module["asm"]["memcmp"]).apply(null, arguments);
        });
        var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6appendEPKcm =
            (Module[
                "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6appendEPKcm"
            ] = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6appendEPKcm =
                    Module[
                        "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6appendEPKcm"
                    ] =
                        Module["asm"][
                            "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6appendEPKcm"
                        ]).apply(null, arguments);
            });
        var __ZNKSt3__221__basic_string_commonILb1EE20__throw_length_errorEv =
            (Module[
                "__ZNKSt3__221__basic_string_commonILb1EE20__throw_length_errorEv"
            ] = function () {
                return (__ZNKSt3__221__basic_string_commonILb1EE20__throw_length_errorEv =
                    Module[
                        "__ZNKSt3__221__basic_string_commonILb1EE20__throw_length_errorEv"
                    ] =
                        Module["asm"][
                            "_ZNKSt3__221__basic_string_commonILb1EE20__throw_length_errorEv"
                        ]).apply(null, arguments);
            });
        var __Znwm = (Module["__Znwm"] = function () {
            return (__Znwm = Module["__Znwm"] = Module["asm"]["_Znwm"]).apply(
                null,
                arguments
            );
        });
        var _strlen = (Module["_strlen"] = function () {
            return (_strlen = Module["_strlen"] =
                Module["asm"]["strlen"]).apply(null, arguments);
        });
        var _siprintf = (Module["_siprintf"] = function () {
            return (_siprintf = Module["_siprintf"] =
                Module["asm"]["siprintf"]).apply(null, arguments);
        });
        var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6appendEPKc =
            (Module[
                "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6appendEPKc"
            ] = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6appendEPKc =
                    Module[
                        "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6appendEPKc"
                    ] =
                        Module["asm"][
                            "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6appendEPKc"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6insertEmPKc =
            (Module[
                "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6insertEmPKc"
            ] = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6insertEmPKc =
                    Module[
                        "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6insertEmPKc"
                    ] =
                        Module["asm"][
                            "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6insertEmPKc"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm =
            (Module[
                "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm"
            ] = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm =
                    Module[
                        "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm"
                    ] =
                        Module["asm"][
                            "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm"
                        ]).apply(null, arguments);
            });
        var _tolower = (Module["_tolower"] = function () {
            return (_tolower = Module["_tolower"] =
                Module["asm"]["tolower"]).apply(null, arguments);
        });
        var __ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4findEcm =
            (Module[
                "__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4findEcm"
            ] = function () {
                return (__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4findEcm =
                    Module[
                        "__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4findEcm"
                    ] =
                        Module["asm"][
                            "_ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4findEcm"
                        ]).apply(null, arguments);
            });
        var _strcmp = (Module["_strcmp"] = function () {
            return (_strcmp = Module["_strcmp"] =
                Module["asm"]["strcmp"]).apply(null, arguments);
        });
        var __ZNSt12length_errorD1Ev = (Module["__ZNSt12length_errorD1Ev"] =
            function () {
                return (__ZNSt12length_errorD1Ev = Module[
                    "__ZNSt12length_errorD1Ev"
                ] =
                    Module["asm"]["_ZNSt12length_errorD1Ev"]).apply(
                    null,
                    arguments
                );
            });
        var __ZNSt11logic_errorC2EPKc = (Module["__ZNSt11logic_errorC2EPKc"] =
            function () {
                return (__ZNSt11logic_errorC2EPKc = Module[
                    "__ZNSt11logic_errorC2EPKc"
                ] =
                    Module["asm"]["_ZNSt11logic_errorC2EPKc"]).apply(
                    null,
                    arguments
                );
            });
        var __ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7compareEmmPKcm =
            (Module[
                "__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7compareEmmPKcm"
            ] = function () {
                return (__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7compareEmmPKcm =
                    Module[
                        "__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7compareEmmPKcm"
                    ] =
                        Module["asm"][
                            "_ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7compareEmmPKcm"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_externalEPKcm =
            (Module[
                "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_externalEPKcm"
            ] = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_externalEPKcm =
                    Module[
                        "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_externalEPKcm"
                    ] =
                        Module["asm"][
                            "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_externalEPKcm"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_externalEPKc =
            (Module[
                "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_externalEPKc"
            ] = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_externalEPKc =
                    Module[
                        "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_externalEPKc"
                    ] =
                        Module["asm"][
                            "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_externalEPKc"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE25__init_copy_ctor_externalEPKcm =
            (Module[
                "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE25__init_copy_ctor_externalEPKcm"
            ] = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE25__init_copy_ctor_externalEPKcm =
                    Module[
                        "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE25__init_copy_ctor_externalEPKcm"
                    ] =
                        Module["asm"][
                            "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE25__init_copy_ctor_externalEPKcm"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_no_aliasILb1EEERS5_PKcm =
            (Module[
                "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_no_aliasILb1EEERS5_PKcm"
            ] = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_no_aliasILb1EEERS5_PKcm =
                    Module[
                        "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_no_aliasILb1EEERS5_PKcm"
                    ] =
                        Module["asm"][
                            "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_no_aliasILb1EEERS5_PKcm"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_no_aliasILb0EEERS5_PKcm =
            (Module[
                "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_no_aliasILb0EEERS5_PKcm"
            ] = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_no_aliasILb0EEERS5_PKcm =
                    Module[
                        "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_no_aliasILb0EEERS5_PKcm"
                    ] =
                        Module["asm"][
                            "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_no_aliasILb0EEERS5_PKcm"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEC1ERKS5_mmRKS4_ =
            (Module[
                "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEC1ERKS5_mmRKS4_"
            ] = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEC1ERKS5_mmRKS4_ =
                    Module[
                        "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEC1ERKS5_mmRKS4_"
                    ] =
                        Module["asm"][
                            "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEC1ERKS5_mmRKS4_"
                        ]).apply(null, arguments);
            });
        var _memchr = (Module["_memchr"] = function () {
            return (_memchr = Module["_memchr"] =
                Module["asm"]["memchr"]).apply(null, arguments);
        });
        var __ZNKSt3__220__vector_base_commonILb1EE20__throw_length_errorEv =
            (Module[
                "__ZNKSt3__220__vector_base_commonILb1EE20__throw_length_errorEv"
            ] = function () {
                return (__ZNKSt3__220__vector_base_commonILb1EE20__throw_length_errorEv =
                    Module[
                        "__ZNKSt3__220__vector_base_commonILb1EE20__throw_length_errorEv"
                    ] =
                        Module["asm"][
                            "_ZNKSt3__220__vector_base_commonILb1EE20__throw_length_errorEv"
                        ]).apply(null, arguments);
            });
        var _strncmp = (Module["_strncmp"] = function () {
            return (_strncmp = Module["_strncmp"] =
                Module["asm"]["strncmp"]).apply(null, arguments);
        });
        var _snprintf = (Module["_snprintf"] = function () {
            return (_snprintf = Module["_snprintf"] =
                Module["asm"]["snprintf"]).apply(null, arguments);
        });
        var _localtime = (Module["_localtime"] = function () {
            return (_localtime = Module["_localtime"] =
                Module["asm"]["localtime"]).apply(null, arguments);
        });
        var __ZNSt3__29to_stringEi = (Module["__ZNSt3__29to_stringEi"] =
            function () {
                return (__ZNSt3__29to_stringEi = Module[
                    "__ZNSt3__29to_stringEi"
                ] =
                    Module["asm"]["_ZNSt3__29to_stringEi"]).apply(
                    null,
                    arguments
                );
            });
        var _strtoul = (Module["_strtoul"] = function () {
            return (_strtoul = Module["_strtoul"] =
                Module["asm"]["strtoul"]).apply(null, arguments);
        });
        var _atoi = (Module["_atoi"] = function () {
            return (_atoi = Module["_atoi"] = Module["asm"]["atoi"]).apply(
                null,
                arguments
            );
        });
        var _free = (Module["_free"] = function () {
            return (_free = Module["_free"] = Module["asm"]["free"]).apply(
                null,
                arguments
            );
        });
        var _malloc = (Module["_malloc"] = function () {
            return (_malloc = Module["_malloc"] =
                Module["asm"]["malloc"]).apply(null, arguments);
        });
        var _calloc = (Module["_calloc"] = function () {
            return (_calloc = Module["_calloc"] =
                Module["asm"]["calloc"]).apply(null, arguments);
        });
        var ___errno_location = (Module["___errno_location"] = function () {
            return (___errno_location = Module["___errno_location"] =
                Module["asm"]["__errno_location"]).apply(null, arguments);
        });
        var _vsnprintf = (Module["_vsnprintf"] = function () {
            return (_vsnprintf = Module["_vsnprintf"] =
                Module["asm"]["vsnprintf"]).apply(null, arguments);
        });
        var _strcpy = (Module["_strcpy"] = function () {
            return (_strcpy = Module["_strcpy"] =
                Module["asm"]["strcpy"]).apply(null, arguments);
        });
        var _strncpy = (Module["_strncpy"] = function () {
            return (_strncpy = Module["_strncpy"] =
                Module["asm"]["strncpy"]).apply(null, arguments);
        });
        var _strtok = (Module["_strtok"] = function () {
            return (_strtok = Module["_strtok"] =
                Module["asm"]["strtok"]).apply(null, arguments);
        });
        var __ZNSt3__29to_stringEd = (Module["__ZNSt3__29to_stringEd"] =
            function () {
                return (__ZNSt3__29to_stringEd = Module[
                    "__ZNSt3__29to_stringEd"
                ] =
                    Module["asm"]["_ZNSt3__29to_stringEd"]).apply(
                    null,
                    arguments
                );
            });
        var __ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERd = (Module[
            "__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERd"
        ] = function () {
            return (__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERd =
                Module[
                    "__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERd"
                ] =
                    Module["asm"][
                        "_ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERd"
                    ]).apply(null, arguments);
        });
        var ___cxa_guard_acquire = (Module["___cxa_guard_acquire"] =
            function () {
                return (___cxa_guard_acquire = Module["___cxa_guard_acquire"] =
                    Module["asm"]["__cxa_guard_acquire"]).apply(
                    null,
                    arguments
                );
            });
        var ___cxa_guard_release = (Module["___cxa_guard_release"] =
            function () {
                return (___cxa_guard_release = Module["___cxa_guard_release"] =
                    Module["asm"]["__cxa_guard_release"]).apply(
                    null,
                    arguments
                );
            });
        var __ZNSt3__29basic_iosIcNS_11char_traitsIcEEED2Ev = (Module[
            "__ZNSt3__29basic_iosIcNS_11char_traitsIcEEED2Ev"
        ] = function () {
            return (__ZNSt3__29basic_iosIcNS_11char_traitsIcEEED2Ev = Module[
                "__ZNSt3__29basic_iosIcNS_11char_traitsIcEEED2Ev"
            ] =
                Module["asm"][
                    "_ZNSt3__29basic_iosIcNS_11char_traitsIcEEED2Ev"
                ]).apply(null, arguments);
        });
        var __ZNSt3__213basic_istreamIcNS_11char_traitsIcEEED2Ev = (Module[
            "__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEED2Ev"
        ] = function () {
            return (__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEED2Ev =
                Module["__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEED2Ev"] =
                    Module["asm"][
                        "_ZNSt3__213basic_istreamIcNS_11char_traitsIcEEED2Ev"
                    ]).apply(null, arguments);
        });
        var __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEED2Ev = (Module[
            "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEED2Ev"
        ] = function () {
            return (__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEED2Ev =
                Module[
                    "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEED2Ev"
                ] =
                    Module["asm"][
                        "_ZNSt3__215basic_streambufIcNS_11char_traitsIcEEED2Ev"
                    ]).apply(null, arguments);
        });
        var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6resizeEmc =
            (Module[
                "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6resizeEmc"
            ] = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6resizeEmc =
                    Module[
                        "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6resizeEmc"
                    ] =
                        Module["asm"][
                            "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6resizeEmc"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEED2Ev = (Module[
            "__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEED2Ev"
        ] = function () {
            return (__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEED2Ev =
                Module["__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEED2Ev"] =
                    Module["asm"][
                        "_ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEED2Ev"
                    ]).apply(null, arguments);
        });
        var __ZNSt3__28ios_base5clearEj = (Module[
            "__ZNSt3__28ios_base5clearEj"
        ] = function () {
            return (__ZNSt3__28ios_base5clearEj = Module[
                "__ZNSt3__28ios_base5clearEj"
            ] =
                Module["asm"]["_ZNSt3__28ios_base5clearEj"]).apply(
                null,
                arguments
            );
        });
        var __ZNSt3__28ios_base4initEPv = (Module[
            "__ZNSt3__28ios_base4initEPv"
        ] = function () {
            return (__ZNSt3__28ios_base4initEPv = Module[
                "__ZNSt3__28ios_base4initEPv"
            ] =
                Module["asm"]["_ZNSt3__28ios_base4initEPv"]).apply(
                null,
                arguments
            );
        });
        var __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEEC2Ev = (Module[
            "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEEC2Ev"
        ] = function () {
            return (__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEEC2Ev =
                Module[
                    "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEEC2Ev"
                ] =
                    Module["asm"][
                        "_ZNSt3__215basic_streambufIcNS_11char_traitsIcEEEC2Ev"
                    ]).apply(null, arguments);
        });
        var __ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE3strERKNS_12basic_stringIcS2_S4_EE =
            (Module[
                "__ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE3strERKNS_12basic_stringIcS2_S4_EE"
            ] = function () {
                return (__ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE3strERKNS_12basic_stringIcS2_S4_EE =
                    Module[
                        "__ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE3strERKNS_12basic_stringIcS2_S4_EE"
                    ] =
                        Module["asm"][
                            "_ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE3strERKNS_12basic_stringIcS2_S4_EE"
                        ]).apply(null, arguments);
            });
        var __ZNKSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE3strEv =
            (Module[
                "__ZNKSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE3strEv"
            ] = function () {
                return (__ZNKSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE3strEv =
                    Module[
                        "__ZNKSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE3strEv"
                    ] =
                        Module["asm"][
                            "_ZNKSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE3strEv"
                        ]).apply(null, arguments);
            });
        var __ZNSt9exceptionD2Ev = (Module["__ZNSt9exceptionD2Ev"] =
            function () {
                return (__ZNSt9exceptionD2Ev = Module["__ZNSt9exceptionD2Ev"] =
                    Module["asm"]["_ZNSt9exceptionD2Ev"]).apply(
                    null,
                    arguments
                );
            });
        var _modf = (Module["_modf"] = function () {
            return (_modf = Module["_modf"] = Module["asm"]["modf"]).apply(
                null,
                arguments
            );
        });
        var __ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE6sentryC1ERS3_ =
            (Module[
                "__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE6sentryC1ERS3_"
            ] = function () {
                return (__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE6sentryC1ERS3_ =
                    Module[
                        "__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE6sentryC1ERS3_"
                    ] =
                        Module["asm"][
                            "_ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE6sentryC1ERS3_"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE6sentryD1Ev =
            (Module[
                "__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE6sentryD1Ev"
            ] = function () {
                return (__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE6sentryD1Ev =
                    Module[
                        "__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE6sentryD1Ev"
                    ] =
                        Module["asm"][
                            "_ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE6sentryD1Ev"
                        ]).apply(null, arguments);
            });
        var __ZNKSt3__28ios_base6getlocEv = (Module[
            "__ZNKSt3__28ios_base6getlocEv"
        ] = function () {
            return (__ZNKSt3__28ios_base6getlocEv = Module[
                "__ZNKSt3__28ios_base6getlocEv"
            ] =
                Module["asm"]["_ZNKSt3__28ios_base6getlocEv"]).apply(
                null,
                arguments
            );
        });
        var __ZNSt3__26localeD1Ev = (Module["__ZNSt3__26localeD1Ev"] =
            function () {
                return (__ZNSt3__26localeD1Ev = Module[
                    "__ZNSt3__26localeD1Ev"
                ] =
                    Module["asm"]["_ZNSt3__26localeD1Ev"]).apply(
                    null,
                    arguments
                );
            });
        var __ZNKSt3__26locale9use_facetERNS0_2idE = (Module[
            "__ZNKSt3__26locale9use_facetERNS0_2idE"
        ] = function () {
            return (__ZNKSt3__26locale9use_facetERNS0_2idE = Module[
                "__ZNKSt3__26locale9use_facetERNS0_2idE"
            ] =
                Module["asm"]["_ZNKSt3__26locale9use_facetERNS0_2idE"]).apply(
                null,
                arguments
            );
        });
        var ___fpclassify = (Module["___fpclassify"] = function () {
            return (___fpclassify = Module["___fpclassify"] =
                Module["asm"]["__fpclassify"]).apply(null, arguments);
        });
        var ___cxa_pure_virtual = (Module["___cxa_pure_virtual"] = function () {
            return (___cxa_pure_virtual = Module["___cxa_pure_virtual"] =
                Module["asm"]["__cxa_pure_virtual"]).apply(null, arguments);
        });
        var __ZNKSt3__221__basic_string_commonILb1EE20__throw_out_of_rangeEv =
            (Module[
                "__ZNKSt3__221__basic_string_commonILb1EE20__throw_out_of_rangeEv"
            ] = function () {
                return (__ZNKSt3__221__basic_string_commonILb1EE20__throw_out_of_rangeEv =
                    Module[
                        "__ZNKSt3__221__basic_string_commonILb1EE20__throw_out_of_rangeEv"
                    ] =
                        Module["asm"][
                            "_ZNKSt3__221__basic_string_commonILb1EE20__throw_out_of_rangeEv"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE26__erase_external_with_moveEmm =
            (Module[
                "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE26__erase_external_with_moveEmm"
            ] = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE26__erase_external_with_moveEmm =
                    Module[
                        "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE26__erase_external_with_moveEmm"
                    ] =
                        Module["asm"][
                            "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE26__erase_external_with_moveEmm"
                        ]).apply(null, arguments);
            });
        var ___getTypeName = (Module["___getTypeName"] = function () {
            return (___getTypeName = Module["___getTypeName"] =
                Module["asm"]["__getTypeName"]).apply(null, arguments);
        });
        var ___embind_register_native_and_builtin_types = (Module[
            "___embind_register_native_and_builtin_types"
        ] = function () {
            return (___embind_register_native_and_builtin_types = Module[
                "___embind_register_native_and_builtin_types"
            ] =
                Module["asm"][
                    "__embind_register_native_and_builtin_types"
                ]).apply(null, arguments);
        });
        var _emscripten_main_thread_process_queued_calls = (Module[
            "_emscripten_main_thread_process_queued_calls"
        ] = function () {
            return (_emscripten_main_thread_process_queued_calls = Module[
                "_emscripten_main_thread_process_queued_calls"
            ] =
                Module["asm"][
                    "emscripten_main_thread_process_queued_calls"
                ]).apply(null, arguments);
        });
        var _pthread_mutex_init = (Module["_pthread_mutex_init"] = function () {
            return (_pthread_mutex_init = Module["_pthread_mutex_init"] =
                Module["asm"]["pthread_mutex_init"]).apply(null, arguments);
        });
        var _pthread_mutex_destroy = (Module["_pthread_mutex_destroy"] =
            function () {
                return (_pthread_mutex_destroy = Module[
                    "_pthread_mutex_destroy"
                ] =
                    Module["asm"]["pthread_mutex_destroy"]).apply(
                    null,
                    arguments
                );
            });
        var _pthread_getspecific = (Module["_pthread_getspecific"] =
            function () {
                return (_pthread_getspecific = Module["_pthread_getspecific"] =
                    Module["asm"]["pthread_getspecific"]).apply(
                    null,
                    arguments
                );
            });
        var _pthread_setspecific = (Module["_pthread_setspecific"] =
            function () {
                return (_pthread_setspecific = Module["_pthread_setspecific"] =
                    Module["asm"]["pthread_setspecific"]).apply(
                    null,
                    arguments
                );
            });
        var _pthread_cond_wait = (Module["_pthread_cond_wait"] = function () {
            return (_pthread_cond_wait = Module["_pthread_cond_wait"] =
                Module["asm"]["pthread_cond_wait"]).apply(null, arguments);
        });
        var _pthread_cond_signal = (Module["_pthread_cond_signal"] =
            function () {
                return (_pthread_cond_signal = Module["_pthread_cond_signal"] =
                    Module["asm"]["pthread_cond_signal"]).apply(
                    null,
                    arguments
                );
            });
        var _pthread_cond_init = (Module["_pthread_cond_init"] = function () {
            return (_pthread_cond_init = Module["_pthread_cond_init"] =
                Module["asm"]["pthread_cond_init"]).apply(null, arguments);
        });
        var _pthread_cond_destroy = (Module["_pthread_cond_destroy"] =
            function () {
                return (_pthread_cond_destroy = Module[
                    "_pthread_cond_destroy"
                ] =
                    Module["asm"]["pthread_cond_destroy"]).apply(
                    null,
                    arguments
                );
            });
        var _pthread_attr_init = (Module["_pthread_attr_init"] = function () {
            return (_pthread_attr_init = Module["_pthread_attr_init"] =
                Module["asm"]["pthread_attr_init"]).apply(null, arguments);
        });
        var _pthread_attr_setdetachstate = (Module[
            "_pthread_attr_setdetachstate"
        ] = function () {
            return (_pthread_attr_setdetachstate = Module[
                "_pthread_attr_setdetachstate"
            ] =
                Module["asm"]["pthread_attr_setdetachstate"]).apply(
                null,
                arguments
            );
        });
        var _pthread_mutex_lock = (Module["_pthread_mutex_lock"] = function () {
            return (_pthread_mutex_lock = Module["_pthread_mutex_lock"] =
                Module["asm"]["pthread_mutex_lock"]).apply(null, arguments);
        });
        var _pthread_mutex_unlock = (Module["_pthread_mutex_unlock"] =
            function () {
                return (_pthread_mutex_unlock = Module[
                    "_pthread_mutex_unlock"
                ] =
                    Module["asm"]["pthread_mutex_unlock"]).apply(
                    null,
                    arguments
                );
            });
        var _pthread_create = (Module["_pthread_create"] = function () {
            return (_pthread_create = Module["_pthread_create"] =
                Module["asm"]["pthread_create"]).apply(null, arguments);
        });
        var _pthread_join = (Module["_pthread_join"] = function () {
            return (_pthread_join = Module["_pthread_join"] =
                Module["asm"]["pthread_join"]).apply(null, arguments);
        });
        var _pthread_key_delete = (Module["_pthread_key_delete"] = function () {
            return (_pthread_key_delete = Module["_pthread_key_delete"] =
                Module["asm"]["pthread_key_delete"]).apply(null, arguments);
        });
        var _pthread_key_create = (Module["_pthread_key_create"] = function () {
            return (_pthread_key_create = Module["_pthread_key_create"] =
                Module["asm"]["pthread_key_create"]).apply(null, arguments);
        });
        var _htons = (Module["_htons"] = function () {
            return (_htons = Module["_htons"] = Module["asm"]["htons"]).apply(
                null,
                arguments
            );
        });
        var _htonl = (Module["_htonl"] = function () {
            return (_htonl = Module["_htonl"] = Module["asm"]["htonl"]).apply(
                null,
                arguments
            );
        });
        var _strerror_r = (Module["_strerror_r"] = function () {
            return (_strerror_r = Module["_strerror_r"] =
                Module["asm"]["strerror_r"]).apply(null, arguments);
        });
        var _strstr = (Module["_strstr"] = function () {
            return (_strstr = Module["_strstr"] =
                Module["asm"]["strstr"]).apply(null, arguments);
        });
        var _strrchr = (Module["_strrchr"] = function () {
            return (_strrchr = Module["_strrchr"] =
                Module["asm"]["strrchr"]).apply(null, arguments);
        });
        var _strcat = (Module["_strcat"] = function () {
            return (_strcat = Module["_strcat"] =
                Module["asm"]["strcat"]).apply(null, arguments);
        });
        var _strchr = (Module["_strchr"] = function () {
            return (_strchr = Module["_strchr"] =
                Module["asm"]["strchr"]).apply(null, arguments);
        });
        var _strcasecmp = (Module["_strcasecmp"] = function () {
            return (_strcasecmp = Module["_strcasecmp"] =
                Module["asm"]["strcasecmp"]).apply(null, arguments);
        });
        var _memset = (Module["_memset"] = function () {
            return (_memset = Module["_memset"] =
                Module["asm"]["memset"]).apply(null, arguments);
        });
        var _memcpy = (Module["_memcpy"] = function () {
            return (_memcpy = Module["_memcpy"] =
                Module["asm"]["memcpy"]).apply(null, arguments);
        });
        var _fread = (Module["_fread"] = function () {
            return (_fread = Module["_fread"] = Module["asm"]["fread"]).apply(
                null,
                arguments
            );
        });
        var _fputc = (Module["_fputc"] = function () {
            return (_fputc = Module["_fputc"] = Module["asm"]["fputc"]).apply(
                null,
                arguments
            );
        });
        var _fseek = (Module["_fseek"] = function () {
            return (_fseek = Module["_fseek"] = Module["asm"]["fseek"]).apply(
                null,
                arguments
            );
        });
        var _fseeko = (Module["_fseeko"] = function () {
            return (_fseeko = Module["_fseeko"] =
                Module["asm"]["fseeko"]).apply(null, arguments);
        });
        var _sprintf = (Module["_sprintf"] = function () {
            return (_sprintf = Module["_sprintf"] =
                Module["asm"]["sprintf"]).apply(null, arguments);
        });
        var _vsprintf = (Module["_vsprintf"] = function () {
            return (_vsprintf = Module["_vsprintf"] =
                Module["asm"]["vsprintf"]).apply(null, arguments);
        });
        var _vfprintf = (Module["_vfprintf"] = function () {
            return (_vfprintf = Module["_vfprintf"] =
                Module["asm"]["vfprintf"]).apply(null, arguments);
        });
        var _fclose = (Module["_fclose"] = function () {
            return (_fclose = Module["_fclose"] =
                Module["asm"]["fclose"]).apply(null, arguments);
        });
        var _ftell = (Module["_ftell"] = function () {
            return (_ftell = Module["_ftell"] = Module["asm"]["ftell"]).apply(
                null,
                arguments
            );
        });
        var _ftello = (Module["_ftello"] = function () {
            return (_ftello = Module["_ftello"] =
                Module["asm"]["ftello"]).apply(null, arguments);
        });
        var _ferror = (Module["_ferror"] = function () {
            return (_ferror = Module["_ferror"] =
                Module["asm"]["ferror"]).apply(null, arguments);
        });
        var _feof = (Module["_feof"] = function () {
            return (_feof = Module["_feof"] = Module["asm"]["feof"]).apply(
                null,
                arguments
            );
        });
        var _fgets = (Module["_fgets"] = function () {
            return (_fgets = Module["_fgets"] = Module["asm"]["fgets"]).apply(
                null,
                arguments
            );
        });
        var _fopen = (Module["_fopen"] = function () {
            return (_fopen = Module["_fopen"] = Module["asm"]["fopen"]).apply(
                null,
                arguments
            );
        });
        var _rewind = (Module["_rewind"] = function () {
            return (_rewind = Module["_rewind"] =
                Module["asm"]["rewind"]).apply(null, arguments);
        });
        var _sscanf = (Module["_sscanf"] = function () {
            return (_sscanf = Module["_sscanf"] =
                Module["asm"]["sscanf"]).apply(null, arguments);
        });
        var _fprintf = (Module["_fprintf"] = function () {
            return (_fprintf = Module["_fprintf"] =
                Module["asm"]["fprintf"]).apply(null, arguments);
        });
        var _fiprintf = (Module["_fiprintf"] = function () {
            return (_fiprintf = Module["_fiprintf"] =
                Module["asm"]["fiprintf"]).apply(null, arguments);
        });
        var _fflush = (Module["_fflush"] = function () {
            return (_fflush = Module["_fflush"] =
                Module["asm"]["fflush"]).apply(null, arguments);
        });
        var _fmemopen = (Module["_fmemopen"] = function () {
            return (_fmemopen = Module["_fmemopen"] =
                Module["asm"]["fmemopen"]).apply(null, arguments);
        });
        var _getuid = (Module["_getuid"] = function () {
            return (_getuid = Module["_getuid"] =
                Module["asm"]["getuid"]).apply(null, arguments);
        });
        var _getpid = (Module["_getpid"] = function () {
            return (_getpid = Module["_getpid"] =
                Module["asm"]["getpid"]).apply(null, arguments);
        });
        var _close = (Module["_close"] = function () {
            return (_close = Module["_close"] = Module["asm"]["close"]).apply(
                null,
                arguments
            );
        });
        var _geteuid = (Module["_geteuid"] = function () {
            return (_geteuid = Module["_geteuid"] =
                Module["asm"]["geteuid"]).apply(null, arguments);
        });
        var _getegid = (Module["_getegid"] = function () {
            return (_getegid = Module["_getegid"] =
                Module["asm"]["getegid"]).apply(null, arguments);
        });
        var _getgid = (Module["_getgid"] = function () {
            return (_getgid = Module["_getgid"] =
                Module["asm"]["getgid"]).apply(null, arguments);
        });
        var _read = (Module["_read"] = function () {
            return (_read = Module["_read"] = Module["asm"]["read"]).apply(
                null,
                arguments
            );
        });
        var _round = (Module["_round"] = function () {
            return (_round = Module["_round"] = Module["asm"]["round"]).apply(
                null,
                arguments
            );
        });
        var _lrintf = (Module["_lrintf"] = function () {
            return (_lrintf = Module["_lrintf"] =
                Module["asm"]["lrintf"]).apply(null, arguments);
        });
        var _atan = (Module["_atan"] = function () {
            return (_atan = Module["_atan"] = Module["asm"]["atan"]).apply(
                null,
                arguments
            );
        });
        var _ldexp = (Module["_ldexp"] = function () {
            return (_ldexp = Module["_ldexp"] = Module["asm"]["ldexp"]).apply(
                null,
                arguments
            );
        });
        var _atan2 = (Module["_atan2"] = function () {
            return (_atan2 = Module["_atan2"] = Module["asm"]["atan2"]).apply(
                null,
                arguments
            );
        });
        var _sin = (Module["_sin"] = function () {
            return (_sin = Module["_sin"] = Module["asm"]["sin"]).apply(
                null,
                arguments
            );
        });
        var _acos = (Module["_acos"] = function () {
            return (_acos = Module["_acos"] = Module["asm"]["acos"]).apply(
                null,
                arguments
            );
        });
        var _cos = (Module["_cos"] = function () {
            return (_cos = Module["_cos"] = Module["asm"]["cos"]).apply(
                null,
                arguments
            );
        });
        var _lrint = (Module["_lrint"] = function () {
            return (_lrint = Module["_lrint"] = Module["asm"]["lrint"]).apply(
                null,
                arguments
            );
        });
        var _fstat = (Module["_fstat"] = function () {
            return (_fstat = Module["_fstat"] = Module["asm"]["fstat"]).apply(
                null,
                arguments
            );
        });
        var _stat = (Module["_stat"] = function () {
            return (_stat = Module["_stat"] = Module["asm"]["stat"]).apply(
                null,
                arguments
            );
        });
        var _sysconf = (Module["_sysconf"] = function () {
            return (_sysconf = Module["_sysconf"] =
                Module["asm"]["sysconf"]).apply(null, arguments);
        });
        var _opendir = (Module["_opendir"] = function () {
            return (_opendir = Module["_opendir"] =
                Module["asm"]["opendir"]).apply(null, arguments);
        });
        var _readdir = (Module["_readdir"] = function () {
            return (_readdir = Module["_readdir"] =
                Module["asm"]["readdir"]).apply(null, arguments);
        });
        var _closedir = (Module["_closedir"] = function () {
            return (_closedir = Module["_closedir"] =
                Module["asm"]["closedir"]).apply(null, arguments);
        });
        var _fcntl = (Module["_fcntl"] = function () {
            return (_fcntl = Module["_fcntl"] = Module["asm"]["fcntl"]).apply(
                null,
                arguments
            );
        });
        var _open = (Module["_open"] = function () {
            return (_open = Module["_open"] = Module["asm"]["open"]).apply(
                null,
                arguments
            );
        });
        var _mmap = (Module["_mmap"] = function () {
            return (_mmap = Module["_mmap"] = Module["asm"]["mmap"]).apply(
                null,
                arguments
            );
        });
        var _munmap = (Module["_munmap"] = function () {
            return (_munmap = Module["_munmap"] =
                Module["asm"]["munmap"]).apply(null, arguments);
        });
        var _qsort = (Module["_qsort"] = function () {
            return (_qsort = Module["_qsort"] = Module["asm"]["qsort"]).apply(
                null,
                arguments
            );
        });
        var _isspace = (Module["_isspace"] = function () {
            return (_isspace = Module["_isspace"] =
                Module["asm"]["isspace"]).apply(null, arguments);
        });
        var _strtol = (Module["_strtol"] = function () {
            return (_strtol = Module["_strtol"] =
                Module["asm"]["strtol"]).apply(null, arguments);
        });
        var _bsearch = (Module["_bsearch"] = function () {
            return (_bsearch = Module["_bsearch"] =
                Module["asm"]["bsearch"]).apply(null, arguments);
        });
        var _gmtime = (Module["_gmtime"] = function () {
            return (_gmtime = Module["_gmtime"] =
                Module["asm"]["gmtime"]).apply(null, arguments);
        });
        var _getenv = (Module["_getenv"] = function () {
            return (_getenv = Module["_getenv"] =
                Module["asm"]["getenv"]).apply(null, arguments);
        });
        var __get_tzname = (Module["__get_tzname"] = function () {
            return (__get_tzname = Module["__get_tzname"] =
                Module["asm"]["_get_tzname"]).apply(null, arguments);
        });
        var __get_daylight = (Module["__get_daylight"] = function () {
            return (__get_daylight = Module["__get_daylight"] =
                Module["asm"]["_get_daylight"]).apply(null, arguments);
        });
        var __get_timezone = (Module["__get_timezone"] = function () {
            return (__get_timezone = Module["__get_timezone"] =
                Module["asm"]["_get_timezone"]).apply(null, arguments);
        });
        var stackSave = (Module["stackSave"] = function () {
            return (stackSave = Module["stackSave"] =
                Module["asm"]["stackSave"]).apply(null, arguments);
        });
        var stackRestore = (Module["stackRestore"] = function () {
            return (stackRestore = Module["stackRestore"] =
                Module["asm"]["stackRestore"]).apply(null, arguments);
        });
        var stackAlloc = (Module["stackAlloc"] = function () {
            return (stackAlloc = Module["stackAlloc"] =
                Module["asm"]["stackAlloc"]).apply(null, arguments);
        });
        var _saveSetjmp = (Module["_saveSetjmp"] = function () {
            return (_saveSetjmp = Module["_saveSetjmp"] =
                Module["asm"]["saveSetjmp"]).apply(null, arguments);
        });
        var _testSetjmp = (Module["_testSetjmp"] = function () {
            return (_testSetjmp = Module["_testSetjmp"] =
                Module["asm"]["testSetjmp"]).apply(null, arguments);
        });
        var _emscripten_longjmp = (Module["_emscripten_longjmp"] = function () {
            return (_emscripten_longjmp = Module["_emscripten_longjmp"] =
                Module["asm"]["emscripten_longjmp"]).apply(null, arguments);
        });
        var _setThrew = (Module["_setThrew"] = function () {
            return (_setThrew = Module["_setThrew"] =
                Module["asm"]["setThrew"]).apply(null, arguments);
        });
        var __ZNSt3__28ios_base5imbueERKNS_6localeE = (Module[
            "__ZNSt3__28ios_base5imbueERKNS_6localeE"
        ] = function () {
            return (__ZNSt3__28ios_base5imbueERKNS_6localeE = Module[
                "__ZNSt3__28ios_base5imbueERKNS_6localeE"
            ] =
                Module["asm"]["_ZNSt3__28ios_base5imbueERKNS_6localeE"]).apply(
                null,
                arguments
            );
        });
        var __ZNSt3__26localeC1ERKS0_ = (Module["__ZNSt3__26localeC1ERKS0_"] =
            function () {
                return (__ZNSt3__26localeC1ERKS0_ = Module[
                    "__ZNSt3__26localeC1ERKS0_"
                ] =
                    Module["asm"]["_ZNSt3__26localeC1ERKS0_"]).apply(
                    null,
                    arguments
                );
            });
        var __ZNSt3__26localeaSERKS0_ = (Module["__ZNSt3__26localeaSERKS0_"] =
            function () {
                return (__ZNSt3__26localeaSERKS0_ = Module[
                    "__ZNSt3__26localeaSERKS0_"
                ] =
                    Module["asm"]["_ZNSt3__26localeaSERKS0_"]).apply(
                    null,
                    arguments
                );
            });
        var _realloc = (Module["_realloc"] = function () {
            return (_realloc = Module["_realloc"] =
                Module["asm"]["realloc"]).apply(null, arguments);
        });
        var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7replaceEmmPKcm =
            (Module[
                "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7replaceEmmPKcm"
            ] = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7replaceEmmPKcm =
                    Module[
                        "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7replaceEmmPKcm"
                    ] =
                        Module["asm"][
                            "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7replaceEmmPKcm"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev =
            (Module[
                "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev"
            ] = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev =
                    Module[
                        "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev"
                    ] =
                        Module["asm"][
                            "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev"
                        ]).apply(null, arguments);
            });
        var __ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE2atEm =
            (Module[
                "__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE2atEm"
            ] = function () {
                return (__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE2atEm =
                    Module[
                        "__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE2atEm"
                    ] =
                        Module["asm"][
                            "_ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE2atEm"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6insertEmPKcm =
            (Module[
                "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6insertEmPKcm"
            ] = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6insertEmPKcm =
                    Module[
                        "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6insertEmPKcm"
                    ] =
                        Module["asm"][
                            "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6insertEmPKcm"
                        ]).apply(null, arguments);
            });
        var __ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7compareEPKc =
            (Module[
                "__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7compareEPKc"
            ] = function () {
                return (__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7compareEPKc =
                    Module[
                        "__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7compareEPKc"
                    ] =
                        Module["asm"][
                            "_ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7compareEPKc"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE2atEm =
            (Module[
                "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE2atEm"
            ] = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE2atEm =
                    Module[
                        "__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE2atEm"
                    ] =
                        Module["asm"][
                            "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE2atEm"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__24stoiERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPmi =
            (Module[
                "__ZNSt3__24stoiERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPmi"
            ] = function () {
                return (__ZNSt3__24stoiERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPmi =
                    Module[
                        "__ZNSt3__24stoiERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPmi"
                    ] =
                        Module["asm"][
                            "_ZNSt3__24stoiERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPmi"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__26stoullERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPmi =
            (Module[
                "__ZNSt3__26stoullERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPmi"
            ] = function () {
                return (__ZNSt3__26stoullERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPmi =
                    Module[
                        "__ZNSt3__26stoullERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPmi"
                    ] =
                        Module["asm"][
                            "_ZNSt3__26stoullERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPmi"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__24stodERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPm =
            (Module[
                "__ZNSt3__24stodERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPm"
            ] = function () {
                return (__ZNSt3__24stodERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPm =
                    Module[
                        "__ZNSt3__24stodERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPm"
                    ] =
                        Module["asm"][
                            "_ZNSt3__24stodERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPm"
                        ]).apply(null, arguments);
            });
        var __ZNKSt3__220__vector_base_commonILb1EE20__throw_out_of_rangeEv =
            (Module[
                "__ZNKSt3__220__vector_base_commonILb1EE20__throw_out_of_rangeEv"
            ] = function () {
                return (__ZNKSt3__220__vector_base_commonILb1EE20__throw_out_of_rangeEv =
                    Module[
                        "__ZNKSt3__220__vector_base_commonILb1EE20__throw_out_of_rangeEv"
                    ] =
                        Module["asm"][
                            "_ZNKSt3__220__vector_base_commonILb1EE20__throw_out_of_rangeEv"
                        ]).apply(null, arguments);
            });
        var __ZSt17rethrow_exceptionSt13exception_ptr = (Module[
            "__ZSt17rethrow_exceptionSt13exception_ptr"
        ] = function () {
            return (__ZSt17rethrow_exceptionSt13exception_ptr = Module[
                "__ZSt17rethrow_exceptionSt13exception_ptr"
            ] =
                Module["asm"][
                    "_ZSt17rethrow_exceptionSt13exception_ptr"
                ]).apply(null, arguments);
        });
        var __ZNSt13exception_ptrD1Ev = (Module["__ZNSt13exception_ptrD1Ev"] =
            function () {
                return (__ZNSt13exception_ptrD1Ev = Module[
                    "__ZNSt13exception_ptrD1Ev"
                ] =
                    Module["asm"]["_ZNSt13exception_ptrD1Ev"]).apply(
                    null,
                    arguments
                );
            });
        var __ZNSt13exception_ptrC1ERKS_ = (Module[
            "__ZNSt13exception_ptrC1ERKS_"
        ] = function () {
            return (__ZNSt13exception_ptrC1ERKS_ = Module[
                "__ZNSt13exception_ptrC1ERKS_"
            ] =
                Module["asm"]["_ZNSt13exception_ptrC1ERKS_"]).apply(
                null,
                arguments
            );
        });
        var __ZNSt3__26__sortIRNS_6__lessIjjEEPjEEvT0_S5_T_ = (Module[
            "__ZNSt3__26__sortIRNS_6__lessIjjEEPjEEvT0_S5_T_"
        ] = function () {
            return (__ZNSt3__26__sortIRNS_6__lessIjjEEPjEEvT0_S5_T_ = Module[
                "__ZNSt3__26__sortIRNS_6__lessIjjEEPjEEvT0_S5_T_"
            ] =
                Module["asm"][
                    "_ZNSt3__26__sortIRNS_6__lessIjjEEPjEEvT0_S5_T_"
                ]).apply(null, arguments);
        });
        var __ZNSt3__26locale7classicEv = (Module[
            "__ZNSt3__26locale7classicEv"
        ] = function () {
            return (__ZNSt3__26locale7classicEv = Module[
                "__ZNSt3__26locale7classicEv"
            ] =
                Module["asm"]["_ZNSt3__26locale7classicEv"]).apply(
                null,
                arguments
            );
        });
        var _emscripten_builtin_malloc = (Module["_emscripten_builtin_malloc"] =
            function () {
                return (_emscripten_builtin_malloc = Module[
                    "_emscripten_builtin_malloc"
                ] =
                    Module["asm"]["emscripten_builtin_malloc"]).apply(
                    null,
                    arguments
                );
            });
        var _posix_memalign = (Module["_posix_memalign"] = function () {
            return (_posix_memalign = Module["_posix_memalign"] =
                Module["asm"]["posix_memalign"]).apply(null, arguments);
        });
        var __ZNSt3__25mutexD1Ev = (Module["__ZNSt3__25mutexD1Ev"] =
            function () {
                return (__ZNSt3__25mutexD1Ev = Module["__ZNSt3__25mutexD1Ev"] =
                    Module["asm"]["_ZNSt3__25mutexD1Ev"]).apply(
                    null,
                    arguments
                );
            });
        var __ZNSt3__212__next_primeEm = (Module["__ZNSt3__212__next_primeEm"] =
            function () {
                return (__ZNSt3__212__next_primeEm = Module[
                    "__ZNSt3__212__next_primeEm"
                ] =
                    Module["asm"]["_ZNSt3__212__next_primeEm"]).apply(
                    null,
                    arguments
                );
            });
        var __ZNSt3__25mutex4lockEv = (Module["__ZNSt3__25mutex4lockEv"] =
            function () {
                return (__ZNSt3__25mutex4lockEv = Module[
                    "__ZNSt3__25mutex4lockEv"
                ] =
                    Module["asm"]["_ZNSt3__25mutex4lockEv"]).apply(
                    null,
                    arguments
                );
            });
        var __ZNSt3__25mutex6unlockEv = (Module["__ZNSt3__25mutex6unlockEv"] =
            function () {
                return (__ZNSt3__25mutex6unlockEv = Module[
                    "__ZNSt3__25mutex6unlockEv"
                ] =
                    Module["asm"]["_ZNSt3__25mutex6unlockEv"]).apply(
                    null,
                    arguments
                );
            });
        var __ZNSt3__215recursive_mutex4lockEv = (Module[
            "__ZNSt3__215recursive_mutex4lockEv"
        ] = function () {
            return (__ZNSt3__215recursive_mutex4lockEv = Module[
                "__ZNSt3__215recursive_mutex4lockEv"
            ] =
                Module["asm"]["_ZNSt3__215recursive_mutex4lockEv"]).apply(
                null,
                arguments
            );
        });
        var __ZNSt3__215recursive_mutex6unlockEv = (Module[
            "__ZNSt3__215recursive_mutex6unlockEv"
        ] = function () {
            return (__ZNSt3__215recursive_mutex6unlockEv = Module[
                "__ZNSt3__215recursive_mutex6unlockEv"
            ] =
                Module["asm"]["_ZNSt3__215recursive_mutex6unlockEv"]).apply(
                null,
                arguments
            );
        });
        var __ZNSt3__215recursive_mutexC1Ev = (Module[
            "__ZNSt3__215recursive_mutexC1Ev"
        ] = function () {
            return (__ZNSt3__215recursive_mutexC1Ev = Module[
                "__ZNSt3__215recursive_mutexC1Ev"
            ] =
                Module["asm"]["_ZNSt3__215recursive_mutexC1Ev"]).apply(
                null,
                arguments
            );
        });
        var __ZNSt3__215recursive_mutexD1Ev = (Module[
            "__ZNSt3__215recursive_mutexD1Ev"
        ] = function () {
            return (__ZNSt3__215recursive_mutexD1Ev = Module[
                "__ZNSt3__215recursive_mutexD1Ev"
            ] =
                Module["asm"]["_ZNSt3__215recursive_mutexD1Ev"]).apply(
                null,
                arguments
            );
        });
        var __ZNSt3__219__shared_weak_count14__release_weakEv = (Module[
            "__ZNSt3__219__shared_weak_count14__release_weakEv"
        ] = function () {
            return (__ZNSt3__219__shared_weak_count14__release_weakEv = Module[
                "__ZNSt3__219__shared_weak_count14__release_weakEv"
            ] =
                Module["asm"][
                    "_ZNSt3__219__shared_weak_count14__release_weakEv"
                ]).apply(null, arguments);
        });
        var __ZNKSt3__219__shared_weak_count13__get_deleterERKSt9type_info =
            (Module[
                "__ZNKSt3__219__shared_weak_count13__get_deleterERKSt9type_info"
            ] = function () {
                return (__ZNKSt3__219__shared_weak_count13__get_deleterERKSt9type_info =
                    Module[
                        "__ZNKSt3__219__shared_weak_count13__get_deleterERKSt9type_info"
                    ] =
                        Module["asm"][
                            "_ZNKSt3__219__shared_weak_count13__get_deleterERKSt9type_info"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__219__shared_weak_countD2Ev = (Module[
            "__ZNSt3__219__shared_weak_countD2Ev"
        ] = function () {
            return (__ZNSt3__219__shared_weak_countD2Ev = Module[
                "__ZNSt3__219__shared_weak_countD2Ev"
            ] =
                Module["asm"]["_ZNSt3__219__shared_weak_countD2Ev"]).apply(
                null,
                arguments
            );
        });
        var __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE5imbueERKNS_6localeE =
            (Module[
                "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE5imbueERKNS_6localeE"
            ] = function () {
                return (__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE5imbueERKNS_6localeE =
                    Module[
                        "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE5imbueERKNS_6localeE"
                    ] =
                        Module["asm"][
                            "_ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE5imbueERKNS_6localeE"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6setbufEPcl =
            (Module[
                "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6setbufEPcl"
            ] = function () {
                return (__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6setbufEPcl =
                    Module[
                        "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6setbufEPcl"
                    ] =
                        Module["asm"][
                            "_ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6setbufEPcl"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE4syncEv = (Module[
            "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE4syncEv"
        ] = function () {
            return (__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE4syncEv =
                Module[
                    "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE4syncEv"
                ] =
                    Module["asm"][
                        "_ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE4syncEv"
                    ]).apply(null, arguments);
        });
        var __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE9showmanycEv =
            (Module[
                "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE9showmanycEv"
            ] = function () {
                return (__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE9showmanycEv =
                    Module[
                        "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE9showmanycEv"
                    ] =
                        Module["asm"][
                            "_ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE9showmanycEv"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6xsgetnEPcl =
            (Module[
                "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6xsgetnEPcl"
            ] = function () {
                return (__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6xsgetnEPcl =
                    Module[
                        "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6xsgetnEPcl"
                    ] =
                        Module["asm"][
                            "_ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6xsgetnEPcl"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE5uflowEv =
            (Module[
                "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE5uflowEv"
            ] = function () {
                return (__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE5uflowEv =
                    Module[
                        "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE5uflowEv"
                    ] =
                        Module["asm"][
                            "_ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE5uflowEv"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6xsputnEPKcl =
            (Module[
                "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6xsputnEPKcl"
            ] = function () {
                return (__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6xsputnEPKcl =
                    Module[
                        "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6xsputnEPKcl"
                    ] =
                        Module["asm"][
                            "_ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6xsputnEPKcl"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE5flushEv = (Module[
            "__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE5flushEv"
        ] = function () {
            return (__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE5flushEv =
                Module[
                    "__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE5flushEv"
                ] =
                    Module["asm"][
                        "_ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE5flushEv"
                    ]).apply(null, arguments);
        });
        var __ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERi = (Module[
            "__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERi"
        ] = function () {
            return (__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERi =
                Module[
                    "__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERi"
                ] =
                    Module["asm"][
                        "_ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERi"
                    ]).apply(null, arguments);
        });
        var __ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERl = (Module[
            "__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERl"
        ] = function () {
            return (__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERl =
                Module[
                    "__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERl"
                ] =
                    Module["asm"][
                        "_ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERl"
                    ]).apply(null, arguments);
        });
        var __ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERm = (Module[
            "__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERm"
        ] = function () {
            return (__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERm =
                Module[
                    "__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERm"
                ] =
                    Module["asm"][
                        "_ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERm"
                    ]).apply(null, arguments);
        });
        var __ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERx = (Module[
            "__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERx"
        ] = function () {
            return (__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERx =
                Module[
                    "__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERx"
                ] =
                    Module["asm"][
                        "_ZNSt3__213basic_istreamIcNS_11char_traitsIcEEErsERx"
                    ]).apply(null, arguments);
        });
        var __ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEt = (Module[
            "__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEt"
        ] = function () {
            return (__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEt =
                Module["__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEt"] =
                    Module["asm"][
                        "_ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEt"
                    ]).apply(null, arguments);
        });
        var __ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEi = (Module[
            "__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEi"
        ] = function () {
            return (__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEi =
                Module["__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEi"] =
                    Module["asm"][
                        "_ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEi"
                    ]).apply(null, arguments);
        });
        var __ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEm = (Module[
            "__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEm"
        ] = function () {
            return (__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEm =
                Module["__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEm"] =
                    Module["asm"][
                        "_ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEm"
                    ]).apply(null, arguments);
        });
        var __ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEx = (Module[
            "__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEx"
        ] = function () {
            return (__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEx =
                Module["__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEx"] =
                    Module["asm"][
                        "_ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEx"
                    ]).apply(null, arguments);
        });
        var __ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEd = (Module[
            "__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEd"
        ] = function () {
            return (__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEd =
                Module["__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEd"] =
                    Module["asm"][
                        "_ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEd"
                    ]).apply(null, arguments);
        });
        var __ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE3putEc = (Module[
            "__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE3putEc"
        ] = function () {
            return (__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE3putEc =
                Module[
                    "__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE3putEc"
                ] =
                    Module["asm"][
                        "_ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE3putEc"
                    ]).apply(null, arguments);
        });
        var __ZNSt3__214basic_iostreamIcNS_11char_traitsIcEEED2Ev = (Module[
            "__ZNSt3__214basic_iostreamIcNS_11char_traitsIcEEED2Ev"
        ] = function () {
            return (__ZNSt3__214basic_iostreamIcNS_11char_traitsIcEEED2Ev =
                Module[
                    "__ZNSt3__214basic_iostreamIcNS_11char_traitsIcEEED2Ev"
                ] =
                    Module["asm"][
                        "_ZNSt3__214basic_iostreamIcNS_11char_traitsIcEEED2Ev"
                    ]).apply(null, arguments);
        });
        var __ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE9underflowEv =
            (Module[
                "__ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE9underflowEv"
            ] = function () {
                return (__ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE9underflowEv =
                    Module[
                        "__ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE9underflowEv"
                    ] =
                        Module["asm"][
                            "_ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE9underflowEv"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE9pbackfailEi =
            (Module[
                "__ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE9pbackfailEi"
            ] = function () {
                return (__ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE9pbackfailEi =
                    Module[
                        "__ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE9pbackfailEi"
                    ] =
                        Module["asm"][
                            "_ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE9pbackfailEi"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE8overflowEi =
            (Module[
                "__ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE8overflowEi"
            ] = function () {
                return (__ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE8overflowEi =
                    Module[
                        "__ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE8overflowEi"
                    ] =
                        Module["asm"][
                            "_ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE8overflowEi"
                        ]).apply(null, arguments);
            });
        var __ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE7seekoffExNS_8ios_base7seekdirEj =
            (Module[
                "__ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE7seekoffExNS_8ios_base7seekdirEj"
            ] = function () {
                return (__ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE7seekoffExNS_8ios_base7seekdirEj =
                    Module[
                        "__ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE7seekoffExNS_8ios_base7seekdirEj"
                    ] =
                        Module["asm"][
                            "_ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE7seekoffExNS_8ios_base7seekdirEj"
                        ]).apply(null, arguments);
            });
        var _fwrite = (Module["_fwrite"] = function () {
            return (_fwrite = Module["_fwrite"] =
                Module["asm"]["fwrite"]).apply(null, arguments);
        });
        var __ZNSt3__26thread20hardware_concurrencyEv = (Module[
            "__ZNSt3__26thread20hardware_concurrencyEv"
        ] = function () {
            return (__ZNSt3__26thread20hardware_concurrencyEv = Module[
                "__ZNSt3__26thread20hardware_concurrencyEv"
            ] =
                Module["asm"][
                    "_ZNSt3__26thread20hardware_concurrencyEv"
                ]).apply(null, arguments);
        });
        var ___cxa_bad_typeid = (Module["___cxa_bad_typeid"] = function () {
            return (___cxa_bad_typeid = Module["___cxa_bad_typeid"] =
                Module["asm"]["__cxa_bad_typeid"]).apply(null, arguments);
        });
        var _memalign = (Module["_memalign"] = function () {
            return (_memalign = Module["_memalign"] =
                Module["asm"]["memalign"]).apply(null, arguments);
        });
        var _emscripten_builtin_free = (Module["_emscripten_builtin_free"] =
            function () {
                return (_emscripten_builtin_free = Module[
                    "_emscripten_builtin_free"
                ] =
                    Module["asm"]["emscripten_builtin_free"]).apply(
                    null,
                    arguments
                );
            });
        var _fmod = (Module["_fmod"] = function () {
            return (_fmod = Module["_fmod"] = Module["asm"]["fmod"]).apply(
                null,
                arguments
            );
        });
        var _logf = (Module["_logf"] = function () {
            return (_logf = Module["_logf"] = Module["asm"]["logf"]).apply(
                null,
                arguments
            );
        });
        var _exp = (Module["_exp"] = function () {
            return (_exp = Module["_exp"] = Module["asm"]["exp"]).apply(
                null,
                arguments
            );
        });
        var _pow = (Module["_pow"] = function () {
            return (_pow = Module["_pow"] = Module["asm"]["pow"]).apply(
                null,
                arguments
            );
        });
        var _log = (Module["_log"] = function () {
            return (_log = Module["_log"] = Module["asm"]["log"]).apply(
                null,
                arguments
            );
        });
        var _memmove = (Module["_memmove"] = function () {
            return (_memmove = Module["_memmove"] =
                Module["asm"]["memmove"]).apply(null, arguments);
        });
        var _fputs = (Module["_fputs"] = function () {
            return (_fputs = Module["_fputs"] = Module["asm"]["fputs"]).apply(
                null,
                arguments
            );
        });
        var ___small_printf = (Module["___small_printf"] = function () {
            return (___small_printf = Module["___small_printf"] =
                Module["asm"]["__small_printf"]).apply(null, arguments);
        });
        var dynCall_jiji = (Module["dynCall_jiji"] = function () {
            return (dynCall_jiji = Module["dynCall_jiji"] =
                Module["asm"]["dynCall_jiji"]).apply(null, arguments);
        });
        var dynCall_iijj = (Module["dynCall_iijj"] = function () {
            return (dynCall_iijj = Module["dynCall_iijj"] =
                Module["asm"]["dynCall_iijj"]).apply(null, arguments);
        });
        var dynCall_iiiij = (Module["dynCall_iiiij"] = function () {
            return (dynCall_iiiij = Module["dynCall_iiiij"] =
                Module["asm"]["dynCall_iiiij"]).apply(null, arguments);
        });
        var dynCall_iij = (Module["dynCall_iij"] = function () {
            return (dynCall_iij = Module["dynCall_iij"] =
                Module["asm"]["dynCall_iij"]).apply(null, arguments);
        });
        var dynCall_iijii = (Module["dynCall_iijii"] = function () {
            return (dynCall_iijii = Module["dynCall_iijii"] =
                Module["asm"]["dynCall_iijii"]).apply(null, arguments);
        });
        var dynCall_iijjj = (Module["dynCall_iijjj"] = function () {
            return (dynCall_iijjj = Module["dynCall_iijjj"] =
                Module["asm"]["dynCall_iijjj"]).apply(null, arguments);
        });
        var dynCall_iiiiij = (Module["dynCall_iiiiij"] = function () {
            return (dynCall_iiiiij = Module["dynCall_iiiiij"] =
                Module["asm"]["dynCall_iiiiij"]).apply(null, arguments);
        });
        var dynCall_iiiiijj = (Module["dynCall_iiiiijj"] = function () {
            return (dynCall_iiiiijj = Module["dynCall_iiiiijj"] =
                Module["asm"]["dynCall_iiiiijj"]).apply(null, arguments);
        });
        var dynCall_iiiiiijj = (Module["dynCall_iiiiiijj"] = function () {
            return (dynCall_iiiiiijj = Module["dynCall_iiiiiijj"] =
                Module["asm"]["dynCall_iiiiiijj"]).apply(null, arguments);
        });
        var dynCall_viijii = (Module["dynCall_viijii"] = function () {
            return (dynCall_viijii = Module["dynCall_viijii"] =
                Module["asm"]["dynCall_viijii"]).apply(null, arguments);
        });
        var _orig$fseeko = (Module["_orig$fseeko"] = function () {
            return (_orig$fseeko = Module["_orig$fseeko"] =
                Module["asm"]["orig$fseeko"]).apply(null, arguments);
        });
        var _orig$ftello = (Module["_orig$ftello"] = function () {
            return (_orig$ftello = Module["_orig$ftello"] =
                Module["asm"]["orig$ftello"]).apply(null, arguments);
        });
        var _orig$mmap = (Module["_orig$mmap"] = function () {
            return (_orig$mmap = Module["_orig$mmap"] =
                Module["asm"]["orig$mmap"]).apply(null, arguments);
        });
        var _orig$_ZNSt3__26stoullERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPmi =
            (Module[
                "_orig$_ZNSt3__26stoullERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPmi"
            ] = function () {
                return (_orig$_ZNSt3__26stoullERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPmi =
                    Module[
                        "_orig$_ZNSt3__26stoullERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPmi"
                    ] =
                        Module["asm"][
                            "orig$_ZNSt3__26stoullERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEPmi"
                        ]).apply(null, arguments);
            });
        var _orig$_ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEx = (Module[
            "_orig$_ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEx"
        ] = function () {
            return (_orig$_ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEx =
                Module[
                    "_orig$_ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEx"
                ] =
                    Module["asm"][
                        "orig$_ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEElsEx"
                    ]).apply(null, arguments);
        });
        var _orig$_ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE7seekoffExNS_8ios_base7seekdirEj =
            (Module[
                "_orig$_ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE7seekoffExNS_8ios_base7seekdirEj"
            ] = function () {
                return (_orig$_ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE7seekoffExNS_8ios_base7seekdirEj =
                    Module[
                        "_orig$_ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE7seekoffExNS_8ios_base7seekdirEj"
                    ] =
                        Module["asm"][
                            "orig$_ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE7seekoffExNS_8ios_base7seekdirEj"
                        ]).apply(null, arguments);
            });
        var __ZTISt12length_error = (Module["__ZTISt12length_error"] = 60268);
        var __ZTVSt12length_error = (Module["__ZTVSt12length_error"] = 60248);
        var __ZTVN10__cxxabiv117__class_type_infoE = (Module[
            "__ZTVN10__cxxabiv117__class_type_infoE"
        ] = 60556);
        var __ZTVN10__cxxabiv121__vmi_class_type_infoE = (Module[
            "__ZTVN10__cxxabiv121__vmi_class_type_infoE"
        ] = 60608);
        var __ZTVN10__cxxabiv120__si_class_type_infoE = (Module[
            "__ZTVN10__cxxabiv120__si_class_type_infoE"
        ] = 61060);
        var __ZTVNSt3__219basic_istringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE =
            (Module[
                "__ZTVNSt3__219basic_istringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE"
            ] = 60076);
        var __ZTTNSt3__219basic_istringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE =
            (Module[
                "__ZTTNSt3__219basic_istringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE"
            ] = 60116);
        var __ZTVNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEEE =
            (Module[
                "__ZTVNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEEE"
            ] = 59528);
        var __ZTVNSt3__219basic_ostringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE =
            (Module[
                "__ZTVNSt3__219basic_ostringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE"
            ] = 59968);
        var __ZTTNSt3__219basic_ostringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE =
            (Module[
                "__ZTTNSt3__219basic_ostringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE"
            ] = 60008);
        var __ZTISt9exception = (Module["__ZTISt9exception"] = 60280);
        var __ZNSt3__25ctypeIcE2idE = (Module[
            "__ZNSt3__25ctypeIcE2idE"
        ] = 64744);
        var _stderr = (Module["_stderr"] = 60992);
        var _stdout = (Module["_stdout"] = 60988);
        var ___THREW__ = (Module["___THREW__"] = 61696);
        var ___threwValue = (Module["___threwValue"] = 61700);
        var __ZNSt3__24coutE = (Module["__ZNSt3__24coutE"] = 67544);
        var __ZNSt3__24cerrE = (Module["__ZNSt3__24cerrE"] = 67712);
        var __ZTINSt3__219__shared_weak_countE = (Module[
            "__ZTINSt3__219__shared_weak_countE"
        ] = 59272);
        var __ZTINSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEEE =
            (Module[
                "__ZTINSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEEE"
            ] = 59704);
        var __ZTVNSt3__218basic_stringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE =
            (Module[
                "__ZTVNSt3__218basic_stringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE"
            ] = 59716);
        var __ZTTNSt3__218basic_stringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE =
            (Module[
                "__ZTTNSt3__218basic_stringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE"
            ] = 59776);
        Module["ccall"] = ccall;
        Module["allocate"] = allocate;
        Module["UTF8ToString"] = UTF8ToString;
        Module["stringToUTF8"] = stringToUTF8;
        Module["loadDynamicLibrary"] = loadDynamicLibrary;
        var calledRun;
        function ExitStatus(status) {
            this.name = "ExitStatus";
            this.message = "Program terminated with exit(" + status + ")";
            this.status = status;
        }
        var calledMain = false;
        dependenciesFulfilled = function runCaller() {
            if (!calledRun) run();
            if (!calledRun) dependenciesFulfilled = runCaller;
        };
        function callMain(args) {
            var entryFunction = Module["_main"];
            if (!entryFunction) return;
            args = args || [];
            var argc = args.length + 1;
            var argv = stackAlloc((argc + 1) * 4);
            HEAP32[argv >> 2] = allocateUTF8OnStack(thisProgram);
            for (var i = 1; i < argc; i++) {
                HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1]);
            }
            HEAP32[(argv >> 2) + argc] = 0;
            try {
                var ret = entryFunction(argc, argv);
                exit(ret, true);
                return ret;
            } catch (e) {
                return handleException(e);
            } finally {
                calledMain = true;
            }
        }
        var dylibsLoaded = false;
        function run(args) {
            args = args || arguments_;
            if (runDependencies > 0) {
                return;
            }
            if (!dylibsLoaded) {
                preloadDylibs();
                dylibsLoaded = true;
                if (runDependencies > 0) {
                    return;
                }
            }
            preRun();
            if (runDependencies > 0) {
                return;
            }
            function doRun() {
                if (calledRun) return;
                calledRun = true;
                Module["calledRun"] = true;
                if (ABORT) return;
                initRuntime();
                preMain();
                readyPromiseResolve(Module);
                if (Module["onRuntimeInitialized"])
                    Module["onRuntimeInitialized"]();
                if (shouldRunNow) callMain(args);
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
            EXITSTATUS = status;
            if (keepRuntimeAlive()) {
            } else {
                exitRuntime();
            }
            procExit(status);
        }
        function procExit(code) {
            EXITSTATUS = code;
            if (!keepRuntimeAlive()) {
                if (Module["onExit"]) Module["onExit"](code);
                ABORT = true;
            }
            quit_(code, new ExitStatus(code));
        }
        if (Module["preInit"]) {
            if (typeof Module["preInit"] == "function")
                Module["preInit"] = [Module["preInit"]];
            while (Module["preInit"].length > 0) {
                Module["preInit"].pop()();
            }
        }
        var shouldRunNow = true;
        if (Module["noInitialRun"]) shouldRunNow = false;
        run();

        return ImageIOModule.ready;
    };
})();
if (typeof exports === "object" && typeof module === "object")
    module.exports = ImageIOModule;
else if (typeof define === "function" && define["amd"])
    define([], function () {
        return ImageIOModule;
    });
else if (typeof exports === "object") exports["ImageIOModule"] = ImageIOModule;

!(function (e, a) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = a())
        : "function" == typeof define && define.amd
        ? define(a)
        : (((e =
              "undefined" != typeof globalThis
                  ? globalThis
                  : e || self).Dynamsoft = e.Dynamsoft || {}),
          (e.Dynamsoft.ImageIOWasm = a()));
})(this, function () {
    "use strict";
    var e,
        a,
        t,
        r,
        s,
        n,
        i,
        o,
        l,
        c,
        m,
        u,
        p,
        f,
        d,
        g,
        y,
        b,
        h,
        w,
        I,
        P,
        M,
        A,
        k,
        T,
        S,
        D,
        v;
    function E(e, a, t, r) {
        return new (t || (t = Promise))(function (s, n) {
            function i(e) {
                try {
                    l(r.next(e));
                } catch (e) {
                    n(e);
                }
            }
            function o(e) {
                try {
                    l(r.throw(e));
                } catch (e) {
                    n(e);
                }
            }
            function l(e) {
                var a;
                e.done
                    ? s(e.value)
                    : ((a = e.value),
                      a instanceof t
                          ? a
                          : new t(function (e) {
                                e(a);
                            })).then(i, o);
            }
            l((r = r.apply(e, a || [])).next());
        });
    }
    function _(e, a, t, r) {
        if ("a" === t && !r)
            throw new TypeError(
                "Private accessor was defined without a getter"
            );
        if ("function" == typeof a ? e !== a || !r : !a.has(e))
            throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
            );
        return "m" === t ? r : "a" === t ? r.call(e) : r ? r.value : a.get(e);
    }
    function j(e, a, t, r, s) {
        if ("m" === r) throw new TypeError("Private method is not writable");
        if ("a" === r && !s)
            throw new TypeError(
                "Private accessor was defined without a setter"
            );
        if ("function" == typeof a ? e !== a || !s : !a.has(e))
            throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
            );
        return "a" === r ? s.call(e, t) : s ? (s.value = t) : a.set(e, t), t;
    }
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
    })(e || (e = {})),
        (function (e) {
            (e.pending = "pending"),
                (e.ready = "ready"),
                (e.failed = "failed"),
                (e.destroyed = "destroyed"),
                (e.init = "init");
        })(a || (a = {})),
        (function (e) {
            (e.PARAMETER_TYPE_ERROR = "Parameter Type not Supported = "),
                (e.TIMEOUT = "Timeout no Response = "),
                (e.FILE_STREAM_ERROR = "File Stream Error = "),
                (e.WASM_EXCEPTION_ERROR = "An WASM exception occurred.");
        })(t || (t = {})),
        (function (e) {
            (e[(e.LONG_KEY = 0)] = "LONG_KEY"),
                (e[(e.DLS_KEY = 1)] = "DLS_KEY");
        })(r || (r = {})),
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
        })(s || (s = {})),
        (function (e) {
            (e[(e.IT_DIB = -1)] = "IT_DIB"),
                (e[(e.IT_RGBA = -2)] = "IT_RGBA"),
                (e[(e.IT_BGRA = -3)] = "IT_BGRA"),
                (e[(e.IT_BMP = 0)] = "IT_BMP"),
                (e[(e.IT_JPG = 1)] = "IT_JPG"),
                (e[(e.IT_PNG = 3)] = "IT_PNG"),
                (e[(e.IT_ALL = 5)] = "IT_ALL");
        })(n || (n = {})),
        (function (e) {
            (e[(e.RT_AUTO = -1)] = "RT_AUTO"),
                (e[(e.RT_BINARY = 1)] = "RT_BINARY"),
                (e[(e.RT_BASE64 = 2)] = "RT_BASE64");
        })(i || (i = {})),
        (function (e) {
            (e[(e.SF_DEF = 0)] = "SF_DEF"),
                (e[(e.SF_ENABLE = 1)] = "SF_ENABLE"),
                (e[(e.SF_DISABLE = 2)] = "SF_DISABLE");
        })(o || (o = {}));
    class B {
        static register(e) {
            _(this, l, "f", c).push(e);
        }
        static process(e) {
            _(this, l, "f", c).forEach((a) => {
                e.data.params.moduleName !== a.Name || a.process(e);
            });
        }
    }
    (l = B), (c = { value: new Array() });
    class R {
        constructor(e) {
            (this._instances = Object.create(null)),
                m.set(this, ""),
                j(this, m, e, "f"),
                B.register(this);
        }
        get Name() {
            return _(this, m, "f");
        }
        _destroy(e) {
            let a = this._instances[e.data.params.insId];
            a &&
                (delete this._instances[e.data.params.insId],
                a.wasmObject.delete(),
                e.context.logDebug(
                    e.data,
                    "Delete Instance " + e.data.params.insId
                ));
        }
        process(e) {}
    }
    m = new WeakMap();
    class C extends R {
        constructor() {
            super(e.core);
        }
        process(a) {
            let t = a.data,
                r = { errorCode: 0, errorMessage: "Successful." },
                o = this._instances[t.params.insId],
                l = null == o ? void 0 : o.wasmObject,
                c = a.entryModule;
            switch (t.func) {
                case "init":
                    void 0 === this._instances[t.params.insId] &&
                        ((this._instances[t.params.insId] = {
                            wasmObject: new c.DynamicImagecore(
                                t.params.key,
                                t.params.licMode,
                                t.params.uuid
                            ),
                        }),
                        a.context.logDebug(
                            t,
                            "Create ImageCore Instance " + t.params.insId
                        ));
                    break;
                case "destroy":
                    o.wasmMemoryPtr &&
                        ((a.wasmMemoryPtr = o.wasmMemoryPtr),
                        (o.wasmMemoryPtr = null)),
                        this._destroy(a);
                    break;
                case "terminate":
                    return (
                        this._destroy(a),
                        a.context.logDebug(t, "Terminate worker"),
                        void self.close()
                    );
                case "getMemoryUsed":
                    r.memoryUsed = c.HEAPU8.length;
                    break;
                case "SaveImage":
                case "ReadImage":
                case "ReadTiffPage":
                    !(function () {
                        "ReadImage" === t.func
                            ? (r = l.ReadImage.apply(l, t.params.input))
                            : "SaveImage" === t.func
                            ? (r = l.SaveImage.apply(l, t.params.input))
                            : "ReadTiffPage" === t.func &&
                              (r = l.ReadTiffPage.apply(l, t.params.input));
                        let a = JSON.parse(r);
                        if (
                            0 === a.errorCode &&
                            "Successful." === a.errorMessage
                        )
                            if (t.params.returnType === i.RT_BASE64) {
                                let e = l.GetCurrentDataBase64(),
                                    t = l.GetCurrentDataMD5();
                                (a.MD5 = t), (a.imageData = e);
                            } else {
                                let t, r;
                                a.imageType === n.IT_BMP
                                    ? (r = "bmp")
                                    : a.imageType === n.IT_JPG
                                    ? (r = "jpeg")
                                    : a.imageType === n.IT_PNG && (r = "png"),
                                    (t = r ? "image/" + r : e.binaryBlobType);
                                let s = l.GetCurrentData();
                                (a.blobType = t),
                                    (a.imageData = new Uint8ClampedArray(s));
                            }
                        (r = a), l.FreeReservedData();
                    })();
                    break;
                case "GetMD5":
                    !(function () {
                        let e = { MD5: l.GetMD5.apply(l, t.params.input) };
                        r = JSON.stringify(e);
                    })();
                    break;
                case "GetLicenseInfo":
                    r = l.GetLicenseInfo();
                    break;
                case "GetAesResult":
                    r = l.AESGcmEncrypt.apply(l, t.params.input);
                    break;
                case "GetImageFormat":
                    r = l.GetImageFormat.apply(l, t.params.input);
                    break;
                case "ReadImageInfo":
                    r = l.ReadImageInfo.apply(l, t.params.input);
                    break;
                case "LoadTiff":
                    a.wasmMemoryPtr &&
                        ((o.wasmMemoryPtr = a.wasmMemoryPtr),
                        (a.wasmMemoryPtr = null)),
                        (r = l.LoadTiff.apply(l, t.params.input));
                    break;
                case "GetTiffPageInfo":
                    r = l.GetTiffPageInfo.apply(l, t.params.input);
                    break;
                case "EndReadTiff":
                    l.EndReadTiff(),
                        l.wasmMemoryPtr &&
                            ((a.wasmMemoryPtr = l.wasmMemoryPtr),
                            delete l.wasmMemoryPtr);
                    break;
                case "NewTiff":
                    r = l.NewTiff();
                    break;
                case "AppendImageToTiff":
                    r = l.AppendImageToTiff.apply(l, t.params.input);
                    break;
                case "AddTagToNextPage":
                    r = l.AddTagToNextPage.apply(l, t.params.input);
                    break;
                case "EndWriteTiff":
                    r = l.EndWriteTiff();
                    break;
                case "GetTiffStream":
                    !(function () {
                        l.EndWriteTiff();
                        let e = l.GetTiffStream(),
                            a = {};
                        e
                            ? ((a.blobType = "image/tiff"),
                              (a.imageData = new Uint8ClampedArray(e)))
                            : (a = {
                                  errorCode: s.wasmJsSaveTiffFailed,
                                  errorMessage: "no tiff content return",
                              }),
                            (r = a),
                            l.FreeReservedData();
                    })();
                    break;
                case "GetWasmVersion":
                    r = l.GetWasmVersion();
                    break;
                case "ds_get_file":
                    !(function () {
                        let e,
                            a,
                            s,
                            n,
                            i,
                            o,
                            m,
                            u = t.params.input;
                        (a = u[0]), (s = u[1]);
                        let p = u[2];
                        (e = new Uint8Array(17)),
                            (n = c._malloc(e.length)),
                            c.HEAPU8.set(e, n),
                            l.GetMultipartFile(a, s, p, n),
                            (o = c.HEAPU32[n / 4]),
                            (m = c.HEAPU32[n / 4 + 1]),
                            (i = c.HEAPU8.slice(o, o + m)),
                            c._free(o),
                            c._free(n),
                            l.DestroyMultipartFile(),
                            (r = i);
                    })();
            }
            a.context.logDebug(t, t.func + " end, send back begin");
            let m,
                u = {
                    id: t.id,
                    func: t.func,
                    result: r,
                    memSize: c.HEAPU8.length,
                };
            if (t.params.srcBuffer) {
                "string" == typeof u.result &&
                    (u.result = JSON.parse(u.result)),
                    (u.result.srcBuffer = t.params.srcBuffer);
                let e = Object.prototype.toString.call(u.result.srcBuffer);
                ("[object ArrayBuffer]" !== e &&
                    "[object Uint8ClampedArray]" !== e) ||
                    (m = [
                        null != u.result.srcBuffer.buffer
                            ? u.result.srcBuffer.buffer
                            : u.result.srcBuffer,
                    ]);
            }
            let p = Object.prototype.toString.call(r.imageData);
            ("[object ArrayBuffer]" !== p &&
                "[object Uint8ClampedArray]" !== p &&
                "[object Uint8Array]" !== p) ||
                (m = [
                    null != u.result.imageData.buffer
                        ? u.result.imageData.buffer
                        : u.result.imageData,
                ]);
            let f = self;
            null != m ? f.postMessage(u, m) : f.postMessage(u),
                a.context.logDebug(t, t.func + " end, send back end"),
                (r = null);
        }
    }
    new C();
    class O extends R {
        constructor() {
            super(e.imgProc);
        }
        process(e) {
            let a,
                t = e.data,
                r = { errorCode: 0, errorMessage: "Successful." },
                s = this._instances[t.params.insId],
                i = null == s ? void 0 : s.wasmObject,
                o = e.entryModule;
            switch (t.func) {
                case "init":
                    void 0 === this._instances[t.params.insId] &&
                        ((this._instances[t.params.insId] = {
                            wasmObject: new o.ImageProc(
                                t.params.key,
                                t.params.licMode,
                                t.params.uuid
                            ),
                        }),
                        e.context.logDebug(
                            t,
                            "Create ImageProc Instance " + t.params.insId
                        ));
                    break;
                case "destroy":
                    this._destroy(e);
                    break;
                case "terminate":
                    return (
                        this._destroy(e),
                        e.context.logDebug(t, "Terminate worker"),
                        void self.close()
                    );
                case "InitImageObject":
                    (r = i.InitImageObject.apply(i, t.params.input)),
                        (r = JSON.parse(r));
                    break;
                case "RotateEx":
                    r = i.RotateEx.apply(i, t.params.input);
                    break;
                case "Flip":
                    r = i.Flip();
                    break;
                case "Mirror":
                    r = i.Mirror();
                    break;
                case "Erase":
                    r = i.Erase.apply(i, t.params.input);
                    break;
                case "ChangeImageSize":
                    r = i.ChangeImageSize.apply(i, t.params.input);
                    break;
                case "Crop":
                    r = i.Crop.apply(i, t.params.input);
                    break;
                case "GetSkewAngle":
                    r = i.GetSkewAngle.apply(i, t.params.input);
                    break;
                case "ConvertToGrayScale":
                    r = i.ConvertToGrayScale(t.params.input);
                    break;
                case "ConvertToBWScale":
                    r = i.ConvertToBWScale(t.params.input);
                    break;
                case "Invert":
                    r = i.Invert();
                    break;
                case "SetDPI":
                    r = i.SetDPI.apply(i, t.params.input);
                    break;
                case "SetImageWidth":
                    r = i.SetImageWidth.apply(i, t.params.input);
                    break;
                case "SetImageHeight":
                    r = i.SetImageHeight.apply(i, t.params.input);
                    break;
                case "GetImageSize":
                    r = i.GetImageSize();
                    break;
                case "GetCurrentImage":
                    !(function () {
                        let e;
                        (r = i.Save.apply(i, t.params.input)),
                            (a = JSON.parse(r)),
                            (0 !== a.errorCode &&
                                "Successful." !== a.errorMessage) ||
                                ((e = i.GetCurrentImage()),
                                a.imageType === n.IT_JPG
                                    ? (a.blobType = "image/jpeg")
                                    : a.imageType === n.IT_PNG &&
                                      (a.blobType = "image/png"),
                                (a.imageData = new Uint8ClampedArray(e))),
                            (r = a);
                    })();
                    break;
                case "FreeReservedData":
                    i.FreeReservedData(), (r = JSON.stringify(a));
                    break;
                case "DocumentDetect":
                    r = i.DocumentDetect.apply(i, t.params.input);
                    break;
                case "Perspective":
                    r = i.Perspective.apply(i, t.params.input);
                    break;
                case "ChangeBrightness":
                    r = i.ChangeBrightness.apply(i, t.params.input);
                    break;
                case "ChangeContrast":
                    r = i.ChangeContrast.apply(i, t.params.input);
                    break;
                case "ShadowRemovel":
                    r = i.ShadowRemovel.apply(i, t.params.input);
                    break;
                case "EnhanceAndSharpen":
                    r = i.EnhanceAndSharpen.apply(i, t.params.input);
                    break;
                case "Brighten":
                    r = i.Brighten.apply(i, t.params.input);
                    break;
                case "GetBlurryScore":
                    r = i.GetBlurScore.apply(i, t.params.input);
                    break;
                case "DrawQuadrangle":
                    r = i.DrawQuadrangle.apply(i, t.params.input);
                    break;
                case "ChangeBrightnessAndContrast":
                    r = i.ChangeBrightnessAndContrast.apply(i, t.params.input);
            }
            e.context.logDebug(t, t.func + " end, send back begin");
            let l,
                c = {
                    id: t.id,
                    func: t.func,
                    result: r,
                    memSize: o.HEAPU8.length,
                };
            if (t.params.srcBuffer) {
                "string" == typeof c.result &&
                    (c.result = JSON.parse(c.result)),
                    (c.result.srcBuffer = t.params.srcBuffer);
                let e = Object.prototype.toString.call(c.result.srcBuffer);
                ("[object ArrayBuffer]" !== e &&
                    "[object Uint8ClampedArray]" !== e) ||
                    (l = [
                        null != c.result.srcBuffer.buffer
                            ? c.result.srcBuffer.buffer
                            : c.result.srcBuffer,
                    ]);
            }
            let m = Object.prototype.toString.call(r.imageData);
            ("[object ArrayBuffer]" !== m &&
                "[object Uint8ClampedArray]" !== m &&
                "[object Uint8Array]" != m) ||
                (l = [
                    null != c.result.imageData.buffer
                        ? c.result.imageData.buffer
                        : c.result.imageData,
                ]);
            let u = self;
            null != l ? u.postMessage(c, l) : u.postMessage(c),
                (r = null),
                e.context.logDebug(t, t.func + " end, send back end");
        }
    }
    new O();
    class W extends R {
        constructor() {
            super(e.pdfW);
        }
        process(e) {
            let a,
                t = e.data,
                r = { errorCode: 0, errorMessage: "Successful." },
                n = this._instances[t.params.insId],
                i = null == n ? void 0 : n.wasmObject,
                o = e.entryModule;
            switch (t.func) {
                case "init":
                    void 0 === this._instances[t.params.insId] &&
                        ((this._instances[t.params.insId] = {
                            wasmObject: new o.DynamicPdfW(
                                t.params.key,
                                t.params.licMode,
                                t.params.uuid
                            ),
                        }),
                        e.context.logDebug(
                            t,
                            "Create PdfWriter Instance " + t.params.insId
                        ));
                    break;
                case "destroy":
                    this._destroy(e);
                    break;
                case "terminate":
                    return (
                        this._destroy(e),
                        e.context.logDebug(t, "Terminate worker"),
                        void self.close()
                    );
                case "InitPdfWriter":
                    r = i.InitPdfWriter(t.params.input);
                    break;
                case "AddPageFromImageFileStream":
                    r = i.AddPageFromImageFileStream.apply(i, t.params.input);
                    break;
                case "CreatePageFromImageDIB":
                    r = i.CreatePageFromImageDIB.apply(i, t.params.input);
                    break;
                case "AddAnnotation":
                    r = i.AddAnnotation.apply(i, t.params.input);
                    break;
                case "EndWritePdf":
                    r = i.EndWritePdf();
                    break;
                case "GetPdfContent":
                    !(function () {
                        i.EndWritePdf();
                        let e = i.GetPdfContent();
                        (a = {}),
                            e
                                ? ((a.blobType = "application/pdf"),
                                  (a.pdfData = new Uint8ClampedArray(e)))
                                : (a = {
                                      errorCode: s.wasmJsSavePdfFailed,
                                      errorMessage: "no pdf content return",
                                  }),
                            (r = a),
                            i.FreeReservedData();
                    })();
                    break;
                case "GetWasmVersion":
                    r = i.GetWasmVersion();
                    break;
                case "NewPdfPage":
                    r = i.NewPdfPage.apply(i, t.params.input);
                    break;
                case "WritePdfPage":
                    r = i.WritePdfPage();
                    break;
                case "PdfPageAddImage":
                    r = i.PdfPageAddImage.apply(i, t.params.input);
                    break;
                case "PdfPageAddText":
                    r = i.PdfPageAddText.apply(i, t.params.input);
                    break;
                case "PdfPageAddAnnotation":
                    r = i.PdfPageAddAnnotation.apply(i, t.params.input);
                    break;
                case "PdfPageAddPath":
                    r = i.PdfPageAddPath.apply(i, t.params.input);
                    break;
                case "PdfPageSetRotate":
                    r = i.PdfPageSetRotate.apply(i, t.params.input);
            }
            e.context.logDebug(t, t.func + " end, send back begin");
            let l,
                c = {
                    id: t.id,
                    func: t.func,
                    result: r,
                    memSize: o.HEAPU8.length,
                },
                m = Object.prototype.toString.call(r.pdfData);
            ("[object ArrayBuffer]" !== m &&
                "[object Uint8ClampedArray]" !== m &&
                "[object Uint8Array]" != m) ||
                (l = [
                    null != c.result.pdfData.buffer
                        ? c.result.pdfData.buffer
                        : c.result.pdfData,
                ]);
            let u = self;
            null != l ? u.postMessage(c, l) : u.postMessage(c),
                e.context.logDebug(t, t.func + " end, send back end");
        }
    }
    new W();
    class G {
        static fetchRetry(e, a, t, r) {
            let s = a.retries,
                n = a.retryDelay;
            return new Promise(function (i, o) {
                const l = function (c) {
                    return fetch(e, a)
                        .then(function (e) {
                            i(e);
                        })
                        .catch(function (e) {
                            c < s
                                ? (function (e, a, s) {
                                      t && t(a, r);
                                      setTimeout(function () {
                                          l(++e);
                                      }, n);
                                  })(c, e)
                                : o(e);
                        });
                };
                return l(0);
            });
        }
    }
    class N {
        static buildWasmFileName(e, a, t, r) {
            return e + (r ? "sn-" : "") + a + t;
        }
        static base64DecToArr(e, a) {
            let t = e.replace(/[^A-Za-z0-9\+\/]/g, ""),
                r = t.length,
                s = a
                    ? Math.ceil(((3 * r + 1) >>> 2) / a) * a
                    : (3 * r + 1) >>> 2,
                n = new Uint8Array(s);
            for (let e, a, i = 0, o = 0, l = 0; l < r; l++)
                if (
                    ((a = 3 & l),
                    (i |=
                        _(this, u, "m", p).call(this, t.charCodeAt(l)) <<
                        (18 - 6 * a)),
                    3 === a || r - l == 1)
                ) {
                    for (e = 0; e < 3 && o < s; e++, o++)
                        n[o] = (i >>> ((16 >>> e) & 24)) & 255;
                    i = 0;
                }
            return n;
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
    (u = N),
        (p = function (e) {
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
    (d = new WeakMap()),
        (g = new WeakMap()),
        (y = new WeakMap()),
        (b = new WeakMap()),
        (h = new WeakMap()),
        (w = new WeakMap()),
        (I = new WeakMap()),
        (P = new WeakMap()),
        (f = new WeakSet()),
        (M = function () {
            j(this, d, null, "f");
        }),
        (A = function (e, a) {
            _(this, w, "f").postMessage({ id: e.id, func: "status", log: a }),
                e.params &&
                    "function" == typeof e.params.callback &&
                    e.params.callback(a);
        }),
        (k = function (e, a) {
            _(this, w, "f").postMessage({ id: e.id, func: "log", log: a }),
                e.params &&
                    "function" == typeof e.params.callback &&
                    e.params.callback(a);
        }),
        (T = function (e) {
            let a = {
                name: "",
                promise: void 0,
                resolve: void 0,
                reject: void 0,
                wasmModule: null,
            };
            return (
                (a.name = e),
                (a.promise = new Promise(function (e, t) {
                    (a.resolve = e), (a.reject = t);
                })),
                (a.wasmModule = null),
                a
            );
        }),
        (S = function (a, t) {
            var r;
            let s = this,
                n = Date.now();
            j(
                this,
                b,
                N.buildWasmFileName(a.prefixName, a.ver, e.wasmExtension, !1),
                "f"
            ),
                _(this, f, "m", A).call(
                    this,
                    t,
                    "loading " + _(this, b, "f") + "..."
                );
            let i = _(this, f, "m", T).call(this, a.name);
            i.wasmModule = a.wasmModule;
            let o = {
                print: function (e) {
                    (e += ""), _(s, f, "m", k).call(s, t, e);
                },
                printErr: function (e) {
                    (e += ""), i.reject({ name: i.name, error: e });
                },
                INITIAL_MEMORY:
                    1024 *
                    (null !== (r = t.params.initMemory) && void 0 !== r
                        ? r
                        : 32) *
                    1024,
                instantiateWasm: function (e, a) {
                    if (i.wasmModule)
                        return WebAssembly.instantiate(i.wasmModule, e)
                            .then(
                                function (e) {
                                    _(s, f, "m", k).call(
                                        s,
                                        t,
                                        "instantiate with wasm module"
                                    ),
                                        a(e, i.wasmModule);
                                },
                                function (e) {
                                    (e += ""),
                                        _(s, f, "m", k).call(
                                            s,
                                            t,
                                            "wasm instantiate 2 failed: " + e
                                        ),
                                        i.reject({ name: i.name, error: e });
                                }
                            )
                            .catch(function (e) {
                                _(s, f, "m", k).call(s, t, JSON.stringify(e));
                                let a = e.message + "";
                                i.reject({ name: i.name, error: a });
                            });
                    {
                        const r = _(s, y, "f").retries,
                            n = _(s, y, "f").retryDelay;
                        let o = function (n) {
                            return E(this, void 0, void 0, function* () {
                                try {
                                    const o = G.fetchRetry(
                                            _(s, g, "f") + _(s, b, "f"),
                                            _(s, y, "f"),
                                            function (e, a) {
                                                return (
                                                    _(s, f, "m", k).call(
                                                        s,
                                                        t,
                                                        e
                                                    ),
                                                    !0
                                                );
                                            },
                                            t
                                        ),
                                        c = yield o;
                                    if (c.ok) {
                                        const t = yield c.arrayBuffer(),
                                            r = yield WebAssembly.instantiate(
                                                t,
                                                e
                                            );
                                        return (
                                            (i.wasmModule = r.module),
                                            a(r.instance, r.module),
                                            r
                                        );
                                    }
                                    if (n < r) l(n);
                                    else {
                                        let e =
                                            "failed to load wasm binary file, please check.";
                                        i.reject({ name: i.name, error: e });
                                    }
                                } catch (e) {
                                    if (
                                        (_(s, f, "m", k).call(
                                            s,
                                            t,
                                            "wasm instantiate 1 failed: "
                                        ),
                                        _(s, f, "m", k).call(
                                            s,
                                            t,
                                            JSON.stringify(e)
                                        ),
                                        _(s, f, "m", k).call(
                                            s,
                                            t,
                                            "attempt " + n + ", retries: " + r
                                        ),
                                        n < r)
                                    )
                                        l(n);
                                    else {
                                        let a = e.message + "";
                                        i.reject({ name: i.name, error: a });
                                    }
                                }
                            });
                        };
                        function l(e) {
                            setTimeout(function () {
                                o(++e);
                            }, n);
                        }
                        o(0);
                    }
                    return {};
                },
                onRuntimeInitialized: function () {
                    return E(this, void 0, void 0, function* () {
                        _(s, f, "m", A).call(
                            s,
                            t,
                            a.name +
                                " wasm initialized, cost " +
                                (Date.now() - n) +
                                " ms"
                        ),
                            i.resolve();
                    });
                },
            };
            return (
                _(this, h, "f")
                    .call(this, o)
                    .then((e) => {
                        j(this, d, e, "f"), (_(this, I, "f")[a.name] = !0);
                    }),
                i
            );
        }),
        (D = function (a, t) {
            var r;
            let s = this,
                n = _(this, f, "m", T).call(this, a.name),
                i =
                    _(this, g, "f") +
                    N.buildWasmFileName(
                        a.prefixName,
                        a.ver,
                        e.wasmExtension,
                        null !== (r = a.useSimd) && void 0 !== r && r
                    ),
                o = Date.now();
            _(this, f, "m", A).call(this, t, "loading " + i + "...");
            let l = {
                loadAsync: !0,
                global: !0,
                nodelete: !0,
                wasmModule: a.wasmModule,
                log: function (e) {
                    _(s, f, "m", k).call(s, t, e);
                },
                fetchOptions: _(this, y, "f"),
                fetchRetry: function (e, a) {
                    return G.fetchRetry(
                        e,
                        a,
                        function (e, a) {
                            return _(s, f, "m", k).call(s, t, e), !0;
                        },
                        t
                    );
                },
            };
            const c = _(this, y, "f").retries,
                m = _(this, y, "f").retryDelay;
            let u = function (e) {
                return E(this, void 0, void 0, function* () {
                    _(s, d, "f")
                        .loadDynamicLibrary(i, l)
                        .then(
                            function (r) {
                                _(s, f, "m", A).call(
                                    s,
                                    t,
                                    i +
                                        " initialized, cost " +
                                        (Date.now() - o) +
                                        " ms"
                                ),
                                    null === l.wasmModule
                                        ? (null !=
                                          _(s, d, "f").LDSO.loadedLibsByName
                                              ? delete _(s, d, "f").LDSO
                                                    .loadedLibsByName[i]
                                              : null !=
                                                    _(s, d, "f").LDSO
                                                        .loadedLibNames &&
                                                delete _(s, d, "f").LDSO
                                                    .loadedLibNames[i],
                                          _(s, f, "m", k).call(
                                              s,
                                              t,
                                              "wasm is null, attempt " +
                                                  e +
                                                  ", retries: " +
                                                  c
                                          ),
                                          e < c
                                              ? p(e)
                                              : n.reject({
                                                    name: n.name,
                                                    error:
                                                        "string" == typeof r
                                                            ? r
                                                            : r.toString(),
                                                }))
                                        : ((n.wasmModule = l.wasmModule),
                                          (l = null),
                                          (_(s, I, "f")[a.name] = !0),
                                          n.resolve());
                            },
                            function (a) {
                                (a += ""),
                                    _(s, f, "m", A).call(s, t, i + " failed"),
                                    _(s, f, "m", A).call(s, t, a),
                                    _(s, f, "m", k).call(
                                        s,
                                        t,
                                        "attempt " + e + ", retries: " + c
                                    ),
                                    e < c
                                        ? p(e)
                                        : n.reject({
                                              name: n.name,
                                              error:
                                                  "string" == typeof a
                                                      ? a
                                                      : a.toString(),
                                          });
                            }
                        );
                });
            };
            function p(e) {
                setTimeout(function () {
                    u(++e);
                }, m);
            }
            return u(0), n;
        }),
        (v = function (e) {
            try {
                _(this, w, "f").postMessage(e);
            } catch (a) {
                for (const a of e.result.modules) a.wasmModule = null;
                _(this, w, "f").postMessage(e);
            }
        });
    var J = new (class {
        constructor(e) {
            f.add(this),
                d.set(this, null),
                g.set(this, ""),
                y.set(this, { mode: "cors", credentials: "same-origin" }),
                b.set(this, ""),
                h.set(this, null),
                w.set(this, self),
                I.set(this, []),
                P.set(this, void 0),
                _(this, f, "m", M).call(this),
                j(this, h, e, "f");
        }
        logDebug(a, t) {
            if (a && a.params) {
                let r = "";
                a.params.logLevel === e.logDebug &&
                    ((r = "[wm][" + Date.now() / 1e3 + "] " + t),
                    _(this, f, "m", k).call(this, a, r));
            }
        }
        get Module() {
            return _(this, d, "f");
        }
        loadWasm(e) {
            return E(this, void 0, void 0, function* () {
                null != e.params.resourceDir &&
                    j(this, g, e.params.resourceDir, "f"),
                    null != e.params.fetchOptions &&
                        j(this, y, e.params.fetchOptions, "f");
                let a = Object.create(null);
                a.promise = new Promise(function (e, t) {
                    (a.resolve = e), (a.reject = t);
                });
                try {
                    let a = { modules: [] };
                    if (e.params.module) {
                        let t = e.params.module.modulesInfo;
                        for (const r of t)
                            if (
                                !_(this, I, "f")[r.name] &&
                                (null === r.dependencyModules ||
                                    0 === r.dependencyModules.length)
                            ) {
                                let t = _(this, f, "m", S).call(this, r, e);
                                yield t.promise,
                                    a.modules.push({
                                        name: r.name,
                                        wasmModule: t.wasmModule,
                                    });
                            }
                        for (const r of t)
                            if (
                                !_(this, I, "f")[r.name] &&
                                r.dependencyModules &&
                                0 != r.dependencyModules.length
                            ) {
                                let t = _(this, f, "m", D).call(this, r, e);
                                yield t.promise,
                                    a.modules.push({
                                        name: r.name,
                                        wasmModule: t.wasmModule,
                                    });
                            }
                        _(this, f, "m", v).call(this, {
                            id: e.id,
                            func: e.func,
                            result: a,
                            memSize: _(this, d, "f").HEAPU8.length,
                        });
                    }
                } catch (t) {
                    let r = {
                        errorCode: s.wasmException,
                        errorMessage: JSON.stringify(t),
                        stack: JSON.stringify(t.stack),
                    };
                    if ("object" == typeof t && e.params.module) {
                        let a = e.params.module.modulesInfo;
                        (r.modules = []),
                            void 0 !== t.error
                                ? (r.errorMessage = t.error)
                                : (r.errorMessage =
                                      void 0 !== t.message
                                          ? t.message
                                          : "unknown error"),
                            delete r.stack,
                            r.modules.push({ name: t.name, wasmModule: null });
                        for (const e of a)
                            r.modules.push({ name: e.name, wasmModule: null });
                    }
                    _(this, w, "f").postMessage({
                        id: e.id,
                        func: e.func,
                        result: r,
                    }),
                        a.reject(r);
                }
                return a.promise;
            });
        }
        handleMessage(e) {
            if ("string" == typeof e) return;
            if (null == e.func) return;
            let a = null;
            e.params &&
                ((a = e.params.val), this.logDebug(e, "received " + e.func)),
                null != a && (x = a),
                j(this, P, x, "f");
            let t = e;
            if (
                "object" == typeof t &&
                "object" == typeof t.result &&
                t.result.errorCode === s.wasmException
            )
                return;
            let r = this.Module,
                n = this,
                i = {
                    data: e,
                    entryModule: r,
                    context: this,
                    wasmMemoryPtr: null,
                };
            try {
                let a = null;
                if ("loadWasm" === e.func)
                    return void this.loadWasm(e).catch(function (a) {
                        let t =
                            (void 0 !== a.message ? a.message : "") +
                            "" +
                            (void 0 !== a.errorMessage ? a.errorMessage : "");
                        _(n, w, "f").postMessage({
                            id: e.id,
                            func: e.func,
                            result: {
                                errorCode: s.wasmException,
                                errorMessage: t,
                                stack: a.stack,
                            },
                        });
                    });
                if ((e.func, r)) {
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
                            (a = r._malloc(s)),
                                "[object ArrayBuffer]" === t
                                    ? r.HEAPU8.set(
                                          new Uint8Array(e.params.input[0]),
                                          a
                                      )
                                    : r.HEAPU8.set(
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
                        (a = r._malloc(s)),
                            "[object ArrayBuffer]" === t
                                ? r.HEAPU8.set(
                                      new Uint8Array(e.params.input),
                                      a
                                  )
                                : r.HEAPU8.set(
                                      new Uint8Array(e.params.input.buffer),
                                      a
                                  ),
                            (e.params.srcBuffer = e.params.input),
                            (e.params.input = [a, s]);
                    }
                    this.logDebug(e, "try to init buffer end");
                }
                this.logDebug(e, e.func + " start"),
                    (i.wasmMemoryPtr = a),
                    B.process(i),
                    i.wasmMemoryPtr && r && r._free(i.wasmMemoryPtr);
            } catch (a) {
                i.wasmMemoryPtr && r && r._free(i.wasmMemoryPtr),
                    "object" != typeof a && (a = { message: a, stack: "" }),
                    _(n, w, "f").postMessage({
                        id: e.id,
                        func: e.func,
                        result: {
                            errorCode: s.wasmException,
                            errorMessage: a.message,
                            stack: a.stack,
                        },
                        memSize: r.HEAPU8.length,
                    });
            }
        }
    })(ImageIOModule);
    (onmessage = function (e) {
        J.handleMessage(e.data);
    }),
        self.postMessage("ready");
    class F {}
    return (
        (F.ImageCoreGlue = C), (F.ImageProcGlue = O), (F.PdfWriterGlue = W), F
    );
});
