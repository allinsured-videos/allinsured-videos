import React from "react";
import { Composition } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import {
  BenefitsScene,
  CtaScene,
  HookScene,
  OfferScene,
  ProofScene,
} from "./Scenes";

const T = 12;

export const BlackFridayReel: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Hook" durationInFrames={90}>
      <HookScene />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition
      presentation={slide({ direction: "from-right" })}
      timing={linearTiming({ durationInFrames: T })}
    />
    <TransitionSeries.Sequence name="Oferta" durationInFrames={110}>
      <OfferScene />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition
      presentation={wipe({ direction: "from-bottom" })}
      timing={linearTiming({ durationInFrames: T })}
    />
    <TransitionSeries.Sequence name="Beneficios" durationInFrames={110}>
      <BenefitsScene />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition
      presentation={slide({ direction: "from-bottom" })}
      timing={linearTiming({ durationInFrames: T })}
    />
    <TransitionSeries.Sequence name="Numeros" durationInFrames={90}>
      <ProofScene />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: T })}
    />
    <TransitionSeries.Sequence name="CTA" durationInFrames={110}>
      <CtaScene />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);

// 90+110+110+90+110 - 4*12 = 462 frames (~15,4 s)
export const MyComposition = () => (
  <Composition
    id="BlackFridayReel"
    component={BlackFridayReel}
    durationInFrames={462}
    fps={30}
    width={1080}
    height={1920}
  />
);
