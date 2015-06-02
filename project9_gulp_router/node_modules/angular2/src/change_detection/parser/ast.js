var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var lang_1 = require("angular2/src/facade/lang");
var collection_1 = require("angular2/src/facade/collection");
var AST = (function () {
    function AST() {
    }
    AST.prototype.eval = function (context, locals) { throw new lang_1.BaseException("Not supported"); };
    Object.defineProperty(AST.prototype, "isAssignable", {
        get: function () { return false; },
        enumerable: true,
        configurable: true
    });
    AST.prototype.assign = function (context, locals, value) { throw new lang_1.BaseException("Not supported"); };
    AST.prototype.visit = function (visitor) { return null; };
    AST.prototype.toString = function () { return "AST"; };
    return AST;
})();
exports.AST = AST;
var EmptyExpr = (function (_super) {
    __extends(EmptyExpr, _super);
    function EmptyExpr() {
        _super.apply(this, arguments);
    }
    EmptyExpr.prototype.eval = function (context, locals) { return null; };
    EmptyExpr.prototype.visit = function (visitor) {
        // do nothing
    };
    return EmptyExpr;
})(AST);
exports.EmptyExpr = EmptyExpr;
var ImplicitReceiver = (function (_super) {
    __extends(ImplicitReceiver, _super);
    function ImplicitReceiver() {
        _super.apply(this, arguments);
    }
    ImplicitReceiver.prototype.eval = function (context, locals) { return context; };
    ImplicitReceiver.prototype.visit = function (visitor) { return visitor.visitImplicitReceiver(this); };
    return ImplicitReceiver;
})(AST);
exports.ImplicitReceiver = ImplicitReceiver;
/**
 * Multiple expressions separated by a semicolon.
 */
