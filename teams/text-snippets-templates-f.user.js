// ==UserScript==
// @name        Text Snippets & Templates for Teams
// @version     1.3.5
// @description Reusable text snippets and templates with fillable fields. Share them with your team and insert them anywhere in seconds.
// @namespace   text-snippets-templates-for-teams
// @author      Converter Script
// @match       https://*.wordfields.com/*
// @match       https://*.textfields.com/*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_registerMenuCommand
// @grant       GM_openInTab
// @icon        data:image/png;base64,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
// @run-at      document-idle
// ==/UserScript==

console.log("Script start:",performance.now());const e=!0,t=e=>e,o="passthrough";let s,c={createHTML:t,createScript:t,createScriptURL:t},i=!1;const r=()=>{try{void 0!==window.isSecureContext&&window.isSecureContext&&window.trustedTypes&&window.trustedTypes.createPolicy&&(i=!0,trustedTypes.defaultPolicy?(l("TT Default Policy exists"),c=window.trustedTypes.createPolicy("default",c),s=trustedTypes.defaultPolicy,l(`Created custom passthrough policy, in case the default policy is too restrictive: Use Policy '${o}' in var 'TTP':`,c)):s=c=window.trustedTypes.createPolicy("default",c),l("Trusted-Type Policies: TTP:",c,"TTP_default:",s))}catch(e){l(e)}},l=(...e)=>{console.log(...e)};r();

