import { MutableRefObject, useContext, useEffect, useRef, MouseEvent } from "react"
import { ThemeContext, themeTypeForContext, widContextType } from '../App';
import { newWidContext } from "../App"
import { useSelector, useDispatch } from 'react-redux'
import { categoryTS } from '../types'
import { RootState } from '../utils/store'
import { newWidget } from "../utils/categorySlice"

const NewWidget = () => {
    let dispatchRD = useDispatch()
    let {theme} = useContext(ThemeContext) as themeTypeForContext
    let {newWidVisible, resetNewWid, newWidCategory} = useContext(newWidContext) as widContextType
    let catList: categoryTS[] = useSelector((state: RootState) => state.categories.value)
    let wrapperRef = useRef<HTMLDivElement>(null)
    function outsideClicker(ref: MutableRefObject<HTMLDivElement>) {
        useEffect(() => {
          function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
              resetNewWid(false)
            }
          }
          document.addEventListener("mousedown", handleClickOutside as (event: any) => void);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside as (event: any) => void);
          };
        }, [ref]);
    }
    outsideClicker(wrapperRef as MutableRefObject<HTMLDivElement>)  
    useEffect(() => {
      localStorage.setItem("categories-local", JSON.stringify(catList))
    }, [catList])
  return (
    <div className={`${newWidVisible ? "": "hidden"} cursor-pointer fixed top-16 flex justify-center items-center h-full w-full z-20 backdrop-blur ${theme ? "bg-black/50" : "bg-slate-400/50"} `}>
        <div ref={wrapperRef} className={`${theme ? "bg-slate-800": "bg-slate-100"} z-30 w-1/2 cursor-default relative p-4 rounded-xl shadow-2xl`}>
            <div>
                <span className="text-2xl">Create a New Widget for {catList[newWidCategory]?.name}</span>
                <button onClick={() => {resetNewWid(false)}} className="float-right transition-colors duration-500  bg-rose-400 text-2xl py-2 px-4 text-white top-2 hover:bg-rose-600">X</button>    
            </div>
            <div className="text-white flex flex-row mt-8 mb-4 justify-center">
                <button onClick={() => {{
                    dispatchRD(newWidget(newWidCategory))
                    resetNewWid(false)
                }}} className="bg-emerald-400 hover:bg-emerald-600">Yes</button>
                <button onClick={() => {resetNewWid(false)}} className="bg-red-500 ml-16 hover:bg-red-700">No</button>
            </div>
        </div>
    </div>
  )
}

export default NewWidget