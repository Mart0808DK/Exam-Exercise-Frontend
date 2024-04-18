import {SpinnerDotted} from "spinners-react";

function LoadingSpinner({size}: {size?: number}) {
    return (
        <SpinnerDotted
            size={size ? size : 60}
            thickness={180}
            speed={157}
            color="rgba(220, 38, 38, 1)"
        />
    );
}

export default LoadingSpinner;