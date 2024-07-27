import SigninButton from "../SigninButton/SigninButton"
import classNames from "classnames"

export default function PageContentHeader() {
    return (
        <div className={classNames("w-[1200px] mx-auto py-[25px] flex justify-end fixed left-[50%] translate-x-[-50%] bg-[#fff]")}>
            <SigninButton />
        </div>
    )
}