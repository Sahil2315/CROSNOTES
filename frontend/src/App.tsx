import Container from "./components/Container"
import { createContext, useState } from "react"

export type themeTypeForContext = {
  theme: boolean,
  toggleTheme: (theme: boolean) => void
}

export type widContextType = {
  newWidVisible: boolean,
  resetNewWid: (newWidVisible: boolean) => void,
  newWidCategory: number,
  setNewWidCat: (newWidCategory: number) => void
}

export type changeWidContextType = {
  changeWidVisible: boolean,
  resetChangeWid: (changeWidVisible: boolean) => void,
  widRef: widgetReference,
  resetWidRef: (widRef: widgetReference) => void,
}

export type widMenuContextType = {
  widMenu: boolean,
  toggleWidMenu: (widMenu: boolean) => void
}

export let ThemeContext = createContext<themeTypeForContext | null>(null)
export let newWidContext = createContext<widContextType | null>(null)
export let changeWidContext = createContext<changeWidContextType | null>(null)
export let widMenuContext = createContext<widMenuContextType | null>(null)

export type widgetReference = {
  catIndex: number,
  widIndex: number
}

function App() {
  let [theme, toggleTheme] = useState<boolean>(false)
  let [newWidVisible, resetNewWid] = useState<boolean>(false)
  let [newWidCategory, setNewWidCat] = useState<number>(-1)
  let [changeWidVisible, resetChangeWid] = useState<boolean>(false)
  let [widRef, resetWidRef] = useState<widgetReference>({catIndex:-1, widIndex: -1})
  let [widMenu, toggleWidMenu] = useState<boolean>(false)
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <newWidContext.Provider value={{newWidVisible, resetNewWid, newWidCategory, setNewWidCat}}>
        <changeWidContext.Provider value={{changeWidVisible, resetChangeWid, widRef, resetWidRef}}>
          <widMenuContext.Provider value={{widMenu, toggleWidMenu}}>
            <Container />
          </widMenuContext.Provider>
        </changeWidContext.Provider>      
      </newWidContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