var Chain = (function (_super) {
    __extends(Chain, _super);
    function Chain(expressions) {
        _super.call(this);
        this.expressions = expressions;
    }
    Chain.prototype.eval = function (context, locals) {
        var result;
        for (var i = 0; i < this.expressions.length; i++) {
            var last = this.expressions[i].eval(context, locals);
            if (lang_1.isPresent(last))
                result = last;
        }
        return result;
    };
    Chain.prototype.visit = function (visitor) { return visitor.visitChain(this); };
    return Chain;
})(AST);
exports.Chain = Chain;
var Conditional = (function (_super) {
    __extends(Conditional, _super);
    function Conditional(condition, trueExp, falseExp) {
        _super.call(this);
        this.condition = condition;
        this.trueExp = trueExp;
        this.falseExp = falseExp;
    }
    Conditional.prototype.eval = function (context, locals) {
        if (this.condition.eval(context, locals)) {
            return this.trueExp.eval(context, locals);
        }
        else {
            return this.falseExp.eval(context, locals);
        }
    };
    Conditional.prototype.visit = function (visitor) { return visitor.visitConditional(this); };
    return Conditional;
})(AST);
exports.Conditional = Conditional;
var AccessMember = (function (_super) {
    __extends(AccessMember, _super);
    function AccessMember(receiver, name, getter, setter) {
        _super.call(this);
        this.receiver = receiver;
        this.name = name;
        this.getter = getter;
        this.setter = setter;
    }
    AccessMember.prototype.eval = function (context, locals) {
        if (this.receiver instanceof ImplicitReceiver && lang_1.isPresent(locals) &&
            locals.contains(this.name)) {
            return locals.get(this.name);
        }
        else {
            var evaluatedReceiver = this.receiver.eval(context, locals);
            return this.getter(evaluatedReceiver);
        }
    };
    Object.defineProperty(AccessMember.prototype, "isAssignable", {
        get: function () { return true; },
        enumerable: true,
        configurable: true
    });
    AccessMember.prototype.assign = function (context, locals, value) {
        var evaluatedContext = this.receiver.eval(context, locals);
        if (this.receiver instanceof ImplicitReceiver && lang_1.isPresent(locals) &&
            locals.contains(this.name)) {
            throw new lang_1.BaseException("Cannot reassign a variable binding " + this.name);
        }
        else {
            return this.setter(evaluatedContext, value);
        }
    };
    AccessMember.prototype.visit = function (visitor) { return visitor.visitAccessMember(this); };
    return AccessMember;
})(AST);
exports.AccessMember = AccessMember;
var KeyedAccess = (function (_super) {
    __extends(KeyedAccess, _super);
    function KeyedAccess(obj, key) {
        _super.call(this);
        this.obj = obj;
        this.key = key;
    }
    KeyedAccess.prototype.eval = function (context, locals) {
        var obj = this.obj.eval(context, locals);
        var key = this.key.eval(context, locals);
        return obj[key];
    };
    Object.defineProperty(KeyedAccess.prototype, "isAssignable", {
        get: function () { return true; },
        enumerable: true,
        configurable: true
    });
    KeyedAccess.prototype.assign = function (context, locals, value) {
        var obj = this.obj.eval(context, locals);
        var key = this.key.eval(context, locals);
        obj[key] = value;
        return value;
    };
    KeyedAccess.prototype.visit = function (visitor) { return visitor.visitKeyedAccess(this); };
    return KeyedAccess;
})(AST);
exports.KeyedAccess = KeyedAccess;
var Pipe = (function (_super) {
    __extends(Pipe, _super);
    function Pipe(exp, name, args, inBinding) {
        _super.call(this);
        this.exp = exp;
        this.name = name;
        this.args = args;
        this.inBinding = inBinding;
    }
    Pipe.prototype.visit = function (visitor) { return visitor.visitPipe(this); };
    return Pipe;
})(AST);
exports.Pipe = Pipe;
var LiteralPrimitive = (function (_super) {
    __extends(LiteralPrimitive, _super);
    function LiteralPrimitive(value) {
        _super.call(this);
        this.value = value;
    }
    LiteralPrimitive.prototype.eval = function (context, locals) { return this.value; };
    LiteralPrimitive.prototype.visit = function (visitor) { return visitor.visitLiteralPrimitive(this); };
    return LiteralPrimitive;
})(AST);
exports.LiteralPrimitive = LiteralPrimitive;
var LiteralArray = (function (_super) {
    __extends(LiteralArray, _super);
    function LiteralArray(expressions) {
        _super.call(this);
        this.expressions = expressions;
    }
    LiteralArray.prototype.eval = function (context, locals) {
        return collection_1.ListWrapper.map(this.expressions, function (e) { return e.eval(context, locals); });
    };
    LiteralArray.prototype.visit = function (visitor) { return visitor.visitLiteralArray(this); };
    return LiteralArray;
})(AST);
exports.LiteralArray = LiteralArray;
var LiteralMap = (function (_super) {
    __extends(LiteralMap, _super);
    function LiteralMap(keys, values) {
        _super.call(this);
        this.keys = keys;
        this.values = values;
    }
    LiteralMap.prototype.eval = function (context, locals) {
        var res = collection_1.StringMapWrapper.create();
        for (var i = 0; i < this.keys.length; ++i) {
            collection_1.StringMapWrapper.set(res, this.keys[i], this.values[i].eval(context, locals));
        }
        return res;
    };
    LiteralMap.prototype.visit = function (visitor) { return visitor.visitLiteralMap(this); };
    return LiteralMap;
})(AST);
exports.LiteralMap = LiteralMap;
var Interpolation = (function (_super) {
    __extends(Interpolation, _super);
    function Interpolation(strings, expressions) {
        _super.call(this);
        this.strings = strings;
        this.expressions = expressions;
    }
    Interpolation.prototype.eval = function (context, locals) { throw new lang_1.BaseException("evaluating an Interpolation is not supported"); };
    Interpolation.prototype.visit = function (visitor) { visitor.visitInterpolation(this); };
    return Interpolation;
})(AST);
exports.Interpolation = Interpolation;
var Binary = (function (_super) {
    __extends(Binary, _super);
    function Binary(operation, left, right) {
        _super.call(this);
        this.operation = operation;
        this.left = left;
        this.right = right;
    }
    Binary.prototype.eval = function (context, locals) {
        var left = this.left.eval(context, locals);
        switch (this.operation) {
            case '&&':
                return left && this.right.eval(context, locals);
            case '||':
                return left || this.right.eval(context, locals);
        }
        var right = this.right.eval(context, locals);
        switch (this.operation) {
            case '+':
                return left + right;
            case '-':
                return left - right;
            case '*':
                return left * right;
            case '/':
                return left / right;
            case '%':
                return left % right;
            case '==':
                return left == right;
            case '!=':
                return left != right;
            case '===':
                return left === right;
            case '!==':
                return left !== right;
            case '<':
                return left < right;
            case '>':
                return left > right;
            case '<=':
                return left <= right;
            case '>=':
                return left >= right;
            case '^':
                return left ^ right;
            case '&':
                return left & right;
        }
        throw 'Internal error [$operation] not handled';
    };
    Binary.prototype.visit = function (visitor) { return visitor.visitBinary(this); };
    return Binary;
})(AST);
exports.Binary = Binary;
var PrefixNot = (function (_super) {
    __extends(PrefixNot, _super);
    function PrefixNot(expression) {
        _super.call(this);
        this.expression = expression;
    }
    PrefixNot.prototype.eval = function (context, locals) { return !this.expression.eval(context, locals); };
    PrefixNot.prototype.visit = function (visitor) { return visitor.visitPrefixNot(this); };
    return PrefixNot;
})(AST);
exports.PrefixNot = PrefixNot;
var Assignment = (function (_super) {
    __extends(Assignment, _super);
    function Assignment(target, value) {
        _super.call(this);
        this.target = target;
        this.value = value;
    }
    Assignment.prototype.eval = function (context, locals) {
        return this.target.assign(context, locals, this.value.eval(context, locals));
    };
    Assignment.prototype.visit = function (visitor) { return visitor.visitAssignment(this); };
    return Assignment;
})(AST);
exports.Assignment = Assignment;
var MethodCall = (function (_super) {
    __extends(MethodCall, _super);
    function MethodCall(receiver, name, fn, args) {
        _super.call(this);
        this.receiver = receiver;
        this.name = name;
        this.fn = fn;
        this.args = args;
    }
    MethodCall.prototype.eval = function (context, locals) {
        var evaluatedArgs = evalList(context, locals, this.args);
        if (this.receiver instanceof ImplicitReceiver && lang_1.isPresent(locals) &&
            locals.contains(this.name)) {
            var fn = locals.get(this.name);
            return lang_1.FunctionWrapper.apply(fn, evaluatedArgs);
        }
        else {
            var evaluatedReceiver = this.receiver.eval(context, locals);
            return this.fn(evaluatedReceiver, evaluatedArgs);
        }
    };
    MethodCall.prototype.visit = function (visitor) { return visitor.visitMethodCall(this); };
    return MethodCall;
})(AST);
exports.MethodCall = MethodCall;
var FunctionCall = (function (_super) {
    __extends(FunctionCall, _super);
    function FunctionCall(target, args) {
        _super.call(this);
        this.target = target;
        this.args = args;
    }
    FunctionCall.prototype.eval = function (context, locals) {
        var obj = this.target.eval(context, locals);
        if (!(obj instanceof Function)) {
            throw new lang_1.BaseException(obj + " is not a function");
        }
        return lang_1.FunctionWrapper.apply(obj, evalList(context, locals, this.args));
    };
    FunctionCall.prototype.visit = function (visitor) { return visitor.visitFunctionCall(this); };
    return FunctionCall;
})(AST);
exports.FunctionCall = FunctionCall;
var ASTWithSource = (function (_super) {
    __extends(ASTWithSource, _super);
    function ASTWithSource(ast, source, location) {
        _super.call(this);
        this.ast = ast;
        this.source = source;
        this.location = location;
    }
    ASTWithSource.prototype.eval = function (context, locals) { return this.ast.eval(context, locals); };
    Object.defineProperty(ASTWithSource.prototype, "isAssignable", {
        get: function () { return this.ast.isAssignable; },
        enumerable: true,
        configurable: true
    });
    ASTWithSource.prototype.assign = function (context, locals, value) { return this.ast.assign(context, locals, value); };
    ASTWithSource.prototype.visit = function (visitor) { return this.ast.visit(visitor); };
    ASTWithSource.prototype.toString = function () { return this.source + " in " + this.location; };
    return ASTWithSource;
})(AST);
exports.ASTWithSource = ASTWithSource;
var TemplateBinding = (function () {
    function TemplateBinding(key, keyIsVar, name, expression) {
        this.key = key;
        this.keyIsVar = keyIsVar;
        this.name = name;
        this.expression = expression;
    }
    return TemplateBinding;
})();
exports.TemplateBinding = TemplateBinding;
// INTERFACE
var AstVisitor = (function () {
    function AstVisitor() {
    }
    AstVisitor.prototype.visitAccessMember = function (ast) { };
    AstVisitor.prototype.visitAssignment = function (ast) { };
    AstVisitor.prototype.visitBinary = function (ast) { };
    AstVisitor.prototype.visitChain = function (ast) { };
    AstVisitor.prototype.visitConditional = function (ast) { };
    AstVisitor.prototype.visitPipe = function (ast) { };
    AstVisitor.prototype.visitFunctionCall = function (ast) { };
    AstVisitor.prototype.visitImplicitReceiver = function (ast) { };
    AstVisitor.prototype.visitKeyedAccess = function (ast) { };
    AstVisitor.prototype.visitLiteralArray = function (ast) { };
    AstVisitor.prototype.visitLiteralMap = function (ast) { };
    AstVisitor.prototype.visitLiteralPrimitive = function (ast) { };
    AstVisitor.prototype.visitMethodCall = function (ast) { };
    AstVisitor.prototype.visitPrefixNot = function (ast) { };
    return AstVisitor;
})();
exports.AstVisitor = AstVisitor;
var AstTransformer = (function () {
    function AstTransformer() {
    }
    AstTransformer.prototype.visitImplicitReceiver = function (ast) { return ast; };
    AstTransformer.prototype.visitInterpolation = function (ast) {
        return new Interpolation(ast.strings, this.visitAll(ast.expressions));
    };
    AstTransformer.prototype.visitLiteralPrimitive = function (ast) { return new LiteralPrimitive(ast.value); };
    AstTransformer.prototype.visitAccessMember = function (ast) {
        return new AccessMember(ast.receiver.visit(this), ast.name, ast.getter, ast.setter);
    };
    AstTransformer.prototype.visitMethodCall = function (ast) {
        return new MethodCall(ast.receiver.visit(this), ast.name, ast.fn, this.visitAll(ast.args));
    };
    AstTransformer.prototype.visitFunctionCall = function (ast) {
        return new FunctionCall(ast.target.visit(this), this.visitAll(ast.args));
    };
    AstTransformer.prototype.visitLiteralArray = function (ast) { return new LiteralArray(this.visitAll(ast.expressions)); };
    AstTransformer.prototype.visitLiteralMap = function (ast) { return new LiteralMap(ast.keys, this.visitAll(ast.values)); };
    AstTransformer.prototype.visitBinary = function (ast) {
        return new Binary(ast.operation, ast.left.visit(this), ast.right.visit(this));
    };
    AstTransformer.prototype.visitPrefixNot = function (ast) { return new PrefixNot(ast.expression.visit(this)); };
    AstTransformer.prototype.visitConditional = function (ast) {
        return new Conditional(ast.condition.visit(this), ast.trueExp.visit(this), ast.falseExp.visit(this));
    };
    AstTransformer.prototype.visitPipe = function (ast) {
        return new Pipe(ast.exp.visit(this), ast.name, this.visitAll(ast.args), ast.inBinding);
    };
    AstTransformer.prototype.visitKeyedAccess = function (ast) {
        return new KeyedAccess(ast.obj.visit(this), ast.key.visit(this));
    };
    AstTransformer.prototype.visitAll = function (asts) {
        var res = collection_1.ListWrapper.createFixedSize(asts.length);
        for (var i = 0; i < asts.length; ++i) {
            res[i] = asts[i].visit(this);
        }
        return res;
    };
    return AstTransformer;
})();
exports.AstTransformer = AstTransformer;
var _evalListCache = [
    [],
    [0],
    [0, 0],
    [0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];
function evalList(context, locals, exps) {
    var length = exps.length;
    if (length > 10) {
        throw new lang_1.BaseException("Cannot have more than 10 argument");
    }
    var result = _evalListCache[length];
    for (var i = 0; i < length; i++) {
        result[i] = exps[i].eval(context, locals);
    }
    return result;
}
exports.__esModule = true;
//# sourceMappingURL=ast.js.map