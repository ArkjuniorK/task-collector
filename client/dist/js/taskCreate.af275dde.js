(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["taskCreate"],{1928:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"w-full",attrs:{id:"view-task"}},[e("main-section",{attrs:{subClass:"mx-4 h-full md:mx-32 lg:mx-48 xl:mx-10 xxl:mx-16 xxxl:mx-64"},scopedSlots:t._u([{key:"left-one",fn:function(){return[e("div",{staticClass:"btn"},[e("my-btn",{attrs:{btnClass:"flex-row-reverse p-2 focus:bg-light-200"},on:{clicked:function(s){return t.$router.back()}},scopedSlots:t._u([{key:"icon",fn:function(){return[e("div",{staticClass:"w-3 mr-2 icon"},[e("svg",{staticClass:"fill-current",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[e("polygon",{attrs:{points:"3.828 9 9.899 2.929 8.485 1.515 0 10 .707 10.707 8.485 18.485 9.899 17.071 3.828 11 20 11 20 9 3.828 9"}})])])]},proxy:!0}])},[t._v(" Kembali ")])],1)]},proxy:!0},{key:"right-one",fn:function(){return[e("div",{staticClass:"text-right title-page"},[e("span",{staticClass:"text-base font-display"},[t._v("Tugas Baru")])])]},proxy:!0},{key:"content",fn:function(){return[e("div",{staticClass:"w-full content-task xl:flex xl:mt-10"},[e("div",{staticClass:"flex items-start svg-content"},[e("task-create"),e("div",{staticClass:"flex flex-col w-full ml-3 text-left md:ml-6 xl:hidden"},[e("span",{staticClass:"text-sm font-light md:text-base"},[t._v("Buat Tugas Baru")]),e("span",{staticClass:"mt-1 text-xl font-bold md:text-2xl"},[t._v(" Buat Tugas dan Bagikan Kepada Siswa ")])])],1),e("div",{staticClass:"mt-10 xl:flex xl:items-start xl:mt-0 xl:ml-10",attrs:{id:"question-task"}},[e("div",{staticClass:"text-left xl:w-1/2 xl:mr-20",attrs:{id:"question-help"}},[e("form",{staticClass:"mx-2 xl:mx-0",attrs:{id:"add-task"},on:{submit:function(s){return s.preventDefault(),t.createTask(s)}}},[e("div",{attrs:{id:"subject-title"}},[e("div",{staticClass:"flex items-center text-sm font-display md:text-base xl:hidden",attrs:{id:"title"}},[e("div",{staticClass:"w-4 mr-2",attrs:{id:"icon"}},[e("svg",{staticClass:"fill-current",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[e("path",{attrs:{d:"M3 6c0-1.1.9-2 2-2h8l4-4h2v16h-2l-4-4H5a2 2 0 0 1-2-2H1V6h2zm8 9v5H8l-1.67-5H5v-2h8v2h-2z"}})])]),e("span",[t._v("Mata Pelajaran dan Judul Tugas")])]),e("div",{staticClass:"flex flex-col mt-6 text-left xl:mt-0 xl:w-1/2",attrs:{id:"subject-input"}},[e("div",{staticClass:"relative"},[e("input-text",{attrs:{input:"true",placeholder:"Mata Pelajaran.."},on:{clicked:function(s){t.dropdown=!t.dropdown}},scopedSlots:t._u([{key:"icon",fn:function(){return[e("button",{staticClass:"p-1 rounded-full focus:outline-none",attrs:{type:"button"},on:{click:function(s){t.dropdown=!t.dropdown}}},[e("div",{staticClass:"w-4 icon"},[e("svg",{staticClass:"w-full h-full fill-current",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[e("path",{attrs:{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}})])])])]},proxy:!0}]),model:{value:t.subject,callback:function(s){t.subject=s},expression:"subject"}}),t.dropdown?e("div",{staticClass:"absolute flex flex-col w-full px-4 py-2 mt-2 rounded shadow-sm bg-light-200",attrs:{id:"select-option"}},t._l(t.subjects,(function(s,a){return e("span",{key:a,staticClass:"p-2 cursor-pointer hover:text-dark-300 transition duration-200",on:{click:function(e){return t.select(s)}}},[t._v(t._s(s))])})),0):t._e()],1)]),e("div",{staticClass:"mt-4",attrs:{id:"title-input"}},[e("input-text",{staticClass:"font-black",attrs:{textarea:"true",txtClass:"font-black text-lg xl:text-3xl",placeholder:"Judul Tugas.."},model:{value:t.name,callback:function(s){t.name=s},expression:"name"}})],1)]),e("div",{staticClass:"mt-8",attrs:{id:"questions"}},[e("div",{staticClass:"flex items-center text-sm font-display md:text-base",attrs:{id:"title"}},[e("div",{staticClass:"w-4 mr-2",attrs:{id:"icon"}},[e("svg",{staticClass:"fill-current",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[e("path",{attrs:{d:"M20 14v4a2 2 0 0 1-2 2h-4v-2a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2H6a2 2 0 0 1-2-2v-4H2a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2V6c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v4h-2a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2z"}})])]),e("span",[t._v("Soal dan Pertanyaan")])]),e("div",{staticClass:"mt-6",attrs:{id:"help-input"}},[t._l(t.questions,(function(s,a){return e("input-text",{key:a,attrs:{parClass:"mb-4",inClass:"text-base w-full xl:text-lg",input:"true",placeholder:"Pertanyaan.."},model:{value:s.question,callback:function(e){t.$set(s,"question",e)},expression:"field.question"}})})),e("div",{staticClass:"mt-4",attrs:{id:"btn-add-input"}},[e("my-btn",{attrs:{btnType:"button",btnClass:"p-2 text-dark-300"},on:{clicked:t.addQuest},scopedSlots:t._u([{key:"icon",fn:function(){return[e("div",{staticClass:"w-4 ml-2 icon"},[e("svg",{staticClass:"fill-current",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[e("path",{attrs:{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}})])])]},proxy:!0}])},[t._v("Tambah Pertanyaan ")])],1)],2)]),e("div",{staticClass:"mt-8",attrs:{id:"help"}},[e("div",{staticClass:"flex items-center text-sm font-display md:text-base",attrs:{id:"title"}},[e("div",{staticClass:"w-4 mr-2",attrs:{id:"icon"}},[e("svg",{staticClass:"fill-current",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[e("path",{attrs:{d:"M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm2-13c0 .28-.21.8-.42 1L10 9.58c-.57.58-1 1.6-1 2.42v1h2v-1c0-.29.21-.8.42-1L13 9.42c.57-.58 1-1.6 1-2.42a4 4 0 1 0-8 0h2a2 2 0 1 1 4 0zm-3 8v2h2v-2H9z"}})])]),e("span",[t._v("Bantuan dan Petunjuk")])]),e("div",{staticClass:"mt-6",attrs:{id:"help-input"}},[t._l(t.references,(function(s,a){return e("input-text",{key:a,attrs:{parClass:"mb-4",inClass:"text-base w-full xl:text-lg",input:"true",placeholder:"Petunjuk.."},model:{value:s.reference,callback:function(e){t.$set(s,"reference",e)},expression:"field.reference"}})})),e("div",{staticClass:"mt-4",attrs:{id:"btn-add-input"}},[e("my-btn",{attrs:{btnType:"button",btnClass:"p-2 text-dark-300"},on:{clicked:t.addReferences},scopedSlots:t._u([{key:"icon",fn:function(){return[e("div",{staticClass:"w-4 ml-2 icon"},[e("svg",{staticClass:"fill-current",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[e("path",{attrs:{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}})])])]},proxy:!0}])},[t._v("Tambah Petunjuk ")])],1)],2)]),e("div",{staticClass:"items-center mt-6 xl:flex xl:justify-between",attrs:{id:"action"}},[e("span",{staticClass:"text-sm"},[t._v("Tugas akan dibagikan kepada Kelas "),e("span",{staticClass:"font-bold"},[t._v(t._s(t.teacherClass.idNumber))])]),e("div",{staticClass:"xl:flex xl:flex-row-reverse",attrs:{id:"btn"}},[e("my-btn",{attrs:{btnType:"submit",btnClass:"p-2 bg-blue mt-4 xl:mt-0 xl:ml-2 hover:bg-opacity-75 xl:text-lg"}},[t._v("Bagikan Tugas")]),e("my-btn",{attrs:{btnType:"reset",btnClass:"p-2 text-dark-300 mt-4 xl:mt-0 hover:bg-light-200 xl:text-lg"}},[t._v("Reset")])],1)])])]),e("div",{staticClass:"p-6 mt-10 rounded-lg bg-red bg-opacity-50 xl:mt-0 xl:w-2/5 xl:p-0 xl:bg-opacity-0",attrs:{id:"tips"}},[e("div",{staticClass:"flex items-center text-sm font-display md:text-base",attrs:{id:"title"}},[e("div",{staticClass:"w-4 mr-2",attrs:{id:"icon"}},[e("svg",{staticClass:"fill-current",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[e("path",{attrs:{d:"M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"}})])]),e("span",[t._v("Tips Memberi Tugas")])]),e("div",{staticClass:"mt-4 font-sans text-base font-bold leading-normal text-left md:text-lg xl:w-4/6",attrs:{id:"tips-list"}},[e("span",[t._v("Berikan bantuan dan petunjuk yang jelas")])])])])])]},proxy:!0}])})],1)},n=[],l=(e("d81d"),e("b0c0"),e("d3b7"),e("5530")),i=e("2f62"),r={name:"CreateTask",components:{mainSection:function(){return e.e("chunk-2d0e4a7f").then(e.bind(null,"90c5"))},myBtn:function(){return e.e("chunk-3c29daf6").then(e.bind(null,"fe25"))},taskCreate:function(){return e.e("chunk-2d222379").then(e.bind(null,"ce56"))},inputText:function(){return e.e("chunk-2d0c09eb").then(e.bind(null,"430f"))}},data:function(){return{dropdown:!1,questions:[{question:""}],references:[{reference:""}],name:null,subject:null}},computed:Object(l["a"])(Object(l["a"])({bgSelector:function(){return"Bahasa Indonesia"===this.subject?"bg-light-200":"Matematika"===this.subject?"bg-red":"Pendidikan Agama"===this.subject?"bg-green":"Seni Budaya"===this.subject?"bg-orange":"PKN"===this.subject?"bg-yellow":"bg-blue"}},Object(i["d"])(["subjects","teacher"])),Object(i["c"])(["teacherClass"])),methods:Object(l["a"])({select:function(t){this.subject=t,this.dropdown=!1},createTask:function(){var t={background:this.bgSelector,subject:this.subject,name:this.name,questions:this.questions.map((function(t){return t.question})),references:this.references.map((function(t){return t.reference})),date:new Date};this.postTask(t),this.$router.push("/")},addQuest:function(){var t={question:""};this.questions.push(t)},addReferences:function(){var t={reference:""};this.references.push(t)}},Object(i["b"])(["postTask"]))},c=r,o=e("2877"),u=Object(o["a"])(c,a,n,!1,null,null,null);s["default"]=u.exports}}]);
//# sourceMappingURL=taskCreate.af275dde.js.map