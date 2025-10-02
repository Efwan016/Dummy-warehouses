import UserProfileCard from "../../components/UserProfileCard";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRoles } from "../../hooks/useRoles";

const AddRole = () => {
  const { addRole } = useRoles();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    addRole({ name: data.name });
    navigate("/roles");
  };

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 p-6">
        <UserProfileCard />
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl flex flex-col gap-4">
          <h2 className="font-semibold text-xl">Add New Role</h2>
          <input {...register("name", { required: "Role name is required" })} className="border p-3 rounded-lg" placeholder="Role name" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <div className="flex justify-end gap-3">
            <Link to="/roles" className="btn btn-red">Cancel</Link>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRole;
