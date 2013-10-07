function hex_sha1(s) {
	return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
}

function b64_sha1(s) {
	return binb2b64(core_sha1(str2binb(s), s.length * chrsz));
}

function str_sha1(s) {
	return binb2str(core_sha1(str2binb(s), s.length * chrsz));
}

function hex_hmac_sha1(key, data) {
	return binb2hex(core_hmac_sha1(key, data));
}

function b64_hmac_sha1(key, data) {
	return binb2b64(core_hmac_sha1(key, data));
}

function str_hmac_sha1(key, data) {
	return binb2str(core_hmac_sha1(key, data));
}

function sha1_vm_test() {
	return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

function core_sha1(x, len) {
	x[len >> 5] |= 128 << 24 - len % 32, x[(len + 64 >> 9 << 4) + 15] = len;
	var w = Array(80), a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, e = -1009589776;
	for (var i = 0; i < x.length; i += 16) {
		var olda = a, oldb = b, oldc = c, oldd = d, olde = e;
		for (var j = 0; j < 80; j++) {
			j < 16 ? w[j] = x[i + j] : w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
			var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
			e = d, d = c, c = rol(b, 30), b = a, a = t;
		}
		a = safe_add(a, olda), b = safe_add(b, oldb), c = safe_add(c, oldc), d = safe_add(d, oldd), e = safe_add(e, olde);
	}
	return Array(a, b, c, d, e);
}

function sha1_ft(t, b, c, d) {
	return t < 20 ? b & c | ~b & d : t < 40 ? b ^ c ^ d : t < 60 ? b & c | b & d | c & d : b ^ c ^ d;
}

function sha1_kt(t) {
	return t < 20 ? 1518500249 : t < 40 ? 1859775393 : t < 60 ? -1894007588 : -899497514;
}

function core_hmac_sha1(key, data) {
	var bkey = str2binb(key);
	bkey.length > 16 && ( bkey = core_sha1(bkey, key.length * chrsz));
	var ipad = Array(16), opad = Array(16);
	for (var i = 0; i < 16; i++)
		ipad[i] = bkey[i] ^ 909522486, opad[i] = bkey[i] ^ 1549556828;
	var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
	return core_sha1(opad.concat(hash), 672);
}

function safe_add(x, y) {
	var lsw = (x & 65535) + (y & 65535), msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return msw << 16 | lsw & 65535;
}

function rol(num, cnt) {
	return num << cnt | num >>> 32 - cnt;
}

function str2binb(str) {
	var bin = Array(), mask = (1 << chrsz) - 1;
	for (var i = 0; i < str.length * chrsz; i += chrsz)
		bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << 32 - chrsz - i % 32;
	return bin;
}

function binb2str(bin) {
	var str = "", mask = (1 << chrsz) - 1;
	for (var i = 0; i < bin.length * 32; i += chrsz)
		str += String.fromCharCode(bin[i >> 5] >>> 32 - chrsz - i % 32 & mask);
	return str;
}

function binb2hex(binarray) {
	var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", str = "";
	for (var i = 0; i < binarray.length * 4; i++)
		str += hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 + 4 & 15) + hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 & 15);
	return str;
}

function binb2b64(binarray) {
	var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", str = "";
	for (var i = 0; i < binarray.length * 4; i += 3) {
		var triplet = (binarray[i >> 2] >> 8 * (3 - i % 4) & 255) << 16 | (binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4) & 255) << 8 | binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4) & 255;
		for (var j = 0; j < 4; j++)
			i * 8 + j * 6 > binarray.length * 32 ? str += b64pad : str += tab.charAt(triplet >> 6 * (3 - j) & 63);
	}
	return str;
}

var hexcase = 0, b64pad = "", chrsz = 8, OAuth;

