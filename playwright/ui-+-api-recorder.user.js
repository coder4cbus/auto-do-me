// ==UserScript==
// @name        UI + API Recorder
// @version     0.3.8
// @description One-click capture: tab video, network calls, UI actions, and a ready-to-run Playwright spec. All local, nothing uploaded.
// @namespace   ui-api-recorder
// @author      Converter Script
// @match       *://*/*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_registerMenuCommand
// @grant       GM_openInTab
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAqklEQVR4nO3Pyw2AMBAD0Zwog/5Lohu4I5RA9jML2JLv81rTNC1k27rs59NN3V0Fj043T0WXwXjGpyIiwtMgGfFhiMx4dwQR74Yg410QdLwJQIebEHSwGUHH/htAh5oRdKQAdKQJQAeaEXScAHScANURw3gBBHAAVEXcjhegAqAa4nF8JcR0/CcANMIcTyLc4gmEe3wmIiw+GpISHoVIj/fA0M3dvS5Y++sO3W7pg+WsIFUAAAAASUVORK5CYII=
// @run-at      document-start
// ==/UserScript==

console.log("Script start:",performance.now());const e=!0,t=e=>e,o="passthrough";let s,c={createHTML:t,createScript:t,createScriptURL:t},i=!1;const r=()=>{try{void 0!==window.isSecureContext&&window.isSecureContext&&window.trustedTypes&&window.trustedTypes.createPolicy&&(i=!0,trustedTypes.defaultPolicy?(l("TT Default Policy exists"),c=window.trustedTypes.createPolicy("default",c),s=trustedTypes.defaultPolicy,l(`Created custom passthrough policy, in case the default policy is too restrictive: Use Policy '${o}' in var 'TTP':`,c)):s=c=window.trustedTypes.createPolicy("default",c),l("Trusted-Type Policies: TTP:",c,"TTP_default:",s))}catch(e){l(e)}},l=(...e)=>{console.log(...e)};r();

