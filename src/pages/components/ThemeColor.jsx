import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CiGrid41 } from "react-icons/ci";
import FormContext from "@/context/FormContext";

const ThemeColor = () => {
  const colors = [
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
    "#CC80CC",
  ];

  const { formData, setFormData } = useContext(FormContext);

  const [open, setOpen] = useState(false);

  const onSelectColor = (color) => {
    setFormData({ ...formData, themeColor: color });
    setOpen(false);
  };
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          {" "}
          <div
            className={`flex items-center gap-2 border border-gray-400 rounded-md p-2 w-[6rem] `}
          >
            <CiGrid41 className="text-xl" />
            <p className="font-medium">Theme</p>
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex flex-wrap w-[200px] gap-5 ml-5">
          {colors.map((item, index) => (
            <div
              onClick={() => {
                onSelectColor(item), setOpen(!open);
              }}
              className="w-10 h-10 rounded-full cursor-pointer hover:border-2 border-black"
              key={index}
              style={{ background: item }}
            ></div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ThemeColor;
