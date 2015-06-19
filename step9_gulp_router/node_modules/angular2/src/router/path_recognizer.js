var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var lang_2 = require('angular2/src/facade/lang');
var url_1 = require('./url');
// TODO(jeffbcross): implement as interface when ts2dart adds support:
// https://github.com/angular/ts2dart/issues/173
var Segment = (function () {
    function Segment() {
    }
    return Segment;
})();
exports.Segment = Segment;
var StaticSegment = (function (_super) {
    __extends(StaticSegment, _super);
    function StaticSegment(string) {
        _super.call(this);
        this.string = string;
        this.name = '';
        this.regex = url_1.escapeRegex(string);
    }
    StaticSegment.prototype.generate = function (params) { return this.string; };
    return StaticSegment;
})(Segment);
var DynamicSegment = (function () {
    function DynamicSegment(name) {
        this.name = name;
        this.regex = "([^/]+)";
    }
    DynamicSegment.prototype.generate = function (params) {
        if (!collection_1.StringMapWrapper.contains(params, this.name)) {
            throw new lang_1.BaseException("Route generator for '" + this.name + "' was not included in parameters passed.");
        }
        return lang_1.normalizeBlank(collection_1.StringMapWrapper.get(params, this.name));
    };
    DynamicSegment = __decorate([
        lang_2.IMPLEMENTS(Segment), 
        __metadata('design:paramtypes', [String])
    ], DynamicSegment);
    return DynamicSegment;
})();
var StarSegment = (function () {
    function StarSegment(name) {
        this.name = name;
        this.regex = "(.+)";
    }
    StarSegment.prototype.generate = function (params) {
        return lang_1.normalizeBlank(collection_1.StringMapWrapper.get(params, this.name));
    };
    return StarSegment;
})();
var paramMatcher = lang_1.RegExpWrapper.create("^:([^\/]+)$");
var wildcardMatcher = lang_1.RegExpWrapper.create("^\\*([^\/]+)$");
function parsePathString(route) {
    // normalize route as not starting with a "/". Recognition will
    // also normalize.
    if (route[0] === "/") {
        route = lang_1.StringWrapper.substring(route, 1);
    }
    var segments = splitBySlash(route);
    var results = collection_1.ListWrapper.create();
    var specificity = 0;
    // The "specificity" of a path is used to determine which route is used when multiple routes match
    // a URL.
    // Static segments (like "/foo") are the most specific, followed by dynamic segments (like
    // "/:id"). Star segments
    // add no specificity. Segments at the start of the path are more specific than proceeding ones.
    // The code below uses place values to combine the different types of segments into a single
    // integer that we can
    // sort later. Each static segment is worth hundreds of points of specificity (10000, 9900, ...,
    // 200), and each
    // dynamic segment is worth single points of specificity (100, 99, ... 2).
    if (segments.length > 98) {
        throw new lang_1.BaseException("'" + route + "' has more than the maximum supported number of segments.");
    }
    for (var i = 0; i < segments.length; i++) {
        var segment = segments[i], match;
        if (lang_1.isPresent(match = lang_1.RegExpWrapper.firstMatch(paramMatcher, segment))) {
            collection_1.ListWrapper.push(results, new DynamicSegment(match[1]));
            specificity += (100 - i);
        }
        else if (lang_1.isPresent(match = lang_1.RegExpWrapper.firstMatch(wildcardMatcher, segment))) {
            collection_1.ListWrapper.push(results, new StarSegment(match[1]));
        }
        else if (segment.length > 0) {
            collection_1.ListWrapper.push(results, new StaticSegment(segment));
            specificity += 100 * (100 - i);
        }
    }
    return { segments: results, specificity: specificity };
}
function splitBySlash(url) {
    return url.split('/');
}
// represents something like '/foo/:bar'
var PathRecognizer = (function () {
    function PathRecognizer(path, handler) {
        this.path = path;
        this.handler = handler;
        this.segments = [];
        // TODO: use destructuring assignment
        // see https://github.com/angular/ts2dart/issues/158
        var parsed = parsePathString(path);
        var specificity = parsed['specificity'];
        var segments = parsed['segments'];
        var regexString = '^';
        collection_1.ListWrapper.forEach(segments, function (segment) { regexString += '/' + segment.regex; });
        this.regex = lang_1.RegExpWrapper.create(regexString);
        this.segments = segments;
        this.specificity = specificity;
    }
    PathRecognizer.prototype.parseParams = function (url) {
        var params = collection_1.StringMapWrapper.create();
        var urlPart = url;
        for (var i = 0; i < this.segments.length; i++) {
            var segment = this.segments[i];
            var match = lang_1.RegExpWrapper.firstMatch(lang_1.RegExpWrapper.create('/' + segment.regex), urlPart);
            urlPart = lang_1.StringWrapper.substring(urlPart, match[0].length);
            if (segment.name.length > 0) {
                collection_1.StringMapWrapper.set(params, segment.name, match[1]);
            }
        }
        return params;
    };
    PathRecognizer.prototype.generate = function (params) {
        return collection_1.ListWrapper.join(collection_1.ListWrapper.map(this.segments, function (segment) { return '/' + segment.generate(params); }), '');
    };
    return PathRecognizer;
})();
exports.PathRecognizer = PathRecognizer;
exports.__esModule = true;
//# sourceMappingURL=path_recognizer.js.map