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
  const { register, handleSubmit, reset } = useForm();

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
      queryClient.invalidateQueries(["works", user?.email]);
      reset();
    },
  });

  const { mutate: updateWork } = useMutation({
    mutationFn: async ({ id, updatedWork }) => {
      return await axiosSecure.patch(`/works/${id}`, updatedWork);
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Work updated successfully.", "success");
      queryClient.invalidateQueries(["works", user?.email]);
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
      name: user?.displayName,
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
    <div className="bg-base-200 p-5 rounded-md">
      <h2 className="text-3xl font-bold text-blue-500 mb-6 mozilla">Work Sheet</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-4 items-center bg-base-200 p-4 rounded-lg shadow mb-6"
      >
        <select
          {...register("task", { required: true })}
          className="select select-bordered w-full md:w-1/4"
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
          className="input input-bordered w-full md:w-1/4"
        />

        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="input input-bordered w-full"
          placeholderText="Select a date"
          dateFormat="yyyy-MM-dd"
        />

        <button className="btn btn-primary w-full md:w-auto">Submit</button>
      </form>

      {/* works data */}
      <div className="overflow-x-auto">
        <table className="table table-compact w-full bg-base-100 rounded-lg shadow-md overflow-hidden">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th>Task</th>
              <th>Hours</th>
              <th>Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {workData.map((work) => (
              <tr key={work._id} className="hover:bg-base-300">
                <td>{work.task}</td>
                <td>{work.hours}</td>
                <td>{new Date(work.date).toLocaleDateString()}</td>
                <td>
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
                    className="btn btn-sm btn-error btn-outline"
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
            {!workData.length && (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 py-4">
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-200 p-6 shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium text-primary-content">
                    Edit Work
                  </Dialog.Title>
                  <form onSubmit={handleEditSubmit} className="mt-4 space-y-4">
                    <select
                      name="task"
                      defaultValue={editingItem?.task}
                      className="select select-bordered w-full"
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
                      className="input input-bordered w-full"
                      required
                    />

                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      className="input input-bordered w-full"
                      dateFormat="yyyy-MM-dd"
                    />

                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={() => setEditingItem(null)}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
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
