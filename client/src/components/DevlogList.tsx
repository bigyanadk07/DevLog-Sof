import React from 'react';

// Define the structure of a devlog entry
interface DevlogEntry {
  _id: string;
  title: string;
  date: string;
  changes: string;
  tags?: string;
}

// Define DevlogList props type
interface DevlogListProps {
  devlogs: DevlogEntry[];
  deleteDevlog: (id: string) => Promise<void>;
}

const DevlogList: React.FC<DevlogListProps> = ({ devlogs, deleteDevlog }) => {
  return (
    <div className="space-y-4">
      {devlogs.map((devlog) => (
        <div key={devlog._id} className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Title</dt>
              <dd className="text-gray-700 sm:col-span-2">{devlog.title}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Date</dt>
              <dd className="text-gray-700 sm:col-span-2">{devlog.date}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Changes</dt>
              <dd className="text-gray-700 sm:col-span-2">{devlog.changes}</dd>
            </div>

            {devlog.tags && (
              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Tags</dt>
                <dd className="text-gray-700 sm:col-span-2">{devlog.tags}</dd>
              </div>
            )}

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Actions</dt>
              <dd className="text-gray-700 sm:col-span-2">
                <button
                  onClick={() => deleteDevlog(devlog._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
  );
};

export default DevlogList;
