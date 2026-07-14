/**
 * Section 2: The Limit Doesn't Require Reaching (Fill the Gap)
 *
 * Students see a function with a missing point and can drag a floating
 * point to fill the hole at different y-values, observing that the limit
 * doesn't change.
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineFeedback,
    InlineClozeChoice,
    Cartesian2D,
    InteractionHintSequence,
} from "@/components/atoms";
import { useVar, useSetVar } from "@/stores";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    choicePropsFromDefinition,
} from "../variables";

// ─────────────────────────────────────────────────────────────────────────────
// Reactive Visualization: Fill the Gap
// ─────────────────────────────────────────────────────────────────────────────

function FillTheGapVisualization() {
    const holeYPosition = useVar('holeYPosition', 3) as number;
    const setVar = useSetVar();

    // The function: f(x) = x + 1, but with a hole at x = 2
    // The limit as x→2 is 3, but f(2) is undefined (or we can place any value there)
    const holeX = 2;
    const limitValue = 3; // The limit at x = 2

    // Function f(x) = x + 1
    const f = (x: number) => x + 1;

    return (
        <div className="relative">
            <Cartesian2D
                height={400}
                viewBox={{ x: [-1, 5], y: [-1, 6] }}
                plots={[
                    // The line f(x) = x + 1, but we'll show a hole at x = 2
                    { type: "function", fn: f, color: "#62D0AD", weight: 3, domain: [-1, 1.95] },
                    { type: "function", fn: f, color: "#62D0AD", weight: 3, domain: [2.05, 5] },
                    // The hole (empty circle) at the limit position
                    { type: "circle", center: [holeX, limitValue], radius: 0.12, color: "#62D0AD", fillOpacity: 0, strokeStyle: "solid" },
                    // Horizontal dashed line showing the limit value
                    { type: "segment", point1: [-1, limitValue], point2: [5, limitValue], color: "#8E90F5", weight: 1.5, style: "dashed" },
                    // Vertical dashed line at x = 2
                    { type: "segment", point1: [holeX, -1], point2: [holeX, 6], color: "#F7B23B", weight: 1.5, style: "dashed" },
                ]}
                movablePoints={[
                    {
                        // The draggable "fill" point
                        initial: [holeX, holeYPosition],
                        color: "#F7B23B",
                        constrain: (p) => [holeX, Math.max(0, Math.min(6, p[1]))], // Constrain to vertical movement at x = 2
                        onChange: (p) => setVar('holeYPosition', p[1]),
                        position: [holeX, holeYPosition],
                    }
                ]}
            />
            <InteractionHintSequence
                hintKey="fill-gap-drag"
                steps={[
                    {
                        gesture: "drag-vertical",
                        label: "Drag the amber point up and down to fill the hole at different y-values",
                        position: { x: "50%", y: "45%" }
                    }
                ]}
            />
            {/* Info display */}
            <div className="absolute top-4 right-4 bg-white/90 px-3 py-2 rounded-lg shadow-sm border border-slate-200">
                <div className="text-sm text-slate-600">
                    You placed f(2) = <span className="font-bold" style={{ color: '#F7B23B' }}>{holeYPosition.toFixed(1)}</span>
                </div>
                <div className="text-sm text-slate-600 mt-1">
                    But the limit is still <span className="font-bold" style={{ color: '#8E90F5' }}>{limitValue}</span>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section Blocks
// ─────────────────────────────────────────────────────────────────────────────

