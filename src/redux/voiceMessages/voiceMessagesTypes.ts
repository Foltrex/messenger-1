import {IPlainDataAction} from "../redux-types";

export interface IVoiceMessagesStateOpt {
    isRecording?: boolean;
    audioRecorder?: MediaRecorder | null;
    chunks?: ArrayBuffer[]
}

export interface  IVoiceMessagesState extends IVoiceMessagesStateOpt {
    isRecording: boolean;
    audioRecorder: MediaRecorder | null;
    chunks: ArrayBuffer[]
}

export type TVoiceMessengerAction = IPlainDataAction<IVoiceMessagesState>;

export const SET_IS_RECORDING = 'SET_IS_RECORDING';
export const SET_AUDIO_RECORDER = 'SET_AUDIO_RECORDER';
export const SET_CHUNKS = 'SET_CHUNKS';
