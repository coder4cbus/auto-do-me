// ==UserScript==
// @name        Riter: AI note taker for Google Meet and Microsoft Teams
// @version     1.18.4
// @description Meeting note taker and AI transcription for Google Meet and Microsoft Teams.
// @namespace   riter-ai-note-taker-for-google-meet-and-microsoft-teams
// @author      Converter Script
// @match       *://meet.google.com/*-*-*
// @match       *://teams.microsoft.com/*
// @match       *://teams.cloud.microsoft/*
// @match       *://teams.live.com/*
// @match       *://*/*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_registerMenuCommand
// @grant       GM_openInTab
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABERSURBVHgB7d29cRvXHsbhtcepGlADDJmwAaYO1IBSBWrAVShQikApGkDglIFTN8AG2IAK8J3DuauBIALEx+4S5/8+z4zG9zOxLe8P57zE/nZ7e/vfAABE+X0AAOIIAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACDQHwMAcd69e/f86+bm5vmP79+/f/719PQ0bDab5z9S22+3t7f/DQCUsv2AHx/uuw/8fdrD/9OnTyKgOCcAAB3a/tT+0q/235+r/f8/fvw4fPnyZaAuAQBwhXY/se/+8ZIH/DHu7u4GahMAAG9g36f28cj+rc0dGLw9AQAwsX0Du2Pu36+FAKhPAACc6JKBXS8EQH0CAGDH+BDf/QQ/xcCuJ+OPBVKTAADivPXArhf+PNQmAIByDv14XIXj+aUIgNoEANCVCgO7XvhzWZsAAK7Kvjv3cXDnU+ly/LmuTQAAi3ppMZ84sOuBvxa1CQBgUruf2Hcf+B4q/XAFUJsAAE5y6MfjPDCgHwIA+GF3YLf7Rw/4LP561yYAIIiBHacQALUJAChk38DO/TuwSwBARw69Qc4Dnqk5AahNAMAVMbDj2rS/F79//z5QjwCAhSS8QY56BEBdAgAmsu9Tuy+4oWfeCFiXAIAjeYMcifx9XZcAgP87NLBzPE8qAVCXACCCN8jBefzeqEsAUIKBHczDCUBdAoAujA9xb5CDZfm9VZcA4CoY2MF18nuvLgHAIg79eJzjebhefn/WJQC4mIEd1OUEoC4BwKsOvUHOAx5qEwB1CQD2vkHOwA7w+78uARBg9wttvEEOOIWvA65JABTgDXLAnHxIqEkAdOr+/n7466+/POCB2QmAmgRAh9rD/+vXrwPAEnzQqOn3ge58+PBhAFiKE4CaBAAABwmAmgRAh/79998BYCmuAGoSAB3abDbD9+/fBwA4lwDoUHv4OwUAluIEoCYB0Kn1ej0ALEEA1CQAOtVOAHwzFwDnEgAda1sAgLk5AahJAHTMNQCwFD8KWI8A6JgxILAUAVCPAOjcarUaAObmGqAeAdC5dgLgOwGAuTkBqEcAFGALAMxNANQjAAoQAMDcXAHUIwAKMAYE5uYEoB4BUIQxIDAnAVCPACjCGBCYkwCoRwAUYgsAzMUGoB4BUIgAAObiBKAeAVCIMSAwFwFQjwAoxikAMIcWACKgFgFQjDEgMBcBUIsAKKY9/J0CAHMQALUIgIIeHh4GgKn5SYBaBEBBj4+PxoDA5JwA1CIAinIKAExNANQiAIrabDbGgMCkBEAtAqCo9vBvEQAwFRuAWgRAYa4BANhHABTWhoDGgMBUnADUIgCKcwoATEUA1CIAijMGBOAlAqA4Y0BgKk4AahEAAVwDAFMRAXUIgADGgADsEgAhnAIAU3ACUIcACGEMCExBANQhAEK0h79rAABGAiDIer0eAC7hBKAOARCknQC0VwUDnMsLgeoQAGGMAYFLCIA6BEAY1wDAJVwB1CEAwhgDApdwAlCHAAi0Wq0GgHMIgDoEQKB2AuA7AYBzuAKoQwCEsgUAzuUUoAYBEEoAAOcSADUIgFDGgMC5BEANAiCYMSBwDjuAGgRAMGNA4BxOAGoQAOFsAYBTCYAaBEA4AQCcSgDUIADCGQMCp7IBqEEA4BQAOIkTgBoEAMaAwEkEQA0CgOeHv1MA4FiuAGoQADx7eHgYAI7hBKAGAcCzx8dHY0DgKAKgBgHAD04BgGO5BuifAOCHzWZjDAgQQgDwQ3v4twgAeI0TgP4JAH7iGgA4hgDonwDgJ20IaAwIUJ8A4BdOAYDXOAHonwDgF8aAwGv8KGD/BAC/MAYEXiMA+icAeJFrAOAQVwD9EwC8yBgQOMQJQP8EAHs5BQD2EQD9EwDsZQwI7OMKoH8CgL3aw981ALCPU4C+CQAOWq/XA8BLBEDfBAAHtROA9qpggF0CoG8CgFcZAwIvsQPomwDgVa4BgJc4AeibAOBVxoDASwRA3wQAR1mtVgPANgHQNwHAUdoJgO8EALbZAPRNAHA0WwBgmxOAvgkAjiYAgG0CoG8CgKMZAwLbXAH0TQBwEmNAYOQEoG8CgJMYAwIjAdA3AcDJbAGAkWuAfgkATiYAAPonADiZMSAwcgLQLwHAWZwCAI0A6JcA4CzGgAB9EwCcpT38nQIATgD6JQA428PDwwBkEwD9EgCc7fHx0RgQoFMCgIs4BYBsTgD6JQC4yGazMQaEYAKgXwKAi7SHf4sAAPoiALiYawDI5QSgXwKAi7UhoDEg5PJSoD4JACbhFAByCYA+CQAmYQwIuQRAnwQAkzAGhFx2AH0SAEzGNQBkcgLQJwHAZIwBIZMA6JMAYFJOASCPK4A+CQAmZQwIeZwA9EkAMKn28HcNAFkEQJ8EAJNbr9cDkMMVQJ8EAJNrJwDtVcFABicAfRIAzMIYEHIIgD4JAGbhGgByCIA+CQBmYQwIWewA+iMAmM1qtRqADE4B+iMAmE07AfCdAJBBAPRHADArWwDI4AqgPwKAWQkAyOAEoD8CgFkZA0IGAdAfAcDsjAGhPlcA/REAzM4YEOD6CAAWYQsAtTkB6I8AYBECAGp7enoa6IsAYBHtCsAWAGpqD3+/v/vz2+3t7X8DLOTDhw/D3d3dANTQHv7thM/Opz8CAAACuQIAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAINAfA127ubnxHm4I1t62CecQAJ1qD/6vX796AxeEa1/F++XLl+Hh4WGAU/gq4A61h/63b988/IFn7Xv4//zzT9/Hz0lsADrUPv17+AOjdg3YXrQFpxAAHXLnD+zyzwVOJQA65K4PgEsJgA61ez7LXwAuIQA6tVqtBgA4lwDoVDsBsPgF4FwCoGPr9XoAgHMIgI4JAADOJQA6ZgwIwLkEQOeMAQE4hwDonDEgAOcQAAXYAgBwKgFQgAAA4FQCoABjQABOJQCKMAYE4BQCoIh2AvD4+DgAwDEEQCHeEgjAsQRAIW0M6EcCATiGACjEGBCAYwmAYvxIIADHEADFGAMCcAwBUJAxIACvEQAFGQMC8BoBUJAxIACvEQBFGQMCcIgAKKqdADgFAGAfAVCYMSAA+wiAwjabjTEgAC8SAIW1h3+LAADYJQCKcw0AwEsEQHHGgAC8RAAEcAoAwC4BEMAYEIBdAiCAMSAAuwRACNcAAGwTACGMAQHYJgCCOAUAYCQAghgDAjASAEGMAQEYCYAwrgEAaARAGGNAABoBEMgpAAACIJAxIAACIJAxIAACIJRrAIBsAiCUMSBANgEQzCkAQC4BEMwYECCXAAhmDAiQSwCEcw0AkEkAhDMGBMgkABjW6/UAQBYBwPMJgDEgQBYBwPPD3ykAQBYBwDNjQIAsAoBnj4+PxoAAQQQAP7gGAMghAPjBGBAghwDgB2NAgBwCgJ8YAwJkEAD8xBgQIIMA4Ber1WoAoDYBwC+MAQHqEwC8yBgQoDYBwIsEAEBtAoAXtSsAY0CAugQAexkDAtQlANjLGBCgLgHAQbYAADUJAA4SAAA1CQAOMgYEqEkA8CpjQIB6BACvMgYEqEcAcBRbAIBaBABHEQAAtQgAjmIMCNetvcobTiEAOJoxIFynp6en4eHhYYBTCACOZgwI12U8mfv06dMAp/pjgBO0LcDnz58HYHnjA7/9akf+ruW4xG+3t7f/DXCkd+/eDf/8888AzK898NvR/viwd8/PlJwAcJLxE8jd3d0ATKvd5Y+f8Nuv9u9hLk4AOFl7+H/79m0ALrP9yb590rexYUlOADjZOAZs1wHA8bbv7o1qeWsCgLMYA8Jh7eG+/bBv/9oDn2viCoCzGAPCz8YH/jja88Dn2jkB4CzGgKSz0Kd3TgA4mzEgSSz0qcYJAGcbP/Xc3NwMUM349brjJ3wPfKoRAFyk/QNSAFDB9mDPQp8ErgC4SBsD/v33334kkK6Mg73t0Z4HPmmcAHCRcQx4f38/wLWy0IdfCQAu1r4TQABwTbZfmmOhDy8TAFzMGJC3Ni70x0/5BnvwOgHAJIwBWZKFPlzOCJBJGAMyJwt9mJ4TACZhDMhULPRhGQKAyRgDcg4vzYG3IQCYzPgPcO8H4JDthf744AeWJwCYVDuyFQBs89IcuE5GgEzKGBAvzYE+OAFgUu3T3mazGT5+/DiQYfuTffuk7/4e+iAAmFx7CAiAurbv7v1IHvRLADA5Y8A6LPShLgHALIwB+2ShDzmMAJmFMWAfLPQhlxMAZmEMeJ0s9IGRAGA2xoBvz0tzgH0EALMxBlyehT5wLAHArIwB52OhD1zCCJBZGQNOZ3zgj0f6HvjAJZwAMCtjwPNt/0iehT4wNQHA7IwBjzMu9MdP+QZ7wJwEALMzBnyZhT7wlgQAizAGHH4a7FnoA2/NCJBFpI0Bx8He9mjPAx+4Jk4AWET1MaCFPtAbAcBiKo0BLfSB3gkAFtPzGNBCH6hGALCoXsaAXpoDVGcEyKKudQy4/TrcFinu74HqnACwqGsZA3ppDpBOALC4pceAXpoD8CsBwOLmHgNuL/THBz8APxMAvIn1ej1ZALQH/vZX6vqRPIDXCQDexHjvfs4Y0EIf4HICgDfRHv7tFODz58+v/m8t9AGmJwB4My0A7u/vh5ubm5/+cwt9gPn5HgDeXNsCvH///vko30IfYBkCAAAC/T4AAHEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABDof5OJ8e76EuFHAAAAAElFTkSuQmCC
// @run-at      document-start
// ==/UserScript==

console.log("Script start:",performance.now());const e=!0,t=e=>e,o="passthrough";let s,c={createHTML:t,createScript:t,createScriptURL:t},i=!1;const r=()=>{try{void 0!==window.isSecureContext&&window.isSecureContext&&window.trustedTypes&&window.trustedTypes.createPolicy&&(i=!0,trustedTypes.defaultPolicy?(l("TT Default Policy exists"),c=window.trustedTypes.createPolicy("default",c),s=trustedTypes.defaultPolicy,l(`Created custom passthrough policy, in case the default policy is too restrictive: Use Policy '${o}' in var 'TTP':`,c)):s=c=window.trustedTypes.createPolicy("default",c),l("Trusted-Type Policies: TTP:",c,"TTP_default:",s))}catch(e){l(e)}},l=(...e)=>{console.log(...e)};r();

