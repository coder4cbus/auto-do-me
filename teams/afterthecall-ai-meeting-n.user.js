// ==UserScript==
// @name        AfterTheCall: AI Meeting Notes for Meet, Zoom, Teams, Webex & WhatsApp
// @version     1.5.0
// @description AI meeting notes, transcription, action items & follow-up emails for Google Meet, Zoom, Microsoft Teams, Webex & WhatsApp. No bots.
// @namespace   afterthecall-ai-meeting-notes-for-meet-zoom-teams-webex-whatsapp
// @author      Converter Script
// @match       https://meet.google.com/*
// @match       https://*.webex.com/*
// @match       https://*.zoom.us/*
// @match       https://*.teams.microsoft.com/*
// @match       https://*.teams.live.com/*
// @match       https://web.whatsapp.com/*
// @match       https://www.afterthecall.io/*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_registerMenuCommand
// @grant       GM_openInTab
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAACoUExURQAAAF5c5l9c5l9d515d5mBc5l5c5l5c5l5c5l5c5l5c5l9d5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5lxa5ltZ5l1a5mBe5nh36piX76uq8nd16r6+9e/v/f7+/////7699XZ16oSD7OPj+ymGuKQAAAAndFJOUwAAAAAAAAQOGB4DAR1Ogq3I2N+sCEOZ2vkCQq7zQRmN7zfDNknd5Grh21MAAAABYktHRDM31XxeAAAAB3RJTUUH6gMeCTkrIYSHTQAAAaVJREFUSMelVumagjAM3HgBcggooKKCINYDD8Tj/d9suxW1ZcFu3fn8YzJD0rRN+vX1f0ADCjSAS24SYkeSFUWWuuRP8w29hf2qphs907Jty+wbuqZiU6uG3sa+geN6Q/TE0HOdATa3q/g489HYn6ASJv50hFdTsVSAWRCiCoTBDDsr+PMI1SCKfymwYZGgWiSLkgJXfLFEb7BcMJuC6zNP0FskMV0rvN4IcRDNXknhegY8PkLB6KkAGId8QTh9CJow8Pl8hPxBca4AnPL+rtYr/CsZJ04RAlSX9Wy26W6/36XbDWt31UKgeeznD8fslOen7Hxhg3ga3DPShwz/essL3K6MYqiTnAAMJp/Dk48VFyYrg1wN6PRo4/aYUzhvaV+/SyJIJp1QmtGCLKWTMiUikC3Ktt6daMFpt6aclkwEik1H2OcM9nQEW/lMIJyS8KKFyyqycfDJ0RA+fB8cb9ELJHxFhZuAeJsRbmQ/rTIWapWkefOacal9C7Z7oohFBor4yCKK+qFYOeFFx+49CBnsfXawv3tA3J8O3b8+HV5xHuCS+fgGo5zhLBXJq24AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjYtMDMtMzBUMDk6NTc6MzcrMDA6MDDRl2XhAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI2LTAzLTMwVDA5OjU3OjM3KzAwOjAwoMrdXQAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNi0wMy0zMFQwOTo1Nzo0MyswMDowMAlV0YgAAAAASUVORK5CYII=
// @run-at      document-start
// ==/UserScript==

console.log("Script start:",performance.now());const e=!0,t=e=>e,o="passthrough";let s,c={createHTML:t,createScript:t,createScriptURL:t},i=!1;const r=()=>{try{void 0!==window.isSecureContext&&window.isSecureContext&&window.trustedTypes&&window.trustedTypes.createPolicy&&(i=!0,trustedTypes.defaultPolicy?(l("TT Default Policy exists"),c=window.trustedTypes.createPolicy("default",c),s=trustedTypes.defaultPolicy,l(`Created custom passthrough policy, in case the default policy is too restrictive: Use Policy '${o}' in var 'TTP':`,c)):s=c=window.trustedTypes.createPolicy("default",c),l("Trusted-Type Policies: TTP:",c,"TTP_default:",s))}catch(e){l(e)}},l=(...e)=>{console.log(...e)};r();

