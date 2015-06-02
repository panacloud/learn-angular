/**
 * @module
 * @public
 * @description
 * Change detection enables data binding in Angular.
 */
var ast_1 = require('./src/change_detection/parser/ast');
exports.ASTWithSource = ast_1.ASTWithSource;
exports.AST = ast_1.AST;
exports.AstTransformer = ast_1.AstTransformer;
exports.AccessMember = ast_1.AccessMember;
exports.LiteralArray = ast_1.LiteralArray;
exports.ImplicitReceiver = ast_1.ImplicitReceiver;
var lexer_1 = require('./src/change_detection/parser/lexer');
exports.Lexer = lexer_1.Lexer;
var parser_1 = require('./src/change_detection/parser/parser');
exports.Parser = parser_1.Parser;
var locals_1 = require('./src/change_detection/parser/locals');
exports.Locals = locals_1.Locals;
var exceptions_1 = require('./src/change_detection/exceptions');
exports.ExpressionChangedAfterItHasBeenChecked = exceptions_1.ExpressionChangedAfterItHasBeenChecked;
exports.ChangeDetectionError = exceptions_1.ChangeDetectionError;
var interfaces_1 = require('./src/change_detection/interfaces');
exports.ProtoChangeDetector = interfaces_1.ProtoChangeDetector;
exports.ChangeDispatcher = interfaces_1.ChangeDispatcher;
exports.ChangeDetector = interfaces_1.ChangeDetector;
exports.ChangeDetection = interfaces_1.ChangeDetection;
exports.ChangeDetectorDefinition = interfaces_1.ChangeDetectorDefinition;
var constants_1 = require('./src/change_detection/constants');
exports.CHECK_ONCE = constants_1.CHECK_ONCE;
exports.CHECK_ALWAYS = constants_1.CHECK_ALWAYS;
exports.DETACHED = constants_1.DETACHED;
exports.CHECKED = constants_1.CHECKED;
exports.ON_PUSH = constants_1.ON_PUSH;
exports.DEFAULT = constants_1.DEFAULT;
var proto_change_detector_1 = require('./src/change_detection/proto_change_detector');
exports.DynamicProtoChangeDetector = proto_change_detector_1.DynamicProtoChangeDetector;
exports.JitProtoChangeDetector = proto_change_detector_1.JitProtoChangeDetector;
var binding_record_1 = require('./src/change_detection/binding_record');
exports.BindingRecord = binding_record_1.BindingRecord;
var directive_record_1 = require('./src/change_detection/directive_record');
exports.DirectiveIndex = directive_record_1.DirectiveIndex;
exports.DirectiveRecord = directive_record_1.DirectiveRecord;
var dynamic_change_detector_1 = require('./src/change_detection/dynamic_change_detector');
exports.DynamicChangeDetector = dynamic_change_detector_1.DynamicChangeDetector;
var change_detector_ref_1 = require('./src/change_detection/change_detector_ref');
exports.ChangeDetectorRef = change_detector_ref_1.ChangeDetectorRef;
var pipe_registry_1 = require('./src/change_detection/pipes/pipe_registry');
exports.PipeRegistry = pipe_registry_1.PipeRegistry;
var change_detection_util_1 = require('./src/change_detection/change_detection_util');
exports.uninitialized = change_detection_util_1.uninitialized;
var pipe_1 = require('./src/change_detection/pipes/pipe');
exports.WrappedValue = pipe_1.WrappedValue;
exports.Pipe = pipe_1.Pipe;
var null_pipe_1 = require('./src/change_detection/pipes/null_pipe');
exports.NullPipe = null_pipe_1.NullPipe;
exports.NullPipeFactory = null_pipe_1.NullPipeFactory;
var change_detection_1 = require('./src/change_detection/change_detection');
exports.defaultPipes = change_detection_1.defaultPipes;
exports.DynamicChangeDetection = change_detection_1.DynamicChangeDetection;
exports.JitChangeDetection = change_detection_1.JitChangeDetection;
exports.PreGeneratedChangeDetection = change_detection_1.PreGeneratedChangeDetection;
exports.preGeneratedProtoDetectors = change_detection_1.preGeneratedProtoDetectors;
exports.defaultPipeRegistry = change_detection_1.defaultPipeRegistry;
exports.__esModule = true;
//# sourceMappingURL=change_detection.js.map