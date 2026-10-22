"use client";

import { createContext, useContext } from "react";

/** True once the opening countdown has finished (or was skipped). Page entrances wait for it. */
export const IntroContext = createContext(false);

export const useIntroReady = () => useContext(IntroContext);
