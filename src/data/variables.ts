/**
 * Variables Configuration
 * =======================
 *
 * CENTRAL PLACE TO DEFINE ALL SHARED VARIABLES
 *
 * This file defines all variables that can be shared across sections.
 * AI agents should read this file to understand what variables are available.
 *
 * USAGE:
 * 1. Define variables here with their default values and metadata
 * 2. Use them in any section with: const x = useVar('variableName', defaultValue)
 * 3. Update them with: setVar('variableName', newValue)
 */

import { type VarValue } from '@/stores';

/**
 * Variable definition with metadata
 */
export interface VariableDefinition {
    /** Default value */
    defaultValue: VarValue;
    /** Human-readable label */
    label?: string;
    /** Description for AI agents */
    description?: string;
    /** Variable type hint */
    type?: 'number' | 'text' | 'boolean' | 'select' | 'array' | 'object' | 'spotColor' | 'linkedHighlight';
    /** Unit (e.g., 'Hz', '°', 'm/s') - for numbers */
    unit?: string;
    /** Minimum value (for number sliders) */
    min?: number;
    /** Maximum value (for number sliders) */
    max?: number;
    /** Step increment (for number sliders) */
    step?: number;
    /** Display color for InlineScrubbleNumber / InlineSpotColor (e.g. '#D81B60') */
    color?: string;
    /** Options for 'select' type variables */
    options?: string[];
    /** Placeholder text for text inputs */
    placeholder?: string;
    /** Correct answer for cloze input validation */
    correctAnswer?: string;
    /** Whether cloze matching is case sensitive */
    caseSensitive?: boolean;
    /** Background color for inline components */
    bgColor?: string;
    /** Schema hint for object types (for AI agents) */
    schema?: string;
}

/**
 * =====================================================
 * 🎯 DEFINE YOUR VARIABLES HERE
 * =====================================================
 */
export const variableDefinitions: Record<string, VariableDefinition> = {
    // ========================================
    // SECTION 1: What is a Limit? (Infinite Zoom)
    // ========================================

    zoomLevel: {
        defaultValue: 1,
        type: 'number',
        label: 'Zoom Level',
        description: 'Controls how zoomed in we are on the limit point',
        min: 1,
        max: 100,
        step: 1,
        color: '#62D0AD',
    },

    limitTargetX: {
        defaultValue: 2,
        type: 'number',
        label: 'Target X',
        description: 'The x-value we are approaching',
        min: -5,
        max: 5,
        step: 0.5,
        color: '#8E90F5',
    },

    // ========================================
    // SECTION 2: Limit Doesn't Require Reaching (Fill the Gap)
    // ========================================

    holeYPosition: {
        defaultValue: 3,
        type: 'number',
        label: 'Hole Y Position',
        description: 'Where the floating point is placed vertically',
        min: 0,
        max: 6,
        step: 0.1,
        color: '#F7B23B',
    },

    // ========================================
    // SECTION 3: Computing Limits (Trace and Predict)
    // ========================================

    traceX: {
        defaultValue: 0,
        type: 'number',
        label: 'Trace X',
        description: 'Current x position while tracing the curve',
        min: -4,
        max: 4,
        step: 0.1,
        color: '#62D0AD',
    },

    // ========================================
    // SECTION 4: Limits to Derivatives (Secant-to-Tangent)
    // ========================================

    fixedPointX: {
        defaultValue: 1,
        type: 'number',
        label: 'Fixed Point X',
        description: 'The x-coordinate of the fixed point',
        min: -3,
        max: 3,
        step: 0.1,
        color: '#8E90F5',
    },

    movingPointX: {
        defaultValue: 2.5,
        type: 'number',
        label: 'Moving Point X',
        description: 'The x-coordinate of the moving point for the secant line',
        min: -3,
        max: 3,
        step: 0.01,
        color: '#ef4444',
    },

    // ========================================
    // ASSESSMENT QUESTIONS
    // ========================================

    answerLimitIntuition: {
        defaultValue: '',
        type: 'select',
        label: 'Limit Intuition Answer',
        description: 'Student answer for what a limit represents',
        placeholder: '???',
        correctAnswer: 'approaches',
        options: ['equals', 'approaches', 'jumps to'],
        color: '#62D0AD',
    },

    answerLimitExists: {
        defaultValue: '',
        type: 'select',
        label: 'Limit Exists Answer',
        description: 'Student answer about when a limit exists',
        placeholder: '???',
        correctAnswer: 'can still exist',
        options: ['cannot exist', 'can still exist', 'equals zero'],
        color: '#8E90F5',
    },

    answerLimitValue: {
        defaultValue: '',
        type: 'text',
        label: 'Limit Value Answer',
        description: 'Student answer for computing a specific limit',
        placeholder: '?',
        correctAnswer: '4',
        color: '#F7B23B',
    },

    answerDerivativeDefinition: {
        defaultValue: '',
        type: 'select',
        label: 'Derivative Definition Answer',
        description: 'Student answer about the derivative definition',
        placeholder: '???',
        correctAnswer: 'the limit of the secant slope',
        options: ['the secant line itself', 'the limit of the secant slope', 'the average rate of change'],
        color: '#AC8BF9',
    },

    answerDerivativeSlope: {
        defaultValue: '',
        type: 'text',
        label: 'Derivative Slope Answer',
        description: 'Student answer for the slope of x² at x=1',
        placeholder: '?',
        correctAnswer: '2',
        color: '#ef4444',
    },

    // ========================================
    // LINKED HIGHLIGHTS
    // ========================================

    limitHighlight: {
        defaultValue: '',
        type: 'linkedHighlight',
        label: 'Limit Highlight',
        description: 'For highlighting limit-related elements',
        color: '#62D0AD',
        bgColor: 'rgba(98, 208, 173, 0.15)',
    },

    derivativeHighlight: {
        defaultValue: '',
        type: 'linkedHighlight',
        label: 'Derivative Highlight',
        description: 'For highlighting derivative-related elements',
        color: '#8E90F5',
        bgColor: 'rgba(142, 144, 245, 0.15)',
    },
};

