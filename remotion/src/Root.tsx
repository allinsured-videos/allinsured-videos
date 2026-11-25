import { Composition, Folder } from "remotion";
import { MyComposition } from "./Composition";
import { V1, V2, V3, V4, V5, V6, V7, s1, s2, s3, s4, s5, s6, s7, total } from "./semana1/Videos";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Folder name="Semana1">
        <Composition id="S1-Reajuste" component={V1} durationInFrames={total(s1)} fps={30} width={1080} height={1920} />
        <Composition id="S2-TresSinais" component={V2} durationInFrames={total(s2)} fps={30} width={1080} height={1920} />
        <Composition id="S3-Case22" component={V3} durationInFrames={total(s3)} fps={30} width={1080} height={1920} />
        <Composition id="S4-Mitos" component={V4} durationInFrames={total(s4)} fps={30} width={1080} height={1920} />
        <Composition id="S5-CNPJ" component={V5} durationInFrames={total(s5)} fps={30} width={1080} height={1920} />
        <Composition id="S6-MelhorPlano" component={V6} durationInFrames={total(s6)} fps={30} width={1080} height={1920} />
        <Composition id="S7-Renovacao" component={V7} durationInFrames={total(s7)} fps={30} width={1080} height={1920} />
      </Folder>
    </>
  );
};
