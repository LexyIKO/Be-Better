// icon:arrow-back-circle-outline | Ionicons https://ionicons.com/ | Ionic Framework
import * as React from "react";
import Svg, { Path } from "react-native-svg";

function IconArrowBackCircleOutline(props) {
  return (
    <Svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M249.38 336L170 256l79.38-80M181.03 256H342"
      />
      <Path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
      />
    </Svg>
  );
}

export default IconArrowBackCircleOutline;
