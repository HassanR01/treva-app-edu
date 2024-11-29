import { StyleSheet } from "react-native"
import { Colors } from "./Colors"
import { Fonts } from "./Fonts"


export const ConstantStyles = StyleSheet.create({
    page: {
        backgroundColor: Colors.bgColor,
        padding: 10,
        width: '100%'
    },

    Title1: {
        fontSize: 32,
        color: Colors.mainColor,
        fontFamily: Fonts.boldText,
        textAlign: 'right',
    },

    Title2: {
        fontSize: 26,
        color: Colors.textColor,
        fontFamily: Fonts.mediumText,
        textAlign: 'right',
        marginBottom: 5,
    },

    Title3: {
        fontSize: 20,
        color: Colors.textColor,
        fontFamily: Fonts.boldText,
        textAlign: 'right',
    },

    normalText: {
        fontFamily: Fonts.regularText,
        fontSize: 20,
        color: Colors.textColor,
        textAlign: 'right'
    },

    btn: {
        fontFamily: Fonts.boldText,
        backgroundColor: Colors.mainColor,
        color: Colors.bgColor,
        padding: 10,
        width: 200,
        fontSize: 28,
        borderRadius: 5,
        textAlign: 'center',
        marginVertical: 20,
        shadowOpacity: 0.4,
    },

    lableText: {
        marginBottom: 10,
        textAlign: 'right',
        fontFamily: Fonts.regularText,
        fontSize: 24,
        color: Colors.textColor
    },

    inputText: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 3,
        fontSize: 24,
        fontFamily: Fonts.mediumText,
        marginBottom: 10,
        width: "100%",
        textAlign: 'right',
    }

})