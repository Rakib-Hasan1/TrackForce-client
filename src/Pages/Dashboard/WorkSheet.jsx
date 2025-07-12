import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

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
    formState: { errors },
  } = useForm();

  const { data: workData = [] } = useQuery({
    queryKey: ["works", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/works?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

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

  const { mutate: updateWork } = useMutation({
    mutationFn: async ({ id, updatedWork }) => {
      return await axiosSecure.patch(`/works/${id}`, updatedWork);
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Work updated successfully.", "success");
      queryClient.invalidateQueries(["users", user?.email]);
      setEditingItem(null);
      reset();
    },
  });

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

  const onSubmit = (data) => {
    const workItem = {
      email: user?.email,
      task: data.task,
      hours: parseFloat(data.hours),
      date: selectedDate.toISOString(),
    };

    addWork(workItem);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedWork = {
      email: user?.email,
      task: e.target.task.value,
      hours: parseFloat(e.target.hours.value),
      date: selectedDate.toISOString(),
    };
    updateWork({ id: editingItem._id, updatedWork });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setSelectedDate(new Date(item.date));
  };

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">
        📝 Work Sheet
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-md shadow mb-6"
      >
        <select
          {...register("task", { required: true })}
          className="border border-blue-300 px-4 py-2 rounded-md w-full md:w-1/4 cursor-pointer"
          defaultValue=""
        >
          <option value="" disabled>
            Select Task
          </option>
          <option value="Sales">Sales</option>
          <option value="Support">Support</option>
          <option value="Content">Content</option>
          <option value="Paper-work">Paper-work</option>
          <option value="Coding">Coding</option>
          <option value="Conferencing">Conferencing</option>
        </select>

        <input
          type="number"
          {...register("hours", { required: true, min: 1 })}
          placeholder="Hours Worked"
          className="border border-blue-300 px-4 py-2 rounded-md w-full md:w-1/4"
        />

        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="border border-blue-300 px-4 py-2 rounded-md w-full"
          placeholderText="Select a date"
          dateFormat="yyyy-MM-dd"
        />

        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition w-full md:w-auto cursor-pointer">
          Submit
        </button>
      </form>

      {/* works data */}

      <div className="overflow-x-auto">
        <table className="table min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Task</th>
              <th className="p-3 text-left">Hours</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Edit</th>
              <th className="p-3 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {workData.map((work) => (
              <tr key={work._id}>
                <td className="p-3">{work.task}</td>
                <td className="p-3">{work.hours}</td>
                <td className="p-3">
                  {new Date(work.date).toLocaleDateString()}
                </td>
                <td className="p-3 text-left space-x-2">
                  <button
                    onClick={() => handleEdit(work)}
                    className="btn btn-sm btn-outline btn-success"
                  >
                    🖊 Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(work._id)}
                    className="btn btn-error btn-sm btn-outline"
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
            {!workData.length && (
              <tr>
                <td
                  colSpan="5"
                  className="font-semibold text-2xl text-center py-4 text-gray-500"
                >
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Headless UI Modal */}
      <Transition appear show={!!editingItem} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setEditingItem(null)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Work
                  </Dialog.Title>
                  <form onSubmit={handleEditSubmit} className="mt-4 space-y-4">
                    <select
                      name="task"
                      defaultValue={editingItem?.task}
                      className="w-full px-4 py-2 border rounded-md"
                      required
                    >
                      <option value="Sales">Sales</option>
                      <option value="Support">Support</option>
                      <option value="Content">Content</option>
                      <option value="Paper-work">Paper-work</option>
                      <option value="Coding">Coding</option>
                      <option value="Conferencing">Conferencing</option>
                    </select>

                    <input
                      name="hours"
                      type="number"
                      defaultValue={editingItem?.hours}
                      placeholder="Hours Worked"
                      className="w-full px-4 py-2 border rounded-md"
                      required
                    />

                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      className="w-full px-4 py-2 border rounded-md"
                      dateFormat="yyyy-MM-dd"
                    />

                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={() => setEditingItem(null)}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default WorkSheet;
