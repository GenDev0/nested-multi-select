import{j as i}from"./index-CoQkRR_y.js";import{r as S}from"./iframe-CRwxOtmY.js";import{a as w,u as D,c as u,P}from"./createLucideIcon-xFbtuuOA.js";import"./index-ByvAETHJ.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],R=w("chevron-down",T);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],F=w("chevron-right",z);function y({options:c,value:a,onChange:m,placeholder:p="Select…",classNames:o={}}){const{open:x,setOpen:q,triggerRef:C,dropdownRef:j,styles:N}=D(),[M,b]=S.useState({}),V=e=>{b(n=>({...n,[e]:!n[e]}))},g=e=>c.find(n=>n.id===e),A=e=>{var l;const n=g(e);if(!((l=n==null?void 0:n.children)!=null&&l.length))return!1;const r=a.find(t=>t.itemId===e);return(r==null?void 0:r.subItemIds.length)===n.children.length},E=e=>{var t;const n=g(e);if(!((t=n==null?void 0:n.children)!=null&&t.length))return!1;const r=a.find(s=>s.itemId===e);if(!r)return!1;const l=r.subItemIds.length;return l>0&&l<n.children.length},O=(e,n)=>{const r=a.find(l=>l.itemId===e);return(r==null?void 0:r.subItemIds.includes(n))??!1},_=e=>{var s;const n=g(e);if(!n)return;const r=((s=n.children)==null?void 0:s.map(d=>d.id))??[],l=a.find(d=>d.itemId===e);if(l&&l.subItemIds.length===r.length)m(a.filter(d=>d.itemId!==e));else{const d=a.filter(f=>f.itemId!==e);d.push({itemId:e,subItemIds:r}),m(d),b(f=>({...f,[e]:!0}))}},B=(e,n)=>{const r=a.find(s=>s.itemId===e);if(!r){m([...a,{itemId:e,subItemIds:[n]}]),b(s=>({...s,[e]:!0}));return}const t=r.subItemIds.includes(n)?r.subItemIds.filter(s=>s!==n):[...r.subItemIds,n];t.length===0?m(a.filter(s=>s.itemId!==e)):m(a.map(s=>s.itemId===e?{...s,subItemIds:t}:s))},L=a.length>0?a.map(e=>{const n=g(e.itemId);return(n==null?void 0:n.name)||""}).filter(Boolean).join(", "):p;return i.jsxs("div",{ref:C,className:u("relative",o.container),"data-testid":"nested-multi-select",children:[i.jsx("button",{type:"button",onClick:()=>q(!x),className:u("w-full border rounded-md px-3 py-2 text-left text-sm bg-background text-foreground border-input shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",a.length===0?"text-muted-foreground":"",o.trigger),children:L}),i.jsx(P,{open:x,dropdownRef:j,styles:N,className:u("mt-1 max-h-72 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md p-2 space-y-1",o.dropdown),children:c.map(e=>{const n=A(e.id),r=E(e.id),l=M[e.id]??!1;return i.jsxs("div",{className:"space-y-1",children:[i.jsxs("div",{className:"flex items-center justify-between px-2 py-1 rounded hover:bg-muted text-sm",children:[i.jsxs("label",{className:u("flex items-center gap-2 cursor-pointer",o.item),onClick:t=>t.preventDefault(),children:[i.jsx("input",{type:"checkbox",checked:n,ref:t=>{t&&(t.indeterminate=r)},onChange:()=>_(e.id),className:u("h-4 w-4 rounded border",o.itemCheckbox),onClick:t=>t.stopPropagation()}),i.jsx("span",{className:o.itemLabel,children:e.name})]}),e.children&&e.children.length>0&&i.jsx("button",{type:"button","aria-label":l?"Collapse":"Expand",onClick:t=>{t.stopPropagation(),V(e.id)},className:u("p-1 rounded hover:bg-muted focus:outline-none",o.expandButton),children:l?i.jsx(R,{size:16}):i.jsx(F,{size:16})})]}),e.children&&l&&i.jsx("div",{className:u("pl-6 space-y-1",o.childrenContainer),children:e.children.map(t=>{const s=O(e.id,t.id);return i.jsxs("label",{className:u("flex items-center gap-2 cursor-pointer text-sm rounded hover:bg-muted px-2 py-1",o.child),children:[i.jsx("input",{type:"checkbox",checked:s,onChange:()=>B(e.id,t.id),className:u("h-4 w-4 rounded border",o.childCheckbox),onClick:d=>d.stopPropagation()}),i.jsx("span",{className:o.childLabel,children:t.name})]},t.id)})})]},e.id)})})]})}y.__docgenInfo={description:"",methods:[],displayName:"NestedMultiSelect",props:{options:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: number;
  name: string;
  children?: NestedMultiSelectOption[];
}`,signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"children",value:{name:"Array",elements:[{name:"NestedMultiSelectOption"}],raw:"NestedMultiSelectOption[]",required:!1}}]}}],raw:"NestedMultiSelectOption[]"},description:""},value:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  itemId: number;
  subItemIds: number[];
}`,signature:{properties:[{key:"itemId",value:{name:"number",required:!0}},{key:"subItemIds",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}}]}}],raw:`{
  itemId: number;
  subItemIds: number[];
}[]`},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: NestedMultiSelectValue) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  itemId: number;
  subItemIds: number[];
}`,signature:{properties:[{key:"itemId",value:{name:"number",required:!0}},{key:"subItemIds",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}}]}}],raw:`{
  itemId: number;
  subItemIds: number[];
}[]`},name:"value"}],return:{name:"void"}}},description:""},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Select…"',computed:!1}},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  container?: string;
  trigger?: string;
  dropdown?: string;
  item?: string;
  itemCheckbox?: string;
  itemLabel?: string;
  childrenContainer?: string;
  child?: string;
  childCheckbox?: string;
  childLabel?: string;
  expandButton?: string;
}`,signature:{properties:[{key:"container",value:{name:"string",required:!1}},{key:"trigger",value:{name:"string",required:!1}},{key:"dropdown",value:{name:"string",required:!1}},{key:"item",value:{name:"string",required:!1}},{key:"itemCheckbox",value:{name:"string",required:!1}},{key:"itemLabel",value:{name:"string",required:!1}},{key:"childrenContainer",value:{name:"string",required:!1}},{key:"child",value:{name:"string",required:!1}},{key:"childCheckbox",value:{name:"string",required:!1}},{key:"childLabel",value:{name:"string",required:!1}},{key:"expandButton",value:{name:"string",required:!1}}]}},description:"",defaultValue:{value:"{}",computed:!1}}}};const $=[{id:1,name:"Fruits",children:[{id:101,name:"Apple"},{id:102,name:"Banana"},{id:103,name:"Orange"}]},{id:2,name:"Vegetables",children:[{id:201,name:"Carrot"},{id:202,name:"Broccoli"}]}],Q={title:"Components/NestedMultiSelect",component:y,tags:["autodocs"],argTypes:{options:{control:!1},value:{control:!1},onChange:{action:"changed"},placeholder:{control:"text"}}},h={args:{options:$,value:[],placeholder:"Select items"},render:c=>{const[a,m]=S.useState(c.value||[]);return i.jsx(y,{...c,value:a,onChange:p=>{var o;m(p),(o=c.onChange)==null||o.call(c,p)}})}};var I,v,k;h.parameters={...h.parameters,docs:{...(I=h.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    options,
    value: [],
    placeholder: "Select items"
  },
  render: args => {
    const [value, setValue] = useState<NestedMultiSelectValue>(args.value || []);
    return <NestedMultiSelect {...args} value={value} onChange={val => {
      setValue(val);
      args.onChange?.(val);
    }} />;
  }
}`,...(k=(v=h.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};const U=["Default"];export{h as Default,U as __namedExportsOrder,Q as default};
