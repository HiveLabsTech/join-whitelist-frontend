import { Provider } from "jotai";
import { type PropsWithChildren } from "react";

export const AllTheProviders = ({ children }: PropsWithChildren) => {
    return (

        <Provider>{children}</Provider>

    )
}