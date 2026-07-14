/**
 * Section 3: Computing Limits (Trace and Predict)
 *
 * Students drag a point along a curve and try to predict the limit
 * before reaching it, building intuition for direct substitution.
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineFeedback,
    InlineClozeInput,
    InlineFormula,
    Cartesian2D,
    InteractionHintSequence,
} from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { useVar, useSetVar } from "@/stores";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    clozePropsFromDefinition,
} from "../variables";

// ─────────────────────────────────────────────────────────────────────────────
// Reactive Visualization: Trace and Predict
// ─────────────────────────────────────────────────────────────────────────────

function TraceAndPredictVisualization() {
    const traceX = useVar('traceX', 0) as number;
    const setVar = useSetVar();

    // Function: f(x) = x² approaching x = 2 (limit = 4)
    const targetX = 2;
    const f = (x: number) => x * x;
    const currentY = f(traceX);
    const limitValue = f(targetX);

    // Calculate how close we are to the target
    const distanceToTarget = Math.abs(traceX - targetX);
    const distanceToLimit = Math.abs(currentY - limitValue);

    return (
        <div className="relative">
            <Cartesian2D
                height={380}
                viewBox={{ x: [-1, 5], y: [-1, 10] }}
                plots={[
                    // The parabola
                    { type: "function", fn: f, color: "#62D0AD", weight: 3 },
                    // Target zone (highlighted area near the limit)
                    { type: "segment", point1: [targetX, -1], point2: [targetX, 10], color: "#F7B23B", weight: 2, style: "dashed" },
                    { type: "segment", point1: [-1, limitValue], point2: [5, limitValue], color: "#8E90F5", weight: 2, style: "dashed" },
                    // Target point
                    { type: "point", x: targetX, y: limitValue, color: "#ef4444" },
                    // Current trace point (shown as separate for visual)
                    { type: "segment", point1: [traceX, 0], point2: [traceX, currentY], color: "#62D0AD", weight: 1.5, style: "dashed" },
                    { type: "segment", point1: [0, currentY], point2: [traceX, currentY], color: "#62D0AD", weight: 1.5, style: "dashed" },
                ]}
                movablePoints={[
                    {
                        initial: [traceX, currentY],
                        color: "#62D0AD",
                        constrain: (p) => [p[0], f(p[0])],
                        onChange: (p) => setVar('traceX', p[0]),
                        position: [traceX, currentY],
                    }
                ]}
            />
            <InteractionHintSequence
                hintKey="trace-predict-drag"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Drag the teal point toward x = 2 and watch the y-value approach the limit",
                        position: { x: "25%", y: "85%" }
                    }
                ]}
            />
            {/* Real-time info display */}
            <div className="absolute top-4 left-4 bg-white/90 px-3 py-2 rounded-lg shadow-sm border border-slate-200 text-sm">
                <div className="text-slate-600">
                    x = <span className="font-bold" style={{ color: '#62D0AD' }}>{traceX.toFixed(2)}</span>
                </div>
                <div className="text-slate-600 mt-1">
                    f(x) = <span className="font-bold" style={{ color: '#62D0AD' }}>{currentY.toFixed(2)}</span>
                </div>
            </div>
            {/* Distance indicator */}
            <div className="absolute top-4 right-4 bg-white/90 px-3 py-2 rounded-lg shadow-sm border border-slate-200 text-sm">
                <div className="text-slate-600">
                    Distance to x = 2: <span className="font-semibold">{distanceToTarget.toFixed(3)}</span>
                </div>
                <div className="text-slate-600 mt-1">
                    Distance to y = 4: <span className="font-semibold">{distanceToLimit.toFixed(3)}</span>
                </div>
            </div>
            {/* Target indicator */}
            <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-2 rounded-lg shadow-sm border border-slate-200">
                <div className="text-sm text-slate-600">
                    Target: x → <span className="font-bold" style={{ color: '#F7B23B' }}>2</span>
                </div>
                <div className="text-sm text-slate-600 mt-1">
                    Limit = <span className="font-bold" style={{ color: '#8E90F5' }}>?</span>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section Blocks
