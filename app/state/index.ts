"use client"
import { atom } from "recoil"

export const secretPhraseHasBeenGenerated = atom({
	key: "secretPhraseHasBeenGenerated",
	default: false,
})

export const passwordHasBeenGenerated = atom({
	key: "passwordHasBeenGenerated",
	default: false,
})