(function() {
    // #region Logging
	
	  const SCRIPT_NAME = "Text Snippets & Templates for Teams";
	  const _log = (...args) => {};
	  const _warn = (...args) => console.warn(`[${typeof SCRIPT_NAME === 'string' ? SCRIPT_NAME : '[USERSCRIPT_CONVERTED]'}]`, ...args);
	  const _error = (...args) => {
	    let e = args[0];
	    console.error(`[${typeof SCRIPT_NAME === 'string' ? SCRIPT_NAME : '[USERSCRIPT_CONVERTED]'}]`, ...args);
	  }
	  
    // #endregion
    // #region Unified Polyfill
	
// #region Messaging implementation
		
		function createEventBus(
		  scopeId,
		  type = "page", // "page" or "iframe"
		  { allowedOrigin = "*", children = [], parentWindow = null } = {}
		) {
		  if (!scopeId) throw new Error("createEventBus requires a scopeId");
		
		  const handlers = {};
		
		  function handleIncoming(ev) {
		    if (allowedOrigin !== "*" && ev.origin !== allowedOrigin) return;
		
		    const msg = ev.data;
		    if (!msg || msg.__eventBus !== true || msg.scopeId !== scopeId) return;
		
		    const { event, payload } = msg;
		
		    // PAGE: if it's an INIT from an iframe, adopt it
		    if (type === "page" && event === "__INIT__") {
		      const win = ev.source;
		      if (win && !children.includes(win)) {
		        children.push(win);
		      }
		      return;
		    }
		
		    (handlers[event] || []).forEach((fn) =>
		      fn(payload, { origin: ev.origin, source: ev.source })
		    );
		  }
		
		  window.addEventListener("message", handleIncoming);
		
		  function emitTo(win, event, payload) {
		    const envelope = {
		      __eventBus: true,
		      scopeId,
		      event,
		      payload,
		    };
		    win.postMessage(envelope, allowedOrigin);
		  }
		
		  // IFRAME: announce to page on startup
		  if (type === "iframe") {
		    setTimeout(() => {
		      const pw = parentWindow || window.parent;
		      if (pw && pw.postMessage) {
		        emitTo(pw, "__INIT__", null);
		      }
		    }, 0);
		  }
		
		  return {
		    on(event, fn) {
		      handlers[event] = handlers[event] || [];
		      handlers[event].push(fn);
		    },
		    off(event, fn) {
		      if (!handlers[event]) return;
		      handlers[event] = handlers[event].filter((h) => h !== fn);
		    },
		    /**
		     * Emits an event.
		     * @param {string} event - The event name.
		     * @param {any} payload - The event payload.
		     * @param {object} [options] - Emission options.
		     * @param {Window} [options.to] - A specific window to target. If provided, message is ONLY sent to the target.
		     */
		    emit(event, payload, { to } = {}) {
		      // If a specific target window is provided, send only to it and DO NOT dispatch locally.
		      // This prevents a port from receiving its own messages.
		      if (to) {
		        if (to && typeof to.postMessage === "function") {
		          emitTo(to, event, payload);
		        }
		        return; // Exit after targeted send.
		      }
		
		      // For broadcast messages (no 'to' target), dispatch locally first.
		      (handlers[event] || []).forEach((fn) =>
		        fn(payload, { origin: location.origin, source: window })
		      );
		
		      // Then propagate the broadcast to other windows.
		      if (type === "page") {
		        children.forEach((win) => emitTo(win, event, payload));
		      } else {
		        const pw = parentWindow || window.parent;
		        if (pw && pw.postMessage) {
		          emitTo(pw, event, payload);
		        }
		      }
		    },
		  };
		}
		
		function createRuntime(type = "background", bus) {
		  let nextId = 1;
		  const pending = {};
		  const msgListeners = [];
		
		  let nextPortId = 1;
		  const ports = {};
		  const onConnectListeners = [];
		
		  function parseArgs(args) {
		    let target, message, options, callback;
		    const arr = [...args];
		    if (arr.length === 0) {
		      throw new Error("sendMessage requires at least one argument");
		    }
		    if (arr.length === 1) {
		      return { message: arr[0] };
		    }
		    // last object could be options
		    if (
		      arr.length &&
		      typeof arr[arr.length - 1] === "object" &&
		      !Array.isArray(arr[arr.length - 1])
		    ) {
		      options = arr.pop();
		    }
		    // last function is callback
		    if (arr.length && typeof arr[arr.length - 1] === "function") {
		      callback = arr.pop();
		    }
		    if (
		      arr.length === 2 &&
		      (typeof arr[0] === "string" || typeof arr[0] === "number")
		    ) {
		      [target, message] = arr;
		    } else {
		      [message] = arr;
		    }
		    return { target, message, options, callback };
		  }
		
		  if (type === "background") {
		    bus.on("__REQUEST__", ({ id, message }, { source }) => {
		      let responded = false,
		        isAsync = false;
		      function sendResponse(resp) {
		        if (responded) return;
		        responded = true;
		        // Target the response directly back to the window that sent the request.
		        bus.emit("__RESPONSE__", { id, response: resp }, { to: source });
		      }
		      const results = msgListeners
		        .map((fn) => {
		          try {
		            // msg, sender, sendResponse
		            const ret = fn(message, { id, tab: { id: source } }, sendResponse);
		            if (ret === true || (ret && typeof ret.then === "function")) {
		              isAsync = true;
		              return ret;
		            }
		            return ret;
		          } catch (e) {
		            _error(e);
		          }
		        })
		        .filter((r) => r !== undefined);
		
		      const promises = results.filter((r) => r && typeof r.then === "function");
		      if (!isAsync && promises.length === 0) {
		        const out = results.length === 1 ? results[0] : results;
		        sendResponse(out);
		      } else if (promises.length) {
		        Promise.all(promises).then((vals) => {
		          if (!responded) {
		            const out = vals.length === 1 ? vals[0] : vals;
		            sendResponse(out);
		          }
		        });
		      }
		    });
		  }
		
		  if (type !== "background") {
		    bus.on("__RESPONSE__", ({ id, response }) => {
		      const entry = pending[id];
		      if (!entry) return;
		      entry.resolve(response);
		      if (entry.callback) entry.callback(response);
		      delete pending[id];
		    });
		  }
		
		  function sendMessage(...args) {
		    // Background should be able to send message to itself
		    // if (type === "background") {
		    //   throw new Error("Background cannot sendMessage to itself");
		    // }
		    const { target, message, callback } = parseArgs(args);
		    const id = nextId++;
		    const promise = new Promise((resolve) => {
		      pending[id] = { resolve, callback };
		      bus.emit("__REQUEST__", { id, message });
		    });
		    return promise;
		  }
		
		  bus.on("__PORT_CONNECT__", ({ portId, name }, { source }) => {
		    if (type !== "background") return;
		    const backgroundPort = makePort("background", portId, name, source);
		    ports[portId] = backgroundPort;
		
		    onConnectListeners.forEach((fn) => fn(backgroundPort));
		
		    // send back a CONNECT_ACK so the client can
		    // start listening on its end:
		    bus.emit("__PORT_CONNECT_ACK__", { portId, name }, { to: source });
		  });
		
		  // Clients handle the ACK and finalize their Port object by learning the remote window.
		  bus.on("__PORT_CONNECT_ACK__", ({ portId, name }, { source }) => {
		    if (type === "background") return; // ignore
		    const p = ports[portId];
		    if (!p) return;
		    // Call the port's internal finalize method to complete the handshake
		    if (p._finalize) {
		      p._finalize(source);
		    }
		  });
		
		  // Any port message travels via "__PORT_MESSAGE__"
		  bus.on("__PORT_MESSAGE__", (envelope, { source }) => {
		    const { portId } = envelope;
		    const p = ports[portId];
		    if (!p) return;
		    p._receive(envelope, source);
		  });
		
		  // Any port disconnect:
		  bus.on("__PORT_DISCONNECT__", ({ portId }) => {
		    const p = ports[portId];
		    if (!p) return;
		    p._disconnect();
		    delete ports[portId];
		  });
		
		  // Refactored makePort to correctly manage internal state and the connection handshake.
		  function makePort(side, portId, name, remoteWindow) {
		    let onMessageHandlers = [];
		    let onDisconnectHandlers = [];
		    let buffer = [];
		    // Unique instance ID for this port instance
		    const instanceId = Math.random().toString(36).slice(2) + Date.now();
		    // These state variables are part of the closure and are updated by _finalize
		    let _ready = side === "background";
		
		    function _drainBuffer() {
		      buffer.forEach((m) => _post(m));
		      buffer = [];
		    }
		
		    function _post(msg) {
		      // Always use the 'to' parameter for port messages, making them directional.
		      // Include senderInstanceId
		      bus.emit(
		        "__PORT_MESSAGE__",
		        { portId, msg, senderInstanceId: instanceId },
		        { to: remoteWindow }
		      );
		    }
		
		    function postMessage(msg) {
		      if (!_ready) {
		        buffer.push(msg);
		      } else {
		        _post(msg);
		      }
		    }
		
		    function _receive(envelope, source) {
		      // envelope: { msg, senderInstanceId }
		      if (envelope.senderInstanceId === instanceId) return; // Don't dispatch to self
		      onMessageHandlers.forEach((fn) =>
		        fn(envelope.msg, { id: portId, tab: { id: source } })
		      );
		    }
		
		    function disconnect() {
		      // Also use the 'to' parameter for disconnect messages
		      bus.emit("__PORT_DISCONNECT__", { portId }, { to: remoteWindow });
		      _disconnect();
		      delete ports[portId];
		    }
		
		    function _disconnect() {
		      onDisconnectHandlers.forEach((fn) => fn());
		      onMessageHandlers = [];
		      onDisconnectHandlers = [];
		    }
		
		    // This function is called on the client port when the ACK is received from background.
		    // It updates the port's state, completing the connection.
		    function _finalize(win) {
		      remoteWindow = win; // <-- This is the crucial part: learn the destination
		      _ready = true;
		      _drainBuffer();
		    }
		
		    return {
		      name,
		      sender: {
		        id: portId,
		      },
		      onMessage: {
		        addListener(fn) {
		          onMessageHandlers.push(fn);
		        },
		        removeListener(fn) {
		          onMessageHandlers = onMessageHandlers.filter((x) => x !== fn);
		        },
		      },
		      onDisconnect: {
		        addListener(fn) {
		          onDisconnectHandlers.push(fn);
		        },
		        removeListener(fn) {
		          onDisconnectHandlers = onDisconnectHandlers.filter((x) => x !== fn);
		        },
		      },
		      postMessage,
		      disconnect,
		      // Internal methods used by the runtime
		      _receive,
		      _disconnect,
		      _finalize, // Expose the finalizer for the ACK handler
		    };
		  }
		
		  function connect(connectInfo = {}) {
		    if (type === "background") {
		      throw new Error("Background must use onConnect, not connect()");
		    }
		    const name = connectInfo.name || "";
		    const portId = nextPortId++;
		    // create the client side port
		    // remoteWindow is initially null; it will be set by _finalize upon ACK.
		    const clientPort = makePort("client", portId, name, null);
		    ports[portId] = clientPort;
		
		    // fire the connect event across the bus
		    bus.emit("__PORT_CONNECT__", { portId, name });
		    return clientPort;
		  }
		
		  function onConnect(fn) {
		    if (type !== "background") {
		      throw new Error("connect event only fires in background");
		    }
		    onConnectListeners.push(fn);
		  }
		
		  return {
		    // rpc:
		    sendMessage,
		    onMessage: {
		      addListener(fn) {
		        msgListeners.push(fn);
		      },
		      removeListener(fn) {
		        const i = msgListeners.indexOf(fn);
		        if (i >= 0) msgListeners.splice(i, 1);
		      },
		    },
		
		    // port API:
		    connect,
		    onConnect: {
		      addListener(fn) {
		        onConnect(fn);
		      },
		      removeListener(fn) {
		        const i = onConnectListeners.indexOf(fn);
		        if (i >= 0) onConnectListeners.splice(i, 1);
		      },
		    },
		  };
		}
		
		
// #region Abstraction layer Handle postmesage for
			(function () {
			  const pendingRequests = new Map(); // requestId -> { resolve, reject, timeout }
			  let nextRequestId = 1;
			
			  window.addEventListener("message", async (event) => {
			    const { type, requestId, method, args } = event.data;
			
			    if (type === "abstraction-request") {
			      try {
			        let result;
			
			        switch (method) {
			          case "_storageSet":
			            result = await _storageSet(args[0]);
			            break;
			          case "_storageGet":
			            result = await _storageGet(args[0]);
			            break;
			          case "_storageRemove":
			            result = await _storageRemove(args[0]);
			            break;
			          case "_storageClear":
			            result = await _storageClear();
			            break;
			          case "_cookieList":
			            result = await _cookieList(args[0]);
			            break;
			          case "_cookieSet":
			            result = await _cookieSet(args[0]);
			            break;
			          case "_cookieDelete":
			            result = await _cookieDelete(args[0]);
			            break;
			          case "_fetch":
			            result = await _fetch(args[0], args[1]);
			            break;
			          case "_registerMenuCommand":
			            result = _registerMenuCommand(args[0], args[1]);
			            break;
			          case "_openTab":
			            result = _openTab(args[0], args[1]);
			            break;
			          case "_initStorage":
			            result = await _initStorage();
			            break;
			          default:
			            throw new Error(`Unknown abstraction method: ${method}`);
			        }
			
			        event.source.postMessage({
			          type: "abstraction-response",
			          requestId,
			          success: true,
			          result,
			        });
			      } catch (error) {
			        event.source.postMessage({
			          type: "abstraction-response",
			          requestId,
			          success: false,
			          error: {
			            message: error.message,
			            stack: error.stack,
			          },
			        });
			      }
			    }
			  });
			
			  _log("[PostMessage Handler] Abstraction layer message handler initialized");
			})();
			
			
// #endregion
// #region Abstraction Layer Userscript Target
			
			async function _storageSet(items) {
			  try {
			    for (const key in items) {
			      if (items.hasOwnProperty(key)) {
			        await GM_setValue(key, items[key]);
			      }
			    }
			    return Promise.resolve();
			  } catch (e) {
			    _error("GM_setValue error:", e);
			    return Promise.reject(e);
			  }
			}
			
			async function _storageGet(keys) {
			  if (!keys) {
			    keys = null;
			  }
			  if (
			    Array.isArray(keys) &&
			    (keys.length === 0 || [null, undefined].includes(keys[0]))
			  ) {
			    keys = null;
			  }
			  try {
			    const results = {};
			    let keyList = [];
			    let defaults = {};
			    let requestedKeys = [];
			
			    if (keys === null) {
			      keyList = await GM_listValues();
			      requestedKeys = [...keyList];
			    } else if (typeof keys === "string") {
			      keyList = [keys];
			      requestedKeys = [keys];
			    } else if (Array.isArray(keys)) {
			      keyList = keys;
			      requestedKeys = [...keys];
			    } else if (typeof keys === "object" && keys !== null) {
			      keyList = Object.keys(keys);
			      requestedKeys = [...keyList];
			      defaults = keys;
			    } else {
			      _error("_storageGet error: Invalid keys format", keys);
			      return Promise.reject(new Error("Invalid keys format for get"));
			    }
			
			    for (const key of keyList) {
			      const defaultValue = defaults.hasOwnProperty(key)
			        ? defaults[key]
			        : undefined;
			      const storedValue = await GM_getValue(key, defaultValue);
			      results[key] = storedValue;
			    }
			
			    const finalResult = {};
			    for (const key of requestedKeys) {
			      if (results.hasOwnProperty(key)) {
			        finalResult[key] = results[key];
			      } else if (defaults.hasOwnProperty(key)) {
			        finalResult[key] = defaults[key];
			      }
			    }
			
			    return Promise.resolve(finalResult);
			  } catch (e) {
			    _error("GM_getValue/GM_listValues error:", e);
			    return Promise.reject(e);
			  }
			}
			
			async function _storageRemove(keysToRemove) {
			  try {
			    let keyList = [];
			    if (typeof keysToRemove === "string") {
			      keyList = [keysToRemove];
			    } else if (Array.isArray(keysToRemove)) {
			      keyList = keysToRemove;
			    } else {
			      _error("_storageRemove error: Invalid keys format", keysToRemove);
			      return Promise.reject(new Error("Invalid keys format for remove"));
			    }
			
			    for (const key of keyList) {
			      await GM_deleteValue(key);
			    }
			    return Promise.resolve();
			  } catch (e) {
			    _error("GM_deleteValue error:", e);
			    return Promise.reject(e);
			  }
			}
			
			async function _storageClear() {
			  try {
			    const keys = await GM_listValues();
			    await Promise.all(keys.map((key) => GM_deleteValue(key)));
			    return Promise.resolve();
			  } catch (e) {
			    _error("GM_listValues/GM_deleteValue error during clear:", e);
			    return Promise.reject(e);
			  }
			}
			
			async function _cookieList(details) {
			  return new Promise((resolve, reject) => {
			    if (typeof GM_cookie === "undefined" || !GM_cookie.list) {
			      return reject(new Error("GM_cookie.list is not available."));
			    }
			    GM_cookie.list(details, (cookies, error) => {
			      if (error) {
			        return reject(new Error(error));
			      }
			      resolve(cookies);
			    });
			  });
			}
			
			async function _cookieSet(details) {
			  return new Promise((resolve, reject) => {
			    if (typeof GM_cookie === "undefined" || !GM_cookie.set) {
			      return reject(new Error("GM_cookie.set is not available."));
			    }
			    GM_cookie.set(details, (error) => {
			      if (error) {
			        return reject(new Error(error));
			      }
			      resolve();
			    });
			  });
			}
			
			async function _cookieDelete(details) {
			  return new Promise((resolve, reject) => {
			    if (typeof GM_cookie === "undefined" || !GM_cookie.delete) {
			      return reject(new Error("GM_cookie.delete is not available."));
			    }
			    GM_cookie.delete(details, (error) => {
			      if (error) {
			        return reject(new Error(error));
			      }
			      resolve();
			    });
			  });
			}
			
			async function _fetch(url, options = {}) {
			  return new Promise((resolve, reject) => {
			    try {
			      GM_xmlhttpRequest({
			        method: options.method || "GET",
			        url: url,
			        headers: options.headers || {},
			        data: options.body,
			        responseType: options.responseType,
			        timeout: options.timeout || 0,
			        binary:
			          options.responseType === "blob" ||
			          options.responseType === "arraybuffer",
			        onload: function (response) {
			          const responseHeaders = {};
			          if (response.responseHeaders) {
			            response.responseHeaders
			              .trim()
			              .split("\\r\\n")
			              .forEach((header) => {
			                const parts = header.match(/^([^:]+):\s*(.*)$/);
			                if (parts && parts.length === 3) {
			                  responseHeaders[parts[1].toLowerCase()] = parts[2];
			                }
			              });
			          }
			
			          const mockResponse = {
			            ok: response.status >= 200 && response.status < 300,
			            status: response.status,
			            statusText:
			              response.statusText ||
			              (response.status >= 200 && response.status < 300 ? "OK" : ""),
			            url: response.finalUrl || url,
			            headers: new Headers(responseHeaders),
			            text: () => Promise.resolve(response.responseText),
			            json: () => {
			              try {
			                return Promise.resolve(JSON.parse(response.responseText));
			              } catch (e) {
			                return Promise.reject(new SyntaxError("Could not parse JSON"));
			              }
			            },
			            blob: () => {
			              if (response.response instanceof Blob) {
			                return Promise.resolve(response.response);
			              }
			              return Promise.reject(
			                new Error("Requires responseType:'blob' in GM_xmlhttpRequest")
			              );
			            },
			            arrayBuffer: () => {
			              if (response.response instanceof ArrayBuffer) {
			                return Promise.resolve(response.response);
			              }
			              return Promise.reject(
			                new Error(
			                  "Requires responseType:'arraybuffer' in GM_xmlhttpRequest"
			                )
			              );
			            },
			            clone: function () {
			              const cloned = { ...this };
			              cloned.text = () => Promise.resolve(response.responseText);
			              cloned.json = () => this.json();
			              cloned.blob = () => this.blob();
			              cloned.arrayBuffer = () => this.arrayBuffer();
			              return cloned;
			            },
			          };
			
			          if (mockResponse.ok) {
			            resolve(mockResponse);
			          } else {
			            const error = new Error(`HTTP error! status: ${response.status}`);
			            error.response = mockResponse;
			            reject(error);
			          }
			        },
			        onerror: function (response) {
			          reject(
			            new Error(
			              `GM_xmlhttpRequest network error: ${
			                response.statusText || "Unknown Error"
			              }`
			            )
			          );
			        },
			        onabort: function () {
			          reject(new Error("GM_xmlhttpRequest aborted"));
			        },
			        ontimeout: function () {
			          reject(new Error("GM_xmlhttpRequest timed out"));
			        },
			      });
			    } catch (e) {
			      _error("_fetch (GM_xmlhttpRequest) error:", e);
			      reject(e);
			    }
			  });
			}
			
			function _registerMenuCommand(name, func) {
			  if (typeof GM_registerMenuCommand === "function") {
			    try {
			      GM_registerMenuCommand(name, func);
			    } catch (e) {
			      _error("GM_registerMenuCommand failed:", e);
			    }
			  } else {
			    _warn("GM_registerMenuCommand not available.");
			  }
			}
			
			function _openTab(url, active) {
			  if (typeof GM_openInTab === "function") {
			    try {
			      GM_openInTab(url, { loadInBackground: !active });
			    } catch (e) {
			      _error("GM_openInTab failed:", e);
			    }
			  } else {
			    _warn("GM_openInTab not available, using window.open as fallback.");
			    try {
			      window.open(url);
			    } catch (e) {
			      _error("window.open fallback failed:", e);
			    }
			  }
			}
			
			async function _initStorage() {
			  return Promise.resolve();
			}
			
			
			const EXTENSION_ASSETS_MAP = {
			  "pages/popup/index.html": "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n  <head>\r\n    <meta charset=\"utf-8\" />\r\n    <link rel=\"shortcut icon\" href=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCA1LjEuNBLfpoMAAAC2ZVhJZklJKgAIAAAABQAaAQUAAQAAAEoAAAAbAQUAAQAAAFIAAAAoAQMAAQAAAAIAAAAxAQIAEAAAAFoAAABphwQAAQAAAGoAAAAAAAAAYAAAAAEAAABgAAAAAQAAAFBhaW50Lk5FVCA1LjEuNAADAACQBwAEAAAAMDIzMAGgAwABAAAAAQAAAAWgBAABAAAAlAAAAAAAAAACAAEAAgAEAAAAUjk4AAIABwAEAAAAMDEwMAAAAADX5rshveZftAAAB+9JREFUWEell1tsXNUVhr+9z9iesR1f4pALScCEpE3j2LFpU5pQtyWUm8oDlXpTAYuHcA2lglIhhUqt2kJUVW2VIpMiIRUZ81ShVmoRECANKOQGxLGdGAIhhKQ4Fyc4dmxPPHPO+vtwzownrdNWdCRLPnvm7G+tvdf611qOkk/T+sN+/2ONlvxfCTQDbUjNYIuQLnZSA6gGlMEsAAMpQsqCjTrpNLJB0CGkfmQ94Pr7N66cAGhZ97rv6/yKFZiuBB7sf6wxalp/uAroAG4BliPVgkAGEg4x9RyvIYvXEE6aWpMAG0HaB/asF129j68eb1n3WtDX+dWoaEAJfBnwFLAqNksgMyQ5yYFcsuamIDHcSYCUrAuZ4t+bR0XDdiCt7etsHygY4QrHnsD/BlwGRCCXgFyy+QU9dwgs8Zwpo5LrkZNE/BeAfQh2U1/n1QMt67b6wglUAS8nnudBZVOQGKAE6EqNmA5e+D6Gl1yJAMuDlSHtkOza/k1fH/dJCHQk8KgU7hGVKZiREjUpkQmEK4GjaTy/MJwEHiGt8qIDwCXRvhm4CmTIvCQyXkQm9o6EMBnFG6cdV8xwhJFhpYB/P/bp4IVnczIPegPZdT5JteWlwVWTgrfHI96dyLOxvZJX75rD5jvm8vO2NHvO5DFEcN5R/89wXDGAtRxodk3rD98N2oTMHPJI7Dud476lZay7eQ6fXVRTzFVJvLRtkBufHeSKqhShGUo2lwxXSNMLw5N1WZId93ikZuIX5SQsinjm5lo23N3I0hI4gHOOG9rn84c1tewZzpEJYqPASHuoTEFAbMx/gJekq5p9rHBGucMdnIxon2V865o5VFeWATA2nuUvz+9l59uHEhisXjGTcoXkzahwIuPh/fGQXUM5JiIj5RIjpocnV22ALfKJvJKPzC1LO558f5xdPR8DcODgMdZv3M03Hx3kuVePkctHAGQqPJcEEeVenMpF7D45yW2XV/C7a+q5NAPHJyPKXOzoNPBirGG6OJVoOyYRmVFXWc6jzw3S9+4QT28b4VCqCprSXLt6HhXlKQBODJ3lSGiMnM3zxRnwzO2LWdkyh3RFiusPnuL23/aSNUgl+04nYom4NfiksOAwlzfj0oqAI2GG+18LCWtn0lidZs0MR+vnZgEQhiE7ek+QO5bnzqYMTz3cSvvK+aQrYuMWN9Zz49IM/aMh5R50HrgId0mM1HikTKlVoRnpVMDK2ZVUpzx7T03ynStruKihEoDBEyP8+E/H+f1t83jkzmbmXlRFHBlTn3SZIIrwxOJVlYJMwFSGYPEPpYxHFsTBElvoiK/iXN7ImYGP+HLbrGI2bNl2mCc6LuHe7zeRSceBOjoyxpmRcQDy+ZDhs5MsrPRIYtdwju1HJ9h5PEs2MrwrBKeBLPBFIVEsJi6pbGkv3job8tDyDJctrAXg9CdjzJ87gzu/t4K4isDJoTP84jcvc+qTscREGBvLc3RgjFw2xyNfqOP5B5r467plXFwOuVB4VzBAuOUP7csjpSApNBZ/WZmCXceyvHjXAq5vvxQB2WyOivIU3juccxz5xxA/2bidZ3aM884f17B0yVwkceCDIQZPnqVxQR3zZteQSZeRy4c8vOEVntx/lpaaFJNhBLLQI8tCrGKFwpJyYjgXcfUcxxXL4uBDojJTXoS/d/Bj7vjZVraeLoOFNezccwQSsVq6eDZrVl/Ooksaitd07lyO7OQk1UWNMEBZDxpNuhwhIYzyAN4bzvHdlbVc1FAVG+AcknDOsW/gI27/6RsMRNUsrE7TWlvOfX/+iJe29BKGYWKvMDOOnzjN5i172PT0VnYenWBBxpOPTElqjrrmH+3tRWqJGwZzDlHuxFufZNn/yDKWLZmFWQx2DnbvOUjHhrdRXR316RQT+Vj58lHIvuPDPPD5DK1LZuK94+jxUV7pGWLLB3moz7BiVqaQCXLIIfW55gf3vIC4IW69zKcDeHM0z4OfKeOXP2glky4rer5t1wFu3LCXxjn1ZMoCJsM4biQjQKSc0XsmS244C2aQCVhaX8HMdAozYzK0uGghQ/JIL3qkQ0kWqJAFjOe5YdVsMumyovd/3zZA+6N7WTKvnnQJvPCOychForUuzapFdaxeXM+X5lVTnQqYyEWcy0cFeHw/MsAOeaT+5D4cFMprSF11AID3ji2v72fNr/ppWzAT7wNyJfB/UThyYcRELmJ8MiKbjwjt/BRPNKDQE/QHc65cG4C+DZZBkhduBIOTQyyY6dn+5gd8o/MAbfMb8N6Tjy4MjxUu0ZJCZiVwii27CcmDRoBfu+Yf7q5EthnsKieZJJ9yxjtns5wbGoXygNa5M/A4Qvvv8CmVmxZOkoMeeAO4zgE037/9Hic9gRSBAimu8ykfd8OToSGb2uz/gAOKgAC4t6e7Y5MH8KIrGRoCZHlHXAcm8hYHz6eEF2S9BJ5P4DuALgDfsu513/v46nGktcnQUGidzcX39anhyXNB+iKgDPgQWNvT3THedmuX932dX7F4TGofALupcBJO5onHsfjlWCeUTDqlJbUUPmWNCu/IJXde8Pymnu6OgbZbu4Ke7g4r9pyFWa35nleq4qHBbolbZ6sthZwPnzqRaTwvHPsIsA94FuhKPA96ujumhtMpI7b6vs6vGcCKu16oBNeMLB7PlYznWANQgyxT0ktEoCwoGc81CBaP59AD9Pd0d0wAtN3a5Xu6OxIP4J8FIkTyaz0/qwAAAABJRU5ErkJggg==\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\r\n    <title>Loading ...</title>\r\n    <script type=\"module\" crossorigin src=\"data:text/javascript;base64,aW1wb3J0e2MgYXMgbCxkIGFzIGd9ZnJvbSIuLi8uLi9hc3NldHMvanMvYXBpLkN1eUJkWXE0LmpzIjtjb25zdCBmPWwoIi9zaWduaW4vIiksST1sKCIvcG9wdXAvIiksZD0iaHR0cHM6Ly93b3JkZmllbGRzLmNvbSI7ZygpLnRoZW4oZT0+e2V8fChjaHJvbWUudGFicy5jcmVhdGUoe3VybDpmfSksd2luZG93LmNsb3NlKCkpfSk7Y29uc3Qgdz1hc3luYygpPT57dHJ5e3JldHVybihhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoImxhc3RXb3Jrc3BhY2VJZCIpKT8ubGFzdFdvcmtzcGFjZUlkfHxudWxsfWNhdGNoe3JldHVybiBudWxsfX0sYj1hc3luYyBlPT57dHJ5e2F3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7bGFzdFdvcmtzcGFjZUlkOmV9KX1jYXRjaHt9fSxoPWFzeW5jKCk9Pntjb25zdFtlXT1hd2FpdCBjaHJvbWUudGFicy5xdWVyeSh7YWN0aXZlOiEwLGN1cnJlbnRXaW5kb3c6ITB9KSx0PWUuaWQsbj1lLnVybD8/IiI7cmV0dXJue3RhYklkOnQsdGFiVXJsOm59fSx5PVsiY2hyb21lOi8vIiwiZWRnZTovLyIsImNocm9tZS1leHRlbnNpb246Ly8iLCJleHRlbnNpb246Ly8iXSxtPWU9PmUmJiF5LnNvbWUodD0+ZT8udGFiVXJsLnN0YXJ0c1dpdGgodCkpLEU9YXN5bmMgZT0+e2lmKCFtKGUpKXJldHVybiExO2NvbnN0e3RhYklkOnR9PWUsbz1hd2FpdCBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe3RhcmdldDp7dGFiSWQ6dCxhbGxGcmFtZXM6ITB9LGZ1bmM6KCk9Pntjb25zdCByPWM9Pntjb25zdCBpPWMudGFnTmFtZS50b0xvd2VyQ2FzZSgpO3JldHVyblsiaW5wdXQiLCJ0ZXh0YXJlYSJdLmluY2x1ZGVzKGkpPyEwOmMgaW5zdGFuY2VvZiBIVE1MRWxlbWVudD9jLmlzQ29udGVudEVkaXRhYmxlOiExfTtsZXQgcz1kb2N1bWVudC5hY3RpdmVFbGVtZW50O2lmKHMmJnMudGFnTmFtZS50b0xvd2VyQ2FzZSgpPT09ImlmcmFtZSIpe2NvbnN0IGM9cztzPShjLmNvbnRlbnREb2N1bWVudHx8Yy5jb250ZW50V2luZG93Py5kb2N1bWVudCk/LmFjdGl2ZUVsZW1lbnR8fG51bGx9cmV0dXJuIHM/cihzKTohMX19KTtyZXR1cm4gbyYmby5maW5kKHI9PnIucmVzdWx0KX07d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLGFzeW5jIGU9PntpZihlLm9yaWdpbiE9PWQpcmV0dXJuO2NvbnN0IHQ9YXdhaXQgaCgpLG49ZS5kYXRhLHthY3Rpb246b309bjtpZihvPT0iY2xvc2UiKXdpbmRvdy5jbG9zZSgpO2Vsc2UgaWYobz09ImNvbm5lY3QiKXtjb25zdHt0YWJJZDphLHRhYlVybDpyfT10LHtzb3VyY2U6cyxvcmlnaW46Y309ZSxpPW0odCkscD1pJiZhd2FpdCBFKHQpO3MucG9zdE1lc3NhZ2Uoe2FjdGlvbjoiY29ubmVjdGVkIixjYW5JbnRlcmFjdDppLGNhbkluc2VydFRleHQ6cCx0YWJJZDphLHRhYlVybDpyfSx7dGFyZ2V0T3JpZ2luOmN9KX1lbHNlIGlmKG89PSJzZXRXb3Jrc3BhY2VJZCIpe2NvbnN0e3dvcmtzcGFjZUlkOmF9PW47YXdhaXQgYihhPz8iIil9ZWxzZSBpZihvPT0iaW5zZXJ0U25pcHBldCIpe2NvbnN0e3RhYklkOmEsaXRlbTpyfT1uO2Nocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHt0eXBlOiJJTlNFUlRfVEVYVF9FWFBBTlNJT05fRlJPTV9QT1BVUCIsZGF0YTp7aXRlbTpyLHRhYklkOmF9fSwoKT0+e3dpbmRvdy5jbG9zZSgpfSl9ZWxzZSBpZihvPT0ib3BlblNuaXBwZXQiKXtjb25zdHtpdGVtOmEsdGFiSWQ6cixwcmV2ZW50Q2xvc2U6c309bjtjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7dHlwZToiT1BFTl9URVhUX0VYUEFOU0lPTl9XSU5ET1ciLGRhdGE6e2l0ZW06YSx0YWJJZDpyfX0sKCk9PntzfHx3aW5kb3cuY2xvc2UoKX0pfWVsc2UgaWYobz09ImNvcHlTbmlwcGV0Iil7Y29uc3R7dGV4dDphLGh0bWw6cn09bi5pdGVtPz97fSxzPW5ldyBDbGlwYm9hcmRJdGVtKHsidGV4dC9odG1sIjpuZXcgQmxvYihbU3RyaW5nKHIpXSx7dHlwZToidGV4dC9odG1sIn0pLCJ0ZXh0L3BsYWluIjpuZXcgQmxvYihbU3RyaW5nKGEpXSx7dHlwZToidGV4dC9wbGFpbiJ9KX0pO2F3YWl0IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGUoW3NdKX1lbHNlIGlmKG89PSJzaWduZWRJblVzZXIiKXtjb25zdHt1c2VyU2lnbmVkSW46YX09bjtjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7dHlwZToiU0lHTkVEX0lOX1VTRVIiLGRhdGE6e3VzZXJTaWduZWRJbjphfX0sKCk9Pnt9KX19KTtjb25zdCB1PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInN0eWxlIik7dS5pbm5lckhUTUw9YGJvZHkgeyBiYWNrZ3JvdW5kOiB1cmwoJyR7ZH0vaW1hZ2VzL2JhY2tncm91bmQtcGF0dGVybi5wbmcnKTsgfWA7ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh1KTtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCJET01Db250ZW50TG9hZGVkIixhc3luYygpPT57Y29uc3QgZT1hd2FpdCB3KCksdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJpZnJhbWUiKSxuPW5ldyBVUkxTZWFyY2hQYXJhbXMoe2V4dGVuc2lvbklkOmNocm9tZS5ydW50aW1lLmlkfSk7ZSYmbi5zZXQoIndvcmtzcGFjZUlkIixlKSx0LnNyYz1gJHtJfT8ke24udG9TdHJpbmcoKX1gLHQuc3R5bGUud2lkdGg9IjEwMCUiLHQuc3R5bGUuaGVpZ2h0PSIxMDAlIix0LnN0eWxlLmJvcmRlcj0ibm9uZSIsdC5zdHlsZS5kaXNwbGF5PSJmbGV4Iix0LnN0eWxlLmZsZXg9IjEiLGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodCl9KTsK\"></script>\n  </head>\r\n  <body style=\"margin:0;padding:0;width:600px;height:480px;display:flex;\">\r\n    <noscript>You need to enable JavaScript to run this app.</noscript>\r\r\n  </body>\r\n</html>",
			  "icon128.png": "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",
			  "icon48.png": "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCA1LjEuNBLfpoMAAAC2ZVhJZklJKgAIAAAABQAaAQUAAQAAAEoAAAAbAQUAAQAAAFIAAAAoAQMAAQAAAAIAAAAxAQIAEAAAAFoAAABphwQAAQAAAGoAAAAAAAAAYAAAAAEAAABgAAAAAQAAAFBhaW50Lk5FVCA1LjEuNAADAACQBwAEAAAAMDIzMAGgAwABAAAAAQAAAAWgBAABAAAAlAAAAAAAAAACAAEAAgAEAAAAUjk4AAIABwAEAAAAMDEwMAAAAADX5rshveZftAAADTRJREFUaEPNmntwVcd5wH+75z70QCAJAeItbIxNZAQq2DyMZYwxTdxp05Ta48ZUTZqQ1NR1S8jEGeI6OOkw4wktdcA246FtQuU2dZq2mbQxIbiWKUgGjGUJA3YbgkBGGIGEnvd99usfu+fq6gGxsU27M2fOPed+u/v7dr/99tvdo7hKqtzU6gEc31Lhu+dCYDIwA5G5ILNApiNSDpQqMcVAIUg+IhFEFAgggkgKiCNmAKRbQRdi3gNpQ+Q0wkkwZ1Hq/LFtiwYAqh5t8BChZfsd/nC2IKnhL7CgClDHt1QY97wUWA0sA+YiMt1KGhABQIlxucW9u8o9kBcnP/hfGyInQRoQ9h777uJGgKpHDmgw0rKjxmbOSSMUqNzU6uW0+ApgA1ADFINtTBBLbuGVg7etHbT6cOhBeHHyLn9QjihEdKAgYrpB9ithW8v2ZfUAVY/s91p21AzpjSEKVG5qDR3fUpGp3NQ6FngK+CIQcn/7DsRWIqK41pYn2xC5d7EyYtw7TwmAySDsQpnHWrbX9Fb98auhlmfuyrhKBxUIWr5yU+tE4AVglbURBNA59uwqvUZ4GSZ/hd9KEDAGQYFoRPaBPNTyzF0dVevrvZZnV/hZBSo3tarjWyrEtfyPHHzatf4oJvGxw7vxBSCCSAYkDLIPw5qW51b0Vq2vVy3PrhDtKIKeeCoHPvz/AB7X82GQNCKrUOYpW7exJpxjOiuAnwPaKaRGVnDd4XNl7AvBgLm35blV9VUPv+wFPYDzNiGXY9DeswVZGPtL8BA8FZT5scNjvRQCJqSEDRbDZMfAUuCnzlWKc2lD4BGDB+SHQIwQzxi0EvI8MO45W+FHD+/+M6Ks9+sGua955+rGoAdWO3gfGQpvyzQUeKCVcOhiisOXkryTytAcz3DofJIjPRnyPFyPfGzwOHgfMcWIrMaNgULgX6wS4iPiBZmNCBEF+R681pNGKZ8ddxaxuHIcE0oiGCOc64ix59Bl/uJIH5UlISJA2gjqSjDXDm+bWowPeCB7MeZ3VOWm1tnAf7qYRgLzMSIUepA0hmMXU3x1fpR1v1nOnIoi12mDyTfC3gPtrP3HdqYWhPDcuxEwHx4+EFaItAErNTDDwdvSnNlENZweyPBOX4oXHyzlyXWzmFNRhIi1ed9dxgieVnyqZirfe6CcY5eThJXrgSuAfQj4QMZYZjNDIzLXFSRBeBBVQnsyw5rpHs0bZ3L/qikU5IUwrlW1Vnju0lphXCX3LpvMhnl5HOlNE/VskSPAjGTb6hrhlWMFmKttSGxcZtAIGkNHX4ovfWo8t8wqwhhBRFBKoZRiYCBO/YGTtJw4iyBopTBGyIuGuKe6BPpTeAFUDlhUwZiIoiisCGtb5nCZXwE/TGkzSzvzARdVWlBbyFtvd2CMyYIrBe+cOs8T2xu4+/ETLH38MKdOXxysACgvi+IpgxHrVkWEiIZCT3E+4dPYnqDhXILOpCGqyc5PHxDeekphunaLkSFRYso3/Nq4EJ/70QXePHEepSAWT/LjPS2s2XyUv3pbs2zhFG4qKSHj2yhEgmhEBN/4Ft4IYzy4mPR5rT3O3ZNC7FpTzvcfnMKi8Zo3+lJEdTAR8n7hs9aixJR7E5c/ulGJmeiEFVgPFNJwXkHXf3cwzovx/R+/w5/8sJMJ5aXMLSngQJfPuoVj+cw9FXjaRthKKY60nOMHr/cwfVyUvBA0XkqyaJxi5x9UsP7+m1k8fxLz55axYkEZfb/sZN+FJFOiGl8+MLwC+rRbBg4RUkDCQHVhlEN9eXxyezvfOam5/eaJhMNREkZDwnDPwjLCIQ9j7MCOJ5IcbOqAMSEintDQFudbi8ey+2sLWL18JoUFYcR5sYnjC/js6mnEepJu3H0gePuMFGu3hmX4SkoDKdGU5UVZctN4qkvGEDMeWis6kz73TQ0x/5YyV5lNp1o7efFYPwvGhNjfFud7vzeFr32xiimTxjhHAErZC6C8LJ+FRRBLGzQfCN7ZrRRqRPJHFRbry1Mo+jKKlNgANc9TnOpKcf+yEkrG5SGCdaXG0PhmO2f6FH3xDC8/eiO1v30z0YjtoVzwIHmeoihk8I1x8wYjOUbCOzEBJF+DREYKD17KuVbExjqpjIGoYfmCCa4cW+Clrn5eePk9ZhaH+OGfzWXl0hkggfu142N4SqUyXIxnCDmXKmJNKaKhwIPCsCKkQJDR4EEkYpeKw+GzSgwGZoIQ9YSj3SmeqC5k2uShIcUbze/SfsnnZ99cSHXlJDe52V5TSnG2rYOz71qX63RmIJbkeMIQ9RQhDYVhCCk4G0vT2JGgoS3GxWQmq8Rg5iyjcrsAV4cnGGQGSKRZefsE8qJ2ZtZaMRBL0th8gT1P13DzrFJrMrY2O3f8z7t8+as/obcvYSFc+am0D30+HsLleIbGc3GOXIxzb3mErfdN4W9rb2DJpAhdiQxhNQIeRNCun68KjwhhBa3xDA9UhPnE7FLL4ayi41IvX3hgPjfMKMnaO1izOfrmKb6w+VX2XAiDyl0/wdTyYn7jxjxe60ywoNTj6U9P5fCf38a2ry9nw+dv5/O/W82Xfms2rZcShDVDI1x7F+12zK4KLwgRLXT0JPnkomImlBZYe3Wk06eOZ8a00iH2rpSivuE4v/6NgyQLx8G4Atov9Dp0l29KKX/z7ZWc3nonz31jOet/fyG3zZ9GWUkhYizLmIIQiJ8z0IcokdIgceu+RofHmU/cGCZHDMur3ZyXk0I5K1OlFCKGf3vpKHc/cZSpU8aTlxeFSJiDR8+RyfhorbLKTiobQ8W0UsaXFBLyNMYY24vaKqkVkM6MBg9IXCMyEBCPBi/YZWNzT4ra+YVUTLPz3nCvEgR7xvj84F8P85nvnGDxTRMIhSP0pWBRWR7f2n+RVw6eyOYXseG476ABtNZorfAzGTq7umk+8S7kaxR2AnRs4kAH1K0bm48BtyrbZy5IcoIuGBsbhoYz/dRvnM1di+26J1eB4DmdTlP3z4f4w+dbWfKJMhLGw4hCKbsJEEsl6e3vZte6Su6581Yi0Ui2jCB1Xe7h9Td/wcEjrZz8RQ8NnYqyokK0cjOFs31s8PmWunVj86tKTA1g3JgYAh/V0JVIs2CssOvr1ZQWW/sPFAh+x+IJnn+hkQ3/0M7iuWUkjcagrLWLQRDCGOKpJCfOdvHl2/JZsWgaE8uK0FrR0xvj1JlO9h05z0snE1CSx7SxeUwsiODm6dxxapQYDexX877S9E/AA26VMaiAuxeG4LVzMf7+wUk89Om54MKBXPj+gThP/91/8fhPOrljznj6MzayCeCdNCKGkBhCKsPbl2P0vtcP6YyrDyiKMGtCPpMKwyAaXyBjgo2FLDxKjHHbnS+qeV95YyvCxuELety+j+8LsYE4/75pHrfcWJaFDu69fTG27drP5j3dLJ9TSk9aZb3TFWMbMUS0IawB4xyIsg2SzggZS+x4c006G/YHrH+pETk9ogJ3jyg41pvis9VF3DCjxBbgVl9KKS5397HlmVfY/PMe7phTSk/mfcA7kKRR9KeFgYyyVwpiaci4OO0q8O6dAeS0RjjphGyzEmQQtBKIpVlSWUIk7DkXZ9Dawe+o56mGAZbPLqE3rbC+4lfAi4XRdha180bOfaTsCHhxu3QgclKDOetORkaEFXaBYejrj9tKtUZrTdflXrZsf4WthxPcUVFCd+p9tryDv0JgNvp9tJa3rG3AWY1S592xjq09Cw9J31BRGub5l85wtPmXDMTinD7zHk/+dT1bjyRZNrOY3pTCu67w2f2Yk9hFI8z700PfBDbbXa/syQgiEMLnUixOW28Pn5sZ4vX2JG+ZPBaXFRL3s0ZzveABcTtzbG6qq33SOliRve5MynMnIyA2eMoIlOVHqJ5Qyn90RKGohNvGFxH7v4EXB98N7AXQVY82ese+u6TRHahZv2aFQWxYnBGNKI+KcfmEQ2ESooKp5XrC41wPwP6mutrG6rW7PR0AKGGbO1DL2fmyl7KGR8IHX0A7lusML1hHlQG2uYrRLdvv8KseOaBbti+rR9jlZuNMAD9YiTUp65nkesPjwDWwq6mutr567W7dVFfrO0twoaAyj7nTwOBMypILXMOm00cFLzlndvuAxwYrtxrRsqNGqh7Z77Vsr+kFeQhkHyJhEEHw3cmIy3bd4MWeTSM58A811dX2Vq/d7TXV1Q4qgFXCd4fIHRjWgOx0B2pezsmIK3CUZeiHh3db1/jOVSrncQywE1jTVFfbUb12d6iprjZ7Wp/1hEHKPUSuenjfCnugJjUM3cEzOUq4XY3gk4PsptPo0IOLkeGfHAz91MC6yv3Atqa62noA1/JX/tQgSFXr6xUY1fLsSgMw/49+thRhNcgy95WK29H+SFo+12za3AzbAOxtqqttxIJrQAKzyU2jKhCkqodftp+77FzlA8xf99NClJqMmBn2qxUzC5iuxJSDlALFiAx+bjN42il280DiwIAS0w10IWI/t0FO23CGs8D5prraAVyLAwxv9dz0v/naMyFIC1KcAAAAAElFTkSuQmCC"
			};
			
// #endregion
// #endregion
// #region Polyfill Implementation
		function buildPolyfill({ isBackground = false, isOtherPage = false } = {}) {
		  // Generate a unique context ID for this polyfill instance
		  const contextType = isBackground
		    ? "background"
		    : isOtherPage
		      ? "options"
		      : "content";
		  const contextId = `${contextType}_${Math.random()
		    .toString(36)
		    .substring(2, 15)}`;
		
		  const IS_IFRAME = "false" === "true";
		  const BUS = (function () {
		    if (globalThis.__BUS) {
		      return globalThis.__BUS;
		    }
		    globalThis.__BUS = createEventBus(
		      "text-snippets-templates-for-teams",
		      IS_IFRAME ? "iframe" : "page",
		    );
		    return globalThis.__BUS;
		  })();
		  const RUNTIME = createRuntime(isBackground ? "background" : "tab", BUS);
		  const createNoopListeners = () => ({
		    addListener: (callback) => {
		      _log("addListener", callback);
		    },
		    removeListener: (callback) => {
		      _log("removeListener", callback);
		    },
		  });
		  // TODO: Stub
		  const storageChangeListeners = new Set();
		  function broadcastStorageChange(changes, areaName) {
		    storageChangeListeners.forEach((listener) => {
		      listener(changes, areaName);
		    });
		  }
		
		  let REQ_PERMS = [];
		
  // #region Chrome polyfill
			  let chrome = {
			    extension: {
			      isAllowedIncognitoAccess: () => Promise.resolve(true),
			      sendMessage: (...args) => _messagingHandler.sendMessage(...args),
			    },
			    permissions: {
			      // TODO: Remove origin permission means exclude from origin in startup (when checking for content scripts)
			      request: (permissions, callback) => {
			        _log("permissions.request", permissions, callback);
			        if (Array.isArray(permissions)) {
			          REQ_PERMS = [...REQ_PERMS, ...permissions];
			        }
			        if (typeof callback === "function") {
			          callback(permissions);
			        }
			        return Promise.resolve(permissions);
			      },
			      contains: (permissions, callback) => {
			        if (typeof callback === "function") {
			          callback(true);
			        }
			        return Promise.resolve(true);
			      },
			      getAll: () => {
			        return Promise.resolve({
			          permissions: EXTENSION_PERMISSIONS,
			          origins: ORIGIN_PERMISSIONS,
			        });
			      },
			      onAdded: createNoopListeners(),
			      onRemoved: createNoopListeners(),
			    },
			    i18n: {
			      getUILanguage: () => {
			        return USED_LOCALE || "en";
			      },
			      getMessage: (key, substitutions = []) => {
			        if (typeof substitutions === "string") {
			          substitutions = [substitutions];
			        }
			        if (typeof LOCALE_KEYS !== "undefined" && LOCALE_KEYS[key]) {
			          return LOCALE_KEYS[key].message?.replace(
			            /\$(\d+)/g,
			            (match, p1) => substitutions[p1 - 1] || match,
			          );
			        }
			        return key;
			      },
			    },
			    alarms: {
			      onAlarm: createNoopListeners(),
			      create: () => {
			        _log("alarms.create", arguments);
			      },
			      get: () => {
			        _log("alarms.get", arguments);
			      },
			    },
			    runtime: {
			      ...RUNTIME,
			      onInstalled: createNoopListeners(),
			      onStartup: createNoopListeners(),
			      // TODO: Postmessage to parent to open options page or call openOptionsPage
			      openOptionsPage: () => {
			        // const url = chrome.runtime.getURL(OPTIONS_PAGE_PATH);
			        // console.log("openOptionsPage", _openTab, url, EXTENSION_ASSETS_MAP);
			        // _openTab(url);
			        if (typeof openOptionsPage === "function") {
			          openOptionsPage();
			        } else if (window.parent) {
			          window.parent.postMessage({ type: "openOptionsPage" }, "*");
			        } else {
			          _warn("openOptionsPage not available.");
			        }
			      },
			      getManifest: () => {
			        // The manifest object will be injected into the scope where buildPolyfill is called
			        if (typeof INJECTED_MANIFEST !== "undefined") {
			          return JSON.parse(JSON.stringify(INJECTED_MANIFEST)); // Return deep copy
			        }
			        _warn("INJECTED_MANIFEST not found for chrome.runtime.getManifest");
			        return { name: "Unknown", version: "0.0", manifest_version: 2 };
			      },
			      getURL: (path) => {
			        if (!path) return "";
			        if (path.startsWith("/")) {
			          path = path.substring(1);
			        }
			
			        if (typeof _createAssetUrl === "function") {
			          return _createAssetUrl(path);
			        }
			
			        _warn(
			          `chrome.runtime.getURL fallback for '${path}'. Assets may not be available.`,
			        );
			        // Attempt a relative path resolution (highly context-dependent and likely wrong)
			        try {
			          if (window.location.protocol.startsWith("http")) {
			            return new URL(path, window.location.href).toString();
			          }
			        } catch (e) {
			          /* ignore error, fallback */
			        }
			        return path;
			      },
			      id: "polyfilled-extension-" + Math.random().toString(36).substring(2, 15),
			      lastError: null,
			      setUninstallURL: () => {},
			      setUpdateURL: () => {},
			      getPlatformInfo: async () => {
			        const platform = {
			          os: "unknown",
			          arch: "unknown",
			          nacl_arch: "unknown",
			        };
			
			        if (typeof navigator !== "undefined") {
			          const userAgent = navigator.userAgent.toLowerCase();
			          if (userAgent.includes("mac")) platform.os = "mac";
			          else if (userAgent.includes("win")) platform.os = "win";
			          else if (userAgent.includes("linux")) platform.os = "linux";
			          else if (userAgent.includes("android")) platform.os = "android";
			          else if (userAgent.includes("ios")) platform.os = "ios";
			
			          if (userAgent.includes("x86_64") || userAgent.includes("amd64")) {
			            platform.arch = "x86-64";
			          } else if (userAgent.includes("i386") || userAgent.includes("i686")) {
			            platform.arch = "x86-32";
			          } else if (userAgent.includes("arm")) {
			            platform.arch = "arm";
			          }
			        }
			
			        return platform;
			      },
			      getBrowserInfo: async () => {
			        const info = {
			          name: "unknown",
			          version: "unknown",
			          buildID: "unknown",
			        };
			
			        if (typeof navigator !== "undefined") {
			          const userAgent = navigator.userAgent;
			          if (userAgent.includes("Chrome")) {
			            info.name = "Chrome";
			            const match = userAgent.match(/Chrome\/([0-9.]+)/);
			            if (match) info.version = match[1];
			          } else if (userAgent.includes("Firefox")) {
			            info.name = "Firefox";
			            const match = userAgent.match(/Firefox\/([0-9.]+)/);
			            if (match) info.version = match[1];
			          } else if (userAgent.includes("Safari")) {
			            info.name = "Safari";
			            const match = userAgent.match(/Version\/([0-9.]+)/);
			            if (match) info.version = match[1];
			          }
			        }
			
			        return info;
			      },
			    },
			    storage: {
			      local: {
			        get: function (keys, callback) {
			          if (typeof _storageGet !== "function")
			            throw new Error("_storageGet not defined");
			
			          const promise = _storageGet(keys);
			
			          if (typeof callback === "function") {
			            promise
			              .then((result) => {
			                try {
			                  callback(result);
			                } catch (e) {
			                  _error("Error in storage.get callback:", e);
			                }
			              })
			              .catch((error) => {
			                _error("Storage.get error:", error);
			                callback({});
			              });
			            return;
			          }
			
			          return promise;
			        },
			        set: function (items, callback) {
			          if (typeof _storageSet !== "function")
			            throw new Error("_storageSet not defined");
			
			          const promise = _storageSet(items).then((result) => {
			            broadcastStorageChange(items, "local");
			            return result;
			          });
			
			          if (typeof callback === "function") {
			            promise
			              .then((result) => {
			                try {
			                  callback(result);
			                } catch (e) {
			                  _error("Error in storage.set callback:", e);
			                }
			              })
			              .catch((error) => {
			                _error("Storage.set error:", error);
			                callback();
			              });
			            return;
			          }
			
			          return promise;
			        },
			        remove: function (keys, callback) {
			          if (typeof _storageRemove !== "function")
			            throw new Error("_storageRemove not defined");
			
			          const promise = _storageRemove(keys).then((result) => {
			            const changes = {};
			            const keyList = Array.isArray(keys) ? keys : [keys];
			            keyList.forEach((key) => {
			              changes[key] = { oldValue: undefined, newValue: undefined };
			            });
			            broadcastStorageChange(changes, "local");
			            return result;
			          });
			
			          if (typeof callback === "function") {
			            promise
			              .then((result) => {
			                try {
			                  callback(result);
			                } catch (e) {
			                  _error("Error in storage.remove callback:", e);
			                }
			              })
			              .catch((error) => {
			                _error("Storage.remove error:", error);
			                callback();
			              });
			            return;
			          }
			
			          return promise;
			        },
			        clear: function (callback) {
			          if (typeof _storageClear !== "function")
			            throw new Error("_storageClear not defined");
			
			          const promise = _storageClear().then((result) => {
			            broadcastStorageChange({}, "local");
			            return result;
			          });
			
			          if (typeof callback === "function") {
			            promise
			              .then((result) => {
			                try {
			                  callback(result);
			                } catch (e) {
			                  _error("Error in storage.clear callback:", e);
			                }
			              })
			              .catch((error) => {
			                _error("Storage.clear error:", error);
			                callback();
			              });
			            return;
			          }
			
			          return promise;
			        },
			        onChanged: {
			          addListener: (callback) => {
			            storageChangeListeners.add(callback);
			          },
			          removeListener: (callback) => {
			            storageChangeListeners.delete(callback);
			          },
			        },
			      },
			      sync: {
			        get: function (keys, callback) {
			          _warn("chrome.storage.sync polyfill maps to local");
			          return chrome.storage.local.get(keys, callback);
			        },
			        set: function (items, callback) {
			          _warn("chrome.storage.sync polyfill maps to local");
			
			          const promise = chrome.storage.local.set(items).then((result) => {
			            broadcastStorageChange(items, "sync");
			            return result;
			          });
			
			          if (typeof callback === "function") {
			            promise
			              .then((result) => {
			                try {
			                  callback(result);
			                } catch (e) {
			                  _error("Error in storage.sync.set callback:", e);
			                }
			              })
			              .catch((error) => {
			                _error("Storage.sync.set error:", error);
			                callback();
			              });
			            return;
			          }
			
			          return promise;
			        },
			        remove: function (keys, callback) {
			          _warn("chrome.storage.sync polyfill maps to local");
			
			          const promise = chrome.storage.local.remove(keys).then((result) => {
			            const changes = {};
			            const keyList = Array.isArray(keys) ? keys : [keys];
			            keyList.forEach((key) => {
			              changes[key] = { oldValue: undefined, newValue: undefined };
			            });
			            broadcastStorageChange(changes, "sync");
			            return result;
			          });
			
			          if (typeof callback === "function") {
			            promise
			              .then((result) => {
			                try {
			                  callback(result);
			                } catch (e) {
			                  _error("Error in storage.sync.remove callback:", e);
			                }
			              })
			              .catch((error) => {
			                _error("Storage.sync.remove error:", error);
			                callback();
			              });
			            return;
			          }
			
			          return promise;
			        },
			        clear: function (callback) {
			          _warn("chrome.storage.sync polyfill maps to local");
			
			          const promise = chrome.storage.local.clear().then((result) => {
			            broadcastStorageChange({}, "sync");
			            return result;
			          });
			
			          if (typeof callback === "function") {
			            promise
			              .then((result) => {
			                try {
			                  callback(result);
			                } catch (e) {
			                  _error("Error in storage.sync.clear callback:", e);
			                }
			              })
			              .catch((error) => {
			                _error("Storage.sync.clear error:", error);
			                callback();
			              });
			            return;
			          }
			
			          return promise;
			        },
			        onChanged: {
			          addListener: (callback) => {
			            storageChangeListeners.add(callback);
			          },
			          removeListener: (callback) => {
			            storageChangeListeners.delete(callback);
			          },
			        },
			      },
			      onChanged: {
			        addListener: (callback) => {
			          storageChangeListeners.add(callback);
			        },
			        removeListener: (callback) => {
			          storageChangeListeners.delete(callback);
			        },
			      },
			      managed: {
			        get: function (keys, callback) {
			          _warn("chrome.storage.managed polyfill is read-only empty.");
			
			          const promise = Promise.resolve({});
			
			          if (typeof callback === "function") {
			            promise.then((result) => {
			              try {
			                callback(result);
			              } catch (e) {
			                _error("Error in storage.managed.get callback:", e);
			              }
			            });
			            return;
			          }
			
			          return promise;
			        },
			      },
			    },
			    cookies: (function () {
			      const cookieChangeListeners = new Set();
			      function broadcastCookieChange(changeInfo) {
			        cookieChangeListeners.forEach((listener) => {
			          try {
			            listener(changeInfo);
			          } catch (e) {
			            _error("Error in cookies.onChanged listener:", e);
			          }
			        });
			      }
			
			      function handlePromiseCallback(promise, callback) {
			        if (typeof callback === "function") {
			          promise
			            .then((result) => callback(result))
			            .catch((error) => {
			              // chrome.runtime.lastError = { message: error.message }; // TODO: Implement lastError
			              _error(error);
			              callback(); // Call with undefined on error
			            });
			          return;
			        }
			        return promise;
			      }
			
			      return {
			        get: function (details, callback) {
			          if (typeof _cookieList !== "function") {
			            return handlePromiseCallback(
			              Promise.reject(new Error("_cookieList not defined")),
			              callback,
			            );
			          }
			          const promise = _cookieList({
			            url: details.url,
			            name: details.name,
			            storeId: details.storeId,
			            partitionKey: details.partitionKey,
			          }).then((cookies) => {
			            if (!cookies || cookies.length === 0) {
			              return null;
			            }
			            // Sort by path length (longest first), then creation time (earliest first, if available)
			            cookies.sort((a, b) => {
			              const pathLenDiff = (b.path || "").length - (a.path || "").length;
			              if (pathLenDiff !== 0) return pathLenDiff;
			              return (a.creationTime || 0) - (b.creationTime || 0);
			            });
			            return cookies[0];
			          });
			          return handlePromiseCallback(promise, callback);
			        },
			
			        getAll: function (details, callback) {
			          if (typeof _cookieList !== "function") {
			            return handlePromiseCallback(
			              Promise.reject(new Error("_cookieList not defined")),
			              callback,
			            );
			          }
			          if (details.partitionKey) {
			            _warn(
			              "cookies.getAll: partitionKey is not fully supported in this environment.",
			            );
			          }
			          const promise = _cookieList(details);
			          return handlePromiseCallback(promise, callback);
			        },
			
			        set: function (details, callback) {
			          const promise = (async () => {
			            if (
			              typeof _cookieSet !== "function" ||
			              typeof _cookieList !== "function"
			            ) {
			              throw new Error("_cookieSet or _cookieList not defined");
			            }
			            if (details.partitionKey) {
			              _warn(
			                "cookies.set: partitionKey is not fully supported in this environment.",
			              );
			            }
			
			            const getDetails = {
			              url: details.url,
			              name: details.name,
			              storeId: details.storeId,
			            };
			            const oldCookies = await _cookieList(getDetails);
			            const oldCookie = oldCookies && oldCookies[0];
			
			            if (oldCookie) {
			              broadcastCookieChange({
			                cause: "overwrite",
			                cookie: oldCookie,
			                removed: true,
			              });
			            }
			
			            await _cookieSet(details);
			            const newCookies = await _cookieList(getDetails);
			            const newCookie = newCookies && newCookies[0];
			
			            if (newCookie) {
			              broadcastCookieChange({
			                cause: "explicit",
			                cookie: newCookie,
			                removed: false,
			              });
			            }
			            return newCookie || null;
			          })();
			          return handlePromiseCallback(promise, callback);
			        },
			
			        remove: function (details, callback) {
			          const promise = (async () => {
			            if (
			              typeof _cookieDelete !== "function" ||
			              typeof _cookieList !== "function"
			            ) {
			              throw new Error("_cookieDelete or _cookieList not defined");
			            }
			            const oldCookies = await _cookieList(details);
			            const oldCookie = oldCookies && oldCookies[0];
			
			            if (!oldCookie) return null; // Nothing to remove
			
			            await _cookieDelete(details);
			
			            broadcastCookieChange({
			              cause: "explicit",
			              cookie: oldCookie,
			              removed: true,
			            });
			
			            return {
			              url: details.url,
			              name: details.name,
			              storeId: details.storeId || "0",
			              partitionKey: details.partitionKey,
			            };
			          })();
			          return handlePromiseCallback(promise, callback);
			        },
			
			        getAllCookieStores: function (callback) {
			          const promise = Promise.resolve([
			            { id: "0", tabIds: [1] }, // Mock store for the current context
			          ]);
			          return handlePromiseCallback(promise, callback);
			        },
			
			        getPartitionKey: function (details, callback) {
			          _warn(
			            "chrome.cookies.getPartitionKey is not supported in this environment.",
			          );
			          const promise = Promise.resolve({ partitionKey: {} }); // Return empty partition key
			          return handlePromiseCallback(promise, callback);
			        },
			
			        onChanged: {
			          addListener: (callback) => {
			            if (typeof callback === "function") {
			              cookieChangeListeners.add(callback);
			            }
			          },
			          removeListener: (callback) => {
			            cookieChangeListeners.delete(callback);
			          },
			        },
			      };
			    })(),
			    tabs: {
			      query: async (queryInfo) => {
			        _warn("chrome.tabs.query polyfill only returns current tab info.");
			        const dummyId = Math.floor(Math.random() * 1000) + 1;
			        return [
			          {
			            id: dummyId,
			            url: CURRENT_LOCATION,
			            active: true,
			            windowId: 1,
			            status: "complete",
			          },
			        ];
			      },
			      create: async ({ url, active = true }) => {
			        _log(`[Polyfill tabs.create] URL: ${url}`);
			        if (typeof _openTab !== "function")
			          throw new Error("_openTab not defined");
			        _openTab(url, active);
			        const dummyId = Math.floor(Math.random() * 1000) + 1001;
			        return Promise.resolve({
			          id: dummyId,
			          url: url,
			          active,
			          windowId: 1,
			        });
			      },
			      sendMessage: async (tabId, message) => {
			        _warn(
			          `chrome.tabs.sendMessage polyfill (to tab ${tabId}) redirects to runtime.sendMessage (current context).`,
			        );
			        return chrome.runtime.sendMessage(message);
			      },
			      onActivated: createNoopListeners(),
			      onUpdated: createNoopListeners(),
			      onRemoved: createNoopListeners(),
			      onReplaced: createNoopListeners(),
			      onCreated: createNoopListeners(),
			      onMoved: createNoopListeners(),
			      onDetached: createNoopListeners(),
			      onAttached: createNoopListeners(),
			    },
			    windows: {
			      onFocusChanged: createNoopListeners(),
			      onCreated: createNoopListeners(),
			      onRemoved: createNoopListeners(),
			      onFocused: createNoopListeners(),
			      onFocus: createNoopListeners(),
			      onBlur: createNoopListeners(),
			      onFocused: createNoopListeners(),
			    },
			    notifications: {
			      create: async (notificationId, options) => {
			        try {
			          let id = notificationId;
			          let notificationOptions = options;
			
			          if (typeof notificationId === "object" && notificationId !== null) {
			            notificationOptions = notificationId;
			            id = "notification_" + Math.random().toString(36).substring(2, 15);
			          } else if (typeof notificationId === "string" && options) {
			            id = notificationId;
			            notificationOptions = options;
			          } else {
			            throw new Error("Invalid parameters for notifications.create");
			          }
			
			          if (!notificationOptions || typeof notificationOptions !== "object") {
			            throw new Error("Notification options must be an object");
			          }
			
			          const {
			            title,
			            message,
			            iconUrl,
			            type = "basic",
			          } = notificationOptions;
			
			          if (!title || !message) {
			            throw new Error("Notification must have title and message");
			          }
			
			          if ("Notification" in window) {
			            if (Notification.permission === "granted") {
			              const notification = new Notification(title, {
			                body: message,
			                icon: iconUrl,
			                tag: id,
			              });
			
			              _log(`[Notifications] Created notification: ${id}`);
			              return id;
			            } else if (Notification.permission === "default") {
			              const permission = await Notification.requestPermission();
			              if (permission === "granted") {
			                const notification = new Notification(title, {
			                  body: message,
			                  icon: iconUrl,
			                  tag: id,
			                });
			                _log(
			                  `[Notifications] Created notification after permission: ${id}`,
			                );
			                return id;
			              } else {
			                _warn("[Notifications] Permission denied for notifications");
			                return id;
			              }
			            } else {
			              _warn("[Notifications] Notifications are blocked");
			              return id;
			            }
			          } else {
			            _warn(
			              "[Notifications] Native notifications not supported, using console fallback",
			            );
			            _log(`[Notification] ${title}: ${message}`);
			            return id;
			          }
			        } catch (error) {
			          _error("[Notifications] Error creating notification:", error.message);
			          throw error;
			        }
			      },
			      clear: async (notificationId) => {
			        _log(`[Notifications] Clear notification: ${notificationId}`);
			        // For native notifications, there's no direct way to clear by ID
			        // This is a limitation of the Web Notifications API
			        return true;
			      },
			      getAll: async () => {
			        _warn("[Notifications] getAll not fully supported in polyfill");
			        return {};
			      },
			      getPermissionLevel: async () => {
			        if ("Notification" in window) {
			          const permission = Notification.permission;
			          return { level: permission === "granted" ? "granted" : "denied" };
			        }
			        return { level: "denied" };
			      },
			    },
			    contextMenus: {
			      create: (createProperties, callback) => {
			        try {
			          if (!createProperties || typeof createProperties !== "object") {
			            throw new Error("Context menu create properties must be an object");
			          }
			
			          const { id, title, contexts = ["page"], onclick } = createProperties;
			          const menuId =
			            id || `menu_${Math.random().toString(36).substring(2, 15)}`;
			
			          if (!title || typeof title !== "string") {
			            throw new Error("Context menu must have a title");
			          }
			
			          // Store menu items for potential use
			          if (!window._polyfillContextMenus) {
			            window._polyfillContextMenus = new Map();
			          }
			
			          window._polyfillContextMenus.set(menuId, {
			            id: menuId,
			            title,
			            contexts,
			            onclick,
			            enabled: createProperties.enabled !== false,
			          });
			
			          _log(
			            `[ContextMenus] Created context menu item: ${title} (${menuId})`,
			          );
			
			          // Try to register a menu command as fallback
			          if (typeof _registerMenuCommand === "function") {
			            try {
			              _registerMenuCommand(
			                title,
			                onclick ||
			                  (() => {
			                    _log(`Context menu clicked: ${title}`);
			                  }),
			              );
			            } catch (e) {
			              _warn(
			                "[ContextMenus] Failed to register as menu command:",
			                e.message,
			              );
			            }
			          }
			
			          if (callback && typeof callback === "function") {
			            setTimeout(() => callback(), 0);
			          }
			
			          return menuId;
			        } catch (error) {
			          _error("[ContextMenus] Error creating context menu:", error.message);
			          if (callback && typeof callback === "function") {
			            setTimeout(() => callback(), 0);
			          }
			          throw error;
			        }
			      },
			      update: (id, updateProperties, callback) => {
			        try {
			          if (
			            !window._polyfillContextMenus ||
			            !window._polyfillContextMenus.has(id)
			          ) {
			            throw new Error(`Context menu item not found: ${id}`);
			          }
			
			          const menuItem = window._polyfillContextMenus.get(id);
			          Object.assign(menuItem, updateProperties);
			
			          _log(`[ContextMenus] Updated context menu item: ${id}`);
			
			          if (callback && typeof callback === "function") {
			            setTimeout(() => callback(), 0);
			          }
			        } catch (error) {
			          _error("[ContextMenus] Error updating context menu:", error.message);
			          if (callback && typeof callback === "function") {
			            setTimeout(() => callback(), 0);
			          }
			        }
			      },
			      remove: (menuItemId, callback) => {
			        try {
			          if (
			            window._polyfillContextMenus &&
			            window._polyfillContextMenus.has(menuItemId)
			          ) {
			            window._polyfillContextMenus.delete(menuItemId);
			            _log(`[ContextMenus] Removed context menu item: ${menuItemId}`);
			          } else {
			            _warn(
			              `[ContextMenus] Context menu item not found for removal: ${menuItemId}`,
			            );
			          }
			
			          if (callback && typeof callback === "function") {
			            setTimeout(() => callback(), 0);
			          }
			        } catch (error) {
			          _error("[ContextMenus] Error removing context menu:", error.message);
			          if (callback && typeof callback === "function") {
			            setTimeout(() => callback(), 0);
			          }
			        }
			      },
			      removeAll: (callback) => {
			        try {
			          if (window._polyfillContextMenus) {
			            const count = window._polyfillContextMenus.size;
			            window._polyfillContextMenus.clear();
			            _log(`[ContextMenus] Removed all ${count} context menu items`);
			          }
			
			          if (callback && typeof callback === "function") {
			            setTimeout(() => callback(), 0);
			          }
			        } catch (error) {
			          _error(
			            "[ContextMenus] Error removing all context menus:",
			            error.message,
			          );
			          if (callback && typeof callback === "function") {
			            setTimeout(() => callback(), 0);
			          }
			        }
			      },
			      onClicked: {
			        addListener: (callback) => {
			          if (!window._polyfillContextMenuListeners) {
			            window._polyfillContextMenuListeners = new Set();
			          }
			          window._polyfillContextMenuListeners.add(callback);
			          _log("[ContextMenus] Added click listener");
			        },
			        removeListener: (callback) => {
			          if (window._polyfillContextMenuListeners) {
			            window._polyfillContextMenuListeners.delete(callback);
			            _log("[ContextMenus] Removed click listener");
			          }
			        },
			      },
			    },
			  };
			
			  const tc = (fn) => {
			    try {
			      fn();
			    } catch (e) {}
			  };
			  const loggingProxyHandler = (_key) => ({
			    get(target, key, receiver) {
			      tc(() => _log(`[${contextType}] [CHROME - ${_key}] Getting ${key}`));
			      return Reflect.get(target, key, receiver);
			    },
			    set(target, key, value, receiver) {
			      tc(() =>
			        _log(`[${contextType}] [CHROME - ${_key}] Setting ${key} to ${value}`),
			      );
			      return Reflect.set(target, key, value, receiver);
			    },
			    has(target, key) {
			      tc(() =>
			        _log(`[${contextType}] [CHROME - ${_key}] Checking if ${key} exists`),
			      );
			      return Reflect.has(target, key);
			    },
			  });
			  chrome = Object.fromEntries(
			    Object.entries(chrome).map(([key, value]) => [
			      key,
			      new Proxy(value, loggingProxyHandler(key)),
			    ]),
			  );
			
			  // Alias browser to chrome for common Firefox pattern
			  const browser = new Proxy(chrome, loggingProxyHandler);
			
			  const oldGlobalThis = globalThis;
			  const oldWindow = window;
			  const oldSelf = self;
			  const oldGlobal = globalThis;
			  const __globalsStorage = {};
			
			  const TO_MODIFY = [oldGlobalThis, oldWindow, oldSelf, oldGlobal];
			  const set = (k, v) => {
			    __globalsStorage[k] = v;
			    TO_MODIFY.forEach((target) => {
			      target[k] = v;
			    });
			  };
			  const proxyHandler = {
			    get(target, key, receiver) {
			      const fns = [
			        () => __globalsStorage[key],
			        () => Reflect.get(target, key, target),
			        () => target[key],
			      ];
			      const out = fns
			        .map((f) => {
			          try {
			            let out = f();
			            return out;
			          } catch (e) {
			            return undefined;
			          }
			        })
			        .find((f) => f !== undefined);
			      if (typeof out === "function") {
			        return out.bind(target);
			      }
			      return out;
			    },
			    set(target, key, value, receiver) {
			      try {
			        tc(() => _log(`[${contextType}] Setting ${key} to ${value}`));
			        set(key, value);
			        return Reflect.set(target, key, value, receiver);
			      } catch (e) {
			        _error("Error setting", key, value, e);
			        try {
			          target[key] = value;
			          return true;
			        } catch (e) {
			          _error("Error setting", key, value, e);
			        }
			        return false;
			      }
			    },
			    has(target, key) {
			      try {
			        return key in __globalsStorage || key in target;
			      } catch (e) {
			        _error("Error has", key, e);
			        try {
			          return key in __globalsStorage || key in target;
			        } catch (e) {
			          _error("Error has", key, e);
			        }
			        return false;
			      }
			    },
			    getOwnPropertyDescriptor(target, key) {
			      try {
			        if (key in __globalsStorage) {
			          return {
			            configurable: true,
			            enumerable: true,
			            writable: true,
			            value: __globalsStorage[key],
			          };
			        }
			        // fall back to the real globalThis
			        const desc = Reflect.getOwnPropertyDescriptor(target, key);
			        // ensure it's configurable so the with‑scope binding logic can override it
			        if (desc && !desc.configurable) {
			          desc.configurable = true;
			        }
			        return desc;
			      } catch (e) {
			        _error("Error getOwnPropertyDescriptor", key, e);
			        return {
			          configurable: true,
			          enumerable: true,
			          writable: true,
			          value: undefined,
			        };
			      }
			    },
			
			    defineProperty(target, key, descriptor) {
			      try {
			        // Normalize descriptor to avoid mixed accessor & data attributes
			        const hasAccessor = "get" in descriptor || "set" in descriptor;
			
			        if (hasAccessor) {
			          // Build a clean descriptor without value/writable when accessors present
			          const normalized = {
			            configurable:
			              "configurable" in descriptor ? descriptor.configurable : true,
			            enumerable:
			              "enumerable" in descriptor ? descriptor.enumerable : false,
			          };
			          if ("get" in descriptor) normalized.get = descriptor.get;
			          if ("set" in descriptor) normalized.set = descriptor.set;
			
			          // Store accessor references for inspection but avoid breaking invariants
			          set(key, {
			            get: descriptor.get,
			            set: descriptor.set,
			          });
			
			          return Reflect.defineProperty(target, key, normalized);
			        }
			
			        // Data descriptor path
			        set(key, descriptor.value);
			        return Reflect.defineProperty(target, key, descriptor);
			      } catch (e) {
			        _error("Error defineProperty", key, descriptor, e);
			        return false;
			      }
			    },
			  };
			
			  // Create proxies once proxyHandler is defined
			  const proxyWindow = new Proxy(oldWindow, proxyHandler);
			  const proxyGlobalThis = new Proxy(oldGlobalThis, proxyHandler);
			  const proxyGlobal = new Proxy(oldGlobal, proxyHandler);
			  const proxySelf = new Proxy(oldSelf, proxyHandler);
			
			  // Seed storage with core globals so lookups succeed inside `with` blocks
			  Object.assign(__globalsStorage, {
			    chrome,
			    browser,
			    window: proxyWindow,
			    globalThis: proxyGlobalThis,
			    global: proxyGlobal,
			    self: proxySelf,
			    document: oldWindow.document,
			  });
			
			  const __globals = {
			    chrome,
			    browser,
			    window: proxyWindow,
			    globalThis: proxyGlobalThis,
			    global: proxyGlobal,
			    self: proxySelf,
			    __globals: __globalsStorage,
			  };
			
			  __globals.contextId = contextId;
			  __globals.contextType = contextType;
			  __globals.module = undefined;
			  __globals.amd = undefined;
			  __globals.define = undefined;
			  __globals.importScripts = (...args) => {
			    _log("importScripts", args);
			  };
			
			  return __globals;
			}
			
			
			if (typeof window !== 'undefined') {
			    window.buildPolyfill = buildPolyfill;
			}
			
  // #endregion
// #endregion
    // #endregion
   // #region Background Script Environment
	
	const START_BACKGROUND_SCRIPT = (function(){
	  const backgroundPolyfill = buildPolyfill({ isBackground: true });
	  const scriptName = "Text Snippets & Templates for Teams";
	  const debug = "[Text Snippets & Templates for Teams]";
	  _log(debug + ' Executing background scripts...');
	
	  function executeBackgroundScripts(){
	    with(backgroundPolyfill){
	      // BG: pages/background/index.js
	import{g as k,a as y,b as P,c as d,d as u,f as S}from"../../assets/js/api.CuyBdYq4.js";const p=k(),E=y(),M=P(),l="SelectionMenu",I="MenuItemOpenPopup",g="MenuItemDashboard",h="MenuItemWorkspaces",T="MenuItemReloadItems",m="Workspace-";let i=null;const b=async()=>{if(await u()){const n=await S();await chrome.storage.local.set({workspaces:n})}},N=async t=>{const n=await chrome.storage.local.get("workspaces");chrome.contextMenus.removeAll(()=>{chrome.contextMenus.create({id:l,title:"Text Snippets",contexts:["all"]}),n&&Array.isArray(n.workspaces)?(chrome.contextMenus.create({id:h,parentId:l,title:"🏠　Go to workspace",contexts:["all"]}),n.workspaces.forEach(e=>{chrome.contextMenus.create({id:`${m}${e.id}`,parentId:h,title:`${e.displayName}`,contexts:["all"]})})):chrome.contextMenus.create({id:g,parentId:l,title:"🏠　Go to workspace",contexts:["all"]}),chrome.contextMenus.create({id:I,parentId:l,title:"📝　Insert snippet ...",contexts:["editable"]})})},f=async(t,n)=>{const{workspace:e}=t,s=new URLSearchParams;s.append("id",t.id),s.append("extensionId",chrome.runtime.id),n&&s.append("tab",n.toString());const a=s.toString(),o=`workspaces/${encodeURIComponent(e.id)}/form/${encodeURIComponent(t.id)}`,r=`${d(o)}${a&&"?"}${a}`;if(i)try{await chrome.windows.remove(i)}catch(x){console.warn("Form window already closed or inaccessible:",x)}return i=(await chrome.windows.create({url:r,type:"popup",width:580,height:620,focused:!0})).id,i},w=async(t,n,e)=>(await U(n),await chrome.tabs.sendMessage(Number(n),{type:"INSERT_TEXT_IN_TAB_TARGET",data:{item:e}}),!0),_=async(t,n)=>{const{item:e,tabId:s}=n;return e?!!await f(e,s):!1},U=async(t,n)=>{await chrome.scripting.executeScript({target:{tabId:t,allFrames:!0,frameIds:n},files:["pages/contentInjected/index.js"],injectImmediately:!0})};chrome.contextMenus.onClicked.addListener((t,n)=>{const{menuItemId:e}=t;if(e===g)chrome.tabs.create({url:d()});else if(e!==T){if(e===I)chrome.action.getPopup({}).then(s=>{s?chrome.action.openPopup({},()=>{chrome.runtime.lastError?console.log("lastError"):console.log("Popup opened successfully")}):chrome.tabs.create({url:p})});else if(e.toString().startsWith(m)){const s=e.toString().substring(m.length);s&&chrome.storage.local.get("workspaces").then(a=>{if(a){const o=a.workspaces||[];if(Array.isArray(o)){const r=o.find(c=>c.id==s);if(r){const c=d(`/workspaces/${encodeURIComponent(r.id)}`);chrome.tabs.create({url:c})}}}})}}});chrome.runtime.onInstalled.addListener(t=>{N(),t.reason==="install"?chrome.tabs.create({url:E}):t.reason});chrome.runtime.onMessage.addListener((t,n,e)=>{if(n.id===chrome.runtime.id){const s=t.data||{};switch(t.type){case"INSERT_TEXT_EXPANSION_FROM_POPUP":const{tabId:a,item:o}=s;return a&&o?o.hasForm?f(o,a).then(c=>{e({success:!!c})}).catch(()=>{e({success:!1})}):w(n,a,o).then(c=>{e({success:c})}).catch(()=>{e({success:!1})}):e({success:!1}),!0;case"OPEN_TEXT_EXPANSION_WINDOW":return _(n,s).then(c=>{e({success:c})}).catch(()=>{e({success:!1})}),!0;case"SIGNED_IN_USER":const{userSignedIn:r}=s;chrome.storage.local.get("userSignedIn",c=>{c.userSignedIn!==r&&chrome.storage.local.set({userSignedIn:r},()=>{u()})}),e({success:!0});return}}});chrome.runtime.onMessageExternal.addListener((t,n,e)=>{if(t.action==="checkInstalled")e({installed:!0});else if(t.action=="insertText"){const{tabId:s,item:a}=t.payload;s&&a?w(n,s,a).then(o=>{e({success:o})}).catch(()=>{e({success:!1})}):e({success:!1})}return!0});chrome.action.onClicked.addListener(()=>{u().then(t=>{t||chrome.tabs.create({url:p})})});chrome.runtime.setUninstallURL(M);chrome.windows.onRemoved.addListener(t=>{t==i&&(i=null)});b();
	    }
	  }
	
	  executeBackgroundScripts.call(backgroundPolyfill);
	
	  _log(debug + ' Background scripts execution complete.');
	});
	
	setTimeout(() => {
	  // Wait for things to be defined
	  START_BACKGROUND_SCRIPT();
	}, 10);
	_log("START_BACKGROUND_SCRIPT", START_BACKGROUND_SCRIPT);
	// End background script environment
	
	
   // #endregion
    // #region Orchestration Logic
	// Other globals currently defined at this spot: SCRIPT_NAME, _log, _warn, _error
	const INJECTED_MANIFEST = {"manifest_version":3,"name":"Text Snippets & Templates for Teams","version":"1.3.5","description":"Reusable text snippets and templates with fillable fields. Share them with your team and insert them anywhere in seconds.","permissions":["storage","scripting","contextMenus","activeTab"],"optional_permissions":[],"content_scripts":[{"matches":["https://*.wordfields.com/*","https://*.textfields.com/*"],"js":["pages/website/index.js"],"css":[]}],"options_ui":{},"browser_action":{},"page_action":{},"action":{"default_popup":"pages/popup/index.html","default_title":"__MSG_extensionName__","default_icon":{"16":"icon16.png","32":"icon32.png","48":"icon48.png","128":"icon128.png"}},"icons":{"16":"icon16.png","32":"icon32.png","48":"icon48.png","64":"icon64.png","128":"icon128.png"},"web_accessible_resources":[{"resources":["icon128.png","icon48.png"],"matches":["*://*/*"]}],"background":{"type":"module","service_worker":"pages/background/index.js"},"_id":"text-snippets-templates-for-teams"};
	const CONTENT_SCRIPT_CONFIGS_FOR_MATCHING = [
	  {
	    "matches": [
	      "https://*.wordfields.com/*",
	      "https://*.textfields.com/*"
	    ]
	  }
	];
	const OPTIONS_PAGE_PATH = null;
	const POPUP_PAGE_PATH = "pages/popup/index.html";
	const EXTENSION_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCA1LjEuNBLfpoMAAAC2ZVhJZklJKgAIAAAABQAaAQUAAQAAAEoAAAAbAQUAAQAAAFIAAAAoAQMAAQAAAAIAAAAxAQIAEAAAAFoAAABphwQAAQAAAGoAAAAAAAAAYAAAAAEAAABgAAAAAQAAAFBhaW50Lk5FVCA1LjEuNAADAACQBwAEAAAAMDIzMAGgAwABAAAAAQAAAAWgBAABAAAAlAAAAAAAAAACAAEAAgAEAAAAUjk4AAIABwAEAAAAMDEwMAAAAADX5rshveZftAAADTRJREFUaEPNmntwVcd5wH+75z70QCAJAeItbIxNZAQq2DyMZYwxTdxp05Ta48ZUTZqQ1NR1S8jEGeI6OOkw4wktdcA246FtQuU2dZq2mbQxIbiWKUgGjGUJA3YbgkBGGIGEnvd99usfu+fq6gGxsU27M2fOPed+u/v7dr/99tvdo7hKqtzU6gEc31Lhu+dCYDIwA5G5ILNApiNSDpQqMcVAIUg+IhFEFAgggkgKiCNmAKRbQRdi3gNpQ+Q0wkkwZ1Hq/LFtiwYAqh5t8BChZfsd/nC2IKnhL7CgClDHt1QY97wUWA0sA+YiMt1KGhABQIlxucW9u8o9kBcnP/hfGyInQRoQ9h777uJGgKpHDmgw0rKjxmbOSSMUqNzU6uW0+ApgA1ADFINtTBBLbuGVg7etHbT6cOhBeHHyLn9QjihEdKAgYrpB9ithW8v2ZfUAVY/s91p21AzpjSEKVG5qDR3fUpGp3NQ6FngK+CIQcn/7DsRWIqK41pYn2xC5d7EyYtw7TwmAySDsQpnHWrbX9Fb98auhlmfuyrhKBxUIWr5yU+tE4AVglbURBNA59uwqvUZ4GSZ/hd9KEDAGQYFoRPaBPNTyzF0dVevrvZZnV/hZBSo3tarjWyrEtfyPHHzatf4oJvGxw7vxBSCCSAYkDLIPw5qW51b0Vq2vVy3PrhDtKIKeeCoHPvz/AB7X82GQNCKrUOYpW7exJpxjOiuAnwPaKaRGVnDd4XNl7AvBgLm35blV9VUPv+wFPYDzNiGXY9DeswVZGPtL8BA8FZT5scNjvRQCJqSEDRbDZMfAUuCnzlWKc2lD4BGDB+SHQIwQzxi0EvI8MO45W+FHD+/+M6Ks9+sGua955+rGoAdWO3gfGQpvyzQUeKCVcOhiisOXkryTytAcz3DofJIjPRnyPFyPfGzwOHgfMcWIrMaNgULgX6wS4iPiBZmNCBEF+R681pNGKZ8ddxaxuHIcE0oiGCOc64ix59Bl/uJIH5UlISJA2gjqSjDXDm+bWowPeCB7MeZ3VOWm1tnAf7qYRgLzMSIUepA0hmMXU3x1fpR1v1nOnIoi12mDyTfC3gPtrP3HdqYWhPDcuxEwHx4+EFaItAErNTDDwdvSnNlENZweyPBOX4oXHyzlyXWzmFNRhIi1ed9dxgieVnyqZirfe6CcY5eThJXrgSuAfQj4QMZYZjNDIzLXFSRBeBBVQnsyw5rpHs0bZ3L/qikU5IUwrlW1Vnju0lphXCX3LpvMhnl5HOlNE/VskSPAjGTb6hrhlWMFmKttSGxcZtAIGkNHX4ovfWo8t8wqwhhBRFBKoZRiYCBO/YGTtJw4iyBopTBGyIuGuKe6BPpTeAFUDlhUwZiIoiisCGtb5nCZXwE/TGkzSzvzARdVWlBbyFtvd2CMyYIrBe+cOs8T2xu4+/ETLH38MKdOXxysACgvi+IpgxHrVkWEiIZCT3E+4dPYnqDhXILOpCGqyc5PHxDeekphunaLkSFRYso3/Nq4EJ/70QXePHEepSAWT/LjPS2s2XyUv3pbs2zhFG4qKSHj2yhEgmhEBN/4Ft4IYzy4mPR5rT3O3ZNC7FpTzvcfnMKi8Zo3+lJEdTAR8n7hs9aixJR7E5c/ulGJmeiEFVgPFNJwXkHXf3cwzovx/R+/w5/8sJMJ5aXMLSngQJfPuoVj+cw9FXjaRthKKY60nOMHr/cwfVyUvBA0XkqyaJxi5x9UsP7+m1k8fxLz55axYkEZfb/sZN+FJFOiGl8+MLwC+rRbBg4RUkDCQHVhlEN9eXxyezvfOam5/eaJhMNREkZDwnDPwjLCIQ9j7MCOJ5IcbOqAMSEintDQFudbi8ey+2sLWL18JoUFYcR5sYnjC/js6mnEepJu3H0gePuMFGu3hmX4SkoDKdGU5UVZctN4qkvGEDMeWis6kz73TQ0x/5YyV5lNp1o7efFYPwvGhNjfFud7vzeFr32xiimTxjhHAErZC6C8LJ+FRRBLGzQfCN7ZrRRqRPJHFRbry1Mo+jKKlNgANc9TnOpKcf+yEkrG5SGCdaXG0PhmO2f6FH3xDC8/eiO1v30z0YjtoVzwIHmeoihk8I1x8wYjOUbCOzEBJF+DREYKD17KuVbExjqpjIGoYfmCCa4cW+Clrn5eePk9ZhaH+OGfzWXl0hkggfu142N4SqUyXIxnCDmXKmJNKaKhwIPCsCKkQJDR4EEkYpeKw+GzSgwGZoIQ9YSj3SmeqC5k2uShIcUbze/SfsnnZ99cSHXlJDe52V5TSnG2rYOz71qX63RmIJbkeMIQ9RQhDYVhCCk4G0vT2JGgoS3GxWQmq8Rg5iyjcrsAV4cnGGQGSKRZefsE8qJ2ZtZaMRBL0th8gT1P13DzrFJrMrY2O3f8z7t8+as/obcvYSFc+am0D30+HsLleIbGc3GOXIxzb3mErfdN4W9rb2DJpAhdiQxhNQIeRNCun68KjwhhBa3xDA9UhPnE7FLL4ayi41IvX3hgPjfMKMnaO1izOfrmKb6w+VX2XAiDyl0/wdTyYn7jxjxe60ywoNTj6U9P5fCf38a2ry9nw+dv5/O/W82Xfms2rZcShDVDI1x7F+12zK4KLwgRLXT0JPnkomImlBZYe3Wk06eOZ8a00iH2rpSivuE4v/6NgyQLx8G4Atov9Dp0l29KKX/z7ZWc3nonz31jOet/fyG3zZ9GWUkhYizLmIIQiJ8z0IcokdIgceu+RofHmU/cGCZHDMur3ZyXk0I5K1OlFCKGf3vpKHc/cZSpU8aTlxeFSJiDR8+RyfhorbLKTiobQ8W0UsaXFBLyNMYY24vaKqkVkM6MBg9IXCMyEBCPBi/YZWNzT4ra+YVUTLPz3nCvEgR7xvj84F8P85nvnGDxTRMIhSP0pWBRWR7f2n+RVw6eyOYXseG476ABtNZorfAzGTq7umk+8S7kaxR2AnRs4kAH1K0bm48BtyrbZy5IcoIuGBsbhoYz/dRvnM1di+26J1eB4DmdTlP3z4f4w+dbWfKJMhLGw4hCKbsJEEsl6e3vZte6Su6581Yi0Ui2jCB1Xe7h9Td/wcEjrZz8RQ8NnYqyokK0cjOFs31s8PmWunVj86tKTA1g3JgYAh/V0JVIs2CssOvr1ZQWW/sPFAh+x+IJnn+hkQ3/0M7iuWUkjcagrLWLQRDCGOKpJCfOdvHl2/JZsWgaE8uK0FrR0xvj1JlO9h05z0snE1CSx7SxeUwsiODm6dxxapQYDexX877S9E/AA26VMaiAuxeG4LVzMf7+wUk89Om54MKBXPj+gThP/91/8fhPOrljznj6MzayCeCdNCKGkBhCKsPbl2P0vtcP6YyrDyiKMGtCPpMKwyAaXyBjgo2FLDxKjHHbnS+qeV95YyvCxuELety+j+8LsYE4/75pHrfcWJaFDu69fTG27drP5j3dLJ9TSk9aZb3TFWMbMUS0IawB4xyIsg2SzggZS+x4c006G/YHrH+pETk9ogJ3jyg41pvis9VF3DCjxBbgVl9KKS5397HlmVfY/PMe7phTSk/mfcA7kKRR9KeFgYyyVwpiaci4OO0q8O6dAeS0RjjphGyzEmQQtBKIpVlSWUIk7DkXZ9Dawe+o56mGAZbPLqE3rbC+4lfAi4XRdha180bOfaTsCHhxu3QgclKDOetORkaEFXaBYejrj9tKtUZrTdflXrZsf4WthxPcUVFCd+p9tryDv0JgNvp9tJa3rG3AWY1S592xjq09Cw9J31BRGub5l85wtPmXDMTinD7zHk/+dT1bjyRZNrOY3pTCu67w2f2Yk9hFI8z700PfBDbbXa/syQgiEMLnUixOW28Pn5sZ4vX2JG+ZPBaXFRL3s0ZzveABcTtzbG6qq33SOliRve5MynMnIyA2eMoIlOVHqJ5Qyn90RKGohNvGFxH7v4EXB98N7AXQVY82ese+u6TRHahZv2aFQWxYnBGNKI+KcfmEQ2ESooKp5XrC41wPwP6mutrG6rW7PR0AKGGbO1DL2fmyl7KGR8IHX0A7lusML1hHlQG2uYrRLdvv8KseOaBbti+rR9jlZuNMAD9YiTUp65nkesPjwDWwq6mutr567W7dVFfrO0twoaAyj7nTwOBMypILXMOm00cFLzlndvuAxwYrtxrRsqNGqh7Z77Vsr+kFeQhkHyJhEEHw3cmIy3bd4MWeTSM58A811dX2Vq/d7TXV1Q4qgFXCd4fIHRjWgOx0B2pezsmIK3CUZeiHh3db1/jOVSrncQywE1jTVFfbUb12d6iprjZ7Wp/1hEHKPUSuenjfCnugJjUM3cEzOUq4XY3gk4PsptPo0IOLkeGfHAz91MC6yv3Atqa62noA1/JX/tQgSFXr6xUY1fLsSgMw/49+thRhNcgy95WK29H+SFo+12za3AzbAOxtqqttxIJrQAKzyU2jKhCkqodftp+77FzlA8xf99NClJqMmBn2qxUzC5iuxJSDlALFiAx+bjN42il280DiwIAS0w10IWI/t0FO23CGs8D5prraAVyLAwxv9dz0v/naMyFIC1KcAAAAAElFTkSuQmCC";
	const extensionCssData = {};
	
	const LOCALE_KEYS = {"extensionDescription":{"description":"Extension description","message":"Reusable text snippets and templates with fillable fields. Share them with your team and insert them anywhere in seconds."},"extensionName":{"description":"Extension name","message":"Text Snippets & Templates for Teams"},"extensionShortName":{"description":"Extension short name","message":"Snippets & Templates"}};
	const USED_LOCALE = "en";
	const CURRENT_LOCATION = window.location.href;
	
	const convertMatchPatternToRegExp = function convertMatchPatternToRegExp(pattern) {
	  if (pattern === "<all_urls>") {
	    return new RegExp(".*");
	  }
	  try {
	    const singleEscapedPattern = convertMatchPatternToRegExpString(
	      pattern
	    ).replace(/\\\\/g, "\\");
	    return new RegExp(singleEscapedPattern);
	  } catch (error) {
	    debug(
	      "Error converting match pattern to RegExp: %s, Error: %s",
	      pattern,
	      error.message
	    );
	    return new RegExp("$."); // Matches nothing on error
	  }
	};
	const convertMatchPatternToRegExpString = function convertMatchPatternToRegExpString(pattern) {
	  function escapeRegex(s) {
	    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\\\$&");
	  }
	
	  if (typeof pattern !== "string" || !pattern) {
	    return "$."; // Matches nothing
	  }
	
	  const schemeMatch = pattern.match(/^(\*|https?|file|ftp):\/\//);
	  if (!schemeMatch) return "$."; // Invalid pattern
	  const scheme = schemeMatch[1];
	  pattern = pattern.substring(schemeMatch[0].length);
	  const schemeRegex = scheme === "*" ? "https?|file|ftp" : scheme;
	
	  const hostMatch = pattern.match(/^([^\/]+)/);
	  if (!hostMatch) return "$."; // Invalid pattern
	  const host = hostMatch[1];
	  pattern = pattern.substring(host.length); // Remainder is path
	
	  let hostRegex;
	  if (host === "*") {
	    hostRegex = "[^/]+"; // Matches any sequence of non-slash characters
	  } else if (host.startsWith("*.")) {
	    // Match any subdomain or the main domain
	    hostRegex = "(?:[^\\/]+\\.)?" + escapeRegex(host.substring(2));
	  } else {
	    hostRegex = escapeRegex(host); // Exact host match
	  }
	
	  let pathRegex = pattern;
	  if (!pathRegex.startsWith("/")) {
	    pathRegex = "/" + pathRegex; // Ensure path starts with /
	  }
	  // Convert glob (*) to regex (.*) and escape other special chars
	  pathRegex = pathRegex.split("*").map(escapeRegex).join(".*");
	
	  // Ensure the pattern covers the entire path segment correctly
	  if (pathRegex === "/.*") {
	    // Equivalent to /* in manifest, matches the root and anything after
	    pathRegex = "(?:/.*)?";
	  } else {
	    // Match the specific path and optionally query/hash or end of string
	    pathRegex = pathRegex + "(?:[?#]|$)";
	  }
	
	  // Combine and return the pattern string
	  // Needs double escaping for direct embedding in generated JS strings
	  const finalRegexString = `^${schemeRegex}:\\/\\/${hostRegex}${pathRegex}`;
	  return finalRegexString;
	};
	const ALL_PERMISSIONS = [
	  ...(INJECTED_MANIFEST.permissions || []),
	  ...(INJECTED_MANIFEST.optional_permissions || []),
	  ...(INJECTED_MANIFEST.host_permissions || []),
	  ...(INJECTED_MANIFEST.content_scripts
	    ?.map((cs) => cs.matches || [])
	    ?.flat() || []),
	];
	
	const isOrigin = (perm) => {
	  if (
	    perm.startsWith("*://") ||
	    perm.startsWith("http://") ||
	    perm.startsWith("https://")
	  ) {
	    return true;
	  }
	  return false;
	};
	const ORIGIN_PERMISSIONS = ALL_PERMISSIONS.filter(isOrigin);
	const EXTENSION_PERMISSIONS = ALL_PERMISSIONS.filter((perm) => !isOrigin(perm));
	
	function _testBlobCSP() {
	  try {
	    const code = `console.log("Blob CSP test");`;
	    const blob = new Blob([code], { type: "application/javascript" });
	    const blobUrl = URL.createObjectURL(blob);
	
	    const script = document.createElement("script");
	    script.src = blobUrl;
	
	    let blocked = false;
	    script.onerror = () => {
	      blocked = true;
	    };
	
	    document.head.appendChild(script);
	
	    return new Promise((resolve) => {
	      setTimeout(() => {
	        resolve(!blocked);
	        document.head.removeChild(script);
	        URL.revokeObjectURL(blobUrl);
	      }, 100);
	    });
	  } catch (e) {
	    return Promise.resolve(false);
	  }
	}
	
	let CAN_USE_BLOB_CSP = false;
	
	const waitForDOMEnd = () => {
	  if (document.readyState === "loading") {
	    return new Promise((resolve) =>
	      document.addEventListener("DOMContentLoaded", resolve, { once: true })
	    );
	  }
	  return Promise.resolve();
	};
	
	waitForDOMEnd().then(() => {
	  _testBlobCSP().then((result) => {
	    CAN_USE_BLOB_CSP = result;
	  });
	});
	
	function _base64ToBlob(base64, mimeType = "application/octet-stream") {
	  const binary = atob(base64);
	  const len = binary.length;
	  const bytes = new Uint8Array(len);
	  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
	  return new Blob([bytes], { type: mimeType });
	}
	
	function _getMimeTypeFromPath(p) {
	  const ext = (p.split(".").pop() || "").toLowerCase();
	  const map = {
	    html: "text/html",
	    htm: "text/html",
	    js: "text/javascript",
	    css: "text/css",
	    json: "application/json",
	    png: "image/png",
	    jpg: "image/jpeg",
	    jpeg: "image/jpeg",
	    gif: "image/gif",
	    svg: "image/svg+xml",
	    webp: "image/webp",
	    ico: "image/x-icon",
	    woff: "font/woff",
	    woff2: "font/woff2",
	    ttf: "font/ttf",
	    otf: "font/otf",
	    eot: "application/vnd.ms-fontobject",
	  };
	  return map[ext] || "application/octet-stream";
	}
	
	function _isTextAsset(ext) {
	  return ["html", "htm", "js", "css", "json", "svg", "txt", "xml"].includes(
	    ext
	  );
	}
	
	function _createAssetUrl(path = "") {
	  if (path.startsWith("/")) path = path.slice(1);
	  const assetData = EXTENSION_ASSETS_MAP[path];
	  if (typeof assetData === "undefined") {
	    _warn("[runtime.getURL] Asset not found for", path);
	    return path;
	  }
	
	  const mime = _getMimeTypeFromPath(path);
	  const ext = (path.split(".").pop() || "").toLowerCase();
	
	  if (CAN_USE_BLOB_CSP) {
	    let blob;
	    if (_isTextAsset(ext)) {
	      blob = new Blob([assetData], { type: mime });
	    } else {
	      blob = _base64ToBlob(assetData, mime);
	    }
	
	    return URL.createObjectURL(blob);
	  } else {
	    if (_isTextAsset(ext)) {
	      return `data:${mime};base64,${btoa(assetData)}`;
	    } else {
	      return `data:${mime};base64,${assetData}`;
	    }
	  }
	}
	
	function _matchGlobPattern(pattern, path) {
	  if (!pattern || !path) return false;
	
	  pattern = pattern.replace(/\\/g, "/");
	  path = path.replace(/\\/g, "/");
	
	  if (pattern === path) return true;
	
	  let regexPattern = pattern
	    .replace(/[.+?^${}()|[\]\\]/g, "\\$&") // Escape regex chars
	    .replace(/\*\*/g, "__DOUBLESTAR__") // Temporarily replace **
	    .replace(/\*/g, "[^/]*") // * matches any chars except /
	    .replace(/__DOUBLESTAR__/g, ".*"); // ** matches any chars including /
	
	  regexPattern = "^" + regexPattern + "$";
	
	  try {
	    const regex = new RegExp(regexPattern);
	    return regex.test(path);
	  } catch (e) {
	    _error(`Invalid glob pattern: ${pattern}`, e);
	    return false;
	  }
	}
	
	function _isWebAccessibleResource(resourcePath, webAccessibleResources) {
	  if (
	    !Array.isArray(webAccessibleResources) ||
	    webAccessibleResources.length === 0
	  ) {
	    return false;
	  }
	
	  // Normalize the resource path
	  const normalizedPath = resourcePath.replace(/\\/g, "/").replace(/^\/+/, "");
	
	  for (const webAccessibleResource of webAccessibleResources) {
	    let patterns = [];
	
	    // Handle both manifest v2 and v3 formats
	    if (typeof webAccessibleResource === "string") {
	      // Manifest v2 format: array of strings
	      patterns = [webAccessibleResource];
	    } else if (
	      webAccessibleResource &&
	      Array.isArray(webAccessibleResource.resources)
	    ) {
	      // Manifest v3 format: objects with resources array
	      patterns = webAccessibleResource.resources;
	    }
	
	    // Check if the path matches any pattern
	    for (const pattern of patterns) {
	      if (_matchGlobPattern(pattern, normalizedPath)) {
	        return true;
	      }
	    }
	  }
	
	  return false;
	}
	
	window._matchGlobPattern = _matchGlobPattern;
	window._isWebAccessibleResource = _isWebAccessibleResource;
	
	// This function contains all the CSS injection and JS execution,
	// ordered by run_at timing internally using await.
	
  // #region Script Execution Logic
		async function executeAllScripts(globalThis, extensionCssData) {
		  const {chrome, browser, global, window, self} = globalThis;
		  const scriptName = "Text Snippets & Templates for Teams";
		  _log(`Starting execution phases...`);
		
  // #region Document Start
			  if (typeof document !== 'undefined') {
			    _log(`Executing document-start phase...`);
			    
			    const scriptPaths = [];
			   _log(`  Executing JS (start): ${scriptPaths}`);
			
			   try {
			       // Keep variables from being redeclared for global scope, but also make them apply to global scope. (Theoretically)
			      with (globalThis){;
			
			;}
			   } catch(e) { _error(`  Error executing scripts ${scriptPaths}`, e); }
			  
			  } else {
			      _log(`Skipping document-start phase (no document).`);
			  }
			
			  
  // #endregion
  // #region Wait for Document End DOMContentLoaded ---
			  if (typeof document !== 'undefined' && document.readyState === 'loading') {
			    _log(`Waiting for DOMContentLoaded...`);
			    await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, { once: true }));
			    _log(`DOMContentLoaded fired.`);
			  } else if (typeof document !== 'undefined') {
			    _log(`DOMContentLoaded already passed or not applicable.`);
			  }
			  
			
  // #endregion
  // #region Document End
			   if (typeof document !== 'undefined') {
			    _log(`Executing document-end phase...`);
			    
			    const scriptPaths = [];
			   _log(`  Executing JS (end): ${scriptPaths}`);
			
			   try {
			       // Keep variables from being redeclared for global scope, but also make them apply to global scope. (Theoretically)
			      with (globalThis){;
			
			;}
			   } catch(e) { _error(`  Error executing scripts ${scriptPaths}`, e); }
			  
			  } else {
			      _log(`Skipping document-end phase (no document).`);
			  }
			
			  
  // #endregion
  // #region Wait for Document Idle
			  _log(`Waiting for document idle state...`);
			  if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
			      await new Promise(resolve => window.requestIdleCallback(resolve, { timeout: 2000 })); // 2-second timeout fallback
			      _log(`requestIdleCallback fired or timed out.`);
			  } else {
			      // Fallback: wait a short period after DOMContentLoaded/current execution if requestIdleCallback is unavailable
			      await new Promise(resolve => setTimeout(resolve, 50));
			      _log(`Idle fallback timer completed.`);
			  }
			  
			
  // #endregion
  // #region Document Idle
			   if (typeof document !== 'undefined') {
			    _log(`Executing document-idle phase...`);
			    
			    const scriptPaths = ["pages/website/index.js"];
			   _log(`  Executing JS (idle): ${scriptPaths}`);
			
			   try {
			       // Keep variables from being redeclared for global scope, but also make them apply to global scope. (Theoretically)
			      with (globalThis){;
			// START: pages/website/index.js
			(()=>{const e=document.createElement("meta");e.name="app:isExtensionInstalled",e.content="true",document.head.appendChild(e);const t=document.createElement("meta");t.name="app:installedExtension",t.content=chrome.runtime.id,document.head.appendChild(t)})();(()=>{const e=document.querySelector('meta[name="app:userId"]');if(e){const t=e.getAttribute("content");chrome.runtime.sendMessage({type:"SIGNED_IN_USER",data:{userSignedIn:t}},()=>{})}})();
			// END: pages/website/index.js
			;}
			   } catch(e) { _error(`  Error executing scripts ${scriptPaths}`, e); }
			  
			  } else {
			      _log(`Skipping document-idle phase (no document).`);
			  }
			
			  _log(`All execution phases complete, re-firing load events.`);
			  document.dispatchEvent(new Event("DOMContentLoaded", {
			    bubbles: true,
			    cancelable: true
			  }));
			}
			
  // #endregion
