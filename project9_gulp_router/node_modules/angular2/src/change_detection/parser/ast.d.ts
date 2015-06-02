export declare class AST {
    eval(context: any, locals: any): void;
    isAssignable: boolean;
    assign(context: any, locals: any, value: any): void;
    visit(visitor: any): any;
    toString(): string;
}
export declare class EmptyExpr extends AST {
    eval(context: any, locals: any): any;
    visit(visitor: any): void;
}
export declare class ImplicitReceiver extends AST {
    eval(context: any, locals: any): any;
    visit(visitor: any): any;
}
/**
 * Multiple expressions separated by a semicolon.
 */
export declare class Chain extends AST {
    expressions: List<any>;
    constructor(expressions: List<any>);
    eval(context: any, locals: any): any;
    visit(visitor: any): any;
}
export declare class Conditional extends AST {
    condition: AST;
    trueExp: AST;
    falseExp: AST;
    constructor(condition: AST, trueExp: AST, falseExp: AST);
    eval(context: any, locals: any): void;
    visit(visitor: any): any;
}
export declare class AccessMember extends AST {
    receiver: AST;
    name: string;
    getter: Function;
    setter: Function;
    constructor(receiver: AST, name: string, getter: Function, setter: Function);
    eval(context: any, locals: any): any;
    isAssignable: boolean;
    assign(context: any, locals: any, value: any): any;
    visit(visitor: any): any;
}
export declare class KeyedAccess extends AST {
    obj: AST;
    key: AST;
    constructor(obj: AST, key: AST);
    eval(context: any, locals: any): any;
    isAssignable: boolean;
    assign(context: any, locals: any, value: any): any;
    visit(visitor: any): any;
}
export declare class Pipe extends AST {
    exp: AST;
    name: string;
    args: List<any>;
    inBinding: boolean;
    constructor(exp: AST, name: string, args: List<any>, inBinding: boolean);
    visit(visitor: any): any;
}
export declare class LiteralPrimitive extends AST {
    value: any;
    constructor(value: any);
    eval(context: any, locals: any): any;
    visit(visitor: any): any;
}
export declare class LiteralArray extends AST {
    expressions: List<any>;
    constructor(expressions: List<any>);
    eval(context: any, locals: any): any;
    visit(visitor: any): any;
}
export declare class LiteralMap extends AST {
    keys: List<any>;
    values: List<any>;
    constructor(keys: List<any>, values: List<any>);
    eval(context: any, locals: any): StringMap<any, any>;
    visit(visitor: any): any;
}
export declare class Interpolation extends AST {
    strings: List<any>;
    expressions: List<any>;
    constructor(strings: List<any>, expressions: List<any>);
    eval(context: any, locals: any): void;
    visit(visitor: any): void;
}
export declare class Binary extends AST {
    operation: string;
    left: AST;
    right: AST;
    constructor(operation: string, left: AST, right: AST);
    eval(context: any, locals: any): any;
    visit(visitor: any): any;
}
export declare class PrefixNot extends AST {
    expression: AST;
    constructor(expression: AST);
    eval(context: any, locals: any): boolean;
    visit(visitor: any): any;
}
export declare class Assignment extends AST {
    target: AST;
    value: AST;
    constructor(target: AST, value: AST);
    eval(context: any, locals: any): void;
    visit(visitor: any): any;
}
export declare class MethodCall extends AST {
    receiver: AST;
    name: string;
    fn: Function;
    args: List<any>;
    constructor(receiver: AST, name: string, fn: Function, args: List<any>);
    eval(context: any, locals: any): any;
    visit(visitor: any): any;
}
export declare class FunctionCall extends AST {
    target: AST;
    args: List<any>;
    constructor(target: AST, args: List<any>);
    eval(context: any, locals: any): any;
    visit(visitor: any): any;
}
export declare class ASTWithSource extends AST {
    ast: AST;
    source: string;
    location: string;
    constructor(ast: AST, source: string, location: string);
    eval(context: any, locals: any): void;
    isAssignable: boolean;
    assign(context: any, locals: any, value: any): void;
    visit(visitor: any): any;
    toString(): string;
}
export declare class TemplateBinding {
    key: string;
    keyIsVar: boolean;
    name: string;
    expression: ASTWithSource;
    constructor(key: string, keyIsVar: boolean, name: string, expression: ASTWithSource);
}
export declare class AstVisitor {
    visitAccessMember(ast: AccessMember): void;
    visitAssignment(ast: Assignment): void;
    visitBinary(ast: Binary): void;
    visitChain(ast: Chain): void;
    visitConditional(ast: Conditional): void;
    visitPipe(ast: Pipe): void;
    visitFunctionCall(ast: FunctionCall): void;
    visitImplicitReceiver(ast: ImplicitReceiver): void;
    visitKeyedAccess(ast: KeyedAccess): void;
    visitLiteralArray(ast: LiteralArray): void;
    visitLiteralMap(ast: LiteralMap): void;
    visitLiteralPrimitive(ast: LiteralPrimitive): void;
    visitMethodCall(ast: MethodCall): void;
    visitPrefixNot(ast: PrefixNot): void;
}
export declare class AstTransformer {
    visitImplicitReceiver(ast: ImplicitReceiver): ImplicitReceiver;
    visitInterpolation(ast: Interpolation): Interpolation;
    visitLiteralPrimitive(ast: LiteralPrimitive): LiteralPrimitive;
    visitAccessMember(ast: AccessMember): AccessMember;
    visitMethodCall(ast: MethodCall): MethodCall;
    visitFunctionCall(ast: FunctionCall): FunctionCall;
    visitLiteralArray(ast: LiteralArray): LiteralArray;
    visitLiteralMap(ast: LiteralMap): LiteralMap;
    visitBinary(ast: Binary): Binary;
    visitPrefixNot(ast: PrefixNot): PrefixNot;
    visitConditional(ast: Conditional): Conditional;
    visitPipe(ast: Pipe): Pipe;
    visitKeyedAccess(ast: KeyedAccess): KeyedAccess;
    visitAll(asts: List<any>): List<any>;
}
export declare var __esModule: boolean;
