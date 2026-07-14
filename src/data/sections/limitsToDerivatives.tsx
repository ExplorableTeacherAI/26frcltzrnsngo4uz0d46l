/**
 * Section 4: From Limits to Derivatives (Secant-to-Tangent Transformer)
 *
 * Students drag a second point toward a fixed point and watch the secant
 * line transform into the tangent line, with the slope updating in real-time.
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms/text/EditableHeadings";
import { InlineScrubbleNumber } from "@/components/atoms/text/InlineScrubbleNumber";
import { InlineFeedback } from "@/components/atoms/text/InlineFeedback";
import { InlineClozeChoice } from "@/components/atoms/text/InlineClozeChoice";
import { InlineClozeInput } from "@/components/atoms/text/InlineClozeInput";
import { InlineFormula } from "@/components/atoms/formula/InlineFormula";
import { InlineLinkedHighlight } from "@/components/atoms/text/InlineLinkedHighlight";
import { FormulaBlock } from "@/components/molecules/formula/FormulaBlock";
import { Cartesian2D } from "@/components/atoms/visual/Cartesian2D";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";
import { useVar, useSetVar } from "@/stores";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    choicePropsFromDefinition,
    clozePropsFromDefinition,
    linkedHighlightPropsFromDefinition,
} from "../variables";

// ─────────────────────────────────────────────────────────────────────────────
// Reactive Visualization: Secant-to-Tangent Transformer
// ─────────────────────────────────────────────────────────────────────────────

function SecantToTangentVisualization() {
    const fixedX = useVar('fixedPointX', 1) as number;
    const movingX = useVar('movingPointX', 2.5) as number;
    const setVar = useSetVar();

    // Function: f(x) = x²
    const f = (x: number) => x * x;

    // Fixed point
    const fixedY = f(fixedX);

    // Moving point
    const movingY = f(movingX);

    // Calculate the secant slope (difference quotient)
    const h = movingX - fixedX;
    const secantSlope = h !== 0 ? (movingY - fixedY) / h : 2 * fixedX; // Use derivative when h = 0

    // The actual derivative at fixedX (for comparison)
    const actualDerivative = 2 * fixedX;

    // Extend the secant/tangent line for visualization
    const lineExtend = 3;
    const lineY1 = fixedY + secantSlope * (-lineExtend);
    const lineY2 = fixedY + secantSlope * lineExtend;

    // Check if we're very close (effectively the tangent)
    const isTangent = Math.abs(h) < 0.05;

    return (
        <div className="relative">
            <Cartesian2D
                height={400}
                viewBox={{ x: [-1, 4], y: [-1, 8] }}
                highlightVarName="derivativeHighlight"
                plots={[
                    // The parabola
                    { type: "function", fn: f, color: "#62D0AD", weight: 3, highlightId: "curve" },
                    // The secant/tangent line
                    {
                        type: "segment",
                        point1: [fixedX - lineExtend, lineY1],
                        point2: [fixedX + lineExtend, lineY2],
                        color: isTangent ? "#8E90F5" : "#F7B23B",
                        weight: 2.5,
                        highlightId: "secant-line"
                    },
                    // Fixed point
                    { type: "point", x: fixedX, y: fixedY, color: "#8E90F5", highlightId: "fixed-point" },
                ]}
                movablePoints={[
                    {
                        // Moving point that user drags
                        initial: [movingX, movingY],
                        color: "#ef4444",
                        constrain: (p) => {
                            // Constrain to curve, but don't let it coincide exactly with fixed point
                            const newX = Math.max(-0.5, Math.min(3.5, p[0]));
                            return [newX, f(newX)];
                        },
                        onChange: (p) => setVar('movingPointX', p[0]),
                        position: [movingX, movingY],
                    }
                ]}
            />
            <InteractionHintSequence
                hintKey="secant-tangent-drag"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Drag the red point toward the blue point and watch the line transform",
                        position: { x: "70%", y: "25%" }
                    }
                ]}
            />
            {/* Slope info display */}
            <div className="absolute top-4 right-4 bg-white/90 px-4 py-3 rounded-lg shadow-sm border border-slate-200">
                <div className="text-sm text-slate-600 mb-1">
                    h = x₂ - x₁ = <span className="font-bold">{h.toFixed(3)}</span>
                </div>
                <div className="text-sm text-slate-600 mb-2">
                    {isTangent ? "Tangent" : "Secant"} slope:{" "}
                    <span className="font-bold text-lg" style={{ color: isTangent ? '#8E90F5' : '#F7B23B' }}>
                        {secantSlope.toFixed(3)}
                    </span>
                </div>
                <div className="text-xs text-slate-500 border-t pt-2">
                    True derivative at x = {fixedX}: <span className="font-semibold">{actualDerivative}</span>
                </div>
            </div>
            {/* Status indicator */}
            <div className={`absolute bottom-4 left-4 px-3 py-2 rounded-lg shadow-sm border ${
                isTangent ? 'bg-indigo-50 border-indigo-200' : 'bg-amber-50 border-amber-200'
            }`}>
                <div className={`text-sm font-semibold ${isTangent ? 'text-indigo-700' : 'text-amber-700'}`}>
                    {isTangent ? "🎯 Tangent Line!" : "Secant Line"}
                </div>
                <div className="text-xs text-slate-600 mt-1">
                    {isTangent
                        ? "The limit has been reached"
                        : `Move the red point closer (h → 0)`
                    }
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section Blocks
// ─────────────────────────────────────────────────────────────────────────────

