import{j as a}from"./index-CoQkRR_y.js";import{r as p}from"./iframe-CRwxOtmY.js";import{M as q}from"./MultiSelect-CEYF9oPw.js";import{c}from"./createLucideIcon-xFbtuuOA.js";import"./index-ByvAETHJ.js";function b({items:e,childrenKey:o,selectedItem:r,onSelectedItemChange:d,selectedSubItems:m,onSelectedSubItemsChange:s,label:l,placeholder:h,subLabel:I,subPlaceholder:f,showSelectAll:x,subItemsLayout:v="list",classNames:t}){const C=n=>{const i=e.find(T=>T.id===parseInt(n,10))||null;d(i),s([])},w=p.useMemo(()=>{if(!r)return[];const n=r[o];return Array.isArray(n)?n.map(i=>({label:i.name,value:i.id.toString()})):[]},[r,o]);return a.jsx("div",{className:c("space-y-4 w-full max-w-md mx-auto p-4",t==null?void 0:t.container),children:a.jsxs("div",{className:"space-y-2",children:[l&&a.jsx("label",{className:"text-sm font-medium text-foreground",children:l}),a.jsxs("select",{className:c("w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground border-input shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",t==null?void 0:t.mainSelect),onChange:n=>C(n.target.value),value:(r==null?void 0:r.id)??"",children:[a.jsx("option",{value:"",children:h||"Select…"}),e.map(n=>a.jsx("option",{value:n.id,children:n.name},n.id))]}),r&&a.jsxs("div",{className:c("mt-4 space-y-2",t==null?void 0:t.subItemContainer),children:[a.jsx("label",{className:"text-sm font-medium text-foreground",children:I||`${r.name} Sub Items`}),a.jsx(q,{options:w,value:m.map(String),onChange:n=>s(n.map(i=>parseInt(i,10))),placeholder:f,showSelectAll:x,layout:v,classNames:{option:t==null?void 0:t.subItemOption}})]})]})})}b.__docgenInfo={description:"",methods:[],displayName:"DataMultiSelect",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:""},childrenKey:{required:!0,tsType:{name:"K"},description:""},selectedItem:{required:!0,tsType:{name:"union",raw:"T | null",elements:[{name:"T"},{name:"null"}]},description:""},onSelectedItemChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(item: T | null) => void",signature:{arguments:[{type:{name:"union",raw:"T | null",elements:[{name:"T"},{name:"null"}]},name:"item"}],return:{name:"void"}}},description:""},selectedSubItems:{required:!0,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:""},onSelectedSubItemsChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(ids: number[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"number"}],raw:"number[]"},name:"ids"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"string"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},subLabel:{required:!1,tsType:{name:"string"},description:""},subPlaceholder:{required:!1,tsType:{name:"string"},description:""},showSelectAll:{required:!1,tsType:{name:"boolean"},description:""},subItemsLayout:{required:!1,tsType:{name:"union",raw:'"list" | "grid-cols-2" | "grid-cols-3"',elements:[{name:"literal",value:'"list"'},{name:"literal",value:'"grid-cols-2"'},{name:"literal",value:'"grid-cols-3"'}]},description:"",defaultValue:{value:'"list"',computed:!1}},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{\r
  container?: string;\r
  mainSelect?: string;\r
  subItemContainer?: string;\r
  subItemOption?: string;\r
}`,signature:{properties:[{key:"container",value:{name:"string",required:!1}},{key:"mainSelect",value:{name:"string",required:!1}},{key:"subItemContainer",value:{name:"string",required:!1}},{key:"subItemOption",value:{name:"string",required:!1}}]}},description:""}}};const j=[{id:1,name:"Fruits",children:[{id:101,name:"Apple"},{id:102,name:"Banana"},{id:103,name:"Orange"}]},{id:2,name:"Vegetables",children:[{id:201,name:"Carrot"},{id:202,name:"Broccoli"}]}],k={title:"Components/DataMultiSelect",component:b,tags:["autodocs"],argTypes:{items:{control:!1},childrenKey:{control:"text",description:"Key in the item object that contains the children array"},selectedItem:{control:!1},selectedSubItems:{control:!1},onSelectedItemChange:{action:"selected item changed"},onSelectedSubItemsChange:{action:"selected sub items changed"},label:{control:"text"},placeholder:{control:"text"},subLabel:{control:"text"},subPlaceholder:{control:"text"},showSelectAll:{control:"boolean"},subItemsLayout:{control:{type:"radio"},options:["list","grid-cols-2","grid-cols-3"]},classNames:{control:!1}}},u={args:{items:j,childrenKey:"children",selectedItem:null,selectedSubItems:[],label:"Category",placeholder:"Select a category",subLabel:"Select sub-items",subPlaceholder:"Select sub-items...",showSelectAll:!0,subItemsLayout:"list",classNames:{container:"space-y-4 w-full max-w-md mx-auto p-4",mainSelect:"border border-gray-300",subItemContainer:"border border-gray-200 rounded-md p-2",subItemOption:"text-sm text-gray-700"}},render:e=>{const[o,r]=p.useState(e.selectedItem),[d,m]=p.useState(e.selectedSubItems);return a.jsx(b,{...e,selectedItem:o,onSelectedItemChange:s=>{var l;r(s),(l=e.onSelectedItemChange)==null||l.call(e,s)},selectedSubItems:d,onSelectedSubItemsChange:s=>{var l;m(s),(l=e.onSelectedSubItemsChange)==null||l.call(e,s)}})}};var g,S,y;u.parameters={...u.parameters,docs:{...(g=u.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    items,
    childrenKey: "children",
    // ✅ REQUIRED for DataMultiSelect to find sub-items
    selectedItem: null,
    selectedSubItems: [],
    label: "Category",
    placeholder: "Select a category",
    subLabel: "Select sub-items",
    subPlaceholder: "Select sub-items...",
    showSelectAll: true,
    subItemsLayout: "list",
    classNames: {
      container: "space-y-4 w-full max-w-md mx-auto p-4",
      mainSelect: "border border-gray-300",
      subItemContainer: "border border-gray-200 rounded-md p-2",
      subItemOption: "text-sm text-gray-700"
    }
  },
  render: args => {
    const [selectedItem, setSelectedItem] = useState(args.selectedItem);
    const [selectedSubItems, setSelectedSubItems] = useState<number[]>(args.selectedSubItems);
    return <DataMultiSelect {...args} selectedItem={selectedItem} onSelectedItemChange={item => {
      setSelectedItem(item);
      args.onSelectedItemChange?.(item);
    }} selectedSubItems={selectedSubItems} onSelectedSubItemsChange={subIds => {
      setSelectedSubItems(subIds);
      args.onSelectedSubItemsChange?.(subIds);
    }} />;
  }
}`,...(y=(S=u.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};const E=["Default"];export{u as Default,E as __namedExportsOrder,k as default};
