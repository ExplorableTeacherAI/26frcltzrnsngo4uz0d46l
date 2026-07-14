/**
 * Section 1: What is a Limit? (Infinite Zoom Visualization)
 *
 * Students zoom into a graph near a point and see function values
 * settling to a constant horizontal line — revealing the limit.
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import { EditableH1, EditableH2, EditableParagraph } from "@/components/atoms/text/EditableHeadings";
import { InlineScrubbleNumber } from "@/components/atoms/text/InlineScrubbleNumber";
import { InlineTooltip } from "@/components/atoms/text/InlineTooltip";
import { Cartesian2D } from "@/components/atoms/visual/Cartesian2D";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";
import { useVar, useSetVar } from "@/stores";
import {
    getVariableInfo,
    numberPropsFromDefinition,
} from "../variables";

// ─────────────────────────────────────────────────────────────────────────────
// Reactive Visualization: Infinite Zoom into a Limit
// ─────────────────────────────────────────────────────────────────────────────

function InfiniteZoomVisualization() {
    const zoomLevel = useVar('zoomLevel', 1) as number;
    const setVar = useSetVar();

    // The function we're exploring: f(x) = x²
    // We're approaching x = 2, so the limit is 4
    const targetX = 2;
    const limitValue = 4;

    // Calculate the viewBox based on zoom level
    // As zoom increases, the window shrinks around the target point
    const windowSize = 5 / zoomLevel;
    const xMin = targetX - windowSize;
    const xMax = targetX + windowSize;
    const yMin = limitValue - windowSize;
    const yMax = limitValue + windowSize;

    // The function f(x) = x²
    const f = (x: number) => x * x;

    return (
        <div className="relative">
            <Cartesian2D
                height={400}
                viewBox={{ x: [xMin, xMax], y: [yMin, yMax] }}
                plots={[
                    // The curve
                    { type: "function", fn: f, color: "#62D0AD", weight: 3 },
                    // Horizontal line at the limit value
                    { type: "segment", point1: [xMin, limitValue], point2: [xMax, limitValue], color: "#8E90F5", weight: 2, style: "dashed" },
                    // Vertical line at the target x
                    { type: "segment", point1: [targetX, yMin], point2: [targetX, yMax], color: "#F7B23B", weight: 2, style: "dashed" },
                    // The limit point (where they meet)
                    { type: "point", x: targetX, y: limitValue, color: "#ef4444" },
                ]}
                movablePoints={[
                    {
                        initial: [targetX - windowSize * 0.6, f(targetX - windowSize * 0.6)],
                        color: "#62D0AD",
                        constrain: (p) => [p[0], f(p[0])],
                        onChange: () => {},
                    }
                ]}
            />
            <InteractionHintSequence
                hintKey="infinite-zoom-drag"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Drag the teal point along the curve toward x = 2",
                        position: { x: "35%", y: "55%" }
                    }
                ]}
            />
            {/* Zoom level display */}
            <div className="absolute top-4 right-4 bg-white/90 px-3 py-2 rounded-lg shadow-sm border border-slate-200">
                <div className="text-sm text-slate-600">
                    Zoom: <span className="font-semibold text-slate-800">{zoomLevel}×</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                    Window: ±{windowSize.toFixed(3)}
                </div>
            </div>
            {/* Current function value display */}
            <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 rounded-lg shadow-sm border border-slate-200">
                <div className="text-sm">
                    <span className="text-slate-600">As we zoom in, f(x) settles to </span>
                    <span className="font-bold" style={{ color: '#8E90F5' }}>{limitValue}</span>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section Blocks
// ─────────────────────────────────────────────────────────────────────────────

export const limitsIntroductionBlocks: ReactElement[] = [
    // Title
    <StackLayout key="layout-limits-title" maxWidth="xl">
        <Block id="limits-title" padding="lg">
            <EditableH1 id="h1-limits-title" blockId="limits-title">
                What is a Limit?
            </EditableH1>
        </Block>
    </StackLayout>,

    // Opening hook - surprising fact
    <StackLayout key="layout-limits-hook" maxWidth="xl">
        <Block id="limits-hook" padding="sm">
            <EditableParagraph id="para-limits-hook" blockId="limits-hook">
                Here's something strange: mathematicians often care more about what a function <em>almost</em> does than what it actually does. When we ask "what is the limit of f(x) as x approaches 2?", we're asking what value f(x) gets arbitrarily close to — even if f(2) itself doesn't exist or is something completely different.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Introduction to the concept
    <StackLayout key="layout-limits-concept" maxWidth="xl">
        <Block id="limits-concept" padding="sm">
            <EditableParagraph id="para-limits-concept" blockId="limits-concept">
                A{" "}
                <InlineTooltip id="tooltip-limit" tooltip="The value that a function approaches as the input gets closer and closer to some point.">
                    limit
                </InlineTooltip>
                {" "}describes what happens to a function's output as the input gets closer and closer to a particular value. The key word is "approaches" — we never actually reach the point, we just get infinitely close.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // The infinite zoom visualization with explanation
    <SplitLayout key="layout-limits-zoom-split" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="limits-zoom-explanation" padding="sm">
                <EditableParagraph id="para-limits-zoom-explanation" blockId="limits-zoom-explanation">
                    Let's explore this with f(x) = x². What happens as x approaches 2? Use the zoom control below to look closer and closer at the point (2, 4). The teal curve shows f(x) = x², and the dashed lines mark x = 2 and y = 4.
                </EditableParagraph>
            </Block>
            <Block id="limits-zoom-control" padding="sm">
                <EditableParagraph id="para-limits-zoom-control" blockId="limits-zoom-control">
                    Zoom level:{" "}
                    <InlineScrubbleNumber
                        varName="zoomLevel"
                        {...numberPropsFromDefinition(getVariableInfo('zoomLevel'))}
                    />
                    × — As the zoom increases, notice how the curve appears to flatten out, settling toward a horizontal line at y = 4. No matter how close we zoom, the function values stay near 4.
                </EditableParagraph>
            </Block>
            <Block id="limits-zoom-insight" padding="sm">
                <EditableParagraph id="para-limits-zoom-insight" blockId="limits-zoom-insight">
                    Drag the teal point along the curve toward x = 2 and watch the y-values. As you get closer to x = 2, the y-values get closer to 4. This is what we mean when we write: lim(x→2) x² = 4.
                </EditableParagraph>
            </Block>
        </div>
        <Block id="limits-zoom-visualization" padding="sm" hasVisualization>
            <InfiniteZoomVisualization />
        </Block>
    </SplitLayout>,

    // Key insight
    <StackLayout key="layout-limits-key-insight" maxWidth="xl">
        <Block id="limits-key-insight" padding="md">
            <EditableH2 id="h2-limits-key-insight" blockId="limits-key-insight">
                The Key Insight
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-limits-insight-text" maxWidth="xl">
        <Block id="limits-insight-text" padding="sm">
            <EditableParagraph id="para-limits-insight-text" blockId="limits-insight-text">
                When you zoom infinitely close to a point, the function's behavior becomes crystal clear. The limit is what you "see" when you look infinitely close — it's the value that all the nearby function values are converging toward. In our example, no matter how many times you zoom in around x = 2, the curve always appears to be settling toward the horizontal line y = 4.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
