import React, { useEffect, useState } from 'react';

// Define DevlogForm props type
interface DevlogFormProps {
  addDevlog: (newDevlog: { title: string; date: string; changes: string; tags: string }) => void;
  updateDevlog?: (id: string, updatedDevlog: { title: string; date: string; changes: string; tags?: string }) => void;
  currentDevlog?: { _id: string; title: string; date: string; changes: string; tags?: string };
  resetCurrentDevlog: () => void;
}

const DevlogForm: React.FC<DevlogFormProps> = ({
  addDevlog,
  updateDevlog,
  currentDevlog,
  resetCurrentDevlog
}) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    changes: '',
    tags: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ title: '', date: '', changes: '' });

  useEffect(() => {
    if (currentDevlog) {
      setFormData({
        title: currentDevlog.title,
        date: currentDevlog.date,
        changes: currentDevlog.changes,
        tags: currentDevlog.tags || ''
      });
    } else {
      setFormData({ title: '', date: '', changes: '', tags: '' });
    }
  }, [currentDevlog]);

  const validateForm = () => {
    const newErrors = { title: '', date: '', changes: '' };
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.changes) newErrors.changes = 'Changes are required';
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      setIsLoading(true);
      try {
        if (currentDevlog && updateDevlog) {
          await updateDevlog(currentDevlog._id, {
            title: formData.title,
            date: formData.date,
            changes: formData.changes,
            tags: formData.tags
          });
        } else {
          await addDevlog({
            title: formData.title,
            date: formData.date,
            changes: formData.changes,
            tags: formData.tags
          });
        }
        resetCurrentDevlog(); // Reset the form after submission
        setFormData({ title: '', date: '', changes: '', tags: '' }); // Clear form
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isFormValid = Object.values(errors).every(error => error === '');

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto space-y-6 transition duration-300 ease-in-out transform">
      <h2 className="text-2xl  font-2 font-semibold text-center mb-4 text-indigo-600">Devlog Entry</h2>
      
      <div>
        <label className="block text-gray-700 font-semibold mb-1" htmlFor="title">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter entry title"
          aria-invalid={!!errors.title}
          aria-describedby="title-error"
        />
        {errors.title && <p id="title-error" className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1" htmlFor="date">
          Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
          aria-invalid={!!errors.date}
          aria-describedby="date-error"
        />
        {errors.date && <p id="date-error" className="text-red-500 text-sm">{errors.date}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1" htmlFor="changes">
          Changes <span className="text-red-500">*</span>
        </label>
        <textarea
          name="changes"
          id="changes"
          value={formData.changes}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${errors.changes ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Describe the changes or updates"
          rows={4}
          aria-invalid={!!errors.changes}
          aria-describedby="changes-error"
        />
        {errors.changes && <p id="changes-error" className="text-red-500 text-sm">{errors.changes}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1" htmlFor="tags">
          Tags (Optional)
        </label>
        <input
          type="text"
          name="tags"
          id="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 border-gray-300"
          placeholder="Enter tags (e.g., bug fix, new feature)"
        />
      </div>

      <button
        type="submit"
        className={`w-full py-3 rounded-md transition-colors duration-300 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : isFormValid ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? 'Submitting...' : (currentDevlog ? 'Update Devlog Entry' : 'Add Devlog Entry')}
      </button>
    </form>
  );
};

export default DevlogForm;
