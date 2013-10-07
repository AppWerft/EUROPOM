const SOCIALACCESSTOKEN = "MultiSocial-AccessToken-Production";

var OAuthAdapter = function(pService, pConsumerSecret, pConsumerKey, pSignatureMethod) {
	function showLoading() {
		if (loading)
			return;
		loading = !0, loadingView.value = 0, estimateID = firstLoad ? "tokenRequest" : "pageLoad", estimates[estimateID] || (estimates[estimateID] = firstLoad ? 2000 : 1000), firstLoad = !1, startTime = (new Date).getTime(), intervalID = setInterval(updateProgress, 30), webView && webView.hide(), loadingView && loadingView.show(), loadingContainer && loadingContainer.show();
	}

	function updateProgress() {
		loadingView && (loadingView.value = ((new Date).getTime() - startTime) / estimates[estimateID]);
	}

	function authorizeUICallback(e) {
		switch (pService) {
			case 'linkedin' :
				var response = e.source.evalJS("(p = document.getElementsByClassName(\"access-code\")) && p[0].innerHTML");
				response ? ( pin = response, destroyAuthorizeUI(), receivePinCallback()) : (loadingView && loadingView.hide(), loadingContainer && loadingContainer.hide(), webView && webView.show()), loading = !1, clearInterval(intervalID), estimates[estimateID] = (new Date).getTime() - startTime, Ti.App.Properties.setString("Social-LoadingEstimates", JSON.stringify(estimates));
				break;
			case 'twitter' :
				var response = e.source.evalJS("(p = document.getElementById(\"oauth_pin\")) && p.innerHTML;");
				response ? ( pin = response.split("<code>")[1].split("</code>")[0], destroyAuthorizeUI(), receivePinCallback()) : (loadingView && loadingView.hide(), loadingContainer && loadingContainer.hide(), webView && webView.show()), loading = !1, clearInterval(intervalID), estimates[estimateID] = (new Date).getTime() - startTime, Ti.App.Properties.setString("Social-LoadingEstimates", JSON.stringify(estimates));
				break;
			case 'xing' :
				var response = e.source.evalJS('(p = document.getElementById("verifier")) && p.innerHTML;');
				response ? ( pin = response, destroyAuthorizeUI(), receivePinCallback()) : (loadingView && loadingView.hide(), loadingContainer && loadingContainer.hide(), webView && webView.show()), loading = !1, clearInterval(intervalID), estimates[estimateID] = (new Date).getTime() - startTime, Ti.App.Properties.setString("Social-LoadingEstimates", JSON.stringify(estimates));
				break;
		}
	}

	var consumerSecret = pConsumerSecret, consumerKey = pConsumerKey, signatureMethod = pSignatureMethod, pin = null, requestToken = null, requestTokenSecret = null, accessToken = null, accessTokenSecret = null, accessor = {
		consumerSecret : consumerSecret,
		tokenSecret : ""
	}, window = null, view = null, webView = null, loadingView = null, loadingContainer = null, receivePinCallback = null, accessTokenStore = {};

	this.loadAccessToken = function(pService) {
		console.log(pService);
		var token;
		if (accessTokenStore[pService])
			token = accessTokenStore[pService];
		else {
			var raw = Ti.App.Properties.getString(SOCIALACCESSTOKEN + pService, "");
			if (!raw) {
				console.log('Warning: no SOCIALACCESSTOKEN in store');
				return;
			}
			try {
				token = accessTokenStore[pService] = JSON.parse(raw);
			} catch (err) {
				Ti.API.error("Failed to parse stored access token for " + pService + "!"), Ti.API.error(err);
				return;
			}
		}
		token.accessToken && ( accessToken = token.accessToken), token.accessTokenSecret && ( accessTokenSecret = token.accessTokenSecret);
	};
	this.saveAccessToken = function(pService) {
		accessTokenStore[pService] = {
			accessToken : accessToken,
			accessTokenSecret : accessTokenSecret
		};
		console.log(accessTokenStore);
		Ti.App.Properties.setString(SOCIALACCESSTOKEN + pService, JSON.stringify(accessTokenStore[pService]));
	};
	this.clearAccessToken = function(pService) {
		delete accessTokenStore[pService], Ti.App.Properties.setString(SOCIALACCESSTOKEN + pService, null), accessToken = null, accessTokenSecret = null;
	};
	this.isAuthorized = function() {
		return accessToken != null && accessTokenSecret != null;
	};
	var createMessage = function(pUrl) {
		var message = {
			action : pUrl,
			method : "POST",
			parameters : []
		};
		return message.parameters.push(["oauth_consumer_key", consumerKey]), message.parameters.push(["oauth_callback", "oob"]), message.parameters.push(["oauth_signature_method", signatureMethod]), message;
	};
	var createMessageApi = function(pUrl) {
		var message = {
			action : pUrl,
			method : "POST",
			parameters : []
		};
		return message.parameters.push(["oauth_consumer_key", consumerKey]), message.parameters.push(["oauth_signature_method", signatureMethod]), message;
	};
	this.getPin = function() {
		return pin;
	}, this.getRequestToken = function(pUrl, callback) {
		accessor.tokenSecret = "";
		var message = createMessage(pUrl);
		OAuth.setTimestampAndNonce(message), OAuth.SignatureMethod.sign(message, accessor);
		var done = !1, client = Ti.Network.createHTTPClient({
			onload : function() {
				var responseParams = OAuth.getParameterMap(this.responseText);
				requestToken = responseParams.oauth_token, requestTokenSecret = responseParams.oauth_token_secret, callback({
					success : !0,
					token : this.responseText
				}), done = !0;
			},
			onerror : function() {
				Ti.API.error("Social.js: FAILED to getRequestToken!"), Ti.API.error(this.responseText), callback({
					success : !1
				}), done = !0;
			}
		});
		client.open("POST", pUrl), client.send(OAuth.getParameterMap(message.parameters));
	};
	var destroyAuthorizeUI = function() {
		if (window == null)
			return;
		try {
			webView.removeEventListener("load", authorizeUICallback), webView.removeEventListener("beforeload", showLoading), loadingView.hide(), window.close(), loading = null, webView = null, loadingView = null, loading = !1, firstLoad = !0, view = null, window = null;
		} catch (ex) {
			Ti.API.debug("Cannot destroy the authorize UI. Ignoring.");
		}
	}, firstLoad = !0, loading = !1, estimates = JSON.parse(Ti.App.Properties.getString("Social-LoadingEstimates", "{}")), estimateID, startTime, intervalID = 0;
	var self = this;
	this.showLoadingUI = function(color) {
		window = Ti.UI.createWindow({
			backgroundColor : "transparent",
			modal : true,
			zIndex : 1000
		}), Ti.Android || (window.opacity = 0, window.transform = Ti.UI.create2DMatrix().scale(0)), view = Ti.UI.createView({
			top : 10,
			right : 10,
			bottom : 10,
			left : 10,
			backgroundColor : color,
			borderColor : color,
			borderRadius : 10,
			borderWidth : 4,
			zIndex : -1
		});
		var closeLabel = Ti.UI.createButton({
			font : {
				fontSize : 11,
				fontWeight : "bold"
			},
			backgroundColor : color,
			borderColor : "#52D3FE",
			color : "#fff",
			style : 0,
			borderRadius : 6,
			title : "X",
			top : 8,
			right : 8,
			width : 30,
			height : 30
		});
		closeLabel.addEventListener("click", destroyAuthorizeUI), window.open();
		var offset = 0;
		Ti.Android && ( offset = "10dp"), loadingContainer = Ti.UI.createView({
			top : offset,
			right : offset,
			bottom : offset,
			left : offset,
			backgroundColor : "#fff"
		}), loadingView = Ti.UI.createProgressBar({
			top : 10,
			right : 10,
			bottom : 10,
			left : 10,
			min : 0,
			max : 1,
			value : 0.5,
			message : "Loading, please wait.",
			backgroundColor : "#fff",
			font : {
				fontSize : 14,
				fontWeight : "bold"
			},
			style : 0
		}), view.add(loadingContainer), loadingContainer.add(loadingView), loadingView.show(), window.add(view), window.add(closeLabel);
		if (!Ti.Android) {
			var tooBig = Ti.UI.createAnimation({
				transform : Ti.UI.create2DMatrix().scale(1.1),
				opacity : 1,
				duration : 350
			}), shrinkBack = Ti.UI.createAnimation({
				transform : Ti.UI.create2DMatrix(),
				duration : 400
			});
			tooBig.addEventListener("complete", function() {
				window.animate(shrinkBack);
			}), window.animate(tooBig);
		}
		showLoading();
	};
	this.showAuthorizeUI = function(pUrl, pReceivePinCallback) {
		console.log('Info: starting oauth webview');
		receivePinCallback = pReceivePinCallback;
		var offset = 0;
		Ti.Android && ( offset = "10dp"), webView = Ti.UI.createWebView({
			url : pUrl,
			top : offset,
			right : offset,
			bottom : offset,
			left : offset,
			autoDetect : [Ti.UI.AUTODETECT_NONE]
		}), webView.addEventListener("beforeload", showLoading), webView.addEventListener("load", authorizeUICallback), view.add(webView),webView.focus();
	};
	this.getAccessToken = function(pUrl, callback) {
		accessor.tokenSecret = requestTokenSecret;
		var message = createMessage(pUrl);
		message.parameters.push(["oauth_token", requestToken]), message.parameters.push(["oauth_verifier", pin]), OAuth.setTimestampAndNonce(message), OAuth.SignatureMethod.sign(message, accessor);
		var parameterMap = OAuth.getParameterMap(message.parameters), client = Ti.Network.createHTTPClient({
			onload : function() {
				var responseParams = OAuth.getParameterMap(this.responseText);
				Ti.API.info(responseParams.oauth_token);

				Ti.API.info(responseParams.oauth_token_secret);

				accessToken = responseParams.oauth_token, accessTokenSecret = responseParams.oauth_token_secret, callback({
					success : !0
				});
			},
			onerror : function() {
				Ti.API.error("Social.js: FAILED to getAccessToken!"), Ti.API.error(this.responseText), callback({
					success : !1
				});
			}
		});

		client.open("POST", pUrl), client.send(parameterMap);

	};
	this.Api = function(options, callback) {
		var pUrl = options.url;
		var pSuccessMessage = options.onSuccess;
		var pErrorMessage = options.onError;
		accessor.tokenSecret = accessTokenSecret;
		var message = createMessageApi(pUrl);
		message.method = options.method;
		message.parameters.push(["oauth_nonce", OAuth.nonce(42)]);
		message.parameters.push(["oauth_timestamp", OAuth.timestamp()]);
		message.parameters.push(["oauth_token", accessToken]);
		message.parameters.push(["oauth_version", "1.0"]);
		OAuth.SignatureMethod.sign(message, accessor);
		var parameterMap = OAuth.getParameterMap(message.parameters);

		client = Ti.Network.createHTTPClient({
			ondatastream : function(_e) {
				console.log(_e.progress);
				if (options.progress) {
					option.progress.setValue = _e.progress;
					if (_e.progress == 1)
						options.progress.hide();
				}
			},
			onload : function() {
				if (options.progress)
					options.progress.hide();
				if (client.status == 200) {
					callback && ( typeof callback == 'function') && callback({
						success : true,
						data : JSON.parse(this.responseText)
					});
				} else {
					if (options.progress)
						options.progress.hide();
					pErrorMessage && pErrorMessage(this.responseText);
				}
			},
			onerror : function() {
				Ti.API.error("Social.js: FAILED to send a request!");
				pErrorMessage && pErrorMessage(this.responseText);
			}
		});
		client.open(options.method, pUrl);
		header = OAuth.getAuthorizationHeader("", message.parameters);
		client.setRequestHeader("Authorization", header);
		client.send();
		if (options.progress)
			options.progress.show();
	};
	this.sendTwitterImage = function(options) {
		var pUrl = "https://api.twitter.com/1.1/statuses/update_with_media.json";
		var pTitle = options.title;
		var pSuccessMessage = options.onSuccess, pErrorMessage = options.onError;
		if (accessToken == null || accessTokenSecret == null) {
			Ti.API.debug("The send status cannot be processed as the client doesn't have an access token. Authorize before trying to send.");
			return;
		}
		accessor.tokenSecret = accessTokenSecret;
		var message = createMessage(pUrl);

		message.parameters.push(["oauth_token", accessToken]);
		message.parameters.push(["oauth_timestamp", OAuth.timestamp()]);
		message.parameters.push(["oauth_nonce", OAuth.nonce(42)]);
		message.parameters.push(["oauth_version", "1.0"]);

		OAuth.SignatureMethod.sign(message, accessor);
		var parameterMap = OAuth.getParameterMap(message.parameters);
		client = Ti.Network.createHTTPClient({
			onload : function() {
				if (client.status == 200) {
					pSuccessMessage && pSuccessMessage(this.responseText);
				} else {
					pErrorMessage && pErrorMessage(this.responseText);
				}
			},
			onerror : function() {
				Ti.API.error("Social.js: FAILED to send a request!");
				Ti.API.error(this.responseText);
				pErrorMessage && pErrorMessage(this.responseText);
			}
		});
		client.open("POST", pUrl);

		header = OAuth.getAuthorizationHeader(pUrl, message.parameters);
		client.setRequestHeader("Authorization", header);
		if (!Ti.Android) {
			client.setRequestHeader("Content-Type", "multipart/form-data");
		}
		client.send(options.params);
	};
	this.getProfileLinkedin = function(options) {
		self.Api({
			method : 'GET',
			url : 'http://api.linkedin.com/v1/people/~?format=json'
		});

	};
	this.shareLinkedin = function(options) {
		var pUrl = "http://api.linkedin.com/v1/people/~/shares";
		var pSuccessMessage = options.onSuccess;
		var pErrorMessage = options.onError;
		accessor.tokenSecret = accessTokenSecret;
		var message = createMessage(pUrl);
		message.parameters.push(["oauth_nonce", OAuth.nonce(42)]);
		message.parameters.push(["oauth_timestamp", OAuth.timestamp()]);
		message.parameters.push(["oauth_token", accessToken]);
		message.parameters.push(["oauth_version", "1.0"]);
		OAuth.SignatureMethod.sign(message, accessor);
		client = Ti.Network.createHTTPClient({
			onload : function() {
				if (client.status == 200 || client.status == 201) {
					pSuccessMessage && pSuccessMessage(this.responseText);
				} else {
					pErrorMessage && pErrorMessage(this.responseText);
				}
			},
			onerror : function() {
				Ti.API.error("Social.js: FAILED to send a request!");
				Ti.API.error(this.responseText);
				pErrorMessage && pErrorMessage(this.responseText);
			}
		});
		client.open("POST", pUrl);
		header = OAuth.getAuthorizationHeader("", message.parameters);
		client.setRequestHeader("Content-Type", "application/json");
		client.setRequestHeader("x-li-format", "json");
		client.setRequestHeader("Authorization", header);
		var payload = JSON.stringify(options.parameters);
		client.send(payload);
	};
	this.send = function(options, callback) {
		var pUrl = options.url, pParameters = options.parameters, pTitle = options.title, pSuccessMessage = options.onSuccess, pErrorMessage = options.onError;
		if (accessToken == null || accessTokenSecret == null) {
			Ti.API.debug("The send status cannot be processed as the client doesn't have an access token. Authorize before trying to send.");
			return;
		}
		accessor.tokenSecret = accessTokenSecret;
		var message = createMessage(pUrl);
		message.parameters.push(["oauth_token", accessToken]);
		for (p in pParameters)
		message.parameters.push(pParameters[p]);
		OAuth.setTimestampAndNonce(message), OAuth.SignatureMethod.sign(message, accessor);
		var parameterMap = OAuth.getParameterMap(message.parameters), client = Ti.Network.createHTTPClient({
			onload : function() {
				client.status == 200 ? pSuccessMessage && pSuccessMessage(this.responseText) : pErrorMessage && pErrorMessage(this.responseText);
			},
			onerror : function() {
				Ti.API.info(this.responseText);
				Ti.API.error("Social.js: FAILED to send a request!"), pErrorMessage && pErrorMessage(this.responseText);
			}
		});
		client.open("POST", pUrl), client.send(parameterMap);
	};
};