export const limitsNotReachingBlocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-not-reaching-title" maxWidth="xl">
        <Block id="not-reaching-title" padding="md">
            <EditableH2 id="h2-not-reaching-title" blockId="not-reaching-title">
                The Limit Doesn't Require Reaching
            </EditableH2>
        </Block>
    </StackLayout>,

    // Opening paradox
    <StackLayout key="layout-not-reaching-paradox" maxWidth="xl">
        <Block id="not-reaching-paradox" padding="sm">
            <EditableParagraph id="para-not-reaching-paradox" blockId="not-reaching-paradox">
                Here's a crucial insight that surprises many students: a function doesn't need to actually reach its limit value at the point in question. In fact, the function might not even be defined there! The limit only cares about what happens <em>nearby</em>, not exactly at the point.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive exploration
    <SplitLayout key="layout-not-reaching-split" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="not-reaching-setup" padding="sm">
                <EditableParagraph id="para-not-reaching-setup" blockId="not-reaching-setup">
                    Consider the function f(x) = x + 1, but imagine there's a "hole" at x = 2. The function is undefined exactly at x = 2, yet it's perfectly defined everywhere nearby. The teal line shows the function, and the empty circle marks the missing point.
                </EditableParagraph>
            </Block>
            <Block id="not-reaching-interact" padding="sm">
                <EditableParagraph id="para-not-reaching-interact" blockId="not-reaching-interact">
                    Now here's the key experiment: drag the amber point up and down to "fill" the hole with different values. You're choosing what f(2) could be if we defined it. Try placing it at y ={" "}
                    <InlineScrubbleNumber
                        varName="holeYPosition"
                        {...numberPropsFromDefinition(getVariableInfo('holeYPosition'))}
                    />
                    . Does changing this value affect the limit?
                </EditableParagraph>
            </Block>
            <Block id="not-reaching-observation" padding="sm">
                <EditableParagraph id="para-not-reaching-observation" blockId="not-reaching-observation">
                    No matter where you place the amber point — whether at 0, 5, or anywhere else — the limit as x approaches 2 remains exactly 3. The dashed blue line shows this limit. The surrounding values on the line all approach 3, regardless of what we define (or don't define) at x = 2 itself.
                </EditableParagraph>
            </Block>
        </div>
        <Block id="not-reaching-visualization" padding="sm" hasVisualization>
            <FillTheGapVisualization />
        </Block>
    </SplitLayout>,

    // Key takeaway
    <StackLayout key="layout-not-reaching-takeaway" maxWidth="xl">
        <Block id="not-reaching-takeaway" padding="sm">
            <EditableParagraph id="para-not-reaching-takeaway" blockId="not-reaching-takeaway">
                This is why limits are so powerful: they capture the "intended" behavior of a function near a point, even when the function misbehaves exactly at that point. The limit tells us what <em>should</em> be there based on the surrounding pattern.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Check understanding
    <StackLayout key="layout-not-reaching-question" maxWidth="xl">
        <Block id="not-reaching-question" padding="sm">
            <EditableParagraph id="para-not-reaching-question" blockId="not-reaching-question">
                When a function has a hole at x = a (the function is undefined at that point), the limit as x approaches a{" "}
                <InlineFeedback
                    varName="answerLimitExists"
                    correctValue="can still exist"
                    position="terminal"
                    successMessage="— exactly! The limit depends only on nearby values, not the value at the point itself"
                    failureMessage="— not quite"
                    hint="Think about what we just explored: does the limit care about where you placed the amber point?"
                    visualizationHint={{
                        blockId: "not-reaching-visualization",
                        hintKey: "feedback-not-reaching-hint",
                        steps: [
                            {
                                gesture: "drag-vertical",
                                label: "Drag the point to y = 0 — does the dashed limit line change?",
                                position: { x: "50%", y: "80%" },
                                completionVar: "holeYPosition",
                                completionValue: 0.5,
                                completionTolerance: 0.6,
                            },
                            {
                                gesture: "drag-vertical",
                                label: "Now drag it to y = 5 — the limit is still 3!",
                                position: { x: "50%", y: "25%" },
                                completionVar: "holeYPosition",
                                completionValue: 5,
                                completionTolerance: 0.6,
                            },
                        ],
                        label: "Discover it yourself",
                        resetVars: { holeYPosition: 3 },
                    }}
                >
                    <InlineClozeChoice
                        varName="answerLimitExists"
                        correctAnswer="can still exist"
                        options={["cannot exist", "can still exist", "equals zero"]}
                        {...choicePropsFromDefinition(getVariableInfo('answerLimitExists'))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
