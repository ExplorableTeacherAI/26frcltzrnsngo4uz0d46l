/**
 * Section 5: Practice & Assessment
 *
 * Questions to test understanding of limits and the limit-derivative connection.
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineFeedback,
    InlineClozeChoice,
    InlineFormula,
} from "@/components/atoms";
import {
    getVariableInfo,
    choicePropsFromDefinition,
} from "../variables";

// ─────────────────────────────────────────────────────────────────────────────
// Section Blocks
// ─────────────────────────────────────────────────────────────────────────────

export const limitsPracticeBlocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-practice-title" maxWidth="xl">
        <Block id="practice-title" padding="md">
            <EditableH2 id="h2-practice-title" blockId="practice-title">
                Summary and Key Concepts
            </EditableH2>
        </Block>
    </StackLayout>,

    // Summary of key concepts
    <StackLayout key="layout-practice-summary" maxWidth="xl">
        <Block id="practice-summary" padding="sm">
            <EditableParagraph id="para-practice-summary" blockId="practice-summary">
                Let's review what we've learned. A limit describes what value a function <em>approaches</em> as the input gets arbitrarily close to some point. The function doesn't need to actually reach or even be defined at that point — the limit only cares about nearby behavior. For continuous functions, finding limits is simple: just plug in the value. And most importantly, the derivative is itself defined as a limit — the limit of the secant slope as the two points merge into one.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Review question 1: Limit intuition
    <StackLayout key="layout-practice-question-intuition" maxWidth="xl">
        <Block id="practice-question-intuition" padding="sm">
            <EditableParagraph id="para-practice-question-intuition" blockId="practice-question-intuition">
                <strong>Question 1:</strong> When we write{" "}
                <InlineFormula latex="\lim_{x \to a} f(x) = L" colorMap={{}} />
                , we mean that as x gets closer to a, f(x){" "}
                <InlineFeedback
                    varName="answerLimitIntuition"
                    correctValue="approaches"
                    position="mid"
                    successMessage="✓"
                    failureMessage="✗"
                    hint="Remember: limits are about getting arbitrarily close, not necessarily equal"
                    reviewBlockId="limits-concept"
                    reviewLabel="Review: What is a Limit?"
                >
                    <InlineClozeChoice
                        varName="answerLimitIntuition"
                        correctAnswer="approaches"
                        options={["equals", "approaches", "jumps to"]}
                        {...choicePropsFromDefinition(getVariableInfo('answerLimitIntuition'))}
                    />
                </InlineFeedback>{" "}
                the value L.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Closing message
    <StackLayout key="layout-practice-closing" maxWidth="xl">
        <Block id="practice-closing" padding="md">
            <EditableParagraph id="para-practice-closing" blockId="practice-closing">
                You now have a solid foundation in limits — the cornerstone of calculus. Every time you compute a derivative, you're secretly computing a limit. Every time you find an integral, you're taking a limit of sums. Limits are everywhere in calculus, and now you understand what they really mean: getting arbitrarily close to a value, even if you never quite reach it.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