// #region Event Listener No changes needed here ---
			window.addEventListener("message", (event) => {
			  if (event.data.type === "openOptionsPage") {
			    openOptionsPage();
			  }
			  if (event.data.type === "openPopupPage") {
			    openPopupPage();
			  }
			  if (event.data.type === "closeOptionsPage") {
			    closeOptionsModal();
			  }
			  if (event.data.type === "closePopupPage") {
			    closePopupModal();
			  }
			});
			
// #endregion
// #region Refactored Modal Closing Functions Promise-based ---
			
			function closeOptionsModal() {
			  return new Promise((resolve) => {
			    const DURATION = 100;
			    const backdrop = document.getElementById("extension-options-backdrop");
			    const modal = document.getElementById("extension-options-modal");
			
			    if (!backdrop || !modal) {
			      return resolve();
			    }
			
			    modal.style.animation = `modalCloseAnimation ${DURATION / 1000}s ease-out forwards`;
			    backdrop.style.animation = `backdropFadeOut ${DURATION / 1000}s ease-out forwards`;
			
			    setTimeout(() => {
			      if (confirm("Close options and reload the page?")) {
			        window.location.reload(); // Note: This will stop further execution
			      } else {
			        backdrop.remove();
			      }
			      resolve();
			    }, DURATION);
			  });
			}
			
			function closePopupModal() {
			  return new Promise((resolve) => {
			    const DURATION = 100;
			    const backdrop = document.getElementById("extension-popup-backdrop");
			    const modal = document.getElementById("extension-popup-modal");
			
			    if (!backdrop || !modal) {
			      return resolve();
			    }
			
			    modal.style.animation = `modalCloseAnimation ${DURATION / 1000}s ease-out forwards`;
			    backdrop.style.animation = `backdropFadeOut ${DURATION / 1000}s ease-out forwards`;
			
			    setTimeout(() => {
			      backdrop.remove();
			      resolve();
			    }, DURATION);
			  });
			}
			