OAuth == null && ( OAuth = {}), OAuth.setProperties = function(into, from) {
	if (into != null && from != null)
		for (var key in from)
		into[key] = from[key];
	return into;
}, OAuth.setProperties(OAuth, {
	percentEncode : function(s) {
		if (s == null)
			return "";
		if ( s instanceof Array) {
			var e = "";
			for (var i = 0; i < s.length; ++s)
				e != "" && (e += "&"), e += OAuth.percentEncode(s[i]);
			return e;
		}
		return s = encodeURIComponent(s), s = s.replace(/\!/g, "%21"), s = s.replace(/\*/g, "%2A"), s = s.replace(/\'/g, "%27"), s = s.replace(/\(/g, "%28"), s = s.replace(/\)/g, "%29"), s;
	},
	decodePercent : function(s) {
		return s != null && ( s = s.replace(/\+/g, " ")), decodeURIComponent(s);
	},
	getParameterList : function(parameters) {
		if (parameters == null)
			return [];
		if ( typeof parameters != "object")
			return OAuth.decodeForm(parameters + "");
		if ( parameters instanceof Array)
			return parameters;
		var list = [];
		for (var p in parameters)
		list.push([p, parameters[p]]);
		return list;
	},
	getParameterMap : function(parameters) {
		if (parameters == null)
			return {};
		if ( typeof parameters != "object")
			return OAuth.getParameterMap(OAuth.decodeForm(parameters + ""));
		if ( parameters instanceof Array) {
			var map = {};
			for (var p = 0; p < parameters.length; ++p) {
				var key = parameters[p][0];
				map[key] === undefined && (map[key] = parameters[p][1]);
			}
			return map;
		}
		return parameters;
	},
	getParameter : function(parameters, name) {
		if ( parameters instanceof Array) {
			for (var p = 0; p < parameters.length; ++p)
				if (parameters[p][0] == name)
					return parameters[p][1];
			return null;
		}
		return OAuth.getParameterMap(parameters)[name];
	},
	formEncode : function(parameters) {
		var form = "", list = OAuth.getParameterList(parameters);
		for (var p = 0; p < list.length; ++p) {
			var value = list[p][1];
			value == null && ( value = ""), form != "" && (form += "&"), form += OAuth.percentEncode(list[p][0]) + "=" + OAuth.percentEncode(value);
		}
		return form;
	},
	decodeForm : function(form) {
		var list = [], nvps = form.split("&");
		for (var n = 0; n < nvps.length; ++n) {
			var nvp = nvps[n];
			if (nvp == "")
				continue;
			var equals = nvp.indexOf("="), name, value;
			equals < 0 ? ( name = OAuth.decodePercent(nvp), value = null) : ( name = OAuth.decodePercent(nvp.substring(0, equals)), value = OAuth.decodePercent(nvp.substring(equals + 1))), list.push([name, value]);
		}
		return list;
	},
	setParameter : function(message, name, value) {
		var parameters = message.parameters;
		if ( parameters instanceof Array) {
			for (var p = 0; p < parameters.length; ++p)
				parameters[p][0] == name && (value === undefined ? parameters.splice(p, 1) : (parameters[p][1] = value, value = undefined));
			value !== undefined && parameters.push([name, value]);
		} else
			parameters = OAuth.getParameterMap(parameters), parameters[name] = value, message.parameters = parameters;
	},
	setParameters : function(message, parameters) {
		var list = OAuth.getParameterList(parameters);
		for (var i = 0; i < list.length; ++i)
			OAuth.setParameter(message, list[i][0], list[i][1]);
	},
	completeRequest : function(message, accessor) {
		message.method == null && (message.method = "GET");
		var map = OAuth.getParameterMap(message.parameters);
		map.oauth_consumer_key == null && OAuth.setParameter(message, "oauth_consumer_key", accessor.consumerKey || ""), map.oauth_token == null && accessor.token != null && OAuth.setParameter(message, "oauth_token", accessor.token), map.oauth_version == null && OAuth.setParameter(message, "oauth_version", "1.0"), map.oauth_timestamp == null && OAuth.setParameter(message, "oauth_timestamp", OAuth.timestamp()), map.oauth_nonce == null && OAuth.setParameter(message, "oauth_nonce", OAuth.nonce(6)), OAuth.SignatureMethod.sign(message, accessor);
	},
	setTimestampAndNonce : function(message) {
		OAuth.setParameter(message, "oauth_timestamp", OAuth.timestamp()), OAuth.setParameter(message, "oauth_nonce", OAuth.nonce(6));
	},
	addToURL : function(url, parameters) {
		newURL = url;
		if (parameters != null) {
			var toAdd = OAuth.formEncode(parameters);
			if (toAdd.length > 0) {
				var q = url.indexOf("?");
				q < 0 ? newURL += "?" : newURL += "&", newURL += toAdd;
			}
		}
		return newURL;
	},
	getAuthorizationHeader : function(realm, parameters) {
		var header = "OAuth ", list = OAuth.getParameterList(parameters);
		for (var p = 0; p < list.length; ++p) {
			var parameter = list[p], name = parameter[0];
			name.indexOf("oauth_") == 0 && (header += OAuth.percentEncode(name) + "=\"" + OAuth.percentEncode(parameter[1]) + "\"");
			if (p != list.length - 1) {
				header += ", ";
			}
		}
		return header;
	},
	getAuthorizationHeaderWithoutCallback : function(realm, parameters) {
		var header = "OAuth ", list = OAuth.getParameterList(parameters);
		for (var p = 0; p < list.length; ++p) {
			var parameter = list[p], name = parameter[0];
			if (name != 'oauth_callback') {
				name.indexOf("oauth_") == 0 && (header += OAuth.percentEncode(name) + "=\"" + OAuth.percentEncode(parameter[1]) + "\"");
				if (p != list.length - 1) {
					header += ", ";
				}
			}
		}
		return header;
	},
	correctTimestampFromSrc : function(parameterName) {
		parameterName = parameterName || "oauth_timestamp";
		var scripts = document.getElementsByTagName("script");
		if (scripts == null || !scripts.length)
			return;
		var src = scripts[scripts.length - 1].src;
		if (!src)
			return;
		var q = src.indexOf("?");
		if (q < 0)
			return;
		parameters = OAuth.getParameterMap(OAuth.decodeForm(src.substring(q + 1)));
		var t = parameters[parameterName];
		if (t == null)
			return;
		OAuth.correctTimestamp(t);
	},
	correctTimestamp : function(timestamp) {
		OAuth.timeCorrectionMsec = timestamp * 1000 - (new Date).getTime();
	},
	timeCorrectionMsec : 0,
	timestamp : function() {
		var t = (new Date).getTime() + OAuth.timeCorrectionMsec;
		return "" + Math.floor(t / 1000);
	},
	nonce : function(length) {
		var chars = OAuth.nonce.CHARS, result = "";
		for (var i = 0; i < length; ++i) {
			var rnum = Math.floor(Math.random() * chars.length);
			result += chars.substring(rnum, rnum + 1);
		}
		return result;
	}
}), OAuth.nonce.CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz", OAuth.declareClass = function(parent, name, newConstructor) {
	var previous = parent[name];
	parent[name] = newConstructor;
	if (newConstructor != null && previous != null)
		for (var key in previous)key != "prototype" && (newConstructor[key] = previous[key]);
	return newConstructor;
}, OAuth.declareClass(OAuth, "SignatureMethod", function() {
}), OAuth.setProperties(OAuth.SignatureMethod.prototype, {
	sign : function(message) {
		var baseString = OAuth.SignatureMethod.getBaseString(message), signature = this.getSignature(baseString);
		Ti.API.info('basestring ' + baseString);
		return OAuth.setParameter(message, "oauth_signature", signature), signature;
	},
	initialize : function(name, accessor) {
		var consumerSecret;
		accessor.accessorSecret != null && name.length > 9 && name.substring(name.length - 9) == "-Accessor" ? consumerSecret = accessor.accessorSecret : consumerSecret = accessor.consumerSecret, this.key = OAuth.percentEncode(consumerSecret) + "&" + OAuth.percentEncode(accessor.tokenSecret);
	}
}), OAuth.setProperties(OAuth.SignatureMethod, {
	sign : function(message, accessor) {
		var name = OAuth.getParameterMap(message.parameters).oauth_signature_method;
		if (name == null || name == "")
			name = "HMAC-SHA1", OAuth.setParameter(message, "oauth_signature_method", name);
		OAuth.SignatureMethod.newMethod(name, accessor).sign(message);
	},
	newMethod : function(name, accessor) {
		var impl = OAuth.SignatureMethod.REGISTERED[name];
		if (impl != null) {
			var method = new impl;
			return method.initialize(name, accessor), method;
		}
		var err = new Error("signature_method_rejected"), acceptable = "";
		for (var r in OAuth.SignatureMethod.REGISTERED)acceptable != "" && (acceptable += "&"), acceptable += OAuth.percentEncode(r);
		throw err.oauth_acceptable_signature_methods = acceptable, err;
	},
	REGISTERED : {},
	registerMethodClass : function(names, classConstructor) {
		for (var n = 0; n < names.length; ++n)
			OAuth.SignatureMethod.REGISTERED[names[n]] = classConstructor;
	},
	makeSubclass : function(getSignatureFunction) {
		var superClass = OAuth.SignatureMethod, subClass = function() {
			superClass.call(this);
		};
		return subClass.prototype = new superClass, subClass.prototype.getSignature = getSignatureFunction, subClass.prototype.constructor = subClass, subClass;
	},
	getBaseString : function(message) {
		var URL = message.action, q = URL.indexOf("?"), parameters;
		if (q < 0)
			parameters = message.parameters;
		else {
			parameters = OAuth.decodeForm(URL.substring(q + 1));
			var toAdd = OAuth.getParameterList(message.parameters);
			for (var a = 0; a < toAdd.length; ++a)
				parameters.push(toAdd[a]);
		}
		return OAuth.percentEncode(message.method.toUpperCase()) + "&" + OAuth.percentEncode(OAuth.SignatureMethod.normalizeUrl(URL)) + "&" + OAuth.percentEncode(OAuth.SignatureMethod.normalizeParameters(parameters));
	},
	normalizeUrl : function(url) {
		var uri = OAuth.SignatureMethod.parseUri(url), scheme = uri.protocol.toLowerCase(), authority = uri.authority.toLowerCase(), dropPort = scheme == "http" && uri.port == 80 || scheme == "https" && uri.port == 443;
		if (dropPort) {
			var index = authority.lastIndexOf(":");
			index >= 0 && ( authority = authority.substring(0, index));
		}
		var path = uri.path;
		return path || ( path = "/"), scheme + "://" + authority + path;
	},
	parseUri : function(str) {
		var o = {
			key : ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
			parser : {
				strict : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/
			}
		}, m = o.parser.strict.exec(str), uri = {}, i = 14;
		while (i--)
		uri[o.key[i]] = m[i] || "";
		return uri;
	},
	normalizeParameters : function(parameters) {
		if (parameters == null)
			return "";
		var list = OAuth.getParameterList(parameters), sortable = [];
		for (var p = 0; p < list.length; ++p) {
			var nvp = list[p];
			nvp[0] != "oauth_signature" && sortable.push([OAuth.percentEncode(nvp[0]) + " " + OAuth.percentEncode(nvp[1]), nvp]);
		}
		sortable.sort(function(a, b) {
			return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
		});
		var sorted = [];
		for (var s = 0; s < sortable.length; ++s)
			sorted.push(sortable[s][1]);
		return OAuth.formEncode(sorted);
	}
}), OAuth.SignatureMethod.registerMethodClass(["PLAINTEXT", "PLAINTEXT-Accessor"], OAuth.SignatureMethod.makeSubclass(function(baseString) {
	return this.key;
})), OAuth.SignatureMethod.registerMethodClass(["HMAC-SHA1", "HMAC-SHA1-Accessor"], OAuth.SignatureMethod.makeSubclass(function(baseString) {
	b64pad = "=";
	var signature = b64_hmac_sha1(this.key, baseString);
	return signature;
}));

