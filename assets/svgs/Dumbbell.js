import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Dumbbell(props){
    return(
        <Svg {...props} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M33.426 23.148L36 20.574L33.426 18L27 24.426L11.574 9L18 2.574L15.426 0L12.852 2.574L10.278 0L6.426 3.852L3.852 1.278L1.278 3.852L3.852 6.426L0 10.278L2.574 12.852L0 15.426L2.574 18L9 11.574L24.426 27L18 33.426L20.574 36L23.148 33.426L25.722 36L29.574 32.148L32.148 34.722L34.722 32.148L32.148 29.574L36 25.722L33.426 23.148Z" fill="#AEE1DA"/>
        </Svg>

    )
}

export default Dumbbell;
