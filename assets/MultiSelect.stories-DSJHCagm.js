import{j as m}from"./index-CoQkRR_y.js";import{r as h}from"./iframe-CRwxOtmY.js";import{M as r}from"./MultiSelect-CEYF9oPw.js";import"./index-ByvAETHJ.js";import"./createLucideIcon-xFbtuuOA.js";const v=[{label:"Option One",value:"1"},{label:"Option Two",value:"2"},{label:"Option Three",value:"3"}],w={title:"Components/MultiSelect",component:r,tags:["autodocs"],argTypes:{options:{control:!1},value:{control:{type:"multi-select"},description:"Selected option values"},onChange:{action:"changed"},placeholder:{control:"text"},showSelectAll:{control:"boolean"},layout:{control:{type:"radio"},options:["list","grid-cols-2","grid-cols-3"]}}},l={args:{options:v,value:[],placeholder:"Select options",showSelectAll:!0,layout:"list"},render:e=>{const[a,s]=h.useState(e.value||[]);return m.jsx(r,{...e,value:a,onChange:t=>{var o;s(t),(o=e.onChange)==null||o.call(e,t)}})}},n={args:{options:v,value:["1","3"],placeholder:"Select options",showSelectAll:!1,layout:"grid-cols-3"},render:e=>{const[a,s]=h.useState(e.value||[]);return m.jsx(r,{...e,value:a,onChange:t=>{var o;s(t),(o=e.onChange)==null||o.call(e,t)}})}};var c,u,i;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    options,
    value: [],
    placeholder: "Select options",
    showSelectAll: true,
    layout: "list"
  },
  render: args => {
    const [selected, setSelected] = useState<string[]>(args.value || []);
    return <MultiSelect {...args} value={selected} onChange={val => {
      setSelected(val);
      args.onChange?.(val);
    }} />;
  }
}`,...(i=(u=l.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};var d,p,S;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    options,
    value: ["1", "3"],
    placeholder: "Select options",
    showSelectAll: false,
    layout: "grid-cols-3"
  },
  render: args => {
    const [selected, setSelected] = useState<string[]>(args.value || []);
    return <MultiSelect {...args} value={selected} onChange={val => {
      setSelected(val);
      args.onChange?.(val);
    }} />;
  }
}`,...(S=(p=n.parameters)==null?void 0:p.docs)==null?void 0:S.source}}};const A=["Default","GridLayout"];export{l as Default,n as GridLayout,A as __namedExportsOrder,w as default};
