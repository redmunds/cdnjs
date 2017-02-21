(function (global) {
    "use strict";

    var util = (function () {

        const TIMEOUT = 30000;

        const MIME = {
            'woff': 'application/x-font-woff',
            'woff2': 'application/x-font-woff2',
            'truetype': 'application/x-font-ttf',
            'ttf': 'application/x-font-ttf',
            'opentype': 'application/x-font-otf',
            'embedded-opentype': 'application/x-font-otf',
            'png': 'image/png',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'gif': 'image/gif'
        };

        function parseExtension(url) {
            var match = /\.([^\./]*?)$/g.exec(url);
            if (match) return match[1];
            else return '';
        }

        function mimeType(url) {
            var extension = parseExtension(url).toLowerCase();
            return MIME[extension] || '';
        }

        function isDataUrl(url) {
            return url.search(/^(data:)/) !== -1;
        }

        function toBlob(canvas) {
            return new Promise(function (resolve) {
                var binaryString = window.atob(canvas.toDataURL().split(',')[1]);
                var length = binaryString.length;
                var binaryArray = new Uint8Array(length);

                for (var i = 0; i < length; i++)
                    binaryArray[i] = binaryString.charCodeAt(i);

                resolve(new Blob([binaryArray], {
                    type: 'image/png'
                }));
            });
        }

        function canvasToBlob(canvas) {
            if (canvas.toBlob)
                return new Promise(function (resolve) {
                    canvas.toBlob(resolve);
                });

            return toBlob(canvas);
        }

        function resolveUrl(url, baseUrl) {
            var doc = global.document.implementation.createHTMLDocument();
            var base = doc.createElement('base');
            doc.head.appendChild(base);
            var a = doc.createElement('a');
            doc.body.appendChild(a);
            base.href = baseUrl;
            a.href = url;
            return a.href;
        }

        var uid = (function () {
            var index = 0;

            function uid() {
                /* see http://stackoverflow.com/a/6248722/2519373 */
                return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
            }

            function next() {
                return 'u' + uid() + index++;
            }

            return {
                next: next
            };
        })();

        function makeImage(uri) {
            return new Promise(function (resolve, reject) {
                var image = new Image();
                image.onload = function () {
                    resolve(image);
                };
                image.onerror = reject;
                image.src = uri;
            });
        }

        function getAndEncode(url) {
            return new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();

                request.onreadystatechange = function () {
                    if (request.readyState !== 4) return;

                    if (request.status !== 200) {
                        reject(new Error('Cannot fetch resource ' + url + ', status: ' + this.status));
                        return;
                    }

                    var encoder = new FileReader();
                    encoder.onloadend = function () {
                        var content = encoder.result.split(/,/)[1];
                        resolve(content);
                    };
                    encoder.readAsDataURL(request.response);
                };

                request.ontimeout = function () {
                    reject(new Error('Timeout of ' + TIMEOUT + 'ms occured while fetching resource: ' + url));
                };

                request.responseType = 'blob';
                request.timeout = TIMEOUT;
                request.open('GET', url, true);
                request.send();
            });
        }

        function dataAsUrl(content, type) {
            return 'data:' + type + ';base64,' + content;
        }

        function escape(string) {
            return string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
        }

        function delay(ms) {
            return function (arg) {
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve(arg);
                    }, ms);
                });
            };
        }

        function asArray(arrayLike) {
            var array = [];
            var length = arrayLike.length;
            for (var i = 0; i < length; i++) array.push(arrayLike[i]);
            return array;
        }

        function escapeXhtml(string) {
            return string.replace(/#/g, '%23');
        }

        return {
            escape: escape,
            parseExtension: parseExtension,
            mimeType: mimeType,
            dataAsUrl: dataAsUrl,
            isDataUrl: isDataUrl,
            canvasToBlob: canvasToBlob,
            resolveUrl: resolveUrl,
            getAndEncode: getAndEncode,
            uid: uid.next,
            delay: delay,
            asArray: asArray,
            escapeXhtml: escapeXhtml,
            makeImage: makeImage
        };
    })();

    var inliner = (function () {

        const URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;

        function urlAsRegex(url) {
            return new RegExp('(url\\([\'"]?)(' + util.escape(url) + ')([\'"]?\\))', 'g');
        }

        function nothingToInline(string) {
            return !shouldProcess(string);
        }

        function shouldProcess(string) {
            return string.search(URL_REGEX) !== -1;
        }

        function readUrls(string) {
            var result = [];
            var match;
            while ((match = URL_REGEX.exec(string)) !== null) {
                result.push(match[1]);
            }
            return result.filter(function (url) {
                return !util.isDataUrl(url);
            });
        }

        function inline(string, url, baseUrl, get) {
            return Promise.resolve(url)
                .then(function (url) {
                    return baseUrl ? util.resolveUrl(url, baseUrl) : url;
                })
                .then(get || util.getAndEncode)
                .then(function (data) {
                    return util.dataAsUrl(data, util.mimeType(url));
                })
                .then(function (dataUrl) {
                    return string.replace(urlAsRegex(url), '$1' + dataUrl + '$3');
                });
        }

        function inlineAll(string, baseUrl, get) {
            if (nothingToInline(string)) return Promise.resolve(string);

            return Promise.resolve(string)
                .then(readUrls)
                .then(function (urls) {
                    var done = Promise.resolve(string);
                    urls.forEach(function (url) {
                        done = done.then(function (string) {
                            return inline(string, url, baseUrl, get);
                        });
                    });
                    return done;
                });
        }

        return {
            inlineAll: inlineAll,
            shouldProcess: shouldProcess,
            impl: {
                readUrls: readUrls,
                inline: inline
            }
        };
    })();

    var fontFaces = (function () {

        function selectWebFontRules(cssRules) {
            return cssRules
                .filter(function (rule) {
                    return rule.type === CSSRule.FONT_FACE_RULE;
                })
                .filter(function (rule) {
                    return inliner.shouldProcess(rule.style.getPropertyValue('src'));
                });
        }

        function getCssRules(styleSheets) {
            var cssRules = [];
            styleSheets.forEach(function (sheet) {
                util.asArray(sheet.cssRules).forEach(cssRules.push.bind(cssRules));
            });
            return cssRules;
        }

        function readAll() {
            return Promise.resolve(util.asArray(document.styleSheets))
                .then(getCssRules)
                .then(selectWebFontRules)
                .then(function (rules) {
                    return rules.map(newWebFont);
                });
        }

        function newWebFont(webFontRule) {
            return {
                resolve: function resolve() {
                    var baseUrl = (webFontRule.parentStyleSheet || {}).href;
                    return inliner.inlineAll(webFontRule.cssText, baseUrl);
                },
                src: function () {
                    return webFontRule.style.getPropertyValue('src');
                }
            };
        }

        function resolveAll() {
            return readAll(document)
                .then(function (webFonts) {
                    return Promise.all(
                        webFonts.map(function (webFont) {
                            return webFont.resolve();
                        })
                    );
                })
                .then(function (cssStrings) {
                    return cssStrings.join('\n');
                });
        }

        return {
            resolveAll: resolveAll,
            impl: {
                readAll: readAll
            }
        };
    })();

    var images = (function () {

        function newImage(element) {

            function inline(get) {
                if (util.isDataUrl(element.src)) return Promise.resolve();

                return Promise.resolve(element.src)
                    .then(get || util.getAndEncode)
                    .then(function (data) {
                        return util.dataAsUrl(data, util.mimeType(element.src));
                    })
                    .then(function (dataUrl) {
                        return new Promise(function (resolve, reject) {
                            element.onload = resolve;
                            element.onerror = reject;
                            element.src = dataUrl;
                        });
                    });
            }

            return {
                inline: inline
            };
        }

        function inlineBackground(node) {
            var background = node.style.getPropertyValue('background');

            if (!background) return Promise.resolve(node);

            return inliner.inlineAll(background)
                .then(function (inlined) {
                    node.style.setProperty(
                        'background',
                        inlined,
                        node.style.getPropertyPriority('background')
                    );
                })
                .then(function () {
                    return node;
                });
        }

        function inlineAll(node) {
            if (!(node instanceof Element)) return Promise.resolve(node);

            return inlineBackground(node)
                .then(function () {
                    if (node instanceof HTMLImageElement)
                        return newImage(node).inline();
                    else
                        return Promise.all(
                            util.asArray(node.childNodes).map(function (child) {
                                return inlineAll(child);
                            })
                        );
                });
        }

        return {
            inlineAll: inlineAll,
            impl: {
                newImage: newImage
            }
        };
    })();

    function copyProperties(source, target) {
        util.asArray(source).forEach(function (name) {
            target.setProperty(
                name,
                source.getPropertyValue(name),
                source.getPropertyPriority(name)
            );
        });
    }

    function copyStyle(source, target) {
        if (source.cssText) target.cssText = source.cssText;
        else copyProperties(source, target);
    }

    function cloneStyle(pair) {
        var style = global.window.getComputedStyle(pair.source);
        copyStyle(style, pair.target.style);
        return pair;
    }

    function formatCssText(style) {
        var content = style.getPropertyValue('content');
        return style.cssText + ' content: ' + content + ';';
    }

    function formatCssProperties(style) {

        function formatProperty(name) {
            return name + ': ' +
                style.getPropertyValue(name) +
                (style.getPropertyPriority(name) ? ' !important' : '');
        }

        return util.asArray(style)
            .map(formatProperty)
            .join('; ') + ';';
    }

    function formatPseudoElementStyle(className, element, style) {
        var selector = '.' + className + ':' + element;
        var cssText = style.cssText ? formatCssText(style) : formatCssProperties(style);
        return global.document.createTextNode(selector + '{' + cssText + '}');
    }

    function clonePseudoElement(pair, element) {
        var style = global.window.getComputedStyle(pair.source, element);
        var content = style.getPropertyValue('content');

        if (content === '' || content === 'none') return pair;

        var className = util.uid();

        pair.target.className = pair.target.className + ' ' + className;

        var styleElement = global.document.createElement('style');
        styleElement.appendChild(formatPseudoElementStyle(className, element, style));
        pair.target.appendChild(styleElement);

        return pair;
    }

    function clonePseudoElements(pair) {
        [
            ':before',
            ':after'
        ]
        .forEach(function (element) {
            clonePseudoElement(pair, element);
        });
        return pair;
    }

    function fixNamespace(node) {
        if (node instanceof SVGElement) node.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        return node;
    }

    function processClone(original, clone) {
        if (!(clone instanceof Element)) return clone;

        return Promise.resolve({
                source: original,
                target: clone
            })
            .then(cloneStyle)
            .then(clonePseudoElements)
            .then(function (pair) {
                return pair.target;
            })
            .then(fixNamespace);
    }

    function cloneChildrenInOrder(parent, children, filter) {
        var done = Promise.resolve();
        children.forEach(function (child) {
            done = done
                .then(function () {
                    return cloneNode(child, filter);
                })
                .then(function (childClone) {
                    if (childClone) parent.appendChild(childClone);
                });
        });
        return done;
    }

    function cloneChildren(original, clone, filter) {
        var children = original.childNodes;
        if (children.length === 0) return Promise.resolve(clone);

        return cloneChildrenInOrder(clone, util.asArray(children), filter)
            .then(function () {
                return clone;
            });
    }

    function cloneNode(node, filter) {
        if (filter && !filter(node)) return Promise.resolve();

        return Promise.resolve()
            .then(function () {
                return node.cloneNode(false);
            })
            .then(function (clone) {
                return cloneChildren(node, clone, filter);
            })
            .then(function (clone) {
                return processClone(node, clone);
            });
    }

    function makeDataUri(node, width, height) {
        return Promise.resolve(node)
            .then(function (node) {
                node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
                return new XMLSerializer().serializeToString(node);
            })
            .then(util.escapeXhtml)
            .then(function (xhtml) {
                return '<foreignObject x="0" y="0" width="100%" height="100%">' + xhtml + "</foreignObject>";
            })
            .then(function (foreignObject) {
                return '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' + foreignObject + '</svg>';
            })
            .then(function (svg) {
                return "data:image/svg+xml;charset=utf-8," + svg;
            });
    }

    function inlineImages(node) {
        return images.inlineAll(node)
            .then(function () {
                return node;
            });
    }

    function embedFonts(node) {
        return fontFaces.resolveAll()
            .then(function (cssText) {
                var styleNode = document.createElement('style');
                node.appendChild(styleNode);
                styleNode.appendChild(document.createTextNode(cssText));
                return node;
            });
    }

    function draw(domNode, options) {
        return toImage(domNode, options)
            .then(util.delay(100))
            .then(function (image) {
                var canvas = document.createElement('canvas');
                canvas.width = domNode.scrollWidth;
                canvas.height = domNode.scrollHeight;
                canvas.getContext('2d').drawImage(image, 0, 0);
                return canvas;
            });
    }

    /**
     * @param node DOM node object to convert
     * @param options {Object}
     * @return {Promise} promise that resolves to SVG image data URL
     * */
    function toImage(node, options) {
        options = options || {};

        return Promise.resolve(node)
            .then(function (node) {
                return cloneNode(node, options.filter);
            })
            .then(embedFonts)
            .then(inlineImages)
            .then(function (clone) {
                return makeDataUri(clone, node.scrollWidth, node.scrollHeight);
            })
            .then(util.makeImage);
    }

    /**
     * @param node DOM node object to convert
     * @param options {Object}
     * @return {Promise} promise that resolves to PNG image data URL
     * */
    function toDataUrl(node, options) {
        return draw(node, options)
            .then(function (canvas) {
                return canvas.toDataURL();
            });
    }

    /**
     * @param node DOM node object to convert
     * @param options {Object}
     * @return {Promise} promise that resolves to PNG image blob
     * */
    function toBlob(node, options) {
        return draw(node, options)
            .then(util.canvasToBlob);
    }

    global.domtoimage = {
        toImage: toImage,
        toDataUrl: toDataUrl,
        toBlob: toBlob,
        impl: {
            fontFaces: fontFaces,
            images: images,
            util: util,
            inliner: inliner
        }
    };
})(this);
