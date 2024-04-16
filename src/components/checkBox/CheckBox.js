// import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
// import React, { useState } from "react";
// import { useController } from "react-hook-form";

// const CheckBox = ({ control, className, label, quantity, ...props }) => {
//   const { field } = useController({
//     control,
//     name: props.name,
//     defaultValue: "",
//   });
//   const [showQuantity, setShowQuantity] = useState(false);
//   return (
//     <div>
//       <div className={`${className} shadow-lg flex items-center`}>
//         <FormGroup>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 {...props}
//                 {...field}
//                 onChange={(e) => setShowQuantity(!showQuantity)}
//               />
//             }
//             label={label}
//           />
//         </FormGroup>
//         {quantity && showQuantity && (
//           <div>
//             <input
//               type="number"
//               placeholder="Số lượng"
//               className={`border w-[90px] p-1 rounded-lg outline-none opacity-0 ${
//                 showQuantity ? "opacity-100" : ""
//               } transition-opacity`}
//               name="quantitySize"
//               id="quantitySize"
//               min={0}
//               {...props}
//               {...field}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CheckBox;
