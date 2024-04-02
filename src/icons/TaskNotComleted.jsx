import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const TaskNotCompleted = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={140}
    height={41}
    fill="none"
    {...props}
  >
    <Path
      fill="#423F3F"
      d="M0 15C0 6.716 6.716 0 15 0h110c8.284 0 15 6.716 15 15v11c0 8.284-6.716 15-15 15H15C6.716 41 0 34.284 0 26V15Z"
    />
    <Path
      fill="#333131"
      d="M0 15C0 6.716 6.716 0 15 0h55v41H15C6.716 41 0 34.284 0 26V15Z"
    />
    <Path fill="#A95C5C" d="M22 30.236 45.17 8 47 9.755 23.829 31.991z" />
    <Path
      fill="#787575"
      d="M94.108 31.176 116.02 9.264l2.121 2.122-21.912 21.911z"
    />
    <Path
      fill="#787575"
      d="M96.215 33.284 85 22.127 87.115 20l11.216 11.157z"
    />
    <Path fill="#A95C5C" d="M45.17 31.991 22 9.756 23.83 8 47 30.236z" />
  </Svg>
)
export default TaskNotCompleted