import React, { useEffect, useState } from "react";
import contractService from "../api/contractService";

const AdminContractManagement = () => {

const [contracts,setContracts] = useState([]);
const [loading,setLoading] = useState(true);
const [filter,setFilter] = useState("ALL");
const [search,setSearch] = useState("");

useEffect(()=>{
fetchContracts();
},[]);

const fetchContracts = async ()=>{
try{

const res = await contractService.getAllContracts();

if(res.success){
setContracts(res.data || []);
}

}catch(err){
console.error(err);
}finally{
setLoading(false);
}
};

const updateContractStatus = async (id,status)=>{
try{

await contractService.updateContractStatus(id,status);

setContracts(prev =>
prev.map(c =>
c.id === id ? {...c,status} : c
)
);

}catch(err){
console.error(err);
}
};

const getStatusBadge = (status)=>{

const styles = {
PENDING:"bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
UPLOADED:"bg-blue-500/20 text-blue-400 border-blue-500/30",
CONFIRMED:"bg-green-500/20 text-green-400 border-green-500/30",
REJECTED:"bg-red-500/20 text-red-400 border-red-500/30"
};

return(
<span className={`px-3 py-1 text-xs font-semibold rounded-full border ${styles[status]}`}>
{status}
</span>
);
};

const filteredContracts = contracts
.filter(c => filter==="ALL" ? true : c.status===filter)
.filter(c => c.user?.email?.toLowerCase().includes(search.toLowerCase()));

if(loading){
return(
<div className="h-screen flex items-center justify-center bg-slate-900 text-white">
Loading contracts...
</div>
);
}

return(

<div className="min-h-screen bg-slate-900 text-white p-8">

{/* HEADER */}

<div className="flex justify-between items-center mb-8">

<div>
<h1 className="text-3xl font-bold">
Contract Management
</h1>

<p className="text-slate-400">
Review and validate uploaded contracts
</p>
</div>

<input
placeholder="Search user email..."
className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg w-72"
onChange={(e)=>setSearch(e.target.value)}
/>

</div>


{/* STATS */}

<div className="grid grid-cols-4 gap-6 mb-10">

<div className="bg-slate-800 p-6 rounded-xl">
<div className="text-slate-400 text-sm">Total</div>
<div className="text-2xl font-bold">{contracts.length}</div>
</div>

<div className="bg-slate-800 p-6 rounded-xl">
<div className="text-slate-400 text-sm">Uploaded</div>
<div className="text-2xl font-bold">
{contracts.filter(c=>c.status==="UPLOADED").length}
</div>
</div>

<div className="bg-slate-800 p-6 rounded-xl">
<div className="text-slate-400 text-sm">Confirmed</div>
<div className="text-2xl font-bold">
{contracts.filter(c=>c.status==="CONFIRMED").length}
</div>
</div>

<div className="bg-slate-800 p-6 rounded-xl">
<div className="text-slate-400 text-sm">Rejected</div>
<div className="text-2xl font-bold">
{contracts.filter(c=>c.status==="REJECTED").length}
</div>
</div>

</div>


{/* FILTERS */}

<div className="flex gap-3 mb-6">

{["ALL","PENDING","UPLOADED","CONFIRMED","REJECTED"].map(s =>(

<button
key={s}
onClick={()=>setFilter(s)}
className={`px-4 py-2 rounded-lg border text-sm ${
filter===s
? "bg-blue-600 border-blue-600"
: "border-slate-700 hover:bg-slate-800"
}`}
>

{s}

</button>

))}

</div>


{/* TABLE */}

<div className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700/50">

<table className="w-full text-left">

<thead className="bg-slate-900/80 border-b border-slate-700 text-slate-400 text-sm">

<tr>

<th className="p-4 text-left font-semibold">
<div className="flex items-center space-x-2">
<span className="text-lg">👤</span>
<span>User</span>
</div>
</th>

<th className="p-4 text-left font-semibold">
<div className="flex items-center space-x-2">
<span className="text-lg">📄</span>
<span>File</span>
</div>
</th>

<th className="p-4 text-left font-semibold">
<div className="flex items-center space-x-2">
<span className="text-lg">📊</span>
<span>Status</span>
</div>
</th>

<th className="p-4 text-left font-semibold">
<div className="flex items-center space-x-2">
<span className="text-lg">📅</span>
<span>Date</span>
</div>
</th>

<th className="p-4 text-center font-semibold">
<div className="flex items-center justify-center space-x-2">
<span className="text-lg">⚡</span>
<span>Actions</span>
</div>
</th>

</tr>

</thead>


<tbody>

{filteredContracts.map(contract =>(

<tr
key={contract.id}
className="border-b border-slate-800 hover:bg-slate-700/40"
>

<td className="p-4">

<div className="font-medium">
{contract.user?.email}
</div>

</td>


<td>

<div className="text-sm text-slate-300">
{contract.fileName}
</div>

</td>


<td>

{getStatusBadge(contract.status)}

</td>


<td className="text-sm text-slate-400">

{new Date(contract.createdAt).toLocaleDateString()}

</td>


<td>

<div className="flex gap-2">

<button
onClick={()=>window.open(`/api/contracts/view/${contract.id}`)}
className="px-3 py-1 bg-indigo-600 rounded text-xs"
>
View
</button>

<button
onClick={()=>updateContractStatus(contract.id,"CONFIRMED")}
className="px-3 py-1 bg-green-600 rounded text-xs"
>
Confirm
</button>

<button
onClick={()=>updateContractStatus(contract.id,"REJECTED")}
className="px-3 py-1 bg-red-600 rounded text-xs"
>
Reject
</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

);

};

export default AdminContractManagement;