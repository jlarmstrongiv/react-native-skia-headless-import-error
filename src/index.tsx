import { LoadSkiaWeb } from "@shopify/react-native-skia/lib/commonjs/web/LoadSkiaWeb.js";
import {
  Group,
  Circle,
  makeOffscreenSurface,
  drawOffscreen,
  getSkiaExports,
} from "@shopify/react-native-skia/lib/commonjs/headless";
import fs from "fs-extra";
import { MyParagraph } from "./MyParagraph.js";

// failing imports, see MyParagraph.tsx
// import { useFonts } from "@shopify/react-native-skia";
// import { ImageFormat } from "@shopify/react-native-skia/lib/commonjs/index.js";

enum ImageFormat {
  JPEG = 3,
  PNG = 4,
  WEBP = 6,
}

const width = 256;
const height = 256;
const size = 50;
const r = size * 0.33;
await LoadSkiaWeb();
// Once that CanvasKit is loaded, you can access Skia via getSkiaExports()
// Alternatively you can do const {Skia} = require("@shopify/react-native-skia")
const { Skia } = getSkiaExports();
const surface = makeOffscreenSurface(width, height);
const image = drawOffscreen(
  surface,
  <>
    <Group blendMode="multiply">
      <Circle cx={r} cy={r} r={r} color="cyan" />
      <Circle cx={size - r} cy={r} r={r} color="magenta" />
      <Circle cx={size / 2} cy={size - r} r={r} color="yellow" />
    </Group>
    <MyParagraph />
  </>
);

await fs.outputFile("image.webp", image.encodeToBytes(ImageFormat.WEBP));
// Cleaning up CanvasKit resources
image.dispose();
surface.dispose();
