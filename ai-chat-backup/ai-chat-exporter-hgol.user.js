// ==UserScript==
// @name        AI Chat Exporter
// @version     0.2.0
// @description Export AI chat conversations to Markdown and sync to Obsidian
// @namespace   ai-chat-exporter
// @author      Converter Script
// @match       https://chatgpt.com/*
// @match       https://gemini.google.com/*
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
	
	  const SCRIPT_NAME = "AI Chat Exporter";
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
			  "popup/popup.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title data-i18n=\"popupTitle\">AI Chat Exporter</title>\n    <script type=\"module\" crossorigin src=\"data:text/javascript;base64,aW1wb3J0Ii4vbW9kdWxlcHJlbG9hZC1wb2x5ZmlsbC1CNVF0OUVNWC5qcyI7aW1wb3J0e2kgYXMgYSxiIGFzIHMsdCBhcyByLEUgYXMgaSxhIGFzIHB9ZnJvbSIuL2kxOG4tM2hkaDdWV24uanMiO2NvbnN0IGM9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImV4cG9ydEJ0biIpLG89ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInN0YXR1cyIpO3UoKS5jYXRjaCgoKT0+e30pO2FzeW5jIGZ1bmN0aW9uIHUoKXthd2FpdCBhKCkscygpfWMuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLGFzeW5jKCk9PntuKHIoInBvcHVwU3RhdHVzRXhwb3J0aW5nIiksImxvYWRpbmciKTt0cnl7Y29uc3QgdD1hd2FpdCBkKCksZT1hd2FpdCBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0LmlkLHt0eXBlOmkudHJpZ2dlckV4cG9ydCx0cmlnZ2VyOiJwb3B1cCIsc2VsZWN0aW9uOnttb2RlOiJwYWdlLXBpY2tlciJ9fSk7aWYoIShlIT1udWxsJiZlLm9rKSl0aHJvdyBuZXcgRXJyb3IoKGU9PW51bGw/dm9pZCAwOmUuZXJyb3IpfHxyKCJwb3B1cEVycm9yVW5rbm93biIpKTtpZihlLnN0YXJ0ZWRTZWxlY3Rpb24pe24ocigicG9wdXBTdGF0dXNTZWxlY3Rpb25TdGFydGVkIiksInN1Y2Nlc3MiKTtyZXR1cm59bihyKCJwb3B1cFN0YXR1c0V4cG9ydGVkIixbZS5wYXRoXSksInN1Y2Nlc3MiKX1jYXRjaCh0KXtuKHIoInBvcHVwU3RhdHVzRmFpbGVkIixbdC5tZXNzYWdlfHxTdHJpbmcodCldKSwiZXJyb3IiKX19KTthc3luYyBmdW5jdGlvbiBkKCl7Y29uc3RbdF09YXdhaXQgY2hyb21lLnRhYnMucXVlcnkoe2FjdGl2ZTohMCxjdXJyZW50V2luZG93OiEwfSk7aWYoISh0IT1udWxsJiZ0LmlkKXx8IUUodC51cmwpKXRocm93IG5ldyBFcnJvcihyKCJwb3B1cEVycm9yT3BlbkNoYXQiKSk7cmV0dXJuIHR9ZnVuY3Rpb24gbih0LGU9ImxvYWRpbmciKXtvLnRleHRDb250ZW50PXQsby5jbGFzc0xpc3QucmVtb3ZlKCJpcy1lbXB0eSIsImxvYWRpbmciLCJzdWNjZXNzIiwiZXJyb3IiKSxvLmNsYXNzTGlzdC5hZGQoZSl9ZnVuY3Rpb24gRSh0KXtyZXR1cm4gcC5zb21lKGU9PlN0cmluZyh0fHwiIikuc3RhcnRzV2l0aChlKSl9Cg==\"></script>\n    <link rel=\"modulepreload\" crossorigin href=\"data:text/javascript;base64,KGZ1bmN0aW9uKCl7Y29uc3QgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJsaW5rIikucmVsTGlzdDtpZih0JiZ0LnN1cHBvcnRzJiZ0LnN1cHBvcnRzKCJtb2R1bGVwcmVsb2FkIikpcmV0dXJuO2Zvcihjb25zdCBlIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpbmtbcmVsPSJtb2R1bGVwcmVsb2FkIl0nKSlpKGUpO25ldyBNdXRhdGlvbk9ic2VydmVyKGU9Pntmb3IoY29uc3QgciBvZiBlKWlmKHIudHlwZT09PSJjaGlsZExpc3QiKWZvcihjb25zdCBvIG9mIHIuYWRkZWROb2RlcylvLnRhZ05hbWU9PT0iTElOSyImJm8ucmVsPT09Im1vZHVsZXByZWxvYWQiJiZpKG8pfSkub2JzZXJ2ZShkb2N1bWVudCx7Y2hpbGRMaXN0OiEwLHN1YnRyZWU6ITB9KTtmdW5jdGlvbiBzKGUpe2NvbnN0IHI9e307cmV0dXJuIGUuaW50ZWdyaXR5JiYoci5pbnRlZ3JpdHk9ZS5pbnRlZ3JpdHkpLGUucmVmZXJyZXJQb2xpY3kmJihyLnJlZmVycmVyUG9saWN5PWUucmVmZXJyZXJQb2xpY3kpLGUuY3Jvc3NPcmlnaW49PT0idXNlLWNyZWRlbnRpYWxzIj9yLmNyZWRlbnRpYWxzPSJpbmNsdWRlIjplLmNyb3NzT3JpZ2luPT09ImFub255bW91cyI/ci5jcmVkZW50aWFscz0ib21pdCI6ci5jcmVkZW50aWFscz0ic2FtZS1vcmlnaW4iLHJ9ZnVuY3Rpb24gaShlKXtpZihlLmVwKXJldHVybjtlLmVwPSEwO2NvbnN0IHI9cyhlKTtmZXRjaChlLmhyZWYscil9fSkoKTsK\">\n    <link rel=\"modulepreload\" crossorigin href=\"data:text/javascript;base64,Y29uc3QgUz17c3ViZm9sZGVyVGVtcGxhdGU6IkFJIENoYXRzL3twbGF0Zm9ybX0vIixmaWxlbmFtZVRlbXBsYXRlOiJ7cGxhdGZvcm19LXt0aXRsZX0te2RhdGV0aW1lfSIsaW5jbHVkZUZyb250bWF0dGVyOiEwLGluY2x1ZGVUaW1lc3RhbXBzOiEwLGluY2x1ZGVVc2VyTWVzc2FnZXM6ITAsZW5hYmxlRmFiOiEwLGF1dG9IaWRlRmFiOiEwLHVpTGFuZ3VhZ2U6ImF1dG8iLGltYWdlUmVsYXRpdmVQYXRoOiJhc3NldHMvIn0sYz17c2V0dGluZ3M6InNldHRpbmdzIixmYWJQb3NpdGlvbjoiZmFiUG9zaXRpb24iLGludHJvU2hvd246ImludHJvU2hvd24ifSxtPXtuYW1lOiJhaS1jaGF0LWV4cG9ydGVyLWRiIix2ZXJzaW9uOjEsc3RvcmU6ImhhbmRsZXMiLGtleToib2JzaWRpYW5Sb290In0saD17dHJpZ2dlckV4cG9ydDoiQUNFX1RSSUdHRVJfRVhQT1JUIixwcmV2aWV3Q2hhdDoiQUNFX1BSRVZJRVdfQ0hBVCIscnVuRXhwb3J0OiJBQ0VfUlVOX0VYUE9SVCIsZXhwb3J0Q2hhdDoiQUNFX0VYUE9SVF9DSEFUIixleHBvcnRSZXN1bHQ6IkFDRV9FWFBPUlRfUkVTVUxUIixnZXRTZXR0aW5nczoiQUNFX0dFVF9TRVRUSU5HUyJ9LHg9WyJodHRwczovL2NoYXRncHQuY29tLyIsImh0dHBzOi8vZ2VtaW5pLmdvb2dsZS5jb20vIl0sdT17ZW46e3BvcHVwVGl0bGU6IkFJIENoYXQgRXhwb3J0ZXIiLHBvcHVwU3VidGl0bGU6IkV4cG9ydCBjdXJyZW50IGNvbnZlcnNhdGlvbiB0byB5b3VyIE9ic2lkaWFuIHZhdWx0LiIscG9wdXBFeHBvcnRUYXJnZXRMYWJlbDoiQ29udGVudCB0byBleHBvcnQiLHBvcHVwRXhwb3J0VGFyZ2V0SGludDoiTXVsdGktc2VsZWN0OiBDdHJsL0NtZCArIENsaWNrIixwb3B1cEV4cG9ydFRhcmdldExvYWRpbmc6IkxvYWRpbmcgY3VycmVudCBjaGF0IGNvbnRlbnQuLi4iLHBvcHVwRXhwb3J0VGFyZ2V0VW5hdmFpbGFibGU6IlVuYWJsZSB0byBsb2FkIGN1cnJlbnQgY2hhdCBjb250ZW50Iixwb3B1cEV4cG9ydFRhcmdldEFsbDoiQWxsIGV4cG9ydGFibGUgbWVzc2FnZXMiLHBvcHVwRXhwb3J0QnRuOiJFeHBvcnQgY3VycmVudCBjaGF0Iixwb3B1cE9wZW5PcHRpb25zOiJPcGVuIG9wdGlvbnMiLHBvcHVwU3RhdHVzRXhwb3J0aW5nOiJFeHBvcnRpbmcuLi4iLHBvcHVwU3RhdHVzU2VsZWN0aW9uU3RhcnRlZDoiU2VsZWN0aW9uIG1vZGUgc3RhcnRlZCBpbiBjdXJyZW50IGNoYXQgcGFnZSIscG9wdXBFcnJvck9wZW5DaGF0OiJQbGVhc2Ugb3BlbiBhIGNoYXQgcGFnZSBvbiBjaGF0Z3B0LmNvbSBvciBnZW1pbmkuZ29vZ2xlLmNvbSBmaXJzdCIscG9wdXBFcnJvclVua25vd246IlVua25vd24gZXhwb3J0IGVycm9yIixwb3B1cFN0YXR1c0V4cG9ydGVkOiJFeHBvcnRlZDogJDEiLHBvcHVwU3RhdHVzRmFpbGVkOiJGYWlsZWQ6ICQxIixvcHRpb25zVGl0bGU6IkFJIENoYXQgRXhwb3J0ZXIgU2V0dGluZ3MiLG9wdGlvbnNPYnNpZGlhbkZvbGRlcjoiT2JzaWRpYW4gRm9sZGVyIixvcHRpb25zUGlja0ZvbGRlcjoiQ2hvb3NlIE9ic2lkaWFuIGZvbGRlciIsb3B0aW9uc05vRm9sZGVyOiJObyBmb2xkZXIgc2VsZWN0ZWQiLG9wdGlvbnNBdXRob3JpemVkRGlyZWN0b3J5OiJhdXRob3JpemVkIGRpcmVjdG9yeSIsb3B0aW9uc1NlbGVjdGVkRm9sZGVyOiJTZWxlY3RlZDogJDEiLG9wdGlvbnNFeHBvcnRTZWN0aW9uOiJFeHBvcnQiLG9wdGlvbnNTdWJmb2xkZXJUZW1wbGF0ZToiU3ViZm9sZGVyIHRlbXBsYXRlIixvcHRpb25zRmlsZW5hbWVUZW1wbGF0ZToiRmlsZW5hbWUgdGVtcGxhdGUiLG9wdGlvbnNJbWFnZVJlbGF0aXZlUGF0aDoiSW1hZ2UgcmVsYXRpdmUgcGF0aCIsb3B0aW9uc0luY2x1ZGVGcm9udG1hdHRlcjoiSW5jbHVkZSBZQU1MIGZyb250bWF0dGVyIixvcHRpb25zSW5jbHVkZVRpbWVzdGFtcHM6IkluY2x1ZGUgdGltZXN0YW1wcyIsb3B0aW9uc0luY2x1ZGVVc2VyTWVzc2FnZXM6IkluY2x1ZGUgeW91ciBvd24gbWVzc2FnZXMiLG9wdGlvbnNFbmFibGVGYWI6IkVuYWJsZSBmbG9hdGluZyBleHBvcnQgYnV0dG9uIixvcHRpb25zQXV0b0hpZGVGYWI6IkF1dG8taGlkZSBGQUIgd2hlbiBkb2NrZWQgdG8gc2NyZWVuIGVkZ2UiLG9wdGlvbnNVaUxhbmd1YWdlOiJMYW5ndWFnZSIsb3B0aW9uc0xhbmdBdXRvOiJBdXRvIChCcm93c2VyKSIsb3B0aW9uc0xhbmdaaENOOiJDaGluZXNlIChTaW1wbGlmaWVkKSIsb3B0aW9uc0xhbmdFbjoiRW5nbGlzaCIsb3B0aW9uc1ZhcmlhYmxlc0hpbnQ6IlZhcmlhYmxlczoge3BsYXRmb3JtfSwge3RpdGxlfSwge2RhdGV9LCB7dGltZX0sIHtkYXRldGltZX0sIHttb2RlbH0iLG9wdGlvbnNTYXZlQnRuOiJTYXZlIHNldHRpbmdzIixvcHRpb25zSW5pdEZhaWxlZDoiSW5pdCBmYWlsZWQ6ICQxIixvcHRpb25zRm9sZGVyQXV0aG9yaXplZDoiRm9sZGVyIGF1dGhvcml6ZWQiLG9wdGlvbnNGb2xkZXJTZWxlY3Rpb25GYWlsZWQ6IkZvbGRlciBzZWxlY3Rpb24gZmFpbGVkOiAkMSIsb3B0aW9uc1NldHRpbmdzU2F2ZWQ6IlNldHRpbmdzIHNhdmVkIixjb250ZW50SW50cm86IkFJIENoYXQgRXhwb3J0ZXIgZW5hYmxlZDogY2xpY2sgdG8gZXhwb3J0LCBkcmFnIHRvIG1vdmUuIixjb250ZW50U2VsZWN0Rm9yRXhwb3J0OiJTZWxlY3QgdGhpcyBtZXNzYWdlIGZvciBleHBvcnQiLGNvbnRlbnRQaWNrZXJNb2RlU3RhcnRlZDoiU2VsZWN0aW9uIG1vZGUgZW5hYmxlZC4gQ2hvb3NlIG1lc3NhZ2VzIG9uIHBhZ2UsIHRoZW4gZXhwb3J0LiIsY29udGVudFBpY2tlclNlbGVjdGVkQ291bnQ6IlNlbGVjdGVkOiAkMSIsY29udGVudFBpY2tlck5lZWRTZWxlY3Rpb246IlBsZWFzZSBzZWxlY3QgYXQgbGVhc3Qgb25lIG1lc3NhZ2UiLGNvbnRlbnRQaWNrZXJFeHBvcnRTZWxlY3RlZDoiRXhwb3J0IFNlbGVjdGVkIixjb250ZW50UGlja2VyRXhwb3J0QWxsOiJFeHBvcnQgQWxsIixjb250ZW50UGlja2VyQ2FuY2VsOiJDYW5jZWwiLGNvbnRlbnROb01lc3NhZ2VzOiJObyBleHBvcnRhYmxlIG1lc3NhZ2VzIGZvdW5kIG9uIGN1cnJlbnQgcGFnZSIsY29udGVudEV4cG9ydGluZzoiRXhwb3J0aW5nLi4uIixjb250ZW50RXhwb3J0T2s6IkV4cG9ydGVkOiAkMSIsY29udGVudEV4cG9ydE9rV2l0aFdhcm5pbmdzOiJFeHBvcnRlZCB3aXRoIHBhcnRpYWwgaW1hZ2UgZmFpbHVyZXM6ICQxIixjb250ZW50RXhwb3J0RmFpbGVkOiJFeHBvcnQgZmFpbGVkOiAkMSIsZmFiVGl0bGU6IkNsaWNrOiBleHBvcnQuIERyYWc6IG1vdmUgcG9zaXRpb24uIixiZ05lZWRGb2xkZXI6IlBsZWFzZSBjaG9vc2UgYW4gT2JzaWRpYW4gZm9sZGVyIGluIE9wdGlvbnMgZmlyc3QiLGJnUGVybWlzc2lvbkRlbmllZDoiV3JpdGUgcGVybWlzc2lvbiB0byBPYnNpZGlhbiBmb2xkZXIgd2FzIGRlbmllZCIsYmdJbWFnZUNvcnNXYXJuaW5nOiJJbWFnZSBibG9ja2VkIGJ5IENPUlMvaG9zdCBwb2xpY3kifSx6aF9DTjp7cG9wdXBUaXRsZToiQUkg5a+56K+d5a+85Ye65ZmoIixwb3B1cFN1YnRpdGxlOiLlsIblvZPliY3lr7nor53lv6vpgJ/lr7zlh7rliLDkvaDnmoQgT2JzaWRpYW4g5LuT5bqT44CCIixwb3B1cEV4cG9ydFRhcmdldExhYmVsOiLlr7zlh7rlhoXlrrkiLHBvcHVwRXhwb3J0VGFyZ2V0SGludDoi5aSa6YCJ77ya5oyJ5L2PIEN0cmwvQ21kIOeCueWHuyIscG9wdXBFeHBvcnRUYXJnZXRMb2FkaW5nOiLmraPlnKjliqDovb3lvZPliY3lr7nor53lhoXlrrkuLi4iLHBvcHVwRXhwb3J0VGFyZ2V0VW5hdmFpbGFibGU6IuaXoOazleWKoOi9veW9k+WJjeWvueivneWGheWuuSIscG9wdXBFeHBvcnRUYXJnZXRBbGw6IuWvvOWHuuWFqOmDqOWPr+WvvOWHuua2iOaBryIscG9wdXBFeHBvcnRCdG46IuWvvOWHuuW9k+WJjeWvueivnSIscG9wdXBPcGVuT3B0aW9uczoi5omT5byA6K6+572uIixwb3B1cFN0YXR1c0V4cG9ydGluZzoi5q2j5Zyo5a+85Ye6Li4uIixwb3B1cFN0YXR1c1NlbGVjdGlvblN0YXJ0ZWQ6IuW3suWcqOW9k+WJjemhtemdouW8gOWQr+mAieaLqeaooeW8jyIscG9wdXBFcnJvck9wZW5DaGF0OiLor7flhYjmiZPlvIAgY2hhdGdwdC5jb20g5oiWIGdlbWluaS5nb29nbGUuY29tIOeahOWvueivnemhtemdoiIscG9wdXBFcnJvclVua25vd246IuacquefpeWvvOWHuumUmeivryIscG9wdXBTdGF0dXNFeHBvcnRlZDoi5bey5a+85Ye6OiAkMSIscG9wdXBTdGF0dXNGYWlsZWQ6IuWksei0pTogJDEiLG9wdGlvbnNUaXRsZToiQUkg5a+56K+d5a+85Ye65Zmo6K6+572uIixvcHRpb25zT2JzaWRpYW5Gb2xkZXI6Ik9ic2lkaWFuIOaWh+S7tuWkuSIsb3B0aW9uc1BpY2tGb2xkZXI6IumAieaLqSBPYnNpZGlhbiDmlofku7blpLkiLG9wdGlvbnNOb0ZvbGRlcjoi5bCa5pyq6YCJ5oup5paH5Lu25aS5IixvcHRpb25zQXV0aG9yaXplZERpcmVjdG9yeToi5bey5o6I5p2D55uu5b2VIixvcHRpb25zU2VsZWN0ZWRGb2xkZXI6IuW3sumAieaLqTogJDEiLG9wdGlvbnNFeHBvcnRTZWN0aW9uOiLlr7zlh7oiLG9wdGlvbnNTdWJmb2xkZXJUZW1wbGF0ZToi5a2Q55uu5b2V5qih5p2/IixvcHRpb25zRmlsZW5hbWVUZW1wbGF0ZToi5paH5Lu25ZCN5qih5p2/IixvcHRpb25zSW1hZ2VSZWxhdGl2ZVBhdGg6IuWbvueJh+ebuOWvuei3r+W+hCIsb3B0aW9uc0luY2x1ZGVGcm9udG1hdHRlcjoi5YyF5ZCrIFlBTUwgZnJvbnRtYXR0ZXIiLG9wdGlvbnNJbmNsdWRlVGltZXN0YW1wczoi5YyF5ZCr5pe26Ze05oizIixvcHRpb25zSW5jbHVkZVVzZXJNZXNzYWdlczoi5YyF5ZCr5L2g6Ieq5bex5Y+R6YCB55qE5raI5oGvIixvcHRpb25zRW5hYmxlRmFiOiLlkK/nlKjmgqzmta7lr7zlh7rmjInpkq4iLG9wdGlvbnNBdXRvSGlkZUZhYjoi6LS06L655pe26Ieq5Yqo6ZqQ6JeP5oKs5rWu5oyJ6ZKuIixvcHRpb25zVWlMYW5ndWFnZToi55WM6Z2i6K+t6KiAIixvcHRpb25zTGFuZ0F1dG86IuiHquWKqO+8iOi3n+maj+a1j+iniOWZqO+8iSIsb3B0aW9uc0xhbmdaaENOOiLnroDkvZPkuK3mlociLG9wdGlvbnNMYW5nRW46IkVuZ2xpc2giLG9wdGlvbnNWYXJpYWJsZXNIaW50OiLlj5jph486IHtwbGF0Zm9ybX0sIHt0aXRsZX0sIHtkYXRlfSwge3RpbWV9LCB7ZGF0ZXRpbWV9LCB7bW9kZWx9IixvcHRpb25zU2F2ZUJ0bjoi5L+d5a2Y6K6+572uIixvcHRpb25zSW5pdEZhaWxlZDoi5Yid5aeL5YyW5aSx6LSlOiAkMSIsb3B0aW9uc0ZvbGRlckF1dGhvcml6ZWQ6IuaWh+S7tuWkueW3suaOiOadgyIsb3B0aW9uc0ZvbGRlclNlbGVjdGlvbkZhaWxlZDoi6YCJ5oup5paH5Lu25aS55aSx6LSlOiAkMSIsb3B0aW9uc1NldHRpbmdzU2F2ZWQ6Iuiuvue9ruW3suS/neWtmCIsY29udGVudEludHJvOiJBSSDlr7nor53lr7zlh7rlmajlt7LlkK/nlKjvvJrngrnlh7vlr7zlh7rvvIzmi5bmi73np7vliqjkvY3nva7jgIIiLGNvbnRlbnRTZWxlY3RGb3JFeHBvcnQ6IumAieaLqei/meadoea2iOaBr+eUqOS6juWvvOWHuiIsY29udGVudFBpY2tlck1vZGVTdGFydGVkOiLlt7LlvIDlkK/pgInmi6nmqKHlvI/vvIzor7flnKjpobXpnaLli77pgInmtojmga/lkI7lr7zlh7rjgIIiLGNvbnRlbnRQaWNrZXJTZWxlY3RlZENvdW50OiLlt7LpgInmi6k6ICQxIixjb250ZW50UGlja2VyTmVlZFNlbGVjdGlvbjoi6K+36Iez5bCR6YCJ5oup5LiA5p2h5raI5oGvIixjb250ZW50UGlja2VyRXhwb3J0U2VsZWN0ZWQ6IuWvvOWHuuaJgOmAiSIsY29udGVudFBpY2tlckV4cG9ydEFsbDoi5a+85Ye65YWo6YOoIixjb250ZW50UGlja2VyQ2FuY2VsOiLlj5bmtogiLGNvbnRlbnROb01lc3NhZ2VzOiLlvZPliY3pobXpnaLmnKrmib7liLDlj6/lr7zlh7rnmoTmtojmga8iLGNvbnRlbnRFeHBvcnRpbmc6Iuato+WcqOWvvOWHui4uLiIsY29udGVudEV4cG9ydE9rOiLlr7zlh7rmiJDlip86ICQxIixjb250ZW50RXhwb3J0T2tXaXRoV2FybmluZ3M6IuWvvOWHuuaIkOWKn++8iOmDqOWIhuWbvueJh+Wksei0pe+8iTogJDEiLGNvbnRlbnRFeHBvcnRGYWlsZWQ6IuWvvOWHuuWksei0pTogJDEiLGZhYlRpdGxlOiLngrnlh7vlr7zlh7rvvIzmi5bmi73np7vliqjkvY3nva4iLGJnTmVlZEZvbGRlcjoi6K+35YWI5Zyo6K6+572u6aG16Z2i6YCJ5oupIE9ic2lkaWFuIOaWh+S7tuWkuSIsYmdQZXJtaXNzaW9uRGVuaWVkOiJPYnNpZGlhbiDnm67lvZXlhpnlhaXmjojmnYPooqvmi5Lnu50iLGJnSW1hZ2VDb3JzV2FybmluZzoi5Zu+54mH5ZugIENPUlMv5Z+f5ZCN5p2D6ZmQ6ZmQ5Yi25peg5rOV5LiL6L29In19O2xldCBwPSJhdXRvIjtmdW5jdGlvbiBnKCl7dmFyIGUsbyxuO2lmKHAmJnAhPT0iYXV0byIpcmV0dXJuIHA7bGV0IHQ9ImVuIjt0cnl7dD0oKG49KG89KGU9Z2xvYmFsVGhpcy5jaHJvbWUpPT1udWxsP3ZvaWQgMDplLmkxOG4pPT1udWxsP3ZvaWQgMDpvLmdldFVJTGFuZ3VhZ2UpPT1udWxsP3ZvaWQgMDpuLmNhbGwobykpfHwiZW4ifWNhdGNoe3Q9ImVuIn1yZXR1cm4gU3RyaW5nKHQpLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgiemgiKT8iemhfQ04iOiJlbiJ9ZnVuY3Rpb24gRSh0LGUpe2lmKGU9PW51bGwpcmV0dXJuIHQ7Y29uc3Qgbz1BcnJheS5pc0FycmF5KGUpP2U6W2VdO3JldHVybiBvLmxlbmd0aD9vLnJlZHVjZSgobixpLHIpPT5uLnJlcGxhY2VBbGwoYCQke3IrMX1gLFN0cmluZyhpKSksdCk6dH1hc3luYyBmdW5jdGlvbiBiKCl7dmFyIHQsZSxvO3RyeXtjb25zdCBuPShlPSh0PWdsb2JhbFRoaXMuY2hyb21lKT09bnVsbD92b2lkIDA6dC5zdG9yYWdlKT09bnVsbD92b2lkIDA6ZS5sb2NhbDtpZighKG4hPW51bGwmJm4uZ2V0KSl7cD0iYXV0byI7cmV0dXJufWNvbnN0IGk9bi5nZXQoYy5zZXR0aW5ncykscj10eXBlb2YoaT09bnVsbD92b2lkIDA6aS50aGVuKT09ImZ1bmN0aW9uIj9hd2FpdCBpOmF3YWl0IG5ldyBQcm9taXNlKHM9PntuLmdldChjLnNldHRpbmdzLGw9PnMobCkpfSksYT0obz1yPT1udWxsP3ZvaWQgMDpyW2Muc2V0dGluZ3NdKT09bnVsbD92b2lkIDA6by51aUxhbmd1YWdlO2EmJihwPWEpfWNhdGNoe3A9ImF1dG8ifX1mdW5jdGlvbiBkKHQsZSl7dmFyIGkscixhLHM7Y29uc3Qgbz1nKCksbj0oaT11W29dKT09bnVsbD92b2lkIDA6aVt0XTtpZihuKXJldHVybiBFKG4sZSk7dHJ5e2NvbnN0IGw9KHM9KGE9KHI9Z2xvYmFsVGhpcy5jaHJvbWUpPT1udWxsP3ZvaWQgMDpyLmkxOG4pPT1udWxsP3ZvaWQgMDphLmdldE1lc3NhZ2UpPT1udWxsP3ZvaWQgMDpzLmNhbGwoYSx0LGUpO2lmKGwpcmV0dXJuIGx9Y2F0Y2h7fXJldHVybiB0fWZ1bmN0aW9uIGYodD1kb2N1bWVudCl7dCE9bnVsbCYmdC5xdWVyeVNlbGVjdG9yQWxsJiYodC5xdWVyeVNlbGVjdG9yQWxsKCJbZGF0YS1pMThuXSIpLmZvckVhY2goZT0+e2NvbnN0IG89ZS5nZXRBdHRyaWJ1dGUoImRhdGEtaTE4biIpO28mJihlLnRleHRDb250ZW50PWQobykpfSksdC5xdWVyeVNlbGVjdG9yQWxsKCJbZGF0YS1pMThuLXRpdGxlXSIpLmZvckVhY2goZT0+e2NvbnN0IG89ZS5nZXRBdHRyaWJ1dGUoImRhdGEtaTE4bi10aXRsZSIpO28mJmUuc2V0QXR0cmlidXRlKCJ0aXRsZSIsZChvKSl9KSl9ZXhwb3J0e1MgYXMgRCxoIGFzIEUsYyBhcyBTLHggYXMgYSxmIGFzIGIsbSBhcyBjLGIgYXMgaSxkIGFzIHR9Owo=\">\n    <link rel=\"stylesheet\" crossorigin href=\"data:text/css;base64,Ym9keXttYXJnaW46MDt3aWR0aDozNDBweDtmb250LWZhbWlseTpBdmVuaXIgTmV4dCxTZWdvZSBVSSxzYW5zLXNlcmlmO2JhY2tncm91bmQ6cmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCAxMiUgMTglLHJnYmEoNTYsMTg5LDI0OCwuMjIpLHRyYW5zcGFyZW50IDM2JSkscmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCA4OCUgOCUscmdiYSg5OSwxMDIsMjQxLC4yMiksdHJhbnNwYXJlbnQgMzQlKSxsaW5lYXItZ3JhZGllbnQoMTQ1ZGVnLCMwNDA4MGYsIzBiMTIyMCA1MiUsIzBmMTcyYSk7Y29sb3I6I2U1ZWRmOH0ucG9wdXB7bWFyZ2luOjEwcHg7cGFkZGluZzoxNHB4O2JvcmRlci1yYWRpdXM6MTRweDtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxNjBkZWcsIzBmMTcyYWI4LCMwZjE3MmE4Zik7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDE0OCwxNjMsMTg0LC4yNCk7Ym94LXNoYWRvdzppbnNldCAwIDFweCAjZmZmZmZmMTQsMCAxOHB4IDQwcHggIzAyMDYxNzk0Oy13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOmJsdXIoMTBweCkgc2F0dXJhdGUoMTIwJSk7YmFja2Ryb3AtZmlsdGVyOmJsdXIoMTBweCkgc2F0dXJhdGUoMTIwJSk7ZGlzcGxheTpncmlkO2dhcDoxMnB4fS5oZWFke2Rpc3BsYXk6Z3JpZDtnYXA6NHB4fWgxe2ZvbnQtc2l6ZToxNnB4O21hcmdpbjowO2xldHRlci1zcGFjaW5nOi4zcHg7bGluZS1oZWlnaHQ6MS4yO2NvbG9yOiNmOGZiZmZ9LnN1YnttYXJnaW46MDtmb250LXNpemU6MTJweDtsaW5lLWhlaWdodDoxLjQ7Y29sb3I6IzlmYjBjOH0ucHJpbWFyeXt3aWR0aDoxMDAlO2JvcmRlcjowO2JvcmRlci1yYWRpdXM6MTBweDtwYWRkaW5nOjExcHggMTJweDtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcsIzM4YmRmODQyLCM2MzY2ZjE1NyksbGluZWFyLWdyYWRpZW50KDEzNWRlZywjMWUyOTNiLCMzMTJlODEpO2NvbG9yOiNmOGZiZmY7Y3Vyc29yOnBvaW50ZXI7Zm9udC13ZWlnaHQ6NzAwO2JvcmRlcjoxcHggc29saWQgcmdiYSgxMjUsMjExLDI1MiwuMzUpO3RyYW5zaXRpb246dHJhbnNmb3JtIC4xNXMgZWFzZSxib3gtc2hhZG93IC4xNXMgZWFzZSxmaWx0ZXIgLjE1cyBlYXNlLGJvcmRlci1jb2xvciAuMTVzIGVhc2V9LnByaW1hcnk6aG92ZXJ7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTFweCk7Ym94LXNoYWRvdzowIDEycHggMjZweCAjMzhiZGY4M2Q7ZmlsdGVyOnNhdHVyYXRlKDEuMTIpO2JvcmRlci1jb2xvcjojN2RkM2ZjOTl9LnN0YXR1c3ttYXJnaW46MDttaW4taGVpZ2h0OjE4cHg7Ym9yZGVyLXJhZGl1czo4cHg7Zm9udC1zaXplOjEycHg7bGluZS1oZWlnaHQ6MS4zNTtjb2xvcjojZDllNmY3O2JhY2tncm91bmQ6IzBmMTcyYWEzO3BhZGRpbmc6OHB4IDEwcHg7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDE0OCwxNjMsMTg0LC4yMil9LnN0YXR1cy5pcy1lbXB0eXtkaXNwbGF5Om5vbmV9LnN0YXR1cy5sb2FkaW5ne2JhY2tncm91bmQ6IzBlNzQ5MDQyO2NvbG9yOiNhNWYzZmM7Ym9yZGVyLWNvbG9yOiM3ZGQzZmM1OX0uc3RhdHVzLnN1Y2Nlc3N7YmFja2dyb3VuZDojMDU5NjY5Mzg7Y29sb3I6I2E3ZjNkMDtib3JkZXItY29sb3I6IzM0ZDM5OTU5fS5zdGF0dXMuZXJyb3J7YmFja2dyb3VuZDojOTkxYjFiNDc7Y29sb3I6I2ZlY2FjYTtib3JkZXItY29sb3I6I2Y4NzE3MTU5fS5zZWNvbmRhcnktbGlua3tmb250LXNpemU6MTJweDtmb250LXdlaWdodDo2MDA7Y29sb3I6IzkzYzVmZDt0ZXh0LWRlY29yYXRpb246bm9uZTtqdXN0aWZ5LXNlbGY6c3RhcnR9LnNlY29uZGFyeS1saW5rOmhvdmVye2NvbG9yOiNiZmRiZmU7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX0K\">\n  </head>\n  <body>\n    <main class=\"popup\">\n      <header class=\"head\">\n        <h1 data-i18n=\"popupTitle\">AI Chat Exporter</h1>\n        <p class=\"sub\" data-i18n=\"popupSubtitle\">Export current conversation to your Obsidian vault.</p>\n      </header>\n\n      <button id=\"exportBtn\" class=\"primary\" data-i18n=\"popupExportBtn\">Export current chat</button>\n\n      <p id=\"status\" class=\"status is-empty\" aria-live=\"polite\"></p>\n\n      <a\n        id=\"openOptionsLink\"\n        class=\"secondary-link\"\n        href=\"data:text/html;base64,PCFkb2N0eXBlIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KICA8aGVhZD4KICAgIDxtZXRhIGNoYXJzZXQ9IlVURi04IiAvPgogICAgPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiIC8+CiAgICA8dGl0bGUgZGF0YS1pMThuPSJvcHRpb25zVGl0bGUiPkFJIENoYXQgRXhwb3J0ZXIgLSBPcHRpb25zPC90aXRsZT4KICAgIDxzY3JpcHQgdHlwZT0ibW9kdWxlIiBjcm9zc29yaWdpbiBzcmM9ImRhdGE6dGV4dC9qYXZhc2NyaXB0O2Jhc2U2NCxhVzF3YjNKMElpNHZiVzlrZFd4bGNISmxiRzloWkMxd2IyeDVabWxzYkMxQ05WRjBPVVZOV0M1cWN5STdhVzF3YjNKMGUzUWdZWE1nWVN4cElHRnpJR01zWWlCaGN5QjFMRVFnWVhNZ2JuMW1jbTl0SWk0dmFURTRiaTB6YUdSb04xWlhiaTVxY3lJN2FXMXdiM0owZTJjZ1lYTWdiQ3hpSUdGeklHMHNZeUJoY3lCekxHUWdZWE1nY24xbWNtOXRJaTR2YzNSdmNtRm5aUzFEUjNoMFlsQTNRUzVxY3lJN1kyOXVjM1FnWnoxa2IyTjFiV1Z1ZEM1blpYUkZiR1Z0Wlc1MFFubEpaQ2dpY0dsamEwWnZiR1JsY2tKMGJpSXBMR1E5Wkc5amRXMWxiblF1WjJWMFJXeGxiV1Z1ZEVKNVNXUW9JbVp2YkdSbGNsTjBZWFIxY3lJcExIQTlaRzlqZFcxbGJuUXVaMlYwUld4bGJXVnVkRUo1U1dRb0luTmhkbVZDZEc0aUtTeHZQV1J2WTNWdFpXNTBMbWRsZEVWc1pXMWxiblJDZVVsa0tDSnpZWFpsVTNSaGRIVnpJaWtzZEQxN2MzVmlabTlzWkdWeVZHVnRjR3hoZEdVNlpHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRFSjVTV1FvSW5OMVltWnZiR1JsY2xSbGJYQnNZWFJsSWlrc1ptbHNaVzVoYldWVVpXMXdiR0YwWlRwa2IyTjFiV1Z1ZEM1blpYUkZiR1Z0Wlc1MFFubEpaQ2dpWm1sc1pXNWhiV1ZVWlcxd2JHRjBaU0lwTEdsdFlXZGxVbVZzWVhScGRtVlFZWFJvT21SdlkzVnRaVzUwTG1kbGRFVnNaVzFsYm5SQ2VVbGtLQ0pwYldGblpWSmxiR0YwYVhabFVHRjBhQ0lwTEhWcFRHRnVaM1ZoWjJVNlpHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRFSjVTV1FvSW5WcFRHRnVaM1ZoWjJVaUtTeHBibU5zZFdSbFJuSnZiblJ0WVhSMFpYSTZaRzlqZFcxbGJuUXVaMlYwUld4bGJXVnVkRUo1U1dRb0ltbHVZMngxWkdWR2NtOXVkRzFoZEhSbGNpSXBMR2x1WTJ4MVpHVlVhVzFsYzNSaGJYQnpPbVJ2WTNWdFpXNTBMbWRsZEVWc1pXMWxiblJDZVVsa0tDSnBibU5zZFdSbFZHbHRaWE4wWVcxd2N5SXBMR2x1WTJ4MVpHVlZjMlZ5VFdWemMyRm5aWE02Wkc5amRXMWxiblF1WjJWMFJXeGxiV1Z1ZEVKNVNXUW9JbWx1WTJ4MVpHVlZjMlZ5VFdWemMyRm5aWE1pS1N4bGJtRmliR1ZHWVdJNlpHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRFSjVTV1FvSW1WdVlXSnNaVVpoWWlJcExHRjFkRzlJYVdSbFJtRmlPbVJ2WTNWdFpXNTBMbWRsZEVWc1pXMWxiblJDZVVsa0tDSmhkWFJ2U0dsa1pVWmhZaUlwZlR0aUtDa3VZMkYwWTJnb1pUMCtlMjh1ZEdWNGRFTnZiblJsYm5ROVlTZ2liM0IwYVc5dWMwbHVhWFJHWVdsc1pXUWlMRnRsTG0xbGMzTmhaMlY4ZkZOMGNtbHVaeWhsS1YwcGZTazdZWE41Ym1NZ1puVnVZM1JwYjI0Z1lpZ3BlMkYzWVdsMElHTW9LU3gxS0Nrc1lYZGhhWFFnUmlncGZXRnplVzVqSUdaMWJtTjBhVzl1SUVZb0tYdGpiMjV6ZENCbFBXRjNZV2wwSUd3b0tUdDJLR1VwTzJOdmJuTjBJR2s5WVhkaGFYUWdiU2dwTzJRdWRHVjRkRU52Ym5SbGJuUTlhVDloS0NKdmNIUnBiMjV6VTJWc1pXTjBaV1JHYjJ4a1pYSWlMRnRwTG01aGJXVjhmR0VvSW05d2RHbHZibk5CZFhSb2IzSnBlbVZrUkdseVpXTjBiM0o1SWlsZEtUcGhLQ0p2Y0hScGIyNXpUbTlHYjJ4a1pYSWlLWDFuTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSW1Oc2FXTnJJaXhoYzNsdVl5Z3BQVDU3ZEhKNWUyTnZibk4wSUdVOVlYZGhhWFFnZDJsdVpHOTNMbk5vYjNkRWFYSmxZM1J2Y25sUWFXTnJaWElvZTIxdlpHVTZJbkpsWVdSM2NtbDBaU0o5S1R0aGQyRnBkQ0J6S0dVcExHUXVkR1Y0ZEVOdmJuUmxiblE5WVNnaWIzQjBhVzl1YzFObGJHVmpkR1ZrUm05c1pHVnlJaXhiWlM1dVlXMWxYU2tzYnk1MFpYaDBRMjl1ZEdWdWREMWhLQ0p2Y0hScGIyNXpSbTlzWkdWeVFYVjBhRzl5YVhwbFpDSXBmV05oZEdOb0tHVXBlMmxtS0NobFBUMXVkV3hzUDNadmFXUWdNRHBsTG01aGJXVXBQVDA5SWtGaWIzSjBSWEp5YjNJaUtYSmxkSFZ5Ymp0dkxuUmxlSFJEYjI1MFpXNTBQV0VvSW05d2RHbHZibk5HYjJ4a1pYSlRaV3hsWTNScGIyNUdZV2xzWldRaUxGdGxMbTFsYzNOaFoyVjhmRk4wY21sdVp5aGxLVjBwZlgwcE8zQXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ2lZMnhwWTJzaUxHRnplVzVqS0NrOVBudGpiMjV6ZENCbFBTaGhkMkZwZENCc0tDa3BMblZwVEdGdVozVmhaMlY4Zkc0dWRXbE1ZVzVuZFdGblpTeHBQWHR6ZFdKbWIyeGtaWEpVWlcxd2JHRjBaVHAwTG5OMVltWnZiR1JsY2xSbGJYQnNZWFJsTG5aaGJIVmxmSHh1TG5OMVltWnZiR1JsY2xSbGJYQnNZWFJsTEdacGJHVnVZVzFsVkdWdGNHeGhkR1U2ZEM1bWFXeGxibUZ0WlZSbGJYQnNZWFJsTG5aaGJIVmxmSHh1TG1acGJHVnVZVzFsVkdWdGNHeGhkR1VzYVcxaFoyVlNaV3hoZEdsMlpWQmhkR2c2ZEM1cGJXRm5aVkpsYkdGMGFYWmxVR0YwYUM1MllXeDFaWHg4Ymk1cGJXRm5aVkpsYkdGMGFYWmxVR0YwYUN4MWFVeGhibWQxWVdkbE9uUXVkV2xNWVc1bmRXRm5aUzUyWVd4MVpYeDhiaTUxYVV4aGJtZDFZV2RsTEdsdVkyeDFaR1ZHY205dWRHMWhkSFJsY2pwMExtbHVZMngxWkdWR2NtOXVkRzFoZEhSbGNpNWphR1ZqYTJWa0xHbHVZMngxWkdWVWFXMWxjM1JoYlhCek9uUXVhVzVqYkhWa1pWUnBiV1Z6ZEdGdGNITXVZMmhsWTJ0bFpDeHBibU5zZFdSbFZYTmxjazFsYzNOaFoyVnpPblF1YVc1amJIVmtaVlZ6WlhKTlpYTnpZV2RsY3k1amFHVmphMlZrTEdWdVlXSnNaVVpoWWpwMExtVnVZV0pzWlVaaFlpNWphR1ZqYTJWa0xHRjFkRzlJYVdSbFJtRmlPblF1WVhWMGIwaHBaR1ZHWVdJdVkyaGxZMnRsWkgwN1lYZGhhWFFnY2locEtTeHZMblJsZUhSRGIyNTBaVzUwUFdFb0ltOXdkR2x2Ym5OVFpYUjBhVzVuYzFOaGRtVmtJaWtzYVM1MWFVeGhibWQxWVdkbElUMDlaU1ltZDJsdVpHOTNMbk5sZEZScGJXVnZkWFFvS0NrOVBuZHBibVJ2ZHk1c2IyTmhkR2x2Ymk1eVpXeHZZV1FvS1N3eE1qQXBmU2s3Wm5WdVkzUnBiMjRnZGlobEtYdDBMbk4xWW1admJHUmxjbFJsYlhCc1lYUmxMblpoYkhWbFBXVXVjM1ZpWm05c1pHVnlWR1Z0Y0d4aGRHVXNkQzVtYVd4bGJtRnRaVlJsYlhCc1lYUmxMblpoYkhWbFBXVXVabWxzWlc1aGJXVlVaVzF3YkdGMFpTeDBMbWx0WVdkbFVtVnNZWFJwZG1WUVlYUm9MblpoYkhWbFBXVXVhVzFoWjJWU1pXeGhkR2wyWlZCaGRHZ3NkQzUxYVV4aGJtZDFZV2RsTG5aaGJIVmxQV1V1ZFdsTVlXNW5kV0ZuWlh4OGJpNTFhVXhoYm1kMVlXZGxMSFF1YVc1amJIVmtaVVp5YjI1MGJXRjBkR1Z5TG1Ob1pXTnJaV1E5WlM1cGJtTnNkV1JsUm5KdmJuUnRZWFIwWlhJc2RDNXBibU5zZFdSbFZHbHRaWE4wWVcxd2N5NWphR1ZqYTJWa1BXVXVhVzVqYkhWa1pWUnBiV1Z6ZEdGdGNITXNkQzVwYm1Oc2RXUmxWWE5sY2sxbGMzTmhaMlZ6TG1Ob1pXTnJaV1E5WlM1cGJtTnNkV1JsVlhObGNrMWxjM05oWjJWekxIUXVaVzVoWW14bFJtRmlMbU5vWldOclpXUTlaUzVsYm1GaWJHVkdZV0lzZEM1aGRYUnZTR2xrWlVaaFlpNWphR1ZqYTJWa1BXVXVZWFYwYjBocFpHVkdZV0o5Q2c9PSI+PC9zY3JpcHQ+CiAgICA8bGluayByZWw9Im1vZHVsZXByZWxvYWQiIGNyb3Nzb3JpZ2luIGhyZWY9ImRhdGE6dGV4dC9qYXZhc2NyaXB0O2Jhc2U2NCxLR1oxYm1OMGFXOXVLQ2w3WTI5dWMzUWdkRDFrYjJOMWJXVnVkQzVqY21WaGRHVkZiR1Z0Wlc1MEtDSnNhVzVySWlrdWNtVnNUR2x6ZER0cFppaDBKaVowTG5OMWNIQnZjblJ6SmlaMExuTjFjSEJ2Y25SektDSnRiMlIxYkdWd2NtVnNiMkZrSWlrcGNtVjBkWEp1TzJadmNpaGpiMjV6ZENCbElHOW1JR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNKQmJHd29KMnhwYm10YmNtVnNQU0p0YjJSMWJHVndjbVZzYjJGa0lsMG5LU2xwS0dVcE8yNWxkeUJOZFhSaGRHbHZiazlpYzJWeWRtVnlLR1U5UG50bWIzSW9ZMjl1YzNRZ2NpQnZaaUJsS1dsbUtISXVkSGx3WlQwOVBTSmphR2xzWkV4cGMzUWlLV1p2Y2loamIyNXpkQ0J2SUc5bUlISXVZV1JrWldST2IyUmxjeWx2TG5SaFowNWhiV1U5UFQwaVRFbE9TeUltSm04dWNtVnNQVDA5SW0xdlpIVnNaWEJ5Wld4dllXUWlKaVpwS0c4cGZTa3ViMkp6WlhKMlpTaGtiMk4xYldWdWRDeDdZMmhwYkdSTWFYTjBPaUV3TEhOMVluUnlaV1U2SVRCOUtUdG1kVzVqZEdsdmJpQnpLR1VwZTJOdmJuTjBJSEk5ZTMwN2NtVjBkWEp1SUdVdWFXNTBaV2R5YVhSNUppWW9jaTVwYm5SbFozSnBkSGs5WlM1cGJuUmxaM0pwZEhrcExHVXVjbVZtWlhKeVpYSlFiMnhwWTNrbUppaHlMbkpsWm1WeWNtVnlVRzlzYVdONVBXVXVjbVZtWlhKeVpYSlFiMnhwWTNrcExHVXVZM0p2YzNOUGNtbG5hVzQ5UFQwaWRYTmxMV055WldSbGJuUnBZV3h6SWo5eUxtTnlaV1JsYm5ScFlXeHpQU0pwYm1Oc2RXUmxJanBsTG1OeWIzTnpUM0pwWjJsdVBUMDlJbUZ1YjI1NWJXOTFjeUkvY2k1amNtVmtaVzUwYVdGc2N6MGliMjFwZENJNmNpNWpjbVZrWlc1MGFXRnNjejBpYzJGdFpTMXZjbWxuYVc0aUxISjlablZ1WTNScGIyNGdhU2hsS1h0cFppaGxMbVZ3S1hKbGRIVnlianRsTG1Wd1BTRXdPMk52Ym5OMElISTljeWhsS1R0bVpYUmphQ2hsTG1oeVpXWXNjaWw5ZlNrb0tUc0siPgogICAgPGxpbmsgcmVsPSJtb2R1bGVwcmVsb2FkIiBjcm9zc29yaWdpbiBocmVmPSJkYXRhOnRleHQvamF2YXNjcmlwdDtiYXNlNjQsWTI5dWMzUWdVejE3YzNWaVptOXNaR1Z5VkdWdGNHeGhkR1U2SWtGSklFTm9ZWFJ6TDN0d2JHRjBabTl5YlgwdklpeG1hV3hsYm1GdFpWUmxiWEJzWVhSbE9pSjdjR3hoZEdadmNtMTlMWHQwYVhSc1pYMHRlMlJoZEdWMGFXMWxmU0lzYVc1amJIVmtaVVp5YjI1MGJXRjBkR1Z5T2lFd0xHbHVZMngxWkdWVWFXMWxjM1JoYlhCek9pRXdMR2x1WTJ4MVpHVlZjMlZ5VFdWemMyRm5aWE02SVRBc1pXNWhZbXhsUm1GaU9pRXdMR0YxZEc5SWFXUmxSbUZpT2lFd0xIVnBUR0Z1WjNWaFoyVTZJbUYxZEc4aUxHbHRZV2RsVW1Wc1lYUnBkbVZRWVhSb09pSmhjM05sZEhNdkluMHNZejE3YzJWMGRHbHVaM002SW5ObGRIUnBibWR6SWl4bVlXSlFiM05wZEdsdmJqb2labUZpVUc5emFYUnBiMjRpTEdsdWRISnZVMmh2ZDI0NkltbHVkSEp2VTJodmQyNGlmU3h0UFh0dVlXMWxPaUpoYVMxamFHRjBMV1Y0Y0c5eWRHVnlMV1JpSWl4MlpYSnphVzl1T2pFc2MzUnZjbVU2SW1oaGJtUnNaWE1pTEd0bGVUb2liMkp6YVdScFlXNVNiMjkwSW4wc2FEMTdkSEpwWjJkbGNrVjRjRzl5ZERvaVFVTkZYMVJTU1VkSFJWSmZSVmhRVDFKVUlpeHdjbVYyYVdWM1EyaGhkRG9pUVVORlgxQlNSVlpKUlZkZlEwaEJWQ0lzY25WdVJYaHdiM0owT2lKQlEwVmZVbFZPWDBWWVVFOVNWQ0lzWlhod2IzSjBRMmhoZERvaVFVTkZYMFZZVUU5U1ZGOURTRUZVSWl4bGVIQnZjblJTWlhOMWJIUTZJa0ZEUlY5RldGQlBVbFJmVWtWVFZVeFVJaXhuWlhSVFpYUjBhVzVuY3pvaVFVTkZYMGRGVkY5VFJWUlVTVTVIVXlKOUxIZzlXeUpvZEhSd2N6b3ZMMk5vWVhSbmNIUXVZMjl0THlJc0ltaDBkSEJ6T2k4dloyVnRhVzVwTG1kdmIyZHNaUzVqYjIwdklsMHNkVDE3Wlc0NmUzQnZjSFZ3VkdsMGJHVTZJa0ZKSUVOb1lYUWdSWGh3YjNKMFpYSWlMSEJ2Y0hWd1UzVmlkR2wwYkdVNklrVjRjRzl5ZENCamRYSnlaVzUwSUdOdmJuWmxjbk5oZEdsdmJpQjBieUI1YjNWeUlFOWljMmxrYVdGdUlIWmhkV3gwTGlJc2NHOXdkWEJGZUhCdmNuUlVZWEpuWlhSTVlXSmxiRG9pUTI5dWRHVnVkQ0IwYnlCbGVIQnZjblFpTEhCdmNIVndSWGh3YjNKMFZHRnlaMlYwU0dsdWREb2lUWFZzZEdrdGMyVnNaV04wT2lCRGRISnNMME50WkNBcklFTnNhV05ySWl4d2IzQjFjRVY0Y0c5eWRGUmhjbWRsZEV4dllXUnBibWM2SWt4dllXUnBibWNnWTNWeWNtVnVkQ0JqYUdGMElHTnZiblJsYm5RdUxpNGlMSEJ2Y0hWd1JYaHdiM0owVkdGeVoyVjBWVzVoZG1GcGJHRmliR1U2SWxWdVlXSnNaU0IwYnlCc2IyRmtJR04xY25KbGJuUWdZMmhoZENCamIyNTBaVzUwSWl4d2IzQjFjRVY0Y0c5eWRGUmhjbWRsZEVGc2JEb2lRV3hzSUdWNGNHOXlkR0ZpYkdVZ2JXVnpjMkZuWlhNaUxIQnZjSFZ3Ulhod2IzSjBRblJ1T2lKRmVIQnZjblFnWTNWeWNtVnVkQ0JqYUdGMElpeHdiM0IxY0U5d1pXNVBjSFJwYjI1ek9pSlBjR1Z1SUc5d2RHbHZibk1pTEhCdmNIVndVM1JoZEhWelJYaHdiM0owYVc1bk9pSkZlSEJ2Y25ScGJtY3VMaTRpTEhCdmNIVndVM1JoZEhWelUyVnNaV04wYVc5dVUzUmhjblJsWkRvaVUyVnNaV04wYVc5dUlHMXZaR1VnYzNSaGNuUmxaQ0JwYmlCamRYSnlaVzUwSUdOb1lYUWdjR0ZuWlNJc2NHOXdkWEJGY25KdmNrOXdaVzVEYUdGME9pSlFiR1ZoYzJVZ2IzQmxiaUJoSUdOb1lYUWdjR0ZuWlNCdmJpQmphR0YwWjNCMExtTnZiU0J2Y2lCblpXMXBibWt1WjI5dloyeGxMbU52YlNCbWFYSnpkQ0lzY0c5d2RYQkZjbkp2Y2xWdWEyNXZkMjQ2SWxWdWEyNXZkMjRnWlhod2IzSjBJR1Z5Y205eUlpeHdiM0IxY0ZOMFlYUjFjMFY0Y0c5eWRHVmtPaUpGZUhCdmNuUmxaRG9nSkRFaUxIQnZjSFZ3VTNSaGRIVnpSbUZwYkdWa09pSkdZV2xzWldRNklDUXhJaXh2Y0hScGIyNXpWR2wwYkdVNklrRkpJRU5vWVhRZ1JYaHdiM0owWlhJZ1UyVjBkR2x1WjNNaUxHOXdkR2x2Ym5OUFluTnBaR2xoYmtadmJHUmxjam9pVDJKemFXUnBZVzRnUm05c1pHVnlJaXh2Y0hScGIyNXpVR2xqYTBadmJHUmxjam9pUTJodmIzTmxJRTlpYzJsa2FXRnVJR1p2YkdSbGNpSXNiM0IwYVc5dWMwNXZSbTlzWkdWeU9pSk9ieUJtYjJ4a1pYSWdjMlZzWldOMFpXUWlMRzl3ZEdsdmJuTkJkWFJvYjNKcGVtVmtSR2x5WldOMGIzSjVPaUpoZFhSb2IzSnBlbVZrSUdScGNtVmpkRzl5ZVNJc2IzQjBhVzl1YzFObGJHVmpkR1ZrUm05c1pHVnlPaUpUWld4bFkzUmxaRG9nSkRFaUxHOXdkR2x2Ym5ORmVIQnZjblJUWldOMGFXOXVPaUpGZUhCdmNuUWlMRzl3ZEdsdmJuTlRkV0ptYjJ4a1pYSlVaVzF3YkdGMFpUb2lVM1ZpWm05c1pHVnlJSFJsYlhCc1lYUmxJaXh2Y0hScGIyNXpSbWxzWlc1aGJXVlVaVzF3YkdGMFpUb2lSbWxzWlc1aGJXVWdkR1Z0Y0d4aGRHVWlMRzl3ZEdsdmJuTkpiV0ZuWlZKbGJHRjBhWFpsVUdGMGFEb2lTVzFoWjJVZ2NtVnNZWFJwZG1VZ2NHRjBhQ0lzYjNCMGFXOXVjMGx1WTJ4MVpHVkdjbTl1ZEcxaGRIUmxjam9pU1c1amJIVmtaU0JaUVUxTUlHWnliMjUwYldGMGRHVnlJaXh2Y0hScGIyNXpTVzVqYkhWa1pWUnBiV1Z6ZEdGdGNITTZJa2x1WTJ4MVpHVWdkR2x0WlhOMFlXMXdjeUlzYjNCMGFXOXVjMGx1WTJ4MVpHVlZjMlZ5VFdWemMyRm5aWE02SWtsdVkyeDFaR1VnZVc5MWNpQnZkMjRnYldWemMyRm5aWE1pTEc5d2RHbHZibk5GYm1GaWJHVkdZV0k2SWtWdVlXSnNaU0JtYkc5aGRHbHVaeUJsZUhCdmNuUWdZblYwZEc5dUlpeHZjSFJwYjI1elFYVjBiMGhwWkdWR1lXSTZJa0YxZEc4dGFHbGtaU0JHUVVJZ2QyaGxiaUJrYjJOclpXUWdkRzhnYzJOeVpXVnVJR1ZrWjJVaUxHOXdkR2x2Ym5OVmFVeGhibWQxWVdkbE9pSk1ZVzVuZFdGblpTSXNiM0IwYVc5dWMweGhibWRCZFhSdk9pSkJkWFJ2SUNoQ2NtOTNjMlZ5S1NJc2IzQjBhVzl1YzB4aGJtZGFhRU5PT2lKRGFHbHVaWE5sSUNoVGFXMXdiR2xtYVdWa0tTSXNiM0IwYVc5dWMweGhibWRGYmpvaVJXNW5iR2x6YUNJc2IzQjBhVzl1YzFaaGNtbGhZbXhsYzBocGJuUTZJbFpoY21saFlteGxjem9nZTNCc1lYUm1iM0p0ZlN3Z2UzUnBkR3hsZlN3Z2UyUmhkR1Y5TENCN2RHbHRaWDBzSUh0a1lYUmxkR2x0Wlgwc0lIdHRiMlJsYkgwaUxHOXdkR2x2Ym5OVFlYWmxRblJ1T2lKVFlYWmxJSE5sZEhScGJtZHpJaXh2Y0hScGIyNXpTVzVwZEVaaGFXeGxaRG9pU1c1cGRDQm1ZV2xzWldRNklDUXhJaXh2Y0hScGIyNXpSbTlzWkdWeVFYVjBhRzl5YVhwbFpEb2lSbTlzWkdWeUlHRjFkR2h2Y21sNlpXUWlMRzl3ZEdsdmJuTkdiMnhrWlhKVFpXeGxZM1JwYjI1R1lXbHNaV1E2SWtadmJHUmxjaUJ6Wld4bFkzUnBiMjRnWm1GcGJHVmtPaUFrTVNJc2IzQjBhVzl1YzFObGRIUnBibWR6VTJGMlpXUTZJbE5sZEhScGJtZHpJSE5oZG1Wa0lpeGpiMjUwWlc1MFNXNTBjbTg2SWtGSklFTm9ZWFFnUlhod2IzSjBaWElnWlc1aFlteGxaRG9nWTJ4cFkyc2dkRzhnWlhod2IzSjBMQ0JrY21GbklIUnZJRzF2ZG1VdUlpeGpiMjUwWlc1MFUyVnNaV04wUm05eVJYaHdiM0owT2lKVFpXeGxZM1FnZEdocGN5QnRaWE56WVdkbElHWnZjaUJsZUhCdmNuUWlMR052Ym5SbGJuUlFhV05yWlhKTmIyUmxVM1JoY25SbFpEb2lVMlZzWldOMGFXOXVJRzF2WkdVZ1pXNWhZbXhsWkM0Z1EyaHZiM05sSUcxbGMzTmhaMlZ6SUc5dUlIQmhaMlVzSUhSb1pXNGdaWGh3YjNKMExpSXNZMjl1ZEdWdWRGQnBZMnRsY2xObGJHVmpkR1ZrUTI5MWJuUTZJbE5sYkdWamRHVmtPaUFrTVNJc1kyOXVkR1Z1ZEZCcFkydGxjazVsWldSVFpXeGxZM1JwYjI0NklsQnNaV0Z6WlNCelpXeGxZM1FnWVhRZ2JHVmhjM1FnYjI1bElHMWxjM05oWjJVaUxHTnZiblJsYm5SUWFXTnJaWEpGZUhCdmNuUlRaV3hsWTNSbFpEb2lSWGh3YjNKMElGTmxiR1ZqZEdWa0lpeGpiMjUwWlc1MFVHbGphMlZ5Ulhod2IzSjBRV3hzT2lKRmVIQnZjblFnUVd4c0lpeGpiMjUwWlc1MFVHbGphMlZ5UTJGdVkyVnNPaUpEWVc1alpXd2lMR052Ym5SbGJuUk9iMDFsYzNOaFoyVnpPaUpPYnlCbGVIQnZjblJoWW14bElHMWxjM05oWjJWeklHWnZkVzVrSUc5dUlHTjFjbkpsYm5RZ2NHRm5aU0lzWTI5dWRHVnVkRVY0Y0c5eWRHbHVaem9pUlhod2IzSjBhVzVuTGk0dUlpeGpiMjUwWlc1MFJYaHdiM0owVDJzNklrVjRjRzl5ZEdWa09pQWtNU0lzWTI5dWRHVnVkRVY0Y0c5eWRFOXJWMmwwYUZkaGNtNXBibWR6T2lKRmVIQnZjblJsWkNCM2FYUm9JSEJoY25ScFlXd2dhVzFoWjJVZ1ptRnBiSFZ5WlhNNklDUXhJaXhqYjI1MFpXNTBSWGh3YjNKMFJtRnBiR1ZrT2lKRmVIQnZjblFnWm1GcGJHVmtPaUFrTVNJc1ptRmlWR2wwYkdVNklrTnNhV05yT2lCbGVIQnZjblF1SUVSeVlXYzZJRzF2ZG1VZ2NHOXphWFJwYjI0dUlpeGlaMDVsWldSR2IyeGtaWEk2SWxCc1pXRnpaU0JqYUc5dmMyVWdZVzRnVDJKemFXUnBZVzRnWm05c1pHVnlJR2x1SUU5d2RHbHZibk1nWm1seWMzUWlMR0puVUdWeWJXbHpjMmx2YmtSbGJtbGxaRG9pVjNKcGRHVWdjR1Z5YldsemMybHZiaUIwYnlCUFluTnBaR2xoYmlCbWIyeGtaWElnZDJGeklHUmxibWxsWkNJc1ltZEpiV0ZuWlVOdmNuTlhZWEp1YVc1bk9pSkpiV0ZuWlNCaWJHOWphMlZrSUdKNUlFTlBVbE12YUc5emRDQndiMnhwWTNraWZTeDZhRjlEVGpwN2NHOXdkWEJVYVhSc1pUb2lRVWtnNWErNTZLK2Q1YSs4NVllNjVabW9JaXh3YjNCMWNGTjFZblJwZEd4bE9pTGxzSWJsdlpQbGlZM2xyN25vcjUzbHY2dnBnSi9scjd6bGg3cmxpTERrdmFEbm1vUWdUMkp6YVdScFlXNGc1THVUNWJxVDQ0Q0NJaXh3YjNCMWNFVjRjRzl5ZEZSaGNtZGxkRXhoWW1Wc09pTGxyN3psaDdybGhvWGxycmtpTEhCdmNIVndSWGh3YjNKMFZHRnlaMlYwU0dsdWREb2k1YVNhNllDSjc3eWE1b3lKNUwyUElFTjBjbXd2UTIxa0lPZUN1ZVdIdXlJc2NHOXdkWEJGZUhCdmNuUlVZWEpuWlhSTWIyRmthVzVuT2lMbXJhUGxuS2psaXFEb3ZiM2x2WlBsaVkzbHI3bm9yNTNsaG9YbHJya3VMaTRpTEhCdmNIVndSWGh3YjNKMFZHRnlaMlYwVlc1aGRtRnBiR0ZpYkdVNkl1YVhvT2F6bGVXS29PaTl2ZVc5aytXSmplV3Z1ZWl2bmVXR2hlV3V1U0lzY0c5d2RYQkZlSEJ2Y25SVVlYSm5aWFJCYkd3Nkl1V3Z2T1dIdXVXRnFPbURxT1dQcitXdnZPV0h1dWEyaU9hQnJ5SXNjRzl3ZFhCRmVIQnZjblJDZEc0Nkl1V3Z2T1dIdXVXOWsrV0pqZVd2dWVpdm5TSXNjRzl3ZFhCUGNHVnVUM0IwYVc5dWN6b2k1b21UNWJ5QTZLNis1NzJ1SWl4d2IzQjFjRk4wWVhSMWMwVjRjRzl5ZEdsdVp6b2k1cTJqNVp5bzVhKzg1WWU2TGk0dUlpeHdiM0IxY0ZOMFlYUjFjMU5sYkdWamRHbHZibE4wWVhKMFpXUTZJdVczc3VXY3FPVzlrK1dKamVtaHRlbWRvdVc4Z09XUXIrbUFpZWFMcWVhb29lVzhqeUlzY0c5d2RYQkZjbkp2Y2s5d1pXNURhR0YwT2lMb3I3ZmxoWWptaVpQbHZJQWdZMmhoZEdkd2RDNWpiMjBnNW9pV0lHZGxiV2x1YVM1bmIyOW5iR1V1WTI5dElPZWFoT1d2dWVpdm5lbWh0ZW1kb2lJc2NHOXdkWEJGY25KdmNsVnVhMjV2ZDI0Nkl1YWNxdWVmcGVXdnZPV0h1dW1VbWVpdnJ5SXNjRzl3ZFhCVGRHRjBkWE5GZUhCdmNuUmxaRG9pNWJleTVhKzg1WWU2T2lBa01TSXNjRzl3ZFhCVGRHRjBkWE5HWVdsc1pXUTZJdVdrc2VpMHBUb2dKREVpTEc5d2RHbHZibk5VYVhSc1pUb2lRVWtnNWErNTZLK2Q1YSs4NVllNjVabW82SzYrNTcydUlpeHZjSFJwYjI1elQySnphV1JwWVc1R2IyeGtaWEk2SWs5aWMybGthV0Z1SU9hV2grUzd0dVdrdVNJc2IzQjBhVzl1YzFCcFkydEdiMnhrWlhJNkl1bUFpZWFMcVNCUFluTnBaR2xoYmlEbWxvZmt1N2JscExraUxHOXdkR2x2Ym5OT2IwWnZiR1JsY2pvaTViQ2E1cHlxNllDSjVvdXA1cGFINUx1MjVhUzVJaXh2Y0hScGIyNXpRWFYwYUc5eWFYcGxaRVJwY21WamRHOXllVG9pNWJleTVvNkk1cDJENTV1dTViMlZJaXh2Y0hScGIyNXpVMlZzWldOMFpXUkdiMnhrWlhJNkl1VzNzdW1BaWVhTHFUb2dKREVpTEc5d2RHbHZibk5GZUhCdmNuUlRaV04wYVc5dU9pTGxyN3psaDdvaUxHOXdkR2x2Ym5OVGRXSm1iMnhrWlhKVVpXMXdiR0YwWlRvaTVhMlE1NXV1NWIyVjVxaWg1cDIvSWl4dmNIUnBiMjV6Um1sc1pXNWhiV1ZVWlcxd2JHRjBaVG9pNXBhSDVMdTI1WkNONXFpaDVwMi9JaXh2Y0hScGIyNXpTVzFoWjJWU1pXeGhkR2wyWlZCaGRHZzZJdVdidnVlSmgrZWJ1T1d2dWVpM3IrVytoQ0lzYjNCMGFXOXVjMGx1WTJ4MVpHVkdjbTl1ZEcxaGRIUmxjam9pNVl5RjVaQ3JJRmxCVFV3Z1puSnZiblJ0WVhSMFpYSWlMRzl3ZEdsdmJuTkpibU5zZFdSbFZHbHRaWE4wWVcxd2N6b2k1WXlGNVpDcjVwZTI2WmUwNW9peklpeHZjSFJwYjI1elNXNWpiSFZrWlZWelpYSk5aWE56WVdkbGN6b2k1WXlGNVpDcjVMMmc2SWVxNWJleDVZK1I2WUNCNTVxRTVyYUk1b0d2SWl4dmNIUnBiMjV6Ulc1aFlteGxSbUZpT2lMbGtLL25sS2ptZ3F6bXRhN2xyN3psaDdybWpJbnBrcTRpTEc5d2RHbHZibk5CZFhSdlNHbGtaVVpoWWpvaTZMUzA2TDY1NXBlMjZJZXE1WXFvNlpxUTZKZVA1b0tzNXJXdTVveUo2Wkt1SWl4dmNIUnBiMjV6VldsTVlXNW5kV0ZuWlRvaTU1V002WjJpNksrdDZLaUFJaXh2Y0hScGIyNXpUR0Z1WjBGMWRHODZJdWlIcXVXS3FPKzhpT2kzbittYWorYTFqK2luaU9XWnFPKzhpU0lzYjNCMGFXOXVjMHhoYm1kYWFFTk9PaUxucm9Ea3ZaUGt1SzNtbG9jaUxHOXdkR2x2Ym5OTVlXNW5SVzQ2SWtWdVoyeHBjMmdpTEc5d2RHbHZibk5XWVhKcFlXSnNaWE5JYVc1ME9pTGxqNWpwaDQ4NklIdHdiR0YwWm05eWJYMHNJSHQwYVhSc1pYMHNJSHRrWVhSbGZTd2dlM1JwYldWOUxDQjdaR0YwWlhScGJXVjlMQ0I3Ylc5a1pXeDlJaXh2Y0hScGIyNXpVMkYyWlVKMGJqb2k1TCtkNWEyWTZLNis1NzJ1SWl4dmNIUnBiMjV6U1c1cGRFWmhhV3hsWkRvaTVZaWQ1YWVMNVl5VzVhU3g2TFNsT2lBa01TSXNiM0IwYVc5dWMwWnZiR1JsY2tGMWRHaHZjbWw2WldRNkl1YVdoK1M3dHVXa3VlVzNzdWFPaU9hZGd5SXNiM0IwYVc5dWMwWnZiR1JsY2xObGJHVmpkR2x2YmtaaGFXeGxaRG9pNllDSjVvdXA1cGFINUx1MjVhUzU1YVN4NkxTbE9pQWtNU0lzYjNCMGFXOXVjMU5sZEhScGJtZHpVMkYyWldRNkl1aXV2dWU5cnVXM3N1Uy9uZVd0bUNJc1kyOXVkR1Z1ZEVsdWRISnZPaUpCU1NEbHI3bm9yNTNscjd6bGg3cmxtYWpsdDdMbGtLL25sS2p2dkpybmdybmxoN3Zscjd6bGg3cnZ2SXptaTVibWk3M25wN3ZsaXFqa3ZZM252YTdqZ0lJaUxHTnZiblJsYm5SVFpXeGxZM1JHYjNKRmVIQnZjblE2SXVtQWllYUxxZWkvbWVhZG9lYTJpT2FCcitlVXFPUzZqdVd2dk9XSHVpSXNZMjl1ZEdWdWRGQnBZMnRsY2sxdlpHVlRkR0Z5ZEdWa09pTGx0N0xsdklEbGtLL3BnSW5taTZubXFLSGx2SS92dkl6b3I3ZmxuS2pwb2JYcG5hTGxpNzdwZ0lubXRvam1nYS9sa0k3bHI3emxoN3JqZ0lJaUxHTnZiblJsYm5SUWFXTnJaWEpUWld4bFkzUmxaRU52ZFc1ME9pTGx0N0xwZ0lubWk2azZJQ1F4SWl4amIyNTBaVzUwVUdsamEyVnlUbVZsWkZObGJHVmpkR2x2YmpvaTZLKzM2SWV6NWJDUjZZQ0o1b3VwNUxpQTVwMmg1cmFJNW9HdklpeGpiMjUwWlc1MFVHbGphMlZ5Ulhod2IzSjBVMlZzWldOMFpXUTZJdVd2dk9XSHV1YUpnT21BaVNJc1kyOXVkR1Z1ZEZCcFkydGxja1Y0Y0c5eWRFRnNiRG9pNWErODVZZTY1WVdvNllPb0lpeGpiMjUwWlc1MFVHbGphMlZ5UTJGdVkyVnNPaUxsajVibXRvZ2lMR052Ym5SbGJuUk9iMDFsYzNOaFoyVnpPaUxsdlpQbGlZM3BvYlhwbmFMbW5Lcm1pYjdsaUxEbGo2L2xyN3psaDdybm1vVG10b2ptZ2E4aUxHTnZiblJsYm5SRmVIQnZjblJwYm1jNkl1YXRvK1djcU9XdnZPV0h1aTR1TGlJc1kyOXVkR1Z1ZEVWNGNHOXlkRTlyT2lMbHI3emxoN3JtaUpEbGlwODZJQ1F4SWl4amIyNTBaVzUwUlhod2IzSjBUMnRYYVhSb1YyRnlibWx1WjNNNkl1V3Z2T1dIdXVhSWtPV0tuKys4aU9tRHFPV0lodVdidnVlSmgrV2tzZWkwcGUrOGlUb2dKREVpTEdOdmJuUmxiblJGZUhCdmNuUkdZV2xzWldRNkl1V3Z2T1dIdXVXa3NlaTBwVG9nSkRFaUxHWmhZbFJwZEd4bE9pTG5ncm5saDd2bHI3emxoN3J2dkl6bWk1Ym1pNzNucDd2bGlxamt2WTNudmE0aUxHSm5UbVZsWkVadmJHUmxjam9pNksrMzVZV0k1WnlvNks2KzU3MnU2YUcxNloyaTZZQ0o1b3VwSUU5aWMybGthV0Z1SU9hV2grUzd0dVdrdVNJc1ltZFFaWEp0YVhOemFXOXVSR1Z1YVdWa09pSlBZbk5wWkdsaGJpRG5tNjdsdlpYbGhwbmxoYVhtam9qbW5ZUG9vcXZtaTVMbnU1MGlMR0puU1cxaFoyVkRiM0p6VjJGeWJtbHVaem9pNVp1KzU0bUg1WnVnSUVOUFVsTXY1WitmNVpDTjVwMkQ2Wm1RNlptUTVZaTI1cGVnNXJPVjVMaUw2TDI5SW4xOU8yeGxkQ0J3UFNKaGRYUnZJanRtZFc1amRHbHZiaUJuS0NsN2RtRnlJR1VzYnl4dU8ybG1LSEFtSm5BaFBUMGlZWFYwYnlJcGNtVjBkWEp1SUhBN2JHVjBJSFE5SW1WdUlqdDBjbmw3ZEQwb0tHNDlLRzg5S0dVOVoyeHZZbUZzVkdocGN5NWphSEp2YldVcFBUMXVkV3hzUDNadmFXUWdNRHBsTG1reE9HNHBQVDF1ZFd4c1AzWnZhV1FnTURwdkxtZGxkRlZKVEdGdVozVmhaMlVwUFQxdWRXeHNQM1p2YVdRZ01EcHVMbU5oYkd3b2J5a3BmSHdpWlc0aWZXTmhkR05vZTNROUltVnVJbjF5WlhSMWNtNGdVM1J5YVc1bktIUXBMblJ2VEc5M1pYSkRZWE5sS0NrdWMzUmhjblJ6VjJsMGFDZ2llbWdpS1Q4aWVtaGZRMDRpT2lKbGJpSjlablZ1WTNScGIyNGdSU2gwTEdVcGUybG1LR1U5UFc1MWJHd3BjbVYwZFhKdUlIUTdZMjl1YzNRZ2J6MUJjbkpoZVM1cGMwRnljbUY1S0dVcFAyVTZXMlZkTzNKbGRIVnliaUJ2TG14bGJtZDBhRDl2TG5KbFpIVmpaU2dvYml4cExISXBQVDV1TG5KbGNHeGhZMlZCYkd3b1lDUWtlM0lyTVgxZ0xGTjBjbWx1WnlocEtTa3NkQ2s2ZEgxaGMzbHVZeUJtZFc1amRHbHZiaUJpS0NsN2RtRnlJSFFzWlN4dk8zUnllWHRqYjI1emRDQnVQU2hsUFNoMFBXZHNiMkpoYkZSb2FYTXVZMmh5YjIxbEtUMDliblZzYkQ5MmIybGtJREE2ZEM1emRHOXlZV2RsS1QwOWJuVnNiRDkyYjJsa0lEQTZaUzVzYjJOaGJEdHBaaWdoS0c0aFBXNTFiR3dtSm00dVoyVjBLU2w3Y0QwaVlYVjBieUk3Y21WMGRYSnVmV052Ym5OMElHazliaTVuWlhRb1l5NXpaWFIwYVc1bmN5a3NjajEwZVhCbGIyWW9hVDA5Ym5Wc2JEOTJiMmxrSURBNmFTNTBhR1Z1S1QwOUltWjFibU4wYVc5dUlqOWhkMkZwZENCcE9tRjNZV2wwSUc1bGR5QlFjbTl0YVhObEtITTlQbnR1TG1kbGRDaGpMbk5sZEhScGJtZHpMR3c5UG5Nb2JDa3BmU2tzWVQwb2J6MXlQVDF1ZFd4c1AzWnZhV1FnTURweVcyTXVjMlYwZEdsdVozTmRLVDA5Ym5Wc2JEOTJiMmxrSURBNmJ5NTFhVXhoYm1kMVlXZGxPMkVtSmlod1BXRXBmV05oZEdOb2UzQTlJbUYxZEc4aWZYMW1kVzVqZEdsdmJpQmtLSFFzWlNsN2RtRnlJR2tzY2l4aExITTdZMjl1YzNRZ2J6MW5LQ2tzYmowb2FUMTFXMjlkS1QwOWJuVnNiRDkyYjJsa0lEQTZhVnQwWFR0cFppaHVLWEpsZEhWeWJpQkZLRzRzWlNrN2RISjVlMk52Ym5OMElHdzlLSE05S0dFOUtISTlaMnh2WW1Gc1ZHaHBjeTVqYUhKdmJXVXBQVDF1ZFd4c1AzWnZhV1FnTURweUxta3hPRzRwUFQxdWRXeHNQM1p2YVdRZ01EcGhMbWRsZEUxbGMzTmhaMlVwUFQxdWRXeHNQM1p2YVdRZ01EcHpMbU5oYkd3b1lTeDBMR1VwTzJsbUtHd3BjbVYwZFhKdUlHeDlZMkYwWTJoN2ZYSmxkSFZ5YmlCMGZXWjFibU4wYVc5dUlHWW9kRDFrYjJOMWJXVnVkQ2w3ZENFOWJuVnNiQ1ltZEM1eGRXVnllVk5sYkdWamRHOXlRV3hzSmlZb2RDNXhkV1Z5ZVZObGJHVmpkRzl5UVd4c0tDSmJaR0YwWVMxcE1UaHVYU0lwTG1admNrVmhZMmdvWlQwK2UyTnZibk4wSUc4OVpTNW5aWFJCZEhSeWFXSjFkR1VvSW1SaGRHRXRhVEU0YmlJcE8yOG1KaWhsTG5SbGVIUkRiMjUwWlc1MFBXUW9ieWtwZlNrc2RDNXhkV1Z5ZVZObGJHVmpkRzl5UVd4c0tDSmJaR0YwWVMxcE1UaHVMWFJwZEd4bFhTSXBMbVp2Y2tWaFkyZ29aVDArZTJOdmJuTjBJRzg5WlM1blpYUkJkSFJ5YVdKMWRHVW9JbVJoZEdFdGFURTRiaTEwYVhSc1pTSXBPMjhtSm1VdWMyVjBRWFIwY21saWRYUmxLQ0owYVhSc1pTSXNaQ2h2S1NsOUtTbDlaWGh3YjNKMGUxTWdZWE1nUkN4b0lHRnpJRVVzWXlCaGN5QlRMSGdnWVhNZ1lTeG1JR0Z6SUdJc2JTQmhjeUJqTEdJZ1lYTWdhU3hrSUdGeklIUjlPd289Ij4KICAgIDxsaW5rIHJlbD0ibW9kdWxlcHJlbG9hZCIgY3Jvc3NvcmlnaW4gaHJlZj0iZGF0YTp0ZXh0L2phdmFzY3JpcHQ7YmFzZTY0LGFXMXdiM0owZTBRZ1lYTWdZeXhUSUdGeklITXNZeUJoY3lCdmZXWnliMjBpTGk5cE1UaHVMVE5vWkdnM1ZsZHVMbXB6SWp0bWRXNWpkR2x2YmlCMUtHVXBlM0psZEhWeWJpQlRkSEpwYm1jb0tHVTlQVzUxYkd3L2RtOXBaQ0F3T21VdWJXVnpjMkZuWlNsOGZHVjhmQ0lpS1M1cGJtTnNkV1JsY3lnaVJYaDBaVzV6YVc5dUlHTnZiblJsZUhRZ2FXNTJZV3hwWkdGMFpXUWlLWDFoYzNsdVl5Qm1kVzVqZEdsdmJpQmtLR1VzYmoxN2ZTbDdkSEo1ZTNKbGRIVnliaUJoZDJGcGRDQmphSEp2YldVdWMzUnZjbUZuWlM1c2IyTmhiQzVuWlhRb1pTbDlZMkYwWTJnb2RDbDdhV1lvZFNoMEtTbHlaWFIxY200Z2JqdDBhSEp2ZHlCMGZYMWhjM2x1WXlCbWRXNWpkR2x2YmlCbUtHVXBlM1J5ZVh0aGQyRnBkQ0JqYUhKdmJXVXVjM1J2Y21GblpTNXNiMk5oYkM1elpYUW9aU2w5WTJGMFkyZ29iaWw3YVdZb2RTaHVLU2x5WlhSMWNtNDdkR2h5YjNjZ2JuMTlablZ1WTNScGIyNGdlU2dwZTNKbGRIVnliaUIwZVhCbGIyWWdhVzVrWlhobFpFUkNQaUoxSWo5UWNtOXRhWE5sTG5KbGFtVmpkQ2h1WlhjZ1JYSnliM0lvSWtsdVpHVjRaV1JFUWlCcGN5QnViM1FnWVhaaGFXeGhZbXhsSUdsdUlIUm9hWE1nWTI5dWRHVjRkQ0lwS1RwdVpYY2dVSEp2YldselpTZ29aU3h1S1QwK2UyTnZibk4wSUhROWFXNWtaWGhsWkVSQ0xtOXdaVzRvYnk1dVlXMWxMRzh1ZG1WeWMybHZiaWs3ZEM1dmJuVndaM0poWkdWdVpXVmtaV1E5S0NrOVBudGpiMjV6ZENCeVBYUXVjbVZ6ZFd4ME8zSXViMkpxWldOMFUzUnZjbVZPWVcxbGN5NWpiMjUwWVdsdWN5aHZMbk4wYjNKbEtYeDhjaTVqY21WaGRHVlBZbXBsWTNSVGRHOXlaU2h2TG5OMGIzSmxLWDBzZEM1dmJuTjFZMk5sYzNNOUtDazlQbVVvZEM1eVpYTjFiSFFwTEhRdWIyNWxjbkp2Y2owb0tUMCtiaWgwTG1WeWNtOXlmSHh1WlhjZ1JYSnliM0lvSWtaaGFXeGxaQ0IwYnlCdmNHVnVJRWx1WkdWNFpXUkVRaUlwS1gwcGZXRnplVzVqSUdaMWJtTjBhVzl1SUd3b1pTeHVLWHRqYjI1emRDQjBQV0YzWVdsMElIa29LVHR5WlhSMWNtNGdibVYzSUZCeWIyMXBjMlVvS0hJc1lTazlQbnRqYjI1emRDQm5QWFF1ZEhKaGJuTmhZM1JwYjI0b2J5NXpkRzl5WlN4bEtTNXZZbXBsWTNSVGRHOXlaU2h2TG5OMGIzSmxLVHR1S0djc2FUMCtlM0lvYVNrc2RDNWpiRzl6WlNncGZTeHBQVDU3WVNocEtTeDBMbU5zYjNObEtDbDlLWDBwZldGemVXNWpJR1oxYm1OMGFXOXVJRzBvWlNsN2FXWW9JV1VwZEdoeWIzY2dibVYzSUVWeWNtOXlLQ0pOYVhOemFXNW5JR1JwY21WamRHOXllU0JvWVc1a2JHVWlLVHR5WlhSMWNtNGdiQ2dpY21WaFpIZHlhWFJsSWl3b2JpeDBMSElwUFQ1N1kyOXVjM1FnWVQxdUxuQjFkQ2hsTEc4dWEyVjVLVHRoTG05dWMzVmpZMlZ6Y3owb0tUMCtkQ2doTUNrc1lTNXZibVZ5Y205eVBTZ3BQVDV5S0dFdVpYSnliM0lwZlNsOVlYTjVibU1nWm5WdVkzUnBiMjRnUkNncGUzSmxkSFZ5YmlCc0tDSnlaV0ZrYjI1c2VTSXNLR1VzYml4MEtUMCtlMk52Ym5OMElISTlaUzVuWlhRb2J5NXJaWGtwTzNJdWIyNXpkV05qWlhOelBTZ3BQVDV1S0hJdWNtVnpkV3gwZkh4dWRXeHNLU3h5TG05dVpYSnliM0k5S0NrOVBuUW9jaTVsY25KdmNpbDlLWDFoYzNsdVl5Qm1kVzVqZEdsdmJpQkZLQ2w3WTI5dWMzUWdaVDFoZDJGcGRDQmtLSE11YzJWMGRHbHVaM01wTzNKbGRIVnlibnN1TGk1akxDNHVMbVZiY3k1elpYUjBhVzVuYzExOGZIdDlmWDFoYzNsdVl5Qm1kVzVqZEdsdmJpQm9LR1VwZTJOdmJuTjBJRzQ5ZXk0dUxtTXNMaTR1WlgwN2NtVjBkWEp1SUdGM1lXbDBJR1lvZTF0ekxuTmxkSFJwYm1kelhUcHVmU2tzYm4xaGMzbHVZeUJtZFc1amRHbHZiaUJRS0NsN2NtVjBkWEp1S0dGM1lXbDBJR1FvY3k1bVlXSlFiM05wZEdsdmJpa3BXM011Wm1GaVVHOXphWFJwYjI1ZGZIeDdlRG95TUN4NU9qRXlNSDE5WVhONWJtTWdablZ1WTNScGIyNGdjQ2hsS1h0eVpYUjFjbTRnWVhkaGFYUWdaaWg3VzNNdVptRmlVRzl6YVhScGIyNWRPbVY5S1N4bGZXVjRjRzl5ZEh0UUlHRnpJR0VzUkNCaGN5QmlMRzBnWVhNZ1l5eG9JR0Z6SUdRc1JTQmhjeUJuTEhBZ1lYTWdjMzA3Q2c9PSI+CiAgICA8bGluayByZWw9InN0eWxlc2hlZXQiIGNyb3Nzb3JpZ2luIGhyZWY9ImRhdGE6dGV4dC9jc3M7YmFzZTY0LFltOWtlWHR0WVhKbmFXNDZNRHRtYjI1MExXWmhiV2xzZVRwQmRtVnVhWElnVG1WNGRDeFRaV2R2WlNCVlNTeHpZVzV6TFhObGNtbG1PMkpoWTJ0bmNtOTFibVE2Y21Ga2FXRnNMV2R5WVdScFpXNTBLR05wY21Oc1pTQmhkQ0F3SURBc0kyUmlaV0ZtWlN3alpqRm1OV1k1SURRMUpTazdZMjlzYjNJNkl6Qm1NVGN5WVgwdWQzSmhjSHR0WVhndGQybGtkR2c2TnpZd2NIZzdiV0Z5WjJsdU9qSTBjSGdnWVhWMGJ6dHdZV1JrYVc1bk9qQWdNVFp3ZUNBek1uQjRmV2d4ZTIxaGNtZHBiam93SURBZ01UWndlRHRtYjI1MExYTnBlbVU2TWpSd2VEdHNaWFIwWlhJdGMzQmhZMmx1WnpvdU0zQjRmUzVqWVhKa2UySmhZMnRuY205MWJtUTZJMlptWm1abVptVTJPeTEzWldKcmFYUXRZbUZqYTJSeWIzQXRabWxzZEdWeU9tSnNkWElvTW5CNEtUdGlZV05yWkhKdmNDMW1hV3gwWlhJNllteDFjaWd5Y0hncE8ySnZjbVJsY2pveGNIZ2djMjlzYVdRZ0kyUmlaVFZtTXp0aWIzSmtaWEl0Y21Ga2FYVnpPakUwY0hnN2NHRmtaR2x1WnpveE9IQjRPMjFoY21kcGJpMWliM1IwYjIwNk1UUndlRHRpYjNndGMyaGhaRzkzT2pBZ01UQndlQ0F5T0hCNElDTXdaakUzTW1Fd1puMW9NbnR0WVhKbmFXNDZNQ0F3SURFeWNIZzdabTl1ZEMxemFYcGxPakUyY0hoOWJHRmlaV3g3WkdsemNHeGhlVHBpYkc5amF6dG1iMjUwTFhOcGVtVTZNVFJ3ZUR0dFlYSm5hVzR0WW05MGRHOXRPakV5Y0hoOWFXNXdkWFJiZEhsd1pUMTBaWGgwWFN4elpXeGxZM1I3ZDJsa2RHZzZNVEF3SlR0aWIzZ3RjMmw2YVc1bk9tSnZjbVJsY2kxaWIzZzdiV0Z5WjJsdUxYUnZjRG8yY0hnN1ltOXlaR1Z5T2pGd2VDQnpiMnhwWkNBalkySmtOV1V4TzJKdmNtUmxjaTF5WVdScGRYTTZPSEI0TzNCaFpHUnBibWM2T0hCNElERXdjSGc3WW1GamEyZHliM1Z1WkRvalptWm1mUzVqYUdWamEzdGthWE53YkdGNU9tWnNaWGc3WjJGd09qaHdlRHRoYkdsbmJpMXBkR1Z0Y3pwalpXNTBaWEo5WW5WMGRHOXVlMkp2Y21SbGNqb3dPMkp2Y21SbGNpMXlZV1JwZFhNNk9IQjRPM0JoWkdScGJtYzZNVEJ3ZUNBeE5IQjRPMkpoWTJ0bmNtOTFibVE2YkdsdVpXRnlMV2R5WVdScFpXNTBLREV6TldSbFp5d2pNR1l4TnpKaExDTXhaRFJsWkRncE8yTnZiRzl5T2lObVptWTdZM1Z5YzI5eU9uQnZhVzUwWlhJN1ptOXVkQzEzWldsbmFIUTZOakF3TzNSeVlXNXphWFJwYjI0NmRISmhibk5tYjNKdElDNHhOWE1nWldGelpTeGliM2d0YzJoaFpHOTNJQzR4TlhNZ1pXRnpaWDFpZFhSMGIyNDZhRzkyWlhKN2RISmhibk5tYjNKdE9uUnlZVzV6YkdGMFpWa29MVEZ3ZUNrN1ltOTRMWE5vWVdSdmR6b3dJREV3Y0hnZ01UaHdlQ0FqTWpVMk0yVmlORGQ5TG5OaGRtVjdiV0Z5WjJsdUxYUnZjRG80Y0hoOUxtMTFkR1ZrZTJOdmJHOXlPaU0yTkRjME9HSTdabTl1ZEMxemFYcGxPakV6Y0hoOUxtaHBiblI3YldGeVoybHVPamh3ZUNBd0lEQTdZMjlzYjNJNkl6UTNOVFUyT1R0bWIyNTBMWE5wZW1VNk1USndlSDBLIj4KICA8L2hlYWQ+CiAgPGJvZHk+CiAgICA8bWFpbiBjbGFzcz0id3JhcCI+CiAgICAgIDxoMSBkYXRhLWkxOG49Im9wdGlvbnNUaXRsZSI+QUkgQ2hhdCBFeHBvcnRlciBTZXR0aW5nczwvaDE+CgogICAgICA8c2VjdGlvbiBjbGFzcz0iY2FyZCI+CiAgICAgICAgPGgyIGRhdGEtaTE4bj0ib3B0aW9uc09ic2lkaWFuRm9sZGVyIj5PYnNpZGlhbiBGb2xkZXI8L2gyPgogICAgICAgIDxidXR0b24gaWQ9InBpY2tGb2xkZXJCdG4iIHR5cGU9ImJ1dHRvbiIgZGF0YS1pMThuPSJvcHRpb25zUGlja0ZvbGRlciI+Q2hvb3NlIE9ic2lkaWFuIGZvbGRlcjwvYnV0dG9uPgogICAgICAgIDxwIGlkPSJmb2xkZXJTdGF0dXMiIGNsYXNzPSJtdXRlZCIgZGF0YS1pMThuPSJvcHRpb25zTm9Gb2xkZXIiPk5vIGZvbGRlciBzZWxlY3RlZDwvcD4KICAgICAgPC9zZWN0aW9uPgoKICAgICAgPHNlY3Rpb24gY2xhc3M9ImNhcmQiPgogICAgICAgIDxoMiBkYXRhLWkxOG49Im9wdGlvbnNFeHBvcnRTZWN0aW9uIj5FeHBvcnQ8L2gyPgogICAgICAgIDxsYWJlbD4KICAgICAgICAgIDxzcGFuIGRhdGEtaTE4bj0ib3B0aW9uc1N1YmZvbGRlclRlbXBsYXRlIj5TdWJmb2xkZXIgdGVtcGxhdGU8L3NwYW4+CiAgICAgICAgICA8aW5wdXQgaWQ9InN1YmZvbGRlclRlbXBsYXRlIiB0eXBlPSJ0ZXh0IiAvPgogICAgICAgIDwvbGFiZWw+CgogICAgICAgIDxsYWJlbD4KICAgICAgICAgIDxzcGFuIGRhdGEtaTE4bj0ib3B0aW9uc0ZpbGVuYW1lVGVtcGxhdGUiPkZpbGVuYW1lIHRlbXBsYXRlPC9zcGFuPgogICAgICAgICAgPGlucHV0IGlkPSJmaWxlbmFtZVRlbXBsYXRlIiB0eXBlPSJ0ZXh0IiAvPgogICAgICAgIDwvbGFiZWw+CgogICAgICAgIDxsYWJlbD4KICAgICAgICAgIDxzcGFuIGRhdGEtaTE4bj0ib3B0aW9uc0ltYWdlUmVsYXRpdmVQYXRoIj5JbWFnZSByZWxhdGl2ZSBwYXRoPC9zcGFuPgogICAgICAgICAgPGlucHV0IGlkPSJpbWFnZVJlbGF0aXZlUGF0aCIgdHlwZT0idGV4dCIgLz4KICAgICAgICA8L2xhYmVsPgoKICAgICAgICA8bGFiZWw+CiAgICAgICAgICA8c3BhbiBkYXRhLWkxOG49Im9wdGlvbnNVaUxhbmd1YWdlIj5MYW5ndWFnZTwvc3Bhbj4KICAgICAgICAgIDxzZWxlY3QgaWQ9InVpTGFuZ3VhZ2UiPgogICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSJhdXRvIiBkYXRhLWkxOG49Im9wdGlvbnNMYW5nQXV0byI+QXV0byAoQnJvd3Nlcik8L29wdGlvbj4KICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iemhfQ04iIGRhdGEtaTE4bj0ib3B0aW9uc0xhbmdaaENOIj5DaGluZXNlIChTaW1wbGlmaWVkKTwvb3B0aW9uPgogICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSJlbiIgZGF0YS1pMThuPSJvcHRpb25zTGFuZ0VuIj5FbmdsaXNoPC9vcHRpb24+CiAgICAgICAgICA8L3NlbGVjdD4KICAgICAgICA8L2xhYmVsPgoKICAgICAgICA8bGFiZWwgY2xhc3M9ImNoZWNrIj4KICAgICAgICAgIDxpbnB1dCBpZD0iaW5jbHVkZUZyb250bWF0dGVyIiB0eXBlPSJjaGVja2JveCIgLz4KICAgICAgICAgIDxzcGFuIGRhdGEtaTE4bj0ib3B0aW9uc0luY2x1ZGVGcm9udG1hdHRlciI+SW5jbHVkZSBZQU1MIGZyb250bWF0dGVyPC9zcGFuPgogICAgICAgIDwvbGFiZWw+CgogICAgICAgIDxsYWJlbCBjbGFzcz0iY2hlY2siPgogICAgICAgICAgPGlucHV0IGlkPSJpbmNsdWRlVGltZXN0YW1wcyIgdHlwZT0iY2hlY2tib3giIC8+CiAgICAgICAgICA8c3BhbiBkYXRhLWkxOG49Im9wdGlvbnNJbmNsdWRlVGltZXN0YW1wcyI+SW5jbHVkZSB0aW1lc3RhbXBzPC9zcGFuPgogICAgICAgIDwvbGFiZWw+CgogICAgICAgIDxsYWJlbCBjbGFzcz0iY2hlY2siPgogICAgICAgICAgPGlucHV0IGlkPSJpbmNsdWRlVXNlck1lc3NhZ2VzIiB0eXBlPSJjaGVja2JveCIgLz4KICAgICAgICAgIDxzcGFuIGRhdGEtaTE4bj0ib3B0aW9uc0luY2x1ZGVVc2VyTWVzc2FnZXMiPkluY2x1ZGUgdXNlciBtZXNzYWdlczwvc3Bhbj4KICAgICAgICA8L2xhYmVsPgoKICAgICAgICA8bGFiZWwgY2xhc3M9ImNoZWNrIj4KICAgICAgICAgIDxpbnB1dCBpZD0iZW5hYmxlRmFiIiB0eXBlPSJjaGVja2JveCIgLz4KICAgICAgICAgIDxzcGFuIGRhdGEtaTE4bj0ib3B0aW9uc0VuYWJsZUZhYiI+RW5hYmxlIGZsb2F0aW5nIGV4cG9ydCBidXR0b248L3NwYW4+CiAgICAgICAgPC9sYWJlbD4KCiAgICAgICAgPGxhYmVsIGNsYXNzPSJjaGVjayI+CiAgICAgICAgICA8aW5wdXQgaWQ9ImF1dG9IaWRlRmFiIiB0eXBlPSJjaGVja2JveCIgLz4KICAgICAgICAgIDxzcGFuIGRhdGEtaTE4bj0ib3B0aW9uc0F1dG9IaWRlRmFiIj5BdXRvLWhpZGUgRkFCIHdoZW4gZG9ja2VkIHRvIHNjcmVlbiBlZGdlPC9zcGFuPgogICAgICAgIDwvbGFiZWw+CgogICAgICAgIDxwIGNsYXNzPSJoaW50IiBkYXRhLWkxOG49Im9wdGlvbnNWYXJpYWJsZXNIaW50Ij5WYXJpYWJsZXM6IHtwbGF0Zm9ybX0sIHt0aXRsZX0sIHtkYXRlfSwge3RpbWV9LCB7ZGF0ZXRpbWV9LCB7bW9kZWx9PC9wPgogICAgICA8L3NlY3Rpb24+CgogICAgICA8YnV0dG9uIGlkPSJzYXZlQnRuIiB0eXBlPSJidXR0b24iIGNsYXNzPSJzYXZlIiBkYXRhLWkxOG49Im9wdGlvbnNTYXZlQnRuIj5TYXZlIHNldHRpbmdzPC9idXR0b24+CiAgICAgIDxwIGlkPSJzYXZlU3RhdHVzIiBjbGFzcz0ibXV0ZWQiPjwvcD4KICAgIDwvbWFpbj4KCiAgPC9ib2R5Pgo8L2h0bWw+Cg==\"\n        target=\"_blank\"\n        rel=\"noreferrer\"\n        data-i18n=\"popupOpenOptions\"\n      >Open options</a>\n    </main>\n  </body>\n</html>\n",
			  "assets/i18n-3hdh7VWn.js": "const S={subfolderTemplate:\"AI Chats/{platform}/\",filenameTemplate:\"{platform}-{title}-{datetime}\",includeFrontmatter:!0,includeTimestamps:!0,includeUserMessages:!0,enableFab:!0,autoHideFab:!0,uiLanguage:\"auto\",imageRelativePath:\"assets/\"},c={settings:\"settings\",fabPosition:\"fabPosition\",introShown:\"introShown\"},m={name:\"ai-chat-exporter-db\",version:1,store:\"handles\",key:\"obsidianRoot\"},h={triggerExport:\"ACE_TRIGGER_EXPORT\",previewChat:\"ACE_PREVIEW_CHAT\",runExport:\"ACE_RUN_EXPORT\",exportChat:\"ACE_EXPORT_CHAT\",exportResult:\"ACE_EXPORT_RESULT\",getSettings:\"ACE_GET_SETTINGS\"},x=[\"https://chatgpt.com/\",\"https://gemini.google.com/\"],u={en:{popupTitle:\"AI Chat Exporter\",popupSubtitle:\"Export current conversation to your Obsidian vault.\",popupExportTargetLabel:\"Content to export\",popupExportTargetHint:\"Multi-select: Ctrl/Cmd + Click\",popupExportTargetLoading:\"Loading current chat content...\",popupExportTargetUnavailable:\"Unable to load current chat content\",popupExportTargetAll:\"All exportable messages\",popupExportBtn:\"Export current chat\",popupOpenOptions:\"Open options\",popupStatusExporting:\"Exporting...\",popupStatusSelectionStarted:\"Selection mode started in current chat page\",popupErrorOpenChat:\"Please open a chat page on chatgpt.com or gemini.google.com first\",popupErrorUnknown:\"Unknown export error\",popupStatusExported:\"Exported: $1\",popupStatusFailed:\"Failed: $1\",optionsTitle:\"AI Chat Exporter Settings\",optionsObsidianFolder:\"Obsidian Folder\",optionsPickFolder:\"Choose Obsidian folder\",optionsNoFolder:\"No folder selected\",optionsAuthorizedDirectory:\"authorized directory\",optionsSelectedFolder:\"Selected: $1\",optionsExportSection:\"Export\",optionsSubfolderTemplate:\"Subfolder template\",optionsFilenameTemplate:\"Filename template\",optionsImageRelativePath:\"Image relative path\",optionsIncludeFrontmatter:\"Include YAML frontmatter\",optionsIncludeTimestamps:\"Include timestamps\",optionsIncludeUserMessages:\"Include your own messages\",optionsEnableFab:\"Enable floating export button\",optionsAutoHideFab:\"Auto-hide FAB when docked to screen edge\",optionsUiLanguage:\"Language\",optionsLangAuto:\"Auto (Browser)\",optionsLangZhCN:\"Chinese (Simplified)\",optionsLangEn:\"English\",optionsVariablesHint:\"Variables: {platform}, {title}, {date}, {time}, {datetime}, {model}\",optionsSaveBtn:\"Save settings\",optionsInitFailed:\"Init failed: $1\",optionsFolderAuthorized:\"Folder authorized\",optionsFolderSelectionFailed:\"Folder selection failed: $1\",optionsSettingsSaved:\"Settings saved\",contentIntro:\"AI Chat Exporter enabled: click to export, drag to move.\",contentSelectForExport:\"Select this message for export\",contentPickerModeStarted:\"Selection mode enabled. Choose messages on page, then export.\",contentPickerSelectedCount:\"Selected: $1\",contentPickerNeedSelection:\"Please select at least one message\",contentPickerExportSelected:\"Export Selected\",contentPickerExportAll:\"Export All\",contentPickerCancel:\"Cancel\",contentNoMessages:\"No exportable messages found on current page\",contentExporting:\"Exporting...\",contentExportOk:\"Exported: $1\",contentExportOkWithWarnings:\"Exported with partial image failures: $1\",contentExportFailed:\"Export failed: $1\",fabTitle:\"Click: export. Drag: move position.\",bgNeedFolder:\"Please choose an Obsidian folder in Options first\",bgPermissionDenied:\"Write permission to Obsidian folder was denied\",bgImageCorsWarning:\"Image blocked by CORS/host policy\"},zh_CN:{popupTitle:\"AI 对话导出器\",popupSubtitle:\"将当前对话快速导出到你的 Obsidian 仓库。\",popupExportTargetLabel:\"导出内容\",popupExportTargetHint:\"多选：按住 Ctrl/Cmd 点击\",popupExportTargetLoading:\"正在加载当前对话内容...\",popupExportTargetUnavailable:\"无法加载当前对话内容\",popupExportTargetAll:\"导出全部可导出消息\",popupExportBtn:\"导出当前对话\",popupOpenOptions:\"打开设置\",popupStatusExporting:\"正在导出...\",popupStatusSelectionStarted:\"已在当前页面开启选择模式\",popupErrorOpenChat:\"请先打开 chatgpt.com 或 gemini.google.com 的对话页面\",popupErrorUnknown:\"未知导出错误\",popupStatusExported:\"已导出: $1\",popupStatusFailed:\"失败: $1\",optionsTitle:\"AI 对话导出器设置\",optionsObsidianFolder:\"Obsidian 文件夹\",optionsPickFolder:\"选择 Obsidian 文件夹\",optionsNoFolder:\"尚未选择文件夹\",optionsAuthorizedDirectory:\"已授权目录\",optionsSelectedFolder:\"已选择: $1\",optionsExportSection:\"导出\",optionsSubfolderTemplate:\"子目录模板\",optionsFilenameTemplate:\"文件名模板\",optionsImageRelativePath:\"图片相对路径\",optionsIncludeFrontmatter:\"包含 YAML frontmatter\",optionsIncludeTimestamps:\"包含时间戳\",optionsIncludeUserMessages:\"包含你自己发送的消息\",optionsEnableFab:\"启用悬浮导出按钮\",optionsAutoHideFab:\"贴边时自动隐藏悬浮按钮\",optionsUiLanguage:\"界面语言\",optionsLangAuto:\"自动（跟随浏览器）\",optionsLangZhCN:\"简体中文\",optionsLangEn:\"English\",optionsVariablesHint:\"变量: {platform}, {title}, {date}, {time}, {datetime}, {model}\",optionsSaveBtn:\"保存设置\",optionsInitFailed:\"初始化失败: $1\",optionsFolderAuthorized:\"文件夹已授权\",optionsFolderSelectionFailed:\"选择文件夹失败: $1\",optionsSettingsSaved:\"设置已保存\",contentIntro:\"AI 对话导出器已启用：点击导出，拖拽移动位置。\",contentSelectForExport:\"选择这条消息用于导出\",contentPickerModeStarted:\"已开启选择模式，请在页面勾选消息后导出。\",contentPickerSelectedCount:\"已选择: $1\",contentPickerNeedSelection:\"请至少选择一条消息\",contentPickerExportSelected:\"导出所选\",contentPickerExportAll:\"导出全部\",contentPickerCancel:\"取消\",contentNoMessages:\"当前页面未找到可导出的消息\",contentExporting:\"正在导出...\",contentExportOk:\"导出成功: $1\",contentExportOkWithWarnings:\"导出成功（部分图片失败）: $1\",contentExportFailed:\"导出失败: $1\",fabTitle:\"点击导出，拖拽移动位置\",bgNeedFolder:\"请先在设置页面选择 Obsidian 文件夹\",bgPermissionDenied:\"Obsidian 目录写入授权被拒绝\",bgImageCorsWarning:\"图片因 CORS/域名权限限制无法下载\"}};let p=\"auto\";function g(){var e,o,n;if(p&&p!==\"auto\")return p;let t=\"en\";try{t=((n=(o=(e=globalThis.chrome)==null?void 0:e.i18n)==null?void 0:o.getUILanguage)==null?void 0:n.call(o))||\"en\"}catch{t=\"en\"}return String(t).toLowerCase().startsWith(\"zh\")?\"zh_CN\":\"en\"}function E(t,e){if(e==null)return t;const o=Array.isArray(e)?e:[e];return o.length?o.reduce((n,i,r)=>n.replaceAll(`$${r+1}`,String(i)),t):t}async function b(){var t,e,o;try{const n=(e=(t=globalThis.chrome)==null?void 0:t.storage)==null?void 0:e.local;if(!(n!=null&&n.get)){p=\"auto\";return}const i=n.get(c.settings),r=typeof(i==null?void 0:i.then)==\"function\"?await i:await new Promise(s=>{n.get(c.settings,l=>s(l))}),a=(o=r==null?void 0:r[c.settings])==null?void 0:o.uiLanguage;a&&(p=a)}catch{p=\"auto\"}}function d(t,e){var i,r,a,s;const o=g(),n=(i=u[o])==null?void 0:i[t];if(n)return E(n,e);try{const l=(s=(a=(r=globalThis.chrome)==null?void 0:r.i18n)==null?void 0:a.getMessage)==null?void 0:s.call(a,t,e);if(l)return l}catch{}return t}function f(t=document){t!=null&&t.querySelectorAll&&(t.querySelectorAll(\"[data-i18n]\").forEach(e=>{const o=e.getAttribute(\"data-i18n\");o&&(e.textContent=d(o))}),t.querySelectorAll(\"[data-i18n-title]\").forEach(e=>{const o=e.getAttribute(\"data-i18n-title\");o&&e.setAttribute(\"title\",d(o))}))}export{S as D,h as E,c as S,x as a,f as b,m as c,b as i,d as t};\n",
			  "assets/storage-CGxtbP7A.js": "import{D as c,S as s,c as o}from\"./i18n-3hdh7VWn.js\";function u(e){return String((e==null?void 0:e.message)||e||\"\").includes(\"Extension context invalidated\")}async function d(e,n={}){try{return await chrome.storage.local.get(e)}catch(t){if(u(t))return n;throw t}}async function f(e){try{await chrome.storage.local.set(e)}catch(n){if(u(n))return;throw n}}function y(){return typeof indexedDB>\"u\"?Promise.reject(new Error(\"IndexedDB is not available in this context\")):new Promise((e,n)=>{const t=indexedDB.open(o.name,o.version);t.onupgradeneeded=()=>{const r=t.result;r.objectStoreNames.contains(o.store)||r.createObjectStore(o.store)},t.onsuccess=()=>e(t.result),t.onerror=()=>n(t.error||new Error(\"Failed to open IndexedDB\"))})}async function l(e,n){const t=await y();return new Promise((r,a)=>{const g=t.transaction(o.store,e).objectStore(o.store);n(g,i=>{r(i),t.close()},i=>{a(i),t.close()})})}async function m(e){if(!e)throw new Error(\"Missing directory handle\");return l(\"readwrite\",(n,t,r)=>{const a=n.put(e,o.key);a.onsuccess=()=>t(!0),a.onerror=()=>r(a.error)})}async function D(){return l(\"readonly\",(e,n,t)=>{const r=e.get(o.key);r.onsuccess=()=>n(r.result||null),r.onerror=()=>t(r.error)})}async function E(){const e=await d(s.settings);return{...c,...e[s.settings]||{}}}async function h(e){const n={...c,...e};return await f({[s.settings]:n}),n}async function P(){return(await d(s.fabPosition))[s.fabPosition]||{x:20,y:120}}async function p(e){return await f({[s.fabPosition]:e}),e}export{P as a,D as b,m as c,h as d,E as g,p as s};\n",
			  "assets/content.js-Dh1RDMpX.js": "import{i as H,E as I,S as C,t as i}from\"./i18n-3hdh7VWn.js\";import{g as A,a as _,s as D}from\"./storage-CGxtbP7A.js\";class v{constructor(){this.platform=\"unknown\"}isSupported(){return!1}extractMessageEntries(){throw new Error(\"extractMessageEntries must be implemented by adapter\")}extractChatData(){throw new Error(\"extractChatData must be implemented by adapter\")}}function P(e){var n;if(!e)return\"\";const r=e.currentSrc||e.getAttribute(\"src\")||e.getAttribute(\"data-src\")||\"\";let t=String(r||\"\").trim();if(!t)return\"\";if(t.startsWith(\"//\")&&(t=`https:${t}`),t.startsWith(\"blob:\")){const s=((n=e.closest(\"a\"))==null?void 0:n.getAttribute(\"href\"))||\"\";if(s.startsWith(\"http\"))return s}return t.startsWith(\"data:\")||t.startsWith(\"blob:\")?\"\":t}function G(e){var f,h,N,L;if(!e)return\"\";const r=[],t=e.closest(\"pre\"),n=e.parentElement,s=(t==null?void 0:t.parentElement)||n,o=u=>{if(!u)return;const g=String(u.className||\"\").matchAll(/(?:language|lang)-([a-zA-Z0-9_+#-]+)/gi);for(const m of g)m[1]&&r.push(m[1])},a=u=>{var g,m,T;if(!u)return;const x=((g=u.getAttribute)==null?void 0:g.call(u,\"data-language\"))||((m=u.getAttribute)==null?void 0:m.call(u,\"data-lang\"))||((T=u.dataset)==null?void 0:T.language)||\"\";x&&r.push(x)};o(e),o(t),o(n),o(s),a(e),a(t),a(n),a(s);const c=((h=(f=s==null?void 0:s.querySelector)==null?void 0:f.call(s,\"[data-language]\"))==null?void 0:h.getAttribute(\"data-language\"))||((L=(N=s==null?void 0:s.querySelector)==null?void 0:N.call(s,'[data-testid*=\"code\"] [class*=\"language-\"]'))==null?void 0:L.className)||\"\";c&&r.push(c);const l={js:\"javascript\",ts:\"typescript\",py:\"python\",sh:\"bash\",shell:\"bash\",yml:\"yaml\",md:\"markdown\"};for(const u of r){const g=String(u).toLowerCase().trim().replace(/^language-/,\"\").replace(/^lang-/,\"\").replace(/[^a-z0-9_+#-]/g,\"\");if(g)return l[g]||g}return\"\"}function y(e,r=!1){if(!e)return\"\";if(e.nodeType===Node.TEXT_NODE)return e.textContent||\"\";if(e.nodeType!==Node.ELEMENT_NODE)return\"\";const t=e,n=t.tagName.toLowerCase();if(n===\"pre\"){const a=t.querySelector(\"code\"),c=((a==null?void 0:a.textContent)||t.innerText||\"\").replace(/\\n$/,\"\");return`\n\n\\`\\`\\`${G(a)}\n${c}\n\\`\\`\\`\n\n`}if(n===\"code\")return r?t.textContent||\"\":`\\`${(t.textContent||\"\").trim()}\\``;if(n===\"img\"){const a=P(t);return a?`![${t.getAttribute(\"alt\")||\"image\"}](${a})`:\"\"}if(n===\"a\"){const a=t.getAttribute(\"href\")||\"\",c=(t.textContent||\"\").trim();return a?t.querySelector(\"img\")?Array.from(t.childNodes).map(l=>y(l,r)).join(\"\"):`[${c||a}](${a})`:c}if(n===\"br\")return`\n`;const s=new Set([\"p\",\"div\",\"section\",\"article\",\"blockquote\",\"h1\",\"h2\",\"h3\",\"h4\",\"h5\",\"h6\",\"ul\",\"ol\"]);if(n===\"li\")return`- ${Array.from(t.childNodes).map(c=>y(c,r)).join(\"\").trim()}\n`;let o=\"\";for(const a of t.childNodes)o+=y(a,r||n===\"pre\");return n===\"strong\"||n===\"b\"?`**${o}**`:n===\"em\"||n===\"i\"?`*${o}*`:s.has(n)?`${o.trim()}\n\n`:o}function j(e){return String(e||\"\").replace(/\\n{3,}/g,`\n\n`).replace(/[ \\t]+\\n/g,`\n`).replace(/^\\n+/,\"\").trim()}function $(e){return j(y(e))}function U(e){return e?Array.from(e.querySelectorAll(\"img\")).map(r=>P(r)).filter(Boolean):[]}function z(){const e=document.querySelector('[data-testid=\"model-switcher-dropdown-button\"]');return e&&(e.textContent||\"\").trim()||\"unknown\"}function R(e){return e.querySelector(\".markdown\")||e.querySelector(\"[data-message-content]\")||e}class K extends v{constructor(){super(),this.platform=\"chatgpt\"}isSupported(){return location.hostname===\"chatgpt.com\"}extractMessageEntries(){return Array.from(document.querySelectorAll(\"[data-message-author-role]\")).map(t=>{const n=t.getAttribute(\"data-message-author-role\")||\"unknown\",s=R(t),o=$(s),a=U(s);return!o&&a.length===0?null:{sourceNode:t,role:n,markdownContent:o,timestamp:new Date().toISOString(),images:a}}).filter(Boolean)}extractChatData(){var s,o;const t=this.extractMessageEntries().map(({role:a,markdownContent:c,timestamp:l,images:f})=>({role:a,markdownContent:c,timestamp:l,images:f})),n=document.title.replace(/\\s*[-|].*$/,\"\").trim()||((o=(s=document.querySelector(\"h1\"))==null?void 0:s.textContent)==null?void 0:o.trim())||\"Untitled Chat\";return{platform:this.platform,url:location.href,title:n,messages:t,metadata:{exportedAt:new Date().toISOString(),model:z(),totalMessages:t.length}}}}function Z(){var r,t;const e=['[data-test-id=\"model-selector-button\"]','button[aria-label*=\"model\" i]','button[aria-label*=\"Model\" i]','[class*=\"model-name\"]'];for(const n of e){const s=(t=(r=document.querySelector(n))==null?void 0:r.textContent)==null?void 0:t.trim();if(s)return s}return\"gemini\"}function J(e){var t;const r=((t=e.find(n=>n.role===\"user\"))==null?void 0:t.markdownContent)||\"\";return r?r.replace(/\\s+/g,\" \").trim().slice(0,80)||\"Untitled Chat\":document.title.replace(/\\s*[-|].*$/,\"\").trim()||\"Untitled Chat\"}function Q(e,r){if(!e)return null;const s=r===\"user\"?['[data-test-id=\"user-query-text\"]',\".query-text\",'[class*=\"query-text\"]',\".user-query-text\"]:['[data-test-id=\"model-response-text\"]',\".model-response-text\",'[class*=\"response-content\"]',\".response-content\",\".markdown\"];for(const o of s){const a=e.querySelector(o);if(a)return a}return e}class V extends v{constructor(){super(),this.platform=\"gemini\"}isSupported(){return location.hostname===\"gemini.google.com\"}extractMessageEntries(){return Array.from(document.querySelectorAll(\"user-query, model-response\")).map(t=>{const n=t.matches(\"user-query\")?\"user\":\"assistant\",s=Q(t,n),o=$(s),a=U(s);return!o&&a.length===0?null:{sourceNode:t,role:n,markdownContent:o,timestamp:new Date().toISOString(),images:a}}).filter(Boolean)}extractChatData(){const t=this.extractMessageEntries().map(({role:n,markdownContent:s,timestamp:o,images:a})=>({role:n,markdownContent:s,timestamp:o,images:a}));return{platform:this.platform,url:location.href,title:J(t),messages:t,metadata:{exportedAt:new Date().toISOString(),model:Z(),totalMessages:t.length}}}}function ee(e){return String(e||\"\").toLowerCase()===\"user\"}function B(e){return(Array.isArray(e)?e:[]).map((r,t)=>({message:r,sourceIndex:t}))}function te(e,r){const t=Math.max(12,Number(r)||72),n=String((e==null?void 0:e.markdownContent)||\"\").replace(/\\s+/g,\" \").trim();return n?n.length<=t?n:`${n.slice(0,t-3)}...`:Array.isArray(e==null?void 0:e.images)&&e.images.length>0?\"[image]\":\"[empty]\"}function ne(e){if(e==null)return null;const t=(Array.isArray(e)?e:[e]).map(n=>Number.parseInt(String(n),10)).filter(n=>Number.isInteger(n)&&n>=0);return t.length?new Set(t):null}function F(e,r,t){const n=r?e:e.filter(({message:o})=>!ee(o==null?void 0:o.role)),s=ne(t);return s?n.filter(o=>s.has(o.sourceIndex)):n}function re(e,r={}){const t=r.includeUserMessages!==!1,n=r.snippetLength||72,s=B(e==null?void 0:e.messages);return F(s,t,null).map(({message:a,sourceIndex:c})=>({sourceIndex:c,role:String((a==null?void 0:a.role)||\"unknown\").toLowerCase(),snippet:te(a,n)}))}function se(e,r={}){const t=r.includeUserMessages!==!1,n=r.selectedSourceIndexes!=null?r.selectedSourceIndexes:r.selectedSourceIndex,s=B(e==null?void 0:e.messages),a=F(s,t,n).map(c=>c.message);return{...e,messages:a,metadata:{...(e==null?void 0:e.metadata)||{},totalMessages:a.length}}}const p=[new K,new V].find(e=>e.isSupported());let S,k=0,O=!0,w=!1;p?ae().catch(e=>{console.error(\"[ai-chat-exporter] bootstrap failed\",e)}):console.info(\"[ai-chat-exporter] unsupported page\");async function ae(){await H();const e=await A();O=e.includeUserMessages!==!1,await oe(),e.enableFab&&me(e),ue(),chrome.runtime.onMessage.addListener((r,t,n)=>(r==null?void 0:r.type)===I.triggerExport?(b(r.trigger||\"external\",r.selection||null).then(s=>n(s)).catch(s=>{n({ok:!1,error:s.message||String(s)})}),!0):(r==null?void 0:r.type)===I.previewChat?(ce().then(s=>n(s)).catch(s=>{n({ok:!1,error:s.message||String(s)})}),!0):!1)}async function oe(){try{if((await chrome.storage.local.get(C.introShown))[C.introShown])return;d(i(\"contentIntro\")),await chrome.storage.local.set({[C.introShown]:!0})}catch(e){if(!String((e==null?void 0:e.message)||e||\"\").includes(\"Extension context invalidated\"))throw e}}async function b(e,r=null){var s;if((r==null?void 0:r.mode)===\"page-picker\")return fe(),d(i(\"contentPickerModeStarted\")),{ok:!0,startedSelection:!0};const t=await ie(r);if(!t.messages.length)return d(i(\"contentNoMessages\")),{ok:!1,error:\"No messages found\"};d(i(\"contentExporting\"));const n=await chrome.runtime.sendMessage({type:I.exportChat,payload:{chatData:t,trigger:e}});if(n!=null&&n.ok){const o=(s=n.warnings)!=null&&s.length?i(\"contentExportOkWithWarnings\",[n.path]):i(\"contentExportOk\",[n.path]);d(o)}else d(i(\"contentExportFailed\",[(n==null?void 0:n.error)||\"Unknown error\"]));return n}async function ce(){const e=p.extractChatData(),t=(await A()).includeUserMessages!==!1,n=re(e,{includeUserMessages:t});return n.length?{ok:!0,preview:{title:e.title||\"\",messageCount:n.length,messages:n}}:{ok:!1,error:\"No messages found\"}}async function ie(e){const r=p.extractChatData(),n=(await A()).includeUserMessages!==!1,s=(e==null?void 0:e.mode)===\"all-explicit\";let o=le(e);if(!s&&!(o!=null&&o.length)){const a=E();a.length&&(o=a)}return se(r,{includeUserMessages:n,selectedSourceIndexes:o})}function le(e){const r=e==null?void 0:e.mode;if(r===\"single\"){const t=e==null?void 0:e.messageIndex;return!Number.isInteger(t)||t<0?null:[t]}if(r===\"multi\"){const n=(Array.isArray(e==null?void 0:e.messageIndexes)?e.messageIndexes:[]).filter(s=>Number.isInteger(s)&&s>=0);return n.length?n:null}return null}function ue(){S&&S.disconnect(),S=new MutationObserver(()=>{w&&de()}),S.observe(document.body,{childList:!0,subtree:!0})}function de(){k||(k=window.setTimeout(()=>{k=0,X()},120))}function X(){if(!w){Y();return}if(typeof p.extractMessageEntries!=\"function\")return;const e=new Set(E()),r=p.extractMessageEntries(),t=new Set;r.forEach((n,s)=>{const o=n==null?void 0:n.sourceNode;if(!(o instanceof HTMLElement)||!O&&String((n==null?void 0:n.role)||\"\").toLowerCase()===\"user\")return;t.add(o),o.classList.add(\"ace-message-select-host\");let a=o.querySelector(\":scope > .ace-message-select-badge\");if(!a){a=document.createElement(\"label\"),a.className=\"ace-message-select-badge\",a.title=i(\"contentSelectForExport\");const l=document.createElement(\"input\");l.type=\"checkbox\",l.className=\"ace-chat-select\",l.setAttribute(\"aria-label\",i(\"contentSelectForExport\")),a.appendChild(l),o.appendChild(a)}const c=a.querySelector(\".ace-chat-select\");c&&(c.dataset.sourceIndex=String(s),c.checked=e.has(s),c.onchange=()=>W())}),document.querySelectorAll(\".ace-message-select-host\").forEach(n=>{var s;n instanceof HTMLElement&&(t.has(n)||(n.classList.remove(\"ace-message-select-host\"),(s=n.querySelector(\":scope > .ace-message-select-badge\"))==null||s.remove()))})}function Y(){document.querySelectorAll(\".ace-message-select-host\").forEach(e=>{var r;e instanceof HTMLElement&&(e.classList.remove(\"ace-message-select-host\"),(r=e.querySelector(\":scope > .ace-message-select-badge\"))==null||r.remove())})}function E(){const e=Array.from(document.querySelectorAll(\".ace-chat-select:checked\")).map(r=>Number.parseInt(r.dataset.sourceIndex||\"\",10)).filter(r=>Number.isInteger(r)&&r>=0);return Array.from(new Set(e))}function fe(){w=!0,X(),ge(),W()}function M(){var e;w=!1,Y(),(e=document.getElementById(\"ace-select-panel\"))==null||e.remove()}function ge(){if(document.getElementById(\"ace-select-panel\"))return;const e=document.createElement(\"div\");e.id=\"ace-select-panel\";const r=document.createElement(\"span\");r.id=\"ace-select-count\",e.appendChild(r);const t=document.createElement(\"button\");t.type=\"button\",t.id=\"ace-select-export-selected\",t.textContent=i(\"contentPickerExportSelected\"),t.addEventListener(\"click\",async()=>{try{const o=E();if(!o.length){d(i(\"contentPickerNeedSelection\"));return}const a=await b(\"page-picker\",{mode:\"multi\",messageIndexes:o});a!=null&&a.ok&&M()}catch(o){d(i(\"contentExportFailed\",[o.message||String(o)]))}}),e.appendChild(t);const n=document.createElement(\"button\");n.type=\"button\",n.id=\"ace-select-export-all\",n.textContent=i(\"contentPickerExportAll\"),n.addEventListener(\"click\",async()=>{try{const o=await b(\"page-picker\",{mode:\"all-explicit\"});o!=null&&o.ok&&M()}catch(o){d(i(\"contentExportFailed\",[o.message||String(o)]))}}),e.appendChild(n);const s=document.createElement(\"button\");s.type=\"button\",s.id=\"ace-select-cancel\",s.textContent=i(\"contentPickerCancel\"),s.addEventListener(\"click\",()=>{M()}),e.appendChild(s),document.body.appendChild(e)}function W(){const e=document.getElementById(\"ace-select-count\"),r=document.getElementById(\"ace-select-export-selected\");if(!e||!r)return;const t=E().length;e.textContent=i(\"contentPickerSelectedCount\",[t]),r.disabled=t===0}async function me(e){if(document.getElementById(\"ace-fab\"))return;const r=await _(),t=document.createElement(\"button\");t.id=\"ace-fab\",t.type=\"button\",t.title=i(\"fabTitle\"),t.textContent=\"↓\",t.style.left=`${Math.max(12,r.x)}px`,t.style.top=`${Math.max(12,r.y)}px`,document.body.appendChild(t);const n={pressed:!1,dragging:!1,startX:0,startY:0,offsetX:0,offsetY:0},s=8;function o(){if(t.classList.remove(\"dock-left\",\"dock-right\"),!e.autoHideFab)return;const a=t.offsetLeft;if(a<=18){t.classList.add(\"dock-left\");return}a>=window.innerWidth-66&&t.classList.add(\"dock-right\")}t.addEventListener(\"pointerdown\",a=>{n.pressed=!0,n.dragging=!1,n.startX=a.clientX,n.startY=a.clientY,n.offsetX=a.clientX-t.offsetLeft,n.offsetY=a.clientY-t.offsetTop,t.setPointerCapture(a.pointerId)}),t.addEventListener(\"pointermove\",a=>{if(!n.pressed)return;const c=Math.abs(a.clientX-n.startX),l=Math.abs(a.clientY-n.startY);if(!n.dragging&&c+l>s&&(n.dragging=!0,t.classList.add(\"dragging\")),!n.dragging)return;const f=Math.max(12,Math.min(window.innerWidth-60,a.clientX-n.offsetX)),h=Math.max(12,Math.min(window.innerHeight-60,a.clientY-n.offsetY));t.style.left=`${f}px`,t.style.top=`${h}px`,o()}),t.addEventListener(\"pointerup\",async a=>{if(!n.pressed)return;n.pressed=!1,t.releasePointerCapture(a.pointerId);const c=Number.parseInt(t.style.left,10),l=Number.parseInt(t.style.top,10);if(await D({x:c,y:l}),n.dragging){n.dragging=!1,t.classList.remove(\"dragging\");return}b(\"fab\",{mode:\"page-picker\"}).catch(f=>{d(i(\"contentExportFailed\",[f.message||String(f)]))})}),window.addEventListener(\"resize\",o),o()}let q;function d(e){let r=document.getElementById(\"ace-toast\");r||(r=document.createElement(\"div\"),r.id=\"ace-toast\",document.body.appendChild(r)),r.textContent=e,r.style.display=\"block\",window.clearTimeout(q),q=window.setTimeout(()=>{r.style.display=\"none\"},3e3)}\n"
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
		      "ai-chat-exporter",
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
	  const scriptName = "AI Chat Exporter";
	  const debug = "[AI Chat Exporter]";
	  _log(debug + ' Executing background scripts...');
	
	  function executeBackgroundScripts(){
	    with(backgroundPolyfill){
	      // BG: service-worker-loader.js
	import './assets/background.js-mF7aF4qw.js';
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
	const INJECTED_MANIFEST = {"manifest_version":3,"name":"AI Chat Exporter","version":"0.2.0","description":"Export AI chat conversations to Markdown and sync to Obsidian","permissions":["storage","contextMenus","activeTab","tabs"],"optional_permissions":[],"content_scripts":[{"js":["assets/content.js-loader-By1kjrAQ.js"],"matches":["https://chatgpt.com/*","https://gemini.google.com/*"],"css":["assets/content-BQfWMbtj.css"]}],"options_ui":{},"browser_action":{},"page_action":{},"action":{"default_popup":"popup/popup.html","default_icon":{"16":"icons/icon16.png","48":"icons/icon48.png","128":"icons/icon128.png"}},"icons":{"16":"icons/icon16.png","48":"icons/icon48.png","128":"icons/icon128.png"},"web_accessible_resources":[{"matches":["https://chatgpt.com/*","https://gemini.google.com/*"],"resources":["assets/i18n-3hdh7VWn.js","assets/storage-CGxtbP7A.js","assets/content.js-Dh1RDMpX.js"],"use_dynamic_url":false}],"background":{"service_worker":"service-worker-loader.js","type":"module"},"_id":"ai-chat-exporter"};
	const CONTENT_SCRIPT_CONFIGS_FOR_MATCHING = [
	  {
	    "matches": [
	      "https://chatgpt.com/*",
	      "https://gemini.google.com/*"
	    ]
	  }
	];
	const OPTIONS_PAGE_PATH = null;
	const POPUP_PAGE_PATH = "popup/popup.html";
	const EXTENSION_ICON = "data:image/png;base64,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";
	const extensionCssData = {    "assets/content-BQfWMbtj.css": "#ace-fab{position:fixed;z-index:2147483000;width:48px;height:48px;border-radius:999px;border:none;background:#0f172a;color:#fff;cursor:pointer;box-shadow:0 10px 30px #00000040;font-size:20px;line-height:48px;text-align:center;-webkit-user-select:none;user-select:none;transition:opacity .2s ease,transform .2s ease;opacity:.92}#ace-fab.dragging{cursor:grabbing}#ace-fab.dock-left{transform:translate(-70%);opacity:.35}#ace-fab.dock-left:hover,#ace-fab.dock-left:focus-visible{transform:translate(0);opacity:.92}#ace-fab.dock-right{transform:translate(70%);opacity:.35}#ace-fab.dock-right:hover,#ace-fab.dock-right:focus-visible{transform:translate(0);opacity:.92}#ace-toast{position:fixed;right:20px;bottom:20px;z-index:2147483001;max-width:360px;background:#111827;color:#fff;padding:10px 14px;border-radius:8px;font-size:13px;line-height:1.4;box-shadow:0 8px 24px #0003}.ace-message-select-host{position:relative!important}.ace-message-select-badge{position:absolute;left:-24px;top:8px;z-index:2147482998;background:#020617c7;border:1px solid rgba(148,163,184,.45);border-radius:6px;padding:2px;display:inline-flex;align-items:center;justify-content:center}.ace-chat-select{width:16px;height:16px;margin:0;cursor:pointer;accent-color:#0ea5e9}#ace-select-panel{position:fixed;left:50%;bottom:20px;transform:translate(-50%);z-index:2147483002;display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:999px;background:#020617eb;border:1px solid rgba(148,163,184,.4);box-shadow:0 10px 26px #0000004d}#ace-select-count{font-size:12px;color:#cbd5e1;margin-right:4px}#ace-select-panel button{border:0;border-radius:999px;padding:6px 10px;font-size:12px;cursor:pointer}#ace-select-export-selected{background:#0284c7;color:#f8fafc}#ace-select-export-selected:disabled{opacity:.5;cursor:not-allowed}#ace-select-export-all{background:#334155;color:#f8fafc}#ace-select-cancel{background:transparent;color:#cbd5e1;border:1px solid rgba(148,163,184,.45)}\n"};
	
	const LOCALE_KEYS = {"extName":{"message":"AI Chat Exporter"},"extDescription":{"message":"Export AI chat conversations to Markdown and sync to Obsidian"},"cmdExportChat":{"message":"Export current chat to Markdown"},"contextMenuExport":{"message":"Export chat to Obsidian"},"popupTitle":{"message":"AI Chat Exporter"},"popupSubtitle":{"message":"Export current conversation to your Obsidian vault."},"popupExportBtn":{"message":"Export current chat"},"popupOpenOptions":{"message":"Open options"},"popupStatusExporting":{"message":"Exporting..."},"popupErrorOpenChat":{"message":"Please open a chat page on chatgpt.com or gemini.google.com first"},"popupErrorUnknown":{"message":"Unknown export error"},"popupStatusExported":{"message":"Exported: $1","placeholders":{"path":{"content":"$1"}}},"popupStatusFailed":{"message":"Failed: $1","placeholders":{"error":{"content":"$1"}}},"optionsTitle":{"message":"AI Chat Exporter Settings"},"optionsObsidianFolder":{"message":"Obsidian Folder"},"optionsPickFolder":{"message":"Choose Obsidian folder"},"optionsNoFolder":{"message":"No folder selected"},"optionsAuthorizedDirectory":{"message":"authorized directory"},"optionsSelectedFolder":{"message":"Selected: $1","placeholders":{"name":{"content":"$1"}}},"optionsExportSection":{"message":"Export"},"optionsSubfolderTemplate":{"message":"Subfolder template"},"optionsFilenameTemplate":{"message":"Filename template"},"optionsImageRelativePath":{"message":"Image relative path"},"optionsIncludeFrontmatter":{"message":"Include YAML frontmatter"},"optionsIncludeTimestamps":{"message":"Include timestamps"},"optionsEnableFab":{"message":"Enable floating export button"},"optionsAutoHideFab":{"message":"Auto-hide FAB when docked to screen edge"},"optionsVariablesHint":{"message":"Variables: {platform}, {title}, {date}, {time}, {datetime}, {model}"},"optionsSaveBtn":{"message":"Save settings"},"optionsInitFailed":{"message":"Init failed: $1","placeholders":{"error":{"content":"$1"}}},"optionsFolderAuthorized":{"message":"Folder authorized"},"optionsFolderSelectionFailed":{"message":"Folder selection failed: $1","placeholders":{"error":{"content":"$1"}}},"optionsSettingsSaved":{"message":"Settings saved"},"contentIntro":{"message":"AI Chat Exporter enabled: click to export, drag to move."},"contentNoMessages":{"message":"No exportable messages found on current page"},"contentExporting":{"message":"Exporting..."},"contentExportOk":{"message":"Exported: $1","placeholders":{"path":{"content":"$1"}}},"contentExportOkWithWarnings":{"message":"Exported with partial image failures: $1","placeholders":{"path":{"content":"$1"}}},"contentExportFailed":{"message":"Export failed: $1","placeholders":{"error":{"content":"$1"}}},"fabTitle":{"message":"Click: export. Drag: move position."},"bgNeedFolder":{"message":"Please choose an Obsidian folder in Options first"},"bgPermissionDenied":{"message":"Write permission to Obsidian folder was denied"}};
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
		  const scriptName = "AI Chat Exporter";
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
			    
			        const cssKey_0 = "assets/content-BQfWMbtj.css";
			    try {
			      if (extensionCssData[cssKey_0]) {
			        _log(`  Injecting CSS (idle): ${cssKey_0}`);
			        const style = document.createElement('style');
			        style.textContent = extensionCssData[cssKey_0];
			        (document.head || document.documentElement).appendChild(style);
			      } else { console.warn(`  CSS not found (idle): ${cssKey_0}`); }
			    } catch(e) { _error(`  Failed injecting CSS (${cssKey_0}) in phase idle`, e, extensionCssData); }
			  
			    const scriptPaths = ["assets/content.js-loader-By1kjrAQ.js"];
			   _log(`  Executing JS (idle): ${scriptPaths}`);
			
			   try {
			       // Keep variables from being redeclared for global scope, but also make them apply to global scope. (Theoretically)
			      with (globalThis){;
			// START: assets/content.js-loader-By1kjrAQ.js
			(function () {
			  'use strict';
			
			  const injectTime = performance.now();
			  (async () => {
			    const { onExecute } = await import(
			      /* @vite-ignore */
			      chrome.runtime.getURL("assets/content.js-Dh1RDMpX.js")
			    );
			    onExecute?.({ perf: { injectTime, loadTime: performance.now() - injectTime } });
			  })().catch(console.error);
			
			})();
			// END: assets/content.js-loader-By1kjrAQ.js
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
			  const polyfillString = "\n// -- Messaging implementation\n\nfunction createEventBus(\n  scopeId,\n  type = \"page\", // \"page\" or \"iframe\"\n  { allowedOrigin = \"*\", children = [], parentWindow = null } = {}\n) {\n  if (!scopeId) throw new Error(\"createEventBus requires a scopeId\");\n\n  const handlers = {};\n\n  function handleIncoming(ev) {\n    if (allowedOrigin !== \"*\" && ev.origin !== allowedOrigin) return;\n\n    const msg = ev.data;\n    if (!msg || msg.__eventBus !== true || msg.scopeId !== scopeId) return;\n\n    const { event, payload } = msg;\n\n    // PAGE: if it's an INIT from an iframe, adopt it\n    if (type === \"page\" && event === \"__INIT__\") {\n      const win = ev.source;\n      if (win && !children.includes(win)) {\n        children.push(win);\n      }\n      return;\n    }\n\n    (handlers[event] || []).forEach((fn) =>\n      fn(payload, { origin: ev.origin, source: ev.source })\n    );\n  }\n\n  window.addEventListener(\"message\", handleIncoming);\n\n  function emitTo(win, event, payload) {\n    const envelope = {\n      __eventBus: true,\n      scopeId,\n      event,\n      payload,\n    };\n    win.postMessage(envelope, allowedOrigin);\n  }\n\n  // IFRAME: announce to page on startup\n  if (type === \"iframe\") {\n    setTimeout(() => {\n      const pw = parentWindow || window.parent;\n      if (pw && pw.postMessage) {\n        emitTo(pw, \"__INIT__\", null);\n      }\n    }, 0);\n  }\n\n  return {\n    on(event, fn) {\n      handlers[event] = handlers[event] || [];\n      handlers[event].push(fn);\n    },\n    off(event, fn) {\n      if (!handlers[event]) return;\n      handlers[event] = handlers[event].filter((h) => h !== fn);\n    },\n    /**\n     * Emits an event.\n     * @param {string} event - The event name.\n     * @param {any} payload - The event payload.\n     * @param {object} [options] - Emission options.\n     * @param {Window} [options.to] - A specific window to target. If provided, message is ONLY sent to the target.\n     */\n    emit(event, payload, { to } = {}) {\n      // If a specific target window is provided, send only to it and DO NOT dispatch locally.\n      // This prevents a port from receiving its own messages.\n      if (to) {\n        if (to && typeof to.postMessage === \"function\") {\n          emitTo(to, event, payload);\n        }\n        return; // Exit after targeted send.\n      }\n\n      // For broadcast messages (no 'to' target), dispatch locally first.\n      (handlers[event] || []).forEach((fn) =>\n        fn(payload, { origin: location.origin, source: window })\n      );\n\n      // Then propagate the broadcast to other windows.\n      if (type === \"page\") {\n        children.forEach((win) => emitTo(win, event, payload));\n      } else {\n        const pw = parentWindow || window.parent;\n        if (pw && pw.postMessage) {\n          emitTo(pw, event, payload);\n        }\n      }\n    },\n  };\n}\n\nfunction createRuntime(type = \"background\", bus) {\n  let nextId = 1;\n  const pending = {};\n  const msgListeners = [];\n\n  let nextPortId = 1;\n  const ports = {};\n  const onConnectListeners = [];\n\n  function parseArgs(args) {\n    let target, message, options, callback;\n    const arr = [...args];\n    if (arr.length === 0) {\n      throw new Error(\"sendMessage requires at least one argument\");\n    }\n    if (arr.length === 1) {\n      return { message: arr[0] };\n    }\n    // last object could be options\n    if (\n      arr.length &&\n      typeof arr[arr.length - 1] === \"object\" &&\n      !Array.isArray(arr[arr.length - 1])\n    ) {\n      options = arr.pop();\n    }\n    // last function is callback\n    if (arr.length && typeof arr[arr.length - 1] === \"function\") {\n      callback = arr.pop();\n    }\n    if (\n      arr.length === 2 &&\n      (typeof arr[0] === \"string\" || typeof arr[0] === \"number\")\n    ) {\n      [target, message] = arr;\n    } else {\n      [message] = arr;\n    }\n    return { target, message, options, callback };\n  }\n\n  if (type === \"background\") {\n    bus.on(\"__REQUEST__\", ({ id, message }, { source }) => {\n      let responded = false,\n        isAsync = false;\n      function sendResponse(resp) {\n        if (responded) return;\n        responded = true;\n        // Target the response directly back to the window that sent the request.\n        bus.emit(\"__RESPONSE__\", { id, response: resp }, { to: source });\n      }\n      const results = msgListeners\n        .map((fn) => {\n          try {\n            // msg, sender, sendResponse\n            const ret = fn(message, { id, tab: { id: source } }, sendResponse);\n            if (ret === true || (ret && typeof ret.then === \"function\")) {\n              isAsync = true;\n              return ret;\n            }\n            return ret;\n          } catch (e) {\n            _error(e);\n          }\n        })\n        .filter((r) => r !== undefined);\n\n      const promises = results.filter((r) => r && typeof r.then === \"function\");\n      if (!isAsync && promises.length === 0) {\n        const out = results.length === 1 ? results[0] : results;\n        sendResponse(out);\n      } else if (promises.length) {\n        Promise.all(promises).then((vals) => {\n          if (!responded) {\n            const out = vals.length === 1 ? vals[0] : vals;\n            sendResponse(out);\n          }\n        });\n      }\n    });\n  }\n\n  if (type !== \"background\") {\n    bus.on(\"__RESPONSE__\", ({ id, response }) => {\n      const entry = pending[id];\n      if (!entry) return;\n      entry.resolve(response);\n      if (entry.callback) entry.callback(response);\n      delete pending[id];\n    });\n  }\n\n  function sendMessage(...args) {\n    // Background should be able to send message to itself\n    // if (type === \"background\") {\n    //   throw new Error(\"Background cannot sendMessage to itself\");\n    // }\n    const { target, message, callback } = parseArgs(args);\n    const id = nextId++;\n    const promise = new Promise((resolve) => {\n      pending[id] = { resolve, callback };\n      bus.emit(\"__REQUEST__\", { id, message });\n    });\n    return promise;\n  }\n\n  bus.on(\"__PORT_CONNECT__\", ({ portId, name }, { source }) => {\n    if (type !== \"background\") return;\n    const backgroundPort = makePort(\"background\", portId, name, source);\n    ports[portId] = backgroundPort;\n\n    onConnectListeners.forEach((fn) => fn(backgroundPort));\n\n    // send back a CONNECT_ACK so the client can\n    // start listening on its end:\n    bus.emit(\"__PORT_CONNECT_ACK__\", { portId, name }, { to: source });\n  });\n\n  // Clients handle the ACK and finalize their Port object by learning the remote window.\n  bus.on(\"__PORT_CONNECT_ACK__\", ({ portId, name }, { source }) => {\n    if (type === \"background\") return; // ignore\n    const p = ports[portId];\n    if (!p) return;\n    // Call the port's internal finalize method to complete the handshake\n    if (p._finalize) {\n      p._finalize(source);\n    }\n  });\n\n  // Any port message travels via \"__PORT_MESSAGE__\"\n  bus.on(\"__PORT_MESSAGE__\", (envelope, { source }) => {\n    const { portId } = envelope;\n    const p = ports[portId];\n    if (!p) return;\n    p._receive(envelope, source);\n  });\n\n  // Any port disconnect:\n  bus.on(\"__PORT_DISCONNECT__\", ({ portId }) => {\n    const p = ports[portId];\n    if (!p) return;\n    p._disconnect();\n    delete ports[portId];\n  });\n\n  // Refactored makePort to correctly manage internal state and the connection handshake.\n  function makePort(side, portId, name, remoteWindow) {\n    let onMessageHandlers = [];\n    let onDisconnectHandlers = [];\n    let buffer = [];\n    // Unique instance ID for this port instance\n    const instanceId = Math.random().toString(36).slice(2) + Date.now();\n    // These state variables are part of the closure and are updated by _finalize\n    let _ready = side === \"background\";\n\n    function _drainBuffer() {\n      buffer.forEach((m) => _post(m));\n      buffer = [];\n    }\n\n    function _post(msg) {\n      // Always use the 'to' parameter for port messages, making them directional.\n      // Include senderInstanceId\n      bus.emit(\n        \"__PORT_MESSAGE__\",\n        { portId, msg, senderInstanceId: instanceId },\n        { to: remoteWindow }\n      );\n    }\n\n    function postMessage(msg) {\n      if (!_ready) {\n        buffer.push(msg);\n      } else {\n        _post(msg);\n      }\n    }\n\n    function _receive(envelope, source) {\n      // envelope: { msg, senderInstanceId }\n      if (envelope.senderInstanceId === instanceId) return; // Don't dispatch to self\n      onMessageHandlers.forEach((fn) =>\n        fn(envelope.msg, { id: portId, tab: { id: source } })\n      );\n    }\n\n    function disconnect() {\n      // Also use the 'to' parameter for disconnect messages\n      bus.emit(\"__PORT_DISCONNECT__\", { portId }, { to: remoteWindow });\n      _disconnect();\n      delete ports[portId];\n    }\n\n    function _disconnect() {\n      onDisconnectHandlers.forEach((fn) => fn());\n      onMessageHandlers = [];\n      onDisconnectHandlers = [];\n    }\n\n    // This function is called on the client port when the ACK is received from background.\n    // It updates the port's state, completing the connection.\n    function _finalize(win) {\n      remoteWindow = win; // <-- This is the crucial part: learn the destination\n      _ready = true;\n      _drainBuffer();\n    }\n\n    return {\n      name,\n      sender: {\n        id: portId,\n      },\n      onMessage: {\n        addListener(fn) {\n          onMessageHandlers.push(fn);\n        },\n        removeListener(fn) {\n          onMessageHandlers = onMessageHandlers.filter((x) => x !== fn);\n        },\n      },\n      onDisconnect: {\n        addListener(fn) {\n          onDisconnectHandlers.push(fn);\n        },\n        removeListener(fn) {\n          onDisconnectHandlers = onDisconnectHandlers.filter((x) => x !== fn);\n        },\n      },\n      postMessage,\n      disconnect,\n      // Internal methods used by the runtime\n      _receive,\n      _disconnect,\n      _finalize, // Expose the finalizer for the ACK handler\n    };\n  }\n\n  function connect(connectInfo = {}) {\n    if (type === \"background\") {\n      throw new Error(\"Background must use onConnect, not connect()\");\n    }\n    const name = connectInfo.name || \"\";\n    const portId = nextPortId++;\n    // create the client side port\n    // remoteWindow is initially null; it will be set by _finalize upon ACK.\n    const clientPort = makePort(\"client\", portId, name, null);\n    ports[portId] = clientPort;\n\n    // fire the connect event across the bus\n    bus.emit(\"__PORT_CONNECT__\", { portId, name });\n    return clientPort;\n  }\n\n  function onConnect(fn) {\n    if (type !== \"background\") {\n      throw new Error(\"connect event only fires in background\");\n    }\n    onConnectListeners.push(fn);\n  }\n\n  return {\n    // rpc:\n    sendMessage,\n    onMessage: {\n      addListener(fn) {\n        msgListeners.push(fn);\n      },\n      removeListener(fn) {\n        const i = msgListeners.indexOf(fn);\n        if (i >= 0) msgListeners.splice(i, 1);\n      },\n    },\n\n    // port API:\n    connect,\n    onConnect: {\n      addListener(fn) {\n        onConnect(fn);\n      },\n      removeListener(fn) {\n        const i = onConnectListeners.indexOf(fn);\n        if (i >= 0) onConnectListeners.splice(i, 1);\n      },\n    },\n  };\n}\n\n\n// --- Abstraction Layer: PostMessage Target\n\nlet nextRequestId = 1;\nconst pendingRequests = new Map(); // requestId -> { resolve, reject, timeout }\n\nfunction sendAbstractionRequest(method, args = []) {\n  return new Promise((resolve, reject) => {\n    const requestId = nextRequestId++;\n\n    const timeout = setTimeout(() => {\n      pendingRequests.delete(requestId);\n      reject(new Error(`PostMessage request timeout for method: ${method}`));\n    }, 10000);\n\n    pendingRequests.set(requestId, { resolve, reject, timeout });\n\n    window.parent.postMessage({\n      type: \"abstraction-request\",\n      requestId,\n      method,\n      args,\n    });\n  });\n}\n\nwindow.addEventListener(\"message\", (event) => {\n  const { type, requestId, success, result, error } = event.data;\n\n  if (type === \"abstraction-response\") {\n    const pending = pendingRequests.get(requestId);\n    if (pending) {\n      clearTimeout(pending.timeout);\n      pendingRequests.delete(requestId);\n\n      if (success) {\n        pending.resolve(result);\n      } else {\n        const err = new Error(error.message);\n        err.stack = error.stack;\n        pending.reject(err);\n      }\n    }\n  }\n});\n\nasync function _storageSet(items) {\n  return sendAbstractionRequest(\"_storageSet\", [items]);\n}\n\nasync function _storageGet(keys) {\n  return sendAbstractionRequest(\"_storageGet\", [keys]);\n}\n\nasync function _storageRemove(keysToRemove) {\n  return sendAbstractionRequest(\"_storageRemove\", [keysToRemove]);\n}\n\nasync function _storageClear() {\n  return sendAbstractionRequest(\"_storageClear\");\n}\n\nasync function _cookieList(details) {\n  return sendAbstractionRequest(\"_cookieList\", [details]);\n}\n\nasync function _cookieSet(details) {\n  return sendAbstractionRequest(\"_cookieSet\", [details]);\n}\n\nasync function _cookieDelete(details) {\n  return sendAbstractionRequest(\"_cookieDelete\", [details]);\n}\n\nasync function _fetch(url, options) {\n  return sendAbstractionRequest(\"_fetch\", [url, options]);\n}\n\nfunction _registerMenuCommand(name, func) {\n  _warn(\"_registerMenuCommand called from iframe context:\", name);\n  return sendAbstractionRequest(\"_registerMenuCommand\", [\n    name,\n    func.toString(),\n  ]);\n}\n\nfunction _openTab(url, active) {\n  return sendAbstractionRequest(\"_openTab\", [url, active]);\n}\n\nasync function _initStorage() {\n  return sendAbstractionRequest(\"_initStorage\");\n}\n\n\nconst EXTENSION_ASSETS_MAP = {{EXTENSION_ASSETS_MAP}};\n\n// -- Polyfill Implementation\nfunction buildPolyfill({ isBackground = false, isOtherPage = false } = {}) {\n  // Generate a unique context ID for this polyfill instance\n  const contextType = isBackground\n    ? \"background\"\n    : isOtherPage\n      ? \"options\"\n      : \"content\";\n  const contextId = `${contextType}_${Math.random()\n    .toString(36)\n    .substring(2, 15)}`;\n\n  const IS_IFRAME = \"true\" === \"true\";\n  const BUS = (function () {\n    if (globalThis.__BUS) {\n      return globalThis.__BUS;\n    }\n    globalThis.__BUS = createEventBus(\n      \"ai-chat-exporter\",\n      IS_IFRAME ? \"iframe\" : \"page\",\n    );\n    return globalThis.__BUS;\n  })();\n  const RUNTIME = createRuntime(isBackground ? \"background\" : \"tab\", BUS);\n  const createNoopListeners = () => ({\n    addListener: (callback) => {\n      _log(\"addListener\", callback);\n    },\n    removeListener: (callback) => {\n      _log(\"removeListener\", callback);\n    },\n  });\n  // TODO: Stub\n  const storageChangeListeners = new Set();\n  function broadcastStorageChange(changes, areaName) {\n    storageChangeListeners.forEach((listener) => {\n      listener(changes, areaName);\n    });\n  }\n\n  let REQ_PERMS = [];\n\n  // --- Chrome polyfill\n  let chrome = {\n    extension: {\n      isAllowedIncognitoAccess: () => Promise.resolve(true),\n      sendMessage: (...args) => _messagingHandler.sendMessage(...args),\n    },\n    permissions: {\n      // TODO: Remove origin permission means exclude from origin in startup (when checking for content scripts)\n      request: (permissions, callback) => {\n        _log(\"permissions.request\", permissions, callback);\n        if (Array.isArray(permissions)) {\n          REQ_PERMS = [...REQ_PERMS, ...permissions];\n        }\n        if (typeof callback === \"function\") {\n          callback(permissions);\n        }\n        return Promise.resolve(permissions);\n      },\n      contains: (permissions, callback) => {\n        if (typeof callback === \"function\") {\n          callback(true);\n        }\n        return Promise.resolve(true);\n      },\n      getAll: () => {\n        return Promise.resolve({\n          permissions: EXTENSION_PERMISSIONS,\n          origins: ORIGIN_PERMISSIONS,\n        });\n      },\n      onAdded: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n    },\n    i18n: {\n      getUILanguage: () => {\n        return USED_LOCALE || \"en\";\n      },\n      getMessage: (key, substitutions = []) => {\n        if (typeof substitutions === \"string\") {\n          substitutions = [substitutions];\n        }\n        if (typeof LOCALE_KEYS !== \"undefined\" && LOCALE_KEYS[key]) {\n          return LOCALE_KEYS[key].message?.replace(\n            /\\$(\\d+)/g,\n            (match, p1) => substitutions[p1 - 1] || match,\n          );\n        }\n        return key;\n      },\n    },\n    alarms: {\n      onAlarm: createNoopListeners(),\n      create: () => {\n        _log(\"alarms.create\", arguments);\n      },\n      get: () => {\n        _log(\"alarms.get\", arguments);\n      },\n    },\n    runtime: {\n      ...RUNTIME,\n      onInstalled: createNoopListeners(),\n      onStartup: createNoopListeners(),\n      // TODO: Postmessage to parent to open options page or call openOptionsPage\n      openOptionsPage: () => {\n        // const url = chrome.runtime.getURL(OPTIONS_PAGE_PATH);\n        // console.log(\"openOptionsPage\", _openTab, url, EXTENSION_ASSETS_MAP);\n        // _openTab(url);\n        if (typeof openOptionsPage === \"function\") {\n          openOptionsPage();\n        } else if (window.parent) {\n          window.parent.postMessage({ type: \"openOptionsPage\" }, \"*\");\n        } else {\n          _warn(\"openOptionsPage not available.\");\n        }\n      },\n      getManifest: () => {\n        // The manifest object will be injected into the scope where buildPolyfill is called\n        if (typeof INJECTED_MANIFEST !== \"undefined\") {\n          return JSON.parse(JSON.stringify(INJECTED_MANIFEST)); // Return deep copy\n        }\n        _warn(\"INJECTED_MANIFEST not found for chrome.runtime.getManifest\");\n        return { name: \"Unknown\", version: \"0.0\", manifest_version: 2 };\n      },\n      getURL: (path) => {\n        if (!path) return \"\";\n        if (path.startsWith(\"/\")) {\n          path = path.substring(1);\n        }\n\n        if (typeof _createAssetUrl === \"function\") {\n          return _createAssetUrl(path);\n        }\n\n        _warn(\n          `chrome.runtime.getURL fallback for '${path}'. Assets may not be available.`,\n        );\n        // Attempt a relative path resolution (highly context-dependent and likely wrong)\n        try {\n          if (window.location.protocol.startsWith(\"http\")) {\n            return new URL(path, window.location.href).toString();\n          }\n        } catch (e) {\n          /* ignore error, fallback */\n        }\n        return path;\n      },\n      id: \"polyfilled-extension-\" + Math.random().toString(36).substring(2, 15),\n      lastError: null,\n      setUninstallURL: () => {},\n      setUpdateURL: () => {},\n      getPlatformInfo: async () => {\n        const platform = {\n          os: \"unknown\",\n          arch: \"unknown\",\n          nacl_arch: \"unknown\",\n        };\n\n        if (typeof navigator !== \"undefined\") {\n          const userAgent = navigator.userAgent.toLowerCase();\n          if (userAgent.includes(\"mac\")) platform.os = \"mac\";\n          else if (userAgent.includes(\"win\")) platform.os = \"win\";\n          else if (userAgent.includes(\"linux\")) platform.os = \"linux\";\n          else if (userAgent.includes(\"android\")) platform.os = \"android\";\n          else if (userAgent.includes(\"ios\")) platform.os = \"ios\";\n\n          if (userAgent.includes(\"x86_64\") || userAgent.includes(\"amd64\")) {\n            platform.arch = \"x86-64\";\n          } else if (userAgent.includes(\"i386\") || userAgent.includes(\"i686\")) {\n            platform.arch = \"x86-32\";\n          } else if (userAgent.includes(\"arm\")) {\n            platform.arch = \"arm\";\n          }\n        }\n\n        return platform;\n      },\n      getBrowserInfo: async () => {\n        const info = {\n          name: \"unknown\",\n          version: \"unknown\",\n          buildID: \"unknown\",\n        };\n\n        if (typeof navigator !== \"undefined\") {\n          const userAgent = navigator.userAgent;\n          if (userAgent.includes(\"Chrome\")) {\n            info.name = \"Chrome\";\n            const match = userAgent.match(/Chrome\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          } else if (userAgent.includes(\"Firefox\")) {\n            info.name = \"Firefox\";\n            const match = userAgent.match(/Firefox\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          } else if (userAgent.includes(\"Safari\")) {\n            info.name = \"Safari\";\n            const match = userAgent.match(/Version\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          }\n        }\n\n        return info;\n      },\n    },\n    storage: {\n      local: {\n        get: function (keys, callback) {\n          if (typeof _storageGet !== \"function\")\n            throw new Error(\"_storageGet not defined\");\n\n          const promise = _storageGet(keys);\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.get callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.get error:\", error);\n                callback({});\n              });\n            return;\n          }\n\n          return promise;\n        },\n        set: function (items, callback) {\n          if (typeof _storageSet !== \"function\")\n            throw new Error(\"_storageSet not defined\");\n\n          const promise = _storageSet(items).then((result) => {\n            broadcastStorageChange(items, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.set callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.set error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        remove: function (keys, callback) {\n          if (typeof _storageRemove !== \"function\")\n            throw new Error(\"_storageRemove not defined\");\n\n          const promise = _storageRemove(keys).then((result) => {\n            const changes = {};\n            const keyList = Array.isArray(keys) ? keys : [keys];\n            keyList.forEach((key) => {\n              changes[key] = { oldValue: undefined, newValue: undefined };\n            });\n            broadcastStorageChange(changes, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.remove callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.remove error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        clear: function (callback) {\n          if (typeof _storageClear !== \"function\")\n            throw new Error(\"_storageClear not defined\");\n\n          const promise = _storageClear().then((result) => {\n            broadcastStorageChange({}, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.clear callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.clear error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        onChanged: {\n          addListener: (callback) => {\n            storageChangeListeners.add(callback);\n          },\n          removeListener: (callback) => {\n            storageChangeListeners.delete(callback);\n          },\n        },\n      },\n      sync: {\n        get: function (keys, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n          return chrome.storage.local.get(keys, callback);\n        },\n        set: function (items, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.set(items).then((result) => {\n            broadcastStorageChange(items, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.set callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.set error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        remove: function (keys, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.remove(keys).then((result) => {\n            const changes = {};\n            const keyList = Array.isArray(keys) ? keys : [keys];\n            keyList.forEach((key) => {\n              changes[key] = { oldValue: undefined, newValue: undefined };\n            });\n            broadcastStorageChange(changes, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.remove callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.remove error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        clear: function (callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.clear().then((result) => {\n            broadcastStorageChange({}, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.clear callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.clear error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        onChanged: {\n          addListener: (callback) => {\n            storageChangeListeners.add(callback);\n          },\n          removeListener: (callback) => {\n            storageChangeListeners.delete(callback);\n          },\n        },\n      },\n      onChanged: {\n        addListener: (callback) => {\n          storageChangeListeners.add(callback);\n        },\n        removeListener: (callback) => {\n          storageChangeListeners.delete(callback);\n        },\n      },\n      managed: {\n        get: function (keys, callback) {\n          _warn(\"chrome.storage.managed polyfill is read-only empty.\");\n\n          const promise = Promise.resolve({});\n\n          if (typeof callback === \"function\") {\n            promise.then((result) => {\n              try {\n                callback(result);\n              } catch (e) {\n                _error(\"Error in storage.managed.get callback:\", e);\n              }\n            });\n            return;\n          }\n\n          return promise;\n        },\n      },\n    },\n    cookies: (function () {\n      const cookieChangeListeners = new Set();\n      function broadcastCookieChange(changeInfo) {\n        cookieChangeListeners.forEach((listener) => {\n          try {\n            listener(changeInfo);\n          } catch (e) {\n            _error(\"Error in cookies.onChanged listener:\", e);\n          }\n        });\n      }\n\n      function handlePromiseCallback(promise, callback) {\n        if (typeof callback === \"function\") {\n          promise\n            .then((result) => callback(result))\n            .catch((error) => {\n              // chrome.runtime.lastError = { message: error.message }; // TODO: Implement lastError\n              _error(error);\n              callback(); // Call with undefined on error\n            });\n          return;\n        }\n        return promise;\n      }\n\n      return {\n        get: function (details, callback) {\n          if (typeof _cookieList !== \"function\") {\n            return handlePromiseCallback(\n              Promise.reject(new Error(\"_cookieList not defined\")),\n              callback,\n            );\n          }\n          const promise = _cookieList({\n            url: details.url,\n            name: details.name,\n            storeId: details.storeId,\n            partitionKey: details.partitionKey,\n          }).then((cookies) => {\n            if (!cookies || cookies.length === 0) {\n              return null;\n            }\n            // Sort by path length (longest first), then creation time (earliest first, if available)\n            cookies.sort((a, b) => {\n              const pathLenDiff = (b.path || \"\").length - (a.path || \"\").length;\n              if (pathLenDiff !== 0) return pathLenDiff;\n              return (a.creationTime || 0) - (b.creationTime || 0);\n            });\n            return cookies[0];\n          });\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getAll: function (details, callback) {\n          if (typeof _cookieList !== \"function\") {\n            return handlePromiseCallback(\n              Promise.reject(new Error(\"_cookieList not defined\")),\n              callback,\n            );\n          }\n          if (details.partitionKey) {\n            _warn(\n              \"cookies.getAll: partitionKey is not fully supported in this environment.\",\n            );\n          }\n          const promise = _cookieList(details);\n          return handlePromiseCallback(promise, callback);\n        },\n\n        set: function (details, callback) {\n          const promise = (async () => {\n            if (\n              typeof _cookieSet !== \"function\" ||\n              typeof _cookieList !== \"function\"\n            ) {\n              throw new Error(\"_cookieSet or _cookieList not defined\");\n            }\n            if (details.partitionKey) {\n              _warn(\n                \"cookies.set: partitionKey is not fully supported in this environment.\",\n              );\n            }\n\n            const getDetails = {\n              url: details.url,\n              name: details.name,\n              storeId: details.storeId,\n            };\n            const oldCookies = await _cookieList(getDetails);\n            const oldCookie = oldCookies && oldCookies[0];\n\n            if (oldCookie) {\n              broadcastCookieChange({\n                cause: \"overwrite\",\n                cookie: oldCookie,\n                removed: true,\n              });\n            }\n\n            await _cookieSet(details);\n            const newCookies = await _cookieList(getDetails);\n            const newCookie = newCookies && newCookies[0];\n\n            if (newCookie) {\n              broadcastCookieChange({\n                cause: \"explicit\",\n                cookie: newCookie,\n                removed: false,\n              });\n            }\n            return newCookie || null;\n          })();\n          return handlePromiseCallback(promise, callback);\n        },\n\n        remove: function (details, callback) {\n          const promise = (async () => {\n            if (\n              typeof _cookieDelete !== \"function\" ||\n              typeof _cookieList !== \"function\"\n            ) {\n              throw new Error(\"_cookieDelete or _cookieList not defined\");\n            }\n            const oldCookies = await _cookieList(details);\n            const oldCookie = oldCookies && oldCookies[0];\n\n            if (!oldCookie) return null; // Nothing to remove\n\n            await _cookieDelete(details);\n\n            broadcastCookieChange({\n              cause: \"explicit\",\n              cookie: oldCookie,\n              removed: true,\n            });\n\n            return {\n              url: details.url,\n              name: details.name,\n              storeId: details.storeId || \"0\",\n              partitionKey: details.partitionKey,\n            };\n          })();\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getAllCookieStores: function (callback) {\n          const promise = Promise.resolve([\n            { id: \"0\", tabIds: [1] }, // Mock store for the current context\n          ]);\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getPartitionKey: function (details, callback) {\n          _warn(\n            \"chrome.cookies.getPartitionKey is not supported in this environment.\",\n          );\n          const promise = Promise.resolve({ partitionKey: {} }); // Return empty partition key\n          return handlePromiseCallback(promise, callback);\n        },\n\n        onChanged: {\n          addListener: (callback) => {\n            if (typeof callback === \"function\") {\n              cookieChangeListeners.add(callback);\n            }\n          },\n          removeListener: (callback) => {\n            cookieChangeListeners.delete(callback);\n          },\n        },\n      };\n    })(),\n    tabs: {\n      query: async (queryInfo) => {\n        _warn(\"chrome.tabs.query polyfill only returns current tab info.\");\n        const dummyId = Math.floor(Math.random() * 1000) + 1;\n        return [\n          {\n            id: dummyId,\n            url: CURRENT_LOCATION,\n            active: true,\n            windowId: 1,\n            status: \"complete\",\n          },\n        ];\n      },\n      create: async ({ url, active = true }) => {\n        _log(`[Polyfill tabs.create] URL: ${url}`);\n        if (typeof _openTab !== \"function\")\n          throw new Error(\"_openTab not defined\");\n        _openTab(url, active);\n        const dummyId = Math.floor(Math.random() * 1000) + 1001;\n        return Promise.resolve({\n          id: dummyId,\n          url: url,\n          active,\n          windowId: 1,\n        });\n      },\n      sendMessage: async (tabId, message) => {\n        _warn(\n          `chrome.tabs.sendMessage polyfill (to tab ${tabId}) redirects to runtime.sendMessage (current context).`,\n        );\n        return chrome.runtime.sendMessage(message);\n      },\n      onActivated: createNoopListeners(),\n      onUpdated: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n      onReplaced: createNoopListeners(),\n      onCreated: createNoopListeners(),\n      onMoved: createNoopListeners(),\n      onDetached: createNoopListeners(),\n      onAttached: createNoopListeners(),\n    },\n    windows: {\n      onFocusChanged: createNoopListeners(),\n      onCreated: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n      onFocused: createNoopListeners(),\n      onFocus: createNoopListeners(),\n      onBlur: createNoopListeners(),\n      onFocused: createNoopListeners(),\n    },\n    notifications: {\n      create: async (notificationId, options) => {\n        try {\n          let id = notificationId;\n          let notificationOptions = options;\n\n          if (typeof notificationId === \"object\" && notificationId !== null) {\n            notificationOptions = notificationId;\n            id = \"notification_\" + Math.random().toString(36).substring(2, 15);\n          } else if (typeof notificationId === \"string\" && options) {\n            id = notificationId;\n            notificationOptions = options;\n          } else {\n            throw new Error(\"Invalid parameters for notifications.create\");\n          }\n\n          if (!notificationOptions || typeof notificationOptions !== \"object\") {\n            throw new Error(\"Notification options must be an object\");\n          }\n\n          const {\n            title,\n            message,\n            iconUrl,\n            type = \"basic\",\n          } = notificationOptions;\n\n          if (!title || !message) {\n            throw new Error(\"Notification must have title and message\");\n          }\n\n          if (\"Notification\" in window) {\n            if (Notification.permission === \"granted\") {\n              const notification = new Notification(title, {\n                body: message,\n                icon: iconUrl,\n                tag: id,\n              });\n\n              _log(`[Notifications] Created notification: ${id}`);\n              return id;\n            } else if (Notification.permission === \"default\") {\n              const permission = await Notification.requestPermission();\n              if (permission === \"granted\") {\n                const notification = new Notification(title, {\n                  body: message,\n                  icon: iconUrl,\n                  tag: id,\n                });\n                _log(\n                  `[Notifications] Created notification after permission: ${id}`,\n                );\n                return id;\n              } else {\n                _warn(\"[Notifications] Permission denied for notifications\");\n                return id;\n              }\n            } else {\n              _warn(\"[Notifications] Notifications are blocked\");\n              return id;\n            }\n          } else {\n            _warn(\n              \"[Notifications] Native notifications not supported, using console fallback\",\n            );\n            _log(`[Notification] ${title}: ${message}`);\n            return id;\n          }\n        } catch (error) {\n          _error(\"[Notifications] Error creating notification:\", error.message);\n          throw error;\n        }\n      },\n      clear: async (notificationId) => {\n        _log(`[Notifications] Clear notification: ${notificationId}`);\n        // For native notifications, there's no direct way to clear by ID\n        // This is a limitation of the Web Notifications API\n        return true;\n      },\n      getAll: async () => {\n        _warn(\"[Notifications] getAll not fully supported in polyfill\");\n        return {};\n      },\n      getPermissionLevel: async () => {\n        if (\"Notification\" in window) {\n          const permission = Notification.permission;\n          return { level: permission === \"granted\" ? \"granted\" : \"denied\" };\n        }\n        return { level: \"denied\" };\n      },\n    },\n    contextMenus: {\n      create: (createProperties, callback) => {\n        try {\n          if (!createProperties || typeof createProperties !== \"object\") {\n            throw new Error(\"Context menu create properties must be an object\");\n          }\n\n          const { id, title, contexts = [\"page\"], onclick } = createProperties;\n          const menuId =\n            id || `menu_${Math.random().toString(36).substring(2, 15)}`;\n\n          if (!title || typeof title !== \"string\") {\n            throw new Error(\"Context menu must have a title\");\n          }\n\n          // Store menu items for potential use\n          if (!window._polyfillContextMenus) {\n            window._polyfillContextMenus = new Map();\n          }\n\n          window._polyfillContextMenus.set(menuId, {\n            id: menuId,\n            title,\n            contexts,\n            onclick,\n            enabled: createProperties.enabled !== false,\n          });\n\n          _log(\n            `[ContextMenus] Created context menu item: ${title} (${menuId})`,\n          );\n\n          // Try to register a menu command as fallback\n          if (typeof _registerMenuCommand === \"function\") {\n            try {\n              _registerMenuCommand(\n                title,\n                onclick ||\n                  (() => {\n                    _log(`Context menu clicked: ${title}`);\n                  }),\n              );\n            } catch (e) {\n              _warn(\n                \"[ContextMenus] Failed to register as menu command:\",\n                e.message,\n              );\n            }\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n\n          return menuId;\n        } catch (error) {\n          _error(\"[ContextMenus] Error creating context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n          throw error;\n        }\n      },\n      update: (id, updateProperties, callback) => {\n        try {\n          if (\n            !window._polyfillContextMenus ||\n            !window._polyfillContextMenus.has(id)\n          ) {\n            throw new Error(`Context menu item not found: ${id}`);\n          }\n\n          const menuItem = window._polyfillContextMenus.get(id);\n          Object.assign(menuItem, updateProperties);\n\n          _log(`[ContextMenus] Updated context menu item: ${id}`);\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\"[ContextMenus] Error updating context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      remove: (menuItemId, callback) => {\n        try {\n          if (\n            window._polyfillContextMenus &&\n            window._polyfillContextMenus.has(menuItemId)\n          ) {\n            window._polyfillContextMenus.delete(menuItemId);\n            _log(`[ContextMenus] Removed context menu item: ${menuItemId}`);\n          } else {\n            _warn(\n              `[ContextMenus] Context menu item not found for removal: ${menuItemId}`,\n            );\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\"[ContextMenus] Error removing context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      removeAll: (callback) => {\n        try {\n          if (window._polyfillContextMenus) {\n            const count = window._polyfillContextMenus.size;\n            window._polyfillContextMenus.clear();\n            _log(`[ContextMenus] Removed all ${count} context menu items`);\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\n            \"[ContextMenus] Error removing all context menus:\",\n            error.message,\n          );\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      onClicked: {\n        addListener: (callback) => {\n          if (!window._polyfillContextMenuListeners) {\n            window._polyfillContextMenuListeners = new Set();\n          }\n          window._polyfillContextMenuListeners.add(callback);\n          _log(\"[ContextMenus] Added click listener\");\n        },\n        removeListener: (callback) => {\n          if (window._polyfillContextMenuListeners) {\n            window._polyfillContextMenuListeners.delete(callback);\n            _log(\"[ContextMenus] Removed click listener\");\n          }\n        },\n      },\n    },\n  };\n\n  const tc = (fn) => {\n    try {\n      fn();\n    } catch (e) {}\n  };\n  const loggingProxyHandler = (_key) => ({\n    get(target, key, receiver) {\n      tc(() => _log(`[${contextType}] [CHROME - ${_key}] Getting ${key}`));\n      return Reflect.get(target, key, receiver);\n    },\n    set(target, key, value, receiver) {\n      tc(() =>\n        _log(`[${contextType}] [CHROME - ${_key}] Setting ${key} to ${value}`),\n      );\n      return Reflect.set(target, key, value, receiver);\n    },\n    has(target, key) {\n      tc(() =>\n        _log(`[${contextType}] [CHROME - ${_key}] Checking if ${key} exists`),\n      );\n      return Reflect.has(target, key);\n    },\n  });\n  chrome = Object.fromEntries(\n    Object.entries(chrome).map(([key, value]) => [\n      key,\n      new Proxy(value, loggingProxyHandler(key)),\n    ]),\n  );\n\n  // Alias browser to chrome for common Firefox pattern\n  const browser = new Proxy(chrome, loggingProxyHandler);\n\n  const oldGlobalThis = globalThis;\n  const oldWindow = window;\n  const oldSelf = self;\n  const oldGlobal = globalThis;\n  const __globalsStorage = {};\n\n  const TO_MODIFY = [oldGlobalThis, oldWindow, oldSelf, oldGlobal];\n  const set = (k, v) => {\n    __globalsStorage[k] = v;\n    TO_MODIFY.forEach((target) => {\n      target[k] = v;\n    });\n  };\n  const proxyHandler = {\n    get(target, key, receiver) {\n      const fns = [\n        () => __globalsStorage[key],\n        () => Reflect.get(target, key, target),\n        () => target[key],\n      ];\n      const out = fns\n        .map((f) => {\n          try {\n            let out = f();\n            return out;\n          } catch (e) {\n            return undefined;\n          }\n        })\n        .find((f) => f !== undefined);\n      if (typeof out === \"function\") {\n        return out.bind(target);\n      }\n      return out;\n    },\n    set(target, key, value, receiver) {\n      try {\n        tc(() => _log(`[${contextType}] Setting ${key} to ${value}`));\n        set(key, value);\n        return Reflect.set(target, key, value, receiver);\n      } catch (e) {\n        _error(\"Error setting\", key, value, e);\n        try {\n          target[key] = value;\n          return true;\n        } catch (e) {\n          _error(\"Error setting\", key, value, e);\n        }\n        return false;\n      }\n    },\n    has(target, key) {\n      try {\n        return key in __globalsStorage || key in target;\n      } catch (e) {\n        _error(\"Error has\", key, e);\n        try {\n          return key in __globalsStorage || key in target;\n        } catch (e) {\n          _error(\"Error has\", key, e);\n        }\n        return false;\n      }\n    },\n    getOwnPropertyDescriptor(target, key) {\n      try {\n        if (key in __globalsStorage) {\n          return {\n            configurable: true,\n            enumerable: true,\n            writable: true,\n            value: __globalsStorage[key],\n          };\n        }\n        // fall back to the real globalThis\n        const desc = Reflect.getOwnPropertyDescriptor(target, key);\n        // ensure it's configurable so the with‑scope binding logic can override it\n        if (desc && !desc.configurable) {\n          desc.configurable = true;\n        }\n        return desc;\n      } catch (e) {\n        _error(\"Error getOwnPropertyDescriptor\", key, e);\n        return {\n          configurable: true,\n          enumerable: true,\n          writable: true,\n          value: undefined,\n        };\n      }\n    },\n\n    defineProperty(target, key, descriptor) {\n      try {\n        // Normalize descriptor to avoid mixed accessor & data attributes\n        const hasAccessor = \"get\" in descriptor || \"set\" in descriptor;\n\n        if (hasAccessor) {\n          // Build a clean descriptor without value/writable when accessors present\n          const normalized = {\n            configurable:\n              \"configurable\" in descriptor ? descriptor.configurable : true,\n            enumerable:\n              \"enumerable\" in descriptor ? descriptor.enumerable : false,\n          };\n          if (\"get\" in descriptor) normalized.get = descriptor.get;\n          if (\"set\" in descriptor) normalized.set = descriptor.set;\n\n          // Store accessor references for inspection but avoid breaking invariants\n          set(key, {\n            get: descriptor.get,\n            set: descriptor.set,\n          });\n\n          return Reflect.defineProperty(target, key, normalized);\n        }\n\n        // Data descriptor path\n        set(key, descriptor.value);\n        return Reflect.defineProperty(target, key, descriptor);\n      } catch (e) {\n        _error(\"Error defineProperty\", key, descriptor, e);\n        return false;\n      }\n    },\n  };\n\n  // Create proxies once proxyHandler is defined\n  const proxyWindow = new Proxy(oldWindow, proxyHandler);\n  const proxyGlobalThis = new Proxy(oldGlobalThis, proxyHandler);\n  const proxyGlobal = new Proxy(oldGlobal, proxyHandler);\n  const proxySelf = new Proxy(oldSelf, proxyHandler);\n\n  // Seed storage with core globals so lookups succeed inside `with` blocks\n  Object.assign(__globalsStorage, {\n    chrome,\n    browser,\n    window: proxyWindow,\n    globalThis: proxyGlobalThis,\n    global: proxyGlobal,\n    self: proxySelf,\n    document: oldWindow.document,\n  });\n\n  const __globals = {\n    chrome,\n    browser,\n    window: proxyWindow,\n    globalThis: proxyGlobalThis,\n    global: proxyGlobal,\n    self: proxySelf,\n    __globals: __globalsStorage,\n  };\n\n  __globals.contextId = contextId;\n  __globals.contextType = contextType;\n  __globals.module = undefined;\n  __globals.amd = undefined;\n  __globals.define = undefined;\n  __globals.importScripts = (...args) => {\n    _log(\"importScripts\", args);\n  };\n\n  return __globals;\n}\n\n\nif (typeof window !== 'undefined') {\n    window.buildPolyfill = buildPolyfill;\n}\n"
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