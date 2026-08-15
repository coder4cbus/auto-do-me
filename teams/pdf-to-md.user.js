// ==UserScript==
// @name        PDF to MD
// @version     0.2.2
// @description Convert any PDF tab to Markdown — 100% local, no uploads, no servers. Your files never leave your browser.
// @namespace   pdf-to-md
// @author      Converter Script
// @match       *://*/*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_registerMenuCommand
// @grant       GM_openInTab
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAJwElEQVR4nNVabawdRRl+3pnZ3XPuxzk91NuPaAqUC2IQ1EKhgqREoiaFEhtz+wciEH+p/LNEIzWokcQf/SdgREKjLQlSIwnQYEKMbcSQktLWVNKENG35iNDbwr3nfp2zHzNj3tndc/d8ldvSE+smk509++7s8349887sIRSP563EVtLcveyPZ28RRPeRNncQaC0ZUyZriSyBLEAsxOes33Yu/I6CfH8ZFO4R+AkCNQh0giD2kcXuNx+uHmDRieet3JNh5IM6wY/9/t1xUx59TBizhbyyR0kIxDHIWlxU8Fkfbb8z+Pw+QQgfQvpA3IiJxAtx1Hjk8E9XHi8qQUXwy595fzMFI38Q/lDNzk4xaE2AIFCb5bte3AM8y3+yDAoyHcq6e9aShSGQ9IZqMOHClI7m7j+4ffVLuRKUg689/cFdcnjkZUpiIAoTIqHa3DrosLHd8kUDwJpECl8JGcAuzN79+qMr9k5MWEmwlqq7PrzCo9Jhgqkgig0RyUsJPOXPGaulDARZzAg9/5V/bF91SoDIKo0dojRSRRTpInhlLJTRUMa4s+f6eTNQOj1/EpiLAZ4sx7KQNgm1Ckar2qgdjJ2WP/2fm8gPXietBVkrioPPqyEYElkC90pEAmmNatKEsByygwNPhQQHyAiSRsfRVxVJ8aDwygrxjHaACoN/++R+LAtnoUkugmgNwsMY6KER/HVsPRIr4MO2KzEA8JTmg1XBiEISP6jI0kZKIoenxR6OiQ22v/kMrp46hUQFEIysSL5E0GEE78o1eOnKAD84cy1UEEA58hiQ5W3r9WSTCAJioyJrxxFHLMh0uWhda1H3hjEXVNBQfrsCmboWMYSqYPPwaSAM8dDslwEvgMeyAwBPi78LVgDWjAsiEbgYz8AXm7IG0mpId+7VNDyrERkPm0fP4InKvyDjMPXgwMAj61v2QKDIFMAXpubcE30PVlop6DNn0NzzJ8xZwt22gefGv4/XVt+Gqo1hOnLq4oFH1rdQRfC5xZZ8COHKDHP2I1ghsBCHMKumAR27hBoYeCz2C7NtuwI9FXHZSYAxKXit07PncbEBAZ16hpuj3wGBt4uGEbnlWw8UtOtMWkiZdoeHgSQBlUrp7y5p09Zm9YGBRwuf6iwPioq0wqTRhLrpRvibNkGfPOkYhyoVIAjQ3Lkz9QiJXNPuF15k8HBUn/YLM28BeEcuWC4XRkehjx2DnZ52HqBaDcmhQ0AUpUpmJD1oy6NjUlM9hYoTB4Mvl5EcOQI7MwOqViHGxmA++AC22UzDKs+Nlg/aKXRQ4IlDqF9s5WVFGkYEOz8P+D7s3BySqSmQ5y2CL6ZKATAGDJ46WWjRYoszchtlMlgpQVkyd4LPAXNhl+f2IMFTWwi1bmS2s4Am0Wo2L0Q6mSk7DNdGLpE7ZnQMDjy1QqiH5fm6Gi9gJFlACaa7mOs4NBE803SlRSuZBwye2kNocQ2b58DLq9ZjRbASMZfTBZbpcgRPAUTwTYxJVYHHtCrVpwBPbWTSD7w7X/XEpO23DJyNEyRzH4N00rV7kDuikypHlYdyuQYS6oLAS0qxWNNjCduDLdW51rA1LrBHa4WYLlSZfQa1Lg/kBVt+vmlhNDDkE7xsbuyUL3q+nYU66NQSs410E1+vbRV30aPPXVGgYZZ36c1RypN2xzuFY2pCFFs88PUyLh+T+PNrTRx/P0HJa9+eaduGSRm+N/jc0i039mk5OTEwV+Nl44SRRaI5JNLfIt6tiSzYJLmMyPpxnDYeY+MXfXxznY+VVcHlVirbz4NdpUQH+GKCd3mqI5TY3UMeOdDGENZ+RmL5EGGuYbEQWqyqCqxZLtGM0hBhy2kN8GS+epnEZ2vCKV2fM9AG5wZfqLfUBYEvDMgD1BcsHry1jAduLeOVoyE2XOXjmpUS0wsWO/bO48YrFLasLyExwN//HeLXf5kH80JJER6eGMbG63woCew/GmGoRJAiVbAVyn3YLA2hTwHeuTB7QbVEGBsVuG9DGfV5g+OnNZYNEX41MYLbPu9j31uRC7Fv3BC4drZu8NCmIdx5g4/50OLVwxHWjXu47nLeFsjr/P7zSHcIXQD4nBFYiThdy+DVtyJMPD6Nnzw3iyixLhy27ZrF935bx9+OhjAWTtEVFYk7v+Q7r/zy2Tn86Hez+OFvZjCzkA3K+XQu8LkBuxJzieBlFj6OMPPBCZicMagEzChw4MLEoj5vnTcYHFs2SuCStOwTPpoxOPZOgsvHBN79UOPt95OUFFoEkm2296Ff1bUiW0rYAAhj60CWVXqdsxEnM7NJnoBusmEdM0bK0eXLHxRBFcZp2ynpA94Vjm1LySWCjxPg2pUKW28q4+YrPccYzusZlebPmKylS01qUa0ShMkp4xhpeUXgC2sU3ps0WDMmcc3nVEbH/cuJouLqfGNeCaDetPjWdQHuv62MN07E2HsoQlkJV3EH2cTDig4HqckZDO/y+15alQ+XgMmPDfYeCPGd20v4+XdHcNfNMdZd7aEynD7DrFSca4rgiwplNLr03QPLQCQcyzD4w6cSx//vfaxx6GSMU5MJfEnOKwfejt0L2WP8zDunDY6cSJy1q8OEZ15puHfcuS7A7df7eOmfTTRCi+vXepietc5Y5wLvzjfsOJvuhna6qV/sZQnFk1CSuI0lBCoFrBMLT6QKcrhwjvAzzPecvPztROt2mUZocdlwuliqz6Ye5md8RS5nimzXjcV5gBa3z5cInu9zsgZ+Gi5MeT5PPvm1CyHCkJd7LZORgGBU2dwhCKiUCM0wff9oOYv7jhKmf1ktoMiY0O2Pwp73LnFrFzpTytV0hRc7sU6ZfAbNEx1pUreV0B3v71VWC+YfY0J+9Lj7EmitGcS+TT8abItt07to7KLZxaQ2/AWTiI4LGOx3F25Zc3HA9x6nX4hSb5m+Y3DgwCrhM0fv5w3MnTZuJJxm/w/gyY0hSMeNRCbJTnH4x2MHbRy96JVrHFTJJQ/emKRcqgiTRC/uemrsoODPrFJ720w4V5fCl/wps1hvX1LgrfvMKuNwoU6KtvF3cDGxFeKNn9VO2mj+XiEDYgHW8lxg/leWl8KXSniko/De3Y/XTm7dCiH27CHNn+3f2L56r1mYvkeQmPKHlrtda9aYjPvcf3HA4/zAg4mFMfBkWKpxsTIVN+r3PPvUZe4rPWPP68PWv0A2PHp6XAXDj5HRW5Qqe/wxjVtaHZ7nvk1L5pOrSuq6LyCFD2YbnTRiQfIFncw8svvJlcdz8G7s1h5Fx19ZvvaL+i1K0H0w5g5Yu5aszf5ukwJaOvjFMOgl2wd8+ncbK04Iwj6r9e7dT2Z/tymA5+v/AhJLm67BxjZAAAAAAElFTkSuQmCC
// @run-at      document-idle
// ==/UserScript==

console.log("Script start:",performance.now());const e=!0,t=e=>e,o="passthrough";let s,c={createHTML:t,createScript:t,createScriptURL:t},i=!1;const r=()=>{try{void 0!==window.isSecureContext&&window.isSecureContext&&window.trustedTypes&&window.trustedTypes.createPolicy&&(i=!0,trustedTypes.defaultPolicy?(l("TT Default Policy exists"),c=window.trustedTypes.createPolicy("default",c),s=trustedTypes.defaultPolicy,l(`Created custom passthrough policy, in case the default policy is too restrictive: Use Policy '${o}' in var 'TTP':`,c)):s=c=window.trustedTypes.createPolicy("default",c),l("Trusted-Type Policies: TTP:",c,"TTP_default:",s))}catch(e){l(e)}},l=(...e)=>{console.log(...e)};r();

