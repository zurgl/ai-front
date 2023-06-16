// import { introductionAtom } from "@/store";
// import { useState } from "react";
// import { useAtom } from "jotai";

// interface EditableProps {
//   toggle?: boolean;
//   value: string;
// }

// const withEditable = <P extends EditableProps>(
//   WrappedComponent: React.ComponentType<P>
// ): React.FC<P> => {
//   return function EditableComponent(props: P) {
//     const [toggle, setToggle] = useState(true);
//     const [value, setValue] = useState(props.value);

//     return (
//       <div>
//         {toggle ? (
//           <div
//             onDoubleClick={() => {
//               setToggle(false);
//             }}
//           >
//             <WrappedComponent {...props} value={value} />
//           </div>
//         ) : (
//           <input
//             type="text"
//             value={value}
//             onChange={(event) => {
//               setValue(event.target.value);
//             }}
//             className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl max-w-md opacity-100 bg-slate-900"
//             onKeyDown={(event) => {
//               if (event.key === "Enter" || event.key === "Escape") {
//                 setToggle(true);
//                 event.preventDefault();
//                 event.stopPropagation();
//               }
//             }}
//           />
//         )}
//       </div>
//     );
//   };
// };

// const FullName: React.FC<EditableProps> = ({ value }: { value: string }) => {
//   return (
//     <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
//       {value}
//     </h1>
//   );
// };

// const Position: React.FC<EditableProps> = ({ value }: { value: string }) => {
//   return (
//     <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
//       {value}
//     </h2>
//   );
// };

// const Description: React.FC<EditableProps> = ({ value }: { value: string }) => {
//   return <p className="mt-4 max-w-xs leading-normal">{value}</p>;
// };

// const FullNameC = withEditable(FullName);
// const PositionC = withEditable(Position);
// const DescriptionC = withEditable(Description);

// export default function Introduction() {
//   const [introduction] = useAtom(introductionAtom);
//   return (
//     <div>
//       <FullNameC value={introduction.fullName} />
//       <PositionC value={introduction.position} />
//       <DescriptionC value={introduction.shortDescription} />
//     </div>
//   );
// }
export const version = "0"