(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(14),c=t.n(r),u=t(2),l=t.n(u),i=t(4),s=t(3),m="/api/persons",f=function(){return l.a.get(m).then((function(e){return e.data}))},d=function(e){return l.a.post(m,e).then((function(e){return e.data}))},h=function(e,n){return l.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},b=function(e){return l.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},p=function(e){var n=e.persons,t=e.setPersons,a=e.setNotification;return o.a.createElement("li",{className:"person"},n.map((function(e){return o.a.createElement("p",{key:e.name},e.name," ",e.number,o.a.createElement("button",{onClick:function(){return function(e){var o=e.id,r=e.name,c=window.confirm("Delete ".concat(r,"?"));c&&b(o).then((function(e){t(n.filter((function(e){return e.id!==o}))),a("Deleted ".concat(r))})).catch((function(e){a("information of ".concat(r," has alreaddy been removed from server")),console.log("fail to delete")})),console.log(c,o)}(e)}},"Delete"))})))},g=function(e){var n=e.onSubmit,t=e.name,a=e.number,r=e.onNameChange,c=e.onNumberChange;return o.a.createElement("form",{onSubmit:n},o.a.createElement("div",null,"name:",o.a.createElement("input",{value:t,onChange:r})),o.a.createElement("div",null,"number:",o.a.createElement("input",{value:a,onChange:c})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},v=function(e){var n=e.value,t=e.onChange;return o.a.createElement("div",null,"filter shown with:",o.a.createElement("input",{value:n,onChange:t}))},E=function(e){var n=e.message;return null===n?null:o.a.createElement("div",{className:"error"},n)},j=function(){var e=Object(a.useState)([]),n=Object(s.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),u=Object(s.a)(c,2),l=u[0],m=u[1],b=Object(a.useState)(""),j=Object(s.a)(b,2),w=j[0],O=j[1],C=Object(a.useState)(""),k=Object(s.a)(C,2),N=k[0],S=k[1],y=Object(a.useState)("Welcome to phonebook"),D=Object(s.a)(y,2),P=D[0],A=D[1];Object(a.useEffect)((function(){console.log("effect"),f().then((function(e){r(e)}))}),[]),console.log("render",t.length,"persons");var J=N?t.filter((function(e){return-1!==e.name.toLowerCase().search(N.toLowerCase())})):t;return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(E,{message:P}),o.a.createElement(v,{value:N,onChange:function(e){console.log(e.target.value),S(e.target.value)}}),o.a.createElement("h2",null,"Add a new"),o.a.createElement(g,{onSubmit:function(e){e.preventDefault();var n={name:l,number:w};if(t.find((function(e){return e.name===l}))){var a=window.confirm("".concat(l," is already added to phonebook, replace the old number with the new one?"));if(a){console.log(a);var o=t.find((function(e){return e.name===l})),c=Object(i.a)(Object(i.a)({},o),{},{number:w});console.log("changedPerson",c),h(o.id,c).then((function(e){console.log(e),r(t.map((function(n){return n.id!==e.id?n:e}))),A("Updated ".concat(l,"'s number"))})).catch((function(e){console.log("fail")}))}}else d(n).then((function(e){r(t.concat(n)),A("Added ".concat(l))}));m(""),O(""),setTimeout((function(){A(null)}),5e3)},name:l,number:w,onNameChange:function(e){m(e.target.value)},onNumberChange:function(e){O(e.target.value)}}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(p,{persons:J,setPersons:r,setNotification:A}))};t(37);l.a.get("http://localhost:3001/api/persons").then((function(e){var n=e.data;console.log(n)})),c.a.render(o.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.af9d9eae.chunk.js.map