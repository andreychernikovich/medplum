import { StyleSheet } from "react-native";
import {COLORS} from "@constants/colors";

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: 70,
        height: 40,
        backgroundColor: COLORS.primaryDark,
        position: 'absolute',
        top: -200,
        right: 0
    },
    title: {
        fontSize: 12,
        lineHeight: 16,
    }
});

export default style;