(function() {
    // #region Logging
	
	  const SCRIPT_NAME = "UI + API Recorder";
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
			  "src/popup/popup.html": "<!doctype html>\n<html lang=\"zh\">\n<head>\n<meta charset=\"utf-8\">\n<title>Recorder</title>\n<link rel=\"stylesheet\" href=\"data:text/css;base64,Ym9keSB7CiAgd2lkdGg6IDM0MHB4OwogIG1hcmdpbjogMDsKICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAiU2Vnb2UgVUkiLCBzYW5zLXNlcmlmOwogIGZvbnQtc2l6ZTogMTNweDsKICBjb2xvcjogIzIyMjsKfQouaGVhZGVyIHsKICBwYWRkaW5nOiAxMHB4IDEycHg7CiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZWU7CiAgZGlzcGxheTogZmxleDsKICBhbGlnbi1pdGVtczogY2VudGVyOwogIGdhcDogMTJweDsKfQouc3RhdHVzIHsKICBmb250LXNpemU6IDEycHg7CiAgcGFkZGluZzogMnB4IDhweDsKICBib3JkZXItcmFkaXVzOiAxMHB4Owp9Ci5zdGF0dXMuaWRsZSB7IGJhY2tncm91bmQ6ICNlZWU7IGNvbG9yOiAjNTU1OyB9Ci5zdGF0dXMucmVjb3JkaW5nIHsgYmFja2dyb3VuZDogI2ZmZWJlZTsgY29sb3I6ICNjNjI4Mjg7IGFuaW1hdGlvbjogcHVsc2UgMS4ycyBpbmZpbml0ZTsgfQpAa2V5ZnJhbWVzIHB1bHNlIHsgMCUsMTAwJSB7IG9wYWNpdHk6IDE7IH0gNTAlIHsgb3BhY2l0eTogLjY7IH0gfQouc3RhdHMgeyBmb250LXNpemU6IDExcHg7IGNvbG9yOiAjNjY2OyB9Ci5zZWN0aW9uIHsKICBwYWRkaW5nOiA4cHggMTJweDsKICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Y1ZjVmNTsKfQouc2VjdGlvbi10aXRsZSB7CiAgZm9udC1zaXplOiAxMXB4OwogIGZvbnQtd2VpZ2h0OiA2MDA7CiAgY29sb3I6ICM4ODg7CiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsKICBtYXJnaW4tYm90dG9tOiA2cHg7Cn0KbGFiZWwgewogIGRpc3BsYXk6IGZsZXg7CiAgYWxpZ24taXRlbXM6IGNlbnRlcjsKICBnYXA6IDZweDsKICBtYXJnaW46IDRweCAwOwogIGZvbnQtc2l6ZTogMTJweDsKfQpsYWJlbC5pbmxpbmUgewogIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsKfQpsYWJlbC5pbmxpbmUgPiBzcGFuOmZpcnN0LWNoaWxkIHsKICBmbGV4OiAwIDAgNzBweDsKICBjb2xvcjogIzU1NTsKfQppbnB1dFt0eXBlPXRleHRdLCBpbnB1dDpub3QoW3R5cGVdKSwgdGV4dGFyZWEgewogIGZsZXg6IDE7CiAgZm9udC1zaXplOiAxMnB4OwogIHBhZGRpbmc6IDNweCA2cHg7CiAgYm9yZGVyOiAxcHggc29saWQgI2NjYzsKICBib3JkZXItcmFkaXVzOiAzcHg7CiAgZm9udC1mYW1pbHk6IHVpLW1vbm9zcGFjZSwgU0ZNb25vLVJlZ3VsYXIsIE1lbmxvLCBDb25zb2xhcywgbW9ub3NwYWNlOwogIHJlc2l6ZTogdmVydGljYWw7Cn0KbGFiZWwuaW5saW5lLmNvbCB7CiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7CiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICBnYXA6IDRweDsKfQpsYWJlbC5pbmxpbmUuY29sID4gc3BhbjpmaXJzdC1jaGlsZCB7CiAgZmxleDogbm9uZTsKICBjb2xvcjogIzU1NTsKfQpsYWJlbC5pbmxpbmUuY29sIHRleHRhcmVhIHsgd2lkdGg6IDEwMCU7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH0KLmFjdGlvbnMgewogIGRpc3BsYXk6IGZsZXg7CiAgZ2FwOiA2cHg7CiAgcGFkZGluZzogMTBweCAxMnB4Owp9CmJ1dHRvbiB7CiAgZmxleDogMTsKICBmb250LXNpemU6IDEzcHg7CiAgcGFkZGluZzogNnB4IDEwcHg7CiAgYm9yZGVyOiAxcHggc29saWQgI2QwZDdkZTsKICBiYWNrZ3JvdW5kOiAjZjZmOGZhOwogIGJvcmRlci1yYWRpdXM6IDRweDsKICBjdXJzb3I6IHBvaW50ZXI7Cn0KYnV0dG9uOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsgYmFja2dyb3VuZDogI2VlZjFmNTsgfQpidXR0b246ZGlzYWJsZWQgeyBvcGFjaXR5OiAuNTsgY3Vyc29yOiBub3QtYWxsb3dlZDsgfQouZmlsdGVyLWluZm8sIC5oaW50IHsKICBwYWRkaW5nOiAwIDEycHggOHB4OwogIGZvbnQtc2l6ZTogMTFweDsKICBjb2xvcjogIzg4ODsKICB3b3JkLWJyZWFrOiBicmVhay1hbGw7Cn0KLmhpbnQgeyBjb2xvcjogIzJlN2QzMjsgfQoKLyog5Lik5Liq5Li75byA5YWz77ya5pu05aSn5pu06YaS55uuICovCmxhYmVsLm1hc3RlciB7CiAgZm9udC1zaXplOiAxNHB4OwogIGZvbnQtd2VpZ2h0OiA2MDA7CiAgbWFyZ2luOiA4cHggMCAycHg7Cn0KbGFiZWwubWFzdGVyIGlucHV0W3R5cGU9Y2hlY2tib3hdIHsKICB3aWR0aDogMTZweDsKICBoZWlnaHQ6IDE2cHg7Cn0KLm1hc3Rlci1kZXNjIHsKICBmb250LXNpemU6IDExcHg7CiAgY29sb3I6ICM5OTk7CiAgbWFyZ2luOiAwIDAgOHB4IDIycHg7CiAgbGluZS1oZWlnaHQ6IDEuNDsKfQoKLyog5pu05aSa77yI6auY57qn6K6+572u77yJ5oqY5Y+g5Yy6ICovCmRldGFpbHMjbW9yZSB7CiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmNWY1ZjU7Cn0KZGV0YWlscyNtb3JlID4gc3VtbWFyeSB7CiAgbGlzdC1zdHlsZTogbm9uZTsKICBjdXJzb3I6IHBvaW50ZXI7CiAgcGFkZGluZzogOXB4IDEycHg7CiAgZm9udC1zaXplOiAxMnB4OwogIGZvbnQtd2VpZ2h0OiA2MDA7CiAgY29sb3I6ICM1NTU7CiAgdXNlci1zZWxlY3Q6IG5vbmU7Cn0KZGV0YWlscyNtb3JlID4gc3VtbWFyeTo6LXdlYmtpdC1kZXRhaWxzLW1hcmtlciB7IGRpc3BsYXk6IG5vbmU7IH0KZGV0YWlscyNtb3JlID4gc3VtbWFyeTo6YmVmb3JlIHsKICBjb250ZW50OiAn4pa4ICc7CiAgZGlzcGxheTogaW5saW5lLWJsb2NrOwogIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuMTVzOwp9CmRldGFpbHMjbW9yZVtvcGVuXSA+IHN1bW1hcnk6OmJlZm9yZSB7CiAgY29udGVudDogJ+KWviAnOwp9CmRldGFpbHMjbW9yZSA+IHN1bW1hcnk6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjZmFmYWZhOyB9CmRldGFpbHMjbW9yZSAuc2VjdGlvbjpsYXN0LWNoaWxkIHsgYm9yZGVyLWJvdHRvbTogbm9uZTsgfQo=\">\n</head>\n<body>\n<div class=\"header\">\n  <span id=\"status\" class=\"status idle\">空闲</span>\n  <span id=\"stats\" class=\"stats\"></span>\n</div>\n<div id=\"tab-warn\" class=\"filter-info\" style=\"display:none;color:#b25b00;font-weight:600;\"></div>\n\n<!-- 导出文件名前缀：放最上 -->\n<div class=\"section\">\n  <div class=\"section-title\">导出文件名前缀</div>\n  <label class=\"inline col\"><input id=\"export-prefix\" placeholder=\"recording\"></label>\n  <div class=\"filter-info\">最终文件名:&lt;前缀&gt;-时间戳.zip</div>\n</div>\n\n<!-- 两个主开关 -->\n<div class=\"section\">\n  <label class=\"master\"><input type=\"checkbox\" id=\"cb-master-api\"> <span>录制后端 API</span></label>\n  <div class=\"master-desc\">产物: events.json(API) + api-details.json</div>\n  <label class=\"master\"><input type=\"checkbox\" id=\"cb-master-fe\"> <span>录制前端操作</span></label>\n  <div class=\"master-desc\">产物: events.json(UI) + video.webm</div>\n</div>\n\n<!-- 后端 API 过滤 -->\n<div class=\"section\">\n  <div class=\"section-title\">后端 API 过滤(每行一条,支持正则;多行=任意命中)</div>\n  <label class=\"inline col\">\n    <span>include</span>\n    <textarea id=\"api-include\" rows=\"2\" placeholder=\"留空=全部&#10;例:&#10;/api/order&#10;/api/user\"></textarea>\n  </label>\n  <label class=\"inline col\">\n    <span>exclude</span>\n    <textarea id=\"api-exclude\" rows=\"3\"></textarea>\n  </label>\n</div>\n\n<!-- 更多（高级设置）：默认折叠 -->\n<details id=\"more\">\n  <summary>更多 (高级设置)</summary>\n\n  <div class=\"section\">\n    <div class=\"section-title\">Hover 弹框/按钮捕捉</div>\n    <label><input type=\"checkbox\" id=\"cb-captureHover\"> <span>启用 hover→click 回溯绑定</span></label>\n    <div class=\"filter-info\">仅录制前端操作时生效;无后续 click 的 hover 全部丢弃</div>\n    <label class=\"inline\">\n      <span>TTL(ms)</span>\n      <input id=\"hover-ttl\" type=\"number\" min=\"100\" max=\"10000\" step=\"100\" placeholder=\"3000\">\n    </label>\n    <label class=\"inline\">\n      <span>几何距离阈值(px)</span>\n      <input id=\"hover-geom\" type=\"number\" min=\"20\" max=\"2000\" step=\"10\" placeholder=\"240\">\n    </label>\n  </div>\n\n  <div class=\"section\">\n    <div class=\"section-title\">完整 UI 描述的上下文</div>\n    <div class=\"filter-info\">仅\"录制前端操作\"时生效;数值越小 events.json 越精简</div>\n    <label class=\"inline\">\n      <span>同级兄弟数(semanticPeers)</span>\n      <input id=\"max-peers\" type=\"number\" min=\"0\" max=\"50\" step=\"1\" placeholder=\"3\">\n    </label>\n    <label class=\"inline\">\n      <span>祖先链层数(ancestors)</span>\n      <input id=\"max-anc\" type=\"number\" min=\"0\" max=\"20\" step=\"1\" placeholder=\"3\">\n    </label>\n  </div>\n\n  <div class=\"section\">\n    <div class=\"section-title\">Playwright 脚本</div>\n    <label><input type=\"checkbox\" id=\"cb-emitPlaywright\"> <span>生成 test.spec.ts(依赖前端操作)</span></label>\n  </div>\n</details>\n\n<div class=\"actions\">\n  <button id=\"btn-start\">开始</button>\n  <button id=\"btn-stop\" disabled>停止</button>\n  <button id=\"btn-export\">导出</button>\n</div>\n\n<div id=\"filter-info\" class=\"filter-info\"></div>\n<div id=\"hint\" class=\"hint\"></div>\n\n<script type=\"module\" src=\"data:text/javascript;base64,aW1wb3J0IHsgTVNHLCBERUZBVUxUX0NPTkZJRyB9IGZyb20gJy4uL2NvbW1vbi91dGlscy5qcyc7Cgpjb25zdCAkID0gaWQgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpOwoKYXN5bmMgZnVuY3Rpb24gYWN0aXZlVGFiKCkgewogIGNvbnN0IFt0YWJdID0gYXdhaXQgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSk7CiAgcmV0dXJuIHRhYjsKfQoKLy8g5Lik5Liq5Li75byA5YWz5bGV5byA5oiQ55qE5bqV5bGC6YWN572u6ZSuCi8vICDlvZXliLblkI7nq68gQVBJICDihpIg5oqTIEFQSSArIOWvvOWHuiBBUEkg5LqL5Lu2ICsgYXBpLWRldGFpbHMuanNvbgovLyAg5b2V5Yi25YmN56uv5pON5L2cICDihpIg5bGP5bmV5b2V5YOPICsg5oqT5YmN56uv5q2l6aqkICsg5a+85Ye6IFVJIOS6i+S7tgovLyBldmVudHMuanNvbihvdXRFdmVudHMpIOmaj+S7u+S4gOS4u+W8gOWFs+iHquWKqOW8gOWQryzlhoXlrrnpmo/li77pgInlkIjlubYgVUkgLyBBUEnjgIIKY29uc3QgTUFTVEVSX0FQSV9LRVlTID0gWydjYXB0dXJlQXBpJywgJ2V4cG9ydEFwaScsICdvdXRBcGlEZXRhaWxzJ107CmNvbnN0IE1BU1RFUl9GRV9LRVlTID0gWydyZWNvcmRWaWRlbycsICdvdXRWaWRlbycsICdjYXB0dXJlQWN0aW9ucycsICdleHBvcnRBY3Rpb25zJ107CgovLyDjgIzmm7TlpJrjgI3ph4znm7TmjqXlr7nlupTljZXkuKrphY3nva7plK7nmoTli77pgInmoYbvvIhpZD1jYi08a2V5Pu+8iQpjb25zdCBDSEVDS0JPWEVTID0gWydjYXB0dXJlSG92ZXInLCAnZW1pdFBsYXl3cmlnaHQnXTsKY29uc3QgVEVYVF9GSUVMRFMgPSB7CiAgJ2FwaS1pbmNsdWRlJzogJ2FwaUluY2x1ZGUnLAogICdhcGktZXhjbHVkZSc6ICdhcGlFeGNsdWRlJywKICAnZXhwb3J0LXByZWZpeCc6ICdleHBvcnRQcmVmaXgnLAp9Owpjb25zdCBOVU1fRklFTERTID0gewogICdob3Zlci10dGwnOiAnaG92ZXJUdGxNcycsCiAgJ2hvdmVyLWdlb20nOiAnaG92ZXJHZW9tVGhyZXNob2xkJywKICAnbWF4LXBlZXJzJzogJ21heFNlbWFudGljUGVlcnMnLAogICdtYXgtYW5jJzogJ21heEFuY2VzdG9ycycsCn07CgpsZXQgY2ZnID0geyAuLi5ERUZBVUxUX0NPTkZJRyB9OwoKYXN5bmMgZnVuY3Rpb24gaW5pdCgpIHsKICBjZmcgPSAoYXdhaXQgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBjbWQ6IE1TRy5DT05GSUdfR0VUIH0pKSB8fCB7IC4uLkRFRkFVTFRfQ09ORklHIH07CgogIC8vIOS4u+W8gOWFs+WbnuWhqwogICQoJ2NiLW1hc3Rlci1hcGknKS5jaGVja2VkID0gISFjZmcuY2FwdHVyZUFwaTsKICAkKCdjYi1tYXN0ZXItZmUnKS5jaGVja2VkID0gISEoY2ZnLmNhcHR1cmVBY3Rpb25zIHx8IGNmZy5yZWNvcmRWaWRlbyk7CgogIC8vIOOAjOabtOWkmuOAjeWNlemhueWbnuWhqwogIGZvciAoY29uc3QgayBvZiBDSEVDS0JPWEVTKSB7IGNvbnN0IGVsID0gJChgY2ItJHtrfWApOyBpZiAoZWwpIGVsLmNoZWNrZWQgPSAhIWNmZ1trXTsgfQogIGZvciAoY29uc3QgW2lkLCBrZXldIG9mIE9iamVjdC5lbnRyaWVzKFRFWFRfRklFTERTKSkgJChpZCkudmFsdWUgPSBjZmdba2V5XSA/PyAnJzsKICBmb3IgKGNvbnN0IFtpZCwga2V5XSBvZiBPYmplY3QuZW50cmllcyhOVU1fRklFTERTKSkgJChpZCkudmFsdWUgPSBjZmdba2V5XSA/PyAnJzsKCiAgc3luY0RlcHMoKTsKCiAgLy8g4oCU4oCUIOS4u+W8gOWFszrkuIDplK7orr7nva7kuIDnu4TlupXlsYLplK4g4oCU4oCUCiAgJCgnY2ItbWFzdGVyLWFwaScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGFzeW5jIGUgPT4gewogICAgYXdhaXQgYXBwbHlNYXN0ZXIoTUFTVEVSX0FQSV9LRVlTLCBlLnRhcmdldC5jaGVja2VkKTsKICB9KTsKICAkKCdjYi1tYXN0ZXItZmUnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBhc3luYyBlID0+IHsKICAgIGF3YWl0IGFwcGx5TWFzdGVyKE1BU1RFUl9GRV9LRVlTLCBlLnRhcmdldC5jaGVja2VkKTsKICB9KTsKCiAgLy8g44CM5pu05aSa44CN5Y2V6aG55Y2z5pe25L+d5a2YCiAgZm9yIChjb25zdCBrIG9mIENIRUNLQk9YRVMpIHsKICAgIGNvbnN0IGVsID0gJChgY2ItJHtrfWApOwogICAgaWYgKCFlbCkgY29udGludWU7CiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHsKICAgICAgY2ZnW2tdID0gZS50YXJnZXQuY2hlY2tlZDsKICAgICAgY29uc3QgcGF0Y2ggPSB7IFtrXTogZS50YXJnZXQuY2hlY2tlZCB9OwogICAgICAvLyB0ZXN0LnNwZWMudHMg5Lqn54mp6Lef6ZqPIGVtaXRQbGF5d3JpZ2h0CiAgICAgIGlmIChrID09PSAnZW1pdFBsYXl3cmlnaHQnKSB7IGNmZy5vdXRTcGVjID0gZS50YXJnZXQuY2hlY2tlZDsgcGF0Y2gub3V0U3BlYyA9IGUudGFyZ2V0LmNoZWNrZWQ7IH0KICAgICAgc2F2ZU1hbnkocGF0Y2gpOwogICAgICBzeW5jRGVwcygpOwogICAgfSk7CiAgfQogIGZvciAoY29uc3QgW2lkLCBrZXldIG9mIE9iamVjdC5lbnRyaWVzKFRFWFRfRklFTERTKSkgewogICAgJChpZCkuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBlID0+IHsgY2ZnW2tleV0gPSBlLnRhcmdldC52YWx1ZTsgc2F2ZU1hbnkoeyBba2V5XTogZS50YXJnZXQudmFsdWUgfSk7IH0pOwogIH0KICBmb3IgKGNvbnN0IFtpZCwga2V5XSBvZiBPYmplY3QuZW50cmllcyhOVU1fRklFTERTKSkgewogICAgJChpZCkuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBlID0+IHsKICAgICAgY29uc3QgdiA9IE51bWJlcihlLnRhcmdldC52YWx1ZSk7CiAgICAgIC8vIGhvdmVyIOebuOWFs+imgeaxgiA+IDA75LiK5LiL5paH5oiq5patKG1heFNlbWFudGljUGVlcnMvbWF4QW5jZXN0b3JzKeWFgeiuuCAwKD3kuI3orrApCiAgICAgIGNvbnN0IGFsbG93WmVybyA9IChrZXkgPT09ICdtYXhTZW1hbnRpY1BlZXJzJyB8fCBrZXkgPT09ICdtYXhBbmNlc3RvcnMnKTsKICAgICAgaWYgKE51bWJlci5pc0Zpbml0ZSh2KSAmJiAoYWxsb3daZXJvID8gdiA+PSAwIDogdiA+IDApKSB7IGNmZ1trZXldID0gdjsgc2F2ZU1hbnkoeyBba2V5XTogdiB9KTsgfQogICAgfSk7CiAgfQoKICBhd2FpdCByZWZyZXNoKCk7CiAgc2V0SW50ZXJ2YWwocmVmcmVzaCwgMTAwMCk7Cn0KCi8vIOS4u+W8gOWFszrmiorkuIDnu4TplK7nu5/kuIDorr7kuLogb24vb2ZmLOW5tuiBlOWKqCBvdXRFdmVudHPvvIjku7vkuIDkuLvlvIDlhbMgb24g5Y2z5L+d55WZIGV2ZW50cy5qc29u77yJCmFzeW5jIGZ1bmN0aW9uIGFwcGx5TWFzdGVyKGtleXMsIG9uKSB7CiAgY29uc3QgcGF0Y2ggPSB7fTsKICBmb3IgKGNvbnN0IGsgb2Yga2V5cykgeyBjZmdba10gPSBvbjsgcGF0Y2hba10gPSBvbjsgfQogIGNvbnN0IGFwaU9uID0gJCgnY2ItbWFzdGVyLWFwaScpLmNoZWNrZWQ7CiAgY29uc3QgZmVPbiA9ICQoJ2NiLW1hc3Rlci1mZScpLmNoZWNrZWQ7CiAgY2ZnLm91dEV2ZW50cyA9IGFwaU9uIHx8IGZlT247CiAgcGF0Y2gub3V0RXZlbnRzID0gY2ZnLm91dEV2ZW50czsKICAvLyDlhbPmjonliY3nq6/mk43kvZzml7Ys5L6d6LWW5a6D55qEIFBsYXl3cmlnaHQg5Lmf5YWz5o6JCiAgaWYgKGtleXMgPT09IE1BU1RFUl9GRV9LRVlTICYmICFvbikgewogICAgY2ZnLmVtaXRQbGF5d3JpZ2h0ID0gZmFsc2U7IHBhdGNoLmVtaXRQbGF5d3JpZ2h0ID0gZmFsc2U7CiAgICBjZmcub3V0U3BlYyA9IGZhbHNlOyBwYXRjaC5vdXRTcGVjID0gZmFsc2U7CiAgfQogIGF3YWl0IHNhdmVNYW55KHBhdGNoKTsKICBmb3IgKGNvbnN0IGsgb2YgQ0hFQ0tCT1hFUykgeyBjb25zdCBlbCA9ICQoYGNiLSR7a31gKTsgaWYgKGVsKSBlbC5jaGVja2VkID0gISFjZmdba107IH0KICBzeW5jRGVwcygpOwp9CgovLyDjgIzmm7TlpJrjgI3ph4zkvp3otZbliY3nq6/mk43kvZznmoTpobnnpoHnlKgKZnVuY3Rpb24gc3luY0RlcHMoKSB7CiAgY29uc3QgY2EgPSAkKCdjYi1tYXN0ZXItZmUnKS5jaGVja2VkOyAgLy8g5b2V5Yi25YmN56uv5pON5L2cCgogIGNvbnN0IGhvdiA9ICQoJ2NiLWNhcHR1cmVIb3ZlcicpOwogIGlmIChob3YpIGhvdi5kaXNhYmxlZCA9ICFjYTsKCiAgJCgnaG92ZXItdHRsJykuZGlzYWJsZWQgPSAhY2EgfHwgIShob3YgJiYgaG92LmNoZWNrZWQpOwogICQoJ2hvdmVyLWdlb20nKS5kaXNhYmxlZCA9ICFjYSB8fCAhKGhvdiAmJiBob3YuY2hlY2tlZCk7CgogIC8vIOWujOaVtCBVSSDkuIrkuIvmlofmiKrmlq3ku4XlnKgi5b2V5Yi25YmN56uv5pON5L2cIihmdWxsKeaXtuacieaEj+S5iQogICQoJ21heC1wZWVycycpLmRpc2FibGVkID0gIWNhOwogICQoJ21heC1hbmMnKS5kaXNhYmxlZCA9ICFjYTsKCiAgY29uc3QgZXAgPSAkKCdjYi1lbWl0UGxheXdyaWdodCcpOwogIGlmIChlcCkgewogICAgZXAuZGlzYWJsZWQgPSAhY2E7CiAgICBpZiAoIWNhICYmIGVwLmNoZWNrZWQpIHsgZXAuY2hlY2tlZCA9IGZhbHNlOyBjZmcuZW1pdFBsYXl3cmlnaHQgPSBmYWxzZTsgY2ZnLm91dFNwZWMgPSBmYWxzZTsgfQogIH0KfQoKYXN5bmMgZnVuY3Rpb24gc2F2ZU1hbnkocGF0Y2gpIHsKICBhd2FpdCBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IGNtZDogTVNHLkNPTkZJR19TRVQsIHBhdGNoIH0pOwp9Cgphc3luYyBmdW5jdGlvbiByZWZyZXNoKCkgewogIGNvbnN0IHRhYiA9IGF3YWl0IGFjdGl2ZVRhYigpOwogIGNvbnN0IHN0YXRlID0gYXdhaXQgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBjbWQ6IE1TRy5HRVRfU1RBVEUsIHRhYklkOiB0YWIuaWQgfSk7CiAgc2V0U3RhdHVzKHN0YXRlLCB0YWIpOwp9CgpmdW5jdGlvbiBzZXRTdGF0dXMoc3RhdGUsIGFjdGl2ZVRhYk9iaikgewogIGNvbnN0IHJlYyA9ICEhc3RhdGU/LnJlY29yZGluZzsKICBjb25zdCBlbCA9ICQoJ3N0YXR1cycpOwogIGVsLnRleHRDb250ZW50ID0gcmVjID8gJ+W9leWItuS4rScgOiAn56m66ZeyJzsKICBlbC5jbGFzc05hbWUgPSBgc3RhdHVzICR7cmVjID8gJ3JlY29yZGluZycgOiAnaWRsZSd9YDsKICAkKCdidG4tc3RhcnQnKS5kaXNhYmxlZCA9IHJlYzsKICAkKCdidG4tc3RvcCcpLmRpc2FibGVkID0gIXJlYzsKICBpZiAoc3RhdGU/LnN0YXRzKSB7CiAgICAkKCdzdGF0cycpLnRleHRDb250ZW50ID0gYOivt+axgiAke3N0YXRlLnN0YXRzLnRvdGFsfSDCtyDlkb3kuK0gJHtzdGF0ZS5zdGF0cy5rZXB0fSDCtyDov4fmu6QgJHtzdGF0ZS5zdGF0cy5kcm9wcGVkfWA7CiAgfQogIGlmIChzdGF0ZT8uZmlsdGVyKSB7CiAgICAkKCdmaWx0ZXItaW5mbycpLnRleHRDb250ZW50ID0gYGluY2x1ZGU9JHtzdGF0ZS5maWx0ZXIuaW5jbHVkZX0gfCBleGNsdWRlPSR7c3RhdGUuZmlsdGVyLmV4Y2x1ZGV9YDsKICB9CiAgY29uc3Qgd2FybiA9ICQoJ3RhYi13YXJuJyk7CiAgaWYgKHJlYyAmJiBzdGF0ZT8udGFiSWQgIT0gbnVsbCAmJiBhY3RpdmVUYWJPYmogJiYgc3RhdGUudGFiSWQgIT09IGFjdGl2ZVRhYk9iai5pZCkgewogICAgd2Fybi5zdHlsZS5kaXNwbGF5ID0gJyc7CiAgICB3YXJuLnRleHRDb250ZW50ID0gYOKaoCDkvaDmraPlnKjnnIsgdGFiICMke2FjdGl2ZVRhYk9iai5pZH0s5L2G5b2V5Yi255uu5qCH5pivIHRhYiAjJHtzdGF0ZS50YWJJZH3jgILliIfotbDnmoTpobXpnaLkuI3kvJrooqvorrDlvZXjgIJgOwogIH0gZWxzZSB7CiAgICB3YXJuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7CiAgICB3YXJuLnRleHRDb250ZW50ID0gJyc7CiAgfQp9CgokKCdidG4tc3RhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHsKICBjb25zdCB0YWIgPSBhd2FpdCBhY3RpdmVUYWIoKTsKICAkKCdidG4tc3RhcnQnKS5kaXNhYmxlZCA9IHRydWU7CiAgJCgnaGludCcpLnRleHRDb250ZW50ID0gJyc7CiAgdHJ5IHsKICAgIGNvbnN0IHIgPSBhd2FpdCBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IGNtZDogTVNHLlNUQVJULCB0YWJJZDogdGFiLmlkIH0pOwogICAgaWYgKCFyPy5vaykgdGhyb3cgbmV3IEVycm9yKHI/LmVycm9yIHx8ICdzdGFydCBmYWlsZWQnKTsKCiAgICAvLyDop4bpopHlv4XpobvlnKggcG9wdXAg55qE55So5oi35omL5Yq/5LiK5LiL5paH6YeM5Y+WIHN0cmVhbUlkCiAgICBjb25zdCBjID0gYXdhaXQgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBjbWQ6IE1TRy5DT05GSUdfR0VUIH0pOwogICAgaWYgKGMucmVjb3JkVmlkZW8pIHsKICAgICAgY29uc3Qgc3RyZWFtSWQgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7CiAgICAgICAgY2hyb21lLnRhYkNhcHR1cmUuZ2V0TWVkaWFTdHJlYW1JZCh7IHRhcmdldFRhYklkOiB0YWIuaWQgfSwgaWQgPT4gewogICAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikgcmVqZWN0KGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcik7CiAgICAgICAgICBlbHNlIHJlc29sdmUoaWQpOwogICAgICAgIH0pOwogICAgICB9KTsKICAgICAgaWYgKCFzdHJlYW1JZCkgdGhyb3cgbmV3IEVycm9yKCd0YWJDYXB0dXJlLmdldE1lZGlhU3RyZWFtSWQg6L+U5Zue56m6Jyk7CiAgICAgIGNvbnN0IGFjayA9IGF3YWl0IGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsKICAgICAgICBjbWQ6IE1TRy5PRkZTQ1JFRU5fU1RBUlQsCiAgICAgICAgc3RyZWFtSWQsCiAgICAgICAgdGFiSWQ6IHRhYi5pZCwKICAgICAgfSk7CiAgICAgIGlmICghYWNrPy5vaykgdGhyb3cgbmV3IEVycm9yKCfop4bpopHlkK/liqjlpLHotKXvvJonICsgKGFjaz8uZXJyb3IgfHwgJycpKTsKICAgIH0KICAgIGF3YWl0IHJlZnJlc2goKTsKICB9IGNhdGNoIChlKSB7CiAgICBhbGVydCgn5ZCv5Yqo5aSx6LSl77yaJyArIChlPy5tZXNzYWdlIHx8IGUpKTsKICAgIGNvbnNvbGUuZXJyb3IoJ1twb3B1cF0gc3RhcnQgZXJyb3InLCBlKTsKICAgIHRyeSB7IGF3YWl0IGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgY21kOiBNU0cuU1RPUCB9KTsgfSBjYXRjaCB7fQogICAgJCgnYnRuLXN0YXJ0JykuZGlzYWJsZWQgPSBmYWxzZTsKICB9Cn0pOwoKJCgnYnRuLXN0b3AnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHsKICAkKCdidG4tc3RvcCcpLmRpc2FibGVkID0gdHJ1ZTsKICAkKCdoaW50JykudGV4dENvbnRlbnQgPSAn5q2j5ZyoIGZpbmFsaXplIOinhumikeKApic7CiAgYXdhaXQgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBjbWQ6IE1TRy5TVE9QIH0pOwogICQoJ2hpbnQnKS50ZXh0Q29udGVudCA9ICflt7LlgZzmraLjgILngrki5a+85Ye6IueUn+aIkCBldmVudHMuanNvbi90ZXN0LnNwZWMudHMnOwogIGF3YWl0IHJlZnJlc2goKTsKfSk7CgokKCdidG4tZXhwb3J0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7CiAgJCgnaGludCcpLnRleHRDb250ZW50ID0gJ+ato+WcqOaJk+WMheKApic7CiAgY29uc3QgciA9IGF3YWl0IGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgY21kOiBNU0cuRVhQT1JUIH0pOwogIGlmICghcj8ub2spIHsKICAgIGFsZXJ0KCflr7zlh7rlpLHotKXvvJonICsgKHI/LmVycm9yIHx8ICd1bmtub3duJykpOwogICAgJCgnaGludCcpLnRleHRDb250ZW50ID0gJyc7CiAgfSBlbHNlIHsKICAgICQoJ2hpbnQnKS50ZXh0Q29udGVudCA9IGDlt7LkuIvovb0gJHtyLmJhc2VOYW1lfS56aXAg4oaSIOa1j+iniOWZqCLkuIvovb0i55uu5b2VIChDdHJsL+KMmCtKIOafpeeciylgOwogIH0KfSk7CgpjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIobXNnID0+IHsKICBpZiAobXNnLmNtZCA9PT0gTVNHLlNUQVRVUykgewogICAgYWN0aXZlVGFiKCkudGhlbih0ID0+IHNldFN0YXR1cyhtc2csIHQpKTsKICB9Cn0pOwoKaW5pdCgpOwo=\"></script>\n</body>\n</html>\n",
			  "src/offscreen/offscreen.html": "<!doctype html>\n<html><head><meta charset=\"utf-8\"><title>offscreen</title></head>\n<body>\n<script src=\"offscreen.js\"></script>\n</body></html>\n",
			  "src/offscreen/offscreen.js": "/**\n * offscreen document：MediaRecorder + 用 <a download> 触发下载\n *\n * 关键点：\n *   - SW 没有 URL.createObjectURL，offscreen 有 DOM 上下文，所以让 offscreen\n *     自己创建 blob URL 并通过隐藏 <a download> 触发浏览器原生下载。\n *   - 视频不再单独下载，finalize 后把 Blob 缓存到 lastVideoBlob，\n *     由 background 在 export 阶段读取并打到 zip 里。\n *   - stop 严格时序：requestData() → 等 dataavailable → stop() → 等 onstop → finalize。\n */\n\nconst MSG = {\n  OFFSCREEN_START: 'offscreen/start',\n  OFFSCREEN_STOP: 'offscreen/stop',\n  OFFSCREEN_PING: 'offscreen/ping',\n  OFFSCREEN_DOWNLOAD: 'offscreen/download',\n  OFFSCREEN_DOWNLOAD_ZIP: 'offscreen/download-zip',\n  OFFSCREEN_GET_VIDEO: 'offscreen/get-video',\n};\n\nlet recorder = null;\nlet stream = null;\nlet chunks = [];\nlet mimeType = 'video/webm';\nlet baseName = '';\nlet lastVideoBlob = null;   // finalize 后保留，供 export 打 zip 用\nlet lastVideoMime = '';\n\nchrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {\n  if (!msg || msg.target !== 'offscreen') return false;\n  (async () => {\n    try {\n      if (msg.cmd === MSG.OFFSCREEN_START) {\n        await startRec(msg.streamId, msg.baseName);\n        sendResponse({ ok: true });\n      } else if (msg.cmd === MSG.OFFSCREEN_STOP) {\n        await stopRec();\n        sendResponse({ ok: true });\n      } else if (msg.cmd === MSG.OFFSCREEN_PING) {\n        sendResponse({ ok: true, alive: true, recording: !!recorder && recorder.state === 'recording' });\n      } else if (msg.cmd === MSG.OFFSCREEN_DOWNLOAD) {\n        downloadText(msg.filename, msg.text, msg.mime || 'text/plain');\n        sendResponse({ ok: true });\n      } else if (msg.cmd === MSG.OFFSCREEN_DOWNLOAD_ZIP) {\n        const bytes = base64ToBytes(msg.base64);\n        const blob = new Blob([bytes], { type: 'application/zip' });\n        const url = URL.createObjectURL(blob);\n        triggerDownload(url, msg.filename);\n        setTimeout(() => { try { URL.revokeObjectURL(url); } catch {} }, 60_000);\n        sendResponse({ ok: true });\n      } else if (msg.cmd === MSG.OFFSCREEN_GET_VIDEO) {\n        if (!lastVideoBlob) {\n          sendResponse({ ok: false, error: 'no video' });\n          return;\n        }\n        const b64 = await blobToBase64(lastVideoBlob);\n        sendResponse({ ok: true, base64: b64, mime: lastVideoMime, size: lastVideoBlob.size });\n      }\n    } catch (e) {\n      console.error('[offscreen]', e);\n      sendResponse({ ok: false, error: String(e?.message || e) });\n    }\n  })();\n  return true;\n});\n\nasync function startRec(streamId, externalBaseName) {\n  if (recorder) await stopRec();\n  chunks = [];\n  lastVideoBlob = null;\n  lastVideoMime = '';\n  baseName = externalBaseName || `recording-${new Date().toISOString().replace(/[:.]/g, '-')}`;\n\n  stream = await navigator.mediaDevices.getUserMedia({\n    audio: false,\n    video: {\n      mandatory: {\n        chromeMediaSource: 'tab',\n        chromeMediaSourceId: streamId,\n      },\n    },\n  });\n\n  const candidates = [\n    'video/webm;codecs=vp9',\n    'video/webm;codecs=vp8',\n    'video/webm',\n  ];\n  mimeType = candidates.find(t => MediaRecorder.isTypeSupported(t)) || 'video/webm';\n\n  recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 2_500_000 });\n  recorder.ondataavailable = ev => {\n    if (ev.data && ev.data.size) chunks.push(ev.data);\n  };\n  recorder.onerror = e => console.error('[offscreen] recorder error', e);\n\n  stream.getTracks().forEach(t => {\n    t.onended = () => {\n      console.warn('[offscreen] track ended');\n      if (recorder && recorder.state === 'recording') {\n        try { recorder.requestData(); } catch {}\n        try { recorder.stop(); } catch {}\n      }\n    };\n  });\n\n  recorder.start(1000);\n  console.log('[offscreen] recording started, mime=', mimeType);\n}\n\nasync function stopRec() {\n  if (!recorder) { cleanup(); return; }\n  if (recorder.state === 'inactive') { await finalize(); return; }\n\n  await new Promise(resolve => {\n    let done = false;\n    const finish = async () => {\n      if (done) return;\n      done = true;\n      try { await finalize(); } finally { resolve(); }\n    };\n    recorder.addEventListener('stop', finish, { once: true });\n    const timer = setTimeout(() => {\n      console.warn('[offscreen] stop timeout, force finalize');\n      finish();\n    }, 5000);\n    recorder.addEventListener('stop', () => clearTimeout(timer), { once: true });\n\n    try {\n      recorder.requestData();\n      setTimeout(() => {\n        try { recorder.stop(); }\n        catch (e) { console.error('[offscreen] stop error', e); finish(); }\n      }, 200);\n    } catch (e) {\n      console.error('[offscreen] requestData error', e);\n      try { recorder.stop(); } catch {}\n    }\n  });\n}\n\nasync function finalize() {\n  console.log(`[offscreen] finalize, chunks=${chunks.length}`);\n  if (!chunks.length) { cleanup(); return; }\n  try {\n    const blob = new Blob(chunks, { type: mimeType });\n    lastVideoBlob = blob;\n    lastVideoMime = mimeType;\n    console.log(`[offscreen] video Blob ready, size=${blob.size}b, mime=${mimeType}`);\n  } catch (e) {\n    console.error('[offscreen] finalize failed', e);\n  } finally {\n    cleanup();\n  }\n}\n\nfunction triggerDownload(url, filename) {\n  const a = document.createElement('a');\n  a.href = url;\n  a.download = filename;\n  a.style.display = 'none';\n  document.body.appendChild(a);\n  a.click();\n  setTimeout(() => a.remove(), 1000);\n}\n\nfunction downloadText(filename, text, mime) {\n  const blob = new Blob([text], { type: mime });\n  const url = URL.createObjectURL(blob);\n  triggerDownload(url, filename);\n  setTimeout(() => URL.revokeObjectURL(url), 30_000);\n}\n\nfunction cleanup() {\n  if (stream) {\n    stream.getTracks().forEach(t => { try { t.stop(); } catch {} });\n    stream = null;\n  }\n  recorder = null;\n  chunks = [];\n  // 注意：不清 lastVideoBlob，留给 export 用；下次 startRec 才清\n}\n\nfunction blobToBase64(blob) {\n  return new Promise((resolve, reject) => {\n    const r = new FileReader();\n    r.onload = () => {\n      const s = r.result || '';\n      const i = String(s).indexOf(',');\n      resolve(i >= 0 ? String(s).slice(i + 1) : '');\n    };\n    r.onerror = () => reject(r.error);\n    r.readAsDataURL(blob);\n  });\n}\n\nfunction base64ToBytes(b64) {\n  const bin = atob(b64);\n  const out = new Uint8Array(bin.length);\n  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);\n  return out;\n}\n\nself.addEventListener('beforeunload', () => {\n  if (recorder && recorder.state === 'recording') {\n    try { recorder.requestData(); } catch {}\n    try { recorder.stop(); } catch {}\n  }\n});\n",
			  "src/viewer/viewer-standalone.html": "<!doctype html>\n<html lang=\"zh\">\n<head>\n<meta charset=\"utf-8\">\n<title>Recording Viewer</title>\n<style>\n  * { box-sizing: border-box; }\n  body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif; color: #222; background: #fafafa; }\n  header { padding: 12px 16px; background: #fff; border-bottom: 1px solid #eee; display: flex; gap: 16px; align-items: center; }\n  header h1 { font-size: 16px; margin: 0; }\n  header .meta { font-size: 12px; color: #888; }\n  .layout { display: grid; grid-template-columns: 60% 40%; height: calc(100vh - 50px); }\n  .left { padding: 12px; overflow: hidden; display: flex; flex-direction: column; gap: 8px; }\n  video { width: 100%; max-height: 65%; background: #000; }\n  .filters { display: flex; gap: 8px; font-size: 12px; }\n  .filters label { user-select: none; }\n  .right { border-left: 1px solid #eee; overflow: auto; background: #fff; }\n  .row { padding: 6px 12px; border-bottom: 1px solid #f0f0f0; font-size: 12px; cursor: pointer; }\n  .row:hover { background: #f7f9ff; }\n  .row.active { background: #e8f0ff; }\n  .row .ts { color: #888; font-variant-numeric: tabular-nums; }\n  .row .type { display: inline-block; min-width: 38px; padding: 0 6px; border-radius: 3px; font-size: 11px; margin-right: 6px; }\n  .type.ui { background: #e3f2fd; color: #1565c0; }\n  .type.api { background: #fff3e0; color: #ef6c00; }\n  .type.nav { background: #f3e5f5; color: #6a1b9a; }\n  .type.meta { background: #e0f2f1; color: #00695c; }\n  .row pre { margin: 4px 0 0 50px; font-size: 11px; color: #555; white-space: pre-wrap; word-break: break-all; }\n  #file-input { display: none; }\n  .empty { padding: 32px; text-align: center; color: #888; }\n  .btn { font-size: 12px; padding: 4px 10px; border: 1px solid #ccc; background: #fff; cursor: pointer; border-radius: 3px; }\n  .stats { font-size: 12px; color: #666; }\n</style>\n</head>\n<body>\n<header>\n  <h1>Recording Viewer</h1>\n  <button class=\"btn\" onclick=\"document.getElementById('file-input').click()\">载入 events.json</button>\n  <button class=\"btn\" onclick=\"document.getElementById('video-input').click()\">载入 video.webm</button>\n  <input id=\"file-input\" type=\"file\" accept=\".json\">\n  <input id=\"video-input\" type=\"file\" accept=\"video/*\" style=\"display:none\">\n  <span class=\"meta\" id=\"meta-info\"></span>\n  <span class=\"stats\" id=\"stats\"></span>\n</header>\n<div class=\"layout\">\n  <div class=\"left\">\n    <video id=\"video\" controls></video>\n    <div class=\"filters\">\n      <label><input type=\"checkbox\" data-type=\"ui\" checked> UI</label>\n      <label><input type=\"checkbox\" data-type=\"api\" checked> API</label>\n      <label><input type=\"checkbox\" data-type=\"nav\" checked> 导航</label>\n      <label><input type=\"checkbox\" data-type=\"meta\" checked> Meta</label>\n      <input id=\"search\" type=\"search\" placeholder=\"搜索…\" style=\"margin-left:auto;width:200px;\">\n    </div>\n  </div>\n  <div class=\"right\" id=\"list\">\n    <div class=\"empty\">把同目录里的 events.json 拖进来,或点上方按钮载入。</div>\n  </div>\n</div>\n<script>\nlet allEvents = [];\nlet meta = null;\nlet startedAt = 0;\nconst list = document.getElementById('list');\nconst video = document.getElementById('video');\n\ndocument.getElementById('file-input').addEventListener('change', async e => {\n  const f = e.target.files[0]; if (!f) return;\n  const data = JSON.parse(await f.text());\n  meta = data.meta || {};\n  startedAt = meta.startedAt || (data.events?.[0]?.ts || 0);\n  allEvents = (data.events || []).slice().sort((a,b) => a.ts - b.ts);\n  document.getElementById('meta-info').textContent =\n    `开始 ${meta.startedAt ? new Date(meta.startedAt).toLocaleString() : '-'} · 共 ${allEvents.length} 事件`;\n  render();\n});\n\ndocument.getElementById('video-input').addEventListener('change', e => {\n  const f = e.target.files[0]; if (!f) return;\n  video.src = URL.createObjectURL(f);\n});\n\ndocument.querySelectorAll('.filters input[type=checkbox]').forEach(cb => {\n  cb.addEventListener('change', render);\n});\ndocument.getElementById('search').addEventListener('input', render);\n\nfunction render() {\n  if (!allEvents.length) return;\n  const enabled = {};\n  document.querySelectorAll('.filters input[type=checkbox]').forEach(cb => {\n    enabled[cb.dataset.type] = cb.checked;\n  });\n  const q = document.getElementById('search').value.trim().toLowerCase();\n  const rows = allEvents.filter(ev => {\n    if (!enabled[ev.type]) return false;\n    if (q) {\n      const blob = JSON.stringify(ev).toLowerCase();\n      if (!blob.includes(q)) return false;\n    }\n    return true;\n  });\n  let kept = 0, total = 0;\n  list.innerHTML = '';\n  rows.forEach((ev, i) => {\n    total++; kept++;\n    const dt = ev.ts - startedAt;\n    const div = document.createElement('div');\n    div.className = 'row';\n    div.dataset.ts = dt;\n    div.innerHTML = `\n      <span class=\"ts\">${(dt/1000).toFixed(2)}s</span>\n      <span class=\"type ${ev.type}\">${ev.type}</span>\n      <span>${describe(ev)}</span>\n      <pre>${detail(ev)}</pre>`;\n    div.addEventListener('click', () => {\n      [...list.children].forEach(c => c.classList.remove('active'));\n      div.classList.add('active');\n      if (video.duration) video.currentTime = Math.max(0, dt / 1000);\n    });\n    list.appendChild(div);\n  });\n  document.getElementById('stats').textContent = `显示 ${rows.length} 条`;\n}\n\nfunction describe(ev) {\n  if (ev.type === 'ui') {\n    const t = ev.target || {};\n    // full 模式用 computedName;lite 模式用 name;都兼容旧数据的 css\n    const nm = t.computedName || t.name;\n    const desc = t.role && nm ? `${t.role} \"${nm}\"` : (t.text || t.selector || t.css || t.tag);\n    let suffix = '';\n    if (ev.action === 'fill') suffix = ` = \"${(ev.value||'').slice(0,40)}\"`;\n    if (ev.action === 'press') suffix = ` [${ev.key}]`;\n    return `<b>${ev.action}</b> ${esc(desc)}${esc(suffix)}`;\n  }\n  if (ev.type === 'api') {\n    return `<b>${ev.method||'GET'}</b> ${ev.status || '...'} ${esc((ev.url||'').slice(0,100))}`;\n  }\n  if (ev.type === 'nav') return `<b>navigate</b> → ${esc((ev.to||'').slice(0,100))}`;\n  if (ev.type === 'meta') return `<b>${ev.action}</b> ${esc((ev.url||'').slice(0,100))}`;\n  return ev.action || '';\n}\nfunction detail(ev) {\n  if (ev.type === 'api') {\n    const lines = [];\n    if (ev.reqBody) lines.push('req: ' + (ev.reqBody||'').slice(0, 200));\n    if (ev.respBody) lines.push('resp: ' + (ev.respBody||'').slice(0, 200));\n    return esc(lines.join('\\n'));\n  }\n  if (ev.type === 'ui' && ev.target?.css) return esc('css: ' + ev.target.css);\n  return '';\n}\nfunction esc(s) { return String(s).replace(/[<>&]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c])); }\n</script>\n</body>\n</html>\n"
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
		      "ui-api-recorder",
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
	  const scriptName = "UI + API Recorder";
	  const debug = "[UI + API Recorder]";
	  _log(debug + ' Executing background scripts...');
	
	  function executeBackgroundScripts(){
	    with(backgroundPolyfill){
	      // BG: src/background/background.js
	/**
	 * background service worker
	 *
	 * 职责：
	 *  - 管理录制生命周期（start / stop / export）
	 *  - 根据配置开关启用各 collector：
	 *      captureApi    → 通过 chrome.debugger 抓 Network
	 *      captureActions → 由 content script 上报 fe-event
	 *      recordVideo   → 由 offscreen 用 MediaRecorder 录
	 *      emitPlaywright → 在 export 时把 ui 事件转 .spec.ts
	 *  - 所有产物由 offscreen 统一通过 <a download> 写入同一 recording-* 目录
	 *    （SW 自身没有 URL.createObjectURL，所以不能在 SW 端直接下文件）
	 */
	import { MSG, compileFilter, nowTs, loadConfig, saveConfig, DEFAULT_CONFIG, resolveOutputs, filterEvents, resolveUiDetail } from '../common/utils.js';
	import { generatePlaywrightSpec } from '../exporter/playwright-exporter.js';
	
	class Session {
	  constructor(tabId, config) {
	    this.tabId = tabId;            // 主 tab(录制起点)
	    this.primaryTabId = tabId;
	    // v0.3.4: 录制可以跟随"从录制 tab 打开的新标签页"。
	    // tabIds = 本次录制纳入范围的所有 tab;attachedTabs = 已成功 attach debugger 的 tab。
	    this.tabIds = new Set([tabId]);
	    this.attachedTabs = new Set();
	    this.startedAt = nowTs();
	    this.endedAt = 0;
	    this.config = config;
	    this.events = [];
	    this.pendingRequests = new Map();
	    this.stats = { total: 0, kept: 0, dropped: 0 };
	    this.filter = compileFilter(config.apiInclude, config.apiExclude);
	    // v0.2.8: baseName 由用户自定义前缀(去除非法字符) + 时间戳组成
	    const prefix = sanitizePrefix(config.exportPrefix);
	    this.baseName = `${prefix}-${new Date(this.startedAt).toISOString().replace(/[:.]/g, '-')}`;
	    this.startUrl = '';
	    // v0.2.7: 累积式 a11y 快照(start / 每次 nav / stop)
	    this.a11ySnapshots = [];
	    // v0.2.7: 完整 API 详情(req/resp headers + body),与精简版分离
	    this.apiDetails = [];
	  }
	  push(ev) { this.events.push(ev); }
	}
	
	// 把用户输入的前缀清理成可作为文件名的字符串
	// v0.2.9: 允许中文/Unicode,仅过滤真正非法的文件名字符
	function sanitizePrefix(p) {
	  let s = String(p || '').trim();
	  // 仅替换 Windows/macOS 上真正非法的文件名字符 + 控制字符
	  // 允许字母数字、中日韩、emoji、点、下划线、连字符、空格等
	  s = s.replace(/[\\/:*?"<>|\x00-\x1F]+/g, '_');
	  // 空格统一为下划线,便于命令行
	  s = s.replace(/\s+/g, '_');
	  s = s.replace(/^[._]+|[._]+$/g, '');
	  if (!s) s = 'recording';
	  if (s.length > 50) s = s.slice(0, 50);
	  return s;
	}
	
	let session = null;
	let lastFinishedSession = null;  // 录制结束后保留，供 export 使用
	let stopping = false;   // 防重入
	let videoFinalizing = null; // 视频 finalize Promise（异步，不阻塞 stop 返回）
	
// #region ----------
		async function startRecording(tabId) {
		  // "开始 = 重新开始"：有任何旧会话直接强制停掉
		  if (session) {
		    try { await stopRecording({ silent: true, force: true }); } catch (e) { console.warn('[recorder] forced stop failed', e); }
		  }
		  // 等上一次 video finalize 跑完，避免新旧 baseName 冲突
		  if (videoFinalizing) {
		    try { await Promise.race([videoFinalizing, new Promise(r => setTimeout(r, 1500))]); } catch {}
		    videoFinalizing = null;
		  }
		
		  const config = await loadConfig();
		
		  // 提前校验目标 tab 是否可录(chrome:// / edge:// / web store / 文件协议等是禁区)
		  let tabUrl = '';
		  try {
		    const tab = await chrome.tabs.get(tabId);
		    tabUrl = tab?.url || tab?.pendingUrl || '';
		  } catch {}
		  const blockedRe = /^(chrome|edge|about|chrome-extension|devtools|view-source):/i;
		  const isWebStore = /^https?:\/\/chrome\.google\.com\/webstore/i.test(tabUrl)
		    || /^https?:\/\/chromewebstore\.google\.com/i.test(tabUrl);
		  if (!tabUrl || blockedRe.test(tabUrl) || isWebStore) {
		    session = null;
		    throw new Error(
		      `当前页面不支持录制(${tabUrl || '空白页'})。\n` +
		      `Chrome 不允许扩展操作 chrome:// / 扩展商店 / 新标签页等内部页面。\n` +
		      `请先在地址栏打开你要测试的 http(s) 网页,让该标签停在最前面,再点"开始"。`
		    );
		  }
		
		  session = new Session(tabId, config);
		  stopping = false;
		  session.startUrl = tabUrl;
		
		  // captureApi → debugger
		  // v0.2.7: 即使不抓 API,也要短暂 attach 以便拉 Accessibility 树
		  const needDebugger = !!config.captureApi || !!config.captureActions;
		  session.debuggerAttached = false;
		  if (needDebugger) {
		    try {
		      await attachDebuggerAndEnable(tabId, config);
		      session.debuggerAttached = true;
		      session.attachedTabs.add(tabId);
		      console.log('[recorder] debugger attached, captureApi=', config.captureApi);
		      // 录制开始时抓一次 a11y 快照
		      captureA11ySnapshot(session, 'start').catch(e => console.warn('[recorder] a11y snap (start) failed', e));
		    } catch (e) {
		      console.error('[recorder] debugger attach failed', e);
		      // 仅在用户明确要 captureApi 时把异常往上抛
		      if (config.captureApi) { session = null; throw e; }
		    }
		  }
		
		  // captureActions → 通过 storage 同步给所有 frame(包含未来注入的子 frame)
		  // storage 比 sendMessage 更可靠:任何时刻注入的 content script 都能立即读到当前状态
		  // v0.3.8: 只要 uiDetail 不是 off(full=录前端 或 lite=仅后端),就注入 content 采集 UI 步骤。
		  //   lite 模式下 content 走 describeLite,只记轻量步骤(nav + click/fill/select),不做定位。
		  //   content 端 uiDetail() 从 config.captureApi/captureActions 推导,故 config 原样下发即可。
		  const wantUi = resolveUiDetail(config) !== 'off';
		  if (wantUi) {
		    await chrome.storage.local.set({
		      recorderState: { recording: true, config, tabId, startedAt: session.startedAt },
		    });
		    // 主动把 content script 注入到所有 frame —— 解决"扩展刚装/页面早于扩展加载,
		    // content_scripts 没生效"的场景。已注入过会被 __actionRecorderInjected 守卫,不重复绑定。
		    try {
		      await chrome.scripting.executeScript({
		        target: { tabId, allFrames: true },
		        files: ['src/content/content.js'],
		      });
		      console.log('[recorder] content script injected to all frames');
		    } catch (e) {
		      console.warn('[recorder] executeScript failed (页面可能受限,如 chrome:// 或 web store)', e);
		    }
		    // 兜底再用 sendMessage 通知一遍,加快当前已注入 frame 的开关响应
		    try {
		      await broadcastToAllFrames(tabId, { cmd: MSG.START, config });
		    } catch (e) {
		      console.warn('[recorder] notify content failed', e);
		    }
		  } else {
		    await chrome.storage.local.set({ recorderState: { recording: false, config } });
		  }
		
		  // recordVideo → 预创建 offscreen（streamId 获取要在 popup 那边的用户手势里）
		  if (config.recordVideo) {
		    await ensureOffscreen();
		  }
		
		  await broadcastStatus();
		  console.log('[recorder] started', { tabId, baseName: session.baseName, config });
		}
		
		async function stopRecording({ silent, force } = {}) {
		  if (!session) return;
		  if (stopping && !force) {
		    console.log('[recorder] stop already in progress');
		    return;
		  }
		  stopping = true;
		  const sess = session;
		  const tabId = sess.tabId;
		
		  // 关键：先把 session 置空，让 UI 立刻回到"空闲"状态，按钮立即可用
		  sess.endedAt = nowTs();
		  // 但保留 lastFinishedSession 用于 export
		  lastFinishedSession = sess;
		  session = null;
		  await broadcastStatus();
		
		  // 1) 先在 detach 前抓一次结束态 a11y 快照(主 tab),再 detach 所有已 attach 的 tab
		  if (sess.debuggerAttached && tabId != null) {
		    try { await captureA11ySnapshot(sess, 'stop'); } catch (e) { console.warn('[recorder] a11y snap (stop) failed', e); }
		  }
		  // v0.3.4: 逐个 detach 本次录制纳入的所有 tab(主 tab + 跟随的新标签页)
		  for (const tid of sess.attachedTabs) {
		    try { await chrome.debugger.detach({ tabId: tid }); } catch {}
		  }
		  // 2) 通知所有 tab 的 content script 停止 + 清 storage
		  await chrome.storage.local.set({ recorderState: { recording: false, config: sess.config } });
		  if (resolveUiDetail(sess.config) !== 'off') {
		    for (const tid of sess.tabIds) {
		      try { await broadcastToAllFrames(tid, { cmd: MSG.STOP }); } catch {}
		    }
		  }
		
		  // 3) 视频 finalize 放后台跑，不阻塞 stop 返回
		  if (sess.config.recordVideo) {
		    videoFinalizing = (async () => {
		      try {
		        await chrome.runtime.sendMessage({ cmd: MSG.OFFSCREEN_STOP, target: 'offscreen' });
		        console.log('[recorder] video finalized');
		      } catch (e) {
		        console.warn('[recorder] OFFSCREEN_STOP failed', e);
		      }
		    })();
		  }
		
		  stopping = false;
		  console.log('[recorder] stopped (sync part). events:', sess.events.length, 'stats:', sess.stats);
		}
		
// #endregion
// #region debugger attach helper ----------
		// v0.3.4: 把 attach + 各域 enable 抽成可复用函数,供 start 和"导航后重连"共用。
		// 跨域同标签页导航会触发 Chrome 渲染进程切换,旧的 debugger 会被 detach,
		// 必须重新 attach 并重新 Network.enable,否则新页面的 API 抓不到。
		async function attachDebuggerAndEnable(tabId, config) {
		  await chrome.debugger.attach({ tabId }, '1.3');
		  if (config.captureApi) {
		    await chrome.debugger.sendCommand({ tabId }, 'Network.enable');
		  }
		  // a11y 域始终启用,用于抓全树
		  try {
		    await chrome.debugger.sendCommand({ tabId }, 'Accessibility.enable');
		    await chrome.debugger.sendCommand({ tabId }, 'DOM.enable');
		  } catch (e) { console.warn('[recorder] a11y enable failed', e); }
		}
		
		// v0.3.4: 跨域同标签页导航后,渲染进程切换会让 debugger 掉线 / Network 域失效。
		// 关键经验:跨进程导航时即使 debugger 仍"挂着",对旧进程的 Network.enable 也绑不到新进程,
		// 新页面的 Network 事件一条都不来。所以这里统一做"强制 detach → 重新 attach → 重新 enable",
		// 而不是只补发一次 enable。这是 0.3.3 漏抓 page2 API 的真正修复点。
		let reattaching = false;
		async function reattachAfterNavigation(tabId, source = 'nav') {
		  if (!session || !session.tabIds.has(tabId)) return;
		  if (!session.config.captureApi && !session.config.captureActions) return;
		  if (reattaching) { console.log('[recorder] reattach skipped (in progress)'); return; }
		  reattaching = true;
		  console.log(`[recorder] reattach start (source=${source}) tab=${tabId}`);
		  try {
		    // 1) 先强制 detach(忽略"未挂载"错误),清掉对旧进程的绑定
		    try { await chrome.debugger.detach({ tabId }); console.log('[recorder] old debugger detached'); }
		    catch (e) { /* 本来就没挂 */ }
		    session.attachedTabs.delete(tabId);
		    if (tabId === session.tabId) session.debuggerAttached = false;
		    // 2) 重新 attach 到当前(新)进程并重发各域 enable
		    await attachDebuggerAndEnable(tabId, session.config);
		    session.attachedTabs.add(tabId);
		    if (tabId === session.tabId) session.debuggerAttached = true;
		    console.log('[recorder] debugger re-attached after navigation, tab=', tabId, 'captureApi=', session.config.captureApi);
		    // 3) 导航后补一张 a11y 快照(仅主 tab,避免子 tab 树太多)
		    if (tabId === session.tabId) captureA11ySnapshot(session, 'nav').catch(() => {});
		  } catch (e) {
		    console.warn('[recorder] reattach after navigation FAILED', e);
		  } finally {
		    reattaching = false;
		  }
		}
		
		// v0.3.4: 把"从录制 tab 打开的新标签页"也纳入录制范围,attach debugger 抓它的 API。
		// chrome.debugger 是按 tabId 绑定的,只 attach 主 tab 时,新标签页的 Network 一条都收不到
		// (而 UI 事件因为 content script 注入到每个 tab + storage 共享状态,所以照常上报)。
		// 这就是"新页签里 UI 有记录、API 没记录"的真正原因。
		const attachingTabs = new Set();
		async function attachFollowerTab(tabId, source = 'newtab') {
		  if (!session) return;
		  if (session.attachedTabs.has(tabId) || attachingTabs.has(tabId)) return;
		  if (!session.config.captureApi && !session.config.captureActions) return;
		  attachingTabs.add(tabId);
		  session.tabIds.add(tabId);
		  console.log(`[recorder] attach follower tab=${tabId} (source=${source})`);
		  // 新 tab 刚创建时进程/文档可能还没就绪,attach 容易抛错,做几次重试。
		  for (let i = 0; i < 5; i++) {
		    try {
		      // 跳过受限页面(chrome:// / web store 等)
		      let url = '';
		      try { const t = await chrome.tabs.get(tabId); url = t?.url || t?.pendingUrl || ''; } catch {}
		      const blockedRe = /^(chrome|edge|about|chrome-extension|devtools|view-source):/i;
		      if (url && blockedRe.test(url)) { console.log('[recorder] follower tab is restricted, skip', url); break; }
		      await attachDebuggerAndEnable(tabId, session.config);
		      session.attachedTabs.add(tabId);
		      console.log('[recorder] follower tab debugger attached', tabId);
		      // v0.3.6: 此 tab 已正式纳入录制范围(上面已 session.tabIds.add)。
		      // 主动给它发 directed START,让 content script 立刻 bind UI 监听 + 发 meta:start,
		      // 不用等它自己轮询 scope(规避"content 先读到全局 state、但尚未被加入 tabIds"的竞态)。
		      if (resolveUiDetail(session.config) !== 'off') {
		        try { await broadcastToAllFrames(tabId, { cmd: MSG.START, config: session.config }); } catch {}
		      }
		      break;
		    } catch (e) {
		      const msg = String(e?.message || e);
		      // 已经 attach 了就当成功
		      if (/already attached|Another debugger/i.test(msg)) { session.attachedTabs.add(tabId); break; }
		      if (i === 4) { console.warn('[recorder] follower tab attach failed (gave up)', msg); }
		      await new Promise(r => setTimeout(r, 300));
		    }
		  }
		  attachingTabs.delete(tabId);
		}
		
// #endregion
// #region offscreen ----------
		async function ensureOffscreen() {
		  const url = chrome.runtime.getURL('src/offscreen/offscreen.html');
		  const existing = await chrome.runtime.getContexts({
		    contextTypes: ['OFFSCREEN_DOCUMENT'],
		    documentUrls: [url],
		  });
		  if (existing && existing.length > 0) return;
		  await chrome.offscreen.createDocument({
		    url,
		    reasons: ['USER_MEDIA', 'BLOBS'],
		    justification: '录制 tab 视频并触发下载',
		  });
		  console.log('[recorder] offscreen created');
		}
		
		async function waitOffscreenReady(timeoutMs = 3000) {
		  const deadline = Date.now() + timeoutMs;
		  while (Date.now() < deadline) {
		    try {
		      const r = await chrome.runtime.sendMessage({ cmd: MSG.OFFSCREEN_PING, target: 'offscreen' });
		      if (r && r.alive) return true;
		    } catch {}
		    await new Promise(r => setTimeout(r, 100));
		  }
		  return false;
		}
		
// #endregion
// #region CDP Network ----------
		chrome.debugger.onEvent.addListener(async (src, method, params) => {
		  // v0.3.4: 接受本次录制纳入的任意 tab(主 tab + 跟随打开的新标签页)
		  if (!session || !session.tabIds.has(src.tabId)) return;
		  if (!session.config.captureApi) return;
		
		  try {
		    if (method === 'Network.requestWillBeSent') {
		      const url = params.request.url;
		      session.stats.total++;
		      const r = session.filter.test(url);
		      if (!r.ok) {
		        session.stats.dropped++;
		        return;
		      }
		      session.stats.kept++;
		      // 详情(完整 headers/body)
		      const detail = {
		        requestId: params.requestId,
		        ts: nowTs(),
		        url,
		        method: params.request.method,
		        reqHeaders: params.request.headers || {},
		        reqBody: params.request.postData || null,
		        resourceType: params.type,
		        initiator: params.initiator || null,
		      };
		      session.pendingRequests.set(params.requestId, detail);
		    } else if (method === 'Network.responseReceived') {
		      const r = session.pendingRequests.get(params.requestId);
		      if (!r) return;
		      r.status = params.response.status;
		      r.statusText = params.response.statusText;
		      r.respHeaders = params.response.headers || {};
		      r.mimeType = params.response.mimeType;
		      r.remoteIp = params.response.remoteIPAddress;
		    } else if (method === 'Network.loadingFinished') {
		      const r = session.pendingRequests.get(params.requestId);
		      if (!r) return;
		      if (isTextLike(r.mimeType)) {
		        try {
		          const body = await chrome.debugger.sendCommand(
		            { tabId: src.tabId },
		            'Network.getResponseBody',
		            { requestId: params.requestId },
		          );
		          r.respBody = body.base64Encoded
		            ? `[base64 ${body.body.length}b]`
		            : (body.body || '').slice(0, 20000);
		        } catch (e) {
		          r.respBodyError = String(e?.message || e);
		        }
		      }
		      r.endTs = nowTs();
		      // v0.2.7: events 里只保留精简描述,详情写到 apiDetails
		      session.push({
		        type: 'api',
		        ts: r.ts,
		        endTs: r.endTs,
		        requestId: r.requestId,
		        url: r.url,
		        method: r.method,
		        status: r.status,
		        statusText: r.statusText,
		        resourceType: r.resourceType,
		        mimeType: r.mimeType,
		      });
		      session.apiDetails.push(r);
		      session.pendingRequests.delete(params.requestId);
		    } else if (method === 'Network.loadingFailed') {
		      const r = session.pendingRequests.get(params.requestId);
		      if (!r) return;
		      r.failed = true;
		      r.errorText = params.errorText;
		      r.endTs = nowTs();
		      session.push({
		        type: 'api',
		        ts: r.ts,
		        endTs: r.endTs,
		        requestId: r.requestId,
		        url: r.url,
		        method: r.method,
		        failed: true,
		        errorText: r.errorText,
		        resourceType: r.resourceType,
		      });
		      session.apiDetails.push(r);
		      session.pendingRequests.delete(params.requestId);
		    }
		  } catch (err) {
		    console.warn('[recorder] CDP handler error', err);
		  }
		});
		
		function isTextLike(mime = '') {
		  return /^(text\/|application\/(json|xml|javascript|x-www-form-urlencoded|graphql))/i.test(mime);
		}
		
// #endregion
// #region v0 2 7 Accessibility ----------
		async function captureA11ySnapshot(sess, reason) {
		  if (!sess || !sess.debuggerAttached) return;
		  const tabId = sess.tabId;
		  let tree = null;
		  let url = '';
		  let title = '';
		  try {
		    const t = await chrome.tabs.get(tabId);
		    url = t?.url || '';
		    title = t?.title || '';
		  } catch {}
		  try {
		    // 优先 getFullAXTree(返回 nodes 数组,含 role/name/value/parentId/childIds 等)
		    const r = await chrome.debugger.sendCommand({ tabId }, 'Accessibility.getFullAXTree', {});
		    tree = r?.nodes || null;
		  } catch (e) {
		    console.warn('[recorder] getFullAXTree failed', e?.message || e);
		  }
		  if (!tree) return;
		  sess.a11ySnapshots.push({
		    reason,                // 'start' | 'stop' | 'nav' | 'manual'
		    ts: nowTs(),
		    url, title,
		    nodeCount: tree.length,
		    nodes: tree,
		  });
		  console.log('[recorder] a11y snapshot captured', reason, 'nodes=', tree.length);
		}
		
		// debugger 自动 detach 兜底
		// v0.3.4: 跨域同标签页导航(渲染进程切换)也会触发 detach,reason 常见为
		// 'target_closed' / 'Render process gone.' / 'Target navigated' 等。
		// 旧逻辑只要 reason !== 'target_closed' 就直接 stopRecording,导致页面跳转后整段录制被掐断,
		// 新页面的 API 全部丢失。现在改为:tab 仍在 → 尝试重连;tab 真没了 → 由 onRemoved 处理。
		chrome.debugger.onDetach.addListener(async (src, reason) => {
		  console.warn('[recorder] debugger detached, reason=', reason, 'tab=', src.tabId);
		  if (!session || !session.tabIds.has(src.tabId)) return;
		  session.attachedTabs.delete(src.tabId);
		  if (src.tabId === session.tabId) session.debuggerAttached = false;
		  if (reason === 'target_closed') return; // tab/target 关闭,交给 onRemoved
		  // 确认 tab 还在,再决定重连还是收尾
		  let tabAlive = false;
		  try { const t = await chrome.tabs.get(src.tabId); tabAlive = !!t; } catch {}
		  if (tabAlive) {
		    // 导航/进程切换引起的掉线 —— 重连,不要停录制
		    await reattachAfterNavigation(src.tabId, 'onDetach:' + reason);
		  } else if (src.tabId === session.tabId && session.config.captureApi) {
		    try { await stopRecording({ silent: true }); } catch {}
		  }
		});
		
		// v0.3.4: 顶层 frame 导航提交后主动重连 debugger + 重新 Network.enable。
		// onDetach 在某些时序下不会触发(debugger 仍"挂着"但 Network 域绑在旧进程,新页面事件不来),
		// 所以这里用 webNavigation.onCommitted 做主动兜底,双保险。对本次录制的任意 tab 生效。
		chrome.webNavigation.onCommitted.addListener(async (details) => {
		  if (!session) return;
		  if (details.frameId !== 0) return;          // 只关心顶层导航
		  if (!session.tabIds.has(details.tabId)) return;
		  // 排除同文档导航(history.pushState / hash 不切进程,无需重连)
		  const quals = details.transitionQualifiers || [];
		  if (details.transitionType === 'reference_fragment' || quals.includes('same_document')) {
		    console.log('[recorder] onCommitted same-document, skip reattach');
		    return;
		  }
		  console.log('[recorder] onCommitted top-frame nav →', details.tabId, details.url);
		  await reattachAfterNavigation(details.tabId, 'onCommitted');
		});
		
		// v0.3.4: 录制 tab 用 target=_blank / window.open / 中键点击打开的新标签页,
		// 也要 attach debugger 才能抓到它的 API。两条路径都监听,谁先到谁负责(attachFollowerTab 幂等)。
		chrome.webNavigation.onCreatedNavigationTarget.addListener(async (details) => {
		  if (!session) return;
		  if (!session.tabIds.has(details.sourceTabId)) return;  // 由录制范围内的 tab 打开
		  console.log('[recorder] new tab opened from recorded tab →', details.tabId, details.url);
		  await attachFollowerTab(details.tabId, 'navTarget');
		});
		
		chrome.tabs.onCreated.addListener(async (tab) => {
		  if (!session || tab.id == null) return;
		  if (tab.openerTabId != null && session.tabIds.has(tab.openerTabId)) {
		    console.log('[recorder] tabs.onCreated opener in session →', tab.id);
		    await attachFollowerTab(tab.id, 'onCreated');
		  }
		});
		
		
		chrome.tabs.onRemoved.addListener(async (tabId) => {
		  if (!session) return;
		  if (tabId === session.tabId) {
		    console.warn('[recorder] primary tab closed, stopping');
		    try { await stopRecording({ silent: true }); } catch {}
		  } else if (session.tabIds.has(tabId)) {
		    // 跟随的新标签页被关掉:仅移出录制范围,不影响整段录制
		    console.log('[recorder] follower tab closed, dropping', tabId);
		    session.tabIds.delete(tabId);
		    session.attachedTabs.delete(tabId);
		  }
		});
		
// #endregion
// #region ----------
		chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
		  if (msg && msg.target === 'offscreen') return false;
		
		  (async () => {
		    try {
		      switch (msg.cmd) {
		        case MSG.START: {
		          const tabId = msg.tabId ?? sender.tab?.id;
		          await startRecording(tabId);
		          sendResponse({ ok: true });
		          break;
		        }
		        case MSG.STOP: {
		          await stopRecording();
		          sendResponse({ ok: true });
		          break;
		        }
		        case MSG.EXPORT: {
		          const baseName = await exportSession();
		          sendResponse({ ok: true, baseName });
		          break;
		        }
		        case MSG.GET_STATE: {
		          sendResponse({
		            recording: !!session,
		            tabId: session?.tabId,
		            stats: session?.stats,
		            filter: session?.filter?.desc,
		          });
		          break;
		        }
		        case MSG.CONFIG_GET: {
		          sendResponse(await loadConfig());
		          break;
		        }
		        case MSG.CONFIG_SET: {
		          const next = await saveConfig(msg.patch || {});
		          sendResponse(next);
		          break;
		        }
		        case MSG.OFFSCREEN_START: {
		          await ensureOffscreen();
		          const ready = await waitOffscreenReady(3000);
		          if (!ready) {
		            sendResponse({ ok: false, error: 'offscreen not ready' });
		            break;
		          }
		          const r = await chrome.runtime.sendMessage({
		            cmd: MSG.OFFSCREEN_START,
		            target: 'offscreen',
		            streamId: msg.streamId,
		            baseName: session?.baseName,
		          });
		          sendResponse(r || { ok: false, error: 'no offscreen response' });
		          break;
		        }
		        case MSG.QUERY_SCOPE: {
		          // content script 注入到所有 tab,都会读到全局 recorderState。
		          // 但只有"本次录制范围内"的 tab(主 tab + 导航后的同 tab + 跟随的新标签页)
		          // 才应真正 bind DOM 监听并发 meta:start。range 的唯一真相在 background 的
		          // session.tabIds,content 自己拿不到 tabId,所以反过来问 background。
		          const fromTabId = sender?.tab?.id;
		          const inScope = !!(session && fromTabId != null && session.tabIds.has(fromTabId));
		          sendResponse({ inScope });
		          break;
		        }
		        case MSG.FE_EVENT: {
		          // 只接受本次录制范围内 tab(主 tab + 跟随的新标签页)发来的 UI/meta/nav 事件。
		          // content script 注入到所有 tab,无关 tab 也会读到全局 recorderState 而发事件,
		          // 这里按 sender.tab.id 严格过滤,避免无关 tab 的 meta:start / UI 事件污染 events.json。
		          const fromTabId = sender?.tab?.id;
		          if (session && resolveUiDetail(session.config) !== 'off'
		              && fromTabId != null && session.tabIds.has(fromTabId)) {
		            const ev = { ...msg.event, ts: msg.event.ts || nowTs() };
		            session.push(ev);
		            if ((session.events.length % 10) === 1) {
		              console.log('[recorder] fe-event #', session.events.length, ev.type, ev.action);
		            }
		            // v0.2.7: 导航后延迟 600ms 抓一次 a11y(等新页面 a11y 构建完成)
		            if (ev.type === 'nav' && session.debuggerAttached) {
		              setTimeout(() => {
		                captureA11ySnapshot(session, 'nav').catch(() => {});
		              }, 600);
		            }
		          } else {
		            console.warn('[recorder] FE_EVENT dropped: session=', !!session,
		              'uiDetail=', session ? resolveUiDetail(session.config) : 'n/a',
		              'fromTab=', fromTabId, 'inScope=', fromTabId != null && !!session?.tabIds?.has(fromTabId));
		          }
		          sendResponse({ ok: true });
		          break;
		        }
		        default:
		          sendResponse({ ok: false, error: 'unknown cmd: ' + msg.cmd });
		      }
		    } catch (e) {
		      console.error('[recorder] msg handler error', e);
		      sendResponse({ ok: false, error: String(e?.message || e) });
		    }
		  })();
		  return true;
		});
		
		async function broadcastStatus() {
		  try {
		    await chrome.runtime.sendMessage({
		      cmd: MSG.STATUS,
		      recording: !!session,
		      tabId: session?.tabId,
		      stats: session?.stats,
		      filter: session?.filter?.desc,
		    });
		  } catch {}
		}
		
// #endregion
// #region ----------
		async function exportSession() {
		  // 优先用刚结束的会话；若仍在录制则用当前会话
		  const sess = session || lastFinishedSession;
		  if (!sess) throw new Error('当前没有可导出的录制(请先开始一次录制并停止)');
		
		  // 等视频 finalize（最多 8s）
		  if (sess.config.recordVideo && videoFinalizing) {
		    try { await Promise.race([videoFinalizing, new Promise(r => setTimeout(r, 8000))]); } catch {}
		  }
		
		  // 导出时读取**最新**配置(可能用户录完才调 exportApi/exportActions)
		  const liveCfg = await loadConfig();
		  // v0.3.7: 各 type 是否写入 events.json 的真相集中在 resolveOutputs。
		  // 导出开关已镜像采集开关(见 utils.normalizeConfig),不再受历史遗留的 exportApi:false 影响。
		  const outFlags = resolveOutputs(sess.config, liveCfg);
		  const includeApi      = outFlags.includeApi;
		  const includeActions  = outFlags.includeActions;
		
		  const allEvents = [...sess.events].sort((a, b) => a.ts - b.ts);
		  const events = filterEvents(allEvents, outFlags);
		  // v0.2.9: 在 export 时重算 baseName,这样用户即使录完才填前缀也能生效
		  const livePrefix = sanitizePrefix(liveCfg.exportPrefix);
		  const baseName = `${livePrefix}-${new Date(sess.startedAt).toISOString().replace(/[:.]/g, '-')}`;
		  // cfg 用于"导出器/Playwright 选项",这里直接用 liveCfg 即可(用户在 stop 之后才改 baseUrl 也想生效)
		  const cfg = { ...sess.config, ...liveCfg };
		
		  // 按 type 分桶统计(同时给出过滤前/过滤后两份)
		  const bucket = arr => arr.reduce((m, e) => { m[e.type] = (m[e.type] || 0) + 1; return m; }, {});
		  const eventStats = { raw: bucket(allEvents), exported: bucket(events) };
		  console.log('[recorder] export stats:', eventStats,
		    'includeApi=', includeApi, 'includeActions=', includeActions);
		
		  // v0.2.8: 产物级开关(用户在"产物开关"段控制 zip 里出现哪些文件)
		  const wantVideo       = !!cfg.outVideo       && !!cfg.recordVideo;
		  const wantEvents      = !!cfg.outEvents;
		  const wantA11y        = !!cfg.outA11y;
		  const wantApiDetails  = !!cfg.outApiDetails  && includeApi;
		  const wantSpec        = !!cfg.outSpec        && !!cfg.emitPlaywright && includeActions;
		
		  // 1) events.json (主时间线 — api 事件只含 url/method/status 等精简字段)
		  let eventsJson = null;
		  if (wantEvents) {
		    eventsJson = JSON.stringify({
		      meta: {
		        version: '0.3.8',
		        startedAt: sess.startedAt,
		        endedAt: sess.endedAt || nowTs(),
		        tabId: sess.tabId,
		        startUrl: sess.startUrl,
		        stats: sess.stats,
		        eventStats,
		        files: {
		          events: 'events.json',
		          apiDetails: wantApiDetails ? 'api-details.json' : null,
		          a11yDir: wantA11y ? 'a11y/' : null,
		          spec: wantSpec ? 'test.spec.ts' : null,
		          video: wantVideo ? 'video.webm' : null,
		          viewer: 'viewer.html',
		        },
		        config: {
		          recordVideo: cfg.recordVideo,
		          captureApi: cfg.captureApi,
		          captureActions: cfg.captureActions,
		          emitPlaywright: cfg.emitPlaywright,
		          exportApi: includeApi,
		          exportActions: includeActions,
		          outVideo: wantVideo, outEvents: wantEvents, outA11y: wantA11y,
		          outApiDetails: wantApiDetails, outSpec: wantSpec,
		          exportPrefix: cfg.exportPrefix,
		          apiInclude: cfg.apiInclude,
		          apiExclude: cfg.apiExclude,
		          pwTestidAttr: cfg.pwTestidAttr,
		          uiDetail: resolveUiDetail(sess.config),
		          maxSemanticPeers: cfg.maxSemanticPeers,
		          maxAncestors: cfg.maxAncestors,
		        },
		      },
		      events,
		    }, null, 2);
		  }
		
		  // 2) api-details.json (完整 req/resp headers + body, 与 events 通过 requestId 关联)
		  let apiDetailsJson = null;
		  if (wantApiDetails && sess.apiDetails && sess.apiDetails.length) {
		    // 只导出已被 filter 命中并出现在 events 里的那些 requestId
		    const keepIds = new Set(events.filter(e => e.type === 'api').map(e => e.requestId));
		    const details = sess.apiDetails.filter(d => keepIds.has(d.requestId));
		    apiDetailsJson = JSON.stringify({
		      meta: {
		        version: '0.3.8',
		        count: details.length,
		        note: '通过 requestId 与 events.json 中的 type=api 事件关联',
		      },
		      details,
		    }, null, 2);
		  }
		
		  // 3) a11y/<page>.json — 按页面拆分(同一 url 的多次快照合并到该文件的 snapshots 数组)
		  // 同时生成一个 index.json 列出所有页面文件
		  const a11yFiles = [];
		  if (wantA11y && sess.a11ySnapshots && sess.a11ySnapshots.length) {
		    const byPage = new Map(); // url -> [snapshot...]
		    for (const snap of sess.a11ySnapshots) {
		      const key = snap.url || '(unknown)';
		      if (!byPage.has(key)) byPage.set(key, []);
		      byPage.get(key).push(snap);
		    }
		    // 处理重名(不同 url 经 urlToSafeFilename 后碰撞)
		    const usedNames = new Map();
		    const pageIndex = [];
		    for (const [url, snaps] of byPage) {
		      let fname = urlToSafeFilename(url);
		      const n = usedNames.get(fname) || 0;
		      usedNames.set(fname, n + 1);
		      if (n > 0) fname = `${fname}_${n + 1}`;
		      const data = JSON.stringify({
		        meta: {
		          version: '0.3.8',
		          url,
		          title: snaps[0]?.title || '',
		          snapshotCount: snaps.length,
		          reasons: snaps.map(s => s.reason),
		          source: 'CDP Accessibility.getFullAXTree',
		        },
		        snapshots: snaps,
		      }, null, 2);
		      a11yFiles.push({ name: `a11y/${fname}.json`, data });
		      pageIndex.push({ file: `a11y/${fname}.json`, url, title: snaps[0]?.title || '', snapshotCount: snaps.length });
		    }
		    // index 方便快速查找
		    a11yFiles.push({
		      name: 'a11y/index.json',
		      data: JSON.stringify({
		        meta: { version: '0.3.8', pageCount: pageIndex.length },
		        pages: pageIndex,
		      }, null, 2),
		    });
		  }
		
		  // 4) test.spec.ts (Playwright codegen 风格示例代码)
		  let spec = null;
		  if (wantSpec) {
		    spec = generatePlaywrightSpec(events, {
		      pwBaseUrl: cfg.pwBaseUrl || originOf(sess.startUrl),
		      pwWaitForNetworkIdle: cfg.pwWaitForNetworkIdle,
		      pwTestidAttr: cfg.pwTestidAttr,
		    });
		  }
		
		  // 5) viewer.html (始终带,体积小)
		  const viewerHtml = await fetchExt('src/viewer/viewer-standalone.html');
		
		  const filesText = [
		    { name: 'viewer.html', data: viewerHtml, type: 'text' },
		  ];
		  if (eventsJson)     filesText.push({ name: 'events.json',     data: eventsJson });
		  if (apiDetailsJson) filesText.push({ name: 'api-details.json', data: apiDetailsJson });
		  if (spec)           filesText.push({ name: 'test.spec.ts',     data: spec });
		  for (const f of a11yFiles) filesText.push(f);
		
		  // 让 offscreen 把当前缓存的视频 Blob 转成 base64 发回来（如果有的话）
		  let videoB64 = null;
		  if (wantVideo) {
		    try {
		      const r = await chrome.runtime.sendMessage({ cmd: MSG.OFFSCREEN_GET_VIDEO, target: 'offscreen' });
		      if (r?.ok && r.base64) videoB64 = r.base64;
		    } catch (e) { console.warn('[recorder] OFFSCREEN_GET_VIDEO failed', e); }
		  }
		
		  // 拼 zip：每个 entry 都放在 baseName/ 子目录下
		  const entries = filesText.map(f => ({
		    name: `${baseName}/${f.name}`,
		    bytes: textEncoder.encode(f.data),
		  }));
		  if (videoB64) {
		    entries.push({
		      name: `${baseName}/video.webm`,
		      bytes: base64ToBytes(videoB64),
		    });
		  }
		  const zipBytes = buildZipStored(entries);
		
		  // 让 offscreen 用 <a download> 把 zip 写出去
		  const zipB64 = bytesToBase64(zipBytes);
		  await ensureOffscreen();
		  await waitOffscreenReady(3000);
		  await chrome.runtime.sendMessage({
		    cmd: MSG.OFFSCREEN_DOWNLOAD_ZIP,
		    target: 'offscreen',
		    filename: `${baseName}.zip`,
		    base64: zipB64,
		  });
		
		  console.log('[recorder] exported zip', baseName, 'size=', zipBytes.length);
		  return baseName;
		}
		
		const textEncoder = new TextEncoder();
		
		function originOf(u) {
		  try { return new URL(u).origin; } catch { return ''; }
		}
		
		// v0.2.8: 把 URL 转成可作为文件名的字符串 (按页面拆分 a11y 用)
		function urlToSafeFilename(u) {
		  try {
		    const x = new URL(u);
		    // host + pathname; 去掉协议; 替换非法字符
		    let s = (x.host + x.pathname).replace(/\/+$/, '');
		    // hash 也带上(SPA 路由常见)
		    if (x.hash) s += x.hash;
		    if (x.search) s += x.search;
		    s = s.replace(/[^a-zA-Z0-9._\-]+/g, '_');
		    // 防止过长
		    if (s.length > 120) s = s.slice(0, 60) + '__' + hash32(s).toString(16);
		    return s || 'index';
		  } catch {
		    return 'page_' + hash32(String(u || '')).toString(16);
		  }
		}
		
		function hash32(s) {
		  let h = 0;
		  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
		  return h >>> 0;
		}
		
		async function fetchExt(path) {
		  const resp = await fetch(chrome.runtime.getURL(path));
		  return resp.text();
		}
		
		/** 把消息发给 tab 内所有 frame(顶层 + 子 frame),失败的 frame 静默跳过 */
		async function broadcastToAllFrames(tabId, msg) {
		  let frames = [];
		  try { frames = await chrome.webNavigation.getAllFrames({ tabId }) || []; } catch {}
		  if (!frames.length) {
		    // 退化:至少发一次给顶层
		    try { await chrome.tabs.sendMessage(tabId, msg); } catch {}
		    return;
		  }
		  await Promise.all(frames.map(f =>
		    chrome.tabs.sendMessage(tabId, msg, { frameId: f.frameId }).catch(() => {})
		  ));
		}
		
// #endregion
// #region ZIP stored no compression ----------
		// CRC32 表
		const CRC_TABLE = (() => {
		  const t = new Uint32Array(256);
		  for (let n = 0; n < 256; n++) {
		    let c = n;
		    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
		    t[n] = c >>> 0;
		  }
		  return t;
		})();
		function crc32(bytes) {
		  let c = 0xFFFFFFFF;
		  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
		  return (c ^ 0xFFFFFFFF) >>> 0;
		}
		
		/**
		 * 构建一个 ZIP 文件（stored / 不压缩）。entries: [{name, bytes}]。
		 * 返回 Uint8Array。
		 */
		function buildZipStored(entries) {
		  const enc = new TextEncoder();
		  const localChunks = [];
		  const centralChunks = [];
		  let offset = 0;
		
		  for (const e of entries) {
		    const nameBytes = enc.encode(e.name);
		    const crc = crc32(e.bytes);
		    const size = e.bytes.length;
		
		    // local file header
		    const local = new Uint8Array(30 + nameBytes.length);
		    const dvL = new DataView(local.buffer);
		    dvL.setUint32(0, 0x04034b50, true);
		    dvL.setUint16(4, 20, true);            // version needed
		    dvL.setUint16(6, 0, true);             // flags
		    dvL.setUint16(8, 0, true);             // method=stored
		    dvL.setUint16(10, 0, true);            // mod time
		    dvL.setUint16(12, 0x21, true);         // mod date (any)
		    dvL.setUint32(14, crc, true);
		    dvL.setUint32(18, size, true);
		    dvL.setUint32(22, size, true);
		    dvL.setUint16(26, nameBytes.length, true);
		    dvL.setUint16(28, 0, true);            // extra len
		    local.set(nameBytes, 30);
		    localChunks.push(local, e.bytes);
		
		    // central dir entry
		    const central = new Uint8Array(46 + nameBytes.length);
		    const dvC = new DataView(central.buffer);
		    dvC.setUint32(0, 0x02014b50, true);
		    dvC.setUint16(4, 20, true);            // version made by
		    dvC.setUint16(6, 20, true);            // version needed
		    dvC.setUint16(8, 0, true);
		    dvC.setUint16(10, 0, true);
		    dvC.setUint16(12, 0, true);
		    dvC.setUint16(14, 0x21, true);
		    dvC.setUint32(16, crc, true);
		    dvC.setUint32(20, size, true);
		    dvC.setUint32(24, size, true);
		    dvC.setUint16(28, nameBytes.length, true);
		    dvC.setUint16(30, 0, true);            // extra
		    dvC.setUint16(32, 0, true);            // comment
		    dvC.setUint16(34, 0, true);            // disk
		    dvC.setUint16(36, 0, true);            // internal attrs
		    dvC.setUint32(38, 0, true);            // external attrs
		    dvC.setUint32(42, offset, true);       // local header offset
		    central.set(nameBytes, 46);
		    centralChunks.push(central);
		
		    offset += local.length + e.bytes.length;
		  }
		
		  const centralSize = centralChunks.reduce((s, c) => s + c.length, 0);
		  const centralOffset = offset;
		
		  const eocd = new Uint8Array(22);
		  const dvE = new DataView(eocd.buffer);
		  dvE.setUint32(0, 0x06054b50, true);
		  dvE.setUint16(4, 0, true);
		  dvE.setUint16(6, 0, true);
		  dvE.setUint16(8, entries.length, true);
		  dvE.setUint16(10, entries.length, true);
		  dvE.setUint32(12, centralSize, true);
		  dvE.setUint32(16, centralOffset, true);
		  dvE.setUint16(20, 0, true);
		
		  const total = offset + centralSize + 22;
		  const out = new Uint8Array(total);
		  let p = 0;
		  for (const c of localChunks) { out.set(c, p); p += c.length; }
		  for (const c of centralChunks) { out.set(c, p); p += c.length; }
		  out.set(eocd, p);
		  return out;
		}
		
		function bytesToBase64(bytes) {
		  let s = '';
		  const chunk = 0x8000;
		  for (let i = 0; i < bytes.length; i += chunk) {
		    s += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
		  }
		  return btoa(s);
		}
		function base64ToBytes(b64) {
		  const bin = atob(b64);
		  const out = new Uint8Array(bin.length);
		  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
		  return out;
		}
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
   // #endregion
    // #region Orchestration Logic
	// Other globals currently defined at this spot: SCRIPT_NAME, _log, _warn, _error
	const INJECTED_MANIFEST = {"manifest_version":3,"name":"UI + API Recorder","version":"0.3.8","description":"One-click capture: tab video, network calls, UI actions, and a ready-to-run Playwright spec. All local, nothing uploaded.","permissions":["debugger","storage","activeTab","scripting","tabs","tabCapture","offscreen","webNavigation"],"optional_permissions":[],"content_scripts":[{"matches":["<all_urls>"],"js":["src/content/content.js"],"run_at":"document_start","all_frames":true,"css":[]}],"options_ui":{},"browser_action":{},"page_action":{},"action":{"default_popup":"src/popup/popup.html","default_title":"UI + API Recorder","default_icon":{"16":"icons/icon16.png","48":"icons/icon48.png","128":"icons/icon128.png"}},"icons":{"16":"icons/icon16.png","48":"icons/icon48.png","128":"icons/icon128.png"},"web_accessible_resources":[{"resources":["src/offscreen/offscreen.html","src/offscreen/offscreen.js","src/viewer/viewer-standalone.html"],"matches":["<all_urls>"]}],"background":{"service_worker":"src/background/background.js","type":"module"},"_id":"ui-api-recorder"};
	const CONTENT_SCRIPT_CONFIGS_FOR_MATCHING = [
	  {
	    "matches": [
	      "<all_urls>"
	    ]
	  }
	];
	const OPTIONS_PAGE_PATH = null;
	const POPUP_PAGE_PATH = "src/popup/popup.html";
	const EXTENSION_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAqklEQVR4nO3Pyw2AMBAD0Zwog/5Lohu4I5RA9jML2JLv81rTNC1k27rs59NN3V0Fj043T0WXwXjGpyIiwtMgGfFhiMx4dwQR74Yg410QdLwJQIebEHSwGUHH/htAh5oRdKQAdKQJQAeaEXScAHScANURw3gBBHAAVEXcjhegAqAa4nF8JcR0/CcANMIcTyLc4gmEe3wmIiw+GpISHoVIj/fA0M3dvS5Y++sO3W7pg+WsIFUAAAAASUVORK5CYII=";
	const extensionCssData = {};
	
	const LOCALE_KEYS = {};
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
		  const scriptName = "UI + API Recorder";
		  _log(`Starting execution phases...`);
		
  // #region Document Start
			  if (typeof document !== 'undefined') {
			    _log(`Executing document-start phase...`);
			    
			    const scriptPaths = ["src/content/content.js"];
			   _log(`  Executing JS (start): ${scriptPaths}`);
			
			   try {
			       // Keep variables from being redeclared for global scope, but also make them apply to global scope. (Theoretically)
			      with (globalThis){;
			// START: src/content/content.js
			/**
			 * Content script 入口
			 *
			 * v0.3.0:
			 *  - describe() 重写 → computedName / uniquenessHints / semanticPeers / ancestors 智能截断
			 *  - 类名白名单 / null 规整 / 容器内 uniqueness
			 *
			 * v0.3.1:
			 *  - hover → click 回溯绑定:延迟 emit + TTL 滑动窗口
			 *    - 监听 mouseover 识别 hover 起点
			 *    - MutationObserver(portal/popover/tooltip 容器新增)
			 *    - 可见性扫描(覆盖纯 CSS :hover)
			 *    - click 时反向查询:命中 → 输出 hover + click(triggeredBy);未命中 → 丢弃 hover
			 *    - 几何中心距离交叉校验,防止 portal 单例 tooltip 误归因
			 *    - 多 hover 命中标 attribution.ambiguous + warnings
			 *    - mouseleave 立即清队列
			 */
			
			(() => {
			  if (window.__actionRecorderInjected) return;
			  window.__actionRecorderInjected = true;
			
			  let recording = false;
			  let cfg = null;
			  let bound = false;
			
			  // v0.3.8: UI 记录详细度(与 utils.resolveUiDetail 保持一致;content 非 module 故内联)。
			  //  'full' 录前端 → 完整定位描述; 'lite' 仅后端 → 轻量步骤; 'off' 两者都关。
			  function uiDetail() {
			    if (!cfg) return 'off';
			    if (cfg.captureActions) return 'full';
			    if (cfg.captureApi) return 'lite';
			    return 'off';
			  }
			
  // #region ----------
				  const cleanText = s => (s || '').replace(/\s+/g, ' ').trim();
				  const nullable = s => {
				    const t = cleanText(s);
				    return t ? t : null;
				  };
				
  // #endregion
  // #region role ----------
				  const ROLE_MAP = {
				    A: el => el.hasAttribute('href') ? 'link' : null,
				    BUTTON: () => 'button',
				    INPUT: el => {
				      const t = (el.type || 'text').toLowerCase();
				      if (['button', 'submit', 'reset', 'image'].includes(t)) return 'button';
				      if (t === 'checkbox') return 'checkbox';
				      if (t === 'radio') return 'radio';
				      if (t === 'range') return 'slider';
				      if (t === 'search') return 'searchbox';
				      return 'textbox';
				    },
				    TEXTAREA: () => 'textbox',
				    SELECT: el => el.multiple ? 'listbox' : 'combobox',
				    OPTION: () => 'option',
				    H1: () => 'heading', H2: () => 'heading', H3: () => 'heading',
				    H4: () => 'heading', H5: () => 'heading', H6: () => 'heading',
				    NAV: () => 'navigation', MAIN: () => 'main', DIALOG: () => 'dialog',
				    FORM: () => 'form', ASIDE: () => 'complementary',
				    HEADER: () => 'banner', FOOTER: () => 'contentinfo',
				  };
				  function inferRole(el) {
				    if (!el || el.nodeType !== 1) return null;
				    const explicit = el.getAttribute && el.getAttribute('role');
				    if (explicit) return explicit.split(/\s+/)[0];
				    const fn = ROLE_MAP[el.tagName];
				    return fn ? fn(el) : null;
				  }
				
  // #endregion
  // #region W3C accname 1 2 ----------
				  function computeAccessibleName(el) {
				    if (!el || el.nodeType !== 1) return null;
				    const doc = el.ownerDocument || document;
				    const lblIds = el.getAttribute('aria-labelledby');
				    if (lblIds) {
				      const parts = lblIds.split(/\s+/).map(id => {
				        const ref = doc.getElementById(id);
				        return ref ? cleanText(ref.textContent) : '';
				      }).filter(Boolean);
				      const v = nullable(parts.join(' '));
				      if (v) return v;
				    }
				    const aria = el.getAttribute('aria-label');
				    if (aria) { const v = nullable(aria); if (v) return v; }
				    if (el.labels && el.labels.length) {
				      const v = nullable([...el.labels].map(l => l.textContent).join(' '));
				      if (v) return v;
				    }
				    if (el.tagName === 'INPUT') {
				      const t = (el.type || '').toLowerCase();
				      if (['button', 'submit', 'reset'].includes(t) && el.value) {
				        const v = nullable(el.value); if (v) return v;
				      }
				      if (el.alt) { const v = nullable(el.alt); if (v) return v; }
				    }
				    if (el.tagName === 'IMG' && el.alt) { const v = nullable(el.alt); if (v) return v; }
				    const ph = el.getAttribute('placeholder');
				    if (ph) { const v = nullable(ph); if (v) return v; }
				    if (el.title) { const v = nullable(el.title); if (v) return v; }
				    const text = nullable(el.textContent);
				    if (text) return text.length > 120 ? text.slice(0, 120) : text;
				    return null;
				  }
				
				  function getTestId(el, attrList) {
				    for (const a of attrList) {
				      const v = el.getAttribute && el.getAttribute(a);
				      if (v) return { attr: a, value: v };
				    }
				    return null;
				  }
				  function cssEscape(s) {
				    return String(s).replace(/[^a-zA-Z0-9_-]/g, c => '\\' + c);
				  }
				
				  function shortSelector(el) {
				    if (!el || el.nodeType !== 1) return '';
				    if (el.id) return '#' + cssEscape(el.id);
				    const parts = [];
				    let cur = el;
				    while (cur && cur.nodeType === 1 && cur.tagName !== 'HTML' && parts.length < 4) {
				      let part = cur.tagName.toLowerCase();
				      const cls = stableClasses(cur);
				      if (cls.length) part += '.' + cssEscape(cls[0]);
				      const parent = cur.parentElement;
				      if (parent) {
				        const sibs = [...parent.children].filter(c => c.tagName === cur.tagName);
				        if (sibs.length > 1) part += `:nth-of-type(${sibs.indexOf(cur) + 1})`;
				      }
				      parts.unshift(part);
				      cur = cur.parentElement;
				    }
				    return parts.join(' > ');
				  }
				
				  function isStableClass(c) {
				    if (!c || typeof c !== 'string') return false;
				    if (c.length > 40) return false;
				    if (/^_/.test(c)) return false;
				    if (/_[a-zA-Z0-9]{2,6}$/.test(c)) return false;
				    if (/[-_][a-z0-9]{5,}$/i.test(c) && /\d/.test(c)) return false;
				    if (/^[a-z0-9]{8,}$/i.test(c) && /\d/.test(c) && /[a-z]/i.test(c)) return false;
				    if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(c)) return false;
				    return true;
				  }
				  function stableClasses(el) {
				    if (!el || !el.classList) return [];
				    return [...el.classList].filter(isStableClass).slice(0, 4);
				  }
				
				  const ANCHOR_TAGS = new Set(['DIALOG','FORM','MAIN','NAV','SECTION','ASIDE','HEADER','FOOTER']);
				  const ANCHOR_ROLES = new Set([
				    'dialog','alertdialog','form','main','navigation','region',
				    'banner','contentinfo','complementary','search','group','list','menu','tablist',
				  ]);
				  function isAnchor(el) {
				    if (!el || el.nodeType !== 1) return false;
				    const r = el.getAttribute && el.getAttribute('role');
				    if (r && ANCHOR_ROLES.has(r.split(/\s+/)[0])) return true;
				    if (ANCHOR_TAGS.has(el.tagName)) {
				      if (el.tagName === 'SECTION') {
				        return !!(el.getAttribute('aria-label') || el.getAttribute('aria-labelledby'));
				      }
				      return true;
				    }
				    return false;
				  }
				
				  function semanticAncestor(el, maxDepth = 4) {
				    let cur = el; let i = 0;
				    while (cur && cur.nodeType === 1 && i < maxDepth) {
				      const r = inferRole(cur);
				      if (r || (cur.getAttribute && cur.getAttribute('role'))) return cur;
				      cur = cur.parentElement; i++;
				    }
				    return el;
				  }
				  function nearestContainer(el, maxDepth = 8) {
				    let cur = el.parentElement; let i = 0;
				    while (cur && cur.nodeType === 1 && i < maxDepth) {
				      if (isAnchor(cur)) return cur;
				      cur = cur.parentElement; i++;
				    }
				    return el.ownerDocument?.body || document.body;
				  }
				
				  function ancestorSnap(el, isAnchorFlag) {
				    if (!el || el.nodeType !== 1) return null;
				    const snap = {
				      tag: el.tagName.toLowerCase(),
				      role: inferRole(el) || null,
				      name: computeAccessibleName(el),
				    };
				    if (el.id) snap.id = el.id;
				    const cls = stableClasses(el);
				    if (cls.length) snap.classes = cls;
				    const ariaLabel = el.getAttribute('aria-label');
				    if (ariaLabel) snap.ariaLabel = ariaLabel.slice(0, 80);
				    const roleAttr = el.getAttribute('role');
				    if (roleAttr) snap.roleAttr = roleAttr;
				    if (el.getAttribute('data-testid')) snap.testid = el.getAttribute('data-testid').slice(0, 80);
				    if (isAnchorFlag) snap.anchor = true;
				    return snap;
				  }
				  function ancestorsOf(el, maxDepth = 5) {
				    const out = [];
				    let cur = el.parentElement; let i = 0; let stopped = false;
				    while (cur && cur.nodeType === 1 && i < maxDepth) {
				      const anchor = isAnchor(cur);
				      out.push(ancestorSnap(cur, anchor));
				      i++;
				      if (anchor) { stopped = true; break; }
				      cur = cur.parentElement;
				    }
				    if (!stopped && cur && cur.parentElement && out.length) {
				      out[out.length - 1].truncated = true;
				    }
				    return out;
				  }
				
				  function computeUniqueness(target, container, role, name) {
				    if (!container || !role || !name) {
				      return { uniqueInContainer: null, totalInContainer: 0 };
				    }
				    let peers;
				    try {
				      const byRole = container.querySelectorAll(`[role="${cssEscape(role)}"]`);
				      const set = new Set(byRole);
				      const implicit = container.querySelectorAll('a[href], button, input, select, textarea, h1, h2, h3, h4, h5, h6');
				      for (const el of implicit) if (inferRole(el) === role) set.add(el);
				      peers = [...set].filter(el => computeAccessibleName(el) === name);
				    } catch { peers = []; }
				    if (peers.length <= 1) {
				      return { uniqueInContainer: true, totalInContainer: peers.length || 1 };
				    }
				    const idx = peers.indexOf(target);
				    const hint = {
				      uniqueInContainer: false,
				      totalInContainer: peers.length,
				      index: idx >= 0 ? idx : null,
				    };
				    const near = nearbyDisambiguator(target);
				    if (near) hint.nearbyText = near;
				    return hint;
				  }
				  function nearbyDisambiguator(el) {
				    let sib = el.previousElementSibling; let steps = 0;
				    while (sib && steps < 3) {
				      const tag = sib.tagName;
				      if (/^H[1-6]$/.test(tag) || tag === 'LABEL' || tag === 'LEGEND' || tag === 'CAPTION') {
				        const t = nullable(sib.textContent);
				        if (t) return t.slice(0, 60);
				      }
				      sib = sib.previousElementSibling; steps++;
				    }
				    let parent = el.parentElement; let up = 0;
				    while (parent && up < 2) {
				      const h = parent.querySelector('h1,h2,h3,h4,h5,h6,legend,caption');
				      if (h && !el.contains(h) && h !== el) {
				        const t = nullable(h.textContent);
				        if (t) return t.slice(0, 60);
				      }
				      parent = parent.parentElement; up++;
				    }
				    return null;
				  }
				
				  function semanticPeersOf(target, container, role, limit = 3) {
				    if (!container || !role) return [];
				    let peers;
				    try {
				      const byRole = container.querySelectorAll(`[role="${cssEscape(role)}"]`);
				      const set = new Set(byRole);
				      const implicit = container.querySelectorAll('a[href], button, input, select, textarea, h1, h2, h3, h4, h5, h6');
				      for (const el of implicit) if (inferRole(el) === role) set.add(el);
				      peers = [...set];
				    } catch { peers = []; }
				    return peers.slice(0, limit).map(el => {
				      const o = { role, name: computeAccessibleName(el), selector: shortSelector(el) };
				      if (el === target) o.isTarget = true;
				      return o;
				    });
				  }
				
				  function describe(el) {
				    if (!el || el.nodeType !== 1) return null;
				    // v0.3.8: 仅后端场景走轻量分支,只感知步骤,不做定位
				    if (uiDetail() === 'lite') return describeLite(el);
				
				    const sem = semanticAncestor(el);
				    const testidAttrs = ((cfg && cfg.pwTestidAttr) || 'data-testid')
				      .split(',').map(s => s.trim()).filter(Boolean);
				    const tid = getTestId(sem, testidAttrs) || getTestId(el, testidAttrs);
				
				    const role = inferRole(sem);
				    const computedName = computeAccessibleName(sem);
				    const container = nearestContainer(sem);
				
				    let testidUnique = null;
				    if (tid) {
				      try {
				        const all = container.querySelectorAll(`[${cssEscape(tid.attr)}="${cssEscape(tid.value)}"]`);
				        testidUnique = all.length === 1;
				      } catch { testidUnique = null; }
				    }
				    // v0.3.8 方案A(无损瘦身):删除与 computedName 完全同值的冗余 name;
				    // 空值字段(placeholder/label/testid/frameUrl/isTop 等)一律省略 key。
				    // semanticPeers / ancestors 的截断上限改为可配(默认 3/3)。
				    const maxPeers = (cfg && Number.isFinite(cfg.maxSemanticPeers)) ? cfg.maxSemanticPeers : 3;
				    const maxAnc   = (cfg && Number.isFinite(cfg.maxAncestors))     ? cfg.maxAncestors     : 3;
				
				    const out = {
				      tag: sem.tagName.toLowerCase(),
				      role,
				      computedName,
				      selector: shortSelector(sem),
				      uniquenessHints: computeUniqueness(sem, container, role, computedName),
				    };
				    const text = cleanText((sem.textContent || '').slice(0, 120));
				    if (text && text !== computedName) out.text = text;
				    if (tid) { out.testid = tid; out.testidUnique = testidUnique; }
				    const ph = sem.getAttribute && sem.getAttribute('placeholder');
				    if (ph) out.placeholder = ph;
				    const lbl = (sem.labels && sem.labels[0]?.textContent) ? cleanText(sem.labels[0].textContent) : '';
				    if (lbl) out.label = lbl;
				    if (window !== window.top) { out.frameUrl = location.href; out.isTop = false; }
				    if (maxPeers > 0) {
				      const peers = semanticPeersOf(sem, container, role, maxPeers);
				      if (peers.length) out.semanticPeers = peers;
				    }
				    if (maxAnc > 0) {
				      const anc = ancestorsOf(sem, maxAnc);
				      if (anc.length) out.ancestors = anc;
				    }
				    return out;
				  }
				
				  // v0.3.8: 轻量 UI 描述 —— 只为"感知前端操作步骤",不含任何定位上下文。
				  // 保留 role + 可访问名 + tag + 截短文本;fill/select 的输入值由各 handler 负责带上(需求要求保留)。
				  function describeLite(el) {
				    if (!el || el.nodeType !== 1) return null;
				    const sem = semanticAncestor(el);
				    const role = inferRole(sem);
				    const name = computeAccessibleName(sem);
				    const o = { tag: sem.tagName.toLowerCase() };
				    if (role) o.role = role;
				    if (name) o.name = name;
				    const text = cleanText((sem.textContent || '').slice(0, 60));
				    if (text && text !== name) o.text = text;
				    return o;
				  }
				
  // #endregion
  // #region ----------
				  function send(event) {
				    const payload = { cmd: 'recorder/fe-event', event };
				    try {
				      const p = chrome.runtime.sendMessage(payload);
				      if (p && typeof p.catch === 'function') {
				        p.catch(err => {
				          console.warn('[recorder.content] sendMessage failed, retry once', err);
				          setTimeout(() => {
				            try { chrome.runtime.sendMessage(payload).catch(() => {}); } catch {}
				          }, 50);
				        });
				      }
				    } catch (e) {
				      console.warn('[recorder.content] sendMessage threw', e);
				    }
				  }
				
				  // ============================================================
				  // v0.3.1: HOVER → CLICK 回溯绑定模块
				  // ============================================================
				  const HoverModule = (() => {
				    let mo = null;
				    let scanTimer = null;
				    /**
				     * activeHovers: 最近 TTL 窗口内未完成绑定的 hover 记录
				     *   { id, ts, triggerEl, triggerSnapshot, triggerRect, triggerCenter,
				     *     candidates: Map<el, { strategy, revealedAt, rect, center }>,
				     *     baselineVisibility: WeakMap<el, bool>,
				     *     ttlTimer }
				     */
				    const activeHovers = [];
				    const HOVER_ID_PREFIX = () => `h_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
				    // v0.3.3: 最近被 TTL prune 掉的 hover,用于 click 时提示 "hover→click 间隔过长"
				    const recentlyPruned = [];   // [{ts, triggerEl, hadCandidate}]
				    const PRUNE_LOG_KEEP_MS = 5000;
				
				    function ttl() { return (cfg && cfg.hoverTtlMs) || 3000; }
				    function geomThreshold() { return (cfg && cfg.hoverGeomThreshold) || 240; }
				    function dbg(...args) { if (cfg && cfg.hoverDebug) console.debug('[recorder.hover]', ...args); }
				
				    function centerOf(rect) {
				      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
				    }
				    function distance(a, b) {
				      if (!a || !b) return Infinity;
				      return Math.hypot(a.x - b.x, a.y - b.y);
				    }
				
				    /** 元素是否"可见"(粗略版,够回溯使用) */
				    function isVisible(el) {
				      if (!el || el.nodeType !== 1 || !el.isConnected) return false;
				      const rect = el.getBoundingClientRect();
				      if (rect.width === 0 && rect.height === 0) return false;
				      const cs = el.ownerDocument.defaultView.getComputedStyle(el);
				      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.visibility === 'collapse') return false;
				      if (parseFloat(cs.opacity) === 0) return false;
				      if (el.hasAttribute('hidden')) return false;
				      const ah = el.getAttribute('aria-hidden');
				      if (ah === 'true') return false;
				      return true;
				    }
				
				    /** 是否"看起来像 popover/menu/tooltip/dropdown"——白名单加速,避免拿大量普通节点 */
				    function looksLikeReveal(el) {
				      if (!el || el.nodeType !== 1) return false;
				      const r = el.getAttribute && el.getAttribute('role');
				      if (r && /^(tooltip|menu|menuitem|listbox|dialog|alertdialog|menubar|combobox)$/.test(r)) return true;
				      const cls = (el.className && typeof el.className === 'string') ? el.className : '';
				      if (/(tooltip|popover|popper|dropdown|menu|tippy|popup|overlay|flyout)/i.test(cls)) return true;
				      const tag = el.tagName;
				      if (tag === 'DIALOG') return true;
				      // 任何插入后立刻可交互的元素也算
				      if (tag === 'BUTTON' || tag === 'A') {
				        // 仅当其在 trigger 附近(由 distance 校验保证)
				        return true;
				      }
				      return false;
				    }
				
				    // 待扫描的候选根:hover trigger 的祖先(2 层) + 兄弟 + body 末尾 portal 容器
				    // v0.3.3: portal 容器扩大到末尾 8 个 + 向下递归 2 层;并加全局 popup-like 节点兜底
				    function scanRoots(triggerEl) {
				      const roots = new Set();
				      // ancestors 2 层
				      let cur = triggerEl.parentElement; let i = 0;
				      while (cur && i < 2) { roots.add(cur); cur = cur.parentElement; i++; }
				      // siblings
				      const parent = triggerEl.parentElement;
				      if (parent) for (const c of parent.children) if (c !== triggerEl) roots.add(c);
				      // body 末尾 portal,向下展开 2 层
				      const body = document.body;
				      if (body) {
				        const last = [...body.children].slice(-8);
				        for (const c of last) {
				          roots.add(c);
				          // 1 层
				          if (c.children && c.children.length < 40) {
				            for (const c1 of c.children) {
				              roots.add(c1);
				              // 2 层(portal Modal > Inner > Popup 这种深层结构)
				              if (c1.children && c1.children.length < 40) {
				                for (const c2 of c1.children) roots.add(c2);
				              }
				            }
				          }
				        }
				      }
				      // 全局 popup-like 兜底:任何 [role=tooltip|menu|dialog|menuitem|listbox|combobox] 都纳入候选
				      try {
				        const popups = document.querySelectorAll(
				          '[role=tooltip],[role=menu],[role=menuitem],[role=dialog],[role=alertdialog],[role=listbox],[role=combobox]'
				        );
				        for (const p of popups) roots.add(p);
				      } catch {}
				      return [...roots];
				    }
				
				    /** 在 trigger 附近找新出现的 reveal 候选 */
				    function probeReveals(hoverRec, strategy) {
				      const trigger = hoverRec.triggerEl;
				      if (!trigger || !trigger.isConnected) return;
				      const roots = scanRoots(trigger);
				      for (const root of roots) {
				        if (!root || !root.isConnected) continue;
				        // root 自身
				        considerCandidate(hoverRec, root, strategy);
				        // 1 层子节点(避免遍历大树)
				        if (root.children && root.children.length < 50) {
				          for (const c of root.children) considerCandidate(hoverRec, c, strategy);
				        }
				      }
				    }
				
				    function considerCandidate(hoverRec, el, strategy) {
				      if (!el || el.nodeType !== 1) return;
				      if (el === hoverRec.triggerEl || hoverRec.triggerEl.contains(el)) return;  // 自身不算
				      if (hoverRec.candidates.has(el)) return;
				      // baseline:hover 启动那一刻 baseline 不可见,现在可见 → 算"显现"
				      const baseline = hoverRec.baselineVisibility.get(el);
				      const visNow = isVisible(el);
				      if (baseline === true) return;  // 之前就可见,不算 reveal
				      if (!visNow) return;            // 仍不可见,不入库
				      if (!looksLikeReveal(el)) return;
				      const rect = el.getBoundingClientRect();
				      const cen = centerOf(rect);
				      // 几何阈值粗筛:trigger 中心与候选中心距离超阈值直接丢(放宽到 ×4,大屏 dropdown 友好)
				      if (distance(cen, hoverRec.triggerCenter) > geomThreshold() * 4) return;
				      hoverRec.candidates.set(el, { strategy, revealedAt: Date.now(), rect, center: cen });
				      dbg('candidate captured', {
				        hoverId: hoverRec.id, strategy,
				        role: el.getAttribute && el.getAttribute('role'),
				        tag: el.tagName,
				        dist: Math.round(distance(cen, hoverRec.triggerCenter)),
				      });
				      // v0.3.3: 出现 candidate → 自动续期 TTL(再给 2× ttl,覆盖用户阅读+决定时间)
				      if (hoverRec.ttlTimer) {
				        clearTimeout(hoverRec.ttlTimer);
				        hoverRec.ttlTimer = setTimeout(() => {
				          const i = activeHovers.indexOf(hoverRec);
				          if (i >= 0) {
				            recentlyPruned.push({ ts: Date.now(), triggerEl: hoverRec.triggerEl, hadCandidate: hoverRec.candidates.size > 0 });
				            activeHovers.splice(i, 1);
				            dbg('hover pruned (after renewal)', { hoverId: hoverRec.id, candidates: hoverRec.candidates.size });
				          }
				        }, ttl() * 2);
				      }
				    }
				
				    /** 整页 baseline:仅给 trigger 的 scanRoots 建索引,避免遍历整树 */
				    function recordBaseline(hoverRec) {
				      const roots = scanRoots(hoverRec.triggerEl);
				      for (const root of roots) {
				        if (!root || !root.isConnected) continue;
				        hoverRec.baselineVisibility.set(root, isVisible(root));
				        if (root.children && root.children.length < 50) {
				          for (const c of root.children) {
				            hoverRec.baselineVisibility.set(c, isVisible(c));
				          }
				        }
				      }
				    }
				
				    function startMutationObserver() {
				      if (mo || !document.documentElement) return;
				      mo = new MutationObserver(mutations => {
				        if (!activeHovers.length) return;
				        for (const m of mutations) {
				          if (m.type === 'childList') {
				            for (const n of m.addedNodes) {
				              if (n.nodeType !== 1) continue;
				              for (const h of activeHovers) considerCandidate(h, n, 'mutation');
				            }
				          } else if (m.type === 'attributes') {
				            for (const h of activeHovers) considerCandidate(h, m.target, 'mutation');
				          }
				        }
				      });
				      mo.observe(document.documentElement, {
				        subtree: true,
				        childList: true,
				        attributes: true,
				        attributeFilter: ['style', 'class', 'aria-hidden', 'hidden'],
				        // 不监听 characterData,避免文本输入页爆量
				      });
				    }
				
				    function ensureScanLoop() {
				      if (scanTimer) return;
				      scanTimer = setInterval(() => {
				        if (!activeHovers.length) {
				          clearInterval(scanTimer); scanTimer = null; return;
				        }
				        for (const h of activeHovers) probeReveals(h, 'visibility');
				      }, 120);
				    }
				
				    function pruneExpired() {
				      const now = Date.now();
				      while (activeHovers.length && now - activeHovers[0].ts > ttl()) {
				        activeHovers.shift();   // 未绑定 click → 丢弃
				      }
				    }
				
				    function noteHover(triggerEl) {
				      if (!triggerEl || triggerEl.nodeType !== 1) return null;
				      // v0.3.3: 同一 nearestContainer 在 TTL 内只允许一条记录,避免子元素冒泡产生 N 条
				      const anchor = (() => {
				        try { return nearestContainer(triggerEl); } catch { return triggerEl; }
				      })();
				      if (activeHovers.some(h => h._anchor === anchor && Date.now() - h.ts < ttl())) {
				        return null;
				      }
				      const rect = triggerEl.getBoundingClientRect();
				      // 若 trigger 覆盖面积过大(>60% viewport),换用更小的子元素提高几何精度
				      // 极端 case:semanticAncestor 上提到 body/main 容器,导致 distance 永远超阈值
				      let effectiveTrigger = triggerEl;
				      const viewport = window.innerWidth * window.innerHeight;
				      if (viewport > 0 && rect.width * rect.height / viewport > 0.6) {
				        effectiveTrigger = triggerEl;  // 保留原 trigger,但 center 用 rect 中心
				      }
				      const rec = {
				        id: HOVER_ID_PREFIX(),
				        ts: Date.now(),
				        triggerEl: effectiveTrigger,
				        _anchor: anchor,
				        triggerRect: rect,
				        triggerCenter: centerOf(rect),
				        triggerSnapshot: null,    // 延迟到 emit 时再算 describe(贵)
				        candidates: new Map(),
				        baselineVisibility: new WeakMap(),
				        ttlTimer: null,
				      };
				      recordBaseline(rec);
				      activeHovers.push(rec);
				      startMutationObserver();
				      ensureScanLoop();
				      dbg('noteHover', {
				        hoverId: rec.id,
				        tag: triggerEl.tagName,
				        role: triggerEl.getAttribute && triggerEl.getAttribute('role'),
				        rect: { w: Math.round(rect.width), h: Math.round(rect.height) },
				      });
				      // TTL 到期自动丢(无 candidate 则记 recentlyPruned 以便 click 时提示)
				      rec.ttlTimer = setTimeout(() => {
				        const i = activeHovers.indexOf(rec);
				        if (i >= 0) {
				          recentlyPruned.push({ ts: Date.now(), triggerEl: rec.triggerEl, hadCandidate: rec.candidates.size > 0 });
				          activeHovers.splice(i, 1);
				          dbg('hover pruned (initial TTL)', { hoverId: rec.id, candidates: rec.candidates.size });
				        }
				      }, ttl() + 50);
				      return rec;
				    }
				
				    /** mouseout/mouseleave:若 trigger 已离开且其候选全部不可见,立即清掉这条 */
				    function noteLeave(triggerEl) {
				      const now = Date.now();
				      for (let i = activeHovers.length - 1; i >= 0; i--) {
				        const h = activeHovers[i];
				        if (h.triggerEl !== triggerEl) continue;
				        let anyVisible = false;
				        for (const [el] of h.candidates) if (isVisible(el)) { anyVisible = true; break; }
				        if (!anyVisible) {
				          clearTimeout(h.ttlTimer);
				          activeHovers.splice(i, 1);
				        }
				        // 否则保留:用户可能从 trigger 移到 popup 上点击
				        if (now - h.ts > ttl()) {
				          clearTimeout(h.ttlTimer);
				          activeHovers.splice(i, 1);
				        }
				      }
				    }
				
				    /** click 时反向查询匹配的 hover */
				    function bindClick(clickedEl) {
				      pruneExpired();
				      // v0.3.3: 即便 activeHovers 空,也要查 recentlyPruned 给出诊断
				      if (!activeHovers.length) {
				        const now = Date.now();
				        // 清掉 5s 之前的
				        while (recentlyPruned.length && now - recentlyPruned[0].ts > PRUNE_LOG_KEEP_MS) {
				          recentlyPruned.shift();
				        }
				        if (recentlyPruned.length) {
				          dbg('bindClick: no active hovers but recent prune exists', {
				            pruned: recentlyPruned.length,
				            hadCandidate: recentlyPruned.some(p => p.hadCandidate),
				          });
				        }
				        return null;
				      }
				      const clickedRect = clickedEl.getBoundingClientRect();
				      const clickedCen = centerOf(clickedRect);
				      const clickedRole = inferRole(semanticAncestor(clickedEl));
				      const clickedName = computeAccessibleName(semanticAncestor(clickedEl));
				      dbg('bindClick', {
				        clickedRole, clickedName: (clickedName || '').slice(0, 40),
				        activeHovers: activeHovers.length,
				      });
				
				      const matches = [];
				      for (const h of activeHovers) {
				        // 直接命中:click 落在某 candidate 内
				        let containmentMatch = false;
				        let chosenCand = null;
				        let chosenStrategy = null;
				        for (const [el, info] of h.candidates) {
				          if (el === clickedEl || el.contains(clickedEl)) {
				            containmentMatch = true;
				            chosenCand = el;
				            chosenStrategy = info.strategy;
				            break;
				          }
				        }
				        // 几何 + 指纹命中:portal 场景下 click 可能不落在我们抓的 candidate 内,
				        // 但落点离 trigger 一定距离内,且 click 元素自身是新出现的(刚 reveal)
				        // v0.3.3: 放宽到 ×1.5 (popup 离 trigger 偏远是常见的)
				        let fingerprintMatch = false;
				        if (!containmentMatch) {
				          const dist = distance(clickedCen, h.triggerCenter);
				          if (dist <= geomThreshold() * 1.5) {
				            // 看 candidates 里有没有 role+name 与 click 元素一致的
				            for (const [el, info] of h.candidates) {
				              const r = inferRole(semanticAncestor(el));
				              const n = computeAccessibleName(semanticAncestor(el));
				              if (r && r === clickedRole && n && n === clickedName) {
				                fingerprintMatch = true;
				                chosenCand = el;
				                chosenStrategy = info.strategy;
				                break;
				              }
				            }
				            // 没有匹配 candidate 但 click 元素本身就是某 popup 内的可交互元素
				            // → 退一步:只要 click 元素是 popup-like 子树的一员就算 low-conf 命中
				            if (!fingerprintMatch && h.candidates.size === 0) {
				              // 兜底:click 元素的祖先里有 [role=tooltip|menu|dialog|menuitem]
				              let p = clickedEl.parentElement;
				              for (let i = 0; p && i < 8; i++, p = p.parentElement) {
				                const rr = p.getAttribute && p.getAttribute('role');
				                if (rr && /^(tooltip|menu|menuitem|dialog|alertdialog|listbox|combobox)$/.test(rr)) {
				                  fingerprintMatch = true;
				                  chosenCand = p;
				                  chosenStrategy = 'ancestor-role';
				                  break;
				                }
				              }
				            }
				          }
				        }
				        if (containmentMatch || fingerprintMatch) {
				          matches.push({ h, chosenCand, chosenStrategy,
				            confidence: containmentMatch ? 'high' : 'low',
				            distance: distance(clickedCen, h.triggerCenter) });
				        }
				      }
				      if (!matches.length) {
				        dbg('bindClick: no match', { activeHovers: activeHovers.length });
				        return null;
				      }
				
				      // 多 match → 取最近(距离最小)的;但标记 ambiguous
				      matches.sort((a, b) => a.distance - b.distance);
				      const best = matches[0];
				      const ambiguous = matches.length > 1;
				      const triggerSnapshot = describe(best.h.triggerEl);
				      const candEl = best.chosenCand;
				      const candRole = candEl ? inferRole(semanticAncestor(candEl)) : null;
				      const candName = candEl ? computeAccessibleName(semanticAncestor(candEl)) : null;
				      const latency = candEl ? (best.h.candidates.get(candEl)?.revealedAt - best.h.ts) : null;
				      const warnings = [];
				      if (ambiguous) warnings.push('hoverAttributionAmbiguous');
				      if (best.confidence === 'low') warnings.push('hoverAttributionByFingerprint');
				
				      // 从队列移除已被消费的
				      const idx = activeHovers.indexOf(best.h);
				      if (idx >= 0) { clearTimeout(best.h.ttlTimer); activeHovers.splice(idx, 1); }
				
				      return {
				        hoverEventId: best.h.id,
				        hoverEvent: {
				          id: best.h.id,
				          type: 'ui',
				          action: 'hover',
				          ts: best.h.ts,
				          target: triggerSnapshot,
				          hoverReveal: {
				            strategy: best.chosenStrategy,
				            revealedRole: candRole,
				            revealedName: candName,
				            revealedSelector: candEl ? shortSelector(candEl) : null,
				            latencyMs: latency,
				          },
				          attribution: {
				            confidence: best.confidence,
				            ...(ambiguous ? { ambiguous: true } : {}),
				            ...(warnings.length ? { warnings } : {}),
				          },
				        },
				      };
				    }
				
				    function stop() {
				      if (mo) { try { mo.disconnect(); } catch {} mo = null; }
				      if (scanTimer) { clearInterval(scanTimer); scanTimer = null; }
				      for (const h of activeHovers) clearTimeout(h.ttlTimer);
				      activeHovers.length = 0;
				    }
				
				    function stats() {
				      const now = Date.now();
				      // 过期清理
				      while (recentlyPruned.length && now - recentlyPruned[0].ts > PRUNE_LOG_KEEP_MS) {
				        recentlyPruned.shift();
				      }
				      return {
				        activeCount: activeHovers.length,
				        recentlyPrunedCount: recentlyPruned.length,
				        recentlyPrunedHadCandidate: recentlyPruned.some(p => p.hadCandidate),
				      };
				    }
				
				    return { noteHover, noteLeave, bindClick, stop, stats };
				  })();
				
  // #endregion
  // #region DOM ----------
				  function onMouseOver(e) {
				    // hover 捕捉是"完整 UI 定位"能力的一部分,lite(仅后端)不需要
				    if (!recording || !cfg || !cfg.captureHover || uiDetail() !== 'full') return;
				    const t = e.target;
				    if (!t || t.nodeType !== 1) return;
				    // v0.3.3: 不再 pre-ancestor;HoverModule.noteHover 内部用 nearestContainer 做去重
				    // 这样 trigger 的几何中心更精确(就在用户鼠标所在的元素上)
				    HoverModule.noteHover(t);
				  }
				  function onMouseOut(e) {
				    if (!recording || !cfg || !cfg.captureHover || uiDetail() !== 'full') return;
				    const t = e.target;
				    if (!t || t.nodeType !== 1) return;
				    // related target 仍在 trigger 内,则不算 leave
				    if (e.relatedTarget && t.contains(e.relatedTarget)) return;
				    HoverModule.noteLeave(t);
				  }
				
				  function onClick(e) {
				    if (!recording) return;
				    const el = e.target;
				    if (!el) return;
				
				    let triggeredBy = null;
				    let extraWarnings = null;
				    if (cfg && cfg.captureHover && uiDetail() === 'full') {
				      const binding = HoverModule.bindClick(el);
				      if (binding) {
				        send(binding.hoverEvent);   // 先 emit hover
				        triggeredBy = binding.hoverEventId;
				      } else {
				        // v0.3.3: bindClick 失败时,如果最近确实有 hover 被 prune 且有过 candidate,
				        // 给 click 挂 hoverAttributionExpired,方便用户在 events.json 里搜出来调大 TTL
				        const s = HoverModule.stats();
				        if (s.recentlyPrunedHadCandidate) {
				          extraWarnings = ['hoverAttributionExpired'];
				        }
				      }
				    }
				
				    const ev = {
				      type: 'ui',
				      action: 'click',
				      ts: Date.now(),
				      target: describe(el),
				      button: e.button,
				      modifiers: collectMods(e),
				    };
				    if (triggeredBy) ev.triggeredBy = triggeredBy;
				    if (extraWarnings) ev.warnings = extraWarnings;
				    send(ev);
				  }
				
				  function onDblClick(e) {
				    if (!recording) return;
				    send({
				      type: 'ui', action: 'dblclick', ts: Date.now(),
				      target: describe(e.target), modifiers: collectMods(e),
				    });
				  }
				
				  function onChange(e) {
				    if (!recording) return;
				    const el = e.target;
				    if (!el) return;
				    if (el.tagName === 'SELECT') {
				      const opts = [...el.selectedOptions].map(o => ({ value: o.value, text: o.textContent }));
				      send({
				        type: 'ui', action: 'select', ts: Date.now(),
				        target: describe(el),
				        value: el.multiple ? opts : (opts[0] || null),
				      });
				    } else if (el.type === 'checkbox' || el.type === 'radio') {
				      send({
				        type: 'ui', action: el.checked ? 'check' : 'uncheck',
				        ts: Date.now(), target: describe(el),
				      });
				    }
				  }
				
				  const inputTimers = new WeakMap();
				  function onInput(e) {
				    if (!recording) return;
				    const el = e.target;
				    if (!el || (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' && !el.isContentEditable)) return;
				    if (el.type === 'checkbox' || el.type === 'radio') return;
				    clearTimeout(inputTimers.get(el));
				    const t = setTimeout(() => {
				      const v = el.isContentEditable ? el.innerText : el.value;
				      send({
				        type: 'ui', action: 'fill', ts: Date.now(),
				        target: describe(el),
				        value: typeof v === 'string' ? v.slice(0, 500) : '',
				      });
				    }, 350);
				    inputTimers.set(el, t);
				  }
				
				  function onKeyDown(e) {
				    if (!recording) return;
				    const isFunc = ['Enter','Tab','Escape','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Backspace','Delete'].includes(e.key);
				    const isCombo = (e.ctrlKey || e.metaKey || e.altKey) && e.key.length === 1;
				    if (!isFunc && !isCombo) return;
				    send({
				      type: 'ui', action: 'press', ts: Date.now(),
				      target: describe(e.target), key: e.key, modifiers: collectMods(e),
				    });
				  }
				
				  function collectMods(e) {
				    const m = [];
				    if (e.ctrlKey) m.push('Control');
				    if (e.metaKey) m.push('Meta');
				    if (e.altKey) m.push('Alt');
				    if (e.shiftKey) m.push('Shift');
				    return m;
				  }
				
				  let lastUrl = location.href;
				  function onUrlMaybeChanged() {
				    if (location.href !== lastUrl) {
				      const from = lastUrl;
				      lastUrl = location.href;
				      if (recording && window === window.top) {
				        send({ type: 'nav', action: 'navigate', ts: Date.now(), from, to: location.href });
				      }
				    }
				  }
				
				  function bind() {
				    if (bound) return;
				    bound = true;
				    document.addEventListener('click', onClick, true);
				    document.addEventListener('dblclick', onDblClick, true);
				    document.addEventListener('change', onChange, true);
				    document.addEventListener('input', onInput, true);
				    document.addEventListener('keydown', onKeyDown, true);
				    document.addEventListener('mouseover', onMouseOver, true);
				    document.addEventListener('mouseout', onMouseOut, true);
				    window.addEventListener('popstate', onUrlMaybeChanged);
				    window.addEventListener('hashchange', onUrlMaybeChanged);
				    if (!history.__recorderPatched) {
				      history.__recorderPatched = true;
				      const wrap = (orig) => function () {
				        const r = orig.apply(this, arguments);
				        setTimeout(onUrlMaybeChanged, 0);
				        return r;
				      };
				      history.pushState = wrap(history.pushState);
				      history.replaceState = wrap(history.replaceState);
				    }
				  }
				  function unbind() {
				    if (!bound) return;
				    bound = false;
				    document.removeEventListener('click', onClick, true);
				    document.removeEventListener('dblclick', onDblClick, true);
				    document.removeEventListener('change', onChange, true);
				    document.removeEventListener('input', onInput, true);
				    document.removeEventListener('keydown', onKeyDown, true);
				    document.removeEventListener('mouseover', onMouseOver, true);
				    document.removeEventListener('mouseout', onMouseOut, true);
				    window.removeEventListener('popstate', onUrlMaybeChanged);
				    window.removeEventListener('hashchange', onUrlMaybeChanged);
				    HoverModule.stop();
				  }
				
				  let metaStartSent = false;
				
				  // ============================================================
				  // v0.3.2: 页面内录制指示器(诚实化 UI)
				  //   3 种状态:
  // #endregion
  // #endregion
  // #endregion
    // #endregion
  // #region session
	  //   注入条件:仅顶层 frame(iframe 不重复出指示器)
	  // ============================================================
	  const Indicator = (() => {
	    let root = null;
	    let shadow = null;
	    let label = null;
	    let dot = null;
	
	    function ensureMounted() {
	      if (root || window !== window.top) return;
	      if (!document.body) return;        // document_start 时还没有 body,延后
	      root = document.createElement('div');
	      root.id = '__ui_api_recorder_indicator__';
	      // 关键:用 Shadow DOM 隔离页面样式
	      root.style.cssText = `
	        all: initial;
	        position: fixed; right: 12px; bottom: 12px; z-index: 2147483647;
	        pointer-events: none;
	      `;
	      shadow = root.attachShadow({ mode: 'closed' });
	      shadow.innerHTML = `
	        <style>
	          .box {
	            display: inline-flex; align-items: center; gap: 6px;
	            padding: 5px 10px; border-radius: 14px;
	            font: 500 12px/1 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
	            color: #fff; box-shadow: 0 2px 10px rgba(0,0,0,.25);
	            user-select: none; pointer-events: auto;
	            transition: background .15s;
	          }
	          .box.rec  { background: #e53935; }
	          .box.idle { background: rgba(90,90,90,.85); }
	          .dot {
	            width: 8px; height: 8px; border-radius: 50%;
	            background: #fff; box-shadow: 0 0 6px rgba(255,255,255,.9);
	          }
	          .box.rec .dot { animation: pulse 1.2s infinite ease-in-out; }
	          .box.idle .dot { background: #cfcfcf; box-shadow: none; opacity: .7; }
	          @keyframes pulse {
	            0%,100% { opacity: 1;   transform: scale(1); }
	            50%     { opacity: .35; transform: scale(.75); }
	          }
	        </style>
	        <div class="box idle" part="box">
	          <span class="dot"></span>
	          <span class="lbl">未在录制此页</span>
	        </div>
	      `;
	      const box = shadow.querySelector('.box');
	      dot = shadow.querySelector('.dot');
	      label = shadow.querySelector('.lbl');
	      box.title = 'UI + API Recorder';
	      document.documentElement.appendChild(root);
	    }
	
	    function setState(kind) {
	      if (window !== window.top) return;
	      ensureMounted();
	      if (!shadow) {
	        // body 还没出现,等 DOMContentLoaded 后再试一次
	        document.addEventListener('DOMContentLoaded', () => setState(kind), { once: true });
	        return;
	      }
	      const box = shadow.querySelector('.box');
	      if (!box) return;
	      if (kind === 'hidden') {
	        root.style.display = 'none';
	        return;
	      }
	      root.style.display = '';
	      if (kind === 'rec') {
	        box.classList.remove('idle'); box.classList.add('rec');
	        label.textContent = '正在录制此页';
	      } else {
	        box.classList.remove('rec'); box.classList.add('idle');
	        label.textContent = '录制中(此页不被录,切回原 tab 才会记录)';
	      }
	    }
	
	    // body 还没有就先等
	    if (!document.body && window === window.top) {
	      document.addEventListener('DOMContentLoaded', () => {
	        // 由 refreshIndicator() 在 applyState 之后驱动;此处只是确保挂载点存在
	      }, { once: true });
	    }
	    return { setState };
	  })();
	
	  /** 根据 background 推过来的全局 state 和本 tab 的 recording 决定指示器状态
	   *  注意:即便 captureActions=false(此 tab 不会 bind dom 监听),只要 background
	   *  在录这个 tab(API/视频仍在),也算"被录"。content 自己没法直接拿 tabId,
	   *  我们用一个间接信号:background 发来的 START 消息(走 chrome.runtime.onMessage)
	   *  只会发到目标 tab,收到过就标记 isTargetTab=true。
	   */
	  function refreshIndicator(globalState) {
	    if (window !== window.top) return;
	    const globalOn = !!(globalState && globalState.recording);
	    if (!globalOn) { isTargetTab = false; Indicator.setState('hidden'); return; }
	    Indicator.setState((recording || isTargetTab) ? 'rec' : 'idle');
	  }
	
	  // 仅当 background 通过 chrome.tabs.sendMessage 把 START 路由到此 tab,才会被置 true
	  let isTargetTab = false;
	
	  /** 问 background:本 tab 是否在录制范围内(session.tabIds)。拿不到则保守返回 false。 */
	  function queryScope() {
	    return new Promise(resolve => {
	      try {
	        chrome.runtime.sendMessage({ cmd: 'recorder/query-scope' }, resp => {
	          if (chrome.runtime.lastError) { resolve(false); return; }
	          resolve(!!(resp && resp.inScope));
	        });
	      } catch { resolve(false); }
	    });
	  }
	
	  // v0.3.6: content script 注入到所有 tab,全局 recorderState 会让每个 tab 都误以为"该录我"。
	  // 之前的后果:无关 tab 也 bind DOM 监听并发 meta:start,污染 events.json(每个无关 tab 一条)。
	  // 修复:storage 驱动的路径(trusted=false)在 bind 前先向 background 确认本 tab 在录制范围内;
	  //       directed START(background 只发给范围内 tab:主 tab / 导航后同 tab / 跟随的新标签页)
	  //       走 trusted=true,直接 bind。这样既堵住泄漏,又不影响"跳转/新开页签继续录制"。
	  async function applyState(state, { trusted = false } = {}) {
	    if (!state) return;
	    cfg = state.config || {};
	    // v0.3.8: 只要 uiDetail 不是 off(即 full 或 lite),本 tab 就该 bind DOM 监听。
	    // lite = 仅录后端时的轻量 UI 步骤(nav + click/fill/select 的语义信息,不含定位上下文)。
	    const globalWant = !!state.recording && uiDetail() !== 'off';
	
	    if (globalWant && !recording) {
	      // 关键:只有可信来源 或 background 确认在范围内,才真正开录
	      const inScope = trusted || isTargetTab || await queryScope();
	      if (!inScope) { refreshIndicator(state); return; }
	
	      recording = true;
	      bind();
	      console.log('[recorder.content] recording=ON', { isTop: window === window.top, url: location.href });
	      if (window === window.top && !metaStartSent) {
	        metaStartSent = true;
	        send({
	          type: 'meta', action: 'start', ts: Date.now(),
	          url: location.href, title: document.title,
	          viewport: { w: innerWidth, h: innerHeight },
	        });
	      }
	    } else if (!globalWant && recording) {
	      recording = false;
	      unbind();
	      console.log('[recorder.content] recording=OFF', { url: location.href });
	    }
	    refreshIndicator(state);
	  }
	
	  console.log('[recorder.content] injected', {
	    isTop: window === window.top, url: location.href, docState: document.readyState,
	  });
	
	  try {
	    chrome.storage.local.get('recorderState', v => {
	      console.log('[recorder.content] initial state from storage:', v.recorderState);
	      applyState(v.recorderState, { trusted: false });
	    });
	  } catch (e) { console.warn('[recorder.content] storage.get failed', e); }
	  try {
	    chrome.storage.onChanged.addListener((changes, area) => {
	      if (area !== 'local') return;
	      if (changes.recorderState) {
	        console.log('[recorder.content] state changed:', changes.recorderState.newValue);
	        applyState(changes.recorderState.newValue, { trusted: false });
	      }
	    });
	  } catch (e) { console.warn('[recorder.content] storage.onChanged failed', e); }
	
	  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	    if (!msg) return false;
	    if (msg.cmd === 'recorder/start') {
	      // directed START 只会被 background 发给录制范围内的 tab → 可信,直接开录
	      isTargetTab = true;
	      applyState({ recording: true, config: msg.config || {} }, { trusted: true });
	      sendResponse?.({ ok: true });
	    } else if (msg.cmd === 'recorder/stop') {
	      isTargetTab = false;
	      applyState({ recording: false, config: cfg || {} }, { trusted: true });
	      metaStartSent = false;
	      sendResponse?.({ ok: true });
	    }
	    return false;
	  });
	
	  // 测试钩子:仅在录制时暴露,允许自测脚本访问内部函数
	  if (typeof window !== 'undefined') {
	    window.__recorderTestHooks = {
	      describe, computeAccessibleName, HoverModule, inferRole,
	      semanticAncestor, isStableClass, ancestorsOf,
	    };
	  }
	})();
	// END: src/content/content.js
	;}
	   } catch(e) { _error(`  Error executing scripts ${scriptPaths}`, e); }
	  
	  } else {
	      _log(`Skipping document-start phase (no document).`);
	  }
	
	  
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
		    
		    const scriptPaths = [];
		   _log(`  Executing JS (idle): ${scriptPaths}`);
		
		   try {
		       // Keep variables from being redeclared for global scope, but also make them apply to global scope. (Theoretically)
		      with (globalThis){;
		
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
		  const polyfillString = "\n// -- Messaging implementation\n\nfunction createEventBus(\n  scopeId,\n  type = \"page\", // \"page\" or \"iframe\"\n  { allowedOrigin = \"*\", children = [], parentWindow = null } = {}\n) {\n  if (!scopeId) throw new Error(\"createEventBus requires a scopeId\");\n\n  const handlers = {};\n\n  function handleIncoming(ev) {\n    if (allowedOrigin !== \"*\" && ev.origin !== allowedOrigin) return;\n\n    const msg = ev.data;\n    if (!msg || msg.__eventBus !== true || msg.scopeId !== scopeId) return;\n\n    const { event, payload } = msg;\n\n    // PAGE: if it's an INIT from an iframe, adopt it\n    if (type === \"page\" && event === \"__INIT__\") {\n      const win = ev.source;\n      if (win && !children.includes(win)) {\n        children.push(win);\n      }\n      return;\n    }\n\n    (handlers[event] || []).forEach((fn) =>\n      fn(payload, { origin: ev.origin, source: ev.source })\n    );\n  }\n\n  window.addEventListener(\"message\", handleIncoming);\n\n  function emitTo(win, event, payload) {\n    const envelope = {\n      __eventBus: true,\n      scopeId,\n      event,\n      payload,\n    };\n    win.postMessage(envelope, allowedOrigin);\n  }\n\n  // IFRAME: announce to page on startup\n  if (type === \"iframe\") {\n    setTimeout(() => {\n      const pw = parentWindow || window.parent;\n      if (pw && pw.postMessage) {\n        emitTo(pw, \"__INIT__\", null);\n      }\n    }, 0);\n  }\n\n  return {\n    on(event, fn) {\n      handlers[event] = handlers[event] || [];\n      handlers[event].push(fn);\n    },\n    off(event, fn) {\n      if (!handlers[event]) return;\n      handlers[event] = handlers[event].filter((h) => h !== fn);\n    },\n    /**\n     * Emits an event.\n     * @param {string} event - The event name.\n     * @param {any} payload - The event payload.\n     * @param {object} [options] - Emission options.\n     * @param {Window} [options.to] - A specific window to target. If provided, message is ONLY sent to the target.\n     */\n    emit(event, payload, { to } = {}) {\n      // If a specific target window is provided, send only to it and DO NOT dispatch locally.\n      // This prevents a port from receiving its own messages.\n      if (to) {\n        if (to && typeof to.postMessage === \"function\") {\n          emitTo(to, event, payload);\n        }\n        return; // Exit after targeted send.\n      }\n\n      // For broadcast messages (no 'to' target), dispatch locally first.\n      (handlers[event] || []).forEach((fn) =>\n        fn(payload, { origin: location.origin, source: window })\n      );\n\n      // Then propagate the broadcast to other windows.\n      if (type === \"page\") {\n        children.forEach((win) => emitTo(win, event, payload));\n      } else {\n        const pw = parentWindow || window.parent;\n        if (pw && pw.postMessage) {\n          emitTo(pw, event, payload);\n        }\n      }\n    },\n  };\n}\n\nfunction createRuntime(type = \"background\", bus) {\n  let nextId = 1;\n  const pending = {};\n  const msgListeners = [];\n\n  let nextPortId = 1;\n  const ports = {};\n  const onConnectListeners = [];\n\n  function parseArgs(args) {\n    let target, message, options, callback;\n    const arr = [...args];\n    if (arr.length === 0) {\n      throw new Error(\"sendMessage requires at least one argument\");\n    }\n    if (arr.length === 1) {\n      return { message: arr[0] };\n    }\n    // last object could be options\n    if (\n      arr.length &&\n      typeof arr[arr.length - 1] === \"object\" &&\n      !Array.isArray(arr[arr.length - 1])\n    ) {\n      options = arr.pop();\n    }\n    // last function is callback\n    if (arr.length && typeof arr[arr.length - 1] === \"function\") {\n      callback = arr.pop();\n    }\n    if (\n      arr.length === 2 &&\n      (typeof arr[0] === \"string\" || typeof arr[0] === \"number\")\n    ) {\n      [target, message] = arr;\n    } else {\n      [message] = arr;\n    }\n    return { target, message, options, callback };\n  }\n\n  if (type === \"background\") {\n    bus.on(\"__REQUEST__\", ({ id, message }, { source }) => {\n      let responded = false,\n        isAsync = false;\n      function sendResponse(resp) {\n        if (responded) return;\n        responded = true;\n        // Target the response directly back to the window that sent the request.\n        bus.emit(\"__RESPONSE__\", { id, response: resp }, { to: source });\n      }\n      const results = msgListeners\n        .map((fn) => {\n          try {\n            // msg, sender, sendResponse\n            const ret = fn(message, { id, tab: { id: source } }, sendResponse);\n            if (ret === true || (ret && typeof ret.then === \"function\")) {\n              isAsync = true;\n              return ret;\n            }\n            return ret;\n          } catch (e) {\n            _error(e);\n          }\n        })\n        .filter((r) => r !== undefined);\n\n      const promises = results.filter((r) => r && typeof r.then === \"function\");\n      if (!isAsync && promises.length === 0) {\n        const out = results.length === 1 ? results[0] : results;\n        sendResponse(out);\n      } else if (promises.length) {\n        Promise.all(promises).then((vals) => {\n          if (!responded) {\n            const out = vals.length === 1 ? vals[0] : vals;\n            sendResponse(out);\n          }\n        });\n      }\n    });\n  }\n\n  if (type !== \"background\") {\n    bus.on(\"__RESPONSE__\", ({ id, response }) => {\n      const entry = pending[id];\n      if (!entry) return;\n      entry.resolve(response);\n      if (entry.callback) entry.callback(response);\n      delete pending[id];\n    });\n  }\n\n  function sendMessage(...args) {\n    // Background should be able to send message to itself\n    // if (type === \"background\") {\n    //   throw new Error(\"Background cannot sendMessage to itself\");\n    // }\n    const { target, message, callback } = parseArgs(args);\n    const id = nextId++;\n    const promise = new Promise((resolve) => {\n      pending[id] = { resolve, callback };\n      bus.emit(\"__REQUEST__\", { id, message });\n    });\n    return promise;\n  }\n\n  bus.on(\"__PORT_CONNECT__\", ({ portId, name }, { source }) => {\n    if (type !== \"background\") return;\n    const backgroundPort = makePort(\"background\", portId, name, source);\n    ports[portId] = backgroundPort;\n\n    onConnectListeners.forEach((fn) => fn(backgroundPort));\n\n    // send back a CONNECT_ACK so the client can\n    // start listening on its end:\n    bus.emit(\"__PORT_CONNECT_ACK__\", { portId, name }, { to: source });\n  });\n\n  // Clients handle the ACK and finalize their Port object by learning the remote window.\n  bus.on(\"__PORT_CONNECT_ACK__\", ({ portId, name }, { source }) => {\n    if (type === \"background\") return; // ignore\n    const p = ports[portId];\n    if (!p) return;\n    // Call the port's internal finalize method to complete the handshake\n    if (p._finalize) {\n      p._finalize(source);\n    }\n  });\n\n  // Any port message travels via \"__PORT_MESSAGE__\"\n  bus.on(\"__PORT_MESSAGE__\", (envelope, { source }) => {\n    const { portId } = envelope;\n    const p = ports[portId];\n    if (!p) return;\n    p._receive(envelope, source);\n  });\n\n  // Any port disconnect:\n  bus.on(\"__PORT_DISCONNECT__\", ({ portId }) => {\n    const p = ports[portId];\n    if (!p) return;\n    p._disconnect();\n    delete ports[portId];\n  });\n\n  // Refactored makePort to correctly manage internal state and the connection handshake.\n  function makePort(side, portId, name, remoteWindow) {\n    let onMessageHandlers = [];\n    let onDisconnectHandlers = [];\n    let buffer = [];\n    // Unique instance ID for this port instance\n    const instanceId = Math.random().toString(36).slice(2) + Date.now();\n    // These state variables are part of the closure and are updated by _finalize\n    let _ready = side === \"background\";\n\n    function _drainBuffer() {\n      buffer.forEach((m) => _post(m));\n      buffer = [];\n    }\n\n    function _post(msg) {\n      // Always use the 'to' parameter for port messages, making them directional.\n      // Include senderInstanceId\n      bus.emit(\n        \"__PORT_MESSAGE__\",\n        { portId, msg, senderInstanceId: instanceId },\n        { to: remoteWindow }\n      );\n    }\n\n    function postMessage(msg) {\n      if (!_ready) {\n        buffer.push(msg);\n      } else {\n        _post(msg);\n      }\n    }\n\n    function _receive(envelope, source) {\n      // envelope: { msg, senderInstanceId }\n      if (envelope.senderInstanceId === instanceId) return; // Don't dispatch to self\n      onMessageHandlers.forEach((fn) =>\n        fn(envelope.msg, { id: portId, tab: { id: source } })\n      );\n    }\n\n    function disconnect() {\n      // Also use the 'to' parameter for disconnect messages\n      bus.emit(\"__PORT_DISCONNECT__\", { portId }, { to: remoteWindow });\n      _disconnect();\n      delete ports[portId];\n    }\n\n    function _disconnect() {\n      onDisconnectHandlers.forEach((fn) => fn());\n      onMessageHandlers = [];\n      onDisconnectHandlers = [];\n    }\n\n    // This function is called on the client port when the ACK is received from background.\n    // It updates the port's state, completing the connection.\n    function _finalize(win) {\n      remoteWindow = win; // <-- This is the crucial part: learn the destination\n      _ready = true;\n      _drainBuffer();\n    }\n\n    return {\n      name,\n      sender: {\n        id: portId,\n      },\n      onMessage: {\n        addListener(fn) {\n          onMessageHandlers.push(fn);\n        },\n        removeListener(fn) {\n          onMessageHandlers = onMessageHandlers.filter((x) => x !== fn);\n        },\n      },\n      onDisconnect: {\n        addListener(fn) {\n          onDisconnectHandlers.push(fn);\n        },\n        removeListener(fn) {\n          onDisconnectHandlers = onDisconnectHandlers.filter((x) => x !== fn);\n        },\n      },\n      postMessage,\n      disconnect,\n      // Internal methods used by the runtime\n      _receive,\n      _disconnect,\n      _finalize, // Expose the finalizer for the ACK handler\n    };\n  }\n\n  function connect(connectInfo = {}) {\n    if (type === \"background\") {\n      throw new Error(\"Background must use onConnect, not connect()\");\n    }\n    const name = connectInfo.name || \"\";\n    const portId = nextPortId++;\n    // create the client side port\n    // remoteWindow is initially null; it will be set by _finalize upon ACK.\n    const clientPort = makePort(\"client\", portId, name, null);\n    ports[portId] = clientPort;\n\n    // fire the connect event across the bus\n    bus.emit(\"__PORT_CONNECT__\", { portId, name });\n    return clientPort;\n  }\n\n  function onConnect(fn) {\n    if (type !== \"background\") {\n      throw new Error(\"connect event only fires in background\");\n    }\n    onConnectListeners.push(fn);\n  }\n\n  return {\n    // rpc:\n    sendMessage,\n    onMessage: {\n      addListener(fn) {\n        msgListeners.push(fn);\n      },\n      removeListener(fn) {\n        const i = msgListeners.indexOf(fn);\n        if (i >= 0) msgListeners.splice(i, 1);\n      },\n    },\n\n    // port API:\n    connect,\n    onConnect: {\n      addListener(fn) {\n        onConnect(fn);\n      },\n      removeListener(fn) {\n        const i = onConnectListeners.indexOf(fn);\n        if (i >= 0) onConnectListeners.splice(i, 1);\n      },\n    },\n  };\n}\n\n\n// --- Abstraction Layer: PostMessage Target\n\nlet nextRequestId = 1;\nconst pendingRequests = new Map(); // requestId -> { resolve, reject, timeout }\n\nfunction sendAbstractionRequest(method, args = []) {\n  return new Promise((resolve, reject) => {\n    const requestId = nextRequestId++;\n\n    const timeout = setTimeout(() => {\n      pendingRequests.delete(requestId);\n      reject(new Error(`PostMessage request timeout for method: ${method}`));\n    }, 10000);\n\n    pendingRequests.set(requestId, { resolve, reject, timeout });\n\n    window.parent.postMessage({\n      type: \"abstraction-request\",\n      requestId,\n      method,\n      args,\n    });\n  });\n}\n\nwindow.addEventListener(\"message\", (event) => {\n  const { type, requestId, success, result, error } = event.data;\n\n  if (type === \"abstraction-response\") {\n    const pending = pendingRequests.get(requestId);\n    if (pending) {\n      clearTimeout(pending.timeout);\n      pendingRequests.delete(requestId);\n\n      if (success) {\n        pending.resolve(result);\n      } else {\n        const err = new Error(error.message);\n        err.stack = error.stack;\n        pending.reject(err);\n      }\n    }\n  }\n});\n\nasync function _storageSet(items) {\n  return sendAbstractionRequest(\"_storageSet\", [items]);\n}\n\nasync function _storageGet(keys) {\n  return sendAbstractionRequest(\"_storageGet\", [keys]);\n}\n\nasync function _storageRemove(keysToRemove) {\n  return sendAbstractionRequest(\"_storageRemove\", [keysToRemove]);\n}\n\nasync function _storageClear() {\n  return sendAbstractionRequest(\"_storageClear\");\n}\n\nasync function _cookieList(details) {\n  return sendAbstractionRequest(\"_cookieList\", [details]);\n}\n\nasync function _cookieSet(details) {\n  return sendAbstractionRequest(\"_cookieSet\", [details]);\n}\n\nasync function _cookieDelete(details) {\n  return sendAbstractionRequest(\"_cookieDelete\", [details]);\n}\n\nasync function _fetch(url, options) {\n  return sendAbstractionRequest(\"_fetch\", [url, options]);\n}\n\nfunction _registerMenuCommand(name, func) {\n  _warn(\"_registerMenuCommand called from iframe context:\", name);\n  return sendAbstractionRequest(\"_registerMenuCommand\", [\n    name,\n    func.toString(),\n  ]);\n}\n\nfunction _openTab(url, active) {\n  return sendAbstractionRequest(\"_openTab\", [url, active]);\n}\n\nasync function _initStorage() {\n  return sendAbstractionRequest(\"_initStorage\");\n}\n\n\nconst EXTENSION_ASSETS_MAP = {{EXTENSION_ASSETS_MAP}};\n\n// -- Polyfill Implementation\nfunction buildPolyfill({ isBackground = false, isOtherPage = false } = {}) {\n  // Generate a unique context ID for this polyfill instance\n  const contextType = isBackground\n    ? \"background\"\n    : isOtherPage\n      ? \"options\"\n      : \"content\";\n  const contextId = `${contextType}_${Math.random()\n    .toString(36)\n    .substring(2, 15)}`;\n\n  const IS_IFRAME = \"true\" === \"true\";\n  const BUS = (function () {\n    if (globalThis.__BUS) {\n      return globalThis.__BUS;\n    }\n    globalThis.__BUS = createEventBus(\n      \"ui-api-recorder\",\n      IS_IFRAME ? \"iframe\" : \"page\",\n    );\n    return globalThis.__BUS;\n  })();\n  const RUNTIME = createRuntime(isBackground ? \"background\" : \"tab\", BUS);\n  const createNoopListeners = () => ({\n    addListener: (callback) => {\n      _log(\"addListener\", callback);\n    },\n    removeListener: (callback) => {\n      _log(\"removeListener\", callback);\n    },\n  });\n  // TODO: Stub\n  const storageChangeListeners = new Set();\n  function broadcastStorageChange(changes, areaName) {\n    storageChangeListeners.forEach((listener) => {\n      listener(changes, areaName);\n    });\n  }\n\n  let REQ_PERMS = [];\n\n  // --- Chrome polyfill\n  let chrome = {\n    extension: {\n      isAllowedIncognitoAccess: () => Promise.resolve(true),\n      sendMessage: (...args) => _messagingHandler.sendMessage(...args),\n    },\n    permissions: {\n      // TODO: Remove origin permission means exclude from origin in startup (when checking for content scripts)\n      request: (permissions, callback) => {\n        _log(\"permissions.request\", permissions, callback);\n        if (Array.isArray(permissions)) {\n          REQ_PERMS = [...REQ_PERMS, ...permissions];\n        }\n        if (typeof callback === \"function\") {\n          callback(permissions);\n        }\n        return Promise.resolve(permissions);\n      },\n      contains: (permissions, callback) => {\n        if (typeof callback === \"function\") {\n          callback(true);\n        }\n        return Promise.resolve(true);\n      },\n      getAll: () => {\n        return Promise.resolve({\n          permissions: EXTENSION_PERMISSIONS,\n          origins: ORIGIN_PERMISSIONS,\n        });\n      },\n      onAdded: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n    },\n    i18n: {\n      getUILanguage: () => {\n        return USED_LOCALE || \"en\";\n      },\n      getMessage: (key, substitutions = []) => {\n        if (typeof substitutions === \"string\") {\n          substitutions = [substitutions];\n        }\n        if (typeof LOCALE_KEYS !== \"undefined\" && LOCALE_KEYS[key]) {\n          return LOCALE_KEYS[key].message?.replace(\n            /\\$(\\d+)/g,\n            (match, p1) => substitutions[p1 - 1] || match,\n          );\n        }\n        return key;\n      },\n    },\n    alarms: {\n      onAlarm: createNoopListeners(),\n      create: () => {\n        _log(\"alarms.create\", arguments);\n      },\n      get: () => {\n        _log(\"alarms.get\", arguments);\n      },\n    },\n    runtime: {\n      ...RUNTIME,\n      onInstalled: createNoopListeners(),\n      onStartup: createNoopListeners(),\n      // TODO: Postmessage to parent to open options page or call openOptionsPage\n      openOptionsPage: () => {\n        // const url = chrome.runtime.getURL(OPTIONS_PAGE_PATH);\n        // console.log(\"openOptionsPage\", _openTab, url, EXTENSION_ASSETS_MAP);\n        // _openTab(url);\n        if (typeof openOptionsPage === \"function\") {\n          openOptionsPage();\n        } else if (window.parent) {\n          window.parent.postMessage({ type: \"openOptionsPage\" }, \"*\");\n        } else {\n          _warn(\"openOptionsPage not available.\");\n        }\n      },\n      getManifest: () => {\n        // The manifest object will be injected into the scope where buildPolyfill is called\n        if (typeof INJECTED_MANIFEST !== \"undefined\") {\n          return JSON.parse(JSON.stringify(INJECTED_MANIFEST)); // Return deep copy\n        }\n        _warn(\"INJECTED_MANIFEST not found for chrome.runtime.getManifest\");\n        return { name: \"Unknown\", version: \"0.0\", manifest_version: 2 };\n      },\n      getURL: (path) => {\n        if (!path) return \"\";\n        if (path.startsWith(\"/\")) {\n          path = path.substring(1);\n        }\n\n        if (typeof _createAssetUrl === \"function\") {\n          return _createAssetUrl(path);\n        }\n\n        _warn(\n          `chrome.runtime.getURL fallback for '${path}'. Assets may not be available.`,\n        );\n        // Attempt a relative path resolution (highly context-dependent and likely wrong)\n        try {\n          if (window.location.protocol.startsWith(\"http\")) {\n            return new URL(path, window.location.href).toString();\n          }\n        } catch (e) {\n          /* ignore error, fallback */\n        }\n        return path;\n      },\n      id: \"polyfilled-extension-\" + Math.random().toString(36).substring(2, 15),\n      lastError: null,\n      setUninstallURL: () => {},\n      setUpdateURL: () => {},\n      getPlatformInfo: async () => {\n        const platform = {\n          os: \"unknown\",\n          arch: \"unknown\",\n          nacl_arch: \"unknown\",\n        };\n\n        if (typeof navigator !== \"undefined\") {\n          const userAgent = navigator.userAgent.toLowerCase();\n          if (userAgent.includes(\"mac\")) platform.os = \"mac\";\n          else if (userAgent.includes(\"win\")) platform.os = \"win\";\n          else if (userAgent.includes(\"linux\")) platform.os = \"linux\";\n          else if (userAgent.includes(\"android\")) platform.os = \"android\";\n          else if (userAgent.includes(\"ios\")) platform.os = \"ios\";\n\n          if (userAgent.includes(\"x86_64\") || userAgent.includes(\"amd64\")) {\n            platform.arch = \"x86-64\";\n          } else if (userAgent.includes(\"i386\") || userAgent.includes(\"i686\")) {\n            platform.arch = \"x86-32\";\n          } else if (userAgent.includes(\"arm\")) {\n            platform.arch = \"arm\";\n          }\n        }\n\n        return platform;\n      },\n      getBrowserInfo: async () => {\n        const info = {\n          name: \"unknown\",\n          version: \"unknown\",\n          buildID: \"unknown\",\n        };\n\n        if (typeof navigator !== \"undefined\") {\n          const userAgent = navigator.userAgent;\n          if (userAgent.includes(\"Chrome\")) {\n            info.name = \"Chrome\";\n            const match = userAgent.match(/Chrome\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          } else if (userAgent.includes(\"Firefox\")) {\n            info.name = \"Firefox\";\n            const match = userAgent.match(/Firefox\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          } else if (userAgent.includes(\"Safari\")) {\n            info.name = \"Safari\";\n            const match = userAgent.match(/Version\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          }\n        }\n\n        return info;\n      },\n    },\n    storage: {\n      local: {\n        get: function (keys, callback) {\n          if (typeof _storageGet !== \"function\")\n            throw new Error(\"_storageGet not defined\");\n\n          const promise = _storageGet(keys);\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.get callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.get error:\", error);\n                callback({});\n              });\n            return;\n          }\n\n          return promise;\n        },\n        set: function (items, callback) {\n          if (typeof _storageSet !== \"function\")\n            throw new Error(\"_storageSet not defined\");\n\n          const promise = _storageSet(items).then((result) => {\n            broadcastStorageChange(items, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.set callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.set error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        remove: function (keys, callback) {\n          if (typeof _storageRemove !== \"function\")\n            throw new Error(\"_storageRemove not defined\");\n\n          const promise = _storageRemove(keys).then((result) => {\n            const changes = {};\n            const keyList = Array.isArray(keys) ? keys : [keys];\n            keyList.forEach((key) => {\n              changes[key] = { oldValue: undefined, newValue: undefined };\n            });\n            broadcastStorageChange(changes, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.remove callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.remove error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        clear: function (callback) {\n          if (typeof _storageClear !== \"function\")\n            throw new Error(\"_storageClear not defined\");\n\n          const promise = _storageClear().then((result) => {\n            broadcastStorageChange({}, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.clear callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.clear error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        onChanged: {\n          addListener: (callback) => {\n            storageChangeListeners.add(callback);\n          },\n          removeListener: (callback) => {\n            storageChangeListeners.delete(callback);\n          },\n        },\n      },\n      sync: {\n        get: function (keys, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n          return chrome.storage.local.get(keys, callback);\n        },\n        set: function (items, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.set(items).then((result) => {\n            broadcastStorageChange(items, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.set callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.set error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        remove: function (keys, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.remove(keys).then((result) => {\n            const changes = {};\n            const keyList = Array.isArray(keys) ? keys : [keys];\n            keyList.forEach((key) => {\n              changes[key] = { oldValue: undefined, newValue: undefined };\n            });\n            broadcastStorageChange(changes, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.remove callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.remove error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        clear: function (callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.clear().then((result) => {\n            broadcastStorageChange({}, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.clear callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.clear error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        onChanged: {\n          addListener: (callback) => {\n            storageChangeListeners.add(callback);\n          },\n          removeListener: (callback) => {\n            storageChangeListeners.delete(callback);\n          },\n        },\n      },\n      onChanged: {\n        addListener: (callback) => {\n          storageChangeListeners.add(callback);\n        },\n        removeListener: (callback) => {\n          storageChangeListeners.delete(callback);\n        },\n      },\n      managed: {\n        get: function (keys, callback) {\n          _warn(\"chrome.storage.managed polyfill is read-only empty.\");\n\n          const promise = Promise.resolve({});\n\n          if (typeof callback === \"function\") {\n            promise.then((result) => {\n              try {\n                callback(result);\n              } catch (e) {\n                _error(\"Error in storage.managed.get callback:\", e);\n              }\n            });\n            return;\n          }\n\n          return promise;\n        },\n      },\n    },\n    cookies: (function () {\n      const cookieChangeListeners = new Set();\n      function broadcastCookieChange(changeInfo) {\n        cookieChangeListeners.forEach((listener) => {\n          try {\n            listener(changeInfo);\n          } catch (e) {\n            _error(\"Error in cookies.onChanged listener:\", e);\n          }\n        });\n      }\n\n      function handlePromiseCallback(promise, callback) {\n        if (typeof callback === \"function\") {\n          promise\n            .then((result) => callback(result))\n            .catch((error) => {\n              // chrome.runtime.lastError = { message: error.message }; // TODO: Implement lastError\n              _error(error);\n              callback(); // Call with undefined on error\n            });\n          return;\n        }\n        return promise;\n      }\n\n      return {\n        get: function (details, callback) {\n          if (typeof _cookieList !== \"function\") {\n            return handlePromiseCallback(\n              Promise.reject(new Error(\"_cookieList not defined\")),\n              callback,\n            );\n          }\n          const promise = _cookieList({\n            url: details.url,\n            name: details.name,\n            storeId: details.storeId,\n            partitionKey: details.partitionKey,\n          }).then((cookies) => {\n            if (!cookies || cookies.length === 0) {\n              return null;\n            }\n            // Sort by path length (longest first), then creation time (earliest first, if available)\n            cookies.sort((a, b) => {\n              const pathLenDiff = (b.path || \"\").length - (a.path || \"\").length;\n              if (pathLenDiff !== 0) return pathLenDiff;\n              return (a.creationTime || 0) - (b.creationTime || 0);\n            });\n            return cookies[0];\n          });\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getAll: function (details, callback) {\n          if (typeof _cookieList !== \"function\") {\n            return handlePromiseCallback(\n              Promise.reject(new Error(\"_cookieList not defined\")),\n              callback,\n            );\n          }\n          if (details.partitionKey) {\n            _warn(\n              \"cookies.getAll: partitionKey is not fully supported in this environment.\",\n            );\n          }\n          const promise = _cookieList(details);\n          return handlePromiseCallback(promise, callback);\n        },\n\n        set: function (details, callback) {\n          const promise = (async () => {\n            if (\n              typeof _cookieSet !== \"function\" ||\n              typeof _cookieList !== \"function\"\n            ) {\n              throw new Error(\"_cookieSet or _cookieList not defined\");\n            }\n            if (details.partitionKey) {\n              _warn(\n                \"cookies.set: partitionKey is not fully supported in this environment.\",\n              );\n            }\n\n            const getDetails = {\n              url: details.url,\n              name: details.name,\n              storeId: details.storeId,\n            };\n            const oldCookies = await _cookieList(getDetails);\n            const oldCookie = oldCookies && oldCookies[0];\n\n            if (oldCookie) {\n              broadcastCookieChange({\n                cause: \"overwrite\",\n                cookie: oldCookie,\n                removed: true,\n              });\n            }\n\n            await _cookieSet(details);\n            const newCookies = await _cookieList(getDetails);\n            const newCookie = newCookies && newCookies[0];\n\n            if (newCookie) {\n              broadcastCookieChange({\n                cause: \"explicit\",\n                cookie: newCookie,\n                removed: false,\n              });\n            }\n            return newCookie || null;\n          })();\n          return handlePromiseCallback(promise, callback);\n        },\n\n        remove: function (details, callback) {\n          const promise = (async () => {\n            if (\n              typeof _cookieDelete !== \"function\" ||\n              typeof _cookieList !== \"function\"\n            ) {\n              throw new Error(\"_cookieDelete or _cookieList not defined\");\n            }\n            const oldCookies = await _cookieList(details);\n            const oldCookie = oldCookies && oldCookies[0];\n\n            if (!oldCookie) return null; // Nothing to remove\n\n            await _cookieDelete(details);\n\n            broadcastCookieChange({\n              cause: \"explicit\",\n              cookie: oldCookie,\n              removed: true,\n            });\n\n            return {\n              url: details.url,\n              name: details.name,\n              storeId: details.storeId || \"0\",\n              partitionKey: details.partitionKey,\n            };\n          })();\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getAllCookieStores: function (callback) {\n          const promise = Promise.resolve([\n            { id: \"0\", tabIds: [1] }, // Mock store for the current context\n          ]);\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getPartitionKey: function (details, callback) {\n          _warn(\n            \"chrome.cookies.getPartitionKey is not supported in this environment.\",\n          );\n          const promise = Promise.resolve({ partitionKey: {} }); // Return empty partition key\n          return handlePromiseCallback(promise, callback);\n        },\n\n        onChanged: {\n          addListener: (callback) => {\n            if (typeof callback === \"function\") {\n              cookieChangeListeners.add(callback);\n            }\n          },\n          removeListener: (callback) => {\n            cookieChangeListeners.delete(callback);\n          },\n        },\n      };\n    })(),\n    tabs: {\n      query: async (queryInfo) => {\n        _warn(\"chrome.tabs.query polyfill only returns current tab info.\");\n        const dummyId = Math.floor(Math.random() * 1000) + 1;\n        return [\n          {\n            id: dummyId,\n            url: CURRENT_LOCATION,\n            active: true,\n            windowId: 1,\n            status: \"complete\",\n          },\n        ];\n      },\n      create: async ({ url, active = true }) => {\n        _log(`[Polyfill tabs.create] URL: ${url}`);\n        if (typeof _openTab !== \"function\")\n          throw new Error(\"_openTab not defined\");\n        _openTab(url, active);\n        const dummyId = Math.floor(Math.random() * 1000) + 1001;\n        return Promise.resolve({\n          id: dummyId,\n          url: url,\n          active,\n          windowId: 1,\n        });\n      },\n      sendMessage: async (tabId, message) => {\n        _warn(\n          `chrome.tabs.sendMessage polyfill (to tab ${tabId}) redirects to runtime.sendMessage (current context).`,\n        );\n        return chrome.runtime.sendMessage(message);\n      },\n      onActivated: createNoopListeners(),\n      onUpdated: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n      onReplaced: createNoopListeners(),\n      onCreated: createNoopListeners(),\n      onMoved: createNoopListeners(),\n      onDetached: createNoopListeners(),\n      onAttached: createNoopListeners(),\n    },\n    windows: {\n      onFocusChanged: createNoopListeners(),\n      onCreated: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n      onFocused: createNoopListeners(),\n      onFocus: createNoopListeners(),\n      onBlur: createNoopListeners(),\n      onFocused: createNoopListeners(),\n    },\n    notifications: {\n      create: async (notificationId, options) => {\n        try {\n          let id = notificationId;\n          let notificationOptions = options;\n\n          if (typeof notificationId === \"object\" && notificationId !== null) {\n            notificationOptions = notificationId;\n            id = \"notification_\" + Math.random().toString(36).substring(2, 15);\n          } else if (typeof notificationId === \"string\" && options) {\n            id = notificationId;\n            notificationOptions = options;\n          } else {\n            throw new Error(\"Invalid parameters for notifications.create\");\n          }\n\n          if (!notificationOptions || typeof notificationOptions !== \"object\") {\n            throw new Error(\"Notification options must be an object\");\n          }\n\n          const {\n            title,\n            message,\n            iconUrl,\n            type = \"basic\",\n          } = notificationOptions;\n\n          if (!title || !message) {\n            throw new Error(\"Notification must have title and message\");\n          }\n\n          if (\"Notification\" in window) {\n            if (Notification.permission === \"granted\") {\n              const notification = new Notification(title, {\n                body: message,\n                icon: iconUrl,\n                tag: id,\n              });\n\n              _log(`[Notifications] Created notification: ${id}`);\n              return id;\n            } else if (Notification.permission === \"default\") {\n              const permission = await Notification.requestPermission();\n              if (permission === \"granted\") {\n                const notification = new Notification(title, {\n                  body: message,\n                  icon: iconUrl,\n                  tag: id,\n                });\n                _log(\n                  `[Notifications] Created notification after permission: ${id}`,\n                );\n                return id;\n              } else {\n                _warn(\"[Notifications] Permission denied for notifications\");\n                return id;\n              }\n            } else {\n              _warn(\"[Notifications] Notifications are blocked\");\n              return id;\n            }\n          } else {\n            _warn(\n              \"[Notifications] Native notifications not supported, using console fallback\",\n            );\n            _log(`[Notification] ${title}: ${message}`);\n            return id;\n          }\n        } catch (error) {\n          _error(\"[Notifications] Error creating notification:\", error.message);\n          throw error;\n        }\n      },\n      clear: async (notificationId) => {\n        _log(`[Notifications] Clear notification: ${notificationId}`);\n        // For native notifications, there's no direct way to clear by ID\n        // This is a limitation of the Web Notifications API\n        return true;\n      },\n      getAll: async () => {\n        _warn(\"[Notifications] getAll not fully supported in polyfill\");\n        return {};\n      },\n      getPermissionLevel: async () => {\n        if (\"Notification\" in window) {\n          const permission = Notification.permission;\n          return { level: permission === \"granted\" ? \"granted\" : \"denied\" };\n        }\n        return { level: \"denied\" };\n      },\n    },\n    contextMenus: {\n      create: (createProperties, callback) => {\n        try {\n          if (!createProperties || typeof createProperties !== \"object\") {\n            throw new Error(\"Context menu create properties must be an object\");\n          }\n\n          const { id, title, contexts = [\"page\"], onclick } = createProperties;\n          const menuId =\n            id || `menu_${Math.random().toString(36).substring(2, 15)}`;\n\n          if (!title || typeof title !== \"string\") {\n            throw new Error(\"Context menu must have a title\");\n          }\n\n          // Store menu items for potential use\n          if (!window._polyfillContextMenus) {\n            window._polyfillContextMenus = new Map();\n          }\n\n          window._polyfillContextMenus.set(menuId, {\n            id: menuId,\n            title,\n            contexts,\n            onclick,\n            enabled: createProperties.enabled !== false,\n          });\n\n          _log(\n            `[ContextMenus] Created context menu item: ${title} (${menuId})`,\n          );\n\n          // Try to register a menu command as fallback\n          if (typeof _registerMenuCommand === \"function\") {\n            try {\n              _registerMenuCommand(\n                title,\n                onclick ||\n                  (() => {\n                    _log(`Context menu clicked: ${title}`);\n                  }),\n              );\n            } catch (e) {\n              _warn(\n                \"[ContextMenus] Failed to register as menu command:\",\n                e.message,\n              );\n            }\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n\n          return menuId;\n        } catch (error) {\n          _error(\"[ContextMenus] Error creating context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n          throw error;\n        }\n      },\n      update: (id, updateProperties, callback) => {\n        try {\n          if (\n            !window._polyfillContextMenus ||\n            !window._polyfillContextMenus.has(id)\n          ) {\n            throw new Error(`Context menu item not found: ${id}`);\n          }\n\n          const menuItem = window._polyfillContextMenus.get(id);\n          Object.assign(menuItem, updateProperties);\n\n          _log(`[ContextMenus] Updated context menu item: ${id}`);\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\"[ContextMenus] Error updating context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      remove: (menuItemId, callback) => {\n        try {\n          if (\n            window._polyfillContextMenus &&\n            window._polyfillContextMenus.has(menuItemId)\n          ) {\n            window._polyfillContextMenus.delete(menuItemId);\n            _log(`[ContextMenus] Removed context menu item: ${menuItemId}`);\n          } else {\n            _warn(\n              `[ContextMenus] Context menu item not found for removal: ${menuItemId}`,\n            );\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\"[ContextMenus] Error removing context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      removeAll: (callback) => {\n        try {\n          if (window._polyfillContextMenus) {\n            const count = window._polyfillContextMenus.size;\n            window._polyfillContextMenus.clear();\n            _log(`[ContextMenus] Removed all ${count} context menu items`);\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\n            \"[ContextMenus] Error removing all context menus:\",\n            error.message,\n          );\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      onClicked: {\n        addListener: (callback) => {\n          if (!window._polyfillContextMenuListeners) {\n            window._polyfillContextMenuListeners = new Set();\n          }\n          window._polyfillContextMenuListeners.add(callback);\n          _log(\"[ContextMenus] Added click listener\");\n        },\n        removeListener: (callback) => {\n          if (window._polyfillContextMenuListeners) {\n            window._polyfillContextMenuListeners.delete(callback);\n            _log(\"[ContextMenus] Removed click listener\");\n          }\n        },\n      },\n    },\n  };\n\n  const tc = (fn) => {\n    try {\n      fn();\n    } catch (e) {}\n  };\n  const loggingProxyHandler = (_key) => ({\n    get(target, key, receiver) {\n      tc(() => _log(`[${contextType}] [CHROME - ${_key}] Getting ${key}`));\n      return Reflect.get(target, key, receiver);\n    },\n    set(target, key, value, receiver) {\n      tc(() =>\n        _log(`[${contextType}] [CHROME - ${_key}] Setting ${key} to ${value}`),\n      );\n      return Reflect.set(target, key, value, receiver);\n    },\n    has(target, key) {\n      tc(() =>\n        _log(`[${contextType}] [CHROME - ${_key}] Checking if ${key} exists`),\n      );\n      return Reflect.has(target, key);\n    },\n  });\n  chrome = Object.fromEntries(\n    Object.entries(chrome).map(([key, value]) => [\n      key,\n      new Proxy(value, loggingProxyHandler(key)),\n    ]),\n  );\n\n  // Alias browser to chrome for common Firefox pattern\n  const browser = new Proxy(chrome, loggingProxyHandler);\n\n  const oldGlobalThis = globalThis;\n  const oldWindow = window;\n  const oldSelf = self;\n  const oldGlobal = globalThis;\n  const __globalsStorage = {};\n\n  const TO_MODIFY = [oldGlobalThis, oldWindow, oldSelf, oldGlobal];\n  const set = (k, v) => {\n    __globalsStorage[k] = v;\n    TO_MODIFY.forEach((target) => {\n      target[k] = v;\n    });\n  };\n  const proxyHandler = {\n    get(target, key, receiver) {\n      const fns = [\n        () => __globalsStorage[key],\n        () => Reflect.get(target, key, target),\n        () => target[key],\n      ];\n      const out = fns\n        .map((f) => {\n          try {\n            let out = f();\n            return out;\n          } catch (e) {\n            return undefined;\n          }\n        })\n        .find((f) => f !== undefined);\n      if (typeof out === \"function\") {\n        return out.bind(target);\n      }\n      return out;\n    },\n    set(target, key, value, receiver) {\n      try {\n        tc(() => _log(`[${contextType}] Setting ${key} to ${value}`));\n        set(key, value);\n        return Reflect.set(target, key, value, receiver);\n      } catch (e) {\n        _error(\"Error setting\", key, value, e);\n        try {\n          target[key] = value;\n          return true;\n        } catch (e) {\n          _error(\"Error setting\", key, value, e);\n        }\n        return false;\n      }\n    },\n    has(target, key) {\n      try {\n        return key in __globalsStorage || key in target;\n      } catch (e) {\n        _error(\"Error has\", key, e);\n        try {\n          return key in __globalsStorage || key in target;\n        } catch (e) {\n          _error(\"Error has\", key, e);\n        }\n        return false;\n      }\n    },\n    getOwnPropertyDescriptor(target, key) {\n      try {\n        if (key in __globalsStorage) {\n          return {\n            configurable: true,\n            enumerable: true,\n            writable: true,\n            value: __globalsStorage[key],\n          };\n        }\n        // fall back to the real globalThis\n        const desc = Reflect.getOwnPropertyDescriptor(target, key);\n        // ensure it's configurable so the with‑scope binding logic can override it\n        if (desc && !desc.configurable) {\n          desc.configurable = true;\n        }\n        return desc;\n      } catch (e) {\n        _error(\"Error getOwnPropertyDescriptor\", key, e);\n        return {\n          configurable: true,\n          enumerable: true,\n          writable: true,\n          value: undefined,\n        };\n      }\n    },\n\n    defineProperty(target, key, descriptor) {\n      try {\n        // Normalize descriptor to avoid mixed accessor & data attributes\n        const hasAccessor = \"get\" in descriptor || \"set\" in descriptor;\n\n        if (hasAccessor) {\n          // Build a clean descriptor without value/writable when accessors present\n          const normalized = {\n            configurable:\n              \"configurable\" in descriptor ? descriptor.configurable : true,\n            enumerable:\n              \"enumerable\" in descriptor ? descriptor.enumerable : false,\n          };\n          if (\"get\" in descriptor) normalized.get = descriptor.get;\n          if (\"set\" in descriptor) normalized.set = descriptor.set;\n\n          // Store accessor references for inspection but avoid breaking invariants\n          set(key, {\n            get: descriptor.get,\n            set: descriptor.set,\n          });\n\n          return Reflect.defineProperty(target, key, normalized);\n        }\n\n        // Data descriptor path\n        set(key, descriptor.value);\n        return Reflect.defineProperty(target, key, descriptor);\n      } catch (e) {\n        _error(\"Error defineProperty\", key, descriptor, e);\n        return false;\n      }\n    },\n  };\n\n  // Create proxies once proxyHandler is defined\n  const proxyWindow = new Proxy(oldWindow, proxyHandler);\n  const proxyGlobalThis = new Proxy(oldGlobalThis, proxyHandler);\n  const proxyGlobal = new Proxy(oldGlobal, proxyHandler);\n  const proxySelf = new Proxy(oldSelf, proxyHandler);\n\n  // Seed storage with core globals so lookups succeed inside `with` blocks\n  Object.assign(__globalsStorage, {\n    chrome,\n    browser,\n    window: proxyWindow,\n    globalThis: proxyGlobalThis,\n    global: proxyGlobal,\n    self: proxySelf,\n    document: oldWindow.document,\n  });\n\n  const __globals = {\n    chrome,\n    browser,\n    window: proxyWindow,\n    globalThis: proxyGlobalThis,\n    global: proxyGlobal,\n    self: proxySelf,\n    __globals: __globalsStorage,\n  };\n\n  __globals.contextId = contextId;\n  __globals.contextType = contextType;\n  __globals.module = undefined;\n  __globals.amd = undefined;\n  __globals.define = undefined;\n  __globals.importScripts = (...args) => {\n    _log(\"importScripts\", args);\n  };\n\n  return __globals;\n}\n\n\nif (typeof window !== 'undefined') {\n    window.buildPolyfill = buildPolyfill;\n}\n"
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