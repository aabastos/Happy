import { disableExpoCliLogging } from "expo/build/logs/Logs";

declare module '*.png' {
    export default "" as string;
};