// ─────────────────────────────────────────────────────────────────────────────

export const computingLimitsBlocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-computing-title" maxWidth="xl">
        <Block id="computing-title" padding="md">
            <EditableH2 id="h2-computing-title" blockId="computing-title">
                Computing Limits
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-computing-intro" maxWidth="xl">
        <Block id="computing-intro" padding="sm">
            <EditableParagraph id="para-computing-intro" blockId="computing-intro">
                Now that we understand what a limit <em>is</em>, let's learn how to find one. For many functions, computing a limit is surprisingly simple: if the function is continuous at the point, just plug in the value! This is called <strong>direct substitution</strong>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive trace and predict
    <SplitLayout key="layout-computing-split" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="computing-setup" padding="sm">
                <EditableParagraph id="para-computing-setup" blockId="computing-setup">
                    Let's find{" "}
                    <InlineFormula latex="\lim_{x \to 2} x^2" colorMap={{}} />
                    . The graph shows f(x) = x². Drag the teal point along the curve toward x = 2. As you get closer, watch both the x and y values in the display.
                </EditableParagraph>
            </Block>
            <Block id="computing-trace" padding="sm">
                <EditableParagraph id="para-computing-trace" blockId="computing-trace">
                    Current position: x ={" "}
                    <InlineScrubbleNumber
                        varName="traceX"
                        {...numberPropsFromDefinition(getVariableInfo('traceX'))}
                    />
                    . What value does f(x) approach as x gets closer to 2? Notice how the "distance to y = 4" shrinks as you approach.
                </EditableParagraph>
            </Block>
            <Block id="computing-insight" padding="sm">
                <EditableParagraph id="para-computing-insight" blockId="computing-insight">
                    The pattern is clear: as x approaches 2, x² approaches 4. For this continuous function, finding the limit is as simple as computing f(2) = 2² = 4. The function "behaves well" at this point, so the limit equals the function value.
                </EditableParagraph>
            </Block>
        </div>
        <Block id="computing-visualization" padding="sm" hasVisualization>
            <TraceAndPredictVisualization />
        </Block>
    </SplitLayout>,

    // Formula explanation
    <StackLayout key="layout-computing-formula" maxWidth="xl">
        <Block id="computing-formula" padding="md">
            <FormulaBlock
                latex="\lim_{x \to 2} x^2 = 2^2 = 4"
            />
        </Block>
    </StackLayout>,

    // Direct substitution rule
    <StackLayout key="layout-computing-rule" maxWidth="xl">
        <Block id="computing-rule" padding="sm">
            <EditableParagraph id="para-computing-rule" blockId="computing-rule">
                <strong>The Direct Substitution Rule:</strong> For continuous functions (functions with no breaks, holes, or jumps), the limit as x approaches a is simply f(a). Just plug in the value! This works for polynomials, exponentials, trig functions, and most functions you'll encounter.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Practice question
    <StackLayout key="layout-computing-question" maxWidth="xl">
        <Block id="computing-question" padding="sm">
            <EditableParagraph id="para-computing-question" blockId="computing-question">
                Now try one yourself: What is{" "}
                <InlineFormula latex="\lim_{x \to 2} (x^2 + x - 2)" colorMap={{}} />
                ? Use direct substitution: plug in x = 2 and compute. The answer is{" "}
                <InlineFeedback
                    varName="answerLimitValue"
                    correctValue="4"
                    position="terminal"
                    successMessage="— correct! When x = 2: 2² + 2 - 2 = 4 + 2 - 2 = 4"
                    failureMessage="— not quite"
                    hint="Substitute x = 2 into x² + x - 2. That's 2² + 2 - 2 = ?"
                >
                    <InlineClozeInput
                        varName="answerLimitValue"
                        correctAnswer="4"
                        {...clozePropsFromDefinition(getVariableInfo('answerLimitValue'))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
