import { Form } from './form_interface';
import { AbstractControlDirective } from './abstract_control_directive';
/**
 * A directive that contains multiple {@link NgControl}.
 *
 * Only used by the forms module.
 */
export declare class ControlContainer extends AbstractControlDirective {
    name: string;
    formDirective: Form;
    path: string[];
}
