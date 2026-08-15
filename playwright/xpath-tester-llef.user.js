// ==UserScript==
// @name        XPath Tester
// @version     1.0.1
// @description Use XPath Tester to build & check xpath expressions, css selectors, selenium xpath — instant selector finder and helper.
// @namespace   xpath-tester
// @author      Converter Script
// @match       http://*/*
// @match       https://*/*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_registerMenuCommand
// @grant       GM_openInTab
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADx0lEQVR42tWa61LaUBSF8yzttD9b+xRVvIN4v4uCCuIVUUQwEPBWO30MW2ttX8LxPSAqEJJwbWeQ3bOj0IqgETLIOTNryI8wfCuzzz47s2CYCsuoCzXp23jO0M5f9LTxvLGdzxk7L6G38wp6u66gr5tIfwX9KMM1DPQQGa9hENV7DUN9ERjuv9XIANFgBEYHozA6FIWxYaKRKIyjRmMwMUY0HoNJ1EQMpiZjuckJgTdNChcmk+A3m+PvGbWrqyX0Vt/KnxnaLqGn/VbGDqK6wQuKTFNEJgGmp1FxmJkRTs1m+c2j8N06vlnfGpYaD57IHAezJZ6wWOIdFeAvW/W6cK6B4RVZZuM5i0VoKVM2Ybnx4UWYnVMk2WzS66IBg47/SRE8zM2j4t9v4ZtDH6iDt4owb4vnrVbSnbBV0gePkvCTZZQ+TyG8dYEYsIvnjKGNv6IR3mqXwLYohZn6nrCawhOJOYZeeAkWlmRgaIZfWEYDFMPb0QDN8PYVNKABvMctQTRyo8jpECvCu1zkvuiNIj8n1wy/uEoM1Ay/LUEqlYfCOj5OV3zyJyeZ4n34nUAgURP84lqCGNAQHq83N6SKZbPlfnh/IJioGn4JDVQLv70lQTL5DyadzoPPJz9Z836/fM9EJpOHvYNEVfBLDjRQR/hCzXOkdEpN7B8knw2/vE4M1Bu+UPNYOqUmDj4lnwW/7EQDLwBfqPngbhkTR0nV8CvOJDC1bFh2R665z+/tJ5UH8f9D2T9KqYJf2SAG1B5SkUhOc/hCze8f3jcRi92ogl/dvDOg5oQtZ0CrE7acATXwigG148GOp0wJsbLm8Hh9+DmlCn7NhQaeMdt4vQ83McclqobfJa2zdBMffVEP79hKAfPcwWynjAlsiS8B73CjgSqmSpa9X05p8uNBYqLe8OtooNqRGPt/KcTuXqKu8OvbaKCGeZ4LyA82ttcrV4RnyX6pZcOWwjs9xECtLyOBkrnm9Eem4mB29iurKbzTmyYGNHiTwk2MvRvlJa210lTJBpIQE24UHWgAv4EGXuI1UO0h9RT8xg4aoBh+kyUGaIbf9KEBiuFdvgwwGKjRCu/ypXOMkgbSCO/PwBaXCTF3USaN8KhzZmpK8FEKD24u7WVMJrGJUvi8h/vzTsnJMESmCj5APoPZr8WUEhNwAi5RBC96gtlX97Jis1nQYYjc6PBEOU8g21w2rbfMSx+JCbGB4RPu4O/2R/8vgQk4hsiYwzbShnUHs98elM1jC0Pk+QXRh1EmpoEYqNXzhCUGwtjnCTxb7DZl1l+4iYrgmF8CjQAAAABJRU5ErkJggg==
// @run-at      document-idle
// ==/UserScript==

console.log("Script start:",performance.now());const e=!0,t=e=>e,o="passthrough";let s,c={createHTML:t,createScript:t,createScriptURL:t},i=!1;const r=()=>{try{void 0!==window.isSecureContext&&window.isSecureContext&&window.trustedTypes&&window.trustedTypes.createPolicy&&(i=!0,trustedTypes.defaultPolicy?(l("TT Default Policy exists"),c=window.trustedTypes.createPolicy("default",c),s=trustedTypes.defaultPolicy,l(`Created custom passthrough policy, in case the default policy is too restrictive: Use Policy '${o}' in var 'TTP':`,c)):s=c=window.trustedTypes.createPolicy("default",c),l("Trusted-Type Policies: TTP:",c,"TTP_default:",s))}catch(e){l(e)}},l=(...e)=>{console.log(...e)};r();

