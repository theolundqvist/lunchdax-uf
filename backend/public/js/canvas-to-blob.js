!function (t) { "use strict"; var e = t.HTMLCanvasElement && t.HTMLCanvasElement.prototype, o = t.Blob && function () { try { return Boolean(new Blob) } catch (t) { return !1 } }(), n = o && t.Uint8Array && function () { try { return 100 === new Blob([new Uint8Array(100)]).size } catch (t) { return !1 } }(), r = t.BlobBuilder || t.WebKitBlobBuilder || t.MozBlobBuilder || t.MSBlobBuilder, a = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, i = (o || r) && t.atob && t.ArrayBuffer && t.Uint8Array && function (t) { var e, i, l, u, c, f, b, d, B; if (!(e = t.match(a))) throw new Error("invalid data URI"); for (i = e[2] ? e[1] : "text/plain" + (e[3] || ";charset=US-ASCII"), l = !!e[4], u = t.slice(e[0].length), c = l ? atob(u) : decodeURIComponent(u), f = new ArrayBuffer(c.length), b = new Uint8Array(f), d = 0; d < c.length; d += 1)b[d] = c.charCodeAt(d); return o ? new Blob([n ? b : f], { type: i }) : ((B = new r).append(f), B.getBlob(i)) }; t.HTMLCanvasElement && !e.toBlob && (e.mozGetAsFile ? e.toBlob = function (t, o, n) { var r = this; setTimeout(function () { t(n && e.toDataURL && i ? i(r.toDataURL(o, n)) : r.mozGetAsFile("blob", o)) }) } : e.toDataURL && i && (e.toBlob = function (t, e, o) { var n = this; setTimeout(function () { t(i(n.toDataURL(e, o))) }) })), "function" == typeof define && define.amd ? define(function () { return i }) : "object" == typeof module && module.exports ? module.exports = i : t.dataURLtoBlob = i }(window);
//# sourceMappingURL=canvas-to-blob.min.js.map