(function() {
    // #region Logging
	
	  const SCRIPT_NAME = "AfterTheCall: AI Meeting Notes for Meet, Zoom, Teams, Webex & WhatsApp";
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
			  "src/popup/index.html": "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title data-i18n=\"popupTitle\">AfterTheCall - Capture Client Calls</title>\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap\" rel=\"stylesheet\" />\n    <script type=\"module\" crossorigin src=\"data:text/javascript;base64,aW1wb3J0e2kgYXMgdHQsdCBhcyBhLFcgYXMgRSxhIGFzIGssdiBhcyBldCxBIGFzIG50LGMgYXMgb3QsYiBhcyBBLGggYXMgaXQsZyBhcyBjdH1mcm9tIi4vc3RvcmFnZS1DRk5rYWNDSi5qcyI7KGZ1bmN0aW9uKCl7Y29uc3QgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJsaW5rIikucmVsTGlzdDtpZihlJiZlLnN1cHBvcnRzJiZlLnN1cHBvcnRzKCJtb2R1bGVwcmVsb2FkIikpcmV0dXJuO2Zvcihjb25zdCBpIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpbmtbcmVsPSJtb2R1bGVwcmVsb2FkIl0nKSluKGkpO25ldyBNdXRhdGlvbk9ic2VydmVyKGk9Pntmb3IoY29uc3QgYyBvZiBpKWlmKGMudHlwZT09PSJjaGlsZExpc3QiKWZvcihjb25zdCBJIG9mIGMuYWRkZWROb2RlcylJLnRhZ05hbWU9PT0iTElOSyImJkkucmVsPT09Im1vZHVsZXByZWxvYWQiJiZuKEkpfSkub2JzZXJ2ZShkb2N1bWVudCx7Y2hpbGRMaXN0OiEwLHN1YnRyZWU6ITB9KTtmdW5jdGlvbiBvKGkpe2NvbnN0IGM9e307cmV0dXJuIGkuaW50ZWdyaXR5JiYoYy5pbnRlZ3JpdHk9aS5pbnRlZ3JpdHkpLGkucmVmZXJyZXJQb2xpY3kmJihjLnJlZmVycmVyUG9saWN5PWkucmVmZXJyZXJQb2xpY3kpLGkuY3Jvc3NPcmlnaW49PT0idXNlLWNyZWRlbnRpYWxzIj9jLmNyZWRlbnRpYWxzPSJpbmNsdWRlIjppLmNyb3NzT3JpZ2luPT09ImFub255bW91cyI/Yy5jcmVkZW50aWFscz0ib21pdCI6Yy5jcmVkZW50aWFscz0ic2FtZS1vcmlnaW4iLGN9ZnVuY3Rpb24gbihpKXtpZihpLmVwKXJldHVybjtpLmVwPSEwO2NvbnN0IGM9byhpKTtmZXRjaChpLmhyZWYsYyl9fSkoKTtjb25zdCBydD0iL2xvZ2luIixhdD0iL2Rhc2hib2FyZCIsc3Q9Ii9kYXNoYm9hcmQvc2V0dGluZ3MiLHg9ImFmdGVydGhlY2FsbF9hdXRvX2RldGVjdF9tZWV0aW5ncyIsXz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgibG9hZGluZy1wYW5lbCIpLEQ9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImxvZ2luLXBhbmVsIiksTj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgibG9nZ2VkLWluLXBhbmVsIiksJD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY29udGludWUtZ29vZ2xlIiksVz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY29udGludWUtZW1haWwiKSx1PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJ1c2VyLWF2YXRhciIpLEY9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInVzZXItbmFtZSIpLEw9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImxvZ2dlZC1pbl9fc3RhdHVzIiksQz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgib3Blbi1kYXNoYm9hcmQiKSxUPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJvcGVuLXNldHRpbmdzIikscj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY2FsbHMtY291bnQiKSxmPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJhdXRvLWRldGVjdCIpLHM9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInN0YXJ0LXJlY29yZGluZyIpLHE9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInN0b3AtcmVjb3JkaW5nIiksdz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicGF1c2UtcmVzdW1lLXJlY29yZGluZyIpLFU9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInJlY29yZGluZy1zdGF0dXMiKSxCPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJyZWNvcmRpbmctdGltZXIiKSxSPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJyZWNvcmRpbmctb3B0aW9ucyIpLG09ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIm1lZXRpbmctd2FybmluZyIpLGw9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIm9wdC1taWMiKSxkPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJvcHQtcGFydGljaXBhbnRzIiksRz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicG9wdXAtbG9nbyIpO0cmJihHLnNyYz1jaHJvbWUucnVudGltZS5nZXRVUkwoInNyYy9pY29ucy9sb2dvLnN2ZyIpKTtjb25zdCBsdD1be3BhdHRlcm46L2h0dHBzOlwvXC9tZWV0XC5nb29nbGVcLmNvbVwvL2l9LHtwYXR0ZXJuOi9odHRwczpcL1wvKD86W1x3LV0rXC4pP3dlYmV4XC5jb21cLy9pfSx7cGF0dGVybjovaHR0cHM6XC9cLyg/Oltcdy1dK1wuKT96b29tXC51c1wvL2l9LHtwYXR0ZXJuOi9odHRwczpcL1wvKD86W1x3LV0rXC4pP3RlYW1zXC5taWNyb3NvZnRcLmNvbVwvL2l9LHtwYXR0ZXJuOi9odHRwczpcL1wvKD86W1x3LV0rXC4pP3RlYW1zXC5saXZlXC5jb21cLy9pfSx7cGF0dGVybjovaHR0cHM6XC9cL3dlYlwud2hhdHNhcHBcLmNvbVwvL2l9XTtmdW5jdGlvbiBIKHQpe3JldHVybiF0fHwhdC5zdGFydHNXaXRoKCJodHRwIik/ITE6bHQuc29tZSgoe3BhdHRlcm46ZX0pPT5lLnRlc3QodCkpfWZ1bmN0aW9uIFkoKXtjb25zdCBlPW5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCkuZ2V0KCJ0YWJJZCIpO3JldHVybiBlP3BhcnNlSW50KGUsMTApOm51bGx9ZnVuY3Rpb24gZHQoKXtyZXR1cm5gJHtjaHJvbWUucnVudGltZS5nZXRVUkwoIiIpLnN0YXJ0c1dpdGgoImNocm9tZS1leHRlbnNpb246Ly8iKT9FOkV9JHtydH1gfWZ1bmN0aW9uIEooKXtyZXR1cm5gJHtFfSR7YXR9YH1mdW5jdGlvbiBRKCl7cmV0dXJuYCR7RX0ke3N0fWB9bGV0IGc9bnVsbCxiPSJpZGxlIjtmdW5jdGlvbiB6KHQpe2NvbnN0IGU9TWF0aC5mbG9vcih0LzM2MDApLG89TWF0aC5mbG9vcih0JTM2MDAvNjApLG49TWF0aC5mbG9vcih0JTYwKTtyZXR1cm4gZT4wP1tlLG8sbl0ubWFwKGk9PlN0cmluZyhpKS5wYWRTdGFydCgyLCIwIikpLmpvaW4oIjoiKTpgJHtTdHJpbmcobykucGFkU3RhcnQoMiwiMCIpfToke1N0cmluZyhuKS5wYWRTdGFydCgyLCIwIil9YH1mdW5jdGlvbiBoKHQsZSxvKXtpZighc3x8IVV8fCFCfHwhTClyZXR1cm47aWYoYj10fHwiaWRsZSIsYj09PSJyZWNvcmRpbmcifHxiPT09InBhdXNlZCIpe3MuY2xhc3NMaXN0LmFkZCgiaXMtaGlkZGVuIiksVS5jbGFzc0xpc3QucmVtb3ZlKCJpcy1oaWRkZW4iKSxSJiZSLmNsYXNzTGlzdC5hZGQoImlzLWhpZGRlbiIpLG0mJm0uY2xhc3NMaXN0LmFkZCgiaXMtaGlkZGVuIik7Y29uc3QgaT1lP25ldyBEYXRlKGUpLmdldFRpbWUoKTpEYXRlLm5vdygpLGM9KCk9Pnt3JiYody50ZXh0Q29udGVudD1hKCJyZXN1bWUiKSksTC50ZXh0Q29udGVudD1hKCJwYXVzZWQiKX0sST0oKT0+e3cmJih3LnRleHRDb250ZW50PWEoInBhdXNlIikpLEwudGV4dENvbnRlbnQ9YSgicmVjb3JkaW5nRWxsaXBzaXMiKX07aWYoYj09PSJwYXVzZWQiKWcmJihjbGVhckludGVydmFsKGcpLGc9bnVsbCksQi50ZXh0Q29udGVudD16KHR5cGVvZiBvPT0ibnVtYmVyIj9vOjApLGMoKTtlbHNle2NvbnN0IE89KCk9PntCLnRleHRDb250ZW50PXooTWF0aC5mbG9vcigoRGF0ZS5ub3coKS1pKS8xZTMpKX07TygpLGcmJmNsZWFySW50ZXJ2YWwoZyksZz1zZXRJbnRlcnZhbChPLDFlMyksSSgpfX1lbHNlIGcmJihjbGVhckludGVydmFsKGcpLGc9bnVsbCkscy5jbGFzc0xpc3QucmVtb3ZlKCJpcy1oaWRkZW4iKSxVLmNsYXNzTGlzdC5hZGQoImlzLWhpZGRlbiIpLFImJlIuY2xhc3NMaXN0LnJlbW92ZSgiaXMtaGlkZGVuIiksTC50ZXh0Q29udGVudD1hKCJyZWFkeVRvUmVjb3JkIiksTSgpfWZ1bmN0aW9uIFYodCl7Y29uc3QgZT0hISh0IT1udWxsJiZ0LnRva2VuKTtpZihfJiZfLmNsYXNzTGlzdC5hZGQoImlzLWhpZGRlbiIpLEQmJkQuY2xhc3NMaXN0LnRvZ2dsZSgiaXMtaGlkZGVuIixlKSxOJiZOLmNsYXNzTGlzdC50b2dnbGUoImlzLWhpZGRlbiIsIWUpLGUpe2NvbnN0IG89dC5uYW1lfHwodC5lbWFpbD90LmVtYWlsLnNwbGl0KCJAIilbMF06bnVsbCl8fCJVc2VyIjtGJiYoRi50ZXh0Q29udGVudD1vKSx1JiYodS50aXRsZT10LmVtYWlsfHwiIix0LmF2YXRhclVybD8odS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2U9YHVybCgke3QuYXZhdGFyVXJsfSlgLHUuc3R5bGUuYmFja2dyb3VuZFNpemU9ImNvdmVyIix1LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbj0iY2VudGVyIix1LnRleHRDb250ZW50PSIiKToodS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2U9IiIsdS5zdHlsZS5iYWNrZ3JvdW5kU2l6ZT0iIix1LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbj0iIix1LnRleHRDb250ZW50PShvWzBdfHwiVSIpLnRvVXBwZXJDYXNlKCkpKX1DJiYoQy5ocmVmPUooKSksVCYmKFQuaHJlZj1RKCkpLCFlJiZyJiYoci50ZXh0Q29udGVudD0iIil9ZnVuY3Rpb24gUCh0LGUpe2lmKCFyKXJldHVybjtpZihyLmNsYXNzTGlzdC5yZW1vdmUoImNhbGxzLWNvdW50LXBpbGwtLXVwZ3JhZGUiLCJjYWxscy1jb3VudC1waWxsLS1oaWRkZW4iKSx0eXBlb2YgdCE9Im51bWJlciJ8fHQ8MCl7ci50ZXh0Q29udGVudD0iIixyLmNsYXNzTGlzdC5hZGQoImNhbGxzLWNvdW50LXBpbGwtLWhpZGRlbiIpLHIucmVtb3ZlQXR0cmlidXRlKCJ0aXRsZSIpLHIucmVtb3ZlQXR0cmlidXRlKCJyb2xlIik7cmV0dXJufWNvbnN0IG89dHlwZW9mIGU9PSJudW1iZXIiJiZ0Pj1lO2U9PT1udWxsfHx0eXBlb2YgZSE9Im51bWJlciI/KHIudGV4dENvbnRlbnQ9YSgiY2FsbHNDb3VudFVubGltaXRlZCIsW1N0cmluZyh0KV0pLHIudGl0bGU9YSgidGl0bGVVbmxpbWl0ZWRDYWxscyIpLHIucmVtb3ZlQXR0cmlidXRlKCJyb2xlIikpOihyLnRleHRDb250ZW50PWEoImNhbGxzQ291bnRGcmVlIixbU3RyaW5nKHQpLFN0cmluZyhlKV0pLG8/KHIuY2xhc3NMaXN0LmFkZCgiY2FsbHMtY291bnQtcGlsbC0tdXBncmFkZSIpLHIudGl0bGU9YSgidGl0bGVVc2VkQWxsRnJlZUNhbGxzIiksci5zZXRBdHRyaWJ1dGUoInJvbGUiLCJidXR0b24iKSk6KHIudGl0bGU9ZSE9PW51bGw/YSgidGl0bGVGcmVlUGxhbkNhbGxzIik6YSgidGl0bGVVbmxpbWl0ZWRDYWxscyIpLHIucmVtb3ZlQXR0cmlidXRlKCJyb2xlIikpKX1hc3luYyBmdW5jdGlvbiB1dCgpe3RyeXtjb25zdCBlPShhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoeCkpW3hdO2YmJihmLmNoZWNrZWQ9ZSE9PSExKX1jYXRjaHtmJiYoZi5jaGVja2VkPSEwKX19ZnVuY3Rpb24gZ3QoKXtmJiZjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoe1t4XTpmLmNoZWNrZWR9KX1hc3luYyBmdW5jdGlvbiBtdCgpe3RyeXtjb25zdCB0PWF3YWl0IGN0KCk7bCYmKGwuY2hlY2tlZD10Lm1pYyksZCYmKGQuY2hlY2tlZD10LnBhcnRpY2lwYW50cyl9Y2F0Y2h7bCYmKGwuY2hlY2tlZD0hMCksZCYmKGQuY2hlY2tlZD0hMCl9fWZ1bmN0aW9uIGZ0KCl7aXQoe21pYzpsP2wuY2hlY2tlZDohMCxwYXJ0aWNpcGFudHM6ZD9kLmNoZWNrZWQ6ITB9KX1mdW5jdGlvbiBYKCl7Y2hyb21lLnRhYnMuY3JlYXRlKHt1cmw6ZHQoKX0pLHdpbmRvdy5jbG9zZSgpfWNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigodCxlLG8pPT57aWYodC5hY3Rpb249PT0iYXV0aC1jb21wbGV0ZSImJnQudG9rZW4pe2NvbnN0IG49dC5lbWFpbHx8IiIsaT10Lm5hbWV8fCIiLGM9dC5hdmF0YXJVcmx8fCIiO3JldHVybiBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoe2FmdGVyVGhlQ2FsbEF1dGhUb2tlbjp0LnRva2VuLGFmdGVyVGhlQ2FsbEVtYWlsOm4sYWZ0ZXJUaGVDYWxsTmFtZTppLGFmdGVyVGhlQ2FsbEF2YXRhclVybDpjfSkudGhlbigoKT0+e1Yoe3Rva2VuOnQudG9rZW4sZW1haWw6bixuYW1lOmksYXZhdGFyVXJsOmN9KSxvKHtvazohMH0pfSksITB9fSk7bGV0IHA9ITEsdj0hMSx5PW51bGwsUz0hMTthc3luYyBmdW5jdGlvbiBNKCl7Y29uc3QgZT1ZKCk/P3k7aWYoZT09bnVsbCl7Y29uc3Rbbl09YXdhaXQgY2hyb21lLnRhYnMucXVlcnkoe2FjdGl2ZTohMCxjdXJyZW50V2luZG93OiEwfSk7eT0obj09bnVsbD92b2lkIDA6bi5pZCk/P251bGwscD1uIT1udWxsJiZuLnVybD9IKG4udXJsKTohMX1lbHNlIHRyeXtjb25zdCBuPWF3YWl0IGNocm9tZS50YWJzLmdldChlKTt5PW4uaWQscD1uLnVybD9IKG4udXJsKTohMX1jYXRjaHt5PW51bGwscD0hMX1pZih2PSExLHAmJnkhPW51bGwpdHJ5e2NvbnN0IG49YXdhaXQgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe2FjdGlvbjoiaXNBY3RpdmVNZWV0aW5nVGFiIix0YWJJZDp5fSk7dj0hIShuIT1udWxsJiZuLmFjdGl2ZSl9Y2F0Y2h7dj0hMX1jb25zdCBvPXAmJnY7aWYobSYmKHA/dj9tLmNsYXNzTGlzdC5hZGQoImlzLWhpZGRlbiIpOihtLnRleHRDb250ZW50PWEoIm5vQWN0aXZlQ2FsbFdhcm5pbmciKSxtLmNsYXNzTGlzdC5yZW1vdmUoImlzLWhpZGRlbiIpKToobS50ZXh0Q29udGVudD1hKCJtZWV0aW5nV2FybmluZyIpLG0uY2xhc3NMaXN0LnJlbW92ZSgiaXMtaGlkZGVuIikpKSxTPSExLHMpe2NvbnN0IG49bCYmbC5jaGVja2VkfHxkJiZkLmNoZWNrZWQ7cy5kaXNhYmxlZD0hb3x8IW59aWYobyl7Y29uc3Qgbj1hd2FpdCBrKCk7aWYobiE9bnVsbCYmbi50b2tlbil0cnl7Y29uc3R7dG90YWw6aSxjYWxsc0xpbWl0OmN9PWF3YWl0IEEobi50b2tlbik7UChpLGMpLHR5cGVvZiBjPT0ibnVtYmVyIiYmaT49Yz8oUz0hMCxzJiYocy5kaXNhYmxlZD0hMSxzLnRleHRDb250ZW50PWEoInVwZ3JhZGVUb1JlY29yZCIpKSk6cyYmIVMmJihzLnRleHRDb250ZW50PWEoInN0YXJ0UmVjb3JkaW5nIikpfWNhdGNoe3MmJihzLnRleHRDb250ZW50PWEoInN0YXJ0UmVjb3JkaW5nIikpfX1lbHNlIHMmJihzLnRleHRDb250ZW50PWEoInN0YXJ0UmVjb3JkaW5nIikpO2lmKCFvKXtjb25zdCBuPWF3YWl0IGsoKTtpZihuIT1udWxsJiZuLnRva2VuKXRyeXtjb25zdHt0b3RhbDppLGNhbGxzTGltaXQ6Y309YXdhaXQgQShuLnRva2VuKTtQKGksYyl9Y2F0Y2h7fX19ZnVuY3Rpb24gWigpe3JldHVybmAke0V9L2Rhc2hib2FyZC91cGdyYWRlYH1hc3luYyBmdW5jdGlvbiBwdCgpe2NvbnN0IHQ9WSgpO2lmKHQhPW51bGwpcmV0dXJuIHQ7Y29uc3RbZV09YXdhaXQgY2hyb21lLnRhYnMucXVlcnkoe2FjdGl2ZTohMCxjdXJyZW50V2luZG93OiEwfSk7cmV0dXJuKGU9PW51bGw/dm9pZCAwOmUuaWQpPz9udWxsfWFzeW5jIGZ1bmN0aW9uIGh0KCl7aWYoIXMpcmV0dXJuO2lmKFMpe2Nocm9tZS50YWJzLmNyZWF0ZSh7dXJsOlooKX0pLHdpbmRvdy5jbG9zZSgpO3JldHVybn1jb25zdCB0PWF3YWl0IGsoKTtpZighKHQhPW51bGwmJnQudG9rZW4pfHwhcHx8IXYpcmV0dXJuO2NvbnN0IGU9YXdhaXQgcHQoKTtpZighZSlyZXR1cm47Y29uc3Qgbz17bWljOmw/bC5jaGVja2VkOiEwLHBhcnRpY2lwYW50czpkP2QuY2hlY2tlZDohMH07aWYoIW8ubWljJiYhby5wYXJ0aWNpcGFudHMpcmV0dXJuO2NvbnN0IG49bmV3IERhdGUoKS50b0lTT1N0cmluZygpO2goITAsbiksY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe2FjdGlvbjoic3RhcnRSZWNvcmRpbmciLHRhYklkOmUsb3B0aW9uczpvfSksd2luZG93LmNsb3NlKCl9ZnVuY3Rpb24geXQoKXtjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7YWN0aW9uOiJzdG9wUmVjb3JkaW5nIn0pLGgoImlkbGUiKX1mdW5jdGlvbiB2dCgpe2lmKGI9PT0icGF1c2VkIil7Y2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe2FjdGlvbjoicmVzdW1lUmVjb3JkaW5nIn0pLGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHthY3Rpb246ImdldFJlY29yZGluZ1N0YXRlIn0sdD0+e2goKHQ9PW51bGw/dm9pZCAwOnQuc3RhdGUpfHwicmVjb3JkaW5nIix0PT1udWxsP3ZvaWQgMDp0LnJlY29yZGluZ1N0YXJ0VGltZSx0PT1udWxsP3ZvaWQgMDp0LmVsYXBzZWRTZWNvbmRzKX0pLHdpbmRvdy5jbG9zZSgpO3JldHVybn1iPT09InJlY29yZGluZyImJihjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7YWN0aW9uOiJwYXVzZVJlY29yZGluZyJ9KSxjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7YWN0aW9uOiJnZXRSZWNvcmRpbmdTdGF0ZSJ9LHQ9PntoKCh0PT1udWxsP3ZvaWQgMDp0LnN0YXRlKXx8InBhdXNlZCIsdD09bnVsbD92b2lkIDA6dC5yZWNvcmRpbmdTdGFydFRpbWUsdD09bnVsbD92b2lkIDA6dC5lbGFwc2VkU2Vjb25kcyl9KSx3aW5kb3cuY2xvc2UoKSl9YXN5bmMgZnVuY3Rpb24gd3QoKXtsZXQgdD1hd2FpdCBrKCk7aWYodCE9bnVsbCYmdC50b2tlbil0cnl7YXdhaXQgZXQodC50b2tlbil9Y2F0Y2goZSl7KGU9PW51bGw/dm9pZCAwOmUuY29kZSk9PT1udCYmKGF3YWl0IG90KCksdD17dG9rZW46bnVsbCxlbWFpbDoiIixuYW1lOiIiLGF2YXRhclVybDoiIn0pfWlmKFYodCksYXdhaXQgdXQoKSxhd2FpdCBtdCgpLHQhPW51bGwmJnQudG9rZW4pdHJ5e2NvbnN0e3RvdGFsOmUsY2FsbHNMaW1pdDpvfT1hd2FpdCBBKHQudG9rZW4pO1AoZSxvKX1jYXRjaHt9YXdhaXQgTSgpO3RyeXtjb25zdCBlPWF3YWl0IG5ldyBQcm9taXNlKG89PntjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7YWN0aW9uOiJnZXRSZWNvcmRpbmdTdGF0ZSJ9LG8pfSk7ZSE9bnVsbCYmZS5pc1JlY29yZGluZz9oKGUuc3RhdGV8fCJyZWNvcmRpbmciLGUucmVjb3JkaW5nU3RhcnRUaW1lLGUuZWxhcHNlZFNlY29uZHMpOmgoImlkbGUiKX1jYXRjaHtoKCJpZGxlIil9fSQmJiQuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLFgpO1cmJlcuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLFgpO0MmJkMuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLHQ9Pnt0LnByZXZlbnREZWZhdWx0KCksY2hyb21lLnRhYnMuY3JlYXRlKHt1cmw6SigpfSksd2luZG93LmNsb3NlKCl9KTtUJiZULmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIix0PT57dC5wcmV2ZW50RGVmYXVsdCgpLGNocm9tZS50YWJzLmNyZWF0ZSh7dXJsOlEoKX0pLHdpbmRvdy5jbG9zZSgpfSk7ZiYmZi5hZGRFdmVudExpc3RlbmVyKCJjaGFuZ2UiLGd0KTtpZihsfHxkKXtjb25zdCB0PSgpPT57ZnQoKSxNKCl9O2wmJmwuYWRkRXZlbnRMaXN0ZW5lcigiY2hhbmdlIix0KSxkJiZkLmFkZEV2ZW50TGlzdGVuZXIoImNoYW5nZSIsdCl9cyYmcy5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsaHQpO3EmJnEuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLHl0KTt3JiZ3LmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIix2dCk7ciYmci5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsKCk9PntyLmNsYXNzTGlzdC5jb250YWlucygiY2FsbHMtY291bnQtcGlsbC0tdXBncmFkZSIpJiYoY2hyb21lLnRhYnMuY3JlYXRlKHt1cmw6WigpfSksd2luZG93LmNsb3NlKCkpfSk7ZnVuY3Rpb24gSyh0KXtjb25zdCBlPXQucXVlcnlTZWxlY3RvcigiLnRvb2x0aXAiKTtpZighZSlyZXR1cm47Y29uc3Qgbz10LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO2Uuc3R5bGUudG9wPWAke28uYm90dG9tKzh9cHhgfWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIi5pbmZvLWljb24td3JhcCIpLmZvckVhY2godD0+e3QuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLGU9PmUuc3RvcFByb3BhZ2F0aW9uKCkpLHQuYWRkRXZlbnRMaXN0ZW5lcigibW91c2VlbnRlciIsKCk9PksodCkpLHQuYWRkRXZlbnRMaXN0ZW5lcigiZm9jdXMiLCgpPT5LKHQpKX0pO3R0KCk7ZG9jdW1lbnQudGl0bGU9YSgicG9wdXBUaXRsZSIpO2NvbnN0IGo9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiLnZlcnNpb24iKTtqJiYoai50ZXh0Q29udGVudD1hKCJ2ZXJzaW9uIixjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpLnZlcnNpb258fCIxLjAuMCIpKTt3dCgpOwo=\"></script>\n    <link rel=\"modulepreload\" crossorigin href=\"data:text/javascript;base64,Y29uc3QgUz0iaHR0cHM6Ly93d3cuYWZ0ZXJ0aGVjYWxsLmlvIixhPVMrIi9hcGkiO2Z1bmN0aW9uIGkodCxlKXtyZXR1cm4gdHlwZW9mIGNocm9tZTwidSImJmNocm9tZS5pMThuJiZjaHJvbWUuaTE4bi5nZXRNZXNzYWdlP0FycmF5LmlzQXJyYXkoZSk/Y2hyb21lLmkxOG4uZ2V0TWVzc2FnZSh0LGUpfHx0OmUhPW51bGw/Y2hyb21lLmkxOG4uZ2V0TWVzc2FnZSh0LFtTdHJpbmcoZSldKXx8dDpjaHJvbWUuaTE4bi5nZXRNZXNzYWdlKHQpfHx0OnR9ZnVuY3Rpb24gJCh0PWRvY3VtZW50KXt0LnF1ZXJ5U2VsZWN0b3JBbGwoIltkYXRhLWkxOG5dIikuZm9yRWFjaChlPT57Y29uc3Qgcj1lLmdldEF0dHJpYnV0ZSgiZGF0YS1pMThuIik7ciYmKGUudGV4dENvbnRlbnQ9aShyKSl9KSx0LnF1ZXJ5U2VsZWN0b3JBbGwoIltkYXRhLWkxOG4tcGxhY2Vob2xkZXJdIikuZm9yRWFjaChlPT57Y29uc3Qgcj1lLmdldEF0dHJpYnV0ZSgiZGF0YS1pMThuLXBsYWNlaG9sZGVyIik7ciYmKGUucGxhY2Vob2xkZXI9aShyKSl9KSx0LnF1ZXJ5U2VsZWN0b3JBbGwoIltkYXRhLWkxOG4tdGl0bGVdIikuZm9yRWFjaChlPT57Y29uc3Qgcj1lLmdldEF0dHJpYnV0ZSgiZGF0YS1pMThuLXRpdGxlIik7ciYmKGUudGl0bGU9aShyKSl9KSx0LnF1ZXJ5U2VsZWN0b3JBbGwoIltkYXRhLWkxOG4tYXJpYS1sYWJlbF0iKS5mb3JFYWNoKGU9Pntjb25zdCByPWUuZ2V0QXR0cmlidXRlKCJkYXRhLWkxOG4tYXJpYS1sYWJlbCIpO3ImJmUuc2V0QXR0cmlidXRlKCJhcmlhLWxhYmVsIixpKHIpKX0pfWNvbnN0IGQ9T2JqZWN0LmZyZWV6ZSh7IkNvbnRlbnQtVHlwZSI6ImFwcGxpY2F0aW9uL2pzb24iLEFjY2VwdDoiYXBwbGljYXRpb24vanNvbiJ9KSxPPSJBVVRIX0VYUElSRUQiO2Z1bmN0aW9uIGwodCxlKXtjb25zdCByPXR5cGVvZih0PT1udWxsP3ZvaWQgMDp0Lm1lc3NhZ2UpPT0ic3RyaW5nIiYmdC5tZXNzYWdlLnRyaW0oKS5sZW5ndGg+MD90Lm1lc3NhZ2UudHJpbSgpOnR5cGVvZih0PT1udWxsP3ZvaWQgMDp0LmVycm9yKT09InN0cmluZyImJnQuZXJyb3IudHJpbSgpLmxlbmd0aD4wP3QuZXJyb3IudHJpbSgpOmUscz1uZXcgRXJyb3Iocnx8ZXx8aSgic2Vzc2lvbkV4cGlyZWQiKSk7cmV0dXJuIHMuY29kZT1PLHN9ZnVuY3Rpb24gaCh0LGUpe3JldHVybiB0LnN0YXR1cz09PTQwMXx8dC5zdGF0dXM9PT00MDM/ITA6W2U9PW51bGw/dm9pZCAwOmUubWVzc2FnZSxlPT1udWxsP3ZvaWQgMDplLmVycm9yXS5zb21lKHM9PntpZih0eXBlb2YgcyE9InN0cmluZyIpcmV0dXJuITE7Y29uc3Qgbj1zLnRvTG93ZXJDYXNlKCk7cmV0dXJuIG4uaW5jbHVkZXMoImludmFsaWQgdG9rZW4iKXx8bi5pbmNsdWRlcygidG9rZW4gZXhwaXJlZCIpfSl9YXN5bmMgZnVuY3Rpb24geih0KXtvKHQpO2NvbnN0IGU9YXdhaXQgZmV0Y2goYCR7YX0vYXV0aC9leHRlbnNpb24tdG9rZW5gLHttZXRob2Q6IkdFVCIsaGVhZGVyczp7QWNjZXB0OiJhcHBsaWNhdGlvbi9qc29uIixBdXRob3JpemF0aW9uOmModCl9fSkscj1hd2FpdCBlLmpzb24oKS5jYXRjaCgoKT0+KHt9KSk7aWYoZS5zdGF0dXM9PT00MDF8fGUuc3RhdHVzPT09NDAzKXRocm93IGwocixpKCJzZXNzaW9uRXhwaXJlZCIpKTtpZihlLnN0YXR1cz09PTIwMClyZXR1cm4gcn1mdW5jdGlvbiBvKHQpe2lmKHR5cGVvZiB0IT0ic3RyaW5nInx8dC50cmltKCkubGVuZ3RoPT09MCl0aHJvdyBuZXcgRXJyb3IoIkEgdmFsaWQgc2Vzc2lvbiB0b2tlbiB3YXMgbm90IHByb3ZpZGVkLiIpfWZ1bmN0aW9uIGModCl7Y29uc3QgZT10LnRyaW0oKTtyZXR1cm4vXmJlYXJlclxzKy9pLnRlc3QoZSk/ZTpgQmVhcmVyICR7ZX1gfWFzeW5jIGZ1bmN0aW9uIEkodCl7byh0KTtjb25zdCBlPWF3YWl0IGZldGNoKGAke2F9L2NhbGxzP3BhZ2U9MSZsaW1pdD0xYCx7bWV0aG9kOiJHRVQiLGhlYWRlcnM6e0FjY2VwdDoiYXBwbGljYXRpb24vanNvbiIsQXV0aG9yaXphdGlvbjpjKHQpfX0pLHI9YXdhaXQgZS5qc29uKCkuY2F0Y2goKCk9Pih7fSkpO2lmKGgoZSxyKSl0aHJvdyBsKHIsaSgic2Vzc2lvbkV4cGlyZWQiKSk7aWYoZS5zdGF0dXMhPT0yMDApdGhyb3cgbmV3IEVycm9yKChyPT1udWxsP3ZvaWQgMDpyLmVycm9yKXx8IkZhaWxlZCB0byBsb2FkIHBsYW4iKTtjb25zdCBzPXR5cGVvZiByLnRvdGFsPT0ibnVtYmVyIj9yLnRvdGFsOjAsbj10eXBlb2Ygci5jYWxsc0xpbWl0PT0ibnVtYmVyIj9yLmNhbGxzTGltaXQ6bnVsbDtyZXR1cm57dG90YWw6cyxjYWxsc0xpbWl0Om59fWFzeW5jIGZ1bmN0aW9uIGoodCxlKXtvKHQpO2NvbnN0IHI9YXdhaXQgZmV0Y2goYCR7YX0vY2FsbHMvc3RhcnQtcmVjb3JkaW5nYCx7bWV0aG9kOiJQT1NUIixoZWFkZXJzOnsuLi5kLEF1dGhvcml6YXRpb246Yyh0KX0sYm9keTpKU09OLnN0cmluZ2lmeShlKX0pLHM9YXdhaXQgci5qc29uKCkuY2F0Y2goKCk9Pih7fSkpO2lmKGgocixzKSl0aHJvdyBsKHMsaSgic2Vzc2lvbkV4cGlyZWQiKSk7aWYoci5zdGF0dXM9PT00MDMmJihzPT1udWxsP3ZvaWQgMDpzLmNvZGUpPT09IkZSRUVfTElNSVRfUkVBQ0hFRCIpe2NvbnN0IG49bmV3IEVycm9yKChzPT1udWxsP3ZvaWQgMDpzLmVycm9yKXx8IkZyZWUgcGxhbiBsaW1pdCByZWFjaGVkLiBVcGdyYWRlIGZvciB1bmxpbWl0ZWQgY2FsbHMuIik7dGhyb3cgbi5jb2RlPSJGUkVFX0xJTUlUX1JFQUNIRUQiLG4udXBncmFkZVVybD1zPT1udWxsP3ZvaWQgMDpzLnVwZ3JhZGVVcmwsbn1pZihyLnN0YXR1cyE9PTIwMCYmci5zdGF0dXMhPT0yMDEpdGhyb3cgbmV3IEVycm9yKChzPT1udWxsP3ZvaWQgMDpzLmVycm9yKXx8IkZhaWxlZCB0byBzdGFydCByZWNvcmRpbmciKTtyZXR1cm4gc31hc3luYyBmdW5jdGlvbiBOKHQsZSxyLHM9e30pe2lmKCEociBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSl0aHJvdyBuZXcgRXJyb3IoIkNodW5rIG11c3QgYmUgYW4gQXJyYXlCdWZmZXIiKTtjb25zdHt3b3JrZXJDaHVua1VybDpuLHVwbG9hZFRva2VuOlR9PXM7aWYobiYmVCl7Y29uc3QgdT1uLnJlcGxhY2UoL1wvKyQvLCIiKSxiPWF3YWl0IGZldGNoKGAke3V9L2FwaS9jYWxscy8ke2V9L2NodW5rc2Ase21ldGhvZDoiUE9TVCIsaGVhZGVyczp7QXV0aG9yaXphdGlvbjpgQmVhcmVyICR7VC50cmltKCl9YCwiQ29udGVudC1UeXBlIjoiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtIn0sYm9keTpyfSk7aWYoYi5zdGF0dXMhPT0yMDApe2NvbnN0IGc9YXdhaXQgYi5qc29uKCkuY2F0Y2goKCk9Pih7fSkpO3Rocm93IG5ldyBFcnJvcigoZz09bnVsbD92b2lkIDA6Zy5lcnJvcil8fCJGYWlsZWQgdG8gdXBsb2FkIGNodW5rIil9cmV0dXJufW8odCk7Y29uc3QgUj1uZXcgQmxvYihbcl0se3R5cGU6ImF1ZGlvL3dlYm0ifSksXz1uZXcgRm9ybURhdGE7Xy5hcHBlbmQoImNodW5rIixSLCJjaHVuay53ZWJtIik7Y29uc3QgQz1hd2FpdCBmZXRjaChgJHthfS9jYWxscy8ke2V9L2NodW5rc2Ase21ldGhvZDoiUE9TVCIsaGVhZGVyczp7QXV0aG9yaXphdGlvbjpjKHQpfSxib2R5Ol99KTtpZihDLnN0YXR1cyE9PTIwMCl7Y29uc3QgdT1hd2FpdCBDLmpzb24oKS5jYXRjaCgoKT0+KHt9KSk7dGhyb3cgbmV3IEVycm9yKCh1PT1udWxsP3ZvaWQgMDp1LmVycm9yKXx8IkZhaWxlZCB0byB1cGxvYWQgY2h1bmsiKX19YXN5bmMgZnVuY3Rpb24gUCh0LGUscil7byh0KTtjb25zdCBzPWF3YWl0IGZldGNoKGAke2F9L2NhbGxzLyR7ZX0vZmluYWxpemVgLHttZXRob2Q6IlBPU1QiLGhlYWRlcnM6ey4uLmQsQXV0aG9yaXphdGlvbjpjKHQpfSxib2R5OkpTT04uc3RyaW5naWZ5KHJ8fHt9KX0pLG49YXdhaXQgcy5qc29uKCkuY2F0Y2goKCk9Pih7fSkpO2lmKGgocyxuKSl0aHJvdyBsKG4saSgic2Vzc2lvbkV4cGlyZWQiKSk7aWYocy5zdGF0dXMhPT0yMDAmJnMuc3RhdHVzIT09MjAxKXRocm93IG5ldyBFcnJvcigobj09bnVsbD92b2lkIDA6bi5lcnJvcil8fCJGYWlsZWQgdG8gZmluYWxpemUiKTtyZXR1cm4gbn1hc3luYyBmdW5jdGlvbiB4KHQsZSxyKXtvKHQpO2NvbnN0IHM9YXdhaXQgZmV0Y2goYCR7YX0vY2FsbHMvJHtlfWAse21ldGhvZDoiUEFUQ0giLGhlYWRlcnM6ey4uLmQsQXV0aG9yaXphdGlvbjpjKHQpfSxib2R5OkpTT04uc3RyaW5naWZ5KHtzdGF0dXM6cn0pfSksbj1hd2FpdCBzLmpzb24oKS5jYXRjaCgoKT0+KHt9KSk7aWYoaChzLG4pKXRocm93IGwobixpKCJzZXNzaW9uRXhwaXJlZCIpKTtpZihzLnN0YXR1cyE9PTIwMCYmcy5zdGF0dXMhPT0yMDEpdGhyb3cgbmV3IEVycm9yKChuPT1udWxsP3ZvaWQgMDpuLmVycm9yKXx8IkZhaWxlZCB0byB1cGRhdGUgY2FsbCBzdGF0dXMiKTtyZXR1cm4gbn1hc3luYyBmdW5jdGlvbiBGKHQsZSl7byh0KTtjb25zdCByPWF3YWl0IGZldGNoKGAke2F9L2NhbGxzLyR7ZX1gLHttZXRob2Q6IlBBVENIIixoZWFkZXJzOnsuLi5kLEF1dGhvcml6YXRpb246Yyh0KX0sYm9keTpKU09OLnN0cmluZ2lmeSh7c3RhdHVzOiJkaXNjYXJkZWQifSl9KSxzPWF3YWl0IHIuanNvbigpLmNhdGNoKCgpPT4oe30pKTtpZihoKHIscykpdGhyb3cgbChzLGkoInNlc3Npb25FeHBpcmVkIikpO2lmKHIuc3RhdHVzIT09MjAwJiZyLnN0YXR1cyE9PTIwMSl0aHJvdyBuZXcgRXJyb3IoKHM9PW51bGw/dm9pZCAwOnMuZXJyb3IpfHwiRmFpbGVkIHRvIGRpc2NhcmQgY2FsbCIpO3JldHVybiBzfWNvbnN0IGY9ImFmdGVyVGhlQ2FsbEF1dGhUb2tlbiIsbT0iYWZ0ZXJUaGVDYWxsRW1haWwiLHc9ImFmdGVyVGhlQ2FsbE5hbWUiLEU9ImFmdGVyVGhlQ2FsbEF2YXRhclVybCI7YXN5bmMgZnVuY3Rpb24gVSh0PXt9KXtjb25zdCBlPSh0PT1udWxsP3ZvaWQgMDp0LmtlZXBFbWFpbCkhPT0hMSxyPVtmLHcsRV07ZXx8ci5wdXNoKG0pLGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLnJlbW92ZShyKX1hc3luYyBmdW5jdGlvbiBMKCl7Y29uc3QgdD1hd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW2YsbSx3LEVdKSxlPXR5cGVvZih0PT1udWxsP3ZvaWQgMDp0W2ZdKT09InN0cmluZyI/dFtmXTpudWxsLHI9dHlwZW9mKHQ9PW51bGw/dm9pZCAwOnRbbV0pPT0ic3RyaW5nIj90W21dOiIiLHM9dHlwZW9mKHQ9PW51bGw/dm9pZCAwOnRbd10pPT0ic3RyaW5nIj90W3ddOiIiLG49dHlwZW9mKHQ9PW51bGw/dm9pZCAwOnRbRV0pPT0ic3RyaW5nIj90W0VdOiIiO3JldHVybnt0b2tlbjplLGVtYWlsOnIsbmFtZTpzLGF2YXRhclVybDpufX1jb25zdCBBPSJhZnRlcnRoZWNhbGxfcmVjb3JkaW5nX21pYyIscD0iYWZ0ZXJ0aGVjYWxsX3JlY29yZGluZ19wYXJ0aWNpcGFudHMiO2FzeW5jIGZ1bmN0aW9uIE0oKXtjb25zdCB0PWF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbQSxwXSk7cmV0dXJue21pYzp0W0FdIT09ITEscGFydGljaXBhbnRzOnRbcF0hPT0hMX19YXN5bmMgZnVuY3Rpb24gSCh0KXthd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoe1tBXTp0Lm1pYyE9PSExLFtwXTp0LnBhcnRpY2lwYW50cyE9PSExfSl9ZXhwb3J0e08gYXMgQSxTIGFzIFcsTCBhcyBhLEkgYXMgYixVIGFzIGMsRiBhcyBkLHggYXMgZSxQIGFzIGYsTSBhcyBnLEggYXMgaCwkIGFzIGksaiBhcyBzLGkgYXMgdCxOIGFzIHUseiBhcyB2fTsK\">\n    <link rel=\"stylesheet\" crossorigin href=\"data:text/css;base64,OnJvb3R7Y29sb3Itc2NoZW1lOmxpZ2h0O2ZvbnQtZmFtaWx5OkludGVyLHN5c3RlbS11aSwtYXBwbGUtc3lzdGVtLHNhbnMtc2VyaWY7LS10ZXh0LXByaW1hcnk6ICMwZjE3MmE7LS10ZXh0LW11dGVkOiAjNjQ3NDhiOy0tc3VyZmFjZTogI2ZmZmZmZjstLXByaW1hcnk6ICM0ZjQ2ZTU7LS1wcmltYXJ5LWhvdmVyOiAjNDMzOGNhOy0tYm9yZGVyOiAjZTJlOGYwOy0tdG9nZ2xlLWJnOiAjZTJlOGYwOy0tdG9nZ2xlLWNoZWNrZWQ6ICM0ZjQ2ZTV9Kntib3gtc2l6aW5nOmJvcmRlci1ib3h9Ym9keXttYXJnaW46MDttaW4td2lkdGg6MzcwcHg7bWF4LXdpZHRoOjM3MHB4O2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZSk7Zm9udC1mYW1pbHk6aW5oZXJpdDtjb2xvcjp2YXIoLS10ZXh0LXByaW1hcnkpfS5wb3B1cHt3aWR0aDoxMDAlfS5jYXJke3BhZGRpbmc6MjRweH0uY2FyZF9fYnJhbmR7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6MTJweDttYXJnaW4tYm90dG9tOjEycHh9LmNhcmRfX2xvZ297d2lkdGg6NDBweDtoZWlnaHQ6NDBweDtmbGV4LXNocmluazowO2JvcmRlci1yYWRpdXM6MTBweH0uY2FyZF9fbG9nby0taW1ne2Rpc3BsYXk6YmxvY2s7b2JqZWN0LWZpdDpjb250YWlufS5jYXJkX190aXRsZXttYXJnaW46MDtmb250LXNpemU6MThweDtmb250LXdlaWdodDo2MDA7Y29sb3I6dmFyKC0tdGV4dC1wcmltYXJ5KX0uY2FyZF9fc3VidGl0bGV7bWFyZ2luOjAgMCAyMHB4O2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjQwMDtjb2xvcjp2YXIoLS10ZXh0LW11dGVkKX0ucGFuZWx7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0ucGFuZWwuaXMtaGlkZGVue2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9LmxvYWRpbmctcGFuZWx7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7bWluLWhlaWdodDoxNDBweDtnYXA6MTJweH0ubG9hZGluZy1wYW5lbF9fc3Bpbm5lcnt3aWR0aDozMnB4O2hlaWdodDozMnB4O2JvcmRlcjozcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItdG9wLWNvbG9yOnZhcigtLXByaW1hcnkpO2JvcmRlci1yYWRpdXM6NTAlO2FuaW1hdGlvbjpsb2FkaW5nLXNwaW4gLjVzIGxpbmVhciBpbmZpbml0ZX0ubG9hZGluZy1wYW5lbF9fdGV4dHttYXJnaW46MDtmb250LXNpemU6MTRweDtjb2xvcjp2YXIoLS10ZXh0LW11dGVkKX1Aa2V5ZnJhbWVzIGxvYWRpbmctc3Bpbnt0b3t0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9fS5hdXRoLWFjdGlvbnN7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6MTBweH0uYnV0dG9ue3dpZHRoOjEwMCU7Ym9yZGVyLXJhZGl1czoxMHB4O3BhZGRpbmc6MTJweCAxNnB4O2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMDtib3JkZXI6bm9uZTtjdXJzb3I6cG9pbnRlcjt0cmFuc2l0aW9uOmJhY2tncm91bmQgLjE1cyBlYXNlLGNvbG9yIC4xNXMgZWFzZTtmb250LWZhbWlseTppbmhlcml0fS5idXR0b24tLXByaW1hcnl7YmFja2dyb3VuZDp2YXIoLS1wcmltYXJ5KTtjb2xvcjojZmZmfS5idXR0b24tLXByaW1hcnk6aG92ZXJ7YmFja2dyb3VuZDp2YXIoLS1wcmltYXJ5LWhvdmVyKX0uYnV0dG9uLS1zZWNvbmRhcnl7YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlKTtjb2xvcjp2YXIoLS10ZXh0LXByaW1hcnkpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKX0uYnV0dG9uLS1zZWNvbmRhcnk6aG92ZXJ7YmFja2dyb3VuZDojZjhmYWZjfS5sb2dnZWQtaW5fX2hlYWRlcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDoxMnB4O21hcmdpbi1ib3R0b206MTZweH0uYXZhdGFye3dpZHRoOjQwcHg7aGVpZ2h0OjQwcHg7Ym9yZGVyLXJhZGl1czo1MCU7YmFja2dyb3VuZDp2YXIoLS1wcmltYXJ5KTtjb2xvcjojZmZmO2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtmb250LXNpemU6MTZweDtmb250LXdlaWdodDo2MDB9LmxvZ2dlZC1pbl9fbWV0YXtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDoycHg7ZmxleDoxO21pbi13aWR0aDowfS5sb2dnZWQtaW5fX25hbWV7Zm9udC1zaXplOjE1cHg7Zm9udC13ZWlnaHQ6NjAwO2NvbG9yOnZhcigtLXRleHQtcHJpbWFyeSl9LmxvZ2dlZC1pbl9fc3RhdHVze2ZvbnQtc2l6ZToxM3B4O2NvbG9yOnZhcigtLXRleHQtbXV0ZWQpfS5jYWxscy1jb3VudC1waWxse2ZsZXgtc2hyaW5rOjA7bWFyZ2luLWxlZnQ6YXV0bztib3JkZXItcmFkaXVzOjk5OTlweDtwYWRkaW5nOjZweCAxMnB4O2ZvbnQtc2l6ZToxM3B4O2ZvbnQtd2VpZ2h0OjUwMDtiYWNrZ3JvdW5kOiM0ZjQ2ZTUwZDtjb2xvcjojMzM0MTU1O3doaXRlLXNwYWNlOm5vd3JhcH0uY2FsbHMtY291bnQtcGlsbC5jYWxscy1jb3VudC1waWxsLS11cGdyYWRle2JhY2tncm91bmQ6IzRmNDZlNTFhO2NvbG9yOnZhcigtLXByaW1hcnkpO2N1cnNvcjpwb2ludGVyfS5jYWxscy1jb3VudC1waWxsLmNhbGxzLWNvdW50LXBpbGwtLXVwZ3JhZGU6aG92ZXJ7YmFja2dyb3VuZDojNGY0NmU1MzN9LmNhbGxzLWNvdW50LXBpbGwuY2FsbHMtY291bnQtcGlsbC0taGlkZGVue2Rpc3BsYXk6bm9uZX0ucmVjb3JkaW5nLW9wdGlvbnN7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6MTBweDttYXJnaW4tYm90dG9tOjE0cHh9LnJlY29yZGluZy1hY3Rpb25ze21hcmdpbi1ib3R0b206MTBweH0jc3RhcnQtcmVjb3JkaW5ne21hcmdpbi1ib3R0b206OHB4fS5yZWNvcmRpbmctc3RhdHVze2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjEwcHh9LnJlY29yZGluZy1zdGF0dXMuaXMtaGlkZGVuLC5yZWNvcmRpbmctaGludC5pcy1oaWRkZW4sLnJlY29yZGluZy1hY3Rpb25zIC5idXR0b24uaXMtaGlkZGVuLC5yZWNvcmRpbmctb3B0aW9ucy5pcy1oaWRkZW57ZGlzcGxheTpub25lIWltcG9ydGFudH0ucmVjb3JkaW5nLXRpbWVye2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjYwMDtjb2xvcjp2YXIoLS10ZXh0LXByaW1hcnkpfS5yZWNvcmRpbmctaGludHtmb250LXNpemU6MTJweDtjb2xvcjp2YXIoLS10ZXh0LW11dGVkKTttYXJnaW46MCAwIDEycHg7bGluZS1oZWlnaHQ6MS40fS5tZWV0aW5nLXdhcm5pbmd7Zm9udC1zaXplOjEycHg7Y29sb3I6I2I0NTMwOTtiYWNrZ3JvdW5kOiNmZmZiZWI7Ym9yZGVyOjFweCBzb2xpZCAjZmNkMzRkO2JvcmRlci1yYWRpdXM6OHB4O3BhZGRpbmc6OHB4IDEwcHg7bWFyZ2luOjAgMCAxMnB4O2xpbmUtaGVpZ2h0OjEuNH0ubWVldGluZy13YXJuaW5nLmlzLWhpZGRlbntkaXNwbGF5Om5vbmUhaW1wb3J0YW50fS5sb2dnZWQtaW5fX3RvZ2dsZXttYXJnaW4tYm90dG9tOjE2cHh9LnRvZ2dsZXtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2dhcDoxMnB4O2N1cnNvcjpwb2ludGVyfS50b2dnbGVfX2xhYmVsLXdyYXB7ZGlzcGxheTppbmxpbmUtZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjZweH0udG9nZ2xlX19sYWJlbHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDA7Y29sb3I6dmFyKC0tdGV4dC1wcmltYXJ5KX0uaW5mby1pY29uLXdyYXB7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTppbmxpbmUtZmxleDtmbGV4LXNocmluazowO2N1cnNvcjpoZWxwO291dGxpbmU6bm9uZX0uaW5mby1pY29uLXdyYXA6Zm9jdXMgLmluZm8taWNvbiwuaW5mby1pY29uLXdyYXA6aG92ZXIgLmluZm8taWNvbntiYWNrZ3JvdW5kOnZhcigtLXByaW1hcnkpfS5pbmZvLWljb24td3JhcDpob3ZlciAudG9vbHRpcCwuaW5mby1pY29uLXdyYXA6Zm9jdXMgLnRvb2x0aXB7b3BhY2l0eToxO3Zpc2liaWxpdHk6dmlzaWJsZX0uaW5mby1pY29ue2Rpc3BsYXk6aW5saW5lLWZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDtib3JkZXItcmFkaXVzOjUwJTtiYWNrZ3JvdW5kOnZhcigtLXRleHQtbXV0ZWQpO2NvbG9yOnZhcigtLXN1cmZhY2UpO2ZvbnQtc2l6ZToxMXB4O2ZvbnQtd2VpZ2h0OjYwMDtsaW5lLWhlaWdodDoxO2ZsZXgtc2hyaW5rOjA7dHJhbnNpdGlvbjpiYWNrZ3JvdW5kIC4xNXMgZWFzZX0udG9vbHRpcHtwb3NpdGlvbjpmaXhlZDtsZWZ0OjUwJTt0b3A6MDt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUpO3dpZHRoOm1heC1jb250ZW50O21heC13aWR0aDptaW4oMjgwcHgsY2FsYygxMDB2dyAtIDQwcHgpKTtwYWRkaW5nOjEwcHggMTJweDtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo0MDA7bGluZS1oZWlnaHQ6MS40NTtjb2xvcjp2YXIoLS10ZXh0LXByaW1hcnkpO2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZSk7Ym9yZGVyOjFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO2JvcmRlci1yYWRpdXM6OHB4O2JveC1zaGFkb3c6MCA0cHggMTJweCAjMGYxNzJhMWY7b3BhY2l0eTowO3Zpc2liaWxpdHk6aGlkZGVuO3RyYW5zaXRpb246b3BhY2l0eSAuMTVzIGVhc2UsdmlzaWJpbGl0eSAuMTVzIGVhc2U7cG9pbnRlci1ldmVudHM6bm9uZTt6LWluZGV4OjEwfS50b29sdGlwOmFmdGVyLC50b29sdGlwOmJlZm9yZXtkaXNwbGF5Om5vbmV9LnRvZ2dsZV9faW5wdXR7cG9zaXRpb246YWJzb2x1dGU7b3BhY2l0eTowO3dpZHRoOjA7aGVpZ2h0OjB9LnRvZ2dsZV9fdHJhY2t7d2lkdGg6NDRweDtoZWlnaHQ6MjRweDtib3JkZXItcmFkaXVzOjEycHg7YmFja2dyb3VuZDp2YXIoLS10b2dnbGUtYmcpO3Bvc2l0aW9uOnJlbGF0aXZlO3RyYW5zaXRpb246YmFja2dyb3VuZCAuMThzIGVhc2V9LnRvZ2dsZV9fdHJhY2s6YWZ0ZXJ7Y29udGVudDoiIjtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MnB4O2xlZnQ6MnB4O3dpZHRoOjIwcHg7aGVpZ2h0OjIwcHg7Ym9yZGVyLXJhZGl1czo1MCU7YmFja2dyb3VuZDojZmZmO2JveC1zaGFkb3c6MCAxcHggM3B4ICMwMDAzO3RyYW5zaXRpb246dHJhbnNmb3JtIC4xOHMgZWFzZX0udG9nZ2xlX19pbnB1dDpjaGVja2VkKy50b2dnbGVfX3RyYWNre2JhY2tncm91bmQ6dmFyKC0tdG9nZ2xlLWNoZWNrZWQpfS50b2dnbGVfX2lucHV0OmNoZWNrZWQrLnRvZ2dsZV9fdHJhY2s6YWZ0ZXJ7dHJhbnNmb3JtOnRyYW5zbGF0ZSgyMHB4KX0ubG9nZ2VkLWluX19uYXZ7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6NHB4fS5uYXYtbGlua3tmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDA7Y29sb3I6dmFyKC0tcHJpbWFyeSk7dGV4dC1kZWNvcmF0aW9uOm5vbmU7cGFkZGluZzo4cHggMH0ubmF2LWxpbms6aG92ZXJ7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX0udmVyc2lvbnttYXJnaW46MDtwYWRkaW5nOjEwcHggMjRweDtmb250LXNpemU6MTFweDtjb2xvcjp2YXIoLS10ZXh0LW11dGVkKTt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItdG9wOjFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO2JhY2tncm91bmQ6I2Y4ZmFmY30K\">\n  </head>\n  <body>\n    <main class=\"popup\">\n      <section class=\"card\" aria-labelledby=\"app-title\">\n        <!-- Loading: checking session -->\n        <div id=\"loading-panel\" class=\"panel loading-panel\" aria-live=\"polite\">\n          <div class=\"loading-panel__spinner\" aria-hidden=\"true\"></div>\n          <p class=\"loading-panel__text\" data-i18n=\"checkingSession\">Checking session…</p>\n        </div>\n        <!-- Logged-out: minimal sign-in -->\n        <div id=\"login-panel\" class=\"panel is-hidden\">\n          <div class=\"card__brand\">\n            <img id=\"popup-logo\" class=\"card__logo card__logo--img\" src=\"\" alt=\"\" aria-hidden=\"true\" />\n            <h1 id=\"app-title\" class=\"card__title\" data-i18n=\"appTitle\">AfterTheCall</h1>\n          </div>\n          <p class=\"card__subtitle\" data-i18n=\"signInSubtitle\">Sign in to start capturing client calls</p>\n          <div class=\"auth-actions\">\n            <button type=\"button\" id=\"continue-google\" class=\"button button--primary\" data-i18n=\"continueGoogle\">Continue with Google</button>\n            <button type=\"button\" id=\"continue-email\" class=\"button button--secondary\" data-i18n=\"continueEmail\">Email login</button>\n          </div>\n        </div>\n\n        <!-- Logged-in: mic/participants toggles, Start/Stop, meeting-tab warning -->\n        <div id=\"logged-in-panel\" class=\"panel is-hidden\">\n          <header class=\"logged-in__header\">\n            <div id=\"user-avatar\" class=\"avatar\" aria-hidden=\"true\"></div>\n            <div class=\"logged-in__meta\">\n              <span id=\"user-name\" class=\"logged-in__name\" data-i18n=\"readyToRecord\">Ready to record</span>\n              <span id=\"logged-in__status\" class=\"logged-in__status\" data-i18n=\"readyToRecord\">Ready to record</span>\n            </div>\n            <span id=\"calls-count\" class=\"calls-count-pill\" aria-hidden=\"true\"></span>\n          </header>\n          <div id=\"recording-options\" class=\"recording-options\">\n            <label class=\"toggle\" for=\"opt-mic\">\n              <span class=\"toggle__label-wrap\">\n                <span class=\"toggle__label\" data-i18n=\"microphone\">Microphone</span>\n                <span class=\"info-icon-wrap\" tabindex=\"0\" role=\"button\" data-i18n-aria-label=\"whatThisDoes\"><span class=\"info-icon\">ℹ</span><span class=\"tooltip\" data-i18n=\"microphoneTooltip\">Record your voice. If you mute yourself in the meeting, we follow that—your voice won’t be in the recording while you’re muted, so it matches what others hear.</span></span>\n              </span>\n              <input type=\"checkbox\" id=\"opt-mic\" class=\"toggle__input\" checked />\n              <span class=\"toggle__track\"></span>\n            </label>\n            <label class=\"toggle\" for=\"opt-participants\">\n              <span class=\"toggle__label-wrap\">\n                <span class=\"toggle__label\" data-i18n=\"participantsLabel\">Participants (call audio)</span>\n                <span class=\"info-icon-wrap\" tabindex=\"0\" role=\"button\" data-i18n-aria-label=\"whatThisDoes\"><span class=\"info-icon\">ℹ</span><span class=\"tooltip\" data-i18n=\"participantsTooltip\">Record everyone else on the call—other participants’ voices.</span></span>\n              </span>\n              <input type=\"checkbox\" id=\"opt-participants\" class=\"toggle__input\" checked />\n              <span class=\"toggle__track\"></span>\n            </label>\n          </div>\n          <div id=\"recording-actions\" class=\"recording-actions\">\n            <button type=\"button\" id=\"start-recording\" class=\"button button--primary\" data-i18n=\"startRecording\">Start recording</button>\n            <div id=\"recording-status\" class=\"recording-status is-hidden\">\n              <span id=\"recording-timer\" class=\"recording-timer\">0:00</span>\n              <button type=\"button\" id=\"pause-resume-recording\" class=\"button button--secondary\" data-i18n=\"pause\">Pause</button>\n              <button type=\"button\" id=\"stop-recording\" class=\"button button--secondary\" data-i18n=\"stop\">Stop</button>\n            </div>\n          </div>\n          <p id=\"meeting-warning\" class=\"meeting-warning is-hidden\" role=\"alert\" data-i18n=\"meetingWarning\">This is not a meeting tab. Switch to Google Meet, Zoom, Webex, or Teams to record.</p>\n          <div class=\"logged-in__toggle\">\n            <label class=\"toggle\" for=\"auto-detect\">\n              <span class=\"toggle__label\" data-i18n=\"autoDetectMeetings\">Auto-detect meetings</span>\n              <input type=\"checkbox\" id=\"auto-detect\" class=\"toggle__input\" checked />\n              <span class=\"toggle__track\"></span>\n            </label>\n          </div>\n          <nav class=\"logged-in__nav\">\n            <a id=\"open-dashboard\" href=\"#\" class=\"nav-link\" data-i18n=\"openDashboard\">Open dashboard</a>\n            <a id=\"open-settings\" href=\"#\" class=\"nav-link\" data-i18n=\"settings\">Settings</a>\n          </nav>\n        </div>\n      </section>\n      <p class=\"version\" data-i18n=\"version\">Version 1.0.0</p>\n    </main>\n  </body>\n</html>\n",
			  "src/offscreen/index.html": "<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\" />\n    <title>Recording Offscreen</title>\n  </head>\n  <body>\n    <script src=\"index.js\"></script>\n  </body>\n</html>\n",
			  "src/permission/index.html": "<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\" />\n    <title id=\"page-title\">Microphone Permission</title>\n    <style>\n      body {\n        font-family: Arial, sans-serif;\n        padding: 20px;\n        text-align: center;\n      }\n      .container {\n        max-width: 400px;\n        margin: 0 auto;\n      }\n      button {\n        background: #4caf50;\n        color: white;\n        border: none;\n        padding: 10px 20px;\n        border-radius: 4px;\n        cursor: pointer;\n        font-size: 16px;\n      }\n      button:hover {\n        background: #45a049;\n      }\n    </style>\n  </head>\n  <body>\n    <div class=\"container\">\n      <h2 id=\"perm-heading\">Microphone Permission Required</h2>\n      <p id=\"perm-desc\">This extension needs microphone access to record audio from your meetings.</p>\n      <button id=\"requestPermission\">Grant Microphone Access</button>\n      <p id=\"status\"></p>\n    </div>\n    <script src=\"index.js\"></script>\n  </body>\n</html>\n",
			  "src/icons/recording.png": "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",
			  "src/icons/logo.svg": "<svg width=\"320\" height=\"160\" viewBox=\"85 170 330 160\" xmlns=\"http://www.w3.org/2000/svg\">\n  <defs>\n    <mask id=\"scoop-mask\">\n      <rect x=\"85\" y=\"170\" width=\"330\" height=\"160\" fill=\"white\" />\n      <circle cx=\"165\" cy=\"250\" r=\"100\" fill=\"black\" />\n    </mask>\n  </defs>\n\n  <circle cx=\"165\" cy=\"250\" r=\"75\" fill=\"#5E5CE6\"/>\n\n  <g mask=\"url(#scoop-mask)\">\n    <rect x=\"180\" y=\"185\" width=\"200\" height=\"30\" rx=\"15\" fill=\"#5E5CE6\" />\n    <rect x=\"180\" y=\"235\" width=\"230\" height=\"30\" rx=\"15\" fill=\"#5E5CE6\" />\n    <rect x=\"180\" y=\"285\" width=\"200\" height=\"30\" rx=\"15\" fill=\"#5E5CE6\" />\n  </g>\n</svg>\n"
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
		      "afterthecall-ai-meeting-notes-for-meet-zoom-teams-webex-whatsapp",
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
	  const scriptName = "AfterTheCall: AI Meeting Notes for Meet, Zoom, Teams, Webex & WhatsApp";
	  const debug = "[AfterTheCall: AI Meeting Notes for Meet, Zoom, Teams, Webex & WhatsApp]";
	  _log(debug + ' Executing background scripts...');
	
	  function executeBackgroundScripts(){
	    with(backgroundPolyfill){
	      // BG: src/background.js
	import{g as z,A as D,c as k,W as P,a as L,d as Z,u as J,t as G,f as X,b as $,s as tt,e as et}from"./popup/storage-CFNkacCJ.js";async function Q(t){try{const r=await chrome.tabs.create({url:t,active:!0}),n=r==null?void 0:r.windowId;if(typeof n=="number")try{await chrome.windows.update(n,{focused:!0})}catch{}return r}catch{return null}}async function Y(t){if(t)try{const r=await chrome.tabs.get(t);if(await chrome.tabs.update(t,{active:!0}),(r==null?void 0:r.windowId)!=null)try{await chrome.windows.update(r.windowId,{focused:!0})}catch{}}catch{}}let s=!1,l=null,_=null,p=null,U=!1,S=null,I=null,y=null;async function W(t){const r=_;if(!r)return;const n=await L();if(n!=null&&n.token)try{await et(n.token,r,t)}catch(u){(u==null?void 0:u.code)===D&&k()}}const v=new Set,B="afterthecall_auto_detect_meetings";let F=null,x=null;const q=async()=>{try{return(await chrome.runtime.getContexts({})).find(n=>n.contextType==="OFFSCREEN_DOCUMENT")?new Promise(n=>{chrome.runtime.sendMessage({type:"test-microphone",target:"offscreen"},u=>{n((u==null?void 0:u.hasAccess)||!1)})}):!1}catch{return!1}},rt=async()=>new Promise(t=>{chrome.tabs.create({url:chrome.runtime.getURL("src/permission/index.html"),active:!0},r=>{const n=(r==null?void 0:r.id)??null;if(!n)return t({granted:null,reason:"no-tab-id"});let u=!1;const T=m=>{if(!u){u=!0;try{chrome.runtime.onMessage.removeListener(A)}catch{}try{chrome.tabs.onRemoved.removeListener(b)}catch{}t(m)}},b=m=>{m===n&&T({granted:null,reason:"tab-closed"})},A=(m,M)=>{var h;(m==null?void 0:m.action)!=="mic-permission-result"||(((h=M==null?void 0:M.tab)==null?void 0:h.id)??null)!==n||T({granted:!!m.granted,reason:"message"})};chrome.tabs.onRemoved.addListener(b),chrome.runtime.onMessage.addListener(A)})}),j=async(t,r,n,u={})=>{var E;const T=u.mic!==!1,b=u.participants!==!1;l=t;const m=(await chrome.runtime.getContexts({})).find(d=>d.contextType==="OFFSCREEN_DOCUMENT");let M=((E=m==null?void 0:m.documentUrl)==null?void 0:E.endsWith("#recording"))??!1;if(!m)await chrome.offscreen.createDocument({url:"src/offscreen/index.html",reasons:[chrome.offscreen.Reason.USER_MEDIA,chrome.offscreen.Reason.DISPLAY_MEDIA],justification:"Recording from chrome.tabCapture API"});else if(M){chrome.runtime.sendMessage({type:"stop-recording",target:"offscreen"}),N(),s=!1,l=null,_=null,I=null,y=null;return}if(T&&!await q()&&(await rt(),!await q()))return;let w;try{w=await chrome.tabs.get(t)}catch{w=(await chrome.tabs.query({active:!0,currentWindow:!0}))[0]}const h=await L();if(!(h!=null&&h.token)){const d=new Error("AUTH_REQUIRED");throw d.code="AUTH_REQUIRED",d}try{const{total:d,callsLimit:C}=await $(h.token);if(typeof C=="number"&&d>=C){const R=new Error(G("freeLimitReached"));throw R.code="FREE_LIMIT_REACHED",R.upgradeUrl="/dashboard/upgrade",R}}catch(d){if((d==null?void 0:d.code)==="FREE_LIMIT_REACHED")throw d}const e=new Date().toISOString();p=e;const o=(w==null?void 0:w.title)||G("untitledMeeting"),a=w!=null&&w.url?K(w.url):"",c=await tt(h.token,{title:o,platform:a||void 0,startedAt:e}),{callId:f}=c;_=f,I=c.uploadToken??null,y=c.workerChunkUrl??null;let i=x;try{const d=await new Promise(C=>{chrome.tabs.sendMessage(t,{action:"getMeetingMicMuted"},R=>{chrome.runtime.lastError?C(null):C(R)})});d&&typeof d.muted=="boolean"&&(i=d.muted)}catch{}chrome.runtime.sendMessage({type:"start-recording",target:"offscreen",data:b&&r||null,micStreamId:n||null,callId:f,options:{mic:T,participants:b,meetingMicMuted:i===!0}}),setTimeout(()=>{!l||!s||chrome.tabs.sendMessage(t,{action:"getMeetingMicMuted"},d=>{chrome.runtime.lastError||!s||d&&typeof d.muted=="boolean"&&chrome.runtime.sendMessage({target:"offscreen",type:"set-meeting-mic-muted",muted:d.muted}).catch(()=>{})})},800),V(),s=!0,l=t};function K(t){if(!t)return"";const n=[{name:"Google Meet",pattern:/https:\/\/meet\.google\.com\//i},{name:"Webex",pattern:/https:\/\/(?:[\w-]+\.)?webex\.com\//i},{name:"Zoom",pattern:/https:\/\/(?:[\w-]+\.)?zoom\.us\//i},{name:"Microsoft Teams",pattern:/https:\/\/(?:[\w-]+\.)?teams\.microsoft\.com\//i},{name:"Microsoft Teams",pattern:/https:\/\/(?:[\w-]+\.)?teams\.live\.com\//i},{name:"WhatsApp",pattern:/https:\/\/web\.whatsapp\.com\//i}].find(({pattern:u})=>u.test(t));return(n==null?void 0:n.name)||""}function V(){const t=chrome.runtime.getURL("src/icons/recording.png");chrome.action.setIcon({path:{16:t,24:t,32:t,48:t,128:t}})}function N(){chrome.action.setIcon({path:{16:chrome.runtime.getURL("src/icons/16.png"),24:chrome.runtime.getURL("src/icons/24.png"),32:chrome.runtime.getURL("src/icons/32.png"),48:chrome.runtime.getURL("src/icons/48.png"),128:chrome.runtime.getURL("src/icons/128.png")}})}function O(){if(!p)return 0;const t=new Date(p).getTime();return Number.isFinite(t)?Math.max(0,Math.floor((Date.now()-t)/1e3)):0}function g(t,r){if(t)try{chrome.tabs.sendMessage(t,{action:"pill-state",...r})}catch{}}chrome.runtime.onMessage.addListener(async(t,r,n)=>{var T,b,A,m,M,w,h;const u=t.tabId!=null?t.tabId:r.tab&&r.tab.id;if(t.action==="getStartRecordingShortcut")return new Promise(e=>{chrome.commands.getAll(o=>{var c;const a=(c=o==null?void 0:o.find)==null?void 0:c.call(o,f=>(f==null?void 0:f.name)==="start-recording");n==null||n({shortcut:(a==null?void 0:a.shortcut)||""}),e(!0)})});if(t.type==="MEETING_STARTED"){const e=(T=r.tab)==null?void 0:T.id;if(e==null)return!0;const o=await new Promise(a=>{chrome.storage.local.get(B,c=>a(c[B]!==!1))});if(v.add(e),o){const a=(c=0)=>{if(!v.has(e))return;const f=5;chrome.tabs.sendMessage(e,{action:"pill-visibility",show:!0}).catch(()=>{c<f-1&&setTimeout(()=>a(c+1),150*(c+1))})};a()}return!0}if(t.type==="MEETING_ENDED"){const e=(b=r.tab)==null?void 0:b.id;if(x=null,e!=null){v.delete(e);const o=(a=0)=>{chrome.tabs.sendMessage(e,{action:"pill-visibility",show:!1}).catch(()=>{a<4&&setTimeout(()=>o(a+1),150*(a+1))})};o()}if(s&&l===e){try{chrome.tabs.sendMessage(e,{action:"pill-state",state:"uploading"})}catch{}chrome.runtime.sendMessage({type:"stop-recording",target:"offscreen"})}return!0}if(t.type==="MEETING_MIC_MUTED"||t.type==="MEETING_MIC_UNMUTED")return x=t.type==="MEETING_MIC_MUTED",chrome.runtime.sendMessage({target:"offscreen",type:"set-meeting-mic-muted",muted:t.type==="MEETING_MIC_MUTED"||x}).catch(()=>{}),!0;if(t.action==="startRecording"){const e=u??((A=r.tab)==null?void 0:A.id);if(!e)return n==null||n({error:"No tab"}),!0;if(!v.has(e))return n==null||n({ok:!1,error:"NO_ACTIVE_MEETING"}),!0;if(s&&l&&l!==e)return await Y(l),n==null||n({ok:!1,error:"ALREADY_RECORDING",recordingTabId:l}),!0;const o=t.options??await z(),a=o.participants!==!1;o.mic;let c=null,f=null;a&&(c=await new Promise(i=>{chrome.tabCapture.getMediaStreamId({targetTabId:e},E=>{i(chrome.runtime.lastError?null:E)})})),f=await new Promise(i=>{chrome.tabCapture.getMediaStreamId({consumerTabId:e},E=>{i(chrome.runtime.lastError?null:E)})});try{await j(e,c,f,o),g(e,{state:"recording",recordingStartTime:p,elapsedSeconds:0})}catch(i){if((i==null?void 0:i.code)===D&&k(),(i==null?void 0:i.code)==="AUTH_REQUIRED"&&(await Q(P+"/login"),g(e,{state:"auth-required"})),(i==null?void 0:i.code)==="FREE_LIMIT_REACHED"){const E=i.upgradeUrl||"/dashboard/upgrade";chrome.tabs.create({url:P+E})}N(),s=!1,l=null,_=null,I=null,y=null,g(e,{state:"idle"})}return!0}else{if(t.action==="stopRecording")return s?(l&&g(l,{state:"uploading"}),chrome.runtime.sendMessage({target:"offscreen",type:"stop-recording"}),!0):(l&&g(l,{state:"idle"}),!0);if(t.action==="discardRecording"){const e=l,o=_;return chrome.runtime.sendMessage({target:"offscreen",type:"discard-recording"}),N(),s=!1,l=null,_=null,I=null,y=null,p=null,U=!1,S=null,e&&g(e,{state:"idle"}),o&&L().then(a=>{a!=null&&a.token&&Z(a.token,o).catch(c=>{(c==null?void 0:c.code)===D&&k()})}),!0}else{if(t.action==="pauseRecording")return chrome.runtime.sendMessage({target:"offscreen",type:"pause-recording"}),s&&!U&&(U=!0,S=O(),W("paused").catch(()=>{})),l&&g(l,{state:"paused",elapsedSeconds:S??void 0}),!0;if(t.action==="resumeRecording")return(async()=>{if(s&&U){await W("recording");const e=typeof S=="number"?S:O();p=new Date(Date.now()-e*1e3).toISOString(),U=!1,S=null}chrome.runtime.sendMessage({target:"offscreen",type:"resume-recording"}),l&&g(l,{state:"recording",recordingStartTime:p,elapsedSeconds:null})})(),!0;if(t.action==="openPopupForRecording"||t.action==="focusTabForRecording"){const e=(m=r.tab)==null?void 0:m.id;return e!=null&&(chrome.tabs.update(e,{active:!0}),chrome.tabs.get(e,o=>{(o==null?void 0:o.windowId)!=null&&chrome.windows.update(o.windowId,{focused:!0})})),!0}else if(t.action==="focusTabForShortcut"){const e=(M=r.tab)==null?void 0:M.id;return e!=null&&(chrome.tabs.update(e,{active:!0}),chrome.tabs.get(e,o=>{(o==null?void 0:o.windowId)!=null&&chrome.windows.update(o.windowId,{focused:!0})})),!0}else{if(t.action==="openTab")return t.url&&chrome.tabs.create({url:t.url}),!0;if(t.action==="auth-complete"&&t.token)return chrome.storage.local.set({afterTheCallAuthToken:t.token,afterTheCallEmail:t.email||"",afterTheCallName:t.name||"",afterTheCallAvatarUrl:t.avatarUrl||""},()=>{n&&n({ok:!0})}),!0;if(t.action==="set-recording")s=t.recording,chrome.storage.session.set({recording:t.recording}),t.recording?V():(N(),U=!1,S=null);else if(t.action==="getRecordingState"){const e=s?U?"paused":"recording":"idle",o=s?U&&typeof S=="number"?S:O():0,a=((w=r==null?void 0:r.tab)==null?void 0:w.id)??null,c=!!(s&&a!=null&&l===a),f=t.tabId??a,i=f!=null&&v.has(f);return n({isRecording:s,recordingTabId:l,recordingStartTime:p,state:e,elapsedSeconds:o,isRecordingThisTab:c,isActiveMeeting:i}),!0}else if(t.action==="isActiveMeetingTab"){const e=t.tabId??((h=r==null?void 0:r.tab)==null?void 0:h.id),o=e!=null&&v.has(e);return n({active:o}),!0}else if(t.action==="recording-chunk"){const{callId:e,chunkBase64:o}=t;if(e&&o){let a;try{const c=atob(o);a=new ArrayBuffer(c.length);const f=new Uint8Array(a);for(let i=0;i<c.length;i++)f[i]=c.charCodeAt(i)}catch{return!0}L().then(c=>{if(c!=null&&c.token||I&&y){const f=y&&I?{workerChunkUrl:y,uploadToken:I}:{};J((c==null?void 0:c.token)??"",e,a,f).catch(i=>{(i==null?void 0:i.code)===D&&k()})}})}return!0}else{if(t.action==="recording-tab-audio-failed")return l&&g(l,{state:"recording",tabAudioUnavailable:!0,recordingStartTime:p,elapsedSeconds:null}),!0;if(t.action==="recording-mic-failed")return l&&g(l,{state:"recording",micUnavailable:!0,recordingStartTime:p,elapsedSeconds:null}),!0;if(t.action==="recording-finalize"){const e=l,o=t.callId;if(!o){s=!1,l=null,_=null,I=null,y=null,p=null;try{g(e,{state:"idle"})}catch{}return!0}return L().then(async a=>{if(!(a!=null&&a.token)){s=!1,l=null,_=null,I=null,y=null,p=null;try{g(e,{state:"idle"})}catch{}return}const c=new Date().toISOString(),f=p?Math.floor((Date.now()-new Date(p).getTime())/1e3):0;try{let i=null;try{i=await chrome.tabs.get(e)}catch{}const E=(i==null?void 0:i.title)||G("untitledMeeting"),d=i!=null&&i.url?K(i.url):"",C=await X(a.token,o,{endedAt:c,durationSeconds:f,title:E,platform:d||void 0});chrome.runtime.sendMessage({action:"recording-saved",success:!0,meetingId:C.id});const R=P+"/dashboard/calls/"+C.id;chrome.tabs.create({url:R});try{g(e,{state:"idle"})}catch{}}catch(i){(i==null?void 0:i.code)===D&&k(),chrome.runtime.sendMessage({action:"recording-saved",success:!1,error:"Failed to finalize"});try{g(e,{state:"idle"})}catch{}}finally{s=!1,l=null,_=null,I=null,y=null,p=null}}),!0}}}}}});chrome.tabs.onRemoved.addListener(t=>{s&&l===t&&chrome.runtime.sendMessage({type:"stop-recording",target:"offscreen"}),F===t&&(F=null)});chrome.tabs.onActivated.addListener(t=>{F=t.tabId});chrome.commands.onCommand.addListener(t=>{if(t!=="start-recording")return;if(s){chrome.runtime.sendMessage({target:"offscreen",type:"stop-recording"});return}const r=F;if(!r){chrome.tabs.query({active:!0,currentWindow:!0},n=>{const u=n[0];u!=null&&u.id&&H(u.id)});return}H(r)});function H(t,r={}){if(s&&l&&l!==t){Y(l);return}if(!v.has(t))return;const n=r.mic!==void 0||r.participants!==void 0;chrome.tabCapture.getMediaStreamId({targetTabId:t},u=>{const T=chrome.runtime.lastError?null:u;chrome.tabCapture.getMediaStreamId({consumerTabId:t},b=>{const A=chrome.runtime.lastError?null:b,m=M=>{const w={mic:M.mic!==!1,participants:M.participants!==!1};return j(t,T,A,w).then(()=>{g(t,{state:"recording",recordingStartTime:p,elapsedSeconds:0})}).catch(h=>{if((h==null?void 0:h.code)==="AUTH_REQUIRED"&&(Q(P+"/login"),g(t,{state:"auth-required"})),(h==null?void 0:h.code)==="FREE_LIMIT_REACHED"){const e=h.upgradeUrl||"/dashboard/upgrade";chrome.tabs.create({url:P+e})}N(),s=!1,l=null,_=null,I=null,y=null,g(t,{state:"idle"})})};n?m(r):z().then(m)})})}chrome.action.onClicked.addListener(t=>{if(t!=null&&t.id){if(s){chrome.runtime.sendMessage({target:"offscreen",type:"stop-recording"});return}H(t.id)}});
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
	const INJECTED_MANIFEST = {"manifest_version":3,"name":"AfterTheCall: AI Meeting Notes for Meet, Zoom, Teams, Webex & WhatsApp","version":"1.5.0","description":"AI meeting notes, transcription, action items & follow-up emails for Google Meet, Zoom, Microsoft Teams, Webex & WhatsApp. No bots.","permissions":["storage","tabCapture","tabs","offscreen","activeTab"],"optional_permissions":[],"content_scripts":[{"matches":["https://meet.google.com/*","https://*.webex.com/*","https://*.zoom.us/*","https://*.teams.microsoft.com/*","https://*.teams.live.com/*","https://web.whatsapp.com/*"],"js":["src/meeting-detector.js"],"run_at":"document_idle","all_frames":true,"css":[]},{"matches":["https://meet.google.com/*","https://*.webex.com/*","https://*.zoom.us/*","https://*.teams.microsoft.com/*","https://*.teams.live.com/*","https://web.whatsapp.com/*"],"js":["src/lib/config-inline.js","src/pill/pill.js"],"run_at":"document_idle","css":[]},{"matches":["https://www.afterthecall.io/*"],"js":["src/auth-callback.js"],"run_at":"document_start","css":[]}],"options_ui":{},"browser_action":{},"page_action":{},"action":{"default_popup":"src/popup/index.html","default_title":"__MSG_extName__","default_icon":{"16":"src/icons/16.png","24":"src/icons/24.png","32":"src/icons/32.png","48":"src/icons/48.png","128":"src/icons/128.png"}},"icons":{"16":"src/icons/16.png","24":"src/icons/24.png","32":"src/icons/32.png","48":"src/icons/48.png","128":"src/icons/128.png"},"web_accessible_resources":[{"resources":["src/offscreen/index.html","src/permission/index.html","src/icons/recording.png","src/icons/logo.svg"],"matches":["<all_urls>"]}],"background":{"service_worker":"src/background.js","type":"module"},"_id":"afterthecall-ai-meeting-notes-for-meet-zoom-teams-webex-whatsapp"};
	const CONTENT_SCRIPT_CONFIGS_FOR_MATCHING = [
	  {
	    "matches": [
	      "https://meet.google.com/*",
	      "https://*.webex.com/*",
	      "https://*.zoom.us/*",
	      "https://*.teams.microsoft.com/*",
	      "https://*.teams.live.com/*",
	      "https://web.whatsapp.com/*"
	    ]
	  },
	  {
	    "matches": [
	      "https://meet.google.com/*",
	      "https://*.webex.com/*",
	      "https://*.zoom.us/*",
	      "https://*.teams.microsoft.com/*",
	      "https://*.teams.live.com/*",
	      "https://web.whatsapp.com/*"
	    ]
	  },
	  {
	    "matches": [
	      "https://www.afterthecall.io/*"
	    ]
	  }
	];
	const OPTIONS_PAGE_PATH = null;
	const POPUP_PAGE_PATH = "src/popup/index.html";
	const EXTENSION_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAACoUExURQAAAF5c5l9c5l9d515d5mBc5l5c5l5c5l5c5l5c5l5c5l9d5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5l5c5lxa5ltZ5l1a5mBe5nh36piX76uq8nd16r6+9e/v/f7+/////7699XZ16oSD7OPj+ymGuKQAAAAndFJOUwAAAAAAAAQOGB4DAR1Ogq3I2N+sCEOZ2vkCQq7zQRmN7zfDNknd5Grh21MAAAABYktHRDM31XxeAAAAB3RJTUUH6gMeCTkrIYSHTQAAAaVJREFUSMelVumagjAM3HgBcggooKKCINYDD8Tj/d9suxW1ZcFu3fn8YzJD0rRN+vX1f0ADCjSAS24SYkeSFUWWuuRP8w29hf2qphs907Jty+wbuqZiU6uG3sa+geN6Q/TE0HOdATa3q/g489HYn6ASJv50hFdTsVSAWRCiCoTBDDsr+PMI1SCKfymwYZGgWiSLkgJXfLFEb7BcMJuC6zNP0FskMV0rvN4IcRDNXknhegY8PkLB6KkAGId8QTh9CJow8Pl8hPxBca4AnPL+rtYr/CsZJ04RAlSX9Wy26W6/36XbDWt31UKgeeznD8fslOen7Hxhg3ga3DPShwz/essL3K6MYqiTnAAMJp/Dk48VFyYrg1wN6PRo4/aYUzhvaV+/SyJIJp1QmtGCLKWTMiUikC3Ktt6daMFpt6aclkwEik1H2OcM9nQEW/lMIJyS8KKFyyqycfDJ0RA+fB8cb9ELJHxFhZuAeJsRbmQ/rTIWapWkefOacal9C7Z7oohFBor4yCKK+qFYOeFFx+49CBnsfXawv3tA3J8O3b8+HV5xHuCS+fgGo5zhLBXJq24AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjYtMDMtMzBUMDk6NTc6MzcrMDA6MDDRl2XhAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI2LTAzLTMwVDA5OjU3OjM3KzAwOjAwoMrdXQAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNi0wMy0zMFQwOTo1Nzo0MyswMDowMAlV0YgAAAAASUVORK5CYII=";
	const extensionCssData = {};
	
	const LOCALE_KEYS = {"extName":{"message":"AfterTheCall: AI Meeting Notes for Meet, Zoom, Teams, Webex & WhatsApp"},"extDescription":{"message":"AI meeting notes, transcription, action items & follow-up emails for Google Meet, Zoom, Microsoft Teams, Webex & WhatsApp. No bots."},"cmdStartRecording":{"message":"Start recording"},"popupTitle":{"message":"AfterTheCall - Capture Client Calls"},"checkingSession":{"message":"Checking session…"},"appTitle":{"message":"AfterTheCall"},"signInSubtitle":{"message":"Sign in to start capturing client calls"},"continueGoogle":{"message":"Continue with Google"},"continueEmail":{"message":"Email login"},"readyToRecord":{"message":"Ready to record"},"microphone":{"message":"Microphone"},"microphoneTooltip":{"message":"Record your voice. If you mute yourself in the meeting, we follow that—your voice won't be in the recording while you're muted, so it matches what others hear."},"participantsLabel":{"message":"Participants (call audio)"},"participantsTooltip":{"message":"Record everyone else on the call—other participants' voices."},"startRecording":{"message":"Start recording"},"stop":{"message":"Stop"},"recordingEllipsis":{"message":"Recording…"},"meetingWarning":{"message":"This is not a meeting tab. Switch to Google Meet, Zoom, Webex, Teams, or WhatsApp to record."},"noActiveCallWarning":{"message":"No active call detected on this tab. Start or join a call first, then record."},"autoDetectMeetings":{"message":"Auto-detect meetings"},"openDashboard":{"message":"Open dashboard"},"settings":{"message":"Settings"},"upgradeToRecord":{"message":"Upgrade to record"},"version":{"message":"Version $1$","placeholders":{"1":{"content":"$1"}}},"whatThisDoes":{"message":"What this does"},"callsCountUnlimited":{"message":"$1$ / unlimited","placeholders":{"1":{"content":"$1"}}},"callsCountFree":{"message":"$1$ / $2$ free calls","placeholders":{"1":{"content":"$1"},"2":{"content":"$2"}}},"titleUnlimitedCalls":{"message":"Unlimited calls"},"titleUsedAllFreeCalls":{"message":"You've used all 3 free calls. Upgrade for unlimited."},"titleFreePlanCalls":{"message":"Free plan: 3 calls"},"overlayReady":{"message":"AfterTheCall is ready 🎙"},"toStartRecording":{"message":"To start recording:"},"clickToolbar":{"message":"Click the AfterTheCall icon in your toolbar"},"orPress":{"message":"Or press "},"recordingUnderControl":{"message":"Recording is always visible and fully under your control."},"lastFreeCall":{"message":"This will use your last free call. Upgrade for unlimited."},"dismiss":{"message":"Dismiss"},"confirm":{"message":"Confirm"},"ok":{"message":"OK"},"cancel":{"message":"Cancel"},"drag":{"message":"Drag"},"pause":{"message":"Pause"},"discard":{"message":"Discard"},"micOnly":{"message":"Mic only"},"micOnlyTitle":{"message":"Tab (speaker) audio could not be captured. Only your mic is recorded. Try starting again with this tab focused."},"tabOnly":{"message":"Tab only"},"tabOnlyTitle":{"message":"Microphone could not be captured. Only participants (tab) audio is recorded. Allow mic when prompted or try starting from the extension icon."},"paused":{"message":"Paused"},"resume":{"message":"Resume"},"uploadingAudio":{"message":"Uploading audio…"},"keepTabOpen":{"message":"Please keep this tab open"},"notesReady":{"message":"Notes ready"},"viewSummary":{"message":"View summary →"},"pleaseSignInFirst":{"message":"Please sign in first"},"signInToRecord":{"message":"Sign in to record"},"signIn":{"message":"Sign in"},"stopRecordingTitle":{"message":"Stop recording?"},"stopRecordingMessage":{"message":"Stop & generate notes?"},"discardTitle":{"message":"Discard recording?"},"discardMessage":{"message":"This recording won't be saved."},"permPageTitle":{"message":"Microphone Permission"},"permHeading":{"message":"Microphone Permission Required"},"permDescription":{"message":"This extension needs microphone access to record audio from your meetings."},"grantMicAccess":{"message":"Grant Microphone Access"},"requestingAccess":{"message":"Requesting microphone access..."},"permissionGranted":{"message":"Permission granted! You can now close this tab."},"permissionDenied":{"message":"Permission denied. Please allow microphone access and try again."},"untitledMeeting":{"message":"Untitled Meeting"},"freeLimitReached":{"message":"Free plan limit reached. Upgrade for unlimited calls."},"sessionExpired":{"message":"Your session has expired. Please sign in again."}};
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
		  const scriptName = "AfterTheCall: AI Meeting Notes for Meet, Zoom, Teams, Webex & WhatsApp";
		  _log(`Starting execution phases...`);
		
  // #region Document Start
			  if (typeof document !== 'undefined') {
			    _log(`Executing document-start phase...`);
			    
			    const scriptPaths = ["src/auth-callback.js"];
			   _log(`  Executing JS (start): ${scriptPaths}`);
			
			   try {
			       // Keep variables from being redeclared for global scope, but also make them apply to global scope. (Theoretically)
			      with (globalThis){;
			// START: src/auth-callback.js
			(function(){"use strict";(function(){fetch("/api/auth/extension-token",{credentials:"include"}).then(function(n){if(n.ok)return n.json()}).then(function(n){if(!(!n||!n.token))try{chrome.runtime.sendMessage({action:"auth-complete",token:n.token,email:n.email||"",name:n.name||"",avatarUrl:n.avatarUrl||n.image||n.avatar||""})}catch{}}).catch(function(n){})})()})();
			// END: src/auth-callback.js
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
			    
			    const scriptPaths = ["src/meeting-detector.js","src/lib/config-inline.js","src/pill/pill.js"];
			   _log(`  Executing JS (idle): ${scriptPaths}`);
			
			   try {
			       // Keep variables from being redeclared for global scope, but also make them apply to global scope. (Theoretically)
			      with (globalThis){;
			// START: src/meeting-detector.js
			(function(){"use strict";(function(){let l=!1,a=null,s=null;const g="[AfterTheCall]";let p=null,f=null,d=!1;function o(e,t,n){const r=n!=null?[t,n]:[t];console.log.apply(console,[g,...r])}function E(e){if(!e||!e.isConnected)return!1;const t=window.getComputedStyle(e);if(t.display==="none"||t.visibility==="hidden"||Number(t.opacity)===0)return!1;const n=e.getBoundingClientRect();return n.width>0&&n.height>0}function c(e,t){return!e||!e.querySelectorAll?null:Array.from(e.querySelectorAll(t)).find(E)||null}function m(e){if(l){l=!1,a=null,o("info","Meeting ended",e?{reason:e}:void 0),M();try{chrome.runtime.sendMessage({type:"MEETING_ENDED"})}catch{}}}function M(){let e=0;return document.querySelectorAll("#atc-overlay, #atc-floating-pill, .atc-overlay-backdrop, .atc-pill-root").forEach(t=>{t.remove(),e+=1}),e}function h(){const e=window.location.href;return/meet\.google\.com/.test(e)?"meet":/(?:[\w-]+\.)?zoom\.us\//.test(e)?"zoom":/teams\.microsoft\.com/.test(e)||/teams\.live\.com/.test(e)?"teams":/webex\.com/.test(e)?"webex":/web\.whatsapp\.com/.test(e)?"whatsapp":null}function w(e){if(!e||!e.querySelector)return;const t=e.querySelector('button[aria-label*="Leave call"]');!t||t===p||(p=t,t.addEventListener("click",()=>{m("meet_leave_call_clicked"),setTimeout(u,1500)},{capture:!0}))}function v(e){!e||e===f||(f=e,e.addEventListener("click",()=>{d=!0,f=null,m("whatsapp_end_call_clicked"),setTimeout(()=>{M(),u()},500)},{capture:!0}))}function _(e){const t=c(e,'button[aria-label="End call"]'),n=c(e,'button[data-testid="mic-mute"]')||c(e,'button[data-testid="mic-unmute"]');return!(t&&n)?!1:(v(t),!0)}function y(e,t){if(!e||!e.querySelector)return!1;switch(t){case"meet":return w(e),!!e.querySelector('button[aria-label*="Leave call"]');case"zoom":return!!e.querySelector('button[aria-label*="End"]');case"teams":return!!e.querySelector('button[aria-label*="Leave"]');case"webex":return!!e.querySelector('mdc-button[aria-label*="End meeting"], mdc-button[data-test="leave-button"]');case"whatsapp":return _(e);default:return!1}}function S(e){if(y(document,e))return!0;if(window!==window.top)return!1;for(const t of document.querySelectorAll("iframe"))try{const n=t.contentDocument;if(n&&y(n,e))return!0}catch{}return!1}function b(e){switch(e){case"meet":{const t=document.querySelector("button[data-is-muted]");if(!t)return null;const n=t.getAttribute("data-is-muted");if(n==="true")return!0;if(n==="false")return!1;const r=(t.getAttribute("aria-label")||"").trim();return r==="Turn on microphone"?!0:r==="Turn off microphone"?!1:null}case"zoom":{const t=document.querySelector('button[aria-label*="microphone"]');if(!t)return null;const n=(t.getAttribute("aria-label")||"").trim().toLowerCase();return n==="unmute my microphone"?!0:n==="mute my microphone"?!1:n.includes("unmute")?!0:n.includes("mute")?!1:null}case"teams":{const t=document.querySelector('button[data-tid="call-mute-button"], button[data-state="mic-off"], button[data-state="mic"], button[aria-label*="mic"]');if(!t)return null;const n=t.getAttribute("data-state");if(n==="mic-off")return!0;if(n==="mic")return!1;const r=(t.getAttribute("aria-label")||"").trim().toLowerCase();if(r==="unmute mic")return!0;if(r==="mute mic")return!1;if(r.includes("unmute"))return!0;if(r.includes("mute"))return!1;const i=t.getAttribute("aria-pressed");return i==="true"?!0:i==="false"?!1:null}case"webex":{const t=document.querySelector('mdc-button[aria-label*="Microphone"], mdc-button[aria-label*="Mute"], mdc-button[aria-label*="Unmute"], mdc-button[title*="Mute"], mdc-button[title*="Unmute"]');if(!t)return null;const n=(t.getAttribute("aria-label")||t.getAttribute("title")||"").trim().toLowerCase();return n.includes("microphone is currently muted")?!0:n.includes("microphone is currently unmuted")?!1:n.includes("unmute")?!0:n.includes("mute")?!1:null}case"whatsapp":return c(document,'button[data-testid="mic-unmute"]')?!0:c(document,'button[data-testid="mic-mute"]')?!1:null;default:return null}}function A(){const e=h();if(!e)return;let t=S(e);if(e==="whatsapp"&&d&&(t?t=!1:(d=!1,f=null)),t&&!l){l=!0,a=null,o("info","Meeting started",{platform:e});try{chrome.runtime.sendMessage({type:"MEETING_STARTED",platform:e});const n=b(e);n!==null&&(a=n,o("info","Initial mic state",{muted:n}),chrome.runtime.sendMessage({type:n?"MEETING_MIC_MUTED":"MEETING_MIC_UNMUTED",platform:e}))}catch{}}if(!t&&l&&m("dom_check_inactive"),t){const n=b(e);if(n!==null&&n!==a){a=n,o("info","Mic state changed",{muted:n});try{chrome.runtime.sendMessage({type:n?"MEETING_MIC_MUTED":"MEETING_MIC_UNMUTED",platform:e})}catch{}}}}function u(){s&&clearTimeout(s),s=setTimeout(()=>{s=null,A()},400)}new MutationObserver(u).observe(document.body,{childList:!0,subtree:!0}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{u()}):u(),window===window.top&&setInterval(u,2e3),window.addEventListener("beforeunload",()=>{m("beforeunload")}),chrome.runtime.onMessage.addListener((e,t,n)=>{if(e.action!=="getMeetingMicMuted")return;const r=h(),i=r?b(r):null;o("info","Mic state requested",{platform:r,muted:i}),n({muted:i})})})()})();
			// END: src/meeting-detector.js
			
			// START: src/lib/config-inline.js
			(function(){"use strict";(function(){window.__ATC_WEB_APP_ORIGIN__="https://www.afterthecall.io"})()})();
			// END: src/lib/config-inline.js
			
			// START: src/pill/pill.js
			(function(){"use strict";(function(){function o(e,t){return typeof chrome<"u"&&chrome.i18n&&chrome.i18n.getMessage&&chrome.i18n.getMessage(e,t)||e}const L=typeof window.__ATC_WEB_APP_ORIGIN__<"u"?window.__ATC_WEB_APP_ORIGIN__:"http://localhost:3000",P="afterthecall_pill_position",B="afterthecall_auto_detect_meetings",V=24,Z=24,Q=[{name:"Google Meet",pattern:/https:\/\/meet\.google\.com\/?/i},{name:"Webex",pattern:/https:\/\/(?:[\w-]+\.)?webex\.com\/?/i},{name:"Zoom",pattern:/https:\/\/(?:[\w-]+\.)?zoom\.us\/?/i},{name:"Microsoft Teams",pattern:/https:\/\/(?:[\w-]+\.)?teams\.microsoft\.com\/?/i},{name:"Microsoft Teams",pattern:/https:\/\/(?:[\w-]+\.)?teams\.live\.com\/?/i},{name:"WhatsApp",pattern:/https:\/\/web\.whatsapp\.com\/?/i}];function ee(e){const t=typeof e=="string"?e:window.location.href;return Q.find(({pattern:n})=>n.test(t))||null}function te(){try{const e=localStorage.getItem(P);if(e){const t=JSON.parse(e);if(typeof t.bottom=="number"&&typeof t.right=="number")return t}}catch{}return{bottom:V,right:Z}}function ne(e,t){try{localStorage.setItem(P,JSON.stringify({bottom:e,right:t}))}catch{}}const O=document.createElement("style");if(O.textContent=`
			    .atc-pill-root {
			      position: fixed;
			      z-index: 2147483646;
			      height: 52px;
			      min-width: 160px;
			      border-radius: 26px;
			      box-shadow: 0 6px 20px rgba(0,0,0,0.18);
			      background: #FFFFFF;
			      font-family: Inter, system-ui, sans-serif;
			      font-size: 14px;
			      color: #0F172A;
			      display: flex;
			      align-items: center;
			      justify-content: center;
			      gap: 8px;
			      padding: 0 14px;
			      cursor: default;
			      user-select: none;
			      transition: background 180ms ease, box-shadow 180ms ease;
			      animation: atc-pill-enter 200ms ease-out;
			    }
			    @keyframes atc-pill-enter {
			      from { opacity: 0; transform: translateY(8px); }
			      to { opacity: 1; transform: translateY(0); }
			    }
			    .atc-pill-root.atc-draggable { cursor: grab; }
			    .atc-pill-root.atc-draggable:active { cursor: grabbing; }
			    .atc-pill-root.atc-state-idle { }
			    .atc-pill-root.atc-state-recording .atc-dot { background: #EF4444; animation: atc-pulse 1.2s ease-in-out infinite; }
			    @keyframes atc-pulse {
			      0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
			      50% { opacity: 0.9; box-shadow: 0 0 0 6px rgba(239,68,68,0.2); }
			    }
			    .atc-pill-root.atc-state-paused { background: #FFF7ED; }
			    .atc-pill-root.atc-state-uploading { background: #F8FAFC; }
			    .atc-pill-root.atc-state-done { background: #ECFDF5; }
			    .atc-dot {
			      width: 8px;
			      height: 8px;
			      border-radius: 50%;
			      background: #22C55E;
			      flex-shrink: 0;
			    }
			    .atc-timer { font-weight: 600; font-size: 14px; min-width: 52px; text-align: center; }
			    .atc-label { font-weight: 500; color: #0F172A; }
			    .atc-muted { font-size: 12px; color: #64748B; }
			    .atc-btn {
			      width: 32px;
			      height: 32px;
			      border-radius: 50%;
			      border: none;
			      background: transparent;
			      cursor: pointer;
			      display: inline-flex;
			      align-items: center;
			      justify-content: center;
			      color: #64748B;
			      transition: background 150ms, color 150ms;
			    }
			    .atc-btn:hover { background: #F1F5F9; color: #0F172A; }
			    .atc-btn-pause:hover { background: rgba(245,158,11,0.2); color: #F59E0B; }
			    .atc-btn-stop:hover { background: rgba(239,68,68,0.15); color: #EF4444; }
			    .atc-drag-handle {
			      width: 18px;
			      height: 18px;
			      display: inline-flex;
			      align-items: center;
			      justify-content: center;
			      color: #94A3B8;
			      cursor: grab;
			      border-radius: 6px;
			      margin-right: -2px;
			      opacity: 0;
			      transform: translateX(-2px);
			      transition: opacity 140ms ease, transform 140ms ease, background 140ms ease, color 140ms ease;
			      flex-shrink: 0;
			      user-select: none;
			    }
			    .atc-pill-root:hover .atc-drag-handle {
			      opacity: 1;
			      transform: translateX(0);
			    }
			    .atc-drag-handle:hover {
			      background: #F1F5F9;
			      color: #64748B;
			    }
			    .atc-drag-handle:active { cursor: grabbing; }
			    .atc-cta {
			      background: #4F46E5;
			      color: #fff;
			      border: none;
			      border-radius: 18px;
			      height: 36px;
			      padding: 0 16px;
			      font-weight: 500;
			      font-size: 14px;
			      cursor: pointer;
			      font-family: inherit;
			    }
			    .atc-cta:hover { background: #4338CA; }
			    .atc-link { color: #4F46E5; font-weight: 500; text-decoration: none; }
			    .atc-link:hover { text-decoration: underline; }
			    .atc-spinner {
			      width: 20px;
			      height: 20px;
			      border: 2px solid #E2E8F0;
			      border-top-color: #4F46E5;
			      border-radius: 50%;
			      flex-shrink: 0;
			      animation: atc-spin 0.5s linear infinite;
			    }
			    @keyframes atc-spin { to { transform: rotate(360deg); } }
			    .atc-overlay-backdrop {
			      position: fixed;
			      inset: 0;
			      z-index: 2147483645;
			      background: rgba(0,0,0,0.35);
			      display: flex;
			      align-items: center;
			      justify-content: center;
			      animation: atc-overlay-fade 0.2s ease-out;
			    }
			    #atc-overlay.atc-overlay-backdrop {
			      background: transparent;
			      justify-content: flex-end;
			      align-items: flex-end;
			      padding: 24px;
			      padding-bottom: 143px;
			      animation: none;
			      pointer-events: none;
			    }
			    #atc-overlay .atc-overlay-card {
			      animation: atc-overlay-slide-in 0.3s ease-out;
			      box-shadow: 0 4px 24px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.08);
			      pointer-events: auto;
			    }
			    @keyframes atc-overlay-fade { from { opacity: 0; } to { opacity: 1; } }
			    @keyframes atc-overlay-slide-in {
			      from { opacity: 0; transform: translateX(100%); }
			      to { opacity: 1; transform: translateX(0); }
			    }
			    .atc-overlay-card {
			      background: #fff;
			      border-radius: 12px;
			      box-shadow: 0 12px 40px rgba(0,0,0,0.2);
			      padding: 20px 24px;
			      max-width: 320px;
			      font-family: Inter, system-ui, sans-serif;
			      font-size: 14px;
			      color: #0F172A;
			    }
			    .atc-overlay-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
			    .atc-overlay-icon { width: 30px; height: 30px; flex-shrink: 0; }
			    .atc-overlay-name { font-weight: 600; font-size: 18px; color: #4F46E5; }
			    .atc-overlay-title { font-weight: 600; font-size: 16px; }
			    .atc-overlay-text { color: #475569; line-height: 1.5; margin-bottom: 16px; }
			    .atc-overlay-shortcut { font-weight: 600; color: #4F46E5; }
			    .atc-overlay-subtitle { font-weight: 600; color: #0F172A; margin-bottom: 8px; font-size: 14px; }
			    .atc-overlay-list { margin: 0 0 12px 0; padding-left: 20px; color: #475569; line-height: 1.6; font-size: 14px; }
			    .atc-overlay-list li { margin-bottom: 6px; }
			    .atc-overlay-reassurance { font-size: 12px; color: #64748B; margin-top: 14px; padding-top: 14px; border-top: 1px solid #E2E8F0; line-height: 1.5; }
			    .atc-overlay-actions { display: flex; justify-content: flex-end; gap: 8px; }
			    .atc-overlay-btn {
			      padding: 8px 14px;
			      border-radius: 8px;
			      border: none;
			      font-size: 13px;
			      font-weight: 500;
			      cursor: pointer;
			      font-family: inherit;
			    }
			    .atc-overlay-dismiss { background: #F1F5F9; color: #475569; }
			    .atc-overlay-dismiss:hover { background: #E2E8F0; }
			    .atc-confirm-overlay .atc-overlay-card { max-width: 280px; }
			    .atc-confirm-overlay .atc-overlay-actions { margin-top: 4px; }
			    .atc-overlay-btn-danger { background: #EF4444; color: #fff; }
			    .atc-overlay-btn-danger:hover { background: #DC2626; }
			    .atc-btn-delete:hover { background: rgba(239,68,68,0.15); color: #EF4444; }
			    .atc-overlay-info-alert {
			      display: flex; align-items: flex-start; gap: 8px;
			      padding: 10px 12px; margin-bottom: 12px; border-radius: 8px;
			      background: #EEF2FF; color: #3730A3; font-size: 13px; line-height: 1.4;
			    }
			    .atc-overlay-info-alert::before { content: "ℹ️"; flex-shrink: 0; }
			  `,document.head.appendChild(O),!ee(window.location.href))return;let F=/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"Command+Shift+9":"Ctrl+Shift+9";function ae(e){try{chrome.runtime.sendMessage({action:"getStartRecordingShortcut"},t=>{t!=null&&t.shortcut&&(F=t.shortcut),e==null||e(F)})}catch{e==null||e(F)}}function z(){return F}const m=document.createElement("div");m.id="atc-overlay",m.className="atc-overlay-backdrop",m.style.display="none";function oe(){return new Promise(e=>{try{chrome.storage.local.get(["afterTheCallAuthToken"],t=>{const n=typeof(t==null?void 0:t.afterTheCallAuthToken)=="string"?t.afterTheCallAuthToken:"";e(n.trim().length>0?n:null)})}catch{e(null)}})}function M(e){if(document.querySelectorAll("#atc-overlay").forEach(k=>{k!==m&&k.remove()}),m.isConnected)return;const t=document.createElement("div");t.className="atc-overlay-card",t.innerHTML="";const n=document.createElement("div");n.className="atc-overlay-header";const i=document.createElement("img");i.className="atc-overlay-icon",i.src=chrome.runtime.getURL("src/icons/logo.svg"),i.alt="",n.appendChild(i);const l=document.createElement("div");l.className="atc-overlay-title",l.textContent=o("overlayReady"),n.appendChild(l),t.appendChild(n);const p=document.createElement("div");p.className="atc-overlay-subtitle",p.textContent=o("toStartRecording"),t.appendChild(p);const c=document.createElement("ul");c.className="atc-overlay-list";const r=document.createElement("span");r.className="atc-overlay-shortcut",r.textContent=z();const C=document.createElement("li");C.textContent=o("clickToolbar");const b=document.createElement("li");b.appendChild(document.createTextNode(o("orPress"))),b.appendChild(r),oe().then(k=>{if(!k){const R=document.createElement("li");R.appendChild(document.createTextNode(o("pleaseSignInFirst")+" "));const S=document.createElement("a");S.href="#",S.className="atc-link",S.textContent=o("signIn"),S.addEventListener("click",J=>{J.preventDefault(),J.stopPropagation(),chrome.runtime.sendMessage({action:"openTab",url:L+"/login"})}),R.appendChild(S),c.insertBefore(R,c.firstChild)}}),c.appendChild(C),c.appendChild(b),t.appendChild(c);const y=document.createElement("p");y.className="atc-overlay-reassurance",y.textContent=o("recordingUnderControl"),t.appendChild(y);const d=document.createElement("div");d.className="atc-overlay-actions";const T=document.createElement("button");T.type="button",T.className="atc-overlay-btn atc-overlay-dismiss",T.textContent=o("dismiss"),T.addEventListener("click",()=>v()),d.appendChild(T),t.appendChild(d),m.innerHTML="",m.appendChild(t),m.style.display="flex",document.body.appendChild(m),ae(k=>{r.textContent=k||z()})}function v(){m.isConnected&&m.remove(),document.querySelectorAll("#atc-overlay").forEach(e=>e.remove())}const g=document.createElement("div");g.id="atc-confirm-overlay",g.className="atc-overlay-backdrop atc-confirm-overlay",g.style.display="none";function U(e){const t=e.title||o("confirm"),n=e.message||"",i=e.confirmLabel||o("ok"),l=e.cancelLabel||o("cancel"),p=e.danger!==!1;g.innerHTML="";const c=document.createElement("div");c.className="atc-overlay-card";const r=document.createElement("div");if(r.className="atc-overlay-title",r.textContent=t,c.appendChild(r),n){const d=document.createElement("div");d.className="atc-overlay-text",d.textContent=n,c.appendChild(d)}const C=document.createElement("div");C.className="atc-overlay-actions";const b=document.createElement("button");b.type="button",b.className="atc-overlay-btn atc-overlay-dismiss",b.textContent=l,b.addEventListener("click",()=>{var d;H(),(d=e.onCancel)==null||d.call(e)});const y=document.createElement("button");y.type="button",y.className="atc-overlay-btn "+(p?"atc-overlay-btn-danger":""),y.textContent=i,y.addEventListener("click",()=>{var d;H(),(d=e.onConfirm)==null||d.call(e)}),C.appendChild(b),C.appendChild(y),c.appendChild(C),g.appendChild(c),g.style.display="flex",document.body.appendChild(g)}function H(){g.isConnected&&g.remove()}function ie(e){try{chrome.storage.local.get(B,t=>{e(t[B]!==!1)})}catch{e(!0)}}let N=0,E=!1;function re(){const e=++N;E=!0,ie(t=>{!t||e!==N||!E||(M(),chrome.runtime.sendMessage({action:"getRecordingState"},n=>{if(!(e!==N||!E)&&n&&n.isRecordingThisTab&&n.recordingStartTime){h=n.recordingStartTime;const i=new Date(n.recordingStartTime).getTime();x=Math.floor((Date.now()-i)/1e3),u("recording",{recordingStartIso:h,elapsedSeconds:x}),v(),a.isConnected||document.body.appendChild(a),f()}}))})}function ce(){N+=1,E=!1,v(),a.isConnected&&a.remove(),document.querySelectorAll("#atc-floating-pill").forEach(e=>e.remove())}let s="idle",x=0,w=null,h=null,A=null,_=!1,I=!1,D=!1,G=0,j=0,q=0,K=0;const X=te(),a=document.createElement("div");a.className="atc-pill-root atc-state-idle atc-draggable",a.id="atc-floating-pill",a.style.bottom=X.bottom+"px",a.style.right=X.right+"px",a.style.left="auto",a.style.top="auto";function le(e){const t=Math.floor(e/3600),n=Math.floor(e%3600/60),i=Math.floor(e%60);return t>0?[t,n,i].map(l=>String(l).padStart(2,"0")).join(":"):`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}`}function se(){if(w)return;const e=h?new Date(h).getTime():Date.now();function t(){s==="recording"&&(x=Math.floor((Date.now()-e)/1e3),f())}t(),w=setInterval(t,1e3)}function de(){w&&clearInterval(w),w=null}function f(){a.className="atc-pill-root atc-state-"+s+(s==="done"?" atc-draggable":""),a.innerHTML="",a.style.flexDirection="row";const e=document.createElement("span");if(e.className="atc-drag-handle",e.title=o("drag"),e.setAttribute("aria-label",o("drag")),e.textContent="⠿",a.appendChild(e),s==="recording"){const t=document.createElement("span");t.className="atc-dot",a.appendChild(t);const n=document.createElement("div");n.style.display="flex",n.style.flexDirection="column",n.style.alignItems="flex-start",n.style.gap="0";const i=document.createElement("span");if(i.className="atc-timer",i.textContent=le(x),n.appendChild(i),_){const r=document.createElement("span");r.className="atc-muted",r.style.fontSize="10px",r.style.marginTop="1px",r.title=o("micOnlyTitle"),r.textContent=o("micOnly"),n.appendChild(r)}if(I){const r=document.createElement("span");r.className="atc-muted",r.style.fontSize="10px",r.style.marginTop="1px",r.title=o("tabOnlyTitle"),r.textContent=o("tabOnly"),n.appendChild(r)}a.appendChild(n);const l=document.createElement("button");l.type="button",l.className="atc-btn atc-btn-pause",l.setAttribute("aria-label",o("pause")),l.innerHTML="⏸",l.addEventListener("click",r=>{r.stopPropagation(),Y()}),a.appendChild(l);const p=document.createElement("button");p.type="button",p.className="atc-btn atc-btn-stop",p.setAttribute("aria-label",o("stop")),p.innerHTML="⏹",p.addEventListener("click",r=>{r.stopPropagation(),$()}),a.appendChild(p);const c=document.createElement("button");c.type="button",c.className="atc-btn atc-btn-delete",c.setAttribute("aria-label",o("discard")),c.innerHTML="🛑",c.addEventListener("click",r=>{r.stopPropagation(),me()}),a.appendChild(c);return}if(s==="paused"){a.appendChild(document.createElement("span")).textContent="⏸";const t=document.createElement("span");t.className="atc-label",t.textContent=o("paused"),a.appendChild(t);const n=document.createElement("button");n.type="button",n.className="atc-cta",n.textContent=o("resume"),n.addEventListener("click",i=>{i.stopPropagation(),W()}),a.appendChild(n);return}if(s==="uploading"){const t=document.createElement("span");t.className="atc-spinner",a.appendChild(t);const n=document.createElement("span");n.className="atc-label",n.textContent=o("uploadingAudio"),a.appendChild(n);const i=document.createElement("div");i.className="atc-muted",i.style.fontSize="11px",i.style.marginTop="2px",i.textContent=o("keepTabOpen"),a.style.flexDirection="column",a.style.padding="10px 14px",a.appendChild(i);return}if(s==="auth-required"){a.appendChild(document.createElement("span")).textContent="🔒";const t=document.createElement("span");t.className="atc-label",t.textContent=o("signInToRecord"),a.appendChild(t);const n=document.createElement("button");n.type="button",n.className="atc-cta",n.textContent=o("signIn"),n.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),chrome.runtime.sendMessage({action:"openTab",url:L+"/login"})}),a.appendChild(n);return}if(s==="done"){a.appendChild(document.createElement("span")).textContent="✅";const t=document.createElement("span");t.className="atc-label",t.textContent=o("notesReady"),a.appendChild(t);const n=document.createElement("a");n.className="atc-link",n.href="#",n.textContent=o("viewSummary"),n.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),fe()}),a.appendChild(n)}}function u(e,t={}){s=e,t.elapsedSeconds!==void 0&&(x=t.elapsedSeconds),t.recordingStartIso!==void 0&&(h=t.recordingStartIso),"meetingId"in t&&(A=t.meetingId||null),t.tabAudioUnavailable!==void 0&&(_=t.tabAudioUnavailable),t.micUnavailable!==void 0&&(I=t.micUnavailable),s==="recording"?(A=null,se()):(de(),_=!1,I=!1),f()}function Y(){chrome.runtime.sendMessage({action:"pauseRecording"}),u("paused")}function W(){chrome.runtime.sendMessage({action:"resumeRecording"}),h=new Date(Date.now()-x*1e3).toISOString(),u("recording",{recordingStartIso:h})}function $(){U({title:o("stopRecordingTitle"),message:o("stopRecordingMessage"),confirmLabel:o("stop"),cancelLabel:o("cancel"),danger:!0,onConfirm:ue,onCancel:f})}function pe(){chrome.runtime.sendMessage({action:"discardRecording"})}function me(){U({title:o("discardTitle"),message:o("discardMessage"),confirmLabel:o("discard"),cancelLabel:o("cancel"),danger:!0,onConfirm:pe,onCancel:f})}function ue(){chrome.runtime.sendMessage({action:"getRecordingState"},e=>{if(!(e!=null&&e.isRecording)){u("idle"),E?M():v();return}u("uploading"),chrome.runtime.sendMessage({action:"stopRecording"})})}function fe(){const e=A?`/dashboard/calls/${A}`:"/dashboard";chrome.runtime.sendMessage({action:"openTab",url:L+e})}a.addEventListener("mousedown",e=>{if(!e.target.closest(".atc-drag-handle"))return;D=!0,G=e.clientX,j=e.clientY;const t=a.getBoundingClientRect();q=window.innerWidth-(t.left+t.width),K=window.innerHeight-(t.top+t.height)}),document.addEventListener("mousemove",e=>{if(!D)return;const t=Math.max(0,q+G-e.clientX),n=Math.max(0,K+j-e.clientY);a.style.right=t+"px",a.style.bottom=n+"px",a.style.left="auto",a.style.top="auto",ne(n,t)}),document.addEventListener("mouseup",()=>{D=!1}),document.addEventListener("keydown",e=>{if(e.key==="r"&&e.altKey&&e.shiftKey){s==="recording"&&(e.preventDefault(),$());return}e.key!=="P"||!(e.metaKey||e.ctrlKey)||!e.shiftKey||(s==="recording"?(e.preventDefault(),Y()):s==="paused"&&(e.preventDefault(),W()))}),chrome.runtime.onMessage.addListener(e=>{if(e.action==="pill-visibility"){e.show?re():ce();return}e.action==="pill-state"&&(e.state==="recording"?(v(),a.isConnected||document.body.appendChild(a),e.recordingStartTime&&(h=e.recordingStartTime),typeof e.elapsedSeconds=="number"&&(x=e.elapsedSeconds),u("recording",{recordingStartIso:h,elapsedSeconds:x,tabAudioUnavailable:e.tabAudioUnavailable,micUnavailable:e.micUnavailable}),f()):e.state==="paused"?(a.isConnected||document.body.appendChild(a),u("paused"),f()):e.state==="uploading"?(a.isConnected||document.body.appendChild(a),u("uploading"),f()):e.state==="auth-required"?(v(),a.isConnected||document.body.appendChild(a),u("auth-required"),f()):e.state==="done"?(a.isConnected||document.body.appendChild(a),u("done",{meetingId:e.meetingId??null}),f()):e.state==="idle"&&(u("idle"),a.isConnected&&a.remove(),E?M():v()))}),document.querySelectorAll("#atc-overlay, #atc-floating-pill").forEach(e=>e.remove())})()})();
			// END: src/pill/pill.js
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
			  const polyfillString = "\n// -- Messaging implementation\n\nfunction createEventBus(\n  scopeId,\n  type = \"page\", // \"page\" or \"iframe\"\n  { allowedOrigin = \"*\", children = [], parentWindow = null } = {}\n) {\n  if (!scopeId) throw new Error(\"createEventBus requires a scopeId\");\n\n  const handlers = {};\n\n  function handleIncoming(ev) {\n    if (allowedOrigin !== \"*\" && ev.origin !== allowedOrigin) return;\n\n    const msg = ev.data;\n    if (!msg || msg.__eventBus !== true || msg.scopeId !== scopeId) return;\n\n    const { event, payload } = msg;\n\n    // PAGE: if it's an INIT from an iframe, adopt it\n    if (type === \"page\" && event === \"__INIT__\") {\n      const win = ev.source;\n      if (win && !children.includes(win)) {\n        children.push(win);\n      }\n      return;\n    }\n\n    (handlers[event] || []).forEach((fn) =>\n      fn(payload, { origin: ev.origin, source: ev.source })\n    );\n  }\n\n  window.addEventListener(\"message\", handleIncoming);\n\n  function emitTo(win, event, payload) {\n    const envelope = {\n      __eventBus: true,\n      scopeId,\n      event,\n      payload,\n    };\n    win.postMessage(envelope, allowedOrigin);\n  }\n\n  // IFRAME: announce to page on startup\n  if (type === \"iframe\") {\n    setTimeout(() => {\n      const pw = parentWindow || window.parent;\n      if (pw && pw.postMessage) {\n        emitTo(pw, \"__INIT__\", null);\n      }\n    }, 0);\n  }\n\n  return {\n    on(event, fn) {\n      handlers[event] = handlers[event] || [];\n      handlers[event].push(fn);\n    },\n    off(event, fn) {\n      if (!handlers[event]) return;\n      handlers[event] = handlers[event].filter((h) => h !== fn);\n    },\n    /**\n     * Emits an event.\n     * @param {string} event - The event name.\n     * @param {any} payload - The event payload.\n     * @param {object} [options] - Emission options.\n     * @param {Window} [options.to] - A specific window to target. If provided, message is ONLY sent to the target.\n     */\n    emit(event, payload, { to } = {}) {\n      // If a specific target window is provided, send only to it and DO NOT dispatch locally.\n      // This prevents a port from receiving its own messages.\n      if (to) {\n        if (to && typeof to.postMessage === \"function\") {\n          emitTo(to, event, payload);\n        }\n        return; // Exit after targeted send.\n      }\n\n      // For broadcast messages (no 'to' target), dispatch locally first.\n      (handlers[event] || []).forEach((fn) =>\n        fn(payload, { origin: location.origin, source: window })\n      );\n\n      // Then propagate the broadcast to other windows.\n      if (type === \"page\") {\n        children.forEach((win) => emitTo(win, event, payload));\n      } else {\n        const pw = parentWindow || window.parent;\n        if (pw && pw.postMessage) {\n          emitTo(pw, event, payload);\n        }\n      }\n    },\n  };\n}\n\nfunction createRuntime(type = \"background\", bus) {\n  let nextId = 1;\n  const pending = {};\n  const msgListeners = [];\n\n  let nextPortId = 1;\n  const ports = {};\n  const onConnectListeners = [];\n\n  function parseArgs(args) {\n    let target, message, options, callback;\n    const arr = [...args];\n    if (arr.length === 0) {\n      throw new Error(\"sendMessage requires at least one argument\");\n    }\n    if (arr.length === 1) {\n      return { message: arr[0] };\n    }\n    // last object could be options\n    if (\n      arr.length &&\n      typeof arr[arr.length - 1] === \"object\" &&\n      !Array.isArray(arr[arr.length - 1])\n    ) {\n      options = arr.pop();\n    }\n    // last function is callback\n    if (arr.length && typeof arr[arr.length - 1] === \"function\") {\n      callback = arr.pop();\n    }\n    if (\n      arr.length === 2 &&\n      (typeof arr[0] === \"string\" || typeof arr[0] === \"number\")\n    ) {\n      [target, message] = arr;\n    } else {\n      [message] = arr;\n    }\n    return { target, message, options, callback };\n  }\n\n  if (type === \"background\") {\n    bus.on(\"__REQUEST__\", ({ id, message }, { source }) => {\n      let responded = false,\n        isAsync = false;\n      function sendResponse(resp) {\n        if (responded) return;\n        responded = true;\n        // Target the response directly back to the window that sent the request.\n        bus.emit(\"__RESPONSE__\", { id, response: resp }, { to: source });\n      }\n      const results = msgListeners\n        .map((fn) => {\n          try {\n            // msg, sender, sendResponse\n            const ret = fn(message, { id, tab: { id: source } }, sendResponse);\n            if (ret === true || (ret && typeof ret.then === \"function\")) {\n              isAsync = true;\n              return ret;\n            }\n            return ret;\n          } catch (e) {\n            _error(e);\n          }\n        })\n        .filter((r) => r !== undefined);\n\n      const promises = results.filter((r) => r && typeof r.then === \"function\");\n      if (!isAsync && promises.length === 0) {\n        const out = results.length === 1 ? results[0] : results;\n        sendResponse(out);\n      } else if (promises.length) {\n        Promise.all(promises).then((vals) => {\n          if (!responded) {\n            const out = vals.length === 1 ? vals[0] : vals;\n            sendResponse(out);\n          }\n        });\n      }\n    });\n  }\n\n  if (type !== \"background\") {\n    bus.on(\"__RESPONSE__\", ({ id, response }) => {\n      const entry = pending[id];\n      if (!entry) return;\n      entry.resolve(response);\n      if (entry.callback) entry.callback(response);\n      delete pending[id];\n    });\n  }\n\n  function sendMessage(...args) {\n    // Background should be able to send message to itself\n    // if (type === \"background\") {\n    //   throw new Error(\"Background cannot sendMessage to itself\");\n    // }\n    const { target, message, callback } = parseArgs(args);\n    const id = nextId++;\n    const promise = new Promise((resolve) => {\n      pending[id] = { resolve, callback };\n      bus.emit(\"__REQUEST__\", { id, message });\n    });\n    return promise;\n  }\n\n  bus.on(\"__PORT_CONNECT__\", ({ portId, name }, { source }) => {\n    if (type !== \"background\") return;\n    const backgroundPort = makePort(\"background\", portId, name, source);\n    ports[portId] = backgroundPort;\n\n    onConnectListeners.forEach((fn) => fn(backgroundPort));\n\n    // send back a CONNECT_ACK so the client can\n    // start listening on its end:\n    bus.emit(\"__PORT_CONNECT_ACK__\", { portId, name }, { to: source });\n  });\n\n  // Clients handle the ACK and finalize their Port object by learning the remote window.\n  bus.on(\"__PORT_CONNECT_ACK__\", ({ portId, name }, { source }) => {\n    if (type === \"background\") return; // ignore\n    const p = ports[portId];\n    if (!p) return;\n    // Call the port's internal finalize method to complete the handshake\n    if (p._finalize) {\n      p._finalize(source);\n    }\n  });\n\n  // Any port message travels via \"__PORT_MESSAGE__\"\n  bus.on(\"__PORT_MESSAGE__\", (envelope, { source }) => {\n    const { portId } = envelope;\n    const p = ports[portId];\n    if (!p) return;\n    p._receive(envelope, source);\n  });\n\n  // Any port disconnect:\n  bus.on(\"__PORT_DISCONNECT__\", ({ portId }) => {\n    const p = ports[portId];\n    if (!p) return;\n    p._disconnect();\n    delete ports[portId];\n  });\n\n  // Refactored makePort to correctly manage internal state and the connection handshake.\n  function makePort(side, portId, name, remoteWindow) {\n    let onMessageHandlers = [];\n    let onDisconnectHandlers = [];\n    let buffer = [];\n    // Unique instance ID for this port instance\n    const instanceId = Math.random().toString(36).slice(2) + Date.now();\n    // These state variables are part of the closure and are updated by _finalize\n    let _ready = side === \"background\";\n\n    function _drainBuffer() {\n      buffer.forEach((m) => _post(m));\n      buffer = [];\n    }\n\n    function _post(msg) {\n      // Always use the 'to' parameter for port messages, making them directional.\n      // Include senderInstanceId\n      bus.emit(\n        \"__PORT_MESSAGE__\",\n        { portId, msg, senderInstanceId: instanceId },\n        { to: remoteWindow }\n      );\n    }\n\n    function postMessage(msg) {\n      if (!_ready) {\n        buffer.push(msg);\n      } else {\n        _post(msg);\n      }\n    }\n\n    function _receive(envelope, source) {\n      // envelope: { msg, senderInstanceId }\n      if (envelope.senderInstanceId === instanceId) return; // Don't dispatch to self\n      onMessageHandlers.forEach((fn) =>\n        fn(envelope.msg, { id: portId, tab: { id: source } })\n      );\n    }\n\n    function disconnect() {\n      // Also use the 'to' parameter for disconnect messages\n      bus.emit(\"__PORT_DISCONNECT__\", { portId }, { to: remoteWindow });\n      _disconnect();\n      delete ports[portId];\n    }\n\n    function _disconnect() {\n      onDisconnectHandlers.forEach((fn) => fn());\n      onMessageHandlers = [];\n      onDisconnectHandlers = [];\n    }\n\n    // This function is called on the client port when the ACK is received from background.\n    // It updates the port's state, completing the connection.\n    function _finalize(win) {\n      remoteWindow = win; // <-- This is the crucial part: learn the destination\n      _ready = true;\n      _drainBuffer();\n    }\n\n    return {\n      name,\n      sender: {\n        id: portId,\n      },\n      onMessage: {\n        addListener(fn) {\n          onMessageHandlers.push(fn);\n        },\n        removeListener(fn) {\n          onMessageHandlers = onMessageHandlers.filter((x) => x !== fn);\n        },\n      },\n      onDisconnect: {\n        addListener(fn) {\n          onDisconnectHandlers.push(fn);\n        },\n        removeListener(fn) {\n          onDisconnectHandlers = onDisconnectHandlers.filter((x) => x !== fn);\n        },\n      },\n      postMessage,\n      disconnect,\n      // Internal methods used by the runtime\n      _receive,\n      _disconnect,\n      _finalize, // Expose the finalizer for the ACK handler\n    };\n  }\n\n  function connect(connectInfo = {}) {\n    if (type === \"background\") {\n      throw new Error(\"Background must use onConnect, not connect()\");\n    }\n    const name = connectInfo.name || \"\";\n    const portId = nextPortId++;\n    // create the client side port\n    // remoteWindow is initially null; it will be set by _finalize upon ACK.\n    const clientPort = makePort(\"client\", portId, name, null);\n    ports[portId] = clientPort;\n\n    // fire the connect event across the bus\n    bus.emit(\"__PORT_CONNECT__\", { portId, name });\n    return clientPort;\n  }\n\n  function onConnect(fn) {\n    if (type !== \"background\") {\n      throw new Error(\"connect event only fires in background\");\n    }\n    onConnectListeners.push(fn);\n  }\n\n  return {\n    // rpc:\n    sendMessage,\n    onMessage: {\n      addListener(fn) {\n        msgListeners.push(fn);\n      },\n      removeListener(fn) {\n        const i = msgListeners.indexOf(fn);\n        if (i >= 0) msgListeners.splice(i, 1);\n      },\n    },\n\n    // port API:\n    connect,\n    onConnect: {\n      addListener(fn) {\n        onConnect(fn);\n      },\n      removeListener(fn) {\n        const i = onConnectListeners.indexOf(fn);\n        if (i >= 0) onConnectListeners.splice(i, 1);\n      },\n    },\n  };\n}\n\n\n// --- Abstraction Layer: PostMessage Target\n\nlet nextRequestId = 1;\nconst pendingRequests = new Map(); // requestId -> { resolve, reject, timeout }\n\nfunction sendAbstractionRequest(method, args = []) {\n  return new Promise((resolve, reject) => {\n    const requestId = nextRequestId++;\n\n    const timeout = setTimeout(() => {\n      pendingRequests.delete(requestId);\n      reject(new Error(`PostMessage request timeout for method: ${method}`));\n    }, 10000);\n\n    pendingRequests.set(requestId, { resolve, reject, timeout });\n\n    window.parent.postMessage({\n      type: \"abstraction-request\",\n      requestId,\n      method,\n      args,\n    });\n  });\n}\n\nwindow.addEventListener(\"message\", (event) => {\n  const { type, requestId, success, result, error } = event.data;\n\n  if (type === \"abstraction-response\") {\n    const pending = pendingRequests.get(requestId);\n    if (pending) {\n      clearTimeout(pending.timeout);\n      pendingRequests.delete(requestId);\n\n      if (success) {\n        pending.resolve(result);\n      } else {\n        const err = new Error(error.message);\n        err.stack = error.stack;\n        pending.reject(err);\n      }\n    }\n  }\n});\n\nasync function _storageSet(items) {\n  return sendAbstractionRequest(\"_storageSet\", [items]);\n}\n\nasync function _storageGet(keys) {\n  return sendAbstractionRequest(\"_storageGet\", [keys]);\n}\n\nasync function _storageRemove(keysToRemove) {\n  return sendAbstractionRequest(\"_storageRemove\", [keysToRemove]);\n}\n\nasync function _storageClear() {\n  return sendAbstractionRequest(\"_storageClear\");\n}\n\nasync function _cookieList(details) {\n  return sendAbstractionRequest(\"_cookieList\", [details]);\n}\n\nasync function _cookieSet(details) {\n  return sendAbstractionRequest(\"_cookieSet\", [details]);\n}\n\nasync function _cookieDelete(details) {\n  return sendAbstractionRequest(\"_cookieDelete\", [details]);\n}\n\nasync function _fetch(url, options) {\n  return sendAbstractionRequest(\"_fetch\", [url, options]);\n}\n\nfunction _registerMenuCommand(name, func) {\n  _warn(\"_registerMenuCommand called from iframe context:\", name);\n  return sendAbstractionRequest(\"_registerMenuCommand\", [\n    name,\n    func.toString(),\n  ]);\n}\n\nfunction _openTab(url, active) {\n  return sendAbstractionRequest(\"_openTab\", [url, active]);\n}\n\nasync function _initStorage() {\n  return sendAbstractionRequest(\"_initStorage\");\n}\n\n\nconst EXTENSION_ASSETS_MAP = {{EXTENSION_ASSETS_MAP}};\n\n// -- Polyfill Implementation\nfunction buildPolyfill({ isBackground = false, isOtherPage = false } = {}) {\n  // Generate a unique context ID for this polyfill instance\n  const contextType = isBackground\n    ? \"background\"\n    : isOtherPage\n      ? \"options\"\n      : \"content\";\n  const contextId = `${contextType}_${Math.random()\n    .toString(36)\n    .substring(2, 15)}`;\n\n  const IS_IFRAME = \"true\" === \"true\";\n  const BUS = (function () {\n    if (globalThis.__BUS) {\n      return globalThis.__BUS;\n    }\n    globalThis.__BUS = createEventBus(\n      \"afterthecall-ai-meeting-notes-for-meet-zoom-teams-webex-whatsapp\",\n      IS_IFRAME ? \"iframe\" : \"page\",\n    );\n    return globalThis.__BUS;\n  })();\n  const RUNTIME = createRuntime(isBackground ? \"background\" : \"tab\", BUS);\n  const createNoopListeners = () => ({\n    addListener: (callback) => {\n      _log(\"addListener\", callback);\n    },\n    removeListener: (callback) => {\n      _log(\"removeListener\", callback);\n    },\n  });\n  // TODO: Stub\n  const storageChangeListeners = new Set();\n  function broadcastStorageChange(changes, areaName) {\n    storageChangeListeners.forEach((listener) => {\n      listener(changes, areaName);\n    });\n  }\n\n  let REQ_PERMS = [];\n\n  // --- Chrome polyfill\n  let chrome = {\n    extension: {\n      isAllowedIncognitoAccess: () => Promise.resolve(true),\n      sendMessage: (...args) => _messagingHandler.sendMessage(...args),\n    },\n    permissions: {\n      // TODO: Remove origin permission means exclude from origin in startup (when checking for content scripts)\n      request: (permissions, callback) => {\n        _log(\"permissions.request\", permissions, callback);\n        if (Array.isArray(permissions)) {\n          REQ_PERMS = [...REQ_PERMS, ...permissions];\n        }\n        if (typeof callback === \"function\") {\n          callback(permissions);\n        }\n        return Promise.resolve(permissions);\n      },\n      contains: (permissions, callback) => {\n        if (typeof callback === \"function\") {\n          callback(true);\n        }\n        return Promise.resolve(true);\n      },\n      getAll: () => {\n        return Promise.resolve({\n          permissions: EXTENSION_PERMISSIONS,\n          origins: ORIGIN_PERMISSIONS,\n        });\n      },\n      onAdded: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n    },\n    i18n: {\n      getUILanguage: () => {\n        return USED_LOCALE || \"en\";\n      },\n      getMessage: (key, substitutions = []) => {\n        if (typeof substitutions === \"string\") {\n          substitutions = [substitutions];\n        }\n        if (typeof LOCALE_KEYS !== \"undefined\" && LOCALE_KEYS[key]) {\n          return LOCALE_KEYS[key].message?.replace(\n            /\\$(\\d+)/g,\n            (match, p1) => substitutions[p1 - 1] || match,\n          );\n        }\n        return key;\n      },\n    },\n    alarms: {\n      onAlarm: createNoopListeners(),\n      create: () => {\n        _log(\"alarms.create\", arguments);\n      },\n      get: () => {\n        _log(\"alarms.get\", arguments);\n      },\n    },\n    runtime: {\n      ...RUNTIME,\n      onInstalled: createNoopListeners(),\n      onStartup: createNoopListeners(),\n      // TODO: Postmessage to parent to open options page or call openOptionsPage\n      openOptionsPage: () => {\n        // const url = chrome.runtime.getURL(OPTIONS_PAGE_PATH);\n        // console.log(\"openOptionsPage\", _openTab, url, EXTENSION_ASSETS_MAP);\n        // _openTab(url);\n        if (typeof openOptionsPage === \"function\") {\n          openOptionsPage();\n        } else if (window.parent) {\n          window.parent.postMessage({ type: \"openOptionsPage\" }, \"*\");\n        } else {\n          _warn(\"openOptionsPage not available.\");\n        }\n      },\n      getManifest: () => {\n        // The manifest object will be injected into the scope where buildPolyfill is called\n        if (typeof INJECTED_MANIFEST !== \"undefined\") {\n          return JSON.parse(JSON.stringify(INJECTED_MANIFEST)); // Return deep copy\n        }\n        _warn(\"INJECTED_MANIFEST not found for chrome.runtime.getManifest\");\n        return { name: \"Unknown\", version: \"0.0\", manifest_version: 2 };\n      },\n      getURL: (path) => {\n        if (!path) return \"\";\n        if (path.startsWith(\"/\")) {\n          path = path.substring(1);\n        }\n\n        if (typeof _createAssetUrl === \"function\") {\n          return _createAssetUrl(path);\n        }\n\n        _warn(\n          `chrome.runtime.getURL fallback for '${path}'. Assets may not be available.`,\n        );\n        // Attempt a relative path resolution (highly context-dependent and likely wrong)\n        try {\n          if (window.location.protocol.startsWith(\"http\")) {\n            return new URL(path, window.location.href).toString();\n          }\n        } catch (e) {\n          /* ignore error, fallback */\n        }\n        return path;\n      },\n      id: \"polyfilled-extension-\" + Math.random().toString(36).substring(2, 15),\n      lastError: null,\n      setUninstallURL: () => {},\n      setUpdateURL: () => {},\n      getPlatformInfo: async () => {\n        const platform = {\n          os: \"unknown\",\n          arch: \"unknown\",\n          nacl_arch: \"unknown\",\n        };\n\n        if (typeof navigator !== \"undefined\") {\n          const userAgent = navigator.userAgent.toLowerCase();\n          if (userAgent.includes(\"mac\")) platform.os = \"mac\";\n          else if (userAgent.includes(\"win\")) platform.os = \"win\";\n          else if (userAgent.includes(\"linux\")) platform.os = \"linux\";\n          else if (userAgent.includes(\"android\")) platform.os = \"android\";\n          else if (userAgent.includes(\"ios\")) platform.os = \"ios\";\n\n          if (userAgent.includes(\"x86_64\") || userAgent.includes(\"amd64\")) {\n            platform.arch = \"x86-64\";\n          } else if (userAgent.includes(\"i386\") || userAgent.includes(\"i686\")) {\n            platform.arch = \"x86-32\";\n          } else if (userAgent.includes(\"arm\")) {\n            platform.arch = \"arm\";\n          }\n        }\n\n        return platform;\n      },\n      getBrowserInfo: async () => {\n        const info = {\n          name: \"unknown\",\n          version: \"unknown\",\n          buildID: \"unknown\",\n        };\n\n        if (typeof navigator !== \"undefined\") {\n          const userAgent = navigator.userAgent;\n          if (userAgent.includes(\"Chrome\")) {\n            info.name = \"Chrome\";\n            const match = userAgent.match(/Chrome\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          } else if (userAgent.includes(\"Firefox\")) {\n            info.name = \"Firefox\";\n            const match = userAgent.match(/Firefox\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          } else if (userAgent.includes(\"Safari\")) {\n            info.name = \"Safari\";\n            const match = userAgent.match(/Version\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          }\n        }\n\n        return info;\n      },\n    },\n    storage: {\n      local: {\n        get: function (keys, callback) {\n          if (typeof _storageGet !== \"function\")\n            throw new Error(\"_storageGet not defined\");\n\n          const promise = _storageGet(keys);\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.get callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.get error:\", error);\n                callback({});\n              });\n            return;\n          }\n\n          return promise;\n        },\n        set: function (items, callback) {\n          if (typeof _storageSet !== \"function\")\n            throw new Error(\"_storageSet not defined\");\n\n          const promise = _storageSet(items).then((result) => {\n            broadcastStorageChange(items, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.set callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.set error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        remove: function (keys, callback) {\n          if (typeof _storageRemove !== \"function\")\n            throw new Error(\"_storageRemove not defined\");\n\n          const promise = _storageRemove(keys).then((result) => {\n            const changes = {};\n            const keyList = Array.isArray(keys) ? keys : [keys];\n            keyList.forEach((key) => {\n              changes[key] = { oldValue: undefined, newValue: undefined };\n            });\n            broadcastStorageChange(changes, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.remove callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.remove error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        clear: function (callback) {\n          if (typeof _storageClear !== \"function\")\n            throw new Error(\"_storageClear not defined\");\n\n          const promise = _storageClear().then((result) => {\n            broadcastStorageChange({}, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.clear callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.clear error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        onChanged: {\n          addListener: (callback) => {\n            storageChangeListeners.add(callback);\n          },\n          removeListener: (callback) => {\n            storageChangeListeners.delete(callback);\n          },\n        },\n      },\n      sync: {\n        get: function (keys, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n          return chrome.storage.local.get(keys, callback);\n        },\n        set: function (items, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.set(items).then((result) => {\n            broadcastStorageChange(items, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.set callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.set error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        remove: function (keys, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.remove(keys).then((result) => {\n            const changes = {};\n            const keyList = Array.isArray(keys) ? keys : [keys];\n            keyList.forEach((key) => {\n              changes[key] = { oldValue: undefined, newValue: undefined };\n            });\n            broadcastStorageChange(changes, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.remove callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.remove error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        clear: function (callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.clear().then((result) => {\n            broadcastStorageChange({}, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.clear callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.clear error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        onChanged: {\n          addListener: (callback) => {\n            storageChangeListeners.add(callback);\n          },\n          removeListener: (callback) => {\n            storageChangeListeners.delete(callback);\n          },\n        },\n      },\n      onChanged: {\n        addListener: (callback) => {\n          storageChangeListeners.add(callback);\n        },\n        removeListener: (callback) => {\n          storageChangeListeners.delete(callback);\n        },\n      },\n      managed: {\n        get: function (keys, callback) {\n          _warn(\"chrome.storage.managed polyfill is read-only empty.\");\n\n          const promise = Promise.resolve({});\n\n          if (typeof callback === \"function\") {\n            promise.then((result) => {\n              try {\n                callback(result);\n              } catch (e) {\n                _error(\"Error in storage.managed.get callback:\", e);\n              }\n            });\n            return;\n          }\n\n          return promise;\n        },\n      },\n    },\n    cookies: (function () {\n      const cookieChangeListeners = new Set();\n      function broadcastCookieChange(changeInfo) {\n        cookieChangeListeners.forEach((listener) => {\n          try {\n            listener(changeInfo);\n          } catch (e) {\n            _error(\"Error in cookies.onChanged listener:\", e);\n          }\n        });\n      }\n\n      function handlePromiseCallback(promise, callback) {\n        if (typeof callback === \"function\") {\n          promise\n            .then((result) => callback(result))\n            .catch((error) => {\n              // chrome.runtime.lastError = { message: error.message }; // TODO: Implement lastError\n              _error(error);\n              callback(); // Call with undefined on error\n            });\n          return;\n        }\n        return promise;\n      }\n\n      return {\n        get: function (details, callback) {\n          if (typeof _cookieList !== \"function\") {\n            return handlePromiseCallback(\n              Promise.reject(new Error(\"_cookieList not defined\")),\n              callback,\n            );\n          }\n          const promise = _cookieList({\n            url: details.url,\n            name: details.name,\n            storeId: details.storeId,\n            partitionKey: details.partitionKey,\n          }).then((cookies) => {\n            if (!cookies || cookies.length === 0) {\n              return null;\n            }\n            // Sort by path length (longest first), then creation time (earliest first, if available)\n            cookies.sort((a, b) => {\n              const pathLenDiff = (b.path || \"\").length - (a.path || \"\").length;\n              if (pathLenDiff !== 0) return pathLenDiff;\n              return (a.creationTime || 0) - (b.creationTime || 0);\n            });\n            return cookies[0];\n          });\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getAll: function (details, callback) {\n          if (typeof _cookieList !== \"function\") {\n            return handlePromiseCallback(\n              Promise.reject(new Error(\"_cookieList not defined\")),\n              callback,\n            );\n          }\n          if (details.partitionKey) {\n            _warn(\n              \"cookies.getAll: partitionKey is not fully supported in this environment.\",\n            );\n          }\n          const promise = _cookieList(details);\n          return handlePromiseCallback(promise, callback);\n        },\n\n        set: function (details, callback) {\n          const promise = (async () => {\n            if (\n              typeof _cookieSet !== \"function\" ||\n              typeof _cookieList !== \"function\"\n            ) {\n              throw new Error(\"_cookieSet or _cookieList not defined\");\n            }\n            if (details.partitionKey) {\n              _warn(\n                \"cookies.set: partitionKey is not fully supported in this environment.\",\n              );\n            }\n\n            const getDetails = {\n              url: details.url,\n              name: details.name,\n              storeId: details.storeId,\n            };\n            const oldCookies = await _cookieList(getDetails);\n            const oldCookie = oldCookies && oldCookies[0];\n\n            if (oldCookie) {\n              broadcastCookieChange({\n                cause: \"overwrite\",\n                cookie: oldCookie,\n                removed: true,\n              });\n            }\n\n            await _cookieSet(details);\n            const newCookies = await _cookieList(getDetails);\n            const newCookie = newCookies && newCookies[0];\n\n            if (newCookie) {\n              broadcastCookieChange({\n                cause: \"explicit\",\n                cookie: newCookie,\n                removed: false,\n              });\n            }\n            return newCookie || null;\n          })();\n          return handlePromiseCallback(promise, callback);\n        },\n\n        remove: function (details, callback) {\n          const promise = (async () => {\n            if (\n              typeof _cookieDelete !== \"function\" ||\n              typeof _cookieList !== \"function\"\n            ) {\n              throw new Error(\"_cookieDelete or _cookieList not defined\");\n            }\n            const oldCookies = await _cookieList(details);\n            const oldCookie = oldCookies && oldCookies[0];\n\n            if (!oldCookie) return null; // Nothing to remove\n\n            await _cookieDelete(details);\n\n            broadcastCookieChange({\n              cause: \"explicit\",\n              cookie: oldCookie,\n              removed: true,\n            });\n\n            return {\n              url: details.url,\n              name: details.name,\n              storeId: details.storeId || \"0\",\n              partitionKey: details.partitionKey,\n            };\n          })();\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getAllCookieStores: function (callback) {\n          const promise = Promise.resolve([\n            { id: \"0\", tabIds: [1] }, // Mock store for the current context\n          ]);\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getPartitionKey: function (details, callback) {\n          _warn(\n            \"chrome.cookies.getPartitionKey is not supported in this environment.\",\n          );\n          const promise = Promise.resolve({ partitionKey: {} }); // Return empty partition key\n          return handlePromiseCallback(promise, callback);\n        },\n\n        onChanged: {\n          addListener: (callback) => {\n            if (typeof callback === \"function\") {\n              cookieChangeListeners.add(callback);\n            }\n          },\n          removeListener: (callback) => {\n            cookieChangeListeners.delete(callback);\n          },\n        },\n      };\n    })(),\n    tabs: {\n      query: async (queryInfo) => {\n        _warn(\"chrome.tabs.query polyfill only returns current tab info.\");\n        const dummyId = Math.floor(Math.random() * 1000) + 1;\n        return [\n          {\n            id: dummyId,\n            url: CURRENT_LOCATION,\n            active: true,\n            windowId: 1,\n            status: \"complete\",\n          },\n        ];\n      },\n      create: async ({ url, active = true }) => {\n        _log(`[Polyfill tabs.create] URL: ${url}`);\n        if (typeof _openTab !== \"function\")\n          throw new Error(\"_openTab not defined\");\n        _openTab(url, active);\n        const dummyId = Math.floor(Math.random() * 1000) + 1001;\n        return Promise.resolve({\n          id: dummyId,\n          url: url,\n          active,\n          windowId: 1,\n        });\n      },\n      sendMessage: async (tabId, message) => {\n        _warn(\n          `chrome.tabs.sendMessage polyfill (to tab ${tabId}) redirects to runtime.sendMessage (current context).`,\n        );\n        return chrome.runtime.sendMessage(message);\n      },\n      onActivated: createNoopListeners(),\n      onUpdated: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n      onReplaced: createNoopListeners(),\n      onCreated: createNoopListeners(),\n      onMoved: createNoopListeners(),\n      onDetached: createNoopListeners(),\n      onAttached: createNoopListeners(),\n    },\n    windows: {\n      onFocusChanged: createNoopListeners(),\n      onCreated: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n      onFocused: createNoopListeners(),\n      onFocus: createNoopListeners(),\n      onBlur: createNoopListeners(),\n      onFocused: createNoopListeners(),\n    },\n    notifications: {\n      create: async (notificationId, options) => {\n        try {\n          let id = notificationId;\n          let notificationOptions = options;\n\n          if (typeof notificationId === \"object\" && notificationId !== null) {\n            notificationOptions = notificationId;\n            id = \"notification_\" + Math.random().toString(36).substring(2, 15);\n          } else if (typeof notificationId === \"string\" && options) {\n            id = notificationId;\n            notificationOptions = options;\n          } else {\n            throw new Error(\"Invalid parameters for notifications.create\");\n          }\n\n          if (!notificationOptions || typeof notificationOptions !== \"object\") {\n            throw new Error(\"Notification options must be an object\");\n          }\n\n          const {\n            title,\n            message,\n            iconUrl,\n            type = \"basic\",\n          } = notificationOptions;\n\n          if (!title || !message) {\n            throw new Error(\"Notification must have title and message\");\n          }\n\n          if (\"Notification\" in window) {\n            if (Notification.permission === \"granted\") {\n              const notification = new Notification(title, {\n                body: message,\n                icon: iconUrl,\n                tag: id,\n              });\n\n              _log(`[Notifications] Created notification: ${id}`);\n              return id;\n            } else if (Notification.permission === \"default\") {\n              const permission = await Notification.requestPermission();\n              if (permission === \"granted\") {\n                const notification = new Notification(title, {\n                  body: message,\n                  icon: iconUrl,\n                  tag: id,\n                });\n                _log(\n                  `[Notifications] Created notification after permission: ${id}`,\n                );\n                return id;\n              } else {\n                _warn(\"[Notifications] Permission denied for notifications\");\n                return id;\n              }\n            } else {\n              _warn(\"[Notifications] Notifications are blocked\");\n              return id;\n            }\n          } else {\n            _warn(\n              \"[Notifications] Native notifications not supported, using console fallback\",\n            );\n            _log(`[Notification] ${title}: ${message}`);\n            return id;\n          }\n        } catch (error) {\n          _error(\"[Notifications] Error creating notification:\", error.message);\n          throw error;\n        }\n      },\n      clear: async (notificationId) => {\n        _log(`[Notifications] Clear notification: ${notificationId}`);\n        // For native notifications, there's no direct way to clear by ID\n        // This is a limitation of the Web Notifications API\n        return true;\n      },\n      getAll: async () => {\n        _warn(\"[Notifications] getAll not fully supported in polyfill\");\n        return {};\n      },\n      getPermissionLevel: async () => {\n        if (\"Notification\" in window) {\n          const permission = Notification.permission;\n          return { level: permission === \"granted\" ? \"granted\" : \"denied\" };\n        }\n        return { level: \"denied\" };\n      },\n    },\n    contextMenus: {\n      create: (createProperties, callback) => {\n        try {\n          if (!createProperties || typeof createProperties !== \"object\") {\n            throw new Error(\"Context menu create properties must be an object\");\n          }\n\n          const { id, title, contexts = [\"page\"], onclick } = createProperties;\n          const menuId =\n            id || `menu_${Math.random().toString(36).substring(2, 15)}`;\n\n          if (!title || typeof title !== \"string\") {\n            throw new Error(\"Context menu must have a title\");\n          }\n\n          // Store menu items for potential use\n          if (!window._polyfillContextMenus) {\n            window._polyfillContextMenus = new Map();\n          }\n\n          window._polyfillContextMenus.set(menuId, {\n            id: menuId,\n            title,\n            contexts,\n            onclick,\n            enabled: createProperties.enabled !== false,\n          });\n\n          _log(\n            `[ContextMenus] Created context menu item: ${title} (${menuId})`,\n          );\n\n          // Try to register a menu command as fallback\n          if (typeof _registerMenuCommand === \"function\") {\n            try {\n              _registerMenuCommand(\n                title,\n                onclick ||\n                  (() => {\n                    _log(`Context menu clicked: ${title}`);\n                  }),\n              );\n            } catch (e) {\n              _warn(\n                \"[ContextMenus] Failed to register as menu command:\",\n                e.message,\n              );\n            }\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n\n          return menuId;\n        } catch (error) {\n          _error(\"[ContextMenus] Error creating context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n          throw error;\n        }\n      },\n      update: (id, updateProperties, callback) => {\n        try {\n          if (\n            !window._polyfillContextMenus ||\n            !window._polyfillContextMenus.has(id)\n          ) {\n            throw new Error(`Context menu item not found: ${id}`);\n          }\n\n          const menuItem = window._polyfillContextMenus.get(id);\n          Object.assign(menuItem, updateProperties);\n\n          _log(`[ContextMenus] Updated context menu item: ${id}`);\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\"[ContextMenus] Error updating context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      remove: (menuItemId, callback) => {\n        try {\n          if (\n            window._polyfillContextMenus &&\n            window._polyfillContextMenus.has(menuItemId)\n          ) {\n            window._polyfillContextMenus.delete(menuItemId);\n            _log(`[ContextMenus] Removed context menu item: ${menuItemId}`);\n          } else {\n            _warn(\n              `[ContextMenus] Context menu item not found for removal: ${menuItemId}`,\n            );\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\"[ContextMenus] Error removing context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      removeAll: (callback) => {\n        try {\n          if (window._polyfillContextMenus) {\n            const count = window._polyfillContextMenus.size;\n            window._polyfillContextMenus.clear();\n            _log(`[ContextMenus] Removed all ${count} context menu items`);\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\n            \"[ContextMenus] Error removing all context menus:\",\n            error.message,\n          );\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      onClicked: {\n        addListener: (callback) => {\n          if (!window._polyfillContextMenuListeners) {\n            window._polyfillContextMenuListeners = new Set();\n          }\n          window._polyfillContextMenuListeners.add(callback);\n          _log(\"[ContextMenus] Added click listener\");\n        },\n        removeListener: (callback) => {\n          if (window._polyfillContextMenuListeners) {\n            window._polyfillContextMenuListeners.delete(callback);\n            _log(\"[ContextMenus] Removed click listener\");\n          }\n        },\n      },\n    },\n  };\n\n  const tc = (fn) => {\n    try {\n      fn();\n    } catch (e) {}\n  };\n  const loggingProxyHandler = (_key) => ({\n    get(target, key, receiver) {\n      tc(() => _log(`[${contextType}] [CHROME - ${_key}] Getting ${key}`));\n      return Reflect.get(target, key, receiver);\n    },\n    set(target, key, value, receiver) {\n      tc(() =>\n        _log(`[${contextType}] [CHROME - ${_key}] Setting ${key} to ${value}`),\n      );\n      return Reflect.set(target, key, value, receiver);\n    },\n    has(target, key) {\n      tc(() =>\n        _log(`[${contextType}] [CHROME - ${_key}] Checking if ${key} exists`),\n      );\n      return Reflect.has(target, key);\n    },\n  });\n  chrome = Object.fromEntries(\n    Object.entries(chrome).map(([key, value]) => [\n      key,\n      new Proxy(value, loggingProxyHandler(key)),\n    ]),\n  );\n\n  // Alias browser to chrome for common Firefox pattern\n  const browser = new Proxy(chrome, loggingProxyHandler);\n\n  const oldGlobalThis = globalThis;\n  const oldWindow = window;\n  const oldSelf = self;\n  const oldGlobal = globalThis;\n  const __globalsStorage = {};\n\n  const TO_MODIFY = [oldGlobalThis, oldWindow, oldSelf, oldGlobal];\n  const set = (k, v) => {\n    __globalsStorage[k] = v;\n    TO_MODIFY.forEach((target) => {\n      target[k] = v;\n    });\n  };\n  const proxyHandler = {\n    get(target, key, receiver) {\n      const fns = [\n        () => __globalsStorage[key],\n        () => Reflect.get(target, key, target),\n        () => target[key],\n      ];\n      const out = fns\n        .map((f) => {\n          try {\n            let out = f();\n            return out;\n          } catch (e) {\n            return undefined;\n          }\n        })\n        .find((f) => f !== undefined);\n      if (typeof out === \"function\") {\n        return out.bind(target);\n      }\n      return out;\n    },\n    set(target, key, value, receiver) {\n      try {\n        tc(() => _log(`[${contextType}] Setting ${key} to ${value}`));\n        set(key, value);\n        return Reflect.set(target, key, value, receiver);\n      } catch (e) {\n        _error(\"Error setting\", key, value, e);\n        try {\n          target[key] = value;\n          return true;\n        } catch (e) {\n          _error(\"Error setting\", key, value, e);\n        }\n        return false;\n      }\n    },\n    has(target, key) {\n      try {\n        return key in __globalsStorage || key in target;\n      } catch (e) {\n        _error(\"Error has\", key, e);\n        try {\n          return key in __globalsStorage || key in target;\n        } catch (e) {\n          _error(\"Error has\", key, e);\n        }\n        return false;\n      }\n    },\n    getOwnPropertyDescriptor(target, key) {\n      try {\n        if (key in __globalsStorage) {\n          return {\n            configurable: true,\n            enumerable: true,\n            writable: true,\n            value: __globalsStorage[key],\n          };\n        }\n        // fall back to the real globalThis\n        const desc = Reflect.getOwnPropertyDescriptor(target, key);\n        // ensure it's configurable so the with‑scope binding logic can override it\n        if (desc && !desc.configurable) {\n          desc.configurable = true;\n        }\n        return desc;\n      } catch (e) {\n        _error(\"Error getOwnPropertyDescriptor\", key, e);\n        return {\n          configurable: true,\n          enumerable: true,\n          writable: true,\n          value: undefined,\n        };\n      }\n    },\n\n    defineProperty(target, key, descriptor) {\n      try {\n        // Normalize descriptor to avoid mixed accessor & data attributes\n        const hasAccessor = \"get\" in descriptor || \"set\" in descriptor;\n\n        if (hasAccessor) {\n          // Build a clean descriptor without value/writable when accessors present\n          const normalized = {\n            configurable:\n              \"configurable\" in descriptor ? descriptor.configurable : true,\n            enumerable:\n              \"enumerable\" in descriptor ? descriptor.enumerable : false,\n          };\n          if (\"get\" in descriptor) normalized.get = descriptor.get;\n          if (\"set\" in descriptor) normalized.set = descriptor.set;\n\n          // Store accessor references for inspection but avoid breaking invariants\n          set(key, {\n            get: descriptor.get,\n            set: descriptor.set,\n          });\n\n          return Reflect.defineProperty(target, key, normalized);\n        }\n\n        // Data descriptor path\n        set(key, descriptor.value);\n        return Reflect.defineProperty(target, key, descriptor);\n      } catch (e) {\n        _error(\"Error defineProperty\", key, descriptor, e);\n        return false;\n      }\n    },\n  };\n\n  // Create proxies once proxyHandler is defined\n  const proxyWindow = new Proxy(oldWindow, proxyHandler);\n  const proxyGlobalThis = new Proxy(oldGlobalThis, proxyHandler);\n  const proxyGlobal = new Proxy(oldGlobal, proxyHandler);\n  const proxySelf = new Proxy(oldSelf, proxyHandler);\n\n  // Seed storage with core globals so lookups succeed inside `with` blocks\n  Object.assign(__globalsStorage, {\n    chrome,\n    browser,\n    window: proxyWindow,\n    globalThis: proxyGlobalThis,\n    global: proxyGlobal,\n    self: proxySelf,\n    document: oldWindow.document,\n  });\n\n  const __globals = {\n    chrome,\n    browser,\n    window: proxyWindow,\n    globalThis: proxyGlobalThis,\n    global: proxyGlobal,\n    self: proxySelf,\n    __globals: __globalsStorage,\n  };\n\n  __globals.contextId = contextId;\n  __globals.contextType = contextType;\n  __globals.module = undefined;\n  __globals.amd = undefined;\n  __globals.define = undefined;\n  __globals.importScripts = (...args) => {\n    _log(\"importScripts\", args);\n  };\n\n  return __globals;\n}\n\n\nif (typeof window !== 'undefined') {\n    window.buildPolyfill = buildPolyfill;\n}\n"
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