(function() {
    // #region Logging
	
	  const SCRIPT_NAME = "XPath Tester";
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
			  "src/options/index.html": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n  <title>XPath Tester — Settings</title>\n  <link rel=\"stylesheet\" href=\"data:text/css;base64,LyogUmF0aW5nIG1vZGFsIOKAlCBzaGFyZWQgYmV0d2VlbiBwb3B1cC5odG1sIGFuZCBzZXR0aW5nLmh0bWwuCiAgIFVzZXMgQ1NTIGN1c3RvbSBwcm9wcyAoLS1zdXJmYWNlLCAtLXRleHQsIC0tYm9yZGVyLCAtLWZvbnQtc2FucywgLS1yLTJ4bCwgLS1zaGFkb3ctcG9wLAogICAtLXRleHQtbXV0ZWQsIC0tdGV4dC1zdWJ0bGUsIC0taW5rLTMwMCkgd2l0aCBoYXJkY29kZWQgZmFsbGJhY2tzLCBzbyBpdCB3b3JrcyBldmVuIGlmCiAgIHlvdXIgdGhlbWUgZG9lc24ndCBkZWZpbmUgdGhlbS4gVGhlIGNvbnRyb2xsZXIgb25seSB0b2dnbGVzIGAuaXMtZmlsbGVkYCBvbiBlYWNoCiAgIGAucmF0aW5nLW1vZGFsX19zdGFyYCBidXR0b24g4oCUIHRoZSBzdGFyIGljb24gbWFya3VwIGl0c2VsZiBpcyB5b3VycyAoZW1vamkgLyBpbmxpbmUgU1ZHIC8KICAgaWNvbiBmb250KS4gSWYgeW91IHVzZSBpbmxpbmUgU1ZHLCB0aGUgYC5zdmctaWNvbmAgZmlsbCBydWxlIGJlbG93IGxpZ2h0cyBpdCB1cC4gKi8KCi5yYXRpbmctbW9kYWwuaGlkZGVuIHsKICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7Cn0KCi5yYXRpbmctbW9kYWwgewogIHBvc2l0aW9uOiBmaXhlZDsKICBpbnNldDogMDsKICB6LWluZGV4OiA5OTk5OwogIGRpc3BsYXk6IGZsZXg7CiAgYWxpZ24taXRlbXM6IGNlbnRlcjsKICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKICBmb250LWZhbWlseTogdmFyKC0tZm9udC1zYW5zLCAnUGx1cyBKYWthcnRhIFNhbnMnLCBzeXN0ZW0tdWksIHNhbnMtc2VyaWYpOwp9CgoucmF0aW5nLW1vZGFsX19vdmVybGF5IHsKICBwb3NpdGlvbjogYWJzb2x1dGU7CiAgaW5zZXQ6IDA7CiAgYmFja2dyb3VuZDogcmdiYSgyOCwgMjUsIDIzLCAwLjQ1KTsKICBhbmltYXRpb246IHJhdGluZy1mYWRlLWluIDIwMG1zIGVhc2Utb3V0Owp9CgoucmF0aW5nLW1vZGFsX19jYXJkIHsKICBwb3NpdGlvbjogcmVsYXRpdmU7CiAgd2lkdGg6IG1pbigyODBweCwgY2FsYygxMDAlIC0gNTZweCkpOwogIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UpOwogIGNvbG9yOiB2YXIoLS10ZXh0KTsKICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpOwogIGJvcmRlci1yYWRpdXM6IHZhcigtLXItMnhsLCAyOHB4KTsKICBwYWRkaW5nOiAyNHB4IDIwcHggMTZweDsKICBib3gtc2hhZG93OiB2YXIoLS1zaGFkb3ctcG9wLCAwIDI0cHggNjBweCAtMTZweCByZ2JhKDIzNCw4OCwxMiwwLjE4KSk7CiAgdGV4dC1hbGlnbjogY2VudGVyOwogIGFuaW1hdGlvbjogcmF0aW5nLXBvcC1pbiAyNDBtcyBjdWJpYy1iZXppZXIoMC4xNiwgMSwgMC4zLCAxKTsKfQoKLyogU2V0dGluZ3MgcGFnZSAoZnVsbC13aWR0aCB0YWIpIOKAlCBiaWdnZXIgY2FyZCBmb3IgYmV0dGVyIHZpc3VhbCB3ZWlnaHQuICovCkBtZWRpYSAobWluLXdpZHRoOiA2MDBweCkgewogIC5yYXRpbmctbW9kYWxfX2NhcmQgewogICAgd2lkdGg6IDM4MHB4OwogICAgcGFkZGluZzogMzJweCAyOHB4IDIycHg7CiAgfQogIC5yYXRpbmctbW9kYWxfX2Vtb2ppIHsgZm9udC1zaXplOiA0NHB4OyBtYXJnaW4tYm90dG9tOiAxMnB4OyB9CiAgLnJhdGluZy1tb2RhbF9fdGl0bGUgeyBmb250LXNpemU6IDIwcHg7IH0KICAucmF0aW5nLW1vZGFsX19zdWJ0aXRsZSB7IGZvbnQtc2l6ZTogMTRweDsgbWFyZ2luLWJvdHRvbTogMjJweDsgfQogIC5yYXRpbmctbW9kYWxfX3N0YXIgeyBmb250LXNpemU6IDM0cHg7IH0KfQoKLnJhdGluZy1tb2RhbF9fY2xvc2UgewogIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICB0b3A6IDEwcHg7CiAgcmlnaHQ6IDEycHg7CiAgZGlzcGxheTogaW5saW5lLWZsZXg7CiAgYWxpZ24taXRlbXM6IGNlbnRlcjsKICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsKICBib3JkZXI6IDA7CiAgY3Vyc29yOiBwb2ludGVyOwogIGNvbG9yOiB2YXIoLS10ZXh0LXN1YnRsZSwgI2E4YTI5ZSk7CiAgZm9udC1zaXplOiAxNnB4OwogIGxpbmUtaGVpZ2h0OiAxOwogIHBhZGRpbmc6IDZweDsKICBib3JkZXItcmFkaXVzOiB2YXIoLS1yLW1kLCAxMHB4KTsKICB0cmFuc2l0aW9uOiBjb2xvciAxNTBtcyBlYXNlLCBiYWNrZ3JvdW5kIDE1MG1zIGVhc2U7Cn0KCi5yYXRpbmctbW9kYWxfX2Nsb3NlOmhvdmVyIHsKICBjb2xvcjogdmFyKC0tdGV4dCk7Cn0KCi5yYXRpbmctbW9kYWxfX2Vtb2ppIHsKICBmb250LXNpemU6IDQwcHg7CiAgbGluZS1oZWlnaHQ6IDE7CiAgbWFyZ2luLWJvdHRvbTogMTJweDsKfQoKLnJhdGluZy1tb2RhbF9fdGl0bGUgewogIGZvbnQtc2l6ZTogMThweDsKICBmb250LXdlaWdodDogODAwOwogIGxldHRlci1zcGFjaW5nOiAtMC4wMWVtOwogIG1hcmdpbjogMCAwIDZweDsKICBjb2xvcjogdmFyKC0tdGV4dCk7Cn0KCi5yYXRpbmctbW9kYWxfX3N1YnRpdGxlIHsKICBmb250LXNpemU6IDEzcHg7CiAgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQsICM3ODcxNmMpOwogIG1hcmdpbjogMCAwIDE4cHg7Cn0KCi5yYXRpbmctbW9kYWxfX3N0YXJzIHsKICBkaXNwbGF5OiBmbGV4OwogIGp1c3RpZnktY29udGVudDogY2VudGVyOwogIGdhcDogNnB4OwogIG1hcmdpbi1ib3R0b206IDE0cHg7Cn0KCi5yYXRpbmctbW9kYWxfX3N0YXIgewogIGRpc3BsYXk6IGlubGluZS1mbGV4OwogIGFsaWduLWl0ZW1zOiBjZW50ZXI7CiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7CiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7CiAgYm9yZGVyOiAwOwogIGN1cnNvcjogcG9pbnRlcjsKICBwYWRkaW5nOiA0cHg7CiAgY29sb3I6IHZhcigtLWluay0zMDAsICNkNmQzZDEpOwogIGZvbnQtc2l6ZTogMzBweDsKICBsaW5lLWhlaWdodDogMTsKICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTIwbXMgZWFzZSwgY29sb3IgMTIwbXMgZWFzZTsKfQoKLnJhdGluZy1tb2RhbF9fc3RhciAuc3ZnLWljb24gewogIGZpbGw6IG5vbmU7CiAgc3Ryb2tlOiBjdXJyZW50Q29sb3I7Cn0KCi5yYXRpbmctbW9kYWxfX3N0YXI6aG92ZXIgewogIHRyYW5zZm9ybTogc2NhbGUoMS4xKTsKfQoKLnJhdGluZy1tb2RhbF9fc3RhcjphY3RpdmUgewogIHRyYW5zZm9ybTogc2NhbGUoMC45NSk7Cn0KCi5yYXRpbmctbW9kYWxfX3N0YXIuaXMtZmlsbGVkIHsKICBjb2xvcjogI2Y1OWUwYjsKfQoKLnJhdGluZy1tb2RhbF9fc3Rhci5pcy1maWxsZWQgLnN2Zy1pY29uIHsKICBmaWxsOiBjdXJyZW50Q29sb3I7Cn0KCi5yYXRpbmctbW9kYWxfX2Rpc21pc3MgewogIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OwogIGJvcmRlcjogMDsKICBjdXJzb3I6IHBvaW50ZXI7CiAgZm9udC1zaXplOiAxM3B4OwogIGZvbnQtd2VpZ2h0OiA2MDA7CiAgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQsICM3ODcxNmMpOwogIHBhZGRpbmc6IDZweCA4cHg7CiAgdHJhbnNpdGlvbjogY29sb3IgMTUwbXMgZWFzZTsKfQoKLnJhdGluZy1tb2RhbF9fZGlzbWlzczpob3ZlciB7CiAgY29sb3I6IHZhcigtLXRleHQpOwp9CgovKiBPdmVycmlkZSBnbG9iYWwgYTExeSBmb2N1cyByaW5ncyBhbmQgZ2xvYmFsIGJ1dHRvbjpob3ZlciBiYWNrZ3JvdW5kcyDigJQKICAgdmlzdWFsIGZlZWRiYWNrIG9uIHN0YXJzL2J1dHRvbnMgaXMgaGFuZGxlZCBieSBob3Zlci9maWxsIHN0YXRlcy4gKi8KLnJhdGluZy1tb2RhbF9fc3RhciwKLnJhdGluZy1tb2RhbF9fY2xvc2UsCi5yYXRpbmctbW9kYWxfX2Rpc21pc3MsCi5yYXRpbmctbW9kYWxfX3N0YXI6aG92ZXIsCi5yYXRpbmctbW9kYWxfX2Nsb3NlOmhvdmVyLAoucmF0aW5nLW1vZGFsX19kaXNtaXNzOmhvdmVyLAoucmF0aW5nLW1vZGFsX19zdGFyOmZvY3VzLAoucmF0aW5nLW1vZGFsX19zdGFyOmZvY3VzLXZpc2libGUsCi5yYXRpbmctbW9kYWxfX2Nsb3NlOmZvY3VzLAoucmF0aW5nLW1vZGFsX19jbG9zZTpmb2N1cy12aXNpYmxlLAoucmF0aW5nLW1vZGFsX19kaXNtaXNzOmZvY3VzLAoucmF0aW5nLW1vZGFsX19kaXNtaXNzOmZvY3VzLXZpc2libGUgewogIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7CiAgb3V0bGluZTogbm9uZSAhaW1wb3J0YW50OwogIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDsKfQoKQGtleWZyYW1lcyByYXRpbmctZmFkZS1pbiB7CiAgZnJvbSB7IG9wYWNpdHk6IDA7IH0KICB0byAgIHsgb3BhY2l0eTogMTsgfQp9CgpAa2V5ZnJhbWVzIHJhdGluZy1wb3AtaW4gewogIGZyb20geyBvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpIHRyYW5zbGF0ZVkoNHB4KTsgfQogIHRvICAgeyBvcGFjaXR5OiAxOyB0cmFuc2Zvcm06IHNjYWxlKDEpIHRyYW5zbGF0ZVkoMCk7IH0KfQo=\" />\n  <script src=\"data:text/javascript;base64,Ly8gUmF0aW5nIFByb21wdCDigJQgc3RhdGUgbWFjaGluZSArIFVJIGNvbnRyb2xsZXIgZm9yIGEgIkhhcHB5IHdpdGggb3VyIGFwcD8iIHN0YXIgbW9kYWwuCi8vCi8vIENVU1RPTUlaRSBiZWZvcmUgc2hpcHBpbmcgKDMgc3BvdHMsIGFsbCBtYXJrZWQgX19DVVNUT01JWkVfXyBiZWxvdyk6Ci8vICAgMS4gRkVFREJBQ0tfRk9STV9VUkwgICAg4oCUIHdoZXJlIDHigJMzIHN0YXIgY2xpY2tzIGdvICh5b3VyIGZlZWRiYWNrIGZvcm0pLgovLyAgIDIuIFdFQlNUT1JFX1JFVklFV19VUkwgIOKAlCB3aGVyZSA04oCTNSBzdGFyIGNsaWNrcyBnbyAoeW91ciBXZWIgU3RvcmUgcmV2aWV3cyB0YWI6Ci8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodHRwczovL2Nocm9tZXdlYnN0b3JlLmdvb2dsZS5jb20vZGV0YWlsLzxzbHVnPi88aWQ+L3Jldmlld3MpLgovLyAgIDMuIHJlY29yZEJsb2NrIC8gcmVjb3JkRm9jdXNDb21wbGV0ZSDigJQgdGhlc2UgdHdvIGFyZSBFWEFNUExFIHBvc2l0aXZlLWFjdGlvbiBjb3VudGVycwovLyAgICAgIGZyb20gYSBibG9ja2VyIGV4dGVuc2lvbi4gUmVuYW1lIHRvIFlPVVIgYXBwJ3MgcG9zaXRpdmUgZXZlbnRzCi8vICAgICAgKGUuZy4gcmVjb3JkRXhwb3J0IC8gcmVjb3JkQ29udmVydCkuIFRoZSBwcm9tcHQgZmlyZXMgd2hlbiB0aGVpciBTVU0gPj0gVEhSRVNIT0xELgovLyAgICAgIE5lZWQgb25seSBvbmUgc2lnbmFsPyBLZWVwIG9uZSBmdW5jdGlvbiBhbmQgZHJvcCB0aGUgb3RoZXIgZnJvbSBzaG91bGRTaG93KCkuCi8vCi8vIFRvcC1sZXZlbCBgdmFyYCBiZWNvbWVzIGEgcHJvcGVydHkgb2YgdGhlIGdsb2JhbCBvYmplY3QgaW4gQk9USCB3aW5kb3cgY29udGV4dHMKLy8gKHBvcHVwLmh0bWwgLyBzZXR0aW5nLmh0bWwpIGFuZCBzZXJ2aWNlLXdvcmtlciBjb250ZXh0cyAoYmFja2dyb3VuZC5qcyB2aWEKLy8gaW1wb3J0U2NyaXB0cykuIFRoZSBTQU1FIGZpbGUgd29ya3MgaW4gYWxsIHRocmVlIGVudHJ5cG9pbnRzIOKAlCBsb2FkIGl0IGV2ZXJ5d2hlcmUuCgp2YXIgUmF0aW5nUHJvbXB0ID0gKCgpID0+IHsKICBjb25zdCBTVE9SQUdFX0tFWSA9ICdyYXRpbmdTdGF0ZSc7CiAgY29uc3QgVEhSRVNIT0xEID0gMzsgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvc2l0aXZlIGFjdGlvbnMgYmVmb3JlIGZpcnN0IHByb21wdAogIGNvbnN0IENPT0xET1dOX01TID0gNyAqIDI0ICogNjAgKiA2MCAqIDEwMDA7IC8vIHdhaXQgYWZ0ZXIgYSAibm90IG5vdyIgYmVmb3JlIHJlLWFza2luZwoKICAvLyBNVVNUIG1hdGNoIEZFRURCQUNLX1VSTCBpbiBzcmMvc2hhcmVkL2NvbnN0YW50cy50cyAodGhpcyB2ZW5kb3IgZmlsZSBpcyBhCiAgLy8gY2xhc3NpYyBub24tbW9kdWxlIHNjcmlwdCBhbmQgY2FuJ3QgaW1wb3J0IHRoZSBUUyBjb25zdGFudCkuCiAgY29uc3QgRkVFREJBQ0tfRk9STV9VUkwgPSAnaHR0cHM6Ly9mb3Jtcy5nbGUvRzFKekhwOWlRdHF2WXdxOEEnOwogIC8vIDTigJM14piFIGNsaWNrcyBnbyBoZXJlIChsaXZlIFdlYiBTdG9yZSByZXZpZXdzIHRhYik7IDHigJMz4piFIGdvIHRvIHRoZSBmZWVkYmFjayBmb3JtLgogIGNvbnN0IFdFQlNUT1JFX1JFVklFV19VUkwgPSAnaHR0cHM6Ly9jaHJvbWV3ZWJzdG9yZS5nb29nbGUuY29tL2RldGFpbC94cGF0aC10ZXN0ZXIvbGxlZmZpZmhsY2Fpamlua29jcHBnaHBnYm5pb2VjaGMvcmV2aWV3cyc7CgogIGNvbnN0IERFRkFVTFRfU1RBVEUgPSB7CiAgICBjb3B5Q291bnQ6IDAsCiAgICBzYXZlQ291bnQ6IDAsCiAgICBzdGF0dXM6ICdwZW5kaW5nJywKICB9OwoKICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHsKICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gewogICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoU1RPUkFHRV9LRVksIChzdG9yZWQpID0+IHsKICAgICAgICBjb25zdCB2YWx1ZSA9IHN0b3JlZCAmJiBzdG9yZWRbU1RPUkFHRV9LRVldOwogICAgICAgIHJlc29sdmUodmFsdWUgPyB7IC4uLkRFRkFVTFRfU1RBVEUsIC4uLnZhbHVlIH0gOiB7IC4uLkRFRkFVTFRfU1RBVEUgfSk7CiAgICAgIH0pOwogICAgfSk7CiAgfQoKICBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSkgewogICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7CiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IFtTVE9SQUdFX0tFWV06IHN0YXRlIH0sICgpID0+IHJlc29sdmUoKSk7CiAgICB9KTsKICB9CgogIC8vIE5vdGU6IGNvdW50ZXJzL21hcmtlcnMgZG8gcmVhZC1tb2RpZnktd3JpdGUgb24gc3RvcmFnZSB3aXRob3V0IGxvY2tpbmcuIENvbmN1cnJlbnQKICAvLyBjYWxscyBtYXkgbG9zZSBhbiBpbmNyZW1lbnQ7IGltcGFjdCBpcyBiZW5pZ24gKHByb21wdCBtYXkgZGVsYXkgb3Igc2hvdyBvbmNlIGV4dHJhKS4KCiAgLy8gUG9zaXRpdmUtYWN0aW9uIGNvdW50ZXIgIzEg4oCUIHRoZSB1c2VyIGNvcGllZCBhbiBYUGF0aCAvIENTUyAvIG1hdGNoIHRleHQuCiAgYXN5bmMgZnVuY3Rpb24gcmVjb3JkQ29weSgpIHsKICAgIGNvbnN0IHN0YXRlID0gYXdhaXQgZ2V0U3RhdGUoKTsKICAgIGlmIChzdGF0ZS5zdGF0dXMgPT09ICdyYXRlZCcgfHwgc3RhdGUuc3RhdHVzID09PSAnbmV2ZXInKSByZXR1cm47CiAgICBhd2FpdCBzZXRTdGF0ZSh7IC4uLnN0YXRlLCBjb3B5Q291bnQ6IHN0YXRlLmNvcHlDb3VudCArIDEgfSk7CiAgfQoKICAvLyBQb3NpdGl2ZS1hY3Rpb24gY291bnRlciAjMiDigJQgdGhlIHVzZXIgc3RhcnJlZCBhIHNlbGVjdG9yIGludG8gU2F2ZWQuCiAgYXN5bmMgZnVuY3Rpb24gcmVjb3JkU2F2ZSgpIHsKICAgIGNvbnN0IHN0YXRlID0gYXdhaXQgZ2V0U3RhdGUoKTsKICAgIGlmIChzdGF0ZS5zdGF0dXMgPT09ICdyYXRlZCcgfHwgc3RhdGUuc3RhdHVzID09PSAnbmV2ZXInKSByZXR1cm47CiAgICBhd2FpdCBzZXRTdGF0ZSh7IC4uLnN0YXRlLCBzYXZlQ291bnQ6IHN0YXRlLnNhdmVDb3VudCArIDEgfSk7CiAgfQoKICBmdW5jdGlvbiBzaG91bGRTaG93KHN0YXRlLCBub3cgPSBEYXRlLm5vdygpKSB7CiAgICBpZiAoc3RhdGUuc3RhdHVzID09PSAncmF0ZWQnIHx8IHN0YXRlLnN0YXR1cyA9PT0gJ25ldmVyJykgcmV0dXJuIGZhbHNlOwogICAgaWYgKChzdGF0ZS5jb3B5Q291bnQgKyBzdGF0ZS5zYXZlQ291bnQpIDwgVEhSRVNIT0xEKSByZXR1cm4gZmFsc2U7CiAgICBpZiAoc3RhdGUuc3RhdHVzID09PSAncGVuZGluZycpIHJldHVybiB0cnVlOwogICAgaWYgKHN0YXRlLnN0YXR1cyA9PT0gJ2Rpc21pc3NlZF9vbmNlJykgewogICAgICBpZiAoc3RhdGUubGFzdERpc21pc3NlZEF0ID09PSB1bmRlZmluZWQpIHJldHVybiB0cnVlOwogICAgICByZXR1cm4gbm93IC0gc3RhdGUubGFzdERpc21pc3NlZEF0ID49IENPT0xET1dOX01TOwogICAgfQogICAgcmV0dXJuIGZhbHNlOwogIH0KCiAgYXN5bmMgZnVuY3Rpb24gbWFya1JhdGVkKCkgewogICAgY29uc3Qgc3RhdGUgPSBhd2FpdCBnZXRTdGF0ZSgpOwogICAgYXdhaXQgc2V0U3RhdGUoeyAuLi5zdGF0ZSwgc3RhdHVzOiAncmF0ZWQnIH0pOwogIH0KCiAgYXN5bmMgZnVuY3Rpb24gbWFya0Rpc21pc3NlZCgpIHsKICAgIGNvbnN0IHN0YXRlID0gYXdhaXQgZ2V0U3RhdGUoKTsKICAgIGNvbnN0IG5leHQgPSBzdGF0ZS5zdGF0dXMgPT09ICdwZW5kaW5nJwogICAgICA/IHsgLi4uc3RhdGUsIHN0YXR1czogJ2Rpc21pc3NlZF9vbmNlJywgbGFzdERpc21pc3NlZEF0OiBEYXRlLm5vdygpIH0KICAgICAgOiB7IC4uLnN0YXRlLCBzdGF0dXM6ICduZXZlcicgfTsKICAgIGF3YWl0IHNldFN0YXRlKG5leHQpOwogICAgcmV0dXJuIG5leHQ7CiAgfQoKICAvLyBBdHRhY2hlcyB0aGUgc3RhciAvIGNsb3NlIC8gZGlzbWlzcyBoYW5kbGVycyBvbmNlLiBJZGVtcG90ZW50OiB0aGUKICAvLyByYXRpbmdCb3VuZCBndWFyZCBtYWtlcyBhIHNlY29uZCBjYWxsIChtYXliZVNob3cgKyBvcGVuIGluIGFueSBvcmRlcikgYSBuby1vcC4KICAvLyBTaG93aW5nIHRoZSBtb2RhbCBpcyBsZWZ0IHRvIHRoZSBjYWxsZXIgKGNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpKS4KICBmdW5jdGlvbiBiaW5kTW9kYWwobW9kYWwpIHsKICAgIGlmIChtb2RhbC5kYXRhc2V0LnJhdGluZ0JvdW5kID09PSAnMScpIHJldHVybjsKICAgIG1vZGFsLmRhdGFzZXQucmF0aW5nQm91bmQgPSAnMSc7CgogICAgY29uc3Qgc3RhcnMgPSBtb2RhbC5xdWVyeVNlbGVjdG9yQWxsKCcucmF0aW5nLW1vZGFsX19zdGFyJyk7CiAgICBjb25zdCBjbG9zZUJ0biA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5yYXRpbmctbW9kYWxfX2Nsb3NlJyk7CiAgICBjb25zdCBkaXNtaXNzQnRuID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnJhdGluZy1tb2RhbF9fZGlzbWlzcycpOwoKICAgIGZ1bmN0aW9uIHNldEZpbGwodXBUbykgewogICAgICBzdGFycy5mb3JFYWNoKChidG4sIGlkeCkgPT4gewogICAgICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdpcy1maWxsZWQnLCBpZHggPCB1cFRvKTsKICAgICAgfSk7CiAgICB9CgogICAgZnVuY3Rpb24gaGlkZSgpIHsKICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7CiAgICB9CgogICAgc3RhcnMuZm9yRWFjaCgoYnRuKSA9PiB7CiAgICAgIGNvbnN0IG4gPSBwYXJzZUludChidG4uZGF0YXNldC5zdGFycywgMTApOwogICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHNldEZpbGwobikpOwogICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoKSA9PiBzZXRGaWxsKG4pKTsKICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4gewogICAgICAgIGF3YWl0IG1hcmtSYXRlZCgpOwogICAgICAgIGhpZGUoKTsKICAgICAgICAvLyA04oCTNeKYhSDihpIgV2ViIFN0b3JlIHJldmlld3M7IDHigJMz4piFIOKGkiBwcml2YXRlIGZlZWRiYWNrIGZvcm0uCiAgICAgICAgY29uc3QgdXJsID0gbiA+PSA0ID8gV0VCU1RPUkVfUkVWSUVXX1VSTCA6IEZFRURCQUNLX0ZPUk1fVVJMOwogICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybCB9KS5jYXRjaCgoZSkgPT4gY29uc29sZS53YXJuKCdyYXRpbmc6IHRhYnMuY3JlYXRlIGZhaWxlZCcsIGUpKTsKICAgICAgfSk7CiAgICB9KTsKICAgIG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5yYXRpbmctbW9kYWxfX3N0YXJzJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHNldEZpbGwoMCkpOwoKICAgIGZ1bmN0aW9uIGRpc21pc3MoKSB7CiAgICAgIGhpZGUoKTsKICAgICAgbWFya0Rpc21pc3NlZCgpOwogICAgfQogICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBkaXNtaXNzKCkpOwogICAgZGlzbWlzc0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGRpc21pc3MoKSk7CiAgfQoKICAvLyBVSSBjb250cm9sbGVyIOKAlCBydW5zIGluIHBvcHVwL3NldHRpbmdzIG9ubHkgKG5vdCBpbiBzZXJ2aWNlIHdvcmtlcikuCiAgLy8gU2hvd3MgdGhlIG1vZGFsIG9ubHkgd2hlbiBzaG91bGRTaG93KCkgcGFzc2VzIChjb3VudGVycy9jb29sZG93biBnYXRlKS4KICBhc3luYyBmdW5jdGlvbiBtYXliZVNob3coc3VyZmFjZSkgewogICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmF0aW5nTW9kYWwnKTsKICAgIGlmICghbW9kYWwpIHJldHVybjsgLy8gcGFnZSBkaWRuJ3QgaW5jbHVkZSB0aGUgbW9kYWwgbWFya3VwCgogICAgLy8gTG9uZy1saXZlZCBwYWdlcyAoc2V0dGluZ3MpIOKAlCByZS1jaGVjayB3aGVuIHN0YXRlIGNoYW5nZXMgZXh0ZXJuYWxseS4KICAgIGlmICghbW9kYWwuZGF0YXNldC5yYXRpbmdMaXN0ZW5lcikgewogICAgICBtb2RhbC5kYXRhc2V0LnJhdGluZ0xpc3RlbmVyID0gJzEnOwogICAgICBjaHJvbWUuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoKGNoYW5nZXMsIGFyZWEpID0+IHsKICAgICAgICBpZiAoYXJlYSA9PT0gJ2xvY2FsJyAmJiBjaGFuZ2VzW1NUT1JBR0VfS0VZXSkgbWF5YmVTaG93KHN1cmZhY2UpOwogICAgICB9KTsKICAgIH0KCiAgICBjb25zdCBzdGF0ZSA9IGF3YWl0IGdldFN0YXRlKCk7CiAgICBpZiAoIXNob3VsZFNob3coc3RhdGUpKSByZXR1cm47CiAgICBiaW5kTW9kYWwobW9kYWwpOwogICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7CiAgfQoKICAvLyBGb3JjZS1zaG93IHRoZSBtb2RhbCByZWdhcmRsZXNzIG9mIGNvdW50ZXJzL3N0YXRlIOKAlCBmb3IgYW4gZXhwbGljaXQKICAvLyAiUmF0ZSB1cyIgYnV0dG9uLiBPbmUtc2hvdDogbm8gc3RhdGUgcmVhZCwgbm8gb25DaGFuZ2VkIGxpc3RlbmVyLgogIGZ1bmN0aW9uIG9wZW4oKSB7CiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYXRpbmdNb2RhbCcpOwogICAgaWYgKCFtb2RhbCkgcmV0dXJuOwogICAgYmluZE1vZGFsKG1vZGFsKTsKICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpOwogIH0KCiAgcmV0dXJuIHsKICAgIGdldFN0YXRlLAogICAgcmVjb3JkQ29weSwKICAgIHJlY29yZFNhdmUsCiAgICBzaG91bGRTaG93LAogICAgbWFya1JhdGVkLAogICAgbWFya0Rpc21pc3NlZCwKICAgIG1heWJlU2hvdywKICAgIG9wZW4sCiAgfTsKfSkoKTsK\"></script>\n  <script type=\"module\" crossorigin src=\"data:text/javascript;base64,aW1wb3J0e2EgYXMgaSxyIGFzIHN9ZnJvbSIuL2NodW5rLUNzdVNiWjN6LmpzIjtpbXBvcnR7RiBhcyBwfWZyb20iLi9jaHVuay1MTVJUQzE0ci5qcyI7aW1wb3J0e2EgYXMgbSxzIGFzIGcsZyBhcyB5LGIgYXMga31mcm9tIi4vY2h1bmstQnlENURXVkwuanMiO2FzeW5jIGZ1bmN0aW9uIHYoKXtjb25zdCBvPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJmbG9hdGluZy10b2dnbGUiKSxkPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJob3RrZXkiKSxoPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjaGFuZ2Utc2hvcnRjdXQiKSx1PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJyYXRlLWxpbmsiKSxmPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJmZWVkYmFjay1saW5rIiksYz1hd2FpdCBtKCk7aShzKGMudGhlbWUpKTtjb25zdCByPUFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgiLnRoZW1lLW9wdCIpKTtmdW5jdGlvbiBsKGUpe2NvbnN0IG49ZT8/InN5c3RlbSI7Zm9yKGNvbnN0IHQgb2Ygcil0LmNsYXNzTGlzdC50b2dnbGUoImFjdGl2ZSIsdC5kYXRhc2V0LnRoZW1lPT09bil9bChjLnRoZW1lKTtmb3IoY29uc3QgZSBvZiByKWUuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCgpPT57Y29uc3Qgbj1lLmRhdGFzZXQudGhlbWUsdD1uPT09ImxpZ2h0Inx8bj09PSJkYXJrIj9uOm51bGw7Zyh7dGhlbWU6dH0pLGkocyh0KSksbCh0KX0pO21hdGNoTWVkaWEoIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykiKS5hZGRFdmVudExpc3RlbmVyKCJjaGFuZ2UiLCgpPT57KGFzeW5jKCk9Pntjb25zdHt0aGVtZTplfT1hd2FpdCBtKCk7ZT09PW51bGwmJmkocyhlKSl9KSgpfSksby5jaGVja2VkPWF3YWl0IHkoKSxvLmFkZEV2ZW50TGlzdGVuZXIoImNoYW5nZSIsKCk9PntrKG8uY2hlY2tlZCl9KTtjb25zdCBhPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJwaW4tdG9nZ2xlIik7YS5jaGVja2VkPSFjLnBpbm5lZCxhLmFkZEV2ZW50TGlzdGVuZXIoImNoYW5nZSIsKCk9PntnKHtwaW5uZWQ6IWEuY2hlY2tlZH0pfSksZCYmbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcygiTWFjIikmJihkLnRleHRDb250ZW50PSLijJjih6dYIiksaD8uYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCgpPT57Y2hyb21lLnRhYnMuY3JlYXRlKHt1cmw6ImNocm9tZTovL2V4dGVuc2lvbnMvc2hvcnRjdXRzIn0pfSksdT8uYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCgpPT57dHJ5e3R5cGVvZiBSYXRpbmdQcm9tcHQ8InUiJiZSYXRpbmdQcm9tcHQub3BlbigpfWNhdGNoe319KSxmPy5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsKCk9PntjaHJvbWUudGFicy5jcmVhdGUoe3VybDpwfSl9KTt0cnl7dHlwZW9mIFJhdGluZ1Byb21wdDwidSImJlJhdGluZ1Byb21wdC5tYXliZVNob3coIm9wdGlvbnMiKX1jYXRjaHt9fXYoKTsK\"></script>\n  <link rel=\"modulepreload\" crossorigin href=\"data:text/javascript;base64,KGZ1bmN0aW9uKCl7Y29uc3Qgbz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJsaW5rIikucmVsTGlzdDtpZihvJiZvLnN1cHBvcnRzJiZvLnN1cHBvcnRzKCJtb2R1bGVwcmVsb2FkIikpcmV0dXJuO2Zvcihjb25zdCBlIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpbmtbcmVsPSJtb2R1bGVwcmVsb2FkIl0nKSluKGUpO25ldyBNdXRhdGlvbk9ic2VydmVyKGU9Pntmb3IoY29uc3QgdCBvZiBlKWlmKHQudHlwZT09PSJjaGlsZExpc3QiKWZvcihjb25zdCBzIG9mIHQuYWRkZWROb2RlcylzLnRhZ05hbWU9PT0iTElOSyImJnMucmVsPT09Im1vZHVsZXByZWxvYWQiJiZuKHMpfSkub2JzZXJ2ZShkb2N1bWVudCx7Y2hpbGRMaXN0OiEwLHN1YnRyZWU6ITB9KTtmdW5jdGlvbiBpKGUpe2NvbnN0IHQ9e307cmV0dXJuIGUuaW50ZWdyaXR5JiYodC5pbnRlZ3JpdHk9ZS5pbnRlZ3JpdHkpLGUucmVmZXJyZXJQb2xpY3kmJih0LnJlZmVycmVyUG9saWN5PWUucmVmZXJyZXJQb2xpY3kpLGUuY3Jvc3NPcmlnaW49PT0idXNlLWNyZWRlbnRpYWxzIj90LmNyZWRlbnRpYWxzPSJpbmNsdWRlIjplLmNyb3NzT3JpZ2luPT09ImFub255bW91cyI/dC5jcmVkZW50aWFscz0ib21pdCI6dC5jcmVkZW50aWFscz0ic2FtZS1vcmlnaW4iLHR9ZnVuY3Rpb24gbihlKXtpZihlLmVwKXJldHVybjtlLmVwPSEwO2NvbnN0IHQ9aShlKTtmZXRjaChlLmhyZWYsdCl9fSkoKTtmdW5jdGlvbiBjKHIpe3JldHVybiByfHwobWF0Y2hNZWRpYSgiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSIpLm1hdGNoZXM/ImRhcmsiOiJsaWdodCIpfWZ1bmN0aW9uIHUocil7ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRhdGFzZXQudGhlbWU9cn1leHBvcnR7dSBhcyBhLGMgYXMgcn07Cg==\">\n  <link rel=\"modulepreload\" crossorigin href=\"data:text/javascript;base64,Y29uc3QgdD0ieHB0LWhpZ2hsaWdodCIsbz0ieHB0LWJsaW5rIixhPSJzaWRlcGFuZWwiLGM9InhwdC1mbG9hdGluZy1idXR0b24iLG49MzAwLF89NTAwLGU9MzAwLEU9MjUwMCxUPTUwLHA9MTMwMCxMPTIwLHM9Imh0dHBzOi8vY2hyb21ld2Vic3RvcmUuZ29vZ2xlLmNvbS9kZXRhaWwveHBhdGgtdGVzdGVyL2xsZWZmaWZobGNhaWppbmtvY3BwZ2hwZ2JuaW9lY2hjLyIsUz1gJHtzfXJldmlld3NgLGg9Imh0dHBzOi8vZm9ybXMuZ2xlL0cxSnpIcDlpUXRxdll3cThBIixpPSJodHRwczovL2Nocm9tZS1leHQudGlsZGEud3MveHBhdGh0ZXN0ZXIiO2V4cG9ydHtvIGFzIEIscCBhcyBDLGUgYXMgRSxoIGFzIEYsTCBhcyBILG4gYXMgTSxhIGFzIFAsUyBhcyBSLHMgYXMgUyxpIGFzIFcsYyBhcyBhLHQgYXMgYixfIGFzIGMsVCBhcyBkLEUgYXMgZX07Cg==\">\n  <link rel=\"modulepreload\" crossorigin href=\"data:text/javascript;base64,Y29uc3QgYT17eHBhdGhNb2RlOiJyZWxhdGl2ZSIsdGhlbWU6bnVsbCxvbmJvYXJkaW5nQ29tcGxldGVkOiExLHBpbm5lZDohMCxoaXN0b3J5OltdLHNhdmVkOltdfTthc3luYyBmdW5jdGlvbiBlKCl7Y29uc3QgdD1hd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoT2JqZWN0LmtleXMoYSkpO3JldHVybnsuLi5hLC4uLnR9fWFzeW5jIGZ1bmN0aW9uIG4odCl7YXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHQpfWFzeW5jIGZ1bmN0aW9uIG8oKXtjb25zdHtmbG9hdGluZ0J1dHRvbkVuYWJsZWQ6dD0hMX09YXdhaXQgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoImZsb2F0aW5nQnV0dG9uRW5hYmxlZCIpO3JldHVybiEhdH1hc3luYyBmdW5jdGlvbiBzKHQpe2F3YWl0IGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtmbG9hdGluZ0J1dHRvbkVuYWJsZWQ6dH0pfWV4cG9ydHtlIGFzIGEscyBhcyBiLG8gYXMgZyxuIGFzIHN9Owo=\">\n  <link rel=\"stylesheet\" crossorigin href=\"data:text/css;base64,QGZvbnQtZmFjZXtmb250LWZhbWlseTpNYW5yb3BlIFZhcmlhYmxlO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtZGlzcGxheTpzd2FwO2ZvbnQtd2VpZ2h0OjIwMCA4MDA7c3JjOnVybChkYXRhOmZvbnQvd29mZjI7YmFzZTY0LGQwOUdNZ0FCQUFBQUFBbjRBQk1BQUFBQUV3UUFBQW1PQUFFQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFHalFiZ25RY0xqOUlWa0ZTZ1FFR1lEOVRWRUZVZ1FJQWdRb3ZhaEVJQ29rMGgwVUxJQUF3aHpvQk5nSWtBendFSUFXSEpnZUJEZ3dIRzZRUVVkUktUbW9CRkQ4SzQyYm5pT2JLckczTFpGY01XWnpGbXJqVEZoUTZUVlRxUEpjSW5yZnJ2enEzYjJQR24xd3dNaU5ZR1R5OVZpUkVZQVJsTDF6QUdjUGRQcUJ0M2dOV3JmS3RodjR4bk0rYjljYXcrd21qZ0VVVlJqSFhoUzZqZ0NLNnpmNUhpV1FhY0pwR2RBZ2RyYlY2Zy9SZjFCZnhScVpWUW5yeFJWV1NKYjZSTEZueXUwZWxpbG1qZW9TUUNLbnhzbXdMYWRkVU1qbmtzcmlTWXV1UGwwNkVBbDdLZkFpV1FqQ1VFVHowek5aM0VJSTk0Q0RRdHprTWZaLzlJa2tZOHRaUlpURGt5NVpWd0JBTStHWXBkZDRaVkFXWUltbkxraVRnNDhsNzlnR3gzRCtWQnRMZXlnOHU3YkpBZDR1bzBwRnVRQkZ5c0U5Qzk1bDBXNEZraWFvNkdmckRidTc3bFZVN3drOWNWM3VxT3NYbVFpTWtoVktsMXVnanpVQUpCU0lra1ZXSGlqa3BrVlN5VUZzZ1ZCdUpNQTBOK1puWHR5VXY1eU1pZ0dkZlFSbXdMMUFBalEzWVhHNmlJRk5TVWRQUW84K0FJU1BHQWx0Qk1EUVJBdHlmNFpzcExsWmtweU9Wb01aUHZGR1d6dms4cDVTVUMvTldQTWo2VDIvWWFzMkVkbE9ONUdrZmRrZUZ3VkdqdGE4MjVIODlOSWVubExXQVBBcDVoMUtEdFJoQ2FBUVdNc0ZLdEV2T0twSWhnTEhsWFBBUm9ra2dFR0VPQWtxeEpSUXBLWXE0ZXphaElpTEhQNmhacHFNYlYwcFVGMnZkdkVpbUxFUS9pSVVZTGdZV3MwVlhHVmxMVE9QZGFQbUZmQ0MvWHJ0enFWbzFlejd2ejYrS2QyKzdvMTFaSis0TXJlTGJCNUJLVkd4b2JBcTRqWllhbFo1YVgyQ0tKaXdVdWM5R05KeWk0TThiR3lLY2RqU1JyRzRKb2hkRjhidUpmbVFlZmJZWVJFbk1Gc09vaU5saUZEVnhtUmdMMFhVbVVNTHF6VzBBNGdDUUFoV0dZQ1FwRk51a3dYaElrUE1zYlJJMTlld3R3OENwMldqL1JvNWNNMk9UQWJKQXZaL0w0b3BCWGI5K1VIc2NZdU9LTS9XOGlzZ3dOMjZFeGV4aml6bWZubHA5ZEUzaE9TcWRaL0Y1UXFiY2tJbFBiK29LZlh4ZDZoZnRKN1NtL3V5UFlwT056YTg0Q1JsTU5rL3VoT3JMcHlmNTM5ODIrK3pSa1hOdTNnM1ZGOHFGYngxKzdmYkhaOURyQjNWWFdOU21oblQydnJ3UzErMVora0hHQmFaSWhubnZ1TEJUTkRlQTM0MEQxRFd1NS9qRWE5cFZmbDYrSmlqK3lvM0VFTE5peFhDTGpyMTczUTVlRFA3WTcvTDRpUUZIYmpwYUpMRm9QNGNDc1lQNnNBUEw3Z01ITmc1M3lZanF4cVREcllxTERsNUR6Vy9lVExqWXhDdnVjcHJqSTN5bDJ5a0tvd0tVQzJPeDJGSkxGbzZGYTFIQldMQzJqTUNJSUJFbWtsa1lobWtwbUJoVG0vTEN2SkFINW9HY01LY2dGRVAxeFVkaG84QU5QYTZSRkQ5OS9QTjYwZmpqOWVYeTJFZXg0QjVNcG1SYXBYaWR6RmsxcDR1TGszK2huNmpBUDlvdkpjWFBQd2s4by8wbHRpemJkYm5UcHJ2eDRQU3hUMFZaM1hjNzcyYU43UmZsZ2JYUll3YzNoTE5PK2s4NzhueEd3ZnVWTThtOEdzN1dFb1ZHV0xId1NweDR2TlNIQkNNTnFKNG0xNUtwL1RmSEhWa1FkKytlWTdQR040VzVieVRzKzZGdDhPenZiL0Q2MGJ0djM3ZGU4RVIwbVMzUC8wc0xXODRxR2pFVmt3enRQenowNmVHVVd3S0x3UGIwRC9XRmQzdmx0bDJhUDI3NktwTTBKTno2QWZuQW5aNUFEbEYyelZ5WjJPa3hIU014V1BNblNaTGJiRFIzRjFValBWcXA0ZDY4ZGExM0YxWVp1amRXdzcyNzFpZWNPMmw5Ky80cDQ3T3p0amNrMzU1Lzc1d0ZPSStWZEdEcWJOR3MrSVNneGczaUIyamIycitiMENXc05MSElNNHNkdjhTRFNGQlAvT3JvbXo2Rk5DV3cyaU1UeFYwUjhRTHlCVGtwZTBqNStwU1NKT09UQjVNY2svZ2gzSW9wdU5RbmhLajAydDNGTDgwZ0diRWg4OVNaY3dUeGNZdDVjWlQvbk1uQjN1WGZQeThCU3BWTUJ1UngrWmhBQ0d6REJtd0hzSlJBamhvdE9uenVqMndEejN1ZzJ3T1VBWTJOZ1psbjkvVEsvZW5HL29FNHJPMXd4dkdVRk1BeHNaMHFOalJDN2hsOWQxN2U3aW1iZ0R0NnVKWGhVb2JEZzd2M1JYL3lSQ0t4Z01oZnlpS2NaZmJwazB3bUNjZFFsSUFPSGVha1hMdkNOdCsrV2ZLaW96TnFTWnh4Sm90bitjMGE3RGRQc3g3RFBZZ0tJRHh3d1lVWkRnOWFKYnhvY1RqY3dvdnI5V0FzVlYzMm1Rb2lpSU9DSGM2ME9sdHN0OXFDUVl1Q3FOMXlIbzBLajYwT2dJMk9xbWl1QlVXck5BME5EaFlDRGNkcG1NcnMxZlpaMHhkVHpNcjFIZFB0SUhzdFlocWFQRERBNVl4VUR4N0o0ZkppaXNCU0RJL0w2Ry9ibjM0R055OFEyZzA0NFpUdWxBZEZMYjB0STZOTnhmajNEekxqV2lOR3hqZTFwejdhWE9jTlY2OGxEUEVkMlNYbDZWZkJ1d21IemRmMWd4RnkxSHZBN3BEOEkyQm5ubXlHdzg1MkNnNVhiZ0lkRUVHRTVVQ3plbjVqVGxHNkpDVTVpYWpseFZjc1h2YmNTMFNBY2cxZGNlc1dKTFZLOCtoWUhPWVErUGp5K0V5VkdYUDBhUFRGYWdyVjlFMDNoQ1F2WXgrZzQ3S0dxKzFHc0xqOHVCSXlpaE53MzNZVWU4UE5DNEJPSjNMbTFBZ2xMVjNuQ3V2VWRJUCt2MTV0VkdiV0l3Z3hMVnBQa2ZwdGhDR3BUS0crb0EvRFFmc0tLdnhoU2NxYU42RnVFbEFVdFRLdjJVWWdPbVFlZ3NOL243bmpIVWp1OHdNNFZUY20rUTh4Zlg5U0Z3alR6ZFZxdTk1VU9XU0lHT2FiSDhPR0JFYmEvLzhZeGwzR2NQZFAvZE1CT29TWC8wejVTWm1Cb0xiYVBzKzlhc2FNcGIzNnlrbkthdzZGcVdaYTZBNXZEYTAybWhrT2JhMXE2S3RMVjIwOHhya3dtVzVDNFZENm4yZnZSakFEeTJxRFlZbk55K0gxMEZxMExNYk56Uzg2M2drTzdpUThlQzQ4L055NW01OXRPY0VzbzN1N1FnM3lycURMNmVLWHdKQXVXbmh5bGZiV3JST2JlNjZyelg1OStYRHR6dXNuTDY2ZEkvODZBcm10TGx6RUQ4NjBFZjNiRlBWNzhPWC96RlRBMTFmY0JuMlZudGI3cWlHQlNnTEJIeXV2L3VFYXFxb1RnU3BPeWpsemg4Nm1lMVZyaXY3aTlyTFBMdnRnaFdtU25ibFJiQXNCSkwvNGRTY1NRVEJ4T2l2SE1PNVF2QkJZMGloZUp2ZndXTHhMT0d6WUtaeU00elZjMkNsbDQ2ekVwZVVWNE1xR0VXWmoyMlNkT3hoR0FqZ3M5QUVuZlQrUm9pTWZjRGIwR1M1Tm5jS1Z4anU0TnQvbVJrMTNPOUd6M0ZMY3Q1b0NENndrd1VOckNmSElVZzZTTWY4THdRR3lWYUJVcXBMUFc1QmFNcFJzaEVwbDhuUzFxdzVkZ256bGlrOFFCWG1keTVVcklINzRoZVRLWktNU2lsUXNvNGhzUmlHcmFRWlJ6eHBOR3FsRUpNc1h1QVU3R2xjUjhtV1N5a1VwVmtXR3lJZjBhOHY0cUVRcDVDdEdzTWlaYSs0RVNZUXkrV2lsQ2lndUh6eE1YTzU0b2dTaG9vVFYyYmoyejF6TDZEWVNvSW1vUThsRlVXeE1MQk5RUWdMa1YydEhZZ1VvSWJrdVJFeitmSkhLeHhXQmNudnUzS1FwcEZDeExrZ3VCMU55VlNwL1RrblJ2TndZbENkYmJsV3UzemU2b3dIZFdsdWhFNXRnUTZlajJTVjY1Q2lqaWpvYVJmU2lINE5xejFPcGZFVytXZUkvb1UwbHk2MHprVjlZek9RU1l0WlZFR1ltcnlzVFpBSmtZNHFadElCRDkvTFlUSUs3Tnd3M3ZNaVlCd0E9KSBmb3JtYXQoIndvZmYyLXZhcmlhdGlvbnMiKTt1bmljb2RlLXJhbmdlOlUrMDQ2MC0wNTJGLFUrMUM4MC0xQzhBLFUrMjBCNCxVKzJERTAtMkRGRixVK0E2NDAtQTY5RixVK0ZFMkUtRkUyRn1AZm9udC1mYWNle2ZvbnQtZmFtaWx5Ok1hbnJvcGUgVmFyaWFibGU7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC1kaXNwbGF5OnN3YXA7Zm9udC13ZWlnaHQ6MjAwIDgwMDtzcmM6dXJsKC9hc3NldHMvbWFucm9wZS1jeXJpbGxpYy13Z2h0LW5vcm1hbC1EdnhzaWh1dC53b2ZmMikgZm9ybWF0KCJ3b2ZmMi12YXJpYXRpb25zIik7dW5pY29kZS1yYW5nZTpVKzAzMDEsVSswNDAwLTA0NUYsVSswNDkwLTA0OTEsVSswNEIwLTA0QjEsVSsyMTE2fUBmb250LWZhY2V7Zm9udC1mYW1pbHk6TWFucm9wZSBWYXJpYWJsZTtmb250LXN0eWxlOm5vcm1hbDtmb250LWRpc3BsYXk6c3dhcDtmb250LXdlaWdodDoyMDAgODAwO3NyYzp1cmwoL2Fzc2V0cy9tYW5yb3BlLWdyZWVrLXdnaHQtbm9ybWFsLURMN1FSWnl2LndvZmYyKSBmb3JtYXQoIndvZmYyLXZhcmlhdGlvbnMiKTt1bmljb2RlLXJhbmdlOlUrMDM3MC0wMzc3LFUrMDM3QS0wMzdGLFUrMDM4NC0wMzhBLFUrMDM4QyxVKzAzOEUtMDNBMSxVKzAzQTMtMDNGRn1AZm9udC1mYWNle2ZvbnQtZmFtaWx5Ok1hbnJvcGUgVmFyaWFibGU7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC1kaXNwbGF5OnN3YXA7Zm9udC13ZWlnaHQ6MjAwIDgwMDtzcmM6dXJsKC9hc3NldHMvbWFucm9wZS12aWV0bmFtZXNlLXdnaHQtbm9ybWFsLXVzVUREUnI3LndvZmYyKSBmb3JtYXQoIndvZmYyLXZhcmlhdGlvbnMiKTt1bmljb2RlLXJhbmdlOlUrMDEwMi0wMTAzLFUrMDExMC0wMTExLFUrMDEyOC0wMTI5LFUrMDE2OC0wMTY5LFUrMDFBMC0wMUExLFUrMDFBRi0wMUIwLFUrMDMwMC0wMzAxLFUrMDMwMy0wMzA0LFUrMDMwOC0wMzA5LFUrMDMyMyxVKzAzMjksVSsxRUEwLTFFRjksVSsyMEFCfUBmb250LWZhY2V7Zm9udC1mYW1pbHk6TWFucm9wZSBWYXJpYWJsZTtmb250LXN0eWxlOm5vcm1hbDtmb250LWRpc3BsYXk6c3dhcDtmb250LXdlaWdodDoyMDAgODAwO3NyYzp1cmwoL2Fzc2V0cy9tYW5yb3BlLWxhdGluLWV4dC13Z2h0LW5vcm1hbC1DaDNZT3BOWS53b2ZmMikgZm9ybWF0KCJ3b2ZmMi12YXJpYXRpb25zIik7dW5pY29kZS1yYW5nZTpVKzAxMDAtMDJCQSxVKzAyQkQtMDJDNSxVKzAyQzctMDJDQyxVKzAyQ0UtMDJENyxVKzAyREQtMDJGRixVKzAzMDQsVSswMzA4LFUrMDMyOSxVKzFEMDAtMURCRixVKzFFMDAtMUU5RixVKzFFRjItMUVGRixVKzIwMjAsVSsyMEEwLTIwQUIsVSsyMEFELTIwQzAsVSsyMTEzLFUrMkM2MC0yQzdGLFUrQTcyMC1BN0ZGfUBmb250LWZhY2V7Zm9udC1mYW1pbHk6TWFucm9wZSBWYXJpYWJsZTtmb250LXN0eWxlOm5vcm1hbDtmb250LWRpc3BsYXk6c3dhcDtmb250LXdlaWdodDoyMDAgODAwO3NyYzp1cmwoL2Fzc2V0cy9tYW5yb3BlLWxhdGluLXdnaHQtbm9ybWFsLURISWNBSlJnLndvZmYyKSBmb3JtYXQoIndvZmYyLXZhcmlhdGlvbnMiKTt1bmljb2RlLXJhbmdlOlUrMDAwMC0wMEZGLFUrMDEzMSxVKzAxNTItMDE1MyxVKzAyQkItMDJCQyxVKzAyQzYsVSswMkRBLFUrMDJEQyxVKzAzMDQsVSswMzA4LFUrMDMyOSxVKzIwMDAtMjA2RixVKzIwQUMsVSsyMTIyLFUrMjE5MSxVKzIxOTMsVSsyMjEyLFUrMjIxNSxVK0ZFRkYsVStGRkZEfQo=\">\n  <link rel=\"stylesheet\" crossorigin href=\"data:text/css;base64,OnJvb3QsOnJvb3RbZGF0YS10aGVtZT1saWdodF17LS1iZzogI2ZmZmZmZjstLXN1cjogI2Y4ZmFmYzstLWFsdDogI2YxZjVmOTstLXRleHQ6ICMwZjE3MmE7LS1tdXQ6ICM2NDc0OGI7LS1iZDogI2U2ZTllZjstLWFjYzogIzRmNDZlNTstLWFjYy1zb2Z0OiAjZWVmMmZmOy0tYWNjLXRleHQ6ICM0ZjQ2ZTU7LS1mb250LXVpOiAiTWFucm9wZSBWYXJpYWJsZSIsICJNYW5yb3BlIiwgc2Fucy1zZXJpZn06cm9vdFtkYXRhLXRoZW1lPWRhcmtdey0tYmc6ICMwZjE3MmE7LS1zdXI6ICMxZTI5M2I7LS1hbHQ6ICMxNzIwMzM7LS10ZXh0OiAjZjFmNWY5Oy0tbXV0OiAjOTRhM2I4Oy0tYmQ6ICMyYjNhNTI7LS1hY2M6ICM4MThjZjg7LS1hY2Mtc29mdDogIzI0MWY0ZDstLWFjYy10ZXh0OiAjYTViNGZjfUBtZWRpYShwcmVmZXJzLWNvbG9yLXNjaGVtZTpkYXJrKXs6cm9vdDpub3QoW2RhdGEtdGhlbWVdKXstLWJnOiAjMGYxNzJhOy0tc3VyOiAjMWUyOTNiOy0tYWx0OiAjMTcyMDMzOy0tdGV4dDogI2YxZjVmOTstLW11dDogIzk0YTNiODstLWJkOiAjMmIzYTUyOy0tYWNjOiAjODE4Y2Y4Oy0tYWNjLXNvZnQ6ICMyNDFmNGQ7LS1hY2MtdGV4dDogI2E1YjRmY319Kntib3gtc2l6aW5nOmJvcmRlci1ib3h9Ym9keXttYXJnaW46MDtmb250LWZhbWlseTp2YXIoLS1mb250LXVpKTtiYWNrZ3JvdW5kOnJhZGlhbC1ncmFkaWVudCgxMjAlIDgwJSBhdCA1MCUgMCUsdmFyKC0tc3VyKSAwJSx2YXIoLS1iZykgMTAwJSk7Y29sb3I6dmFyKC0tdGV4dCk7bWluLWhlaWdodDoxMDB2aH0ucGFnZXttYXgtd2lkdGg6NTYwcHg7bWFyZ2luOjAgYXV0bztwYWRkaW5nOjQ4cHggMjRweH0ucGFnZS1oZWFke2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjEycHg7bWFyZ2luLWJvdHRvbToyNHB4fS5sb2dve3dpZHRoOjM4cHg7aGVpZ2h0OjM4cHg7Ym9yZGVyLXJhZGl1czoxMXB4O2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZyx2YXIoLS1hY2MpLHZhcigtLWFjYy10ZXh0KSk7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2JveC1zaGFkb3c6MCA2cHggMThweCAjNGY0NmU1NTJ9aDF7bWFyZ2luOjA7Zm9udC1zaXplOjIycHg7Zm9udC13ZWlnaHQ6ODAwO2xldHRlci1zcGFjaW5nOi0uMDJlbX0ucGFnZS1zdWJ7Zm9udC13ZWlnaHQ6NjAwO2ZvbnQtc2l6ZToxNXB4O2NvbG9yOnZhcigtLW11dCk7bWFyZ2luLWxlZnQ6NnB4fS5jYXJke2JhY2tncm91bmQ6dmFyKC0tYmcpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYmQpO2JvcmRlci1yYWRpdXM6MTRweDtwYWRkaW5nOjZweCAxOHB4O21hcmdpbi1ib3R0b206MTZweH0ucm93e2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47Z2FwOjE2cHg7cGFkZGluZzoxNnB4IDB9LnJvdysucm93e2JvcmRlci10b3A6MXB4IHNvbGlkIHZhcigtLWJkKX0ucm93LXRpdGxle2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjcwMH0ucm93LXN1Yntmb250LXNpemU6MTIuNXB4O2NvbG9yOnZhcigtLW11dCk7bWFyZ2luLXRvcDozcHg7bGluZS1oZWlnaHQ6MS41fS5yb3ctYWN0aW9uc3tkaXNwbGF5OmZsZXg7Z2FwOjhweDtmbGV4LXNocmluazowfWtiZHtmb250LWZhbWlseTppbmhlcml0O2ZvbnQtd2VpZ2h0OjcwMDtiYWNrZ3JvdW5kOnZhcigtLWFsdCk7Ym9yZGVyOjFweCBzb2xpZCB2YXIoLS1iZCk7Ym9yZGVyLXJhZGl1czo2cHg7cGFkZGluZzoxcHggNnB4O2ZvbnQtc2l6ZToxMS41cHh9LmJ0bntwYWRkaW5nOjhweCAxNHB4O2JvcmRlci1yYWRpdXM6OXB4O2JvcmRlcjoxcHggc29saWQgdmFyKC0tYmQpO2JhY2tncm91bmQ6dmFyKC0tYmcpO2NvbG9yOnZhcigtLXRleHQpO2ZvbnQtc2l6ZToxMi41cHg7Zm9udC13ZWlnaHQ6NzAwO2N1cnNvcjpwb2ludGVyO2ZvbnQtZmFtaWx5OnZhcigtLWZvbnQtdWkpO3doaXRlLXNwYWNlOm5vd3JhcH0uYnRuOmhvdmVye2JvcmRlci1jb2xvcjp2YXIoLS1hY2MpO2NvbG9yOnZhcigtLWFjYy10ZXh0KX0uYnRuLWFjY2VudHtiYWNrZ3JvdW5kOnZhcigtLWFjYyk7Ym9yZGVyLWNvbG9yOnZhcigtLWFjYyk7Y29sb3I6I2ZmZn0uYnRuLWFjY2VudDpob3Zlcntjb2xvcjojZmZmO29wYWNpdHk6LjkyfS50aGVtZS1zZWd7ZGlzcGxheTpmbGV4O2dhcDozcHg7YmFja2dyb3VuZDp2YXIoLS1hbHQpO3BhZGRpbmc6M3B4O2JvcmRlci1yYWRpdXM6OXB4O2ZsZXgtc2hyaW5rOjB9LnRoZW1lLW9wdHtwYWRkaW5nOjZweCAxNHB4O2ZvbnQtc2l6ZToxMi41cHg7Zm9udC13ZWlnaHQ6NzAwO2JvcmRlcjpub25lO2N1cnNvcjpwb2ludGVyO2JvcmRlci1yYWRpdXM6N3B4O2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7Y29sb3I6dmFyKC0tbXV0KTtmb250LWZhbWlseTp2YXIoLS1mb250LXVpKTt3aGl0ZS1zcGFjZTpub3dyYXB9LnRoZW1lLW9wdC5hY3RpdmV7YmFja2dyb3VuZDp2YXIoLS1iZyk7Y29sb3I6dmFyKC0tYWNjLXRleHQpO2JveC1zaGFkb3c6MCAxcHggM3B4ICMwMDAwMDAyNH0uc3dpdGNoe2FwcGVhcmFuY2U6bm9uZTt3aWR0aDo0MHB4O2hlaWdodDoyMnB4O2JvcmRlci1yYWRpdXM6OTlweDtiYWNrZ3JvdW5kOnZhcigtLWFsdCk7Ym9yZGVyOjFweCBzb2xpZCB2YXIoLS1iZCk7cG9zaXRpb246cmVsYXRpdmU7Y3Vyc29yOnBvaW50ZXI7ZmxleC1zaHJpbms6MDt0cmFuc2l0aW9uOmJhY2tncm91bmQgLjE1czttYXJnaW46MH0uc3dpdGNoOmFmdGVye2NvbnRlbnQ6IiI7cG9zaXRpb246YWJzb2x1dGU7dG9wOjJweDtsZWZ0OjJweDt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O2JvcmRlci1yYWRpdXM6OTlweDtiYWNrZ3JvdW5kOiNmZmY7Ym94LXNoYWRvdzowIDFweCAzcHggIzAwMDAwMDQwO3RyYW5zaXRpb246dHJhbnNmb3JtIC4xNXN9LnN3aXRjaDpjaGVja2Vke2JhY2tncm91bmQ6dmFyKC0tYWNjKTtib3JkZXItY29sb3I6dmFyKC0tYWNjKX0uc3dpdGNoOmNoZWNrZWQ6YWZ0ZXJ7dHJhbnNmb3JtOnRyYW5zbGF0ZSgxOHB4KX0ucmF0aW5nLW1vZGFsey0tc3VyZmFjZTogdmFyKC0tYmcpOy0tYm9yZGVyOiB2YXIoLS1iZCk7LS1mb250LXNhbnM6IHZhcigtLWZvbnQtdWkpOy0tdGV4dC1tdXRlZDogdmFyKC0tbXV0KTstLXRleHQtc3VidGxlOiB2YXIoLS1tdXQpOy0taW5rLTMwMDogdmFyKC0tYmQpfQo=\">\n</head>\n<body>\n  <div class=\"page\">\n\n    <header class=\"page-head\">\n      <div class=\"logo\">\n        <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"16 18 22 12 16 6\"></polyline><polyline points=\"8 6 2 12 8 18\"></polyline></svg>\n      </div>\n      <h1>XPath Tester <span class=\"page-sub\">Settings</span></h1>\n    </header>\n\n    <section class=\"card\">\n      <div class=\"row\">\n        <div class=\"row-text\">\n          <div class=\"row-title\">Theme</div>\n          <div class=\"row-sub\">Choose light, dark, or follow your system.</div>\n        </div>\n        <div class=\"theme-seg\" id=\"theme-seg\">\n          <button type=\"button\" class=\"theme-opt\" data-theme=\"system\">System</button>\n          <button type=\"button\" class=\"theme-opt\" data-theme=\"light\">Light</button>\n          <button type=\"button\" class=\"theme-opt\" data-theme=\"dark\">Dark</button>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"row-text\">\n          <div class=\"row-title\">Floating button on pages</div>\n          <div class=\"row-sub\">Show a small draggable button on the right edge of every page that opens the panel.</div>\n        </div>\n        <input type=\"checkbox\" id=\"floating-toggle\" class=\"switch\" />\n      </div>\n      <div class=\"row\">\n        <div class=\"row-text\">\n          <div class=\"row-title\">Pin panel to one tab</div>\n          <div class=\"row-sub\">Close the panel automatically when you switch to another tab. Reopen it anywhere with the toolbar icon.</div>\n        </div>\n        <input type=\"checkbox\" id=\"pin-toggle\" class=\"switch\" />\n      </div>\n      <div class=\"row\">\n        <div class=\"row-text\">\n          <div class=\"row-title\">Keyboard shortcut</div>\n          <div class=\"row-sub\">Open the panel with <kbd id=\"hotkey\">Ctrl+Shift+X</kbd></div>\n        </div>\n        <button id=\"change-shortcut\" class=\"btn\">Change…</button>\n      </div>\n    </section>\n\n    <section class=\"card\">\n      <div class=\"row\">\n        <div class=\"row-text\">\n          <div class=\"row-title\">Enjoying XPath Tester?</div>\n          <div class=\"row-sub\">A quick rating helps a lot. Found a problem? Tell us first.</div>\n        </div>\n        <div class=\"row-actions\">\n          <button id=\"rate-link\" class=\"btn btn-accent\">★ Rate us</button>\n          <button id=\"feedback-link\" class=\"btn\">Send feedback</button>\n        </div>\n      </div>\n    </section>\n\n  </div>\n\n  <!-- Rating prompt modal — controlled by /vendor/rating/rating.js -->\n  <div id=\"ratingModal\" class=\"rating-modal hidden\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Rate this app\">\n    <div class=\"rating-modal__overlay\"></div>\n    <div class=\"rating-modal__card\">\n      <button type=\"button\" class=\"rating-modal__close\" aria-label=\"Close\">✕</button>\n      <div class=\"rating-modal__emoji\" aria-hidden=\"true\">🥺</div>\n      <h2 class=\"rating-modal__title\">Happy with our app?</h2>\n      <p class=\"rating-modal__subtitle\">A quick rating would mean the world to us!</p>\n      <div class=\"rating-modal__stars\">\n        <button type=\"button\" class=\"rating-modal__star\" data-stars=\"1\" aria-label=\"Rate 1 of 5\"><svg class=\"svg-icon\" width=\"30\" height=\"30\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"></polygon></svg></button>\n        <button type=\"button\" class=\"rating-modal__star\" data-stars=\"2\" aria-label=\"Rate 2 of 5\"><svg class=\"svg-icon\" width=\"30\" height=\"30\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"></polygon></svg></button>\n        <button type=\"button\" class=\"rating-modal__star\" data-stars=\"3\" aria-label=\"Rate 3 of 5\"><svg class=\"svg-icon\" width=\"30\" height=\"30\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"></polygon></svg></button>\n        <button type=\"button\" class=\"rating-modal__star\" data-stars=\"4\" aria-label=\"Rate 4 of 5\"><svg class=\"svg-icon\" width=\"30\" height=\"30\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"></polygon></svg></button>\n        <button type=\"button\" class=\"rating-modal__star\" data-stars=\"5\" aria-label=\"Rate 5 of 5\"><svg class=\"svg-icon\" width=\"30\" height=\"30\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"></polygon></svg></button>\n      </div>\n      <button type=\"button\" class=\"rating-modal__dismiss\">No, thank you</button>\n    </div>\n  </div>\n</body>\n</html>\n",
			  "icons/32.png": "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACyklEQVR42sXXW08aQRQH8PkQrd+oLyXY6q7W+w0UBBfFGyhYq1LSWlJtTRqN6Wsba6xt+lwF7KvaL6EryHVv3MyezoBgBdEl2exOcp7Y5PffmZ1DDkL/rZYnbBNlOPNRRvaUaj4X2p6x0P78Al60XEBHKy4qAp10BLraItDdHoGejij0dEahtysKfd2X0N+Dq/cSBvpiMNgfg6GBGJgGcQ3FBbM5djI8HF+xWvkmdNdqMbBt1NMzjjayQDezoCIOZnMcMA4jIwkYsSQ4iyVG1+KGM1kDHCzWBFhHE7LNlqRvtl2bN7/GkzBqK1aaYbjHiJy51rjNjmssCXYmuYxo4/lfffAU2B2pE0QZz3k98DEHrvEUh/TCmQlczjQgPXHHJA6gJz4+hQM0ggfepUEQZPj6RajBd3ZEEEUZPnzkFeMT0yRAA3g+LwNZu9/Emjff25OKv5FnNjZ4RbhzhgOkCF+9wUPBDJhNtduOuxscHGaLzxSuAD5tCg/izlkcQA28fObkrQ+DpRBXOMTmlnAvPunCAdTCy2eOuxsEQ7lKiK1tsS4+5eYB1cPnXMkKfvBbGV4+c2Y8BeGjUoh8AcD/lr8Tn54jAepctXn37QAEVnrVHM6qAKv8nfiMBwe4756/D6QhlyuFCIezYLEow0PhEl7A+PZnsS4+4xUAPdRk1ta4yk6Ej7LFr10tfHYBB1DS4dbX+UqIoz+5EqwC7npJAihsr6TDlUPs70s1Tebnr0zlzDe3leHuRRygkd5OOhxpt7u461U3me8/MiBKckO4+5UISM0/lnpXrR4+t4QD6InPL+MAeuKeFYkEiHN64R6fmEYmU+xUD9zrIwGkE0TGJT1w72tc/swSIrNacVzSGF/wS6nFAPeoOB2RWY2MSxri8uIbsfXWfEhmNTIuafLm1Xh5kVmNjEtjTOoY47yKXzuP8WNy5pVtv17/AP+s82RGGiCMAAAAAElFTkSuQmCC",
			  "assets/chunk-LMRTC14r.js": "const t=\"xpt-highlight\",o=\"xpt-blink\",a=\"sidepanel\",c=\"xpt-floating-button\",n=300,_=500,e=300,E=2500,T=50,p=1300,L=20,s=\"https://chromewebstore.google.com/detail/xpath-tester/lleffifhlcaijinkocppghpgbnioechc/\",S=`${s}reviews`,h=\"https://forms.gle/G1JzHp9iQtqvYwq8A\",i=\"https://chrome-ext.tilda.ws/xpathtester\";export{o as B,p as C,e as E,h as F,L as H,n as M,a as P,S as R,s as S,i as W,c as a,t as b,_ as c,T as d,E as e};\n",
			  "assets/chunk-DAty6zmU.js": "import{H as g,b as T,B as p,M as L,c as N,a as w}from\"./chunk-LMRTC14r.js\";const u=new Set;let c=0;async function m(n){c+=1;const t=c,e=new Set(n),s=[];for(const i of u)e.has(i)||s.push({el:i,add:!1});for(const i of e)u.has(i)||s.push({el:i,add:!0});for(let i=0;i<s.length;i+=g){if(t!==c)return;const r=s.slice(i,i+g);await new Promise(o=>requestAnimationFrame(()=>{if(t===c)for(const{el:a,add:l}of r)a.classList.toggle(T,l),l?u.add(a):u.delete(a);o()}))}}function f(){return m([])}function h(n){return n.includes(\"'\")?n.includes('\"')?`concat(${n.split(\"'\").map(e=>`'${e}'`).join(`, \"'\", `)})`:`\"${n}\"`:`'${n}'`}function E(n,t){if(n.tagName!==t.tagName)return!1;const e=n.getAttribute(\"class\");if(e&&e.trim()&&e!==t.getAttribute(\"class\"))return!1;const s=n.getAttribute(\"id\");return!(s&&s!==t.getAttribute(\"id\"))}function _(n){let t=1;for(let e=n.previousElementSibling;e;e=e.previousElementSibling)E(n,e)&&(t+=1);if(t>1)return t;for(let e=n.nextElementSibling;e;e=e.nextElementSibling)if(E(n,e))return 1;return 0}function x(n){let t=\"\",e=n;for(;e;){const s=e.tagName.toLowerCase(),i=e.getAttribute(\"id\");if(i)return`//${s}[@id=${h(i)}]${t}`;let r=s;const o=e.getAttribute(\"class\");o&&o.trim()&&(r+=`[@class=${h(o)}]`);const a=_(e);a>=1&&(r+=`[${a}]`),t===\"\"&&s===\"img\"&&(r+=\"/@src\"),t=`/${r}${t}`,e=e.parentElement}return t}function k(n){let t=1;for(let e=n.previousElementSibling;e;e=e.previousElementSibling)e.tagName===n.tagName&&(t+=1);if(t>1)return t;for(let e=n.nextElementSibling;e;e=e.nextElementSibling)if(e.tagName===n.tagName)return 1;return 0}function v(n){let t=\"\",e=n;for(;e;){const s=e.tagName.toLowerCase(),i=k(e);t=`/${s}${i>=1?`[${i}]`:\"\"}${t}`,e=e.parentElement}return t}let d=[];function b(){return d.filter(n=>n!==null)}function S(n){if(d=[],!n.trim())return{kind:\"empty\"};let t;try{t=document.evaluate(n,document,null,XPathResult.ANY_TYPE,null)}catch(i){return{kind:\"invalid\",error:i instanceof Error?i.message:String(i)}}switch(t.resultType){case XPathResult.BOOLEAN_TYPE:return{kind:\"scalar\",value:String(t.booleanValue)};case XPathResult.NUMBER_TYPE:return{kind:\"scalar\",value:String(t.numberValue)};case XPathResult.STRING_TYPE:return{kind:\"scalar\",value:t.stringValue}}const e=[];let s=0;try{let i=t.iterateNext();for(;i;){if(s+=1,s<=L){d.push(i.nodeType===Node.ELEMENT_NODE?i:null);const r=(i.textContent??\"\").trim();e.push({text:r.slice(0,N)})}i=t.iterateNext()}}catch(i){if(s===0)return{kind:\"invalid\",error:i instanceof Error?i.message:String(i)}}return s===0?{kind:\"empty\"}:{kind:\"nodes\",count:s,items:e}}function A(n){const t=d[n];!t||!t.isConnected||(t.scrollIntoView({behavior:\"smooth\",block:\"center\"}),t.classList.add(p),setTimeout(()=>t.classList.remove(p),2400))}window.__xptContentLoaded||(window.__xptContentLoaded=!0,$());function $(){let n=!1,t=null,e=null;async function s(r){if(r===e)return;e=r;const o=x(r),a=v(r),l=S(o);m(b());const y={type:\"capture\",relXPath:o,absXPath:a,result:l};try{(await chrome.runtime.sendMessage(y))?.delivered||(n=!1,e=null,f())}catch{}}function i(r){return r instanceof Element&&!r.closest(`#${w}`)}document.addEventListener(\"mousemove\",r=>{i(r.target)&&(t=r.target,n&&r.shiftKey&&!r.ctrlKey&&!r.metaKey&&!r.altKey&&s(r.target))},{capture:!0,passive:!0}),document.addEventListener(\"keydown\",r=>{r.key!==\"Shift\"||r.ctrlKey||r.metaKey||r.altKey||!n||!t||!t.isConnected||s(t)},!0),chrome.runtime.onMessage.addListener((r,o,a)=>{switch(r.type){case\"sidepanelOpened\":n=!0;break;case\"sidepanelClosed\":n=!1,e=null,f();break;case\"evaluate\":{const l=S(r.xpath);m(b()),a(l);break}case\"goTo\":A(r.index);break;case\"clearHighlights\":e=null,f();break}return!1}),(async()=>{try{n=!!(await chrome.runtime.sendMessage({type:\"getSidepanelState\"}))?.open}catch{}})()}\n",
			  "assets/chunk-ByD5DWVL.js": "const a={xpathMode:\"relative\",theme:null,onboardingCompleted:!1,pinned:!0,history:[],saved:[]};async function e(){const t=await chrome.storage.local.get(Object.keys(a));return{...a,...t}}async function n(t){await chrome.storage.local.set(t)}async function o(){const{floatingButtonEnabled:t=!1}=await chrome.storage.sync.get(\"floatingButtonEnabled\");return!!t}async function s(t){await chrome.storage.sync.set({floatingButtonEnabled:t})}export{e as a,s as b,o as g,n as s};\n",
			  "assets/chunk-bEZxTbmp.js": "import{a as h}from\"./chunk-LMRTC14r.js\";import{g as y}from\"./chunk-ByD5DWVL.js\";window.__xptFloatingLoaded||(window.__xptFloatingLoaded=!0,x());const i=\"buttonPositions\";function x(){let n=null;function r(){if(n||!document.body)return;n=document.createElement(\"button\"),n.id=h,n.title=\"Open XPath Tester\";const t=n.style;t.position=\"fixed\",t.right=\"0\",t.top=\"40%\",u(n),t.zIndex=\"2147483646\",t.width=\"36px\",t.height=\"36px\",t.padding=\"6px\",t.border=\"none\",t.borderRadius=\"8px 0 0 8px\",t.background=\"linear-gradient(135deg, #4f46e5, #818cf8)\",t.boxShadow=\"0 2px 10px rgba(79, 70, 229, 0.4)\",t.cursor=\"pointer\",t.display=\"flex\",t.alignItems=\"center\",t.justifyContent=\"center\";const e=document.createElement(\"img\");e.src=chrome.runtime.getURL(\"icons/32.png\"),e.alt=\"XPath Tester\",e.style.width=\"22px\",e.style.height=\"22px\",e.style.pointerEvents=\"none\",n.appendChild(e),g(n),document.body.appendChild(n)}function l(){n?.remove(),n=null}async function u(t){try{const o=(await chrome.storage.local.get(i))[i]?.[location.origin];typeof o==\"number\"&&Number.isFinite(o)&&t.isConnected&&(t.style.top=`${o}px`)}catch{}}async function p(t){try{const o={...(await chrome.storage.local.get(i))[i]??{},[location.origin]:t};await chrome.storage.local.set({[i]:o})}catch{}}function g(t){let e=!1,o=!1,s=0,d=0;t.addEventListener(\"mousedown\",a=>{e=!0,o=!1,s=a.clientY,d=t.getBoundingClientRect().top,a.preventDefault()}),document.addEventListener(\"mousemove\",a=>{if(!e)return;const c=a.clientY-s;Math.abs(c)>4&&(o=!0);const m=window.innerHeight-t.offsetHeight,f=Math.min(Math.max(d+c,0),Math.max(m,0));t.style.top=`${f}px`}),document.addEventListener(\"mouseup\",()=>{if(e){if(e=!1,o){p(t.getBoundingClientRect().top);return}chrome.runtime.sendMessage({type:\"openPanel\"}).catch(()=>{})}})}chrome.storage.onChanged.addListener((t,e)=>{e!==\"sync\"||!(\"floatingButtonEnabled\"in t)||(t.floatingButtonEnabled.newValue?r():l())}),(async()=>{try{await y()&&r()}catch{}})()}\n"
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
		      "xpath-tester",
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
	  const scriptName = "XPath Tester";
	  const debug = "[XPath Tester]";
	  _log(debug + ' Executing background scripts...');
	
	  function executeBackgroundScripts(){
	    with(backgroundPolyfill){
	      // BG: service-worker-loader.js
	import './assets/chunk-B7TbDywo.js';
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
	const INJECTED_MANIFEST = {"manifest_version":3,"name":"XPath Tester","version":"1.0.1","description":"Use XPath Tester to build & check xpath expressions, css selectors, selenium xpath — instant selector finder and helper.","permissions":["sidePanel","storage","scripting"],"optional_permissions":[],"content_scripts":[{"js":["assets/main.ts-loader-FVkrXO-s.js","assets/floating-button.ts-loader-BAOVMx5T.js"],"css":["src/content/highlight.css"],"matches":["http://*/*","https://*/*"],"run_at":"document_idle"}],"options_ui":{"page":"src/options/index.html","open_in_tab":true},"browser_action":{},"page_action":{},"action":{"default_title":"Open XPath Tester","default_icon":{"16":"icons/16.png","32":"icons/32.png","48":"icons/48.png","128":"icons/128.png"}},"icons":{"16":"icons/16.png","32":"icons/32.png","48":"icons/48.png","128":"icons/128.png"},"web_accessible_resources":[{"matches":["http://*/*","https://*/*"],"resources":["icons/32.png","assets/chunk-LMRTC14r.js","assets/chunk-DAty6zmU.js","assets/chunk-ByD5DWVL.js","assets/chunk-bEZxTbmp.js"],"use_dynamic_url":false}],"background":{"service_worker":"service-worker-loader.js","type":"module"},"_id":"xpath-tester"};
	const CONTENT_SCRIPT_CONFIGS_FOR_MATCHING = [
	  {
	    "matches": [
	      "http://*/*",
	      "https://*/*"
	    ]
	  }
	];
	const OPTIONS_PAGE_PATH = "src/options/index.html";
	const POPUP_PAGE_PATH = null;
	const EXTENSION_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADx0lEQVR42tWa61LaUBSF8yzttD9b+xRVvIN4v4uCCuIVUUQwEPBWO30MW2ttX8LxPSAqEJJwbWeQ3bOj0IqgETLIOTNryI8wfCuzzz47s2CYCsuoCzXp23jO0M5f9LTxvLGdzxk7L6G38wp6u66gr5tIfwX9KMM1DPQQGa9hENV7DUN9ERjuv9XIANFgBEYHozA6FIWxYaKRKIyjRmMwMUY0HoNJ1EQMpiZjuckJgTdNChcmk+A3m+PvGbWrqyX0Vt/KnxnaLqGn/VbGDqK6wQuKTFNEJgGmp1FxmJkRTs1m+c2j8N06vlnfGpYaD57IHAezJZ6wWOIdFeAvW/W6cK6B4RVZZuM5i0VoKVM2Ybnx4UWYnVMk2WzS66IBg47/SRE8zM2j4t9v4ZtDH6iDt4owb4vnrVbSnbBV0gePkvCTZZQ+TyG8dYEYsIvnjKGNv6IR3mqXwLYohZn6nrCawhOJOYZeeAkWlmRgaIZfWEYDFMPb0QDN8PYVNKABvMctQTRyo8jpECvCu1zkvuiNIj8n1wy/uEoM1Ay/LUEqlYfCOj5OV3zyJyeZ4n34nUAgURP84lqCGNAQHq83N6SKZbPlfnh/IJioGn4JDVQLv70lQTL5DyadzoPPJz9Z836/fM9EJpOHvYNEVfBLDjRQR/hCzXOkdEpN7B8knw2/vE4M1Bu+UPNYOqUmDj4lnwW/7EQDLwBfqPngbhkTR0nV8CvOJDC1bFh2R665z+/tJ5UH8f9D2T9KqYJf2SAG1B5SkUhOc/hCze8f3jcRi92ogl/dvDOg5oQtZ0CrE7acATXwigG148GOp0wJsbLm8Hh9+DmlCn7NhQaeMdt4vQ83McclqobfJa2zdBMffVEP79hKAfPcwWynjAlsiS8B73CjgSqmSpa9X05p8uNBYqLe8OtooNqRGPt/KcTuXqKu8OvbaKCGeZ4LyA82ttcrV4RnyX6pZcOWwjs9xECtLyOBkrnm9Eem4mB29iurKbzTmyYGNHiTwk2MvRvlJa210lTJBpIQE24UHWgAv4EGXuI1UO0h9RT8xg4aoBh+kyUGaIbf9KEBiuFdvgwwGKjRCu/ypXOMkgbSCO/PwBaXCTF3USaN8KhzZmpK8FEKD24u7WVMJrGJUvi8h/vzTsnJMESmCj5APoPZr8WUEhNwAi5RBC96gtlX97Jis1nQYYjc6PBEOU8g21w2rbfMSx+JCbGB4RPu4O/2R/8vgQk4hsiYwzbShnUHs98elM1jC0Pk+QXRh1EmpoEYqNXzhCUGwtjnCTxb7DZl1l+4iYrgmF8CjQAAAABJRU5ErkJggg==";
	const extensionCssData = {    "src/content/highlight.css": "/* Highlight for elements matched by the current XPath expression. */\n.xpt-highlight {\n  background: linear-gradient(135deg, rgba(79, 70, 229, 0.18), rgba(129, 140, 248, 0.22)) !important;\n  border-radius: 4px !important;\n  box-shadow:\n    0 0 0 2px rgba(79, 70, 229, 0.65),\n    0 0 12px rgba(79, 70, 229, 0.4) !important;\n  animation: xpt-highlight-pulse 2s ease-in-out infinite alternate !important;\n}\n\n@keyframes xpt-highlight-pulse {\n  from {\n    box-shadow:\n      0 0 0 2px rgba(79, 70, 229, 0.65),\n      0 0 10px rgba(79, 70, 229, 0.3);\n  }\n  to {\n    box-shadow:\n      0 0 0 3px rgba(79, 70, 229, 0.9),\n      0 0 18px rgba(79, 70, 229, 0.55);\n  }\n}\n\n/* Blink when jumping to a match from the results list. */\n.xpt-blink {\n  animation: xpt-navigate-blink 0.8s ease-in-out 3 !important;\n}\n\n@keyframes xpt-navigate-blink {\n  0%,\n  100% {\n    outline: 3px solid rgba(79, 70, 229, 0);\n    outline-offset: 2px;\n  }\n  50% {\n    outline: 3px solid rgba(79, 70, 229, 1);\n    outline-offset: 2px;\n  }\n}\n"};
	
	const LOCALE_KEYS = {"appName":{"message":"XPath Tester"},"shortDesc":{"message":"Use XPath Tester to build & check xpath expressions, css selectors, selenium xpath — instant selector finder and helper."},"storeDesc":{"message":"🔎 XPath Tester: write, test and debug element locators in a live side panel\n\nXPath Tester is a fast, no-fuss xpath helper that lives in your browser side panel. Type an expression, watch every match highlight on the page in real time, then copy it or convert it to a css selector in one click — no DevTools console needed.\n\n🚀 Quick start\n\n1. Open the side panel from the toolbar.\n2. Hold Shift and hover any element to capture its path automatically.\n3. Edit the expression and watch matches highlight instantly.\n4. Copy the result, or convert your locator to a css selector in a click.\n\n⚡ Capture any element in one move\n\nStop hand-writing brittle locators. Shift + hover turns the tool into an instant xpath generator that reads the element right under your cursor.\n\n➤ Auto-capture — hover to grab a working locator\n➤ Toggle between Relative and Absolute paths in one click\n➤ Fine-tune the generated path until it matches exactly what you need\n\n🎯 See every match, with its text\n\nRun a query and every matching node lights up on the page and is listed in the panel with its text — so it doubles as an xpath for text workflow.\n\n🔹 A live xpath finder highlights all matches as you type\n🔹 Each result shows its inner text — pull content straight from the DOM\n🔹 Click any result to scroll straight to that node\n🔹 An instant match count tells you how tight your expression is\n\n📋 Copy and convert in one click\n\n◆ Copy the path, or copy any matched text on its own\n◆ Copy all results at once for bulk extraction\n◆ Convert any locator to an equivalent css selector — a built-in css tester\n◆ Prefer css selectors? Switch over when they read cleaner than a path\n\n⭐ History and Saved keep your work\n\nEvery expression you run is kept under History, and the ones you reuse get starred into Saved — so the locators you rely on are always one tap away.\n\n🌗 Light and dark themes\n\nA clean, modern interface with light and dark modes, so long debugging sessions stay easy on the eyes.\n\n🔟 Why pick XPath Tester\n\n1️⃣ Live highlighting shows exactly what your selector matches\n2️⃣ One-move capture with a built-in xpath generator\n3️⃣ Relative and Absolute paths, switchable in an instant\n4️⃣ Convert any path to css selectors for cross-tool use\n5️⃣ An xpath finder, css tester and xpath helper rolled into one\n6️⃣ History and Saved for every xpath expression you write\n7️⃣ Works offline — no account, and nothing leaves your browser\n\n🧪 Made for testers and scrapers\n\nWhether you write selenium xpath locators, build scrapers, or run test automation, this xpath tester drops straight into your stack.\n\n▸ Test automation — validate selenium xpath, Playwright and Cypress locators before you ship\n▸ Web scraping — craft a query that survives layout changes\n▸ QA and debugging — confirm a selector or path hits the right node\n▸ Learning — watch how an expression behaves on a real page\n\n🧩 One tool, many jobs\n\nXPath Tester replaces a stack of half-working bookmarklets and console snippets — an xpath tester, a generator and a css tester in a single panel, right next to the page you are debugging.\n\n- Build a locator by hand, or capture one with Shift + hover\n- Check a path and a css selector side by side\n- Copy clean results straight into Selenium, Playwright or Cypress\n- Keep your go-to queries in Saved for the next session\n\n❓ FAQ\n\n📌 What is XPath Tester?\n💡 It is an xpath tester that lets you write, run and debug locators live in a side panel, with instant match highlighting.\n\n📌 Can it generate paths for me?\n💡 Yes — Shift + hover works as an xpath generator, capturing a relative or absolute xpath selector for any element.\n\n📌 Does it also work as a css tester?\n💡 It does. Convert any path to css selectors, or check that a css selector matches, so it is a css tester and selector finder in one.\n\n📌 Can I write and check an xpath query?\n💡 Yes. Enter your query and every match highlights live, so you can tune the expression until the count looks right.\n\n📌 Will it help with Selenium?\n💡 Definitely. Validate selenium xpath and css locators against the live page before they go into your test code.\n\n📌 Can I switch to CSS selectors?\n💡 Yes. Convert any locator to css selectors instantly, so you can keep a css selector and a path for the same element side by side.\n\n📌 Is my data private?\n💡 Completely. The tool runs fully offline — no account, no tracking, and nothing ever leaves your browser.\n\n🚀 Install XPath Tester and turn messy locator guesswork into clean, reliable expressions today."}};
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
		  const scriptName = "XPath Tester";
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
			    
			        const cssKey_0 = "src/content/highlight.css";
			    try {
			      if (extensionCssData[cssKey_0]) {
			        _log(`  Injecting CSS (idle): ${cssKey_0}`);
			        const style = document.createElement('style');
			        style.textContent = extensionCssData[cssKey_0];
			        (document.head || document.documentElement).appendChild(style);
			      } else { console.warn(`  CSS not found (idle): ${cssKey_0}`); }
			    } catch(e) { _error(`  Failed injecting CSS (${cssKey_0}) in phase idle`, e, extensionCssData); }
			  
			    const scriptPaths = ["assets/main.ts-loader-FVkrXO-s.js","assets/floating-button.ts-loader-BAOVMx5T.js"];
			   _log(`  Executing JS (idle): ${scriptPaths}`);
			
			   try {
			       // Keep variables from being redeclared for global scope, but also make them apply to global scope. (Theoretically)
			      with (globalThis){;
			// START: assets/main.ts-loader-FVkrXO-s.js
			(function () {
			  'use strict';
			
			  const injectTime = performance.now();
			  (async () => {
			    const { onExecute } = await import(
			      /* @vite-ignore */
			      chrome.runtime.getURL("assets/chunk-DAty6zmU.js")
			    );
			    onExecute?.({ perf: { injectTime, loadTime: performance.now() - injectTime } });
			  })().catch(console.error);
			
			})();
			// END: assets/main.ts-loader-FVkrXO-s.js
			
			// START: assets/floating-button.ts-loader-BAOVMx5T.js
			(function () {
			  'use strict';
			
			  const injectTime = performance.now();
			  (async () => {
			    const { onExecute } = await import(
			      /* @vite-ignore */
			      chrome.runtime.getURL("assets/chunk-bEZxTbmp.js")
			    );
			    onExecute?.({ perf: { injectTime, loadTime: performance.now() - injectTime } });
			  })().catch(console.error);
			
			})();
			// END: assets/floating-button.ts-loader-BAOVMx5T.js
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
			  const polyfillString = "\n// -- Messaging implementation\n\nfunction createEventBus(\n  scopeId,\n  type = \"page\", // \"page\" or \"iframe\"\n  { allowedOrigin = \"*\", children = [], parentWindow = null } = {}\n) {\n  if (!scopeId) throw new Error(\"createEventBus requires a scopeId\");\n\n  const handlers = {};\n\n  function handleIncoming(ev) {\n    if (allowedOrigin !== \"*\" && ev.origin !== allowedOrigin) return;\n\n    const msg = ev.data;\n    if (!msg || msg.__eventBus !== true || msg.scopeId !== scopeId) return;\n\n    const { event, payload } = msg;\n\n    // PAGE: if it's an INIT from an iframe, adopt it\n    if (type === \"page\" && event === \"__INIT__\") {\n      const win = ev.source;\n      if (win && !children.includes(win)) {\n        children.push(win);\n      }\n      return;\n    }\n\n    (handlers[event] || []).forEach((fn) =>\n      fn(payload, { origin: ev.origin, source: ev.source })\n    );\n  }\n\n  window.addEventListener(\"message\", handleIncoming);\n\n  function emitTo(win, event, payload) {\n    const envelope = {\n      __eventBus: true,\n      scopeId,\n      event,\n      payload,\n    };\n    win.postMessage(envelope, allowedOrigin);\n  }\n\n  // IFRAME: announce to page on startup\n  if (type === \"iframe\") {\n    setTimeout(() => {\n      const pw = parentWindow || window.parent;\n      if (pw && pw.postMessage) {\n        emitTo(pw, \"__INIT__\", null);\n      }\n    }, 0);\n  }\n\n  return {\n    on(event, fn) {\n      handlers[event] = handlers[event] || [];\n      handlers[event].push(fn);\n    },\n    off(event, fn) {\n      if (!handlers[event]) return;\n      handlers[event] = handlers[event].filter((h) => h !== fn);\n    },\n    /**\n     * Emits an event.\n     * @param {string} event - The event name.\n     * @param {any} payload - The event payload.\n     * @param {object} [options] - Emission options.\n     * @param {Window} [options.to] - A specific window to target. If provided, message is ONLY sent to the target.\n     */\n    emit(event, payload, { to } = {}) {\n      // If a specific target window is provided, send only to it and DO NOT dispatch locally.\n      // This prevents a port from receiving its own messages.\n      if (to) {\n        if (to && typeof to.postMessage === \"function\") {\n          emitTo(to, event, payload);\n        }\n        return; // Exit after targeted send.\n      }\n\n      // For broadcast messages (no 'to' target), dispatch locally first.\n      (handlers[event] || []).forEach((fn) =>\n        fn(payload, { origin: location.origin, source: window })\n      );\n\n      // Then propagate the broadcast to other windows.\n      if (type === \"page\") {\n        children.forEach((win) => emitTo(win, event, payload));\n      } else {\n        const pw = parentWindow || window.parent;\n        if (pw && pw.postMessage) {\n          emitTo(pw, event, payload);\n        }\n      }\n    },\n  };\n}\n\nfunction createRuntime(type = \"background\", bus) {\n  let nextId = 1;\n  const pending = {};\n  const msgListeners = [];\n\n  let nextPortId = 1;\n  const ports = {};\n  const onConnectListeners = [];\n\n  function parseArgs(args) {\n    let target, message, options, callback;\n    const arr = [...args];\n    if (arr.length === 0) {\n      throw new Error(\"sendMessage requires at least one argument\");\n    }\n    if (arr.length === 1) {\n      return { message: arr[0] };\n    }\n    // last object could be options\n    if (\n      arr.length &&\n      typeof arr[arr.length - 1] === \"object\" &&\n      !Array.isArray(arr[arr.length - 1])\n    ) {\n      options = arr.pop();\n    }\n    // last function is callback\n    if (arr.length && typeof arr[arr.length - 1] === \"function\") {\n      callback = arr.pop();\n    }\n    if (\n      arr.length === 2 &&\n      (typeof arr[0] === \"string\" || typeof arr[0] === \"number\")\n    ) {\n      [target, message] = arr;\n    } else {\n      [message] = arr;\n    }\n    return { target, message, options, callback };\n  }\n\n  if (type === \"background\") {\n    bus.on(\"__REQUEST__\", ({ id, message }, { source }) => {\n      let responded = false,\n        isAsync = false;\n      function sendResponse(resp) {\n        if (responded) return;\n        responded = true;\n        // Target the response directly back to the window that sent the request.\n        bus.emit(\"__RESPONSE__\", { id, response: resp }, { to: source });\n      }\n      const results = msgListeners\n        .map((fn) => {\n          try {\n            // msg, sender, sendResponse\n            const ret = fn(message, { id, tab: { id: source } }, sendResponse);\n            if (ret === true || (ret && typeof ret.then === \"function\")) {\n              isAsync = true;\n              return ret;\n            }\n            return ret;\n          } catch (e) {\n            _error(e);\n          }\n        })\n        .filter((r) => r !== undefined);\n\n      const promises = results.filter((r) => r && typeof r.then === \"function\");\n      if (!isAsync && promises.length === 0) {\n        const out = results.length === 1 ? results[0] : results;\n        sendResponse(out);\n      } else if (promises.length) {\n        Promise.all(promises).then((vals) => {\n          if (!responded) {\n            const out = vals.length === 1 ? vals[0] : vals;\n            sendResponse(out);\n          }\n        });\n      }\n    });\n  }\n\n  if (type !== \"background\") {\n    bus.on(\"__RESPONSE__\", ({ id, response }) => {\n      const entry = pending[id];\n      if (!entry) return;\n      entry.resolve(response);\n      if (entry.callback) entry.callback(response);\n      delete pending[id];\n    });\n  }\n\n  function sendMessage(...args) {\n    // Background should be able to send message to itself\n    // if (type === \"background\") {\n    //   throw new Error(\"Background cannot sendMessage to itself\");\n    // }\n    const { target, message, callback } = parseArgs(args);\n    const id = nextId++;\n    const promise = new Promise((resolve) => {\n      pending[id] = { resolve, callback };\n      bus.emit(\"__REQUEST__\", { id, message });\n    });\n    return promise;\n  }\n\n  bus.on(\"__PORT_CONNECT__\", ({ portId, name }, { source }) => {\n    if (type !== \"background\") return;\n    const backgroundPort = makePort(\"background\", portId, name, source);\n    ports[portId] = backgroundPort;\n\n    onConnectListeners.forEach((fn) => fn(backgroundPort));\n\n    // send back a CONNECT_ACK so the client can\n    // start listening on its end:\n    bus.emit(\"__PORT_CONNECT_ACK__\", { portId, name }, { to: source });\n  });\n\n  // Clients handle the ACK and finalize their Port object by learning the remote window.\n  bus.on(\"__PORT_CONNECT_ACK__\", ({ portId, name }, { source }) => {\n    if (type === \"background\") return; // ignore\n    const p = ports[portId];\n    if (!p) return;\n    // Call the port's internal finalize method to complete the handshake\n    if (p._finalize) {\n      p._finalize(source);\n    }\n  });\n\n  // Any port message travels via \"__PORT_MESSAGE__\"\n  bus.on(\"__PORT_MESSAGE__\", (envelope, { source }) => {\n    const { portId } = envelope;\n    const p = ports[portId];\n    if (!p) return;\n    p._receive(envelope, source);\n  });\n\n  // Any port disconnect:\n  bus.on(\"__PORT_DISCONNECT__\", ({ portId }) => {\n    const p = ports[portId];\n    if (!p) return;\n    p._disconnect();\n    delete ports[portId];\n  });\n\n  // Refactored makePort to correctly manage internal state and the connection handshake.\n  function makePort(side, portId, name, remoteWindow) {\n    let onMessageHandlers = [];\n    let onDisconnectHandlers = [];\n    let buffer = [];\n    // Unique instance ID for this port instance\n    const instanceId = Math.random().toString(36).slice(2) + Date.now();\n    // These state variables are part of the closure and are updated by _finalize\n    let _ready = side === \"background\";\n\n    function _drainBuffer() {\n      buffer.forEach((m) => _post(m));\n      buffer = [];\n    }\n\n    function _post(msg) {\n      // Always use the 'to' parameter for port messages, making them directional.\n      // Include senderInstanceId\n      bus.emit(\n        \"__PORT_MESSAGE__\",\n        { portId, msg, senderInstanceId: instanceId },\n        { to: remoteWindow }\n      );\n    }\n\n    function postMessage(msg) {\n      if (!_ready) {\n        buffer.push(msg);\n      } else {\n        _post(msg);\n      }\n    }\n\n    function _receive(envelope, source) {\n      // envelope: { msg, senderInstanceId }\n      if (envelope.senderInstanceId === instanceId) return; // Don't dispatch to self\n      onMessageHandlers.forEach((fn) =>\n        fn(envelope.msg, { id: portId, tab: { id: source } })\n      );\n    }\n\n    function disconnect() {\n      // Also use the 'to' parameter for disconnect messages\n      bus.emit(\"__PORT_DISCONNECT__\", { portId }, { to: remoteWindow });\n      _disconnect();\n      delete ports[portId];\n    }\n\n    function _disconnect() {\n      onDisconnectHandlers.forEach((fn) => fn());\n      onMessageHandlers = [];\n      onDisconnectHandlers = [];\n    }\n\n    // This function is called on the client port when the ACK is received from background.\n    // It updates the port's state, completing the connection.\n    function _finalize(win) {\n      remoteWindow = win; // <-- This is the crucial part: learn the destination\n      _ready = true;\n      _drainBuffer();\n    }\n\n    return {\n      name,\n      sender: {\n        id: portId,\n      },\n      onMessage: {\n        addListener(fn) {\n          onMessageHandlers.push(fn);\n        },\n        removeListener(fn) {\n          onMessageHandlers = onMessageHandlers.filter((x) => x !== fn);\n        },\n      },\n      onDisconnect: {\n        addListener(fn) {\n          onDisconnectHandlers.push(fn);\n        },\n        removeListener(fn) {\n          onDisconnectHandlers = onDisconnectHandlers.filter((x) => x !== fn);\n        },\n      },\n      postMessage,\n      disconnect,\n      // Internal methods used by the runtime\n      _receive,\n      _disconnect,\n      _finalize, // Expose the finalizer for the ACK handler\n    };\n  }\n\n  function connect(connectInfo = {}) {\n    if (type === \"background\") {\n      throw new Error(\"Background must use onConnect, not connect()\");\n    }\n    const name = connectInfo.name || \"\";\n    const portId = nextPortId++;\n    // create the client side port\n    // remoteWindow is initially null; it will be set by _finalize upon ACK.\n    const clientPort = makePort(\"client\", portId, name, null);\n    ports[portId] = clientPort;\n\n    // fire the connect event across the bus\n    bus.emit(\"__PORT_CONNECT__\", { portId, name });\n    return clientPort;\n  }\n\n  function onConnect(fn) {\n    if (type !== \"background\") {\n      throw new Error(\"connect event only fires in background\");\n    }\n    onConnectListeners.push(fn);\n  }\n\n  return {\n    // rpc:\n    sendMessage,\n    onMessage: {\n      addListener(fn) {\n        msgListeners.push(fn);\n      },\n      removeListener(fn) {\n        const i = msgListeners.indexOf(fn);\n        if (i >= 0) msgListeners.splice(i, 1);\n      },\n    },\n\n    // port API:\n    connect,\n    onConnect: {\n      addListener(fn) {\n        onConnect(fn);\n      },\n      removeListener(fn) {\n        const i = onConnectListeners.indexOf(fn);\n        if (i >= 0) onConnectListeners.splice(i, 1);\n      },\n    },\n  };\n}\n\n\n// --- Abstraction Layer: PostMessage Target\n\nlet nextRequestId = 1;\nconst pendingRequests = new Map(); // requestId -> { resolve, reject, timeout }\n\nfunction sendAbstractionRequest(method, args = []) {\n  return new Promise((resolve, reject) => {\n    const requestId = nextRequestId++;\n\n    const timeout = setTimeout(() => {\n      pendingRequests.delete(requestId);\n      reject(new Error(`PostMessage request timeout for method: ${method}`));\n    }, 10000);\n\n    pendingRequests.set(requestId, { resolve, reject, timeout });\n\n    window.parent.postMessage({\n      type: \"abstraction-request\",\n      requestId,\n      method,\n      args,\n    });\n  });\n}\n\nwindow.addEventListener(\"message\", (event) => {\n  const { type, requestId, success, result, error } = event.data;\n\n  if (type === \"abstraction-response\") {\n    const pending = pendingRequests.get(requestId);\n    if (pending) {\n      clearTimeout(pending.timeout);\n      pendingRequests.delete(requestId);\n\n      if (success) {\n        pending.resolve(result);\n      } else {\n        const err = new Error(error.message);\n        err.stack = error.stack;\n        pending.reject(err);\n      }\n    }\n  }\n});\n\nasync function _storageSet(items) {\n  return sendAbstractionRequest(\"_storageSet\", [items]);\n}\n\nasync function _storageGet(keys) {\n  return sendAbstractionRequest(\"_storageGet\", [keys]);\n}\n\nasync function _storageRemove(keysToRemove) {\n  return sendAbstractionRequest(\"_storageRemove\", [keysToRemove]);\n}\n\nasync function _storageClear() {\n  return sendAbstractionRequest(\"_storageClear\");\n}\n\nasync function _cookieList(details) {\n  return sendAbstractionRequest(\"_cookieList\", [details]);\n}\n\nasync function _cookieSet(details) {\n  return sendAbstractionRequest(\"_cookieSet\", [details]);\n}\n\nasync function _cookieDelete(details) {\n  return sendAbstractionRequest(\"_cookieDelete\", [details]);\n}\n\nasync function _fetch(url, options) {\n  return sendAbstractionRequest(\"_fetch\", [url, options]);\n}\n\nfunction _registerMenuCommand(name, func) {\n  _warn(\"_registerMenuCommand called from iframe context:\", name);\n  return sendAbstractionRequest(\"_registerMenuCommand\", [\n    name,\n    func.toString(),\n  ]);\n}\n\nfunction _openTab(url, active) {\n  return sendAbstractionRequest(\"_openTab\", [url, active]);\n}\n\nasync function _initStorage() {\n  return sendAbstractionRequest(\"_initStorage\");\n}\n\n\nconst EXTENSION_ASSETS_MAP = {{EXTENSION_ASSETS_MAP}};\n\n// -- Polyfill Implementation\nfunction buildPolyfill({ isBackground = false, isOtherPage = false } = {}) {\n  // Generate a unique context ID for this polyfill instance\n  const contextType = isBackground\n    ? \"background\"\n    : isOtherPage\n      ? \"options\"\n      : \"content\";\n  const contextId = `${contextType}_${Math.random()\n    .toString(36)\n    .substring(2, 15)}`;\n\n  const IS_IFRAME = \"true\" === \"true\";\n  const BUS = (function () {\n    if (globalThis.__BUS) {\n      return globalThis.__BUS;\n    }\n    globalThis.__BUS = createEventBus(\n      \"xpath-tester\",\n      IS_IFRAME ? \"iframe\" : \"page\",\n    );\n    return globalThis.__BUS;\n  })();\n  const RUNTIME = createRuntime(isBackground ? \"background\" : \"tab\", BUS);\n  const createNoopListeners = () => ({\n    addListener: (callback) => {\n      _log(\"addListener\", callback);\n    },\n    removeListener: (callback) => {\n      _log(\"removeListener\", callback);\n    },\n  });\n  // TODO: Stub\n  const storageChangeListeners = new Set();\n  function broadcastStorageChange(changes, areaName) {\n    storageChangeListeners.forEach((listener) => {\n      listener(changes, areaName);\n    });\n  }\n\n  let REQ_PERMS = [];\n\n  // --- Chrome polyfill\n  let chrome = {\n    extension: {\n      isAllowedIncognitoAccess: () => Promise.resolve(true),\n      sendMessage: (...args) => _messagingHandler.sendMessage(...args),\n    },\n    permissions: {\n      // TODO: Remove origin permission means exclude from origin in startup (when checking for content scripts)\n      request: (permissions, callback) => {\n        _log(\"permissions.request\", permissions, callback);\n        if (Array.isArray(permissions)) {\n          REQ_PERMS = [...REQ_PERMS, ...permissions];\n        }\n        if (typeof callback === \"function\") {\n          callback(permissions);\n        }\n        return Promise.resolve(permissions);\n      },\n      contains: (permissions, callback) => {\n        if (typeof callback === \"function\") {\n          callback(true);\n        }\n        return Promise.resolve(true);\n      },\n      getAll: () => {\n        return Promise.resolve({\n          permissions: EXTENSION_PERMISSIONS,\n          origins: ORIGIN_PERMISSIONS,\n        });\n      },\n      onAdded: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n    },\n    i18n: {\n      getUILanguage: () => {\n        return USED_LOCALE || \"en\";\n      },\n      getMessage: (key, substitutions = []) => {\n        if (typeof substitutions === \"string\") {\n          substitutions = [substitutions];\n        }\n        if (typeof LOCALE_KEYS !== \"undefined\" && LOCALE_KEYS[key]) {\n          return LOCALE_KEYS[key].message?.replace(\n            /\\$(\\d+)/g,\n            (match, p1) => substitutions[p1 - 1] || match,\n          );\n        }\n        return key;\n      },\n    },\n    alarms: {\n      onAlarm: createNoopListeners(),\n      create: () => {\n        _log(\"alarms.create\", arguments);\n      },\n      get: () => {\n        _log(\"alarms.get\", arguments);\n      },\n    },\n    runtime: {\n      ...RUNTIME,\n      onInstalled: createNoopListeners(),\n      onStartup: createNoopListeners(),\n      // TODO: Postmessage to parent to open options page or call openOptionsPage\n      openOptionsPage: () => {\n        // const url = chrome.runtime.getURL(OPTIONS_PAGE_PATH);\n        // console.log(\"openOptionsPage\", _openTab, url, EXTENSION_ASSETS_MAP);\n        // _openTab(url);\n        if (typeof openOptionsPage === \"function\") {\n          openOptionsPage();\n        } else if (window.parent) {\n          window.parent.postMessage({ type: \"openOptionsPage\" }, \"*\");\n        } else {\n          _warn(\"openOptionsPage not available.\");\n        }\n      },\n      getManifest: () => {\n        // The manifest object will be injected into the scope where buildPolyfill is called\n        if (typeof INJECTED_MANIFEST !== \"undefined\") {\n          return JSON.parse(JSON.stringify(INJECTED_MANIFEST)); // Return deep copy\n        }\n        _warn(\"INJECTED_MANIFEST not found for chrome.runtime.getManifest\");\n        return { name: \"Unknown\", version: \"0.0\", manifest_version: 2 };\n      },\n      getURL: (path) => {\n        if (!path) return \"\";\n        if (path.startsWith(\"/\")) {\n          path = path.substring(1);\n        }\n\n        if (typeof _createAssetUrl === \"function\") {\n          return _createAssetUrl(path);\n        }\n\n        _warn(\n          `chrome.runtime.getURL fallback for '${path}'. Assets may not be available.`,\n        );\n        // Attempt a relative path resolution (highly context-dependent and likely wrong)\n        try {\n          if (window.location.protocol.startsWith(\"http\")) {\n            return new URL(path, window.location.href).toString();\n          }\n        } catch (e) {\n          /* ignore error, fallback */\n        }\n        return path;\n      },\n      id: \"polyfilled-extension-\" + Math.random().toString(36).substring(2, 15),\n      lastError: null,\n      setUninstallURL: () => {},\n      setUpdateURL: () => {},\n      getPlatformInfo: async () => {\n        const platform = {\n          os: \"unknown\",\n          arch: \"unknown\",\n          nacl_arch: \"unknown\",\n        };\n\n        if (typeof navigator !== \"undefined\") {\n          const userAgent = navigator.userAgent.toLowerCase();\n          if (userAgent.includes(\"mac\")) platform.os = \"mac\";\n          else if (userAgent.includes(\"win\")) platform.os = \"win\";\n          else if (userAgent.includes(\"linux\")) platform.os = \"linux\";\n          else if (userAgent.includes(\"android\")) platform.os = \"android\";\n          else if (userAgent.includes(\"ios\")) platform.os = \"ios\";\n\n          if (userAgent.includes(\"x86_64\") || userAgent.includes(\"amd64\")) {\n            platform.arch = \"x86-64\";\n          } else if (userAgent.includes(\"i386\") || userAgent.includes(\"i686\")) {\n            platform.arch = \"x86-32\";\n          } else if (userAgent.includes(\"arm\")) {\n            platform.arch = \"arm\";\n          }\n        }\n\n        return platform;\n      },\n      getBrowserInfo: async () => {\n        const info = {\n          name: \"unknown\",\n          version: \"unknown\",\n          buildID: \"unknown\",\n        };\n\n        if (typeof navigator !== \"undefined\") {\n          const userAgent = navigator.userAgent;\n          if (userAgent.includes(\"Chrome\")) {\n            info.name = \"Chrome\";\n            const match = userAgent.match(/Chrome\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          } else if (userAgent.includes(\"Firefox\")) {\n            info.name = \"Firefox\";\n            const match = userAgent.match(/Firefox\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          } else if (userAgent.includes(\"Safari\")) {\n            info.name = \"Safari\";\n            const match = userAgent.match(/Version\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          }\n        }\n\n        return info;\n      },\n    },\n    storage: {\n      local: {\n        get: function (keys, callback) {\n          if (typeof _storageGet !== \"function\")\n            throw new Error(\"_storageGet not defined\");\n\n          const promise = _storageGet(keys);\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.get callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.get error:\", error);\n                callback({});\n              });\n            return;\n          }\n\n          return promise;\n        },\n        set: function (items, callback) {\n          if (typeof _storageSet !== \"function\")\n            throw new Error(\"_storageSet not defined\");\n\n          const promise = _storageSet(items).then((result) => {\n            broadcastStorageChange(items, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.set callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.set error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        remove: function (keys, callback) {\n          if (typeof _storageRemove !== \"function\")\n            throw new Error(\"_storageRemove not defined\");\n\n          const promise = _storageRemove(keys).then((result) => {\n            const changes = {};\n            const keyList = Array.isArray(keys) ? keys : [keys];\n            keyList.forEach((key) => {\n              changes[key] = { oldValue: undefined, newValue: undefined };\n            });\n            broadcastStorageChange(changes, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.remove callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.remove error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        clear: function (callback) {\n          if (typeof _storageClear !== \"function\")\n            throw new Error(\"_storageClear not defined\");\n\n          const promise = _storageClear().then((result) => {\n            broadcastStorageChange({}, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.clear callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.clear error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        onChanged: {\n          addListener: (callback) => {\n            storageChangeListeners.add(callback);\n          },\n          removeListener: (callback) => {\n            storageChangeListeners.delete(callback);\n          },\n        },\n      },\n      sync: {\n        get: function (keys, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n          return chrome.storage.local.get(keys, callback);\n        },\n        set: function (items, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.set(items).then((result) => {\n            broadcastStorageChange(items, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.set callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.set error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        remove: function (keys, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.remove(keys).then((result) => {\n            const changes = {};\n            const keyList = Array.isArray(keys) ? keys : [keys];\n            keyList.forEach((key) => {\n              changes[key] = { oldValue: undefined, newValue: undefined };\n            });\n            broadcastStorageChange(changes, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.remove callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.remove error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        clear: function (callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.clear().then((result) => {\n            broadcastStorageChange({}, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.clear callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.clear error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        onChanged: {\n          addListener: (callback) => {\n            storageChangeListeners.add(callback);\n          },\n          removeListener: (callback) => {\n            storageChangeListeners.delete(callback);\n          },\n        },\n      },\n      onChanged: {\n        addListener: (callback) => {\n          storageChangeListeners.add(callback);\n        },\n        removeListener: (callback) => {\n          storageChangeListeners.delete(callback);\n        },\n      },\n      managed: {\n        get: function (keys, callback) {\n          _warn(\"chrome.storage.managed polyfill is read-only empty.\");\n\n          const promise = Promise.resolve({});\n\n          if (typeof callback === \"function\") {\n            promise.then((result) => {\n              try {\n                callback(result);\n              } catch (e) {\n                _error(\"Error in storage.managed.get callback:\", e);\n              }\n            });\n            return;\n          }\n\n          return promise;\n        },\n      },\n    },\n    cookies: (function () {\n      const cookieChangeListeners = new Set();\n      function broadcastCookieChange(changeInfo) {\n        cookieChangeListeners.forEach((listener) => {\n          try {\n            listener(changeInfo);\n          } catch (e) {\n            _error(\"Error in cookies.onChanged listener:\", e);\n          }\n        });\n      }\n\n      function handlePromiseCallback(promise, callback) {\n        if (typeof callback === \"function\") {\n          promise\n            .then((result) => callback(result))\n            .catch((error) => {\n              // chrome.runtime.lastError = { message: error.message }; // TODO: Implement lastError\n              _error(error);\n              callback(); // Call with undefined on error\n            });\n          return;\n        }\n        return promise;\n      }\n\n      return {\n        get: function (details, callback) {\n          if (typeof _cookieList !== \"function\") {\n            return handlePromiseCallback(\n              Promise.reject(new Error(\"_cookieList not defined\")),\n              callback,\n            );\n          }\n          const promise = _cookieList({\n            url: details.url,\n            name: details.name,\n            storeId: details.storeId,\n            partitionKey: details.partitionKey,\n          }).then((cookies) => {\n            if (!cookies || cookies.length === 0) {\n              return null;\n            }\n            // Sort by path length (longest first), then creation time (earliest first, if available)\n            cookies.sort((a, b) => {\n              const pathLenDiff = (b.path || \"\").length - (a.path || \"\").length;\n              if (pathLenDiff !== 0) return pathLenDiff;\n              return (a.creationTime || 0) - (b.creationTime || 0);\n            });\n            return cookies[0];\n          });\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getAll: function (details, callback) {\n          if (typeof _cookieList !== \"function\") {\n            return handlePromiseCallback(\n              Promise.reject(new Error(\"_cookieList not defined\")),\n              callback,\n            );\n          }\n          if (details.partitionKey) {\n            _warn(\n              \"cookies.getAll: partitionKey is not fully supported in this environment.\",\n            );\n          }\n          const promise = _cookieList(details);\n          return handlePromiseCallback(promise, callback);\n        },\n\n        set: function (details, callback) {\n          const promise = (async () => {\n            if (\n              typeof _cookieSet !== \"function\" ||\n              typeof _cookieList !== \"function\"\n            ) {\n              throw new Error(\"_cookieSet or _cookieList not defined\");\n            }\n            if (details.partitionKey) {\n              _warn(\n                \"cookies.set: partitionKey is not fully supported in this environment.\",\n              );\n            }\n\n            const getDetails = {\n              url: details.url,\n              name: details.name,\n              storeId: details.storeId,\n            };\n            const oldCookies = await _cookieList(getDetails);\n            const oldCookie = oldCookies && oldCookies[0];\n\n            if (oldCookie) {\n              broadcastCookieChange({\n                cause: \"overwrite\",\n                cookie: oldCookie,\n                removed: true,\n              });\n            }\n\n            await _cookieSet(details);\n            const newCookies = await _cookieList(getDetails);\n            const newCookie = newCookies && newCookies[0];\n\n            if (newCookie) {\n              broadcastCookieChange({\n                cause: \"explicit\",\n                cookie: newCookie,\n                removed: false,\n              });\n            }\n            return newCookie || null;\n          })();\n          return handlePromiseCallback(promise, callback);\n        },\n\n        remove: function (details, callback) {\n          const promise = (async () => {\n            if (\n              typeof _cookieDelete !== \"function\" ||\n              typeof _cookieList !== \"function\"\n            ) {\n              throw new Error(\"_cookieDelete or _cookieList not defined\");\n            }\n            const oldCookies = await _cookieList(details);\n            const oldCookie = oldCookies && oldCookies[0];\n\n            if (!oldCookie) return null; // Nothing to remove\n\n            await _cookieDelete(details);\n\n            broadcastCookieChange({\n              cause: \"explicit\",\n              cookie: oldCookie,\n              removed: true,\n            });\n\n            return {\n              url: details.url,\n              name: details.name,\n              storeId: details.storeId || \"0\",\n              partitionKey: details.partitionKey,\n            };\n          })();\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getAllCookieStores: function (callback) {\n          const promise = Promise.resolve([\n            { id: \"0\", tabIds: [1] }, // Mock store for the current context\n          ]);\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getPartitionKey: function (details, callback) {\n          _warn(\n            \"chrome.cookies.getPartitionKey is not supported in this environment.\",\n          );\n          const promise = Promise.resolve({ partitionKey: {} }); // Return empty partition key\n          return handlePromiseCallback(promise, callback);\n        },\n\n        onChanged: {\n          addListener: (callback) => {\n            if (typeof callback === \"function\") {\n              cookieChangeListeners.add(callback);\n            }\n          },\n          removeListener: (callback) => {\n            cookieChangeListeners.delete(callback);\n          },\n        },\n      };\n    })(),\n    tabs: {\n      query: async (queryInfo) => {\n        _warn(\"chrome.tabs.query polyfill only returns current tab info.\");\n        const dummyId = Math.floor(Math.random() * 1000) + 1;\n        return [\n          {\n            id: dummyId,\n            url: CURRENT_LOCATION,\n            active: true,\n            windowId: 1,\n            status: \"complete\",\n          },\n        ];\n      },\n      create: async ({ url, active = true }) => {\n        _log(`[Polyfill tabs.create] URL: ${url}`);\n        if (typeof _openTab !== \"function\")\n          throw new Error(\"_openTab not defined\");\n        _openTab(url, active);\n        const dummyId = Math.floor(Math.random() * 1000) + 1001;\n        return Promise.resolve({\n          id: dummyId,\n          url: url,\n          active,\n          windowId: 1,\n        });\n      },\n      sendMessage: async (tabId, message) => {\n        _warn(\n          `chrome.tabs.sendMessage polyfill (to tab ${tabId}) redirects to runtime.sendMessage (current context).`,\n        );\n        return chrome.runtime.sendMessage(message);\n      },\n      onActivated: createNoopListeners(),\n      onUpdated: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n      onReplaced: createNoopListeners(),\n      onCreated: createNoopListeners(),\n      onMoved: createNoopListeners(),\n      onDetached: createNoopListeners(),\n      onAttached: createNoopListeners(),\n    },\n    windows: {\n      onFocusChanged: createNoopListeners(),\n      onCreated: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n      onFocused: createNoopListeners(),\n      onFocus: createNoopListeners(),\n      onBlur: createNoopListeners(),\n      onFocused: createNoopListeners(),\n    },\n    notifications: {\n      create: async (notificationId, options) => {\n        try {\n          let id = notificationId;\n          let notificationOptions = options;\n\n          if (typeof notificationId === \"object\" && notificationId !== null) {\n            notificationOptions = notificationId;\n            id = \"notification_\" + Math.random().toString(36).substring(2, 15);\n          } else if (typeof notificationId === \"string\" && options) {\n            id = notificationId;\n            notificationOptions = options;\n          } else {\n            throw new Error(\"Invalid parameters for notifications.create\");\n          }\n\n          if (!notificationOptions || typeof notificationOptions !== \"object\") {\n            throw new Error(\"Notification options must be an object\");\n          }\n\n          const {\n            title,\n            message,\n            iconUrl,\n            type = \"basic\",\n          } = notificationOptions;\n\n          if (!title || !message) {\n            throw new Error(\"Notification must have title and message\");\n          }\n\n          if (\"Notification\" in window) {\n            if (Notification.permission === \"granted\") {\n              const notification = new Notification(title, {\n                body: message,\n                icon: iconUrl,\n                tag: id,\n              });\n\n              _log(`[Notifications] Created notification: ${id}`);\n              return id;\n            } else if (Notification.permission === \"default\") {\n              const permission = await Notification.requestPermission();\n              if (permission === \"granted\") {\n                const notification = new Notification(title, {\n                  body: message,\n                  icon: iconUrl,\n                  tag: id,\n                });\n                _log(\n                  `[Notifications] Created notification after permission: ${id}`,\n                );\n                return id;\n              } else {\n                _warn(\"[Notifications] Permission denied for notifications\");\n                return id;\n              }\n            } else {\n              _warn(\"[Notifications] Notifications are blocked\");\n              return id;\n            }\n          } else {\n            _warn(\n              \"[Notifications] Native notifications not supported, using console fallback\",\n            );\n            _log(`[Notification] ${title}: ${message}`);\n            return id;\n          }\n        } catch (error) {\n          _error(\"[Notifications] Error creating notification:\", error.message);\n          throw error;\n        }\n      },\n      clear: async (notificationId) => {\n        _log(`[Notifications] Clear notification: ${notificationId}`);\n        // For native notifications, there's no direct way to clear by ID\n        // This is a limitation of the Web Notifications API\n        return true;\n      },\n      getAll: async () => {\n        _warn(\"[Notifications] getAll not fully supported in polyfill\");\n        return {};\n      },\n      getPermissionLevel: async () => {\n        if (\"Notification\" in window) {\n          const permission = Notification.permission;\n          return { level: permission === \"granted\" ? \"granted\" : \"denied\" };\n        }\n        return { level: \"denied\" };\n      },\n    },\n    contextMenus: {\n      create: (createProperties, callback) => {\n        try {\n          if (!createProperties || typeof createProperties !== \"object\") {\n            throw new Error(\"Context menu create properties must be an object\");\n          }\n\n          const { id, title, contexts = [\"page\"], onclick } = createProperties;\n          const menuId =\n            id || `menu_${Math.random().toString(36).substring(2, 15)}`;\n\n          if (!title || typeof title !== \"string\") {\n            throw new Error(\"Context menu must have a title\");\n          }\n\n          // Store menu items for potential use\n          if (!window._polyfillContextMenus) {\n            window._polyfillContextMenus = new Map();\n          }\n\n          window._polyfillContextMenus.set(menuId, {\n            id: menuId,\n            title,\n            contexts,\n            onclick,\n            enabled: createProperties.enabled !== false,\n          });\n\n          _log(\n            `[ContextMenus] Created context menu item: ${title} (${menuId})`,\n          );\n\n          // Try to register a menu command as fallback\n          if (typeof _registerMenuCommand === \"function\") {\n            try {\n              _registerMenuCommand(\n                title,\n                onclick ||\n                  (() => {\n                    _log(`Context menu clicked: ${title}`);\n                  }),\n              );\n            } catch (e) {\n              _warn(\n                \"[ContextMenus] Failed to register as menu command:\",\n                e.message,\n              );\n            }\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n\n          return menuId;\n        } catch (error) {\n          _error(\"[ContextMenus] Error creating context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n          throw error;\n        }\n      },\n      update: (id, updateProperties, callback) => {\n        try {\n          if (\n            !window._polyfillContextMenus ||\n            !window._polyfillContextMenus.has(id)\n          ) {\n            throw new Error(`Context menu item not found: ${id}`);\n          }\n\n          const menuItem = window._polyfillContextMenus.get(id);\n          Object.assign(menuItem, updateProperties);\n\n          _log(`[ContextMenus] Updated context menu item: ${id}`);\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\"[ContextMenus] Error updating context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      remove: (menuItemId, callback) => {\n        try {\n          if (\n            window._polyfillContextMenus &&\n            window._polyfillContextMenus.has(menuItemId)\n          ) {\n            window._polyfillContextMenus.delete(menuItemId);\n            _log(`[ContextMenus] Removed context menu item: ${menuItemId}`);\n          } else {\n            _warn(\n              `[ContextMenus] Context menu item not found for removal: ${menuItemId}`,\n            );\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\"[ContextMenus] Error removing context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      removeAll: (callback) => {\n        try {\n          if (window._polyfillContextMenus) {\n            const count = window._polyfillContextMenus.size;\n            window._polyfillContextMenus.clear();\n            _log(`[ContextMenus] Removed all ${count} context menu items`);\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\n            \"[ContextMenus] Error removing all context menus:\",\n            error.message,\n          );\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      onClicked: {\n        addListener: (callback) => {\n          if (!window._polyfillContextMenuListeners) {\n            window._polyfillContextMenuListeners = new Set();\n          }\n          window._polyfillContextMenuListeners.add(callback);\n          _log(\"[ContextMenus] Added click listener\");\n        },\n        removeListener: (callback) => {\n          if (window._polyfillContextMenuListeners) {\n            window._polyfillContextMenuListeners.delete(callback);\n            _log(\"[ContextMenus] Removed click listener\");\n          }\n        },\n      },\n    },\n  };\n\n  const tc = (fn) => {\n    try {\n      fn();\n    } catch (e) {}\n  };\n  const loggingProxyHandler = (_key) => ({\n    get(target, key, receiver) {\n      tc(() => _log(`[${contextType}] [CHROME - ${_key}] Getting ${key}`));\n      return Reflect.get(target, key, receiver);\n    },\n    set(target, key, value, receiver) {\n      tc(() =>\n        _log(`[${contextType}] [CHROME - ${_key}] Setting ${key} to ${value}`),\n      );\n      return Reflect.set(target, key, value, receiver);\n    },\n    has(target, key) {\n      tc(() =>\n        _log(`[${contextType}] [CHROME - ${_key}] Checking if ${key} exists`),\n      );\n      return Reflect.has(target, key);\n    },\n  });\n  chrome = Object.fromEntries(\n    Object.entries(chrome).map(([key, value]) => [\n      key,\n      new Proxy(value, loggingProxyHandler(key)),\n    ]),\n  );\n\n  // Alias browser to chrome for common Firefox pattern\n  const browser = new Proxy(chrome, loggingProxyHandler);\n\n  const oldGlobalThis = globalThis;\n  const oldWindow = window;\n  const oldSelf = self;\n  const oldGlobal = globalThis;\n  const __globalsStorage = {};\n\n  const TO_MODIFY = [oldGlobalThis, oldWindow, oldSelf, oldGlobal];\n  const set = (k, v) => {\n    __globalsStorage[k] = v;\n    TO_MODIFY.forEach((target) => {\n      target[k] = v;\n    });\n  };\n  const proxyHandler = {\n    get(target, key, receiver) {\n      const fns = [\n        () => __globalsStorage[key],\n        () => Reflect.get(target, key, target),\n        () => target[key],\n      ];\n      const out = fns\n        .map((f) => {\n          try {\n            let out = f();\n            return out;\n          } catch (e) {\n            return undefined;\n          }\n        })\n        .find((f) => f !== undefined);\n      if (typeof out === \"function\") {\n        return out.bind(target);\n      }\n      return out;\n    },\n    set(target, key, value, receiver) {\n      try {\n        tc(() => _log(`[${contextType}] Setting ${key} to ${value}`));\n        set(key, value);\n        return Reflect.set(target, key, value, receiver);\n      } catch (e) {\n        _error(\"Error setting\", key, value, e);\n        try {\n          target[key] = value;\n          return true;\n        } catch (e) {\n          _error(\"Error setting\", key, value, e);\n        }\n        return false;\n      }\n    },\n    has(target, key) {\n      try {\n        return key in __globalsStorage || key in target;\n      } catch (e) {\n        _error(\"Error has\", key, e);\n        try {\n          return key in __globalsStorage || key in target;\n        } catch (e) {\n          _error(\"Error has\", key, e);\n        }\n        return false;\n      }\n    },\n    getOwnPropertyDescriptor(target, key) {\n      try {\n        if (key in __globalsStorage) {\n          return {\n            configurable: true,\n            enumerable: true,\n            writable: true,\n            value: __globalsStorage[key],\n          };\n        }\n        // fall back to the real globalThis\n        const desc = Reflect.getOwnPropertyDescriptor(target, key);\n        // ensure it's configurable so the with‑scope binding logic can override it\n        if (desc && !desc.configurable) {\n          desc.configurable = true;\n        }\n        return desc;\n      } catch (e) {\n        _error(\"Error getOwnPropertyDescriptor\", key, e);\n        return {\n          configurable: true,\n          enumerable: true,\n          writable: true,\n          value: undefined,\n        };\n      }\n    },\n\n    defineProperty(target, key, descriptor) {\n      try {\n        // Normalize descriptor to avoid mixed accessor & data attributes\n        const hasAccessor = \"get\" in descriptor || \"set\" in descriptor;\n\n        if (hasAccessor) {\n          // Build a clean descriptor without value/writable when accessors present\n          const normalized = {\n            configurable:\n              \"configurable\" in descriptor ? descriptor.configurable : true,\n            enumerable:\n              \"enumerable\" in descriptor ? descriptor.enumerable : false,\n          };\n          if (\"get\" in descriptor) normalized.get = descriptor.get;\n          if (\"set\" in descriptor) normalized.set = descriptor.set;\n\n          // Store accessor references for inspection but avoid breaking invariants\n          set(key, {\n            get: descriptor.get,\n            set: descriptor.set,\n          });\n\n          return Reflect.defineProperty(target, key, normalized);\n        }\n\n        // Data descriptor path\n        set(key, descriptor.value);\n        return Reflect.defineProperty(target, key, descriptor);\n      } catch (e) {\n        _error(\"Error defineProperty\", key, descriptor, e);\n        return false;\n      }\n    },\n  };\n\n  // Create proxies once proxyHandler is defined\n  const proxyWindow = new Proxy(oldWindow, proxyHandler);\n  const proxyGlobalThis = new Proxy(oldGlobalThis, proxyHandler);\n  const proxyGlobal = new Proxy(oldGlobal, proxyHandler);\n  const proxySelf = new Proxy(oldSelf, proxyHandler);\n\n  // Seed storage with core globals so lookups succeed inside `with` blocks\n  Object.assign(__globalsStorage, {\n    chrome,\n    browser,\n    window: proxyWindow,\n    globalThis: proxyGlobalThis,\n    global: proxyGlobal,\n    self: proxySelf,\n    document: oldWindow.document,\n  });\n\n  const __globals = {\n    chrome,\n    browser,\n    window: proxyWindow,\n    globalThis: proxyGlobalThis,\n    global: proxyGlobal,\n    self: proxySelf,\n    __globals: __globalsStorage,\n  };\n\n  __globals.contextId = contextId;\n  __globals.contextType = contextType;\n  __globals.module = undefined;\n  __globals.amd = undefined;\n  __globals.define = undefined;\n  __globals.importScripts = (...args) => {\n    _log(\"importScripts\", args);\n  };\n\n  return __globals;\n}\n\n\nif (typeof window !== 'undefined') {\n    window.buildPolyfill = buildPolyfill;\n}\n"
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