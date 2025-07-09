import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const WorkSheet = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingItem, setEditingItem] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch employee-specific data
  const { data: workData = [] } = useQuery({
    queryKey: ["works", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/works?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Add new work
  const { mutate: addWork } = useMutation({
    mutationFn: async (newWork) => {
      const res = await axiosSecure.post("/works", newWork);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Added!", "Work added successfully.", "success");
      queryClient.invalidateQueries(["users", user?.email]);
      reset();
    },
  });

  // Update work
  const { mutate: updateWork } = useMutation({
    mutationFn: async ({ id, updatedWork }) => {
      return await axiosSecure.patch(`/works/${id}`, updatedWork);
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Work updated successfully.", "success");
      queryClient.invalidateQueries(["users", user?.email]);
      setEditingItem(null);
    },
  });

  // Delete work
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action is irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/works/${id}`);
      Swal.fire("Deleted!", "Work deleted successfully.", "success");
      queryClient.invalidateQueries(["works", user?.email]);
    }
  };

  // Submit form
  const onSubmit = (data) => {
    const workItem = {
      email: user?.email,
      task: data.task,
      hours: parseFloat(data.hours),
      date: selectedDate.toISOString(),
    };

    if (editingItem) {
      updateWork({ id: editingItem._id, updatedWork: workItem });
    } else {
      addWork(workItem);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setValue("task", item.task);
    setValue("hours", item.hours);
    setSelectedDate(new Date(item.date));
  };

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">
        📝 Work Sheet
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-md shadow mb-6"
      >
        <select
          {...register("task", { required: true })}
          className="border px-4 py-2 rounded-md w-full md:w-1/4"
          defaultValue=""
        >
          <option value="" disabled>
            Select Task
          </option>
          <option value="Sales">Sales</option>
          <option value="Support">Support</option>
          <option value="Content">Content</option>
          <option value="Paper-work">Paper-work</option>
        </select>

        <input
          type="number"
          {...register("hours", { required: true, min: 1 })}
          placeholder="Hours Worked"
          className="border px-4 py-2 rounded-md w-full md:w-1/4"
        />

        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="border px-4 py-2 rounded-md w-full md:w-1/4"
        />

        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition w-full md:w-auto">
          {editingItem ? "Update" : "Submit"}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Task</th>
              <th className="p-3 text-left">Hours</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workData.map((work) => (
              <tr key={work._id} className="border-b">
                <td className="p-3">{work.task}</td>
                <td className="p-3">{work.hours}</td>
                <td className="p-3">
                  {new Date(work.date).toLocaleDateString()}
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(work)}
                    className="text-blue-600 hover:underline"
                  >
                    🖊 Edit
                  </button>
                  <button
                    onClick={() => handleDelete(work._id)}
                    className="text-red-600 hover:underline"
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
            {!workData.length && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkSheet;