(function() {
    // #region Logging
	
	  const SCRIPT_NAME = "PDF to MD";
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
			  "popup.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <title>PDF to MD</title>\n    <link rel=\"stylesheet\" href=\"data:text/css;base64,KiB7CiAgYm94LXNpemluZzogYm9yZGVyLWJveDsKICBtYXJnaW46IDA7CiAgcGFkZGluZzogMDsKfQoKYm9keSB7CiAgd2lkdGg6IDM0MHB4OwogIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICJTZWdvZSBVSSIsIHN5c3RlbS11aSwgc2Fucy1zZXJpZjsKICBmb250LXNpemU6IDEzcHg7CiAgYmFja2dyb3VuZDogI2ZhZmFmYTsKICBjb2xvcjogIzFhMWExYTsKfQoKaGVhZGVyIHsKICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMGVhNWU5LCAjNjM2NmYxKTsKICBjb2xvcjogd2hpdGU7CiAgcGFkZGluZzogMTRweCAxNnB4Owp9CgpoZWFkZXIgaDEgewogIGZvbnQtc2l6ZTogMTZweDsKICBmb250LXdlaWdodDogNjAwOwogIGRpc3BsYXk6IGZsZXg7CiAgYWxpZ24taXRlbXM6IGNlbnRlcjsKICBnYXA6IDZweDsKfQoKLmJhZGdlIHsKICBmb250LXNpemU6IDlweDsKICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpOwogIHBhZGRpbmc6IDJweCA2cHg7CiAgYm9yZGVyLXJhZGl1czogNHB4OwogIGZvbnQtd2VpZ2h0OiA1MDA7CiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4Owp9CgpoZWFkZXIgLnRhZyB7CiAgZm9udC1zaXplOiAxMXB4OwogIG9wYWNpdHk6IDAuODU7CiAgbWFyZ2luLXRvcDogMnB4Owp9CgptYWluIHsKICBwYWRkaW5nOiAxNHB4IDE2cHg7Cn0KCiNpbmZvIHsKICBiYWNrZ3JvdW5kOiB3aGl0ZTsKICBib3JkZXI6IDFweCBzb2xpZCAjZTVlNWU1OwogIGJvcmRlci1yYWRpdXM6IDZweDsKICBwYWRkaW5nOiAxMHB4IDEycHg7CiAgbWFyZ2luLWJvdHRvbTogMTJweDsKfQoKLnJvdyB7CiAgZGlzcGxheTogZmxleDsKICBnYXA6IDZweDsKICBmb250LXNpemU6IDEycHg7CiAgbWFyZ2luLWJvdHRvbTogNHB4Owp9Cgoucm93Omxhc3QtY2hpbGQgewogIG1hcmdpbi1ib3R0b206IDA7Cn0KLmxhYmVsIHsKICBjb2xvcjogIzZiNzI4MDsKICBmbGV4LXNocmluazogMDsKfQojZmlsZW5hbWUsCiNzdGF0dXMgewogIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDsKICBmbGV4OiAxOwp9CgouaGludCB7CiAgZm9udC1zaXplOiAxMXB4OwogIGNvbG9yOiAjNmI3MjgwOwogIG1hcmdpbi10b3A6IDZweDsKICBmb250LXN0eWxlOiBpdGFsaWM7CiAgbWluLWhlaWdodDogMDsKfQoKLyogSW5kZXRlcm1pbmF0ZSBwcm9ncmVzcyBiYXIgc2hvd24gd2hpbGUgbG9hZGluZyAvIGNvbnZlcnRpbmcuCiAgIEFuaW1hdGVkIHdpdGggYHRyYW5zZm9ybWAgKG5vdCBtYXJnaW4vd2lkdGgpIHNvIGl0IHJ1bnMgb24gdGhlIGNvbXBvc2l0b3IKICAgdGhyZWFkIGFuZCBrZWVwcyBtb3ZpbmcgZXZlbiB3aGlsZSB0aGUgb2Zmc2NyZWVuIGRvY3VtZW50IGJsb2NrcyBpdHMgbWFpbgogICB0aHJlYWQgcnVubmluZyB0aGUgc3luY2hyb25vdXMgUHl0aG9uIGNvbnZlcnNpb24uICovCi5iYXIgewogIHBvc2l0aW9uOiByZWxhdGl2ZTsKICBoZWlnaHQ6IDRweDsKICBib3JkZXItcmFkaXVzOiAycHg7CiAgYmFja2dyb3VuZDogI2U1ZTdlYjsKICBvdmVyZmxvdzogaGlkZGVuOwogIG1hcmdpbi1ib3R0b206IDEycHg7Cn0KLmJhci1maWxsIHsKICBwb3NpdGlvbjogYWJzb2x1dGU7CiAgdG9wOiAwOwogIGxlZnQ6IDA7CiAgaGVpZ2h0OiAxMDAlOwogIHdpZHRoOiA0MCU7CiAgYm9yZGVyLXJhZGl1czogMnB4OwogIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzBlYTVlOSwgIzYzNjZmMSk7CiAgYW5pbWF0aW9uOiBiYXItc2xpZGUgMS4xcyBsaW5lYXIgaW5maW5pdGU7CiAgd2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTsKfQpAa2V5ZnJhbWVzIGJhci1zbGlkZSB7CiAgMCUgewogICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMTAlKTsKICB9CiAgMTAwJSB7CiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMzEwJSk7CiAgfQp9CkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7CiAgLmJhci1maWxsIHsKICAgIGFuaW1hdGlvbjogbm9uZTsKICAgIHRyYW5zZm9ybTogbm9uZTsKICAgIHdpZHRoOiAxMDAlOwogICAgb3BhY2l0eTogMC42OwogIH0KfQoKYnV0dG9uIHsKICB3aWR0aDogMTAwJTsKICBwYWRkaW5nOiA5cHg7CiAgYmFja2dyb3VuZDogIzBlYTVlOTsKICBjb2xvcjogd2hpdGU7CiAgYm9yZGVyOiBub25lOwogIGJvcmRlci1yYWRpdXM6IDZweDsKICBmb250LXNpemU6IDEzcHg7CiAgZm9udC13ZWlnaHQ6IDYwMDsKICBjdXJzb3I6IHBvaW50ZXI7CiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1czsKfQoKYnV0dG9uOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsKICBiYWNrZ3JvdW5kOiAjMDI4NGM3Owp9CmJ1dHRvbjpkaXNhYmxlZCB7CiAgYmFja2dyb3VuZDogI2QxZDVkYjsKICBjdXJzb3I6IG5vdC1hbGxvd2VkOwp9CmJ1dHRvbjpmb2N1cy12aXNpYmxlIHsKICBvdXRsaW5lOiAycHggc29saWQgIzYzNjZmMTsKICBvdXRsaW5lLW9mZnNldDogMnB4Owp9CgpidXR0b24uc2Vjb25kYXJ5IHsKICBiYWNrZ3JvdW5kOiAjZjFmNWY5OwogIGNvbG9yOiAjMGYxNzJhOwogIGJvcmRlcjogMXB4IHNvbGlkICNjYmQ1ZTE7Cn0KYnV0dG9uLnNlY29uZGFyeTpob3Zlcjpub3QoOmRpc2FibGVkKSB7CiAgYmFja2dyb3VuZDogI2UyZThmMDsKfQoKI2NhbmNlbCB7CiAgbWFyZ2luLXRvcDogOHB4Owp9CgojcmVzdWx0IHsKICBtYXJnaW4tdG9wOiAxMnB4Owp9CiNwcmV2aWV3IHsKICBtYXgtaGVpZ2h0OiAxNjBweDsKICBvdmVyZmxvdzogYXV0bzsKICBiYWNrZ3JvdW5kOiB3aGl0ZTsKICBib3JkZXI6IDFweCBzb2xpZCAjZTVlNWU1OwogIGJvcmRlci1yYWRpdXM6IDZweDsKICBwYWRkaW5nOiA4cHggMTBweDsKICBmb250LWZhbWlseTogdWktbW9ub3NwYWNlLCBTRk1vbm8tUmVndWxhciwgTWVubG8sIENvbnNvbGFzLCBtb25vc3BhY2U7CiAgZm9udC1zaXplOiAxMXB4OwogIGxpbmUtaGVpZ2h0OiAxLjQ7CiAgd2hpdGUtc3BhY2U6IHByZS13cmFwOwogIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7CiAgY29sb3I6ICMzMzQxNTU7CiAgbWFyZ2luLWJvdHRvbTogMTBweDsKfQoub3B0cyB7CiAgZGlzcGxheTogZmxleDsKICBmbGV4LWRpcmVjdGlvbjogY29sdW1uOwogIGdhcDogNnB4OwogIG1hcmdpbi1ib3R0b206IDEwcHg7CiAgZm9udC1zaXplOiAxMnB4Owp9Ci5vcHQgewogIGRpc3BsYXk6IGZsZXg7CiAgYWxpZ24taXRlbXM6IGNlbnRlcjsKICBnYXA6IDZweDsKICBjb2xvcjogIzQ3NTU2OTsKfQoub3B0IHNlbGVjdCB7CiAgZmxleDogMTsKICBwYWRkaW5nOiA0cHggNnB4OwogIGJvcmRlcjogMXB4IHNvbGlkICNjYmQ1ZTE7CiAgYm9yZGVyLXJhZGl1czogNHB4OwogIGJhY2tncm91bmQ6IHdoaXRlOwogIGNvbG9yOiBpbmhlcml0OwogIGZvbnQtc2l6ZTogMTJweDsKfQoub3B0IGlucHV0W3R5cGU9ImNoZWNrYm94Il0gewogIGFjY2VudC1jb2xvcjogIzYzNjZmMTsKfQoKLmFjdGlvbnMgewogIGRpc3BsYXk6IGZsZXg7CiAgZ2FwOiA4cHg7Cn0KCmZvb3RlciB7CiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlNWU1ZTU7CiAgcGFkZGluZzogOHB4IDE2cHg7CiAgZm9udC1zaXplOiAxMHB4OwogIGNvbG9yOiAjOWNhM2FmOwogIHRleHQtYWxpZ246IGNlbnRlcjsKfQoKZm9vdGVyIHN0cm9uZyB7CiAgY29sb3I6ICMwZWE1ZTk7Cn0KCmZvb3RlciBhIHsKICBjb2xvcjogaW5oZXJpdDsKICB0ZXh0LWRlY29yYXRpb246IG5vbmU7Cn0KZm9vdGVyIGE6aG92ZXIgewogIHRleHQtZGVjb3JhdGlvbjogbm9uZTsKfQoKQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykgewogIGJvZHkgewogICAgYmFja2dyb3VuZDogIzBmMTcyYTsKICAgIGNvbG9yOiAjZTJlOGYwOwogIH0KICAjaW5mbywKICAjcHJldmlldyB7CiAgICBiYWNrZ3JvdW5kOiAjMWUyOTNiOwogICAgYm9yZGVyLWNvbG9yOiAjMzM0MTU1OwogIH0KICAubGFiZWwsCiAgLmhpbnQgewogICAgY29sb3I6ICM5NGEzYjg7CiAgfQogICNwcmV2aWV3IHsKICAgIGNvbG9yOiAjY2JkNWUxOwogIH0KICAuYmFyIHsKICAgIGJhY2tncm91bmQ6ICMzMzQxNTU7CiAgfQogIGJ1dHRvbi5zZWNvbmRhcnkgewogICAgYmFja2dyb3VuZDogIzFlMjkzYjsKICAgIGNvbG9yOiAjZTJlOGYwOwogICAgYm9yZGVyLWNvbG9yOiAjNDc1NTY5OwogIH0KICBidXR0b24uc2Vjb25kYXJ5OmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsKICAgIGJhY2tncm91bmQ6ICMzMzQxNTU7CiAgfQogIGJ1dHRvbjpkaXNhYmxlZCB7CiAgICBiYWNrZ3JvdW5kOiAjNDc1NTY5OwogICAgY29sb3I6ICM5NGEzYjg7CiAgfQogIC5vcHQgewogICAgY29sb3I6ICM5NGEzYjg7CiAgfQogIC5vcHQgc2VsZWN0IHsKICAgIGJhY2tncm91bmQ6ICMxZTI5M2I7CiAgICBjb2xvcjogI2UyZThmMDsKICAgIGJvcmRlci1jb2xvcjogIzQ3NTU2OTsKICB9CiAgZm9vdGVyIHsKICAgIGJvcmRlci1jb2xvcjogIzMzNDE1NTsKICAgIGNvbG9yOiAjOTRhM2I4OwogIH0KfQo=\" />\n  </head>\n  <body>\n    <header>\n      <h1>PDF to MD</h1>\n      <p class=\"tag\" data-i18n=\"tagline\">\n        Runs 100% locally · No uploads · Your files stay private\n      </p>\n    </header>\n\n    <main>\n      <div id=\"info\">\n        <div class=\"row\">\n          <span class=\"label\" data-i18n=\"labelFile\">File:</span> <span id=\"filename\">—</span>\n        </div>\n        <div class=\"row\">\n          <span class=\"label\" data-i18n=\"labelStatus\">Status:</span>\n          <span\n            id=\"status\"\n            role=\"status\"\n            aria-live=\"polite\"\n            aria-atomic=\"true\"\n            data-i18n=\"statusLoading\"\n            >Loading…</span\n          >\n        </div>\n        <div id=\"hint\" class=\"hint\" aria-live=\"polite\"></div>\n      </div>\n\n      <div id=\"bar\" class=\"bar\" hidden aria-hidden=\"true\"><div class=\"bar-fill\"></div></div>\n\n      <button id=\"convert\" disabled aria-disabled=\"true\" data-i18n=\"convertButton\">\n        Convert to .md\n      </button>\n      <button id=\"cancel\" class=\"secondary\" hidden data-i18n=\"cancelButton\">Cancel</button>\n\n      <div id=\"result\" hidden>\n        <pre id=\"preview\" aria-label=\"Markdown preview\" data-i18n-aria=\"previewAria\"></pre>\n        <div class=\"opts\">\n          <label class=\"opt\">\n            <span data-i18n=\"labelFormat\">Format:</span>\n            <select id=\"format\">\n              <option value=\"md\" data-i18n=\"optMd\">Markdown (.md)</option>\n              <option value=\"json\" data-i18n=\"optJson\">JSON (.json)</option>\n              <option value=\"html\" data-i18n=\"optHtml\">HTML (.html)</option>\n            </select>\n          </label>\n          <label class=\"opt\">\n            <input type=\"checkbox\" id=\"toc\" />\n            <span data-i18n=\"tocCheckbox\">Add table of contents</span>\n          </label>\n        </div>\n        <div class=\"actions\">\n          <button id=\"download\" data-i18n=\"downloadButton\">Download</button>\n          <button id=\"copy\" class=\"secondary\" data-i18n=\"copyButton\">Copy</button>\n        </div>\n      </div>\n    </main>\n\n    <footer>\n      <a href=\"https://www.facebook.com/po.jii01\" target=\"_blank\" rel=\"noopener\"\n        >with ❤ by <strong>Poji</strong></a\n      >\n    </footer>\n\n    <script type=\"module\" src=\"data:text/javascript;base64,aW1wb3J0IHsgU1RPUkFHRV9LRVlfSEFTX1VTRUQgfSBmcm9tICIuL2NvbnN0YW50cy5qcyI7CmltcG9ydCB7IGJ1aWxkVG9jLCBtZFRvSHRtbCwgbWRUb0pzb24gfSBmcm9tICIuL2V4cG9ydC5qcyI7CmltcG9ydCB7IGlkYlB1dCwgaWRiRGVsZXRlLCBQREZfS0VZIH0gZnJvbSAiLi9pZGIuanMiOwoKY29uc3QgJCA9IChpZCkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpOwpjb25zdCBzdGF0dXMgPSAobXNnKSA9PiAoJCgic3RhdHVzIikudGV4dENvbnRlbnQgPSBtc2cpOwpjb25zdCB0ID0gKGssIHN1YnMpID0+IChjaHJvbWUuaTE4biA/IGNocm9tZS5pMThuLmdldE1lc3NhZ2Uoaywgc3VicykgOiBrKTsKY29uc3QgZXJyU3RhdHVzID0gKG0pID0+IHN0YXR1cyh0KCJlcnJvclByZWZpeCIsIFttXSkpOwpjb25zdCBQREZfUkUgPSAvXC5wZGYoPzpbPyNdfCQpL2k7CgovLyBSZXBsYWNlIHN0YXRpYyBVSSB0ZXh0IGZyb20gX2xvY2FsZXMgKGRhdGEtaTE4biDihpIgdGV4dENvbnRlbnQsCi8vIGRhdGEtaTE4bi1hcmlhIOKGkiBhcmlhLWxhYmVsKS4gUnVucyBiZWZvcmUgYW55IGR5bmFtaWMgc3RhdHVzIHVwZGF0ZXMuCmZ1bmN0aW9uIGxvY2FsaXplU3RhdGljKCkgewogIGZvciAoY29uc3QgZWwgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgiW2RhdGEtaTE4bl0iKSkgewogICAgY29uc3QgbSA9IHQoZWwuZGF0YXNldC5pMThuKTsKICAgIGlmIChtKSBlbC50ZXh0Q29udGVudCA9IG07CiAgfQogIGZvciAoY29uc3QgZWwgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgiW2RhdGEtaTE4bi1hcmlhXSIpKSB7CiAgICBjb25zdCBtID0gdChlbC5kYXRhc2V0LmkxOG5BcmlhKTsKICAgIGlmIChtKSBlbC5zZXRBdHRyaWJ1dGUoImFyaWEtbGFiZWwiLCBtKTsKICB9Cn0KCmxldCBjb252ZXJ0aW5nID0gZmFsc2U7CmxldCBwb3B1cFJlYWR5ID0gZmFsc2U7CmxldCBvblBkZlRhYiA9IGZhbHNlOwpsZXQgY29udmVydFdhdGNoZG9nID0gbnVsbDsKLy8gU3RhbGwgdGltZW91dCwgTk9UIGEgdG90YWwgYnVkZ2V0OiB0aGUgd29ya2VyIGhlYXJ0YmVhdHMgb25jZSBwZXIgcGFnZSwgYW5kCi8vIGV2ZXJ5IGhlYXJ0YmVhdCByZS1hcm1zIHRoaXMuIEEgNzk4LXBhZ2UgUERGIGxlZ2l0aW1hdGVseSBydW5zIGZvciBtaW51dGVzLAovLyBzbyBjYXBwaW5nIHRvdGFsIHRpbWUga2lsbGVkIGJpZyBkb2N1bWVudHMgdGhhdCB3ZXJlIGNvbnZlcnRpbmcgZmluZTsgd2hhdAovLyBhY3R1YWxseSBzaWduYWxzIGEgaGFuZyBpcyBubyBwYWdlIGZpbmlzaGluZyBmb3IgdGhpcyBsb25nLgpjb25zdCBDT05WRVJUX1NUQUxMX01TID0gMTIwXzAwMDsKCi8vIENhbmNlbCBzdXBwb3J0OiB0aGUgYWN0aXZlIGRvd25sb2FkJ3MgQWJvcnRDb250cm9sbGVyLCBhbmQgd2hldGhlciB3ZSd2ZQovLyBoYW5kZWQgdGhlIFBERiB0byB0aGUgb2Zmc2NyZWVuIHJ1bnRpbWUgKGNvbnZlcnRQaGFzZSDigJQgUHl0aG9uIGlzIHJ1bm5pbmcgYW5kCi8vIGNhbiBvbmx5IGJlIHN0b3BwZWQgYnkgdGVhcmluZyB0aGUgb2Zmc2NyZWVuIGRvY3VtZW50IGRvd24pLiB1c2VyQ2FuY2VsbGVkCi8vIHN1cHByZXNzZXMgdGhlIGRvd25sb2FkIGVycm9yIHBhdGggd2hlbiB0aGUgYWJvcnQgd2FzIGEgZGVsaWJlcmF0ZSBjYW5jZWwuCmxldCBhY3RpdmVDb250cm9sbGVyID0gbnVsbDsKbGV0IGNvbnZlcnRQaGFzZSA9IGZhbHNlOwpsZXQgdXNlckNhbmNlbGxlZCA9IGZhbHNlOwoKZnVuY3Rpb24gc2hvd0JhcihvbikgewogIGNvbnN0IGJhciA9ICQoImJhciIpOwogIGlmIChiYXIpIGJhci5oaWRkZW4gPSAhb247Cn0KCmZ1bmN0aW9uIHN0YXJ0UHJvZ3Jlc3MoKSB7CiAgc3RhdHVzKHQoInN0YXR1c0NvbnZlcnRpbmciKSk7CiAgc2hvd0Jhcih0cnVlKTsKfQoKZnVuY3Rpb24gc2hvd0NvbnZlcnRQcm9ncmVzcyhkb25lLCB0b3RhbCkgewogIHN0YXR1cygKICAgIHRvdGFsID4gMSA/IHQoInN0YXR1c0NvbnZlcnRpbmdQYWdlIiwgW1N0cmluZyhkb25lKSwgU3RyaW5nKHRvdGFsKV0pIDogdCgic3RhdHVzQ29udmVydGluZyIpCiAgKTsKfQoKZnVuY3Rpb24gc3RvcFByb2dyZXNzKCkgewogIHNob3dCYXIoZmFsc2UpOwp9CgpmdW5jdGlvbiBjbGVhcldhdGNoZG9nKCkgewogIGlmIChjb252ZXJ0V2F0Y2hkb2cpIHsKICAgIGNsZWFyVGltZW91dChjb252ZXJ0V2F0Y2hkb2cpOwogICAgY29udmVydFdhdGNoZG9nID0gbnVsbDsKICB9Cn0KCi8vIEtpbGwgdGhlIG9mZnNjcmVlbiBkb2N1bWVudCAodGhlIG9ubHkgd2F5IHRvIHN0b3AgdGhlIHN5bmNocm9ub3VzIFB5dGhvbgovLyBydW4pIGFuZCBzcGluIHVwIGEgZnJlc2ggb25lOyB0aGUgcG9wdXAgc3RheXMgbG9ja2VkIHVudGlsICJyZWFkeSIgYXJyaXZlcy4KZnVuY3Rpb24gcmVzdGFydE9mZnNjcmVlbihtZXNzYWdlKSB7CiAgcG9wdXBSZWFkeSA9IGZhbHNlOwogIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogImNsb3NlLW9mZnNjcmVlbiIgfSk7CiAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyB0eXBlOiAiZW5zdXJlLW9mZnNjcmVlbiIgfSk7CiAgY29uc3QgYnRuID0gJCgiY29udmVydCIpOwogIGJ0bi5kaXNhYmxlZCA9IHRydWU7CiAgYnRuLnNldEF0dHJpYnV0ZSgiYXJpYS1kaXNhYmxlZCIsICJ0cnVlIik7CiAgc3RhdHVzKG1lc3NhZ2UpOwogIHNob3dCYXIodHJ1ZSk7CiAgc2NoZWR1bGVGaXJzdFRpbWVIaW50KCk7Cn0KCi8vIFJlY292ZXJzIHRoZSBwb3B1cCBpZiBjb252ZXJzaW9uIHN0YWxscy4gVGhlIHN0dWNrIFB5dGhvbiBydW4ga2VlcHMgdGhlCi8vIG9mZnNjcmVlbiBydW50aW1lIHVudXNhYmxlLCBzbyByZXN0YXJ0IGl0IGxpa2UgYSBjYW5jZWwg4oCUIG90aGVyd2lzZSBhIHN0YWxlCi8vIHJlc3VsdCBjb3VsZCBsYW5kIG9uIGFuIHVubG9ja2VkIFVJIG9yIGEgcmV0cnkgd291bGQgcXVldWUgYmVoaW5kIGl0LgpmdW5jdGlvbiBzdGFydFdhdGNoZG9nKG1zID0gQ09OVkVSVF9TVEFMTF9NUykgewogIGNsZWFyV2F0Y2hkb2coKTsKICBjb252ZXJ0V2F0Y2hkb2cgPSBzZXRUaW1lb3V0KCgpID0+IHsKICAgIHVzZXJDYW5jZWxsZWQgPSB0cnVlOwogICAgY29udmVydFBoYXNlID0gZmFsc2U7CiAgICBhY3RpdmVDb250cm9sbGVyID0gbnVsbDsKICAgIHN0b3BQcm9ncmVzcygpOwogICAgc2V0Q29udmVydGluZyhmYWxzZSk7CiAgICByZXN0YXJ0T2Zmc2NyZWVuKHQoImVyclRvb0xvbmciKSk7CiAgfSwgbXMpOwp9Cgphc3luYyBmdW5jdGlvbiBzY2hlZHVsZUZpcnN0VGltZUhpbnQoKSB7CiAgY29uc3Qgc3RvcmVkID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFNUT1JBR0VfS0VZX0hBU19VU0VEKS5jYXRjaCgoKSA9PiAoe30pKTsKICBjb25zdCBpc0ZpcnN0VGltZSA9ICFzdG9yZWRbU1RPUkFHRV9LRVlfSEFTX1VTRURdOwogIHNldFRpbWVvdXQoKCkgPT4gewogICAgaWYgKCFwb3B1cFJlYWR5KSB7CiAgICAgIGNvbnN0IGVsID0gJCgiaGludCIpOwogICAgICBpZiAoZWwpIGVsLnRleHRDb250ZW50ID0gdChpc0ZpcnN0VGltZSA/ICJoaW50Rmlyc3RVc2UiIDogImhpbnRSZWxvYWRpbmciKTsKICAgIH0KICB9LCAzMDAwKTsKfQoKZnVuY3Rpb24gY2xlYXJIaW50KCkgewogIGNvbnN0IGVsID0gJCgiaGludCIpOwogIGlmIChlbCkgZWwudGV4dENvbnRlbnQgPSAiIjsKfQoKZnVuY3Rpb24gc2V0Q29udmVydGluZyhhY3RpdmUpIHsKICBjb252ZXJ0aW5nID0gYWN0aXZlOwogIGNvbnN0IGJ0biA9ICQoImNvbnZlcnQiKTsKICBidG4uZGlzYWJsZWQgPSBhY3RpdmU7CiAgYnRuLnNldEF0dHJpYnV0ZSgiYXJpYS1kaXNhYmxlZCIsIFN0cmluZyhhY3RpdmUpKTsKICBpZiAoYWN0aXZlKSBidG4uc2V0QXR0cmlidXRlKCJhcmlhLWJ1c3kiLCAidHJ1ZSIpOwogIGVsc2UgYnRuLnJlbW92ZUF0dHJpYnV0ZSgiYXJpYS1idXN5Iik7CiAgY29uc3QgY2FuY2VsID0gJCgiY2FuY2VsIik7CiAgaWYgKGNhbmNlbCkgY2FuY2VsLmhpZGRlbiA9ICFhY3RpdmU7Cn0KCmZ1bmN0aW9uIGVuYWJsZUNvbnZlcnQoKSB7CiAgc2hvd0JhcihmYWxzZSk7CiAgc3RhdHVzKHQoInN0YXR1c1JlYWR5IikpOwogIGNvbnN0IGJ0biA9ICQoImNvbnZlcnQiKTsKICBidG4uZGlzYWJsZWQgPSBmYWxzZTsKICBidG4uc2V0QXR0cmlidXRlKCJhcmlhLWRpc2FibGVkIiwgImZhbHNlIik7CiAgYnRuLmZvY3VzKCk7Cn0KCi8vIEFib3J0IGFuIGluLWZsaWdodCBjb252ZXJzaW9uLiBEdXJpbmcgZG93bmxvYWQgd2UganVzdCBhYm9ydCB0aGUgZmV0Y2guCi8vIE9uY2UgdGhlIFBERiBpcyBpbiB0aGUgb2Zmc2NyZWVuIHJ1bnRpbWUgKGNvbnZlcnRQaGFzZSksIHRoZSBzeW5jaHJvbm91cwovLyBQeXRob24gY2Fubm90IGJlIGludGVycnVwdGVkIOKAlCB0aGUgb25seSByZWxpYWJsZSBzdG9wIGlzIHRvIGNsb3NlIHRoZQovLyBvZmZzY3JlZW4gZG9jdW1lbnQgKGtpbGxpbmcgdGhlIFdBU00gZXhlY3V0aW9uKSBhbmQgc3BpbiB1cCBhIGZyZXNoIG9uZS4KZnVuY3Rpb24gY2FuY2VsQ29udmVyc2lvbigpIHsKICBpZiAoIWNvbnZlcnRpbmcpIHJldHVybjsKICB1c2VyQ2FuY2VsbGVkID0gdHJ1ZTsKICBjbGVhcldhdGNoZG9nKCk7CiAgaWYgKGFjdGl2ZUNvbnRyb2xsZXIpIHsKICAgIHRyeSB7CiAgICAgIGFjdGl2ZUNvbnRyb2xsZXIuYWJvcnQoKTsKICAgIH0gY2F0Y2ggKF8pIHt9CiAgfQogIGNvbnN0IHdhc0NvbnZlcnRpbmcgPSBjb252ZXJ0UGhhc2U7CiAgY29udmVydFBoYXNlID0gZmFsc2U7CiAgYWN0aXZlQ29udHJvbGxlciA9IG51bGw7CiAgc3RvcFByb2dyZXNzKCk7CiAgc2V0Q29udmVydGluZyhmYWxzZSk7CiAgaWYgKHdhc0NvbnZlcnRpbmcpIHsKICAgIC8vIERyb3AgdGhlIHN0YWdlZCBQREYgaW4gY2FzZSB0aGUgd29ya2VyIHdhcyB0b3JuIGRvd24gYmVmb3JlIHJlYWRpbmcgaXQuCiAgICBpZGJEZWxldGUoUERGX0tFWSkuY2F0Y2goKCkgPT4ge30pOwogICAgcmVzdGFydE9mZnNjcmVlbih0KCJzdGF0dXNDYW5jZWxsZWRSZWxvYWRpbmciKSk7CiAgfSBlbHNlIHsKICAgIHN0YXR1cyh0KCJzdGF0dXNDYW5jZWxsZWQiKSk7CiAgfQp9CgovLyA9PT09PSBGaWxlbmFtZSBkZXRlY3Rpb24gPT09PT0KY29uc3QgVVVJRF9SRSA9IC9eW2EtZjAtOV17OH0tW2EtZjAtOV17NH0tW2EtZjAtOV17NH0tW2EtZjAtOV17NH0tW2EtZjAtOV17MTJ9JC9pOwpjb25zdCBpc1V1aWRMaWtlID0gKHMpID0+ICFzIHx8IFVVSURfUkUudGVzdChzKTsKCmNvbnN0IHNhbml0aXplU3RlbSA9IChzKSA9PgogIChzIHx8ICIiKQogICAgLnJlcGxhY2UoL1svXFw6Kj8iPD58XS9nLCAiXyIpCiAgICAucmVwbGFjZSgvXHMrL2csICIgIikKICAgIC50cmltKCk7Cgpjb25zdCBjbGVhblN0ZW0gPSAobmFtZSkgPT4gewogIGNvbnN0IHN0ZW0gPSBzYW5pdGl6ZVN0ZW0obmFtZSkucmVwbGFjZSgvXC5wZGYkL2ksICIiKTsKICByZXR1cm4gc3RlbSAmJiAhaXNVdWlkTGlrZShzdGVtKSA/IHN0ZW0gOiBudWxsOwp9OwoKZnVuY3Rpb24gdHJ5VXJsUGF0aCh1cmwpIHsKICBpZiAoIXVybCB8fCB1cmwuc3RhcnRzV2l0aCgiYmxvYjoiKSkgcmV0dXJuIG51bGw7CiAgdHJ5IHsKICAgIGNvbnN0IHUgPSBuZXcgVVJMKHVybCk7CiAgICBjb25zdCBsYXN0ID0gZGVjb2RlVVJJQ29tcG9uZW50KHUucGF0aG5hbWUuc3BsaXQoIi8iKS5wb3AoKSB8fCAiIik7CiAgICByZXR1cm4gY2xlYW5TdGVtKGxhc3QpOwogIH0gY2F0Y2ggewogICAgcmV0dXJuIG51bGw7CiAgfQp9CgpmdW5jdGlvbiB0cnlVcmxQYXJhbXModXJsKSB7CiAgaWYgKCF1cmwpIHJldHVybiBudWxsOwogIHRyeSB7CiAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMKHVybCkuc2VhcmNoUGFyYW1zOwogICAgZm9yIChjb25zdCBrZXkgb2YgWyJmaWxlIiwgImZpbGVuYW1lIiwgIm5hbWUiLCAiZG93bmxvYWQiLCAiZG9jIiwgInBkZiJdKSB7CiAgICAgIGNvbnN0IHYgPSBwYXJhbXMuZ2V0KGtleSk7CiAgICAgIGlmICghdikgY29udGludWU7CiAgICAgIGNvbnN0IHMgPSBjbGVhblN0ZW0oZGVjb2RlVVJJQ29tcG9uZW50KHYpKTsKICAgICAgaWYgKHMpIHJldHVybiBzOwogICAgfQogICAgcmV0dXJuIG51bGw7CiAgfSBjYXRjaCB7CiAgICByZXR1cm4gbnVsbDsKICB9Cn0KCmZ1bmN0aW9uIHRyeVRhYlRpdGxlKHRpdGxlKSB7CiAgaWYgKCF0aXRsZSkgcmV0dXJuIG51bGw7CiAgbGV0IHQgPSB0aXRsZS50cmltKCk7CiAgdCA9IHQucmVwbGFjZSgvXHMqWy3igJPigJRdXHMqKEdvb2dsZSBDaHJvbWV8TW96aWxsYSBGaXJlZm94fEJyYXZlfEVkZ2V8U2FmYXJpKVxzKiQvaSwgIiIpOwogIHQgPSB0LnJlcGxhY2UoL1xzKlst4oCT4oCUfF1ccyooR29vZ2xlIERyaXZlfERyb3Bib3h8T25lRHJpdmV8Tm90aW9ufEJveHxHaXRIdWIpXHMqJC9pLCAiIik7CiAgdCA9IHQucmVwbGFjZSgvXlxzKig/OlBERiBWaWV3ZXJ8UERGfExvYWRpbmcpXHMqWy3igJPigJQ6XVxzKi9pLCAiIik7CiAgdCA9IHQucmVwbGFjZSgvXltccHtFbW9qaX1ccHtTb31ccHtTa31dK1xzKi91LCAiIik7CiAgdCA9IHQucmVwbGFjZSgvXmh0dHBzPzpcL1wvW14vXStcLy8sICIiKTsKICByZXR1cm4gY2xlYW5TdGVtKHQpOwp9Cgphc3luYyBmdW5jdGlvbiB0cnlPcGVuZXJUYWIob3BlbmVyVGFiSWQpIHsKICBpZiAoIW9wZW5lclRhYklkKSByZXR1cm4gbnVsbDsKICB0cnkgewogICAgY29uc3Qgb3BlbmVyID0gYXdhaXQgY2hyb21lLnRhYnMuZ2V0KG9wZW5lclRhYklkKTsKICAgIHJldHVybiB0cnlUYWJUaXRsZShvcGVuZXIudGl0bGUpOwogIH0gY2F0Y2ggewogICAgcmV0dXJuIG51bGw7CiAgfQp9CgpmdW5jdGlvbiB0cnlDb250ZW50RGlzcG9zaXRpb24oaGVhZGVyKSB7CiAgaWYgKCFoZWFkZXIpIHJldHVybiBudWxsOwogIGxldCBtID0gaGVhZGVyLm1hdGNoKC9maWxlbmFtZVwqXHMqPVxzKlteJ10qJ1teJ10qJyhbXjtdKykvaSk7CiAgaWYgKG0pIHsKICAgIHRyeSB7CiAgICAgIHJldHVybiBjbGVhblN0ZW0oZGVjb2RlVVJJQ29tcG9uZW50KG1bMV0udHJpbSgpLnJlcGxhY2UoL14ifCIkL2csICIiKSkpOwogICAgfSBjYXRjaCB7CiAgICAgIHJldHVybiBjbGVhblN0ZW0obVsxXS50cmltKCkucmVwbGFjZSgvXiJ8IiQvZywgIiIpKTsKICAgIH0KICB9CiAgbSA9IGhlYWRlci5tYXRjaCgvZmlsZW5hbWVccyo9XHMqIj8oW14iO10rKSI/L2kpOwogIHJldHVybiBtID8gY2xlYW5TdGVtKG1bMV0pIDogbnVsbDsKfQoKY29uc3QgZmFsbGJhY2tTdGVtID0gKCkgPT4KICBgJHt0KCJmaWxlbmFtZUZhbGxiYWNrIikgfHwgImRvY3VtZW50In0tJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApfWA7CgpmdW5jdGlvbiBkb21haW5CYXNlZEZhbGxiYWNrKHVybCkgewogIGxldCBkb21haW4gPSAiIjsKICB0cnkgewogICAgaWYgKHVybCAmJiB1cmwuc3RhcnRzV2l0aCgiYmxvYjoiKSkgZG9tYWluID0gbmV3IFVSTCh1cmwuc2xpY2UoNSkpLmhvc3RuYW1lOwogICAgZWxzZSBpZiAodXJsKSBkb21haW4gPSBuZXcgVVJMKHVybCkuaG9zdG5hbWU7CiAgfSBjYXRjaCB7fQogIGRvbWFpbiA9IChkb21haW4gfHwgIiIpLnJlcGxhY2UoL153d3dcLi8sICIiKS5yZXBsYWNlKC9bXlx3Li1dL2csICIiKTsKICByZXR1cm4gZG9tYWluID8gYCR7ZG9tYWlufS0ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCl9YCA6IGZhbGxiYWNrU3RlbSgpOwp9CgpmdW5jdGlvbiBlbnN1cmVWYWxpZFN0ZW0oc3RlbSkgewogIGxldCBzID0gKHN0ZW0gfHwgIiIpLnRyaW0oKS5yZXBsYWNlKC9eW1xzLi1dK3xbXHMuLV0rJC9nLCAiIik7CiAgaWYgKCFzIHx8IC9eW15hLXpBLVowLTnDgC3vv79dLy50ZXN0KHMpKSByZXR1cm4gZmFsbGJhY2tTdGVtKCk7CiAgcmV0dXJuIHM7Cn0KCmFzeW5jIGZ1bmN0aW9uIGRldGVjdEZpbGVuYW1lKHRhYikgewogIGNvbnN0IHN0cmF0ZWdpZXMgPSBbCiAgICAoKSA9PiB0cnlVcmxQYXRoKHRhYj8udXJsKSwKICAgICgpID0+IHRyeVVybFBhcmFtcyh0YWI/LnVybCksCiAgICAoKSA9PiB0cnlUYWJUaXRsZSh0YWI/LnRpdGxlKSwKICAgIGFzeW5jICgpID0+IGF3YWl0IHRyeU9wZW5lclRhYih0YWI/Lm9wZW5lclRhYklkKSwKICBdOwogIGZvciAoY29uc3QgZm4gb2Ygc3RyYXRlZ2llcykgewogICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZm4oKTsKICAgIGlmIChyZXN1bHQpIHJldHVybiByZXN1bHQ7CiAgfQogIHJldHVybiBudWxsOwp9CgovLyA9PT09PSBQREYgZGV0ZWN0aW9uID09PT09CmFzeW5jIGZ1bmN0aW9uIGRldGVjdElzUGRmKHVybCkgewogIGlmICghdXJsIHx8IHVybC5zdGFydHNXaXRoKCJjaHJvbWU6Ly8iKSB8fCB1cmwuc3RhcnRzV2l0aCgiY2hyb21lLWV4dGVuc2lvbjovLyIpKSByZXR1cm4gZmFsc2U7CiAgaWYgKHVybC5zdGFydHNXaXRoKCJmaWxlOi8vIikpIHJldHVybiB0cnVlOwogIGlmIChQREZfUkUudGVzdCh1cmwpIHx8IHVybC5zdGFydHNXaXRoKCJibG9iOiIpKSByZXR1cm4gdHJ1ZTsKICB0cnkgewogICAgY29uc3QgciA9IGF3YWl0IGZldGNoKHVybCwgeyBtZXRob2Q6ICJIRUFEIiB9KTsKICAgIHJldHVybiAoci5oZWFkZXJzLmdldCgiY29udGVudC10eXBlIikgfHwgIiIpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoInBkZiIpOwogIH0gY2F0Y2ggewogICAgcmV0dXJuIGZhbHNlOwogIH0KfQoKLy8gPT09PT0gUmVzdWx0IGhhbmRsZXIgPT09PT0KbGV0IGRpc3BsYXlTdGVtID0gbnVsbDsKbGV0IGN1cnJlbnRUYWJJZCA9IG51bGw7CmxldCByZXN1bHRNYXJrZG93biA9IG51bGw7CmxldCByZXN1bHRGaWxlbmFtZSA9IG51bGw7CmxldCByZXN1bHRQYWdlcyA9IG51bGw7CmxldCBsYXN0QmxvYlVybCA9IG51bGw7Cgpjb25zdCBzdGVtT2YgPSAobmFtZSkgPT4gKG5hbWUgfHwgImRvY3VtZW50IikucmVwbGFjZSgvXC5bXi4vXFxdKiQvLCAiIik7CgovLyBCdWlsZCB0aGUgY2hvc2VuIGV4cG9ydCBmb3JtYXQgZnJvbSB0aGUgY29udmVydGVyJ3MgTWFya2Rvd24uIFB1cmUgdHJhbnNmb3JtcwovLyBmcm9tIGV4cG9ydC5qcyDigJQgbm8gUHlvZGlkZSByb3VuZC10cmlwLgpmdW5jdGlvbiBidWlsZE91dHB1dCgpIHsKICBjb25zdCBmbXQgPSAkKCJmb3JtYXQiKT8udmFsdWUgfHwgIm1kIjsKICBjb25zdCB3aXRoVG9jID0gISEkKCJ0b2MiKT8uY2hlY2tlZDsKICBjb25zdCBtZCA9IHJlc3VsdE1hcmtkb3duIHx8ICIiOwogIGNvbnN0IHN0ZW0gPSBzdGVtT2YocmVzdWx0RmlsZW5hbWUpOwogIGlmIChmbXQgPT09ICJqc29uIikgewogICAgY29uc3QganNvbiA9IG1kVG9Kc29uKG1kLCB7IHNvdXJjZTogYCR7c3RlbX0ucGRmYCwgcGFnZXM6IHJlc3VsdFBhZ2VzIH0pOwogICAgcmV0dXJuIHsgdGV4dDogSlNPTi5zdHJpbmdpZnkoanNvbiwgbnVsbCwgMiksIGV4dDogImpzb24iLCBtaW1lOiAiYXBwbGljYXRpb24vanNvbiIgfTsKICB9CiAgaWYgKGZtdCA9PT0gImh0bWwiKSB7CiAgICBjb25zdCBib2R5ID0gd2l0aFRvYyA/IGAke2J1aWxkVG9jKG1kLCB7IGhlYWRpbmc6IHQoInRvY0hlYWRpbmciKSB9KX1cblxuJHttZH1gIDogbWQ7CiAgICByZXR1cm4geyB0ZXh0OiBtZFRvSHRtbChib2R5LCB7IHRpdGxlOiBzdGVtIH0pLCBleHQ6ICJodG1sIiwgbWltZTogInRleHQvaHRtbCIgfTsKICB9CiAgY29uc3QgdG9jID0gd2l0aFRvYyA/IGJ1aWxkVG9jKG1kLCB7IGhlYWRpbmc6IHQoInRvY0hlYWRpbmciKSB9KSA6ICIiOwogIHJldHVybiB7IHRleHQ6IHRvYyA/IGAke3RvY31cblxuJHttZH1gIDogbWQsIGV4dDogIm1kIiwgbWltZTogInRleHQvbWFya2Rvd24iIH07Cn0KCmZ1bmN0aW9uIHVwZGF0ZVByZXZpZXcoKSB7CiAgY29uc3QgcHJldmlldyA9ICQoInByZXZpZXciKTsKICBpZiAoIXByZXZpZXcgfHwgIXJlc3VsdE1hcmtkb3duKSByZXR1cm47CiAgcHJldmlldy50ZXh0Q29udGVudCA9IGJ1aWxkT3V0cHV0KCkudGV4dC5zcGxpdCgiXG4iKS5zbGljZSgwLCAyMCkuam9pbigiXG4iKTsKfQoKZnVuY3Rpb24gaGFuZGxlUmVzdWx0KHsgbWFya2Rvd24sIGZpbGVuYW1lLCBwYWdlcywgdGFibGVzLCB3YXJuaW5ncywgdGV4dENoYXJzIH0sIHNlbmRSZXNwb25zZSkgewogIGNsZWFyV2F0Y2hkb2coKTsKICBjb252ZXJ0UGhhc2UgPSBmYWxzZTsKICBhY3RpdmVDb250cm9sbGVyID0gbnVsbDsKICBzdG9wUHJvZ3Jlc3MoKTsKICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBbU1RPUkFHRV9LRVlfSEFTX1VTRURdOiB0cnVlIH0pLmNhdGNoKCgpID0+IHt9KTsKICAvLyBObyBleHRyYWN0YWJsZSB0ZXh0IOKGkiBzY2FubmVkIC8gaW1hZ2Utb25seSBQREYuIFdhcm4gaW5zdGVhZCBvZiBwcmVzZW50aW5nCiAgLy8gYW4gZW1wdHkgcmVzdWx0IGFzIHN1Y2Nlc3M7IGtlZXAgdGhlIENvbnZlcnQgYnV0dG9uIGZvciBhIHJldHJ5LgogIGlmICh0ZXh0Q2hhcnMgPT09IDApIHsKICAgIHN0YXR1cyh0KCJlcnJTY2FubmVkIikpOwogICAgc2V0Q29udmVydGluZyhmYWxzZSk7CiAgICBzZW5kUmVzcG9uc2UoeyBvazogdHJ1ZSB9KTsKICAgIHJldHVybjsKICB9CiAgcmVzdWx0TWFya2Rvd24gPSBtYXJrZG93bjsKICByZXN1bHRGaWxlbmFtZSA9IGZpbGVuYW1lOwogIHJlc3VsdFBhZ2VzID0gcGFnZXM7CiAgY29uc3Qgd2FybiA9IHdhcm5pbmdzID8gdCgic3RhdHVzV2FyblN1ZmZpeCIsIFtTdHJpbmcod2FybmluZ3MpXSkgOiAiIjsKICBzdGF0dXModCgic3RhdHVzRG9uZSIsIFtTdHJpbmcocGFnZXMpLCBTdHJpbmcodGFibGVzKSwgbWFya2Rvd24ubGVuZ3RoLnRvTG9jYWxlU3RyaW5nKCksIHdhcm5dKSk7CiAgJCgiY29udmVydCIpLmhpZGRlbiA9IHRydWU7CiAgJCgicmVzdWx0IikuaGlkZGVuID0gZmFsc2U7CiAgdXBkYXRlUHJldmlldygpOwogIGlmIChjdXJyZW50VGFiSWQpIHsKICAgIGNocm9tZS5zdG9yYWdlLnNlc3Npb24ucmVtb3ZlKGBzdGVtXyR7Y3VycmVudFRhYklkfWApLmNhdGNoKCgpID0+IHt9KTsKICAgIC8vIFBlcnNpc3QgcGVyLXRhYiBzbyB0aGUgcmVzdWx0IHN1cnZpdmVzIGNsb3NpbmcgdGhlIHBvcHVwIOKAlCByZW9wZW5pbmcKICAgIC8vIHJlLXNob3dzIGl0IChEb3dubG9hZC9Db3B5IHN0YXkgdXNhYmxlKSBpbnN0ZWFkIG9mIHJlc2V0dGluZyB0byBSZWFkeS4KICAgIGNocm9tZS5zdG9yYWdlLnNlc3Npb24KICAgICAgLnNldCh7CiAgICAgICAgW2ByZXN1bHRfJHtjdXJyZW50VGFiSWR9YF06IHsgbWFya2Rvd24sIGZpbGVuYW1lLCBwYWdlcywgdGFibGVzLCB3YXJuaW5ncywgdGV4dENoYXJzIH0sCiAgICAgIH0pCiAgICAgIC5jYXRjaCgoKSA9PiB7fSk7CiAgfQogIHNldENvbnZlcnRpbmcoZmFsc2UpOwogIHNlbmRSZXNwb25zZSh7IG9rOiB0cnVlIH0pOwp9CgpmdW5jdGlvbiBkb3dubG9hZFJlc3VsdCgpIHsKICBpZiAoIXJlc3VsdE1hcmtkb3duKSByZXR1cm47CiAgY29uc3QgeyB0ZXh0LCBleHQsIG1pbWUgfSA9IGJ1aWxkT3V0cHV0KCk7CiAgaWYgKGxhc3RCbG9iVXJsKSBVUkwucmV2b2tlT2JqZWN0VVJMKGxhc3RCbG9iVXJsKTsKICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3RleHRdLCB7IHR5cGU6IGAke21pbWV9O2NoYXJzZXQ9dXRmLThgIH0pOwogIGxhc3RCbG9iVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTsKICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiYSIpOwogIGEuaHJlZiA9IGxhc3RCbG9iVXJsOwogIGEuZG93bmxvYWQgPSBgJHtzdGVtT2YocmVzdWx0RmlsZW5hbWUpfS4ke2V4dH1gOwogIGEucmVsID0gIm5vb3BlbmVyIjsKICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpOwogIGEuY2xpY2soKTsKICBhLnJlbW92ZSgpOwogIC8vIEdpdmUgdGhlIGRvd25sb2FkIGEgbW9tZW50IHRvIGNsYWltIHRoZSBVUkwgYmVmb3JlIHJldm9raW5nOyB0aGUgdW5sb2FkCiAgLy8gaGFuZGxlciBjb3ZlcnMgdGhlIHBvcHVwIGNsb3NpbmcgZmlyc3QuCiAgc2V0VGltZW91dCgoKSA9PiB7CiAgICBpZiAobGFzdEJsb2JVcmwpIHsKICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChsYXN0QmxvYlVybCk7CiAgICAgIGxhc3RCbG9iVXJsID0gbnVsbDsKICAgIH0KICB9LCA1MDAwKTsKfQoKYXN5bmMgZnVuY3Rpb24gY29weVJlc3VsdChidG4pIHsKICBpZiAoIXJlc3VsdE1hcmtkb3duKSByZXR1cm47CiAgdHJ5IHsKICAgIGF3YWl0IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGJ1aWxkT3V0cHV0KCkudGV4dCk7CiAgICBjb25zdCBwcmV2ID0gYnRuLnRleHRDb250ZW50OwogICAgYnRuLnRleHRDb250ZW50ID0gdCgiY29weURvbmUiKTsKICAgIHNldFRpbWVvdXQoKCkgPT4gewogICAgICBidG4udGV4dENvbnRlbnQgPSBwcmV2OwogICAgfSwgMTUwMCk7CiAgfSBjYXRjaCB7CiAgICBzdGF0dXModCgiZXJyQ29weUZhaWxlZCIpKTsKICB9Cn0KCndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJ1bmxvYWQiLCAoKSA9PiB7CiAgaWYgKGxhc3RCbG9iVXJsKSBVUkwucmV2b2tlT2JqZWN0VVJMKGxhc3RCbG9iVXJsKTsKfSk7CgovLyA9PT09PSBNZXNzYWdpbmcgPT09PT0KY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtc2csIF9zZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4gewogIGlmIChtc2cudGFyZ2V0ICE9PSAicG9wdXAiKSByZXR1cm4gZmFsc2U7CiAgc3dpdGNoIChtc2cudHlwZSkgewogICAgY2FzZSAicHJvZ3Jlc3MiOgogICAgICAvLyBPZmZzY3JlZW4gc2VuZHMgYW4gaTE4biBrZXkgKGl0IGNhbid0IGxvY2FsaXplIGl0c2VsZik7IHBvcHVwIHJlc29sdmVzIGl0LgogICAgICBzdGF0dXModChtc2cua2V5KSk7CiAgICAgIGJyZWFrOwogICAgY2FzZSAiY29udmVydC1wcm9ncmVzcyI6CiAgICAgIGlmICghY29udmVydFBoYXNlIHx8IHVzZXJDYW5jZWxsZWQpIGJyZWFrOwogICAgICBzaG93Q29udmVydFByb2dyZXNzKG1zZy5kb25lLCBtc2cudG90YWwpOwogICAgICBzdGFydFdhdGNoZG9nKCk7IC8vIGEgZmluaXNoZWQgcGFnZSBwcm92ZXMgdGhlIHJ1biBpcyBhbGl2ZQogICAgICBicmVhazsKICAgIGNhc2UgInJlYWR5IjoKICAgICAgcG9wdXBSZWFkeSA9IHRydWU7CiAgICAgIGNsZWFySGludCgpOwogICAgICBpZiAoIW9uUGRmVGFiKSBicmVhazsKICAgICAgZW5hYmxlQ29udmVydCgpOwogICAgICBicmVhazsKICAgIGNhc2UgInJlc3VsdCI6CiAgICAgIGlmICh1c2VyQ2FuY2VsbGVkKSB7CiAgICAgICAgc2VuZFJlc3BvbnNlKHsgb2s6IHRydWUgfSk7CiAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgIH0KICAgICAgaGFuZGxlUmVzdWx0KG1zZywgc2VuZFJlc3BvbnNlKTsKICAgICAgcmV0dXJuIHRydWU7CiAgICBjYXNlICJlcnJvciI6CiAgICAgIGlmICh1c2VyQ2FuY2VsbGVkKSB7CiAgICAgICAgc2VuZFJlc3BvbnNlKHsgb2s6IHRydWUgfSk7IC8vIHN0cmF5IGVycm9yIGZyb20gYSBjYW5jZWxsZWQgcnVuCiAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgIH0KICAgICAgY2xlYXJXYXRjaGRvZygpOwogICAgICBjb252ZXJ0UGhhc2UgPSBmYWxzZTsKICAgICAgYWN0aXZlQ29udHJvbGxlciA9IG51bGw7CiAgICAgIHN0b3BQcm9ncmVzcygpOwogICAgICBlcnJTdGF0dXModChtc2cua2V5KSk7CiAgICAgIGlmIChjb252ZXJ0aW5nKSBzZXRDb252ZXJ0aW5nKGZhbHNlKTsKICAgICAgc2VuZFJlc3BvbnNlKHsgb2s6IHRydWUgfSk7CiAgICAgIHJldHVybiB0cnVlOwogIH0KICByZXR1cm4gZmFsc2U7Cn0pOwoKLy8gPT09PT0gRmlsZW5hbWUgY2FjaGUgKHBlciB0YWIsIHNlc3Npb24tc2NvcGVkKSA9PT09PQphc3luYyBmdW5jdGlvbiBsb2FkQ2FjaGVkU3RlbSh0YWJJZCkgewogIHRyeSB7CiAgICBjb25zdCBkYXRhID0gYXdhaXQgY2hyb21lLnN0b3JhZ2Uuc2Vzc2lvbi5nZXQoYHN0ZW1fJHt0YWJJZH1gKTsKICAgIHJldHVybiBkYXRhW2BzdGVtXyR7dGFiSWR9YF0gfHwgbnVsbDsKICB9IGNhdGNoIHsKICAgIHJldHVybiBudWxsOwogIH0KfQoKYXN5bmMgZnVuY3Rpb24gc2F2ZUNhY2hlZFN0ZW0odGFiSWQsIHN0ZW0pIHsKICB0cnkgewogICAgYXdhaXQgY2hyb21lLnN0b3JhZ2Uuc2Vzc2lvbi5zZXQoeyBbYHN0ZW1fJHt0YWJJZH1gXTogc3RlbSB9KTsKICB9IGNhdGNoIHt9Cn0KCi8vID09PT09IE1haW4gPT09PT0KYXN5bmMgZnVuY3Rpb24gaW5pdCgpIHsKICBsb2NhbGl6ZVN0YXRpYygpOwogIGNvbnN0IFt0YWJdID0gYXdhaXQgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSk7CiAgY29uc3QgdXJsID0gdGFiPy51cmwgfHwgdGFiPy5wZW5kaW5nVXJsIHx8ICIiOwogIGN1cnJlbnRUYWJJZCA9IHRhYj8uaWQgfHwgbnVsbDsKCiAgZGlzcGxheVN0ZW0gPSAoYXdhaXQgbG9hZENhY2hlZFN0ZW0oY3VycmVudFRhYklkKSkgfHwgKGF3YWl0IGRldGVjdEZpbGVuYW1lKHRhYikpOwogIGlmIChkaXNwbGF5U3RlbSkgc2F2ZUNhY2hlZFN0ZW0oY3VycmVudFRhYklkLCBkaXNwbGF5U3RlbSk7CiAgJCgiZmlsZW5hbWUiKS50ZXh0Q29udGVudCA9IGRpc3BsYXlTdGVtID8gYCR7ZGlzcGxheVN0ZW19LnBkZmAgOiB0KCJmaWxlbmFtZVBlbmRpbmciKTsKCiAgaWYgKCF1cmwpIHsKICAgIHN0YXR1cyh0KCJlcnJOb1RhYkFjY2VzcyIpKTsKICAgIHJldHVybjsKICB9CgogIGNvbnN0IGlzUGRmID0gYXdhaXQgZGV0ZWN0SXNQZGYodXJsKTsKICBpZiAoIWlzUGRmKSB7CiAgICBzdGF0dXModCgiZXJyTm90UGRmIikpOwogICAgcmV0dXJuOwogIH0KICBvblBkZlRhYiA9IHRydWU7CgogIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogImVuc3VyZS1vZmZzY3JlZW4iIH0pOwoKICAkKCJjb252ZXJ0IikuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCBhc3luYyAoKSA9PiB7CiAgICBzZXRDb252ZXJ0aW5nKHRydWUpOwogICAgdXNlckNhbmNlbGxlZCA9IGZhbHNlOwogICAgY29udmVydFBoYXNlID0gZmFsc2U7CiAgICAvLyBTdGFydGluZyBmcmVzaCDigJQgZHJvcCBhbnkgcGVyc2lzdGVkIHJlc3VsdCBmb3IgdGhpcyB0YWIuCiAgICBpZiAoY3VycmVudFRhYklkKSBjaHJvbWUuc3RvcmFnZS5zZXNzaW9uLnJlbW92ZShgcmVzdWx0XyR7Y3VycmVudFRhYklkfWApLmNhdGNoKCgpID0+IHt9KTsKICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7CiAgICBhY3RpdmVDb250cm9sbGVyID0gY29udHJvbGxlcjsKICAgIGNvbnN0IGZldGNoVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCAxMjBfMDAwKTsKICAgIHRyeSB7CiAgICAgIHN0YXR1cyh0KCJzdGF0dXNEb3dubG9hZGluZyIsIFsiMCJdKSk7CiAgICAgIGxldCByZXNwOwogICAgICB0cnkgewogICAgICAgIHJlc3AgPSBhd2FpdCBmZXRjaCh1cmwsIHsgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCB9KTsKICAgICAgfSBjYXRjaCAoZSkgewogICAgICAgIGNsZWFyVGltZW91dChmZXRjaFRpbWVvdXQpOwogICAgICAgIGlmICh1c2VyQ2FuY2VsbGVkKSByZXR1cm47CiAgICAgICAgc3RvcFByb2dyZXNzKCk7CiAgICAgICAgbGV0IG1zZzsKICAgICAgICBpZiAoZS5uYW1lID09PSAiQWJvcnRFcnJvciIpIHsKICAgICAgICAgIG1zZyA9IHQoImVyckRvd25sb2FkVGltZW91dCIpOwogICAgICAgIH0gZWxzZSBpZiAodXJsLnN0YXJ0c1dpdGgoImZpbGU6Ly8iKSkgewogICAgICAgICAgbXNnID0gdCgiZXJyRmlsZUFjY2VzcyIpOwogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICBtc2cgPSB0KCJlcnJOZXR3b3JrIik7CiAgICAgICAgfQogICAgICAgIGVyclN0YXR1cyhtc2cpOwogICAgICAgIHNldENvbnZlcnRpbmcoZmFsc2UpOwogICAgICAgIHJldHVybjsKICAgICAgfQogICAgICBjbGVhclRpbWVvdXQoZmV0Y2hUaW1lb3V0KTsKCiAgICAgIGlmICghcmVzcC5vaykgewogICAgICAgIGNvbnN0IGhpbnRzID0gewogICAgICAgICAgNDAxOiB0KCJlcnI0MDEiKSwKICAgICAgICAgIDQwMzogdCgiZXJyNDAzIiksCiAgICAgICAgICA0MDQ6IHQoImVycjQwNCIpLAogICAgICAgICAgNDI5OiB0KCJlcnI0MjkiKSwKICAgICAgICB9OwogICAgICAgIHRocm93IG5ldyBFcnJvcihoaW50c1tyZXNwLnN0YXR1c10gfHwgdCgiZXJySHR0cFN0YXR1cyIsIFtTdHJpbmcocmVzcC5zdGF0dXMpXSkpOwogICAgICB9CgogICAgICBpZiAoIWRpc3BsYXlTdGVtKSB7CiAgICAgICAgY29uc3QgZnJvbUNkID0gdHJ5Q29udGVudERpc3Bvc2l0aW9uKHJlc3AuaGVhZGVycy5nZXQoImNvbnRlbnQtZGlzcG9zaXRpb24iKSk7CiAgICAgICAgZGlzcGxheVN0ZW0gPSBmcm9tQ2QgfHwgZG9tYWluQmFzZWRGYWxsYmFjayh1cmwpOwogICAgICAgICQoImZpbGVuYW1lIikudGV4dENvbnRlbnQgPSBgJHtkaXNwbGF5U3RlbX0ucGRmYDsKICAgICAgICBzYXZlQ2FjaGVkU3RlbShjdXJyZW50VGFiSWQsIGRpc3BsYXlTdGVtKTsKICAgICAgfQoKICAgICAgY29uc3QgY29udGVudExlbmd0aCA9IHBhcnNlSW50KHJlc3AuaGVhZGVycy5nZXQoImNvbnRlbnQtbGVuZ3RoIikgfHwgIjAiKTsKICAgICAgY29uc3QgcmVhZGVyID0gcmVzcC5ib2R5LmdldFJlYWRlcigpOwogICAgICBjb25zdCBjaHVua3MgPSBbXTsKICAgICAgbGV0IHJlY2VpdmVkID0gMDsKICAgICAgd2hpbGUgKHRydWUpIHsKICAgICAgICBjb25zdCB7IGRvbmUsIHZhbHVlIH0gPSBhd2FpdCByZWFkZXIucmVhZCgpOwogICAgICAgIGlmIChkb25lKSBicmVhazsKICAgICAgICBjaHVua3MucHVzaCh2YWx1ZSk7CiAgICAgICAgcmVjZWl2ZWQgKz0gdmFsdWUubGVuZ3RoOwogICAgICAgIGlmIChjb250ZW50TGVuZ3RoID4gMCkgewogICAgICAgICAgc3RhdHVzKAogICAgICAgICAgICB0KCJzdGF0dXNEb3dubG9hZGluZyIsIFsKICAgICAgICAgICAgICBTdHJpbmcoTWF0aC5taW4oOTksIE1hdGgucm91bmQoKHJlY2VpdmVkIC8gY29udGVudExlbmd0aCkgKiAxMDApKSksCiAgICAgICAgICAgIF0pCiAgICAgICAgICApOwogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICBzdGF0dXModCgic3RhdHVzRG93bmxvYWRpbmdNYiIsIFsocmVjZWl2ZWQgLyAxMDI0IC8gMTAyNCkudG9GaXhlZCgxKV0pKTsKICAgICAgICB9CiAgICAgIH0KCiAgICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkocmVjZWl2ZWQpOwogICAgICBsZXQgcG9zID0gMDsKICAgICAgZm9yIChjb25zdCBjaHVuayBvZiBjaHVua3MpIHsKICAgICAgICBieXRlcy5zZXQoY2h1bmssIHBvcyk7CiAgICAgICAgcG9zICs9IGNodW5rLmxlbmd0aDsKICAgICAgfQoKICAgICAgc3RhcnRQcm9ncmVzcygpOwogICAgICBzdGFydFdhdGNoZG9nKCk7CiAgICAgIGFjdGl2ZUNvbnRyb2xsZXIgPSBudWxsOwogICAgICBjb252ZXJ0UGhhc2UgPSB0cnVlOwogICAgICAvLyBIYW5kIHRoZSByYXcgYnl0ZXMgdG8gdGhlIHdvcmtlciB2aWEgSW5kZXhlZERCIGluc3RlYWQgb2YgYSBiYXNlNjQKICAgICAgLy8gY2hyb21lLnJ1bnRpbWUgbWVzc2FnZSDigJQgdGhlIGxhdHRlciBjYXBzIGF0IDY0IE1pQiAofjQ4IE1CIFBERikuCiAgICAgIHRyeSB7CiAgICAgICAgYXdhaXQgaWRiUHV0KFBERl9LRVksIGJ5dGVzKTsKICAgICAgfSBjYXRjaCAoXykgewogICAgICAgIGNsZWFyV2F0Y2hkb2coKTsKICAgICAgICBjb252ZXJ0UGhhc2UgPSBmYWxzZTsKICAgICAgICBzdG9wUHJvZ3Jlc3MoKTsKICAgICAgICBlcnJTdGF0dXModCgiZXJyU3RvcmVGYWlsZWQiKSk7CiAgICAgICAgc2V0Q29udmVydGluZyhmYWxzZSk7CiAgICAgICAgcmV0dXJuOwogICAgICB9CiAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsKICAgICAgICB0YXJnZXQ6ICJvZmZzY3JlZW4iLAogICAgICAgIHR5cGU6ICJjb252ZXJ0IiwKICAgICAgICBmaWxlbmFtZTogYCR7ZW5zdXJlVmFsaWRTdGVtKGRpc3BsYXlTdGVtKX0ubWRgLAogICAgICB9KTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgaWYgKHVzZXJDYW5jZWxsZWQpIHJldHVybjsKICAgICAgc3RvcFByb2dyZXNzKCk7CiAgICAgIGVyclN0YXR1cyhlLm1lc3NhZ2UpOwogICAgICBzZXRDb252ZXJ0aW5nKGZhbHNlKTsKICAgIH0KICB9KTsKCiAgJCgiY2FuY2VsIikuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCBjYW5jZWxDb252ZXJzaW9uKTsKCiAgJCgiZG93bmxvYWQiKS5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIGRvd25sb2FkUmVzdWx0KTsKICAkKCJjb3B5IikuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCAoZSkgPT4gY29weVJlc3VsdChlLmN1cnJlbnRUYXJnZXQpKTsKICAkKCJmb3JtYXQiKS5hZGRFdmVudExpc3RlbmVyKCJjaGFuZ2UiLCB1cGRhdGVQcmV2aWV3KTsKICAkKCJ0b2MiKS5hZGRFdmVudExpc3RlbmVyKCJjaGFuZ2UiLCB1cGRhdGVQcmV2aWV3KTsKCiAgLy8gQSBjb21wbGV0ZWQgY29udmVyc2lvbiBmb3IgdGhpcyB0YWIgcGVyc2lzdHMgYWNyb3NzIHBvcHVwIGNsb3NlIOKAlCByZS1zaG93IGl0CiAgLy8gc28gRG93bmxvYWQvQ29weSBzdGF5IGF2YWlsYWJsZSAoY2xlYXJlZCB3aGVuIGEgbmV3IGNvbnZlcnNpb24gc3RhcnRzKS4KICBjb25zdCBzYXZlZEtleSA9IGByZXN1bHRfJHtjdXJyZW50VGFiSWR9YDsKICBjb25zdCBzYXZlZCA9IChhd2FpdCBjaHJvbWUuc3RvcmFnZS5zZXNzaW9uLmdldChzYXZlZEtleSkuY2F0Y2goKCkgPT4gKHt9KSkpW3NhdmVkS2V5XTsKICBpZiAoc2F2ZWQ/Lm1hcmtkb3duKSB7CiAgICBwb3B1cFJlYWR5ID0gdHJ1ZTsKICAgIGNsZWFySGludCgpOwogICAgaGFuZGxlUmVzdWx0KHNhdmVkLCAoKSA9PiB7fSk7CiAgICByZXR1cm47CiAgfQoKICAvLyBSZS1zeW5jIHdpdGggYSBjb252ZXJzaW9uIGZyb20gYSBwcmV2aW91cyBwb3B1cCBzZXNzaW9uLiBQeW9kaWRlIHJ1bnMgaW4gYQogIC8vIHdvcmtlciwgc28gdGhlIG9mZnNjcmVlbiBtYWluIHRocmVhZCBhbnN3ZXJzIGdldC1zdGF0dXMgbGl2ZSBldmVuIG1pZC1ydW4g4oCUCiAgLy8gbm8gc3RvcmFnZSBmbGFnIG5lZWRlZC4KICB0cnkgewogICAgY29uc3QgcmVzcCA9IGF3YWl0IGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdGFyZ2V0OiAib2Zmc2NyZWVuIiwgdHlwZTogImdldC1zdGF0dXMiIH0pOwogICAgaWYgKHJlc3VsdE1hcmtkb3duKSB7CiAgICAgIC8vIEEgbGl2ZSAicmVzdWx0IiBtZXNzYWdlIGFscmVhZHkgcmVuZGVyZWQgZHVyaW5nIHRoaXMgcmVvcGVuIOKAlCBrZWVwIGl0LAogICAgICAvLyBkb24ndCBsZXQgZ2V0LXN0YXR1cyBjbG9iYmVyIHRoZSBVSSBiYWNrIHRvICJSZWFkeSIuCiAgICAgIHBvcHVwUmVhZHkgPSB0cnVlOwogICAgICBjbGVhckhpbnQoKTsKICAgIH0gZWxzZSBpZiAocmVzcD8uY29udmVydGluZykgewogICAgICAvLyBTdGlsbCBjb252ZXJ0aW5nIGluIHRoZSB3b3JrZXIg4oCUIHJlc3RvcmUgdGhlIFVJIGFuZCB3YWl0IGZvciB0aGUgcmVzdWx0LgogICAgICBwb3B1cFJlYWR5ID0gdHJ1ZTsKICAgICAgdXNlckNhbmNlbGxlZCA9IGZhbHNlOwogICAgICBjb252ZXJ0UGhhc2UgPSB0cnVlOwogICAgICBjbGVhckhpbnQoKTsKICAgICAgc2V0Q29udmVydGluZyh0cnVlKTsKICAgICAgc3RhcnRQcm9ncmVzcygpOwogICAgICBpZiAocmVzcC5wcm9ncmVzcykgc2hvd0NvbnZlcnRQcm9ncmVzcyhyZXNwLnByb2dyZXNzLmRvbmUsIHJlc3AucHJvZ3Jlc3MudG90YWwpOwogICAgICBzdGFydFdhdGNoZG9nKCk7CiAgICB9IGVsc2UgaWYgKHJlc3A/LnBlbmRpbmcpIHsKICAgICAgLy8gQ29udmVyc2lvbiBmaW5pc2hlZCB3aGlsZSB0aGUgcG9wdXAgd2FzIGNsb3NlZCDigJQgc2hvdyBpdHMgYnVmZmVyZWQKICAgICAgLy8gcmVzdWx0L2Vycm9yIGluc3RlYWQgb2YgYSBzdGFsZSAiUmVhZHkiLCB0aGVuIHJlbGVhc2UgdGhlIGJ1ZmZlci4KICAgICAgcG9wdXBSZWFkeSA9IHRydWU7CiAgICAgIGNsZWFySGludCgpOwogICAgICBpZiAocmVzcC5wZW5kaW5nLmtpbmQgPT09ICJyZXN1bHQiKSBoYW5kbGVSZXN1bHQocmVzcC5wZW5kaW5nLCAoKSA9PiB7fSk7CiAgICAgIGVsc2UgZXJyU3RhdHVzKHQocmVzcC5wZW5kaW5nLmtleSkpOwogICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IHRhcmdldDogIm9mZnNjcmVlbiIsIHR5cGU6ICJjbGVhci1wZW5kaW5nIiB9KTsKICAgIH0gZWxzZSBpZiAocmVzcD8ucmVhZHkpIHsKICAgICAgcG9wdXBSZWFkeSA9IHRydWU7CiAgICAgIGNsZWFySGludCgpOwogICAgICBlbmFibGVDb252ZXJ0KCk7CiAgICB9IGVsc2UgewogICAgICAvLyBTaG93IHRoZSByZWFsIGxvYWQgc3RhZ2UgaWYgdGhlIG9mZnNjcmVlbiBpcyBtaWQtbG9hZDsgdGhlIGdlbmVyaWMKICAgICAgLy8gIkxvYWRpbmfigKYiIGxvb2tzIGZyb3plbiBkdXJpbmcgdGhlIGxvbmcgV0FTTS9saWJyYXJ5IHN0ZXBzLgogICAgICBzdGF0dXMocmVzcD8ubG9hZFBoYXNlID8gdChyZXNwLmxvYWRQaGFzZSkgOiB0KCJzdGF0dXNMb2FkaW5nIikpOwogICAgICBzaG93QmFyKHRydWUpOwogICAgICBzY2hlZHVsZUZpcnN0VGltZUhpbnQoKTsKICAgIH0KICB9IGNhdGNoIHsKICAgIHN0YXR1cyh0KCJzdGF0dXNMb2FkaW5nIikpOwogICAgc2hvd0Jhcih0cnVlKTsKICAgIHNjaGVkdWxlRmlyc3RUaW1lSGludCgpOwogIH0KfQoKaW5pdCgpLmNhdGNoKCgpID0+IHt9KTsK\"></script>\n  </body>\n</html>\n"
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
		      "pdf-to-md",
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
	  const scriptName = "PDF to MD";
	  const debug = "[PDF to MD]";
	  _log(debug + ' Executing background scripts...');
	
	  function executeBackgroundScripts(){
	    with(backgroundPolyfill){
	      // BG: background.js
	import { STORAGE_KEY_HAS_USED, getOffscreenURL } from "./constants.js";
	
	let _ensuring = null;
	
	// Serialize concurrent callers (popup "ensure-offscreen" + startup prewarm) so
	// two check-then-create races can't both call createDocument — the second would
	// throw "Only a single offscreen document may be created".
	async function ensureOffscreen() {
	  if (_ensuring) return _ensuring;
	  _ensuring = (async () => {
	    if (await chrome.offscreen.hasDocument()) return;
	    try {
	      await chrome.offscreen.createDocument({
	        url: getOffscreenURL(),
	        reasons: ["WORKERS"],
	        justification: "Run Pyodide Python runtime for PDF conversion",
	      });
	    } catch (e) {
	      if (!/single offscreen document/i.test(String(e?.message || e))) throw e;
	    }
	  })().finally(() => {
	    _ensuring = null;
	  });
	  return _ensuring;
	}
	
	async function maybePrewarmOffscreen() {
	  const stored = await chrome.storage.local.get(STORAGE_KEY_HAS_USED);
	  if (stored[STORAGE_KEY_HAS_USED]) {
	    await ensureOffscreen();
	  }
	}
	
	// Prewarm eagerly on install/update — installing a PDF converter implies intent
	// to use it, so pay the heavy WASM/library load in the background now instead of
	// at the user's first click. onStartup/SW-boot stay gated on prior use.
	chrome.runtime.onInstalled.addListener(() => ensureOffscreen());
	chrome.runtime.onStartup.addListener(maybePrewarmOffscreen);
	maybePrewarmOffscreen();
	
	// Prewarm when the user lands on a PDF tab, before they click the toolbar icon,
	// so the runtime is (often) ready by the time the popup opens. Cheap URL match
	// only — no HEAD fetch; ensureOffscreen is idempotent. url is present thanks to
	// the <all_urls> host permission (no "tabs" permission needed).
	const PDF_URL_RE = /\.pdf(?:[?#]|$)/i;
	chrome.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
	  const url = changeInfo.url || (changeInfo.status === "complete" ? tab.url : "");
	  if (url && PDF_URL_RE.test(url)) ensureOffscreen();
	});
	
	let _nextFilename = null;
	chrome.downloads.onDeterminingFilename.addListener((item, suggest) => {
	  if (_nextFilename) {
	    suggest({ filename: _nextFilename, conflictAction: "uniquify" });
	    _nextFilename = null;
	  }
	});
	
	chrome.runtime.onMessage.addListener((msg) => {
	  if (msg.type === "ensure-offscreen") ensureOffscreen();
	  if (msg.type === "close-offscreen") {
	    chrome.offscreen.closeDocument().catch(() => {});
	  }
	  if (msg.type === "download") {
	    _nextFilename = msg.filename;
	    chrome.downloads.download({ url: msg.url, filename: msg.filename, saveAs: false });
	  }
	});
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
	const INJECTED_MANIFEST = {"manifest_version":3,"name":"PDF to MD","version":"0.2.2","description":"Convert any PDF tab to Markdown — 100% local, no uploads, no servers. Your files never leave your browser.","permissions":["activeTab","offscreen","downloads","storage"],"optional_permissions":[],"content_scripts":[],"options_ui":{},"browser_action":{},"page_action":{},"action":{"default_popup":"popup.html","default_title":"PDF to MD","default_icon":{"16":"icons/icon16.png","48":"icons/icon48.png","128":"icons/icon128.png"}},"icons":{"16":"icons/icon16.png","48":"icons/icon48.png","128":"icons/icon128.png"},"web_accessible_resources":[],"background":{"service_worker":"background.js","type":"module"},"_id":"pdf-to-md"};
	const CONTENT_SCRIPT_CONFIGS_FOR_MATCHING = [];
	const OPTIONS_PAGE_PATH = null;
	const POPUP_PAGE_PATH = "popup.html";
	const EXTENSION_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAJwElEQVR4nNVabawdRRl+3pnZ3XPuxzk91NuPaAqUC2IQ1EKhgqREoiaFEhtz+wciEH+p/LNEIzWokcQf/SdgREKjLQlSIwnQYEKMbcSQktLWVNKENG35iNDbwr3nfp2zHzNj3tndc/d8ldvSE+smk509++7s8349887sIRSP563EVtLcveyPZ28RRPeRNncQaC0ZUyZriSyBLEAsxOes33Yu/I6CfH8ZFO4R+AkCNQh0giD2kcXuNx+uHmDRieet3JNh5IM6wY/9/t1xUx59TBizhbyyR0kIxDHIWlxU8Fkfbb8z+Pw+QQgfQvpA3IiJxAtx1Hjk8E9XHi8qQUXwy595fzMFI38Q/lDNzk4xaE2AIFCb5bte3AM8y3+yDAoyHcq6e9aShSGQ9IZqMOHClI7m7j+4ffVLuRKUg689/cFdcnjkZUpiIAoTIqHa3DrosLHd8kUDwJpECl8JGcAuzN79+qMr9k5MWEmwlqq7PrzCo9Jhgqkgig0RyUsJPOXPGaulDARZzAg9/5V/bF91SoDIKo0dojRSRRTpInhlLJTRUMa4s+f6eTNQOj1/EpiLAZ4sx7KQNgm1Ckar2qgdjJ2WP/2fm8gPXietBVkrioPPqyEYElkC90pEAmmNatKEsByygwNPhQQHyAiSRsfRVxVJ8aDwygrxjHaACoN/++R+LAtnoUkugmgNwsMY6KER/HVsPRIr4MO2KzEA8JTmg1XBiEISP6jI0kZKIoenxR6OiQ22v/kMrp46hUQFEIysSL5E0GEE78o1eOnKAD84cy1UEEA58hiQ5W3r9WSTCAJioyJrxxFHLMh0uWhda1H3hjEXVNBQfrsCmboWMYSqYPPwaSAM8dDslwEvgMeyAwBPi78LVgDWjAsiEbgYz8AXm7IG0mpId+7VNDyrERkPm0fP4InKvyDjMPXgwMAj61v2QKDIFMAXpubcE30PVlop6DNn0NzzJ8xZwt22gefGv4/XVt+Gqo1hOnLq4oFH1rdQRfC5xZZ8COHKDHP2I1ghsBCHMKumAR27hBoYeCz2C7NtuwI9FXHZSYAxKXit07PncbEBAZ16hpuj3wGBt4uGEbnlWw8UtOtMWkiZdoeHgSQBlUrp7y5p09Zm9YGBRwuf6iwPioq0wqTRhLrpRvibNkGfPOkYhyoVIAjQ3Lkz9QiJXNPuF15k8HBUn/YLM28BeEcuWC4XRkehjx2DnZ52HqBaDcmhQ0AUpUpmJD1oy6NjUlM9hYoTB4Mvl5EcOQI7MwOqViHGxmA++AC22UzDKs+Nlg/aKXRQ4IlDqF9s5WVFGkYEOz8P+D7s3BySqSmQ5y2CL6ZKATAGDJ46WWjRYoszchtlMlgpQVkyd4LPAXNhl+f2IMFTWwi1bmS2s4Am0Wo2L0Q6mSk7DNdGLpE7ZnQMDjy1QqiH5fm6Gi9gJFlACaa7mOs4NBE803SlRSuZBwye2kNocQ2b58DLq9ZjRbASMZfTBZbpcgRPAUTwTYxJVYHHtCrVpwBPbWTSD7w7X/XEpO23DJyNEyRzH4N00rV7kDuikypHlYdyuQYS6oLAS0qxWNNjCduDLdW51rA1LrBHa4WYLlSZfQa1Lg/kBVt+vmlhNDDkE7xsbuyUL3q+nYU66NQSs410E1+vbRV30aPPXVGgYZZ36c1RypN2xzuFY2pCFFs88PUyLh+T+PNrTRx/P0HJa9+eaduGSRm+N/jc0i039mk5OTEwV+Nl44SRRaI5JNLfIt6tiSzYJLmMyPpxnDYeY+MXfXxznY+VVcHlVirbz4NdpUQH+GKCd3mqI5TY3UMeOdDGENZ+RmL5EGGuYbEQWqyqCqxZLtGM0hBhy2kN8GS+epnEZ2vCKV2fM9AG5wZfqLfUBYEvDMgD1BcsHry1jAduLeOVoyE2XOXjmpUS0wsWO/bO48YrFLasLyExwN//HeLXf5kH80JJER6eGMbG63woCew/GmGoRJAiVbAVyn3YLA2hTwHeuTB7QbVEGBsVuG9DGfV5g+OnNZYNEX41MYLbPu9j31uRC7Fv3BC4drZu8NCmIdx5g4/50OLVwxHWjXu47nLeFsjr/P7zSHcIXQD4nBFYiThdy+DVtyJMPD6Nnzw3iyixLhy27ZrF935bx9+OhjAWTtEVFYk7v+Q7r/zy2Tn86Hez+OFvZjCzkA3K+XQu8LkBuxJzieBlFj6OMPPBCZicMagEzChw4MLEoj5vnTcYHFs2SuCStOwTPpoxOPZOgsvHBN79UOPt95OUFFoEkm2296Ff1bUiW0rYAAhj60CWVXqdsxEnM7NJnoBusmEdM0bK0eXLHxRBFcZp2ynpA94Vjm1LySWCjxPg2pUKW28q4+YrPccYzusZlebPmKylS01qUa0ShMkp4xhpeUXgC2sU3ps0WDMmcc3nVEbH/cuJouLqfGNeCaDetPjWdQHuv62MN07E2HsoQlkJV3EH2cTDig4HqckZDO/y+15alQ+XgMmPDfYeCPGd20v4+XdHcNfNMdZd7aEynD7DrFSca4rgiwplNLr03QPLQCQcyzD4w6cSx//vfaxx6GSMU5MJfEnOKwfejt0L2WP8zDunDY6cSJy1q8OEZ15puHfcuS7A7df7eOmfTTRCi+vXepietc5Y5wLvzjfsOJvuhna6qV/sZQnFk1CSuI0lBCoFrBMLT6QKcrhwjvAzzPecvPztROt2mUZocdlwuliqz6Ye5md8RS5nimzXjcV5gBa3z5cInu9zsgZ+Gi5MeT5PPvm1CyHCkJd7LZORgGBU2dwhCKiUCM0wff9oOYv7jhKmf1ktoMiY0O2Pwp73LnFrFzpTytV0hRc7sU6ZfAbNEx1pUreV0B3v71VWC+YfY0J+9Lj7EmitGcS+TT8abItt07to7KLZxaQ2/AWTiI4LGOx3F25Zc3HA9x6nX4hSb5m+Y3DgwCrhM0fv5w3MnTZuJJxm/w/gyY0hSMeNRCbJTnH4x2MHbRy96JVrHFTJJQ/emKRcqgiTRC/uemrsoODPrFJ720w4V5fCl/wps1hvX1LgrfvMKuNwoU6KtvF3cDGxFeKNn9VO2mj+XiEDYgHW8lxg/leWl8KXSniko/De3Y/XTm7dCiH27CHNn+3f2L56r1mYvkeQmPKHlrtda9aYjPvcf3HA4/zAg4mFMfBkWKpxsTIVN+r3PPvUZe4rPWPP68PWv0A2PHp6XAXDj5HRW5Qqe/wxjVtaHZ7nvk1L5pOrSuq6LyCFD2YbnTRiQfIFncw8svvJlcdz8G7s1h5Fx19ZvvaL+i1K0H0w5g5Yu5aszf5ukwJaOvjFMOgl2wd8+ncbK04Iwj6r9e7dT2Z/tymA5+v/AhJLm67BxjZAAAAAAElFTkSuQmCC";
	const extensionCssData = {};
	
	const LOCALE_KEYS = {"appDesc":{"message":"Convert any PDF tab to Markdown — 100% local, no uploads, no servers. Your files never leave your browser."},"tagline":{"message":"Runs 100% locally · No uploads · Your files stay private"},"labelFile":{"message":"File:"},"labelStatus":{"message":"Status:"},"convertButton":{"message":"Convert to .md"},"cancelButton":{"message":"Cancel"},"downloadButton":{"message":"Download"},"copyButton":{"message":"Copy"},"labelFormat":{"message":"Format:"},"optMd":{"message":"Markdown (.md)"},"optJson":{"message":"JSON (.json)"},"optHtml":{"message":"HTML (.html)"},"tocCheckbox":{"message":"Add table of contents"},"tocHeading":{"message":"Table of contents"},"copyDone":{"message":"Copied!"},"previewAria":{"message":"Markdown preview"},"statusLoading":{"message":"Loading…"},"statusReady":{"message":"Ready."},"statusConverting":{"message":"Converting…"},"statusConvertingPage":{"message":"Converting… page $DONE$ / $TOTAL$","placeholders":{"done":{"content":"$1"},"total":{"content":"$2"}}},"statusCancelled":{"message":"Cancelled."},"statusCancelledReloading":{"message":"Cancelled — reloading converter…"},"filenamePending":{"message":"(auto-detected after fetch)"},"filenameFallback":{"message":"document"},"hintFirstUse":{"message":"Setting up the PDF converter — first use only. Slower machines may take a bit longer."},"hintReloading":{"message":"Reloading the PDF converter — this can take a few seconds."},"statusDownloading":{"message":"Downloading PDF… $PERCENT$%","placeholders":{"percent":{"content":"$1"}}},"statusDownloadingMb":{"message":"Downloading PDF… $MB$ MB","placeholders":{"mb":{"content":"$1"}}},"statusDone":{"message":"Done — $PAGES$ pages, $TABLES$ tables, $CHARS$ chars$WARN$.","placeholders":{"pages":{"content":"$1"},"tables":{"content":"$2"},"chars":{"content":"$3"},"warn":{"content":"$4"}}},"statusWarnSuffix":{"message":" · $COUNT$ section(s) may be incomplete","placeholders":{"count":{"content":"$1"}}},"errorPrefix":{"message":"Error: $MSG$","placeholders":{"msg":{"content":"$1"}}},"errScanned":{"message":"This looks like a scanned or image-only PDF — no text could be extracted. OCR isn't supported."},"errCopyFailed":{"message":"Copy failed — select the preview text and copy manually."},"errTooLong":{"message":"Conversion stalled — no page finished for a while. Reload and try again."},"errNoTabAccess":{"message":"No access to this tab. If opening a local PDF, enable \"Allow access to file URLs\": chrome://extensions → PDF to MD → Details."},"errNotPdf":{"message":"Current tab is not a PDF."},"errDownloadTimeout":{"message":"Download timed out — PDF may be too large or your connection too slow."},"errFileAccess":{"message":"Enable \"Allow access to file URLs\": chrome://extensions → PDF to MD → Details."},"errNetwork":{"message":"Network error — check your connection and try again."},"errStoreFailed":{"message":"Couldn't stage the PDF for conversion — it may be too large. Try a smaller file."},"err401":{"message":"This PDF requires login — open it in the tab first, then retry."},"err403":{"message":"Access denied — the server does not allow downloading this PDF."},"err404":{"message":"PDF not found — the link may be broken."},"err429":{"message":"Too many requests — please wait a moment and try again."},"errHttpStatus":{"message":"Server returned HTTP $STATUS$.","placeholders":{"status":{"content":"$1"}}},"ofsLoadingRuntime":{"message":"Loading Python runtime…"},"ofsLoadingLibs":{"message":"Loading PDF libraries…"},"ofsInstalling":{"message":"Installing PDF parsers…"},"ofsAlmostReady":{"message":"Almost ready…"},"ofsErrMemory":{"message":"Not enough memory to load Python runtime — try closing other tabs."},"ofsErrWasm":{"message":"WebAssembly failed — Chrome 116+ required. Please update your browser."},"ofsErrLoad":{"message":"Failed to load required files — the extension may be corrupted. Try reinstalling."},"ofsErrStart":{"message":"Failed to start Python runtime — try reloading the extension."},"ofsNotReady":{"message":"Not ready yet — please wait."},"ofsTransferErr":{"message":"Internal transfer error — please retry."},"ofsErrEncrypted":{"message":"This PDF is password-protected. Remove the password first, then retry."},"ofsErrCorrupted":{"message":"Cannot read this PDF — file may be corrupted. Try re-downloading it."},"ofsErrOom":{"message":"Not enough memory — close some tabs and retry, or try a smaller PDF."},"ofsErrUnsupported":{"message":"Unsupported PDF format — conversion failed."},"ofsErrGeneric":{"message":"Conversion failed — unsupported or damaged PDF."}};
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
		  const scriptName = "PDF to MD";
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
			  const polyfillString = "\n// -- Messaging implementation\n\nfunction createEventBus(\n  scopeId,\n  type = \"page\", // \"page\" or \"iframe\"\n  { allowedOrigin = \"*\", children = [], parentWindow = null } = {}\n) {\n  if (!scopeId) throw new Error(\"createEventBus requires a scopeId\");\n\n  const handlers = {};\n\n  function handleIncoming(ev) {\n    if (allowedOrigin !== \"*\" && ev.origin !== allowedOrigin) return;\n\n    const msg = ev.data;\n    if (!msg || msg.__eventBus !== true || msg.scopeId !== scopeId) return;\n\n    const { event, payload } = msg;\n\n    // PAGE: if it's an INIT from an iframe, adopt it\n    if (type === \"page\" && event === \"__INIT__\") {\n      const win = ev.source;\n      if (win && !children.includes(win)) {\n        children.push(win);\n      }\n      return;\n    }\n\n    (handlers[event] || []).forEach((fn) =>\n      fn(payload, { origin: ev.origin, source: ev.source })\n    );\n  }\n\n  window.addEventListener(\"message\", handleIncoming);\n\n  function emitTo(win, event, payload) {\n    const envelope = {\n      __eventBus: true,\n      scopeId,\n      event,\n      payload,\n    };\n    win.postMessage(envelope, allowedOrigin);\n  }\n\n  // IFRAME: announce to page on startup\n  if (type === \"iframe\") {\n    setTimeout(() => {\n      const pw = parentWindow || window.parent;\n      if (pw && pw.postMessage) {\n        emitTo(pw, \"__INIT__\", null);\n      }\n    }, 0);\n  }\n\n  return {\n    on(event, fn) {\n      handlers[event] = handlers[event] || [];\n      handlers[event].push(fn);\n    },\n    off(event, fn) {\n      if (!handlers[event]) return;\n      handlers[event] = handlers[event].filter((h) => h !== fn);\n    },\n    /**\n     * Emits an event.\n     * @param {string} event - The event name.\n     * @param {any} payload - The event payload.\n     * @param {object} [options] - Emission options.\n     * @param {Window} [options.to] - A specific window to target. If provided, message is ONLY sent to the target.\n     */\n    emit(event, payload, { to } = {}) {\n      // If a specific target window is provided, send only to it and DO NOT dispatch locally.\n      // This prevents a port from receiving its own messages.\n      if (to) {\n        if (to && typeof to.postMessage === \"function\") {\n          emitTo(to, event, payload);\n        }\n        return; // Exit after targeted send.\n      }\n\n      // For broadcast messages (no 'to' target), dispatch locally first.\n      (handlers[event] || []).forEach((fn) =>\n        fn(payload, { origin: location.origin, source: window })\n      );\n\n      // Then propagate the broadcast to other windows.\n      if (type === \"page\") {\n        children.forEach((win) => emitTo(win, event, payload));\n      } else {\n        const pw = parentWindow || window.parent;\n        if (pw && pw.postMessage) {\n          emitTo(pw, event, payload);\n        }\n      }\n    },\n  };\n}\n\nfunction createRuntime(type = \"background\", bus) {\n  let nextId = 1;\n  const pending = {};\n  const msgListeners = [];\n\n  let nextPortId = 1;\n  const ports = {};\n  const onConnectListeners = [];\n\n  function parseArgs(args) {\n    let target, message, options, callback;\n    const arr = [...args];\n    if (arr.length === 0) {\n      throw new Error(\"sendMessage requires at least one argument\");\n    }\n    if (arr.length === 1) {\n      return { message: arr[0] };\n    }\n    // last object could be options\n    if (\n      arr.length &&\n      typeof arr[arr.length - 1] === \"object\" &&\n      !Array.isArray(arr[arr.length - 1])\n    ) {\n      options = arr.pop();\n    }\n    // last function is callback\n    if (arr.length && typeof arr[arr.length - 1] === \"function\") {\n      callback = arr.pop();\n    }\n    if (\n      arr.length === 2 &&\n      (typeof arr[0] === \"string\" || typeof arr[0] === \"number\")\n    ) {\n      [target, message] = arr;\n    } else {\n      [message] = arr;\n    }\n    return { target, message, options, callback };\n  }\n\n  if (type === \"background\") {\n    bus.on(\"__REQUEST__\", ({ id, message }, { source }) => {\n      let responded = false,\n        isAsync = false;\n      function sendResponse(resp) {\n        if (responded) return;\n        responded = true;\n        // Target the response directly back to the window that sent the request.\n        bus.emit(\"__RESPONSE__\", { id, response: resp }, { to: source });\n      }\n      const results = msgListeners\n        .map((fn) => {\n          try {\n            // msg, sender, sendResponse\n            const ret = fn(message, { id, tab: { id: source } }, sendResponse);\n            if (ret === true || (ret && typeof ret.then === \"function\")) {\n              isAsync = true;\n              return ret;\n            }\n            return ret;\n          } catch (e) {\n            _error(e);\n          }\n        })\n        .filter((r) => r !== undefined);\n\n      const promises = results.filter((r) => r && typeof r.then === \"function\");\n      if (!isAsync && promises.length === 0) {\n        const out = results.length === 1 ? results[0] : results;\n        sendResponse(out);\n      } else if (promises.length) {\n        Promise.all(promises).then((vals) => {\n          if (!responded) {\n            const out = vals.length === 1 ? vals[0] : vals;\n            sendResponse(out);\n          }\n        });\n      }\n    });\n  }\n\n  if (type !== \"background\") {\n    bus.on(\"__RESPONSE__\", ({ id, response }) => {\n      const entry = pending[id];\n      if (!entry) return;\n      entry.resolve(response);\n      if (entry.callback) entry.callback(response);\n      delete pending[id];\n    });\n  }\n\n  function sendMessage(...args) {\n    // Background should be able to send message to itself\n    // if (type === \"background\") {\n    //   throw new Error(\"Background cannot sendMessage to itself\");\n    // }\n    const { target, message, callback } = parseArgs(args);\n    const id = nextId++;\n    const promise = new Promise((resolve) => {\n      pending[id] = { resolve, callback };\n      bus.emit(\"__REQUEST__\", { id, message });\n    });\n    return promise;\n  }\n\n  bus.on(\"__PORT_CONNECT__\", ({ portId, name }, { source }) => {\n    if (type !== \"background\") return;\n    const backgroundPort = makePort(\"background\", portId, name, source);\n    ports[portId] = backgroundPort;\n\n    onConnectListeners.forEach((fn) => fn(backgroundPort));\n\n    // send back a CONNECT_ACK so the client can\n    // start listening on its end:\n    bus.emit(\"__PORT_CONNECT_ACK__\", { portId, name }, { to: source });\n  });\n\n  // Clients handle the ACK and finalize their Port object by learning the remote window.\n  bus.on(\"__PORT_CONNECT_ACK__\", ({ portId, name }, { source }) => {\n    if (type === \"background\") return; // ignore\n    const p = ports[portId];\n    if (!p) return;\n    // Call the port's internal finalize method to complete the handshake\n    if (p._finalize) {\n      p._finalize(source);\n    }\n  });\n\n  // Any port message travels via \"__PORT_MESSAGE__\"\n  bus.on(\"__PORT_MESSAGE__\", (envelope, { source }) => {\n    const { portId } = envelope;\n    const p = ports[portId];\n    if (!p) return;\n    p._receive(envelope, source);\n  });\n\n  // Any port disconnect:\n  bus.on(\"__PORT_DISCONNECT__\", ({ portId }) => {\n    const p = ports[portId];\n    if (!p) return;\n    p._disconnect();\n    delete ports[portId];\n  });\n\n  // Refactored makePort to correctly manage internal state and the connection handshake.\n  function makePort(side, portId, name, remoteWindow) {\n    let onMessageHandlers = [];\n    let onDisconnectHandlers = [];\n    let buffer = [];\n    // Unique instance ID for this port instance\n    const instanceId = Math.random().toString(36).slice(2) + Date.now();\n    // These state variables are part of the closure and are updated by _finalize\n    let _ready = side === \"background\";\n\n    function _drainBuffer() {\n      buffer.forEach((m) => _post(m));\n      buffer = [];\n    }\n\n    function _post(msg) {\n      // Always use the 'to' parameter for port messages, making them directional.\n      // Include senderInstanceId\n      bus.emit(\n        \"__PORT_MESSAGE__\",\n        { portId, msg, senderInstanceId: instanceId },\n        { to: remoteWindow }\n      );\n    }\n\n    function postMessage(msg) {\n      if (!_ready) {\n        buffer.push(msg);\n      } else {\n        _post(msg);\n      }\n    }\n\n    function _receive(envelope, source) {\n      // envelope: { msg, senderInstanceId }\n      if (envelope.senderInstanceId === instanceId) return; // Don't dispatch to self\n      onMessageHandlers.forEach((fn) =>\n        fn(envelope.msg, { id: portId, tab: { id: source } })\n      );\n    }\n\n    function disconnect() {\n      // Also use the 'to' parameter for disconnect messages\n      bus.emit(\"__PORT_DISCONNECT__\", { portId }, { to: remoteWindow });\n      _disconnect();\n      delete ports[portId];\n    }\n\n    function _disconnect() {\n      onDisconnectHandlers.forEach((fn) => fn());\n      onMessageHandlers = [];\n      onDisconnectHandlers = [];\n    }\n\n    // This function is called on the client port when the ACK is received from background.\n    // It updates the port's state, completing the connection.\n    function _finalize(win) {\n      remoteWindow = win; // <-- This is the crucial part: learn the destination\n      _ready = true;\n      _drainBuffer();\n    }\n\n    return {\n      name,\n      sender: {\n        id: portId,\n      },\n      onMessage: {\n        addListener(fn) {\n          onMessageHandlers.push(fn);\n        },\n        removeListener(fn) {\n          onMessageHandlers = onMessageHandlers.filter((x) => x !== fn);\n        },\n      },\n      onDisconnect: {\n        addListener(fn) {\n          onDisconnectHandlers.push(fn);\n        },\n        removeListener(fn) {\n          onDisconnectHandlers = onDisconnectHandlers.filter((x) => x !== fn);\n        },\n      },\n      postMessage,\n      disconnect,\n      // Internal methods used by the runtime\n      _receive,\n      _disconnect,\n      _finalize, // Expose the finalizer for the ACK handler\n    };\n  }\n\n  function connect(connectInfo = {}) {\n    if (type === \"background\") {\n      throw new Error(\"Background must use onConnect, not connect()\");\n    }\n    const name = connectInfo.name || \"\";\n    const portId = nextPortId++;\n    // create the client side port\n    // remoteWindow is initially null; it will be set by _finalize upon ACK.\n    const clientPort = makePort(\"client\", portId, name, null);\n    ports[portId] = clientPort;\n\n    // fire the connect event across the bus\n    bus.emit(\"__PORT_CONNECT__\", { portId, name });\n    return clientPort;\n  }\n\n  function onConnect(fn) {\n    if (type !== \"background\") {\n      throw new Error(\"connect event only fires in background\");\n    }\n    onConnectListeners.push(fn);\n  }\n\n  return {\n    // rpc:\n    sendMessage,\n    onMessage: {\n      addListener(fn) {\n        msgListeners.push(fn);\n      },\n      removeListener(fn) {\n        const i = msgListeners.indexOf(fn);\n        if (i >= 0) msgListeners.splice(i, 1);\n      },\n    },\n\n    // port API:\n    connect,\n    onConnect: {\n      addListener(fn) {\n        onConnect(fn);\n      },\n      removeListener(fn) {\n        const i = onConnectListeners.indexOf(fn);\n        if (i >= 0) onConnectListeners.splice(i, 1);\n      },\n    },\n  };\n}\n\n\n// --- Abstraction Layer: PostMessage Target\n\nlet nextRequestId = 1;\nconst pendingRequests = new Map(); // requestId -> { resolve, reject, timeout }\n\nfunction sendAbstractionRequest(method, args = []) {\n  return new Promise((resolve, reject) => {\n    const requestId = nextRequestId++;\n\n    const timeout = setTimeout(() => {\n      pendingRequests.delete(requestId);\n      reject(new Error(`PostMessage request timeout for method: ${method}`));\n    }, 10000);\n\n    pendingRequests.set(requestId, { resolve, reject, timeout });\n\n    window.parent.postMessage({\n      type: \"abstraction-request\",\n      requestId,\n      method,\n      args,\n    });\n  });\n}\n\nwindow.addEventListener(\"message\", (event) => {\n  const { type, requestId, success, result, error } = event.data;\n\n  if (type === \"abstraction-response\") {\n    const pending = pendingRequests.get(requestId);\n    if (pending) {\n      clearTimeout(pending.timeout);\n      pendingRequests.delete(requestId);\n\n      if (success) {\n        pending.resolve(result);\n      } else {\n        const err = new Error(error.message);\n        err.stack = error.stack;\n        pending.reject(err);\n      }\n    }\n  }\n});\n\nasync function _storageSet(items) {\n  return sendAbstractionRequest(\"_storageSet\", [items]);\n}\n\nasync function _storageGet(keys) {\n  return sendAbstractionRequest(\"_storageGet\", [keys]);\n}\n\nasync function _storageRemove(keysToRemove) {\n  return sendAbstractionRequest(\"_storageRemove\", [keysToRemove]);\n}\n\nasync function _storageClear() {\n  return sendAbstractionRequest(\"_storageClear\");\n}\n\nasync function _cookieList(details) {\n  return sendAbstractionRequest(\"_cookieList\", [details]);\n}\n\nasync function _cookieSet(details) {\n  return sendAbstractionRequest(\"_cookieSet\", [details]);\n}\n\nasync function _cookieDelete(details) {\n  return sendAbstractionRequest(\"_cookieDelete\", [details]);\n}\n\nasync function _fetch(url, options) {\n  return sendAbstractionRequest(\"_fetch\", [url, options]);\n}\n\nfunction _registerMenuCommand(name, func) {\n  _warn(\"_registerMenuCommand called from iframe context:\", name);\n  return sendAbstractionRequest(\"_registerMenuCommand\", [\n    name,\n    func.toString(),\n  ]);\n}\n\nfunction _openTab(url, active) {\n  return sendAbstractionRequest(\"_openTab\", [url, active]);\n}\n\nasync function _initStorage() {\n  return sendAbstractionRequest(\"_initStorage\");\n}\n\n\nconst EXTENSION_ASSETS_MAP = {{EXTENSION_ASSETS_MAP}};\n\n// -- Polyfill Implementation\nfunction buildPolyfill({ isBackground = false, isOtherPage = false } = {}) {\n  // Generate a unique context ID for this polyfill instance\n  const contextType = isBackground\n    ? \"background\"\n    : isOtherPage\n      ? \"options\"\n      : \"content\";\n  const contextId = `${contextType}_${Math.random()\n    .toString(36)\n    .substring(2, 15)}`;\n\n  const IS_IFRAME = \"true\" === \"true\";\n  const BUS = (function () {\n    if (globalThis.__BUS) {\n      return globalThis.__BUS;\n    }\n    globalThis.__BUS = createEventBus(\n      \"pdf-to-md\",\n      IS_IFRAME ? \"iframe\" : \"page\",\n    );\n    return globalThis.__BUS;\n  })();\n  const RUNTIME = createRuntime(isBackground ? \"background\" : \"tab\", BUS);\n  const createNoopListeners = () => ({\n    addListener: (callback) => {\n      _log(\"addListener\", callback);\n    },\n    removeListener: (callback) => {\n      _log(\"removeListener\", callback);\n    },\n  });\n  // TODO: Stub\n  const storageChangeListeners = new Set();\n  function broadcastStorageChange(changes, areaName) {\n    storageChangeListeners.forEach((listener) => {\n      listener(changes, areaName);\n    });\n  }\n\n  let REQ_PERMS = [];\n\n  // --- Chrome polyfill\n  let chrome = {\n    extension: {\n      isAllowedIncognitoAccess: () => Promise.resolve(true),\n      sendMessage: (...args) => _messagingHandler.sendMessage(...args),\n    },\n    permissions: {\n      // TODO: Remove origin permission means exclude from origin in startup (when checking for content scripts)\n      request: (permissions, callback) => {\n        _log(\"permissions.request\", permissions, callback);\n        if (Array.isArray(permissions)) {\n          REQ_PERMS = [...REQ_PERMS, ...permissions];\n        }\n        if (typeof callback === \"function\") {\n          callback(permissions);\n        }\n        return Promise.resolve(permissions);\n      },\n      contains: (permissions, callback) => {\n        if (typeof callback === \"function\") {\n          callback(true);\n        }\n        return Promise.resolve(true);\n      },\n      getAll: () => {\n        return Promise.resolve({\n          permissions: EXTENSION_PERMISSIONS,\n          origins: ORIGIN_PERMISSIONS,\n        });\n      },\n      onAdded: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n    },\n    i18n: {\n      getUILanguage: () => {\n        return USED_LOCALE || \"en\";\n      },\n      getMessage: (key, substitutions = []) => {\n        if (typeof substitutions === \"string\") {\n          substitutions = [substitutions];\n        }\n        if (typeof LOCALE_KEYS !== \"undefined\" && LOCALE_KEYS[key]) {\n          return LOCALE_KEYS[key].message?.replace(\n            /\\$(\\d+)/g,\n            (match, p1) => substitutions[p1 - 1] || match,\n          );\n        }\n        return key;\n      },\n    },\n    alarms: {\n      onAlarm: createNoopListeners(),\n      create: () => {\n        _log(\"alarms.create\", arguments);\n      },\n      get: () => {\n        _log(\"alarms.get\", arguments);\n      },\n    },\n    runtime: {\n      ...RUNTIME,\n      onInstalled: createNoopListeners(),\n      onStartup: createNoopListeners(),\n      // TODO: Postmessage to parent to open options page or call openOptionsPage\n      openOptionsPage: () => {\n        // const url = chrome.runtime.getURL(OPTIONS_PAGE_PATH);\n        // console.log(\"openOptionsPage\", _openTab, url, EXTENSION_ASSETS_MAP);\n        // _openTab(url);\n        if (typeof openOptionsPage === \"function\") {\n          openOptionsPage();\n        } else if (window.parent) {\n          window.parent.postMessage({ type: \"openOptionsPage\" }, \"*\");\n        } else {\n          _warn(\"openOptionsPage not available.\");\n        }\n      },\n      getManifest: () => {\n        // The manifest object will be injected into the scope where buildPolyfill is called\n        if (typeof INJECTED_MANIFEST !== \"undefined\") {\n          return JSON.parse(JSON.stringify(INJECTED_MANIFEST)); // Return deep copy\n        }\n        _warn(\"INJECTED_MANIFEST not found for chrome.runtime.getManifest\");\n        return { name: \"Unknown\", version: \"0.0\", manifest_version: 2 };\n      },\n      getURL: (path) => {\n        if (!path) return \"\";\n        if (path.startsWith(\"/\")) {\n          path = path.substring(1);\n        }\n\n        if (typeof _createAssetUrl === \"function\") {\n          return _createAssetUrl(path);\n        }\n\n        _warn(\n          `chrome.runtime.getURL fallback for '${path}'. Assets may not be available.`,\n        );\n        // Attempt a relative path resolution (highly context-dependent and likely wrong)\n        try {\n          if (window.location.protocol.startsWith(\"http\")) {\n            return new URL(path, window.location.href).toString();\n          }\n        } catch (e) {\n          /* ignore error, fallback */\n        }\n        return path;\n      },\n      id: \"polyfilled-extension-\" + Math.random().toString(36).substring(2, 15),\n      lastError: null,\n      setUninstallURL: () => {},\n      setUpdateURL: () => {},\n      getPlatformInfo: async () => {\n        const platform = {\n          os: \"unknown\",\n          arch: \"unknown\",\n          nacl_arch: \"unknown\",\n        };\n\n        if (typeof navigator !== \"undefined\") {\n          const userAgent = navigator.userAgent.toLowerCase();\n          if (userAgent.includes(\"mac\")) platform.os = \"mac\";\n          else if (userAgent.includes(\"win\")) platform.os = \"win\";\n          else if (userAgent.includes(\"linux\")) platform.os = \"linux\";\n          else if (userAgent.includes(\"android\")) platform.os = \"android\";\n          else if (userAgent.includes(\"ios\")) platform.os = \"ios\";\n\n          if (userAgent.includes(\"x86_64\") || userAgent.includes(\"amd64\")) {\n            platform.arch = \"x86-64\";\n          } else if (userAgent.includes(\"i386\") || userAgent.includes(\"i686\")) {\n            platform.arch = \"x86-32\";\n          } else if (userAgent.includes(\"arm\")) {\n            platform.arch = \"arm\";\n          }\n        }\n\n        return platform;\n      },\n      getBrowserInfo: async () => {\n        const info = {\n          name: \"unknown\",\n          version: \"unknown\",\n          buildID: \"unknown\",\n        };\n\n        if (typeof navigator !== \"undefined\") {\n          const userAgent = navigator.userAgent;\n          if (userAgent.includes(\"Chrome\")) {\n            info.name = \"Chrome\";\n            const match = userAgent.match(/Chrome\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          } else if (userAgent.includes(\"Firefox\")) {\n            info.name = \"Firefox\";\n            const match = userAgent.match(/Firefox\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          } else if (userAgent.includes(\"Safari\")) {\n            info.name = \"Safari\";\n            const match = userAgent.match(/Version\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          }\n        }\n\n        return info;\n      },\n    },\n    storage: {\n      local: {\n        get: function (keys, callback) {\n          if (typeof _storageGet !== \"function\")\n            throw new Error(\"_storageGet not defined\");\n\n          const promise = _storageGet(keys);\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.get callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.get error:\", error);\n                callback({});\n              });\n            return;\n          }\n\n          return promise;\n        },\n        set: function (items, callback) {\n          if (typeof _storageSet !== \"function\")\n            throw new Error(\"_storageSet not defined\");\n\n          const promise = _storageSet(items).then((result) => {\n            broadcastStorageChange(items, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.set callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.set error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        remove: function (keys, callback) {\n          if (typeof _storageRemove !== \"function\")\n            throw new Error(\"_storageRemove not defined\");\n\n          const promise = _storageRemove(keys).then((result) => {\n            const changes = {};\n            const keyList = Array.isArray(keys) ? keys : [keys];\n            keyList.forEach((key) => {\n              changes[key] = { oldValue: undefined, newValue: undefined };\n            });\n            broadcastStorageChange(changes, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.remove callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.remove error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        clear: function (callback) {\n          if (typeof _storageClear !== \"function\")\n            throw new Error(\"_storageClear not defined\");\n\n          const promise = _storageClear().then((result) => {\n            broadcastStorageChange({}, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.clear callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.clear error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        onChanged: {\n          addListener: (callback) => {\n            storageChangeListeners.add(callback);\n          },\n          removeListener: (callback) => {\n            storageChangeListeners.delete(callback);\n          },\n        },\n      },\n      sync: {\n        get: function (keys, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n          return chrome.storage.local.get(keys, callback);\n        },\n        set: function (items, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.set(items).then((result) => {\n            broadcastStorageChange(items, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.set callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.set error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        remove: function (keys, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.remove(keys).then((result) => {\n            const changes = {};\n            const keyList = Array.isArray(keys) ? keys : [keys];\n            keyList.forEach((key) => {\n              changes[key] = { oldValue: undefined, newValue: undefined };\n            });\n            broadcastStorageChange(changes, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.remove callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.remove error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        clear: function (callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.clear().then((result) => {\n            broadcastStorageChange({}, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.clear callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.clear error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        onChanged: {\n          addListener: (callback) => {\n            storageChangeListeners.add(callback);\n          },\n          removeListener: (callback) => {\n            storageChangeListeners.delete(callback);\n          },\n        },\n      },\n      onChanged: {\n        addListener: (callback) => {\n          storageChangeListeners.add(callback);\n        },\n        removeListener: (callback) => {\n          storageChangeListeners.delete(callback);\n        },\n      },\n      managed: {\n        get: function (keys, callback) {\n          _warn(\"chrome.storage.managed polyfill is read-only empty.\");\n\n          const promise = Promise.resolve({});\n\n          if (typeof callback === \"function\") {\n            promise.then((result) => {\n              try {\n                callback(result);\n              } catch (e) {\n                _error(\"Error in storage.managed.get callback:\", e);\n              }\n            });\n            return;\n          }\n\n          return promise;\n        },\n      },\n    },\n    cookies: (function () {\n      const cookieChangeListeners = new Set();\n      function broadcastCookieChange(changeInfo) {\n        cookieChangeListeners.forEach((listener) => {\n          try {\n            listener(changeInfo);\n          } catch (e) {\n            _error(\"Error in cookies.onChanged listener:\", e);\n          }\n        });\n      }\n\n      function handlePromiseCallback(promise, callback) {\n        if (typeof callback === \"function\") {\n          promise\n            .then((result) => callback(result))\n            .catch((error) => {\n              // chrome.runtime.lastError = { message: error.message }; // TODO: Implement lastError\n              _error(error);\n              callback(); // Call with undefined on error\n            });\n          return;\n        }\n        return promise;\n      }\n\n      return {\n        get: function (details, callback) {\n          if (typeof _cookieList !== \"function\") {\n            return handlePromiseCallback(\n              Promise.reject(new Error(\"_cookieList not defined\")),\n              callback,\n            );\n          }\n          const promise = _cookieList({\n            url: details.url,\n            name: details.name,\n            storeId: details.storeId,\n            partitionKey: details.partitionKey,\n          }).then((cookies) => {\n            if (!cookies || cookies.length === 0) {\n              return null;\n            }\n            // Sort by path length (longest first), then creation time (earliest first, if available)\n            cookies.sort((a, b) => {\n              const pathLenDiff = (b.path || \"\").length - (a.path || \"\").length;\n              if (pathLenDiff !== 0) return pathLenDiff;\n              return (a.creationTime || 0) - (b.creationTime || 0);\n            });\n            return cookies[0];\n          });\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getAll: function (details, callback) {\n          if (typeof _cookieList !== \"function\") {\n            return handlePromiseCallback(\n              Promise.reject(new Error(\"_cookieList not defined\")),\n              callback,\n            );\n          }\n          if (details.partitionKey) {\n            _warn(\n              \"cookies.getAll: partitionKey is not fully supported in this environment.\",\n            );\n          }\n          const promise = _cookieList(details);\n          return handlePromiseCallback(promise, callback);\n        },\n\n        set: function (details, callback) {\n          const promise = (async () => {\n            if (\n              typeof _cookieSet !== \"function\" ||\n              typeof _cookieList !== \"function\"\n            ) {\n              throw new Error(\"_cookieSet or _cookieList not defined\");\n            }\n            if (details.partitionKey) {\n              _warn(\n                \"cookies.set: partitionKey is not fully supported in this environment.\",\n              );\n            }\n\n            const getDetails = {\n              url: details.url,\n              name: details.name,\n              storeId: details.storeId,\n            };\n            const oldCookies = await _cookieList(getDetails);\n            const oldCookie = oldCookies && oldCookies[0];\n\n            if (oldCookie) {\n              broadcastCookieChange({\n                cause: \"overwrite\",\n                cookie: oldCookie,\n                removed: true,\n              });\n            }\n\n            await _cookieSet(details);\n            const newCookies = await _cookieList(getDetails);\n            const newCookie = newCookies && newCookies[0];\n\n            if (newCookie) {\n              broadcastCookieChange({\n                cause: \"explicit\",\n                cookie: newCookie,\n                removed: false,\n              });\n            }\n            return newCookie || null;\n          })();\n          return handlePromiseCallback(promise, callback);\n        },\n\n        remove: function (details, callback) {\n          const promise = (async () => {\n            if (\n              typeof _cookieDelete !== \"function\" ||\n              typeof _cookieList !== \"function\"\n            ) {\n              throw new Error(\"_cookieDelete or _cookieList not defined\");\n            }\n            const oldCookies = await _cookieList(details);\n            const oldCookie = oldCookies && oldCookies[0];\n\n            if (!oldCookie) return null; // Nothing to remove\n\n            await _cookieDelete(details);\n\n            broadcastCookieChange({\n              cause: \"explicit\",\n              cookie: oldCookie,\n              removed: true,\n            });\n\n            return {\n              url: details.url,\n              name: details.name,\n              storeId: details.storeId || \"0\",\n              partitionKey: details.partitionKey,\n            };\n          })();\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getAllCookieStores: function (callback) {\n          const promise = Promise.resolve([\n            { id: \"0\", tabIds: [1] }, // Mock store for the current context\n          ]);\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getPartitionKey: function (details, callback) {\n          _warn(\n            \"chrome.cookies.getPartitionKey is not supported in this environment.\",\n          );\n          const promise = Promise.resolve({ partitionKey: {} }); // Return empty partition key\n          return handlePromiseCallback(promise, callback);\n        },\n\n        onChanged: {\n          addListener: (callback) => {\n            if (typeof callback === \"function\") {\n              cookieChangeListeners.add(callback);\n            }\n          },\n          removeListener: (callback) => {\n            cookieChangeListeners.delete(callback);\n          },\n        },\n      };\n    })(),\n    tabs: {\n      query: async (queryInfo) => {\n        _warn(\"chrome.tabs.query polyfill only returns current tab info.\");\n        const dummyId = Math.floor(Math.random() * 1000) + 1;\n        return [\n          {\n            id: dummyId,\n            url: CURRENT_LOCATION,\n            active: true,\n            windowId: 1,\n            status: \"complete\",\n          },\n        ];\n      },\n      create: async ({ url, active = true }) => {\n        _log(`[Polyfill tabs.create] URL: ${url}`);\n        if (typeof _openTab !== \"function\")\n          throw new Error(\"_openTab not defined\");\n        _openTab(url, active);\n        const dummyId = Math.floor(Math.random() * 1000) + 1001;\n        return Promise.resolve({\n          id: dummyId,\n          url: url,\n          active,\n          windowId: 1,\n        });\n      },\n      sendMessage: async (tabId, message) => {\n        _warn(\n          `chrome.tabs.sendMessage polyfill (to tab ${tabId}) redirects to runtime.sendMessage (current context).`,\n        );\n        return chrome.runtime.sendMessage(message);\n      },\n      onActivated: createNoopListeners(),\n      onUpdated: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n      onReplaced: createNoopListeners(),\n      onCreated: createNoopListeners(),\n      onMoved: createNoopListeners(),\n      onDetached: createNoopListeners(),\n      onAttached: createNoopListeners(),\n    },\n    windows: {\n      onFocusChanged: createNoopListeners(),\n      onCreated: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n      onFocused: createNoopListeners(),\n      onFocus: createNoopListeners(),\n      onBlur: createNoopListeners(),\n      onFocused: createNoopListeners(),\n    },\n    notifications: {\n      create: async (notificationId, options) => {\n        try {\n          let id = notificationId;\n          let notificationOptions = options;\n\n          if (typeof notificationId === \"object\" && notificationId !== null) {\n            notificationOptions = notificationId;\n            id = \"notification_\" + Math.random().toString(36).substring(2, 15);\n          } else if (typeof notificationId === \"string\" && options) {\n            id = notificationId;\n            notificationOptions = options;\n          } else {\n            throw new Error(\"Invalid parameters for notifications.create\");\n          }\n\n          if (!notificationOptions || typeof notificationOptions !== \"object\") {\n            throw new Error(\"Notification options must be an object\");\n          }\n\n          const {\n            title,\n            message,\n            iconUrl,\n            type = \"basic\",\n          } = notificationOptions;\n\n          if (!title || !message) {\n            throw new Error(\"Notification must have title and message\");\n          }\n\n          if (\"Notification\" in window) {\n            if (Notification.permission === \"granted\") {\n              const notification = new Notification(title, {\n                body: message,\n                icon: iconUrl,\n                tag: id,\n              });\n\n              _log(`[Notifications] Created notification: ${id}`);\n              return id;\n            } else if (Notification.permission === \"default\") {\n              const permission = await Notification.requestPermission();\n              if (permission === \"granted\") {\n                const notification = new Notification(title, {\n                  body: message,\n                  icon: iconUrl,\n                  tag: id,\n                });\n                _log(\n                  `[Notifications] Created notification after permission: ${id}`,\n                );\n                return id;\n              } else {\n                _warn(\"[Notifications] Permission denied for notifications\");\n                return id;\n              }\n            } else {\n              _warn(\"[Notifications] Notifications are blocked\");\n              return id;\n            }\n          } else {\n            _warn(\n              \"[Notifications] Native notifications not supported, using console fallback\",\n            );\n            _log(`[Notification] ${title}: ${message}`);\n            return id;\n          }\n        } catch (error) {\n          _error(\"[Notifications] Error creating notification:\", error.message);\n          throw error;\n        }\n      },\n      clear: async (notificationId) => {\n        _log(`[Notifications] Clear notification: ${notificationId}`);\n        // For native notifications, there's no direct way to clear by ID\n        // This is a limitation of the Web Notifications API\n        return true;\n      },\n      getAll: async () => {\n        _warn(\"[Notifications] getAll not fully supported in polyfill\");\n        return {};\n      },\n      getPermissionLevel: async () => {\n        if (\"Notification\" in window) {\n          const permission = Notification.permission;\n          return { level: permission === \"granted\" ? \"granted\" : \"denied\" };\n        }\n        return { level: \"denied\" };\n      },\n    },\n    contextMenus: {\n      create: (createProperties, callback) => {\n        try {\n          if (!createProperties || typeof createProperties !== \"object\") {\n            throw new Error(\"Context menu create properties must be an object\");\n          }\n\n          const { id, title, contexts = [\"page\"], onclick } = createProperties;\n          const menuId =\n            id || `menu_${Math.random().toString(36).substring(2, 15)}`;\n\n          if (!title || typeof title !== \"string\") {\n            throw new Error(\"Context menu must have a title\");\n          }\n\n          // Store menu items for potential use\n          if (!window._polyfillContextMenus) {\n            window._polyfillContextMenus = new Map();\n          }\n\n          window._polyfillContextMenus.set(menuId, {\n            id: menuId,\n            title,\n            contexts,\n            onclick,\n            enabled: createProperties.enabled !== false,\n          });\n\n          _log(\n            `[ContextMenus] Created context menu item: ${title} (${menuId})`,\n          );\n\n          // Try to register a menu command as fallback\n          if (typeof _registerMenuCommand === \"function\") {\n            try {\n              _registerMenuCommand(\n                title,\n                onclick ||\n                  (() => {\n                    _log(`Context menu clicked: ${title}`);\n                  }),\n              );\n            } catch (e) {\n              _warn(\n                \"[ContextMenus] Failed to register as menu command:\",\n                e.message,\n              );\n            }\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n\n          return menuId;\n        } catch (error) {\n          _error(\"[ContextMenus] Error creating context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n          throw error;\n        }\n      },\n      update: (id, updateProperties, callback) => {\n        try {\n          if (\n            !window._polyfillContextMenus ||\n            !window._polyfillContextMenus.has(id)\n          ) {\n            throw new Error(`Context menu item not found: ${id}`);\n          }\n\n          const menuItem = window._polyfillContextMenus.get(id);\n          Object.assign(menuItem, updateProperties);\n\n          _log(`[ContextMenus] Updated context menu item: ${id}`);\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\"[ContextMenus] Error updating context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      remove: (menuItemId, callback) => {\n        try {\n          if (\n            window._polyfillContextMenus &&\n            window._polyfillContextMenus.has(menuItemId)\n          ) {\n            window._polyfillContextMenus.delete(menuItemId);\n            _log(`[ContextMenus] Removed context menu item: ${menuItemId}`);\n          } else {\n            _warn(\n              `[ContextMenus] Context menu item not found for removal: ${menuItemId}`,\n            );\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\"[ContextMenus] Error removing context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      removeAll: (callback) => {\n        try {\n          if (window._polyfillContextMenus) {\n            const count = window._polyfillContextMenus.size;\n            window._polyfillContextMenus.clear();\n            _log(`[ContextMenus] Removed all ${count} context menu items`);\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\n            \"[ContextMenus] Error removing all context menus:\",\n            error.message,\n          );\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      onClicked: {\n        addListener: (callback) => {\n          if (!window._polyfillContextMenuListeners) {\n            window._polyfillContextMenuListeners = new Set();\n          }\n          window._polyfillContextMenuListeners.add(callback);\n          _log(\"[ContextMenus] Added click listener\");\n        },\n        removeListener: (callback) => {\n          if (window._polyfillContextMenuListeners) {\n            window._polyfillContextMenuListeners.delete(callback);\n            _log(\"[ContextMenus] Removed click listener\");\n          }\n        },\n      },\n    },\n  };\n\n  const tc = (fn) => {\n    try {\n      fn();\n    } catch (e) {}\n  };\n  const loggingProxyHandler = (_key) => ({\n    get(target, key, receiver) {\n      tc(() => _log(`[${contextType}] [CHROME - ${_key}] Getting ${key}`));\n      return Reflect.get(target, key, receiver);\n    },\n    set(target, key, value, receiver) {\n      tc(() =>\n        _log(`[${contextType}] [CHROME - ${_key}] Setting ${key} to ${value}`),\n      );\n      return Reflect.set(target, key, value, receiver);\n    },\n    has(target, key) {\n      tc(() =>\n        _log(`[${contextType}] [CHROME - ${_key}] Checking if ${key} exists`),\n      );\n      return Reflect.has(target, key);\n    },\n  });\n  chrome = Object.fromEntries(\n    Object.entries(chrome).map(([key, value]) => [\n      key,\n      new Proxy(value, loggingProxyHandler(key)),\n    ]),\n  );\n\n  // Alias browser to chrome for common Firefox pattern\n  const browser = new Proxy(chrome, loggingProxyHandler);\n\n  const oldGlobalThis = globalThis;\n  const oldWindow = window;\n  const oldSelf = self;\n  const oldGlobal = globalThis;\n  const __globalsStorage = {};\n\n  const TO_MODIFY = [oldGlobalThis, oldWindow, oldSelf, oldGlobal];\n  const set = (k, v) => {\n    __globalsStorage[k] = v;\n    TO_MODIFY.forEach((target) => {\n      target[k] = v;\n    });\n  };\n  const proxyHandler = {\n    get(target, key, receiver) {\n      const fns = [\n        () => __globalsStorage[key],\n        () => Reflect.get(target, key, target),\n        () => target[key],\n      ];\n      const out = fns\n        .map((f) => {\n          try {\n            let out = f();\n            return out;\n          } catch (e) {\n            return undefined;\n          }\n        })\n        .find((f) => f !== undefined);\n      if (typeof out === \"function\") {\n        return out.bind(target);\n      }\n      return out;\n    },\n    set(target, key, value, receiver) {\n      try {\n        tc(() => _log(`[${contextType}] Setting ${key} to ${value}`));\n        set(key, value);\n        return Reflect.set(target, key, value, receiver);\n      } catch (e) {\n        _error(\"Error setting\", key, value, e);\n        try {\n          target[key] = value;\n          return true;\n        } catch (e) {\n          _error(\"Error setting\", key, value, e);\n        }\n        return false;\n      }\n    },\n    has(target, key) {\n      try {\n        return key in __globalsStorage || key in target;\n      } catch (e) {\n        _error(\"Error has\", key, e);\n        try {\n          return key in __globalsStorage || key in target;\n        } catch (e) {\n          _error(\"Error has\", key, e);\n        }\n        return false;\n      }\n    },\n    getOwnPropertyDescriptor(target, key) {\n      try {\n        if (key in __globalsStorage) {\n          return {\n            configurable: true,\n            enumerable: true,\n            writable: true,\n            value: __globalsStorage[key],\n          };\n        }\n        // fall back to the real globalThis\n        const desc = Reflect.getOwnPropertyDescriptor(target, key);\n        // ensure it's configurable so the with‑scope binding logic can override it\n        if (desc && !desc.configurable) {\n          desc.configurable = true;\n        }\n        return desc;\n      } catch (e) {\n        _error(\"Error getOwnPropertyDescriptor\", key, e);\n        return {\n          configurable: true,\n          enumerable: true,\n          writable: true,\n          value: undefined,\n        };\n      }\n    },\n\n    defineProperty(target, key, descriptor) {\n      try {\n        // Normalize descriptor to avoid mixed accessor & data attributes\n        const hasAccessor = \"get\" in descriptor || \"set\" in descriptor;\n\n        if (hasAccessor) {\n          // Build a clean descriptor without value/writable when accessors present\n          const normalized = {\n            configurable:\n              \"configurable\" in descriptor ? descriptor.configurable : true,\n            enumerable:\n              \"enumerable\" in descriptor ? descriptor.enumerable : false,\n          };\n          if (\"get\" in descriptor) normalized.get = descriptor.get;\n          if (\"set\" in descriptor) normalized.set = descriptor.set;\n\n          // Store accessor references for inspection but avoid breaking invariants\n          set(key, {\n            get: descriptor.get,\n            set: descriptor.set,\n          });\n\n          return Reflect.defineProperty(target, key, normalized);\n        }\n\n        // Data descriptor path\n        set(key, descriptor.value);\n        return Reflect.defineProperty(target, key, descriptor);\n      } catch (e) {\n        _error(\"Error defineProperty\", key, descriptor, e);\n        return false;\n      }\n    },\n  };\n\n  // Create proxies once proxyHandler is defined\n  const proxyWindow = new Proxy(oldWindow, proxyHandler);\n  const proxyGlobalThis = new Proxy(oldGlobalThis, proxyHandler);\n  const proxyGlobal = new Proxy(oldGlobal, proxyHandler);\n  const proxySelf = new Proxy(oldSelf, proxyHandler);\n\n  // Seed storage with core globals so lookups succeed inside `with` blocks\n  Object.assign(__globalsStorage, {\n    chrome,\n    browser,\n    window: proxyWindow,\n    globalThis: proxyGlobalThis,\n    global: proxyGlobal,\n    self: proxySelf,\n    document: oldWindow.document,\n  });\n\n  const __globals = {\n    chrome,\n    browser,\n    window: proxyWindow,\n    globalThis: proxyGlobalThis,\n    global: proxyGlobal,\n    self: proxySelf,\n    __globals: __globalsStorage,\n  };\n\n  __globals.contextId = contextId;\n  __globals.contextType = contextType;\n  __globals.module = undefined;\n  __globals.amd = undefined;\n  __globals.define = undefined;\n  __globals.importScripts = (...args) => {\n    _log(\"importScripts\", args);\n  };\n\n  return __globals;\n}\n\n\nif (typeof window !== 'undefined') {\n    window.buildPolyfill = buildPolyfill;\n}\n"
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