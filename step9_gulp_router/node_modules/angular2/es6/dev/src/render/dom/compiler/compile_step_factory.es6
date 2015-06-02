import { PropertyBindingParser } from './property_binding_parser';
import { TextInterpolationParser } from './text_interpolation_parser';
import { DirectiveParser } from './directive_parser';
import { ViewSplitter } from './view_splitter';
import { ShadowDomCompileStep } from '../shadow_dom/shadow_dom_compile_step';
export class CompileStepFactory {
    createSteps(template, subTaskPromises) {
        return null;
    }
}
export class DefaultStepFactory extends CompileStepFactory {
    constructor(parser, shadowDomStrategy) {
        super();
        this._parser = parser;
        this._shadowDomStrategy = shadowDomStrategy;
    }
    createSteps(template, subTaskPromises) {
        return [
            new ViewSplitter(this._parser),
            new PropertyBindingParser(this._parser),
            new DirectiveParser(this._parser, template.directives),
            new TextInterpolationParser(this._parser),
            new ShadowDomCompileStep(this._shadowDomStrategy, template, subTaskPromises)
        ];
    }
}
//# sourceMappingURL=compile_step_factory.js.map