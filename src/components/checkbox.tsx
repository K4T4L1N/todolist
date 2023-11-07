import React from "react"
import { useState } from "react"

export const Checkbox = () => {
    const [isChecked, setIsChecked] = useState(false)
    return (

        <input type="checkbox" id="checkbox" checked={isChecked}/>


    )
  }     
