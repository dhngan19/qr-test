import Frame01 from "./Frame01"
import Frame02 from "./Frame02"
import Frame03 from "./Frame03"

type Frames = {
    [key: string]: {
        // 'htmlElement': Promise<string>,
        'reactElement': () => JSX.Element,
        'options': {
            [key: string]: string
        }
    }
}
export const frames: Frames = {
    'frame_01': {
        // 'htmlElement': (async () => await clientRenderToString(Style01()))(),
        'reactElement': Frame01,
        'options': {
            'viewBox': '0 0 2000 2000'
        }
    },
    'frame_02': {
        'reactElement': Frame02,
        'options': {
            'viewBox': '0 0 500 500'
        }
    },
    'frame_03': {
        'reactElement': Frame03,
        'options': {
            'viewBox': '0 0 3544 3544'
        }
    }
}