/* Sunberry standalone Tarteaucitron.js 1.9.9 bundle. Generated from local core, CSS, all supported languages and services. */
/*jslint browser: true, evil: true */

var scripts = document.getElementsByTagName('script'),
    path = scripts[scripts.length - 1].src.split('?')[0],
    tarteaucitronForceCDN = (typeof tarteaucitronForceCDN === 'undefined') ? '' : tarteaucitronForceCDN,
    cdn = (tarteaucitronForceCDN === '') ? path.split('/').slice(0, -1).join('/') + '/' : tarteaucitronForceCDN,
    alreadyLaunch = (typeof alreadyLaunch === 'undefined') ? 0 : alreadyLaunch,
    tarteaucitronForceLanguage = (typeof tarteaucitronForceLanguage === 'undefined') ? '' : tarteaucitronForceLanguage,
    tarteaucitronForceExpire = (typeof tarteaucitronForceExpire === 'undefined') ? '' : tarteaucitronForceExpire,
    tarteaucitronCustomText = (typeof tarteaucitronCustomText === 'undefined') ? '' : tarteaucitronCustomText,
    // tarteaucitronExpireInDay: true for day(s) value - false for hour(s) value
    tarteaucitronExpireInDay = (typeof tarteaucitronExpireInDay === 'undefined' || typeof tarteaucitronExpireInDay !== "boolean") ? true : tarteaucitronExpireInDay,
    timeExpire = 31536000000,
    tarteaucitronProLoadServices,
    tarteaucitronNoAdBlocker = false;



var tarteaucitron = {
    "version": 20220322,
    "cdn": cdn,
    "user": {},
    "lang": {},
    "languages": {},
    "services": {},
    "added": [],
    "idprocessed": [],
    "state": [],
    "launch": [],
    "parameters": {},
    "isAjax": false,
    "reloadThePage": false,
    "events": {
        "init": function () {},
        "load": function () {},
    },
    "init": function (params) {
        "use strict";
        var origOpen;

        tarteaucitron.parameters = params;
        if (alreadyLaunch === 0) {
            alreadyLaunch = 1;
            if (window.addEventListener) {
                window.addEventListener("load", function () {
                    tarteaucitron.initEvents.loadEvent(false);
                }, false);
                window.addEventListener("scroll", function () {
                    tarteaucitron.initEvents.scrollEvent();
                }, false);

                window.addEventListener("keydown", function (evt) {
                    tarteaucitron.initEvents.keydownEvent(false, evt);
                }, false);
                window.addEventListener("hashchange", function () {
                    tarteaucitron.initEvents.hashchangeEvent();
                }, false);
                window.addEventListener("resize", function () {
                    tarteaucitron.initEvents.resizeEvent();
                }, false);
            } else {
                window.attachEvent("onload", function () {
                    tarteaucitron.initEvents.loadEvent(true);
                });
                window.attachEvent("onscroll", function () {
                    tarteaucitron.initEvents.scrollEvent();
                });
                window.attachEvent("onkeydown", function (evt) {
                    tarteaucitron.initEvents.keydownEvent(true, evt);

                });
                window.attachEvent("onhashchange", function () {
                    tarteaucitron.initEvents.hashchangeEvent();
                });
                window.attachEvent("onresize", function () {
                    tarteaucitron.initEvents.resizeEvent();
                });
            }

            if (typeof XMLHttpRequest !== 'undefined') {
                origOpen = XMLHttpRequest.prototype.open;
                XMLHttpRequest.prototype.open = function () {

                    if (window.addEventListener) {
                        this.addEventListener("load", function () {
                            if (typeof tarteaucitronProLoadServices === 'function') {
                                tarteaucitronProLoadServices();
                            }
                        }, false);
                    } else if (typeof this.attachEvent !== 'undefined') {
                        this.attachEvent("onload", function () {
                            if (typeof tarteaucitronProLoadServices === 'function') {
                                tarteaucitronProLoadServices();
                            }
                        });
                    } else {
                        if (typeof tarteaucitronProLoadServices === 'function') {
                            setTimeout(tarteaucitronProLoadServices, 1000);
                        }
                    }

                    try {
                        origOpen.apply(this, arguments);
                    } catch (err) {}
                };
            }
        }

        if(tarteaucitron.events.init) {
            tarteaucitron.events.init();
        }
    },
    "initEvents": {
        "loadEvent": function (isOldBrowser) {
            tarteaucitron.load();
            tarteaucitron.fallback(['tarteaucitronOpenPanel'], function (elem) {
                if (isOldBrowser) {
                    elem.attachEvent("onclick", function (event) {
                        tarteaucitron.userInterface.openPanel();
                        event.preventDefault();
                    });
                } else {
                    elem.addEventListener("click", function (event) {
                        tarteaucitron.userInterface.openPanel();
                        event.preventDefault();
                    }, false);
                }
            }, true);
        },
        "keydownEvent": function (isOldBrowser, evt) {
            if (evt.keyCode === 27) {
                tarteaucitron.userInterface.closePanel();
            }

            if (isOldBrowser) {
                if ( evt.keyCode === 9 && focusableEls.indexOf(evt.target) >= 0) {
                    if ( evt.shiftKey ) /* shift + tab */ {
                        if (document.activeElement === firstFocusableEl) {
                            lastFocusableEl.focus();
                            evt.preventDefault();
                        }
                    } else /* tab */ {
                        if (document.activeElement === lastFocusableEl) {
                            firstFocusableEl.focus();
                            evt.preventDefault();
                        }
                    }
                }
            }
        },
        "hashchangeEvent": function () {
            if (document.location.hash === tarteaucitron.hashtag && tarteaucitron.hashtag !== '') {
                tarteaucitron.userInterface.openPanel();
            }
        },
        "resizeEvent": function () {
            var tacElem = document.getElementById('tarteaucitron');
            var tacCookieContainer = document.getElementById('tarteaucitronCookiesListContainer');

            if (tacElem && tacElem.style.display === 'block') {
                tarteaucitron.userInterface.jsSizing('main');
            }

            if (tacCookieContainer && tacCookieContainer.style.display === 'block') {
                tarteaucitron.userInterface.jsSizing('cookie');
            }
        },
        "scrollEvent": function () {
            var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
            var heightPosition;
            var tacPercentage = document.getElementById('tarteaucitronPercentage');
            var tacAlertBig = document.getElementById('tarteaucitronAlertBig');

            if (tacAlertBig && !tarteaucitron.highPrivacy) {
                if (tacAlertBig.style.display === 'block') {
                    heightPosition = tacAlertBig.offsetHeight + 'px';

                    if (scrollPos > (screen.height * 2)) {
                        tarteaucitron.userInterface.respondAll(true);
                    } else if (scrollPos > (screen.height / 2)) {
                        document.getElementById('tarteaucitronDisclaimerAlert').innerHTML = '<strong>' + tarteaucitron.lang.alertBigScroll + '</strong> ' + tarteaucitron.lang.alertBig;
                    }

                    if (tacPercentage) {
                        if (tarteaucitron.orientation === 'top') {
                            tacPercentage.style.top = heightPosition;
                        } else {
                            tacPercentage.style.bottom = heightPosition;
                        }
                        tacPercentage.style.width = ((100 / (screen.height * 2)) * scrollPos) + '%';
                    }
                }
            }
        },
    },
    "load": function () {
        "use strict";
        var language = tarteaucitron.getLanguage(),
            defaults = {
                "adblocker": false,
                "hashtag": '#tarteaucitron',
                "cookieName": 'tarteaucitron',
                "highPrivacy": true,
                "orientation": "middle",
                "bodyPosition": "bottom",
                "removeCredit": false,
                "showAlertSmall": false,
                "showIcon": true,
                "iconPosition": "BottomRight",
                "cookieslist": false,
                "handleBrowserDNTRequest": false,
                "DenyAllCta": true,
                "AcceptAllCta" : true,
                "moreInfoLink": true,
                "privacyUrl": "",
                "useExternalCss": false,
                "useExternalJs": false,
                "mandatory": true,
                "mandatoryCta": true,
                "closePopup": false,
                "groupServices": false,
                "serviceDefaultState": 'wait',
            },
            params = tarteaucitron.parameters;

        // Don't show the middle bar if we are on the privacy policy or more page
        if (((tarteaucitron.parameters.readmoreLink !== undefined && window.location.href == tarteaucitron.parameters.readmoreLink) || window.location.href == tarteaucitron.parameters.privacyUrl) && tarteaucitron.parameters.orientation == "middle") {
            tarteaucitron.parameters.orientation = "bottom";
        }

        // Step -1
        if (typeof tarteaucitronCustomPremium !== 'undefined') {
            tarteaucitronCustomPremium();
        }

        // Step 0: get params
        if (params !== undefined) {

            for (var k in defaults) {
                if(!tarteaucitron.parameters.hasOwnProperty(k)) {
                    tarteaucitron.parameters[k] = defaults[k];
                }
            }
        }

        // global
        tarteaucitron.orientation = tarteaucitron.parameters.orientation;
        tarteaucitron.hashtag = tarteaucitron.parameters.hashtag;
        tarteaucitron.highPrivacy = tarteaucitron.parameters.highPrivacy;
        tarteaucitron.handleBrowserDNTRequest = tarteaucitron.parameters.handleBrowserDNTRequest;
        tarteaucitron.customCloserId = tarteaucitron.parameters.customCloserId;

        // The CSS, selected language and services are bundled below. No internal network request is needed at runtime.
        if (!tarteaucitron.parameters.useExternalCss) {
            var bundledStyle = document.createElement('style');
            bundledStyle.type = 'text/css';
            bundledStyle.id = 'tarteaucitron-bundled-css';
            bundledStyle.appendChild(document.createTextNode("#tarteaucitron [aria-pressed=\"true\"] {\n    font-weight:700;\n}\n\n.tac_visually-hidden {\n      position: absolute;\n      width: 1px;\n      height: 1px;\n      padding: 0;\n      margin: -1px;\n      overflow: hidden;\n      clip: rect(0, 0, 0, 0);\n      white-space: nowrap; /* added line */\n      border: 0;\n}\n\ndiv#tarteaucitronAlertBig:focus {outline: 0;}\n\n.tarteaucitron-modal-open{\n    overflow: hidden;\n    height: 100%;\n}\n\n#tarteaucitronContentWrapper {display:unset;}\n\n/** 14042021 **/\nspan.tarteaucitronReadmoreSeparator {\n    display: inline!important;\n}\n/******/\n\n/** 09052021 **/\n.tarteaucitronName .tacCurrentStatus, .tarteaucitronName .tarteaucitronReadmoreSeparator {\n    color: #333!important;\n    font-size: 12px!important;\n    text-transform: capitalize;\n}\n/**************/\n\n/** 27032021 **/\nbutton.tarteaucitron-toggle-group {\n    display: block;\n}\nspan.tarteaucitronH3 {\n    font-weight: 700!important;\n}\n#tarteaucitron #tarteaucitronServices_mandatory .tarteaucitronH3 {\n    font-weight: 500!important;\n    font-size: 14px;\n    margin-top: 7px;\n}\n.tarteaucitronLine {\n    border-left: 0px solid transparent!important;\n}\n/*****/\n\n/** BETTER MOBILE MODE **/\n@media screen and (max-width: 767px) {\n\n    html body #tarteaucitronRoot #tarteaucitron ul#tarteaucitronServices_mandatory .tarteaucitronDeny {\n        display: none!important;\n    }\n \n    html body #tarteaucitronRoot #tarteaucitron .tarteaucitronBorder button,\n    html body #tarteaucitronRoot #tarteaucitron .tarteaucitronAsk,\n    html body #tarteaucitronRoot #tarteaucitron .tarteaucitronName {\n        width:100%!important;\n        display: block!important;\n        margin-left: 0!important;\n        margin-right: 0!important;\n        box-sizing: border-box!important;\n        max-width: 100%!important;\n        margin-bottom: 8px!important;\n    }\n\n    html body #tarteaucitronRoot #tarteaucitron .tarteaucitronBorder ul .tarteaucitronLine {\n        padding: 16px!important;\n    }\n\n    html body #tarteaucitronRoot #tarteaucitron div#tarteaucitronMainLineOffset .tarteaucitronName {\n        display: none!important;\n    }\n\n    #tarteaucitronServices_mandatory li.tarteaucitronLine .tarteaucitronName span {\n        width: 100%!important;\n        display: inline-block;\n    }\n    li.tarteaucitronLine .tarteaucitronName span {\n        width: 80%!important;\n        display: inline-block;\n    }\n    html body #tarteaucitronRoot #tarteaucitron .tarteaucitronBorder button.tarteaucitron-toggle-group {\n        width: 10%!important;\n        position: absolute;\n        top: 20px;\n        right: 20px;\n        font-size: 0px;\n        padding: 10px 0;\n    }\n    html body #tarteaucitronRoot #tarteaucitron .tarteaucitronBorder button.tarteaucitron-toggle-group:before {\n        content: '\\0025BE';\n        font-weight:700;\n        font-size: 14px;\n    }\n    html body #tarteaucitronRoot #tarteaucitron .tarteaucitronBorder .tarteaucitronIsExpanded button.tarteaucitron-toggle-group:before {\n        content: '\\0025B4';\n    }\n}\n@media screen and (min-width: 768px) {\n\n    html body #tarteaucitronRoot #tarteaucitron .tarteaucitronBorder button.tarteaucitron-toggle-group:after {\n        content: '\\0025BE';\n        font-weight:700;\n        font-size: 14px;\n        margin-left: 15px;\n    }\n    html body #tarteaucitronRoot #tarteaucitron .tarteaucitronBorder .tarteaucitronIsExpanded button.tarteaucitron-toggle-group:after {\n        content: '\\0025B4';\n        margin-left: 15px;\n    }\n}\n/****/\n\n\n\n/***\n* Reset CSS\n*/\n#tarteaucitronRoot div, #tarteaucitronRoot span, #tarteaucitronRoot applet, #tarteaucitronRoot object, #tarteaucitronRoot iframe, #tarteaucitronRoot h1, #tarteaucitronRoot h2, #tarteaucitronRoot h3, #tarteaucitronRoot h4, #tarteaucitronRoot h5, #tarteaucitronRoot h6, #tarteaucitronRoot p, #tarteaucitronRoot blockquote, #tarteaucitronRoot pre, #tarteaucitronRoot a, #tarteaucitronRoot abbr, #tarteaucitronRoot acronym, #tarteaucitronRoot address, #tarteaucitronRoot big, #tarteaucitronRoot cite, #tarteaucitronRoot code, #tarteaucitronRoot del, #tarteaucitronRoot dfn, #tarteaucitronRoot em, #tarteaucitronRoot img, #tarteaucitronRoot ins, #tarteaucitronRoot kbd, #tarteaucitronRoot q, #tarteaucitronRoot s, #tarteaucitronRoot samp, #tarteaucitronRoot small, #tarteaucitronRoot strike, #tarteaucitronRoot strong, #tarteaucitronRoot sub, #tarteaucitronRoot sup, #tarteaucitronRoot tt, #tarteaucitronRoot var, #tarteaucitronRoot b, #tarteaucitronRoot u, #tarteaucitronRoot i, #tarteaucitronRoot center, #tarteaucitronRoot dl, #tarteaucitronRoot dt, #tarteaucitronRoot dd, #tarteaucitronRoot ol, #tarteaucitronRoot ul, #tarteaucitronRoot li, #tarteaucitronRoot fieldset, #tarteaucitronRoot form, #tarteaucitronRoot label, #tarteaucitronRoot legend, #tarteaucitronRoot table, #tarteaucitronRoot caption, #tarteaucitronRoot tbody, #tarteaucitronRoot tfoot, #tarteaucitronRoot thead, #tarteaucitronRoot tr, #tarteaucitronRoot th, #tarteaucitronRoot td, #tarteaucitronRoot article, #tarteaucitronRoot aside, #tarteaucitronRoot canvas, #tarteaucitronRoot details, #tarteaucitronRoot embed, #tarteaucitronRoot figure, #tarteaucitronRoot figcaption, #tarteaucitronRoot footer, #tarteaucitronRoot header, #tarteaucitronRoot hgroup, #tarteaucitronRoot menu, #tarteaucitronRoot nav, #tarteaucitronRoot output, #tarteaucitronRoot ruby, #tarteaucitronRoot section, #tarteaucitronRoot summary, #tarteaucitronRoot time, #tarteaucitronRoot mark, #tarteaucitronRoot audio, #tarteaucitronRoot video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n    /*background: initial;*/\n    text-align: initial;\n    text-shadow: initial;\n}\n\n/* Animation */\n#tarteaucitronRoot * {transition: border 300ms, background 300ms, opacity 200ms, box-shadow 400ms}\n\n/* HTML5 display-role reset for older browsers */\n#tarteaucitronRoot article, #tarteaucitronRoot aside, #tarteaucitronRoot details, #tarteaucitronRoot figcaption, #tarteaucitronRoot figure, #tarteaucitronRoot footer, #tarteaucitronRoot header, #tarteaucitronRoot hgroup, #tarteaucitronRoot menu, #tarteaucitronRoot nav, #tarteaucitronRoot section {\n    display: block;\n}\n#tarteaucitronRoot ol, #tarteaucitronRoot ul {\n    list-style: none;\n}\n#tarteaucitronRoot blockquote, #tarteaucitronRoot q {\n    quotes: none;\n}\n#tarteaucitronRoot blockquote:before, #tarteaucitronRoot blockquote:after, #tarteaucitronRoot q:before, #tarteaucitronRoot q:after {\n    content: '';\n    content: none;\n}\n#tarteaucitronRoot table {\n    border-collapse: collapse;\n    border-spacing: 0;\n}\n\n#tarteaucitronRoot a:focus-visible, #tarteaucitronRoot button:focus-visible {\n    outline: 3px dashed #3d86d8;\n}\n\n/***\n * Better scroll management\n */\ndiv#tarteaucitronMainLineOffset {\n    margin-top: 0!important;\n}\n\ndiv#tarteaucitronServices {\n    margin-top: 21px!important;\n}\n\n#tarteaucitronServices::-webkit-scrollbar {\n    width: 5px;\n}\n\n#tarteaucitronServices::-webkit-scrollbar-track {\n    -webkit-box-shadow: inset 0 0 0 rgba(0,0,0,0);\n}\n\n#tarteaucitronServices::-webkit-scrollbar-thumb {\n  background-color: #ddd;\n  outline: 0px solid slategrey;\n}\n\ndiv#tarteaucitronServices {\n    box-shadow: 0 40px 60px #545454;\n}\n\n/***\n * Responsive layout for the control panel\n */\n@media screen and (max-width:479px) {\n    #tarteaucitron .tarteaucitronLine .tarteaucitronName {\n        width: 90% !important;\n    }\n\n    #tarteaucitron .tarteaucitronLine .tarteaucitronAsk {\n        float: left !important;\n        margin: 10px 15px 5px;\n    }\n}\n\n@media screen and (max-width:767px) {\n    #tarteaucitronAlertSmall #tarteaucitronCookiesListContainer, #tarteaucitron {\n        background: #fff;\n        border: 0 !important;\n        bottom: 0 !important;\n        height: 100% !important;\n        left: 0 !important;\n        margin: 0 !important;\n        max-height: 100% !important;\n        max-width: 100% !important;\n        top: 0 !important;\n        width: 100% !important;\n    }\n\n    #tarteaucitron .tarteaucitronBorder {\n        border: 0 !important;\n    }\n\n    #tarteaucitronAlertSmall #tarteaucitronCookiesListContainer #tarteaucitronCookiesList {\n        border: 0 !important;\n    }\n\n    #tarteaucitron #tarteaucitronServices .tarteaucitronTitle {\n        text-align: left !important;\n    }\n\n    .tarteaucitronName .tarteaucitronH2 {\n        max-width: 80%;\n    }\n\n    #tarteaucitron #tarteaucitronServices .tarteaucitronLine .tarteaucitronAsk {\n        text-align: center !important;\n    }\n\n        #tarteaucitron #tarteaucitronServices .tarteaucitronLine .tarteaucitronAsk button {\n            margin-bottom: 5px;\n        }\n}\n\n@media screen and (min-width:768px) and (max-width:991px) {\n    #tarteaucitron {\n        border: 0 !important;\n        left: 0 !important;\n        margin: 0 5% !important;\n        max-height: 80% !important;\n        width: 90% !important;\n    }\n}\n\n/***\n * Common value\n */\n#tarteaucitronRoot div#tarteaucitron {\n    left: 0;\n    right: 0;\n    margin: auto;\n}\n\n#tarteaucitronRoot button#tarteaucitronBack {\n    background: #eee;\n}\n\n#tarteaucitron .clear {\n    clear: both;\n}\n\n#tarteaucitron a {\n    color: rgb(66, 66, 66);\n    font-size: 11px;\n    font-weight: 700;\n    text-decoration: none;\n}\n\n#tarteaucitronRoot button {\n    background: transparent;\n    border: 0;\n}\n\n#tarteaucitronAlertBig strong, #tarteaucitronAlertSmall strong,\n#tarteaucitronAlertBig a, #tarteaucitronAlertSmall a {\n    color: #fff;\n}\n\n#tarteaucitron strong {\n    font-size: 22px;\n    font-weight: 500;\n}\n\n#tarteaucitron ul {\n    padding: 0;\n}\n\n#tarteaucitron .tarteaucitronH1, #tarteaucitron .tarteaucitronH2, #tarteaucitron .tarteaucitronH3, #tarteaucitron .tarteaucitronH4, #tarteaucitron .tarteaucitronH5, #tarteaucitron .tarteaucitronH6 {\n  display: block;\n}\n\n.cookie-list {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n}\n/***\n * Root div added just before </body>\n */\n#tarteaucitronRoot {\n    left: 0;\n    position: absolute;\n    right: 0;\n    top: 0;\n    width: 100%;\n}\n\n#tarteaucitronRoot * {\n    box-sizing: initial;\n    color: #333;\n    font-family: sans-serif !important;\n    font-size: 14px;\n    line-height: normal;\n    vertical-align: initial;\n}\n\n#tarteaucitronRoot .tarteaucitronH1 {\n    font-size: 1.5em;\n    text-align: center;\n    color: #fff;\n    margin: 15px 0 28px;\n}\n\n#tarteaucitronRoot .tarteaucitronH2 {\n    display: inline-block;\n    margin: 12px 0 0 10px;\n    color: #fff;\n}\n\n#tarteaucitronCookiesNumberBis.tarteaucitronH2 {\n    margin-left: 0;\n}\n\n/***\n * Control panel\n */\n#tarteaucitronBack {\n    background: #fff;\n    display: none;\n    height: 100%;\n    left: 0;\n    opacity: 0.7;\n    position: fixed;\n    top: 0;\n    width: 100%;\n    z-index: 2147483646;\n}\n\n#tarteaucitron {\n    display: none;\n    max-height: 80%;\n    left: 50%;\n    margin: 0 auto 0 -430px;\n    padding: 0;\n    position: fixed;\n    top: 6%;\n    width: 860px;\n    z-index: 2147483647;\n}\n\n#tarteaucitron .tarteaucitronBorder {\n    background: #fff;\n    border: 2px solid #333;\n    border-top: 0;\n    height: auto;\n    overflow: auto;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronCookiesListContainer #tarteaucitronClosePanelCookie,\n#tarteaucitron #tarteaucitronClosePanel {\n    background: #333333;\n    color: #fff;\n    cursor: pointer;\n    font-size: 12px;\n    font-weight: 700;\n    text-decoration: none;\n    padding: 4px 0;\n    position: absolute;\n    right: 0;\n    text-align: center;\n    width: 70px;\n}\n\n#tarteaucitron #tarteaucitronDisclaimer {\n    color: #555;\n    font-size: 12px;\n    margin: 15px auto 0;\n    width: 80%;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronCookiesListContainer #tarteaucitronCookiesList .tarteaucitronHidden,\n#tarteaucitron #tarteaucitronServices .tarteaucitronHidden {\n    background: rgba(51, 51, 51, 0.07);\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronHidden {\n    display: none;\n    position: relative;\n}\n\n#tarteaucitronCookiesList .tarteaucitronH3.tarteaucitronTitle {\n    width: 100%;\n    box-sizing: border-box;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronCookiesListContainer #tarteaucitronCookiesList .tarteaucitronTitle,\n#tarteaucitron #tarteaucitronServices .tarteaucitronTitle button,\n#tarteaucitron #tarteaucitronInfo,\n#tarteaucitron #tarteaucitronServices .tarteaucitronDetails {\n    color: #fff;\n    display: inline-block;\n    font-size: 14px;\n    font-weight: 700;\n    margin: 20px 0px 0px;\n    padding: 5px 20px;\n    text-align: left;\n    width: auto;\n    background: #333;\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronMainLine .tarteaucitronName a,\n#tarteaucitron #tarteaucitronServices .tarteaucitronTitle a {\n    color: #fff;\n    font-weight: 500;\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronMainLine .tarteaucitronName a:hover,\n#tarteaucitron #tarteaucitronServices .tarteaucitronTitle a:hover {\n    text-decoration: none !important;\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronMainLine .tarteaucitronName a {\n    font-size: 22px;\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronTitle a {\n    font-size: 14px;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronCookiesListContainer #tarteaucitronCookiesList .tarteaucitronTitle {\n    padding: 5px 10px;\n    margin: 0;\n}\n\n#tarteaucitron #tarteaucitronInfo,\n#tarteaucitron #tarteaucitronServices .tarteaucitronDetails {\n    color: #fff;\n    display: none;\n    font-size: 12px;\n    font-weight: 500;\n    margin-top: 0;\n    max-width: 270px;\n    padding: 20px;\n    position: absolute;\n    z-index: 2147483647;\n}\n\n#tarteaucitron #tarteaucitronInfo a {\n    color: #fff;\n    text-decoration: underline;\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronLine:hover {\n    background: rgba(51, 51, 51, 0.2);\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronLine {\n    background: rgba(51, 51, 51, 0.1);\n    border-left: 5px solid transparent;\n    margin: 0;\n    overflow: hidden;\n    padding: 15px 5px;\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronLine.tarteaucitronIsAllowed {\n    border-color: #1B870B;\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronLine.tarteaucitronIsDenied {\n    border-color: #9C1A1A;\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronMainLine {\n    background: #333;\n    border: 3px solid #333;\n    border-left: 9px solid #333;\n    border-top: 5px solid #333;\n    margin-bottom: 0;\n    margin-top: 21px;\n    position: relative;\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronMainLine:hover {\n    background: #333;\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronMainLine .tarteaucitronName {\n    margin-left: 15px;\n    margin-top: 2px;\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronMainLine .tarteaucitronName button {\n    color: #fff;\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronMainLine .tarteaucitronAsk {\n    margin-top: 0px !important;\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronLine .tarteaucitronName {\n    display: inline-block;\n    float: left;\n    margin-left: 10px;\n    text-align: left;\n    width: 50%;\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronLine .tarteaucitronName a:hover {\n    text-decoration: underline;\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronLine .tarteaucitronAsk {\n    display: inline-block;\n    float: right;\n    margin: 7px 15px 0;\n    text-align: right;\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronLine .tarteaucitronAsk .tarteaucitronAllow,\n#tarteaucitron #tarteaucitronServices .tarteaucitronLine .tarteaucitronAsk .tarteaucitronDeny,\n.tac_activate .tarteaucitronAllow {\n    background: #555;\n    border-radius: 4px;\n    color: #fff;\n    cursor: pointer;\n    display: inline-block;\n    padding: 6px 10px;\n    text-align: center;\n    text-decoration: none;\n    width: auto;\n    border: 0;\n}\n\n#tarteaucitron #tarteaucitronServices #tarteaucitronAllAllowed.tarteaucitronIsSelected {\n    background-color: #1B870B;\n    opacity: 1;\n}\n#tarteaucitron #tarteaucitronServices #tarteaucitronAllDenied.tarteaucitronIsSelected,\n#tarteaucitron #tarteaucitronServices #tarteaucitronAllDenied2.tarteaucitronIsSelected {\n    background-color: #9C1A1A;\n    opacity: 1;\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronLine.tarteaucitronIsAllowed .tarteaucitronAllow,\n#tarteaucitron #tarteaucitronServices #tarteaucitronServices_mandatory .tarteaucitronLine button.tarteaucitronAllow {\n    background-color: #1B870B;\n}\n#tarteaucitron #tarteaucitronServices .tarteaucitronLine.tarteaucitronIsDenied .tarteaucitronDeny {\n    background-color: #9C1A1A;\n}\n\n#tarteaucitron #tarteaucitronServices #tarteaucitronServices_mandatory .tarteaucitronLine button.tarteaucitronAllow{\n    opacity: 0.4;\n}\n\n#tarteaucitron #tarteaucitronServices .tarteaucitronLine .tarteaucitronName .tarteaucitronListCookies {\n    color: #333;\n    font-size: 12px;\n}\n\n#tarteaucitron .tarteaucitronH3 {\n    font-size: 18px;\n}\n\n#tarteaucitron #tarteaucitronMainLineOffset .tarteaucitronName {\n    width: auto!important;\n    margin-left: 0!important;\n    font-size: 14px;\n}\nspan#tarteaucitronDisclaimerAlert {\n    padding: 0 10px;\n    display: inline-block;\n}\n#tarteaucitron .tarteaucitronBorder, #tarteaucitronAlertSmall #tarteaucitronCookiesListContainer #tarteaucitronCookiesList .tarteaucitronCookiesListMain, #tarteaucitronAlertSmall #tarteaucitronCookiesListContainer #tarteaucitronCookiesList, #tarteaucitronAlertSmall #tarteaucitronCookiesListContainer #tarteaucitronCookiesList .tarteaucitronHidden, #tarteaucitron #tarteaucitronServices .tarteaucitronMainLine {\n    border-color: #333!important;\n}\n\n/***\n * Big alert\n */\n.tarteaucitronAlertBigTop {\n    top: 0;\n}\n\n.tarteaucitronAlertBigBottom {\n    bottom: 0;\n}\n\n#tarteaucitronRoot #tarteaucitronAlertBig {\n    background: #333;\n    color: #fff;\n    display: none;\n    font-size: 15px !important;\n    left: 0;\n    position: fixed;\n    box-sizing: content-box;\n    z-index: 2147483645;\n    text-align: center;\n    padding: 10px 0 10px 0;\n    margin: auto;\n    width: 100%;\n}\n\n#tarteaucitronAlertBig #tarteaucitronPrivacyUrl,\n#tarteaucitronAlertBig #tarteaucitronPrivacyUrlDialog,\n#tarteaucitronAlertBig #tarteaucitronDisclaimerAlert,\n#tarteaucitronAlertBig #tarteaucitronDisclaimerAlert strong {\n    font: 15px verdana;\n    color: #fff;\n}\n\n#tarteaucitronAlertBig #tarteaucitronDisclaimerAlert strong {\n    font-weight: 700;\n}\n\n#tarteaucitronAlertBig #tarteaucitronPrivacyUrl,\n#tarteaucitronAlertBig #tarteaucitronPrivacyUrlDialog {\n    cursor: pointer;\n}\n\n#tarteaucitronAlertBig #tarteaucitronCloseAlert,\n#tarteaucitronAlertBig #tarteaucitronPersonalize,\n#tarteaucitronAlertBig #tarteaucitronPersonalize2,\n.tarteaucitronCTAButton,\n#tarteaucitron #tarteaucitronPrivacyUrl,\n#tarteaucitron #tarteaucitronPrivacyUrlDialog,\n#tarteaucitronRoot .tarteaucitronDeny,\n#tarteaucitronRoot .tarteaucitronAllow {\n    background: #008300;\n    color: #fff;\n    cursor: pointer;\n    display: inline-block;\n    font-size: 16px!important;\n    line-height: 1.2;\n    padding: 5px 10px;\n    text-decoration: none;\n    margin-left: 7px;\n}\n\n#tarteaucitronRoot .tarteaucitronDeny {\n    background: #9C1A1A;\n}\n\n#tarteaucitronAlertBig #tarteaucitronCloseAlert, #tarteaucitron #tarteaucitronPrivacyUrl, #tarteaucitron #tarteaucitronPrivacyUrlDialog {\n    background: #fff;\n    color: #333;\n    font-size: 13px;\n    margin-bottom: 3px;\n    margin-left: 7px;\n    padding: 5px 10px;\n}\n\n#tarteaucitronPercentage {\n    background: #0A0!important;\n    box-shadow: 0 0 2px #fff, 0 1px 2px #555;\n    height: 5px;\n    left: 0;\n    position: fixed;\n    width: 0;\n    z-index: 2147483644;\n}\n\n/***\n * Icon\n */\n.tarteaucitronIconBottomRight {\n    bottom: 0;\n    right: 0;\n}\n.tarteaucitronIconBottomLeft {\n    bottom: 0;\n    left: 0;\n}\n.tarteaucitronIconTopRight {\n    top: 0;\n    right: 0;\n}\n.tarteaucitronIconTopLeft {\n    top: 0;\n    left: 0;\n}\n\n.tarteaucitronIconTopLeft #tarteaucitronManager {\n    border-radius: 2px 7px 7px 2px;\n}\n\n.tarteaucitronIconTopRight #tarteaucitronManager {\n    border-radius: 7px 2px 2px 7px;\n}\n\n.tarteaucitronIconBottomLeft #tarteaucitronManager {\n    border-radius: 7px 7px 2px 2px;\n}\n\n.tarteaucitronIconBottomRight #tarteaucitronManager {\n    border-radius: 7px 7px 2px 2px;\n}\n\n#tarteaucitronIcon {\n    background: transparent;\n    position: fixed;\n    display: none;\n    width: auto;\n    z-index: 2147483646;\n}\n#tarteaucitronIcon #tarteaucitronManager {\n    color: transparent;\n    cursor: pointer;\n    display: inline-block;\n    font-size: 11px !important;\n    padding: 8px 10px 8px;\n    border: none;\n}\n#tarteaucitronIcon #tarteaucitronManager img {\n    width: 50px;\n    height: 50px;\n}\n\n#tarteaucitronRoot .tarteaucitronCross::before {\n    content: '\\2717';\n    display: inline-block;\n    color: white;\n}\n\n#tarteaucitronRoot .tarteaucitronCheck::before {\n    content: '\\2713';\n    display: inline-block;\n    color: white;\n}\n\n#tarteaucitronRoot .tarteaucitronPlus::before {\n    content: '\\271b';\n    display: inline-block;\n    color: white;\n}\n\n\n/***\n * Small alert\n */\n\n.tarteaucitronAlertSmallTop,.tarteaucitronAlertSmallBottom {\n    bottom: 0;\n}\n\n#tarteaucitronAlertSmall {\n    background: #333;\n    display: none;\n    padding: 0;\n    position: fixed;\n    right: 0;\n    text-align: center;\n    width: auto;\n    z-index: 2147483646;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronManager {\n    color: #fff;\n    cursor: pointer;\n    display: inline-block;\n    font-size: 11px !important;\n    padding: 8px 10px 8px;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronManager:hover {\n    background: rgba(255, 255, 255, 0.05);\n}\n\n/* Sunberry consent layout: compact card on desktop, discreet bottom bar on mobile. */\nbody #tarteaucitronRoot #tarteaucitronAlertBig {\n    background: #ffffff !important;\n    border: 1px solid #dde6da !important;\n    border-radius: 14px !important;\n    bottom: 24px !important;\n    box-shadow: 0 12px 32px rgba(32, 56, 47, 0.18) !important;\n    box-sizing: border-box !important;\n    color: #20382f !important;\n    left: 24px !important;\n    margin: 0 !important;\n    max-width: calc(100vw - 48px) !important;\n    padding: 22px !important;\n    right: auto !important;\n    text-align: left !important;\n    transform: none !important;\n    width: 380px !important;\n}\n\n#tarteaucitronAlertBig #tarteaucitronDisclaimerAlert,\n#tarteaucitronAlertBig #tarteaucitronDisclaimerAlert strong,\n#tarteaucitronAlertBig #tarteaucitronPrivacyUrl,\n#tarteaucitronAlertBig #tarteaucitronPrivacyUrlDialog {\n    color: #20382f !important;\n    font-family: inherit !important;\n    font-size: 14px !important;\n    line-height: 1.45 !important;\n}\n\n#tarteaucitronAlertBig #tarteaucitronPrivacyUrl,\n#tarteaucitronAlertBig #tarteaucitronPrivacyUrlDialog {\n    text-decoration: underline !important;\n}\n\n#tarteaucitronRoot #tarteaucitronAlertBig .tarteaucitronCTAButton,\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronPersonalize,\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronPersonalize2,\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronAllAllowed,\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronAllDenied2 {\n    border-radius: 4px !important;\n    box-sizing: border-box !important;\n    font-size: 13px !important;\n    font-weight: 600 !important;\n    line-height: 1.2 !important;\n    margin: 12px 6px 0 0 !important;\n    padding: 10px 12px !important;\n}\n\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronAllAllowed {\n    background: #3d7a31 !important;\n    border: 1px solid #3d7a31 !important;\n    color: #ffffff !important;\n}\n\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronAllDenied2 {\n    background: #ffffff !important;\n    border: 1px solid #54705a !important;\n    color: #315d34 !important;\n}\n\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronPersonalize,\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronPersonalize2 {\n    background: #edf4e9 !important;\n    border: 1px solid #edf4e9 !important;\n    color: #315d34 !important;\n}\n\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronAllAllowed:hover {\n    background: #315d27 !important;\n    border-color: #315d27 !important;\n}\n\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronAllDenied2:hover,\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronPersonalize:hover,\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronPersonalize2:hover {\n    background: #e2ecdc !important;\n}\n\n#tarteaucitronIcon #tarteaucitronManager {\n    background: #20382f !important;\n    border-radius: 50% !important;\n    box-shadow: 0 4px 12px rgba(32, 56, 47, 0.2) !important;\n    padding: 8px !important;\n}\n\n#tarteaucitronIcon #tarteaucitronManager img {\n    height: 34px !important;\n    width: 34px !important;\n}\n\n@media screen and (max-width: 767px) {\n    body #tarteaucitronRoot #tarteaucitronAlertBig {\n        border: 0 !important;\n        border-radius: 0 !important;\n        bottom: 0 !important;\n        box-shadow: 0 -4px 16px rgba(32, 56, 47, 0.12) !important;\n        left: 0 !important;\n        max-width: none !important;\n        padding: 12px 16px !important;\n        right: 0 !important;\n        width: 100% !important;\n    }\n\n    #tarteaucitronAlertBig #tarteaucitronDisclaimerAlert,\n    #tarteaucitronAlertBig #tarteaucitronDisclaimerAlert strong,\n    #tarteaucitronAlertBig #tarteaucitronPrivacyUrl,\n    #tarteaucitronAlertBig #tarteaucitronPrivacyUrlDialog {\n        font-size: 12px !important;\n    }\n\n    #tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronAllAllowed,\n    #tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronAllDenied2 {\n        font-size: 12px !important;\n        margin-top: 9px !important;\n        padding: 8px 10px !important;\n    }\n\n    #tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronPersonalize,\n    #tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronPersonalize2 {\n        background: transparent !important;\n        border: 0 !important;\n        display: block !important;\n        font-size: 12px !important;\n        margin: 8px 0 0 !important;\n        padding: 0 !important;\n        text-align: left !important;\n        text-decoration: underline !important;\n    }\n\n    #tarteaucitronIcon {\n        bottom: 8px !important;\n        right: 8px !important;\n    }\n}\n\n#tarteaucitronAlertSmall #tarteaucitronManager #tarteaucitronDot {\n    background-color: gray;\n    border-radius: 5px;\n    display: block;\n    height: 8px;\n    margin-bottom: 1px;\n    margin-top: 5px;\n    overflow: hidden;\n    width: 100%;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronManager #tarteaucitronDot #tarteaucitronDotGreen,\n#tarteaucitronAlertSmall #tarteaucitronManager #tarteaucitronDot #tarteaucitronDotYellow,\n#tarteaucitronAlertSmall #tarteaucitronManager #tarteaucitronDot #tarteaucitronDotRed {\n    display: block;\n    float: left;\n    height: 100%;\n    width: 0%;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronManager #tarteaucitronDot #tarteaucitronDotGreen {\n    background-color: #1B870B;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronManager #tarteaucitronDot #tarteaucitronDotYellow {\n    background-color: #FBDA26;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronManager #tarteaucitronDot #tarteaucitronDotRed {\n    background-color: #9C1A1A;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronCookiesNumber {\n    background: rgba(255, 255, 255, 0.2);\n    color: #fff;\n    cursor: pointer;\n    display: inline-block;\n    font-size: 30px;\n    padding: 0px 10px;\n    vertical-align: top;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronCookiesNumber:hover {\n    background: rgba(255, 255, 255, 0.3);\n}\n\n#tarteaucitronAlertSmall #tarteaucitronCookiesListContainer {\n    display: none;\n    max-height: 70%;\n    max-width: 500px;\n    position: fixed;\n    right: 0;\n    width: 100%;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronCookiesListContainer #tarteaucitronCookiesList {\n    background: #fff;\n    border: 2px solid #333;\n    color: #333;\n    font-size: 11px;\n    height: auto;\n    overflow: auto;\n    text-align: left;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronCookiesListContainer #tarteaucitronCookiesList strong {\n    color: #333;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronCookiesListContainer #tarteaucitronCookiesTitle {\n    background: #333;\n    margin-top: 21px;\n    padding: 13px 0 9px 13px;\n    text-align: left;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronCookiesListContainer #tarteaucitronCookiesTitle strong {\n    color: #fff;\n    font-size: 16px;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronCookiesListContainer #tarteaucitronCookiesList .tarteaucitronCookiesListMain {\n    background: rgba(51, 51, 51, 0.1);\n    padding: 7px 5px 10px;\n    word-wrap: break-word;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronCookiesListContainer #tarteaucitronCookiesList .tarteaucitronCookiesListMain:hover {\n    background: rgba(51, 51, 51, 0.2);\n}\n\n#tarteaucitronAlertSmall #tarteaucitronCookiesListContainer #tarteaucitronCookiesList .tarteaucitronCookiesListMain a {\n    color: #333;\n    text-decoration: none;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronCookiesListContainer #tarteaucitronCookiesList .tarteaucitronCookiesListMain .tarteaucitronCookiesListLeft {\n    display: inline-block;\n    width: 50%;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronCookiesListContainer #tarteaucitronCookiesList .tarteaucitronCookiesListMain .tarteaucitronCookiesListLeft a strong {\n    color: darkred;\n}\n\n#tarteaucitronAlertSmall #tarteaucitronCookiesListContainer #tarteaucitronCookiesList .tarteaucitronCookiesListMain .tarteaucitronCookiesListRight {\n    color: #333;\n    display: inline-block;\n    font-size: 11px;\n    margin-left: 10%;\n    vertical-align: top;\n    width: 30%;\n}\n\n/***\n * Fallback activate link\n */\n.tac_activate {\n    background: #333;\n    color: #fff;\n    display: table;\n    font-size: 12px;\n    height: 100%;\n    line-height: initial;\n    margin: auto;\n    text-align: center;\n    width: 100%;\n}\n\n.tac_float {\n    display: table-cell;\n    text-align: center;\n    vertical-align: middle;\n}\n\n.tac_activate .tac_float strong {\n    color: #fff;\n}\n\n.tac_activate .tac_float .tarteaucitronAllow {\n    background-color: #1B870B;\n    display: inline-block;\n}\n\n/***\n * CSS for services\n */\nins.ferank-publicite, ins.adsbygoogle {\n    text-decoration: none;\n}\n\ndiv.amazon_product {\n    height:240px;\n    width:120px;\n}\n\n.tarteaucitronIsAllowed .tarteaucitronDeny {\n    opacity: 0.4!important;\n}.tarteaucitronIsDenied .tarteaucitronAllow {\n    opacity: 0.4!important;\n}.tarteaucitronIsAllowed .tarteaucitronAllow {\n    opacity: 1!important;\n}.tarteaucitronIsDenied .tarteaucitronDeny {\n    opacity: 1!important;\n}\n.tarteaucitronLine .tarteaucitronAllow, .tarteaucitronLine .tarteaucitronDeny {\n    opacity: 0.4;\n}\n#tarteaucitronServices_mandatory button.tarteaucitronAllow {\n    opacity: 1;\n}\n\ndiv#tarteaucitronInfo {\n    display: block!important;\n    position: relative !important;\n    text-align: center!important;\n    max-width: 80%!important;\n    padding: 15px 0!important;\n    margin: -10px auto 40px!important;\n    font-size: 1em!important;\n    border-bottom: 1px solid;\n    border-top: 1px solid;\n    border-color: #555;\n}\n\na.tarteaucitronSelfLink {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: -30px;\n    text-align: center!important;\n    display: block;\n    height:30px;\n}\n\n.tarteaucitronMainLine .tarteaucitronH2 {\n    font-size: 1.2em!important;\n    margin-top: 4px!important;\n}\n\nspan.tarteaucitronTitle.tarteaucitronH3 {\n    margin-top: 12px!important;\n}\n\n#tarteaucitronCloseCross {\n    position:absolute;\n    color: #FFFF;\n    font-size:1.8rem;\n    cursor: pointer;\n    top: 10px;\n    right: 26px\n}\n\n.tarteaucitron-spacer-20 {\n    height: 20px;\n    display: block;\n}\n\n.tarteaucitron-display-block {\n    display: block;\n}\n\n.tarteaucitron-display-none {\n    display: none;\n}\n\n/* Final Sunberry overrides: deliberately last to supersede upstream popup rules. */\nbody #tarteaucitronRoot #tarteaucitronAlertBig {\n    background: #ffffff !important;\n    border: 1px solid #dde6da !important;\n    border-radius: 14px !important;\n    bottom: 24px !important;\n    box-shadow: 0 12px 32px rgba(32, 56, 47, 0.18) !important;\n    box-sizing: border-box !important;\n    color: #20382f !important;\n    left: 24px !important;\n    margin: 0 !important;\n    max-width: calc(100vw - 48px) !important;\n    padding: 22px !important;\n    right: auto !important;\n    text-align: left !important;\n    transform: none !important;\n    width: 380px !important;\n}\n\n#tarteaucitronAlertBig #tarteaucitronDisclaimerAlert,\n#tarteaucitronAlertBig #tarteaucitronDisclaimerAlert strong,\n#tarteaucitronAlertBig #tarteaucitronPrivacyUrl,\n#tarteaucitronAlertBig #tarteaucitronPrivacyUrlDialog {\n    color: #20382f !important;\n    font-family: inherit !important;\n    font-size: 14px !important;\n    line-height: 1.45 !important;\n}\n\n#tarteaucitronAlertBig #tarteaucitronPrivacyUrl,\n#tarteaucitronAlertBig #tarteaucitronPrivacyUrlDialog { text-decoration: underline !important; }\n\n#tarteaucitronRoot #tarteaucitronAlertBig .tarteaucitronCTAButton,\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronPersonalize,\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronPersonalize2,\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronAllAllowed,\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronAllDenied2 {\n    border-radius: 4px !important;\n    box-sizing: border-box !important;\n    font-size: 13px !important;\n    font-weight: 600 !important;\n    line-height: 1.2 !important;\n    margin: 12px 6px 0 0 !important;\n    padding: 10px 12px !important;\n}\n\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronAllAllowed {\n    background: #3d7a31 !important;\n    border: 1px solid #3d7a31 !important;\n    color: #ffffff !important;\n}\n\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronAllDenied2 {\n    background: #ffffff !important;\n    border: 1px solid #54705a !important;\n    color: #315d34 !important;\n}\n\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronPersonalize,\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronPersonalize2 {\n    background: #edf4e9 !important;\n    border: 1px solid #edf4e9 !important;\n    color: #315d34 !important;\n}\n\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronAllAllowed:hover { background: #315d27 !important; border-color: #315d27 !important; }\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronAllDenied2:hover,\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronPersonalize:hover,\n#tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronPersonalize2:hover { background: #e2ecdc !important; }\n\n#tarteaucitronIcon #tarteaucitronManager {\n    background: #20382f !important;\n    border-radius: 50% !important;\n    box-shadow: 0 4px 12px rgba(32, 56, 47, 0.2) !important;\n    padding: 8px !important;\n}\n#tarteaucitronIcon #tarteaucitronManager img { height: 34px !important; width: 34px !important; }\n\n@media screen and (max-width: 767px) {\n    body #tarteaucitronRoot #tarteaucitronAlertBig {\n        border: 0 !important;\n        border-radius: 0 !important;\n        bottom: 0 !important;\n        box-shadow: 0 -4px 16px rgba(32, 56, 47, 0.12) !important;\n        left: 0 !important;\n        max-width: none !important;\n        padding: 12px 16px !important;\n        right: 0 !important;\n        width: 100% !important;\n    }\n    #tarteaucitronAlertBig #tarteaucitronDisclaimerAlert,\n    #tarteaucitronAlertBig #tarteaucitronDisclaimerAlert strong,\n    #tarteaucitronAlertBig #tarteaucitronPrivacyUrl,\n    #tarteaucitronAlertBig #tarteaucitronPrivacyUrlDialog { font-size: 12px !important; }\n    #tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronAllAllowed,\n    #tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronAllDenied2 { font-size: 12px !important; margin-top: 9px !important; padding: 8px 10px !important; }\n    #tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronPersonalize,\n    #tarteaucitronRoot #tarteaucitronAlertBig #tarteaucitronPersonalize2 {\n        background: transparent !important;\n        border: 0 !important;\n        display: block !important;\n        font-size: 12px !important;\n        margin: 8px 0 0 !important;\n        padding: 0 !important;\n        text-align: left !important;\n        text-decoration: underline !important;\n    }\n    #tarteaucitronIcon { bottom: 8px !important; right: 8px !important; }\n}\n"));
            document.getElementsByTagName('head')[0].appendChild(bundledStyle);
        }
        tarteaucitron.lang = tarteaucitron.languages[language] || tarteaucitron.languages.en;
        if (tarteaucitronCustomText !== '') {
            tarteaucitron.lang = tarteaucitron.AddOrUpdate(tarteaucitron.lang, tarteaucitronCustomText);
        }

                // css for the middle bar TODO: add it on the css file
                if (tarteaucitron.orientation === 'middle') {
                    var customThemeMiddle = document.createElement('style'),
                        cssRuleMiddle = 'div#tarteaucitronRoot.tarteaucitronBeforeVisible:before {content: \'\';position: fixed;width: 100%;height: 100%;background: white;top: 0;left: 0;z-index: 999;opacity: 0.5;}div#tarteaucitronAlertBig:before {content: \'' + tarteaucitron.lang.middleBarHead + '\';font-size: 35px;}body #tarteaucitronRoot div#tarteaucitronAlertBig {width: 60%;min-width: 285px;height: auto;margin: auto;left: 50%;top: 50%;transform: translate(-50%, -50%);box-shadow: 0 0 9000px #000;border-radius: 20px;padding: 35px 25px;}span#tarteaucitronDisclaimerAlert {padding: 0 30px;}#tarteaucitronRoot span#tarteaucitronDisclaimerAlert {margin: 10px 0 30px;display: block;text-align: center;font-size: 21px;}@media screen and (max-width: 900px) {div#tarteaucitronAlertBig button {margin: 0 auto 10px!important;display: block!important;}}';

                    customThemeMiddle.type = 'text/css';
                    if (customThemeMiddle.styleSheet) {
                        customThemeMiddle.styleSheet.cssText = cssRuleMiddle;
                    } else {
                        customThemeMiddle.appendChild(document.createTextNode(cssRuleMiddle));
                    }
                    document.getElementsByTagName('head')[0].appendChild(customThemeMiddle);
                }

                // css for the popup bar TODO: add it on the css file
                if (tarteaucitron.orientation === 'popup') {
                    var customThemePopup = document.createElement('style'),
                        cssRulePopup = 'div#tarteaucitronAlertBig:before {content: \'' + tarteaucitron.lang.middleBarHead + '\';font-size: 22px;}body #tarteaucitronRoot div#tarteaucitronAlertBig {bottom: 0;top: auto!important;left: 8px!important;right: auto!important;transform: initial!important;border-radius: 5px 5px 0 0!important;max-width: 250px!important;width: Calc(100% - 16px)!important;min-width: 0!important;padding: 25px 0;}span#tarteaucitronDisclaimerAlert {padding: 0 30px;font-size: 15px!important;}#tarteaucitronRoot span#tarteaucitronDisclaimerAlert {margin: 10px 0 30px;display: block;text-align: center;font-size: 21px;}div#tarteaucitronAlertBig button {margin: 0 auto 10px!important;display: block!important;width: Calc(100% - 60px);box-sizing: border-box;}';

                    customThemePopup.type = 'text/css';
                    if (customThemePopup.styleSheet) {
                        customThemePopup.styleSheet.cssText = cssRulePopup;
                    } else {
                        customThemePopup.appendChild(document.createTextNode(cssRulePopup));
                    }
                    document.getElementsByTagName('head')[0].appendChild(customThemePopup);
                }

                var body = document.body,
                    div = document.createElement('div'),
                    html = '',
                    index,
                    orientation = 'Top',
                    cat = ['ads', 'analytic', 'api', 'comment', 'social', 'support', 'video', 'other'],
                    i;

                cat = cat.sort(function (a, b) {
                    if (tarteaucitron.lang[a].title > tarteaucitron.lang[b].title) { return 1; }
                    if (tarteaucitron.lang[a].title < tarteaucitron.lang[b].title) { return -1; }
                    return 0;
                });

                // Step 3: prepare the html
                html += '<div role="heading" aria-level="1" id="tac_title" class="tac_visually-hidden">' + tarteaucitron.lang.title + '</div>';
                html += '<div id="tarteaucitronPremium"></div>';
                if (tarteaucitron.reloadThePage) {
                    html += '<button type="button" id="tarteaucitronBack" aria-label="' + tarteaucitron.lang.close + ' (' + tarteaucitron.lang.reload + ')" title="' + tarteaucitron.lang.close + ' (' + tarteaucitron.lang.reload + ')"></button>';
                } else {
                    html += '<button type="button" id="tarteaucitronBack" aria-label="' + tarteaucitron.lang.close + '" title="' + tarteaucitron.lang.close + '"></button>';
                }
                html += '<div id="tarteaucitron" role="dialog" aria-modal="true" aria-labelledby="dialogTitle" tabindex="-1">';
                if (tarteaucitron.reloadThePage) {
                    html += '   <button type="button" id="tarteaucitronClosePanel" aria-label="' + tarteaucitron.lang.close + ' (' + tarteaucitron.lang.reload + ')" title="' + tarteaucitron.lang.close + ' (' + tarteaucitron.lang.reload + ')">';
                } else {
                    html += '   <button type="button" id="tarteaucitronClosePanel">';
                }
                html += '       ' + tarteaucitron.lang.close;
                html += '   </button>';
                html += '   <div id="tarteaucitronServices">';
                html += '      <div class="tarteaucitronLine tarteaucitronMainLine" id="tarteaucitronMainLineOffset">';
                html += '         <span class="tarteaucitronH1" role="heading" aria-level="1" id="dialogTitle">'+ tarteaucitron.lang.title + '</span>';
                html += '         <div id="tarteaucitronInfo">';
                html += '         ' + tarteaucitron.lang.disclaimer;
                if (tarteaucitron.parameters.privacyUrl !== "") {
                    html += '   <br/><br/>';
                    html += '   <button type="button" id="tarteaucitronPrivacyUrlDialog" role="link">';
                    html += '       ' + tarteaucitron.lang.privacyUrl;
                    html += '   </button>';
                }
                html += '         </div>';
                html += '         <div class="tarteaucitronName">';
                html += '            <span class="tarteaucitronH2" role="heading" aria-level="2">' + tarteaucitron.lang.all + '</span>';
                html += '         </div>';
                html += '         <div class="tarteaucitronAsk" id="tarteaucitronScrollbarAdjust">';
                html += '            <button type="button" id="tarteaucitronAllAllowed" class="tarteaucitronAllow">';
                html += '               <span class="tarteaucitronCheck" aria-hidden="true"></span> ' + tarteaucitron.lang.allowAll;
                html += '            </button> ';
                html += '            <button type="button" id="tarteaucitronAllDenied" class="tarteaucitronDeny">';
                html += '               <span class="tarteaucitronCross" aria-hidden="true"></span> ' + tarteaucitron.lang.denyAll;
                html += '            </button>';
                html += '         </div>';
                html += '      </div>';
                html += '      <div class="tarteaucitronBorder">';
                html += '         <div class="clear"></div><ul>';


                if (tarteaucitron.parameters.mandatory == true) {
                   html += '<li id="tarteaucitronServicesTitle_mandatory">';
                   html += '<div class="tarteaucitronTitle">';
                   html += '   <button type="button" tabindex="-1"><span class="tarteaucitronPlus" aria-hidden="true"></span> ' + tarteaucitron.lang.mandatoryTitle + '</button>';
                   html += '</div>';
                   html += '<ul id="tarteaucitronServices_mandatory">';
                   html += '<li class="tarteaucitronLine">';
                   html += '   <div class="tarteaucitronName">';
                   html += '       <span class="tarteaucitronH3" role="heading" aria-level="3">' + tarteaucitron.lang.mandatoryText + '</span>';
                   html += '       <span class="tarteaucitronListCookies" aria-hidden="true"></span><br/>';
                   html += '   </div>';
                   if (tarteaucitron.parameters.mandatoryCta == true) {
                       html += '   <div class="tarteaucitronAsk">';
                       html += '       <button type="button" class="tarteaucitronAllow" tabindex="-1" disabled>';
                       html += '           <span class="tarteaucitronCheck" aria-hidden="true"></span> ' + tarteaucitron.lang.allow;
                       html += '       </button> ';
                       html += '       <button type="button" class="tarteaucitronDeny" style="visibility:hidden" tabindex="-1">';
                       html += '           <span class="tarteaucitronCross" aria-hidden="true"></span> ' + tarteaucitron.lang.deny;
                       html += '       </button> ';
                       html += '   </div>';
                   }
                   html += '</li>';
                   html += '</ul></li>';
                }

                for (i = 0; i < cat.length; i += 1) {
                    html += '         <li id="tarteaucitronServicesTitle_' + cat[i] + '" class="tarteaucitronHidden">';
                    html += '            <div class="tarteaucitronTitle" role="heading" aria-level="2">';
                    html += '               <button type="button" class="catToggleBtn" aria-expanded="false" data-cat="tarteaucitronDetails' + cat[i] + '"><span class="tarteaucitronPlus" aria-hidden="true"></span> ' + tarteaucitron.lang[cat[i]].title + '</button>';
                    html += '            </div>';
                    html += '            <div id="tarteaucitronDetails' + cat[i] + '" class="tarteaucitronDetails tarteaucitronInfoBox">';
                    html += '               ' + tarteaucitron.lang[cat[i]].details;
                    html += '            </div>';
                    html += '         <ul id="tarteaucitronServices_' + cat[i] + '"></ul></li>';
                }
                html += '             <li id="tarteaucitronNoServicesTitle" class="tarteaucitronLine">' + tarteaucitron.lang.noServices + '</li>';
                html += '         </ul>';
                html += '         <div class="tarteaucitronHidden tarteaucitron-spacer-20" id="tarteaucitronScrollbarChild"></div>';
                if (tarteaucitron.parameters.removeCredit === false) {
                    html += '     <a class="tarteaucitronSelfLink" href="https://tarteaucitron.io/" rel="nofollow noreferrer noopener" target="_blank" title="tarteaucitron ' + tarteaucitron.lang.newWindow + '"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAAeCAYAAAAWwoEYAAADl0lEQVRoge1Y0W3bQAx9CjKARlC+9GVUmqDJBHEmiDyB6wkcTxBngtgTxJ0gzgQW4C/9aYOmE6g4lTQo+k6y3Rb94QOERNQd+cjj8XiGwWAwGAwGg8FgMBgMBoPB8F8RNRXe+whEKe7c36ZCAeCRxC9Rig2PUd8kPgAsoxSfQ3YAzAA8D/HwYYCb05kBKKO0teFkmbC1jlKsAnq/Abjn+QBqAIsoRS30ttwG/HNz1wH/XIxWTicLdvtW7xTAGEAMtP685CNsBTe2d/BLydfXAG57SEnMAST0zgYZSUCPk02bCvkJduIzuJzDLfPolbY+tLKmar+/8+IRePy4qdpE03qHuH8fipFb4N2+XdA3AJ/0vaQxt7s9FvkIS2XvtqnwM0rxpOQfbnE5G2LhTCmUO2fHIngOmcv+KG3HafDchB6ntwjYqenR2PqC7sOZ3E7FXHB0vqxoFyUyLh7OEH7LOGouvhhN3eIBeKXv0n5MsufdHqXcwYR5U2EbpV35lSspVPJmQj4TcgRK7jTg5IzmPUhhwM5a2WHUFCx+NgiDucmgh7idikLovHFlL0pxQ9xzX+IIP9Y6FrJsqhjlQpZRAkFVDCjZfcCHt6bqJDmuh5ylCWx0RVnk3oumaknqTH5sqrY0fBWyULaHUIgAgxb46MxV3DbieAhxOxUxjSuljig9lMQ/Bcfoi9BTEv9aLORSndVxYOH525sUDC6u2gWxcNzBNRxPanyh3ktKinOgy3WoxPbtUM0t6RkbQnzBnFPgi9GCOEubY9UffIryz9iKRe8s/FUfEWosJJGxagp85bpUO3VywQ46lOtAWfNxKwa4JXQ+628+bpxYGXXMzp5rXH401VEyXwIdowXFaKWSMFHvMTVmGnc+P3oXV2QOiBCfgex8QtcQCbcQE/H+eoHzrkFo1KM7zVO4jVVj5s6lRiWF7zyXyfRMc97J3tzj87mYqZ7E2YjzUct9GUi4tjHLR8dVkBLjQcuHFleWvQfRNEhFR7uX7pkctOwvZXsft7sAtyldEUIN2UTeLxnEfxKYswzdi88BdbZ8hifUoSMftQvP+muRwN6+Q3DeqqRExP9QmTtcheiHh0Ot1x2i2km1bP9pbufw5zZdyWsOrh7vQae5OZWbsMv30pi7cd/CKj3coPEVaCP4Zhx4eQWhOZ1Y9MTXGyP8/iGjEyfa1T4fO/4Lea9vBoPBYDAYDAaDwWAwGAwGwz8GgF8siXCCbrSRhgAAAABJRU5ErkJggg==" alt="tarteaucitron.io" /></a>';
                }
                html += '       </div>';
                html += '   </div>';
                html += '</div>';

                if (tarteaucitron.parameters.orientation === 'bottom') {
                    orientation = 'Bottom';
                }

                if (tarteaucitron.parameters.highPrivacy && !tarteaucitron.parameters.AcceptAllCta) {
                    html += '<div tabindex="-1" id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + '">';
                    //html += '<div class="tarteaucitronAlertBigWrapper">';
                    html += '   <span id="tarteaucitronDisclaimerAlert">';
                    html += '       ' + tarteaucitron.lang.alertBigPrivacy;
                    html += '   </span>';
                    //html += '   <span class="tarteaucitronAlertBigBtnWrapper">';
                    html += '   <button type="button" id="tarteaucitronPersonalize" aria-label="' + tarteaucitron.lang.personalize + ' ' + tarteaucitron.lang.modalWindow + '" title="' + tarteaucitron.lang.personalize + ' ' + tarteaucitron.lang.modalWindow + '">';
                    html += '       ' + tarteaucitron.lang.personalize;
                    html += '   </button>';

                    if (tarteaucitron.parameters.privacyUrl !== "") {
                        html += '   <button role="link" type="button" id="tarteaucitronPrivacyUrl">';
                        html += '       ' + tarteaucitron.lang.privacyUrl;
                        html += '   </button>';
                    }

                    //html += '   </span>';
                    //html += '</div>';
                    html += '</div>';
                } else {
                    html += '<div tabindex="-1" id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + '">';
                    //html += '<div class="tarteaucitronAlertBigWrapper">';
                    html += '   <span id="tarteaucitronDisclaimerAlert">';

                    if (tarteaucitron.parameters.highPrivacy) {
                        html += '       ' + tarteaucitron.lang.alertBigPrivacy;
                    } else {
                        html += '       ' + tarteaucitron.lang.alertBigClick + ' ' + tarteaucitron.lang.alertBig;
                    }

                    html += '   </span>';
                    //html += '   <span class="tarteaucitronAlertBigBtnWrapper">';
                    html += '   <button type="button" class="tarteaucitronCTAButton tarteaucitronAllow" id="tarteaucitronPersonalize2">';
                    html += '       <span class="tarteaucitronCheck" aria-hidden="true"></span> ' + tarteaucitron.lang.acceptAll;
                    html += '   </button>';


                    if (tarteaucitron.parameters.DenyAllCta) {
                        if (tarteaucitron.reloadThePage) {
                                    html += '   <button type="button" class="tarteaucitronCTAButton tarteaucitronDeny" id="tarteaucitronAllDenied2" aria-label="' + tarteaucitron.lang.denyAll + ' (' + tarteaucitron.lang.reload + ')" title="' + tarteaucitron.lang.denyAll + ' (' + tarteaucitron.lang.reload + ')">';
                        } else {
                                    html += '   <button type="button" class="tarteaucitronCTAButton tarteaucitronDeny" id="tarteaucitronAllDenied2">';
                        }
                                    html += '       <span class="tarteaucitronCross" aria-hidden="true"></span> ' + tarteaucitron.lang.denyAll;
                                    html += '   </button>';
                                    //html += '   <br/><br/>';
                    }

                    html += '   <button type="button" id="tarteaucitronCloseAlert" aria-label="' + tarteaucitron.lang.personalize + ' ' + tarteaucitron.lang.modalWindow + '" title="' + tarteaucitron.lang.personalize + ' ' + tarteaucitron.lang.modalWindow + '">';
                    html += '       ' + tarteaucitron.lang.personalize;
                    html += '   </button>';

                    if (tarteaucitron.parameters.privacyUrl !== "") {
                        html += '   <button type="button" id="tarteaucitronPrivacyUrl" role="link">';
                        html += '       ' + tarteaucitron.lang.privacyUrl;
                        html += '   </button>';
                    }

                    //html += '   </span>';
                    //html += '</div>';
                    html += '</div>';
                    html += '<div id="tarteaucitronPercentage"></div>';
                }

                if (tarteaucitron.parameters.showIcon === true) {
                    html += '<div id="tarteaucitronIcon" class="tarteaucitronIcon' + tarteaucitron.parameters.iconPosition + '" style="display: block">';
                    html += '   <button type="button" id="tarteaucitronManager" aria-label="' + tarteaucitron.lang.icon + ' ' + tarteaucitron.lang.modalWindow + '" title="' + tarteaucitron.lang.icon + ' ' + tarteaucitron.lang.modalWindow + '">';
                    html += '       <img src="' + (tarteaucitron.parameters.iconSrc ? tarteaucitron.parameters.iconSrc : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAGA0lEQVRoge1a207bWBRdBtJwLYZhKDMVmlSK1LxNkPo+ZH6g8B6p5AuALwC+APoFoVLeoT8whPeRSt+CZKmZVu3AiIsRlEtCktGyjy8xzuXYhvahS0JJHJ/4rLP3XnuffcAPfGdQ7mM6jRLSAF4BxqsbewB2lRS2o35mpEQaJcwCyANIdLi1DGBNSWEzqmdHRqRRwjqAJclhtExOSUEP+/xIiDRKhhUWfL7ShTtBuJnqcw+/z4Ql0xNmMEwSSz4kuNIzSgpjSsqYJP/GeE185wYJroedRyiLNEpGLLzzrHSuk+83SgbxvOcyyRaDziWsRVZkSRDinpzPbwVGWIucuohsKynMS47fAQyls/BMSRmKJo3AFhG5wm2N1wF+Zs3zebbFfR0RxrXcJHQlgH+LMW616pR/WiIMEXfW3mtzXyeEGWsjKot8c4TOI98L+iKaR5PS6IUk88RLAO9F8UjrbYoYMOosNavpfmODIiwRXRR/G3ohaWVo1RU/c30jV8ab2mV8qVGzHWBOLyTLZiWs5Rolg/C3ySOi0tXP/k4aEwOwSBKPJs7Rp16ABJTe+p1xVX0It/owqqdDEMRoqd3RFxqDPh20Ig6VEPVC0i5RSCD+6wl6HlW7GksSlUMV11/GrUs5NasFLusDE9ELSVphXemtJwaT/8JyIRvxNNCfBmIiNdR04LII3DSrbe0yjqvyJF/ppptqVlt+MCLCEh/oOkPPP6N38Mb5cnQBGFsEqmXg5j3QMwoMzwGnr4HYbybBq13gZAOom/FO63zdf2qQArCsZrUN2TlJy69eSDKYV+6Q4MpP75ivHzPA53ngaBW4eGuSOt0A/lsGPmXMz0+3TFJcTfFbPfFbfnwlhON+iQhlWmA82CQ4ocQ7c6KcfL3DHuls0yT6Sx4YnLXJDCQOIRRv5yGIJBgP8Sdisj2qubpc5UGJmo+W49ifVmzL8HcpGhQPvZCUKiCliIhEN0tr2OCqHuSA8gwQ/92MkU7gxEmeVqGrTTgpxPXbUrtGWYus0I9thRIraagRQUIDf7Qn4yZhKRiFQIyhfMfUr3yblokVWSJ6k8xSnc7eNN/RjowfCYiFoDUFer1S3gW6JiJ8Nt30EMbEhU+vzSIztuRYjRLsR8IHLjlf7HZ+MrWWEXxNmbvapt4jGSqZRYSkGUetSNTPzHsui5YMQ2ajJUNks6mw4wT54Ok2ShnzzIPCUGshzawCRKy5FqvrTZe0RWzQGvw79m67XZjKmxJrLsICjtZa55gxXy+6F4sYsEtxTqhXdRTLC8ulSDaWoCLsolfN+8YUhOsJV709H7Cudr0LlVEtzqBcN+shEyThdR941OnAbF8pirKJqXyupTRTtQSReiVmXW1j7oBErB0d9xM2WEd5J9ZKYtuR4WKwwBSoORbpGrJ5ZI9lt71irJmGX1px0JYE26uNErawr2zfIcP4OHEKXm66PA3wjpCNEfpJunI4muifPjKvsFCkGjExTq63yxMJsZNMYF/J4HmDC5A3Yq36jy0ClePHVhwuu/b1HSFlEfHD5ZtD1bEK44Qu1mWys6tbWmZyPWckzlPTGiRw/XHCuk+q4Rek+mVrVL/UppwrdDEGNV2kpyuhccgc5Oxm9vWnn+19vJrVpLor0kTUrGacMplb1CfOFyTD4o9uNrHqr2Z+ZMSp1c2XcVSORnh9Q81q3k599ETgkNnjg0nGzi10K7rX+bZpHbrblPcY5A4Zxk2xcjzCvTpd9027Aa0QtouyyrKFRR6D/04DwkFGvHPXM3Qda/Jb4nPgI7hQLVM1q5HIBt2MzQNa57Z1DiiLAGa5Mi+O4Sz3Mpp6laPHO6InII3ITnX1QtI+EOX+m9ZxleOZ/j9PiuKoLi3aqXPuEoSye/Vhkm+LalbLtHhMS0R6zu7aZ3vP2jOjL7QVv4McxhcDnZIelAQibGIbULOapf3PuE1Vs9qeaOTdkVKr00gCQiw4NlBzDvf1Lxx+uP5r3Dgv5KQZRzWn+GRwz8jmDS8itUg7iB6vLuJCF5Uty4A9mVKkFR6MiJDachST/oHvHgD+B4SoUIitpF05AAAAAElFTkSuQmCC') + '" alt="' + tarteaucitron.lang.icon + ' ' + tarteaucitron.lang.modalWindow + '" title="' + tarteaucitron.lang.icon + ' ' + tarteaucitron.lang.modalWindow + '">';
                    html += '   </button>';
                    html += '</div>';
                }

                if (tarteaucitron.parameters.showAlertSmall === true) {
                    html += '<div id="tarteaucitronAlertSmall" class="tarteaucitronAlertSmall' + orientation + '">';
                    html += '   <button type="button" id="tarteaucitronManager" aria-label="' + tarteaucitron.lang.alertSmall + ' ' + tarteaucitron.lang.modalWindow + '" title="' + tarteaucitron.lang.alertSmall + ' ' + tarteaucitron.lang.modalWindow + '">';
                    html += '       ' + tarteaucitron.lang.alertSmall;
                    html += '       <span id="tarteaucitronDot">';
                    html += '           <span id="tarteaucitronDotGreen"></span>';
                    html += '           <span id="tarteaucitronDotYellow"></span>';
                    html += '           <span id="tarteaucitronDotRed"></span>';
                    html += '       </span>';
                    if (tarteaucitron.parameters.cookieslist === true) {
                        html += '   </button><!-- @whitespace';
                        html += '   --><button type="button" id="tarteaucitronCookiesNumber" aria-expanded="false" aria-controls="tarteaucitronCookiesListContainer">0</button>';
                        html += '   <div id="tarteaucitronCookiesListContainer">';
                        if (tarteaucitron.reloadThePage) {
                            html += '       <button type="button" id="tarteaucitronClosePanelCookie" aria-label="' + tarteaucitron.lang.close + ' (' + tarteaucitron.lang.reload + ')" title="' + tarteaucitron.lang.close + ' (' + tarteaucitron.lang.reload + ')">';
                        } else {
                            html += '       <button type="button" id="tarteaucitronClosePanelCookie">';
                        }
                        html += '           ' + tarteaucitron.lang.close;
                        html += '       </button>';
                        html += '       <div class="tarteaucitronCookiesListMain" id="tarteaucitronCookiesTitle">';
                        html += '            <span class="tarteaucitronH2" role="heading" aria-level="2" id="tarteaucitronCookiesNumberBis">0 cookie</span>';
                        html += '       </div>';
                        html += '       <div id="tarteaucitronCookiesList"></div>';
                        html += '    </div>';
                    } else {
                        html += '   </div>';
                    }
                    html += '</div>';
                }

                // No internal advertising.js probe: the standalone bundle must run without a second local request.
                (function () {
                    if (tarteaucitronNoAdBlocker === true || tarteaucitron.parameters.adblocker === false) {

                        // create a wrapper container at the same level than tarteaucitron so we can add an aria-hidden when tarteaucitron is opened
                        /*var wrapper = document.createElement('div');
                        wrapper.id = "tarteaucitronContentWrapper";

                        while (document.body.firstChild)
                        {
                            wrapper.appendChild(document.body.firstChild);
                        }

                        // Append the wrapper to the body
                        document.body.appendChild(wrapper);*/

                        div.id = 'tarteaucitronRoot';
                        if (tarteaucitron.parameters.bodyPosition === 'top') {
                            // Prepend tarteaucitron: #tarteaucitronRoot first-child of the body for better accessibility
                            var bodyFirstChild = body.firstChild;
                            body.insertBefore(div, bodyFirstChild);
                        }
                        else {
                            // Append tarteaucitron: #tarteaucitronRoot last-child of the body
                            body.appendChild(div, body);
                        }

                        div.setAttribute('data-nosnippet', 'true');
                        div.setAttribute('lang', language);
                        div.setAttribute('role', 'region');
                        div.setAttribute('aria-labelledby', 'tac_title');

                        div.innerHTML = html;

                        //ie compatibility
                        var tacRootAvailableEvent;
                        if(typeof(Event) === 'function') {
                            tacRootAvailableEvent = new Event("tac.root_available");
                        }else if (typeof(document.createEvent) === 'function'){
                            tacRootAvailableEvent = document.createEvent('Event');
                            tacRootAvailableEvent.initEvent("tac.root_available", true, true);
                        }
                        //end ie compatibility

                        if (typeof(window.dispatchEvent) === 'function') {window.dispatchEvent(tacRootAvailableEvent);}

                        if (tarteaucitron.job !== undefined) {
                            tarteaucitron.job = tarteaucitron.cleanArray(tarteaucitron.job);
                            for (index = 0; index < tarteaucitron.job.length; index += 1) {
                                tarteaucitron.addService(tarteaucitron.job[index]);
                            }
                        } else {
                            tarteaucitron.job = [];
                        }

                        if (tarteaucitron.job.length === 0) {
                            tarteaucitron.userInterface.closeAlert();
                        }

                        tarteaucitron.isAjax = true;

                        tarteaucitron.job.push = function (id) {

                            // ie <9 hack
                            if (typeof tarteaucitron.job.indexOf === 'undefined') {
                                tarteaucitron.job.indexOf = function (obj, start) {
                                    var i,
                                        j = this.length;
                                    for (i = (start || 0); i < j; i += 1) {
                                        if (this[i] === obj) { return i; }
                                    }
                                    return -1;
                                };
                            }

                            if (tarteaucitron.job.indexOf(id) === -1) {
                                Array.prototype.push.call(this, id);
                            }
                            tarteaucitron.launch[id] = false;
                            tarteaucitron.addService(id);
                        };

                        if (document.location.hash === tarteaucitron.hashtag && tarteaucitron.hashtag !== '') {
                            tarteaucitron.userInterface.openPanel();
                        }

                        tarteaucitron.cookie.number();
                        setInterval(tarteaucitron.cookie.number, 60000);
                    }
                }());

                if (tarteaucitron.parameters.adblocker === true) {
                    setTimeout(function () {
                        if (tarteaucitronNoAdBlocker === false) {
                            html = '<div id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + ' tarteaucitron-display-block" role="alert" aria-live="polite">';
                            html += '   <p id="tarteaucitronDisclaimerAlert">';
                            html += '       ' + tarteaucitron.lang.adblock + '<br/>';
                            html += '       <strong>' + tarteaucitron.lang.adblock_call + '</strong>';
                            html += '   </p>';
                            html += '   <button type="button" class="tarteaucitronCTAButton" id="tarteaucitronCTAButton">';
                            html += '       ' + tarteaucitron.lang.reload;
                            html += '   </button>';
                            html += '</div>';
                            html += '<div role="heading" aria-level="1" id="tac_title" class="tac_visually-hidden">' + tarteaucitron.lang.title + '</div>';
                            html += '<div id="tarteaucitronPremium"></div>';

                            div.id = 'tarteaucitronRoot';
                            if (tarteaucitron.parameters.bodyPosition === 'top') {
                                // Prepend tarteaucitron: #tarteaucitronRoot first-child of the body for better accessibility
                                var bodyFirstChild = body.firstChild;
                                body.insertBefore(div, bodyFirstChild);
                            }
                            else {
                                // Append tarteaucitron: #tarteaucitronRoot last-child of the body
                                body.appendChild(div, body);
                            }

                            div.setAttribute('data-nosnippet', 'true');
                            div.setAttribute('lang', language);
                            div.setAttribute('role', 'region');
                            div.setAttribute('aria-labelledby', 'tac_title');

                            div.innerHTML = html;
                        }
                    }, 1500);
                }
                if(tarteaucitron.parameters.closePopup === true){
                    setTimeout(function() {
                        var closeElement = document.getElementById('tarteaucitronAlertBig'),
                            closeSpan = document.createElement('span');
                        if (closeElement) {
                            closeSpan.textContent = 'X';
                            closeSpan.setAttribute('id', "tarteaucitronCloseCross");
                            closeElement.insertBefore(closeSpan, closeElement.firstElementChild);
                        }
                    }, 100);
                }


                if(tarteaucitron.parameters.groupServices === true) {
                    var tac_group_style = document.createElement('style');
                    tac_group_style.innerHTML = '.tarteaucitronTitle{display:none}';
                    document.head.appendChild(tac_group_style);
                    var cats = document.querySelectorAll('[id^="tarteaucitronServicesTitle_"]')
                    Array.prototype.forEach.call(cats, function(item) {
                        var cat = item.getAttribute('id').replace(/^(tarteaucitronServicesTitle_)/, "");
                        if (cat !== "mandatory") {
                            var html = '';
                            html += '<li  class="tarteaucitronLine">';
                            html += '   <div class="tarteaucitronName">';
                            html += '       <span class="tarteaucitronH3" role="heading" aria-level="2">'+tarteaucitron.lang[cat].title+'</span>';
                            html += '       <span>'+tarteaucitron.lang[cat].details+'</span>';
                            html += '   <button type="button" aria-expanded="false" class="tarteaucitron-toggle-group" id="tarteaucitron-toggle-group-'+cat+'">'+tarteaucitron.lang.alertSmall+' ('+document.getElementById("tarteaucitronServices_"+cat).childElementCount+')</button>';
                            html += '   </div>';
                            html += '   <div class="tarteaucitronAsk" id="tarteaucitron-group-'+cat+'">';
                            html += '       <button type="button" aria-label="' + tarteaucitron.lang.allow + ' ' + tarteaucitron.lang[cat].title + '" class="tarteaucitronAllow" id="tarteaucitron-accept-group-'+cat+'">';
                            html += '           <span class="tarteaucitronCheck" aria-hidden="true"></span> ' + tarteaucitron.lang.allow;
                            html += '       </button> ';
                            html += '       <button type="button" aria-label="' + tarteaucitron.lang.deny + ' ' + tarteaucitron.lang[cat].title + '" class="tarteaucitronDeny" id="tarteaucitron-reject-group-'+cat+'">';
                            html += '           <span class="tarteaucitronCross" aria-hidden="true"></span> ' + tarteaucitron.lang.deny;
                            html += '       </button>';
                            html += '   </div>';
                            html += '</li>';
                            var ul = document.createElement('ul');
                            ul.innerHTML = html;
                            item.insertBefore(ul, item.querySelector('#tarteaucitronServices_'+cat+''));
                            document.querySelector('#tarteaucitronServices_' + cat).style.display = 'none';
                            tarteaucitron.addClickEventToId("tarteaucitron-toggle-group-" + cat, function () {
                                tarteaucitron.userInterface.toggle('tarteaucitronServices_' + cat);
                               if (document.getElementById('tarteaucitronServices_' + cat).style.display == 'block') {
                                    tarteaucitron.userInterface.addClass('tarteaucitronServicesTitle_' + cat, 'tarteaucitronIsExpanded');
                                    document.getElementById('tarteaucitron-toggle-group-'+cat).setAttribute('aria-expanded', 'true');
                                } else {
                                    tarteaucitron.userInterface.removeClass('tarteaucitronServicesTitle_' + cat, 'tarteaucitronIsExpanded');
                                    document.getElementById('tarteaucitron-toggle-group-'+cat).setAttribute('aria-expanded', 'false');
                                }
                            });
                            tarteaucitron.addClickEventToId("tarteaucitron-accept-group-" + cat, function () {
                                tarteaucitron.userInterface.respondAll(true, cat);
                            });
                            tarteaucitron.addClickEventToId("tarteaucitron-reject-group-" + cat, function () {
                                tarteaucitron.userInterface.respondAll(false, cat);
                            });
                        }
                    });
                }
                tarteaucitron.userInterface.color("", true);

                // add a little timeout to be sure everything is accessible
                setTimeout(function () {

                    // Setup events
                    tarteaucitron.addClickEventToId("tarteaucitronCloseCross", function () {
                        tarteaucitron.userInterface.closeAlert();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronPersonalize", function () {
                        tarteaucitron.userInterface.openPanel();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronPersonalize2", function () {
                        tarteaucitron.userInterface.respondAll(true);
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronManager", function () {
                        tarteaucitron.userInterface.openPanel();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronBack", function () {
                        tarteaucitron.userInterface.closePanel();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronClosePanel", function () {
                        tarteaucitron.userInterface.closePanel();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronClosePanelCookie", function () {
                        tarteaucitron.userInterface.closePanel();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronPrivacyUrl", function () {
                        document.location = tarteaucitron.parameters.privacyUrl;
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronPrivacyUrlDialog", function () {
                        document.location = tarteaucitron.parameters.privacyUrl;
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronCookiesNumber", function () {
                        tarteaucitron.userInterface.toggleCookiesList();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronAllAllowed", function () {
                        tarteaucitron.userInterface.respondAll(true);
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronAllDenied", function () {
                        tarteaucitron.userInterface.respondAll(false);
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronAllDenied2", function () {
                        tarteaucitron.userInterface.respondAll(false, '', true);
                        if (tarteaucitron.reloadThePage === true) {
                            window.location.reload();
                        }
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronCloseAlert", function () {
                        tarteaucitron.userInterface.openPanel();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronCTAButton", function () {
                        location.reload();
                    });
                    var toggleBtns = document.getElementsByClassName("catToggleBtn"), i;
                    for (i = 0; i < toggleBtns.length; i++) {
                        toggleBtns[i].dataset.index = i;
                        tarteaucitron.addClickEventToElement(toggleBtns[i], function () {
                            tarteaucitron.userInterface.toggle('tarteaucitronDetails' + cat[this.dataset.index], 'tarteaucitronInfoBox');
                            if (document.getElementById('tarteaucitronDetails' + cat[this.dataset.index]).style.display === 'block') {
                                this.setAttribute('aria-expanded', 'true');
                            } else {
                                this.setAttribute('aria-expanded', 'false');
                            }
                            return false;
                        });
                    }

                    var allowBtns = document.getElementsByClassName("tarteaucitronAllow");
                    for (i = 0; i < allowBtns.length; i++) {
                        tarteaucitron.addClickEventToElement(allowBtns[i], function () {
                            tarteaucitron.userInterface.respond(this, true);
                        });
                    }
                    var denyBtns = document.getElementsByClassName("tarteaucitronDeny");
                    for (i = 0; i < denyBtns.length; i++) {
                        tarteaucitron.addClickEventToElement(denyBtns[i], function () {
                            tarteaucitron.userInterface.respond(this, false);
                        });
                    }
                    if(tarteaucitron.events.load) {
                        tarteaucitron.events.load();
                    }
                }, 500);

    },
    "addService": function (serviceId) {
        "use strict";
        var html = '',
            s = tarteaucitron.services,
            service = s[serviceId],
            cookie = tarteaucitron.cookie.read(),
            hostname = document.location.hostname,
            hostRef = document.referrer.split('/')[2],
            isNavigating = (hostRef === hostname && window.location.href !== tarteaucitron.parameters.privacyUrl),
            isAutostart = (!service.needConsent),
            isWaiting = (cookie.indexOf(service.key + '=wait') >= 0),
            isDenied = (cookie.indexOf(service.key + '=false') >= 0),
            isAllowed = ((cookie.indexOf(service.key + '=true') >= 0) || (!service.needConsent && cookie.indexOf(service.key + '=false') < 0)),
            isResponded = (cookie.indexOf(service.key + '=false') >= 0 || cookie.indexOf(service.key + '=true') >= 0),
            isDNTRequested = (navigator.doNotTrack === "1" || navigator.doNotTrack === "yes" || navigator.msDoNotTrack === "1" || window.doNotTrack === "1"),
            currentStatus = (isAllowed) ? tarteaucitron.lang.allowed : tarteaucitron.lang.disallowed,
            state = (undefined !== service.defaultState) ? service.defaultState :
                    (undefined !== tarteaucitron.parameters.serviceDefaultState ? tarteaucitron.parameters.serviceDefaultState : 'wait');


        if (tarteaucitron.added[service.key] !== true) {
            tarteaucitron.added[service.key] = true;

            html += '<li id="' + service.key + 'Line" class="tarteaucitronLine">';
            html += '   <div class="tarteaucitronName">';
            html += '       <span class="tarteaucitronH3" role="heading" aria-level="3">' + service.name + '</span>';
            html += '       <span class="tacCurrentStatus" id="tacCurrentStatus' + service.key + '">'+currentStatus+'</span>';
            html += '       <span class="tarteaucitronReadmoreSeparator"> - </span>';
            html += '       <span id="tacCL' + service.key + '" class="tarteaucitronListCookies"></span><br/>';
            if (tarteaucitron.parameters.moreInfoLink == true) {

                var link = 'https://tarteaucitron.io/service/' + service.key + '/';
                if (service.readmoreLink !== undefined && service.readmoreLink !== '') {
                    link = service.readmoreLink;
                }
                if (tarteaucitron.parameters.readmoreLink !== undefined && tarteaucitron.parameters.readmoreLink !== '') {
                    link = tarteaucitron.parameters.readmoreLink;
                }
                html += '       <a href="' + link + '" target="_blank" rel="noreferrer noopener nofollow" title="' + tarteaucitron.lang.more + ' : ' + tarteaucitron.lang.cookieDetail + ' ' + service.name + ' ' + tarteaucitron.lang.ourSite + ' ' + tarteaucitron.lang.newWindow +'" class="tarteaucitronReadmoreInfo">';
                html += '           ' + tarteaucitron.lang.more;
                html += '       </a>';
                html += '       <span class="tarteaucitronReadmoreSeparator"> - </span>';
                html += '       <a href="' + service.uri + '" target="_blank" rel="noreferrer noopener" title="' + tarteaucitron.lang.source + ' ' + service.name + ' ' + tarteaucitron.lang.newWindow + '" class="tarteaucitronReadmoreOfficial">';
                html += '           ' + tarteaucitron.lang.source;
                html += '       </a>';
            }

            html += '   </div>';
            html += '   <div class="tarteaucitronAsk">';
            html += '       <button type="button" aria-label="' + tarteaucitron.lang.allow + ' ' + service.name + '" id="' + service.key + 'Allowed" class="tarteaucitronAllow">';
            html += '           <span class="tarteaucitronCheck" aria-hidden="true"></span> ' + tarteaucitron.lang.allow;
            html += '       </button> ';
            html += '       <button type="button" aria-label="' + tarteaucitron.lang.deny + ' ' + service.name + '" id="' + service.key + 'Denied" class="tarteaucitronDeny">';
            html += '           <span class="tarteaucitronCross" aria-hidden="true"></span> ' + tarteaucitron.lang.deny;
            html += '       </button>';
            html += '   </div>';
            html += '</li>';

            tarteaucitron.userInterface.css('tarteaucitronServicesTitle_' + service.type, 'display', 'block');

            if (document.getElementById('tarteaucitronServices_' + service.type) !== null) {
                document.getElementById('tarteaucitronServices_' + service.type).innerHTML += html;
            }

            tarteaucitron.userInterface.css('tarteaucitronNoServicesTitle', 'display', 'none');

            tarteaucitron.userInterface.order(service.type);

            tarteaucitron.addClickEventToId(service.key + 'Allowed', function () {
                tarteaucitron.userInterface.respond(this, true);
            });

            tarteaucitron.addClickEventToId(service.key + 'Denied', function () {
                tarteaucitron.userInterface.respond(this, false);
            });
        }

        tarteaucitron.pro('!' + service.key + '=' + isAllowed);

        // allow by default for non EU
        if (isResponded === false && tarteaucitron.user.bypass === true) {
            isAllowed = true;
            tarteaucitron.cookie.create(service.key, true);
        }

        if ((!isResponded && (isAutostart || (isNavigating && isWaiting)) && !tarteaucitron.highPrivacy) || isAllowed) {
            if (!isAllowed || (!service.needConsent && cookie.indexOf(service.key + '=false') < 0)) {
                tarteaucitron.cookie.create(service.key, true);
            }
            if (tarteaucitron.launch[service.key] !== true) {
                tarteaucitron.launch[service.key] = true;
                if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + service.key + "_") < 0) { service.js(); }
                tarteaucitron.sendEvent(service.key + '_loaded');
            }
            tarteaucitron.state[service.key] = true;
            tarteaucitron.userInterface.color(service.key, true);
        } else if (isDenied) {
            if (typeof service.fallback === 'function') {
                if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + service.key + "_") < 0) { service.fallback(); }
            }
            tarteaucitron.state[service.key] = false;
            tarteaucitron.userInterface.color(service.key, false);
        } else if (!isResponded && isDNTRequested && tarteaucitron.handleBrowserDNTRequest) {
            tarteaucitron.cookie.create(service.key, 'false');
            if (typeof service.fallback === 'function') {
                if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + service.key + "_") < 0) { service.fallback(); }
            }
            tarteaucitron.state[service.key] = false;
            tarteaucitron.userInterface.color(service.key, false);
        } else if (!isResponded) {
            tarteaucitron.cookie.create(service.key, state);
            if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + service.key + "_") < 0) {
                if(true === state && typeof service.js === 'function') {
                    service.js();
                } else if (typeof service.fallback === 'function') {
                    service.fallback();
                }
            }

            tarteaucitron.userInterface.color(service.key, state);

            if( 'wait' === state ) {
                tarteaucitron.userInterface.openAlert();
            }
        }

        tarteaucitron.cookie.checkCount(service.key);
        tarteaucitron.sendEvent(service.key + '_added')
    },
    "sendEvent" : function(event_key) {
        if(event_key !== undefined) {
            //ie compatibility
            var send_event_item;
            if(typeof(Event) === 'function') {
                send_event_item = new Event(event_key);
            }else if (typeof(document.createEvent) === 'function'){
                send_event_item = document.createEvent('Event');
                send_event_item.initEvent(event_key, true, true);
            }
            //end ie compatibility

            document.dispatchEvent(send_event_item);
        }
    },
    "cleanArray": function cleanArray(arr) {
        "use strict";
        var i,
            len = arr.length,
            out = [],
            obj = {},
            s = tarteaucitron.services;

        for (i = 0; i < len; i += 1) {
            if (!obj[arr[i]]) {
                obj[arr[i]] = {};
                if (tarteaucitron.services[arr[i]] !== undefined) {
                    out.push(arr[i]);
                }
            }
        }

        out = out.sort(function (a, b) {
            if (s[a].type + s[a].key > s[b].type + s[b].key) { return 1; }
            if (s[a].type + s[a].key < s[b].type + s[b].key) { return -1; }
            return 0;
        });

        return out;
    },
    "userInterface": {
        "css": function (id, property, value) {
            "use strict";
            if (document.getElementById(id) !== null) {

                if (property == "display" && value == "none" && (id == "tarteaucitron" || id == "tarteaucitronBack" || id == "tarteaucitronAlertBig")) {
                    document.getElementById(id).style["opacity"] = "0";

                    setTimeout(function() {document.getElementById(id).style[property] = value;}, 200);
                } else {

                    document.getElementById(id).style[property] = value;

                    if (property == "display" && value == "block" && (id == "tarteaucitron" || id == "tarteaucitronAlertBig")) {
                        document.getElementById(id).style["opacity"] = "0";
                        setTimeout(function() {document.getElementById(id).style["opacity"] = "1";}, 1);
                    }

                    if (property == "display" && value == "block" && id == "tarteaucitronBack") {
                        document.getElementById(id).style["opacity"] = "0";
                        setTimeout(function() {document.getElementById(id).style["opacity"] = "0.7";}, 1);
                    }
                }
            }
        },
        "addClass": function (id, className) {
            "use strict";
            if (document.getElementById(id) !== null && document.getElementById(id).classList !== undefined) {
                document.getElementById(id).classList.add(className);
            }
        },
        "removeClass": function (id, className) {
            "use strict";
            if (document.getElementById(id) !== null && document.getElementById(id).classList !== undefined) {
                document.getElementById(id).classList.remove(className);
            }
        },
        "respondAll": function (status, type, allowSafeAnalytics) {
            "use strict";
            var s = tarteaucitron.services,
                service,
                key,
                index = 0;

            for (index = 0; index < tarteaucitron.job.length; index += 1) {

                if (typeof type !== 'undefined' && type !== '' && s[tarteaucitron.job[index]].type !== type) {
                    continue;
                }

                if (allowSafeAnalytics && typeof s[tarteaucitron.job[index]].safeanalytic !== "undefined" && s[tarteaucitron.job[index]].safeanalytic === true) {
                    continue;
                }

                service = s[tarteaucitron.job[index]];
                key = service.key;
                if (tarteaucitron.state[key] !== status) {
                    if (status === false && tarteaucitron.launch[key] === true) {
                        tarteaucitron.reloadThePage = true;
                        if (tarteaucitron.checkIfExist('tarteaucitronClosePanel')) {
                            var ariaCloseValue = document.getElementById('tarteaucitronClosePanel').textContent.trim() + ' (' + tarteaucitron.lang.reload + ')';
                            document.getElementById('tarteaucitronClosePanel').setAttribute("aria-label", ariaCloseValue);
                            document.getElementById('tarteaucitronClosePanel').setAttribute("title", ariaCloseValue);
                        }
                    }
                    if (tarteaucitron.launch[key] !== true && status === true) {

                        tarteaucitron.pro('!' + key + '=engage');

                        tarteaucitron.launch[key] = true;
                        if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + key + "_") < 0) { tarteaucitron.services[key].js(); }
                        tarteaucitron.sendEvent(key + '_loaded');
                    }
                    var itemStatusElem = document.getElementById('tacCurrentStatus'+key);
                    if(status == true){
                        itemStatusElem.innerHTML = tarteaucitron.lang.allowed;
                        tarteaucitron.sendEvent(key + '_allowed');
                    }else{
                        itemStatusElem.innerHTML = tarteaucitron.lang.disallowed;
                        tarteaucitron.sendEvent(key + '_disallowed');
                    }
                    tarteaucitron.state[key] = status;
                    tarteaucitron.cookie.create(key, status);
                    tarteaucitron.userInterface.color(key, status);
                }
            }
        },
        "respond": function (el, status) {
            "use strict";
            if (el.id === '') {
                return;
            }
            var key = el.id.replace(new RegExp("(Eng[0-9]+|Allow|Deni)ed", "g"), '');

            if (key.substring(0, 13) === 'tarteaucitron' || key === '') {return;}

            // return if same state
            if (tarteaucitron.state[key] === status) {
                return;
            }

            if (status === false && tarteaucitron.launch[key] === true) {
                tarteaucitron.reloadThePage = true;
                if (tarteaucitron.checkIfExist('tarteaucitronClosePanel')) {
                    var ariaCloseValue = document.getElementById('tarteaucitronClosePanel').textContent.trim() + ' (' + tarteaucitron.lang.reload + ')';
                    document.getElementById('tarteaucitronClosePanel').setAttribute("aria-label", ariaCloseValue);
                    document.getElementById('tarteaucitronClosePanel').setAttribute("title", ariaCloseValue);
                }
            }

            // if not already launched... launch the service
            if (status === true) {
                if (tarteaucitron.launch[key] !== true) {

                    tarteaucitron.pro('!' + key + '=engage');

                    tarteaucitron.launch[key] = true;
                    if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + key + "_") < 0) { tarteaucitron.services[key].js(); }
                    tarteaucitron.sendEvent(key + '_loaded');
                }
            }
            var itemStatusElem = document.getElementById('tacCurrentStatus'+key);
            if(status == true){
                itemStatusElem.innerHTML = tarteaucitron.lang.allowed;
                tarteaucitron.sendEvent(key + '_allowed');
            }else{
                itemStatusElem.innerHTML = tarteaucitron.lang.disallowed;
                tarteaucitron.sendEvent(key + '_disallowed');
            }
            tarteaucitron.state[key] = status;
            tarteaucitron.cookie.create(key, status);
            tarteaucitron.userInterface.color(key, status);
        },
        "color": function (key, status) {
            "use strict";
            var c = 'tarteaucitron',
                nbDenied = 0,
                nbPending = 0,
                nbAllowed = 0,
                sum = tarteaucitron.job.length,
                index,
                s = tarteaucitron.services;

            if (key !== "") {

            if (status === true) {
                tarteaucitron.userInterface.addClass(key + 'Line', 'tarteaucitronIsAllowed');
                tarteaucitron.userInterface.removeClass(key + 'Line', 'tarteaucitronIsDenied');
                document.getElementById(key + 'Allowed').setAttribute('aria-pressed', 'true');
                document.getElementById(key + 'Denied').setAttribute('aria-pressed', 'false');
            } else if (status === false) {
                tarteaucitron.userInterface.removeClass(key + 'Line', 'tarteaucitronIsAllowed');
                tarteaucitron.userInterface.addClass(key + 'Line', 'tarteaucitronIsDenied');
                document.getElementById(key + 'Allowed').setAttribute('aria-pressed', 'false');
                document.getElementById(key + 'Denied').setAttribute('aria-pressed', 'true');
            } else {
                document.getElementById(key + 'Allowed').setAttribute('aria-pressed', 'false');
                document.getElementById(key + 'Denied').setAttribute('aria-pressed', 'false');
            }

            // check if all services are allowed
            var sumToRemove = 0;
            for (index = 0; index < sum; index += 1) {

                if (typeof s[tarteaucitron.job[index]].safeanalytic !== "undefined" && s[tarteaucitron.job[index]].safeanalytic === true) {
                    sumToRemove += 1;
                    continue;
                }

                if (tarteaucitron.state[tarteaucitron.job[index]] === false) {
                    nbDenied += 1;
                } else if (tarteaucitron.state[tarteaucitron.job[index]] === undefined) {
                    nbPending += 1;
                } else if (tarteaucitron.state[tarteaucitron.job[index]] === true) {
                    nbAllowed += 1;
                }
            }
            sum -= sumToRemove;

            tarteaucitron.userInterface.css(c + 'DotGreen', 'width', ((100 / sum) * nbAllowed) + '%');
            tarteaucitron.userInterface.css(c + 'DotYellow', 'width', ((100 / sum) * nbPending) + '%');
            tarteaucitron.userInterface.css(c + 'DotRed', 'width', ((100 / sum) * nbDenied) + '%');

            if (nbDenied === 0 && nbPending === 0) {
                tarteaucitron.userInterface.removeClass(c + 'AllDenied', c + 'IsSelected');
                tarteaucitron.userInterface.addClass(c + 'AllAllowed', c + 'IsSelected');

                tarteaucitron.userInterface.addClass(c + 'MainLineOffset', c + 'IsAllowed');
                tarteaucitron.userInterface.removeClass(c + 'MainLineOffset', c + 'IsDenied');

                document.getElementById(c + 'AllDenied').setAttribute('aria-pressed', 'false');
                document.getElementById(c + 'AllAllowed').setAttribute('aria-pressed', 'true');

            } else if (nbAllowed === 0 && nbPending === 0) {
                tarteaucitron.userInterface.removeClass(c + 'AllAllowed', c + 'IsSelected');
                tarteaucitron.userInterface.addClass(c + 'AllDenied', c + 'IsSelected');

                tarteaucitron.userInterface.removeClass(c + 'MainLineOffset', c + 'IsAllowed');
                tarteaucitron.userInterface.addClass(c + 'MainLineOffset', c + 'IsDenied');

                document.getElementById(c + 'AllDenied').setAttribute('aria-pressed', 'true');
                document.getElementById(c + 'AllAllowed').setAttribute('aria-pressed', 'false');

            } else {
                tarteaucitron.userInterface.removeClass(c + 'AllAllowed', c + 'IsSelected');
                tarteaucitron.userInterface.removeClass(c + 'AllDenied', c + 'IsSelected');

                tarteaucitron.userInterface.removeClass(c + 'MainLineOffset', c + 'IsAllowed');
                tarteaucitron.userInterface.removeClass(c + 'MainLineOffset', c + 'IsDenied');

                document.getElementById(c + 'AllDenied').setAttribute('aria-pressed', 'false');
                document.getElementById(c + 'AllAllowed').setAttribute('aria-pressed', 'false');
            }

            // close the alert if all service have been reviewed
            if (nbPending === 0) {
                tarteaucitron.userInterface.closeAlert();
            }

            if (tarteaucitron.services[key].cookies.length > 0 && status === false) {
                tarteaucitron.cookie.purge(tarteaucitron.services[key].cookies);
            }

            if (status === true) {
                if (document.getElementById('tacCL' + key) !== null) {
                    document.getElementById('tacCL' + key).innerHTML = '...';
                }
                setTimeout(function () {
                    tarteaucitron.cookie.checkCount(key);
                }, 2500);
            } else {
                tarteaucitron.cookie.checkCount(key);
            }

            }

	    // groups
            var cats = document.querySelectorAll('[id^="tarteaucitronServicesTitle_"]')
            Array.prototype.forEach.call(cats, function(item) {
                var cat = item.getAttribute('id').replace(/^(tarteaucitronServicesTitle_)/, ""),
                    total = document.getElementById("tarteaucitronServices_"+cat).childElementCount;
                var doc = document.getElementById("tarteaucitronServices_"+cat),
                    groupdenied = 0,
                    groupallowed = 0;
                for (var ii = 0; ii < doc.children.length; ii++) {
                    if (doc.children[ii].className == "tarteaucitronLine tarteaucitronIsDenied") {
                        groupdenied++;
                    }
                    if (doc.children[ii].className == "tarteaucitronLine tarteaucitronIsAllowed") {
                        groupallowed++;
                    }
                }
                if (total === groupallowed) {
                    tarteaucitron.userInterface.removeClass('tarteaucitron-group-'+cat, 'tarteaucitronIsDenied');
                    tarteaucitron.userInterface.addClass('tarteaucitron-group-'+cat, 'tarteaucitronIsAllowed');

                    if (document.getElementById('tarteaucitron-reject-group-'+cat)) {
                        document.getElementById('tarteaucitron-reject-group-'+cat).setAttribute('aria-pressed', 'false');
                        document.getElementById('tarteaucitron-accept-group-'+cat).setAttribute('aria-pressed', 'true');
                    }
                }
                if (total === groupdenied) {
                    tarteaucitron.userInterface.addClass('tarteaucitron-group-'+cat, 'tarteaucitronIsDenied');
                    tarteaucitron.userInterface.removeClass('tarteaucitron-group-'+cat, 'tarteaucitronIsAllowed');

                    if (document.getElementById('tarteaucitron-reject-group-'+cat)) {
                        document.getElementById('tarteaucitron-reject-group-'+cat).setAttribute('aria-pressed', 'true');
                        document.getElementById('tarteaucitron-accept-group-'+cat).setAttribute('aria-pressed', 'false');
                    }
                }
                if (total !== groupdenied && total !== groupallowed) {
                    tarteaucitron.userInterface.removeClass('tarteaucitron-group-'+cat, 'tarteaucitronIsDenied');
                    tarteaucitron.userInterface.removeClass('tarteaucitron-group-'+cat, 'tarteaucitronIsAllowed');

                    if (document.getElementById('tarteaucitron-reject-group-'+cat)) {
                        document.getElementById('tarteaucitron-reject-group-'+cat).setAttribute('aria-pressed', 'false');
                        document.getElementById('tarteaucitron-accept-group-'+cat).setAttribute('aria-pressed', 'false');
                    }
                }
                groupdenied = 0;
                groupallowed = 0;
            });

        },
        "openPanel": function () {
            "use strict";

            tarteaucitron.userInterface.css('tarteaucitron', 'display', 'block');
            tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'block');
            tarteaucitron.userInterface.css('tarteaucitronCookiesListContainer', 'display', 'none');

            document.getElementById('tarteaucitronClosePanel').focus();
            if (document.getElementsByTagName('body')[0].classList !== undefined) {
                document.getElementsByTagName('body')[0].classList.add('tarteaucitron-modal-open');
            }
            tarteaucitron.userInterface.focusTrap();
            tarteaucitron.userInterface.jsSizing('main');

            //ie compatibility
            var tacOpenPanelEvent;
            if(typeof(Event) === 'function') {
                tacOpenPanelEvent = new Event("tac.open_panel");
            }else if (typeof(document.createEvent) === 'function'){
                tacOpenPanelEvent = document.createEvent('Event');
                tacOpenPanelEvent.initEvent("tac.open_panel", true, true);
            }
            //end ie compatibility

            if (typeof(window.dispatchEvent) === 'function') {window.dispatchEvent(tacOpenPanelEvent);}
        },
        "closePanel": function () {
            "use strict";

            if (document.location.hash === tarteaucitron.hashtag) {
                if (window.history) {
                    window.history.replaceState('', document.title, window.location.pathname + window.location.search);
                } else {
                    document.location.hash = '';
                }
            }
            if (tarteaucitron.checkIfExist('tarteaucitron')) {
                // accessibility: manage focus on close panel
                if (tarteaucitron.checkIfExist('tarteaucitronCloseAlert')) {
                    document.getElementById('tarteaucitronCloseAlert').focus();
                } else if (tarteaucitron.checkIfExist('tarteaucitronManager')) {
                    document.getElementById('tarteaucitronManager').focus();
                } else if (tarteaucitron.customCloserId && tarteaucitron.checkIfExist(tarteaucitron.customCloserId)) {
                    document.getElementById(tarteaucitron.customCloserId).focus();
                }
                tarteaucitron.userInterface.css('tarteaucitron', 'display', 'none');
            }

            if (tarteaucitron.checkIfExist('tarteaucitronCookiesListContainer') && tarteaucitron.checkIfExist('tarteaucitronCookiesNumber')) {
                // accessibility: manage focus on close cookies list
                document.getElementById('tarteaucitronCookiesNumber').focus();
                document.getElementById('tarteaucitronCookiesNumber').setAttribute("aria-expanded", "false");
                tarteaucitron.userInterface.css('tarteaucitronCookiesListContainer', 'display', 'none');
            }

            tarteaucitron.fallback(['tarteaucitronInfoBox'], function (elem) {
                elem.style.display = 'none';
            }, true);

            if (tarteaucitron.reloadThePage === true) {
                window.location.reload();
            } else {
                tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'none');
            }
            if (document.getElementsByTagName('body')[0].classList !== undefined) {
                document.getElementsByTagName('body')[0].classList.remove('tarteaucitron-modal-open');
            }

            //ie compatibility
            var tacClosePanelEvent;
            if(typeof(Event) === 'function') {
                tacClosePanelEvent = new Event("tac.close_panel");
            }else if (typeof(document.createEvent) === 'function'){
                tacClosePanelEvent = document.createEvent('Event');
                tacClosePanelEvent.initEvent("tac.close_panel", true, true);
            }
            //end ie compatibility

            if (typeof(window.dispatchEvent) === 'function') {window.dispatchEvent(tacClosePanelEvent);}
        },
        "focusTrap": function() {
            "use strict";

            var focusableEls,
                firstFocusableEl,
                lastFocusableEl,
                filtered;

            focusableEls = document.getElementById('tarteaucitron').querySelectorAll('a[href], button');
            filtered = [];

            // get only visible items
            for (var i = 0, max = focusableEls.length; i < max; i++) {
                if (focusableEls[i].offsetHeight > 0) {
                   filtered.push(focusableEls[i]);
                }
            }

            firstFocusableEl = filtered[0];
            lastFocusableEl = filtered[filtered.length - 1];

            //loop focus inside tarteaucitron
            document.getElementById('tarteaucitron').addEventListener("keydown", function (evt) {

                if ( evt.key === 'Tab' || evt.keyCode === 9 ) {

                    if ( evt.shiftKey ) /* shift + tab */ {
                        if (document.activeElement === firstFocusableEl) {
                            lastFocusableEl.focus();
                            evt.preventDefault();
                        }
                    } else /* tab */ {
                        if (document.activeElement === lastFocusableEl) {
                            firstFocusableEl.focus();
                            evt.preventDefault();
                        }
                    }
                }
            })
        },
        "openAlert": function () {
            "use strict";
            var c = 'tarteaucitron';
            tarteaucitron.userInterface.css(c + 'Percentage', 'display', 'block');
            tarteaucitron.userInterface.css(c + 'AlertSmall', 'display', 'none');
            tarteaucitron.userInterface.css(c + 'Icon', 'display', 'none');
            tarteaucitron.userInterface.css(c + 'AlertBig',   'display', 'block');
            tarteaucitron.userInterface.addClass(c + 'Root',   'tarteaucitronBeforeVisible');

            //ie compatibility
            var tacOpenAlertEvent;
            if(typeof(Event) === 'function') {
                tacOpenAlertEvent = new Event("tac.open_alert");
            }else if (typeof(document.createEvent) === 'function'){
                tacOpenAlertEvent = document.createEvent('Event');
                tacOpenAlertEvent.initEvent("tac.open_alert", true, true);
            }
            //end ie compatibility

            if (document.getElementById('tarteaucitronAlertBig') !== null) {
                document.getElementById('tarteaucitronAlertBig').focus();
            }

            if (typeof(window.dispatchEvent) === 'function') {window.dispatchEvent(tacOpenAlertEvent);}
        },
        "closeAlert": function () {
            "use strict";
            var c = 'tarteaucitron';
            tarteaucitron.userInterface.css(c + 'Percentage', 'display', 'none');
            tarteaucitron.userInterface.css(c + 'AlertSmall', 'display', 'block');
            tarteaucitron.userInterface.css(c + 'Icon', 'display', 'block');
            tarteaucitron.userInterface.css(c + 'AlertBig',   'display', 'none');
            tarteaucitron.userInterface.removeClass(c + 'Root',   'tarteaucitronBeforeVisible');
            tarteaucitron.userInterface.jsSizing('box');

            //ie compatibility
            var tacCloseAlertEvent;
            if(typeof(Event) === 'function') {
                tacCloseAlertEvent = new Event("tac.close_alert");
            }else if (typeof(document.createEvent) === 'function'){
                tacCloseAlertEvent = document.createEvent('Event');
                tacCloseAlertEvent.initEvent("tac.close_alert", true, true);
            }
            //end ie compatibility

            if (typeof(window.dispatchEvent) === 'function') {window.dispatchEvent(tacCloseAlertEvent);}
        },
        "toggleCookiesList": function () {
            "use strict";
            var div = document.getElementById('tarteaucitronCookiesListContainer'),
                togglediv = document.getElementById('tarteaucitronCookiesNumber');

            if (div === null) {
                return;
            }

            if (div.style.display !== 'block') {
                tarteaucitron.cookie.number();
                div.style.display = 'block';
                togglediv.setAttribute("aria-expanded", "true");
                tarteaucitron.userInterface.jsSizing('cookie');
                tarteaucitron.userInterface.css('tarteaucitron', 'display', 'none');
                tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'block');
                tarteaucitron.fallback(['tarteaucitronInfoBox'], function (elem) {
                    elem.style.display = 'none';
                }, true);
            } else {
                div.style.display = 'none';
                togglediv.setAttribute("aria-expanded", "false");
                tarteaucitron.userInterface.css('tarteaucitron', 'display', 'none');
                tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'none');
            }
        },
        "toggle": function (id, closeClass) {
            "use strict";
            var div = document.getElementById(id);

            if (div === null) {
                return;
            }

            if (closeClass !== undefined) {
                tarteaucitron.fallback([closeClass], function (elem) {
                    if (elem.id !== id) {
                        elem.style.display = 'none';
                    }
                }, true);
            }

            if (div.style.display !== 'block') {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        },
        "order": function (id) {
            "use strict";
            var main = document.getElementById('tarteaucitronServices_' + id),
                allDivs,
                store = [],
                i;

            if (main === null) {
                return;
            }

            allDivs = main.childNodes;

            if (typeof Array.prototype.map === 'function' && typeof Enumerable === 'undefined') {
                Array.prototype.map.call(main.children, Object).sort(function (a, b) {
                //var mainChildren = Array.from(main.children);
                //mainChildren.sort(function (a, b) {
                    if (tarteaucitron.services[a.id.replace(/Line/g, '')].name > tarteaucitron.services[b.id.replace(/Line/g, '')].name) { return 1; }
                    if (tarteaucitron.services[a.id.replace(/Line/g, '')].name < tarteaucitron.services[b.id.replace(/Line/g, '')].name) { return -1; }
                    return 0;
                }).forEach(function (element) {
                    main.appendChild(element);
                });
            }
        },
        "jsSizing": function (type) {
            "use strict";
            var scrollbarMarginRight = 10,
                scrollbarWidthParent,
                scrollbarWidthChild,
                servicesHeight,
                e = window,
                a = 'inner',
                windowInnerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
                mainTop,
                mainHeight,
                closeButtonHeight,
                headerHeight,
                cookiesListHeight,
                cookiesCloseHeight,
                cookiesTitleHeight,
                paddingBox,
                alertSmallHeight,
                cookiesNumberHeight;

            if (type === 'box') {
                if (document.getElementById('tarteaucitronAlertSmall') !== null && document.getElementById('tarteaucitronCookiesNumber') !== null) {

                    // reset
                    tarteaucitron.userInterface.css('tarteaucitronCookiesNumber', 'padding', '0px 10px');

                    // calculate
                    alertSmallHeight = document.getElementById('tarteaucitronAlertSmall').offsetHeight;
                    cookiesNumberHeight = document.getElementById('tarteaucitronCookiesNumber').offsetHeight;
                    paddingBox = (alertSmallHeight - cookiesNumberHeight) / 2;

                    // apply
                    tarteaucitron.userInterface.css('tarteaucitronCookiesNumber', 'padding', paddingBox + 'px 10px');
                }
            } else if (type === 'main') {

                // get the real window width for media query
                if (window.innerWidth === undefined) {
                    a = 'client';
                    e = document.documentElement || document.body;
                }

                // height of the services list container
                if (document.getElementById('tarteaucitron') !== null && document.getElementById('tarteaucitronClosePanel') !== null && document.getElementById('tarteaucitronMainLineOffset') !== null) {

                    // reset
                    tarteaucitron.userInterface.css('tarteaucitronServices', 'height', 'auto');

                    // calculate
                    mainHeight = document.getElementById('tarteaucitron').offsetHeight;
                    closeButtonHeight = document.getElementById('tarteaucitronClosePanel').offsetHeight;

                    // apply
                    servicesHeight = (mainHeight - closeButtonHeight + 2);
                    tarteaucitron.userInterface.css('tarteaucitronServices', 'height', servicesHeight + 'px');
                    tarteaucitron.userInterface.css('tarteaucitronServices', 'overflow-x', 'auto');
                }

                // align the main allow/deny button depending on scrollbar width
                if (document.getElementById('tarteaucitronServices') !== null && document.getElementById('tarteaucitronScrollbarChild') !== null) {

                    // media query
                    if (e[a + 'Width'] <= 479) {
                        //tarteaucitron.userInterface.css('tarteaucitronScrollbarAdjust', 'marginLeft', '11px');
                    } else if (e[a + 'Width'] <= 767) {
                        scrollbarMarginRight = 12;
                    }

                    scrollbarWidthParent = document.getElementById('tarteaucitronServices').offsetWidth;
                    scrollbarWidthChild = document.getElementById('tarteaucitronScrollbarChild').offsetWidth;
                    //tarteaucitron.userInterface.css('tarteaucitronScrollbarAdjust', 'marginRight', ((scrollbarWidthParent - scrollbarWidthChild) + scrollbarMarginRight) + 'px');
                }

                // center the main panel
                if (document.getElementById('tarteaucitron') !== null) {

                    // media query
                    if (e[a + 'Width'] <= 767) {
                        mainTop = 0;
                    } else {
                        mainTop = ((windowInnerHeight - document.getElementById('tarteaucitron').offsetHeight) / 2) - 21;
                    }

                    if (document.getElementById('tarteaucitronMainLineOffset') !== null) {
                        if (document.getElementById('tarteaucitron').offsetHeight < (windowInnerHeight / 2)) {
                            mainTop -= document.getElementById('tarteaucitronMainLineOffset').offsetHeight;
                        }
                    }

                    // correct
                    if (mainTop < 0) {
                        mainTop = 0;
                    }

                    // apply
                    tarteaucitron.userInterface.css('tarteaucitron', 'top', mainTop + 'px');
                }


            } else if (type === 'cookie') {

                // put cookies list at bottom
                if (document.getElementById('tarteaucitronAlertSmall') !== null) {
                    tarteaucitron.userInterface.css('tarteaucitronCookiesListContainer', 'bottom', (document.getElementById('tarteaucitronAlertSmall').offsetHeight) + 'px');
                }

                // height of cookies list
                if (document.getElementById('tarteaucitronCookiesListContainer') !== null) {

                    // reset
                    tarteaucitron.userInterface.css('tarteaucitronCookiesList', 'height', 'auto');

                    // calculate
                    cookiesListHeight = document.getElementById('tarteaucitronCookiesListContainer').offsetHeight;
                    cookiesCloseHeight = document.getElementById('tarteaucitronClosePanelCookie').offsetHeight;
                    cookiesTitleHeight = document.getElementById('tarteaucitronCookiesTitle').offsetHeight;

                    // apply
                    tarteaucitron.userInterface.css('tarteaucitronCookiesList', 'height', (cookiesListHeight - cookiesCloseHeight - cookiesTitleHeight - 2) + 'px');
                }
            }
        }
    },
    "cookie": {
        "owner": {},
        "create": function (key, status) {
            "use strict";

            if (tarteaucitronForceExpire !== '') {
                // The number of day(s)/hour(s) can't be higher than 1 year
                if ((tarteaucitronExpireInDay && tarteaucitronForceExpire < 365) || (!tarteaucitronExpireInDay && tarteaucitronForceExpire < 8760)) {
                    if (tarteaucitronExpireInDay) {
                        // Multiplication to tranform the number of days to milliseconds
                        timeExpire = tarteaucitronForceExpire * 86400000;
                    } else {
                        // Multiplication to tranform the number of hours to milliseconds
                        timeExpire = tarteaucitronForceExpire * 3600000;
                    }
                }
            }

            var d = new Date(),
                time = d.getTime(),
                expireTime = time + timeExpire, // 365 days
                regex = new RegExp("!" + key + "=(wait|true|false)", "g"),
                cookie = tarteaucitron.cookie.read().replace(regex, ""),
                value = tarteaucitron.parameters.cookieName + '=' + cookie + '!' + key + '=' + status,
                domain = (tarteaucitron.parameters.cookieDomain !== undefined && tarteaucitron.parameters.cookieDomain !== '') ? '; domain=' + tarteaucitron.parameters.cookieDomain : '',
                secure = location.protocol === 'https:' ? '; Secure' : '';

            d.setTime(expireTime);
            document.cookie = value + '; expires=' + d.toGMTString() + '; path=/' + domain + secure + '; samesite=lax';
        },
        "read": function () {
            "use strict";
            var nameEQ = tarteaucitron.parameters.cookieName + "=",
                ca = document.cookie.split(';'),
                i,
                c;

            for (i = 0; i < ca.length; i += 1) {
                c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return '';
        },
        "purge": function (arr) {
            "use strict";
            var i;

            for (i = 0; i < arr.length; i += 1) {

                var rgxpCookie = new RegExp("^(.*;)?\\s*" + arr[i] + "\\s*=\\s*[^;]+(.*)?$");
                if (document.cookie.match(rgxpCookie)) {
                    document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/;';
                    document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname + ';';
                    document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname.split('.').slice(-2).join('.') + ';';
                }
            }
        },
        "checkCount": function (key) {
            "use strict";
            var arr = tarteaucitron.services[key].cookies,
                nb = arr.length,
                nbCurrent = 0,
                html = '',
                i,
                status = document.cookie.indexOf(key + '=true');

            if (status >= 0 && nb === 0) {
                html += tarteaucitron.lang.useNoCookie;
            } else if (status >= 0) {
                for (i = 0; i < nb; i += 1) {
                    if (document.cookie.indexOf(arr[i] + '=') !== -1) {
                        nbCurrent += 1;
                        if (tarteaucitron.cookie.owner[arr[i]] === undefined) {
                            tarteaucitron.cookie.owner[arr[i]] = [];
                        }
                        if (tarteaucitron.cookie.crossIndexOf(tarteaucitron.cookie.owner[arr[i]], tarteaucitron.services[key].name) === false) {
                            tarteaucitron.cookie.owner[arr[i]].push(tarteaucitron.services[key].name);
                        }
                    }
                }

                if (nbCurrent > 0) {
                    html += tarteaucitron.lang.useCookieCurrent + ' ' + nbCurrent + ' cookie';
                    if (nbCurrent > 1) {
                        html += 's';
                    }
                    html += '.';
                } else {
                    html += tarteaucitron.lang.useNoCookie;
                }
            } else if (nb === 0) {
                html = tarteaucitron.lang.noCookie;
            } else {
                html += tarteaucitron.lang.useCookie + ' ' + nb + ' cookie';
                if (nb > 1) {
                    html += 's';
                }
                html += '.';
            }

            if (document.getElementById('tacCL' + key) !== null) {
                document.getElementById('tacCL' + key).innerHTML = html;
            }
        },
        "crossIndexOf": function (arr, match) {
            "use strict";
            var i;
            for (i = 0; i < arr.length; i += 1) {
                if (arr[i] === match) {
                    return true;
                }
            }
            return false;
        },
        "number": function () {
            "use strict";
            var cookies = document.cookie.split(';'),
                nb = (document.cookie !== '') ? cookies.length : 0,
                html = '',
                i,
                name,
                namea,
                nameb,
                c,
                d,
                s = (nb > 1) ? 's' : '',
                savedname,
                regex = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i,
                regexedDomain = (tarteaucitron.cdn.match(regex) !== null) ? tarteaucitron.cdn.match(regex)[1] : tarteaucitron.cdn,
                host = (tarteaucitron.domain !== undefined) ? tarteaucitron.domain : regexedDomain;

            cookies = cookies.sort(function (a, b) {
                namea = a.split('=', 1).toString().replace(/ /g, '');
                nameb = b.split('=', 1).toString().replace(/ /g, '');
                c = (tarteaucitron.cookie.owner[namea] !== undefined) ? tarteaucitron.cookie.owner[namea] : '0';
                d = (tarteaucitron.cookie.owner[nameb] !== undefined) ? tarteaucitron.cookie.owner[nameb] : '0';
                if (c + a > d + b) { return 1; }
                if (c + a < d + b) { return -1; }
                return 0;
            });

            if (document.cookie !== '') {
                for (i = 0; i < nb; i += 1) {
                    name = cookies[i].split('=', 1).toString().replace(/ /g, '');
                    if (tarteaucitron.cookie.owner[name] !== undefined && tarteaucitron.cookie.owner[name].join(' // ') !== savedname) {
                        savedname = tarteaucitron.cookie.owner[name].join(' // ');
                        html += '<div class="tarteaucitronHidden">';
                        html += '     <span class="tarteaucitronTitle tarteaucitronH3" role="heading" aria-level="3">';
                        html += '        ' + tarteaucitron.cookie.owner[name].join(' // ');
                        html += '    </span>';
                        html += '</div><ul class="cookie-list">';
                    } else if (tarteaucitron.cookie.owner[name] === undefined && host !== savedname) {
                        savedname = host;
                        html += '<div class="tarteaucitronHidden">';
                        html += '     <span class="tarteaucitronTitle tarteaucitronH3" role="heading" aria-level="3">';
                        html += '        ' + host;
                        html += '    </span>';
                        html += '</div><ul class="cookie-list">';
                    }
                    html += '<li class="tarteaucitronCookiesListMain">';
                    html += '    <div class="tarteaucitronCookiesListLeft"><button type="button" class="purgeBtn" data-cookie="' + tarteaucitron.fixSelfXSS(cookies[i].split('=', 1)) + '"><strong>&times;</strong></button> <strong>' + tarteaucitron.fixSelfXSS(name) + '</strong>';
                    html += '    </div>';
                    html += '    <div class="tarteaucitronCookiesListRight">' + tarteaucitron.fixSelfXSS(cookies[i].split('=').slice(1).join('=')) + '</div>';
                    html += '</li>';
                }
                html += '</ul>';
            } else {
                html += '<div class="tarteaucitronCookiesListMain">';
                html += '    <div class="tarteaucitronCookiesListLeft"><strong>-</strong></div>';
                html += '    <div class="tarteaucitronCookiesListRight"></div>';
                html += '</div>';
            }

            html += '<div class="tarteaucitronHidden tarteaucitron-spacer-20"></div>';

            if (document.getElementById('tarteaucitronCookiesList') !== null) {
                document.getElementById('tarteaucitronCookiesList').innerHTML = html;
            }

            if (document.getElementById('tarteaucitronCookiesNumber') !== null) {
                document.getElementById('tarteaucitronCookiesNumber').innerHTML = nb;
                document.getElementById('tarteaucitronCookiesNumber').setAttribute("aria-label", nb + ' cookie' + s + " - " + tarteaucitron.lang.toggleInfoBox);
                document.getElementById('tarteaucitronCookiesNumber').setAttribute("title", nb + ' cookie' + s + " - " + tarteaucitron.lang.toggleInfoBox);
            }

            if (document.getElementById('tarteaucitronCookiesNumberBis') !== null) {
                document.getElementById('tarteaucitronCookiesNumberBis').innerHTML = nb + ' cookie' + s;
            }

            var purgeBtns = document.getElementsByClassName("purgeBtn");
            for (i = 0; i < purgeBtns.length; i++) {
                tarteaucitron.addClickEventToElement(purgeBtns[i], function () {
                    tarteaucitron.cookie.purge([this.dataset.cookie]);
                    tarteaucitron.cookie.number();
                    tarteaucitron.userInterface.jsSizing('cookie');
                    return false;
                });
            }

            for (i = 0; i < tarteaucitron.job.length; i += 1) {
                tarteaucitron.cookie.checkCount(tarteaucitron.job[i]);
            }
        }
    },
    "fixSelfXSS": function(html) {
        return html.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    },
    "getLanguage": function () {
        "use strict";

        var availableLanguages = 'ar,bg,ca,cn,cs,da,de,et,el,en,es,fi,fr,hu,it,ja,lt,lv,nl,no,oc,pl,pt,ro,ru,se,sk,sv,tr,uk,vi,zh',
            defaultLanguage = 'en';

        if (tarteaucitronForceLanguage !== '') {
            if (availableLanguages.indexOf(tarteaucitronForceLanguage) !== -1) {
                return tarteaucitronForceLanguage;
            }
        }

        // get the html lang
        if (availableLanguages.indexOf(document.documentElement.getAttribute("lang")) !== -1) {
            return document.documentElement.getAttribute("lang");
        }

        if (!navigator) { return defaultLanguage; }

        var lang = navigator.language || navigator.browserLanguage ||
                navigator.systemLanguage || navigator.userLang || null,
            userLanguage = lang ? lang.substr(0, 2) : null;

        if (availableLanguages.indexOf(userLanguage) !== -1) {
            return userLanguage;
        }

        return defaultLanguage;
    },
    "getLocale": function () {
        "use strict";
        if (!navigator) { return 'en_US'; }

        var lang = navigator.language || navigator.browserLanguage ||
                navigator.systemLanguage || navigator.userLang || null,
            userLanguage = lang ? lang.substr(0, 2) : null;

        if (userLanguage === 'fr') {
            return 'fr_FR';
        } else if (userLanguage === 'en') {
            return 'en_US';
        } else if (userLanguage === 'de') {
            return 'de_DE';
        } else if (userLanguage === 'es') {
            return 'es_ES';
        } else if (userLanguage === 'it') {
            return 'it_IT';
        } else if (userLanguage === 'pt') {
            return 'pt_PT';
        } else if (userLanguage === 'nl') {
            return 'nl_NL';
        } else if (userLanguage === 'el') {
            return 'el_EL';
        } else {
            return 'en_US';
        }
    },
    "addScript": function (url, id, callback, execute, attrName, attrVal, internal) {
        "use strict";
        var script,
            done = false;

        if (execute === false) {
            if (typeof callback === 'function') {
                callback();
            }
        } else {
            script = document.createElement('script');
            script.id = (id !== undefined) ? id : '';
            script.async = true;
            script.src = url;

            if (attrName !== undefined && attrVal !== undefined) {
                script.setAttribute(attrName, attrVal);
            }

            if (typeof callback === 'function') {
                if ( !tarteaucitron.parameters.useExternalJs || !internal ) {
                    script.onreadystatechange = script.onload = function () {
                        var state = script.readyState;
                        if (!done && (!state || /loaded|complete/.test(state))) {
                            done = true;
                            callback();
                        }
                    };
                } else {
                    callback();
                }
            }

            if ( !tarteaucitron.parameters.useExternalJs || !internal ) {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        }
    },
    "addInternalScript": function (url, id, callback, execute, attrName, attrVal) {
        tarteaucitron.addScript(url, id, callback, execute, attrName, attrVal, true);
    },
    "checkIfExist": function (elemId) {
        "use strict";
        return document.getElementById(elemId) !== null && document.getElementById(elemId).offsetWidth !== 0 && document.getElementById(elemId).offsetHeight !== 0;
    },
    "makeAsync": {
        "antiGhost": 0,
        "buffer": '',
        "init": function (url, id) {
            "use strict";
            var savedWrite = document.write,
                savedWriteln = document.writeln;

            document.write = function (content) {
                tarteaucitron.makeAsync.buffer += content;
            };
            document.writeln = function (content) {
                tarteaucitron.makeAsync.buffer += content.concat("\n");
            };

            setTimeout(function () {
                document.write = savedWrite;
                document.writeln = savedWriteln;
            }, 20000);

            tarteaucitron.makeAsync.getAndParse(url, id);
        },
        "getAndParse": function (url, id) {
            "use strict";
            if (tarteaucitron.makeAsync.antiGhost > 9) {
                tarteaucitron.makeAsync.antiGhost = 0;
                return;
            }
            tarteaucitron.makeAsync.antiGhost += 1;
            tarteaucitron.addInternalScript(url, '', function () {
                if (document.getElementById(id) !== null) {
                    document.getElementById(id).innerHTML += "<span class='tarteaucitron-display-none'>&nbsp;</span>" + tarteaucitron.makeAsync.buffer;
                    tarteaucitron.makeAsync.buffer = '';
                    tarteaucitron.makeAsync.execJS(id);
                }
            });
        },
        "execJS": function (id) {
            /* not strict because third party scripts may have errors */
            var i,
                scripts,
                childId,
                type;

            if (document.getElementById(id) === null) {
                return;
            }

            scripts = document.getElementById(id).getElementsByTagName('script');
            for (i = 0; i < scripts.length; i += 1) {
                type = (scripts[i].getAttribute('type') !== null) ? scripts[i].getAttribute('type') : '';
                if (type === '') {
                    type = (scripts[i].getAttribute('language') !== null) ? scripts[i].getAttribute('language') : '';
                }
                if (scripts[i].getAttribute('src') !== null && scripts[i].getAttribute('src') !== '') {
                    childId = id + Math.floor(Math.random() * 99999999999);
                    document.getElementById(id).innerHTML += '<div id="' + childId + '"></div>';
                    tarteaucitron.makeAsync.getAndParse(scripts[i].getAttribute('src'), childId);
                } else if (type.indexOf('javascript') !== -1 || type === '') {
                    eval(scripts[i].innerHTML);
                }
            }
        }
    },
    "fallback": function (matchClass, content, noInner) {
        "use strict";
        var elems = document.getElementsByTagName('*'),
            i,
            index = 0;

        for (i in elems) {
            if (elems[i] !== undefined) {
                for (index = 0; index < matchClass.length; index += 1) {
                    if ((' ' + elems[i].className + ' ')
                            .indexOf(' ' + matchClass[index] + ' ') > -1) {
                        if (typeof content === 'function') {
                            if (noInner === true) {
                                content(elems[i]);
                            } else {
                                elems[i].innerHTML = content(elems[i]);
                            }
                        } else {
                            elems[i].innerHTML = content;
                        }
                    }
                }
            }
        }
    },
    "engage": function (id) {
        "use strict";
        var html = '',
            r = Math.floor(Math.random() * 100000),
            engage = tarteaucitron.services[id].name + ' ' + tarteaucitron.lang.fallback;

        if (tarteaucitron.lang['engage-' + id] !== undefined) {
            engage = tarteaucitron.lang['engage-' + id];
        }

        html += '<div class="tac_activate tac_activate_' + id + '">';
        html += '   <div class="tac_float">';
        html += '      ' + engage;
        html += '      <button type="button" class="tarteaucitronAllow" id="Eng' + r + 'ed' + id + '">';
        html += '          <span class="tarteaucitronCheck" aria-hidden="true"></span> ' + tarteaucitron.lang.allow;
        html += '       </button>';
        html += '   </div>';
        html += '</div>';

        return html;
    },
    "extend": function (a, b) {
        "use strict";
        var prop;
        for (prop in b) {
            if (b.hasOwnProperty(prop)) {
                a[prop] = b[prop];
            }
        }
    },
    "proTemp": '',
    "proTimer": function () {
        "use strict";
        setTimeout(tarteaucitron.proPing, 500);
    },
    "pro": function (list) {
        "use strict";
        tarteaucitron.proTemp += list;
        clearTimeout(tarteaucitron.proTimer);
        tarteaucitron.proTimer = setTimeout(tarteaucitron.proPing, 500);
    },
    "proPing": function () {
        "use strict";
        if (tarteaucitron.uuid !== '' && tarteaucitron.uuid !== undefined && tarteaucitron.proTemp !== '' && tarteaucitronStatsEnabled) {
            var div = document.getElementById('tarteaucitronPremium'),
                timestamp = new Date().getTime(),
                url = 'https://tarteaucitron.io/log/?';

            if (div === null) {
                return;
            }

            url += 'account=' + tarteaucitron.uuid + '&';
            url += 'domain=' + tarteaucitron.domain + '&';
            url += 'status=' + encodeURIComponent(tarteaucitron.proTemp) + '&';
            url += '_time=' + timestamp;

            div.innerHTML = '<img src="' + url + '" class="tarteaucitron-display-none" alt="" />';

            tarteaucitron.proTemp = '';
        }

        tarteaucitron.cookie.number();
    },
    "AddOrUpdate" : function(source, custom){
        /**
         Utility function to Add or update the fields of obj1 with the ones in obj2
         */
        for(var key in custom){
            if(custom[key] instanceof Object){
                source[key] = tarteaucitron.AddOrUpdate(source[key], custom[key]);
            }else{
                source[key] = custom[key];
            }
        }
        return source;
    },
    "getElemWidth": function(elem) {
        return elem.getAttribute('width') || elem.clientWidth;
    },
    "getElemHeight": function(elem) {
        return elem.getAttribute('height') || elem.clientHeight;
    },
    "getElemAttr": function (elem, attr) {
        return elem.getAttribute('data-' + attr) || elem.getAttribute(attr);
    },
    "addClickEventToId": function (elemId, func) {
        tarteaucitron.addClickEventToElement(document.getElementById(elemId), func);
    },
    "addClickEventToElement": function (e, func) {
        if (e) {
            if (e.addEventListener) {
                e.addEventListener("click", func);
            } else {
                e.attachEvent("onclick", func);
            }
        }
    },
    "triggerJobsAfterAjaxCall": function() {
        tarteaucitron.job.forEach(function(e) { tarteaucitron.job.push(e) });
        var i;
        var allowBtns = document.getElementsByClassName("tarteaucitronAllow");
        for (i = 0; i < allowBtns.length; i++) {
            tarteaucitron.addClickEventToElement(allowBtns[i], function () {
                tarteaucitron.userInterface.respond(this, true);
            });
        }
        var denyBtns = document.getElementsByClassName("tarteaucitronDeny");
        for (i = 0; i < denyBtns.length; i++) {
            tarteaucitron.addClickEventToElement(denyBtns[i], function () {
                tarteaucitron.userInterface.respond(this, false);
            });
        }
    }
};


/* Embedded language: ar */
/*global tarteaucitron */
tarteaucitron.languages["ar"] = {

    "middleBarHead": "☝ 🍪",
    "adblock": "مرحبا! يلعب هذا الموقع الكتروني على الشفافية ويمنحك اختيار خدمات الطرف الثالث للتفعيل.",
    "adblock_call": "يرجى إلغاء تنشيط adblocker لبدء التخصيص.",
    "reload": "أعد تحميل الصفحة",
    
    "alertBigScroll": "من خلال الاستمرار في العرض",
    "alertBigClick": "من خلال إستمرارك بالتصفُّح على هذا الموقع",
    "alertBig": "أنت توافق استخدام خدمات الطرف الثالث التي يمكنها تثبيت ملفات تعريف الارتباط",
    
    "alertBigPrivacy": "يستخدم هذا الموقع ملفات تعريف الارتباط ويمنحك التحكم في تلك التي تريد تنشيطها",
    "alertSmall": "إدارة الخدمات",
    "acceptAll": "تقبل كل شيء",
    "personalize": "تخصيص",
    "close": "اغلاق",

    "privacyUrl": "سياسة الخصوصية",

    "all": "التفضيلات لجميع الخدمات",

    "info": "حماية خصوصيتك",
    "disclaimer": "من خلال تفويض هذه خدمات الطرف الثالث  ، فإنك تقبل إيداع وقراءة ملفات تعريف الارتباط واستخدام تقنيات المراقبة اللازمة لعملها بشكل صحيح",
    "allow": "سماح",
    "deny": "منع",
    "noCookie": "لا تقوم هذه الخدمة بإيداع أي ملفات تعريف ارتباط",
    "useCookie": "يمكن لهذه الخدمة الإيداع",
    "useCookieCurrent": "قدَّمت هذه الخدمة",
    "useNoCookie": "لم تودع هذه الخدمة أي ملفات تعريف ارتباط.",
    "more": "اقرأ المزيد",
    "source": "شاهد الموقع الرسمي",
    "credit": "إدارة ملفات تعريف الارتباط من قبل tarteaucitron.js",
    "noServices": "لا يستخدم هذا الموقع أي ملفات تعريف ارتباط تتطلب موافقتك.",

    "toggleInfoBox": "إظهار/إخفاء معلومات حول تخزين ملفات تعريف الارتباط",
    "title": "لوحة إدارة ملفات تعريف الارتباط",
    "cookieDetail": "تفاصيل ملفات تعريف الارتباط",
    "ourSite": "على موقعنا على الانترنت",
    "modalWindow": "(نافذة شكلية)",
    "newWindow": "(نافذة جديدة)",
    "allowAll": "قبول كل شيء",
    "denyAll": "رفض كل شيء",

    "icon": "ملفات تعريف الارتباط",
    
    "fallback": "معطل.",
    "allowed": "مسموح",
    "disallowed": "ممنوع",

    "ads": {
        "title": "وكالات الإعلان",
        "details": "تجعل وكالات الإعلان من الممكن تحقيق إيرادات من خلال تسويق المساحة الإعلانية على الموقع"
    },
    "analytic": {
        "title": "قياس الجمهور",
        "details": "تسمح خدمات قياس الجمهور بانشاء إحصاءآت حول حركة المرور المفيذة  لتحسين الموقع"
    },
    "social": {
        "title": "الشبكات الاجتماعية",
        "details": "تعمل الشبكات الاجتماعية على تحسين سهولة استخدام الموقع وتساعد في الترويج له من خلال المشاركة."
    },
    "video": {
        "title": "الفيديوهات",
        "details": "تعمل خدمات مشاركة الفيديو على إثراء الموقع بمحتوى الوسائط المتعددة وزيادة ظهوره."
    },
    "comment": {
        "title": "تعليقات",
        "details": "يقوم مديري التعليق بتسهيل إيداع تعليقاتك ومحاربة البريد المزعج."
    },
    "support": {
        "title": "الدعم",
        "details": "تسمح لك خدمات الدعم بالتواصل مع فريق الموقع ومساعدة تحسينه."
    },
    "api": {
        "title": "واجهات برمجة التطبيقات",
        "details": "تسمح لك واجهات برمجة التطبيقات بتحميل البرامج النصية: تحديد الموقع الجغرافي ، ومحركات البحث ، والترجمات ، ..."
    },
    "other": {
        "title": "آخر",
        "details": "خدمات لعرض محتوى الويب"
    },
    
    "mandatoryTitle": "ملفات تعريف الارتباط الإلزامية",
    "mandatoryText": "يستخدم هذا الموقع ملفات تعريف الارتباط الضرورية لعمله بشكل صحيح. لا يمكن تعطيلها"
};

/* Embedded language: bg */
/*global tarteaucitron */
tarteaucitron.languages["bg"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Здравей! Този сайт позволяа включването на бисквитки по избор.",
    "adblock_call": "Моля изключете вашият adblocker и изберете бисквитките които искате, или спрете всички.",
    "reload": "Презареди",
    
    "alertBigScroll": "Ако продължавате да скролвате,",
    "alertBigClick": "Ако продължавате да използвате този сайт,",
    "alertBig": "вив се съгласявате с всички бисквитки от трети лица.",
    
    "alertBigPrivacy": "Този сайт използва бисквитки и Ви дава право да изберете записването на определени или всички.",
    "alertSmall": "Управление на услуги",
    "personalize": "Ще избирам",
    "acceptAll": "ОК, приемам всички",
    "close": "Затвори",

    "privacyUrl": "Политика за поверителност",
    
    "all": "Услуги които записват бисквитки на този сайт",

    "info": "Зашитава вашата сигурност",
    "disclaimer": "Позволяването на тези бисквитки от трети лица, Вие приемате те да записват и използват услуги за проследяване нужни за правилното им функциониране.",
    "allow": "Разшреши",
    "deny": "Забрани",
    "noCookie": "Тази услуга не записва бисквитки.",
    "useCookie": "Тази услуга може да запише",
    "useCookieCurrent": "Тази услуга е записала",
    "useNoCookie": "Тази услуга не е записала бисквитки.",
    "more": "Прочети повече",
    "source": "Официален сайт",
    "credit": "Управление на бисквитките от tarteaucitron.js",

    "toggleInfoBox": "Покажи/скрий информация за записването на бисквитки",
    "title": "Управление на бисквитките",
    "cookieDetail": "Информация за",
    "ourSite": "в нашият сайт",
    "modalWindow": "(модален прозорец)",
    "newWindow": "(нов прозорец)",
    "allowAll": "Разреши всички",
    "denyAll": "Забрани всички",

    "icon": "Cookies",
    
    "fallback": "е изключен.",
    "allowed": "Позволен",
    "disallowed": "Забранено",

    "ads": {
        "title": "Рекламодатели",
        "details": "Ad networks can generate revenue by selling advertising space on the site."
    },
    "analytic": {
        "title": "Аналитични",
        "details": "The audience measurement services used to generate useful statistics attendance to improve the site."
    },
    "social": {
        "title": "Социални",
        "details": "Social networks can improve the usability of the site and help to promote it via the shares."
    },
    "video": {
        "title": "Видео платформи",
        "details": "Video sharing services help to add rich media on the site and increase its visibility."
    },
    "comment": {
        "title": "Коментари",
        "details": "Comments managers facilitate the filing of comments and fight against spam."
    },
    "support": {
        "title": "Поддръжка",
        "details": "Support services allow you to get in touch with the site team and help to improve it."
    },
    "api": {
        "title": "Функционални",
        "details": "APIs are used to load scripts: geolocation, search engines, translations, ..."
    },
    "other": {
        "title": "Други",
        "details": "Services to display web content."
    },
    
    "mandatoryTitle": "Mandatory cookies",
    "mandatoryText": "This site uses cookies necessary for its proper functioning which cannot be deactivated."
};


/* Embedded language: ca */
/*global tarteaucitron */
tarteaucitron.languages["ca"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Hola! Aquest lloc web és transparent i et dóna l'opció d'activar els serveis de tercers",
    "adblock_call": "Si us plau desactiva la teva AdBlocker per començar a personalitzar els serveis.",
    "reload": "Recarrega aquesta pàgina",
    
    "alertBigScroll": "Al continuar desplaçant,",
    "alertBigClick": "Si continues navegant en aquest lloc web,",
    "alertBig": "estàs permetent serveis tercers",
    
    "alertBigPrivacy": "Aquest lloc web fa servir galetes i et permet controlar les que vols activar",
    "alertSmall": "Gestionar serveis",
    "personalize": "Personalitzar",
    "acceptAll": "OK, acceptar totes",
    "close": "Tancar",

    "privacyUrl": "Política de privacitat",
    
    "all": "Ajustaments per a tots els serveis",

    "info": "Protegint la teva privacitat",
    "disclaimer": "Acceptant aquests serveis de tercers, estàs acceptant les seves galetes i l'ús de tecnologies de rastreig necessàries per al seu correcte funcionament.",
    "allow": "Permetre",
    "deny": "Denegar",
    "noCookie": "Aquest servei no fa servir galetes.",
    "useCookie": "Aquest servei pot instal·lar",
    "useCookieCurrent": "Aquest servei ha instal·lat",
    "useNoCookie": "Aquest servei no ha instal·lat cap galeta.",
    "more": "Llegir més",
    "source": "Veure lloc web oficial",
    "credit": "Gestor de galetes realitzat per tarteaucitron.js",

    "toggleInfoBox": "Mostra / oculta la informació sobre emmagatzematge de galetes",
    "title": "Panell de gestió de galetes",
    "cookieDetail": "Detalls de les galetes per a",
    "ourSite": "en la nostra web",
    "modalWindow": "(finestra modale)",
    "newWindow": "(finestra nova)",
    "allowAll": "Permet totes les galetes",
    "denyAll": "Denega totes les galetes",

    "icon": "Cookies",
    
    "fallback": "està deshabilitat.",
    "allowed": "Permès",
    "disallowed": "Desautoritzat",

    "ads": {
        "title": "Xarxa de publicitat",
        "details": "Les xarxes publicitàries poden generar ingressos mitjançant la venda d'espais publicitaris en el lloc."
    },
    "analytic": {
        "title": "Mesura d'audiència",
        "details": "Els serveis de mesurament d'audiència s'usen per generar estadístiques útils per millorar el lloc."
    },
    "social": {
        "title": "Xarxes socials",
        "details": "Les xarxes socials poden augmentar la usabilitat del lloc web i ajudar a promoure-ho a través de la contribució."
    },
    "video": {
        "title": "Videos",
        "details": "Els serveis per compartir vídeos ajuden a afegir contingut enriquit en el lloc web i augmentar la seva visibilitat."
    },
    "comment": {
        "title": "Comentaris",
        "details": "El gestor de comentaris facilita la classificació de comentaris i lluitar contra robots de correu."
    },
    "support": {
        "title": "Suport",
        "details": "Els serveis de suport et permeten contactar amb el lloc web i ajudar a millorar-lo"
    },
    "api": {
        "title": "APIs",
        "details": "Les APIs s'utilitzen per carregar scripts: geolocalització, motor de cerca, traduccions, ..."
    },
    "other": {
        "title": "Altres",
        "details": "Serveis per mostrar contingut web."
    },
    
    "mandatoryTitle": "Galetes obligatòries",
    "mandatoryText": "Aquest lloc utilitza galetes necessàries per al seu correcte funcionament que no es poden desactivar (cookies tècniques)."
};


/* Embedded language: cn */
/*global tarteaucitron */
tarteaucitron.languages["cn"] = {
    "adblock": "您好！这是一个透明的网站，您可以选择激活不同的第三方服务。",
    "adblock_call": "感谢您停用广告拦截功能并开始个性化设置。",
    "reload": "重新加载页面",

    "alertBigScroll": "继续划屏，",
    "alertBigClick": "继续浏览，",
    "alertBig": "即表示您同意第三方服务安装cookie",

    "alertBigPrivacy": "这个网站使用cookie， 并让您可以控制想要激活的内容。",
    "alertSmall": "服务管理",
    "acceptAll": "好的，全部接受",
    "personalize": "个性化",
    "close": "关闭",

    "privacyUrl": "保密政策",

    "all": "所有服务的偏好设置",

    "disclaimer": "通过授权这些第三方服务，您同意存储和读取cookie，并使用其正常运行所需的跟踪技术。",
    "allow": "允许",
    "deny": "禁用",
    "noCookie": "此服务不存储任何cookie。",
    "useCookie": "此服务可以存储",
    "useCookieCurrent": "此服务已存储",
    "useNoCookie": "此服务未存储任何cookie。",
    "more": "了解更多",
    "source": "查看官网",
    "credit": "通过tarteaucitron.js管理cookie",

    "toggleInfoBox": "显示/隐藏cookie存储信息。",
    "title": "Cookie管理面板",
    "cookieDetail": "Cookie详情",
    "ourSite": "显示在我们的网站上",
    "modalWindow": "（模态窗口）",
    "newWindow": "（新建窗口）",
    "allowAll": "允许",
    "denyAll": "禁用",

    "icon": "Cookies",

    "fallback": "已禁用。",
    "allowed": "允许的",
    "disallowed": "不允许的",

    "ads": {
        "title": "广告组",
        "details": "广告组通过营销网站上的广告空间来产生收入."
    },
    "analytic": {
        "title": "受众测量",
        "details": "受众测量服务可以生成对站点改进有用的访问统计数据。"
    },
    "social": {
        "title": "社交网络",
        "details": "社交网络有助于提高网站的用户友好性，并通过分享帮助推广。"
    },
    "video": {
        "title": "视频",
        "details": "视频共享服务丰富网站的多媒体内容，提高网站知名度。"
    },
    "comment": {
        "title": "评论",
        "details": "评论管理器使您的评论更容易提交，并避免垃圾邮件。"
    },
    "support": {
        "title": "支持",
        "details": "支持服务使您能够与网站团队联系并帮助改进网站."
    },
    "api": {
        "title": "API",
        "details": "API允许加载脚本：地理位置、搜索引擎、翻译……"
    },
    "other": {
        "title": "其他",
        "details": "旨在显示网页内容的服务。"
    },
    
    "mandatoryTitle": "Mandatory cookies",
    "mandatoryText": "This site uses cookies necessary for its proper functioning which cannot be deactivated."
};


/* Embedded language: cs */
/*global tarteaucitron */
tarteaucitron.languages["cs"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Ahoj! Tato stránka je transparetní a umožňuje ti si přímo vybrat, jaké služby třetích stran chceš povolit.",
    "adblock_call": "Pro úpravu osobních preferencí si, prosím, vypni adblock.",
    "reload": "Načíst stránku znovu",
    
    "alertBigScroll": "Pokračováním ve scrollování,",
    "alertBigClick": "Pokud pokračujete v brouzdání našich stránek,",
    "alertBig": "povolujete všechny služby třetích stran.",
    
    "alertBigPrivacy": "Tato stránka využívá cookies a dává ti na výběr, co chceš aktivovat",
    "alertSmall": "Spravovat služby",
    "personalize": "Přizpůsobit",
    "acceptAll": "OK, přijmout vše",
    "close": "Zavřít",

    "privacyUrl": "Zásady ochrany osobních údajů",
    
    "all": "Nastavení všech služeb",

    "info": "Chrání tvé soukromí",
    "disclaimer": "Povolením těchto služeb třetích stran, přijímáš jejich cookies, jež jsou nezbytné pro řádné fungování jejich technologií.",
    "allow": "Povolit",
    "deny": "Zamítnout",
    "noCookie": "Tato služba nepoužívá cookies.",
    "useCookie": "Tato služba může nainstalovat",
    "useCookieCurrent": "Tato služba nainstalovala",
    "useNoCookie": "Tato služba nenainstalovala žádné cookies.",
    "more": "Dozvědět se více",
    "source": "Zobrazit oficiální stránku",
    "credit": "Správce cookies od tarteaucitron.js",

    "toggleInfoBox": "Zobrazit/skrýt informace o ukládání souborů cookie",
    "title": "Panel pro správu cookies",
    "cookieDetail": "Podrobnosti o souboru cookie pro",
    "ourSite": "na našem webu",
    "modalWindow": "(modální okno)",
    "newWindow": "(nové okno)",
    "allowAll": "Povolit všechny soubory cookie",
    "denyAll": "Odmítnout všechny cookies",

    "icon": "Cookies",
    
    "fallback": "je vypnutý.",
    "allowed": "povoleno",
    "disallowed": "nepovoleno",

    "ads": {
        "title": "Reklamní síť",
        "details": "Prodejem reklamních ploch na této stránce mohou reklamní sítě vydělávat peníze."
    },
    "analytic": {
        "title": "Statistika návštěvnosti",
        "details": "Služby pro analýzu návštěvníků slouží k vytvoření užitečných statistik návštěvnosti. Ty zase slouží ke zlepšení stránky."
    },
    "social": {
        "title": "Sociální sítě",
        "details": "Sociální sítě mohou usnadnit práci se stránkou a pomáhají jí prosadit se pomocí sdílení."
    },
    "video": {
        "title": "Videa",
        "details": "Video-hostingové služby pomáhají přidat na stránku bohaté mediální prvky."
    },
    "comment": {
        "title": "Komentáře",
        "details": "Správce komentářů zajišťují vyplňování komentářů a bojují proti šíření spamu."
    },
    "support": {
        "title": "Podpora",
        "details": "Služby podpory ti pomáhají spojit se s týmem stojícím za stránkou a umožňují ti vyjádřit se k jejím nedostatkům."
    },
    "api": {
        "title": "API",
        "details": "API slouží k načtění skriptů: geolokace, vyhledávačů, překladů, ..."
    },
    "other": {
        "title": "Jiný",
        "details": "Služby pro zobrazení webového obsahu."
    },
    
    "mandatoryTitle": "Mandatory cookies",
    "mandatoryText": "This site uses cookies necessary for its proper functioning which cannot be deactivated."
};


/* Embedded language: da */
/*global tarteaucitron */
tarteaucitron.languages["da"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Hej! Dette sted er gennemsigtigt og giver dig mulighed for at vælge de tredjeparts tjenester, du vil tillade.",
    "adblock_call": "Deaktiver venligst din adblocker for at begynde tilpasningen.",
    "reload": "Opdater siden",

    "alertBigScroll": "Ved at fortsætte med at scrolle,",
    "alertBigClick": "Hvis du fortsætter med at bruge dette websted,",
    "alertBig": "tillader du alle tredjeparts tjenester",

    "alertBigPrivacy": "Dette websted bruger cookies og giver dig kontrol over, hvad du vil aktivere",
    "alertSmall": "Administrer tjenester",
    "personalize": "Tilpas",
    "acceptAll": "OK, accepter alle",
    "close": "Luk",

    "privacyUrl": "Fortrolighedspolitik",

    "all": "Præference for alle tjenester",

    "info": "Beskyttelse af dit privatliv",
    "disclaimer": "Ved at tillade disse tredjeparts tjenester accepterer du deres cookies og brugen af sporingsteknologier, der er nødvendige for, at de fungerer korrekt.",
    "allow": "Tillad",
    "deny": "Afvis ",
    "noCookie": "Denne service bruger ikke cookies",
    "useCookie": "Denne service kan installere",
    "useCookieCurrent": "Denne service er installeret",
    "useNoCookie": "Denne service har ikke installeret nogen cookie.",
    "more": "Læs mere",
    "source": "Se det officielle websted",
    "credit": "Cookies manager af tarteaucitron.js",
    "noServices": "Dette websted bruger ikke nogen cookie, der kræver dit samtykke.",

    "toggleInfoBox": "Vis / skjul informationer om opbevaring af cookies",
    "title": "CCookie-styringspanel",
    "cookieDetail": "Cookie detaljer for",
    "ourSite": "på vores site",
    "modalWindow": "(modal vindue)",
    "newWindow": "(nyt vindue)",
    "allowAll": "Tillad alle cookies",
    "denyAll": "Afvis alle cookies",

    "icon": "Cookies",

    "fallback": "er deaktiveret.",
    "allowed": "tilladt",
    "disallowed": "ikke tilladt",

    "ads": {
        "title": "Annonceringsnetværk",
        "details": "Annoncenetværk kan generere indtægter ved at sælge annonceplads på webstedet."
    },
    "analytic": {
        "title": "Måling af målgruppen",
        "details": "Målingstjenesterne bruges til at generere nyttig statistisk til at forbedre webstedet."
    },
    "social": {
        "title": "Sociale netværk",
        "details": "Sociale netværk kan forbedre anvendeligheden af webstedet og hjælpe med at markedsføre det via aktierne."
    },
    "video": {
        "title": "Videoer",
        "details": "Videodelingstjenester hjælper med at tilføje rige medier på webstedet og øger dets synlighed."
    },
    "comment": {
        "title": "Kommentarer",
        "details": "Kommentarledere letter arkiveringen af kommentarer og bekæmper spam."
    },
    "support": {
        "title": "Support",
        "details": "Supporttjenester giver dig mulighed for at komme i kontakt med webstedsteamet og hjælpe med at forbedre det."
    },
    "api": {
        "title": "APIer",
        "details": "AAPI'er bruges til at indlæse scripts: geolokalisation, søgemaskiner, oversættelser, ..."
    },
    "other": {
        "title": "Andet",
        "details": "Tjenester til visning af webindhold."
    },
    
    "mandatoryTitle": "Mandatory cookies",
    "mandatoryText": "This site uses cookies necessary for its proper functioning which cannot be deactivated."
};


/* Embedded language: de */
/*global tarteaucitron */
tarteaucitron.languages["de"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Hallo! Diese Seite ist transparent und lässt Ihnen die Wahl der externen Services, die aktiviert werden dürfen.",
    "adblock_call": "Bitte deaktivieren Sie Ihren 'Werbeblocker' um Cookie-Einstellungen vornehmen zu können.",
    "reload": "Seite neu laden",
    
    "alertBigScroll": "Durch weiterblättern,",
    "alertBigClick": "Wenn Sie diese Webseite benutzen,",
    "alertBig": "stimmen Sie der Benutzung von externen Diensten zu",
    
    "alertBigPrivacy": "Diese Webseite verwendet 'Cookies' um Inhalte und Anzeigen zu personalisieren und zu analysieren. Bestimmen Sie, welche Dienste benutzt werden dürfen",
    "alertSmall": "Datenschutz-Einstellungen",
    "personalize": "Personalisieren",
    "acceptAll": "Alle akzeptieren",
    "close": "Schließen",

    "privacyUrl": "Datenschutzbestimmungen",
    
    "all": "Einstellungen für alle Dienste",

    "info": "Schutz der Privatsphäre",
    "disclaimer": "Wenn Sie diese Dienste nutzen, erlauben Sie deren 'Cookies' und Tracking-Funktionen, die zu ihrer ordnungsgemäßen Funktion notwendig sind.",
    "allow": "Erlauben",
    "deny": "Ablehnen",
    "noCookie": "Dieser Dienst nutzt keine 'Cookies'.",
    "useCookie": "Dieser Dienst kann 'Cookies' verwenden",
    "useCookieCurrent": "Dieser Dienst verwendet",
    "useNoCookie": "Dieser Dienst hat keine 'Cookies' installiert.",
    "more": "Weiter lesen",
    "source": "Zur offiziellen Webseite",
    "credit": "Cookie Manager von tarteaucitron.js",

    "toggleInfoBox": "Zeige/Verberge Cookie-Einstellungen",
    "title": "Cookie-Einstellungen",
    "cookieDetail": "Cookie Details für",
    "ourSite": "auf unserer Seite",
    "modalWindow": "(modales Fenster)",
    "newWindow": "(neues Fenster)",
    "allowAll": "Erlaube alle Cookies",
    "denyAll": "Verbiete alle Cookies",

    "icon": "Cookies",
    
    "fallback": "ist deaktiviert.",
    "allowed": "erlaubt",
    "disallowed": "nicht erlaubt",

    "ads": {
        "title": "Werbenetzwerke",
        "details": "Werbenetzwerke können mit dem Verkauf von Werbeplatzierungen auf der Seite Einnahmen erhalten."
    },
    "analytic": {
        "title": "Besucher Zähldienste",
        "details": "Die verwendeten Besucher Zähldienste generieren Statistiken die dabei helfen, die Seite zu verbessern."
    },
    "social": {
        "title": "Soziale Netzwerke",
        "details": "Soziale Netzwerke können die Benutzbarkeit der Seite verbessern und ihren Bekanntheitsgrad erhöhen."
    },
    "video": {
        "title": "Videos",
        "details": "Videoplattformen erlauben Videoinhalte einzublenden und die Sichtbarkeit der Seite zu erhöhen."
    },
    "comment": {
        "title": "Kommentare",
        "details": "Kommentar Manager erleichtern die Organisation von Kommentaren und helfen dabei Spam zu verhindern."
    },
    "support": {
        "title": "Support",
        "details": "Support Dienste erlauben es die Urheber der Seite zu kontaktieren und sie zu verbessern."
    },
    "api": {
        "title": "APIs",
        "details": "APIs werden benutzt um Skripte zu laden, wie: Geolokalisierung, Suchmaschinen, Übersetzungen, ..."
    },
    "other": {
        "title": "Andere",
        "details": "Dienste zum Anzeigen von Web-Inhalten."
    },
    
    "mandatoryTitle": "Notwendige Cookies",
    "mandatoryText": "Diese Seite nutzt Cookies, um die Bedienung der Website zu ermöglichen, diese können nicht deaktiviert werden"
};


/* Embedded language: el */
/*global tarteaucitron */
tarteaucitron.languages["el"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Γεια σας! Ο ιστότοπος αυτός σας επιτρέπει να επιλέξετε τις υπηρεσίες που παρέχονται από τρίτους που θα θέλατε να επιτρέψετε.",
    "adblock_call": "Παρακαλώ απενεργοποιήστε τα προγράμματα απόρριψης διαφημίσεων για να ξεκινήσετε τις τροποποιήσεις σας.",
    "reload": "Ανανέωση της σελίδας",
    
    "alertBigScroll": "Συνεχίζοντας την ανάγνωση (κύλιση) της σελίδας,",
    "alertBigClick": "Αν συνεχίσετε την περιήγηση σας στον ιστότοπο,",
    "alertBig": "επιτρέπετε όλες τις υπηρεσίες που παρέχονται από τρίτους",
    
    "alertBigPrivacy": "Ο ιστότοπος αυτός χρησιμοποιεί &quot;μπισκότα&quot; (cookies) και σας επιτρέπει να ελέγξετε τι θέλετε να ενεργοποιήσετε",
    "alertSmall": "Διαχείριση υπηρεσιών",
    "personalize": "Εξατομίκευση",
    "acceptAll": "OK, αποδοχή όλων",
    "close": "Κλείσιμο",

    "privacyUrl": "Πολιτική απορρήτου",
    
    "all": "Προτίμηση για όλες τις υπηρεσίες",

    "info": "Προστασία των προσωπικών σας δεδομένων",
    "disclaimer": "Επιτρέποντας αυτές τις υπηρεσίες που παρέχονται από τρίτους, αποδέχεστε τα &quot;μπισκότα&quot; (cookies) τους καθώς και τη χρήση τεχνολογιών παρακολούθησης που είναι απαραίτητες για τη λειτουργία τους.",
    "allow": "Επέτρεψε",
    "deny": "Απόρριψε",
    "noCookie": "Η υπηρεσία αυτή δε χρησιμοποιεί &quot;μπισκότα&quot; (cookies).",
    "useCookie": "Η υπηρεσία αυτή μπορεί να αποθηκεύσει ",
    "useCookieCurrent": "Η υπηρεσία αυτή έχει αποθηκεύσει ",
    "useNoCookie": "Η υπηρεσία αυτή δεν έχει αποθηκεύσει κανένα &quot;μπισκότο&quot; (cookie).",
    "more": "Διαβάστε περισσότερα",
    "source": "Δείτε τον επίσημο ιστότοπο",
    "credit": "Cookies manager by tarteaucitron.js",

    "toggleInfoBox": "Προβολή/Απόκρυψη πληροφοριών για την αποθήκευση &quot;μπισκότων&quot; (cookies)",
    "title": "Πίνακας διαχείρισης &quot;Μπισκότων&quot; (Cookies)",
    "cookieDetail": "Λεπτομέρειες &quot;μπισκότων&quot; (cookies) για",
    "ourSite": "στον ιστότοπο μας",
    "modalWindow": "(modal παράθυρο)",
    "newWindow": "(νέο παράθυρο)",
    "allowAll": "Επέτρεψε όλα τα &quot;μπισκότα&quot; (cookies)",
    "denyAll": "Απόρριψε όλα τα &quot;μπισκότα&quot; (cookies)",

    "icon": "Cookies",
    
    "fallback": "είναι απενεργοποιημένο.",
    "allowed": "επιτρέπεται",
    "disallowed": "απαγορεύεται",

    "ads": {
        "title": "Διαφημιστικό Δίκτυο",
        "details": "Τα διαφημιστικά δίκτυα μπορούν να αποφέρουν εισόδημα πουλώντας διαφημιστικό χώρο στη σελίδα."
    },
    "analytic": {
        "title": "Μετρήσεις κοινού",
        "details": "Οι υπηρεσίες μέτρησης κοινού χρησιμοποιούνται για τον υπολογισμό χρήσιμων στατιστικών επισκεψιμότητας του ιστοτόπου για την βελτίωση του."
    },
    "social": {
        "title": "Κοινωνικά δίκτυα",
        "details": "Τα κοινωνικά δίκτυα μπορούν να βελτιώσουν την χρηστικότητα του ιστοτόπου και να τον προωθήσουν μέσω κοινοποιήσεων."
    },
    "video": {
        "title": "Βίντεο",
        "details": "Υπηρεσίες διαμοιρασμού βίντεο που βοηθούν να παρουσιαστεί πλούσιο περιεχόμενο στον ιστότοπο και να αυξήσουν την αναγνωρισιμότητα του."
    },
    "comment": {
        "title": "Σχόλια",
        "details": "Οι διαχειριστές σχολίων βοηθούν την καταχώρηση σχολίων και προστατεύουν από κακόβουλες ενέργειες."
    },
    "support": {
        "title": "Υποστήριξη",
        "details": "Οι υποστηρικτικές υπηρεσίες σας επιτρέπουν να επικονωνείτε με την ομάδα υποστήριξης του ιστοτόπου και να βοηθήσετε στην βελτίωση του."
    },
    "api": {
        "title": "APIs",
        "details": "Τα API χρησιμοποιούνται για την φόρτωση προγραμμάτων: αναγνώρισης τοποθεσίας, μηχανών αναζήτησης, μεταφράσεων, ..."
    },
    "other": {
        "title": "Λοιπές υπηρεσίες",
        "details": "Υπηρεσίες που παρουσιάζουν άλλο περιεχόμενο."
    },
    
    "mandatoryTitle": "Mandatory cookies",
    "mandatoryText": "This site uses cookies necessary for its proper functioning which cannot be deactivated."
};


/* Embedded language: en */
/*global tarteaucitron */
tarteaucitron.languages["en"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Hello! This site is transparent and lets you choose the 3rd party services you want to allow.",
    "adblock_call": "Please disable your adblocker to start customizing.",
    "reload": "Refresh the page",
    
    "alertBigScroll": "By continuing to scroll,",
    "alertBigClick": "If you continue to browse this website,",
    "alertBig": "you are allowing all third-party services",
    
    "alertBigPrivacy": "This site uses cookies and gives you control over what you want to activate",
    "alertSmall": "Manage services",
    "personalize": "Personalize",
    "acceptAll": "OK, accept all",
    "close": "Close",

    "privacyUrl": "Privacy policy",
    
    "all": "Preference for all services",

    "info": "Protecting your privacy",
    "disclaimer": "By allowing these third party services, you accept their cookies and the use of tracking technologies necessary for their proper functioning.",
    "allow": "Allow",
    "deny": "Deny",
    "noCookie": "This service does not use cookie.",
    "useCookie": "This service can install",
    "useCookieCurrent": "This service has installed",
    "useNoCookie": "This service has not installed any cookie.",
    "more": "Read more",
    "source": "View the official website",
    "credit": "Cookies manager by tarteaucitron.js",
    "noServices": "This website does not use any cookie requiring your consent.",

    "toggleInfoBox": "Show/hide informations about cookie storage",
    "title": "Cookies management panel",
    "cookieDetail": "Cookie detail for",
    "ourSite": "on our site",
    "modalWindow": "(modal window)",
    "newWindow": "(new window)",
    "allowAll": "Allow all cookies",
    "denyAll": "Deny all cookies",

    "icon": "Cookies",
    
    "fallback": "is disabled.",
    "allowed": "allowed",
    "disallowed": "disallowed",

    "ads": {
        "title": "Advertising network",
        "details": "Ad networks can generate revenue by selling advertising space on the site."
    },
    "analytic": {
        "title": "Audience measurement",
        "details": "The audience measurement services used to generate useful statistics attendance to improve the site."
    },
    "social": {
        "title": "Social networks",
        "details": "Social networks can improve the usability of the site and help to promote it via the shares."
    },
    "video": {
        "title": "Videos",
        "details": "Video sharing services help to add rich media on the site and increase its visibility."
    },
    "comment": {
        "title": "Comments",
        "details": "Comments managers facilitate the filing of comments and fight against spam."
    },
    "support": {
        "title": "Support",
        "details": "Support services allow you to get in touch with the site team and help to improve it."
    },
    "api": {
        "title": "APIs",
        "details": "APIs are used to load scripts: geolocation, search engines, translations, ..."
    },
    "other": {
        "title": "Other",
        "details": "Services to display web content."
    },
    
    "mandatoryTitle": "Mandatory cookies",
    "mandatoryText": "This site uses cookies necessary for its proper functioning which cannot be deactivated."
};


/* Embedded language: es */
/*global tarteaucitron */
tarteaucitron.languages["es"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "¡Hola! Este sitio web es transparente y te da la opción de activar los servicios de terceros.",
    "adblock_call": "Por favor deshabilita tu AdBlocker para empezar a personalizar los servicios.",
    "reload": "Actualizar esta página",
    
    "alertBigScroll": "Al continuar desplazándote,",
    "alertBigClick": "Si continuas navegando por este sitio web,",
    "alertBig": "estás permitiendo servicios terceros",
    
    "alertBigPrivacy": "Este sitio web usa cookies y te permite controlar las que deseas activar",
    "alertSmall": "Gestionar servicios",
    "personalize": "Personalizar",
    "acceptAll": "OK, aceptar todas",
    "close": "Cerrar",

    "privacyUrl": "Política de privacidad",
    
    "all": "Ajustes para todos los servicios",

    "info": "Protegiendo tu privacidad",
    "disclaimer": "Aceptando estos servicios de terceros, estás aceptando sus cookies y el uso de tecnologías de rastreo necesarias para su correcto funcionamiento.",
    "allow": "Permitir",
    "deny": "Denegar",
    "noCookie": "Este servicio no usa cookies.",
    "useCookie": "Este servicio puede instalar",
    "useCookieCurrent": "Este servicio ha instalado",
    "useNoCookie": "Este servicio no ha instalado ninguna cookie.",
    "more": "Leer más",
    "source": "Ver sitio web oficial",
    "credit": "Gestor de cookies realizado por tarteaucitron.js",

    "toggleInfoBox": "Mostrar/ocultar información sobre almacenamiento de cookies",
    "title": "Panel de gestión de cookies",
    "cookieDetail": "Detalles de las cookies para",
    "ourSite": "en nuestra web",
    "modalWindow": "(ventana modal)",
    "newWindow": "(ventana nueva)",
    "allowAll": "Permitir todas las cookies",
    "denyAll": "Denegar todas las cookies",

    "icon": "Cookies",
    
    "fallback": "está deshabilitado.",
    "allowed": "permitido",
    "disallowed": "rechazado",

    "ads": {
        "title": "Red de publicidad",
        "details": "Las redes publicitarias pueden generar ingresos mediante la venta de espacios publicitarios en el sitio."
    },
    "analytic": {
        "title": "Medición de audiencia",
        "details": "Los servicios de medición de audiencia se usan para generar estadísticas útiles para mejorar el sitio."
    },
    "social": {
        "title": "Redes sociales",
        "details": "Las redes sociales pueden aumentar la usabilidad del sitio web y ayudar a promoverlo a través de la contribución."
    },
    "video": {
        "title": "Videos",
        "details": "Los servicios para compartir videos ayudan a añadir contenido enriquecido en el sitio web y aumentar su visibilidad."
    },
    "comment": {
        "title": "Comentarios",
        "details": "El gestor de comentarios facilita la clasificación de comentarios y luchar contra spam."
    },
    "support": {
        "title": "Soporte",
        "details": "Los servicios de soporte te permiten contactar con el sitio web y ayudar a mejorarlo."
    },
    "api": {
        "title": "APIs",
        "details": "APIs se utilizan para cargar scripts: geolocalización, motor de búsqueda, traducciones, ..."
    },
    "other": {
        "title": "Otro",
        "details": "Servicios para mostrar contenido web."
    },
    
    "mandatoryTitle": "Cookies obligatorias",
    "mandatoryText": "Este sitio utiliza cookies necesarias para su correcto funcionamiento que no se pueden desactivar."
};


/* Embedded language: et */
/*global tarteaucitron */
tarteaucitron.languages["et"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Tere! See lehekülg on läbipaistev ja võimaldab Teil valida kolmandate osapoolte teenuseid, mida soovite lubada.",
    "adblock_call": "Kohandamise alustamiseks palun keelake oma reklaamiblokeerija.",
    "reload": "Värskendage lehekülge",
    
    "alertBigScroll": "Kerimist jätkates,",
    "alertBigClick": "Kui jätkate selle veebisaidi sirvimist,",
    "alertBig": "lubate kõik kolmandate osapoolte teenused",
    
    "alertBigPrivacy": "See lehekülg kasutab küpsiseid ja annab teile kontrolli selle üle, mida soovite aktiveerida",
    "alertSmall": "Teenuste haldamine",
    "personalize": "Isikupärasta",
    "acceptAll": "OK, nõustu kõigiga",
    "close": "Sulge",

    "privacyUrl": "Privaatsuspoliitika",
    
    "all": "Eelistus kõikidele teenustele",

    "info": "Teie privaatsuse kaitsmine",
    "disclaimer": "Kolmandate osapoolte teenuste lubamisel nõustute nende küpsistega ja nende nõuetekohaseks toimimiseks vajalike jälgimistehnoloogiate kasutamisega.",
    "allow": "Luba",
    "deny": "Keeldu",
    "noCookie": "See teenus ei kasuta küpsiseid.",
    "useCookie": "Seda teenust saab installida",
    "useCookieCurrent": "See teenus on installitud",
    "useNoCookie": "See teenus ei ole installinud ühtegi küpsist.",
    "more": "Loe rohkem",
    "source": "Vaadake ametlikku veebilehekülge",
    "credit": "Küpsiste haldur tarteaucitron.js",
    "noServices": "See veebisait ei kasuta küpsiseid, mis nõuavad teie nõusolekut.",

    "toggleInfoBox": "Kuva/peida teave küpsiste salvestamise kohta",
    "title": "Küpsiste halduspaneel",
    "cookieDetail": "Küpsise üksikasjad",
    "ourSite": "meie leheküljel",
    "modalWindow": "(modaalne aken)",
    "newWindow": "(uus aken)",
    "allowAll": "Luba kõik küpsised",
    "denyAll": "Keela kõik küpsised",

    "icon": "Küpsised",
    
    "fallback": "on keelatud.",
    "allowed": "lubatud",
    "disallowed": "keelatud",

    "ads": {
        "title": "Reklaamvõrgustik",
        "details": "Reklaamivõrgustikud saavad veebileheküljel reklaamipinda müües tulu teenida."
    },
    "analytic": {
        "title": "Vaatajaskonna mõõtmine",
        "details": "Vaatajaskonna mõõtmise teenuseid kasutati lehekülje täiustamiseks kasuliku külastatavuse statistika saamiseks."
    },
    "social": {
        "title": "Sotsiaalvõrgustikud",
        "details": "Sotsiaalvõrgustikud võivad parandada lehekülje kasutatavust ja aidata seda jagamiste kaudu reklaamida."
    },
    "video": {
        "title": "Videod",
        "details": "Videojagamisteenused aitavad leheküljele lisada rikasmeediat ja suurendada selle nähtavust."
    },
    "comment": {
        "title": "Kommentaarid",
        "details": "Kommentaarihaldurid hõlbustavad kommentaaride esitamist ja võitlevad rämpsposti vastu."
    },
    "support": {
        "title": "Tugi",
        "details": "Tugiteenused võimaldavad teil lehekülje meeskonnaga ühendust võtta ja aidata seda täiustada."
    },
    "api": {
        "title": "API-d",
        "details": "API-sid kasutatakse skriptide laadimiseks: geolokatsiooniks, otsingumootorites, tõlgetes, ..."
    },
    "other": {
        "title": "Muu",
        "details": "Teenused veebisisu kuvamiseks."
    },
    
    "mandatoryTitle": "Kohustuslikud küpsised",
    "mandatoryText": "See lehekülg kasutab nõuetekohaseks toimimiseks vajalikke küpsiseid, mida ei saa deaktiveerida."
};


/* Embedded language: fi */
/*global tarteaucitron */
tarteaucitron.languages["fi"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Hei! Tämä sivusto antaa sinun valita ja hallita kolmansien osapuolten asettamia evästeitä.",
    "adblock_call": "Estä adblocker muuttaaksesi asetuksia.",
    "reload": "Päivitä sivu",

    "alertBigScroll": "Jatkamalla selailua,",
    "alertBigClick": "Jatkamalla tämän sivuston selailua,",
    "alertBig": "hyväksyt kolmansien osapuolien tarjoamia palveluita",

    "alertBigPrivacy": "Tämä sivusto käyttää evästeitä ja antaa sinun hallita niitä.",
    "alertSmall": "Hallinnoi palveluja",
    "acceptAll": "OK, hyväksy kaikki",
    "personalize": "Personoi",
    "close": "Sulje",

    "privacyUrl": "Tietosuoja",

    "all": "Kaikkien palveluiden valinta",

    "info": "Yksityisyyden suojaaminen",
    "disclaimer": "Hyväksymällä kolmansien osapuolten palvelut, hyväksyt toiminnan kannalta tarpeellisten evästeiden ja seurantateknologioiden käytön.",
    "allow": "Hyväksy",
    "deny": "Kiellä",
    "noCookie": "Tämä palvelu ei käytä evästeitä",
    "useCookie": "Tämä palvelu voidaan asentaa",
    "useCookieCurrent": "Tämä palvelu on asennettu",
    "useNoCookie": "Tämä palvelu ei ole asentanut evästeitä",
    "more": "Lue lisää",
    "source": "Katso virallinen nettisivu",
    "credit": "Evästeiden hallinta: tarteaucitron.js",
    "noServices": "Tämä sivusto ei käytä evästeitä, jotka vaativat suostumustasi.",
    
    "toggleInfoBox": "Näytä/piilota tiedot evästeistä ja niiden säilytyksestä",
    "title": "Evästeiden hallintapaneeli",
    "cookieDetail": "Evästetiedot",
    "ourSite": "sivustollamme",
    "modalWindow": "(modaalinen ikkuna)",
    "newWindow": "uusi ikkuna",
    "allowAll": "Hyväksy kaikki evästeet",
    "denyAll": "Kiellä kaikki evästeet",

    "icon": "Cookies",
   
    "fallback": "hylätty.",
    "allowed": "sallittu",
    "disallowed": "kielletty",

    "ads": {
        "title": "Mainosverkosto",
        "details": "Mainosverkostot saattavat saada tuloja myymällä mainostilaa sivustolla."
    },
    "analytic": {
        "title": "Yleisön mittaaminen",
        "details": "Les services de mesure d'audience permettent de générer des statistiques de fréquentation utiles à l'amélioration du site."
    },
    "social": {
        "title": "Sosiaaliset verkostot",
        "details": "Sosiaaliset verkostot voivat helpottaa sivuston käytettävyyttä ja mainontaa"
    },
    "video": {
        "title": "Videot",
        "details": "Videoiden toistopalvelut auttavat rikastamaan sivuston markkinointia ja kasvattaa sen näkyvyyttä"
    },

    "comment": {

        "title": "Kommentit",

        "details": "Kommentoinnin ylläpito helpottaa kommenttien arkistointia ja roskapostin hallintaa."
    },
    "support": {
        "title": "Tuki",
        "details": "Ohjelmointirajapintoja käytetään eri ohjelmistojen, kuten hakukoneiden, sijaintien tai käännösten, lataamiseen."
    },
    "api": {
        "title": "Ohjelmointirajapinnat",
        "details": "Ohjelmointirajapintoja käytetään eri ohjelmistojen, kuten hakukoneiden, sijaintien tai käännösten, lataamiseen,..."
    },
    "other": {
        "title": "Muut",
        "details": "Palvelut web-sisältöjen näyttämiseen."
    },
    
    "mandatoryTitle": "Mandatory cookies",
    "mandatoryText": "This site uses cookies necessary for its proper functioning which cannot be deactivated."
};


/* Embedded language: fr */
/*global tarteaucitron */
tarteaucitron.languages["fr"] = {

    "middleBarHead": "☝ 🍪",
    "adblock": "Bonjour! Ce site joue la transparence et vous donne le choix des services tiers à activer.",
    "adblock_call": "Merci de désactiver votre adblocker pour commencer la personnalisation.",
    "reload": "Recharger la page",
    
    "alertBigScroll": "En continuant de défiler,",
    "alertBigClick": "En poursuivant votre navigation,",
    "alertBig": "vous acceptez l'utilisation de services tiers pouvant installer des cookies",
    
    "alertBigPrivacy": "Ce site utilise des cookies et vous donne le contrôle sur ceux que vous souhaitez activer",
    "alertSmall": "Gestion des services",
    "acceptAll": "Tout accepter",
    "personalize": "Personnaliser",
    "close": "Fermer",

    "privacyUrl": "Politique de confidentialité",

    "all": "Préférences pour tous les services",

    "info": "Protection de votre vie privée",
    "disclaimer": "En autorisant ces services tiers, vous acceptez le dépôt et la lecture de cookies et l'utilisation de technologies de suivi nécessaires à leur bon fonctionnement.",
    "allow": "Autoriser",
    "deny": "Interdire",
    "noCookie": "Ce service ne dépose aucun cookie.",
    "useCookie": "Ce service peut déposer",
    "useCookieCurrent": "Ce service a déposé",
    "useNoCookie": "Ce service n'a déposé aucun cookie.",
    "more": "En savoir plus",
    "source": "Voir le site officiel",
    "credit": "Gestion des cookies par tarteaucitron.js",
    "noServices": "Ce site n'utilise aucun cookie nécessitant votre consentement.",

    "toggleInfoBox": "Afficher/masquer les informations sur le stockage des cookies",
    "title": "Panneau de gestion des cookies",
    "cookieDetail": "Détail des cookies",
    "ourSite": "sur notre site",
    "modalWindow": "(fenêtre modale)",
    "newWindow": "(nouvelle fenêtre)",
    "allowAll": "Tout accepter",
    "denyAll": "Tout refuser",

    "icon": "Cookies",
    
    "fallback": "est désactivé.",
    "allowed": "autorisé",
    "disallowed": "interdit",

    "ads": {
        "title": "Régies publicitaires",
        "details": "Les régies publicitaires permettent de générer des revenus en commercialisant les espaces publicitaires du site."
    },
    "analytic": {
        "title": "Mesure d'audience",
        "details": "Les services de mesure d'audience permettent de générer des statistiques de fréquentation utiles à l'amélioration du site."
    },
    "social": {
        "title": "Réseaux sociaux",
        "details": "Les réseaux sociaux permettent d'améliorer la convivialité du site et aident à sa promotion via les partages."
    },
    "video": {
        "title": "Vidéos",
        "details": "Les services de partage de vidéo permettent d'enrichir le site de contenu multimédia et augmentent sa visibilité."
    },
    "comment": {
        "title": "Commentaires",
        "details": "Les gestionnaires de commentaires facilitent le dépôt de vos commentaires et luttent contre le spam."
    },
    "support": {
        "title": "Support",
        "details": "Les services de support vous permettent d'entrer en contact avec l'équipe du site et d'aider à son amélioration."
    },
    "api": {
        "title": "APIs",
        "details": "Les APIs permettent de charger des scripts : géolocalisation, moteurs de recherche, traductions, ..."
    },
    "other": {
        "title": "Autre",
        "details": "Services visant à afficher du contenu web."
    },
    
    "mandatoryTitle": "Cookies obligatoires",
    "mandatoryText": "Ce site utilise des cookies nécessaires à son bon fonctionnement. Ils ne peuvent pas être désactivés."
};


/* Embedded language: hu */
/*global tarteaucitron */
tarteaucitron.languages["hu"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Szia! Ez a webhely átlátható, és lehetővé teszi a kívánt harmadik fél szolgáltatásainak kiválasztását",
    "adblock_call": "A testreszabás megkezdéséhez állítsd le az adblockert, kérlek.",
    "reload": "Oldal frissítése",
    
    "alertBigScroll": "A görgetés folytatásával,",
    "alertBigClick": "Ha folytatod a böngészést ezen oldalon,",
    "alertBig": "engedélyezed a harmadik fél összes szolgáltatását.",
    
    "alertBigPrivacy": "A webhely tartalmának megjelenítéséhez és a felhasználói élmény javításához cookie-kat használunk",
    "alertSmall": "Szolgáltatások kezelése",
    "personalize": "Beállítások",
    "acceptAll": "OK, elfogadom",
    "close": "Bezár",

    "privacyUrl": "Adatvédelmi irányelvek",
    
    "all": "Összes szolgáltatás előnyben részesítése",

    "info": "Személyi adataid védelme",
    "disclaimer": "A harmadik fél szolgáltatásainak engedélyezésével elfogadja a sütiket és a megfelelő működésükhöz szükséges nyomkövetési technológiák használatát.",
    "allow": "Elfogadom",
    "deny": "Elutasítom",
    "noCookie": "Ez a szolgáltatás nem használ sütit.",
    "useCookie": "Ez a szolgáltatás telepíthető",
    "useCookieCurrent": "Ez a szolgáltatás telepített",
    "useNoCookie": "Ez a szolgáltatás nem telepített sütiket",
    "more": "Olvass többet",
    "source": "Tekintsd meg a hivatalos weboldalt",
    "credit": "Cookie-kezelő: tarteaucitron.js",
    "noServices": "Ez a weboldal nem használ olyan sütiket, amelyekhez a beleegyezésed szükséges.",

    "toggleInfoBox": "Információk megjelenítése / elrejtése a süti-tárolással kapcsolatban",
    "title": "Süti preferenciák",
    "cookieDetail": "Süti adatok a következőhöz:",
    "ourSite": "weboldalunkon",
    "modalWindow": "(modális ablak)",
    "newWindow": "(új ablak)",
    "allowAll": "Elfogadom az öszeset",
    "denyAll": "Elutasítom",

    "icon": "Cookies",
    
    "fallback": "letiltott.",
    "allowed": "megengedett",
    "disallowed": "nem engedélyezett",

    "ads": {
        "title": "Reklámhálózat",
        "details": "A hirdetési hálózatok bevételt teremthetnek azáltal, hogy értékesítik a webhelyen található hirdetési felületet"
    },
    "analytic": {
        "title": "Közönségmérés",
        "details": "A közönségmérési szolgáltatások hasznos statisztikai adatokat generáltak a webhely fejlesztése érdekében."
    },
    "social": {
        "title": "Közösségi hálózatok",
        "details": "A közösségi hálózatok javíthatják a webhely használhatóságát, és elősegíthetik annak promoválását a megosztások révén."
    },
    "video": {
        "title": "Videók",
        "details": "A videomegosztó szolgáltatások hozzájárulnak hasznos multimédiához a webhelyen és növelik annak láthatóságát."
    },
    "comment": {
        "title": "Kommentek",
        "details": "A megjegyzésfigyelők megkönnyítik a megjegyzések kitöltését és a spam elleni küzdelmet."
    },
    "support": {
        "title": "Támogatás",
        "details": "A támogatási szolgáltatások lehetővé teszik, hogy kapcsolatba lépjen a webhely csapatával, és segítsen annak fejlesztésében."
    },
    "api": {
        "title": "APIk",
        "details": "Az API-kat a szkriptek betöltésére használják: földrajzi helymeghatározás, keresőmotorok, fordítások..."
    },
    "other": {
        "title": "Más",
        "details": "Szolgáltatások webtartalom megjelenítésére."
    },
    
    "mandatoryTitle": "Kötelező sütik",
    "mandatoryText": "A webhely tartalmának megjelenítéséhez és a felhasználói bejelentkezéshez sütiket használunk amiket nem lehet kikapcsolni."
};


/* Embedded language: it */
/*global tarteaucitron */
tarteaucitron.languages["it"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Benvenuto! Questo sito ti permette di attivare i servizi di terzi di tua scelta.",
    "adblock_call": "Disabilita il tuo adblocker per iniziare la navigazione.",
    "reload": "Aggiorna la pagina",
    
    "alertBigScroll": "Continuando a scorrere,",
    "alertBigClick": "Continuando a navigare nel sito,",
    "alertBig": "autorizzi l’utilizzo dei cookies inviati da domini di terze parti",
    
    "alertBigPrivacy": "Questo sito fa uso di cookies e ti consente di decidere se accettarli o rifiutarli",
    "alertSmall": "Gestione dei servizi",
    "acceptAll": "Ok, accetta tutto",
    "personalize": "Personalizza",
    "close": "Chiudi",

    "privacyUrl": "Politica sulla riservatezza",
    
    "all": "Preferenze per tutti i servizi",
    
    "info": "Tutela della privacy",
    "disclaimer": "Abilitando l'uso dei servizi di terze parti, accetti la ricezione dei cookies e l'uso delle tecnologie analitici necessarie al loro funzionamento.",
    "allow": "Consenti",
    "deny": "Blocca",
    "noCookie": "Questo servizio non invia nessun cookie",
    "useCookie": "Questo servizio puo' inviare",
    "useCookieCurrent": "Questo servizio ha inviato",
    "useNoCookie": "Questo servizio non ha inviato nessun cookie",
    "more": "Saperne di più",
    "source": "Vai al sito ufficiale",
    "credit": "Gestione dei cookies da tarteaucitron.js",

    "toggleInfoBox": "Show/hide informations about cookie storage",
    "title": "Cookies management panel",
    "cookieDetail": "Cookie detail for",
    "ourSite": "on our site",
    "modalWindow": "(finestra modale)",
    "newWindow": "(nuova finestra)",
    "allowAll": "Consenti tutti i cookie",
    "denyAll": "Rifiuta tutti i cookie",

    "icon": "Cookies",
    
    "fallback": "è disattivato",
    "allowed": "permesso",
    "disallowed": "non consentito",
    
    "ads": {
        "title": "Regie pubblicitarie",
        "details": "Le regie pubblicitarie producono redditi gestendo la commercializzazione degli spazi del sito dedicati alle campagne pubblicitarie"
    },
    "analytic": {
        "title": "Misura del pubblico",
        "details": "I servizi di misura del pubblico permettono di raccogliere le statistiche utili al miglioramento del sito"
    },
    "social": {
        "title": "Reti sociali",
        "details": "Le reti sociali permettono di migliorare l'aspetto conviviale del sito e di sviluppare la condivisione dei contenuti da parte degli utenti a fini promozionali."
    },
    "video": {
        "title": "Video",
        "details": "I servizi di condivisione di video permettono di arricchire il sito di contenuti multimediali e di aumentare la sua visibilità"
    },
    "comment": {
        "title": "Commenti",
        "details": "La gestione dei commenti utente aiuta a gestire la pubblicazione dei commenti e a lottare contro lo spamming"
    },
    "support": {
        "title": "Supporto",
        "details": "I servizi di supporto ti consentono di contattare la team del sito e di contribuire al suo miglioramento"
    },
    "api": {
        "title": "API",
        "details": "Le API permettono di implementare script diversi : geolocalizzazione, motori di ricerca, traduttori..."
    },
    "other": {
        "title": "Altro",
        "details": "Servizi per visualizzare contenuti web."
    },
    
    "mandatoryTitle": "Mandatory cookies",
    "mandatoryText": "This site uses cookies necessary for its proper functioning which cannot be deactivated."
};


/* Embedded language: ja */
/*global tarteaucitron */
tarteaucitron.languages["ja"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Hello! This site is transparent and lets you chose the 3rd party services you want to allow.",
    "adblock_call": "Please disable your adblocker to start customizing.",
    "reload": "Refresh the page",
    
    "alertBigScroll": "By continuing to scroll,",
    "alertBigClick": "If you continue to browse this website,",
    "alertBig": "you are allowing all third-party services",
    
    "alertBigPrivacy": "当サイトはクッキーを利用しております。お客様自身でクッキー利用の設定および管理ができます。",
    "alertSmall": "Manage services",
    "personalize": "カスタマイズする",
    "acceptAll": "全てに同意する",
    "close": "Close",

    "privacyUrl": "プライバシーポリシー",
    
    "all": "Preference for all services",

    "info": "Protecting your privacy",
    "disclaimer": "これらの第三者によるサービスを許可することで、サイトの動作に必要なクッキーや他のトラッキング・テクノロジーの使用に同意するものとみなします。",
    "allow": "許可",
    "deny": "拒否",
    "noCookie": "This service does not use cookie.",
    "useCookie": "This service can install",
    "useCookieCurrent": "このサービスは２つのクッキーを利用します",
    "useNoCookie": "This service has not installed any cookie.",
    "more": "もっと読む",
    "source": "公式サイトで閲覧する",
    "credit": "Cookies manager by tarteaucitron.js",
    "noServices": "This website does not use any cookie requiring your consent.",

    "toggleInfoBox": "Show/hide informations about cookie storage",
    "title": "クッキー利用の管理について",
    "cookieDetail": "Cookie detail for",
    "ourSite": "on our site",
    "modalWindow": "(モーダルウィンドウ)",
    "newWindow": "(新しい窓)",
    "allowAll": "すべてのクッキーを許可する",
    "denyAll": "すべてのクッキーを拒否する",

    "icon": "Cookies",
    
    "fallback": "is disabled.",
    "allowed": "許可",
    "disallowed": "許可されていません",

    "ads": {
        "title": "Advertising network",
        "details": "Ad networks can generate revenue by selling advertising space on the site."
    },
    "analytic": {
        "title": "Audience measurement",
        "details": "The audience measurement services used to generate useful statistics attendance to improve the site."
    },
    "social": {
        "title": "Social networks",
        "details": "Social networks can improve the usability of the site and help to promote it via the shares."
    },
    "video": {
        "title": "Videos",
        "details": "Video sharing services help to add rich media on the site and increase its visibility."
    },
    "comment": {
        "title": "Comments",
        "details": "Comments managers facilitate the filing of comments and fight against spam."
    },
    "support": {
        "title": "Support",
        "details": "Support services allow you to get in touch with the site team and help to improve it."
    },
    "api": {
        "title": "APIs",
        "details": "APIs are used to load scripts: geolocation, search engines, translations, ..."
    },
    "other": {
        "title": "Other",
        "details": "Services to display web content."
    },
    
    "mandatoryTitle": "Mandatory cookies",
    "mandatoryText": "This site uses cookies necessary for its proper functioning which cannot be deactivated."
};


/* Embedded language: lt */
/*global tarteaucitron */
tarteaucitron.languages["lt"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Sveiki! Ši svetainė veikia skaidriai ir leidžia pasirinkti trečiosios šalies paslaugas, kurias norite leisti.",
    "adblock_call": "Norėdami pradėti taikyti, išjunkite ,Adblocker",
    "reload": "Atnaujinkite puslapį",
    
    "alertBigScroll": "Tęsiant slankiojimą",
    "alertBigClick": "Jei ir toliau naršote šioje svetainėje,",
    "alertBig": "leidžiate naudotis visomis trečiųjų šalių paslaugomis",
    
    "alertBigPrivacy": "Ši svetainė naudoja slapukus ir suteikia jums galimybę valdyti, ką norite suaktyvinti",
    "alertSmall": "Tvarkykite paslaugas",
    "personalize": "Suasmeninkite",
    "acceptAll": "Gerai, priimu visus",
    "close": "Uždaryti",

    "privacyUrl": "Privatumo politika",

    "all": "Pirmenybė visoms paslaugoms",

    "info": "Jūsų privatumo apsauga",
    "disclaimer": "Leisdami šias trečiųjų šalių paslaugas, jūs sutinkate su jų slapukais ir sekimo technologijų naudojimu, reikalingu jų tinkamam veikimui.",
    "allow": "Leisti",
    "deny": "Atsisakyti",
    "noCookie": "Ši paslauga nenaudoja slapukų.",
    "useCookie": "Ši paslauga gali būti įdiegta",
    "useCookieCurrent": "Ši paslauga įdiegta",
    "useNoCookie": "Ši paslauga neįdiegė jokių slapukų.",
    "more": "Skaityti daugiau",
    "source": "Peržiūrėkite oficialią svetainę",
    "credit": "Slapukų tvarkyklė, kurią pateikė tarteaucitron.js",
    "noServices": "Šioje svetainėje nenaudojami jokie slapukai, kuriems reikalingas jūsų sutikimas.",

    "toggleInfoBox": "Rodyti / slėpti informaciją apie slapukų saugojimą",
    "title": "Slapukų valdymo skydelis",
    "cookieDetail": "Išsami slapuko informacija",
    "ourSite": "mūsų svetainėje",
    "modalWindow": "(modalinis langas)",
    "newWindow": "(naujas langas)",
    "allowAll": "Leisti visus slapukus",
    "denyAll": "Atsisakyti visų slapukų",

    "icon": "Cookies",

    "fallback": "yra išjungtas.",
    "allowed": "leidžiama",
    "disallowed": "neleidžiama",

    "ads": {
        "title": "Reklamos tinklas",
        "details": "Reklamos tinklai gali gauti pajamų, parduodami reklamos vietą svetainėje."
    },
    "analytic": {
        "title": "Auditorijos matavimas",
        "details": "Naudotos auditorijos vertinimo paslaugos generuoti naudingą statistinį lankomumą svetainės veiklos patobulinimui."
    },
    "social": {
        "title": "Socialiniai tinklai",
        "details": "Socialiniai tinklai gali pagerinti svetainės naudojimą ir padėti ją reklamuoti per akcijas."
    },
    "video": {
        "title": "Vaizdo įrašai",
        "details": "Vaizdo įrašų bendrinimo paslaugos padeda pritraukti gausesnę media į svetainę ir padidinti jos matomumą."
    },
    "comment": {
        "title": "Komentarai",
        "details": "Komentarų valdytojai palengvina komentarų sisteminimą ir kovoja su šlamštu."
    },
    "support": {
        "title": "Pagalba",
        "details": "Pagalbos paslaugos leidžia jums susisiekti su svetainės komanda ir padėti ją tobulinti."
    },
    "api": {
        "title": "APIs (Aplikacijų programavimo sąsajos)",
        "details": "API naudojamos tekstams įkelti: geografinė padėtis, paieškos sistemos, vertimai, ..."
    },
    "other": {
        "title": "Kita",
        "details": "Paslaugos, rodančios svetainės turinį."
    },
    
    "mandatoryTitle": "Privalomi slapukai",
    "mandatoryText": "Ši svetainė naudoja slapukus, reikalingus tinkamam jos veikimui, kurių negalima išjungti."
};


/* Embedded language: lv */
/*global tarteaucitron */
tarteaucitron.languages["lv"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Szia! Ez a webhely átlátható, és lehetővé teszi a kívánt harmadik fél szolgáltatásainak kiválasztását",
    "adblock_call": "A testreszabás megkezdéséhez állítsd le az adblockert, kérlek.",
    "reload": "Oldal frissítése",
    
    "alertBigScroll": "A görgetés folytatásával,",
    "alertBigClick": "Ha folytatod a böngészést ezen oldalon,",
    "alertBig": "engedélyezed a harmadik fél összes szolgáltatását.",
    
    "alertBigPrivacy": "A webhely tartalmának megjelenítéséhez és a felhasználói élmény javításához cookie-kat használunk",
    "alertSmall": "Szolgáltatások kezelése",
    "personalize": "Beállítások",
    "acceptAll": "OK, elfogadom",
    "close": "Bezár",

    "privacyUrl": "Adatvédelmi irányelvek",
    
    "all": "Összes szolgáltatás előnyben részesítése",

    "info": "Személyi adataid védelme",
    "disclaimer": "A harmadik fél szolgáltatásainak engedélyezésével elfogadja a sütiket és a megfelelő működésükhöz szükséges nyomkövetési technológiák használatát.",
    "allow": "Elfogadom",
    "deny": "Elutasítom",
    "noCookie": "Ez a szolgáltatás nem használ sütit.",
    "useCookie": "Ez a szolgáltatás telepíthető",
    "useCookieCurrent": "Ez a szolgáltatás telepített",
    "useNoCookie": "Ez a szolgáltatás nem telepített sütiket",
    "more": "Olvass többet",
    "source": "Tekintsd meg a hivatalos weboldalt",
    "credit": "Cookie-kezelő: tarteaucitron.js",
    "noServices": "Ez a weboldal nem használ olyan sütiket, amelyekhez a beleegyezésed szükséges.",

    "toggleInfoBox": "Információk megjelenítése / elrejtése a süti-tárolással kapcsolatban",
    "title": "Süti preferenciák",
    "cookieDetail": "Süti adatok a következőhöz:",
    "ourSite": "weboldalunkon",
    "modalWindow": "(modal window)",
    "newWindow": "(új ablak)",
    "allowAll": "Elfogadom az öszeset",
    "denyAll": "Elutasítom",

    "icon": "Cookies",
    
    "fallback": "letiltott.",
    "allowed": "atļauts",
    "disallowed": "nav atļauts",

    "ads": {
        "title": "Reklámhálózat",
        "details": "A hirdetési hálózatok bevételt teremthetnek azáltal, hogy értékesítik a webhelyen található hirdetési felületet"
    },
    "analytic": {
        "title": "Közönségmérés",
        "details": "A közönségmérési szolgáltatások hasznos statisztikai adatokat generáltak a webhely fejlesztése érdekében."
    },
    "social": {
        "title": "Közösségi hálózatok",
        "details": "A közösségi hálózatok javíthatják a webhely használhatóságát, és elősegíthetik annak promoválását a megosztások révén."
    },
    "video": {
        "title": "Videók",
        "details": "A videomegosztó szolgáltatások hozzájárulnak hasznos multimédiához a webhelyen és növelik annak láthatóságát."
    },
    "comment": {
        "title": "Kommentek",
        "details": "A megjegyzésfigyelők megkönnyítik a megjegyzések kitöltését és a spam elleni küzdelmet."
    },
    "support": {
        "title": "Támogatás",
        "details": "A támogatási szolgáltatások lehetővé teszik, hogy kapcsolatba lépjen a webhely csapatával, és segítsen annak fejlesztésében."
    },
    "api": {
        "title": "APIk",
        "details": "Az API-kat a szkriptek betöltésére használják: földrajzi helymeghatározás, keresőmotorok, fordítások..."
    },
    "other": {
        "title": "Más",
        "details": "Szolgáltatások webtartalom megjelenítésére."
    },
    
    "mandatoryTitle": "Kötelező sütik",
    "mandatoryText": "A webhely tartalmának megjelenítéséhez és a felhasználói bejelentkezéshez sütiket használunk amiket nem lehet kikapcsolni."
};


/* Embedded language: nl */
/*global tarteaucitron */
tarteaucitron.languages["nl"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Hallo! Deze site is transparant en laat u de services van derden kiezen die u wilt toestaan.",
    "adblock_call": "Schakel uw adblocker uit om te beginnen met aanpassen.",
    "reload": "Ververs de pagina",
    
    "alertBigScroll": "Door te blijven scrollen,",
    "alertBigClick": "Als je doorgaat met het surfen op deze website,",
    "alertBig": "sta je alle diensten van derden toe",
    
    "alertBigPrivacy": "Deze site maakt gebruik van cookies en geeft u controle over wat u wilt activeren",
    "alertSmall": "Beheer instellingen",
    "personalize": "Personaliseer",
    "acceptAll": "OK, accepteer alle",
    "close": "Sluit",

    "privacyUrl": "Privacybeleid",

    "all": "Voorkeur voor alle diensten",

    "info": "Bescherming van uw privacy",
    "disclaimer": "Door deze services van derden toe te staan, accepteert u hun cookies en het gebruik van trackingtechnologieën die nodig zijn voor hun goede werking.",
    "allow": "Toestaan",
    "deny": "Weigeren",
    "noCookie": "Deze service gebruikt geen cookie",
    "useCookie": "Deze service kan worden geïnstalleerd",
    "useCookieCurrent": "Deze service is geïnstalleerd",
    "useNoCookie": "Deze service heeft geen cookies geïnstalleerd.",
    "more": "Lees meer",
    "source": "Bekijk de officiële website",
    "credit": "Cookie manager mogelijk gemaakt door tarteaucitron.js",
    
    "fallback": "is uitgeschakeld.",
    "allowed": "toegestaan",
    "disallowed": "niet toegestaan",

    "toggleInfoBox": "Toon/verberg informatie over cookie opslag",
    "title": "Cookies beheer paneel",
    "cookieDetail": "Cookie detail voor",
    "ourSite": "op onze site",
    "modalWindow": "(modaal venster)",
    "newWindow": "(nieuw venster)",
    "allowAll": "Sta alle cookies toe",
    "denyAll": "Weiger alle cookies",

    "icon": "Cookies",

    "ads": {
        "title": "Advertentienetwerk",
        "details": "Advertentienetwerken kunnen inkomsten genereren door advertentieruimte op de site te verkopen."
    },
    "analytic": {
        "title": "Bezoekers meting",
        "details": "De bezoekersdiensten voor het publiek worden gebruikt om nuttige statistieken te genereren om de site te verbeteren."
    },
    "social": {
        "title": "Sociale netwerken",
        "details": "Sociale netwerken kunnen de bruikbaarheid van de site verbeteren en helpen deze via de shares te promoten."
    },
    "video": {
        "title": "Videos",
        "details": "Video sharing-services helpen om rich media op de site toe te voegen en de zichtbaarheid ervan te vergroten."
    },
    "comment": {
        "title": "Comments",
        "details": "Commentsmanagers faciliteren het indienen van opmerkingen en het bestrijden van spam."
    },
    "support": {
        "title": "Support",
        "details": "Support diensten stellen u in staat contact op te nemen met het team van de site en helpen het te verbeteren."
    },
    "api": {
        "title": "APIs",
        "details": "APIs worden gebruikt om scripts te laden: geolocatie, zoekmachines, vertalingen, ..."
    },
    "other": {
        "title": "Overig",
        "details": "Diensten om webinhoud weer te geven."
    },
    
    "mandatoryTitle": "Verplichte cookies",
    "mandatoryText": "Deze site maakt gebruik van cookies die nodig zijn voor de goede werking ervan en die niet kunnen worden gedeactiveerd."
};


/* Embedded language: no */
/*global tarteaucitron */
tarteaucitron.languages["no"] = {
	"middleBarHead" : "☝ 🍪",
	"adblock"       : "Hei! Dette nettstedet er gjennomsiktig og lar deg kontrollere hvilke tredjeparts tjenester du vil tillate.",
	"adblock_call"  : "For å gjøre endringer, vær så snill å deaktivere annonse-blokkering.",
	"reload"        : "Oppdater side",

	"alertBigScroll" : "Ved å fortsette å scrolle,",
	"alertBigClick"  : "Dersom du fortsetter å bruke dette nettstedet,",
	"alertBig"       : "tillater du alle tredjeparts tjenester",

	"alertBigPrivacy" : "Dette nettstedet bruker informasjonskapsler og gir deg kontroll over hva du vil aktivere",
	"alertSmall"      : "Administrer tjenester",
	"personalize"     : "Personaliser",
	"acceptAll"       : "OK, aksepter alt",
	"close"           : "Steng",

	"privacyUrl" : "Personvernregler",

	"all" : "Preferanse for alle tjenester",

	"info"             : "Beskytt ditt personvern",
	"disclaimer"       : "Ved å tillate disse tredjepartstjenestene godtar du informasjonskapslene deres og bruken av sporingsteknologier som er nødvendige for at de skal fungere korrekt.",
	"allow"            : "Tillat",
	"deny"             : "Ikke tillat",
	"noCookie"         : "Denne tjenesten bruker ikke informasjonskapsel.",
	"useCookie"        : "Denne tjenesten kan installeres",
	"useCookieCurrent" : "Denne tjenesten er installert",
	"useNoCookie"      : "TDenne tjenesten har ikke installert noen informasjonskapsel.",
	"more"             : "Les mer",
	"source"           : "Se den offisielle nettsiden",
	"credit"           : "Informasjonskapsler styres av tarteaucitron.js",
	"noServices"       : "Dette nettstedet bruker ingen informasjonskapsler som krever ditt samtykke.",

	"toggleInfoBox" : "Vis / skjul informasjon om lagring av informasjonskapsler",
	"title"         : "Panel for informasjonskapsler",
	"cookieDetail"  : "Informasjon om informasjonskapsler for",
	"ourSite"       : "på nettstedet vårt",
	"newWindow"     : "(nytt vindu)",
	"allowAll"      : "Tillat alle informasjonskapsler",
	"denyAll"       : "Nekt alle informasjonskapsler",

    "icon": "Cookies",

	"fallback" : "er skrudd av.",
	"allowed": "tillatt",
    "disallowed": "ikke tillatt",

	"ads"      : {
		"title"   : "Annonsenettverk",
		"details" : "Annonsenettverket kan generere inntekter ved å selge reklameplass på nettstedet."
	},
	"analytic" : {
		"title"   : "Målgruppe målinger",
		"details" : "Målgruppens målingstjenester ble brukt til å generere nyttig informasjon for å forbedre nettstedet."
	},
	"social"   : {
		"title"   : "Sosiale nettverk",
		"details" : "Sosiale nettverk kan forbedre brukervennligheten til nettstedet og bidra til å markedsføre det."
	},
	"video"    : {
		"title"   : "Video",
		"details" : "Videodelingstjenester hjelper til med å legge til rik media på nettstedet og øke synligheten."
	},
	"comment"  : {
		"title"   : "Kommentarer",
		"details" : "Kommentaradministratorer legger til rette for arkivering av kommentarer og bekjemper spam."
	},
	"support"  : {
		"title"   : "Brukerstøtte",
		"details" : "Brukerstøtte lar deg komme i kontakt med nettstedsteamet og bidra til å forbedre nettstedet."
	},
	"api"      : {
		"title"   : "API-er",
		"details" : "API-er brukes til å laste inn skript: geolokalisering, søkemotorer, oversettelser, ..."
	},
	"other"    : {
		"title"   : "Annet",
		"details" : "Tjenester for å vise innhold på nettet."
	},

	"mandatoryTitle" : "Obligatoriske informasjonskapsler",
	"mandatoryText"  : "Dette nettstedet bruker obligatoriske informasjonskapsler som er nødvendige for at nettstedet skal fungere som det skal. Disse kan ikke deaktiveres."
};

/* Embedded language: oc */
/*global tarteaucitron */
tarteaucitron.languages["oc"] = {

    "middleBarHead": "☝ 🍪",
    "adblock": "Bonjorn! Aqueste site jòga la transparéncia e vos dòna la possibilitat de causir los servicis tèrces a activar.",
    "adblock_call": "Mercés de desactivar vòstre adblocker per començar la personalizacion.",
    "reload": "Recargar la pagina",
    
    "alertBigScroll": "En contunhant de desfilar,",
    "alertBigClick": "En seguissent vòstra navigacion,",
    "alertBig": "acceptatz l'utilizacion de servicis tèrces que pòdon installar de cookies",
    
    "alertBigPrivacy": "Aqueste site utiliza de cookies e vos dòna lo contraròtle sus çò que volètz activar",
    "alertSmall": "Gestion dels servicis",
    "acceptAll": "OK, tot acceptar",
    "personalize": "Personalizar",
    "close": "Tampar",

    "privacyUrl": "Politica de confidencialitat",

    "all": "Preferéncias per totes los servicis",

    "info": "Proteccion de vòstra vida privada",
    "disclaimer": "En autorizant aquestes servicis tèrces, acceptatz lo depaus e la lectura de cookies e l'utilizacion de tecnologias de seguiment necessaris a lor bon foncionament.",
    "allow": "Autorizar",
    "deny": "Interdire",
    "noCookie": "Aqueste servici daissa pas cap de cookies.",
    "useCookie": "Aqueste servici pòt daissar",
    "useCookieCurrent": "Aqueste servici a daissat",
    "useNoCookie": "Aqueste servici a pas daissat cap de cookies.",
    "more": "Ne saber mai",
    "source": "Veire lo site oficial",
    "credit": "Gestion dels cookies per tarteaucitron.js",
    "noServices": "Aqueste site utiliza pas cap de cookies que demandan vòstre consentiment.",

    "toggleInfoBox": "Mostrar/amagar las informacions sus l'emmagazinatge dels cookies",
    "title": "Panèl de gestion dels cookies",
    "cookieDetail": "Detalh dels cookies",
    "ourSite": "sus nòstre site",
    "modalWindow": "(fenèstra de dialòg)",
    "newWindow": "(fenèstra novèla)",
    "allowAll": "Autorizar totes los cookies",
    "denyAll": "Interdire totes los cookies",

    "icon": "Cookies",
    
    "fallback": "es desactivat.",
    "allowed": "autorizat",
    "disallowed": "interdit",

    "ads": {
        "title": "Regias publicitàrias",
        "details": "Las regias publicitàrias permeton de gerir de revenguts en comercialisant los espacis publicitaris del site."
    },
    "analytic": {
        "title": "Mesura d'audiéncia",
        "details": "Los servicis de mesura d'audiéncia permeton de generar d'estatisticas de frequentacion utilas per melhorar lo site."
    },
    "social": {
        "title": "Malhums socials",
        "details": "Los malhums socials permeton de melhorar la convivéncia del site e d'ajudar sa promocion via los partatges."
    },
    "video": {
        "title": "Vidèos",
        "details": "Los servicis de partatge de vidèo permeton d'enriquir lo site de contengut multimèdia e aumentan sa visibilitat."
    },
    "comment": {
        "title": "Comentaris",
        "details": "Los gestionaris de comentaris facilitan lo depaus de vòstres comentaris e lutan contra los messatges indesirables."
    },
    "support": {
        "title": "Assiténcia",
        "details": "Los servicis d'assisténcia vos permeton de dintrar en contacte amb l'equipa del site e d'ajudar a son melhorament."
    },
    "api": {
        "title": "APIs",
        "details": "Las APIs permeton de cargar de scripts : geolocalizacion, motors de recèrca, traduccions, ..."
    },
    "other": {
        "title": "Autre",
        "details": "Servicis que cèrcan a afichar de contengut web."
    },
    
    "mandatoryTitle": "Cookies necessaris",
    "mandatoryText": "Aqueste site utiliza de cookies necessaris pel seu pròpri foncionament que pòdon pas èsser desactivats."
};


/* Embedded language: pl */
/*global tarteaucitron */
tarteaucitron.languages["pl"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Witaj! Ta witryna oferuje daje mozliwość wyboru aktywacji usług zewnętrznych.",
    "adblock_call": "Prosze wylaczyc adblocker aby rozpoczac dostosowanie do potrzeb uzytkownika.",
    "reload": "Odswież stronę",
    
    "alertBigScroll": "Poprzez kontynuowanie przewijania,",
    "alertBigClick": "Pozostając na tej stronie",
    "alertBig": "zgadzasz się na korzystanie ze wszystkich zewnetrzynych usług",
    
    "alertBigPrivacy": "Ta witryna używa plików cookie i pozwala wybrać na które chcesz zezwolić",
    "alertSmall": "Zarządzanie usługami",
    "personalize": "Personalizacja",
    "acceptAll": "OK, akceptuję wszystko",
    "close": "zamknij",

    "privacyUrl": "Polityka prywatności",
    
    "all": "Preferencja dla wszystkich usług",

    "info": "Ochrona prywatności",
    "disclaimer": "Zgadzając się na korzystanie z usług zewnętrznych, akceptujesz ich pliki cookies oraz wykorzystanie technologii śledzących, niezbędnych do ich funkcjonowania.",
    "allow": "Zezwalaj",
    "deny": "Odmów",
    "noCookie": "Ta usługa nie korzysta z plików cookie.",
    "useCookie": "Ta usługa może zainstalować pliki cookie",
    "useCookieCurrent": "Ta usługa zainstalowała pliki cookie",
    "useNoCookie": "Ta usługa nie zainstalowała żadnego pliku cookie.",
    "more": "Więcej informacji",
    "source": "Zobacz oficjalną stronę internetową",
    "credit": "Cookies menadżer od tarteaucitron.js",

    "toggleInfoBox": "Pokaż/ukryj informacje o zapisie plików cookie",
    "title": "Panel zarządzania plikami cookies",
    "cookieDetail": "Szczegóły plików cookie dla",
    "ourSite": "na naszej stronie",
    "modalWindow": "(okno modalne)",
    "newWindow": "(nowe okno)",
    "allowAll": "Zezwól na wszystkie pliki cookies",
    "denyAll": "Zablokuj wszystkie pliki cookies",

    "icon": "Cookies",
    
    "fallback": "jest nieaktywna.",
    "allowed": "dozwolony",
    "disallowed": "niedozwolone",

    "ads": {
        "title": "Sieć reklamowa",
        "details": "Sieci reklamowe mogą generować przychody ze sprzedaży powierzchni reklamowej na stronie."
    },
    "analytic": {
        "title": "Pomiar oglądalności",
        "details": "Usługi pomiaru oglądalności wykorzystywane są do generowania przydatnych statystyk potrzebnych w doskonaleniu strony."
    },
    "social": {
        "title": "Portale społecznościowe",
        "details": "Sieci społecznościowe mogą poprawić użyteczność serwisu i pomóc w promocji za pośrednictwem udostępniania strony."
    },
    "video": {
        "title": "Filmy",
        "details": "Usługa udostępniania wideo pomoże dodać multimedia do strony i zwiększyć jej ogladalność."
    },
    "comment": {
        "title": "Komentarze",
        "details": "Zarządzanie komentarzami ułatwia komentowanie i zwalcza spam."
    },
    "support": {
        "title": "Pomoc",
        "details": "Usługa pomocy technicznej pozwala skontaktować się z administratorem witryny i pomaga ją udoskonalić."
    },
    "api": {
        "title": "APIs",
        "details": "APIs służą do ładowania skryptów: geolokalizacji, wyszukiwarek, tłumaczenia, ..."
    },
    "other": {
        "title": "Inne",
        "details": "Usługi do wyświetlania treści internetowych."
    },
    
    "mandatoryTitle": "Mandatory cookies",
    "mandatoryText": "This site uses cookies necessary for its proper functioning which cannot be deactivated."
};


/* Embedded language: pt */
/*global tarteaucitron */
tarteaucitron.languages["pt"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Olá! Em uma ação de transparência, este site permite que você escolha quais serviços de terceiros ativar.",
    "adblock_call": "Por favor, desative seu bloqueador de publicidades para poder personalizar.",
    "reload": "Atualizar esta página",
    
    "alertBigScroll": "Ao continuar a rolar,",
    "alertBigClick": "Se você continuar a navegação neste site,",
    "alertBig": "você estará aceitando todos os serviços de terceiros",
    
    "alertBigPrivacy": "Este site utiliza cookies e dá-lhe controle sobre o que quer ativar",
    "alertSmall": "Gerenciar serviços",
    "personalize": "Personalizar",
    "acceptAll": "OK, aceitar tudo",
    "close": "Fechar",

    "privacyUrl": "Política de Privacidade",

    "all": "Definições dos serviços",
    "info": "Proteger sua privacidade",
    "disclaimer": "Ao aceitar os serviços terceiros, você aceita o uso de cookies em conjunto a tecnologias de rastreamento que lhe são necessárias para funcionar",
    "allow": "Autorizar",
    "deny": "Recusar",
    "noCookie": "Este serviço não usa cookies.",
    "useCookie": "Este serviço pode instalar",
    "useCookieCurrent": "Este serviço instalou",
    "useNoCookie": "Este serviço não instalou nenhum cookie.",
    "more": "Ler mais",
    "source": "Ver o site oficial",
    "credit": "Gerenciador de cookies por tarteaucitron.js",

    "toggleInfoBox": "Mostrar/ocultar informações sobre armazenamento de cookies",
    "title": "Painel de Gerenciamento de Cookies",
    "cookieDetail": "Detalhe do Cookie",
    "ourSite": "em nosso site",
    "modalWindow": "(janela modal)",
    "newWindow": "(janela nova)",
    "allowAll": "Permite todos os cookies",
    "denyAll": "Proíbe todos cookies",

    "icon": "Cookies",

    "fallback": "está desativado.",
    "allowed": "permitido",
    "disallowed": "não permitido",
    
    "ads": {
        "title": "Redes de anúncios",
        "details": "As redes de anúncios podem gerar receitas com a venda de espaço publicitário no site."
    },
    "analytic": {
        "title": "Medição de audiência",
        "details": "Serviços de medição de audiência usados para gerar estatísticas no intuito de melhorar o site."
    },
    "social": {
        "title": "Redes sociais",
        "details": "Redes sociais podem melhorar a utilização do site e ajudar a promovê-lo via compartilhamentos."
    },
    "video": {
        "title": "Vídeos",
        "details": "Serviços de compartilhamento de vídeo adicionam medias no site a aumentam sua visibilidade."
    },
    "comment": {
        "title": "Comentários",
        "details": "Gerenciadores de comentários facilitam o sistema de comentários e lutam contra o spam."
    },
    "support": {
        "title": "Suporte",
        "details": "Serviços de suporte lhe ajudam a entrar em contato com a equipe de suporte."
    },
    "api": {
        "title": "APIs",
        "details": "APIs são usadas para carregar scripts: geolocalização, motores de pesquisa, traduções..."
    },
    "other": {
        "title": "De outros",
        "details": "Serviços para exibir conteúdo da web."
    },
    
    "mandatoryTitle": "Cookies obrigatórios",
    "mandatoryText": "Este site utiliza alguns cookies que são necessários ao seu funcionamento e não podem ser desativados."
};


/* Embedded language: ro */
/*global tarteaucitron */
tarteaucitron.languages["ro"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Buna! Acest site este transparent și vă permite să alegeți serviciile terță parte pe care doriți să le permiteți.",
    "adblock_call": "Dezactivați-vă adblocker-ul pentru a începe personalizarea.",
    "reload": "Reincarca Pagina",
    
    "alertBigScroll": "Continuând să defilați,",
    "alertBigClick": "Dacă continuați să răsfoiți acest site,",
    "alertBig": "permiteți tuturor serviciilor terță parte",
    
    "alertBigPrivacy": "Acest site utilizează cookie-uri și vă oferă control asupra a ceea ce doriți să activați",
    "alertSmall": "Gestionați serviciile",
    "personalize": "Personalizați",
    "acceptAll": "OK, acceptați-le pe toate",
    "close": "Închide",

    "privacyUrl": "Politica de confidentialitate",
    
    "all": "Preferință pentru toate serviciile",

    "info": "Protejați-vă confidențialitatea",
    "disclaimer": "Permițând acestor servicii terțe părți să acceptați cookie-urile și utilizarea tehnologiilor de urmărire necesare pentru buna funcționare a acestora.",
    "allow": "Permite",
    "deny": "Refuza",
    "noCookie": "Acest serviciu nu utilizează modul cookie.",
    "useCookie": "Acest serviciu se poate instala",
    "useCookieCurrent": "Acest serviciu a fost instalat",
    "useNoCookie": "Acest serviciu nu a instalat niciun cookie.",
    "more": "Citeste mai mult",
    "source": "Vizualizați site-ul oficial",
    "credit": "Cookie manager de către tarteaucitron.js",

    "toggleInfoBox": "Afișați / ascundeți informații despre stocarea modulelor cookie",
    "title": "Panoul de gestionare a panourilor cookie",
    "cookieDetail": "Detaliile cookie pentru",
    "ourSite": "pe site-ul nostru",
    "modalWindow": "(fereastra modală)",
    "newWindow": "(fereastră nouă)",
    "allowAll": "Permiteți toate cookie-urile",
    "denyAll": "Respinge toate cookie-urile",

    "icon": "Cookies",
    
    "fallback": "este dezactivat.",
    "allowed": "permis",
    "disallowed": "nepermis",

    "ads": {
        "title": "Rețea de publicitate",
        "details": "Rețelele publicitare pot genera venituri prin vânzarea de spațiu publicitar pe site."
    },
    "analytic": {
        "title": "Măsurarea audienței",
        "details": "Serviciile de măsurare a audienței utilizate pentru a genera participarea la statistici utile pentru îmbunătățirea site-ului."
    },
    "social": {
        "title": "Retele sociale",
        "details": "Rețelele sociale pot îmbunătăți gradul de utilizare a site-ului și pot ajuta să îl promoveze prin intermediul acțiunilor."
    },
    "video": {
        "title": "Videoclipuri",
        "details": "Serviciile de partajare video ajută la adăugarea de materiale media pe site și la creșterea vizibilității acestora."
    },
    "comment": {
        "title": "Comentarii",
        "details": "Managerii de comentarii facilitează depunerea de comentarii și lupta împotriva spamului."
    },
    "support": {
        "title": "Susţinere",
        "details": "Serviciile de asistență vă permit să contactați echipa site-ului și să vă ajutați să îl îmbunătățiți."
    },
    "api": {
        "title": "APIs",
        "details": "API-urile sunt folosite pentru a încărca scripturi: geolocație, motoare de căutare, traduceri, ..."
    },
    "other": {
        "title": "Alte",
        "details": "Servicii pentru afișarea conținutului web."
    },
    
    "mandatoryTitle": "Mandatory cookies",
    "mandatoryText": "This site uses cookies necessary for its proper functioning which cannot be deactivated."
};


/* Embedded language: ru */
/*global tarteaucitron */
tarteaucitron.languages["ru"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Привет! Этот сайт совершенно открытый и позволяет вам выбрать сервисы третьих лиц, которым вы хотите дать доступ.",
    "adblock_call": "Пожалуйста дезактивируйте АдБлокер чтобы начать настройку.",
    "reload": "Перезагрузите страницу",
    
    "alertBigScroll": "Продолжая прокрутки",
    "alertBigClick": "Если вы продолжаете использовать сайт",
    "alertBig": "вы позволяете сервисы третьих лиц",
    
    "alertBigPrivacy": "Этот сайт использует кукис и позволяет вам контролировать сервисы которые вы хотите активировать",
    "alertSmall": "Настройка сервисов",
    "personalize": "Персонализировать",
    "acceptAll": "Ок, все активировать",
    "close": "Закрыть",

    "privacyUrl": "Политика конфиденциальности",
    
    "all": "Преференция всем сервисам",

    "info": "Защитить вашу конфиденциальность",
    "disclaimer": "Активирование сервисов третьих лиц позволяет использование их кукис и технолоний отслеживания необходимых для их функционирования",
    "allow": "Позволить",
    "deny": "Не позволить",
    "noCookie": "Этот сервис не использует кукис.",
    "useCookie": "Этот сервис может быть инсталирован",
    "useCookieCurrent": "Этот сервис инсталирован",
    "useNoCookie": "Этот сервис не использует кукис.",
    "more": "Подробнее",
    "source": "Посетите официальный сайт",
    "credit": "Кукис манаджер tarteaucitron.js",

    "toggleInfoBox": "Show/hide informations about cookie storage",
    "title": "Панель управления cookies",
    "cookieDetail": "Информация о файлах cookie для",
    "ourSite": "на нашем сайте",
    "modalWindow": "(модальное окно)",
    "newWindow": "(новое окно)",
    "allowAll": "Разрешить использование cookies",
    "denyAll": "Запретить использование cookies",

    "icon": "Cookies",
    
    
    "fallback": "Деактивирован.",
    "allowed": "разрешается",
    "disallowed": "запрещено",

    "ads": {
        "title": "Рекламная сеть",
        "details": "Мы позволяем вам аренду нашей рекламной сети."
    },
    "analytic": {
        "title": "Измерение аудиенции",
        "details": "Измерение аудиенции сайта для статистики помогают улучшить предлагаемый сервис."
    },
    "social": {
        "title": "Социальная сеть",
        "details": "Социальная сеть сайтов помогает улучшить предлагаемый сервис через обмен информации."
    },
    "video": {
        "title": "Видео",
        "details": "Обмен видео информации позволяет улучшить сервис и увеличит траффик сайта."
    },
    "comment": {
        "title": "Комментарии",
        "details": "Манаджер комментариев позволяет обмен информации и борьбу со спамом."
    },
    "support": {
        "title": "Помощь",
        "details": "Помощь позволяет вам контактировать напрямую сайт манаджер и улучшить предлагаемый сервис."
    },
    "api": {
        "title": "АПИ",
        "details": "АПИ используются для загрузки скриптов; геолокация, поисковый мотор и переводы..."
    },
    "other": {
        "title": "Другие",
        "details": "Службы для отображения веб-контента."
    },
    
    "mandatoryTitle": "Mandatory cookies",
    "mandatoryText": "This site uses cookies necessary for its proper functioning which cannot be deactivated."
};


/* Embedded language: se */
/*global tarteaucitron */
tarteaucitron.languages["se"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Hej! Denna webbplats är transparent och låter dig välja de tredjeparts tjänster du vill tillåta.",
    "adblock_call": "Inaktivera din adblock för att börja anpassa.",
    "reload": "Uppdatera sidan",

    "alertBigScroll": "Genom att fortsätta rulla,",
    "alertBigClick": "Om du fortsätter att surfa på denna webbplats,",
    "alertBig": "du tillåter alla tjänster från tredje part",

    "alertBigPrivacy": "Denna webbplats använder cookies och ger dig kontroll över vad du vill aktivera",
    "alertSmall": "Hantera tjänster",
    "personalize": "Personifiera",
    "acceptAll": "OK, acceptera allt",
    "close": "Stänga",

    "privacyUrl": "Integritetspolicy",

    "all": "Preferens för alla tjänster",

    "info": "Skydda din integritet",
    "disclaimer": "Genom att tillåta dessa tjänster från tredje part accepterar du deras cookies och användningen av spårningsteknologier som är nödvändiga för att de ska fungera korrekt.",
    "allow": "Tillåta",
    "deny": "Förneka",
    "noCookie": "Den här tjänsten använder inte cookie.",
    "useCookie": "Den här tjänsten kan installeras",
    "useCookieCurrent": "Den här tjänsten har installerat",
    "useNoCookie": "Den här tjänsten har inte installerat någon cookie.",
    "more": "Läs mer",
    "source": "Visa den officiella webbplatsen",
    "credit": "Cookies manager av tarteaucitron.js",

    "toggleInfoBox": "Visa / dölj information om lagring av cookies",
    "title": "Cookie- hanteringspanel",
    "cookieDetail": "cookie- detalj för",
    "ourSite": "på vår webbplats",
    "modalWindow": "(modalt fönster)",
    "newWindow": "(nytt fönster)",
    "allowAll": "Tillåt alla cookie",
    "denyAll": "Neka alla cookies",

    "icon": "Cookies",

    "fallback": "är ur funktion.",
    "allowed": "tillåten",
    "disallowed": "tillåtet",

    "ads": {
        "title": "Annonsnätverk",
        "details": "Annonsnätverk kan generera intäkter genom att sälja annonsutrymme på webbplatsen."
    },
    "analytic": {
        "title": "Publikmätning",
        "details": "Publikmätningstjänster som används för att generera användbar statistik närvaro för att förbättra webbplatsen."
    },

    "social": {
        "title": "Sociala nätverk",
        "details": "Sociala nätverk kan förbättra användbarheten på webbplatsen och bidra till att marknadsföra den via aktierna."
    },
    "video": {
        "title": "videoklipp",
        "details": "Videodelningstjänster hjälper till att lägga till rika medier på webbplatsen och öka synligheten."
    },
    "comment": {
        "title": "Коментари",
        "details": "Kommentarhanterare underlättar inlämning av kommentarer och bekämpar skräppost."
    },
    "support": {
        "title": "Stöd",
        "details": "Supporttjänster gör att du kan komma i kontakt med webbplatsteamet och hjälpa dig att förbättra det."
    },
    "api": {
        "title": "APIs",
        "details": "APIs: er används för att ladda skript: geolocation, sökmotorer, översättningar, ..."
    },
    "other": {
        "title": "Övrig",
        "details": "Tjänster för att visa webbinnehåll."
    },
    
    "mandatoryTitle": "Mandatory cookies",
    "mandatoryText": "This site uses cookies necessary for its proper functioning which cannot be deactivated."
};


/* Embedded language: sk */
/*global tarteaucitron */
tarteaucitron.languages["sk"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Ahoj! Táto stránka je transparentná a umožňuje vám vybrať služby tretích strán, ktoré chcete povoliť.",
    "adblock_call": "Prosím, vypnite blokovanie reklám k začatiu prispôsobovania",
    "reload": "Obnovte stránku",
    
    "alertBigScroll": "Pokračovaním v posúvaní,",
    "alertBigClick": "Ak budete pokračovať v prehliadaní tejto webovej stránky,",
    "alertBig": "povoľujete všetky služby tretích strán",
    
    "alertBigPrivacy": "Táto stránka používa cookies a dáva vám kontrolu nad tým, čo chcete aktivovať",
    "alertSmall": "Spravovať služby",
    "personalize": "Prispôsobiť",
    "acceptAll": "OK, prijať všetko",
    "close": "Zatvoriť",

    "privacyUrl": "Zásady ochrany osobných údajov",
    
    "all": "Prednosť pre všetky služby",

    "info": "Ochrana vášho súkromia",
    "disclaimer": "Povolením týchto služieb tretích strán, prijímate ich cookies a používanie sledovacích technológií potrebných pre ich správne fungovanie.",
    "allow": "Povoliť",
    "deny": "Odmietnúť",
    "noCookie": "Táto služba nepoužíva cookies.",
    "useCookie": "Túto službu je možné nainštalovať",
    "useCookieCurrent": "Táto služba je nainštalovaná",
    "useNoCookie": "Táto služba nenainštalovala žiadny súbor cookie.",
    "more": "Čítaj viac",
    "source": "Pozrite si oficiálnu webovú stránku",
    "credit": "Správca súborov cookie od tarteaucitron.js",
    "noServices": "Táto webová stránka nepoužíva žiadny súbor cookie, ktorý vyžaduje váš súhlas.",

    "toggleInfoBox": "Zobraziť/skryť informácie o ukladaní súborov cookie",
    "title": "Panel riadenia súborov cookie",
    "cookieDetail": "Podrobnosti súboru cookie pre",
    "ourSite": "na našich stránkach",
    "modalWindow": "(modálne okno)",
    "newWindow": "(nové okno)",
    "allowAll": "Povoľte všetky súbory cookie",
    "denyAll": "Odmietnuť všetky súbory cookie",

    "icon": "Cookies",
    
    "fallback": "je zakázané.",
    "allowed": "povolený",
    "disallowed": "nepovolený",

    "ads": {
        "title": "Reklamná sieť",
        "details": "Reklamné siete môžu generovať príjmy predajom reklamného priestoru na webe."
    },
    "analytic": {
        "title": "Meranie publika",
        "details": "Služby merania publika používané na generovanie užitočnej štatistickej účasti na zlepšenie stránky."
    },
    "social": {
        "title": "Sociálne siete",
        "details": "Sociálne siete môžu zlepšiť použiteľnosť stránky a pomôcť ju propagovať prostredníctvom akcií."
    },
    "video": {
        "title": "Videá",
        "details": "Služby zdieľania videa pomáhajú pridať na web bohatý obsah a zvýšiť jeho viditeľnosť."
    },
    "comment": {
        "title": "Komentáre",
        "details": "Manažéri komentárov uľahčujú zadávanie komentárov a bojujú proti spamu."
    },
    "support": {
        "title": "Podpora",
        "details": "Podporné služby vám umožňujú skontaktovať sa s tímom stránok a pomôcť vám ich vylepšiť."
    },
    "api": {
        "title": "APIs",
        "details": "Rozhrania API sa používajú na načítanie skriptov: geolokácia, vyhľadávače, preklady, ..."
    },
    "other": {
        "title": "Ostatné",
        "details": "Služby na zobrazovanie webového obsahu."
    },
    
    "mandatoryTitle": "Mandatory cookies",
    "mandatoryText": "This site uses cookies necessary for its proper functioning which cannot be deactivated."
};


/* Embedded language: sv */
/*global tarteaucitron */
tarteaucitron.languages["sv"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Hej! Denna webbplats är transparent och låter dig välja de tredjeparts tjänster du vill tillåta.",
    "adblock_call": "Inaktivera din adblock för att börja anpassa.",
    "reload": "Uppdatera sidan",

    "alertBigScroll": "Genom att fortsätta rulla,",
    "alertBigClick": "Om du fortsätter att surfa på denna webbplats,",
    "alertBig": "du tillåter alla tjänster från tredje part",

    "alertBigPrivacy": "Denna webbplats använder cookies och ger dig kontroll över vad du vill aktivera",
    "alertSmall": "Hantera tjänster",
    "personalize": "Personifiera",
    "acceptAll": "OK, acceptera allt",
    "close": "Stänga",

    "privacyUrl": "Integritetspolicy",

    "all": "Preferens för alla tjänster",

    "info": "Skydda din integritet",
    "disclaimer": "Genom att tillåta dessa tjänster från tredje part accepterar du deras cookies och användningen av spårningsteknologier som är nödvändiga för att de ska fungera korrekt.",
    "allow": "Tillåta",
    "deny": "Förneka",
    "noCookie": "Den här tjänsten använder inte cookie.",
    "useCookie": "Den här tjänsten kan installeras",
    "useCookieCurrent": "Den här tjänsten har installerat",
    "useNoCookie": "Den här tjänsten har inte installerat någon cookie.",
    "more": "Läs mer",
    "source": "Visa den officiella webbplatsen",
    "credit": "Cookies manager av tarteaucitron.js",

    "toggleInfoBox": "Visa / dölj information om lagring av cookies",
    "title": "Cookie- hanteringspanel",
    "cookieDetail": "cookie- detalj för",
    "ourSite": "på vår webbplats",
    "modalWindow": "(modalt fönster)",
    "newWindow": "(nytt fönster)",
    "allowAll": "Tillåt alla cookie",
    "denyAll": "Neka alla cookies",

    "icon": "Cookies",

    "fallback": "är ur funktion.",
    "allowed": "tillåten",
    "disallowed": "tillåtet",

    "ads": {
        "title": "Annonsnätverk",
        "details": "Annonsnätverk kan generera intäkter genom att sälja annonsutrymme på webbplatsen."
    },
    "analytic": {
        "title": "Publikmätning",
        "details": "Publikmätningstjänster som används för att generera användbar statistik närvaro för att förbättra webbplatsen."
    },

    "social": {
        "title": "Sociala nätverk",
        "details": "Sociala nätverk kan förbättra användbarheten på webbplatsen och bidra till att marknadsföra den via aktierna."
    },
    "video": {
        "title": "videoklipp",
        "details": "Videodelningstjänster hjälper till att lägga till rika medier på webbplatsen och öka synligheten."
    },
    "comment": {
        "title": "Коментари",
        "details": "Kommentarhanterare underlättar inlämning av kommentarer och bekämpar skräppost."
    },
    "support": {
        "title": "Stöd",
        "details": "Supporttjänster gör att du kan komma i kontakt med webbplatsteamet och hjälpa dig att förbättra det."
    },
    "api": {
        "title": "APIs",
        "details": "APIs: er används för att ladda skript: geolocation, sökmotorer, översättningar, ..."
    },
    "other": {
        "title": "Övrig",
        "details": "Tjänster för att visa webbinnehåll."
    },
    
    "mandatoryTitle": "Mandatory cookies",
    "mandatoryText": "This site uses cookies necessary for its proper functioning which cannot be deactivated."
};


/* Embedded language: tr */
/*global tarteaucitron */
tarteaucitron.languages["tr"] = {

    "middleBarHead": "☝ 🍪",
    "adblock": "Merhaba! Bu site şeffaflıkla oynar ve size etkinleştirilecek üçüncü taraf hizmetleri seçeneği sunar.",
    "adblock_call": "Kişiselleştirmeye başlamak için lütfen reklam engelleyicinizi devre dışı bırakın.",
    "reload": "Sayfayı yeniden yükle",
    
    "alertBigScroll": "Kaydırma devam edien,",
    "alertBigClick": "Navigasyonunuza devam ederek,",
    "alertBig": "çerez yükleyebilecek üçüncü taraf hizmetlerinin kullanımını kabul edersiniz",
    
    "alertBigPrivacy": "Bu site çerezleri kullanır ve etkinleştirmek istediklerinizi kontrol etmenizi sağlar",
    "alertSmall": "Hizmet yönetimi",
    "acceptAll": "evet, her şeyi kabul edin",
    "personalize": "kişiselleştirmek",
    "close": "kapat",

    "privacyUrl": "Gizlilik Politikası",

    "all": "Tüm hizmetler için tercihler",

    "info": "Gizliliğinin korunması",
    "disclaimer": "Bu üçüncü taraf hizmetlerini yetkilendirerek, çerezlerin depolanmasını ve okunmasını ve düzgün çalışması için gerekli izleme teknolojilerinin kullanımını kabul ediyorsunuz.",
    "allow": "izin",
    "deny": "yasak",
    "noCookie": "Bu hizmet çerez yerleştirmez.",
    "useCookie": "Bu hizmet para yatırabilir",
    "useCookieCurrent": "Bu hizmet sunuldu",
    "useNoCookie": "Bu hizmet herhangi bir çerez yerleştirmedi.",
    "more": "Daha fazlasını öğrenin",
    "source": "web sitesine bakın",
    "credit": "Çerez yönetimi tarteaucitron.js",
    "noServices": "Bu site, onayınızı gerektiren hiçbir çerez kullanmıyor.",

    "toggleInfoBox": "Çerezlerin depolanmasıyla ilgili bilgileri göster / gizle",
    "title": "Çerez yönetimi paneli",
    "cookieDetail": "Ayrıntı çerezleri",
    "ourSite": "sitemizde",
    "modalWindow": "(kalıcı pencere)",
    "newWindow": "(yeni pencere)",
    "allowAll": "Tüm çerezlere izin verin",
    "denyAll": "Tüm çerezleri yasaklayın",

    "icon": "Cookies",
    
    "fallback": "devre dışı.",
    "allowed": "izin verildi",
    "disallowed": "izin verilmeyen",

    "ads": {
        "title": "Reklam yönetimi",
        "details": "Reklam ajansları, sitedeki reklam alanını pazarlayarak gelir elde etmenizi sağlar."
    },
    "analytic": {
        "title": "Kitle ölçümü",
        "details": "Kitle ölçüm hizmetleri, siteyi geliştirmek için yararlı katılım istatistikleri oluşturur."
    },
    "social": {
        "title": "Sosyal Medya",
        "details": "Sosyal ağlar sitenin kullanım kolaylığını geliştirir ve paylaşım yoluyla sitenin tanıtımına yardımcı olur."
    },
    "video": {
        "title": "Videolar",
        "details": "Video paylaşım hizmetleri siteyi multimedya içeriğiyle zenginleştirir ve görünürlüğünü artırır.\n" +
            "\n"
    },
    "comment": {
        "title": "yorumlar\n",
        "details": "Yorum yöneticileri yorumlarınızın gönderilmesini kolaylaştırır ve spam ile mücadele eder.",
    },
    "support": {
        "title": "destek",
        "details": "Destek hizmetleri, site ekibiyle iletişim kurmanıza ve ekibinizi geliştirmenize yardımcı olur.\n" +
            "\n"
    },
    "api": {
        "title": "APIs",
        "details": "APIs komut dosyalarının yüklenmesine izin verir: coğrafi konum, arama motorları, çeviriler, ..."
    },
    "other": {
        "title": "diğer\n",
        "details": "Web içeriğini görüntüleme hizmetleri."
    },
    
    "mandatoryTitle": "Mandatory cookies",
    "mandatoryText": "This site uses cookies necessary for its proper functioning which cannot be deactivated."
};


/* Embedded language: uk */
/*global tarteaucitron */
tarteaucitron.languages["uk"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Добрий день! Цей сайт нічого від вас не приховує і дає вам можливість обрати, які сторонні послуги увімкнути.",
    "adblock_call": "Будь ласка вимкніть ваш блокувач реклами, щоб перейти до налаштувань.",
    "reload": "Перезавантажити сторінку",
    
    "alertBigScroll": "Продовжуючи прокрутку,",
    "alertBigClick": "Продовжуючи навігацію,",
    "alertBig": "ви погоджуєтесь на використання сторонніх послуг, які можуть встановлювати кукі",
    
    "alertBigPrivacy": "Цей сайт використовує кукі і дає вам можливість обрати ті, які ви хочете увімкнути",
    "alertSmall": "Керування послугами",
    "acceptAll": "Прийняти все",
    "personalize": "Налаштувати",
    "close": "Закрити",

    "privacyUrl": "Політика конфіденційності",

    "all": "Налаштування всіх послуг",

    "info": "Захист вашого особистого життя",
    "disclaimer": "Дозволяючи ці сторонні послуги, ви даєте згоду на збереження і завантаження кукі, а також на використання засобів відстеження, необхідних для їхньої функціональності.",
    "allow": "Дозволити",
    "deny": "Заборонити",
    "noCookie": "Ця послуга не зберігає жодного кукі.",
    "useCookie": "Ця послуга може зберегти",
    "useCookieCurrent": "Ця послуга зберегла",
    "useNoCookie": "Ця послуга не зберегла жодного кукі.",
    "more": "Дізнатись більше",
    "source": "Перейти на офіційний сайт",
    "credit": "Керування кукі від tarteaucitron.js",
    "noServices": "Цей сайт не використовує жодного кукі, який потребував би вашої згоди.",

    "toggleInfoBox": "Показати/приховати інформацію про збереження кукі",
    "title": "Панель керування кукі",
    "cookieDetail": "Подробиці про кукі",
    "ourSite": "на нашому сайті",
    "modalWindow": "(модальне вікно)",
    "newWindow": "(нове вікно)",
    "allowAll": "Все прийняти",
    "denyAll": "Все відхилити",

    "icon": "Кукі",
    
    "fallback": "вимкнено.",
    "allowed": "дозволено",
    "disallowed": "заборонено",

    "ads": {
        "title": "Рекламні мережі",
        "details": "Рекламні мережі дають змогу отримувати дохід, монетизуючи рекламні блоки на сайті."
    },
    "analytic": {
        "title": "Заміри аудиторії",
        "details": "Послуги з замірів аудиторії дозволяють генерувати статистику відвідуваності, корисну для покращення сайту."
    },
    "social": {
        "title": "Соціальні мережі",
        "details": "Соціальні мережі дозволяють зробити сайт зручнішим і допомагають просувати його через розповсюдження посилань."
    },
    "video": {
        "title": "Відеоролики",
        "details": "Відеохостинги дають змогу збагатити сайт мультімедійним контентом і сприяють його видимості."
    },
    "comment": {
        "title": "Коментарі",
        "details": "Менеджери коментарів полегшують додавання ваших коментарів і захищають від спаму."
    },
    "support": {
        "title": "Підтримка",
        "details": "Послуги підтримки дають вам можливість зв'язатись з адміністрацією сайту і допомогти покращити його."
    },
    "api": {
        "title": "API",
        "details": "API дозволяють завантажувати скрипти: геолокація, пошукові системи, переклади..."
    },
    "other": {
        "title": "Інші",
        "details": "Послуги для відображення веб-контенту."
    },
    
    "mandatoryTitle": "Обов'язкові кукі",
    "mandatoryText": "Цей сайт використовує кукі, які є необхідніми для забезпечення його функціональності. Вимкнути їх неможливо."
};

/* Embedded language: vi */
/*global tarteaucitron */
tarteaucitron.languages["vi"] = {
    "middleBarHead": "☝ 🍪",
    "adblock": "Xin chào! Trang web này minh bạch và cho phép bạn chọn dịch vụ bên thứ 3 mà bạn muốn cho phép.",
    "adblock_call": "Vui lòng vô hiệu hóa trình chặn quảng cáo của bạn để bắt đầu tùy chỉnh.",
    "reload": "Làm mới trang",

    "alertBigScroll": "tiếp tục cuộn,",
    "alertBigClick": "Nếu bạn tiếp tục truy cập trang web này,",
    "alertBig": "bạn đang cho phép tất cả các dịch vụ của bên thứ ba",

    "alertBigPrivacy": "Trang web này sử dụng cookie và cung cấp cho bạn quyền kiểm soát những gì bạn muốn kích hoạt",
    "alertSmall": "Quản lý dịch vụ",
    "acceptAll": "OK, đồng ý",
    "personalize": "Cá nhân",
    "close": "Đóng",

    "privacyUrl": "Chính sách bảo mật",

    "all": "Ưu tiên cho tất cả các dịch vụ",

    "info": "Bảo vệ sự riêng tư của bạn",
    "disclaimer": "Bằng cách cho phép các dịch vụ bên thứ ba này, bạn chấp nhận cookie của họ và sử dụng các công nghệ theo dõi cần thiết cho hoạt động đúng đắn của họ.",
    "allow": "Cho phép",
    "deny": "Từ chối",
    "noCookie": "Dịch vụ này không sử dụng cookie.",
    "useCookie": "Dịch vụ này có thể cài đặt",
    "useCookieCurrent": "Dịch vụ này đã được cài đặt",
    "useNoCookie": "Dịch vụ này không được cài đặt bất cứ cookie nào.",
    "more": "Xem thêm",
    "source": "Xam trang web chính thức",
    "credit": "Cookies được quản lý bằng tarteaucitron.js",
    "noServices": "Trang web này không sử dụng bất kì cookie nào yêu cầu sự chấp thuận của bạn.",

    "toggleInfoBox": "Hiển thị / ẩn thông tin về lưu trữ cookie",
    "title": "Bảng quản lý cookie",
    "cookieDetail": "Cookie chi tiết",
    "ourSite": "trên site của chúng ta",
    "modalWindow": "(cửa sổ phương thức)",
    "newWindow": "(Cửa sổ mới)",
    "allowAll": "Cho phép tất cả các Cookies",
    "denyAll": "Từ chối cất cả cookies",

    "icon": "Cookies",

    "fallback": "tắt.",
    "allowed": "được phép",
    "disallowed": "không được phép",

    "ads": {
        "title": "Mạng quảng cáo",
        "details": "Mạng quảng cáo có thể tạo doanh thu bằng cách bán không gian quảng cáo trên trang web."
    },
    "analytic": {
        "title": "Đo lường hành vi người dùng",
        "details": "Công cụ đo lường hành vi người dùng cập nhật những thống kê hữu ích nhằm nâng cao chất lượng phục vụ của website."
    },
    "social": {
        "title": "Các mạng xã hội",
        "details": "Mạng xã hội có thể cải thiện khả năng sử dụng của trang web và giúp quảng bá nó thông qua các chia sẻ."
    },
    "video": {
        "title": "Các video",
        "details": "Dịch vụ chia sẻ video giúp thêm phương tiện phong phú trên trang web và tăng khả năng hiển thị của nó."
    },
    "comment": {
        "title": "Bình luận",
        "details": "Quản lý comments tạo điều kiện cho việc gửi ý kiến và chống thư rác."
    },
    "support": {
        "title": "Hỗ trợ",
        "details": "Các dịch vụ hỗ trợ cho phép bạn liên lạc với nhóm trang web và giúp cải thiện nó."
    },
    "api": {
        "title": "APIs",
        "details": "APIs được sử dụng để load: geolocation, search engines, translations, ..."
    },
    "other": {
        "title": "Dịch vụ khác",
        "details": "Dịch vụ hiển thị nội dung web."
    },
    
    "mandatoryTitle": "Mandatory cookies",
    "mandatoryText": "This site uses cookies necessary for its proper functioning which cannot be deactivated."
};


/* Embedded language: zh */
/*global tarteaucitron */
tarteaucitron.languages["zh"] = {
    "adblock": "您好！这是一个透明的网站，您可以选择激活不同的第三方服务。",
    "adblock_call": "感谢您停用广告拦截功能并开始个性化设置。",
    "reload": "重新加载页面",

    "alertBigScroll": "继续划屏，",
    "alertBigClick": "继续浏览，",
    "alertBig": "即表示您同意第三方服务安装cookie",

    "alertBigPrivacy": "这个网站使用cookie， 并让您可以控制想要激活的内容。",
    "alertSmall": "服务管理",
    "acceptAll": "好的，全部接受",
    "personalize": "个性化",
    "close": "关闭",

    "privacyUrl": "保密政策",

    "all": "所有服务的偏好设置",

    "disclaimer": "通过授权这些第三方服务，您同意存储和读取cookie，并使用其正常运行所需的跟踪技术。",
    "allow": "允许",
    "deny": "禁用",
    "noCookie": "此服务不存储任何cookie。",
    "useCookie": "此服务可以存储",
    "useCookieCurrent": "此服务已存储",
    "useNoCookie": "此服务未存储任何cookie。",
    "more": "了解更多",
    "source": "查看官网",
    "credit": "通过tarteaucitron.js管理cookie",

    "toggleInfoBox": "显示/隐藏cookie存储信息。",
    "title": "Cookie管理面板",
    "cookieDetail": "Cookie详情",
    "ourSite": "显示在我们的网站上",
    "modalWindow": "（模态窗口）",
    "newWindow": "（新建窗口）",
    "allowAll": "允许",
    "denyAll": "禁用",

    "icon": "Cookies",

    "fallback": "已禁用。",
    "allowed": "允许的",
    "disallowed": "不允许的",

    "ads": {
        "title": "广告组",
        "details": "广告组通过营销网站上的广告空间来产生收入."
    },
    "analytic": {
        "title": "受众测量",
        "details": "受众测量服务可以生成对站点改进有用的访问统计数据。"
    },
    "social": {
        "title": "社交网络",
        "details": "社交网络有助于提高网站的用户友好性，并通过分享帮助推广。"
    },
    "video": {
        "title": "视频",
        "details": "视频共享服务丰富网站的多媒体内容，提高网站知名度。"
    },
    "comment": {
        "title": "评论",
        "details": "评论管理器使您的评论更容易提交，并避免垃圾邮件。"
    },
    "support": {
        "title": "支持",
        "details": "支持服务使您能够与网站团队联系并帮助改进网站."
    },
    "api": {
        "title": "API",
        "details": "API允许加载脚本：地理位置、搜索引擎、翻译……"
    },
    "other": {
        "title": "其他",
        "details": "旨在显示网页内容的服务。"
    },
    
    "mandatoryTitle": "Mandatory cookies",
    "mandatoryText": "This site uses cookies necessary for its proper functioning which cannot be deactivated."
};


/* Embedded services */
/*global tarteaucitron, ga, Shareaholic, stLight, clicky, top, google, Typekit, FB, ferankReady, IN, stButtons, twttr, PCWidget*/
/*jslint regexp: true, nomen: true*/

// generic iframe
tarteaucitron.services.iframe = {
    "key": "iframe",
    "type": "other",
    "name": "Web content",
    "uri": "",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_iframe'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x,"title")) : '',
                width = tarteaucitron.getElemAttr(x,"width"),
                height = tarteaucitron.getElemAttr(x,"height"),
                allowfullscreen = tarteaucitron.getElemAttr(x,"allowfullscreen"),
                url = tarteaucitron.getElemAttr(x,"url");

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'iframe';
        tarteaucitron.fallback(['tac_iframe'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem,'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem,'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// kwanko
tarteaucitron.services.kwanko = {
    "key": "kwanko",
    "type": "ads",
    "name": "Kwanko",
    "uri": "https://www.kwanko.com/fr/rgpd/politique-gestion-donnees/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_kwanko'], function (x) {
            var mclic = x.getAttribute("data-mclic");

            return '<img src="https://action.metaffiliation.com/trk.php?mclic=' + mclic + '" width="1" height="1" border="0" />';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'kwanko';
        tarteaucitron.fallback(['tac_kwanko'], function (elem) {
            return tarteaucitron.engage(id);
        });
    }
};

// leadforensics
tarteaucitron.services.leadforensics = {
    "key": "leadforensics",
    "type": "ads",
    "name": "Lead Forensics",
    "uri": "https://www.leadforensics.com/cookie-policy/",
    "needConsent": true,
    "cookies": ['ifuuid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.leadforensicsId === undefined) {
            return;
        }

        tarteaucitron.addScript('https://secure.team8save.com/js/sc/'+ tarteaucitron.user.leadforensicsId +'.js');
    }
};

// ubib
tarteaucitron.services.ubib = {
    "key": "ubib",
    "type": "support",
    "name": "Ubib Chatbot",
    "uri": "https://ubib.libanswers.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.ubibId === undefined || tarteaucitron.user.ubibHash === undefined) {
            return;
        }

        tarteaucitron.addScript('https://' + tarteaucitron.user.ubibId + '.libanswers.com/load_chat.php?hash=' + tarteaucitron.user.ubibHash);
    }
};

// wysistathightrack
tarteaucitron.services.wysistathightrack = {
    "key": "wysistathightrack",
    "type": "analytic",
    "name": "Wysistat (privacy by design)",
    "uri": "https://www.wysistat.net/webanalytics/exemption-cnil/",
    "needConsent": false,
    "cookies": ['wysistat'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.wysistatNom === undefined) {
            return;
        }

        window._wsq = window._wsq || [];
        window._wsq.push(['_setNom', tarteaucitron.user.wysistatNom]);
        window._wsq.push(['_wysistat']);

        tarteaucitron.addScript('https://www.wysistat.com/ws.jsa');
    }
};

// robofabrica
tarteaucitron.services.robofabrica = {
    "key": "robofabrica",
    "type": "support",
    "name": "Robo Fabrica Chatbot",
    "uri": "https://robofabrica.tech/charte-vie-privee/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.robofabricaUuid === undefined) {
            return;
        }

        tarteaucitron.addScript('https://app.robofabrica.tech/widget/script', 'inceptive-cw-script', function() {

            document.getElementById('inceptive-cw-script').setAttribute('unique-url', tarteaucitron.user.robofabricaUuid);
            document.getElementById('inceptive-cw-script').setAttribute('label', 'start');
            document.getElementById('inceptive-cw-script').setAttribute('launch-btn-id', 'inceptive-cw-launch');
            document.getElementById('inceptive-cw-script').setAttribute('chat-server-url', 'https://app.robofabrica.tech:443');

        });
    }
};

// trustpilot
tarteaucitron.services.trustpilot = {
    "key": "trustpilot",
    "type": "other",
    "name": "Trustpilot",
    "uri": "https://fr.legal.trustpilot.com/for-reviewers/end-user-privacy-terms",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['trustpilot-widget'], '');
        tarteaucitron.addScript('https://widget.trustpilot.com/bootstrap/v5/tp.widget.sync.bootstrap.min.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'trustpilot';
        tarteaucitron.fallback(['trustpilot-widget'], function (elem) {
            elem.style.width = elem.getAttribute('data-style-width');
            elem.style.height = elem.getAttribute('data-style-height');
            return tarteaucitron.engage(id);
        });
    }
};

// snapchat
tarteaucitron.services.snapchat = {
    "key": "snapchat",
    "type": "analytic",
    "name": "Snapchat",
    "uri": "https://snap.com/fr-FR/privacy/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.snapchatId === undefined || tarteaucitron.user.snapchatEmail === undefined) {
            return;
        }

	var a = window.snaptr = function() {
		a.handleRequest ? a.handleRequest.apply(a, arguments) : a.queue.push(arguments)
	};
	a.queue = [];
        window.snaptr('init', tarteaucitron.user.snapchatId, {
	    'user_email': tarteaucitron.user.snapchatEmail
        });
        window.snaptr('track', 'PAGE_VIEW');

        tarteaucitron.addScript('https://sc-static.net/scevent.min.js');
	    
	if (typeof tarteaucitron.user.snapchatMore === 'function') {
            tarteaucitron.user.snapchatMore();
        }
    }
};

// antvoice
tarteaucitron.services.antvoice = {
    "key": "antvoice",
    "type": "ads",
    "name": "antvoice",
    "uri": "https://www.antvoice.com/fr/privacy-policy/",
    "needConsent": true,
    "cookies": ['antvoice'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.antvoiceId === undefined) {
            return;
        }

        window.avDataLayer = window.avDataLayer || [];
        window.avtag = window.avtag || function(_cmd,_p) {
            window.avDataLayer.push({cmd:_cmd,p:_p});
        }
        window.avtag('setConsent', {consent:true});
        window.avtag('init', {id: tarteaucitron.user.antvoiceId});

        tarteaucitron.addScript('https://static.avads.net/avtag.min.js');
    }
};

// plausible
tarteaucitron.services.plausible = {
    "key": "plausible",
    "type": "analytic",
    "name": "Plausible",
    "uri": "https://plausible.io/privacy",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.plausibleDomain === undefined) {
            return;
        }

        tarteaucitron.addScript('https://plausible.io/js/script.js', '', '', '', 'data-domain', tarteaucitron.user.plausibleDomain);
    }
};

// videas
tarteaucitron.services.videas = {
    "key": "videas",
    "type": "video",
    "name": "Videas",
    "uri": "https://videas.fr/fr/legal",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_videas'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Videas iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                id = x.getAttribute("data-id"),
                allowfullscreen = x.getAttribute("allowfullscreen");

            return '<iframe title="' + frame_title + '" src="https://app.videas.fr/embed/' + id + '/" width="' + width + '" height="' + height + '" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'videas';
        tarteaucitron.fallback(['tac_videas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// myfeelback
tarteaucitron.services.myfeelback = {
    "key": "myfeelback",
    "type": "api",
    "name": "MyFeelBack (Skeepers)",
    "uri": "https://help.myfeelback.com/fr/quels-sont-les-cookies-d%C3%A9pos%C3%A9s-par-un-dispositif-de-collecte-myfeelback",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.myfeelbackId === undefined) {
            return;
        }

        window._Mfb_useCookie = true;
        window._Mfb_ud = {
            var1: undefined,
            var2: undefined,
            varN: undefined,
            _context: {
                lang: undefined,
                privacyMode: false,
                _page: {
                    url: location.pathname,
                    storageDuration: 30
                }
            }
        };
        tarteaucitron.addScript('https://actorssl-5637.kxcdn.com/actor/'+tarteaucitron.user.myfeelbackId+'/action', 'MFBActor');
    }
};

// arcio
tarteaucitron.services.arcio = {
    "key": "arcio",
    "type": "api",
    "name": "Arc.io",
    "uri": "https://arc.io/about",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.arcId === undefined) {
            return;
        }

        tarteaucitron.addScript('https://arc.io/widget.min.js#'+tarteaucitron.user.arcId);
    }
};

// doubleclick
tarteaucitron.services.doubleclick = {
    "key": "doubleclick",
    "type": "ads",
    "name": "DoubleClick",
    "uri": "https://support.google.com/admanager/answer/2839090",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['doubleclick_container'], function (x) {
            var id1 = tarteaucitron.getElemAttr(x, "data-id1"),
                id2 = tarteaucitron.getElemAttr(x, "data-id2"),
                type = tarteaucitron.getElemAttr(x, "data-type"),
                cat = tarteaucitron.getElemAttr(x, "data-cat"),
                item = tarteaucitron.getElemAttr(x, "data-item"),
                quantity = tarteaucitron.getElemAttr(x, "data-quantity"),
                price = tarteaucitron.getElemAttr(x, "data-price"),
                postage = tarteaucitron.getElemAttr(x, "data-postage"),
                seller = tarteaucitron.getElemAttr(x, "data-seller"),
                gdpr = tarteaucitron.getElemAttr(x, "data-gdpr"),
                gdpr_consent = tarteaucitron.getElemAttr(x, "data-gdpr-consent"),
                ord = tarteaucitron.getElemAttr(x, "data-ord"),
                num = tarteaucitron.getElemAttr(x, "data-num");

            return '<iframe src="https://'+id1+'.fls.doubleclick.net/activityi;src='+id2+';type='+type+';cat='+cat+';item='+item+';quantity='+quantity+';price='+price+';postage='+postage+';seller='+seller+';gdpr='+gdpr+';gdpr_consent='+gdpr_consent+';num='+num+';ord='+ord+'?" width="1" height="1" frameborder="0" style="display:none"></iframe>';
        });
    }
};

// userpilot
tarteaucitron.services.userpilot = {
    "key": "userpilot",
    "type": "analytic",
    "name": "UserPilot",
    "uri": "https://userpilot.com/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.userpilotToken === undefined) {
            return;
        }

        window.userpilotSettings = {token: tarteaucitron.user.userpilotToken};
        tarteaucitron.addScript('https://js.userpilot.io/sdk/latest.js');
    }
};

tarteaucitron.services.piwikpro = {
    "key": "piwikpro",
    "type": "analytic",
    "name": "Piwik Pro",
    "uri": "https://piwik.pro/privacy-policy/",
    "needConsent": true,
    "cookies": ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'piwik_ignore', '_pk_uid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.piwikProId === undefined) {
            return;
        }

        window['dataLayer'] = window['dataLayer'] || [], window['dataLayer'].push({
            start: (new Date).getTime(),
            event: "stg.start"
        });

        function stgCreateCookie(a, b, c) {
           var d = "";
           if (c) {
              var e = new Date;
              e.setTime(e.getTime() + 24 * c * 60 * 60 * 1e3), d = "; expires=" + e.toUTCString()
           }
           document.cookie = a + "=" + b + d + "; path=/"
        }

        var isStgDebug = (window.location.href.match("stg_debug") || document.cookie.match("stg_debug")) && !window.location.href.match("stg_disable_debug");
        stgCreateCookie("stg_debug", isStgDebug ? 1 : "", isStgDebug ? 14 : -1);
        var qP = [];

        var qPString = qP.length > 0 ? ("?" + qP.join("&")) : "";
        tarteaucitron.addScript('https://carsatse.containers.piwik.pro/'+tarteaucitron.user.piwikProId+'.js'+qPString);

        ! function(a, n, i) {
           a[n] = a[n] || {};
           for (var c = 0; c < i.length; c++) ! function(i) {
              a[n][i] = a[n][i] || {}, a[n][i].api = a[n][i].api || function() {
                 var a = [].slice.call(arguments, 0);
                 "string" == typeof a[0] && window['dataLayer'].push({
                    event: n + "." + i + ":" + a[0],
                    parameters: [].slice.call(arguments, 1)
                 })
              }
           }(i[c])
        }(window, "ppms", ["tm", "cm"]);
    }
};

// pinterestpixel
tarteaucitron.services.pinterestpixel = {
    "key": "pinterestpixel",
    "type": "ads",
    "name": "Pinterest Pixel",
    "uri": "https://help.pinterest.com/fr/business/article/track-conversions-with-pinterest-tag",
    "needConsent": true,
    "cookies": ['_pinterest_sess', '_pinterest_ct', '_pinterest_ct_mw', '_pinterest_ct_rt', '_epik', '_derived_epik', '_pin_unauth', '_pinterest_ct_ua'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.pinterestpixelId === undefined) {
            return;
        }

        if (!window.pintrk) {
            window.pintrk = function () {
                window.pintrk.queue.push(Array.prototype.slice.call(arguments));
            };

            var n = window.pintrk;
            n.queue = [];
            n.version = "3.0";

            tarteaucitron.addScript('https://s.pinimg.com/ct/core.js', '', function () {
                window.pintrk('load', tarteaucitron.user.pinterestpixelId);
                window.pintrk('page');
            });
        }
    }
};

// elfsight
tarteaucitron.services.elfsight = {
    "key": "elfsight",
    "type": "support",
    "name": "Elfsight",
    "uri": "https://elfsight.com/privacy-policy/",
    "needConsent": true,
    "cookies": ['__cfduid', '_p_hfp_client_id', 'session_id'],
    "js": function () {
        "use strict";

        tarteaucitron.addScript('https://apps.elfsight.com/p/platform.js');
    }
};

// plezi
tarteaucitron.services.plezi = {
    "key": "plezi",
    "type": "analytic",
    "name": "Plezi",
    "uri": "https://www.plezi.co/fr/mentions-legales/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.pleziTenant === undefined || tarteaucitron.user.pleziTw === undefined) {
            return;
        }

        tarteaucitron.addScript('https://app.plezi.co/scripts/ossleads_analytics.js?tenant=' + tarteaucitron.user.pleziTenant + '&tw=' + tarteaucitron.user.pleziTw);
    }
};


// smartsupp
tarteaucitron.services.smartsupp = {
    "key": "smartsupp",
    "type": "support",
    "name": "Smartsupp",
    "uri": "https://www.smartsupp.com/help/privacy/",
    "needConsent": true,
    "cookies": ['ssupp.vid', 'ssupp.visits', 'AWSALB', 'AWSALBCORS'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.smartsuppKey === undefined) {
            return;
        }

        window._smartsupp = window._smartsupp || {};
        window._smartsupp.key = tarteaucitron.user.smartsuppKey;
        window.smartsupp = function () {
            window.smartsupp._.push(arguments)
        };
        window.smartsupp._ = [];

        tarteaucitron.addScript('https://www.smartsuppchat.com/loader.js');
    }
};



// sharpspring
tarteaucitron.services.sharpspring = {
    "key": "sharpspring",
    "type": "analytic",
    "name": "SharpSpring",
    "uri": "https://sharpspring.com/legal/sharpspring-cookie-policy/",
    "needConsent": true,
    "cookies": ['koitk', '__ss', '__ss_tk', '__ss_referrer'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.ssId === undefined || tarteaucitron.user.ssAccount === undefined) {
            return;
        }

        window._ss = window._ss || [];
        window._ss.push(['_setDomain', 'https://' + tarteaucitron.user.ssId + '.marketingautomation.services/net']);
        window._ss.push(['_setAccount', tarteaucitron.user.ssAccount]);
        window._ss.push(['_trackPageView']);

        window._pa = window._pa || {};

        tarteaucitron.addScript('https://' + tarteaucitron.user.ssId + '.marketingautomation.services/client/ss.js');
    }
};

// pardot
tarteaucitron.services.pardot = {
    "key": "pardot",
    "type": "analytic",
    "name": "Pardot",
    "uri": "https://www.salesforce.com/company/privacy/full_privacy/",
    "needConsent": true,
    "cookies": ['visitor_id'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.piAId === undefined || tarteaucitron.user.piCId === undefined) {
            return;
        }

        window.piAId = tarteaucitron.user.piAId;
        window.piCId = tarteaucitron.user.piCId;
        window.piHostname = 'pi.pardot.com';

        tarteaucitron.addScript('https://pi.pardot.com/pd.js');
    }
};

// Open Web Analytics
tarteaucitron.services.openwebanalytics = {
    "key": "openwebanalytics",
    "type": "analytic",
    "name": "Open Web Analytics",
    "uri": "",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.openwebanalyticsId === undefined || tarteaucitron.user.openwebanalyticsHost === undefined) {
            return;
        }

        window.owa_baseUrl = tarteaucitron.user.openwebanalyticsHost;
        window.owa_cmds = window.owa_cmds || [];
        window.owa_cmds.push(['setSiteId', tarteaucitron.user.openwebanalyticsId]);
        window.owa_cmds.push(['trackPageView']);
        window.owa_cmds.push(['trackClicks']);

        tarteaucitron.addScript(window.owa_baseUrl + 'modules/base/js/owa.tracker-combined-min.js');
    }
};

// xandr universal pixel
// https://docs.xandr.com/bundle/invest_invest-standard/page/topics/universal-pixel-overview.html
tarteaucitron.services.xandr = {
    "key": "xandr",
    "type": "ads",
    "name": "Xandr (Universal)",
    "uri": "https://www.xandr.com/privacy/cookie-policy/",
    "needConsent": true,
    "cookies": ['uuid2', 'uids', 'sess', 'icu', 'anj', 'usersync'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.xandrId === undefined) {
            return;
        }

        if (!window.pixie) {
            var n = window.pixie = function (e, i, a) {
                n.actionQueue.push({
                    action: e,
                    actionValue: i,
                    params: a
                })
            };
            n.actionQueue = [];
        }

        tarteaucitron.addScript('https://acdn.adnxs.com/dmp/up/pixie.js', '', function () {
            window.pixie('init', tarteaucitron.user.xandrId);
            window.pixie('event', 'PageView');
        });
    }
};

// xandr segment
// https://docs.xandr.com/bundle/invest_invest-standard/page/topics/segment-pixels-advanced.html
tarteaucitron.services.xandrsegment = {
    "key": "xandrsegment",
    "type": "ads",
    "name": "Xandr (Segment)",
    "uri": "https://www.xandr.com/privacy/cookie-policy/",
    "needConsent": true,
    "cookies": ['uuid2', 'uids', 'sess', 'icu', 'anj', 'usersync'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['xandrsegment-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" xandrsegmentAdd="' + x.getAttribute('xandrsegmentAdd') + '" xandrsegmentAddCode="' + x.getAttribute('xandrsegmentAddCode') + '" xandrsegmentRemove="' + x.getAttribute('xandrsegmentRemove') + '" xandrsegmentRemoveCode="' + x.getAttribute('xandrsegmentRemoveCode') + '" xandrsegmentMember="' + x.getAttribute('xandrsegmentMember') + '" xandrsegmentRedir="' + x.getAttribute('xandrsegmentRedir') + '" xandrsegmentValue="' + x.getAttribute('xandrsegmentValue') + '" xandrsegmentOther="' + x.getAttribute('xandrsegmentOther') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//ib.adnxs.com/seg?t=2&';
            uri += 'add=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentAdd') + '&';
            uri += 'add_code=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentAddCode') + '&';
            uri += 'remove=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentRemove') + '&';
            uri += 'remove_code=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentRemoveCode') + '&';
            uri += 'member=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentMember') + '&';
            uri += 'redir=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentRedir') + '&';
            uri += 'value=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentValue') + '&';
            uri += 'other=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentOther');

            document.getElementById(uniqIds[i]).innerHTML = '<img src=\'' + uri + '\' width=\'1\' height=\'1\' />';
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'xandrsegment';
        tarteaucitron.fallback(['xandrsegment-canvas'], tarteaucitron.engage(id));
    }
};

// xandr conversion
// https://docs.xandr.com/bundle/invest_invest-standard/page/topics/working-with-conversion-pixels.html
tarteaucitron.services.xandrconversion = {
    "key": "xandrconversion",
    "type": "ads",
    "name": "Xandr (Conversion)",
    "uri": "https://www.xandr.com/privacy/cookie-policy/",
    "needConsent": true,
    "cookies": ['uuid2', 'uids', 'sess', 'icu', 'anj', 'usersync'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['xandrconversion-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" xandrconversionId="' + x.getAttribute('xandrconversionId') + '" xandrconversionSeg="' + x.getAttribute('xandrconversionSeg') + '" xandrconversionOrderId="' + x.getAttribute('xandrconversionOrderId') + '" xandrconversionValue="' + x.getAttribute('xandrconversionValue') + '" xandrconversionRedir="' + x.getAttribute('xandrconversionRedir') + '" xandrconversionOther="' + x.getAttribute('xandrconversionOther') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//ib.adnxs.com/px?t=2&';
            uri += 'id=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionId') + '&';
            uri += 'seg=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionSeg') + '&';
            uri += 'order_id=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionOrderId') + '&';
            uri += 'value=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionValue') + '&';
            uri += 'redir=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionRedir') + '&';
            uri += 'other=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionOther');

            document.getElementById(uniqIds[i]).innerHTML = '<img src=\'' + uri + '\' width=\'1\' height=\'1\' />';
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'xandrconversion';
        tarteaucitron.fallback(['xandrconversion-canvas'], tarteaucitron.engage(id));
    }
};

// helloasso
tarteaucitron.services.helloasso = {
    "key": "helloasso",
    "type": "api",
    "name": "HelloAsso",
    "uri": "https://www.helloasso.com/confidentialite",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_helloasso'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'HelloAsso iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = x.getAttribute("data-url"),
                allowfullscreen = x.getAttribute("allowfullscreen");

            return '<iframe title="' + frame_title + '" id="haWidget" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'helloasso';
        tarteaucitron.fallback(['tac_helloasso'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// podcloud
tarteaucitron.services.podcloud = {
    "key": "podcloud",
    "type": "video",
    "name": "podCloud",
    "uri": "https://podcloud.fr/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_podcloud'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'podCloud iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = x.getAttribute("data-url"),
                allowfullscreen = x.getAttribute("allowfullscreen");

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'podcloud';
        tarteaucitron.fallback(['tac_podcloud'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// facebookpost
tarteaucitron.services.facebookpost = {
    "key": "facebookpost",
    "type": "social",
    "name": "Facebook (post)",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_facebookpost'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Facebook iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = x.getAttribute("data-url"),
                appId = x.getAttribute("data-appid"),
                allowfullscreen = x.getAttribute("allowfullscreen"),
                showText = x.getAttribute("data-show-text");

            return '<iframe title="' + frame_title + '" src="https://www.facebook.com/plugins/post.php?href=' + encodeURIComponent(url) + '&amp;width=' + width + '&amp;show_text=false&amp;appId=' + appId + '&amp;show_text=' + showText + '&amp;height=' + height + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'facebookpost';
        tarteaucitron.fallback(['tac_facebookpost'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// amplitude
tarteaucitron.services.amplitude = {
    "key": "amplitude",
    "type": "analytic",
    "name": "Amplitude",
    "uri": "https://amplitude.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.amplitude === undefined) {
            return;
        }
        tarteaucitron.addScript('https://cdn.amplitude.com/libs/amplitude-5.8.0-min.gz.js', '', function () {

            window.amplitude = {
                _q: [],
                _iq: {}
            };
            function s(e, t) { e.prototype[t] = function () { this._q.push([t].concat(Array.prototype.slice.call(arguments, 0))); return this } }
            var o = function () { this._q = []; return this };
            var a = ["add", "append", "clearAll", "prepend", "set", "setOnce", "unset"];
            for (var u = 0; u < a.length; u++) { s(o, a[u]) }
            amplitude.Identify = o;
            var c = function () { this._q = []; return this };
            var l = ["setProductId", "setQuantity", "setPrice", "setRevenueType", "setEventProperties"];
            for (var p = 0; p < l.length; p++) { s(c, l[p]) }
            amplitude.Revenue = c;
            var d = ["init", "logEvent", "logRevenue", "setUserId", "setUserProperties", "setOptOut", "setVersionName", "setDomain", "setDeviceId", "enableTracking", "setGlobalUserProperties", "identify", "clearUserProperties", "setGroup", "logRevenueV2", "regenerateDeviceId", "groupIdentify", "onInit", "logEventWithTimestamp", "logEventWithGroups", "setSessionId", "resetSessionId"];
            function v(e) { function t(t) { e[t] = function () { e._q.push([t].concat(Array.prototype.slice.call(arguments, 0))) } } for (var n = 0; n < d.length; n++) { t(d[n]) } }
            v(amplitude);
            amplitude.getInstance = function (e) { e = (!e || e.length === 0 ? "$default_instance" : e).toLowerCase(); if (!amplitude._iq.hasOwnProperty(e)) { amplitude._iq[e] = { _q: [] }; v(amplitude._iq[e]) } return amplitude._iq[e] };

            amplitude.getInstance().init(tarteaucitron.user.amplitude);
        });
    }
};

// abtasty
tarteaucitron.services.abtasty = {
    "key": "abtasty",
    "type": "api",
    "name": "ABTasty",
    "uri": "https://www.abtasty.com/terms-of-use/",
    "needConsent": true,
    "cookies": ['ABTasty', 'ABTastySession'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.abtastyID === undefined) {
            return;
        }
        tarteaucitron.addScript('//try.abtasty.com/' + tarteaucitron.user.abtastyID + '.js');
    }
};


// yandex metrica
tarteaucitron.services.metrica = {
    "key": "metrica",
    "type": "analytic",
    "name": "Yandex Metrica",
    "uri": "https://yandex.com/legal/confidential/",
    "needConsent": true,
    "cookies": ['_ym_metrika_enabled', '_ym_isad', '_ym_uid', '_ym_d', 'yabs-sid', '_ym_debug', '_ym_mp2_substs', '_ym_hostIndex', '_ym_mp2_track', 'yandexuid', 'usst'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.yandexmetrica === undefined) {
            return;
        }
        tarteaucitron.addScript('https://mc.yandex.ru/metrika/tag.js', '', function () {

            (function (m, e, t, r, i, k, a) {
                m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
                m[i].l = 1 * new Date(); k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
            })
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(tarteaucitron.user.yandexmetrica, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
                ecommerce: "dataLayer"
            });
        });
    }
};

// addthis
tarteaucitron.services.addthis = {
    "key": "addthis",
    "type": "social",
    "name": "AddThis",
    "uri": "https://www.addthis.com/privacy/privacy-policy#publisher-visitors",
    "needConsent": true,
    "cookies": ['__atuvc', '__atuvs'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.addthisPubId === undefined) {
            return;
        }
        if (tarteaucitron.isAjax === true) {
            window.addthis = null;
            window._adr = null;
            window._atc = null;
            window._atd = null;
            window._ate = null;
            window._atr = null;
            window._atw = null;
        }
        tarteaucitron.fallback(['addthis_inline_share_toolbox'], '');
        tarteaucitron.addScript('//s7.addthis.com/js/300/addthis_widget.js#pubid=' + tarteaucitron.user.addthisPubId);
    },
    "fallback": function () {
        "use strict";
        var id = 'addthis';
        tarteaucitron.fallback(['addthis_inline_share_toolbox'], tarteaucitron.engage(id));
    }
};

// addtoanyfeed
tarteaucitron.services.addtoanyfeed = {
    "key": "addtoanyfeed",
    "type": "social",
    "name": "AddToAny (feed)",
    "uri": "https://www.addtoany.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.addtoanyfeedUri === undefined) {
            return;
        }
        tarteaucitron.user.addtoanyfeedSubscribeLink = 'https://www.addtoany.com/subscribe?linkurl=' + tarteaucitron.user.addtoanyfeedUri;
        window.a2a_config = window.a2a_config || {};
        window.a2a_config.linkurl = tarteaucitron.user.addtoanyfeedUri;
        tarteaucitron.addScript('//static.addtoany.com/menu/feed.js');
    },
    "fallback": function () {
        "use strict";
        tarteaucitron.user.addtoanyfeedSubscribeLink = 'https://www.addtoany.com/subscribe?linkurl=' + tarteaucitron.user.addtoanyfeedUri;
    }
};

// addtoanyshare
tarteaucitron.services.addtoanyshare = {
    "key": "addtoanyshare",
    "type": "social",
    "name": "AddToAny (share)",
    "uri": "https://www.addtoany.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_addtoanyshare'], function (elem) {
            elem.remove();
        }, true);
        tarteaucitron.addScript('//static.addtoany.com/menu/page.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'addtoanyshare';
        tarteaucitron.fallback(['tac_addtoanyshare'], tarteaucitron.engage(id));
    }
};

// aduptech ads
tarteaucitron.services.aduptech_ads = {
    "key": "aduptech_ads",
    "type": "ads",
    "name": "Ad Up Technology (ads)",
    "uri": "https://www.adup-tech.com/datenschutz",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        var IDENTIFIER = "aduptech_ads",
            API_URL = "https://s.d.adup-tech.com/jsapi";

        var elements = document.getElementsByClassName(IDENTIFIER);
        if (!elements || elements.length === 0) {
            return;
        }

        tarteaucitron.fallback([IDENTIFIER], "");

        tarteaucitron.addScript(API_URL, "", function () {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];

                if (!element.getAttribute("id")) {
                    element.setAttribute("id", IDENTIFIER + Math.random().toString(36).substr(2, 9));
                }

                window.uAd.embed(element.getAttribute("id"), {
                    placementKey: element.getAttribute("placementKey"),
                    responsive: Boolean(element.getAttribute("responsive")),
                    lazy: Boolean(element.getAttribute("lazy")),
                    adtest: Boolean(element.getAttribute("test")),
                    query: element.getAttribute("query") || "",
                    minCpc: element.getAttribute("minCpc") || "",
                    pageUrl: element.getAttribute("pageUrl") || "",
                    skip: element.getAttribute("skip") || ""
                });
            }
        });

    },
    "fallback": function () {
        "use strict";
        tarteaucitron.fallback(["aduptech_ads"], tarteaucitron.engage("aduptech_ads"));
    }
};

// aduptech conversion
tarteaucitron.services.aduptech_conversion = {
    "key": "aduptech_conversion",
    "type": "ads",
    "name": "Ad Up Technology (conversion)",
    "uri": "https://www.adup-tech.com/datenschutz",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        var IDENTIFIER = "aduptech_conversion",
            CONVERSION_PIXEL_BASE_URL = "https://d.adup-tech.com/campaign/conversion";

        var elements = document.getElementsByClassName(IDENTIFIER);
        if (!elements || elements.length === 0) {
            return;
        }

        tarteaucitron.fallback([IDENTIFIER], "");

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if (!element.getAttribute("advertiserId") || !element.getAttribute("conversionCode")) {
                continue;
            }

            var url = CONVERSION_PIXEL_BASE_URL +
                "/" + encodeURIComponent(element.getAttribute("advertiserId")) +
                "?t=" + encodeURIComponent(element.getAttribute("conversionCode"));

            if (element.getAttribute("price")) {
                url += "&price=" + encodeURIComponent(element.getAttribute("price"));
            }

            if (element.getAttribute("quantity")) {
                url += "&quantity=" + encodeURIComponent(element.getAttribute("quantity"));
            }

            if (element.getAttribute("total")) {
                url += "&total=" + encodeURIComponent(element.getAttribute("total"));
            }

            if (element.getAttribute("orderId")) {
                url += "&order_id=" + encodeURIComponent(element.getAttribute("orderId"));
            }

            if (element.getAttribute("itemNumber")) {
                url += "&item_number=" + encodeURIComponent(element.getAttribute("itemNumber"));
            }

            if (element.getAttribute("description")) {
                url += "&description=" + encodeURIComponent(element.getAttribute("description"));
            }

            (new Image()).src = url;
        }
    }
};

// aduptech retargeting
tarteaucitron.services.aduptech_retargeting = {
    "key": "aduptech_retargeting",
    "type": "ads",
    "name": "Ad Up Technology (retargeting)",
    "uri": "https://www.adup-tech.com/datenschutz",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        var IDENTIFIER = "aduptech_retargeting",
            API_URL = "https://s.d.adup-tech.com/services/retargeting.js";

        var elements = document.getElementsByClassName(IDENTIFIER);
        if (!elements || elements.length === 0) {
            return;
        }

        tarteaucitron.fallback([IDENTIFIER], "");

        window.AdUpRetargeting = function (api) {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];

                api.init();

                api.setAccount(element.getAttribute("account"));

                if (element.getAttribute("email")) {
                    api.setEmail(element.getAttribute("email"));
                } else if (element.getAttribute("hashedEmail")) {
                    api.setHashedEmail(element.getAttribute("hashedEmail"));
                }

                if (element.getAttribute("product")) {
                    try {
                        api.setProduct(JSON.parse(element.getAttribute("product")));
                    } catch (e) {
                        api.setProduct(element.getAttribute("product"));
                    }
                }

                if (element.getAttribute("transaction")) {
                    try {
                        api.setTransaction(JSON.parse(element.getAttribute("transaction")));
                    } catch (e) {
                        api.setTransaction(element.getAttribute("transaction"));
                    }
                }

                if (element.getAttribute("demarkUser")) {
                    api.setDemarkUser();
                } else if (element.getAttribute("demarkProducts")) {
                    api.setDemarkProducts();
                }

                if (element.getAttribute("conversionCode")) {
                    api.setConversionCode(element.getAttribute("conversionCode"));
                }

                if (element.getAttribute("device")) {
                    var setter = "set" + element.getAttribute("device").charAt(0).toUpperCase() + element.getAttribute("device").slice(1);
                    if (typeof api[setter] === 'function') {
                        api[setter]();
                    }
                }

                if (element.getAttribute("track")) {
                    var tracker = "track" + element.getAttribute("track").charAt(0).toUpperCase() + element.getAttribute("track").slice(1);
                    if (typeof api[tracker] === "function") {
                        api[tracker]();
                    } else {
                        api.trackHomepage();
                    }
                }
            };
        };

        tarteaucitron.addScript(API_URL);
    }
};

// alexa
tarteaucitron.services.alexa = {
    "key": "alexa",
    "type": "analytic",
    "name": "Alexa",
    "uri": "https://www.alexa.com/help/privacy",
    "needConsent": true,
    "cookies": ['__asc', '__auc'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.alexaAccountID === undefined) {
            return;
        }
        window._atrk_opts = {
            atrk_acct: tarteaucitron.user.alexaAccountID,
            domain: window.location.hostname.match(/[^\.]*\.[^.]*$/)[0],
            dynamic: true
        };
        tarteaucitron.addScript('https://d31qbv1cthcecs.cloudfront.net/atrk.js');
    }
};

// amazon
tarteaucitron.services.amazon = {
    "key": "amazon",
    "type": "ads",
    "name": "Amazon",
    "uri": "https://www.amazon.com/gp/help/customer/display.html/ref=help_search_1-1?ie=UTF8&nodeId=201909010&qid=1544617177&sr=1-1",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['amazon_product'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Amazon iframe'),
                amazonId = x.getAttribute("amazonid"),
                productId = x.getAttribute("productid"),
                url = '//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=' + tarteaucitron.getLanguage().toUpperCase() + '&source=ss&ref=ss_til&ad_type=product_link&tracking_id=' + amazonId + '&marketplace=amazon&region=' + tarteaucitron.getLanguage().toUpperCase() + '&placement=' + productId + '&asins=' + productId + '&show_border=true&link_opens_in_new_window=true',
                iframe = '<iframe title="' + frame_title + '" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" src="' + url + '"></iframe>';

            return iframe;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'amazon';
        tarteaucitron.fallback(['amazon_product'], tarteaucitron.engage(id));
    }
};

// calameo
tarteaucitron.services.calameo = {
    "key": "calameo",
    "type": "video",
    "name": "Calameo",
    "uri": "https://fr.calameo.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['calameo-canvas'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Calameo iframe'),
                id = x.getAttribute("data-id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = '//v.calameo.com/?bkcode=' + id,
                allowfullscreen = x.getAttribute("allowfullscreen");

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'calameo';
        tarteaucitron.fallback(['calameo-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// clicky
tarteaucitron.services.clicky = {
    "key": "clicky",
    "type": "analytic",
    "name": "Clicky",
    "uri": "https://clicky.com/terms",
    "needConsent": true,
    "cookies": ['_jsuid', '_eventqueue', '_referrer_og', '_utm_og', '_first_pageview', 'clicky_olark', 'no_trackyy_' + tarteaucitron.user.clickyId, 'unpoco_' + tarteaucitron.user.clickyId, 'heatmaps_g2g_' + tarteaucitron.user.clickyId],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.clickyId === undefined) {
            return;
        }
        tarteaucitron.addScript('//static.getclicky.com/js', '', function () {
            if (typeof clicky.init === 'function') {
                clicky.init(tarteaucitron.user.clickyId);
            }
            if (typeof tarteaucitron.user.clickyMore === 'function') {
                tarteaucitron.user.clickyMore();
            }
        });
    }
};

// clicmanager
tarteaucitron.services.clicmanager = {
    "key": "clicmanager",
    "type": "ads",
    "name": "Clicmanager",
    "uri": "http://www.clicmanager.fr/infos_legales.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['clicmanager-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" c="' + x.getAttribute('c') + '" s="' + x.getAttribute('s') + '" t="' + x.getAttribute('t') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//ads.clicmanager.fr/exe.php?';
            uri += 'c=' + document.getElementById(uniqIds[i]).getAttribute('c') + '&';
            uri += 's=' + document.getElementById(uniqIds[i]).getAttribute('s') + '&';
            uri += 't=' + document.getElementById(uniqIds[i]).getAttribute('t');

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'clicmanager';
        tarteaucitron.fallback(['clicmanager-canvas'], tarteaucitron.engage(id));
    }
};

// compteur
tarteaucitron.services.compteur = {
    "key": "compteur",
    "type": "analytic",
    "name": "Compteur.fr",
    "uri": "https://www.compteur.fr/help_privacy_policy.htm",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.compteurID === undefined) {
            return;
        }
        tarteaucitron.addScript('https://server2.compteur.fr/log7.js', '', function () { wtslog7(tarteaucitron.user.compteurID, 1); });
    }
};

// contentsquare
tarteaucitron.services.contentsquare = {
    "key": "contentsquare",
    "type": "api",
    "name": "ContentSquare",
    "uri": "https://docs.contentsquare.com/uxa-en/#collected-data",
    "needConsent": true,
    "cookies": ['_cs_id', '_cs_s', '_cs_vars', '_cs_ex', '_cs_c', '_cs_optout'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.contentsquareID === undefined) {
            return;
        }
        tarteaucitron.addScript('//t.contentsquare.net/uxa/' + tarteaucitron.user.contentsquareID + '.js');
    }
};

// crazyegg
tarteaucitron.services.crazyegg = {
    "key": "crazyegg",
    "type": "analytic",
    "name": "Crazy Egg",
    "uri": "https://www.crazyegg.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.crazyeggId === undefined) {
            return;
        }

        tarteaucitron.addScript('//script.crazyegg.com/pages/scripts/' + tarteaucitron.user.crazyeggId.substr(0, 4) + '/' + tarteaucitron.user.crazyeggId.substr(4, 4) + '.js');
    }
};

// clarity
tarteaucitron.services.clarity = {
    "key": "clarity",
    "type": "analytic",
    "name": "Clarity",
    "uri": "https://clarity.microsoft.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        window["clarity"] = window["clarity"] || function () { (window["clarity"].q = window["clarity"].q || []).push(arguments) };

        tarteaucitron.addScript('https://www.clarity.ms/tag/' + tarteaucitron.user.clarity);
    }
};

// criteo
tarteaucitron.services.criteo = {
    "key": "criteo",
    "type": "ads",
    "name": "Criteo",
    "uri": "http://www.criteo.com/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        document.MAX_ct0 = '';
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['criteo-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" zoneid="' + x.getAttribute('zoneid') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//cas.criteo.com/delivery/ajs.php?';
            uri += 'zoneid=' + document.getElementById(uniqIds[i]).getAttribute('zoneid');
            uri += '&nodis=1&cb=' + Math.floor(Math.random() * 99999999999);
            uri += '&loc=' + encodeURI(window.location);
            uri += (document.MAX_used !== ',') ? '&exclude=' + document.MAX_used : '';
            uri += (document.charset !== undefined ? '&charset=' + document.charset : '');
            uri += (document.characterSet !== undefined ? '&charset=' + document.characterSet : '');
            uri += (document.referrer !== undefined) ? '&referer=' + encodeURI(document.referrer) : '';
            uri += (document.context !== undefined) ? '&context=' + encodeURI(document.context) : '';
            uri += ((document.MAX_ct0 !== undefined) && (document.MAX_ct0.substring(0, 4) === 'http')) ? '&ct0=' + encodeURI(document.MAX_ct0) : '';
            uri += (document.mmm_fo !== undefined) ? '&mmm_fo=1' : '';

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'criteo';
        tarteaucitron.fallback(['criteo-canvas'], tarteaucitron.engage(id));
    }
};

// criteo onetag
tarteaucitron.services.criteoonetag = {
    "key": "criteoonetag",
    "type": "ads",
    "name": "Criteo OneTag",
    "uri": "https://www.criteo.com/privacy/",
    "needConsent": true,
    "cookies": ['uid', 'tk', 'uid3pd'],
    "js": function() {
        "use strict";
        if (tarteaucitron.user.criteoonetagAccount === undefined) return;

        window.criteo_q = window.criteo_q || []; 
        window.criteo_q.push({
            event: "setAccount",
            account: tarteaucitron.user.criteoonetagAccount
        })

        tarteaucitron.addScript('//static.criteo.net/js/ld/ld.js', '', function() {
            if (typeof tarteaucitron.user.criteoonetagMore === 'function') {
                tarteaucitron.user.criteoonetagMore();
            }
        });
    }
};

// artetv
tarteaucitron.services.artetv = {
    "key": "artetv",
    "type": "video",
    "name": "Arte.tv",
    "uri": "https://www.arte.tv/sites/fr/corporate/donnees-personnelles/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['artetv_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Arte.tv iframe'),
                video_json = x.getAttribute("json"),
                video_width = x.getAttribute("width"),
                video_height = x.getAttribute("height"),
                video_frame,
                video_allowfullscreen = x.getAttribute("allowfullscreen");

            if (video_json === undefined) {
                return "";
            }

            video_frame = '<iframe title="' + frame_title + '" style="transition-duration: 0; transition-property: no; margin: 0 auto; position: relative; display: block; background-color: #000000;" src="https://www.arte.tv/player/v5/index.php?json_url=' + video_json + '" width="' + video_width + '" height="' + video_height + '" scrolling="no" ' + (video_allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'artetv';
        tarteaucitron.fallback(['artetv_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// dailymotion
tarteaucitron.services.dailymotion = {
    "key": "dailymotion",
    "type": "video",
    "name": "Dailymotion",
    "uri": "https://www.dailymotion.com/legal/privacy",
    "needConsent": true,
    "cookies": ['ts', 'dmvk', 'hist', 'v1st', 's_vi'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['dailymotion_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x, "title") || 'Dailymotion iframe'),
                video_id = tarteaucitron.getElemAttr(x, "videoID"),
                video_width = tarteaucitron.getElemAttr(x, "width"),
                frame_width = 'width=',
                video_height = tarteaucitron.getElemAttr(x, "height"),
                frame_height = 'height=',
                video_frame,
                embed_type = tarteaucitron.getElemAttr(x, "embedType"),
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen"),
                showinfo = tarteaucitron.getElemAttr(x, "showinfo"),
                autoplay = tarteaucitron.getElemAttr(x, "autoplay"),
                api = tarteaucitron.getElemAttr(x, "api"),
                params = 'info=' + showinfo + '&autoPlay=' + autoplay + '&api=' + api;

            if (video_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height += '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }
            if (embed_type === undefined || !['video', 'playlist'].includes(embed_type)) {
                embed_type = "video";
            }
            video_frame = '<iframe title="' + frame_title + '" src="//www.dailymotion.com/embed/' + embed_type + '/' + video_id + '?' + params + '" ' + frame_width + frame_height + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'dailymotion';
        tarteaucitron.fallback(['dailymotion_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// dating affiliation
tarteaucitron.services.datingaffiliation = {
    "key": "datingaffiliation",
    "type": "ads",
    "name": "Dating Affiliation",
    "uri": "http://www.dating-affiliation.com/conditions-generales.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['datingaffiliation-canvas'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Dating Affiliation iframe'),
                comfrom = x.getAttribute("data-comfrom"),
                r = x.getAttribute("data-r"),
                p = x.getAttribute("data-p"),
                cf0 = x.getAttribute("data-cf0"),
                langue = x.getAttribute("data-langue"),
                forward_affiliate = x.getAttribute("data-forwardAffiliate"),
                cf2 = x.getAttribute("data-cf2"),
                cfsa2 = x.getAttribute("data-cfsa2"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = 'http://www.tools-affil2.com/rotaban/ban.php?' + comfrom;

            return '<iframe title="' + frame_title + '" src="' + url + '&r=' + r + '&p=' + p + '&cf0=' + cf0 + '&langue=' + langue + '&forward_affiliate=' + forward_affiliate + '&cf2=' + cf2 + '&cfsa2=' + cfsa2 + '" width="' + width + '" height="' + height + '" marginheight="0" marginwidth="0" scrolling="no"></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'datingaffiliation';
        tarteaucitron.fallback(['datingaffiliation-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// dating affiliation popup
tarteaucitron.services.datingaffiliationpopup = {
    "key": "datingaffiliationpopup",
    "type": "ads",
    "name": "Dating Affiliation (Pop Up)",
    "uri": "http://www.dating-affiliation.com/conditions-generales.php",
    "needConsent": true,
    "cookies": ['__utma', '__utmb', '__utmc', '__utmt_Tools', '__utmv', '__utmz', '_ga', '_gat', '_gat_UA-65072040-17', '__da-pu-xflirt-ID-pc-o169'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['datingaffiliationpopup-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" uri="' + x.getAttribute('uri') + '" comfrom="' + x.getAttribute('comfrom') + '" promo="' + x.getAttribute('promo') + '" productid="' + x.getAttribute('productid') + '" submitconfig="' + x.getAttribute('submitconfig') + '" ur="' + x.getAttribute('ur') + '" brand="' + x.getAttribute('brand') + '" lang="' + x.getAttribute('lang') + '" cf0="' + x.getAttribute('cf0') + '" cf2="' + x.getAttribute('cf2') + '" subid1="' + x.getAttribute('subid1') + '" cfsa2="' + x.getAttribute('cfsa2') + '" subid2="' + x.getAttribute('subid2') + '" nicheid="' + x.getAttribute('nicheid') + '" degreid="' + x.getAttribute('degreid') + '" bt="' + x.getAttribute('bt') + '" vis="' + x.getAttribute('vis') + '" hid="' + x.getAttribute('hid') + '" snd="' + x.getAttribute('snd') + '" aabd="' + x.getAttribute('aabd') + '" aabs="' + x.getAttribute('aabs') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = 'http://www.promotools.biz/da/popunder/script.php?';
            uri += 'comfrom=' + document.getElementById(uniqIds[i]).getAttribute('comfrom') + '&';
            uri += 'promo=' + document.getElementById(uniqIds[i]).getAttribute('promo') + '&';
            uri += 'product_id=' + document.getElementById(uniqIds[i]).getAttribute('productid') + '&';
            uri += 'submitconfig=' + document.getElementById(uniqIds[i]).getAttribute('submitconfig') + '&';
            uri += 'ur=' + document.getElementById(uniqIds[i]).getAttribute('ur') + '&';
            uri += 'brand=' + document.getElementById(uniqIds[i]).getAttribute('brand') + '&';
            uri += 'lang=' + document.getElementById(uniqIds[i]).getAttribute('lang') + '&';
            uri += 'cf0=' + document.getElementById(uniqIds[i]).getAttribute('cf0') + '&';
            uri += 'cf2=' + document.getElementById(uniqIds[i]).getAttribute('cf2') + '&';
            uri += 'subid1=' + document.getElementById(uniqIds[i]).getAttribute('subid1') + '&';
            uri += 'cfsa2=' + document.getElementById(uniqIds[i]).getAttribute('cfsa2') + '&';
            uri += 'subid2=' + document.getElementById(uniqIds[i]).getAttribute('subid2') + '&';
            uri += 'nicheId=' + document.getElementById(uniqIds[i]).getAttribute('nicheid') + '&';
            uri += 'degreId=' + document.getElementById(uniqIds[i]).getAttribute('degreid') + '&';
            uri += 'bt=' + document.getElementById(uniqIds[i]).getAttribute('bt') + '&';
            uri += 'vis=' + document.getElementById(uniqIds[i]).getAttribute('vis') + '&';
            uri += 'hid=' + document.getElementById(uniqIds[i]).getAttribute('hid') + '&';
            uri += 'snd=' + document.getElementById(uniqIds[i]).getAttribute('snd') + '&';
            uri += 'aabd=' + document.getElementById(uniqIds[i]).getAttribute('aabd') + '&';
            uri += 'aabs=' + document.getElementById(uniqIds[i]).getAttribute('aabs');

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'datingaffiliationpopup';
        tarteaucitron.fallback(['datingaffiliationpopup-canvas'], tarteaucitron.engage(id));
    }
};

// deezer
tarteaucitron.services.deezer = {
    "key": "deezer",
    "type": "video",
    "name": "Deezer",
    "uri": "https://www.deezer.com/legal/personal-datas",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['deezer_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Deezer iframe'),
                deezer_id = x.getAttribute("deezerID"),
                deezer_width = x.getAttribute("width"),
                frame_width = 'width=',
                deezer_height = x.getAttribute("height"),
                frame_height = 'height=',
                deezer_frame,
                embed_theme = x.getAttribute("theme"),
                embed_type = x.getAttribute("embedType"),
                radius = x.getAttribute("radius"),
                tracklist = x.getAttribute("tracklist"),
                allowfullscreen = x.getAttribute("allowfullscreen"),
                params;

            if (deezer_id === undefined) {
                return "";
            }
            if (deezer_width !== undefined) {
                frame_width += '"' + deezer_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (deezer_height !== undefined) {
                frame_height += '"' + deezer_height + '" ';
            } else {
                frame_height += '"" ';
            }
            if (embed_theme === undefined || !['auto', 'light', 'dark'].includes(embed_theme)) {
                embed_theme = "auto";
            }
            if (embed_type === undefined || !['album', 'track', 'playlist'].includes(embed_type)) {
                embed_type = "album";
            }
            if (radius === undefined || !['true', 'false'].includes(radius)) {
                radius = "true";
            }
            if (tracklist === undefined || !['true', 'false'].includes(tracklist)) {
                tracklist = "true";
            }
            params = 'tracklist=' + tracklist + '&radius=' + radius;
            deezer_frame = '<iframe title="' + frame_title + '" src="//widget.deezer.com/widget/' + embed_theme + '/' + embed_type + '/' + deezer_id + '?' + params + '" ' + frame_width + frame_height + ' ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return deezer_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'deezer';
        tarteaucitron.fallback(['deezer_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// leadforensics
tarteaucitron.services.leadforensics = {
    "key": "leadforensics",
    "type": "analytic",
    "name": "LeadForensics",
    "uri": "https://www.leadforensics.com/privacy-policy/",
    "needConsent": true,
    "cookies": ['trackalyzer'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.leadforensicsSf14gv === undefined ||
            tarteaucitron.user.leadforensicsIidentifier === undefined) {
            return;
        }

        window.sf14gv = tarteaucitron.user.leadforensicsSf14gv;

        (function () {
            var sf14g = document.createElement('script'); sf14g.async = true;
            sf14g.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 't.sf14g.com/sf14g.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sf14g, s);
        })();

        tarteaucitron.addScript('//secure.leadforensics.com/js/' + tarteaucitron.user.leadforensicsIidentifier + '.js');
    }
};

// disqus
tarteaucitron.services.disqus = {
    "key": "disqus",
    "type": "comment",
    "name": "Disqus",
    "uri": "https://help.disqus.com/customer/portal/articles/466259-privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.disqusShortname === undefined) {
            return;
        }
        tarteaucitron.addScript('//' + tarteaucitron.user.disqusShortname + '.disqus.com/embed.js');
        tarteaucitron.addScript('//' + tarteaucitron.user.disqusShortname + '.disqus.com/count.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'disqus';

        if (document.getElementById('disqus_thread')) {
            document.getElementById('disqus_thread').innerHTML = tarteaucitron.engage(id);
        }
    }
};

// ekomi
tarteaucitron.services.ekomi = {
    "key": "ekomi",
    "type": "social",
    "name": "eKomi",
    "uri": "http://www.ekomi-us.com/us/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.ekomiCertId === undefined) {
            return;
        }
        window.eKomiIntegrationConfig = [
            { certId: tarteaucitron.user.ekomiCertId }
        ];
        tarteaucitron.addScript('//connect.ekomi.de/integration_1410173009/' + tarteaucitron.user.ekomiCertId + '.js');
    }
};

// etracker
tarteaucitron.services.etracker = {
    "key": "etracker",
    "type": "analytic",
    "name": "eTracker",
    "uri": "https://www.etracker.com/en/data-protection.html",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.etracker === undefined) {
            return;
        }

        tarteaucitron.addScript('//static.etracker.com/code/e.js', '_etLoader', function () { }, true, "data-secure-code", tarteaucitron.user.etracker);
    }
};

// facebook
tarteaucitron.services.facebook = {
    "key": "facebook",
    "type": "social",
    "name": "Facebook",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": ['xs', 'sb', 'fr', 'datr', 'dpr', 'c_user'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['fb-post', 'fb-follow', 'fb-activity', 'fb-send', 'fb-share-button', 'fb-like', 'fb-video'], '');
        tarteaucitron.addScript('//connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk.js#xfbml=1&version=v2.0', 'facebook-jssdk');
        if (tarteaucitron.isAjax === true) {
            if (typeof FB !== "undefined") {
                FB.XFBML.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'facebook';
        tarteaucitron.fallback(['fb-post', 'fb-follow', 'fb-activity', 'fb-send', 'fb-share-button', 'fb-like', 'fb-video'], tarteaucitron.engage(id));
    }
};

// facebooklikebox
tarteaucitron.services.facebooklikebox = {
    "key": "facebooklikebox",
    "type": "social",
    "name": "Facebook (like box)",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['fb-like-box', 'fb-page'], '');
        tarteaucitron.addScript('//connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk.js#xfbml=1&version=v2.3', 'facebook-jssdk');
        if (tarteaucitron.isAjax === true) {
            if (typeof FB !== "undefined") {
                FB.XFBML.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'facebooklikebox';
        tarteaucitron.fallback(['fb-like-box', 'fb-page'], tarteaucitron.engage(id));
    }
};

// facebookcomment
tarteaucitron.services.facebookcomment = {
    "key": "facebookcomment",
    "type": "comment",
    "name": "Facebook (commentaire)",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['fb-comments'], '');
        tarteaucitron.addScript('//connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk.js#xfbml=1&version=v2.0', 'facebook-jssdk');
        if (tarteaucitron.isAjax === true) {
            if (typeof FB !== "undefined") {
                FB.XFBML.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'facebookcomment';
        tarteaucitron.fallback(['fb-comments'], tarteaucitron.engage(id));
    }
};

// ferank
tarteaucitron.services.ferank = {
    "key": "ferank",
    "type": "analytic",
    "name": "FERank",
    "uri": "https://www.ferank.fr/respect-vie-privee/#mesureaudience",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//static.ferank.fr/pixel.js', '', function () {
            if (typeof tarteaucitron.user.ferankMore === 'function') {
                tarteaucitron.user.ferankMore();
            }
        });
    }
};

// pingdom
tarteaucitron.services.pingdom = {
    "key": "pingdom",
    "type": "api",
    "name": "Pingdom",
    "uri": "https://www.solarwinds.com/general-data-protection-regulation-cloud",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.pingdomId === undefined) {
            return;
        }

        window._prum = [['id', tarteaucitron.user.pingdomId], ['mark', 'firstbyte', (new Date()).getTime()]];

        tarteaucitron.addScript('https://rum-static.pingdom.net/prum.min.js');
    }
};


// simpleanalytics
tarteaucitron.services.simpleanalytics = {
    "key": "simpleanalytics",
    "type": "analytic",
    "name": "Simple Analytics",
    "uri": "https://docs.simpleanalytics.com/what-we-collect",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://scripts.simpleanalyticscdn.com/latest.js');
    }
};

// stonly
tarteaucitron.services.stonly = {
    "key": "stonly",
    "type": "api",
    "name": "Stonly",
    "uri": "https://stonly.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.stonlyId === undefined) {
            return;
        }

        window.STONLY_WID = tarteaucitron.user.stonlyId;
        window.StonlyWidget || ((window.w = window.StonlyWidget = function () {
            window.w._api ? window.w._api.apply(window.w, arguments) : window.w.queue.push(arguments)
        }).queue = []);

        tarteaucitron.addScript('https://stonly.com/js/widget/v2/stonly-widget.js?v=' + Date.now());
    }
};

// stripe
/*tarteaucitron.services.stripe = {
    "key": "stripe",
    "type": "api",
    "name": "Stripe",
    "uri": "https://stripe.com/cookies-policy/legal",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://js.stripe.com/v3/');
    }
};*/

// ferank pub
tarteaucitron.services.ferankpub = {
    "key": "ferankpub",
    "type": "ads",
    "name": "FERank (pub)",
    "uri": "https://www.ferank.fr/respect-vie-privee/#regiepublicitaire",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//static.ferank.fr/publicite.async.js');
        if (tarteaucitron.isAjax === true) {
            if (typeof ferankReady === 'function') {
                ferankReady();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'ferankpub';
        tarteaucitron.fallback(['ferank-publicite'], tarteaucitron.engage(id));
    }
};

// get+
tarteaucitron.services.getplus = {
    "key": "getplus",
    "type": "analytic",
    "name": "Get+",
    "uri": "http://www.getplus.fr/Conditions-generales-de-vente_a226.html",
    "needConsent": true,
    "cookies": ['_first_pageview', '_jsuid', 'no_trackyy_' + tarteaucitron.user.getplusId, '_eventqueue'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.getplusId === undefined) {
            return;
        }

        window.webleads_site_ids = window.webleads_site_ids || [];
        window.webleads_site_ids.push(tarteaucitron.user.getplusId);
        tarteaucitron.addScript('//stats.webleads-tracker.com/js');
    }
};

// google+
tarteaucitron.services.gplus = {
    "key": "gplus",
    "type": "social",
    "name": "Google+",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'gplus';
        tarteaucitron.fallback(['g-plus', 'g-plusone'], tarteaucitron.engage(id));
    }
};

// google+ badge
tarteaucitron.services.gplusbadge = {
    "key": "gplusbadge",
    "type": "social",
    "name": "Google+ (badge)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'gplusbadge';
        tarteaucitron.fallback(['g-page', 'g-person'], tarteaucitron.engage(id));
    }
};

// google adsense
tarteaucitron.services.adsense = {
    "key": "adsense",
    "type": "ads",
    "name": "Google Adsense",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "readmoreLink": "https://policies.google.com/technologies/partner-sites",
    "cookies": ['__gads'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['adsbygoogle'], '');
        tarteaucitron.addScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'adsense';
        tarteaucitron.fallback(['adsbygoogle'], tarteaucitron.engage(id));
    }
};


// google adsense automatic
tarteaucitron.services.adsenseauto = {
    "key": "adsenseauto",
    "type": "ads",
    "name": "Google Adsense Automatic",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "readmoreLink": "https://policies.google.com/technologies/partner-sites",
    "cookies": ['__gads'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.adsensecapub === undefined) {
            return;
        }
        tarteaucitron.addScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + tarteaucitron.user.adsensecapub, '', '', '', 'crossorigin', 'anonymous');
    }
};

// Google Adsense Search
tarteaucitron.services.adsensesearch = {
    "key": "adsensesearch",
    "type": "ads",
    "name": "Google Adsense Search",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "readmoreLink": "https://policies.google.com/technologies/partner-sites",
    "cookies": ['__gads'],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://www.google.com/adsense/search/ads.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'adsensesearch';
        tarteaucitron.fallback(['afscontainer1'], tarteaucitron.engage(id));
    }
};

// google partners badge
tarteaucitron.services.googlepartners = {
    "key": "googlepartners",
    "type": "ads",
    "name": "Google Partners Badge",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'googlepartners';
        tarteaucitron.fallback(['g-partnersbadge'], tarteaucitron.engage(id));
    }
};

// google adsense search (form)
tarteaucitron.services.adsensesearchform = {
    "key": "adsensesearchform",
    "type": "ads",
    "name": "Google Adsense Search (form)",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//www.google.com/coop/cse/brand?form=cse-search-box&lang=' + tarteaucitron.getLanguage());
    }
};

// google adsense search (result)
tarteaucitron.services.adsensesearchresult = {
    "key": "adsensesearchresult",
    "type": "ads",
    "name": "Google Adsense Search (result)",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.adsensesearchresultCx === undefined) {
            return;
        }
        tarteaucitron.addScript('//www.google.com/cse/cse.js?cx=' + tarteaucitron.user.adsensesearchresultCx);
    },
    "fallback": function () {
        "use strict";
        var id = 'adsensesearchresult';

        if (document.getElementById('gcse_searchresults')) {
            document.getElementById('gcse_searchresults').innerHTML = tarteaucitron.engage(id);
        }
    }
};

// googleadwordsconversion
tarteaucitron.services.googleadwordsconversion = {
    "key": "googleadwordsconversion",
    "type": "ads",
    "name": "Google Adwords (conversion)",
    "uri": "https://www.google.com/settings/ads",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.adwordsconversionId === undefined) {
            return;
        }

        tarteaucitron.addScript('//www.googleadservices.com/pagead/conversion_async.js', '', function () {
            window.google_trackConversion({
                google_conversion_id: tarteaucitron.user.adwordsconversionId,
                google_conversion_label: tarteaucitron.user.adwordsconversionLabel,
                google_conversion_language: tarteaucitron.user.adwordsconversionLanguage,
                google_conversion_format: tarteaucitron.user.adwordsconversionFormat,
                google_conversion_color: tarteaucitron.user.adwordsconversionColor,
                google_conversion_value: tarteaucitron.user.adwordsconversionValue,
                google_conversion_currency: tarteaucitron.user.adwordsconversionCurrency,
                google_custom_params: {
                    parameter1: tarteaucitron.user.adwordsconversionCustom1,
                    parameter2: tarteaucitron.user.adwordsconversionCustom2
                }
            });
        });
    }
};

// googleadwordsremarketing
tarteaucitron.services.googleadwordsremarketing = {
    "key": "googleadwordsremarketing",
    "type": "ads",
    "name": "Google Adwords (remarketing)",
    "uri": "https://www.google.com/settings/ads",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.adwordsremarketingId === undefined) {
            return;
        }

        tarteaucitron.addScript('//www.googleadservices.com/pagead/conversion_async.js', '', function () {
            window.google_trackConversion({
                google_conversion_id: tarteaucitron.user.adwordsremarketingId,
                google_remarketing_only: true
            });
        });
    }
};

// google analytics (old)
tarteaucitron.services.gajs = {
    "key": "gajs",
    "type": "analytic",
    "name": "Google Analytics (ga.js)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.gajsUa,
            tagUaCookie = '_gat_gtag_' + googleIdentifier,
            tagGCookie = '_ga_' + googleIdentifier;

        tagUaCookie = tagUaCookie.replace(/-/g, '_');
        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
    })(),
    "js": function () {
        "use strict";
        window._gaq = window._gaq || [];
        window._gaq.push(['_setAccount', tarteaucitron.user.gajsUa]);
        if (timeExpire !== undefined) {
            _gaq.push(['_setVisitorCookieTimeout', timeExpire]);
        }

        if (tarteaucitron.user.gajsAnonymizeIp) {
            window._gaq.push(['_gat._anonymizeIp']);
        }

        if (tarteaucitron.user.gajsPageView) {
            window._gaq.push(['_trackPageview, ' + tarteaucitron.user.gajsPageView]);
        } else {
            window._gaq.push(['_trackPageview']);
        }

        tarteaucitron.addScript('//www.google-analytics.com/ga.js', '', function () {
            if (typeof tarteaucitron.user.gajsMore === 'function') {
                tarteaucitron.user.gajsMore();
            }
        });
    }
};

// google analytics
tarteaucitron.services.analytics = {
    "key": "analytics",
    "type": "analytic",
    "name": "Google Analytics (universal)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.analyticsUa,
            tagUaCookie = '_gat_gtag_' + googleIdentifier,
            tagGCookie = '_ga_' + googleIdentifier;

        tagUaCookie = tagUaCookie.replace(/-/g, '_');
        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
    })(),
    "js": function () {
        "use strict";
        window.GoogleAnalyticsObject = 'ga';
        window.ga = window.ga || function () {
            window.ga.q = window.ga.q || [];
            window.ga.q.push(arguments);
        };
        window.ga.l = new Date();
        tarteaucitron.addScript('https://www.google-analytics.com/analytics.js', '', function () {
            var uaCreate = { 'cookieExpires': (timeExpire !== undefined) ? timeExpire : 34128000 };
            tarteaucitron.extend(uaCreate, tarteaucitron.user.analyticsUaCreate || {});
            ga('create', tarteaucitron.user.analyticsUa, uaCreate);

            if (tarteaucitron.user.analyticsAnonymizeIp) {
                ga('set', 'anonymizeIp', true);
            }

            if (typeof tarteaucitron.user.analyticsPrepare === 'function') {
                tarteaucitron.user.analyticsPrepare();
            }

            if (tarteaucitron.user.analyticsPageView) {
                ga('send', 'pageview', tarteaucitron.user.analyticsPageView);
            } else {
                ga('send', 'pageview');
            }

            if (typeof tarteaucitron.user.analyticsMore === 'function') {
                tarteaucitron.user.analyticsMore();
            }
        });
    }
};

// google ads
tarteaucitron.services.googleads = {
    "key": "googleads",
    "type": "ads",
    "name": "Google Ads",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.googleadsId,
            tagUaCookie = '_gat_gtag_' + googleIdentifier,
            tagGCookie = '_ga_' + googleIdentifier;

        tagUaCookie = tagUaCookie.replace(/-/g, '_');
        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
    })(),
    "js": function () {
        "use strict";
        window.dataLayer = window.dataLayer || [];
        tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + tarteaucitron.user.googleadsId, '', function () {
            window.gtag = function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            var additional_config_info = (timeExpire !== undefined) ? {'anonymize_ip': true, 'cookie_expires': timeExpire / 1000} : {'anonymize_ip': true};

            gtag('config', tarteaucitron.user.googleadsId, additional_config_info);

            if (typeof tarteaucitron.user.googleadsMore === 'function') {
                tarteaucitron.user.googleadsMore();
            }
        });
    }
};

// google analytics
tarteaucitron.services.gtag = {
    "key": "gtag",
    "type": "analytic",
    "name": "Google Analytics (GA4)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.gtagUa,
            tagUaCookie = '_gat_gtag_' + googleIdentifier,
            tagGCookie = '_ga_' + googleIdentifier;

        tagUaCookie = tagUaCookie.replace(/-/g, '_');
        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
    })(),
    "js": function () {
        "use strict";
        window.dataLayer = window.dataLayer || [];
        tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + tarteaucitron.user.gtagUa, '', function () {
            window.gtag = function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            var additional_config_info = (timeExpire !== undefined) ? {'anonymize_ip': true, 'cookie_expires': timeExpire / 1000} : {'anonymize_ip': true};

            if (tarteaucitron.user.gtagCrossdomain) {
                /**
                 * https://support.google.com/analytics/answer/7476333?hl=en
                 * https://developers.google.com/analytics/devguides/collection/gtagjs/cross-domain
                 */
                gtag('config', tarteaucitron.user.gtagUa, additional_config_info, { linker: { domains: tarteaucitron.user.gtagCrossdomain, } });
            } else {
                gtag('config', tarteaucitron.user.gtagUa, additional_config_info);
            }

            if (typeof tarteaucitron.user.gtagMore === 'function') {
                tarteaucitron.user.gtagMore();
            }
        });
    }
};

tarteaucitron.services.firebase = {
    "key": "firebase",
    "type": "analytic",
    "name": "Firebase",
    "uri": "https://firebase.google.com/support/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.firebaseMeasurementId,
            tagGCookie = '_ga_' + googleIdentifier;

        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', tagGCookie];
    })(),
    "js": function () {
        "use strict";

        if (tarteaucitron.user.firebaseApiKey === undefined) {
            return;
        }

        tarteaucitron.addScript('https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js', '', function () {
            tarteaucitron.addScript('https://www.gstatic.com/firebasejs/8.6.2/firebase-analytics.js', '', function () {

                var firebaseConfig = {
                    apiKey: tarteaucitron.user.firebaseApiKey,
                    authDomain: tarteaucitron.user.firebaseAuthDomain,
                    databaseURL: tarteaucitron.user.firebaseDatabaseUrl,
                    projectId: tarteaucitron.user.firebaseProjectId,
                    storageBucket: tarteaucitron.user.firebaseStorageBucket,
                    appId: tarteaucitron.user.firebaseAppId,
                    measurementId: tarteaucitron.user.firebaseMeasurementId,
                };
                firebase.initializeApp(firebaseConfig);
                firebase.analytics();
            });
        });
    }
};

// genially
tarteaucitron.services.genially = {
    "key": "genially",
    "type": "api",
    "name": "genially",
    "uri": "https://www.genial.ly/cookies",
    "needConsent": true,
    "cookies": ['_gat', '_ga', '_gid'],
    "js": function () {
        "use strict";

        tarteaucitron.fallback(['tac_genially'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'genially iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                geniallyid = x.getAttribute("geniallyid"),
                allowfullscreen = x.getAttribute("allowfullscreen");

            return '<div style="position: relative; padding-bottom: 109.00%; padding-top: 0; height: 0;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" title="' + frame_title + '" src="https://view.genial.ly/' + geniallyid + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe></div>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'genially';
        tarteaucitron.fallback(['tac_genially'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// google maps
tarteaucitron.services.googlemaps = {
    "key": "googlemaps",
    "type": "api",
    "name": "Google Maps",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var mapOptions,
            map,
            uniqIds = [],
            i;

        if (tarteaucitron.user.mapscallback === undefined) {
            tarteaucitron.user.mapscallback = 'tac_googlemaps_callback';
        }

        // Add Google Maps libraries if any (https://developers.google.com/maps/documentation/javascript/libraries)
        var googleMapsLibraries = '';
        if (tarteaucitron.user.googlemapsLibraries) {
            googleMapsLibraries = '&libraries=' + tarteaucitron.user.googlemapsLibraries;
        }

        tarteaucitron.addScript('//maps.googleapis.com/maps/api/js?v=3.exp&key=' + tarteaucitron.user.googlemapsKey + '&callback=' + tarteaucitron.user.mapscallback + googleMapsLibraries);

        window.tac_googlemaps_callback = function () {
            tarteaucitron.fallback(['googlemaps-canvas'], function (x) {
                var uniqId = '_' + Math.random().toString(36).substr(2, 9);
                uniqIds.push(uniqId);
                return '<div id="' + uniqId + '" zoom="' + x.getAttribute('zoom') + '" latitude="' + x.getAttribute('latitude') + '" longitude="' + x.getAttribute('longitude') + '" style="width:' + x.offsetWidth + 'px;height:' + x.offsetHeight + 'px"></div>';
            });

            var i;
            for (i = 0; i < uniqIds.length; i += 1) {
                mapOptions = {
                    zoom: parseInt(document.getElementById(uniqIds[i]).getAttribute('zoom'), 10),
                    center: new google.maps.LatLng(parseFloat(document.getElementById(uniqIds[i]).getAttribute('latitude'), 10), parseFloat(document.getElementById(uniqIds[i]).getAttribute('longitude'), 10))
                };
                map = new google.maps.Map(document.getElementById(uniqIds[i]), mapOptions);
                new google.maps.Marker({ position: { lat: parseFloat(document.getElementById(uniqIds[i]).getAttribute('latitude'), 10), lng: parseFloat(document.getElementById(uniqIds[i]).getAttribute('longitude'), 10) }, map: map });
            }
        };
    },
    "fallback": function () {
        "use strict";
        var id = 'googlemaps';
        tarteaucitron.fallback(['googlemaps-canvas'], tarteaucitron.engage(id));
    }
};

// googlemaps search
tarteaucitron.services.googlemapssearch = {
    "key": "googlemapssearch",
    "type": "api",
    "name": "Google Maps Search API",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['nid'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['googlemapssearch'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Google search iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                // url = x.getAttribute("data-url");
                query = escape(x.getAttribute("data-search")),
                key = x.getAttribute("data-api-key");

            return '<iframe title="' + frame_title + '" width="' + width + '" height="' + height + '" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=' + query + '&key=' + key + '" allowfullscreen></iframe> '
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'googlemapssearch';
        tarteaucitron.fallback(['googlemapssearch'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// googlemaps embed iframe
tarteaucitron.services.googlemapsembed = {
    "key": "googlemapsembed",
    "type": "api",
    "name": "Google Maps Embed",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['apisid', 'hsid', 'nid', 'sapisid', 'sid', 'sidcc', 'ssid', '1p_jar'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['googlemapsembed'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Google maps iframe'),
                width = tarteaucitron.getElemWidth(x),
                height = tarteaucitron.getElemHeight(x),
                url = x.getAttribute("data-url");

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'googlemapsembed';
        tarteaucitron.fallback(['googlemapsembed'], function (elem) {
            elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
            elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';
            return tarteaucitron.engage(id);
        });
    }
};


// openstreetmap embed iframe
tarteaucitron.services.openstreetmap = {
    "key": "openstreetmap",
    "type": "api",
    "name": "Openstreetmap Embed",
    "uri": "https://wiki.osmfoundation.org/wiki/Privacy_Policy#Cookies",
    "needConsent": true,
    "cookies": ['apisid', 'hsid', 'nid', 'sapisid', 'sid', 'sidcc', 'ssid', '1p_jar'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['openstreetmap'], function (x) {
            var width = tarteaucitron.getElemWidth(x),
                height = tarteaucitron.getElemHeight(x),
                url = x.getAttribute("data-url");

            return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'openstreetmap';
        tarteaucitron.fallback(['openstreetmap'], function (elem) {
            elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
            elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// geoportail embed iframe
tarteaucitron.services.geoportail = {
    "key": "geoportail",
    "type": "api",
    "name": "Geoportail maps Embed",
    "uri": "https://www.ign.fr/institut/gestion-des-cookies",
    "needConsent": true,
    "cookies": ['apisid', 'hsid', 'nid', 'sapisid', 'sid', 'sidcc', 'ssid', '1p_jar'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['geoportail'], function (x) {
            var width = tarteaucitron.getElemWidth(x),
                height = tarteaucitron.getElemHeight(x),
                url = x.getAttribute("data-url");

            return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" sandbox="allow-forms allow-scripts allow-same-origin" allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'geoportail';
        tarteaucitron.fallback(['geoportail'], function (elem) {
            elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
            elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';
            return tarteaucitron.engage(id);
        });
    }
};


// google tag manager
tarteaucitron.services.googletagmanager = {
    "key": "googletagmanager",
    "type": "api",
    "name": "Google Tag Manager",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['_ga', '_gat', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', '__gads', '_drt_', 'FLC', 'exchange_uid', 'id', 'fc', 'rrs', 'rds', 'rv', 'uid', 'UIDR', 'UID', 'clid', 'ipinfo', 'acs'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.googletagmanagerId === undefined) {
            return;
        }
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
        tarteaucitron.addScript('https://www.googletagmanager.com/gtm.js?id=' + tarteaucitron.user.googletagmanagerId);
    }
};

// google tag manager multiple
tarteaucitron.services.multiplegoogletagmanager = {
    "key": "multiplegoogletagmanager",
    "type": "api",
    "name": "Google Tag Manager",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['_ga', '_gat', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', '__gads', '_drt_', 'FLC', 'exchange_uid', 'id', 'fc', 'rrs', 'rds', 'rv', 'uid', 'UIDR', 'UID', 'clid', 'ipinfo', 'acs'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.multiplegoogletagmanagerId === undefined) {
            return;
        }
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });

        tarteaucitron.user.multiplegoogletagmanagerId.forEach(function (id) {
            tarteaucitron.addScript('https://www.googletagmanager.com/gtm.js?id=' + id);
        });

    }
};

// google webfonts
tarteaucitron.services.googlefonts = {
    "key": "googlefonts",
    "type": "api",
    "name": "Google Webfonts",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.googleFonts === undefined) {
            return;
        }
        tarteaucitron.addScript('//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js', '', function () {
            WebFont.load({
                google: {
                    families: tarteaucitron.user.googleFonts
                }
            });
        });
    }
};

// hubspot
tarteaucitron.services.hubspot = {
    "key": "hubspot",
    "type": "analytic",
    "name": "Hubspot",
    "uri": "https://legal.hubspot.com/privacy-policy",
    "needConsent": true,
    "cookies": ['hubspotutk', 'fr', '__hstc', '__hssrc', '__hssc', '__cfduid'],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//js.hs-scripts.com/' + tarteaucitron.user.hubspotId + '.js', 'hs-script-loader');
    }
};

// instagram
tarteaucitron.services.instagram = {
    "key": "instagram",
    "type": "social",
    "name": "Instagram",
    "uri": "https://www.instagram.com/legal/privacy/",
    "needConsent": true,
    "cookies": ['shbts', 'sessionid', 'csrftoken', 'rur', 'shbid', 'mid', 'ds_usr_id', 'ig_did', 'ig_cb', 'datr'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['instagram_post'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Instagram iframe'),
                post_id = x.getAttribute('postId'),
                post_permalink = x.getAttribute('data-instgrm-permalink'),
                embed_width = x.getAttribute('width'),
                embed_height = x.getAttribute('height'),
                frame_width,
                frame_height,
                post_frame;

            if (post_permalink != null) {
                tarteaucitron.addScript('//www.instagram.com/embed.js', 'instagram-embed');

                return '';
            }

            if (post_id === undefined) {
                return "";
            }

            if (embed_width !== undefined) {
                frame_width = 'width="' + embed_width + '" ';
            } else {
                frame_width = '"" ';
            }
            if (embed_height !== undefined) {
                frame_height = 'height="' + embed_height + '" ';
            } else {
                frame_height = '"" ';
            }

            post_frame = '<iframe title="' + frame_title + '" src="//www.instagram.com/' + post_id + '/embed" ' + frame_width + frame_height + '></iframe>';

            return post_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'instagram';
        tarteaucitron.fallback(['instagram_post'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// jsapi
tarteaucitron.services.jsapi = {
    "key": "jsapi",
    "type": "api",
    "name": "Google jsapi",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//www.google.com/jsapi');
    }
};

// twitterwidgetsapi
tarteaucitron.services.twitterwidgetsapi = {
    "key": "twitterwidgetsapi",
    "type": "api",
    "name": "Twitter Widgets API",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacTwitterAPI'], '');
        tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
    },
    "fallback": function () {
        "use strict";
        var id = 'twitterwidgetsapi';
        tarteaucitron.fallback(['tacTwitterAPI'], tarteaucitron.engage(id));
    }
};

// recaptcha
tarteaucitron.services.recaptcha = {
    "key": "recaptcha",
    "type": "api",
    "name": "reCAPTCHA",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['nid'],
    "js": function () {
        "use strict";
        window.tacRecaptchaOnLoad = tarteaucitron.user.recaptchaOnLoad || function () { };
        tarteaucitron.fallback(['g-recaptcha'], '');

        if (tarteaucitron.user.recaptchaapi === undefined) {
            tarteaucitron.addScript('https://www.google.com/recaptcha/api.js?onload=tacRecaptchaOnLoad');
        } else {
            tarteaucitron.addScript('https://www.google.com/recaptcha/api.js?onload=tacRecaptchaOnLoad&render=' + tarteaucitron.user.recaptchaapi);
        }

    },
    "fallback": function () {
        "use strict";
        var id = 'recaptcha';
        tarteaucitron.fallback(['g-recaptcha'], tarteaucitron.engage(id));
    }
};

// linkedin
tarteaucitron.services.linkedin = {
    "key": "linkedin",
    "type": "social",
    "name": "Linkedin",
    "uri": "https://www.linkedin.com/legal/cookie_policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacLinkedin'], '');
        tarteaucitron.addScript('//platform.linkedin.com/in.js');
        if (tarteaucitron.isAjax === true) {
            if (typeof IN !== "undefined") {
                IN.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'linkedin';
        tarteaucitron.fallback(['tacLinkedin'], tarteaucitron.engage(id));
    }
};

// mautic
tarteaucitron.services.mautic = {
    "key": "mautic",
    "type": "analytic",
    "name": "Mautic",
    "uri": "https://www.mautic.org/privacy-policy/",
    "needConsent": true,
    "cookies": ['mtc_id', 'mtc_sid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.mauticurl === undefined) {
            return;
        }

        window.MauticTrackingObject = 'mt';
        window.mt = window.mt || function () {
            window.mt.q = window.mt.q || [];
            window.mt.q.push(arguments);
        };

        tarteaucitron.addScript(tarteaucitron.user.mauticurl, '', function () {
            mt('send', 'pageview');
        });
    }
};

// microsoftcampaignanalytics
tarteaucitron.services.microsoftcampaignanalytics = {
    "key": "microsoftcampaignanalytics",
    "type": "analytic",
    "name": "Microsoft Campaign Analytics",
    "uri": "https://privacy.microsoft.com/privacystatement/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.microsoftcampaignanalyticsUUID === undefined) {
            return;
        }

        tarteaucitron.addScript('//flex.atdmt.com/mstag/site/' + tarteaucitron.user.microsoftcampaignanalyticsUUID + '/mstag.js', 'mstag_tops', function () {
            window.mstag = { loadTag: function () { }, time: (new Date()).getTime() };
            window.mstag.loadTag("analytics", { dedup: "1", domainId: tarteaucitron.user.microsoftcampaignanalyticsdomainId, type: "1", actionid: tarteaucitron.user.microsoftcampaignanalyticsactionId });
        });
    }
};

// onesignal
tarteaucitron.services.onesignal = {
    "key": "onesignal",
    "type": "api",
    "name": "OneSignal",
    "uri": "https://onesignal.com/privacy_policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.onesignalAppId === undefined) {
            return;
        }
        window.OneSignal = window.OneSignal || [];

        window.OneSignal.push(function () {
            window.OneSignal.init({
                appId: tarteaucitron.user.onesignalAppId,
            });
        });

        tarteaucitron.addScript('https://cdn.onesignal.com/sdks/OneSignalSDK.js');
    }
};

// pinterest
tarteaucitron.services.pinterest = {
    "key": "pinterest",
    "type": "social",
    "name": "Pinterest",
    "uri": "https://about.pinterest.com/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacPinterest'], '');
        tarteaucitron.addScript('//assets.pinterest.com/js/pinit.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'pinterest';
        tarteaucitron.fallback(['tacPinterest'], tarteaucitron.engage(id));
    }
};

// prelinker
tarteaucitron.services.prelinker = {
    "key": "prelinker",
    "type": "ads",
    "name": "Prelinker",
    "uri": "http://www.prelinker.com/index/index/cgu/",
    "needConsent": true,
    "cookies": ['_sp_id.32f5', '_sp_ses.32f5'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['prelinker-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" siteId="' + x.getAttribute('siteId') + '" bannerId="' + x.getAttribute('bannerId') + '" defaultLanguage="' + x.getAttribute('defaultLanguage') + '" tracker="' + x.getAttribute('tracker') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = 'http://promo.easy-dating.org/banner/index?';
            uri += 'site_id=' + document.getElementById(uniqIds[i]).getAttribute('siteId') + '&';
            uri += 'banner_id=' + document.getElementById(uniqIds[i]).getAttribute('bannerId') + '&';
            uri += 'default_language=' + document.getElementById(uniqIds[i]).getAttribute('defaultLanguage') + '&';
            uri += 'tr4ck=' + document.getElementById(uniqIds[i]).getAttribute('trackrt');

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'prelinker';
        tarteaucitron.fallback(['prelinker-canvas'], tarteaucitron.engage(id));
    }
};

// prezi
tarteaucitron.services.prezi = {
    "key": "prezi",
    "type": "video",
    "name": "Prezi",
    "uri": "https://prezi.com/privacy-policy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['prezi-canvas'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Prezi iframe'),
                id = x.getAttribute("data-id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = 'https://prezi.com/embed/' + id + '/?bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0';

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'prezi';
        tarteaucitron.fallback(['prezi-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// pubdirecte
tarteaucitron.services.pubdirecte = {
    "key": "pubdirecte",
    "type": "ads",
    "name": "Pubdirecte",
    "uri": "http://pubdirecte.com/contact.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['pubdirecte-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" pid="' + x.getAttribute('pid') + '" ref="' + x.getAttribute('ref') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//www.pubdirecte.com/script/banniere.php?';
            uri += 'id=' + document.getElementById(uniqIds[i]).getAttribute('pid') + '&';
            uri += 'ref=' + document.getElementById(uniqIds[i]).getAttribute('ref');

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'pubdirecte';
        tarteaucitron.fallback(['pubdirecte-canvas'], tarteaucitron.engage(id));
    }
};

// purechat
tarteaucitron.services.purechat = {
    "key": "purechat",
    "type": "support",
    "name": "PureChat",
    "uri": "https://www.purechat.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.purechatId === undefined) {
            return;
        }

        tarteaucitron.addScript('//app.purechat.com/VisitorWidget/WidgetScript', '', function () {
            try {
                window.w = new PCWidget({ c: tarteaucitron.user.purechatId, f: true });
            } catch (e) { }
        });
    }
};

// Intercom
tarteaucitron.services.intercomChat = {
    "key": "intercomChat",
    "type": "support",
    "name": "Intercom",
    "uri": "https://www.intercom.com/",
    "needConsent": true,
    "cookies": [
        "intercom-id-" + tarteaucitron.user.intercomKey,
        "intercom-session-" + tarteaucitron.user.intercomKey,
    ],
    "readmoreLink": "https://www.intercom.com/legal/privacy",
    "js": function () {
        window.intercomSettings = {
            app_id: tarteaucitron.user.intercomKey,
        };

        var w = window;
        var ic = w.Intercom;
        if (typeof ic === "function") {
            ic("reattach_activator");
            ic("update", w.intercomSettings);
        } else {
            var i = function () {
                i.c(arguments);
            };
            i.q = [];
            i.c = function (args) {
                i.q.push(args);
            };
            w.Intercom = i;
            tarteaucitron.addScript(
                "https://widget.intercom.io/widget/" + tarteaucitron.user.intercomKey,
                "",
                function () {
                    // Execute callback if function `intercomChatEnable`
                    // is defined
                    if (typeof intercomChatEnable === 'function') {
                        intercomChatEnable()
                    }
                }
            );
        }
    },
    "fallback": function () {
        "use strict";
        var id = "intercomChat";
        tarteaucitron.fallback(
            ["intercom-chat"],
            function () {
                // Execute callback if function `intercomChatDisable`
                // is defined
                if (typeof intercomChatDisable === 'function') {
                    intercomChatDisable()
                }
                return tarteaucitron.engage(id)
            }
        );
    },
};

// rumbletalk
tarteaucitron.services.rumbletalk = {
    "key": "rumbletalk",
    "type": "social",
    "name": "RumbleTalk",
    "needConsent": true,
    "cookies": ['AWSALB'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.rumbletalkid === undefined) {
            return;
        }

        tarteaucitron.addScript('https://rumbletalk.com/client/?' + tarteaucitron.user.rumbletalkid);

        tarteaucitron.fallback(['rumbletalk'], function (x) {
            var width = tarteaucitron.getElemWidth(x),
                height = tarteaucitron.getElemHeight(x),
                id = x.getAttribute("data-id");

            return '<div style="height: ' + height + 'px; width: ' + width + 'px;"><div id="' + id + '"></div></div>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'rumbletalk';
        tarteaucitron.fallback(['rumbletalk'], function (elem) {
            elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
            elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';

            return tarteaucitron.engage(id);
        });
    }
};

// shareaholic
tarteaucitron.services.shareaholic = {
    "key": "shareaholic",
    "type": "social",
    "name": "Shareaholic",
    "uri": "https://shareaholic.com/privacy/choices",
    "needConsent": true,
    "cookies": ['__utma', '__utmb', '__utmc', '__utmz', '__utmt_Shareaholic%20Pageviews'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.shareaholicSiteId === undefined) {
            return;
        }

        tarteaucitron.fallback(['shareaholic-canvas'], '');
        tarteaucitron.addScript('//dsms0mj1bbhn4.cloudfront.net/assets/pub/shareaholic.js', '', function () {
            try {
                Shareaholic.init(tarteaucitron.user.shareaholicSiteId);
            } catch (e) { }
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'shareaholic';
        tarteaucitron.fallback(['shareaholic-canvas'], tarteaucitron.engage(id));
    }
};

// shareasale
tarteaucitron.services.shareasale = {
    "key": "shareasale",
    "type": "ads",
    "name": "ShareASale",
    "uri": "https://www.shareasale.com/PrivacyPolicy.pdf",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['shareasale-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" amount="' + x.getAttribute('amount') + '" tracking="' + x.getAttribute('tracking') + '" transtype="' + x.getAttribute('transtype') + '" persale="' + x.getAttribute('persale') + '" perlead="' + x.getAttribute('perlead') + '" perhit="' + x.getAttribute('perhit') + '" merchantID="' + x.getAttribute('merchantID') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = 'https://shareasale.com/sale.cfm?';
            uri += 'amount=' + document.getElementById(uniqIds[i]).getAttribute('amount') + '&';
            uri += 'tracking=' + document.getElementById(uniqIds[i]).getAttribute('tracking') + '&';
            uri += 'transtype=' + document.getElementById(uniqIds[i]).getAttribute('transtype') + '&';
            uri += 'persale=' + document.getElementById(uniqIds[i]).getAttribute('persale') + '&';
            uri += 'perlead=' + document.getElementById(uniqIds[i]).getAttribute('perlead') + '&';
            uri += 'perhit=' + document.getElementById(uniqIds[i]).getAttribute('perhit') + '&';
            uri += 'merchantID=' + document.getElementById(uniqIds[i]).getAttribute('merchantID');

            document.getElementById(uniqIds[i]).innerHTML = '<img src=\'' + uri + '\' width=\'1\' height=\'1\' />';
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'shareasale';
        tarteaucitron.fallback(['shareasale-canvas'], tarteaucitron.engage(id));
    }
};

// sharethis
tarteaucitron.services.sharethis = {
    "key": "sharethis",
    "type": "social",
    "name": "ShareThis",
    "uri": "http://www.sharethis.com/legal/privacy/",
    "needConsent": true,
    "cookies": ['__unam'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.sharethisPublisher === undefined) {
            return;
        }
        var switchTo5x = true,
            uri = ('https:' === document.location.protocol ? 'https://ws' : 'http://w') + '.sharethis.com/button/buttons.js';

        tarteaucitron.fallback(['tacSharethis'], '');
        tarteaucitron.addScript(uri, '', function () {
            stLight.options({ publisher: tarteaucitron.user.sharethisPublisher, doNotHash: false, doNotCopy: false, hashAddressBar: false });
        });

        if (tarteaucitron.isAjax === true) {
            if (typeof stButtons !== "undefined") {
                stButtons.locateElements();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'sharethis';
        tarteaucitron.fallback(['tacSharethis'], tarteaucitron.engage(id));
    }
};

// slideshare
tarteaucitron.services.slideshare = {
    "key": "slideshare",
    "type": "video",
    "name": "SlideShare",
    "uri": "https://www.linkedin.com/legal/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['slideshare-canvas'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Slideshare iframe'),
                id = x.getAttribute("data-id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = '//www.slideshare.net/slideshow/embed_code/' + id;

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'slideshare';
        tarteaucitron.fallback(['slideshare-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// soundcloud
tarteaucitron.services.soundcloud = {
    key: 'soundcloud',
    type: 'video',
    name: 'SoundCloud',
    needConsent: true,
    cookies: ['sc_anonymous_id', 'sclocale'],
    js: function () {
        "use strict";
        tarteaucitron.fallback(['soundcloud_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Soundcloud iframe'),
                player_height = x.getAttribute('data-height'),
                frame_height = 'height="' + player_height + '" ',
                playable_id = x.getAttribute('data-playable-id'),
                playable_type = x.getAttribute('data-playable-type'),
                playable_url = x.getAttribute('data-playable-url'),
                color = x.getAttribute('data-color'),
                autoplay = x.getAttribute('data-auto-play'),
                hideRelated = x.getAttribute('data-hide-related'),
                showComments = x.getAttribute('data-show-comments'),
                showUser = x.getAttribute('data-show-user'),
                showReposts = x.getAttribute('data-show-reposts'),
                showTeaser = x.getAttribute('data-show-teaser'),
                visual = x.getAttribute('data-visual'),
                artwork = x.getAttribute('data-artwork');

            var allowAutoplay = autoplay === 'true' ? 'allow="autoplay"' : '';

            if (playable_id === undefined && playable_url === undefined) {
                return "";
            }

            // Allow to embed from API results (playable_type + playable_id)
            var qs = '?url=https%3A//api.soundcloud.com/' + playable_type + '/' + playable_id;
            // Or from raw URL from Soundcloud website
            if (playable_url && playable_url.length > 0) qs = '?url=' + escape(playable_url);

            if (hideRelated && hideRelated.length > 0) qs += '&hide_related=' + hideRelated;
            if (color && color.length > 0) qs += '&color=' + color.replace('#', '%23');
            if (autoplay && autoplay.length > 0) qs += '&auto_play=' + autoplay;
            if (showComments && showComments.length > 0) qs += '&show_comments=' + showComments;
            if (hideRelated && hideRelated.length > 0) qs += '&hide_related=' + hideRelated;
            if (showUser && showUser.length > 0) qs += '&show_user=' + showUser;
            if (showReposts && showReposts.length > 0) qs += '&show_reposts=' + showReposts;
            if (showTeaser && showTeaser.length > 0) qs += '&show_teaser=' + showTeaser;
            if (visual && visual.length > 0) qs += '&visual=' + visual;
            if (artwork && artwork.length > 0) qs += '&show_artwork=' + artwork;

            return '<iframe title="' + frame_title + '" width="100%" ' + frame_height + ' scrolling="no" ' + allowAutoplay + ' src="https://w.soundcloud.com/player/' + qs + '"></iframe>';
        });
    },
    fallback: function () {
        "use strict";
        tarteaucitron.fallback(['soundcloud_player'], function (elem) {
            elem.style.height = elem.getAttribute('data-height') + 'px';
            return tarteaucitron.engage('soundcloud');
        });
    }
};

// spotify
tarteaucitron.services.spotify = {
    "key": "spotify",
    "type": "video",
    "name": "Spotify",
    "uri": "https://www.spotify.com/us/legal/privacy-policy/",
    "needConsent": true,
    "cookies": ['sp_landing', '_ga', 'sp_ab', 'sp_landingref', 'sp_t', 'sp_usid', 'OptanonConsent', 'sp_m', 'spot'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['spotify_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Spotify iframe'),
                spotify_id = x.getAttribute("spotifyID"),
                spotify_width = x.getAttribute("width"),
                frame_width = 'width=',
                spotify_height = x.getAttribute("height"),
                frame_height = 'height=',
                spotify_frame;

            if (spotify_id === undefined) {
                return "";
            }
            if (spotify_width !== undefined) {
                frame_width += '"' + spotify_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (spotify_height !== undefined) {
                frame_height += '"' + spotify_height + '" ';
            } else {
                frame_height += '"" ';
            }
            spotify_frame = '<iframe title="' + frame_title + '" src="//open.spotify.com/embed/' + spotify_id + '" ' + frame_width + frame_height + ' allowfullscreen></iframe>';
            return spotify_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'spotify';
        tarteaucitron.fallback(['spotify_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// statcounter
tarteaucitron.services.statcounter = {
    "key": "statcounter",
    "type": "analytic",
    "name": "StatCounter",
    "uri": "https://fr.statcounter.com/about/legal/#privacy",
    "needConsent": true,
    "cookies": ['sc_is_visitor_unique'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri = '//statcounter.com/counter/counter.js';

        tarteaucitron.fallback(['statcounter-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'statcounter';
        tarteaucitron.fallback(['statcounter-canvas'], tarteaucitron.engage(id));
    }
};

// timelinejs
tarteaucitron.services.timelinejs = {
    "key": "timelinejs",
    "type": "api",
    "name": "Timeline JS",
    "uri": "http://timeline.knightlab.com/#help",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['timelinejs-canvas'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Twitter iframe'),
                spreadsheet_id = x.getAttribute("spreadsheet_id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                lang = x.getAttribute("lang_2_letter"),
                font = x.getAttribute("font"),
                map = x.getAttribute("map"),
                start_at_end = x.getAttribute("start_at_end"),
                hash_bookmark = x.getAttribute("hash_bookmark"),
                start_at_slide = x.getAttribute("start_at_slide"),
                start_zoom = x.getAttribute("start_zoom"),
                url = '//cdn.knightlab.com/libs/timeline/latest/embed/index.html?source=' + spreadsheet_id + '&font=' + font + '&maptype=' + map + '&lang=' + lang + '&start_at_end=' + start_at_end + '&hash_bookmark=' + hash_bookmark + '&start_at_slide=' + start_at_slide + '&start_zoom_adjust=' + start_zoom + '&height=' + height;

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'timelinejs';
        tarteaucitron.fallback(['timelinejs-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// tagcommander
tarteaucitron.services.tagcommander = {
    "key": "tagcommander",
    "type": "api",
    "name": "TagCommander",
    "uri": "https://www.commandersact.com/en/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.tagcommanderid === undefined) {
            return;
        }
        tarteaucitron.addScript('https://cdn.tagcommander.com/' + tarteaucitron.user.tagcommanderid + '.js');
    }
};

// typekit
tarteaucitron.services.typekit = {
    "key": "typekit",
    "type": "api",
    "name": "Typekit (adobe)",
    "uri": "https://www.adobe.com/privacy.html",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.typekitId === undefined) {
            return;
        }
        tarteaucitron.addScript('//use.typekit.net/' + tarteaucitron.user.typekitId + '.js', '', function () {
            try {
                Typekit.load();
            } catch (e) { }
        });
    }
};

// twenga
tarteaucitron.services.twenga = {
    "key": "twenga",
    "type": "ads",
    "name": "Twenga",
    "uri": "http://www.twenga.com/privacy.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.twengaId === undefined || tarteaucitron.user.twengaLocale === undefined) {
            return;
        }

        tarteaucitron.addScript('//tracker.twenga.' + tarteaucitron.user.twengaLocale + '/st/tracker_' + tarteaucitron.user.twengaId + '.js');
    }
};

// twitter
tarteaucitron.services.twitter = {
    "key": "twitter",
    "type": "social",
    "name": "Twitter",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacTwitter'], '');
        tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
    },
    "fallback": function () {
        "use strict";
        var id = 'twitter';
        tarteaucitron.fallback(['tacTwitter'], tarteaucitron.engage(id));
    }
};

// twitter embed
tarteaucitron.services.twitterembed = {
    "key": "twitterembed",
    "type": "social",
    "name": "Twitter (cards)",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            e,
            html;

        tarteaucitron.fallback(['twitterembed-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            html = '<div id="' + uniqId + '" ';
            html += 'tweetid="' + x.getAttribute('tweetid') + '" ';
            html += 'theme="' + x.getAttribute('theme') + '" ';
            html += 'cards="' + x.getAttribute('cards') + '" ';
            html += 'conversation="' + x.getAttribute('conversation') + '" ';
            html += 'data-width="' + x.getAttribute('data-width') + '" ';
            html += 'data-align="' + x.getAttribute('data-align') + '" ';
            html += '></div>';
            return html;
        });

        tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs', function () {
            var i;
            for (i = 0; i < uniqIds.length; i += 1) {
                e = document.getElementById(uniqIds[i]);
                twttr.widgets.createTweet(
                    e.getAttribute('tweetid'),
                    e,
                    {
                        theme: e.getAttribute('theme'),
                        cards: e.getAttribute('cards'),
                        conversation: e.getAttribute('conversation'),
                        lang: tarteaucitron.getLanguage(),
                        dnt: true,
                        width: e.getAttribute('data-width'),
                        align: e.getAttribute('data-align')
                    }
                );
            }
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'twitterembed';
        tarteaucitron.fallback(['twitterembed-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('data-width') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// twitter timeline
tarteaucitron.services.twittertimeline = {
    "key": "twittertimeline",
    "type": "social",
    "name": "Twitter (timelines)",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacTwitterTimelines'], '');
        tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
    },
    "fallback": function () {
        "use strict";
        var id = 'twittertimeline';
        tarteaucitron.fallback(['tacTwitterTimelines'], tarteaucitron.engage(id));
    }
};

// twitter universal website tag
tarteaucitron.services.twitteruwt = {
    "key": "twitteruwt",
    "type": "analytic",
    "name": "Twitter Universal Website Tag",
    "uri": "https://business.twitter.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites.html",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        window.twq = function () {
            window.twq.exe ? window.twq.exe.apply(window.twq, arguments) : window.twq.queue.push(arguments);
        }
        window.twq.version = '1.1';
        window.twq.queue = [];

        tarteaucitron.addScript('https://static.ads-twitter.com/uwt.js', '', function () {
            window.twq('init', tarteaucitron.user.twitteruwtId);
            window.twq('track', 'PageView');
        });
    }
};

// user voice
tarteaucitron.services.uservoice = {
    "key": "uservoice",
    "type": "support",
    "name": "UserVoice",
    "uri": "https://www.uservoice.com/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.userVoiceApi === undefined) {
            return;
        }
        tarteaucitron.addScript('//widget.uservoice.com/' + tarteaucitron.user.userVoiceApi + '.js');
    }
};

// vimeo
tarteaucitron.services.vimeo = {
    "key": "vimeo",
    "type": "video",
    "name": "Vimeo",
    "uri": "https://vimeo.com/privacy",
    "needConsent": true,
    "cookies": ['__utmt_player', '__utma', '__utmb', '__utmc', '__utmv', 'vuid', '__utmz', 'player'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['vimeo_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x, "title") || 'Vimeo iframe'),
                video_width = tarteaucitron.getElemAttr(x, "width"),
                frame_width = 'width=',
                video_height = tarteaucitron.getElemAttr(x, "height"),
                frame_height = 'height=',

                video_id = tarteaucitron.getElemAttr(x, "videoID"),
                video_hash = tarteaucitron.getElemAttr(x, "data-hash") || '',
                video_allowfullscreen = tarteaucitron.getElemAttr(x, "data-allowfullscreen"),

                video_qs = "",
                attrs = ["title", "byline", "portrait", "loop", "autoplay", "autopause", "background", "color", "controls", "maxheight", "maxwidth", "muted", "playsinline", "speed", "transparent"],
                params = attrs.filter(function (a) {
                    return tarteaucitron.getElemAttr(x, a) !== null;
                }).map(function (a) {
                    return a + "=" + tarteaucitron.getElemAttr(x, a);
                }),

                video_frame;

            if (video_id === undefined) {
                return "";
            }

            // query params
            if (video_hash.length > 0) {
                params.push("h=" + video_hash);
            }
            if (params.length > 0) {
                video_qs = "?" + params.join("&");
            }

            // attributes
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height += '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }

            video_frame = '<iframe title="' + frame_title + '" src="//player.vimeo.com/video/' + video_id + video_qs + '" ' + frame_width + frame_height + (video_allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';

            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'vimeo';
        tarteaucitron.fallback(['vimeo_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// visualrevenue
tarteaucitron.services.visualrevenue = {
    "key": "visualrevenue",
    "type": "analytic",
    "name": "VisualRevenue",
    "uri": "http://www.outbrain.com/legal/privacy-713/",
    "needConsent": true,
    "cookies": ['__vrf', '__vrm', '__vrl', '__vry', '__vru', '__vrid', '__vrz'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.visualrevenueId === undefined) {
            return;
        }
        window._vrq = window._vrq || [];
        window._vrq.push(['id', tarteaucitron.user.visualrevenueId]);
        window._vrq.push(['automate', true]);
        window._vrq.push(['track', function () { }]);
        tarteaucitron.addScript('http://a.visualrevenue.com/vrs.js');
    }
};

// verizon dot tag
tarteaucitron.services.verizondottag = {
    "key": "verizondottag",
    "type": "analytic",
    "name": "Verizon Dot Tag",
    "uri": "https://developer.verizonmedia.com/native/guide/audience-management/dottags/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        window.dotq = window.dotq || [];
        window.dotq.push({
            'projectId': tarteaucitron.user.verizondottagProjectId,
            'properties': { 'pixelId': tarteaucitron.user.verizondottagPixelId }
        });

        tarteaucitron.addScript('https://s.yimg.com/wi/ytc.js', '', function () {
            //const items = window.dotq;
            window.dotq = [];
            window.dotq.push = function (item) {
                YAHOO.ywa.I13N.fireBeacon([item])
            };
            YAHOO.ywa.I13N.fireBeacon(items)
        });
    }
};

// vshop
tarteaucitron.services.vshop = {
    "key": "vshop",
    "type": "ads",
    "name": "vShop",
    "uri": "http://vshop.fr/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['vcashW'], '');
        tarteaucitron.addScript('//vshop.fr/js/w.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'vshop';
        tarteaucitron.fallback(['vcashW'], tarteaucitron.engage(id));
    }
};

// wysistat
tarteaucitron.services.wysistat = {
    "key": "wysistat",
    "type": "analytic",
    "name": "Wysistat",
    "uri": "http://wysistat.net/contact/",
    "needConsent": true,
    "cookies": ['Wysistat'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.wysistat === undefined) {
            return;
        }
        tarteaucitron.addScript('//www.wysistat.com/statistique.js', '', function () {
            window.stat(tarteaucitron.user.wysistat.cli, tarteaucitron.user.wysistat.frm, tarteaucitron.user.wysistat.prm, tarteaucitron.user.wysistat.ce, tarteaucitron.user.wysistat.page, tarteaucitron.user.wysistat.roi, tarteaucitron.user.wysistat.prof, tarteaucitron.user.wysistat.cpt);
        });
    }
};

// xiti
tarteaucitron.services.xiti = {
    "key": "xiti",
    "type": "analytic",
    "name": "Xiti",
    "uri": "https://www.atinternet.com/rgpd-et-vie-privee/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.xitiId === undefined) {
            return;
        }
        var Xt_param = 's=' + tarteaucitron.user.xitiId + '&p=',
            Xt_r,
            Xt_h,
            Xt_i,
            Xt_s,
            div = document.createElement('div');
        try {
            Xt_r = top.document.referrer;
        } catch (e) {
            Xt_r = document.referrer;
        }
        Xt_h = new Date();
        Xt_i = '<img style="display:none" border="0" alt="" ';
        Xt_i += 'src="http://logv3.xiti.com/hit.xiti?' + Xt_param;
        Xt_i += '&hl=' + Xt_h.getHours() + 'x' + Xt_h.getMinutes() + 'x' + Xt_h.getSeconds();
        if (parseFloat(navigator.appVersion) >= 4) {
            Xt_s = screen;
            Xt_i += '&r=' + Xt_s.width + 'x' + Xt_s.height + 'x' + Xt_s.pixelDepth + 'x' + Xt_s.colorDepth;
        }

        div.innerHTML = Xt_i + '&ref=' + Xt_r.replace(/[<>"]/g, '').replace(/&/g, '$') + '" title="Internet Audience">';
        document.getElementsByTagName('body')[0].appendChild(div.firstChild);

        if (typeof tarteaucitron.user.xitiMore === 'function') {
            tarteaucitron.user.xitiMore();
        }
    }
};

// AT Internet
tarteaucitron.services.atinternet = {
    "key": "atinternet",
    "type": "analytic",
    "name": "AT Internet (privacy by design)",
    "uri": "https://www.atinternet.com/rgpd-et-vie-privee/",
    "needConsent": true,
    "safeanalytic": false,
    "cookies": ['atidvisitor', 'atreman', 'atredir', 'atsession'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.atLibUrl === undefined) {
            return;
        }

        if (tarteaucitron.user.atinternetAlreadyLoaded !== undefined) {
            return;
        }

        tarteaucitron.addScript(tarteaucitron.user.atLibUrl, '', function () {

            window.tag = new ATInternet.Tracker.Tag();

            if (typeof window.tag.privacy !== 'undefined') {
                window.tag.privacy.setVisitorOptin();
            }

            if (typeof tarteaucitron.user.atMore === 'function') {
                tarteaucitron.user.atMore();
            }

            if (tarteaucitron.user.atinternetSendData !== false) {
                window.tag.page.send();
            }
        });
    },
    "fallback": function () {
        "use strict";
        if (tarteaucitron.user.atLibUrl === undefined) {
            return;
        }

        if (tarteaucitron.user.atNoFallback === true) {
            return;
        }

        tarteaucitron.user.atinternetAlreadyLoaded = true;

        tarteaucitron.addScript(tarteaucitron.user.atLibUrl, '', function () {

            window.tag = new ATInternet.Tracker.Tag();

            if (typeof window.tag.privacy !== 'undefined') {

                var visitorMode = window.tag.privacy.getVisitorMode();
                if (visitorMode !== null && visitorMode.name !== undefined && visitorMode.name == "optout") {
                    window.tag.privacy.setVisitorOptout();
                } else {
                    window.tag.privacy.setVisitorMode('cnil', 'exempt');
                }
            }

            if (typeof tarteaucitron.user.atMore === 'function') {
                tarteaucitron.user.atMore();
            }

            if (tarteaucitron.user.atinternetSendData !== false) {
                window.tag.page.send();
            }
        });
    }
};

// AT Internet
tarteaucitron.services.atinternethightrack = {
    "key": "atinternethightrack",
    "type": "analytic",
    "name": "AT Internet",
    "uri": "https://www.atinternet.com/rgpd-et-vie-privee/",
    "needConsent": true,
    "cookies": ['atidvisitor', 'atreman', 'atredir', 'atsession'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.atLibUrl === undefined) {
            return;
        }

        tarteaucitron.addScript(tarteaucitron.user.atLibUrl, '', function () {

            var tag = new ATInternet.Tracker.Tag();

            if (typeof tarteaucitron.user.atMore === 'function') {
                tarteaucitron.user.atMore();
            }
        })
    }
};

// youtube
tarteaucitron.services.youtube = {
    "key": "youtube",
    "type": "video",
    "name": "YouTube",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['youtube_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x, "title") || 'Youtube iframe'),
                video_id = tarteaucitron.getElemAttr(x, "videoID"),
                srcdoc = tarteaucitron.getElemAttr(x, "srcdoc"),
                loading = tarteaucitron.getElemAttr(x, "loading"),
                video_width = tarteaucitron.getElemAttr(x, "width"),
                frame_width = 'width=',
                video_height = tarteaucitron.getElemAttr(x, "height"),
                frame_height = 'height=',
                video_frame,
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen"),
                attrs = ["theme", "rel", "controls", "showinfo", "autoplay", "mute", "start", "loop", "enablejsapi"],
                params = attrs.filter(function (a) {
                    return tarteaucitron.getElemAttr(x, a) !== null;
                }).map(function (a) {
                    return a + "=" + tarteaucitron.getElemAttr(x, a);
               }).join("&");

            if(tarteaucitron.getElemAttr(x, "loop") == 1) {
               params = params + "&playlist=" + video_id;
            }

            if (video_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height += '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }

            if (srcdoc !== undefined && srcdoc !== null && srcdoc !== "") {
                srcdoc = 'srcdoc="' + srcdoc + '" ';
            } else {
                srcdoc = '';
            }

            if (loading !== undefined && loading !== null && loading !== "") {
                loading = 'loading ';
            } else {
                loading = '';
            }

            video_frame = '<iframe title="' + frame_title + '" type="text/html" ' + frame_width + frame_height + ' src="//www.youtube-nocookie.com/embed/' + video_id + '?' + params + '"' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + ' ' + srcdoc + ' ' + loading + '></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'youtube';
        tarteaucitron.fallback(['youtube_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// youtube playlist
tarteaucitron.services.youtubeplaylist = {
    "key": "youtubeplaylist",
    "type": "video",
    "name": "YouTube (playlist)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['youtube_playlist_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x, "title") || 'Youtube iframe'),
                playlist_id = tarteaucitron.getElemAttr(x, "playlistID"),
                video_width = tarteaucitron.getElemAttr(x, "width"),
                frame_width = 'width=',
                video_height = tarteaucitron.getElemAttr(x, "height"),
                frame_height = 'height=',
                video_frame,
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen"),
                params = 'theme=' + tarteaucitron.getElemAttr(x, "theme") + '&rel=' + tarteaucitron.getElemAttr(x, "rel") + '&controls=' + tarteaucitron.getElemAttr(x, "controls") + '&showinfo=' + tarteaucitron.getElemAttr(x, "showinfo") + '&autoplay=' + tarteaucitron.getElemAttr(x, "autoplay") + '&mute=' + tarteaucitron.getElemAttr(x, "mute");

            if (playlist_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height += '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }
            video_frame = '<iframe title="' + frame_title + '" type="text/html" ' + frame_width + frame_height + ' src="//www.youtube-nocookie.com/embed/videoseries?list=' + playlist_id + '&' + params + '"' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'youtubeplaylist';
        tarteaucitron.fallback(['youtube_playlist_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// zopim
tarteaucitron.services.zopim = {
    "key": "zopim",
    "type": "support",
    "name": "Zopim",
    "uri": "https://www.zopim.com/privacy",
    "needConsent": true,
    "cookies": ['__zlcid', '__zprivacy'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.zopimID === undefined) {
            return;
        }
        tarteaucitron.addScript('//v2.zopim.com/?' + tarteaucitron.user.zopimID);
    }
};

// kameleoon
tarteaucitron.services.kameleoon = {
    "key": "kameleoon",
    "type": "analytic",
    "name": "Kameleoon",
    "uri": "https://www.kameleoon.com/fr/compliance/rgpd",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.kameleoon !== undefined) {
            tarteaucitron.addScript("https://" + tarteaucitron.user.kameleoon + ".kameleoon.eu/kameleoon.js");
        }
    }
};

// linkedin insight
tarteaucitron.services.linkedininsighttag = {
    "key": "linkedininsighttag",
    "type": "ads",
    "name": "Linkedin Insight",
    "uri": "https://www.linkedin.com/legal/cookie_policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.linkedininsighttag !== undefined) {
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(tarteaucitron.user.linkedininsighttag);
        }

        tarteaucitron.addScript('https://snap.licdn.com/li.lms-analytics/insight.min.js');
    }
};

// xiti smartTag
tarteaucitron.services.xiti_smarttag = {
    "key": "xiti_smarttag",
    "type": "analytic",
    "name": "Xiti (SmartTag)",
    "uri": "https://www.atinternet.com/rgpd-et-vie-privee/",
    "needConsent": true,
    "cookies": ["atidvisitor", "atreman", "atredir", "atsession", "attvtreman", "attvtsession"],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.xiti_smarttagLocalPath !== undefined) {
            tarteaucitron.addScript(tarteaucitron.user.xiti_smarttagLocalPath, 'smarttag', null, null, "onload", "addTracker();");
        } else {
            var xitiSmarttagId = tarteaucitron.user.xiti_smarttagSiteId;
            if (xitiSmarttagId === undefined) {
                return;
            }

            tarteaucitron.addScript('//tag.aticdn.net/' + xitiSmarttagId + '/smarttag.js', 'smarttag', null, null, "onload", "addTracker();");
        }
    }
};

// facebook pixel
tarteaucitron.services.facebookpixel = {
    "key": "facebookpixel",
    "type": "ads",
    "name": "Facebook Pixel",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": ['datr', 'fr', 'reg_ext_ref', 'reg_fb_gate', 'reg_fb_ref', 'sb', 'wd', 'x-src', '_fbp'],
    "js": function () {
        "use strict";
        var n;
        if (window.fbq) return;
        n = window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
        if (!window._fbq) window._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        tarteaucitron.addScript('https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', tarteaucitron.user.facebookpixelId);
        fbq('track', 'PageView');

        if (typeof tarteaucitron.user.facebookpixelMore === 'function') {
            tarteaucitron.user.facebookpixelMore();
        }
    }
};

//Issuu
tarteaucitron.services.issuu = {
    "key": "issuu",
    "type": "other",
    "name": "Issuu",
    "uri": "https://issuu.com/legal/privacy",
    "needConsent": true,
    "cookies": ['__qca', 'iutk', 'mc'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['issuu_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Issuu iframe'),
                issuu_id = x.getAttribute("issuuID"),
                issuu_width = x.getAttribute("width"),
                frame_width = 'width=',
                issuu_height = x.getAttribute("height"),
                frame_height = 'height=',
                issuu_frame,
                issuu_embed;

            if (issuu_id === undefined) {
                return "";
            }
            if (issuu_width !== undefined) {
                frame_width += '"' + issuu_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (issuu_height !== undefined) {
                frame_height += '"' + issuu_height + '" ';
            } else {
                frame_height += '"" ';
            }


            if (issuu_id.match(/\d+\/\d+/)) { issuu_embed = '#' + issuu_id; } else if (issuu_id.match(/d=(.*)&u=(.*)/)) { issuu_embed = '?' + issuu_id; }


            issuu_frame = '<iframe title="' + frame_title + '" type="text/html" ' + frame_width + frame_height + ' src="//e.issuu.com/embed.html' + issuu_embed + '"></iframe>';

            return issuu_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'issuu';
        tarteaucitron.fallback(['issuu_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// webmecanik
tarteaucitron.services.webmecanik = {
    "key": "webmecanik",
    "type": "analytic",
    "name": "Webmecanik",
    "uri": "https://webmecanik.com/tos",
    "needConsent": true,
    "cookies": ['mtc_id', 'mtc_sid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.webmecanikurl === undefined) {
            return;
        }

        window.MauticTrackingObject = 'mt';
        window.mt = window.mt || function () {
            window.mt.q = window.mt.q || [];
            window.mt.q.push(arguments);
        };

        tarteaucitron.addScript(tarteaucitron.user.webmecanikurl, '', function () {
            mt('send', 'pageview');
        });
    }
};

// google analytics multiple
tarteaucitron.services.multiplegtag = {
    "key": "multiplegtag",
    "type": "analytic",
    "name": "Google Analytics (gtag.js)",
    "uri": "https://support.google.com/analytics/answer/6004245",
    "needConsent": true,
    "cookies": (function () {

        var cookies = ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', '_gcl_au'];

        if (tarteaucitron.user.multiplegtagUa !== undefined) {
            tarteaucitron.user.multiplegtagUa.forEach(function (ua) {
                cookies.push('_gat_gtag_' + ua.replace(/-/g, '_'));
                cookies.push('_ga_' + ua.replace(/G-/g, ''));
            });
        }

        return cookies;
    })(),
    "js": function () {
        "use strict";
        window.dataLayer = window.dataLayer || [];

        if (tarteaucitron.user.multiplegtagUa !== undefined) {
            tarteaucitron.user.multiplegtagUa.forEach(function (ua) {
                tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + ua, '', function () {
                    window.gtag = function gtag() { dataLayer.push(arguments); }
                    gtag('js', new Date());
                    var additional_config_info = (timeExpire !== undefined) ? {'anonymize_ip': true, 'cookie_expires': timeExpire / 1000} : {'anonymize_ip': true};
                    gtag('config', ua, additional_config_info);
                });
            });
        }
    }
};

// Koban
tarteaucitron.services.koban = {
    "key": "koban",
    "type": "analytic",
    "name": "Koban",
    "uri": "https://koban.cloud/tos",
    "needConsent": true,
    "cookies": ['kbntrk'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.kobanurl === undefined) {
            return;
        }
        if (tarteaucitron.user.kobanapi === undefined) {
            return;
        }
        window.KobanObject = 'kb';
        window.kb = window.kb || function () {
            window.kb.q = window.kb.q || [];
            window.kb.q.push(arguments);
        };
        window.kb.l = new Date();
        kb('reg', tarteaucitron.user.kobanapi);
        tarteaucitron.addScript(tarteaucitron.user.kobanurl, '', function () {
        });
    }
};

// matomo

/*
    1. Set the following variable before the initialization :

    tarteaucitron.user.matomoId = YOUR_SITE_ID_FROM_MATOMO;
    tarteaucitron.user.matomoHost = "YOUR_MATOMO_URL"; //eg: https://stat.mydomain.com/

    2. Push the service :

    (tarteaucitron.job = tarteaucitron.job || []).push('matomo');  // (or 'matomocloud' for cloud version)

    3. HTML
    You don't need to add any html code, if the service is authorized, the javascript is added. otherwise no.
 */
tarteaucitron.services.matomo = {
    "key": "matomo",
    "type": "analytic",
    "name": "Matomo (privacy by design)",
    "uri": "https://matomo.org/faq/general/faq_146/",
    "needConsent": false,
    "cookies": ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'piwik_ignore', '_pk_uid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.matomoId === undefined) {
            return;
        }

        window._paq = window._paq || [];
        window._paq.push(["setSiteId", tarteaucitron.user.matomoId]);
        window._paq.push(["setTrackerUrl", tarteaucitron.user.matomoHost + "piwik.php"]);
        window._paq.push(["setDoNotTrack", 1]);
        window._paq.push(["trackPageView"]);
        window._paq.push(["setIgnoreClasses", ["no-tracking", "colorbox"]]);
        window._paq.push(["enableLinkTracking"]);
        window._paq.push([function () {
            var self = this;
            function getOriginalVisitorCookieTimeout() {
                var now = new Date(),
                    nowTs = Math.round(now.getTime() / 1000),
                    visitorInfo = self.getVisitorInfo();
                var createTs = parseInt(visitorInfo[2]);
                var cookieTimeout = 33696000; // 13 mois en secondes
                var originalTimeout = createTs + cookieTimeout - nowTs;
                return originalTimeout;
            }
            this.setVisitorCookieTimeout(getOriginalVisitorCookieTimeout());
        }]);

        tarteaucitron.addScript(tarteaucitron.user.matomoHost + 'piwik.js', '', '', true, 'defer', true);

        // waiting for piwik to be ready to check first party cookies
        var interval = setInterval(function () {
            if (typeof Piwik === 'undefined') return

            clearInterval(interval)

            // make piwik/matomo cookie accessible by getting tracker
            Piwik.getTracker();

            // looping throught cookies
            var theCookies = document.cookie.split(';');
            for (var i = 1; i <= theCookies.length; i++) {
                var cookie = theCookies[i - 1].split('=');
                var cookieName = cookie[0].trim();

                // if cookie starts like a piwik one, register it
                if (cookieName.indexOf('_pk_') === 0) {
                    tarteaucitron.services.matomo.cookies.push(cookieName);
                }
            }
        }, 100)
    }
};


tarteaucitron.services.matomohightrack = {
    "key": "matomohightrack",
    "type": "analytic",
    "name": "Matomo",
    "uri": "https://matomo.org/faq/general/faq_146/",
    "needConsent": false,
    "cookies": ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'piwik_ignore', '_pk_uid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.matomoId === undefined) {
            return;
        }

        window._paq = window._paq || [];
        window._paq.push(["setSiteId", tarteaucitron.user.matomoId]);
        window._paq.push(["setTrackerUrl", tarteaucitron.user.matomoHost + "piwik.php"]);
        window._paq.push(["trackPageView"]);
        window._paq.push(["setIgnoreClasses", ["no-tracking", "colorbox"]]);
        window._paq.push(["enableLinkTracking"]);
        window._paq.push([function () {
            var self = this;
        }]);

        tarteaucitron.addScript(tarteaucitron.user.matomoHost + 'piwik.js', '', '', true, 'defer', true);

        // waiting for piwik to be ready to check first party cookies
        var interval = setInterval(function () {
            if (typeof Piwik === 'undefined') return

            clearInterval(interval)
            Piwik.getTracker();

            var theCookies = document.cookie.split(';');
            for (var i = 1; i <= theCookies.length; i++) {
                var cookie = theCookies[i - 1].split('=');
                var cookieName = cookie[0].trim();

                if (cookieName.indexOf('_pk_') === 0) {
                    tarteaucitron.services.matomo.cookies.push(cookieName);
                }
            }
        }, 100)
    }
};


tarteaucitron.services.matomocloud = {
    "key": "matomocloud",
    "type": "analytic",
    "name": "Matomo Cloud (privacy by design)",
    "uri": "https://matomo.org/faq/general/faq_146/",
    "needConsent": false,
    "cookies": ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'mtm_consent', 'matomo_ignore', 'matomo_sessid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.matomoId === undefined) {
            return;
        }

        window._paq = window._paq || [];
        window._paq.push(["setSiteId", tarteaucitron.user.matomoId]);
        window._paq.push(["setTrackerUrl", tarteaucitron.user.matomoHost + "matomo.php"]);
        window._paq.push(["setDoNotTrack", 1]);
        window._paq.push(["trackPageView"]);
        window._paq.push(["setIgnoreClasses", ["no-tracking", "colorbox"]]);
        window._paq.push(["enableLinkTracking"]);
        window._paq.push([function () {
            var self = this;
            function getOriginalVisitorCookieTimeout() {
                var now = new Date(),
                    nowTs = Math.round(now.getTime() / 1000),
                    visitorInfo = self.getVisitorInfo();
                var createTs = parseInt(visitorInfo[2]);
                var cookieTimeout = 33696000; // 13 mois en secondes
                var originalTimeout = createTs + cookieTimeout - nowTs;
                return originalTimeout;
            }
            this.setVisitorCookieTimeout(getOriginalVisitorCookieTimeout());
        }]);

        if (tarteaucitron.user.matomoCustomJSPath === undefined) {
            tarteaucitron.addScript('https://cdn.matomo.cloud/matomo.js', '', '', true, 'defer', true);
        } else {
            tarteaucitron.addScript(tarteaucitron.user.matomoCustomJSPath, '', '', true, 'defer', true);
        }

        // waiting for Matomo to be ready to check first party cookies
        var interval = setInterval(function () {
            if (typeof Matomo === 'undefined') return

            clearInterval(interval)

            // make Matomo cookie accessible by getting tracker
            Matomo.getTracker();

            // looping through cookies
            var theCookies = document.cookie.split(';');
            for (var i = 1; i <= theCookies.length; i++) {
                var cookie = theCookies[i - 1].split('=');
                var cookieName = cookie[0].trim();

                // if cookie starts like a matomo one, register it
                if (cookieName.indexOf('_pk_') === 0) {
                    tarteaucitron.services.matomo.cookies.push(cookieName);
                }
            }
        }, 100)
    }
};

// matomotm
tarteaucitron.services.matomotm = {
    "key": "matomotm",
    "type": "api",
    "name": "Matomo Tag Manager",
    "uri": "https://matomo.org/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.matomotmUrl === undefined) {
            return;
        }

        var _mtm = window._mtm = window._mtm || [];
        _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});

        tarteaucitron.addScript(tarteaucitron.user.matomotmUrl);
    }
};


// Hotjar
/*
   1. Set the following variable before the initialization :
    tarteaucitron.user.hotjarId = YOUR_WEBSITE_ID;
   tarteaucitron.user.HotjarSv = XXXX; // Can be found in your website tracking code as "hjvs=XXXX"
    2. Push the service :
    (tarteaucitron.job = tarteaucitron.job || []).push('hotjar');
    3. HTML
   You don't need to add any html code, if the service is autorized, the javascript is added. otherwise no.
 */
tarteaucitron.services.hotjar = {
    "key": "hotjar",
    "type": "analytic",
    "name": "Hotjar",
    "uri": "https://help.hotjar.com/hc/en-us/categories/115001323967-About-Hotjar",
    "needConsent": true,
    "cookies": ["hjClosedSurveyInvites", "_hjDonePolls", "_hjMinimizedPolls", "_hjDoneTestersWidgets", "_hjMinimizedTestersWidgets", "_hjDoneSurveys", "_hjIncludedInSample", "_hjShownFeedbackMessage", "_hjAbsoluteSessionInProgress", "_hjIncludeInPageviewSample", "_hjid"],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.hotjarId === undefined || tarteaucitron.user.HotjarSv === undefined) {
            return;
        }
        window.hj = window.hj || function () {
            (window.hj.q = window.hj.q || []).push(arguments)
        };
        window._hjSettings = {
            hjid: tarteaucitron.user.hotjarId,
            hjsv: tarteaucitron.user.HotjarSv
        };
        var uri = 'https://static.hotjar.com/c/hotjar-';
        var extension = '.js?sv=';
        tarteaucitron.addScript(uri + window._hjSettings.hjid + extension + window._hjSettings.hjsv);
    }
};

// bing ads universal event tracking
tarteaucitron.services.bingads = {
    'key': 'bingads',
    'type': 'ads',
    'name': 'Bing Ads Universal Event Tracking',
    'uri': 'https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads',
    'needConsent': true,
    'cookies': ['_uetmsclkid', '_uetvid', '_uetsid'],
    'js': function () {
        'use strict';
        //var u = tarteaucitron.user.bingadsTag || 'uetq';
        window.uetq = window.uetq || [];

        tarteaucitron.addScript('https://bat.bing.com/bat.js', '', function () {
            var bingadsCreate = { ti: tarteaucitron.user.bingadsID };

            if ('bingadsStoreCookies' in tarteaucitron.user) {
                bingadsCreate['storeConvTrackCookies'] = tarteaucitron.user.bingadsStoreCookies;
            }

            bingadsCreate.q = window.uetq;
            window.uetq = new UET(bingadsCreate);
            window.uetq.push('pageLoad');

            if (typeof tarteaucitron.user.bingadsMore === 'function') {
                tarteaucitron.user.bingadsMore();
            }
        });
    }
};

//Matterport
tarteaucitron.services.matterport = {
    "key": "matterport",
    "type": "other",
    "name": "Matterport",
    "uri": "https://matterport.com/es/legal/privacy-policy/",
    "needConsent": true,
    "cookies": ['__cfduid', 'ajs_anonymous_id', 'ajs_group_id', 'ajs_user_id'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['matterport'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Matterport iframe'),
                matterport_id = x.getAttribute("matterportID"),
                matterport_width = x.getAttribute("width"),
                frame_width = 'width=',
                matterport_height = x.getAttribute("height"),
                frame_height = 'height=',
                matterport_parameters = x.getAttribute("parameters"),
                matterport_allowfullscreen = x.getAttribute('allowfullscreen'),
                matterport_frame;

            if (matterport_id === undefined) {
                return "";
            }
            if (matterport_width !== undefined) {
                frame_width += '"' + matterport_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (matterport_height !== undefined) {
                frame_height += '"' + matterport_height + '" ';
            } else {
                frame_height += '"" ';
            }
            if (matterport_parameters === undefined) {
                return "";
            }

            matterport_frame = '<iframe title="' + frame_title + '" type="text/html" ' + frame_width + frame_height + ' src="https://my.matterport.com/show/?m=' + matterport_id + '&utm_source=hit-content' + matterport_parameters + '"' + (matterport_allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return matterport_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'matterport';
        tarteaucitron.fallback(['matterport'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// Adform
tarteaucitron.services.adform = {
    "key": "adform",
    "type": "ads",
    "name": "Adform",
    "uri": "https://site.adform.com/privacy-center/overview/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.adformpm === undefined || tarteaucitron.user.adformpagename === undefined) {
            return;
        }

        window._adftrack = {
            pm: tarteaucitron.user.adformpm,
            divider: encodeURIComponent('|'),
            pagename: encodeURIComponent(tarteaucitron.user.adformpagename)
        };

        tarteaucitron.addScript("https://track.adform.net/serving/scripts/trackpoint/async/");
    }
};

// Active Campaign
tarteaucitron.services.activecampaign = {
    "key": "activecampaign",
    "type": "ads",
    "name": "Active Campaign",
    "uri": "https://www.activecampaign.com/privacy-policy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.actid === undefined) {
            return;
        }

        window.trackcmp_email = '';

        tarteaucitron.addScript('https://trackcmp.net/visit?actid=' + tarteaucitron.user.actid + '&e=' + encodeURIComponent(trackcmp_email) + '&r=' + encodeURIComponent(document.referrer) + '&u=' + encodeURIComponent(window.location.href));
    }
};

// tawk.to
tarteaucitron.services.tawkto = {
    "key": "tawkto",
    "type": "support",
    "name": "Tawk.to chat",
    "uri": "https://www.tawk.to/data-protection/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.tawktoId === undefined) {
            return;
        }

        tarteaucitron.user.tawktoWidgetId = tarteaucitron.user.tawktoWidgetId || 'default';

        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        tarteaucitron.addScript('https://embed.tawk.to/' + tarteaucitron.user.tawktoId + '/' + tarteaucitron.user.tawktoWidgetId);
    }

};

// getquanty
tarteaucitron.services.getquanty = {
    "key": "getquanty",
    "type": "analytic",
    "name": "GetQuanty",
    "uri": "https://www.getquanty.com/mentions-legales/",
    "needConsent": true,
    "cookies": ['_first_pageview', 'eqy_sessionid', 'eqy_siteid', 'cluid', 'eqy_company', 'cluid', 'gq_utm', '_jsuid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.getguanty === undefined) {
            return;
        }

        if (tarteaucitron.user.getquantyAlreadyLoaded !== undefined) {
            return;
        }

        tarteaucitron.addScript('https://get.smart-data-systems.com/gq?site_id=' + tarteaucitron.user.getguanty + '&consent=1');
    },
    "fallback": function () {
        "use strict";
        if (tarteaucitron.user.getguanty === undefined) {
            return;
        }

        tarteaucitron.user.getquantyAlreadyLoaded = true;

        tarteaucitron.addScript('https://get.smart-data-systems.com/gq?site_id=' + tarteaucitron.user.getguanty + '&notrack=1');
    }
};

// emolytics
tarteaucitron.services.emolytics = {
    "key": "emolytics",
    "type": "analytic",
    "name": "Emolytics",
    "uri": "https://www.emolytics.com/main/privacy-policy.php",
    "needConsent": true,
    "cookies": ['__hssc', '__hssrc', '__hstc', '_ga', '_gid', 'hubspotutk', 'lang', 'incap_ses_', 'nlbi_', 'visid_incap_'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.emolyticsID === undefined) {
            return;
        }
        var scriptEmolytics = document.createElement('script');
        scriptEmolytics.text = 'var getsmily_id="' + tarteaucitron.user.emolyticsID + '";';
        document.getElementsByTagName('body')[0].appendChild(scriptEmolytics);
        tarteaucitron.addScript('https://cdn.emolytics.com/script/emolytics-widget.js')
    }
};

// youtubeapi
tarteaucitron.services.youtubeapi = {
    "key": "youtubeapi",
    "type": "video",
    "name": "Youtube (Js API)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://www.youtube.com/player_api');
    }
};

// Facil'ITI
tarteaucitron.services.faciliti = {
    "key": "faciliti",
    "type": "other",
    "name": "Facil'ITI",
    "uri": "https://ws.facil-iti.com/mentions-legales.html",
    "needConsent": true,
    "cookies": ['FACIL_ITI_LS'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.facilitiID === undefined) {
            return;
        }

        (function (w, d, s, f) {
            w[f] = w[f] || { conf: function () { (w[f].data = w[f].data || []).push(arguments); } };
            var l = d.createElement(s), e = d.getElementsByTagName(s)[0];
            l.async = 1; l.src = 'https://ws.facil-iti.com/tag/faciliti-tag.min.js'; e.parentNode.insertBefore(l, e);
        }(window, document, 'script', 'FACIL_ITI'));
        FACIL_ITI.conf('userId', tarteaucitron.user.facilitiID);
    }
};

// userlike
tarteaucitron.services.userlike = {
    "key": "userlike",
    "type": "support",
    "name": "Userlike",
    "uri": "https://www.userlike.com/en/terms#privacy-policy",
    "needConsent": true,
    "cookies": ['uslk_s', 'uslk_e'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.userlikeKey === undefined) {
            return;
        }
        tarteaucitron.addScript('//userlike-cdn-widgets.s3-eu-west-1.amazonaws.com/' + tarteaucitron.user.userlikeKey);
    }
};

// adobeanalytics
tarteaucitron.services.adobeanalytics = {
    "key": "adobeanalytics",
    "type": "analytic",
    "name": "Adobe Analytics",
    "uri": "https://www.adobe.com/privacy/policy.html",
    "needConsent": true,
    "cookies": ['s_ecid', 's_cc', 's_sq', 's_vi', 's_fid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.adobeanalyticskey === undefined) {
            return;
        }
        tarteaucitron.addScript('//assets.adobedtm.com/launch-' + tarteaucitron.user.adobeanalyticskey + '.min.js');
    }
};

// woopra customer journey analytics
tarteaucitron.services.woopra = {
    'key': 'woopra',
    'type': 'analytic',
    'name': 'Woopra Customer Journey Analytics',
    'uri': 'https://www.woopra.com/privacy',
    'needConsent': true,
    'cookies': ['wooTracker', 'intercom-session-erbfalba', 'intercom-id-erbfalba'],
    'js': function () {
        'use strict';
        //var w = tarteaucitron.user.woopraDomain;
        //window[w] = window[w] || [];

        (function () {
            var t, i, e, n = window, o = document, a = arguments, s = "script", r = ["config", "track", "identify", "visit", "push", "call", "trackForm", "trackClick"], c = function () { var t, i = this; for (i._e = [], t = 0; r.length > t; t++)(function (t) { i[t] = function () { return i._e.push([t].concat(Array.prototype.slice.call(arguments, 0))), i } })(r[t]) }; for (n._w = n._w || {}, t = 0; a.length > t; t++)n._w[a[t]] = n[a[t]] = n[a[t]] || new c; i = o.createElement(s), i.async = 1, i.src = "//static.woopra.com/js/w.js", e = o.getElementsByTagName(s)[0], e.parentNode.insertBefore(i, e)
        })("woopra");

        woopra.config({
            domain: tarteaucitron.user.woopraDomain
        });
        woopra.track();
    }
};

// ausha
tarteaucitron.services.ausha = {
    key: "ausha",
    type: "video",
    name: "Ausha",
    uri: "https://www.ausha.co/protection-personal-data/",
    needConsent: true,
    cookies: [],
    js: function () {
        "use strict";
        tarteaucitron.fallback(['ausha_player'], function (x) {
            var player_height = x.getAttribute('data-height'),
                podcast_id = x.getAttribute('data-podcast-id'),
                player_id = x.getAttribute('data-player-id'),
                playlist = x.getAttribute('data-playlist'),
                useshowid = x.getAttribute('data-useshowid'),
                color = x.getAttribute('data-color');

            if (podcast_id === undefined) {
                return "";
            }

            var src = 'https://player.ausha.co/index.html?podcastId=' + podcast_id + '&v=3';

            if (useshowid == "1") {
                src = 'https://player.ausha.co/index.html?showId=' + podcast_id + '&v=3';
            }

            if (playlist && playlist.length > 0) src += '&playlist=' + playlist;
            if (color && color.length > 0) src += '&color=' + color.replace('#', '%23');
            if (player_id && player_id.length > 0) src += '&playerId=' + player_id;

            return '<iframe id="' + player_id + '" loading="lazy" width="100%" height="' + player_height + '" scrolling="no" frameborder="no" src="' + src + '"></iframe>';
        });

        tarteaucitron.addScript('//player.ausha.co/ausha-player.js', 'ausha-player');
    },
    fallback: function () {
        "use strict";
        tarteaucitron.fallback(['ausha_player'], function (elem) {
            elem.style.height = elem.getAttribute('data-height') + 'px';
            return tarteaucitron.engage('ausha');
        });
    }
};

// visiblee
tarteaucitron.services.visiblee = {
    key: "visiblee",
    type: "analytic",
    name: "Visiblee",
    uri: "http://confidentiality.visiblee.io/fr/confidentialite",
    needConsent: true,
    cookies: ["visitor_v2", tarteaucitron.user.visibleedomain, "check", "campaign_ref_" + tarteaucitron.user.visibleedomain, "reload_" + tarteaucitron.user.visibleedomain],
    js: function () {
        "use strict";

        if (tarteaucitron.user.visibleeclientid === undefined) {
            return;
        }
        tarteaucitron.addScript('//www.link-page.info/tracking_' + tarteaucitron.user.visibleeclientid + '.js', 'visiblee');
    }
};

// bandcamp
tarteaucitron.services.bandcamp = {
    key: "bandcamp",
    type: "video",
    name: "Bandcamp",
    uri: "https://bandcamp.com",
    readmoreLink: "https://bandcamp.com/privacy",
    needConsent: true,
    cookies: ['client_id', 'BACKENDID', '_comm_playlist'],
    js: function () {
        "use strict";
        tarteaucitron.fallback(['bandcamp_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Bandcamp iframe'),
                album_id = x.getAttribute("albumID"),
                bandcamp_width = x.getAttribute("width"),
                frame_width = 'width=',
                bandcamp_height = x.getAttribute("height"),
                frame_height = 'height=',
                attrs = ["size", "bgcol", "linkcol", "artwork", "minimal", "tracklist", "package", "transparent"],
                params = attrs.filter(function (a) {
                    return x.getAttribute(a) !== null;
                }).map(function (a) {
                    if (a && a.length > 0) return a + "=" + x.getAttribute(a);
                }).join("/");

            if (album_id === null) {
                return "";
            }

            if (bandcamp_width !== null || bandcamp_width !== "") {
                frame_width += '"' + bandcamp_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (bandcamp_height !== null || bandcamp_height !== "") {
                frame_height += '"' + bandcamp_height + '" ';
            } else {
                frame_height += '"" ';
            }

            var src = 'https://bandcamp.com/EmbeddedPlayer/album=' + album_id + '/' + params;

            return '<iframe title="' + frame_title + '"' + frame_width + frame_height + 'src="' + src + '" frameborder="0" allowfullscreen seamless></iframe>';
        });
    },
    fallback: function () {
        "use strict";
        tarteaucitron.fallback(['bandcamp_player'], function (elem) {
            elem.style.width = elem.getAttribute('width');
            elem.style.height = elem.getAttribute('height');
            return tarteaucitron.engage('bandcamp');
        });
    }
};

// Discord Widget
tarteaucitron.services.discord = {
    "key": "discord",
    "type": "social",
    "name": "Discord (Server Widget)",
    "needConsent": true,
    "cookies": ["__cfruid", "__dcfduid", "_ga", "_gcl_au", "OptanonConsent", "locale", "_gid"],
    "uri": "https://discord.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['discord_widget'], function (x) {
            var id = x.getAttribute("guildID"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height")
            var widgetURL = "https://discord.com/widget?id=" + id;
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"" + widgetURL + "\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'discord';
        tarteaucitron.fallback(['discord_widget'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// Google Maps
tarteaucitron.services.maps_noapi = {
    "key": "maps_noapi",
    "type": "other",
    "name": "Google Maps",
    "needConsent": true,
    "cookies": ["NID", "OGPC", "1P_JAR", "CONSENT"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['googlemaps_embed'], function (x) {
            var id = x.getAttribute("id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height")
            var widgetURL = "https://google.com/maps/embed?pb=" + id;
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"" + widgetURL + "\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'maps_noapi';
        tarteaucitron.fallback(['googlemaps_embed'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// hCaptcha
tarteaucitron.services.hcaptcha = {
    "key": "hcaptcha",
    "type": "other",
    "name": "hCaptcha",
    "needConsent": true,
    "cookies": [],
    "uri": "https://www.hcaptcha.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(["h-captcha"], '');
        tarteaucitron.addScript("https://hcaptcha.com/1/api.js", "hcaptcha")
    },
    "fallback": function () {
        "use strict";
        var id = "hcaptcha";
        tarteaucitron.fallback(["h-captcha"], tarteaucitron.engage(id));
    }
};

// France Culture
tarteaucitron.services.fculture = {
    "key": "fculture",
    "type": "video",
    "name": "France Culture",
    "needConsent": true,
    "cookies": ["_gid", "didomi_token", "outbrain_cid_fetch", "xtvrn", "xtant", "YSC", "ABTasty", "xtan", "ABTastySession", "xtidc", "_ga", "VISITOR_INFO1_LIVE", "euconsent-v2", "v1st", "dmvk", "ts", "VISITOR_INFO1_LIVE", "YSC"],
    "uri": "https://www.radiofrance.com/politique-d-utilisation-des-cookies-sur-les-sites-internet-du-groupe-radio-france",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['fculture_embed'], function (x) {
            var id = x.getAttribute('id'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height');
            return "<iframe src=\"https://www.franceculture.fr/player/export-reecouter?content=" + id + "\" height=\"" + height + "\" width=\"" + width + "\"></iframe>"
        });
    },
    "fallback": function () {
        "use strict";
        var id = "fculture";
        tarteaucitron.fallback(["fculture_embed"], tarteaucitron.engage(id));
    }
};

// Acast
tarteaucitron.services.acast = {
    "key": "acast",
    "type": "video",
    "name": "Acast",
    "needConsent": true,
    "cookies": ["intercom-id-ayi0335i", "intercom-session-ayi0335i"],
    "uri": "https://www.acast.com/en/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['acast_embed'], function (x) {
            var id = x.getAttribute('id1'),
                id2 = x.getAttribute('id2'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height'),
                seek = x.getAttribute('seek');
            var widgetURL = "https://embed.acast.com/" + id + "/" + id2 + "?seek=" + seek;
            return "<iframe title=\"Embed Player\" width=\"" + width + "\" height=\"" + height + "\" src=\"" + widgetURL + "\" scrolling=\"no\" frameBorder=\"0\" style=\"border: none; overflow: hidden;\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "acast";
        tarteaucitron.fallback(["acast_embed"], tarteaucitron.engage(id));
    }
};

// Mixcloud
tarteaucitron.services.mixcloud = {
    "key": "mixcloud",
    "type": "video",
    "name": "Mixcloud",
    "needConsent": true,
    "cookies": ["UID", "_gat", "__stripe_mid", "_gid", "_ga", "c", "csrftoken", "__stripe_sid", "mx_t"],
    "uri": "https://www.mixcloud.com/privacy/",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['mixcloud_embed'], function (x) {
            var id = x.getAttribute('id'),
                hidecover = x.getAttribute('hidecover'),
                mini = x.getAttribute('mini'),
                light = x.getAttribute('light'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height');
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"https://www.mixcloud.com/widget/iframe/?hide_cover=" + hidecover + "&mini=" + mini + "&light=" + light + "&feed=" + id + "\" frameborder=\"0\" ></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "mixcloud";
        tarteaucitron.fallback(["mixcloud_embed"], tarteaucitron.engage(id));
    }
};

// Google Agenda
tarteaucitron.services.gagenda = {
    "key": "gagenda",
    "type": "other",
    "name": "Google Agenda",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gagenda_embed'], function (x) {
            var calendar_data = x.getAttribute('data'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height');
            return "<iframe loarding=\"lazy\" width=\"" + width + "\" height=\"" + height + "\" src=\"https://www.google.com/calendar/embed?" + calendar_data + "\" frameborder=\"0\" scrolling=\"no\" style=\"border-width:0\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gagenda";
        tarteaucitron.fallback(["gagenda_embed"], tarteaucitron.engage(id));
    }
};

// Google Docs
tarteaucitron.services.gdocs = {
    "key": "gdocs",
    "type": "other",
    "name": "Google Docs",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gdocs_embed'], function (x) {
            var id = x.getAttribute('id'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height');
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"https://docs.google.com/document/d/e/" + id + "/pub?embedded=true\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gdocs";
        tarteaucitron.fallback(["gdocs_embed"], tarteaucitron.engage(id));
    }
};

// Google Sheets
tarteaucitron.services.gsheets = {
    "key": "gsheets",
    "type": "other",
    "name": "Google Sheets",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gsheets_embed'], function (x) {
            var id = x.getAttribute('id'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height'),
                headers = x.getAttribute('headers');
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"https://docs.google.com/spreadsheets/d/e/" + id + "/pubhtml?widget=true&amp;headers=" + headers + "\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gsheets";
        tarteaucitron.fallback(["gsheets_embed"], tarteaucitron.engage(id));
    }
};

// Google Slides
tarteaucitron.services.gslides = {
    "key": "gslides",
    "type": "other",
    "name": "Google Slides",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gslides_embed'], function (x) {
            var id = x.getAttribute('id'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height'),
                autostart = x.getAttribute('autostart'),
                loop = x.getAttribute('loop'),
                delay = x.getAttribute('delay');
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"https://docs.google.com/presentation/d/e/" + id + "/embed?start=" + autostart + "&loop=" + loop + "&delayms=" + delay + "\" frameborder=\"0\" allowfullscreen=\"true\" mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gslides";
        tarteaucitron.fallback(["gslides_embed"], tarteaucitron.engage(id));
    }
};

// Google Forms
tarteaucitron.services.gforms = {
    "key": "gforms",
    "type": "other",
    "name": "Google Forms",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gforms_embed'], function (x) {
            var id = x.getAttribute('id'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height');
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"https://docs.google.com/forms/d/e/" + id + "/viewform?embedded=true\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gforms";
        tarteaucitron.fallback(['gforms_embed'], tarteaucitron.engage(id));
    }
};

// Google Optimize
tarteaucitron.services.goptimize = {
    "key": "goptimize",
    "type": "other",
    "name": "Google Optimize",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";

        if (tarteaucitron.user.goptimize === undefined) {
            return;
        }

        tarteaucitron.addScript('https://www.googleoptimize.com/optimize.js?id=' + tarteaucitron.user.goptimize);
    }
};

// Marketo munchkin
tarteaucitron.services.marketomunchkin = {
    "key": "marketomunchkin",
    "type": "api",
    "name": "Marketo munchkin",
    "uri": "https://documents.marketo.com/legal/cookies",
    "needConsent": true,
    "cookies": ['OptAnon', '_mkto_trk'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.marketomunchkinkey === undefined) {
            return;
        }
        var didInit = false;
        function initMunchkin() {
            if (didInit === false) {
                didInit = true;
                Munchkin.init(tarteaucitron.user.marketomunchkinkey);
            }
        }
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//munchkin.marketo.net/munchkin.js';
        s.onreadystatechange = function () {
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                initMunchkin();
            }
        };
        s.onload = initMunchkin;
        document.getElementsByTagName('head')[0].appendChild(s);
    }
};

// outbrain
tarteaucitron.services.outbrain = {
    "key": "outbrain",
    "type": "ads",
    "name": "Outbrain",
    "uri": "https://www.outbrain.com/fr/advertisers/guidelines/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        tarteaucitron.addScript('https://widgets.outbrain.com/outbrain.js');
    }
};

// affilae
tarteaucitron.services.affilae = {
    "key": "affilae",
    "type": "ads",
    "name": "Affilae",
    "uri": "https://affilae.com/en/privacy-cookie-policy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.affilae === undefined) {
           return;
        }
        
        window._ae = { "pid": tarteaucitron.user.affilae };

        tarteaucitron.addScript('https://static.affilae.com/ae-v3.5.js');
    }
};

// Canal-U.tv
tarteaucitron.services.canalu = {
    "key": "canalu",
    "type": "video",
    "name": "Canal-U.tv",
    "uri": "https://www.canal-u.tv/conditions-generales-utilisations",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['canalu_player'], function (x) {
            var video_title = tarteaucitron.fixSelfXSS(x.getAttribute("videoTitle")),
                frame_url = 'https://www.canal-u.tv/embed/' + video_title;

            return '<div style="position:relative;padding-bottom:56.25%;padding-top:10px;height:0;overflow:hidden;">' +
                   '<iframe src="' + frame_url + '?width=100%&amp;height=100%" ' +
                        'style="position:absolute;top:0;left:0;width:100%;height: 100%;" ' +
                        'frameborder="0" ' +
                        'allowfullscreen ' +
                        'scrolling="no">' +
                   '</iframe>' +
                   '</div>';
        });
    },
    "fallback": function () {
        "use strict";
        tarteaucitron.fallback(['canalu_player'], function (elem) {
            return tarteaucitron.engage('canalu');
        });
    }
};

// WebTV Normandie Université
tarteaucitron.services.webtvnu = {
    "key": "webtvnu",
    "type": "video",
    "name": "WebTV Normandie Université",
    "uri": "https://docs.google.com/document/d/1tpVclj4QBoAq1meSZgYrpNECwp7dbmb_IhICY3sTl9c/edit",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['webtvnu_player'], function (x) {
            var frame_url = 'https://webtv.normandie-univ.fr/permalink/' + x.getAttribute("videoID") + '/iframe/',
                width = x.getAttribute("width"),
                height = x.getAttribute("height");

            return '<iframe width="' + width + '" height="' + height + '" src="' + frame_url + '" allowfullscreen="allowfullscreen" allow="autoplay"></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        tarteaucitron.fallback(['webtvnu_player'], function (elem) {
            return tarteaucitron.engage('webtvnu');
        });
    }
};

// studizz
tarteaucitron.services.studizz = {
    "key": "studizz",
    "type": "other",
    "name": "Studizz Chatbot",
    "uri": "https://group.studizz.fr/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.studizzToken === undefined) {
            return;
        }

        tarteaucitron.addScript('https://webchat.studizz.fr/webchat.js?token=' + tarteaucitron.user.studizzToken);
    }
};

// meteofrance
tarteaucitron.services.meteofrance = {
    "key": "meteofrance",
    "type": "api",
    "name": "Météo France",
    "uri": "https://meteofrance.com/politique-de-confidentialite",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_meteofrance'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Météo France iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                insee = x.getAttribute("data-insee"),
                allowfullscreen = x.getAttribute("allowfullscreen");

            return '<iframe title="' + frame_title + '" src="https://meteofrance.com/widget/prevision/' + insee + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'meteofrance';
        tarteaucitron.fallback(['tac_meteofrance'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// m6meteo
tarteaucitron.services.m6meteo = {
    "key": "m6meteo",
    "type": "api",
    "name": "M6 Météo",
    "uri": "https://gdpr.m6tech.net/charte-confidentialite-m6-web-meteocity.pdf",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_m6meteo'], function (x) {
            var id = x.getAttribute("data-id");

            tarteaucitron.addScript('https://www.meteocity.com/widget/js/'+id);

            return '<div id="cont_'+id+'"><div id="spa_'+id+'"><a id="a_'+id+'" href="#"></a> ©<a target="_top" href="https://www.meteocity.com">M6météo</a></div></div>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'm6meteo';
        tarteaucitron.fallback(['tac_m6meteo'], function (elem) {

            return tarteaucitron.engage(id);
        });
    }
};

// mtcaptcha
tarteaucitron.services.mtcaptcha = {
    "key": "mtcaptcha",
    "type": "api",
    "name": "MTcaptcha",
    "uri": "https://www.mtcaptcha.com",
    "readmoreLink": "https://www.mtcaptcha.com/faq-cookie-declaration",
    "needConsent": true,
    "cookies": ['mtv1Pulse','mtv1ConfSum','mtv1Pong'],

    "js": function () {

        window.mtcaptchaConfig = {
            "sitekey": tarteaucitron.user.mtcaptchaSitekey
        };

        tarteaucitron.addScript('https://service.mtcaptcha.com/mtcv1/client/mtcaptcha.min.js');
        tarteaucitron.addScript('https://service2.mtcaptcha.com/mtcv1/client/mtcaptcha2.min.js');
    }
};

// Internet Archive / https://archive.org
tarteaucitron.services.archive = {
    "key": "archive",
    "type": "video",
    "name": "Internet Archive",
    "uri": "https://archive.org/about/terms.php",
    "needConsent": true,
    "cookies": ['abtest-identifier','donation-identifier'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['archive_player'], function (x) {
            var video_id = tarteaucitron.getElemAttr(x, "data-videoID"),
                video_width = tarteaucitron.getElemAttr(x, "data-width"),
                frame_width = 'width=',
                video_height = tarteaucitron.getElemAttr(x, "data-height"),
                frame_height = 'height=',
                video_frame;

            if (video_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height += '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }
            video_frame = '<iframe src="https://archive.org/embed/' + video_id + '" ' + frame_width + frame_height + ' frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'archive';
        tarteaucitron.fallback(['archive_player'], function (elem) {
            elem.style.width = elem.getAttribute('data-width') + 'px';
            elem.style.height = elem.getAttribute('data-height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// Gallica
tarteaucitron.services.gallica = {
    "key": "gallica",
    "type": "other",
    "name": "Gallica",
    "uri": "https://gallica.bnf.fr/edit/und/conditions-dutilisation-des-contenus-de-gallica",
    "needConsent": true,
    "cookies": ['dtCookie', 'dtLatC', 'dtPC', 'dtSa', 'rxVisitor', 'rxvt', 'xtvrn'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gallica_player'], function (x) {
            var src = tarteaucitron.getElemAttr(x, "data-src"),
                style = tarteaucitron.getElemAttr(x, "data-style"),
                frame;
            if (src === undefined) {
                return "";
            }
            frame = '<iframe style="'+ style + '" src="' + src + '"></iframe>';
            return frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'gallica';
        tarteaucitron.fallback(['gallica_player'], function (elem) {
            elem.style = elem.getAttribute('data-style');
            return tarteaucitron.engage(id);
        });
    }
};

// crisp
tarteaucitron.services.crisp = {
    "key": "crisp",
    "type": "other",
    "name": "Crisp Chat",
    "uri": "https://help.crisp.chat/en/article/crisp-chatbox-cookie-ip-policy-1147xor/",
    "needConsent": false,
    "cookies": ['crisp-client', '__cfduid'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.crispID === undefined) {
            return;
        }

        window.$crisp = [];
        window.CRISP_WEBSITE_ID = tarteaucitron.user.crispID;

        tarteaucitron.addScript('https://client.crisp.chat/l.js');
    }
};

// microanalytics
tarteaucitron.services.microanalytics = {
    "key": "microanalytics",
    "type": "analytic",
    "name": "MicroAnalytic",
    "uri": "https://microanalytics.io/page/privacy",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.microanalyticsID === undefined) {
            return;
        }

        tarteaucitron.addScript('https://microanalytics.io/js/script.js', tarteaucitron.user.microanalyticsID, undefined, true, "data-host", "https://microanalytics.io");
    }
};

// facebookcustomerchat
tarteaucitron.services.facebookcustomerchat = {
    "key": "facebookcustomerchat",
    "type": "social",
    "name": "Facebook (Customer Chat)",
    "uri": "https://www.facebook.com/policies/cookies/",
    "needConsent": true,
    "cookies": ['act','c_user','datr','dpr','presence','sb','wd','xs','/tr'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.facebookChatID === undefined) {
            return;
        }

        tarteaucitron.fallback(['fb-customerchat'], '');
	window.fbAsyncInit=function(){FB.init({appId:tarteaucitron.user.facebookChatID,autoLogAppEvents:!0,xfbml:!0,version:"v3.0"})};
	tarteaucitron.addScript('https://connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk/xfbml.customerchat.js', 'facebook-jssdk');
    },
    "fallback": function () {
        "use strict";
        var id = 'facebookcustomerchat';
        tarteaucitron.fallback(['fb-customerchat'], tarteaucitron.engage(id));
    }
};

// weborama
tarteaucitron.services.weborama = {
    "key": "weborama",
    "type": "analytic",
    "name": "Weborama",
    "uri": "https://weborama.com/faq-cnil-avril-2021/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://cstatic.weborama.fr/js/advertiserv2/adperf_conversion.js');
    }
};

// tiktok
tarteaucitron.services.tiktok = {
    "key": "tiktok",
    "type": "analytic",
    "name": "Tiktok",
    "uri": "https://www.tiktok.com/legal/tiktok-website-cookies-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.tiktokId === undefined) {
            return;
        }

        tarteaucitron.addScript('https://analytics.tiktok.com/i18n/pixel/sdk.js?sdkid=' + tarteaucitron.user.tiktokId);

	if (typeof tarteaucitron.user.tiktokMore === 'function') {
            tarteaucitron.user.tiktokMore();
        }
    }
};

// Klaviyo
tarteaucitron.services.klaviyo = {
    "key": "klaviyo",
    "type": "ads",
    "name": "Klaviyo",
    "uri": "https://help.klaviyo.com/hc/en-us/articles/360034666712-About-Cookies-in-Klaviyo",
    "needConsent": true,
    "cookies": ['__kla_id'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.klaviyoCompanyId === undefined) {
            return;
        }
        tarteaucitron.addScript('//static.klaviyo.com/onsite/js/klaviyo.js?company_id=' + tarteaucitron.user.klaviyoCompanyId);
    }
};