export const limitsToDerivativesBlocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-derivatives-title" maxWidth="xl">
        <Block id="derivatives-title" padding="md">
            <EditableH2 id="h2-derivatives-title" blockId="derivatives-title">
                From Limits to Derivatives
            </EditableH2>
        </Block>
    </StackLayout>,

    // The big connection
    <StackLayout key="layout-derivatives-connection" maxWidth="xl">
        <Block id="derivatives-connection" padding="sm">
            <EditableParagraph id="para-derivatives-connection" blockId="derivatives-connection">
                Here's where everything comes together. The derivative — the instantaneous rate of change — is defined as a limit. We're about to see one of the most beautiful ideas in calculus: watching a secant line transform into a tangent line as two points merge together.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Setup the visualization
    <StackLayout key="layout-derivatives-setup" maxWidth="xl">
        <Block id="derivatives-setup" padding="sm">
            <EditableParagraph id="para-derivatives-setup" blockId="derivatives-setup">
                Consider the function f(x) = x². The{" "}
                <InlineLinkedHighlight
                    varName="derivativeHighlight"
                    highlightId="secant-line"
                    {...linkedHighlightPropsFromDefinition(getVariableInfo('derivativeHighlight'))}
                >
                    secant line
                </InlineLinkedHighlight>
                {" "}connects two points on the{" "}
                <InlineLinkedHighlight
                    varName="derivativeHighlight"
                    highlightId="curve"
                    {...linkedHighlightPropsFromDefinition(getVariableInfo('derivativeHighlight'))}
                >
                    curve
                </InlineLinkedHighlight>
                . Its slope represents the average rate of change between those points.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive visualization
    <SplitLayout key="layout-derivatives-split" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="derivatives-interact-intro" padding="sm">
                <EditableParagraph id="para-derivatives-interact-intro" blockId="derivatives-interact-intro">
                    The{" "}
                    <InlineLinkedHighlight
                        varName="derivativeHighlight"
                        highlightId="fixed-point"
                        {...linkedHighlightPropsFromDefinition(getVariableInfo('derivativeHighlight'))}
                    >
                        blue point
                    </InlineLinkedHighlight>
                    {" "}is fixed at x ={" "}
                    <InlineScrubbleNumber
                        varName="fixedPointX"
                        {...numberPropsFromDefinition(getVariableInfo('fixedPointX'))}
                    />
                    . Drag the red point along the curve. Watch what happens to the secant line and its slope as you bring the red point closer to the blue one.
                </EditableParagraph>
            </Block>
            <Block id="derivatives-moving-point" padding="sm">
                <EditableParagraph id="para-derivatives-moving-point" blockId="derivatives-moving-point">
                    Red point position: x ={" "}
                    <InlineScrubbleNumber
                        varName="movingPointX"
                        {...numberPropsFromDefinition(getVariableInfo('movingPointX'))}
                    />
                    . As this value approaches the blue point's x-coordinate, the secant line rotates and settles into the tangent line — the line that just "touches" the curve at exactly one point.
                </EditableParagraph>
            </Block>
            <Block id="derivatives-observation" padding="sm">
                <EditableParagraph id="para-derivatives-observation" blockId="derivatives-observation">
                    Notice how the slope changes as you drag. When the points are far apart, the slope is the average rate of change. But as the red point approaches the blue point (h → 0), the slope approaches the <em>instantaneous</em> rate of change — the derivative!
                </EditableParagraph>
            </Block>
        </div>
        <Block id="derivatives-visualization" padding="sm" hasVisualization>
            <SecantToTangentVisualization />
        </Block>
    </SplitLayout>,

    // The formula
    <StackLayout key="layout-derivatives-formula" maxWidth="xl">
        <Block id="derivatives-formula" padding="md">
            <FormulaBlock
                latex="f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}"
            />
        </Block>
    </StackLayout>,

    // Explanation of the formula
    <StackLayout key="layout-derivatives-formula-explain" maxWidth="xl">
        <Block id="derivatives-formula-explain" padding="sm">
            <EditableParagraph id="para-derivatives-formula-explain" blockId="derivatives-formula-explain">
                This is the formal definition of the derivative. The expression{" "}
                <InlineFormula latex="\frac{f(x+h) - f(x)}{h}" colorMap={{}} />
                {" "}is the slope of the secant line (rise over run). Taking the limit as h → 0 means letting the two points merge — which gives us the slope of the tangent line.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Check understanding - conceptual
    <StackLayout key="layout-derivatives-question-concept" maxWidth="xl">
        <Block id="derivatives-question-concept" padding="sm">
            <EditableParagraph id="para-derivatives-question-concept" blockId="derivatives-question-concept">
                The derivative at a point is{" "}
                <InlineFeedback
                    varName="answerDerivativeDefinition"
                    correctValue="the limit of the secant slope"
                    position="terminal"
                    successMessage="— exactly right! The derivative is what the secant slope becomes as the two points merge"
                    failureMessage="— not quite"
                    hint="Think about what happens as the red point approaches the blue point"
                    visualizationHint={{
                        blockId: "derivatives-visualization",
                        hintKey: "feedback-derivative-hint",
                        steps: [
                            {
                                gesture: "drag-horizontal",
                                label: "Drag the red point very close to the blue point — watch the slope stabilize",
                                position: { x: "45%", y: "50%" },
                                completionVar: "movingPointX",
                                completionValue: 1.1,
                                completionTolerance: 0.15,
                            },
                        ],
                        label: "See it happen",
                        resetVars: { movingPointX: 2.5 },
                    }}
                >
                    <InlineClozeChoice
                        varName="answerDerivativeDefinition"
                        correctAnswer="the limit of the secant slope"
                        options={["the secant line itself", "the limit of the secant slope", "the average rate of change"]}
                        {...choicePropsFromDefinition(getVariableInfo('answerDerivativeDefinition'))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Check understanding - computation
    <StackLayout key="layout-derivatives-question-compute" maxWidth="xl">
        <Block id="derivatives-question-compute" padding="sm">
            <EditableParagraph id="para-derivatives-question-compute" blockId="derivatives-question-compute">
                For f(x) = x², the derivative is f'(x) = 2x. At the point x = 1, what is the slope of the tangent line? f'(1) ={" "}
                <InlineFeedback
                    varName="answerDerivativeSlope"
                    correctValue="2"
                    position="terminal"
                    successMessage="— correct! f'(1) = 2(1) = 2, which matches what you saw in the visualization"
                    failureMessage="— not quite"
                    hint="Plug x = 1 into f'(x) = 2x"
                >
                    <InlineClozeInput
                        varName="answerDerivativeSlope"
                        correctAnswer="2"
                        {...clozePropsFromDefinition(getVariableInfo('answerDerivativeSlope'))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