// #endregion
// #region Simplified Public API Functions ---
			
			async function openPopupPage() {
			  if (!POPUP_PAGE_PATH || typeof EXTENSION_ASSETS_MAP === "undefined") {
			    _warn("No popup page available.");
			    return;
			  }
			  await openModal({
			    type: "popup",
			    pagePath: POPUP_PAGE_PATH,
			    defaultTitle: "Extension Popup",
			    closeFn: closePopupModal,
			  });
			}
			
			async function openOptionsPage() {
			  if (!OPTIONS_PAGE_PATH || typeof EXTENSION_ASSETS_MAP === "undefined") {
			    _warn("No options page available.");
			    return;
			  }
			  await openModal({
			    type: "options",
			    pagePath: OPTIONS_PAGE_PATH,
			    defaultTitle: "Extension Options",
			    closeFn: closeOptionsModal,
			  });
			}
			
// #endregion
// #region Generic Modal Logic Style Injection ---
			
			let stylesInjected = false;
			function injectGlobalStyles() {
			  if (stylesInjected) return;
			  stylesInjected = true;
			
			  const styles = `
			        .extension-backdrop {
			            position: fixed;
			            top: 0; left: 0;
			            width: 100vw; height: 100vh;
			            background: rgba(0, 0, 0, 0.13);
			            backdrop-filter: blur(3px);
			            z-index: 2147483646;
			            display: flex;
			            align-items: center;
			            justify-content: center;
			            animation: backdropFadeIn 0.3s ease-out forwards;
			        }
			
			        .extension-modal {
			            z-index: 2147483647;
			            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
			            --background: #ffffff;
			            --rad: 10px;
			            --border: #666;
			            --border-thickness: 2px;
			            display: flex;
			            flex-direction: column;
			            overflow: hidden;
			            animation: modalOpenAnimation 0.3s ease-out forwards;
			        }
			
			        /* Size specific styles */
			        .extension-modal.popup-size {
			            width: 400px; height: 600px;
			            max-width: calc(100vw - 40px);
			            max-height: calc(100vh - 40px);
			        }
			        .extension-modal.options-size {
			            width: calc(100vw - 80px); height: calc(100vh - 80px);
			            max-width: 1200px;
			            max-height: 800px;
			        }
			
			        /* Common modal components */
			        .extension-modal .modal-header {
			            display: flex; justify-content: space-between; align-items: flex-end;
			            padding: 0 16px; position: relative; flex-shrink: 0;
			        }
			        .extension-modal .tab {
			            padding: 12px 16px; color: #606266;
			            display: flex; align-items: center; gap: 8px;
			            font-size: 14px; cursor: pointer;
			            border-radius: var(--rad) var(--rad) 0 0;
			            transition: background-color 0.2s ease; user-select: none;
			        }
			        .extension-modal .tab.active, .extension-modal .tab.close-button {
			            background-color: var(--background);
			            border: var(--border-thickness) solid var(--border);
			            border-bottom-color: var(--background);
			            margin-bottom: -1px; z-index: 1;
			            color: #303133; font-weight: 500;
			        }
			        .extension-modal .tab.close-button { padding: 8px; }
			        .extension-modal .tab.close-button:hover { background-color: #f5f7fa; }
			        .extension-modal .tab svg { stroke: currentColor; }
			        .extension-modal .tab.active img { width: 16px; height: 16px; }
			        .extension-modal .tab.close-button svg { width: 20px; height: 20px; }
			
			        .extension-modal .modal-content {
			            flex-grow: 1; position: relative;
			            border-radius: var(--rad); overflow: hidden;
			            bottom: calc(var(--border-thickness) - 1px);
			            border: var(--border-thickness) solid var(--border);
			        }
			        .extension-modal .modal-content iframe {
			            width: 100%; height: 100%; border: 0; background: white;
			        }
			
			        /* Animations */
			        @keyframes backdropFadeIn { from { opacity: 0; backdrop-filter: blur(0px); } to { opacity: 1; backdrop-filter: blur(3px); } }
			        @keyframes backdropFadeOut { from { opacity: 1; backdrop-filter: blur(3px); } to { opacity: 0; backdrop-filter: blur(0px); } }
			        @keyframes modalOpenAnimation { from { transform: scaleY(0.8); opacity: 0; } to { transform: scaleY(1); opacity: 1; } }
			        @keyframes modalCloseAnimation { from { transform: scaleY(1); opacity: 1; } to { transform: scaleY(0.8); opacity: 0; } }
			    `;
			  const styleSheet = document.createElement("style");
			  styleSheet.id = "extension-global-styles";
			  styleSheet.innerText = styles;
			  document.head.appendChild(styleSheet);
			}
			
			async function openModal(config) {
			  injectGlobalStyles();
			
			  const { type, pagePath, defaultTitle, closeFn } = config;
			  const html = EXTENSION_ASSETS_MAP[pagePath];
			  if (!html) {
			    _warn(`${defaultTitle} HTML not found in asset map`);
			    return;
			  }
			
			  const backdropId = `extension-${type}-backdrop`;
			  const modalId = `extension-${type}-modal`;
			  const sizeClass = `${type}-size`;
			
// #endregion
  // #region Smoothly close the other modal if it s open ---
			  const otherType = type === "popup" ? "options" : "popup";
			  const otherBackdrop = document.getElementById(
			    `extension-${otherType}-backdrop`
			  );
			  if (otherBackdrop) {
			    // Await the correct close function
			    await (otherType === "popup" ? closePopupModal() : closeOptionsModal());
			  }
			
			  let backdrop = document.getElementById(backdropId);
			  let modal, iframe;
			
			  if (!backdrop) {
			    backdrop = document.createElement("div");
			    backdrop.id = backdropId;
			    backdrop.className = "extension-backdrop";
			
			    modal = document.createElement("div");
			    modal.id = modalId;
			    modal.className = `extension-modal ${sizeClass}`;
			
			    const extensionName = INJECTED_MANIFEST.name || defaultTitle;
			    const iconSrc =
			      EXTENSION_ICON ||
			      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIHN0cm9rZT0ibm9uZSIgZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik00IDdoM2ExIDEgMCAwIDAgMSAtMXYtMWEyIDIgMCAwIDEgNCAwdjFhMSAxIDAgMCAwIDEgMWgzYTEgMSAwIDAgMSAxIDF2M2ExIDEgMCAwIDAgMSAxaDFhMiAyIDAgMCAxIDAgNGgtMWExIDEgMCAwIDAgLTEgMXYzYTEgMSAwIDAgMSAtMSAxaC0zYTEgMSAwIDAgMSAtMSAtMXYtMWEyIDIgMCAwIDAgLTQgMHYxYTEgMSAwIDAgMSAtMSAxaC0zYTEgMSAwIDAgMSAtMSAtMXYtM2ExIDEgMCAwIDEgMSAtMWgxYTIgMiAwIDAgMCAwIC00aC0xYTEgMSAwIDAgMSAtMSAtMXYtM2ExIDEgMCAwIDEgMSAtMSIgLz48L3N2Zz4=";
			
			    modal.innerHTML = `
			            <div class="modal-header">
			                <div class="tab active">
			                    <img src="${iconSrc}" onerror="this.style.display='none'">
			                    <span>${extensionName}</span>
			                </div>
			                <div class="tab close-button">
			                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
			                       <line x1="18" y1="6" x2="6" y2="18"></line>
			                       <line x1="6" y1="6" x2="18" y2="18"></line>
			                    </svg>
			                </div>
			            </div>
			            <div class="modal-content">
			                <iframe></iframe>
			            </div>
			        `;
			
			    backdrop.appendChild(modal);
			
			    backdrop.addEventListener("click", (e) => {
			      if (e.target === backdrop) closeFn();
			    });
			    modal.querySelector(".close-button").addEventListener("click", closeFn);
			
			    document.body.appendChild(backdrop);
			    iframe = modal.querySelector("iframe");
			  } else {
			    // If it already exists, just make sure it's visible
			    backdrop.style.display = "flex";
			    modal = backdrop.querySelector(".extension-modal");
			    iframe = modal.querySelector("iframe");
			  }
			
			  // Load content into iframe
			  try {
			    const polyfillString = generateCompletePolyfillForIframe();
			    const doc = new DOMParser().parseFromString(html, "text/html");
			    const script = doc.createElement("script");
			    script.textContent = polyfillString;
			    doc.head.insertAdjacentElement("afterbegin", script);
			    iframe.srcdoc = doc.documentElement.outerHTML;
			  } catch (e) {
			    _error("Error generating complete polyfill for iframe", e);
			    iframe.srcdoc = html;
			  }
			}
			
			function generateCompletePolyfillForIframe() {
			  const polyfillString = "\n// -- Messaging implementation\n\nfunction createEventBus(\n  scopeId,\n  type = \"page\", // \"page\" or \"iframe\"\n  { allowedOrigin = \"*\", children = [], parentWindow = null } = {}\n) {\n  if (!scopeId) throw new Error(\"createEventBus requires a scopeId\");\n\n  const handlers = {};\n\n  function handleIncoming(ev) {\n    if (allowedOrigin !== \"*\" && ev.origin !== allowedOrigin) return;\n\n    const msg = ev.data;\n    if (!msg || msg.__eventBus !== true || msg.scopeId !== scopeId) return;\n\n    const { event, payload } = msg;\n\n    // PAGE: if it's an INIT from an iframe, adopt it\n    if (type === \"page\" && event === \"__INIT__\") {\n      const win = ev.source;\n      if (win && !children.includes(win)) {\n        children.push(win);\n      }\n      return;\n    }\n\n    (handlers[event] || []).forEach((fn) =>\n      fn(payload, { origin: ev.origin, source: ev.source })\n    );\n  }\n\n  window.addEventListener(\"message\", handleIncoming);\n\n  function emitTo(win, event, payload) {\n    const envelope = {\n      __eventBus: true,\n      scopeId,\n      event,\n      payload,\n    };\n    win.postMessage(envelope, allowedOrigin);\n  }\n\n  // IFRAME: announce to page on startup\n  if (type === \"iframe\") {\n    setTimeout(() => {\n      const pw = parentWindow || window.parent;\n      if (pw && pw.postMessage) {\n        emitTo(pw, \"__INIT__\", null);\n      }\n    }, 0);\n  }\n\n  return {\n    on(event, fn) {\n      handlers[event] = handlers[event] || [];\n      handlers[event].push(fn);\n    },\n    off(event, fn) {\n      if (!handlers[event]) return;\n      handlers[event] = handlers[event].filter((h) => h !== fn);\n    },\n    /**\n     * Emits an event.\n     * @param {string} event - The event name.\n     * @param {any} payload - The event payload.\n     * @param {object} [options] - Emission options.\n     * @param {Window} [options.to] - A specific window to target. If provided, message is ONLY sent to the target.\n     */\n    emit(event, payload, { to } = {}) {\n      // If a specific target window is provided, send only to it and DO NOT dispatch locally.\n      // This prevents a port from receiving its own messages.\n      if (to) {\n        if (to && typeof to.postMessage === \"function\") {\n          emitTo(to, event, payload);\n        }\n        return; // Exit after targeted send.\n      }\n\n      // For broadcast messages (no 'to' target), dispatch locally first.\n      (handlers[event] || []).forEach((fn) =>\n        fn(payload, { origin: location.origin, source: window })\n      );\n\n      // Then propagate the broadcast to other windows.\n      if (type === \"page\") {\n        children.forEach((win) => emitTo(win, event, payload));\n      } else {\n        const pw = parentWindow || window.parent;\n        if (pw && pw.postMessage) {\n          emitTo(pw, event, payload);\n        }\n      }\n    },\n  };\n}\n\nfunction createRuntime(type = \"background\", bus) {\n  let nextId = 1;\n  const pending = {};\n  const msgListeners = [];\n\n  let nextPortId = 1;\n  const ports = {};\n  const onConnectListeners = [];\n\n  function parseArgs(args) {\n    let target, message, options, callback;\n    const arr = [...args];\n    if (arr.length === 0) {\n      throw new Error(\"sendMessage requires at least one argument\");\n    }\n    if (arr.length === 1) {\n      return { message: arr[0] };\n    }\n    // last object could be options\n    if (\n      arr.length &&\n      typeof arr[arr.length - 1] === \"object\" &&\n      !Array.isArray(arr[arr.length - 1])\n    ) {\n      options = arr.pop();\n    }\n    // last function is callback\n    if (arr.length && typeof arr[arr.length - 1] === \"function\") {\n      callback = arr.pop();\n    }\n    if (\n      arr.length === 2 &&\n      (typeof arr[0] === \"string\" || typeof arr[0] === \"number\")\n    ) {\n      [target, message] = arr;\n    } else {\n      [message] = arr;\n    }\n    return { target, message, options, callback };\n  }\n\n  if (type === \"background\") {\n    bus.on(\"__REQUEST__\", ({ id, message }, { source }) => {\n      let responded = false,\n        isAsync = false;\n      function sendResponse(resp) {\n        if (responded) return;\n        responded = true;\n        // Target the response directly back to the window that sent the request.\n        bus.emit(\"__RESPONSE__\", { id, response: resp }, { to: source });\n      }\n      const results = msgListeners\n        .map((fn) => {\n          try {\n            // msg, sender, sendResponse\n            const ret = fn(message, { id, tab: { id: source } }, sendResponse);\n            if (ret === true || (ret && typeof ret.then === \"function\")) {\n              isAsync = true;\n              return ret;\n            }\n            return ret;\n          } catch (e) {\n            _error(e);\n          }\n        })\n        .filter((r) => r !== undefined);\n\n      const promises = results.filter((r) => r && typeof r.then === \"function\");\n      if (!isAsync && promises.length === 0) {\n        const out = results.length === 1 ? results[0] : results;\n        sendResponse(out);\n      } else if (promises.length) {\n        Promise.all(promises).then((vals) => {\n          if (!responded) {\n            const out = vals.length === 1 ? vals[0] : vals;\n            sendResponse(out);\n          }\n        });\n      }\n    });\n  }\n\n  if (type !== \"background\") {\n    bus.on(\"__RESPONSE__\", ({ id, response }) => {\n      const entry = pending[id];\n      if (!entry) return;\n      entry.resolve(response);\n      if (entry.callback) entry.callback(response);\n      delete pending[id];\n    });\n  }\n\n  function sendMessage(...args) {\n    // Background should be able to send message to itself\n    // if (type === \"background\") {\n    //   throw new Error(\"Background cannot sendMessage to itself\");\n    // }\n    const { target, message, callback } = parseArgs(args);\n    const id = nextId++;\n    const promise = new Promise((resolve) => {\n      pending[id] = { resolve, callback };\n      bus.emit(\"__REQUEST__\", { id, message });\n    });\n    return promise;\n  }\n\n  bus.on(\"__PORT_CONNECT__\", ({ portId, name }, { source }) => {\n    if (type !== \"background\") return;\n    const backgroundPort = makePort(\"background\", portId, name, source);\n    ports[portId] = backgroundPort;\n\n    onConnectListeners.forEach((fn) => fn(backgroundPort));\n\n    // send back a CONNECT_ACK so the client can\n    // start listening on its end:\n    bus.emit(\"__PORT_CONNECT_ACK__\", { portId, name }, { to: source });\n  });\n\n  // Clients handle the ACK and finalize their Port object by learning the remote window.\n  bus.on(\"__PORT_CONNECT_ACK__\", ({ portId, name }, { source }) => {\n    if (type === \"background\") return; // ignore\n    const p = ports[portId];\n    if (!p) return;\n    // Call the port's internal finalize method to complete the handshake\n    if (p._finalize) {\n      p._finalize(source);\n    }\n  });\n\n  // Any port message travels via \"__PORT_MESSAGE__\"\n  bus.on(\"__PORT_MESSAGE__\", (envelope, { source }) => {\n    const { portId } = envelope;\n    const p = ports[portId];\n    if (!p) return;\n    p._receive(envelope, source);\n  });\n\n  // Any port disconnect:\n  bus.on(\"__PORT_DISCONNECT__\", ({ portId }) => {\n    const p = ports[portId];\n    if (!p) return;\n    p._disconnect();\n    delete ports[portId];\n  });\n\n  // Refactored makePort to correctly manage internal state and the connection handshake.\n  function makePort(side, portId, name, remoteWindow) {\n    let onMessageHandlers = [];\n    let onDisconnectHandlers = [];\n    let buffer = [];\n    // Unique instance ID for this port instance\n    const instanceId = Math.random().toString(36).slice(2) + Date.now();\n    // These state variables are part of the closure and are updated by _finalize\n    let _ready = side === \"background\";\n\n    function _drainBuffer() {\n      buffer.forEach((m) => _post(m));\n      buffer = [];\n    }\n\n    function _post(msg) {\n      // Always use the 'to' parameter for port messages, making them directional.\n      // Include senderInstanceId\n      bus.emit(\n        \"__PORT_MESSAGE__\",\n        { portId, msg, senderInstanceId: instanceId },\n        { to: remoteWindow }\n      );\n    }\n\n    function postMessage(msg) {\n      if (!_ready) {\n        buffer.push(msg);\n      } else {\n        _post(msg);\n      }\n    }\n\n    function _receive(envelope, source) {\n      // envelope: { msg, senderInstanceId }\n      if (envelope.senderInstanceId === instanceId) return; // Don't dispatch to self\n      onMessageHandlers.forEach((fn) =>\n        fn(envelope.msg, { id: portId, tab: { id: source } })\n      );\n    }\n\n    function disconnect() {\n      // Also use the 'to' parameter for disconnect messages\n      bus.emit(\"__PORT_DISCONNECT__\", { portId }, { to: remoteWindow });\n      _disconnect();\n      delete ports[portId];\n    }\n\n    function _disconnect() {\n      onDisconnectHandlers.forEach((fn) => fn());\n      onMessageHandlers = [];\n      onDisconnectHandlers = [];\n    }\n\n    // This function is called on the client port when the ACK is received from background.\n    // It updates the port's state, completing the connection.\n    function _finalize(win) {\n      remoteWindow = win; // <-- This is the crucial part: learn the destination\n      _ready = true;\n      _drainBuffer();\n    }\n\n    return {\n      name,\n      sender: {\n        id: portId,\n      },\n      onMessage: {\n        addListener(fn) {\n          onMessageHandlers.push(fn);\n        },\n        removeListener(fn) {\n          onMessageHandlers = onMessageHandlers.filter((x) => x !== fn);\n        },\n      },\n      onDisconnect: {\n        addListener(fn) {\n          onDisconnectHandlers.push(fn);\n        },\n        removeListener(fn) {\n          onDisconnectHandlers = onDisconnectHandlers.filter((x) => x !== fn);\n        },\n      },\n      postMessage,\n      disconnect,\n      // Internal methods used by the runtime\n      _receive,\n      _disconnect,\n      _finalize, // Expose the finalizer for the ACK handler\n    };\n  }\n\n  function connect(connectInfo = {}) {\n    if (type === \"background\") {\n      throw new Error(\"Background must use onConnect, not connect()\");\n    }\n    const name = connectInfo.name || \"\";\n    const portId = nextPortId++;\n    // create the client side port\n    // remoteWindow is initially null; it will be set by _finalize upon ACK.\n    const clientPort = makePort(\"client\", portId, name, null);\n    ports[portId] = clientPort;\n\n    // fire the connect event across the bus\n    bus.emit(\"__PORT_CONNECT__\", { portId, name });\n    return clientPort;\n  }\n\n  function onConnect(fn) {\n    if (type !== \"background\") {\n      throw new Error(\"connect event only fires in background\");\n    }\n    onConnectListeners.push(fn);\n  }\n\n  return {\n    // rpc:\n    sendMessage,\n    onMessage: {\n      addListener(fn) {\n        msgListeners.push(fn);\n      },\n      removeListener(fn) {\n        const i = msgListeners.indexOf(fn);\n        if (i >= 0) msgListeners.splice(i, 1);\n      },\n    },\n\n    // port API:\n    connect,\n    onConnect: {\n      addListener(fn) {\n        onConnect(fn);\n      },\n      removeListener(fn) {\n        const i = onConnectListeners.indexOf(fn);\n        if (i >= 0) onConnectListeners.splice(i, 1);\n      },\n    },\n  };\n}\n\n\n// --- Abstraction Layer: PostMessage Target\n\nlet nextRequestId = 1;\nconst pendingRequests = new Map(); // requestId -> { resolve, reject, timeout }\n\nfunction sendAbstractionRequest(method, args = []) {\n  return new Promise((resolve, reject) => {\n    const requestId = nextRequestId++;\n\n    const timeout = setTimeout(() => {\n      pendingRequests.delete(requestId);\n      reject(new Error(`PostMessage request timeout for method: ${method}`));\n    }, 10000);\n\n    pendingRequests.set(requestId, { resolve, reject, timeout });\n\n    window.parent.postMessage({\n      type: \"abstraction-request\",\n      requestId,\n      method,\n      args,\n    });\n  });\n}\n\nwindow.addEventListener(\"message\", (event) => {\n  const { type, requestId, success, result, error } = event.data;\n\n  if (type === \"abstraction-response\") {\n    const pending = pendingRequests.get(requestId);\n    if (pending) {\n      clearTimeout(pending.timeout);\n      pendingRequests.delete(requestId);\n\n      if (success) {\n        pending.resolve(result);\n      } else {\n        const err = new Error(error.message);\n        err.stack = error.stack;\n        pending.reject(err);\n      }\n    }\n  }\n});\n\nasync function _storageSet(items) {\n  return sendAbstractionRequest(\"_storageSet\", [items]);\n}\n\nasync function _storageGet(keys) {\n  return sendAbstractionRequest(\"_storageGet\", [keys]);\n}\n\nasync function _storageRemove(keysToRemove) {\n  return sendAbstractionRequest(\"_storageRemove\", [keysToRemove]);\n}\n\nasync function _storageClear() {\n  return sendAbstractionRequest(\"_storageClear\");\n}\n\nasync function _cookieList(details) {\n  return sendAbstractionRequest(\"_cookieList\", [details]);\n}\n\nasync function _cookieSet(details) {\n  return sendAbstractionRequest(\"_cookieSet\", [details]);\n}\n\nasync function _cookieDelete(details) {\n  return sendAbstractionRequest(\"_cookieDelete\", [details]);\n}\n\nasync function _fetch(url, options) {\n  return sendAbstractionRequest(\"_fetch\", [url, options]);\n}\n\nfunction _registerMenuCommand(name, func) {\n  _warn(\"_registerMenuCommand called from iframe context:\", name);\n  return sendAbstractionRequest(\"_registerMenuCommand\", [\n    name,\n    func.toString(),\n  ]);\n}\n\nfunction _openTab(url, active) {\n  return sendAbstractionRequest(\"_openTab\", [url, active]);\n}\n\nasync function _initStorage() {\n  return sendAbstractionRequest(\"_initStorage\");\n}\n\n\nconst EXTENSION_ASSETS_MAP = {{EXTENSION_ASSETS_MAP}};\n\n// -- Polyfill Implementation\nfunction buildPolyfill({ isBackground = false, isOtherPage = false } = {}) {\n  // Generate a unique context ID for this polyfill instance\n  const contextType = isBackground\n    ? \"background\"\n    : isOtherPage\n      ? \"options\"\n      : \"content\";\n  const contextId = `${contextType}_${Math.random()\n    .toString(36)\n    .substring(2, 15)}`;\n\n  const IS_IFRAME = \"true\" === \"true\";\n  const BUS = (function () {\n    if (globalThis.__BUS) {\n      return globalThis.__BUS;\n    }\n    globalThis.__BUS = createEventBus(\n      \"text-snippets-templates-for-teams\",\n      IS_IFRAME ? \"iframe\" : \"page\",\n    );\n    return globalThis.__BUS;\n  })();\n  const RUNTIME = createRuntime(isBackground ? \"background\" : \"tab\", BUS);\n  const createNoopListeners = () => ({\n    addListener: (callback) => {\n      _log(\"addListener\", callback);\n    },\n    removeListener: (callback) => {\n      _log(\"removeListener\", callback);\n    },\n  });\n  // TODO: Stub\n  const storageChangeListeners = new Set();\n  function broadcastStorageChange(changes, areaName) {\n    storageChangeListeners.forEach((listener) => {\n      listener(changes, areaName);\n    });\n  }\n\n  let REQ_PERMS = [];\n\n  // --- Chrome polyfill\n  let chrome = {\n    extension: {\n      isAllowedIncognitoAccess: () => Promise.resolve(true),\n      sendMessage: (...args) => _messagingHandler.sendMessage(...args),\n    },\n    permissions: {\n      // TODO: Remove origin permission means exclude from origin in startup (when checking for content scripts)\n      request: (permissions, callback) => {\n        _log(\"permissions.request\", permissions, callback);\n        if (Array.isArray(permissions)) {\n          REQ_PERMS = [...REQ_PERMS, ...permissions];\n        }\n        if (typeof callback === \"function\") {\n          callback(permissions);\n        }\n        return Promise.resolve(permissions);\n      },\n      contains: (permissions, callback) => {\n        if (typeof callback === \"function\") {\n          callback(true);\n        }\n        return Promise.resolve(true);\n      },\n      getAll: () => {\n        return Promise.resolve({\n          permissions: EXTENSION_PERMISSIONS,\n          origins: ORIGIN_PERMISSIONS,\n        });\n      },\n      onAdded: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n    },\n    i18n: {\n      getUILanguage: () => {\n        return USED_LOCALE || \"en\";\n      },\n      getMessage: (key, substitutions = []) => {\n        if (typeof substitutions === \"string\") {\n          substitutions = [substitutions];\n        }\n        if (typeof LOCALE_KEYS !== \"undefined\" && LOCALE_KEYS[key]) {\n          return LOCALE_KEYS[key].message?.replace(\n            /\\$(\\d+)/g,\n            (match, p1) => substitutions[p1 - 1] || match,\n          );\n        }\n        return key;\n      },\n    },\n    alarms: {\n      onAlarm: createNoopListeners(),\n      create: () => {\n        _log(\"alarms.create\", arguments);\n      },\n      get: () => {\n        _log(\"alarms.get\", arguments);\n      },\n    },\n    runtime: {\n      ...RUNTIME,\n      onInstalled: createNoopListeners(),\n      onStartup: createNoopListeners(),\n      // TODO: Postmessage to parent to open options page or call openOptionsPage\n      openOptionsPage: () => {\n        // const url = chrome.runtime.getURL(OPTIONS_PAGE_PATH);\n        // console.log(\"openOptionsPage\", _openTab, url, EXTENSION_ASSETS_MAP);\n        // _openTab(url);\n        if (typeof openOptionsPage === \"function\") {\n          openOptionsPage();\n        } else if (window.parent) {\n          window.parent.postMessage({ type: \"openOptionsPage\" }, \"*\");\n        } else {\n          _warn(\"openOptionsPage not available.\");\n        }\n      },\n      getManifest: () => {\n        // The manifest object will be injected into the scope where buildPolyfill is called\n        if (typeof INJECTED_MANIFEST !== \"undefined\") {\n          return JSON.parse(JSON.stringify(INJECTED_MANIFEST)); // Return deep copy\n        }\n        _warn(\"INJECTED_MANIFEST not found for chrome.runtime.getManifest\");\n        return { name: \"Unknown\", version: \"0.0\", manifest_version: 2 };\n      },\n      getURL: (path) => {\n        if (!path) return \"\";\n        if (path.startsWith(\"/\")) {\n          path = path.substring(1);\n        }\n\n        if (typeof _createAssetUrl === \"function\") {\n          return _createAssetUrl(path);\n        }\n\n        _warn(\n          `chrome.runtime.getURL fallback for '${path}'. Assets may not be available.`,\n        );\n        // Attempt a relative path resolution (highly context-dependent and likely wrong)\n        try {\n          if (window.location.protocol.startsWith(\"http\")) {\n            return new URL(path, window.location.href).toString();\n          }\n        } catch (e) {\n          /* ignore error, fallback */\n        }\n        return path;\n      },\n      id: \"polyfilled-extension-\" + Math.random().toString(36).substring(2, 15),\n      lastError: null,\n      setUninstallURL: () => {},\n      setUpdateURL: () => {},\n      getPlatformInfo: async () => {\n        const platform = {\n          os: \"unknown\",\n          arch: \"unknown\",\n          nacl_arch: \"unknown\",\n        };\n\n        if (typeof navigator !== \"undefined\") {\n          const userAgent = navigator.userAgent.toLowerCase();\n          if (userAgent.includes(\"mac\")) platform.os = \"mac\";\n          else if (userAgent.includes(\"win\")) platform.os = \"win\";\n          else if (userAgent.includes(\"linux\")) platform.os = \"linux\";\n          else if (userAgent.includes(\"android\")) platform.os = \"android\";\n          else if (userAgent.includes(\"ios\")) platform.os = \"ios\";\n\n          if (userAgent.includes(\"x86_64\") || userAgent.includes(\"amd64\")) {\n            platform.arch = \"x86-64\";\n          } else if (userAgent.includes(\"i386\") || userAgent.includes(\"i686\")) {\n            platform.arch = \"x86-32\";\n          } else if (userAgent.includes(\"arm\")) {\n            platform.arch = \"arm\";\n          }\n        }\n\n        return platform;\n      },\n      getBrowserInfo: async () => {\n        const info = {\n          name: \"unknown\",\n          version: \"unknown\",\n          buildID: \"unknown\",\n        };\n\n        if (typeof navigator !== \"undefined\") {\n          const userAgent = navigator.userAgent;\n          if (userAgent.includes(\"Chrome\")) {\n            info.name = \"Chrome\";\n            const match = userAgent.match(/Chrome\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          } else if (userAgent.includes(\"Firefox\")) {\n            info.name = \"Firefox\";\n            const match = userAgent.match(/Firefox\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          } else if (userAgent.includes(\"Safari\")) {\n            info.name = \"Safari\";\n            const match = userAgent.match(/Version\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          }\n        }\n\n        return info;\n      },\n    },\n    storage: {\n      local: {\n        get: function (keys, callback) {\n          if (typeof _storageGet !== \"function\")\n            throw new Error(\"_storageGet not defined\");\n\n          const promise = _storageGet(keys);\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.get callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.get error:\", error);\n                callback({});\n              });\n            return;\n          }\n\n          return promise;\n        },\n        set: function (items, callback) {\n          if (typeof _storageSet !== \"function\")\n            throw new Error(\"_storageSet not defined\");\n\n          const promise = _storageSet(items).then((result) => {\n            broadcastStorageChange(items, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.set callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.set error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        remove: function (keys, callback) {\n          if (typeof _storageRemove !== \"function\")\n            throw new Error(\"_storageRemove not defined\");\n\n          const promise = _storageRemove(keys).then((result) => {\n            const changes = {};\n            const keyList = Array.isArray(keys) ? keys : [keys];\n            keyList.forEach((key) => {\n              changes[key] = { oldValue: undefined, newValue: undefined };\n            });\n            broadcastStorageChange(changes, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.remove callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.remove error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        clear: function (callback) {\n          if (typeof _storageClear !== \"function\")\n            throw new Error(\"_storageClear not defined\");\n\n          const promise = _storageClear().then((result) => {\n            broadcastStorageChange({}, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.clear callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.clear error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        onChanged: {\n          addListener: (callback) => {\n            storageChangeListeners.add(callback);\n          },\n          removeListener: (callback) => {\n            storageChangeListeners.delete(callback);\n          },\n        },\n      },\n      sync: {\n        get: function (keys, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n          return chrome.storage.local.get(keys, callback);\n        },\n        set: function (items, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.set(items).then((result) => {\n            broadcastStorageChange(items, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.set callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.set error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        remove: function (keys, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.remove(keys).then((result) => {\n            const changes = {};\n            const keyList = Array.isArray(keys) ? keys : [keys];\n            keyList.forEach((key) => {\n              changes[key] = { oldValue: undefined, newValue: undefined };\n            });\n            broadcastStorageChange(changes, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.remove callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.remove error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        clear: function (callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.clear().then((result) => {\n            broadcastStorageChange({}, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.clear callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.clear error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        onChanged: {\n          addListener: (callback) => {\n            storageChangeListeners.add(callback);\n          },\n          removeListener: (callback) => {\n            storageChangeListeners.delete(callback);\n          },\n        },\n      },\n      onChanged: {\n        addListener: (callback) => {\n          storageChangeListeners.add(callback);\n        },\n        removeListener: (callback) => {\n          storageChangeListeners.delete(callback);\n        },\n      },\n      managed: {\n        get: function (keys, callback) {\n          _warn(\"chrome.storage.managed polyfill is read-only empty.\");\n\n          const promise = Promise.resolve({});\n\n          if (typeof callback === \"function\") {\n            promise.then((result) => {\n              try {\n                callback(result);\n              } catch (e) {\n                _error(\"Error in storage.managed.get callback:\", e);\n              }\n            });\n            return;\n          }\n\n          return promise;\n        },\n      },\n    },\n    cookies: (function () {\n      const cookieChangeListeners = new Set();\n      function broadcastCookieChange(changeInfo) {\n        cookieChangeListeners.forEach((listener) => {\n          try {\n            listener(changeInfo);\n          } catch (e) {\n            _error(\"Error in cookies.onChanged listener:\", e);\n          }\n        });\n      }\n\n      function handlePromiseCallback(promise, callback) {\n        if (typeof callback === \"function\") {\n          promise\n            .then((result) => callback(result))\n            .catch((error) => {\n              // chrome.runtime.lastError = { message: error.message }; // TODO: Implement lastError\n              _error(error);\n              callback(); // Call with undefined on error\n            });\n          return;\n        }\n        return promise;\n      }\n\n      return {\n        get: function (details, callback) {\n          if (typeof _cookieList !== \"function\") {\n            return handlePromiseCallback(\n              Promise.reject(new Error(\"_cookieList not defined\")),\n              callback,\n            );\n          }\n          const promise = _cookieList({\n            url: details.url,\n            name: details.name,\n            storeId: details.storeId,\n            partitionKey: details.partitionKey,\n          }).then((cookies) => {\n            if (!cookies || cookies.length === 0) {\n              return null;\n            }\n            // Sort by path length (longest first), then creation time (earliest first, if available)\n            cookies.sort((a, b) => {\n              const pathLenDiff = (b.path || \"\").length - (a.path || \"\").length;\n              if (pathLenDiff !== 0) return pathLenDiff;\n              return (a.creationTime || 0) - (b.creationTime || 0);\n            });\n            return cookies[0];\n          });\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getAll: function (details, callback) {\n          if (typeof _cookieList !== \"function\") {\n            return handlePromiseCallback(\n              Promise.reject(new Error(\"_cookieList not defined\")),\n              callback,\n            );\n          }\n          if (details.partitionKey) {\n            _warn(\n              \"cookies.getAll: partitionKey is not fully supported in this environment.\",\n            );\n          }\n          const promise = _cookieList(details);\n          return handlePromiseCallback(promise, callback);\n        },\n\n        set: function (details, callback) {\n          const promise = (async () => {\n            if (\n              typeof _cookieSet !== \"function\" ||\n              typeof _cookieList !== \"function\"\n            ) {\n              throw new Error(\"_cookieSet or _cookieList not defined\");\n            }\n            if (details.partitionKey) {\n              _warn(\n                \"cookies.set: partitionKey is not fully supported in this environment.\",\n              );\n            }\n\n            const getDetails = {\n              url: details.url,\n              name: details.name,\n              storeId: details.storeId,\n            };\n            const oldCookies = await _cookieList(getDetails);\n            const oldCookie = oldCookies && oldCookies[0];\n\n            if (oldCookie) {\n              broadcastCookieChange({\n                cause: \"overwrite\",\n                cookie: oldCookie,\n                removed: true,\n              });\n            }\n\n            await _cookieSet(details);\n            const newCookies = await _cookieList(getDetails);\n            const newCookie = newCookies && newCookies[0];\n\n            if (newCookie) {\n              broadcastCookieChange({\n                cause: \"explicit\",\n                cookie: newCookie,\n                removed: false,\n              });\n            }\n            return newCookie || null;\n          })();\n          return handlePromiseCallback(promise, callback);\n        },\n\n        remove: function (details, callback) {\n          const promise = (async () => {\n            if (\n              typeof _cookieDelete !== \"function\" ||\n              typeof _cookieList !== \"function\"\n            ) {\n              throw new Error(\"_cookieDelete or _cookieList not defined\");\n            }\n            const oldCookies = await _cookieList(details);\n            const oldCookie = oldCookies && oldCookies[0];\n\n            if (!oldCookie) return null; // Nothing to remove\n\n            await _cookieDelete(details);\n\n            broadcastCookieChange({\n              cause: \"explicit\",\n              cookie: oldCookie,\n              removed: true,\n            });\n\n            return {\n              url: details.url,\n              name: details.name,\n              storeId: details.storeId || \"0\",\n              partitionKey: details.partitionKey,\n            };\n          })();\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getAllCookieStores: function (callback) {\n          const promise = Promise.resolve([\n            { id: \"0\", tabIds: [1] }, // Mock store for the current context\n          ]);\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getPartitionKey: function (details, callback) {\n          _warn(\n            \"chrome.cookies.getPartitionKey is not supported in this environment.\",\n          );\n          const promise = Promise.resolve({ partitionKey: {} }); // Return empty partition key\n          return handlePromiseCallback(promise, callback);\n        },\n\n        onChanged: {\n          addListener: (callback) => {\n            if (typeof callback === \"function\") {\n              cookieChangeListeners.add(callback);\n            }\n          },\n          removeListener: (callback) => {\n            cookieChangeListeners.delete(callback);\n          },\n        },\n      };\n    })(),\n    tabs: {\n      query: async (queryInfo) => {\n        _warn(\"chrome.tabs.query polyfill only returns current tab info.\");\n        const dummyId = Math.floor(Math.random() * 1000) + 1;\n        return [\n          {\n            id: dummyId,\n            url: CURRENT_LOCATION,\n            active: true,\n            windowId: 1,\n            status: \"complete\",\n          },\n        ];\n      },\n      create: async ({ url, active = true }) => {\n        _log(`[Polyfill tabs.create] URL: ${url}`);\n        if (typeof _openTab !== \"function\")\n          throw new Error(\"_openTab not defined\");\n        _openTab(url, active);\n        const dummyId = Math.floor(Math.random() * 1000) + 1001;\n        return Promise.resolve({\n          id: dummyId,\n          url: url,\n          active,\n          windowId: 1,\n        });\n      },\n      sendMessage: async (tabId, message) => {\n        _warn(\n          `chrome.tabs.sendMessage polyfill (to tab ${tabId}) redirects to runtime.sendMessage (current context).`,\n        );\n        return chrome.runtime.sendMessage(message);\n      },\n      onActivated: createNoopListeners(),\n      onUpdated: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n      onReplaced: createNoopListeners(),\n      onCreated: createNoopListeners(),\n      onMoved: createNoopListeners(),\n      onDetached: createNoopListeners(),\n      onAttached: createNoopListeners(),\n    },\n    windows: {\n      onFocusChanged: createNoopListeners(),\n      onCreated: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n      onFocused: createNoopListeners(),\n      onFocus: createNoopListeners(),\n      onBlur: createNoopListeners(),\n      onFocused: createNoopListeners(),\n    },\n    notifications: {\n      create: async (notificationId, options) => {\n        try {\n          let id = notificationId;\n          let notificationOptions = options;\n\n          if (typeof notificationId === \"object\" && notificationId !== null) {\n            notificationOptions = notificationId;\n            id = \"notification_\" + Math.random().toString(36).substring(2, 15);\n          } else if (typeof notificationId === \"string\" && options) {\n            id = notificationId;\n            notificationOptions = options;\n          } else {\n            throw new Error(\"Invalid parameters for notifications.create\");\n          }\n\n          if (!notificationOptions || typeof notificationOptions !== \"object\") {\n            throw new Error(\"Notification options must be an object\");\n          }\n\n          const {\n            title,\n            message,\n            iconUrl,\n            type = \"basic\",\n          } = notificationOptions;\n\n          if (!title || !message) {\n            throw new Error(\"Notification must have title and message\");\n          }\n\n          if (\"Notification\" in window) {\n            if (Notification.permission === \"granted\") {\n              const notification = new Notification(title, {\n                body: message,\n                icon: iconUrl,\n                tag: id,\n              });\n\n              _log(`[Notifications] Created notification: ${id}`);\n              return id;\n            } else if (Notification.permission === \"default\") {\n              const permission = await Notification.requestPermission();\n              if (permission === \"granted\") {\n                const notification = new Notification(title, {\n                  body: message,\n                  icon: iconUrl,\n                  tag: id,\n                });\n                _log(\n                  `[Notifications] Created notification after permission: ${id}`,\n                );\n                return id;\n              } else {\n                _warn(\"[Notifications] Permission denied for notifications\");\n                return id;\n              }\n            } else {\n              _warn(\"[Notifications] Notifications are blocked\");\n              return id;\n            }\n          } else {\n            _warn(\n              \"[Notifications] Native notifications not supported, using console fallback\",\n            );\n            _log(`[Notification] ${title}: ${message}`);\n            return id;\n          }\n        } catch (error) {\n          _error(\"[Notifications] Error creating notification:\", error.message);\n          throw error;\n        }\n      },\n      clear: async (notificationId) => {\n        _log(`[Notifications] Clear notification: ${notificationId}`);\n        // For native notifications, there's no direct way to clear by ID\n        // This is a limitation of the Web Notifications API\n        return true;\n      },\n      getAll: async () => {\n        _warn(\"[Notifications] getAll not fully supported in polyfill\");\n        return {};\n      },\n      getPermissionLevel: async () => {\n        if (\"Notification\" in window) {\n          const permission = Notification.permission;\n          return { level: permission === \"granted\" ? \"granted\" : \"denied\" };\n        }\n        return { level: \"denied\" };\n      },\n    },\n    contextMenus: {\n      create: (createProperties, callback) => {\n        try {\n          if (!createProperties || typeof createProperties !== \"object\") {\n            throw new Error(\"Context menu create properties must be an object\");\n          }\n\n          const { id, title, contexts = [\"page\"], onclick } = createProperties;\n          const menuId =\n            id || `menu_${Math.random().toString(36).substring(2, 15)}`;\n\n          if (!title || typeof title !== \"string\") {\n            throw new Error(\"Context menu must have a title\");\n          }\n\n          // Store menu items for potential use\n          if (!window._polyfillContextMenus) {\n            window._polyfillContextMenus = new Map();\n          }\n\n          window._polyfillContextMenus.set(menuId, {\n            id: menuId,\n            title,\n            contexts,\n            onclick,\n            enabled: createProperties.enabled !== false,\n          });\n\n          _log(\n            `[ContextMenus] Created context menu item: ${title} (${menuId})`,\n          );\n\n          // Try to register a menu command as fallback\n          if (typeof _registerMenuCommand === \"function\") {\n            try {\n              _registerMenuCommand(\n                title,\n                onclick ||\n                  (() => {\n                    _log(`Context menu clicked: ${title}`);\n                  }),\n              );\n            } catch (e) {\n              _warn(\n                \"[ContextMenus] Failed to register as menu command:\",\n                e.message,\n              );\n            }\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n\n          return menuId;\n        } catch (error) {\n          _error(\"[ContextMenus] Error creating context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n          throw error;\n        }\n      },\n      update: (id, updateProperties, callback) => {\n        try {\n          if (\n            !window._polyfillContextMenus ||\n            !window._polyfillContextMenus.has(id)\n          ) {\n            throw new Error(`Context menu item not found: ${id}`);\n          }\n\n          const menuItem = window._polyfillContextMenus.get(id);\n          Object.assign(menuItem, updateProperties);\n\n          _log(`[ContextMenus] Updated context menu item: ${id}`);\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\"[ContextMenus] Error updating context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      remove: (menuItemId, callback) => {\n        try {\n          if (\n            window._polyfillContextMenus &&\n            window._polyfillContextMenus.has(menuItemId)\n          ) {\n            window._polyfillContextMenus.delete(menuItemId);\n            _log(`[ContextMenus] Removed context menu item: ${menuItemId}`);\n          } else {\n            _warn(\n              `[ContextMenus] Context menu item not found for removal: ${menuItemId}`,\n            );\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\"[ContextMenus] Error removing context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      removeAll: (callback) => {\n        try {\n          if (window._polyfillContextMenus) {\n            const count = window._polyfillContextMenus.size;\n            window._polyfillContextMenus.clear();\n            _log(`[ContextMenus] Removed all ${count} context menu items`);\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\n            \"[ContextMenus] Error removing all context menus:\",\n            error.message,\n          );\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      onClicked: {\n        addListener: (callback) => {\n          if (!window._polyfillContextMenuListeners) {\n            window._polyfillContextMenuListeners = new Set();\n          }\n          window._polyfillContextMenuListeners.add(callback);\n          _log(\"[ContextMenus] Added click listener\");\n        },\n        removeListener: (callback) => {\n          if (window._polyfillContextMenuListeners) {\n            window._polyfillContextMenuListeners.delete(callback);\n            _log(\"[ContextMenus] Removed click listener\");\n          }\n        },\n      },\n    },\n  };\n\n  const tc = (fn) => {\n    try {\n      fn();\n    } catch (e) {}\n  };\n  const loggingProxyHandler = (_key) => ({\n    get(target, key, receiver) {\n      tc(() => _log(`[${contextType}] [CHROME - ${_key}] Getting ${key}`));\n      return Reflect.get(target, key, receiver);\n    },\n    set(target, key, value, receiver) {\n      tc(() =>\n        _log(`[${contextType}] [CHROME - ${_key}] Setting ${key} to ${value}`),\n      );\n      return Reflect.set(target, key, value, receiver);\n    },\n    has(target, key) {\n      tc(() =>\n        _log(`[${contextType}] [CHROME - ${_key}] Checking if ${key} exists`),\n      );\n      return Reflect.has(target, key);\n    },\n  });\n  chrome = Object.fromEntries(\n    Object.entries(chrome).map(([key, value]) => [\n      key,\n      new Proxy(value, loggingProxyHandler(key)),\n    ]),\n  );\n\n  // Alias browser to chrome for common Firefox pattern\n  const browser = new Proxy(chrome, loggingProxyHandler);\n\n  const oldGlobalThis = globalThis;\n  const oldWindow = window;\n  const oldSelf = self;\n  const oldGlobal = globalThis;\n  const __globalsStorage = {};\n\n  const TO_MODIFY = [oldGlobalThis, oldWindow, oldSelf, oldGlobal];\n  const set = (k, v) => {\n    __globalsStorage[k] = v;\n    TO_MODIFY.forEach((target) => {\n      target[k] = v;\n    });\n  };\n  const proxyHandler = {\n    get(target, key, receiver) {\n      const fns = [\n        () => __globalsStorage[key],\n        () => Reflect.get(target, key, target),\n        () => target[key],\n      ];\n      const out = fns\n        .map((f) => {\n          try {\n            let out = f();\n            return out;\n          } catch (e) {\n            return undefined;\n          }\n        })\n        .find((f) => f !== undefined);\n      if (typeof out === \"function\") {\n        return out.bind(target);\n      }\n      return out;\n    },\n    set(target, key, value, receiver) {\n      try {\n        tc(() => _log(`[${contextType}] Setting ${key} to ${value}`));\n        set(key, value);\n        return Reflect.set(target, key, value, receiver);\n      } catch (e) {\n        _error(\"Error setting\", key, value, e);\n        try {\n          target[key] = value;\n          return true;\n        } catch (e) {\n          _error(\"Error setting\", key, value, e);\n        }\n        return false;\n      }\n    },\n    has(target, key) {\n      try {\n        return key in __globalsStorage || key in target;\n      } catch (e) {\n        _error(\"Error has\", key, e);\n        try {\n          return key in __globalsStorage || key in target;\n        } catch (e) {\n          _error(\"Error has\", key, e);\n        }\n        return false;\n      }\n    },\n    getOwnPropertyDescriptor(target, key) {\n      try {\n        if (key in __globalsStorage) {\n          return {\n            configurable: true,\n            enumerable: true,\n            writable: true,\n            value: __globalsStorage[key],\n          };\n        }\n        // fall back to the real globalThis\n        const desc = Reflect.getOwnPropertyDescriptor(target, key);\n        // ensure it's configurable so the with‑scope binding logic can override it\n        if (desc && !desc.configurable) {\n          desc.configurable = true;\n        }\n        return desc;\n      } catch (e) {\n        _error(\"Error getOwnPropertyDescriptor\", key, e);\n        return {\n          configurable: true,\n          enumerable: true,\n          writable: true,\n          value: undefined,\n        };\n      }\n    },\n\n    defineProperty(target, key, descriptor) {\n      try {\n        // Normalize descriptor to avoid mixed accessor & data attributes\n        const hasAccessor = \"get\" in descriptor || \"set\" in descriptor;\n\n        if (hasAccessor) {\n          // Build a clean descriptor without value/writable when accessors present\n          const normalized = {\n            configurable:\n              \"configurable\" in descriptor ? descriptor.configurable : true,\n            enumerable:\n              \"enumerable\" in descriptor ? descriptor.enumerable : false,\n          };\n          if (\"get\" in descriptor) normalized.get = descriptor.get;\n          if (\"set\" in descriptor) normalized.set = descriptor.set;\n\n          // Store accessor references for inspection but avoid breaking invariants\n          set(key, {\n            get: descriptor.get,\n            set: descriptor.set,\n          });\n\n          return Reflect.defineProperty(target, key, normalized);\n        }\n\n        // Data descriptor path\n        set(key, descriptor.value);\n        return Reflect.defineProperty(target, key, descriptor);\n      } catch (e) {\n        _error(\"Error defineProperty\", key, descriptor, e);\n        return false;\n      }\n    },\n  };\n\n  // Create proxies once proxyHandler is defined\n  const proxyWindow = new Proxy(oldWindow, proxyHandler);\n  const proxyGlobalThis = new Proxy(oldGlobalThis, proxyHandler);\n  const proxyGlobal = new Proxy(oldGlobal, proxyHandler);\n  const proxySelf = new Proxy(oldSelf, proxyHandler);\n\n  // Seed storage with core globals so lookups succeed inside `with` blocks\n  Object.assign(__globalsStorage, {\n    chrome,\n    browser,\n    window: proxyWindow,\n    globalThis: proxyGlobalThis,\n    global: proxyGlobal,\n    self: proxySelf,\n    document: oldWindow.document,\n  });\n\n  const __globals = {\n    chrome,\n    browser,\n    window: proxyWindow,\n    globalThis: proxyGlobalThis,\n    global: proxyGlobal,\n    self: proxySelf,\n    __globals: __globalsStorage,\n  };\n\n  __globals.contextId = contextId;\n  __globals.contextType = contextType;\n  __globals.module = undefined;\n  __globals.amd = undefined;\n  __globals.define = undefined;\n  __globals.importScripts = (...args) => {\n    _log(\"importScripts\", args);\n  };\n\n  return __globals;\n}\n\n\nif (typeof window !== 'undefined') {\n    window.buildPolyfill = buildPolyfill;\n}\n"
			  let newMap = JSON.parse(JSON.stringify(EXTENSION_ASSETS_MAP));
			  delete newMap[OPTIONS_PAGE_PATH];
			  const PASS_ON = Object.fromEntries(
			    Object.entries({
			      LOCALE_KEYS,
			      INJECTED_MANIFEST,
			      USED_LOCALE,
			      EXTENSION_ICON,
			      CURRENT_LOCATION,
			      OPTIONS_PAGE_PATH,
			      CAN_USE_BLOB_CSP,
			      ALL_PERMISSIONS,
			      ORIGIN_PERMISSIONS,
			      EXTENSION_PERMISSIONS,
			      SCRIPT_NAME,
			      _base64ToBlob,
			      _getMimeTypeFromPath,
			      _isTextAsset,
			      _createAssetUrl,
			      _matchGlobPattern,
			      _isWebAccessibleResource,
			      _log,
			      _warn,
			      _error,
			    }).map((i) => {
			      let out = [...i];
			      if (typeof i[1] === "function") {
			        out[1] = i[1].toString();
			      } else {
			        out[1] = JSON.stringify(i[1]);
			      }
			      return out;
			    })
			  );
			  _log(PASS_ON);
			  return `
			    ${Object.entries(PASS_ON)
			      .map(
			        (i) =>
			          `const ${i[0]} = ${i[1]};\nwindow[${JSON.stringify(i[0])}] = ${i[0]}`
			      )
			      .join("\n")}
			
			        _log("Initialized polyfill", {${Object.keys(PASS_ON).join(", ")}})
			        ${polyfillString.replaceAll("{{EXTENSION_ASSETS_MAP}}", `JSON.parse(unescape(atob("${btoa(encodeURIComponent(JSON.stringify(EXTENSION_ASSETS_MAP)))}")))`)}
			
			        // Initialize the polyfill context for options page
			        const polyfillCtx = buildPolyfill({ isOtherPage: true });
			        const APPLY_TO = [window, self, globalThis];
			        for (const obj of APPLY_TO) {
			            obj.chrome = polyfillCtx.chrome;
			            obj.browser = polyfillCtx.browser;
			            obj.INJECTED_MANIFEST = ${JSON.stringify(INJECTED_MANIFEST)};
			        }
			    `;
			}
			
			async function main() {
			  _log(`Initializing...`, performance.now());
			
			  if (typeof _initStorage === "function") {
			    try {
			      _initStorage()
			        .then(() => {
			          _log(`Storage initialized.`);
			        })
			        .catch((e) => {
			          _error("Error during storage initialization:", e);
			        });
			    } catch (e) {
			      _error("Error during storage initialization:", e);
			    }
			  }
			
			  _log(`Starting content scripts...`);
			
			  const currentUrl = window.location.href;
			  let shouldRunAnyScript = false;
			  _log(`Checking URL: ${currentUrl}`);
			
			  if (
			    CONTENT_SCRIPT_CONFIGS_FOR_MATCHING &&
			    CONTENT_SCRIPT_CONFIGS_FOR_MATCHING.length > 0
			  ) {
			    for (const config of CONTENT_SCRIPT_CONFIGS_FOR_MATCHING) {
			      if (
			        config.matches &&
			        config.matches.some((pattern) => {
			          try {
			            const regex = convertMatchPatternToRegExp(pattern);
			            if (regex.test(currentUrl)) {
			              return true;
			            }
			            return false;
			          } catch (e) {
			            _error(`Error testing match pattern "${pattern}":`, e);
			            return false;
			          }
			        })
			      ) {
			        shouldRunAnyScript = true;
			        _log(`URL match found via config:`, config);
			        break;
			      }
			    }
			  } else {
			    _log(`No content script configurations found in manifest data.`);
			  }
			
			  if (shouldRunAnyScript) {
			    let polyfillContext;
			    try {
			      polyfillContext = buildPolyfill({ isBackground: false });
			    } catch (e) {
			      _error(`Failed to build polyfill:`, e);
			      return;
			    }
			
			    _log(`Polyfill built. Executing combined script logic...`);
			    // async function executeAllScripts({chrome, browser, global, window, globalThis, self, __globals}, extensionCssData) {
			    await executeAllScripts.call(
			      polyfillContext.globalThis,
			      polyfillContext,
			      extensionCssData
			    );
			  } else {
			    _log(
			      `No matching content script patterns for this URL. No scripts will be executed.`
			    );
			  }
			
			  if (OPTIONS_PAGE_PATH) {
			    if (typeof _registerMenuCommand === "function") {
			      try {
			        _registerMenuCommand("Open Options", openOptionsPage);
			        _log(`Options menu command registered.`);
			      } catch (e) {
			        _error("Failed to register menu command", e);
			      }
			    }
			  }
			
			  if (POPUP_PAGE_PATH) {
			    if (typeof _registerMenuCommand === "function") {
			      try {
			        _registerMenuCommand("Open Popup", openPopupPage);
			        _log(`Popup menu command registered.`);
			      } catch (e) {
			        _error("Failed to register popup menu command", e);
			      }
			    }
			  }
			
			  _log(`Initialization sequence complete.`);
			}
			
			main()//.catch((e) => _error(`Error during script initialization:`, e));
			
			try {
			  const fnKey = "OPEN_OPTIONS_PAGE_" + String(SCRIPT_NAME).replace(/\s+/g, "_");
			  window[fnKey] = openOptionsPage;
			} catch (e) {}
			
			try {
			  const fnKey = "OPEN_POPUP_PAGE_" + String(SCRIPT_NAME).replace(/\s+/g, "_");
			  window[fnKey] = openPopupPage;
			} catch (e) {}
			
			
			})();
  // #endregion
  // #endregion
    // #endregion