import { type ReactElement } from "react";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

// Import all sections
import { limitsIntroductionBlocks } from "./sections/limitsIntroduction";
import { limitsNotReachingBlocks } from "./sections/limitsNotReaching";
import { computingLimitsBlocks } from "./sections/computingLimits";
import { limitsToDerivativesBlocks } from "./sections/limitsToDerivatives";
import { limitsPracticeBlocks } from "./sections/limitsPractice";

/**
 * ------------------------------------------------------------------
 * LIMITS AND DERIVATIVES LESSON
 * ------------------------------------------------------------------
 *
 * An interactive explorable explanation teaching:
 * 1. What limits are intuitively (Infinite Zoom)
 * 2. Why limits don't require reaching the value (Fill the Gap)
 * 3. How to compute limits (Trace and Predict)
 * 4. How derivatives emerge from limits (Secant-to-Tangent)
 * 5. Summary and assessment
 *
 * Target audience: Post-secondary students (ages 17-20)
 * Prior knowledge: No prior knowledge of limits assumed
 * Key misconception addressed: Thinking f(a) must equal L for the limit to exist
 */

export const blocks: ReactElement[] = [
    // Section 1: What is a Limit?
    ...limitsIntroductionBlocks,

    // Section 2: The Limit Doesn't Require Reaching
    ...limitsNotReachingBlocks,

    // Section 3: Computing Limits
    ...computingLimitsBlocks,

    // Section 4: From Limits to Derivatives
    ...limitsToDerivativesBlocks,

    // Section 5: Practice & Assessment
    ...limitsPracticeBlocks,
];
