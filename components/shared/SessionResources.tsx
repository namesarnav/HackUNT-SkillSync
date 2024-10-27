// 'use client';

// import { useState } from 'react';

// interface Resource {
//   id: string;
//   name: string;
//   type: 'link' | 'file';
//   url: string;
//   addedBy: string;
//   timestamp: string;
// }

// interface SessionResourcesProps {
//   sessionId: string;
// }

// export function SessionResources({ sessionId }: SessionResourcesProps) {
//   const [resources, setResources] = useState<Resource[]>([
//     {
//       id: '1',
//       name: 'React Hooks Documentation',
//       type: 'link',
//       url: 'https://reactjs.org/docs/hooks-intro.html',
//       addedBy: 'Teacher',
//       timestamp: new Date().toISOString(),
//     },
//   ]);
//   const [newResourceUrl, setNewResourceUrl] = useState('');
//   const [newResourceName, setNewResourceName] = useState('');

//   const addResource = () => {
//     if (!newResourceUrl.trim() || !newResourceName.trim()) return;

//     setResources([
//       ...resources,
//       {
//         id: Date.now().toString(),
//         name: newResourceName,
//         type: newResourceUrl.startsWith('http') ? 'link' : 'file',
//         url: newResourceUrl,
//         addedBy: 'You',
//         timestamp: new Date().toISOString(),
//       },
//     ]);
//     setNewResourceUrl('');
//     setNewResourceName('');
//   };

//   return (
//     <div className="bg-white shadow rounded-lg">
//       <div className="px-4 py-5 sm:p-6">
//         <h3 className="text-lg font-medium text-gray-900 mb-4">Resources</h3>
        
//         <div className="space-y-4 mb-4">
//           {resources.map((resource) => (
//             <div key={resource.id} className="border rounded-lg p-4">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <a
//                     href={resource.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-sm font-medium text-blue-600 hover:text-blue-500"
//                   >
//                     {resource.name}
//                   </a>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Added by {resource.addedBy} on{' '}
//                     {new Date(resource.timestamp).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <span
//                   className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                     resource.type === 'link'
//                       ? 'bg-green-100 text-green-800'
//                       : 'bg-blue-100 text-blue-800'
//                   }`}
//                 >
//                   {resource.type}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="space-y-2">
//           <input
//             type="text"
//             value={newResourceName}
//             onChange={(e) => setNewResourceName(e.target.value)}
//             placeholder="Resource name"
//             className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//           />
//           <input
//             type="text"
//             value={newResourceUrl}
//             onChange={(e) => setNewResourceUrl(e.target.value)}
//             placeholder="Resource URL or file"
//             className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//           />
//           <button
//             onClick={addResource}
//             className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
//           >
//             Add Resource
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