/**
 * Get all variable names (for AI agents to discover)
 */
export const getVariableNames = (): string[] => {
    return Object.keys(variableDefinitions);
};

/**
 * Get a variable's default value
 */
export const getDefaultValue = (name: string): VarValue => {
    return variableDefinitions[name]?.defaultValue ?? 0;
};

/**
 * Get a variable's metadata
 */
export const getVariableInfo = (name: string): VariableDefinition | undefined => {
    return variableDefinitions[name];
};

/**
 * Get all default values as a record (for initialization)
 */
export const getDefaultValues = (): Record<string, VarValue> => {
    const defaults: Record<string, VarValue> = {};
    for (const [name, def] of Object.entries(variableDefinitions)) {
        defaults[name] = def.defaultValue;
    }
    return defaults;
};

/**
 * Get number props for InlineScrubbleNumber from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx, or getExampleVariableInfo(name) in exampleBlocks.tsx.
 */
export function numberPropsFromDefinition(def: VariableDefinition | undefined): {
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    color?: string;
} {
    if (!def || def.type !== 'number') return {};
    return {
        defaultValue: def.defaultValue as number,
        min: def.min,
        max: def.max,
        step: def.step,
        ...(def.color ? { color: def.color } : {}),
    };
}

/**
 * Get cloze input props for InlineClozeInput from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx, or getExampleVariableInfo(name) in exampleBlocks.tsx.
 */
/**
 * Get cloze choice props for InlineClozeChoice from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx.
 */
export function choicePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Get toggle props for InlineToggle from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx.
 */
export function togglePropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

export function clozePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
    caseSensitive?: boolean;
} {
    if (!def || def.type !== 'text') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
        ...(def.caseSensitive !== undefined ? { caseSensitive: def.caseSensitive } : {}),
    };
}

/**
 * Get spot-color props for InlineSpotColor from a variable definition.
 * Extracts the `color` field.
 *
 * @example
 * <InlineSpotColor
 *     varName="radius"
 *     {...spotColorPropsFromDefinition(getVariableInfo('radius'))}
 * >
 *     radius
 * </InlineSpotColor>
 */
export function spotColorPropsFromDefinition(def: VariableDefinition | undefined): {
    color: string;
} {
    return {
        color: def?.color ?? '#8B5CF6',
    };
}

/**
 * Get linked-highlight props for InlineLinkedHighlight from a variable definition.
 * Extracts the `color` and `bgColor` fields.
 *
 * @example
 * <InlineLinkedHighlight
 *     varName="activeHighlight"
 *     highlightId="radius"
 *     {...linkedHighlightPropsFromDefinition(getVariableInfo('activeHighlight'))}
 * >
 *     radius
 * </InlineLinkedHighlight>
 */
export function linkedHighlightPropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    return {
        ...(def?.color ? { color: def.color } : {}),
        ...(def?.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Build the `variables` prop for FormulaBlock from variable definitions.
 *
 * Takes an array of variable names and returns the config map expected by
 * `<FormulaBlock variables={...} />`.
 *
 * @example
 * import { scrubVarsFromDefinitions } from './variables';
 *
 * <FormulaBlock
 *     latex="\scrub{mass} \times \scrub{accel}"
 *     variables={scrubVarsFromDefinitions(['mass', 'accel'])}
 * />
 */
export function scrubVarsFromDefinitions(
    varNames: string[],
): Record<string, { min?: number; max?: number; step?: number; color?: string }> {
    const result: Record<string, { min?: number; max?: number; step?: number; color?: string }> = {};
    for (const name of varNames) {
        const def = variableDefinitions[name];
        if (!def) continue;
        result[name] = {
            ...(def.min !== undefined ? { min: def.min } : {}),
            ...(def.max !== undefined ? { max: def.max } : {}),
            ...(def.step !== undefined ? { step: def.step } : {}),
            ...(def.color ? { color: def.color } : {}),
        };
    }
    return result;
}
