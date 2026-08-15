// ==UserScript==
// @name        ChatPort: AI Chat Export
// @version     1.0.1
// @description Export AI chats to Notion, or save PDF, Markdown, and HTML locally with code, equations, tables, and images.
// @namespace   chatport-ai-chat-export
// @author      Converter Script
// @match       *://*/*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_registerMenuCommand
// @grant       GM_openInTab
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAABEZVhJZk1NACoAAAAIAAGHaQAEAAAAAQAAABoAAAAAAAOgAQADAAAAAQABAACgAgAEAAAAAQAABACgAwAEAAAAAQAABAAAAAAA093qHQAAAAZiS0dEAAAAAAAA+UO7fwAAAAd0SU1FB+oIBQU2EZnCWtsAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjYtMDgtMDVUMDU6NTQ6MTcrMDA6MDBhC33aAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI2LTA4LTA1VDA1OjU0OjE3KzAwOjAwEFbFZgAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNi0wOC0wNVQwNTo1NDoxNyswMDowMEdD5LkAAAARdEVYdGV4aWY6Q29sb3JTcGFjZQAxD5sCSQAAABJ0RVh0ZXhpZjpFeGlmT2Zmc2V0ADI2UxuiZQAAABl0RVh0ZXhpZjpQaXhlbFhEaW1lbnNpb24AMTAyNPLFVh8AAAAZdEVYdGV4aWY6UGl4ZWxZRGltZW5zaW9uADEwMjRLPo33AAAOeklEQVRo3u2Ze5BlVXXGf2utfc69t2/3zHTPo4d5Dw6C8hpHhWJARgJiUmpBRDS+Kj6CmjJGQ1AUNQ9FDamoSSpGjaWmCsqUIAaDgIqAoIDhoTDACDgwwLyn59Hv+zjn7JU/zr3dM5mZdlD8j31r1z3d995zvm+vb31r7XPg+fH8+J2GPBcnGTjpI8zduJRqu87upc8gbRWJhrqWVxBFTD1WM6xI8cJp9Y6y85FP/87XDr/tDxcs+xhp1gs1IRueZGLWsE7GMbXdvb7l6kuKhe+/DCkSxJx2mjH70TXS7t+uJBEJHquNPsdh+ZLPIz2Rp3794d9/BGpnvpv6pjmERp2oBa6FhKKivUOr4sSiTS65Ic2UM0cv4ZZjPlpNskqQ4N7saWSz169u5wN7IHFIc2ykz6jlMDsWuMOE4knBk09/8PdDIJxzPgMPn0BeabJv+VYGf3WM7V24vpi78yQquxbRXrzzBApbJ1FPFdfjQOYLUgVxxcYQ3Qr+kKjf6Wn8aRjp3U4tQydqGuttJJdIZnhfxhNb3v/cEpi39FJCu4JLJGqUdLKmRdoudhz7I134+LlvFk/fK9HWCmriirgAioiAKyqKA+KU/xP2inKDKF+Syer/xnqLkFdD/KttOV+fh7YCj295z3NDYP7CS9G8Auq4RG3N3RfrOwYp0uxcye0KcVutGGAIWggCriIoCCIo4uqAg7qAiKgJAgIifCum2aUhr26RRmI+0I4U4pIrIs6j2/5sRnw6I/hll6J5gpcvi5bHkU/9uxRW/IvmyQ/Fk9VCKErg6oIargaiICqYCCqCqqAmIkFEDcQFzSWaE/Ut1qo8hPJGzIv0qToiCObIjOiOIAKDg3+Du0MJvigsm5226tdpDK8ULHaAmKCAIK5I5+Uo2vl/KSFBEShjMPU9kFyQIAJu/rehZZ+qDC+TxrInEME1T3hk6zsOi9EO98GCRZ8oRYtrEbIYk2Zf2ui7Vd3WgmUd4CooIoqK0T0WMWRq+QwR6cAXOroqa4Mq4qIgUVAk2lkkXonaukVGetUH9/rwB77Fso0fY2jf94+cwLwVl5D1NdB2ImMr9/rpG85jKN1+g3o4AyxTNBFUVA0TI0bBYwkOV9zLlVZVVDsJ3CFQEhOIIK0CSQzpUnRzRc/0SjYsafFzHa+H2TecHYXAghWvZtfQ/xxZDoRmnZdveBvJZFX7H13IAwt+coXGcI6gmSAJCGZGYzJnbKyFmZAkSghGSJSQKElqZFkka0dMrXSgjjNJ4ej8GvqW45B2BFXETQQRcUPz5J818VdI8DzrHzYPObQPLZaDcmD+0stQV6Rt5uIF+JlahNvFzUutq6gqkxM5a166kA99+DRecMzc/U4keHSS1Ni6eZyL33cb27ZM0tdboSgiYga7JpC3vhj5zBlw2tXIaIH2pEgUBCnEMTHfkA0OrZHcWjpel/rQMh964zU8eeWXZ5bQrOrZeMj5wPZP++aJBpM92/9LPCwV0QiqpkZjsmD1Swa57qa3cvyJC5k3r87cqdnDvPl1+gdqLF85m9PXLeaH129idCSjWg14I4c1C/HLz4Cje9DBXvSunUjDETUUVRXLxXXQmj3jNj7rTsvToFklVvfMZ/vItTNHoHfxX9KbDRjiBcIfa27fFaygtEjMlNGRNv/5rfM57/UvpjHZJkkOoUSBIncq1YT1v9zF28/7ASP7WtQ/tZbiouMpIshYjs4LyI4W+vH7CNc9g/RU0CgRRNG4zXsnj8d1mHaQfub4bdteffgcmPXyP6fmfVQbdU8bNSjkPeVXFBwEIRZCX2+Fo18wAECSaulF2vElm/anJFXarYyTXrKAb37n1fTNrtL48sOEy+/DRjPoC/DACPbX92B3D0El6cpIBS00hkU2Wb8wTNQJWcX2hp0zJ3HtyRVYTLXZOxFbvY1Viq2TEryCUh7LFCEAvDx0wP3gaaEkseaUQb7+7XOo72vTuOJe7CsPo4D9xZ3ItZuQfXlpwZTnVxR1w6JdaENzsaEFRarpzAQKNbRQ1dzQws4U1xouBR2bo3P6UiLT6lMFMznsDEFptzNOOf0ovvyds6nP7SPe+DR25Ub0VyPIYB2xEvSU3aKqGOrJy2T5jkWybLtbu6ozEvDeUSwPbrmBy2ndZqUErtMFiP3BC+5Co5HTbORT781medxuR9S0JNHKOGPdIv7wDSsZf2QE+9wvoRrQXErn61JwLUuiaFS3fmtXTrZWBS2Sg3L2gA1N0jQ5f99Hi7u4hu0LHj+eqXLfKT7ehS6lPoBmq+BPLriK9Q/upKeWEqPvtyKOE7nq22/m5acuwz0CUO9Lkahou1SneKexKJugMgbebQsVo3KCu950KNM5gIAWytVHfRLEq6Hds7ADvuwsp4BPRwUgBOWCC0/gZacsJU2s0ztNE1ATFh7VB8Qp1XnhHZEYHst2W7yz8tKVknSzAI1xCa44B48DCLgILgHEg4v0dJozoSMikW7yyhQYM+FP33UKRzJEYue9bPwULSXpXcDWmTqVymUcpH5A/h2OQAkuMm0tckCFLZuabrdZjjyLfPKyH/LrR4eoVBKi+9RvHFBVWs2MP3rNsbzrPaeWH8SyyRYvLboLvtw7dO4DoB0ygpRhP+SiHCghF7xwkJgr2iiBigsq3XxwZJoM4O7sHhpnx45RqrUEj76fVJ0QjMmJNsPDjanrpBXrnLVs/mRaMl0HmpaRKwoTpX3/BgISYMe2T/NCua85Of+WnSArpNyKTSUZsbuTKk+YpsZ/fOONRyShMrqw7ZkGSUgglhFQ0aloa2flret8KGZs88PsvQ4gkCWFL+//orXm3FGAbMA5lU44ywUtpaP7hTNG58c3P8b2bWOEZL8C1/ls3VkrWbZ8DrGINBqRi87/Kff8ZDcD/T14AYLTbkYqaUDFuiWsGwUt1yw+LNoxtRkJ7K2S1qKAIyJ3i+g7u6Er97jTNtp1m1ar4PK/+zHrH9xGrZbisVSQqjA+2uKr37iAZW9fg5ry3Ssf57H1I1x9x1nM7q/QnCzo6Q386JqdfONzT5PWSt/pVgNxU1Uf0ZA/IK7EQmcmkCigMToRhDsk0hLRCojj09UYkSkJ1WqB7934DiYm2p2itp8kBebPr5NnOSEJjI/k9A/UOPbEftKqkCQGCOdeIFz1+a0QS6frJG8UEVOJ9/szK7ZEgsjKTfH/EzhAWLZyGA9FrI0ukOrYwGOI/7Rcb4ll7RIQxSPEzqmK6PQP9LBkaT+LFs9h8ZLpuWjxHEJinZx2LnznSloTzquO+TH33Lank+zO5ETRVTsm+6WvKGp8J8zfSzJ/l03KHmYksO3BzxLG55DVhzWrjSISv9a1tO7qB1Mmx3PuvXtHqfPCabdyWs2MVuvgmWeRIi+d6eb/3s7InjYf/PtjOf3cQR57cJSJsYw0FQwr99VlsxjFJQi+k57m1fROEtNWMau5bGYCADGZJKZZ3L32azy985Krwe8DTNBCRPAIPT0pX/qnB7j/5zupVBPSSkKlmlCpHDyTNFCpJmx6fIzPXfwQH/nHE3jTe4/moXuGufTND6IqpJVAzDtNRFnUoooiFv9N983aw3BvSHfM8SwdPYjAQea6eMlnsTxBi9TAC4RzKJKbRUJppo6YGu2201MLvO71L2DFqlnlJr17e6XbQ5U3NeipB+7/2V7uv2MPt2x6FU//epL3v+YX7N6W8bq3LWJsT+S+m0epVVPEpVDUzPzxsGTXatqhkY/VJWzt9+HX3cWt33v3zAQAli/4As1Vm+nZcJw5XpBk/6ox/YCIZjiJYJgKMYeJ8QKPnTbAtVNRpbREn24PKpVAtRJ44Qmz2LOjzZ6tOb29KRPDkaBGTz1B3dwwUQFJs7Ml6q3uYmKxaPeOc9PGPzgI6yFvrxdpk3TzfLw2GYv6HiZW/+xD/be/abW4vgLRTCDxCGbGwEA61XaV7x0nF5tqkU2sLIBRePT+CdJEqdcTKJTZc9JS94W6otEUk1Bcqq3KrR7V0pHBoj13K67FoaAeOgILX/MhKvcu7/YoihWRUPRro/d2CCcKmhmaSKd/0U5LrISpJs2mmjIr+1kvj4N2bv5GwaZJxo51qibFF3205+LYrKu96InYWvUU9qsV3Ljx7CMnALD4/HeS3LmmBCGYaF6gzQFp91+vnqxVCbFTbKxbPcsoHNhVTr+mClSHrHYs03JxCSqCJvGz6Xj94z7xIrLld4kIXkTh+8+sPRzMw9/c3XrdN9FqVmo6WiExNWJ1r656aJ1Y/KqAiqspWpTTSt+eAr8/iWnwpbzUVTQXzAUJpnFMK/nbmUw/HiZWSbbsbiE3Jwszgp+RAMCTmy/GrV1WANdCPbW4+6hc2tX3iWWvVfWHVDBBTVER17wkI1ER76R1qW2sMCxXtOiUq2CCaIjXSG/zZI12FUWw8ZU/xx2PEbYc9wt+0ziiBxyrFn8BzfoQdVwzCZPzVCqNonb81pA9vPKtGpOLzNO16kEOzICuK3X/KlsQFUZQv1EtfimM9t3p/WNIqxrGXvJIXtu0BG1WuX7z2iOBduSPmI4+8TLS3SspKuOM1p5i3p41Vlk2VMSnl1AMnUxl4cOrNaavVA+nWbTjTHSuYlUVi+I6Ieg2FdZL8J9JEm8Pe2dtobeBjczS2D9GyCrRWjUmZ+/ixs3rjhTWs3vIt+qky6kMzydpzcZDTpRMrNWj7aHXFj2DN2F5lWSyh52v+r4eteG0GkXVQlAvkrHs6A1vam6ffS9UcqSSY3v6zPuaZHMbhURFxxO82uYHG896NpCe3WPWjes/MXV88pJvUi/6vW+wUeyuXAvtujooLrG+bUUk2oREKe8+FCnHANsdc4BCvbF4qJh4ww3MufICWn0tbtvyymcF/LeKwOHGSS/9CovuP48eFrJ5xbWEZkUSMcQDpgY4LkLsbXpt9xwizhMXXc8T/3DFc3H558fz43cZ/wfakPRqrzfAJwAAAABJRU5ErkJggg==
// @run-at      document-idle
// ==/UserScript==

console.log("Script start:",performance.now());const e=!0,t=e=>e,o="passthrough";let s,c={createHTML:t,createScript:t,createScriptURL:t},i=!1;const r=()=>{try{void 0!==window.isSecureContext&&window.isSecureContext&&window.trustedTypes&&window.trustedTypes.createPolicy&&(i=!0,trustedTypes.defaultPolicy?(l("TT Default Policy exists"),c=window.trustedTypes.createPolicy("default",c),s=trustedTypes.defaultPolicy,l(`Created custom passthrough policy, in case the default policy is too restrictive: Use Policy '${o}' in var 'TTP':`,c)):s=c=window.trustedTypes.createPolicy("default",c),l("Trusted-Type Policies: TTP:",c,"TTP_default:",s))}catch(e){l(e)}},l=(...e)=>{console.log(...e)};r();

(function() {
    // #region Logging
	
	  const SCRIPT_NAME = "ChatPort: AI Chat Export";
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
			  "src/popup.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>AI Chat Export</title>\n    <link rel=\"stylesheet\" href=\"data:text/css;base64,QGZvbnQtZmFjZSB7CiAgZm9udC1mYW1pbHk6ICJQcm9tcHQiOwogIHNyYzogdXJsKCJmb250cy9Qcm9tcHQtU2VtaUJvbGQudHRmIikgZm9ybWF0KCJ0cnVldHlwZSIpOwogIGZvbnQtd2VpZ2h0OiA2MDA7CiAgZm9udC1zdHlsZTogbm9ybWFsOwogIGZvbnQtZGlzcGxheTogc3dhcDsKfQoKOnJvb3QgewogIGNvbG9yLXNjaGVtZTogbGlnaHQ7CiAgZm9udC1mYW1pbHk6IEludGVyLCB1aS1zYW5zLXNlcmlmLCBzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgIlNlZ29lIFVJIiwgc2Fucy1zZXJpZjsKICBjb2xvcjogIzFmMjkzNzsKICBiYWNrZ3JvdW5kOiAjZjVmM2ZmOwp9CgoqIHsKICBib3gtc2l6aW5nOiBib3JkZXItYm94Owp9CgpodG1sLApib2R5IHsKICB3aWR0aDogMzgwcHg7CiAgbWF4LXdpZHRoOiAzODBweDsKICBtYXJnaW46IDA7CiAgb3ZlcmZsb3cteDogaGlkZGVuOwogIGJhY2tncm91bmQ6CiAgICByYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IHRvcCByaWdodCwgcmdiYSgxMjQsIDU4LCAyMzcsIDAuMTYpLCB0cmFuc3BhcmVudCA0MiUpLAogICAgI2Y4ZmFmYzsKfQoKbWFpbiB7CiAgcGFkZGluZzogMThweDsKfQoKaGVhZGVyIHsKICBtYXJnaW4tYm90dG9tOiAxNHB4Owp9CgpoMSwKaDIsCnAgewogIG1hcmdpbi10b3A6IDA7Cn0KCmgxLApoMiB7CiAgZm9udC1mYW1pbHk6ICJQcm9tcHQiLCBJbnRlciwgdWktc2Fucy1zZXJpZiwgc3lzdGVtLXVpLCBzYW5zLXNlcmlmOwogIGZvbnQtd2VpZ2h0OiA2MDA7Cn0KCmgxIHsKICBtYXJnaW4tYm90dG9tOiAwOwogIGNvbG9yOiAjMzEyZTgxOwogIGZvbnQtc2l6ZTogMjJweDsKfQoKaDIgewogIG1hcmdpbi1ib3R0b206IDA7CiAgZm9udC1zaXplOiAxNHB4Owp9CgouZXllYnJvdyB7CiAgbWFyZ2luLWJvdHRvbTogNHB4OwogIGNvbG9yOiAjN2MzYWVkOwogIGZvbnQtc2l6ZTogMTBweDsKICBmb250LXdlaWdodDogODAwOwogIGxldHRlci1zcGFjaW5nOiAwLjE0ZW07Cn0KCi5wYW5lbCB7CiAgbWFyZ2luLWJvdHRvbTogMTJweDsKICBwYWRkaW5nOiAxNHB4OwogIGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7CiAgYm9yZGVyLXJhZGl1czogMTRweDsKICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOTQpOwogIGJveC1zaGFkb3c6IDAgOHB4IDI0cHggcmdiYSg1MSwgNjUsIDg1LCAwLjA2KTsKfQoKLnNlY3Rpb24taGVhZGluZyB7CiAgZGlzcGxheTogZmxleDsKICBhbGlnbi1pdGVtczogY2VudGVyOwogIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsKICBtYXJnaW4tYm90dG9tOiAxMnB4Owp9CgouY29ubmVjdGlvbi1zdW1tYXJ5IHsKICBtYXJnaW4tYm90dG9tOiAwOwogIGxpc3Qtc3R5bGU6IG5vbmU7CiAgY3Vyc29yOiBwb2ludGVyOwp9CgouY29ubmVjdGlvbi1zdW1tYXJ5Ojotd2Via2l0LWRldGFpbHMtbWFya2VyIHsKICBkaXNwbGF5OiBub25lOwp9CgouY29ubmVjdGlvbi1wYW5lbFtvcGVuXSAuY29ubmVjdGlvbi1zdW1tYXJ5IHsKICBtYXJnaW4tYm90dG9tOiAxMnB4Owp9CgouY29ubmVjdGlvbi1zdW1tYXJ5LWVuZCB7CiAgZGlzcGxheTogZmxleDsKICBhbGlnbi1pdGVtczogY2VudGVyOwogIGdhcDogN3B4Owp9CgouY29ubmVjdGlvbi1jaGV2cm9uIHsKICB3aWR0aDogMThweDsKICBoZWlnaHQ6IDE4cHg7CiAgZmlsbDogbm9uZTsKICBzdHJva2U6ICM2NDc0OGI7CiAgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kOwogIHN0cm9rZS1saW5lam9pbjogcm91bmQ7CiAgc3Ryb2tlLXdpZHRoOiAyOwogIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxNjBtcyBlYXNlOwp9CgouY29ubmVjdGlvbi1wYW5lbFtvcGVuXSAuY29ubmVjdGlvbi1jaGV2cm9uIHsKICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOwp9CgouYmFkZ2UsCi5jb3VudCB7CiAgY29sb3I6ICM2ZDI4ZDk7CiAgZm9udC1zaXplOiAxMXB4OwogIGZvbnQtd2VpZ2h0OiA3MDA7Cn0KCi5zb3VyY2Utc3VtbWFyeSB7CiAgZGlzcGxheTogZ3JpZDsKICBqdXN0aWZ5LWl0ZW1zOiBlbmQ7CiAgZ2FwOiAzcHg7Cn0KCi5zb3VyY2UtYmFkZ2UgewogIHBhZGRpbmc6IDJweCA3cHg7CiAgYm9yZGVyLXJhZGl1czogOTk5cHg7CiAgY29sb3I6ICMwMzY5YTE7CiAgYmFja2dyb3VuZDogI2UwZjJmZTsKICBmb250LXNpemU6IDEwcHg7CiAgZm9udC13ZWlnaHQ6IDgwMDsKfQoKLmJhZGdlIHsKICBwYWRkaW5nOiAzcHggOHB4OwogIGJvcmRlci1yYWRpdXM6IDk5OXB4OwogIGJhY2tncm91bmQ6ICNlZGU5ZmU7Cn0KCmJ1dHRvbiB7CiAgd2lkdGg6IDEwMCU7CiAgYm9yZGVyLXJhZGl1czogOXB4OwogIGZvbnQ6IGluaGVyaXQ7Cn0KCmJ1dHRvbiB7CiAgcGFkZGluZzogMTBweCAxMnB4OwogIGJvcmRlcjogMDsKICBjdXJzb3I6IHBvaW50ZXI7CiAgZm9udC1zaXplOiAxM3B4OwogIGZvbnQtd2VpZ2h0OiA3NTA7Cn0KCmJ1dHRvbjpkaXNhYmxlZCB7CiAgY3Vyc29yOiBub3QtYWxsb3dlZDsKICBvcGFjaXR5OiAwLjQ4Owp9CgoucHJpbWFyeSB7CiAgY29sb3I6ICNmZmY7CiAgYmFja2dyb3VuZDogIzZkMjhkOTsKfQoKLnNlY29uZGFyeSB7CiAgY29sb3I6ICM1YjIxYjY7CiAgYmFja2dyb3VuZDogI2VkZTlmZTsKfQoKLmxvY2FsLWV4cG9ydC1hY3Rpb25zIHsKICBkaXNwbGF5OiBncmlkOwogIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIG1pbm1heCgwLCAxZnIpKTsKICBnYXA6IDhweDsKICBtYXJnaW4tdG9wOiA4cHg7Cn0KCi5sb2NhbC1leHBvcnQtYnV0dG9uIHsKICBkaXNwbGF5OiBmbGV4OwogIG1pbi1oZWlnaHQ6IDQycHg7CiAgYWxpZ24taXRlbXM6IGNlbnRlcjsKICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKICBnYXA6IDZweDsKICBwYWRkaW5nOiA4cHg7Cn0KCi5sb2NhbC1leHBvcnQtYnV0dG9uIHN2ZyB7CiAgd2lkdGg6IDE4cHg7CiAgaGVpZ2h0OiAxOHB4OwogIGZpbGw6IG5vbmU7CiAgc3Ryb2tlOiBjdXJyZW50Q29sb3I7CiAgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kOwogIHN0cm9rZS1saW5lam9pbjogcm91bmQ7CiAgc3Ryb2tlLXdpZHRoOiAxLjg7Cn0KCi5sb2NhbC1leHBvcnQtYnV0dG9uIHNwYW4gewogIGZvbnQtc2l6ZTogMTFweDsKfQoKLmxvY2FsLWhpbnQgewogIG1hcmdpbjogOHB4IDAgMDsKICBjb2xvcjogIzY0NzQ4YjsKICBmb250LXNpemU6IDEwcHg7CiAgbGluZS1oZWlnaHQ6IDEuNDsKICB0ZXh0LWFsaWduOiBjZW50ZXI7Cn0KCi50ZXh0LWJ1dHRvbiB7CiAgbWFyZ2luLXRvcDogN3B4OwogIHBhZGRpbmc6IDdweDsKICBjb2xvcjogIzY0NzQ4YjsKICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsKICBmb250LXNpemU6IDExcHg7CiAgZm9udC13ZWlnaHQ6IDY1MDsKfQoKLndvcmtzcGFjZS1uYW1lIHsKICBtYXJnaW4tYm90dG9tOiAxMHB4OwogIGNvbG9yOiAjMzM0MTU1OwogIGZvbnQtc2l6ZTogMTNweDsKICBmb250LXdlaWdodDogNzAwOwp9CgouY29ubmVjdGlvbi1zZWxlY3RvcnMgewogIGRpc3BsYXk6IGdyaWQ7CiAgbWluLXdpZHRoOiAwOwogIGdhcDogOHB4OwogIG1hcmdpbi1ib3R0b206IDEwcHg7Cn0KCi5zZWxlY3QtbGFiZWwgewogIGRpc3BsYXk6IGdyaWQ7CiAgbWluLXdpZHRoOiAwOwogIGdhcDogNHB4OwogIGNvbG9yOiAjNDc1NTY5OwogIGZvbnQtc2l6ZTogMTFweDsKICBmb250LXdlaWdodDogNzAwOwp9CgpzZWxlY3QgewogIHdpZHRoOiAxMDAlOwogIG1pbi13aWR0aDogMDsKICBtYXgtd2lkdGg6IDEwMCU7CiAgcGFkZGluZzogOHB4IDlweDsKICBib3JkZXI6IDFweCBzb2xpZCAjY2JkNWUxOwogIGJvcmRlci1yYWRpdXM6IDhweDsKICBiYWNrZ3JvdW5kOiAjZmZmOwogIGNvbG9yOiAjMzM0MTU1OwogIGZvbnQ6IGluaGVyaXQ7CiAgZm9udC1zaXplOiAxMnB4Owp9CgpzZWxlY3Q6ZGlzYWJsZWQgewogIG9wYWNpdHk6IDAuNjI7Cn0KCi5oaW50IHsKICBtYXJnaW46IDlweCAwIDA7CiAgY29sb3I6ICM2NDc0OGI7CiAgZm9udC1zaXplOiAxMXB4OwogIGxpbmUtaGVpZ2h0OiAxLjQ1Owp9CgouZG9jdW1lbnQtdGl0bGUgewogIG1hcmdpbi1ib3R0b206IDhweDsKICBjb2xvcjogIzMzNDE1NTsKICBmb250LXNpemU6IDEzcHg7CiAgZm9udC13ZWlnaHQ6IDcwMDsKfQoKLmNhcHR1cmUtYnV0dG9uIHsKICBtYXJnaW4tYm90dG9tOiA4cHg7Cn0KCi5jYXB0dXJlLXBhbmVsIHsKICBtYXJnaW4tYm90dG9tOiAxMHB4OwogIHBhZGRpbmc6IDlweDsKICBib3JkZXI6IDFweCBzb2xpZCAjYzRiNWZkOwogIGJvcmRlci1yYWRpdXM6IDEwcHg7CiAgYmFja2dyb3VuZDogI2ZhZjVmZjsKfQoKLmNhcHR1cmUtaW5zdHJ1Y3Rpb24gewogIG1hcmdpbi1ib3R0b206IDdweDsKICBjb2xvcjogIzViMjFiNjsKICBmb250LXNpemU6IDExcHg7CiAgZm9udC13ZWlnaHQ6IDcwMDsKfQoKLmNhcHR1cmUtc3RhZ2UgewogIHBvc2l0aW9uOiByZWxhdGl2ZTsKICBvdmVyZmxvdzogaGlkZGVuOwogIGJvcmRlcjogMXB4IHNvbGlkICM5NGEzYjg7CiAgYm9yZGVyLXJhZGl1czogN3B4OwogIGJhY2tncm91bmQ6ICMwZjE3MmE7CiAgY3Vyc29yOiBjcm9zc2hhaXI7CiAgdG91Y2gtYWN0aW9uOiBub25lOwogIHVzZXItc2VsZWN0OiBub25lOwp9CgouY2FwdHVyZS1zdGFnZSBpbWcgewogIGRpc3BsYXk6IGJsb2NrOwogIHdpZHRoOiAxMDAlOwogIGhlaWdodDogYXV0bzsKICBwb2ludGVyLWV2ZW50czogbm9uZTsKfQoKLmNhcHR1cmUtc2VsZWN0aW9uIHsKICBwb3NpdGlvbjogYWJzb2x1dGU7CiAgYm9yZGVyOiAycHggc29saWQgIzdjM2FlZDsKICBiYWNrZ3JvdW5kOiByZ2JhKDEyNCwgNTgsIDIzNywgMC4xOCk7CiAgYm94LXNoYWRvdzogMCAwIDAgOTk5OXB4IHJnYmEoMTUsIDIzLCA0MiwgMC4zNik7CiAgcG9pbnRlci1ldmVudHM6IG5vbmU7Cn0KCi5jYXB0dXJlLWFjdGlvbnMgewogIGRpc3BsYXk6IGdyaWQ7CiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyOwogIGdhcDogOHB4OwogIG1hcmdpbi10b3A6IDhweDsKfQoKLmNhcHR1cmUtYWN0aW9ucyAudGV4dC1idXR0b24gewogIG1hcmdpbi10b3A6IDA7CiAgYmFja2dyb3VuZDogI2ZmZjsKfQoKLnJlc3VsdC1saW5rIHsKICBkaXNwbGF5OiBibG9jazsKICBtYXJnaW4tdG9wOiAxMHB4OwogIGNvbG9yOiAjNWIyMWI2OwogIGZvbnQtc2l6ZTogMTJweDsKICBmb250LXdlaWdodDogNzAwOwogIHRleHQtYWxpZ246IGNlbnRlcjsKfQoKLnJlc3VsdC1saW5rW2hpZGRlbl0gewogIGRpc3BsYXk6IG5vbmU7Cn0KCi5zdGF0dXMgewogIG1pbi1oZWlnaHQ6IDE4cHg7CiAgbWFyZ2luOiAwOwogIGNvbG9yOiAjNDc1NTY5OwogIGZvbnQtc2l6ZTogMTJweDsKICBsaW5lLWhlaWdodDogMS40NTsKICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7Cn0KCi5zdGF0dXMuZXJyb3IgewogIGNvbG9yOiAjYjkxYzFjOwp9Cgouc3RhdHVzLnN1Y2Nlc3MgewogIGNvbG9yOiAjMDQ3ODU3Owp9CgoucG9wdXAtZm9vdGVyIHsKICB0ZXh0LWFsaWduOiBjZW50ZXI7Cn0KCi53ZWJzaXRlLWxpbmsgewogIGNvbG9yOiAjNmQyOGQ5OwogIGZvbnQtc2l6ZTogMTFweDsKICBmb250LXdlaWdodDogNzAwOwp9Cg==\" />\n  </head>\n  <body>\n    <main>\n      <header>\n        <p class=\"eyebrow\">CHATPORT</p>\n        <h1>ChatPort → Notion / Files</h1>\n      </header>\n\n      <details class=\"panel connection-panel\">\n        <summary class=\"section-heading connection-summary\">\n          <h2 id=\"connection-title\">Notion connection</h2>\n          <span class=\"connection-summary-end\">\n            <span id=\"connectionBadge\" class=\"badge\" hidden>Connected</span>\n            <svg class=\"connection-chevron\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\">\n              <path d=\"m7 10 5 5 5-5\" />\n            </svg>\n          </span>\n        </summary>\n\n        <div class=\"connection-details\">\n          <p id=\"workspaceName\" class=\"workspace-name\">No workspace connected</p>\n          <div id=\"connectionSelectors\" class=\"connection-selectors\" hidden>\n            <label class=\"select-label\" for=\"workspaceSelect\">\n              Workspace\n              <select id=\"workspaceSelect\" disabled></select>\n            </label>\n            <label class=\"select-label\" for=\"parentPageSelect\">\n              Export destination\n              <select id=\"parentPageSelect\" disabled></select>\n            </label>\n          </div>\n          <button id=\"connectButton\" class=\"secondary\" type=\"button\">Connect another workspace</button>\n          <button id=\"disconnectButton\" class=\"text-button\" type=\"button\" hidden>Disconnect</button>\n          <p class=\"hint\">Your Notion token is handled through OAuth and stored in an encrypted session.</p>\n        </div>\n      </details>\n\n      <section class=\"panel\" aria-labelledby=\"preview-title\">\n        <div class=\"section-heading\">\n          <h2 id=\"preview-title\">Full conversation</h2>\n          <div class=\"source-summary\">\n            <span id=\"sourceBadge\" class=\"source-badge\">Detecting site</span>\n            <span id=\"characterCount\" class=\"count\">0 characters</span>\n          </div>\n        </div>\n\n        <p id=\"documentTitle\" class=\"document-title\">Reading conversation…</p>\n\n        <button id=\"manualCaptureButton\" class=\"secondary capture-button\" type=\"button\" disabled>\n          Capture an image for local files\n        </button>\n\n        <section id=\"manualCapturePanel\" class=\"capture-panel\" aria-label=\"Select an area to capture\" hidden>\n          <p class=\"capture-instruction\">Drag a box around a graph, diagram, or image. Captures are included only in local files.</p>\n          <div id=\"manualCaptureStage\" class=\"capture-stage\">\n            <img id=\"manualCaptureImage\" alt=\"Screenshot for selecting a capture area\" draggable=\"false\" />\n            <span id=\"manualCaptureSelection\" class=\"capture-selection\" hidden></span>\n          </div>\n          <div class=\"capture-actions\">\n            <button id=\"manualCaptureCancelButton\" class=\"text-button\" type=\"button\">Cancel</button>\n            <button id=\"manualCaptureConfirmButton\" class=\"primary\" type=\"button\" disabled>Add image</button>\n          </div>\n        </section>\n\n        <button id=\"exportButton\" class=\"primary\" type=\"button\" disabled>\n          Export text to Notion\n        </button>\n\n        <p class=\"local-hint notion-hint\">Notion includes text, code, tables, and equations. Images stay in local files.</p>\n\n        <div class=\"local-export-actions\" aria-label=\"Save files locally\">\n          <button id=\"printButton\" class=\"secondary local-export-button\" type=\"button\" title=\"Print / Save as PDF\" aria-label=\"Print or save as PDF\" disabled>\n            <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\">\n              <path d=\"M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\" />\n              <path d=\"M6 14h12v7H6z\" />\n            </svg>\n            <span>PDF</span>\n          </button>\n          <button id=\"markdownButton\" class=\"secondary local-export-button\" type=\"button\" title=\"Download Markdown\" aria-label=\"Download Markdown\" disabled>\n            <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\">\n              <path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\" />\n              <path d=\"M14 2v6h6M8 13v5M8 18l-2-2M8 18l2-2M13 13h3a2 2 0 0 1 0 4h-3z\" />\n            </svg>\n            <span>MD</span>\n          </button>\n          <button id=\"htmlButton\" class=\"secondary local-export-button\" type=\"button\" title=\"Download HTML\" aria-label=\"Download HTML\" disabled>\n            <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\">\n              <path d=\"m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14\" />\n            </svg>\n            <span>HTML</span>\n          </button>\n        </div>\n\n        <p class=\"local-hint\">PDF, Markdown, and HTML are created locally without using the backend.</p>\n\n        <a id=\"resultLink\" class=\"result-link\" href=\"#\" target=\"_blank\" rel=\"noreferrer\" hidden>\n          Open exported page in Notion\n        </a>\n      </section>\n\n      <p id=\"status\" class=\"status\" role=\"status\" aria-live=\"polite\"></p>\n\n      <footer class=\"popup-footer\">\n        <a class=\"website-link\" href=\"https://chatport.yellowcatz.com/\" target=\"_blank\" rel=\"noreferrer\">\n          Visit ChatPort website\n        </a>\n      </footer>\n    </main>\n\n    <script src=\"data:text/javascript;base64,IWZ1bmN0aW9uKGUsdCl7Im9iamVjdCI9PXR5cGVvZiBleHBvcnRzJiYib2JqZWN0Ij09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6ImZ1bmN0aW9uIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sdCk6Im9iamVjdCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHMua2F0ZXg9dCgpOmUua2F0ZXg9dCgpfSgidW5kZWZpbmVkIiE9dHlwZW9mIHNlbGY/c2VsZjp0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO3ZhciBlPXtkOmZ1bmN0aW9uKHQscil7Zm9yKHZhciBuIGluIHIpZS5vKHIsbikmJiFlLm8odCxuKSYmT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsbix7ZW51bWVyYWJsZTohMCxnZXQ6cltuXX0pfSxvOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfX0sdD17fTtlLmQodCx7ZGVmYXVsdDpmdW5jdGlvbigpe3JldHVybiBtb319KTtjbGFzcyByIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IoZSx0KXtsZXQgbixvLHM9IkthVGVYIHBhcnNlIGVycm9yOiAiK2U7Y29uc3QgaT10JiZ0LmxvYztpZihpJiZpLnN0YXJ0PD1pLmVuZCl7Y29uc3QgZT1pLmxleGVyLmlucHV0O249aS5zdGFydCxvPWkuZW5kLG49PT1lLmxlbmd0aD9zKz0iIGF0IGVuZCBvZiBpbnB1dDogIjpzKz0iIGF0IHBvc2l0aW9uICIrKG4rMSkrIjogIjtjb25zdCB0PWUuc2xpY2UobixvKS5yZXBsYWNlKC9bXl0vZywiJCZcdTAzMzIiKTtsZXQgcixsO3I9bj4xNT8iXHUyMDI2IitlLnNsaWNlKG4tMTUsbik6ZS5zbGljZSgwLG4pLGw9bysxNTxlLmxlbmd0aD9lLnNsaWNlKG8sbysxNSkrIlx1MjAyNiI6ZS5zbGljZShvKSxzKz1yK3QrbH1zdXBlcihzKSx0aGlzLm5hbWU9IlBhcnNlRXJyb3IiLHRoaXMucG9zaXRpb249dm9pZCAwLHRoaXMubGVuZ3RoPXZvaWQgMCx0aGlzLnJhd01lc3NhZ2U9dm9pZCAwLE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLHIucHJvdG90eXBlKSx0aGlzLnBvc2l0aW9uPW4sbnVsbCE9biYmbnVsbCE9byYmKHRoaXMubGVuZ3RoPW8tbiksdGhpcy5yYXdNZXNzYWdlPWV9fXZhciBuPXI7Y29uc3Qgbz0vKFtBLVpdKS9nLHM9ZT0+ZS5yZXBsYWNlKG8sIi0kMSIpLnRvTG93ZXJDYXNlKCksaT17IiYiOiImYW1wOyIsIj4iOiImZ3Q7IiwiPCI6IiZsdDsiLCciJzoiJnF1b3Q7IiwiJyI6IiYjeDI3OyJ9LGw9L1smPjwiJ10vZyxhPWU9PlN0cmluZyhlKS5yZXBsYWNlKGwsZT0+aVtlXSksYz1lPT4ib3JkZ3JvdXAiPT09ZS50eXBlfHwiY29sb3IiPT09ZS50eXBlPzE9PT1lLmJvZHkubGVuZ3RoP2MoZS5ib2R5WzBdKTplOiJmb250Ij09PWUudHlwZT9jKGUuYm9keSk6ZSxoPW5ldyBTZXQoWyJtYXRob3JkIiwidGV4dG9yZCIsImF0b20iXSksbT1lPT5oLmhhcyhjKGUpLnR5cGUpLHU9e2Rpc3BsYXlNb2RlOnt0eXBlOiJib29sZWFuIixkZXNjcmlwdGlvbjoiUmVuZGVyIG1hdGggaW4gZGlzcGxheSBtb2RlLCB3aGljaCBwdXRzIHRoZSBtYXRoIGluIGRpc3BsYXkgc3R5bGUgKHNvIFxcaW50IGFuZCBcXHN1bSBhcmUgbGFyZ2UsIGZvciBleGFtcGxlKSwgYW5kIGNlbnRlcnMgdGhlIG1hdGggb24gdGhlIHBhZ2Ugb24gaXRzIG93biBsaW5lLiIsY2xpOiItZCwgLS1kaXNwbGF5LW1vZGUifSxvdXRwdXQ6e3R5cGU6e2VudW06WyJodG1sQW5kTWF0aG1sIiwiaHRtbCIsIm1hdGhtbCJdfSxkZXNjcmlwdGlvbjoiRGV0ZXJtaW5lcyB0aGUgbWFya3VwIGxhbmd1YWdlIG9mIHRoZSBvdXRwdXQuIixjbGk6Ii1GLCAtLWZvcm1hdCA8dHlwZT4ifSxsZXFubzp7dHlwZToiYm9vbGVhbiIsZGVzY3JpcHRpb246IlJlbmRlciBkaXNwbGF5IG1hdGggaW4gbGVxbm8gc3R5bGUgKGxlZnQtanVzdGlmaWVkIHRhZ3MpLiJ9LGZsZXFuOnt0eXBlOiJib29sZWFuIixkZXNjcmlwdGlvbjoiUmVuZGVyIGRpc3BsYXkgbWF0aCBmbHVzaCBsZWZ0LiJ9LHRocm93T25FcnJvcjp7dHlwZToiYm9vbGVhbiIsZGVmYXVsdDohMCxjbGk6Ii10LCAtLW5vLXRocm93LW9uLWVycm9yIixjbGlEZXNjcmlwdGlvbjoiUmVuZGVyIGVycm9ycyAoaW4gdGhlIGNvbG9yIGdpdmVuIGJ5IC0tZXJyb3ItY29sb3IpIGluc3RlYWQgb2YgdGhyb3dpbmcgYSBQYXJzZUVycm9yIGV4Y2VwdGlvbiB3aGVuIGVuY291bnRlcmluZyBhbiBlcnJvci4ifSxlcnJvckNvbG9yOnt0eXBlOiJzdHJpbmciLGRlZmF1bHQ6IiNjYzAwMDAiLGNsaToiLWMsIC0tZXJyb3ItY29sb3IgPGNvbG9yPiIsY2xpRGVzY3JpcHRpb246IkEgY29sb3Igc3RyaW5nIGdpdmVuIGluIHRoZSBmb3JtYXQgJ3JnYicgb3IgJ3JyZ2diYicgKG5vICMpLiBUaGlzIG9wdGlvbiBkZXRlcm1pbmVzIHRoZSBjb2xvciBvZiBlcnJvcnMgcmVuZGVyZWQgYnkgdGhlIC10IG9wdGlvbi4iLGNsaVByb2Nlc3NvcjplPT4iIyIrZX0sbWFjcm9zOnt0eXBlOiJvYmplY3QiLGNsaToiLW0sIC0tbWFjcm8gPGRlZj4iLGNsaURlc2NyaXB0aW9uOiJEZWZpbmUgY3VzdG9tIG1hY3JvIG9mIHRoZSBmb3JtICdcXGZvbzpleHBhbnNpb24nICh1c2UgbXVsdGlwbGUgLW0gYXJndW1lbnRzIGZvciBtdWx0aXBsZSBtYWNyb3MpLiIsY2xpRGVmYXVsdDpbXSxjbGlQcm9jZXNzb3I6KGUsdCk9Pih0LnB1c2goZSksdCl9LG1pblJ1bGVUaGlja25lc3M6e3R5cGU6Im51bWJlciIsZGVzY3JpcHRpb246IlNwZWNpZmllcyBhIG1pbmltdW0gdGhpY2tuZXNzLCBpbiBlbXMsIGZvciBmcmFjdGlvbiBsaW5lcywgYFxcc3FydGAgdG9wIGxpbmVzLCBge2FycmF5fWAgdmVydGljYWwgbGluZXMsIGBcXGhsaW5lYCwgYFxcaGRhc2hsaW5lYCwgYFxcdW5kZXJsaW5lYCwgYFxcb3ZlcmxpbmVgLCBhbmQgdGhlIGJvcmRlcnMgb2YgYFxcZmJveGAsIGBcXGJveGVkYCwgYW5kIGBcXGZjb2xvcmJveGAuIixwcm9jZXNzb3I6ZT0+TWF0aC5tYXgoMCxlKSxjbGk6Ii0tbWluLXJ1bGUtdGhpY2tuZXNzIDxzaXplPiIsY2xpUHJvY2Vzc29yOnBhcnNlRmxvYXR9LGNvbG9ySXNUZXh0Q29sb3I6e3R5cGU6ImJvb2xlYW4iLGRlc2NyaXB0aW9uOiJNYWtlcyBcXGNvbG9yIGJlaGF2ZSBsaWtlIExhVGVYJ3MgMi1hcmd1bWVudCBcXHRleHRjb2xvciwgaW5zdGVhZCBvZiBMYVRlWCdzIG9uZS1hcmd1bWVudCBcXGNvbG9yIG1vZGUgY2hhbmdlLiIsY2xpOiItYiwgLS1jb2xvci1pcy10ZXh0LWNvbG9yIn0sc3RyaWN0Ont0eXBlOlt7ZW51bTpbIndhcm4iLCJpZ25vcmUiLCJlcnJvciJdfSwiYm9vbGVhbiIsImZ1bmN0aW9uIl0sZGVzY3JpcHRpb246IlR1cm4gb24gc3RyaWN0IC8gTGFUZVggZmFpdGhmdWxuZXNzIG1vZGUsIHdoaWNoIHRocm93cyBhbiBlcnJvciBpZiB0aGUgaW5wdXQgdXNlcyBmZWF0dXJlcyB0aGF0IGFyZSBub3Qgc3VwcG9ydGVkIGJ5IExhVGVYLiIsY2xpOiItUywgLS1zdHJpY3QiLGNsaURlZmF1bHQ6ITF9LHRydXN0Ont0eXBlOlsiYm9vbGVhbiIsImZ1bmN0aW9uIl0sZGVzY3JpcHRpb246IlRydXN0IHRoZSBpbnB1dCwgZW5hYmxpbmcgYWxsIEhUTUwgZmVhdHVyZXMgc3VjaCBhcyBcXHVybC4iLGNsaToiLVQsIC0tdHJ1c3QifSxtYXhTaXplOnt0eXBlOiJudW1iZXIiLGRlZmF1bHQ6MS8wLGRlc2NyaXB0aW9uOiJJZiBub24temVybywgYWxsIHVzZXItc3BlY2lmaWVkIHNpemVzLCBlLmcuIGluIFxccnVsZXs1MDBlbX17NTAwZW19LCB3aWxsIGJlIGNhcHBlZCB0byBtYXhTaXplIGVtcy4gT3RoZXJ3aXNlLCBlbGVtZW50cyBhbmQgc3BhY2VzIGNhbiBiZSBhcmJpdHJhcmlseSBsYXJnZSIscHJvY2Vzc29yOmU9Pk1hdGgubWF4KDAsZSksY2xpOiItcywgLS1tYXgtc2l6ZSA8bj4iLGNsaVByb2Nlc3NvcjpwYXJzZUludH0sbWF4RXhwYW5kOnt0eXBlOiJudW1iZXIiLGRlZmF1bHQ6MWUzLGRlc2NyaXB0aW9uOiJMaW1pdCB0aGUgbnVtYmVyIG9mIG1hY3JvIGV4cGFuc2lvbnMgdG8gdGhlIHNwZWNpZmllZCBudW1iZXIsIHRvIHByZXZlbnQgZS5nLiBpbmZpbml0ZSBtYWNybyBsb29wcy4gSWYgc2V0IHRvIEluZmluaXR5LCB0aGUgbWFjcm8gZXhwYW5kZXIgd2lsbCB0cnkgdG8gZnVsbHkgZXhwYW5kIGFzIGluIExhVGVYLiIscHJvY2Vzc29yOmU9Pk1hdGgubWF4KDAsZSksY2xpOiItZSwgLS1tYXgtZXhwYW5kIDxuPiIsY2xpUHJvY2Vzc29yOmU9PiJJbmZpbml0eSI9PT1lPzEvMDpwYXJzZUludChlKX0sZ2xvYmFsR3JvdXA6e3R5cGU6ImJvb2xlYW4iLGNsaTohMX19O2Z1bmN0aW9uIHAoZSl7aWYodm9pZCAwIT09ZS5kZWZhdWx0KXJldHVybiBlLmRlZmF1bHQ7cmV0dXJuIGZ1bmN0aW9uKGUpe2lmKCJzdHJpbmciIT10eXBlb2YgZSlyZXR1cm4gZS5lbnVtWzBdO3N3aXRjaChlKXtjYXNlImJvb2xlYW4iOnJldHVybiExO2Nhc2Uic3RyaW5nIjpyZXR1cm4iIjtjYXNlIm51bWJlciI6cmV0dXJuIDA7Y2FzZSJvYmplY3QiOnJldHVybnt9O2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKCJVbmV4cGVjdGVkIHNjaGVtYSB0eXBlOyBzZXR0aW5ncyBtdXN0IGRlY2xhcmUgYW4gZXhwbGljaXQgZGVmYXVsdC4iKX19KEFycmF5LmlzQXJyYXkoZS50eXBlKT9lLnR5cGVbMF06ZS50eXBlKX1mdW5jdGlvbiBkKGUsdCxyLG4pe2NvbnN0IG89clt0XTtlW3RdPXZvaWQgMCE9PW8/bi5wcm9jZXNzb3I/bi5wcm9jZXNzb3Iobyk6bzpwKG4pfWNsYXNzIGd7Y29uc3RydWN0b3IoZSl7dm9pZCAwPT09ZSYmKGU9e30pLHRoaXMuZGlzcGxheU1vZGU9dm9pZCAwLHRoaXMub3V0cHV0PXZvaWQgMCx0aGlzLmxlcW5vPXZvaWQgMCx0aGlzLmZsZXFuPXZvaWQgMCx0aGlzLnRocm93T25FcnJvcj12b2lkIDAsdGhpcy5lcnJvckNvbG9yPXZvaWQgMCx0aGlzLm1hY3Jvcz12b2lkIDAsdGhpcy5taW5SdWxlVGhpY2tuZXNzPXZvaWQgMCx0aGlzLmNvbG9ySXNUZXh0Q29sb3I9dm9pZCAwLHRoaXMuc3RyaWN0PXZvaWQgMCx0aGlzLnRydXN0PXZvaWQgMCx0aGlzLm1heFNpemU9dm9pZCAwLHRoaXMubWF4RXhwYW5kPXZvaWQgMCx0aGlzLmdsb2JhbEdyb3VwPXZvaWQgMCxlPWV8fHt9O2Zvcihjb25zdCB0IG9mIE9iamVjdC5rZXlzKHUpKXtjb25zdCByPXVbdF07ciYmZCh0aGlzLHQsZSxyKX19cmVwb3J0Tm9uc3RyaWN0KGUsdCxyKXtsZXQgbz10aGlzLnN0cmljdDtpZigiZnVuY3Rpb24iPT10eXBlb2YgbyYmKG89byhlLHQscikpLG8mJiJpZ25vcmUiIT09byl7aWYoITA9PT1vfHwiZXJyb3IiPT09byl0aHJvdyBuZXcgbigiTGFUZVgtaW5jb21wYXRpYmxlIGlucHV0IGFuZCBzdHJpY3QgbW9kZSBpcyBzZXQgdG8gJ2Vycm9yJzogIit0KyIgWyIrZSsiXSIscik7Indhcm4iPT09bz8idW5kZWZpbmVkIiE9dHlwZW9mIGNvbnNvbGUmJmNvbnNvbGUud2FybigiTGFUZVgtaW5jb21wYXRpYmxlIGlucHV0IGFuZCBzdHJpY3QgbW9kZSBpcyBzZXQgdG8gJ3dhcm4nOiAiK3QrIiBbIitlKyJdIik6InVuZGVmaW5lZCIhPXR5cGVvZiBjb25zb2xlJiZjb25zb2xlLndhcm4oIkxhVGVYLWluY29tcGF0aWJsZSBpbnB1dCBhbmQgc3RyaWN0IG1vZGUgaXMgc2V0IHRvIHVucmVjb2duaXplZCAnIitvKyInOiAiK3QrIiBbIitlKyJdIil9fXVzZVN0cmljdEJlaGF2aW9yKGUsdCxyKXtsZXQgbj10aGlzLnN0cmljdDtpZigiZnVuY3Rpb24iPT10eXBlb2Ygbil0cnl7bj1uKGUsdCxyKX1jYXRjaChlKXtuPSJlcnJvciJ9cmV0dXJuISghbnx8Imlnbm9yZSI9PT1uKSYmKCEwPT09bnx8ImVycm9yIj09PW58fCgid2FybiI9PT1uPygidW5kZWZpbmVkIiE9dHlwZW9mIGNvbnNvbGUmJmNvbnNvbGUud2FybigiTGFUZVgtaW5jb21wYXRpYmxlIGlucHV0IGFuZCBzdHJpY3QgbW9kZSBpcyBzZXQgdG8gJ3dhcm4nOiAiK3QrIiBbIitlKyJdIiksITEpOigidW5kZWZpbmVkIiE9dHlwZW9mIGNvbnNvbGUmJmNvbnNvbGUud2FybigiTGFUZVgtaW5jb21wYXRpYmxlIGlucHV0IGFuZCBzdHJpY3QgbW9kZSBpcyBzZXQgdG8gdW5yZWNvZ25pemVkICciK24rIic6ICIrdCsiIFsiK2UrIl0iKSwhMSkpKX1pc1RydXN0ZWQoZSl7aWYoInVybCJpbiBlJiZlLnVybCYmIWUucHJvdG9jb2wpe2NvbnN0IHQ9KGU9Pntjb25zdCB0PS9eW1x4MDAtXHgyMF0qKFteXFwvIz9dKj8pKDp8JiMwKjU4fCYjeDAqM2F8JmNvbG9uKS9pLmV4ZWMoZSk7cmV0dXJuIHQ/IjoiIT09dFsyXT9udWxsOi9eW2EtekEtWl1bYS16QS1aMC05K1wtLl0qJC8udGVzdCh0WzFdKT90WzFdLnRvTG93ZXJDYXNlKCk6bnVsbDoiX3JlbGF0aXZlIn0pKGUudXJsKTtpZihudWxsPT10KXJldHVybiExO2UucHJvdG9jb2w9dH1jb25zdCB0PSJmdW5jdGlvbiI9PXR5cGVvZiB0aGlzLnRydXN0P3RoaXMudHJ1c3QoZSk6dGhpcy50cnVzdDtyZXR1cm4gQm9vbGVhbih0KX19Y2xhc3MgZntjb25zdHJ1Y3RvcihlLHQscil7dGhpcy5pZD12b2lkIDAsdGhpcy5zaXplPXZvaWQgMCx0aGlzLmNyYW1wZWQ9dm9pZCAwLHRoaXMuaWQ9ZSx0aGlzLnNpemU9dCx0aGlzLmNyYW1wZWQ9cn1zdXAoKXtyZXR1cm4gYlt5W3RoaXMuaWRdXX1zdWIoKXtyZXR1cm4gYlt4W3RoaXMuaWRdXX1mcmFjTnVtKCl7cmV0dXJuIGJbd1t0aGlzLmlkXV19ZnJhY0Rlbigpe3JldHVybiBiW3ZbdGhpcy5pZF1dfWNyYW1wKCl7cmV0dXJuIGJba1t0aGlzLmlkXV19dGV4dCgpe3JldHVybiBiW3pbdGhpcy5pZF1dfWlzVGlnaHQoKXtyZXR1cm4gdGhpcy5zaXplPj0yfX1jb25zdCBiPVtuZXcgZigwLDAsITEpLG5ldyBmKDEsMCwhMCksbmV3IGYoMiwxLCExKSxuZXcgZigzLDEsITApLG5ldyBmKDQsMiwhMSksbmV3IGYoNSwyLCEwKSxuZXcgZig2LDMsITEpLG5ldyBmKDcsMywhMCldLHk9WzQsNSw0LDUsNiw3LDYsN10seD1bNSw1LDUsNSw3LDcsNyw3XSx3PVsyLDMsNCw1LDYsNyw2LDddLHY9WzMsMyw1LDUsNyw3LDcsN10saz1bMSwxLDMsMyw1LDUsNyw3XSx6PVswLDEsMiwzLDIsMywyLDNdO3ZhciBTPXtESVNQTEFZOmJbMF0sVEVYVDpiWzJdLFNDUklQVDpiWzRdLFNDUklQVFNDUklQVDpiWzZdfTtjb25zdCBNPVt7bmFtZToibGF0aW4iLGJsb2NrczpbWzI1Niw1OTFdLFs3NjgsODc5XV19LHtuYW1lOiJjeXJpbGxpYyIsYmxvY2tzOltbMTAyNCwxMjc5XV19LHtuYW1lOiJhcm1lbmlhbiIsYmxvY2tzOltbMTMyOCwxNDIzXV19LHtuYW1lOiJicmFobWljIixibG9ja3M6W1syMzA0LDQyNTVdXX0se25hbWU6Imdlb3JnaWFuIixibG9ja3M6W1s0MjU2LDQzNTFdXX0se25hbWU6ImNqayIsYmxvY2tzOltbMTIyODgsMTI1NDNdLFsxOTk2OCw0MDg3OV0sWzY1MjgwLDY1Mzc2XV19LHtuYW1lOiJoYW5ndWwiLGJsb2NrczpbWzQ0MDMyLDU1MjE1XV19XTtjb25zdCBBPVtdO2Z1bmN0aW9uIFQoZSl7Zm9yKGxldCB0PTA7dDxBLmxlbmd0aDt0Kz0yKWlmKGU+PUFbdF0mJmU8PUFbdCsxXSlyZXR1cm4hMDtyZXR1cm4hMX1NLmZvckVhY2goZT0+ZS5ibG9ja3MuZm9yRWFjaChlPT5BLnB1c2goLi4uZSkpKTtjb25zdCBDPWU9PmUrIiAiK2UsQj04MCxxPXtkb3VibGVsZWZ0YXJyb3c6Ik0yNjIgMTU3XG5sMTAtMTBjMzQtMzYgNjIuNy03NyA4Ni0xMjMgMy4zLTggNS0xMy4zIDUtMTYgMC01LjMtNi43LTgtMjAtOC03LjNcbiAwLTEyLjIuNS0xNC41IDEuNS0yLjMgMS00LjggNC41LTcuNSAxMC41LTQ5LjMgOTcuMy0xMjEuNyAxNjkuMy0yMTcgMjE2LTI4XG4gMTQtNTcuMyAyNS04OCAzMy02LjcgMi0xMSAzLjgtMTMgNS41LTIgMS43LTMgNC4yLTMgNy41czEgNS44IDMgNy41XG5jMiAxLjcgNi4zIDMuNSAxMyA1LjUgNjggMTcuMyAxMjguMiA0Ny44IDE4MC41IDkxLjUgNTIuMyA0My43IDkzLjggOTYuMiAxMjQuNVxuIDE1Ny41IDkuMyA4IDE1LjMgMTIuMyAxOCAxM2g2YzEyLS43IDE4LTQgMTgtMTAgMC0yLTEuNy03LTUtMTUtMjMuMy00Ni01Mi04N1xuLTg2LTEyM2wtMTAtMTBoMzk5NzM4di00MEgyMThjMzI4IDAgMCAwIDAgMGwtMTAtOGMtMjYuNy0yMC02NS43LTQzLTExNy02OSAyLjdcbi0yIDYtMy43IDEwLTUgMzYuNy0xNiA3Mi4zLTM3LjMgMTA3LTY0bDEwLThoMzk5Nzgydi00MHpcbm04IDB2NDBoMzk5NzMwdi00MHptMCAxOTR2NDBoMzk5NzMwdi00MHoiLGRvdWJsZXJpZ2h0YXJyb3c6Ik0zOTk3MzggMzkybFxuLTEwIDEwYy0zNCAzNi02Mi43IDc3LTg2IDEyMy0zLjMgOC01IDEzLjMtNSAxNiAwIDUuMyA2LjcgOCAyMCA4IDcuMyAwIDEyLjItLjVcbiAxNC41LTEuNSAyLjMtMSA0LjgtNC41IDcuNS0xMC41IDQ5LjMtOTcuMyAxMjEuNy0xNjkuMyAyMTctMjE2IDI4LTE0IDU3LjMtMjUgODhcbi0zMyA2LjctMiAxMS0zLjggMTMtNS41IDItMS43IDMtNC4yIDMtNy41cy0xLTUuOC0zLTcuNWMtMi0xLjctNi4zLTMuNS0xMy01LjUtNjhcbi0xNy4zLTEyOC4yLTQ3LjgtMTgwLjUtOTEuNS01Mi4zLTQzLjctOTMuOC05Ni4yLTEyNC41LTE1Ny41LTkuMy04LTE1LjMtMTIuMy0xOFxuLTEzaC02Yy0xMiAuNy0xOCA0LTE4IDEwIDAgMiAxLjcgNyA1IDE1IDIzLjMgNDYgNTIgODcgODYgMTIzbDEwIDEwSDB2NDBoMzk5NzgyXG5jLTMyOCAwIDAgMCAwIDBsMTAgOGMyNi43IDIwIDY1LjcgNDMgMTE3IDY5LTIuNyAyLTYgMy43LTEwIDUtMzYuNyAxNi03Mi4zIDM3LjNcbi0xMDcgNjRsLTEwIDhIMHY0MHpNMCAxNTd2NDBoMzk5NzMwdi00MHptMCAxOTR2NDBoMzk5NzMwdi00MHoiLGxlZnRhcnJvdzoiTTQwMDAwMCAyNDFIMTEwbDMtM2M2OC43LTUyLjcgMTEzLjctMTIwXG4gMTM1LTIwMiA0LTE0LjcgNi0yMyA2LTI1IDAtNy4zLTctMTEtMjEtMTEtOCAwLTEzLjIuOC0xNS41IDIuNS0yLjMgMS43LTQuMiA1Ljhcbi01LjUgMTIuNS0xLjMgNC43LTIuNyAxMC4zLTQgMTctMTIgNDguNy0zNC44IDkyLTY4LjUgMTMwUzY1LjMgMjI4LjMgMTggMjQ3XG5jLTEwIDQtMTYgNy43LTE4IDExIDAgOC43IDYgMTQuMyAxOCAxNyA0Ny4zIDE4LjcgODcuOCA0NyAxMjEuNSA4NVMxOTYgNDQxLjMgMjA4XG4gNDkwYy43IDIgMS4zIDUgMiA5czEuMiA2LjcgMS41IDhjLjMgMS4zIDEgMy4zIDIgNnMyLjIgNC41IDMuNSA1LjVjMS4zIDEgMy4zXG4gMS44IDYgMi41czYgMSAxMCAxYzE0IDAgMjEtMy43IDIxLTExIDAtMi0yLTEwLjMtNi0yNS0yMC03OS4zLTY1LTE0Ni43LTEzNS0yMDJcbiBsLTMtM2gzOTk4OTB6TTEwMCAyNDF2NDBoMzk5OTAwdi00MHoiLGxlZnRicmFjZToiTTYgNTQ4bC02LTZ2LTM1bDYtMTFjNTYtMTA0IDEzNS4zLTE4MS4zIDIzOC0yMzIgNTcuMy0yOC43IDExN1xuLTQ1IDE3OS01MGgzOTk1Nzd2MTIwSDQwM2MtNDMuMyA3LTgxIDE1LTExMyAyNi0xMDAuNyAzMy0xNzkuNyA5MS0yMzcgMTc0LTIuN1xuIDUtNiA5LTEwIDEzLS43IDEtNy4zIDEtMjAgMUg2eiIsbGVmdGJyYWNldW5kZXI6Ik0wIDZsNi02aDE3YzEyLjY4OCAwIDE5LjMxMy4zIDIwIDEgNCA0IDcuMzEzIDguMyAxMCAxM1xuIDM1LjMxMyA1MS4zIDgwLjgxMyA5My44IDEzNi41IDEyNy41IDU1LjY4OCAzMy43IDExNy4xODggNTUuOCAxODQuNSA2Ni41LjY4OFxuIDAgMiAuMyA0IDEgMTguNjg4IDIuNyA3NiA0LjMgMTcyIDVoMzk5NDUwdjEyMEg0MjlsLTYtMWMtMTI0LjY4OC04LTIzNS02MS43XG4tMzMxLTE2MUM2MC42ODcgMTM4LjcgMzIuMzEyIDk5LjMgNyA1NEwwIDQxVjZ6IixsZWZ0Z3JvdXA6Ik00MDAwMDAgODBcbkg0MzVDNjQgODAgMTY4LjMgMjI5LjQgMjEgMjYwYy01LjkgMS4yLTE4IDAtMTggMC0yIDAtMy0xLTMtM3YtMzhDNzYgNjEgMjU3IDBcbiA0MzUgMGgzOTk1NjV6IixsZWZ0Z3JvdXB1bmRlcjoiTTQwMDAwMCAyNjJcbkg0MzVDNjQgMjYyIDE2OC4zIDExMi42IDIxIDgyYy01LjktMS4yLTE4IDAtMTggMC0yIDAtMyAxLTMgM3YzOGM3NiAxNTggMjU3IDIxOVxuIDQzNSAyMTloMzk5NTY1eiIsbGVmdGhhcnBvb246Ik0wIDI2N2MuNyA1LjMgMyAxMCA3IDE0aDM5OTk5M3YtNDBIOTNjMy4zXG4tMy4zIDEwLjItOS41IDIwLjUtMTguNXMxNy44LTE1LjggMjIuNS0yMC41YzUwLjctNTIgODgtMTEwLjMgMTEyLTE3NSA0LTExLjMgNVxuLTE4LjMgMy0yMS0xLjMtNC03LjMtNi0xOC02LTggMC0xMyAuNy0xNSAycy00LjcgNi43LTggMTZjLTQyIDk4LjctMTA3LjMgMTc0Ljdcbi0xOTYgMjI4LTYuNyA0LjctMTAuNyA4LTEyIDEwLTEuMyAyLTIgNS43LTIgMTF6bTEwMC0yNnY0MGgzOTk5MDB2LTQweiIsbGVmdGhhcnBvb25wbHVzOiJNMCAyNjdjLjcgNS4zIDMgMTAgNyAxNGgzOTk5OTN2LTQwSDkzYzMuMy0zLjMgMTAuMi05LjVcbiAyMC41LTE4LjVzMTcuOC0xNS44IDIyLjUtMjAuNWM1MC43LTUyIDg4LTExMC4zIDExMi0xNzUgNC0xMS4zIDUtMTguMyAzLTIxLTEuM1xuLTQtNy4zLTYtMTgtNi04IDAtMTMgLjctMTUgMnMtNC43IDYuNy04IDE2Yy00MiA5OC43LTEwNy4zIDE3NC43LTE5NiAyMjgtNi43IDQuN1xuLTEwLjcgOC0xMiAxMC0xLjMgMi0yIDUuNy0yIDExem0xMDAtMjZ2NDBoMzk5OTAwdi00MHpNMCA0MzV2NDBoNDAwMDAwdi00MHpcbm0wIDB2NDBoNDAwMDAwdi00MHoiLGxlZnRoYXJwb29uZG93bjoiTTcgMjQxYy00IDQtNi4zMzMgOC42NjctNyAxNCAwIDUuMzMzLjY2NyA5IDIgMTFzNS4zMzNcbiA1LjMzMyAxMiAxMGM5MC42NjcgNTQgMTU2IDEzMCAxOTYgMjI4IDMuMzMzIDEwLjY2NyA2LjMzMyAxNi4zMzMgOSAxNyAyIC42NjcgNVxuIDEgOSAxaDVjMTAuNjY3IDAgMTYuNjY3LTIgMTgtNiAyLTIuNjY3IDEtOS42NjctMy0yMS0zMi04Ny4zMzMtODIuNjY3LTE1Ny42Njdcbi0xNTItMjExbC0zLTNoMzk5OTA3di00MHpNOTMgMjgxIEg0MDAwMDAgdi00MEw3IDI0MXoiLGxlZnRoYXJwb29uZG93bnBsdXM6Ik03IDQzNWMtNCA0LTYuMyA4LjctNyAxNCAwIDUuMy43IDkgMiAxMXM1LjMgNS4zIDEyXG4gMTBjOTAuNyA1NCAxNTYgMTMwIDE5NiAyMjggMy4zIDEwLjcgNi4zIDE2LjMgOSAxNyAyIC43IDUgMSA5IDFoNWMxMC43IDAgMTYuN1xuLTIgMTgtNiAyLTIuNyAxLTkuNy0zLTIxLTMyLTg3LjMtODIuNy0xNTcuNy0xNTItMjExbC0zLTNoMzk5OTA3di00MEg3em05MyAwXG52NDBoMzk5OTAwdi00MHpNMCAyNDF2NDBoMzk5OTAwdi00MHptMCAwdjQwaDM5OTkwMHYtNDB6IixsZWZ0aG9vazoiTTQwMDAwMCAyODEgSDEwM3MtMzMtMTEuMi02MS0zMy41UzAgMTk3LjMgMCAxNjRzMTQuMi02MS4yIDQyLjVcbi04My41QzcwLjggNTguMiAxMDQgNDcgMTQyIDQ3IGMxNi43IDAgMjUgNi43IDI1IDIwIDAgMTItOC43IDE4LjctMjYgMjAtNDAgMy4zXG4tNjguNyAxNS43LTg2IDM3LTEwIDEyLTE1IDI1LjMtMTUgNDAgMCAyMi43IDkuOCA0MC43IDI5LjUgNTQgMTkuNyAxMy4zIDQzLjUgMjFcbiA3MS41IDIzaDM5OTg1OXpNMTAzIDI4MXYtNDBoMzk5ODk3djQweiIsbGVmdGxpbmVzZWdtZW50OkMoIk00MCAyODEgVjQyOCBIMCBWOTQgSDQwIFYyNDEgSDQwMDAwMCB2NDB6IiksbGVmdGJyYWNrZXR1bmRlcjpDKCJNMCAwIGgxMjAgVjI5MCBIMzk5OTk1IHYxMjAgSDB6IiksbGVmdGJyYWNrZXRvdmVyOkMoIk0wIDQ0MCBoMTIwIFYxNTAgSDM5OTk5NSB2LTEyMCBIMHoiKSxsZWZ0bWFwc3RvOkMoIk00MCAyODEgVjQ0OEgwVjc0SDQwVjI0MUg0MDAwMDB2NDB6IiksbGVmdFRvRnJvbToiTTAgMTQ3aDQwMDAwMHY0MEgwem0wIDIxNGM2OCA0MCAxMTUuNyA5NS43IDE0MyAxNjdoMjJjMTUuMyAwIDIzXG4tLjMgMjMtMSAwLTEuMy01LjMtMTMuNy0xNi0zNy0xOC0zNS4zLTQxLjMtNjktNzAtMTAxbC03LThoMzk5OTA1di00MEg5NWw3LThcbmMyOC43LTMyIDUyLTY1LjcgNzAtMTAxIDEwLjctMjMuMyAxNi0zNS43IDE2LTM3IDAtLjctNy43LTEtMjMtMWgtMjJDMTE1LjcgMjY1LjNcbiA2OCAzMjEgMCAzNjF6bTAtMTc0di00MGgzOTk5MDB2NDB6bTEwMCAxNTR2NDBoMzk5OTAwdi00MHoiLGxvbmdlcXVhbDpDKCJNMCA1MCBoNDAwMDAwIHY0MEgweiBtMCAxOTRoNDAwMDB2NDBIMHoiKSxtaWRicmFjZToiTTIwMDQyOCAzMzRcbmMtMTAwLjctOC4zLTE5NS4zLTQ0LTI4MC0xMDgtNTUuMy00Mi0xMDEuNy05My0xMzktMTUzbC05LTE0Yy0yLjcgNC01LjcgOC43LTkgMTRcbi01My4zIDg2LjctMTIzLjcgMTUzLTIxMSAxOTktNjYuNyAzNi0xMzcuMyA1Ni4zLTIxMiA2MkgwVjIxNGgxOTk1NjhjMTc4LjMtMTEuN1xuIDMxMS43LTc4LjMgNDAzLTIwMSA2LTggOS43LTEyIDExLTEyIC43LS43IDYuNy0xIDE4LTFzMTcuMy4zIDE4IDFjMS4zIDAgNSA0IDExXG4gMTIgNDQuNyA1OS4zIDEwMS4zIDEwNi4zIDE3MCAxNDFzMTQ1LjMgNTQuMyAyMjkgNjBoMTk5NTcydjEyMHoiLG1pZGJyYWNldW5kZXI6Ik0xOTk1NzIgMjE0XG5jMTAwLjcgOC4zIDE5NS4zIDQ0IDI4MCAxMDggNTUuMyA0MiAxMDEuNyA5MyAxMzkgMTUzbDkgMTRjMi43LTQgNS43LTguNyA5LTE0XG4gNTMuMy04Ni43IDEyMy43LTE1MyAyMTEtMTk5IDY2LjctMzYgMTM3LjMtNTYuMyAyMTItNjJoMTk5NTY4djEyMEgyMDA0MzJjLTE3OC4zXG4gMTEuNy0zMTEuNyA3OC4zLTQwMyAyMDEtNiA4LTkuNyAxMi0xMSAxMi0uNy43LTYuNyAxLTE4IDFzLTE3LjMtLjMtMTgtMWMtMS4zIDBcbi01LTQtMTEtMTItNDQuNy01OS4zLTEwMS4zLTEwNi4zLTE3MC0xNDFzLTE0NS4zLTU0LjMtMjI5LTYwSDBWMjE0eiIsb2lpbnRTaXplMToiTTUxMi42IDcxLjZjMjcyLjYgMCAzMjAuMyAxMDYuOCAzMjAuMyAxNzguMiAwIDcwLjgtNDcuNyAxNzcuNlxuLTMyMC4zIDE3Ny42UzE5My4xIDMyMC42IDE5My4xIDI0OS44YzAtNzEuNCA0Ni45LTE3OC4yIDMxOS41LTE3OC4yelxubTM2OC4xIDE3OC4yYzAtODYuNC02MC45LTIxNS40LTM2OC4xLTIxNS40LTMwNi40IDAtMzY3LjMgMTI5LTM2Ny4zIDIxNS40IDAgODUuOFxuNjAuOSAyMTQuOCAzNjcuMyAyMTQuOCAzMDcuMiAwIDM2OC4xLTEyOSAzNjguMS0yMTQuOHoiLG9paW50U2l6ZTI6Ik03NTcuOCAxMDAuMWMzODQuNyAwIDQ1MS4xIDEzNy42IDQ1MS4xIDIzMCAwIDkxLjMtNjYuNCAyMjguOFxuLTQ1MS4xIDIyOC44LTM4Ni4zIDAtNDUyLjctMTM3LjUtNDUyLjctMjI4LjggMC05Mi40IDY2LjQtMjMwIDQ1Mi43LTIzMHpcbm01MDIuNCAyMzBjMC0xMTEuMi04Mi40LTI3Ny4yLTUwMi40LTI3Ny4ycy01MDQgMTY2LTUwNCAyNzcuMlxuYzAgMTEwIDg0IDI3NiA1MDQgMjc2czUwMi40LTE2NiA1MDIuNC0yNzZ6IixvaWlpbnRTaXplMToiTTY4MS40IDcxLjZjNDA4LjkgMCA0ODAuNSAxMDYuOCA0ODAuNSAxNzguMiAwIDcwLjgtNzEuNiAxNzcuNlxuLTQ4MC41IDE3Ny42UzIwMi4xIDMyMC42IDIwMi4xIDI0OS44YzAtNzEuNCA3MC41LTE3OC4yIDQ3OS4zLTE3OC4yelxubTUyNS44IDE3OC4yYzAtODYuNC04Ni44LTIxNS40LTUyNS43LTIxNS40LTQzNy45IDAtNTI0LjcgMTI5LTUyNC43IDIxNS40IDBcbjg1LjggODYuOCAyMTQuOCA1MjQuNyAyMTQuOCA0MzguOSAwIDUyNS43LTEyOSA1MjUuNy0yMTQuOHoiLG9paWludFNpemUyOiJNMTAyMS4yIDUzYzYwMy42IDAgNzA3LjggMTY1LjggNzA3LjggMjc3LjIgMCAxMTAtMTA0LjIgMjc1Ljhcbi03MDcuOCAyNzUuOC02MDYgMC03MTAuMi0xNjUuOC03MTAuMi0yNzUuOEMzMTEgMjE4LjggNDE1LjIgNTMgMTAyMS4yIDUzelxubTc3MC40IDI3Ny4xYzAtMTMxLjItMTI2LjQtMzI3LjYtNzcwLjUtMzI3LjZTMjQ4LjQgMTk4LjkgMjQ4LjQgMzMwLjFcbmMwIDEzMCAxMjguOCAzMjYuNCA3NzIuNyAzMjYuNHM3NzAuNS0xOTYuNCA3NzAuNS0zMjYuNHoiLHJpZ2h0YXJyb3c6Ik0wIDI0MXY0MGgzOTk4OTFjLTQ3LjMgMzUuMy04NCA3OC0xMTAgMTI4XG4tMTYuNyAzMi0yNy43IDYzLjctMzMgOTUgMCAxLjMtLjIgMi43LS41IDQtLjMgMS4zLS41IDIuMy0uNSAzIDAgNy4zIDYuNyAxMSAyMFxuIDExIDggMCAxMy4yLS44IDE1LjUtMi41IDIuMy0xLjcgNC4yLTUuNSA1LjUtMTEuNSAyLTEzLjMgNS43LTI3IDExLTQxIDE0LjctNDQuN1xuIDM5LTg0LjUgNzMtMTE5LjVzNzMuNy02MC4yIDExOS03NS41YzYtMiA5LTUuNyA5LTExcy0zLTktOS0xMWMtNDUuMy0xNS4zLTg1XG4tNDAuNS0xMTktNzUuNXMtNTguMy03NC44LTczLTExOS41Yy00LjctMTQtOC4zLTI3LjMtMTEtNDAtMS4zLTYuNy0zLjItMTAuOC01LjVcbi0xMi41LTIuMy0xLjctNy41LTIuNS0xNS41LTIuNS0xNCAwLTIxIDMuNy0yMSAxMSAwIDIgMiAxMC4zIDYgMjUgMjAuNyA4My4zIDY3XG4gMTUxLjcgMTM5IDIwNXptMCAwdjQwaDM5OTkwMHYtNDB6IixyaWdodGJyYWNlOiJNNDAwMDAwIDU0Mmxcbi02IDZoLTE3Yy0xMi43IDAtMTkuMy0uMy0yMC0xLTQtNC03LjMtOC4zLTEwLTEzLTM1LjMtNTEuMy04MC44LTkzLjgtMTM2LjUtMTI3LjVcbnMtMTE3LjItNTUuOC0xODQuNS02Ni41Yy0uNyAwLTItLjMtNC0xLTE4LjctMi43LTc2LTQuMy0xNzItNUgwVjIxNGgzOTk1NzFsNiAxXG5jMTI0LjcgOCAyMzUgNjEuNyAzMzEgMTYxIDMxLjMgMzMuMyA1OS43IDcyLjcgODUgMTE4bDcgMTN2MzV6IixyaWdodGJyYWNldW5kZXI6Ik0zOTk5OTQgMGw2IDZ2MzVsLTYgMTFjLTU2IDEwNC0xMzUuMyAxODEuMy0yMzggMjMyLTU3LjNcbiAyOC43LTExNyA0NS0xNzkgNTBILTMwMFYyMTRoMzk5ODk3YzQzLjMtNyA4MS0xNSAxMTMtMjYgMTAwLjctMzMgMTc5LjctOTEgMjM3XG4tMTc0IDIuNy01IDYtOSAxMC0xMyAuNy0xIDcuMy0xIDIwLTFoMTd6IixyaWdodGdyb3VwOiJNMCA4MGgzOTk1NjVjMzcxIDAgMjY2LjcgMTQ5LjQgNDE0IDE4MCA1LjkgMS4yIDE4IDAgMTggMCAyIDBcbiAzLTEgMy0zdi0zOGMtNzYtMTU4LTI1Ny0yMTktNDM1LTIxOUgweiIscmlnaHRncm91cHVuZGVyOiJNMCAyNjJoMzk5NTY1YzM3MSAwIDI2Ni43LTE0OS40IDQxNC0xODAgNS45LTEuMiAxOCAwIDE4XG4gMCAyIDAgMyAxIDMgM3YzOGMtNzYgMTU4LTI1NyAyMTktNDM1IDIxOUgweiIscmlnaHRoYXJwb29uOiJNMCAyNDF2NDBoMzk5OTkzYzQuNy00LjcgNy05LjMgNy0xNCAwLTkuM1xuLTMuNy0xNS4zLTExLTE4LTkyLjctNTYuNy0xNTktMTMzLjctMTk5LTIzMS0zLjMtOS4zLTYtMTQuNy04LTE2LTItMS4zLTctMi0xNS0yXG4tMTAuNyAwLTE2LjcgMi0xOCA2LTIgMi43LTEgOS43IDMgMjEgMTUuMyA0MiAzNi43IDgxLjggNjQgMTE5LjUgMjcuMyAzNy43IDU4XG4gNjkuMiA5MiA5NC41em0wIDB2NDBoMzk5OTAwdi00MHoiLHJpZ2h0aGFycG9vbnBsdXM6Ik0wIDI0MXY0MGgzOTk5OTNjNC43LTQuNyA3LTkuMyA3LTE0IDAtOS4zLTMuNy0xNS4zLTExXG4tMTgtOTIuNy01Ni43LTE1OS0xMzMuNy0xOTktMjMxLTMuMy05LjMtNi0xNC43LTgtMTYtMi0xLjMtNy0yLTE1LTItMTAuNyAwLTE2LjdcbiAyLTE4IDYtMiAyLjctMSA5LjcgMyAyMSAxNS4zIDQyIDM2LjcgODEuOCA2NCAxMTkuNSAyNy4zIDM3LjcgNTggNjkuMiA5MiA5NC41elxubTAgMHY0MGgzOTk5MDB2LTQweiBtMTAwIDE5NHY0MGgzOTk5MDB2LTQwem0wIDB2NDBoMzk5OTAwdi00MHoiLHJpZ2h0aGFycG9vbmRvd246Ik0zOTk3NDcgNTExYzAgNy4zIDYuNyAxMSAyMCAxMSA4IDAgMTMtLjggMTUtMi41czQuNy02LjhcbiA4LTE1LjVjNDAtOTQgOTkuMy0xNjYuMyAxNzgtMjE3IDEzLjMtOCAyMC4zLTEyLjMgMjEtMTMgNS4zLTMuMyA4LjUtNS44IDkuNVxuLTcuNSAxLTEuNyAxLjUtNS4yIDEuNS0xMC41cy0yLjMtMTAuMy03LTE1SDB2NDBoMzk5OTA4Yy0zNCAyNS4zLTY0LjcgNTctOTIgOTVcbi0yNy4zIDM4LTQ4LjcgNzcuNy02NCAxMTktMy4zIDguNy01IDE0LTUgMTZ6TTAgMjQxdjQwaDM5OTkwMHYtNDB6IixyaWdodGhhcnBvb25kb3ducGx1czoiTTM5OTc0NyA3MDVjMCA3LjMgNi43IDExIDIwIDExIDggMCAxMy0uOFxuIDE1LTIuNXM0LjctNi44IDgtMTUuNWM0MC05NCA5OS4zLTE2Ni4zIDE3OC0yMTcgMTMuMy04IDIwLjMtMTIuMyAyMS0xMyA1LjMtMy4zXG4gOC41LTUuOCA5LjUtNy41IDEtMS43IDEuNS01LjIgMS41LTEwLjVzLTIuMy0xMC4zLTctMTVIMHY0MGgzOTk5MDhjLTM0IDI1LjNcbi02NC43IDU3LTkyIDk1LTI3LjMgMzgtNDguNyA3Ny43LTY0IDExOS0zLjMgOC43LTUgMTQtNSAxNnpNMCA0MzV2NDBoMzk5OTAwdi00MHpcbm0wLTE5NHY0MGg0MDAwMDB2LTQwem0wIDB2NDBoNDAwMDAwdi00MHoiLHJpZ2h0aG9vazoiTTM5OTg1OSAyNDFjLTc2NCAwIDAgMCAwIDAgNDAtMy4zIDY4LjctMTUuNyA4Ni0zNyAxMC0xMiAxNS0yNS4zXG4gMTUtNDAgMC0yMi43LTkuOC00MC43LTI5LjUtNTQtMTkuNy0xMy4zLTQzLjUtMjEtNzEuNS0yMy0xNy4zLTEuMy0yNi04LTI2LTIwIDBcbi0xMy4zIDguNy0yMCAyNi0yMCAzOCAwIDcxIDExLjIgOTkgMzMuNSAwIDAgNyA1LjYgMjEgMTYuNyAxNCAxMS4yIDIxIDMzLjUgMjFcbiA2Ni44cy0xNCA2MS4yLTQyIDgzLjVjLTI4IDIyLjMtNjEgMzMuNS05OSAzMy41TDAgMjQxeiBNMCAyODF2LTQwaDM5OTg1OXY0MHoiLHJpZ2h0bGluZXNlZ21lbnQ6QygiTTM5OTk2MCAyNDEgVjk0IGg0MCBWNDI4IGgtNDAgVjI4MSBIMCB2LTQweiIpLHJpZ2h0YnJhY2tldHVuZGVyOkMoIk0zOTk5OTUgMCBoLTEyMCBWMjkwIEgwIHYxMjAgSDQwMDAwMHoiKSxyaWdodGJyYWNrZXRvdmVyOkMoIk0zOTk5OTUgNDQwIGgtMTIwIFYxNTAgSDAgdi0xMjAgSDM5OTk5NXoiKSxyaWdodFRvRnJvbToiTTQwMDAwMCAxNjdjLTcwLjctNDItMTE4LTk3LjctMTQyLTE2N2gtMjNjLTE1LjMgMC0yMyAuMy0yM1xuIDEgMCAxLjMgNS4zIDEzLjcgMTYgMzcgMTggMzUuMyA0MS4zIDY5IDcwIDEwMWw3IDhIMHY0MGgzOTk5MDVsLTcgOGMtMjguNyAzMlxuLTUyIDY1LjctNzAgMTAxLTEwLjcgMjMuMy0xNiAzNS43LTE2IDM3IDAgLjcgNy43IDEgMjMgMWgyM2MyNC02OS4zIDcxLjMtMTI1IDE0MlxuLTE2N3ogTTEwMCAxNDd2NDBoMzk5OTAwdi00MHpNMCAzNDF2NDBoMzk5OTAwdi00MHoiLHR3b2hlYWRsZWZ0YXJyb3c6Ik0wIDE2N2M2OCA0MFxuIDExNS43IDk1LjcgMTQzIDE2N2gyMmMxNS4zIDAgMjMtLjMgMjMtMSAwLTEuMy01LjMtMTMuNy0xNi0zNy0xOC0zNS4zLTQxLjMtNjlcbi03MC0xMDFsLTctOGgxMjVsOSA3YzUwLjcgMzkuMyA4NSA4NiAxMDMgMTQwaDQ2YzAtNC43LTYuMy0xOC43LTE5LTQyLTE4LTM1LjNcbi00MC02Ny4zLTY2LTk2bC05LTloMzk5NzE2di00MEgyODRsOS05YzI2LTI4LjcgNDgtNjAuNyA2Ni05NiAxMi43LTIzLjMzMyAxOVxuLTM3LjMzMyAxOS00MmgtNDZjLTE4IDU0LTUyLjMgMTAwLjctMTAzIDE0MGwtOSA3SDk1bDctOGMyOC43LTMyIDUyLTY1LjcgNzAtMTAxXG4gMTAuNy0yMy4zMzMgMTYtMzUuNyAxNi0zNyAwLS43LTcuNy0xLTIzLTFoLTIyQzExNS43IDcxLjMgNjggMTI3IDAgMTY3eiIsdHdvaGVhZHJpZ2h0YXJyb3c6Ik00MDAwMDAgMTY3XG5jLTY4LTQwLTExNS43LTk1LjctMTQzLTE2N2gtMjJjLTE1LjMgMC0yMyAuMy0yMyAxIDAgMS4zIDUuMyAxMy43IDE2IDM3IDE4IDM1LjNcbiA0MS4zIDY5IDcwIDEwMWw3IDhoLTEyNWwtOS03Yy01MC43LTM5LjMtODUtODYtMTAzLTE0MGgtNDZjMCA0LjcgNi4zIDE4LjcgMTkgNDJcbiAxOCAzNS4zIDQwIDY3LjMgNjYgOTZsOSA5SDB2NDBoMzk5NzE2bC05IDljLTI2IDI4LjctNDggNjAuNy02NiA5Ni0xMi43IDIzLjMzM1xuLTE5IDM3LjMzMy0xOSA0Mmg0NmMxOC01NCA1Mi4zLTEwMC43IDEwMy0xNDBsOS03aDEyNWwtNyA4Yy0yOC43IDMyLTUyIDY1LjctNzBcbiAxMDEtMTAuNyAyMy4zMzMtMTYgMzUuNy0xNiAzNyAwIC43IDcuNyAxIDIzIDFoMjJjMjcuMy03MS4zIDc1LTEyNyAxNDMtMTY3eiIsdGlsZGUxOiJNMjAwIDU1LjUzOGMtNzcgMC0xNjggNzMuOTUzLTE3NyA3My45NTMtMyAwLTdcbi0yLjE3NS05LTUuNDM3TDIgOTdjLTEtMi0yLTQtMi02IDAtNCAyLTcgNS05bDIwLTEyQzExNiAxMiAxNzEgMCAyMDcgMGM4NiAwXG4gMTE0IDY4IDE5MSA2OCA3OCAwIDE2OC02OCAxNzctNjggNCAwIDcgMiA5IDVsMTIgMTljMSAyLjE3NSAyIDQuMzUgMiA2LjUyNSAwXG4gNC4zNS0yIDcuNjEzLTUgOS43ODhsLTE5IDEzLjA1Yy05MiA2My4wNzctMTE2LjkzNyA3NS4zMDgtMTgzIDc2LjEyOFxuLTY4LjI2Ny44NDctMTEzLTczLjk1Mi0xOTEtNzMuOTUyeiIsdGlsZGUyOiJNMzQ0IDU1LjI2NmMtMTQyIDAtMzAwLjYzOCA4MS4zMTYtMzExLjUgODYuNDE4XG4tOC4wMSAzLjc2Mi0yMi41IDEwLjkxLTIzLjUgNS41NjJMMSAxMjBjLTEtMi0xLTMtMS00IDAtNSAzLTkgOC0xMGwxOC40LTlDMTYwLjlcbiAzMS45IDI4MyAwIDM1OCAwYzE0OCAwIDE4OCAxMjIgMzMxIDEyMnMzMTQtOTcgMzI2LTk3YzQgMCA4IDIgMTAgN2w3IDIxLjExNFxuYzEgMi4xNCAxIDMuMjEgMSA0LjI4IDAgNS4zNDctMyA5LjYyNi03IDEwLjY5NmwtMjIuMyAxMi42MjJDODUyLjYgMTU4LjM3MiA3NTFcbiAxODEuNDc2IDY3NiAxODEuNDc2Yy0xNDkgMC0xODktMTI2LjIxLTMzMi0xMjYuMjF6Iix0aWxkZTM6Ik03ODYgNTlDNDU3IDU5IDMyIDE3NS4yNDIgMTMgMTc1LjI0MmMtNiAwLTEwLTMuNDU3XG4tMTEtMTAuMzdMLjE1IDEzOGMtMS03IDMtMTIgMTAtMTNsMTkuMi02LjRDMzc4LjQgNDAuNyA2MzQuMyAwIDgwNC4zIDBjMzM3IDBcbiA0MTEuOCAxNTcgNzQ2LjggMTU3IDMyOCAwIDc1NC0xMTIgNzczLTExMiA1IDAgMTAgMyAxMSA5bDEgMTQuMDc1YzEgOC4wNjYtLjY5N1xuIDE2LjU5NS02LjY5NyAxNy40OTJsLTIxLjA1MiA3LjMxYy0zNjcuOSA5OC4xNDYtNjA5LjE1IDEyMi42OTYtNzc4LjE1IDEyMi42OTZcbiAtMzM4IDAtNDA5LTE1Ni41NzMtNzQ0LTE1Ni41NzN6Iix0aWxkZTQ6Ik03ODYgNThDNDU3IDU4IDMyIDE3Ny40ODcgMTMgMTc3LjQ4N2MtNiAwLTEwLTMuMzQ1XG4tMTEtMTAuMDM1TC4xNSAxNDNjLTEtNyAzLTEyIDEwLTEzbDIyLTYuN0MzODEuMiAzNSA2MzcuMTUgMCA4MDcuMTUgMGMzMzcgMCA0MDlcbiAxNzcgNzQ0IDE3NyAzMjggMCA3NTQtMTI3IDc3My0xMjcgNSAwIDEwIDMgMTEgOWwxIDE0Ljc5NGMxIDcuODA1LTMgMTMuMzgtOVxuIDE0LjQ5NWwtMjAuNyA1LjU3NGMtMzY2Ljg1IDk5Ljc5LTYwNy4zIDEzOS4zNzItNzc2LjMgMTM5LjM3Mi0zMzggMC00MDlcbiAtMTc1LjIzNi03NDQtMTc1LjIzNnoiLHZlYzoiTTM3NyAyMGMwLTUuMzMzIDEuODMzLTEwIDUuNS0xNFMzOTEgMCAzOTcgMGM0LjY2NyAwIDguNjY3IDEuNjY3IDEyIDVcbjMuMzMzIDIuNjY3IDYuNjY3IDkgMTAgMTkgNi42NjcgMjQuNjY3IDIwLjMzMyA0My42NjcgNDEgNTcgNy4zMzMgNC42NjcgMTFcbjEwLjY2NyAxMSAxOCAwIDYtMSAxMC0zIDEycy02LjY2NyA1LTE0IDljLTI4LjY2NyAxNC42NjctNTMuNjY3IDM1LjY2Ny03NSA2M1xuLTEuMzMzIDEuMzMzLTMuMTY3IDMuNS01LjUgNi41cy00IDQuODMzLTUgNS41Yy0xIC42NjctMi41IDEuMzMzLTQuNSAycy00LjMzMyAxXG4tNyAxYy00LjY2NyAwLTkuMTY3LTEuODMzLTEzLjUtNS41UzMzNyAxODQgMzM3IDE3OGMwLTEyLjY2NyAxNS42NjctMzIuMzMzIDQ3LTU5XG5IMjEzbC0xNzEtMWMtOC42NjctNi0xMy0xMi4zMzMtMTMtMTkgMC00LjY2NyA0LjMzMy0xMS4zMzMgMTMtMjBoMzU5XG5jLTE2LTI1LjMzMy0yNC00NS0yNC01OXoiLHdpZGVoYXQxOiJNNTI5IDBoNWw1MTkgMTE1YzUgMSA5IDUgOSAxMCAwIDEtMSAyLTEgM2wtNCAyMlxuYy0xIDUtNSA5LTExIDloLTJMNTMyIDY3IDE5IDE1OWgtMmMtNSAwLTktNC0xMS05bC01LTIyYy0xLTYgMi0xMiA4LTEzeiIsd2lkZWhhdDI6Ik0xMTgxIDBoMmwxMTcxIDE3NmM2IDAgMTAgNSAxMCAxMWwtMiAyM2MtMSA2LTUgMTBcbi0xMSAxMGgtMUwxMTgyIDY3IDE1IDIyMGgtMWMtNiAwLTEwLTQtMTEtMTBsLTItMjNjLTEtNiA0LTExIDEwLTExeiIsd2lkZWhhdDM6Ik0xMTgxIDBoMmwxMTcxIDIzNmM2IDAgMTAgNSAxMCAxMWwtMiAyM2MtMSA2LTUgMTBcbi0xMSAxMGgtMUwxMTgyIDY3IDE1IDI4MGgtMWMtNiAwLTEwLTQtMTEtMTBsLTItMjNjLTEtNiA0LTExIDEwLTExeiIsd2lkZWhhdDQ6Ik0xMTgxIDBoMmwxMTcxIDI5NmM2IDAgMTAgNSAxMCAxMWwtMiAyM2MtMSA2LTUgMTBcbi0xMSAxMGgtMUwxMTgyIDY3IDE1IDM0MGgtMWMtNiAwLTEwLTQtMTEtMTBsLTItMjNjLTEtNiA0LTExIDEwLTExeiIsd2lkZWNoZWNrMToiTTUyOSwxNTloNWw1MTksLTExNWM1LC0xLDksLTUsOSwtMTBjMCwtMSwtMSwtMiwtMSwtM2wtNCwtMjJjLTEsXG4tNSwtNSwtOSwtMTEsLTloLTJsLTUxMiw5MmwtNTEzLC05MmgtMmMtNSwwLC05LDQsLTExLDlsLTUsMjJjLTEsNiwyLDEyLDgsMTN6Iix3aWRlY2hlY2syOiJNMTE4MSwyMjBoMmwxMTcxLC0xNzZjNiwwLDEwLC01LDEwLC0xMWwtMiwtMjNjLTEsLTYsLTUsLTEwLFxuLTExLC0xMGgtMWwtMTE2OCwxNTNsLTExNjcsLTE1M2gtMWMtNiwwLC0xMCw0LC0xMSwxMGwtMiwyM2MtMSw2LDQsMTEsMTAsMTF6Iix3aWRlY2hlY2szOiJNMTE4MSwyODBoMmwxMTcxLC0yMzZjNiwwLDEwLC01LDEwLC0xMWwtMiwtMjNjLTEsLTYsLTUsLTEwLFxuLTExLC0xMGgtMWwtMTE2OCwyMTNsLTExNjcsLTIxM2gtMWMtNiwwLC0xMCw0LC0xMSwxMGwtMiwyM2MtMSw2LDQsMTEsMTAsMTF6Iix3aWRlY2hlY2s0OiJNMTE4MSwzNDBoMmwxMTcxLC0yOTZjNiwwLDEwLC01LDEwLC0xMWwtMiwtMjNjLTEsLTYsLTUsLTEwLFxuLTExLC0xMGgtMWwtMTE2OCwyNzNsLTExNjcsLTI3M2gtMWMtNiwwLC0xMCw0LC0xMSwxMGwtMiwyM2MtMSw2LDQsMTEsMTAsMTF6IixiYXJhYm92ZWxlZnRhcnJvdzoiTTQwMDAwMCA2MjBoLTM5OTg5MGwzIC0zYzY4LjcgLTUyLjcgMTEzLjcgLTEyMCAxMzUgLTIwMlxuYzQgLTE0LjcgNiAtMjMgNiAtMjVjMCAtNy4zIC03IC0xMSAtMjEgLTExYy04IDAgLTEzLjIgMC44IC0xNS41IDIuNVxuYy0yLjMgMS43IC00LjIgNS44IC01LjUgMTIuNWMtMS4zIDQuNyAtMi43IDEwLjMgLTQgMTdjLTEyIDQ4LjcgLTM0LjggOTIgLTY4LjUgMTMwXG5zLTc0LjIgNjYuMyAtMTIxLjUgODVjLTEwIDQgLTE2IDcuNyAtMTggMTFjMCA4LjcgNiAxNC4zIDE4IDE3YzQ3LjMgMTguNyA4Ny44IDQ3XG4xMjEuNSA4NXM1Ni41IDgxLjMgNjguNSAxMzBjMC43IDIgMS4zIDUgMiA5czEuMiA2LjcgMS41IDhjMC4zIDEuMyAxIDMuMyAyIDZcbnMyLjIgNC41IDMuNSA1LjVjMS4zIDEgMy4zIDEuOCA2IDIuNXM2IDEgMTAgMWMxNCAwIDIxIC0zLjcgMjEgLTExXG5jMCAtMiAtMiAtMTAuMyAtNiAtMjVjLTIwIC03OS4zIC02NSAtMTQ2LjcgLTEzNSAtMjAybC0zIC0zaDM5OTg5MHpcbk0xMDAgNjIwdjQwaDM5OTkwMHYtNDB6IE0wIDI0MXY0MGgzOTk5MDB2LTQwek0wIDI0MXY0MGgzOTk5MDB2LTQweiIscmlnaHRhcnJvd2Fib3ZlYmFyOiJNMCAyNDF2NDBoMzk5ODkxYy00Ny4zIDM1LjMtODQgNzgtMTEwIDEyOC0xNi43IDMyXG4tMjcuNyA2My43LTMzIDk1IDAgMS4zLS4yIDIuNy0uNSA0LS4zIDEuMy0uNSAyLjMtLjUgMyAwIDcuMyA2LjcgMTEgMjAgMTEgOCAwXG4xMy4yLS44IDE1LjUtMi41IDIuMy0xLjcgNC4yLTUuNSA1LjUtMTEuNSAyLTEzLjMgNS43LTI3IDExLTQxIDE0LjctNDQuNyAzOVxuLTg0LjUgNzMtMTE5LjVzNzMuNy02MC4yIDExOS03NS41YzYtMiA5LTUuNyA5LTExcy0zLTktOS0xMWMtNDUuMy0xNS4zLTg1LTQwLjVcbi0xMTktNzUuNXMtNTguMy03NC44LTczLTExOS41Yy00LjctMTQtOC4zLTI3LjMtMTEtNDAtMS4zLTYuNy0zLjItMTAuOC01LjVcbi0xMi41LTIuMy0xLjctNy41LTIuNS0xNS41LTIuNS0xNCAwLTIxIDMuNy0yMSAxMSAwIDIgMiAxMC4zIDYgMjUgMjAuNyA4My4zIDY3XG4xNTEuNyAxMzkgMjA1em05NiAzNzloMzk5ODk0djQwSDB6bTAgMGgzOTk5MDR2NDBIMHoiLGJhcmFib3Zlc2hvcnRsZWZ0aGFycG9vbjoiTTUwNyw0MzVjLTQsNCwtNi4zLDguNywtNywxNGMwLDUuMywwLjcsOSwyLDExXG5jMS4zLDIsNS4zLDUuMywxMiwxMGM5MC43LDU0LDE1NiwxMzAsMTk2LDIyOGMzLjMsMTAuNyw2LjMsMTYuMyw5LDE3XG5jMiwwLjcsNSwxLDksMWMwLDAsNSwwLDUsMGMxMC43LDAsMTYuNywtMiwxOCwtNmMyLC0yLjcsMSwtOS43LC0zLC0yMVxuYy0zMiwtODcuMywtODIuNywtMTU3LjcsLTE1MiwtMjExYzAsMCwtMywtMywtMywtM2wzOTkzNTEsMGwwLC00MFxuYy0zOTg1NzAsMCwtMzk5NDM3LDAsLTM5OTQzNywweiBNNTkzIDQzNSB2NDAgSDM5OTUwMCB2LTQwelxuTTAgMjgxIHYtNDAgSDM5OTkwOCB2NDB6IE0wIDI4MSB2LTQwIEgzOTk5MDggdjQweiIscmlnaHRoYXJwb29uYWJvdmVzaG9ydGJhcjoiTTAsMjQxIGwwLDQwYzM5OTEyNiwwLDM5OTk5MywwLDM5OTk5MywwXG5jNC43LC00LjcsNywtOS4zLDcsLTE0YzAsLTkuMywtMy43LC0xNS4zLC0xMSwtMThjLTkyLjcsLTU2LjcsLTE1OSwtMTMzLjcsLTE5OSxcbi0yMzFjLTMuMywtOS4zLC02LC0xNC43LC04LC0xNmMtMiwtMS4zLC03LC0yLC0xNSwtMmMtMTAuNywwLC0xNi43LDIsLTE4LDZcbmMtMiwyLjcsLTEsOS43LDMsMjFjMTUuMyw0MiwzNi43LDgxLjgsNjQsMTE5LjVjMjcuMywzNy43LDU4LDY5LjIsOTIsOTQuNXpcbk0wIDI0MSB2NDAgSDM5OTkwOCB2LTQweiBNMCA0NzUgdi00MCBIMzk5NTAwIHY0MHogTTAgNDc1IHYtNDAgSDM5OTUwMCB2NDB6IixzaG9ydGJhcmFib3ZlbGVmdGhhcnBvb246Ik03LDQzNWMtNCw0LC02LjMsOC43LC03LDE0YzAsNS4zLDAuNyw5LDIsMTFcbmMxLjMsMiw1LjMsNS4zLDEyLDEwYzkwLjcsNTQsMTU2LDEzMCwxOTYsMjI4YzMuMywxMC43LDYuMywxNi4zLDksMTdjMiwwLjcsNSwxLDksXG4xYzAsMCw1LDAsNSwwYzEwLjcsMCwxNi43LC0yLDE4LC02YzIsLTIuNywxLC05LjcsLTMsLTIxYy0zMiwtODcuMywtODIuNywtMTU3LjcsXG4tMTUyLC0yMTFjMCwwLC0zLC0zLC0zLC0zbDM5OTkwNywwbDAsLTQwYy0zOTkxMjYsMCwtMzk5OTkzLDAsLTM5OTk5MywwelxuTTkzIDQzNSB2NDAgSDQwMDAwMCB2LTQweiBNNTAwIDI0MSB2NDAgSDQwMDAwMCB2LTQweiBNNTAwIDI0MSB2NDAgSDQwMDAwMCB2LTQweiIsc2hvcnRyaWdodGhhcnBvb25hYm92ZWJhcjoiTTUzLDI0MWwwLDQwYzM5ODU3MCwwLDM5OTQzNywwLDM5OTQzNywwXG5jNC43LC00LjcsNywtOS4zLDcsLTE0YzAsLTkuMywtMy43LC0xNS4zLC0xMSwtMThjLTkyLjcsLTU2LjcsLTE1OSwtMTMzLjcsLTE5OSxcbi0yMzFjLTMuMywtOS4zLC02LC0xNC43LC04LC0xNmMtMiwtMS4zLC03LC0yLC0xNSwtMmMtMTAuNywwLC0xNi43LDIsLTE4LDZcbmMtMiwyLjcsLTEsOS43LDMsMjFjMTUuMyw0MiwzNi43LDgxLjgsNjQsMTE5LjVjMjcuMywzNy43LDU4LDY5LjIsOTIsOTQuNXpcbk01MDAgMjQxIHY0MCBIMzk5NDA4IHYtNDB6IE01MDAgNDM1IHY0MCBINDAwMDAwIHYtNDB6In07Y2xhc3MgSXtjb25zdHJ1Y3RvcihlKXt0aGlzLmNoaWxkcmVuPXZvaWQgMCx0aGlzLmNsYXNzZXM9dm9pZCAwLHRoaXMuaGVpZ2h0PXZvaWQgMCx0aGlzLmRlcHRoPXZvaWQgMCx0aGlzLm1heEZvbnRTaXplPXZvaWQgMCx0aGlzLnN0eWxlPXZvaWQgMCx0aGlzLmNoaWxkcmVuPWUsdGhpcy5jbGFzc2VzPVtdLHRoaXMuaGVpZ2h0PTAsdGhpcy5kZXB0aD0wLHRoaXMubWF4Rm9udFNpemU9MCx0aGlzLnN0eWxlPXt9fWhhc0NsYXNzKGUpe3JldHVybiB0aGlzLmNsYXNzZXMuaW5jbHVkZXMoZSl9dG9Ob2RlKCl7Y29uc3QgZT1kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7Zm9yKGxldCB0PTA7dDx0aGlzLmNoaWxkcmVuLmxlbmd0aDt0KyspZS5hcHBlbmRDaGlsZCh0aGlzLmNoaWxkcmVuW3RdLnRvTm9kZSgpKTtyZXR1cm4gZX10b01hcmt1cCgpe2xldCBlPSIiO2ZvcihsZXQgdD0wO3Q8dGhpcy5jaGlsZHJlbi5sZW5ndGg7dCsrKWUrPXRoaXMuY2hpbGRyZW5bdF0udG9NYXJrdXAoKTtyZXR1cm4gZX10b1RleHQoKXtyZXR1cm4gdGhpcy5jaGlsZHJlbi5tYXAoZT0+e2lmKCJ0b1RleHQiaW4gZSlyZXR1cm4gZS50b1RleHQoKTt0aHJvdyBuZXcgRXJyb3IoIkV4cGVjdGVkIE1hdGhEb21Ob2RlIHdpdGggdG9UZXh0LCBnb3QgIitlLmNvbnN0cnVjdG9yLm5hbWUpfSkuam9pbigiIil9fWNvbnN0IFI9e3B0OjEsbW06NzIyNy8yNTQwLGNtOjcyMjcvMjU0LGluOjcyLjI3LGJwOjEuMDAzNzUscGM6MTIsZGQ6MTIzOC8xMTU3LGNjOjE0ODU2LzExNTcsbmQ6Njg1LzY0MixuYzoxMzcwLzEwNyxzcDoxLzY1NTM2LHB4OjEuMDAzNzV9LEg9e2V4OiEwLGVtOiEwLG11OiEwfSxFPWZ1bmN0aW9uKGUpe3JldHVybiJzdHJpbmciIT10eXBlb2YgZSYmKGU9ZS51bml0KSxlIGluIFJ8fGUgaW4gSHx8ImV4Ij09PWV9LE89ZnVuY3Rpb24oZSx0KXtsZXQgcjtpZihlLnVuaXQgaW4gUilyPVJbZS51bml0XS90LmZvbnRNZXRyaWNzKCkucHRQZXJFbS90LnNpemVNdWx0aXBsaWVyO2Vsc2UgaWYoIm11Ij09PWUudW5pdClyPXQuZm9udE1ldHJpY3MoKS5jc3NFbVBlck11O2Vsc2V7bGV0IG87aWYobz10LnN0eWxlLmlzVGlnaHQoKT90LmhhdmluZ1N0eWxlKHQuc3R5bGUudGV4dCgpKTp0LCJleCI9PT1lLnVuaXQpcj1vLmZvbnRNZXRyaWNzKCkueEhlaWdodDtlbHNle2lmKCJlbSIhPT1lLnVuaXQpdGhyb3cgbmV3IG4oIkludmFsaWQgdW5pdDogJyIrZS51bml0KyInIik7cj1vLmZvbnRNZXRyaWNzKCkucXVhZH1vIT09dCYmKHIqPW8uc2l6ZU11bHRpcGxpZXIvdC5zaXplTXVsdGlwbGllcil9cmV0dXJuIE1hdGgubWluKGUubnVtYmVyKnIsdC5tYXhTaXplKX0sTj1mdW5jdGlvbihlKXtyZXR1cm4rZS50b0ZpeGVkKDQpKyJlbSJ9LEQ9ZnVuY3Rpb24oZSl7cmV0dXJuIGUuZmlsdGVyKGU9PmUpLmpvaW4oIiAiKX0sTD1mdW5jdGlvbihlKXtsZXQgdD0iIjtmb3IoY29uc3QgciBvZiBPYmplY3Qua2V5cyhlKSl7Y29uc3Qgbj1lW3JdO3ZvaWQgMCE9PW4mJih0Kz1zKHIpKyI6IituKyI7Iil9cmV0dXJuIHR9LEY9ZnVuY3Rpb24oZSx0LHIpe2lmKHRoaXMuY2xhc3Nlcz1lfHxbXSx0aGlzLmF0dHJpYnV0ZXM9e30sdGhpcy5oZWlnaHQ9MCx0aGlzLmRlcHRoPTAsdGhpcy5tYXhGb250U2l6ZT0wLHRoaXMuc3R5bGU9cnx8e30sdCl7dC5zdHlsZS5pc1RpZ2h0KCkmJnRoaXMuY2xhc3Nlcy5wdXNoKCJtdGlnaHQiKTtjb25zdCBlPXQuZ2V0Q29sb3IoKTtlJiYodGhpcy5zdHlsZS5jb2xvcj1lKX19LFA9ZnVuY3Rpb24oZSl7Y29uc3QgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KGUpO3QuY2xhc3NOYW1lPUQodGhpcy5jbGFzc2VzKSxPYmplY3QuYXNzaWduKHQuc3R5bGUsdGhpcy5zdHlsZSk7Zm9yKGNvbnN0IGUgb2YgT2JqZWN0LmtleXModGhpcy5hdHRyaWJ1dGVzKSl0LnNldEF0dHJpYnV0ZShlLHRoaXMuYXR0cmlidXRlc1tlXSk7Zm9yKGxldCBlPTA7ZTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtlKyspdC5hcHBlbmRDaGlsZCh0aGlzLmNoaWxkcmVuW2VdLnRvTm9kZSgpKTtyZXR1cm4gdH0sVj0vW1xzIic+Lz1ceDAwLVx4MWZdLyxHPWZ1bmN0aW9uKGUpe2xldCB0PSI8IitlO3RoaXMuY2xhc3Nlcy5sZW5ndGgmJih0Kz0nIGNsYXNzPSInK2EoRCh0aGlzLmNsYXNzZXMpKSsnIicpO2NvbnN0IHI9TCh0aGlzLnN0eWxlKTtyJiYodCs9JyBzdHlsZT0iJythKHIpKyciJyk7Zm9yKGNvbnN0IGUgb2YgT2JqZWN0LmtleXModGhpcy5hdHRyaWJ1dGVzKSl7aWYoVi50ZXN0KGUpKXRocm93IG5ldyBuKCJJbnZhbGlkIGF0dHJpYnV0ZSBuYW1lICciK2UrIiciKTt0Kz0iICIrZSsnPSInK2EodGhpcy5hdHRyaWJ1dGVzW2VdKSsnIid9dCs9Ij4iO2ZvcihsZXQgZT0wO2U8dGhpcy5jaGlsZHJlbi5sZW5ndGg7ZSsrKXQrPXRoaXMuY2hpbGRyZW5bZV0udG9NYXJrdXAoKTtyZXR1cm4gdCs9IjwvIitlKyI+Iix0fTtjbGFzcyBVe2NvbnN0cnVjdG9yKGUsdCxyLG4pe3RoaXMuY2hpbGRyZW49dm9pZCAwLHRoaXMuYXR0cmlidXRlcz12b2lkIDAsdGhpcy5jbGFzc2VzPXZvaWQgMCx0aGlzLmhlaWdodD12b2lkIDAsdGhpcy5kZXB0aD12b2lkIDAsdGhpcy53aWR0aD12b2lkIDAsdGhpcy5tYXhGb250U2l6ZT12b2lkIDAsdGhpcy5zdHlsZT12b2lkIDAsdGhpcy5pdGFsaWM9dm9pZCAwLEYuY2FsbCh0aGlzLGUscixuKSx0aGlzLmNoaWxkcmVuPXR8fFtdfXNldEF0dHJpYnV0ZShlLHQpe3RoaXMuYXR0cmlidXRlc1tlXT10fWhhc0NsYXNzKGUpe3JldHVybiB0aGlzLmNsYXNzZXMuaW5jbHVkZXMoZSl9dG9Ob2RlKCl7cmV0dXJuIFAuY2FsbCh0aGlzLCJzcGFuIil9dG9NYXJrdXAoKXtyZXR1cm4gRy5jYWxsKHRoaXMsInNwYW4iKX19Y2xhc3Mgantjb25zdHJ1Y3RvcihlLHQscixuKXt0aGlzLmNoaWxkcmVuPXZvaWQgMCx0aGlzLmF0dHJpYnV0ZXM9dm9pZCAwLHRoaXMuY2xhc3Nlcz12b2lkIDAsdGhpcy5oZWlnaHQ9dm9pZCAwLHRoaXMuZGVwdGg9dm9pZCAwLHRoaXMubWF4Rm9udFNpemU9dm9pZCAwLHRoaXMuc3R5bGU9dm9pZCAwLEYuY2FsbCh0aGlzLHQsbiksdGhpcy5jaGlsZHJlbj1yfHxbXSx0aGlzLnNldEF0dHJpYnV0ZSgiaHJlZiIsZSl9c2V0QXR0cmlidXRlKGUsdCl7dGhpcy5hdHRyaWJ1dGVzW2VdPXR9aGFzQ2xhc3MoZSl7cmV0dXJuIHRoaXMuY2xhc3Nlcy5pbmNsdWRlcyhlKX10b05vZGUoKXtyZXR1cm4gUC5jYWxsKHRoaXMsImEiKX10b01hcmt1cCgpe3JldHVybiBHLmNhbGwodGhpcywiYSIpfX1jbGFzcyBYe2NvbnN0cnVjdG9yKGUsdCxyKXt0aGlzLnNyYz12b2lkIDAsdGhpcy5hbHQ9dm9pZCAwLHRoaXMuY2xhc3Nlcz12b2lkIDAsdGhpcy5oZWlnaHQ9dm9pZCAwLHRoaXMuZGVwdGg9dm9pZCAwLHRoaXMubWF4Rm9udFNpemU9dm9pZCAwLHRoaXMuc3R5bGU9dm9pZCAwLHRoaXMuYWx0PXQsdGhpcy5zcmM9ZSx0aGlzLmNsYXNzZXM9WyJtb3JkIl0sdGhpcy5oZWlnaHQ9MCx0aGlzLmRlcHRoPTAsdGhpcy5tYXhGb250U2l6ZT0wLHRoaXMuc3R5bGU9cn1oYXNDbGFzcyhlKXtyZXR1cm4gdGhpcy5jbGFzc2VzLmluY2x1ZGVzKGUpfXRvTm9kZSgpe2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiaW1nIik7cmV0dXJuIGUuc3JjPXRoaXMuc3JjLGUuYWx0PXRoaXMuYWx0LGUuY2xhc3NOYW1lPSJtb3JkIixPYmplY3QuYXNzaWduKGUuc3R5bGUsdGhpcy5zdHlsZSksZX10b01hcmt1cCgpe2xldCBlPSc8aW1nIHNyYz0iJythKHRoaXMuc3JjKSsnIiBhbHQ9IicrYSh0aGlzLmFsdCkrJyInO2NvbnN0IHQ9TCh0aGlzLnN0eWxlKTtyZXR1cm4gdCYmKGUrPScgc3R5bGU9IicrYSh0KSsnIicpLGUrPSInLz4iLGV9fWNvbnN0IFk9eyJceGVlIjoiXHUwMTMxXHUwMzAyIiwiXHhlZiI6Ilx1MDEzMVx1MDMwOCIsIlx4ZWQiOiJcdTAxMzFcdTAzMDEiLCJceGVjIjoiXHUwMTMxXHUwMzAwIn07Y2xhc3MgV3tjb25zdHJ1Y3RvcihlLHQscixuLG8scyxpLGwpe3RoaXMudGV4dD12b2lkIDAsdGhpcy5oZWlnaHQ9dm9pZCAwLHRoaXMuZGVwdGg9dm9pZCAwLHRoaXMuaXRhbGljPXZvaWQgMCx0aGlzLnNrZXc9dm9pZCAwLHRoaXMud2lkdGg9dm9pZCAwLHRoaXMubWF4Rm9udFNpemU9dm9pZCAwLHRoaXMuY2xhc3Nlcz12b2lkIDAsdGhpcy5zdHlsZT12b2lkIDAsdGhpcy50ZXh0PWUsdGhpcy5oZWlnaHQ9dHx8MCx0aGlzLmRlcHRoPXJ8fDAsdGhpcy5pdGFsaWM9bnx8MCx0aGlzLnNrZXc9b3x8MCx0aGlzLndpZHRoPXN8fDAsdGhpcy5jbGFzc2VzPWl8fFtdLHRoaXMuc3R5bGU9bHx8e30sdGhpcy5tYXhGb250U2l6ZT0wO2NvbnN0IGE9ZnVuY3Rpb24oZSl7Zm9yKGxldCB0PTA7dDxNLmxlbmd0aDt0Kyspe2NvbnN0IHI9TVt0XTtmb3IobGV0IHQ9MDt0PHIuYmxvY2tzLmxlbmd0aDt0Kyspe2NvbnN0IG49ci5ibG9ja3NbdF07aWYoZT49blswXSYmZTw9blsxXSlyZXR1cm4gci5uYW1lfX1yZXR1cm4gbnVsbH0odGhpcy50ZXh0LmNoYXJDb2RlQXQoMCkpO2EmJnRoaXMuY2xhc3Nlcy5wdXNoKGErIl9mYWxsYmFjayIpLC9bXHhlZVx4ZWZceGVkXHhlY10vLnRlc3QodGhpcy50ZXh0KSYmKHRoaXMudGV4dD1ZW3RoaXMudGV4dF0pfWhhc0NsYXNzKGUpe3JldHVybiB0aGlzLmNsYXNzZXMuaW5jbHVkZXMoZSl9dG9Ob2RlKCl7Y29uc3QgZT1kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLnRleHQpO2xldCB0PW51bGw7cmV0dXJuIHRoaXMuaXRhbGljPjAmJih0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNwYW4iKSx0LnN0eWxlLm1hcmdpblJpZ2h0PU4odGhpcy5pdGFsaWMpKSx0aGlzLmNsYXNzZXMubGVuZ3RoPjAmJih0PXR8fGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNwYW4iKSx0LmNsYXNzTmFtZT1EKHRoaXMuY2xhc3NlcykpLE9iamVjdC5rZXlzKHRoaXMuc3R5bGUpLmxlbmd0aD4wJiYodD10fHxkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJzcGFuIiksT2JqZWN0LmFzc2lnbih0LnN0eWxlLHRoaXMuc3R5bGUpKSx0Pyh0LmFwcGVuZENoaWxkKGUpLHQpOmV9dG9NYXJrdXAoKXtsZXQgZT0hMSx0PSI8c3BhbiI7dGhpcy5jbGFzc2VzLmxlbmd0aCYmKGU9ITAsdCs9JyBjbGFzcz0iJyx0Kz1hKEQodGhpcy5jbGFzc2VzKSksdCs9JyInKTtsZXQgcj0iIjt0aGlzLml0YWxpYz4wJiYocis9Im1hcmdpbi1yaWdodDoiK04odGhpcy5pdGFsaWMpKyI7Iikscis9TCh0aGlzLnN0eWxlKSxyJiYoZT0hMCx0Kz0nIHN0eWxlPSInK2EocikrJyInKTtjb25zdCBuPWEodGhpcy50ZXh0KTtyZXR1cm4gZT8odCs9Ij4iLHQrPW4sdCs9Ijwvc3Bhbj4iLHQpOm59fWNsYXNzIF97Y29uc3RydWN0b3IoZSx0KXt0aGlzLmNoaWxkcmVuPXZvaWQgMCx0aGlzLmF0dHJpYnV0ZXM9dm9pZCAwLHRoaXMuY2hpbGRyZW49ZXx8W10sdGhpcy5hdHRyaWJ1dGVzPXR8fHt9fXRvTm9kZSgpe2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIsInN2ZyIpO2Zvcihjb25zdCB0IG9mIE9iamVjdC5rZXlzKHRoaXMuYXR0cmlidXRlcykpZS5zZXRBdHRyaWJ1dGUodCx0aGlzLmF0dHJpYnV0ZXNbdF0pO2ZvcihsZXQgdD0wO3Q8dGhpcy5jaGlsZHJlbi5sZW5ndGg7dCsrKWUuYXBwZW5kQ2hpbGQodGhpcy5jaGlsZHJlblt0XS50b05vZGUoKSk7cmV0dXJuIGV9dG9NYXJrdXAoKXtsZXQgZT0nPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciJztmb3IoY29uc3QgdCBvZiBPYmplY3Qua2V5cyh0aGlzLmF0dHJpYnV0ZXMpKWUrPSIgIit0Kyc9IicrYSh0aGlzLmF0dHJpYnV0ZXNbdF0pKyciJztlKz0iPiI7Zm9yKGxldCB0PTA7dDx0aGlzLmNoaWxkcmVuLmxlbmd0aDt0KyspZSs9dGhpcy5jaGlsZHJlblt0XS50b01hcmt1cCgpO3JldHVybiBlKz0iPC9zdmc+IixlfX1jbGFzcyAke2NvbnN0cnVjdG9yKGUsdCl7dGhpcy5wYXRoTmFtZT12b2lkIDAsdGhpcy5hbHRlcm5hdGU9dm9pZCAwLHRoaXMucGF0aE5hbWU9ZSx0aGlzLmFsdGVybmF0ZT10fXRvTm9kZSgpe2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIsInBhdGgiKTtyZXR1cm4gdGhpcy5hbHRlcm5hdGU/ZS5zZXRBdHRyaWJ1dGUoImQiLHRoaXMuYWx0ZXJuYXRlKTplLnNldEF0dHJpYnV0ZSgiZCIscVt0aGlzLnBhdGhOYW1lXSksZX10b01hcmt1cCgpe3JldHVybiB0aGlzLmFsdGVybmF0ZT8nPHBhdGggZD0iJythKHRoaXMuYWx0ZXJuYXRlKSsnIi8+JzonPHBhdGggZD0iJythKHFbdGhpcy5wYXRoTmFtZV0pKyciLz4nfX1jbGFzcyBae2NvbnN0cnVjdG9yKGUpe3RoaXMuYXR0cmlidXRlcz12b2lkIDAsdGhpcy5hdHRyaWJ1dGVzPWV8fHt9fXRvTm9kZSgpe2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIsImxpbmUiKTtmb3IoY29uc3QgdCBvZiBPYmplY3Qua2V5cyh0aGlzLmF0dHJpYnV0ZXMpKWUuc2V0QXR0cmlidXRlKHQsdGhpcy5hdHRyaWJ1dGVzW3RdKTtyZXR1cm4gZX10b01hcmt1cCgpe2xldCBlPSI8bGluZSI7Zm9yKGNvbnN0IHQgb2YgT2JqZWN0LmtleXModGhpcy5hdHRyaWJ1dGVzKSllKz0iICIrdCsnPSInK2EodGhpcy5hdHRyaWJ1dGVzW3RdKSsnIic7cmV0dXJuIGUrPSIvPiIsZX19dmFyIEs9eyJBTVMtUmVndWxhciI6ezMyOlswLDAsMCwwLC4yNV0sNjU6WzAsLjY4ODg5LDAsMCwuNzIyMjJdLDY2OlswLC42ODg4OSwwLDAsLjY2NjY3XSw2NzpbMCwuNjg4ODksMCwwLC43MjIyMl0sNjg6WzAsLjY4ODg5LDAsMCwuNzIyMjJdLDY5OlswLC42ODg4OSwwLDAsLjY2NjY3XSw3MDpbMCwuNjg4ODksMCwwLC42MTExMV0sNzE6WzAsLjY4ODg5LDAsMCwuNzc3NzhdLDcyOlswLC42ODg4OSwwLDAsLjc3Nzc4XSw3MzpbMCwuNjg4ODksMCwwLC4zODg4OV0sNzQ6Wy4xNjY2NywuNjg4ODksMCwwLC41XSw3NTpbMCwuNjg4ODksMCwwLC43Nzc3OF0sNzY6WzAsLjY4ODg5LDAsMCwuNjY2NjddLDc3OlswLC42ODg4OSwwLDAsLjk0NDQ1XSw3ODpbMCwuNjg4ODksMCwwLC43MjIyMl0sNzk6Wy4xNjY2NywuNjg4ODksMCwwLC43Nzc3OF0sODA6WzAsLjY4ODg5LDAsMCwuNjExMTFdLDgxOlsuMTY2NjcsLjY4ODg5LDAsMCwuNzc3NzhdLDgyOlswLC42ODg4OSwwLDAsLjcyMjIyXSw4MzpbMCwuNjg4ODksMCwwLC41NTU1Nl0sODQ6WzAsLjY4ODg5LDAsMCwuNjY2NjddLDg1OlswLC42ODg4OSwwLDAsLjcyMjIyXSw4NjpbMCwuNjg4ODksMCwwLC43MjIyMl0sODc6WzAsLjY4ODg5LDAsMCwxXSw4ODpbMCwuNjg4ODksMCwwLC43MjIyMl0sODk6WzAsLjY4ODg5LDAsMCwuNzIyMjJdLDkwOlswLC42ODg4OSwwLDAsLjY2NjY3XSwxMDc6WzAsLjY4ODg5LDAsMCwuNTU1NTZdLDE2MDpbMCwwLDAsMCwuMjVdLDE2NTpbMCwuNjc1LC4wMjUsMCwuNzVdLDE3NDpbLjE1NTU5LC42OTIyNCwwLDAsLjk0NjY2XSwyNDA6WzAsLjY4ODg5LDAsMCwuNTU1NTZdLDI5NTpbMCwuNjg4ODksMCwwLC41NDAyOF0sNzEwOlswLC44MjUsMCwwLDIuMzMzMzRdLDczMjpbMCwuOSwwLDAsMi4zMzMzNF0sNzcwOlswLC44MjUsMCwwLDIuMzMzMzRdLDc3MTpbMCwuOSwwLDAsMi4zMzMzNF0sOTg5OlsuMDgxNjcsLjU4MTY3LDAsMCwuNzc3NzhdLDEwMDg6WzAsLjQzMDU2LC4wNDAyOCwwLC42NjY2N10sODI0NTpbMCwuNTQ5ODYsMCwwLC4yNzVdLDg0NjM6WzAsLjY4ODg5LDAsMCwuNTQwMjhdLDg0ODc6WzAsLjY4ODg5LDAsMCwuNzIyMjJdLDg0OTg6WzAsLjY4ODg5LDAsMCwuNTU1NTZdLDg1MDI6WzAsLjY4ODg5LDAsMCwuNjY2NjddLDg1MDM6WzAsLjY4ODg5LDAsMCwuNDQ0NDVdLDg1MDQ6WzAsLjY4ODg5LDAsMCwuNjY2NjddLDg1MTM6WzAsLjY4ODg5LDAsMCwuNjM4ODldLDg1OTI6Wy0uMDM1OTgsLjQ2NDAyLDAsMCwuNV0sODU5NDpbLS4wMzU5OCwuNDY0MDIsMCwwLC41XSw4NjAyOlstLjEzMzEzLC4zNjY4NywwLDAsMV0sODYwMzpbLS4xMzMxMywuMzY2ODcsMCwwLDFdLDg2MDY6Wy4wMTM1NCwuNTIyMzksMCwwLDFdLDg2MDg6Wy4wMTM1NCwuNTIyMzksMCwwLDFdLDg2MTA6Wy4wMTM1NCwuNTIyMzksMCwwLDEuMTExMTFdLDg2MTE6Wy4wMTM1NCwuNTIyMzksMCwwLDEuMTExMTFdLDg2MTk6WzAsLjU0OTg2LDAsMCwxXSw4NjIwOlswLC41NDk4NiwwLDAsMV0sODYyMTpbLS4xMzMxMywuMzc3ODgsMCwwLDEuMzg4ODldLDg2MjI6Wy0uMTMzMTMsLjM2Njg3LDAsMCwxXSw4NjI0OlswLC42OTIyNCwwLDAsLjVdLDg2MjU6WzAsLjY5MjI0LDAsMCwuNV0sODYzMDpbMCwuNDMwNTYsMCwwLDFdLDg2MzE6WzAsLjQzMDU2LDAsMCwxXSw4NjM0OlsuMDgxOTgsLjU4MTk4LDAsMCwuNzc3NzhdLDg2MzU6Wy4wODE5OCwuNTgxOTgsMCwwLC43Nzc3OF0sODYzODpbLjE5NDQ0LC42OTIyNCwwLDAsLjQxNjY3XSw4NjM5OlsuMTk0NDQsLjY5MjI0LDAsMCwuNDE2NjddLDg2NDI6Wy4xOTQ0NCwuNjkyMjQsMCwwLC40MTY2N10sODY0MzpbLjE5NDQ0LC42OTIyNCwwLDAsLjQxNjY3XSw4NjQ0OlsuMTgwOCwuNjc1LDAsMCwxXSw4NjQ2OlsuMTgwOCwuNjc1LDAsMCwxXSw4NjQ3OlsuMTgwOCwuNjc1LDAsMCwxXSw4NjQ4OlsuMTk0NDQsLjY5MjI0LDAsMCwuODMzMzRdLDg2NDk6Wy4xODA4LC42NzUsMCwwLDFdLDg2NTA6Wy4xOTQ0NCwuNjkyMjQsMCwwLC44MzMzNF0sODY1MTpbLjAxMzU0LC41MjIzOSwwLDAsMV0sODY1MjpbLjAxMzU0LC41MjIzOSwwLDAsMV0sODY1MzpbLS4xMzMxMywuMzY2ODcsMCwwLDFdLDg2NTQ6Wy0uMTMzMTMsLjM2Njg3LDAsMCwxXSw4NjU1OlstLjEzMzEzLC4zNjY4NywwLDAsMV0sODY2NjpbLjEzNjY3LC42MzY2NywwLDAsMV0sODY2NzpbLjEzNjY3LC42MzY2NywwLDAsMV0sODY2OTpbLS4xMzMxMywuMzc3ODgsMCwwLDFdLDg2NzI6Wy0uMDY0LC40MzcsMCwwLDEuMzM0XSw4Njc0OlstLjA2NCwuNDM3LDAsMCwxLjMzNF0sODcwNTpbMCwuODI1LDAsMCwuNV0sODcwODpbMCwuNjg4ODksMCwwLC41NTU1Nl0sODcwOTpbLjA4MTY3LC41ODE2NywwLDAsLjc3Nzc4XSw4NzE3OlswLC40MzA1NiwwLDAsLjQyOTE3XSw4NzIyOlstLjAzNTk4LC40NjQwMiwwLDAsLjVdLDg3MjQ6Wy4wODE5OCwuNjkyMjQsMCwwLC43Nzc3OF0sODcyNjpbLjA4MTY3LC41ODE2NywwLDAsLjc3Nzc4XSw4NzMzOlswLC42OTIyNCwwLDAsLjc3Nzc4XSw4NzM2OlswLC42OTIyNCwwLDAsLjcyMjIyXSw4NzM3OlswLC42OTIyNCwwLDAsLjcyMjIyXSw4NzM4OlsuMDM1MTcsLjUyMjM5LDAsMCwuNzIyMjJdLDg3Mzk6Wy4wODE2NywuNTgxNjcsMCwwLC4yMjIyMl0sODc0MDpbLjI1MTQyLC43NDExMSwwLDAsLjI3Nzc4XSw4NzQxOlsuMDgxNjcsLjU4MTY3LDAsMCwuMzg4ODldLDg3NDI6Wy4yNTE0MiwuNzQxMTEsMCwwLC41XSw4NzU2OlswLC42OTIyNCwwLDAsLjY2NjY3XSw4NzU3OlswLC42OTIyNCwwLDAsLjY2NjY3XSw4NzY0OlstLjEzMzEzLC4zNjY4NywwLDAsLjc3Nzc4XSw4NzY1OlstLjEzMzEzLC4zNzc4OCwwLDAsLjc3Nzc4XSw4NzY5OlstLjEzMzEzLC4zNjY4NywwLDAsLjc3Nzc4XSw4NzcwOlstLjAzNjI1LC40NjM3NSwwLDAsLjc3Nzc4XSw4Nzc0OlsuMzAyNzQsLjc5MzgzLDAsMCwuNzc3NzhdLDg3NzY6Wy0uMDE2ODgsLjQ4MzEyLDAsMCwuNzc3NzhdLDg3Nzg6Wy4wODE2NywuNTgxNjcsMCwwLC43Nzc3OF0sODc4MjpbLjA2MDYyLC41NDk4NiwwLDAsLjc3Nzc4XSw4NzgzOlsuMDYwNjIsLjU0OTg2LDAsMCwuNzc3NzhdLDg3ODU6Wy4wODE5OCwuNTgxOTgsMCwwLC43Nzc3OF0sODc4NjpbLjA4MTk4LC41ODE5OCwwLDAsLjc3Nzc4XSw4Nzg3OlsuMDgxOTgsLjU4MTk4LDAsMCwuNzc3NzhdLDg3OTA6WzAsLjY5MjI0LDAsMCwuNzc3NzhdLDg3OTE6Wy4yMjk1OCwuNzI5NTgsMCwwLC43Nzc3OF0sODc5NjpbLjA4MTk4LC45MTY2NywwLDAsLjc3Nzc4XSw4ODA2OlsuMjU1ODMsLjc1NTgzLDAsMCwuNzc3NzhdLDg4MDc6Wy4yNTU4MywuNzU1ODMsMCwwLC43Nzc3OF0sODgwODpbLjI1MTQyLC43NTcyNiwwLDAsLjc3Nzc4XSw4ODA5OlsuMjUxNDIsLjc1NzI2LDAsMCwuNzc3NzhdLDg4MTI6Wy4yNTU4MywuNzU1ODMsMCwwLC41XSw4ODE0OlsuMjA1NzYsLjcwNTc2LDAsMCwuNzc3NzhdLDg4MTU6Wy4yMDU3NiwuNzA1NzYsMCwwLC43Nzc3OF0sODgxNjpbLjMwMjc0LC43OTM4MywwLDAsLjc3Nzc4XSw4ODE3OlsuMzAyNzQsLjc5MzgzLDAsMCwuNzc3NzhdLDg4MTg6Wy4yMjk1OCwuNzI5NTgsMCwwLC43Nzc3OF0sODgxOTpbLjIyOTU4LC43Mjk1OCwwLDAsLjc3Nzc4XSw4ODIyOlsuMTgwOCwuNjc1LDAsMCwuNzc3NzhdLDg4MjM6Wy4xODA4LC42NzUsMCwwLC43Nzc3OF0sODgyODpbLjEzNjY3LC42MzY2NywwLDAsLjc3Nzc4XSw4ODI5OlsuMTM2NjcsLjYzNjY3LDAsMCwuNzc3NzhdLDg4MzA6Wy4yMjk1OCwuNzI5NTgsMCwwLC43Nzc3OF0sODgzMTpbLjIyOTU4LC43Mjk1OCwwLDAsLjc3Nzc4XSw4ODMyOlsuMjA1NzYsLjcwNTc2LDAsMCwuNzc3NzhdLDg4MzM6Wy4yMDU3NiwuNzA1NzYsMCwwLC43Nzc3OF0sODg0MDpbLjMwMjc0LC43OTM4MywwLDAsLjc3Nzc4XSw4ODQxOlsuMzAyNzQsLjc5MzgzLDAsMCwuNzc3NzhdLDg4NDI6Wy4xMzU5NywuNjM1OTcsMCwwLC43Nzc3OF0sODg0MzpbLjEzNTk3LC42MzU5NywwLDAsLjc3Nzc4XSw4ODQ3OlsuMDM1MTcsLjU0OTg2LDAsMCwuNzc3NzhdLDg4NDg6Wy4wMzUxNywuNTQ5ODYsMCwwLC43Nzc3OF0sODg1ODpbLjA4MTk4LC41ODE5OCwwLDAsLjc3Nzc4XSw4ODU5OlsuMDgxOTgsLjU4MTk4LDAsMCwuNzc3NzhdLDg4NjE6Wy4wODE5OCwuNTgxOTgsMCwwLC43Nzc3OF0sODg2MjpbMCwuNjc1LDAsMCwuNzc3NzhdLDg4NjM6WzAsLjY3NSwwLDAsLjc3Nzc4XSw4ODY0OlswLC42NzUsMCwwLC43Nzc3OF0sODg2NTpbMCwuNjc1LDAsMCwuNzc3NzhdLDg4NzI6WzAsLjY5MjI0LDAsMCwuNjExMTFdLDg4NzM6WzAsLjY5MjI0LDAsMCwuNzIyMjJdLDg4NzQ6WzAsLjY5MjI0LDAsMCwuODg4ODldLDg4NzY6WzAsLjY4ODg5LDAsMCwuNjExMTFdLDg4Nzc6WzAsLjY4ODg5LDAsMCwuNjExMTFdLDg4Nzg6WzAsLjY4ODg5LDAsMCwuNzIyMjJdLDg4Nzk6WzAsLjY4ODg5LDAsMCwuNzIyMjJdLDg4ODI6Wy4wMzUxNywuNTQ5ODYsMCwwLC43Nzc3OF0sODg4MzpbLjAzNTE3LC41NDk4NiwwLDAsLjc3Nzc4XSw4ODg0OlsuMTM2NjcsLjYzNjY3LDAsMCwuNzc3NzhdLDg4ODU6Wy4xMzY2NywuNjM2NjcsMCwwLC43Nzc3OF0sODg4ODpbMCwuNTQ5ODYsMCwwLDEuMTExMTFdLDg4OTA6Wy4xOTQ0NCwuNDMwNTYsMCwwLC41NTU1Nl0sODg5MTpbLjE5NDQ0LC42OTIyNCwwLDAsLjYxMTExXSw4ODkyOlsuMTk0NDQsLjY5MjI0LDAsMCwuNjExMTFdLDg5MDE6WzAsLjU0OTg2LDAsMCwuMjc3NzhdLDg5MDM6Wy4wODE2NywuNTgxNjcsMCwwLC43Nzc3OF0sODkwNTpbLjA4MTY3LC41ODE2NywwLDAsLjc3Nzc4XSw4OTA2OlsuMDgxNjcsLjU4MTY3LDAsMCwuNzc3NzhdLDg5MDc6WzAsLjY5MjI0LDAsMCwuNzc3NzhdLDg5MDg6WzAsLjY5MjI0LDAsMCwuNzc3NzhdLDg5MDk6Wy0uMDM1OTgsLjQ2NDAyLDAsMCwuNzc3NzhdLDg5MTA6WzAsLjU0OTg2LDAsMCwuNzYwNDJdLDg5MTE6WzAsLjU0OTg2LDAsMCwuNzYwNDJdLDg5MTI6Wy4wMzUxNywuNTQ5ODYsMCwwLC43Nzc3OF0sODkxMzpbLjAzNTE3LC41NDk4NiwwLDAsLjc3Nzc4XSw4OTE0OlswLC41NDk4NiwwLDAsLjY2NjY3XSw4OTE1OlswLC41NDk4NiwwLDAsLjY2NjY3XSw4OTE2OlswLC42OTIyNCwwLDAsLjY2NjY3XSw4OTE4OlsuMDM5MSwuNTM5MSwwLDAsLjc3Nzc4XSw4OTE5OlsuMDM5MSwuNTM5MSwwLDAsLjc3Nzc4XSw4OTIwOlsuMDM1MTcsLjU0OTg2LDAsMCwxLjMzMzM0XSw4OTIxOlsuMDM1MTcsLjU0OTg2LDAsMCwxLjMzMzM0XSw4OTIyOlsuMzg1NjksLjg4NTY5LDAsMCwuNzc3NzhdLDg5MjM6Wy4zODU2OSwuODg1NjksMCwwLC43Nzc3OF0sODkyNjpbLjEzNjY3LC42MzY2NywwLDAsLjc3Nzc4XSw4OTI3OlsuMTM2NjcsLjYzNjY3LDAsMCwuNzc3NzhdLDg5Mjg6Wy4zMDI3NCwuNzkzODMsMCwwLC43Nzc3OF0sODkyOTpbLjMwMjc0LC43OTM4MywwLDAsLjc3Nzc4XSw4OTM0OlsuMjMyMjIsLjc0MTExLDAsMCwuNzc3NzhdLDg5MzU6Wy4yMzIyMiwuNzQxMTEsMCwwLC43Nzc3OF0sODkzNjpbLjIzMjIyLC43NDExMSwwLDAsLjc3Nzc4XSw4OTM3OlsuMjMyMjIsLjc0MTExLDAsMCwuNzc3NzhdLDg5Mzg6Wy4yMDU3NiwuNzA1NzYsMCwwLC43Nzc3OF0sODkzOTpbLjIwNTc2LC43MDU3NiwwLDAsLjc3Nzc4XSw4OTQwOlsuMzAyNzQsLjc5MzgzLDAsMCwuNzc3NzhdLDg5NDE6Wy4zMDI3NCwuNzkzODMsMCwwLC43Nzc3OF0sODk5NDpbLjE5NDQ0LC42OTIyNCwwLDAsLjc3Nzc4XSw4OTk1OlsuMTk0NDQsLjY5MjI0LDAsMCwuNzc3NzhdLDk0MTY6Wy4xNTU1OSwuNjkyMjQsMCwwLC45MDIyMl0sOTQ4NDpbMCwuNjkyMjQsMCwwLC41XSw5NDg4OlswLC42OTIyNCwwLDAsLjVdLDk0OTI6WzAsLjM3Nzg4LDAsMCwuNV0sOTQ5NjpbMCwuMzc3ODgsMCwwLC41XSw5NTg1OlsuMTk0NDQsLjY4ODg5LDAsMCwuODg4ODldLDk1ODY6Wy4xOTQ0NCwuNzQxMTEsMCwwLC44ODg4OV0sOTYzMjpbMCwuNjc1LDAsMCwuNzc3NzhdLDk2MzM6WzAsLjY3NSwwLDAsLjc3Nzc4XSw5NjUwOlswLC41NDk4NiwwLDAsLjcyMjIyXSw5NjUxOlswLC41NDk4NiwwLDAsLjcyMjIyXSw5NjU0OlsuMDM1MTcsLjU0OTg2LDAsMCwuNzc3NzhdLDk2NjA6WzAsLjU0OTg2LDAsMCwuNzIyMjJdLDk2NjE6WzAsLjU0OTg2LDAsMCwuNzIyMjJdLDk2NjQ6Wy4wMzUxNywuNTQ5ODYsMCwwLC43Nzc3OF0sOTY3NDpbLjExMTExLC42OTIyNCwwLDAsLjY2NjY3XSw5NzMzOlsuMTk0NDQsLjY5MjI0LDAsMCwuOTQ0NDVdLDEwMDAzOlswLC42OTIyNCwwLDAsLjgzMzM0XSwxMDAxNjpbMCwuNjkyMjQsMCwwLC44MzMzNF0sMTA3MzE6Wy4xMTExMSwuNjkyMjQsMCwwLC42NjY2N10sMTA4NDY6Wy4xOTQ0NCwuNzU1ODMsMCwwLC42MTExMV0sMTA4Nzc6Wy4xMzY2NywuNjM2NjcsMCwwLC43Nzc3OF0sMTA4Nzg6Wy4xMzY2NywuNjM2NjcsMCwwLC43Nzc3OF0sMTA4ODU6Wy4yNTU4MywuNzU1ODMsMCwwLC43Nzc3OF0sMTA4ODY6Wy4yNTU4MywuNzU1ODMsMCwwLC43Nzc3OF0sMTA4ODc6Wy4xMzU5NywuNjM1OTcsMCwwLC43Nzc3OF0sMTA4ODg6Wy4xMzU5NywuNjM1OTcsMCwwLC43Nzc3OF0sMTA4ODk6Wy4yNjE2NywuNzU3MjYsMCwwLC43Nzc3OF0sMTA4OTA6Wy4yNjE2NywuNzU3MjYsMCwwLC43Nzc3OF0sMTA4OTE6Wy40ODI1NiwuOTgyNTYsMCwwLC43Nzc3OF0sMTA4OTI6Wy40ODI1NiwuOTgyNTYsMCwwLC43Nzc3OF0sMTA5MDE6Wy4xMzY2NywuNjM2NjcsMCwwLC43Nzc3OF0sMTA5MDI6Wy4xMzY2NywuNjM2NjcsMCwwLC43Nzc3OF0sMTA5MzM6Wy4yNTE0MiwuNzU3MjYsMCwwLC43Nzc3OF0sMTA5MzQ6Wy4yNTE0MiwuNzU3MjYsMCwwLC43Nzc3OF0sMTA5MzU6Wy4yNjE2NywuNzU3MjYsMCwwLC43Nzc3OF0sMTA5MzY6Wy4yNjE2NywuNzU3MjYsMCwwLC43Nzc3OF0sMTA5Mzc6Wy4yNjE2NywuNzU3MjYsMCwwLC43Nzc3OF0sMTA5Mzg6Wy4yNjE2NywuNzU3MjYsMCwwLC43Nzc3OF0sMTA5NDk6Wy4yNTU4MywuNzU1ODMsMCwwLC43Nzc3OF0sMTA5NTA6Wy4yNTU4MywuNzU1ODMsMCwwLC43Nzc3OF0sMTA5NTU6Wy4yODQ4MSwuNzkzODMsMCwwLC43Nzc3OF0sMTA5NTY6Wy4yODQ4MSwuNzkzODMsMCwwLC43Nzc3OF0sNTczNTA6Wy4wODE2NywuNTgxNjcsMCwwLC4yMjIyMl0sNTczNTE6Wy4wODE2NywuNTgxNjcsMCwwLC4zODg4OV0sNTczNTI6Wy4wODE2NywuNTgxNjcsMCwwLC43Nzc3OF0sNTczNTM6WzAsLjQzMDU2LC4wNDAyOCwwLC42NjY2N10sNTczNTY6Wy4yNTE0MiwuNzU3MjYsMCwwLC43Nzc3OF0sNTczNTc6Wy4yNTE0MiwuNzU3MjYsMCwwLC43Nzc3OF0sNTczNTg6Wy40MTk1MSwuOTE5NTEsMCwwLC43Nzc3OF0sNTczNTk6Wy4zMDI3NCwuNzkzODMsMCwwLC43Nzc3OF0sNTczNjA6Wy4zMDI3NCwuNzkzODMsMCwwLC43Nzc3OF0sNTczNjE6Wy40MTk1MSwuOTE5NTEsMCwwLC43Nzc3OF0sNTczNjY6Wy4yNTE0MiwuNzU3MjYsMCwwLC43Nzc3OF0sNTczNjc6Wy4yNTE0MiwuNzU3MjYsMCwwLC43Nzc3OF0sNTczNjg6Wy4yNTE0MiwuNzU3MjYsMCwwLC43Nzc3OF0sNTczNjk6Wy4yNTE0MiwuNzU3MjYsMCwwLC43Nzc3OF0sNTczNzA6Wy4xMzU5NywuNjM1OTcsMCwwLC43Nzc3OF0sNTczNzE6Wy4xMzU5NywuNjM1OTcsMCwwLC43Nzc3OF19LCJDYWxpZ3JhcGhpYy1SZWd1bGFyIjp7MzI6WzAsMCwwLDAsLjI1XSw2NTpbMCwuNjgzMzMsMCwuMTk0NDUsLjc5ODQ3XSw2NjpbMCwuNjgzMzMsLjAzMDQxLC4xMzg4OSwuNjU2ODFdLDY3OlswLC42ODMzMywuMDU4MzQsLjEzODg5LC41MjY1M10sNjg6WzAsLjY4MzMzLC4wMjc3OCwuMDgzMzQsLjc3MTM5XSw2OTpbMCwuNjgzMzMsLjA4OTQ0LC4xMTExMSwuNTI3NzhdLDcwOlswLC42ODMzMywuMDk5MzEsLjExMTExLC43MTg3NV0sNzE6Wy4wOTcyMiwuNjgzMzMsLjA1OTMsLjExMTExLC41OTQ4N10sNzI6WzAsLjY4MzMzLC4wMDk2NSwuMTExMTEsLjg0NDUyXSw3MzpbMCwuNjgzMzMsLjA3MzgyLDAsLjU0NDUyXSw3NDpbLjA5NzIyLC42ODMzMywuMTg0NzIsLjE2NjY3LC42Nzc3OF0sNzU6WzAsLjY4MzMzLC4wMTQ0NSwuMDU1NTYsLjc2MTk1XSw3NjpbMCwuNjgzMzMsMCwuMTM4ODksLjY4OTcyXSw3NzpbMCwuNjgzMzMsMCwuMTM4ODksMS4yMDA5XSw3ODpbMCwuNjgzMzMsLjE0NzM2LC4wODMzNCwuODIwNDldLDc5OlswLC42ODMzMywuMDI3NzgsLjExMTExLC43OTYxMV0sODA6WzAsLjY4MzMzLC4wODIyMiwuMDgzMzQsLjY5NTU2XSw4MTpbLjA5NzIyLC42ODMzMywwLC4xMTExMSwuODE2NjddLDgyOlswLC42ODMzMywwLC4wODMzNCwuODQ3NV0sODM6WzAsLjY4MzMzLC4wNzUsLjEzODg5LC42MDU1Nl0sODQ6WzAsLjY4MzMzLC4yNTQxNywwLC41NDQ2NF0sODU6WzAsLjY4MzMzLC4wOTkzMSwuMDgzMzQsLjYyNTgzXSw4NjpbMCwuNjgzMzMsLjA4MjIyLDAsLjYxMjc4XSw4NzpbMCwuNjgzMzMsLjA4MjIyLC4wODMzNCwuOTg3NzhdLDg4OlswLC42ODMzMywuMTQ2NDMsLjEzODg5LC43MTMzXSw4OTpbLjA5NzIyLC42ODMzMywuMDgyMjIsLjA4MzM0LC42NjgzNF0sOTA6WzAsLjY4MzMzLC4wNzk0NCwuMTM4ODksLjcyNDczXSwxNjA6WzAsMCwwLDAsLjI1XX0sIkZyYWt0dXItUmVndWxhciI6ezMyOlswLDAsMCwwLC4yNV0sMzM6WzAsLjY5MTQxLDAsMCwuMjk1NzRdLDM0OlswLC42OTE0MSwwLDAsLjIxNDcxXSwzODpbMCwuNjkxNDEsMCwwLC43Mzc4Nl0sMzk6WzAsLjY5MTQxLDAsMCwuMjEyMDFdLDQwOlsuMjQ5ODIsLjc0OTQ3LDAsMCwuMzg4NjVdLDQxOlsuMjQ5ODIsLjc0OTQ3LDAsMCwuMzg4NjVdLDQyOlswLC42MjExOSwwLDAsLjI3NzY0XSw0MzpbLjA4MzE5LC41ODI4MywwLDAsLjc1NjIzXSw0NDpbMCwuMTA4MDMsMCwwLC4yNzc2NF0sNDU6Wy4wODMxOSwuNTgyODMsMCwwLC43NTYyM10sNDY6WzAsLjEwODAzLDAsMCwuMjc3NjRdLDQ3OlsuMjQ5ODIsLjc0OTQ3LDAsMCwuNTAxODFdLDQ4OlswLC40NzUzNCwwLDAsLjUwMTgxXSw0OTpbMCwuNDc1MzQsMCwwLC41MDE4MV0sNTA6WzAsLjQ3NTM0LDAsMCwuNTAxODFdLDUxOlsuMTg5MDYsLjQ3NTM0LDAsMCwuNTAxODFdLDUyOlsuMTg5MDYsLjQ3NTM0LDAsMCwuNTAxODFdLDUzOlsuMTg5MDYsLjQ3NTM0LDAsMCwuNTAxODFdLDU0OlswLC42OTE0MSwwLDAsLjUwMTgxXSw1NTpbLjE4OTA2LC40NzUzNCwwLDAsLjUwMTgxXSw1NjpbMCwuNjkxNDEsMCwwLC41MDE4MV0sNTc6Wy4xODkwNiwuNDc1MzQsMCwwLC41MDE4MV0sNTg6WzAsLjQ3NTM0LDAsMCwuMjE2MDZdLDU5OlsuMTI2MDQsLjQ3NTM0LDAsMCwuMjE2MDZdLDYxOlstLjEzMDk5LC4zNjg2NiwwLDAsLjc1NjIzXSw2MzpbMCwuNjkxNDEsMCwwLC4zNjI0NV0sNjU6WzAsLjY5MTQxLDAsMCwuNzE3Nl0sNjY6WzAsLjY5MTQxLDAsMCwuODgzOTddLDY3OlswLC42OTE0MSwwLDAsLjYxMjU0XSw2ODpbMCwuNjkxNDEsMCwwLC44MzE1OF0sNjk6WzAsLjY5MTQxLDAsMCwuNjYyNzhdLDcwOlsuMTI2MDQsLjY5MTQxLDAsMCwuNjExMTldLDcxOlswLC42OTE0MSwwLDAsLjc4NTM5XSw3MjpbLjA2MzAyLC42OTE0MSwwLDAsLjcyMDNdLDczOlswLC42OTE0MSwwLDAsLjU1NDQ4XSw3NDpbLjEyNjA0LC42OTE0MSwwLDAsLjU1MjMxXSw3NTpbMCwuNjkxNDEsMCwwLC42Njg0NV0sNzY6WzAsLjY5MTQxLDAsMCwuNjY2MDJdLDc3OlswLC42OTE0MSwwLDAsMS4wNDk1M10sNzg6WzAsLjY5MTQxLDAsMCwuODMyMTJdLDc5OlswLC42OTE0MSwwLDAsLjgyNjk5XSw4MDpbLjE4OTA2LC42OTE0MSwwLDAsLjgyNzUzXSw4MTpbLjAzNzgxLC42OTE0MSwwLDAsLjgyNjk5XSw4MjpbMCwuNjkxNDEsMCwwLC44MjgwN10sODM6WzAsLjY5MTQxLDAsMCwuODI4NjFdLDg0OlswLC42OTE0MSwwLDAsLjY2ODk5XSw4NTpbMCwuNjkxNDEsMCwwLC42NDU3Nl0sODY6WzAsLjY5MTQxLDAsMCwuODMxMzFdLDg3OlswLC42OTE0MSwwLDAsMS4wNDYwMl0sODg6WzAsLjY5MTQxLDAsMCwuNzE5MjJdLDg5OlsuMTg5MDYsLjY5MTQxLDAsMCwuODMyOTNdLDkwOlsuMTI2MDQsLjY5MTQxLDAsMCwuNjAyMDFdLDkxOlsuMjQ5ODIsLjc0OTQ3LDAsMCwuMjc3NjRdLDkzOlsuMjQ5ODIsLjc0OTQ3LDAsMCwuMjc3NjRdLDk0OlswLC42OTE0MSwwLDAsLjQ5OTY1XSw5NzpbMCwuNDc1MzQsMCwwLC41MDA0Nl0sOTg6WzAsLjY5MTQxLDAsMCwuNTEzMTVdLDk5OlswLC40NzUzNCwwLDAsLjM4OTQ2XSwxMDA6WzAsLjYyMTE5LDAsMCwuNDk4NTddLDEwMTpbMCwuNDc1MzQsMCwwLC40MDA1M10sMTAyOlsuMTg5MDYsLjY5MTQxLDAsMCwuMzI2MjZdLDEwMzpbLjE4OTA2LC40NzUzNCwwLDAsLjUwMzddLDEwNDpbLjE4OTA2LC42OTE0MSwwLDAsLjUyMTI2XSwxMDU6WzAsLjY5MTQxLDAsMCwuMjc4OTldLDEwNjpbMCwuNjkxNDEsMCwwLC4yODA4OF0sMTA3OlswLC42OTE0MSwwLDAsLjM4OTQ2XSwxMDg6WzAsLjY5MTQxLDAsMCwuMjc5NTNdLDEwOTpbMCwuNDc1MzQsMCwwLC43NjY3Nl0sMTEwOlswLC40NzUzNCwwLDAsLjUyNjY2XSwxMTE6WzAsLjQ3NTM0LDAsMCwuNDg4ODVdLDExMjpbLjE4OTA2LC41MjM5NiwwLDAsLjUwMDQ2XSwxMTM6Wy4xODkwNiwuNDc1MzQsMCwwLC40ODkxMl0sMTE0OlswLC40NzUzNCwwLDAsLjM4OTE5XSwxMTU6WzAsLjQ3NTM0LDAsMCwuNDQyNjZdLDExNjpbMCwuNjIxMTksMCwwLC4zMzMwMV0sMTE3OlswLC40NzUzNCwwLDAsLjUxNzJdLDExODpbMCwuNTIzOTYsMCwwLC41MTE4XSwxMTk6WzAsLjUyMzk2LDAsMCwuNzczNTFdLDEyMDpbLjE4OTA2LC40NzUzNCwwLDAsLjM4ODY1XSwxMjE6Wy4xODkwNiwuNDc1MzQsMCwwLC40OTg4NF0sMTIyOlsuMTg5MDYsLjQ3NTM0LDAsMCwuMzkwNTRdLDE2MDpbMCwwLDAsMCwuMjVdLDgyMTY6WzAsLjY5MTQxLDAsMCwuMjE0NzFdLDgyMTc6WzAsLjY5MTQxLDAsMCwuMjE0NzFdLDU4MTEyOlswLC42MjExOSwwLDAsLjQ5NzQ5XSw1ODExMzpbMCwuNjIxMTksMCwwLC40OTgzXSw1ODExNDpbLjE4OTA2LC42OTE0MSwwLDAsLjMzMzI4XSw1ODExNTpbLjE4OTA2LC42OTE0MSwwLDAsLjMyOTIzXSw1ODExNjpbLjE4OTA2LC40NzUzNCwwLDAsLjUwMzQzXSw1ODExNzpbMCwuNjkxNDEsMCwwLC4zMzMwMV0sNTgxMTg6WzAsLjYyMTE5LDAsMCwuMzM0MDldLDU4MTE5OlswLC40NzUzNCwwLDAsLjUwMDczXX0sIk1haW4tQm9sZCI6ezMyOlswLDAsMCwwLC4yNV0sMzM6WzAsLjY5NDQ0LDAsMCwuMzVdLDM0OlswLC42OTQ0NCwwLDAsLjYwMjc4XSwzNTpbLjE5NDQ0LC42OTQ0NCwwLDAsLjk1ODMzXSwzNjpbLjA1NTU2LC43NSwwLDAsLjU3NV0sMzc6Wy4wNTU1NiwuNzUsMCwwLC45NTgzM10sMzg6WzAsLjY5NDQ0LDAsMCwuODk0NDRdLDM5OlswLC42OTQ0NCwwLDAsLjMxOTQ0XSw0MDpbLjI1LC43NSwwLDAsLjQ0NzIyXSw0MTpbLjI1LC43NSwwLDAsLjQ0NzIyXSw0MjpbMCwuNzUsMCwwLC41NzVdLDQzOlsuMTMzMzMsLjYzMzMzLDAsMCwuODk0NDRdLDQ0OlsuMTk0NDQsLjE1NTU2LDAsMCwuMzE5NDRdLDQ1OlswLC40NDQ0NCwwLDAsLjM4MzMzXSw0NjpbMCwuMTU1NTYsMCwwLC4zMTk0NF0sNDc6Wy4yNSwuNzUsMCwwLC41NzVdLDQ4OlswLC42NDQ0NCwwLDAsLjU3NV0sNDk6WzAsLjY0NDQ0LDAsMCwuNTc1XSw1MDpbMCwuNjQ0NDQsMCwwLC41NzVdLDUxOlswLC42NDQ0NCwwLDAsLjU3NV0sNTI6WzAsLjY0NDQ0LDAsMCwuNTc1XSw1MzpbMCwuNjQ0NDQsMCwwLC41NzVdLDU0OlswLC42NDQ0NCwwLDAsLjU3NV0sNTU6WzAsLjY0NDQ0LDAsMCwuNTc1XSw1NjpbMCwuNjQ0NDQsMCwwLC41NzVdLDU3OlswLC42NDQ0NCwwLDAsLjU3NV0sNTg6WzAsLjQ0NDQ0LDAsMCwuMzE5NDRdLDU5OlsuMTk0NDQsLjQ0NDQ0LDAsMCwuMzE5NDRdLDYwOlsuMDg1NTYsLjU4NTU2LDAsMCwuODk0NDRdLDYxOlstLjEwODg5LC4zOTExMSwwLDAsLjg5NDQ0XSw2MjpbLjA4NTU2LC41ODU1NiwwLDAsLjg5NDQ0XSw2MzpbMCwuNjk0NDQsMCwwLC41NDMwNV0sNjQ6WzAsLjY5NDQ0LDAsMCwuODk0NDRdLDY1OlswLC42ODYxMSwwLDAsLjg2OTQ0XSw2NjpbMCwuNjg2MTEsMCwwLC44MTgwNV0sNjc6WzAsLjY4NjExLDAsMCwuODMwNTVdLDY4OlswLC42ODYxMSwwLDAsLjg4MTk0XSw2OTpbMCwuNjg2MTEsMCwwLC43NTU1NV0sNzA6WzAsLjY4NjExLDAsMCwuNzIzNjFdLDcxOlswLC42ODYxMSwwLDAsLjkwNDE2XSw3MjpbMCwuNjg2MTEsMCwwLC45XSw3MzpbMCwuNjg2MTEsMCwwLC40MzYxMV0sNzQ6WzAsLjY4NjExLDAsMCwuNTk0NDRdLDc1OlswLC42ODYxMSwwLDAsLjkwMTM4XSw3NjpbMCwuNjg2MTEsMCwwLC42OTE2Nl0sNzc6WzAsLjY4NjExLDAsMCwxLjA5MTY2XSw3ODpbMCwuNjg2MTEsMCwwLC45XSw3OTpbMCwuNjg2MTEsMCwwLC44NjM4OF0sODA6WzAsLjY4NjExLDAsMCwuNzg2MTFdLDgxOlsuMTk0NDQsLjY4NjExLDAsMCwuODYzODhdLDgyOlswLC42ODYxMSwwLDAsLjg2MjVdLDgzOlswLC42ODYxMSwwLDAsLjYzODg5XSw4NDpbMCwuNjg2MTEsMCwwLC44XSw4NTpbMCwuNjg2MTEsMCwwLC44ODQ3Ml0sODY6WzAsLjY4NjExLC4wMTU5NywwLC44Njk0NF0sODc6WzAsLjY4NjExLC4wMTU5NywwLDEuMTg4ODhdLDg4OlswLC42ODYxMSwwLDAsLjg2OTQ0XSw4OTpbMCwuNjg2MTEsLjAyODc1LDAsLjg2OTQ0XSw5MDpbMCwuNjg2MTEsMCwwLC43MDI3N10sOTE6Wy4yNSwuNzUsMCwwLC4zMTk0NF0sOTI6Wy4yNSwuNzUsMCwwLC41NzVdLDkzOlsuMjUsLjc1LDAsMCwuMzE5NDRdLDk0OlswLC42OTQ0NCwwLDAsLjU3NV0sOTU6Wy4zMSwuMTM0NDQsLjAzMTk0LDAsLjU3NV0sOTc6WzAsLjQ0NDQ0LDAsMCwuNTU5MDJdLDk4OlswLC42OTQ0NCwwLDAsLjYzODg5XSw5OTpbMCwuNDQ0NDQsMCwwLC41MTExMV0sMTAwOlswLC42OTQ0NCwwLDAsLjYzODg5XSwxMDE6WzAsLjQ0NDQ0LDAsMCwuNTI3MDhdLDEwMjpbMCwuNjk0NDQsLjEwOTAzLDAsLjM1MTM5XSwxMDM6Wy4xOTQ0NCwuNDQ0NDQsLjAxNTk3LDAsLjU3NV0sMTA0OlswLC42OTQ0NCwwLDAsLjYzODg5XSwxMDU6WzAsLjY5NDQ0LDAsMCwuMzE5NDRdLDEwNjpbLjE5NDQ0LC42OTQ0NCwwLDAsLjM1MTM5XSwxMDc6WzAsLjY5NDQ0LDAsMCwuNjA2OTRdLDEwODpbMCwuNjk0NDQsMCwwLC4zMTk0NF0sMTA5OlswLC40NDQ0NCwwLDAsLjk1ODMzXSwxMTA6WzAsLjQ0NDQ0LDAsMCwuNjM4ODldLDExMTpbMCwuNDQ0NDQsMCwwLC41NzVdLDExMjpbLjE5NDQ0LC40NDQ0NCwwLDAsLjYzODg5XSwxMTM6Wy4xOTQ0NCwuNDQ0NDQsMCwwLC42MDY5NF0sMTE0OlswLC40NDQ0NCwwLDAsLjQ3MzYxXSwxMTU6WzAsLjQ0NDQ0LDAsMCwuNDUzNjFdLDExNjpbMCwuNjM0OTIsMCwwLC40NDcyMl0sMTE3OlswLC40NDQ0NCwwLDAsLjYzODg5XSwxMTg6WzAsLjQ0NDQ0LC4wMTU5NywwLC42MDY5NF0sMTE5OlswLC40NDQ0NCwuMDE1OTcsMCwuODMwNTVdLDEyMDpbMCwuNDQ0NDQsMCwwLC42MDY5NF0sMTIxOlsuMTk0NDQsLjQ0NDQ0LC4wMTU5NywwLC42MDY5NF0sMTIyOlswLC40NDQ0NCwwLDAsLjUxMTExXSwxMjM6Wy4yNSwuNzUsMCwwLC41NzVdLDEyNDpbLjI1LC43NSwwLDAsLjMxOTQ0XSwxMjU6Wy4yNSwuNzUsMCwwLC41NzVdLDEyNjpbLjM1LC4zNDQ0NCwwLDAsLjU3NV0sMTYwOlswLDAsMCwwLC4yNV0sMTYzOlswLC42OTQ0NCwwLDAsLjg2ODUzXSwxNjg6WzAsLjY5NDQ0LDAsMCwuNTc1XSwxNzI6WzAsLjQ0NDQ0LDAsMCwuNzY2NjZdLDE3NjpbMCwuNjk0NDQsMCwwLC44Njk0NF0sMTc3OlsuMTMzMzMsLjYzMzMzLDAsMCwuODk0NDRdLDE4NDpbLjE3MDE0LDAsMCwwLC41MTExMV0sMTk4OlswLC42ODYxMSwwLDAsMS4wNDE2Nl0sMjE1OlsuMTMzMzMsLjYzMzMzLDAsMCwuODk0NDRdLDIxNjpbLjA0ODYxLC43MzQ3MiwwLDAsLjg5NDQ0XSwyMjM6WzAsLjY5NDQ0LDAsMCwuNTk3MjJdLDIzMDpbMCwuNDQ0NDQsMCwwLC44MzA1NV0sMjQ3OlsuMTMzMzMsLjYzMzMzLDAsMCwuODk0NDRdLDI0ODpbLjA5NzIyLC41NDE2NywwLDAsLjU3NV0sMzA1OlswLC40NDQ0NCwwLDAsLjMxOTQ0XSwzMzg6WzAsLjY4NjExLDAsMCwxLjE2OTQ0XSwzMzk6WzAsLjQ0NDQ0LDAsMCwuODk0NDRdLDU2NzpbLjE5NDQ0LC40NDQ0NCwwLDAsLjM1MTM5XSw3MTA6WzAsLjY5NDQ0LDAsMCwuNTc1XSw3MTE6WzAsLjYzMTk0LDAsMCwuNTc1XSw3MTM6WzAsLjU5NjExLDAsMCwuNTc1XSw3MTQ6WzAsLjY5NDQ0LDAsMCwuNTc1XSw3MTU6WzAsLjY5NDQ0LDAsMCwuNTc1XSw3Mjg6WzAsLjY5NDQ0LDAsMCwuNTc1XSw3Mjk6WzAsLjY5NDQ0LDAsMCwuMzE5NDRdLDczMDpbMCwuNjk0NDQsMCwwLC44Njk0NF0sNzMyOlswLC42OTQ0NCwwLDAsLjU3NV0sNzMzOlswLC42OTQ0NCwwLDAsLjU3NV0sOTE1OlswLC42ODYxMSwwLDAsLjY5MTY2XSw5MTY6WzAsLjY4NjExLDAsMCwuOTU4MzNdLDkyMDpbMCwuNjg2MTEsMCwwLC44OTQ0NF0sOTIzOlswLC42ODYxMSwwLDAsLjgwNTU1XSw5MjY6WzAsLjY4NjExLDAsMCwuNzY2NjZdLDkyODpbMCwuNjg2MTEsMCwwLC45XSw5MzE6WzAsLjY4NjExLDAsMCwuODMwNTVdLDkzMzpbMCwuNjg2MTEsMCwwLC44OTQ0NF0sOTM0OlswLC42ODYxMSwwLDAsLjgzMDU1XSw5MzY6WzAsLjY4NjExLDAsMCwuODk0NDRdLDkzNzpbMCwuNjg2MTEsMCwwLC44MzA1NV0sODIxMTpbMCwuNDQ0NDQsLjAzMTk0LDAsLjU3NV0sODIxMjpbMCwuNDQ0NDQsLjAzMTk0LDAsMS4xNDk5OV0sODIxNjpbMCwuNjk0NDQsMCwwLC4zMTk0NF0sODIxNzpbMCwuNjk0NDQsMCwwLC4zMTk0NF0sODIyMDpbMCwuNjk0NDQsMCwwLC42MDI3OF0sODIyMTpbMCwuNjk0NDQsMCwwLC42MDI3OF0sODIyNDpbLjE5NDQ0LC42OTQ0NCwwLDAsLjUxMTExXSw4MjI1OlsuMTk0NDQsLjY5NDQ0LDAsMCwuNTExMTFdLDgyNDI6WzAsLjU1NTU2LDAsMCwuMzQ0NDRdLDg0MDc6WzAsLjcyNDQ0LC4xNTQ4NiwwLC41NzVdLDg0NjM6WzAsLjY5NDQ0LDAsMCwuNjY3NTldLDg0NjU6WzAsLjY5NDQ0LDAsMCwuODMwNTVdLDg0Njc6WzAsLjY5NDQ0LDAsMCwuNDczNjFdLDg0NzI6Wy4xOTQ0NCwuNDQ0NDQsMCwwLC43NDAyN10sODQ3NjpbMCwuNjk0NDQsMCwwLC44MzA1NV0sODUwMTpbMCwuNjk0NDQsMCwwLC43MDI3N10sODU5MjpbLS4xMDg4OSwuMzkxMTEsMCwwLDEuMTQ5OTldLDg1OTM6Wy4xOTQ0NCwuNjk0NDQsMCwwLC41NzVdLDg1OTQ6Wy0uMTA4ODksLjM5MTExLDAsMCwxLjE0OTk5XSw4NTk1OlsuMTk0NDQsLjY5NDQ0LDAsMCwuNTc1XSw4NTk2OlstLjEwODg5LC4zOTExMSwwLDAsMS4xNDk5OV0sODU5NzpbLjI1LC43NSwwLDAsLjU3NV0sODU5ODpbLjE5NDQ0LC42OTQ0NCwwLDAsMS4xNDk5OV0sODU5OTpbLjE5NDQ0LC42OTQ0NCwwLDAsMS4xNDk5OV0sODYwMDpbLjE5NDQ0LC42OTQ0NCwwLDAsMS4xNDk5OV0sODYwMTpbLjE5NDQ0LC42OTQ0NCwwLDAsMS4xNDk5OV0sODYzNjpbLS4xMDg4OSwuMzkxMTEsMCwwLDEuMTQ5OTldLDg2Mzc6Wy0uMTA4ODksLjM5MTExLDAsMCwxLjE0OTk5XSw4NjQwOlstLjEwODg5LC4zOTExMSwwLDAsMS4xNDk5OV0sODY0MTpbLS4xMDg4OSwuMzkxMTEsMCwwLDEuMTQ5OTldLDg2NTY6Wy0uMTA4ODksLjM5MTExLDAsMCwxLjE0OTk5XSw4NjU3OlsuMTk0NDQsLjY5NDQ0LDAsMCwuNzAyNzddLDg2NTg6Wy0uMTA4ODksLjM5MTExLDAsMCwxLjE0OTk5XSw4NjU5OlsuMTk0NDQsLjY5NDQ0LDAsMCwuNzAyNzddLDg2NjA6Wy0uMTA4ODksLjM5MTExLDAsMCwxLjE0OTk5XSw4NjYxOlsuMjUsLjc1LDAsMCwuNzAyNzddLDg3MDQ6WzAsLjY5NDQ0LDAsMCwuNjM4ODldLDg3MDY6WzAsLjY5NDQ0LC4wNjM4OSwwLC42Mjg0N10sODcwNzpbMCwuNjk0NDQsMCwwLC42Mzg4OV0sODcwOTpbLjA1NTU2LC43NSwwLDAsLjU3NV0sODcxMTpbMCwuNjg2MTEsMCwwLC45NTgzM10sODcxMjpbLjA4NTU2LC41ODU1NiwwLDAsLjc2NjY2XSw4NzE1OlsuMDg1NTYsLjU4NTU2LDAsMCwuNzY2NjZdLDg3MjI6Wy4xMzMzMywuNjMzMzMsMCwwLC44OTQ0NF0sODcyMzpbLjEzMzMzLC42MzMzMywwLDAsLjg5NDQ0XSw4NzI1OlsuMjUsLjc1LDAsMCwuNTc1XSw4NzI2OlsuMjUsLjc1LDAsMCwuNTc1XSw4NzI3OlstLjAyNzc4LC40NzIyMiwwLDAsLjU3NV0sODcyODpbLS4wMjYzOSwuNDczNjEsMCwwLC41NzVdLDg3Mjk6Wy0uMDI2MzksLjQ3MzYxLDAsMCwuNTc1XSw4NzMwOlsuMTgsLjgyLDAsMCwuOTU4MzNdLDg3MzM6WzAsLjQ0NDQ0LDAsMCwuODk0NDRdLDg3MzQ6WzAsLjQ0NDQ0LDAsMCwxLjE0OTk5XSw4NzM2OlswLC42OTIyNCwwLDAsLjcyMjIyXSw4NzM5OlsuMjUsLjc1LDAsMCwuMzE5NDRdLDg3NDE6Wy4yNSwuNzUsMCwwLC41NzVdLDg3NDM6WzAsLjU1NTU2LDAsMCwuNzY2NjZdLDg3NDQ6WzAsLjU1NTU2LDAsMCwuNzY2NjZdLDg3NDU6WzAsLjU1NTU2LDAsMCwuNzY2NjZdLDg3NDY6WzAsLjU1NTU2LDAsMCwuNzY2NjZdLDg3NDc6Wy4xOTQ0NCwuNjk0NDQsLjEyNzc4LDAsLjU2ODc1XSw4NzY0OlstLjEwODg5LC4zOTExMSwwLDAsLjg5NDQ0XSw4NzY4OlsuMTk0NDQsLjY5NDQ0LDAsMCwuMzE5NDRdLDg3NzE6Wy4wMDIyMiwuNTAyMjIsMCwwLC44OTQ0NF0sODc3MzpbLjAyNywuNjM4LDAsMCwuODk0XSw4Nzc2OlsuMDI0NDQsLjUyNDQ0LDAsMCwuODk0NDRdLDg3ODE6Wy4wMDIyMiwuNTAyMjIsMCwwLC44OTQ0NF0sODgwMTpbLjAwMjIyLC41MDIyMiwwLDAsLjg5NDQ0XSw4ODA0OlsuMTk2NjcsLjY5NjY3LDAsMCwuODk0NDRdLDg4MDU6Wy4xOTY2NywuNjk2NjcsMCwwLC44OTQ0NF0sODgxMDpbLjA4NTU2LC41ODU1NiwwLDAsMS4xNDk5OV0sODgxMTpbLjA4NTU2LC41ODU1NiwwLDAsMS4xNDk5OV0sODgyNjpbLjA4NTU2LC41ODU1NiwwLDAsLjg5NDQ0XSw4ODI3OlsuMDg1NTYsLjU4NTU2LDAsMCwuODk0NDRdLDg4MzQ6Wy4wODU1NiwuNTg1NTYsMCwwLC44OTQ0NF0sODgzNTpbLjA4NTU2LC41ODU1NiwwLDAsLjg5NDQ0XSw4ODM4OlsuMTk2NjcsLjY5NjY3LDAsMCwuODk0NDRdLDg4Mzk6Wy4xOTY2NywuNjk2NjcsMCwwLC44OTQ0NF0sODg0NjpbMCwuNTU1NTYsMCwwLC43NjY2Nl0sODg0OTpbLjE5NjY3LC42OTY2NywwLDAsLjg5NDQ0XSw4ODUwOlsuMTk2NjcsLjY5NjY3LDAsMCwuODk0NDRdLDg4NTE6WzAsLjU1NTU2LDAsMCwuNzY2NjZdLDg4NTI6WzAsLjU1NTU2LDAsMCwuNzY2NjZdLDg4NTM6Wy4xMzMzMywuNjMzMzMsMCwwLC44OTQ0NF0sODg1NDpbLjEzMzMzLC42MzMzMywwLDAsLjg5NDQ0XSw4ODU1OlsuMTMzMzMsLjYzMzMzLDAsMCwuODk0NDRdLDg4NTY6Wy4xMzMzMywuNjMzMzMsMCwwLC44OTQ0NF0sODg1NzpbLjEzMzMzLC42MzMzMywwLDAsLjg5NDQ0XSw4ODY2OlswLC42OTQ0NCwwLDAsLjcwMjc3XSw4ODY3OlswLC42OTQ0NCwwLDAsLjcwMjc3XSw4ODY4OlswLC42OTQ0NCwwLDAsLjg5NDQ0XSw4ODY5OlswLC42OTQ0NCwwLDAsLjg5NDQ0XSw4OTAwOlstLjAyNjM5LC40NzM2MSwwLDAsLjU3NV0sODkwMTpbLS4wMjYzOSwuNDczNjEsMCwwLC4zMTk0NF0sODkwMjpbLS4wMjc3OCwuNDcyMjIsMCwwLC41NzVdLDg5Njg6Wy4yNSwuNzUsMCwwLC41MTExMV0sODk2OTpbLjI1LC43NSwwLDAsLjUxMTExXSw4OTcwOlsuMjUsLjc1LDAsMCwuNTExMTFdLDg5NzE6Wy4yNSwuNzUsMCwwLC41MTExMV0sODk5NDpbLS4xMzg4OSwuMzYxMTEsMCwwLDEuMTQ5OTldLDg5OTU6Wy0uMTM4ODksLjM2MTExLDAsMCwxLjE0OTk5XSw5NjUxOlsuMTk0NDQsLjY5NDQ0LDAsMCwxLjAyMjIyXSw5NjU3OlstLjAyNzc4LC40NzIyMiwwLDAsLjU3NV0sOTY2MTpbLjE5NDQ0LC42OTQ0NCwwLDAsMS4wMjIyMl0sOTY2NzpbLS4wMjc3OCwuNDcyMjIsMCwwLC41NzVdLDk3MTE6Wy4xOTQ0NCwuNjk0NDQsMCwwLDEuMTQ5OTldLDk4MjQ6Wy4xMjk2MywuNjk0NDQsMCwwLC44OTQ0NF0sOTgyNTpbLjEyOTYzLC42OTQ0NCwwLDAsLjg5NDQ0XSw5ODI2OlsuMTI5NjMsLjY5NDQ0LDAsMCwuODk0NDRdLDk4Mjc6Wy4xMjk2MywuNjk0NDQsMCwwLC44OTQ0NF0sOTgzNzpbMCwuNzUsMCwwLC40NDcyMl0sOTgzODpbLjE5NDQ0LC42OTQ0NCwwLDAsLjQ0NzIyXSw5ODM5OlsuMTk0NDQsLjY5NDQ0LDAsMCwuNDQ3MjJdLDEwMjE2OlsuMjUsLjc1LDAsMCwuNDQ3MjJdLDEwMjE3OlsuMjUsLjc1LDAsMCwuNDQ3MjJdLDEwODE1OlswLC42ODYxMSwwLDAsLjldLDEwOTI3OlsuMTk2NjcsLjY5NjY3LDAsMCwuODk0NDRdLDEwOTI4OlsuMTk2NjcsLjY5NjY3LDAsMCwuODk0NDRdLDU3Mzc2OlsuMTk0NDQsLjY5NDQ0LDAsMCwwXX0sIk1haW4tQm9sZEl0YWxpYyI6ezMyOlswLDAsMCwwLC4yNV0sMzM6WzAsLjY5NDQ0LC4xMTQxNywwLC4zODYxMV0sMzQ6WzAsLjY5NDQ0LC4wNzkzOSwwLC42MjA1NV0sMzU6Wy4xOTQ0NCwuNjk0NDQsLjA2ODMzLDAsLjk0NDQ0XSwzNzpbLjA1NTU2LC43NSwuMTI4NjEsMCwuOTQ0NDRdLDM4OlswLC42OTQ0NCwuMDg1MjgsMCwuODg1NTVdLDM5OlswLC42OTQ0NCwuMTI5NDUsMCwuMzU1NTVdLDQwOlsuMjUsLjc1LC4xNTgwNiwwLC40NzMzM10sNDE6Wy4yNSwuNzUsLjAzMzA2LDAsLjQ3MzMzXSw0MjpbMCwuNzUsLjE0MzMzLDAsLjU5MTExXSw0MzpbLjEwMzMzLC42MDMzMywuMDMzMDYsMCwuODg1NTVdLDQ0OlsuMTk0NDQsLjE0NzIyLDAsMCwuMzU1NTVdLDQ1OlswLC40NDQ0NCwuMDI2MTEsMCwuNDE0NDRdLDQ2OlswLC4xNDcyMiwwLDAsLjM1NTU1XSw0NzpbLjI1LC43NSwuMTU4MDYsMCwuNTkxMTFdLDQ4OlswLC42NDQ0NCwuMTMxNjcsMCwuNTkxMTFdLDQ5OlswLC42NDQ0NCwuMTMxNjcsMCwuNTkxMTFdLDUwOlswLC42NDQ0NCwuMTMxNjcsMCwuNTkxMTFdLDUxOlswLC42NDQ0NCwuMTMxNjcsMCwuNTkxMTFdLDUyOlsuMTk0NDQsLjY0NDQ0LC4xMzE2NywwLC41OTExMV0sNTM6WzAsLjY0NDQ0LC4xMzE2NywwLC41OTExMV0sNTQ6WzAsLjY0NDQ0LC4xMzE2NywwLC41OTExMV0sNTU6Wy4xOTQ0NCwuNjQ0NDQsLjEzMTY3LDAsLjU5MTExXSw1NjpbMCwuNjQ0NDQsLjEzMTY3LDAsLjU5MTExXSw1NzpbMCwuNjQ0NDQsLjEzMTY3LDAsLjU5MTExXSw1ODpbMCwuNDQ0NDQsLjA2Njk1LDAsLjM1NTU1XSw1OTpbLjE5NDQ0LC40NDQ0NCwuMDY2OTUsMCwuMzU1NTVdLDYxOlstLjEwODg5LC4zOTExMSwuMDY4MzMsMCwuODg1NTVdLDYzOlswLC42OTQ0NCwuMTE0NzIsMCwuNTkxMTFdLDY0OlswLC42OTQ0NCwuMDkyMDgsMCwuODg1NTVdLDY1OlswLC42ODYxMSwwLDAsLjg2NTU1XSw2NjpbMCwuNjg2MTEsLjA5OTIsMCwuODE2NjZdLDY3OlswLC42ODYxMSwuMTQyMDgsMCwuODI2NjZdLDY4OlswLC42ODYxMSwuMDkwNjIsMCwuODc1NTVdLDY5OlswLC42ODYxMSwuMTE0MzEsMCwuNzU2NjZdLDcwOlswLC42ODYxMSwuMTI5MDMsMCwuNzI3MjJdLDcxOlswLC42ODYxMSwuMDczNDcsMCwuODk1MjddLDcyOlswLC42ODYxMSwuMTcyMDgsMCwuODk2MV0sNzM6WzAsLjY4NjExLC4xNTY4MSwwLC40NzE2Nl0sNzQ6WzAsLjY4NjExLC4xNDUsMCwuNjEwNTVdLDc1OlswLC42ODYxMSwuMTQyMDgsMCwuODk0OTldLDc2OlswLC42ODYxMSwwLDAsLjY5Nzc3XSw3NzpbMCwuNjg2MTEsLjE3MjA4LDAsMS4wNzI3N10sNzg6WzAsLjY4NjExLC4xNzIwOCwwLC44OTYxXSw3OTpbMCwuNjg2MTEsLjA5MDYyLDAsLjg1NDk5XSw4MDpbMCwuNjg2MTEsLjA5OTIsMCwuNzg3MjFdLDgxOlsuMTk0NDQsLjY4NjExLC4wOTA2MiwwLC44NTQ5OV0sODI6WzAsLjY4NjExLC4wMjU1OSwwLC44NTk0NF0sODM6WzAsLjY4NjExLC4xMTI2NCwwLC42NDk5OV0sODQ6WzAsLjY4NjExLC4xMjkwMywwLC43OTYxXSw4NTpbMCwuNjg2MTEsLjE3MjA4LDAsLjg4MDgzXSw4NjpbMCwuNjg2MTEsLjE4NjI1LDAsLjg2NTU1XSw4NzpbMCwuNjg2MTEsLjE4NjI1LDAsMS4xNTk5OV0sODg6WzAsLjY4NjExLC4xNTY4MSwwLC44NjU1NV0sODk6WzAsLjY4NjExLC4xOTgwMywwLC44NjU1NV0sOTA6WzAsLjY4NjExLC4xNDIwOCwwLC43MDg4OF0sOTE6Wy4yNSwuNzUsLjE4NzUsMCwuMzU2MTFdLDkzOlsuMjUsLjc1LC4wOTk3MiwwLC4zNTYxMV0sOTQ6WzAsLjY5NDQ0LC4wNjcwOSwwLC41OTExMV0sOTU6Wy4zMSwuMTM0NDQsLjA5ODExLDAsLjU5MTExXSw5NzpbMCwuNDQ0NDQsLjA5NDI2LDAsLjU5MTExXSw5ODpbMCwuNjk0NDQsLjA3ODYxLDAsLjUzMjIyXSw5OTpbMCwuNDQ0NDQsLjA1MjIyLDAsLjUzMjIyXSwxMDA6WzAsLjY5NDQ0LC4xMDg2MSwwLC41OTExMV0sMTAxOlswLC40NDQ0NCwuMDg1LDAsLjUzMjIyXSwxMDI6Wy4xOTQ0NCwuNjk0NDQsLjIxNzc4LDAsLjRdLDEwMzpbLjE5NDQ0LC40NDQ0NCwuMTA1LDAsLjUzMjIyXSwxMDQ6WzAsLjY5NDQ0LC4wOTQyNiwwLC41OTExMV0sMTA1OlswLC42OTMyNiwuMTEzODcsMCwuMzU1NTVdLDEwNjpbLjE5NDQ0LC42OTMyNiwuMTY3MiwwLC4zNTU1NV0sMTA3OlswLC42OTQ0NCwuMTExMTEsMCwuNTMyMjJdLDEwODpbMCwuNjk0NDQsLjEwODYxLDAsLjI5NjY2XSwxMDk6WzAsLjQ0NDQ0LC4wOTQyNiwwLC45NDQ0NF0sMTEwOlswLC40NDQ0NCwuMDk0MjYsMCwuNjQ5OTldLDExMTpbMCwuNDQ0NDQsLjA3ODYxLDAsLjU5MTExXSwxMTI6Wy4xOTQ0NCwuNDQ0NDQsLjA3ODYxLDAsLjU5MTExXSwxMTM6Wy4xOTQ0NCwuNDQ0NDQsLjEwNSwwLC41MzIyMl0sMTE0OlswLC40NDQ0NCwuMTExMTEsMCwuNTAxNjddLDExNTpbMCwuNDQ0NDQsLjA4MTY3LDAsLjQ4Njk0XSwxMTY6WzAsLjYzNDkyLC4wOTYzOSwwLC4zODVdLDExNzpbMCwuNDQ0NDQsLjA5NDI2LDAsLjYyMDU1XSwxMTg6WzAsLjQ0NDQ0LC4xMTExMSwwLC41MzIyMl0sMTE5OlswLC40NDQ0NCwuMTExMTEsMCwuNzY3NzddLDEyMDpbMCwuNDQ0NDQsLjEyNTgzLDAsLjU2MDU1XSwxMjE6Wy4xOTQ0NCwuNDQ0NDQsLjEwNSwwLC41NjE2Nl0sMTIyOlswLC40NDQ0NCwuMTM4ODksMCwuNDkwNTVdLDEyNjpbLjM1LC4zNDQ0NCwuMTE0NzIsMCwuNTkxMTFdLDE2MDpbMCwwLDAsMCwuMjVdLDE2ODpbMCwuNjk0NDQsLjExNDczLDAsLjU5MTExXSwxNzY6WzAsLjY5NDQ0LDAsMCwuOTQ4ODhdLDE4NDpbLjE3MDE0LDAsMCwwLC41MzIyMl0sMTk4OlswLC42ODYxMSwuMTE0MzEsMCwxLjAyMjc3XSwyMTY6Wy4wNDg2MSwuNzM0NzIsLjA5MDYyLDAsLjg4NTU1XSwyMjM6Wy4xOTQ0NCwuNjk0NDQsLjA5NzM2LDAsLjY2NV0sMjMwOlswLC40NDQ0NCwuMDg1LDAsLjgyNjY2XSwyNDg6Wy4wOTcyMiwuNTQxNjcsLjA5NDU4LDAsLjU5MTExXSwzMDU6WzAsLjQ0NDQ0LC4wOTQyNiwwLC4zNTU1NV0sMzM4OlswLC42ODYxMSwuMTE0MzEsMCwxLjE0MDU0XSwzMzk6WzAsLjQ0NDQ0LC4wODUsMCwuODI2NjZdLDU2NzpbLjE5NDQ0LC40NDQ0NCwuMDQ2MTEsMCwuMzg1XSw3MTA6WzAsLjY5NDQ0LC4wNjcwOSwwLC41OTExMV0sNzExOlswLC42MzE5NCwuMDgyNzEsMCwuNTkxMTFdLDcxMzpbMCwuNTk0NDQsLjEwNDQ0LDAsLjU5MTExXSw3MTQ6WzAsLjY5NDQ0LC4wODUyOCwwLC41OTExMV0sNzE1OlswLC42OTQ0NCwwLDAsLjU5MTExXSw3Mjg6WzAsLjY5NDQ0LC4xMDMzMywwLC41OTExMV0sNzI5OlswLC42OTQ0NCwuMTI5NDUsMCwuMzU1NTVdLDczMDpbMCwuNjk0NDQsMCwwLC45NDg4OF0sNzMyOlswLC42OTQ0NCwuMTE0NzIsMCwuNTkxMTFdLDczMzpbMCwuNjk0NDQsLjExNDcyLDAsLjU5MTExXSw5MTU6WzAsLjY4NjExLC4xMjkwMywwLC42OTc3N10sOTE2OlswLC42ODYxMSwwLDAsLjk0NDQ0XSw5MjA6WzAsLjY4NjExLC4wOTA2MiwwLC44ODU1NV0sOTIzOlswLC42ODYxMSwwLDAsLjgwNjY2XSw5MjY6WzAsLjY4NjExLC4xNTA5MiwwLC43Njc3N10sOTI4OlswLC42ODYxMSwuMTcyMDgsMCwuODk2MV0sOTMxOlswLC42ODYxMSwuMTE0MzEsMCwuODI2NjZdLDkzMzpbMCwuNjg2MTEsLjEwNzc4LDAsLjg4NTU1XSw5MzQ6WzAsLjY4NjExLC4wNTYzMiwwLC44MjY2Nl0sOTM2OlswLC42ODYxMSwuMTA3NzgsMCwuODg1NTVdLDkzNzpbMCwuNjg2MTEsLjA5OTIsMCwuODI2NjZdLDgyMTE6WzAsLjQ0NDQ0LC4wOTgxMSwwLC41OTExMV0sODIxMjpbMCwuNDQ0NDQsLjA5ODExLDAsMS4xODIyMV0sODIxNjpbMCwuNjk0NDQsLjEyOTQ1LDAsLjM1NTU1XSw4MjE3OlswLC42OTQ0NCwuMTI5NDUsMCwuMzU1NTVdLDgyMjA6WzAsLjY5NDQ0LC4xNjc3MiwwLC42MjA1NV0sODIyMTpbMCwuNjk0NDQsLjA3OTM5LDAsLjYyMDU1XX0sIk1haW4tSXRhbGljIjp7MzI6WzAsMCwwLDAsLjI1XSwzMzpbMCwuNjk0NDQsLjEyNDE3LDAsLjMwNjY3XSwzNDpbMCwuNjk0NDQsLjA2OTYxLDAsLjUxNDQ0XSwzNTpbLjE5NDQ0LC42OTQ0NCwuMDY2MTYsMCwuODE3NzddLDM3OlsuMDU1NTYsLjc1LC4xMzYzOSwwLC44MTc3N10sMzg6WzAsLjY5NDQ0LC4wOTY5NCwwLC43NjY2Nl0sMzk6WzAsLjY5NDQ0LC4xMjQxNywwLC4zMDY2N10sNDA6Wy4yNSwuNzUsLjE2MTk0LDAsLjQwODg5XSw0MTpbLjI1LC43NSwuMDM2OTQsMCwuNDA4ODldLDQyOlswLC43NSwuMTQ5MTcsMCwuNTExMTFdLDQzOlsuMDU2NjcsLjU2MTY3LC4wMzY5NCwwLC43NjY2Nl0sNDQ6Wy4xOTQ0NCwuMTA1NTYsMCwwLC4zMDY2N10sNDU6WzAsLjQzMDU2LC4wMjgyNiwwLC4zNTc3OF0sNDY6WzAsLjEwNTU2LDAsMCwuMzA2NjddLDQ3OlsuMjUsLjc1LC4xNjE5NCwwLC41MTExMV0sNDg6WzAsLjY0NDQ0LC4xMzU1NiwwLC41MTExMV0sNDk6WzAsLjY0NDQ0LC4xMzU1NiwwLC41MTExMV0sNTA6WzAsLjY0NDQ0LC4xMzU1NiwwLC41MTExMV0sNTE6WzAsLjY0NDQ0LC4xMzU1NiwwLC41MTExMV0sNTI6Wy4xOTQ0NCwuNjQ0NDQsLjEzNTU2LDAsLjUxMTExXSw1MzpbMCwuNjQ0NDQsLjEzNTU2LDAsLjUxMTExXSw1NDpbMCwuNjQ0NDQsLjEzNTU2LDAsLjUxMTExXSw1NTpbLjE5NDQ0LC42NDQ0NCwuMTM1NTYsMCwuNTExMTFdLDU2OlswLC42NDQ0NCwuMTM1NTYsMCwuNTExMTFdLDU3OlswLC42NDQ0NCwuMTM1NTYsMCwuNTExMTFdLDU4OlswLC40MzA1NiwuMDU4MiwwLC4zMDY2N10sNTk6Wy4xOTQ0NCwuNDMwNTYsLjA1ODIsMCwuMzA2NjddLDYxOlstLjEzMzEzLC4zNjY4NywuMDY2MTYsMCwuNzY2NjZdLDYzOlswLC42OTQ0NCwuMTIyNSwwLC41MTExMV0sNjQ6WzAsLjY5NDQ0LC4wOTU5NywwLC43NjY2Nl0sNjU6WzAsLjY4MzMzLDAsMCwuNzQzMzNdLDY2OlswLC42ODMzMywuMTAyNTcsMCwuNzAzODldLDY3OlswLC42ODMzMywuMTQ1MjgsMCwuNzE1NTVdLDY4OlswLC42ODMzMywuMDk0MDMsMCwuNzU1XSw2OTpbMCwuNjgzMzMsLjEyMDI4LDAsLjY3ODMzXSw3MDpbMCwuNjgzMzMsLjEzMzA1LDAsLjY1Mjc3XSw3MTpbMCwuNjgzMzMsLjA4NzIyLDAsLjc3MzYxXSw3MjpbMCwuNjgzMzMsLjE2Mzg5LDAsLjc0MzMzXSw3MzpbMCwuNjgzMzMsLjE1ODA2LDAsLjM4NTU1XSw3NDpbMCwuNjgzMzMsLjE0MDI4LDAsLjUyNV0sNzU6WzAsLjY4MzMzLC4xNDUyOCwwLC43Njg4OF0sNzY6WzAsLjY4MzMzLDAsMCwuNjI3MjJdLDc3OlswLC42ODMzMywuMTYzODksMCwuODk2NjZdLDc4OlswLC42ODMzMywuMTYzODksMCwuNzQzMzNdLDc5OlswLC42ODMzMywuMDk0MDMsMCwuNzY2NjZdLDgwOlswLC42ODMzMywuMTAyNTcsMCwuNjc4MzNdLDgxOlsuMTk0NDQsLjY4MzMzLC4wOTQwMywwLC43NjY2Nl0sODI6WzAsLjY4MzMzLC4wMzg2OCwwLC43Mjk0NF0sODM6WzAsLjY4MzMzLC4xMTk3MiwwLC41NjIyMl0sODQ6WzAsLjY4MzMzLC4xMzMwNSwwLC43MTU1NV0sODU6WzAsLjY4MzMzLC4xNjM4OSwwLC43NDMzM10sODY6WzAsLjY4MzMzLC4xODM2MSwwLC43NDMzM10sODc6WzAsLjY4MzMzLC4xODM2MSwwLC45OTg4OF0sODg6WzAsLjY4MzMzLC4xNTgwNiwwLC43NDMzM10sODk6WzAsLjY4MzMzLC4xOTM4MywwLC43NDMzM10sOTA6WzAsLjY4MzMzLC4xNDUyOCwwLC42MTMzM10sOTE6Wy4yNSwuNzUsLjE4NzUsMCwuMzA2NjddLDkzOlsuMjUsLjc1LC4xMDUyOCwwLC4zMDY2N10sOTQ6WzAsLjY5NDQ0LC4wNjY0NiwwLC41MTExMV0sOTU6Wy4zMSwuMTIwNTYsLjA5MjA4LDAsLjUxMTExXSw5NzpbMCwuNDMwNTYsLjA3NjcxLDAsLjUxMTExXSw5ODpbMCwuNjk0NDQsLjA2MzEyLDAsLjQ2XSw5OTpbMCwuNDMwNTYsLjA1NjUzLDAsLjQ2XSwxMDA6WzAsLjY5NDQ0LC4xMDMzMywwLC41MTExMV0sMTAxOlswLC40MzA1NiwuMDc1MTQsMCwuNDZdLDEwMjpbLjE5NDQ0LC42OTQ0NCwuMjExOTQsMCwuMzA2NjddLDEwMzpbLjE5NDQ0LC40MzA1NiwuMDg4NDcsMCwuNDZdLDEwNDpbMCwuNjk0NDQsLjA3NjcxLDAsLjUxMTExXSwxMDU6WzAsLjY1NTM2LC4xMDE5LDAsLjMwNjY3XSwxMDY6Wy4xOTQ0NCwuNjU1MzYsLjE0NDY3LDAsLjMwNjY3XSwxMDc6WzAsLjY5NDQ0LC4xMDc2NCwwLC40Nl0sMTA4OlswLC42OTQ0NCwuMTAzMzMsMCwuMjU1NTVdLDEwOTpbMCwuNDMwNTYsLjA3NjcxLDAsLjgxNzc3XSwxMTA6WzAsLjQzMDU2LC4wNzY3MSwwLC41NjIyMl0sMTExOlswLC40MzA1NiwuMDYzMTIsMCwuNTExMTFdLDExMjpbLjE5NDQ0LC40MzA1NiwuMDYzMTIsMCwuNTExMTFdLDExMzpbLjE5NDQ0LC40MzA1NiwuMDg4NDcsMCwuNDZdLDExNDpbMCwuNDMwNTYsLjEwNzY0LDAsLjQyMTY2XSwxMTU6WzAsLjQzMDU2LC4wODIwOCwwLC40MDg4OV0sMTE2OlswLC42MTUwOCwuMDk0ODYsMCwuMzMyMjJdLDExNzpbMCwuNDMwNTYsLjA3NjcxLDAsLjUzNjY2XSwxMTg6WzAsLjQzMDU2LC4xMDc2NCwwLC40Nl0sMTE5OlswLC40MzA1NiwuMTA3NjQsMCwuNjY0NDRdLDEyMDpbMCwuNDMwNTYsLjEyMDQyLDAsLjQ2Mzg5XSwxMjE6Wy4xOTQ0NCwuNDMwNTYsLjA4ODQ3LDAsLjQ4NTU1XSwxMjI6WzAsLjQzMDU2LC4xMjI5MiwwLC40MDg4OV0sMTI2OlsuMzUsLjMxNzg2LC4xMTU4NSwwLC41MTExMV0sMTYwOlswLDAsMCwwLC4yNV0sMTY4OlswLC42Njc4NiwuMTA0NzQsMCwuNTExMTFdLDE3NjpbMCwuNjk0NDQsMCwwLC44MzEyOV0sMTg0OlsuMTcwMTQsMCwwLDAsLjQ2XSwxOTg6WzAsLjY4MzMzLC4xMjAyOCwwLC44ODI3N10sMjE2OlsuMDQ4NjEsLjczMTk0LC4wOTQwMywwLC43NjY2Nl0sMjIzOlsuMTk0NDQsLjY5NDQ0LC4xMDUxNCwwLC41MzY2Nl0sMjMwOlswLC40MzA1NiwuMDc1MTQsMCwuNzE1NTVdLDI0ODpbLjA5NzIyLC41Mjc3OCwuMDkxOTQsMCwuNTExMTFdLDMzODpbMCwuNjgzMzMsLjEyMDI4LDAsLjk4NDk5XSwzMzk6WzAsLjQzMDU2LC4wNzUxNCwwLC43MTU1NV0sNzEwOlswLC42OTQ0NCwuMDY2NDYsMCwuNTExMTFdLDcxMTpbMCwuNjI4NDcsLjA4Mjk1LDAsLjUxMTExXSw3MTM6WzAsLjU2MTY3LC4xMDMzMywwLC41MTExMV0sNzE0OlswLC42OTQ0NCwuMDk2OTQsMCwuNTExMTFdLDcxNTpbMCwuNjk0NDQsMCwwLC41MTExMV0sNzI4OlswLC42OTQ0NCwuMTA4MDYsMCwuNTExMTFdLDcyOTpbMCwuNjY3ODYsLjExNzUyLDAsLjMwNjY3XSw3MzA6WzAsLjY5NDQ0LDAsMCwuODMxMjldLDczMjpbMCwuNjY3ODYsLjExNTg1LDAsLjUxMTExXSw3MzM6WzAsLjY5NDQ0LC4xMjI1LDAsLjUxMTExXSw5MTU6WzAsLjY4MzMzLC4xMzMwNSwwLC42MjcyMl0sOTE2OlswLC42ODMzMywwLDAsLjgxNzc3XSw5MjA6WzAsLjY4MzMzLC4wOTQwMywwLC43NjY2Nl0sOTIzOlswLC42ODMzMywwLDAsLjY5MjIyXSw5MjY6WzAsLjY4MzMzLC4xNTI5NCwwLC42NjQ0NF0sOTI4OlswLC42ODMzMywuMTYzODksMCwuNzQzMzNdLDkzMTpbMCwuNjgzMzMsLjEyMDI4LDAsLjcxNTU1XSw5MzM6WzAsLjY4MzMzLC4xMTExMSwwLC43NjY2Nl0sOTM0OlswLC42ODMzMywuMDU5ODYsMCwuNzE1NTVdLDkzNjpbMCwuNjgzMzMsLjExMTExLDAsLjc2NjY2XSw5Mzc6WzAsLjY4MzMzLC4xMDI1NywwLC43MTU1NV0sODIxMTpbMCwuNDMwNTYsLjA5MjA4LDAsLjUxMTExXSw4MjEyOlswLC40MzA1NiwuMDkyMDgsMCwxLjAyMjIyXSw4MjE2OlswLC42OTQ0NCwuMTI0MTcsMCwuMzA2NjddLDgyMTc6WzAsLjY5NDQ0LC4xMjQxNywwLC4zMDY2N10sODIyMDpbMCwuNjk0NDQsLjE2ODUsMCwuNTE0NDRdLDgyMjE6WzAsLjY5NDQ0LC4wNjk2MSwwLC41MTQ0NF0sODQ2MzpbMCwuNjg4ODksMCwwLC41NDAyOF19LCJNYWluLVJlZ3VsYXIiOnszMjpbMCwwLDAsMCwuMjVdLDMzOlswLC42OTQ0NCwwLDAsLjI3Nzc4XSwzNDpbMCwuNjk0NDQsMCwwLC41XSwzNTpbLjE5NDQ0LC42OTQ0NCwwLDAsLjgzMzM0XSwzNjpbLjA1NTU2LC43NSwwLDAsLjVdLDM3OlsuMDU1NTYsLjc1LDAsMCwuODMzMzRdLDM4OlswLC42OTQ0NCwwLDAsLjc3Nzc4XSwzOTpbMCwuNjk0NDQsMCwwLC4yNzc3OF0sNDA6Wy4yNSwuNzUsMCwwLC4zODg4OV0sNDE6Wy4yNSwuNzUsMCwwLC4zODg4OV0sNDI6WzAsLjc1LDAsMCwuNV0sNDM6Wy4wODMzMywuNTgzMzMsMCwwLC43Nzc3OF0sNDQ6Wy4xOTQ0NCwuMTA1NTYsMCwwLC4yNzc3OF0sNDU6WzAsLjQzMDU2LDAsMCwuMzMzMzNdLDQ2OlswLC4xMDU1NiwwLDAsLjI3Nzc4XSw0NzpbLjI1LC43NSwwLDAsLjVdLDQ4OlswLC42NDQ0NCwwLDAsLjVdLDQ5OlswLC42NDQ0NCwwLDAsLjVdLDUwOlswLC42NDQ0NCwwLDAsLjVdLDUxOlswLC42NDQ0NCwwLDAsLjVdLDUyOlswLC42NDQ0NCwwLDAsLjVdLDUzOlswLC42NDQ0NCwwLDAsLjVdLDU0OlswLC42NDQ0NCwwLDAsLjVdLDU1OlswLC42NDQ0NCwwLDAsLjVdLDU2OlswLC42NDQ0NCwwLDAsLjVdLDU3OlswLC42NDQ0NCwwLDAsLjVdLDU4OlswLC40MzA1NiwwLDAsLjI3Nzc4XSw1OTpbLjE5NDQ0LC40MzA1NiwwLDAsLjI3Nzc4XSw2MDpbLjAzOTEsLjUzOTEsMCwwLC43Nzc3OF0sNjE6Wy0uMTMzMTMsLjM2Njg3LDAsMCwuNzc3NzhdLDYyOlsuMDM5MSwuNTM5MSwwLDAsLjc3Nzc4XSw2MzpbMCwuNjk0NDQsMCwwLC40NzIyMl0sNjQ6WzAsLjY5NDQ0LDAsMCwuNzc3NzhdLDY1OlswLC42ODMzMywwLDAsLjc1XSw2NjpbMCwuNjgzMzMsMCwwLC43MDgzNF0sNjc6WzAsLjY4MzMzLDAsMCwuNzIyMjJdLDY4OlswLC42ODMzMywwLDAsLjc2Mzg5XSw2OTpbMCwuNjgzMzMsMCwwLC42ODA1Nl0sNzA6WzAsLjY4MzMzLDAsMCwuNjUyNzhdLDcxOlswLC42ODMzMywwLDAsLjc4NDcyXSw3MjpbMCwuNjgzMzMsMCwwLC43NV0sNzM6WzAsLjY4MzMzLDAsMCwuMzYxMTFdLDc0OlswLC42ODMzMywwLDAsLjUxMzg5XSw3NTpbMCwuNjgzMzMsMCwwLC43Nzc3OF0sNzY6WzAsLjY4MzMzLDAsMCwuNjI1XSw3NzpbMCwuNjgzMzMsMCwwLC45MTY2N10sNzg6WzAsLjY4MzMzLDAsMCwuNzVdLDc5OlswLC42ODMzMywwLDAsLjc3Nzc4XSw4MDpbMCwuNjgzMzMsMCwwLC42ODA1Nl0sODE6Wy4xOTQ0NCwuNjgzMzMsMCwwLC43Nzc3OF0sODI6WzAsLjY4MzMzLDAsMCwuNzM2MTFdLDgzOlswLC42ODMzMywwLDAsLjU1NTU2XSw4NDpbMCwuNjgzMzMsMCwwLC43MjIyMl0sODU6WzAsLjY4MzMzLDAsMCwuNzVdLDg2OlswLC42ODMzMywuMDEzODksMCwuNzVdLDg3OlswLC42ODMzMywuMDEzODksMCwxLjAyNzc4XSw4ODpbMCwuNjgzMzMsMCwwLC43NV0sODk6WzAsLjY4MzMzLC4wMjUsMCwuNzVdLDkwOlswLC42ODMzMywwLDAsLjYxMTExXSw5MTpbLjI1LC43NSwwLDAsLjI3Nzc4XSw5MjpbLjI1LC43NSwwLDAsLjVdLDkzOlsuMjUsLjc1LDAsMCwuMjc3NzhdLDk0OlswLC42OTQ0NCwwLDAsLjVdLDk1OlsuMzEsLjEyMDU2LC4wMjc3OCwwLC41XSw5NzpbMCwuNDMwNTYsMCwwLC41XSw5ODpbMCwuNjk0NDQsMCwwLC41NTU1Nl0sOTk6WzAsLjQzMDU2LDAsMCwuNDQ0NDVdLDEwMDpbMCwuNjk0NDQsMCwwLC41NTU1Nl0sMTAxOlswLC40MzA1NiwwLDAsLjQ0NDQ1XSwxMDI6WzAsLjY5NDQ0LC4wNzc3OCwwLC4zMDU1Nl0sMTAzOlsuMTk0NDQsLjQzMDU2LC4wMTM4OSwwLC41XSwxMDQ6WzAsLjY5NDQ0LDAsMCwuNTU1NTZdLDEwNTpbMCwuNjY3ODYsMCwwLC4yNzc3OF0sMTA2OlsuMTk0NDQsLjY2Nzg2LDAsMCwuMzA1NTZdLDEwNzpbMCwuNjk0NDQsMCwwLC41Mjc3OF0sMTA4OlswLC42OTQ0NCwwLDAsLjI3Nzc4XSwxMDk6WzAsLjQzMDU2LDAsMCwuODMzMzRdLDExMDpbMCwuNDMwNTYsMCwwLC41NTU1Nl0sMTExOlswLC40MzA1NiwwLDAsLjVdLDExMjpbLjE5NDQ0LC40MzA1NiwwLDAsLjU1NTU2XSwxMTM6Wy4xOTQ0NCwuNDMwNTYsMCwwLC41Mjc3OF0sMTE0OlswLC40MzA1NiwwLDAsLjM5MTY3XSwxMTU6WzAsLjQzMDU2LDAsMCwuMzk0NDVdLDExNjpbMCwuNjE1MDgsMCwwLC4zODg4OV0sMTE3OlswLC40MzA1NiwwLDAsLjU1NTU2XSwxMTg6WzAsLjQzMDU2LC4wMTM4OSwwLC41Mjc3OF0sMTE5OlswLC40MzA1NiwuMDEzODksMCwuNzIyMjJdLDEyMDpbMCwuNDMwNTYsMCwwLC41Mjc3OF0sMTIxOlsuMTk0NDQsLjQzMDU2LC4wMTM4OSwwLC41Mjc3OF0sMTIyOlswLC40MzA1NiwwLDAsLjQ0NDQ1XSwxMjM6Wy4yNSwuNzUsMCwwLC41XSwxMjQ6Wy4yNSwuNzUsMCwwLC4yNzc3OF0sMTI1OlsuMjUsLjc1LDAsMCwuNV0sMTI2OlsuMzUsLjMxNzg2LDAsMCwuNV0sMTYwOlswLDAsMCwwLC4yNV0sMTYzOlswLC42OTQ0NCwwLDAsLjc2OTA5XSwxNjc6Wy4xOTQ0NCwuNjk0NDQsMCwwLC40NDQ0NV0sMTY4OlswLC42Njc4NiwwLDAsLjVdLDE3MjpbMCwuNDMwNTYsMCwwLC42NjY2N10sMTc2OlswLC42OTQ0NCwwLDAsLjc1XSwxNzc6Wy4wODMzMywuNTgzMzMsMCwwLC43Nzc3OF0sMTgyOlsuMTk0NDQsLjY5NDQ0LDAsMCwuNjExMTFdLDE4NDpbLjE3MDE0LDAsMCwwLC40NDQ0NV0sMTk4OlswLC42ODMzMywwLDAsLjkwMjc4XSwyMTU6Wy4wODMzMywuNTgzMzMsMCwwLC43Nzc3OF0sMjE2OlsuMDQ4NjEsLjczMTk0LDAsMCwuNzc3NzhdLDIyMzpbMCwuNjk0NDQsMCwwLC41XSwyMzA6WzAsLjQzMDU2LDAsMCwuNzIyMjJdLDI0NzpbLjA4MzMzLC41ODMzMywwLDAsLjc3Nzc4XSwyNDg6Wy4wOTcyMiwuNTI3NzgsMCwwLC41XSwzMDU6WzAsLjQzMDU2LDAsMCwuMjc3NzhdLDMzODpbMCwuNjgzMzMsMCwwLDEuMDEzODldLDMzOTpbMCwuNDMwNTYsMCwwLC43Nzc3OF0sNTY3OlsuMTk0NDQsLjQzMDU2LDAsMCwuMzA1NTZdLDcxMDpbMCwuNjk0NDQsMCwwLC41XSw3MTE6WzAsLjYyODQ3LDAsMCwuNV0sNzEzOlswLC41Njc3OCwwLDAsLjVdLDcxNDpbMCwuNjk0NDQsMCwwLC41XSw3MTU6WzAsLjY5NDQ0LDAsMCwuNV0sNzI4OlswLC42OTQ0NCwwLDAsLjVdLDcyOTpbMCwuNjY3ODYsMCwwLC4yNzc3OF0sNzMwOlswLC42OTQ0NCwwLDAsLjc1XSw3MzI6WzAsLjY2Nzg2LDAsMCwuNV0sNzMzOlswLC42OTQ0NCwwLDAsLjVdLDkxNTpbMCwuNjgzMzMsMCwwLC42MjVdLDkxNjpbMCwuNjgzMzMsMCwwLC44MzMzNF0sOTIwOlswLC42ODMzMywwLDAsLjc3Nzc4XSw5MjM6WzAsLjY4MzMzLDAsMCwuNjk0NDVdLDkyNjpbMCwuNjgzMzMsMCwwLC42NjY2N10sOTI4OlswLC42ODMzMywwLDAsLjc1XSw5MzE6WzAsLjY4MzMzLDAsMCwuNzIyMjJdLDkzMzpbMCwuNjgzMzMsMCwwLC43Nzc3OF0sOTM0OlswLC42ODMzMywwLDAsLjcyMjIyXSw5MzY6WzAsLjY4MzMzLDAsMCwuNzc3NzhdLDkzNzpbMCwuNjgzMzMsMCwwLC43MjIyMl0sODIxMTpbMCwuNDMwNTYsLjAyNzc4LDAsLjVdLDgyMTI6WzAsLjQzMDU2LC4wMjc3OCwwLDFdLDgyMTY6WzAsLjY5NDQ0LDAsMCwuMjc3NzhdLDgyMTc6WzAsLjY5NDQ0LDAsMCwuMjc3NzhdLDgyMjA6WzAsLjY5NDQ0LDAsMCwuNV0sODIyMTpbMCwuNjk0NDQsMCwwLC41XSw4MjI0OlsuMTk0NDQsLjY5NDQ0LDAsMCwuNDQ0NDVdLDgyMjU6Wy4xOTQ0NCwuNjk0NDQsMCwwLC40NDQ0NV0sODIzMDpbMCwuMTIzLDAsMCwxLjE3Ml0sODI0MjpbMCwuNTU1NTYsMCwwLC4yNzVdLDg0MDc6WzAsLjcxNDQ0LC4xNTM4MiwwLC41XSw4NDYzOlswLC42ODg4OSwwLDAsLjU0MDI4XSw4NDY1OlswLC42OTQ0NCwwLDAsLjcyMjIyXSw4NDY3OlswLC42OTQ0NCwwLC4xMTExMSwuNDE2NjddLDg0NzI6Wy4xOTQ0NCwuNDMwNTYsMCwuMTExMTEsLjYzNjQ2XSw4NDc2OlswLC42OTQ0NCwwLDAsLjcyMjIyXSw4NTAxOlswLC42OTQ0NCwwLDAsLjYxMTExXSw4NTkyOlstLjEzMzEzLC4zNjY4NywwLDAsMV0sODU5MzpbLjE5NDQ0LC42OTQ0NCwwLDAsLjVdLDg1OTQ6Wy0uMTMzMTMsLjM2Njg3LDAsMCwxXSw4NTk1OlsuMTk0NDQsLjY5NDQ0LDAsMCwuNV0sODU5NjpbLS4xMzMxMywuMzY2ODcsMCwwLDFdLDg1OTc6Wy4yNSwuNzUsMCwwLC41XSw4NTk4OlsuMTk0NDQsLjY5NDQ0LDAsMCwxXSw4NTk5OlsuMTk0NDQsLjY5NDQ0LDAsMCwxXSw4NjAwOlsuMTk0NDQsLjY5NDQ0LDAsMCwxXSw4NjAxOlsuMTk0NDQsLjY5NDQ0LDAsMCwxXSw4NjE0OlsuMDExLC41MTEsMCwwLDFdLDg2MTc6Wy4wMTEsLjUxMSwwLDAsMS4xMjZdLDg2MTg6Wy4wMTEsLjUxMSwwLDAsMS4xMjZdLDg2MzY6Wy0uMTMzMTMsLjM2Njg3LDAsMCwxXSw4NjM3OlstLjEzMzEzLC4zNjY4NywwLDAsMV0sODY0MDpbLS4xMzMxMywuMzY2ODcsMCwwLDFdLDg2NDE6Wy0uMTMzMTMsLjM2Njg3LDAsMCwxXSw4NjUyOlsuMDExLC42NzEsMCwwLDFdLDg2NTY6Wy0uMTMzMTMsLjM2Njg3LDAsMCwxXSw4NjU3OlsuMTk0NDQsLjY5NDQ0LDAsMCwuNjExMTFdLDg2NTg6Wy0uMTMzMTMsLjM2Njg3LDAsMCwxXSw4NjU5OlsuMTk0NDQsLjY5NDQ0LDAsMCwuNjExMTFdLDg2NjA6Wy0uMTMzMTMsLjM2Njg3LDAsMCwxXSw4NjYxOlsuMjUsLjc1LDAsMCwuNjExMTFdLDg3MDQ6WzAsLjY5NDQ0LDAsMCwuNTU1NTZdLDg3MDY6WzAsLjY5NDQ0LC4wNTU1NiwuMDgzMzQsLjUzMDldLDg3MDc6WzAsLjY5NDQ0LDAsMCwuNTU1NTZdLDg3MDk6Wy4wNTU1NiwuNzUsMCwwLC41XSw4NzExOlswLC42ODMzMywwLDAsLjgzMzM0XSw4NzEyOlsuMDM5MSwuNTM5MSwwLDAsLjY2NjY3XSw4NzE1OlsuMDM5MSwuNTM5MSwwLDAsLjY2NjY3XSw4NzIyOlsuMDgzMzMsLjU4MzMzLDAsMCwuNzc3NzhdLDg3MjM6Wy4wODMzMywuNTgzMzMsMCwwLC43Nzc3OF0sODcyNTpbLjI1LC43NSwwLDAsLjVdLDg3MjY6Wy4yNSwuNzUsMCwwLC41XSw4NzI3OlstLjAzNDcyLC40NjUyOCwwLDAsLjVdLDg3Mjg6Wy0uMDU1NTUsLjQ0NDQ1LDAsMCwuNV0sODcyOTpbLS4wNTU1NSwuNDQ0NDUsMCwwLC41XSw4NzMwOlsuMiwuOCwwLDAsLjgzMzM0XSw4NzMzOlswLC40MzA1NiwwLDAsLjc3Nzc4XSw4NzM0OlswLC40MzA1NiwwLDAsMV0sODczNjpbMCwuNjkyMjQsMCwwLC43MjIyMl0sODczOTpbLjI1LC43NSwwLDAsLjI3Nzc4XSw4NzQxOlsuMjUsLjc1LDAsMCwuNV0sODc0MzpbMCwuNTU1NTYsMCwwLC42NjY2N10sODc0NDpbMCwuNTU1NTYsMCwwLC42NjY2N10sODc0NTpbMCwuNTU1NTYsMCwwLC42NjY2N10sODc0NjpbMCwuNTU1NTYsMCwwLC42NjY2N10sODc0NzpbLjE5NDQ0LC42OTQ0NCwuMTExMTEsMCwuNDE2NjddLDg3NjQ6Wy0uMTMzMTMsLjM2Njg3LDAsMCwuNzc3NzhdLDg3Njg6Wy4xOTQ0NCwuNjk0NDQsMCwwLC4yNzc3OF0sODc3MTpbLS4wMzYyNSwuNDYzNzUsMCwwLC43Nzc3OF0sODc3MzpbLS4wMjIsLjU4OSwwLDAsLjc3OF0sODc3NjpbLS4wMTY4OCwuNDgzMTIsMCwwLC43Nzc3OF0sODc4MTpbLS4wMzYyNSwuNDYzNzUsMCwwLC43Nzc3OF0sODc4NDpbLS4xMzMsLjY3MywwLDAsLjc3OF0sODgwMTpbLS4wMzYyNSwuNDYzNzUsMCwwLC43Nzc3OF0sODgwNDpbLjEzNTk3LC42MzU5NywwLDAsLjc3Nzc4XSw4ODA1OlsuMTM1OTcsLjYzNTk3LDAsMCwuNzc3NzhdLDg4MTA6Wy4wMzkxLC41MzkxLDAsMCwxXSw4ODExOlsuMDM5MSwuNTM5MSwwLDAsMV0sODgyNjpbLjAzOTEsLjUzOTEsMCwwLC43Nzc3OF0sODgyNzpbLjAzOTEsLjUzOTEsMCwwLC43Nzc3OF0sODgzNDpbLjAzOTEsLjUzOTEsMCwwLC43Nzc3OF0sODgzNTpbLjAzOTEsLjUzOTEsMCwwLC43Nzc3OF0sODgzODpbLjEzNTk3LC42MzU5NywwLDAsLjc3Nzc4XSw4ODM5OlsuMTM1OTcsLjYzNTk3LDAsMCwuNzc3NzhdLDg4NDY6WzAsLjU1NTU2LDAsMCwuNjY2NjddLDg4NDk6Wy4xMzU5NywuNjM1OTcsMCwwLC43Nzc3OF0sODg1MDpbLjEzNTk3LC42MzU5NywwLDAsLjc3Nzc4XSw4ODUxOlswLC41NTU1NiwwLDAsLjY2NjY3XSw4ODUyOlswLC41NTU1NiwwLDAsLjY2NjY3XSw4ODUzOlsuMDgzMzMsLjU4MzMzLDAsMCwuNzc3NzhdLDg4NTQ6Wy4wODMzMywuNTgzMzMsMCwwLC43Nzc3OF0sODg1NTpbLjA4MzMzLC41ODMzMywwLDAsLjc3Nzc4XSw4ODU2OlsuMDgzMzMsLjU4MzMzLDAsMCwuNzc3NzhdLDg4NTc6Wy4wODMzMywuNTgzMzMsMCwwLC43Nzc3OF0sODg2NjpbMCwuNjk0NDQsMCwwLC42MTExMV0sODg2NzpbMCwuNjk0NDQsMCwwLC42MTExMV0sODg2ODpbMCwuNjk0NDQsMCwwLC43Nzc3OF0sODg2OTpbMCwuNjk0NDQsMCwwLC43Nzc3OF0sODg3MjpbLjI0OSwuNzUsMCwwLC44NjddLDg5MDA6Wy0uMDU1NTUsLjQ0NDQ1LDAsMCwuNV0sODkwMTpbLS4wNTU1NSwuNDQ0NDUsMCwwLC4yNzc3OF0sODkwMjpbLS4wMzQ3MiwuNDY1MjgsMCwwLC41XSw4OTA0OlsuMDA1LC41MDUsMCwwLC45XSw4OTQyOlsuMDMsLjkwMywwLDAsLjI3OF0sODk0MzpbLS4xOSwuMzEzLDAsMCwxLjE3Ml0sODk0NTpbLS4xLC44MjMsMCwwLDEuMjgyXSw4OTY4OlsuMjUsLjc1LDAsMCwuNDQ0NDVdLDg5Njk6Wy4yNSwuNzUsMCwwLC40NDQ0NV0sODk3MDpbLjI1LC43NSwwLDAsLjQ0NDQ1XSw4OTcxOlsuMjUsLjc1LDAsMCwuNDQ0NDVdLDg5OTQ6Wy0uMTQyMzYsLjM1NzY0LDAsMCwxXSw4OTk1OlstLjE0MjM2LC4zNTc2NCwwLDAsMV0sOTEzNjpbLjI0NCwuNzQ0LDAsMCwuNDEyXSw5MTM3OlsuMjQ0LC43NDUsMCwwLC40MTJdLDk2NTE6Wy4xOTQ0NCwuNjk0NDQsMCwwLC44ODg4OV0sOTY1NzpbLS4wMzQ3MiwuNDY1MjgsMCwwLC41XSw5NjYxOlsuMTk0NDQsLjY5NDQ0LDAsMCwuODg4ODldLDk2Njc6Wy0uMDM0NzIsLjQ2NTI4LDAsMCwuNV0sOTcxMTpbLjE5NDQ0LC42OTQ0NCwwLDAsMV0sOTgyNDpbLjEyOTYzLC42OTQ0NCwwLDAsLjc3Nzc4XSw5ODI1OlsuMTI5NjMsLjY5NDQ0LDAsMCwuNzc3NzhdLDk4MjY6Wy4xMjk2MywuNjk0NDQsMCwwLC43Nzc3OF0sOTgyNzpbLjEyOTYzLC42OTQ0NCwwLDAsLjc3Nzc4XSw5ODM3OlswLC43NSwwLDAsLjM4ODg5XSw5ODM4OlsuMTk0NDQsLjY5NDQ0LDAsMCwuMzg4ODldLDk4Mzk6Wy4xOTQ0NCwuNjk0NDQsMCwwLC4zODg4OV0sMTAyMTY6Wy4yNSwuNzUsMCwwLC4zODg4OV0sMTAyMTc6Wy4yNSwuNzUsMCwwLC4zODg4OV0sMTAyMjI6Wy4yNDQsLjc0NCwwLDAsLjQxMl0sMTAyMjM6Wy4yNDQsLjc0NSwwLDAsLjQxMl0sMTAyMjk6Wy4wMTEsLjUxMSwwLDAsMS42MDldLDEwMjMwOlsuMDExLC41MTEsMCwwLDEuNjM4XSwxMDIzMTpbLjAxMSwuNTExLDAsMCwxLjg1OV0sMTAyMzI6Wy4wMjQsLjUyNSwwLDAsMS42MDldLDEwMjMzOlsuMDI0LC41MjUsMCwwLDEuNjM4XSwxMDIzNDpbLjAyNCwuNTI1LDAsMCwxLjg1OF0sMTAyMzY6Wy4wMTEsLjUxMSwwLDAsMS42MzhdLDEwODE1OlswLC42ODMzMywwLDAsLjc1XSwxMDkyNzpbLjEzNTk3LC42MzU5NywwLDAsLjc3Nzc4XSwxMDkyODpbLjEzNTk3LC42MzU5NywwLDAsLjc3Nzc4XSw1NzM3NjpbLjE5NDQ0LC42OTQ0NCwwLDAsMF19LCJNYXRoLUJvbGRJdGFsaWMiOnszMjpbMCwwLDAsMCwuMjVdLDQ4OlswLC40NDQ0NCwwLDAsLjU3NV0sNDk6WzAsLjQ0NDQ0LDAsMCwuNTc1XSw1MDpbMCwuNDQ0NDQsMCwwLC41NzVdLDUxOlsuMTk0NDQsLjQ0NDQ0LDAsMCwuNTc1XSw1MjpbLjE5NDQ0LC40NDQ0NCwwLDAsLjU3NV0sNTM6Wy4xOTQ0NCwuNDQ0NDQsMCwwLC41NzVdLDU0OlswLC42NDQ0NCwwLDAsLjU3NV0sNTU6Wy4xOTQ0NCwuNDQ0NDQsMCwwLC41NzVdLDU2OlswLC42NDQ0NCwwLDAsLjU3NV0sNTc6Wy4xOTQ0NCwuNDQ0NDQsMCwwLC41NzVdLDY1OlswLC42ODYxMSwwLDAsLjg2OTQ0XSw2NjpbMCwuNjg2MTEsLjA0ODM1LDAsLjg2NjRdLDY3OlswLC42ODYxMSwuMDY5NzksMCwuODE2OTRdLDY4OlswLC42ODYxMSwuMDMxOTQsMCwuOTM4MTJdLDY5OlswLC42ODYxMSwuMDU0NTEsMCwuODEwMDddLDcwOlswLC42ODYxMSwuMTU5NzIsMCwuNjg4ODldLDcxOlswLC42ODYxMSwwLDAsLjg4NjczXSw3MjpbMCwuNjg2MTEsLjA4MjI5LDAsLjk4MjI5XSw3MzpbMCwuNjg2MTEsLjA3Nzc4LDAsLjUxMTExXSw3NDpbMCwuNjg2MTEsLjEwMDY5LDAsLjYzMTI1XSw3NTpbMCwuNjg2MTEsLjA2OTc5LDAsLjk3MTE4XSw3NjpbMCwuNjg2MTEsMCwwLC43NTU1NV0sNzc6WzAsLjY4NjExLC4xMTQyNCwwLDEuMTQyMDFdLDc4OlswLC42ODYxMSwuMTE0MjQsMCwuOTUwMzRdLDc5OlswLC42ODYxMSwuMDMxOTQsMCwuODM2NjZdLDgwOlswLC42ODYxMSwuMTU5NzIsMCwuNzIzMDldLDgxOlsuMTk0NDQsLjY4NjExLDAsMCwuODY4NjFdLDgyOlswLC42ODYxMSwuMDA0MjEsMCwuODcyMzVdLDgzOlswLC42ODYxMSwuMDUzODIsMCwuNjkyNzFdLDg0OlswLC42ODYxMSwuMTU5NzIsMCwuNjM2NjNdLDg1OlswLC42ODYxMSwuMTE0MjQsMCwuODAwMjddLDg2OlswLC42ODYxMSwuMjU1NTUsMCwuNjc3NzhdLDg3OlswLC42ODYxMSwuMTU5NzIsMCwxLjA5MzA1XSw4ODpbMCwuNjg2MTEsLjA3Nzc4LDAsLjk0NzIyXSw4OTpbMCwuNjg2MTEsLjI1NTU1LDAsLjY3NDU4XSw5MDpbMCwuNjg2MTEsLjA2OTc5LDAsLjc3MjU3XSw5NzpbMCwuNDQ0NDQsMCwwLC42MzI4N10sOTg6WzAsLjY5NDQ0LDAsMCwuNTIwODNdLDk5OlswLC40NDQ0NCwwLDAsLjUxMzQyXSwxMDA6WzAsLjY5NDQ0LDAsMCwuNjA5NzJdLDEwMTpbMCwuNDQ0NDQsMCwwLC41NTM2MV0sMTAyOlsuMTk0NDQsLjY5NDQ0LC4xMTA0MiwwLC41NjgwNl0sMTAzOlsuMTk0NDQsLjQ0NDQ0LC4wMzcwNCwwLC41NDQ5XSwxMDQ6WzAsLjY5NDQ0LDAsMCwuNjY3NTldLDEwNTpbMCwuNjkzMjYsMCwwLC40MDQ4XSwxMDY6Wy4xOTQ0NCwuNjkzMjYsLjA2MjIsMCwuNDcwODNdLDEwNzpbMCwuNjk0NDQsLjAxODUyLDAsLjYwMzddLDEwODpbMCwuNjk0NDQsLjAwODgsMCwuMzQ4MTVdLDEwOTpbMCwuNDQ0NDQsMCwwLDEuMDMyNF0sMTEwOlswLC40NDQ0NCwwLDAsLjcxMjk2XSwxMTE6WzAsLjQ0NDQ0LDAsMCwuNTg0NzJdLDExMjpbLjE5NDQ0LC40NDQ0NCwwLDAsLjYwMDkyXSwxMTM6Wy4xOTQ0NCwuNDQ0NDQsLjAzNzA0LDAsLjU0MjEzXSwxMTQ6WzAsLjQ0NDQ0LC4wMzE5NCwwLC41Mjg3XSwxMTU6WzAsLjQ0NDQ0LDAsMCwuNTMxMjVdLDExNjpbMCwuNjM0OTIsMCwwLC40MTUyOF0sMTE3OlswLC40NDQ0NCwwLDAsLjY4MTAyXSwxMTg6WzAsLjQ0NDQ0LC4wMzcwNCwwLC41NjY2Nl0sMTE5OlswLC40NDQ0NCwuMDI3NzgsMCwuODMxNDhdLDEyMDpbMCwuNDQ0NDQsMCwwLC42NTkwM10sMTIxOlsuMTk0NDQsLjQ0NDQ0LC4wMzcwNCwwLC41OTAyOF0sMTIyOlswLC40NDQ0NCwuMDQyMTMsMCwuNTU1MDldLDE2MDpbMCwwLDAsMCwuMjVdLDkxNTpbMCwuNjg2MTEsLjE1OTcyLDAsLjY1Njk0XSw5MTY6WzAsLjY4NjExLDAsMCwuOTU4MzNdLDkyMDpbMCwuNjg2MTEsLjAzMTk0LDAsLjg2NzIyXSw5MjM6WzAsLjY4NjExLDAsMCwuODA1NTVdLDkyNjpbMCwuNjg2MTEsLjA3NDU4LDAsLjg0MTI1XSw5Mjg6WzAsLjY4NjExLC4wODIyOSwwLC45ODIyOV0sOTMxOlswLC42ODYxMSwuMDU0NTEsMCwuODg1MDddLDkzMzpbMCwuNjg2MTEsLjE1OTcyLDAsLjY3MDgzXSw5MzQ6WzAsLjY4NjExLDAsMCwuNzY2NjZdLDkzNjpbMCwuNjg2MTEsLjExNjUzLDAsLjcxNDAyXSw5Mzc6WzAsLjY4NjExLC4wNDgzNSwwLC44Nzg5XSw5NDU6WzAsLjQ0NDQ0LDAsMCwuNzYwNjRdLDk0NjpbLjE5NDQ0LC42OTQ0NCwuMDM0MDMsMCwuNjU5NzJdLDk0NzpbLjE5NDQ0LC40NDQ0NCwuMDYzODksMCwuNTkwMDNdLDk0ODpbMCwuNjk0NDQsLjAzODE5LDAsLjUyMjIyXSw5NDk6WzAsLjQ0NDQ0LDAsMCwuNTI4ODJdLDk1MDpbLjE5NDQ0LC42OTQ0NCwuMDYyMTUsMCwuNTA4MzNdLDk1MTpbLjE5NDQ0LC40NDQ0NCwuMDM3MDQsMCwuNl0sOTUyOlswLC42OTQ0NCwuMDMxOTQsMCwuNTYxOF0sOTUzOlswLC40NDQ0NCwwLDAsLjQxMjA0XSw5NTQ6WzAsLjQ0NDQ0LDAsMCwuNjY3NTldLDk1NTpbMCwuNjk0NDQsMCwwLC42NzA4M10sOTU2OlsuMTk0NDQsLjQ0NDQ0LDAsMCwuNzA3ODddLDk1NzpbMCwuNDQ0NDQsLjA2ODk4LDAsLjU3Njg1XSw5NTg6Wy4xOTQ0NCwuNjk0NDQsLjAzMDIxLDAsLjUwODMzXSw5NTk6WzAsLjQ0NDQ0LDAsMCwuNTg0NzJdLDk2MDpbMCwuNDQ0NDQsLjAzNzA0LDAsLjY4MjQxXSw5NjE6Wy4xOTQ0NCwuNDQ0NDQsMCwwLC42MTE4XSw5NjI6Wy4wOTcyMiwuNDQ0NDQsLjA3OTE3LDAsLjQyMzYxXSw5NjM6WzAsLjQ0NDQ0LC4wMzcwNCwwLC42ODU4OF0sOTY0OlswLC40NDQ0NCwuMTM0NzIsMCwuNTIwODNdLDk2NTpbMCwuNDQ0NDQsLjAzNzA0LDAsLjYzMDU1XSw5NjY6Wy4xOTQ0NCwuNDQ0NDQsMCwwLC43NDcyMl0sOTY3OlsuMTk0NDQsLjQ0NDQ0LDAsMCwuNzE4MDVdLDk2ODpbLjE5NDQ0LC42OTQ0NCwuMDM3MDQsMCwuNzU4MzNdLDk2OTpbMCwuNDQ0NDQsLjAzNzA0LDAsLjcxNzgyXSw5Nzc6WzAsLjY5NDQ0LDAsMCwuNjkxNTVdLDk4MTpbLjE5NDQ0LC42OTQ0NCwwLDAsLjcxMjVdLDk4MjpbMCwuNDQ0NDQsLjAzMTk0LDAsLjk3NV0sMTAwOTpbLjE5NDQ0LC40NDQ0NCwwLDAsLjYxMThdLDEwMTM6WzAsLjQ0NDQ0LDAsMCwuNDgzMzNdLDU3NjQ5OlswLC40NDQ0NCwwLDAsLjM5MzUyXSw1NzkxMTpbLjE5NDQ0LC40NDQ0NCwwLDAsLjQzODg5XX0sIk1hdGgtSXRhbGljIjp7MzI6WzAsMCwwLDAsLjI1XSw0ODpbMCwuNDMwNTYsMCwwLC41XSw0OTpbMCwuNDMwNTYsMCwwLC41XSw1MDpbMCwuNDMwNTYsMCwwLC41XSw1MTpbLjE5NDQ0LC40MzA1NiwwLDAsLjVdLDUyOlsuMTk0NDQsLjQzMDU2LDAsMCwuNV0sNTM6Wy4xOTQ0NCwuNDMwNTYsMCwwLC41XSw1NDpbMCwuNjQ0NDQsMCwwLC41XSw1NTpbLjE5NDQ0LC40MzA1NiwwLDAsLjVdLDU2OlswLC42NDQ0NCwwLDAsLjVdLDU3OlsuMTk0NDQsLjQzMDU2LDAsMCwuNV0sNjU6WzAsLjY4MzMzLDAsLjEzODg5LC43NV0sNjY6WzAsLjY4MzMzLC4wNTAxNywuMDgzMzQsLjc1ODUxXSw2NzpbMCwuNjgzMzMsLjA3MTUzLC4wODMzNCwuNzE0NzJdLDY4OlswLC42ODMzMywuMDI3NzgsLjA1NTU2LC44Mjc5Ml0sNjk6WzAsLjY4MzMzLC4wNTc2NCwuMDgzMzQsLjczODJdLDcwOlswLC42ODMzMywuMTM4ODksLjA4MzM0LC42NDMwNl0sNzE6WzAsLjY4MzMzLDAsLjA4MzM0LC43ODYyNV0sNzI6WzAsLjY4MzMzLC4wODEyNSwuMDU1NTYsLjgzMTI1XSw3MzpbMCwuNjgzMzMsLjA3ODQ3LC4xMTExMSwuNDM5NThdLDc0OlswLC42ODMzMywuMDk2MTgsLjE2NjY3LC41NTQ1MV0sNzU6WzAsLjY4MzMzLC4wNzE1MywuMDU1NTYsLjg0OTMxXSw3NjpbMCwuNjgzMzMsMCwuMDI3NzgsLjY4MDU2XSw3NzpbMCwuNjgzMzMsLjEwOTAzLC4wODMzNCwuOTcwMTRdLDc4OlswLC42ODMzMywuMTA5MDMsLjA4MzM0LC44MDM0N10sNzk6WzAsLjY4MzMzLC4wMjc3OCwuMDgzMzQsLjc2Mjc4XSw4MDpbMCwuNjgzMzMsLjEzODg5LC4wODMzNCwuNjQyMDFdLDgxOlsuMTk0NDQsLjY4MzMzLDAsLjA4MzM0LC43OTA1Nl0sODI6WzAsLjY4MzMzLC4wMDc3MywuMDgzMzQsLjc1OTI5XSw4MzpbMCwuNjgzMzMsLjA1NzY0LC4wODMzNCwuNjEzMl0sODQ6WzAsLjY4MzMzLC4xMzg4OSwuMDgzMzQsLjU4NDM4XSw4NTpbMCwuNjgzMzMsLjEwOTAzLC4wMjc3OCwuNjgyNzhdLDg2OlswLC42ODMzMywuMjIyMjIsMCwuNTgzMzNdLDg3OlswLC42ODMzMywuMTM4ODksMCwuOTQ0NDVdLDg4OlswLC42ODMzMywuMDc4NDcsLjA4MzM0LC44Mjg0N10sODk6WzAsLjY4MzMzLC4yMjIyMiwwLC41ODA1Nl0sOTA6WzAsLjY4MzMzLC4wNzE1MywuMDgzMzQsLjY4MjY0XSw5NzpbMCwuNDMwNTYsMCwwLC41Mjg1OV0sOTg6WzAsLjY5NDQ0LDAsMCwuNDI5MTddLDk5OlswLC40MzA1NiwwLC4wNTU1NiwuNDMyNzZdLDEwMDpbMCwuNjk0NDQsMCwuMTY2NjcsLjUyMDQ5XSwxMDE6WzAsLjQzMDU2LDAsLjA1NTU2LC40NjU2M10sMTAyOlsuMTk0NDQsLjY5NDQ0LC4xMDc2NCwuMTY2NjcsLjQ4OTU5XSwxMDM6Wy4xOTQ0NCwuNDMwNTYsLjAzNTg4LC4wMjc3OCwuNDc2OTddLDEwNDpbMCwuNjk0NDQsMCwwLC41NzYxNl0sMTA1OlswLC42NTk1MiwwLDAsLjM0NDUxXSwxMDY6Wy4xOTQ0NCwuNjU5NTIsLjA1NzI0LDAsLjQxMTgxXSwxMDc6WzAsLjY5NDQ0LC4wMzE0OCwwLC41MjA2XSwxMDg6WzAsLjY5NDQ0LC4wMTk2OCwuMDgzMzQsLjI5ODM4XSwxMDk6WzAsLjQzMDU2LDAsMCwuODc4MDFdLDExMDpbMCwuNDMwNTYsMCwwLC42MDAyM10sMTExOlswLC40MzA1NiwwLC4wNTU1NiwuNDg0NzJdLDExMjpbLjE5NDQ0LC40MzA1NiwwLC4wODMzNCwuNTAzMTNdLDExMzpbLjE5NDQ0LC40MzA1NiwuMDM1ODgsLjA4MzM0LC40NDY0MV0sMTE0OlswLC40MzA1NiwuMDI3NzgsLjA1NTU2LC40NTExNl0sMTE1OlswLC40MzA1NiwwLC4wNTU1NiwuNDY4NzVdLDExNjpbMCwuNjE1MDgsMCwuMDgzMzQsLjM2MTExXSwxMTc6WzAsLjQzMDU2LDAsLjAyNzc4LC41NzI0Nl0sMTE4OlswLC40MzA1NiwuMDM1ODgsLjAyNzc4LC40ODQ3Ml0sMTE5OlswLC40MzA1NiwuMDI2OTEsLjA4MzM0LC43MTU5Ml0sMTIwOlswLC40MzA1NiwwLC4wMjc3OCwuNTcxNTNdLDEyMTpbLjE5NDQ0LC40MzA1NiwuMDM1ODgsLjA1NTU2LC40OTAyOF0sMTIyOlswLC40MzA1NiwuMDQzOTgsLjA1NTU2LC40NjUwNV0sMTYwOlswLDAsMCwwLC4yNV0sOTE1OlswLC42ODMzMywuMTM4ODksLjA4MzM0LC42MTUyOF0sOTE2OlswLC42ODMzMywwLC4xNjY2NywuODMzMzRdLDkyMDpbMCwuNjgzMzMsLjAyNzc4LC4wODMzNCwuNzYyNzhdLDkyMzpbMCwuNjgzMzMsMCwuMTY2NjcsLjY5NDQ1XSw5MjY6WzAsLjY4MzMzLC4wNzU2OSwuMDgzMzQsLjc0MjM2XSw5Mjg6WzAsLjY4MzMzLC4wODEyNSwuMDU1NTYsLjgzMTI1XSw5MzE6WzAsLjY4MzMzLC4wNTc2NCwuMDgzMzQsLjc3OTg2XSw5MzM6WzAsLjY4MzMzLC4xMzg4OSwuMDU1NTYsLjU4MzMzXSw5MzQ6WzAsLjY4MzMzLDAsLjA4MzM0LC42NjY2N10sOTM2OlswLC42ODMzMywuMTEsLjA1NTU2LC42MTIyMl0sOTM3OlswLC42ODMzMywuMDUwMTcsLjA4MzM0LC43NzI0XSw5NDU6WzAsLjQzMDU2LC4wMDM3LC4wMjc3OCwuNjM5N10sOTQ2OlsuMTk0NDQsLjY5NDQ0LC4wNTI3OCwuMDgzMzQsLjU2NTYzXSw5NDc6Wy4xOTQ0NCwuNDMwNTYsLjA1NTU2LDAsLjUxNzczXSw5NDg6WzAsLjY5NDQ0LC4wMzc4NSwuMDU1NTYsLjQ0NDQ0XSw5NDk6WzAsLjQzMDU2LDAsLjA4MzM0LC40NjYzMl0sOTUwOlsuMTk0NDQsLjY5NDQ0LC4wNzM3OCwuMDgzMzQsLjQzNzVdLDk1MTpbLjE5NDQ0LC40MzA1NiwuMDM1ODgsLjA1NTU2LC40OTY1M10sOTUyOlswLC42OTQ0NCwuMDI3NzgsLjA4MzM0LC40Njk0NF0sOTUzOlswLC40MzA1NiwwLC4wNTU1NiwuMzUzOTRdLDk1NDpbMCwuNDMwNTYsMCwwLC41NzYxNl0sOTU1OlswLC42OTQ0NCwwLDAsLjU4MzM0XSw5NTY6Wy4xOTQ0NCwuNDMwNTYsMCwuMDI3NzgsLjYwMjU1XSw5NTc6WzAsLjQzMDU2LC4wNjM2NiwuMDI3NzgsLjQ5Mzk4XSw5NTg6Wy4xOTQ0NCwuNjk0NDQsLjA0NjAxLC4xMTExMSwuNDM3NV0sOTU5OlswLC40MzA1NiwwLC4wNTU1NiwuNDg0NzJdLDk2MDpbMCwuNDMwNTYsLjAzNTg4LDAsLjU3MDAzXSw5NjE6Wy4xOTQ0NCwuNDMwNTYsMCwuMDgzMzQsLjUxNzAyXSw5NjI6Wy4wOTcyMiwuNDMwNTYsLjA3OTg2LC4wODMzNCwuMzYyODVdLDk2MzpbMCwuNDMwNTYsLjAzNTg4LDAsLjU3MTQxXSw5NjQ6WzAsLjQzMDU2LC4xMTMyLC4wMjc3OCwuNDM3MTVdLDk2NTpbMCwuNDMwNTYsLjAzNTg4LC4wMjc3OCwuNTQwMjhdLDk2NjpbLjE5NDQ0LC40MzA1NiwwLC4wODMzNCwuNjU0MTddLDk2NzpbLjE5NDQ0LC40MzA1NiwwLC4wNTU1NiwuNjI1NjldLDk2ODpbLjE5NDQ0LC42OTQ0NCwuMDM1ODgsLjExMTExLC42NTEzOV0sOTY5OlswLC40MzA1NiwuMDM1ODgsMCwuNjIyNDVdLDk3NzpbMCwuNjk0NDQsMCwuMDgzMzQsLjU5MTQ0XSw5ODE6Wy4xOTQ0NCwuNjk0NDQsMCwuMDgzMzQsLjU5NTgzXSw5ODI6WzAsLjQzMDU2LC4wMjc3OCwwLC44MjgxM10sMTAwOTpbLjE5NDQ0LC40MzA1NiwwLC4wODMzNCwuNTE3MDJdLDEwMTM6WzAsLjQzMDU2LDAsLjA1NTU2LC40MDU5XSw1NzY0OTpbMCwuNDMwNTYsMCwuMDI3NzgsLjMyMjQ2XSw1NzkxMTpbLjE5NDQ0LC40MzA1NiwwLC4wODMzNCwuMzg0MDNdfSwiU2Fuc1NlcmlmLUJvbGQiOnszMjpbMCwwLDAsMCwuMjVdLDMzOlswLC42OTQ0NCwwLDAsLjM2NjY3XSwzNDpbMCwuNjk0NDQsMCwwLC41NTgzNF0sMzU6Wy4xOTQ0NCwuNjk0NDQsMCwwLC45MTY2N10sMzY6Wy4wNTU1NiwuNzUsMCwwLC41NV0sMzc6Wy4wNTU1NiwuNzUsMCwwLDEuMDI5MTJdLDM4OlswLC42OTQ0NCwwLDAsLjgzMDU2XSwzOTpbMCwuNjk0NDQsMCwwLC4zMDU1Nl0sNDA6Wy4yNSwuNzUsMCwwLC40Mjc3OF0sNDE6Wy4yNSwuNzUsMCwwLC40Mjc3OF0sNDI6WzAsLjc1LDAsMCwuNTVdLDQzOlsuMTE2NjcsLjYxNjY3LDAsMCwuODU1NTZdLDQ0OlsuMTA1NTYsLjEzMDU2LDAsMCwuMzA1NTZdLDQ1OlswLC40NTgzMywwLDAsLjM2NjY3XSw0NjpbMCwuMTMwNTYsMCwwLC4zMDU1Nl0sNDc6Wy4yNSwuNzUsMCwwLC41NV0sNDg6WzAsLjY5NDQ0LDAsMCwuNTVdLDQ5OlswLC42OTQ0NCwwLDAsLjU1XSw1MDpbMCwuNjk0NDQsMCwwLC41NV0sNTE6WzAsLjY5NDQ0LDAsMCwuNTVdLDUyOlswLC42OTQ0NCwwLDAsLjU1XSw1MzpbMCwuNjk0NDQsMCwwLC41NV0sNTQ6WzAsLjY5NDQ0LDAsMCwuNTVdLDU1OlswLC42OTQ0NCwwLDAsLjU1XSw1NjpbMCwuNjk0NDQsMCwwLC41NV0sNTc6WzAsLjY5NDQ0LDAsMCwuNTVdLDU4OlswLC40NTgzMywwLDAsLjMwNTU2XSw1OTpbLjEwNTU2LC40NTgzMywwLDAsLjMwNTU2XSw2MTpbLS4wOTM3NSwuNDA2MjUsMCwwLC44NTU1Nl0sNjM6WzAsLjY5NDQ0LDAsMCwuNTE5NDVdLDY0OlswLC42OTQ0NCwwLDAsLjczMzM0XSw2NTpbMCwuNjk0NDQsMCwwLC43MzMzNF0sNjY6WzAsLjY5NDQ0LDAsMCwuNzMzMzRdLDY3OlswLC42OTQ0NCwwLDAsLjcwMjc4XSw2ODpbMCwuNjk0NDQsMCwwLC43OTQ0NV0sNjk6WzAsLjY5NDQ0LDAsMCwuNjQxNjddLDcwOlswLC42OTQ0NCwwLDAsLjYxMTExXSw3MTpbMCwuNjk0NDQsMCwwLC43MzMzNF0sNzI6WzAsLjY5NDQ0LDAsMCwuNzk0NDVdLDczOlswLC42OTQ0NCwwLDAsLjMzMDU2XSw3NDpbMCwuNjk0NDQsMCwwLC41MTk0NV0sNzU6WzAsLjY5NDQ0LDAsMCwuNzYzODldLDc2OlswLC42OTQ0NCwwLDAsLjU4MDU2XSw3NzpbMCwuNjk0NDQsMCwwLC45Nzc3OF0sNzg6WzAsLjY5NDQ0LDAsMCwuNzk0NDVdLDc5OlswLC42OTQ0NCwwLDAsLjc5NDQ1XSw4MDpbMCwuNjk0NDQsMCwwLC43MDI3OF0sODE6Wy4xMDU1NiwuNjk0NDQsMCwwLC43OTQ0NV0sODI6WzAsLjY5NDQ0LDAsMCwuNzAyNzhdLDgzOlswLC42OTQ0NCwwLDAsLjYxMTExXSw4NDpbMCwuNjk0NDQsMCwwLC43MzMzNF0sODU6WzAsLjY5NDQ0LDAsMCwuNzYzODldLDg2OlswLC42OTQ0NCwuMDE1MjgsMCwuNzMzMzRdLDg3OlswLC42OTQ0NCwuMDE1MjgsMCwxLjAzODg5XSw4ODpbMCwuNjk0NDQsMCwwLC43MzMzNF0sODk6WzAsLjY5NDQ0LC4wMjc1LDAsLjczMzM0XSw5MDpbMCwuNjk0NDQsMCwwLC42NzIyM10sOTE6Wy4yNSwuNzUsMCwwLC4zNDMwNl0sOTM6Wy4yNSwuNzUsMCwwLC4zNDMwNl0sOTQ6WzAsLjY5NDQ0LDAsMCwuNTVdLDk1OlsuMzUsLjEwODMzLC4wMzA1NiwwLC41NV0sOTc6WzAsLjQ1ODMzLDAsMCwuNTI1XSw5ODpbMCwuNjk0NDQsMCwwLC41NjExMV0sOTk6WzAsLjQ1ODMzLDAsMCwuNDg4ODldLDEwMDpbMCwuNjk0NDQsMCwwLC41NjExMV0sMTAxOlswLC40NTgzMywwLDAsLjUxMTExXSwxMDI6WzAsLjY5NDQ0LC4wNzYzOSwwLC4zMzYxMV0sMTAzOlsuMTk0NDQsLjQ1ODMzLC4wMTUyOCwwLC41NV0sMTA0OlswLC42OTQ0NCwwLDAsLjU2MTExXSwxMDU6WzAsLjY5NDQ0LDAsMCwuMjU1NTZdLDEwNjpbLjE5NDQ0LC42OTQ0NCwwLDAsLjI4NjExXSwxMDc6WzAsLjY5NDQ0LDAsMCwuNTMwNTZdLDEwODpbMCwuNjk0NDQsMCwwLC4yNTU1Nl0sMTA5OlswLC40NTgzMywwLDAsLjg2NjY3XSwxMTA6WzAsLjQ1ODMzLDAsMCwuNTYxMTFdLDExMTpbMCwuNDU4MzMsMCwwLC41NV0sMTEyOlsuMTk0NDQsLjQ1ODMzLDAsMCwuNTYxMTFdLDExMzpbLjE5NDQ0LC40NTgzMywwLDAsLjU2MTExXSwxMTQ6WzAsLjQ1ODMzLC4wMTUyOCwwLC4zNzIyMl0sMTE1OlswLC40NTgzMywwLDAsLjQyMTY3XSwxMTY6WzAsLjU4OTI5LDAsMCwuNDA0MTddLDExNzpbMCwuNDU4MzMsMCwwLC41NjExMV0sMTE4OlswLC40NTgzMywuMDE1MjgsMCwuNV0sMTE5OlswLC40NTgzMywuMDE1MjgsMCwuNzQ0NDVdLDEyMDpbMCwuNDU4MzMsMCwwLC41XSwxMjE6Wy4xOTQ0NCwuNDU4MzMsLjAxNTI4LDAsLjVdLDEyMjpbMCwuNDU4MzMsMCwwLC40NzYzOV0sMTI2OlsuMzUsLjM0NDQ0LDAsMCwuNTVdLDE2MDpbMCwwLDAsMCwuMjVdLDE2ODpbMCwuNjk0NDQsMCwwLC41NV0sMTc2OlswLC42OTQ0NCwwLDAsLjczMzM0XSwxODA6WzAsLjY5NDQ0LDAsMCwuNTVdLDE4NDpbLjE3MDE0LDAsMCwwLC40ODg4OV0sMzA1OlswLC40NTgzMywwLDAsLjI1NTU2XSw1Njc6Wy4xOTQ0NCwuNDU4MzMsMCwwLC4yODYxMV0sNzEwOlswLC42OTQ0NCwwLDAsLjU1XSw3MTE6WzAsLjYzNTQyLDAsMCwuNTVdLDcxMzpbMCwuNjM3NzgsMCwwLC41NV0sNzI4OlswLC42OTQ0NCwwLDAsLjU1XSw3Mjk6WzAsLjY5NDQ0LDAsMCwuMzA1NTZdLDczMDpbMCwuNjk0NDQsMCwwLC43MzMzNF0sNzMyOlswLC42OTQ0NCwwLDAsLjU1XSw3MzM6WzAsLjY5NDQ0LDAsMCwuNTVdLDkxNTpbMCwuNjk0NDQsMCwwLC41ODA1Nl0sOTE2OlswLC42OTQ0NCwwLDAsLjkxNjY3XSw5MjA6WzAsLjY5NDQ0LDAsMCwuODU1NTZdLDkyMzpbMCwuNjk0NDQsMCwwLC42NzIyM10sOTI2OlswLC42OTQ0NCwwLDAsLjczMzM0XSw5Mjg6WzAsLjY5NDQ0LDAsMCwuNzk0NDVdLDkzMTpbMCwuNjk0NDQsMCwwLC43OTQ0NV0sOTMzOlswLC42OTQ0NCwwLDAsLjg1NTU2XSw5MzQ6WzAsLjY5NDQ0LDAsMCwuNzk0NDVdLDkzNjpbMCwuNjk0NDQsMCwwLC44NTU1Nl0sOTM3OlswLC42OTQ0NCwwLDAsLjc5NDQ1XSw4MjExOlswLC40NTgzMywuMDMwNTYsMCwuNTVdLDgyMTI6WzAsLjQ1ODMzLC4wMzA1NiwwLDEuMTAwMDFdLDgyMTY6WzAsLjY5NDQ0LDAsMCwuMzA1NTZdLDgyMTc6WzAsLjY5NDQ0LDAsMCwuMzA1NTZdLDgyMjA6WzAsLjY5NDQ0LDAsMCwuNTU4MzRdLDgyMjE6WzAsLjY5NDQ0LDAsMCwuNTU4MzRdfSwiU2Fuc1NlcmlmLUl0YWxpYyI6ezMyOlswLDAsMCwwLC4yNV0sMzM6WzAsLjY5NDQ0LC4wNTczMywwLC4zMTk0NV0sMzQ6WzAsLjY5NDQ0LC4wMDMxNiwwLC41XSwzNTpbLjE5NDQ0LC42OTQ0NCwuMDUwODcsMCwuODMzMzRdLDM2OlsuMDU1NTYsLjc1LC4xMTE1NiwwLC41XSwzNzpbLjA1NTU2LC43NSwuMDMxMjYsMCwuODMzMzRdLDM4OlswLC42OTQ0NCwuMDMwNTgsMCwuNzU4MzRdLDM5OlswLC42OTQ0NCwuMDc4MTYsMCwuMjc3NzhdLDQwOlsuMjUsLjc1LC4xMzE2NCwwLC4zODg4OV0sNDE6Wy4yNSwuNzUsLjAyNTM2LDAsLjM4ODg5XSw0MjpbMCwuNzUsLjExNzc1LDAsLjVdLDQzOlsuMDgzMzMsLjU4MzMzLC4wMjUzNiwwLC43Nzc3OF0sNDQ6Wy4xMjUsLjA4MzMzLDAsMCwuMjc3NzhdLDQ1OlswLC40NDQ0NCwuMDE5NDYsMCwuMzMzMzNdLDQ2OlswLC4wODMzMywwLDAsLjI3Nzc4XSw0NzpbLjI1LC43NSwuMTMxNjQsMCwuNV0sNDg6WzAsLjY1NTU2LC4xMTE1NiwwLC41XSw0OTpbMCwuNjU1NTYsLjExMTU2LDAsLjVdLDUwOlswLC42NTU1NiwuMTExNTYsMCwuNV0sNTE6WzAsLjY1NTU2LC4xMTE1NiwwLC41XSw1MjpbMCwuNjU1NTYsLjExMTU2LDAsLjVdLDUzOlswLC42NTU1NiwuMTExNTYsMCwuNV0sNTQ6WzAsLjY1NTU2LC4xMTE1NiwwLC41XSw1NTpbMCwuNjU1NTYsLjExMTU2LDAsLjVdLDU2OlswLC42NTU1NiwuMTExNTYsMCwuNV0sNTc6WzAsLjY1NTU2LC4xMTE1NiwwLC41XSw1ODpbMCwuNDQ0NDQsLjAyNTAyLDAsLjI3Nzc4XSw1OTpbLjEyNSwuNDQ0NDQsLjAyNTAyLDAsLjI3Nzc4XSw2MTpbLS4xMywuMzcsLjA1MDg3LDAsLjc3Nzc4XSw2MzpbMCwuNjk0NDQsLjExODA5LDAsLjQ3MjIyXSw2NDpbMCwuNjk0NDQsLjA3NTU1LDAsLjY2NjY3XSw2NTpbMCwuNjk0NDQsMCwwLC42NjY2N10sNjY6WzAsLjY5NDQ0LC4wODI5MywwLC42NjY2N10sNjc6WzAsLjY5NDQ0LC4xMTk4MywwLC42Mzg4OV0sNjg6WzAsLjY5NDQ0LC4wNzU1NSwwLC43MjIyM10sNjk6WzAsLjY5NDQ0LC4xMTk4MywwLC41OTcyMl0sNzA6WzAsLjY5NDQ0LC4xMzM3MiwwLC41Njk0NV0sNzE6WzAsLjY5NDQ0LC4xMTk4MywwLC42NjY2N10sNzI6WzAsLjY5NDQ0LC4wODA5NCwwLC43MDgzNF0sNzM6WzAsLjY5NDQ0LC4xMzM3MiwwLC4yNzc3OF0sNzQ6WzAsLjY5NDQ0LC4wODA5NCwwLC40NzIyMl0sNzU6WzAsLjY5NDQ0LC4xMTk4MywwLC42OTQ0NV0sNzY6WzAsLjY5NDQ0LDAsMCwuNTQxNjddLDc3OlswLC42OTQ0NCwuMDgwOTQsMCwuODc1XSw3ODpbMCwuNjk0NDQsLjA4MDk0LDAsLjcwODM0XSw3OTpbMCwuNjk0NDQsLjA3NTU1LDAsLjczNjExXSw4MDpbMCwuNjk0NDQsLjA4MjkzLDAsLjYzODg5XSw4MTpbLjEyNSwuNjk0NDQsLjA3NTU1LDAsLjczNjExXSw4MjpbMCwuNjk0NDQsLjA4MjkzLDAsLjY0NTg0XSw4MzpbMCwuNjk0NDQsLjA5MjA1LDAsLjU1NTU2XSw4NDpbMCwuNjk0NDQsLjEzMzcyLDAsLjY4MDU2XSw4NTpbMCwuNjk0NDQsLjA4MDk0LDAsLjY4NzVdLDg2OlswLC42OTQ0NCwuMTYxNSwwLC42NjY2N10sODc6WzAsLjY5NDQ0LC4xNjE1LDAsLjk0NDQ1XSw4ODpbMCwuNjk0NDQsLjEzMzcyLDAsLjY2NjY3XSw4OTpbMCwuNjk0NDQsLjE3MjYxLDAsLjY2NjY3XSw5MDpbMCwuNjk0NDQsLjExOTgzLDAsLjYxMTExXSw5MTpbLjI1LC43NSwuMTU5NDIsMCwuMjg4ODldLDkzOlsuMjUsLjc1LC4wODcxOSwwLC4yODg4OV0sOTQ6WzAsLjY5NDQ0LC4wNzk5LDAsLjVdLDk1OlsuMzUsLjA5NDQ0LC4wODYxNiwwLC41XSw5NzpbMCwuNDQ0NDQsLjAwOTgxLDAsLjQ4MDU2XSw5ODpbMCwuNjk0NDQsLjAzMDU3LDAsLjUxNjY3XSw5OTpbMCwuNDQ0NDQsLjA4MzM2LDAsLjQ0NDQ1XSwxMDA6WzAsLjY5NDQ0LC4wOTQ4MywwLC41MTY2N10sMTAxOlswLC40NDQ0NCwuMDY3NzgsMCwuNDQ0NDVdLDEwMjpbMCwuNjk0NDQsLjIxNzA1LDAsLjMwNTU2XSwxMDM6Wy4xOTQ0NCwuNDQ0NDQsLjEwODM2LDAsLjVdLDEwNDpbMCwuNjk0NDQsLjAxNzc4LDAsLjUxNjY3XSwxMDU6WzAsLjY3OTM3LC4wOTcxOCwwLC4yMzg4OV0sMTA2OlsuMTk0NDQsLjY3OTM3LC4wOTE2MiwwLC4yNjY2N10sMTA3OlswLC42OTQ0NCwuMDgzMzYsMCwuNDg4ODldLDEwODpbMCwuNjk0NDQsLjA5NDgzLDAsLjIzODg5XSwxMDk6WzAsLjQ0NDQ0LC4wMTc3OCwwLC43OTQ0NV0sMTEwOlswLC40NDQ0NCwuMDE3NzgsMCwuNTE2NjddLDExMTpbMCwuNDQ0NDQsLjA2NjEzLDAsLjVdLDExMjpbLjE5NDQ0LC40NDQ0NCwuMDM4OSwwLC41MTY2N10sMTEzOlsuMTk0NDQsLjQ0NDQ0LC4wNDE2OSwwLC41MTY2N10sMTE0OlswLC40NDQ0NCwuMTA4MzYsMCwuMzQxNjddLDExNTpbMCwuNDQ0NDQsLjA3NzgsMCwuMzgzMzNdLDExNjpbMCwuNTcxNDMsLjA3MjI1LDAsLjM2MTExXSwxMTc6WzAsLjQ0NDQ0LC4wNDE2OSwwLC41MTY2N10sMTE4OlswLC40NDQ0NCwuMTA4MzYsMCwuNDYxMTFdLDExOTpbMCwuNDQ0NDQsLjEwODM2LDAsLjY4MzM0XSwxMjA6WzAsLjQ0NDQ0LC4wOTE2OSwwLC40NjExMV0sMTIxOlsuMTk0NDQsLjQ0NDQ0LC4xMDgzNiwwLC40NjExMV0sMTIyOlswLC40NDQ0NCwuMDg3NTIsMCwuNDM0NzJdLDEyNjpbLjM1LC4zMjY1OSwuMDg4MjYsMCwuNV0sMTYwOlswLDAsMCwwLC4yNV0sMTY4OlswLC42NzkzNywuMDYzODUsMCwuNV0sMTc2OlswLC42OTQ0NCwwLDAsLjczNzUyXSwxODQ6Wy4xNzAxNCwwLDAsMCwuNDQ0NDVdLDMwNTpbMCwuNDQ0NDQsLjA0MTY5LDAsLjIzODg5XSw1Njc6Wy4xOTQ0NCwuNDQ0NDQsLjA0MTY5LDAsLjI2NjY3XSw3MTA6WzAsLjY5NDQ0LC4wNzk5LDAsLjVdLDcxMTpbMCwuNjMxOTQsLjA4NDMyLDAsLjVdLDcxMzpbMCwuNjA4ODksLjA4Nzc2LDAsLjVdLDcxNDpbMCwuNjk0NDQsLjA5MjA1LDAsLjVdLDcxNTpbMCwuNjk0NDQsMCwwLC41XSw3Mjg6WzAsLjY5NDQ0LC4wOTQ4MywwLC41XSw3Mjk6WzAsLjY3OTM3LC4wNzc3NCwwLC4yNzc3OF0sNzMwOlswLC42OTQ0NCwwLDAsLjczNzUyXSw3MzI6WzAsLjY3NjU5LC4wODgyNiwwLC41XSw3MzM6WzAsLjY5NDQ0LC4wOTIwNSwwLC41XSw5MTU6WzAsLjY5NDQ0LC4xMzM3MiwwLC41NDE2N10sOTE2OlswLC42OTQ0NCwwLDAsLjgzMzM0XSw5MjA6WzAsLjY5NDQ0LC4wNzU1NSwwLC43Nzc3OF0sOTIzOlswLC42OTQ0NCwwLDAsLjYxMTExXSw5MjY6WzAsLjY5NDQ0LC4xMjgxNiwwLC42NjY2N10sOTI4OlswLC42OTQ0NCwuMDgwOTQsMCwuNzA4MzRdLDkzMTpbMCwuNjk0NDQsLjExOTgzLDAsLjcyMjIyXSw5MzM6WzAsLjY5NDQ0LC4wOTAzMSwwLC43Nzc3OF0sOTM0OlswLC42OTQ0NCwuMDQ2MDMsMCwuNzIyMjJdLDkzNjpbMCwuNjk0NDQsLjA5MDMxLDAsLjc3Nzc4XSw5Mzc6WzAsLjY5NDQ0LC4wODI5MywwLC43MjIyMl0sODIxMTpbMCwuNDQ0NDQsLjA4NjE2LDAsLjVdLDgyMTI6WzAsLjQ0NDQ0LC4wODYxNiwwLDFdLDgyMTY6WzAsLjY5NDQ0LC4wNzgxNiwwLC4yNzc3OF0sODIxNzpbMCwuNjk0NDQsLjA3ODE2LDAsLjI3Nzc4XSw4MjIwOlswLC42OTQ0NCwuMTQyMDUsMCwuNV0sODIyMTpbMCwuNjk0NDQsLjAwMzE2LDAsLjVdfSwiU2Fuc1NlcmlmLVJlZ3VsYXIiOnszMjpbMCwwLDAsMCwuMjVdLDMzOlswLC42OTQ0NCwwLDAsLjMxOTQ1XSwzNDpbMCwuNjk0NDQsMCwwLC41XSwzNTpbLjE5NDQ0LC42OTQ0NCwwLDAsLjgzMzM0XSwzNjpbLjA1NTU2LC43NSwwLDAsLjVdLDM3OlsuMDU1NTYsLjc1LDAsMCwuODMzMzRdLDM4OlswLC42OTQ0NCwwLDAsLjc1ODM0XSwzOTpbMCwuNjk0NDQsMCwwLC4yNzc3OF0sNDA6Wy4yNSwuNzUsMCwwLC4zODg4OV0sNDE6Wy4yNSwuNzUsMCwwLC4zODg4OV0sNDI6WzAsLjc1LDAsMCwuNV0sNDM6Wy4wODMzMywuNTgzMzMsMCwwLC43Nzc3OF0sNDQ6Wy4xMjUsLjA4MzMzLDAsMCwuMjc3NzhdLDQ1OlswLC40NDQ0NCwwLDAsLjMzMzMzXSw0NjpbMCwuMDgzMzMsMCwwLC4yNzc3OF0sNDc6Wy4yNSwuNzUsMCwwLC41XSw0ODpbMCwuNjU1NTYsMCwwLC41XSw0OTpbMCwuNjU1NTYsMCwwLC41XSw1MDpbMCwuNjU1NTYsMCwwLC41XSw1MTpbMCwuNjU1NTYsMCwwLC41XSw1MjpbMCwuNjU1NTYsMCwwLC41XSw1MzpbMCwuNjU1NTYsMCwwLC41XSw1NDpbMCwuNjU1NTYsMCwwLC41XSw1NTpbMCwuNjU1NTYsMCwwLC41XSw1NjpbMCwuNjU1NTYsMCwwLC41XSw1NzpbMCwuNjU1NTYsMCwwLC41XSw1ODpbMCwuNDQ0NDQsMCwwLC4yNzc3OF0sNTk6Wy4xMjUsLjQ0NDQ0LDAsMCwuMjc3NzhdLDYxOlstLjEzLC4zNywwLDAsLjc3Nzc4XSw2MzpbMCwuNjk0NDQsMCwwLC40NzIyMl0sNjQ6WzAsLjY5NDQ0LDAsMCwuNjY2NjddLDY1OlswLC42OTQ0NCwwLDAsLjY2NjY3XSw2NjpbMCwuNjk0NDQsMCwwLC42NjY2N10sNjc6WzAsLjY5NDQ0LDAsMCwuNjM4ODldLDY4OlswLC42OTQ0NCwwLDAsLjcyMjIzXSw2OTpbMCwuNjk0NDQsMCwwLC41OTcyMl0sNzA6WzAsLjY5NDQ0LDAsMCwuNTY5NDVdLDcxOlswLC42OTQ0NCwwLDAsLjY2NjY3XSw3MjpbMCwuNjk0NDQsMCwwLC43MDgzNF0sNzM6WzAsLjY5NDQ0LDAsMCwuMjc3NzhdLDc0OlswLC42OTQ0NCwwLDAsLjQ3MjIyXSw3NTpbMCwuNjk0NDQsMCwwLC42OTQ0NV0sNzY6WzAsLjY5NDQ0LDAsMCwuNTQxNjddLDc3OlswLC42OTQ0NCwwLDAsLjg3NV0sNzg6WzAsLjY5NDQ0LDAsMCwuNzA4MzRdLDc5OlswLC42OTQ0NCwwLDAsLjczNjExXSw4MDpbMCwuNjk0NDQsMCwwLC42Mzg4OV0sODE6Wy4xMjUsLjY5NDQ0LDAsMCwuNzM2MTFdLDgyOlswLC42OTQ0NCwwLDAsLjY0NTg0XSw4MzpbMCwuNjk0NDQsMCwwLC41NTU1Nl0sODQ6WzAsLjY5NDQ0LDAsMCwuNjgwNTZdLDg1OlswLC42OTQ0NCwwLDAsLjY4NzVdLDg2OlswLC42OTQ0NCwuMDEzODksMCwuNjY2NjddLDg3OlswLC42OTQ0NCwuMDEzODksMCwuOTQ0NDVdLDg4OlswLC42OTQ0NCwwLDAsLjY2NjY3XSw4OTpbMCwuNjk0NDQsLjAyNSwwLC42NjY2N10sOTA6WzAsLjY5NDQ0LDAsMCwuNjExMTFdLDkxOlsuMjUsLjc1LDAsMCwuMjg4ODldLDkzOlsuMjUsLjc1LDAsMCwuMjg4ODldLDk0OlswLC42OTQ0NCwwLDAsLjVdLDk1OlsuMzUsLjA5NDQ0LC4wMjc3OCwwLC41XSw5NzpbMCwuNDQ0NDQsMCwwLC40ODA1Nl0sOTg6WzAsLjY5NDQ0LDAsMCwuNTE2NjddLDk5OlswLC40NDQ0NCwwLDAsLjQ0NDQ1XSwxMDA6WzAsLjY5NDQ0LDAsMCwuNTE2NjddLDEwMTpbMCwuNDQ0NDQsMCwwLC40NDQ0NV0sMTAyOlswLC42OTQ0NCwuMDY5NDQsMCwuMzA1NTZdLDEwMzpbLjE5NDQ0LC40NDQ0NCwuMDEzODksMCwuNV0sMTA0OlswLC42OTQ0NCwwLDAsLjUxNjY3XSwxMDU6WzAsLjY3OTM3LDAsMCwuMjM4ODldLDEwNjpbLjE5NDQ0LC42NzkzNywwLDAsLjI2NjY3XSwxMDc6WzAsLjY5NDQ0LDAsMCwuNDg4ODldLDEwODpbMCwuNjk0NDQsMCwwLC4yMzg4OV0sMTA5OlswLC40NDQ0NCwwLDAsLjc5NDQ1XSwxMTA6WzAsLjQ0NDQ0LDAsMCwuNTE2NjddLDExMTpbMCwuNDQ0NDQsMCwwLC41XSwxMTI6Wy4xOTQ0NCwuNDQ0NDQsMCwwLC41MTY2N10sMTEzOlsuMTk0NDQsLjQ0NDQ0LDAsMCwuNTE2NjddLDExNDpbMCwuNDQ0NDQsLjAxMzg5LDAsLjM0MTY3XSwxMTU6WzAsLjQ0NDQ0LDAsMCwuMzgzMzNdLDExNjpbMCwuNTcxNDMsMCwwLC4zNjExMV0sMTE3OlswLC40NDQ0NCwwLDAsLjUxNjY3XSwxMTg6WzAsLjQ0NDQ0LC4wMTM4OSwwLC40NjExMV0sMTE5OlswLC40NDQ0NCwuMDEzODksMCwuNjgzMzRdLDEyMDpbMCwuNDQ0NDQsMCwwLC40NjExMV0sMTIxOlsuMTk0NDQsLjQ0NDQ0LC4wMTM4OSwwLC40NjExMV0sMTIyOlswLC40NDQ0NCwwLDAsLjQzNDcyXSwxMjY6Wy4zNSwuMzI2NTksMCwwLC41XSwxNjA6WzAsMCwwLDAsLjI1XSwxNjg6WzAsLjY3OTM3LDAsMCwuNV0sMTc2OlswLC42OTQ0NCwwLDAsLjY2NjY3XSwxODQ6Wy4xNzAxNCwwLDAsMCwuNDQ0NDVdLDMwNTpbMCwuNDQ0NDQsMCwwLC4yMzg4OV0sNTY3OlsuMTk0NDQsLjQ0NDQ0LDAsMCwuMjY2NjddLDcxMDpbMCwuNjk0NDQsMCwwLC41XSw3MTE6WzAsLjYzMTk0LDAsMCwuNV0sNzEzOlswLC42MDg4OSwwLDAsLjVdLDcxNDpbMCwuNjk0NDQsMCwwLC41XSw3MTU6WzAsLjY5NDQ0LDAsMCwuNV0sNzI4OlswLC42OTQ0NCwwLDAsLjVdLDcyOTpbMCwuNjc5MzcsMCwwLC4yNzc3OF0sNzMwOlswLC42OTQ0NCwwLDAsLjY2NjY3XSw3MzI6WzAsLjY3NjU5LDAsMCwuNV0sNzMzOlswLC42OTQ0NCwwLDAsLjVdLDkxNTpbMCwuNjk0NDQsMCwwLC41NDE2N10sOTE2OlswLC42OTQ0NCwwLDAsLjgzMzM0XSw5MjA6WzAsLjY5NDQ0LDAsMCwuNzc3NzhdLDkyMzpbMCwuNjk0NDQsMCwwLC42MTExMV0sOTI2OlswLC42OTQ0NCwwLDAsLjY2NjY3XSw5Mjg6WzAsLjY5NDQ0LDAsMCwuNzA4MzRdLDkzMTpbMCwuNjk0NDQsMCwwLC43MjIyMl0sOTMzOlswLC42OTQ0NCwwLDAsLjc3Nzc4XSw5MzQ6WzAsLjY5NDQ0LDAsMCwuNzIyMjJdLDkzNjpbMCwuNjk0NDQsMCwwLC43Nzc3OF0sOTM3OlswLC42OTQ0NCwwLDAsLjcyMjIyXSw4MjExOlswLC40NDQ0NCwuMDI3NzgsMCwuNV0sODIxMjpbMCwuNDQ0NDQsLjAyNzc4LDAsMV0sODIxNjpbMCwuNjk0NDQsMCwwLC4yNzc3OF0sODIxNzpbMCwuNjk0NDQsMCwwLC4yNzc3OF0sODIyMDpbMCwuNjk0NDQsMCwwLC41XSw4MjIxOlswLC42OTQ0NCwwLDAsLjVdfSwiU2NyaXB0LVJlZ3VsYXIiOnszMjpbMCwwLDAsMCwuMjVdLDY1OlswLC43LC4yMjkyNSwwLC44MDI1M10sNjY6WzAsLjcsLjA0MDg3LDAsLjkwNzU3XSw2NzpbMCwuNywuMTY4OSwwLC42NjYxOV0sNjg6WzAsLjcsLjA5MzcxLDAsLjc3NDQzXSw2OTpbMCwuNywuMTg1ODMsMCwuNTYxNjJdLDcwOlswLC43LC4xMzYzNCwwLC44OTU0NF0sNzE6WzAsLjcsLjE3MzIyLDAsLjYwOTYxXSw3MjpbMCwuNywuMjk2OTQsMCwuOTY5MTldLDczOlswLC43LC4xOTE4OSwwLC44MDkwN10sNzQ6Wy4yNzc3OCwuNywuMTkxODksMCwxLjA1MTU5XSw3NTpbMCwuNywuMzEyNTksMCwuOTEzNjRdLDc2OlswLC43LC4xOTE4OSwwLC44NzM3M10sNzc6WzAsLjcsLjE1OTgxLDAsMS4wODAzMV0sNzg6WzAsLjcsLjM1MjUsMCwuOTAxNV0sNzk6WzAsLjcsLjA4MDc4LDAsLjczNzg3XSw4MDpbMCwuNywuMDgwNzgsMCwxLjAxMjYyXSw4MTpbMCwuNywuMDMzMDUsMCwuODgyODJdLDgyOlswLC43LC4wNjI1OSwwLC44NV0sODM6WzAsLjcsLjE5MTg5LDAsLjg2NzY3XSw4NDpbMCwuNywuMjkwODcsMCwuNzQ2OTddLDg1OlswLC43LC4yNTgxNSwwLC43OTk5Nl0sODY6WzAsLjcsLjI3NTIzLDAsLjYyMjA0XSw4NzpbMCwuNywuMjc1MjMsMCwuODA1MzJdLDg4OlswLC43LC4yNjAwNiwwLC45NDQ0NV0sODk6WzAsLjcsLjI5MzksMCwuNzA5NjFdLDkwOlswLC43LC4yNDAzNywwLC44MjEyXSwxNjA6WzAsMCwwLDAsLjI1XX0sIlNpemUxLVJlZ3VsYXIiOnszMjpbMCwwLDAsMCwuMjVdLDQwOlsuMzUwMDEsLjg1LDAsMCwuNDU4MzRdLDQxOlsuMzUwMDEsLjg1LDAsMCwuNDU4MzRdLDQ3OlsuMzUwMDEsLjg1LDAsMCwuNTc3NzhdLDkxOlsuMzUwMDEsLjg1LDAsMCwuNDE2NjddLDkyOlsuMzUwMDEsLjg1LDAsMCwuNTc3NzhdLDkzOlsuMzUwMDEsLjg1LDAsMCwuNDE2NjddLDEyMzpbLjM1MDAxLC44NSwwLDAsLjU4MzM0XSwxMjU6Wy4zNTAwMSwuODUsMCwwLC41ODMzNF0sMTYwOlswLDAsMCwwLC4yNV0sNzEwOlswLC43MjIyMiwwLDAsLjU1NTU2XSw3MzI6WzAsLjcyMjIyLDAsMCwuNTU1NTZdLDc3MDpbMCwuNzIyMjIsMCwwLC41NTU1Nl0sNzcxOlswLC43MjIyMiwwLDAsLjU1NTU2XSw4MjE0OlstOTllLTUsLjYwMSwwLDAsLjc3Nzc4XSw4NTkzOlsxZS01LC42LDAsMCwuNjY2NjddLDg1OTU6WzFlLTUsLjYsMCwwLC42NjY2N10sODY1NzpbMWUtNSwuNiwwLDAsLjc3Nzc4XSw4NjU5OlsxZS01LC42LDAsMCwuNzc3NzhdLDg3MTk6Wy4yNTAwMSwuNzUsMCwwLC45NDQ0NV0sODcyMDpbLjI1MDAxLC43NSwwLDAsLjk0NDQ1XSw4NzIxOlsuMjUwMDEsLjc1LDAsMCwxLjA1NTU2XSw4NzMwOlsuMzUwMDEsLjg1LDAsMCwxXSw4NzM5OlstLjAwNTk5LC42MDYsMCwwLC4zMzMzM10sODc0MTpbLS4wMDU5OSwuNjA2LDAsMCwuNTU1NTZdLDg3NDc6Wy4zMDYxMiwuODA1LC4xOTQ0NSwwLC40NzIyMl0sODc0ODpbLjMwNiwuODA1LC4xOTQ0NSwwLC40NzIyMl0sODc0OTpbLjMwNiwuODA1LC4xOTQ0NSwwLC40NzIyMl0sODc1MDpbLjMwNjEyLC44MDUsLjE5NDQ1LDAsLjQ3MjIyXSw4ODk2OlsuMjUwMDEsLjc1LDAsMCwuODMzMzRdLDg4OTc6Wy4yNTAwMSwuNzUsMCwwLC44MzMzNF0sODg5ODpbLjI1MDAxLC43NSwwLDAsLjgzMzM0XSw4ODk5OlsuMjUwMDEsLjc1LDAsMCwuODMzMzRdLDg5Njg6Wy4zNTAwMSwuODUsMCwwLC40NzIyMl0sODk2OTpbLjM1MDAxLC44NSwwLDAsLjQ3MjIyXSw4OTcwOlsuMzUwMDEsLjg1LDAsMCwuNDcyMjJdLDg5NzE6Wy4zNTAwMSwuODUsMCwwLC40NzIyMl0sOTE2ODpbLTk5ZS01LC42MDEsMCwwLC42NjY2N10sMTAyMTY6Wy4zNTAwMSwuODUsMCwwLC40NzIyMl0sMTAyMTc6Wy4zNTAwMSwuODUsMCwwLC40NzIyMl0sMTA3NTI6Wy4yNTAwMSwuNzUsMCwwLDEuMTExMTFdLDEwNzUzOlsuMjUwMDEsLjc1LDAsMCwxLjExMTExXSwxMDc1NDpbLjI1MDAxLC43NSwwLDAsMS4xMTExMV0sMTA3NTY6Wy4yNTAwMSwuNzUsMCwwLC44MzMzNF0sMTA3NTg6Wy4yNTAwMSwuNzUsMCwwLC44MzMzNF19LCJTaXplMi1SZWd1bGFyIjp7MzI6WzAsMCwwLDAsLjI1XSw0MDpbLjY1MDAyLDEuMTUsMCwwLC41OTcyMl0sNDE6Wy42NTAwMiwxLjE1LDAsMCwuNTk3MjJdLDQ3OlsuNjUwMDIsMS4xNSwwLDAsLjgxMTExXSw5MTpbLjY1MDAyLDEuMTUsMCwwLC40NzIyMl0sOTI6Wy42NTAwMiwxLjE1LDAsMCwuODExMTFdLDkzOlsuNjUwMDIsMS4xNSwwLDAsLjQ3MjIyXSwxMjM6Wy42NTAwMiwxLjE1LDAsMCwuNjY2NjddLDEyNTpbLjY1MDAyLDEuMTUsMCwwLC42NjY2N10sMTYwOlswLDAsMCwwLC4yNV0sNzEwOlswLC43NSwwLDAsMV0sNzMyOlswLC43NSwwLDAsMV0sNzcwOlswLC43NSwwLDAsMV0sNzcxOlswLC43NSwwLDAsMV0sODcxOTpbLjU1MDAxLDEuMDUsMCwwLDEuMjc3NzhdLDg3MjA6Wy41NTAwMSwxLjA1LDAsMCwxLjI3Nzc4XSw4NzIxOlsuNTUwMDEsMS4wNSwwLDAsMS40NDQ0NV0sODczMDpbLjY1MDAyLDEuMTUsMCwwLDFdLDg3NDc6Wy44NjIyNSwxLjM2LC40NDQ0NSwwLC41NTU1Nl0sODc0ODpbLjg2MiwxLjM2LC40NDQ0NSwwLC41NTU1Nl0sODc0OTpbLjg2MiwxLjM2LC40NDQ0NSwwLC41NTU1Nl0sODc1MDpbLjg2MjI1LDEuMzYsLjQ0NDQ1LDAsLjU1NTU2XSw4ODk2OlsuNTUwMDEsMS4wNSwwLDAsMS4xMTExMV0sODg5NzpbLjU1MDAxLDEuMDUsMCwwLDEuMTExMTFdLDg4OTg6Wy41NTAwMSwxLjA1LDAsMCwxLjExMTExXSw4ODk5OlsuNTUwMDEsMS4wNSwwLDAsMS4xMTExMV0sODk2ODpbLjY1MDAyLDEuMTUsMCwwLC41Mjc3OF0sODk2OTpbLjY1MDAyLDEuMTUsMCwwLC41Mjc3OF0sODk3MDpbLjY1MDAyLDEuMTUsMCwwLC41Mjc3OF0sODk3MTpbLjY1MDAyLDEuMTUsMCwwLC41Mjc3OF0sMTAyMTY6Wy42NTAwMiwxLjE1LDAsMCwuNjExMTFdLDEwMjE3OlsuNjUwMDIsMS4xNSwwLDAsLjYxMTExXSwxMDc1MjpbLjU1MDAxLDEuMDUsMCwwLDEuNTExMTJdLDEwNzUzOlsuNTUwMDEsMS4wNSwwLDAsMS41MTExMl0sMTA3NTQ6Wy41NTAwMSwxLjA1LDAsMCwxLjUxMTEyXSwxMDc1NjpbLjU1MDAxLDEuMDUsMCwwLDEuMTExMTFdLDEwNzU4OlsuNTUwMDEsMS4wNSwwLDAsMS4xMTExMV19LCJTaXplMy1SZWd1bGFyIjp7MzI6WzAsMCwwLDAsLjI1XSw0MDpbLjk1MDAzLDEuNDUsMCwwLC43MzYxMV0sNDE6Wy45NTAwMywxLjQ1LDAsMCwuNzM2MTFdLDQ3OlsuOTUwMDMsMS40NSwwLDAsMS4wNDQ0NV0sOTE6Wy45NTAwMywxLjQ1LDAsMCwuNTI3NzhdLDkyOlsuOTUwMDMsMS40NSwwLDAsMS4wNDQ0NV0sOTM6Wy45NTAwMywxLjQ1LDAsMCwuNTI3NzhdLDEyMzpbLjk1MDAzLDEuNDUsMCwwLC43NV0sMTI1OlsuOTUwMDMsMS40NSwwLDAsLjc1XSwxNjA6WzAsMCwwLDAsLjI1XSw3MTA6WzAsLjc1LDAsMCwxLjQ0NDQ1XSw3MzI6WzAsLjc1LDAsMCwxLjQ0NDQ1XSw3NzA6WzAsLjc1LDAsMCwxLjQ0NDQ1XSw3NzE6WzAsLjc1LDAsMCwxLjQ0NDQ1XSw4NzMwOlsuOTUwMDMsMS40NSwwLDAsMV0sODk2ODpbLjk1MDAzLDEuNDUsMCwwLC41ODMzNF0sODk2OTpbLjk1MDAzLDEuNDUsMCwwLC41ODMzNF0sODk3MDpbLjk1MDAzLDEuNDUsMCwwLC41ODMzNF0sODk3MTpbLjk1MDAzLDEuNDUsMCwwLC41ODMzNF0sMTAyMTY6Wy45NTAwMywxLjQ1LDAsMCwuNzVdLDEwMjE3OlsuOTUwMDMsMS40NSwwLDAsLjc1XX0sIlNpemU0LVJlZ3VsYXIiOnszMjpbMCwwLDAsMCwuMjVdLDQwOlsxLjI1MDAzLDEuNzUsMCwwLC43OTE2N10sNDE6WzEuMjUwMDMsMS43NSwwLDAsLjc5MTY3XSw0NzpbMS4yNTAwMywxLjc1LDAsMCwxLjI3Nzc4XSw5MTpbMS4yNTAwMywxLjc1LDAsMCwuNTgzMzRdLDkyOlsxLjI1MDAzLDEuNzUsMCwwLDEuMjc3NzhdLDkzOlsxLjI1MDAzLDEuNzUsMCwwLC41ODMzNF0sMTIzOlsxLjI1MDAzLDEuNzUsMCwwLC44MDU1Nl0sMTI1OlsxLjI1MDAzLDEuNzUsMCwwLC44MDU1Nl0sMTYwOlswLDAsMCwwLC4yNV0sNzEwOlswLC44MjUsMCwwLDEuODg4OV0sNzMyOlswLC44MjUsMCwwLDEuODg4OV0sNzcwOlswLC44MjUsMCwwLDEuODg4OV0sNzcxOlswLC44MjUsMCwwLDEuODg4OV0sODczMDpbMS4yNTAwMywxLjc1LDAsMCwxXSw4OTY4OlsxLjI1MDAzLDEuNzUsMCwwLC42Mzg4OV0sODk2OTpbMS4yNTAwMywxLjc1LDAsMCwuNjM4ODldLDg5NzA6WzEuMjUwMDMsMS43NSwwLDAsLjYzODg5XSw4OTcxOlsxLjI1MDAzLDEuNzUsMCwwLC42Mzg4OV0sOTExNTpbLjY0NTAyLDEuMTU1LDAsMCwuODc1XSw5MTE2OlsxZS01LC42LDAsMCwuODc1XSw5MTE3OlsuNjQ1MDIsMS4xNTUsMCwwLC44NzVdLDkxMTg6Wy42NDUwMiwxLjE1NSwwLDAsLjg3NV0sOTExOTpbMWUtNSwuNiwwLDAsLjg3NV0sOTEyMDpbLjY0NTAyLDEuMTU1LDAsMCwuODc1XSw5MTIxOlsuNjQ1MDIsMS4xNTUsMCwwLC42NjY2N10sOTEyMjpbLTk5ZS01LC42MDEsMCwwLC42NjY2N10sOTEyMzpbLjY0NTAyLDEuMTU1LDAsMCwuNjY2NjddLDkxMjQ6Wy42NDUwMiwxLjE1NSwwLDAsLjY2NjY3XSw5MTI1OlstOTllLTUsLjYwMSwwLDAsLjY2NjY3XSw5MTI2OlsuNjQ1MDIsMS4xNTUsMCwwLC42NjY2N10sOTEyNzpbMWUtNSwuOSwwLDAsLjg4ODg5XSw5MTI4OlsuNjUwMDIsMS4xNSwwLDAsLjg4ODg5XSw5MTI5OlsuOTAwMDEsMCwwLDAsLjg4ODg5XSw5MTMwOlswLC4zLDAsMCwuODg4ODldLDkxMzE6WzFlLTUsLjksMCwwLC44ODg4OV0sOTEzMjpbLjY1MDAyLDEuMTUsMCwwLC44ODg4OV0sOTEzMzpbLjkwMDAxLDAsMCwwLC44ODg4OV0sOTE0MzpbLjg4NTAyLC45MTUsMCwwLDEuMDU1NTZdLDEwMjE2OlsxLjI1MDAzLDEuNzUsMCwwLC44MDU1Nl0sMTAyMTc6WzEuMjUwMDMsMS43NSwwLDAsLjgwNTU2XSw1NzM0NDpbLS4wMDQ5OSwuNjA1LDAsMCwxLjA1NTU2XSw1NzM0NTpbLS4wMDQ5OSwuNjA1LDAsMCwxLjA1NTU2XSw1NzY4MDpbMCwuMTIsMCwwLC40NV0sNTc2ODE6WzAsLjEyLDAsMCwuNDVdLDU3NjgyOlswLC4xMiwwLDAsLjQ1XSw1NzY4MzpbMCwuMTIsMCwwLC40NV19LCJUeXBld3JpdGVyLVJlZ3VsYXIiOnszMjpbMCwwLDAsMCwuNTI1XSwzMzpbMCwuNjExMTEsMCwwLC41MjVdLDM0OlswLC42MTExMSwwLDAsLjUyNV0sMzU6WzAsLjYxMTExLDAsMCwuNTI1XSwzNjpbLjA4MzMzLC42OTQ0NCwwLDAsLjUyNV0sMzc6Wy4wODMzMywuNjk0NDQsMCwwLC41MjVdLDM4OlswLC42MTExMSwwLDAsLjUyNV0sMzk6WzAsLjYxMTExLDAsMCwuNTI1XSw0MDpbLjA4MzMzLC42OTQ0NCwwLDAsLjUyNV0sNDE6Wy4wODMzMywuNjk0NDQsMCwwLC41MjVdLDQyOlswLC41MjA4MywwLDAsLjUyNV0sNDM6Wy0uMDgwNTYsLjUzMDU1LDAsMCwuNTI1XSw0NDpbLjEzODg5LC4xMjUsMCwwLC41MjVdLDQ1OlstLjA4MDU2LC41MzA1NSwwLDAsLjUyNV0sNDY6WzAsLjEyNSwwLDAsLjUyNV0sNDc6Wy4wODMzMywuNjk0NDQsMCwwLC41MjVdLDQ4OlswLC42MTExMSwwLDAsLjUyNV0sNDk6WzAsLjYxMTExLDAsMCwuNTI1XSw1MDpbMCwuNjExMTEsMCwwLC41MjVdLDUxOlswLC42MTExMSwwLDAsLjUyNV0sNTI6WzAsLjYxMTExLDAsMCwuNTI1XSw1MzpbMCwuNjExMTEsMCwwLC41MjVdLDU0OlswLC42MTExMSwwLDAsLjUyNV0sNTU6WzAsLjYxMTExLDAsMCwuNTI1XSw1NjpbMCwuNjExMTEsMCwwLC41MjVdLDU3OlswLC42MTExMSwwLDAsLjUyNV0sNTg6WzAsLjQzMDU2LDAsMCwuNTI1XSw1OTpbLjEzODg5LC40MzA1NiwwLDAsLjUyNV0sNjA6Wy0uMDU1NTYsLjU1NTU2LDAsMCwuNTI1XSw2MTpbLS4xOTU0OSwuNDE1NjIsMCwwLC41MjVdLDYyOlstLjA1NTU2LC41NTU1NiwwLDAsLjUyNV0sNjM6WzAsLjYxMTExLDAsMCwuNTI1XSw2NDpbMCwuNjExMTEsMCwwLC41MjVdLDY1OlswLC42MTExMSwwLDAsLjUyNV0sNjY6WzAsLjYxMTExLDAsMCwuNTI1XSw2NzpbMCwuNjExMTEsMCwwLC41MjVdLDY4OlswLC42MTExMSwwLDAsLjUyNV0sNjk6WzAsLjYxMTExLDAsMCwuNTI1XSw3MDpbMCwuNjExMTEsMCwwLC41MjVdLDcxOlswLC42MTExMSwwLDAsLjUyNV0sNzI6WzAsLjYxMTExLDAsMCwuNTI1XSw3MzpbMCwuNjExMTEsMCwwLC41MjVdLDc0OlswLC42MTExMSwwLDAsLjUyNV0sNzU6WzAsLjYxMTExLDAsMCwuNTI1XSw3NjpbMCwuNjExMTEsMCwwLC41MjVdLDc3OlswLC42MTExMSwwLDAsLjUyNV0sNzg6WzAsLjYxMTExLDAsMCwuNTI1XSw3OTpbMCwuNjExMTEsMCwwLC41MjVdLDgwOlswLC42MTExMSwwLDAsLjUyNV0sODE6Wy4xMzg4OSwuNjExMTEsMCwwLC41MjVdLDgyOlswLC42MTExMSwwLDAsLjUyNV0sODM6WzAsLjYxMTExLDAsMCwuNTI1XSw4NDpbMCwuNjExMTEsMCwwLC41MjVdLDg1OlswLC42MTExMSwwLDAsLjUyNV0sODY6WzAsLjYxMTExLDAsMCwuNTI1XSw4NzpbMCwuNjExMTEsMCwwLC41MjVdLDg4OlswLC42MTExMSwwLDAsLjUyNV0sODk6WzAsLjYxMTExLDAsMCwuNTI1XSw5MDpbMCwuNjExMTEsMCwwLC41MjVdLDkxOlsuMDgzMzMsLjY5NDQ0LDAsMCwuNTI1XSw5MjpbLjA4MzMzLC42OTQ0NCwwLDAsLjUyNV0sOTM6Wy4wODMzMywuNjk0NDQsMCwwLC41MjVdLDk0OlswLC42MTExMSwwLDAsLjUyNV0sOTU6Wy4wOTUxNCwwLDAsMCwuNTI1XSw5NjpbMCwuNjExMTEsMCwwLC41MjVdLDk3OlswLC40MzA1NiwwLDAsLjUyNV0sOTg6WzAsLjYxMTExLDAsMCwuNTI1XSw5OTpbMCwuNDMwNTYsMCwwLC41MjVdLDEwMDpbMCwuNjExMTEsMCwwLC41MjVdLDEwMTpbMCwuNDMwNTYsMCwwLC41MjVdLDEwMjpbMCwuNjExMTEsMCwwLC41MjVdLDEwMzpbLjIyMjIyLC40MzA1NiwwLDAsLjUyNV0sMTA0OlswLC42MTExMSwwLDAsLjUyNV0sMTA1OlswLC42MTExMSwwLDAsLjUyNV0sMTA2OlsuMjIyMjIsLjYxMTExLDAsMCwuNTI1XSwxMDc6WzAsLjYxMTExLDAsMCwuNTI1XSwxMDg6WzAsLjYxMTExLDAsMCwuNTI1XSwxMDk6WzAsLjQzMDU2LDAsMCwuNTI1XSwxMTA6WzAsLjQzMDU2LDAsMCwuNTI1XSwxMTE6WzAsLjQzMDU2LDAsMCwuNTI1XSwxMTI6Wy4yMjIyMiwuNDMwNTYsMCwwLC41MjVdLDExMzpbLjIyMjIyLC40MzA1NiwwLDAsLjUyNV0sMTE0OlswLC40MzA1NiwwLDAsLjUyNV0sMTE1OlswLC40MzA1NiwwLDAsLjUyNV0sMTE2OlswLC41NTM1OCwwLDAsLjUyNV0sMTE3OlswLC40MzA1NiwwLDAsLjUyNV0sMTE4OlswLC40MzA1NiwwLDAsLjUyNV0sMTE5OlswLC40MzA1NiwwLDAsLjUyNV0sMTIwOlswLC40MzA1NiwwLDAsLjUyNV0sMTIxOlsuMjIyMjIsLjQzMDU2LDAsMCwuNTI1XSwxMjI6WzAsLjQzMDU2LDAsMCwuNTI1XSwxMjM6Wy4wODMzMywuNjk0NDQsMCwwLC41MjVdLDEyNDpbLjA4MzMzLC42OTQ0NCwwLDAsLjUyNV0sMTI1OlsuMDgzMzMsLjY5NDQ0LDAsMCwuNTI1XSwxMjY6WzAsLjYxMTExLDAsMCwuNTI1XSwxMjc6WzAsLjYxMTExLDAsMCwuNTI1XSwxNjA6WzAsMCwwLDAsLjUyNV0sMTc2OlswLC42MTExMSwwLDAsLjUyNV0sMTg0OlsuMTk0NDUsMCwwLDAsLjUyNV0sMzA1OlswLC40MzA1NiwwLDAsLjUyNV0sNTY3OlsuMjIyMjIsLjQzMDU2LDAsMCwuNTI1XSw3MTE6WzAsLjU2NTk3LDAsMCwuNTI1XSw3MTM6WzAsLjU2NTU1LDAsMCwuNTI1XSw3MTQ6WzAsLjYxMTExLDAsMCwuNTI1XSw3MTU6WzAsLjYxMTExLDAsMCwuNTI1XSw3Mjg6WzAsLjYxMTExLDAsMCwuNTI1XSw3MzA6WzAsLjYxMTExLDAsMCwuNTI1XSw3NzA6WzAsLjYxMTExLDAsMCwuNTI1XSw3NzE6WzAsLjYxMTExLDAsMCwuNTI1XSw3NzY6WzAsLjYxMTExLDAsMCwuNTI1XSw5MTU6WzAsLjYxMTExLDAsMCwuNTI1XSw5MTY6WzAsLjYxMTExLDAsMCwuNTI1XSw5MjA6WzAsLjYxMTExLDAsMCwuNTI1XSw5MjM6WzAsLjYxMTExLDAsMCwuNTI1XSw5MjY6WzAsLjYxMTExLDAsMCwuNTI1XSw5Mjg6WzAsLjYxMTExLDAsMCwuNTI1XSw5MzE6WzAsLjYxMTExLDAsMCwuNTI1XSw5MzM6WzAsLjYxMTExLDAsMCwuNTI1XSw5MzQ6WzAsLjYxMTExLDAsMCwuNTI1XSw5MzY6WzAsLjYxMTExLDAsMCwuNTI1XSw5Mzc6WzAsLjYxMTExLDAsMCwuNTI1XSw4MjE2OlswLC42MTExMSwwLDAsLjUyNV0sODIxNzpbMCwuNjExMTEsMCwwLC41MjVdLDgyNDI6WzAsLjYxMTExLDAsMCwuNTI1XSw5MjUxOlsuMTExMTEsLjIxOTQ0LDAsMCwuNTI1XX19O2NvbnN0IEo9e3NsYW50OlsuMjUsLjI1LC4yNV0sc3BhY2U6WzAsMCwwXSxzdHJldGNoOlswLDAsMF0sc2hyaW5rOlswLDAsMF0seEhlaWdodDpbLjQzMSwuNDMxLC40MzFdLHF1YWQ6WzEsMS4xNzEsMS40NzJdLGV4dHJhU3BhY2U6WzAsMCwwXSxudW0xOlsuNjc3LC43MzIsLjkyNV0sbnVtMjpbLjM5NCwuMzg0LC4zODddLG51bTM6Wy40NDQsLjQ3MSwuNTA0XSxkZW5vbTE6Wy42ODYsLjc1MiwxLjAyNV0sZGVub20yOlsuMzQ1LC4zNDQsLjUzMl0sc3VwMTpbLjQxMywuNTAzLC41MDRdLHN1cDI6Wy4zNjMsLjQzMSwuNDA0XSxzdXAzOlsuMjg5LC4yODYsLjI5NF0sc3ViMTpbLjE1LC4xNDMsLjJdLHN1YjI6Wy4yNDcsLjI4NiwuNF0sc3VwRHJvcDpbLjM4NiwuMzUzLC40OTRdLHN1YkRyb3A6Wy4wNSwuMDcxLC4xXSxkZWxpbTE6WzIuMzksMS43LDEuOThdLGRlbGltMjpbMS4wMSwxLjE1NywxLjQyXSxheGlzSGVpZ2h0OlsuMjUsLjI1LC4yNV0sZGVmYXVsdFJ1bGVUaGlja25lc3M6Wy4wNCwuMDQ5LC4wNDldLGJpZ09wU3BhY2luZzE6Wy4xMTEsLjExMSwuMTExXSxiaWdPcFNwYWNpbmcyOlsuMTY2LC4xNjYsLjE2Nl0sYmlnT3BTcGFjaW5nMzpbLjIsLjIsLjJdLGJpZ09wU3BhY2luZzQ6Wy42LC42MTEsLjYxMV0sYmlnT3BTcGFjaW5nNTpbLjEsLjE0MywuMTQzXSxzcXJ0UnVsZVRoaWNrbmVzczpbLjA0LC4wNCwuMDRdLHB0UGVyRW06WzEwLDEwLDEwXSxkb3VibGVSdWxlU2VwOlsuMiwuMiwuMl0sYXJyYXlSdWxlV2lkdGg6Wy4wNCwuMDQsLjA0XSxmYm94c2VwOlsuMywuMywuM10sZmJveHJ1bGU6Wy4wNCwuMDQsLjA0XX0sUT17Ilx4YzUiOiJBIiwiXHhkMCI6IkQiLCJceGRlIjoibyIsIlx4ZTUiOiJhIiwiXHhmMCI6ImQiLCJceGZlIjoibyIsIlx1MDQxMCI6IkEiLCJcdTA0MTEiOiJCIiwiXHUwNDEyIjoiQiIsIlx1MDQxMyI6IkYiLCJcdTA0MTQiOiJBIiwiXHUwNDE1IjoiRSIsIlx1MDQxNiI6IksiLCJcdTA0MTciOiIzIiwiXHUwNDE4IjoiTiIsIlx1MDQxOSI6Ik4iLCJcdTA0MWEiOiJLIiwiXHUwNDFiIjoiTiIsIlx1MDQxYyI6Ik0iLCJcdTA0MWQiOiJIIiwiXHUwNDFlIjoiTyIsIlx1MDQxZiI6Ik4iLCJcdTA0MjAiOiJQIiwiXHUwNDIxIjoiQyIsIlx1MDQyMiI6IlQiLCJcdTA0MjMiOiJ5IiwiXHUwNDI0IjoiTyIsIlx1MDQyNSI6IlgiLCJcdTA0MjYiOiJVIiwiXHUwNDI3IjoiaCIsIlx1MDQyOCI6IlciLCJcdTA0MjkiOiJXIiwiXHUwNDJhIjoiQiIsIlx1MDQyYiI6IlgiLCJcdTA0MmMiOiJCIiwiXHUwNDJkIjoiMyIsIlx1MDQyZSI6IlgiLCJcdTA0MmYiOiJSIiwiXHUwNDMwIjoiYSIsIlx1MDQzMSI6ImIiLCJcdTA0MzIiOiJhIiwiXHUwNDMzIjoiciIsIlx1MDQzNCI6InkiLCJcdTA0MzUiOiJlIiwiXHUwNDM2IjoibSIsIlx1MDQzNyI6ImUiLCJcdTA0MzgiOiJuIiwiXHUwNDM5IjoibiIsIlx1MDQzYSI6Im4iLCJcdTA0M2IiOiJuIiwiXHUwNDNjIjoibSIsIlx1MDQzZCI6Im4iLCJcdTA0M2UiOiJvIiwiXHUwNDNmIjoibiIsIlx1MDQ0MCI6InAiLCJcdTA0NDEiOiJjIiwiXHUwNDQyIjoibyIsIlx1MDQ0MyI6InkiLCJcdTA0NDQiOiJiIiwiXHUwNDQ1IjoieCIsIlx1MDQ0NiI6Im4iLCJcdTA0NDciOiJuIiwiXHUwNDQ4IjoidyIsIlx1MDQ0OSI6InciLCJcdTA0NGEiOiJhIiwiXHUwNDRiIjoibSIsIlx1MDQ0YyI6ImEiLCJcdTA0NGQiOiJlIiwiXHUwNDRlIjoibSIsIlx1MDQ0ZiI6InIifTtmdW5jdGlvbiBlZShlLHQscil7aWYoIUtbdF0pdGhyb3cgbmV3IEVycm9yKCJGb250IG1ldHJpY3Mgbm90IGZvdW5kIGZvciBmb250OiAiK3QrIi4iKTtsZXQgbj1lLmNoYXJDb2RlQXQoMCksbz1LW3RdW25dO2lmKCFvJiZlWzBdaW4gUSYmKG49UVtlWzBdXS5jaGFyQ29kZUF0KDApLG89S1t0XVtuXSksb3x8InRleHQiIT09cnx8VChuKSYmKG89S1t0XVs3N10pLG8pcmV0dXJue2RlcHRoOm9bMF0saGVpZ2h0Om9bMV0saXRhbGljOm9bMl0sc2tldzpvWzNdLHdpZHRoOm9bNF19fWNvbnN0IHRlPXt9O2NvbnN0IHJlPXttYXRoOnt9LHRleHQ6e319O3ZhciBuZT1yZTtmdW5jdGlvbiBvZShlLHQscixuLG8scyl7cmVbZV1bb109e2ZvbnQ6dCxncm91cDpyLHJlcGxhY2U6bn0scyYmbiYmKHJlW2VdW25dPXJlW2VdW29dKX1jb25zdCBzZT0ibWF0aCIsaWU9InRleHQiLGxlPSJtYWluIixhZT0iYW1zIixjZT0iYWNjZW50LXRva2VuIixoZT0iYmluIixtZT0iY2xvc2UiLHVlPSJpbm5lciIscGU9Im1hdGhvcmQiLGRlPSJvcC10b2tlbiIsZ2U9Im9wZW4iLGZlPSJwdW5jdCIsYmU9InJlbCIseWU9InNwYWNpbmciLHhlPSJ0ZXh0b3JkIjtvZShzZSxsZSxiZSwiXHUyMjYxIiwiXFxlcXVpdiIsITApLG9lKHNlLGxlLGJlLCJcdTIyN2EiLCJcXHByZWMiLCEwKSxvZShzZSxsZSxiZSwiXHUyMjdiIiwiXFxzdWNjIiwhMCksb2Uoc2UsbGUsYmUsIlx1MjIzYyIsIlxcc2ltIiwhMCksb2Uoc2UsbGUsYmUsIlx1MjJhNSIsIlxccGVycCIpLG9lKHNlLGxlLGJlLCJcdTJhYWYiLCJcXHByZWNlcSIsITApLG9lKHNlLGxlLGJlLCJcdTJhYjAiLCJcXHN1Y2NlcSIsITApLG9lKHNlLGxlLGJlLCJcdTIyNDMiLCJcXHNpbWVxIiwhMCksb2Uoc2UsbGUsYmUsIlx1MjIyMyIsIlxcbWlkIiwhMCksb2Uoc2UsbGUsYmUsIlx1MjI2YSIsIlxcbGwiLCEwKSxvZShzZSxsZSxiZSwiXHUyMjZiIiwiXFxnZyIsITApLG9lKHNlLGxlLGJlLCJcdTIyNGQiLCJcXGFzeW1wIiwhMCksb2Uoc2UsbGUsYmUsIlx1MjIyNSIsIlxccGFyYWxsZWwiKSxvZShzZSxsZSxiZSwiXHUyMmM4IiwiXFxib3d0aWUiLCEwKSxvZShzZSxsZSxiZSwiXHUyMzIzIiwiXFxzbWlsZSIsITApLG9lKHNlLGxlLGJlLCJcdTIyOTEiLCJcXHNxc3Vic2V0ZXEiLCEwKSxvZShzZSxsZSxiZSwiXHUyMjkyIiwiXFxzcXN1cHNldGVxIiwhMCksb2Uoc2UsbGUsYmUsIlx1MjI1MCIsIlxcZG90ZXEiLCEwKSxvZShzZSxsZSxiZSwiXHUyMzIyIiwiXFxmcm93biIsITApLG9lKHNlLGxlLGJlLCJcdTIyMGIiLCJcXG5pIiwhMCksb2Uoc2UsbGUsYmUsIlx1MjIxZCIsIlxccHJvcHRvIiwhMCksb2Uoc2UsbGUsYmUsIlx1MjJhMiIsIlxcdmRhc2giLCEwKSxvZShzZSxsZSxiZSwiXHUyMmEzIiwiXFxkYXNodiIsITApLG9lKHNlLGxlLGJlLCJcdTIyMGIiLCJcXG93bnMiKSxvZShzZSxsZSxmZSwiLiIsIlxcbGRvdHAiKSxvZShzZSxsZSxmZSwiXHUyMmM1IiwiXFxjZG90cCIpLG9lKHNlLGxlLGZlLCJcdTIyYzUiLCJceGI3Iiksb2UoaWUsbGUseGUsIlx1MjJjNSIsIlx4YjciKSxvZShzZSxsZSx4ZSwiIyIsIlxcIyIpLG9lKGllLGxlLHhlLCIjIiwiXFwjIiksb2Uoc2UsbGUseGUsIiYiLCJcXCYiKSxvZShpZSxsZSx4ZSwiJiIsIlxcJiIpLG9lKHNlLGxlLHhlLCJcdTIxMzUiLCJcXGFsZXBoIiwhMCksb2Uoc2UsbGUseGUsIlx1MjIwMCIsIlxcZm9yYWxsIiwhMCksb2Uoc2UsbGUseGUsIlx1MjEwZiIsIlxcaGJhciIsITApLG9lKHNlLGxlLHhlLCJcdTIyMDMiLCJcXGV4aXN0cyIsITApLG9lKHNlLGxlLHhlLCJcdTIyMDciLCJcXG5hYmxhIiwhMCksb2Uoc2UsbGUseGUsIlx1MjY2ZCIsIlxcZmxhdCIsITApLG9lKHNlLGxlLHhlLCJcdTIxMTMiLCJcXGVsbCIsITApLG9lKHNlLGxlLHhlLCJcdTI2NmUiLCJcXG5hdHVyYWwiLCEwKSxvZShzZSxsZSx4ZSwiXHUyNjYzIiwiXFxjbHVic3VpdCIsITApLG9lKHNlLGxlLHhlLCJcdTIxMTgiLCJcXHdwIiwhMCksb2Uoc2UsbGUseGUsIlx1MjY2ZiIsIlxcc2hhcnAiLCEwKSxvZShzZSxsZSx4ZSwiXHUyNjYyIiwiXFxkaWFtb25kc3VpdCIsITApLG9lKHNlLGxlLHhlLCJcdTIxMWMiLCJcXFJlIiwhMCksb2Uoc2UsbGUseGUsIlx1MjY2MSIsIlxcaGVhcnRzdWl0IiwhMCksb2Uoc2UsbGUseGUsIlx1MjExMSIsIlxcSW0iLCEwKSxvZShzZSxsZSx4ZSwiXHUyNjYwIiwiXFxzcGFkZXN1aXQiLCEwKSxvZShzZSxsZSx4ZSwiXHhhNyIsIlxcUyIsITApLG9lKGllLGxlLHhlLCJceGE3IiwiXFxTIiksb2Uoc2UsbGUseGUsIlx4YjYiLCJcXFAiLCEwKSxvZShpZSxsZSx4ZSwiXHhiNiIsIlxcUCIpLG9lKHNlLGxlLHhlLCJcdTIwMjAiLCJcXGRhZyIpLG9lKGllLGxlLHhlLCJcdTIwMjAiLCJcXGRhZyIpLG9lKGllLGxlLHhlLCJcdTIwMjAiLCJcXHRleHRkYWdnZXIiKSxvZShzZSxsZSx4ZSwiXHUyMDIxIiwiXFxkZGFnIiksb2UoaWUsbGUseGUsIlx1MjAyMSIsIlxcZGRhZyIpLG9lKGllLGxlLHhlLCJcdTIwMjEiLCJcXHRleHRkYWdnZXJkYmwiKSxvZShzZSxsZSxtZSwiXHUyM2IxIiwiXFxybW91c3RhY2hlIiwhMCksb2Uoc2UsbGUsZ2UsIlx1MjNiMCIsIlxcbG1vdXN0YWNoZSIsITApLG9lKHNlLGxlLG1lLCJcdTI3ZWYiLCJcXHJncm91cCIsITApLG9lKHNlLGxlLGdlLCJcdTI3ZWUiLCJcXGxncm91cCIsITApLG9lKHNlLGxlLGhlLCJcdTIyMTMiLCJcXG1wIiwhMCksb2Uoc2UsbGUsaGUsIlx1MjI5NiIsIlxcb21pbnVzIiwhMCksb2Uoc2UsbGUsaGUsIlx1MjI4ZSIsIlxcdXBsdXMiLCEwKSxvZShzZSxsZSxoZSwiXHUyMjkzIiwiXFxzcWNhcCIsITApLG9lKHNlLGxlLGhlLCJcdTIyMTciLCJcXGFzdCIpLG9lKHNlLGxlLGhlLCJcdTIyOTQiLCJcXHNxY3VwIiwhMCksb2Uoc2UsbGUsaGUsIlx1MjVlZiIsIlxcYmlnY2lyYyIsITApLG9lKHNlLGxlLGhlLCJcdTIyMTkiLCJcXGJ1bGxldCIsITApLG9lKHNlLGxlLGhlLCJcdTIwMjEiLCJcXGRkYWdnZXIiKSxvZShzZSxsZSxoZSwiXHUyMjQwIiwiXFx3ciIsITApLG9lKHNlLGxlLGhlLCJcdTJhM2YiLCJcXGFtYWxnIiksb2Uoc2UsbGUsaGUsIiYiLCJcXEFuZCIpLG9lKHNlLGxlLGJlLCJcdTI3ZjUiLCJcXGxvbmdsZWZ0YXJyb3ciLCEwKSxvZShzZSxsZSxiZSwiXHUyMWQwIiwiXFxMZWZ0YXJyb3ciLCEwKSxvZShzZSxsZSxiZSwiXHUyN2Y4IiwiXFxMb25nbGVmdGFycm93IiwhMCksb2Uoc2UsbGUsYmUsIlx1MjdmNiIsIlxcbG9uZ3JpZ2h0YXJyb3ciLCEwKSxvZShzZSxsZSxiZSwiXHUyMWQyIiwiXFxSaWdodGFycm93IiwhMCksb2Uoc2UsbGUsYmUsIlx1MjdmOSIsIlxcTG9uZ3JpZ2h0YXJyb3ciLCEwKSxvZShzZSxsZSxiZSwiXHUyMTk0IiwiXFxsZWZ0cmlnaHRhcnJvdyIsITApLG9lKHNlLGxlLGJlLCJcdTI3ZjciLCJcXGxvbmdsZWZ0cmlnaHRhcnJvdyIsITApLG9lKHNlLGxlLGJlLCJcdTIxZDQiLCJcXExlZnRyaWdodGFycm93IiwhMCksb2Uoc2UsbGUsYmUsIlx1MjdmYSIsIlxcTG9uZ2xlZnRyaWdodGFycm93IiwhMCksb2Uoc2UsbGUsYmUsIlx1MjFhNiIsIlxcbWFwc3RvIiwhMCksb2Uoc2UsbGUsYmUsIlx1MjdmYyIsIlxcbG9uZ21hcHN0byIsITApLG9lKHNlLGxlLGJlLCJcdTIxOTciLCJcXG5lYXJyb3ciLCEwKSxvZShzZSxsZSxiZSwiXHUyMWE5IiwiXFxob29rbGVmdGFycm93IiwhMCksb2Uoc2UsbGUsYmUsIlx1MjFhYSIsIlxcaG9va3JpZ2h0YXJyb3ciLCEwKSxvZShzZSxsZSxiZSwiXHUyMTk4IiwiXFxzZWFycm93IiwhMCksb2Uoc2UsbGUsYmUsIlx1MjFiYyIsIlxcbGVmdGhhcnBvb251cCIsITApLG9lKHNlLGxlLGJlLCJcdTIxYzAiLCJcXHJpZ2h0aGFycG9vbnVwIiwhMCksb2Uoc2UsbGUsYmUsIlx1MjE5OSIsIlxcc3dhcnJvdyIsITApLG9lKHNlLGxlLGJlLCJcdTIxYmQiLCJcXGxlZnRoYXJwb29uZG93biIsITApLG9lKHNlLGxlLGJlLCJcdTIxYzEiLCJcXHJpZ2h0aGFycG9vbmRvd24iLCEwKSxvZShzZSxsZSxiZSwiXHUyMTk2IiwiXFxud2Fycm93IiwhMCksb2Uoc2UsbGUsYmUsIlx1MjFjYyIsIlxccmlnaHRsZWZ0aGFycG9vbnMiLCEwKSxvZShzZSxhZSxiZSwiXHUyMjZlIiwiXFxubGVzcyIsITApLG9lKHNlLGFlLGJlLCJcdWUwMTAiLCJcXEBubGVxc2xhbnQiKSxvZShzZSxhZSxiZSwiXHVlMDExIiwiXFxAbmxlcXEiKSxvZShzZSxhZSxiZSwiXHUyYTg3IiwiXFxsbmVxIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjI2OCIsIlxcbG5lcXEiLCEwKSxvZShzZSxhZSxiZSwiXHVlMDBjIiwiXFxAbHZlcnRuZXFxIiksb2Uoc2UsYWUsYmUsIlx1MjJlNiIsIlxcbG5zaW0iLCEwKSxvZShzZSxhZSxiZSwiXHUyYTg5IiwiXFxsbmFwcHJveCIsITApLG9lKHNlLGFlLGJlLCJcdTIyODAiLCJcXG5wcmVjIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjJlMCIsIlxcbnByZWNlcSIsITApLG9lKHNlLGFlLGJlLCJcdTIyZTgiLCJcXHByZWNuc2ltIiwhMCksb2Uoc2UsYWUsYmUsIlx1MmFiOSIsIlxccHJlY25hcHByb3giLCEwKSxvZShzZSxhZSxiZSwiXHUyMjQxIiwiXFxuc2ltIiwhMCksb2Uoc2UsYWUsYmUsIlx1ZTAwNiIsIlxcQG5zaG9ydG1pZCIpLG9lKHNlLGFlLGJlLCJcdTIyMjQiLCJcXG5taWQiLCEwKSxvZShzZSxhZSxiZSwiXHUyMmFjIiwiXFxudmRhc2giLCEwKSxvZShzZSxhZSxiZSwiXHUyMmFkIiwiXFxudkRhc2giLCEwKSxvZShzZSxhZSxiZSwiXHUyMmVhIiwiXFxudHJpYW5nbGVsZWZ0Iiksb2Uoc2UsYWUsYmUsIlx1MjJlYyIsIlxcbnRyaWFuZ2xlbGVmdGVxIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjI4YSIsIlxcc3Vic2V0bmVxIiwhMCksb2Uoc2UsYWUsYmUsIlx1ZTAxYSIsIlxcQHZhcnN1YnNldG5lcSIpLG9lKHNlLGFlLGJlLCJcdTJhY2IiLCJcXHN1YnNldG5lcXEiLCEwKSxvZShzZSxhZSxiZSwiXHVlMDE3IiwiXFxAdmFyc3Vic2V0bmVxcSIpLG9lKHNlLGFlLGJlLCJcdTIyNmYiLCJcXG5ndHIiLCEwKSxvZShzZSxhZSxiZSwiXHVlMDBmIiwiXFxAbmdlcXNsYW50Iiksb2Uoc2UsYWUsYmUsIlx1ZTAwZSIsIlxcQG5nZXFxIiksb2Uoc2UsYWUsYmUsIlx1MmE4OCIsIlxcZ25lcSIsITApLG9lKHNlLGFlLGJlLCJcdTIyNjkiLCJcXGduZXFxIiwhMCksb2Uoc2UsYWUsYmUsIlx1ZTAwZCIsIlxcQGd2ZXJ0bmVxcSIpLG9lKHNlLGFlLGJlLCJcdTIyZTciLCJcXGduc2ltIiwhMCksb2Uoc2UsYWUsYmUsIlx1MmE4YSIsIlxcZ25hcHByb3giLCEwKSxvZShzZSxhZSxiZSwiXHUyMjgxIiwiXFxuc3VjYyIsITApLG9lKHNlLGFlLGJlLCJcdTIyZTEiLCJcXG5zdWNjZXEiLCEwKSxvZShzZSxhZSxiZSwiXHUyMmU5IiwiXFxzdWNjbnNpbSIsITApLG9lKHNlLGFlLGJlLCJcdTJhYmEiLCJcXHN1Y2NuYXBwcm94IiwhMCksb2Uoc2UsYWUsYmUsIlx1MjI0NiIsIlxcbmNvbmciLCEwKSxvZShzZSxhZSxiZSwiXHVlMDA3IiwiXFxAbnNob3J0cGFyYWxsZWwiKSxvZShzZSxhZSxiZSwiXHUyMjI2IiwiXFxucGFyYWxsZWwiLCEwKSxvZShzZSxhZSxiZSwiXHUyMmFmIiwiXFxuVkRhc2giLCEwKSxvZShzZSxhZSxiZSwiXHUyMmViIiwiXFxudHJpYW5nbGVyaWdodCIpLG9lKHNlLGFlLGJlLCJcdTIyZWQiLCJcXG50cmlhbmdsZXJpZ2h0ZXEiLCEwKSxvZShzZSxhZSxiZSwiXHVlMDE4IiwiXFxAbnN1cHNldGVxcSIpLG9lKHNlLGFlLGJlLCJcdTIyOGIiLCJcXHN1cHNldG5lcSIsITApLG9lKHNlLGFlLGJlLCJcdWUwMWIiLCJcXEB2YXJzdXBzZXRuZXEiKSxvZShzZSxhZSxiZSwiXHUyYWNjIiwiXFxzdXBzZXRuZXFxIiwhMCksb2Uoc2UsYWUsYmUsIlx1ZTAxOSIsIlxcQHZhcnN1cHNldG5lcXEiKSxvZShzZSxhZSxiZSwiXHUyMmFlIiwiXFxuVmRhc2giLCEwKSxvZShzZSxhZSxiZSwiXHUyYWI1IiwiXFxwcmVjbmVxcSIsITApLG9lKHNlLGFlLGJlLCJcdTJhYjYiLCJcXHN1Y2NuZXFxIiwhMCksb2Uoc2UsYWUsYmUsIlx1ZTAxNiIsIlxcQG5zdWJzZXRlcXEiKSxvZShzZSxhZSxoZSwiXHUyMmI0IiwiXFx1bmxoZCIpLG9lKHNlLGFlLGhlLCJcdTIyYjUiLCJcXHVucmhkIiksb2Uoc2UsYWUsYmUsIlx1MjE5YSIsIlxcbmxlZnRhcnJvdyIsITApLG9lKHNlLGFlLGJlLCJcdTIxOWIiLCJcXG5yaWdodGFycm93IiwhMCksb2Uoc2UsYWUsYmUsIlx1MjFjZCIsIlxcbkxlZnRhcnJvdyIsITApLG9lKHNlLGFlLGJlLCJcdTIxY2YiLCJcXG5SaWdodGFycm93IiwhMCksb2Uoc2UsYWUsYmUsIlx1MjFhZSIsIlxcbmxlZnRyaWdodGFycm93IiwhMCksb2Uoc2UsYWUsYmUsIlx1MjFjZSIsIlxcbkxlZnRyaWdodGFycm93IiwhMCksb2Uoc2UsYWUsYmUsIlx1MjViMyIsIlxcdmFydHJpYW5nbGUiKSxvZShzZSxhZSx4ZSwiXHUyMTBmIiwiXFxoc2xhc2giKSxvZShzZSxhZSx4ZSwiXHUyNWJkIiwiXFx0cmlhbmdsZWRvd24iKSxvZShzZSxhZSx4ZSwiXHUyNWNhIiwiXFxsb3plbmdlIiksb2Uoc2UsYWUseGUsIlx1MjRjOCIsIlxcY2lyY2xlZFMiKSxvZShzZSxhZSx4ZSwiXHhhZSIsIlxcY2lyY2xlZFIiKSxvZShpZSxhZSx4ZSwiXHhhZSIsIlxcY2lyY2xlZFIiKSxvZShzZSxhZSx4ZSwiXHUyMjIxIiwiXFxtZWFzdXJlZGFuZ2xlIiwhMCksb2Uoc2UsYWUseGUsIlx1MjIwNCIsIlxcbmV4aXN0cyIpLG9lKHNlLGFlLHhlLCJcdTIxMjciLCJcXG1obyIpLG9lKHNlLGFlLHhlLCJcdTIxMzIiLCJcXEZpbnYiLCEwKSxvZShzZSxhZSx4ZSwiXHUyMTQxIiwiXFxHYW1lIiwhMCksb2Uoc2UsYWUseGUsIlx1MjAzNSIsIlxcYmFja3ByaW1lIiksb2Uoc2UsYWUseGUsIlx1MjViMiIsIlxcYmxhY2t0cmlhbmdsZSIpLG9lKHNlLGFlLHhlLCJcdTI1YmMiLCJcXGJsYWNrdHJpYW5nbGVkb3duIiksb2Uoc2UsYWUseGUsIlx1MjVhMCIsIlxcYmxhY2tzcXVhcmUiKSxvZShzZSxhZSx4ZSwiXHUyOWViIiwiXFxibGFja2xvemVuZ2UiKSxvZShzZSxhZSx4ZSwiXHUyNjA1IiwiXFxiaWdzdGFyIiksb2Uoc2UsYWUseGUsIlx1MjIyMiIsIlxcc3BoZXJpY2FsYW5nbGUiLCEwKSxvZShzZSxhZSx4ZSwiXHUyMjAxIiwiXFxjb21wbGVtZW50IiwhMCksb2Uoc2UsYWUseGUsIlx4ZjAiLCJcXGV0aCIsITApLG9lKGllLGxlLHhlLCJceGYwIiwiXHhmMCIpLG9lKHNlLGFlLHhlLCJcdTI1NzEiLCJcXGRpYWd1cCIpLG9lKHNlLGFlLHhlLCJcdTI1NzIiLCJcXGRpYWdkb3duIiksb2Uoc2UsYWUseGUsIlx1MjVhMSIsIlxcc3F1YXJlIiksb2Uoc2UsYWUseGUsIlx1MjVhMSIsIlxcQm94Iiksb2Uoc2UsYWUseGUsIlx1MjVjYSIsIlxcRGlhbW9uZCIpLG9lKHNlLGFlLHhlLCJceGE1IiwiXFx5ZW4iLCEwKSxvZShpZSxhZSx4ZSwiXHhhNSIsIlxceWVuIiwhMCksb2Uoc2UsYWUseGUsIlx1MjcxMyIsIlxcY2hlY2ttYXJrIiwhMCksb2UoaWUsYWUseGUsIlx1MjcxMyIsIlxcY2hlY2ttYXJrIiksb2Uoc2UsYWUseGUsIlx1MjEzNiIsIlxcYmV0aCIsITApLG9lKHNlLGFlLHhlLCJcdTIxMzgiLCJcXGRhbGV0aCIsITApLG9lKHNlLGFlLHhlLCJcdTIxMzciLCJcXGdpbWVsIiwhMCksb2Uoc2UsYWUseGUsIlx1MDNkZCIsIlxcZGlnYW1tYSIsITApLG9lKHNlLGFlLHhlLCJcdTAzZjAiLCJcXHZhcmthcHBhIiksb2Uoc2UsYWUsZ2UsIlx1MjUwYyIsIlxcQHVsY29ybmVyIiwhMCksb2Uoc2UsYWUsbWUsIlx1MjUxMCIsIlxcQHVyY29ybmVyIiwhMCksb2Uoc2UsYWUsZ2UsIlx1MjUxNCIsIlxcQGxsY29ybmVyIiwhMCksb2Uoc2UsYWUsbWUsIlx1MjUxOCIsIlxcQGxyY29ybmVyIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjI2NiIsIlxcbGVxcSIsITApLG9lKHNlLGFlLGJlLCJcdTJhN2QiLCJcXGxlcXNsYW50IiwhMCksb2Uoc2UsYWUsYmUsIlx1MmE5NSIsIlxcZXFzbGFudGxlc3MiLCEwKSxvZShzZSxhZSxiZSwiXHUyMjcyIiwiXFxsZXNzc2ltIiwhMCksb2Uoc2UsYWUsYmUsIlx1MmE4NSIsIlxcbGVzc2FwcHJveCIsITApLG9lKHNlLGFlLGJlLCJcdTIyNGEiLCJcXGFwcHJveGVxIiwhMCksb2Uoc2UsYWUsaGUsIlx1MjJkNiIsIlxcbGVzc2RvdCIpLG9lKHNlLGFlLGJlLCJcdTIyZDgiLCJcXGxsbCIsITApLG9lKHNlLGFlLGJlLCJcdTIyNzYiLCJcXGxlc3NndHIiLCEwKSxvZShzZSxhZSxiZSwiXHUyMmRhIiwiXFxsZXNzZXFndHIiLCEwKSxvZShzZSxhZSxiZSwiXHUyYThiIiwiXFxsZXNzZXFxZ3RyIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjI1MSIsIlxcZG90ZXFkb3QiKSxvZShzZSxhZSxiZSwiXHUyMjUzIiwiXFxyaXNpbmdkb3RzZXEiLCEwKSxvZShzZSxhZSxiZSwiXHUyMjUyIiwiXFxmYWxsaW5nZG90c2VxIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjIzZCIsIlxcYmFja3NpbSIsITApLG9lKHNlLGFlLGJlLCJcdTIyY2QiLCJcXGJhY2tzaW1lcSIsITApLG9lKHNlLGFlLGJlLCJcdTJhYzUiLCJcXHN1YnNldGVxcSIsITApLG9lKHNlLGFlLGJlLCJcdTIyZDAiLCJcXFN1YnNldCIsITApLG9lKHNlLGFlLGJlLCJcdTIyOGYiLCJcXHNxc3Vic2V0IiwhMCksb2Uoc2UsYWUsYmUsIlx1MjI3YyIsIlxccHJlY2N1cmx5ZXEiLCEwKSxvZShzZSxhZSxiZSwiXHUyMmRlIiwiXFxjdXJseWVxcHJlYyIsITApLG9lKHNlLGFlLGJlLCJcdTIyN2UiLCJcXHByZWNzaW0iLCEwKSxvZShzZSxhZSxiZSwiXHUyYWI3IiwiXFxwcmVjYXBwcm94IiwhMCksb2Uoc2UsYWUsYmUsIlx1MjJiMiIsIlxcdmFydHJpYW5nbGVsZWZ0Iiksb2Uoc2UsYWUsYmUsIlx1MjJiNCIsIlxcdHJpYW5nbGVsZWZ0ZXEiKSxvZShzZSxhZSxiZSwiXHUyMmE4IiwiXFx2RGFzaCIsITApLG9lKHNlLGFlLGJlLCJcdTIyYWEiLCJcXFZ2ZGFzaCIsITApLG9lKHNlLGFlLGJlLCJcdTIzMjMiLCJcXHNtYWxsc21pbGUiKSxvZShzZSxhZSxiZSwiXHUyMzIyIiwiXFxzbWFsbGZyb3duIiksb2Uoc2UsYWUsYmUsIlx1MjI0ZiIsIlxcYnVtcGVxIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjI0ZSIsIlxcQnVtcGVxIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjI2NyIsIlxcZ2VxcSIsITApLG9lKHNlLGFlLGJlLCJcdTJhN2UiLCJcXGdlcXNsYW50IiwhMCksb2Uoc2UsYWUsYmUsIlx1MmE5NiIsIlxcZXFzbGFudGd0ciIsITApLG9lKHNlLGFlLGJlLCJcdTIyNzMiLCJcXGd0cnNpbSIsITApLG9lKHNlLGFlLGJlLCJcdTJhODYiLCJcXGd0cmFwcHJveCIsITApLG9lKHNlLGFlLGhlLCJcdTIyZDciLCJcXGd0cmRvdCIpLG9lKHNlLGFlLGJlLCJcdTIyZDkiLCJcXGdnZyIsITApLG9lKHNlLGFlLGJlLCJcdTIyNzciLCJcXGd0cmxlc3MiLCEwKSxvZShzZSxhZSxiZSwiXHUyMmRiIiwiXFxndHJlcWxlc3MiLCEwKSxvZShzZSxhZSxiZSwiXHUyYThjIiwiXFxndHJlcXFsZXNzIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjI1NiIsIlxcZXFjaXJjIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjI1NyIsIlxcY2lyY2VxIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjI1YyIsIlxcdHJpYW5nbGVxIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjIzYyIsIlxcdGhpY2tzaW0iKSxvZShzZSxhZSxiZSwiXHUyMjQ4IiwiXFx0aGlja2FwcHJveCIpLG9lKHNlLGFlLGJlLCJcdTJhYzYiLCJcXHN1cHNldGVxcSIsITApLG9lKHNlLGFlLGJlLCJcdTIyZDEiLCJcXFN1cHNldCIsITApLG9lKHNlLGFlLGJlLCJcdTIyOTAiLCJcXHNxc3Vwc2V0IiwhMCksb2Uoc2UsYWUsYmUsIlx1MjI3ZCIsIlxcc3VjY2N1cmx5ZXEiLCEwKSxvZShzZSxhZSxiZSwiXHUyMmRmIiwiXFxjdXJseWVxc3VjYyIsITApLG9lKHNlLGFlLGJlLCJcdTIyN2YiLCJcXHN1Y2NzaW0iLCEwKSxvZShzZSxhZSxiZSwiXHUyYWI4IiwiXFxzdWNjYXBwcm94IiwhMCksb2Uoc2UsYWUsYmUsIlx1MjJiMyIsIlxcdmFydHJpYW5nbGVyaWdodCIpLG9lKHNlLGFlLGJlLCJcdTIyYjUiLCJcXHRyaWFuZ2xlcmlnaHRlcSIpLG9lKHNlLGFlLGJlLCJcdTIyYTkiLCJcXFZkYXNoIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjIyMyIsIlxcc2hvcnRtaWQiKSxvZShzZSxhZSxiZSwiXHUyMjI1IiwiXFxzaG9ydHBhcmFsbGVsIiksb2Uoc2UsYWUsYmUsIlx1MjI2YyIsIlxcYmV0d2VlbiIsITApLG9lKHNlLGFlLGJlLCJcdTIyZDQiLCJcXHBpdGNoZm9yayIsITApLG9lKHNlLGFlLGJlLCJcdTIyMWQiLCJcXHZhcnByb3B0byIpLG9lKHNlLGFlLGJlLCJcdTI1YzAiLCJcXGJsYWNrdHJpYW5nbGVsZWZ0Iiksb2Uoc2UsYWUsYmUsIlx1MjIzNCIsIlxcdGhlcmVmb3JlIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjIwZCIsIlxcYmFja2Vwc2lsb24iKSxvZShzZSxhZSxiZSwiXHUyNWI2IiwiXFxibGFja3RyaWFuZ2xlcmlnaHQiKSxvZShzZSxhZSxiZSwiXHUyMjM1IiwiXFxiZWNhdXNlIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjJkOCIsIlxcbGxsZXNzIiksb2Uoc2UsYWUsYmUsIlx1MjJkOSIsIlxcZ2dndHIiKSxvZShzZSxhZSxoZSwiXHUyMmIyIiwiXFxsaGQiKSxvZShzZSxhZSxoZSwiXHUyMmIzIiwiXFxyaGQiKSxvZShzZSxhZSxiZSwiXHUyMjQyIiwiXFxlcXNpbSIsITApLG9lKHNlLGxlLGJlLCJcdTIyYzgiLCJcXEpvaW4iKSxvZShzZSxhZSxiZSwiXHUyMjUxIiwiXFxEb3RlcSIsITApLG9lKHNlLGFlLGhlLCJcdTIyMTQiLCJcXGRvdHBsdXMiLCEwKSxvZShzZSxhZSxoZSwiXHUyMjE2IiwiXFxzbWFsbHNldG1pbnVzIiksb2Uoc2UsYWUsaGUsIlx1MjJkMiIsIlxcQ2FwIiwhMCksb2Uoc2UsYWUsaGUsIlx1MjJkMyIsIlxcQ3VwIiwhMCksb2Uoc2UsYWUsaGUsIlx1MmE1ZSIsIlxcZG91YmxlYmFyd2VkZ2UiLCEwKSxvZShzZSxhZSxoZSwiXHUyMjlmIiwiXFxib3htaW51cyIsITApLG9lKHNlLGFlLGhlLCJcdTIyOWUiLCJcXGJveHBsdXMiLCEwKSxvZShzZSxhZSxoZSwiXHUyMmM3IiwiXFxkaXZpZGVvbnRpbWVzIiwhMCksb2Uoc2UsYWUsaGUsIlx1MjJjOSIsIlxcbHRpbWVzIiwhMCksb2Uoc2UsYWUsaGUsIlx1MjJjYSIsIlxccnRpbWVzIiwhMCksb2Uoc2UsYWUsaGUsIlx1MjJjYiIsIlxcbGVmdHRocmVldGltZXMiLCEwKSxvZShzZSxhZSxoZSwiXHUyMmNjIiwiXFxyaWdodHRocmVldGltZXMiLCEwKSxvZShzZSxhZSxoZSwiXHUyMmNmIiwiXFxjdXJseXdlZGdlIiwhMCksb2Uoc2UsYWUsaGUsIlx1MjJjZSIsIlxcY3VybHl2ZWUiLCEwKSxvZShzZSxhZSxoZSwiXHUyMjlkIiwiXFxjaXJjbGVkZGFzaCIsITApLG9lKHNlLGFlLGhlLCJcdTIyOWIiLCJcXGNpcmNsZWRhc3QiLCEwKSxvZShzZSxhZSxoZSwiXHUyMmM1IiwiXFxjZW50ZXJkb3QiKSxvZShzZSxhZSxoZSwiXHUyMmJhIiwiXFxpbnRlcmNhbCIsITApLG9lKHNlLGFlLGhlLCJcdTIyZDIiLCJcXGRvdWJsZWNhcCIpLG9lKHNlLGFlLGhlLCJcdTIyZDMiLCJcXGRvdWJsZWN1cCIpLG9lKHNlLGFlLGhlLCJcdTIyYTAiLCJcXGJveHRpbWVzIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjFlMiIsIlxcZGFzaHJpZ2h0YXJyb3ciLCEwKSxvZShzZSxhZSxiZSwiXHUyMWUwIiwiXFxkYXNobGVmdGFycm93IiwhMCksb2Uoc2UsYWUsYmUsIlx1MjFjNyIsIlxcbGVmdGxlZnRhcnJvd3MiLCEwKSxvZShzZSxhZSxiZSwiXHUyMWM2IiwiXFxsZWZ0cmlnaHRhcnJvd3MiLCEwKSxvZShzZSxhZSxiZSwiXHUyMWRhIiwiXFxMbGVmdGFycm93IiwhMCksb2Uoc2UsYWUsYmUsIlx1MjE5ZSIsIlxcdHdvaGVhZGxlZnRhcnJvdyIsITApLG9lKHNlLGFlLGJlLCJcdTIxYTIiLCJcXGxlZnRhcnJvd3RhaWwiLCEwKSxvZShzZSxhZSxiZSwiXHUyMWFiIiwiXFxsb29wYXJyb3dsZWZ0IiwhMCksb2Uoc2UsYWUsYmUsIlx1MjFjYiIsIlxcbGVmdHJpZ2h0aGFycG9vbnMiLCEwKSxvZShzZSxhZSxiZSwiXHUyMWI2IiwiXFxjdXJ2ZWFycm93bGVmdCIsITApLG9lKHNlLGFlLGJlLCJcdTIxYmEiLCJcXGNpcmNsZWFycm93bGVmdCIsITApLG9lKHNlLGFlLGJlLCJcdTIxYjAiLCJcXExzaCIsITApLG9lKHNlLGFlLGJlLCJcdTIxYzgiLCJcXHVwdXBhcnJvd3MiLCEwKSxvZShzZSxhZSxiZSwiXHUyMWJmIiwiXFx1cGhhcnBvb25sZWZ0IiwhMCksb2Uoc2UsYWUsYmUsIlx1MjFjMyIsIlxcZG93bmhhcnBvb25sZWZ0IiwhMCksb2Uoc2UsbGUsYmUsIlx1MjJiNiIsIlxcb3JpZ29mIiwhMCksb2Uoc2UsbGUsYmUsIlx1MjJiNyIsIlxcaW1hZ2VvZiIsITApLG9lKHNlLGFlLGJlLCJcdTIyYjgiLCJcXG11bHRpbWFwIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjFhZCIsIlxcbGVmdHJpZ2h0c3F1aWdhcnJvdyIsITApLG9lKHNlLGFlLGJlLCJcdTIxYzkiLCJcXHJpZ2h0cmlnaHRhcnJvd3MiLCEwKSxvZShzZSxhZSxiZSwiXHUyMWM0IiwiXFxyaWdodGxlZnRhcnJvd3MiLCEwKSxvZShzZSxhZSxiZSwiXHUyMWEwIiwiXFx0d29oZWFkcmlnaHRhcnJvdyIsITApLG9lKHNlLGFlLGJlLCJcdTIxYTMiLCJcXHJpZ2h0YXJyb3d0YWlsIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjFhYyIsIlxcbG9vcGFycm93cmlnaHQiLCEwKSxvZShzZSxhZSxiZSwiXHUyMWI3IiwiXFxjdXJ2ZWFycm93cmlnaHQiLCEwKSxvZShzZSxhZSxiZSwiXHUyMWJiIiwiXFxjaXJjbGVhcnJvd3JpZ2h0IiwhMCksb2Uoc2UsYWUsYmUsIlx1MjFiMSIsIlxcUnNoIiwhMCksb2Uoc2UsYWUsYmUsIlx1MjFjYSIsIlxcZG93bmRvd25hcnJvd3MiLCEwKSxvZShzZSxhZSxiZSwiXHUyMWJlIiwiXFx1cGhhcnBvb25yaWdodCIsITApLG9lKHNlLGFlLGJlLCJcdTIxYzIiLCJcXGRvd25oYXJwb29ucmlnaHQiLCEwKSxvZShzZSxhZSxiZSwiXHUyMWRkIiwiXFxyaWdodHNxdWlnYXJyb3ciLCEwKSxvZShzZSxhZSxiZSwiXHUyMWRkIiwiXFxsZWFkc3RvIiksb2Uoc2UsYWUsYmUsIlx1MjFkYiIsIlxcUnJpZ2h0YXJyb3ciLCEwKSxvZShzZSxhZSxiZSwiXHUyMWJlIiwiXFxyZXN0cmljdGlvbiIpLG9lKHNlLGxlLHhlLCJcdTIwMTgiLCJgIiksb2Uoc2UsbGUseGUsIiQiLCJcXCQiKSxvZShpZSxsZSx4ZSwiJCIsIlxcJCIpLG9lKGllLGxlLHhlLCIkIiwiXFx0ZXh0ZG9sbGFyIiksb2Uoc2UsbGUseGUsIiUiLCJcXCUiKSxvZShpZSxsZSx4ZSwiJSIsIlxcJSIpLG9lKHNlLGxlLHhlLCJfIiwiXFxfIiksb2UoaWUsbGUseGUsIl8iLCJcXF8iKSxvZShpZSxsZSx4ZSwiXyIsIlxcdGV4dHVuZGVyc2NvcmUiKSxvZShzZSxsZSx4ZSwiXHUyMjIwIiwiXFxhbmdsZSIsITApLG9lKHNlLGxlLHhlLCJcdTIyMWUiLCJcXGluZnR5IiwhMCksb2Uoc2UsbGUseGUsIlx1MjAzMiIsIlxccHJpbWUiKSxvZShzZSxsZSx4ZSwiXHUyNWIzIiwiXFx0cmlhbmdsZSIpLG9lKHNlLGxlLHhlLCJcdTAzOTMiLCJcXEdhbW1hIiwhMCksb2Uoc2UsbGUseGUsIlx1MDM5NCIsIlxcRGVsdGEiLCEwKSxvZShzZSxsZSx4ZSwiXHUwMzk4IiwiXFxUaGV0YSIsITApLG9lKHNlLGxlLHhlLCJcdTAzOWIiLCJcXExhbWJkYSIsITApLG9lKHNlLGxlLHhlLCJcdTAzOWUiLCJcXFhpIiwhMCksb2Uoc2UsbGUseGUsIlx1MDNhMCIsIlxcUGkiLCEwKSxvZShzZSxsZSx4ZSwiXHUwM2EzIiwiXFxTaWdtYSIsITApLG9lKHNlLGxlLHhlLCJcdTAzYTUiLCJcXFVwc2lsb24iLCEwKSxvZShzZSxsZSx4ZSwiXHUwM2E2IiwiXFxQaGkiLCEwKSxvZShzZSxsZSx4ZSwiXHUwM2E4IiwiXFxQc2kiLCEwKSxvZShzZSxsZSx4ZSwiXHUwM2E5IiwiXFxPbWVnYSIsITApLG9lKHNlLGxlLHhlLCJBIiwiXHUwMzkxIiksb2Uoc2UsbGUseGUsIkIiLCJcdTAzOTIiKSxvZShzZSxsZSx4ZSwiRSIsIlx1MDM5NSIpLG9lKHNlLGxlLHhlLCJaIiwiXHUwMzk2Iiksb2Uoc2UsbGUseGUsIkgiLCJcdTAzOTciKSxvZShzZSxsZSx4ZSwiSSIsIlx1MDM5OSIpLG9lKHNlLGxlLHhlLCJLIiwiXHUwMzlhIiksb2Uoc2UsbGUseGUsIk0iLCJcdTAzOWMiKSxvZShzZSxsZSx4ZSwiTiIsIlx1MDM5ZCIpLG9lKHNlLGxlLHhlLCJPIiwiXHUwMzlmIiksb2Uoc2UsbGUseGUsIlAiLCJcdTAzYTEiKSxvZShzZSxsZSx4ZSwiVCIsIlx1MDNhNCIpLG9lKHNlLGxlLHhlLCJYIiwiXHUwM2E3Iiksb2Uoc2UsbGUseGUsIlx4YWMiLCJcXG5lZyIsITApLG9lKHNlLGxlLHhlLCJceGFjIiwiXFxsbm90Iiksb2Uoc2UsbGUseGUsIlx1MjJhNCIsIlxcdG9wIiksb2Uoc2UsbGUseGUsIlx1MjJhNSIsIlxcYm90Iiksb2Uoc2UsbGUseGUsIlx1MjIwNSIsIlxcZW1wdHlzZXQiKSxvZShzZSxhZSx4ZSwiXHUyMjA1IiwiXFx2YXJub3RoaW5nIiksb2Uoc2UsbGUscGUsIlx1MDNiMSIsIlxcYWxwaGEiLCEwKSxvZShzZSxsZSxwZSwiXHUwM2IyIiwiXFxiZXRhIiwhMCksb2Uoc2UsbGUscGUsIlx1MDNiMyIsIlxcZ2FtbWEiLCEwKSxvZShzZSxsZSxwZSwiXHUwM2I0IiwiXFxkZWx0YSIsITApLG9lKHNlLGxlLHBlLCJcdTAzZjUiLCJcXGVwc2lsb24iLCEwKSxvZShzZSxsZSxwZSwiXHUwM2I2IiwiXFx6ZXRhIiwhMCksb2Uoc2UsbGUscGUsIlx1MDNiNyIsIlxcZXRhIiwhMCksb2Uoc2UsbGUscGUsIlx1MDNiOCIsIlxcdGhldGEiLCEwKSxvZShzZSxsZSxwZSwiXHUwM2I5IiwiXFxpb3RhIiwhMCksb2Uoc2UsbGUscGUsIlx1MDNiYSIsIlxca2FwcGEiLCEwKSxvZShzZSxsZSxwZSwiXHUwM2JiIiwiXFxsYW1iZGEiLCEwKSxvZShzZSxsZSxwZSwiXHUwM2JjIiwiXFxtdSIsITApLG9lKHNlLGxlLHBlLCJcdTAzYmQiLCJcXG51IiwhMCksb2Uoc2UsbGUscGUsIlx1MDNiZSIsIlxceGkiLCEwKSxvZShzZSxsZSxwZSwiXHUwM2JmIiwiXFxvbWljcm9uIiwhMCksb2Uoc2UsbGUscGUsIlx1MDNjMCIsIlxccGkiLCEwKSxvZShzZSxsZSxwZSwiXHUwM2MxIiwiXFxyaG8iLCEwKSxvZShzZSxsZSxwZSwiXHUwM2MzIiwiXFxzaWdtYSIsITApLG9lKHNlLGxlLHBlLCJcdTAzYzQiLCJcXHRhdSIsITApLG9lKHNlLGxlLHBlLCJcdTAzYzUiLCJcXHVwc2lsb24iLCEwKSxvZShzZSxsZSxwZSwiXHUwM2Q1IiwiXFxwaGkiLCEwKSxvZShzZSxsZSxwZSwiXHUwM2M3IiwiXFxjaGkiLCEwKSxvZShzZSxsZSxwZSwiXHUwM2M4IiwiXFxwc2kiLCEwKSxvZShzZSxsZSxwZSwiXHUwM2M5IiwiXFxvbWVnYSIsITApLG9lKHNlLGxlLHBlLCJcdTAzYjUiLCJcXHZhcmVwc2lsb24iLCEwKSxvZShzZSxsZSxwZSwiXHUwM2QxIiwiXFx2YXJ0aGV0YSIsITApLG9lKHNlLGxlLHBlLCJcdTAzZDYiLCJcXHZhcnBpIiwhMCksb2Uoc2UsbGUscGUsIlx1MDNmMSIsIlxcdmFycmhvIiwhMCksb2Uoc2UsbGUscGUsIlx1MDNjMiIsIlxcdmFyc2lnbWEiLCEwKSxvZShzZSxsZSxwZSwiXHUwM2M2IiwiXFx2YXJwaGkiLCEwKSxvZShzZSxsZSxoZSwiXHUyMjE3IiwiKiIsITApLG9lKHNlLGxlLGhlLCIrIiwiKyIpLG9lKHNlLGxlLGhlLCJcdTIyMTIiLCItIiwhMCksb2Uoc2UsbGUsaGUsIlx1MjJjNSIsIlxcY2RvdCIsITApLG9lKHNlLGxlLGhlLCJcdTIyMTgiLCJcXGNpcmMiLCEwKSxvZShzZSxsZSxoZSwiXHhmNyIsIlxcZGl2IiwhMCksb2Uoc2UsbGUsaGUsIlx4YjEiLCJcXHBtIiwhMCksb2Uoc2UsbGUsaGUsIlx4ZDciLCJcXHRpbWVzIiwhMCksb2Uoc2UsbGUsaGUsIlx1MjIyOSIsIlxcY2FwIiwhMCksb2Uoc2UsbGUsaGUsIlx1MjIyYSIsIlxcY3VwIiwhMCksb2Uoc2UsbGUsaGUsIlx1MjIxNiIsIlxcc2V0bWludXMiLCEwKSxvZShzZSxsZSxoZSwiXHUyMjI3IiwiXFxsYW5kIiksb2Uoc2UsbGUsaGUsIlx1MjIyOCIsIlxcbG9yIiksb2Uoc2UsbGUsaGUsIlx1MjIyNyIsIlxcd2VkZ2UiLCEwKSxvZShzZSxsZSxoZSwiXHUyMjI4IiwiXFx2ZWUiLCEwKSxvZShzZSxsZSx4ZSwiXHUyMjFhIiwiXFxzdXJkIiksb2Uoc2UsbGUsZ2UsIlx1MjdlOCIsIlxcbGFuZ2xlIiwhMCksb2Uoc2UsbGUsZ2UsIlx1MjIyMyIsIlxcbHZlcnQiKSxvZShzZSxsZSxnZSwiXHUyMjI1IiwiXFxsVmVydCIpLG9lKHNlLGxlLG1lLCI/IiwiPyIpLG9lKHNlLGxlLG1lLCIhIiwiISIpLG9lKHNlLGxlLG1lLCJcdTI3ZTkiLCJcXHJhbmdsZSIsITApLG9lKHNlLGxlLG1lLCJcdTIyMjMiLCJcXHJ2ZXJ0Iiksb2Uoc2UsbGUsbWUsIlx1MjIyNSIsIlxcclZlcnQiKSxvZShzZSxsZSxiZSwiPSIsIj0iKSxvZShzZSxsZSxiZSwiOiIsIjoiKSxvZShzZSxsZSxiZSwiXHUyMjQ4IiwiXFxhcHByb3giLCEwKSxvZShzZSxsZSxiZSwiXHUyMjQ1IiwiXFxjb25nIiwhMCksb2Uoc2UsbGUsYmUsIlx1MjI2NSIsIlxcZ2UiKSxvZShzZSxsZSxiZSwiXHUyMjY1IiwiXFxnZXEiLCEwKSxvZShzZSxsZSxiZSwiXHUyMTkwIiwiXFxnZXRzIiksb2Uoc2UsbGUsYmUsIj4iLCJcXGd0IiwhMCksb2Uoc2UsbGUsYmUsIlx1MjIwOCIsIlxcaW4iLCEwKSxvZShzZSxsZSxiZSwiXHVlMDIwIiwiXFxAbm90Iiksb2Uoc2UsbGUsYmUsIlx1MjI4MiIsIlxcc3Vic2V0IiwhMCksb2Uoc2UsbGUsYmUsIlx1MjI4MyIsIlxcc3Vwc2V0IiwhMCksb2Uoc2UsbGUsYmUsIlx1MjI4NiIsIlxcc3Vic2V0ZXEiLCEwKSxvZShzZSxsZSxiZSwiXHUyMjg3IiwiXFxzdXBzZXRlcSIsITApLG9lKHNlLGFlLGJlLCJcdTIyODgiLCJcXG5zdWJzZXRlcSIsITApLG9lKHNlLGFlLGJlLCJcdTIyODkiLCJcXG5zdXBzZXRlcSIsITApLG9lKHNlLGxlLGJlLCJcdTIyYTgiLCJcXG1vZGVscyIpLG9lKHNlLGxlLGJlLCJcdTIxOTAiLCJcXGxlZnRhcnJvdyIsITApLG9lKHNlLGxlLGJlLCJcdTIyNjQiLCJcXGxlIiksb2Uoc2UsbGUsYmUsIlx1MjI2NCIsIlxcbGVxIiwhMCksb2Uoc2UsbGUsYmUsIjwiLCJcXGx0IiwhMCksb2Uoc2UsbGUsYmUsIlx1MjE5MiIsIlxccmlnaHRhcnJvdyIsITApLG9lKHNlLGxlLGJlLCJcdTIxOTIiLCJcXHRvIiksb2Uoc2UsYWUsYmUsIlx1MjI3MSIsIlxcbmdlcSIsITApLG9lKHNlLGFlLGJlLCJcdTIyNzAiLCJcXG5sZXEiLCEwKSxvZShzZSxsZSx5ZSwiXHhhMCIsIlxcICIpLG9lKHNlLGxlLHllLCJceGEwIiwiXFxzcGFjZSIpLG9lKHNlLGxlLHllLCJceGEwIiwiXFxub2JyZWFrc3BhY2UiKSxvZShpZSxsZSx5ZSwiXHhhMCIsIlxcICIpLG9lKGllLGxlLHllLCJceGEwIiwiICIpLG9lKGllLGxlLHllLCJceGEwIiwiXFxzcGFjZSIpLG9lKGllLGxlLHllLCJceGEwIiwiXFxub2JyZWFrc3BhY2UiKSxvZShzZSxsZSx5ZSwiIiwiXFxub2JyZWFrIiksb2Uoc2UsbGUseWUsIiIsIlxcYWxsb3dicmVhayIpLG9lKHNlLGxlLGZlLCIsIiwiLCIpLG9lKHNlLGxlLGZlLCI7IiwiOyIpLG9lKHNlLGFlLGhlLCJcdTIyYmMiLCJcXGJhcndlZGdlIiwhMCksb2Uoc2UsYWUsaGUsIlx1MjJiYiIsIlxcdmVlYmFyIiwhMCksb2Uoc2UsbGUsaGUsIlx1MjI5OSIsIlxcb2RvdCIsITApLG9lKHNlLGxlLGhlLCJcdTIyOTUiLCJcXG9wbHVzIiwhMCksb2Uoc2UsbGUsaGUsIlx1MjI5NyIsIlxcb3RpbWVzIiwhMCksb2Uoc2UsbGUseGUsIlx1MjIwMiIsIlxccGFydGlhbCIsITApLG9lKHNlLGxlLGhlLCJcdTIyOTgiLCJcXG9zbGFzaCIsITApLG9lKHNlLGFlLGhlLCJcdTIyOWEiLCJcXGNpcmNsZWRjaXJjIiwhMCksb2Uoc2UsYWUsaGUsIlx1MjJhMSIsIlxcYm94ZG90IiwhMCksb2Uoc2UsbGUsaGUsIlx1MjViMyIsIlxcYmlndHJpYW5nbGV1cCIpLG9lKHNlLGxlLGhlLCJcdTI1YmQiLCJcXGJpZ3RyaWFuZ2xlZG93biIpLG9lKHNlLGxlLGhlLCJcdTIwMjAiLCJcXGRhZ2dlciIpLG9lKHNlLGxlLGhlLCJcdTIyYzQiLCJcXGRpYW1vbmQiKSxvZShzZSxsZSxoZSwiXHUyMmM2IiwiXFxzdGFyIiksb2Uoc2UsbGUsaGUsIlx1MjVjMyIsIlxcdHJpYW5nbGVsZWZ0Iiksb2Uoc2UsbGUsaGUsIlx1MjViOSIsIlxcdHJpYW5nbGVyaWdodCIpLG9lKHNlLGxlLGdlLCJ7IiwiXFx7Iiksb2UoaWUsbGUseGUsInsiLCJcXHsiKSxvZShpZSxsZSx4ZSwieyIsIlxcdGV4dGJyYWNlbGVmdCIpLG9lKHNlLGxlLG1lLCJ9IiwiXFx9Iiksb2UoaWUsbGUseGUsIn0iLCJcXH0iKSxvZShpZSxsZSx4ZSwifSIsIlxcdGV4dGJyYWNlcmlnaHQiKSxvZShzZSxsZSxnZSwieyIsIlxcbGJyYWNlIiksb2Uoc2UsbGUsbWUsIn0iLCJcXHJicmFjZSIpLG9lKHNlLGxlLGdlLCJbIiwiXFxsYnJhY2siLCEwKSxvZShpZSxsZSx4ZSwiWyIsIlxcbGJyYWNrIiwhMCksb2Uoc2UsbGUsbWUsIl0iLCJcXHJicmFjayIsITApLG9lKGllLGxlLHhlLCJdIiwiXFxyYnJhY2siLCEwKSxvZShzZSxsZSxnZSwiKCIsIlxcbHBhcmVuIiwhMCksb2Uoc2UsbGUsbWUsIikiLCJcXHJwYXJlbiIsITApLG9lKGllLGxlLHhlLCI8IiwiXFx0ZXh0bGVzcyIsITApLG9lKGllLGxlLHhlLCI+IiwiXFx0ZXh0Z3JlYXRlciIsITApLG9lKHNlLGxlLGdlLCJcdTIzMGEiLCJcXGxmbG9vciIsITApLG9lKHNlLGxlLG1lLCJcdTIzMGIiLCJcXHJmbG9vciIsITApLG9lKHNlLGxlLGdlLCJcdTIzMDgiLCJcXGxjZWlsIiwhMCksb2Uoc2UsbGUsbWUsIlx1MjMwOSIsIlxccmNlaWwiLCEwKSxvZShzZSxsZSx4ZSwiXFwiLCJcXGJhY2tzbGFzaCIpLG9lKHNlLGxlLHhlLCJcdTIyMjMiLCJ8Iiksb2Uoc2UsbGUseGUsIlx1MjIyMyIsIlxcdmVydCIpLG9lKGllLGxlLHhlLCJ8IiwiXFx0ZXh0YmFyIiwhMCksb2Uoc2UsbGUseGUsIlx1MjIyNSIsIlxcfCIpLG9lKHNlLGxlLHhlLCJcdTIyMjUiLCJcXFZlcnQiKSxvZShpZSxsZSx4ZSwiXHUyMjI1IiwiXFx0ZXh0YmFyZGJsIiksb2UoaWUsbGUseGUsIn4iLCJcXHRleHRhc2NpaXRpbGRlIiksb2UoaWUsbGUseGUsIlxcIiwiXFx0ZXh0YmFja3NsYXNoIiksb2UoaWUsbGUseGUsIl4iLCJcXHRleHRhc2NpaWNpcmN1bSIpLG9lKHNlLGxlLGJlLCJcdTIxOTEiLCJcXHVwYXJyb3ciLCEwKSxvZShzZSxsZSxiZSwiXHUyMWQxIiwiXFxVcGFycm93IiwhMCksb2Uoc2UsbGUsYmUsIlx1MjE5MyIsIlxcZG93bmFycm93IiwhMCksb2Uoc2UsbGUsYmUsIlx1MjFkMyIsIlxcRG93bmFycm93IiwhMCksb2Uoc2UsbGUsYmUsIlx1MjE5NSIsIlxcdXBkb3duYXJyb3ciLCEwKSxvZShzZSxsZSxiZSwiXHUyMWQ1IiwiXFxVcGRvd25hcnJvdyIsITApLG9lKHNlLGxlLGRlLCJcdTIyMTAiLCJcXGNvcHJvZCIpLG9lKHNlLGxlLGRlLCJcdTIyYzEiLCJcXGJpZ3ZlZSIpLG9lKHNlLGxlLGRlLCJcdTIyYzAiLCJcXGJpZ3dlZGdlIiksb2Uoc2UsbGUsZGUsIlx1MmEwNCIsIlxcYmlndXBsdXMiKSxvZShzZSxsZSxkZSwiXHUyMmMyIiwiXFxiaWdjYXAiKSxvZShzZSxsZSxkZSwiXHUyMmMzIiwiXFxiaWdjdXAiKSxvZShzZSxsZSxkZSwiXHUyMjJiIiwiXFxpbnQiKSxvZShzZSxsZSxkZSwiXHUyMjJiIiwiXFxpbnRvcCIpLG9lKHNlLGxlLGRlLCJcdTIyMmMiLCJcXGlpbnQiKSxvZShzZSxsZSxkZSwiXHUyMjJkIiwiXFxpaWludCIpLG9lKHNlLGxlLGRlLCJcdTIyMGYiLCJcXHByb2QiKSxvZShzZSxsZSxkZSwiXHUyMjExIiwiXFxzdW0iKSxvZShzZSxsZSxkZSwiXHUyYTAyIiwiXFxiaWdvdGltZXMiKSxvZShzZSxsZSxkZSwiXHUyYTAxIiwiXFxiaWdvcGx1cyIpLG9lKHNlLGxlLGRlLCJcdTJhMDAiLCJcXGJpZ29kb3QiKSxvZShzZSxsZSxkZSwiXHUyMjJlIiwiXFxvaW50Iiksb2Uoc2UsbGUsZGUsIlx1MjIyZiIsIlxcb2lpbnQiKSxvZShzZSxsZSxkZSwiXHUyMjMwIiwiXFxvaWlpbnQiKSxvZShzZSxsZSxkZSwiXHUyYTA2IiwiXFxiaWdzcWN1cCIpLG9lKHNlLGxlLGRlLCJcdTIyMmIiLCJcXHNtYWxsaW50Iiksb2UoaWUsbGUsdWUsIlx1MjAyNiIsIlxcdGV4dGVsbGlwc2lzIiksb2Uoc2UsbGUsdWUsIlx1MjAyNiIsIlxcbWF0aGVsbGlwc2lzIiksb2UoaWUsbGUsdWUsIlx1MjAyNiIsIlxcbGRvdHMiLCEwKSxvZShzZSxsZSx1ZSwiXHUyMDI2IiwiXFxsZG90cyIsITApLG9lKHNlLGxlLHVlLCJcdTIyZWYiLCJcXEBjZG90cyIsITApLG9lKHNlLGxlLHVlLCJcdTIyZjEiLCJcXGRkb3RzIiwhMCksb2Uoc2UsbGUseGUsIlx1MjJlZSIsIlxcdmFydmRvdHMiKSxvZShpZSxsZSx4ZSwiXHUyMmVlIiwiXFx2YXJ2ZG90cyIpLG9lKHNlLGxlLGNlLCJcdTAyY2EiLCJcXGFjdXRlIiksb2Uoc2UsbGUsY2UsIlx1MDJjYiIsIlxcZ3JhdmUiKSxvZShzZSxsZSxjZSwiXHhhOCIsIlxcZGRvdCIpLG9lKHNlLGxlLGNlLCJ+IiwiXFx0aWxkZSIpLG9lKHNlLGxlLGNlLCJcdTAyYzkiLCJcXGJhciIpLG9lKHNlLGxlLGNlLCJcdTAyZDgiLCJcXGJyZXZlIiksb2Uoc2UsbGUsY2UsIlx1MDJjNyIsIlxcY2hlY2siKSxvZShzZSxsZSxjZSwiXiIsIlxcaGF0Iiksb2Uoc2UsbGUsY2UsIlx1MjBkNyIsIlxcdmVjIiksb2Uoc2UsbGUsY2UsIlx1MDJkOSIsIlxcZG90Iiksb2Uoc2UsbGUsY2UsIlx1MDJkYSIsIlxcbWF0aHJpbmciKSxvZShzZSxsZSxwZSwiXHVlMTMxIiwiXFxAaW1hdGgiKSxvZShzZSxsZSxwZSwiXHVlMjM3IiwiXFxAam1hdGgiKSxvZShzZSxsZSx4ZSwiXHUwMTMxIiwiXHUwMTMxIiksb2Uoc2UsbGUseGUsIlx1MDIzNyIsIlx1MDIzNyIpLG9lKGllLGxlLHhlLCJcdTAxMzEiLCJcXGkiLCEwKSxvZShpZSxsZSx4ZSwiXHUwMjM3IiwiXFxqIiwhMCksb2UoaWUsbGUseGUsIlx4ZGYiLCJcXHNzIiwhMCksb2UoaWUsbGUseGUsIlx4ZTYiLCJcXGFlIiwhMCksb2UoaWUsbGUseGUsIlx1MDE1MyIsIlxcb2UiLCEwKSxvZShpZSxsZSx4ZSwiXHhmOCIsIlxcbyIsITApLG9lKGllLGxlLHhlLCJceGM2IiwiXFxBRSIsITApLG9lKGllLGxlLHhlLCJcdTAxNTIiLCJcXE9FIiwhMCksb2UoaWUsbGUseGUsIlx4ZDgiLCJcXE8iLCEwKSxvZShpZSxsZSxjZSwiXHUwMmNhIiwiXFwnIiksb2UoaWUsbGUsY2UsIlx1MDJjYiIsIlxcYCIpLG9lKGllLGxlLGNlLCJcdTAyYzYiLCJcXF4iKSxvZShpZSxsZSxjZSwiXHUwMmRjIiwiXFx+Iiksb2UoaWUsbGUsY2UsIlx1MDJjOSIsIlxcPSIpLG9lKGllLGxlLGNlLCJcdTAyZDgiLCJcXHUiKSxvZShpZSxsZSxjZSwiXHUwMmQ5IiwiXFwuIiksb2UoaWUsbGUsY2UsIlx4YjgiLCJcXGMiKSxvZShpZSxsZSxjZSwiXHUwMmRhIiwiXFxyIiksb2UoaWUsbGUsY2UsIlx1MDJjNyIsIlxcdiIpLG9lKGllLGxlLGNlLCJceGE4IiwnXFwiJyksb2UoaWUsbGUsY2UsIlx1MDJkZCIsIlxcSCIpLG9lKGllLGxlLGNlLCJcdTI1ZWYiLCJcXHRleHRjaXJjbGVkIik7Y29uc3Qgd2U9eyItLSI6ITAsIi0tLSI6ITAsImBgIjohMCwiJyciOiEwfTtvZShpZSxsZSx4ZSwiXHUyMDEzIiwiLS0iLCEwKSxvZShpZSxsZSx4ZSwiXHUyMDEzIiwiXFx0ZXh0ZW5kYXNoIiksb2UoaWUsbGUseGUsIlx1MjAxNCIsIi0tLSIsITApLG9lKGllLGxlLHhlLCJcdTIwMTQiLCJcXHRleHRlbWRhc2giKSxvZShpZSxsZSx4ZSwiXHUyMDE4IiwiYCIsITApLG9lKGllLGxlLHhlLCJcdTIwMTgiLCJcXHRleHRxdW90ZWxlZnQiKSxvZShpZSxsZSx4ZSwiXHUyMDE5IiwiJyIsITApLG9lKGllLGxlLHhlLCJcdTIwMTkiLCJcXHRleHRxdW90ZXJpZ2h0Iiksb2UoaWUsbGUseGUsIlx1MjAxYyIsImBgIiwhMCksb2UoaWUsbGUseGUsIlx1MjAxYyIsIlxcdGV4dHF1b3RlZGJsbGVmdCIpLG9lKGllLGxlLHhlLCJcdTIwMWQiLCInJyIsITApLG9lKGllLGxlLHhlLCJcdTIwMWQiLCJcXHRleHRxdW90ZWRibHJpZ2h0Iiksb2Uoc2UsbGUseGUsIlx4YjAiLCJcXGRlZ3JlZSIsITApLG9lKGllLGxlLHhlLCJceGIwIiwiXFxkZWdyZWUiKSxvZShpZSxsZSx4ZSwiXHhiMCIsIlxcdGV4dGRlZ3JlZSIsITApLG9lKHNlLGxlLHhlLCJceGEzIiwiXFxwb3VuZHMiKSxvZShzZSxsZSx4ZSwiXHhhMyIsIlxcbWF0aHN0ZXJsaW5nIiwhMCksb2UoaWUsbGUseGUsIlx4YTMiLCJcXHBvdW5kcyIpLG9lKGllLGxlLHhlLCJceGEzIiwiXFx0ZXh0c3RlcmxpbmciLCEwKSxvZShzZSxhZSx4ZSwiXHUyNzIwIiwiXFxtYWx0ZXNlIiksb2UoaWUsYWUseGUsIlx1MjcyMCIsIlxcbWFsdGVzZSIpO2NvbnN0IHZlPScwMTIzNDU2Nzg5L0AuIic7Zm9yKGxldCBlPTA7ZTwxNDtlKyspe2NvbnN0IHQ9dmUuY2hhckF0KGUpO29lKHNlLGxlLHhlLHQsdCl9Y29uc3Qga2U9JzAxMjM0NTY3ODkhQCooKS09KyI7Oj8vLiwnO2ZvcihsZXQgZT0wO2U8MjU7ZSsrKXtjb25zdCB0PWtlLmNoYXJBdChlKTtvZShpZSxsZSx4ZSx0LHQpfWNvbnN0IHplPSJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6Ijtmb3IobGV0IGU9MDtlPDUyO2UrKyl7Y29uc3QgdD16ZS5jaGFyQXQoZSk7b2Uoc2UsbGUscGUsdCx0KSxvZShpZSxsZSx4ZSx0LHQpfWxldCBTZTtvZShzZSxhZSx4ZSwiQyIsIlx1MjEwMiIpLG9lKGllLGFlLHhlLCJDIiwiXHUyMTAyIiksb2Uoc2UsYWUseGUsIkgiLCJcdTIxMGQiKSxvZShpZSxhZSx4ZSwiSCIsIlx1MjEwZCIpLG9lKHNlLGFlLHhlLCJOIiwiXHUyMTE1Iiksb2UoaWUsYWUseGUsIk4iLCJcdTIxMTUiKSxvZShzZSxhZSx4ZSwiUCIsIlx1MjExOSIpLG9lKGllLGFlLHhlLCJQIiwiXHUyMTE5Iiksb2Uoc2UsYWUseGUsIlEiLCJcdTIxMWEiKSxvZShpZSxhZSx4ZSwiUSIsIlx1MjExYSIpLG9lKHNlLGFlLHhlLCJSIiwiXHUyMTFkIiksb2UoaWUsYWUseGUsIlIiLCJcdTIxMWQiKSxvZShzZSxhZSx4ZSwiWiIsIlx1MjEyNCIpLG9lKGllLGFlLHhlLCJaIiwiXHUyMTI0Iiksb2Uoc2UsbGUscGUsImgiLCJcdTIxMGUiKSxvZShpZSxsZSxwZSwiaCIsIlx1MjEwZSIpO2ZvcihsZXQgZT0wO2U8NTI7ZSsrKXtjb25zdCB0PXplLmNoYXJBdChlKTtTZT1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1MzQ5LDU2MzIwK2UpLG9lKHNlLGxlLHBlLHQsU2UpLG9lKGllLGxlLHhlLHQsU2UpLFNlPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUzNDksNTYzNzIrZSksb2Uoc2UsbGUscGUsdCxTZSksb2UoaWUsbGUseGUsdCxTZSksU2U9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTM0OSw1NjQyNCtlKSxvZShzZSxsZSxwZSx0LFNlKSxvZShpZSxsZSx4ZSx0LFNlKSxTZT1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1MzQ5LDU2NTgwK2UpLG9lKHNlLGxlLHBlLHQsU2UpLG9lKGllLGxlLHhlLHQsU2UpLFNlPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUzNDksNTY2ODQrZSksb2Uoc2UsbGUscGUsdCxTZSksb2UoaWUsbGUseGUsdCxTZSksU2U9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTM0OSw1NjczNitlKSxvZShzZSxsZSxwZSx0LFNlKSxvZShpZSxsZSx4ZSx0LFNlKSxTZT1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1MzQ5LDU2Nzg4K2UpLG9lKHNlLGxlLHBlLHQsU2UpLG9lKGllLGxlLHhlLHQsU2UpLFNlPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUzNDksNTY4NDArZSksb2Uoc2UsbGUscGUsdCxTZSksb2UoaWUsbGUseGUsdCxTZSksU2U9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTM0OSw1Njk0NCtlKSxvZShzZSxsZSxwZSx0LFNlKSxvZShpZSxsZSx4ZSx0LFNlKSxlPDI2JiYoU2U9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTM0OSw1NjYzMitlKSxvZShzZSxsZSxwZSx0LFNlKSxvZShpZSxsZSx4ZSx0LFNlKSxTZT1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1MzQ5LDU2NDc2K2UpLG9lKHNlLGxlLHBlLHQsU2UpLG9lKGllLGxlLHhlLHQsU2UpKX1TZT1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1MzQ5LDU2NjY4KSxvZShzZSxsZSxwZSwiayIsU2UpLG9lKGllLGxlLHhlLCJrIixTZSk7Zm9yKGxldCBlPTA7ZTwxMDtlKyspe2NvbnN0IHQ9ZS50b1N0cmluZygpO1NlPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUzNDksNTcyOTQrZSksb2Uoc2UsbGUscGUsdCxTZSksb2UoaWUsbGUseGUsdCxTZSksU2U9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTM0OSw1NzMxNCtlKSxvZShzZSxsZSxwZSx0LFNlKSxvZShpZSxsZSx4ZSx0LFNlKSxTZT1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1MzQ5LDU3MzI0K2UpLG9lKHNlLGxlLHBlLHQsU2UpLG9lKGllLGxlLHhlLHQsU2UpLFNlPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUzNDksNTczMzQrZSksb2Uoc2UsbGUscGUsdCxTZSksb2UoaWUsbGUseGUsdCxTZSl9Y29uc3QgTWU9Ilx4ZDBceGRlXHhmZSI7Zm9yKGxldCBlPTA7ZTwzO2UrKyl7Y29uc3QgdD1NZS5jaGFyQXQoZSk7b2Uoc2UsbGUscGUsdCx0KSxvZShpZSxsZSx4ZSx0LHQpfWNvbnN0IEFlPXttYXRoQ2xhc3M6Im1hdGhiZiIsdGV4dENsYXNzOiJ0ZXh0YmYiLGZvbnQ6Ik1haW4tQm9sZCJ9LFRlPXttYXRoQ2xhc3M6Im1hdGhub3JtYWwiLHRleHRDbGFzczoidGV4dGl0Iixmb250OiJNYXRoLUl0YWxpYyJ9LENlPXttYXRoQ2xhc3M6ImJvbGRzeW1ib2wiLHRleHRDbGFzczoiYm9sZHN5bWJvbCIsZm9udDoiTWFpbi1Cb2xkSXRhbGljIn0sQmU9e21hdGhDbGFzczoiIix0ZXh0Q2xhc3M6IiIsZm9udDoiIn0scWU9e21hdGhDbGFzczoibWF0aGZyYWsiLHRleHRDbGFzczoidGV4dGZyYWsiLGZvbnQ6IkZyYWt0dXItUmVndWxhciJ9LEllPXttYXRoQ2xhc3M6Im1hdGhiYiIsdGV4dENsYXNzOiJ0ZXh0YmIiLGZvbnQ6IkFNUy1SZWd1bGFyIn0sUmU9e21hdGhDbGFzczoibWF0aGJvbGRmcmFrIix0ZXh0Q2xhc3M6InRleHRib2xkZnJhayIsZm9udDoiRnJha3R1ci1SZWd1bGFyIn0sSGU9e21hdGhDbGFzczoibWF0aHNmIix0ZXh0Q2xhc3M6InRleHRzZiIsZm9udDoiU2Fuc1NlcmlmLVJlZ3VsYXIifSxFZT17bWF0aENsYXNzOiJtYXRoYm9sZHNmIix0ZXh0Q2xhc3M6InRleHRib2xkc2YiLGZvbnQ6IlNhbnNTZXJpZi1Cb2xkIn0sT2U9e21hdGhDbGFzczoibWF0aGl0c2YiLHRleHRDbGFzczoidGV4dGl0c2YiLGZvbnQ6IlNhbnNTZXJpZi1JdGFsaWMifSxOZT17bWF0aENsYXNzOiJtYXRodHQiLHRleHRDbGFzczoidGV4dHR0Iixmb250OiJUeXBld3JpdGVyLVJlZ3VsYXIifSxEZT1bQWUsQWUsVGUsVGUsQ2UsQ2Use21hdGhDbGFzczoibWF0aHNjciIsdGV4dENsYXNzOiJ0ZXh0c2NyIixmb250OiJTY3JpcHQtUmVndWxhciJ9LEJlLEJlLEJlLHFlLHFlLEllLEllLFJlLFJlLEhlLEhlLEVlLEVlLE9lLE9lLEJlLEJlLE5lLE5lXSxMZT1bQWUsQmUsSGUsRWUsTmVdLEZlPWZ1bmN0aW9uKGUsdCxyKXtpZihuZVtyXVtlXSl7Y29uc3QgdD1uZVtyXVtlXS5yZXBsYWNlO3QmJihlPXQpfXJldHVybnt2YWx1ZTplLG1ldHJpY3M6ZWUoZSx0LHIpfX0sUGU9ZnVuY3Rpb24oZSx0LHIsbixvKXtjb25zdCBzPUZlKGUsdCxyKSxpPXMubWV0cmljcztsZXQgbDtpZihlPXMudmFsdWUsaSl7bGV0IHQ9aS5pdGFsaWM7KCJ0ZXh0Ij09PXJ8fG4mJiJtYXRoaXQiPT09bi5mb250KSYmKHQ9MCksbD1uZXcgVyhlLGkuaGVpZ2h0LGkuZGVwdGgsdCxpLnNrZXcsaS53aWR0aCxvKX1lbHNlInVuZGVmaW5lZCIhPXR5cGVvZiBjb25zb2xlJiZjb25zb2xlLndhcm4oIk5vIGNoYXJhY3RlciBtZXRyaWNzIGZvciAnIitlKyInIGluIHN0eWxlICciK3QrIicgYW5kIG1vZGUgJyIrcisiJyIpLGw9bmV3IFcoZSwwLDAsMCwwLDAsbyk7aWYobil7bC5tYXhGb250U2l6ZT1uLnNpemVNdWx0aXBsaWVyLG4uc3R5bGUuaXNUaWdodCgpJiZsLmNsYXNzZXMucHVzaCgibXRpZ2h0Iik7Y29uc3QgZT1uLmdldENvbG9yKCk7ZSYmKGwuc3R5bGUuY29sb3I9ZSl9cmV0dXJuIGx9LFZlPWZ1bmN0aW9uKGUsdCxyLG4pe3JldHVybiB2b2lkIDA9PT1uJiYobj1bXSksImJvbGRzeW1ib2wiPT09ci5mb250JiZGZShlLCJNYWluLUJvbGQiLHQpLm1ldHJpY3M/UGUoZSwiTWFpbi1Cb2xkIix0LHIsbi5jb25jYXQoWyJtYXRoYmYiXSkpOiJcXCI9PT1lfHwibWFpbiI9PT1uZVt0XVtlXS5mb250P1BlKGUsIk1haW4tUmVndWxhciIsdCxyLG4pOlBlKGUsIkFNUy1SZWd1bGFyIix0LHIsbi5jb25jYXQoWyJhbXNybSJdKSl9LEdlPWZ1bmN0aW9uKGUsdCl7Y29uc3Qgcj0ibWF0aG9yZCI9PT1lLnR5cGU/Im1hdGhvcmQiOiJ0ZXh0b3JkIixvPWUubW9kZSxzPWUudGV4dCxpPVsibW9yZCJdLGw9dC5mb250LGE9dC5mb250RmFtaWx5LGM9dC5mb250V2VpZ2h0LGg9dC5mb250U2hhcGUsbT0ibWF0aCI9PT1vfHwidGV4dCI9PT1vJiYhIWwsdT1tP2w6YTtsZXQgcD0iIixkPSIiO2lmKDU1MzQ5PT09cy5jaGFyQ29kZUF0KDApKXtjb25zdCBlPShlPT57Y29uc3QgdD0xMDI0KihlLmNoYXJDb2RlQXQoMCktNTUyOTYpKyhlLmNoYXJDb2RlQXQoMSktNTYzMjApKzY1NTM2O2lmKDExOTgwODw9dCYmdDwxMjA0ODQpe2NvbnN0IGU9TWF0aC5mbG9vcigodC0xMTk4MDgpLzI2KTtyZXR1cm4gRGVbZV19aWYoMTIwNzgyPD10JiZ0PD0xMjA4MzEpe2NvbnN0IGU9TWF0aC5mbG9vcigodC0xMjA3ODIpLzEwKTtyZXR1cm4gTGVbZV19aWYoMTIwNDg1PT09dHx8MTIwNDg2PT09dClyZXR1cm4gRGVbMF07aWYoMTIwNDg2PHQmJnQ8MTIwNzgyKXJldHVybiBCZTt0aHJvdyBuZXcgbigiVW5zdXBwb3J0ZWQgY2hhcmFjdGVyOiAiK2UpfSkocyk7cD1lLmZvbnQsZD1lW28rIkNsYXNzIl19aWYocClyZXR1cm4gUGUocyxwLG8sdCxpLmNvbmNhdChkKSk7aWYodSl7bGV0IGUsbjtpZigiYm9sZHN5bWJvbCI9PT11KXtjb25zdCB0PWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4idGV4dG9yZCIhPT1yJiZGZShlLCJNYXRoLUJvbGRJdGFsaWMiLHQpLm1ldHJpY3M/e2ZvbnROYW1lOiJNYXRoLUJvbGRJdGFsaWMiLGZvbnRDbGFzczoiYm9sZHN5bWJvbCJ9Ontmb250TmFtZToiTWFpbi1Cb2xkIixmb250Q2xhc3M6Im1hdGhiZiJ9fShzLG8scik7ZT10LmZvbnROYW1lLG49W3QuZm9udENsYXNzXX1lbHNlIG0/KGU9ZXRbbF0uZm9udE5hbWUsbj1bbF0pOihlPVFlKGEsYyxoKSxuPVthLGMsaF0pO2lmKEZlKHMsZSxvKS5tZXRyaWNzKXJldHVybiBQZShzLGUsbyx0LGkuY29uY2F0KG4pKTtpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwod2UscykmJiJUeXBld3JpdGVyIj09PWUuc2xpY2UoMCwxMCkpe2NvbnN0IHI9W107Zm9yKGxldCBsPTA7bDxzLmxlbmd0aDtsKyspci5wdXNoKFBlKHNbbF0sZSxvLHQsaS5jb25jYXQobikpKTtyZXR1cm4gJGUocil9fWlmKCJtYXRob3JkIj09PXIpcmV0dXJuIFBlKHMsIk1hdGgtSXRhbGljIixvLHQsaS5jb25jYXQoWyJtYXRobm9ybWFsIl0pKTtpZigidGV4dG9yZCI9PT1yKXtjb25zdCBlPW5lW29dW3NdJiZuZVtvXVtzXS5mb250O2lmKCJhbXMiPT09ZSl7Y29uc3QgZT1RZSgiYW1zcm0iLGMsaCk7cmV0dXJuIFBlKHMsZSxvLHQsaS5jb25jYXQoImFtc3JtIixjLGgpKX1pZigibWFpbiIhPT1lJiZlKXtjb25zdCByPVFlKGUsYyxoKTtyZXR1cm4gUGUocyxyLG8sdCxpLmNvbmNhdChyLGMsaCkpfXtjb25zdCBlPVFlKCJ0ZXh0cm0iLGMsaCk7cmV0dXJuIFBlKHMsZSxvLHQsaS5jb25jYXQoYyxoKSl9fXRocm93IG5ldyBFcnJvcigidW5leHBlY3RlZCB0eXBlOiAiK3IrIiBpbiBtYWtlT3JkIil9LFVlPShlLHQpPT57aWYoRChlLmNsYXNzZXMpIT09RCh0LmNsYXNzZXMpfHxlLnNrZXchPT10LnNrZXd8fGUubWF4Rm9udFNpemUhPT10Lm1heEZvbnRTaXplfHwwIT09ZS5pdGFsaWMmJmUuaGFzQ2xhc3MoIm1hdGhub3JtYWwiKSlyZXR1cm4hMTtpZigxPT09ZS5jbGFzc2VzLmxlbmd0aCl7Y29uc3QgdD1lLmNsYXNzZXNbMF07aWYoIm1iaW4iPT09dHx8Im1vcmQiPT09dClyZXR1cm4hMX1mb3IoY29uc3QgciBvZiBPYmplY3Qua2V5cyhlLnN0eWxlKSlpZihlLnN0eWxlW3JdIT09dC5zdHlsZVtyXSlyZXR1cm4hMTtmb3IoY29uc3QgciBvZiBPYmplY3Qua2V5cyh0LnN0eWxlKSlpZihlLnN0eWxlW3JdIT09dC5zdHlsZVtyXSlyZXR1cm4hMTtyZXR1cm4hMH0samU9ZT0+e2ZvcihsZXQgdD0wO3Q8ZS5sZW5ndGgtMTt0Kyspe2NvbnN0IHI9ZVt0XSxuPWVbdCsxXTtyIGluc3RhbmNlb2YgVyYmbiBpbnN0YW5jZW9mIFcmJlVlKHIsbikmJihyLnRleHQrPW4udGV4dCxyLmhlaWdodD1NYXRoLm1heChyLmhlaWdodCxuLmhlaWdodCksci5kZXB0aD1NYXRoLm1heChyLmRlcHRoLG4uZGVwdGgpLHIuaXRhbGljPW4uaXRhbGljLGUuc3BsaWNlKHQrMSwxKSx0LS0pfXJldHVybiBlfSxYZT1mdW5jdGlvbihlKXtsZXQgdD0wLHI9MCxuPTA7Zm9yKGxldCBvPTA7bzxlLmNoaWxkcmVuLmxlbmd0aDtvKyspe2NvbnN0IHM9ZS5jaGlsZHJlbltvXTtzLmhlaWdodD50JiYodD1zLmhlaWdodCkscy5kZXB0aD5yJiYocj1zLmRlcHRoKSxzLm1heEZvbnRTaXplPm4mJihuPXMubWF4Rm9udFNpemUpfWUuaGVpZ2h0PXQsZS5kZXB0aD1yLGUubWF4Rm9udFNpemU9bn0sWWU9ZnVuY3Rpb24oZSx0LHIsbil7Y29uc3Qgbz1uZXcgVShlLHQscixuKTtyZXR1cm4gWGUobyksb30sV2U9KGUsdCxyLG4pPT5uZXcgVShlLHQscixuKSxfZT1mdW5jdGlvbihlLHQscil7Y29uc3Qgbj1ZZShbZV0sW10sdCk7cmV0dXJuIG4uaGVpZ2h0PU1hdGgubWF4KHJ8fHQuZm9udE1ldHJpY3MoKS5kZWZhdWx0UnVsZVRoaWNrbmVzcyx0Lm1pblJ1bGVUaGlja25lc3MpLG4uc3R5bGUuYm9yZGVyQm90dG9tV2lkdGg9TihuLmhlaWdodCksbi5tYXhGb250U2l6ZT0xLG59LCRlPWZ1bmN0aW9uKGUpe2NvbnN0IHQ9bmV3IEkoZSk7cmV0dXJuIFhlKHQpLHR9LFplPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUgaW5zdGFuY2VvZiBJP1llKFtdLFtlXSx0KTplfSxLZT1mdW5jdGlvbihlLHQpe2NvbnN0IHI9ZnVuY3Rpb24oZSl7aWYoImluZGl2aWR1YWxTaGlmdCI9PT1lLnBvc2l0aW9uVHlwZSl7Y29uc3QgdD1lLmNoaWxkcmVuLHI9W3RbMF1dLG49LXRbMF0uc2hpZnQtdFswXS5lbGVtLmRlcHRoO2xldCBvPW47Zm9yKGxldCBlPTE7ZTx0Lmxlbmd0aDtlKyspe2NvbnN0IG49LXRbZV0uc2hpZnQtby10W2VdLmVsZW0uZGVwdGgscz1uLSh0W2UtMV0uZWxlbS5oZWlnaHQrdFtlLTFdLmVsZW0uZGVwdGgpO28rPW4sci5wdXNoKHt0eXBlOiJrZXJuIixzaXplOnN9KSxyLnB1c2godFtlXSl9cmV0dXJue2NoaWxkcmVuOnIsZGVwdGg6bn19bGV0IHQ7aWYoInRvcCI9PT1lLnBvc2l0aW9uVHlwZSl7bGV0IHI9ZS5wb3NpdGlvbkRhdGE7Zm9yKGxldCB0PTA7dDxlLmNoaWxkcmVuLmxlbmd0aDt0Kyspe2NvbnN0IG49ZS5jaGlsZHJlblt0XTtyLT0ia2VybiI9PT1uLnR5cGU/bi5zaXplOm4uZWxlbS5oZWlnaHQrbi5lbGVtLmRlcHRofXQ9cn1lbHNlIGlmKCJib3R0b20iPT09ZS5wb3NpdGlvblR5cGUpdD0tZS5wb3NpdGlvbkRhdGE7ZWxzZXtjb25zdCByPWUuY2hpbGRyZW5bMF07aWYoImVsZW0iIT09ci50eXBlKXRocm93IG5ldyBFcnJvcignRmlyc3QgY2hpbGQgbXVzdCBoYXZlIHR5cGUgImVsZW0iLicpO2lmKCJzaGlmdCI9PT1lLnBvc2l0aW9uVHlwZSl0PS1yLmVsZW0uZGVwdGgtZS5wb3NpdGlvbkRhdGE7ZWxzZXtpZigiZmlyc3RCYXNlbGluZSIhPT1lLnBvc2l0aW9uVHlwZSl0aHJvdyBuZXcgRXJyb3IoIkludmFsaWQgcG9zaXRpb25UeXBlICIrZS5wb3NpdGlvblR5cGUrIi4iKTt0PS1yLmVsZW0uZGVwdGh9fXJldHVybntjaGlsZHJlbjplLmNoaWxkcmVuLGRlcHRoOnR9fShlKSxuPXIuY2hpbGRyZW4sbz1yLmRlcHRoO2xldCBzPTA7Zm9yKGxldCBlPTA7ZTxuLmxlbmd0aDtlKyspe2NvbnN0IHQ9bltlXTtpZigiZWxlbSI9PT10LnR5cGUpe2NvbnN0IGU9dC5lbGVtO3M9TWF0aC5tYXgocyxlLm1heEZvbnRTaXplLGUuaGVpZ2h0KX19cys9Mjtjb25zdCBpPVllKFsicHN0cnV0Il0sW10pO2kuc3R5bGUuaGVpZ2h0PU4ocyk7Y29uc3QgbD1bXTtsZXQgYT1vLGM9byxoPW87Zm9yKGxldCBlPTA7ZTxuLmxlbmd0aDtlKyspe2NvbnN0IHQ9bltlXTtpZigia2VybiI9PT10LnR5cGUpaCs9dC5zaXplO2Vsc2V7Y29uc3QgZT10LmVsZW0scj10LndyYXBwZXJDbGFzc2VzfHxbXSxuPXQud3JhcHBlclN0eWxlfHx7fSxvPVllKHIsW2ksZV0sdm9pZCAwLG4pO28uc3R5bGUudG9wPU4oLXMtaC1lLmRlcHRoKSx0Lm1hcmdpbkxlZnQmJihvLnN0eWxlLm1hcmdpbkxlZnQ9dC5tYXJnaW5MZWZ0KSx0Lm1hcmdpblJpZ2h0JiYoby5zdHlsZS5tYXJnaW5SaWdodD10Lm1hcmdpblJpZ2h0KSxsLnB1c2gobyksaCs9ZS5oZWlnaHQrZS5kZXB0aH1hPU1hdGgubWluKGEsaCksYz1NYXRoLm1heChjLGgpfWNvbnN0IG09WWUoWyJ2bGlzdCJdLGwpO2xldCB1O2lmKG0uc3R5bGUuaGVpZ2h0PU4oYyksYTwwKXtjb25zdCBlPVllKFtdLFtdKSx0PVllKFsidmxpc3QiXSxbZV0pO3Quc3R5bGUuaGVpZ2h0PU4oLWEpO2NvbnN0IHI9WWUoWyJ2bGlzdC1zIl0sW25ldyBXKCJcdTIwMGIiKV0pO3U9W1llKFsidmxpc3QtciJdLFttLHJdKSxZZShbInZsaXN0LXIiXSxbdF0pXX1lbHNlIHU9W1llKFsidmxpc3QtciJdLFttXSldO2NvbnN0IHA9WWUoWyJ2bGlzdC10Il0sdSk7cmV0dXJuIDI9PT11Lmxlbmd0aCYmcC5jbGFzc2VzLnB1c2goInZsaXN0LXQyIikscC5oZWlnaHQ9YyxwLmRlcHRoPS1hLHB9LEplPShlLHQpPT57Y29uc3Qgcj1ZZShbIm1zcGFjZSJdLFtdLHQpLG49TyhlLHQpO3JldHVybiByLnN0eWxlLm1hcmdpblJpZ2h0PU4obikscn0sUWU9KGUsdCxyKT0+e2xldCBuLG87c3dpdGNoKGUpe2Nhc2UiYW1zcm0iOm49IkFNUyI7YnJlYWs7Y2FzZSJ0ZXh0cm0iOm49Ik1haW4iO2JyZWFrO2Nhc2UidGV4dHNmIjpuPSJTYW5zU2VyaWYiO2JyZWFrO2Nhc2UidGV4dHR0IjpuPSJUeXBld3JpdGVyIjticmVhaztkZWZhdWx0Om49ZX1yZXR1cm4gbz0idGV4dGJmIj09PXQmJiJ0ZXh0aXQiPT09cj8iQm9sZEl0YWxpYyI6InRleHRiZiI9PT10PyJCb2xkIjoidGV4dGl0Ij09PXI/Ikl0YWxpYyI6IlJlZ3VsYXIiLG4rIi0iK299LGV0PXttYXRoYmY6e3ZhcmlhbnQ6ImJvbGQiLGZvbnROYW1lOiJNYWluLUJvbGQifSxtYXRocm06e3ZhcmlhbnQ6Im5vcm1hbCIsZm9udE5hbWU6Ik1haW4tUmVndWxhciJ9LHRleHRpdDp7dmFyaWFudDoiaXRhbGljIixmb250TmFtZToiTWFpbi1JdGFsaWMifSxtYXRoaXQ6e3ZhcmlhbnQ6Iml0YWxpYyIsZm9udE5hbWU6Ik1haW4tSXRhbGljIn0sbWF0aG5vcm1hbDp7dmFyaWFudDoiaXRhbGljIixmb250TmFtZToiTWF0aC1JdGFsaWMifSxtYXRoc2ZpdDp7dmFyaWFudDoic2Fucy1zZXJpZi1pdGFsaWMiLGZvbnROYW1lOiJTYW5zU2VyaWYtSXRhbGljIn0sbWF0aGJiOnt2YXJpYW50OiJkb3VibGUtc3RydWNrIixmb250TmFtZToiQU1TLVJlZ3VsYXIifSxtYXRoY2FsOnt2YXJpYW50OiJzY3JpcHQiLGZvbnROYW1lOiJDYWxpZ3JhcGhpYy1SZWd1bGFyIn0sbWF0aGZyYWs6e3ZhcmlhbnQ6ImZyYWt0dXIiLGZvbnROYW1lOiJGcmFrdHVyLVJlZ3VsYXIifSxtYXRoc2NyOnt2YXJpYW50OiJzY3JpcHQiLGZvbnROYW1lOiJTY3JpcHQtUmVndWxhciJ9LG1hdGhzZjp7dmFyaWFudDoic2Fucy1zZXJpZiIsZm9udE5hbWU6IlNhbnNTZXJpZi1SZWd1bGFyIn0sbWF0aHR0Ont2YXJpYW50OiJtb25vc3BhY2UiLGZvbnROYW1lOiJUeXBld3JpdGVyLVJlZ3VsYXIifX0sdHQ9e3ZlYzpbInZlYyIsLjQ3MSwuNzE0XSxvaWludFNpemUxOlsib2lpbnRTaXplMSIsLjk1NywuNDk5XSxvaWludFNpemUyOlsib2lpbnRTaXplMiIsMS40NzIsLjY1OV0sb2lpaW50U2l6ZTE6WyJvaWlpbnRTaXplMSIsMS4zMDQsLjQ5OV0sb2lpaW50U2l6ZTI6WyJvaWlpbnRTaXplMiIsMS45OCwuNjU5XX0scnQ9ZnVuY3Rpb24oZSx0KXtjb25zdCByPXR0W2VdLG49clswXSxvPXJbMV0scz1yWzJdLGk9bmV3ICQobiksbD1uZXcgXyhbaV0se3dpZHRoOk4obyksaGVpZ2h0Ok4ocyksc3R5bGU6IndpZHRoOiIrTihvKSx2aWV3Qm94OiIwIDAgIisxZTMqbysiICIrMWUzKnMscHJlc2VydmVBc3BlY3RSYXRpbzoieE1pbllNaW4ifSksYT1XZShbImthdGV4LW92ZXJsYXkiXSxbbF0sdCk7cmV0dXJuIGEuaGVpZ2h0PXMsYS5zdHlsZS5oZWlnaHQ9TihzKSxhLnN0eWxlLndpZHRoPU4obyksYX0sbnQ9e251bWJlcjozLHVuaXQ6Im11In0sb3Q9e251bWJlcjo0LHVuaXQ6Im11In0sc3Q9e251bWJlcjo1LHVuaXQ6Im11In0saXQ9e21vcmQ6e21vcDpudCxtYmluOm90LG1yZWw6c3QsbWlubmVyOm50fSxtb3A6e21vcmQ6bnQsbW9wOm50LG1yZWw6c3QsbWlubmVyOm50fSxtYmluOnttb3JkOm90LG1vcDpvdCxtb3BlbjpvdCxtaW5uZXI6b3R9LG1yZWw6e21vcmQ6c3QsbW9wOnN0LG1vcGVuOnN0LG1pbm5lcjpzdH0sbW9wZW46e30sbWNsb3NlOnttb3A6bnQsbWJpbjpvdCxtcmVsOnN0LG1pbm5lcjpudH0sbXB1bmN0Onttb3JkOm50LG1vcDpudCxtcmVsOnN0LG1vcGVuOm50LG1jbG9zZTpudCxtcHVuY3Q6bnQsbWlubmVyOm50fSxtaW5uZXI6e21vcmQ6bnQsbW9wOm50LG1iaW46b3QsbXJlbDpzdCxtb3BlbjpudCxtcHVuY3Q6bnQsbWlubmVyOm50fX0sbHQ9e21vcmQ6e21vcDpudH0sbW9wOnttb3JkOm50LG1vcDpudH0sbWJpbjp7fSxtcmVsOnt9LG1vcGVuOnt9LG1jbG9zZTp7bW9wOm50fSxtcHVuY3Q6e30sbWlubmVyOnttb3A6bnR9fSxhdD17fSxjdD17fSxodD17fTtmdW5jdGlvbiBtdChlKXtjb25zdCB0PWUudHlwZSxyPWUubmFtZXMsbj1lLmh0bWxCdWlsZGVyLG89ZS5tYXRobWxCdWlsZGVyO2ZvcihsZXQgdD0wO3Q8ci5sZW5ndGg7Kyt0KWF0W3JbdF1dPWU7dCYmKG4mJihjdFt0XT1uKSxvJiYoaHRbdF09bykpfWZ1bmN0aW9uIHV0KGUpe2xldCB0PWUudHlwZSxyPWUuaHRtbEJ1aWxkZXIsbj1lLm1hdGhtbEJ1aWxkZXI7ciYmKGN0W3RdPXIpLG4mJihodFt0XT1uKX1jb25zdCBwdD1mdW5jdGlvbihlKXtyZXR1cm4ib3JkZ3JvdXAiPT09ZS50eXBlJiYxPT09ZS5ib2R5Lmxlbmd0aD9lLmJvZHlbMF06ZX0sZHQ9ZnVuY3Rpb24oZSl7cmV0dXJuIm9yZGdyb3VwIj09PWUudHlwZT9lLmJvZHk6W2VdfSxndD1uZXcgU2V0KFsibGVmdG1vc3QiLCJtYmluIiwibW9wZW4iLCJtcmVsIiwibW9wIiwibXB1bmN0Il0pLGZ0PW5ldyBTZXQoWyJyaWdodG1vc3QiLCJtcmVsIiwibWNsb3NlIiwibXB1bmN0Il0pLGJ0PXtkaXNwbGF5OlMuRElTUExBWSx0ZXh0OlMuVEVYVCxzY3JpcHQ6Uy5TQ1JJUFQsc2NyaXB0c2NyaXB0OlMuU0NSSVBUU0NSSVBUfSx5dD17bW9yZDoibW9yZCIsbW9wOiJtb3AiLG1iaW46Im1iaW4iLG1yZWw6Im1yZWwiLG1vcGVuOiJtb3BlbiIsbWNsb3NlOiJtY2xvc2UiLG1wdW5jdDoibXB1bmN0IixtaW5uZXI6Im1pbm5lciJ9LHh0PWZ1bmN0aW9uKGUsdCxyLG4pe3ZvaWQgMD09PW4mJihuPVtudWxsLG51bGxdKTtjb25zdCBvPVtdO2ZvcihsZXQgcj0wO3I8ZS5sZW5ndGg7cisrKXtjb25zdCBuPU10KGVbcl0sdCk7aWYobiBpbnN0YW5jZW9mIEkpe2NvbnN0IGU9bi5jaGlsZHJlbjtvLnB1c2goLi4uZSl9ZWxzZSBvLnB1c2gobil9aWYoamUobyksIXIpcmV0dXJuIG87bGV0IHM9dDtpZigxPT09ZS5sZW5ndGgpe2NvbnN0IHI9ZVswXTsic2l6aW5nIj09PXIudHlwZT9zPXQuaGF2aW5nU2l6ZShyLnNpemUpOiJzdHlsaW5nIj09PXIudHlwZSYmKHM9dC5oYXZpbmdTdHlsZShidFtyLnN0eWxlXSkpfWNvbnN0IGk9WWUoW25bMF18fCJsZWZ0bW9zdCJdLFtdLHQpLGw9WWUoW25bMV18fCJyaWdodG1vc3QiXSxbXSx0KSxhPSJyb290Ij09PXI7cmV0dXJuIHd0KG8sKGUsdCk9Pntjb25zdCByPXQuY2xhc3Nlc1swXSxuPWUuY2xhc3Nlc1swXTsibWJpbiI9PT1yJiZmdC5oYXMobik/dC5jbGFzc2VzWzBdPSJtb3JkIjoibWJpbiI9PT1uJiZndC5oYXMocikmJihlLmNsYXNzZXNbMF09Im1vcmQiKX0se25vZGU6aX0sbCxhKSx3dChvLChlLHQpPT57dmFyIHIsbjtjb25zdCBvPXp0KHQpLGk9enQoZSksbD1vJiZpP2UuaGFzQ2xhc3MoIm10aWdodCIpP251bGw9PShyPWx0W29dKT92b2lkIDA6cltpXTpudWxsPT0obj1pdFtvXSk/dm9pZCAwOm5baV06bnVsbDtpZihsKXJldHVybiBKZShsLHMpfSx7bm9kZTppfSxsLGEpLG99LHd0PWZ1bmN0aW9uKGUsdCxyLG4sbyl7biYmZS5wdXNoKG4pO2xldCBzPTA7Zm9yKDtzPGUubGVuZ3RoO3MrKyl7Y29uc3Qgbj1lW3NdLGk9dnQobik7aWYoaSl7d3QoaS5jaGlsZHJlbix0LHIsbnVsbCxvKTtjb250aW51ZX1jb25zdCBsPSFuLmhhc0NsYXNzKCJtc3BhY2UiKTtpZihsKXtjb25zdCBvPXQobixyLm5vZGUpO28mJihyLmluc2VydEFmdGVyP3IuaW5zZXJ0QWZ0ZXIobyk6KGUudW5zaGlmdChvKSxzKyspKX1sP3Iubm9kZT1uOm8mJm4uaGFzQ2xhc3MoImthdGV4LW5ld2xpbmUiKSYmKHIubm9kZT1ZZShbImxlZnRtb3N0Il0pKSxyLmluc2VydEFmdGVyPSh0PT5yPT57ZS5zcGxpY2UodCsxLDAscikscysrfSkocyl9biYmZS5wb3AoKX0sdnQ9ZnVuY3Rpb24oZSl7cmV0dXJuIGUgaW5zdGFuY2VvZiBJfHxlIGluc3RhbmNlb2Yganx8ZSBpbnN0YW5jZW9mIFUmJmUuaGFzQ2xhc3MoImVuY2xvc2luZyIpP2U6bnVsbH0sa3Q9ZnVuY3Rpb24oZSx0KXtjb25zdCByPXZ0KGUpO2lmKHIpe2NvbnN0IGU9ci5jaGlsZHJlbjtpZihlLmxlbmd0aCl7aWYoInJpZ2h0Ij09PXQpcmV0dXJuIGt0KGVbZS5sZW5ndGgtMV0sInJpZ2h0Iik7aWYoImxlZnQiPT09dClyZXR1cm4ga3QoZVswXSwibGVmdCIpfX1yZXR1cm4gZX0senQ9ZnVuY3Rpb24oZSx0KXtpZighZSlyZXR1cm4gbnVsbDt0JiYoZT1rdChlLHQpKTtjb25zdCByPWUuY2xhc3Nlc1swXTtyZXR1cm4geXRbcl18fG51bGx9LFN0PWZ1bmN0aW9uKGUsdCl7Y29uc3Qgcj1bIm51bGxkZWxpbWl0ZXIiXS5jb25jYXQoZS5iYXNlU2l6aW5nQ2xhc3NlcygpKTtyZXR1cm4gWWUodC5jb25jYXQocikpfSxNdD1mdW5jdGlvbihlLHQscil7aWYoIWUpcmV0dXJuIFllKCk7aWYoY3RbZS50eXBlXSl7bGV0IG49Y3RbZS50eXBlXShlLHQpO2lmKHImJnQuc2l6ZSE9PXIuc2l6ZSl7bj1ZZSh0LnNpemluZ0NsYXNzZXMociksW25dLHQpO2NvbnN0IGU9dC5zaXplTXVsdGlwbGllci9yLnNpemVNdWx0aXBsaWVyO24uaGVpZ2h0Kj1lLG4uZGVwdGgqPWV9cmV0dXJuIG59dGhyb3cgbmV3IG4oIkdvdCBncm91cCBvZiB1bmtub3duIHR5cGU6ICciK2UudHlwZSsiJyIpfTtmdW5jdGlvbiBBdChlLHQpe2NvbnN0IHI9WWUoWyJrYXRleC1iYXNlIl0sZSx0KSxuPVllKFsia2F0ZXgtc3RydXQiXSk7cmV0dXJuIG4uc3R5bGUuaGVpZ2h0PU4oci5oZWlnaHQrci5kZXB0aCksci5kZXB0aCYmKG4uc3R5bGUudmVydGljYWxBbGlnbj1OKC1yLmRlcHRoKSksci5jaGlsZHJlbi51bnNoaWZ0KG4pLHJ9ZnVuY3Rpb24gVHQoZSx0KXtsZXQgcj1udWxsOzE9PT1lLmxlbmd0aCYmInRhZyI9PT1lWzBdLnR5cGUmJihyPWVbMF0udGFnLGU9ZVswXS5ib2R5KTtjb25zdCBuPXh0KGUsdCwicm9vdCIpO2xldCBvOzI9PT1uLmxlbmd0aCYmblsxXS5oYXNDbGFzcygia2F0ZXgtdGFnIikmJihvPW4ucG9wKCkpO2NvbnN0IHM9W107bGV0IGksbD1bXTtmb3IobGV0IGU9MDtlPG4ubGVuZ3RoO2UrKylpZihsLnB1c2gobltlXSksbltlXS5oYXNDbGFzcygibWJpbiIpfHxuW2VdLmhhc0NsYXNzKCJtcmVsIil8fG5bZV0uaGFzQ2xhc3MoImFsbG93YnJlYWsiKSl7bGV0IHI9ITE7Zm9yKDtlPG4ubGVuZ3RoLTEmJm5bZSsxXS5oYXNDbGFzcygibXNwYWNlIikmJiFuW2UrMV0uaGFzQ2xhc3MoImthdGV4LW5ld2xpbmUiKTspZSsrLGwucHVzaChuW2VdKSxuW2VdLmhhc0NsYXNzKCJub2JyZWFrIikmJihyPSEwKTtyfHwocy5wdXNoKEF0KGwsdCkpLGw9W10pfWVsc2UgbltlXS5oYXNDbGFzcygia2F0ZXgtbmV3bGluZSIpJiYobC5wb3AoKSxsLmxlbmd0aD4wJiYocy5wdXNoKEF0KGwsdCkpLGw9W10pLHMucHVzaChuW2VdKSk7bC5sZW5ndGg+MCYmcy5wdXNoKEF0KGwsdCkpLHI/KGk9QXQoeHQocix0LCEwKSx0KSxpLmNsYXNzZXM9WyJrYXRleC10YWciXSxzLnB1c2goaSkpOm8mJnMucHVzaChvKTtjb25zdCBhPVllKFsia2F0ZXgtaHRtbCJdLHMpO2lmKGEuc2V0QXR0cmlidXRlKCJhcmlhLWhpZGRlbiIsInRydWUiKSxpKXtjb25zdCBlPWkuY2hpbGRyZW5bMF07ZS5zdHlsZS5oZWlnaHQ9TihhLmhlaWdodCthLmRlcHRoKSxhLmRlcHRoJiYoZS5zdHlsZS52ZXJ0aWNhbEFsaWduPU4oLWEuZGVwdGgpKX1yZXR1cm4gYX1mdW5jdGlvbiBDdChlKXtyZXR1cm4gbmV3IEkoZSl9Y2xhc3MgQnR7Y29uc3RydWN0b3IoZSx0LHIpe3RoaXMudHlwZT12b2lkIDAsdGhpcy5hdHRyaWJ1dGVzPXZvaWQgMCx0aGlzLmNoaWxkcmVuPXZvaWQgMCx0aGlzLmNsYXNzZXM9dm9pZCAwLHRoaXMudHlwZT1lLHRoaXMuYXR0cmlidXRlcz17fSx0aGlzLmNoaWxkcmVuPXR8fFtdLHRoaXMuY2xhc3Nlcz1yfHxbXX1zZXRBdHRyaWJ1dGUoZSx0KXt0aGlzLmF0dHJpYnV0ZXNbZV09dH1nZXRBdHRyaWJ1dGUoZSl7cmV0dXJuIHRoaXMuYXR0cmlidXRlc1tlXX10b05vZGUoKXtjb25zdCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygiaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCIsdGhpcy50eXBlKTtmb3IoY29uc3QgdCBvZiBPYmplY3QuZW50cmllcyh0aGlzLmF0dHJpYnV0ZXMpKXtjb25zdCByPXRbMF0sbj10WzFdO2Uuc2V0QXR0cmlidXRlKHIsbil9dGhpcy5jbGFzc2VzLmxlbmd0aD4wJiYoZS5jbGFzc05hbWU9RCh0aGlzLmNsYXNzZXMpKTtmb3IobGV0IHQ9MDt0PHRoaXMuY2hpbGRyZW4ubGVuZ3RoO3QrKylpZih0aGlzLmNoaWxkcmVuW3RdaW5zdGFuY2VvZiBxdCYmdGhpcy5jaGlsZHJlblt0KzFdaW5zdGFuY2VvZiBxdCl7bGV0IHI9dGhpcy5jaGlsZHJlblt0XS50b1RleHQoKSt0aGlzLmNoaWxkcmVuWysrdF0udG9UZXh0KCk7Zm9yKDt0aGlzLmNoaWxkcmVuW3QrMV1pbnN0YW5jZW9mIHF0OylyKz10aGlzLmNoaWxkcmVuWysrdF0udG9UZXh0KCk7ZS5hcHBlbmRDaGlsZChuZXcgcXQocikudG9Ob2RlKCkpfWVsc2UgZS5hcHBlbmRDaGlsZCh0aGlzLmNoaWxkcmVuW3RdLnRvTm9kZSgpKTtyZXR1cm4gZX10b01hcmt1cCgpe2xldCBlPSI8Iit0aGlzLnR5cGU7Zm9yKGNvbnN0IHQgb2YgT2JqZWN0LmVudHJpZXModGhpcy5hdHRyaWJ1dGVzKSl7Y29uc3Qgcj10WzBdLG49dFsxXTtlKz0iICIrcisnPSInLGUrPWEobiksZSs9JyInfXRoaXMuY2xhc3Nlcy5sZW5ndGg+MCYmKGUrPScgY2xhc3MgPSInK2EoRCh0aGlzLmNsYXNzZXMpKSsnIicpLGUrPSI+Ijtmb3IobGV0IHQ9MDt0PHRoaXMuY2hpbGRyZW4ubGVuZ3RoO3QrKyllKz10aGlzLmNoaWxkcmVuW3RdLnRvTWFya3VwKCk7cmV0dXJuIGUrPSI8LyIrdGhpcy50eXBlKyI+IixlfXRvVGV4dCgpe3JldHVybiB0aGlzLmNoaWxkcmVuLm1hcChlPT5lLnRvVGV4dCgpKS5qb2luKCIiKX19Y2xhc3MgcXR7Y29uc3RydWN0b3IoZSl7dGhpcy50ZXh0PXZvaWQgMCx0aGlzLnRleHQ9ZX10b05vZGUoKXtyZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy50ZXh0KX10b01hcmt1cCgpe3JldHVybiBhKHRoaXMudG9UZXh0KCkpfXRvVGV4dCgpe3JldHVybiB0aGlzLnRleHR9fWNsYXNzIEl0e2NvbnN0cnVjdG9yKGUpe3RoaXMud2lkdGg9dm9pZCAwLHRoaXMuY2hhcmFjdGVyPXZvaWQgMCx0aGlzLndpZHRoPWUsdGhpcy5jaGFyYWN0ZXI9ZT49LjA1NTU1JiZlPD0uMDU1NTY/Ilx1MjAwYSI6ZT49LjE2NjYmJmU8PS4xNjY3PyJcdTIwMDkiOmU+PS4yMjIyJiZlPD0uMjIyMz8iXHUyMDA1IjplPj0uMjc3NyYmZTw9LjI3Nzg/Ilx1MjAwNVx1MjAwYSI6ZT49LS4wNTU1NiYmZTw9LS4wNTU1NT8iXHUyMDBhXHUyMDYzIjplPj0tLjE2NjcmJmU8PS0uMTY2Nj8iXHUyMDA5XHUyMDYzIjplPj0tLjIyMjMmJmU8PS0uMjIyMj8iXHUyMDVmXHUyMDYzIjplPj0tLjI3NzgmJmU8PS0uMjc3Nz8iXHUyMDA1XHUyMDYzIjpudWxsfXRvTm9kZSgpe2lmKHRoaXMuY2hhcmFjdGVyKXJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLmNoYXJhY3Rlcik7e2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MIiwibXNwYWNlIik7cmV0dXJuIGUuc2V0QXR0cmlidXRlKCJ3aWR0aCIsTih0aGlzLndpZHRoKSksZX19dG9NYXJrdXAoKXtyZXR1cm4gdGhpcy5jaGFyYWN0ZXI/IjxtdGV4dD4iK3RoaXMuY2hhcmFjdGVyKyI8L210ZXh0PiI6Jzxtc3BhY2Ugd2lkdGg9IicrTih0aGlzLndpZHRoKSsnIi8+J310b1RleHQoKXtyZXR1cm4gdGhpcy5jaGFyYWN0ZXI/dGhpcy5jaGFyYWN0ZXI6IiAifX1jb25zdCBSdD1uZXcgU2V0KFsiXFxpbWF0aCIsIlxcam1hdGgiXSksSHQ9bmV3IFNldChbIm1yb3ciLCJtdGFibGUiXSksRXQ9ZnVuY3Rpb24oZSx0LHIpe3ZhciBuLG87cmV0dXJuIG5lW3RdW2VdJiZuZVt0XVtlXS5yZXBsYWNlJiY1NTM0OSE9PWUuY2hhckNvZGVBdCgwKSYmKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwod2UsZSl8fCJ0dCIhPT0obnVsbD09cnx8bnVsbD09KG49ci5mb250RmFtaWx5KT92b2lkIDA6bi5zbGljZSg0LDYpKSYmInR0IiE9PShudWxsPT1yfHxudWxsPT0obz1yLmZvbnQpP3ZvaWQgMDpvLnNsaWNlKDQsNikpKSYmKGU9bmVbdF1bZV0ucmVwbGFjZSksbmV3IHF0KGUpfSxPdD1mdW5jdGlvbihlKXtyZXR1cm4gMT09PWUubGVuZ3RoP2VbMF06bmV3IEJ0KCJtcm93IixlKX0sTnQ9e21hdGhpdDoiaXRhbGljIixib2xkc3ltYm9sOmU9PiJ0ZXh0b3JkIj09PWUudHlwZT8iYm9sZCI6ImJvbGQtaXRhbGljIixtYXRoYmY6ImJvbGQiLG1hdGhiYjoiZG91YmxlLXN0cnVjayIsbWF0aHNmaXQ6InNhbnMtc2VyaWYtaXRhbGljIixtYXRoZnJhazoiZnJha3R1ciIsbWF0aHNjcjoic2NyaXB0IixtYXRoY2FsOiJzY3JpcHQiLG1hdGhzZjoic2Fucy1zZXJpZiIsbWF0aHR0OiJtb25vc3BhY2UifSxEdD0oZSx0KT0+e2lmKCJ0ZXh0Ij09PWUubW9kZSl7aWYoInRleHR0dCI9PT10LmZvbnRGYW1pbHkpcmV0dXJuIm1vbm9zcGFjZSI7aWYoInRleHRzZiI9PT10LmZvbnRGYW1pbHkpcmV0dXJuInRleHRpdCI9PT10LmZvbnRTaGFwZSYmInRleHRiZiI9PT10LmZvbnRXZWlnaHQ/InNhbnMtc2VyaWYtYm9sZC1pdGFsaWMiOiJ0ZXh0aXQiPT09dC5mb250U2hhcGU/InNhbnMtc2VyaWYtaXRhbGljIjoidGV4dGJmIj09PXQuZm9udFdlaWdodD8iYm9sZC1zYW5zLXNlcmlmIjoic2Fucy1zZXJpZiI7aWYoInRleHRpdCI9PT10LmZvbnRTaGFwZSYmInRleHRiZiI9PT10LmZvbnRXZWlnaHQpcmV0dXJuImJvbGQtaXRhbGljIjtpZigidGV4dGl0Ij09PXQuZm9udFNoYXBlKXJldHVybiJpdGFsaWMiO2lmKCJ0ZXh0YmYiPT09dC5mb250V2VpZ2h0KXJldHVybiJib2xkIn1jb25zdCByPXQuZm9udDtpZighcnx8Im1hdGhub3JtYWwiPT09cilyZXR1cm4gbnVsbDtjb25zdCBuPWUubW9kZSxvPU50W3JdO2lmKG8pcmV0dXJuImZ1bmN0aW9uIj09dHlwZW9mIG8/byhlKTpvO2xldCBzPWUudGV4dDtpZihSdC5oYXMocykpcmV0dXJuIG51bGw7aWYobmVbbl1bc10pe2NvbnN0IGU9bmVbbl1bc10ucmVwbGFjZTtlJiYocz1lKX1yZXR1cm4gZWUocyxldFtyXS5mb250TmFtZSxuKT9ldFtyXS52YXJpYW50Om51bGx9O2Z1bmN0aW9uIEx0KGUpe2lmKCFlKXJldHVybiExO2lmKCJtaSI9PT1lLnR5cGUmJjE9PT1lLmNoaWxkcmVuLmxlbmd0aCl7Y29uc3QgdD1lLmNoaWxkcmVuWzBdO3JldHVybiB0IGluc3RhbmNlb2YgcXQmJiIuIj09PXQudGV4dH1pZigibW8iPT09ZS50eXBlJiYxPT09ZS5jaGlsZHJlbi5sZW5ndGgmJiJ0cnVlIj09PWUuZ2V0QXR0cmlidXRlKCJzZXBhcmF0b3IiKSYmIjBlbSI9PT1lLmdldEF0dHJpYnV0ZSgibHNwYWNlIikmJiIwZW0iPT09ZS5nZXRBdHRyaWJ1dGUoInJzcGFjZSIpKXtjb25zdCB0PWUuY2hpbGRyZW5bMF07cmV0dXJuIHQgaW5zdGFuY2VvZiBxdCYmIiwiPT09dC50ZXh0fXJldHVybiExfWNvbnN0IEZ0PWZ1bmN0aW9uKGUsdCxyKXtpZigxPT09ZS5sZW5ndGgpe2NvbnN0IG49VnQoZVswXSx0KTtyZXR1cm4gciYmbiBpbnN0YW5jZW9mIEJ0JiYibW8iPT09bi50eXBlJiYobi5zZXRBdHRyaWJ1dGUoImxzcGFjZSIsIjBlbSIpLG4uc2V0QXR0cmlidXRlKCJyc3BhY2UiLCIwZW0iKSksW25dfWNvbnN0IG49W107bGV0IG87Zm9yKGxldCByPTA7cjxlLmxlbmd0aDtyKyspe2NvbnN0IHM9VnQoZVtyXSx0KTtpZihzIGluc3RhbmNlb2YgQnQmJm8gaW5zdGFuY2VvZiBCdCl7aWYoIm10ZXh0Ij09PXMudHlwZSYmIm10ZXh0Ij09PW8udHlwZSYmcy5nZXRBdHRyaWJ1dGUoIm1hdGh2YXJpYW50Iik9PT1vLmdldEF0dHJpYnV0ZSgibWF0aHZhcmlhbnQiKSl7by5jaGlsZHJlbi5wdXNoKC4uLnMuY2hpbGRyZW4pO2NvbnRpbnVlfWlmKCJtbiI9PT1zLnR5cGUmJiJtbiI9PT1vLnR5cGUpe28uY2hpbGRyZW4ucHVzaCguLi5zLmNoaWxkcmVuKTtjb250aW51ZX1pZihMdChzKSYmIm1uIj09PW8udHlwZSl7by5jaGlsZHJlbi5wdXNoKC4uLnMuY2hpbGRyZW4pO2NvbnRpbnVlfWlmKCJtbiI9PT1zLnR5cGUmJkx0KG8pKXMuY2hpbGRyZW49Wy4uLm8uY2hpbGRyZW4sLi4ucy5jaGlsZHJlbl0sbi5wb3AoKTtlbHNlIGlmKCgibXN1cCI9PT1zLnR5cGV8fCJtc3ViIj09PXMudHlwZSkmJnMuY2hpbGRyZW4ubGVuZ3RoPj0xJiYoIm1uIj09PW8udHlwZXx8THQobykpKXtjb25zdCBlPXMuY2hpbGRyZW5bMF07ZSBpbnN0YW5jZW9mIEJ0JiYibW4iPT09ZS50eXBlJiYoZS5jaGlsZHJlbj1bLi4uby5jaGlsZHJlbiwuLi5lLmNoaWxkcmVuXSxuLnBvcCgpKX1lbHNlIGlmKCJtaSI9PT1vLnR5cGUmJjE9PT1vLmNoaWxkcmVuLmxlbmd0aCl7Y29uc3QgZT1vLmNoaWxkcmVuWzBdO2lmKGUgaW5zdGFuY2VvZiBxdCYmIlx1MDMzOCI9PT1lLnRleHQmJigibW8iPT09cy50eXBlfHwibWkiPT09cy50eXBlfHwibW4iPT09cy50eXBlKSl7Y29uc3QgZT1zLmNoaWxkcmVuWzBdO2UgaW5zdGFuY2VvZiBxdCYmZS50ZXh0Lmxlbmd0aD4wJiYoZS50ZXh0PWUudGV4dC5zbGljZSgwLDEpKyJcdTAzMzgiK2UudGV4dC5zbGljZSgxKSxuLnBvcCgpKX19fW4ucHVzaChzKSxvPXN9cmV0dXJuIG59LFB0PWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4gT3QoRnQoZSx0LHIpKX0sVnQ9ZnVuY3Rpb24oZSx0KXtpZighZSlyZXR1cm4gbmV3IEJ0KCJtcm93Iik7aWYoaHRbZS50eXBlXSlyZXR1cm4gaHRbZS50eXBlXShlLHQpO3Rocm93IG5ldyBuKCJHb3QgZ3JvdXAgb2YgdW5rbm93biB0eXBlOiAnIitlLnR5cGUrIiciKX07ZnVuY3Rpb24gR3QoZSx0LHIsbixvKXtjb25zdCBzPUZ0KGUscik7bGV0IGk7aT0xPT09cy5sZW5ndGgmJnNbMF1pbnN0YW5jZW9mIEJ0JiZIdC5oYXMoc1swXS50eXBlKT9zWzBdOm5ldyBCdCgibXJvdyIscyk7Y29uc3QgbD1uZXcgQnQoImFubm90YXRpb24iLFtuZXcgcXQodCldKTtsLnNldEF0dHJpYnV0ZSgiZW5jb2RpbmciLCJhcHBsaWNhdGlvbi94LXRleCIpO2NvbnN0IGE9bmV3IEJ0KCJzZW1hbnRpY3MiLFtpLGxdKSxjPW5ldyBCdCgibWF0aCIsW2FdKTtjLnNldEF0dHJpYnV0ZSgieG1sbnMiLCJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MIiksbiYmYy5zZXRBdHRyaWJ1dGUoImRpc3BsYXkiLCJibG9jayIpO3JldHVybiBZZShbbz8ia2F0ZXgiOiJrYXRleC1tYXRobWwiXSxbY10pfWNvbnN0IFV0PVtbMSwxLDFdLFsyLDEsMV0sWzMsMSwxXSxbNCwyLDFdLFs1LDIsMV0sWzYsMywxXSxbNyw0LDJdLFs4LDYsM10sWzksNyw2XSxbMTAsOCw3XSxbMTEsMTAsOV1dLGp0PVsuNSwuNiwuNywuOCwuOSwxLDEuMiwxLjQ0LDEuNzI4LDIuMDc0LDIuNDg4XSxYdD1mdW5jdGlvbihlLHQpe3JldHVybiB0LnNpemU8Mj9lOlV0W2UtMV1bdC5zaXplLTFdfTtjbGFzcyBZdHtjb25zdHJ1Y3RvcihlKXt0aGlzLnN0eWxlPXZvaWQgMCx0aGlzLmNvbG9yPXZvaWQgMCx0aGlzLnNpemU9dm9pZCAwLHRoaXMudGV4dFNpemU9dm9pZCAwLHRoaXMucGhhbnRvbT12b2lkIDAsdGhpcy5mb250PXZvaWQgMCx0aGlzLmZvbnRGYW1pbHk9dm9pZCAwLHRoaXMuZm9udFdlaWdodD12b2lkIDAsdGhpcy5mb250U2hhcGU9dm9pZCAwLHRoaXMuc2l6ZU11bHRpcGxpZXI9dm9pZCAwLHRoaXMubWF4U2l6ZT12b2lkIDAsdGhpcy5taW5SdWxlVGhpY2tuZXNzPXZvaWQgMCx0aGlzLl9mb250TWV0cmljcz12b2lkIDAsdGhpcy5zdHlsZT1lLnN0eWxlLHRoaXMuY29sb3I9ZS5jb2xvcix0aGlzLnNpemU9ZS5zaXplfHxZdC5CQVNFU0laRSx0aGlzLnRleHRTaXplPWUudGV4dFNpemV8fHRoaXMuc2l6ZSx0aGlzLnBoYW50b209ISFlLnBoYW50b20sdGhpcy5mb250PWUuZm9udHx8IiIsdGhpcy5mb250RmFtaWx5PWUuZm9udEZhbWlseXx8IiIsdGhpcy5mb250V2VpZ2h0PWUuZm9udFdlaWdodHx8IiIsdGhpcy5mb250U2hhcGU9ZS5mb250U2hhcGV8fCIiLHRoaXMuc2l6ZU11bHRpcGxpZXI9anRbdGhpcy5zaXplLTFdLHRoaXMubWF4U2l6ZT1lLm1heFNpemUsdGhpcy5taW5SdWxlVGhpY2tuZXNzPWUubWluUnVsZVRoaWNrbmVzcyx0aGlzLl9mb250TWV0cmljcz12b2lkIDB9ZXh0ZW5kKGUpe2NvbnN0IHQ9e3N0eWxlOnRoaXMuc3R5bGUsc2l6ZTp0aGlzLnNpemUsdGV4dFNpemU6dGhpcy50ZXh0U2l6ZSxjb2xvcjp0aGlzLmNvbG9yLHBoYW50b206dGhpcy5waGFudG9tLGZvbnQ6dGhpcy5mb250LGZvbnRGYW1pbHk6dGhpcy5mb250RmFtaWx5LGZvbnRXZWlnaHQ6dGhpcy5mb250V2VpZ2h0LGZvbnRTaGFwZTp0aGlzLmZvbnRTaGFwZSxtYXhTaXplOnRoaXMubWF4U2l6ZSxtaW5SdWxlVGhpY2tuZXNzOnRoaXMubWluUnVsZVRoaWNrbmVzc307cmV0dXJuIE9iamVjdC5hc3NpZ24odCxlKSxuZXcgWXQodCl9aGF2aW5nU3R5bGUoZSl7cmV0dXJuIHRoaXMuc3R5bGU9PT1lP3RoaXM6dGhpcy5leHRlbmQoe3N0eWxlOmUsc2l6ZTpYdCh0aGlzLnRleHRTaXplLGUpfSl9aGF2aW5nQ3JhbXBlZFN0eWxlKCl7cmV0dXJuIHRoaXMuaGF2aW5nU3R5bGUodGhpcy5zdHlsZS5jcmFtcCgpKX1oYXZpbmdTaXplKGUpe3JldHVybiB0aGlzLnNpemU9PT1lJiZ0aGlzLnRleHRTaXplPT09ZT90aGlzOnRoaXMuZXh0ZW5kKHtzdHlsZTp0aGlzLnN0eWxlLnRleHQoKSxzaXplOmUsdGV4dFNpemU6ZSxzaXplTXVsdGlwbGllcjpqdFtlLTFdfSl9aGF2aW5nQmFzZVN0eWxlKGUpe2U9ZXx8dGhpcy5zdHlsZS50ZXh0KCk7Y29uc3QgdD1YdChZdC5CQVNFU0laRSxlKTtyZXR1cm4gdGhpcy5zaXplPT09dCYmdGhpcy50ZXh0U2l6ZT09PVl0LkJBU0VTSVpFJiZ0aGlzLnN0eWxlPT09ZT90aGlzOnRoaXMuZXh0ZW5kKHtzdHlsZTplLHNpemU6dH0pfWhhdmluZ0Jhc2VTaXppbmcoKXtsZXQgZTtzd2l0Y2godGhpcy5zdHlsZS5pZCl7Y2FzZSA0OmNhc2UgNTplPTM7YnJlYWs7Y2FzZSA2OmNhc2UgNzplPTE7YnJlYWs7ZGVmYXVsdDplPTZ9cmV0dXJuIHRoaXMuZXh0ZW5kKHtzdHlsZTp0aGlzLnN0eWxlLnRleHQoKSxzaXplOmV9KX13aXRoQ29sb3IoZSl7cmV0dXJuIHRoaXMuZXh0ZW5kKHtjb2xvcjplfSl9d2l0aFBoYW50b20oKXtyZXR1cm4gdGhpcy5leHRlbmQoe3BoYW50b206ITB9KX13aXRoRm9udChlKXtyZXR1cm4gdGhpcy5leHRlbmQoe2ZvbnQ6ZX0pfXdpdGhUZXh0Rm9udEZhbWlseShlKXtyZXR1cm4gdGhpcy5leHRlbmQoe2ZvbnRGYW1pbHk6ZSxmb250OiIifSl9d2l0aFRleHRGb250V2VpZ2h0KGUpe3JldHVybiB0aGlzLmV4dGVuZCh7Zm9udFdlaWdodDplLGZvbnQ6IiJ9KX13aXRoVGV4dEZvbnRTaGFwZShlKXtyZXR1cm4gdGhpcy5leHRlbmQoe2ZvbnRTaGFwZTplLGZvbnQ6IiJ9KX1zaXppbmdDbGFzc2VzKGUpe3JldHVybiBlLnNpemUhPT10aGlzLnNpemU/WyJrYXRleC1zaXppbmciLCJyZXNldC1zaXplIitlLnNpemUsInNpemUiK3RoaXMuc2l6ZV06W119YmFzZVNpemluZ0NsYXNzZXMoKXtyZXR1cm4gdGhpcy5zaXplIT09WXQuQkFTRVNJWkU/WyJrYXRleC1zaXppbmciLCJyZXNldC1zaXplIit0aGlzLnNpemUsInNpemUiK1l0LkJBU0VTSVpFXTpbXX1mb250TWV0cmljcygpe3JldHVybiB0aGlzLl9mb250TWV0cmljc3x8KHRoaXMuX2ZvbnRNZXRyaWNzPWZ1bmN0aW9uKGUpe2xldCB0O2lmKHQ9ZT49NT8wOmU+PTM/MToyLCF0ZVt0XSl7Y29uc3QgZT10ZVt0XT17Y3NzRW1QZXJNdTpKLnF1YWRbdF0vMTh9O2Zvcihjb25zdCByIG9mIE9iamVjdC5rZXlzKEopKWVbcl09SltyXVt0XX1yZXR1cm4gdGVbdF19KHRoaXMuc2l6ZSkpLHRoaXMuX2ZvbnRNZXRyaWNzfWdldENvbG9yKCl7cmV0dXJuIHRoaXMucGhhbnRvbT8idHJhbnNwYXJlbnQiOnRoaXMuY29sb3J9fVl0LkJBU0VTSVpFPTY7dmFyIFd0PVl0O2NvbnN0IF90PWZ1bmN0aW9uKGUpe3JldHVybiBuZXcgV3Qoe3N0eWxlOmUuZGlzcGxheU1vZGU/Uy5ESVNQTEFZOlMuVEVYVCxtYXhTaXplOmUubWF4U2l6ZSxtaW5SdWxlVGhpY2tuZXNzOmUubWluUnVsZVRoaWNrbmVzc30pfSwkdD1mdW5jdGlvbihlLHQpe2lmKHQuZGlzcGxheU1vZGUpe2NvbnN0IHI9WyJrYXRleC1kaXNwbGF5Il07dC5sZXFubyYmci5wdXNoKCJsZXFubyIpLHQuZmxlcW4mJnIucHVzaCgiZmxlcW4iKSxlPVllKHIsW2VdKX1yZXR1cm4gZX0sWnQ9ZnVuY3Rpb24oZSx0LHIpe2NvbnN0IG49X3Qocik7bGV0IG87aWYoIm1hdGhtbCI9PT1yLm91dHB1dClyZXR1cm4gR3QoZSx0LG4sci5kaXNwbGF5TW9kZSwhMCk7aWYoImh0bWwiPT09ci5vdXRwdXQpe2NvbnN0IHQ9VHQoZSxuKTtvPVllKFsia2F0ZXgiXSxbdF0pfWVsc2V7Y29uc3Qgcz1HdChlLHQsbixyLmRpc3BsYXlNb2RlLCExKSxpPVR0KGUsbik7bz1ZZShbImthdGV4Il0sW3MsaV0pfXJldHVybiAkdChvLHIpfTtjb25zdCBLdD17d2lkZWhhdDoiXiIsd2lkZWNoZWNrOiJcdTAyYzciLHdpZGV0aWxkZToifiIsdXRpbGRlOiJ+IixvdmVybGVmdGFycm93OiJcdTIxOTAiLHVuZGVybGVmdGFycm93OiJcdTIxOTAiLHhsZWZ0YXJyb3c6Ilx1MjE5MCIsb3ZlcnJpZ2h0YXJyb3c6Ilx1MjE5MiIsdW5kZXJyaWdodGFycm93OiJcdTIxOTIiLHhyaWdodGFycm93OiJcdTIxOTIiLHVuZGVyYnJhY2U6Ilx1MjNkZiIsb3ZlcmJyYWNlOiJcdTIzZGUiLHVuZGVyYnJhY2tldDoiXHUyM2I1IixvdmVyYnJhY2tldDoiXHUyM2I0IixvdmVyZ3JvdXA6Ilx1MjNlMCIsdW5kZXJncm91cDoiXHUyM2UxIixvdmVybGVmdHJpZ2h0YXJyb3c6Ilx1MjE5NCIsdW5kZXJsZWZ0cmlnaHRhcnJvdzoiXHUyMTk0Iix4bGVmdHJpZ2h0YXJyb3c6Ilx1MjE5NCIsT3ZlcnJpZ2h0YXJyb3c6Ilx1MjFkMiIseFJpZ2h0YXJyb3c6Ilx1MjFkMiIsb3ZlcmxlZnRoYXJwb29uOiJcdTIxYmMiLHhsZWZ0aGFycG9vbnVwOiJcdTIxYmMiLG92ZXJyaWdodGhhcnBvb246Ilx1MjFjMCIseHJpZ2h0aGFycG9vbnVwOiJcdTIxYzAiLHhMZWZ0YXJyb3c6Ilx1MjFkMCIseExlZnRyaWdodGFycm93OiJcdTIxZDQiLHhob29rbGVmdGFycm93OiJcdTIxYTkiLHhob29rcmlnaHRhcnJvdzoiXHUyMWFhIix4bWFwc3RvOiJcdTIxYTYiLHhyaWdodGhhcnBvb25kb3duOiJcdTIxYzEiLHhsZWZ0aGFycG9vbmRvd246Ilx1MjFiZCIseHJpZ2h0bGVmdGhhcnBvb25zOiJcdTIxY2MiLHhsZWZ0cmlnaHRoYXJwb29uczoiXHUyMWNiIix4dHdvaGVhZGxlZnRhcnJvdzoiXHUyMTllIix4dHdvaGVhZHJpZ2h0YXJyb3c6Ilx1MjFhMCIseGxvbmdlcXVhbDoiPSIseHRvZnJvbToiXHUyMWM0Iix4cmlnaHRsZWZ0YXJyb3dzOiJcdTIxYzQiLHhyaWdodGVxdWlsaWJyaXVtOiJcdTIxY2MiLHhsZWZ0ZXF1aWxpYnJpdW06Ilx1MjFjYiIsIlxcY2RyaWdodGFycm93IjoiXHUyMTkyIiwiXFxjZGxlZnRhcnJvdyI6Ilx1MjE5MCIsIlxcY2Rsb25nZXF1YWwiOiI9In0sSnQ9ZnVuY3Rpb24oZSl7Y29uc3QgdD1uZXcgQnQoIm1vIixbbmV3IHF0KEt0W2UucmVwbGFjZSgvXlxcLywiIildKV0pO3JldHVybiB0LnNldEF0dHJpYnV0ZSgic3RyZXRjaHkiLCJ0cnVlIiksdH0sUXQ9e292ZXJyaWdodGFycm93OltbInJpZ2h0YXJyb3ciXSwuODg4LDUyMiwieE1heFlNaW4iXSxvdmVybGVmdGFycm93OltbImxlZnRhcnJvdyJdLC44ODgsNTIyLCJ4TWluWU1pbiJdLHVuZGVycmlnaHRhcnJvdzpbWyJyaWdodGFycm93Il0sLjg4OCw1MjIsInhNYXhZTWluIl0sdW5kZXJsZWZ0YXJyb3c6W1sibGVmdGFycm93Il0sLjg4OCw1MjIsInhNaW5ZTWluIl0seHJpZ2h0YXJyb3c6W1sicmlnaHRhcnJvdyJdLDEuNDY5LDUyMiwieE1heFlNaW4iXSwiXFxjZHJpZ2h0YXJyb3ciOltbInJpZ2h0YXJyb3ciXSwzLDUyMiwieE1heFlNaW4iXSx4bGVmdGFycm93OltbImxlZnRhcnJvdyJdLDEuNDY5LDUyMiwieE1pbllNaW4iXSwiXFxjZGxlZnRhcnJvdyI6W1sibGVmdGFycm93Il0sMyw1MjIsInhNaW5ZTWluIl0sT3ZlcnJpZ2h0YXJyb3c6W1siZG91YmxlcmlnaHRhcnJvdyJdLC44ODgsNTYwLCJ4TWF4WU1pbiJdLHhSaWdodGFycm93OltbImRvdWJsZXJpZ2h0YXJyb3ciXSwxLjUyNiw1NjAsInhNYXhZTWluIl0seExlZnRhcnJvdzpbWyJkb3VibGVsZWZ0YXJyb3ciXSwxLjUyNiw1NjAsInhNaW5ZTWluIl0sb3ZlcmxlZnRoYXJwb29uOltbImxlZnRoYXJwb29uIl0sLjg4OCw1MjIsInhNaW5ZTWluIl0seGxlZnRoYXJwb29udXA6W1sibGVmdGhhcnBvb24iXSwuODg4LDUyMiwieE1pbllNaW4iXSx4bGVmdGhhcnBvb25kb3duOltbImxlZnRoYXJwb29uZG93biJdLC44ODgsNTIyLCJ4TWluWU1pbiJdLG92ZXJyaWdodGhhcnBvb246W1sicmlnaHRoYXJwb29uIl0sLjg4OCw1MjIsInhNYXhZTWluIl0seHJpZ2h0aGFycG9vbnVwOltbInJpZ2h0aGFycG9vbiJdLC44ODgsNTIyLCJ4TWF4WU1pbiJdLHhyaWdodGhhcnBvb25kb3duOltbInJpZ2h0aGFycG9vbmRvd24iXSwuODg4LDUyMiwieE1heFlNaW4iXSx4bG9uZ2VxdWFsOltbImxvbmdlcXVhbCJdLC44ODgsMzM0LCJ4TWluWU1pbiJdLCJcXGNkbG9uZ2VxdWFsIjpbWyJsb25nZXF1YWwiXSwzLDMzNCwieE1pbllNaW4iXSx4dHdvaGVhZGxlZnRhcnJvdzpbWyJ0d29oZWFkbGVmdGFycm93Il0sLjg4OCwzMzQsInhNaW5ZTWluIl0seHR3b2hlYWRyaWdodGFycm93OltbInR3b2hlYWRyaWdodGFycm93Il0sLjg4OCwzMzQsInhNYXhZTWluIl0sb3ZlcmxlZnRyaWdodGFycm93OltbImxlZnRhcnJvdyIsInJpZ2h0YXJyb3ciXSwuODg4LDUyMl0sb3ZlcmJyYWNlOltbImxlZnRicmFjZSIsIm1pZGJyYWNlIiwicmlnaHRicmFjZSJdLDEuNiw1NDhdLHVuZGVyYnJhY2U6W1sibGVmdGJyYWNldW5kZXIiLCJtaWRicmFjZXVuZGVyIiwicmlnaHRicmFjZXVuZGVyIl0sMS42LDU0OF0sdW5kZXJsZWZ0cmlnaHRhcnJvdzpbWyJsZWZ0YXJyb3ciLCJyaWdodGFycm93Il0sLjg4OCw1MjJdLHhsZWZ0cmlnaHRhcnJvdzpbWyJsZWZ0YXJyb3ciLCJyaWdodGFycm93Il0sMS43NSw1MjJdLHhMZWZ0cmlnaHRhcnJvdzpbWyJkb3VibGVsZWZ0YXJyb3ciLCJkb3VibGVyaWdodGFycm93Il0sMS43NSw1NjBdLHhyaWdodGxlZnRoYXJwb29uczpbWyJsZWZ0aGFycG9vbmRvd25wbHVzIiwicmlnaHRoYXJwb29ucGx1cyJdLDEuNzUsNzE2XSx4bGVmdHJpZ2h0aGFycG9vbnM6W1sibGVmdGhhcnBvb25wbHVzIiwicmlnaHRoYXJwb29uZG93bnBsdXMiXSwxLjc1LDcxNl0seGhvb2tsZWZ0YXJyb3c6W1sibGVmdGFycm93IiwicmlnaHRob29rIl0sMS4wOCw1MjJdLHhob29rcmlnaHRhcnJvdzpbWyJsZWZ0aG9vayIsInJpZ2h0YXJyb3ciXSwxLjA4LDUyMl0sb3ZlcmxpbmVzZWdtZW50OltbImxlZnRsaW5lc2VnbWVudCIsInJpZ2h0bGluZXNlZ21lbnQiXSwuODg4LDUyMl0sdW5kZXJsaW5lc2VnbWVudDpbWyJsZWZ0bGluZXNlZ21lbnQiLCJyaWdodGxpbmVzZWdtZW50Il0sLjg4OCw1MjJdLG92ZXJicmFja2V0OltbImxlZnRicmFja2V0b3ZlciIsInJpZ2h0YnJhY2tldG92ZXIiXSwxLjYsNDQwXSx1bmRlcmJyYWNrZXQ6W1sibGVmdGJyYWNrZXR1bmRlciIsInJpZ2h0YnJhY2tldHVuZGVyIl0sMS42LDQxMF0sb3Zlcmdyb3VwOltbImxlZnRncm91cCIsInJpZ2h0Z3JvdXAiXSwuODg4LDM0Ml0sdW5kZXJncm91cDpbWyJsZWZ0Z3JvdXB1bmRlciIsInJpZ2h0Z3JvdXB1bmRlciJdLC44ODgsMzQyXSx4bWFwc3RvOltbImxlZnRtYXBzdG8iLCJyaWdodGFycm93Il0sMS41LDUyMl0seHRvZnJvbTpbWyJsZWZ0VG9Gcm9tIiwicmlnaHRUb0Zyb20iXSwxLjc1LDUyOF0seHJpZ2h0bGVmdGFycm93czpbWyJiYXJhYm92ZWxlZnRhcnJvdyIsInJpZ2h0YXJyb3dhYm92ZWJhciJdLDEuNzUsOTAxXSx4cmlnaHRlcXVpbGlicml1bTpbWyJiYXJhYm92ZXNob3J0bGVmdGhhcnBvb24iLCJyaWdodGhhcnBvb25hYm92ZXNob3J0YmFyIl0sMS43NSw3MTZdLHhsZWZ0ZXF1aWxpYnJpdW06W1sic2hvcnRiYXJhYm92ZWxlZnRoYXJwb29uIiwic2hvcnRyaWdodGhhcnBvb25hYm92ZWJhciJdLDEuNzUsNzE2XX0sZXI9bmV3IFNldChbIndpZGVoYXQiLCJ3aWRlY2hlY2siLCJ3aWRldGlsZGUiLCJ1dGlsZGUiXSksdHI9ZnVuY3Rpb24oZSx0KXtjb25zdCByPWZ1bmN0aW9uKCl7bGV0IHI9NGU1O2NvbnN0IG49ZS5sYWJlbC5zbGljZSgxKTtpZihlci5oYXMobikmJiJiYXNlImluIGUpe2NvbnN0IG89Im9yZGdyb3VwIj09PWUuYmFzZS50eXBlP2UuYmFzZS5ib2R5Lmxlbmd0aDoxO2xldCBzLGksbDtpZihvPjUpIndpZGVoYXQiPT09bnx8IndpZGVjaGVjayI9PT1uPyhzPTQyMCxyPTIzNjQsbD0uNDIsaT1uKyI0Iik6KHM9MzEyLHI9MjM0MCxsPS4zNCxpPSJ0aWxkZTQiKTtlbHNle2NvbnN0IGU9WzEsMSwyLDIsMywzXVtvXTsid2lkZWhhdCI9PT1ufHwid2lkZWNoZWNrIj09PW4/KHI9WzAsMTA2MiwyMzY0LDIzNjQsMjM2NF1bZV0scz1bMCwyMzksMzAwLDM2MCw0MjBdW2VdLGw9WzAsLjI0LC4zLC4zLC4zNiwuNDJdW2VdLGk9bitlKToocj1bMCw2MDAsMTAzMywyMzM5LDIzNDBdW2VdLHM9WzAsMjYwLDI4NiwzMDYsMzEyXVtlXSxsPVswLC4yNiwuMjg2LC4zLC4zMDYsLjM0XVtlXSxpPSJ0aWxkZSIrZSl9Y29uc3QgYT1uZXcgJChpKSxjPW5ldyBfKFthXSx7d2lkdGg6IjEwMCUiLGhlaWdodDpOKGwpLHZpZXdCb3g6IjAgMCAiK3IrIiAiK3MscHJlc2VydmVBc3BlY3RSYXRpbzoibm9uZSJ9KTtyZXR1cm57c3BhbjpXZShbXSxbY10sdCksbWluV2lkdGg6MCxoZWlnaHQ6bH19e2NvbnN0IGU9W10sbz1RdFtuXTtpZighbyl0aHJvdyBuZXcgRXJyb3IoJ05vIFNWRyBkYXRhIGZvciAiJytuKyciLicpO2NvbnN0IHM9b1swXSxpPW9bMV0sbD1vWzJdLGE9bC8xZTMsYz1zLmxlbmd0aDtsZXQgaCxtO2lmKDE9PT1jKXtpZig0IT09by5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCA0LXR1cGxlIGZvciBzaW5nbGUtcGF0aCBTVkcgZGF0YSAiJytuKyciLicpO2g9WyJoaWRlLXRhaWwiXSxtPVtvWzNdXX1lbHNlIGlmKDI9PT1jKWg9WyJoYWxmYXJyb3ctbGVmdCIsImhhbGZhcnJvdy1yaWdodCJdLG09WyJ4TWluWU1pbiIsInhNYXhZTWluIl07ZWxzZXtpZigzIT09Yyl0aHJvdyBuZXcgRXJyb3IoIkNvcnJlY3Qga2F0ZXhJbWFnZXNEYXRhIG9yIHVwZGF0ZSBjb2RlIGhlcmUgdG8gc3VwcG9ydFxuICAgICAgICAgICAgICAgICAgICAiK2MrIiBjaGlsZHJlbi4iKTtoPVsiYnJhY2UtbGVmdCIsImJyYWNlLWNlbnRlciIsImJyYWNlLXJpZ2h0Il0sbT1bInhNaW5ZTWluIiwieE1pZFlNaW4iLCJ4TWF4WU1pbiJdfWZvcihsZXQgbj0wO248YztuKyspe2NvbnN0IG89bmV3ICQoc1tuXSksdT1uZXcgXyhbb10se3dpZHRoOiI0MDBlbSIsaGVpZ2h0Ok4oYSksdmlld0JveDoiMCAwICIrcisiICIrbCxwcmVzZXJ2ZUFzcGVjdFJhdGlvOm1bbl0rIiBzbGljZSJ9KSxwPVdlKFtoW25dXSxbdV0sdCk7aWYoMT09PWMpcmV0dXJue3NwYW46cCxtaW5XaWR0aDppLGhlaWdodDphfTtwLnN0eWxlLmhlaWdodD1OKGEpLGUucHVzaChwKX1yZXR1cm57c3BhbjpZZShbImthdGV4LXN0cmV0Y2h5Il0sZSx0KSxtaW5XaWR0aDppLGhlaWdodDphfX19KCksbj1yLnNwYW4sbz1yLm1pbldpZHRoLHM9ci5oZWlnaHQ7cmV0dXJuIG4uaGVpZ2h0PXMsbi5zdHlsZS5oZWlnaHQ9TihzKSxvPjAmJihuLnN0eWxlLm1pbldpZHRoPU4obykpLG59LHJyPW5ldyBTZXQoWyJiaW4iLCJjbG9zZSIsImlubmVyIiwib3BlbiIsInB1bmN0IiwicmVsIl0pLG5yPW5ldyBTZXQoWyJhY2NlbnQtdG9rZW4iLCJtYXRob3JkIiwib3AtdG9rZW4iLCJzcGFjaW5nIiwidGV4dG9yZCJdKTtmdW5jdGlvbiBvcihlLHQpe2lmKCFlfHxlLnR5cGUhPT10KXRocm93IG5ldyBFcnJvcigiRXhwZWN0ZWQgbm9kZSBvZiB0eXBlICIrdCsiLCBidXQgZ290ICIrKGU/Im5vZGUgb2YgdHlwZSAiK2UudHlwZTpTdHJpbmcoZSkpKTtyZXR1cm4gZX1mdW5jdGlvbiBzcihlKXtjb25zdCB0PWlyKGUpO2lmKCF0KXRocm93IG5ldyBFcnJvcigiRXhwZWN0ZWQgbm9kZSBvZiBzeW1ib2wgZ3JvdXAgdHlwZSwgYnV0IGdvdCAiKyhlPyJub2RlIG9mIHR5cGUgIitlLnR5cGU6U3RyaW5nKGUpKSk7cmV0dXJuIHR9ZnVuY3Rpb24gaXIoZSl7cmV0dXJuImF0b20iPT09ZS50eXBlfHxuci5oYXMoZS50eXBlKT9lOm51bGx9Y29uc3QgbHI9ZT0+e3JldHVybiBlIGluc3RhbmNlb2YgVz9lOigodD1lKWluc3RhbmNlb2YgVXx8dCBpbnN0YW5jZW9mIGp8fHQgaW5zdGFuY2VvZiBJKSYmMT09PWUuY2hpbGRyZW4ubGVuZ3RoP2xyKGUuY2hpbGRyZW5bMF0pOnZvaWQgMDt2YXIgdH0sYXI9KGUsdCk9PntsZXQgcixuLG87ZSYmInN1cHN1YiI9PT1lLnR5cGU/KG49b3IoZS5iYXNlLCJhY2NlbnQiKSxyPW4uYmFzZSxlLmJhc2U9cixvPWZ1bmN0aW9uKGUpe2lmKGUgaW5zdGFuY2VvZiBVKXJldHVybiBlO3Rocm93IG5ldyBFcnJvcigiRXhwZWN0ZWQgc3BhbjxIdG1sRG9tTm9kZT4gYnV0IGdvdCAiK1N0cmluZyhlKSsiLiIpfShNdChlLHQpKSxlLmJhc2U9bik6KG49b3IoZSwiYWNjZW50Iikscj1uLmJhc2UpO2NvbnN0IHM9TXQocix0LmhhdmluZ0NyYW1wZWRTdHlsZSgpKTtsZXQgaT0wO3ZhciBsLGE7bi5pc1NoaWZ0eSYmbShyKSYmKGk9bnVsbCE9KGw9bnVsbD09KGE9bHIocykpP3ZvaWQgMDphLnNrZXcpP2w6MCk7Y29uc3QgYz0iXFxjIj09PW4ubGFiZWw7bGV0IGgsdT1jP3MuaGVpZ2h0K3MuZGVwdGg6TWF0aC5taW4ocy5oZWlnaHQsdC5mb250TWV0cmljcygpLnhIZWlnaHQpO2lmKG4uaXNTdHJldGNoeSloPXRyKG4sdCksaD1LZSh7cG9zaXRpb25UeXBlOiJmaXJzdEJhc2VsaW5lIixjaGlsZHJlbjpbe3R5cGU6ImVsZW0iLGVsZW06c30se3R5cGU6ImVsZW0iLGVsZW06aCx3cmFwcGVyQ2xhc3NlczpbInN2Zy1hbGlnbiJdLHdyYXBwZXJTdHlsZTppPjA/e3dpZHRoOiJjYWxjKDEwMCUgLSAiK04oMippKSsiKSIsbWFyZ2luTGVmdDpOKDIqaSl9OnZvaWQgMH1dfSk7ZWxzZXtsZXQgZSxyOyJcXHZlYyI9PT1uLmxhYmVsPyhlPXJ0KCJ2ZWMiLHQpLHI9dHQudmVjWzFdKTooZT1HZSh7dHlwZToidGV4dG9yZCIsbW9kZTpuLm1vZGUsdGV4dDpuLmxhYmVsfSx0KSxlPWZ1bmN0aW9uKGUpe2lmKGUgaW5zdGFuY2VvZiBXKXJldHVybiBlO3Rocm93IG5ldyBFcnJvcigiRXhwZWN0ZWQgc3ltYm9sTm9kZSBidXQgZ290ICIrU3RyaW5nKGUpKyIuIil9KGUpLGUuaXRhbGljPTAscj1lLndpZHRoLGMmJih1Kz1lLmRlcHRoKSksaD1ZZShbImFjY2VudC1ib2R5Il0sW2VdKTtjb25zdCBvPSJcXHRleHRjaXJjbGVkIj09PW4ubGFiZWw7byYmKGguY2xhc3Nlcy5wdXNoKCJhY2NlbnQtZnVsbCIpLHU9cy5oZWlnaHQpO2xldCBsPWk7b3x8KGwtPXIvMiksaC5zdHlsZS5sZWZ0PU4obCksIlxcdGV4dGNpcmNsZWQiPT09bi5sYWJlbCYmKGguc3R5bGUudG9wPSIuMmVtIiksaD1LZSh7cG9zaXRpb25UeXBlOiJmaXJzdEJhc2VsaW5lIixjaGlsZHJlbjpbe3R5cGU6ImVsZW0iLGVsZW06c30se3R5cGU6Imtlcm4iLHNpemU6LXV9LHt0eXBlOiJlbGVtIixlbGVtOmh9XX0pfWNvbnN0IHA9WWUoWyJtb3JkIiwia2F0ZXgtYWNjZW50Il0sW2hdLHQpO3JldHVybiBvPyhvLmNoaWxkcmVuWzBdPXAsby5oZWlnaHQ9TWF0aC5tYXgocC5oZWlnaHQsby5oZWlnaHQpLG8uY2xhc3Nlc1swXT0ibW9yZCIsbyk6cH0sY3I9bmV3IFJlZ0V4cChbIlxcYWN1dGUiLCJcXGdyYXZlIiwiXFxkZG90IiwiXFx0aWxkZSIsIlxcYmFyIiwiXFxicmV2ZSIsIlxcY2hlY2siLCJcXGhhdCIsIlxcdmVjIiwiXFxkb3QiLCJcXG1hdGhyaW5nIl0ubWFwKGU9PiJcXCIrZSkuam9pbigifCIpKTttdCh7dHlwZToiYWNjZW50IixuYW1lczpbIlxcYWN1dGUiLCJcXGdyYXZlIiwiXFxkZG90IiwiXFx0aWxkZSIsIlxcYmFyIiwiXFxicmV2ZSIsIlxcY2hlY2siLCJcXGhhdCIsIlxcdmVjIiwiXFxkb3QiLCJcXG1hdGhyaW5nIiwiXFx3aWRlY2hlY2siLCJcXHdpZGVoYXQiLCJcXHdpZGV0aWxkZSIsIlxcb3ZlcnJpZ2h0YXJyb3ciLCJcXG92ZXJsZWZ0YXJyb3ciLCJcXE92ZXJyaWdodGFycm93IiwiXFxvdmVybGVmdHJpZ2h0YXJyb3ciLCJcXG92ZXJncm91cCIsIlxcb3ZlcmxpbmVzZWdtZW50IiwiXFxvdmVybGVmdGhhcnBvb24iLCJcXG92ZXJyaWdodGhhcnBvb24iXSxudW1BcmdzOjEsaGFuZGxlcjooZSx0KT0+e2NvbnN0IHI9cHQodFswXSksbj0hY3IudGVzdChlLmZ1bmNOYW1lKSxvPSFufHwiXFx3aWRlaGF0Ij09PWUuZnVuY05hbWV8fCJcXHdpZGV0aWxkZSI9PT1lLmZ1bmNOYW1lfHwiXFx3aWRlY2hlY2siPT09ZS5mdW5jTmFtZTtyZXR1cm57dHlwZToiYWNjZW50Iixtb2RlOmUucGFyc2VyLm1vZGUsbGFiZWw6ZS5mdW5jTmFtZSxpc1N0cmV0Y2h5Om4saXNTaGlmdHk6byxiYXNlOnJ9fSxodG1sQnVpbGRlcjphcixtYXRobWxCdWlsZGVyOihlLHQpPT57Y29uc3Qgcj1lLmlzU3RyZXRjaHk/SnQoZS5sYWJlbCk6bmV3IEJ0KCJtbyIsW0V0KGUubGFiZWwsZS5tb2RlKV0pLG49bmV3IEJ0KCJtb3ZlciIsW1Z0KGUuYmFzZSx0KSxyXSk7cmV0dXJuIG4uc2V0QXR0cmlidXRlKCJhY2NlbnQiLCJ0cnVlIiksbn19KSxtdCh7dHlwZToiYWNjZW50IixuYW1lczpbIlxcJyIsIlxcYCIsIlxcXiIsIlxcfiIsIlxcPSIsIlxcdSIsIlxcLiIsJ1xcIicsIlxcYyIsIlxcciIsIlxcSCIsIlxcdiIsIlxcdGV4dGNpcmNsZWQiXSxudW1BcmdzOjEsYWxsb3dlZEluVGV4dDohMCxhbGxvd2VkSW5NYXRoOiEwLGFyZ1R5cGVzOlsicHJpbWl0aXZlIl0saGFuZGxlcjooZSx0KT0+e2NvbnN0IHI9dFswXTtsZXQgbj1lLnBhcnNlci5tb2RlO3JldHVybiJtYXRoIj09PW4mJihlLnBhcnNlci5zZXR0aW5ncy5yZXBvcnROb25zdHJpY3QoIm1hdGhWc1RleHRBY2NlbnRzIiwiTGFUZVgncyBhY2NlbnQgIitlLmZ1bmNOYW1lKyIgd29ya3Mgb25seSBpbiB0ZXh0IG1vZGUiKSxuPSJ0ZXh0Iikse3R5cGU6ImFjY2VudCIsbW9kZTpuLGxhYmVsOmUuZnVuY05hbWUsaXNTdHJldGNoeTohMSxpc1NoaWZ0eTohMCxiYXNlOnJ9fX0pLG10KHt0eXBlOiJhY2NlbnRVbmRlciIsbmFtZXM6WyJcXHVuZGVybGVmdGFycm93IiwiXFx1bmRlcnJpZ2h0YXJyb3ciLCJcXHVuZGVybGVmdHJpZ2h0YXJyb3ciLCJcXHVuZGVyZ3JvdXAiLCJcXHVuZGVybGluZXNlZ21lbnQiLCJcXHV0aWxkZSJdLG51bUFyZ3M6MSxoYW5kbGVyOihlLHQpPT57bGV0IHI9ZS5wYXJzZXIsbj1lLmZ1bmNOYW1lO2NvbnN0IG89dFswXTtyZXR1cm57dHlwZToiYWNjZW50VW5kZXIiLG1vZGU6ci5tb2RlLGxhYmVsOm4sYmFzZTpvfX0saHRtbEJ1aWxkZXI6KGUsdCk9Pntjb25zdCByPU10KGUuYmFzZSx0KSxuPXRyKGUsdCksbz0iXFx1dGlsZGUiPT09ZS5sYWJlbD8uMTI6MCxzPUtlKHtwb3NpdGlvblR5cGU6InRvcCIscG9zaXRpb25EYXRhOnIuaGVpZ2h0LGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTpuLHdyYXBwZXJDbGFzc2VzOlsic3ZnLWFsaWduIl19LHt0eXBlOiJrZXJuIixzaXplOm99LHt0eXBlOiJlbGVtIixlbGVtOnJ9XX0pO3JldHVybiBZZShbIm1vcmQiLCJhY2NlbnR1bmRlciJdLFtzXSx0KX0sbWF0aG1sQnVpbGRlcjooZSx0KT0+e2NvbnN0IHI9SnQoZS5sYWJlbCksbj1uZXcgQnQoIm11bmRlciIsW1Z0KGUuYmFzZSx0KSxyXSk7cmV0dXJuIG4uc2V0QXR0cmlidXRlKCJhY2NlbnR1bmRlciIsInRydWUiKSxufX0pO2NvbnN0IGhyPWU9Pntjb25zdCB0PW5ldyBCdCgibXBhZGRlZCIsZT9bZV06W10pO3JldHVybiB0LnNldEF0dHJpYnV0ZSgid2lkdGgiLCIrMC42ZW0iKSx0LnNldEF0dHJpYnV0ZSgibHNwYWNlIiwiMC4zZW0iKSx0fTttdCh7dHlwZToieEFycm93IixuYW1lczpbIlxceGxlZnRhcnJvdyIsIlxceHJpZ2h0YXJyb3ciLCJcXHhMZWZ0YXJyb3ciLCJcXHhSaWdodGFycm93IiwiXFx4bGVmdHJpZ2h0YXJyb3ciLCJcXHhMZWZ0cmlnaHRhcnJvdyIsIlxceGhvb2tsZWZ0YXJyb3ciLCJcXHhob29rcmlnaHRhcnJvdyIsIlxceG1hcHN0byIsIlxceHJpZ2h0aGFycG9vbmRvd24iLCJcXHhyaWdodGhhcnBvb251cCIsIlxceGxlZnRoYXJwb29uZG93biIsIlxceGxlZnRoYXJwb29udXAiLCJcXHhyaWdodGxlZnRoYXJwb29ucyIsIlxceGxlZnRyaWdodGhhcnBvb25zIiwiXFx4bG9uZ2VxdWFsIiwiXFx4dHdvaGVhZHJpZ2h0YXJyb3ciLCJcXHh0d29oZWFkbGVmdGFycm93IiwiXFx4dG9mcm9tIiwiXFx4cmlnaHRsZWZ0YXJyb3dzIiwiXFx4cmlnaHRlcXVpbGlicml1bSIsIlxceGxlZnRlcXVpbGlicml1bSIsIlxcXFxjZHJpZ2h0YXJyb3ciLCJcXFxcY2RsZWZ0YXJyb3ciLCJcXFxcY2Rsb25nZXF1YWwiXSxudW1BcmdzOjEsbnVtT3B0aW9uYWxBcmdzOjEsaGFuZGxlcihlLHQscil7bGV0IG49ZS5wYXJzZXIsbz1lLmZ1bmNOYW1lO3JldHVybnt0eXBlOiJ4QXJyb3ciLG1vZGU6bi5tb2RlLGxhYmVsOm8sYm9keTp0WzBdLGJlbG93OnJbMF19fSxodG1sQnVpbGRlcihlLHQpe2NvbnN0IHI9dC5zdHlsZTtsZXQgbj10LmhhdmluZ1N0eWxlKHIuc3VwKCkpO2NvbnN0IG89WmUoTXQoZS5ib2R5LG4sdCksdCkscz0iXFx4Ij09PWUubGFiZWwuc2xpY2UoMCwyKT8ieCI6ImNkIjtsZXQgaTtvLmNsYXNzZXMucHVzaChzKyItYXJyb3ctcGFkIiksZS5iZWxvdyYmKG49dC5oYXZpbmdTdHlsZShyLnN1YigpKSxpPVplKE10KGUuYmVsb3csbix0KSx0KSxpLmNsYXNzZXMucHVzaChzKyItYXJyb3ctcGFkIikpO2NvbnN0IGw9dHIoZSx0KSxhPS10LmZvbnRNZXRyaWNzKCkuYXhpc0hlaWdodCsuNSpsLmhlaWdodDtsZXQgYyxoPS10LmZvbnRNZXRyaWNzKCkuYXhpc0hlaWdodC0uNSpsLmhlaWdodC0uMTExO2lmKChvLmRlcHRoPi4yNXx8IlxceGxlZnRlcXVpbGlicml1bSI9PT1lLmxhYmVsKSYmKGgtPW8uZGVwdGgpLGkpe2NvbnN0IGU9LXQuZm9udE1ldHJpY3MoKS5heGlzSGVpZ2h0K2kuaGVpZ2h0Ky41KmwuaGVpZ2h0Ky4xMTE7Yz1LZSh7cG9zaXRpb25UeXBlOiJpbmRpdmlkdWFsU2hpZnQiLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTpvLHNoaWZ0Omh9LHt0eXBlOiJlbGVtIixlbGVtOmwsc2hpZnQ6YSx3cmFwcGVyQ2xhc3NlczpbInN2Zy1hbGlnbiJdfSx7dHlwZToiZWxlbSIsZWxlbTppLHNoaWZ0OmV9XX0pfWVsc2UgYz1LZSh7cG9zaXRpb25UeXBlOiJpbmRpdmlkdWFsU2hpZnQiLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTpvLHNoaWZ0Omh9LHt0eXBlOiJlbGVtIixlbGVtOmwsc2hpZnQ6YSx3cmFwcGVyQ2xhc3NlczpbInN2Zy1hbGlnbiJdfV19KTtyZXR1cm4gWWUoWyJtcmVsIiwieC1hcnJvdyJdLFtjXSx0KX0sbWF0aG1sQnVpbGRlcihlLHQpe2NvbnN0IHI9SnQoZS5sYWJlbCk7bGV0IG47aWYoci5zZXRBdHRyaWJ1dGUoIm1pbnNpemUiLCJ4Ij09PWUubGFiZWwuY2hhckF0KDApPyIxLjc1ZW0iOiIzLjBlbSIpLGUuYm9keSl7Y29uc3Qgbz1ocihWdChlLmJvZHksdCkpO2lmKGUuYmVsb3cpe2NvbnN0IHM9aHIoVnQoZS5iZWxvdyx0KSk7bj1uZXcgQnQoIm11bmRlcm92ZXIiLFtyLHMsb10pfWVsc2Ugbj1uZXcgQnQoIm1vdmVyIixbcixvXSl9ZWxzZSBpZihlLmJlbG93KXtjb25zdCBvPWhyKFZ0KGUuYmVsb3csdCkpO249bmV3IEJ0KCJtdW5kZXIiLFtyLG9dKX1lbHNlIG49aHIoKSxuPW5ldyBCdCgibW92ZXIiLFtyLG5dKTtyZXR1cm4gbn19KSxtdCh7dHlwZToibWNsYXNzIixuYW1lczpbIlxcbWF0aG9yZCIsIlxcbWF0aGJpbiIsIlxcbWF0aHJlbCIsIlxcbWF0aG9wZW4iLCJcXG1hdGhjbG9zZSIsIlxcbWF0aHB1bmN0IiwiXFxtYXRoaW5uZXIiXSxudW1BcmdzOjEscHJpbWl0aXZlOiEwLGhhbmRsZXIoZSx0KXtsZXQgcj1lLnBhcnNlcixuPWUuZnVuY05hbWU7Y29uc3Qgbz10WzBdO3JldHVybnt0eXBlOiJtY2xhc3MiLG1vZGU6ci5tb2RlLG1jbGFzczoibSIrbi5zbGljZSg1KSxib2R5OmR0KG8pLGlzQ2hhcmFjdGVyQm94Om0obyl9fSxodG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe2NvbnN0IHI9eHQoZS5ib2R5LHQsITApO3JldHVybiBZZShbZS5tY2xhc3NdLHIsdCl9LG1hdGhtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXtsZXQgcjtjb25zdCBuPUZ0KGUuYm9keSx0KTtyZXR1cm4ibWlubmVyIj09PWUubWNsYXNzP3I9bmV3IEJ0KCJtcGFkZGVkIixuKToibW9yZCI9PT1lLm1jbGFzcz9lLmlzQ2hhcmFjdGVyQm94PyhyPW5bMF0sci50eXBlPSJtaSIpOnI9bmV3IEJ0KCJtaSIsbik6KGUuaXNDaGFyYWN0ZXJCb3g/KHI9blswXSxyLnR5cGU9Im1vIik6cj1uZXcgQnQoIm1vIixuKSwibWJpbiI9PT1lLm1jbGFzcz8oci5hdHRyaWJ1dGVzLmxzcGFjZT0iMC4yMmVtIixyLmF0dHJpYnV0ZXMucnNwYWNlPSIwLjIyZW0iKToibXB1bmN0Ij09PWUubWNsYXNzPyhyLmF0dHJpYnV0ZXMubHNwYWNlPSIwZW0iLHIuYXR0cmlidXRlcy5yc3BhY2U9IjAuMTdlbSIpOiJtb3BlbiIhPT1lLm1jbGFzcyYmIm1jbG9zZSIhPT1lLm1jbGFzc3x8KHIuYXR0cmlidXRlcy5sc3BhY2U9IjBlbSIsci5hdHRyaWJ1dGVzLnJzcGFjZT0iMGVtIikpLHJ9fSk7Y29uc3QgbXI9ZT0+e2NvbnN0IHQ9Im9yZGdyb3VwIj09PWUudHlwZSYmZS5ib2R5Lmxlbmd0aD9lLmJvZHlbMF06ZTtyZXR1cm4iYXRvbSIhPT10LnR5cGV8fCJiaW4iIT09dC5mYW1pbHkmJiJyZWwiIT09dC5mYW1pbHk/Im1vcmQiOiJtIit0LmZhbWlseX07bXQoe3R5cGU6Im1jbGFzcyIsbmFtZXM6WyJcXEBiaW5yZWwiXSxudW1BcmdzOjIsaGFuZGxlcihlLHQpe3JldHVybnt0eXBlOiJtY2xhc3MiLG1vZGU6ZS5wYXJzZXIubW9kZSxtY2xhc3M6bXIodFswXSksYm9keTpkdCh0WzFdKSxpc0NoYXJhY3RlckJveDptKHRbMV0pfX19KSxtdCh7dHlwZToibWNsYXNzIixuYW1lczpbIlxcc3RhY2tyZWwiLCJcXG92ZXJzZXQiLCJcXHVuZGVyc2V0Il0sbnVtQXJnczoyLGhhbmRsZXIoZSx0KXtsZXQgcj1lLnBhcnNlcixuPWUuZnVuY05hbWU7Y29uc3Qgbz10WzFdLHM9dFswXTtsZXQgaTtpPSJcXHN0YWNrcmVsIiE9PW4/bXIobyk6Im1yZWwiO2NvbnN0IGw9e3R5cGU6Im9wIixtb2RlOm8ubW9kZSxsaW1pdHM6ITAsYWx3YXlzSGFuZGxlU3VwU3ViOiEwLHBhcmVudElzU3VwU3ViOiExLHN5bWJvbDohMSxzdXBwcmVzc0Jhc2VTaGlmdDoiXFxzdGFja3JlbCIhPT1uLGJvZHk6ZHQobyl9LGE9IlxcdW5kZXJzZXQiPT09bj97dHlwZToic3Vwc3ViIixtb2RlOnMubW9kZSxiYXNlOmwsc3ViOnN9Ont0eXBlOiJzdXBzdWIiLG1vZGU6cy5tb2RlLGJhc2U6bCxzdXA6c307cmV0dXJue3R5cGU6Im1jbGFzcyIsbW9kZTpyLm1vZGUsbWNsYXNzOmksYm9keTpbYV0saXNDaGFyYWN0ZXJCb3g6bShhKX19fSksbXQoe3R5cGU6InBtYiIsbmFtZXM6WyJcXHBtYiJdLG51bUFyZ3M6MSxhbGxvd2VkSW5UZXh0OiEwLGhhbmRsZXIoZSx0KXtyZXR1cm57dHlwZToicG1iIixtb2RlOmUucGFyc2VyLm1vZGUsbWNsYXNzOm1yKHRbMF0pLGJvZHk6ZHQodFswXSl9fSxodG1sQnVpbGRlcihlLHQpe2NvbnN0IHI9eHQoZS5ib2R5LHQsITApLG49WWUoW2UubWNsYXNzXSxyLHQpO3JldHVybiBuLnN0eWxlLnRleHRTaGFkb3c9IjAuMDJlbSAwLjAxZW0gMC4wNHB4IixufSxtYXRobWxCdWlsZGVyKGUsdCl7Y29uc3Qgcj1GdChlLmJvZHksdCksbj1uZXcgQnQoIm1zdHlsZSIscik7cmV0dXJuIG4uc2V0QXR0cmlidXRlKCJzdHlsZSIsInRleHQtc2hhZG93OiAwLjAyZW0gMC4wMWVtIDAuMDRweCIpLG59fSk7Y29uc3QgdXI9eyI+IjoiXFxcXGNkcmlnaHRhcnJvdyIsIjwiOiJcXFxcY2RsZWZ0YXJyb3ciLCI9IjoiXFxcXGNkbG9uZ2VxdWFsIixBOiJcXHVwYXJyb3ciLFY6IlxcZG93bmFycm93IiwifCI6IlxcVmVydCIsIi4iOiJubyBhcnJvdyJ9LHByPSgpPT4oe3R5cGU6InN0eWxpbmciLGJvZHk6W10sbW9kZToibWF0aCIsc3R5bGU6ImRpc3BsYXkiLHJlc2V0Rm9udDohMH0pLGRyPWU9PiJ0ZXh0b3JkIj09PWUudHlwZSYmIkAiPT09ZS50ZXh0LGdyPShlLHQpPT4oIm1hdGhvcmQiPT09ZS50eXBlfHwiYXRvbSI9PT1lLnR5cGUpJiZlLnRleHQ9PT10O2Z1bmN0aW9uIGZyKGUsdCxyKXtjb25zdCBuPXVyW2VdO3N3aXRjaChuKXtjYXNlIlxcXFxjZHJpZ2h0YXJyb3ciOmNhc2UiXFxcXGNkbGVmdGFycm93IjpyZXR1cm4gci5jYWxsRnVuY3Rpb24obixbdFswXV0sW3RbMV1dKTtjYXNlIlxcdXBhcnJvdyI6Y2FzZSJcXGRvd25hcnJvdyI6e2NvbnN0IGU9e3R5cGU6ImF0b20iLHRleHQ6bixtb2RlOiJtYXRoIixmYW1pbHk6InJlbCJ9LG89e3R5cGU6Im9yZGdyb3VwIixtb2RlOiJtYXRoIixib2R5OltyLmNhbGxGdW5jdGlvbigiXFxcXGNkbGVmdCIsW3RbMF1dLFtdKSxyLmNhbGxGdW5jdGlvbigiXFxCaWciLFtlXSxbXSksci5jYWxsRnVuY3Rpb24oIlxcXFxjZHJpZ2h0IixbdFsxXV0sW10pXX07cmV0dXJuIHIuY2FsbEZ1bmN0aW9uKCJcXFxcY2RwYXJlbnQiLFtvXSxbXSl9Y2FzZSJcXFxcY2Rsb25nZXF1YWwiOnJldHVybiByLmNhbGxGdW5jdGlvbigiXFxcXGNkbG9uZ2VxdWFsIixbXSxbXSk7Y2FzZSJcXFZlcnQiOntjb25zdCBlPXt0eXBlOiJ0ZXh0b3JkIix0ZXh0OiJcXFZlcnQiLG1vZGU6Im1hdGgifTtyZXR1cm4gci5jYWxsRnVuY3Rpb24oIlxcQmlnIixbZV0sW10pfWRlZmF1bHQ6cmV0dXJue3R5cGU6InRleHRvcmQiLHRleHQ6IiAiLG1vZGU6Im1hdGgifX19bXQoe3R5cGU6ImNkbGFiZWwiLG5hbWVzOlsiXFxcXGNkbGVmdCIsIlxcXFxjZHJpZ2h0Il0sbnVtQXJnczoxLGhhbmRsZXIoZSx0KXtsZXQgcj1lLnBhcnNlcixuPWUuZnVuY05hbWU7cmV0dXJue3R5cGU6ImNkbGFiZWwiLG1vZGU6ci5tb2RlLHNpZGU6bi5zbGljZSg0KSxsYWJlbDp0WzBdfX0saHRtbEJ1aWxkZXIoZSx0KXtjb25zdCByPXQuaGF2aW5nU3R5bGUodC5zdHlsZS5zdXAoKSksbj1aZShNdChlLmxhYmVsLHIsdCksdCk7cmV0dXJuIG4uY2xhc3Nlcy5wdXNoKCJjZC1sYWJlbC0iK2Uuc2lkZSksbi5zdHlsZS5ib3R0b209TiguOC1uLmRlcHRoKSxuLmhlaWdodD0wLG4uZGVwdGg9MCxufSxtYXRobWxCdWlsZGVyKGUsdCl7bGV0IHI9bmV3IEJ0KCJtcm93IixbVnQoZS5sYWJlbCx0KV0pO3JldHVybiByPW5ldyBCdCgibXBhZGRlZCIsW3JdKSxyLnNldEF0dHJpYnV0ZSgid2lkdGgiLCIwIiksImxlZnQiPT09ZS5zaWRlJiZyLnNldEF0dHJpYnV0ZSgibHNwYWNlIiwiLTF3aWR0aCIpLHIuc2V0QXR0cmlidXRlKCJ2b2Zmc2V0IiwiMC43ZW0iKSxyPW5ldyBCdCgibXN0eWxlIixbcl0pLHIuc2V0QXR0cmlidXRlKCJkaXNwbGF5c3R5bGUiLCJmYWxzZSIpLHIuc2V0QXR0cmlidXRlKCJzY3JpcHRsZXZlbCIsIjEiKSxyfX0pLG10KHt0eXBlOiJjZGxhYmVscGFyZW50IixuYW1lczpbIlxcXFxjZHBhcmVudCJdLG51bUFyZ3M6MSxoYW5kbGVyKGUsdCl7cmV0dXJue3R5cGU6ImNkbGFiZWxwYXJlbnQiLG1vZGU6ZS5wYXJzZXIubW9kZSxmcmFnbWVudDp0WzBdfX0saHRtbEJ1aWxkZXIoZSx0KXtjb25zdCByPVplKE10KGUuZnJhZ21lbnQsdCksdCk7cmV0dXJuIHIuY2xhc3Nlcy5wdXNoKCJjZC12ZXJ0LWFycm93Iikscn0sbWF0aG1sQnVpbGRlcihlLHQpe3JldHVybiBuZXcgQnQoIm1yb3ciLFtWdChlLmZyYWdtZW50LHQpXSl9fSksbXQoe3R5cGU6InRleHRvcmQiLG5hbWVzOlsiXFxAY2hhciJdLG51bUFyZ3M6MSxhbGxvd2VkSW5UZXh0OiEwLGhhbmRsZXIoZSx0KXtsZXQgcj1lLnBhcnNlcjtjb25zdCBvPW9yKHRbMF0sIm9yZGdyb3VwIikuYm9keTtsZXQgcz0iIjtmb3IobGV0IGU9MDtlPG8ubGVuZ3RoO2UrKyl7cys9b3Iob1tlXSwidGV4dG9yZCIpLnRleHR9bGV0IGksbD1wYXJzZUludChzKTtpZihpc05hTihsKSl0aHJvdyBuZXcgbigiXFxAY2hhciBoYXMgbm9uLW51bWVyaWMgYXJndW1lbnQgIitzKTtpZihsPDB8fGw+PTExMTQxMTEpdGhyb3cgbmV3IG4oIlxcQGNoYXIgd2l0aCBpbnZhbGlkIGNvZGUgcG9pbnQgIitzKTtyZXR1cm4gbDw9NjU1MzU/aT1TdHJpbmcuZnJvbUNoYXJDb2RlKGwpOihsLT02NTUzNixpPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUyOTYrKGw+PjEwKSw1NjMyMCsoMTAyMyZsKSkpLHt0eXBlOiJ0ZXh0b3JkIixtb2RlOnIubW9kZSx0ZXh0Oml9fX0pO210KHt0eXBlOiJjb2xvciIsbmFtZXM6WyJcXHRleHRjb2xvciJdLG51bUFyZ3M6MixhbGxvd2VkSW5UZXh0OiEwLGFyZ1R5cGVzOlsiY29sb3IiLCJvcmlnaW5hbCJdLGhhbmRsZXIoZSx0KXtsZXQgcj1lLnBhcnNlcjtjb25zdCBuPW9yKHRbMF0sImNvbG9yLXRva2VuIikuY29sb3Isbz10WzFdO3JldHVybnt0eXBlOiJjb2xvciIsbW9kZTpyLm1vZGUsY29sb3I6bixib2R5OmR0KG8pfX0saHRtbEJ1aWxkZXI6KGUsdCk9Pntjb25zdCByPXh0KGUuYm9keSx0LndpdGhDb2xvcihlLmNvbG9yKSwhMSk7cmV0dXJuICRlKHIpfSxtYXRobWxCdWlsZGVyOihlLHQpPT57Y29uc3Qgcj1GdChlLmJvZHksdC53aXRoQ29sb3IoZS5jb2xvcikpLG49bmV3IEJ0KCJtc3R5bGUiLHIpO3JldHVybiBuLnNldEF0dHJpYnV0ZSgibWF0aGNvbG9yIixlLmNvbG9yKSxufX0pLG10KHt0eXBlOiJjb2xvciIsbmFtZXM6WyJcXGNvbG9yIl0sbnVtQXJnczoxLGFsbG93ZWRJblRleHQ6ITAsYXJnVHlwZXM6WyJjb2xvciJdLGhhbmRsZXIoZSx0KXtsZXQgcj1lLnBhcnNlcixuPWUuYnJlYWtPblRva2VuVGV4dDtjb25zdCBvPW9yKHRbMF0sImNvbG9yLXRva2VuIikuY29sb3I7ci5ndWxsZXQubWFjcm9zLnNldCgiXFxjdXJyZW50QGNvbG9yIixvKTtjb25zdCBzPXIucGFyc2VFeHByZXNzaW9uKCEwLG4pO3JldHVybnt0eXBlOiJjb2xvciIsbW9kZTpyLm1vZGUsY29sb3I6byxib2R5OnN9fX0pLG10KHt0eXBlOiJjciIsbmFtZXM6WyJcXFxcIl0sbnVtQXJnczowLG51bU9wdGlvbmFsQXJnczowLGFsbG93ZWRJblRleHQ6ITAsaGFuZGxlcihlLHQscil7bGV0IG49ZS5wYXJzZXI7Y29uc3Qgbz0iWyI9PT1uLmd1bGxldC5mdXR1cmUoKS50ZXh0P24ucGFyc2VTaXplR3JvdXAoITApOm51bGwscz0hbi5zZXR0aW5ncy5kaXNwbGF5TW9kZXx8IW4uc2V0dGluZ3MudXNlU3RyaWN0QmVoYXZpb3IoIm5ld0xpbmVJbkRpc3BsYXlNb2RlIiwiSW4gTGFUZVgsIFxcXFwgb3IgXFxuZXdsaW5lIGRvZXMgbm90aGluZyBpbiBkaXNwbGF5IG1vZGUiKTtyZXR1cm57dHlwZToiY3IiLG1vZGU6bi5tb2RlLG5ld0xpbmU6cyxzaXplOm8mJm9yKG8sInNpemUiKS52YWx1ZX19LGh0bWxCdWlsZGVyKGUsdCl7Y29uc3Qgcj1ZZShbIm1zcGFjZSJdLFtdLHQpO3JldHVybiBlLm5ld0xpbmUmJihyLmNsYXNzZXMucHVzaCgia2F0ZXgtbmV3bGluZSIpLGUuc2l6ZSYmKHIuc3R5bGUubWFyZ2luVG9wPU4oTyhlLnNpemUsdCkpKSkscn0sbWF0aG1sQnVpbGRlcihlLHQpe2NvbnN0IHI9bmV3IEJ0KCJtc3BhY2UiKTtyZXR1cm4gZS5uZXdMaW5lJiYoci5zZXRBdHRyaWJ1dGUoImxpbmVicmVhayIsIm5ld2xpbmUiKSxlLnNpemUmJnIuc2V0QXR0cmlidXRlKCJoZWlnaHQiLE4oTyhlLnNpemUsdCkpKSkscn19KTtjb25zdCBicj17IlxcZ2xvYmFsIjoiXFxnbG9iYWwiLCJcXGxvbmciOiJcXFxcZ2xvYmFsbG9uZyIsIlxcXFxnbG9iYWxsb25nIjoiXFxcXGdsb2JhbGxvbmciLCJcXGRlZiI6IlxcZ2RlZiIsIlxcZ2RlZiI6IlxcZ2RlZiIsIlxcZWRlZiI6IlxceGRlZiIsIlxceGRlZiI6IlxceGRlZiIsIlxcbGV0IjoiXFxcXGdsb2JhbGxldCIsIlxcZnV0dXJlbGV0IjoiXFxcXGdsb2JhbGZ1dHVyZSJ9LHlyPWU9Pntjb25zdCB0PWUudGV4dDtpZigvXig/OltcXHt9JCYjXl9dfEVPRikkLy50ZXN0KHQpKXRocm93IG5ldyBuKCJFeHBlY3RlZCBhIGNvbnRyb2wgc2VxdWVuY2UiLGUpO3JldHVybiB0fSx4cj0oZSx0LHIsbik9PntsZXQgbz1lLmd1bGxldC5tYWNyb3MuZ2V0KHIudGV4dCk7bnVsbD09byYmKHIubm9leHBhbmQ9ITAsbz17dG9rZW5zOltyXSxudW1BcmdzOjAsdW5leHBhbmRhYmxlOiFlLmd1bGxldC5pc0V4cGFuZGFibGUoci50ZXh0KX0pLGUuZ3VsbGV0Lm1hY3Jvcy5zZXQodCxvLG4pfTttdCh7dHlwZToiaW50ZXJuYWwiLG5hbWVzOlsiXFxnbG9iYWwiLCJcXGxvbmciLCJcXFxcZ2xvYmFsbG9uZyJdLG51bUFyZ3M6MCxhbGxvd2VkSW5UZXh0OiEwLGhhbmRsZXIoZSl7bGV0IHQ9ZS5wYXJzZXIscj1lLmZ1bmNOYW1lO3QuY29uc3VtZVNwYWNlcygpO2NvbnN0IG89dC5mZXRjaCgpO2lmKGJyW28udGV4dF0pcmV0dXJuIlxcZ2xvYmFsIiE9PXImJiJcXFxcZ2xvYmFsbG9uZyIhPT1yfHwoby50ZXh0PWJyW28udGV4dF0pLG9yKHQucGFyc2VGdW5jdGlvbigpLCJpbnRlcm5hbCIpO3Rocm93IG5ldyBuKCJJbnZhbGlkIHRva2VuIGFmdGVyIG1hY3JvIHByZWZpeCIsbyl9fSksbXQoe3R5cGU6ImludGVybmFsIixuYW1lczpbIlxcZGVmIiwiXFxnZGVmIiwiXFxlZGVmIiwiXFx4ZGVmIl0sbnVtQXJnczowLGFsbG93ZWRJblRleHQ6ITAscHJpbWl0aXZlOiEwLGhhbmRsZXIoZSl7bGV0IHQ9ZS5wYXJzZXIscj1lLmZ1bmNOYW1lLG89dC5ndWxsZXQucG9wVG9rZW4oKTtjb25zdCBzPW8udGV4dDtpZigvXig/OltcXHt9JCYjXl9dfEVPRikkLy50ZXN0KHMpKXRocm93IG5ldyBuKCJFeHBlY3RlZCBhIGNvbnRyb2wgc2VxdWVuY2UiLG8pO2xldCBpLGw9MDtjb25zdCBhPVtbXV07Zm9yKDsieyIhPT10Lmd1bGxldC5mdXR1cmUoKS50ZXh0OylpZihvPXQuZ3VsbGV0LnBvcFRva2VuKCksIiMiPT09by50ZXh0KXtpZigieyI9PT10Lmd1bGxldC5mdXR1cmUoKS50ZXh0KXtpPXQuZ3VsbGV0LmZ1dHVyZSgpLGFbbF0ucHVzaCgieyIpO2JyZWFrfWlmKG89dC5ndWxsZXQucG9wVG9rZW4oKSwhL15bMS05XSQvLnRlc3Qoby50ZXh0KSl0aHJvdyBuZXcgbignSW52YWxpZCBhcmd1bWVudCBudW1iZXIgIicrby50ZXh0KyciJyk7aWYocGFyc2VJbnQoby50ZXh0KSE9PWwrMSl0aHJvdyBuZXcgbignQXJndW1lbnQgbnVtYmVyICInK28udGV4dCsnIiBvdXQgb2Ygb3JkZXInKTtsKyssYS5wdXNoKFtdKX1lbHNle2lmKCJFT0YiPT09by50ZXh0KXRocm93IG5ldyBuKCJFeHBlY3RlZCBhIG1hY3JvIGRlZmluaXRpb24iKTthW2xdLnB1c2goby50ZXh0KX1sZXQgYz10Lmd1bGxldC5jb25zdW1lQXJnKCkudG9rZW5zO3JldHVybiBpJiZjLnVuc2hpZnQoaSksIlxcZWRlZiIhPT1yJiYiXFx4ZGVmIiE9PXJ8fChjPXQuZ3VsbGV0LmV4cGFuZFRva2VucyhjKSxjLnJldmVyc2UoKSksdC5ndWxsZXQubWFjcm9zLnNldChzLHt0b2tlbnM6YyxudW1BcmdzOmwsZGVsaW1pdGVyczphfSxyPT09YnJbcl0pLHt0eXBlOiJpbnRlcm5hbCIsbW9kZTp0Lm1vZGV9fX0pLG10KHt0eXBlOiJpbnRlcm5hbCIsbmFtZXM6WyJcXGxldCIsIlxcXFxnbG9iYWxsZXQiXSxudW1BcmdzOjAsYWxsb3dlZEluVGV4dDohMCxwcmltaXRpdmU6ITAsaGFuZGxlcihlKXtsZXQgdD1lLnBhcnNlcixyPWUuZnVuY05hbWU7Y29uc3Qgbj15cih0Lmd1bGxldC5wb3BUb2tlbigpKTt0Lmd1bGxldC5jb25zdW1lU3BhY2VzKCk7Y29uc3Qgbz0oZT0+e2xldCB0PWUuZ3VsbGV0LnBvcFRva2VuKCk7cmV0dXJuIj0iPT09dC50ZXh0JiYodD1lLmd1bGxldC5wb3BUb2tlbigpLCIgIj09PXQudGV4dCYmKHQ9ZS5ndWxsZXQucG9wVG9rZW4oKSkpLHR9KSh0KTtyZXR1cm4geHIodCxuLG8sIlxcXFxnbG9iYWxsZXQiPT09cikse3R5cGU6ImludGVybmFsIixtb2RlOnQubW9kZX19fSksbXQoe3R5cGU6ImludGVybmFsIixuYW1lczpbIlxcZnV0dXJlbGV0IiwiXFxcXGdsb2JhbGZ1dHVyZSJdLG51bUFyZ3M6MCxhbGxvd2VkSW5UZXh0OiEwLHByaW1pdGl2ZTohMCxoYW5kbGVyKGUpe2xldCB0PWUucGFyc2VyLHI9ZS5mdW5jTmFtZTtjb25zdCBuPXlyKHQuZ3VsbGV0LnBvcFRva2VuKCkpLG89dC5ndWxsZXQucG9wVG9rZW4oKSxzPXQuZ3VsbGV0LnBvcFRva2VuKCk7cmV0dXJuIHhyKHQsbixzLCJcXFxcZ2xvYmFsZnV0dXJlIj09PXIpLHQuZ3VsbGV0LnB1c2hUb2tlbihzKSx0Lmd1bGxldC5wdXNoVG9rZW4obykse3R5cGU6ImludGVybmFsIixtb2RlOnQubW9kZX19fSk7Y29uc3Qgd3I9ZnVuY3Rpb24oZSx0LHIpe2NvbnN0IG49ZWUobmUubWF0aFtlXSYmbmUubWF0aFtlXS5yZXBsYWNlfHxlLHQscik7aWYoIW4pdGhyb3cgbmV3IEVycm9yKCJVbnN1cHBvcnRlZCBzeW1ib2wgIitlKyIgYW5kIGZvbnQgc2l6ZSAiK3QrIi4iKTtyZXR1cm4gbn0sdnI9ZnVuY3Rpb24oZSx0LHIsbil7Y29uc3Qgbz1yLmhhdmluZ0Jhc2VTdHlsZSh0KSxzPVllKG4uY29uY2F0KG8uc2l6aW5nQ2xhc3NlcyhyKSksW2VdLHIpLGk9by5zaXplTXVsdGlwbGllci9yLnNpemVNdWx0aXBsaWVyO3JldHVybiBzLmhlaWdodCo9aSxzLmRlcHRoKj1pLHMubWF4Rm9udFNpemU9by5zaXplTXVsdGlwbGllcixzfSxrcj1mdW5jdGlvbihlLHQscil7Y29uc3Qgbj10LmhhdmluZ0Jhc2VTdHlsZShyKSxvPSgxLXQuc2l6ZU11bHRpcGxpZXIvbi5zaXplTXVsdGlwbGllcikqdC5mb250TWV0cmljcygpLmF4aXNIZWlnaHQ7ZS5jbGFzc2VzLnB1c2goImRlbGltY2VudGVyIiksZS5zdHlsZS50b3A9TihvKSxlLmhlaWdodC09byxlLmRlcHRoKz1vfSx6cj1mdW5jdGlvbihlLHQscixuLG8scyl7Y29uc3QgaT1mdW5jdGlvbihlLHQscixuKXtyZXR1cm4gUGUoZSwiU2l6ZSIrdCsiLVJlZ3VsYXIiLHIsbil9KGUsdCxvLG4pLGw9dnIoWWUoWyJkZWxpbXNpemluZyIsInNpemUiK3RdLFtpXSxuKSxTLlRFWFQsbixzKTtyZXR1cm4gciYma3IobCxuLFMuVEVYVCksbH0sU3I9ZnVuY3Rpb24oZSx0LHIpe2xldCBuO249IlNpemUxLVJlZ3VsYXIiPT09dD8iZGVsaW0tc2l6ZTEiOiJkZWxpbS1zaXplNCI7cmV0dXJue3R5cGU6ImVsZW0iLGVsZW06WWUoWyJkZWxpbXNpemluZ2lubmVyIixuXSxbWWUoW10sW1BlKGUsdCxyKV0pXSl9fSxNcj1mdW5jdGlvbihlLHQscil7Y29uc3Qgbj1LWyJTaXplNC1SZWd1bGFyIl1bZS5jaGFyQ29kZUF0KDApXT9LWyJTaXplNC1SZWd1bGFyIl1bZS5jaGFyQ29kZUF0KDApXVs0XTpLWyJTaXplMS1SZWd1bGFyIl1bZS5jaGFyQ29kZUF0KDApXVs0XSxvPW5ldyAkKCJpbm5lciIsZnVuY3Rpb24oZSx0KXtzd2l0Y2goZSl7Y2FzZSJcdTIzOWMiOnJldHVybiBDKCJNMjkxIDAgSDQxNyBWIit0KyIgSDI5MXoiKTtjYXNlIlx1MjIyMyI6cmV0dXJuIEMoIk0xNDUgMCBIMTg4IFYiK3QrIiBIMTQ1eiIpO2Nhc2UiXHUyMjI1IjpyZXR1cm4gQygiTTE0NSAwIEgxODggViIrdCsiIEgxNDV6IikrQygiTTM2NyAwIEg0MTAgViIrdCsiIEgzNjd6Iik7Y2FzZSJcdTIzOWYiOnJldHVybiBDKCJNNDU3IDAgSDU4MyBWIit0KyIgSDQ1N3oiKTtjYXNlIlx1MjNhMiI6cmV0dXJuIEMoIk0zMTkgMCBINDAzIFYiK3QrIiBIMzE5eiIpO2Nhc2UiXHUyM2E1IjpyZXR1cm4gQygiTTI2MyAwIEgzNDcgViIrdCsiIEgyNjN6Iik7Y2FzZSJcdTIzYWEiOnJldHVybiBDKCJNMzg0IDAgSDUwNCBWIit0KyIgSDM4NHoiKTtjYXNlIlx1MjNkMCI6cmV0dXJuIEMoIk0zMTIgMCBIMzU1IFYiK3QrIiBIMzEyeiIpO2Nhc2UiXHUyMDE2IjpyZXR1cm4gQygiTTI1NyAwIEgzMDAgViIrdCsiIEgyNTd6IikrQygiTTQ3OCAwIEg1MjEgViIrdCsiIEg0Nzh6Iik7ZGVmYXVsdDpyZXR1cm4iIn19KGUsTWF0aC5yb3VuZCgxZTMqdCkpKSxzPW5ldyBfKFtvXSx7d2lkdGg6TihuKSxoZWlnaHQ6Tih0KSxzdHlsZToid2lkdGg6IitOKG4pLHZpZXdCb3g6IjAgMCAiKzFlMypuKyIgIitNYXRoLnJvdW5kKDFlMyp0KSxwcmVzZXJ2ZUFzcGVjdFJhdGlvOiJ4TWluWU1pbiJ9KSxpPVdlKFtdLFtzXSxyKTtyZXR1cm4gaS5oZWlnaHQ9dCxpLnN0eWxlLmhlaWdodD1OKHQpLGkuc3R5bGUud2lkdGg9TihuKSx7dHlwZToiZWxlbSIsZWxlbTppfX0sQXI9e3R5cGU6Imtlcm4iLHNpemU6LS4wMDh9LFRyPW5ldyBTZXQoWyJ8IiwiXFxsdmVydCIsIlxccnZlcnQiLCJcXHZlcnQiXSksQ3I9bmV3IFNldChbIlxcfCIsIlxcbFZlcnQiLCJcXHJWZXJ0IiwiXFxWZXJ0Il0pLEJyPWZ1bmN0aW9uKGUsdCxyLG4sbyxzKXtsZXQgaSxsLGEsYyxoPSIiLG09MDtpPWE9Yz1lLGw9bnVsbDtsZXQgdT0iU2l6ZTEtUmVndWxhciI7IlxcdXBhcnJvdyI9PT1lP2E9Yz0iXHUyM2QwIjoiXFxVcGFycm93Ij09PWU/YT1jPSJcdTIwMTYiOiJcXGRvd25hcnJvdyI9PT1lP2k9YT0iXHUyM2QwIjoiXFxEb3duYXJyb3ciPT09ZT9pPWE9Ilx1MjAxNiI6IlxcdXBkb3duYXJyb3ciPT09ZT8oaT0iXFx1cGFycm93IixhPSJcdTIzZDAiLGM9IlxcZG93bmFycm93Iik6IlxcVXBkb3duYXJyb3ciPT09ZT8oaT0iXFxVcGFycm93IixhPSJcdTIwMTYiLGM9IlxcRG93bmFycm93Iik6VHIuaGFzKGUpPyhhPSJcdTIyMjMiLGg9InZlcnQiLG09MzMzKTpDci5oYXMoZSk/KGE9Ilx1MjIyNSIsaD0iZG91YmxldmVydCIsbT01NTYpOiJbIj09PWV8fCJcXGxicmFjayI9PT1lPyhpPSJcdTIzYTEiLGE9Ilx1MjNhMiIsYz0iXHUyM2EzIix1PSJTaXplNC1SZWd1bGFyIixoPSJsYnJhY2siLG09NjY3KToiXSI9PT1lfHwiXFxyYnJhY2siPT09ZT8oaT0iXHUyM2E0IixhPSJcdTIzYTUiLGM9Ilx1MjNhNiIsdT0iU2l6ZTQtUmVndWxhciIsaD0icmJyYWNrIixtPTY2Nyk6IlxcbGZsb29yIj09PWV8fCJcdTIzMGEiPT09ZT8oYT1pPSJcdTIzYTIiLGM9Ilx1MjNhMyIsdT0iU2l6ZTQtUmVndWxhciIsaD0ibGZsb29yIixtPTY2Nyk6IlxcbGNlaWwiPT09ZXx8Ilx1MjMwOCI9PT1lPyhpPSJcdTIzYTEiLGE9Yz0iXHUyM2EyIix1PSJTaXplNC1SZWd1bGFyIixoPSJsY2VpbCIsbT02NjcpOiJcXHJmbG9vciI9PT1lfHwiXHUyMzBiIj09PWU/KGE9aT0iXHUyM2E1IixjPSJcdTIzYTYiLHU9IlNpemU0LVJlZ3VsYXIiLGg9InJmbG9vciIsbT02NjcpOiJcXHJjZWlsIj09PWV8fCJcdTIzMDkiPT09ZT8oaT0iXHUyM2E0IixhPWM9Ilx1MjNhNSIsdT0iU2l6ZTQtUmVndWxhciIsaD0icmNlaWwiLG09NjY3KToiKCI9PT1lfHwiXFxscGFyZW4iPT09ZT8oaT0iXHUyMzliIixhPSJcdTIzOWMiLGM9Ilx1MjM5ZCIsdT0iU2l6ZTQtUmVndWxhciIsaD0ibHBhcmVuIixtPTg3NSk6IikiPT09ZXx8IlxccnBhcmVuIj09PWU/KGk9Ilx1MjM5ZSIsYT0iXHUyMzlmIixjPSJcdTIzYTAiLHU9IlNpemU0LVJlZ3VsYXIiLGg9InJwYXJlbiIsbT04NzUpOiJcXHsiPT09ZXx8IlxcbGJyYWNlIj09PWU/KGk9Ilx1MjNhNyIsbD0iXHUyM2E4IixjPSJcdTIzYTkiLGE9Ilx1MjNhYSIsdT0iU2l6ZTQtUmVndWxhciIpOiJcXH0iPT09ZXx8IlxccmJyYWNlIj09PWU/KGk9Ilx1MjNhYiIsbD0iXHUyM2FjIixjPSJcdTIzYWQiLGE9Ilx1MjNhYSIsdT0iU2l6ZTQtUmVndWxhciIpOiJcXGxncm91cCI9PT1lfHwiXHUyN2VlIj09PWU/KGk9Ilx1MjNhNyIsYz0iXHUyM2E5IixhPSJcdTIzYWEiLHU9IlNpemU0LVJlZ3VsYXIiKToiXFxyZ3JvdXAiPT09ZXx8Ilx1MjdlZiI9PT1lPyhpPSJcdTIzYWIiLGM9Ilx1MjNhZCIsYT0iXHUyM2FhIix1PSJTaXplNC1SZWd1bGFyIik6IlxcbG1vdXN0YWNoZSI9PT1lfHwiXHUyM2IwIj09PWU/KGk9Ilx1MjNhNyIsYz0iXHUyM2FkIixhPSJcdTIzYWEiLHU9IlNpemU0LVJlZ3VsYXIiKToiXFxybW91c3RhY2hlIiE9PWUmJiJcdTIzYjEiIT09ZXx8KGk9Ilx1MjNhYiIsYz0iXHUyM2E5IixhPSJcdTIzYWEiLHU9IlNpemU0LVJlZ3VsYXIiKTtjb25zdCBwPXdyKGksdSxvKSxkPXAuaGVpZ2h0K3AuZGVwdGgsZz13cihhLHUsbyksZj1nLmhlaWdodCtnLmRlcHRoLGI9d3IoYyx1LG8pLHk9Yi5oZWlnaHQrYi5kZXB0aDtsZXQgeD0wLHc9MTtpZihudWxsIT09bCl7Y29uc3QgZT13cihsLHUsbyk7eD1lLmhlaWdodCtlLmRlcHRoLHc9Mn1jb25zdCB2PWQreSt4LGs9ditNYXRoLm1heCgwLE1hdGguY2VpbCgodC12KS8odypmKSkpKncqZjtsZXQgej1uLmZvbnRNZXRyaWNzKCkuYXhpc0hlaWdodDtyJiYoeio9bi5zaXplTXVsdGlwbGllcik7Y29uc3QgTT1rLzIteixBPVtdO2lmKGgubGVuZ3RoPjApe2NvbnN0IGU9ay1kLXksdD1NYXRoLnJvdW5kKDFlMyprKSxyPWZ1bmN0aW9uKGUsdCl7c3dpdGNoKGUpe2Nhc2UibGJyYWNrIjpyZXR1cm4iTTQwMyAxNzU5IFY4NCBINjY2IFYwIEgzMTkgVjE3NTkgdiIrdCsiIHYxNzU5IHY4NCBoMzQ3IHYtODRcbkg0MDN6IE00MDMgMTc1OSBWMCBIMzE5IFYxNzU5IHYiK3QrIiB2MTc1OSB2ODQgaDg0eiI7Y2FzZSJyYnJhY2siOnJldHVybiJNMzQ3IDE3NTkgVjAgSDAgVjg0IEgyNjMgVjE3NTkgdiIrdCsiIHYxNzU5IEgwIHY4NCBIMzQ3elxuTTM0NyAxNzU5IFYwIEgyNjMgVjE3NTkgdiIrdCsiIHYxNzU5IGg4NHoiO2Nhc2UidmVydCI6cmV0dXJuIk0xNDUgMTUgdjU4NSB2Iit0KyIgdjU4NSBjMi42NjcsMTAsOS42NjcsMTUsMjEsMTVcbmMxMCwwLDE2LjY2NywtNSwyMCwtMTUgdi01ODUgdiIrLXQrIiB2LTU4NSBjLTIuNjY3LC0xMCwtOS42NjcsLTE1LC0yMSwtMTVcbmMtMTAsMCwtMTYuNjY3LDUsLTIwLDE1eiBNMTg4IDE1IEgxNDUgdjU4NSB2Iit0KyIgdjU4NSBoNDN6IjtjYXNlImRvdWJsZXZlcnQiOnJldHVybiJNMTQ1IDE1IHY1ODUgdiIrdCsiIHY1ODUgYzIuNjY3LDEwLDkuNjY3LDE1LDIxLDE1XG5jMTAsMCwxNi42NjcsLTUsMjAsLTE1IHYtNTg1IHYiKy10KyIgdi01ODUgYy0yLjY2NywtMTAsLTkuNjY3LC0xNSwtMjEsLTE1XG5jLTEwLDAsLTE2LjY2Nyw1LC0yMCwxNXogTTE4OCAxNSBIMTQ1IHY1ODUgdiIrdCsiIHY1ODUgaDQzelxuTTM2NyAxNSB2NTg1IHYiK3QrIiB2NTg1IGMyLjY2NywxMCw5LjY2NywxNSwyMSwxNVxuYzEwLDAsMTYuNjY3LC01LDIwLC0xNSB2LTU4NSB2IistdCsiIHYtNTg1IGMtMi42NjcsLTEwLC05LjY2NywtMTUsLTIxLC0xNVxuYy0xMCwwLC0xNi42NjcsNSwtMjAsMTV6IE00MTAgMTUgSDM2NyB2NTg1IHYiK3QrIiB2NTg1IGg0M3oiO2Nhc2UibGZsb29yIjpyZXR1cm4iTTMxOSA2MDIgVjAgSDQwMyBWNjAyIHYiK3QrIiB2MTcxNSBoMjYzIHY4NCBIMzE5elxuTU0zMTkgNjAyIFYwIEg0MDMgVjYwMiB2Iit0KyIgdjE3MTUgSDMxOXoiO2Nhc2UicmZsb29yIjpyZXR1cm4iTTMxOSA2MDIgVjAgSDQwMyBWNjAyIHYiK3QrIiB2MTc5OSBIMCB2LTg0IEgzMTl6XG5NTTMxOSA2MDIgVjAgSDQwMyBWNjAyIHYiK3QrIiB2MTcxNSBIMzE5eiI7Y2FzZSJsY2VpbCI6cmV0dXJuIk00MDMgMTc1OSBWODQgSDY2NiBWMCBIMzE5IFYxNzU5IHYiK3QrIiB2NjAyIGg4NHpcbk00MDMgMTc1OSBWMCBIMzE5IFYxNzU5IHYiK3QrIiB2NjAyIGg4NHoiO2Nhc2UicmNlaWwiOnJldHVybiJNMzQ3IDE3NTkgVjAgSDAgVjg0IEgyNjMgVjE3NTkgdiIrdCsiIHY2MDIgaDg0elxuTTM0NyAxNzU5IFYwIGgtODQgVjE3NTkgdiIrdCsiIHY2MDIgaDg0eiI7Y2FzZSJscGFyZW4iOnJldHVybiJNODYzLDljMCwtMiwtMiwtNSwtNiwtOWMwLDAsLTE3LDAsLTE3LDBjLTEyLjcsMCwtMTkuMywwLjMsLTIwLDFcbmMtNS4zLDUuMywtMTAuMywxMSwtMTUsMTdjLTI0Mi43LDI5NC43LC0zOTUuMyw2ODIsLTQ1OCwxMTYyYy0yMS4zLDE2My4zLC0zMy4zLDM0OSxcbi0zNiw1NTcgbDAsIisodCs4NCkrImMwLjIsNiwwLDI2LDAsNjBjMiwxNTkuMywxMCwzMTAuNywyNCw0NTRjNTMuMyw1MjgsMjEwLFxuOTQ5LjcsNDcwLDEyNjVjNC43LDYsOS43LDExLjcsMTUsMTdjMC43LDAuNyw3LDEsMTksMWMwLDAsMTgsMCwxOCwwYzQsLTQsNiwtNyw2LC05XG5jMCwtMi43LC0zLjMsLTguNywtMTAsLTE4Yy0xMzUuMywtMTkyLjcsLTIzNS41LC00MTQuMywtMzAwLjUsLTY2NWMtNjUsLTI1MC43LC0xMDIuNSxcbi01NDQuNywtMTEyLjUsLTg4MmMtMiwtMTA0LC0zLC0xNjcsLTMsLTE4OVxubDAsLSIrKHQrOTIpKyJjMCwtMTYyLjcsNS43LC0zMTQsMTcsLTQ1NGMyMC43LC0yNzIsNjMuNywtNTEzLDEyOSwtNzIzYzY1LjMsXG4tMjEwLDE1NS4zLC0zOTYuMywyNzAsLTU1OWM2LjcsLTkuMywxMCwtMTUuMywxMCwtMTh6IjtjYXNlInJwYXJlbiI6cmV0dXJuIk03NiwwYy0xNi43LDAsLTI1LDMsLTI1LDljMCwyLDIsNi4zLDYsMTNjMjEuMywyOC43LDQyLjMsNjAuMyxcbjYzLDk1Yzk2LjcsMTU2LjcsMTcyLjgsMzMyLjUsMjI4LjUsNTI3LjVjNTUuNywxOTUsOTIuOCw0MTYuNSwxMTEuNSw2NjQuNVxuYzExLjMsMTM5LjMsMTcsMjkwLjcsMTcsNDU0YzAsMjgsMS43LDQzLDMuMyw0NWwwLCIrKHQrOSkrIlxuYy0zLDQsLTMuMywxNi43LC0zLjMsMzhjMCwxNjIsLTUuNywzMTMuNywtMTcsNDU1Yy0xOC43LDI0OCwtNTUuOCw0NjkuMywtMTExLjUsNjY0XG5jLTU1LjcsMTk0LjcsLTEzMS44LDM3MC4zLC0yMjguNSw1MjdjLTIwLjcsMzQuNywtNDEuNyw2Ni4zLC02Myw5NWMtMiwzLjMsLTQsNywtNiwxMVxuYzAsNy4zLDUuNywxMSwxNywxMWMwLDAsMTEsMCwxMSwwYzkuMywwLDE0LjMsLTAuMywxNSwtMWM1LjMsLTUuMywxMC4zLC0xMSwxNSwtMTdcbmMyNDIuNywtMjk0LjcsMzk1LjMsLTY4MS43LDQ1OCwtMTE2MWMyMS4zLC0xNjQuNywzMy4zLC0zNTAuNywzNiwtNTU4XG5sMCwtIisodCsxNDQpKyJjLTIsLTE1OS4zLC0xMCwtMzEwLjcsLTI0LC00NTRjLTUzLjMsLTUyOCwtMjEwLC05NDkuNyxcbi00NzAsLTEyNjVjLTQuNywtNiwtOS43LC0xMS43LC0xNSwtMTdjLTAuNywtMC43LC02LjcsLTEsLTE4LC0xeiI7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoIlVua25vd24gc3RyZXRjaHkgZGVsaW1pdGVyLiIpfX0oaCxNYXRoLnJvdW5kKDFlMyplKSksbz1uZXcgJChoLHIpLHM9TihtLzFlMyksaT1OKHQvMWUzKSxsPW5ldyBfKFtvXSx7d2lkdGg6cyxoZWlnaHQ6aSx2aWV3Qm94OiIwIDAgIittKyIgIit0fSksYT1XZShbXSxbbF0sbik7YS5oZWlnaHQ9dC8xZTMsYS5zdHlsZS53aWR0aD1zLGEuc3R5bGUuaGVpZ2h0PWksQS5wdXNoKHt0eXBlOiJlbGVtIixlbGVtOmF9KX1lbHNle2lmKEEucHVzaChTcihjLHUsbykpLEEucHVzaChBciksbnVsbD09PWwpe2NvbnN0IGU9ay1kLXkrLjAxNjtBLnB1c2goTXIoYSxlLG4pKX1lbHNle2NvbnN0IGU9KGstZC15LXgpLzIrLjAxNjtBLnB1c2goTXIoYSxlLG4pKSxBLnB1c2goQXIpLEEucHVzaChTcihsLHUsbykpLEEucHVzaChBciksQS5wdXNoKE1yKGEsZSxuKSl9QS5wdXNoKEFyKSxBLnB1c2goU3IoaSx1LG8pKX1jb25zdCBUPW4uaGF2aW5nQmFzZVN0eWxlKFMuVEVYVCksQz1LZSh7cG9zaXRpb25UeXBlOiJib3R0b20iLHBvc2l0aW9uRGF0YTpNLGNoaWxkcmVuOkF9KTtyZXR1cm4gdnIoWWUoWyJkZWxpbXNpemluZyIsIm11bHQiXSxbQ10sVCksUy5URVhULG4scyl9LHFyPS4wOCxJcj1mdW5jdGlvbihlLHQscixuLG8pe2NvbnN0IHM9ZnVuY3Rpb24oZSx0LHIpe3QqPTFlMztsZXQgbj0iIjtzd2l0Y2goZSl7Y2FzZSJzcXJ0TWFpbiI6bj1mdW5jdGlvbihlLHQpe3JldHVybiJNOTUsIisoNjIyK2UrdCkrIlxuYy0yLjcsMCwtNy4xNywtMi43LC0xMy41LC04Yy01LjgsLTUuMywtOS41LC0xMCwtOS41LC0xNFxuYzAsLTIsMC4zLC0zLjMsMSwtNGMxLjMsLTIuNywyMy44MywtMjAuNyw2Ny41LC01NFxuYzQ0LjIsLTMzLjMsNjUuOCwtNTAuMyw2Ni41LC01MWMxLjMsLTEuMywzLC0yLDUsLTJjNC43LDAsOC43LDMuMywxMiwxMFxuczE3MywzNzgsMTczLDM3OGMwLjcsMCwzNS4zLC03MSwxMDQsLTIxM2M2OC43LC0xNDIsMTM3LjUsLTI4NSwyMDYuNSwtNDI5XG5jNjksLTE0NCwxMDQuNSwtMjE3LjcsMTA2LjUsLTIyMVxubCIrZS8yLjA3NSsiIC0iK2UrIlxuYzUuMywtOS4zLDEyLC0xNCwyMCwtMTRcbkg0MDAwMDB2IisoNDArZSkrIkg4NDUuMjcyNFxucy0yMjUuMjcyLDQ2NywtMjI1LjI3Miw0NjdzLTIzNSw0ODYsLTIzNSw0ODZjLTIuNyw0LjcsLTksNywtMTksN1xuYy02LDAsLTEwLC0xLC0xMiwtM3MtMTk0LC00MjIsLTE5NCwtNDIycy02NSw0NywtNjUsNDd6XG5NIisoODM0K2UpKyIgIit0KyJoNDAwMDAwdiIrKDQwK2UpKyJoLTQwMDAwMHoifSh0LEIpO2JyZWFrO2Nhc2Uic3FydFNpemUxIjpuPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIk0yNjMsIisoNjAxK2UrdCkrImMwLjcsMCwxOCwzOS43LDUyLDExOVxuYzM0LDc5LjMsNjguMTY3LDE1OC43LDEwMi41LDIzOGMzNC4zLDc5LjMsNTEuOCwxMTkuMyw1Mi41LDEyMFxuYzM0MCwtNzA0LjcsNTEwLjcsLTEwNjAuMyw1MTIsLTEwNjdcbmwiK2UvMi4wODQrIiAtIitlKyJcbmM0LjcsLTcuMywxMSwtMTEsMTksLTExXG5INDAwMDB2IisoNDArZSkrIkgxMDEyLjNcbnMtMjcxLjMsNTY3LC0yNzEuMyw1NjdjLTM4LjcsODAuNywtODQsMTc1LC0xMzYsMjgzYy01MiwxMDgsLTg5LjE2NywxODUuMywtMTExLjUsMjMyXG5jLTIyLjMsNDYuNywtMzMuOCw3MC4zLC0zNC41LDcxYy00LjcsNC43LC0xMi4zLDcsLTIzLDdzLTEyLC0xLC0xMiwtMVxucy0xMDksLTI1MywtMTA5LC0yNTNjLTcyLjcsLTE2OCwtMTA5LjMsLTI1MiwtMTEwLC0yNTJjLTEwLjcsOCwtMjIsMTYuNywtMzQsMjZcbmMtMjIsMTcuMywtMzMuMywyNiwtMzQsMjZzLTI2LC0yNiwtMjYsLTI2czc2LC01OSw3NiwtNTlzNzYsLTYwLDc2LC02MHpcbk0iKygxMDAxK2UpKyIgIit0KyJoNDAwMDAwdiIrKDQwK2UpKyJoLTQwMDAwMHoifSh0LEIpO2JyZWFrO2Nhc2Uic3FydFNpemUyIjpuPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIk05ODMgIisoMTArZSt0KSsiXG5sIitlLzMuMTMrIiAtIitlKyJcbmM0LC02LjcsMTAsLTEwLDE4LC0xMCBINDAwMDAwdiIrKDQwK2UpKyJcbkgxMDEzLjFzLTgzLjQsMjY4LC0yNjQuMSw4NDBjLTE4MC43LDU3MiwtMjc3LDg3Ni4zLC0yODksOTEzYy00LjcsNC43LC0xMi43LDcsLTI0LDdcbnMtMTIsMCwtMTIsMGMtMS4zLC0zLjMsLTMuNywtMTEuNywtNywtMjVjLTM1LjMsLTEyNS4zLC0xMDYuNywtMzczLjMsLTIxNCwtNzQ0XG5jLTEwLDEyLC0yMSwyNSwtMzMsMzlzLTMyLDM5LC0zMiwzOWMtNiwtNS4zLC0xNSwtMTQsLTI3LC0yNnMyNSwtMzAsMjUsLTMwXG5jMjYuNywtMzIuNyw1MiwtNjMsNzYsLTkxczUyLC02MCw1MiwtNjBzMjA4LDcyMiwyMDgsNzIyXG5jNTYsLTE3NS4zLDEyNi4zLC0zOTcuMywyMTEsLTY2NmM4NC43LC0yNjguNywxNTMuOCwtNDg4LjIsMjA3LjUsLTY1OC41XG5jNTMuNywtMTcwLjMsODQuNSwtMjY2LjgsOTIuNSwtMjg5LjV6XG5NIisoMTAwMStlKSsiICIrdCsiaDQwMDAwMHYiKyg0MCtlKSsiaC00MDAwMDB6In0odCxCKTticmVhaztjYXNlInNxcnRTaXplMyI6bj1mdW5jdGlvbihlLHQpe3JldHVybiJNNDI0LCIrKDIzOTgrZSt0KSsiXG5jLTEuMywtMC43LC0zOC41LC0xNzIsLTExMS41LC01MTRjLTczLC0zNDIsLTEwOS44LC01MTMuMywtMTEwLjUsLTUxNFxuYzAsLTIsLTEwLjcsMTQuMywtMzIsNDljLTQuNyw3LjMsLTkuOCwxNS43LC0xNS41LDI1Yy01LjcsOS4zLC05LjgsMTYsLTEyLjUsMjBcbnMtNSw3LC01LDdjLTQsLTMuMywtOC4zLC03LjcsLTEzLC0xM3MtMTMsLTEzLC0xMywtMTNzNzYsLTEyMiw3NiwtMTIyczc3LC0xMjEsNzcsLTEyMVxuczIwOSw5NjgsMjA5LDk2OGMwLC0yLDg0LjcsLTM2MS43LDI1NCwtMTA3OWMxNjkuMywtNzE3LjMsMjU0LjcsLTEwNzcuNywyNTYsLTEwODFcbmwiK2UvNC4yMjMrIiAtIitlKyJjNCwtNi43LDEwLC0xMCwxOCwtMTAgSDQwMDAwMFxudiIrKDQwK2UpKyJIMTAxNC42XG5zLTg3LjMsMzc4LjcsLTI3Mi42LDExNjZjLTE4NS4zLDc4Ny4zLC0yNzkuMywxMTgyLjMsLTI4MiwxMTg1XG5jLTIsNiwtMTAsOSwtMjQsOVxuYy04LDAsLTEyLC0wLjcsLTEyLC0yeiBNIisoMTAwMStlKSsiICIrdCsiXG5oNDAwMDAwdiIrKDQwK2UpKyJoLTQwMDAwMHoifSh0LEIpO2JyZWFrO2Nhc2Uic3FydFNpemU0IjpuPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIk00NzMsIisoMjcxMytlK3QpKyJcbmMzMzkuMywtMTc5OS4zLDUwOS4zLC0yNzAwLDUxMCwtMjcwMiBsIitlLzUuMjk4KyIgLSIrZSsiXG5jMy4zLC03LjMsOS4zLC0xMSwxOCwtMTEgSDQwMDAwMHYiKyg0MCtlKSsiSDEwMTcuN1xucy05MC41LDQ3OCwtMjc2LjIsMTQ2NmMtMTg1LjcsOTg4LC0yNzkuNSwxNDgzLC0yODEuNSwxNDg1Yy0yLDYsLTEwLDksLTI0LDlcbmMtOCwwLC0xMiwtMC43LC0xMiwtMmMwLC0xLjMsLTUuMywtMzIsLTE2LC05MmMtNTAuNywtMjkzLjMsLTExOS43LC02OTMuMywtMjA3LC0xMjAwXG5jMCwtMS4zLC01LjMsOC43LC0xNiwzMGMtMTAuNywyMS4zLC0yMS4zLDQyLjcsLTMyLDY0cy0xNiwzMywtMTYsMzNzLTI2LC0yNiwtMjYsLTI2XG5zNzYsLTE1Myw3NiwtMTUzczc3LC0xNTEsNzcsLTE1MWMwLjcsMC43LDM1LjcsMjAyLDEwNSw2MDRjNjcuMyw0MDAuNywxMDIsNjAyLjcsMTA0LFxuNjA2ek0iKygxMDAxK2UpKyIgIit0KyJoNDAwMDAwdiIrKDQwK2UpKyJIMTAxNy43eiJ9KHQsQik7YnJlYWs7Y2FzZSJzcXJ0VGFsbCI6bj1mdW5jdGlvbihlLHQscil7cmV0dXJuIk03MDIgIisoZSt0KSsiSDQwMDAwMCIrKDQwK2UpKyJcbkg3NDJ2Iisoci01NC10LWUpKyJsLTQgNC00IDRjLS42NjcuNyAtMiAxLjUtNCAyLjVzLTQuMTY3IDEuODMzLTYuNSAyLjUtNS41IDEtOS41IDFcbmgtMTJsLTI4LTg0Yy0xNi42NjctNTItOTYuNjY3IC0yOTQuMzMzLTI0MC03MjdsLTIxMiAtNjQzIC04NSAxNzBcbmMtNC0zLjMzMy04LjMzMy03LjY2Ny0xMyAtMTNsLTEzLTEzbDc3LTE1NSA3Ny0xNTZjNjYgMTk5LjMzMyAxMzkgNDE5LjY2N1xuMjE5IDY2MSBsMjE4IDY2MXpNNzAyICIrdCsiSDQwMDAwMHYiKyg0MCtlKSsiSDc0MnoifSh0LEIscil9cmV0dXJuIG59KGUsbixyKSxpPW5ldyAkKGUscyksbD1uZXcgXyhbaV0se3dpZHRoOiI0MDBlbSIsaGVpZ2h0Ok4odCksdmlld0JveDoiMCAwIDQwMDAwMCAiK3IscHJlc2VydmVBc3BlY3RSYXRpbzoieE1pbllNaW4gc2xpY2UifSk7cmV0dXJuIFdlKFsiaGlkZS10YWlsIl0sW2xdLG8pfSxScj1uZXcgU2V0KFsiKCIsIlxcbHBhcmVuIiwiKSIsIlxccnBhcmVuIiwiWyIsIlxcbGJyYWNrIiwiXSIsIlxccmJyYWNrIiwiXFx7IiwiXFxsYnJhY2UiLCJcXH0iLCJcXHJicmFjZSIsIlxcbGZsb29yIiwiXFxyZmxvb3IiLCJcdTIzMGEiLCJcdTIzMGIiLCJcXGxjZWlsIiwiXFxyY2VpbCIsIlx1MjMwOCIsIlx1MjMwOSIsIlxcc3VyZCJdKSxIcj1uZXcgU2V0KFsiXFx1cGFycm93IiwiXFxkb3duYXJyb3ciLCJcXHVwZG93bmFycm93IiwiXFxVcGFycm93IiwiXFxEb3duYXJyb3ciLCJcXFVwZG93bmFycm93IiwifCIsIlxcfCIsIlxcdmVydCIsIlxcVmVydCIsIlxcbHZlcnQiLCJcXHJ2ZXJ0IiwiXFxsVmVydCIsIlxcclZlcnQiLCJcXGxncm91cCIsIlxccmdyb3VwIiwiXHUyN2VlIiwiXHUyN2VmIiwiXFxsbW91c3RhY2hlIiwiXFxybW91c3RhY2hlIiwiXHUyM2IwIiwiXHUyM2IxIl0pLEVyPW5ldyBTZXQoWyI8IiwiPiIsIlxcbGFuZ2xlIiwiXFxyYW5nbGUiLCIvIiwiXFxiYWNrc2xhc2giLCJcXGx0IiwiXFxndCJdKSxPcj1bMCwxLjIsMS44LDIuNCwzXSxOcj1mdW5jdGlvbihlLHQscixvLHMpe2lmKCI8Ij09PWV8fCJcXGx0Ij09PWV8fCJcdTI3ZTgiPT09ZT9lPSJcXGxhbmdsZSI6Ij4iIT09ZSYmIlxcZ3QiIT09ZSYmIlx1MjdlOSIhPT1lfHwoZT0iXFxyYW5nbGUiKSxSci5oYXMoZSl8fEVyLmhhcyhlKSlyZXR1cm4genIoZSx0LCExLHIsbyxzKTtpZihIci5oYXMoZSkpcmV0dXJuIEJyKGUsT3JbdF0sITEscixvLHMpO3Rocm93IG5ldyBuKCJJbGxlZ2FsIGRlbGltaXRlcjogJyIrZSsiJyIpfSxEcj1be3R5cGU6InNtYWxsIixzdHlsZTpTLlNDUklQVFNDUklQVH0se3R5cGU6InNtYWxsIixzdHlsZTpTLlNDUklQVH0se3R5cGU6InNtYWxsIixzdHlsZTpTLlRFWFR9LHt0eXBlOiJsYXJnZSIsc2l6ZToxfSx7dHlwZToibGFyZ2UiLHNpemU6Mn0se3R5cGU6ImxhcmdlIixzaXplOjN9LHt0eXBlOiJsYXJnZSIsc2l6ZTo0fV0sTHI9W3t0eXBlOiJzbWFsbCIsc3R5bGU6Uy5TQ1JJUFRTQ1JJUFR9LHt0eXBlOiJzbWFsbCIsc3R5bGU6Uy5TQ1JJUFR9LHt0eXBlOiJzbWFsbCIsc3R5bGU6Uy5URVhUfSx7dHlwZToic3RhY2sifV0sRnI9W3t0eXBlOiJzbWFsbCIsc3R5bGU6Uy5TQ1JJUFRTQ1JJUFR9LHt0eXBlOiJzbWFsbCIsc3R5bGU6Uy5TQ1JJUFR9LHt0eXBlOiJzbWFsbCIsc3R5bGU6Uy5URVhUfSx7dHlwZToibGFyZ2UiLHNpemU6MX0se3R5cGU6ImxhcmdlIixzaXplOjJ9LHt0eXBlOiJsYXJnZSIsc2l6ZTozfSx7dHlwZToibGFyZ2UiLHNpemU6NH0se3R5cGU6InN0YWNrIn1dLFByPWZ1bmN0aW9uKGUpe2lmKCJzbWFsbCI9PT1lLnR5cGUpcmV0dXJuIk1haW4tUmVndWxhciI7aWYoImxhcmdlIj09PWUudHlwZSlyZXR1cm4iU2l6ZSIrZS5zaXplKyItUmVndWxhciI7aWYoInN0YWNrIj09PWUudHlwZSlyZXR1cm4iU2l6ZTQtUmVndWxhciI7e2NvbnN0IHQ9ZS50eXBlO3Rocm93IG5ldyBFcnJvcigiQWRkIHN1cHBvcnQgZm9yIGRlbGltIHR5cGUgJyIrdCsiJyBoZXJlLiIpfX0sVnI9ZnVuY3Rpb24oZSx0LHIsbil7Zm9yKGxldCBvPU1hdGgubWluKDIsMy1uLnN0eWxlLnNpemUpO288ci5sZW5ndGg7bysrKXtjb25zdCBzPXJbb107aWYoInN0YWNrIj09PXMudHlwZSlicmVhaztjb25zdCBpPXdyKGUsUHIocyksIm1hdGgiKTtsZXQgbD1pLmhlaWdodCtpLmRlcHRoO2lmKCJzbWFsbCI9PT1zLnR5cGUpe2wqPW4uaGF2aW5nQmFzZVN0eWxlKHMuc3R5bGUpLnNpemVNdWx0aXBsaWVyfWlmKGw+dClyZXR1cm4gc31yZXR1cm4gcltyLmxlbmd0aC0xXX0sR3I9ZnVuY3Rpb24oZSx0LHIsbixvLHMpe2xldCBpOyI8Ij09PWV8fCJcXGx0Ij09PWV8fCJcdTI3ZTgiPT09ZT9lPSJcXGxhbmdsZSI6Ij4iIT09ZSYmIlxcZ3QiIT09ZSYmIlx1MjdlOSIhPT1lfHwoZT0iXFxyYW5nbGUiKSxpPUVyLmhhcyhlKT9EcjpSci5oYXMoZSk/RnI6THI7Y29uc3QgbD1WcihlLHQsaSxuKTtyZXR1cm4ic21hbGwiPT09bC50eXBlP2Z1bmN0aW9uKGUsdCxyLG4sbyxzKXtjb25zdCBpPVBlKGUsIk1haW4tUmVndWxhciIsbyxuKSxsPXZyKGksdCxuLHMpO3JldHVybiByJiZrcihsLG4sdCksbH0oZSxsLnN0eWxlLHIsbixvLHMpOiJsYXJnZSI9PT1sLnR5cGU/enIoZSxsLnNpemUscixuLG8scyk6QnIoZSx0LHIsbixvLHMpfSxVcj1mdW5jdGlvbihlLHQscixuLG8scyl7Y29uc3QgaT1uLmZvbnRNZXRyaWNzKCkuYXhpc0hlaWdodCpuLnNpemVNdWx0aXBsaWVyLGw9NS9uLmZvbnRNZXRyaWNzKCkucHRQZXJFbSxhPU1hdGgubWF4KHQtaSxyK2kpLGM9TWF0aC5tYXgoYS81MDAqOTAxLDIqYS1sKTtyZXR1cm4gR3IoZSxjLCEwLG4sbyxzKX0sanI9eyJcXGJpZ2wiOnttY2xhc3M6Im1vcGVuIixzaXplOjF9LCJcXEJpZ2wiOnttY2xhc3M6Im1vcGVuIixzaXplOjJ9LCJcXGJpZ2dsIjp7bWNsYXNzOiJtb3BlbiIsc2l6ZTozfSwiXFxCaWdnbCI6e21jbGFzczoibW9wZW4iLHNpemU6NH0sIlxcYmlnciI6e21jbGFzczoibWNsb3NlIixzaXplOjF9LCJcXEJpZ3IiOnttY2xhc3M6Im1jbG9zZSIsc2l6ZToyfSwiXFxiaWdnciI6e21jbGFzczoibWNsb3NlIixzaXplOjN9LCJcXEJpZ2dyIjp7bWNsYXNzOiJtY2xvc2UiLHNpemU6NH0sIlxcYmlnbSI6e21jbGFzczoibXJlbCIsc2l6ZToxfSwiXFxCaWdtIjp7bWNsYXNzOiJtcmVsIixzaXplOjJ9LCJcXGJpZ2dtIjp7bWNsYXNzOiJtcmVsIixzaXplOjN9LCJcXEJpZ2dtIjp7bWNsYXNzOiJtcmVsIixzaXplOjR9LCJcXGJpZyI6e21jbGFzczoibW9yZCIsc2l6ZToxfSwiXFxCaWciOnttY2xhc3M6Im1vcmQiLHNpemU6Mn0sIlxcYmlnZyI6e21jbGFzczoibW9yZCIsc2l6ZTozfSwiXFxCaWdnIjp7bWNsYXNzOiJtb3JkIixzaXplOjR9fSxYcj1uZXcgU2V0KFsiKCIsIlxcbHBhcmVuIiwiKSIsIlxccnBhcmVuIiwiWyIsIlxcbGJyYWNrIiwiXSIsIlxccmJyYWNrIiwiXFx7IiwiXFxsYnJhY2UiLCJcXH0iLCJcXHJicmFjZSIsIlxcbGZsb29yIiwiXFxyZmxvb3IiLCJcdTIzMGEiLCJcdTIzMGIiLCJcXGxjZWlsIiwiXFxyY2VpbCIsIlx1MjMwOCIsIlx1MjMwOSIsIjwiLCI+IiwiXFxsYW5nbGUiLCJcdTI3ZTgiLCJcXHJhbmdsZSIsIlx1MjdlOSIsIlxcbHQiLCJcXGd0IiwiXFxsdmVydCIsIlxccnZlcnQiLCJcXGxWZXJ0IiwiXFxyVmVydCIsIlxcbGdyb3VwIiwiXFxyZ3JvdXAiLCJcdTI3ZWUiLCJcdTI3ZWYiLCJcXGxtb3VzdGFjaGUiLCJcXHJtb3VzdGFjaGUiLCJcdTIzYjAiLCJcdTIzYjEiLCIvIiwiXFxiYWNrc2xhc2giLCJ8IiwiXFx2ZXJ0IiwiXFx8IiwiXFxWZXJ0IiwiXFx1cGFycm93IiwiXFxVcGFycm93IiwiXFxkb3duYXJyb3ciLCJcXERvd25hcnJvdyIsIlxcdXBkb3duYXJyb3ciLCJcXFVwZG93bmFycm93IiwiLiJdKTtmdW5jdGlvbiBZcihlKXtyZXR1cm4iaXNNaWRkbGUiaW4gZX1mdW5jdGlvbiBXcihlLHQpe2NvbnN0IHI9aXIoZSk7aWYociYmWHIuaGFzKHIudGV4dCkpcmV0dXJuIHI7dGhyb3cgbmV3IG4ocj8iSW52YWxpZCBkZWxpbWl0ZXIgJyIrci50ZXh0KyInIGFmdGVyICciK3QuZnVuY05hbWUrIiciOiJJbnZhbGlkIGRlbGltaXRlciB0eXBlICciK2UudHlwZSsiJyIsZSl9ZnVuY3Rpb24gX3IoZSl7aWYoIWUuYm9keSl0aHJvdyBuZXcgRXJyb3IoIkJ1ZzogVGhlIGxlZnRyaWdodCBQYXJzZU5vZGUgd2Fzbid0IGZ1bGx5IHBhcnNlZC4iKX1tdCh7dHlwZToiZGVsaW1zaXppbmciLG5hbWVzOlsiXFxiaWdsIiwiXFxCaWdsIiwiXFxiaWdnbCIsIlxcQmlnZ2wiLCJcXGJpZ3IiLCJcXEJpZ3IiLCJcXGJpZ2dyIiwiXFxCaWdnciIsIlxcYmlnbSIsIlxcQmlnbSIsIlxcYmlnZ20iLCJcXEJpZ2dtIiwiXFxiaWciLCJcXEJpZyIsIlxcYmlnZyIsIlxcQmlnZyJdLG51bUFyZ3M6MSxhcmdUeXBlczpbInByaW1pdGl2ZSJdLGhhbmRsZXI6KGUsdCk9Pntjb25zdCByPVdyKHRbMF0sZSk7cmV0dXJue3R5cGU6ImRlbGltc2l6aW5nIixtb2RlOmUucGFyc2VyLm1vZGUsc2l6ZTpqcltlLmZ1bmNOYW1lXS5zaXplLG1jbGFzczpqcltlLmZ1bmNOYW1lXS5tY2xhc3MsZGVsaW06ci50ZXh0fX0saHRtbEJ1aWxkZXI6KGUsdCk9PiIuIj09PWUuZGVsaW0/WWUoW2UubWNsYXNzXSk6TnIoZS5kZWxpbSxlLnNpemUsdCxlLm1vZGUsW2UubWNsYXNzXSksbWF0aG1sQnVpbGRlcjplPT57Y29uc3QgdD1bXTsiLiIhPT1lLmRlbGltJiZ0LnB1c2goRXQoZS5kZWxpbSxlLm1vZGUpKTtjb25zdCByPW5ldyBCdCgibW8iLHQpOyJtb3BlbiI9PT1lLm1jbGFzc3x8Im1jbG9zZSI9PT1lLm1jbGFzcz9yLnNldEF0dHJpYnV0ZSgiZmVuY2UiLCJ0cnVlIik6ci5zZXRBdHRyaWJ1dGUoImZlbmNlIiwiZmFsc2UiKSxyLnNldEF0dHJpYnV0ZSgic3RyZXRjaHkiLCJ0cnVlIik7Y29uc3Qgbj1OKE9yW2Uuc2l6ZV0pO3JldHVybiByLnNldEF0dHJpYnV0ZSgibWluc2l6ZSIsbiksci5zZXRBdHRyaWJ1dGUoIm1heHNpemUiLG4pLHJ9fSksbXQoe3R5cGU6ImxlZnRyaWdodC1yaWdodCIsbmFtZXM6WyJcXHJpZ2h0Il0sbnVtQXJnczoxLHByaW1pdGl2ZTohMCxoYW5kbGVyOihlLHQpPT57Y29uc3Qgcj1lLnBhcnNlci5ndWxsZXQubWFjcm9zLmdldCgiXFxjdXJyZW50QGNvbG9yIik7aWYociYmInN0cmluZyIhPXR5cGVvZiByKXRocm93IG5ldyBuKCJcXGN1cnJlbnRAY29sb3Igc2V0IHRvIG5vbi1zdHJpbmcgaW4gXFxyaWdodCIpO3JldHVybnt0eXBlOiJsZWZ0cmlnaHQtcmlnaHQiLG1vZGU6ZS5wYXJzZXIubW9kZSxkZWxpbTpXcih0WzBdLGUpLnRleHQsY29sb3I6cn19fSksbXQoe3R5cGU6ImxlZnRyaWdodCIsbmFtZXM6WyJcXGxlZnQiXSxudW1BcmdzOjEscHJpbWl0aXZlOiEwLGhhbmRsZXI6KGUsdCk9Pntjb25zdCByPVdyKHRbMF0sZSksbj1lLnBhcnNlcjsrK24ubGVmdHJpZ2h0RGVwdGg7Y29uc3Qgbz1uLnBhcnNlRXhwcmVzc2lvbighMSk7LS1uLmxlZnRyaWdodERlcHRoLG4uZXhwZWN0KCJcXHJpZ2h0IiwhMSk7Y29uc3Qgcz1vcihuLnBhcnNlRnVuY3Rpb24oKSwibGVmdHJpZ2h0LXJpZ2h0Iik7cmV0dXJue3R5cGU6ImxlZnRyaWdodCIsbW9kZTpuLm1vZGUsYm9keTpvLGxlZnQ6ci50ZXh0LHJpZ2h0OnMuZGVsaW0scmlnaHRDb2xvcjpzLmNvbG9yfX0saHRtbEJ1aWxkZXI6KGUsdCk9PntfcihlKTtjb25zdCByPXh0KGUuYm9keSx0LCEwLFsibW9wZW4iLCJtY2xvc2UiXSk7bGV0IG4sbyxzPTAsaT0wLGw9ITE7Zm9yKGxldCBlPTA7ZTxyLmxlbmd0aDtlKyspe1lyKHJbZV0pP2w9ITA6KHM9TWF0aC5tYXgocltlXS5oZWlnaHQscyksaT1NYXRoLm1heChyW2VdLmRlcHRoLGkpKX1pZihzKj10LnNpemVNdWx0aXBsaWVyLGkqPXQuc2l6ZU11bHRpcGxpZXIsbj0iLiI9PT1lLmxlZnQ/U3QodCxbIm1vcGVuIl0pOlVyKGUubGVmdCxzLGksdCxlLm1vZGUsWyJtb3BlbiJdKSxyLnVuc2hpZnQobiksbClmb3IobGV0IHQ9MTt0PHIubGVuZ3RoO3QrKyl7Y29uc3Qgbj1yW3RdO2lmKFlyKG4pKXtjb25zdCBvPW4uaXNNaWRkbGU7clt0XT1VcihvLmRlbGltLHMsaSxvLm9wdGlvbnMsZS5tb2RlLFtdKX19aWYoIi4iPT09ZS5yaWdodClvPVN0KHQsWyJtY2xvc2UiXSk7ZWxzZXtjb25zdCByPWUucmlnaHRDb2xvcj90LndpdGhDb2xvcihlLnJpZ2h0Q29sb3IpOnQ7bz1VcihlLnJpZ2h0LHMsaSxyLGUubW9kZSxbIm1jbG9zZSJdKX1yZXR1cm4gci5wdXNoKG8pLFllKFsibWlubmVyIl0scix0KX0sbWF0aG1sQnVpbGRlcjooZSx0KT0+e19yKGUpO2NvbnN0IHI9RnQoZS5ib2R5LHQpO2lmKCIuIiE9PWUubGVmdCl7Y29uc3QgdD1uZXcgQnQoIm1vIixbRXQoZS5sZWZ0LGUubW9kZSldKTt0LnNldEF0dHJpYnV0ZSgiZmVuY2UiLCJ0cnVlIiksci51bnNoaWZ0KHQpfWlmKCIuIiE9PWUucmlnaHQpe2NvbnN0IHQ9bmV3IEJ0KCJtbyIsW0V0KGUucmlnaHQsZS5tb2RlKV0pO3Quc2V0QXR0cmlidXRlKCJmZW5jZSIsInRydWUiKSxlLnJpZ2h0Q29sb3ImJnQuc2V0QXR0cmlidXRlKCJtYXRoY29sb3IiLGUucmlnaHRDb2xvciksci5wdXNoKHQpfXJldHVybiBPdChyKX19KSxtdCh7dHlwZToibWlkZGxlIixuYW1lczpbIlxcbWlkZGxlIl0sbnVtQXJnczoxLHByaW1pdGl2ZTohMCxoYW5kbGVyOihlLHQpPT57Y29uc3Qgcj1Xcih0WzBdLGUpO2lmKCFlLnBhcnNlci5sZWZ0cmlnaHREZXB0aCl0aHJvdyBuZXcgbigiXFxtaWRkbGUgd2l0aG91dCBwcmVjZWRpbmcgXFxsZWZ0IixyKTtyZXR1cm57dHlwZToibWlkZGxlIixtb2RlOmUucGFyc2VyLm1vZGUsZGVsaW06ci50ZXh0fX0saHRtbEJ1aWxkZXI6KGUsdCk9PntsZXQgcjtyZXR1cm4iLiI9PT1lLmRlbGltP3I9U3QodCxbXSk6KHI9TnIoZS5kZWxpbSwxLHQsZS5tb2RlLFtdKSxyLmlzTWlkZGxlPXtkZWxpbTplLmRlbGltLG9wdGlvbnM6dH0pLHJ9LG1hdGhtbEJ1aWxkZXI6KGUsdCk9Pntjb25zdCByPSJcXHZlcnQiPT09ZS5kZWxpbXx8InwiPT09ZS5kZWxpbT9FdCgifCIsInRleHQiKTpFdChlLmRlbGltLGUubW9kZSksbj1uZXcgQnQoIm1vIixbcl0pO3JldHVybiBuLnNldEF0dHJpYnV0ZSgiZmVuY2UiLCJ0cnVlIiksbi5zZXRBdHRyaWJ1dGUoImxzcGFjZSIsIjAuMDVlbSIpLG4uc2V0QXR0cmlidXRlKCJyc3BhY2UiLCIwLjA1ZW0iKSxufX0pO210KHt0eXBlOiJlbmNsb3NlIixuYW1lczpbIlxcY29sb3Jib3giXSxudW1BcmdzOjIsYWxsb3dlZEluVGV4dDohMCxhcmdUeXBlczpbImNvbG9yIiwiaGJveCJdLGhhbmRsZXIoZSx0LHIpe2xldCBuPWUucGFyc2VyLG89ZS5mdW5jTmFtZTtjb25zdCBzPW9yKHRbMF0sImNvbG9yLXRva2VuIikuY29sb3IsaT10WzFdO3JldHVybnt0eXBlOiJlbmNsb3NlIixtb2RlOm4ubW9kZSxsYWJlbDpvLGJhY2tncm91bmRDb2xvcjpzLGJvZHk6aX19LGh0bWxCdWlsZGVyOihlLHQpPT57Y29uc3Qgcj1aZShNdChlLmJvZHksdCksdCksbj1lLmxhYmVsLnNsaWNlKDEpO2xldCBvLHMsaT10LnNpemVNdWx0aXBsaWVyO2NvbnN0IGw9bShlLmJvZHkpO2lmKCJzb3V0Ij09PW4pbz1ZZShbImthdGV4LXN0cmV0Y2h5Iiwia2F0ZXgtc291dCJdKSxvLmhlaWdodD10LmZvbnRNZXRyaWNzKCkuZGVmYXVsdFJ1bGVUaGlja25lc3MvaSxzPS0uNSp0LmZvbnRNZXRyaWNzKCkueEhlaWdodDtlbHNlIGlmKCJwaGFzZSI9PT1uKXtjb25zdCBlPU8oe251bWJlcjouNix1bml0OiJwdCJ9LHQpLG49Tyh7bnVtYmVyOi4zNSx1bml0OiJleCJ9LHQpO2kvPXQuaGF2aW5nQmFzZVNpemluZygpLnNpemVNdWx0aXBsaWVyO2NvbnN0IGw9ci5oZWlnaHQrci5kZXB0aCtlK247ci5zdHlsZS5wYWRkaW5nTGVmdD1OKGwvMitlKTtjb25zdCBjPU1hdGguZmxvb3IoMWUzKmwqaSksaD0iTTQwMDAwMCAiKyhhPWMpKyIgSDAgTCIrYS8yKyIgMCBsNjUgNDUgTDE0NSAiKyhhLTgwKSsiIEg0MDAwMDB6IixtPW5ldyBfKFtuZXcgJCgicGhhc2UiLGgpXSx7d2lkdGg6IjQwMGVtIixoZWlnaHQ6TihjLzFlMyksdmlld0JveDoiMCAwIDQwMDAwMCAiK2MscHJlc2VydmVBc3BlY3RSYXRpbzoieE1pbllNaW4gc2xpY2UifSk7bz1XZShbImhpZGUtdGFpbCJdLFttXSx0KSxvLnN0eWxlLmhlaWdodD1OKGwpLHM9ci5kZXB0aCtlK259ZWxzZXtsZXQgaSxhOy9jYW5jZWwvLnRlc3Qobik/bHx8ci5jbGFzc2VzLnB1c2goImNhbmNlbC1wYWQiKToiYW5nbCI9PT1uP3IuY2xhc3Nlcy5wdXNoKCJhbmdscGFkIik6ci5jbGFzc2VzLnB1c2goImJveHBhZCIpO2xldCBjPTA7L2JveC8udGVzdChuKT8oYz1NYXRoLm1heCh0LmZvbnRNZXRyaWNzKCkuZmJveHJ1bGUsdC5taW5SdWxlVGhpY2tuZXNzKSxpPXQuZm9udE1ldHJpY3MoKS5mYm94c2VwKygiY29sb3Jib3giPT09bj8wOmMpLGE9aSk6ImFuZ2wiPT09bj8oYz1NYXRoLm1heCh0LmZvbnRNZXRyaWNzKCkuZGVmYXVsdFJ1bGVUaGlja25lc3MsdC5taW5SdWxlVGhpY2tuZXNzKSxpPTQqYyxhPU1hdGgubWF4KDAsLjI1LXIuZGVwdGgpKTooaT1sPy4yOjAsYT1pKSxvPWZ1bmN0aW9uKGUsdCxyLG4sbyl7bGV0IHM7Y29uc3QgaT1lLmhlaWdodCtlLmRlcHRoK3IrbjtpZigvZmJveHxjb2xvcnxhbmdsLy50ZXN0KHQpKXtpZihzPVllKFsia2F0ZXgtc3RyZXRjaHkiLHRdLFtdLG8pLCJmYm94Ij09PXQpe2NvbnN0IGU9by5jb2xvciYmby5nZXRDb2xvcigpO2UmJihzLnN0eWxlLmJvcmRlckNvbG9yPWUpfX1lbHNle2NvbnN0IGU9W107L15bYnhdY2FuY2VsJC8udGVzdCh0KSYmZS5wdXNoKG5ldyBaKHt4MToiMCIseTE6IjAiLHgyOiIxMDAlIix5MjoiMTAwJSIsInN0cm9rZS13aWR0aCI6IjAuMDQ2ZW0ifSkpLC9eeD9jYW5jZWwkLy50ZXN0KHQpJiZlLnB1c2gobmV3IFooe3gxOiIwIix5MToiMTAwJSIseDI6IjEwMCUiLHkyOiIwIiwic3Ryb2tlLXdpZHRoIjoiMC4wNDZlbSJ9KSk7Y29uc3Qgcj1uZXcgXyhlLHt3aWR0aDoiMTAwJSIsaGVpZ2h0Ok4oaSl9KTtzPVdlKFtdLFtyXSxvKX1yZXR1cm4gcy5oZWlnaHQ9aSxzLnN0eWxlLmhlaWdodD1OKGkpLHN9KHIsbixpLGEsdCksL2Zib3h8Ym94ZWR8ZmNvbG9yYm94Ly50ZXN0KG4pPyhvLnN0eWxlLmJvcmRlclN0eWxlPSJzb2xpZCIsby5zdHlsZS5ib3JkZXJXaWR0aD1OKGMpKToiYW5nbCI9PT1uJiYuMDQ5IT09YyYmKG8uc3R5bGUuYm9yZGVyVG9wV2lkdGg9TihjKSxvLnN0eWxlLmJvcmRlclJpZ2h0V2lkdGg9TihjKSkscz1yLmRlcHRoK2EsZS5iYWNrZ3JvdW5kQ29sb3ImJihvLnN0eWxlLmJhY2tncm91bmRDb2xvcj1lLmJhY2tncm91bmRDb2xvcixlLmJvcmRlckNvbG9yJiYoby5zdHlsZS5ib3JkZXJDb2xvcj1lLmJvcmRlckNvbG9yKSl9dmFyIGE7bGV0IGM7aWYoZS5iYWNrZ3JvdW5kQ29sb3IpYz1LZSh7cG9zaXRpb25UeXBlOiJpbmRpdmlkdWFsU2hpZnQiLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTpvLHNoaWZ0OnN9LHt0eXBlOiJlbGVtIixlbGVtOnIsc2hpZnQ6MH1dfSk7ZWxzZXtjb25zdCBlPS9jYW5jZWx8cGhhc2UvLnRlc3Qobik/WyJzdmctYWxpZ24iXTpbXTtjPUtlKHtwb3NpdGlvblR5cGU6ImluZGl2aWR1YWxTaGlmdCIsY2hpbGRyZW46W3t0eXBlOiJlbGVtIixlbGVtOnIsc2hpZnQ6MH0se3R5cGU6ImVsZW0iLGVsZW06byxzaGlmdDpzLHdyYXBwZXJDbGFzc2VzOmV9XX0pfXJldHVybi9jYW5jZWwvLnRlc3QobikmJihjLmhlaWdodD1yLmhlaWdodCxjLmRlcHRoPXIuZGVwdGgpLC9jYW5jZWwvLnRlc3QobikmJiFsP1llKFsibW9yZCIsImNhbmNlbC1sYXAiXSxbY10sdCk6WWUoWyJtb3JkIl0sW2NdLHQpfSxtYXRobWxCdWlsZGVyOihlLHQpPT57bGV0IHI7Y29uc3Qgbj1uZXcgQnQoZS5sYWJlbC5pbmNsdWRlcygiY29sb3Jib3giKT8ibXBhZGRlZCI6Im1lbmNsb3NlIixbVnQoZS5ib2R5LHQpXSk7c3dpdGNoKGUubGFiZWwpe2Nhc2UiXFxjYW5jZWwiOm4uc2V0QXR0cmlidXRlKCJub3RhdGlvbiIsInVwZGlhZ29uYWxzdHJpa2UiKTticmVhaztjYXNlIlxcYmNhbmNlbCI6bi5zZXRBdHRyaWJ1dGUoIm5vdGF0aW9uIiwiZG93bmRpYWdvbmFsc3RyaWtlIik7YnJlYWs7Y2FzZSJcXHBoYXNlIjpuLnNldEF0dHJpYnV0ZSgibm90YXRpb24iLCJwaGFzb3JhbmdsZSIpO2JyZWFrO2Nhc2UiXFxzb3V0IjpuLnNldEF0dHJpYnV0ZSgibm90YXRpb24iLCJob3Jpem9udGFsc3RyaWtlIik7YnJlYWs7Y2FzZSJcXGZib3giOm4uc2V0QXR0cmlidXRlKCJub3RhdGlvbiIsImJveCIpO2JyZWFrO2Nhc2UiXFxhbmdsIjpuLnNldEF0dHJpYnV0ZSgibm90YXRpb24iLCJhY3R1YXJpYWwiKTticmVhaztjYXNlIlxcZmNvbG9yYm94IjpjYXNlIlxcY29sb3Jib3giOmlmKHI9dC5mb250TWV0cmljcygpLmZib3hzZXAqdC5mb250TWV0cmljcygpLnB0UGVyRW0sbi5zZXRBdHRyaWJ1dGUoIndpZHRoIiwiKyIrMipyKyJwdCIpLG4uc2V0QXR0cmlidXRlKCJoZWlnaHQiLCIrIisyKnIrInB0Iiksbi5zZXRBdHRyaWJ1dGUoImxzcGFjZSIscisicHQiKSxuLnNldEF0dHJpYnV0ZSgidm9mZnNldCIscisicHQiKSwiXFxmY29sb3Jib3giPT09ZS5sYWJlbCl7Y29uc3Qgcj1NYXRoLm1heCh0LmZvbnRNZXRyaWNzKCkuZmJveHJ1bGUsdC5taW5SdWxlVGhpY2tuZXNzKTtuLnNldEF0dHJpYnV0ZSgic3R5bGUiLCJib3JkZXI6ICIrTihyKSsiIHNvbGlkICIrZS5ib3JkZXJDb2xvcil9YnJlYWs7Y2FzZSJcXHhjYW5jZWwiOm4uc2V0QXR0cmlidXRlKCJub3RhdGlvbiIsInVwZGlhZ29uYWxzdHJpa2UgZG93bmRpYWdvbmFsc3RyaWtlIil9cmV0dXJuIGUuYmFja2dyb3VuZENvbG9yJiZuLnNldEF0dHJpYnV0ZSgibWF0aGJhY2tncm91bmQiLGUuYmFja2dyb3VuZENvbG9yKSxufX0pLG10KHt0eXBlOiJlbmNsb3NlIixuYW1lczpbIlxcZmNvbG9yYm94Il0sbnVtQXJnczozLGFsbG93ZWRJblRleHQ6ITAsYXJnVHlwZXM6WyJjb2xvciIsImNvbG9yIiwiaGJveCJdLGhhbmRsZXIoZSx0LHIpe2xldCBuPWUucGFyc2VyLG89ZS5mdW5jTmFtZTtjb25zdCBzPW9yKHRbMF0sImNvbG9yLXRva2VuIikuY29sb3IsaT1vcih0WzFdLCJjb2xvci10b2tlbiIpLmNvbG9yLGw9dFsyXTtyZXR1cm57dHlwZToiZW5jbG9zZSIsbW9kZTpuLm1vZGUsbGFiZWw6byxiYWNrZ3JvdW5kQ29sb3I6aSxib3JkZXJDb2xvcjpzLGJvZHk6bH19fSksbXQoe3R5cGU6ImVuY2xvc2UiLG5hbWVzOlsiXFxmYm94Il0sbnVtQXJnczoxLGFyZ1R5cGVzOlsiaGJveCJdLGFsbG93ZWRJblRleHQ6ITAsaGFuZGxlcihlLHQpe3JldHVybnt0eXBlOiJlbmNsb3NlIixtb2RlOmUucGFyc2VyLm1vZGUsbGFiZWw6IlxcZmJveCIsYm9keTp0WzBdfX19KSxtdCh7dHlwZToiZW5jbG9zZSIsbmFtZXM6WyJcXGNhbmNlbCIsIlxcYmNhbmNlbCIsIlxceGNhbmNlbCIsIlxccGhhc2UiXSxudW1BcmdzOjEsaGFuZGxlcihlLHQpe2xldCByPWUucGFyc2VyLG49ZS5mdW5jTmFtZTtjb25zdCBvPXRbMF07cmV0dXJue3R5cGU6ImVuY2xvc2UiLG1vZGU6ci5tb2RlLGxhYmVsOm4sYm9keTpvfX19KSxtdCh7dHlwZToiZW5jbG9zZSIsbmFtZXM6WyJcXHNvdXQiXSxudW1BcmdzOjEsYWxsb3dlZEluVGV4dDohMCxoYW5kbGVyKGUsdCl7bGV0IHI9ZS5wYXJzZXIsbj1lLmZ1bmNOYW1lOyJtYXRoIj09PXIubW9kZSYmci5zZXR0aW5ncy5yZXBvcnROb25zdHJpY3QoIm1hdGhWc1NvdXQiLCJMYVRlWCdzIFxcc291dCB3b3JrcyBvbmx5IGluIHRleHQgbW9kZSIpO2NvbnN0IG89dFswXTtyZXR1cm57dHlwZToiZW5jbG9zZSIsbW9kZTpyLm1vZGUsbGFiZWw6bixib2R5Om99fX0pLG10KHt0eXBlOiJlbmNsb3NlIixuYW1lczpbIlxcYW5nbCJdLG51bUFyZ3M6MSxhcmdUeXBlczpbImhib3giXSxhbGxvd2VkSW5UZXh0OiExLGhhbmRsZXIoZSx0KXtyZXR1cm57dHlwZToiZW5jbG9zZSIsbW9kZTplLnBhcnNlci5tb2RlLGxhYmVsOiJcXGFuZ2wiLGJvZHk6dFswXX19fSk7Y29uc3QgJHI9e307ZnVuY3Rpb24gWnIoZSl7bGV0IHQ9ZS50eXBlLHI9ZS5uYW1lcyxuPWUucHJvcHMsbz1lLmhhbmRsZXIscz1lLmh0bWxCdWlsZGVyLGk9ZS5tYXRobWxCdWlsZGVyO2NvbnN0IGw9e3R5cGU6dCxudW1BcmdzOm4ubnVtQXJnc3x8MCxhbGxvd2VkSW5UZXh0OiExLG51bU9wdGlvbmFsQXJnczowLGhhbmRsZXI6b307Zm9yKGxldCBlPTA7ZTxyLmxlbmd0aDsrK2UpJHJbcltlXV09bDtzJiYoY3RbdF09cyksaSYmKGh0W3RdPWkpfWNvbnN0IEtyPXt9O2Z1bmN0aW9uIEpyKGUsdCl7S3JbZV09dH1jbGFzcyBRcntjb25zdHJ1Y3RvcihlLHQscil7dGhpcy5sZXhlcj12b2lkIDAsdGhpcy5zdGFydD12b2lkIDAsdGhpcy5lbmQ9dm9pZCAwLHRoaXMubGV4ZXI9ZSx0aGlzLnN0YXJ0PXQsdGhpcy5lbmQ9cn1zdGF0aWMgcmFuZ2UoZSx0KXtyZXR1cm4gdD9lJiZlLmxvYyYmdC5sb2MmJmUubG9jLmxleGVyPT09dC5sb2MubGV4ZXI/bmV3IFFyKGUubG9jLmxleGVyLGUubG9jLnN0YXJ0LHQubG9jLmVuZCk6bnVsbDplJiZlLmxvY319Y2xhc3MgZW57Y29uc3RydWN0b3IoZSx0KXt0aGlzLnRleHQ9dm9pZCAwLHRoaXMubG9jPXZvaWQgMCx0aGlzLm5vZXhwYW5kPXZvaWQgMCx0aGlzLnRyZWF0QXNSZWxheD12b2lkIDAsdGhpcy50ZXh0PWUsdGhpcy5sb2M9dH1yYW5nZShlLHQpe3JldHVybiBuZXcgZW4odCxRci5yYW5nZSh0aGlzLGUpKX19ZnVuY3Rpb24gdG4oZSl7Y29uc3QgdD1bXTtlLmNvbnN1bWVTcGFjZXMoKTtsZXQgcj1lLmZldGNoKCkudGV4dDtmb3IoIlxccmVsYXgiPT09ciYmKGUuY29uc3VtZSgpLGUuY29uc3VtZVNwYWNlcygpLHI9ZS5mZXRjaCgpLnRleHQpOyJcXGhsaW5lIj09PXJ8fCJcXGhkYXNobGluZSI9PT1yOyllLmNvbnN1bWUoKSx0LnB1c2goIlxcaGRhc2hsaW5lIj09PXIpLGUuY29uc3VtZVNwYWNlcygpLHI9ZS5mZXRjaCgpLnRleHQ7cmV0dXJuIHR9Y29uc3Qgcm49ZT0+e2lmKCFlLnBhcnNlci5zZXR0aW5ncy5kaXNwbGF5TW9kZSl0aHJvdyBuZXcgbigieyIrZS5lbnZOYW1lKyJ9IGNhbiBiZSB1c2VkIG9ubHkgaW4gZGlzcGxheSBtb2RlLiIpfSxubj1uZXcgU2V0KFsiZ2F0aGVyIiwiZ2F0aGVyKiJdKTtmdW5jdGlvbiBvbihlKXtpZighZS5pbmNsdWRlcygiZWQiKSlyZXR1cm4hZS5pbmNsdWRlcygiKiIpfWZ1bmN0aW9uIHNuKGUsdCxyKXtsZXQgbz10Lmhza2lwQmVmb3JlQW5kQWZ0ZXIscz10LmFkZEpvdCxpPXQuY29scyxsPXQuYXJyYXlzdHJldGNoLGE9dC5jb2xTZXBhcmF0aW9uVHlwZSxjPXQuYXV0b1RhZyxoPXQuc2luZ2xlUm93LG09dC5lbXB0eVNpbmdsZVJvdyx1PXQubWF4TnVtQ29scyxwPXQubGVxbm87aWYoZS5ndWxsZXQuYmVnaW5Hcm91cCgpLGh8fGUuZ3VsbGV0Lm1hY3Jvcy5zZXQoIlxcY3IiLCJcXFxcXFxyZWxheCIpLCFsKXtjb25zdCB0PWUuZ3VsbGV0LmV4cGFuZE1hY3JvQXNUZXh0KCJcXGFycmF5c3RyZXRjaCIpO2lmKG51bGw9PXQpbD0xO2Vsc2UgaWYobD1wYXJzZUZsb2F0KHQpLCFsfHxsPDApdGhyb3cgbmV3IG4oIkludmFsaWQgXFxhcnJheXN0cmV0Y2g6ICIrdCl9ZS5ndWxsZXQuYmVnaW5Hcm91cCgpO2xldCBkPVtdO2NvbnN0IGc9W2RdLGY9W10sYj1bXSx5PW51bGwhPWM/W106dm9pZCAwO2Z1bmN0aW9uIHgoKXtjJiZlLmd1bGxldC5tYWNyb3Muc2V0KCJcXEBlcW5zdyIsIjEiLCEwKX1mdW5jdGlvbiB3KCl7eSYmKGUuZ3VsbGV0Lm1hY3Jvcy5nZXQoIlxcZGZAdGFnIik/KHkucHVzaChlLnN1YnBhcnNlKFtuZXcgZW4oIlxcZGZAdGFnIildKSksZS5ndWxsZXQubWFjcm9zLnNldCgiXFxkZkB0YWciLHZvaWQgMCwhMCkpOnkucHVzaChCb29sZWFuKGMpJiYiMSI9PT1lLmd1bGxldC5tYWNyb3MuZ2V0KCJcXEBlcW5zdyIpKSl9Zm9yKHgoKSxiLnB1c2godG4oZSkpOzspe2NvbnN0IHQ9ZS5wYXJzZUV4cHJlc3Npb24oITEsaD8iXFxlbmQiOiJcXFxcIik7ZS5ndWxsZXQuZW5kR3JvdXAoKSxlLmd1bGxldC5iZWdpbkdyb3VwKCk7bGV0IG89e3R5cGU6Im9yZGdyb3VwIixtb2RlOmUubW9kZSxib2R5OnR9O3ImJihvPXt0eXBlOiJzdHlsaW5nIixtb2RlOmUubW9kZSxzdHlsZTpyLHJlc2V0Rm9udDohMCxib2R5OltvXX0pLGQucHVzaChvKTtjb25zdCBzPWUuZmV0Y2goKS50ZXh0O2lmKCImIj09PXMpe2lmKHUmJmQubGVuZ3RoPT09dSl7aWYoaHx8YSl0aHJvdyBuZXcgbigiVG9vIG1hbnkgdGFiIGNoYXJhY3RlcnM6ICYiLGUubmV4dFRva2VuKTtlLnNldHRpbmdzLnJlcG9ydE5vbnN0cmljdCgidGV4dEVudiIsIlRvbyBmZXcgY29sdW1ucyBzcGVjaWZpZWQgaW4gdGhlIHthcnJheX0gY29sdW1uIGFyZ3VtZW50LiIpfWUuY29uc3VtZSgpfWVsc2V7aWYoIlxcZW5kIj09PXMpe3coKSwxPT09ZC5sZW5ndGgmJiJzdHlsaW5nIj09PW8udHlwZSYmMT09PW8uYm9keS5sZW5ndGgmJiJvcmRncm91cCI9PT1vLmJvZHlbMF0udHlwZSYmMD09PW8uYm9keVswXS5ib2R5Lmxlbmd0aCYmKGcubGVuZ3RoPjF8fCFtKSYmZy5wb3AoKSxiLmxlbmd0aDxnLmxlbmd0aCsxJiZiLnB1c2goW10pO2JyZWFrfWlmKCJcXFxcIiE9PXMpdGhyb3cgbmV3IG4oIkV4cGVjdGVkICYgb3IgXFxcXCBvciBcXGNyIG9yIFxcZW5kIixlLm5leHRUb2tlbik7e2xldCB0O2UuY29uc3VtZSgpLCIgIiE9PWUuZ3VsbGV0LmZ1dHVyZSgpLnRleHQmJih0PWUucGFyc2VTaXplR3JvdXAoITApKSxmLnB1c2godD90LnZhbHVlOm51bGwpLHcoKSxiLnB1c2godG4oZSkpLGQ9W10sZy5wdXNoKGQpLHgoKX19fXJldHVybiBlLmd1bGxldC5lbmRHcm91cCgpLGUuZ3VsbGV0LmVuZEdyb3VwKCkse3R5cGU6ImFycmF5Iixtb2RlOmUubW9kZSxhZGRKb3Q6cyxhcnJheXN0cmV0Y2g6bCxib2R5OmcsY29sczppLHJvd0dhcHM6Zixoc2tpcEJlZm9yZUFuZEFmdGVyOm8saExpbmVzQmVmb3JlUm93OmIsY29sU2VwYXJhdGlvblR5cGU6YSx0YWdzOnksbGVxbm86cH19ZnVuY3Rpb24gbG4oZSl7cmV0dXJuImQiPT09ZS5zbGljZSgwLDEpPyJkaXNwbGF5IjoidGV4dCJ9Y29uc3QgYW49ZnVuY3Rpb24oZSx0KXtsZXQgcixvO2NvbnN0IHM9ZS5ib2R5Lmxlbmd0aCxpPWUuaExpbmVzQmVmb3JlUm93O2xldCBsPTA7Y29uc3QgYT1uZXcgQXJyYXkocyksYz1bXSxoPU1hdGgubWF4KHQuZm9udE1ldHJpY3MoKS5hcnJheVJ1bGVXaWR0aCx0Lm1pblJ1bGVUaGlja25lc3MpLG09MS90LmZvbnRNZXRyaWNzKCkucHRQZXJFbTtsZXQgdT01Km07aWYoZS5jb2xTZXBhcmF0aW9uVHlwZSYmInNtYWxsIj09PWUuY29sU2VwYXJhdGlvblR5cGUpe3U9dC5oYXZpbmdTdHlsZShTLlNDUklQVCkuc2l6ZU11bHRpcGxpZXIvdC5zaXplTXVsdGlwbGllciouMjc3OH1jb25zdCBwPSJDRCI9PT1lLmNvbFNlcGFyYXRpb25UeXBlP08oe251bWJlcjozLHVuaXQ6ImV4In0sdCk6MTIqbSxkPTMqbSxnPWUuYXJyYXlzdHJldGNoKnAsZj0uNypnLGI9LjMqZztsZXQgeT0wO2Z1bmN0aW9uIHgoZSl7Zm9yKGxldCB0PTA7dDxlLmxlbmd0aDsrK3QpdD4wJiYoeSs9LjI1KSxjLnB1c2goe3Bvczp5LGlzRGFzaGVkOmVbdF19KX1mb3IoeChpWzBdKSxyPTA7cjxlLmJvZHkubGVuZ3RoOysrcil7Y29uc3Qgbj1lLmJvZHlbcl07bGV0IHM9ZixjPWI7bDxuLmxlbmd0aCYmKGw9bi5sZW5ndGgpO2NvbnN0IGg9e2NlbGxzOm5ldyBBcnJheShuLmxlbmd0aCksaGVpZ2h0OjAsZGVwdGg6MCxwb3M6MH07Zm9yKG89MDtvPG4ubGVuZ3RoOysrbyl7Y29uc3QgZT1NdChuW29dLHQpO2M8ZS5kZXB0aCYmKGM9ZS5kZXB0aCksczxlLmhlaWdodCYmKHM9ZS5oZWlnaHQpLGguY2VsbHNbb109ZX1jb25zdCBtPWUucm93R2Fwc1tyXTtsZXQgdT0wO20mJih1PU8obSx0KSx1PjAmJih1Kz1iLGM8dSYmKGM9dSksdT0wKSksZS5hZGRKb3QmJnI8ZS5ib2R5Lmxlbmd0aC0xJiYoYys9ZCksaC5oZWlnaHQ9cyxoLmRlcHRoPWMseSs9cyxoLnBvcz15LHkrPWMrdSxhW3JdPWgseChpW3IrMV0pfWNvbnN0IHc9eS8yK3QuZm9udE1ldHJpY3MoKS5heGlzSGVpZ2h0LHY9ZS5jb2xzfHxbXSxrPVtdO2xldCB6LE07Y29uc3QgQT1bXTtpZihlLnRhZ3MmJmUudGFncy5zb21lKGU9PmUpKWZvcihyPTA7cjxzOysrcil7Y29uc3Qgbj1hW3JdLG89bi5wb3MtdyxzPWUudGFnc1tyXTtsZXQgaTtpPSEwPT09cz9ZZShbImVxbi1udW0iXSxbXSx0KTpZZShbXSwhMT09PXM/W106eHQocyx0LCEwKSx0KSxpLmRlcHRoPW4uZGVwdGgsaS5oZWlnaHQ9bi5oZWlnaHQsQS5wdXNoKHt0eXBlOiJlbGVtIixlbGVtOmksc2hpZnQ6b30pfWZvcihvPTAsTT0wO288bHx8TTx2Lmxlbmd0aDsrK28sKytNKXt2YXIgVDtsZXQgaSxjPXZbTV0sbT0hMDtmb3IoOyJzZXBhcmF0b3IiPT09KG51bGw9PShDPWMpP3ZvaWQgMDpDLnR5cGUpOyl7dmFyIEM7aWYobXx8KHo9WWUoWyJhcnJheWNvbHNlcCJdLFtdKSx6LnN0eWxlLndpZHRoPU4odC5mb250TWV0cmljcygpLmRvdWJsZVJ1bGVTZXApLGsucHVzaCh6KSksInwiIT09Yy5zZXBhcmF0b3ImJiI6IiE9PWMuc2VwYXJhdG9yKXRocm93IG5ldyBuKCJJbnZhbGlkIHNlcGFyYXRvciB0eXBlOiAiK2Muc2VwYXJhdG9yKTt7Y29uc3QgZT0ifCI9PT1jLnNlcGFyYXRvcj8ic29saWQiOiJkYXNoZWQiLHI9WWUoWyJ2ZXJ0aWNhbC1zZXBhcmF0b3IiXSxbXSx0KTtyLnN0eWxlLmhlaWdodD1OKHkpLHIuc3R5bGUuYm9yZGVyUmlnaHRXaWR0aD1OKGgpLHIuc3R5bGUuYm9yZGVyUmlnaHRTdHlsZT1lLHIuc3R5bGUubWFyZ2luPSIwICIrTigtaC8yKTtjb25zdCBuPXktdztuJiYoci5zdHlsZS52ZXJ0aWNhbEFsaWduPU4oLW4pKSxrLnB1c2gocil9TSsrLGM9dltNXSxtPSExfWlmKG8+PWwpY29udGludWU7dmFyIEIscTtpZihvPjB8fGUuaHNraXBCZWZvcmVBbmRBZnRlcilpPW51bGwhPShCPW51bGw9PShxPWMpP3ZvaWQgMDpxLnByZWdhcCk/Qjp1LDAhPT1pJiYoej1ZZShbImFycmF5Y29sc2VwIl0sW10pLHouc3R5bGUud2lkdGg9TihpKSxrLnB1c2goeikpO2NvbnN0IHA9W107Zm9yKHI9MDtyPHM7KytyKXtjb25zdCBlPWFbcl0sdD1lLmNlbGxzW29dO2lmKCF0KWNvbnRpbnVlO2NvbnN0IG49ZS5wb3Mtdzt0LmRlcHRoPWUuZGVwdGgsdC5oZWlnaHQ9ZS5oZWlnaHQscC5wdXNoKHt0eXBlOiJlbGVtIixlbGVtOnQsc2hpZnQ6bn0pfWNvbnN0IGQ9S2Uoe3Bvc2l0aW9uVHlwZToiaW5kaXZpZHVhbFNoaWZ0IixjaGlsZHJlbjpwfSksZz1ZZShbImNvbC1hbGlnbi0iKygobnVsbD09KFQ9Yyk/dm9pZCAwOlQuYWxpZ24pfHwiYyIpXSxbZF0pO3ZhciBJLFI7aWYoay5wdXNoKGcpLG88bC0xfHxlLmhza2lwQmVmb3JlQW5kQWZ0ZXIpaT1udWxsIT0oST1udWxsPT0oUj1jKT92b2lkIDA6Ui5wb3N0Z2FwKT9JOnUsMCE9PWkmJih6PVllKFsiYXJyYXljb2xzZXAiXSxbXSksei5zdHlsZS53aWR0aD1OKGkpLGsucHVzaCh6KSl9bGV0IEg9WWUoWyJtdGFibGUiXSxrKTtpZihjLmxlbmd0aD4wKXtjb25zdCBlPV9lKCJrYXRleC1obGluZSIsdCxoKSxyPV9lKCJrYXRleC1oZGFzaGxpbmUiLHQsaCksbj1be3R5cGU6ImVsZW0iLGVsZW06SCxzaGlmdDowfV07Zm9yKDtjLmxlbmd0aD4wOyl7Y29uc3QgdD1jLnBvcCgpLG89dC5wb3Mtdzt0LmlzRGFzaGVkP24ucHVzaCh7dHlwZToiZWxlbSIsZWxlbTpyLHNoaWZ0Om99KTpuLnB1c2goe3R5cGU6ImVsZW0iLGVsZW06ZSxzaGlmdDpvfSl9SD1LZSh7cG9zaXRpb25UeXBlOiJpbmRpdmlkdWFsU2hpZnQiLGNoaWxkcmVuOm59KX1pZigwPT09QS5sZW5ndGgpcmV0dXJuIFllKFsibW9yZCJdLFtIXSx0KTt7Y29uc3QgZT1LZSh7cG9zaXRpb25UeXBlOiJpbmRpdmlkdWFsU2hpZnQiLGNoaWxkcmVuOkF9KSxyPVllKFsia2F0ZXgtdGFnIl0sW2VdLHQpO3JldHVybiAkZShbSCxyXSl9fSxjbj17YzoiY2VudGVyICIsbDoibGVmdCAiLHI6InJpZ2h0ICJ9LGhuPWZ1bmN0aW9uKGUsdCl7Y29uc3Qgcj1bXSxuPW5ldyBCdCgibXRkIixbXSxbIm10ci1nbHVlIl0pLG89bmV3IEJ0KCJtdGQiLFtdLFsibW1sLWVxbi1udW0iXSk7Zm9yKGxldCBzPTA7czxlLmJvZHkubGVuZ3RoO3MrKyl7Y29uc3QgaT1lLmJvZHlbc10sbD1bXTtmb3IobGV0IGU9MDtlPGkubGVuZ3RoO2UrKylsLnB1c2gobmV3IEJ0KCJtdGQiLFtWdChpW2VdLHQpXSkpO2UudGFncyYmZS50YWdzW3NdJiYobC51bnNoaWZ0KG4pLGwucHVzaChuKSxlLmxlcW5vP2wudW5zaGlmdChvKTpsLnB1c2gobykpLHIucHVzaChuZXcgQnQoIm10ciIsbCkpfWxldCBzPW5ldyBCdCgibXRhYmxlIixyKTtjb25zdCBpPS41PT09ZS5hcnJheXN0cmV0Y2g/LjE6LjE2K2UuYXJyYXlzdHJldGNoLTErKGUuYWRkSm90Py4wOTowKTtzLnNldEF0dHJpYnV0ZSgicm93c3BhY2luZyIsTihpKSk7bGV0IGw9IiIsYT0iIjtpZihlLmNvbHMmJmUuY29scy5sZW5ndGg+MCl7Y29uc3QgdD1lLmNvbHM7bGV0IHI9IiIsbj0hMSxvPTAsaT10Lmxlbmd0aDsic2VwYXJhdG9yIj09PXRbMF0udHlwZSYmKGwrPSJ0b3AgIixvPTEpLCJzZXBhcmF0b3IiPT09dFt0Lmxlbmd0aC0xXS50eXBlJiYobCs9ImJvdHRvbSAiLGktPTEpO2ZvcihsZXQgZT1vO2U8aTtlKyspe2NvbnN0IG89dFtlXTsiYWxpZ24iPT09by50eXBlPyhhKz1jbltvLmFsaWduXSxuJiYocis9Im5vbmUgIiksbj0hMCk6InNlcGFyYXRvciI9PT1vLnR5cGUmJm4mJihyKz0ifCI9PT1vLnNlcGFyYXRvcj8ic29saWQgIjoiZGFzaGVkICIsbj0hMSl9cy5zZXRBdHRyaWJ1dGUoImNvbHVtbmFsaWduIixhLnRyaW0oKSksL1tzZF0vLnRlc3QocikmJnMuc2V0QXR0cmlidXRlKCJjb2x1bW5saW5lcyIsci50cmltKCkpfWlmKCJhbGlnbiI9PT1lLmNvbFNlcGFyYXRpb25UeXBlKXtjb25zdCB0PWUuY29sc3x8W107bGV0IHI9IiI7Zm9yKGxldCBlPTE7ZTx0Lmxlbmd0aDtlKyspcis9ZSUyPyIwZW0gIjoiMWVtICI7cy5zZXRBdHRyaWJ1dGUoImNvbHVtbnNwYWNpbmciLHIudHJpbSgpKX1lbHNlImFsaWduYXQiPT09ZS5jb2xTZXBhcmF0aW9uVHlwZXx8ImdhdGhlciI9PT1lLmNvbFNlcGFyYXRpb25UeXBlP3Muc2V0QXR0cmlidXRlKCJjb2x1bW5zcGFjaW5nIiwiMGVtIik6InNtYWxsIj09PWUuY29sU2VwYXJhdGlvblR5cGU/cy5zZXRBdHRyaWJ1dGUoImNvbHVtbnNwYWNpbmciLCIwLjI3NzhlbSIpOiJDRCI9PT1lLmNvbFNlcGFyYXRpb25UeXBlP3Muc2V0QXR0cmlidXRlKCJjb2x1bW5zcGFjaW5nIiwiMC41ZW0iKTpzLnNldEF0dHJpYnV0ZSgiY29sdW1uc3BhY2luZyIsIjFlbSIpO2xldCBjPSIiO2NvbnN0IGg9ZS5oTGluZXNCZWZvcmVSb3c7bCs9aFswXS5sZW5ndGg+MD8ibGVmdCAiOiIiLGwrPWhbaC5sZW5ndGgtMV0ubGVuZ3RoPjA/InJpZ2h0ICI6IiI7Zm9yKGxldCBlPTE7ZTxoLmxlbmd0aC0xO2UrKyljKz0wPT09aFtlXS5sZW5ndGg/Im5vbmUgIjpoW2VdWzBdPyJkYXNoZWQgIjoic29saWQgIjtyZXR1cm4vW3NkXS8udGVzdChjKSYmcy5zZXRBdHRyaWJ1dGUoInJvd2xpbmVzIixjLnRyaW0oKSksIiIhPT1sJiYocz1uZXcgQnQoIm1lbmNsb3NlIixbc10pLHMuc2V0QXR0cmlidXRlKCJub3RhdGlvbiIsbC50cmltKCkpKSxlLmFycmF5c3RyZXRjaCYmZS5hcnJheXN0cmV0Y2g8MSYmKHM9bmV3IEJ0KCJtc3R5bGUiLFtzXSkscy5zZXRBdHRyaWJ1dGUoInNjcmlwdGxldmVsIiwiMSIpKSxzfSxtbj1mdW5jdGlvbihlLHQpe2UuZW52TmFtZS5pbmNsdWRlcygiZWQiKXx8cm4oZSk7Y29uc3Qgcj1bXSxvPSJzcGxpdCI9PT1lLmVudk5hbWUscz1zbihlLnBhcnNlcix7Y29sczpyLGFkZEpvdDohMCxhdXRvVGFnOm8/dm9pZCAwOm9uKGUuZW52TmFtZSksZW1wdHlTaW5nbGVSb3c6ITAsY29sU2VwYXJhdGlvblR5cGU6ZS5lbnZOYW1lLmluY2x1ZGVzKCJhdCIpPyJhbGlnbmF0IjoiYWxpZ24iLG1heE51bUNvbHM6bz8yOnZvaWQgMCxsZXFubzplLnBhcnNlci5zZXR0aW5ncy5sZXFub30sImRpc3BsYXkiKTtsZXQgaT0wLGw9MDtjb25zdCBhPXt0eXBlOiJvcmRncm91cCIsbW9kZTplLm1vZGUsYm9keTpbXX07aWYodFswXSYmIm9yZGdyb3VwIj09PXRbMF0udHlwZSl7bGV0IGU9IiI7Zm9yKGxldCByPTA7cjx0WzBdLmJvZHkubGVuZ3RoO3IrKyl7ZSs9b3IodFswXS5ib2R5W3JdLCJ0ZXh0b3JkIikudGV4dH1pPU51bWJlcihlKSxsPTIqaX1jb25zdCBjPSFsO3MuYm9keS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2ZvcihsZXQgdD0xO3Q8ZS5sZW5ndGg7dCs9Mil7Y29uc3Qgcj1vcihlW3RdLCJzdHlsaW5nIik7b3Ioci5ib2R5WzBdLCJvcmRncm91cCIpLmJvZHkudW5zaGlmdChhKX1pZihjKWw8ZS5sZW5ndGgmJihsPWUubGVuZ3RoKTtlbHNle2NvbnN0IHQ9ZS5sZW5ndGgvMjtpZihpPHQpdGhyb3cgbmV3IG4oIlRvbyBtYW55IG1hdGggaW4gYSByb3c6IGV4cGVjdGVkICIraSsiLCBidXQgZ290ICIrdCxlWzBdKX19KTtmb3IobGV0IGU9MDtlPGw7KytlKXtsZXQgdD0iciIsbj0wO2UlMj09MT90PSJsIjplPjAmJmMmJihuPTEpLHJbZV09e3R5cGU6ImFsaWduIixhbGlnbjp0LHByZWdhcDpuLHBvc3RnYXA6MH19cmV0dXJuIHMuY29sU2VwYXJhdGlvblR5cGU9Yz8iYWxpZ24iOiJhbGlnbmF0IixzfTtacih7dHlwZToiYXJyYXkiLG5hbWVzOlsiYXJyYXkiLCJkYXJyYXkiXSxwcm9wczp7bnVtQXJnczoxfSxoYW5kbGVyKGUsdCl7Y29uc3Qgcj0oaXIodFswXSk/W3RbMF1dOm9yKHRbMF0sIm9yZGdyb3VwIikuYm9keSkubWFwKGZ1bmN0aW9uKGUpe2NvbnN0IHQ9c3IoZSkudGV4dDtpZigibGNyIi5pbmNsdWRlcyh0KSlyZXR1cm57dHlwZToiYWxpZ24iLGFsaWduOnR9O2lmKCJ8Ij09PXQpcmV0dXJue3R5cGU6InNlcGFyYXRvciIsc2VwYXJhdG9yOiJ8In07aWYoIjoiPT09dClyZXR1cm57dHlwZToic2VwYXJhdG9yIixzZXBhcmF0b3I6IjoifTt0aHJvdyBuZXcgbigiVW5rbm93biBjb2x1bW4gYWxpZ25tZW50OiAiK3QsZSl9KSxvPXtjb2xzOnIsaHNraXBCZWZvcmVBbmRBZnRlcjohMCxtYXhOdW1Db2xzOnIubGVuZ3RofTtyZXR1cm4gc24oZS5wYXJzZXIsbyxsbihlLmVudk5hbWUpKX0saHRtbEJ1aWxkZXI6YW4sbWF0aG1sQnVpbGRlcjpobn0pLFpyKHt0eXBlOiJhcnJheSIsbmFtZXM6WyJtYXRyaXgiLCJwbWF0cml4IiwiYm1hdHJpeCIsIkJtYXRyaXgiLCJ2bWF0cml4IiwiVm1hdHJpeCIsIm1hdHJpeCoiLCJwbWF0cml4KiIsImJtYXRyaXgqIiwiQm1hdHJpeCoiLCJ2bWF0cml4KiIsIlZtYXRyaXgqIl0scHJvcHM6e251bUFyZ3M6MH0saGFuZGxlcihlKXtjb25zdCB0PXttYXRyaXg6bnVsbCxwbWF0cml4OlsiKCIsIikiXSxibWF0cml4OlsiWyIsIl0iXSxCbWF0cml4OlsiXFx7IiwiXFx9Il0sdm1hdHJpeDpbInwiLCJ8Il0sVm1hdHJpeDpbIlxcVmVydCIsIlxcVmVydCJdfVtlLmVudk5hbWUucmVwbGFjZSgiKiIsIiIpXTtsZXQgcj0iYyI7Y29uc3Qgbz17aHNraXBCZWZvcmVBbmRBZnRlcjohMSxjb2xzOlt7dHlwZToiYWxpZ24iLGFsaWduOnJ9XX07aWYoIioiPT09ZS5lbnZOYW1lLmNoYXJBdChlLmVudk5hbWUubGVuZ3RoLTEpKXtjb25zdCB0PWUucGFyc2VyO2lmKHQuY29uc3VtZVNwYWNlcygpLCJbIj09PXQuZmV0Y2goKS50ZXh0KXtpZih0LmNvbnN1bWUoKSx0LmNvbnN1bWVTcGFjZXMoKSxyPXQuZmV0Y2goKS50ZXh0LCEibGNyIi5pbmNsdWRlcyhyKSl0aHJvdyBuZXcgbigiRXhwZWN0ZWQgbCBvciBjIG9yIHIiLHQubmV4dFRva2VuKTt0LmNvbnN1bWUoKSx0LmNvbnN1bWVTcGFjZXMoKSx0LmV4cGVjdCgiXSIpLHQuY29uc3VtZSgpLG8uY29scz1be3R5cGU6ImFsaWduIixhbGlnbjpyfV19fWNvbnN0IHM9c24oZS5wYXJzZXIsbyxsbihlLmVudk5hbWUpKSxpPU1hdGgubWF4KDAsLi4ucy5ib2R5Lm1hcChlPT5lLmxlbmd0aCkpO3JldHVybiBzLmNvbHM9bmV3IEFycmF5KGkpLmZpbGwoe3R5cGU6ImFsaWduIixhbGlnbjpyfSksdD97dHlwZToibGVmdHJpZ2h0Iixtb2RlOmUubW9kZSxib2R5OltzXSxsZWZ0OnRbMF0scmlnaHQ6dFsxXSxyaWdodENvbG9yOnZvaWQgMH06c30saHRtbEJ1aWxkZXI6YW4sbWF0aG1sQnVpbGRlcjpobn0pLFpyKHt0eXBlOiJhcnJheSIsbmFtZXM6WyJzbWFsbG1hdHJpeCJdLHByb3BzOntudW1BcmdzOjB9LGhhbmRsZXIoZSl7Y29uc3QgdD1zbihlLnBhcnNlcix7YXJyYXlzdHJldGNoOi41fSwic2NyaXB0Iik7cmV0dXJuIHQuY29sU2VwYXJhdGlvblR5cGU9InNtYWxsIix0fSxodG1sQnVpbGRlcjphbixtYXRobWxCdWlsZGVyOmhufSksWnIoe3R5cGU6ImFycmF5IixuYW1lczpbInN1YmFycmF5Il0scHJvcHM6e251bUFyZ3M6MX0saGFuZGxlcihlLHQpe2NvbnN0IHI9KGlyKHRbMF0pP1t0WzBdXTpvcih0WzBdLCJvcmRncm91cCIpLmJvZHkpLm1hcChmdW5jdGlvbihlKXtjb25zdCB0PXNyKGUpLnRleHQ7aWYoImxjIi5pbmNsdWRlcyh0KSlyZXR1cm57dHlwZToiYWxpZ24iLGFsaWduOnR9O3Rocm93IG5ldyBuKCJVbmtub3duIGNvbHVtbiBhbGlnbm1lbnQ6ICIrdCxlKX0pO2lmKHIubGVuZ3RoPjEpdGhyb3cgbmV3IG4oIntzdWJhcnJheX0gY2FuIGNvbnRhaW4gb25seSBvbmUgY29sdW1uIik7Y29uc3Qgbz17Y29sczpyLGhza2lwQmVmb3JlQW5kQWZ0ZXI6ITEsYXJyYXlzdHJldGNoOi41fSxzPXNuKGUucGFyc2VyLG8sInNjcmlwdCIpO2lmKHMuYm9keS5sZW5ndGg+MCYmcy5ib2R5WzBdLmxlbmd0aD4xKXRocm93IG5ldyBuKCJ7c3ViYXJyYXl9IGNhbiBjb250YWluIG9ubHkgb25lIGNvbHVtbiIpO3JldHVybiBzfSxodG1sQnVpbGRlcjphbixtYXRobWxCdWlsZGVyOmhufSksWnIoe3R5cGU6ImFycmF5IixuYW1lczpbImNhc2VzIiwiZGNhc2VzIiwicmNhc2VzIiwiZHJjYXNlcyJdLHByb3BzOntudW1BcmdzOjB9LGhhbmRsZXIoZSl7Y29uc3QgdD1zbihlLnBhcnNlcix7YXJyYXlzdHJldGNoOjEuMixjb2xzOlt7dHlwZToiYWxpZ24iLGFsaWduOiJsIixwcmVnYXA6MCxwb3N0Z2FwOjF9LHt0eXBlOiJhbGlnbiIsYWxpZ246ImwiLHByZWdhcDowLHBvc3RnYXA6MH1dfSxsbihlLmVudk5hbWUpKTtyZXR1cm57dHlwZToibGVmdHJpZ2h0Iixtb2RlOmUubW9kZSxib2R5Olt0XSxsZWZ0OmUuZW52TmFtZS5pbmNsdWRlcygiciIpPyIuIjoiXFx7IixyaWdodDplLmVudk5hbWUuaW5jbHVkZXMoInIiKT8iXFx9IjoiLiIscmlnaHRDb2xvcjp2b2lkIDB9fSxodG1sQnVpbGRlcjphbixtYXRobWxCdWlsZGVyOmhufSksWnIoe3R5cGU6ImFycmF5IixuYW1lczpbImFsaWduIiwiYWxpZ24qIiwiYWxpZ25lZCIsInNwbGl0Il0scHJvcHM6e251bUFyZ3M6MH0saGFuZGxlcjptbixodG1sQnVpbGRlcjphbixtYXRobWxCdWlsZGVyOmhufSksWnIoe3R5cGU6ImFycmF5IixuYW1lczpbImdhdGhlcmVkIiwiZ2F0aGVyIiwiZ2F0aGVyKiJdLHByb3BzOntudW1BcmdzOjB9LGhhbmRsZXIoZSl7bm4uaGFzKGUuZW52TmFtZSkmJnJuKGUpO2NvbnN0IHQ9e2NvbHM6W3t0eXBlOiJhbGlnbiIsYWxpZ246ImMifV0sYWRkSm90OiEwLGNvbFNlcGFyYXRpb25UeXBlOiJnYXRoZXIiLGF1dG9UYWc6b24oZS5lbnZOYW1lKSxlbXB0eVNpbmdsZVJvdzohMCxsZXFubzplLnBhcnNlci5zZXR0aW5ncy5sZXFub307cmV0dXJuIHNuKGUucGFyc2VyLHQsImRpc3BsYXkiKX0saHRtbEJ1aWxkZXI6YW4sbWF0aG1sQnVpbGRlcjpobn0pLFpyKHt0eXBlOiJhcnJheSIsbmFtZXM6WyJhbGlnbmF0IiwiYWxpZ25hdCoiLCJhbGlnbmVkYXQiXSxwcm9wczp7bnVtQXJnczoxfSxoYW5kbGVyOm1uLGh0bWxCdWlsZGVyOmFuLG1hdGhtbEJ1aWxkZXI6aG59KSxacih7dHlwZToiYXJyYXkiLG5hbWVzOlsiZXF1YXRpb24iLCJlcXVhdGlvbioiXSxwcm9wczp7bnVtQXJnczowfSxoYW5kbGVyKGUpe3JuKGUpO2NvbnN0IHQ9e2F1dG9UYWc6b24oZS5lbnZOYW1lKSxlbXB0eVNpbmdsZVJvdzohMCxzaW5nbGVSb3c6ITAsbWF4TnVtQ29sczoxLGxlcW5vOmUucGFyc2VyLnNldHRpbmdzLmxlcW5vfTtyZXR1cm4gc24oZS5wYXJzZXIsdCwiZGlzcGxheSIpfSxodG1sQnVpbGRlcjphbixtYXRobWxCdWlsZGVyOmhufSksWnIoe3R5cGU6ImFycmF5IixuYW1lczpbIkNEIl0scHJvcHM6e251bUFyZ3M6MH0saGFuZGxlcihlKXtyZXR1cm4gcm4oZSksZnVuY3Rpb24oZSl7Y29uc3QgdD1bXTtmb3IoZS5ndWxsZXQuYmVnaW5Hcm91cCgpLGUuZ3VsbGV0Lm1hY3Jvcy5zZXQoIlxcY3IiLCJcXFxcXFxyZWxheCIpLGUuZ3VsbGV0LmJlZ2luR3JvdXAoKTs7KXt0LnB1c2goZS5wYXJzZUV4cHJlc3Npb24oITEsIlxcXFwiKSksZS5ndWxsZXQuZW5kR3JvdXAoKSxlLmd1bGxldC5iZWdpbkdyb3VwKCk7Y29uc3Qgcj1lLmZldGNoKCkudGV4dDtpZigiJiIhPT1yJiYiXFxcXCIhPT1yKXtpZigiXFxlbmQiPT09cil7MD09PXRbdC5sZW5ndGgtMV0ubGVuZ3RoJiZ0LnBvcCgpO2JyZWFrfXRocm93IG5ldyBuKCJFeHBlY3RlZCBcXFxcIG9yIFxcY3Igb3IgXFxlbmQiLGUubmV4dFRva2VuKX1lLmNvbnN1bWUoKX1sZXQgcj1bXTtjb25zdCBvPVtyXTtmb3IobGV0IHM9MDtzPHQubGVuZ3RoO3MrKyl7Y29uc3QgaT10W3NdO2xldCBsPXByKCk7Zm9yKGxldCB0PTA7dDxpLmxlbmd0aDt0KyspaWYoZHIoaVt0XSkpe3IucHVzaChsKSx0Kz0xO2NvbnN0IG89c3IoaVt0XSkudGV4dCxzPW5ldyBBcnJheSgyKTtpZihzWzBdPXt0eXBlOiJvcmRncm91cCIsbW9kZToibWF0aCIsYm9keTpbXX0sc1sxXT17dHlwZToib3JkZ3JvdXAiLG1vZGU6Im1hdGgiLGJvZHk6W119LCI9fC4iLmluY2x1ZGVzKG8pKTtlbHNle2lmKCEiPD5BViIuaW5jbHVkZXMobykpdGhyb3cgbmV3IG4oJ0V4cGVjdGVkIG9uZSBvZiAiPD5BVj18LiIgYWZ0ZXIgQCcsaVt0XSk7Zm9yKGxldCBlPTA7ZTwyO2UrKyl7bGV0IHI9ITA7Zm9yKGxldCBsPXQrMTtsPGkubGVuZ3RoO2wrKyl7aWYoZ3IoaVtsXSxvKSl7cj0hMSx0PWw7YnJlYWt9aWYoZHIoaVtsXSkpdGhyb3cgbmV3IG4oIk1pc3NpbmcgYSAiK28rIiBjaGFyYWN0ZXIgdG8gY29tcGxldGUgYSBDRCBhcnJvdy4iLGlbbF0pO3NbZV0uYm9keS5wdXNoKGlbbF0pfWlmKHIpdGhyb3cgbmV3IG4oIk1pc3NpbmcgYSAiK28rIiBjaGFyYWN0ZXIgdG8gY29tcGxldGUgYSBDRCBhcnJvdy4iLGlbdF0pfX1jb25zdCBhPXt0eXBlOiJzdHlsaW5nIixib2R5OltmcihvLHMsZSldLG1vZGU6Im1hdGgiLHN0eWxlOiJkaXNwbGF5IixyZXNldEZvbnQ6ITB9O3IucHVzaChhKSxsPXByKCl9ZWxzZSBsLmJvZHkucHVzaChpW3RdKTtzJTI9PTA/ci5wdXNoKGwpOnIuc2hpZnQoKSxyPVtdLG8ucHVzaChyKX1yZXR1cm4gZS5ndWxsZXQuZW5kR3JvdXAoKSxlLmd1bGxldC5lbmRHcm91cCgpLHt0eXBlOiJhcnJheSIsbW9kZToibWF0aCIsYm9keTpvLGFycmF5c3RyZXRjaDoxLGFkZEpvdDohMCxyb3dHYXBzOltudWxsXSxjb2xzOm5ldyBBcnJheShvWzBdLmxlbmd0aCkuZmlsbCh7dHlwZToiYWxpZ24iLGFsaWduOiJjIixwcmVnYXA6LjI1LHBvc3RnYXA6LjI1fSksY29sU2VwYXJhdGlvblR5cGU6IkNEIixoTGluZXNCZWZvcmVSb3c6bmV3IEFycmF5KG8ubGVuZ3RoKzEpLmZpbGwoW10pfX0oZS5wYXJzZXIpfSxodG1sQnVpbGRlcjphbixtYXRobWxCdWlsZGVyOmhufSksSnIoIlxcbm9udW1iZXIiLCJcXGdkZWZcXEBlcW5zd3swfSIpLEpyKCJcXG5vdGFnIiwiXFxub251bWJlciIpLG10KHt0eXBlOiJ0ZXh0IixuYW1lczpbIlxcaGxpbmUiLCJcXGhkYXNobGluZSJdLG51bUFyZ3M6MCxhbGxvd2VkSW5UZXh0OiEwLGFsbG93ZWRJbk1hdGg6ITAsaGFuZGxlcihlLHQpe3Rocm93IG5ldyBuKGUuZnVuY05hbWUrIiB2YWxpZCBvbmx5IHdpdGhpbiBhcnJheSBlbnZpcm9ubWVudCIpfX0pO3ZhciB1bj0kcjttdCh7dHlwZToiZW52aXJvbm1lbnQiLG5hbWVzOlsiXFxiZWdpbiIsIlxcZW5kIl0sbnVtQXJnczoxLGFyZ1R5cGVzOlsidGV4dCJdLGhhbmRsZXIoZSx0KXtsZXQgcj1lLnBhcnNlcixvPWUuZnVuY05hbWU7Y29uc3Qgcz10WzBdO2lmKCJvcmRncm91cCIhPT1zLnR5cGUpdGhyb3cgbmV3IG4oIkludmFsaWQgZW52aXJvbm1lbnQgbmFtZSIscyk7bGV0IGk9IiI7Zm9yKGxldCBlPTA7ZTxzLmJvZHkubGVuZ3RoOysrZSlpKz1vcihzLmJvZHlbZV0sInRleHRvcmQiKS50ZXh0O2lmKCJcXGJlZ2luIj09PW8pe2lmKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodW4saSkpdGhyb3cgbmV3IG4oIk5vIHN1Y2ggZW52aXJvbm1lbnQ6ICIraSxzKTtjb25zdCBlPXVuW2ldLHQ9ci5wYXJzZUFyZ3VtZW50cygiXFxiZWdpbnsiK2krIn0iLGUpLG89dC5hcmdzLGw9dC5vcHRBcmdzLGE9e21vZGU6ci5tb2RlLGVudk5hbWU6aSxwYXJzZXI6cn0sYz1lLmhhbmRsZXIoYSxvLGwpO3IuZXhwZWN0KCJcXGVuZCIsITEpO2NvbnN0IGg9ci5uZXh0VG9rZW4sbT1vcihyLnBhcnNlRnVuY3Rpb24oKSwiZW52aXJvbm1lbnQiKTtpZihtLm5hbWUhPT1pKXRocm93IG5ldyBuKCJNaXNtYXRjaDogXFxiZWdpbnsiK2krIn0gbWF0Y2hlZCBieSBcXGVuZHsiK20ubmFtZSsifSIsaCk7cmV0dXJuIGN9cmV0dXJue3R5cGU6ImVudmlyb25tZW50Iixtb2RlOnIubW9kZSxuYW1lOmksbmFtZUdyb3VwOnN9fX0pO2NvbnN0IHBuPXsiXFxCYmIiOiJcXG1hdGhiYiIsIlxcYm9sZCI6IlxcbWF0aGJmIiwiXFxmcmFrIjoiXFxtYXRoZnJhayJ9O210KHt0eXBlOiJmb250IixuYW1lczpbIlxcbWF0aHJtIiwiXFxtYXRoaXQiLCJcXG1hdGhiZiIsIlxcbWF0aG5vcm1hbCIsIlxcbWF0aHNmaXQiLCJcXG1hdGhiYiIsIlxcbWF0aGNhbCIsIlxcbWF0aGZyYWsiLCJcXG1hdGhzY3IiLCJcXG1hdGhzZiIsIlxcbWF0aHR0IiwiXFxCYmIiLCJcXGJvbGQiLCJcXGZyYWsiXSxudW1BcmdzOjEsYWxsb3dlZEluQXJndW1lbnQ6ITAsaGFuZGxlcjooZSx0KT0+e2xldCByPWUucGFyc2VyLG49ZS5mdW5jTmFtZTtjb25zdCBvPXB0KHRbMF0pLHM9biBpbiBwbj9wbltuXTpuO3JldHVybnt0eXBlOiJmb250Iixtb2RlOnIubW9kZSxmb250OnMuc2xpY2UoMSksYm9keTpvfX0saHRtbEJ1aWxkZXI6KGUsdCk9Pntjb25zdCByPWUuZm9udCxuPXQud2l0aEZvbnQocik7cmV0dXJuIE10KGUuYm9keSxuKX0sbWF0aG1sQnVpbGRlcjooZSx0KT0+e2NvbnN0IHI9ZS5mb250LG49dC53aXRoRm9udChyKTtyZXR1cm4gVnQoZS5ib2R5LG4pfX0pLG10KHt0eXBlOiJtY2xhc3MiLG5hbWVzOlsiXFxib2xkc3ltYm9sIiwiXFxibSJdLG51bUFyZ3M6MSxoYW5kbGVyOihlLHQpPT57bGV0IHI9ZS5wYXJzZXI7Y29uc3Qgbj10WzBdO3JldHVybnt0eXBlOiJtY2xhc3MiLG1vZGU6ci5tb2RlLG1jbGFzczptcihuKSxib2R5Olt7dHlwZToiZm9udCIsbW9kZTpyLm1vZGUsZm9udDoiYm9sZHN5bWJvbCIsYm9keTpufV0saXNDaGFyYWN0ZXJCb3g6bShuKX19fSksbXQoe3R5cGU6ImZvbnQiLG5hbWVzOlsiXFxybSIsIlxcc2YiLCJcXHR0IiwiXFxiZiIsIlxcaXQiLCJcXGNhbCJdLG51bUFyZ3M6MCxhbGxvd2VkSW5UZXh0OiEwLGhhbmRsZXI6KGUsdCk9PntsZXQgcj1lLnBhcnNlcixuPWUuZnVuY05hbWUsbz1lLmJyZWFrT25Ub2tlblRleHQ7Y29uc3Qgcz1yLm1vZGUsaT1yLnBhcnNlRXhwcmVzc2lvbighMCxvKTtyZXR1cm57dHlwZToiZm9udCIsbW9kZTpzLGZvbnQ6Im1hdGgiK24uc2xpY2UoMSksYm9keTp7dHlwZToib3JkZ3JvdXAiLG1vZGU6ci5tb2RlLGJvZHk6aX19fX0pO2NvbnN0IGRuPShlLHQpPT57aWYoIXQpcmV0dXJuIGU7cmV0dXJue3R5cGU6InN0eWxpbmciLG1vZGU6ZS5tb2RlLHN0eWxlOnQsYm9keTpbZV19fTttdCh7dHlwZToiZ2VuZnJhYyIsbmFtZXM6WyJcXGNmcmFjIiwiXFxkZnJhYyIsIlxcZnJhYyIsIlxcdGZyYWMiLCJcXGRiaW5vbSIsIlxcYmlub20iLCJcXHRiaW5vbSIsIlxcXFxhdG9wZnJhYyIsIlxcXFxicmFjZWZyYWMiLCJcXFxcYnJhY2tmcmFjIl0sbnVtQXJnczoyLGFsbG93ZWRJbkFyZ3VtZW50OiEwLGhhbmRsZXI6KGUsdCk9PntsZXQgcj1lLnBhcnNlcixuPWUuZnVuY05hbWU7Y29uc3Qgbz10WzBdLHM9dFsxXTtsZXQgaSxsPW51bGwsYT1udWxsO3N3aXRjaChuKXtjYXNlIlxcY2ZyYWMiOmNhc2UiXFxkZnJhYyI6Y2FzZSJcXGZyYWMiOmNhc2UiXFx0ZnJhYyI6aT0hMDticmVhaztjYXNlIlxcXFxhdG9wZnJhYyI6aT0hMTticmVhaztjYXNlIlxcZGJpbm9tIjpjYXNlIlxcYmlub20iOmNhc2UiXFx0Ymlub20iOmk9ITEsbD0iKCIsYT0iKSI7YnJlYWs7Y2FzZSJcXFxcYnJhY2VmcmFjIjppPSExLGw9IlxceyIsYT0iXFx9IjticmVhaztjYXNlIlxcXFxicmFja2ZyYWMiOmk9ITEsbD0iWyIsYT0iXSI7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoIlVucmVjb2duaXplZCBnZW5mcmFjIGNvbW1hbmQiKX1jb25zdCBjPSJcXGNmcmFjIj09PW47bGV0IGg9bnVsbDtyZXR1cm4gY3x8bi5zdGFydHNXaXRoKCJcXGQiKT9oPSJkaXNwbGF5IjpuLnN0YXJ0c1dpdGgoIlxcdCIpJiYoaD0idGV4dCIpLGRuKHt0eXBlOiJnZW5mcmFjIixtb2RlOnIubW9kZSxudW1lcjpvLGRlbm9tOnMsY29udGludWVkOmMsaGFzQmFyTGluZTppLGxlZnREZWxpbTpsLHJpZ2h0RGVsaW06YSxiYXJTaXplOm51bGx9LGgpfSxodG1sQnVpbGRlcjooZSx0KT0+e2NvbnN0IHI9dC5zdHlsZSxuPXIuZnJhY051bSgpLG89ci5mcmFjRGVuKCk7bGV0IHM7cz10LmhhdmluZ1N0eWxlKG4pO2NvbnN0IGk9TXQoZS5udW1lcixzLHQpO2lmKGUuY29udGludWVkKXtjb25zdCBlPTguNS90LmZvbnRNZXRyaWNzKCkucHRQZXJFbSxyPTMuNS90LmZvbnRNZXRyaWNzKCkucHRQZXJFbTtpLmhlaWdodD1pLmhlaWdodDxlP2U6aS5oZWlnaHQsaS5kZXB0aD1pLmRlcHRoPHI/cjppLmRlcHRofXM9dC5oYXZpbmdTdHlsZShvKTtjb25zdCBsPU10KGUuZGVub20scyx0KTtsZXQgYSxjLGgsbSx1LHAsZCxnLGYsYjtpZihlLmhhc0JhckxpbmU/KGUuYmFyU2l6ZT8oYz1PKGUuYmFyU2l6ZSx0KSxhPV9lKCJmcmFjLWxpbmUiLHQsYykpOmE9X2UoImZyYWMtbGluZSIsdCksYz1hLmhlaWdodCxoPWEuaGVpZ2h0KTooYT1udWxsLGM9MCxoPXQuZm9udE1ldHJpY3MoKS5kZWZhdWx0UnVsZVRoaWNrbmVzcyksci5zaXplPT09Uy5ESVNQTEFZLnNpemU/KG09dC5mb250TWV0cmljcygpLm51bTEsdT1jPjA/MypoOjcqaCxwPXQuZm9udE1ldHJpY3MoKS5kZW5vbTEpOihjPjA/KG09dC5mb250TWV0cmljcygpLm51bTIsdT1oKToobT10LmZvbnRNZXRyaWNzKCkubnVtMyx1PTMqaCkscD10LmZvbnRNZXRyaWNzKCkuZGVub20yKSxhKXtjb25zdCBlPXQuZm9udE1ldHJpY3MoKS5heGlzSGVpZ2h0O20taS5kZXB0aC0oZSsuNSpjKTx1JiYobSs9dS0obS1pLmRlcHRoLShlKy41KmMpKSksZS0uNSpjLShsLmhlaWdodC1wKTx1JiYocCs9dS0oZS0uNSpjLShsLmhlaWdodC1wKSkpO2Q9S2Uoe3Bvc2l0aW9uVHlwZToiaW5kaXZpZHVhbFNoaWZ0IixjaGlsZHJlbjpbe3R5cGU6ImVsZW0iLGVsZW06bCxzaGlmdDpwfSx7dHlwZToiZWxlbSIsZWxlbTphLHNoaWZ0Oi0oZS0uNSpjKX0se3R5cGU6ImVsZW0iLGVsZW06aSxzaGlmdDotbX1dfSl9ZWxzZXtjb25zdCBlPW0taS5kZXB0aC0obC5oZWlnaHQtcCk7ZTx1JiYobSs9LjUqKHUtZSkscCs9LjUqKHUtZSkpLGQ9S2Uoe3Bvc2l0aW9uVHlwZToiaW5kaXZpZHVhbFNoaWZ0IixjaGlsZHJlbjpbe3R5cGU6ImVsZW0iLGVsZW06bCxzaGlmdDpwfSx7dHlwZToiZWxlbSIsZWxlbTppLHNoaWZ0Oi1tfV19KX1yZXR1cm4gcz10LmhhdmluZ1N0eWxlKHIpLGQuaGVpZ2h0Kj1zLnNpemVNdWx0aXBsaWVyL3Quc2l6ZU11bHRpcGxpZXIsZC5kZXB0aCo9cy5zaXplTXVsdGlwbGllci90LnNpemVNdWx0aXBsaWVyLGc9ci5zaXplPT09Uy5ESVNQTEFZLnNpemU/dC5mb250TWV0cmljcygpLmRlbGltMTpyLnNpemU9PT1TLlNDUklQVFNDUklQVC5zaXplP3QuaGF2aW5nU3R5bGUoUy5TQ1JJUFQpLmZvbnRNZXRyaWNzKCkuZGVsaW0yOnQuZm9udE1ldHJpY3MoKS5kZWxpbTIsZj1udWxsPT1lLmxlZnREZWxpbT9TdCh0LFsibW9wZW4iXSk6R3IoZS5sZWZ0RGVsaW0sZywhMCx0LmhhdmluZ1N0eWxlKHIpLGUubW9kZSxbIm1vcGVuIl0pLGI9ZS5jb250aW51ZWQ/WWUoW10pOm51bGw9PWUucmlnaHREZWxpbT9TdCh0LFsibWNsb3NlIl0pOkdyKGUucmlnaHREZWxpbSxnLCEwLHQuaGF2aW5nU3R5bGUociksZS5tb2RlLFsibWNsb3NlIl0pLFllKFsibW9yZCJdLmNvbmNhdChzLnNpemluZ0NsYXNzZXModCkpLFtmLFllKFsibWZyYWMiXSxbZF0pLGJdLHQpfSxtYXRobWxCdWlsZGVyOihlLHQpPT57Y29uc3Qgcj1uZXcgQnQoIm1mcmFjIixbVnQoZS5udW1lcix0KSxWdChlLmRlbm9tLHQpXSk7aWYoZS5oYXNCYXJMaW5lKXtpZihlLmJhclNpemUpe2NvbnN0IG49TyhlLmJhclNpemUsdCk7ci5zZXRBdHRyaWJ1dGUoImxpbmV0aGlja25lc3MiLE4obikpfX1lbHNlIHIuc2V0QXR0cmlidXRlKCJsaW5ldGhpY2tuZXNzIiwiMHB4Iik7aWYobnVsbCE9ZS5sZWZ0RGVsaW18fG51bGwhPWUucmlnaHREZWxpbSl7Y29uc3QgdD1bXTtpZihudWxsIT1lLmxlZnREZWxpbSl7Y29uc3Qgcj1uZXcgQnQoIm1vIixbbmV3IHF0KGUubGVmdERlbGltLnJlcGxhY2UoIlxcIiwiIikpXSk7ci5zZXRBdHRyaWJ1dGUoImZlbmNlIiwidHJ1ZSIpLHQucHVzaChyKX1pZih0LnB1c2gociksbnVsbCE9ZS5yaWdodERlbGltKXtjb25zdCByPW5ldyBCdCgibW8iLFtuZXcgcXQoZS5yaWdodERlbGltLnJlcGxhY2UoIlxcIiwiIikpXSk7ci5zZXRBdHRyaWJ1dGUoImZlbmNlIiwidHJ1ZSIpLHQucHVzaChyKX1yZXR1cm4gT3QodCl9cmV0dXJuIHJ9fSksbXQoe3R5cGU6ImluZml4IixuYW1lczpbIlxcb3ZlciIsIlxcY2hvb3NlIiwiXFxhdG9wIiwiXFxicmFjZSIsIlxcYnJhY2siXSxudW1BcmdzOjAsaW5maXg6ITAsaGFuZGxlcihlKXtsZXQgdCxyPWUucGFyc2VyLG49ZS5mdW5jTmFtZSxvPWUudG9rZW47c3dpdGNoKG4pe2Nhc2UiXFxvdmVyIjp0PSJcXGZyYWMiO2JyZWFrO2Nhc2UiXFxjaG9vc2UiOnQ9IlxcYmlub20iO2JyZWFrO2Nhc2UiXFxhdG9wIjp0PSJcXFxcYXRvcGZyYWMiO2JyZWFrO2Nhc2UiXFxicmFjZSI6dD0iXFxcXGJyYWNlZnJhYyI7YnJlYWs7Y2FzZSJcXGJyYWNrIjp0PSJcXFxcYnJhY2tmcmFjIjticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcigiVW5yZWNvZ25pemVkIGluZml4IGdlbmZyYWMgY29tbWFuZCIpfXJldHVybnt0eXBlOiJpbmZpeCIsbW9kZTpyLm1vZGUscmVwbGFjZVdpdGg6dCx0b2tlbjpvfX19KTtjb25zdCBnbj1bImRpc3BsYXkiLCJ0ZXh0Iiwic2NyaXB0Iiwic2NyaXB0c2NyaXB0Il0sZm49ZnVuY3Rpb24oZSl7bGV0IHQ9bnVsbDtyZXR1cm4gZS5sZW5ndGg+MCYmKHQ9ZSx0PSIuIj09PXQ/bnVsbDp0KSx0fTttdCh7dHlwZToiZ2VuZnJhYyIsbmFtZXM6WyJcXGdlbmZyYWMiXSxudW1BcmdzOjYsYWxsb3dlZEluQXJndW1lbnQ6ITAsYXJnVHlwZXM6WyJtYXRoIiwibWF0aCIsInNpemUiLCJ0ZXh0IiwibWF0aCIsIm1hdGgiXSxoYW5kbGVyKGUsdCl7bGV0IHI9ZS5wYXJzZXI7Y29uc3Qgbj10WzRdLG89dFs1XSxzPXB0KHRbMF0pLGk9ImF0b20iPT09cy50eXBlJiYib3BlbiI9PT1zLmZhbWlseT9mbihzLnRleHQpOm51bGwsbD1wdCh0WzFdKSxhPSJhdG9tIj09PWwudHlwZSYmImNsb3NlIj09PWwuZmFtaWx5P2ZuKGwudGV4dCk6bnVsbCxjPW9yKHRbMl0sInNpemUiKTtsZXQgaCxtPW51bGw7Yy5pc0JsYW5rP2g9ITA6KG09Yy52YWx1ZSxoPW0ubnVtYmVyPjApO2xldCB1PW51bGwscD10WzNdO2lmKCJvcmRncm91cCI9PT1wLnR5cGUpe2lmKHAuYm9keS5sZW5ndGg+MCl7Y29uc3QgZT1vcihwLmJvZHlbMF0sInRleHRvcmQiKTt1PWduW051bWJlcihlLnRleHQpXX19ZWxzZSBwPW9yKHAsInRleHRvcmQiKSx1PWduW051bWJlcihwLnRleHQpXTtyZXR1cm4gZG4oe3R5cGU6ImdlbmZyYWMiLG1vZGU6ci5tb2RlLG51bWVyOm4sZGVub206byxjb250aW51ZWQ6ITEsaGFzQmFyTGluZTpoLGJhclNpemU6bSxsZWZ0RGVsaW06aSxyaWdodERlbGltOmF9LHUpfX0pLG10KHt0eXBlOiJpbmZpeCIsbmFtZXM6WyJcXGFib3ZlIl0sbnVtQXJnczoxLGFyZ1R5cGVzOlsic2l6ZSJdLGluZml4OiEwLGhhbmRsZXIoZSx0KXtsZXQgcj1lLnBhcnNlcixuPShlLmZ1bmNOYW1lLGUudG9rZW4pO3JldHVybnt0eXBlOiJpbmZpeCIsbW9kZTpyLm1vZGUscmVwbGFjZVdpdGg6IlxcXFxhYm92ZWZyYWMiLHNpemU6b3IodFswXSwic2l6ZSIpLnZhbHVlLHRva2VuOm59fX0pLG10KHt0eXBlOiJnZW5mcmFjIixuYW1lczpbIlxcXFxhYm92ZWZyYWMiXSxudW1BcmdzOjMsYXJnVHlwZXM6WyJtYXRoIiwic2l6ZSIsIm1hdGgiXSxoYW5kbGVyOihlLHQpPT57bGV0IHI9ZS5wYXJzZXI7ZS5mdW5jTmFtZTtjb25zdCBuPXRbMF0sbz1vcih0WzFdLCJpbmZpeCIpLnNpemU7aWYoIW8pdGhyb3cgbmV3IEVycm9yKCJcXFxcYWJvdmVmcmFjIGV4cGVjdGVkIHNpemUsIGJ1dCBnb3QgIitTdHJpbmcobykpO2NvbnN0IHM9dFsyXSxpPW8ubnVtYmVyPjA7cmV0dXJue3R5cGU6ImdlbmZyYWMiLG1vZGU6ci5tb2RlLG51bWVyOm4sZGVub206cyxjb250aW51ZWQ6ITEsaGFzQmFyTGluZTppLGJhclNpemU6byxsZWZ0RGVsaW06bnVsbCxyaWdodERlbGltOm51bGx9fX0pO2NvbnN0IGJuPShlLHQpPT57Y29uc3Qgcj10LnN0eWxlO2xldCBuLG87InN1cHN1YiI9PT1lLnR5cGU/KG49ZS5zdXA/TXQoZS5zdXAsdC5oYXZpbmdTdHlsZShyLnN1cCgpKSx0KTpNdChlLnN1Yix0LmhhdmluZ1N0eWxlKHIuc3ViKCkpLHQpLG89b3IoZS5iYXNlLCJob3JpekJyYWNlIikpOm89b3IoZSwiaG9yaXpCcmFjZSIpO2NvbnN0IHM9TXQoby5iYXNlLHQuaGF2aW5nQmFzZVN0eWxlKFMuRElTUExBWSkpLGk9dHIobyx0KTtsZXQgbDtpZihsPW8uaXNPdmVyP0tlKHtwb3NpdGlvblR5cGU6ImZpcnN0QmFzZWxpbmUiLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTpzfSx7dHlwZToia2VybiIsc2l6ZTouMX0se3R5cGU6ImVsZW0iLGVsZW06aSx3cmFwcGVyQ2xhc3NlczpbInN2Zy1hbGlnbiJdfV19KTpLZSh7cG9zaXRpb25UeXBlOiJib3R0b20iLHBvc2l0aW9uRGF0YTpzLmRlcHRoKy4xK2kuaGVpZ2h0LGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTppLHdyYXBwZXJDbGFzc2VzOlsic3ZnLWFsaWduIl19LHt0eXBlOiJrZXJuIixzaXplOi4xfSx7dHlwZToiZWxlbSIsZWxlbTpzfV19KSxuKXtjb25zdCBlPVllKFsibWlubmVyIixvLmlzT3Zlcj8ibW92ZXIiOiJtdW5kZXIiXSxbbF0sdCk7bD1vLmlzT3Zlcj9LZSh7cG9zaXRpb25UeXBlOiJmaXJzdEJhc2VsaW5lIixjaGlsZHJlbjpbe3R5cGU6ImVsZW0iLGVsZW06ZX0se3R5cGU6Imtlcm4iLHNpemU6LjJ9LHt0eXBlOiJlbGVtIixlbGVtOm59XX0pOktlKHtwb3NpdGlvblR5cGU6ImJvdHRvbSIscG9zaXRpb25EYXRhOmUuZGVwdGgrLjIrbi5oZWlnaHQrbi5kZXB0aCxjaGlsZHJlbjpbe3R5cGU6ImVsZW0iLGVsZW06bn0se3R5cGU6Imtlcm4iLHNpemU6LjJ9LHt0eXBlOiJlbGVtIixlbGVtOmV9XX0pfXJldHVybiBZZShbIm1pbm5lciIsby5pc092ZXI/Im1vdmVyIjoibXVuZGVyIl0sW2xdLHQpfTttdCh7dHlwZToiaG9yaXpCcmFjZSIsbmFtZXM6WyJcXG92ZXJicmFjZSIsIlxcdW5kZXJicmFjZSIsIlxcb3ZlcmJyYWNrZXQiLCJcXHVuZGVyYnJhY2tldCJdLG51bUFyZ3M6MSxoYW5kbGVyKGUsdCl7bGV0IHI9ZS5wYXJzZXIsbj1lLmZ1bmNOYW1lO3JldHVybnt0eXBlOiJob3JpekJyYWNlIixtb2RlOnIubW9kZSxsYWJlbDpuLGlzT3ZlcjpuLmluY2x1ZGVzKCJcXG92ZXIiKSxiYXNlOnRbMF19fSxodG1sQnVpbGRlcjpibixtYXRobWxCdWlsZGVyOihlLHQpPT57Y29uc3Qgcj1KdChlLmxhYmVsKTtyZXR1cm4gbmV3IEJ0KGUuaXNPdmVyPyJtb3ZlciI6Im11bmRlciIsW1Z0KGUuYmFzZSx0KSxyXSl9fSksbXQoe3R5cGU6ImhyZWYiLG5hbWVzOlsiXFxocmVmIl0sbnVtQXJnczoyLGFyZ1R5cGVzOlsidXJsIiwib3JpZ2luYWwiXSxhbGxvd2VkSW5UZXh0OiEwLGhhbmRsZXI6KGUsdCk9PntsZXQgcj1lLnBhcnNlcjtjb25zdCBuPXRbMV0sbz1vcih0WzBdLCJ1cmwiKS51cmw7cmV0dXJuIHIuc2V0dGluZ3MuaXNUcnVzdGVkKHtjb21tYW5kOiJcXGhyZWYiLHVybDpvfSk/e3R5cGU6ImhyZWYiLG1vZGU6ci5tb2RlLGhyZWY6byxib2R5OmR0KG4pfTpyLmZvcm1hdFVuc3VwcG9ydGVkQ21kKCJcXGhyZWYiKX0saHRtbEJ1aWxkZXI6KGUsdCk9Pntjb25zdCByPXh0KGUuYm9keSx0LCExKTtyZXR1cm4gZnVuY3Rpb24oZSx0LHIsbil7Y29uc3Qgbz1uZXcgaihlLHQscixuKTtyZXR1cm4gWGUobyksb30oZS5ocmVmLFtdLHIsdCl9LG1hdGhtbEJ1aWxkZXI6KGUsdCk9PntsZXQgcj1QdChlLmJvZHksdCk7cmV0dXJuIHIgaW5zdGFuY2VvZiBCdHx8KHI9bmV3IEJ0KCJtcm93Iixbcl0pKSxyLnNldEF0dHJpYnV0ZSgiaHJlZiIsZS5ocmVmKSxyfX0pLG10KHt0eXBlOiJocmVmIixuYW1lczpbIlxcdXJsIl0sbnVtQXJnczoxLGFyZ1R5cGVzOlsidXJsIl0sYWxsb3dlZEluVGV4dDohMCxoYW5kbGVyOihlLHQpPT57bGV0IHI9ZS5wYXJzZXI7Y29uc3Qgbj1vcih0WzBdLCJ1cmwiKS51cmw7aWYoIXIuc2V0dGluZ3MuaXNUcnVzdGVkKHtjb21tYW5kOiJcXHVybCIsdXJsOm59KSlyZXR1cm4gci5mb3JtYXRVbnN1cHBvcnRlZENtZCgiXFx1cmwiKTtjb25zdCBvPVtdO2ZvcihsZXQgZT0wO2U8bi5sZW5ndGg7ZSsrKXtsZXQgdD1uW2VdOyJ+Ij09PXQmJih0PSJcXHRleHRhc2NpaXRpbGRlIiksby5wdXNoKHt0eXBlOiJ0ZXh0b3JkIixtb2RlOiJ0ZXh0Iix0ZXh0OnR9KX1jb25zdCBzPXt0eXBlOiJ0ZXh0Iixtb2RlOnIubW9kZSxmb250OiJcXHRleHR0dCIsYm9keTpvfTtyZXR1cm57dHlwZToiaHJlZiIsbW9kZTpyLm1vZGUsaHJlZjpuLGJvZHk6ZHQocyl9fX0pLG10KHt0eXBlOiJoYm94IixuYW1lczpbIlxcaGJveCJdLG51bUFyZ3M6MSxhcmdUeXBlczpbInRleHQiXSxhbGxvd2VkSW5UZXh0OiEwLHByaW1pdGl2ZTohMCxoYW5kbGVyKGUsdCl7cmV0dXJue3R5cGU6Imhib3giLG1vZGU6ZS5wYXJzZXIubW9kZSxib2R5OmR0KHRbMF0pfX0saHRtbEJ1aWxkZXIoZSx0KXtjb25zdCByPXh0KGUuYm9keSx0LndpdGhGb250KCIiKSwhMSk7cmV0dXJuICRlKHIpfSxtYXRobWxCdWlsZGVyKGUsdCl7cmV0dXJuIG5ldyBCdCgibXJvdyIsRnQoZS5ib2R5LHQud2l0aEZvbnQoIiIpKSl9fSksbXQoe3R5cGU6Imh0bWwiLG5hbWVzOlsiXFxodG1sQ2xhc3MiLCJcXGh0bWxJZCIsIlxcaHRtbFN0eWxlIiwiXFxodG1sRGF0YSJdLG51bUFyZ3M6MixhcmdUeXBlczpbInJhdyIsIm9yaWdpbmFsIl0sYWxsb3dlZEluVGV4dDohMCxoYW5kbGVyOihlLHQpPT57bGV0IHI9ZS5wYXJzZXIsbz1lLmZ1bmNOYW1lO2UudG9rZW47Y29uc3Qgcz1vcih0WzBdLCJyYXciKS5zdHJpbmcsaT10WzFdO2xldCBsO3Iuc2V0dGluZ3Muc3RyaWN0JiZyLnNldHRpbmdzLnJlcG9ydE5vbnN0cmljdCgiaHRtbEV4dGVuc2lvbiIsIkhUTUwgZXh0ZW5zaW9uIGlzIGRpc2FibGVkIG9uIHN0cmljdCBtb2RlIik7Y29uc3QgYT17fTtzd2l0Y2gobyl7Y2FzZSJcXGh0bWxDbGFzcyI6YS5jbGFzcz1zLGw9e2NvbW1hbmQ6IlxcaHRtbENsYXNzIixjbGFzczpzfTticmVhaztjYXNlIlxcaHRtbElkIjphLmlkPXMsbD17Y29tbWFuZDoiXFxodG1sSWQiLGlkOnN9O2JyZWFrO2Nhc2UiXFxodG1sU3R5bGUiOmEuc3R5bGU9cyxsPXtjb21tYW5kOiJcXGh0bWxTdHlsZSIsc3R5bGU6c307YnJlYWs7Y2FzZSJcXGh0bWxEYXRhIjp7Y29uc3QgZT0ieyx9Iix0PVtdO2xldCByPSIiO2ZvcihsZXQgbj0wO248cy5sZW5ndGg7bisrKXMuc3RhcnRzV2l0aChlLG4pPyhyKz0iLCIsbis9ZS5sZW5ndGgtMSk6IiwiPT09c1tuXT8odC5wdXNoKHIpLHI9IiIpOnIrPXNbbl07dC5wdXNoKHIpO2ZvcihsZXQgZT0wO2U8dC5sZW5ndGg7ZSsrKXtjb25zdCByPXRbZV0sbz1yLmluZGV4T2YoIj0iKTtpZihvPDApdGhyb3cgbmV3IG4oIlxcaHRtbERhdGEga2V5L3ZhbHVlICciK3IrIicgbWlzc2luZyBlcXVhbHMgc2lnbiIpO2NvbnN0IHM9ci5zbGljZSgwLG8pLGk9ci5zbGljZShvKzEpO2FbImRhdGEtIitzLnRyaW0oKV09aX1sPXtjb21tYW5kOiJcXGh0bWxEYXRhIixhdHRyaWJ1dGVzOmF9O2JyZWFrfWRlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKCJVbnJlY29nbml6ZWQgaHRtbCBjb21tYW5kIil9cmV0dXJuIHIuc2V0dGluZ3MuaXNUcnVzdGVkKGwpP3t0eXBlOiJodG1sIixtb2RlOnIubW9kZSxhdHRyaWJ1dGVzOmEsYm9keTpkdChpKX06ci5mb3JtYXRVbnN1cHBvcnRlZENtZChvKX0saHRtbEJ1aWxkZXI6KGUsdCk9Pntjb25zdCByPXh0KGUuYm9keSx0LCExKSxuPVsiZW5jbG9zaW5nIl07ZS5hdHRyaWJ1dGVzLmNsYXNzJiZuLnB1c2goLi4uZS5hdHRyaWJ1dGVzLmNsYXNzLnRyaW0oKS5zcGxpdCgvXHMrLykpO2NvbnN0IG89WWUobixyLHQpO2Zvcihjb25zdCB0IG9mIE9iamVjdC5lbnRyaWVzKGUuYXR0cmlidXRlcykpe2NvbnN0IGU9dFswXSxyPXRbMV07ImNsYXNzIiE9PWUmJm8uc2V0QXR0cmlidXRlKGUscil9cmV0dXJuIG99LG1hdGhtbEJ1aWxkZXI6KGUsdCk9PlB0KGUuYm9keSx0KX0pLG10KHt0eXBlOiJodG1sbWF0aG1sIixuYW1lczpbIlxcaHRtbEBtYXRobWwiXSxudW1BcmdzOjIsYWxsb3dlZEluQXJndW1lbnQ6ITAsYWxsb3dlZEluVGV4dDohMCxoYW5kbGVyOihlLHQpPT4oe3R5cGU6Imh0bWxtYXRobWwiLG1vZGU6ZS5wYXJzZXIubW9kZSxodG1sOmR0KHRbMF0pLG1hdGhtbDpkdCh0WzFdKX0pLGh0bWxCdWlsZGVyOihlLHQpPT57Y29uc3Qgcj14dChlLmh0bWwsdCwhMSk7cmV0dXJuICRlKHIpfSxtYXRobWxCdWlsZGVyOihlLHQpPT5QdChlLm1hdGhtbCx0KX0pO2NvbnN0IHluPWZ1bmN0aW9uKGUpe2lmKC9eWy0rXT8gKihcZCsoXC5cZCopP3xcLlxkKykkLy50ZXN0KGUpKXJldHVybntudW1iZXI6K2UsdW5pdDoiYnAifTt7Y29uc3QgdD0vKFstK10/KSAqKFxkKyg/OlwuXGQqKT98XC5cZCspICooW2Etel17Mn0pLy5leGVjKGUpO2lmKCF0KXRocm93IG5ldyBuKCJJbnZhbGlkIHNpemU6ICciK2UrIicgaW4gXFxpbmNsdWRlZ3JhcGhpY3MiKTtjb25zdCByPXtudW1iZXI6Kyh0WzFdK3RbMl0pLHVuaXQ6dFszXX07aWYoIUUocikpdGhyb3cgbmV3IG4oIkludmFsaWQgdW5pdDogJyIrci51bml0KyInIGluIFxcaW5jbHVkZWdyYXBoaWNzLiIpO3JldHVybiByfX07bXQoe3R5cGU6ImluY2x1ZGVncmFwaGljcyIsbmFtZXM6WyJcXGluY2x1ZGVncmFwaGljcyJdLG51bUFyZ3M6MSxudW1PcHRpb25hbEFyZ3M6MSxhcmdUeXBlczpbInJhdyIsInVybCJdLGFsbG93ZWRJblRleHQ6ITEsaGFuZGxlcjooZSx0LHIpPT57bGV0IG89ZS5wYXJzZXIscz17bnVtYmVyOjAsdW5pdDoiZW0ifSxpPXtudW1iZXI6LjksdW5pdDoiZW0ifSxsPXtudW1iZXI6MCx1bml0OiJlbSJ9LGE9IiI7aWYoclswXSl7Y29uc3QgZT1vcihyWzBdLCJyYXciKS5zdHJpbmcuc3BsaXQoIiwiKTtmb3IobGV0IHQ9MDt0PGUubGVuZ3RoO3QrKyl7Y29uc3Qgcj1lW3RdLnNwbGl0KCI9Iik7aWYoMj09PXIubGVuZ3RoKXtjb25zdCBlPXJbMV0udHJpbSgpO3N3aXRjaChyWzBdLnRyaW0oKSl7Y2FzZSJhbHQiOmE9ZTticmVhaztjYXNlIndpZHRoIjpzPXluKGUpO2JyZWFrO2Nhc2UiaGVpZ2h0IjppPXluKGUpO2JyZWFrO2Nhc2UidG90YWxoZWlnaHQiOmw9eW4oZSk7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgbigiSW52YWxpZCBrZXk6ICciK3JbMF0rIicgaW4gXFxpbmNsdWRlZ3JhcGhpY3MuIil9fX19Y29uc3QgYz1vcih0WzBdLCJ1cmwiKS51cmw7cmV0dXJuIiI9PT1hJiYoYT1jLGE9YS5yZXBsYWNlKC9eLipbXFwvXS8sIiIpLGE9YS5zdWJzdHJpbmcoMCxhLmxhc3RJbmRleE9mKCIuIikpKSxvLnNldHRpbmdzLmlzVHJ1c3RlZCh7Y29tbWFuZDoiXFxpbmNsdWRlZ3JhcGhpY3MiLHVybDpjfSk/e3R5cGU6ImluY2x1ZGVncmFwaGljcyIsbW9kZTpvLm1vZGUsYWx0OmEsd2lkdGg6cyxoZWlnaHQ6aSx0b3RhbGhlaWdodDpsLHNyYzpjfTpvLmZvcm1hdFVuc3VwcG9ydGVkQ21kKCJcXGluY2x1ZGVncmFwaGljcyIpfSxodG1sQnVpbGRlcjooZSx0KT0+e2NvbnN0IHI9TyhlLmhlaWdodCx0KTtsZXQgbj0wO2UudG90YWxoZWlnaHQubnVtYmVyPjAmJihuPU8oZS50b3RhbGhlaWdodCx0KS1yKTtsZXQgbz0wO2Uud2lkdGgubnVtYmVyPjAmJihvPU8oZS53aWR0aCx0KSk7Y29uc3Qgcz17aGVpZ2h0Ok4ocituKX07bz4wJiYocy53aWR0aD1OKG8pKSxuPjAmJihzLnZlcnRpY2FsQWxpZ249TigtbikpO2NvbnN0IGk9bmV3IFgoZS5zcmMsZS5hbHQscyk7cmV0dXJuIGkuaGVpZ2h0PXIsaS5kZXB0aD1uLGl9LG1hdGhtbEJ1aWxkZXI6KGUsdCk9Pntjb25zdCByPW5ldyBCdCgibWdseXBoIixbXSk7ci5zZXRBdHRyaWJ1dGUoImFsdCIsZS5hbHQpO2NvbnN0IG49TyhlLmhlaWdodCx0KTtsZXQgbz0wO2lmKGUudG90YWxoZWlnaHQubnVtYmVyPjAmJihvPU8oZS50b3RhbGhlaWdodCx0KS1uLHIuc2V0QXR0cmlidXRlKCJ2YWxpZ24iLE4oLW8pKSksci5zZXRBdHRyaWJ1dGUoImhlaWdodCIsTihuK28pKSxlLndpZHRoLm51bWJlcj4wKXtjb25zdCBuPU8oZS53aWR0aCx0KTtyLnNldEF0dHJpYnV0ZSgid2lkdGgiLE4obikpfXJldHVybiByLnNldEF0dHJpYnV0ZSgic3JjIixlLnNyYykscn19KSxtdCh7dHlwZToia2VybiIsbmFtZXM6WyJcXGtlcm4iLCJcXG1rZXJuIiwiXFxoc2tpcCIsIlxcbXNraXAiXSxudW1BcmdzOjEsYXJnVHlwZXM6WyJzaXplIl0scHJpbWl0aXZlOiEwLGFsbG93ZWRJblRleHQ6ITAsaGFuZGxlcihlLHQpe2xldCByPWUucGFyc2VyLG49ZS5mdW5jTmFtZTtjb25zdCBvPW9yKHRbMF0sInNpemUiKTtpZihyLnNldHRpbmdzLnN0cmljdCl7Y29uc3QgZT0ibSI9PT1uWzFdLHQ9Im11Ij09PW8udmFsdWUudW5pdDtlPyh0fHxyLnNldHRpbmdzLnJlcG9ydE5vbnN0cmljdCgibWF0aFZzVGV4dFVuaXRzIiwiTGFUZVgncyAiK24rIiBzdXBwb3J0cyBvbmx5IG11IHVuaXRzLCBub3QgIitvLnZhbHVlLnVuaXQrIiB1bml0cyIpLCJtYXRoIiE9PXIubW9kZSYmci5zZXR0aW5ncy5yZXBvcnROb25zdHJpY3QoIm1hdGhWc1RleHRVbml0cyIsIkxhVGVYJ3MgIituKyIgd29ya3Mgb25seSBpbiBtYXRoIG1vZGUiKSk6dCYmci5zZXR0aW5ncy5yZXBvcnROb25zdHJpY3QoIm1hdGhWc1RleHRVbml0cyIsIkxhVGVYJ3MgIituKyIgZG9lc24ndCBzdXBwb3J0IG11IHVuaXRzIil9cmV0dXJue3R5cGU6Imtlcm4iLG1vZGU6ci5tb2RlLGRpbWVuc2lvbjpvLnZhbHVlfX0saHRtbEJ1aWxkZXIoZSx0KXtyZXR1cm4gSmUoZS5kaW1lbnNpb24sdCl9LG1hdGhtbEJ1aWxkZXIoZSx0KXtjb25zdCByPU8oZS5kaW1lbnNpb24sdCk7cmV0dXJuIG5ldyBJdChyKX19KSxtdCh7dHlwZToibGFwIixuYW1lczpbIlxcbWF0aGxsYXAiLCJcXG1hdGhybGFwIiwiXFxtYXRoY2xhcCJdLG51bUFyZ3M6MSxhbGxvd2VkSW5UZXh0OiEwLGhhbmRsZXI6KGUsdCk9PntsZXQgcj1lLnBhcnNlcixuPWUuZnVuY05hbWU7Y29uc3Qgbz10WzBdO3JldHVybnt0eXBlOiJsYXAiLG1vZGU6ci5tb2RlLGFsaWdubWVudDpuLnNsaWNlKDUpLGJvZHk6b319LGh0bWxCdWlsZGVyOihlLHQpPT57bGV0IHI7ImNsYXAiPT09ZS5hbGlnbm1lbnQ/KHI9WWUoW10sW010KGUuYm9keSx0KV0pLHI9WWUoWyJrYXRleC1pbm5lciJdLFtyXSx0KSk6cj1ZZShbImthdGV4LWlubmVyIl0sW010KGUuYm9keSx0KV0pO2NvbnN0IG49WWUoWyJrYXRleC1maXgiXSxbXSk7bGV0IG89WWUoW2UuYWxpZ25tZW50XSxbcixuXSx0KTtjb25zdCBzPVllKFsia2F0ZXgtc3RydXQiXSk7cmV0dXJuIHMuc3R5bGUuaGVpZ2h0PU4oby5oZWlnaHQrby5kZXB0aCksby5kZXB0aCYmKHMuc3R5bGUudmVydGljYWxBbGlnbj1OKC1vLmRlcHRoKSksby5jaGlsZHJlbi51bnNoaWZ0KHMpLG89WWUoWyJrYXRleC10aGluYm94Il0sW29dLHQpLFllKFsibW9yZCIsImthdGV4LXZib3giXSxbb10sdCl9LG1hdGhtbEJ1aWxkZXI6KGUsdCk9Pntjb25zdCByPW5ldyBCdCgibXBhZGRlZCIsW1Z0KGUuYm9keSx0KV0pO2lmKCJybGFwIiE9PWUuYWxpZ25tZW50KXtjb25zdCB0PSJsbGFwIj09PWUuYWxpZ25tZW50PyItMSI6Ii0wLjUiO3Iuc2V0QXR0cmlidXRlKCJsc3BhY2UiLHQrIndpZHRoIil9cmV0dXJuIHIuc2V0QXR0cmlidXRlKCJ3aWR0aCIsIjBweCIpLHJ9fSksbXQoe3R5cGU6InN0eWxpbmciLG5hbWVzOlsiXFwoIiwiJCJdLG51bUFyZ3M6MCxhbGxvd2VkSW5UZXh0OiEwLGFsbG93ZWRJbk1hdGg6ITEsaGFuZGxlcihlLHQpe2xldCByPWUuZnVuY05hbWUsbj1lLnBhcnNlcjtjb25zdCBvPW4ubW9kZTtuLnN3aXRjaE1vZGUoIm1hdGgiKTtjb25zdCBzPSJcXCgiPT09cj8iXFwpIjoiJCIsaT1uLnBhcnNlRXhwcmVzc2lvbighMSxzKTtyZXR1cm4gbi5leHBlY3Qocyksbi5zd2l0Y2hNb2RlKG8pLHt0eXBlOiJzdHlsaW5nIixtb2RlOm4ubW9kZSxzdHlsZToidGV4dCIscmVzZXRGb250OiEwLGJvZHk6aX19fSksbXQoe3R5cGU6InRleHQiLG5hbWVzOlsiXFwpIiwiXFxdIl0sbnVtQXJnczowLGFsbG93ZWRJblRleHQ6ITAsYWxsb3dlZEluTWF0aDohMSxoYW5kbGVyKGUsdCl7dGhyb3cgbmV3IG4oIk1pc21hdGNoZWQgIitlLmZ1bmNOYW1lKX19KTtjb25zdCB4bj0oZSx0KT0+e3N3aXRjaCh0LnN0eWxlLnNpemUpe2Nhc2UgUy5ESVNQTEFZLnNpemU6cmV0dXJuIGUuZGlzcGxheTtjYXNlIFMuVEVYVC5zaXplOnJldHVybiBlLnRleHQ7Y2FzZSBTLlNDUklQVC5zaXplOnJldHVybiBlLnNjcmlwdDtjYXNlIFMuU0NSSVBUU0NSSVBULnNpemU6cmV0dXJuIGUuc2NyaXB0c2NyaXB0O2RlZmF1bHQ6cmV0dXJuIGUudGV4dH19O210KHt0eXBlOiJtYXRoY2hvaWNlIixuYW1lczpbIlxcbWF0aGNob2ljZSJdLG51bUFyZ3M6NCxwcmltaXRpdmU6ITAsaGFuZGxlcjooZSx0KT0+KHt0eXBlOiJtYXRoY2hvaWNlIixtb2RlOmUucGFyc2VyLm1vZGUsZGlzcGxheTpkdCh0WzBdKSx0ZXh0OmR0KHRbMV0pLHNjcmlwdDpkdCh0WzJdKSxzY3JpcHRzY3JpcHQ6ZHQodFszXSl9KSxodG1sQnVpbGRlcjooZSx0KT0+e2NvbnN0IHI9eG4oZSx0KSxuPXh0KHIsdCwhMSk7cmV0dXJuICRlKG4pfSxtYXRobWxCdWlsZGVyOihlLHQpPT57Y29uc3Qgcj14bihlLHQpO3JldHVybiBQdChyLHQpfX0pO2NvbnN0IHduPShlLHQscixuLG8scyxpKT0+e2U9WWUoW10sW2VdKTtjb25zdCBsPXImJm0ocik7bGV0IGEsYyxoO2lmKHQpe2NvbnN0IGU9TXQodCxuLmhhdmluZ1N0eWxlKG8uc3VwKCkpLG4pO2M9e2VsZW06ZSxrZXJuOk1hdGgubWF4KG4uZm9udE1ldHJpY3MoKS5iaWdPcFNwYWNpbmcxLG4uZm9udE1ldHJpY3MoKS5iaWdPcFNwYWNpbmczLWUuZGVwdGgpfX1pZihyKXtjb25zdCBlPU10KHIsbi5oYXZpbmdTdHlsZShvLnN1YigpKSxuKTthPXtlbGVtOmUsa2VybjpNYXRoLm1heChuLmZvbnRNZXRyaWNzKCkuYmlnT3BTcGFjaW5nMixuLmZvbnRNZXRyaWNzKCkuYmlnT3BTcGFjaW5nNC1lLmhlaWdodCl9fWlmKGMmJmEpe2NvbnN0IHQ9bi5mb250TWV0cmljcygpLmJpZ09wU3BhY2luZzUrYS5lbGVtLmhlaWdodCthLmVsZW0uZGVwdGgrYS5rZXJuK2UuZGVwdGgraTtoPUtlKHtwb3NpdGlvblR5cGU6ImJvdHRvbSIscG9zaXRpb25EYXRhOnQsY2hpbGRyZW46W3t0eXBlOiJrZXJuIixzaXplOm4uZm9udE1ldHJpY3MoKS5iaWdPcFNwYWNpbmc1fSx7dHlwZToiZWxlbSIsZWxlbTphLmVsZW0sbWFyZ2luTGVmdDpOKC1zKX0se3R5cGU6Imtlcm4iLHNpemU6YS5rZXJufSx7dHlwZToiZWxlbSIsZWxlbTplfSx7dHlwZToia2VybiIsc2l6ZTpjLmtlcm59LHt0eXBlOiJlbGVtIixlbGVtOmMuZWxlbSxtYXJnaW5MZWZ0Ok4ocyl9LHt0eXBlOiJrZXJuIixzaXplOm4uZm9udE1ldHJpY3MoKS5iaWdPcFNwYWNpbmc1fV19KX1lbHNlIGlmKGEpe2NvbnN0IHQ9ZS5oZWlnaHQtaTtoPUtlKHtwb3NpdGlvblR5cGU6InRvcCIscG9zaXRpb25EYXRhOnQsY2hpbGRyZW46W3t0eXBlOiJrZXJuIixzaXplOm4uZm9udE1ldHJpY3MoKS5iaWdPcFNwYWNpbmc1fSx7dHlwZToiZWxlbSIsZWxlbTphLmVsZW0sbWFyZ2luTGVmdDpOKC1zKX0se3R5cGU6Imtlcm4iLHNpemU6YS5rZXJufSx7dHlwZToiZWxlbSIsZWxlbTplfV19KX1lbHNle2lmKCFjKXJldHVybiBlO3tjb25zdCB0PWUuZGVwdGgraTtoPUtlKHtwb3NpdGlvblR5cGU6ImJvdHRvbSIscG9zaXRpb25EYXRhOnQsY2hpbGRyZW46W3t0eXBlOiJlbGVtIixlbGVtOmV9LHt0eXBlOiJrZXJuIixzaXplOmMua2Vybn0se3R5cGU6ImVsZW0iLGVsZW06Yy5lbGVtLG1hcmdpbkxlZnQ6TihzKX0se3R5cGU6Imtlcm4iLHNpemU6bi5mb250TWV0cmljcygpLmJpZ09wU3BhY2luZzV9XX0pfX1jb25zdCB1PVtoXTtpZihhJiYwIT09cyYmIWwpe2NvbnN0IGU9WWUoWyJtc3BhY2UiXSxbXSxuKTtlLnN0eWxlLm1hcmdpblJpZ2h0PU4ocyksdS51bnNoaWZ0KGUpfXJldHVybiBZZShbIm1vcCIsIm9wLWxpbWl0cyJdLHUsbil9LHZuPW5ldyBTZXQoWyJcXHNtYWxsaW50Il0pLGtuPShlLHQpPT57bGV0IHIsbixvLHM9ITE7InN1cHN1YiI9PT1lLnR5cGU/KHI9ZS5zdXAsbj1lLnN1YixvPW9yKGUuYmFzZSwib3AiKSxzPSEwKTpvPW9yKGUsIm9wIik7Y29uc3QgaT10LnN0eWxlO2xldCBsLGEsYz0hMTtpZihpLnNpemU9PT1TLkRJU1BMQVkuc2l6ZSYmby5zeW1ib2wmJiF2bi5oYXMoby5uYW1lKSYmKGM9ITApLG8uc3ltYm9sKXtjb25zdCBlPWM/IlNpemUyLVJlZ3VsYXIiOiJTaXplMS1SZWd1bGFyIjtsZXQgcj0iIjtpZigiXFxvaWludCIhPT1vLm5hbWUmJiJcXG9paWludCIhPT1vLm5hbWV8fChyPW8ubmFtZS5zbGljZSgxKSxvLm5hbWU9Im9paW50Ij09PXI/IlxcaWludCI6IlxcaWlpbnQiKSxsPVBlKG8ubmFtZSxlLCJtYXRoIix0LFsibW9wIiwib3Atc3ltYm9sIixjPyJsYXJnZS1vcCI6InNtYWxsLW9wIl0pLGE9bC5pdGFsaWMsci5sZW5ndGg+MCl7Y29uc3QgZT1ydChyKyJTaXplIisoYz8iMiI6IjEiKSx0KTtsPUtlKHtwb3NpdGlvblR5cGU6ImluZGl2aWR1YWxTaGlmdCIsY2hpbGRyZW46W3t0eXBlOiJlbGVtIixlbGVtOmwsc2hpZnQ6MH0se3R5cGU6ImVsZW0iLGVsZW06ZSxzaGlmdDpjPy4wODowfV19KSxvLm5hbWU9IlxcIityLGwuY2xhc3Nlcy51bnNoaWZ0KCJtb3AiKSxsLml0YWxpYz1hfX1lbHNlIGlmKG8uYm9keSl7Y29uc3QgZT14dChvLmJvZHksdCwhMCk7MT09PWUubGVuZ3RoJiZlWzBdaW5zdGFuY2VvZiBXPyhsPWVbMF0sbC5jbGFzc2VzWzBdPSJtb3AiKTpsPVllKFsibW9wIl0sZSx0KX1lbHNle2NvbnN0IGU9W107Zm9yKGxldCByPTE7cjxvLm5hbWUubGVuZ3RoO3IrKyllLnB1c2goVmUoby5uYW1lW3JdLG8ubW9kZSx0KSk7bD1ZZShbIm1vcCJdLGUsdCl9bGV0IGg9MCxtPTA7dmFyIHU7KGwgaW5zdGFuY2VvZiBXfHwiXFxvaWludCI9PT1vLm5hbWV8fCJcXG9paWludCI9PT1vLm5hbWUpJiYhby5zdXBwcmVzc0Jhc2VTaGlmdCYmKGg9KGwuaGVpZ2h0LWwuZGVwdGgpLzItdC5mb250TWV0cmljcygpLmF4aXNIZWlnaHQsbT1udWxsIT0odT1sLml0YWxpYyk/dTowKTtyZXR1cm4gcz93bihsLHIsbix0LGksbSxoKTooaCYmKGwuc3R5bGUucG9zaXRpb249InJlbGF0aXZlIixsLnN0eWxlLnRvcD1OKGgpKSxsKX0sem49eyJcdTIyMGYiOiJcXHByb2QiLCJcdTIyMTAiOiJcXGNvcHJvZCIsIlx1MjIxMSI6Ilxcc3VtIiwiXHUyMmMwIjoiXFxiaWd3ZWRnZSIsIlx1MjJjMSI6IlxcYmlndmVlIiwiXHUyMmMyIjoiXFxiaWdjYXAiLCJcdTIyYzMiOiJcXGJpZ2N1cCIsIlx1MmEwMCI6IlxcYmlnb2RvdCIsIlx1MmEwMSI6IlxcYmlnb3BsdXMiLCJcdTJhMDIiOiJcXGJpZ290aW1lcyIsIlx1MmEwNCI6IlxcYmlndXBsdXMiLCJcdTJhMDYiOiJcXGJpZ3NxY3VwIn07bXQoe3R5cGU6Im9wIixuYW1lczpbIlxcY29wcm9kIiwiXFxiaWd2ZWUiLCJcXGJpZ3dlZGdlIiwiXFxiaWd1cGx1cyIsIlxcYmlnY2FwIiwiXFxiaWdjdXAiLCJcXGludG9wIiwiXFxwcm9kIiwiXFxzdW0iLCJcXGJpZ290aW1lcyIsIlxcYmlnb3BsdXMiLCJcXGJpZ29kb3QiLCJcXGJpZ3NxY3VwIiwiXFxzbWFsbGludCIsIlx1MjIwZiIsIlx1MjIxMCIsIlx1MjIxMSIsIlx1MjJjMCIsIlx1MjJjMSIsIlx1MjJjMiIsIlx1MjJjMyIsIlx1MmEwMCIsIlx1MmEwMSIsIlx1MmEwMiIsIlx1MmEwNCIsIlx1MmEwNiJdLG51bUFyZ3M6MCxoYW5kbGVyOihlLHQpPT57bGV0IHI9ZS5wYXJzZXIsbj1lLmZ1bmNOYW1lO3JldHVybiAxPT09bi5sZW5ndGgmJihuPXpuW25dKSx7dHlwZToib3AiLG1vZGU6ci5tb2RlLGxpbWl0czohMCxwYXJlbnRJc1N1cFN1YjohMSxzeW1ib2w6ITAsbmFtZTpufX0saHRtbEJ1aWxkZXI6a24sbWF0aG1sQnVpbGRlcjooZSx0KT0+e2xldCByO2lmKGUuc3ltYm9sKXI9bmV3IEJ0KCJtbyIsW0V0KGUubmFtZSxlLm1vZGUpXSksdm4uaGFzKGUubmFtZSkmJnIuc2V0QXR0cmlidXRlKCJsYXJnZW9wIiwiZmFsc2UiKTtlbHNlIGlmKGUuYm9keSlyPW5ldyBCdCgibW8iLEZ0KGUuYm9keSx0KSk7ZWxzZXtyPW5ldyBCdCgibWkiLFtuZXcgcXQoZS5uYW1lLnNsaWNlKDEpKV0pO2NvbnN0IHQ9bmV3IEJ0KCJtbyIsW0V0KCJcdTIwNjEiLCJ0ZXh0IildKTtyPWUucGFyZW50SXNTdXBTdWI/bmV3IEJ0KCJtcm93Iixbcix0XSk6Q3QoW3IsdF0pfXJldHVybiByfX0pLG10KHt0eXBlOiJvcCIsbmFtZXM6WyJcXG1hdGhvcCJdLG51bUFyZ3M6MSxwcmltaXRpdmU6ITAsaGFuZGxlcjooZSx0KT0+e2xldCByPWUucGFyc2VyO2NvbnN0IG49dFswXTtyZXR1cm57dHlwZToib3AiLG1vZGU6ci5tb2RlLGxpbWl0czohMSxwYXJlbnRJc1N1cFN1YjohMSxzeW1ib2w6ITEsYm9keTpkdChuKX19fSk7Y29uc3QgU249eyJcdTIyMmIiOiJcXGludCIsIlx1MjIyYyI6IlxcaWludCIsIlx1MjIyZCI6IlxcaWlpbnQiLCJcdTIyMmUiOiJcXG9pbnQiLCJcdTIyMmYiOiJcXG9paW50IiwiXHUyMjMwIjoiXFxvaWlpbnQifTttdCh7dHlwZToib3AiLG5hbWVzOlsiXFxhcmNzaW4iLCJcXGFyY2NvcyIsIlxcYXJjdGFuIiwiXFxhcmN0ZyIsIlxcYXJjY3RnIiwiXFxhcmciLCJcXGNoIiwiXFxjb3MiLCJcXGNvc2VjIiwiXFxjb3NoIiwiXFxjb3QiLCJcXGNvdGciLCJcXGNvdGgiLCJcXGNzYyIsIlxcY3RnIiwiXFxjdGgiLCJcXGRlZyIsIlxcZGltIiwiXFxleHAiLCJcXGhvbSIsIlxca2VyIiwiXFxsZyIsIlxcbG4iLCJcXGxvZyIsIlxcc2VjIiwiXFxzaW4iLCJcXHNpbmgiLCJcXHNoIiwiXFx0YW4iLCJcXHRhbmgiLCJcXHRnIiwiXFx0aCJdLG51bUFyZ3M6MCxoYW5kbGVyKGUpe2xldCB0PWUucGFyc2VyLHI9ZS5mdW5jTmFtZTtyZXR1cm57dHlwZToib3AiLG1vZGU6dC5tb2RlLGxpbWl0czohMSxwYXJlbnRJc1N1cFN1YjohMSxzeW1ib2w6ITEsbmFtZTpyfX19KSxtdCh7dHlwZToib3AiLG5hbWVzOlsiXFxkZXQiLCJcXGdjZCIsIlxcaW5mIiwiXFxsaW0iLCJcXG1heCIsIlxcbWluIiwiXFxQciIsIlxcc3VwIl0sbnVtQXJnczowLGhhbmRsZXIoZSl7bGV0IHQ9ZS5wYXJzZXIscj1lLmZ1bmNOYW1lO3JldHVybnt0eXBlOiJvcCIsbW9kZTp0Lm1vZGUsbGltaXRzOiEwLHBhcmVudElzU3VwU3ViOiExLHN5bWJvbDohMSxuYW1lOnJ9fX0pLG10KHt0eXBlOiJvcCIsbmFtZXM6WyJcXGludCIsIlxcaWludCIsIlxcaWlpbnQiLCJcXG9pbnQiLCJcXG9paW50IiwiXFxvaWlpbnQiLCJcdTIyMmIiLCJcdTIyMmMiLCJcdTIyMmQiLCJcdTIyMmUiLCJcdTIyMmYiLCJcdTIyMzAiXSxudW1BcmdzOjAsYWxsb3dlZEluQXJndW1lbnQ6ITAsaGFuZGxlcihlKXtsZXQgdD1lLnBhcnNlcixyPWUuZnVuY05hbWU7cmV0dXJuIDE9PT1yLmxlbmd0aCYmKHI9U25bcl0pLHt0eXBlOiJvcCIsbW9kZTp0Lm1vZGUsbGltaXRzOiExLHBhcmVudElzU3VwU3ViOiExLHN5bWJvbDohMCxuYW1lOnJ9fX0pO2NvbnN0IE1uPShlLHQpPT57bGV0IHIsbixvLHMsaT0hMTtpZigic3Vwc3ViIj09PWUudHlwZT8ocj1lLnN1cCxuPWUuc3ViLG89b3IoZS5iYXNlLCJvcGVyYXRvcm5hbWUiKSxpPSEwKTpvPW9yKGUsIm9wZXJhdG9ybmFtZSIpLG8uYm9keS5sZW5ndGg+MCl7Y29uc3QgZT1vLmJvZHkubWFwKGU9Pntjb25zdCB0PSJ0ZXh0ImluIGU/ZS50ZXh0OnZvaWQgMDtyZXR1cm4ic3RyaW5nIj09dHlwZW9mIHQ/e3R5cGU6InRleHRvcmQiLG1vZGU6ZS5tb2RlLHRleHQ6dH06ZX0pLHI9eHQoZSx0LndpdGhGb250KCJtYXRocm0iKSwhMCk7Zm9yKGxldCBlPTA7ZTxyLmxlbmd0aDtlKyspe2NvbnN0IHQ9cltlXTt0IGluc3RhbmNlb2YgVyYmKHQudGV4dD10LnRleHQucmVwbGFjZSgvXHUyMjEyLywiLSIpLnJlcGxhY2UoL1x1MjIxNy8sIioiKSl9cz1ZZShbIm1vcCJdLHIsdCl9ZWxzZSBzPVllKFsibW9wIl0sW10sdCk7cmV0dXJuIGk/d24ocyxyLG4sdCx0LnN0eWxlLDAsMCk6c307ZnVuY3Rpb24gQW4oZSx0LHIpe2NvbnN0IG49eHQoZSx0LCExKSxvPXQuc2l6ZU11bHRpcGxpZXIvci5zaXplTXVsdGlwbGllcjtmb3IobGV0IGU9MDtlPG4ubGVuZ3RoO2UrKyl7Y29uc3Qgcz1uW2VdLmNsYXNzZXMuaW5kZXhPZigia2F0ZXgtc2l6aW5nIik7czwwP0FycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KG5bZV0uY2xhc3Nlcyx0LnNpemluZ0NsYXNzZXMocikpOm5bZV0uY2xhc3Nlc1tzKzFdPT09InJlc2V0LXNpemUiK3Quc2l6ZSYmKG5bZV0uY2xhc3Nlc1tzKzFdPSJyZXNldC1zaXplIityLnNpemUpLG5bZV0uaGVpZ2h0Kj1vLG5bZV0uZGVwdGgqPW99cmV0dXJuICRlKG4pfW10KHt0eXBlOiJvcGVyYXRvcm5hbWUiLG5hbWVzOlsiXFxvcGVyYXRvcm5hbWVAIiwiXFxvcGVyYXRvcm5hbWV3aXRobGltaXRzIl0sbnVtQXJnczoxLGhhbmRsZXI6KGUsdCk9PntsZXQgcj1lLnBhcnNlcixuPWUuZnVuY05hbWU7Y29uc3Qgbz10WzBdO3JldHVybnt0eXBlOiJvcGVyYXRvcm5hbWUiLG1vZGU6ci5tb2RlLGJvZHk6ZHQobyksYWx3YXlzSGFuZGxlU3VwU3ViOiJcXG9wZXJhdG9ybmFtZXdpdGhsaW1pdHMiPT09bixsaW1pdHM6ITEscGFyZW50SXNTdXBTdWI6ITF9fSxodG1sQnVpbGRlcjpNbixtYXRobWxCdWlsZGVyOihlLHQpPT57bGV0IHI9RnQoZS5ib2R5LHQud2l0aEZvbnQoIm1hdGhybSIpKSxuPSEwO2ZvcihsZXQgZT0wO2U8ci5sZW5ndGg7ZSsrKXtjb25zdCB0PXJbZV07aWYodCBpbnN0YW5jZW9mIEl0KTtlbHNlIGlmKHQgaW5zdGFuY2VvZiBCdClzd2l0Y2godC50eXBlKXtjYXNlIm1pIjpjYXNlIm1uIjpjYXNlIm1zcGFjZSI6Y2FzZSJtdGV4dCI6YnJlYWs7Y2FzZSJtbyI6e2NvbnN0IGU9dC5jaGlsZHJlblswXTsxPT09dC5jaGlsZHJlbi5sZW5ndGgmJmUgaW5zdGFuY2VvZiBxdD9lLnRleHQ9ZS50ZXh0LnJlcGxhY2UoL1x1MjIxMi8sIi0iKS5yZXBsYWNlKC9cdTIyMTcvLCIqIik6bj0hMTticmVha31kZWZhdWx0Om49ITF9ZWxzZSBuPSExfWlmKG4pe2NvbnN0IGU9ci5tYXAoZT0+ZS50b1RleHQoKSkuam9pbigiIik7cj1bbmV3IHF0KGUpXX1jb25zdCBvPW5ldyBCdCgibWkiLHIpO28uc2V0QXR0cmlidXRlKCJtYXRodmFyaWFudCIsIm5vcm1hbCIpO2NvbnN0IHM9bmV3IEJ0KCJtbyIsW0V0KCJcdTIwNjEiLCJ0ZXh0IildKTtyZXR1cm4gZS5wYXJlbnRJc1N1cFN1Yj9uZXcgQnQoIm1yb3ciLFtvLHNdKTpDdChbbyxzXSl9fSksSnIoIlxcb3BlcmF0b3JuYW1lIiwiXFxAaWZzdGFyXFxvcGVyYXRvcm5hbWV3aXRobGltaXRzXFxvcGVyYXRvcm5hbWVAIiksdXQoe3R5cGU6Im9yZGdyb3VwIixodG1sQnVpbGRlcihlLHQpe3JldHVybiBlLnNlbWlzaW1wbGU/JGUoeHQoZS5ib2R5LHQsITEpKTpZZShbIm1vcmQiXSx4dChlLmJvZHksdCwhMCksdCl9LG1hdGhtbEJ1aWxkZXIoZSx0KXtyZXR1cm4gUHQoZS5ib2R5LHQsITApfX0pLG10KHt0eXBlOiJvdmVybGluZSIsbmFtZXM6WyJcXG92ZXJsaW5lIl0sbnVtQXJnczoxLGhhbmRsZXIoZSx0KXtsZXQgcj1lLnBhcnNlcjtjb25zdCBuPXRbMF07cmV0dXJue3R5cGU6Im92ZXJsaW5lIixtb2RlOnIubW9kZSxib2R5Om59fSxodG1sQnVpbGRlcihlLHQpe2NvbnN0IHI9TXQoZS5ib2R5LHQuaGF2aW5nQ3JhbXBlZFN0eWxlKCkpLG49X2UoIm92ZXJsaW5lLWxpbmUiLHQpLG89dC5mb250TWV0cmljcygpLmRlZmF1bHRSdWxlVGhpY2tuZXNzLHM9S2Uoe3Bvc2l0aW9uVHlwZToiZmlyc3RCYXNlbGluZSIsY2hpbGRyZW46W3t0eXBlOiJlbGVtIixlbGVtOnJ9LHt0eXBlOiJrZXJuIixzaXplOjMqb30se3R5cGU6ImVsZW0iLGVsZW06bn0se3R5cGU6Imtlcm4iLHNpemU6b31dfSk7cmV0dXJuIFllKFsibW9yZCIsImthdGV4LW92ZXJsaW5lIl0sW3NdLHQpfSxtYXRobWxCdWlsZGVyKGUsdCl7Y29uc3Qgcj1uZXcgQnQoIm1vIixbbmV3IHF0KCJcdTIwM2UiKV0pO3Iuc2V0QXR0cmlidXRlKCJzdHJldGNoeSIsInRydWUiKTtjb25zdCBuPW5ldyBCdCgibW92ZXIiLFtWdChlLmJvZHksdCkscl0pO3JldHVybiBuLnNldEF0dHJpYnV0ZSgiYWNjZW50IiwidHJ1ZSIpLG59fSksbXQoe3R5cGU6InBoYW50b20iLG5hbWVzOlsiXFxwaGFudG9tIl0sbnVtQXJnczoxLGFsbG93ZWRJblRleHQ6ITAsaGFuZGxlcjooZSx0KT0+e2xldCByPWUucGFyc2VyO2NvbnN0IG49dFswXTtyZXR1cm57dHlwZToicGhhbnRvbSIsbW9kZTpyLm1vZGUsYm9keTpkdChuKX19LGh0bWxCdWlsZGVyOihlLHQpPT57Y29uc3Qgcj14dChlLmJvZHksdC53aXRoUGhhbnRvbSgpLCExKTtyZXR1cm4gJGUocil9LG1hdGhtbEJ1aWxkZXI6KGUsdCk9Pntjb25zdCByPUZ0KGUuYm9keSx0KTtyZXR1cm4gbmV3IEJ0KCJtcGhhbnRvbSIscil9fSksSnIoIlxcaHBoYW50b20iLCJcXHNtYXNoe1xccGhhbnRvbXsjMX19IiksbXQoe3R5cGU6InZwaGFudG9tIixuYW1lczpbIlxcdnBoYW50b20iXSxudW1BcmdzOjEsYWxsb3dlZEluVGV4dDohMCxoYW5kbGVyOihlLHQpPT57bGV0IHI9ZS5wYXJzZXI7Y29uc3Qgbj10WzBdO3JldHVybnt0eXBlOiJ2cGhhbnRvbSIsbW9kZTpyLm1vZGUsYm9keTpufX0saHRtbEJ1aWxkZXI6KGUsdCk9Pntjb25zdCByPVllKFsia2F0ZXgtaW5uZXIiXSxbTXQoZS5ib2R5LHQud2l0aFBoYW50b20oKSldKSxuPVllKFsia2F0ZXgtZml4Il0sW10pO3JldHVybiBZZShbIm1vcmQiLCJybGFwIl0sW3Isbl0sdCl9LG1hdGhtbEJ1aWxkZXI6KGUsdCk9Pntjb25zdCByPUZ0KGR0KGUuYm9keSksdCksbj1uZXcgQnQoIm1waGFudG9tIixyKSxvPW5ldyBCdCgibXBhZGRlZCIsW25dKTtyZXR1cm4gby5zZXRBdHRyaWJ1dGUoIndpZHRoIiwiMHB4Iiksb319KSxtdCh7dHlwZToicmFpc2Vib3giLG5hbWVzOlsiXFxyYWlzZWJveCJdLG51bUFyZ3M6MixhcmdUeXBlczpbInNpemUiLCJoYm94Il0sYWxsb3dlZEluVGV4dDohMCxoYW5kbGVyKGUsdCl7bGV0IHI9ZS5wYXJzZXI7Y29uc3Qgbj1vcih0WzBdLCJzaXplIikudmFsdWUsbz10WzFdO3JldHVybnt0eXBlOiJyYWlzZWJveCIsbW9kZTpyLm1vZGUsZHk6bixib2R5Om99fSxodG1sQnVpbGRlcihlLHQpe2NvbnN0IHI9TXQoZS5ib2R5LHQpLG49TyhlLmR5LHQpO3JldHVybiBLZSh7cG9zaXRpb25UeXBlOiJzaGlmdCIscG9zaXRpb25EYXRhOi1uLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTpyfV19KX0sbWF0aG1sQnVpbGRlcihlLHQpe2NvbnN0IHI9bmV3IEJ0KCJtcGFkZGVkIixbVnQoZS5ib2R5LHQpXSksbj1lLmR5Lm51bWJlcitlLmR5LnVuaXQ7cmV0dXJuIHIuc2V0QXR0cmlidXRlKCJ2b2Zmc2V0IixuKSxyfX0pLG10KHt0eXBlOiJpbnRlcm5hbCIsbmFtZXM6WyJcXHJlbGF4Il0sbnVtQXJnczowLGFsbG93ZWRJblRleHQ6ITAsYWxsb3dlZEluQXJndW1lbnQ6ITAsaGFuZGxlcihlKXtyZXR1cm57dHlwZToiaW50ZXJuYWwiLG1vZGU6ZS5wYXJzZXIubW9kZX19fSksbXQoe3R5cGU6InJ1bGUiLG5hbWVzOlsiXFxydWxlIl0sbnVtQXJnczoyLG51bU9wdGlvbmFsQXJnczoxLGFsbG93ZWRJblRleHQ6ITAsYWxsb3dlZEluTWF0aDohMCxhcmdUeXBlczpbInNpemUiLCJzaXplIiwic2l6ZSJdLGhhbmRsZXIoZSx0LHIpe2xldCBuPWUucGFyc2VyO2NvbnN0IG89clswXSxzPW9yKHRbMF0sInNpemUiKSxpPW9yKHRbMV0sInNpemUiKTtyZXR1cm57dHlwZToicnVsZSIsbW9kZTpuLm1vZGUsc2hpZnQ6byYmb3Iobywic2l6ZSIpLnZhbHVlLHdpZHRoOnMudmFsdWUsaGVpZ2h0OmkudmFsdWV9fSxodG1sQnVpbGRlcihlLHQpe2NvbnN0IHI9WWUoWyJtb3JkIiwia2F0ZXgtcnVsZSJdLFtdLHQpLG49TyhlLndpZHRoLHQpLG89TyhlLmhlaWdodCx0KSxzPWUuc2hpZnQ/TyhlLnNoaWZ0LHQpOjA7cmV0dXJuIHIuc3R5bGUuYm9yZGVyUmlnaHRXaWR0aD1OKG4pLHIuc3R5bGUuYm9yZGVyVG9wV2lkdGg9TihvKSxyLnN0eWxlLmJvdHRvbT1OKHMpLHIud2lkdGg9bixyLmhlaWdodD1vK3Msci5kZXB0aD0tcyxyLm1heEZvbnRTaXplPTEuMTI1Km8qdC5zaXplTXVsdGlwbGllcixyfSxtYXRobWxCdWlsZGVyKGUsdCl7Y29uc3Qgcj1PKGUud2lkdGgsdCksbj1PKGUuaGVpZ2h0LHQpLG89ZS5zaGlmdD9PKGUuc2hpZnQsdCk6MCxzPXQuY29sb3ImJnQuZ2V0Q29sb3IoKXx8ImJsYWNrIixpPW5ldyBCdCgibXNwYWNlIik7aS5zZXRBdHRyaWJ1dGUoIm1hdGhiYWNrZ3JvdW5kIixzKSxpLnNldEF0dHJpYnV0ZSgid2lkdGgiLE4ocikpLGkuc2V0QXR0cmlidXRlKCJoZWlnaHQiLE4obikpO2NvbnN0IGw9bmV3IEJ0KCJtcGFkZGVkIixbaV0pO3JldHVybiBvPj0wP2wuc2V0QXR0cmlidXRlKCJoZWlnaHQiLE4obykpOihsLnNldEF0dHJpYnV0ZSgiaGVpZ2h0IixOKG8pKSxsLnNldEF0dHJpYnV0ZSgiZGVwdGgiLE4oLW8pKSksbC5zZXRBdHRyaWJ1dGUoInZvZmZzZXQiLE4obykpLGx9fSk7Y29uc3QgVG49WyJcXHRpbnkiLCJcXHNpeHB0c2l6ZSIsIlxcc2NyaXB0c2l6ZSIsIlxcZm9vdG5vdGVzaXplIiwiXFxzbWFsbCIsIlxcbm9ybWFsc2l6ZSIsIlxcbGFyZ2UiLCJcXExhcmdlIiwiXFxMQVJHRSIsIlxcaHVnZSIsIlxcSHVnZSJdO210KHt0eXBlOiJzaXppbmciLG5hbWVzOlRuLG51bUFyZ3M6MCxhbGxvd2VkSW5UZXh0OiEwLGhhbmRsZXI6KGUsdCk9PntsZXQgcj1lLmJyZWFrT25Ub2tlblRleHQsbj1lLmZ1bmNOYW1lLG89ZS5wYXJzZXI7Y29uc3Qgcz1vLnBhcnNlRXhwcmVzc2lvbighMSxyKTtyZXR1cm57dHlwZToic2l6aW5nIixtb2RlOm8ubW9kZSxzaXplOlRuLmluZGV4T2YobikrMSxib2R5OnN9fSxodG1sQnVpbGRlcjooZSx0KT0+e2NvbnN0IHI9dC5oYXZpbmdTaXplKGUuc2l6ZSk7cmV0dXJuIEFuKGUuYm9keSxyLHQpfSxtYXRobWxCdWlsZGVyOihlLHQpPT57Y29uc3Qgcj10LmhhdmluZ1NpemUoZS5zaXplKSxuPUZ0KGUuYm9keSxyKSxvPW5ldyBCdCgibXN0eWxlIixuKTtyZXR1cm4gby5zZXRBdHRyaWJ1dGUoIm1hdGhzaXplIixOKHIuc2l6ZU11bHRpcGxpZXIpKSxvfX0pLG10KHt0eXBlOiJzbWFzaCIsbmFtZXM6WyJcXHNtYXNoIl0sbnVtQXJnczoxLG51bU9wdGlvbmFsQXJnczoxLGFsbG93ZWRJblRleHQ6ITAsaGFuZGxlcjooZSx0LHIpPT57bGV0IG49ZS5wYXJzZXIsbz0hMSxzPSExO2NvbnN0IGk9clswXSYmb3IoclswXSwib3JkZ3JvdXAiKTtpZihpKXtsZXQgZTtmb3IobGV0IHQ9MDt0PGkuYm9keS5sZW5ndGg7Kyt0KXtpZihlPXNyKGkuYm9keVt0XSkudGV4dCwidCI9PT1lKW89ITA7ZWxzZXtpZigiYiIhPT1lKXtvPSExLHM9ITE7YnJlYWt9cz0hMH19fWVsc2Ugbz0hMCxzPSEwO2NvbnN0IGw9dFswXTtyZXR1cm57dHlwZToic21hc2giLG1vZGU6bi5tb2RlLGJvZHk6bCxzbWFzaEhlaWdodDpvLHNtYXNoRGVwdGg6c319LGh0bWxCdWlsZGVyOihlLHQpPT57Y29uc3Qgcj1ZZShbXSxbTXQoZS5ib2R5LHQpXSk7aWYoIWUuc21hc2hIZWlnaHQmJiFlLnNtYXNoRGVwdGgpcmV0dXJuIHI7aWYoZS5zbWFzaEhlaWdodCYmKHIuaGVpZ2h0PTApLGUuc21hc2hEZXB0aCYmKHIuZGVwdGg9MCksZS5zbWFzaEhlaWdodCYmZS5zbWFzaERlcHRoKXJldHVybiBZZShbIm1vcmQiLCJrYXRleC1zbWFzaCJdLFtyXSx0KTtpZihyLmNoaWxkcmVuKWZvcihsZXQgdD0wO3Q8ci5jaGlsZHJlbi5sZW5ndGg7dCsrKWUuc21hc2hIZWlnaHQmJihyLmNoaWxkcmVuW3RdLmhlaWdodD0wKSxlLnNtYXNoRGVwdGgmJihyLmNoaWxkcmVuW3RdLmRlcHRoPTApO2NvbnN0IG49S2Uoe3Bvc2l0aW9uVHlwZToiZmlyc3RCYXNlbGluZSIsY2hpbGRyZW46W3t0eXBlOiJlbGVtIixlbGVtOnJ9XX0pO3JldHVybiBZZShbIm1vcmQiXSxbbl0sdCl9LG1hdGhtbEJ1aWxkZXI6KGUsdCk9Pntjb25zdCByPW5ldyBCdCgibXBhZGRlZCIsW1Z0KGUuYm9keSx0KV0pO3JldHVybiBlLnNtYXNoSGVpZ2h0JiZyLnNldEF0dHJpYnV0ZSgiaGVpZ2h0IiwiMHB4IiksZS5zbWFzaERlcHRoJiZyLnNldEF0dHJpYnV0ZSgiZGVwdGgiLCIwcHgiKSxyfX0pLG10KHt0eXBlOiJzcXJ0IixuYW1lczpbIlxcc3FydCJdLG51bUFyZ3M6MSxudW1PcHRpb25hbEFyZ3M6MSxoYW5kbGVyKGUsdCxyKXtsZXQgbj1lLnBhcnNlcjtjb25zdCBvPXJbMF0scz10WzBdO3JldHVybnt0eXBlOiJzcXJ0Iixtb2RlOm4ubW9kZSxib2R5OnMsaW5kZXg6b319LGh0bWxCdWlsZGVyKGUsdCl7bGV0IHI9TXQoZS5ib2R5LHQuaGF2aW5nQ3JhbXBlZFN0eWxlKCkpOzA9PT1yLmhlaWdodCYmKHIuaGVpZ2h0PXQuZm9udE1ldHJpY3MoKS54SGVpZ2h0KSxyPVplKHIsdCk7Y29uc3Qgbj10LmZvbnRNZXRyaWNzKCkuZGVmYXVsdFJ1bGVUaGlja25lc3M7bGV0IG89bjt0LnN0eWxlLmlkPFMuVEVYVC5pZCYmKG89dC5mb250TWV0cmljcygpLnhIZWlnaHQpO2xldCBzPW4rby80O2NvbnN0IGk9ZnVuY3Rpb24oZSx0KXtjb25zdCByPXQuaGF2aW5nQmFzZVNpemluZygpLG49VnIoIlxcc3VyZCIsZSpyLnNpemVNdWx0aXBsaWVyLEZyLHIpO2xldCBvPXIuc2l6ZU11bHRpcGxpZXI7Y29uc3Qgcz1NYXRoLm1heCgwLHQubWluUnVsZVRoaWNrbmVzcy10LmZvbnRNZXRyaWNzKCkuc3FydFJ1bGVUaGlja25lc3MpO2xldCBpLGwsYSxjLGg7cmV0dXJuInNtYWxsIj09PW4udHlwZT8oYz0xZTMrMWUzKnMrODAsZTwxP289MTplPDEuNCYmKG89LjcpLGw9KDErcytxcikvbyxhPSgxK3MpL28saT1Jcigic3FydE1haW4iLGwsYyxzLHQpLGkuc3R5bGUubWluV2lkdGg9IjAuODUzZW0iLGg9LjgzMy9vKToibGFyZ2UiPT09bi50eXBlPyhjPTEwODAqT3Jbbi5zaXplXSxhPShPcltuLnNpemVdK3MpL28sbD0oT3Jbbi5zaXplXStzK3FyKS9vLGk9SXIoInNxcnRTaXplIituLnNpemUsbCxjLHMsdCksaS5zdHlsZS5taW5XaWR0aD0iMS4wMmVtIixoPTEvbyk6KGw9ZStzK3FyLGE9ZStzLGM9TWF0aC5mbG9vcigxZTMqZStzKSs4MCxpPUlyKCJzcXJ0VGFsbCIsbCxjLHMsdCksaS5zdHlsZS5taW5XaWR0aD0iMC43NDJlbSIsaD0xLjA1NiksaS5oZWlnaHQ9YSxpLnN0eWxlLmhlaWdodD1OKGwpLHtzcGFuOmksYWR2YW5jZVdpZHRoOmgscnVsZVdpZHRoOih0LmZvbnRNZXRyaWNzKCkuc3FydFJ1bGVUaGlja25lc3Mrcykqb319KHIuaGVpZ2h0K3IuZGVwdGgrcytuLHQpLGw9aS5zcGFuLGE9aS5ydWxlV2lkdGgsYz1pLmFkdmFuY2VXaWR0aCxoPWwuaGVpZ2h0LWE7aD5yLmhlaWdodCtyLmRlcHRoK3MmJihzPShzK2gtci5oZWlnaHQtci5kZXB0aCkvMik7Y29uc3QgbT1sLmhlaWdodC1yLmhlaWdodC1zLWE7ci5zdHlsZS5wYWRkaW5nTGVmdD1OKGMpO2NvbnN0IHU9S2Uoe3Bvc2l0aW9uVHlwZToiZmlyc3RCYXNlbGluZSIsY2hpbGRyZW46W3t0eXBlOiJlbGVtIixlbGVtOnIsd3JhcHBlckNsYXNzZXM6WyJzdmctYWxpZ24iXX0se3R5cGU6Imtlcm4iLHNpemU6LShyLmhlaWdodCttKX0se3R5cGU6ImVsZW0iLGVsZW06bH0se3R5cGU6Imtlcm4iLHNpemU6YX1dfSk7aWYoZS5pbmRleCl7Y29uc3Qgcj10LmhhdmluZ1N0eWxlKFMuU0NSSVBUU0NSSVBUKSxuPU10KGUuaW5kZXgscix0KSxvPS42Kih1LmhlaWdodC11LmRlcHRoKSxzPUtlKHtwb3NpdGlvblR5cGU6InNoaWZ0Iixwb3NpdGlvbkRhdGE6LW8sY2hpbGRyZW46W3t0eXBlOiJlbGVtIixlbGVtOm59XX0pLGk9WWUoWyJrYXRleC1yb290Il0sW3NdKTtyZXR1cm4gWWUoWyJtb3JkIiwic3FydCJdLFtpLHVdLHQpfXJldHVybiBZZShbIm1vcmQiLCJzcXJ0Il0sW3VdLHQpfSxtYXRobWxCdWlsZGVyKGUsdCl7Y29uc3Qgcj1lLmJvZHksbj1lLmluZGV4O3JldHVybiBuP25ldyBCdCgibXJvb3QiLFtWdChyLHQpLFZ0KG4sdCldKTpuZXcgQnQoIm1zcXJ0IixbVnQocix0KV0pfX0pO2NvbnN0IENuPXtkaXNwbGF5OlMuRElTUExBWSx0ZXh0OlMuVEVYVCxzY3JpcHQ6Uy5TQ1JJUFQsc2NyaXB0c2NyaXB0OlMuU0NSSVBUU0NSSVBUfTttdCh7dHlwZToic3R5bGluZyIsbmFtZXM6WyJcXGRpc3BsYXlzdHlsZSIsIlxcdGV4dHN0eWxlIiwiXFxzY3JpcHRzdHlsZSIsIlxcc2NyaXB0c2NyaXB0c3R5bGUiXSxudW1BcmdzOjAsYWxsb3dlZEluVGV4dDohMCxwcmltaXRpdmU6ITAsaGFuZGxlcihlLHQpe2xldCByPWUuYnJlYWtPblRva2VuVGV4dCxuPWUuZnVuY05hbWUsbz1lLnBhcnNlcjtjb25zdCBzPW8ucGFyc2VFeHByZXNzaW9uKCEwLHIpLGk9bi5zbGljZSgxLG4ubGVuZ3RoLTUpO2lmKCEoaSBpbiBDbikpdGhyb3cgbmV3IEVycm9yKCJVbmtub3duIHN0eWxlOiAiK2kpO3JldHVybnt0eXBlOiJzdHlsaW5nIixtb2RlOm8ubW9kZSxzdHlsZTppLGJvZHk6c319LGh0bWxCdWlsZGVyKGUsdCl7Y29uc3Qgcj1DbltlLnN0eWxlXTtsZXQgbj10LmhhdmluZ1N0eWxlKHIpO3JldHVybiBlLnJlc2V0Rm9udCYmKG49bi53aXRoRm9udCgiIikpLEFuKGUuYm9keSxuLHQpfSxtYXRobWxCdWlsZGVyKGUsdCl7Y29uc3Qgcj1DbltlLnN0eWxlXTtsZXQgbj10LmhhdmluZ1N0eWxlKHIpO2UucmVzZXRGb250JiYobj1uLndpdGhGb250KCIiKSk7Y29uc3Qgbz1GdChlLmJvZHksbikscz1uZXcgQnQoIm1zdHlsZSIsbyksaT17ZGlzcGxheTpbIjAiLCJ0cnVlIl0sdGV4dDpbIjAiLCJmYWxzZSJdLHNjcmlwdDpbIjEiLCJmYWxzZSJdLHNjcmlwdHNjcmlwdDpbIjIiLCJmYWxzZSJdfVtlLnN0eWxlXTtyZXR1cm4gcy5zZXRBdHRyaWJ1dGUoInNjcmlwdGxldmVsIixpWzBdKSxzLnNldEF0dHJpYnV0ZSgiZGlzcGxheXN0eWxlIixpWzFdKSxzfX0pO3V0KHt0eXBlOiJzdXBzdWIiLGh0bWxCdWlsZGVyKGUsdCl7Y29uc3Qgcj1mdW5jdGlvbihlLHQpe2NvbnN0IHI9ZS5iYXNlO2lmKHIpcmV0dXJuIm9wIj09PXIudHlwZT9yLmxpbWl0cyYmKHQuc3R5bGUuc2l6ZT09PVMuRElTUExBWS5zaXplfHxyLmFsd2F5c0hhbmRsZVN1cFN1Yik/a246bnVsbDoib3BlcmF0b3JuYW1lIj09PXIudHlwZT9yLmFsd2F5c0hhbmRsZVN1cFN1YiYmKHQuc3R5bGUuc2l6ZT09PVMuRElTUExBWS5zaXplfHxyLmxpbWl0cyk/TW46bnVsbDoiYWNjZW50Ij09PXIudHlwZT9tKHIuYmFzZSk/YXI6bnVsbDoiaG9yaXpCcmFjZSI9PT1yLnR5cGUmJiFlLnN1Yj09PXIuaXNPdmVyP2JuOm51bGw7cmV0dXJuIG51bGx9KGUsdCk7aWYocilyZXR1cm4gcihlLHQpO2NvbnN0IG49ZS5iYXNlLG89ZS5zdXAscz1lLnN1YixpPU10KG4sdCk7bGV0IGwsYTtjb25zdCBjPXQuZm9udE1ldHJpY3MoKTtsZXQgaD0wLHU9MDtjb25zdCBwPW4mJm0obik7aWYobyl7Y29uc3QgZT10LmhhdmluZ1N0eWxlKHQuc3R5bGUuc3VwKCkpO2w9TXQobyxlLHQpLHB8fChoPWkuaGVpZ2h0LWUuZm9udE1ldHJpY3MoKS5zdXBEcm9wKmUuc2l6ZU11bHRpcGxpZXIvdC5zaXplTXVsdGlwbGllcil9aWYocyl7Y29uc3QgZT10LmhhdmluZ1N0eWxlKHQuc3R5bGUuc3ViKCkpO2E9TXQocyxlLHQpLHB8fCh1PWkuZGVwdGgrZS5mb250TWV0cmljcygpLnN1YkRyb3AqZS5zaXplTXVsdGlwbGllci90LnNpemVNdWx0aXBsaWVyKX1sZXQgZDtkPXQuc3R5bGU9PT1TLkRJU1BMQVk/Yy5zdXAxOnQuc3R5bGUuY3JhbXBlZD9jLnN1cDM6Yy5zdXAyO2NvbnN0IGc9dC5zaXplTXVsdGlwbGllcixmPU4oLjUvYy5wdFBlckVtL2cpO2xldCBiLHk9bnVsbDtpZihhKXtjb25zdCB0PWUuYmFzZSYmIm9wIj09PWUuYmFzZS50eXBlJiZlLmJhc2UubmFtZSYmKCJcXG9paW50Ij09PWUuYmFzZS5uYW1lfHwiXFxvaWlpbnQiPT09ZS5iYXNlLm5hbWUpO3ZhciB4O2lmKGkgaW5zdGFuY2VvZiBXfHx0KXk9TigtKG51bGwhPSh4PWkuaXRhbGljKT94OjApKX1pZihsJiZhKXtoPU1hdGgubWF4KGgsZCxsLmRlcHRoKy4yNSpjLnhIZWlnaHQpLHU9TWF0aC5tYXgodSxjLnN1YjIpO2NvbnN0IGU9NCpjLmRlZmF1bHRSdWxlVGhpY2tuZXNzO2lmKGgtbC5kZXB0aC0oYS5oZWlnaHQtdSk8ZSl7dT1lLShoLWwuZGVwdGgpK2EuaGVpZ2h0O2NvbnN0IHQ9LjgqYy54SGVpZ2h0LShoLWwuZGVwdGgpO3Q+MCYmKGgrPXQsdS09dCl9Yj1LZSh7cG9zaXRpb25UeXBlOiJpbmRpdmlkdWFsU2hpZnQiLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTphLHNoaWZ0OnUsbWFyZ2luUmlnaHQ6ZixtYXJnaW5MZWZ0Onl9LHt0eXBlOiJlbGVtIixlbGVtOmwsc2hpZnQ6LWgsbWFyZ2luUmlnaHQ6Zn1dfSl9ZWxzZSBpZihhKXt1PU1hdGgubWF4KHUsYy5zdWIxLGEuaGVpZ2h0LS44KmMueEhlaWdodCk7Yj1LZSh7cG9zaXRpb25UeXBlOiJzaGlmdCIscG9zaXRpb25EYXRhOnUsY2hpbGRyZW46W3t0eXBlOiJlbGVtIixlbGVtOmEsbWFyZ2luTGVmdDp5LG1hcmdpblJpZ2h0OmZ9XX0pfWVsc2V7aWYoIWwpdGhyb3cgbmV3IEVycm9yKCJzdXBzdWIgbXVzdCBoYXZlIGVpdGhlciBzdXAgb3Igc3ViLiIpO2g9TWF0aC5tYXgoaCxkLGwuZGVwdGgrLjI1KmMueEhlaWdodCksYj1LZSh7cG9zaXRpb25UeXBlOiJzaGlmdCIscG9zaXRpb25EYXRhOi1oLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTpsLG1hcmdpblJpZ2h0OmZ9XX0pfWNvbnN0IHc9enQoaSwicmlnaHQiKXx8Im1vcmQiO3JldHVybiBZZShbd10sW2ksWWUoWyJtc3Vwc3ViIl0sW2JdKV0sdCl9LG1hdGhtbEJ1aWxkZXIoZSx0KXtsZXQgcixuLG89ITE7ZS5iYXNlJiYiaG9yaXpCcmFjZSI9PT1lLmJhc2UudHlwZSYmKG49ISFlLnN1cCxuPT09ZS5iYXNlLmlzT3ZlciYmKG89ITAscj1lLmJhc2UuaXNPdmVyKSksIWUuYmFzZXx8Im9wIiE9PWUuYmFzZS50eXBlJiYib3BlcmF0b3JuYW1lIiE9PWUuYmFzZS50eXBlfHwoZS5iYXNlLnBhcmVudElzU3VwU3ViPSEwKTtjb25zdCBzPVtWdChlLmJhc2UsdCldO2xldCBpO2lmKGUuc3ViJiZzLnB1c2goVnQoZS5zdWIsdCkpLGUuc3VwJiZzLnB1c2goVnQoZS5zdXAsdCkpLG8paT1yPyJtb3ZlciI6Im11bmRlciI7ZWxzZSBpZihlLnN1YilpZihlLnN1cCl7Y29uc3Qgcj1lLmJhc2U7aT1yJiYib3AiPT09ci50eXBlJiZyLmxpbWl0cyYmdC5zdHlsZT09PVMuRElTUExBWXx8ciYmIm9wZXJhdG9ybmFtZSI9PT1yLnR5cGUmJnIuYWx3YXlzSGFuZGxlU3VwU3ViJiYodC5zdHlsZT09PVMuRElTUExBWXx8ci5saW1pdHMpPyJtdW5kZXJvdmVyIjoibXN1YnN1cCJ9ZWxzZXtjb25zdCByPWUuYmFzZTtpPXImJiJvcCI9PT1yLnR5cGUmJnIubGltaXRzJiYodC5zdHlsZT09PVMuRElTUExBWXx8ci5hbHdheXNIYW5kbGVTdXBTdWIpfHxyJiYib3BlcmF0b3JuYW1lIj09PXIudHlwZSYmci5hbHdheXNIYW5kbGVTdXBTdWImJihyLmxpbWl0c3x8dC5zdHlsZT09PVMuRElTUExBWSk/Im11bmRlciI6Im1zdWIifWVsc2V7Y29uc3Qgcj1lLmJhc2U7aT1yJiYib3AiPT09ci50eXBlJiZyLmxpbWl0cyYmKHQuc3R5bGU9PT1TLkRJU1BMQVl8fHIuYWx3YXlzSGFuZGxlU3VwU3ViKXx8ciYmIm9wZXJhdG9ybmFtZSI9PT1yLnR5cGUmJnIuYWx3YXlzSGFuZGxlU3VwU3ViJiYoci5saW1pdHN8fHQuc3R5bGU9PT1TLkRJU1BMQVkpPyJtb3ZlciI6Im1zdXAifXJldHVybiBuZXcgQnQoaSxzKX19KSx1dCh7dHlwZToiYXRvbSIsaHRtbEJ1aWxkZXIoZSx0KXtyZXR1cm4gVmUoZS50ZXh0LGUubW9kZSx0LFsibSIrZS5mYW1pbHldKX0sbWF0aG1sQnVpbGRlcihlLHQpe2NvbnN0IHI9bmV3IEJ0KCJtbyIsW0V0KGUudGV4dCxlLm1vZGUpXSk7aWYoImJpbiI9PT1lLmZhbWlseSl7Y29uc3Qgbj1EdChlLHQpOyJib2xkLWl0YWxpYyI9PT1uJiZyLnNldEF0dHJpYnV0ZSgibWF0aHZhcmlhbnQiLG4pfWVsc2UicHVuY3QiPT09ZS5mYW1pbHk/ci5zZXRBdHRyaWJ1dGUoInNlcGFyYXRvciIsInRydWUiKToib3BlbiIhPT1lLmZhbWlseSYmImNsb3NlIiE9PWUuZmFtaWx5fHxyLnNldEF0dHJpYnV0ZSgic3RyZXRjaHkiLCJmYWxzZSIpO3JldHVybiByfX0pO2NvbnN0IEJuPXttaToiaXRhbGljIixtbjoibm9ybWFsIixtdGV4dDoibm9ybWFsIn07dXQoe3R5cGU6Im1hdGhvcmQiLGh0bWxCdWlsZGVyKGUsdCl7cmV0dXJuIEdlKGUsdCl9LG1hdGhtbEJ1aWxkZXIoZSx0KXtjb25zdCByPW5ldyBCdCgibWkiLFtFdChlLnRleHQsZS5tb2RlLHQpXSksbj1EdChlLHQpfHwiaXRhbGljIjtyZXR1cm4gbiE9PUJuW3IudHlwZV0mJnIuc2V0QXR0cmlidXRlKCJtYXRodmFyaWFudCIsbikscn19KSx1dCh7dHlwZToidGV4dG9yZCIsaHRtbEJ1aWxkZXIoZSx0KXtyZXR1cm4gR2UoZSx0KX0sbWF0aG1sQnVpbGRlcihlLHQpe2NvbnN0IHI9RXQoZS50ZXh0LGUubW9kZSx0KSxuPUR0KGUsdCl8fCJub3JtYWwiO2xldCBvO3JldHVybiBvPSJ0ZXh0Ij09PWUubW9kZT9uZXcgQnQoIm10ZXh0Iixbcl0pOi9bMC05XS8udGVzdChlLnRleHQpP25ldyBCdCgibW4iLFtyXSk6IlxccHJpbWUiPT09ZS50ZXh0P25ldyBCdCgibW8iLFtyXSk6bmV3IEJ0KCJtaSIsW3JdKSxuIT09Qm5bby50eXBlXSYmby5zZXRBdHRyaWJ1dGUoIm1hdGh2YXJpYW50IixuKSxvfX0pO2NvbnN0IHFuPW5ldyBNYXAoW1siXFxub2JyZWFrIiwibm9icmVhayJdLFsiXFxhbGxvd2JyZWFrIiwiYWxsb3dicmVhayJdXSksSW49bmV3IE1hcChbWyIgIix7fV0sWyJcXCAiLHt9XSxbIn4iLHtjbGFzc05hbWU6Im5vYnJlYWsifV0sWyJcXHNwYWNlIix7fV0sWyJcXG5vYnJlYWtzcGFjZSIse2NsYXNzTmFtZToibm9icmVhayJ9XV0pO3V0KHt0eXBlOiJzcGFjaW5nIixodG1sQnVpbGRlcihlLHQpe2NvbnN0IHI9SW4uZ2V0KGUudGV4dCksbz1xbi5nZXQoZS50ZXh0KTtpZihyKXtjb25zdCBuPXIuY2xhc3NOYW1lfHwiIjtpZigidGV4dCI9PT1lLm1vZGUpe2NvbnN0IHI9R2UoZSx0KTtyZXR1cm4gci5jbGFzc2VzLnB1c2gobikscn1yZXR1cm4gWWUoWyJtc3BhY2UiLG5dLFtWZShlLnRleHQsZS5tb2RlLHQpXSx0KX1pZihvKXJldHVybiBZZShbIm1zcGFjZSIsb10sW10sdCk7dGhyb3cgbmV3IG4oJ1Vua25vd24gdHlwZSBvZiBzcGFjZSAiJytlLnRleHQrJyInKX0sbWF0aG1sQnVpbGRlcihlLHQpe2xldCByO2lmKCFJbi5oYXMoZS50ZXh0KSl7aWYocW4uaGFzKGUudGV4dCkpcmV0dXJuIG5ldyBCdCgibXNwYWNlIik7dGhyb3cgbmV3IG4oJ1Vua25vd24gdHlwZSBvZiBzcGFjZSAiJytlLnRleHQrJyInKX1yZXR1cm4gcj1uZXcgQnQoIm10ZXh0IixbbmV3IHF0KCJceGEwIildKSxyfX0pO2NvbnN0IFJuPSgpPT57Y29uc3QgZT1uZXcgQnQoIm10ZCIsW10pO3JldHVybiBlLnNldEF0dHJpYnV0ZSgid2lkdGgiLCI1MCUiKSxlfTt1dCh7dHlwZToidGFnIixtYXRobWxCdWlsZGVyKGUsdCl7Y29uc3Qgcj1uZXcgQnQoIm10YWJsZSIsW25ldyBCdCgibXRyIixbUm4oKSxuZXcgQnQoIm10ZCIsW1B0KGUuYm9keSx0KV0pLFJuKCksbmV3IEJ0KCJtdGQiLFtQdChlLnRhZyx0KV0pXSldKTtyZXR1cm4gci5zZXRBdHRyaWJ1dGUoIndpZHRoIiwiMTAwJSIpLHJ9fSk7Y29uc3QgSG49eyJcXHRleHQiOnZvaWQgMCwiXFx0ZXh0cm0iOiJ0ZXh0cm0iLCJcXHRleHRzZiI6InRleHRzZiIsIlxcdGV4dHR0IjoidGV4dHR0IiwiXFx0ZXh0bm9ybWFsIjoidGV4dHJtIn0sRW49eyJcXHRleHRiZiI6InRleHRiZiIsIlxcdGV4dG1kIjoidGV4dG1kIn0sT249eyJcXHRleHRpdCI6InRleHRpdCIsIlxcdGV4dHVwIjoidGV4dHVwIn0sTm49KGUsdCk9Pntjb25zdCByPWUuZm9udDtyZXR1cm4gcj9IbltyXT90LndpdGhUZXh0Rm9udEZhbWlseShIbltyXSk6RW5bcl0/dC53aXRoVGV4dEZvbnRXZWlnaHQoRW5bcl0pOiJcXGVtcGgiPT09cj8idGV4dGl0Ij09PXQuZm9udFNoYXBlP3Qud2l0aFRleHRGb250U2hhcGUoInRleHR1cCIpOnQud2l0aFRleHRGb250U2hhcGUoInRleHRpdCIpOnQud2l0aFRleHRGb250U2hhcGUoT25bcl0pOnR9O210KHt0eXBlOiJ0ZXh0IixuYW1lczpbIlxcdGV4dCIsIlxcdGV4dHJtIiwiXFx0ZXh0c2YiLCJcXHRleHR0dCIsIlxcdGV4dG5vcm1hbCIsIlxcdGV4dGJmIiwiXFx0ZXh0bWQiLCJcXHRleHRpdCIsIlxcdGV4dHVwIiwiXFxlbXBoIl0sbnVtQXJnczoxLGFyZ1R5cGVzOlsidGV4dCJdLGFsbG93ZWRJbkFyZ3VtZW50OiEwLGFsbG93ZWRJblRleHQ6ITAsaGFuZGxlcihlLHQpe2xldCByPWUucGFyc2VyLG49ZS5mdW5jTmFtZTtjb25zdCBvPXRbMF07cmV0dXJue3R5cGU6InRleHQiLG1vZGU6ci5tb2RlLGJvZHk6ZHQobyksZm9udDpufX0saHRtbEJ1aWxkZXIoZSx0KXtjb25zdCByPU5uKGUsdCksbj14dChlLmJvZHksciwhMCk7cmV0dXJuIFllKFsibW9yZCIsInRleHQiXSxuLHIpfSxtYXRobWxCdWlsZGVyKGUsdCl7Y29uc3Qgcj1ObihlLHQpO3JldHVybiBQdChlLmJvZHkscil9fSksbXQoe3R5cGU6InVuZGVybGluZSIsbmFtZXM6WyJcXHVuZGVybGluZSJdLG51bUFyZ3M6MSxhbGxvd2VkSW5UZXh0OiEwLGhhbmRsZXIoZSx0KXtyZXR1cm57dHlwZToidW5kZXJsaW5lIixtb2RlOmUucGFyc2VyLm1vZGUsYm9keTp0WzBdfX0saHRtbEJ1aWxkZXIoZSx0KXtjb25zdCByPU10KGUuYm9keSx0KSxuPV9lKCJ1bmRlcmxpbmUtbGluZSIsdCksbz10LmZvbnRNZXRyaWNzKCkuZGVmYXVsdFJ1bGVUaGlja25lc3Mscz1LZSh7cG9zaXRpb25UeXBlOiJ0b3AiLHBvc2l0aW9uRGF0YTpyLmhlaWdodCxjaGlsZHJlbjpbe3R5cGU6Imtlcm4iLHNpemU6b30se3R5cGU6ImVsZW0iLGVsZW06bn0se3R5cGU6Imtlcm4iLHNpemU6MypvfSx7dHlwZToiZWxlbSIsZWxlbTpyfV19KTtyZXR1cm4gWWUoWyJtb3JkIiwia2F0ZXgtdW5kZXJsaW5lIl0sW3NdLHQpfSxtYXRobWxCdWlsZGVyKGUsdCl7Y29uc3Qgcj1uZXcgQnQoIm1vIixbbmV3IHF0KCJcdTIwM2UiKV0pO3Iuc2V0QXR0cmlidXRlKCJzdHJldGNoeSIsInRydWUiKTtjb25zdCBuPW5ldyBCdCgibXVuZGVyIixbVnQoZS5ib2R5LHQpLHJdKTtyZXR1cm4gbi5zZXRBdHRyaWJ1dGUoImFjY2VudHVuZGVyIiwidHJ1ZSIpLG59fSksbXQoe3R5cGU6InZjZW50ZXIiLG5hbWVzOlsiXFx2Y2VudGVyIl0sbnVtQXJnczoxLGFyZ1R5cGVzOlsib3JpZ2luYWwiXSxhbGxvd2VkSW5UZXh0OiExLGhhbmRsZXIoZSx0KXtyZXR1cm57dHlwZToidmNlbnRlciIsbW9kZTplLnBhcnNlci5tb2RlLGJvZHk6dFswXX19LGh0bWxCdWlsZGVyKGUsdCl7Y29uc3Qgcj1NdChlLmJvZHksdCksbj10LmZvbnRNZXRyaWNzKCkuYXhpc0hlaWdodCxvPS41KihyLmhlaWdodC1uLShyLmRlcHRoK24pKTtyZXR1cm4gS2Uoe3Bvc2l0aW9uVHlwZToic2hpZnQiLHBvc2l0aW9uRGF0YTpvLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTpyfV19KX0sbWF0aG1sQnVpbGRlcihlLHQpe2NvbnN0IHI9bmV3IEJ0KCJtcGFkZGVkIixbVnQoZS5ib2R5LHQpXSxbInZjZW50ZXIiXSk7cmV0dXJuIG5ldyBCdCgibXJvdyIsW3JdKX19KSxtdCh7dHlwZToidmVyYiIsbmFtZXM6WyJcXHZlcmIiXSxudW1BcmdzOjAsYWxsb3dlZEluVGV4dDohMCxoYW5kbGVyKGUsdCxyKXt0aHJvdyBuZXcgbigiXFx2ZXJiIGVuZGVkIGJ5IGVuZCBvZiBsaW5lIGluc3RlYWQgb2YgbWF0Y2hpbmcgZGVsaW1pdGVyIil9LGh0bWxCdWlsZGVyKGUsdCl7Y29uc3Qgcj1EbihlKSxuPVtdLG89dC5oYXZpbmdTdHlsZSh0LnN0eWxlLnRleHQoKSk7Zm9yKGxldCB0PTA7dDxyLmxlbmd0aDt0Kyspe2xldCBzPXJbdF07In4iPT09cyYmKHM9IlxcdGV4dGFzY2lpdGlsZGUiKSxuLnB1c2goUGUocywiVHlwZXdyaXRlci1SZWd1bGFyIixlLm1vZGUsbyxbIm1vcmQiLCJ0ZXh0dHQiXSkpfXJldHVybiBZZShbIm1vcmQiLCJ0ZXh0Il0uY29uY2F0KG8uc2l6aW5nQ2xhc3Nlcyh0KSksamUobiksbyl9LG1hdGhtbEJ1aWxkZXIoZSx0KXtjb25zdCByPW5ldyBxdChEbihlKSksbj1uZXcgQnQoIm10ZXh0Iixbcl0pO3JldHVybiBuLnNldEF0dHJpYnV0ZSgibWF0aHZhcmlhbnQiLCJtb25vc3BhY2UiKSxufX0pO2NvbnN0IERuPWU9PmUuYm9keS5yZXBsYWNlKC8gL2csZS5zdGFyPyJcdTI0MjMiOiJceGEwIik7dmFyIExuPWF0O2NvbnN0IEZuPSJbIFxyXG5cdF0iLFBuPSIoXFxcXFthLXpBLVpAXSspIitGbisiKiIsVm49IltcdTAzMDAtXHUwMzZmXSIsR249bmV3IFJlZ0V4cChWbisiKyQiKSxVbj0iKCIrRm4rIispfFxcXFwoXG58WyBcclx0XStcbj8pWyBcclx0XSp8KFshLVxcW1xcXS1cdTIwMjdcdTIwMmEtXHVkN2ZmXHVmOTAwLVx1ZmZmZl0iK1ZuKyIqfFtcdWQ4MDAtXHVkYmZmXVtcdWRjMDAtXHVkZmZmXSIrVm4rIip8XFxcXHZlcmJcXCooW15dKS4qP1xcNHxcXFxcdmVyYihbXiphLXpBLVpdKS4qP1xcNXwiK1BuKyJ8XFxcXFteXHVkODAwLVx1ZGZmZl0pIjtjbGFzcyBqbntjb25zdHJ1Y3RvcihlLHQpe3RoaXMuaW5wdXQ9dm9pZCAwLHRoaXMuc2V0dGluZ3M9dm9pZCAwLHRoaXMudG9rZW5SZWdleD12b2lkIDAsdGhpcy5jYXRjb2Rlcz12b2lkIDAsdGhpcy5pbnB1dD1lLHRoaXMuc2V0dGluZ3M9dCx0aGlzLnRva2VuUmVnZXg9bmV3IFJlZ0V4cChVbiwiZyIpLHRoaXMuY2F0Y29kZXM9eyIlIjoxNCwifiI6MTN9fXNldENhdGNvZGUoZSx0KXt0aGlzLmNhdGNvZGVzW2VdPXR9bGV4KCl7Y29uc3QgZT10aGlzLmlucHV0LHQ9dGhpcy50b2tlblJlZ2V4Lmxhc3RJbmRleDtpZih0PT09ZS5sZW5ndGgpcmV0dXJuIG5ldyBlbigiRU9GIixuZXcgUXIodGhpcyx0LHQpKTtjb25zdCByPXRoaXMudG9rZW5SZWdleC5leGVjKGUpO2lmKG51bGw9PT1yfHxyLmluZGV4IT09dCl0aHJvdyBuZXcgbigiVW5leHBlY3RlZCBjaGFyYWN0ZXI6ICciK2VbdF0rIiciLG5ldyBlbihlW3RdLG5ldyBRcih0aGlzLHQsdCsxKSkpO2NvbnN0IG89cls2XXx8clszXXx8KHJbMl0/IlxcICI6IiAiKTtpZigxND09PXRoaXMuY2F0Y29kZXNbb10pe2NvbnN0IHQ9ZS5pbmRleE9mKCJcbiIsdGhpcy50b2tlblJlZ2V4Lmxhc3RJbmRleCk7cmV0dXJuLTE9PT10Pyh0aGlzLnRva2VuUmVnZXgubGFzdEluZGV4PWUubGVuZ3RoLHRoaXMuc2V0dGluZ3MucmVwb3J0Tm9uc3RyaWN0KCJjb21tZW50QXRFbmQiLCIlIGNvbW1lbnQgaGFzIG5vIHRlcm1pbmF0aW5nIG5ld2xpbmU7IExhVGVYIHdvdWxkIGZhaWwgYmVjYXVzZSBvZiBjb21tZW50aW5nIHRoZSBlbmQgb2YgbWF0aCBtb2RlIChlLmcuICQpIikpOnRoaXMudG9rZW5SZWdleC5sYXN0SW5kZXg9dCsxLHRoaXMubGV4KCl9cmV0dXJuIG5ldyBlbihvLG5ldyBRcih0aGlzLHQsdGhpcy50b2tlblJlZ2V4Lmxhc3RJbmRleCkpfX1jbGFzcyBYbntjb25zdHJ1Y3RvcihlLHQpe3ZvaWQgMD09PWUmJihlPXt9KSx2b2lkIDA9PT10JiYodD17fSksdGhpcy5jdXJyZW50PXZvaWQgMCx0aGlzLmJ1aWx0aW5zPXZvaWQgMCx0aGlzLnVuZGVmU3RhY2s9dm9pZCAwLHRoaXMuY3VycmVudD10LHRoaXMuYnVpbHRpbnM9ZSx0aGlzLnVuZGVmU3RhY2s9W119YmVnaW5Hcm91cCgpe3RoaXMudW5kZWZTdGFjay5wdXNoKHt9KX1lbmRHcm91cCgpe2lmKDA9PT10aGlzLnVuZGVmU3RhY2subGVuZ3RoKXRocm93IG5ldyBuKCJVbmJhbGFuY2VkIG5hbWVzcGFjZSBkZXN0cnVjdGlvbjogYXR0ZW1wdCB0byBwb3AgZ2xvYmFsIG5hbWVzcGFjZTsgcGxlYXNlIHJlcG9ydCB0aGlzIGFzIGEgYnVnIik7Y29uc3QgZT10aGlzLnVuZGVmU3RhY2sucG9wKCk7Zm9yKGNvbnN0IHQgb2YgT2JqZWN0LmtleXMoZSkpdm9pZCAwPT09ZVt0XT9kZWxldGUgdGhpcy5jdXJyZW50W3RdOnRoaXMuY3VycmVudFt0XT1lW3RdfWVuZEdyb3Vwcygpe2Zvcig7dGhpcy51bmRlZlN0YWNrLmxlbmd0aD4wOyl0aGlzLmVuZEdyb3VwKCl9aGFzKGUpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5jdXJyZW50LGUpfHxPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5idWlsdGlucyxlKX1nZXQoZSl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmN1cnJlbnQsZSk/dGhpcy5jdXJyZW50W2VdOnRoaXMuYnVpbHRpbnNbZV19c2V0KGUsdCxyKXtpZih2b2lkIDA9PT1yJiYocj0hMSkscil7Zm9yKGxldCB0PTA7dDx0aGlzLnVuZGVmU3RhY2subGVuZ3RoO3QrKylkZWxldGUgdGhpcy51bmRlZlN0YWNrW3RdW2VdO3RoaXMudW5kZWZTdGFjay5sZW5ndGg+MCYmKHRoaXMudW5kZWZTdGFja1t0aGlzLnVuZGVmU3RhY2subGVuZ3RoLTFdW2VdPXQpfWVsc2V7Y29uc3QgdD10aGlzLnVuZGVmU3RhY2tbdGhpcy51bmRlZlN0YWNrLmxlbmd0aC0xXTt0JiYhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsZSkmJih0W2VdPXRoaXMuY3VycmVudFtlXSl9bnVsbD09dD9kZWxldGUgdGhpcy5jdXJyZW50W2VdOnRoaXMuY3VycmVudFtlXT10fX12YXIgWW49S3I7SnIoIlxcbm9leHBhbmQiLGZ1bmN0aW9uKGUpe2NvbnN0IHQ9ZS5wb3BUb2tlbigpO3JldHVybiBlLmlzRXhwYW5kYWJsZSh0LnRleHQpJiYodC5ub2V4cGFuZD0hMCx0LnRyZWF0QXNSZWxheD0hMCkse3Rva2VuczpbdF0sbnVtQXJnczowfX0pLEpyKCJcXGV4cGFuZGFmdGVyIixmdW5jdGlvbihlKXtjb25zdCB0PWUucG9wVG9rZW4oKTtyZXR1cm4gZS5leHBhbmRPbmNlKCEwKSx7dG9rZW5zOlt0XSxudW1BcmdzOjB9fSksSnIoIlxcQGZpcnN0b2Z0d28iLGZ1bmN0aW9uKGUpe3JldHVybnt0b2tlbnM6ZS5jb25zdW1lQXJncygyKVswXSxudW1BcmdzOjB9fSksSnIoIlxcQHNlY29uZG9mdHdvIixmdW5jdGlvbihlKXtyZXR1cm57dG9rZW5zOmUuY29uc3VtZUFyZ3MoMilbMV0sbnVtQXJnczowfX0pLEpyKCJcXEBpZm5leHRjaGFyIixmdW5jdGlvbihlKXtjb25zdCB0PWUuY29uc3VtZUFyZ3MoMyk7ZS5jb25zdW1lU3BhY2VzKCk7Y29uc3Qgcj1lLmZ1dHVyZSgpO3JldHVybiAxPT09dFswXS5sZW5ndGgmJnRbMF1bMF0udGV4dD09PXIudGV4dD97dG9rZW5zOnRbMV0sbnVtQXJnczowfTp7dG9rZW5zOnRbMl0sbnVtQXJnczowfX0pLEpyKCJcXEBpZnN0YXIiLCJcXEBpZm5leHRjaGFyICp7XFxAZmlyc3RvZnR3b3sjMX19IiksSnIoIlxcVGV4dE9yTWF0aCIsZnVuY3Rpb24oZSl7Y29uc3QgdD1lLmNvbnN1bWVBcmdzKDIpO3JldHVybiJ0ZXh0Ij09PWUubW9kZT97dG9rZW5zOnRbMF0sbnVtQXJnczowfTp7dG9rZW5zOnRbMV0sbnVtQXJnczowfX0pO2NvbnN0IFduPXswOjAsMToxLDI6MiwzOjMsNDo0LDU6NSw2OjYsNzo3LDg6OCw5OjksYToxMCxBOjEwLGI6MTEsQjoxMSxjOjEyLEM6MTIsZDoxMyxEOjEzLGU6MTQsRToxNCxmOjE1LEY6MTV9O0pyKCJcXGNoYXIiLGZ1bmN0aW9uKGUpe2xldCB0LHI9ZS5wb3BUb2tlbigpLG89MDtpZigiJyI9PT1yLnRleHQpdD04LHI9ZS5wb3BUb2tlbigpO2Vsc2UgaWYoJyInPT09ci50ZXh0KXQ9MTYscj1lLnBvcFRva2VuKCk7ZWxzZSBpZigiYCI9PT1yLnRleHQpaWYocj1lLnBvcFRva2VuKCksIlxcIj09PXIudGV4dFswXSlvPXIudGV4dC5jaGFyQ29kZUF0KDEpO2Vsc2V7aWYoIkVPRiI9PT1yLnRleHQpdGhyb3cgbmV3IG4oIlxcY2hhcmAgbWlzc2luZyBhcmd1bWVudCIpO289ci50ZXh0LmNoYXJDb2RlQXQoMCl9ZWxzZSB0PTEwO2lmKHQpe2lmKG89V25bci50ZXh0XSxudWxsPT1vfHxvPj10KXRocm93IG5ldyBuKCJJbnZhbGlkIGJhc2UtIit0KyIgZGlnaXQgIityLnRleHQpO2xldCBzO2Zvcig7bnVsbCE9KHM9V25bZS5mdXR1cmUoKS50ZXh0XSkmJnM8dDspbyo9dCxvKz1zLGUucG9wVG9rZW4oKX1yZXR1cm4iXFxAY2hhcnsiK28rIn0ifSk7Y29uc3QgX249KGUsdCxyLG8pPT57bGV0IHM9ZS5jb25zdW1lQXJnKCkudG9rZW5zO2lmKDEhPT1zLmxlbmd0aCl0aHJvdyBuZXcgbigiXFxuZXdjb21tYW5kJ3MgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIG1hY3JvIG5hbWUiKTtjb25zdCBpPXNbMF0udGV4dCxsPWUuaXNEZWZpbmVkKGkpO2lmKGwmJiF0KXRocm93IG5ldyBuKCJcXG5ld2NvbW1hbmR7IitpKyJ9IGF0dGVtcHRpbmcgdG8gcmVkZWZpbmUgIitpKyI7IHVzZSBcXHJlbmV3Y29tbWFuZCIpO2lmKCFsJiYhcil0aHJvdyBuZXcgbigiXFxyZW5ld2NvbW1hbmR7IitpKyJ9IHdoZW4gY29tbWFuZCAiK2krIiBkb2VzIG5vdCB5ZXQgZXhpc3Q7IHVzZSBcXG5ld2NvbW1hbmQiKTtsZXQgYT0wO2lmKHM9ZS5jb25zdW1lQXJnKCkudG9rZW5zLDE9PT1zLmxlbmd0aCYmIlsiPT09c1swXS50ZXh0KXtsZXQgdD0iIixyPWUuZXhwYW5kTmV4dFRva2VuKCk7Zm9yKDsiXSIhPT1yLnRleHQmJiJFT0YiIT09ci50ZXh0Oyl0Kz1yLnRleHQscj1lLmV4cGFuZE5leHRUb2tlbigpO2lmKCF0Lm1hdGNoKC9eXHMqWzAtOV0rXHMqJC8pKXRocm93IG5ldyBuKCJJbnZhbGlkIG51bWJlciBvZiBhcmd1bWVudHM6ICIrdCk7YT1wYXJzZUludCh0KSxzPWUuY29uc3VtZUFyZygpLnRva2Vuc31yZXR1cm4gbCYmb3x8ZS5tYWNyb3Muc2V0KGkse3Rva2VuczpzLG51bUFyZ3M6YX0pLCIifTtKcigiXFxuZXdjb21tYW5kIixlPT5fbihlLCExLCEwLCExKSksSnIoIlxccmVuZXdjb21tYW5kIixlPT5fbihlLCEwLCExLCExKSksSnIoIlxccHJvdmlkZWNvbW1hbmQiLGU9Pl9uKGUsITAsITAsITApKSxKcigiXFxtZXNzYWdlIixlPT57Y29uc3QgdD1lLmNvbnN1bWVBcmdzKDEpWzBdO3JldHVybiBjb25zb2xlLmxvZyh0LnJldmVyc2UoKS5tYXAoZT0+ZS50ZXh0KS5qb2luKCIiKSksIiJ9KSxKcigiXFxlcnJtZXNzYWdlIixlPT57Y29uc3QgdD1lLmNvbnN1bWVBcmdzKDEpWzBdO3JldHVybiBjb25zb2xlLmVycm9yKHQucmV2ZXJzZSgpLm1hcChlPT5lLnRleHQpLmpvaW4oIiIpKSwiIn0pLEpyKCJcXHNob3ciLGU9Pntjb25zdCB0PWUucG9wVG9rZW4oKSxyPXQudGV4dDtyZXR1cm4gY29uc29sZS5sb2codCxlLm1hY3Jvcy5nZXQociksTG5bcl0sbmUubWF0aFtyXSxuZS50ZXh0W3JdKSwiIn0pLEpyKCJcXGJncm91cCIsInsiKSxKcigiXFxlZ3JvdXAiLCJ9IiksSnIoIn4iLCJcXG5vYnJlYWtzcGFjZSIpLEpyKCJcXGxxIiwiYCIpLEpyKCJcXHJxIiwiJyIpLEpyKCJcXGFhIiwiXFxyIGEiKSxKcigiXFxBQSIsIlxcciBBIiksSnIoIlxcdGV4dGNvcHlyaWdodCIsIlxcaHRtbEBtYXRobWx7XFx0ZXh0Y2lyY2xlZHtjfX17XFxjaGFyYFx4YTl9IiksSnIoIlxcY29weXJpZ2h0IiwiXFxUZXh0T3JNYXRoe1xcdGV4dGNvcHlyaWdodH17XFx0ZXh0e1xcdGV4dGNvcHlyaWdodH19IiksSnIoIlxcdGV4dHJlZ2lzdGVyZWQiLCJcXGh0bWxAbWF0aG1se1xcdGV4dGNpcmNsZWR7XFxzY3JpcHRzaXplIFJ9fXtcXGNoYXJgXHhhZX0iKSxKcigiXHUyMTJjIiwiXFxtYXRoc2Nye0J9IiksSnIoIlx1MjEzMCIsIlxcbWF0aHNjcntFfSIpLEpyKCJcdTIxMzEiLCJcXG1hdGhzY3J7Rn0iKSxKcigiXHUyMTBiIiwiXFxtYXRoc2Nye0h9IiksSnIoIlx1MjExMCIsIlxcbWF0aHNjcntJfSIpLEpyKCJcdTIxMTIiLCJcXG1hdGhzY3J7TH0iKSxKcigiXHUyMTMzIiwiXFxtYXRoc2Nye019IiksSnIoIlx1MjExYiIsIlxcbWF0aHNjcntSfSIpLEpyKCJcdTIxMmQiLCJcXG1hdGhmcmFre0N9IiksSnIoIlx1MjEwYyIsIlxcbWF0aGZyYWt7SH0iKSxKcigiXHUyMTI4IiwiXFxtYXRoZnJha3tafSIpLEpyKCJcXEJiYmsiLCJcXEJiYntrfSIpLEpyKCJcXGxsYXAiLCJcXG1hdGhsbGFwe1xcdGV4dHJteyMxfX0iKSxKcigiXFxybGFwIiwiXFxtYXRocmxhcHtcXHRleHRybXsjMX19IiksSnIoIlxcY2xhcCIsIlxcbWF0aGNsYXB7XFx0ZXh0cm17IzF9fSIpLEpyKCJcXG1hdGhzdHJ1dCIsIlxcdnBoYW50b217KH0iKSxKcigiXFx1bmRlcmJhciIsIlxcdW5kZXJsaW5le1xcdGV4dHsjMX19IiksSnIoIlxcbm90IiwnXFxodG1sQG1hdGhtbHtcXG1hdGhyZWx7XFxtYXRocmxhcFxcQG5vdH1cXG5vYnJlYWt9e1xcY2hhciIzMzh9JyksSnIoIlxcbmVxIiwiXFxodG1sQG1hdGhtbHtcXG1hdGhyZWx7XFxub3Q9fX17XFxtYXRocmVse1xcY2hhcmBcdTIyNjB9fSIpLEpyKCJcXG5lIiwiXFxuZXEiKSxKcigiXHUyMjYwIiwiXFxuZXEiKSxKcigiXFxub3RpbiIsIlxcaHRtbEBtYXRobWx7XFxtYXRocmVse3tcXGlufVxcbWF0aGxsYXB7L1xcbXNraXAxbXV9fX17XFxtYXRocmVse1xcY2hhcmBcdTIyMDl9fSIpLEpyKCJcdTIyMDkiLCJcXG5vdGluIiksSnIoIlx1MjI1OCIsIlxcaHRtbEBtYXRobWx7XFxtYXRocmVsez1cXGtlcm57LTFlbX1cXHJhaXNlYm94ezAuNGVtfXskXFxzY3JpcHRzaXplXFxmcm93biR9fX17XFxtYXRocmVse1xcY2hhcmBcdTIyNTh9fSIpLEpyKCJcdTIyNTkiLCJcXGh0bWxAbWF0aG1se1xcc3RhY2tyZWx7XFx0aW55XFx3ZWRnZX17PX19e1xcbWF0aHJlbHtcXGNoYXJgXHUyMjU4fX0iKSxKcigiXHUyMjVhIiwiXFxodG1sQG1hdGhtbHtcXHN0YWNrcmVse1xcdGlueVxcdmVlfXs9fX17XFxtYXRocmVse1xcY2hhcmBcdTIyNWF9fSIpLEpyKCJcdTIyNWIiLCJcXGh0bWxAbWF0aG1se1xcc3RhY2tyZWx7XFxzY3JpcHRzaXplXFxzdGFyfXs9fX17XFxtYXRocmVse1xcY2hhcmBcdTIyNWJ9fSIpLEpyKCJcdTIyNWQiLCJcXGh0bWxAbWF0aG1se1xcc3RhY2tyZWx7XFx0aW55XFxtYXRocm17ZGVmfX17PX19e1xcbWF0aHJlbHtcXGNoYXJgXHUyMjVkfX0iKSxKcigiXHUyMjVlIiwiXFxodG1sQG1hdGhtbHtcXHN0YWNrcmVse1xcdGlueVxcbWF0aHJte219fXs9fX17XFxtYXRocmVse1xcY2hhcmBcdTIyNWV9fSIpLEpyKCJcdTIyNWYiLCJcXGh0bWxAbWF0aG1se1xcc3RhY2tyZWx7XFx0aW55P317PX19e1xcbWF0aHJlbHtcXGNoYXJgXHUyMjVmfX0iKSxKcigiXHUyN2MyIiwiXFxwZXJwIiksSnIoIlx1MjAzYyIsIlxcbWF0aGNsb3NleyFcXG1rZXJuLTAuOG11IX0iKSxKcigiXHUyMjBjIiwiXFxub3RuaSIpLEpyKCJcdTIzMWMiLCJcXHVsY29ybmVyIiksSnIoIlx1MjMxZCIsIlxcdXJjb3JuZXIiKSxKcigiXHUyMzFlIiwiXFxsbGNvcm5lciIpLEpyKCJcdTIzMWYiLCJcXGxyY29ybmVyIiksSnIoIlx4YTkiLCJcXGNvcHlyaWdodCIpLEpyKCJceGFlIiwiXFx0ZXh0cmVnaXN0ZXJlZCIpLEpyKCJcXHVsY29ybmVyIiwnXFxodG1sQG1hdGhtbHtcXEB1bGNvcm5lcn17XFxtYXRob3B7XFxjaGFyIjIzMWN9fScpLEpyKCJcXHVyY29ybmVyIiwnXFxodG1sQG1hdGhtbHtcXEB1cmNvcm5lcn17XFxtYXRob3B7XFxjaGFyIjIzMWR9fScpLEpyKCJcXGxsY29ybmVyIiwnXFxodG1sQG1hdGhtbHtcXEBsbGNvcm5lcn17XFxtYXRob3B7XFxjaGFyIjIzMWV9fScpLEpyKCJcXGxyY29ybmVyIiwnXFxodG1sQG1hdGhtbHtcXEBscmNvcm5lcn17XFxtYXRob3B7XFxjaGFyIjIzMWZ9fScpLEpyKCJcXHZkb3RzIiwie1xcdmFydmRvdHNcXHJ1bGV7MHB0fXsxNXB0fX0iKSxKcigiXHUyMmVlIiwiXFx2ZG90cyIpLEpyKCJcXHZhckdhbW1hIiwiXFxtYXRoaXR7XFxHYW1tYX0iKSxKcigiXFx2YXJEZWx0YSIsIlxcbWF0aGl0e1xcRGVsdGF9IiksSnIoIlxcdmFyVGhldGEiLCJcXG1hdGhpdHtcXFRoZXRhfSIpLEpyKCJcXHZhckxhbWJkYSIsIlxcbWF0aGl0e1xcTGFtYmRhfSIpLEpyKCJcXHZhclhpIiwiXFxtYXRoaXR7XFxYaX0iKSxKcigiXFx2YXJQaSIsIlxcbWF0aGl0e1xcUGl9IiksSnIoIlxcdmFyU2lnbWEiLCJcXG1hdGhpdHtcXFNpZ21hfSIpLEpyKCJcXHZhclVwc2lsb24iLCJcXG1hdGhpdHtcXFVwc2lsb259IiksSnIoIlxcdmFyUGhpIiwiXFxtYXRoaXR7XFxQaGl9IiksSnIoIlxcdmFyUHNpIiwiXFxtYXRoaXR7XFxQc2l9IiksSnIoIlxcdmFyT21lZ2EiLCJcXG1hdGhpdHtcXE9tZWdhfSIpLEpyKCJcXHN1YnN0YWNrIiwiXFxiZWdpbntzdWJhcnJheX17Y30jMVxcZW5ke3N1YmFycmF5fSIpLEpyKCJcXGNvbG9uIiwiXFxub2JyZWFrXFxtc2tpcDJtdVxcbWF0aHB1bmN0e31cXG1hdGhjaG9pY2V7XFxta2Vybi0zbXV9e1xcbWtlcm4tM211fXt9e317On1cXG1za2lwNm11XFxyZWxheCIpLEpyKCJcXGJveGVkIiwiXFxmYm94eyRcXGRpc3BsYXlzdHlsZXsjMX0kfSIpLEpyKCJcXGlmZiIsIlxcRE9UU0JcXDtcXExvbmdsZWZ0cmlnaHRhcnJvd1xcOyIpLEpyKCJcXGltcGxpZXMiLCJcXERPVFNCXFw7XFxMb25ncmlnaHRhcnJvd1xcOyIpLEpyKCJcXGltcGxpZWRieSIsIlxcRE9UU0JcXDtcXExvbmdsZWZ0YXJyb3dcXDsiKSxKcigiXFxkZGRvdCIsIntcXG92ZXJzZXR7XFxyYWlzZWJveHstMC4xZXh9e1xcbm9ybWFsc2l6ZSAuLi59fXsjMX19IiksSnIoIlxcZGRkZG90Iiwie1xcb3ZlcnNldHtcXHJhaXNlYm94ey0wLjFleH17XFxub3JtYWxzaXplIC4uLi59fXsjMX19Iik7Y29uc3QgJG49eyIsIjoiXFxkb3RzYyIsIlxcbm90IjoiXFxkb3RzYiIsIisiOiJcXGRvdHNiIiwiPSI6IlxcZG90c2IiLCI8IjoiXFxkb3RzYiIsIj4iOiJcXGRvdHNiIiwiLSI6IlxcZG90c2IiLCIqIjoiXFxkb3RzYiIsIjoiOiJcXGRvdHNiIiwiXFxET1RTQiI6IlxcZG90c2IiLCJcXGNvcHJvZCI6IlxcZG90c2IiLCJcXGJpZ3ZlZSI6IlxcZG90c2IiLCJcXGJpZ3dlZGdlIjoiXFxkb3RzYiIsIlxcYmlndXBsdXMiOiJcXGRvdHNiIiwiXFxiaWdjYXAiOiJcXGRvdHNiIiwiXFxiaWdjdXAiOiJcXGRvdHNiIiwiXFxwcm9kIjoiXFxkb3RzYiIsIlxcc3VtIjoiXFxkb3RzYiIsIlxcYmlnb3RpbWVzIjoiXFxkb3RzYiIsIlxcYmlnb3BsdXMiOiJcXGRvdHNiIiwiXFxiaWdvZG90IjoiXFxkb3RzYiIsIlxcYmlnc3FjdXAiOiJcXGRvdHNiIiwiXFxBbmQiOiJcXGRvdHNiIiwiXFxsb25ncmlnaHRhcnJvdyI6IlxcZG90c2IiLCJcXExvbmdyaWdodGFycm93IjoiXFxkb3RzYiIsIlxcbG9uZ2xlZnRhcnJvdyI6IlxcZG90c2IiLCJcXExvbmdsZWZ0YXJyb3ciOiJcXGRvdHNiIiwiXFxsb25nbGVmdHJpZ2h0YXJyb3ciOiJcXGRvdHNiIiwiXFxMb25nbGVmdHJpZ2h0YXJyb3ciOiJcXGRvdHNiIiwiXFxtYXBzdG8iOiJcXGRvdHNiIiwiXFxsb25nbWFwc3RvIjoiXFxkb3RzYiIsIlxcaG9va3JpZ2h0YXJyb3ciOiJcXGRvdHNiIiwiXFxkb3RlcSI6IlxcZG90c2IiLCJcXG1hdGhiaW4iOiJcXGRvdHNiIiwiXFxtYXRocmVsIjoiXFxkb3RzYiIsIlxccmVsYmFyIjoiXFxkb3RzYiIsIlxcUmVsYmFyIjoiXFxkb3RzYiIsIlxceHJpZ2h0YXJyb3ciOiJcXGRvdHNiIiwiXFx4bGVmdGFycm93IjoiXFxkb3RzYiIsIlxcRE9UU0kiOiJcXGRvdHNpIiwiXFxpbnQiOiJcXGRvdHNpIiwiXFxvaW50IjoiXFxkb3RzaSIsIlxcaWludCI6IlxcZG90c2kiLCJcXGlpaW50IjoiXFxkb3RzaSIsIlxcaWlpaW50IjoiXFxkb3RzaSIsIlxcaWRvdHNpbnQiOiJcXGRvdHNpIiwiXFxET1RTWCI6IlxcZG90c3gifSxabj1uZXcgU2V0KFsiYmluIiwicmVsIl0pO0pyKCJcXGRvdHMiLGZ1bmN0aW9uKGUpe2xldCB0PSJcXGRvdHNvIjtjb25zdCByPWUuZXhwYW5kQWZ0ZXJGdXR1cmUoKS50ZXh0O3JldHVybiByIGluICRuP3Q9JG5bcl06KCJcXG5vdCI9PT1yLnNsaWNlKDAsNCl8fHIgaW4gbmUubWF0aCYmWm4uaGFzKG5lLm1hdGhbcl0uZ3JvdXApKSYmKHQ9IlxcZG90c2IiKSx0fSk7Y29uc3QgS249eyIpIjohMCwiXSI6ITAsIlxccmJyYWNrIjohMCwiXFx9IjohMCwiXFxyYnJhY2UiOiEwLCJcXHJhbmdsZSI6ITAsIlxccmNlaWwiOiEwLCJcXHJmbG9vciI6ITAsIlxccmdyb3VwIjohMCwiXFxybW91c3RhY2hlIjohMCwiXFxyaWdodCI6ITAsIlxcYmlnciI6ITAsIlxcYmlnZ3IiOiEwLCJcXEJpZ3IiOiEwLCJcXEJpZ2dyIjohMCwkOiEwLCI7IjohMCwiLiI6ITAsIiwiOiEwfTtKcigiXFxkb3RzbyIsZnVuY3Rpb24oZSl7cmV0dXJuIGUuZnV0dXJlKCkudGV4dCBpbiBLbj8iXFxsZG90c1xcLCI6IlxcbGRvdHMifSksSnIoIlxcZG90c2MiLGZ1bmN0aW9uKGUpe2NvbnN0IHQ9ZS5mdXR1cmUoKS50ZXh0O3JldHVybiB0IGluIEtuJiYiLCIhPT10PyJcXGxkb3RzXFwsIjoiXFxsZG90cyJ9KSxKcigiXFxjZG90cyIsZnVuY3Rpb24oZSl7cmV0dXJuIGUuZnV0dXJlKCkudGV4dCBpbiBLbj8iXFxAY2RvdHNcXCwiOiJcXEBjZG90cyJ9KSxKcigiXFxkb3RzYiIsIlxcY2RvdHMiKSxKcigiXFxkb3RzbSIsIlxcY2RvdHMiKSxKcigiXFxkb3RzaSIsIlxcIVxcY2RvdHMiKSxKcigiXFxkb3RzeCIsIlxcbGRvdHNcXCwiKSxKcigiXFxET1RTSSIsIlxccmVsYXgiKSxKcigiXFxET1RTQiIsIlxccmVsYXgiKSxKcigiXFxET1RTWCIsIlxccmVsYXgiKSxKcigiXFx0bXNwYWNlIiwiXFxUZXh0T3JNYXRoe1xca2VybiMxIzN9e1xcbXNraXAjMSMyfVxccmVsYXgiKSxKcigiXFwsIiwiXFx0bXNwYWNlK3szbXV9ey4xNjY3ZW19IiksSnIoIlxcdGhpbnNwYWNlIiwiXFwsIiksSnIoIlxcPiIsIlxcbXNraXB7NG11fSIpLEpyKCJcXDoiLCJcXHRtc3BhY2UrezRtdX17LjIyMjJlbX0iKSxKcigiXFxtZWRzcGFjZSIsIlxcOiIpLEpyKCJcXDsiLCJcXHRtc3BhY2UrezVtdX17LjI3NzdlbX0iKSxKcigiXFx0aGlja3NwYWNlIiwiXFw7IiksSnIoIlxcISIsIlxcdG1zcGFjZS17M211fXsuMTY2N2VtfSIpLEpyKCJcXG5lZ3RoaW5zcGFjZSIsIlxcISIpLEpyKCJcXG5lZ21lZHNwYWNlIiwiXFx0bXNwYWNlLXs0bXV9ey4yMjIyZW19IiksSnIoIlxcbmVndGhpY2tzcGFjZSIsIlxcdG1zcGFjZS17NW11fXsuMjc3ZW19IiksSnIoIlxcZW5zcGFjZSIsIlxca2Vybi41ZW0gIiksSnIoIlxcZW5za2lwIiwiXFxoc2tpcC41ZW1cXHJlbGF4IiksSnIoIlxccXVhZCIsIlxcaHNraXAxZW1cXHJlbGF4IiksSnIoIlxccXF1YWQiLCJcXGhza2lwMmVtXFxyZWxheCIpLEpyKCJcXHRhZyIsIlxcQGlmc3RhclxcdGFnQGxpdGVyYWxcXHRhZ0BwYXJlbiIpLEpyKCJcXHRhZ0BwYXJlbiIsIlxcdGFnQGxpdGVyYWx7KHsjMX0pfSIpLEpyKCJcXHRhZ0BsaXRlcmFsIixlPT57aWYoZS5tYWNyb3MuZ2V0KCJcXGRmQHRhZyIpKXRocm93IG5ldyBuKCJNdWx0aXBsZSBcXHRhZyIpO3JldHVybiJcXGdkZWZcXGRmQHRhZ3tcXHRleHR7IzF9fSJ9KSxKcigiXFxibW9kIiwiXFxtYXRoY2hvaWNle1xcbXNraXAxbXV9e1xcbXNraXAxbXV9e1xcbXNraXA1bXV9e1xcbXNraXA1bXV9XFxtYXRoYmlue1xccm0gbW9kfVxcbWF0aGNob2ljZXtcXG1za2lwMW11fXtcXG1za2lwMW11fXtcXG1za2lwNW11fXtcXG1za2lwNW11fSIpLEpyKCJcXHBvZCIsIlxcYWxsb3dicmVha1xcbWF0aGNob2ljZXtcXG1rZXJuMThtdX17XFxta2VybjhtdX17XFxta2VybjhtdX17XFxta2VybjhtdX0oIzEpIiksSnIoIlxccG1vZCIsIlxccG9ke3tcXHJtIG1vZH1cXG1rZXJuNm11IzF9IiksSnIoIlxcbW9kIiwiXFxhbGxvd2JyZWFrXFxtYXRoY2hvaWNle1xcbWtlcm4xOG11fXtcXG1rZXJuMTJtdX17XFxta2VybjEybXV9e1xcbWtlcm4xMm11fXtcXHJtIG1vZH1cXCxcXCwjMSIpLEpyKCJcXG5ld2xpbmUiLCJcXFxcXFxyZWxheCIpLEpyKCJcXFRlWCIsIlxcdGV4dHJte1xcaHRtbEBtYXRobWx7VFxca2Vybi0uMTY2N2VtXFxyYWlzZWJveHstLjVleH17RX1cXGtlcm4tLjEyNWVtWH17VGVYfX0iKTtjb25zdCBKbj1OKEtbIk1haW4tUmVndWxhciJdWyJUIi5jaGFyQ29kZUF0KDApXVsxXS0uNypLWyJNYWluLVJlZ3VsYXIiXVsiQSIuY2hhckNvZGVBdCgwKV1bMV0pO0pyKCJcXExhVGVYIiwiXFx0ZXh0cm17XFxodG1sQG1hdGhtbHtMXFxrZXJuLS4zNmVtXFxyYWlzZWJveHsiK0puKyJ9e1xcc2NyaXB0c3R5bGUgQX1cXGtlcm4tLjE1ZW1cXFRlWH17TGFUZVh9fSIpLEpyKCJcXEthVGVYIiwiXFx0ZXh0cm17XFxodG1sQG1hdGhtbHtLXFxrZXJuLS4xN2VtXFxyYWlzZWJveHsiK0puKyJ9e1xcc2NyaXB0c3R5bGUgQX1cXGtlcm4tLjE1ZW1cXFRlWH17S2FUZVh9fSIpLEpyKCJcXGhzcGFjZSIsIlxcQGlmc3RhclxcQGhzcGFjZXJcXEBoc3BhY2UiKSxKcigiXFxAaHNwYWNlIiwiXFxoc2tpcCAjMVxccmVsYXgiKSxKcigiXFxAaHNwYWNlciIsIlxccnVsZXswcHR9ezBwdH1cXGhza2lwICMxXFxyZWxheCIpLEpyKCJcXG9yZGluYXJ5Y29sb24iLCI6IiksSnIoIlxcdmNlbnRjb2xvbiIsIlxcbWF0aHJlbHtcXG1hdGhvcFxcb3JkaW5hcnljb2xvbn0iKSxKcigiXFxkYmxjb2xvbiIsJ1xcaHRtbEBtYXRobWx7XFxtYXRocmVse1xcdmNlbnRjb2xvblxcbWF0aHJlbHtcXG1rZXJuLS45bXV9XFx2Y2VudGNvbG9ufX17XFxtYXRob3B7XFxjaGFyIjIyMzd9fScpLEpyKCJcXGNvbG9uZXFxIiwnXFxodG1sQG1hdGhtbHtcXG1hdGhyZWx7XFx2Y2VudGNvbG9uXFxtYXRocmVse1xcbWtlcm4tMS4ybXV9PX19e1xcbWF0aG9we1xcY2hhciIyMjU0fX0nKSxKcigiXFxDb2xvbmVxcSIsJ1xcaHRtbEBtYXRobWx7XFxtYXRocmVse1xcZGJsY29sb25cXG1hdGhyZWx7XFxta2Vybi0xLjJtdX09fX17XFxtYXRob3B7XFxjaGFyIjIyMzdcXGNoYXIiM2R9fScpLEpyKCJcXGNvbG9uZXEiLCdcXGh0bWxAbWF0aG1se1xcbWF0aHJlbHtcXHZjZW50Y29sb25cXG1hdGhyZWx7XFxta2Vybi0xLjJtdX1cXG1hdGhyZWx7LX19fXtcXG1hdGhvcHtcXGNoYXIiM2FcXGNoYXIiMjIxMn19JyksSnIoIlxcQ29sb25lcSIsJ1xcaHRtbEBtYXRobWx7XFxtYXRocmVse1xcZGJsY29sb25cXG1hdGhyZWx7XFxta2Vybi0xLjJtdX1cXG1hdGhyZWx7LX19fXtcXG1hdGhvcHtcXGNoYXIiMjIzN1xcY2hhciIyMjEyfX0nKSxKcigiXFxlcXFjb2xvbiIsJ1xcaHRtbEBtYXRobWx7XFxtYXRocmVsez1cXG1hdGhyZWx7XFxta2Vybi0xLjJtdX1cXHZjZW50Y29sb259fXtcXG1hdGhvcHtcXGNoYXIiMjI1NX19JyksSnIoIlxcRXFxY29sb24iLCdcXGh0bWxAbWF0aG1se1xcbWF0aHJlbHs9XFxtYXRocmVse1xcbWtlcm4tMS4ybXV9XFxkYmxjb2xvbn19e1xcbWF0aG9we1xcY2hhciIzZFxcY2hhciIyMjM3fX0nKSxKcigiXFxlcWNvbG9uIiwnXFxodG1sQG1hdGhtbHtcXG1hdGhyZWx7XFxtYXRocmVsey19XFxtYXRocmVse1xcbWtlcm4tMS4ybXV9XFx2Y2VudGNvbG9ufX17XFxtYXRob3B7XFxjaGFyIjIyMzl9fScpLEpyKCJcXEVxY29sb24iLCdcXGh0bWxAbWF0aG1se1xcbWF0aHJlbHtcXG1hdGhyZWx7LX1cXG1hdGhyZWx7XFxta2Vybi0xLjJtdX1cXGRibGNvbG9ufX17XFxtYXRob3B7XFxjaGFyIjIyMTJcXGNoYXIiMjIzN319JyksSnIoIlxcY29sb25hcHByb3giLCdcXGh0bWxAbWF0aG1se1xcbWF0aHJlbHtcXHZjZW50Y29sb25cXG1hdGhyZWx7XFxta2Vybi0xLjJtdX1cXGFwcHJveH19e1xcbWF0aG9we1xcY2hhciIzYVxcY2hhciIyMjQ4fX0nKSxKcigiXFxDb2xvbmFwcHJveCIsJ1xcaHRtbEBtYXRobWx7XFxtYXRocmVse1xcZGJsY29sb25cXG1hdGhyZWx7XFxta2Vybi0xLjJtdX1cXGFwcHJveH19e1xcbWF0aG9we1xcY2hhciIyMjM3XFxjaGFyIjIyNDh9fScpLEpyKCJcXGNvbG9uc2ltIiwnXFxodG1sQG1hdGhtbHtcXG1hdGhyZWx7XFx2Y2VudGNvbG9uXFxtYXRocmVse1xcbWtlcm4tMS4ybXV9XFxzaW19fXtcXG1hdGhvcHtcXGNoYXIiM2FcXGNoYXIiMjIzY319JyksSnIoIlxcQ29sb25zaW0iLCdcXGh0bWxAbWF0aG1se1xcbWF0aHJlbHtcXGRibGNvbG9uXFxtYXRocmVse1xcbWtlcm4tMS4ybXV9XFxzaW19fXtcXG1hdGhvcHtcXGNoYXIiMjIzN1xcY2hhciIyMjNjfX0nKSxKcigiXHUyMjM3IiwiXFxkYmxjb2xvbiIpLEpyKCJcdTIyMzkiLCJcXGVxY29sb24iKSxKcigiXHUyMjU0IiwiXFxjb2xvbmVxcSIpLEpyKCJcdTIyNTUiLCJcXGVxcWNvbG9uIiksSnIoIlx1MmE3NCIsIlxcQ29sb25lcXEiKSxKcigiXFxyYXRpbyIsIlxcdmNlbnRjb2xvbiIpLEpyKCJcXGNvbG9uY29sb24iLCJcXGRibGNvbG9uIiksSnIoIlxcY29sb25lcXVhbHMiLCJcXGNvbG9uZXFxIiksSnIoIlxcY29sb25jb2xvbmVxdWFscyIsIlxcQ29sb25lcXEiKSxKcigiXFxlcXVhbHNjb2xvbiIsIlxcZXFxY29sb24iKSxKcigiXFxlcXVhbHNjb2xvbmNvbG9uIiwiXFxFcXFjb2xvbiIpLEpyKCJcXGNvbG9ubWludXMiLCJcXGNvbG9uZXEiKSxKcigiXFxjb2xvbmNvbG9ubWludXMiLCJcXENvbG9uZXEiKSxKcigiXFxtaW51c2NvbG9uIiwiXFxlcWNvbG9uIiksSnIoIlxcbWludXNjb2xvbmNvbG9uIiwiXFxFcWNvbG9uIiksSnIoIlxcY29sb25jb2xvbmFwcHJveCIsIlxcQ29sb25hcHByb3giKSxKcigiXFxjb2xvbmNvbG9uc2ltIiwiXFxDb2xvbnNpbSIpLEpyKCJcXHNpbWNvbG9uIiwiXFxtYXRocmVse1xcc2ltXFxtYXRocmVse1xcbWtlcm4tMS4ybXV9XFx2Y2VudGNvbG9ufSIpLEpyKCJcXHNpbWNvbG9uY29sb24iLCJcXG1hdGhyZWx7XFxzaW1cXG1hdGhyZWx7XFxta2Vybi0xLjJtdX1cXGRibGNvbG9ufSIpLEpyKCJcXGFwcHJveGNvbG9uIiwiXFxtYXRocmVse1xcYXBwcm94XFxtYXRocmVse1xcbWtlcm4tMS4ybXV9XFx2Y2VudGNvbG9ufSIpLEpyKCJcXGFwcHJveGNvbG9uY29sb24iLCJcXG1hdGhyZWx7XFxhcHByb3hcXG1hdGhyZWx7XFxta2Vybi0xLjJtdX1cXGRibGNvbG9ufSIpLEpyKCJcXG5vdG5pIiwiXFxodG1sQG1hdGhtbHtcXG5vdFxcbml9e1xcbWF0aHJlbHtcXGNoYXJgXHUyMjBjfX0iKSxKcigiXFxsaW1zdXAiLCJcXERPVFNCXFxvcGVyYXRvcm5hbWUqe2xpbVxcLHN1cH0iKSxKcigiXFxsaW1pbmYiLCJcXERPVFNCXFxvcGVyYXRvcm5hbWUqe2xpbVxcLGluZn0iKSxKcigiXFxpbmpsaW0iLCJcXERPVFNCXFxvcGVyYXRvcm5hbWUqe2lualxcLGxpbX0iKSxKcigiXFxwcm9qbGltIiwiXFxET1RTQlxcb3BlcmF0b3JuYW1lKntwcm9qXFwsbGltfSIpLEpyKCJcXHZhcmxpbXN1cCIsIlxcRE9UU0JcXG9wZXJhdG9ybmFtZSp7XFxvdmVybGluZXtsaW19fSIpLEpyKCJcXHZhcmxpbWluZiIsIlxcRE9UU0JcXG9wZXJhdG9ybmFtZSp7XFx1bmRlcmxpbmV7bGltfX0iKSxKcigiXFx2YXJpbmpsaW0iLCJcXERPVFNCXFxvcGVyYXRvcm5hbWUqe1xcdW5kZXJyaWdodGFycm93e2xpbX19IiksSnIoIlxcdmFycHJvamxpbSIsIlxcRE9UU0JcXG9wZXJhdG9ybmFtZSp7XFx1bmRlcmxlZnRhcnJvd3tsaW19fSIpLEpyKCJcXGd2ZXJ0bmVxcSIsIlxcaHRtbEBtYXRobWx7XFxAZ3ZlcnRuZXFxfXtcdTIyNjl9IiksSnIoIlxcbHZlcnRuZXFxIiwiXFxodG1sQG1hdGhtbHtcXEBsdmVydG5lcXF9e1x1MjI2OH0iKSxKcigiXFxuZ2VxcSIsIlxcaHRtbEBtYXRobWx7XFxAbmdlcXF9e1x1MjI3MX0iKSxKcigiXFxuZ2Vxc2xhbnQiLCJcXGh0bWxAbWF0aG1se1xcQG5nZXFzbGFudH17XHUyMjcxfSIpLEpyKCJcXG5sZXFxIiwiXFxodG1sQG1hdGhtbHtcXEBubGVxcX17XHUyMjcwfSIpLEpyKCJcXG5sZXFzbGFudCIsIlxcaHRtbEBtYXRobWx7XFxAbmxlcXNsYW50fXtcdTIyNzB9IiksSnIoIlxcbnNob3J0bWlkIiwiXFxodG1sQG1hdGhtbHtcXEBuc2hvcnRtaWR9e1x1MjIyNH0iKSxKcigiXFxuc2hvcnRwYXJhbGxlbCIsIlxcaHRtbEBtYXRobWx7XFxAbnNob3J0cGFyYWxsZWx9e1x1MjIyNn0iKSxKcigiXFxuc3Vic2V0ZXFxIiwiXFxodG1sQG1hdGhtbHtcXEBuc3Vic2V0ZXFxfXtcdTIyODh9IiksSnIoIlxcbnN1cHNldGVxcSIsIlxcaHRtbEBtYXRobWx7XFxAbnN1cHNldGVxcX17XHUyMjg5fSIpLEpyKCJcXHZhcnN1YnNldG5lcSIsIlxcaHRtbEBtYXRobWx7XFxAdmFyc3Vic2V0bmVxfXtcdTIyOGF9IiksSnIoIlxcdmFyc3Vic2V0bmVxcSIsIlxcaHRtbEBtYXRobWx7XFxAdmFyc3Vic2V0bmVxcX17XHUyYWNifSIpLEpyKCJcXHZhcnN1cHNldG5lcSIsIlxcaHRtbEBtYXRobWx7XFxAdmFyc3Vwc2V0bmVxfXtcdTIyOGJ9IiksSnIoIlxcdmFyc3Vwc2V0bmVxcSIsIlxcaHRtbEBtYXRobWx7XFxAdmFyc3Vwc2V0bmVxcX17XHUyYWNjfSIpLEpyKCJcXGltYXRoIiwiXFxodG1sQG1hdGhtbHtcXEBpbWF0aH17XHUwMTMxfSIpLEpyKCJcXGptYXRoIiwiXFxodG1sQG1hdGhtbHtcXEBqbWF0aH17XHUwMjM3fSIpLEpyKCJcXGxsYnJhY2tldCIsIlxcaHRtbEBtYXRobWx7XFxtYXRob3BlbntbXFxta2Vybi0zLjJtdVt9fXtcXG1hdGhvcGVue1xcY2hhcmBcdTI3ZTZ9fSIpLEpyKCJcXHJyYnJhY2tldCIsIlxcaHRtbEBtYXRobWx7XFxtYXRoY2xvc2V7XVxcbWtlcm4tMy4ybXVdfX17XFxtYXRoY2xvc2V7XFxjaGFyYFx1MjdlN319IiksSnIoIlx1MjdlNiIsIlxcbGxicmFja2V0IiksSnIoIlx1MjdlNyIsIlxccnJicmFja2V0IiksSnIoIlxcbEJyYWNlIiwiXFxodG1sQG1hdGhtbHtcXG1hdGhvcGVue1xce1xcbWtlcm4tMy4ybXVbfX17XFxtYXRob3BlbntcXGNoYXJgXHUyOTgzfX0iKSxKcigiXFxyQnJhY2UiLCJcXGh0bWxAbWF0aG1se1xcbWF0aGNsb3Nle11cXG1rZXJuLTMuMm11XFx9fX17XFxtYXRoY2xvc2V7XFxjaGFyYFx1Mjk4NH19IiksSnIoIlx1Mjk4MyIsIlxcbEJyYWNlIiksSnIoIlx1Mjk4NCIsIlxcckJyYWNlIiksSnIoIlxcbWludXNvIiwiXFxtYXRoYmlue1xcaHRtbEBtYXRobWx7e1xcbWF0aHJsYXB7XFxtYXRoY2hvaWNle1xca2VybnswLjE0NWVtfX17XFxrZXJuezAuMTQ1ZW19fXtcXGtlcm57MC4xMDE1ZW19fXtcXGtlcm57MC4wNzI1ZW19fVxcY2lyY317LX19fXtcXGNoYXJgXHUyOWI1fX0iKSxKcigiXHUyOWI1IiwiXFxtaW51c28iKSxKcigiXFxkYXJyIiwiXFxkb3duYXJyb3ciKSxKcigiXFxkQXJyIiwiXFxEb3duYXJyb3ciKSxKcigiXFxEYXJyIiwiXFxEb3duYXJyb3ciKSxKcigiXFxsYW5nIiwiXFxsYW5nbGUiKSxKcigiXFxyYW5nIiwiXFxyYW5nbGUiKSxKcigiXFx1YXJyIiwiXFx1cGFycm93IiksSnIoIlxcdUFyciIsIlxcVXBhcnJvdyIpLEpyKCJcXFVhcnIiLCJcXFVwYXJyb3ciKSxKcigiXFxOIiwiXFxtYXRoYmJ7Tn0iKSxKcigiXFxSIiwiXFxtYXRoYmJ7Un0iKSxKcigiXFxaIiwiXFxtYXRoYmJ7Wn0iKSxKcigiXFxhbGVmIiwiXFxhbGVwaCIpLEpyKCJcXGFsZWZzeW0iLCJcXGFsZXBoIiksSnIoIlxcQWxwaGEiLCJcXG1hdGhybXtBfSIpLEpyKCJcXEJldGEiLCJcXG1hdGhybXtCfSIpLEpyKCJcXGJ1bGwiLCJcXGJ1bGxldCIpLEpyKCJcXENoaSIsIlxcbWF0aHJte1h9IiksSnIoIlxcY2x1YnMiLCJcXGNsdWJzdWl0IiksSnIoIlxcY251bXMiLCJcXG1hdGhiYntDfSIpLEpyKCJcXENvbXBsZXgiLCJcXG1hdGhiYntDfSIpLEpyKCJcXERhZ2dlciIsIlxcZGRhZ2dlciIpLEpyKCJcXGRpYW1vbmRzIiwiXFxkaWFtb25kc3VpdCIpLEpyKCJcXGVtcHR5IiwiXFxlbXB0eXNldCIpLEpyKCJcXEVwc2lsb24iLCJcXG1hdGhybXtFfSIpLEpyKCJcXEV0YSIsIlxcbWF0aHJte0h9IiksSnIoIlxcZXhpc3QiLCJcXGV4aXN0cyIpLEpyKCJcXGhhcnIiLCJcXGxlZnRyaWdodGFycm93IiksSnIoIlxcaEFyciIsIlxcTGVmdHJpZ2h0YXJyb3ciKSxKcigiXFxIYXJyIiwiXFxMZWZ0cmlnaHRhcnJvdyIpLEpyKCJcXGhlYXJ0cyIsIlxcaGVhcnRzdWl0IiksSnIoIlxcaW1hZ2UiLCJcXEltIiksSnIoIlxcaW5maW4iLCJcXGluZnR5IiksSnIoIlxcSW90YSIsIlxcbWF0aHJte0l9IiksSnIoIlxcaXNpbiIsIlxcaW4iKSxKcigiXFxLYXBwYSIsIlxcbWF0aHJte0t9IiksSnIoIlxcbGFyciIsIlxcbGVmdGFycm93IiksSnIoIlxcbEFyciIsIlxcTGVmdGFycm93IiksSnIoIlxcTGFyciIsIlxcTGVmdGFycm93IiksSnIoIlxcbHJhcnIiLCJcXGxlZnRyaWdodGFycm93IiksSnIoIlxcbHJBcnIiLCJcXExlZnRyaWdodGFycm93IiksSnIoIlxcTHJhcnIiLCJcXExlZnRyaWdodGFycm93IiksSnIoIlxcTXUiLCJcXG1hdGhybXtNfSIpLEpyKCJcXG5hdG51bXMiLCJcXG1hdGhiYntOfSIpLEpyKCJcXE51IiwiXFxtYXRocm17Tn0iKSxKcigiXFxPbWljcm9uIiwiXFxtYXRocm17T30iKSxKcigiXFxwbHVzbW4iLCJcXHBtIiksSnIoIlxccmFyciIsIlxccmlnaHRhcnJvdyIpLEpyKCJcXHJBcnIiLCJcXFJpZ2h0YXJyb3ciKSxKcigiXFxSYXJyIiwiXFxSaWdodGFycm93IiksSnIoIlxccmVhbCIsIlxcUmUiKSxKcigiXFxyZWFscyIsIlxcbWF0aGJie1J9IiksSnIoIlxcUmVhbHMiLCJcXG1hdGhiYntSfSIpLEpyKCJcXFJobyIsIlxcbWF0aHJte1B9IiksSnIoIlxcc2RvdCIsIlxcY2RvdCIpLEpyKCJcXHNlY3QiLCJcXFMiKSxKcigiXFxzcGFkZXMiLCJcXHNwYWRlc3VpdCIpLEpyKCJcXHN1YiIsIlxcc3Vic2V0IiksSnIoIlxcc3ViZSIsIlxcc3Vic2V0ZXEiKSxKcigiXFxzdXBlIiwiXFxzdXBzZXRlcSIpLEpyKCJcXFRhdSIsIlxcbWF0aHJte1R9IiksSnIoIlxcdGhldGFzeW0iLCJcXHZhcnRoZXRhIiksSnIoIlxcd2VpZXJwIiwiXFx3cCIpLEpyKCJcXFpldGEiLCJcXG1hdGhybXtafSIpLEpyKCJcXGFyZ21pbiIsIlxcRE9UU0JcXG9wZXJhdG9ybmFtZSp7YXJnXFwsbWlufSIpLEpyKCJcXGFyZ21heCIsIlxcRE9UU0JcXG9wZXJhdG9ybmFtZSp7YXJnXFwsbWF4fSIpLEpyKCJcXHBsaW0iLCJcXERPVFNCXFxtYXRob3B7XFxvcGVyYXRvcm5hbWV7cGxpbX19XFxsaW1pdHMiKSxKcigiXFxicmEiLCJcXG1hdGhpbm5lcntcXGxhbmdsZXsjMX18fSIpLEpyKCJcXGtldCIsIlxcbWF0aGlubmVye3x7IzF9XFxyYW5nbGV9IiksSnIoIlxcYnJha2V0IiwiXFxtYXRoaW5uZXJ7XFxsYW5nbGV7IzF9XFxyYW5nbGV9IiksSnIoIlxcQnJhIiwiXFxsZWZ0XFxsYW5nbGUjMVxccmlnaHR8IiksSnIoIlxcS2V0IiwiXFxsZWZ0fCMxXFxyaWdodFxccmFuZ2xlIik7Y29uc3QgUW49ZT0+dD0+e2NvbnN0IHI9dC5jb25zdW1lQXJnKCkudG9rZW5zLG49dC5jb25zdW1lQXJnKCkudG9rZW5zLG89dC5jb25zdW1lQXJnKCkudG9rZW5zLHM9dC5jb25zdW1lQXJnKCkudG9rZW5zLGk9dC5tYWNyb3MuZ2V0KCJ8IiksbD10Lm1hY3Jvcy5nZXQoIlxcfCIpO3QubWFjcm9zLmJlZ2luR3JvdXAoKTtjb25zdCBhPXQ9PnI9PntlJiYoci5tYWNyb3Muc2V0KCJ8IixpKSxvLmxlbmd0aCYmci5tYWNyb3Muc2V0KCJcXHwiLGwpKTtsZXQgcz10O2lmKCF0JiZvLmxlbmd0aCl7InwiPT09ci5mdXR1cmUoKS50ZXh0JiYoci5wb3BUb2tlbigpLHM9ITApfXJldHVybnt0b2tlbnM6cz9vOm4sbnVtQXJnczowfX07dC5tYWNyb3Muc2V0KCJ8IixhKCExKSksby5sZW5ndGgmJnQubWFjcm9zLnNldCgiXFx8IixhKCEwKSk7Y29uc3QgYz10LmNvbnN1bWVBcmcoKS50b2tlbnMsaD10LmV4cGFuZFRva2VucyhbLi4ucywuLi5jLC4uLnJdKTtyZXR1cm4gdC5tYWNyb3MuZW5kR3JvdXAoKSx7dG9rZW5zOmgucmV2ZXJzZSgpLG51bUFyZ3M6MH19O0pyKCJcXGJyYUBrZXQiLFFuKCExKSksSnIoIlxcYnJhQHNldCIsUW4oITApKSxKcigiXFxCcmFrZXQiLCJcXGJyYUBrZXR7XFxsZWZ0XFxsYW5nbGV9e1xcLFxcbWlkZGxlXFx2ZXJ0XFwsfXtcXCxcXG1pZGRsZVxcdmVydFxcLH17XFxyaWdodFxccmFuZ2xlfSIpLEpyKCJcXFNldCIsIlxcYnJhQHNldHtcXGxlZnRcXHtcXDp9e1xcO1xcbWlkZGxlXFx2ZXJ0XFw7fXtcXDtcXG1pZGRsZVxcVmVydFxcO317XFw6XFxyaWdodFxcfX0iKSxKcigiXFxzZXQiLCJcXGJyYUBzZXR7XFx7XFwsfXtcXG1pZH17fXtcXCxcXH19IiksSnIoIlxcYW5nbG4iLCJ7XFxhbmdsIG59IiksSnIoIlxcYmx1ZSIsIlxcdGV4dGNvbG9yeyMjNjQ5NWVkfXsjMX0iKSxKcigiXFxvcmFuZ2UiLCJcXHRleHRjb2xvcnsjI2ZmYTUwMH17IzF9IiksSnIoIlxccGluayIsIlxcdGV4dGNvbG9yeyMjZmYwMGFmfXsjMX0iKSxKcigiXFxyZWQiLCJcXHRleHRjb2xvcnsjI2RmMDAzMH17IzF9IiksSnIoIlxcZ3JlZW4iLCJcXHRleHRjb2xvcnsjIzI4YWU3Yn17IzF9IiksSnIoIlxcZ3JheSIsIlxcdGV4dGNvbG9ye2dyYXl9eyMxfSIpLEpyKCJcXHB1cnBsZSIsIlxcdGV4dGNvbG9yeyMjOWQzOGJkfXsjMX0iKSxKcigiXFxibHVlQSIsIlxcdGV4dGNvbG9yeyMjY2NmYWZmfXsjMX0iKSxKcigiXFxibHVlQiIsIlxcdGV4dGNvbG9yeyMjODBmNmZmfXsjMX0iKSxKcigiXFxibHVlQyIsIlxcdGV4dGNvbG9yeyMjNjNkOWVhfXsjMX0iKSxKcigiXFxibHVlRCIsIlxcdGV4dGNvbG9yeyMjMTFhY2NkfXsjMX0iKSxKcigiXFxibHVlRSIsIlxcdGV4dGNvbG9yeyMjMGM3Zjk5fXsjMX0iKSxKcigiXFx0ZWFsQSIsIlxcdGV4dGNvbG9yeyMjOTRmZmY1fXsjMX0iKSxKcigiXFx0ZWFsQiIsIlxcdGV4dGNvbG9yeyMjMjZlZGQ1fXsjMX0iKSxKcigiXFx0ZWFsQyIsIlxcdGV4dGNvbG9yeyMjMDFkMWMxfXsjMX0iKSxKcigiXFx0ZWFsRCIsIlxcdGV4dGNvbG9yeyMjMDFhOTk1fXsjMX0iKSxKcigiXFx0ZWFsRSIsIlxcdGV4dGNvbG9yeyMjMjA4MTcwfXsjMX0iKSxKcigiXFxncmVlbkEiLCJcXHRleHRjb2xvcnsjI2I2ZmZiMH17IzF9IiksSnIoIlxcZ3JlZW5CIiwiXFx0ZXh0Y29sb3J7IyM4YWYyODF9eyMxfSIpLEpyKCJcXGdyZWVuQyIsIlxcdGV4dGNvbG9yeyMjNzRjZjcwfXsjMX0iKSxKcigiXFxncmVlbkQiLCJcXHRleHRjb2xvcnsjIzFmYWI1NH17IzF9IiksSnIoIlxcZ3JlZW5FIiwiXFx0ZXh0Y29sb3J7IyMwZDkyM2Z9eyMxfSIpLEpyKCJcXGdvbGRBIiwiXFx0ZXh0Y29sb3J7IyNmZmQwYTl9eyMxfSIpLEpyKCJcXGdvbGRCIiwiXFx0ZXh0Y29sb3J7IyNmZmJiNzF9eyMxfSIpLEpyKCJcXGdvbGRDIiwiXFx0ZXh0Y29sb3J7IyNmZjljMzl9eyMxfSIpLEpyKCJcXGdvbGREIiwiXFx0ZXh0Y29sb3J7IyNlMDdkMTB9eyMxfSIpLEpyKCJcXGdvbGRFIiwiXFx0ZXh0Y29sb3J7IyNhNzVhMDV9eyMxfSIpLEpyKCJcXHJlZEEiLCJcXHRleHRjb2xvcnsjI2ZjYTlhOX17IzF9IiksSnIoIlxccmVkQiIsIlxcdGV4dGNvbG9yeyMjZmY4NDgyfXsjMX0iKSxKcigiXFxyZWRDIiwiXFx0ZXh0Y29sb3J7IyNmOTY4NWR9eyMxfSIpLEpyKCJcXHJlZEQiLCJcXHRleHRjb2xvcnsjI2U4NGQzOX17IzF9IiksSnIoIlxccmVkRSIsIlxcdGV4dGNvbG9yeyMjYmMyNjEyfXsjMX0iKSxKcigiXFxtYXJvb25BIiwiXFx0ZXh0Y29sb3J7IyNmZmJkZTB9eyMxfSIpLEpyKCJcXG1hcm9vbkIiLCJcXHRleHRjb2xvcnsjI2ZmOTJjNn17IzF9IiksSnIoIlxcbWFyb29uQyIsIlxcdGV4dGNvbG9yeyMjZWQ1ZmE2fXsjMX0iKSxKcigiXFxtYXJvb25EIiwiXFx0ZXh0Y29sb3J7IyNjYTMzN2N9eyMxfSIpLEpyKCJcXG1hcm9vbkUiLCJcXHRleHRjb2xvcnsjIzllMDM0ZX17IzF9IiksSnIoIlxccHVycGxlQSIsIlxcdGV4dGNvbG9yeyMjZGRkN2ZmfXsjMX0iKSxKcigiXFxwdXJwbGVCIiwiXFx0ZXh0Y29sb3J7IyNjNmI5ZmN9eyMxfSIpLEpyKCJcXHB1cnBsZUMiLCJcXHRleHRjb2xvcnsjI2FhODdmZn17IzF9IiksSnIoIlxccHVycGxlRCIsIlxcdGV4dGNvbG9yeyMjNzg1NGFifXsjMX0iKSxKcigiXFxwdXJwbGVFIiwiXFx0ZXh0Y29sb3J7IyM1NDNiNzh9eyMxfSIpLEpyKCJcXG1pbnRBIiwiXFx0ZXh0Y29sb3J7IyNmNWY5ZTh9eyMxfSIpLEpyKCJcXG1pbnRCIiwiXFx0ZXh0Y29sb3J7IyNlZGYyZGZ9eyMxfSIpLEpyKCJcXG1pbnRDIiwiXFx0ZXh0Y29sb3J7IyNlMGU1Y2N9eyMxfSIpLEpyKCJcXGdyYXlBIiwiXFx0ZXh0Y29sb3J7IyNmNmY3Zjd9eyMxfSIpLEpyKCJcXGdyYXlCIiwiXFx0ZXh0Y29sb3J7IyNmMGYxZjJ9eyMxfSIpLEpyKCJcXGdyYXlDIiwiXFx0ZXh0Y29sb3J7IyNlM2U1ZTZ9eyMxfSIpLEpyKCJcXGdyYXlEIiwiXFx0ZXh0Y29sb3J7IyNkNmQ4ZGF9eyMxfSIpLEpyKCJcXGdyYXlFIiwiXFx0ZXh0Y29sb3J7IyNiYWJlYzJ9eyMxfSIpLEpyKCJcXGdyYXlGIiwiXFx0ZXh0Y29sb3J7IyM4ODhkOTN9eyMxfSIpLEpyKCJcXGdyYXlHIiwiXFx0ZXh0Y29sb3J7IyM2MjY1Njl9eyMxfSIpLEpyKCJcXGdyYXlIIiwiXFx0ZXh0Y29sb3J7IyMzYjNlNDB9eyMxfSIpLEpyKCJcXGdyYXlJIiwiXFx0ZXh0Y29sb3J7IyMyMTI0MmN9eyMxfSIpLEpyKCJcXGthQmx1ZSIsIlxcdGV4dGNvbG9yeyMjMzE0NDUzfXsjMX0iKSxKcigiXFxrYUdyZWVuIiwiXFx0ZXh0Y29sb3J7IyM3MUIzMDd9eyMxfSIpO2NvbnN0IGVvPXsiXiI6ITAsXzohMCwiXFxsaW1pdHMiOiEwLCJcXG5vbGltaXRzIjohMH07Y2xhc3MgdG97Y29uc3RydWN0b3IoZSx0LHIpe3RoaXMuc2V0dGluZ3M9dm9pZCAwLHRoaXMuZXhwYW5zaW9uQ291bnQ9dm9pZCAwLHRoaXMubGV4ZXI9dm9pZCAwLHRoaXMubWFjcm9zPXZvaWQgMCx0aGlzLnN0YWNrPXZvaWQgMCx0aGlzLm1vZGU9dm9pZCAwLHRoaXMuc2V0dGluZ3M9dCx0aGlzLmV4cGFuc2lvbkNvdW50PTAsdGhpcy5mZWVkKGUpLHRoaXMubWFjcm9zPW5ldyBYbihZbix0Lm1hY3JvcyksdGhpcy5tb2RlPXIsdGhpcy5zdGFjaz1bXX1mZWVkKGUpe3RoaXMubGV4ZXI9bmV3IGpuKGUsdGhpcy5zZXR0aW5ncyl9c3dpdGNoTW9kZShlKXt0aGlzLm1vZGU9ZX1iZWdpbkdyb3VwKCl7dGhpcy5tYWNyb3MuYmVnaW5Hcm91cCgpfWVuZEdyb3VwKCl7dGhpcy5tYWNyb3MuZW5kR3JvdXAoKX1lbmRHcm91cHMoKXt0aGlzLm1hY3Jvcy5lbmRHcm91cHMoKX1mdXR1cmUoKXtyZXR1cm4gMD09PXRoaXMuc3RhY2subGVuZ3RoJiZ0aGlzLnB1c2hUb2tlbih0aGlzLmxleGVyLmxleCgpKSx0aGlzLnN0YWNrW3RoaXMuc3RhY2subGVuZ3RoLTFdfXBvcFRva2VuKCl7cmV0dXJuIHRoaXMuZnV0dXJlKCksdGhpcy5zdGFjay5wb3AoKX1wdXNoVG9rZW4oZSl7dGhpcy5zdGFjay5wdXNoKGUpfXB1c2hUb2tlbnMoZSl7dGhpcy5zdGFjay5wdXNoKC4uLmUpfXNjYW5Bcmd1bWVudChlKXtsZXQgdCxyLG47aWYoZSl7aWYodGhpcy5jb25zdW1lU3BhY2VzKCksIlsiIT09dGhpcy5mdXR1cmUoKS50ZXh0KXJldHVybiBudWxsO3Q9dGhpcy5wb3BUb2tlbigpO3ZhciBvPXRoaXMuY29uc3VtZUFyZyhbIl0iXSk7bj1vLnRva2VucyxyPW8uZW5kfWVsc2V7dmFyIHM9dGhpcy5jb25zdW1lQXJnKCk7bj1zLnRva2Vucyx0PXMuc3RhcnQscj1zLmVuZH1yZXR1cm4gdGhpcy5wdXNoVG9rZW4obmV3IGVuKCJFT0YiLHIubG9jKSksdGhpcy5wdXNoVG9rZW5zKG4pLG5ldyBlbigiIixRci5yYW5nZSh0LHIpKX1jb25zdW1lU3BhY2VzKCl7Zm9yKDs7KXtpZigiICIhPT10aGlzLmZ1dHVyZSgpLnRleHQpYnJlYWs7dGhpcy5zdGFjay5wb3AoKX19Y29uc3VtZUFyZyhlKXtjb25zdCB0PVtdLHI9ZSYmZS5sZW5ndGg+MDtyfHx0aGlzLmNvbnN1bWVTcGFjZXMoKTtjb25zdCBvPXRoaXMuZnV0dXJlKCk7bGV0IHMsaT0wLGw9MDtkb3tpZihzPXRoaXMucG9wVG9rZW4oKSx0LnB1c2gocyksInsiPT09cy50ZXh0KSsraTtlbHNlIGlmKCJ9Ij09PXMudGV4dCl7aWYoLS1pLC0xPT09aSl0aHJvdyBuZXcgbigiRXh0cmEgfSIscyl9ZWxzZSBpZigiRU9GIj09PXMudGV4dCl0aHJvdyBuZXcgbigiVW5leHBlY3RlZCBlbmQgb2YgaW5wdXQgaW4gYSBtYWNybyBhcmd1bWVudCwgZXhwZWN0ZWQgJyIrKGUmJnI/ZVtsXToifSIpKyInIixzKTtpZihlJiZyKWlmKCgwPT09aXx8MT09PWkmJiJ7Ij09PWVbbF0pJiZzLnRleHQ9PT1lW2xdKXtpZigrK2wsbD09PWUubGVuZ3RoKXt0LnNwbGljZSgtbCxsKTticmVha319ZWxzZSBsPTB9d2hpbGUoMCE9PWl8fHIpO3JldHVybiJ7Ij09PW8udGV4dCYmIn0iPT09dFt0Lmxlbmd0aC0xXS50ZXh0JiYodC5wb3AoKSx0LnNoaWZ0KCkpLHQucmV2ZXJzZSgpLHt0b2tlbnM6dCxzdGFydDpvLGVuZDpzfX1jb25zdW1lQXJncyhlLHQpe2lmKHQpe2lmKHQubGVuZ3RoIT09ZSsxKXRocm93IG5ldyBuKCJUaGUgbGVuZ3RoIG9mIGRlbGltaXRlcnMgZG9lc24ndCBtYXRjaCB0aGUgbnVtYmVyIG9mIGFyZ3MhIik7Y29uc3Qgcj10WzBdO2ZvcihsZXQgZT0wO2U8ci5sZW5ndGg7ZSsrKXtjb25zdCB0PXRoaXMucG9wVG9rZW4oKTtpZihyW2VdIT09dC50ZXh0KXRocm93IG5ldyBuKCJVc2Ugb2YgdGhlIG1hY3JvIGRvZXNuJ3QgbWF0Y2ggaXRzIGRlZmluaXRpb24iLHQpfX1jb25zdCByPVtdO2ZvcihsZXQgbj0wO248ZTtuKyspci5wdXNoKHRoaXMuY29uc3VtZUFyZyh0JiZ0W24rMV0pLnRva2Vucyk7cmV0dXJuIHJ9Y291bnRFeHBhbnNpb24oZSl7aWYodGhpcy5leHBhbnNpb25Db3VudCs9ZSx0aGlzLmV4cGFuc2lvbkNvdW50PnRoaXMuc2V0dGluZ3MubWF4RXhwYW5kKXRocm93IG5ldyBuKCJUb28gbWFueSBleHBhbnNpb25zOiBpbmZpbml0ZSBsb29wIG9yIG5lZWQgdG8gaW5jcmVhc2UgbWF4RXhwYW5kIHNldHRpbmciKX1leHBhbmRPbmNlKGUpe2NvbnN0IHQ9dGhpcy5wb3BUb2tlbigpLHI9dC50ZXh0LG89dC5ub2V4cGFuZD9udWxsOnRoaXMuX2dldEV4cGFuc2lvbihyKTtpZihudWxsPT1vfHxlJiZvLnVuZXhwYW5kYWJsZSl7aWYoZSYmbnVsbD09byYmIlxcIj09PXJbMF0mJiF0aGlzLmlzRGVmaW5lZChyKSl0aHJvdyBuZXcgbigiVW5kZWZpbmVkIGNvbnRyb2wgc2VxdWVuY2U6ICIrcik7cmV0dXJuIHRoaXMucHVzaFRva2VuKHQpLCExfXRoaXMuY291bnRFeHBhbnNpb24oMSk7bGV0IHM9by50b2tlbnM7Y29uc3QgaT10aGlzLmNvbnN1bWVBcmdzKG8ubnVtQXJncyxvLmRlbGltaXRlcnMpO2lmKG8ubnVtQXJncyl7cz1zLnNsaWNlKCk7Zm9yKGxldCBlPXMubGVuZ3RoLTE7ZT49MDstLWUpe2xldCB0PXNbZV07aWYoIiMiPT09dC50ZXh0KXtpZigwPT09ZSl0aHJvdyBuZXcgbigiSW5jb21wbGV0ZSBwbGFjZWhvbGRlciBhdCBlbmQgb2YgbWFjcm8gYm9keSIsdCk7aWYodD1zWy0tZV0sIiMiPT09dC50ZXh0KXMuc3BsaWNlKGUrMSwxKTtlbHNle2lmKCEvXlsxLTldJC8udGVzdCh0LnRleHQpKXRocm93IG5ldyBuKCJOb3QgYSB2YWxpZCBhcmd1bWVudCBudW1iZXIiLHQpO3Muc3BsaWNlKGUsMiwuLi5pWyt0LnRleHQtMV0pfX19fXJldHVybiB0aGlzLnB1c2hUb2tlbnMocykscy5sZW5ndGh9ZXhwYW5kQWZ0ZXJGdXR1cmUoKXtyZXR1cm4gdGhpcy5leHBhbmRPbmNlKCksdGhpcy5mdXR1cmUoKX1leHBhbmROZXh0VG9rZW4oKXtmb3IoOzspaWYoITE9PT10aGlzLmV4cGFuZE9uY2UoKSl7Y29uc3QgZT10aGlzLnN0YWNrLnBvcCgpO3JldHVybiBlLnRyZWF0QXNSZWxheCYmKGUudGV4dD0iXFxyZWxheCIpLGV9fWV4cGFuZE1hY3JvKGUpe3JldHVybiB0aGlzLm1hY3Jvcy5oYXMoZSk/dGhpcy5leHBhbmRUb2tlbnMoW25ldyBlbihlKV0pOnZvaWQgMH1leHBhbmRUb2tlbnMoZSl7Y29uc3QgdD1bXSxyPXRoaXMuc3RhY2subGVuZ3RoO2Zvcih0aGlzLnB1c2hUb2tlbnMoZSk7dGhpcy5zdGFjay5sZW5ndGg+cjspaWYoITE9PT10aGlzLmV4cGFuZE9uY2UoITApKXtjb25zdCBlPXRoaXMuc3RhY2sucG9wKCk7ZS50cmVhdEFzUmVsYXgmJihlLm5vZXhwYW5kPSExLGUudHJlYXRBc1JlbGF4PSExKSx0LnB1c2goZSl9cmV0dXJuIHRoaXMuY291bnRFeHBhbnNpb24odC5sZW5ndGgpLHR9ZXhwYW5kTWFjcm9Bc1RleHQoZSl7Y29uc3QgdD10aGlzLmV4cGFuZE1hY3JvKGUpO3JldHVybiB0P3QubWFwKGU9PmUudGV4dCkuam9pbigiIik6dH1fZ2V0RXhwYW5zaW9uKGUpe2NvbnN0IHQ9dGhpcy5tYWNyb3MuZ2V0KGUpO2lmKG51bGw9PXQpcmV0dXJuIHQ7aWYoMT09PWUubGVuZ3RoKXtjb25zdCB0PXRoaXMubGV4ZXIuY2F0Y29kZXNbZV07aWYobnVsbCE9dCYmMTMhPT10KXJldHVybn1jb25zdCByPSJmdW5jdGlvbiI9PXR5cGVvZiB0P3QodGhpcyk6dDtpZigic3RyaW5nIj09dHlwZW9mIHIpe2xldCBlPTA7aWYoci5pbmNsdWRlcygiIyIpKXtjb25zdCB0PXIucmVwbGFjZSgvIyMvZywiIik7Zm9yKDt0LmluY2x1ZGVzKCIjIisoZSsxKSk7KSsrZX1jb25zdCB0PW5ldyBqbihyLHRoaXMuc2V0dGluZ3MpLG49W107bGV0IG89dC5sZXgoKTtmb3IoOyJFT0YiIT09by50ZXh0OyluLnB1c2gobyksbz10LmxleCgpO24ucmV2ZXJzZSgpO3JldHVybnt0b2tlbnM6bixudW1BcmdzOmV9fXJldHVybiByfWlzRGVmaW5lZChlKXtyZXR1cm4gdGhpcy5tYWNyb3MuaGFzKGUpfHxPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoTG4sZSl8fE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZS5tYXRoLGUpfHxPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmUudGV4dCxlKXx8T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGVvLGUpfWlzRXhwYW5kYWJsZShlKXtjb25zdCB0PXRoaXMubWFjcm9zLmdldChlKTtyZXR1cm4gbnVsbCE9dD8ic3RyaW5nIj09dHlwZW9mIHR8fCJmdW5jdGlvbiI9PXR5cGVvZiB0fHwhdC51bmV4cGFuZGFibGU6T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKExuLGUpJiYhTG5bZV0ucHJpbWl0aXZlfX1jb25zdCBybz0vXltcdTIwOGFcdTIwOGJcdTIwOGNcdTIwOGRcdTIwOGVcdTIwODBcdTIwODFcdTIwODJcdTIwODNcdTIwODRcdTIwODVcdTIwODZcdTIwODdcdTIwODhcdTIwODlcdTIwOTBcdTIwOTFcdTIwOTVcdTFkNjJcdTJjN2NcdTIwOTZcdTIwOTdcdTIwOThcdTIwOTlcdTIwOTJcdTIwOWFcdTFkNjNcdTIwOWJcdTIwOWNcdTFkNjRcdTFkNjVcdTIwOTNcdTFkNjZcdTFkNjdcdTFkNjhcdTFkNjlcdTFkNmFdLyxubz1PYmplY3QuZnJlZXplKHsiXHUyMDhhIjoiKyIsIlx1MjA4YiI6Ii0iLCJcdTIwOGMiOiI9IiwiXHUyMDhkIjoiKCIsIlx1MjA4ZSI6IikiLCJcdTIwODAiOiIwIiwiXHUyMDgxIjoiMSIsIlx1MjA4MiI6IjIiLCJcdTIwODMiOiIzIiwiXHUyMDg0IjoiNCIsIlx1MjA4NSI6IjUiLCJcdTIwODYiOiI2IiwiXHUyMDg3IjoiNyIsIlx1MjA4OCI6IjgiLCJcdTIwODkiOiI5IiwiXHUyMDkwIjoiYSIsIlx1MjA5MSI6ImUiLCJcdTIwOTUiOiJoIiwiXHUxZDYyIjoiaSIsIlx1MmM3YyI6ImoiLCJcdTIwOTYiOiJrIiwiXHUyMDk3IjoibCIsIlx1MjA5OCI6Im0iLCJcdTIwOTkiOiJuIiwiXHUyMDkyIjoibyIsIlx1MjA5YSI6InAiLCJcdTFkNjMiOiJyIiwiXHUyMDliIjoicyIsIlx1MjA5YyI6InQiLCJcdTFkNjQiOiJ1IiwiXHUxZDY1IjoidiIsIlx1MjA5MyI6IngiLCJcdTFkNjYiOiJcdTAzYjIiLCJcdTFkNjciOiJcdTAzYjMiLCJcdTFkNjgiOiJcdTAzYzEiLCJcdTFkNjkiOiJcdTAzZDUiLCJcdTFkNmEiOiJcdTAzYzciLCJcdTIwN2EiOiIrIiwiXHUyMDdiIjoiLSIsIlx1MjA3YyI6Ij0iLCJcdTIwN2QiOiIoIiwiXHUyMDdlIjoiKSIsIlx1MjA3MCI6IjAiLCJceGI5IjoiMSIsIlx4YjIiOiIyIiwiXHhiMyI6IjMiLCJcdTIwNzQiOiI0IiwiXHUyMDc1IjoiNSIsIlx1MjA3NiI6IjYiLCJcdTIwNzciOiI3IiwiXHUyMDc4IjoiOCIsIlx1MjA3OSI6IjkiLCJcdTFkMmMiOiJBIiwiXHUxZDJlIjoiQiIsIlx1MWQzMCI6IkQiLCJcdTFkMzEiOiJFIiwiXHUxZDMzIjoiRyIsIlx1MWQzNCI6IkgiLCJcdTFkMzUiOiJJIiwiXHUxZDM2IjoiSiIsIlx1MWQzNyI6IksiLCJcdTFkMzgiOiJMIiwiXHUxZDM5IjoiTSIsIlx1MWQzYSI6Ik4iLCJcdTFkM2MiOiJPIiwiXHUxZDNlIjoiUCIsIlx1MWQzZiI6IlIiLCJcdTFkNDAiOiJUIiwiXHUxZDQxIjoiVSIsIlx1MmM3ZCI6IlYiLCJcdTFkNDIiOiJXIiwiXHUxZDQzIjoiYSIsIlx1MWQ0NyI6ImIiLCJcdTFkOWMiOiJjIiwiXHUxZDQ4IjoiZCIsIlx1MWQ0OSI6ImUiLCJcdTFkYTAiOiJmIiwiXHUxZDRkIjoiZyIsIlx1MDJiMCI6ImgiLCJcdTIwNzEiOiJpIiwiXHUwMmIyIjoiaiIsIlx1MWQ0ZiI6ImsiLCJcdTAyZTEiOiJsIiwiXHUxZDUwIjoibSIsIlx1MjA3ZiI6Im4iLCJcdTFkNTIiOiJvIiwiXHUxZDU2IjoicCIsIlx1MDJiMyI6InIiLCJcdTAyZTIiOiJzIiwiXHUxZDU3IjoidCIsIlx1MWQ1OCI6InUiLCJcdTFkNWIiOiJ2IiwiXHUwMmI3IjoidyIsIlx1MDJlMyI6IngiLCJcdTAyYjgiOiJ5IiwiXHUxZGJiIjoieiIsIlx1MWQ1ZCI6Ilx1MDNiMiIsIlx1MWQ1ZSI6Ilx1MDNiMyIsIlx1MWQ1ZiI6Ilx1MDNiNCIsIlx1MWQ2MCI6Ilx1MDNkNSIsIlx1MWQ2MSI6Ilx1MDNjNyIsIlx1MWRiZiI6Ilx1MDNiOCJ9KSxvbz17Ilx1MDMwMSI6e3RleHQ6IlxcJyIsbWF0aDoiXFxhY3V0ZSJ9LCJcdTAzMDAiOnt0ZXh0OiJcXGAiLG1hdGg6IlxcZ3JhdmUifSwiXHUwMzA4Ijp7dGV4dDonXFwiJyxtYXRoOiJcXGRkb3QifSwiXHUwMzAzIjp7dGV4dDoiXFx+IixtYXRoOiJcXHRpbGRlIn0sIlx1MDMwNCI6e3RleHQ6IlxcPSIsbWF0aDoiXFxiYXIifSwiXHUwMzA2Ijp7dGV4dDoiXFx1IixtYXRoOiJcXGJyZXZlIn0sIlx1MDMwYyI6e3RleHQ6IlxcdiIsbWF0aDoiXFxjaGVjayJ9LCJcdTAzMDIiOnt0ZXh0OiJcXF4iLG1hdGg6IlxcaGF0In0sIlx1MDMwNyI6e3RleHQ6IlxcLiIsbWF0aDoiXFxkb3QifSwiXHUwMzBhIjp7dGV4dDoiXFxyIixtYXRoOiJcXG1hdGhyaW5nIn0sIlx1MDMwYiI6e3RleHQ6IlxcSCJ9LCJcdTAzMjciOnt0ZXh0OiJcXGMifX0sc289eyJceGUxIjoiYVx1MDMwMSIsIlx4ZTAiOiJhXHUwMzAwIiwiXHhlNCI6ImFcdTAzMDgiLCJcdTAxZGYiOiJhXHUwMzA4XHUwMzA0IiwiXHhlMyI6ImFcdTAzMDMiLCJcdTAxMDEiOiJhXHUwMzA0IiwiXHUwMTAzIjoiYVx1MDMwNiIsIlx1MWVhZiI6ImFcdTAzMDZcdTAzMDEiLCJcdTFlYjEiOiJhXHUwMzA2XHUwMzAwIiwiXHUxZWI1IjoiYVx1MDMwNlx1MDMwMyIsIlx1MDFjZSI6ImFcdTAzMGMiLCJceGUyIjoiYVx1MDMwMiIsIlx1MWVhNSI6ImFcdTAzMDJcdTAzMDEiLCJcdTFlYTciOiJhXHUwMzAyXHUwMzAwIiwiXHUxZWFiIjoiYVx1MDMwMlx1MDMwMyIsIlx1MDIyNyI6ImFcdTAzMDciLCJcdTAxZTEiOiJhXHUwMzA3XHUwMzA0IiwiXHhlNSI6ImFcdTAzMGEiLCJcdTAxZmIiOiJhXHUwMzBhXHUwMzAxIiwiXHUxZTAzIjoiYlx1MDMwNyIsIlx1MDEwNyI6ImNcdTAzMDEiLCJcdTFlMDkiOiJjXHUwMzI3XHUwMzAxIiwiXHUwMTBkIjoiY1x1MDMwYyIsIlx1MDEwOSI6ImNcdTAzMDIiLCJcdTAxMGIiOiJjXHUwMzA3IiwiXHhlNyI6ImNcdTAzMjciLCJcdTAxMGYiOiJkXHUwMzBjIiwiXHUxZTBiIjoiZFx1MDMwNyIsIlx1MWUxMSI6ImRcdTAzMjciLCJceGU5IjoiZVx1MDMwMSIsIlx4ZTgiOiJlXHUwMzAwIiwiXHhlYiI6ImVcdTAzMDgiLCJcdTFlYmQiOiJlXHUwMzAzIiwiXHUwMTEzIjoiZVx1MDMwNCIsIlx1MWUxNyI6ImVcdTAzMDRcdTAzMDEiLCJcdTFlMTUiOiJlXHUwMzA0XHUwMzAwIiwiXHUwMTE1IjoiZVx1MDMwNiIsIlx1MWUxZCI6ImVcdTAzMjdcdTAzMDYiLCJcdTAxMWIiOiJlXHUwMzBjIiwiXHhlYSI6ImVcdTAzMDIiLCJcdTFlYmYiOiJlXHUwMzAyXHUwMzAxIiwiXHUxZWMxIjoiZVx1MDMwMlx1MDMwMCIsIlx1MWVjNSI6ImVcdTAzMDJcdTAzMDMiLCJcdTAxMTciOiJlXHUwMzA3IiwiXHUwMjI5IjoiZVx1MDMyNyIsIlx1MWUxZiI6ImZcdTAzMDciLCJcdTAxZjUiOiJnXHUwMzAxIiwiXHUxZTIxIjoiZ1x1MDMwNCIsIlx1MDExZiI6ImdcdTAzMDYiLCJcdTAxZTciOiJnXHUwMzBjIiwiXHUwMTFkIjoiZ1x1MDMwMiIsIlx1MDEyMSI6ImdcdTAzMDciLCJcdTAxMjMiOiJnXHUwMzI3IiwiXHUxZTI3IjoiaFx1MDMwOCIsIlx1MDIxZiI6ImhcdTAzMGMiLCJcdTAxMjUiOiJoXHUwMzAyIiwiXHUxZTIzIjoiaFx1MDMwNyIsIlx1MWUyOSI6ImhcdTAzMjciLCJceGVkIjoiaVx1MDMwMSIsIlx4ZWMiOiJpXHUwMzAwIiwiXHhlZiI6ImlcdTAzMDgiLCJcdTFlMmYiOiJpXHUwMzA4XHUwMzAxIiwiXHUwMTI5IjoiaVx1MDMwMyIsIlx1MDEyYiI6ImlcdTAzMDQiLCJcdTAxMmQiOiJpXHUwMzA2IiwiXHUwMWQwIjoiaVx1MDMwYyIsIlx4ZWUiOiJpXHUwMzAyIiwiXHUwMWYwIjoialx1MDMwYyIsIlx1MDEzNSI6ImpcdTAzMDIiLCJcdTFlMzEiOiJrXHUwMzAxIiwiXHUwMWU5Ijoia1x1MDMwYyIsIlx1MDEzNyI6ImtcdTAzMjciLCJcdTAxM2EiOiJsXHUwMzAxIiwiXHUwMTNlIjoibFx1MDMwYyIsIlx1MDEzYyI6ImxcdTAzMjciLCJcdTFlM2YiOiJtXHUwMzAxIiwiXHUxZTQxIjoibVx1MDMwNyIsIlx1MDE0NCI6Im5cdTAzMDEiLCJcdTAxZjkiOiJuXHUwMzAwIiwiXHhmMSI6Im5cdTAzMDMiLCJcdTAxNDgiOiJuXHUwMzBjIiwiXHUxZTQ1Ijoiblx1MDMwNyIsIlx1MDE0NiI6Im5cdTAzMjciLCJceGYzIjoib1x1MDMwMSIsIlx4ZjIiOiJvXHUwMzAwIiwiXHhmNiI6Im9cdTAzMDgiLCJcdTAyMmIiOiJvXHUwMzA4XHUwMzA0IiwiXHhmNSI6Im9cdTAzMDMiLCJcdTFlNGQiOiJvXHUwMzAzXHUwMzAxIiwiXHUxZTRmIjoib1x1MDMwM1x1MDMwOCIsIlx1MDIyZCI6Im9cdTAzMDNcdTAzMDQiLCJcdTAxNGQiOiJvXHUwMzA0IiwiXHUxZTUzIjoib1x1MDMwNFx1MDMwMSIsIlx1MWU1MSI6Im9cdTAzMDRcdTAzMDAiLCJcdTAxNGYiOiJvXHUwMzA2IiwiXHUwMWQyIjoib1x1MDMwYyIsIlx4ZjQiOiJvXHUwMzAyIiwiXHUxZWQxIjoib1x1MDMwMlx1MDMwMSIsIlx1MWVkMyI6Im9cdTAzMDJcdTAzMDAiLCJcdTFlZDciOiJvXHUwMzAyXHUwMzAzIiwiXHUwMjJmIjoib1x1MDMwNyIsIlx1MDIzMSI6Im9cdTAzMDdcdTAzMDQiLCJcdTAxNTEiOiJvXHUwMzBiIiwiXHUxZTU1IjoicFx1MDMwMSIsIlx1MWU1NyI6InBcdTAzMDciLCJcdTAxNTUiOiJyXHUwMzAxIiwiXHUwMTU5Ijoiclx1MDMwYyIsIlx1MWU1OSI6InJcdTAzMDciLCJcdTAxNTciOiJyXHUwMzI3IiwiXHUwMTViIjoic1x1MDMwMSIsIlx1MWU2NSI6InNcdTAzMDFcdTAzMDciLCJcdTAxNjEiOiJzXHUwMzBjIiwiXHUxZTY3Ijoic1x1MDMwY1x1MDMwNyIsIlx1MDE1ZCI6InNcdTAzMDIiLCJcdTFlNjEiOiJzXHUwMzA3IiwiXHUwMTVmIjoic1x1MDMyNyIsIlx1MWU5NyI6InRcdTAzMDgiLCJcdTAxNjUiOiJ0XHUwMzBjIiwiXHUxZTZiIjoidFx1MDMwNyIsIlx1MDE2MyI6InRcdTAzMjciLCJceGZhIjoidVx1MDMwMSIsIlx4ZjkiOiJ1XHUwMzAwIiwiXHhmYyI6InVcdTAzMDgiLCJcdTAxZDgiOiJ1XHUwMzA4XHUwMzAxIiwiXHUwMWRjIjoidVx1MDMwOFx1MDMwMCIsIlx1MDFkNiI6InVcdTAzMDhcdTAzMDQiLCJcdTAxZGEiOiJ1XHUwMzA4XHUwMzBjIiwiXHUwMTY5IjoidVx1MDMwMyIsIlx1MWU3OSI6InVcdTAzMDNcdTAzMDEiLCJcdTAxNmIiOiJ1XHUwMzA0IiwiXHUxZTdiIjoidVx1MDMwNFx1MDMwOCIsIlx1MDE2ZCI6InVcdTAzMDYiLCJcdTAxZDQiOiJ1XHUwMzBjIiwiXHhmYiI6InVcdTAzMDIiLCJcdTAxNmYiOiJ1XHUwMzBhIiwiXHUwMTcxIjoidVx1MDMwYiIsIlx1MWU3ZCI6InZcdTAzMDMiLCJcdTFlODMiOiJ3XHUwMzAxIiwiXHUxZTgxIjoid1x1MDMwMCIsIlx1MWU4NSI6IndcdTAzMDgiLCJcdTAxNzUiOiJ3XHUwMzAyIiwiXHUxZTg3Ijoid1x1MDMwNyIsIlx1MWU5OCI6IndcdTAzMGEiLCJcdTFlOGQiOiJ4XHUwMzA4IiwiXHUxZThiIjoieFx1MDMwNyIsIlx4ZmQiOiJ5XHUwMzAxIiwiXHUxZWYzIjoieVx1MDMwMCIsIlx4ZmYiOiJ5XHUwMzA4IiwiXHUxZWY5IjoieVx1MDMwMyIsIlx1MDIzMyI6InlcdTAzMDQiLCJcdTAxNzciOiJ5XHUwMzAyIiwiXHUxZThmIjoieVx1MDMwNyIsIlx1MWU5OSI6InlcdTAzMGEiLCJcdTAxN2EiOiJ6XHUwMzAxIiwiXHUwMTdlIjoielx1MDMwYyIsIlx1MWU5MSI6InpcdTAzMDIiLCJcdTAxN2MiOiJ6XHUwMzA3IiwiXHhjMSI6IkFcdTAzMDEiLCJceGMwIjoiQVx1MDMwMCIsIlx4YzQiOiJBXHUwMzA4IiwiXHUwMWRlIjoiQVx1MDMwOFx1MDMwNCIsIlx4YzMiOiJBXHUwMzAzIiwiXHUwMTAwIjoiQVx1MDMwNCIsIlx1MDEwMiI6IkFcdTAzMDYiLCJcdTFlYWUiOiJBXHUwMzA2XHUwMzAxIiwiXHUxZWIwIjoiQVx1MDMwNlx1MDMwMCIsIlx1MWViNCI6IkFcdTAzMDZcdTAzMDMiLCJcdTAxY2QiOiJBXHUwMzBjIiwiXHhjMiI6IkFcdTAzMDIiLCJcdTFlYTQiOiJBXHUwMzAyXHUwMzAxIiwiXHUxZWE2IjoiQVx1MDMwMlx1MDMwMCIsIlx1MWVhYSI6IkFcdTAzMDJcdTAzMDMiLCJcdTAyMjYiOiJBXHUwMzA3IiwiXHUwMWUwIjoiQVx1MDMwN1x1MDMwNCIsIlx4YzUiOiJBXHUwMzBhIiwiXHUwMWZhIjoiQVx1MDMwYVx1MDMwMSIsIlx1MWUwMiI6IkJcdTAzMDciLCJcdTAxMDYiOiJDXHUwMzAxIiwiXHUxZTA4IjoiQ1x1MDMyN1x1MDMwMSIsIlx1MDEwYyI6IkNcdTAzMGMiLCJcdTAxMDgiOiJDXHUwMzAyIiwiXHUwMTBhIjoiQ1x1MDMwNyIsIlx4YzciOiJDXHUwMzI3IiwiXHUwMTBlIjoiRFx1MDMwYyIsIlx1MWUwYSI6IkRcdTAzMDciLCJcdTFlMTAiOiJEXHUwMzI3IiwiXHhjOSI6IkVcdTAzMDEiLCJceGM4IjoiRVx1MDMwMCIsIlx4Y2IiOiJFXHUwMzA4IiwiXHUxZWJjIjoiRVx1MDMwMyIsIlx1MDExMiI6IkVcdTAzMDQiLCJcdTFlMTYiOiJFXHUwMzA0XHUwMzAxIiwiXHUxZTE0IjoiRVx1MDMwNFx1MDMwMCIsIlx1MDExNCI6IkVcdTAzMDYiLCJcdTFlMWMiOiJFXHUwMzI3XHUwMzA2IiwiXHUwMTFhIjoiRVx1MDMwYyIsIlx4Y2EiOiJFXHUwMzAyIiwiXHUxZWJlIjoiRVx1MDMwMlx1MDMwMSIsIlx1MWVjMCI6IkVcdTAzMDJcdTAzMDAiLCJcdTFlYzQiOiJFXHUwMzAyXHUwMzAzIiwiXHUwMTE2IjoiRVx1MDMwNyIsIlx1MDIyOCI6IkVcdTAzMjciLCJcdTFlMWUiOiJGXHUwMzA3IiwiXHUwMWY0IjoiR1x1MDMwMSIsIlx1MWUyMCI6IkdcdTAzMDQiLCJcdTAxMWUiOiJHXHUwMzA2IiwiXHUwMWU2IjoiR1x1MDMwYyIsIlx1MDExYyI6IkdcdTAzMDIiLCJcdTAxMjAiOiJHXHUwMzA3IiwiXHUwMTIyIjoiR1x1MDMyNyIsIlx1MWUyNiI6IkhcdTAzMDgiLCJcdTAyMWUiOiJIXHUwMzBjIiwiXHUwMTI0IjoiSFx1MDMwMiIsIlx1MWUyMiI6IkhcdTAzMDciLCJcdTFlMjgiOiJIXHUwMzI3IiwiXHhjZCI6IklcdTAzMDEiLCJceGNjIjoiSVx1MDMwMCIsIlx4Y2YiOiJJXHUwMzA4IiwiXHUxZTJlIjoiSVx1MDMwOFx1MDMwMSIsIlx1MDEyOCI6IklcdTAzMDMiLCJcdTAxMmEiOiJJXHUwMzA0IiwiXHUwMTJjIjoiSVx1MDMwNiIsIlx1MDFjZiI6IklcdTAzMGMiLCJceGNlIjoiSVx1MDMwMiIsIlx1MDEzMCI6IklcdTAzMDciLCJcdTAxMzQiOiJKXHUwMzAyIiwiXHUxZTMwIjoiS1x1MDMwMSIsIlx1MDFlOCI6IktcdTAzMGMiLCJcdTAxMzYiOiJLXHUwMzI3IiwiXHUwMTM5IjoiTFx1MDMwMSIsIlx1MDEzZCI6IkxcdTAzMGMiLCJcdTAxM2IiOiJMXHUwMzI3IiwiXHUxZTNlIjoiTVx1MDMwMSIsIlx1MWU0MCI6Ik1cdTAzMDciLCJcdTAxNDMiOiJOXHUwMzAxIiwiXHUwMWY4IjoiTlx1MDMwMCIsIlx4ZDEiOiJOXHUwMzAzIiwiXHUwMTQ3IjoiTlx1MDMwYyIsIlx1MWU0NCI6Ik5cdTAzMDciLCJcdTAxNDUiOiJOXHUwMzI3IiwiXHhkMyI6Ik9cdTAzMDEiLCJceGQyIjoiT1x1MDMwMCIsIlx4ZDYiOiJPXHUwMzA4IiwiXHUwMjJhIjoiT1x1MDMwOFx1MDMwNCIsIlx4ZDUiOiJPXHUwMzAzIiwiXHUxZTRjIjoiT1x1MDMwM1x1MDMwMSIsIlx1MWU0ZSI6Ik9cdTAzMDNcdTAzMDgiLCJcdTAyMmMiOiJPXHUwMzAzXHUwMzA0IiwiXHUwMTRjIjoiT1x1MDMwNCIsIlx1MWU1MiI6Ik9cdTAzMDRcdTAzMDEiLCJcdTFlNTAiOiJPXHUwMzA0XHUwMzAwIiwiXHUwMTRlIjoiT1x1MDMwNiIsIlx1MDFkMSI6Ik9cdTAzMGMiLCJceGQ0IjoiT1x1MDMwMiIsIlx1MWVkMCI6Ik9cdTAzMDJcdTAzMDEiLCJcdTFlZDIiOiJPXHUwMzAyXHUwMzAwIiwiXHUxZWQ2IjoiT1x1MDMwMlx1MDMwMyIsIlx1MDIyZSI6Ik9cdTAzMDciLCJcdTAyMzAiOiJPXHUwMzA3XHUwMzA0IiwiXHUwMTUwIjoiT1x1MDMwYiIsIlx1MWU1NCI6IlBcdTAzMDEiLCJcdTFlNTYiOiJQXHUwMzA3IiwiXHUwMTU0IjoiUlx1MDMwMSIsIlx1MDE1OCI6IlJcdTAzMGMiLCJcdTFlNTgiOiJSXHUwMzA3IiwiXHUwMTU2IjoiUlx1MDMyNyIsIlx1MDE1YSI6IlNcdTAzMDEiLCJcdTFlNjQiOiJTXHUwMzAxXHUwMzA3IiwiXHUwMTYwIjoiU1x1MDMwYyIsIlx1MWU2NiI6IlNcdTAzMGNcdTAzMDciLCJcdTAxNWMiOiJTXHUwMzAyIiwiXHUxZTYwIjoiU1x1MDMwNyIsIlx1MDE1ZSI6IlNcdTAzMjciLCJcdTAxNjQiOiJUXHUwMzBjIiwiXHUxZTZhIjoiVFx1MDMwNyIsIlx1MDE2MiI6IlRcdTAzMjciLCJceGRhIjoiVVx1MDMwMSIsIlx4ZDkiOiJVXHUwMzAwIiwiXHhkYyI6IlVcdTAzMDgiLCJcdTAxZDciOiJVXHUwMzA4XHUwMzAxIiwiXHUwMWRiIjoiVVx1MDMwOFx1MDMwMCIsIlx1MDFkNSI6IlVcdTAzMDhcdTAzMDQiLCJcdTAxZDkiOiJVXHUwMzA4XHUwMzBjIiwiXHUwMTY4IjoiVVx1MDMwMyIsIlx1MWU3OCI6IlVcdTAzMDNcdTAzMDEiLCJcdTAxNmEiOiJVXHUwMzA0IiwiXHUxZTdhIjoiVVx1MDMwNFx1MDMwOCIsIlx1MDE2YyI6IlVcdTAzMDYiLCJcdTAxZDMiOiJVXHUwMzBjIiwiXHhkYiI6IlVcdTAzMDIiLCJcdTAxNmUiOiJVXHUwMzBhIiwiXHUwMTcwIjoiVVx1MDMwYiIsIlx1MWU3YyI6IlZcdTAzMDMiLCJcdTFlODIiOiJXXHUwMzAxIiwiXHUxZTgwIjoiV1x1MDMwMCIsIlx1MWU4NCI6IldcdTAzMDgiLCJcdTAxNzQiOiJXXHUwMzAyIiwiXHUxZTg2IjoiV1x1MDMwNyIsIlx1MWU4YyI6IlhcdTAzMDgiLCJcdTFlOGEiOiJYXHUwMzA3IiwiXHhkZCI6IllcdTAzMDEiLCJcdTFlZjIiOiJZXHUwMzAwIiwiXHUwMTc4IjoiWVx1MDMwOCIsIlx1MWVmOCI6IllcdTAzMDMiLCJcdTAyMzIiOiJZXHUwMzA0IiwiXHUwMTc2IjoiWVx1MDMwMiIsIlx1MWU4ZSI6IllcdTAzMDciLCJcdTAxNzkiOiJaXHUwMzAxIiwiXHUwMTdkIjoiWlx1MDMwYyIsIlx1MWU5MCI6IlpcdTAzMDIiLCJcdTAxN2IiOiJaXHUwMzA3IiwiXHUwM2FjIjoiXHUwM2IxXHUwMzAxIiwiXHUxZjcwIjoiXHUwM2IxXHUwMzAwIiwiXHUxZmIxIjoiXHUwM2IxXHUwMzA0IiwiXHUxZmIwIjoiXHUwM2IxXHUwMzA2IiwiXHUwM2FkIjoiXHUwM2I1XHUwMzAxIiwiXHUxZjcyIjoiXHUwM2I1XHUwMzAwIiwiXHUwM2FlIjoiXHUwM2I3XHUwMzAxIiwiXHUxZjc0IjoiXHUwM2I3XHUwMzAwIiwiXHUwM2FmIjoiXHUwM2I5XHUwMzAxIiwiXHUxZjc2IjoiXHUwM2I5XHUwMzAwIiwiXHUwM2NhIjoiXHUwM2I5XHUwMzA4IiwiXHUwMzkwIjoiXHUwM2I5XHUwMzA4XHUwMzAxIiwiXHUxZmQyIjoiXHUwM2I5XHUwMzA4XHUwMzAwIiwiXHUxZmQxIjoiXHUwM2I5XHUwMzA0IiwiXHUxZmQwIjoiXHUwM2I5XHUwMzA2IiwiXHUwM2NjIjoiXHUwM2JmXHUwMzAxIiwiXHUxZjc4IjoiXHUwM2JmXHUwMzAwIiwiXHUwM2NkIjoiXHUwM2M1XHUwMzAxIiwiXHUxZjdhIjoiXHUwM2M1XHUwMzAwIiwiXHUwM2NiIjoiXHUwM2M1XHUwMzA4IiwiXHUwM2IwIjoiXHUwM2M1XHUwMzA4XHUwMzAxIiwiXHUxZmUyIjoiXHUwM2M1XHUwMzA4XHUwMzAwIiwiXHUxZmUxIjoiXHUwM2M1XHUwMzA0IiwiXHUxZmUwIjoiXHUwM2M1XHUwMzA2IiwiXHUwM2NlIjoiXHUwM2M5XHUwMzAxIiwiXHUxZjdjIjoiXHUwM2M5XHUwMzAwIiwiXHUwMzhlIjoiXHUwM2E1XHUwMzAxIiwiXHUxZmVhIjoiXHUwM2E1XHUwMzAwIiwiXHUwM2FiIjoiXHUwM2E1XHUwMzA4IiwiXHUxZmU5IjoiXHUwM2E1XHUwMzA0IiwiXHUxZmU4IjoiXHUwM2E1XHUwMzA2IiwiXHUwMzhmIjoiXHUwM2E5XHUwMzAxIiwiXHUxZmZhIjoiXHUwM2E5XHUwMzAwIn07Y2xhc3MgaW97Y29uc3RydWN0b3IoZSx0KXt0aGlzLm1vZGU9dm9pZCAwLHRoaXMuZ3VsbGV0PXZvaWQgMCx0aGlzLnNldHRpbmdzPXZvaWQgMCx0aGlzLmxlZnRyaWdodERlcHRoPXZvaWQgMCx0aGlzLm5leHRUb2tlbj12b2lkIDAsdGhpcy5tb2RlPSJtYXRoIix0aGlzLmd1bGxldD1uZXcgdG8oZSx0LHRoaXMubW9kZSksdGhpcy5zZXR0aW5ncz10LHRoaXMubGVmdHJpZ2h0RGVwdGg9MCx0aGlzLm5leHRUb2tlbj1udWxsfWV4cGVjdChlLHQpe2lmKHZvaWQgMD09PXQmJih0PSEwKSx0aGlzLmZldGNoKCkudGV4dCE9PWUpdGhyb3cgbmV3IG4oIkV4cGVjdGVkICciK2UrIicsIGdvdCAnIit0aGlzLmZldGNoKCkudGV4dCsiJyIsdGhpcy5mZXRjaCgpKTt0JiZ0aGlzLmNvbnN1bWUoKX1jb25zdW1lKCl7dGhpcy5uZXh0VG9rZW49bnVsbH1mZXRjaCgpe3JldHVybiBudWxsPT10aGlzLm5leHRUb2tlbiYmKHRoaXMubmV4dFRva2VuPXRoaXMuZ3VsbGV0LmV4cGFuZE5leHRUb2tlbigpKSx0aGlzLm5leHRUb2tlbn1zd2l0Y2hNb2RlKGUpe3RoaXMubW9kZT1lLHRoaXMuZ3VsbGV0LnN3aXRjaE1vZGUoZSl9cGFyc2UoKXt0aGlzLnNldHRpbmdzLmdsb2JhbEdyb3VwfHx0aGlzLmd1bGxldC5iZWdpbkdyb3VwKCksdGhpcy5zZXR0aW5ncy5jb2xvcklzVGV4dENvbG9yJiZ0aGlzLmd1bGxldC5tYWNyb3Muc2V0KCJcXGNvbG9yIiwiXFx0ZXh0Y29sb3IiKTt0cnl7Y29uc3QgZT10aGlzLnBhcnNlRXhwcmVzc2lvbighMSk7cmV0dXJuIHRoaXMuZXhwZWN0KCJFT0YiKSx0aGlzLnNldHRpbmdzLmdsb2JhbEdyb3VwfHx0aGlzLmd1bGxldC5lbmRHcm91cCgpLGV9ZmluYWxseXt0aGlzLmd1bGxldC5lbmRHcm91cHMoKX19c3VicGFyc2UoZSl7Y29uc3QgdD10aGlzLm5leHRUb2tlbjt0aGlzLmNvbnN1bWUoKSx0aGlzLmd1bGxldC5wdXNoVG9rZW4obmV3IGVuKCJ9IikpLHRoaXMuZ3VsbGV0LnB1c2hUb2tlbnMoZSk7Y29uc3Qgcj10aGlzLnBhcnNlRXhwcmVzc2lvbighMSk7cmV0dXJuIHRoaXMuZXhwZWN0KCJ9IiksdGhpcy5uZXh0VG9rZW49dCxyfXBhcnNlRXhwcmVzc2lvbihlLHQpe2NvbnN0IHI9W107Zm9yKDs7KXsibWF0aCI9PT10aGlzLm1vZGUmJnRoaXMuY29uc3VtZVNwYWNlcygpO2NvbnN0IG49dGhpcy5mZXRjaCgpO2lmKGlvLmVuZE9mRXhwcmVzc2lvbi5oYXMobi50ZXh0KSlicmVhaztpZih0JiZuLnRleHQ9PT10KWJyZWFrO2lmKGUmJkxuW24udGV4dF0mJkxuW24udGV4dF0uaW5maXgpYnJlYWs7Y29uc3Qgbz10aGlzLnBhcnNlQXRvbSh0KTtpZighbylicmVhazsiaW50ZXJuYWwiIT09by50eXBlJiZyLnB1c2gobyl9cmV0dXJuInRleHQiPT09dGhpcy5tb2RlJiZ0aGlzLmZvcm1MaWdhdHVyZXMociksdGhpcy5oYW5kbGVJbmZpeE5vZGVzKHIpfWhhbmRsZUluZml4Tm9kZXMoZSl7bGV0IHQscj0tMTtmb3IobGV0IG89MDtvPGUubGVuZ3RoO28rKyl7Y29uc3Qgcz1lW29dO2lmKCJpbmZpeCI9PT1zLnR5cGUpe2lmKC0xIT09cil0aHJvdyBuZXcgbigib25seSBvbmUgaW5maXggb3BlcmF0b3IgcGVyIGdyb3VwIixzLnRva2VuKTtyPW8sdD1zLnJlcGxhY2VXaXRofX1pZigtMSE9PXImJnQpe2xldCBuLG87Y29uc3Qgcz1lLnNsaWNlKDAsciksaT1lLnNsaWNlKHIrMSk7bGV0IGw7cmV0dXJuIG49MT09PXMubGVuZ3RoJiYib3JkZ3JvdXAiPT09c1swXS50eXBlP3NbMF06e3R5cGU6Im9yZGdyb3VwIixtb2RlOnRoaXMubW9kZSxib2R5OnN9LG89MT09PWkubGVuZ3RoJiYib3JkZ3JvdXAiPT09aVswXS50eXBlP2lbMF06e3R5cGU6Im9yZGdyb3VwIixtb2RlOnRoaXMubW9kZSxib2R5Oml9LGw9IlxcXFxhYm92ZWZyYWMiPT09dD90aGlzLmNhbGxGdW5jdGlvbih0LFtuLGVbcl0sb10sW10pOnRoaXMuY2FsbEZ1bmN0aW9uKHQsW24sb10sW10pLFtsXX1yZXR1cm4gZX1oYW5kbGVTdXBTdWJzY3JpcHQoZSl7Y29uc3QgdD10aGlzLmZldGNoKCkscj10LnRleHQ7bGV0IG87dGhpcy5jb25zdW1lKCksdGhpcy5jb25zdW1lU3BhY2VzKCk7ZG97dmFyIHM7bz10aGlzLnBhcnNlR3JvdXAoZSl9d2hpbGUoImludGVybmFsIj09PShudWxsPT0ocz1vKT92b2lkIDA6cy50eXBlKSk7aWYoIW8pdGhyb3cgbmV3IG4oIkV4cGVjdGVkIGdyb3VwIGFmdGVyICciK3IrIiciLHQpO3JldHVybiBvfWZvcm1hdFVuc3VwcG9ydGVkQ21kKGUpe2NvbnN0IHQ9W107Zm9yKGxldCByPTA7cjxlLmxlbmd0aDtyKyspdC5wdXNoKHt0eXBlOiJ0ZXh0b3JkIixtb2RlOiJ0ZXh0Iix0ZXh0OmVbcl19KTtjb25zdCByPXt0eXBlOiJ0ZXh0Iixtb2RlOnRoaXMubW9kZSxib2R5OnR9O3JldHVybnt0eXBlOiJjb2xvciIsbW9kZTp0aGlzLm1vZGUsY29sb3I6dGhpcy5zZXR0aW5ncy5lcnJvckNvbG9yLGJvZHk6W3JdfX1wYXJzZUF0b20oZSl7Y29uc3QgdD10aGlzLnBhcnNlR3JvdXAoImF0b20iLGUpO2lmKCJpbnRlcm5hbCI9PT0obnVsbD09dD92b2lkIDA6dC50eXBlKSlyZXR1cm4gdDtpZigidGV4dCI9PT10aGlzLm1vZGUpcmV0dXJuIHQ7bGV0IHIsbztmb3IoOzspe3RoaXMuY29uc3VtZVNwYWNlcygpO2NvbnN0IGU9dGhpcy5mZXRjaCgpO2lmKCJcXGxpbWl0cyI9PT1lLnRleHR8fCJcXG5vbGltaXRzIj09PWUudGV4dCl7aWYodCYmIm9wIj09PXQudHlwZSl0LmxpbWl0cz0iXFxsaW1pdHMiPT09ZS50ZXh0LHQuYWx3YXlzSGFuZGxlU3VwU3ViPSEwO2Vsc2V7aWYoIXR8fCJvcGVyYXRvcm5hbWUiIT09dC50eXBlKXRocm93IG5ldyBuKCJMaW1pdCBjb250cm9scyBtdXN0IGZvbGxvdyBhIG1hdGggb3BlcmF0b3IiLGUpO3QuYWx3YXlzSGFuZGxlU3VwU3ViJiYodC5saW1pdHM9IlxcbGltaXRzIj09PWUudGV4dCl9dGhpcy5jb25zdW1lKCl9ZWxzZSBpZigiXiI9PT1lLnRleHQpe2lmKHIpdGhyb3cgbmV3IG4oIkRvdWJsZSBzdXBlcnNjcmlwdCIsZSk7cj10aGlzLmhhbmRsZVN1cFN1YnNjcmlwdCgic3VwZXJzY3JpcHQiKX1lbHNlIGlmKCJfIj09PWUudGV4dCl7aWYobyl0aHJvdyBuZXcgbigiRG91YmxlIHN1YnNjcmlwdCIsZSk7bz10aGlzLmhhbmRsZVN1cFN1YnNjcmlwdCgic3Vic2NyaXB0Iil9ZWxzZSBpZigiJyI9PT1lLnRleHQpe2lmKHIpdGhyb3cgbmV3IG4oIkRvdWJsZSBzdXBlcnNjcmlwdCIsZSk7Y29uc3QgdD17dHlwZToidGV4dG9yZCIsbW9kZTp0aGlzLm1vZGUsdGV4dDoiXFxwcmltZSJ9LG89W3RdO2Zvcih0aGlzLmNvbnN1bWUoKTsiJyI9PT10aGlzLmZldGNoKCkudGV4dDspby5wdXNoKHQpLHRoaXMuY29uc3VtZSgpOyJeIj09PXRoaXMuZmV0Y2goKS50ZXh0JiZvLnB1c2godGhpcy5oYW5kbGVTdXBTdWJzY3JpcHQoInN1cGVyc2NyaXB0IikpLHI9e3R5cGU6Im9yZGdyb3VwIixtb2RlOnRoaXMubW9kZSxib2R5Om99fWVsc2V7aWYoIW5vW2UudGV4dF0pYnJlYWs7e2NvbnN0IHQ9cm8udGVzdChlLnRleHQpLG49W107Zm9yKG4ucHVzaChuZXcgZW4obm9bZS50ZXh0XSkpLHRoaXMuY29uc3VtZSgpOzspe2NvbnN0IGU9dGhpcy5mZXRjaCgpLnRleHQ7aWYoIW5vW2VdKWJyZWFrO2lmKHJvLnRlc3QoZSkhPT10KWJyZWFrO24udW5zaGlmdChuZXcgZW4obm9bZV0pKSx0aGlzLmNvbnN1bWUoKX1jb25zdCBzPXRoaXMuc3VicGFyc2Uobik7dD9vPXt0eXBlOiJvcmRncm91cCIsbW9kZToibWF0aCIsYm9keTpzfTpyPXt0eXBlOiJvcmRncm91cCIsbW9kZToibWF0aCIsYm9keTpzfX19fXJldHVybiByJiZvP3t0eXBlOiJzdXBzdWIiLG1vZGU6dGhpcy5tb2RlLGJhc2U6dCxzdXA6cixzdWI6b306cj97dHlwZToic3Vwc3ViIixtb2RlOnRoaXMubW9kZSxiYXNlOnQsc3VwOnJ9Om8/e3R5cGU6InN1cHN1YiIsbW9kZTp0aGlzLm1vZGUsYmFzZTp0LHN1YjpvfTp0fXBhcnNlRnVuY3Rpb24oZSx0KXtjb25zdCByPXRoaXMuZmV0Y2goKSxvPXIudGV4dCxzPUxuW29dO2lmKCFzKXJldHVybiBudWxsO2lmKHRoaXMuY29uc3VtZSgpLHQmJiJhdG9tIiE9PXQmJiFzLmFsbG93ZWRJbkFyZ3VtZW50KXRocm93IG5ldyBuKCJHb3QgZnVuY3Rpb24gJyIrbysiJyB3aXRoIG5vIGFyZ3VtZW50cyIrKHQ/IiBhcyAiK3Q6IiIpLHIpO2lmKCJ0ZXh0Ij09PXRoaXMubW9kZSYmIXMuYWxsb3dlZEluVGV4dCl0aHJvdyBuZXcgbigiQ2FuJ3QgdXNlIGZ1bmN0aW9uICciK28rIicgaW4gdGV4dCBtb2RlIixyKTtpZigibWF0aCI9PT10aGlzLm1vZGUmJiExPT09cy5hbGxvd2VkSW5NYXRoKXRocm93IG5ldyBuKCJDYW4ndCB1c2UgZnVuY3Rpb24gJyIrbysiJyBpbiBtYXRoIG1vZGUiLHIpO2NvbnN0IGk9dGhpcy5wYXJzZUFyZ3VtZW50cyhvLHMpLGw9aS5hcmdzLGE9aS5vcHRBcmdzO3JldHVybiB0aGlzLmNhbGxGdW5jdGlvbihvLGwsYSxyLGUpfWNhbGxGdW5jdGlvbihlLHQscixvLHMpe2NvbnN0IGk9e2Z1bmNOYW1lOmUscGFyc2VyOnRoaXMsdG9rZW46byxicmVha09uVG9rZW5UZXh0OnN9LGw9TG5bZV07aWYobCYmbC5oYW5kbGVyKXJldHVybiBsLmhhbmRsZXIoaSx0LHIpO3Rocm93IG5ldyBuKCJObyBmdW5jdGlvbiBoYW5kbGVyIGZvciAiK2UpfXBhcnNlQXJndW1lbnRzKGUsdCl7dmFyIHI7Y29uc3Qgbz1udWxsIT0ocj10Lm51bU9wdGlvbmFsQXJncyk/cjowLHM9dC5udW1BcmdzK287aWYoMD09PXMpcmV0dXJue2FyZ3M6W10sb3B0QXJnczpbXX07Y29uc3QgaT1bXSxsPVtdO2ZvcihsZXQgcj0wO3I8cztyKyspe3ZhciBhO2xldCBzPW51bGw9PShhPXQuYXJnVHlwZXMpP3ZvaWQgMDphW3JdO2NvbnN0IGM9cjxvOygicHJpbWl0aXZlImluIHQmJnQucHJpbWl0aXZlJiZudWxsPT1zfHwic3FydCI9PT10LnR5cGUmJjE9PT1yJiZudWxsPT1sWzBdKSYmKHM9InByaW1pdGl2ZSIpO2NvbnN0IGg9dGhpcy5wYXJzZUdyb3VwT2ZUeXBlKCJhcmd1bWVudCB0byAnIitlKyInIixzLGMpO2lmKGMpbC5wdXNoKGgpO2Vsc2V7aWYobnVsbD09aCl0aHJvdyBuZXcgbigiTnVsbCBhcmd1bWVudCwgcGxlYXNlIHJlcG9ydCB0aGlzIGFzIGEgYnVnIik7aS5wdXNoKGgpfX1yZXR1cm57YXJnczppLG9wdEFyZ3M6bH19cGFyc2VHcm91cE9mVHlwZShlLHQscil7c3dpdGNoKHQpe2Nhc2UiY29sb3IiOnJldHVybiB0aGlzLnBhcnNlQ29sb3JHcm91cChyKTtjYXNlInNpemUiOnJldHVybiB0aGlzLnBhcnNlU2l6ZUdyb3VwKHIpO2Nhc2UidXJsIjpyZXR1cm4gdGhpcy5wYXJzZVVybEdyb3VwKHIpO2Nhc2UibWF0aCI6Y2FzZSJ0ZXh0IjpyZXR1cm4gdGhpcy5wYXJzZUFyZ3VtZW50R3JvdXAocix0KTtjYXNlImhib3giOntjb25zdCBlPXRoaXMucGFyc2VBcmd1bWVudEdyb3VwKHIsInRleHQiKTtyZXR1cm4gbnVsbCE9ZT97dHlwZToic3R5bGluZyIsbW9kZTplLm1vZGUsYm9keTpbZV0sc3R5bGU6InRleHQiLHJlc2V0Rm9udDohMH06bnVsbH1jYXNlInJhdyI6e2NvbnN0IGU9dGhpcy5wYXJzZVN0cmluZ0dyb3VwKHIpO3JldHVybiBudWxsIT1lP3t0eXBlOiJyYXciLG1vZGU6InRleHQiLHN0cmluZzplLnRleHR9Om51bGx9Y2FzZSJwcmltaXRpdmUiOntpZihyKXRocm93IG5ldyBuKCJBIHByaW1pdGl2ZSBhcmd1bWVudCBjYW5ub3QgYmUgb3B0aW9uYWwiKTtjb25zdCB0PXRoaXMucGFyc2VHcm91cChlKTtpZihudWxsPT10KXRocm93IG5ldyBuKCJFeHBlY3RlZCBncm91cCBhcyAiK2UsdGhpcy5mZXRjaCgpKTtyZXR1cm4gdH1jYXNlIm9yaWdpbmFsIjpjYXNlIHZvaWQgMDpyZXR1cm4gdGhpcy5wYXJzZUFyZ3VtZW50R3JvdXAocik7ZGVmYXVsdDp0aHJvdyBuZXcgbigiVW5rbm93biBncm91cCB0eXBlIGFzICIrZSx0aGlzLmZldGNoKCkpfX1jb25zdW1lU3BhY2VzKCl7Zm9yKDsiICI9PT10aGlzLmZldGNoKCkudGV4dDspdGhpcy5jb25zdW1lKCl9cGFyc2VTdHJpbmdHcm91cChlKXtjb25zdCB0PXRoaXMuZ3VsbGV0LnNjYW5Bcmd1bWVudChlKTtpZihudWxsPT10KXJldHVybiBudWxsO2xldCByLG49IiI7Zm9yKDsiRU9GIiE9PShyPXRoaXMuZmV0Y2goKSkudGV4dDspbis9ci50ZXh0LHRoaXMuY29uc3VtZSgpO3JldHVybiB0aGlzLmNvbnN1bWUoKSx0LnRleHQ9bix0fXBhcnNlUmVnZXhHcm91cChlLHQpe2NvbnN0IHI9dGhpcy5mZXRjaCgpO2xldCBvLHM9cixpPSIiO2Zvcig7IkVPRiIhPT0obz10aGlzLmZldGNoKCkpLnRleHQmJmUudGVzdChpK28udGV4dCk7KXM9byxpKz1zLnRleHQsdGhpcy5jb25zdW1lKCk7aWYoIiI9PT1pKXRocm93IG5ldyBuKCJJbnZhbGlkICIrdCsiOiAnIityLnRleHQrIiciLHIpO3JldHVybiByLnJhbmdlKHMsaSl9cGFyc2VDb2xvckdyb3VwKGUpe2NvbnN0IHQ9dGhpcy5wYXJzZVN0cmluZ0dyb3VwKGUpO2lmKG51bGw9PXQpcmV0dXJuIG51bGw7Y29uc3Qgcj0vXigjW2EtZjAtOV17Myw0fXwjW2EtZjAtOV17Nn18I1thLWYwLTldezh9fFthLWYwLTldezZ9fFthLXpdKykkL2kuZXhlYyh0LnRleHQpO2lmKCFyKXRocm93IG5ldyBuKCJJbnZhbGlkIGNvbG9yOiAnIit0LnRleHQrIiciLHQpO2xldCBvPXJbMF07cmV0dXJuL15bMC05YS1mXXs2fSQvaS50ZXN0KG8pJiYobz0iIyIrbykse3R5cGU6ImNvbG9yLXRva2VuIixtb2RlOnRoaXMubW9kZSxjb2xvcjpvfX1wYXJzZVNpemVHcm91cChlKXtsZXQgdCxyPSExO2lmKHRoaXMuZ3VsbGV0LmNvbnN1bWVTcGFjZXMoKSx0PWV8fCJ7Ij09PXRoaXMuZ3VsbGV0LmZ1dHVyZSgpLnRleHQ/dGhpcy5wYXJzZVN0cmluZ0dyb3VwKGUpOnRoaXMucGFyc2VSZWdleEdyb3VwKC9eWy0rXT8gKig/OiR8XGQrfFxkK1wuXGQqfFwuXGQqKSAqW2Etel17MCwyfSAqJC8sInNpemUiKSwhdClyZXR1cm4gbnVsbDtlfHwwIT09dC50ZXh0Lmxlbmd0aHx8KHQudGV4dD0iMHB0IixyPSEwKTtjb25zdCBvPS8oWy0rXT8pICooXGQrKD86XC5cZCopP3xcLlxkKykgKihbYS16XXsyfSkvLmV4ZWModC50ZXh0KTtpZighbyl0aHJvdyBuZXcgbigiSW52YWxpZCBzaXplOiAnIit0LnRleHQrIiciLHQpO2NvbnN0IHM9e251bWJlcjorKG9bMV0rb1syXSksdW5pdDpvWzNdfTtpZighRShzKSl0aHJvdyBuZXcgbigiSW52YWxpZCB1bml0OiAnIitzLnVuaXQrIiciLHQpO3JldHVybnt0eXBlOiJzaXplIixtb2RlOnRoaXMubW9kZSx2YWx1ZTpzLGlzQmxhbms6cn19cGFyc2VVcmxHcm91cChlKXt0aGlzLmd1bGxldC5sZXhlci5zZXRDYXRjb2RlKCIlIiwxMyksdGhpcy5ndWxsZXQubGV4ZXIuc2V0Q2F0Y29kZSgifiIsMTIpO2NvbnN0IHQ9dGhpcy5wYXJzZVN0cmluZ0dyb3VwKGUpO2lmKHRoaXMuZ3VsbGV0LmxleGVyLnNldENhdGNvZGUoIiUiLDE0KSx0aGlzLmd1bGxldC5sZXhlci5zZXRDYXRjb2RlKCJ+IiwxMyksbnVsbD09dClyZXR1cm4gbnVsbDtjb25zdCByPXQudGV4dC5yZXBsYWNlKC9cXChbIyQlJn5fXnt9XSkvZywiJDEiKTtyZXR1cm57dHlwZToidXJsIixtb2RlOnRoaXMubW9kZSx1cmw6cn19cGFyc2VBcmd1bWVudEdyb3VwKGUsdCl7Y29uc3Qgcj10aGlzLmd1bGxldC5zY2FuQXJndW1lbnQoZSk7aWYobnVsbD09cilyZXR1cm4gbnVsbDtjb25zdCBuPXRoaXMubW9kZTt0JiZ0aGlzLnN3aXRjaE1vZGUodCksdGhpcy5ndWxsZXQuYmVnaW5Hcm91cCgpO2NvbnN0IG89dGhpcy5wYXJzZUV4cHJlc3Npb24oITEsIkVPRiIpO3RoaXMuZXhwZWN0KCJFT0YiKSx0aGlzLmd1bGxldC5lbmRHcm91cCgpO2NvbnN0IHM9e3R5cGU6Im9yZGdyb3VwIixtb2RlOnRoaXMubW9kZSxsb2M6ci5sb2MsYm9keTpvfTtyZXR1cm4gdCYmdGhpcy5zd2l0Y2hNb2RlKG4pLHN9cGFyc2VHcm91cChlLHQpe2NvbnN0IHI9dGhpcy5mZXRjaCgpLG89ci50ZXh0O2xldCBzO2lmKCJ7Ij09PW98fCJcXGJlZ2luZ3JvdXAiPT09byl7dGhpcy5jb25zdW1lKCk7Y29uc3QgZT0ieyI9PT1vPyJ9IjoiXFxlbmRncm91cCI7dGhpcy5ndWxsZXQuYmVnaW5Hcm91cCgpO2NvbnN0IHQ9dGhpcy5wYXJzZUV4cHJlc3Npb24oITEsZSksbj10aGlzLmZldGNoKCk7dGhpcy5leHBlY3QoZSksdGhpcy5ndWxsZXQuZW5kR3JvdXAoKSxzPXt0eXBlOiJvcmRncm91cCIsbW9kZTp0aGlzLm1vZGUsbG9jOlFyLnJhbmdlKHIsbiksYm9keTp0LHNlbWlzaW1wbGU6IlxcYmVnaW5ncm91cCI9PT1vfHx2b2lkIDB9fWVsc2UgaWYocz10aGlzLnBhcnNlRnVuY3Rpb24odCxlKXx8dGhpcy5wYXJzZVN5bWJvbCgpLG51bGw9PXMmJiJcXCI9PT1vWzBdJiYhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGVvLG8pKXtpZih0aGlzLnNldHRpbmdzLnRocm93T25FcnJvcil0aHJvdyBuZXcgbigiVW5kZWZpbmVkIGNvbnRyb2wgc2VxdWVuY2U6ICIrbyxyKTtzPXRoaXMuZm9ybWF0VW5zdXBwb3J0ZWRDbWQobyksdGhpcy5jb25zdW1lKCl9cmV0dXJuIHN9Zm9ybUxpZ2F0dXJlcyhlKXtsZXQgdD1lLmxlbmd0aC0xO2ZvcihsZXQgcj0wO3I8dDsrK3Ipe2NvbnN0IG49ZVtyXTtpZigidGV4dG9yZCIhPT1uLnR5cGUpY29udGludWU7Y29uc3Qgbz1uLnRleHQscz1lW3IrMV07aWYocyYmInRleHRvcmQiPT09cy50eXBlKXtpZigiLSI9PT1vJiYiLSI9PT1zLnRleHQpe2NvbnN0IG89ZVtyKzJdO3IrMTx0JiZvJiYidGV4dG9yZCI9PT1vLnR5cGUmJiItIj09PW8udGV4dD8oZS5zcGxpY2UociwzLHt0eXBlOiJ0ZXh0b3JkIixtb2RlOiJ0ZXh0Iixsb2M6UXIucmFuZ2UobixvKSx0ZXh0OiItLS0ifSksdC09Mik6KGUuc3BsaWNlKHIsMix7dHlwZToidGV4dG9yZCIsbW9kZToidGV4dCIsbG9jOlFyLnJhbmdlKG4scyksdGV4dDoiLS0ifSksdC09MSl9IiciIT09byYmImAiIT09b3x8cy50ZXh0IT09b3x8KGUuc3BsaWNlKHIsMix7dHlwZToidGV4dG9yZCIsbW9kZToidGV4dCIsbG9jOlFyLnJhbmdlKG4scyksdGV4dDpvK299KSx0LT0xKX19fXBhcnNlU3ltYm9sKCl7Y29uc3QgZT10aGlzLmZldGNoKCk7bGV0IHQ9ZS50ZXh0O2lmKC9eXFx2ZXJiW15hLXpBLVpdLy50ZXN0KHQpKXt0aGlzLmNvbnN1bWUoKTtsZXQgZT10LnNsaWNlKDUpO2NvbnN0IHI9IioiPT09ZS5jaGFyQXQoMCk7aWYociYmKGU9ZS5zbGljZSgxKSksZS5sZW5ndGg8Mnx8ZS5jaGFyQXQoMCkhPT1lLnNsaWNlKC0xKSl0aHJvdyBuZXcgbigiXFx2ZXJiIGFzc2VydGlvbiBmYWlsZWQgLS1cbiAgICAgICAgICAgICAgICAgICAgcGxlYXNlIHJlcG9ydCB3aGF0IGlucHV0IGNhdXNlZCB0aGlzIGJ1ZyIpO3JldHVybiBlPWUuc2xpY2UoMSwtMSkse3R5cGU6InZlcmIiLG1vZGU6InRleHQiLGJvZHk6ZSxzdGFyOnJ9fU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzbyx0WzBdKSYmIW5lW3RoaXMubW9kZV1bdFswXV0mJih0aGlzLnNldHRpbmdzLnN0cmljdCYmIm1hdGgiPT09dGhpcy5tb2RlJiZ0aGlzLnNldHRpbmdzLnJlcG9ydE5vbnN0cmljdCgidW5pY29kZVRleHRJbk1hdGhNb2RlIiwnQWNjZW50ZWQgVW5pY29kZSB0ZXh0IGNoYXJhY3RlciAiJyt0WzBdKyciIHVzZWQgaW4gbWF0aCBtb2RlJyxlKSx0PXNvW3RbMF1dK3Quc2xpY2UoMSkpO2NvbnN0IHI9R24uZXhlYyh0KTtsZXQgbztpZihyJiYodD10LnN1YnN0cmluZygwLHIuaW5kZXgpLCJpIj09PXQ/dD0iXHUwMTMxIjoiaiI9PT10JiYodD0iXHUwMjM3IikpLG5lW3RoaXMubW9kZV1bdF0pe3RoaXMuc2V0dGluZ3Muc3RyaWN0JiYibWF0aCI9PT10aGlzLm1vZGUmJk1lLmluY2x1ZGVzKHQpJiZ0aGlzLnNldHRpbmdzLnJlcG9ydE5vbnN0cmljdCgidW5pY29kZVRleHRJbk1hdGhNb2RlIiwnTGF0aW4tMS9Vbmljb2RlIHRleHQgY2hhcmFjdGVyICInK3RbMF0rJyIgdXNlZCBpbiBtYXRoIG1vZGUnLGUpO2NvbnN0IHI9bmVbdGhpcy5tb2RlXVt0XS5ncm91cCxuPVFyLnJhbmdlKGUpO2xldCBpO3M9cixpPXJyLmhhcyhzKT97dHlwZToiYXRvbSIsbW9kZTp0aGlzLm1vZGUsZmFtaWx5OnIsbG9jOm4sdGV4dDp0fTp7dHlwZTpyLG1vZGU6dGhpcy5tb2RlLGxvYzpuLHRleHQ6dH0sbz1pfWVsc2V7aWYoISh0LmNoYXJDb2RlQXQoMCk+PTEyOCkpcmV0dXJuIG51bGw7dGhpcy5zZXR0aW5ncy5zdHJpY3QmJihUKHQuY2hhckNvZGVBdCgwKSk/Im1hdGgiPT09dGhpcy5tb2RlJiZ0aGlzLnNldHRpbmdzLnJlcG9ydE5vbnN0cmljdCgidW5pY29kZVRleHRJbk1hdGhNb2RlIiwnVW5pY29kZSB0ZXh0IGNoYXJhY3RlciAiJyt0WzBdKyciIHVzZWQgaW4gbWF0aCBtb2RlJyxlKTp0aGlzLnNldHRpbmdzLnJlcG9ydE5vbnN0cmljdCgidW5rbm93blN5bWJvbCIsJ1VucmVjb2duaXplZCBVbmljb2RlIGNoYXJhY3RlciAiJyt0WzBdKyciICgnK3QuY2hhckNvZGVBdCgwKSsiKSIsZSkpLG89e3R5cGU6InRleHRvcmQiLG1vZGU6InRleHQiLGxvYzpRci5yYW5nZShlKSx0ZXh0OnR9fXZhciBzO2lmKHRoaXMuY29uc3VtZSgpLHIpZm9yKGxldCB0PTA7dDxyWzBdLmxlbmd0aDt0Kyspe2NvbnN0IHM9clswXVt0XTtpZighb29bc10pdGhyb3cgbmV3IG4oIlVua25vd24gYWNjZW50ICcgIitzKyInIixlKTtjb25zdCBpPW9vW3NdW3RoaXMubW9kZV18fG9vW3NdLnRleHQ7aWYoIWkpdGhyb3cgbmV3IG4oIkFjY2VudCAiK3MrIiB1bnN1cHBvcnRlZCBpbiAiK3RoaXMubW9kZSsiIG1vZGUiLGUpO289e3R5cGU6ImFjY2VudCIsbW9kZTp0aGlzLm1vZGUsbG9jOlFyLnJhbmdlKGUpLGxhYmVsOmksaXNTdHJldGNoeTohMSxpc1NoaWZ0eTohMCxiYXNlOm99fXJldHVybiBvfX1pby5lbmRPZkV4cHJlc3Npb249bmV3IFNldChbIn0iLCJcXGVuZGdyb3VwIiwiXFxlbmQiLCJcXHJpZ2h0IiwiJiJdKTt2YXIgbG89ZnVuY3Rpb24oZSx0KXtpZighKCJzdHJpbmciPT10eXBlb2YgZXx8ZSBpbnN0YW5jZW9mIFN0cmluZykpdGhyb3cgbmV3IFR5cGVFcnJvcigiS2FUZVggY2FuIG9ubHkgcGFyc2Ugc3RyaW5nIHR5cGVkIGV4cHJlc3Npb24iKTtjb25zdCByPW5ldyBpbyhlLHQpO2RlbGV0ZSByLmd1bGxldC5tYWNyb3MuY3VycmVudFsiXFxkZkB0YWciXTtsZXQgbz1yLnBhcnNlKCk7aWYoZGVsZXRlIHIuZ3VsbGV0Lm1hY3Jvcy5jdXJyZW50WyJcXGN1cnJlbnRAY29sb3IiXSxkZWxldGUgci5ndWxsZXQubWFjcm9zLmN1cnJlbnRbIlxcY29sb3IiXSxyLmd1bGxldC5tYWNyb3MuZ2V0KCJcXGRmQHRhZyIpKXtpZighdC5kaXNwbGF5TW9kZSl0aHJvdyBuZXcgbigiXFx0YWcgd29ya3Mgb25seSBpbiBkaXNwbGF5IGVxdWF0aW9ucyIpO289W3t0eXBlOiJ0YWciLG1vZGU6InRleHQiLGJvZHk6byx0YWc6ci5zdWJwYXJzZShbbmV3IGVuKCJcXGRmQHRhZyIpXSl9XX1yZXR1cm4gb307bGV0IGFvPWZ1bmN0aW9uKGUsdCxyKXt0LnRleHRDb250ZW50PSIiO2NvbnN0IG49aG8oZSxyKS50b05vZGUoKTt0LmFwcGVuZENoaWxkKG4pfTsidW5kZWZpbmVkIiE9dHlwZW9mIGRvY3VtZW50JiYiQ1NTMUNvbXBhdCIhPT1kb2N1bWVudC5jb21wYXRNb2RlJiYoInVuZGVmaW5lZCIhPXR5cGVvZiBjb25zb2xlJiZjb25zb2xlLndhcm4oIldhcm5pbmc6IEthVGVYIGRvZXNuJ3Qgd29yayBpbiBxdWlya3MgbW9kZS4gTWFrZSBzdXJlIHlvdXIgd2Vic2l0ZSBoYXMgYSBzdWl0YWJsZSBkb2N0eXBlLiIpLGFvPWZ1bmN0aW9uKCl7dGhyb3cgbmV3IG4oIkthVGVYIGRvZXNuJ3Qgd29yayBpbiBxdWlya3MgbW9kZS4iKX0pO2NvbnN0IGNvPWZ1bmN0aW9uKGUsdCxyKXtpZihyLnRocm93T25FcnJvcnx8IShlIGluc3RhbmNlb2YgbikpdGhyb3cgZTtjb25zdCBvPVllKFsia2F0ZXgtZXJyb3IiXSxbbmV3IFcodCldKTtyZXR1cm4gby5zZXRBdHRyaWJ1dGUoInRpdGxlIixlLnRvU3RyaW5nKCkpLG8uc2V0QXR0cmlidXRlKCJzdHlsZSIsImNvbG9yOiIrci5lcnJvckNvbG9yKSxvfSxobz1mdW5jdGlvbihlLHQpe2NvbnN0IHI9bmV3IGcodCk7dHJ5e2NvbnN0IHQ9bG8oZSxyKTtyZXR1cm4gWnQodCxlLHIpfWNhdGNoKHQpe3JldHVybiBjbyh0LGUscil9fTt2YXIgbW89e3ZlcnNpb246IjAuMTguMSIscmVuZGVyOmFvLHJlbmRlclRvU3RyaW5nOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIGhvKGUsdCkudG9NYXJrdXAoKX0sUGFyc2VFcnJvcjpuLFNFVFRJTkdTX1NDSEVNQTp1LF9fcGFyc2U6ZnVuY3Rpb24oZSx0KXtjb25zdCByPW5ldyBnKHQpO3JldHVybiBsbyhlLHIpfSxfX3JlbmRlclRvRG9tVHJlZTpobyxfX3JlbmRlclRvSFRNTFRyZWU6ZnVuY3Rpb24oZSx0KXtjb25zdCByPW5ldyBnKHQpO3RyeXtyZXR1cm4gZnVuY3Rpb24oZSx0LHIpe2NvbnN0IG49VHQoZSxfdChyKSksbz1ZZShbImthdGV4Il0sW25dKTtyZXR1cm4gJHQobyxyKX0obG8oZSxyKSwwLHIpfWNhdGNoKHQpe3JldHVybiBjbyh0LGUscil9fSxfX3NldEZvbnRNZXRyaWNzOmZ1bmN0aW9uKGUsdCl7S1tlXT10fSxfX2RlZmluZVN5bWJvbDpvZSxfX2RlZmluZUZ1bmN0aW9uOm10LF9fZGVmaW5lTWFjcm86SnIsX19kb21UcmVlOntTcGFuOlUsQW5jaG9yOmosU3ltYm9sTm9kZTpXLFN2Z05vZGU6XyxQYXRoTm9kZTokLExpbmVOb2RlOlp9fTtyZXR1cm4gdD10LmRlZmF1bHR9KCl9KTs=\"></script>\n    <script type=\"module\" src=\"data:text/javascript;base64,aW1wb3J0IHsgZGV0ZWN0UHJvdmlkZXJGcm9tVXJsLCBleHRyYWN0Q29udmVyc2F0aW9uQ29udGVudCB9IGZyb20gIi4vbGliL2NvbnZlcnNhdGlvbi1leHRyYWN0b3IuanMiOwppbXBvcnQgeyBidWlsZEV4cG9ydE1hcmtkb3duLCBmb3JtYXRFeHBvcnRUaXRsZSB9IGZyb20gIi4vbGliL2V4cG9ydC1kb2N1bWVudC5qcyI7CmltcG9ydCB7IGJ1aWxkU3RhbmRhbG9uZUh0bWwsIGNyZWF0ZUV4cG9ydEZpbGVuYW1lIH0gZnJvbSAiLi9saWIvbG9jYWwtZXhwb3J0LmpzIjsKaW1wb3J0IHsKICBjYXB0dXJlTWVkaWFTZXF1ZW50aWFsbHksCiAgbm9ybWFsaXplU2VsZWN0aW9uUmVjdGFuZ2xlCn0gZnJvbSAiLi9saWIvbWVkaWEtY2FwdHVyZS5qcyI7CmltcG9ydCB7CiAgYXBwZW5kTWFudWFsQ2FwdHVyZWRNZWRpYSwKICBhcHBseUNhcHR1cmVkTWVkaWFUb0h0bWwsCiAgbm9ybWFsaXplQ2FwdHVyZWRNZWRpYSwKICByZXNvbHZlQ2FwdHVyZWRNZWRpYU1hcmtkb3duCn0gZnJvbSAiLi9saWIvbWVkaWEtZXhwb3J0LmpzIjsKaW1wb3J0IHsgcmVuZGVyTWF0aEVsZW1lbnRzIH0gZnJvbSAiLi9saWIvbWF0aC1yZW5kZXJlci5qcyI7CmltcG9ydCB7IGRpc3BsYXlOb3Rpb25JY29uIH0gZnJvbSAiLi9saWIvbm90aW9uLWNvbm5lY3Rpb25zLmpzIjsKCmNvbnN0IE1BWF9DQVBUVVJFX1RPVEFMX0NIQVJBQ1RFUlMgPSAzXzQwMF8wMDA7CmNvbnN0IE1BWF9DQVBUVVJFX0NIQVJBQ1RFUlMgPSA0NTBfMDAwOwpjb25zdCBDQVBUVVJFX0lOVEVSVkFMX01TID0gNjUwOwpjb25zdCBNQVhfQ09OVkVSU0FUSU9OX1NDQU5fU1RFUFMgPSAxMjA7Cgpjb25zdCBjb25uZWN0aW9uQmFkZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY29ubmVjdGlvbkJhZGdlIik7CmNvbnN0IHdvcmtzcGFjZU5hbWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIndvcmtzcGFjZU5hbWUiKTsKY29uc3QgY29ubmVjdGlvblNlbGVjdG9ycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjb25uZWN0aW9uU2VsZWN0b3JzIik7CmNvbnN0IHdvcmtzcGFjZVNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJ3b3Jrc3BhY2VTZWxlY3QiKTsKY29uc3QgcGFyZW50UGFnZVNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJwYXJlbnRQYWdlU2VsZWN0Iik7CmNvbnN0IGNvbm5lY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY29ubmVjdEJ1dHRvbiIpOwpjb25zdCBkaXNjb25uZWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImRpc2Nvbm5lY3RCdXR0b24iKTsKY29uc3Qgc291cmNlQmFkZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgic291cmNlQmFkZ2UiKTsKY29uc3QgZG9jdW1lbnRUaXRsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiZG9jdW1lbnRUaXRsZSIpOwpjb25zdCBjaGFyYWN0ZXJDb3VudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY2hhcmFjdGVyQ291bnQiKTsKY29uc3QgZXhwb3J0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImV4cG9ydEJ1dHRvbiIpOwpjb25zdCBwcmludEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJwcmludEJ1dHRvbiIpOwpjb25zdCBtYXJrZG93bkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJtYXJrZG93bkJ1dHRvbiIpOwpjb25zdCBodG1sQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImh0bWxCdXR0b24iKTsKY29uc3QgbWFudWFsQ2FwdHVyZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJtYW51YWxDYXB0dXJlQnV0dG9uIik7CmNvbnN0IG1hbnVhbENhcHR1cmVQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJtYW51YWxDYXB0dXJlUGFuZWwiKTsKY29uc3QgbWFudWFsQ2FwdHVyZVN0YWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIm1hbnVhbENhcHR1cmVTdGFnZSIpOwpjb25zdCBtYW51YWxDYXB0dXJlSW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgibWFudWFsQ2FwdHVyZUltYWdlIik7CmNvbnN0IG1hbnVhbENhcHR1cmVTZWxlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgibWFudWFsQ2FwdHVyZVNlbGVjdGlvbiIpOwpjb25zdCBtYW51YWxDYXB0dXJlQ29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJtYW51YWxDYXB0dXJlQ29uZmlybUJ1dHRvbiIpOwpjb25zdCBtYW51YWxDYXB0dXJlQ2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIm1hbnVhbENhcHR1cmVDYW5jZWxCdXR0b24iKTsKY29uc3QgcmVzdWx0TGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJyZXN1bHRMaW5rIik7CmNvbnN0IHN0YXR1c0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgic3RhdHVzIik7CgpsZXQgY29udmVyc2F0aW9uQ29udGVudCA9IG51bGw7CmxldCBpc0Nvbm5lY3RlZCA9IGZhbHNlOwpsZXQgbm90aW9uQ29ubmVjdGlvbnMgPSBbXTsKbGV0IHNlbGVjdGVkTm90aW9uQ29ubmVjdGlvbklkID0gIiI7CmxldCBub3Rpb25QYWdlcyA9IFtdOwpsZXQgbWFudWFsQ2FwdHVyZVNjcmVlbnNob3QgPSAiIjsKbGV0IG1hbnVhbFNlbGVjdGlvbiA9IG51bGw7CmxldCBtYW51YWxTZWxlY3Rpb25TdGFydCA9IG51bGw7Cgppbml0aWFsaXplKCk7Cgpjb25uZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgY29ubmVjdE5vdGlvbik7CmRpc2Nvbm5lY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCBkaXNjb25uZWN0Tm90aW9uKTsKd29ya3NwYWNlU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoImNoYW5nZSIsIHNlbGVjdE5vdGlvbkNvbm5lY3Rpb24pOwpwYXJlbnRQYWdlU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoImNoYW5nZSIsIHNlbGVjdE5vdGlvblBhZ2UpOwpleHBvcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCBleHBvcnRDb252ZXJzYXRpb24pOwpwcmludEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIG9wZW5QcmludFZpZXcpOwptYXJrZG93bkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIGRvd25sb2FkTWFya2Rvd24pOwpodG1sQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgZG93bmxvYWRIdG1sKTsKbWFudWFsQ2FwdHVyZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIG9wZW5NYW51YWxDYXB0dXJlKTsKbWFudWFsQ2FwdHVyZVN0YWdlLmFkZEV2ZW50TGlzdGVuZXIoInBvaW50ZXJkb3duIiwgc3RhcnRNYW51YWxTZWxlY3Rpb24pOwptYW51YWxDYXB0dXJlU3RhZ2UuYWRkRXZlbnRMaXN0ZW5lcigicG9pbnRlcm1vdmUiLCB1cGRhdGVNYW51YWxTZWxlY3Rpb24pOwptYW51YWxDYXB0dXJlU3RhZ2UuYWRkRXZlbnRMaXN0ZW5lcigicG9pbnRlcnVwIiwgZmluaXNoTWFudWFsU2VsZWN0aW9uKTsKbWFudWFsQ2FwdHVyZVN0YWdlLmFkZEV2ZW50TGlzdGVuZXIoInBvaW50ZXJjYW5jZWwiLCBjYW5jZWxNYW51YWxTZWxlY3Rpb24pOwptYW51YWxDYXB0dXJlQ29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIGNvbmZpcm1NYW51YWxDYXB0dXJlKTsKbWFudWFsQ2FwdHVyZUNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIGNsb3NlTWFudWFsQ2FwdHVyZSk7Cgphc3luYyBmdW5jdGlvbiBpbml0aWFsaXplKCkgewogIGNvbnN0IFtjb25uZWN0aW9uUmVzdWx0XSA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChbCiAgICBsb2FkQ29ubmVjdGlvbigpLAogICAgbG9hZENvbnZlcnNhdGlvbigpCiAgXSk7CgogIGlmIChjb25uZWN0aW9uUmVzdWx0LnN0YXR1cyA9PT0gInJlamVjdGVkIikgewogICAgc2V0U3RhdHVzKAogICAgICBjb25uZWN0aW9uUmVzdWx0LnJlYXNvbiBpbnN0YW5jZW9mIEVycm9yCiAgICAgICAgPyBjb25uZWN0aW9uUmVzdWx0LnJlYXNvbi5tZXNzYWdlCiAgICAgICAgOiAiRmFpbGVkIHRvIGxvYWQgTm90aW9uIGNvbm5lY3Rpb25zIiwKICAgICAgImVycm9yIgogICAgKTsKICB9Cn0KCmFzeW5jIGZ1bmN0aW9uIGxvYWRDb25uZWN0aW9uKCkgewogIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyB0eXBlOiAiR0VUX05PVElPTl9DT05ORUNUSU9OUyIgfSk7CiAgaWYgKCFyZXNwb25zZT8ub2spIHRocm93IG5ldyBFcnJvcihyZXNwb25zZT8uZXJyb3IgfHwgIkZhaWxlZCB0byBsb2FkIHdvcmtzcGFjZXMiKTsKCiAgYXBwbHlDb25uZWN0aW9uUmVzdWx0KHJlc3BvbnNlKTsKICBpZiAoaXNDb25uZWN0ZWQpIGF3YWl0IGxvYWROb3Rpb25QYWdlcygpOwp9Cgphc3luYyBmdW5jdGlvbiBjb25uZWN0Tm90aW9uKCkgewogIGNvbm5lY3RCdXR0b24uZGlzYWJsZWQgPSB0cnVlOwogIHNldFN0YXR1cygiT3BlbmluZyB0aGUgTm90aW9uIGNvbm5lY3Rpb24gcGFnZeKApiIpOwoKICB0cnkgewogICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IHR5cGU6ICJDT05ORUNUX05PVElPTiIgfSk7CiAgICBpZiAoIXJlc3BvbnNlPy5vaykgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlPy5lcnJvciB8fCAiRmFpbGVkIHRvIGNvbm5lY3QgdG8gTm90aW9uIik7CgogICAgYXBwbHlDb25uZWN0aW9uUmVzdWx0KHJlc3BvbnNlKTsKICAgIGF3YWl0IGxvYWROb3Rpb25QYWdlcygpOwogICAgc2V0U3RhdHVzKCJDb25uZWN0ZWQgdG8gTm90aW9uIiwgInN1Y2Nlc3MiKTsKICB9IGNhdGNoIChlcnJvcikgewogICAgc2V0U3RhdHVzKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogIkZhaWxlZCB0byBjb25uZWN0IHRvIE5vdGlvbiIsICJlcnJvciIpOwogIH0gZmluYWxseSB7CiAgICBjb25uZWN0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7CiAgfQp9Cgphc3luYyBmdW5jdGlvbiBkaXNjb25uZWN0Tm90aW9uKCkgewogIGRpc2Nvbm5lY3RCdXR0b24uZGlzYWJsZWQgPSB0cnVlOwogIHRyeSB7CiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogIkRJU0NPTk5FQ1RfTk9USU9OIiB9KTsKICAgIGlmICghcmVzcG9uc2U/Lm9rKSB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2U/LmVycm9yIHx8ICJGYWlsZWQgdG8gZGlzY29ubmVjdCIpOwoKICAgIGFwcGx5Q29ubmVjdGlvblJlc3VsdChyZXNwb25zZSk7CiAgICBzZXRTdGF0dXMoIkRpc2Nvbm5lY3RlZCB0aGUgc2VsZWN0ZWQgd29ya3NwYWNlIik7CiAgfSBjYXRjaCAoZXJyb3IpIHsKICAgIHNldFN0YXR1cyhlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICJGYWlsZWQgdG8gZGlzY29ubmVjdCIsICJlcnJvciIpOwogIH0gZmluYWxseSB7CiAgICBkaXNjb25uZWN0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7CiAgfQp9Cgphc3luYyBmdW5jdGlvbiBzZWxlY3ROb3Rpb25Db25uZWN0aW9uKCkgewogIHdvcmtzcGFjZVNlbGVjdC5kaXNhYmxlZCA9IHRydWU7CiAgcGFyZW50UGFnZVNlbGVjdC5kaXNhYmxlZCA9IHRydWU7CiAgdHJ5IHsKICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoewogICAgICB0eXBlOiAiU0VMRUNUX05PVElPTl9DT05ORUNUSU9OIiwKICAgICAgY29ubmVjdGlvbklkOiB3b3Jrc3BhY2VTZWxlY3QudmFsdWUKICAgIH0pOwogICAgaWYgKCFyZXNwb25zZT8ub2spIHRocm93IG5ldyBFcnJvcihyZXNwb25zZT8uZXJyb3IgfHwgIkZhaWxlZCB0byBzZWxlY3Qgd29ya3NwYWNlIik7CgogICAgYXBwbHlDb25uZWN0aW9uUmVzdWx0KHJlc3BvbnNlKTsKICAgIGF3YWl0IGxvYWROb3Rpb25QYWdlcygpOwogIH0gY2F0Y2ggKGVycm9yKSB7CiAgICBzZXRTdGF0dXMoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAiRmFpbGVkIHRvIHNlbGVjdCB3b3Jrc3BhY2UiLCAiZXJyb3IiKTsKICAgIHJlbmRlckNvbm5lY3Rpb25TZWxlY3RvcnMoKTsKICB9Cn0KCmFzeW5jIGZ1bmN0aW9uIGxvYWROb3Rpb25QYWdlcygpIHsKICBjb25zdCBjb25uZWN0aW9uID0gc2VsZWN0ZWRDb25uZWN0aW9uKCk7CiAgaWYgKCFjb25uZWN0aW9uKSByZXR1cm47CgogIHBhcmVudFBhZ2VTZWxlY3QuZGlzYWJsZWQgPSB0cnVlOwogIHBhcmVudFBhZ2VTZWxlY3QucmVwbGFjZUNoaWxkcmVuKG5ldyBPcHRpb24oIkxvYWRpbmcgcGFnZXPigKYiLCAiIikpOwogIHRyeSB7CiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogIkxJU1RfTk9USU9OX1BBR0VTIiB9KTsKICAgIGlmICghcmVzcG9uc2U/Lm9rKSB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2U/LmVycm9yIHx8ICJGYWlsZWQgdG8gbG9hZCBwYWdlcyBmcm9tIE5vdGlvbiIpOwoKICAgIG5vdGlvblBhZ2VzID0gQXJyYXkuaXNBcnJheShyZXNwb25zZS5wYWdlcykgPyByZXNwb25zZS5wYWdlcyA6IFtdOwogICAgcmVuZGVyUGFnZU9wdGlvbnMobm90aW9uUGFnZXMpOwogIH0gY2F0Y2ggKGVycm9yKSB7CiAgICBub3Rpb25QYWdlcyA9IFtdOwogICAgcGFyZW50UGFnZVNlbGVjdC5yZXBsYWNlQ2hpbGRyZW4obmV3IE9wdGlvbigiRmFpbGVkIHRvIGxvYWQgcGFnZXMiLCAiIikpOwogICAgc2V0U3RhdHVzKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogIkZhaWxlZCB0byBsb2FkIHBhZ2VzIGZyb20gTm90aW9uIiwgImVycm9yIik7CiAgfQp9Cgphc3luYyBmdW5jdGlvbiBzZWxlY3ROb3Rpb25QYWdlKCkgewogIGNvbnN0IGNvbm5lY3Rpb24gPSBzZWxlY3RlZENvbm5lY3Rpb24oKTsKICBpZiAoIWNvbm5lY3Rpb24pIHJldHVybjsKCiAgY29uc3QgcGFnZUlkID0gcGFyZW50UGFnZVNlbGVjdC52YWx1ZTsKICBjb25zdCBwYWdlID0gcGFnZUlkCiAgICA/IHsKICAgICAgICBpZDogcGFnZUlkLAogICAgICAgIHRpdGxlOiBwYXJlbnRQYWdlU2VsZWN0LnNlbGVjdGVkT3B0aW9uc1swXT8uZGF0YXNldC5wYWdlVGl0bGUgfHwgIlVudGl0bGVkIgogICAgICB9CiAgICA6IG51bGw7CiAgcGFyZW50UGFnZVNlbGVjdC5kaXNhYmxlZCA9IHRydWU7CiAgdHJ5IHsKICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyB0eXBlOiAiU0VMRUNUX05PVElPTl9QQUdFIiwgcGFnZSB9KTsKICAgIGlmICghcmVzcG9uc2U/Lm9rKSB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2U/LmVycm9yIHx8ICJGYWlsZWQgdG8gc2VsZWN0IHBhZ2UiKTsKCiAgICBhcHBseUNvbm5lY3Rpb25SZXN1bHQocmVzcG9uc2UpOwogICAgcmVuZGVyUGFnZU9wdGlvbnMobm90aW9uUGFnZXMpOwogIH0gY2F0Y2ggKGVycm9yKSB7CiAgICBzZXRTdGF0dXMoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAiRmFpbGVkIHRvIHNlbGVjdCBwYWdlIiwgImVycm9yIik7CiAgfQp9Cgphc3luYyBmdW5jdGlvbiBsb2FkQ29udmVyc2F0aW9uKCkgewogIGxldCBwcm92aWRlciA9IG51bGw7CiAgdHJ5IHsKICAgIGNvbnN0IFt0YWJdID0gYXdhaXQgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSk7CiAgICBwcm92aWRlciA9IGRldGVjdFByb3ZpZGVyRnJvbVVybCh0YWI/LnVybCk7CiAgICBpZiAoIXRhYj8uaWQgfHwgIXByb3ZpZGVyKSB0aHJvdyBuZXcgRXJyb3IoIk9ubHkgR2VtaW5pLCBDaGF0R1BULCBDb2RleCwgYW5kIENsYXVkZSBvbiB0aGUgd2ViIGFyZSBzdXBwb3J0ZWQiKTsKCiAgICBjb25zdCBjb250ZW50ID0gWyJjaGF0Z3B0IiwgImNvZGV4Il0uaW5jbHVkZXMocHJvdmlkZXIuaWQpCiAgICAgID8gYXdhaXQgc2NhblZpcnR1YWxpemVkQ29udmVyc2F0aW9uKHRhYiwgcHJvdmlkZXIpCiAgICAgIDogYXdhaXQgZXh0cmFjdEN1cnJlbnRDb252ZXJzYXRpb24odGFiLCBwcm92aWRlcik7CiAgICBpZiAoIWNvbnRlbnQ/LnRleHQpIHRocm93IG5ldyBFcnJvcihgTm8gY29udmVyc2F0aW9uIGZvdW5kIG9uIHRoaXMgJHtwcm92aWRlci5sYWJlbH0gcGFnZWApOwoKICAgIGNvbnZlcnNhdGlvbkNvbnRlbnQgPSBjb250ZW50OwogICAgc291cmNlQmFkZ2UudGV4dENvbnRlbnQgPSBwcm92aWRlci5sYWJlbDsKICAgIGRvY3VtZW50VGl0bGVFbGVtZW50LnRleHRDb250ZW50ID0gZm9ybWF0RXhwb3J0VGl0bGUoY29udGVudC50aXRsZSwgY29udGVudC5wcm92aWRlcik7CiAgICB1cGRhdGVDb252ZXJzYXRpb25TdW1tYXJ5KCk7CiAgICBjb25zdCBjYXB0dXJlZENvdW50ID0gY2FwdHVyZWRNZWRpYUNvdW50KCk7CiAgICBjb25zdCBtZWRpYUNvdW50ID0gY29udmVyc2F0aW9uQ29udGVudC5tZWRpYT8ubGVuZ3RoIHx8IDA7CiAgICBjb25zdCBmYWlsZWRDYXB0dXJlQ291bnQgPSBtZWRpYUNvdW50IC0gY2FwdHVyZWRDb3VudDsKICAgIGV4cG9ydEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlOwogICAgcHJpbnRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTsKICAgIG1hcmtkb3duQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7CiAgICBodG1sQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7CiAgICBtYW51YWxDYXB0dXJlQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7CiAgICBpZiAoZmFpbGVkQ2FwdHVyZUNvdW50ID09PSBtZWRpYUNvdW50ICYmIG1lZGlhQ291bnQpIHsKICAgICAgY29uc3QgZGV0YWlsID0gY29udGVudC5tZWRpYS5maW5kKCh7IGNhcHR1cmVFcnJvciB9KSA9PiBjYXB0dXJlRXJyb3IpPy5jYXB0dXJlRXJyb3I7CiAgICAgIHNldFN0YXR1cygKICAgICAgICBgQ29udmVyc2F0aW9uIHJlYWQsIGJ1dCBpbWFnZSBjYXB0dXJlIGZhaWxlZCAwLyR7bWVkaWFDb3VudH0ke2RldGFpbCA/IGA6ICR7ZGV0YWlsfWAgOiAiIn1gLAogICAgICAgICJlcnJvciIKICAgICAgKTsKICAgIH0gZWxzZSBpZiAoZmFpbGVkQ2FwdHVyZUNvdW50ID4gMCkgewogICAgICBzZXRTdGF0dXMoYFJlYWR5IHRvIGV4cG9ydCDCtyBDYXB0dXJlZCAke2NhcHR1cmVkQ291bnR9LyR7bWVkaWFDb3VudH0gaW1hZ2VzYCk7CiAgICB9IGVsc2UgewogICAgICBzZXRTdGF0dXMoYENvbnZlcnNhdGlvbiBsb2FkZWQgZnJvbSAke3Byb3ZpZGVyLmxhYmVsfSDCtyBSZWFkeSB0byBleHBvcnRgKTsKICAgIH0KICB9IGNhdGNoIChlcnJvcikgewogICAgY29udmVyc2F0aW9uQ29udGVudCA9IG51bGw7CiAgICBzb3VyY2VCYWRnZS50ZXh0Q29udGVudCA9IHByb3ZpZGVyPy5sYWJlbCB8fCAiU2l0ZSBub3QgZGV0ZWN0ZWQiOwogICAgZG9jdW1lbnRUaXRsZUVsZW1lbnQudGV4dENvbnRlbnQgPSAiTm8gY29udmVyc2F0aW9uIHJlYWR5IHRvIGV4cG9ydCI7CiAgICBjaGFyYWN0ZXJDb3VudEVsZW1lbnQudGV4dENvbnRlbnQgPSAiMCBjaGFyYWN0ZXJzIjsKICAgIGV4cG9ydEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7CiAgICBwcmludEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7CiAgICBtYXJrZG93bkJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7CiAgICBodG1sQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTsKICAgIG1hbnVhbENhcHR1cmVCdXR0b24uZGlzYWJsZWQgPSB0cnVlOwogICAgc2V0U3RhdHVzKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogIkZhaWxlZCB0byByZWFkIHRoZSBjb252ZXJzYXRpb24iLCAiZXJyb3IiKTsKICB9Cn0KCmFzeW5jIGZ1bmN0aW9uIGV4dHJhY3RDdXJyZW50Q29udmVyc2F0aW9uKHRhYiwgcHJvdmlkZXIsIGNhcHR1cmVOYW1lc3BhY2UgPSAiIikgewogIGxldCBjb250ZW50ID0gbnVsbDsKICBmb3IgKGxldCBhdHRlbXB0ID0gMDsgYXR0ZW1wdCA8IDMgJiYgIWNvbnRlbnQ/LnRleHQ7IGF0dGVtcHQgKz0gMSkgewogICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7CiAgICAgIHRhcmdldDogeyB0YWJJZDogdGFiLmlkIH0sCiAgICAgIGZ1bmM6IGV4dHJhY3RDb252ZXJzYXRpb25Db250ZW50LAogICAgICBhcmdzOiBbcHJvdmlkZXIuaWQsIHByb3ZpZGVyLmxhYmVsLCBjYXB0dXJlTmFtZXNwYWNlXQogICAgfSk7CiAgICBjb250ZW50ID0gcmVzdWx0c1swXT8ucmVzdWx0IHx8IG51bGw7CiAgICBpZiAoIWNvbnRlbnQ/LnRleHQgJiYgYXR0ZW1wdCA8IDIpIHsKICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMzAwKSk7CiAgICB9CiAgfQoKICByZXR1cm4gY2FwdHVyZUNvbnZlcnNhdGlvbk1lZGlhKHRhYiwgY29udGVudCk7Cn0KCmFzeW5jIGZ1bmN0aW9uIGNhcHR1cmVDb252ZXJzYXRpb25NZWRpYSh0YWIsIGNvbnRlbnQpIHsKICBpZiAoY29udGVudD8ubWVkaWE/Lmxlbmd0aCkgewogICAgc2V0U3RhdHVzKGBDYXB0dXJpbmcgaW1hZ2VzIGFuZCBkaWFncmFtcyAwLyR7Y29udGVudC5tZWRpYS5sZW5ndGh94oCmYCk7CiAgICBjb250ZW50Lm1lZGlhID0gYXdhaXQgY2FwdHVyZVBhZ2VNZWRpYSh0YWIsIGNvbnRlbnQubWVkaWEsIChkb25lLCB0b3RhbCkgPT4gewogICAgICBzZXRTdGF0dXMoYENhcHR1cmluZyBpbWFnZXMgYW5kIGRpYWdyYW1zICR7ZG9uZX0vJHt0b3RhbH3igKZgKTsKICAgIH0pOwogIH0KICByZXR1cm4gY29udGVudDsKfQoKYXN5bmMgZnVuY3Rpb24gc2NhblZpcnR1YWxpemVkQ29udmVyc2F0aW9uKHRhYiwgcHJvdmlkZXIpIHsKICBzZXRTdGF0dXMoIlJlYWRpbmcgdGhlIGZ1bGwgY29udmVyc2F0aW9uIGZyb20gYmVnaW5uaW5nIHRvIGVuZOKApiIpOwogIGNvbnN0IFtwcm9iZSA9IHt9XSA9IGF3YWl0IGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7CiAgICB0YXJnZXQ6IHsgdGFiSWQ6IHRhYi5pZCB9LAogICAgZnVuYzogKCkgPT4gKHsKICAgICAgdHVybk5vZGVzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10ZXN0aWRePSJjb252ZXJzYXRpb24tdHVybi0iXScpLmxlbmd0aCwKICAgICAgYWNjZXNzaWJsZUxhYmVsczogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgibWFpbiBoNCIpLmxlbmd0aCwKICAgICAgbWVzc2FnZVJvbGVzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCJbZGF0YS1tZXNzYWdlLWF1dGhvci1yb2xlXSIpLmxlbmd0aCwKICAgICAgdXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZgogICAgfSkKICB9KTsKICBjb25zdCBbaW5qZWN0aW9uID0ge31dID0gYXdhaXQgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHsKICAgIHRhcmdldDogeyB0YWJJZDogdGFiLmlkIH0sCiAgICBmdW5jOiBleHRyYWN0Q29udmVyc2F0aW9uQ29udGVudCwKICAgIGFyZ3M6IFtwcm92aWRlci5pZCwgcHJvdmlkZXIubGFiZWwsICIiLCB7CiAgICAgIGZ1bGxDb252ZXJzYXRpb246IHRydWUsCiAgICAgIG1heFN0ZXBzOiBNQVhfQ09OVkVSU0FUSU9OX1NDQU5fU1RFUFMKICAgIH1dCiAgfSk7CiAgaWYgKGluamVjdGlvbi5lcnJvcikgewogICAgdGhyb3cgbmV3IEVycm9yKGluamVjdGlvbi5lcnJvci5tZXNzYWdlIHx8IFN0cmluZyhpbmplY3Rpb24uZXJyb3IpKTsKICB9CiAgY29uc3QgY29sbGVjdGVkID0gaW5qZWN0aW9uLnJlc3VsdDsKICBjb25zdCBwcm9iZVJlc3VsdCA9IHByb2JlLnJlc3VsdCB8fCB7fTsKICBjb25zdCBkb21TdW1tYXJ5ID0gYCR7TnVtYmVyKHByb2JlUmVzdWx0LnR1cm5Ob2RlcykgfHwgMH0gdHVybnMsICR7TnVtYmVyKHByb2JlUmVzdWx0LmFjY2Vzc2libGVMYWJlbHMpIHx8IDB9IGxhYmVscywgJHtOdW1iZXIocHJvYmVSZXN1bHQubWVzc2FnZVJvbGVzKSB8fCAwfSByb2xlc2A7CiAgaWYgKCEoInJlc3VsdCIgaW4gaW5qZWN0aW9uKSB8fCBjb2xsZWN0ZWQgPT0gbnVsbCkgewogICAgdGhyb3cgbmV3IEVycm9yKGBDaGF0R1BUIGNvbGxlY3RvciByZXR1cm5lZCBubyByZXN1bHQgKERPTTogJHtkb21TdW1tYXJ5fSlgKTsKICB9CiAgaWYgKGNvbGxlY3RlZD8uZXJyb3IpIHsKICAgIHRocm93IG5ldyBFcnJvcihgQ2hhdEdQVCBjb2xsZWN0b3IgZmFpbGVkOiAke2NvbGxlY3RlZC5lcnJvcn1gKTsKICB9CiAgaWYgKCFjb2xsZWN0ZWQ/LnR1cm5zPy5sZW5ndGgpIHsKICAgIHRocm93IG5ldyBFcnJvcihgQ2hhdEdQVCBjb2xsZWN0b3IgcmV0dXJuZWQgMCBtZXNzYWdlcyAoRE9NOiAke2RvbVN1bW1hcnl9KWApOwogIH0KCiAgY29uc3QgbWVyZ2VkID0gYXdhaXQgY2FwdHVyZUNvbnZlcnNhdGlvbk1lZGlhKHRhYiwgY29sbGVjdGVkKTsKICBsZXQgdG90YWxDaGFyYWN0ZXJzID0gMDsKICBtZXJnZWQubWVkaWEgPSBtZXJnZWQubWVkaWEubWFwKChpdGVtKSA9PiB7CiAgICBpZiAoIWl0ZW0uZGF0YVVybCkgcmV0dXJuIGl0ZW07CiAgICBpZiAodG90YWxDaGFyYWN0ZXJzICsgaXRlbS5kYXRhVXJsLmxlbmd0aCA+IE1BWF9DQVBUVVJFX1RPVEFMX0NIQVJBQ1RFUlMpIHsKICAgICAgcmV0dXJuIHsgLi4uaXRlbSwgZGF0YVVybDogIiIsIGNhcHR1cmVFcnJvcjogIlRoZSB0b3RhbCBpbWFnZSBzaXplIGV4Y2VlZHMgdGhlIGV4cG9ydCBsaW1pdCIgfTsKICAgIH0KICAgIHRvdGFsQ2hhcmFjdGVycyArPSBpdGVtLmRhdGFVcmwubGVuZ3RoOwogICAgcmV0dXJuIGl0ZW07CiAgfSk7CiAgY29uc3QgeyB0dXJuczogX3R1cm5zLCAuLi5jb250ZW50IH0gPSBtZXJnZWQ7CiAgcmV0dXJuIGNvbnRlbnQ7Cn0KCmFzeW5jIGZ1bmN0aW9uIG9wZW5NYW51YWxDYXB0dXJlKCkgewogIGlmICghY29udmVyc2F0aW9uQ29udGVudCkgcmV0dXJuIHNldFN0YXR1cygiTm8gY29udmVyc2F0aW9uIHJlYWR5IGZvciBjYXB0dXJlIiwgImVycm9yIik7CgogIG1hbnVhbENhcHR1cmVCdXR0b24uZGlzYWJsZWQgPSB0cnVlOwogIGNsb3NlTWFudWFsQ2FwdHVyZSgpOwogIHNldFN0YXR1cygiQ2FwdHVyaW5nIHRoZSB2aXNpYmxlIHNjcmVlbuKApiIpOwoKICB0cnkgewogICAgY29uc3QgW3RhYl0gPSBhd2FpdCBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9KTsKICAgIGlmICghdGFiPy53aW5kb3dJZCB8fCAhZGV0ZWN0UHJvdmlkZXJGcm9tVXJsKHRhYi51cmwpKSB7CiAgICAgIHRocm93IG5ldyBFcnJvcigiT3BlbiB0aGUgQUkgY29udmVyc2F0aW9uIHlvdSB3YW50IHRvIGNhcHR1cmUgZmlyc3QiKTsKICAgIH0KCiAgICBjb25zdCBbY2FwdHVyZV0gPSBhd2FpdCBjYXB0dXJlTWVkaWFTZXF1ZW50aWFsbHkoW3sgaWQ6ICJtYW51YWwtcHJldmlldyIgfV0sICgpID0+IHsKICAgICAgcmV0dXJuIGNocm9tZS50YWJzLmNhcHR1cmVWaXNpYmxlVGFiKHRhYi53aW5kb3dJZCwgeyBmb3JtYXQ6ICJwbmciIH0pOwogICAgfSwgeyBtaW5pbXVtSW50ZXJ2YWxNczogQ0FQVFVSRV9JTlRFUlZBTF9NUyB9KTsKICAgIGlmICghY2FwdHVyZT8uZGF0YVVybCkgdGhyb3cgbmV3IEVycm9yKGNhcHR1cmU/LmNhcHR1cmVFcnJvciB8fCAiRmFpbGVkIHRvIGNhcHR1cmUgdGhlIHNjcmVlbiIpOwoKICAgIG1hbnVhbENhcHR1cmVTY3JlZW5zaG90ID0gY2FwdHVyZS5kYXRhVXJsOwogICAgbWFudWFsQ2FwdHVyZUltYWdlLnNyYyA9IGNhcHR1cmUuZGF0YVVybDsKICAgIG1hbnVhbENhcHR1cmVQYW5lbC5oaWRkZW4gPSBmYWxzZTsKICAgIGF3YWl0IG1hbnVhbENhcHR1cmVJbWFnZS5kZWNvZGUoKTsKICAgIHNldFN0YXR1cygiRHJhZyBhIGJveCBhcm91bmQgYSBncmFwaCwgZGlhZ3JhbSwgb3IgaW1hZ2UsIHRoZW4gY2xpY2sgQWRkIGltYWdlIik7CiAgfSBjYXRjaCAoZXJyb3IpIHsKICAgIGNsb3NlTWFudWFsQ2FwdHVyZSgpOwogICAgc2V0U3RhdHVzKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogIkZhaWxlZCB0byBjYXB0dXJlIHRoZSBzY3JlZW4iLCAiZXJyb3IiKTsKICB9IGZpbmFsbHkgewogICAgbWFudWFsQ2FwdHVyZUJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlOwogIH0KfQoKZnVuY3Rpb24gc3RhcnRNYW51YWxTZWxlY3Rpb24oZXZlbnQpIHsKICBpZiAoIW1hbnVhbENhcHR1cmVTY3JlZW5zaG90KSByZXR1cm47CiAgbWFudWFsU2VsZWN0aW9uU3RhcnQgPSBtYW51YWxTZWxlY3Rpb25Qb2ludChldmVudCk7CiAgbWFudWFsU2VsZWN0aW9uID0gbnVsbDsKICBtYW51YWxDYXB0dXJlQ29uZmlybUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7CiAgbWFudWFsQ2FwdHVyZVNlbGVjdGlvbi5oaWRkZW4gPSBmYWxzZTsKICByZW5kZXJNYW51YWxTZWxlY3Rpb24oewogICAgeDogbWFudWFsU2VsZWN0aW9uU3RhcnQueCwKICAgIHk6IG1hbnVhbFNlbGVjdGlvblN0YXJ0LnksCiAgICB3aWR0aDogMCwKICAgIGhlaWdodDogMAogIH0pOwogIG1hbnVhbENhcHR1cmVTdGFnZS5zZXRQb2ludGVyQ2FwdHVyZT8uKGV2ZW50LnBvaW50ZXJJZCk7CiAgZXZlbnQucHJldmVudERlZmF1bHQoKTsKfQoKZnVuY3Rpb24gdXBkYXRlTWFudWFsU2VsZWN0aW9uKGV2ZW50KSB7CiAgaWYgKCFtYW51YWxTZWxlY3Rpb25TdGFydCkgcmV0dXJuOwogIGNvbnN0IHBvaW50ID0gbWFudWFsU2VsZWN0aW9uUG9pbnQoZXZlbnQpOwogIGNvbnN0IHNlbGVjdGlvbiA9IG5vcm1hbGl6ZVNlbGVjdGlvblJlY3RhbmdsZSh7CiAgICBzdGFydFg6IG1hbnVhbFNlbGVjdGlvblN0YXJ0LngsCiAgICBzdGFydFk6IG1hbnVhbFNlbGVjdGlvblN0YXJ0LnksCiAgICBlbmRYOiBwb2ludC54LAogICAgZW5kWTogcG9pbnQueSwKICAgIGJvdW5kc1dpZHRoOiBtYW51YWxDYXB0dXJlSW1hZ2UuY2xpZW50V2lkdGgsCiAgICBib3VuZHNIZWlnaHQ6IG1hbnVhbENhcHR1cmVJbWFnZS5jbGllbnRIZWlnaHQKICB9KTsKICBpZiAoc2VsZWN0aW9uKSByZW5kZXJNYW51YWxTZWxlY3Rpb24oc2VsZWN0aW9uKTsKICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOwp9CgpmdW5jdGlvbiBmaW5pc2hNYW51YWxTZWxlY3Rpb24oZXZlbnQpIHsKICBpZiAoIW1hbnVhbFNlbGVjdGlvblN0YXJ0KSByZXR1cm47CiAgY29uc3QgcG9pbnQgPSBtYW51YWxTZWxlY3Rpb25Qb2ludChldmVudCk7CiAgbWFudWFsU2VsZWN0aW9uID0gbm9ybWFsaXplU2VsZWN0aW9uUmVjdGFuZ2xlKHsKICAgIHN0YXJ0WDogbWFudWFsU2VsZWN0aW9uU3RhcnQueCwKICAgIHN0YXJ0WTogbWFudWFsU2VsZWN0aW9uU3RhcnQueSwKICAgIGVuZFg6IHBvaW50LngsCiAgICBlbmRZOiBwb2ludC55LAogICAgYm91bmRzV2lkdGg6IG1hbnVhbENhcHR1cmVJbWFnZS5jbGllbnRXaWR0aCwKICAgIGJvdW5kc0hlaWdodDogbWFudWFsQ2FwdHVyZUltYWdlLmNsaWVudEhlaWdodAogIH0pOwogIG1hbnVhbFNlbGVjdGlvblN0YXJ0ID0gbnVsbDsKICBtYW51YWxDYXB0dXJlQ29uZmlybUJ1dHRvbi5kaXNhYmxlZCA9ICFtYW51YWxTZWxlY3Rpb247CiAgaWYgKG1hbnVhbFNlbGVjdGlvbikgewogICAgcmVuZGVyTWFudWFsU2VsZWN0aW9uKG1hbnVhbFNlbGVjdGlvbik7CiAgICBzZXRTdGF0dXMoIkFyZWEgc2VsZWN0ZWQgwrcgQ2xpY2sgQWRkIGltYWdlIHRvIGluY2x1ZGUgaXQgaW4gdGhlIGNvbnZlcnNhdGlvbiIpOwogIH0gZWxzZSB7CiAgICBtYW51YWxDYXB0dXJlU2VsZWN0aW9uLmhpZGRlbiA9IHRydWU7CiAgICBzZXRTdGF0dXMoIkRyYWcgYW4gYXJlYSBhdCBsZWFzdCAxNiBweCB3aWRlIGFuZCAxNiBweCBoaWdoIiwgImVycm9yIik7CiAgfQogIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7Cn0KCmZ1bmN0aW9uIGNhbmNlbE1hbnVhbFNlbGVjdGlvbigpIHsKICBtYW51YWxTZWxlY3Rpb25TdGFydCA9IG51bGw7Cn0KCmFzeW5jIGZ1bmN0aW9uIGNvbmZpcm1NYW51YWxDYXB0dXJlKCkgewogIGlmICghbWFudWFsU2VsZWN0aW9uIHx8ICFtYW51YWxDYXB0dXJlU2NyZWVuc2hvdCB8fCAhY29udmVyc2F0aW9uQ29udGVudCkgcmV0dXJuOwoKICBtYW51YWxDYXB0dXJlQ29uZmlybUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7CiAgdHJ5IHsKICAgIGNvbnN0IGRhdGFVcmwgPSBhd2FpdCBjcm9wU2NyZWVuc2hvdChtYW51YWxDYXB0dXJlU2NyZWVuc2hvdCwgewogICAgICAuLi5tYW51YWxTZWxlY3Rpb24sCiAgICAgIHZpZXdwb3J0V2lkdGg6IG1hbnVhbENhcHR1cmVJbWFnZS5jbGllbnRXaWR0aCwKICAgICAgdmlld3BvcnRIZWlnaHQ6IG1hbnVhbENhcHR1cmVJbWFnZS5jbGllbnRIZWlnaHQKICAgIH0pOwogICAgaWYgKCFkYXRhVXJsKSB0aHJvdyBuZXcgRXJyb3IoIlRoZSBzZWxlY3RlZCBhcmVhIGV4Y2VlZHMgdGhlIHNpemUgbGltaXQiKTsKCiAgICBjb252ZXJzYXRpb25Db250ZW50ID0gYXBwZW5kTWFudWFsQ2FwdHVyZWRNZWRpYShjb252ZXJzYXRpb25Db250ZW50LCBkYXRhVXJsKTsKICAgIHVwZGF0ZUNvbnZlcnNhdGlvblN1bW1hcnkoKTsKICAgIGNsb3NlTWFudWFsQ2FwdHVyZSgpOwogICAgc2V0U3RhdHVzKGBDYXB0dXJlIGFkZGVkIMK3ICR7Y2FwdHVyZWRNZWRpYUNvdW50KCl9IGltYWdlcyB0b3RhbGAsICJzdWNjZXNzIik7CiAgfSBjYXRjaCAoZXJyb3IpIHsKICAgIHNldFN0YXR1cyhlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICJGYWlsZWQgdG8gYWRkIHRoZSBjYXB0dXJlIiwgImVycm9yIik7CiAgICBtYW51YWxDYXB0dXJlQ29uZmlybUJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlOwogIH0KfQoKZnVuY3Rpb24gY2xvc2VNYW51YWxDYXB0dXJlKCkgewogIG1hbnVhbENhcHR1cmVQYW5lbC5oaWRkZW4gPSB0cnVlOwogIG1hbnVhbENhcHR1cmVJbWFnZS5yZW1vdmVBdHRyaWJ1dGUoInNyYyIpOwogIG1hbnVhbENhcHR1cmVTZWxlY3Rpb24uaGlkZGVuID0gdHJ1ZTsKICBtYW51YWxDYXB0dXJlQ29uZmlybUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7CiAgbWFudWFsQ2FwdHVyZVNjcmVlbnNob3QgPSAiIjsKICBtYW51YWxTZWxlY3Rpb24gPSBudWxsOwogIG1hbnVhbFNlbGVjdGlvblN0YXJ0ID0gbnVsbDsKfQoKZnVuY3Rpb24gbWFudWFsU2VsZWN0aW9uUG9pbnQoZXZlbnQpIHsKICBjb25zdCByZWN0ID0gbWFudWFsQ2FwdHVyZVN0YWdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOwogIHJldHVybiB7CiAgICB4OiBldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0LAogICAgeTogZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wCiAgfTsKfQoKZnVuY3Rpb24gcmVuZGVyTWFudWFsU2VsZWN0aW9uKHNlbGVjdGlvbikgewogIG1hbnVhbENhcHR1cmVTZWxlY3Rpb24uc3R5bGUubGVmdCA9IGAke3NlbGVjdGlvbi54fXB4YDsKICBtYW51YWxDYXB0dXJlU2VsZWN0aW9uLnN0eWxlLnRvcCA9IGAke3NlbGVjdGlvbi55fXB4YDsKICBtYW51YWxDYXB0dXJlU2VsZWN0aW9uLnN0eWxlLndpZHRoID0gYCR7c2VsZWN0aW9uLndpZHRofXB4YDsKICBtYW51YWxDYXB0dXJlU2VsZWN0aW9uLnN0eWxlLmhlaWdodCA9IGAke3NlbGVjdGlvbi5oZWlnaHR9cHhgOwp9Cgphc3luYyBmdW5jdGlvbiBleHBvcnRDb252ZXJzYXRpb24oKSB7CiAgaWYgKCFjb252ZXJzYXRpb25Db250ZW50KSByZXR1cm4gc2V0U3RhdHVzKCJObyBjb252ZXJzYXRpb24gcmVhZHkgdG8gZXhwb3J0IiwgImVycm9yIik7CgogIGV4cG9ydEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7CiAgcmVzdWx0TGluay5oaWRkZW4gPSB0cnVlOwogIHNldFN0YXR1cygiQ3JlYXRpbmcgYSBwYWdlIGluIE5vdGlvbuKApiIpOwoKICB0cnkgewogICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7CiAgICAgIHR5cGU6ICJFWFBPUlRfVE9fTk9USU9OIiwKICAgICAgcGF5bG9hZDogY29udmVyc2F0aW9uQ29udGVudAogICAgfSk7CiAgICBpZiAoIXJlc3BvbnNlPy5vaykgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlPy5lcnJvciB8fCAiRXhwb3J0IGZhaWxlZCIpOwoKICAgIHJlc3VsdExpbmsuaHJlZiA9IHJlc3BvbnNlLnVybDsKICAgIHJlc3VsdExpbmsuaGlkZGVuID0gZmFsc2U7CiAgICBzZXRTdGF0dXMoIlRleHQgZXhwb3J0ZWQgdG8gTm90aW9uIiwgInN1Y2Nlc3MiKTsKICB9IGNhdGNoIChlcnJvcikgewogICAgc2V0U3RhdHVzKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogIkV4cG9ydCBmYWlsZWQiLCAiZXJyb3IiKTsKICB9IGZpbmFsbHkgewogICAgZXhwb3J0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7CiAgfQp9Cgphc3luYyBmdW5jdGlvbiBvcGVuUHJpbnRWaWV3KCkgewogIGlmICghY29udmVyc2F0aW9uQ29udGVudCkgcmV0dXJuIHNldFN0YXR1cygiTm8gY29udmVyc2F0aW9uIHJlYWR5IHRvIHByaW50IiwgImVycm9yIik7CgogIHByaW50QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTsKICB0cnkgewogICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7CiAgICAgIHR5cGU6ICJPUEVOX1BSSU5UX1ZJRVciLAogICAgICBwYXlsb2FkOiBjb252ZXJzYXRpb25Db250ZW50CiAgICB9KTsKICAgIGlmICghcmVzcG9uc2U/Lm9rKSB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2U/LmVycm9yIHx8ICJGYWlsZWQgdG8gb3BlbiB0aGUgcHJpbnQgdmlldyIpOwogICAgc2V0U3RhdHVzKCJQcmludCB2aWV3IG9wZW5lZCDCtyBDaG9vc2UgU2F2ZSBhcyBQREYgd2hlbiByZWFkeSIsICJzdWNjZXNzIik7CiAgfSBjYXRjaCAoZXJyb3IpIHsKICAgIHNldFN0YXR1cyhlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICJGYWlsZWQgdG8gb3BlbiB0aGUgcHJpbnQgdmlldyIsICJlcnJvciIpOwogIH0gZmluYWxseSB7CiAgICBwcmludEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlOwogIH0KfQoKZnVuY3Rpb24gZG93bmxvYWRNYXJrZG93bigpIHsKICBpZiAoIWNvbnZlcnNhdGlvbkNvbnRlbnQpIHJldHVybiBzZXRTdGF0dXMoIk5vIGNvbnZlcnNhdGlvbiByZWFkeSB0byBkb3dubG9hZCIsICJlcnJvciIpOwoKICBjb25zdCBtYXJrZG93biA9IHJlc29sdmVDYXB0dXJlZE1lZGlhTWFya2Rvd24oYnVpbGRFeHBvcnRNYXJrZG93bih7CiAgICB0aXRsZTogY29udmVyc2F0aW9uQ29udGVudC50aXRsZSwKICAgIHByb3ZpZGVyOiBjb252ZXJzYXRpb25Db250ZW50LnByb3ZpZGVyLAogICAgdGV4dDogY29udmVyc2F0aW9uQ29udGVudC50ZXh0LAogICAgc291cmNlVXJsOiBjb252ZXJzYXRpb25Db250ZW50LnNvdXJjZVVybCwKICAgIGV4cG9ydGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKQogIH0pLCBjb252ZXJzYXRpb25Db250ZW50Lm1lZGlhKTsKCiAgZG93bmxvYWRMb2NhbEZpbGUobWFya2Rvd24sICJ0ZXh0L21hcmtkb3duO2NoYXJzZXQ9dXRmLTgiLCAibWQiKTsKICBzZXRTdGF0dXMoIk1hcmtkb3duIGRvd25sb2FkZWQiLCAic3VjY2VzcyIpOwp9Cgphc3luYyBmdW5jdGlvbiBkb3dubG9hZEh0bWwoKSB7CiAgaWYgKCFjb252ZXJzYXRpb25Db250ZW50KSByZXR1cm4gc2V0U3RhdHVzKCJObyBjb252ZXJzYXRpb24gcmVhZHkgdG8gZG93bmxvYWQiLCAiZXJyb3IiKTsKCiAgaHRtbEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7CiAgdHJ5IHsKICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKCJzcmMvcHJpbnQuY3NzIikpOwogICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKCJGYWlsZWQgdG8gbG9hZCBIVE1MIHN0eWxlcyIpOwoKICAgIGNvbnN0IHJlbmRlcmVkQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInRlbXBsYXRlIik7CiAgICByZW5kZXJlZENvbnRlbnQuaW5uZXJIVE1MID0gY29udmVyc2F0aW9uQ29udGVudC5wcmludEh0bWw7CiAgICByZW5kZXJNYXRoRWxlbWVudHMocmVuZGVyZWRDb250ZW50LmNvbnRlbnQpOwogICAgYXBwbHlDYXB0dXJlZE1lZGlhVG9IdG1sKHJlbmRlcmVkQ29udGVudC5jb250ZW50LCBjb252ZXJzYXRpb25Db250ZW50Lm1lZGlhKTsKCiAgICBjb25zdCBodG1sID0gYnVpbGRTdGFuZGFsb25lSHRtbCh7CiAgICAgIHRpdGxlOiBjb252ZXJzYXRpb25Db250ZW50LnRpdGxlLAogICAgICBwcm92aWRlcjogY29udmVyc2F0aW9uQ29udGVudC5wcm92aWRlciwKICAgICAgc291cmNlVXJsOiBjb252ZXJzYXRpb25Db250ZW50LnNvdXJjZVVybCwKICAgICAgZXhwb3J0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLAogICAgICBzYW5pdGl6ZWRQcmludEh0bWw6IHJlbmRlcmVkQ29udGVudC5pbm5lckhUTUwsCiAgICAgIHN0eWxlczogYXdhaXQgcmVzcG9uc2UudGV4dCgpCiAgICB9KTsKCiAgICBkb3dubG9hZExvY2FsRmlsZShodG1sLCAidGV4dC9odG1sO2NoYXJzZXQ9dXRmLTgiLCAiaHRtbCIpOwogICAgc2V0U3RhdHVzKCJIVE1MIGRvd25sb2FkZWQiLCAic3VjY2VzcyIpOwogIH0gY2F0Y2ggKGVycm9yKSB7CiAgICBzZXRTdGF0dXMoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAiRmFpbGVkIHRvIGRvd25sb2FkIEhUTUwiLCAiZXJyb3IiKTsKICB9IGZpbmFsbHkgewogICAgaHRtbEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlOwogIH0KfQoKYXN5bmMgZnVuY3Rpb24gY2FwdHVyZVBhZ2VNZWRpYSh0YWIsIG1lZGlhLCBvblByb2dyZXNzKSB7CiAgY29uc3QgaXRlbXMgPSBub3JtYWxpemVDYXB0dXJlZE1lZGlhKG1lZGlhKTsKICBpZiAoIWl0ZW1zLmxlbmd0aCB8fCAhdGFiPy53aW5kb3dJZCkgcmV0dXJuIGl0ZW1zOwoKICBjb25zdCBbeyByZXN1bHQ6IG9yaWdpbmFsU2Nyb2xsIH0gPSB7fV0gPSBhd2FpdCBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoewogICAgdGFyZ2V0OiB7IHRhYklkOiB0YWIuaWQgfSwKICAgIGZ1bmM6ICgpID0+IHsKICAgICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIm1haW4iKTsKICAgICAgY29uc3QgY2FuZGlkYXRlcyA9IFtkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHldOwogICAgICBmb3IgKGxldCBlbGVtZW50ID0gbWFpbjsgZWxlbWVudDsgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudCkgY2FuZGlkYXRlcy5wdXNoKGVsZW1lbnQpOwogICAgICBjb25zdCBjb252ZXJzYXRpb24gPSBjYW5kaWRhdGVzCiAgICAgICAgLmZpbHRlcigoZWxlbWVudCwgaW5kZXgsIGFsbCkgPT4gZWxlbWVudCAmJiBhbGwuaW5kZXhPZihlbGVtZW50KSA9PT0gaW5kZXgpCiAgICAgICAgLmZpbHRlcigoZWxlbWVudCkgPT4gewogICAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpOwogICAgICAgICAgcmV0dXJuIC8oYXV0b3xzY3JvbGwpLy50ZXN0KGAke3N0eWxlLm92ZXJmbG93fSAke3N0eWxlLm92ZXJmbG93WX1gKSAmJgogICAgICAgICAgICBlbGVtZW50LnNjcm9sbEhlaWdodCAtIGVsZW1lbnQuY2xpZW50SGVpZ2h0ID4gODsKICAgICAgICB9KQogICAgICAgIC5zb3J0KChsZWZ0LCByaWdodCkgPT4KICAgICAgICAgIChyaWdodC5zY3JvbGxIZWlnaHQgLSByaWdodC5jbGllbnRIZWlnaHQpIC0gKGxlZnQuc2Nyb2xsSGVpZ2h0IC0gbGVmdC5jbGllbnRIZWlnaHQpCiAgICAgICAgKVswXTsKICAgICAgcmV0dXJuIHsKICAgICAgICB4OiB3aW5kb3cuc2Nyb2xsWCwKICAgICAgICB5OiB3aW5kb3cuc2Nyb2xsWSwKICAgICAgICBjb252ZXJzYXRpb25Ub3A6IGNvbnZlcnNhdGlvbj8uc2Nyb2xsVG9wIHx8IDAsCiAgICAgICAgY29udmVyc2F0aW9uTGVmdDogY29udmVyc2F0aW9uPy5zY3JvbGxMZWZ0IHx8IDAKICAgICAgfTsKICAgIH0KICB9KTsKICBsZXQgY2FwdHVyZWQgPSBbXTsKCiAgdHJ5IHsKICAgIGNhcHR1cmVkID0gYXdhaXQgY2FwdHVyZU1lZGlhU2VxdWVudGlhbGx5KGl0ZW1zLCBhc3luYyAoaXRlbSkgPT4gewogICAgICBjb25zdCBbeyByZXN1bHQ6IHRhcmdldCB9ID0ge31dID0gYXdhaXQgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHsKICAgICAgICB0YXJnZXQ6IHsgdGFiSWQ6IHRhYi5pZCB9LAogICAgICAgIGZ1bmM6IGFzeW5jIChpZCkgPT4gewogICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWFpLWV4cG9ydC1jYXB0dXJlLWlkPSIke2lkfSJdYCk7CiAgICAgICAgICBpZiAoIWVsZW1lbnQpIHJldHVybiBudWxsOwogICAgICAgICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAiY2VudGVyIiwgaW5saW5lOiAiY2VudGVyIiB9KTsKICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlc29sdmUpKSk7CiAgICAgICAgICBjb25zdCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsKICAgICAgICAgIHJldHVybiB7CiAgICAgICAgICAgIHg6IHJlY3QueCwKICAgICAgICAgICAgeTogcmVjdC55LAogICAgICAgICAgICB3aWR0aDogcmVjdC53aWR0aCwKICAgICAgICAgICAgaGVpZ2h0OiByZWN0LmhlaWdodCwKICAgICAgICAgICAgdmlld3BvcnRXaWR0aDogd2luZG93LmlubmVyV2lkdGgsCiAgICAgICAgICAgIHZpZXdwb3J0SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQKICAgICAgICAgIH07CiAgICAgICAgfSwKICAgICAgICBhcmdzOiBbaXRlbS5pZF0KICAgICAgfSk7CgogICAgICBpZiAoIXRhcmdldD8ud2lkdGggfHwgIXRhcmdldD8uaGVpZ2h0KSB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBsb2NhdGUgJHtpdGVtLmlkfWApOwoKICAgICAgY29uc3Qgc2NyZWVuc2hvdCA9IGF3YWl0IGNocm9tZS50YWJzLmNhcHR1cmVWaXNpYmxlVGFiKHRhYi53aW5kb3dJZCwgeyBmb3JtYXQ6ICJwbmciIH0pOwogICAgICBjb25zdCBkYXRhVXJsID0gYXdhaXQgY3JvcFNjcmVlbnNob3Qoc2NyZWVuc2hvdCwgdGFyZ2V0KTsKICAgICAgaWYgKCFkYXRhVXJsKSB0aHJvdyBuZXcgRXJyb3IoYEltYWdlICR7aXRlbS5pZH0gZXhjZWVkcyB0aGUgc3VwcG9ydGVkIHNpemVgKTsKICAgICAgcmV0dXJuIGRhdGFVcmw7CiAgICB9LCB7CiAgICAgIG1pbmltdW1JbnRlcnZhbE1zOiBDQVBUVVJFX0lOVEVSVkFMX01TLAogICAgICBvblByb2dyZXNzCiAgICB9KTsKICB9IGZpbmFsbHkgewogICAgaWYgKG9yaWdpbmFsU2Nyb2xsKSB7CiAgICAgIGF3YWl0IGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7CiAgICAgICAgdGFyZ2V0OiB7IHRhYklkOiB0YWIuaWQgfSwKICAgICAgICBmdW5jOiAoeyB4LCB5LCBjb252ZXJzYXRpb25Ub3AsIGNvbnZlcnNhdGlvbkxlZnQgfSkgPT4gewogICAgICAgICAgd2luZG93LnNjcm9sbFRvKHgsIHkpOwogICAgICAgICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIm1haW4iKTsKICAgICAgICAgIGNvbnN0IGNhbmRpZGF0ZXMgPSBbZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XTsKICAgICAgICAgIGZvciAobGV0IGVsZW1lbnQgPSBtYWluOyBlbGVtZW50OyBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50KSBjYW5kaWRhdGVzLnB1c2goZWxlbWVudCk7CiAgICAgICAgICBjb25zdCBjb252ZXJzYXRpb24gPSBjYW5kaWRhdGVzCiAgICAgICAgICAgIC5maWx0ZXIoKGVsZW1lbnQsIGluZGV4LCBhbGwpID0+IGVsZW1lbnQgJiYgYWxsLmluZGV4T2YoZWxlbWVudCkgPT09IGluZGV4KQogICAgICAgICAgICAuZmlsdGVyKChlbGVtZW50KSA9PiB7CiAgICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpOwogICAgICAgICAgICAgIHJldHVybiAvKGF1dG98c2Nyb2xsKS8udGVzdChgJHtzdHlsZS5vdmVyZmxvd30gJHtzdHlsZS5vdmVyZmxvd1l9YCkgJiYKICAgICAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC0gZWxlbWVudC5jbGllbnRIZWlnaHQgPiA4OwogICAgICAgICAgICB9KQogICAgICAgICAgICAuc29ydCgobGVmdCwgcmlnaHQpID0+CiAgICAgICAgICAgICAgKHJpZ2h0LnNjcm9sbEhlaWdodCAtIHJpZ2h0LmNsaWVudEhlaWdodCkgLSAobGVmdC5zY3JvbGxIZWlnaHQgLSBsZWZ0LmNsaWVudEhlaWdodCkKICAgICAgICAgICAgKVswXTsKICAgICAgICAgIGlmIChjb252ZXJzYXRpb24pIHsKICAgICAgICAgICAgY29udmVyc2F0aW9uLnNjcm9sbFRvcCA9IGNvbnZlcnNhdGlvblRvcDsKICAgICAgICAgICAgY29udmVyc2F0aW9uLnNjcm9sbExlZnQgPSBjb252ZXJzYXRpb25MZWZ0OwogICAgICAgICAgfQogICAgICAgIH0sCiAgICAgICAgYXJnczogW29yaWdpbmFsU2Nyb2xsXQogICAgICB9KS5jYXRjaCgoKSA9PiB7fSk7CiAgICB9CiAgfQoKICBsZXQgdG90YWxDaGFyYWN0ZXJzID0gMDsKICByZXR1cm4gY2FwdHVyZWQubWFwKChpdGVtKSA9PiB7CiAgICBpZiAoIWl0ZW0uZGF0YVVybCkgcmV0dXJuIGl0ZW07CiAgICBpZiAodG90YWxDaGFyYWN0ZXJzICsgaXRlbS5kYXRhVXJsLmxlbmd0aCA+IE1BWF9DQVBUVVJFX1RPVEFMX0NIQVJBQ1RFUlMpIHsKICAgICAgcmV0dXJuIHsgLi4uaXRlbSwgZGF0YVVybDogIiIsIGNhcHR1cmVFcnJvcjogIlRoZSB0b3RhbCBpbWFnZSBzaXplIGV4Y2VlZHMgdGhlIGV4cG9ydCBsaW1pdCIgfTsKICAgIH0KICAgIHRvdGFsQ2hhcmFjdGVycyArPSBpdGVtLmRhdGFVcmwubGVuZ3RoOwogICAgcmV0dXJuIGl0ZW07CiAgfSk7Cn0KCmFzeW5jIGZ1bmN0aW9uIGNyb3BTY3JlZW5zaG90KHNjcmVlbnNob3QsIHRhcmdldCkgewogIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7CiAgaW1hZ2Uuc3JjID0gc2NyZWVuc2hvdDsKICBhd2FpdCBpbWFnZS5kZWNvZGUoKTsKCiAgY29uc3Qgc2NhbGVYID0gaW1hZ2UubmF0dXJhbFdpZHRoIC8gdGFyZ2V0LnZpZXdwb3J0V2lkdGg7CiAgY29uc3Qgc2NhbGVZID0gaW1hZ2UubmF0dXJhbEhlaWdodCAvIHRhcmdldC52aWV3cG9ydEhlaWdodDsKICBjb25zdCBzb3VyY2VYID0gTWF0aC5tYXgoMCwgdGFyZ2V0LnggKiBzY2FsZVgpOwogIGNvbnN0IHNvdXJjZVkgPSBNYXRoLm1heCgwLCB0YXJnZXQueSAqIHNjYWxlWSk7CiAgY29uc3Qgc291cmNlV2lkdGggPSBNYXRoLm1pbihpbWFnZS5uYXR1cmFsV2lkdGggLSBzb3VyY2VYLCB0YXJnZXQud2lkdGggKiBzY2FsZVgpOwogIGNvbnN0IHNvdXJjZUhlaWdodCA9IE1hdGgubWluKGltYWdlLm5hdHVyYWxIZWlnaHQgLSBzb3VyY2VZLCB0YXJnZXQuaGVpZ2h0ICogc2NhbGVZKTsKICBpZiAoc291cmNlV2lkdGggPD0gMCB8fCBzb3VyY2VIZWlnaHQgPD0gMCkgcmV0dXJuICIiOwoKICBjb25zdCBtYXhEaW1lbnNpb24gPSAxMjAwOwogIGNvbnN0IHJhdGlvID0gTWF0aC5taW4oMSwgbWF4RGltZW5zaW9uIC8gTWF0aC5tYXgoc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCkpOwogIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJjYW52YXMiKTsKICBjYW52YXMud2lkdGggPSBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKHNvdXJjZVdpZHRoICogcmF0aW8pKTsKICBjYW52YXMuaGVpZ2h0ID0gTWF0aC5tYXgoMSwgTWF0aC5yb3VuZChzb3VyY2VIZWlnaHQgKiByYXRpbykpOwogIGNhbnZhcy5nZXRDb250ZXh0KCIyZCIpLmRyYXdJbWFnZSgKICAgIGltYWdlLAogICAgc291cmNlWCwKICAgIHNvdXJjZVksCiAgICBzb3VyY2VXaWR0aCwKICAgIHNvdXJjZUhlaWdodCwKICAgIDAsCiAgICAwLAogICAgY2FudmFzLndpZHRoLAogICAgY2FudmFzLmhlaWdodAogICk7CgogIGxldCBkYXRhVXJsID0gY2FudmFzLnRvRGF0YVVSTCgiaW1hZ2UvanBlZyIsIDAuOSk7CiAgd2hpbGUgKGRhdGFVcmwubGVuZ3RoID4gTUFYX0NBUFRVUkVfQ0hBUkFDVEVSUyAmJiBjYW52YXMud2lkdGggPiA0ODAgJiYgY2FudmFzLmhlaWdodCA+IDMyMCkgewogICAgY29uc3Qgc21hbGxlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImNhbnZhcyIpOwogICAgc21hbGxlci53aWR0aCA9IE1hdGgucm91bmQoY2FudmFzLndpZHRoICogMC44KTsKICAgIHNtYWxsZXIuaGVpZ2h0ID0gTWF0aC5yb3VuZChjYW52YXMuaGVpZ2h0ICogMC44KTsKICAgIHNtYWxsZXIuZ2V0Q29udGV4dCgiMmQiKS5kcmF3SW1hZ2UoY2FudmFzLCAwLCAwLCBzbWFsbGVyLndpZHRoLCBzbWFsbGVyLmhlaWdodCk7CiAgICBjYW52YXMgPSBzbWFsbGVyOwogICAgZGF0YVVybCA9IGNhbnZhcy50b0RhdGFVUkwoImltYWdlL2pwZWciLCAwLjkpOwogIH0KCiAgcmV0dXJuIGRhdGFVcmwubGVuZ3RoIDw9IE1BWF9DQVBUVVJFX0NIQVJBQ1RFUlMgPyBkYXRhVXJsIDogIiI7Cn0KCmZ1bmN0aW9uIGRvd25sb2FkTG9jYWxGaWxlKGNvbnRlbnQsIHR5cGUsIGV4dGVuc2lvbikgewogIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW2NvbnRlbnRdLCB7IHR5cGUgfSkpOwogIGNvbnN0IGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImEiKTsKICBhbmNob3IuaHJlZiA9IHVybDsKICBhbmNob3IuZG93bmxvYWQgPSBjcmVhdGVFeHBvcnRGaWxlbmFtZSgKICAgIGNvbnZlcnNhdGlvbkNvbnRlbnQ/LnRpdGxlLAogICAgZXh0ZW5zaW9uLAogICAgY29udmVyc2F0aW9uQ29udGVudD8ucHJvdmlkZXIKICApOwogIGRvY3VtZW50LmJvZHkuYXBwZW5kKGFuY2hvcik7CiAgYW5jaG9yLmNsaWNrKCk7CiAgYW5jaG9yLnJlbW92ZSgpOwogIHNldFRpbWVvdXQoKCkgPT4gVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpLCAxMDAwKTsKfQoKZnVuY3Rpb24gYXBwbHlDb25uZWN0aW9uUmVzdWx0KHJlc3VsdCkgewogIG5vdGlvbkNvbm5lY3Rpb25zID0gQXJyYXkuaXNBcnJheShyZXN1bHQuY29ubmVjdGlvbnMpID8gcmVzdWx0LmNvbm5lY3Rpb25zIDogW107CiAgc2VsZWN0ZWROb3Rpb25Db25uZWN0aW9uSWQgPSBTdHJpbmcocmVzdWx0LnNlbGVjdGVkQ29ubmVjdGlvbklkIHx8ICIiKTsKICBpc0Nvbm5lY3RlZCA9IEJvb2xlYW4oc2VsZWN0ZWRDb25uZWN0aW9uKCkpOwogIHVwZGF0ZUNvbm5lY3Rpb25TdGF0ZSgpOwp9CgpmdW5jdGlvbiBzZWxlY3RlZENvbm5lY3Rpb24oKSB7CiAgcmV0dXJuIG5vdGlvbkNvbm5lY3Rpb25zLmZpbmQoKHsgaWQgfSkgPT4gaWQgPT09IHNlbGVjdGVkTm90aW9uQ29ubmVjdGlvbklkKSB8fCBudWxsOwp9CgpmdW5jdGlvbiB1cGRhdGVDb25uZWN0aW9uU3RhdGUoKSB7CiAgY29uc3QgY29ubmVjdGlvbiA9IHNlbGVjdGVkQ29ubmVjdGlvbigpOwogIGNvbm5lY3Rpb25CYWRnZS5oaWRkZW4gPSAhY29ubmVjdGlvbjsKICBjb25zdCB3b3Jrc3BhY2VJY29uID0gZGlzcGxheU5vdGlvbkljb24oY29ubmVjdGlvbj8ud29ya3NwYWNlSWNvbik7CiAgd29ya3NwYWNlTmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBjb25uZWN0aW9uCiAgICA/IGAke3dvcmtzcGFjZUljb24gPyBgJHt3b3Jrc3BhY2VJY29ufSBgIDogIiJ9JHtjb25uZWN0aW9uLndvcmtzcGFjZU5hbWV9YAogICAgOiAiTm8gd29ya3NwYWNlIGNvbm5lY3RlZCI7CiAgY29ubmVjdGlvblNlbGVjdG9ycy5oaWRkZW4gPSAhY29ubmVjdGlvbjsKICBkaXNjb25uZWN0QnV0dG9uLmhpZGRlbiA9ICFjb25uZWN0aW9uOwogIHJlbmRlckNvbm5lY3Rpb25TZWxlY3RvcnMoKTsKfQoKZnVuY3Rpb24gcmVuZGVyQ29ubmVjdGlvblNlbGVjdG9ycygpIHsKICBjb25zdCBjb25uZWN0aW9uID0gc2VsZWN0ZWRDb25uZWN0aW9uKCk7CiAgd29ya3NwYWNlU2VsZWN0LnJlcGxhY2VDaGlsZHJlbigpOwoKICBpZiAoIWNvbm5lY3Rpb24pIHsKICAgIHdvcmtzcGFjZVNlbGVjdC5hcHBlbmQobmV3IE9wdGlvbigiTm8gd29ya3NwYWNlIGNvbm5lY3RlZCIsICIiKSk7CiAgICB3b3Jrc3BhY2VTZWxlY3QuZGlzYWJsZWQgPSB0cnVlOwogICAgcGFyZW50UGFnZVNlbGVjdC5yZXBsYWNlQ2hpbGRyZW4obmV3IE9wdGlvbigiQ29ubmVjdCBhIHdvcmtzcGFjZSBmaXJzdCIsICIiKSk7CiAgICBwYXJlbnRQYWdlU2VsZWN0LmRpc2FibGVkID0gdHJ1ZTsKICAgIHJldHVybjsKICB9CgogIG5vdGlvbkNvbm5lY3Rpb25zLmZvckVhY2goKGl0ZW0pID0+IHsKICAgIGNvbnN0IHdvcmtzcGFjZUljb24gPSBkaXNwbGF5Tm90aW9uSWNvbihpdGVtLndvcmtzcGFjZUljb24pOwogICAgd29ya3NwYWNlU2VsZWN0LmFwcGVuZChuZXcgT3B0aW9uKAogICAgICBgJHt3b3Jrc3BhY2VJY29uID8gYCR7d29ya3NwYWNlSWNvbn0gYCA6ICIifSR7aXRlbS53b3Jrc3BhY2VOYW1lfWAsCiAgICAgIGl0ZW0uaWQsCiAgICAgIGZhbHNlLAogICAgICBpdGVtLmlkID09PSBjb25uZWN0aW9uLmlkCiAgICApKTsKICB9KTsKICB3b3Jrc3BhY2VTZWxlY3QuZGlzYWJsZWQgPSBmYWxzZTsKfQoKZnVuY3Rpb24gcmVuZGVyUGFnZU9wdGlvbnMocGFnZXMpIHsKICBjb25zdCBjb25uZWN0aW9uID0gc2VsZWN0ZWRDb25uZWN0aW9uKCk7CiAgaWYgKCFjb25uZWN0aW9uKSByZXR1cm47CgogIGNvbnN0IHNlbGVjdGVkUGFyZW50UGFnZUlkID0gY29ubmVjdGlvbi5zZWxlY3RlZFBhcmVudFBhZ2VJZCB8fCAiIjsKICBjb25zdCBwbGFjZWhvbGRlck9wdGlvbiA9IG5ldyBPcHRpb24oIldvcmtzcGFjZSBob21lIiwgIiIsIGZhbHNlLCAhc2VsZWN0ZWRQYXJlbnRQYWdlSWQpOwogIHBsYWNlaG9sZGVyT3B0aW9uLmRhdGFzZXQucGFnZVRpdGxlID0gIiI7CiAgcGFyZW50UGFnZVNlbGVjdC5yZXBsYWNlQ2hpbGRyZW4ocGxhY2Vob2xkZXJPcHRpb24pOwoKICBwYWdlcy5mb3JFYWNoKChwYWdlKSA9PiB7CiAgICBjb25zdCBpZCA9IFN0cmluZyhwYWdlPy5pZCB8fCAiIik7CiAgICBpZiAoIWlkKSByZXR1cm47CiAgICBjb25zdCB0aXRsZSA9IFN0cmluZyhwYWdlPy50aXRsZSB8fCAiVW50aXRsZWQiKTsKICAgIGNvbnN0IHBhZ2VJY29uID0gZGlzcGxheU5vdGlvbkljb24ocGFnZT8uaWNvbik7CiAgICBjb25zdCBvcHRpb24gPSBuZXcgT3B0aW9uKAogICAgICBgJHtwYWdlSWNvbiA/IGAke3BhZ2VJY29ufSBgIDogIiJ9JHt0aXRsZX1gLAogICAgICBpZCwKICAgICAgZmFsc2UsCiAgICAgIGlkID09PSBzZWxlY3RlZFBhcmVudFBhZ2VJZAogICAgKTsKICAgIG9wdGlvbi5kYXRhc2V0LnBhZ2VUaXRsZSA9IHRpdGxlOwogICAgcGFyZW50UGFnZVNlbGVjdC5hcHBlbmQob3B0aW9uKTsKICB9KTsKICBwYXJlbnRQYWdlU2VsZWN0LmRpc2FibGVkID0gZmFsc2U7Cn0KCmZ1bmN0aW9uIHNldFN0YXR1cyhtZXNzYWdlLCB0eXBlID0gIiIpIHsKICBzdGF0dXNFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTsKICBzdGF0dXNFbGVtZW50LmNsYXNzTmFtZSA9IHR5cGUgPyBgc3RhdHVzICR7dHlwZX1gIDogInN0YXR1cyI7Cn0KCmZ1bmN0aW9uIGNhcHR1cmVkTWVkaWFDb3VudCgpIHsKICByZXR1cm4gY29udmVyc2F0aW9uQ29udGVudD8ubWVkaWE/LmZpbHRlcigoeyBkYXRhVXJsIH0pID0+IGRhdGFVcmwpLmxlbmd0aCB8fCAwOwp9CgpmdW5jdGlvbiB1cGRhdGVDb252ZXJzYXRpb25TdW1tYXJ5KCkgewogIGlmICghY29udmVyc2F0aW9uQ29udGVudCkgcmV0dXJuOwogIGNvbnN0IG1lZGlhQ291bnQgPSBjb252ZXJzYXRpb25Db250ZW50Lm1lZGlhPy5sZW5ndGggfHwgMDsKICBjaGFyYWN0ZXJDb3VudEVsZW1lbnQudGV4dENvbnRlbnQgPQogICAgYCR7Y29udmVyc2F0aW9uQ29udGVudC50dXJuQ291bnQudG9Mb2NhbGVTdHJpbmcoImVuLVVTIil9IG1lc3NhZ2VzIMK3IGAgKwogICAgYCR7Y29udmVyc2F0aW9uQ29udGVudC50ZXh0Lmxlbmd0aC50b0xvY2FsZVN0cmluZygiZW4tVVMiKX0gY2hhcmFjdGVyc2AgKwogICAgKG1lZGlhQ291bnQgPyBgIMK3ICR7Y2FwdHVyZWRNZWRpYUNvdW50KCl9LyR7bWVkaWFDb3VudH0gaW1hZ2VzYCA6ICIiKTsKfQo=\"></script>\n  </body>\n</html>\n"
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
		      "chatport-ai-chat-export",
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
	  const scriptName = "ChatPort: AI Chat Export";
	  const debug = "[ChatPort: AI Chat Export]";
	  _log(debug + ' Executing background scripts...');
	
	  function executeBackgroundScripts(){
	    with(backgroundPolyfill){
	      // BG: src/service-worker.js
	import { buildExportMarkdown, formatExportTitle } from "./lib/export-document.js";
	import { normalizeCapturedMedia } from "./lib/media-export.js";
	import {
	  NOTION_CONNECTIONS_KEY,
	  SELECTED_NOTION_CONNECTION_ID_KEY,
	  chooseConnectionPage,
	  connectionMetadata,
	  getSelectedConnection,
	  migrateStoredConnections,
	  removeConnection,
	  selectConnection,
	  updateConnectionSession,
	  upsertConnection
	} from "./lib/notion-connections.js";
	import { API_BASE_URL } from "./config.js";
	
	chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
	  if (!message?.type) {
	    return false;
	  }
	
	  handleMessage(message)
	    .then((result) => sendResponse({ ok: true, ...result }))
	    .catch((error) => {
	      sendResponse({
	        ok: false,
	        error: error instanceof Error ? error.message : "Export failed"
	      });
	    });
	
	  return true;
	});
	
	async function handleMessage(message) {
	  switch (message.type) {
	    case "CONNECT_NOTION":
	      return connectNotion();
	    case "GET_NOTION_CONNECTIONS":
	    case "LIST_NOTION_CONNECTIONS":
	      return getNotionConnections();
	    case "SELECT_NOTION_CONNECTION":
	      return selectNotionConnection(message.connectionId);
	    case "LIST_NOTION_PAGES":
	      return listNotionPages();
	    case "SELECT_NOTION_PAGE":
	      return selectNotionPage(message.page);
	    case "DISCONNECT_NOTION":
	      return disconnectNotion();
	    case "EXPORT_TO_NOTION":
	      return exportSelection(message.payload);
	    case "OPEN_PRINT_VIEW":
	      return openPrintView(message.payload);
	    default:
	      throw new Error("Invalid extension command");
	  }
	}
	
	async function openPrintView(payload) {
	  const printHtml = String(payload?.printHtml || "").trim();
	  if (!printHtml) throw new Error("No printable content found");
	
	  await chrome.storage.session.set({
	    printDocument: {
	      title: formatExportTitle(payload?.title, payload?.provider),
	      provider: String(payload?.provider || "AI Chat"),
	      sourceUrl: String(payload?.sourceUrl || ""),
	      printHtml,
	      media: normalizeCapturedMedia(payload?.media),
	      exportedAt: new Date().toISOString()
	    }
	  });
	  const tab = await chrome.tabs.create({ url: chrome.runtime.getURL("src/print.html") });
	  return { tabId: tab.id };
	}
	
	async function connectNotion() {
	  const redirectUri = chrome.identity.getRedirectURL("notion");
	  const start = await requestBackend("/api/oauth-start", {
	    body: { redirectUri }
	  });
	
	  const finalUrl = await chrome.identity.launchWebAuthFlow({
	    url: start.authorizationUrl,
	    interactive: true
	  });
	
	  if (!finalUrl) {
	    throw new Error("No connection result received from Notion");
	  }
	
	  const callback = new URL(finalUrl);
	  const error = callback.searchParams.get("error");
	
	  if (error) {
	    throw new Error(error === "access_denied" ? "Notion connection was cancelled" : `Notion OAuth error: ${error}`);
	  }
	
	  const code = callback.searchParams.get("code");
	  const state = callback.searchParams.get("state");
	
	  if (!code || !state || state !== start.state) {
	    throw new Error("Invalid Notion connection result. Please try again");
	  }
	
	  const connection = await requestBackend("/api/oauth-exchange", {
	    body: { code, state, redirectUri }
	  });
	
	  const connectionData = {
	    ...(connection.connection || connection),
	    session: connection.session || connection.connection?.session,
	    workspaceName: connection.connection?.workspaceName || connection.workspaceName
	  };
	  if (!connectionData.id || !connectionData.session) {
	    throw new Error("Incomplete workspace data from Notion. Please try again");
	  }
	
	  const connectionState = await readConnectionState();
	  const connections = upsertConnection(connectionState.connections, connectionData);
	  await writeConnectionState(connections, connectionData.id);
	
	  return connectionListResult(connections, connectionData.id);
	}
	
	async function exportSelection(payload) {
	  const state = await readConnectionState();
	  const connection = getSelectedConnection(state.connections, state.selectedConnectionId);
	
	  if (!connection?.session) {
	    throw new Error("Connect to Notion first");
	  }
	
	  const markdown = buildExportMarkdown({
	    title: payload?.title,
	    provider: payload?.provider,
	    text: payload?.text,
	    sourceUrl: payload?.sourceUrl,
	    exportedAt: new Date().toISOString()
	  });
	
	  const result = await requestBackend("/api/export", {
	    session: connection.session,
	    body: {
	      markdown,
	      ...(connection.selectedParentPageId ? { parentPageId: connection.selectedParentPageId } : {})
	    }
	  });
	
	  if (result.session) {
	    await writeConnectionState(
	      updateConnectionSession(state.connections, connection.id, result.session),
	      connection.id
	    );
	  }
	
	  return { id: result.id, url: result.url };
	}
	
	async function getNotionConnections() {
	  const state = await readConnectionState();
	  return connectionListResult(state.connections, state.selectedConnectionId);
	}
	
	async function selectNotionConnection(connectionId) {
	  const state = await readConnectionState();
	  const selectedConnectionId = selectConnection(state.connections, connectionId);
	  if (!selectedConnectionId) throw new Error("Selected workspace not found");
	
	  await writeConnectionState(state.connections, selectedConnectionId);
	  return connectionListResult(state.connections, selectedConnectionId);
	}
	
	async function listNotionPages() {
	  const state = await readConnectionState();
	  const connection = getSelectedConnection(state.connections, state.selectedConnectionId);
	  if (!connection?.session) throw new Error("Connect to Notion first");
	
	  const result = await requestBackend("/api/pages", { session: connection.session });
	  const connections = result.session
	    ? updateConnectionSession(state.connections, connection.id, result.session)
	    : state.connections;
	  if (result.session) await writeConnectionState(connections, connection.id);
	
	  return {
	    pages: Array.isArray(result.pages) ? result.pages : [],
	    connection: connectionMetadata(getSelectedConnection(connections, connection.id))
	  };
	}
	
	async function selectNotionPage(page) {
	  const state = await readConnectionState();
	  const connection = getSelectedConnection(state.connections, state.selectedConnectionId);
	  if (!connection) throw new Error("Connect to Notion first");
	
	  const connections = chooseConnectionPage(state.connections, connection.id, page);
	  await writeConnectionState(connections, connection.id);
	  return connectionListResult(connections, connection.id);
	}
	
	async function disconnectNotion() {
	  const state = await readConnectionState();
	  if (!state.selectedConnectionId) return connectionListResult(state.connections, "");
	
	  const connections = removeConnection(state.connections, state.selectedConnectionId);
	  const selectedConnectionId = connections[0]?.id || "";
	  await writeConnectionState(connections, selectedConnectionId);
	  return connectionListResult(connections, selectedConnectionId);
	}
	
	async function readConnectionState() {
	  const stored = await chrome.storage.local.get([
	    NOTION_CONNECTIONS_KEY,
	    SELECTED_NOTION_CONNECTION_ID_KEY,
	    "notionSession",
	    "notionWorkspaceName"
	  ]);
	  const state = migrateStoredConnections(stored);
	  if (state.shouldPersist) {
	    await writeConnectionState(state.connections, state.selectedConnectionId, state.shouldRemoveLegacy);
	  }
	  return state;
	}
	
	async function writeConnectionState(connections, selectedConnectionId, removeLegacy = true) {
	  await chrome.storage.local.set({
	    [NOTION_CONNECTIONS_KEY]: connections,
	    [SELECTED_NOTION_CONNECTION_ID_KEY]: selectedConnectionId
	  });
	  if (removeLegacy) await chrome.storage.local.remove(["notionSession", "notionWorkspaceName"]);
	}
	
	function connectionListResult(connections, selectedConnectionId) {
	  const selectedConnection = getSelectedConnection(connections, selectedConnectionId);
	  return {
	    connections: connections.map(connectionMetadata),
	    selectedConnectionId,
	    connection: connectionMetadata(selectedConnection),
	    workspaceName: selectedConnection?.workspaceName || ""
	  };
	}
	
	async function requestBackend(path, { body, session } = {}) {
	  let response;
	
	  try {
	    response = await fetch(`${API_BASE_URL}${path}`, {
	      method: "POST",
	      headers: {
	        "Content-Type": "application/json",
	        ...(session ? { Authorization: `Bearer ${session}` } : {})
	      },
	      body: JSON.stringify(body || {})
	    });
	  } catch {
	    throw new Error("Could not connect to the backend. Please try again");
	  }
	
	  const result = await response.json().catch(() => null);
	
	  if (!response.ok) {
	    throw new Error(result?.error || `Backend error: HTTP ${response.status}`);
	  }
	
	  return result;
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
    // #region Orchestration Logic
	// Other globals currently defined at this spot: SCRIPT_NAME, _log, _warn, _error
	const INJECTED_MANIFEST = {"manifest_version":3,"name":"ChatPort: AI Chat Export","version":"1.0.1","description":"Export AI chats to Notion, or save PDF, Markdown, and HTML locally with code, equations, tables, and images.","permissions":["activeTab","identity","scripting","storage"],"optional_permissions":[],"content_scripts":[],"options_ui":{},"browser_action":{},"page_action":{},"action":{"default_popup":"src/popup.html","default_icon":{"16":"icons/icon16.png","32":"icons/icon32.png","48":"icons/icon48.png","128":"icons/icon128.png"}},"icons":{"16":"icons/icon16.png","32":"icons/icon32.png","48":"icons/icon48.png","128":"icons/icon128.png"},"web_accessible_resources":[],"background":{"service_worker":"src/service-worker.js","type":"module"},"_id":"chatport-ai-chat-export"};
	const CONTENT_SCRIPT_CONFIGS_FOR_MATCHING = [];
	const OPTIONS_PAGE_PATH = null;
	const POPUP_PAGE_PATH = "src/popup.html";
	const EXTENSION_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAABEZVhJZk1NACoAAAAIAAGHaQAEAAAAAQAAABoAAAAAAAOgAQADAAAAAQABAACgAgAEAAAAAQAABACgAwAEAAAAAQAABAAAAAAA093qHQAAAAZiS0dEAAAAAAAA+UO7fwAAAAd0SU1FB+oIBQU2EZnCWtsAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjYtMDgtMDVUMDU6NTQ6MTcrMDA6MDBhC33aAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI2LTA4LTA1VDA1OjU0OjE3KzAwOjAwEFbFZgAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNi0wOC0wNVQwNTo1NDoxNyswMDowMEdD5LkAAAARdEVYdGV4aWY6Q29sb3JTcGFjZQAxD5sCSQAAABJ0RVh0ZXhpZjpFeGlmT2Zmc2V0ADI2UxuiZQAAABl0RVh0ZXhpZjpQaXhlbFhEaW1lbnNpb24AMTAyNPLFVh8AAAAZdEVYdGV4aWY6UGl4ZWxZRGltZW5zaW9uADEwMjRLPo33AAAOeklEQVRo3u2Ze5BlVXXGf2utfc69t2/3zHTPo4d5Dw6C8hpHhWJARgJiUmpBRDS+Kj6CmjJGQ1AUNQ9FDamoSSpGjaWmCsqUIAaDgIqAoIDhoTDACDgwwLyn59Hv+zjn7JU/zr3dM5mZdlD8j31r1z3d995zvm+vb31r7XPg+fH8+J2GPBcnGTjpI8zduJRqu87upc8gbRWJhrqWVxBFTD1WM6xI8cJp9Y6y85FP/87XDr/tDxcs+xhp1gs1IRueZGLWsE7GMbXdvb7l6kuKhe+/DCkSxJx2mjH70TXS7t+uJBEJHquNPsdh+ZLPIz2Rp3794d9/BGpnvpv6pjmERp2oBa6FhKKivUOr4sSiTS65Ic2UM0cv4ZZjPlpNskqQ4N7saWSz169u5wN7IHFIc2ykz6jlMDsWuMOE4knBk09/8PdDIJxzPgMPn0BeabJv+VYGf3WM7V24vpi78yQquxbRXrzzBApbJ1FPFdfjQOYLUgVxxcYQ3Qr+kKjf6Wn8aRjp3U4tQydqGuttJJdIZnhfxhNb3v/cEpi39FJCu4JLJGqUdLKmRdoudhz7I134+LlvFk/fK9HWCmriirgAioiAKyqKA+KU/xP2inKDKF+Syer/xnqLkFdD/KttOV+fh7YCj295z3NDYP7CS9G8Auq4RG3N3RfrOwYp0uxcye0KcVutGGAIWggCriIoCCIo4uqAg7qAiKgJAgIifCum2aUhr26RRmI+0I4U4pIrIs6j2/5sRnw6I/hll6J5gpcvi5bHkU/9uxRW/IvmyQ/Fk9VCKErg6oIargaiICqYCCqCqqAmIkFEDcQFzSWaE/Ut1qo8hPJGzIv0qToiCObIjOiOIAKDg3+Du0MJvigsm5226tdpDK8ULHaAmKCAIK5I5+Uo2vl/KSFBEShjMPU9kFyQIAJu/rehZZ+qDC+TxrInEME1T3hk6zsOi9EO98GCRZ8oRYtrEbIYk2Zf2ui7Vd3WgmUd4CooIoqK0T0WMWRq+QwR6cAXOroqa4Mq4qIgUVAk2lkkXonaukVGetUH9/rwB77Fso0fY2jf94+cwLwVl5D1NdB2ImMr9/rpG85jKN1+g3o4AyxTNBFUVA0TI0bBYwkOV9zLlVZVVDsJ3CFQEhOIIK0CSQzpUnRzRc/0SjYsafFzHa+H2TecHYXAghWvZtfQ/xxZDoRmnZdveBvJZFX7H13IAwt+coXGcI6gmSAJCGZGYzJnbKyFmZAkSghGSJSQKElqZFkka0dMrXSgjjNJ4ej8GvqW45B2BFXETQQRcUPz5J818VdI8DzrHzYPObQPLZaDcmD+0stQV6Rt5uIF+JlahNvFzUutq6gqkxM5a166kA99+DRecMzc/U4keHSS1Ni6eZyL33cb27ZM0tdboSgiYga7JpC3vhj5zBlw2tXIaIH2pEgUBCnEMTHfkA0OrZHcWjpel/rQMh964zU8eeWXZ5bQrOrZeMj5wPZP++aJBpM92/9LPCwV0QiqpkZjsmD1Swa57qa3cvyJC5k3r87cqdnDvPl1+gdqLF85m9PXLeaH129idCSjWg14I4c1C/HLz4Cje9DBXvSunUjDETUUVRXLxXXQmj3jNj7rTsvToFklVvfMZ/vItTNHoHfxX9KbDRjiBcIfa27fFaygtEjMlNGRNv/5rfM57/UvpjHZJkkOoUSBIncq1YT1v9zF28/7ASP7WtQ/tZbiouMpIshYjs4LyI4W+vH7CNc9g/RU0CgRRNG4zXsnj8d1mHaQfub4bdteffgcmPXyP6fmfVQbdU8bNSjkPeVXFBwEIRZCX2+Fo18wAECSaulF2vElm/anJFXarYyTXrKAb37n1fTNrtL48sOEy+/DRjPoC/DACPbX92B3D0El6cpIBS00hkU2Wb8wTNQJWcX2hp0zJ3HtyRVYTLXZOxFbvY1Viq2TEryCUh7LFCEAvDx0wP3gaaEkseaUQb7+7XOo72vTuOJe7CsPo4D9xZ3ItZuQfXlpwZTnVxR1w6JdaENzsaEFRarpzAQKNbRQ1dzQws4U1xouBR2bo3P6UiLT6lMFMznsDEFptzNOOf0ovvyds6nP7SPe+DR25Ub0VyPIYB2xEvSU3aKqGOrJy2T5jkWybLtbu6ozEvDeUSwPbrmBy2ndZqUErtMFiP3BC+5Co5HTbORT781medxuR9S0JNHKOGPdIv7wDSsZf2QE+9wvoRrQXErn61JwLUuiaFS3fmtXTrZWBS2Sg3L2gA1N0jQ5f99Hi7u4hu0LHj+eqXLfKT7ehS6lPoBmq+BPLriK9Q/upKeWEqPvtyKOE7nq22/m5acuwz0CUO9Lkahou1SneKexKJugMgbebQsVo3KCu950KNM5gIAWytVHfRLEq6Hds7ADvuwsp4BPRwUgBOWCC0/gZacsJU2s0ztNE1ATFh7VB8Qp1XnhHZEYHst2W7yz8tKVknSzAI1xCa44B48DCLgILgHEg4v0dJozoSMikW7yyhQYM+FP33UKRzJEYue9bPwULSXpXcDWmTqVymUcpH5A/h2OQAkuMm0tckCFLZuabrdZjjyLfPKyH/LrR4eoVBKi+9RvHFBVWs2MP3rNsbzrPaeWH8SyyRYvLboLvtw7dO4DoB0ygpRhP+SiHCghF7xwkJgr2iiBigsq3XxwZJoM4O7sHhpnx45RqrUEj76fVJ0QjMmJNsPDjanrpBXrnLVs/mRaMl0HmpaRKwoTpX3/BgISYMe2T/NCua85Of+WnSArpNyKTSUZsbuTKk+YpsZ/fOONRyShMrqw7ZkGSUgglhFQ0aloa2flret8KGZs88PsvQ4gkCWFL+//orXm3FGAbMA5lU44ywUtpaP7hTNG58c3P8b2bWOEZL8C1/ls3VkrWbZ8DrGINBqRi87/Kff8ZDcD/T14AYLTbkYqaUDFuiWsGwUt1yw+LNoxtRkJ7K2S1qKAIyJ3i+g7u6Er97jTNtp1m1ar4PK/+zHrH9xGrZbisVSQqjA+2uKr37iAZW9fg5ry3Ssf57H1I1x9x1nM7q/QnCzo6Q386JqdfONzT5PWSt/pVgNxU1Uf0ZA/IK7EQmcmkCigMToRhDsk0hLRCojj09UYkSkJ1WqB7934DiYm2p2itp8kBebPr5NnOSEJjI/k9A/UOPbEftKqkCQGCOdeIFz1+a0QS6frJG8UEVOJ9/szK7ZEgsjKTfH/EzhAWLZyGA9FrI0ukOrYwGOI/7Rcb4ll7RIQxSPEzqmK6PQP9LBkaT+LFs9h8ZLpuWjxHEJinZx2LnznSloTzquO+TH33Lank+zO5ETRVTsm+6WvKGp8J8zfSzJ/l03KHmYksO3BzxLG55DVhzWrjSISv9a1tO7qB1Mmx3PuvXtHqfPCabdyWs2MVuvgmWeRIi+d6eb/3s7InjYf/PtjOf3cQR57cJSJsYw0FQwr99VlsxjFJQi+k57m1fROEtNWMau5bGYCADGZJKZZ3L32azy985Krwe8DTNBCRPAIPT0pX/qnB7j/5zupVBPSSkKlmlCpHDyTNFCpJmx6fIzPXfwQH/nHE3jTe4/moXuGufTND6IqpJVAzDtNRFnUoooiFv9N983aw3BvSHfM8SwdPYjAQea6eMlnsTxBi9TAC4RzKJKbRUJppo6YGu2201MLvO71L2DFqlnlJr17e6XbQ5U3NeipB+7/2V7uv2MPt2x6FU//epL3v+YX7N6W8bq3LWJsT+S+m0epVVPEpVDUzPzxsGTXatqhkY/VJWzt9+HX3cWt33v3zAQAli/4As1Vm+nZcJw5XpBk/6ox/YCIZjiJYJgKMYeJ8QKPnTbAtVNRpbREn24PKpVAtRJ44Qmz2LOjzZ6tOb29KRPDkaBGTz1B3dwwUQFJs7Ml6q3uYmKxaPeOc9PGPzgI6yFvrxdpk3TzfLw2GYv6HiZW/+xD/be/abW4vgLRTCDxCGbGwEA61XaV7x0nF5tqkU2sLIBRePT+CdJEqdcTKJTZc9JS94W6otEUk1Bcqq3KrR7V0pHBoj13K67FoaAeOgILX/MhKvcu7/YoihWRUPRro/d2CCcKmhmaSKd/0U5LrISpJs2mmjIr+1kvj4N2bv5GwaZJxo51qibFF3205+LYrKu96InYWvUU9qsV3Ljx7CMnALD4/HeS3LmmBCGYaF6gzQFp91+vnqxVCbFTbKxbPcsoHNhVTr+mClSHrHYs03JxCSqCJvGz6Xj94z7xIrLld4kIXkTh+8+sPRzMw9/c3XrdN9FqVmo6WiExNWJ1r656aJ1Y/KqAiqspWpTTSt+eAr8/iWnwpbzUVTQXzAUJpnFMK/nbmUw/HiZWSbbsbiE3Jwszgp+RAMCTmy/GrV1WANdCPbW4+6hc2tX3iWWvVfWHVDBBTVER17wkI1ER76R1qW2sMCxXtOiUq2CCaIjXSG/zZI12FUWw8ZU/xx2PEbYc9wt+0ziiBxyrFn8BzfoQdVwzCZPzVCqNonb81pA9vPKtGpOLzNO16kEOzICuK3X/KlsQFUZQv1EtfimM9t3p/WNIqxrGXvJIXtu0BG1WuX7z2iOBduSPmI4+8TLS3SspKuOM1p5i3p41Vlk2VMSnl1AMnUxl4cOrNaavVA+nWbTjTHSuYlUVi+I6Ieg2FdZL8J9JEm8Pe2dtobeBjczS2D9GyCrRWjUmZ+/ixs3rjhTWs3vIt+qky6kMzydpzcZDTpRMrNWj7aHXFj2DN2F5lWSyh52v+r4eteG0GkXVQlAvkrHs6A1vam6ffS9UcqSSY3v6zPuaZHMbhURFxxO82uYHG896NpCe3WPWjes/MXV88pJvUi/6vW+wUeyuXAvtujooLrG+bUUk2oREKe8+FCnHANsdc4BCvbF4qJh4ww3MufICWn0tbtvyymcF/LeKwOHGSS/9CovuP48eFrJ5xbWEZkUSMcQDpgY4LkLsbXpt9xwizhMXXc8T/3DFc3H558fz43cZ/wfakPRqrzfAJwAAAABJRU5ErkJggg==";
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
		  const scriptName = "ChatPort: AI Chat Export";
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
			  const polyfillString = "\n// -- Messaging implementation\n\nfunction createEventBus(\n  scopeId,\n  type = \"page\", // \"page\" or \"iframe\"\n  { allowedOrigin = \"*\", children = [], parentWindow = null } = {}\n) {\n  if (!scopeId) throw new Error(\"createEventBus requires a scopeId\");\n\n  const handlers = {};\n\n  function handleIncoming(ev) {\n    if (allowedOrigin !== \"*\" && ev.origin !== allowedOrigin) return;\n\n    const msg = ev.data;\n    if (!msg || msg.__eventBus !== true || msg.scopeId !== scopeId) return;\n\n    const { event, payload } = msg;\n\n    // PAGE: if it's an INIT from an iframe, adopt it\n    if (type === \"page\" && event === \"__INIT__\") {\n      const win = ev.source;\n      if (win && !children.includes(win)) {\n        children.push(win);\n      }\n      return;\n    }\n\n    (handlers[event] || []).forEach((fn) =>\n      fn(payload, { origin: ev.origin, source: ev.source })\n    );\n  }\n\n  window.addEventListener(\"message\", handleIncoming);\n\n  function emitTo(win, event, payload) {\n    const envelope = {\n      __eventBus: true,\n      scopeId,\n      event,\n      payload,\n    };\n    win.postMessage(envelope, allowedOrigin);\n  }\n\n  // IFRAME: announce to page on startup\n  if (type === \"iframe\") {\n    setTimeout(() => {\n      const pw = parentWindow || window.parent;\n      if (pw && pw.postMessage) {\n        emitTo(pw, \"__INIT__\", null);\n      }\n    }, 0);\n  }\n\n  return {\n    on(event, fn) {\n      handlers[event] = handlers[event] || [];\n      handlers[event].push(fn);\n    },\n    off(event, fn) {\n      if (!handlers[event]) return;\n      handlers[event] = handlers[event].filter((h) => h !== fn);\n    },\n    /**\n     * Emits an event.\n     * @param {string} event - The event name.\n     * @param {any} payload - The event payload.\n     * @param {object} [options] - Emission options.\n     * @param {Window} [options.to] - A specific window to target. If provided, message is ONLY sent to the target.\n     */\n    emit(event, payload, { to } = {}) {\n      // If a specific target window is provided, send only to it and DO NOT dispatch locally.\n      // This prevents a port from receiving its own messages.\n      if (to) {\n        if (to && typeof to.postMessage === \"function\") {\n          emitTo(to, event, payload);\n        }\n        return; // Exit after targeted send.\n      }\n\n      // For broadcast messages (no 'to' target), dispatch locally first.\n      (handlers[event] || []).forEach((fn) =>\n        fn(payload, { origin: location.origin, source: window })\n      );\n\n      // Then propagate the broadcast to other windows.\n      if (type === \"page\") {\n        children.forEach((win) => emitTo(win, event, payload));\n      } else {\n        const pw = parentWindow || window.parent;\n        if (pw && pw.postMessage) {\n          emitTo(pw, event, payload);\n        }\n      }\n    },\n  };\n}\n\nfunction createRuntime(type = \"background\", bus) {\n  let nextId = 1;\n  const pending = {};\n  const msgListeners = [];\n\n  let nextPortId = 1;\n  const ports = {};\n  const onConnectListeners = [];\n\n  function parseArgs(args) {\n    let target, message, options, callback;\n    const arr = [...args];\n    if (arr.length === 0) {\n      throw new Error(\"sendMessage requires at least one argument\");\n    }\n    if (arr.length === 1) {\n      return { message: arr[0] };\n    }\n    // last object could be options\n    if (\n      arr.length &&\n      typeof arr[arr.length - 1] === \"object\" &&\n      !Array.isArray(arr[arr.length - 1])\n    ) {\n      options = arr.pop();\n    }\n    // last function is callback\n    if (arr.length && typeof arr[arr.length - 1] === \"function\") {\n      callback = arr.pop();\n    }\n    if (\n      arr.length === 2 &&\n      (typeof arr[0] === \"string\" || typeof arr[0] === \"number\")\n    ) {\n      [target, message] = arr;\n    } else {\n      [message] = arr;\n    }\n    return { target, message, options, callback };\n  }\n\n  if (type === \"background\") {\n    bus.on(\"__REQUEST__\", ({ id, message }, { source }) => {\n      let responded = false,\n        isAsync = false;\n      function sendResponse(resp) {\n        if (responded) return;\n        responded = true;\n        // Target the response directly back to the window that sent the request.\n        bus.emit(\"__RESPONSE__\", { id, response: resp }, { to: source });\n      }\n      const results = msgListeners\n        .map((fn) => {\n          try {\n            // msg, sender, sendResponse\n            const ret = fn(message, { id, tab: { id: source } }, sendResponse);\n            if (ret === true || (ret && typeof ret.then === \"function\")) {\n              isAsync = true;\n              return ret;\n            }\n            return ret;\n          } catch (e) {\n            _error(e);\n          }\n        })\n        .filter((r) => r !== undefined);\n\n      const promises = results.filter((r) => r && typeof r.then === \"function\");\n      if (!isAsync && promises.length === 0) {\n        const out = results.length === 1 ? results[0] : results;\n        sendResponse(out);\n      } else if (promises.length) {\n        Promise.all(promises).then((vals) => {\n          if (!responded) {\n            const out = vals.length === 1 ? vals[0] : vals;\n            sendResponse(out);\n          }\n        });\n      }\n    });\n  }\n\n  if (type !== \"background\") {\n    bus.on(\"__RESPONSE__\", ({ id, response }) => {\n      const entry = pending[id];\n      if (!entry) return;\n      entry.resolve(response);\n      if (entry.callback) entry.callback(response);\n      delete pending[id];\n    });\n  }\n\n  function sendMessage(...args) {\n    // Background should be able to send message to itself\n    // if (type === \"background\") {\n    //   throw new Error(\"Background cannot sendMessage to itself\");\n    // }\n    const { target, message, callback } = parseArgs(args);\n    const id = nextId++;\n    const promise = new Promise((resolve) => {\n      pending[id] = { resolve, callback };\n      bus.emit(\"__REQUEST__\", { id, message });\n    });\n    return promise;\n  }\n\n  bus.on(\"__PORT_CONNECT__\", ({ portId, name }, { source }) => {\n    if (type !== \"background\") return;\n    const backgroundPort = makePort(\"background\", portId, name, source);\n    ports[portId] = backgroundPort;\n\n    onConnectListeners.forEach((fn) => fn(backgroundPort));\n\n    // send back a CONNECT_ACK so the client can\n    // start listening on its end:\n    bus.emit(\"__PORT_CONNECT_ACK__\", { portId, name }, { to: source });\n  });\n\n  // Clients handle the ACK and finalize their Port object by learning the remote window.\n  bus.on(\"__PORT_CONNECT_ACK__\", ({ portId, name }, { source }) => {\n    if (type === \"background\") return; // ignore\n    const p = ports[portId];\n    if (!p) return;\n    // Call the port's internal finalize method to complete the handshake\n    if (p._finalize) {\n      p._finalize(source);\n    }\n  });\n\n  // Any port message travels via \"__PORT_MESSAGE__\"\n  bus.on(\"__PORT_MESSAGE__\", (envelope, { source }) => {\n    const { portId } = envelope;\n    const p = ports[portId];\n    if (!p) return;\n    p._receive(envelope, source);\n  });\n\n  // Any port disconnect:\n  bus.on(\"__PORT_DISCONNECT__\", ({ portId }) => {\n    const p = ports[portId];\n    if (!p) return;\n    p._disconnect();\n    delete ports[portId];\n  });\n\n  // Refactored makePort to correctly manage internal state and the connection handshake.\n  function makePort(side, portId, name, remoteWindow) {\n    let onMessageHandlers = [];\n    let onDisconnectHandlers = [];\n    let buffer = [];\n    // Unique instance ID for this port instance\n    const instanceId = Math.random().toString(36).slice(2) + Date.now();\n    // These state variables are part of the closure and are updated by _finalize\n    let _ready = side === \"background\";\n\n    function _drainBuffer() {\n      buffer.forEach((m) => _post(m));\n      buffer = [];\n    }\n\n    function _post(msg) {\n      // Always use the 'to' parameter for port messages, making them directional.\n      // Include senderInstanceId\n      bus.emit(\n        \"__PORT_MESSAGE__\",\n        { portId, msg, senderInstanceId: instanceId },\n        { to: remoteWindow }\n      );\n    }\n\n    function postMessage(msg) {\n      if (!_ready) {\n        buffer.push(msg);\n      } else {\n        _post(msg);\n      }\n    }\n\n    function _receive(envelope, source) {\n      // envelope: { msg, senderInstanceId }\n      if (envelope.senderInstanceId === instanceId) return; // Don't dispatch to self\n      onMessageHandlers.forEach((fn) =>\n        fn(envelope.msg, { id: portId, tab: { id: source } })\n      );\n    }\n\n    function disconnect() {\n      // Also use the 'to' parameter for disconnect messages\n      bus.emit(\"__PORT_DISCONNECT__\", { portId }, { to: remoteWindow });\n      _disconnect();\n      delete ports[portId];\n    }\n\n    function _disconnect() {\n      onDisconnectHandlers.forEach((fn) => fn());\n      onMessageHandlers = [];\n      onDisconnectHandlers = [];\n    }\n\n    // This function is called on the client port when the ACK is received from background.\n    // It updates the port's state, completing the connection.\n    function _finalize(win) {\n      remoteWindow = win; // <-- This is the crucial part: learn the destination\n      _ready = true;\n      _drainBuffer();\n    }\n\n    return {\n      name,\n      sender: {\n        id: portId,\n      },\n      onMessage: {\n        addListener(fn) {\n          onMessageHandlers.push(fn);\n        },\n        removeListener(fn) {\n          onMessageHandlers = onMessageHandlers.filter((x) => x !== fn);\n        },\n      },\n      onDisconnect: {\n        addListener(fn) {\n          onDisconnectHandlers.push(fn);\n        },\n        removeListener(fn) {\n          onDisconnectHandlers = onDisconnectHandlers.filter((x) => x !== fn);\n        },\n      },\n      postMessage,\n      disconnect,\n      // Internal methods used by the runtime\n      _receive,\n      _disconnect,\n      _finalize, // Expose the finalizer for the ACK handler\n    };\n  }\n\n  function connect(connectInfo = {}) {\n    if (type === \"background\") {\n      throw new Error(\"Background must use onConnect, not connect()\");\n    }\n    const name = connectInfo.name || \"\";\n    const portId = nextPortId++;\n    // create the client side port\n    // remoteWindow is initially null; it will be set by _finalize upon ACK.\n    const clientPort = makePort(\"client\", portId, name, null);\n    ports[portId] = clientPort;\n\n    // fire the connect event across the bus\n    bus.emit(\"__PORT_CONNECT__\", { portId, name });\n    return clientPort;\n  }\n\n  function onConnect(fn) {\n    if (type !== \"background\") {\n      throw new Error(\"connect event only fires in background\");\n    }\n    onConnectListeners.push(fn);\n  }\n\n  return {\n    // rpc:\n    sendMessage,\n    onMessage: {\n      addListener(fn) {\n        msgListeners.push(fn);\n      },\n      removeListener(fn) {\n        const i = msgListeners.indexOf(fn);\n        if (i >= 0) msgListeners.splice(i, 1);\n      },\n    },\n\n    // port API:\n    connect,\n    onConnect: {\n      addListener(fn) {\n        onConnect(fn);\n      },\n      removeListener(fn) {\n        const i = onConnectListeners.indexOf(fn);\n        if (i >= 0) onConnectListeners.splice(i, 1);\n      },\n    },\n  };\n}\n\n\n// --- Abstraction Layer: PostMessage Target\n\nlet nextRequestId = 1;\nconst pendingRequests = new Map(); // requestId -> { resolve, reject, timeout }\n\nfunction sendAbstractionRequest(method, args = []) {\n  return new Promise((resolve, reject) => {\n    const requestId = nextRequestId++;\n\n    const timeout = setTimeout(() => {\n      pendingRequests.delete(requestId);\n      reject(new Error(`PostMessage request timeout for method: ${method}`));\n    }, 10000);\n\n    pendingRequests.set(requestId, { resolve, reject, timeout });\n\n    window.parent.postMessage({\n      type: \"abstraction-request\",\n      requestId,\n      method,\n      args,\n    });\n  });\n}\n\nwindow.addEventListener(\"message\", (event) => {\n  const { type, requestId, success, result, error } = event.data;\n\n  if (type === \"abstraction-response\") {\n    const pending = pendingRequests.get(requestId);\n    if (pending) {\n      clearTimeout(pending.timeout);\n      pendingRequests.delete(requestId);\n\n      if (success) {\n        pending.resolve(result);\n      } else {\n        const err = new Error(error.message);\n        err.stack = error.stack;\n        pending.reject(err);\n      }\n    }\n  }\n});\n\nasync function _storageSet(items) {\n  return sendAbstractionRequest(\"_storageSet\", [items]);\n}\n\nasync function _storageGet(keys) {\n  return sendAbstractionRequest(\"_storageGet\", [keys]);\n}\n\nasync function _storageRemove(keysToRemove) {\n  return sendAbstractionRequest(\"_storageRemove\", [keysToRemove]);\n}\n\nasync function _storageClear() {\n  return sendAbstractionRequest(\"_storageClear\");\n}\n\nasync function _cookieList(details) {\n  return sendAbstractionRequest(\"_cookieList\", [details]);\n}\n\nasync function _cookieSet(details) {\n  return sendAbstractionRequest(\"_cookieSet\", [details]);\n}\n\nasync function _cookieDelete(details) {\n  return sendAbstractionRequest(\"_cookieDelete\", [details]);\n}\n\nasync function _fetch(url, options) {\n  return sendAbstractionRequest(\"_fetch\", [url, options]);\n}\n\nfunction _registerMenuCommand(name, func) {\n  _warn(\"_registerMenuCommand called from iframe context:\", name);\n  return sendAbstractionRequest(\"_registerMenuCommand\", [\n    name,\n    func.toString(),\n  ]);\n}\n\nfunction _openTab(url, active) {\n  return sendAbstractionRequest(\"_openTab\", [url, active]);\n}\n\nasync function _initStorage() {\n  return sendAbstractionRequest(\"_initStorage\");\n}\n\n\nconst EXTENSION_ASSETS_MAP = {{EXTENSION_ASSETS_MAP}};\n\n// -- Polyfill Implementation\nfunction buildPolyfill({ isBackground = false, isOtherPage = false } = {}) {\n  // Generate a unique context ID for this polyfill instance\n  const contextType = isBackground\n    ? \"background\"\n    : isOtherPage\n      ? \"options\"\n      : \"content\";\n  const contextId = `${contextType}_${Math.random()\n    .toString(36)\n    .substring(2, 15)}`;\n\n  const IS_IFRAME = \"true\" === \"true\";\n  const BUS = (function () {\n    if (globalThis.__BUS) {\n      return globalThis.__BUS;\n    }\n    globalThis.__BUS = createEventBus(\n      \"chatport-ai-chat-export\",\n      IS_IFRAME ? \"iframe\" : \"page\",\n    );\n    return globalThis.__BUS;\n  })();\n  const RUNTIME = createRuntime(isBackground ? \"background\" : \"tab\", BUS);\n  const createNoopListeners = () => ({\n    addListener: (callback) => {\n      _log(\"addListener\", callback);\n    },\n    removeListener: (callback) => {\n      _log(\"removeListener\", callback);\n    },\n  });\n  // TODO: Stub\n  const storageChangeListeners = new Set();\n  function broadcastStorageChange(changes, areaName) {\n    storageChangeListeners.forEach((listener) => {\n      listener(changes, areaName);\n    });\n  }\n\n  let REQ_PERMS = [];\n\n  // --- Chrome polyfill\n  let chrome = {\n    extension: {\n      isAllowedIncognitoAccess: () => Promise.resolve(true),\n      sendMessage: (...args) => _messagingHandler.sendMessage(...args),\n    },\n    permissions: {\n      // TODO: Remove origin permission means exclude from origin in startup (when checking for content scripts)\n      request: (permissions, callback) => {\n        _log(\"permissions.request\", permissions, callback);\n        if (Array.isArray(permissions)) {\n          REQ_PERMS = [...REQ_PERMS, ...permissions];\n        }\n        if (typeof callback === \"function\") {\n          callback(permissions);\n        }\n        return Promise.resolve(permissions);\n      },\n      contains: (permissions, callback) => {\n        if (typeof callback === \"function\") {\n          callback(true);\n        }\n        return Promise.resolve(true);\n      },\n      getAll: () => {\n        return Promise.resolve({\n          permissions: EXTENSION_PERMISSIONS,\n          origins: ORIGIN_PERMISSIONS,\n        });\n      },\n      onAdded: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n    },\n    i18n: {\n      getUILanguage: () => {\n        return USED_LOCALE || \"en\";\n      },\n      getMessage: (key, substitutions = []) => {\n        if (typeof substitutions === \"string\") {\n          substitutions = [substitutions];\n        }\n        if (typeof LOCALE_KEYS !== \"undefined\" && LOCALE_KEYS[key]) {\n          return LOCALE_KEYS[key].message?.replace(\n            /\\$(\\d+)/g,\n            (match, p1) => substitutions[p1 - 1] || match,\n          );\n        }\n        return key;\n      },\n    },\n    alarms: {\n      onAlarm: createNoopListeners(),\n      create: () => {\n        _log(\"alarms.create\", arguments);\n      },\n      get: () => {\n        _log(\"alarms.get\", arguments);\n      },\n    },\n    runtime: {\n      ...RUNTIME,\n      onInstalled: createNoopListeners(),\n      onStartup: createNoopListeners(),\n      // TODO: Postmessage to parent to open options page or call openOptionsPage\n      openOptionsPage: () => {\n        // const url = chrome.runtime.getURL(OPTIONS_PAGE_PATH);\n        // console.log(\"openOptionsPage\", _openTab, url, EXTENSION_ASSETS_MAP);\n        // _openTab(url);\n        if (typeof openOptionsPage === \"function\") {\n          openOptionsPage();\n        } else if (window.parent) {\n          window.parent.postMessage({ type: \"openOptionsPage\" }, \"*\");\n        } else {\n          _warn(\"openOptionsPage not available.\");\n        }\n      },\n      getManifest: () => {\n        // The manifest object will be injected into the scope where buildPolyfill is called\n        if (typeof INJECTED_MANIFEST !== \"undefined\") {\n          return JSON.parse(JSON.stringify(INJECTED_MANIFEST)); // Return deep copy\n        }\n        _warn(\"INJECTED_MANIFEST not found for chrome.runtime.getManifest\");\n        return { name: \"Unknown\", version: \"0.0\", manifest_version: 2 };\n      },\n      getURL: (path) => {\n        if (!path) return \"\";\n        if (path.startsWith(\"/\")) {\n          path = path.substring(1);\n        }\n\n        if (typeof _createAssetUrl === \"function\") {\n          return _createAssetUrl(path);\n        }\n\n        _warn(\n          `chrome.runtime.getURL fallback for '${path}'. Assets may not be available.`,\n        );\n        // Attempt a relative path resolution (highly context-dependent and likely wrong)\n        try {\n          if (window.location.protocol.startsWith(\"http\")) {\n            return new URL(path, window.location.href).toString();\n          }\n        } catch (e) {\n          /* ignore error, fallback */\n        }\n        return path;\n      },\n      id: \"polyfilled-extension-\" + Math.random().toString(36).substring(2, 15),\n      lastError: null,\n      setUninstallURL: () => {},\n      setUpdateURL: () => {},\n      getPlatformInfo: async () => {\n        const platform = {\n          os: \"unknown\",\n          arch: \"unknown\",\n          nacl_arch: \"unknown\",\n        };\n\n        if (typeof navigator !== \"undefined\") {\n          const userAgent = navigator.userAgent.toLowerCase();\n          if (userAgent.includes(\"mac\")) platform.os = \"mac\";\n          else if (userAgent.includes(\"win\")) platform.os = \"win\";\n          else if (userAgent.includes(\"linux\")) platform.os = \"linux\";\n          else if (userAgent.includes(\"android\")) platform.os = \"android\";\n          else if (userAgent.includes(\"ios\")) platform.os = \"ios\";\n\n          if (userAgent.includes(\"x86_64\") || userAgent.includes(\"amd64\")) {\n            platform.arch = \"x86-64\";\n          } else if (userAgent.includes(\"i386\") || userAgent.includes(\"i686\")) {\n            platform.arch = \"x86-32\";\n          } else if (userAgent.includes(\"arm\")) {\n            platform.arch = \"arm\";\n          }\n        }\n\n        return platform;\n      },\n      getBrowserInfo: async () => {\n        const info = {\n          name: \"unknown\",\n          version: \"unknown\",\n          buildID: \"unknown\",\n        };\n\n        if (typeof navigator !== \"undefined\") {\n          const userAgent = navigator.userAgent;\n          if (userAgent.includes(\"Chrome\")) {\n            info.name = \"Chrome\";\n            const match = userAgent.match(/Chrome\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          } else if (userAgent.includes(\"Firefox\")) {\n            info.name = \"Firefox\";\n            const match = userAgent.match(/Firefox\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          } else if (userAgent.includes(\"Safari\")) {\n            info.name = \"Safari\";\n            const match = userAgent.match(/Version\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          }\n        }\n\n        return info;\n      },\n    },\n    storage: {\n      local: {\n        get: function (keys, callback) {\n          if (typeof _storageGet !== \"function\")\n            throw new Error(\"_storageGet not defined\");\n\n          const promise = _storageGet(keys);\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.get callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.get error:\", error);\n                callback({});\n              });\n            return;\n          }\n\n          return promise;\n        },\n        set: function (items, callback) {\n          if (typeof _storageSet !== \"function\")\n            throw new Error(\"_storageSet not defined\");\n\n          const promise = _storageSet(items).then((result) => {\n            broadcastStorageChange(items, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.set callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.set error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        remove: function (keys, callback) {\n          if (typeof _storageRemove !== \"function\")\n            throw new Error(\"_storageRemove not defined\");\n\n          const promise = _storageRemove(keys).then((result) => {\n            const changes = {};\n            const keyList = Array.isArray(keys) ? keys : [keys];\n            keyList.forEach((key) => {\n              changes[key] = { oldValue: undefined, newValue: undefined };\n            });\n            broadcastStorageChange(changes, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.remove callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.remove error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        clear: function (callback) {\n          if (typeof _storageClear !== \"function\")\n            throw new Error(\"_storageClear not defined\");\n\n          const promise = _storageClear().then((result) => {\n            broadcastStorageChange({}, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.clear callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.clear error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        onChanged: {\n          addListener: (callback) => {\n            storageChangeListeners.add(callback);\n          },\n          removeListener: (callback) => {\n            storageChangeListeners.delete(callback);\n          },\n        },\n      },\n      sync: {\n        get: function (keys, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n          return chrome.storage.local.get(keys, callback);\n        },\n        set: function (items, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.set(items).then((result) => {\n            broadcastStorageChange(items, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.set callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.set error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        remove: function (keys, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.remove(keys).then((result) => {\n            const changes = {};\n            const keyList = Array.isArray(keys) ? keys : [keys];\n            keyList.forEach((key) => {\n              changes[key] = { oldValue: undefined, newValue: undefined };\n            });\n            broadcastStorageChange(changes, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.remove callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.remove error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        clear: function (callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.clear().then((result) => {\n            broadcastStorageChange({}, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.clear callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.clear error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        onChanged: {\n          addListener: (callback) => {\n            storageChangeListeners.add(callback);\n          },\n          removeListener: (callback) => {\n            storageChangeListeners.delete(callback);\n          },\n        },\n      },\n      onChanged: {\n        addListener: (callback) => {\n          storageChangeListeners.add(callback);\n        },\n        removeListener: (callback) => {\n          storageChangeListeners.delete(callback);\n        },\n      },\n      managed: {\n        get: function (keys, callback) {\n          _warn(\"chrome.storage.managed polyfill is read-only empty.\");\n\n          const promise = Promise.resolve({});\n\n          if (typeof callback === \"function\") {\n            promise.then((result) => {\n              try {\n                callback(result);\n              } catch (e) {\n                _error(\"Error in storage.managed.get callback:\", e);\n              }\n            });\n            return;\n          }\n\n          return promise;\n        },\n      },\n    },\n    cookies: (function () {\n      const cookieChangeListeners = new Set();\n      function broadcastCookieChange(changeInfo) {\n        cookieChangeListeners.forEach((listener) => {\n          try {\n            listener(changeInfo);\n          } catch (e) {\n            _error(\"Error in cookies.onChanged listener:\", e);\n          }\n        });\n      }\n\n      function handlePromiseCallback(promise, callback) {\n        if (typeof callback === \"function\") {\n          promise\n            .then((result) => callback(result))\n            .catch((error) => {\n              // chrome.runtime.lastError = { message: error.message }; // TODO: Implement lastError\n              _error(error);\n              callback(); // Call with undefined on error\n            });\n          return;\n        }\n        return promise;\n      }\n\n      return {\n        get: function (details, callback) {\n          if (typeof _cookieList !== \"function\") {\n            return handlePromiseCallback(\n              Promise.reject(new Error(\"_cookieList not defined\")),\n              callback,\n            );\n          }\n          const promise = _cookieList({\n            url: details.url,\n            name: details.name,\n            storeId: details.storeId,\n            partitionKey: details.partitionKey,\n          }).then((cookies) => {\n            if (!cookies || cookies.length === 0) {\n              return null;\n            }\n            // Sort by path length (longest first), then creation time (earliest first, if available)\n            cookies.sort((a, b) => {\n              const pathLenDiff = (b.path || \"\").length - (a.path || \"\").length;\n              if (pathLenDiff !== 0) return pathLenDiff;\n              return (a.creationTime || 0) - (b.creationTime || 0);\n            });\n            return cookies[0];\n          });\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getAll: function (details, callback) {\n          if (typeof _cookieList !== \"function\") {\n            return handlePromiseCallback(\n              Promise.reject(new Error(\"_cookieList not defined\")),\n              callback,\n            );\n          }\n          if (details.partitionKey) {\n            _warn(\n              \"cookies.getAll: partitionKey is not fully supported in this environment.\",\n            );\n          }\n          const promise = _cookieList(details);\n          return handlePromiseCallback(promise, callback);\n        },\n\n        set: function (details, callback) {\n          const promise = (async () => {\n            if (\n              typeof _cookieSet !== \"function\" ||\n              typeof _cookieList !== \"function\"\n            ) {\n              throw new Error(\"_cookieSet or _cookieList not defined\");\n            }\n            if (details.partitionKey) {\n              _warn(\n                \"cookies.set: partitionKey is not fully supported in this environment.\",\n              );\n            }\n\n            const getDetails = {\n              url: details.url,\n              name: details.name,\n              storeId: details.storeId,\n            };\n            const oldCookies = await _cookieList(getDetails);\n            const oldCookie = oldCookies && oldCookies[0];\n\n            if (oldCookie) {\n              broadcastCookieChange({\n                cause: \"overwrite\",\n                cookie: oldCookie,\n                removed: true,\n              });\n            }\n\n            await _cookieSet(details);\n            const newCookies = await _cookieList(getDetails);\n            const newCookie = newCookies && newCookies[0];\n\n            if (newCookie) {\n              broadcastCookieChange({\n                cause: \"explicit\",\n                cookie: newCookie,\n                removed: false,\n              });\n            }\n            return newCookie || null;\n          })();\n          return handlePromiseCallback(promise, callback);\n        },\n\n        remove: function (details, callback) {\n          const promise = (async () => {\n            if (\n              typeof _cookieDelete !== \"function\" ||\n              typeof _cookieList !== \"function\"\n            ) {\n              throw new Error(\"_cookieDelete or _cookieList not defined\");\n            }\n            const oldCookies = await _cookieList(details);\n            const oldCookie = oldCookies && oldCookies[0];\n\n            if (!oldCookie) return null; // Nothing to remove\n\n            await _cookieDelete(details);\n\n            broadcastCookieChange({\n              cause: \"explicit\",\n              cookie: oldCookie,\n              removed: true,\n            });\n\n            return {\n              url: details.url,\n              name: details.name,\n              storeId: details.storeId || \"0\",\n              partitionKey: details.partitionKey,\n            };\n          })();\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getAllCookieStores: function (callback) {\n          const promise = Promise.resolve([\n            { id: \"0\", tabIds: [1] }, // Mock store for the current context\n          ]);\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getPartitionKey: function (details, callback) {\n          _warn(\n            \"chrome.cookies.getPartitionKey is not supported in this environment.\",\n          );\n          const promise = Promise.resolve({ partitionKey: {} }); // Return empty partition key\n          return handlePromiseCallback(promise, callback);\n        },\n\n        onChanged: {\n          addListener: (callback) => {\n            if (typeof callback === \"function\") {\n              cookieChangeListeners.add(callback);\n            }\n          },\n          removeListener: (callback) => {\n            cookieChangeListeners.delete(callback);\n          },\n        },\n      };\n    })(),\n    tabs: {\n      query: async (queryInfo) => {\n        _warn(\"chrome.tabs.query polyfill only returns current tab info.\");\n        const dummyId = Math.floor(Math.random() * 1000) + 1;\n        return [\n          {\n            id: dummyId,\n            url: CURRENT_LOCATION,\n            active: true,\n            windowId: 1,\n            status: \"complete\",\n          },\n        ];\n      },\n      create: async ({ url, active = true }) => {\n        _log(`[Polyfill tabs.create] URL: ${url}`);\n        if (typeof _openTab !== \"function\")\n          throw new Error(\"_openTab not defined\");\n        _openTab(url, active);\n        const dummyId = Math.floor(Math.random() * 1000) + 1001;\n        return Promise.resolve({\n          id: dummyId,\n          url: url,\n          active,\n          windowId: 1,\n        });\n      },\n      sendMessage: async (tabId, message) => {\n        _warn(\n          `chrome.tabs.sendMessage polyfill (to tab ${tabId}) redirects to runtime.sendMessage (current context).`,\n        );\n        return chrome.runtime.sendMessage(message);\n      },\n      onActivated: createNoopListeners(),\n      onUpdated: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n      onReplaced: createNoopListeners(),\n      onCreated: createNoopListeners(),\n      onMoved: createNoopListeners(),\n      onDetached: createNoopListeners(),\n      onAttached: createNoopListeners(),\n    },\n    windows: {\n      onFocusChanged: createNoopListeners(),\n      onCreated: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n      onFocused: createNoopListeners(),\n      onFocus: createNoopListeners(),\n      onBlur: createNoopListeners(),\n      onFocused: createNoopListeners(),\n    },\n    notifications: {\n      create: async (notificationId, options) => {\n        try {\n          let id = notificationId;\n          let notificationOptions = options;\n\n          if (typeof notificationId === \"object\" && notificationId !== null) {\n            notificationOptions = notificationId;\n            id = \"notification_\" + Math.random().toString(36).substring(2, 15);\n          } else if (typeof notificationId === \"string\" && options) {\n            id = notificationId;\n            notificationOptions = options;\n          } else {\n            throw new Error(\"Invalid parameters for notifications.create\");\n          }\n\n          if (!notificationOptions || typeof notificationOptions !== \"object\") {\n            throw new Error(\"Notification options must be an object\");\n          }\n\n          const {\n            title,\n            message,\n            iconUrl,\n            type = \"basic\",\n          } = notificationOptions;\n\n          if (!title || !message) {\n            throw new Error(\"Notification must have title and message\");\n          }\n\n          if (\"Notification\" in window) {\n            if (Notification.permission === \"granted\") {\n              const notification = new Notification(title, {\n                body: message,\n                icon: iconUrl,\n                tag: id,\n              });\n\n              _log(`[Notifications] Created notification: ${id}`);\n              return id;\n            } else if (Notification.permission === \"default\") {\n              const permission = await Notification.requestPermission();\n              if (permission === \"granted\") {\n                const notification = new Notification(title, {\n                  body: message,\n                  icon: iconUrl,\n                  tag: id,\n                });\n                _log(\n                  `[Notifications] Created notification after permission: ${id}`,\n                );\n                return id;\n              } else {\n                _warn(\"[Notifications] Permission denied for notifications\");\n                return id;\n              }\n            } else {\n              _warn(\"[Notifications] Notifications are blocked\");\n              return id;\n            }\n          } else {\n            _warn(\n              \"[Notifications] Native notifications not supported, using console fallback\",\n            );\n            _log(`[Notification] ${title}: ${message}`);\n            return id;\n          }\n        } catch (error) {\n          _error(\"[Notifications] Error creating notification:\", error.message);\n          throw error;\n        }\n      },\n      clear: async (notificationId) => {\n        _log(`[Notifications] Clear notification: ${notificationId}`);\n        // For native notifications, there's no direct way to clear by ID\n        // This is a limitation of the Web Notifications API\n        return true;\n      },\n      getAll: async () => {\n        _warn(\"[Notifications] getAll not fully supported in polyfill\");\n        return {};\n      },\n      getPermissionLevel: async () => {\n        if (\"Notification\" in window) {\n          const permission = Notification.permission;\n          return { level: permission === \"granted\" ? \"granted\" : \"denied\" };\n        }\n        return { level: \"denied\" };\n      },\n    },\n    contextMenus: {\n      create: (createProperties, callback) => {\n        try {\n          if (!createProperties || typeof createProperties !== \"object\") {\n            throw new Error(\"Context menu create properties must be an object\");\n          }\n\n          const { id, title, contexts = [\"page\"], onclick } = createProperties;\n          const menuId =\n            id || `menu_${Math.random().toString(36).substring(2, 15)}`;\n\n          if (!title || typeof title !== \"string\") {\n            throw new Error(\"Context menu must have a title\");\n          }\n\n          // Store menu items for potential use\n          if (!window._polyfillContextMenus) {\n            window._polyfillContextMenus = new Map();\n          }\n\n          window._polyfillContextMenus.set(menuId, {\n            id: menuId,\n            title,\n            contexts,\n            onclick,\n            enabled: createProperties.enabled !== false,\n          });\n\n          _log(\n            `[ContextMenus] Created context menu item: ${title} (${menuId})`,\n          );\n\n          // Try to register a menu command as fallback\n          if (typeof _registerMenuCommand === \"function\") {\n            try {\n              _registerMenuCommand(\n                title,\n                onclick ||\n                  (() => {\n                    _log(`Context menu clicked: ${title}`);\n                  }),\n              );\n            } catch (e) {\n              _warn(\n                \"[ContextMenus] Failed to register as menu command:\",\n                e.message,\n              );\n            }\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n\n          return menuId;\n        } catch (error) {\n          _error(\"[ContextMenus] Error creating context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n          throw error;\n        }\n      },\n      update: (id, updateProperties, callback) => {\n        try {\n          if (\n            !window._polyfillContextMenus ||\n            !window._polyfillContextMenus.has(id)\n          ) {\n            throw new Error(`Context menu item not found: ${id}`);\n          }\n\n          const menuItem = window._polyfillContextMenus.get(id);\n          Object.assign(menuItem, updateProperties);\n\n          _log(`[ContextMenus] Updated context menu item: ${id}`);\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\"[ContextMenus] Error updating context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      remove: (menuItemId, callback) => {\n        try {\n          if (\n            window._polyfillContextMenus &&\n            window._polyfillContextMenus.has(menuItemId)\n          ) {\n            window._polyfillContextMenus.delete(menuItemId);\n            _log(`[ContextMenus] Removed context menu item: ${menuItemId}`);\n          } else {\n            _warn(\n              `[ContextMenus] Context menu item not found for removal: ${menuItemId}`,\n            );\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\"[ContextMenus] Error removing context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      removeAll: (callback) => {\n        try {\n          if (window._polyfillContextMenus) {\n            const count = window._polyfillContextMenus.size;\n            window._polyfillContextMenus.clear();\n            _log(`[ContextMenus] Removed all ${count} context menu items`);\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\n            \"[ContextMenus] Error removing all context menus:\",\n            error.message,\n          );\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      onClicked: {\n        addListener: (callback) => {\n          if (!window._polyfillContextMenuListeners) {\n            window._polyfillContextMenuListeners = new Set();\n          }\n          window._polyfillContextMenuListeners.add(callback);\n          _log(\"[ContextMenus] Added click listener\");\n        },\n        removeListener: (callback) => {\n          if (window._polyfillContextMenuListeners) {\n            window._polyfillContextMenuListeners.delete(callback);\n            _log(\"[ContextMenus] Removed click listener\");\n          }\n        },\n      },\n    },\n  };\n\n  const tc = (fn) => {\n    try {\n      fn();\n    } catch (e) {}\n  };\n  const loggingProxyHandler = (_key) => ({\n    get(target, key, receiver) {\n      tc(() => _log(`[${contextType}] [CHROME - ${_key}] Getting ${key}`));\n      return Reflect.get(target, key, receiver);\n    },\n    set(target, key, value, receiver) {\n      tc(() =>\n        _log(`[${contextType}] [CHROME - ${_key}] Setting ${key} to ${value}`),\n      );\n      return Reflect.set(target, key, value, receiver);\n    },\n    has(target, key) {\n      tc(() =>\n        _log(`[${contextType}] [CHROME - ${_key}] Checking if ${key} exists`),\n      );\n      return Reflect.has(target, key);\n    },\n  });\n  chrome = Object.fromEntries(\n    Object.entries(chrome).map(([key, value]) => [\n      key,\n      new Proxy(value, loggingProxyHandler(key)),\n    ]),\n  );\n\n  // Alias browser to chrome for common Firefox pattern\n  const browser = new Proxy(chrome, loggingProxyHandler);\n\n  const oldGlobalThis = globalThis;\n  const oldWindow = window;\n  const oldSelf = self;\n  const oldGlobal = globalThis;\n  const __globalsStorage = {};\n\n  const TO_MODIFY = [oldGlobalThis, oldWindow, oldSelf, oldGlobal];\n  const set = (k, v) => {\n    __globalsStorage[k] = v;\n    TO_MODIFY.forEach((target) => {\n      target[k] = v;\n    });\n  };\n  const proxyHandler = {\n    get(target, key, receiver) {\n      const fns = [\n        () => __globalsStorage[key],\n        () => Reflect.get(target, key, target),\n        () => target[key],\n      ];\n      const out = fns\n        .map((f) => {\n          try {\n            let out = f();\n            return out;\n          } catch (e) {\n            return undefined;\n          }\n        })\n        .find((f) => f !== undefined);\n      if (typeof out === \"function\") {\n        return out.bind(target);\n      }\n      return out;\n    },\n    set(target, key, value, receiver) {\n      try {\n        tc(() => _log(`[${contextType}] Setting ${key} to ${value}`));\n        set(key, value);\n        return Reflect.set(target, key, value, receiver);\n      } catch (e) {\n        _error(\"Error setting\", key, value, e);\n        try {\n          target[key] = value;\n          return true;\n        } catch (e) {\n          _error(\"Error setting\", key, value, e);\n        }\n        return false;\n      }\n    },\n    has(target, key) {\n      try {\n        return key in __globalsStorage || key in target;\n      } catch (e) {\n        _error(\"Error has\", key, e);\n        try {\n          return key in __globalsStorage || key in target;\n        } catch (e) {\n          _error(\"Error has\", key, e);\n        }\n        return false;\n      }\n    },\n    getOwnPropertyDescriptor(target, key) {\n      try {\n        if (key in __globalsStorage) {\n          return {\n            configurable: true,\n            enumerable: true,\n            writable: true,\n            value: __globalsStorage[key],\n          };\n        }\n        // fall back to the real globalThis\n        const desc = Reflect.getOwnPropertyDescriptor(target, key);\n        // ensure it's configurable so the with‑scope binding logic can override it\n        if (desc && !desc.configurable) {\n          desc.configurable = true;\n        }\n        return desc;\n      } catch (e) {\n        _error(\"Error getOwnPropertyDescriptor\", key, e);\n        return {\n          configurable: true,\n          enumerable: true,\n          writable: true,\n          value: undefined,\n        };\n      }\n    },\n\n    defineProperty(target, key, descriptor) {\n      try {\n        // Normalize descriptor to avoid mixed accessor & data attributes\n        const hasAccessor = \"get\" in descriptor || \"set\" in descriptor;\n\n        if (hasAccessor) {\n          // Build a clean descriptor without value/writable when accessors present\n          const normalized = {\n            configurable:\n              \"configurable\" in descriptor ? descriptor.configurable : true,\n            enumerable:\n              \"enumerable\" in descriptor ? descriptor.enumerable : false,\n          };\n          if (\"get\" in descriptor) normalized.get = descriptor.get;\n          if (\"set\" in descriptor) normalized.set = descriptor.set;\n\n          // Store accessor references for inspection but avoid breaking invariants\n          set(key, {\n            get: descriptor.get,\n            set: descriptor.set,\n          });\n\n          return Reflect.defineProperty(target, key, normalized);\n        }\n\n        // Data descriptor path\n        set(key, descriptor.value);\n        return Reflect.defineProperty(target, key, descriptor);\n      } catch (e) {\n        _error(\"Error defineProperty\", key, descriptor, e);\n        return false;\n      }\n    },\n  };\n\n  // Create proxies once proxyHandler is defined\n  const proxyWindow = new Proxy(oldWindow, proxyHandler);\n  const proxyGlobalThis = new Proxy(oldGlobalThis, proxyHandler);\n  const proxyGlobal = new Proxy(oldGlobal, proxyHandler);\n  const proxySelf = new Proxy(oldSelf, proxyHandler);\n\n  // Seed storage with core globals so lookups succeed inside `with` blocks\n  Object.assign(__globalsStorage, {\n    chrome,\n    browser,\n    window: proxyWindow,\n    globalThis: proxyGlobalThis,\n    global: proxyGlobal,\n    self: proxySelf,\n    document: oldWindow.document,\n  });\n\n  const __globals = {\n    chrome,\n    browser,\n    window: proxyWindow,\n    globalThis: proxyGlobalThis,\n    global: proxyGlobal,\n    self: proxySelf,\n    __globals: __globalsStorage,\n  };\n\n  __globals.contextId = contextId;\n  __globals.contextType = contextType;\n  __globals.module = undefined;\n  __globals.amd = undefined;\n  __globals.define = undefined;\n  __globals.importScripts = (...args) => {\n    _log(\"importScripts\", args);\n  };\n\n  return __globals;\n}\n\n\nif (typeof window !== 'undefined') {\n    window.buildPolyfill = buildPolyfill;\n}\n"
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