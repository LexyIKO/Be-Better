// icon:home-circle-outline | Material Design Icons https://materialdesignicons.com/ | Austin Andrews
import * as React from "react";
import Svg, { Path } from "react-native-svg";

function IconHomeCircleOutline(props) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <Path d="M12 20c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8m0-18C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2m-1 12h2v3h3v-5h2l-6-5-6 5h2v5h3v-3" />
    </Svg>
  );
}

export default IconHomeCircleOutline;
