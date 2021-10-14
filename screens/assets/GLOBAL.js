import { useRef } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const GLOBALFunction = () => {
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    const tabBarRatio = 0.10
    const contentRatio = 1 - tabBarRatio
    const spotifyTabBarRatio = 0.08
    const spotifyContentRatio = 1 - spotifyTabBarRatio
    
    const GLOBAL = {}
    
    GLOBAL.screenHeight = screenHeight
    GLOBAL.screenWidth = screenWidth
    GLOBAL.tabBarHeight = tabBarRatio * screenHeight
    GLOBAL.contentHeight = contentRatio * screenHeight
    GLOBAL.tabBarWidth = screenWidth
    GLOBAL.contentWidth = screenWidth
    GLOBAL.spotifyTabBarHeight = spotifyTabBarRatio * screenHeight
    GLOBAL.spotifyContentHeight = spotifyContentRatio * screenHeight
    GLOBAL.spotifyTabBarWidth = screenWidth
    GLOBAL.spotifyContentWidth = screenWidth
    GLOBAL.spotifyPlayerHeight = 75
    if (getStatusBarHeight() > 30) {
        GLOBAL.statusBarHeight = 0
    } else {
        GLOBAL.statusBarHeight = getStatusBarHeight()
    }

    return (GLOBAL)
}
const GLOBAL = GLOBALFunction()

const SPOTIFYFunction = (theme) => {
    const result = {}
    result.textSize1 = 25
    result.textSize2 = 20
    result.textSize3 = 17
    result.textSize4 = 15
    result.textSize5 = 12
    result.iconSize1 = 25
    result.iconSize2 = 22

    result.backgroundColor = 'white'
    result.backgroundColorInverse = 'black'
    result.primaryFontColor = 'black'
    result.secondaryFontColor = 'grey'

    if (theme == 'dark') {
        result.backgroundColor = 'black'
        result.backgroundColorInverse = 'white'
        result.primaryFontColor = 'white'
        result.secondaryFontColor = 'grey'
    }

    return result
}
const SPOTIFY = SPOTIFYFunction('dark')


export { GLOBAL, SPOTIFY };
