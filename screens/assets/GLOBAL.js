import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

console.log(getStatusBarHeight())
const GLOBALFunction = () => {
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    const tabBarRatio = 0.10
    const contentRatio = 1 - tabBarRatio

    const GLOBAL = {}
    GLOBAL.screenHeight = screenHeight
    GLOBAL.screenWidth = screenWidth
    GLOBAL.tabBarHeight = tabBarRatio * screenHeight
    GLOBAL.contentHeight = contentRatio * screenHeight
    GLOBAL.tabBarWidth = screenWidth
    GLOBAL.contentWidth = screenWidth
    if (getStatusBarHeight() > 30){
        GLOBAL.statusBarHeight = 0
    }else{
        GLOBAL.statusBarHeight = getStatusBarHeight()
    }

    return (GLOBAL)
}
const GLOBAL = GLOBALFunction()

export { GLOBAL };