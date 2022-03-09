function __uspapi(command, version, callback) {
  var APIVersion = 1,
    uspData = null,
    isSuccess = !0,
    uspApplies = !0;
  if (
    (CookieConsent &&
      "" !== CookieConsent.userCountry &&
      -1 ===
        CookieConsent.regulationRegions.ccpa.indexOf(
          CookieConsent.userCountry.toLowerCase()
        ) &&
      (uspApplies = !1),
    1 === version)
  )
    if ("getUSPData" === command)
      if (uspApplies) {
        var uspString = (1).toString();
        (uspString += "Y"),
          CookieConsent && CookieConsent.hasResponse
            ? CookieConsent.consent.marketing
              ? (uspString += "N")
              : (uspString += "Y")
            : CookieConsent && !CookieConsent.hasResponse
            ? (uspString += "N")
            : (uspString += "Y"),
          (uspString += "Y"),
          (uspData = { version: 1, uspString: uspString });
      } else uspData = { version: 1, uspString: (1).toString() + "---" };
    else isSuccess = !1;
  else isSuccess = !1;
  callback && callback(uspData, isSuccess);
}
function addUspapiLocatorFrame() {
  if (!window.frames.__uspapiLocator)
    if (document.body) {
      var iframe = document.createElement("iframe");
      (iframe.style.cssText =
        "display:none;position:absolute;width:1px;height:1px;top:-9999px;"),
        (iframe.name = "__uspapiLocator"),
        (iframe.tabIndex = -1),
        iframe.setAttribute("role", "presentation"),
        iframe.setAttribute("aria-hidden", "true"),
        iframe.setAttribute("title", "Blank"),
        document.body.appendChild(iframe);
    } else setTimeout(addUspapiLocatorFrame, 5);
}
function __handleUspapiMessage(event) {
  var data = event && event.data && event.data.__uspapiCall;
  data &&
    "function" == typeof window.__uspapi &&
    window.__uspapi(
      data.command,
      data.version,
      function (returnValue, success) {
        event.source.postMessage(
          {
            __uspapiReturn: {
              returnValue: returnValue,
              success: success,
              callId: data.callId,
            },
          },
          "*"
        );
      }
    );
}
function propagateIABStub() {
  function postMessageEventHandler(event) {
    var msgIsString = "string" == typeof event.data,
      json = {};
    try {
      json = msgIsString ? JSON.parse(event.data) : event.data;
    } catch (ignore) {}
    var payload = json && json.__tcfapiCall;
    payload &&
      window.__tcfapi(
        payload.command,
        payload.version,
        function (retValue, success) {
          var returnMsg = {
            __tcfapiReturn: {
              returnValue: retValue,
              success: success,
              callId: payload.callId,
            },
          };
          msgIsString && (returnMsg = JSON.stringify(returnMsg)),
            event &&
              event.source &&
              event.source.postMessage &&
              event.source.postMessage(returnMsg, "*");
        },
        payload.parameter
      );
  }
  var TCF_LOCATOR_NAME = "__tcfapiLocator",
    queue = [],
    win = window,
    cmpFrame;
  function addFrame() {
    var doc = win.document,
      otherCMP = !!win.frames.__tcfapiLocator;
    if (!otherCMP)
      if (doc.body) {
        var iframe = doc.createElement("iframe");
        (iframe.style.cssText = "display:none"),
          (iframe.name = TCF_LOCATOR_NAME),
          doc.body.appendChild(iframe);
      } else setTimeout(addFrame, 5);
    return !otherCMP;
  }
  function tcfAPIHandler() {
    for (var args = [], i = 0, gdprApplies; i < arguments.length; i++)
      args.push(arguments[i]);
    if (!args.length) return queue;
    if ("setGdprApplies" === args[0])
      args.length > 3 &&
        2 === parseInt(args[1], 10) &&
        "boolean" == typeof args[3] &&
        ((gdprApplies = args[3]),
        "function" == typeof args[2] && args[2]("set", !0));
    else if ("ping" === args[0]) {
      var retr = { gdprApplies: gdprApplies, cmpLoaded: !1, cmpStatus: "stub" };
      "function" == typeof args[2] && args[2](retr);
    } else queue.push(args);
  }
  for (; win; ) {
    try {
      if (win.frames.__tcfapiLocator) {
        cmpFrame = win;
        break;
      }
    } catch (ignore) {}
    if (win === window.top) break;
    win = win.parent;
  }
  cmpFrame ||
    (addFrame(),
    (win.__tcfapi = tcfAPIHandler),
    win.addEventListener("message", postMessageEventHandler, !1));
}
"undefined" == typeof CookieControl && (window.CookieControl = {}),
  (CookieControl.Cookie = function (n) {
    (this.name = n),
      (this.consented = !1),
      (this.declined = !1),
      (this.changed = !1),
      (this.hasResponse = !1),
      (this.consentID = "0"),
      (this.consent = {
        stamp: "0",
        necessary: !0,
        preferences: !1,
        statistics: !1,
        marketing: !1,
      }),
      (this.isOutsideEU = !1),
      (this.isOutOfRegion = !1),
      (this.host = "https://consent.cookiebot.com/"),
      (this.domain = ""),
      (this.currentPath = "/"),
      (this.doNotTrack = !1),
      (this.consentLevel = "strict"),
      (this.isRenewal = !1),
      (this.forceShow = !1),
      (this.dialog = null),
      (this.responseMode = ""),
      (this.serial = ""),
      (this.scriptId = "Cookiebot"),
      (this.scriptElement = null),
      (this.whitelist = []),
      (this.cookieList = {
        cookieTablePreference: [],
        cookieTableStatistics: [],
        cookieTableAdvertising: [],
        cookieTableUnclassified: [],
      }),
      (this.pathlist = []),
      (this.userIsInPath = !0),
      (this.cookieEnabled = !0),
      (this.versionChecked = !1),
      (this.versionRequested = !1),
      (this.version = 1),
      (this.latestVersion = 1),
      (this.isNewVersion = !1),
      (this.CDN = null),
      (this.source = ""),
      (this.retryCounter = 0),
      (this.frameRetryCounter = 0),
      (this.bulkConsentFrameRetryCounter = 0),
      (this.setOnloadFrameRetryCounter = 0),
      (this.optOutLifetime = 12),
      (this.consentModeDisabled = !1),
      (this.consentModeDataRedaction = "dynamic"),
      (this.consentLifetime = null),
      (this.framework = ""),
      (this.hasFramework = !1),
      (this.frameworkBlocked = !1),
      (this.frameworkLoaded = !1),
      (this.iframeReady = !1),
      (this.iframe = null),
      (this.bulkconsent = null),
      (this.bulkresetdomains = []),
      (this.bulkconsentsubmitted = !1),
      (this.isbulkrenewal = !1),
      (this.wipe = { preferences: !0, statistics: !0, marketing: !0 }),
      (this.consentUTC = null),
      (this.IABConsentString = ""),
      (this.GACMConsentString = ""),
      (this.dataLayerName = (function () {
        function isContainer(name) {
          return !!google_tag_manager[name].dataLayer;
        }
        var containerName = window.google_tag_manager
          ? Object.keys(google_tag_manager).filter(isContainer)[0]
          : null;
        return containerName
          ? google_tag_manager[containerName].dataLayer.name
          : "dataLayer";
      })()),
      (this.loaded = !1),
      (this.autoblock = !1),
      (this.mutationObserver = null),
      (this.mutationCounter = 0),
      (this.mutationFallback = !1),
      (this.mutationFallbackDocAttributes = []),
      (this.mutationHandlerFallbackCharsetLoaded = !1),
      (this.mutationAppName = ""),
      (this.mutationEventListeners = []),
      (this.mutationOnloadEventListeners = []),
      (this.mutateEventListeners = !1),
      (this.mutationHandlerFirstScript = null),
      (this.postPonedMutations = []),
      (this.nonAsyncMutations = []),
      (this.deferMutations = []),
      (this.geoRegions = []),
      (this.userCountry = ""),
      (this.userCulture = ""),
      (this.userCultureOverride = null),
      (this.windowOnloadTriggered = !1),
      (this.botDetectionDisabled = !1),
      (this.regulations = {
        gdprApplies: !0,
        ccpaApplies: !0,
        lgpdApplies: !0,
      }),
      (this.regulationRegions = {
        gdpr: [
          "at",
          "be",
          "bg",
          "cy",
          "cz",
          "de",
          "dk",
          "es",
          "ee",
          "fi",
          "fr",
          "gb",
          "gr",
          "hr",
          "hu",
          "ie",
          "it",
          "lt",
          "lu",
          "lv",
          "mt",
          "nl",
          "pl",
          "pt",
          "ro",
          "sk",
          "si",
          "se",
          "li",
          "no",
          "is",
        ],
        ccpa: ["us-06"],
        lgpd: ["br"],
      }),
      (this.commonTrackers = {
        domains: [
          { d: "google-analytics.com", c: [3] },
          { d: "youtube.com", c: [4] },
          { d: "youtube-nocookie.com", c: [4] },
          { d: "googleadservices.com", c: [4] },
          { d: "googlesyndication.com", c: [4] },
          { d: "doubleclick.net", c: [4] },
          { d: "facebook.*", c: [4] },
          { d: "linkedin.com", c: [4] },
          { d: "twitter.com", c: [4] },
          { d: "addthis.com", c: [4] },
          { d: "bing.com", c: [4] },
          { d: "sharethis.com", c: [4] },
          { d: "yahoo.com", c: [4] },
          { d: "addtoany.com", c: [4] },
          { d: "dailymotion.com", c: [4] },
          { d: "amazon-adsystem.com", c: [4] },
          { d: "snap.licdn.com", c: [4] },
        ],
      }),
      (this.configuration = {
        loaded: !1,
        loadRetry: 0,
        tags: [],
        trackingDomains: [],
      }),
      (this.inlineConfiguration = null),
      (this.widget = null),
      (this.init = function () {
        var that = this,
          newElement;
        if ("cookie" in document) {
          var testcookie = this.getCookie(this.name);
          if (!testcookie) {
            var secureAttribute =
              "https:" === window.location.protocol ? ";secure" : "";
            (this.cookieEnabled =
              (document.cookie =
                this.name +
                "=-3;expires=Thu, 01 Jan 2060 00:00:00 GMT" +
                secureAttribute).indexOf.call(document.cookie, this.name) > -1),
              this.cookieEnabled &&
                (document.cookie =
                  this.name +
                  "=-3;expires=Thu, 01 Jan 1970 00:00:00 GMT" +
                  secureAttribute);
          }
        } else this.cookieEnabled = !1;
        function logMissingUcReference() {
          var supportUrl = "https://www.cookiebot.com/en/help/";
          console.warn(
            "Cookiebot: Cookiebot was unable to reference the uc.js script, which should be declared with an ID attribute set to 'Cookiebot'. For more information about Cookiebot setup, see %s",
            supportUrl
          );
        }
        this.cookieEnabled ||
          ((this.isOutsideEU = !1),
          (this.isOutOfRegion = !1),
          (this.hasResponse = !0),
          (this.declined = !0),
          (this.consented = !1),
          (this.consent.preferences = !1),
          (this.consent.statistics = !1),
          (this.consent.marketing = !1),
          (this.consentID = "-3"),
          (this.consent.stamp = "-3")),
          void 0 === document.createElementOrig &&
            (document.createElementOrig = document.createElement),
          (document.createElement =
            ((newElement = document.createElement),
            function () {
              var element = newElement.apply(this, arguments);
              return (element.isCookiebotDynamicTag = 1), element;
            })),
          window.addEventListener
            ? window.addEventListener("load", this.signalWindowLoad, !1)
            : window.attachEvent("onload", this.signalWindowLoad);
        var d = document.getElementById(this.scriptId);
        if (d && "script" === d.tagName.toLowerCase())
          this.hasAttr(d, "src") && (this.source = d.getAttribute("src"));
        else if (
          ((this.scriptId = "CookieConsent"),
          (d = document.getElementById(this.scriptId)),
          !d || "script" !== d.tagName.toLowerCase())
        ) {
          for (
            var tagsAll = document.getElementsByTagName("script"), i = 0;
            i < tagsAll.length;
            i++
          ) {
            var currentTag = tagsAll[i];
            if (
              this.hasAttr(currentTag, "src") &&
              (this.hasAttr(currentTag, "data-cbid") ||
                currentTag.getAttribute("src").toLowerCase().indexOf("cbid=") >
                  0) &&
              currentTag.getAttribute("src").toLowerCase().indexOf("/uc.js") > 0
            ) {
              (d = currentTag), (this.source = currentTag.getAttribute("src"));
              break;
            }
          }
          if (d) {
            if (this.hasAttr(d, "id")) this.scriptId = d.getAttribute("id");
            else if (this.hasAttr(d, "src")) {
              var scriptSrc = d.getAttribute("src").toLowerCase();
              -1 === scriptSrc.indexOf("consent.cookiebot.com") &&
                -1 === scriptSrc.indexOf("consent.cookiebot.eu") &&
                ((this.scriptId = "CookieConsent"),
                (d.id = this.scriptId),
                (this.source = d.getAttribute("src")),
                logMissingUcReference());
            }
          } else logMissingUcReference();
        }
        function getUserCultures() {
          return navigator.languages && navigator.languages.length
            ? navigator.languages
            : [
                navigator.language ||
                  navigator.browserLanguage ||
                  navigator.userLanguage,
              ];
        }
        if (((this.userCulture = getUserCultures()[0]), d)) {
          function hostHasSuffix(host, suffix) {
            var fromIndex = host.length - suffix.length;
            return -1 !== host.indexOf(suffix, fromIndex);
          }
          (this.scriptElement = d),
            (this.host = "https://" + d.src.match(/:\/\/(.[^/]+)/)[1] + "/"),
            hostHasSuffix(this.host, "cookiebot.eu/")
              ? (this.CDN = "https://consentcdn.cookiebot.eu")
              : (this.CDN = "https://consentcdn.cookiebot.com");
          var e = d.getAttribute("data-cbid"),
            ex = this.getURLParam("cbid");
          ex && (e = ex), e && this.isGUID(e) && (this.serial = e);
          var p = d.getAttribute("data-path");
          if (p) {
            var custompathlist = p.replace(/ /g, "");
            this.pathlist = custompathlist.split(",");
          }
          var p2 = d.getAttribute("data-blockingmode");
          p2 && "auto" === p2.toLowerCase() && (this.autoblock = !0);
          var pol = d.getAttribute("data-optoutlifetime");
          pol && "0" === pol && (this.optOutLifetime = "0");
          var pw1 = d.getAttribute("data-wipe-preferences");
          pw1 && "0" === pw1.toLowerCase() && (this.wipe.preferences = !1);
          var pw2 = d.getAttribute("data-wipe-statistics");
          pw2 && "0" === pw2.toLowerCase() && (this.wipe.statistics = !1);
          var pw3 = d.getAttribute("data-wipe-marketing");
          pw3 && "0" === pw3.toLowerCase() && (this.wipe.marketing = !1);
          var pf = d.getAttribute("data-framework");
          pf && (this.framework = pf);
          var pg = d.getAttribute("data-georegions");
          pg && this.registerGeoRegions(pg);
          var uc = d.getAttribute("data-user-country");
          uc && (this.userCountry = uc);
          var uc = d.getAttribute("data-culture");
          uc && ((this.userCulture = uc), (this.userCultureOverride = uc));
          var we = d.getAttribute("data-widget-enabled");
          we &&
            ("true" === we || "false" === we
              ? ((this.widget = this.widget || {}),
                (this.widget.enabledOverride = "true" === we))
              : this.logWidgetAttributeWarning("data-widget-enabled", we));
          var cm = d.getAttribute("data-consentmode");
          cm &&
            "disabled" === cm.toLowerCase() &&
            (this.consentModeDisabled = !0);
          var cmdr =
            this.getURLParam("consentmode-dataredaction") ||
            d.getAttribute("data-consentmode-dataredaction");
          cmdr &&
            ("true" === cmdr || "false" === cmdr || "dynamic" === cmdr
              ? (this.consentModeDataRedaction = cmdr)
              : console.warn(
                  "Cookiebot: Cookiebot script attribute 'data-consentmode-dataredaction' with value '%s' is invalid. Supported values are 'true', 'false' or 'dynamic'",
                  cmdr
                )),
            (this.dataLayerName =
              d.getAttribute("data-layer-name") || this.dataLayerName);
        }
        var px = this.getURLParam("path");
        if (px) {
          var custompathlist = px.replace(/ /g, "");
          this.pathlist = custompathlist.split(",");
        }
        var px2 = this.getURLParam("blockingmode");
        px2 && "auto" === px2.toLowerCase() && (this.autoblock = !0);
        var polx = this.getURLParam("optoutlifetime");
        polx && "0" === polx && (this.optOutLifetime = "0");
        var pwx1 = this.getURLParam("wipe_preferences");
        pwx1 && "0" === pwx1.toLowerCase() && (this.wipe.preferences = !1);
        var pwx2 = this.getURLParam("wipe_statistics");
        pwx2 && "0" === pwx2.toLowerCase() && (this.wipe.statistics = !1);
        var pwx3 = this.getURLParam("wipe_marketing");
        pwx3 && "0" === pwx3.toLowerCase() && (this.wipe.marketing = !1);
        var pfx = this.getURLParam("framework");
        pfx && (this.framework = pfx);
        var pfy = this.getURLParam("georegions");
        pfy && this.registerGeoRegions(pfy);
        var pfz = this.getURLParam("user_country");
        pfz && (this.userCountry = pfz);
        var puc = this.getURLParam("culture");
        puc && (this.userCulture = puc);
        var pcm = this.getURLParam("consentmode");
        pcm &&
          "disabled" === pcm.toLowerCase() &&
          (this.consentModeDisabled = !0),
          (window.Cookiebot = this),
          (this.domain = window.location.hostname.toLowerCase()),
          0 === this.domain.indexOf("www.") &&
            (this.domain = this.domain.substring(4));
        var gDisableBotDetection = this.getDomainUrlParam(
          "g_disable_bot_detection"
        );
        gDisableBotDetection &&
          "1" === gDisableBotDetection &&
          (this.botDetectionDisabled = !0),
          ("iab" !== this.framework.toLowerCase() &&
            "iab1" !== this.framework.toLowerCase() &&
            "iabv2" !== this.framework.toLowerCase()) ||
            ((this.hasFramework = !0), (this.framework = "IABv2")),
          this.frameworkBlocked &&
            ((this.hasFramework = !1), (this.framework = "")),
          "IABv2" === this.framework && propagateIABStub(),
          this.consentModeDisabled ||
            this.pushGoogleConsent("set", "developer_id.dMWZhNz", !0);
        for (var temppathlist = [], i = 0; i < this.pathlist.length; i++) {
          var currentpath = this.pathlist[i];
          "" !== currentpath &&
            (0 !== currentpath.indexOf("/") &&
              (currentpath = "/" + currentpath),
            temppathlist.push(decodeURIComponent(currentpath)));
        }
        if (((this.pathlist = temppathlist), this.pathlist.length > 0)) {
          this.userIsInPath = !1;
          var userCurrentPath = window.location.pathname;
          if ("/" !== userCurrentPath)
            for (var i = 0; i < this.pathlist.length; i++)
              if (
                0 ===
                userCurrentPath
                  .toLowerCase()
                  .indexOf(this.pathlist[i].toLowerCase())
              ) {
                (this.currentPath = this.pathlist[i]), (this.userIsInPath = !0);
                break;
              }
          this.userIsInPath ||
            ((this.consented = !0),
            (this.declined = !1),
            (this.hasResponse = !0),
            (this.consent.preferences = !0),
            (this.consent.statistics = !0),
            (this.consent.marketing = !0),
            (this.consentLevel = "implied"));
        }
        if (this.userIsInPath) {
          var c = this.getCookie(this.name);
          if (c) {
            if (
              ("-2" === c
                ? ((this.declined = !1),
                  (this.consented = !1),
                  (this.hasResponse = !1),
                  (this.consent.preferences = !1),
                  (this.consent.statistics = !1),
                  (this.consent.marketing = !1),
                  (this.consentLevel = "implied"),
                  (this.versionChecked = !0))
                : ("0" === c
                    ? ((this.declined = !0),
                      (this.consent.preferences = !1),
                      (this.consent.statistics = !1),
                      (this.consent.marketing = !1),
                      (this.responseMode = "leveloptin"),
                      (this.versionChecked = !0))
                    : ((this.hasResponse = !0),
                      (this.declined = !1),
                      (this.consented = !0),
                      (this.consent.preferences = !0),
                      (this.consent.statistics = !0),
                      (this.consent.marketing = !0),
                      "-1" === c &&
                        ((this.isOutsideEU = !0),
                        (this.isOutOfRegion = !0),
                        (this.versionChecked = !0),
                        (this.version = this.latestVersion),
                        (this.iframeReady = !0),
                        (this.consentUTC = new Date()),
                        this.updateRegulations())),
                  (this.hasResponse = !0),
                  "-1" === c ||
                    this.iframeReady ||
                    ((this.iframeReady = !1), this.loadCDNiFrame())),
              0 === c.indexOf("{") && c.indexOf("}") > 0)
            ) {
              var consentJSON = c
                  .replace(/%2c/g, ",")
                  .replace(/'/g, '"')
                  .replace(/([{\[,])\s*([a-zA-Z0-9_]+?):/g, '$1"$2":'),
                consentObject = JSON.parse(consentJSON);
              (this.consentID = consentObject.stamp),
                (this.consent.stamp = consentObject.stamp),
                (this.consent.preferences = consentObject.preferences),
                (this.consent.statistics = consentObject.statistics),
                (this.consent.marketing = consentObject.marketing),
                (this.isOutsideEU = "-1" === this.consent.stamp),
                (this.isOutOfRegion = "-1" === this.consent.stamp),
                this.consent.preferences ||
                  this.consent.statistics ||
                  this.consent.marketing ||
                  ((this.declined = !0),
                  (this.consented = !1),
                  (this.responseMode = "leveloptin"),
                  (this.versionChecked = !0)),
                void 0 !== consentObject.utc &&
                  (this.consentUTC = new Date(consentObject.utc)),
                void 0 !== consentObject.iab &&
                  ((this.IABConsentString = consentObject.iab),
                  this.hasFramework &&
                    "iabv2" === this.framework.toLowerCase() &&
                    !this.frameworkBlocked &&
                    ((this.IABConsentString = ""), this.deleteConsentCookie())),
                void 0 !== consentObject.iab2 &&
                  this.hasFramework &&
                  "iabv2" === this.framework.toLowerCase() &&
                  !this.frameworkBlocked &&
                  (this.IABConsentString = consentObject.iab2),
                void 0 !== consentObject.gacm &&
                  (this.GACMConsentString = consentObject.gacm),
                void 0 !== consentObject.region &&
                  ("" === this.userCountry &&
                    (this.userCountry = consentObject.region),
                  this.updateRegulations()),
                void 0 !== consentObject.ver &&
                  (this.version = consentObject.ver),
                (this.responseMode = "leveloptin");
            } else (this.consentID = c), (this.consent.stamp = c);
            this.changed || this.triggerGTMEvents();
          } else {
            if (this.isSpider()) return void this.setOutOfRegion();
            this.loadCDNiFrame(),
              this.bulkconsentsubmitted || this.checkForBulkConsent();
          }
          if (
            this.autoblock &&
            !(
              this.consent.preferences &&
              this.consent.statistics &&
              this.consent.marketing
            )
          ) {
            var hasTopLocation = !1;
            try {
              top && top.location && (hasTopLocation = !0);
            } catch (e) {}
            if (
              hasTopLocation &&
              top.location.pathname.indexOf("wp-admin") >= 0
            )
              this.autoblock = !1;
            else {
              for (var i = 0; i < this.commonTrackers.domains.length; i++) {
                var testDomain = this.commonTrackers.domains[i];
                "*" === testDomain.d.substr(testDomain.d.length - 1, 1) &&
                  (testDomain.d = testDomain.d.substr(
                    0,
                    testDomain.d.length - 1
                  ));
              }
              this.initMutationObserver();
            }
          }
        }
        this.initConsent();
      }),
      (this.initConsent = function () {
        var that = this;
        if (!this.iframeReady && this.frameRetryCounter < 40)
          return (
            this.frameRetryCounter++,
            void setTimeout(function () {
              that.initConsent();
            }, 50)
          );
        if (
          ((this.iframeReady = !0),
          (this.frameRetryCounter = 0),
          this.hasFramework &&
            !this.frameworkBlocked &&
            "iabv2" === this.framework.toLowerCase() &&
            !this.frameworkLoaded)
        ) {
          var d = document.getElementById("CookiebotConfiguration");
          if (
            d &&
            "script" === d.tagName.toLowerCase() &&
            d.type &&
            "application/json" === d.type.toLowerCase()
          )
            try {
              (this.inlineConfiguration = JSON.parse(d.innerHTML)),
                (void 0 !== this.inlineConfiguration.Frameworks &&
                  void 0 !== this.inlineConfiguration.Frameworks.IABTCF2) ||
                  (this.inlineConfiguration = null);
            } catch (e) {
              (this.inlineConfiguration = null),
                console.log(
                  "Error in Cookiebot inline configuration section within tag Id 'CookiebotConfiguration'."
                );
            }
          this.getScript(
            this.host + "Framework/IAB/consent-sdk-2.0.js",
            !1,
            function () {
              CookieConsentIABCMP.initFramework(), (that.frameworkLoaded = !0);
            }
          );
        }
        this.setDNTState(),
          this.setHeaderStyles(),
          this.consented || this.declined
            ? (this.signalConsentReady(), this.setOnload())
            : (document.addEventListener
                ? document.addEventListener(
                    "click",
                    that.submitImpliedConsent,
                    !0
                  )
                : document.attachEvent &&
                  document.attachEvent("onclick", that.submitImpliedConsent),
              this.process(!1),
              document.body
                ? that.cbonloadevent()
                : window.addEventListener
                ? window.addEventListener("load", that.cbonloadevent, !1)
                : window.attachEvent("onload", that.cbonloadevent));
      }),
      (this.signalWindowLoad = function () {
        (CookieConsent.windowOnloadTriggered = !0),
          window.removeEventListener
            ? window.removeEventListener("load", CookieConsent.signalWindowLoad)
            : window.detachEvent &&
              window.detachEvent("onload", CookieConsent.signalWindowLoad),
          CookieConsent.stopMutationObserver();
      }),
      (this.registerGeoRegions = function (geodata) {
        if (
          this.geoRegions &&
          0 === this.geoRegions.length &&
          geodata &&
          geodata.length > 0
        ) {
          var JSONversion =
            '{"configs": [' +
            geodata.replace(/ /g, "").replace(/'/g, '"') +
            "]}";
          try {
            var jsonArray = JSON.parse(JSONversion);
            if (jsonArray.configs)
              for (var i = 0; i < jsonArray.configs.length; i++)
                jsonArray.configs[i].region &&
                  jsonArray.configs[i].cbid &&
                  this.geoRegions.push({
                    r: jsonArray.configs[i].region,
                    i: jsonArray.configs[i].cbid,
                  });
          } catch (e) {
            this.log(
              "ERROR IN GEOREGIONS ATTRIBUTE VALUE - NOT A VALID JSON ARRAY: " +
                geodata
            );
          }
        }
      });
    var IMPLIED_TRIGGER_PATTERN =
      /(\s+|^)cookieconsent-implied-trigger(\s+|$)/i;
    function isImpliedConsentTrigger(target) {
      return (
        target &&
        1 === target.nodeType &&
        ("A" === target.tagName ||
          "BUTTON" === target.tagName ||
          IMPLIED_TRIGGER_PATTERN.test(target.className))
      );
    }
    var COMMAND_LINK_PATTERN = /javascript:.*\b(CookieConsent|Cookiebot)\b/;
    function isCommandLink(target) {
      return "A" === target.tagName && COMMAND_LINK_PATTERN.test(target.href);
    }
    (this.submitImpliedConsent = function (event) {
      if (
        "object" == typeof CookieConsent &&
        !CookieConsent.hasResponse &&
        "object" == typeof CookieConsentDialog &&
        "implied" === CookieConsentDialog.consentLevel &&
        !CookieConsent.mutationFallback
      ) {
        for (
          var target = event.target;
          target && !isImpliedConsentTrigger(target);

        )
          target = target.parentNode;
        if (!target) return;
        for (var parent = target; parent; ) {
          if (parent.id && parent.id === CookieConsentDialog.DOMid) return;
          parent = parent.parentNode;
        }
        if (isCommandLink(target)) return;
        if (
          (CookieConsent.submitConsent(!0, window.location.href, !1),
          document.removeEventListener(
            "click",
            CookieConsent.submitImpliedConsent,
            !0
          ),
          document.createEventObject &&
            !document.createEvent &&
            "function" != typeof MouseEvent)
        )
          return;
        "object" == typeof window.performance &&
          "function" == typeof window.performance.getEntriesByType &&
          (this.performanceEntriesCounter =
            window.performance.getEntriesByType("resource").length),
          setTimeout(function () {
            CookieConsent.processLinkClick(event.target);
          }, 1e3),
          event.bubbles && event.stopPropagation(),
          event.preventDefault();
      }
    }),
      (this.cbonloadevent = function () {
        "object" == typeof CookieConsent && (CookieConsent.loaded = !0),
          setTimeout(function () {
            "object" == typeof CookieConsent && CookieConsent.applyDisplay(),
              "undefined" != typeof CookieDeclaration &&
                "function" == typeof CookieDeclaration.SetUserStatusLabel &&
                CookieDeclaration.SetUserStatusLabel(),
              "object" == typeof CookieConsentDialog &&
                (CookieConsentDialog.pageHasLoaded = !0);
          }, 1e3);
      }),
      (this.processLinkClickCounter = 0),
      (this.performanceEntriesCounter = 0),
      (this.processLinkClick = function (waittarg) {
        this.processLinkClickCounter += 1;
        var currentPerformanceEntriesCount = 0;
        if (
          ("object" == typeof window.performance &&
          "function" == typeof window.performance.getEntriesByType
            ? (currentPerformanceEntriesCount =
                window.performance.getEntriesByType("resource").length)
            : (this.performanceEntriesCounter = 0),
          this.performanceEntriesCounter !== currentPerformanceEntriesCount &&
            this.processLinkClickCounter < 6)
        )
          (this.performanceEntriesCounter = currentPerformanceEntriesCount),
            setTimeout(function () {
              CookieConsent.processLinkClick(waittarg);
            }, 1e3);
        else if (
          ((this.processLinkClickCounter = 0),
          (this.performanceEntriesCounter = 0),
          "function" == typeof MouseEvent)
        ) {
          var evt = new MouseEvent("click", {
            view: window,
            bubbles: !0,
            cancelable: !0,
          });
          waittarg.dispatchEvent(evt);
        } else if (document.createEvent) {
          var evt = document.createEvent("MouseEvents");
          evt.initEvent("click", !0, !1), waittarg.dispatchEvent(evt);
        } else
          "function" == typeof waittarg.onclick
            ? waittarg.onclick()
            : "function" == typeof waittarg.click && waittarg.click();
      }),
      (this.loadCDNiFrame = function () {
        var that = this;
        document.body
          ? (this.iframe ||
              (window.postMessage && window.JSON && window.localStorage
                ? ((this.iframe = document.createElementOrig("iframe")),
                  (this.iframe.style.cssText =
                    "position:absolute;width:1px;height:1px;top:-9999px;"),
                  (this.iframe.tabIndex = -1),
                  this.iframe.setAttribute("role", "presentation"),
                  this.iframe.setAttribute("aria-hidden", "true"),
                  this.iframe.setAttribute("title", "Blank"),
                  document.body.appendChild(this.iframe),
                  this.iframe.addEventListener(
                    "load",
                    function () {
                      that.readBulkConsent();
                    },
                    !1
                  ),
                  window.addEventListener(
                    "message",
                    function (event) {
                      that.handleBulkConsentIframeMessage(event);
                    },
                    !1
                  ))
                : (this.iframeReady = !0)),
            this.iframe && !this.iframeReady
              ? (this.iframe.src = this.CDN + "/sdk/bc-v3.min.html")
              : (this.iframeReady = !0))
          : setTimeout(function () {
              CookieConsent.loadCDNiFrame();
            }, 100);
      }),
      (this.readBulkConsent = function () {
        if (
          CookieConsent &&
          null != CookieConsent.iframe &&
          void 0 !== CookieConsent.iframe.contentWindow
        ) {
          var postObj = { action: "get", serial: this.serial.toLowerCase() };
          try {
            CookieConsent.iframe.contentWindow.postMessage(postObj, this.CDN);
          } catch (e) {
            CookieConsent.iframeReady = !0;
          }
        } else CookieConsent.iframeReady = !0;
      }),
      (this.handleBulkConsentIframeMessage = function (event) {
        if (event && event.origin && event.data && event.origin === this.CDN) {
          try {
            var bulkConsentData = event.data;
            if ("string" == typeof bulkConsentData) {
              if ("bcEmpty" === bulkConsentData)
                return (
                  (this.bulkresetdomains = []),
                  void (CookieConsent.iframeReady = !0)
                );
              bulkConsentData = JSON.parse(bulkConsentData);
            }
            if (
              (bulkConsentData.value &&
                (bulkConsentData = bulkConsentData.value),
              (this.bulkresetdomains = bulkConsentData.resetdomains),
              bulkConsentData.bulkconsent)
            ) {
              if (
                ((this.bulkconsent = bulkConsentData.bulkconsent),
                bulkConsentData.bulkconsent.utc)
              ) {
                var expireMonths = bulkConsentData.bulkconsent.expireMonths;
                if (
                  (void 0 === expireMonths &&
                    (expireMonths = isNaN(this.consentLifetime)
                      ? 12
                      : this.consentLifetime),
                  0 !== expireMonths)
                ) {
                  var expireDate = new CookieControl.DateTime(
                    bulkConsentData.bulkconsent.utc
                  ).addMonths(expireMonths);
                  if (expireDate < new Date())
                    return (
                      this.removeBulkReset(),
                      this.deleteConsentCookie(),
                      void this.init()
                    );
                }
              }
            } else this.bulkresetdomains = [];
          } catch (e) {}
          CookieConsent.iframeReady = !0;
        }
      }),
      (this.checkForBulkConsent = function () {
        var that = this;
        if (!this.iframeReady && this.bulkConsentFrameRetryCounter < 40)
          return (
            this.bulkConsentFrameRetryCounter++,
            void setTimeout(function () {
              that.checkForBulkConsent();
            }, 50)
          );
        if (
          ((this.iframeReady = !0),
          (this.bulkConsentFrameRetryCounter = 0),
          this.bulkresetdomains.length > 0 && !this.changed)
        ) {
          var domainmustrenew = !1,
            currentHost = window.location.hostname.toLowerCase(),
            althost = currentHost;
          althost =
            0 === currentHost.indexOf("www.")
              ? althost.substring(4)
              : "www." + althost;
          for (var j = 0; j < this.bulkresetdomains.length; j++)
            if (
              currentHost === this.bulkresetdomains[j] ||
              althost === this.bulkresetdomains[j]
            ) {
              domainmustrenew = !0;
              break;
            }
          if (domainmustrenew && this.iframe)
            return (
              (this.isbulkrenewal = !0),
              null != this.bulkconsent
                ? ((this.consent.preferences = !1),
                  (this.consent.statistics = !1),
                  (this.consent.marketing = !1),
                  this.bulkconsent.iab2 &&
                    this.hasFramework &&
                    "iabv2" === this.framework.toLowerCase() &&
                    !this.frameworkBlocked &&
                    (this.IABConsentString = this.bulkconsent.iab2),
                  this.bulkconsent.gacm &&
                    (this.GACMConsentString = this.bulkconsent.gacm),
                  (this.bulkconsentsubmitted = !0),
                  void this.submitCustomConsent(
                    this.bulkconsent.preferences,
                    this.bulkconsent.statistics,
                    this.bulkconsent.marketing
                  ))
                : (this.deleteConsentCookie(),
                  this.removeCurrentDomainBulkReset(),
                  void this.init())
            );
        }
      }),
      (this.deleteConsentCookie = function () {
        (document.cookie =
          this.name + "=;Path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT"),
          (this.consent.preferences = !1),
          (this.consent.statistics = !1),
          (this.consent.marketing = !1),
          (this.hasResponse = !1),
          (this.consented = !1),
          (this.declined = !1);
      }),
      (this.resetBulkDomains = function (newDomains, updateStorage) {
        if (
          this.iframe &&
          window.postMessage &&
          window.JSON &&
          window.localStorage &&
          newDomains.length > 0
        ) {
          for (var i = 0; i < newDomains.length; i++) {
            for (
              var domainExists = !1, j = 0;
              j < this.bulkresetdomains.length;
              j++
            )
              if (newDomains[i] === this.bulkresetdomains[j]) {
                domainExists = !0;
                break;
              }
            domainExists || this.bulkresetdomains.push(newDomains[i]);
          }
          var currentHost = window.location.hostname.toLowerCase(),
            altHost = currentHost;
          (altHost =
            0 === currentHost.indexOf("www.")
              ? altHost.substring(4)
              : "www." + altHost),
            (this.bulkresetdomains = this.bulkresetdomains.filter(function (
              item
            ) {
              return item !== currentHost && item !== altHost;
            })),
            updateStorage &&
              CookieConsent &&
              null != CookieConsent.iframe &&
              CookieConsent.iframe.contentWindow &&
              this.updateBulkStorage();
        }
      }),
      (this.removeBulkReset = function () {
        if (
          ((this.bulkresetdomains = []),
          (this.bulkconsent = null),
          this.iframe &&
            this.iframe.contentWindow &&
            window.postMessage &&
            window.JSON &&
            window.localStorage)
        ) {
          var postObj = {
            action: "remove",
            value: "",
            serial: this.serial.toLowerCase(),
          };
          this.iframe.contentWindow.postMessage(postObj, this.CDN);
        }
      }),
      (this.removeCurrentDomainBulkReset = function () {
        this.isbulkrenewal = !1;
        var currentHost = window.location.hostname.toLowerCase(),
          althost = currentHost;
        (althost =
          0 === currentHost.indexOf("www.")
            ? althost.substring(4)
            : "www." + althost),
          this.bulkresetdomains.length > 0 &&
            (this.bulkresetdomains = this.bulkresetdomains.filter(function (
              item
            ) {
              return item !== currentHost && item !== althost;
            })),
          this.updateBulkStorage();
      }),
      (this.registerBulkConsent = function (expireMonths) {
        this.consentLifetime = isNaN(expireMonths)
          ? this.consentLifetime || 12
          : expireMonths;
        var ticketid = this.consentID,
          ticketutc = this.consentUTC;
        null == ticketutc && (ticketutc = new Date()),
          null != this.bulkconsent &&
            this.changed &&
            (void 0 !== this.bulkconsent.ticket &&
              (ticketid = this.bulkconsent.ticket),
            void 0 !== this.bulkconsent.utc &&
              (ticketutc = new Date(this.bulkconsent.utc))),
          (this.bulkconsent = {
            ticket: ticketid,
            utc: ticketutc.getTime(),
            expireMonths: this.consentLifetime,
            preferences: this.consent.preferences,
            statistics: this.consent.statistics,
            marketing: this.consent.marketing,
          }),
          this.hasFramework &&
            this.frameworkLoaded &&
            !this.frameworkBlocked &&
            "iabv2" === this.framework.toLowerCase() &&
            ((this.bulkconsent.iab2 = this.IABConsentString),
            (this.bulkconsent.gacm = this.GACMConsentString)),
          this.updateBulkStorage();
      }),
      (this.updateBulkStorage = function () {
        if (this.iframe)
          try {
            var postObj = {
              action: "set",
              value: {
                resetdomains: this.bulkresetdomains,
                bulkconsent: this.bulkconsent,
                expireMonths: isNaN(this.bulkconsent.expireMonths)
                  ? 12
                  : this.bulkconsent.expireMonths,
                serial: this.serial.toLowerCase(),
              },
              serial: this.serial.toLowerCase(),
            };
            this.iframe.contentWindow.postMessage(postObj, this.CDN);
          } catch (e) {}
      }),
      (this.signalConsentFramework = function () {
        this.hasFramework &&
          !this.frameworkLoaded &&
          setTimeout(function () {
            CookieConsent.signalConsentFramework();
          }, 50);
      }),
      (this.cloneScriptTag = function (currentTag) {
        for (
          var tagClone = document.createElementOrig("script"), k = 0;
          k < currentTag.attributes.length;
          k++
        )
          void 0 !== currentTag.attributes[k].value &&
            "" !== currentTag.attributes[k].value &&
            tagClone.setAttribute(
              currentTag.attributes[k].name,
              currentTag.attributes[k].value
            );
        return (
          CookieConsent.hasAttr(currentTag, "nomodule") &&
            tagClone.setAttribute("nomodule", ""),
          void 0 !== currentTag.text && (tagClone.text = currentTag.text),
          tagClone.setAttribute("type", "text/javascript"),
          tagClone
        );
      }),
      (this.runScripts = function () {
        for (
          var that = this,
            tagContainer = [],
            deferTagContainer = [],
            tagsAll = document.getElementsByTagName("script"),
            i = 0,
            event;
          i < tagsAll.length;
          i++
        ) {
          var currentTag = tagsAll[i];
          this.hasAttr(currentTag, "data-cookieconsent") &&
            this.hasAttr(currentTag, "type") &&
            "text/plain" === currentTag.getAttribute("type").toLowerCase() &&
            "ignore" !==
              currentTag.getAttribute("data-cookieconsent").toLowerCase() &&
            void 0 === currentTag.cookiesProcessed &&
            (this.hasAttr(currentTag, "defer")
              ? (currentTag.removeAttribute("defer"),
                deferTagContainer.push(currentTag))
              : tagContainer.push(currentTag),
            (currentTag.cookiesProcessed = 1));
        }
        for (var i = 0; i < deferTagContainer.length; i++)
          tagContainer.push(deferTagContainer[i]);
        (this.RunScriptTags(tagContainer),
        this.RunSrcTags("iframe"),
        this.RunSrcTags("img"),
        this.RunSrcTags("embed"),
        this.RunSrcTags("video"),
        this.RunSrcTags("audio"),
        this.RunSrcTags("picture"),
        this.RunSrcTags("source"),
        void 0 === window.CB_OnTagsExecuted_Processed) &&
          ((window.CB_OnTagsExecuted_Processed = 1),
          CookieConsent.ontagsexecuted && CookieConsent.ontagsexecuted(),
          "function" == typeof CookiebotCallback_OnTagsExecuted
            ? CookiebotCallback_OnTagsExecuted()
            : "function" == typeof CookieConsentCallback_OnTagsExecuted &&
              CookieConsentCallback_OnTagsExecuted(),
          (event = document.createEvent("Event")),
          event.initEvent("CookiebotOnTagsExecuted", !0, !0),
          window.dispatchEvent(event),
          (event = document.createEvent("Event")),
          event.initEvent("CookieConsentOnTagsExecuted", !0, !0),
          window.dispatchEvent(event));
      }),
      (this.RunScriptTags = function (tagContainer) {
        if (tagContainer.length > 0) {
          var currentTag = tagContainer.shift();
          currentTag.cookiesProcessed = void 0;
          var tagConsentLevels = "";
          this.hasAttr(currentTag, "data-cookieconsent") &&
            (tagConsentLevels = currentTag
              .getAttribute("data-cookieconsent")
              .toLowerCase()
              .split(","));
          for (var canExecute = !0, j = 0; j < tagConsentLevels.length; j++) {
            var consentReq = tagConsentLevels[j]
              .replace(/^\s*/, "")
              .replace(/\s*$/, "");
            "preferences" !== consentReq ||
              CookieConsent.consent.preferences ||
              (canExecute = !1),
              "statistics" !== consentReq ||
                CookieConsent.consent.statistics ||
                (canExecute = !1),
              "marketing" !== consentReq ||
                CookieConsent.consent.marketing ||
                (canExecute = !1);
          }
          if (canExecute) {
            var tagParent = currentTag.parentNode,
              nextElement = currentTag.nextElementSibling,
              tagClone = this.cloneScriptTag(currentTag),
              hasSrc = !1;
            this.hasAttr(tagClone, "src") &&
              ((tagURL = tagClone.getAttribute("src")), (hasSrc = !0));
            var fireTagOnLoad = hasSrc && !this.hasAttr(tagClone, "nomodule");
            CookieConsent.hasAttr(tagClone, "async") &&
              tagClone.removeAttribute("async"),
              void 0 !== currentTag.origScriptType &&
                (tagClone.type = currentTag.origScriptType),
              fireTagOnLoad &&
                ((tagClone.onload = function () {
                  CookieConsent.RunScriptTags(tagContainer);
                }),
                (tagClone.onerror = function () {
                  CookieConsent.RunScriptTags(tagContainer);
                })),
              this.cloneEventListeners(currentTag, tagClone),
              null != tagParent &&
                (tagParent.removeChild(currentTag),
                tagParent.insertBefore(tagClone, nextElement || null)),
              fireTagOnLoad || this.RunScriptTags(tagContainer);
          } else this.RunScriptTags(tagContainer);
        }
      }),
      (this.RunSrcTags = function (tagName) {
        for (
          var elementsAll = document.getElementsByTagName(tagName),
            elementContainer = [],
            that = this,
            i = 0;
          i < elementsAll.length;
          i++
        ) {
          var currentElement = elementsAll[i];
          this.hasAttr(currentElement, "data-cookieconsent") &&
            (this.hasAttr(currentElement, "data-src") ||
              this.hasAttr(currentElement, "data-cookieblock-src")) &&
            "ignore" !==
              currentElement.getAttribute("data-cookieconsent").toLowerCase() &&
            elementContainer.push(currentElement);
        }
        for (var i = 0; i < elementContainer.length; i++) {
          var currentElement = elementContainer[i];
          this.registerDisplayState(currentElement);
          for (
            var tagConsentLevels = currentElement
                .getAttribute("data-cookieconsent")
                .toLowerCase()
                .split(","),
              canExecute = !0,
              j = 0;
            j < tagConsentLevels.length;
            j++
          ) {
            var consentReq = tagConsentLevels[j]
              .replace(/^\s*/, "")
              .replace(/\s*$/, "");
            "preferences" === consentReq &&
              (this.addClass(currentElement, "cookieconsent-optin-preferences"),
              CookieConsent.consent.preferences || (canExecute = !1)),
              "statistics" === consentReq &&
                (this.addClass(
                  currentElement,
                  "cookieconsent-optin-statistics"
                ),
                CookieConsent.consent.statistics || (canExecute = !1)),
              "marketing" === consentReq &&
                (this.addClass(currentElement, "cookieconsent-optin-marketing"),
                CookieConsent.consent.marketing || (canExecute = !1));
          }
          canExecute
            ? (this.hasAttr(currentElement, "data-cookieblock-src")
                ? ((currentElement.src = currentElement.getAttribute(
                    "data-cookieblock-src"
                  )),
                  currentElement.removeAttribute("data-cookieblock-src"))
                : this.hasAttr(currentElement, "data-src") &&
                  ((currentElement.src =
                    currentElement.getAttribute("data-src")),
                  currentElement.removeAttribute("data-src")),
              this.displayElement(currentElement))
            : this.hideElement(currentElement);
        }
      }),
      (this.applyDisplay = function () {
        for (
          var iframesAll = document.getElementsByTagName("iframe"), i = 0;
          i < iframesAll.length;
          i++
        ) {
          var currentIframe = iframesAll[i];
          if (
            (this.registerDisplayState(currentIframe),
            this.hasAttr(currentIframe, "data-cookieconsent") &&
              (this.hasAttr(currentIframe, "data-src") ||
                this.hasAttr(currentIframe, "data-cookieblock-src")))
          )
            for (
              var requiredCategories = currentIframe
                  .getAttribute("data-cookieconsent")
                  .replace("/ /g", "")
                  .toLowerCase()
                  .split(","),
                j = 0;
              j < requiredCategories.length;
              j++
            )
              "preferences" === requiredCategories[j] &&
                this.addClass(currentIframe, "cookieconsent-optin-preferences"),
                "statistics" === requiredCategories[j] &&
                  this.addClass(
                    currentIframe,
                    "cookieconsent-optin-statistics"
                  ),
                "marketing" === requiredCategories[j] &&
                  this.addClass(currentIframe, "cookieconsent-optin-marketing");
        }
        for (
          var consetElementsClassesArray = [
              ".cookieconsent-optout-preferences",
              ".cookieconsent-optout-statistics",
              ".cookieconsent-optout-marketing",
              ".cookieconsent-optin-preferences",
              ".cookieconsent-optin-statistics",
              ".cookieconsent-optin-marketing",
              ".cookieconsent-optin",
              ".cookieconsent-optout",
            ],
            consentElementsClasses = consetElementsClassesArray.join(","),
            consentElements = document.querySelectorAll(consentElementsClasses),
            i = 0;
          i < consentElements.length;
          i++
        ) {
          this.registerDisplayState(consentElements[i]);
          var showElement = !0;
          ((this.hasClass(consentElements[i], "cookieconsent-optin") &&
            !CookieConsent.consented) ||
            (this.hasClass(consentElements[i], "cookieconsent-optout") &&
              CookieConsent.consented)) &&
            (showElement = !1),
            ((this.hasClass(
              consentElements[i],
              "cookieconsent-optin-preferences"
            ) &&
              !CookieConsent.consent.preferences) ||
              (this.hasClass(
                consentElements[i],
                "cookieconsent-optin-statistics"
              ) &&
                !CookieConsent.consent.statistics) ||
              (this.hasClass(
                consentElements[i],
                "cookieconsent-optin-marketing"
              ) &&
                !CookieConsent.consent.marketing)) &&
              (showElement = !1),
            (this.hasClass(
              consentElements[i],
              "cookieconsent-optout-preferences"
            ) &&
              !CookieConsent.consent.preferences) ||
            (this.hasClass(
              consentElements[i],
              "cookieconsent-optout-statistics"
            ) &&
              !CookieConsent.consent.statistics) ||
            (this.hasClass(
              consentElements[i],
              "cookieconsent-optout-marketing"
            ) &&
              !CookieConsent.consent.marketing)
              ? (showElement = !0)
              : ((this.hasClass(
                  consentElements[i],
                  "cookieconsent-optout-preferences"
                ) &&
                  CookieConsent.consent.preferences) ||
                  (this.hasClass(
                    consentElements[i],
                    "cookieconsent-optout-statistics"
                  ) &&
                    CookieConsent.consent.statistics) ||
                  (this.hasClass(
                    consentElements[i],
                    "cookieconsent-optout-marketing"
                  ) &&
                    CookieConsent.consent.marketing)) &&
                (showElement = !1),
            showElement
              ? this.displayElement(consentElements[i])
              : this.hideElement(consentElements[i]);
        }
      }),
      (this.hideElement = function (HTMLElement) {
        "SOURCE" === HTMLElement.tagName &&
          HTMLElement.parentNode &&
          (HTMLElement = HTMLElement.parentNode),
          (HTMLElement.style.display = "none");
      }),
      (this.displayElement = function (HTMLElement) {
        if (HTMLElement.cookieconsentDataStyleDisplay) {
          var cookieconsentDataStyleDisplay =
            HTMLElement.cookieconsentDataStyleDisplay;
          "SOURCE" === HTMLElement.tagName &&
            HTMLElement.parentNode &&
            (HTMLElement = HTMLElement.parentNode),
            (HTMLElement.style.display = cookieconsentDataStyleDisplay);
        }
      }),
      (this.registerDisplayState = function (HTMLElement) {
        if (void 0 === HTMLElement.cookieconsentDataStyleDisplay) {
          for (
            var oldClasses = [],
              internalClasses = [
                "cookieconsent-optin-preferences",
                "cookieconsent-optin-statistics",
                "cookieconsent-optin-marketing",
                "cookieconsent-optin",
                "cookieconsent-optout-preferences",
                "cookieconsent-optout-statistics",
                "cookieconsent-optout-marketing",
                "cookieconsent-optout",
              ],
              i = 0;
            i < internalClasses.length;
            i++
          ) {
            var currentClass = internalClasses[i];
            this.hasClass(HTMLElement, currentClass) &&
              (oldClasses.push(currentClass),
              this.removeClass(HTMLElement, currentClass));
          }
          if (HTMLElement.style.display)
            HTMLElement.cookieconsentDataStyleDisplay =
              HTMLElement.style.display;
          else {
            var currentDisplay = "";
            if (window.getComputedStyle)
              currentDisplay = window
                .getComputedStyle(HTMLElement, null)
                .getPropertyValue("display");
            else {
              var blockRegex =
                /^(address|blockquote|body|center|dir|div|dl|fieldset|form|h[1-6]|hr|isindex|menu|noframes|noscript|ol|p|pre|table|ul|dd|dt|frameset|li|tbody|td|tfoot|th|thead|tr|html)$/i;
              currentDisplay = blockRegex.test(HTMLElement.nodeName)
                ? "block"
                : "inline";
            }
            HTMLElement.cookieconsentDataStyleDisplay = currentDisplay;
          }
          if (oldClasses.length > 0)
            for (var i = 0; i < oldClasses.length; i++)
              this.addClass(HTMLElement, oldClasses[i]);
        }
      }),
      (this.hasClass = function (HTMLElement, cls) {
        return (
          HTMLElement.className &&
          HTMLElement.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"))
        );
      }),
      (this.addClass = function (HTMLElement, cls) {
        this.hasClass(HTMLElement, cls) || (HTMLElement.className += " " + cls);
      }),
      (this.removeClass = function (HTMLElement, cls) {
        this.hasClass(HTMLElement, cls) &&
          (HTMLElement.className = HTMLElement.className.replace(cls, ""));
      }),
      (this.getConsentElementsByClassName = function (currentClass) {
        return document.getElementsByClassName
          ? document.getElementsByClassName(currentClass)
          : document.querySelectorAll
          ? document.querySelectorAll("." + currentClass)
          : [];
      }),
      (this.setOnload = function () {
        var that = this;
        if (
          (this.isOutOfRegion
            ? ((this.versionRequested = !0), (this.versionChecked = !0))
            : setTimeout(function () {
                that.versionRequested ||
                  ((that.versionRequested = !0),
                  that.versionChecked ||
                    that.getScript(
                      that.CDN + "/consentconfig/" + that.serial + "/state.js",
                      !0,
                      function () {
                        that.versionChecked = !0;
                      }
                    ));
              }, 1),
          !this.iframeReady && this.setOnloadFrameRetryCounter < 40)
        )
          return (
            this.setOnloadFrameRetryCounter++,
            void setTimeout(function () {
              that.setOnload();
            }, 50)
          );
        if (
          ((this.iframeReady = !0),
          (this.setOnloadFrameRetryCounter = 0),
          this.bulkconsentsubmitted || this.checkForBulkConsent(),
          !this.mutationFallback)
        )
          if (document.body)
            if ("string" == typeof document.readyState) {
              if ("complete" !== document.readyState)
                return void setTimeout(function () {
                  that.setOnload();
                }, 100);
              setTimeout(function () {
                that.triggerOnloadEvents();
              }, 1);
            } else
              setTimeout(function () {
                that.triggerOnloadEvents();
              }, 500);
          else
            window.addEventListener
              ? window.addEventListener("load", that.triggerOnloadEvents, !1)
              : window.attachEvent("onload", that.triggerOnloadEvents);
        this.initWidget();
      }),
      (this.triggerOnloadEvents = function () {
        if (!this.versionChecked && this.retryCounter < 10)
          (this.retryCounter += 1),
            setTimeout(function () {
              CookieConsent.triggerOnloadEvents();
            }, 100);
        else {
          if (
            ((this.retryCounter = 0),
            (this.loaded = !0),
            this.version < this.latestVersion)
          )
            return (
              (this.isNewVersion = !0),
              this.removeCookies(),
              (this.consent.preferences = !1),
              (this.consent.statistics = !1),
              (this.consent.marketing = !1),
              (this.hasResponse = !1),
              (this.consented = !1),
              (this.declined = !1),
              (this.changed = !0),
              "undefined" != typeof CookieDeclaration &&
                "function" == typeof CookieDeclaration.SetUserStatusLabel &&
                CookieDeclaration.SetUserStatusLabel(),
              CookieConsent.applyDisplay(),
              void this.show(!1)
            );
          var event;
          if (
            (CookieConsent.applyDisplay(),
            "undefined" != typeof CookieDeclaration &&
              "function" == typeof CookieDeclaration.SetUserStatusLabel &&
              CookieDeclaration.SetUserStatusLabel(),
            CookieConsent.onload && CookieConsent.onload(),
            "function" == typeof CookiebotCallback_OnLoad
              ? CookiebotCallback_OnLoad()
              : "function" == typeof CookieConsentCallback_OnLoad &&
                CookieConsentCallback_OnLoad(),
            (event = document.createEvent("Event")),
            event.initEvent("CookiebotOnLoad", !0, !0),
            window.dispatchEvent(event),
            (event = document.createEvent("Event")),
            event.initEvent("CookieConsentOnLoad", !0, !0),
            window.dispatchEvent(event),
            this.changed && this.triggerGTMEvents(),
            CookieConsent.consented
              ? (CookieConsent.onaccept && CookieConsent.onaccept(),
                "function" == typeof CookiebotCallback_OnAccept
                  ? CookiebotCallback_OnAccept()
                  : "function" == typeof CookieConsentCallback_OnAccept &&
                    CookieConsentCallback_OnAccept(),
                (event = document.createEvent("Event")),
                event.initEvent("CookiebotOnAccept", !0, !0),
                window.dispatchEvent(event),
                (event = document.createEvent("Event")),
                event.initEvent("CookieConsentOnAccept", !0, !0),
                window.dispatchEvent(event),
                CookieConsent.runScripts())
              : (CookieConsent.ondecline && CookieConsent.ondecline(),
                "function" == typeof CookiebotCallback_OnDecline
                  ? CookiebotCallback_OnDecline()
                  : "function" == typeof CookieConsentCallback_OnDecline &&
                    CookieConsentCallback_OnDecline(),
                (event = document.createEvent("Event")),
                event.initEvent("CookiebotOnDecline", !0, !0),
                window.dispatchEvent(event),
                (event = document.createEvent("Event")),
                event.initEvent("CookieConsentOnDecline", !0, !0),
                window.dispatchEvent(event)),
            CookieConsent.signalConsentFramework(),
            this.iframe && !this.consented && !this.declined)
          ) {
            var currentHost = window.location.hostname.toLowerCase(),
              althost = currentHost;
            (althost =
              0 === currentHost.indexOf("www.")
                ? althost.substring(4)
                : "www." + althost),
              (this.bulkresetdomains = this.bulkresetdomains.filter(function (
                item
              ) {
                return item !== currentHost && item !== althost;
              })),
              this.updateBulkStorage();
          }
        }
      }),
      (this.getGTMDataLayer = function () {
        return (
          null == window[this.dataLayerName] &&
            (window[this.dataLayerName] = []),
          Array.isArray(window[this.dataLayerName])
            ? window[this.dataLayerName]
            : []
        );
      }),
      (this.triggerGTMEvents = function () {
        this.consent.preferences &&
          this.getGTMDataLayer().push({ event: "cookie_consent_preferences" }),
          this.consent.statistics &&
            this.getGTMDataLayer().push({ event: "cookie_consent_statistics" }),
          this.consent.marketing &&
            this.getGTMDataLayer().push({ event: "cookie_consent_marketing" });
      }),
      (this.signalGoogleConsentAPI = function () {
        this.consentModeDisabled ||
          (this.pushGoogleConsent("consent", "update", {
            ad_storage: this.consent.marketing ? "granted" : "denied",
            analytics_storage: this.consent.statistics ? "granted" : "denied",
            functionality_storage: this.consent.preferences
              ? "granted"
              : "denied",
            personalization_storage: this.consent.preferences
              ? "granted"
              : "denied",
            security_storage: "granted",
          }),
          "dynamic" === this.consentModeDataRedaction &&
            this.pushGoogleConsent(
              "set",
              "ads_data_redaction",
              !this.consent.marketing
            ),
          this.getGTMDataLayer().push({ event: "cookie_consent_update" }));
      }),
      (this.pushGoogleConsent = function gtag() {
        this.getGTMDataLayer().push(arguments);
      }),
      (this.show = function (isRenewal) {
        var mustRenew = !1;
        isRenewal
          ? ((mustRenew = isRenewal),
            this.cookieEnabled ||
              alert("Please enable cookies in your browser to proceed."))
          : (this.forceShow = !0),
          this.cookieEnabled &&
            ((this.hasResponse = !1), this.process(mustRenew));
      }),
      (this.hide = function () {
        "object" == typeof CookieConsentDialog && CookieConsentDialog.hide(!0);
      }),
      (this.renew = function () {
        (this.isRenewal = !0),
          this.show(!0),
          setTimeout(function () {
            "object" == typeof CookieConsentDialog &&
              "inlineoptin" === CookieConsentDialog.responseMode &&
              CookieConsentDialog.toggleDetails();
          }, 300);
      }),
      (this.getURLParam = function (paramName) {
        var d = document.getElementById(this.scriptId);
        if (
          (d || (d = this.scriptElement),
          d &&
            (paramName = new RegExp(
              "[?&]" + encodeURIComponent(paramName) + "=([^&#]*)"
            ).exec(d.src)))
        )
          return decodeURIComponent(paramName[1].replace(/\+/g, " "));
      }),
      (this.getDomainUrlParam = function (paramName) {
        var url = window.location.href;
        paramName = paramName.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + paramName + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
        return results
          ? results[2]
            ? decodeURIComponent(results[2].replace(/\+/g, " "))
            : ""
          : null;
      }),
      (this.process = function (isRenewal) {
        var d = document.getElementById(this.scriptId);
        if ((d || (d = this.scriptElement), d)) {
          var e = d.getAttribute("data-cbid"),
            ex = this.getURLParam("cbid");
          if ((ex && (e = ex), e))
            if (this.isGUID(e)) {
              this.serial = e;
              var f = "?renew=" + isRenewal;
              (f =
                f + "&referer=" + encodeURIComponent(window.location.hostname)),
                isRenewal && (f = f + "&nocache=" + new Date().getTime());
              var g = d.getAttribute("data-mode"),
                gx = this.getURLParam("mode");
              gx && (g = gx), g && (f = f + "&mode=" + g);
              var h = d.getAttribute("data-culture"),
                hx = this.getURLParam("culture");
              hx && (h = hx), h && (f = f + "&culture=" + h);
              var m = d.getAttribute("data-type"),
                mx = this.getURLParam("type");
              mx && (m = mx), m && (f = f + "&type=" + m);
              var n = d.getAttribute("data-level"),
                nx = this.getURLParam("level");
              nx && (n = nx), n && (f = f + "&level=" + n);
              var p = d.getAttribute("data-path"),
                px = this.getURLParam("path");
              px && (p = px), p && (f = f + "&path=" + encodeURIComponent(p));
              var k = "false";
              this.doNotTrack && (k = "true"),
                (f = f + "&dnt=" + k),
                (f = f + "&forceshow=" + this.forceShow),
                this.framework && (f = f + "&framework=" + this.framework),
                this.isbulkrenewal &&
                  ((f += "&bulkrenew=1"), (this.isbulkrenewal = !1)),
                this.geoRegions.length > 0 &&
                  (f =
                    f +
                    "&georegions=" +
                    encodeURIComponent(JSON.stringify(this.geoRegions)));
              var uc = d.getAttribute("data-user-country"),
                ucx = this.getURLParam("userCountry");
              ucx && (uc = ucx),
                uc && (f = f + "&usercountry=" + this.userCountry),
                this.cookieEnabled
                  ? ((this.changed = !0),
                    this.getScript(this.host + e + "/cc.js" + f))
                  : ((this.consented = !1),
                    (this.declined = !0),
                    (this.hasResponse = !0),
                    (this.consent.preferences = !1),
                    (this.consent.statistics = !1),
                    (this.consent.marketing = !1),
                    (this.consentID = "-3"),
                    (this.consent.stamp = "-3"));
            } else
              this.log(
                "Error: Cookie script tag ID " + e + " is not a valid key."
              );
          else
            this.log(
              "Error: Cookie script tag attribute 'data-cbid' is missing."
            );
        } else
          this.log(
            "Error: Can't read data values from the cookie script tag - make sure to set script attribute ID."
          );
      }),
      (this.log = function (msg) {
        console &&
          ("function" == typeof console.warn
            ? console.warn(msg)
            : console.log && console.log(msg));
      }),
      (this.getCookie = function (n) {
        var consentCookieValue = "",
          documentCookies = document.cookie,
          i,
          x,
          y,
          l = documentCookies.split(";");
        for (i = 0; i < l.length; i++)
          if (
            ((x = l[i].substr(0, l[i].indexOf("="))),
            (y = l[i].substr(l[i].indexOf("=") + 1)),
            (x = x.replace(/^\s+|\s+$/g, "")),
            x === n)
          ) {
            if (!(n === this.name && documentCookies.split(n).length - 1 > 1))
              return unescape(y);
            (y.length > consentCookieValue.length || "0" === y) &&
              (consentCookieValue = y);
          }
        if ("" !== consentCookieValue) return unescape(consentCookieValue);
      }),
      (this.setCookie = function (value, expiredate, path, domain, secure) {
        var isSecure = "https:" === window.location.protocol;
        secure && (isSecure = secure);
        var cookieDef =
          this.name +
          "=" +
          value +
          (expiredate ? ";expires=" + expiredate.toGMTString() : "") +
          (path ? ";path=" + path : "") +
          (domain ? ";domain=" + domain : "") +
          (isSecure ? ";secure" : "");
        document.cookie = cookieDef;
      }),
      (this.removeCookies = function () {
        for (
          var cookies = document.cookie.split(";"),
            path = window.location.pathname.split("/"),
            hostname = window.location.hostname,
            isWwwDomain = "www" === hostname.substring(0, 3),
            i = 0;
          i < cookies.length;
          i++
        ) {
          var cookie = cookies[i],
            nameEndPos = cookie.indexOf("="),
            name = nameEndPos > -1 ? cookie.substr(0, nameEndPos) : cookie;
          name = name.replace(/^\s*/, "").replace(/\s*$/, "");
          for (var isWhiteListed = !1, j = 0; j < this.whitelist.length; j++)
            if (this.whitelist[j] === name) {
              isWhiteListed = !0;
              break;
            }
          if (!isWhiteListed && name !== this.name) {
            var pathString = ";path=",
              expireString = "=;expires=Thu, 01 Jan 1970 00:00:00 GMT",
              domainString = ";domain=";
            document.cookie = name + expireString;
            for (var j = 0; j < path.length; j++)
              (pathString +=
                ("/" !== pathString.substr(-1) ? "/" : "") + path[j]),
                (document.cookie = name + expireString + pathString),
                (document.cookie =
                  name +
                  expireString +
                  pathString +
                  ";domain=" +
                  escape(hostname)),
                (document.cookie =
                  name +
                  expireString +
                  pathString +
                  ";domain=." +
                  escape(hostname)),
                (document.cookie =
                  name +
                  expireString +
                  pathString +
                  ";domain=" +
                  escape(this.getRootDomain(hostname))),
                (document.cookie =
                  name +
                  expireString +
                  pathString +
                  ";domain=." +
                  escape(this.getRootDomain(hostname))),
                isWwwDomain &&
                  (document.cookie =
                    name +
                    expireString +
                    pathString +
                    ";domain=" +
                    escape(hostname.substring(3)));
          }
          var hasStorage = (function () {
            var mod = "cookiebottest";
            try {
              return (
                localStorage.setItem(mod, mod), localStorage.removeItem(mod), !0
              );
            } catch (e) {
              return !1;
            }
          })();
          hasStorage &&
            (localStorage.clear(),
            "undefined" != typeof sessionStorage && sessionStorage.clear());
        }
      }),
      (this.getRootDomain = function (domain) {
        var rootDomain = domain;
        if (domain.length > 0) {
          var sections = rootDomain.split(".");
          rootDomain.length > 1 && (rootDomain = sections.slice(-2).join("."));
        }
        return rootDomain;
      }),
      (this.resetCookies = function () {
        var cookieIndex = this.cookieList;
        if (
          (null != this.dialog && (cookieIndex = this.dialog),
          null != cookieIndex)
        ) {
          if (!this.consent.preferences && this.wipe.preferences)
            for (var j = 0; j < cookieIndex.cookieTablePreference.length; j++) {
              var cookieName = cookieIndex.cookieTablePreference[j][0],
                cookieStorageType = cookieIndex.cookieTablePreference[j][5],
                cookieNameRegEx = cookieIndex.cookieTablePreference[j][6];
              "1" === cookieStorageType
                ? this.removeCookieHTTP(cookieName, cookieNameRegEx)
                : "2" === cookieStorageType &&
                  this.removeCookieLocalStorage(cookieName, cookieNameRegEx);
            }
          if (!this.consent.statistics && this.wipe.statistics)
            for (var j = 0; j < cookieIndex.cookieTableStatistics.length; j++) {
              var cookieName = cookieIndex.cookieTableStatistics[j][0],
                cookieStorageType = cookieIndex.cookieTableStatistics[j][5],
                cookieNameRegEx = cookieIndex.cookieTableStatistics[j][6];
              "1" === cookieStorageType
                ? this.removeCookieHTTP(cookieName, cookieNameRegEx)
                : "2" === cookieStorageType &&
                  this.removeCookieLocalStorage(cookieName, cookieNameRegEx);
            }
          if (!this.consent.marketing && this.wipe.marketing)
            for (
              var j = 0;
              j < cookieIndex.cookieTableAdvertising.length;
              j++
            ) {
              var cookieName = cookieIndex.cookieTableAdvertising[j][0],
                cookieStorageType = cookieIndex.cookieTableAdvertising[j][5],
                cookieNameRegEx = cookieIndex.cookieTableAdvertising[j][6];
              "1" === cookieStorageType
                ? this.removeCookieHTTP(cookieName, cookieNameRegEx)
                : "2" === cookieStorageType &&
                  this.removeCookieLocalStorage(cookieName, cookieNameRegEx);
            }
          for (var j = 0; j < cookieIndex.cookieTableUnclassified.length; j++) {
            var cookieName = cookieIndex.cookieTableUnclassified[j][0],
              cookieStorageType = cookieIndex.cookieTableUnclassified[j][5],
              cookieNameRegEx = cookieIndex.cookieTableUnclassified[j][6];
            "1" === cookieStorageType
              ? this.removeCookieHTTP(cookieName, cookieNameRegEx)
              : "2" === cookieStorageType &&
                this.removeCookieLocalStorage(cookieName, cookieNameRegEx);
          }
        }
      }),
      (this.removeCookieHTTP = function (cookiename, cookieregex) {
        for (
          var cookies = document.cookie.split(";"),
            path = window.location.pathname.split("/"),
            hostname = window.location.hostname,
            isWwwDomain = "www" === hostname.substring(0, 3),
            i = 0;
          i < cookies.length;
          i++
        ) {
          var cookie = cookies[i],
            nameEndPos = cookie.indexOf("="),
            name = nameEndPos > -1 ? cookie.substr(0, nameEndPos) : cookie;
          name = name.replace(/^\s*/, "").replace(/\s*$/, "");
          var isNameMatch = !1;
          if (
            ("" === cookieregex
              ? name === cookiename && (isNameMatch = !0)
              : (isNameMatch = name.match(cookieregex)),
            isNameMatch && name !== this.name)
          ) {
            var pathString = ";path=",
              expireString = "=;expires=Thu, 01 Jan 1970 00:00:00 GMT",
              domainString = ";domain=";
            document.cookie = name + expireString;
            for (var j = 0; j < path.length; j++)
              (pathString +=
                ("/" !== pathString.substr(-1) ? "/" : "") + path[j]),
                (document.cookie = name + expireString + pathString),
                (document.cookie =
                  name +
                  expireString +
                  pathString +
                  ";domain=" +
                  escape(hostname)),
                (document.cookie =
                  name +
                  expireString +
                  pathString +
                  ";domain=." +
                  escape(hostname)),
                (document.cookie =
                  name +
                  expireString +
                  pathString +
                  ";domain=" +
                  escape(this.getRootDomain(hostname))),
                (document.cookie =
                  name +
                  expireString +
                  pathString +
                  ";domain=." +
                  escape(this.getRootDomain(hostname))),
                isWwwDomain &&
                  (document.cookie =
                    name +
                    expireString +
                    pathString +
                    ";domain=" +
                    escape(hostname.substring(3)));
          }
        }
      }),
      (this.removeCookieLocalStorage = function (cookiename, cookieregex) {
        for (
          var keys = Object.keys(localStorage), i = 0;
          i < keys.length;
          i++
        ) {
          var name = keys[i],
            isNameMatch = !1;
          "" === cookieregex
            ? name === cookiename && (isNameMatch = !0)
            : (isNameMatch = name.match(cookieregex)),
            isNameMatch &&
              (localStorage.removeItem(name),
              "undefined" != typeof sessionStorage &&
                sessionStorage.removeItem(name));
        }
      }),
      (this.withdraw = function () {
        (this.consented = !1),
          (this.declined = !1),
          (this.hasResponse = !1),
          (this.consent.preferences = !1),
          (this.consent.statistics = !1),
          (this.consent.marketing = !1),
          (this.changed = !0),
          "undefined" != typeof CookieDeclaration &&
            "function" == typeof CookieDeclaration.SetUserStatusLabel &&
            CookieDeclaration.SetUserStatusLabel(),
          CookieConsent.ondecline(),
          "function" == typeof CookiebotCallback_OnDecline
            ? CookiebotCallback_OnDecline()
            : "function" == typeof CookieConsentCallback_OnDecline &&
              CookieConsentCallback_OnDecline(),
          CookieConsent.applyDisplay();
        var pathUrlString = "";
        this.pathlist.length > 0 &&
          (pathUrlString =
            "&path=" + encodeURIComponent(this.pathlist.join(",")));
        var hasCookieData = null != this.dialog;
        this.hasFramework &&
        this.frameworkLoaded &&
        "iabv2" === this.framework.toLowerCase() &&
        !this.frameworkBlocked
          ? ("object" == typeof CookieConsentIABCMP &&
              CookieConsentIABCMP.withdrawConsent(),
            window.__tcfapi("getTCData", 2, function (result) {
              result.tcString
                ? (CookieConsent.IABConsentString = result.tcString)
                : (CookieConsent.IABConsentString = ""),
                "object" == typeof CookieConsentIABCMP &&
                CookieConsentIABCMP.encodeGACMString &&
                result.addtlConsent
                  ? (CookieConsent.GACMConsentString =
                      CookieConsentIABCMP.encodeGACMString(result.addtlConsent))
                  : (CookieConsent.GACMConsentString = ""),
                (pathUrlString +=
                  "&iab2=" +
                  CookieConsent.IABConsentString +
                  "&gacm=" +
                  CookieConsent.GACMConsentString),
                CookieConsent.getScript(
                  CookieConsent.host +
                    "logconsent.ashx?action=decline&nocache=" +
                    new Date().getTime() +
                    "&referer=" +
                    encodeURIComponent(window.location.href) +
                    "&cbid=" +
                    CookieConsent.serial +
                    pathUrlString +
                    "&lifetime=" +
                    CookieConsent.optOutLifetime +
                    "&cbt=" +
                    CookieConsent.responseMode +
                    "&hasdata=" +
                    hasCookieData
                );
            }))
          : this.getScript(
              this.host +
                "logconsent.ashx?action=decline&nocache=" +
                new Date().getTime() +
                "&referer=" +
                encodeURIComponent(window.location.href) +
                "&cbid=" +
                this.serial +
                pathUrlString +
                "&lifetime=" +
                this.optOutLifetime +
                "&cbt=" +
                CookieConsent.responseMode +
                "&hasdata=" +
                hasCookieData
            );
      }),
      (this.setOutOfRegion = function (countryCode, consentVersion) {
        (this.isOutsideEU = !0),
          (this.isOutOfRegion = !0),
          (this.hasResponse = !0),
          (this.declined = !1),
          (this.consented = !0),
          (this.consent.preferences = !0),
          (this.consent.statistics = !0),
          (this.consent.marketing = !0);
        var countryFragment = "";
        countryCode &&
          ((this.userCountry = countryCode),
          (countryFragment = "%2Cregion:%27" + countryCode + "%27")),
          (this.changed = !0),
          (this.version = this.latestVersion),
          consentVersion &&
            (this.version = this.latestVersion = consentVersion),
          this.updateRegulations(),
          (this.consent.stamp = "-1");
        var expireMonths = 1,
          expirationDate = new CookieControl.DateTime().addMonths(1);
        if (
          this.hasFramework &&
          "iabv2" === this.framework.toLowerCase() &&
          !this.frameworkBlocked
        ) {
          if (!this.frameworkLoaded)
            return void setTimeout(function () {
              CookieConsent.setOutOfRegion(countryCode);
            }, 50);
          CookieConsentIABCMP.updateConsentFullOptIn(),
            window.__tcfapi("getTCData", 2, function (result) {
              result.tcString
                ? (CookieConsent.IABConsentString = result.tcString)
                : (CookieConsent.IABConsentString = "");
              var IABconsentFragment =
                "%2Ciab2:%27" + CookieConsent.IABConsentString + "%27";
              "object" == typeof CookieConsentIABCMP &&
              CookieConsentIABCMP.encodeGACMString &&
              result.addtlConsent
                ? ((CookieConsent.GACMConsentString =
                    CookieConsentIABCMP.encodeGACMString(result.addtlConsent)),
                  (IABconsentFragment +=
                    "%2Cgacm:%27" + CookieConsent.GACMConsentString + "%27"))
                : (CookieConsent.GACMConsentString = ""),
                CookieConsent.setCookie(
                  "{stamp:%27" +
                    CookieConsent.consent.stamp +
                    "%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cver:" +
                    CookieConsent.version +
                    "%2Cutc:" +
                    new Date().getTime() +
                    IABconsentFragment +
                    countryFragment +
                    "}",
                  expirationDate,
                  "/"
                );
            });
        } else
          this.setCookie(
            "{stamp:%27" +
              this.consent.stamp +
              "%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cver:" +
              this.version +
              "%2Cutc:" +
              new Date().getTime() +
              countryFragment +
              "}",
            expirationDate,
            "/"
          );
        this.setHeaderStyles(), this.signalGoogleConsentAPI(), this.setOnload();
      }),
      (this.isSpider = function () {
        return (
          !this.botDetectionDisabled &&
          /adidxbotc|Applebot\/|archive.org_bot|asterias\/|Baiduspider\/|bingbot\/|BingPreview\/|DuckDuckBot\/|FAST-WebCrawler\/|Feedspot|Feedspotbot\/|Google Page Speed Insights|Google PP|Google Search Console|Google Web Preview|Googlebot\/|Googlebot-Image\/|Googlebot-Mobile\/|Googlebot-News|Googlebot-Video\/|Google-SearchByImage|Google-Structured-Data-Testing-Tool|Chrome-Lighthouse|heritrix\/|iaskspider\/|Mediapartners-Google|msnbot\/|msnbot-media\/|msnbot-NewsBlogs\/|msnbot-UDiscovery\/|PTST\/|SEMrushBot|special_archiver\/|Siteimprove|Y!J-ASR\/|Y!J-BRI\/|Y!J-BRJ\/YATS|Y!J-BRO\/YFSJ|Y!J-BRW\/|Y!J-BSC\/|Yahoo! Site Explorer Feed Validator|Yahoo! Slurp|YahooCacheSystem|Yahoo-MMCrawler\/|YahooSeeker\/|aabot\/|compatible; aa\/|PetalBot\/|Prerender/.test(
            navigator.userAgent
          )
        );
      }),
      (this.getScript = function (url, async, callback) {
        var h = document.getElementsByTagName("script")[0],
          s = document.createElementOrig("script");
        (s.type = "text/javascript"), (s.charset = "UTF-8");
        var hasXMLHttpRequest = !1,
          browserSupportsAsync = "async" in s,
          doAsyncLoad = !0;
        if (
          (void 0 === async || async || (doAsyncLoad = !1),
          doAsyncLoad &&
            !browserSupportsAsync &&
            "undefined" != typeof XMLHttpRequest)
        )
          try {
            hasXMLHttpRequest = !0;
            var xhrObj = new XMLHttpRequest();
            (xhrObj.responseType = "text"),
              (xhrObj.onreadystatechange = function () {
                4 === xhrObj.readyState &&
                  ((200 !== xhrObj.status && 304 !== xhrObj.status) ||
                    ((s.text = xhrObj.responseText),
                    h.parentNode.insertBefore(s, h),
                    callback && callback()));
              }),
              (xhrObj.onerror = function () {
                callback && callback();
              }),
              xhrObj.open("GET", url, !0),
              xhrObj.send();
          } catch (err) {
            hasXMLHttpRequest = !1;
          }
        hasXMLHttpRequest ||
          (doAsyncLoad && (s.async = "async"),
          (s.src = url),
          (s.onload = s.onreadystatechange =
            function (_, isAbort) {
              (isAbort ||
                !s.readyState ||
                /loaded|complete/.test(s.readyState)) &&
                ((s.onload = s.onreadystatechange = null),
                isAbort || (callback && callback()));
            }),
          (s.onerror = function () {
            if (callback)
              try {
                callback();
              } catch (e) {}
          }),
          h && h.parentNode
            ? h.parentNode.insertBefore(s, h)
            : document.head && document.head.appendChild(s));
      }),
      (this.fetchJsonData = function (url, onSuccess, onError) {
        var xmlhttp = new XMLHttpRequest();
        (xmlhttp.onreadystatechange = function () {
          if (
            4 === this.readyState &&
            this.status >= 200 &&
            this.status <= 299
          ) {
            if (204 === this.status) return void onSuccess({});
            try {
              var json = JSON.parse(this.responseText);
              onSuccess(json);
            } catch (e) {
              onError &&
                onError({
                  status: this.status,
                  message: "JSON.parse error: " + e.message,
                });
            }
          } else
            4 === this.readyState &&
              onError &&
              onError({ status: this.status, message: this.responseText });
        }),
          (xmlhttp.onerror = function () {
            onError && onError();
          }),
          xmlhttp.open("GET", url, !0),
          xmlhttp.send();
      }),
      (this.loadIframe = function (iframeID, iframeSrc) {
        var customFrame = document.getElementById(iframeID);
        customFrame && (customFrame.src = iframeSrc);
      }),
      (this.setDNTState = function () {
        "yes" === navigator.doNotTrack ||
        "1" === navigator.msDoNotTrack ||
        "1" === navigator.doNotTrack ||
        !1 === this.cookieEnabled ||
        !1 === navigator.cookieEnabled
          ? (this.doNotTrack = !0)
          : (this.doNotTrack = !1);
      }),
      (this.setHeaderStyles = function () {
        var styleObjectID = "CookieConsentStateDisplayStyles",
          styleObject = document.getElementById(styleObjectID);
        styleObject && styleObject.parentNode.removeChild(styleObject);
        var head = document.head || document.getElementsByTagName("head")[0];
        if (head) {
          var s = document.createElement("style");
          s.setAttribute("type", "text/css"), (s.id = styleObjectID);
          var newstylesheet = "";
          if (this.consented) {
            var optins = [],
              optouts = [];
            optins.push(".cookieconsent-optin"),
              this.consent.preferences
                ? (optins.push(".cookieconsent-optin-preferences"),
                  optouts.push(".cookieconsent-optout-preferences"))
                : (optouts.push(".cookieconsent-optin-preferences"),
                  optins.push(".cookieconsent-optout-preferences")),
              this.consent.statistics
                ? (optins.push(".cookieconsent-optin-statistics"),
                  optouts.push(".cookieconsent-optout-statistics"))
                : (optouts.push(".cookieconsent-optin-statistics"),
                  optins.push(".cookieconsent-optout-statistics")),
              this.consent.marketing
                ? (optins.push(".cookieconsent-optin-marketing"),
                  optouts.push(".cookieconsent-optout-marketing"))
                : (optouts.push(".cookieconsent-optin-marketing"),
                  optins.push(".cookieconsent-optout-marketing")),
              optouts.push(".cookieconsent-optout"),
              (newstylesheet =
                optins.join() +
                "{display:block;display:initial;}" +
                optouts.join() +
                "{display:none;}");
          } else
            (newstylesheet =
              ".cookieconsent-optin-preferences,.cookieconsent-optin-statistics,.cookieconsent-optin-marketing,.cookieconsent-optin"),
              (newstylesheet += "{display:none;}"),
              (newstylesheet +=
                ".cookieconsent-optout-preferences,.cookieconsent-optout-statistics,.cookieconsent-optout-marketing,.cookieconsent-optout"),
              (newstylesheet += "{display:block;display:initial;}");
          s.styleSheet
            ? (s.styleSheet.cssText = newstylesheet)
            : s.appendChild(document.createTextNode(newstylesheet)),
            head.appendChild(s);
        }
      }),
      (this.submitConsent = function (isImpliedConsent, consentURL, loadAsync) {
        "object" == typeof CookieConsentDialog &&
          ((this.changed = !0),
          CookieConsentDialog.submitConsent(
            isImpliedConsent,
            consentURL,
            loadAsync
          ));
      }),
      (this.submitCustomConsent = function (
        optinPreferences,
        optinStatistics,
        optinMarketing
      ) {
        if (
          !this.hasFramework ||
          this.frameworkLoaded ||
          this.frameworkBlocked
        ) {
          var finalConsentURL = window.location.href,
            responseMode = CookieConsent.responseMode;
          (this.consented = !0),
            (this.declined = !1),
            (this.hasResponse = !0),
            (this.consent.preferences = !1),
            (this.consent.statistics = !1),
            (this.consent.marketing = !1),
            optinPreferences && (this.consent.preferences = !0),
            optinStatistics && (this.consent.statistics = !0),
            optinMarketing && (this.consent.marketing = !0),
            null != this.CookieConsentDialog ||
              (this.dialog && "custom" === this.dialog.template) ||
              (responseMode = "none"),
            "undefined" != typeof CookieDeclaration &&
              "function" == typeof CookieDeclaration.SetUserStatusLabel &&
              CookieDeclaration.SetUserStatusLabel();
          var dnt = "false";
          this.doNotTrack && (dnt = "true");
          var consentMethod = "strict",
            asyncload = !0,
            pathUrlString = "";
          this.pathlist.length > 0 &&
            (pathUrlString =
              "&path=" + encodeURIComponent(this.pathlist.join(",")));
          var bulkTicket = "",
            hasCookieData = null != this.dialog;
          this.hasFramework &&
          this.frameworkLoaded &&
          "iabv2" === this.framework.toLowerCase() &&
          !this.frameworkBlocked
            ? window.__tcfapi("getTCData", 2, function (result) {
                result.tcString
                  ? (CookieConsent.IABConsentString = result.tcString)
                  : (CookieConsent.IABConsentString = ""),
                  "object" == typeof CookieConsentIABCMP &&
                  CookieConsentIABCMP.encodeGACMString &&
                  result.addtlConsent
                    ? (CookieConsent.GACMConsentString =
                        CookieConsentIABCMP.encodeGACMString(
                          result.addtlConsent
                        ))
                    : (CookieConsent.GACMConsentString = ""),
                  (pathUrlString +=
                    "&iab2=" +
                    CookieConsent.IABConsentString +
                    "&gacm=" +
                    CookieConsent.GACMConsentString),
                  CookieConsent.getScript(
                    CookieConsent.host +
                      "logconsent.ashx?action=accept&nocache=" +
                      new Date().getTime() +
                      "&referer=" +
                      encodeURIComponent(finalConsentURL) +
                      "&dnt=" +
                      dnt +
                      "&method=strict&clp=" +
                      CookieConsent.consent.preferences +
                      "&cls=" +
                      CookieConsent.consent.statistics +
                      "&clm=" +
                      CookieConsent.consent.marketing +
                      "&cbid=" +
                      CookieConsent.serial +
                      pathUrlString +
                      "&cbt=" +
                      responseMode +
                      "&ticket=&bulk=" +
                      this.isbulkrenewal +
                      "&hasdata=" +
                      hasCookieData,
                    true
                  );
              })
            : this.getScript(
                this.host +
                  "logconsent.ashx?action=accept&nocache=" +
                  new Date().getTime() +
                  "&referer=" +
                  encodeURIComponent(finalConsentURL) +
                  "&dnt=" +
                  dnt +
                  "&method=strict&clp=" +
                  this.consent.preferences +
                  "&cls=" +
                  this.consent.statistics +
                  "&clm=" +
                  this.consent.marketing +
                  "&cbid=" +
                  this.serial +
                  pathUrlString +
                  "&cbt=" +
                  responseMode +
                  "&ticket=&bulk=" +
                  this.isbulkrenewal +
                  "&hasdata=" +
                  hasCookieData,
                true
              ),
            "object" == typeof CookieConsentDialog &&
              "function" == typeof CookieConsentDialog.releaseBannerFocus &&
              CookieConsentDialog.releaseBannerFocus();
        } else
          setTimeout(function () {
            CookieConsent.submitCustomConsent(
              optinPreferences,
              optinStatistics,
              optinMarketing
            );
          }, 5);
      }),
      (this.isGUID = function (objGuid) {
        var guidSyntax =
          /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/;
        return !!(objGuid.length > 0 && guidSyntax.test(objGuid));
      }),
      (this.hasAttr = function (node, attr) {
        return node.hasAttribute
          ? node.hasAttribute(attr)
          : !!node.getAttribute(attr);
      }),
      (this.hashCode = function (s) {
        if (void 0 === s) return "";
        var ss = s.replace(/\r\n|\n|\r|\t|\s/g, ""),
          h = 0,
          l = ss.length,
          i = 0;
        if (l > 0) for (; i < l; ) h = ((h << 5) - h + ss.charCodeAt(i++)) | 0;
        return h;
      }),
      (this.initMutationObserver = function () {
        var writeOverride = function (node) {
          var lastChild;
          document.body
            ? (document.body.insertAdjacentHTML("beforeend", node),
              (lastChild = document.body.lastChild))
            : (document.head.insertAdjacentHTML("beforeend", node),
              (lastChild = document.head.lastChild)),
            lastChild &&
              lastChild.tagName &&
              "SCRIPT" === lastChild.tagName &&
              void 0 === lastChild.cookieScriptProcessed &&
              void 0 === lastChild.CB_isClone &&
              void 0 === lastChild.consentProcessed &&
              void 0 === lastChild.cookiesProcessed &&
              ((lastChild.consentProcessed = "1"),
              CookieConsent.RunScriptTags([lastChild]));
        };
        (document.write = writeOverride), this.overrideEventListeners();
        var isMutationBrowser = !0;
        if (
          ("function" != typeof MutationObserver &&
            "object" != typeof MutationObserver &&
            (isMutationBrowser = !1),
          isMutationBrowser &&
            navigator.userAgent.match(/IEMobile|Trident|Edge/i) &&
            (isMutationBrowser = !1),
          document &&
            document.documentElement &&
            (this.hasAttr(document.documentElement, "ng-app") &&
              ((this.mutationAppName =
                document.documentElement.getAttribute("ng-app")),
              document.documentElement.removeAttribute("ng-app")),
            document.documentElement.attributes))
        )
          for (var j = 0; j < document.documentElement.attributes.length; j++) {
            var attrName = document.documentElement.attributes[j].name,
              attrValue = "";
            document.documentElement.attributes[j].value &&
              (attrValue = document.documentElement.attributes[j].value),
              this.mutationFallbackDocAttributes.push({
                name: attrName,
                value: attrValue,
              });
          }
        if (isMutationBrowser)
          (this.mutationObserver = new MutationObserver(this.mutationHandler)),
            this.mutationObserver.observe(document.documentElement, {
              childList: !0,
              subtree: !0,
            }),
            this.downloadConfiguration();
        else if (!window.cookieconsentscriptfallbackpreloaded) {
          window.cookieconsentscriptfallbackpreloaded = !0;
          var isEOLBrowser = !1;
          if (
            ((document.implementation &&
              "function" ==
                typeof document.implementation.createHTMLDocument) ||
              (isEOLBrowser = !0),
            !isEOLBrowser)
          )
            try {
              var testdoc = document.implementation.createHTMLDocument("");
              (testdoc.documentElement.innerHTML =
                "<html><head><script></script></head><body></body></html>"),
                document.replaceChild(
                  document.importNode(testdoc.documentElement, !0),
                  document.documentElement
                );
            } catch (e) {
              isEOLBrowser = !0;
            }
          isEOLBrowser
            ? ((this.mutationFallback = !1), this.stopOverrideEventListeners())
            : ((this.mutationFallback = !0),
              "function" == typeof window.stop && window.stop(),
              this.mutationHandlerFallback(),
              this.downloadConfiguration());
        }
      }),
      (this.overrideEventListeners = function () {
        var that = this;
        (this.mutateEventListeners = !0),
          "undefined" != typeof EventTarget &&
            void 0 === EventTarget.prototype.addEventListenerBase &&
            ((EventTarget.prototype.addEventListenerBase =
              EventTarget.prototype.addEventListener),
            (EventTarget.prototype.addEventListener = function (
              type,
              callback,
              options
            ) {
              that.mutateEventListeners &&
              !that.isInternalEventListener(type, this, callback)
                ? "DOMContentLoaded" === type ||
                  "load" === type ||
                  "onload" === type ||
                  "readystatechange" === type
                  ? that.mutationOnloadEventListeners.push({
                      target: this,
                      type: type,
                      listener: callback,
                      options: options,
                    })
                  : (that.mutationEventListeners.push({
                      target: this,
                      type: type,
                      listener: callback,
                      options: options,
                    }),
                    this.addEventListenerBase(type, callback, options))
                : this.addEventListenerBase(type, callback, options);
            }));
      }),
      (this.isInternalEventListener = function (type, node, callback) {
        var that = this,
          result = !1;
        return (
          ("beforescriptexecute" === type && void 0 !== node.origOuterHTML) ||
          node === this.iframe ||
          callback === this.cbonloadevent ||
          callback === this.triggerOnloadEvents ||
          callback === this.handleMessage ||
          callback === this.readBulkConsent ||
          callback === this.submitImpliedConsent ||
          callback === this.signalWindowLoad
            ? (result = !0)
            : void 0 === node.CB_isClone ||
              ("load" !== type && "error" !== type) ||
              (result = !0),
          result
        );
      }),
      (this.stopOverrideEventListeners = function () {
        CookieConsent.mutateEventListeners &&
          setTimeout(function () {
            (CookieConsent.mutateEventListeners = !1),
              CookieConsent.applyOverrideEventListeners(),
              "" !== CookieConsent.mutationAppName &&
                angular &&
                angular.bootstrap &&
                angular.bootstrap(document.documentElement, [
                  CookieConsent.mutationAppName,
                ]);
          }, 1);
      }),
      (this.OverrideEventListenersOnloadFired = []),
      (this.OverrideEventListenersOnloadToFire = []),
      (this.applyOverrideEventListeners = function () {
        for (var j = 0; j < this.mutationOnloadEventListeners.length; j++)
          try {
            var eventElement = this.mutationOnloadEventListeners[j];
            if (
              eventElement.target &&
              null != eventElement.target &&
              void 0 !== eventElement.target
            )
              if (
                (eventElement.target.addEventListenerBase(
                  eventElement.type,
                  eventElement.listener,
                  eventElement.options
                ),
                !CookieConsent.windowOnloadTriggered ||
                  (eventElement.target !== window &&
                    eventElement.target !== document))
              ) {
                if (
                  eventElement.target !== window &&
                  eventElement.target !== document
                )
                  try {
                    var evt = document.createEvent("Event");
                    evt.initEvent(eventElement.type, !0, !0),
                      eventElement.target.dispatchEvent(evt);
                  } catch (e) {}
              } else {
                var targetID =
                  eventElement.target.toString() + eventElement.type.toString();
                CookieConsent.OverrideEventListenersOnloadFired.indexOf(
                  targetID
                ) < 0 &&
                  (CookieConsent.OverrideEventListenersOnloadFired.push(
                    targetID
                  ),
                  CookieConsent.OverrideEventListenersOnloadToFire.push({
                    target: eventElement.target,
                    type: eventElement.type,
                  }));
              }
          } catch (e) {}
        for (
          var j = 0;
          j < CookieConsent.OverrideEventListenersOnloadToFire.length;
          j++
        )
          try {
            var evt = document.createEvent("Event");
            evt.initEvent(
              CookieConsent.OverrideEventListenersOnloadToFire[j].type,
              !0,
              !0
            ),
              CookieConsent.OverrideEventListenersOnloadToFire[
                j
              ].target.dispatchEvent(evt);
          } catch (e) {}
        !CookieConsent.windowOnloadTriggered ||
          "function" != typeof window.onload ||
          (null != document.body.getAttribute("onload") &&
            document.body.onload === window.onload) ||
          window.onload(),
          (this.mutationOnloadEventListeners = []);
      }),
      (this.cloneEventListeners = function (node, clone) {
        for (var j = 0; j < this.mutationEventListeners.length; j++)
          this.mutationEventListeners[j].target === node &&
            clone.addEventListenerBase(
              this.mutationEventListeners[j].type,
              this.mutationEventListeners[j].listener,
              this.mutationEventListeners[j].options
            );
      }),
      (this.downloadConfiguration = function () {
        var CDNPathFragment = this.currentPath;
        CDNPathFragment.length > 0
          ? (0 !== CDNPathFragment.indexOf("/") &&
              (CDNPathFragment = "/" + CDNPathFragment),
            CDNPathFragment.lastIndexOf("/") !== CDNPathFragment.length - 1 &&
              (CDNPathFragment += "/"))
          : (CDNPathFragment = "/");
        var ASCIIOnlyDomain = this.domain;
        if (0 !== ASCIIOnlyDomain.indexOf("xn--")) {
          var regex = /[^\u0020-\u007E]/gi;
          ASCIIOnlyDomain = this.domain.replace(regex, "-");
        }
        var configurationURL =
          this.CDN +
          "/consentconfig/" +
          this.serial.toLowerCase() +
          "/" +
          ASCIIOnlyDomain +
          CDNPathFragment +
          "configuration.js";
        (this.configuration.tags = []),
          this.getScript(configurationURL, !1, function () {
            if (
              ((CookieConsent.configuration.loaded = !0),
              0 === CookieConsent.configuration.trackingDomains.length)
            )
              for (
                var j = 0;
                j < CookieConsent.configuration.tags.length;
                j++
              ) {
                var currentTag = CookieConsent.configuration.tags[j];
                if (currentTag.resolvedUrl && "" !== currentTag.resolvedUrl) {
                  var currentDomain = CookieConsent.getHostnameFromURL(
                    currentTag.resolvedUrl
                  );
                  "" !== currentDomain &&
                    currentDomain !== window.location.hostname &&
                    CookieConsent.configuration.trackingDomains.push({
                      d: currentDomain,
                      c: currentTag.cat,
                    });
                }
              }
          });
      }),
      (this.initWidget = function () {
        var that = this,
          hasWidgetEnabledOverride =
            this.widget && null !== this.widget.enabledOverride;
        if (
          !this.isOutOfRegion &&
          this.hasResponse &&
          this.cookieEnabled &&
          (!hasWidgetEnabledOverride || this.widget.enabledOverride)
        )
          if (((this.widget = this.widget || {}), this.widget.configuration))
            initWidgetInternal();
          else {
            var url =
              this.CDN +
              "/consentconfig/" +
              this.serial.toLowerCase() +
              "/settings.json";
            function fetchSettingsCallback(data) {
              data &&
                data.widget &&
                ((that.widget.configuration = data.widget),
                initWidgetInternal());
            }
            this.fetchJsonData(
              url,
              fetchSettingsCallback,
              fetchSettingsCallback
            );
          }
        function initWidgetInternal() {
          var widgetConfig = that.widget.configuration,
            enabled =
              widgetConfig &&
              (hasWidgetEnabledOverride || widgetConfig.enabled);
          if (enabled && !that.widget.loaded) {
            var widgetUrl = that.host + "Scripts/widgetIcon.min.js";
            CookieConsent.getScript(widgetUrl, !0, function () {
              that.widget.loaded = !0;
            });
          }
        }
      }),
      (this.logWidgetAttributeWarning = function (attribute, value) {
        var supportUrl =
          "https://support.cookiebot.com/hc/en-us/articles/4406571299346";
        console.warn(
          "Cookiebot: Cookiebot script attribute '%s' with value  '%s' is invalid. For more information about valid options see %s",
          attribute,
          value,
          supportUrl
        );
      }),
      (this.mutationHandler = function (mutationsList, mutationObserver) {
        if (CookieConsent) {
          var doPostPoneMutation = !0;
          CookieConsent.configuration.loaded &&
            ((doPostPoneMutation = !1),
            CookieConsent.processPostPonedMutations());
          for (var j = 0; j < mutationsList.length; j++) {
            var mutationRecord = mutationsList[j];
            if ("childList" === mutationRecord.type)
              for (var i = 0; i < mutationRecord.addedNodes.length; i++) {
                var node = mutationRecord.addedNodes[i];
                if (
                  1 === node.nodeType &&
                  !CookieConsent.hasAttr(node, "data-cookieconsent") &&
                  void 0 === node.CB_isClone &&
                  void 0 === node.isCookiebotDynamicTag
                ) {
                  if (
                    null == CookieConsent.mutationHandlerFirstScript &&
                    "SCRIPT" === node.tagName
                  ) {
                    CookieConsent.mutationHandlerFirstScript = node;
                    for (
                      var scripts = document.getElementsByTagName("script"),
                        k = 0;
                      k < scripts.length;
                      k++
                    ) {
                      var currentScript = scripts[k];
                      if (
                        !CookieConsent.hasAttr(
                          currentScript,
                          "data-cookieconsent"
                        )
                      ) {
                        CookieConsent.isCookiebotNode(currentScript) ||
                          CookieConsent.log(
                            "WARNING: The Cookiebot script tag must be the first to load for auto-blocking to work."
                          );
                        break;
                      }
                    }
                  }
                  doPostPoneMutation || "SCRIPT" === node.tagName
                    ? CookieConsent.postponeMutation(node)
                    : CookieConsent.processMutation(node, !1);
                }
              }
          }
        }
      }),
      (this.preloadMutationScript = function (src) {
        var preloadLink = document.createElementOrig("link");
        (preloadLink.href = src),
          (preloadLink.rel = "preload"),
          (preloadLink.as = "script"),
          (preloadLink.CB_isClone = 1),
          document.head.appendChild(preloadLink);
      }),
      (this.processMutation = function (node, isPostPoned) {
        var canProcess = !0;
        if (
          (!isPostPoned && this.isCookiebotNode(node) && (canProcess = !1),
          node.consentProcessed && "1" === node.consentProcessed
            ? (canProcess = !1)
            : (node.consentProcessed = "1"),
          canProcess)
        ) {
          var tagCategories = "",
            tagURL = "",
            hasSrc = !1;
          if ("SCRIPT" === node.tagName) {
            if (
              (this.hasAttr(node, "src") &&
                ((tagURL = node.getAttribute("src")), (hasSrc = !0)),
              isPostPoned
                ? void 0 !== node.origOuterHTML &&
                  (tagCategories = this.getTagCookieCategories(
                    node.origOuterHTML,
                    tagURL,
                    node,
                    !0
                  ))
                : ((tagCategories = this.getTagCookieCategories(
                    node.outerHTML,
                    tagURL,
                    node,
                    !0
                  )),
                  null != node.type &&
                    void 0 !== node.type &&
                    "" !== node.type &&
                    "text/plain" !== node.type &&
                    (node.origScriptType = node.type)),
              hasSrc &&
                "" !== tagCategories &&
                tagURL.toLocaleLowerCase().indexOf("jquery") >= 0 &&
                (tagCategories = ""),
              "" !== tagCategories)
            )
              (node.type = "text/plain"),
                node.setAttribute("data-cookieconsent", tagCategories);
            else if (isPostPoned && "text/plain" === node.type) {
              var tagParent = node.parentNode,
                tagClone = this.cloneScriptTag(node);
              this.cloneEventListeners(node, tagClone),
                (tagClone.consentProcessed = "1"),
                (tagClone.CB_isClone = 1),
                isPostPoned &&
                  ((tagClone.origOuterHTML = node.origOuterHTML),
                  void 0 !== node.origScriptType &&
                    (tagClone.type = node.origScriptType)),
                null != tagParent &&
                  (tagParent.insertBefore(tagClone, node),
                  tagParent.removeChild(node));
            }
          } else if (
            "IFRAME" === node.tagName ||
            "IMG" === node.tagName ||
            "EMBED" === node.tagName ||
            "VIDEO" === node.tagName ||
            "AUDIO" === node.tagName ||
            "PICTURE" === node.tagName ||
            "SOURCE" === node.tagName
          ) {
            if (
              !isPostPoned &&
              this.hasAttr(node, "src") &&
              !this.isCookiebotNode(node) &&
              !this.hasAttr(node, "data-lazy-type")
            ) {
              node.origOuterHTML = node.outerHTML;
              var nodeSrc = node.getAttribute("src");
              "IFRAME" === node.tagName &&
                "about:blank" !== nodeSrc &&
                "" !== nodeSrc &&
                (node.setAttribute("data-cookieblock-src", nodeSrc),
                node.removeAttribute("src"));
            }
            if (
              ("IMG" === node.tagName &&
                this.hasAttr(node, "data-image_src") &&
                node.setAttribute("src", node.getAttribute("data-image_src")),
              this.hasAttr(node, "data-cookieblock-src") &&
                !this.hasAttr(node, "src") &&
                !this.hasAttr(node, "data-lazy-type") &&
                !this.hasAttr(node, "data-image_src"))
            )
              if (
                ((tagURL = node.getAttribute("data-cookieblock-src")),
                (tagCategories = this.getTagCookieCategories(
                  node.origOuterHTML,
                  tagURL,
                  node,
                  !0
                )),
                "" !== tagCategories)
              ) {
                node.setAttribute("data-cookieconsent", tagCategories);
                var clone = node.cloneNode(!0);
                this.cloneEventListeners(node, clone),
                  (clone.CB_isClone = 1),
                  (clone.consentProcessed = "1");
                var cloneParentNode = node.parentNode;
                cloneParentNode.insertBefore(clone, node),
                  cloneParentNode.removeChild(node),
                  (node = null);
              } else if (
                (this.hasAttr(node, "data-cookieblock-src") &&
                  (node.setAttribute(
                    "src",
                    node.getAttribute("data-cookieblock-src")
                  ),
                  node.removeAttribute("data-cookieblock-src")),
                (node.consentProcessed = "1"),
                "SOURCE" === node.tagName)
              ) {
                var clone = node.cloneNode(!0);
                this.cloneEventListeners(node, clone),
                  (clone.CB_isClone = 1),
                  (clone.consentProcessed = "1");
                var cloneParentNode = node.parentNode;
                cloneParentNode.removeChild(node),
                  cloneParentNode.appendChild(clone),
                  (node = null);
              }
          }
        }
      }),
      (this.isCookiebotNode = function (node) {
        var hasMatch = !1;
        if (this.hasAttr(node, "src")) {
          var url = node.getAttribute("src").toLowerCase();
          (0 !== url.indexOf(this.host) && 0 !== url.indexOf(this.CDN)) ||
            (hasMatch = !0);
        }
        return hasMatch;
      }),
      (this.isCookiebotCoreNode = function (node) {
        return this.isCookiebotNode(node) && node.src.indexOf("/uc.js") > -1;
      }),
      (this.postponeMutation = function (node) {
        if (!this.isCookiebotNode(node))
          if (
            ("SCRIPT" === node.tagName &&
              void 0 !== node.type &&
              "text/javascript" !== node.type &&
              node.type.indexOf("-text/javascript") > -1 &&
              (node.type = "text/javascript"),
            "SCRIPT" !== node.tagName ||
              (null != node.type &&
                void 0 !== node.type &&
                "" !== node.type &&
                "text/javascript" !== node.type &&
                "application/javascript" !== node.type &&
                "module" !== node.type &&
                "text/plain" !== node.type))
          ) {
            if (
              !(
                ("IFRAME" !== node.tagName &&
                  "IMG" !== node.tagName &&
                  "EMBED" !== node.tagName &&
                  "VIDEO" !== node.tagName &&
                  "AUDIO" !== node.tagName &&
                  "PICTURE" !== node.tagName &&
                  "SOURCE" !== node.tagName) ||
                ("IMG" === node.tagName &&
                  this.hasAttr(node, "src") &&
                  this.getHostnameFromURL(node.src) ===
                    window.location.hostname)
              )
            ) {
              if (
                this.hasAttr(node, "src") &&
                !this.hasAttr(node, "data-lazy-type") &&
                !this.hasAttr(node, "data-image_src") &&
                !this.isCookiebotNode(node)
              ) {
                (node.origOuterHTML = node.outerHTML),
                  node.setAttribute(
                    "data-cookieblock-src",
                    node.getAttribute("src")
                  ),
                  node.removeAttribute("src");
                var clone = node.cloneNode(!0);
                this.cloneEventListeners(node, clone), (clone.CB_isClone = 1);
                var cloneParentNode = node.parentNode;
                cloneParentNode.insertBefore(clone, node),
                  cloneParentNode.removeChild(node),
                  (node = null),
                  this.postPonedMutations.push(clone);
              }
              null != node &&
                "IMG" === node.tagName &&
                this.hasAttr(node, "data-image_src") &&
                node.setAttribute("src", node.getAttribute("data-image_src"));
            }
          } else {
            CookieConsent.startJQueryHold(),
              (node.origOuterHTML = node.outerHTML),
              null != node.type &&
                void 0 !== node.type &&
                "" !== node.type &&
                "text/plain" !== node.type &&
                (node.origScriptType = node.type),
              (node.type = "text/plain");
            var beforeScriptExecuteListener = function (event) {
              "text/plain" === node.getAttribute("type") &&
                event.preventDefault(),
                node.removeEventListener(
                  "beforescriptexecute",
                  beforeScriptExecuteListener
                );
            };
            node.addEventListener(
              "beforescriptexecute",
              beforeScriptExecuteListener
            ),
              this.hasResponse &&
                this.hasAttr(node, "src") &&
                !this.hasAttr(node, "nomodule") &&
                this.preloadMutationScript(node.src),
              this.hasAttr(node, "defer")
                ? (this.hasAttr(node, "async") && node.removeAttribute("async"),
                  this.deferMutations.push(node))
                : this.nonAsyncMutations.push(node);
          }
      }),
      (this.processPostPonedMutations = function () {
        if (this.postPonedMutations.length > 0) {
          for (var j = 0; j < this.postPonedMutations.length; j++) {
            var postPonedNode = this.postPonedMutations[j];
            this.processMutation(postPonedNode, !0);
          }
          this.postPonedMutations = [];
        }
      }),
      (this.dequeueNonAsyncScripts = function (mutationNodes) {
        if (mutationNodes.length > 0) {
          var node = mutationNodes.shift();
          if (
            "SCRIPT" === node.tagName &&
            void 0 === node.cookieScriptProcessed
          ) {
            (node.cookieScriptProcessed = 1), CookieConsent.startJQueryHold();
            var tagURL = "",
              tagCategories = "",
              hasSrc = !1;
            if (
              (this.hasAttr(node, "src") &&
                ((tagURL = node.getAttribute("src")), (hasSrc = !0)),
              void 0 !== node.origOuterHTML &&
                (tagCategories = this.getTagCookieCategories(
                  node.origOuterHTML,
                  tagURL,
                  node,
                  !0
                )),
              hasSrc &&
                "" !== tagCategories &&
                tagURL.toLocaleLowerCase().indexOf("jquery") >= 0 &&
                (tagCategories = ""),
              "" !== tagCategories)
            )
              (node.type = "text/plain"),
                node.setAttribute("data-cookieconsent", tagCategories),
                CookieConsent.dequeueNonAsyncScripts(mutationNodes);
            else if ("text/plain" === node.type) {
              var tagParent = node.parentNode,
                tagClone = this.cloneScriptTag(node);
              this.cloneEventListeners(node, tagClone),
                (tagClone.consentProcessed = "1"),
                (tagClone.CB_isClone = 1);
              var fireTagOnLoad =
                hasSrc &&
                !this.hasAttr(tagClone, "data-cookieconsent") &&
                !this.hasAttr(tagClone, "nomodule");
              fireTagOnLoad &&
                ((tagClone.onload = function () {
                  CookieConsent.dequeueNonAsyncScripts(mutationNodes);
                }),
                (tagClone.onerror = function () {
                  CookieConsent.dequeueNonAsyncScripts(mutationNodes);
                })),
                (tagClone.origOuterHTML = node.origOuterHTML),
                void 0 !== node.origScriptType &&
                  (tagClone.type = node.origScriptType);
              try {
                null != tagParent &&
                  (tagParent.insertBefore(tagClone, node),
                  tagParent.removeChild(node));
              } catch (e) {}
              fireTagOnLoad ||
                CookieConsent.dequeueNonAsyncScripts(mutationNodes);
            } else CookieConsent.dequeueNonAsyncScripts(mutationNodes);
          } else CookieConsent.dequeueNonAsyncScripts(mutationNodes);
        } else
          this.deferMutations.length > 0
            ? CookieConsent.dequeueNonAsyncScripts(CookieConsent.deferMutations)
            : (CookieConsent.runScripts(),
              setTimeout(function () {
                CookieConsent.stopOverrideEventListeners(),
                  CookieConsent.endJQueryHold();
              }, 1e3));
      }),
      (this.getTagCookieCategories = function (
        outerhtml,
        tagURL,
        node,
        matchCommon
      ) {
        for (
          var categories = "", j = 0;
          j < this.configuration.tags.length;
          j++
        ) {
          var currentTag = this.configuration.tags[j];
          if (
            "" !== tagURL &&
            currentTag.url &&
            "" !== currentTag.url &&
            currentTag.url.toLowerCase() === tagURL.toLowerCase()
          ) {
            categories = this.cookieCategoriesFromNumberArray(currentTag.cat);
            break;
          }
          if (
            "" !== tagURL &&
            currentTag.resolvedUrl &&
            "" !== currentTag.resolvedUrl &&
            currentTag.resolvedUrl.toLowerCase() ===
              this.resolveURL(tagURL).toLowerCase()
          ) {
            categories = this.cookieCategoriesFromNumberArray(currentTag.cat);
            break;
          }
          if (
            this.hasAttr(node, "id") &&
            currentTag.tagID &&
            "" !== currentTag.tagID
          ) {
            var tagID = node.getAttribute("id").toLowerCase();
            if (currentTag.tagID.toLowerCase() === tagID) {
              categories = this.cookieCategoriesFromNumberArray(currentTag.cat);
              break;
            }
          }
          if (
            currentTag.innerHash &&
            "" !== currentTag.innerHash &&
            node &&
            node.innerHTML &&
            "" !== node.innerHTML
          ) {
            var tagHash = this.hashCode(node.innerHTML).toString();
            if (currentTag.innerHash === tagHash && "0" !== tagHash) {
              categories = this.cookieCategoriesFromNumberArray(currentTag.cat);
              break;
            }
          }
          if (
            currentTag.outerHash &&
            "" !== currentTag.outerHash &&
            void 0 !== outerhtml &&
            "undefined" !== outerhtml
          ) {
            var tagHash = this.hashCode(outerhtml).toString();
            if (currentTag.outerHash === tagHash && "0" !== tagHash) {
              categories = this.cookieCategoriesFromNumberArray(currentTag.cat);
              break;
            }
          }
          if (
            "" !== tagURL &&
            currentTag.resolvedUrl &&
            "" !== currentTag.resolvedUrl &&
            this.configuration.trackingDomains.length > 0 &&
            "IMG" !== node.tagName &&
            "PICTURE" !== node.tagName
          ) {
            var tagDomain = this.getHostnameFromURL(tagURL);
            if ("" !== tagDomain && tagDomain !== window.location.hostname)
              for (
                var k = 0;
                k < this.configuration.trackingDomains.length;
                k++
              ) {
                var currentRecord = this.configuration.trackingDomains[k];
                if (tagDomain === currentRecord.d) {
                  categories = this.cookieCategoriesFromNumberArray(
                    currentRecord.c
                  );
                  break;
                }
              }
          }
        }
        if (
          0 === this.configuration.tags.length &&
          matchCommon &&
          "" !== tagURL &&
          "" === categories
        ) {
          var tagdomain = tagURL.toLowerCase(),
            isAboluteURL = !0;
          if (
            (0 === tagdomain.indexOf("https://") && tagdomain.length > 8
              ? (tagdomain = tagdomain.substr(8))
              : 0 === tagdomain.indexOf("http://") && tagdomain.length > 7
              ? (tagdomain = tagdomain.substr(7))
              : 0 === tagdomain.indexOf("//") && tagdomain.length > 2
              ? (tagdomain = tagdomain.substr(2))
              : (isAboluteURL = !1),
            isAboluteURL &&
              (tagdomain.indexOf(":") > 0 &&
                (tagdomain = tagdomain.substr(0, tagdomain.indexOf(":"))),
              tagdomain.indexOf("/") > 0 &&
                (tagdomain = tagdomain.substr(0, tagdomain.indexOf("/"))),
              tagdomain.length > 3))
          )
            for (var i = 0; i < this.commonTrackers.domains.length; i++) {
              var testDomain = this.commonTrackers.domains[i];
              if (tagdomain.indexOf(testDomain.d) >= 0) {
                categories = this.cookieCategoriesFromNumberArray(testDomain.c);
                break;
              }
            }
        }
        return categories;
      }),
      (this.cookieCategoriesFromNumberArray = function (catNumberArray) {
        for (var categoryString = "", i = 0; i < catNumberArray.length; i++)
          switch (
            ("" !== categoryString && (categoryString += ","),
            Number(catNumberArray[i]))
          ) {
            case 2:
              categoryString += "preferences";
              break;
            case 3:
              categoryString += "statistics";
              break;
            case 4:
              ("" !== categoryString &&
                -1 !== categoryString.indexOf("marketing")) ||
                (categoryString += "marketing");
          }
        return (
          "" !== categoryString &&
            "," === categoryString.substr(categoryString.length - 1, 1) &&
            (categoryString = categoryString.substring(
              0,
              categoryString.length - 1
            )),
          categoryString
        );
      }),
      (this.stopMutationObserver = function () {
        null != this.mutationObserver &&
          (CookieConsent.processPostPonedMutations(),
          CookieConsent.dequeueNonAsyncScripts(this.nonAsyncMutations),
          this.mutationObserver.disconnect(),
          (this.mutationObserver = null));
      }),
      (this.mutationHandlerFallback = function (charset) {
        var xhr = new XMLHttpRequest(),
          content = "";
        (xhr.onreadystatechange = function () {
          4 === xhr.readyState &&
            ((content = xhr.responseText),
            CookieConsent.mutationHandlerFallbackInit(content));
        }),
          xhr.open("GET", document.URL, !0),
          charset && xhr.overrideMimeType("text/html; charset=" + charset),
          xhr.send(null);
      }),
      (this.mutationHandlerFallbackInit = function (content) {
        if (this.configuration.loaded || this.configuration.loadRetry > 30) {
          if (
            ((this.configuration.loaded = !0),
            (this.configuration.loadRetry = 0),
            !this.mutationHandlerFallbackCharsetLoaded)
          ) {
            this.mutationHandlerFallbackCharsetLoaded = !0;
            var regexCharset =
                /<meta.*?charset=["'].*charset=([^"']+)["'][^>]*>/g,
              matchCharset = regexCharset.exec(content);
            if (
              (matchCharset ||
                ((regexCharset = /<meta charset=["']([^"']+)["'][^>]*>/g),
                (matchCharset = regexCharset.exec(content))),
              matchCharset && matchCharset.length > 1)
            ) {
              var currentCharset = matchCharset[1];
              if ("utf-8" !== currentCharset.toLowerCase())
                return void this.mutationHandlerFallback(matchCharset[1]);
            }
          }
          var doc = document.implementation.createHTMLDocument(
            "" + (document.title || "")
          );
          document.replaceChild(
            document.importNode(doc.documentElement, !0),
            document.documentElement
          ),
            (document.documentElement.innerHTML = content);
          for (var i = 0; i < this.mutationFallbackDocAttributes.length; i++)
            document.documentElement.setAttribute(
              this.mutationFallbackDocAttributes[i].name,
              this.mutationFallbackDocAttributes[i].value
            );
          var regex = /<\s*body[^>]*>/g,
            match = regex.exec(content);
          if (match && match.length > 0 && "<body>" !== match[0])
            try {
              var testdoc = document.implementation.createHTMLDocument("");
              testdoc.documentElement.innerHTML =
                "<html><head><script></script></head>" +
                match[0] +
                "</body></html>";
              for (var i = 0; i < testdoc.body.attributes.length; i++)
                try {
                  document.body.setAttribute(
                    testdoc.body.attributes[i].name,
                    testdoc.body.attributes[i].value
                  );
                } catch (e) {}
            } catch (e) {}
          var baseTags = document.getElementsByTagName("base");
          if (
            baseTags.length > 0 &&
            navigator.userAgent.match(/IEMobile|Trident/i)
          ) {
            var all = document.getElementsByTagName("*");
            [].forEach.call(all, function (node) {
              if (CookieConsent.hasAttr(node, "src"))
                node.src = CookieConsent.resolveURL(node.src);
              else if (
                CookieConsent.hasAttr(node, "href") &&
                ((node.href = CookieConsent.resolveURL(node.href)),
                "LINK" === node.tagName && CookieConsent.hasAttr(node, "rel"))
              ) {
                var linkClone = node.cloneNode(!0),
                  cloneParentNode = node.parentNode;
                cloneParentNode.insertBefore(linkClone, node),
                  cloneParentNode.removeChild(node);
              }
            });
          }
          var scripts = document.getElementsByTagName("script");
          [].forEach.call(scripts, function (node) {
            if (
              CookieConsent.isCookiebotCoreNode(node) ||
              CookieConsent.hasAttr(node, "data-cookieconsent")
            )
              CookieConsent.hasAttr(node, "data-cookieconsent") &&
                "ignore" === node.getAttribute("data-cookieconsent") &&
                (node.removeAttribute("data-cookieconsent"),
                CookieConsent.fallbackScriptNodes.push(node));
            else {
              var tagCategories = "",
                tagURL = "",
                hasSrc = !1;
              CookieConsent.hasAttr(node, "src") &&
                ((tagURL = node.getAttribute("src")), (hasSrc = !0)),
                (tagCategories = CookieConsent.getTagCookieCategories(
                  node.outerHTML,
                  tagURL,
                  node,
                  !0
                )),
                hasSrc &&
                  "" !== tagCategories &&
                  tagURL.toLocaleLowerCase().indexOf("jquery") >= 0 &&
                  (tagCategories = ""),
                "" !== tagCategories &&
                  (null != node.type &&
                    void 0 !== node.type &&
                    "" !== node.type &&
                    "text/plain" !== node.type &&
                    (node.origScriptType = node.type),
                  (node.type = "text/plain"),
                  node.setAttribute("data-cookieconsent", tagCategories)),
                CookieConsent.hasAttr(node, "defer")
                  ? CookieConsent.fallbackDeferNodes.push(node)
                  : CookieConsent.fallbackScriptNodes.push(node);
            }
          }),
            this.loadFallbackScriptNodes(this.fallbackScriptNodes),
            this.mutationHandlerFallbackMarkupTag(document, "IFRAME"),
            this.mutationHandlerFallbackMarkupTag(document, "IMG"),
            this.mutationHandlerFallbackMarkupTag(document, "EMBED"),
            this.mutationHandlerFallbackMarkupTag(document, "VIDEO"),
            this.mutationHandlerFallbackMarkupTag(document, "AUDIO"),
            this.mutationHandlerFallbackMarkupTag(document, "PICTURE"),
            this.mutationHandlerFallbackMarkupTag(document, "SOURCE"),
            (CookieConsent.mutationFallback = !1),
            null != CookieConsent.dialog && CookieConsent.show(),
            (this.consented || this.declined) && this.triggerOnloadEvents();
        } else
          setTimeout(function () {
            CookieConsent.mutationHandlerFallbackInit(content);
          }, 100);
      }),
      (this.fallbackScriptNodes = []),
      (this.fallbackDeferNodes = []),
      (this.startJQueryHold = function () {
        "undefined" != typeof jQuery &&
          void 0 === window.CB_jQueryHoldReadyStarted &&
          void 0 !== jQuery.holdReady &&
          ((window.CB_jQueryHoldReadyStarted = 1),
          (CookieConsent.holdReadyClone = jQuery.holdReady),
          CookieConsent.holdReadyClone(!0));
      }),
      (this.endJQueryHold = function () {
        "undefined" != typeof jQuery &&
          void 0 !== window.CB_jQueryHoldReadyStarted &&
          void 0 !== CookieConsent.holdReadyClone &&
          CookieConsent.holdReadyClone(!1);
      }),
      (this.loadFallbackScriptNodes = function (mutationNodes) {
        if ((CookieConsent.startJQueryHold(), mutationNodes.length > 0)) {
          var node = mutationNodes.shift();
          if (
            null == node.type ||
            void 0 === node.type ||
            "" === node.type ||
            "text/javascript" === node.type ||
            "application/javascript" === node.type ||
            "module" === node.type ||
            "text/plain" === node.type
          ) {
            var tagParent = node.parentNode,
              tagClone = this.cloneScriptTag(node);
            this.cloneEventListeners(node, tagClone),
              (tagClone.consentProcessed = "1");
            var hasSrc = !1;
            this.hasAttr(node, "src") && (hasSrc = !0);
            var fireTagOnLoad =
              hasSrc &&
              !this.hasAttr(tagClone, "data-cookieconsent") &&
              !this.hasAttr(tagClone, "nomodule");
            fireTagOnLoad &&
              ((tagClone.onload = function () {
                (tagClone.isloaded = !0),
                  CookieConsent.loadFallbackScriptNodes(mutationNodes),
                  CookieConsent.startJQueryHold();
              }),
              (tagClone.onerror = function () {
                (tagClone.isloaded = !0),
                  CookieConsent.loadFallbackScriptNodes(mutationNodes),
                  CookieConsent.startJQueryHold();
              })),
              this.hasAttr(tagClone, "data-cookieconsent") &&
                "ignore" !== tagClone.getAttribute("data-cookieconsent") &&
                (tagClone.type = "text/plain");
            var tagParent = node.parentNode;
            null != tagParent &&
              (tagParent.insertBefore(tagClone, node),
              tagParent.removeChild(node)),
              fireTagOnLoad ||
                CookieConsent.loadFallbackScriptNodes(mutationNodes);
          } else CookieConsent.loadFallbackScriptNodes(mutationNodes);
        } else
          this.fallbackDeferNodes.length > 0
            ? this.loadFallbackScriptNodes(this.fallbackDeferNodes)
            : (CookieConsent.runScripts(),
              setTimeout(function () {
                if (
                  (CookieConsent.stopOverrideEventListeners(),
                  CookieConsent.endJQueryHold(),
                  "undefined" == typeof EventTarget)
                ) {
                  var evt = document.createEvent("Event");
                  evt.initEvent("readystatechange", !0, !0),
                    window.document.dispatchEvent(evt),
                    (evt = document.createEvent("Event")),
                    evt.initEvent("DOMContentLoaded", !0, !0),
                    window.document.dispatchEvent(evt),
                    (evt = document.createEvent("Event")),
                    evt.initEvent("load", !0, !0),
                    window.dispatchEvent(evt),
                    (evt = document.createEvent("Event")),
                    evt.initEvent("onload", !0, !0),
                    window.dispatchEvent(evt);
                }
              }, 500));
      }),
      (this.mutationHandlerFallbackMarkupTag = function (doc, nodeType) {
        var elements = doc.getElementsByTagName(nodeType);
        [].forEach.call(elements, function (node) {
          if (
            CookieConsent.hasAttr(node, "data-cookieconsent") ||
            CookieConsent.isCookiebotNode(node)
          )
            CookieConsent.hasAttr(node, "data-cookieconsent") &&
              "ignore" === node.getAttribute("data-cookieconsent") &&
              node.removeAttribute("data-cookieconsent");
          else if (
            "IMG" !== node.tagName ||
            !CookieConsent.hasAttr(node, "src") ||
            CookieConsent.getHostnameFromURL(node.src) !==
              window.location.hostname
          ) {
            var tagCategories = "",
              tagURL = "";
            CookieConsent.hasAttr(node, "src") &&
              (tagURL = node.getAttribute("src")),
              (tagCategories = CookieConsent.getTagCookieCategories(
                node.outerHTML,
                tagURL,
                node,
                !0
              )),
              "" !== tagCategories &&
                (node.setAttribute("data-cookieconsent", tagCategories),
                CookieConsent.hasAttr(node, "src") &&
                  ((node.origOuterHTML = node.outerHTML),
                  node.setAttribute(
                    "data-cookieblock-src",
                    node.getAttribute("src")
                  ),
                  node.removeAttribute("src")));
          }
        });
      }),
      (this.resolveURL = function (url) {
        if ("" !== url) {
          var a = document.createElementOrig("a");
          return (a.href = url), a.cloneNode(!1).href;
        }
        return url;
      }),
      (this.getHostnameFromURL = function (url) {
        try {
          var a = document.createElementOrig("a");
          return (a.href = url), a.cloneNode(!1).hostname;
        } catch (e) {
          return "";
        }
      }),
      (this.updateRegulations = function () {
        if ("" !== this.userCountry) {
          var lowercaseCountry = this.userCountry.toLowerCase();
          this.regulationRegions.gdpr.indexOf(lowercaseCountry) >= 0
            ? (this.regulations.gdprApplies = !0)
            : (this.regulations.gdprApplies = !1),
            this.regulationRegions.ccpa.indexOf(lowercaseCountry) >= 0
              ? (this.regulations.ccpaApplies = !0)
              : (this.regulations.ccpaApplies = !1),
            this.regulationRegions.lgpd.indexOf(lowercaseCountry) >= 0
              ? (this.regulations.lgpdApplies = !0)
              : (this.regulations.lgpdApplies = !1);
        } else
          (this.regulations.gdprApplies = !1),
            (this.regulations.ccpaApplies = !1),
            (this.regulations.lgpdApplies = !1);
        this.hasFramework &&
          this.frameworkLoaded &&
          "iabv2" === this.framework.toLowerCase() &&
          !this.frameworkBlocked &&
          "object" == typeof CookieConsentIABCMP &&
          CookieConsentIABCMP.updateFramework &&
          CookieConsentIABCMP.gdprApplies !== this.regulations.gdprApplies &&
          CookieConsentIABCMP.updateFramework();
      }),
      (this.signalConsentReady = function () {
        setTimeout(function () {
          CookieConsent.signalGoogleConsentAPI();
          var event = document.createEvent("Event");
          event.initEvent("CookiebotOnConsentReady", !0, !0),
            window.dispatchEvent(event),
            (event = document.createEvent("Event")),
            event.initEvent("CookieConsentOnConsentReady", !0, !0),
            window.dispatchEvent(event);
        }, 1);
      }),
      this.init();
  }),
  (CookieControl.Cookie.prototype.onload = function () {}),
  (CookieControl.Cookie.prototype.ondecline = function () {}),
  (CookieControl.Cookie.prototype.onaccept = function () {}),
  (CookieControl.DateTime = function (initdate) {
    (this.Date = new Date()),
      initdate && (this.Date = new Date(initdate)),
      (this.isLeapYear = function (year) {
        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
      }),
      (this.getDaysInMonth = function (year, month) {
        return [
          31,
          this.isLeapYear(year) ? 29 : 28,
          31,
          30,
          31,
          30,
          31,
          31,
          30,
          31,
          30,
          31,
        ][month];
      }),
      (this.addMonths = function (monthcount) {
        var n = this.Date.getDate();
        return (
          this.Date.setDate(1),
          this.Date.setMonth(this.Date.getMonth() + monthcount),
          this.Date.setDate(
            Math.min(
              n,
              this.getDaysInMonth(this.Date.getFullYear(), this.Date.getMonth())
            )
          ),
          this.Date
        );
      });
  }),
  addUspapiLocatorFrame(),
  window.addEventListener("message", __handleUspapiMessage, !1),
  "object" != typeof CookieConsent || (CookieConsent && CookieConsent.nodeType)
    ? ((window.CookieConsent = new CookieControl.Cookie("CookieConsent")),
      "CookieConsent" !== CookieConsent.scriptId &&
        "Cookiebot" !== CookieConsent.scriptId &&
        (window[CookieConsent.scriptId] = CookieConsent))
    : CookieConsent.log(
        "WARNING: Cookiebot script is included twice - please remove one instance to avoid unexpected results."
      );