(function() {
    // #region Logging
	
	  const SCRIPT_NAME = "Riter: AI note taker for Google Meet and Microsoft Teams";
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
			
			
			const EXTENSION_ASSETS_MAP = {};
			
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
		      "riter-ai-note-taker-for-google-meet-and-microsoft-teams",
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
	  const scriptName = "Riter: AI note taker for Google Meet and Microsoft Teams";
	  const debug = "[Riter: AI note taker for Google Meet and Microsoft Teams]";
	  _log(debug + ' Executing background scripts...');
	
	  function executeBackgroundScripts(){
	    with(backgroundPolyfill){
	      // BG: src/background.js
	import{B as e,M as t,m as n,A as s,H as i,P as o,a as r,b as a,c,U as l,C as h,t as g,d,g as u,e as p,f as _,T as m,h as f,O as w,i as y,S as b,j as C,k as v,E as S}from"./ui/side-panel/assets/chat-settings-fw-Zkat3.js";class I extends e{getContext(){return"background"}initialize(){chrome.runtime.onMessage.addListener(e=>{e.target!==t.Background&&e.target||this.handleIncomingMessage(e),e.target!==t.Page&&e.target!==t.Content||this.sendMessage(e)})}async sendMessage(e){if(e.target!==t.SidePanel){if(e.target===t.Content||e.target===t.Page){const t=await chrome.tabs.query({active:!0,currentWindow:!0});t[0]?.id&&await chrome.tabs.sendMessage(t[0].id,e)}}else await chrome.runtime.sendMessage(e)}}let k=null;class T{constructor(e,t,n,s){this._participantRegistry=e,this.dispatcher=t,this.getApiClient=n,this.mode=s}_participantRegistry;dispatcher;getApiClient;mode;messageHistory=new Map;get participantRegistry(){return this._participantRegistry}async startTranscription(e,t,o,r){const a=this.getApiClient();if(!a)return console.error("[TranscriptManager] API client not initialized"),null;try{const s=await a.startTranscription({meetId:e,platform:t,title:o,mode:n(this.mode),historyEnabled:r});return s.meetingId?(this.messageHistory.clear(),s.meetingId):(console.error("[TranscriptManager] Invalid meeting ID received from startTranscription"),null)}catch(c){if(c instanceof s)throw c;if(c instanceof i)throw c;return console.error("[TranscriptManager] Failed to start transcription:",c),null}}updateParticipants(e){this._participantRegistry.update(e)}async processTranscript(e,t,n){if(!e||0===e.messageId)return;const s=`${e.messageId}_${e.participantId}`;let i=this.messageHistory.get(s);if(i){if(e.messageVersion<=i.messageVersion)return void console.warn(`[TranscriptManager] Outdated transcript message version received. messageId=${e.messageId}, participantId=${e.participantId}, receivedVersion=${e.messageVersion}, existingVersion=${i.messageVersion}`);i.messageVersion=e.messageVersion,i.text=e.text,i.isFinal=e.isFinal}else i={messageId:e.messageId,messageVersion:e.messageVersion,blockId:crypto.randomUUID(),clientTimestamp:Date.now(),participantId:e.participantId,fullName:e.participantName||"Unknown Participant",text:e.text,isFinal:e.isFinal},this.messageHistory.set(s,i);const o=await this.dispatcher.dispatch(i,e,t,n);e.isFinal&&o&&this.messageHistory.delete(s)}clear(){this.messageHistory.clear(),this._participantRegistry.clear()}async closeMeeting(e,t){const n=this.getApiClient();if(!n)throw new Error("[TranscriptManager] Cannot close meeting - API client not set");const s=Array.from(this.messageHistory.values());await this.dispatcher.flushPending(s,e,t);const i=await n.closeMeeting({meetId:e,meetingId:t});this.dispatcher.onMeetingClosed(i)}}class M{constructor(e,t){this.hubClient=e,this.participantRegistry=t,this.readyPromise=this.restoreSession()}hubClient;participantRegistry;_meetId;_currentUrl;_meetingId;_platform;_isHost;_historyEnabled;readyPromise;get meetingId(){return this._meetingId}get meetId(){return this._meetId}get platform(){return this._platform?.toString()||o.GoogleMeet}get isHost(){return!0===this._isHost}get historyEnabled(){return!1!==this._historyEnabled}setMeetingId(e,t){this._meetingId=e,t&&(this._isHost=t.isHost,this._historyEnabled=t.historyEnabled),this.updateCurrentSession()}setHistoryEnabled(e){this._historyEnabled=e,this.updateCurrentSession()}async startMeeting(e){try{const t=r.getMeetingInfo(e);return t?.isValid?(this._meetId=t.meetId,this._platform=t.platform,this._currentUrl=e,await this.saveSession(),{meetId:this._meetId,platform:t.platform,isValid:t.isValid}):null}catch(t){return console.error("[MeetingManager] Failed to start meeting:",t),null}}async ready(){return this.readyPromise}async endCurrentMeeting(){this._meetingId=void 0,this._isHost=void 0,this._historyEnabled=void 0,this.participantRegistry.clear(),await a.clear()}endSession(){this._meetId=void 0,this._meetingId=void 0,this.endCurrentMeeting()}persistParticipants(){this.updateCurrentSession()}async notifyUserJoined(e){if(this._meetId)try{await this.hubClient.sendMessage(c.UserJoinedInMeeting,{type:c.UserJoinedInMeeting,meetId:this._meetId,user:e,platform:this._platform||o.GoogleMeet})}catch(t){throw console.error("[MeetingManager] Failed to send user joined notification:",t),t}else console.warn("[MeetingManager] Cannot notify user joined - not in meeting")}async notifyGuestsJoined(e){if(this._meetId&&this.hubClient.isConnected())try{await this.hubClient.sendMessage(c.GuestsJoinedInMeeting,{meetId:this._meetId,guests:e.map(e=>({id:e.id,fullName:e.fullName,pictureUrl:e.pictureUrl}))})}catch(t){throw console.error("[MeetingManager] Failed to send guests joined notification:",t),t}else console.warn("[MeetingManager] Cannot notify guests joined - not in meeting or not connected")}async restoreSession(){try{const e=await a.load();e&&(this._meetId=e.meetId,this._meetingId=e.meetingId,this._currentUrl=e.url,this._platform=e.platform,this._isHost=e.isHost,this._historyEnabled=e.historyEnabled,this.participantRegistry.update(e.participants))}catch(e){console.error("[MeetingManager] Failed to restore session:",e)}}async saveSession(){if(this._meetId&&this._currentUrl&&this._platform)try{const e={meetId:this._meetId,meetingId:this._meetingId,url:this._currentUrl,platform:this._platform,participants:this.participantRegistry.getAll(),startedAt:Date.now(),lastUpdatedAt:Date.now(),isHost:this._isHost,historyEnabled:this._historyEnabled};await a.save(e)}catch(e){console.error("[MeetingManager] Failed to save session:",e)}}async updateCurrentSession(){if(this._meetId&&this._currentUrl&&this._platform)try{const e=await a.load(),t={meetId:this._meetId,meetingId:this._meetingId,url:this._currentUrl,platform:this._platform,participants:this.participantRegistry.getAll(),startedAt:e?.startedAt||Date.now(),lastUpdatedAt:Date.now(),isHost:this._isHost,historyEnabled:this._historyEnabled};await a.save(t)}catch(e){console.error("[MeetingManager] Failed to update session:",e)}}}class E{participants=new Map;update(e){e.forEach(e=>{if(!e.fullName)return;const t=this.participants.get(e.id);if(t)e.pictureUrl&&!t.pictureUrl&&this.participants.set(e.id,{...t,pictureUrl:e.pictureUrl});else{if(e.pictureUrl)for(const[t,n]of this.participants)if(n.fullName===e.fullName&&!n.pictureUrl){this.participants.set(t,{...n,pictureUrl:e.pictureUrl});break}this.participants.set(e.id,e)}})}get(e){return this.participants.get(e)}getAll(){return Array.from(this.participants.values())}clear(){this.participants.clear()}dump(){const e={};return this.participants.forEach((t,n)=>{e[n]=t.fullName}),e}}class P{constructor(e,t){this.hubClient=e,this.participantRegistry=t}hubClient;participantRegistry;sendToHub(e,t,n,s="interim",i){const o=this.participantRegistry.get(t.participantId);o||t.participantName||console.warn(`[${this.constructor.name}] Participant not found for participantId=${t.participantId}`,"Registry contents:",this.participantRegistry.dump());const r={type:"Entry",meetId:n,blockId:e,participant:{fullName:o?.fullName||t.participantName||"Unknown Participant",pictureUrl:o?.pictureUrl??""},content:t.text,entryType:"Transcription",status:s,messageId:t.messageId,messageVersion:t.messageVersion,clientTimestamp:i};this.hubClient.sendMessage(c.Entry,r)}}class R extends P{constructor(e,t){super(e,t)}async dispatch(e,t,n,s){return this.sendToHub(e.blockId,t,n,t.isFinal?"stored":"interim",e.clientTimestamp),!0}async flushPending(e,t,n){return!0}onMeetingClosed(e){}}class H extends P{constructor(e,t,n){super(t,n),this.getApiClient=e}getApiClient;async dispatch(e,t,n,s){if(!s||!n){const i=await a.load();n||(console.warn("[PersonalTranscriptDispatcher] Meet ID not available in dispatch, attempting to load from storage",e,t,n,s),n=i?.meetId||n),s||(console.warn("[PersonalTranscriptDispatcher] Meeting ID not available in dispatch, attempting to load from storage",e,t,n,s),s=i?.meetingId)}if(super.sendToHub(e.blockId,t,n,t.isFinal?"final":"interim",e.clientTimestamp),t.isFinal&&s&&n&&""!==e.text.trim()){const o=this.getApiClient();if(!o)return!1;const r=this.participantRegistry.get(e.participantId);try{const i=await o.batchFlushTranscript(s,n,[{blockId:e.blockId,participantId:e.participantId,participantName:r?.fullName||t.participantName||"Unknown Participant",content:e.text,messageId:e.messageId??0,messageVersion:e.messageVersion??0,clientTimestamp:e.clientTimestamp}]);return!!i?.entryIds?.length&&(super.sendToHub(e.blockId,t,n,"stored",e.clientTimestamp),!0)}catch(i){console.error("[PersonalTranscriptDispatcher] Failed to flush transcript to backend:",i);const o=await a.load();return await l.save(o?.meetingId??s,o?.meetId??n,[{blockId:e.blockId,participantId:e.participantId,participantName:r?.fullName||t.participantName||"Unknown Participant",content:e.text,messageId:e.messageId??0,messageVersion:e.messageVersion??0,clientTimestamp:e.clientTimestamp}],{title:o?.url,platform:o?.platform}),!1}}return!(!t.isFinal||""!==e.text.trim())}async flushPending(e,t,n){if(0===e.length)return!0;console.info(`[PersonalTranscriptDispatcher] Flushing ${e.length} pending transcripts before closing`);const s=this.getApiClient();if(!s)return console.warn("[PersonalTranscriptDispatcher] API client not available for batch flush"),!1;const i=e.map(e=>{const t=this.participantRegistry.get(e.participantId);return{blockId:e.blockId,participantId:e.participantId,participantName:t?.fullName||e.fullName||"Unknown Participant",content:e.text,messageId:e.messageId??0,messageVersion:e.messageVersion??0,clientTimestamp:e.clientTimestamp}});try{return await s.batchFlushTranscript(n,t,i),!0}catch(o){console.error("[PersonalTranscriptDispatcher] Failed to batch flush pending transcripts:",o);const e=await a.load();return await l.save(n,t,i,{title:e?.url,platform:e?.platform}),!1}}onMeetingClosed(e){this.hubClient.sendMessage(e.type,e)}}class $ extends Error{constructor(e,t){const n=new.target.prototype;super(`${e}: Status code '${t}'`),this.statusCode=t,this.__proto__=n}}class A extends Error{constructor(e="A timeout occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class D extends Error{constructor(e="An abort occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class U extends Error{constructor(e,t){const n=new.target.prototype;super(e),this.transport=t,this.errorType="UnsupportedTransportError",this.__proto__=n}}class N extends Error{constructor(e,t){const n=new.target.prototype;super(e),this.transport=t,this.errorType="DisabledTransportError",this.__proto__=n}}class x extends Error{constructor(e,t){const n=new.target.prototype;super(e),this.transport=t,this.errorType="FailedToStartTransportError",this.__proto__=n}}class F extends Error{constructor(e){const t=new.target.prototype;super(e),this.errorType="FailedToNegotiateWithServerError",this.__proto__=t}}class q extends Error{constructor(e,t){const n=new.target.prototype;super(e),this.innerErrors=t,this.__proto__=n}}class L{constructor(e,t,n){this.statusCode=e,this.statusText=t,this.content=n}}class j{get(e,t){return this.send({...t,method:"GET",url:e})}post(e,t){return this.send({...t,method:"POST",url:e})}delete(e,t){return this.send({...t,method:"DELETE",url:e})}getCookieString(e){return""}}var W,B,O,z,V,J;(B=W||(W={}))[B.Trace=0]="Trace",B[B.Debug=1]="Debug",B[B.Information=2]="Information",B[B.Warning=3]="Warning",B[B.Error=4]="Error",B[B.Critical=5]="Critical",B[B.None=6]="None";class G{constructor(){}log(e,t){}}G.instance=new G;class K{static isRequired(e,t){if(null==e)throw new Error(`The '${t}' argument is required.`)}static isNotEmpty(e,t){if(!e||e.match(/^\s*$/))throw new Error(`The '${t}' argument should not be empty.`)}static isIn(e,t,n){if(!(e in t))throw new Error(`Unknown ${n} value: ${e}.`)}}class X{static get isBrowser(){return!X.isNode&&"object"==typeof window&&"object"==typeof window.document}static get isWebWorker(){return!X.isNode&&"object"==typeof self&&"importScripts"in self}static get isReactNative(){return!X.isNode&&"object"==typeof window&&void 0===window.document}static get isNode(){return"undefined"!=typeof process&&process.release&&"node"===process.release.name}}function Q(e,t){let n="";return Y(e)?(n=`Binary data of length ${e.byteLength}`,t&&(n+=`. Content: '${function(e){const t=new Uint8Array(e);let n="";return t.forEach(e=>{n+=`0x${e<16?"0":""}${e.toString(16)} `}),n.substr(0,n.length-1)}(e)}'`)):"string"==typeof e&&(n=`String data of length ${e.length}`,t&&(n+=`. Content: '${e}'`)),n}function Y(e){return e&&"undefined"!=typeof ArrayBuffer&&(e instanceof ArrayBuffer||e.constructor&&"ArrayBuffer"===e.constructor.name)}async function Z(e,t,n,s,i,o){const r={},[a,c]=ne();r[a]=c,e.log(W.Trace,`(${t} transport) sending data. ${Q(i,o.logMessageContent)}.`);const l=Y(i)?"arraybuffer":"text",h=await n.post(s,{content:i,headers:{...r,...o.headers},responseType:l,timeout:o.timeout,withCredentials:o.withCredentials});e.log(W.Trace,`(${t} transport) request complete. Response status: ${h.statusCode}.`)}class ee{constructor(e,t){this._subject=e,this._observer=t}dispose(){const e=this._subject.observers.indexOf(this._observer);e>-1&&this._subject.observers.splice(e,1),0===this._subject.observers.length&&this._subject.cancelCallback&&this._subject.cancelCallback().catch(e=>{})}}class te{constructor(e){this._minLevel=e,this.out=console}log(e,t){if(e>=this._minLevel){const n=`[${(new Date).toISOString()}] ${W[e]}: ${t}`;switch(e){case W.Critical:case W.Error:this.out.error(n);break;case W.Warning:this.out.warn(n);break;case W.Information:this.out.info(n);break;default:this.out.log(n)}}}}function ne(){let e="X-SignalR-User-Agent";return X.isNode&&(e="User-Agent"),[e,se("8.0.17",ie(),X.isNode?"NodeJS":"Browser",oe())]}function se(e,t,n,s){let i="Microsoft SignalR/";const o=e.split(".");return i+=`${o[0]}.${o[1]}`,i+=` (${e}; `,i+=t&&""!==t?`${t}; `:"Unknown OS; ",i+=`${n}`,i+=s?`; ${s}`:"; Unknown Runtime Version",i+=")",i}function ie(){if(!X.isNode)return"";switch(process.platform){case"win32":return"Windows NT";case"darwin":return"macOS";case"linux":return"Linux";default:return process.platform}}function oe(){if(X.isNode)return process.versions.node}function re(e){return e.stack?e.stack:e.message?e.message:`${e}`}class ae extends j{constructor(e){if(super(),this._logger=e,"undefined"==typeof fetch||X.isNode){const e="function"==typeof __webpack_require__?__non_webpack_require__:require;this._jar=new(e("tough-cookie").CookieJar),"undefined"==typeof fetch?this._fetchType=e("node-fetch"):this._fetchType=fetch,this._fetchType=e("fetch-cookie")(this._fetchType,this._jar)}else this._fetchType=fetch.bind(function(){if("undefined"!=typeof globalThis)return globalThis;if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("could not find global")}());if("undefined"==typeof AbortController){const e="function"==typeof __webpack_require__?__non_webpack_require__:require;this._abortControllerType=e("abort-controller")}else this._abortControllerType=AbortController}async send(e){if(e.abortSignal&&e.abortSignal.aborted)throw new D;if(!e.method)throw new Error("No method defined.");if(!e.url)throw new Error("No url defined.");const t=new this._abortControllerType;let n;e.abortSignal&&(e.abortSignal.onabort=()=>{t.abort(),n=new D});let s,i=null;if(e.timeout){const s=e.timeout;i=setTimeout(()=>{t.abort(),this._logger.log(W.Warning,"Timeout from HTTP request."),n=new A},s)}""===e.content&&(e.content=void 0),e.content&&(e.headers=e.headers||{},Y(e.content)?e.headers["Content-Type"]="application/octet-stream":e.headers["Content-Type"]="text/plain;charset=UTF-8");try{s=await this._fetchType(e.url,{body:e.content,cache:"no-cache",credentials:!0===e.withCredentials?"include":"same-origin",headers:{"X-Requested-With":"XMLHttpRequest",...e.headers},method:e.method,mode:"cors",redirect:"follow",signal:t.signal})}catch(a){if(n)throw n;throw this._logger.log(W.Warning,`Error from HTTP request. ${a}.`),a}finally{i&&clearTimeout(i),e.abortSignal&&(e.abortSignal.onabort=null)}if(!s.ok){const e=await ce(s,"text");throw new $(e||s.statusText,s.status)}const o=ce(s,e.responseType),r=await o;return new L(s.status,s.statusText,r)}getCookieString(e){let t="";return X.isNode&&this._jar&&this._jar.getCookies(e,(e,n)=>t=n.join("; ")),t}}function ce(e,t){let n;switch(t){case"arraybuffer":n=e.arrayBuffer();break;case"text":default:n=e.text();break;case"blob":case"document":case"json":throw new Error(`${t} is not supported.`)}return n}class le extends j{constructor(e){super(),this._logger=e}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new D):e.method?e.url?new Promise((t,n)=>{const s=new XMLHttpRequest;s.open(e.method,e.url,!0),s.withCredentials=void 0===e.withCredentials||e.withCredentials,s.setRequestHeader("X-Requested-With","XMLHttpRequest"),""===e.content&&(e.content=void 0),e.content&&(Y(e.content)?s.setRequestHeader("Content-Type","application/octet-stream"):s.setRequestHeader("Content-Type","text/plain;charset=UTF-8"));const i=e.headers;i&&Object.keys(i).forEach(e=>{s.setRequestHeader(e,i[e])}),e.responseType&&(s.responseType=e.responseType),e.abortSignal&&(e.abortSignal.onabort=()=>{s.abort(),n(new D)}),e.timeout&&(s.timeout=e.timeout),s.onload=()=>{e.abortSignal&&(e.abortSignal.onabort=null),s.status>=200&&s.status<300?t(new L(s.status,s.statusText,s.response||s.responseText)):n(new $(s.response||s.responseText||s.statusText,s.status))},s.onerror=()=>{this._logger.log(W.Warning,`Error from HTTP request. ${s.status}: ${s.statusText}.`),n(new $(s.statusText,s.status))},s.ontimeout=()=>{this._logger.log(W.Warning,"Timeout from HTTP request."),n(new A)},s.send(e.content)}):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}}class he extends j{constructor(e){if(super(),"undefined"!=typeof fetch||X.isNode)this._httpClient=new ae(e);else{if("undefined"==typeof XMLHttpRequest)throw new Error("No usable HttpClient found.");this._httpClient=new le(e)}}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new D):e.method?e.url?this._httpClient.send(e):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}getCookieString(e){return this._httpClient.getCookieString(e)}}class ge{static write(e){return`${e}${ge.RecordSeparator}`}static parse(e){if(e[e.length-1]!==ge.RecordSeparator)throw new Error("Message is incomplete.");const t=e.split(ge.RecordSeparator);return t.pop(),t}}ge.RecordSeparatorCode=30,ge.RecordSeparator=String.fromCharCode(ge.RecordSeparatorCode);class de{writeHandshakeRequest(e){return ge.write(JSON.stringify(e))}parseHandshakeResponse(e){let t,n;if(Y(e)){const s=new Uint8Array(e),i=s.indexOf(ge.RecordSeparatorCode);if(-1===i)throw new Error("Message is incomplete.");const o=i+1;t=String.fromCharCode.apply(null,Array.prototype.slice.call(s.slice(0,o))),n=s.byteLength>o?s.slice(o).buffer:null}else{const s=e,i=s.indexOf(ge.RecordSeparator);if(-1===i)throw new Error("Message is incomplete.");const o=i+1;t=s.substring(0,o),n=s.length>o?s.substring(o):null}const s=ge.parse(t),i=JSON.parse(s[0]);if(i.type)throw new Error("Expected a handshake response from the server.");return[n,i]}}(z=O||(O={}))[z.Invocation=1]="Invocation",z[z.StreamItem=2]="StreamItem",z[z.Completion=3]="Completion",z[z.StreamInvocation=4]="StreamInvocation",z[z.CancelInvocation=5]="CancelInvocation",z[z.Ping=6]="Ping",z[z.Close=7]="Close",z[z.Ack=8]="Ack",z[z.Sequence=9]="Sequence";class ue{constructor(){this.observers=[]}next(e){for(const t of this.observers)t.next(e)}error(e){for(const t of this.observers)t.error&&t.error(e)}complete(){for(const e of this.observers)e.complete&&e.complete()}subscribe(e){return this.observers.push(e),new ee(this,e)}}class pe{constructor(e,t,n){this._bufferSize=1e5,this._messages=[],this._totalMessageCount=0,this._waitForSequenceMessage=!1,this._nextReceivingSequenceId=1,this._latestReceivedSequenceId=0,this._bufferedByteCount=0,this._reconnectInProgress=!1,this._protocol=e,this._connection=t,this._bufferSize=n}async _send(e){const t=this._protocol.writeMessage(e);let n=Promise.resolve();if(this._isInvocationMessage(e)){this._totalMessageCount++;let e=()=>{},s=()=>{};Y(t)?this._bufferedByteCount+=t.byteLength:this._bufferedByteCount+=t.length,this._bufferedByteCount>=this._bufferSize&&(n=new Promise((t,n)=>{e=t,s=n})),this._messages.push(new _e(t,this._totalMessageCount,e,s))}try{this._reconnectInProgress||await this._connection.send(t)}catch{this._disconnected()}await n}_ack(e){let t=-1;for(let n=0;n<this._messages.length;n++){const s=this._messages[n];if(s._id<=e.sequenceId)t=n,Y(s._message)?this._bufferedByteCount-=s._message.byteLength:this._bufferedByteCount-=s._message.length,s._resolver();else{if(!(this._bufferedByteCount<this._bufferSize))break;s._resolver()}}-1!==t&&(this._messages=this._messages.slice(t+1))}_shouldProcessMessage(e){if(this._waitForSequenceMessage)return e.type===O.Sequence&&(this._waitForSequenceMessage=!1,!0);if(!this._isInvocationMessage(e))return!0;const t=this._nextReceivingSequenceId;return this._nextReceivingSequenceId++,t<=this._latestReceivedSequenceId?(t===this._latestReceivedSequenceId&&this._ackTimer(),!1):(this._latestReceivedSequenceId=t,this._ackTimer(),!0)}_resetSequence(e){e.sequenceId>this._nextReceivingSequenceId?this._connection.stop(new Error("Sequence ID greater than amount of messages we've received.")):this._nextReceivingSequenceId=e.sequenceId}_disconnected(){this._reconnectInProgress=!0,this._waitForSequenceMessage=!0}async _resend(){const e=0!==this._messages.length?this._messages[0]._id:this._totalMessageCount+1;await this._connection.send(this._protocol.writeMessage({type:O.Sequence,sequenceId:e}));const t=this._messages;for(const n of t)await this._connection.send(n._message);this._reconnectInProgress=!1}_dispose(e){null!=e||(e=new Error("Unable to reconnect to server."));for(const t of this._messages)t._rejector(e)}_isInvocationMessage(e){switch(e.type){case O.Invocation:case O.StreamItem:case O.Completion:case O.StreamInvocation:case O.CancelInvocation:return!0;case O.Close:case O.Sequence:case O.Ping:case O.Ack:return!1}}_ackTimer(){void 0===this._ackTimerHandle&&(this._ackTimerHandle=setTimeout(async()=>{try{this._reconnectInProgress||await this._connection.send(this._protocol.writeMessage({type:O.Ack,sequenceId:this._latestReceivedSequenceId}))}catch{}clearTimeout(this._ackTimerHandle),this._ackTimerHandle=void 0},1e3))}}class _e{constructor(e,t,n,s){this._message=e,this._id=t,this._resolver=n,this._rejector=s}}(J=V||(V={})).Disconnected="Disconnected",J.Connecting="Connecting",J.Connected="Connected",J.Disconnecting="Disconnecting",J.Reconnecting="Reconnecting";class me{static create(e,t,n,s,i,o,r){return new me(e,t,n,s,i,o,r)}constructor(e,t,n,s,i,o,r){this._nextKeepAlive=0,this._freezeEventListener=()=>{this._logger.log(W.Warning,"The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep")},K.isRequired(e,"connection"),K.isRequired(t,"logger"),K.isRequired(n,"protocol"),this.serverTimeoutInMilliseconds=null!=i?i:3e4,this.keepAliveIntervalInMilliseconds=null!=o?o:15e3,this._statefulReconnectBufferSize=null!=r?r:1e5,this._logger=t,this._protocol=n,this.connection=e,this._reconnectPolicy=s,this._handshakeProtocol=new de,this.connection.onreceive=e=>this._processIncomingData(e),this.connection.onclose=e=>this._connectionClosed(e),this._callbacks={},this._methods={},this._closedCallbacks=[],this._reconnectingCallbacks=[],this._reconnectedCallbacks=[],this._invocationId=0,this._receivedHandshakeResponse=!1,this._connectionState=V.Disconnected,this._connectionStarted=!1,this._cachedPingMessage=this._protocol.writeMessage({type:O.Ping})}get state(){return this._connectionState}get connectionId(){return this.connection&&this.connection.connectionId||null}get baseUrl(){return this.connection.baseUrl||""}set baseUrl(e){if(this._connectionState!==V.Disconnected&&this._connectionState!==V.Reconnecting)throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");if(!e)throw new Error("The HubConnection url must be a valid url.");this.connection.baseUrl=e}start(){return this._startPromise=this._startWithStateTransitions(),this._startPromise}async _startWithStateTransitions(){if(this._connectionState!==V.Disconnected)return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));this._connectionState=V.Connecting,this._logger.log(W.Debug,"Starting HubConnection.");try{await this._startInternal(),X.isBrowser&&window.document.addEventListener("freeze",this._freezeEventListener),this._connectionState=V.Connected,this._connectionStarted=!0,this._logger.log(W.Debug,"HubConnection connected successfully.")}catch(e){return this._connectionState=V.Disconnected,this._logger.log(W.Debug,`HubConnection failed to start successfully because of error '${e}'.`),Promise.reject(e)}}async _startInternal(){this._stopDuringStartError=void 0,this._receivedHandshakeResponse=!1;const e=new Promise((e,t)=>{this._handshakeResolver=e,this._handshakeRejecter=t});await this.connection.start(this._protocol.transferFormat);try{let t=this._protocol.version;this.connection.features.reconnect||(t=1);const n={protocol:this._protocol.name,version:t};if(this._logger.log(W.Debug,"Sending handshake request."),await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(n)),this._logger.log(W.Information,`Using HubProtocol '${this._protocol.name}'.`),this._cleanupTimeout(),this._resetTimeoutPeriod(),this._resetKeepAliveInterval(),await e,this._stopDuringStartError)throw this._stopDuringStartError;!!this.connection.features.reconnect&&(this._messageBuffer=new pe(this._protocol,this.connection,this._statefulReconnectBufferSize),this.connection.features.disconnected=this._messageBuffer._disconnected.bind(this._messageBuffer),this.connection.features.resend=()=>{if(this._messageBuffer)return this._messageBuffer._resend()}),this.connection.features.inherentKeepAlive||await this._sendMessage(this._cachedPingMessage)}catch(t){throw this._logger.log(W.Debug,`Hub handshake failed with error '${t}' during start(). Stopping HubConnection.`),this._cleanupTimeout(),this._cleanupPingTimer(),await this.connection.stop(t),t}}async stop(){const e=this._startPromise;this.connection.features.reconnect=!1,this._stopPromise=this._stopInternal(),await this._stopPromise;try{await e}catch(t){}}_stopInternal(e){if(this._connectionState===V.Disconnected)return this._logger.log(W.Debug,`Call to HubConnection.stop(${e}) ignored because it is already in the disconnected state.`),Promise.resolve();if(this._connectionState===V.Disconnecting)return this._logger.log(W.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;const t=this._connectionState;return this._connectionState=V.Disconnecting,this._logger.log(W.Debug,"Stopping HubConnection."),this._reconnectDelayHandle?(this._logger.log(W.Debug,"Connection stopped during reconnect delay. Done reconnecting."),clearTimeout(this._reconnectDelayHandle),this._reconnectDelayHandle=void 0,this._completeClose(),Promise.resolve()):(t===V.Connected&&this._sendCloseMessage(),this._cleanupTimeout(),this._cleanupPingTimer(),this._stopDuringStartError=e||new D("The connection was stopped before the hub handshake could complete."),this.connection.stop(e))}async _sendCloseMessage(){try{await this._sendWithProtocol(this._createCloseMessage())}catch{}}stream(e,...t){const[n,s]=this._replaceStreamingParams(t),i=this._createStreamInvocation(e,t,s);let o;const r=new ue;return r.cancelCallback=()=>{const e=this._createCancelInvocation(i.invocationId);return delete this._callbacks[i.invocationId],o.then(()=>this._sendWithProtocol(e))},this._callbacks[i.invocationId]=(e,t)=>{t?r.error(t):e&&(e.type===O.Completion?e.error?r.error(new Error(e.error)):r.complete():r.next(e.item))},o=this._sendWithProtocol(i).catch(e=>{r.error(e),delete this._callbacks[i.invocationId]}),this._launchStreams(n,o),r}_sendMessage(e){return this._resetKeepAliveInterval(),this.connection.send(e)}_sendWithProtocol(e){return this._messageBuffer?this._messageBuffer._send(e):this._sendMessage(this._protocol.writeMessage(e))}send(e,...t){const[n,s]=this._replaceStreamingParams(t),i=this._sendWithProtocol(this._createInvocation(e,t,!0,s));return this._launchStreams(n,i),i}invoke(e,...t){const[n,s]=this._replaceStreamingParams(t),i=this._createInvocation(e,t,!1,s);return new Promise((e,t)=>{this._callbacks[i.invocationId]=(n,s)=>{s?t(s):n&&(n.type===O.Completion?n.error?t(new Error(n.error)):e(n.result):t(new Error(`Unexpected message type: ${n.type}`)))};const s=this._sendWithProtocol(i).catch(e=>{t(e),delete this._callbacks[i.invocationId]});this._launchStreams(n,s)})}on(e,t){e&&t&&(e=e.toLowerCase(),this._methods[e]||(this._methods[e]=[]),-1===this._methods[e].indexOf(t)&&this._methods[e].push(t))}off(e,t){if(!e)return;e=e.toLowerCase();const n=this._methods[e];if(n)if(t){const s=n.indexOf(t);-1!==s&&(n.splice(s,1),0===n.length&&delete this._methods[e])}else delete this._methods[e]}onclose(e){e&&this._closedCallbacks.push(e)}onreconnecting(e){e&&this._reconnectingCallbacks.push(e)}onreconnected(e){e&&this._reconnectedCallbacks.push(e)}_processIncomingData(e){if(this._cleanupTimeout(),this._receivedHandshakeResponse||(e=this._processHandshakeResponse(e),this._receivedHandshakeResponse=!0),e){const n=this._protocol.parseMessages(e,this._logger);for(const e of n)if(!this._messageBuffer||this._messageBuffer._shouldProcessMessage(e))switch(e.type){case O.Invocation:this._invokeClientMethod(e).catch(e=>{this._logger.log(W.Error,`Invoke client method threw error: ${re(e)}`)});break;case O.StreamItem:case O.Completion:{const n=this._callbacks[e.invocationId];if(n){e.type===O.Completion&&delete this._callbacks[e.invocationId];try{n(e)}catch(t){this._logger.log(W.Error,`Stream callback threw error: ${re(t)}`)}}break}case O.Ping:break;case O.Close:{this._logger.log(W.Information,"Close message received from server.");const t=e.error?new Error("Server returned an error on close: "+e.error):void 0;!0===e.allowReconnect?this.connection.stop(t):this._stopPromise=this._stopInternal(t);break}case O.Ack:this._messageBuffer&&this._messageBuffer._ack(e);break;case O.Sequence:this._messageBuffer&&this._messageBuffer._resetSequence(e);break;default:this._logger.log(W.Warning,`Invalid message type: ${e.type}.`)}}this._resetTimeoutPeriod()}_processHandshakeResponse(e){let t,n;try{[n,t]=this._handshakeProtocol.parseHandshakeResponse(e)}catch(s){const e="Error parsing handshake response: "+s;this._logger.log(W.Error,e);const t=new Error(e);throw this._handshakeRejecter(t),t}if(t.error){const e="Server returned handshake error: "+t.error;this._logger.log(W.Error,e);const n=new Error(e);throw this._handshakeRejecter(n),n}return this._logger.log(W.Debug,"Server handshake complete."),this._handshakeResolver(),n}_resetKeepAliveInterval(){this.connection.features.inherentKeepAlive||(this._nextKeepAlive=(new Date).getTime()+this.keepAliveIntervalInMilliseconds,this._cleanupPingTimer())}_resetTimeoutPeriod(){if(!(this.connection.features&&this.connection.features.inherentKeepAlive||(this._timeoutHandle=setTimeout(()=>this.serverTimeout(),this.serverTimeoutInMilliseconds),void 0!==this._pingServerHandle))){let e=this._nextKeepAlive-(new Date).getTime();e<0&&(e=0),this._pingServerHandle=setTimeout(async()=>{if(this._connectionState===V.Connected)try{await this._sendMessage(this._cachedPingMessage)}catch{this._cleanupPingTimer()}},e)}}serverTimeout(){this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."))}async _invokeClientMethod(e){const t=e.target.toLowerCase(),n=this._methods[t];if(!n)return this._logger.log(W.Warning,`No client method with the name '${t}' found.`),void(e.invocationId&&(this._logger.log(W.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),await this._sendWithProtocol(this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null))));const s=n.slice(),i=!!e.invocationId;let o,r,a;for(const l of s)try{const n=o;o=await l.apply(this,e.arguments),i&&o&&n&&(this._logger.log(W.Error,`Multiple results provided for '${t}'. Sending error to server.`),a=this._createCompletionMessage(e.invocationId,"Client provided multiple results.",null)),r=void 0}catch(c){r=c,this._logger.log(W.Error,`A callback for the method '${t}' threw error '${c}'.`)}a?await this._sendWithProtocol(a):i?(r?a=this._createCompletionMessage(e.invocationId,`${r}`,null):void 0!==o?a=this._createCompletionMessage(e.invocationId,null,o):(this._logger.log(W.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),a=this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)),await this._sendWithProtocol(a)):o&&this._logger.log(W.Error,`Result given for '${t}' method but server is not expecting a result.`)}_connectionClosed(e){this._logger.log(W.Debug,`HubConnection.connectionClosed(${e}) called while in state ${this._connectionState}.`),this._stopDuringStartError=this._stopDuringStartError||e||new D("The underlying connection was closed before the hub handshake could complete."),this._handshakeResolver&&this._handshakeResolver(),this._cancelCallbacksWithError(e||new Error("Invocation canceled due to the underlying connection being closed.")),this._cleanupTimeout(),this._cleanupPingTimer(),this._connectionState===V.Disconnecting?this._completeClose(e):this._connectionState===V.Connected&&this._reconnectPolicy?this._reconnect(e):this._connectionState===V.Connected&&this._completeClose(e)}_completeClose(e){if(this._connectionStarted){this._connectionState=V.Disconnected,this._connectionStarted=!1,this._messageBuffer&&(this._messageBuffer._dispose(null!=e?e:new Error("Connection closed.")),this._messageBuffer=void 0),X.isBrowser&&window.document.removeEventListener("freeze",this._freezeEventListener);try{this._closedCallbacks.forEach(t=>t.apply(this,[e]))}catch(t){this._logger.log(W.Error,`An onclose callback called with error '${e}' threw error '${t}'.`)}}}async _reconnect(e){const t=Date.now();let n=0,s=void 0!==e?e:new Error("Attempting to reconnect due to a unknown error."),i=this._getNextRetryDelay(n++,0,s);if(null===i)return this._logger.log(W.Debug,"Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."),void this._completeClose(e);if(this._connectionState=V.Reconnecting,e?this._logger.log(W.Information,`Connection reconnecting because of error '${e}'.`):this._logger.log(W.Information,"Connection reconnecting."),0!==this._reconnectingCallbacks.length){try{this._reconnectingCallbacks.forEach(t=>t.apply(this,[e]))}catch(o){this._logger.log(W.Error,`An onreconnecting callback called with error '${e}' threw error '${o}'.`)}if(this._connectionState!==V.Reconnecting)return void this._logger.log(W.Debug,"Connection left the reconnecting state in onreconnecting callback. Done reconnecting.")}for(;null!==i;){if(this._logger.log(W.Information,`Reconnect attempt number ${n} will start in ${i} ms.`),await new Promise(e=>{this._reconnectDelayHandle=setTimeout(e,i)}),this._reconnectDelayHandle=void 0,this._connectionState!==V.Reconnecting)return void this._logger.log(W.Debug,"Connection left the reconnecting state during reconnect delay. Done reconnecting.");try{if(await this._startInternal(),this._connectionState=V.Connected,this._logger.log(W.Information,"HubConnection reconnected successfully."),0!==this._reconnectedCallbacks.length)try{this._reconnectedCallbacks.forEach(e=>e.apply(this,[this.connection.connectionId]))}catch(o){this._logger.log(W.Error,`An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${o}'.`)}return}catch(o){if(this._logger.log(W.Information,`Reconnect attempt failed because of error '${o}'.`),this._connectionState!==V.Reconnecting)return this._logger.log(W.Debug,`Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`),void(this._connectionState===V.Disconnecting&&this._completeClose());s=o instanceof Error?o:new Error(o.toString()),i=this._getNextRetryDelay(n++,Date.now()-t,s)}}this._logger.log(W.Information,`Reconnect retries have been exhausted after ${Date.now()-t} ms and ${n} failed attempts. Connection disconnecting.`),this._completeClose()}_getNextRetryDelay(e,t,n){try{return this._reconnectPolicy.nextRetryDelayInMilliseconds({elapsedMilliseconds:t,previousRetryCount:e,retryReason:n})}catch(s){return this._logger.log(W.Error,`IRetryPolicy.nextRetryDelayInMilliseconds(${e}, ${t}) threw error '${s}'.`),null}}_cancelCallbacksWithError(e){const t=this._callbacks;this._callbacks={},Object.keys(t).forEach(n=>{const s=t[n];try{s(null,e)}catch(i){this._logger.log(W.Error,`Stream 'error' callback called with '${e}' threw error: ${re(i)}`)}})}_cleanupPingTimer(){this._pingServerHandle&&(clearTimeout(this._pingServerHandle),this._pingServerHandle=void 0)}_cleanupTimeout(){this._timeoutHandle&&clearTimeout(this._timeoutHandle)}_createInvocation(e,t,n,s){if(n)return 0!==s.length?{arguments:t,streamIds:s,target:e,type:O.Invocation}:{arguments:t,target:e,type:O.Invocation};{const n=this._invocationId;return this._invocationId++,0!==s.length?{arguments:t,invocationId:n.toString(),streamIds:s,target:e,type:O.Invocation}:{arguments:t,invocationId:n.toString(),target:e,type:O.Invocation}}}_launchStreams(e,t){if(0!==e.length){t||(t=Promise.resolve());for(const n in e)e[n].subscribe({complete:()=>{t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(n)))},error:e=>{let s;s=e instanceof Error?e.message:e&&e.toString?e.toString():"Unknown error",t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(n,s)))},next:e=>{t=t.then(()=>this._sendWithProtocol(this._createStreamItemMessage(n,e)))}})}}_replaceStreamingParams(e){const t=[],n=[];for(let s=0;s<e.length;s++){const i=e[s];if(this._isObservable(i)){const o=this._invocationId;this._invocationId++,t[o]=i,n.push(o.toString()),e.splice(s,1)}}return[t,n]}_isObservable(e){return e&&e.subscribe&&"function"==typeof e.subscribe}_createStreamInvocation(e,t,n){const s=this._invocationId;return this._invocationId++,0!==n.length?{arguments:t,invocationId:s.toString(),streamIds:n,target:e,type:O.StreamInvocation}:{arguments:t,invocationId:s.toString(),target:e,type:O.StreamInvocation}}_createCancelInvocation(e){return{invocationId:e,type:O.CancelInvocation}}_createStreamItemMessage(e,t){return{invocationId:e,item:t,type:O.StreamItem}}_createCompletionMessage(e,t,n){return t?{error:t,invocationId:e,type:O.Completion}:{invocationId:e,result:n,type:O.Completion}}_createCloseMessage(){return{type:O.Close}}}const fe=[0,2e3,1e4,3e4,null];class we{constructor(e){this._retryDelays=void 0!==e?[...e,null]:fe}nextRetryDelayInMilliseconds(e){return this._retryDelays[e.previousRetryCount]}}class ye{}ye.Authorization="Authorization",ye.Cookie="Cookie";class be extends j{constructor(e,t){super(),this._innerClient=e,this._accessTokenFactory=t}async send(e){let t=!0;this._accessTokenFactory&&(!this._accessToken||e.url&&e.url.indexOf("/negotiate?")>0)&&(t=!1,this._accessToken=await this._accessTokenFactory()),this._setAuthorizationHeader(e);const n=await this._innerClient.send(e);return t&&401===n.statusCode&&this._accessTokenFactory?(this._accessToken=await this._accessTokenFactory(),this._setAuthorizationHeader(e),await this._innerClient.send(e)):n}_setAuthorizationHeader(e){e.headers||(e.headers={}),this._accessToken?e.headers[ye.Authorization]=`Bearer ${this._accessToken}`:this._accessTokenFactory&&e.headers[ye.Authorization]&&delete e.headers[ye.Authorization]}getCookieString(e){return this._innerClient.getCookieString(e)}}var Ce,ve,Se,Ie;(ve=Ce||(Ce={}))[ve.None=0]="None",ve[ve.WebSockets=1]="WebSockets",ve[ve.ServerSentEvents=2]="ServerSentEvents",ve[ve.LongPolling=4]="LongPolling",(Ie=Se||(Se={}))[Ie.Text=1]="Text",Ie[Ie.Binary=2]="Binary";let ke=class{constructor(){this._isAborted=!1,this.onabort=null}abort(){this._isAborted||(this._isAborted=!0,this.onabort&&this.onabort())}get signal(){return this}get aborted(){return this._isAborted}};class Te{get pollAborted(){return this._pollAbort.aborted}constructor(e,t,n){this._httpClient=e,this._logger=t,this._pollAbort=new ke,this._options=n,this._running=!1,this.onreceive=null,this.onclose=null}async connect(e,t){if(K.isRequired(e,"url"),K.isRequired(t,"transferFormat"),K.isIn(t,Se,"transferFormat"),this._url=e,this._logger.log(W.Trace,"(LongPolling transport) Connecting."),t===Se.Binary&&"undefined"!=typeof XMLHttpRequest&&"string"!=typeof(new XMLHttpRequest).responseType)throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");const[n,s]=ne(),i={[n]:s,...this._options.headers},o={abortSignal:this._pollAbort.signal,headers:i,timeout:1e5,withCredentials:this._options.withCredentials};t===Se.Binary&&(o.responseType="arraybuffer");const r=`${e}&_=${Date.now()}`;this._logger.log(W.Trace,`(LongPolling transport) polling: ${r}.`);const a=await this._httpClient.get(r,o);200!==a.statusCode?(this._logger.log(W.Error,`(LongPolling transport) Unexpected response code: ${a.statusCode}.`),this._closeError=new $(a.statusText||"",a.statusCode),this._running=!1):this._running=!0,this._receiving=this._poll(this._url,o)}async _poll(e,t){try{for(;this._running;)try{const n=`${e}&_=${Date.now()}`;this._logger.log(W.Trace,`(LongPolling transport) polling: ${n}.`);const s=await this._httpClient.get(n,t);204===s.statusCode?(this._logger.log(W.Information,"(LongPolling transport) Poll terminated by server."),this._running=!1):200!==s.statusCode?(this._logger.log(W.Error,`(LongPolling transport) Unexpected response code: ${s.statusCode}.`),this._closeError=new $(s.statusText||"",s.statusCode),this._running=!1):s.content?(this._logger.log(W.Trace,`(LongPolling transport) data received. ${Q(s.content,this._options.logMessageContent)}.`),this.onreceive&&this.onreceive(s.content)):this._logger.log(W.Trace,"(LongPolling transport) Poll timed out, reissuing.")}catch(n){this._running?n instanceof A?this._logger.log(W.Trace,"(LongPolling transport) Poll timed out, reissuing."):(this._closeError=n,this._running=!1):this._logger.log(W.Trace,`(LongPolling transport) Poll errored after shutdown: ${n.message}`)}}finally{this._logger.log(W.Trace,"(LongPolling transport) Polling complete."),this.pollAborted||this._raiseOnClose()}}async send(e){return this._running?Z(this._logger,"LongPolling",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}async stop(){this._logger.log(W.Trace,"(LongPolling transport) Stopping polling."),this._running=!1,this._pollAbort.abort();try{await this._receiving,this._logger.log(W.Trace,`(LongPolling transport) sending DELETE request to ${this._url}.`);const t={},[n,s]=ne();t[n]=s;const i={headers:{...t,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials};let o;try{await this._httpClient.delete(this._url,i)}catch(e){o=e}o?o instanceof $&&(404===o.statusCode?this._logger.log(W.Trace,"(LongPolling transport) A 404 response was returned from sending a DELETE request."):this._logger.log(W.Trace,`(LongPolling transport) Error sending a DELETE request: ${o}`)):this._logger.log(W.Trace,"(LongPolling transport) DELETE request accepted.")}finally{this._logger.log(W.Trace,"(LongPolling transport) Stop finished."),this._raiseOnClose()}}_raiseOnClose(){if(this.onclose){let e="(LongPolling transport) Firing onclose event.";this._closeError&&(e+=" Error: "+this._closeError),this._logger.log(W.Trace,e),this.onclose(this._closeError)}}}class Me{constructor(e,t,n,s){this._httpClient=e,this._accessToken=t,this._logger=n,this._options=s,this.onreceive=null,this.onclose=null}async connect(e,t){return K.isRequired(e,"url"),K.isRequired(t,"transferFormat"),K.isIn(t,Se,"transferFormat"),this._logger.log(W.Trace,"(SSE transport) Connecting."),this._url=e,this._accessToken&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(this._accessToken)}`),new Promise((n,s)=>{let i,o=!1;if(t===Se.Text){if(X.isBrowser||X.isWebWorker)i=new this._options.EventSource(e,{withCredentials:this._options.withCredentials});else{const t=this._httpClient.getCookieString(e),n={};n.Cookie=t;const[s,o]=ne();n[s]=o,i=new this._options.EventSource(e,{withCredentials:this._options.withCredentials,headers:{...n,...this._options.headers}})}try{i.onmessage=e=>{if(this.onreceive)try{this._logger.log(W.Trace,`(SSE transport) data received. ${Q(e.data,this._options.logMessageContent)}.`),this.onreceive(e.data)}catch(t){return void this._close(t)}},i.onerror=e=>{o?this._close():s(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."))},i.onopen=()=>{this._logger.log(W.Information,`SSE connected to ${this._url}`),this._eventSource=i,o=!0,n()}}catch(r){return void s(r)}}else s(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"))})}async send(e){return this._eventSource?Z(this._logger,"SSE",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}stop(){return this._close(),Promise.resolve()}_close(e){this._eventSource&&(this._eventSource.close(),this._eventSource=void 0,this.onclose&&this.onclose(e))}}class Ee{constructor(e,t,n,s,i,o){this._logger=n,this._accessTokenFactory=t,this._logMessageContent=s,this._webSocketConstructor=i,this._httpClient=e,this.onreceive=null,this.onclose=null,this._headers=o}async connect(e,t){let n;return K.isRequired(e,"url"),K.isRequired(t,"transferFormat"),K.isIn(t,Se,"transferFormat"),this._logger.log(W.Trace,"(WebSockets transport) Connecting."),this._accessTokenFactory&&(n=await this._accessTokenFactory()),new Promise((s,i)=>{let o;e=e.replace(/^http/,"ws");const r=this._httpClient.getCookieString(e);let a=!1;if(X.isNode||X.isReactNative){const t={},[s,i]=ne();t[s]=i,n&&(t[ye.Authorization]=`Bearer ${n}`),r&&(t[ye.Cookie]=r),o=new this._webSocketConstructor(e,void 0,{headers:{...t,...this._headers}})}else n&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(n)}`);o||(o=new this._webSocketConstructor(e)),t===Se.Binary&&(o.binaryType="arraybuffer"),o.onopen=t=>{this._logger.log(W.Information,`WebSocket connected to ${e}.`),this._webSocket=o,a=!0,s()},o.onerror=e=>{let t=null;t="undefined"!=typeof ErrorEvent&&e instanceof ErrorEvent?e.error:"There was an error with the transport",this._logger.log(W.Information,`(WebSockets transport) ${t}.`)},o.onmessage=e=>{if(this._logger.log(W.Trace,`(WebSockets transport) data received. ${Q(e.data,this._logMessageContent)}.`),this.onreceive)try{this.onreceive(e.data)}catch(t){return void this._close(t)}},o.onclose=e=>{if(a)this._close(e);else{let t=null;t="undefined"!=typeof ErrorEvent&&e instanceof ErrorEvent?e.error:"WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.",i(new Error(t))}}})}send(e){return this._webSocket&&this._webSocket.readyState===this._webSocketConstructor.OPEN?(this._logger.log(W.Trace,`(WebSockets transport) sending data. ${Q(e,this._logMessageContent)}.`),this._webSocket.send(e),Promise.resolve()):Promise.reject("WebSocket is not in the OPEN state")}stop(){return this._webSocket&&this._close(void 0),Promise.resolve()}_close(e){this._webSocket&&(this._webSocket.onclose=()=>{},this._webSocket.onmessage=()=>{},this._webSocket.onerror=()=>{},this._webSocket.close(),this._webSocket=void 0),this._logger.log(W.Trace,"(WebSockets transport) socket closed."),this.onclose&&(!this._isCloseEvent(e)||!1!==e.wasClean&&1e3===e.code?e instanceof Error?this.onclose(e):this.onclose():this.onclose(new Error(`WebSocket closed with status code: ${e.code} (${e.reason||"no reason given"}).`)))}_isCloseEvent(e){return e&&"boolean"==typeof e.wasClean&&"number"==typeof e.code}}class Pe{constructor(e,t={}){var n;if(this._stopPromiseResolver=()=>{},this.features={},this._negotiateVersion=1,K.isRequired(e,"url"),this._logger=void 0===(n=t.logger)?new te(W.Information):null===n?G.instance:void 0!==n.log?n:new te(n),this.baseUrl=this._resolveUrl(e),(t=t||{}).logMessageContent=void 0!==t.logMessageContent&&t.logMessageContent,"boolean"!=typeof t.withCredentials&&void 0!==t.withCredentials)throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");t.withCredentials=void 0===t.withCredentials||t.withCredentials,t.timeout=void 0===t.timeout?1e5:t.timeout;let s=null,i=null;if(X.isNode&&"undefined"!=typeof require){const e="function"==typeof __webpack_require__?__non_webpack_require__:require;s=e("ws"),i=e("eventsource")}X.isNode||"undefined"==typeof WebSocket||t.WebSocket?X.isNode&&!t.WebSocket&&s&&(t.WebSocket=s):t.WebSocket=WebSocket,X.isNode||"undefined"==typeof EventSource||t.EventSource?X.isNode&&!t.EventSource&&void 0!==i&&(t.EventSource=i):t.EventSource=EventSource,this._httpClient=new be(t.httpClient||new he(this._logger),t.accessTokenFactory),this._connectionState="Disconnected",this._connectionStarted=!1,this._options=t,this.onreceive=null,this.onclose=null}async start(e){if(e=e||Se.Binary,K.isIn(e,Se,"transferFormat"),this._logger.log(W.Debug,`Starting connection with transfer format '${Se[e]}'.`),"Disconnected"!==this._connectionState)return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));if(this._connectionState="Connecting",this._startInternalPromise=this._startInternal(e),await this._startInternalPromise,"Disconnecting"===this._connectionState){const e="Failed to start the HttpConnection before stop() was called.";return this._logger.log(W.Error,e),await this._stopPromise,Promise.reject(new D(e))}if("Connected"!==this._connectionState){const e="HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";return this._logger.log(W.Error,e),Promise.reject(new D(e))}this._connectionStarted=!0}send(e){return"Connected"!==this._connectionState?Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State.")):(this._sendQueue||(this._sendQueue=new Re(this.transport)),this._sendQueue.send(e))}async stop(e){return"Disconnected"===this._connectionState?(this._logger.log(W.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnected state.`),Promise.resolve()):"Disconnecting"===this._connectionState?(this._logger.log(W.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise):(this._connectionState="Disconnecting",this._stopPromise=new Promise(e=>{this._stopPromiseResolver=e}),await this._stopInternal(e),void(await this._stopPromise))}async _stopInternal(e){this._stopError=e;try{await this._startInternalPromise}catch(t){}if(this.transport){try{await this.transport.stop()}catch(t){this._logger.log(W.Error,`HttpConnection.transport.stop() threw error '${t}'.`),this._stopConnection()}this.transport=void 0}else this._logger.log(W.Debug,"HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.")}async _startInternal(e){let t=this.baseUrl;this._accessTokenFactory=this._options.accessTokenFactory,this._httpClient._accessTokenFactory=this._accessTokenFactory;try{if(this._options.skipNegotiation){if(this._options.transport!==Ce.WebSockets)throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");this.transport=this._constructTransport(Ce.WebSockets),await this._startTransport(t,e)}else{let n=null,s=0;do{if(n=await this._getNegotiationResponse(t),"Disconnecting"===this._connectionState||"Disconnected"===this._connectionState)throw new D("The connection was stopped during negotiation.");if(n.error)throw new Error(n.error);if(n.ProtocolVersion)throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");if(n.url&&(t=n.url),n.accessToken){const e=n.accessToken;this._accessTokenFactory=()=>e,this._httpClient._accessToken=e,this._httpClient._accessTokenFactory=void 0}s++}while(n.url&&s<100);if(100===s&&n.url)throw new Error("Negotiate redirection limit exceeded.");await this._createTransport(t,this._options.transport,n,e)}this.transport instanceof Te&&(this.features.inherentKeepAlive=!0),"Connecting"===this._connectionState&&(this._logger.log(W.Debug,"The HttpConnection connected successfully."),this._connectionState="Connected")}catch(n){return this._logger.log(W.Error,"Failed to start the connection: "+n),this._connectionState="Disconnected",this.transport=void 0,this._stopPromiseResolver(),Promise.reject(n)}}async _getNegotiationResponse(e){const t={},[n,s]=ne();t[n]=s;const i=this._resolveNegotiateUrl(e);this._logger.log(W.Debug,`Sending negotiation request: ${i}.`);try{const e=await this._httpClient.post(i,{content:"",headers:{...t,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials});if(200!==e.statusCode)return Promise.reject(new Error(`Unexpected status code returned from negotiate '${e.statusCode}'`));const n=JSON.parse(e.content);return(!n.negotiateVersion||n.negotiateVersion<1)&&(n.connectionToken=n.connectionId),n.useStatefulReconnect&&!0!==this._options._useStatefulReconnect?Promise.reject(new F("Client didn't negotiate Stateful Reconnect but the server did.")):n}catch(o){let e="Failed to complete negotiation with the server: "+o;return o instanceof $&&404===o.statusCode&&(e+=" Either this is not a SignalR endpoint or there is a proxy blocking the connection."),this._logger.log(W.Error,e),Promise.reject(new F(e))}}_createConnectUrl(e,t){return t?e+(-1===e.indexOf("?")?"?":"&")+`id=${t}`:e}async _createTransport(e,t,n,s){let i=this._createConnectUrl(e,n.connectionToken);if(this._isITransport(t))return this._logger.log(W.Debug,"Connection was provided an instance of ITransport, using that directly."),this.transport=t,await this._startTransport(i,s),void(this.connectionId=n.connectionId);const o=[],r=n.availableTransports||[];let a=n;for(const l of r){const n=this._resolveTransportOrError(l,t,s,!0===(null==a?void 0:a.useStatefulReconnect));if(n instanceof Error)o.push(`${l.transport} failed:`),o.push(n);else if(this._isITransport(n)){if(this.transport=n,!a){try{a=await this._getNegotiationResponse(e)}catch(c){return Promise.reject(c)}i=this._createConnectUrl(e,a.connectionToken)}try{return await this._startTransport(i,s),void(this.connectionId=a.connectionId)}catch(c){if(this._logger.log(W.Error,`Failed to start the transport '${l.transport}': ${c}`),a=void 0,o.push(new x(`${l.transport} failed: ${c}`,Ce[l.transport])),"Connecting"!==this._connectionState){const e="Failed to select transport before stop() was called.";return this._logger.log(W.Debug,e),Promise.reject(new D(e))}}}}return o.length>0?Promise.reject(new q(`Unable to connect to the server with any of the available transports. ${o.join(" ")}`,o)):Promise.reject(new Error("None of the transports supported by the client are supported by the server."))}_constructTransport(e){switch(e){case Ce.WebSockets:if(!this._options.WebSocket)throw new Error("'WebSocket' is not supported in your environment.");return new Ee(this._httpClient,this._accessTokenFactory,this._logger,this._options.logMessageContent,this._options.WebSocket,this._options.headers||{});case Ce.ServerSentEvents:if(!this._options.EventSource)throw new Error("'EventSource' is not supported in your environment.");return new Me(this._httpClient,this._httpClient._accessToken,this._logger,this._options);case Ce.LongPolling:return new Te(this._httpClient,this._logger,this._options);default:throw new Error(`Unknown transport: ${e}.`)}}_startTransport(e,t){return this.transport.onreceive=this.onreceive,this.features.reconnect?this.transport.onclose=async n=>{let s=!1;if(this.features.reconnect){try{this.features.disconnected(),await this.transport.connect(e,t),await this.features.resend()}catch{s=!0}s&&this._stopConnection(n)}else this._stopConnection(n)}:this.transport.onclose=e=>this._stopConnection(e),this.transport.connect(e,t)}_resolveTransportOrError(e,t,n,s){const i=Ce[e.transport];if(null==i)return this._logger.log(W.Debug,`Skipping transport '${e.transport}' because it is not supported by this client.`),new Error(`Skipping transport '${e.transport}' because it is not supported by this client.`);if(!function(e,t){return!e||0!==(t&e)}(t,i))return this._logger.log(W.Debug,`Skipping transport '${Ce[i]}' because it was disabled by the client.`),new N(`'${Ce[i]}' is disabled by the client.`,i);if(!(e.transferFormats.map(e=>Se[e]).indexOf(n)>=0))return this._logger.log(W.Debug,`Skipping transport '${Ce[i]}' because it does not support the requested transfer format '${Se[n]}'.`),new Error(`'${Ce[i]}' does not support ${Se[n]}.`);if(i===Ce.WebSockets&&!this._options.WebSocket||i===Ce.ServerSentEvents&&!this._options.EventSource)return this._logger.log(W.Debug,`Skipping transport '${Ce[i]}' because it is not supported in your environment.'`),new U(`'${Ce[i]}' is not supported in your environment.`,i);this._logger.log(W.Debug,`Selecting transport '${Ce[i]}'.`);try{return this.features.reconnect=i===Ce.WebSockets?s:void 0,this._constructTransport(i)}catch(o){return o}}_isITransport(e){return e&&"object"==typeof e&&"connect"in e}_stopConnection(e){if(this._logger.log(W.Debug,`HttpConnection.stopConnection(${e}) called while in state ${this._connectionState}.`),this.transport=void 0,e=this._stopError||e,this._stopError=void 0,"Disconnected"!==this._connectionState){if("Connecting"===this._connectionState)throw this._logger.log(W.Warning,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is still in the connecting state.`),new Error(`HttpConnection.stopConnection(${e}) was called while the connection is still in the connecting state.`);if("Disconnecting"===this._connectionState&&this._stopPromiseResolver(),e?this._logger.log(W.Error,`Connection disconnected with error '${e}'.`):this._logger.log(W.Information,"Connection disconnected."),this._sendQueue&&(this._sendQueue.stop().catch(e=>{this._logger.log(W.Error,`TransportSendQueue.stop() threw error '${e}'.`)}),this._sendQueue=void 0),this.connectionId=void 0,this._connectionState="Disconnected",this._connectionStarted){this._connectionStarted=!1;try{this.onclose&&this.onclose(e)}catch(t){this._logger.log(W.Error,`HttpConnection.onclose(${e}) threw error '${t}'.`)}}}else this._logger.log(W.Debug,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is already in the disconnected state.`)}_resolveUrl(e){if(0===e.lastIndexOf("https://",0)||0===e.lastIndexOf("http://",0))return e;if(!X.isBrowser)throw new Error(`Cannot resolve '${e}'.`);const t=window.document.createElement("a");return t.href=e,this._logger.log(W.Information,`Normalizing '${e}' to '${t.href}'.`),t.href}_resolveNegotiateUrl(e){const t=new URL(e);t.pathname.endsWith("/")?t.pathname+="negotiate":t.pathname+="/negotiate";const n=new URLSearchParams(t.searchParams);return n.has("negotiateVersion")||n.append("negotiateVersion",this._negotiateVersion.toString()),n.has("useStatefulReconnect")?"true"===n.get("useStatefulReconnect")&&(this._options._useStatefulReconnect=!0):!0===this._options._useStatefulReconnect&&n.append("useStatefulReconnect","true"),t.search=n.toString(),t.toString()}}class Re{constructor(e){this._transport=e,this._buffer=[],this._executing=!0,this._sendBufferedData=new He,this._transportResult=new He,this._sendLoopPromise=this._sendLoop()}send(e){return this._bufferData(e),this._transportResult||(this._transportResult=new He),this._transportResult.promise}stop(){return this._executing=!1,this._sendBufferedData.resolve(),this._sendLoopPromise}_bufferData(e){if(this._buffer.length&&typeof this._buffer[0]!=typeof e)throw new Error(`Expected data to be of type ${typeof this._buffer} but was of type ${typeof e}`);this._buffer.push(e),this._sendBufferedData.resolve()}async _sendLoop(){for(;;){if(await this._sendBufferedData.promise,!this._executing){this._transportResult&&this._transportResult.reject("Connection stopped.");break}this._sendBufferedData=new He;const t=this._transportResult;this._transportResult=void 0;const n="string"==typeof this._buffer[0]?this._buffer.join(""):Re._concatBuffers(this._buffer);this._buffer.length=0;try{await this._transport.send(n),t.resolve()}catch(e){t.reject(e)}}}static _concatBuffers(e){const t=e.map(e=>e.byteLength).reduce((e,t)=>e+t),n=new Uint8Array(t);let s=0;for(const i of e)n.set(new Uint8Array(i),s),s+=i.byteLength;return n.buffer}}class He{constructor(){this.promise=new Promise((e,t)=>[this._resolver,this._rejecter]=[e,t])}resolve(){this._resolver()}reject(e){this._rejecter(e)}}class $e{constructor(){this.name="json",this.version=2,this.transferFormat=Se.Text}parseMessages(e,t){if("string"!=typeof e)throw new Error("Invalid input for JSON hub protocol. Expected a string.");if(!e)return[];null===t&&(t=G.instance);const n=ge.parse(e),s=[];for(const i of n){const e=JSON.parse(i);if("number"!=typeof e.type)throw new Error("Invalid payload.");switch(e.type){case O.Invocation:this._isInvocationMessage(e);break;case O.StreamItem:this._isStreamItemMessage(e);break;case O.Completion:this._isCompletionMessage(e);break;case O.Ping:case O.Close:break;case O.Ack:this._isAckMessage(e);break;case O.Sequence:this._isSequenceMessage(e);break;default:t.log(W.Information,"Unknown message type '"+e.type+"' ignored.");continue}s.push(e)}return s}writeMessage(e){return ge.write(JSON.stringify(e))}_isInvocationMessage(e){this._assertNotEmptyString(e.target,"Invalid payload for Invocation message."),void 0!==e.invocationId&&this._assertNotEmptyString(e.invocationId,"Invalid payload for Invocation message.")}_isStreamItemMessage(e){if(this._assertNotEmptyString(e.invocationId,"Invalid payload for StreamItem message."),void 0===e.item)throw new Error("Invalid payload for StreamItem message.")}_isCompletionMessage(e){if(e.result&&e.error)throw new Error("Invalid payload for Completion message.");!e.result&&e.error&&this._assertNotEmptyString(e.error,"Invalid payload for Completion message."),this._assertNotEmptyString(e.invocationId,"Invalid payload for Completion message.")}_isAckMessage(e){if("number"!=typeof e.sequenceId)throw new Error("Invalid SequenceId for Ack message.")}_isSequenceMessage(e){if("number"!=typeof e.sequenceId)throw new Error("Invalid SequenceId for Sequence message.")}_assertNotEmptyString(e,t){if("string"!=typeof e||""===e)throw new Error(t)}}const Ae={trace:W.Trace,debug:W.Debug,info:W.Information,information:W.Information,warn:W.Warning,warning:W.Warning,error:W.Error,critical:W.Critical,none:W.None};class De{configureLogging(e){if(K.isRequired(e,"logging"),void 0!==e.log)this.logger=e;else if("string"==typeof e){const t=function(e){const t=Ae[e.toLowerCase()];if(void 0!==t)return t;throw new Error(`Unknown log level: ${e}`)}(e);this.logger=new te(t)}else this.logger=new te(e);return this}withUrl(e,t){return K.isRequired(e,"url"),K.isNotEmpty(e,"url"),this.url=e,this.httpConnectionOptions="object"==typeof t?{...this.httpConnectionOptions,...t}:{...this.httpConnectionOptions,transport:t},this}withHubProtocol(e){return K.isRequired(e,"protocol"),this.protocol=e,this}withAutomaticReconnect(e){if(this.reconnectPolicy)throw new Error("A reconnectPolicy has already been set.");return e?Array.isArray(e)?this.reconnectPolicy=new we(e):this.reconnectPolicy=e:this.reconnectPolicy=new we,this}withServerTimeout(e){return K.isRequired(e,"milliseconds"),this._serverTimeoutInMilliseconds=e,this}withKeepAliveInterval(e){return K.isRequired(e,"milliseconds"),this._keepAliveIntervalInMilliseconds=e,this}withStatefulReconnect(e){return void 0===this.httpConnectionOptions&&(this.httpConnectionOptions={}),this.httpConnectionOptions._useStatefulReconnect=!0,this._statefulReconnectBufferSize=null==e?void 0:e.bufferSize,this}build(){const e=this.httpConnectionOptions||{};if(void 0===e.logger&&(e.logger=this.logger),!this.url)throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");const t=new Pe(this.url,e);return me.create(t,this.logger||G.instance,this.protocol||new $e,this.reconnectPolicy,this._serverTimeoutInMilliseconds,this._keepAliveIntervalInMilliseconds,this._statefulReconnectBufferSize)}}class Ue{connection=null;config=null;configStorage;connectingPromise=null;constructor(){this.configStorage=new h,this.loadConfiguration()}async loadConfiguration(){this.config=await this.configStorage.getConfig()}async connect(){if("Connected"===this.connection?.state)return!0;if(this.connectingPromise)return this.connectingPromise;this.connectingPromise=this._doConnect();try{return await this.connectingPromise}finally{this.connectingPromise=null}}async _doConnect(){if(!this.config?.hubUrl&&(await this.loadConfiguration(),!this.config?.hubUrl))return console.error("[SignalR] Hub URL not configured"),!1;try{return this.connection=(new De).withUrl(this.config?.hubUrl,{accessTokenFactory:()=>g.getValidAccessToken().then(e=>e??"")}).withServerTimeout(6e4).withKeepAliveInterval(15e3).withAutomaticReconnect().configureLogging(W.Information).build(),this.connection.onreconnecting(e=>{console.warn("[SignalR] Reconnecting...",e)}),this.connection.onreconnected(e=>{console.info("[SignalR] Reconnected with connectionId:",e)}),this.connection.onclose(e=>{console.warn("[SignalR] Connection closed:",e)}),await this.connection.start(),!0}catch(e){return console.error("[SignalR] Connection failed:",e),!1}}async sendMessage(e,...t){if(!(this.connection&&"Connected"===this.connection.state||(console.warn("[SignalR] Not connected, attempting to connect..."),await this.connect())))throw new Error("Failed to connect to SignalR hub");try{await this.connection.invoke(e,...t)}catch(n){throw console.error(`[SignalR] Failed to send message to ${e}:`,n),n}}on(e,t){this.connection?this.connection.on(e,t):console.warn("[SignalR] Connection not initialized")}off(e,t){this.connection&&(t?this.connection.off(e,t):this.connection.off(e))}async disconnect(){if(this.connection)try{await this.connection.stop()}catch(e){console.error("[SignalR] Disconnect error:",e)}}isConnected(){return"Connected"===this.connection?.state}getConnection(){return this.connection}}let Ne=null;class xe{constructor(e,t=function(){return Ne||(Ne=new Ue),Ne}()){this.callbacks=e,this.signalR=t}callbacks;signalR;lastConnectionInstance=null;async connect(){if(!this.signalR.isConnected())try{if(await this.signalR.connect()){const e=this.signalR.getConnection();e!==this.lastConnectionInstance&&(this.registerMessageListener(),this.lastConnectionInstance=e,e.onclose(e=>{console.warn("[HubClient] Connection closed:",e),this.callbacks.onConnectionStateChanged({isConnected:!1,reason:e?.message})}),e.onreconnecting(e=>{console.warn("[HubClient] Reconnecting...",e),this.callbacks.onConnectionStateChanged({isConnected:!1,reason:"Reconnecting..."})}),e.onreconnected(e=>{console.info("[HubClient] Reconnected:",e),this.registerMessageListener(),this.callbacks.onConnectionStateChanged({isConnected:!0})})),this.callbacks.onConnectionStateChanged({isConnected:!0})}}catch(e){const t=e instanceof Error?e.message:"Unknown error";throw this.callbacks.onConnectionStateChanged({isConnected:!1,reason:t}),this.callbacks.onError?.({code:"CONNECTION_FAILED",message:t}),e}}registerMessageListener(){this.signalR.off("ReceiveMessage"),this.signalR.on("ReceiveMessage",e=>{this.callbacks.onReceiveMessage(e)})}async disconnect(){try{await this.signalR.disconnect(),this.callbacks.onConnectionStateChanged({isConnected:!1})}catch(e){console.info("[HubClient] Disconnect failed:",e)}}async sendMessage(e,t){try{await this.signalR.sendMessage(e,t)}catch(n){throw console.error(`[HubClient] Failed to send ${e}:`,n),n}}isConnected(){return this.signalR.isConnected()}}class Fe{constructor(e,t={}){this.callbacks=e,this.getApiClient=t.getApiClient,this.meetingIdGetter=t.meetingIdGetter,this.handlers=new Map([[c.Entry,e=>this.handleChatEntry(e)],[c.ReactionApplied,e=>this.handleReactionApplied(e)]])}callbacks;getApiClient;meetingIdGetter;handlers;get apiContext(){const e=this.getApiClient?.(),t=this.meetingIdGetter?.();return e&&t?{apiClient:e,meetingId:t}:void 0}async connect(){console.info("[PersonalHubClient] Mock connection (personal mode)")}async disconnect(){console.info("[PersonalHubClient] Mock disconnection (personal mode)")}async sendMessage(e,t){const n=this.handlers.get(e);n?await n(t):this.callbacks.onReceiveMessage({...t,type:e.toString()})}async handleChatEntry(e){if("Chat"!==e.entryType)return void this.callbacks.onReceiveMessage(e);const t=this.apiContext;if(t)try{await t.apiClient.batchFlushTranscript(t.meetingId,e.meetId,[{blockId:e.blockId,participantId:"",participantName:e.participant.fullName,content:e.content,entryType:"Chat",messageId:e.messageId,messageVersion:e.messageVersion,clientTimestamp:e.clientTimestamp??Date.now()}])}catch(n){console.error("[PersonalHubClient] Failed to flush chat message to backend:",n)}this.callbacks.onReceiveMessage(e)}async handleReactionApplied(e){const t=this.apiContext;if(t)try{await t.apiClient.applyReaction(t.meetingId,{blockId:e.blockId,reactionId:e.reactionId,userId:e.user.id,userFullName:e.user.fullName,userPictureUrl:e.user.pictureUrl})}catch(n){console.error("[PersonalHubClient] Failed to flush reaction to backend:",n)}this.callbacks.onReceiveMessage(e)}isConnected(){return!0}}class qe{constructor(e,t){this.messaging=e,this.hubClient=t}messaging;hubClient;register(){const e=this.messaging.on(d.hub.qry.connectionStatus,()=>{const e=this.hubClient.isConnected();this.messaging.send(d.hub.evt.message,{type:"ConnectionStatus",isConnected:e},t.SidePanel)}),n=this.messaging.on(d.hub.cmd.reconnect,async()=>{try{await this.hubClient.disconnect(),await this.hubClient.connect()}catch(e){console.error("[HubLifecycleHandler] Manual reconnect failed:",e)}});return()=>{e(),n()}}}class Le{constructor(e,t,n,s,i,o,r,a,c){this.messaging=e,this.hubClient=t,this.meetingManager=n,this.transcriptManager=s,this.userStorage=i,this.tokenStorage=o,this.meetingStateStorage=r,this.mode=a,this.onAuthFailed=c}messaging;hubClient;meetingManager;transcriptManager;userStorage;tokenStorage;meetingStateStorage;mode;onAuthFailed;register(){const e=async e=>{try{if(!(await this.meetingManager.startMeeting(e)))return void console.warn("[MeetingHandler] Unable to start meeting from URL:",e);if(this.meetingStateStorage.setInMeeting(!0),await this.hubClient.connect(),!(await this.tokenStorage.hasToken()))return void console.warn("[MeetingHandler] User not authenticated - cannot join meeting");const t=await this.userStorage.getUserInfo();t&&await this.meetingManager.notifyUserJoined({id:t.id,fullName:t.fullName,pictureUrl:t.pictureUrl||""})}catch(t){console.error("[MeetingHandler] Failed to handle meeting session start:",t)}},n=this.messaging.on(d.meeting.evt.sessionStarted,async t=>{await e(t.url)}),i=this.messaging.on(d.meeting.cmd.reconnect,async t=>{await e(t.url)}),o=this.messaging.on(d.meeting.evt.sessionEnded,async()=>{}),r=this.messaging.on(d.meeting.evt.tabClosed,async e=>{try{await this.meetingStateStorage.clearMeetingState(),await this.hubClient.disconnect(),this.meetingManager.endSession()}catch(t){console.error("[MeetingHandler] Failed to handle tab closed:",t)}}),a=this.messaging.on(d.meeting.cmd.close,async e=>{const n=this.meetingManager.meetingId,i=this.meetingManager.meetId;if(!n||!i){this.meetingManager.endCurrentMeeting();const e={type:c.ForceCloseMeeting,meetId:i||""};return this.messaging.send(d.hub.evt.message,e,t.SidePanel),this.messaging.send(d.hub.evt.message,e,t.Content),void console.warn("[MeetingHandler] Cannot close meeting - no meeting ID")}try{await this.transcriptManager.closeMeeting(i,n)}catch(o){if(o instanceof s)return void(await this.onAuthFailed());this.meetingManager.endCurrentMeeting();const e={type:c.ForceCloseMeeting,meetId:i};this.messaging.send(d.hub.evt.message,e,t.SidePanel),this.messaging.send(d.hub.evt.message,e,t.Content),console.error("[MeetingHandler] Failed to close meeting:",o)}}),l=this.messaging.on(d.meeting.evt.titleDetected,e=>{this.messaging.relay(d.meeting.evt.titleDetected,e,t.SidePanel)}),h=this.messaging.on(d.meeting.cmd.setHistoryEnabled,e=>{this.meetingManager.setHistoryEnabled(e.historyEnabled)}),g=this.messaging.on(d.meeting.evt.guestsJoined,async e=>{if(e.guests&&Array.isArray(e.guests)&&(this.transcriptManager.updateParticipants(e.guests),this.meetingManager.persistParticipants(),"Collaborative"===this.mode))try{await this.meetingManager.notifyGuestsJoined(e.guests)}catch(t){console.error("[MeetingHandler] Failed to send guests joined notification:",t)}});return()=>{n(),i(),o(),r(),a(),l(),h(),g()}}}class je{constructor(e,t,n,s,i,o){this.messaging=e,this.hubClient=t,this.meetingManager=n,this.transcriptManager=s,this.userStorage=i,this.onAuthFailed=o}messaging;hubClient;meetingManager;transcriptManager;userStorage;onAuthFailed;register(){const e=this.messaging.on(d.transcription.cmd.start,async e=>{const n=this.meetingManager.meetId;if(!n)return void console.warn("[TranscriptionHandler] Cannot start transcription - not in meeting",n);const o=await this.userStorage.getUserInfo();if(o)try{const s=!1!==e.historyEnabled,i=await this.transcriptManager.startTranscription(n,this.meetingManager.platform,e.title,s);if(!i)return;this.meetingManager.setMeetingId(i,{isHost:!0,historyEnabled:s}),this.messaging.send(d.captions.cmd.enable,{languageCode:e.languageCode,notifyParticipants:(await u()).notifyParticipantsOnTranscriptionStart},t.Page),this.messaging.send(d.captions.cmd.enable,{languageCode:e.languageCode},t.Content),await this.hubClient.sendMessage(c.StartTranscription,{meetId:n,user:{id:o.id,fullName:o.fullName,pictureUrl:o.pictureUrl||""},platform:this.meetingManager.platform,meetingId:i})}catch(r){if(r instanceof s)return void(await this.onAuthFailed());if(r instanceof i){const e=r.parseProblemDetails();return void this.messaging.send(d.transcription.evt.notify,{type:"error",title:e?.title??"Failed to start transcription",detail:e?.detail},t.SidePanel)}console.error("[TranscriptionHandler] Failed to start transcription:",r)}else console.warn("[TranscriptionHandler] Cannot start transcription - no user info")}),n=this.messaging.on(d.transcription.cmd.pausePlay,async e=>{if(!this.hubClient.isConnected())return void console.warn("[TranscriptionHandler] Cannot pause/play - not connected");const t=await this.userStorage.getUserInfo();if(t)try{await this.hubClient.sendMessage(c.PauseAndPlayTranscription,{type:"PauseAndPlayTranscription",meetId:e.meetId,user:t,isPaused:e.isPaused})}catch(n){console.error("[TranscriptionHandler] Failed to send pause/play message:",n)}else console.warn("[TranscriptionHandler] Cannot pause/play - no user info")}),o=this.messaging.on(d.captions.evt.transcript,async e=>{const t=this.meetingManager.meetId,n=this.meetingManager.meetingId;t&&await this.transcriptManager.processTranscript(e,t,n)});return()=>{e(),n(),o()}}}class We{constructor(e,t,n,s){this.messaging=e,this.hubClient=t,this.meetingManager=n,this.userStorage=s}messaging;hubClient;meetingManager;userStorage;register(){return this.messaging.on(d.meeting.cmd.sendChat,async e=>{const t=this.meetingManager.meetId;if(!this.hubClient.isConnected()||!t)return void console.warn("[ChatHandler] Cannot send chat - not connected or not in meeting");const n=await this.userStorage.getUserInfo();if(n)try{await this.hubClient.sendMessage(c.Entry,{type:c.Entry,meetId:t,blockId:crypto.randomUUID(),participant:{fullName:n.fullName,pictureUrl:n.pictureUrl||""},content:e.message,entryType:"Chat"})}catch(s){console.error("[ChatHandler] Failed to send chat message:",s)}else console.warn("[ChatHandler] Cannot send chat - no user info")})}}class Be{constructor(e,t,n){this.messaging=e,this.hubClient=t,this.userStorage=n}messaging;hubClient;userStorage;register(){return this.messaging.on(d.reaction.cmd.apply,async e=>{const t=await this.userStorage.getUserInfo();if(this.hubClient.isConnected()&&t)try{await this.hubClient.sendMessage(c.ReactionApplied,{type:c.ReactionApplied,reactionId:parseInt(e.reactionId),blockId:e.blockId,user:{id:t.id,fullName:t.fullName,pictureUrl:t.pictureUrl||""},reactionType:e.emoji,meetId:e.meetId})}catch(n){console.error("[ReactionHandler] Failed to apply reaction:",n)}else console.warn("[ReactionHandler] Cannot apply reaction - not connected or no user")})}}class Oe{constructor(e,t,n){this.messaging=e,this.configStorage=t,this.onConfigUpdated=n}messaging;configStorage;onConfigUpdated;register(){return this.messaging.on(d.bridge.cmd.updateConfig,async e=>{await this.configStorage.addOrUpdateConfig(e);const t=new p,n=await t.getActiveAccount();n?.config.serviceBaseUrl===e.serviceBaseUrl&&await t.patchActiveAccount({config:e}),await this.onConfigUpdated()})}}class ze{constructor(e,t,n){this.messaging=e,this.transcriptManager=t,this.meetingManager=n}messaging;transcriptManager;meetingManager;register(){return this.messaging.on(d.participant.evt.resolved,e=>{this.transcriptManager.updateParticipants([{id:e.participantId,fullName:e.displayName,pictureUrl:e.pictureUrl}]),this.meetingManager.persistParticipants()})}}class Ve{static instance;init(){this.configureSidePanel(),this.setupClickListener()}static getInstance(){return Ve.instance||(Ve.instance=new Ve),Ve.instance}async openSidePanel(e){try{await chrome.sidePanel.open({windowId:e})}catch(t){console.error("[SidePanelManager] Failed to open side panel:",t)}}async closePanel(e){try{const t=(await chrome.tabs.query({windowId:e})).find(e=>e.url?.includes("sidepanel.html"));t?.id&&await chrome.tabs.sendMessage(t.id,{type:"CLOSE_PANEL"})}catch(t){console.error("[SidePanelManager] Failed to close side panel:",t)}}async configureSidePanel(){try{await chrome.sidePanel.setOptions({path:S.PANEL,enabled:!0})}catch(e){console.error("[SidePanelManager] Failed to configure side panel:",e)}}setupClickListener(){chrome.action.onClicked.addListener(async e=>{e.windowId&&await this.openSidePanel(e.windowId)})}}new class{hubClient;transcriptManager;meetingManager;mode;configStorage;userStorage;tokenStorage;meetingStateStorage;messaging;hasConnectedOnce=!1;currentApiClient;disposeHandlers;constructor(){this.messaging=(k||(k=new I,k.initialize()),k),this.configStorage=new h,this.userStorage=new _,this.tokenStorage=new m,this.meetingStateStorage=new f,this.initialize()}async initialize(){await this.initializeHubClient(),this.transcriptManager=this.createTranscriptManager(),this.meetingManager=new M(this.hubClient,this.transcriptManager.participantRegistry),await this.meetingManager.ready(),await this.updateApiClient(),this.registerHandlers(),this.listenForModeChanges(),this.listenForAccountChanges()}listenForModeChanges(){chrome.storage.onChanged.addListener((e,t)=>{if("local"!==t||!(w in e))return;const n=e[w].oldValue?.[y.MEETING_MODE],s=e[w].newValue?.[y.MEETING_MODE];n?.mode!==s?.mode&&this.reinitializeHubClient()})}listenForAccountChanges(){chrome.storage.onChanged.addListener((e,t)=>{"local"===t&&(b.ACTIVE_ACCOUNT_ID in e||b.ACCOUNTS in e)&&this.updateApiClient()})}async reinitializeHubClient(){try{await this.hubClient.disconnect()}catch(e){console.warn("[BackgroundController] Error disconnecting previous hub client:",e)}await this.initializeHubClient(),this.transcriptManager=this.createTranscriptManager(),this.meetingManager=new M(this.hubClient,this.transcriptManager.participantRegistry),await this.updateApiClient(),this.registerHandlers(),this.hasConnectedOnce=!1,console.info(`[BackgroundController] Hub client reinitialized for mode: ${this.mode}`)}async initializeHubClient(){const e=await C();this.mode=e.mode,"Personal"===this.mode?this.hubClient=new Fe({onReceiveMessage:this.handleHubMessage.bind(this),onConnectionStateChanged:()=>{}},{getApiClient:()=>this.currentApiClient,meetingIdGetter:()=>this.meetingManager.meetingId}):this.hubClient=new xe({onReceiveMessage:this.handleHubMessage.bind(this),onConnectionStateChanged:this.handleConnectionStateChanged.bind(this),onError:e=>console.error("[BackgroundController] Hub error:",e)})}registerHandlers(){this.disposeHandlers?.();const e=this.notifyAuthFailed.bind(this),t=[new qe(this.messaging,this.hubClient),new Le(this.messaging,this.hubClient,this.meetingManager,this.transcriptManager,this.userStorage,this.tokenStorage,this.meetingStateStorage,this.mode,e),new je(this.messaging,this.hubClient,this.meetingManager,this.transcriptManager,this.userStorage,e),new We(this.messaging,this.hubClient,this.meetingManager,this.userStorage),new Be(this.messaging,this.hubClient,this.userStorage),new Oe(this.messaging,this.configStorage,this.updateApiClient.bind(this)),new ze(this.messaging,this.transcriptManager,this.meetingManager)].map(e=>e.register());this.disposeHandlers=()=>t.forEach(e=>e())}async handleHubMessage(e){this.messaging.send(d.hub.evt.message,e,t.SidePanel),this.handleMeetingLifecycleMessage(e)}handleMeetingLifecycleMessage(e){if(e.type===c.StartTranscription)return e.meetingId?void this.meetingManager.setMeetingId(e.meetingId):void console.warn("[BackgroundController] Received StartTranscription message without meetingId",e);e.type!==c.MeetingIsActive?e.type!==c.ForceCloseMeeting&&e.type!==c.CloseMeeting||(this.messaging.send(d.hub.evt.message,e,t.Content),this.meetingManager.endCurrentMeeting(),this.transcriptManager.clear()):this.meetingManager.setMeetingId(e.meetingId)}async handleConnectionStateChanged(e){if(this.messaging.send(d.hub.evt.message,{type:"ConnectionStatus",isConnected:e.isConnected,reason:e.reason},t.SidePanel),e.isConnected){const e=this.hasConnectedOnce;this.hasConnectedOnce=!0,e&&await this.rejoinActiveMeeting()}}async rejoinActiveMeeting(){if(!this.meetingManager.meetId)return;const e=await this.getAuthenticatedUser();if(e)try{await this.meetingManager.notifyUserJoined({id:e.id,fullName:e.fullName,pictureUrl:e.pictureUrl||""}),console.info("[BackgroundController] Rejoined meeting after reconnect")}catch(t){console.error("[BackgroundController] Failed to rejoin meeting after reconnect:",t)}}async getAuthenticatedUser(){const e=await this.userStorage.getUserInfo();return e||console.warn("[BackgroundController] No user info available"),e??null}async notifyAuthFailed(){await this.tokenStorage.clearAll(),await this.userStorage.removeUserInfo(),this.messaging.send(d.auth.evt.failed,void 0,t.SidePanel)}createTranscriptManager(){const e=()=>this.currentApiClient,t=new E,n="Personal"===this.mode?new H(e,this.hubClient,t):new R(this.hubClient,t);return new T(t,n,e,this.mode)}async updateApiClient(){const e=await this.configStorage.getConfig();e&&(this.currentApiClient=new v(e))}},Ve.getInstance().init();
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
	const INJECTED_MANIFEST = {"manifest_version":3,"name":"Riter: AI note taker for Google Meet and Microsoft Teams","version":"1.18.4","description":"Meeting note taker and AI transcription for Google Meet and Microsoft Teams.","permissions":["sidePanel","storage"],"optional_permissions":[],"content_scripts":[{"matches":["*://meet.google.com/*-*-*"],"js":["src/googleMeetContent.js"],"run_at":"document_start","css":[]},{"matches":["*://meet.google.com/*-*-*"],"js":["src/googleMeetPageContext.js"],"world":"MAIN","run_at":"document_start","css":[]},{"matches":["*://teams.microsoft.com/*","*://teams.cloud.microsoft/*","*://teams.live.com/*"],"js":["src/msTeamsContent.js"],"run_at":"document_start","css":[]},{"matches":["*://teams.microsoft.com/*","*://teams.cloud.microsoft/*","*://teams.live.com/*"],"js":["src/msTeamsPageContext.js"],"world":"MAIN","run_at":"document_start","css":[]},{"matches":["<all_urls>"],"js":["src/panelBridge.js"],"run_at":"document_start","css":[]}],"options_ui":{},"browser_action":{},"page_action":{},"action":{"default_title":"Open Side Panel"},"icons":{"128":"icons/128x.png"},"web_accessible_resources":[],"background":{"service_worker":"src/background.js","type":"module"},"_id":"riter-ai-note-taker-for-google-meet-and-microsoft-teams"};
	const CONTENT_SCRIPT_CONFIGS_FOR_MATCHING = [
	  {
	    "matches": [
	      "*://meet.google.com/*-*-*"
	    ]
	  },
	  {
	    "matches": [
	      "*://meet.google.com/*-*-*"
	    ]
	  },
	  {
	    "matches": [
	      "*://teams.microsoft.com/*",
	      "*://teams.cloud.microsoft/*",
	      "*://teams.live.com/*"
	    ]
	  },
	  {
	    "matches": [
	      "*://teams.microsoft.com/*",
	      "*://teams.cloud.microsoft/*",
	      "*://teams.live.com/*"
	    ]
	  },
	  {
	    "matches": [
	      "<all_urls>"
	    ]
	  }
	];
	const OPTIONS_PAGE_PATH = null;
	const POPUP_PAGE_PATH = null;
	const EXTENSION_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABERSURBVHgB7d29cRvXHsbhtcepGlADDJmwAaYO1IBSBWrAVShQikApGkDglIFTN8AG2IAK8J3DuauBIALEx+4S5/8+z4zG9zOxLe8P57zE/nZ7e/vfAABE+X0AAOIIAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACDQHwMAcd69e/f86+bm5vmP79+/f/719PQ0bDab5z9S22+3t7f/DQCUsv2AHx/uuw/8fdrD/9OnTyKgOCcAAB3a/tT+0q/235+r/f8/fvw4fPnyZaAuAQBwhXY/se/+8ZIH/DHu7u4GahMAAG9g36f28cj+rc0dGLw9AQAwsX0Du2Pu36+FAKhPAACc6JKBXS8EQH0CAGDH+BDf/QQ/xcCuJ+OPBVKTAADivPXArhf+PNQmAIByDv14XIXj+aUIgNoEANCVCgO7XvhzWZsAAK7Kvjv3cXDnU+ly/LmuTQAAi3ppMZ84sOuBvxa1CQBgUruf2Hcf+B4q/XAFUJsAAE5y6MfjPDCgHwIA+GF3YLf7Rw/4LP561yYAIIiBHacQALUJAChk38DO/TuwSwBARw69Qc4Dnqk5AahNAMAVMbDj2rS/F79//z5QjwCAhSS8QY56BEBdAgAmsu9Tuy+4oWfeCFiXAIAjeYMcifx9XZcAgP87NLBzPE8qAVCXACCCN8jBefzeqEsAUIKBHczDCUBdAoAujA9xb5CDZfm9VZcA4CoY2MF18nuvLgHAIg79eJzjebhefn/WJQC4mIEd1OUEoC4BwKsOvUHOAx5qEwB1CQD2vkHOwA7w+78uARBg9wttvEEOOIWvA65JABTgDXLAnHxIqEkAdOr+/n7466+/POCB2QmAmgRAh9rD/+vXrwPAEnzQqOn3ge58+PBhAFiKE4CaBAAABwmAmgRAh/79998BYCmuAGoSAB3abDbD9+/fBwA4lwDoUHv4OwUAluIEoCYB0Kn1ej0ALEEA1CQAOtVOAHwzFwDnEgAda1sAgLk5AahJAHTMNQCwFD8KWI8A6JgxILAUAVCPAOjcarUaAObmGqAeAdC5dgLgOwGAuTkBqEcAFGALAMxNANQjAAoQAMDcXAHUIwAKMAYE5uYEoB4BUIQxIDAnAVCPACjCGBCYkwCoRwAUYgsAzMUGoB4BUIgAAObiBKAeAVCIMSAwFwFQjwAoxikAMIcWACKgFgFQjDEgMBcBUIsAKKY9/J0CAHMQALUIgIIeHh4GgKn5SYBaBEBBj4+PxoDA5JwA1CIAinIKAExNANQiAIrabDbGgMCkBEAtAqCo9vBvEQAwFRuAWgRAYa4BANhHABTWhoDGgMBUnADUIgCKcwoATEUA1CIAijMGBOAlAqA4Y0BgKk4AahEAAVwDAFMRAXUIgADGgADsEgAhnAIAU3ACUIcACGEMCExBANQhAEK0h79rAABGAiDIer0eAC7hBKAOARCknQC0VwUDnMsLgeoQAGGMAYFLCIA6BEAY1wDAJVwB1CEAwhgDApdwAlCHAAi0Wq0GgHMIgDoEQKB2AuA7AYBzuAKoQwCEsgUAzuUUoAYBEEoAAOcSADUIgFDGgMC5BEANAiCYMSBwDjuAGgRAMGNA4BxOAGoQAOFsAYBTCYAaBEA4AQCcSgDUIADCGQMCp7IBqEEA4BQAOIkTgBoEAMaAwEkEQA0CgOeHv1MA4FiuAGoQADx7eHgYAI7hBKAGAcCzx8dHY0DgKAKgBgHAD04BgGO5BuifAOCHzWZjDAgQQgDwQ3v4twgAeI0TgP4JAH7iGgA4hgDonwDgJ20IaAwIUJ8A4BdOAYDXOAHonwDgF8aAwGv8KGD/BAC/MAYEXiMA+icAeJFrAOAQVwD9EwC8yBgQOMQJQP8EAHs5BQD2EQD9EwDsZQwI7OMKoH8CgL3aw981ALCPU4C+CQAOWq/XA8BLBEDfBAAHtROA9qpggF0CoG8CgFcZAwIvsQPomwDgVa4BgJc4AeibAOBVxoDASwRA3wQAR1mtVgPANgHQNwHAUdoJgO8EALbZAPRNAHA0WwBgmxOAvgkAjiYAgG0CoG8CgKMZAwLbXAH0TQBwEmNAYOQEoG8CgJMYAwIjAdA3AcDJbAGAkWuAfgkATiYAAPonADiZMSAwcgLQLwHAWZwCAI0A6JcA4CzGgAB9EwCcpT38nQIATgD6JQA428PDwwBkEwD9EgCc7fHx0RgQoFMCgIs4BYBsTgD6JQC4yGazMQaEYAKgXwKAi7SHf4sAAPoiALiYawDI5QSgXwKAi7UhoDEg5PJSoD4JACbhFAByCYA+CQAmYQwIuQRAnwQAkzAGhFx2AH0SAEzGNQBkcgLQJwHAZIwBIZMA6JMAYFJOASCPK4A+CQAmZQwIeZwA9EkAMKn28HcNAFkEQJ8EAJNbr9cDkMMVQJ8EAJNrJwDtVcFABicAfRIAzMIYEHIIgD4JAGbhGgByCIA+CQBmYQwIWewA+iMAmM1qtRqADE4B+iMAmE07AfCdAJBBAPRHADArWwDI4AqgPwKAWQkAyOAEoD8CgFkZA0IGAdAfAcDsjAGhPlcA/REAzM4YEOD6CAAWYQsAtTkB6I8AYBECAGp7enoa6IsAYBHtCsAWAGpqD3+/v/vz2+3t7X8DLOTDhw/D3d3dANTQHv7thM/Opz8CAAACuQIAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAINAfA127ubnxHm4I1t62CecQAJ1qD/6vX796AxeEa1/F++XLl+Hh4WGAU/gq4A61h/63b988/IFn7Xv4//zzT9/Hz0lsADrUPv17+AOjdg3YXrQFpxAAHXLnD+zyzwVOJQA65K4PgEsJgA61ez7LXwAuIQA6tVqtBgA4lwDoVDsBsPgF4FwCoGPr9XoAgHMIgI4JAADOJQA6ZgwIwLkEQOeMAQE4hwDonDEgAOcQAAXYAgBwKgFQgAAA4FQCoABjQABOJQCKMAYE4BQCoIh2AvD4+DgAwDEEQCHeEgjAsQRAIW0M6EcCATiGACjEGBCAYwmAYvxIIADHEADFGAMCcAwBUJAxIACvEQAFGQMC8BoBUJAxIACvEQBFGQMCcIgAKKqdADgFAGAfAVCYMSAA+wiAwjabjTEgAC8SAIW1h3+LAADYJQCKcw0AwEsEQHHGgAC8RAAEcAoAwC4BEMAYEIBdAiCAMSAAuwRACNcAAGwTACGMAQHYJgCCOAUAYCQAghgDAjASAEGMAQEYCYAwrgEAaARAGGNAABoBEMgpAAACIJAxIAACIJAxIAACIJRrAIBsAiCUMSBANgEQzCkAQC4BEMwYECCXAAhmDAiQSwCEcw0AkEkAhDMGBMgkABjW6/UAQBYBwPMJgDEgQBYBwPPD3ykAQBYBwDNjQIAsAoBnj4+PxoAAQQQAP7gGAMghAPjBGBAghwDgB2NAgBwCgJ8YAwJkEAD8xBgQIIMA4Ber1WoAoDYBwC+MAQHqEwC8yBgQoDYBwIsEAEBtAoAXtSsAY0CAugQAexkDAtQlANjLGBCgLgHAQbYAADUJAA4SAAA1CQAOMgYEqEkA8CpjQIB6BACvMgYEqEcAcBRbAIBaBABHEQAAtQgAjmIMCNetvcobTiEAOJoxIFynp6en4eHhYYBTCACOZgwI12U8mfv06dMAp/pjgBO0LcDnz58HYHnjA7/9akf+ruW4xG+3t7f/DXCkd+/eDf/8888AzK898NvR/viwd8/PlJwAcJLxE8jd3d0ATKvd5Y+f8Nuv9u9hLk4AOFl7+H/79m0ALrP9yb590rexYUlOADjZOAZs1wHA8bbv7o1qeWsCgLMYA8Jh7eG+/bBv/9oDn2viCoCzGAPCz8YH/jja88Dn2jkB4CzGgKSz0Kd3TgA4mzEgSSz0qcYJAGcbP/Xc3NwMUM349brjJ3wPfKoRAFyk/QNSAFDB9mDPQp8ErgC4SBsD/v33334kkK6Mg73t0Z4HPmmcAHCRcQx4f38/wLWy0IdfCQAu1r4TQABwTbZfmmOhDy8TAFzMGJC3Ni70x0/5BnvwOgHAJIwBWZKFPlzOCJBJGAMyJwt9mJ4TACZhDMhULPRhGQKAyRgDcg4vzYG3IQCYzPgPcO8H4JDthf744AeWJwCYVDuyFQBs89IcuE5GgEzKGBAvzYE+OAFgUu3T3mazGT5+/DiQYfuTffuk7/4e+iAAmFx7CAiAurbv7v1IHvRLADA5Y8A6LPShLgHALIwB+2ShDzmMAJmFMWAfLPQhlxMAZmEMeJ0s9IGRAGA2xoBvz0tzgH0EALMxBlyehT5wLAHArIwB52OhD1zCCJBZGQNOZ3zgj0f6HvjAJZwAMCtjwPNt/0iehT4wNQHA7IwBjzMu9MdP+QZ7wJwEALMzBnyZhT7wlgQAizAGHH4a7FnoA2/NCJBFpI0Bx8He9mjPAx+4Jk4AWET1MaCFPtAbAcBiKo0BLfSB3gkAFtPzGNBCH6hGALCoXsaAXpoDVGcEyKKudQy4/TrcFinu74HqnACwqGsZA3ppDpBOALC4pceAXpoD8CsBwOLmHgNuL/THBz8APxMAvIn1ej1ZALQH/vZX6vqRPIDXCQDexHjvfs4Y0EIf4HICgDfRHv7tFODz58+v/m8t9AGmJwB4My0A7u/vh5ubm5/+cwt9gPn5HgDeXNsCvH///vko30IfYBkCAAAC/T4AAHEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABDof5OJ8e76EuFHAAAAAElFTkSuQmCC";
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
		  const scriptName = "Riter: AI note taker for Google Meet and Microsoft Teams";
		  _log(`Starting execution phases...`);
		
  // #region Document Start
			  if (typeof document !== 'undefined') {
			    _log(`Executing document-start phase...`);
			    
			    const scriptPaths = ["src/googleMeetContent.js","src/googleMeetPageContext.js","src/msTeamsContent.js","src/msTeamsPageContext.js","src/panelBridge.js"];
			   _log(`  Executing JS (start): ${scriptPaths}`);
			
			   try {
			       // Keep variables from being redeclared for global scope, but also make them apply to global scope. (Theoretically)
			      with (globalThis){;
			// START: src/googleMeetContent.js
			!function(){"use strict";const t={GOOGLE_MEET:/https:\/\/meet\.google\.com\/([a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{3})/,TEAMS:/https:\/\/(?:teams\.microsoft\.com|teams\.live\.com|teams\.cloud\.microsoft)\//,ZOOM:/https:\/\/.*\.zoom\.us\/j\/(\d+)/};class e{static instance;constructor(){}static getInstance(){return e.instance||(e.instance=new e),e.instance}getMeetingInfo(e){if(t.GOOGLE_MEET.test(e)){const n=e.match(t.GOOGLE_MEET);return{platform:"GoogleMeet",meetId:n?n[1]:"",isValid:!!n}}if(t.TEAMS.test(e)){const t=this.extractTeamsMeetId(e);return{platform:"Teams",meetId:t,isValid:t.length>0}}if(t.ZOOM.test(e)){const n=e.match(t.ZOOM);return{platform:"Zoom",meetId:n?n[1]:"",isValid:!!n}}return{platform:"Unknown",meetId:"",isValid:!1}}isGoogleMeet(e){return t.GOOGLE_MEET.test(e)}isTeams(e){return t.TEAMS.test(e)}isZoom(e){return t.ZOOM.test(e)}extractTeamsMeetId(t){try{const e=new URL(t),{hostname:n,pathname:i}=e;if("teams.cloud.microsoft"===n){const t=i.match(/^\/([\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12})/i);if(t)return t[1]}const s=i.match(/^\/call\/([^/?#]+)/);if(s)return s[1];const r=i.match(/^\/l\/meetup-join\/([^/?#]+)/);if(r)return r[1];if("teams.live.com"===n){const t=e.searchParams.get("p");if(t)return t;const n=i.match(/^\/meet\/([^/?#]+)/);if(n)return n[1]}}catch{}return""}}e.getInstance();class n{callbacks={};knownParticipantIds=new Set;knownParticipantNames=new Map;static PARTICIPANT_SELECTOR="div[data-participant-id]";bodyObserver=null;mainObserver=null;extractionTimer;observedMain=null;isInitialized=!1;urlObserver=null;lastUrl="";initialize(t){this.isInitialized||(t&&(this.callbacks=t),this.isInitialized=!0,this.lastUrl=window.location.href,this.initializeExistingParticipants(),this.startObserving(),this.watchUrlChanges())}initializeExistingParticipants(){const t=this.extractParticipantsFromPage();t.length>0&&this.processNewParticipants(t)}static DEVICE_LABELS=new Set(["devices","screen share","screen sharing","you"]);extractParticipantsFromPage(){const t=document.querySelectorAll(n.PARTICIPANT_SELECTOR),e=[];return t.forEach((t,i)=>{const s=t.getAttribute("data-participant-id");if(!s)return void console.warn(`[ParticipantObserver] Element ${i+1} has no participant ID, skipping`);const r=t.querySelector("span.notranslate"),a=r?.textContent?.trim()??"",o=n.DEVICE_LABELS.has(a.toLowerCase())?"":a,c=t.querySelector("img"),l=c?.getAttribute("src")||"";e.push({id:s,fullName:o,pictureUrl:l})}),e}startObserving(){const t=document.querySelector("main");t&&this.attachMainObserver(t),this.bodyObserver=new MutationObserver(()=>{const t=document.querySelector("main");t&&t!==this.observedMain&&this.attachMainObserver(t)}),this.bodyObserver.observe(document.body,{childList:!0,subtree:!0})}attachMainObserver(t){this.mainObserver?.disconnect(),this.observedMain=t,this.mainObserver=new MutationObserver(t=>{if(!this.extractionTimer)for(const e of t)for(const t of e.addedNodes)if(t instanceof HTMLElement&&(t.matches?.(n.PARTICIPANT_SELECTOR)||t.querySelector?.(n.PARTICIPANT_SELECTOR)))return void this.scheduleExtraction()}),this.mainObserver.observe(t,{childList:!0,subtree:!0})}scheduleExtraction(){this.extractionTimer||(this.extractionTimer=window.setTimeout(()=>{this.extractionTimer=void 0;const t=this.extractParticipantsFromPage();t.length&&this.processNewParticipants(t)},250))}processNewParticipants(t){const n=t.filter(t=>!!t.fullName&&(this.knownParticipantIds.has(t.id)?this.knownParticipantNames.get(t.id)!==t.fullName&&(this.knownParticipantNames.set(t.id,t.fullName),!0):(this.knownParticipantIds.add(t.id),this.knownParticipantNames.set(t.id,t.fullName),!0)));if(n.length>0){const t=e.getInstance().getMeetingInfo(window.location.href)?.meetId||"";if(!t){const t=new Error("Could not extract meetId from URL");return void(this.callbacks.onError&&this.callbacks.onError(t))}this.callbacks.onParticipantsDetected&&this.callbacks.onParticipantsDetected(n,t)}}watchUrlChanges(){this.urlObserver=new MutationObserver(()=>{const e=window.location.href;e!==this.lastUrl&&(this.lastUrl=e),t.GOOGLE_MEET.test(e)||this.disconnect()}),this.urlObserver.observe(document,{subtree:!0,childList:!0})}disconnect(){this.bodyObserver?.disconnect(),this.mainObserver?.disconnect(),this.bodyObserver=null,this.mainObserver=null,this.observedMain=null,this.extractionTimer&&(window.clearTimeout(this.extractionTimer),this.extractionTimer=void 0),this.urlObserver&&(this.urlObserver.disconnect(),this.urlObserver=null),this.knownParticipantIds.clear(),this.knownParticipantNames.clear(),this.isInitialized=!1}recaptureAllParticipants(){if(!this.isInitialized)return void console.warn("[ParticipantObserver] Not initialized, cannot recapture");const t=this.extractParticipantsFromPage();0!==t.length?(this.knownParticipantIds.clear(),this.knownParticipantNames.clear(),this.processNewParticipants(t)):console.warn("[ParticipantObserver] No participants found during recapture")}}const i="background",s="content",r="page",a={close:"meeting.cmd.close",reconnect:"meeting.cmd.reconnect",sendChat:"meeting.cmd.sendChat",setHistoryEnabled:"meeting.cmd.setHistoryEnabled"},o={sessionStarted:"meeting.evt.sessionStarted",sessionEnded:"meeting.evt.sessionEnded",tabClosed:"meeting.evt.tabClosed",titleDetected:"meeting.evt.titleDetected",guestsJoined:"meeting.evt.guestsJoined"},c={isActive:"meeting.qry.isActive"},l={start:"transcription.cmd.start",pausePlay:"transcription.cmd.pausePlay"},d={enable:"captions.cmd.enable"},g={message:"hub.evt.message"},h="en-US",u="riter:meeting.active",m="riter:meeting.session",p="riter:configs",f="riter:accounts",y="riter:activeAccountId";class b{async getAllAccounts(){return(await chrome.storage.local.get(f))[f]??[]}async getActiveAccountId(){return(await chrome.storage.local.get(y))[y]??null}async getActiveAccount(){const t=await this.getActiveAccountId();return t?(await this.getAllAccounts()).find(e=>e.id===t)??null:null}async setActiveAccountId(t){await chrome.storage.local.set({[y]:t})}async addOrUpdateAccount(t){const e=await this.getAllAccounts(),n=e.findIndex(e=>e.id===t.id);n>=0?e[n]=t:e.push(t),await chrome.storage.local.set({[f]:e})}async removeAccount(t){const e=(await this.getAllAccounts()).filter(e=>e.id!==t);if(await chrome.storage.local.set({[f]:e}),await this.getActiveAccountId()===t){const t=e[0]?.id??null;await this.setActiveAccountId(t)}}async hasAccounts(){return(await this.getAllAccounts()).length>0}async patchActiveAccount(t){const e=await this.getActiveAccountId();if(!e)return;const n=await this.getAllAccounts(),i=n.findIndex(t=>t.id===e);i<0||(n[i]={...n[i],...t},await chrome.storage.local.set({[f]:n}))}}class w{accountStorage=new b;async getConfig(){const t=await this.accountStorage.getActiveAccount();return t?.config?t.config:(await this.getAllConfigs())[0]??null}async setConfig(t){await this.accountStorage.patchActiveAccount({config:t}),await this.addOrUpdateConfig(t)}async removeConfig(){}async hasConfig(){const t=await this.accountStorage.getActiveAccount();return!!t?.config||(await this.getAllConfigs()).length>0}async getAllConfigs(){try{return(await chrome.storage.local.get(p))[p]??[]}catch(t){return console.error("[ConfigStorage] Failed to load configs list:",t),[]}}async addOrUpdateConfig(t){try{const e=await this.getAllConfigs(),n=e.findIndex(e=>e.serviceBaseUrl===t.serviceBaseUrl);n>=0?e[n]=t:e.push(t),await chrome.storage.local.set({[p]:e})}catch(e){console.error("[ConfigStorage] Failed to upsert config:",e)}}async removeConfigByBaseUrl(t){try{const e=(await this.getAllConfigs()).filter(e=>e.serviceBaseUrl!==t);await chrome.storage.local.set({[p]:e})}catch(e){console.error("[ConfigStorage] Failed to remove config from list:",e)}}}class v{async setInMeeting(t){await chrome.storage.local.set({[u]:t})}async isInMeeting(){return(await chrome.storage.local.get(u))[u]||!1}async clearMeetingState(){await chrome.storage.local.remove(u)}}class C{static async save(t){try{const e={...t,lastUpdatedAt:Date.now()};await chrome.storage.local.set({[m]:e})}catch(e){throw console.error("[MeetingSessionStorage] Failed to save session:",e),e}}static async load(){try{const t=(await chrome.storage.local.get(m))[m];if(!t)return null;return Date.now()-t.startedAt>72e5?(await this.clear(),null):{meetId:t.meetId,meetingId:t.meetingId,url:t.url,platform:t.platform,participants:t.participants||[],startedAt:t.startedAt,lastUpdatedAt:t.lastUpdatedAt}}catch(t){return console.error("[MeetingSessionStorage] Failed to load session:",t),null}}static async clear(){try{await chrome.storage.local.remove(m)}catch(t){throw console.error("[MeetingSessionStorage] Failed to clear session:",t),t}}static async exists(){try{return!!(await chrome.storage.local.get(m))[m]}catch(t){return console.error("[MeetingSessionStorage] Failed to check session existence:",t),!1}}}const S="riter:options",M="meetUi";async function A(t){const e=(await chrome.storage.local.get(S))[S];return e?.[t]}const E={showStartTranscriptionButtonOnGoogleMeet:!0};function T(t){if("string"==typeof t)try{return T(JSON.parse(t))}catch{return E}return function(t){if("object"!=typeof t||null===t)return!1;const{showStartTranscriptionButtonOnGoogleMeet:e}=t;return"boolean"==typeof e}(t)?t:E}async function I(){try{return T(await A(M))}catch{return E}}const O={languageCode:h};function L(t){if("string"==typeof t)try{return L(JSON.parse(t))}catch{return O}return function(t){if("object"!=typeof t||null===t)return!1;const{languageCode:e}=t;return"string"==typeof e&&e.length>0}(t)?t:O}async function x(){try{const t=await A("language");return void 0===t?null:L(t).languageCode}catch{return null}}const P='button[aria-label="Chat with everyone"]',k="#browser-extension-center-buttons",B="#riter-transcription-btn",N="riter-btn-wrapper",U="http://www.w3.org/2000/svg",j={active:{background:"#A8C7FA",icon:"#062E6F"},idle:{background:"#f9dedc",icon:"#601410"}},H=["M63.4838 0.200338L2.04096 7.68422C1.00803 7.81003 0.37225 8.87759 0.753699 9.84573L10.5667 34.7514C10.8061 35.3592 11.3929 35.7587 12.0462 35.7587H66.2769C67.2054 35.7587 67.9364 34.9666 67.8621 34.0412L65.2612 1.65162C65.1889 0.750638 64.3811 0.0910509 63.4838 0.200338Z","M11.5223 66.6902L0.905382 40.3309C0.472216 39.2554 1.26393 38.083 2.42333 38.083H58.89C59.7938 38.083 60.5264 38.8157 60.5264 39.7195V55.0544C60.5264 55.8108 60.008 56.4687 59.2726 56.6455L13.4228 67.6699C12.6341 67.8596 11.8254 67.4427 11.5223 66.6902Z"];class q{constructor(t){this.messaging=t}messaging;isTranscribing=!1;isLoading=!1;observer=null;injectPending=!1;isMeetButtonEnabled=!0;loadingTimeoutId=null;meetingStateStorage=new v;storageChangeHandler=(t,e)=>{if("local"!==e||!(S in t))return;const n=t[S].newValue?.[M];void 0!==n&&this.refreshMeetUiSettings(!0)};start(){this.initialize()}stop(){this.observer?.disconnect(),this.observer=null,"undefined"!=typeof chrome&&chrome.storage?.onChanged&&chrome.storage.onChanged.removeListener(this.storageChangeHandler)}markTranscriptionStarted(){this.isTranscribing=!0,this.isLoading=!1,this.clearLoadingTimeout(),this.updateButtonFromDom()}markMeetingClosed(){this.isTranscribing=!1,this.isLoading=!1,this.clearLoadingTimeout(),this.updateButtonFromDom()}clearLoadingTimeout(){null!==this.loadingTimeoutId&&(window.clearTimeout(this.loadingTimeoutId),this.loadingTimeoutId=null)}startLoadingTimeout(){this.clearLoadingTimeout(),this.loadingTimeoutId=window.setTimeout(()=>{this.isLoading&&(this.isLoading=!1,this.updateButtonFromDom(),this.showNotification("Operation Timeout","The transcription operation took too long. Please try again."))},15e3)}updateButtonFromDom(){const t=document.querySelector(B);t&&this.updateButton(t)}cancelLoading(t){this.isLoading=!1,this.clearLoadingTimeout(),this.updateButton(t)}showNotification(t,e){"undefined"!=typeof chrome&&chrome.notifications&&chrome.notifications.create({type:"basic",iconUrl:chrome.runtime.getURL("icons/icon-128.png"),title:t,message:e,priority:1})}setLoading(t,e){const n=t.querySelector("svg"),i=t.querySelector('span[data-riter-loading="true"]');n&&(n.style.display=e?"none":"block"),i&&(i.style.display=e?"inline-block":"none"),t.disabled=e,t.style.cursor=e?"wait":"pointer"}async initialize(){await this.refreshMeetUiSettings(!0),this.injectButton(),this.observer=new MutationObserver(()=>{this.injectButton()}),this.observer.observe(document.body,{childList:!0,subtree:!0}),"undefined"!=typeof chrome&&chrome.storage?.onChanged&&chrome.storage.onChanged.addListener(this.storageChangeHandler)}async refreshMeetUiSettings(t){const e=await I();this.isMeetButtonEnabled=e.showStartTranscriptionButtonOnGoogleMeet,!this.isMeetButtonEnabled&&t&&this.removeButton()}removeButton(){const t=document.querySelector(B);t&&(t.closest(`.${N}`)??t).remove()}updateButton(t){const e=this.isTranscribing?j.active:j.idle;t.title=this.isTranscribing?"Riter - Stop Transcription":"Riter - Start Transcription",t.style.background=e.background,t.querySelectorAll("path").forEach(t=>{t.setAttribute("fill",e.icon)});const n=t.querySelector('span[data-riter-loading="true"]');n&&(n.style.borderTopColor=e.icon);const i=t.closest(`.${N}`)?.querySelector("[data-riter-recording-dot]");i&&(i.style.display=this.isTranscribing?"block":"none"),this.setLoading(t,this.isLoading)}async handleToggle(){const t=document.querySelector(B);t&&!this.isLoading&&(this.isLoading=!0,this.updateButton(t),this.startLoadingTimeout(),this.isTranscribing?await this.stopTranscription(t):await this.startTranscription(t))}async startTranscription(t){const e=await this.resolveLanguageCode();try{const e=Boolean(document.querySelector(P));if(await this.meetingStateStorage.setInMeeting(e),!e)return this.cancelLoading(t),void this.showNotification("Not in Meeting","Please join a Google Meet before starting transcription.");this.messaging.send(a.reconnect,{url:window.location.href},i)}catch{return this.cancelLoading(t),void this.showNotification("Meeting Detection Failed","Unable to verify meeting status. Please refresh the page and try again.")}try{this.messaging.send(l.start,{languageCode:e,title:""},i)}catch{this.cancelLoading(t),this.showNotification("Failed to Start Transcription","Unable to start transcription. Please check your connection and try again.")}}async stopTranscription(t){let e="";try{const t=await C.load();e=t?.meetId??""}catch{e=""}try{this.messaging.send(a.close,{meetId:e,meetingId:""},i)}catch{this.cancelLoading(t),this.showNotification("Failed to Stop Transcription","Unable to stop transcription. Please try again.")}}async resolveLanguageCode(){const t=new w,e=await t.getConfig();return await x()??e?.language??h}createButton(){const t=document.createElement("div");t.className=N,t.style.cssText="position:relative;background:#1e1f20;border-radius:24px;display:flex;flex-direction:column;grid-auto-flow:column;grid-column-gap:.5rem;height:stretch;margin-bottom:.5rem;padding:.75rem;align-items:center;justify-content:flex-end";const e=document.createElement("button");return e.id="riter-transcription-btn",e.type="button",e.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border:none;border-radius:12px;background:#f9dedc;cursor:pointer;padding:0",e.appendChild(this.createSvgIcon()),e.appendChild(this.createSpinner()),this.ensureSpinAnimation(),this.updateButton(e),e.addEventListener("click",()=>{this.handleToggle()}),t.appendChild(e),t.appendChild(this.createRecordingDot()),t}createRecordingDot(){const t=document.createElement("div");return t.setAttribute("data-riter-recording-dot","true"),t.style.cssText="display:none;position:absolute;top:10px;right:10px;width:12px;height:12px;border-radius:50%;background:#ff3b30;animation:pulse 1.4s ease-out infinite",t}createSvgIcon(){const t=document.createElementNS(U,"svg");t.setAttribute("width","24"),t.setAttribute("height","24"),t.setAttribute("viewBox","0 0 68 68"),t.setAttribute("fill","none"),t.style.pointerEvents="none";for(const e of H){const n=document.createElementNS(U,"path");n.setAttribute("d",e),n.setAttribute("fill",j.idle.icon),t.appendChild(n)}return t}createSpinner(){const t=document.createElement("span");return t.setAttribute("data-riter-loading","true"),t.style.cssText="display:none;width:20px;height:20px;border-radius:9999px;border:2px solid rgba(0,0,0,0.2);border-top-color:#062E6F;animation:riter-spin 1s linear infinite",t}ensureSpinAnimation(){if(document.getElementById("riter-spin-style"))return;const t=document.createElement("style");t.id="riter-spin-style",t.textContent="@keyframes riter-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }@keyframes pulse { 0% { box-shadow:0 0 0 0 rgba(255,59,48,.7); } 70% { box-shadow:0 0 0 10px rgba(255,59,48,0); } 100% { box-shadow:0 0 0 0 rgba(255,59,48,0); } }",document.head.appendChild(t)}injectButton(){this.isMeetButtonEnabled?!document.querySelector(k)||document.querySelector(B)||this.injectPending||(this.injectPending=!0,setTimeout(()=>{if(this.injectPending=!1,!this.isMeetButtonEnabled)return void this.removeButton();const t=document.querySelector(k);t&&!document.querySelector(B)&&(t.style.height="stretch",t.appendChild(this.createButton()))},1500)):this.removeButton()}}const z=["Enter","Shift + Enter","Ctrl + Enter"],F={sendMessageShortcut:"Enter",insertNewLineShortcut:"Ctrl + Enter",notifyParticipantsOnTranscriptionStart:!0};function D(t){return z.includes(t)}const G=function(t){return new Promise(e=>setTimeout(e,t))};class R{constructor(t){this.messaging=t,this.buttonInjector=new q(t)}messaging;participantObserver=new n;buttonInjector;isButtonInjectorStarted=!1;storageChangeHandler=null;async initialize(t){this.participantObserver.initialize({onParticipantsDetected:t.onParticipantsDetected,onError:t.onError}),await this.startButtonInjectorIfEnabled(),"undefined"!=typeof chrome&&chrome.storage?.onChanged&&(this.storageChangeHandler=(t,e)=>{if("local"!==e||!(S in t))return;const n=t[S].newValue?.[M];void 0!==n&&this.startButtonInjectorIfEnabled()},chrome.storage.onChanged.addListener(this.storageChangeHandler))}async startButtonInjectorIfEnabled(){this.isButtonInjectorStarted||(await I()).showStartTranscriptionButtonOnGoogleMeet&&(this.buttonInjector.start(),this.isButtonInjectorStarted=!0,this.storageChangeHandler&&"undefined"!=typeof chrome&&chrome.storage?.onChanged&&(chrome.storage.onChanged.removeListener(this.storageChangeHandler),this.storageChangeHandler=null))}async onCaptionsEnabled(){this.buttonInjector.markTranscriptionStarted(),this.participantObserver.recaptureAllParticipants(),(await async function(){try{return function(t){if(function(t){if("object"!=typeof t||null===t)return!1;const{sendMessageShortcut:e,insertNewLineShortcut:n,notifyParticipantsOnTranscriptionStart:i}=t;return!(!D(e)||!D(n)||e===n)&&"boolean"==typeof i}(t))return t;if("object"!=typeof t||null===t)return F;const{sendMessageShortcut:e,insertNewLineShortcut:n}=t;return D(e)&&D(n)&&e!==n?{sendMessageShortcut:e,insertNewLineShortcut:n,notifyParticipantsOnTranscriptionStart:!0}:F}(await A("chat"))}catch{return console.error("Failed to read chat settings from storage, using defaults."),F}}()).notifyParticipantsOnTranscriptionStart&&await this.notifyTranscriptionToChat()}onMeetingClosed(){this.buttonInjector.markMeetingClosed()}isInMeeting(){return Boolean(document.querySelector(P))}destroy(){this.participantObserver.disconnect(),this.buttonInjector.stop(),this.storageChangeHandler&&"undefined"!=typeof chrome&&chrome.storage?.onChanged&&(chrome.storage.onChanged.removeListener(this.storageChangeHandler),this.storageChangeHandler=null)}async notifyTranscriptionToChat(){const t=document.querySelector(P);if(!t)return void console.error("[GoogleMeetContentAdapter] Chat panel button not found");const e="true"===t.getAttribute('aria-expanded="true"');e||(t.click(),await G(500));const n=document.querySelector('textarea[aria-label="Send a message"]');if(!n)return void console.error("[GoogleMeetContentAdapter] Textarea not found");this.setNativeValue(n,"Hi everyone, I'm using Riter to transcribe this call so I don't miss any important details. for more info visit Https://riter.cloud"),await G(500);const i=new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:"Enter",code:"Enter"}),s=new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:"Enter",code:"Enter"});n.dispatchEvent(i),n.dispatchEvent(s);const r=document.querySelector('button[aria-label="Send a message"]');!r||r.disabled?console.error("[GoogleMeetContentAdapter] Send button not found or disabled"):r.click(),e||t.click()}setNativeValue(t,e){const n=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value");n?.set?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0}))}}class V{handlers=new Map;pendingMessages=[];on(t,e){this.handlers.set(t,e);const n=this.pendingMessages.filter(e=>e.type===t);if(n.length>0){this.pendingMessages=this.pendingMessages.filter(e=>e.type!==t);for(const t of n)this.handleIncomingMessage(t)}return()=>this.handlers.delete(t)}async send(t,e,n){const i={id:this.generateId(),type:t,data:e,source:this.getContext(),target:n};this.sendMessage(i)}async relay(t,e,n){const i={id:this.generateId(),type:t,data:e,source:this.getContext(),target:n};this.sendMessage(i)}async handleIncomingMessage(t){if(!this.handlers.has(t.type))return console.warn("["+this.getContext()+"] No handler registered for type "+t.type+", pushing to pendingMessages queue.",t),void this.pendingMessages.push(t);const e=this.handlers.get(t.type);if(e)try{await e(t.data)}catch(n){console.warn(`[${this.getContext()}] Handler error:`,n)}else console.warn(`[${this.getContext()}] No handler for message type:`,t.type,t)}generateId(){return`${Date.now()}-${Math.random().toString(36).substring(2,11)}`}}class Z extends V{getContext(){return"content"}initialize(){chrome.runtime.onMessage.addListener(t=>{t.target!==r||t.source!==i&&"sidepanel"!==t.source||this.sendMessage(t),t.target!==s&&t.target||this.handleIncomingMessage(t)}),window.addEventListener("message",t=>{if(t.source!==window&&null!==t.source)return;const e=t.data;e.type&&e.id&&(e.target===i&&e.source===r&&this.sendMessage(e),e.target!==s&&e.target||this.handleIncomingMessage(e))})}async sendMessage(t){if(t.target===i){if(!chrome.runtime?.id)return;try{chrome.runtime.sendMessage(t)}catch(e){if(e instanceof Error&&e.message.includes("Extension context invalidated"))return;throw e}}else{if(t.target!==r)throw new Error(`[Content] Invalid target for message: ${t.target}`);window.postMessage(t,"*")}}}let _=null;class ${messaging;meetingStateStorage=new v;adapter;constructor(){this.messaging=(_||(_=new Z,_.initialize()),_)}initialize(){this.adapter=this.createAdapter(),this.adapter.initialize({onParticipantsDetected:(t,e)=>{this.messaging.send(o.guestsJoined,{meetId:e,guests:t.map(t=>({id:t.id,fullName:t.fullName,pictureUrl:t.pictureUrl}))},i)},onMeetingActiveCheck:async()=>void 0!==this.adapter&&this.checkMeetingActive(),onError:t=>console.error(`[${this.constructor.name}] Adapter error:`,t)}),this.registerMessageHandlers(),this.registerAdditionalMessageHandlers(),this.installUnloadHandler()}checkMeetingActive(){return!1}registerAdditionalMessageHandlers(){}registerMessageHandlers(){this.messaging.on(d.enable,async()=>{await(this.adapter?.onCaptionsEnabled())}),this.messaging.on(c.isActive,async()=>{const t=this.checkMeetingActive();await this.meetingStateStorage.setInMeeting(t)}),this.messaging.on(g.message,t=>{const e=t;"CloseMeeting"!==e.type&&"ForceCloseMeeting"!==e.type||this.adapter?.onMeetingClosed()})}installUnloadHandler(){window.addEventListener("beforeunload",()=>{this.meetingStateStorage.setInMeeting(!1),this.adapter?.destroy(),this.messaging.send(o.tabClosed,{url:window.location.href},i)})}}class J extends ${createAdapter(){return new R(this.messaging)}checkMeetingActive(){return Boolean(document.querySelector(P))}registerAdditionalMessageHandlers(){this.messaging.on(o.sessionEnded,async()=>{})}}!function(){const t=new J;"loading"===document.readyState?document.addEventListener("DOMContentLoaded",()=>t.initialize()):t.initialize()}()}();
			// END: src/googleMeetContent.js
			
			// START: src/googleMeetPageContext.js
			!function(){"use strict";class e{handlers=new Map;pendingMessages=[];on(e,t){this.handlers.set(e,t);const n=this.pendingMessages.filter(t=>t.type===e);if(n.length>0){this.pendingMessages=this.pendingMessages.filter(t=>t.type!==e);for(const e of n)this.handleIncomingMessage(e)}return()=>this.handlers.delete(e)}async send(e,t,n){const s={id:this.generateId(),type:e,data:t,source:this.getContext(),target:n};this.sendMessage(s)}async relay(e,t,n){const s={id:this.generateId(),type:e,data:t,source:this.getContext(),target:n};this.sendMessage(s)}async handleIncomingMessage(e){if(!this.handlers.has(e.type))return console.warn("["+this.getContext()+"] No handler registered for type "+e.type+", pushing to pendingMessages queue.",e),void this.pendingMessages.push(e);const t=this.handlers.get(e.type);if(t)try{await t(e.data)}catch(n){console.warn(`[${this.getContext()}] Handler error:`,n)}else console.warn(`[${this.getContext()}] No handler for message type:`,e.type,e)}generateId(){return`${Date.now()}-${Math.random().toString(36).substring(2,11)}`}}const t="background",n="content";class s extends e{getContext(){return"page"}initialize(){window.addEventListener("message",e=>{if(e.source!==window)return;const s=e.data;s.type&&s.id&&("page"!==s.target||s.source!==t&&s.source!==n&&"sidepanel"!==s.source||this.handleIncomingMessage(s).catch(e=>{console.error("[Page] Message handling error:",e)}))})}async sendMessage(e){window.postMessage(e,"*")}}let i=null;const r={sessionStarted:"meeting.evt.sessionStarted",sessionEnded:"meeting.evt.sessionEnded",titleDetected:"meeting.evt.titleDetected"},o={enable:"captions.cmd.enable"},a={transcript:"captions.evt.transcript"},c={meetingSession:"meet_messages"},l={resolved:"participant.evt.resolved"};class d{constructor(e){this.messaging=e}messaging;transcript(e){this.messaging.send(a.transcript,e,t)}meetingStarted(e){this.messaging.send(r.sessionStarted,{url:e},t)}meetingEnded(){this.messaging.send(r.sessionEnded,void 0,t),this.messaging.send(r.sessionEnded,void 0,n)}meetingTitle(e){this.messaging.send(r.titleDetected,{title:e},t)}participantResolved(e,n,s){this.messaging.send(l.resolved,{participantId:e,displayName:n,pictureUrl:s},t)}}class h{messaging;forwarder;adapter;isMaster=!1;constructor(){this.messaging=(i||(i=new s,i.initialize()),i),this.forwarder=new d(this.messaging)}async init(){try{this.adapter=this.createAdapter(this.buildCallbacks()),this.useInternalMessageListeners(),await this.adapter.initialize()}catch(e){console.error(`[${this.constructor.name}] Failed to initialize adapter:`,e)}}getMessaging(){return this.messaging}destroy(){this.adapter?.destroy()}useInternalMessageListeners(){this.messaging.on(o.enable,async e=>{this.isMaster=!0,await(this.adapter?.enableCaptions(e.languageCode,e.notifyParticipants))})}buildCallbacks(){return{onTranscript:e=>{this.isMaster&&this.forwarder.transcript(e)},onMeetingStarted:e=>{this.forwarder.meetingStarted(e)},onMeetingEnded:()=>this.forwarder.meetingEnded(),onTitle:e=>this.forwarder.meetingTitle(e),onParticipantResolved:(e,t,n)=>this.forwarder.participantResolved(e,t,n),onError:e=>console.error(`[${this.constructor.name}]`,e)}}}class g{decoder=new TextDecoder;isGzipCompressed(e){return!(!e||e.length<3)&&31===e[0]&&139===e[1]&&8===e[2]}decompressIfNeeded(e){const t=e instanceof Uint8Array?e:new Uint8Array(e);return this.isGzipCompressed(t)?void 0!==window.pako?window.pako.inflate(t):(console.warn("[RTC-EX] Pako not available, returning raw data"),t):this.isGzipCompressed(t.slice(3))?void 0!==window.pako?window.pako.inflate(t.slice(3)):t.slice(3):t}parseNestedTranscript(e){let t="",n="",s=0,i=!1,r=0,o=0;for(;o<e.length;){const a=e[o++];if(void 0===a)break;const c=a>>3,l=7&a;if(0===l){let t=0,n=0;for(;o<e.length;){const s=e[o++];if(t|=(127&s)<<n,!(128&s))break;n+=7}2===c?s=t:3===c?r=t:4===c&&(i=1===t)}else{if(2!==l)break;{let s=0,i=0;for(;o<e.length;){const t=e[o++];if(s|=(127&t)<<i,!(128&t))break;i+=7}const r=e.slice(o,o+s);o+=s,1===c?t=this.decoder.decode(r):6===c&&(n=this.decoder.decode(r))}}}return{participantId:t,text:n,messageId:s,isFinal:i,messageVersion:r}}decodeTranscriptMessage(e){try{let t="",n="",s=0,i=0,r=!1,o=0;for(;o<e.length;){const a=e[o++];if(void 0===a)break;const c=a>>3,l=7&a;if(0===l){let t=0,n=0;for(;o<e.length;){const s=e[o++];if(t|=(127&s)<<n,!(128&s))break;n+=7}2===c?s=t:3===c?i=t:4===c&&(r=1===t)}else{if(2!==l)break;{let a=0,l=0;for(;o<e.length;){const t=e[o++];if(a|=(127&t)<<l,!(128&t))break;l+=7}const d=e.slice(o,o+a);if(o+=a,1===c){const e=this.parseNestedTranscript(d);n=e.participantId||n,t=e.text||t,e.messageId&&(s=e.messageId),e.isFinal&&(r=e.isFinal),e.messageVersion&&(i=e.messageVersion)}else 6===c&&(t=this.decoder.decode(d))}}}return{text:t,participantId:n,messageId:s,messageVersion:i,isFinal:r}}catch(t){return console.error("[RTC-EX] Failed to decode transcript:",t),null}}readLenField(e,t){let n=0,s=0;for(;t<e.length;){const i=e[t++];if(n|=(127&i)<<s,!(128&i))break;s+=7}return t+n>e.length?null:{bytes:e.slice(t,t+n),pos:t+n}}skipFieldValue(e,t,n){switch(n){case 0:for(;t<e.length&&128&e[t++];);return t;case 1:return t+8;case 2:{let n=0,s=0;for(;t<e.length;){const i=e[t++];if(n|=(127&i)<<s,!(128&i))break;s+=7}return t+n}case 5:return t+4;default:return-1}}static DEVICE_ID_RE=/^spaces\/[A-Za-z0-9_-]+\/devices\/[A-Za-z0-9_-]+$/;parseDeviceLeaf(e){let t="",n="",s=0;for(;s<e.length&&!(s>=e.length);){const i=e[s++],r=i>>3,o=7&i;if(2!==o){const t=this.skipFieldValue(e,s,o);if(t<0||t>e.length)break;s=t;continue}const a=this.readLenField(e,s);if(!a)break;s=a.pos,1===r?t=this.decoder.decode(a.bytes):2===r&&(n=this.decoder.decode(a.bytes))}return n&&g.DEVICE_ID_RE.test(t)?{deviceId:t,deviceName:n}:null}decodeMeetingCollection(e){const t=[];try{let n=0;for(;n<e.length;){const s=e[n++],i=s>>3,r=7&s;if(2!==r){const t=this.skipFieldValue(e,n,r);if(t<0||t>=e.length)break;n=t;continue}const o=this.readLenField(e,n);if(!o){n++;continue}if(n=o.pos,2!==i)continue;let a=0;for(;a<o.bytes.length;){const e=o.bytes[a++],n=e>>3,s=7&e;if(2!==s){const e=this.skipFieldValue(o.bytes,a,s);if(e<0||e>=o.bytes.length)break;a=e;continue}const i=this.readLenField(o.bytes,a);if(!i){a++;continue}if(a=i.pos,2!==n)continue;let r=0;for(;r<i.bytes.length;){const e=i.bytes[r++],n=e>>3,s=7&e;if(2!==s){const e=this.skipFieldValue(i.bytes,r,s);if(e<0||e>=i.bytes.length)break;r=e;continue}const o=this.readLenField(i.bytes,r);if(!o){r++;continue}if(r=o.pos,2!==n)continue;const a=this.parseDeviceLeaf(o.bytes);a&&t.push(a)}}}}catch(n){console.error("[RTC-EX] Failed to decode meeting collection:",n)}return t}decodeCollectionMessage(e){try{const t=(e,t)=>{let n=0;for(;n<e.length;){const s=e[n++],i=s>>3,r=7&s;if(2!==r){const t=this.skipFieldValue(e,n,r);if(t<0||t>e.length)break;n=t;continue}const o=this.readLenField(e,n);if(o){if(n=o.pos,i===t)return o.bytes}else n++}return null},n=t(e,1);if(!n)return null;const s=t(n,2);if(!s)return null;const i=t(s,13);if(!i)return null;const r=t(i,1);if(!r)return null;const o=t(r,2);return o?this.parseDeviceLeaf(o):null}catch(t){return console.error("[RTC-EX] Failed to decode collection message:",t),null}}}class p{decoder=new g;wrappedChannels=new Set;channelsByLabel=new Map;config;constructor(e){this.config=e||{}}getChannel(e){return this.channelsByLabel.get(e)??null}closeAll(){for(const e of this.wrappedChannels)try{"closed"!==e.readyState&&"closing"!==e.readyState&&e.close()}catch{}this.wrappedChannels.clear(),this.channelsByLabel.clear()}wrapDataChannel(e){this.wrappedChannels.has(e)||(this.wrappedChannels.add(e),this.channelsByLabel.set(e.label,e),e.addEventListener("open",()=>{this.config.onOpenChannel?.(e)}),e.addEventListener("message",t=>{this.handleChannelMessage(e,t)}),e.addEventListener("close",()=>{this.wrappedChannels.delete(e),this.channelsByLabel.delete(e.label),this.config.onCloseChannel?.(e)}),e.addEventListener("error",e=>{const t=e instanceof ErrorEvent?new Error(e.message||"Data channel error"):new Error("Data channel error");this.config.onError?.(t)}))}handleChannelMessage(e,t){try{const n=this.decoder.decompressIfNeeded(t.data);if("collections"===e.label){const e=this.decoder.decodeCollectionMessage(n);return void(e&&this.config.onParticipantDetected?.(e.deviceId,e.deviceName))}if("media-session"===e.label)return;if("captions"===e.label){const e=this.decoder.decodeTranscriptMessage(n);return void(e&&this.config.onTranscript?.(e))}if("meet_messages"===e.label)return void this.config.onMeetMessages?.(n);console.warn(`[RTC-EX] Unhandled channel label: ${e.label}`)}catch(n){console.error("[RTC-EX] Error processing message:",n),this.config.onError?.(n)}}}const u="https://meet.google.com/$rpc/google.rtc.meetings.v1.MeetingSpaceService/SyncMeetingSpaceCollections",f="riter:session:history";class m{mediaSessionInfo=null;sessionHistory=[];originalFetch;decoder=new g;onParticipantDetected;constructor(e){this.originalFetch=window.fetch.bind(window),this.sessionHistory=this.loadHistory(),this.onParticipantDetected=e}loadHistory(){try{const e=localStorage.getItem(f);return e?JSON.parse(e):[]}catch{return[]}}saveHistory(){try{localStorage.setItem(f,JSON.stringify(this.sessionHistory))}catch{}}getCurrentMeetId(){return window.location.pathname.replace(/^\//,"").split("/")[0]??""}getMediaSessionInfo(){if(this.mediaSessionInfo)return this.mediaSessionInfo;const e=this.getCurrentMeetId();let t=null;if(e)for(let n=this.sessionHistory.length-1;n>=0;n--)if(this.sessionHistory[n].meetId===e){t=this.sessionHistory[n];break}return t&&console.warn(`[RTC-EX] ⚠️ No live session — falling back to cached session for room "${e}": ${t.sessionId}`),t}getSessionHistory(){return[...this.sessionHistory]}upsertSession(e){const t=this.sessionHistory.findIndex(t=>t.meetId===e.meetId);-1!==t?this.sessionHistory[t]=e:this.sessionHistory.push(e),this.saveHistory()}intercept(){window.fetch=(...e)=>{const[t,n]=e;"https://meet.google.com/$rpc/google.rtc.meetings.v1.MeetingDeviceService/CreateMeetingDevice"===t&&n?.body&&n?.headers?this.handleCreateMeetingDevice(n):"https://meet.google.com/$rpc/google.rtc.meetings.v1.MediaSessionService/GetMediaSession"===t&&n?.body?this.handleGetMediaSession(n):"https://meet.google.com/$rpc/google.rtc.meetings.v1.MediaSessionService/UpdateMediaSession"===t&&n?.body?this.handleUpdateMediaSession(n):t===u&&n?.body&&this.handleSyncCollectionsRequest(n);const s=this.originalFetch.apply(window,e);return t===u&&s.then(e=>{e.ok&&e.clone().text().then(e=>{this.handleSyncCollectionsResponse(e)}).catch(e=>{console.error("[RTC-EX] Failed to read SyncMeetingSpaceCollections response:",e)})}).catch(e=>{console.error("[RTC-EX] SyncMeetingSpaceCollections fetch failed:",e)}),s}}restore(){window.fetch=this.originalFetch}handleCreateMeetingDevice(e){try{const t=/\b[A-Za-z0-9_-]{28}\b/,n=(new TextDecoder).decode(e.body).match(t);if(n){const t={sessionId:this.mediaSessionInfo?.sessionId??n[0],meetId:this.getCurrentMeetId(),headers:this.extractHeaders(e.headers)};this.mediaSessionInfo=t,this.upsertSession(t)}}catch(t){console.error("[RTC-EX] Failed to intercept createMeetingDevice:",t)}}handleGetMediaSession(e){try{const t=/mediasessions\/([A-Za-z0-9\-_]+)/,n=("string"==typeof e.body?e.body:(new TextDecoder).decode(e.body)).match(t);if(n){const t={sessionId:n[1],meetId:this.getCurrentMeetId(),headers:this.extractHeaders(e.headers)};this.mediaSessionInfo=t,this.upsertSession(t)}}catch(t){console.error("[RTC-EX] Failed to intercept getMediaSession:",t)}}handleUpdateMediaSession(e){try{const t="string"==typeof e.body?e.body:(new TextDecoder).decode(e.body),n=/mediasessions\/([A-Za-z0-9\-_]+)/,s=t.match(n);if(s){const t={sessionId:s[1],meetId:this.getCurrentMeetId(),headers:this.extractHeaders(e.headers)};this.mediaSessionInfo=t,this.upsertSession(t)}}catch(t){console.error("[RTC-EX] Failed to intercept updateMediaSession:",t)}}handleSyncCollectionsRequest(e){}handleSyncCollectionsResponse(e){if(this.onParticipantDetected)try{const t=Uint8Array.from(atob(e.trim()),e=>e.charCodeAt(0)),n=this.decoder.decodeMeetingCollection(t);for(const e of n)this.onParticipantDetected(e.deviceId,e.deviceName)}catch(t){console.error("[RTC-EX] Failed to handle SyncMeetingSpaceCollections response:",t)}else console.warn("[RTC-EX] onParticipantDetected is not set, skipping")}extractHeaders(e){if(!e)return{};if(e instanceof Headers){const t=[];return e.forEach((e,n)=>{t.push([n,e])}),Object.fromEntries(t)}return Array.isArray(e)?Object.fromEntries(e):e}}class y{static MONITORED_CHANNELS=["captions","collections","meet_messages","media-session"];originalRTC;activePeerConnection=null;channelManager;constructor(e){if(!window.RTCPeerConnection)throw new Error("RTCPeerConnection not available");this.originalRTC=window.RTCPeerConnection,this.channelManager=e}getActivePeerConnection(){return this.activePeerConnection}restore(){window.RTCPeerConnection=this.originalRTC,this.activePeerConnection=null}intercept(){const e=this.originalRTC,t=this.channelManager,n=e=>{this.activePeerConnection=e};window.RTCPeerConnection=class extends e{constructor(e){super(e),n(this);const s=this.createDataChannel;this.createDataChannel=(e,n)=>{const i=s.call(this,e,n);return y.MONITORED_CHANNELS.includes(e)&&t.wrapDataChannel(i),i},this.addEventListener("datachannel",e=>{const n=e.channel;y.MONITORED_CHANNELS.includes(n.label)&&t.wrapDataChannel(n)}),this.addEventListener("connectionstatechange",()=>{}),this.addEventListener("iceconnectionstatechange",()=>{})}}}}class C{fetchInterceptor;rtcInterceptor;channelManager;config;constructor(e){this.config={transcription:{languageCode:e?.transcription?.languageCode||"en-US",autoEnable:e?.transcription?.autoEnable??!1},onTranscript:e?.onTranscript,onMeetMessages:e?.onMeetMessages,onCloseChannel:e?.onCloseChannel,onOpenChannel:e?.onOpenChannel,onParticipantDetected:e?.onParticipantDetected,onReady:e?.onReady,onError:e?.onError},this.channelManager=new p(this.config),this.fetchInterceptor=new m(this.config.onParticipantDetected),this.rtcInterceptor=new y(this.channelManager)}initialize(){this.fetchInterceptor.intercept(),this.rtcInterceptor.intercept(),this.config.transcription?.autoEnable&&this.waitForSessionAndEnable()}async enableCaptions(e){const t=e||this.config.transcription?.languageCode,n=this.channelManager.getChannel("media-session");return n&&"open"===n.readyState?(await this.ensureCaptionsChannelOpen(),function(e,t,n){if("open"!==e.readyState)return Promise.resolve(!1);const s=n.lastCommandSeq+1,i=n.lastAckSeq+1,r=function(e,t){const n=b(I(1,t),I(2,t)),s=b(M(1,M(9,n)),M(2,I(1,"client_config.caption_config"))),i=b(S(1,e),M(3,s));return M(1,M(2,i))}(s,t),o=v(i),a=v(i+1);return new Promise(t=>{const s=setTimeout(()=>c(!1),5e3);function i(e){const t=function(e){try{if(10!==e[0])return;let t=1;for(;e[t]>=128;)t++;if(t++,8!==e[t])return;for(t++;e[t]>=128;)t++;if(t++,34!==e[t])return;for(t++;e[t]>=128;)t++;if(t++,8!==e[t])return;return t++,e[t]}catch{return}}(new Uint8Array(e.data));void 0!==t?t>n.lastIncomingSeq?(n.lastIncomingSeq=t,c(!0)):c(!1):c(!0)}function c(n){clearTimeout(s),e.removeEventListener("message",i),t(n)}e.addEventListener("message",i),e.send(r.slice()),e.send(o.slice()),e.send(a.slice())})}(n,t,{lastCommandSeq:0,lastAckSeq:0,lastIncomingSeq:0})):(this.config.onError?.(new Error("media-session channel is not available or not open")),!1)}getMediaSessionInfo(){return this.fetchInterceptor.getMediaSessionInfo()}getSessionHistory(){return this.fetchInterceptor.getSessionHistory()}destroy(){this.fetchInterceptor.restore(),this.rtcInterceptor.restore(),this.channelManager.closeAll()}async waitForSessionAndEnable(){let e=0;const t=setInterval(async()=>{e++;const n=this.fetchInterceptor.getMediaSessionInfo();n?.sessionId?(clearInterval(t),await this.enableCaptions(this.config.transcription?.languageCode)):e>=30&&(clearInterval(t),this.config.onError?.(new Error("Auto-enable failed: no session ID after maximum attempts")))},1e3)}async ensureCaptionsChannelOpen(){const e=this.channelManager.getChannel("captions");if("open"===e?.readyState)return!0;if("connecting"===e?.readyState)return this.waitForChannelOpen(e);const t=this.rtcInterceptor.getActivePeerConnection();if(!t||"connected"!==t.connectionState)return!1;try{const e=t.createDataChannel("captions",{ordered:!0,maxRetransmits:10,id:50001});return this.waitForChannelOpen(e)}catch(n){const e=n instanceof Error?n:new Error(String(n));return this.config.onError?.(e),!1}}waitForChannelOpen(e){return"open"===e.readyState?Promise.resolve(!0):new Promise(t=>{const n=setTimeout(()=>t(!1),5e3);e.addEventListener("open",()=>{clearTimeout(n),t(!0)},{once:!0})})}}function w(e){const t=[];for(;e>127;)t.push(127&e|128),e>>>=7;return t.push(e),new Uint8Array(t)}function b(...e){const t=e.reduce((e,t)=>e+t.length,0),n=new Uint8Array(t);let s=0;for(const i of e)n.set(i,s),s+=i.length;return n}function M(e,t){return b(w(e<<3|2),w(t.length),t)}function S(e,t){return b(w(e<<3),w(t))}function I(e,t){return M(e,(new TextEncoder).encode(t))}function v(e){return M(1,M(1,b(S(2,e),S(3,1))))}class E{rtc;constructor(e){this.rtc=new C({transcription:{languageCode:"en-US",autoEnable:!1},onTranscript:e.onTranscript,onOpenChannel:t=>{t.label===c.meetingSession&&e.onMeetingStarted(window.location.href)},onCloseChannel:t=>{t.label===c.meetingSession&&e.onMeetingEnded()},onMeetMessages:()=>{},onParticipantDetected:(t,n)=>{e.onParticipantResolved?.(t,n,"")},onReady:()=>{},onError:e.onError})}initialize(){this.rtc.initialize()}async enableCaptions(e,t){await this.rtc.enableCaptions(e)}destroy(){this.rtc.destroy()}}class T extends h{createAdapter(e){return new E(e)}}let D=null;!function(){try{D=new T,D.init()}catch(e){console.error("[PageContext] Failed to initialize:",e)}}()}();
			// END: src/googleMeetPageContext.js
			
			// START: src/msTeamsContent.js
			!function(){"use strict";const e={sessionEnded:"meeting.evt.sessionEnded",tabClosed:"meeting.evt.tabClosed",guestsJoined:"meeting.evt.guestsJoined"},t={isActive:"meeting.qry.isActive"},s={enable:"captions.cmd.enable"},n={message:"hub.evt.message"};class a{handlers=new Map;pendingMessages=[];on(e,t){this.handlers.set(e,t);const s=this.pendingMessages.filter(t=>t.type===e);if(s.length>0){this.pendingMessages=this.pendingMessages.filter(t=>t.type!==e);for(const e of s)this.handleIncomingMessage(e)}return()=>this.handlers.delete(e)}async send(e,t,s){const n={id:this.generateId(),type:e,data:t,source:this.getContext(),target:s};this.sendMessage(n)}async relay(e,t,s){const n={id:this.generateId(),type:e,data:t,source:this.getContext(),target:s};this.sendMessage(n)}async handleIncomingMessage(e){if(!this.handlers.has(e.type))return console.warn("["+this.getContext()+"] No handler registered for type "+e.type+", pushing to pendingMessages queue.",e),void this.pendingMessages.push(e);const t=this.handlers.get(e.type);if(t)try{await t(e.data)}catch(s){console.warn(`[${this.getContext()}] Handler error:`,s)}else console.warn(`[${this.getContext()}] No handler for message type:`,e.type,e)}generateId(){return`${Date.now()}-${Math.random().toString(36).substring(2,11)}`}}const i="background",r="content",o="page";class g extends a{getContext(){return"content"}initialize(){chrome.runtime.onMessage.addListener(e=>{e.target!==o||e.source!==i&&"sidepanel"!==e.source||this.sendMessage(e),e.target!==r&&e.target||this.handleIncomingMessage(e)}),window.addEventListener("message",e=>{if(e.source!==window&&null!==e.source)return;const t=e.data;t.type&&t.id&&(t.target===i&&t.source===o&&this.sendMessage(t),t.target!==r&&t.target||this.handleIncomingMessage(t))})}async sendMessage(e){if(e.target===i){if(!chrome.runtime?.id)return;try{chrome.runtime.sendMessage(e)}catch(t){if(t instanceof Error&&t.message.includes("Extension context invalidated"))return;throw t}}else{if(e.target!==o)throw new Error(`[Content] Invalid target for message: ${e.target}`);window.postMessage(e,"*")}}}let d=null;const c="riter:meeting.active";class l{async setInMeeting(e){await chrome.storage.local.set({[c]:e})}async isInMeeting(){return(await chrome.storage.local.get(c))[c]||!1}async clearMeetingState(){await chrome.storage.local.remove(c)}}class h{messaging;meetingStateStorage=new l;adapter;constructor(){this.messaging=(d||(d=new g,d.initialize()),d)}initialize(){this.adapter=this.createAdapter(),this.adapter.initialize({onParticipantsDetected:(t,s)=>{this.messaging.send(e.guestsJoined,{meetId:s,guests:t.map(e=>({id:e.id,fullName:e.fullName,pictureUrl:e.pictureUrl}))},i)},onMeetingActiveCheck:async()=>void 0!==this.adapter&&this.checkMeetingActive(),onError:e=>console.error(`[${this.constructor.name}] Adapter error:`,e)}),this.registerMessageHandlers(),this.registerAdditionalMessageHandlers(),this.installUnloadHandler()}checkMeetingActive(){return!1}registerAdditionalMessageHandlers(){}registerMessageHandlers(){this.messaging.on(s.enable,async()=>{await(this.adapter?.onCaptionsEnabled())}),this.messaging.on(t.isActive,async()=>{const e=this.checkMeetingActive();await this.meetingStateStorage.setInMeeting(e)}),this.messaging.on(n.message,e=>{const t=e;"CloseMeeting"!==t.type&&"ForceCloseMeeting"!==t.type||this.adapter?.onMeetingClosed()})}installUnloadHandler(){window.addEventListener("beforeunload",()=>{this.meetingStateStorage.setInMeeting(!1),this.adapter?.destroy(),this.messaging.send(e.tabClosed,{url:window.location.href},i)})}}const u=['button[aria-label="Leave"]','[data-tid="hangup-button"]'];class m{constructor(e){}initialize(e){}async onCaptionsEnabled(){}async onMeetingClosed(){}isInMeeting(){return u.some(e=>Boolean(document.querySelector(e)))}destroy(){}}class p extends h{createAdapter(){return new m(this.messaging)}checkMeetingActive(){return Boolean(document.querySelector('button[aria-label="Leave"]'))}registerAdditionalMessageHandlers(){this.messaging.on(e.sessionEnded,async()=>{await(new l).clearMeetingState()})}}let M=null;!function(){try{M=new p,M.initialize()}catch(e){console.error("[PageContext] Failed to initialize:",e)}}()}();
			// END: src/msTeamsContent.js
			
			// START: src/msTeamsPageContext.js
			!function(){"use strict";class e{handlers=new Map;pendingMessages=[];on(e,t){this.handlers.set(e,t);const n=this.pendingMessages.filter(t=>t.type===e);if(n.length>0){this.pendingMessages=this.pendingMessages.filter(t=>t.type!==e);for(const e of n)this.handleIncomingMessage(e)}return()=>this.handlers.delete(e)}async send(e,t,n){const i={id:this.generateId(),type:e,data:t,source:this.getContext(),target:n};this.sendMessage(i)}async relay(e,t,n){const i={id:this.generateId(),type:e,data:t,source:this.getContext(),target:n};this.sendMessage(i)}async handleIncomingMessage(e){if(!this.handlers.has(e.type))return console.warn("["+this.getContext()+"] No handler registered for type "+e.type+", pushing to pendingMessages queue.",e),void this.pendingMessages.push(e);const t=this.handlers.get(e.type);if(t)try{await t(e.data)}catch(n){console.warn(`[${this.getContext()}] Handler error:`,n)}else console.warn(`[${this.getContext()}] No handler for message type:`,e.type,e)}generateId(){return`${Date.now()}-${Math.random().toString(36).substring(2,11)}`}}const t="background",n="content";class i extends e{getContext(){return"page"}initialize(){window.addEventListener("message",e=>{if(e.source!==window)return;const i=e.data;i.type&&i.id&&("page"!==i.target||i.source!==t&&i.source!==n&&"sidepanel"!==i.source||this.handleIncomingMessage(i).catch(e=>{console.error("[Page] Message handling error:",e)}))})}async sendMessage(e){window.postMessage(e,"*")}}let s=null;const a={sessionStarted:"meeting.evt.sessionStarted",sessionEnded:"meeting.evt.sessionEnded",titleDetected:"meeting.evt.titleDetected"},o={enable:"captions.cmd.enable"},r={transcript:"captions.evt.transcript"},c={resolved:"participant.evt.resolved"};class l{constructor(e){this.messaging=e}messaging;transcript(e){this.messaging.send(r.transcript,e,t)}meetingStarted(e){this.messaging.send(a.sessionStarted,{url:e},t)}meetingEnded(){this.messaging.send(a.sessionEnded,void 0,t),this.messaging.send(a.sessionEnded,void 0,n)}meetingTitle(e){this.messaging.send(a.titleDetected,{title:e},t)}participantResolved(e,n,i){this.messaging.send(c.resolved,{participantId:e,displayName:n,pictureUrl:i},t)}}class d{messaging;forwarder;adapter;isMaster=!1;constructor(){this.messaging=(s||(s=new i,s.initialize()),s),this.forwarder=new l(this.messaging)}async init(){try{this.adapter=this.createAdapter(this.buildCallbacks()),this.useInternalMessageListeners(),await this.adapter.initialize()}catch(e){console.error(`[${this.constructor.name}] Failed to initialize adapter:`,e)}}getMessaging(){return this.messaging}destroy(){this.adapter?.destroy()}useInternalMessageListeners(){this.messaging.on(o.enable,async e=>{this.isMaster=!0,await(this.adapter?.enableCaptions(e.languageCode,e.notifyParticipants))})}buildCallbacks(){return{onTranscript:e=>{this.isMaster&&this.forwarder.transcript(e)},onMeetingStarted:e=>{this.forwarder.meetingStarted(e)},onMeetingEnded:()=>this.forwarder.meetingEnded(),onTitle:e=>this.forwarder.meetingTitle(e),onParticipantResolved:(e,t,n)=>this.forwarder.participantResolved(e,t,n),onError:e=>console.error(`[${this.constructor.name}]`,e)}}}function u(){const e=window.location.pathname.match(/^\/light-meetings\/([^/?#]+)/);return e?e[1]:void 0}function g(){const e=window.location.hash.match(/meetup-join\/([^/]+)/);return e?decodeURIComponent(e[1]):void 0}function p(e,t=100,n){return new Promise((i,s)=>{if(n?.aborted)return void s(new DOMException("Aborted","AbortError"));const a=setInterval(()=>{if(n?.aborted)return clearInterval(a),void s(new DOMException("Aborted","AbortError"));const t=e();t&&(clearInterval(a),i(t))},t);n?.addEventListener("abort",()=>{clearInterval(a),s(new DOMException("Aborted","AbortError"))})})}const h=e=>new Promise(t=>setTimeout(t,e));function f(e,t){return Promise.race([e,new Promise((e,n)=>setTimeout(()=>n(new Error("timeout")),t))])}function m(e,t,n){if(t&&!t.startClosedCaption)return null;const[,i]=e.id.split("/");return{deviceId:e.userId,deviceName:n(e,t),messageId:`${e.timestampAudioSent}/${e.userId}`,messageVersion:parseInt(i,10),text:e.text,isFinal:e.isFinal??!1,languageCode:t?.getClosedCaptionsLanguage?.()??"en",raw:e}}class y{_buf=[];_lastFlush=0;_iv=void 0;_onFlush;constructor(e){this._onFlush=e}push(e){const t=this._buf.findIndex(t=>t.messageId===e.messageId);t>-1?this._buf[t].messageVersion<=e.messageVersion&&this._buf.splice(t,1,e):this._buf.push(e),this._ensureInterval()}_ensureInterval(){Date.now()-this._lastFlush<2e3||(void 0!==this._iv&&clearInterval(this._iv),this._iv=setInterval(()=>{if(this._lastFlush=Date.now(),this._buf.length){const e=[...this._buf];this._buf=[],this._onFlush(e)}},500))}stop(){void 0!==this._iv&&(clearInterval(this._iv),this._iv=void 0)}}function v(){let e=function(e,t){for(const n in e)if(n.startsWith("jQuery")){const i=e[n];if(!t||t(i))return i}}(document.documentElement,e=>null!=e&&"object"==typeof e&&"$ngControllerController"in e)?.$ngControllerController;if(e);else{const t=window.msteamscalling;t&&"function"==typeof t.deref&&(e=t.deref())}if(!e)return;if(!e.callingService)return;const t=e.callingService.callRegistry?.calls;if(!t?.length)return;const n=e.callingService;if(n.getActiveCall){const e=n.getActiveCall();if(!e)return;if(3!==e.state)return;return{call:e,callingService:n}}const i=n.lastOrCurrentCallInfo;if(!i)return;const s=n.callRegistry.calls.find(e=>e._callId===i.callId);return s?{call:s,callingService:n}:void 0}async function w(e){const t=new DecompressionStream("gzip"),n=t.writable.getWriter();await n.write(new Uint8Array(e)),await n.close();const i=t.readable.getReader(),s=[];for(;;){const{done:e,value:t}=await i.read();if(e)break;s.push(t)}const a=s.reduce((e,t)=>e+t.length,0),o=new Uint8Array(a);let r=0;for(const c of s)o.set(c,r),r+=c.length;return(new TextDecoder).decode(o)}async function b(e,t=new Map,n={}){const i=window.location.pathname.startsWith("/light-meetings/")?"LightMeetings":"V2",s=new y(t=>{for(const n of t)e.onMessage(n)}),a=function(e,t){return function(n,i){if(e.has(n.userId))return e.get(n.userId);function s(i){return e.set(n.userId,i),t.onParticipantDetected?.(n.userId,i),i}const a=i?.getParticipants?.()??i?.participants??i?.remoteParticipants??[];for(const e of a)if((e.mri??e.userId??e.id??e._userId)===n.userId){const t=e.displayName??e.name??e._displayName??e.$$state?.value?.displayName;if(t)return s(t)}const o=i?.getSelfParticipant?.()?.$$state?.value?.displayName;if(o)return s(o);const r=i?.currentUserSkypeIdentity?.displayName;return r?s(r):n.userId}}(t,e);let o,r,c,l,d=null,b=!1,C=!1;const I=new AbortController;let M,S;if("LightMeetings"===i){r=function(){let t,n;const i=XMLHttpRequest.prototype.setRequestHeader,s=XMLHttpRequest.prototype.open,a=XMLHttpRequest.prototype.send;return XMLHttpRequest.prototype.setRequestHeader=function(e,t){return this.__tqHeaders??={},this.__tqHeaders[e.toLowerCase()]=t,i.call(this,e,t)},XMLHttpRequest.prototype.open=function(e,t){const n="string"==typeof t?t:t.toString();return n.includes("flightproxy.teams.microsoft.com")&&n.includes("/v2/oncommand/")&&(this.__tqOnCommandUrl=n),s.apply(this,arguments)},XMLHttpRequest.prototype.send=function(i){const s=this.__tqOnCommandUrl;if(s)try{let o="";"string"==typeof i?o=i:(i instanceof ArrayBuffer||ArrayBuffer.isView(i))&&(o=(new TextDecoder).decode(i));const r=o?JSON.parse(o):{};if("setLanguage"===r.action){const i=function(e){const t=e.match(/\/api\/v2\/ep\/([^/]+)\/v2\/oncommand\/([^/?]+)/);return t?{endpoint:t[1],commandId:t[2]}:null}(s),o=this.__tqHeaders??{};i&&r.participantMri&&r.participantLegId&&(t={participantMri:r.participantMri,participantLegId:r.participantLegId,endpoint:i.endpoint,commandId:i.commandId,headers:o});const c=r.actionParameters,l=n??c?.subtitleLanguages?.[0]??c?.spokenLanguage??"en-us";r.actionParameters={spokenLanguage:l,type:"setLanguage"};const d=JSON.stringify(r),u=this.onreadystatechange;return this.onreadystatechange=function(t){return 4===this.readyState&&200===this.status&&(i=l,e.onLanguageChanged?.(i),n=void 0),u?.call(this,t);var i},delete this.__tqOnCommandUrl,a.call(this,d)}delete this.__tqOnCommandUrl}catch{}return a.apply(this,arguments)},{getSession:()=>t,setPendingLanguage:e=>{n=e},uninstall:()=>{XMLHttpRequest.prototype.setRequestHeader=i,XMLHttpRequest.prototype.open=s,XMLHttpRequest.prototype.send=a}}}(),function(e,t,n){if(!window.RTCPeerConnection)return;const i=window.RTCPeerConnection,s=i.prototype.createDataChannel;let a=!1;i.prototype.createDataChannel=function(i,o){const r=s.call(this,i,o);if("main-channel"===r.label){const i=()=>{a||(a=!0,t.onMeetingDetected?.(u(),"LightMeetings"))};"open"===r.readyState?i():r.addEventListener("open",i,{once:!0}),r.addEventListener("close",()=>{a=!1,t.onMeetingDetected?.(void 0,"LightMeetings")},{once:!0}),r.addEventListener("message",i=>{try{const s=i.data,a="string"==typeof s?s:(new TextDecoder).decode(s),o=a.indexOf("["),r=a.indexOf("{"),c=-1===o&&-1===r?-1:-1===o?r:-1===r?o:Math.min(o,r);if(-1===c)return;const l=JSON.parse(a.slice(c));if(t.onRawFrame?.(l,"LightMeetings"),Array.isArray(l.recognitionResults))for(const t of l.recognitionResults){if(!("timestampAudioSent"in t))continue;const i=m(t,void 0,n);i&&e.push(i)}}catch{}});const s=this,o=e=>{"closing"===r.readyState||"closed"===r.readyState?s.createDataChannel(e,{ordered:!0,maxRetransmits:10,id:3}):setTimeout(()=>o(e),1e3)};o("main-channel")}return r},window.RTCPeerConnection=i}(s,e,a),c=function(e){if("undefined"==typeof window||!window.WebSocket)return()=>{};const t=window.WebSocket;function n(n,i){const s="string"==typeof n?n:n.toString(),a=new t(s,i);return s.includes("teams.microsoft.com")&&a.addEventListener("message",t=>{if("string"==typeof t.data&&t.data.startsWith("3:::"))try{const n=JSON.parse(t.data.slice(4));if(!n.url?.includes("/rosterUpdate/"))return;!async function(e,t){try{let n;if(e instanceof ArrayBuffer||ArrayBuffer.isView(e)&&!(e instanceof DataView)){const t=e instanceof ArrayBuffer?e:e.buffer.slice(0);n=await w(t)}else{if("string"!=typeof e)return;if(e.startsWith("{")||e.startsWith("["))n=e;else{const t=Uint8Array.from(atob(e),e=>e.charCodeAt(0));n=await w(t.buffer)}}const i=JSON.parse(n);if(!i.participants)return;for(const e of Object.values(i.participants)){const n=e.details?.id,i=e.details?.displayName;n&&i&&t.onParticipantDetected?.(n,i)}}catch{}}(n.body,e)}catch{}}),a}return n.prototype=t.prototype,n.CONNECTING=t.CONNECTING,n.OPEN=t.OPEN,n.CLOSING=t.CLOSING,n.CLOSED=t.CLOSED,window.WebSocket=n,()=>{window.WebSocket=t}}(e);const t=u();t&&e.onMeetingDetected?.(t,"LightMeetings")}function E(t){C||(e.onMeetingDetected?.(t,"V2"),e.onMeetingId?.(t),M=setInterval(()=>{C||g()||(clearInterval(M),M=void 0,b=!1,d=null,e.onMeetingDetected?.(void 0,"V2"),e.onMeetingId?.(void 0),e.onMeetingEnded?.(),C||(S=setTimeout(()=>L(),5e3)))},500))}async function L(){if("LightMeetings"===i)return;const t=g();if(t)return void E(t);const n=new AbortController,s=()=>n.abort();I.signal.addEventListener("abort",s);let a=!1;const r=()=>{const e=g();e&&(e=>{C||a||(a=!0,n.abort(),E(e))})(e)};window.addEventListener("hashchange",r),window.addEventListener("popstate",r);const c=setInterval(()=>{C||a||r()},500);let u;try{u=await p(()=>v()??null,100,n.signal)}catch{return clearInterval(c),window.removeEventListener("hashchange",r),window.removeEventListener("popstate",r),void I.signal.removeEventListener("abort",s)}if(clearInterval(c),window.removeEventListener("hashchange",r),window.removeEventListener("popstate",r),I.signal.removeEventListener("abort",s),!C&&!a){if(l=u,async function(e,t){const n=e.getCallingConversation?.();if(n?.meetingInfo?.subject)t.onTitle?.(n.meetingInfo.subject);else{if(n?.unParsedMeetingInfo)try{const e=JSON.parse(n.unParsedMeetingInfo)?.subject;if(e)return void t.onTitle?.(e)}catch{}if(e.getCallingConversationAsync)try{const n=await f(e.getCallingConversationAsync(),2e3),i=n?.conversation?.threadProperties?.topic;if(i)return void t.onTitle?.(i)}catch{}if(e.getMeetingDetails)try{const n=await f(e.getMeetingDetails(),2e3);if(n?.meetingChatProperties){const e=JSON.parse(n.meetingChatProperties)?.subject;e&&t.onTitle?.(e)}}catch{}}}(u.call,e),e.onMeetingDetected?.(u.call._callId,"V2"),e.onMeetingId?.(u.call._callId),null!==d){const e=d??void 0;d=null,await _(u,e)}M=setInterval(()=>{const t=u.callingService;(t.getActiveCall?null===t.getActiveCall():0===t.callRegistry.calls.length)&&(clearInterval(M),M=void 0,l=void 0,b=!1,d=null,o?.(),o=void 0,e.onMeetingDetected?.(void 0,"V2"),e.onMeetingId?.(void 0),e.onMeetingEnded?.(),C||(S=setTimeout(()=>L(),5e3)))},500)}}async function _(t,n){b||(b=!0,o=await async function(e,t,n,i,s){const a=new MutationObserver(e=>{for(const t of e)"childList"===t.type&&document.getElementById("ufd_title_ClosedCaptionsStartFailed")&&(i.onCaptionsSetupFailed?.(),a.disconnect())});a.observe(document.body,{childList:!0,subtree:!0}),i.onMeetingId?.(e._callId),await p(()=>{const e=t.getActiveCall?.();return e?.callGotConnected?"connected":e&&0!==t.callRegistry.calls.length&&3===e.state?null:"disconnected"});const o=t.getActiveCall?.()??e;if(!o.startClosedCaption)throw new Error("Closed captions not available on this call");o.startClosedCaption(),await p(()=>o.closedCaptionsHaveBeenStarted?.()&&2===o.getClosedCaptionStatus?.()),document.getElementById("captions-panel-dismiss-button")?.click();const r=o.dataChannel?.subscriptions?.find(e=>"remoteUserEventsReceived"===e.eventHandler?.on?.name)?.eventHandler?.on;if(!r)throw new Error("Could not find remoteUserEventsReceived subscription");const c=r.handler;r.handler=function(e,t){if("3"===e)try{const e=JSON.parse(t);if(i.onRawFrame?.(e,"V2"),null!==e&&"object"==typeof e&&"recognitionResults"in e&&Array.isArray(e.recognitionResults))for(const t of e.recognitionResults){const e=m(t,o,s);e&&n.push(e)}}catch{}return c.call(this,e,t)},a.disconnect();const l=setInterval(()=>{o.role&&(i.onOrganiser?.(o._callId,"admin"===o.role,o.getClosedCaptionsLanguage?.()??"en"),clearInterval(l))},100);return()=>{clearInterval(l),r.handler=c}}(t.call,t.callingService,s,e,a),n&&t.call.setClosedCaptionsLanguage?.(n))}return L(),{async enableCaptions(e){"LightMeetings"!==i?l?await _(l,e):d=e??void 0:r?.setPendingLanguage(e)},async setLanguage(t){if("V2"===i){const e=v();if(!e)throw new Error("No active V2 call found");return void e.call.setClosedCaptionsLanguage?.(t)}const n=r?.getSession();if(n){const i=`https://api.flightproxy.teams.microsoft.com/api/v2/ep/${n.endpoint}/v2/oncommand/${n.commandId}`,s={timestamp:(new Date).toISOString(),participantMri:n.participantMri,participantLegId:n.participantLegId,action:"setLanguage",mode:"transcription",processingModes:["closedCaptions"],actionParameters:{spokenLanguage:t,type:"setLanguage"}},a={...n.headers,requestid:crypto.randomUUID(),"content-type":"application/json"};if((await fetch(i,{method:"POST",headers:a,body:JSON.stringify(s)})).ok)return void e.onLanguageChanged?.(t)}if(r?.setPendingLanguage(t),!(await async function(){const e=document.getElementById("callingButtons-showMoreBtn");if(!e)return!1;e.click(),await h(500);const t=document.getElementById("closed-captions-button");if(!t)return!1;let n;t.click();try{n=await f(p(()=>document.querySelector('[data-tid="closed-captions-settings-menu-trigger-button"]')),1e4)}catch{return!1}if(!n)return!1;n.click(),await h(500);const i=document.querySelector('[data-tid="callingCaptions-subtitlesLanguages"]');if(!i)return!1;let s;i.click(),await h(500);try{s=await f(p(()=>document.querySelector('[role="listbox"]')),5e3)}catch{return!1}if(!s)return!1;const a=[...s.querySelectorAll('[role="option"]')],o=a.find(e=>"true"===e.getAttribute("aria-selected")),r=a.find(e=>e!==o);if(!r)return!1;r.click(),await h(500);const c=document.querySelector('[data-tid="rail-header-close-button"]');c&&(c.click(),await h(300));const l=document.getElementById("captions-panel-dismiss-button");return l&&(l.click(),await h(300)),!0}()))throw new Error("Language change via UI automation failed")},async sendChatMessage(e){if(null===document.querySelector('[data-tid="ckeditor"]')){const e=document.getElementById("chat-button")??document.querySelector('[data-tid="chat-button"]')??document.querySelector('[aria-label="Chat"]')??document.querySelector('[title*="Chat"]');if(!e)throw new Error("MS Teams chat button not found");e.click(),await f(p(()=>document.querySelector('[data-tid="ckeditor"]')),5e3)}const t=document.querySelector('[data-tid="ckeditor"]');if(!t)throw new Error("MS Teams editor not found");t.ckeditorInstance?t.ckeditorInstance.setData(`<p>${e}</p>`):(t.replaceChildren(Object.assign(document.createElement("p"),{textContent:e})),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("focus",{bubbles:!0}))),await h(1e3),t.focus();const n=/Mac/.test(navigator.userAgent)?"metaKey":"ctrlKey";t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,which:13,[n]:!0,bubbles:!0,cancelable:!0})),await h(500);const i=document.getElementById("rail-header-close-button")??document.querySelector('[data-tid="rail-header-close-button"]');i?.click()},destroy(){C=!0,I.abort(),clearInterval(M),M=void 0,clearTimeout(S),S=void 0,l=void 0,b=!1,d=null,s.stop(),o?.(),o=void 0,r?.uninstall(),c?.()}}}class C{constructor(e){this.callbacks=e}callbacks;controller=null;async initialize(){this.controller=await b({onMessage:e=>{this.callbacks.onTranscript({text:e.text,participantId:e.deviceId,participantName:e.deviceName,messageId:e.raw.timestampAudioSent,messageVersion:e.messageVersion,isFinal:e.isFinal})},onTitle:e=>{this.callbacks.onTitle?.(e)},onMeetingId:e=>{},onMeetingDetected:(e,t)=>{void 0!==e&&this.callbacks.onMeetingStarted("https://teams.cloud.microsoft/"+e)},onMeetingEnded:async()=>{this.callbacks.onMeetingEnded()},onParticipantDetected:(e,t)=>{this.callbacks.onParticipantResolved?.(e,t,"")},onCaptionsSetupFailed:()=>{this.callbacks.onError?.(new Error("MS Teams captions setup failed"))}},new Map)}async enableCaptions(e,t){await(this.controller?.enableCaptions(e)),t&&await this.sendChatMessage("Hi everyone, I'm using Riter to transcribe this call so I don't miss any important details. for more info visit Https://riter.cloud")}async sendChatMessage(e){await(this.controller?.sendChatMessage(e))}destroy(){this.controller?.destroy(),this.controller=null}}class I extends d{createAdapter(e){return new C(e)}}let M=null;!function(){try{M=new I,M.init()}catch(e){console.error("[MsTeamsPageContext] Failed to initialize:",e)}}()}();
			// END: src/msTeamsPageContext.js
			
			// START: src/panelBridge.js
			!function(){"use strict";const e="CONFIG_UPDATE",n={[e]:"bridge.cmd.updateConfig"};window.addEventListener("message",e=>{if(!(e=>{if(e.source!==window)return!1;const n=e.data;return"RITER_PANEL"===n?.source})(e))return;const{type:t,payload:o}=e.data;if("PING_EXTENSION"===t)return void(()=>{const{version:e}=chrome.runtime.getManifest();window.postMessage({source:"RITER_EXTENSION",type:"PING_REPLY",installed:!0,version:e},"*")})();const s=n[t];s?((e,n)=>{try{const t=chrome.runtime.sendMessage({id:`${Date.now()}-${Math.random().toString(36).slice(2,11)}`,type:e,data:n,source:"bridge"});t?.catch?.(()=>{console.warn("[PanelBridge] Message not delivered — the extension may need to be reloaded.")})}catch(t){console.warn("[PanelBridge] Extension context unavailable. Please refresh the page:",t)}})(s,o):console.warn("[PanelBridge] Unknown message type:",t)})}();
			// END: src/panelBridge.js
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
			  const polyfillString = "\n// -- Messaging implementation\n\nfunction createEventBus(\n  scopeId,\n  type = \"page\", // \"page\" or \"iframe\"\n  { allowedOrigin = \"*\", children = [], parentWindow = null } = {}\n) {\n  if (!scopeId) throw new Error(\"createEventBus requires a scopeId\");\n\n  const handlers = {};\n\n  function handleIncoming(ev) {\n    if (allowedOrigin !== \"*\" && ev.origin !== allowedOrigin) return;\n\n    const msg = ev.data;\n    if (!msg || msg.__eventBus !== true || msg.scopeId !== scopeId) return;\n\n    const { event, payload } = msg;\n\n    // PAGE: if it's an INIT from an iframe, adopt it\n    if (type === \"page\" && event === \"__INIT__\") {\n      const win = ev.source;\n      if (win && !children.includes(win)) {\n        children.push(win);\n      }\n      return;\n    }\n\n    (handlers[event] || []).forEach((fn) =>\n      fn(payload, { origin: ev.origin, source: ev.source })\n    );\n  }\n\n  window.addEventListener(\"message\", handleIncoming);\n\n  function emitTo(win, event, payload) {\n    const envelope = {\n      __eventBus: true,\n      scopeId,\n      event,\n      payload,\n    };\n    win.postMessage(envelope, allowedOrigin);\n  }\n\n  // IFRAME: announce to page on startup\n  if (type === \"iframe\") {\n    setTimeout(() => {\n      const pw = parentWindow || window.parent;\n      if (pw && pw.postMessage) {\n        emitTo(pw, \"__INIT__\", null);\n      }\n    }, 0);\n  }\n\n  return {\n    on(event, fn) {\n      handlers[event] = handlers[event] || [];\n      handlers[event].push(fn);\n    },\n    off(event, fn) {\n      if (!handlers[event]) return;\n      handlers[event] = handlers[event].filter((h) => h !== fn);\n    },\n    /**\n     * Emits an event.\n     * @param {string} event - The event name.\n     * @param {any} payload - The event payload.\n     * @param {object} [options] - Emission options.\n     * @param {Window} [options.to] - A specific window to target. If provided, message is ONLY sent to the target.\n     */\n    emit(event, payload, { to } = {}) {\n      // If a specific target window is provided, send only to it and DO NOT dispatch locally.\n      // This prevents a port from receiving its own messages.\n      if (to) {\n        if (to && typeof to.postMessage === \"function\") {\n          emitTo(to, event, payload);\n        }\n        return; // Exit after targeted send.\n      }\n\n      // For broadcast messages (no 'to' target), dispatch locally first.\n      (handlers[event] || []).forEach((fn) =>\n        fn(payload, { origin: location.origin, source: window })\n      );\n\n      // Then propagate the broadcast to other windows.\n      if (type === \"page\") {\n        children.forEach((win) => emitTo(win, event, payload));\n      } else {\n        const pw = parentWindow || window.parent;\n        if (pw && pw.postMessage) {\n          emitTo(pw, event, payload);\n        }\n      }\n    },\n  };\n}\n\nfunction createRuntime(type = \"background\", bus) {\n  let nextId = 1;\n  const pending = {};\n  const msgListeners = [];\n\n  let nextPortId = 1;\n  const ports = {};\n  const onConnectListeners = [];\n\n  function parseArgs(args) {\n    let target, message, options, callback;\n    const arr = [...args];\n    if (arr.length === 0) {\n      throw new Error(\"sendMessage requires at least one argument\");\n    }\n    if (arr.length === 1) {\n      return { message: arr[0] };\n    }\n    // last object could be options\n    if (\n      arr.length &&\n      typeof arr[arr.length - 1] === \"object\" &&\n      !Array.isArray(arr[arr.length - 1])\n    ) {\n      options = arr.pop();\n    }\n    // last function is callback\n    if (arr.length && typeof arr[arr.length - 1] === \"function\") {\n      callback = arr.pop();\n    }\n    if (\n      arr.length === 2 &&\n      (typeof arr[0] === \"string\" || typeof arr[0] === \"number\")\n    ) {\n      [target, message] = arr;\n    } else {\n      [message] = arr;\n    }\n    return { target, message, options, callback };\n  }\n\n  if (type === \"background\") {\n    bus.on(\"__REQUEST__\", ({ id, message }, { source }) => {\n      let responded = false,\n        isAsync = false;\n      function sendResponse(resp) {\n        if (responded) return;\n        responded = true;\n        // Target the response directly back to the window that sent the request.\n        bus.emit(\"__RESPONSE__\", { id, response: resp }, { to: source });\n      }\n      const results = msgListeners\n        .map((fn) => {\n          try {\n            // msg, sender, sendResponse\n            const ret = fn(message, { id, tab: { id: source } }, sendResponse);\n            if (ret === true || (ret && typeof ret.then === \"function\")) {\n              isAsync = true;\n              return ret;\n            }\n            return ret;\n          } catch (e) {\n            _error(e);\n          }\n        })\n        .filter((r) => r !== undefined);\n\n      const promises = results.filter((r) => r && typeof r.then === \"function\");\n      if (!isAsync && promises.length === 0) {\n        const out = results.length === 1 ? results[0] : results;\n        sendResponse(out);\n      } else if (promises.length) {\n        Promise.all(promises).then((vals) => {\n          if (!responded) {\n            const out = vals.length === 1 ? vals[0] : vals;\n            sendResponse(out);\n          }\n        });\n      }\n    });\n  }\n\n  if (type !== \"background\") {\n    bus.on(\"__RESPONSE__\", ({ id, response }) => {\n      const entry = pending[id];\n      if (!entry) return;\n      entry.resolve(response);\n      if (entry.callback) entry.callback(response);\n      delete pending[id];\n    });\n  }\n\n  function sendMessage(...args) {\n    // Background should be able to send message to itself\n    // if (type === \"background\") {\n    //   throw new Error(\"Background cannot sendMessage to itself\");\n    // }\n    const { target, message, callback } = parseArgs(args);\n    const id = nextId++;\n    const promise = new Promise((resolve) => {\n      pending[id] = { resolve, callback };\n      bus.emit(\"__REQUEST__\", { id, message });\n    });\n    return promise;\n  }\n\n  bus.on(\"__PORT_CONNECT__\", ({ portId, name }, { source }) => {\n    if (type !== \"background\") return;\n    const backgroundPort = makePort(\"background\", portId, name, source);\n    ports[portId] = backgroundPort;\n\n    onConnectListeners.forEach((fn) => fn(backgroundPort));\n\n    // send back a CONNECT_ACK so the client can\n    // start listening on its end:\n    bus.emit(\"__PORT_CONNECT_ACK__\", { portId, name }, { to: source });\n  });\n\n  // Clients handle the ACK and finalize their Port object by learning the remote window.\n  bus.on(\"__PORT_CONNECT_ACK__\", ({ portId, name }, { source }) => {\n    if (type === \"background\") return; // ignore\n    const p = ports[portId];\n    if (!p) return;\n    // Call the port's internal finalize method to complete the handshake\n    if (p._finalize) {\n      p._finalize(source);\n    }\n  });\n\n  // Any port message travels via \"__PORT_MESSAGE__\"\n  bus.on(\"__PORT_MESSAGE__\", (envelope, { source }) => {\n    const { portId } = envelope;\n    const p = ports[portId];\n    if (!p) return;\n    p._receive(envelope, source);\n  });\n\n  // Any port disconnect:\n  bus.on(\"__PORT_DISCONNECT__\", ({ portId }) => {\n    const p = ports[portId];\n    if (!p) return;\n    p._disconnect();\n    delete ports[portId];\n  });\n\n  // Refactored makePort to correctly manage internal state and the connection handshake.\n  function makePort(side, portId, name, remoteWindow) {\n    let onMessageHandlers = [];\n    let onDisconnectHandlers = [];\n    let buffer = [];\n    // Unique instance ID for this port instance\n    const instanceId = Math.random().toString(36).slice(2) + Date.now();\n    // These state variables are part of the closure and are updated by _finalize\n    let _ready = side === \"background\";\n\n    function _drainBuffer() {\n      buffer.forEach((m) => _post(m));\n      buffer = [];\n    }\n\n    function _post(msg) {\n      // Always use the 'to' parameter for port messages, making them directional.\n      // Include senderInstanceId\n      bus.emit(\n        \"__PORT_MESSAGE__\",\n        { portId, msg, senderInstanceId: instanceId },\n        { to: remoteWindow }\n      );\n    }\n\n    function postMessage(msg) {\n      if (!_ready) {\n        buffer.push(msg);\n      } else {\n        _post(msg);\n      }\n    }\n\n    function _receive(envelope, source) {\n      // envelope: { msg, senderInstanceId }\n      if (envelope.senderInstanceId === instanceId) return; // Don't dispatch to self\n      onMessageHandlers.forEach((fn) =>\n        fn(envelope.msg, { id: portId, tab: { id: source } })\n      );\n    }\n\n    function disconnect() {\n      // Also use the 'to' parameter for disconnect messages\n      bus.emit(\"__PORT_DISCONNECT__\", { portId }, { to: remoteWindow });\n      _disconnect();\n      delete ports[portId];\n    }\n\n    function _disconnect() {\n      onDisconnectHandlers.forEach((fn) => fn());\n      onMessageHandlers = [];\n      onDisconnectHandlers = [];\n    }\n\n    // This function is called on the client port when the ACK is received from background.\n    // It updates the port's state, completing the connection.\n    function _finalize(win) {\n      remoteWindow = win; // <-- This is the crucial part: learn the destination\n      _ready = true;\n      _drainBuffer();\n    }\n\n    return {\n      name,\n      sender: {\n        id: portId,\n      },\n      onMessage: {\n        addListener(fn) {\n          onMessageHandlers.push(fn);\n        },\n        removeListener(fn) {\n          onMessageHandlers = onMessageHandlers.filter((x) => x !== fn);\n        },\n      },\n      onDisconnect: {\n        addListener(fn) {\n          onDisconnectHandlers.push(fn);\n        },\n        removeListener(fn) {\n          onDisconnectHandlers = onDisconnectHandlers.filter((x) => x !== fn);\n        },\n      },\n      postMessage,\n      disconnect,\n      // Internal methods used by the runtime\n      _receive,\n      _disconnect,\n      _finalize, // Expose the finalizer for the ACK handler\n    };\n  }\n\n  function connect(connectInfo = {}) {\n    if (type === \"background\") {\n      throw new Error(\"Background must use onConnect, not connect()\");\n    }\n    const name = connectInfo.name || \"\";\n    const portId = nextPortId++;\n    // create the client side port\n    // remoteWindow is initially null; it will be set by _finalize upon ACK.\n    const clientPort = makePort(\"client\", portId, name, null);\n    ports[portId] = clientPort;\n\n    // fire the connect event across the bus\n    bus.emit(\"__PORT_CONNECT__\", { portId, name });\n    return clientPort;\n  }\n\n  function onConnect(fn) {\n    if (type !== \"background\") {\n      throw new Error(\"connect event only fires in background\");\n    }\n    onConnectListeners.push(fn);\n  }\n\n  return {\n    // rpc:\n    sendMessage,\n    onMessage: {\n      addListener(fn) {\n        msgListeners.push(fn);\n      },\n      removeListener(fn) {\n        const i = msgListeners.indexOf(fn);\n        if (i >= 0) msgListeners.splice(i, 1);\n      },\n    },\n\n    // port API:\n    connect,\n    onConnect: {\n      addListener(fn) {\n        onConnect(fn);\n      },\n      removeListener(fn) {\n        const i = onConnectListeners.indexOf(fn);\n        if (i >= 0) onConnectListeners.splice(i, 1);\n      },\n    },\n  };\n}\n\n\n// --- Abstraction Layer: PostMessage Target\n\nlet nextRequestId = 1;\nconst pendingRequests = new Map(); // requestId -> { resolve, reject, timeout }\n\nfunction sendAbstractionRequest(method, args = []) {\n  return new Promise((resolve, reject) => {\n    const requestId = nextRequestId++;\n\n    const timeout = setTimeout(() => {\n      pendingRequests.delete(requestId);\n      reject(new Error(`PostMessage request timeout for method: ${method}`));\n    }, 10000);\n\n    pendingRequests.set(requestId, { resolve, reject, timeout });\n\n    window.parent.postMessage({\n      type: \"abstraction-request\",\n      requestId,\n      method,\n      args,\n    });\n  });\n}\n\nwindow.addEventListener(\"message\", (event) => {\n  const { type, requestId, success, result, error } = event.data;\n\n  if (type === \"abstraction-response\") {\n    const pending = pendingRequests.get(requestId);\n    if (pending) {\n      clearTimeout(pending.timeout);\n      pendingRequests.delete(requestId);\n\n      if (success) {\n        pending.resolve(result);\n      } else {\n        const err = new Error(error.message);\n        err.stack = error.stack;\n        pending.reject(err);\n      }\n    }\n  }\n});\n\nasync function _storageSet(items) {\n  return sendAbstractionRequest(\"_storageSet\", [items]);\n}\n\nasync function _storageGet(keys) {\n  return sendAbstractionRequest(\"_storageGet\", [keys]);\n}\n\nasync function _storageRemove(keysToRemove) {\n  return sendAbstractionRequest(\"_storageRemove\", [keysToRemove]);\n}\n\nasync function _storageClear() {\n  return sendAbstractionRequest(\"_storageClear\");\n}\n\nasync function _cookieList(details) {\n  return sendAbstractionRequest(\"_cookieList\", [details]);\n}\n\nasync function _cookieSet(details) {\n  return sendAbstractionRequest(\"_cookieSet\", [details]);\n}\n\nasync function _cookieDelete(details) {\n  return sendAbstractionRequest(\"_cookieDelete\", [details]);\n}\n\nasync function _fetch(url, options) {\n  return sendAbstractionRequest(\"_fetch\", [url, options]);\n}\n\nfunction _registerMenuCommand(name, func) {\n  _warn(\"_registerMenuCommand called from iframe context:\", name);\n  return sendAbstractionRequest(\"_registerMenuCommand\", [\n    name,\n    func.toString(),\n  ]);\n}\n\nfunction _openTab(url, active) {\n  return sendAbstractionRequest(\"_openTab\", [url, active]);\n}\n\nasync function _initStorage() {\n  return sendAbstractionRequest(\"_initStorage\");\n}\n\n\nconst EXTENSION_ASSETS_MAP = {{EXTENSION_ASSETS_MAP}};\n\n// -- Polyfill Implementation\nfunction buildPolyfill({ isBackground = false, isOtherPage = false } = {}) {\n  // Generate a unique context ID for this polyfill instance\n  const contextType = isBackground\n    ? \"background\"\n    : isOtherPage\n      ? \"options\"\n      : \"content\";\n  const contextId = `${contextType}_${Math.random()\n    .toString(36)\n    .substring(2, 15)}`;\n\n  const IS_IFRAME = \"true\" === \"true\";\n  const BUS = (function () {\n    if (globalThis.__BUS) {\n      return globalThis.__BUS;\n    }\n    globalThis.__BUS = createEventBus(\n      \"riter-ai-note-taker-for-google-meet-and-microsoft-teams\",\n      IS_IFRAME ? \"iframe\" : \"page\",\n    );\n    return globalThis.__BUS;\n  })();\n  const RUNTIME = createRuntime(isBackground ? \"background\" : \"tab\", BUS);\n  const createNoopListeners = () => ({\n    addListener: (callback) => {\n      _log(\"addListener\", callback);\n    },\n    removeListener: (callback) => {\n      _log(\"removeListener\", callback);\n    },\n  });\n  // TODO: Stub\n  const storageChangeListeners = new Set();\n  function broadcastStorageChange(changes, areaName) {\n    storageChangeListeners.forEach((listener) => {\n      listener(changes, areaName);\n    });\n  }\n\n  let REQ_PERMS = [];\n\n  // --- Chrome polyfill\n  let chrome = {\n    extension: {\n      isAllowedIncognitoAccess: () => Promise.resolve(true),\n      sendMessage: (...args) => _messagingHandler.sendMessage(...args),\n    },\n    permissions: {\n      // TODO: Remove origin permission means exclude from origin in startup (when checking for content scripts)\n      request: (permissions, callback) => {\n        _log(\"permissions.request\", permissions, callback);\n        if (Array.isArray(permissions)) {\n          REQ_PERMS = [...REQ_PERMS, ...permissions];\n        }\n        if (typeof callback === \"function\") {\n          callback(permissions);\n        }\n        return Promise.resolve(permissions);\n      },\n      contains: (permissions, callback) => {\n        if (typeof callback === \"function\") {\n          callback(true);\n        }\n        return Promise.resolve(true);\n      },\n      getAll: () => {\n        return Promise.resolve({\n          permissions: EXTENSION_PERMISSIONS,\n          origins: ORIGIN_PERMISSIONS,\n        });\n      },\n      onAdded: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n    },\n    i18n: {\n      getUILanguage: () => {\n        return USED_LOCALE || \"en\";\n      },\n      getMessage: (key, substitutions = []) => {\n        if (typeof substitutions === \"string\") {\n          substitutions = [substitutions];\n        }\n        if (typeof LOCALE_KEYS !== \"undefined\" && LOCALE_KEYS[key]) {\n          return LOCALE_KEYS[key].message?.replace(\n            /\\$(\\d+)/g,\n            (match, p1) => substitutions[p1 - 1] || match,\n          );\n        }\n        return key;\n      },\n    },\n    alarms: {\n      onAlarm: createNoopListeners(),\n      create: () => {\n        _log(\"alarms.create\", arguments);\n      },\n      get: () => {\n        _log(\"alarms.get\", arguments);\n      },\n    },\n    runtime: {\n      ...RUNTIME,\n      onInstalled: createNoopListeners(),\n      onStartup: createNoopListeners(),\n      // TODO: Postmessage to parent to open options page or call openOptionsPage\n      openOptionsPage: () => {\n        // const url = chrome.runtime.getURL(OPTIONS_PAGE_PATH);\n        // console.log(\"openOptionsPage\", _openTab, url, EXTENSION_ASSETS_MAP);\n        // _openTab(url);\n        if (typeof openOptionsPage === \"function\") {\n          openOptionsPage();\n        } else if (window.parent) {\n          window.parent.postMessage({ type: \"openOptionsPage\" }, \"*\");\n        } else {\n          _warn(\"openOptionsPage not available.\");\n        }\n      },\n      getManifest: () => {\n        // The manifest object will be injected into the scope where buildPolyfill is called\n        if (typeof INJECTED_MANIFEST !== \"undefined\") {\n          return JSON.parse(JSON.stringify(INJECTED_MANIFEST)); // Return deep copy\n        }\n        _warn(\"INJECTED_MANIFEST not found for chrome.runtime.getManifest\");\n        return { name: \"Unknown\", version: \"0.0\", manifest_version: 2 };\n      },\n      getURL: (path) => {\n        if (!path) return \"\";\n        if (path.startsWith(\"/\")) {\n          path = path.substring(1);\n        }\n\n        if (typeof _createAssetUrl === \"function\") {\n          return _createAssetUrl(path);\n        }\n\n        _warn(\n          `chrome.runtime.getURL fallback for '${path}'. Assets may not be available.`,\n        );\n        // Attempt a relative path resolution (highly context-dependent and likely wrong)\n        try {\n          if (window.location.protocol.startsWith(\"http\")) {\n            return new URL(path, window.location.href).toString();\n          }\n        } catch (e) {\n          /* ignore error, fallback */\n        }\n        return path;\n      },\n      id: \"polyfilled-extension-\" + Math.random().toString(36).substring(2, 15),\n      lastError: null,\n      setUninstallURL: () => {},\n      setUpdateURL: () => {},\n      getPlatformInfo: async () => {\n        const platform = {\n          os: \"unknown\",\n          arch: \"unknown\",\n          nacl_arch: \"unknown\",\n        };\n\n        if (typeof navigator !== \"undefined\") {\n          const userAgent = navigator.userAgent.toLowerCase();\n          if (userAgent.includes(\"mac\")) platform.os = \"mac\";\n          else if (userAgent.includes(\"win\")) platform.os = \"win\";\n          else if (userAgent.includes(\"linux\")) platform.os = \"linux\";\n          else if (userAgent.includes(\"android\")) platform.os = \"android\";\n          else if (userAgent.includes(\"ios\")) platform.os = \"ios\";\n\n          if (userAgent.includes(\"x86_64\") || userAgent.includes(\"amd64\")) {\n            platform.arch = \"x86-64\";\n          } else if (userAgent.includes(\"i386\") || userAgent.includes(\"i686\")) {\n            platform.arch = \"x86-32\";\n          } else if (userAgent.includes(\"arm\")) {\n            platform.arch = \"arm\";\n          }\n        }\n\n        return platform;\n      },\n      getBrowserInfo: async () => {\n        const info = {\n          name: \"unknown\",\n          version: \"unknown\",\n          buildID: \"unknown\",\n        };\n\n        if (typeof navigator !== \"undefined\") {\n          const userAgent = navigator.userAgent;\n          if (userAgent.includes(\"Chrome\")) {\n            info.name = \"Chrome\";\n            const match = userAgent.match(/Chrome\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          } else if (userAgent.includes(\"Firefox\")) {\n            info.name = \"Firefox\";\n            const match = userAgent.match(/Firefox\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          } else if (userAgent.includes(\"Safari\")) {\n            info.name = \"Safari\";\n            const match = userAgent.match(/Version\\/([0-9.]+)/);\n            if (match) info.version = match[1];\n          }\n        }\n\n        return info;\n      },\n    },\n    storage: {\n      local: {\n        get: function (keys, callback) {\n          if (typeof _storageGet !== \"function\")\n            throw new Error(\"_storageGet not defined\");\n\n          const promise = _storageGet(keys);\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.get callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.get error:\", error);\n                callback({});\n              });\n            return;\n          }\n\n          return promise;\n        },\n        set: function (items, callback) {\n          if (typeof _storageSet !== \"function\")\n            throw new Error(\"_storageSet not defined\");\n\n          const promise = _storageSet(items).then((result) => {\n            broadcastStorageChange(items, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.set callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.set error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        remove: function (keys, callback) {\n          if (typeof _storageRemove !== \"function\")\n            throw new Error(\"_storageRemove not defined\");\n\n          const promise = _storageRemove(keys).then((result) => {\n            const changes = {};\n            const keyList = Array.isArray(keys) ? keys : [keys];\n            keyList.forEach((key) => {\n              changes[key] = { oldValue: undefined, newValue: undefined };\n            });\n            broadcastStorageChange(changes, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.remove callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.remove error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        clear: function (callback) {\n          if (typeof _storageClear !== \"function\")\n            throw new Error(\"_storageClear not defined\");\n\n          const promise = _storageClear().then((result) => {\n            broadcastStorageChange({}, \"local\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.clear callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.clear error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        onChanged: {\n          addListener: (callback) => {\n            storageChangeListeners.add(callback);\n          },\n          removeListener: (callback) => {\n            storageChangeListeners.delete(callback);\n          },\n        },\n      },\n      sync: {\n        get: function (keys, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n          return chrome.storage.local.get(keys, callback);\n        },\n        set: function (items, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.set(items).then((result) => {\n            broadcastStorageChange(items, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.set callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.set error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        remove: function (keys, callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.remove(keys).then((result) => {\n            const changes = {};\n            const keyList = Array.isArray(keys) ? keys : [keys];\n            keyList.forEach((key) => {\n              changes[key] = { oldValue: undefined, newValue: undefined };\n            });\n            broadcastStorageChange(changes, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.remove callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.remove error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        clear: function (callback) {\n          _warn(\"chrome.storage.sync polyfill maps to local\");\n\n          const promise = chrome.storage.local.clear().then((result) => {\n            broadcastStorageChange({}, \"sync\");\n            return result;\n          });\n\n          if (typeof callback === \"function\") {\n            promise\n              .then((result) => {\n                try {\n                  callback(result);\n                } catch (e) {\n                  _error(\"Error in storage.sync.clear callback:\", e);\n                }\n              })\n              .catch((error) => {\n                _error(\"Storage.sync.clear error:\", error);\n                callback();\n              });\n            return;\n          }\n\n          return promise;\n        },\n        onChanged: {\n          addListener: (callback) => {\n            storageChangeListeners.add(callback);\n          },\n          removeListener: (callback) => {\n            storageChangeListeners.delete(callback);\n          },\n        },\n      },\n      onChanged: {\n        addListener: (callback) => {\n          storageChangeListeners.add(callback);\n        },\n        removeListener: (callback) => {\n          storageChangeListeners.delete(callback);\n        },\n      },\n      managed: {\n        get: function (keys, callback) {\n          _warn(\"chrome.storage.managed polyfill is read-only empty.\");\n\n          const promise = Promise.resolve({});\n\n          if (typeof callback === \"function\") {\n            promise.then((result) => {\n              try {\n                callback(result);\n              } catch (e) {\n                _error(\"Error in storage.managed.get callback:\", e);\n              }\n            });\n            return;\n          }\n\n          return promise;\n        },\n      },\n    },\n    cookies: (function () {\n      const cookieChangeListeners = new Set();\n      function broadcastCookieChange(changeInfo) {\n        cookieChangeListeners.forEach((listener) => {\n          try {\n            listener(changeInfo);\n          } catch (e) {\n            _error(\"Error in cookies.onChanged listener:\", e);\n          }\n        });\n      }\n\n      function handlePromiseCallback(promise, callback) {\n        if (typeof callback === \"function\") {\n          promise\n            .then((result) => callback(result))\n            .catch((error) => {\n              // chrome.runtime.lastError = { message: error.message }; // TODO: Implement lastError\n              _error(error);\n              callback(); // Call with undefined on error\n            });\n          return;\n        }\n        return promise;\n      }\n\n      return {\n        get: function (details, callback) {\n          if (typeof _cookieList !== \"function\") {\n            return handlePromiseCallback(\n              Promise.reject(new Error(\"_cookieList not defined\")),\n              callback,\n            );\n          }\n          const promise = _cookieList({\n            url: details.url,\n            name: details.name,\n            storeId: details.storeId,\n            partitionKey: details.partitionKey,\n          }).then((cookies) => {\n            if (!cookies || cookies.length === 0) {\n              return null;\n            }\n            // Sort by path length (longest first), then creation time (earliest first, if available)\n            cookies.sort((a, b) => {\n              const pathLenDiff = (b.path || \"\").length - (a.path || \"\").length;\n              if (pathLenDiff !== 0) return pathLenDiff;\n              return (a.creationTime || 0) - (b.creationTime || 0);\n            });\n            return cookies[0];\n          });\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getAll: function (details, callback) {\n          if (typeof _cookieList !== \"function\") {\n            return handlePromiseCallback(\n              Promise.reject(new Error(\"_cookieList not defined\")),\n              callback,\n            );\n          }\n          if (details.partitionKey) {\n            _warn(\n              \"cookies.getAll: partitionKey is not fully supported in this environment.\",\n            );\n          }\n          const promise = _cookieList(details);\n          return handlePromiseCallback(promise, callback);\n        },\n\n        set: function (details, callback) {\n          const promise = (async () => {\n            if (\n              typeof _cookieSet !== \"function\" ||\n              typeof _cookieList !== \"function\"\n            ) {\n              throw new Error(\"_cookieSet or _cookieList not defined\");\n            }\n            if (details.partitionKey) {\n              _warn(\n                \"cookies.set: partitionKey is not fully supported in this environment.\",\n              );\n            }\n\n            const getDetails = {\n              url: details.url,\n              name: details.name,\n              storeId: details.storeId,\n            };\n            const oldCookies = await _cookieList(getDetails);\n            const oldCookie = oldCookies && oldCookies[0];\n\n            if (oldCookie) {\n              broadcastCookieChange({\n                cause: \"overwrite\",\n                cookie: oldCookie,\n                removed: true,\n              });\n            }\n\n            await _cookieSet(details);\n            const newCookies = await _cookieList(getDetails);\n            const newCookie = newCookies && newCookies[0];\n\n            if (newCookie) {\n              broadcastCookieChange({\n                cause: \"explicit\",\n                cookie: newCookie,\n                removed: false,\n              });\n            }\n            return newCookie || null;\n          })();\n          return handlePromiseCallback(promise, callback);\n        },\n\n        remove: function (details, callback) {\n          const promise = (async () => {\n            if (\n              typeof _cookieDelete !== \"function\" ||\n              typeof _cookieList !== \"function\"\n            ) {\n              throw new Error(\"_cookieDelete or _cookieList not defined\");\n            }\n            const oldCookies = await _cookieList(details);\n            const oldCookie = oldCookies && oldCookies[0];\n\n            if (!oldCookie) return null; // Nothing to remove\n\n            await _cookieDelete(details);\n\n            broadcastCookieChange({\n              cause: \"explicit\",\n              cookie: oldCookie,\n              removed: true,\n            });\n\n            return {\n              url: details.url,\n              name: details.name,\n              storeId: details.storeId || \"0\",\n              partitionKey: details.partitionKey,\n            };\n          })();\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getAllCookieStores: function (callback) {\n          const promise = Promise.resolve([\n            { id: \"0\", tabIds: [1] }, // Mock store for the current context\n          ]);\n          return handlePromiseCallback(promise, callback);\n        },\n\n        getPartitionKey: function (details, callback) {\n          _warn(\n            \"chrome.cookies.getPartitionKey is not supported in this environment.\",\n          );\n          const promise = Promise.resolve({ partitionKey: {} }); // Return empty partition key\n          return handlePromiseCallback(promise, callback);\n        },\n\n        onChanged: {\n          addListener: (callback) => {\n            if (typeof callback === \"function\") {\n              cookieChangeListeners.add(callback);\n            }\n          },\n          removeListener: (callback) => {\n            cookieChangeListeners.delete(callback);\n          },\n        },\n      };\n    })(),\n    tabs: {\n      query: async (queryInfo) => {\n        _warn(\"chrome.tabs.query polyfill only returns current tab info.\");\n        const dummyId = Math.floor(Math.random() * 1000) + 1;\n        return [\n          {\n            id: dummyId,\n            url: CURRENT_LOCATION,\n            active: true,\n            windowId: 1,\n            status: \"complete\",\n          },\n        ];\n      },\n      create: async ({ url, active = true }) => {\n        _log(`[Polyfill tabs.create] URL: ${url}`);\n        if (typeof _openTab !== \"function\")\n          throw new Error(\"_openTab not defined\");\n        _openTab(url, active);\n        const dummyId = Math.floor(Math.random() * 1000) + 1001;\n        return Promise.resolve({\n          id: dummyId,\n          url: url,\n          active,\n          windowId: 1,\n        });\n      },\n      sendMessage: async (tabId, message) => {\n        _warn(\n          `chrome.tabs.sendMessage polyfill (to tab ${tabId}) redirects to runtime.sendMessage (current context).`,\n        );\n        return chrome.runtime.sendMessage(message);\n      },\n      onActivated: createNoopListeners(),\n      onUpdated: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n      onReplaced: createNoopListeners(),\n      onCreated: createNoopListeners(),\n      onMoved: createNoopListeners(),\n      onDetached: createNoopListeners(),\n      onAttached: createNoopListeners(),\n    },\n    windows: {\n      onFocusChanged: createNoopListeners(),\n      onCreated: createNoopListeners(),\n      onRemoved: createNoopListeners(),\n      onFocused: createNoopListeners(),\n      onFocus: createNoopListeners(),\n      onBlur: createNoopListeners(),\n      onFocused: createNoopListeners(),\n    },\n    notifications: {\n      create: async (notificationId, options) => {\n        try {\n          let id = notificationId;\n          let notificationOptions = options;\n\n          if (typeof notificationId === \"object\" && notificationId !== null) {\n            notificationOptions = notificationId;\n            id = \"notification_\" + Math.random().toString(36).substring(2, 15);\n          } else if (typeof notificationId === \"string\" && options) {\n            id = notificationId;\n            notificationOptions = options;\n          } else {\n            throw new Error(\"Invalid parameters for notifications.create\");\n          }\n\n          if (!notificationOptions || typeof notificationOptions !== \"object\") {\n            throw new Error(\"Notification options must be an object\");\n          }\n\n          const {\n            title,\n            message,\n            iconUrl,\n            type = \"basic\",\n          } = notificationOptions;\n\n          if (!title || !message) {\n            throw new Error(\"Notification must have title and message\");\n          }\n\n          if (\"Notification\" in window) {\n            if (Notification.permission === \"granted\") {\n              const notification = new Notification(title, {\n                body: message,\n                icon: iconUrl,\n                tag: id,\n              });\n\n              _log(`[Notifications] Created notification: ${id}`);\n              return id;\n            } else if (Notification.permission === \"default\") {\n              const permission = await Notification.requestPermission();\n              if (permission === \"granted\") {\n                const notification = new Notification(title, {\n                  body: message,\n                  icon: iconUrl,\n                  tag: id,\n                });\n                _log(\n                  `[Notifications] Created notification after permission: ${id}`,\n                );\n                return id;\n              } else {\n                _warn(\"[Notifications] Permission denied for notifications\");\n                return id;\n              }\n            } else {\n              _warn(\"[Notifications] Notifications are blocked\");\n              return id;\n            }\n          } else {\n            _warn(\n              \"[Notifications] Native notifications not supported, using console fallback\",\n            );\n            _log(`[Notification] ${title}: ${message}`);\n            return id;\n          }\n        } catch (error) {\n          _error(\"[Notifications] Error creating notification:\", error.message);\n          throw error;\n        }\n      },\n      clear: async (notificationId) => {\n        _log(`[Notifications] Clear notification: ${notificationId}`);\n        // For native notifications, there's no direct way to clear by ID\n        // This is a limitation of the Web Notifications API\n        return true;\n      },\n      getAll: async () => {\n        _warn(\"[Notifications] getAll not fully supported in polyfill\");\n        return {};\n      },\n      getPermissionLevel: async () => {\n        if (\"Notification\" in window) {\n          const permission = Notification.permission;\n          return { level: permission === \"granted\" ? \"granted\" : \"denied\" };\n        }\n        return { level: \"denied\" };\n      },\n    },\n    contextMenus: {\n      create: (createProperties, callback) => {\n        try {\n          if (!createProperties || typeof createProperties !== \"object\") {\n            throw new Error(\"Context menu create properties must be an object\");\n          }\n\n          const { id, title, contexts = [\"page\"], onclick } = createProperties;\n          const menuId =\n            id || `menu_${Math.random().toString(36).substring(2, 15)}`;\n\n          if (!title || typeof title !== \"string\") {\n            throw new Error(\"Context menu must have a title\");\n          }\n\n          // Store menu items for potential use\n          if (!window._polyfillContextMenus) {\n            window._polyfillContextMenus = new Map();\n          }\n\n          window._polyfillContextMenus.set(menuId, {\n            id: menuId,\n            title,\n            contexts,\n            onclick,\n            enabled: createProperties.enabled !== false,\n          });\n\n          _log(\n            `[ContextMenus] Created context menu item: ${title} (${menuId})`,\n          );\n\n          // Try to register a menu command as fallback\n          if (typeof _registerMenuCommand === \"function\") {\n            try {\n              _registerMenuCommand(\n                title,\n                onclick ||\n                  (() => {\n                    _log(`Context menu clicked: ${title}`);\n                  }),\n              );\n            } catch (e) {\n              _warn(\n                \"[ContextMenus] Failed to register as menu command:\",\n                e.message,\n              );\n            }\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n\n          return menuId;\n        } catch (error) {\n          _error(\"[ContextMenus] Error creating context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n          throw error;\n        }\n      },\n      update: (id, updateProperties, callback) => {\n        try {\n          if (\n            !window._polyfillContextMenus ||\n            !window._polyfillContextMenus.has(id)\n          ) {\n            throw new Error(`Context menu item not found: ${id}`);\n          }\n\n          const menuItem = window._polyfillContextMenus.get(id);\n          Object.assign(menuItem, updateProperties);\n\n          _log(`[ContextMenus] Updated context menu item: ${id}`);\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\"[ContextMenus] Error updating context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      remove: (menuItemId, callback) => {\n        try {\n          if (\n            window._polyfillContextMenus &&\n            window._polyfillContextMenus.has(menuItemId)\n          ) {\n            window._polyfillContextMenus.delete(menuItemId);\n            _log(`[ContextMenus] Removed context menu item: ${menuItemId}`);\n          } else {\n            _warn(\n              `[ContextMenus] Context menu item not found for removal: ${menuItemId}`,\n            );\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\"[ContextMenus] Error removing context menu:\", error.message);\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      removeAll: (callback) => {\n        try {\n          if (window._polyfillContextMenus) {\n            const count = window._polyfillContextMenus.size;\n            window._polyfillContextMenus.clear();\n            _log(`[ContextMenus] Removed all ${count} context menu items`);\n          }\n\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        } catch (error) {\n          _error(\n            \"[ContextMenus] Error removing all context menus:\",\n            error.message,\n          );\n          if (callback && typeof callback === \"function\") {\n            setTimeout(() => callback(), 0);\n          }\n        }\n      },\n      onClicked: {\n        addListener: (callback) => {\n          if (!window._polyfillContextMenuListeners) {\n            window._polyfillContextMenuListeners = new Set();\n          }\n          window._polyfillContextMenuListeners.add(callback);\n          _log(\"[ContextMenus] Added click listener\");\n        },\n        removeListener: (callback) => {\n          if (window._polyfillContextMenuListeners) {\n            window._polyfillContextMenuListeners.delete(callback);\n            _log(\"[ContextMenus] Removed click listener\");\n          }\n        },\n      },\n    },\n  };\n\n  const tc = (fn) => {\n    try {\n      fn();\n    } catch (e) {}\n  };\n  const loggingProxyHandler = (_key) => ({\n    get(target, key, receiver) {\n      tc(() => _log(`[${contextType}] [CHROME - ${_key}] Getting ${key}`));\n      return Reflect.get(target, key, receiver);\n    },\n    set(target, key, value, receiver) {\n      tc(() =>\n        _log(`[${contextType}] [CHROME - ${_key}] Setting ${key} to ${value}`),\n      );\n      return Reflect.set(target, key, value, receiver);\n    },\n    has(target, key) {\n      tc(() =>\n        _log(`[${contextType}] [CHROME - ${_key}] Checking if ${key} exists`),\n      );\n      return Reflect.has(target, key);\n    },\n  });\n  chrome = Object.fromEntries(\n    Object.entries(chrome).map(([key, value]) => [\n      key,\n      new Proxy(value, loggingProxyHandler(key)),\n    ]),\n  );\n\n  // Alias browser to chrome for common Firefox pattern\n  const browser = new Proxy(chrome, loggingProxyHandler);\n\n  const oldGlobalThis = globalThis;\n  const oldWindow = window;\n  const oldSelf = self;\n  const oldGlobal = globalThis;\n  const __globalsStorage = {};\n\n  const TO_MODIFY = [oldGlobalThis, oldWindow, oldSelf, oldGlobal];\n  const set = (k, v) => {\n    __globalsStorage[k] = v;\n    TO_MODIFY.forEach((target) => {\n      target[k] = v;\n    });\n  };\n  const proxyHandler = {\n    get(target, key, receiver) {\n      const fns = [\n        () => __globalsStorage[key],\n        () => Reflect.get(target, key, target),\n        () => target[key],\n      ];\n      const out = fns\n        .map((f) => {\n          try {\n            let out = f();\n            return out;\n          } catch (e) {\n            return undefined;\n          }\n        })\n        .find((f) => f !== undefined);\n      if (typeof out === \"function\") {\n        return out.bind(target);\n      }\n      return out;\n    },\n    set(target, key, value, receiver) {\n      try {\n        tc(() => _log(`[${contextType}] Setting ${key} to ${value}`));\n        set(key, value);\n        return Reflect.set(target, key, value, receiver);\n      } catch (e) {\n        _error(\"Error setting\", key, value, e);\n        try {\n          target[key] = value;\n          return true;\n        } catch (e) {\n          _error(\"Error setting\", key, value, e);\n        }\n        return false;\n      }\n    },\n    has(target, key) {\n      try {\n        return key in __globalsStorage || key in target;\n      } catch (e) {\n        _error(\"Error has\", key, e);\n        try {\n          return key in __globalsStorage || key in target;\n        } catch (e) {\n          _error(\"Error has\", key, e);\n        }\n        return false;\n      }\n    },\n    getOwnPropertyDescriptor(target, key) {\n      try {\n        if (key in __globalsStorage) {\n          return {\n            configurable: true,\n            enumerable: true,\n            writable: true,\n            value: __globalsStorage[key],\n          };\n        }\n        // fall back to the real globalThis\n        const desc = Reflect.getOwnPropertyDescriptor(target, key);\n        // ensure it's configurable so the with‑scope binding logic can override it\n        if (desc && !desc.configurable) {\n          desc.configurable = true;\n        }\n        return desc;\n      } catch (e) {\n        _error(\"Error getOwnPropertyDescriptor\", key, e);\n        return {\n          configurable: true,\n          enumerable: true,\n          writable: true,\n          value: undefined,\n        };\n      }\n    },\n\n    defineProperty(target, key, descriptor) {\n      try {\n        // Normalize descriptor to avoid mixed accessor & data attributes\n        const hasAccessor = \"get\" in descriptor || \"set\" in descriptor;\n\n        if (hasAccessor) {\n          // Build a clean descriptor without value/writable when accessors present\n          const normalized = {\n            configurable:\n              \"configurable\" in descriptor ? descriptor.configurable : true,\n            enumerable:\n              \"enumerable\" in descriptor ? descriptor.enumerable : false,\n          };\n          if (\"get\" in descriptor) normalized.get = descriptor.get;\n          if (\"set\" in descriptor) normalized.set = descriptor.set;\n\n          // Store accessor references for inspection but avoid breaking invariants\n          set(key, {\n            get: descriptor.get,\n            set: descriptor.set,\n          });\n\n          return Reflect.defineProperty(target, key, normalized);\n        }\n\n        // Data descriptor path\n        set(key, descriptor.value);\n        return Reflect.defineProperty(target, key, descriptor);\n      } catch (e) {\n        _error(\"Error defineProperty\", key, descriptor, e);\n        return false;\n      }\n    },\n  };\n\n  // Create proxies once proxyHandler is defined\n  const proxyWindow = new Proxy(oldWindow, proxyHandler);\n  const proxyGlobalThis = new Proxy(oldGlobalThis, proxyHandler);\n  const proxyGlobal = new Proxy(oldGlobal, proxyHandler);\n  const proxySelf = new Proxy(oldSelf, proxyHandler);\n\n  // Seed storage with core globals so lookups succeed inside `with` blocks\n  Object.assign(__globalsStorage, {\n    chrome,\n    browser,\n    window: proxyWindow,\n    globalThis: proxyGlobalThis,\n    global: proxyGlobal,\n    self: proxySelf,\n    document: oldWindow.document,\n  });\n\n  const __globals = {\n    chrome,\n    browser,\n    window: proxyWindow,\n    globalThis: proxyGlobalThis,\n    global: proxyGlobal,\n    self: proxySelf,\n    __globals: __globalsStorage,\n  };\n\n  __globals.contextId = contextId;\n  __globals.contextType = contextType;\n  __globals.module = undefined;\n  __globals.amd = undefined;\n  __globals.define = undefined;\n  __globals.importScripts = (...args) => {\n    _log(\"importScripts\", args);\n  };\n\n  return __globals;\n}\n\n\nif (typeof window !== 'undefined') {\n    window.buildPolyfill = buildPolyfill;\n}\n"
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