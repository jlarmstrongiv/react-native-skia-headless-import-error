import {
  Paragraph,
  Skia,
  TextAlign,
  useFonts,
} from "@shopify/react-native-skia/lib/commonjs/index.js";
import { useMemo } from "react";

export const MyParagraph = () => {
  const customFontMgr = useFonts({
    Roboto: [
      // doesn't matter if these don’t exist, since the `useFonts` import doesn't work anyway
      require("path/to/Roboto-Regular.ttf"),
      require("path/to/Roboto-Medium.ttf"),
    ],
  });
  const paragraph = useMemo(() => {
    // Are the font loaded already?
    if (!customFontMgr) {
      return null;
    }
    const paragraphStyle = {
      textAlign: TextAlign.Center,
    };
    const textStyle = {
      color: Skia.Color("black"),
      fontFamilies: ["Roboto"],
      fontSize: 50,
    };
    return Skia.ParagraphBuilder.Make(paragraphStyle, customFontMgr)
      .pushStyle(textStyle)
      .addText("Say Hello to ")
      .pushStyle({ ...textStyle, fontStyle: { weight: 500 } })
      .addText("Skia 🎨")
      .pop()
      .build();
  }, [customFontMgr]);
  // Render the paragraph
  return <Paragraph paragraph={paragraph} x={0} y={0} width={300} />;
};
